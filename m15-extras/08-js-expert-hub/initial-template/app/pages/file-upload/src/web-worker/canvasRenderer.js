/** @type {HTMLCanvasElement} canvas */
let _canvas = {};
let _canvasContext = {};
export default class CanvasRenderer {

  /** @param {VideoFrame} frame  */
  static draw(frame) {
    const { displayHeight, displayWidth } = frame;

    _canvas.width = displayWidth;
    _canvas.height = displayHeight;

    _canvasContext.drawImage(
      frame,
      0,
      0,
      displayWidth,
      displayHeight
    );

    frame.close();
  }

  /** @param {HTMLCanvasElement} canvas */
  static getRenderer(canvas) {
    const renderer = this;
    /** @type {VideoFrame} frame  */
    let pendingFrame = null;
    _canvas = canvas;
    _canvasContext = canvas.getContext('2d');


    return frame => {
      const renderAnimationFrame = () => {
        renderer.draw(pendingFrame);
        pendingFrame = null;
      };

      if (!pendingFrame) {
        requestAnimationFrame(renderAnimationFrame);
      } else {
        pendingFrame.close();
      }

      pendingFrame = frame;
    };
  }
}