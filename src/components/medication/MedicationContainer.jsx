import React, {Component, PropTypes} from 'react';
import ComponentStore from 'src/helpers/componentStore';
import  AutoComplete  from 'src/components/medication/AutoComplete.jsx';
import  Button  from 'src/components/medication/Button.jsx';
import {httpInterceptor} from 'src/helpers/httpInterceptor';

export default class MedicationContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {color: "red"};
        this.getDrugs = this.getDrugs.bind(this);
        this.addToPrescription = this.addToPrescription.bind(this);
        this.getColor = this.getColor.bind(this);
        this.onDrugSelect = this.onDrugSelect.bind(this);
    }

    getDrugs(input) {
        const {optionsUrl} = this.props;
        return httpInterceptor.get(optionsUrl + input)
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
        return (<div><AutoComplete loadOptions={this.getDrugs} placeholder="Search for drug to add to prescription"
                                   onValueChange={this.onDrugSelect} value={this.state.value}/>
            <Button onClick={this.addToPrescription} label="Add to prescription" color={this.state.color}/>

        </div>);
    }

    addToPrescription() {
        console.log("AddPrescriptionButton clicked")
    }

}

MedicationContainer.defaultProps = {
    optionsUrl: '/openmrs/ws/rest/v1/drug?s=ordered&v=custom:(uuid,strength,name,dosageForm,concept:(uuid,name,names:(name)))&q=',
};

MedicationContainer.propTypes = {
    optionsUrl: PropTypes.string,
};

ComponentStore.registerComponent('MedicationContainer', MedicationContainer);