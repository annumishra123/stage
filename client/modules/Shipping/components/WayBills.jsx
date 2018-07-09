import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import { uploadWaybillCSV, getWaybills } from '../ShippingActions';
import ReactTable from 'react-table';
import clientConfig from '../../../config';

// Import Style
import styles from './logistics.css';

class WayBills extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            pageIndex: 0,
            pageSize: 10,
            waybillNumber: ''
        }
    }

    componentDidMount() {
        this.props.getWaybills('', 0, 10, '');
    }

    onDrop(acceptedFiles, rejectedFiles) {
        this.setState({
            files: acceptedFiles
        });
    }

    onSubmit() {
        if (this.state.files.length > 0 && this.props.user) {
            this.props.uploadWaybillCSV(this.state.files[0], this.props.user);
        }
    }

    fetchData(state) {
        this.setState({
            pageIndex: state.page,
            pageSize: state.pageSize,
        });
        this.props.getWaybills('', state.page, state.pageSize, this.state.waybillNumber);
    }

    renderWayBills() {
        if (this.props.waybills && this.props.waybills.length > 0) {
            return <div>
                <br />
                <ReactTable data={this.props.waybills} manual defaultPageSize={this.state.pageSize} columns={clientConfig.wayBillColumns} pages={this.props.pages} onFetchData={(state, instance) => { this.fetchData(state); }} className="-striped -highlight" />
            </div>;
        }
    }

    changeWaybillNumber(e) {
        this.setState({
            waybillNumber: e.target.value
        });
        this.props.getWaybills('', this.state.pageIndex, this.state.pageSize, e.target.value);
    }

    render() {
        return <section>
            <h1>Way Bills</h1>
            <a href="https://storage.googleapis.com/catalog-sheets-stage3/logistics/demo.csv" target="blank">Download Demo File</a>
            <div className={styles.fileUpload}>
                <Dropzone onDrop={this.onDrop.bind(this)} multiple={false}>
                    <p className="dropzone">Drop or click to select a file.</p>
                </Dropzone>
                <div>
                    {this.state.files[0] ? <h5>Selected File: {this.state.files[0].name}</h5> : null}
                </div>
            </div>

            <button className={styles.generateBtn} onClick={this.onSubmit.bind(this)}>Generate</button>
            <br />
            <br />
            <hr />
            <br />
            <label>FILTER <i className="fa fa-filter" aria-hidden="true"></i> </label>
            <select value={this.state.waybillNumber} onChange={(e) => this.changeWaybillNumber(e)}>
                <option value="">ALL</option>
                <option value="NOTERROR">NOT ERROR</option>
                <option value="ERROR">ERROR</option>
            </select>
            {this.renderWayBills()}
        </section>;
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        uploadWaybillCSV,
        getWaybills
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        role: state.auth.role,
        user: state.auth.email,
        waybills: state.waybills ? state.waybills.content : null,
        pages: state.waybills ? state.waybills.totalPages : -1
    };
}


export default connect(mapStateToProps, matchDispatchToProps)(WayBills);
