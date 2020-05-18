import React from 'react';

import './style.css';

class App extends React.Component {
  myCanvas: any;
  constructor(props: any) {
    super(props);
    this.myCanvas = React.createRef();
  }

  setupCanvas = () => {
    this.myCanvas.current.style.background = 'white';
    this.myCanvas.current.height = window.innerHeight / 2;
    this.myCanvas.current.width = window.innerWidth / 2;
  };

  componentDidMount() {
    this.setupCanvas();
  }

  render() {
    return (
      <div className="App">
        <h1>Game Development</h1>
        <canvas ref={this.myCanvas} />
      </div>
    );
  }
}

export default App;
