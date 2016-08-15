import React, { Component } from 'react';
import Board from './Board';

export default class GamePage extends Component {

  handleCellClick(index) {
    console.log('handleClick', index);
  }

  render() {
    const board = [
      'X', 'X', 'O',
      '_', '_', 'X',
      'O', 'X', '_'
    ];

    return (
      <div>
        <h1>Game board</h1>
        <Board board={board} onClick={this.handleCellClick} />
      </div>
    )
  }
}