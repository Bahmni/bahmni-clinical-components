import React, {Component, PropTypes} from 'react';
export default class NumericBox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    return (
      <div><input type="number" value={this.props.value} onChange={this.props.onChange}/></div>)
  }
}
NumericBox.propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func
  };



