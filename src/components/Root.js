import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class Root extends Component {
  render() {
    return (
      <div>
        <h1>Tic-Tac-Toe_React-Redux-Sockets</h1>
        <Link to="/settings">Settings link</Link><br/>
        <Link to="/game">Game link</Link><br/>
        {this.props.children}
      </div>
    )
  }
}

Root.propTypes = {
  children: PropTypes.node
}