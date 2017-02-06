import React, {Component, PropTypes} from 'react';
import NewPrescribedDrugRow from 'src/components/medication/NewPrescribedDrugRow.jsx';

export default class NewPrescribedDrugTable extends Component {
  constructor(props) {
    super(props);
  }

  _showHeaders() {
    const headerNames = [];
    return headerNames.map((name, index) => {
      return (
        <div key={index} className="table-header-column">
          {name}
        </div>
      );
    })
  }

  _showRow() {
    return this.props.drugOrderList.map((drugOrder) => {
      return (
        <NewPrescribedDrugRow drugOrder={drugOrder}/>
      );
    })
  }

  render() {
    return (
      <div>
        <div className="table-header">
          {this._showHeaders()}
        </div>
        {this._showRow()}
      </div>
    );
  }
}

NewPrescribedDrugTable.propTypes = {
  drugOrderList: PropTypes.array,
  headers: PropTypes.array
};

NewPrescribedDrugTable.defaultValue = {
  drugOrderList: [],
};
