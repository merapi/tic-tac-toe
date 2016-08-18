import React, { Component, PropTypes } from 'react';
import { MODES } from '../consts';

const Status = ({turn, mode, player, onNewGame}) => {
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

Status.propTypes = {
  turn: PropTypes.shape({
    count: PropTypes.number.isRequired,
    sign: PropTypes.string.isRequired,
    winner: PropTypes.string
  }).isRequired,
  mode: PropTypes.string.isRequired,
  player: React.PropTypes.object,
  onNewGame: PropTypes.func.isRequired
}

export default Status;