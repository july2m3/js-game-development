/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';

import './style.css';

class App extends React.Component {
  myCanvas: any;

  constructor(props: any) {
    super(props);
    this.myCanvas = React.createRef();
  }

  componentDidMount() {
    this.setupCanvas();
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

  gameLoop = () => {
    this.clearScreen();

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
        <h2>Example</h2>
        <canvas ref={this.myCanvas} />
      </div>
    );
  }
}

export default App;
