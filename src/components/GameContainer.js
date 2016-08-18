import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Board from './Board';
import Status from './Status';
import { makeMove, newGame } from '../actions';
import { MODES } from '../consts';

export class GameContainer extends Component {

  constructor() {
    super();
    
    this.handleCellClick = this.handleCellClick.bind(this);
  }

  handleCellClick(index) {
    this.props.makeMove(index, this.props.params.mode);
  }

  render() {
    const { board, turn, mode, player } = this.props;
    return (
      <div>
        <h1>Game board</h1>
        <Status turn={turn} mode={mode} player={player} onNewGame={this.props.newGame} />
        <Board board={board} onClick={this.handleCellClick} />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  board: state.board,
  turn: state.turn,
  mode: ownProps.params.mode || MODES.PASS_AND_PLAY,
  player: state.player
});

const mapDispatchToProps = dispatch => bindActionCreators({
  makeMove,
  newGame
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);