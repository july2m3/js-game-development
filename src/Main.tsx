/* eslint-disable react/no-unused-state */
/* eslint-disable react/button-has-type */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';

import RunAndJump from './Run-And-Jump-Example/App';
import Collision from './Collision-Detection/App';
import TileMap from './Tilemap/App';
import DiceRoll from './DiceRoll/App';

import './style.css';

type MyProps = {};
type MyState = {
  showRunAndJump: boolean;
  showCollision: boolean;
  showOptions: boolean;
  showTileMap: boolean;
  showDiceRoll: boolean;
};

class Main extends React.Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      showOptions: true,
      showRunAndJump: false,
      showCollision: false,
      showTileMap: false,
      showDiceRoll: false,
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

  showDiceRoll = () => {
    this.setState({ showDiceRoll: true });
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
      showDiceRoll,
    } = this.state,
  ) {
    return (
      <div className="main">
        <div className="showcase">
          {showRunAndJump && <RunAndJump />}
          {showCollision && <Collision />}
          {showTileMap && <TileMap />}
          {showDiceRoll && <DiceRoll />}
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
              <button onClick={this.showDiceRoll}>Show DiceRoll</button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Main;
