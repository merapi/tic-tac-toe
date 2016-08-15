import { ACTIONS, SIGNS } from './consts';
import { INITIAL_STATE } from './reducers/BoardReducer';
import { isWinner } from './utils';

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

export function makeMove(index) {
  return (dispatch, getState) => {
    const { turn, board } = getState();
    const { sign, count, winner } = turn;
    const nextTurnSign = (turn.sign == SIGNS.X ? SIGNS.O : SIGNS.X);

    if (board[index] !== SIGNS.EMPTY) {
      // dispatch(setError('Cell is not empty'));
      return;
    }
    if (winner !== null) {
      // dispatch(setError('Game is over'));
      return;
    }
    
    dispatch(setCell(index, sign));

    const finalBoard = getState().board;
    const won = isWinner(finalBoard, sign);
    if (won) {
      dispatch(setWinner(sign));
    }

    dispatch(setTurn(nextTurnSign));
  }
}