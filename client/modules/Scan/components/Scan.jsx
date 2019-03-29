import React, { Component } from 'react';
if (typeof window !== 'undefined') { var QrReader = require('react-qr-reader'); }
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Scan extends Component {
  state = {
    result: 'No result'
  }

  handleScan(data) {
    if (data) {
      this.setState({
        result: data
      })
    }
  }

  handleError(err) {
    console.error(err)
  }

  render() {
    return (
      <div>
        {QrReader ? <QrReader
          delay={300}
          onError={this.handleError.bind(this)}
          onScan={this.handleScan.bind(this, data)}
          style={{ width: '100%' }}
        /> : null}
        <p>{this.state.result}</p>
      </div>
    )
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

function mapStateToProps(state) {
  return {
    role: state.auth.role,
    user: state.auth.email
  };
}

export default connect(mapStateToProps, matchDispatchToProps)(Scan);