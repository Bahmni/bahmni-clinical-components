import React, { Component, PropTypes } from 'react';
import orderBy from 'lodash/orderBy';
import { DateUtil } from 'src/helpers/DateUtil';

import DrugRow from 'src/components/medication/DrugRow.jsx';

export default class DrugSection extends Component {
  constructor(props) {
    super(props);
    const date = new Date(Number.parseInt(props.header));
    this.header = DateUtil.dateFormat(date);
  }

  _displayRowData() {
    const rows = orderBy(this.props.data, 'sortWeight');
    return rows.map((rowData, index) => (
        <DrugRow data={rowData} key={index} />
      ));
  }

  render() {
    return (
      <div>
          <div className="table__row table__row__date">
              {this.header}
          </div>
          {this._displayRowData()}
      </div>
    );
  }
}

DrugSection.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  header: PropTypes.string.isRequired,
};

DrugSection.defaultValue = {
  data: [],
};
