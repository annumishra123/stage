import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { createOwner } from '../DesignerActions.js';

// Import Style
// import styles from './customerForm.css';

let EmailForm = props => {
    const { handleSubmit } = props;
    return (
        <form>
            <h3>Create Owner</h3>
            <br />
            <div>
                <label htmlFor="owners">Ownername </label>
                <Field name="ownername" component="input" type="text" />
                <label htmlFor="owners">Revenue Share percentage </label>
                <Field name="revenueshare" component="input" type="number" />
            </div>
        </form>
    );
};

export default reduxForm({
    form: 'createOwner', // a unique identifier for this form
    onSubmit: (values, dispatch) => dispatch(createOwner(values)), // submit function must be passed to onSubmit
})(EmailForm);
