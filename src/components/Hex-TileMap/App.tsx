import React from 'react';

// import '../style.css';

import fantasyTiles from './borderless.png';

// https://www.redblobgames.com/grids/hexagons/
const bufferBackground = document.createElement('canvas').getContext('2d');
const bufferSize = 32;
// const bufferColumns = 16;

const sizeOfTiles = 32;

// 8 x 6 grid
// prettier-ignore
const grid = [
  [0, 0, 1, 1, 2, 2, 3],
  [4, 4, 28, 5, 6, 6, 7],
  [8, 8, 9, 9, 10, 10, 11],
  [12, 12, 13, 13, 14, 14, 15],
  [28, 28, 17, 17, 18, 18, 19],
  [20, 20, 21, 21, 22, 22, 23],
  [24, 24, 25, 25, 26, 26, 27],
];

// https://stackoverflow.com/questions/46987816/using-state-in-react-with-typescript
interface IProps {}
interface IState {
  gridCoordinates: any[];
  fps: number;
  fpsInterval: any;
  now: any;
  then: any;
  elapsed: any;
  currentTile: any;
  myCanvas: any;
  gridImage: any;
  mouseX: any;
  mouseY: any;
}

class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      gridImage: new Image(32, 32),
      fps: 5,
      mouseX: 100,
      mouseY: 100,
      myCanvas: React.createRef(),
      fpsInterval: null,
      gridCoordinates: [],
      now: Date.now(),
      then: Date.now(),
      elapsed: null,
      currentTile: { x: 100, y: 100 },
    };
  }

  componentDidMount({ fps, gridImage } = this.state) {
    this.setupGame();
    this.setState({ fpsInterval: 1000 / fps });
    gridImage.src = fantasyTiles;
    window.addEventListener('mousemove', this.mouseMove);
    this.gameLoop();
  }

  // Remember, element (myCanvas), is different than bitmap bufferBackgroundbuffer)
  // see: https://stackoverflow.com/questions/17130395/real-mouse-position-in-canvas
  mouseMove = (e: any, { myCanvas } = this.state) => {
    const rectangle = myCanvas.current.getBoundingClientRect();
    const { canvas } = bufferBackground!;
    const scaleX = canvas.width / rectangle.width;
    const scaleY = canvas.height / rectangle.height;

    // scale coordinates after they have been adjusted to relative element
    this.setState(() => ({ mouseX: (e.clientX - rectangle.left) * scaleX }));
    this.setState(() => ({ mouseY: (e.clientY - rectangle.top) * scaleY }));
  };

  // resize canvas element when window resizes
  resize = ({ myCanvas } = this.state) => {
    myCanvas.current.height = window.innerHeight / 2;
    myCanvas.current.width = window.innerWidth / 2;
    this.setupGridOfTiles();
  };

  drawHexTiles = (
    x: number,
    y: number,
    tile = Math.random() * 7,
    frames = 8,
    width = 32,
    height = 48,
    { gridImage } = this.state,
  ) => {
    bufferBackground!.drawImage(
      gridImage,
      width * Math.floor(tile % frames),
      16 + height * Math.floor(tile / frames),
      width,
      width,
      x,
      y,
      sizeOfTiles,
      sizeOfTiles,
    );
  };

  setupGridOfTiles = () => {
    for (let x = 0; x < grid.length; x++) {
      for (let y = 0; y < grid[x].length; y++) {
        const xOffset = y % 2 === 0 ? sizeOfTiles * 0.75 : 0;
        const xPoint = x * sizeOfTiles * 1.5 + xOffset;
        const yPoint = (y * (Math.sqrt(3) * sizeOfTiles)) / 4;
        const gridCoordinate = {
          xCoordinate: xPoint,
          yCoordinate: yPoint,
          tileFrameX: x,
          tileFrameY: y,
        };

        this.drawHexTiles(xPoint, yPoint, grid[x][y]);

        this.setState((prevState) => ({
          gridCoordinates: [...prevState.gridCoordinates, gridCoordinate],
        }));
      }
    }
  };

  drawGridFromCoordinates = ({ gridCoordinates, currentTile } = this.state) => {
    for (let i = 0; i < gridCoordinates.length; i++) {
      const x = gridCoordinates[i].xCoordinate;
      const y = gridCoordinates[i].yCoordinate;

      // check if mouse is on tile about to be drawn
      if (currentTile.xCoordinate === x && currentTile.yCoordinate === y) {
        this.drawHexTiles(x, y, 16);
      } else if (x && y) {
        this.drawHexTiles(
          x,
          y,
          grid[gridCoordinates[i].tileFrameX][gridCoordinates[i].tileFrameY],
        );
      }
    }
  };

  gameLoop = () => {
    const { fpsInterval, elapsed, myCanvas } = this.state;
    const ctx = myCanvas.current.getContext('2d');
    window.requestAnimationFrame(this.gameLoop);

    // calc elapsed time since last loop
    this.setState(() => ({ now: Date.now() }));
    this.setState((prevState) => ({ elapsed: prevState.now - prevState.then }));

    // if enough time has elapsed, draw the next frame
    if (elapsed > fpsInterval) {
      this.drawGridFromCoordinates();
      ctx.drawImage(
        bufferBackground!.canvas,
        0,
        0,
        bufferBackground!.canvas.width,
        bufferBackground!.canvas.height,
        0,
        0,
        myCanvas.current.width,
        myCanvas.current.height,
      );
      this.isMouseOnTile();

      // Get ready for next frame by setting then=now, but also adjust for your
      // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
      this.setState((prevState) => ({
        then: prevState.now - (prevState.elapsed % prevState.fpsInterval),
      }));
    }
  };

  setupGame = ({ myCanvas } = this.state) => {
    bufferBackground!.canvas.height = 9 * bufferSize;
    bufferBackground!.canvas.width = 16 * bufferSize;
    myCanvas.current.style.background = document.querySelector(
      'body',
    )?.style.backgroundColor;
    myCanvas.current.height = window.innerHeight * 0.7;
    myCanvas.current.width = window.innerWidth * 0.7;

    this.setupGridOfTiles();
  };

  isMouseOnTile = (
    { gridCoordinates, mouseX, mouseY, myCanvas } = this.state,
  ) => {
    if (
      mouseX >= myCanvas.current.width ||
      mouseX <= 0 ||
      mouseY >= myCanvas.current.height ||
      mouseY <= 0
    ) {
      return;
    }
    for (let i = 0; i < gridCoordinates.length; i++) {
      if (
        gridCoordinates[i].xCoordinate < mouseX &&
        gridCoordinates[i].xCoordinate + sizeOfTiles > mouseX &&
        gridCoordinates[i].yCoordinate < mouseY &&
        gridCoordinates[i].yCoordinate + sizeOfTiles > mouseY
      ) {
        this.setState(() => ({ currentTile: gridCoordinates[i] }));
      }
    }
  };

  render({ myCanvas } = this.state) {
    return (
      <div className="App">
        <h1>Game Development</h1>
        <h2>Example</h2>
        <canvas ref={myCanvas} />
      </div>
    );
  }
}

export default App;
