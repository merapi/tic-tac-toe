import { SIGNS } from './consts';

export function isWinner(board, sign = null) {
  const winningCells = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0, n = board.length; i < n - 1; i++) {
    const [a, b, c] = winningCells[i];

    if (board[a] === board[b] && board[b] === board[c] && board[c] !== SIGNS.EMPTY) {
      if (!sign) return board[a];
      else return true;
    }
  }

  return false;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function botTurn(board) {
  for (let i = 0; i <= 8; i++) {
    let rand = getRandomInt(0, 8);
    if (board[rand] === SIGNS.EMPTY) {
      return rand;
    }
  }
}