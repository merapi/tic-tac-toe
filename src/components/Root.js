import React, {Component} from 'react';
import { Link } from 'react-router';

export default class Root extends Component {
  render() {
    return (
      <div>
        <h1>Starter</h1>
        <Link to="/">Index link</Link> <Link to="/welcome">Welcome link</Link>
        {this.props.children}
      </div>
    )
  }
}