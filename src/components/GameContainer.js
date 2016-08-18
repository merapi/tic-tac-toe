import React, { Component, PropTypes } from 'react';
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

GameContainer.propTypes = {
  board: PropTypes.arrayOf(React.PropTypes.string.isRequired).isRequired,
  turn: PropTypes.shape({
    count: PropTypes.number.isRequired,
    sign: PropTypes.string.isRequired,
    winner: PropTypes.string
  }).isRequired,
  mode: PropTypes.string.isRequired,
  player: React.PropTypes.object
}

const mapStateToProps = state => ({
  board: state.board,
  turn: state.turn,
  mode: state.mode,
  player: state.player
});

export default connect(
  mapStateToProps,
  { makeMove, newGame }
)(GameContainer);