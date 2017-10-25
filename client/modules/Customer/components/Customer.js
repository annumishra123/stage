import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CreateCustomer from './CreateCustomer.js';
import FormSubmitButton from './FormSubmitButton.js';


class Customer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() { }

    render() {
        return (<section>
            <CreateCustomer />
            <FormSubmitButton formName="createCustomer" /></section>);
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
    }, dispatch);
}

function mapStateToProps(state) {
    return {
    };
}


export default connect(mapStateToProps, matchDispatchToProps)(Customer);
