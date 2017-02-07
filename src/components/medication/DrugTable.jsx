import React, { Component, PropTypes } from 'react';
import DrugSection from 'src/components/medication/DrugSection.jsx';
import { DateUtil } from 'src/helpers/DateUtil';
import groupBy from 'lodash/groupBy';
import orderBy from 'lodash/orderBy';
import filter from 'lodash/filter';
import isEmpty from 'lodash/isEmpty';

const drugTableHeader = ['Drug Information - Name, Form, Route',
  'Schedule - Dosage, Frequency, Duration',
  'Total Qty',
  'Instructions',
  'Status',
  'Action'];

export default class DrugTable extends Component {
  constructor(props) {
    super(props);
  }

  _showHeaders() {
    return drugTableHeader.map((name, index) => {
      return (
        <div key={index} className="table-header-column">
          {name}
        </div>
      );
    })
  }

  _showSections() {
    const prescriptionData = this.props.data;
    //console.log("-----------", prescriptionData);
    const drugByGroup = groupBy(prescriptionData, (data) => { console.log("=====", data.dateActivated); return DateUtil.dateWithoutTime(new Date(data.dateActivated)).valueOf(); });
    console.log('dbg------', drugByGroup);
    this.myD
    let dateActivated = Object.keys(drugByGroup);
    dateActivated = orderBy(dateActivated, null, ['desc']);
    return dateActivated.map((date, index) => {
      return (
        <DrugSection key={index} data={drugByGroup[date]} header={date} />
      );
    })
  }

  _showData() {
    if(!isEmpty(this.props.data)) {
      return(
        <div>
          <div className="table-header">
            {this._showHeaders()}
          </div>
          <div className="table-sections">
            {this._showSections()}
          </div>
        </div>
      );
    }
    return (
      <div className="empty-table">No Active Treatments present</div>
    )
  }

  render() {
    return this._showData();
  }
}

DrugTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  activePrescription: PropTypes.bool.isRequired,
};
