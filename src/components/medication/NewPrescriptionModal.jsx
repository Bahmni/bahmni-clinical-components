import React, {Component, PropTypes} from 'react';
import {httpInterceptor} from 'src/helpers/httpInterceptor';
import ReactModal from 'react-modal';
import Select from 'react-select';
import NumericBox from 'src/components/NumericBox.jsx'

export default class NewPrescriptionModal extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.handleDuration = this.handleDuration.bind(this);
    this.handleDurationUnits = this.handleDurationUnits.bind(this);
    this.handleFrequencies = this.handleFrequencies.bind(this);
    this.handleDose = this.handleDose.bind(this);
    this.handleDoseUnits = this.handleDoseUnits.bind(this);
    this.handleRoutes = this.handleRoutes.bind(this);
    this.handleTotalQuantity = this.handleTotalQuantity.bind(this);
    this.handleTotalQuantityUnits = this.handleTotalQuantityUnits.bind(this);
  }


  handleDuration(e){
    var duration = e.target.value;
    this.setState({duration: duration});
    if(this.state.dose) {
      this.setState({totalQuantity: this.state.dose * duration});
    }
  }

  handleDurationUnits(e){
    this.setState({durationUnits: e.target.value})
  }

  handleFrequencies(e){
    this.setState({frequency : e.target.value});
  }

  handleDose(e) {
    var dose = e.target.value;
    this.setState({dose : dose});
    if(this.state.duration) {
      this.setState({totalQuantity: dose * this.state.duration});
    }
  }

  handleDoseUnits(e) {
    this.setState({doseUnits : e.target.value});
  }

  handleRoutes(e) {
    this.setState({route : e.target.value});
  }

  handleTotalQuantity(e) {
    this.setState({totalQuantity : e.target.value});
  }

  handleTotalQuantityUnits(e) {
    this.setState({totalQuantityUnits : e.target.value});
  }

  render() {
    var styles = {
      overlay: {
        position: 'fixed',
        top: 100,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.75)'
      },
      content: {
        position: 'absolute',
        top: '200px',
        left: '74px',
        right: '40px',
        bottom: 'auto',
        border: '1px solid #ccc',
        background: '#fff',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '4px',
        outline: 'none',
        padding: '20px'

      }
    };
    return (<div>
        <ReactModal
          isOpen={true}
          contentLabel="onRequestClose Example"
          style={styles}>
          <p>{this.props.drug.name}</p>
          <NumericBox value={this.state.duration} onChange={this.handleDuration} />
          <Select options={this.props.treatmentConfig.durationUnits} value={this.state.durationUnits} labelKey="name" valueKey="name" onChange={this.handleDurationUnits}  searchable={false}/>

          <Select options={this.props.treatmentConfig.frequencies} value={this.state.frequency} labelKey="name" valueKey="name" onChange={this.handleFrequencies} searchable={false}/>

          <NumericBox value={this.state.dose} onChange={this.handleDose} />
          <Select options={this.props.treatmentConfig.doseUnits}   value={this.state.doseUnits} labelKey="name" valueKey="name" onChange={this.handleDoseUnits} searchable={false}/>

          <Select options={this.props.treatmentConfig.routes}  value={this.state.route} labelKey="name" valueKey="name" onChange={this.handleRoutes} searchable={false}/>

          <NumericBox value={this.state.totalQuantity} onChange={this.handleTotalQuantity} />
          <Select options={this.props.treatmentConfig.doseUnits}   value={this.state.totalQuantityUnits} labelKey="name" valueKey="name" onChange={this.handleTotalQuantityUnits} searchable={false}/>
          <br/>
          <br/>
          <button onClick={this.props.handleCloseModal}>Close</button>
        </ReactModal>
      </div>
    );

  }
}

NewPrescriptionModal.propTypes = {
  handleCloseModal: PropTypes.func,
  drug: PropTypes.object,
  treatmentConfig: PropTypes.object
};

