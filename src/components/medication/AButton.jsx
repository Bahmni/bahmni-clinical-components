import React, { Component } from 'react';

export default class AButton extends Component {
  constructor() {
    super();
    this.state = {
      value: 1,
    };
    this.update = this.update.bind(this);
  }

  update() {
    this.setState({ value: this.state.value * 2 });
  }
  render() {
    return (<button onClick={this.update}>{this.state.value}</button>);
  }
}
