/* eslint-disable react/no-unused-state */
/* eslint-disable react/button-has-type */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';

import RunAndJump from './components/Run-And-Jump-Example/App';
import Collision from './components/Collision-Detection/App';
import TileMap from './components/Tilemap/App';
import SpriteAnimations from './components/SpriteAnimations/App';
import HexTileMap from './components/Hex-TileMap/App';
import Dice from './components/dice-example/App';
import ArmyGameSprite from './components/army-game-sprites/App';

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
