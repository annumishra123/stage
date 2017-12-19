import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { createOwner } from '../DesignerActions.js';

// Import Style
// import styles from './customerForm.css';

let EmailForm = props => {
  const {handleSubmit} = props;
  return (
    <form>
      <h1>Create Owner</h1>
      <br />
      <div>
        <label htmlFor="owners">Owner Name </label>
        <Field name="ownername" component="input" type="text" />
        <br/>
        <label htmlFor="owners">Revenue Share (%) </label>
        <Field name="revenueshare" component="input" type="number" />
      </div>
    </form>
    );
};

export default reduxForm({
  form: 'createOwner', // a unique identifier for this form
  onSubmit: (values, dispatch) => dispatch(createOwner(values)), // submit function must be passed to onSubmit
})(EmailForm);
