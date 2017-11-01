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

const style = {
    padding: '10px 20px',
    width: 140,
    display: 'block',
    margin: '20px auto',
    fontSize: '16px',
};

class Customer extends React.Component {
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
                  <FormSubmitButton formName="createEmail" text="Find Customer" />
                  <br/>
                  <CustomerForm />
                  { this.props.role === 'admin' ? <FormSubmitButton formName="createCustomer" text="Save Contact" /> : <br/> }
                  <AddressForm />
                  { this.props.role === 'admin' ? <FormSubmitButton formName="createAddress" text="Save Address" /> : <br/> }
                  <MeasurementsForm />
                  { this.props.role === 'admin' ? <FormSubmitButton formName="createMeasurements" text="Save Measurements" /> : <br/> }
                  { this.props.role === 'admin' ? <button type="button" style={ style } onClick={ this.saveCustomerDetails.bind(this) }>Save All Information</button> : <br/> }
                </section>);
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        submit: submit
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        role: state.auth.role
    };
}


export default connect(mapStateToProps, matchDispatchToProps)(Customer);
