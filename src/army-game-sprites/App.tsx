import React, { useState, useEffect, useRef } from 'react';

import clearCanvas from '../game-functions/clearCanvas';
import drawImageOnCanvas from '../game-functions/drawImageOnCanvas';
import updateCanvas from '../game-functions/updateCanvas';
import Sprite from '../SpriteAnimations/Sprite';

import spearmanIdle from './Spearman Sprite_Idle.png';

const ArmyGameSprites = () => {
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
  const spearmanSprite = new Sprite(spearmanIdle, 100, 100, 2);

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
        spearmanSprite.drawStrip(buffer!, 100, 100, 100);
        updateCanvas(buffer!, myCanvas.current!);
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
      {/* <img src={greenDice1} style={{ display: 'none' }} alt='none' /> */}
    </div>
  );
};

export default ArmyGameSprites;
