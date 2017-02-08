import React, { Component, PropTypes } from 'react';
import DrugSection from 'src/components/medication/DrugSection.jsx';
import groupBy from 'lodash/groupBy';
import orderBy from 'lodash/orderBy';

const drugTableHeader = ['Drug Information - Name, Form, Route',
  'Schedule - Dosage, Frequency, Duration',
  'Total Qty',
  'Instructions',
  'Status',
  'Action'];

export default class DrugTable extends Component {

  _showHeaders() {
    return drugTableHeader.map((name, index) => (
        <div key={index} className="table-header-column">
          {name}
        </div>
      ));
  }

  _showSections() {
    const drugBuyGroup = groupBy(this.props.data, 'dateActivated');
    let dateActivated = Object.keys(drugBuyGroup);
    dateActivated = orderBy(dateActivated, null, ['desc']);
    return dateActivated.map((date, index) => (
        <DrugSection key={index} data={drugBuyGroup[date]} header={date} />
      ));
  }

  render() {
    return (
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
}

DrugTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};

DrugTable.defaultProps = {
  data: [
    { name: 'drug1', dateActivated: 1484850600000 },
    { name: 'drug2', dateActivated: 1484850600000 },
  ],
};
