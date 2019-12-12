import React, { Component } from 'react';
if (typeof window !== 'undefined') { var QrReader = require('react-qr-reader'); }
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getScannedLook, clearScannedLook, saveScannedLocation } from '../ScanActions';
import clientConfig from '../../../config';
import BarcodeReader from 'react-barcode-reader';
import moment from 'moment';

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
    if (data && this.props.scannedLook) {
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
      return <div className="">
        <div className={styles.scanResult}>
          <button className={styles.clear} onClick={this.clearProduct.bind(this)}>Clear</button>
          <div className={styles.col30}>
            <img src={this.props.scannedLook.listingimage[0]} />
          </div>
          <div className={styles.col70}>
            <p>{this.props.scannedLook.name}</p>
            <br />
            <p>SKU: {this.props.scannedLook.sku}</p>
            <br />
            <p>Home Location: {this.props.scannedLook.homelocation ? this.props.scannedLook.homelocation : 'N/A'}</p>
            {this.props.scannedLook.latestScan ? <div>
              <br />
              <p>Last Location: {clientConfig.scanLocations[this.props.scannedLook.latestScan.location]}</p>
              <p>Scan Reason: {this.props.scannedLook.latestScan.reason}</p>
              <p>Scanned By: {this.props.scannedLook.latestScan.scannedBy}</p>
              <p>Updated On: {moment(this.props.scannedLook.latestScan.timestamp).format('lll')}</p>
            </div> : null}
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
              {Object.keys(clientConfig.scanLocations).map((location, i) => {
                return <option key={i} value={location}>
                  {clientConfig.scanLocations[location]}
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
      {this.props.scannedLook.scanComposition.map((type, i) => {
        return <li key={i}>{type} {this.state.scannedTypes.includes(type) ? <img src="https://res.cloudinary.com/stage3/image/upload/v1554376454/icon-checked.png" /> : null}</li>
      })}
    </ul>;
  }

  updateScannedLocation() {
    this.props.saveScannedLocation(this.state.scannedSKU, this.state.location, this.state.reason);
    this.clearProduct();
  }

  renderSaveButton() {
    let flag = true;
    this.props.scannedLook.scanComposition.map((type) => {
      if (!this.state.scannedTypes.includes(type)) {
        flag = false;
      }
    });
    return <button className={styles.savebtn} disabled={!flag} onClick={this.updateScannedLocation.bind(this)}>Save</button>;
  }

  handleError(error) {
    console.log(error);
  }

  render() {
    return (
      <section className="">
        <h1>QR Scan</h1>
        <div className="">
          <center>
            {QrReader ? <QrReader
              delay={100}
              onError={this.handleError.bind(this)}
              onScan={this.state.scannedSKU ? this.handleOtherScan.bind(this) : this.handleFirstScan.bind(this)}
              style={{
                height: 350,
                width: 350,
              }}
            /> : null}
            <BarcodeReader
              onError={this.handleError.bind(this)}
              onScan={this.state.scannedSKU ? this.handleOtherScan.bind(this) : this.handleFirstScan.bind(this)}
            />
          </center>
          {this.renderLook()}
        </div>
      </section>
    )
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    getScannedLook,
    clearScannedLook,
    saveScannedLocation
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