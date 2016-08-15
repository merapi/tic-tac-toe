import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Board from './Board';
import Status from './Status';
import { makeMove, newGame } from '../actions';

export class GameContainer extends Component {

  constructor() {
    super();
    
    this.handleCellClick = this.handleCellClick.bind(this);
  }

  handleCellClick(index) {
    this.props.makeMove(index);
  }

  render() {
    const { board, turn, mode } = this.props;
    return (
      <div>
        <h1>Game board</h1>
        <Status turn={turn} mode={mode} onNewGame={this.props.newGame} />
        <Board board={board} onClick={this.handleCellClick} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    board: state.board,
    turn: state.turn,
    mode: state.mode
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    makeMove,
    newGame
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);