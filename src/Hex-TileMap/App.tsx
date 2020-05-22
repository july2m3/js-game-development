/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';

import '../style.css';

import fantasyTiles from './borderless.png';

const sizeOfTiles = 64;
const sizeBetweenTiles = sizeOfTiles * 2;

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

    ctx.drawImage(
      this.gridImage,
      w * tile,
      16,
      w,
      w,
      x,
      y,
      sizeOfTiles,
      sizeOfTiles,
    );
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
      this.clipBackground();
      this.drawGridOfImages();
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
