// update current buffer to stretch on given canvas
const updateCanvas = (
  buffer: CanvasRenderingContext2D,
  myCanvas: HTMLCanvasElement,
) => {
  const ctx = myCanvas!.getContext('2d');
  console.log(buffer);

  ctx!.drawImage(buffer.canvas, 0, 0);

  // ctx!.drawImage(
  //   buffer.canvas,
  //   0,
  //   0,
  //   buffer!.canvas.width,
  //   buffer!.canvas.height,
  //   0,
  //   0,
  //   myCanvas.width,
  //   myCanvas.height,
  // );
};

export default updateCanvas;
