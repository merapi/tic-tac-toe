import React, {Component} from 'react';
import { Link } from 'react-router';

export default class Root extends Component {
  render() {
    return (
      <div>
        <h1>Starter</h1>
        <Link to="/">Index link</Link><br/>
        <Link to="/settings">Settings link</Link><br/>
        <Link to="/game">Game link</Link><br/>
        {this.props.children}
      </div>
    )
  }
}