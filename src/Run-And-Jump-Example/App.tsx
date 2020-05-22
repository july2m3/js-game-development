/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';

import '../style.css';
import Rectangle from './Rectangle';
import Controller from './Controller';

class App extends React.Component {
  myCanvas: any;

  rectangle: Rectangle;

  controller: Controller;

  constructor(props: any) {
    super(props);
    this.myCanvas = React.createRef();
    this.rectangle = new Rectangle(32, 32, 100, 400);
    this.controller = new Controller();
  }

  componentDidMount() {
    this.setupCanvas();
    this.gameLoop();
    document.addEventListener('keydown', this.controller.keyListen);
    document.addEventListener('keyup', this.controller.keyListen);
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

  drawRect = () => {
    const ctx = this.myCanvas.current.getContext('2d');
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.rect(
      this.rectangle.x,
      this.rectangle.y,
      this.rectangle.width,
      this.rectangle.height,
    );
    ctx.fill();
  };

  gameLoop = () => {
    this.clearScreen();
    this.drawRect();

    if (this.controller.up && this.rectangle.jumping === false) {
      this.rectangle.yVelocity -= 20;
      this.rectangle.jumping = true;
    }

    if (this.controller.left) {
      this.rectangle.xVelocity -= 0.5;
    }

    if (this.controller.right) {
      this.rectangle.xVelocity += 0.5;
    }

    //  gravity
    this.rectangle.yVelocity += 1.5;

    this.rectangle.x += this.rectangle.xVelocity;
    this.rectangle.y += this.rectangle.yVelocity;

    //  add friction to make rectangle eventually stop
    this.rectangle.xVelocity *= 0.9;
    this.rectangle.yVelocity *= 0.9;

    //  if rectangle floors below floor
    if (this.rectangle.y >= this.myCanvas.current.height - 64) {
      this.rectangle.jumping = false;
      // this.rectangle.y = 180 - 16 - 32;
      this.rectangle.y = this.myCanvas.current.height - 64;
      this.rectangle.yVelocity = 0;
    }

    //  if rectangle reaches left edge of screen, reset
    if (this.rectangle.x <= -this.rectangle.width) {
      this.rectangle.x = this.myCanvas.current.width - this.rectangle.width;
    }

    //  if rectangle reaches right edge of screen, reset
    if (this.rectangle.x >= this.myCanvas.current.width) {
      this.rectangle.x = -this.rectangle.width;
    }

    window.requestAnimationFrame(this.gameLoop);
  };

  setupCanvas = () => {
    this.myCanvas.current.style.background = 'white';
    this.myCanvas.current.height = window.innerHeight * 0.7;
    this.myCanvas.current.width = window.innerWidth * 0.7;
  };

  render() {
    return (
      <div className="App">
        <h1>Game Development</h1>
        <h2>Run and Jump Example</h2>
        <canvas ref={this.myCanvas} />
      </div>
    );
  }
}

export default App;
