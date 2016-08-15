import { ACTIONS, SIGNS, MODES } from './consts';
import { INITIAL_STATE } from './reducers/BoardReducer';
import { isWinner, botTurn } from './utils';

export function newGame() {
  return (dispatch) => {
    dispatch(setBoard(INITIAL_STATE))
  }
}

export function setBoard(board) {
  return {
    type: ACTIONS.SET_BOARD,
    payload: { board }
  }
}

export function setCell(index, sign) {
  return {
    type: ACTIONS.SET_CELL,
    payload: { index, sign }
  }
}

export function setMode(mode) {
  return {
    type: ACTIONS.SET_MODE,
    payload: { mode }
  }
}

export function setTurn(sign) {
  return {
    type: ACTIONS.SET_TURN,
    payload: { sign }
  }
}

export function setWinner(sign) {
  return {
    type: ACTIONS.SET_WINNER,
    payload: { sign }
  }
}

export function setPlayer(id, sign) {
  return {
    type: ACTIONS.SET_PLAYER,
    payload: { id, sign }
  }
}

export function setTurnRemote(turn) {
  return {
    type: ACTIONS.REMOTE_SET_TURN,
    payload: turn
  }
}

export function makeMove(index, isBot = false) {
  return (dispatch, getState, socket) => {
    const { turn, board, mode, player } = getState();
    const { sign, count, winner } = turn;
    const nextTurnSign = (turn.sign == SIGNS.X ? SIGNS.O : SIGNS.X);

    if (board[index] !== SIGNS.EMPTY) {
      // todo: dispatch(setError('Cell is not empty'));
      return;
    }
    if (winner !== null) {
      // todo: dispatch(setError('Game is over'));
      return;
    }

    if (mode === MODES.ONLINE_MULTIPLAYER) {
      if (player.sign != sign) {
        // todo: dispatch(setError('Not your turn'));
        return;
      }

      socket.emit('action', setCell(index, sign));
    }
    
    dispatch(setCell(index, sign));

    const finalBoard = getState().board;
    const won = isWinner(finalBoard);
    if (won) {
      dispatch(setWinner(won));
    }

    dispatch(setTurn(nextTurnSign));

    if (!isBot && !won && mode === MODES.VERSUS_BOT) {
      setTimeout(() => {
        dispatch(makeMove(botTurn(finalBoard), true));
      }, 100);
    }
  }
}