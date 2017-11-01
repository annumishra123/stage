import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { createMeasurements } from '../CustomerActions.js';

let MeasurementsForm = props => {
  const {handleSubmit} = props;
  return (
    <form onSubmit={ handleSubmit }>
      <h3>Measurements</h3>
      <br/>
      <div>
        <label htmlFor="bicep">Bicep </label>
        <Field name="bicep" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="chest">Chest </label>
        <Field name="chest" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="hip">Hip </label>
        <Field name="hip" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="lengthBottom">Bottom Length </label>
        <Field name="lengthBottom" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="lowWaist">Low Waist </label>
        <Field name="lowWaist" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="mainWaist">Waist </label>
        <Field name="mainWaist" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="shoulder">Shoulder </label>
        <Field name="shoulder" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="thigh">Thigh </label>
        <Field name="thigh" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="topLength">Top Length </label>
        <Field name="topLength" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="underBust">Under Bust </label>
        <Field name="underBust" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="sleeves">Sleeves </label>
        <Field name="sleeves" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="stomach">Stomach </label>
        <Field name="stomach" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="trouserLength">Trouser Length </label>
        <Field name="trouserLength" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="crotch">Crotch </label>
        <Field name="crotch" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="neck">Neck </label>
        <Field name="neck" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="inseem">Inseem </label>
        <Field name="inseem" component="input" type="text" />
      </div>
    </form>
    );
};

MeasurementsForm = reduxForm({
  form: 'createMeasurements',
  onSubmit: (values, dispatch) => dispatch(createMeasurements(values)),
  enableReinitialize: true
})(MeasurementsForm);

MeasurementsForm = connect(
  state => ({
    initialValues: state.customerDetail ? state.customerDetail.measurements : {}
  })
)(MeasurementsForm);

export default MeasurementsForm;