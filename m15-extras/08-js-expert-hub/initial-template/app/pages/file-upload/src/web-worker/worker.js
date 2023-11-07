import MP4Demuxer from "./mp4Demuxer.js";
import VideoProcessor from "./videoProcessor.js";
import CanvasRenderer from "./canvasRenderer.js";
import WebMWriter from './../deps/webm-writer2.js';
import Service from "./service.js";

// 144p 
const qvgaConstraints = {
  width: 320,
  height: 240
};

const vgaConstraints = {
  width: 640,
  height: 480
};

const hdConstraints = {
  width: 1280,
  height: 720
};

function createEncoderConfig(typeFile, typeConstraints) {
  const codec = typeFile === 'webm' ? 'vp09.00.10.08' : 'avc1.42002A';
  const pt = typeFile === 'webm' ? 4 : 1;
  const hardwareAcceleration = typeFile === 'webm' ? 'prefer-software' : 'prefer-hardware';
  const avc = typeFile === 'mp4' ? { format: 'annexb' } : null;
  const bitrate = 10e6; // 1 MB/s

  return {
    codec,
    pt,
    hardwareAcceleration,
    avc,
    bitrate,
    ...typeConstraints
  };
};

const webMWriterConfig = {
  codec: 'VP9',
  width: qvgaConstraints.width,
  height: qvgaConstraints.height,
  bitrate: 10e6
};

const mp4Demuxer = new MP4Demuxer();
const service = new Service({
  url: 'http://localhost:3000'
});
const webMWriter = new WebMWriter(webMWriterConfig);
const videoProcessor = new VideoProcessor({
  mp4Demuxer,
  webMWriter,
  service
});

onmessage = async ({ data }) => {
  const renderFrame = CanvasRenderer.getRenderer(data.canvas);
  const encoderConfig = { ...createEncoderConfig('webm', qvgaConstraints) };

  await videoProcessor.start({
    file: data.file,
    encoderConfig,
    renderFrame,
    sendMessage: (message) => {
      self.postMessage(message);
    }
  });

  // setTimeout(() => {
  // self.postMessage({
  //   status: 'done'
  // });
  // }, 2000);
};