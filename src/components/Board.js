import React, { Component, PropTypes } from 'react';
import Cell from './Cell';

const Board = ({board, onClick}) => {
  return (
    <div className="board">
      {board.map((sign, index) => {
        return (<Cell onClick={onClick} sign={sign} index={index} key={index} />)
      }) }
    </div>
  )
}

Board.propTypes = {
  board: PropTypes.arrayOf(React.PropTypes.string.isRequired).isRequired,
  onClick: PropTypes.func.isRequired
}

export default Board;