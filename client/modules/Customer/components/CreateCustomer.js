import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CustomerForm from './CustomerForm.js';
import AddressForm from './AddressForm.js';
import EmailForm from './EmailForm.js';
import MeasurementsForm from './MeasurementsForm.js';
import FormSubmitButton from './FormSubmitButton.js';


class CreateCustomer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    render() {
        return (<section>
                  <EmailForm />
                  <FormSubmitButton formName="createEmail" />
                  <br/>
                  <CustomerForm />
                  <FormSubmitButton formName="createCustomer" />
                  <AddressForm />
                  <FormSubmitButton formName="createAddress" />
                  <MeasurementsForm />
                  <FormSubmitButton formName="createMeasurements" />
                </section>);
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


export default connect(mapStateToProps, matchDispatchToProps)(CreateCustomer);
