import React, { Component, PropTypes } from 'react';
import { DateUtil } from 'src/helpers/DateUtil';

export default class StoppedReason extends Component {
  constructor(props) {
    super(props);
    this.state= { toggleFlag: false };
    this._toggleDisplay = this._toggleDisplay.bind(this);
  }

  _toggleDisplay() {
    this.setState({ toggleFlag: !this.state.toggleFlag });
  }

  _stoppedReason(data) {
    const stoppedConceptReason = data.orderReasonConcept ? data.orderReasonConcept.name : '';
    const stoppedReasonText = data.orderReasonText || '';
    const stoppedDate = DateUtil.dateFormat(data.dateStopped);
    let stoppedReason = `Stopped on ${stoppedDate}`;
    if(stoppedReasonText) {
      stoppedReason += ` due to ${stoppedReasonText}`;
    }
    if(stoppedConceptReason) {
      stoppedReason += ` (${stoppedConceptReason})`;
    }
    if (this.state.toggleFlag) {
      return (
        <div>
          {stoppedReason}
        </div>
      );
    }
    return null;
  }

  render() {
    return (
      <div className="stopped-reason" onClick={ this._toggleDisplay }>
        REASON : {this._stoppedReason(this.props.data)}
      </div>
    );
  }
}

StoppedReason.propTypes = {
  data: PropTypes.object.isRequired,
};
