import React from 'react';
import { connect } from 'react-redux';
import { submit } from 'redux-form';

const style = {
  padding: '10px 20px',
  width: 300,
  display: 'block',
  margin: '20px auto',
  fontSize: '16px',
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
