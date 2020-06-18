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
import HexTileMap from './Hex-TileMap/App';
import Dice from './dice-example/App';
import ArmyGameSprite from './army-game-sprites/App';

import './style.css';

type MyProps = {};
type MyState = {
  currentOption: any;
  showOptions: boolean;
};

class Main extends React.Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      currentOption: null,
      showOptions: true,
    };
  }

  showMap = (map: any) => {
    this.setState({ currentOption: map });
    this.optionPicked();
  };

  optionPicked = () => {
    this.setState({ showOptions: false });
  };

  refreshPage = () => {
    window.location.reload(false);
  };

  render({ currentOption, showOptions } = this.state) {
    return (
      <div className="main">
        <div className="showcase">{currentOption}</div>
        <div className="buttons">
          {!showOptions && (
            <button onClick={this.refreshPage}>Reload page</button>
          )}
          {showOptions && (
            <div>
              <button onClick={() => this.showMap(<RunAndJump />)}>
                Square with keyboard controls
              </button>

              <button onClick={() => this.showMap(<Collision />)}>
                Collision Detection
              </button>

              <button onClick={() => this.showMap(<TileMap />)}>
                Simple TileMap
              </button>
              <button onClick={() => this.showMap(<SpriteAnimations />)}>
                Sprite Animation
              </button>

              <button onClick={() => this.showMap(<HexTileMap />)}>
                Hex Tile Map
              </button>

              <button onClick={() => this.showMap(<Dice />)}>
                Dice Roll Example
              </button>

              <button onClick={() => this.showMap(<ArmyGameSprite />)}>
                Army Game Sprites
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Main;
