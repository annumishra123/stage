import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { getCustomerDetail } from '../CustomerActions.js';

let EmailForm = props => {
  const {handleSubmit} = props;
  return (
    <form>
      <h3>Create/Find Customer</h3>
      <br/>
      <div>
        <label htmlFor="email">Email </label>
        <Field name="email" component="input" type="email" />
      </div>
    </form>
    );
};

export default reduxForm({
  form: 'createEmail', // a unique identifier for this form
  onSubmit: (values, dispatch) => dispatch(getCustomerDetail(values.email)) // submit function must be passed to onSubmit
})(EmailForm);
