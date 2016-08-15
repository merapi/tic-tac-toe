import React, { Component } from 'react';

const Status = ({turn, mode, onNewGame}) => {
  return (
    <div className="status">
      {turn.winner ? 
        <p>Winner: {turn.winner}</p> : 
        <p>Now goes: {turn.sign}, turn {turn.count}</p>
      }
      {turn.winner === null && turn.count === 10 ? <p>TIE</p> : ''}
      {turn.winner || turn.count === 10 ? <button onClick={onNewGame}>NEW GAME</button> : ''}
      <p>Mode: {mode}</p>
    </div>
  )
}

export default Status;