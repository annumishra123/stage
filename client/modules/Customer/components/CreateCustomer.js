import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { submit } from 'redux-form'
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

    saveCustomerDetails() {
        this.props.submit('createCustomer');
        this.props.submit('createAddress');
        this.props.submit('createMeasurements');
    }

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
                  <button onClick={ this.saveCustomerDetails.bind(this) }>Save All Information</button>
                </section>);
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        submit: submit
    }, dispatch);
}

function mapStateToProps(state) {
    return {};
}


export default connect(mapStateToProps, matchDispatchToProps)(CreateCustomer);
