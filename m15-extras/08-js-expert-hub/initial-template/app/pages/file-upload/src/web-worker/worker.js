import MP4Demuxer from "./mp4Demuxer.js";
import VideoProcessor from "./videoProcessor.js";
import CanvasRenderer from "./canvasRenderer.js";

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

const mp4Demuxer = new MP4Demuxer();
const videoProcessor = new VideoProcessor({
  mp4Demuxer
});

onmessage = async ({ data }) => {
  const renderFrame = CanvasRenderer.getRenderer(data.canvas);
  const encoderConfig = { ...createEncoderConfig('webm', qvgaConstraints) };

  await videoProcessor.start({
    file: data.file,
    renderFrame ,
    encoderConfig
  });

  // setTimeout(() => {
  self.postMessage({
    status: 'done'
  });
  // }, 2000);
};