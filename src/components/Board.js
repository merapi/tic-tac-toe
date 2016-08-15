import React, { Component } from 'react';
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

export default Board;