import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getAllLogsBySKU, getLogsByLocation, getAllLogsByEmail } from '../ScanActions';
import ReactTable from 'react-table';
import clientConfig from '../../../config';
import { CSVLink } from 'react-csv';
import moment from 'moment';

// Import CSS
import styles from './scan.css';

class ScanLogs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: '',
            sku: '',
            email: '',
            locationCSV: null,
            skuCSV: null
        };
    }

    componentDidMount() {
        this.props.getLogsByLocation();
    }

    componentWillReceiveProps(props) {
        if (props.locationLogs) {
            let locationCSV = props.locationLogs.map((log) => {
                return {
                    'sku': log.sku,
                    'look': log.url,
                    'location': log.location,
                    'scanned by': log.latestScan ? log.latestScan.scannedBy : null,
                    'scan reason': log.latestScan ? log.latestScan.reason : null,
                    'scan time': log.latestScan ? moment(log.latestScan.timestamp).format('lll') : 'Not Scanned'
                }
            });
            this.setState({
                locationCSV: locationCSV
            });
        }
        if (props.scanLogs) {
            let skuCSV = props.scanLogs.map((log) => {
                return {
                    'sku': log.sku,
                    'scanned by': log.scannedBy,
                    'scan reason': log.reason,
                    'scan time': moment(log.timestamp).format('lll'),
                    'location': log.location
                }
            });
            this.setState({
                skuCSV: skuCSV
            });
        }
    }

    handleLocationLogs(e) {
        this.setState({
            location: e.target.value
        });
    }

    handleSKU(e) {
        this.setState({
            sku: e.target.value
        })
    }

    handleEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    getLogsByLocation() {
        this.props.getLogsByLocation(this.state.location);
    }

    getAllLogsBySKU() {
        if (this.state.sku) {
            this.props.getAllLogsBySKU(this.state.sku);
        }
    }

    getAllLogsByEmail() {
        if (this.state.email) {
            this.props.getAllLogsByEmail(this.state.email);
        }
    }

    handleNavigationPage() {
        browserHistory.push('/menu');
    }

    renderScanLogs() {
        if (this.props.scanLogs) {
            if (this.props.scanLogs.length > 0) {
                return <div>
                    <ReactTable filterable data={this.props.scanLogs} columns={clientConfig.scanLogsColumns} className="-striped -highlight" />
                    {this.state.skuCSV ? <CSVLink data={this.state.skuCSV} filename={"Filtered Scan Logs.csv"}>Export CSV</CSVLink> : null}
                </div>
            }
        }
    }

    renderLogsByLocation() {
        if (this.props.locationLogs) {
            if (this.props.locationLogs.length > 0) {
                return <div>
                    <ReactTable filterable data={this.props.locationLogs} columns={clientConfig.locationLogsColumns} className="-striped -highlight" />
                    {this.state.locationCSV ? <CSVLink data={this.state.locationCSV} filename={"Inventory Scan Logs.csv"}>Export CSV</CSVLink> : null}
                </div>
            }
        }
    }

    render() {
        return <section className={styles.scanLogs}>
            <button className={styles.backBtn} onClick={this.handleNavigationPage.bind(this)}><i aria-hidden="true"></i>Back</button>
            <br />
            <br />
            <div><h1>Outfits By Location</h1></div>
            <br />
            <div>
                <select onChange={this.handleLocationLogs.bind(this)}>
                    <option value="">-- Select Location --</option>
                    {Object.keys(clientConfig.scanLocations).map((location, i) => {
                        return <option key={i} value={location}>
                            {clientConfig.scanLocations[location]}
                        </option>;
                    })}
                </select>
                <button className={styles.srchBtn} onClick={this.getLogsByLocation.bind(this)}>Search</button>
            </div>
            <br />
            <br />
            {this.renderLogsByLocation()}
            <br />
            <br />
            <div><h1>Search Outfit</h1></div>
            <div>
                <input type="text" placeholder="SKU" value={this.state.sku} onChange={(e) => this.handleSKU(e)} />
                <button className={styles.srchBtn} onClick={this.getAllLogsBySKU.bind(this)}>Search</button>
            </div>
            <br />
            <div><h1>Scan Count</h1></div>
            <div>
                <input type="text" placeholder="Email" value={this.state.email} onChange={(e) => this.handleEmail(e)} />
                <button className={styles.srchBtn} onClick={this.getAllLogsByEmail.bind(this)}>Search</button>
            </div>
            <br />
            <br />
            {this.renderScanLogs()}
            <br />
        </section>
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getAllLogsBySKU,
        getLogsByLocation,
        getAllLogsByEmail
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        role: state.auth.role,
        user: state.auth.email,
        scanLogs: state.scanLogs ? state.scanLogs : null,
        locationLogs: state.locationLogs ? state.locationLogs : null,
    };
}


export default connect(mapStateToProps, matchDispatchToProps)(ScanLogs);
