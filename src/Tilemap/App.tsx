/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';

import '../style.css';

const buffer = document.createElement('canvas').getContext('2d');
const size = 32;
const columns = 16;
// const drawMap

// A '16 x 9' array, stored in a 1d format
// prettier-ignore
const myName = 
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0,
    1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1,
    0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1,
    1, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0,
  ];

class App extends React.Component {
  myCanvas: any;

  constructor(props: any) {
    super(props);
    this.myCanvas = React.createRef();
  }

  componentDidMount() {
    this.setupCanvas();
    this.gameLoop();
    window.addEventListener('resize', this.resize, { passive: true });
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

  gameLoop = () => {
    // this.clearScreen();

    window.requestAnimationFrame(this.gameLoop);
  };

  setupCanvas = () => {
    buffer!.canvas.height = 9 * size;
    buffer!.canvas.width = 16 * size;
    this.myCanvas.current.height = window.innerHeight * 0.7;
    this.myCanvas.current.width = window.innerWidth * 0.7;

    this.drawMap();
  };

  // just keeps the canvas element sized appropriately
  resize = () => {
    this.myCanvas.current.height = window.innerHeight / 2;
    this.myCanvas.current.width = window.innerWidth / 2;

    this.drawMap();
  };

  getRandomColor = () => {
    return `rgb(${Math.floor(Math.random() * 255).toString()},${Math.floor(
      Math.random() * 255,
    ).toString()},${Math.floor(Math.random() * 255).toString()})`;
  };

  drawMap = () => {
    const ctx = this.myCanvas.current.getContext('2d');
    for (let i = 0; i < myName.length; i++) {
      buffer!.fillStyle = myName[i] === 1 ? this.getRandomColor() : '#000000';
      buffer!.fillRect(
        (i % columns) * size,
        Math.floor(i / columns) * size,
        size,
        size,
      );
    }

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
