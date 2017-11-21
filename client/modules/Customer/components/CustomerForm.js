import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { createCustomer } from '../CustomerActions.js';
import clientConfig from '../../../config';

let CustomerForm = props => {
  const {handleSubmit} = props;
  return (
    <form onSubmit={ handleSubmit }>
      <h3>Contact Info</h3>
      <br/>
      <div>
        <label htmlFor="email">Email </label>
        <Field name="email" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="firstName">First Name </label>
        <Field name="firstName" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="lastName">Last Name </label>
        <Field name="lastName" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="phoneNumber">Phonenumber </label>
        <Field name="phoneNumber" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="dataSource">Source </label>
        <Field name="dataSource" component="select" type="text">
          <option value="">-- Select --</option>
          { clientConfig.customerSource.map((source, i) => {
              return <option key={ i } value={ source }>
                       { source }
                     </option>
            }) }
        </Field>
      </div>
    </form>
    );
};

CustomerForm = reduxForm({
  form: 'createCustomer',
  onSubmit: (values, dispatch) => dispatch(createCustomer(values)),
  enableReinitialize: true
})(CustomerForm);

CustomerForm = connect(
  state => ({
    initialValues: state.customerDetail
  })
)(CustomerForm);

export default CustomerForm;