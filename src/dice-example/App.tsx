import React, { useState, useEffect, useRef } from 'react';

// import '../style.css';
import greenDice1 from './images/diceGreen1.png';
import greenDice2 from './images/diceGreen2.png';
import greenDice3 from './images/diceGreen3.png';
import greenDice4 from './images/diceGreen4.png';
import greenDice5 from './images/diceGreen5.png';
import greenDice6 from './images/diceGreen6.png';
import minotaurImage from './images/minotaur.png';

import clearCanvas from './game-functions/clearCanvas';
import drawImageOnCanvas from './game-functions/drawImageOnCanvas';
import updateCanvas from './game-functions/updateCanvas';
import { jsxClosingElement } from '@babel/types';
import Sprite from '../SpriteAnimations/Sprite';

const Dice = () => {
  const fps = 5;
  let startTime;
  let fpsInterval: any;
  let now: any;
  let then: any;
  let elapsed: any;
  const bufferWidth = 1000;
  const bufferHeight = 1000;
  const myCanvas = useRef<HTMLCanvasElement>(null);
  const [buffer, setBuffer] = useState(
    document.createElement('canvas').getContext('2d'),
  );
  const [frames, setupFrames] = useState([greenDice1, greenDice2, greenDice3, greenDice4, greenDice5, greenDice6]);
  const minotaurSprite = new Sprite(minotaurImage, 93, 100, 5);

  // initial setup
  useEffect(() => {
    myCanvas.current!.width = window.innerWidth * 0.7;
    myCanvas.current!.height = window.innerHeight * 0.7;
    myCanvas.current!.style.background = 'lightblue';
    buffer!.canvas.width = bufferWidth;
    buffer!.canvas.height = bufferHeight;
    updateCanvas(buffer!, myCanvas.current!);
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
  }, [buffer]);

  useEffect(() => {
    let currentFrame = 0;
    let requestId: number;

    const render = () => {

      // calc elapsed time since last loop
      now = Date.now();
      elapsed = now - then;

      // if enough time has elapsed, draw the next frame
      if (elapsed > fpsInterval) {
        console.log('here');
        clearCanvas(buffer!.canvas);
        clearCanvas(myCanvas.current!);
        updateCanvas(buffer!, myCanvas.current!);

        // draw stuff here
        drawImageOnCanvas(buffer!.canvas, frames[currentFrame], bufferWidth / 2, bufferHeight / 2);
        minotaurSprite.drawStrip(buffer!, 200, 100, 200);
        updateCanvas(buffer!, myCanvas.current!);
        currentFrame++;
        if (currentFrame >= frames.length) currentFrame = 0;

      }
      // Get ready for next frame by setting then=now, but also adjust for your
      // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
      then = now - (elapsed % fpsInterval);
      // requestAnimationFrame(render);
      requestId = requestAnimationFrame(render);
    };

    render();
    return () => {
      cancelAnimationFrame(requestId);
    };
  });

  return (
    <div className='App'>
      <h1>Game Development</h1>
      <h2>Example</h2>
      <canvas ref={myCanvas} />
      <img src={greenDice1} style={{ display: 'none' }} alt='none' />
      <img src={greenDice2} style={{ display: 'none' }} alt='none' />
      <img src={greenDice3} style={{ display: 'none' }} alt='none' />
      <img src={greenDice4} style={{ display: 'none' }} alt='none' />
      <img src={greenDice5} style={{ display: 'none' }} alt='none' />
      <img src={greenDice6} style={{ display: 'none' }} alt='none' />
      <img src={minotaurImage} style={{ display: 'none' }} alt='none' />
    </div>
  );
};

export default Dice;
