import React, { Component, PropTypes } from 'react';
import ComponentStore from 'src/helpers/componentStore';
import  AutoComplete  from 'src/components/medication/AutoComplete.jsx';
import { httpInterceptor } from 'src/helpers/httpInterceptor';

export default class MedicationContainer extends Component {
    constructor(props){
        super(props);
        this.state = {};
        this.getDrugs = this.getDrugs.bind(this);
    }

    getDrugs(input){
        console.log("handleChange");
        const { optionsUrl } = this.props;
        return httpInterceptor.get(optionsUrl + input)
            .then((data) => {
                const options = data.results;
                //
                return { options: options};
            }).catch(() => {
                const options = [];
                // this.setState({ options:options });
                return { options: options};
            });
    }

    render() {
        console.log("render");
        return (<AutoComplete loadOptions={this.getDrugs} />);
    }

}

MedicationContainer.defaultProps = {
    optionsUrl : '/openmrs/ws/rest/v1/drug?s=ordered&v=custom:(uuid,strength,name,dosageForm,concept:(uuid,name,names:(name)))&q=',
};

MedicationContainer.propTypes = {
    optionsUrl : PropTypes.string,
};

ComponentStore.registerComponent('MedicationContainer', MedicationContainer);