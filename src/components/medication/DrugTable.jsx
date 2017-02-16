import React, { Component, PropTypes } from 'react';
import DrugSection from 'src/components/medication/DrugSection.jsx';
import { DateUtil } from 'src/helpers/dateUtil';
import groupBy from 'lodash/groupBy';
import orderBy from 'lodash/orderBy';
import isEmpty from 'lodash/isEmpty';

const drugTableHeader = ['Drug Information - <small class="extraInfo">Name, Form, Route</small>',
  'Schedule - <small class="extraInfo">Dosage, Frequency, Duration</small>',
  'Total Qty',
  'Instructions',
  'Status',
  'Action'];

export default class DrugTable extends Component {

  _showHeaders() {
    return drugTableHeader.map((name, index) => (
      <div className={ `table__cell table__cell--${index}` }
        dangerouslySetInnerHTML={{ __html: name }} key={ index }
      />
    ));
  }

  _showSections() {
    const prescriptionData = this.props.data;
    const drugByGroup = groupBy(prescriptionData, (data) =>
      DateUtil.dateWithoutTime(new Date(data.dateActivated)).valueOf());
    let dateActivated = Object.keys(drugByGroup);
    dateActivated = orderBy(dateActivated, null, ['desc']);
    return dateActivated.map((date) => (
        <DrugSection data={drugByGroup[date]} header={date} key={date} />
      ));
  }

  _showData() {
    if (!isEmpty(this.props.data)) {
      return (
      <div className="table">
        <div className="table__header table__header--filled">
          <div className="table__row" >
             {this._showHeaders()}
          </div>
        </div>
        <div className="table__body">
          <div className="table__body__row">
              {this._showSections()}
          </div>
        </div>
      </div>);
    }
    return (
      <div className="empty-table">No Active Treatments present</div>
    );
  }

  render() {
    return this._showData();
  }
}

DrugTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};
