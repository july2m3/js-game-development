/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';

import '../style.css';

// 1024 x 1920
// 11 x 20
// 92 x 96
import Minotaur from './minotaur.png';
import fantasyTiles from './borderless.png';

// const sizeOfTiles = 16;
const sizeOfTiles = 128;
const sizeBetweenTiles = sizeOfTiles * 2;

// let stop = false;
// let frameCount = 0;
const fps = 30;
let startTime;
let fpsInterval: any;
let now: any;
let then: any;
let elapsed: any;

// make an empty 2d array for grid
let arr = [[400], [400]];

class App extends React.Component {
  myCanvas: any;

  frame: number;

  gridImage: any;

  minotaurImage: any;

  constructor(props: any) {
    super(props);
    this.myCanvas = React.createRef();
    this.frame = 0;
  }

  componentDidMount() {
    this.generateMap();
    this.setupCanvas();
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;

    //load fantasy tiles
    this.gridImage = new Image(32, 32);
    this.gridImage.src = fantasyTiles;

    //load minotaur image
    this.minotaurImage = new Image(93, 100);
    this.minotaurImage.src = Minotaur;

    this.gameLoop();
  }

  generateMap = () => {
    for (let i = 0; i < 100; i++) {
      arr[i] = [];
      for (let j = 0; j < 100; j++) {
        arr[i][j] = Math.floor(Math.random() * 7);
      }
    }
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

  drawStrip = (
    x: number,
    y: number,
    frame = 0,
    image = this.minotaurImage,
    scale = 200,
  ) => {
    const ctx = document.querySelector('canvas')?.getContext('2d')!;
    ctx.drawImage(
      image,
      image.width * frame,
      0,
      image.width,
      image.height,
      x - frame * 7,
      y,
      scale,
      scale,
    );
  };

  drawHexImage = (x: number, y: number, tile = Math.random() * 7) => {
    const ctx = document.querySelector('canvas')?.getContext('2d')!;
    const w = 32;

    ctx.drawImage(
      this.gridImage,
      w * tile,
      sizeOfTiles,
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
      let x = -20;
      // x < this.myCanvas.current.width / sizeOfTiles;
      x < this.myCanvas.current.width;
      x += 1
    ) {
      for (
        let y = -20;
        // y < this.myCanvas.current.height / sizeOfTiles;
        y < this.myCanvas.current.height;
        y += 1
      ) {
        xOffset = y % 2 === 0 ? sizeOfTiles * 0.75 : 0;
        this.drawHexImage(
          x * sizeOfTiles * 1.5 + xOffset,
          (y * (Math.sqrt(3) * sizeOfTiles)) / 4,
          x % 7,
        );
      }
    }
  };

  gameLoop = () => {
    // this.clearScreen();
    window.requestAnimationFrame(this.gameLoop);

    // calc elapsed time since last loop

    now = Date.now();
    elapsed = now - then;

    // if enough time has elapsed, draw the next frame
    if (elapsed > fpsInterval) {
      if (this.frame >= 5) {
        this.frame = 0;
      }
      this.drawGridOfImages();
      this.drawStrip(70, 100, this.frame);
      this.frame += 1;

      // Get ready for next frame by setting then=now, but also adjust for your
      // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
      then = now - (elapsed % fpsInterval);
    }
  };

  setupCanvas = () => {
    this.myCanvas.current.style.background = 'white';
    this.myCanvas.current.height = window.innerHeight / 2;
    this.myCanvas.current.width = window.innerWidth / 2;
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
