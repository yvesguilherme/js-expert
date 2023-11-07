export default class VideoProcessor {
  #mp4Demuxer;
  #webMWriter;
  #service;
  #buffers = [];

  /**
   * 
   * @param {object} options
   * @param {import ('./mp4Demuxer.js').default} options.mp4Demuxer
   * @param {import ('./../deps/webm-writer2.js').default} options.webMWriter
   * @param {import ('./service.js').default} options.service
   */
  constructor({ mp4Demuxer, webMWriter, service }) {
    this.#mp4Demuxer = mp4Demuxer;
    this.#webMWriter = webMWriter;
    this.#service = service;
  }

  /** * @returns {ReadableStream}*/
  mp4Decoder(stream) {
    return new ReadableStream({
      start: async (controller) => {
        const decoder = new VideoDecoder({
          /** @param {VideoFrame} frame  */
          output(frame) {
            controller.enqueue(frame);
          },
          error(error) {
            console.error(`error at mp4Decoder`, error);
            controller.error(error);
          }
        });

        return this.#mp4Demuxer.run(stream, {
          /** * @param {WebApisVideoDecoderConfigure} config */
          async onConfig(config) {
            // const { supported } = await VideoDecoder.isConfigSupported(config);

            // if (!supported) {
            //   console.error(`mp4Muxer VideoDecoder config not supported!`, config);
            //   controller.close();
            //   return;
            // }

            decoder.configure(config);
          },
          /** @param {EncodedVideoChunk} chunk  */
          onChunk(chunk) {
            decoder.decode(chunk);
          }
        })
        // .then(() => {
        //   setTimeout(() => {
        //     controller.close();
        //   }, 1000);
        // });
      },
    });
  }

  /** * @param {WebApisVideoDecoderConfigure} encoderConfig */
  encode144p(encoderConfig) {
    let _encoder;

    const readable = new ReadableStream({
      start: async (controller) => {
        const { supported } = await VideoEncoder.isConfigSupported(encoderConfig);

        if (!supported) {
          const message = `encode144p VideoEncoder config not supported!`;
          console.error(message, encoderConfig);
          controller.error(message);
          return;
        }

        _encoder = new VideoEncoder({
          /**
            * @param {EncodedVideoChunk} frame
            * @param {EncodedVideoChunkMetadata} config
            */
          output: (frame, config) => {
            if (config.decoderConfig) {
              const decoderConfig = {
                type: 'config',
                config: config.decoderConfig
              };

              controller.enqueue(decoderConfig);
            }

            controller.enqueue(frame);
          },
          error: (error) => {
            console.error(`VideoEncoder 144p`, error);
            controller.error(error);
          }
        });

        _encoder.configure(encoderConfig);
      }
    });

    const writable = new WritableStream({
      async write(frame) {
        _encoder.encode(frame)
        frame.close()
      }
    })

    return {
      readable,
      writable
    }
  }

  renderDecodedFramesAndGetEncodedChunks(renderFrame) {
    let _decoder;
    return new TransformStream({
      start(controller) {
        _decoder = new VideoDecoder({
          output(frame) {
            renderFrame(frame);
          },
          error(error) {
            console.log(`error at renderDecodedFrames`, error);
            controller.error(error);
          }
        });
      },
      /**
       * 
       * @param {EncodedVideoChunk} encodedChunk 
       * @param {TransformStreamDefaultController} controller 
       */
      async transform(encodedChunk, controller) {
        if (encodedChunk.type === 'config') {
          await _decoder.configure(encodedChunk.config);
          return;
        }

        _decoder.decode(encodedChunk);

        // need the encoded version to use webM
        controller.enqueue(encodedChunk);
      }
    });
  }

  transformIntoWebM() {
    const writable = new WritableStream({
      write: (chunk) => {
        this.#webMWriter.addFrame(chunk);
      },
      close() {
        debugger;
      },
    });

    return {
      readable: this.#webMWriter.getStream(),
      writable
    };
  }

  upload(filename, resolution, type) {
    const chunks = [];
    let byteCount = 0;
    let segmentCount = 0;

    const triggerUpload = async chunks => {
      const blob = new Blob(
        chunks,
        {
          type: 'video/webm'
        }
      );

      // fazer upload
      await this.#service.uploadFile({
        filename: `${filename}-${resolution}.${++segmentCount}.${type}`,
        fileBuffer: blob
      })

      // remove todos os elementos
      chunks.length = 0;
      byteCount = 0;
    };

    return new WritableStream({
      /**
       * 
       * @param {object} options 
       * @param {Uint8Array} options.data 
       */
      async write({ data }) {
        chunks.push(data);
        byteCount += data.byteLength;

        // se for menor que 10mb não faz upload!
        if (byteCount <= 10e6) {
          return;
        }

        await triggerUpload(chunks);
      },
      async close() {
        if (!chunks.length) {
          return;
        }

        await triggerUpload(chunks);
      }
    });
  }

  async start({ file, encoderConfig, renderFrame, sendMessage }) {
    const fileStream = file.stream();
    const fileName = file.name
      .split('/')
      .pop()
      .replace('.mp4', '');

    await this.mp4Decoder(fileStream)
      .pipeThrough(this.encode144p(encoderConfig)) // obrigatoriamente uma readable e uma transform stream
      .pipeThrough(this.renderDecodedFramesAndGetEncodedChunks(renderFrame))
      .pipeThrough(this.transformIntoWebM())
      // .pipeThrough(
      //   new TransformStream({
      //     transform: ({ data, position }, controller) => {
      //       this.#buffers.push(data);
      //       controller.enqueue(data);
      //     },
      //     flush: () => {
      //       /**
      //        * Usado para debugar...
      //        */
      //       // sendMessage({
      //       //   status: 'done',
      //       //   buffers: this.#buffers,
      //       //   filename: fileName.concat('-144p.webm')
      //       // });

      //       sendMessage({
      //         status: 'done'
      //       });
      //     }
      //   })
      // )
      // .pipeTo( // só aceita uma writable (última parte do processo)
      //   new WritableStream({
      //     write(frame) {
      //       // debugger;
      //       // renderFrame(frame)
      //     }
      //   })
      // );
      .pipeTo(
        this.upload(fileName, '144p', 'webm')
      );

    sendMessage({
      status: 'done'
    });
  }
}