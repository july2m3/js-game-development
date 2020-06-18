const drawImageOncanvas = (
  myCanvas: HTMLCanvasElement,
  imgSource: string,
  xCoordinate = 100,
  yCoordinate = 100,
) => {
  console.log('drawing image on canvas');
  const imageToDraw = new Image(250, 250);
  imageToDraw.src = imgSource;
  const context = myCanvas.getContext('2d');
  context!.drawImage(imageToDraw, xCoordinate, yCoordinate);
};

export default drawImageOncanvas;
