import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
export default class Button extends Component {
  constructor(props) {
    super(props);
    const value = props.value;
    this.state = { value };
  }

  render() {
    return (
        <button
          onClick={this.props.onClick} className={ classNames('btn--highlight fl',
          {'cancel': this.props.color == 'red'}) }
        >
          {this.props.children}
        </button>
    );
  }
}

Button.propTypes = {
  color: PropTypes.string,
  onClick: PropTypes.func,
  value: PropTypes.any,
};

