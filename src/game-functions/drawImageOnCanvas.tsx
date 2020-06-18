const drawImageOncanvas = (
  myCanvas: HTMLCanvasElement,
  imgSource: string,
  xCoordinate = 100,
  yCoordinate = 100,
) => {
  const imageToDraw = new Image();
  imageToDraw.src = imgSource;
  const context = myCanvas.getContext('2d');
  context!.drawImage(imageToDraw, xCoordinate, yCoordinate);
};

export default drawImageOncanvas;
