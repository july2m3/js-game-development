import React, { useState, useEffect, useRef } from 'react';

// import '../style.css';
import greenDice1 from './images/diceGreen1.png';

import drawImageOnCanvas from './game-functions/drawImageOnCanvas';
import updateCanvas from './game-functions/updateCanvas';

const Dice = () => {
  // const bufferWidth = 1000;
  // const bufferHeight = 1000;
  const myCanvas = useRef<HTMLCanvasElement>(null);
  const [buffer, setBuffer] = useState(
    document.createElement('canvas').getContext('2d'),
  );

  // initial setup
  useEffect(() => {
    setTimeout(() => {
      console.log('here');
      myCanvas.current!.width = window.innerWidth * 0.7;
      myCanvas.current!.height = window.innerHeight * 0.7;
      myCanvas.current!.style.background = 'lightblue';

      buffer!.canvas.width = myCanvas.current!.width;
      buffer!.canvas.height = myCanvas.current!.height;

      drawImageOnCanvas(myCanvas.current!, greenDice1, 200, 200);
      drawImageOnCanvas(buffer!.canvas, greenDice1, 300, 200);

      updateCanvas(buffer!, myCanvas.current!);
    }, 100);
  }, [buffer]);

  // useEffect(() => {
  //   updateCanvas(buffer!, myCanvas.current!);
  // }, [buffer]);

  return (
    <div className='App'>
      <h1>Game Development</h1>
      <h2>Example</h2>
      <canvas ref={myCanvas} />
      <img src={greenDice1} style={{ display: 'none' }} alt='none' />
    </div>
  );
};

export default Dice;
