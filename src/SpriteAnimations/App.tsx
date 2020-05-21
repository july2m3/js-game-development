/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';

import Minotaur from './minotaur.png'; // 93 x 100
import '../style.css';

import Sprite from './Sprite';

const fps = 5;
let startTime;
let fpsInterval: any;
let now: any;
let then: any;
let elapsed: any;

class App extends React.Component {
  myCanvas: any;

  mySprite: Sprite;

  constructor(props: any) {
    super(props);
    this.myCanvas = React.createRef();
    this.mySprite = new Sprite(Minotaur, 93, 100, 5);
  }

  componentDidMount() {
    this.setupCanvas();
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    this.gameLoop();
  }

  gameLoop = () => {
    window.requestAnimationFrame(this.gameLoop);

    // calc elapsed time since last loop
    now = Date.now();
    elapsed = now - then;

    // if enough time has elapsed, draw the next frame
    if (elapsed > fpsInterval) {
      this.mySprite.drawStrip(
        this.myCanvas.current.getContext('2d'),
        200,
        100,
        200,
      );

      // Get ready for next frame by setting then=now, but also adjust for your
      // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
      then = now - (elapsed % fpsInterval);
    }
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
        <h2>Example</h2>
        <canvas ref={this.myCanvas} />
      </div>
    );
  }
}

export default App;
