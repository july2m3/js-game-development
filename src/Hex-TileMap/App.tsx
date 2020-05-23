/* eslint-disable no-plusplus */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';

import '../style.css';

import fantasyTiles from './borderless.png';

const sizeOfTiles = 64;
const sizeBetweenTiles = sizeOfTiles * 2;

// 8 x 6 grid
// prettier-ignore
// do grid of x by x, otherwise it doesn't work
const grid = [
  [0, 0, 1, 1, 2, 2, 3, 3],
  [4, 4, 5, 5, 6, 6, 7, 7],
  [8, 8, 9, 9, 10, 10, 11, 11],
  [12, 12, 13, 13, 14, 14, 15, 15],
  [16, 16, 17, 17, 18, 18, 19, 19],
  [20, 20, 21, 21, 22, 22, 23, 23],
  [24, 24, 25, 25, 26, 26, 27, 27],
  [28, 28, 29, 29, 30, 30, 31, 31],
];

// let stop = false;
// let frameCount = 0;
const fps = 5;
let startTime;
let fpsInterval: any;
let now: any;
let then: any;
let elapsed: any;
const randomSeed = Math.random() * 100;

class App extends React.Component {
  myCanvas: any;

  gridImage: any;

  constructor(props: any) {
    super(props);
    this.myCanvas = React.createRef();
  }

  componentDidMount() {
    this.setupCanvas();
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;

    //load fantasy tiles
    this.gridImage = new Image(32, 32);
    this.gridImage.src = fantasyTiles;

    this.gameLoop();
  }

  clearScreen = () => {
    const ctx = this.myCanvas.current.getContext('2d');
    ctx.clearRect(
      0,
      0,
      this.myCanvas.current.width,
      this.myCanvas.current.height,
    );
  };

  drawHexImage = (x: number, y: number, tile = Math.random() * 7) => {
    const ctx = document.querySelector('canvas')?.getContext('2d')!;
    const w = 32;
    const h = 48;

    // console.log(
    // `When tile: ${tile},  ${Math.floor(tile / 7)} and mod is ${tile % 7}`,
    // );

    ctx.drawImage(
      this.gridImage,
      w * Math.floor(tile % 8),
      16 + 48 * Math.floor(tile / 8),
      w,
      w,
      x,
      y,
      sizeOfTiles,
      sizeOfTiles,
    );
  };

  drawGridOfTiles = () => {
    let xOffset = 0;
    for (let x = 0; x < grid.length; x++) {
      for (let y = 0; y < grid[x].length; y++) {
        // console.log(grid[x][y]);
        xOffset = y % 2 === 0 ? sizeOfTiles * 0.75 : 0;
        this.drawHexImage(
          x * sizeOfTiles * 1.5 + xOffset,
          (y * (Math.sqrt(3) * sizeOfTiles)) / 4,
          // grid[x][y],
          grid[y][x],
        );
      }
    }
  };

  drawGridOfImages = () => {
    let xOffset = 0;

    for (
      let x = -16;
      x * sizeOfTiles * 1.5 + xOffset < this.myCanvas.current.width;
      x += 1
    ) {
      for (
        let y = -16;
        (y * Math.sqrt(3) * sizeOfTiles) / 4 < this.myCanvas.current.height;
        y += 1
      ) {
        xOffset = y % 2 === 0 ? sizeOfTiles * 0.75 : 0;
        this.drawHexImage(
          x * sizeOfTiles * 1.5 + xOffset,
          (y * (Math.sqrt(3) * sizeOfTiles)) / 4,
          Math.floor(x * y * randomSeed) % 6,
        );
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

    // calc elapsed time since last loop
    now = Date.now();
    elapsed = now - then;

    // if enough time has elapsed, draw the next frame
    if (elapsed > fpsInterval) {
      // this.clipBackground();
      // this.drawGridOfImages();
      this.drawGridOfTiles();
      // Get ready for next frame by setting then=now, but also adjust for your
      // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
      then = now - (elapsed % fpsInterval);
    }
  };

  setupCanvas = () => {
    // this.myCanvas.current.style.background = 'white';
    this.myCanvas.current.style.background = document.querySelector(
      'body',
    )?.style.backgroundColor;
    this.myCanvas.current.height = window.innerHeight * 0.7;
    this.myCanvas.current.width = window.innerWidth * 0.7;
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
