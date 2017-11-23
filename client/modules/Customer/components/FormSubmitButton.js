import React from 'react';
import { connect } from 'react-redux';
import { submit } from 'redux-form';

// Import Style
import styles from './customerForm.css';

const style = {

};

class SubmitButton extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (<button type="button" style={ style } onClick={ () => {
                                                  console.log(this.props); this.props.dispatch(submit(this.props.formName));
                                                } }>
              { this.props.text }
            </button>);
  }
}
export default connect()(SubmitButton);
