import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getAllLogsBySKU, getLogsByLocation } from '../ScanActions';
import ReactTable from 'react-table';
import clientConfig from '../../../config';

// Import Style
//import styles from './rentOrders.css';

class ScanLogs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: '',
            sku: ''
        };
    }

    componentDidMount() {
        this.props.getLogsByLocation();
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

    getLogsByLocation() {
        this.props.getLogsByLocation(this.state.location);
    }

    getAllLogsBySKU() {
        if (this.state.sku) {
            this.props.getAllLogsBySKU(this.state.sku);
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
                </div>
            }
        }
    }

    renderLogsByLocation() {
        if (this.props.locationLogs) {
            if (this.props.locationLogs.length > 0) {
                return <div>
                    <ReactTable filterable data={this.props.locationLogs} columns={clientConfig.locationLogsColumns} className="-striped -highlight" />
                </div>
            }
        }
    }

    render() {
        return <section>
            <button onClick={this.handleNavigationPage.bind(this)}><i aria-hidden="true"></i>Back</button>
            <br />
            <br />
            <div><h1>Outfits By Location</h1></div>
            <br />
            <div>
                <select onChange={this.handleLocationLogs.bind(this)}>
                    <option value="">All</option>
                    <option value="store-hkv">Store (HKV)</option>
                    <option value="store-rjg">Store (RJG)</option>
                    <option value="cafe-we">Cafe We</option>
                    <option value="office">Office</option>
                    <option value="customer">Customer</option>
                    <option value="dry-cleaning">Dry Cleaning</option>
                    <option value="pop-up">Pop-Up</option>
                </select>
                <button onClick={this.getLogsByLocation.bind(this)}>Search</button>
            </div>
            <br />
            <br />
            {this.renderLogsByLocation()}
            <br />
            <br />
            <div><h1>Search Outfit</h1></div>
            <br />
            <div>
                <input type="text" placeholder="SKU" value={this.state.sku} onChange={(e) => this.handleSKU(e)} />
                <button onClick={this.getAllLogsBySKU.bind(this)}>Search</button>
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
        getLogsByLocation
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
