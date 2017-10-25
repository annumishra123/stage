import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { createCustomer } from '../CustomerActions.js';

let CreateCustomer = props => {
  const { handleSubmit } = props;
  return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="firstName">First Name</label>
                <Field name="firstName" component="input" type="text" />
            </div>
            <div>
                <label htmlFor="lastName">Last Name</label>
                <Field name="lastName" component="input" type="text" />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <Field name="email" component="input" type="email" />
            </div>
            <div>
                <label htmlFor="phonenumber">Phonenumber</label>
                <Field name="phonenumber" component="input" type="text" />
            </div>
        </form>
    );
};
export default reduxForm({
  form: 'createCustomer', // a unique identifier for this form
  onSubmit: createCustomer, // submit function must be passed to onSubmit
})(CreateCustomer)
    ;
