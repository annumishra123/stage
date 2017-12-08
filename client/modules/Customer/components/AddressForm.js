import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { createAddress } from '../CustomerActions.js';
import clientConfig from '../../../config.js';

// Import Style
import styles from './customerForm.css';

let AddressForm = props => {
  const {handleSubmit, selectAddress} = props;
  const handleCityChange = function(e) {
    if (e.target.value) {
      let state = clientConfig.serviceCities.find(o => o.city == e.target.value).state
      props.change('state', state);
    } else {
      props.change('state', '');
    }
  }
  const handleSelectAddress = function(e) {
    props.selectAddress(e.target.value);
  }
  const renderSavedAddress = function() {
    if (props.addresses && props.addresses.length > 0) {
      return <div className={ styles.savedAddresses }>
               <h3>Saved Addresses</h3>
               <br/>
               { props.addresses.map((address, i) => {
                   return <div key={ i }>
                            { props.role === 'admin' ? <input name="shippingId" type="radio" value={ address.shippingId } checked={ address.shippingId == props.selectedAddress } onChange={ handleSelectAddress } /> : null }
                            <div>
                              <label htmlFor="address">Address :
                                { address.address }
                              </label>
                            </div>
                            <div>
                              <label htmlFor="address">City :
                                { address.city }
                              </label>
                            </div>
                            <div>
                              <label htmlFor="address">State :
                                { address.state }
                              </label>
                            </div>
                            <div>
                              <label htmlFor="address">Pincode :
                                { address.pincode }
                              </label>
                            </div>
                            <br/>
                          </div>;
                 }) }
             </div>
    }
  }
  const renderAddressForm = function() {
    if (props.role === 'admin') {
      return <div>
               <h3>Save New Address</h3>
               <br/>
               <div>
                 <label htmlFor="address">Address </label>
                 <Field name="address" component="input" type="text" />
               </div>
               <div>
                 <label htmlFor="city">City </label>
                 <Field name="city" component="select" type="text" onChange={ handleCityChange }>
                   <option value="">-- Select --</option>
                   { clientConfig.serviceCities.map((object, i) => {
                       return <option key={ i } value={ object.city }>
                                { object.city }
                              </option>;
                     }) }
                 </Field>
               </div>
               <div>
                 <label htmlFor="state">State </label>
                 <Field name="state" component="input" type="text" />
               </div>
               <div>
                 <label htmlFor="pincode">Pincode </label>
                 <Field name="pincode" component="input" type="text" />
               </div>
             </div>;
    }
  }
  return (
    <form onSubmit={ handleSubmit }>
      { renderSavedAddress() }
      { renderAddressForm() }
    </form>
    );
};

AddressForm = reduxForm({
  form: 'createAddress',
  onSubmit: (values, dispatch) => dispatch(createAddress(values)),
  enableReinitialize: true
})(AddressForm);

AddressForm = connect(
  state => ({
    addresses: state.customerDetail ? state.customerDetail.shippingInfo : {},
    role: state.auth.role,
    selectedAddress: state.selectedAddress
  })
)(AddressForm);

export default AddressForm;
