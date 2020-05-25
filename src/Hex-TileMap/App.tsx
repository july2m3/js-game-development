/* eslint-disable no-plusplus */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';

import '../style.css';

import fantasyTiles from './borderless.png';

// https://www.redblobgames.com/grids/hexagons/
const buffer = document.createElement('canvas').getContext('2d');
const bufferSize = 32;
// const bufferColumns = 16;

// const sizeOfTiles = 32;
const sizeOfTiles = 48;
//grid[x][y] = grid[0,2] = (18,3)
// const sizeBetweenTiles = sizeOfTiles * 2;

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

const gridCoordinates: any[] = [];
const fps = 5;
// let startTime;
let fpsInterval: any;
let now: any;
let then: any;
let elapsed: any;

class App extends React.Component {
  myCanvas: any;

  gridImage: any;

  mouseX: any;

  mouseY: any;

  currentTile: any;

  constructor(props: any) {
    super(props);
    this.myCanvas = React.createRef();
    this.mouseX = 100;
    this.mouseY = 100;
    this.currentTile = { x: 100, y: 100 };
  }

  componentDidMount() {
    this.setupCanvas();
    fpsInterval = 1000 / fps;
    then = Date.now();

    // load fantasy tiles
    this.gridImage = new Image(32, 32);
    // this.gridImage = new Image();
    this.gridImage.src = fantasyTiles;

    window.addEventListener('mousemove', this.mouseMove);
    window.addEventListener('resize', this.resize, { passive: true });
    this.gameLoop();
  }

  mouseMove = (e: any) => {
    const rectangle = this.myCanvas.current.getBoundingClientRect();
    this.mouseX = e.clientX - rectangle.left;
    this.mouseY = e.clientY - rectangle.top;
  };

  clearScreen = () => {
    const ctx = this.myCanvas.current.getContext('2d');
    ctx.clearRect(
      0,
      0,
      this.myCanvas.current.width,
      this.myCanvas.current.height,
    );
  };

  resize = () => {
    this.myCanvas.current.height = window.innerHeight / 2;
    this.myCanvas.current.width = window.innerWidth / 2;
    this.drawGridOfTiles();
  };

  drawHexTiles = (
    x: number,
    y: number,
    tile = Math.random() * 7,
    frames = 8,
    width = 32,
    height = 48,
  ) => {
    buffer!.drawImage(
      this.gridImage,
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

  drawGridOfTiles = () => {
    for (let x = 0; x < grid.length; x++) {
      for (let y = 0; y < grid[x].length; y++) {
        const xOffset = y % 2 === 0 ? sizeOfTiles * 0.75 : 0;
        const xPoint = x * sizeOfTiles * 1.5 + xOffset;
        const yPoint = (y * (Math.sqrt(3) * sizeOfTiles)) / 4;
        const gridCoordinate = { xCoordinate: xPoint, yCoordinate: yPoint };

        if (
          this.currentTile.xCoordinate === xPoint &&
          this.currentTile.yCoordinate === yPoint
        ) {
          this.drawHexTiles(xPoint, yPoint, 16);
        } else {
          // this.drawHexTiles(xPoint, yPoint, grid[y][x]);
          this.drawHexTiles(xPoint, yPoint, grid[x][y]);
        }
        if (gridCoordinates.length <= 49) {
          gridCoordinates.push(gridCoordinate);
        }
      }
    }
  };

  clipBackground = () => {
    const ctx = this.myCanvas.current.getContext('2d');
    ctx.rect(
      sizeOfTiles,
      sizeOfTiles,
      this.myCanvas.current.width - sizeOfTiles * 2,
      this.myCanvas.current.height - sizeOfTiles * 2,
    );
    ctx.stroke();
    ctx.clip();
  };

  gameLoop = () => {
    window.requestAnimationFrame(this.gameLoop);
    const ctx = this.myCanvas.current.getContext('2d');

    // calc elapsed time since last loop
    now = Date.now();
    elapsed = now - then;

    // if enough time has elapsed, draw the next frame
    if (elapsed > fpsInterval) {
      // this.clipBackground();
      this.drawGridOfTiles();
      ctx.drawImage(
        buffer!.canvas,
        0,
        0,
        buffer!.canvas.width,
        buffer!.canvas.height,
        0,
        0,
        this.myCanvas.current.width,
        this.myCanvas.current.height,
      );

      this.isMouseOnTile();

      // Get ready for next frame by setting then=now, but also adjust for your
      // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
      then = now - (elapsed % fpsInterval);
    }
  };

  setupCanvas = () => {
    buffer!.canvas.height = 9 * bufferSize;
    buffer!.canvas.width = 16 * bufferSize;
    buffer!.canvas.style.background = 'white';
    this.myCanvas.current.style.background = document.querySelector(
      'body',
    )?.style.backgroundColor;

    this.myCanvas.current.height = window.innerHeight * 0.7;
    this.myCanvas.current.width = window.innerWidth * 0.7;
  };

  isMouseOnTile = () => {
    if (
      this.mouseX >= this.myCanvas.current.width ||
      this.mouseX <= 0 ||
      this.mouseY >= this.myCanvas.current.height ||
      this.mouseY <= 0
    ) {
      return;
    }
    for (let i = 0; i < gridCoordinates.length; i++) {
      if (
        gridCoordinates[i].xCoordinate < this.mouseX &&
        gridCoordinates[i].xCoordinate + sizeOfTiles > this.mouseX &&
        gridCoordinates[i].yCoordinate < this.mouseY &&
        gridCoordinates[i].yCoordinate + sizeOfTiles > this.mouseY
      ) {
        this.currentTile = gridCoordinates[i];
      }
    }
  };

  drawCircle = () => {
    // const context = this.myCanvas.current.getContext('2d');
    buffer!.beginPath();
    buffer!.rect(this.mouseX, this.mouseY, 10, 10);
  };

  render() {
    return (
      <div className="App">
        <h1>Game Development</h1>
        <h2>Example</h2>
        <canvas ref={this.myCanvas} />
      </div>
    );
  }
}

export default App;
