import React, { Component } from 'react';
import { MODES } from '../consts';

const Status = ({turn, mode, onNewGame, player}) => {
  return (
    <div className="status">
      {turn.winner ? 
        <p>Winner: {turn.winner}</p> : 
        <p>Now goes: {turn.sign}, turn {turn.count}</p>
      }
      {turn.winner === null && turn.count === 10 ? <p>TIE</p> : ''}
      {turn.winner || turn.count === 10 ? <button className="primary" onClick={onNewGame}>NEW GAME</button> : ''}
      <p>Mode: {mode}</p>
      {mode === MODES.ONLINE_MULTIPLAYER && player ? <p>Player: {player.id}, your sign: {player.sign}</p> : ''}
    </div>
  )
}

export default Status;