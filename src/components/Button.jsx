import React, { Component, PropTypes } from 'react';

export default class Button extends Component {
  constructor(props) {
    super(props);
    const value = props.value;
    this.state = {value};
  }

  render() {
    return (
      <div>
        <button
          onClick={this.props.onClick}
        >
          {this.props.label}
        </button>
        <p> {this.props.color}</p>
      </div>
    );
  }
}

Button.propTypes = {
  color: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
  value: PropTypes.any,
};

