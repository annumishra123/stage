import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import CustomerForm from './CustomerForm.js';
import AddressForm from './AddressForm.js';
import EmailForm from './EmailForm.js';
import MeasurementsForm from './MeasurementsForm.js';
import FormSubmitButton from './FormSubmitButton.js';
import { selectAddress, saveAllCustomerDetails } from '../CustomerActions';

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

    saveAllCustomerDetails() {
        this.props.saveAllCustomerDetails();
    }

    createShopOrder() {
        browserHistory.push('/shop/create');
    }

    createRentOrder() {
        browserHistory.push('/rent/create');
    }

    selectAddress(id) {
        this.props.selectAddress(id);
    }

    render() {
        return (<section>
                  <EmailForm />
                  <FormSubmitButton formName="createEmail" text="Find Customer" />
                  <br/>
                  <CustomerForm />
                  { this.props.role === 'admin' ? <FormSubmitButton formName="createCustomer" text="Save Contact" /> : <br/> }
                  <AddressForm selectAddress={ this.selectAddress.bind(this) } />
                  { this.props.role === 'admin' ? <FormSubmitButton formName="createAddress" text="Save Address" /> : <br/> }
                  <MeasurementsForm />
                  { this.props.role === 'admin' ? <FormSubmitButton formName="createMeasurements" text="Save Measurements" /> : <br/> }
                  { this.props.role === 'admin' ? <button type="button" style={ style } onClick={ this.saveAllCustomerDetails.bind(this) }>Save All Information</button> : <br/> }
                  { this.props.role === 'admin' && this.props.customerDetail && this.props.selectedAddress ? <button type="button" style={ style } onClick={ this.createShopOrder.bind(this) }>New Shop Order</button> : <br/> }
                  { this.props.role === 'admin' && this.props.customerDetail && this.props.selectedAddress ? <button type="button" style={ style } onClick={ this.createRentOrder.bind(this) }>New Rent Order</button> : <br/> }
                </section>);
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        submit: submit,
        selectAddress: selectAddress,
        saveAllCustomerDetails: saveAllCustomerDetails
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        role: state.auth.role,
        customerDetail: state.customerDetail,
        selectedAddress: state.selectedAddress
    };
}


export default connect(mapStateToProps, matchDispatchToProps)(Customer);
