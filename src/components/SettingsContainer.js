import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { newGame } from '../actions';
import { MODES } from '../consts';

export class SettingsContainer extends Component {
  constructor(props) {
    super();

    this.state = {
      mode: null
    };
    this.handleNewGame = this.handleNewGame.bind(this);
    this.selectMode = this.selectMode.bind(this);
  }

  selectMode(mode) {
    this.setState({ mode });
  }

  handleNewGame() {
    const mode = this.state.mode;
    this.props.router.push(`/game/${mode}`);
    this.props.newGame(mode);
  }

  render() {
    return (
      <div className="settings">
        <h1>Settings page</h1>
        <h2>Select game mode: </h2>
        <button className={this.state.mode === MODES.ONLINE_MULTIPLAYER ? 'selected' : ''}
          onClick={() => this.selectMode(MODES.ONLINE_MULTIPLAYER) }>Online Multiplayer</button>
        <button className={this.state.mode === MODES.VERSUS_BOT ? 'selected' : ''}
          onClick={() => this.selectMode(MODES.VERSUS_BOT) }>Versus Bot</button>
        <button className={this.state.mode === MODES.PASS_AND_PLAY ? 'selected' : ''}
          onClick={() => this.selectMode(MODES.PASS_AND_PLAY) }>Pass and Play</button>
        <br/>
        <button className="primary" onClick={this.handleNewGame}>NEW GAME</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  mode: state.mode
});

const mapDispatchToProps = dispatch => bindActionCreators({
  newGame
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SettingsContainer));