import React, {Component, PropTypes} from 'react';
import ComponentStore from '../../helpers/componentStore';

export default class Button extends Component {
    constructor(props) {
        super(props);
        const value = props.value;
        this.state = {value};
    }

    render() {
        return (<div>
                <button
                    onClick={this.props.onClick}>
                    {this.props.label}
                </button>
                <p> {this.props.color}</p>
            </div>
        );
    }


}

Button.propTypes = {
    label: PropTypes.string,
    onClick: PropTypes.func,
    color: PropTypes.string,
    value: PropTypes.any
};

ComponentStore.registerComponent('button', Button);
