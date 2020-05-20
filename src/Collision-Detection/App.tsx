/* eslint-disable react/no-unused-state */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';

import '../style.css';
import Rectangle from './Rectangle';

const squareSize = 64;

class App extends React.Component {
  myCanvas: any;

  rectanglePlayer: Rectangle;

  rectangleEnemy: Rectangle;

  mouseX: number;

  mouseY: number;

  constructor(props: any) {
    super(props);
    this.myCanvas = React.createRef();
    this.rectanglePlayer = new Rectangle(
      squareSize,
      squareSize,
      100,
      100,
      '#0088ff',
    );
    this.rectangleEnemy = new Rectangle(
      squareSize,
      squareSize,
      200,
      200,
      'red',
    );
    this.mouseX = 100;
    this.mouseY = 100;
  }

  componentDidMount() {
    this.setupCanvas();
    this.gameLoop();
    this.myCanvas.current.addEventListener('mousemove', this.cursorMove);
    this.myCanvas.current.addEventListener('touchmove', this.cursorMove, {
      passive: true,
    });
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

  cursorMove = (e: any) => {
    const rectangle = this.myCanvas.current.getBoundingClientRect();
    this.mouseX = e.clientX - rectangle.left;
    this.mouseY = e.clientY - rectangle.top;
  };

  gameLoop = () => {
    this.clearScreen();

    this.rectanglePlayer.x = this.mouseX - this.rectanglePlayer.width / 2;
    this.rectanglePlayer.y = this.mouseY - this.rectanglePlayer.height / 2;

    this.rectanglePlayer.draw(this.myCanvas.current.getContext('2d'));
    this.rectangleEnemy.draw(this.myCanvas.current.getContext('2d'));

    if (this.rectanglePlayer.testCollision(this.rectangleEnemy)) {
      this.rectanglePlayer.color = 'red';
    } else {
      this.rectanglePlayer.color = 'blue';
    }

    window.requestAnimationFrame(this.gameLoop);
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
        <h2>Collision Detection Example</h2>
        <canvas ref={this.myCanvas} />
      </div>
    );
  }
}

export default App;
