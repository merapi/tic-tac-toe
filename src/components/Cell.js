import React, { Component } from 'react';
import * as CONSTS from '../consts';

const Cell = ({sign, index, onClick}) => {
  let className = '';

  if (sign === CONSTS.SIGNS.X) {
    className = 'sign-x';
  } else if (sign === CONSTS.SIGNS.O) {
    className = 'sign-o';
  } else {
    className = 'sign-empty';
  }

  return (
    <div className={"cell " + className} onClick={() => onClick(index) }>
      {sign}
    </div>
  )
}

export default Cell;