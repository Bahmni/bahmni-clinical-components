import React, { Component } from 'react';

export default class AButton extends Component {

    render() {
        return (<button type="button">{this.props.title}</button>);
    }
}

AButton.propTypes = {
    title: React.PropTypes.string.isRequired,
};
