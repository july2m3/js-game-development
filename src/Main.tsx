/* eslint-disable react/no-unused-state */
/* eslint-disable react/button-has-type */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';

import RunAndJump from './Run-And-Jump-Example/App';
import Collision from './Collision-Detection/App';
import TileMap from './Tilemap/App';
import SpriteAnimations from './SpriteAnimations/App';

import './style.css';

type MyProps = {};
type MyState = {
  showRunAndJump: boolean;
  showCollision: boolean;
  showOptions: boolean;
  showTileMap: boolean;
  showSpriteAnimation: boolean;
};

class Main extends React.Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      showOptions: true,
      showRunAndJump: false,
      showCollision: false,
      showTileMap: false,
      showSpriteAnimation: false,
    };
  }

  showRunAndJump = () => {
    this.setState({ showRunAndJump: true });
    this.setState({ showOptions: false });
  };

  showCollision = () => {
    this.setState({ showCollision: true });
    this.setState({ showOptions: false });
    this.blockButtons();
  };

  showTileMap = () => {
    this.setState({ showTileMap: true });
    this.setState({ showOptions: false });
    this.blockButtons();
  };

  showSpriteAnimation = () => {
    this.setState({ showSpriteAnimation: true });
    this.setState({ showOptions: false });
    this.blockButtons();
  };

  blockButtons = () => {};

  refreshPage = () => {
    window.location.reload(false);
  };

  render(
    {
      showOptions,
      showRunAndJump,
      showCollision,
      showTileMap,
      showSpriteAnimation,
    } = this.state,
  ) {
    return (
      <div className="main">
        <div className="showcase">
          {showRunAndJump && <RunAndJump />}
          {showCollision && <Collision />}
          {showTileMap && <TileMap />}
          {showSpriteAnimation && <SpriteAnimations />}
        </div>
        <div className="buttons">
          {!showOptions && (
            <button onClick={this.refreshPage}>Reload page</button>
          )}
          {showOptions && (
            <div>
              <button onClick={this.showRunAndJump}>
                Running and Jump Example
              </button>

              <button onClick={this.showCollision}>
                Collision Detection example
              </button>

              <button onClick={this.showTileMap}>Show TileMap</button>
              <button onClick={this.showSpriteAnimation}>
                Show SpriteAnimations
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Main;
