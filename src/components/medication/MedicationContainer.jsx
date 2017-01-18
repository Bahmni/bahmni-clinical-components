import React, {Component, PropTypes} from 'react';
import ComponentStore from '../../helpers/componentStore';
import  AutoComplete  from './AutoComplete.jsx';
import  Button  from './Button.jsx';
import {httpInterceptor} from '../../helpers/httpInterceptor';

export default class MedicationContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {color: "red"};
        this.getDrugs = this.getDrugs.bind(this);
        this.addToPrescription = this.addToPrescription.bind(this);
        this.onDrugSelect = this.onDrugSelect.bind(this);
    }

    getDrugs(input) {
        var optionsUrl = '/openmrs/ws/rest/v1/drug';
        var params = {
            v: "custom:(uuid,strength,name,dosageForm,concept:(uuid,name,names:(name)))",
            s: "ordered",
            q: input
        };
        if (this.props.conceptSet) {
            params.q = this.props.conceptSet;
            params.s = "byConceptSet";
        }
        return httpInterceptor.get(optionsUrl, params)
            .then((data) => {
                const options = data.results;
                return {options: options};
            }).catch(() => {
                const options = [];
                return {options: options};
            });
    }

    onDrugSelect(value) {
        if (value && value.uuid) {
            this.setState({color: "blue", value: value});
        }
        else {
            this.setState({color: "red", value: value})
        }
    }

    render() {
        var minimumInput = 0;
        if (!this.props.isDropDown) {
            minimumInput = 2
        }
        return (<div><AutoComplete loadOptions={this.getDrugs} placeholder="Search for drug to add to prescription"
                                   onValueChange={this.onDrugSelect} searchable={!this.props.isDropDown}
                                   minimumInput={minimumInput}/>
            <Button onClick={this.addToPrescription} label="Add to prescription" color={this.state.color}/>

        </div>);
    }

    addToPrescription() {
        console.log("AddPrescriptionButton clicked")
    }

}

MedicationContainer.propTypes = {
    isDropDown: PropTypes.bool,
    conceptSet: PropTypes.string
};

MedicationContainer.defaultProps = {
    isDropDown: false,
    conceptSet: null
};

ComponentStore.registerComponent('MedicationContainer', MedicationContainer);