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
          className={ classNames('btn--highlight fl',
            { error: this.props.color === 'red' }) } onClick={this.props.onClick}
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

