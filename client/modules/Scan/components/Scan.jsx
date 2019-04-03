import React, { Component } from 'react';
if (typeof window !== 'undefined') { var QrReader = require('react-qr-scanner'); }
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getScannedLook, clearScannedLook } from '../ScanActions';

// Import CSS
import styles from './scan.css';

class Scan extends Component {
  constructor() {
    super();
    this.state = {
      scannedSKU: '',
      scannedTypes: []
    }
  }

  handleFirstScan(data) {
    if (data) {
      let scanArray = data.split('-');
      let scannedTypes = [];
      scannedTypes.push(scanArray[1]);
      this.setState({
        scannedSKU: scanArray[0],
        scannedTypes: scannedTypes
      });
      this.props.getScannedLook(scanArray[0]);
    }
  }

  handleOtherScan(data) {
    let scanArray = data.split('-');
    if (scanArray[0] == this.props.scannedLook.sku) {
      let scannedTypes = this.state.scannedTypes;
      scannedTypes.push(scanArray[1]);
      this.setState({
        scannedTypes: scannedTypes
      });
    } else {
      alert('Please scan a peice of the same sku!');
    }
  }

  handleError(err) {
    console.error(err)
  }

  renderLook() {
    if (this.props.scannedLook) {
      return <div>
        {QrReader ? <QrReader
          facingMode={'rear'}
          delay={300}
          onError={this.handleError.bind(this)}
          onScan={this.handleOtherScan.bind(this)}
          style={{ width: '600px', height: '600px' }}
        /> : null}
        {JSON.stringify(this.props.scannedLook)}
        {this.renderSaveButton()}
      </div>
    }
  }

  updateScannedLocation() {

  }

  renderSaveButton() {
    let flag = false;
    Object.keys(this.props.scannedLook.latestScannedLocation).map((type) => {
      if (this.state.scannedTypes.includes(type)) {
        flag = true;
      } else {
        flag = false;
      }
    });
    if (flag) {
      return <button onClick={this.updateScannedLocation.bind(this)}>Save</button>;
    }
  }

  render() {
    return (
      <section className={styles.scan}>
        <h1>QR Scan</h1>
        {this.props.scannedLook ? this.renderLook() : <div>
          {QrReader ? <QrReader
            facingMode={'rear'}
            delay={300}
            onError={this.handleError.bind(this)}
            onScan={this.handleFirstScan.bind(this)}
            style={{ width: '100%' }}
          /> : null}
          <p>{this.state.result}</p>
        </div>}
        <div className={styles.brder}></div>
      </section>
    )
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    getScannedLook
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    role: state.auth.role,
    user: state.auth.email,
    scannedLook: state.scannedLook
  };
}

export default connect(mapStateToProps, matchDispatchToProps)(Scan);