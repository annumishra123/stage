import React, { Component } from 'react';
if (typeof window !== 'undefined') { var QrReader = require('react-qr-scanner'); }
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getScannedLook, clearScannedLook } from '../ScanActions';
import clientConfig from '../../../config';

// Import CSS
import styles from './scan.css';

class Scan extends Component {
  constructor() {
    super();
    this.state = {
      scannedSKU: '',
      scannedTypes: [],
      location: '',
      reason: ''
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
    if (data) {
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
  }

  handleError(err) {
    console.error(err)
  }

  clearProduct() {
    this.setState({
      scannedSKU: '',
      scannedTypes: []
    }, this.props.clearScannedLook());
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
        <div className={styles.scanResult}>
          <button className={styles.clear} onClick={this.clearProduct.bind(this)}>Clear</button>
          <div className={styles.col30}>
            <img src={this.props.scannedLook.listingimage[0]} />
          </div>
          <div className={styles.col70}>
            <p>{this.props.scannedLook.name}</p>
            <p>{this.props.scannedLook.sku}</p>
            {this.renderScannedComposition()}
            <select onChange={this.changeReason.bind(this)}>
              <option value="">-- Select Reason --</option>
              {clientConfig.scanReasons.map((reason, i) => {
                return <option key={i} value={reason}>
                  {reason}
                </option>;
              })}
            </select>
            <select onChange={this.changeLocation.bind(this)}>
              <option value="">-- Select Location --</option>
              {clientConfig.scanLocations.map((reason, i) => {
                return <option key={i} value={reason}>
                  {reason}
                </option>;
              })}
            </select>
            {this.renderSaveButton()}
          </div>
        </div>
      </div>
    }
  }

  changeReason(e) {
    this.setState({
      reason: e.target.value
    });
  }

  changeLocation(e) {
    this.setState({
      location: e.target.value
    });
  }

  renderScannedComposition() {
    return <ul>
      {Object.keys(this.props.scannedLook.scanComposition).map((type, i) => {
        return <li key={i}>{type} {this.state.scannedTypes.includes(type) ? 'Scanned' : null}</li>
      })}
    </ul>;
  }

  updateScannedLocation() {
    this.props.saveScannedLocation(this.state.scannedSKU, this.state.location, this.state.reason)
    this.clearProduct();
  }

  renderSaveButton() {
    let flag = true;
    Object.keys(this.props.scannedLook.scanComposition).map((type) => {
      if (!this.state.scannedTypes.includes(type)) {
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
        <div className={styles.brder}></div>
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
      </section>
    )
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    getScannedLook,
    clearScannedLook
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