import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import clientConfig from '../../../config';
import ReactTable from 'react-table';
import { getQC3FailOrderlines, markQC3Damage } from '../OrderProcessActions';
import ReactModal from 'react-modal';

// Import Style
import styles from './OrderProcess.css';

class QADeductions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            delivery: {
                pageNumber: 0,
                pageSize: 0
            },
            amount: 0,
            orderlineId: '',
            reason: '',
            viewQCModal: false
        };
    }

    componentDidMount() {
        this.props.getQC3FailOrderlines(this.state.delivery);
    }

    hideQCModal() {
        this.setState({
            amount: 0,
            viewQCModal: false,
            reason: ''
        });
    }

    viewModal(id) {
        this.setState({
            amount: 0,
            orderlineId: id,
            reason: '',
            viewQCModal: true
        });
    }

    markQC3Damage() {
        let data = {
            orderlineId: this.state.orderlineId,
            user: this.props.user,
            damageAmount: this.state.amount,
            reason: this.state.reason
        }
        this.props.markQC3Damage(data);
    }

    changeAmount(e) {
        this.setState({
            amount: e.target.value
        });
    }

    changeReason(e) {
        this.setState({
            reason: e.target.value
        });
    }

    renderDeliveries() {
        if (this.props.deliveries) {
            let deliveryIndex = clientConfig.orderProcessColumns.findIndex(o => o.id == 'generateWaybill');
            if (deliveryIndex != -1) { clientConfig.orderProcessColumns.splice(deliveryIndex, 1); }

            clientConfig.orderProcessColumns.unshift({
                Header: '',
                id: 'generateWaybill',
                accessor: o => {
                    return <div>
                        <button onClick={() => this.viewModal(o.id)} className="">Deduct</button>
                    </div>
                }
            });

            return <ReactTable filterable data={this.props.deliveries} columns={clientConfig.orderProcessColumns}
                defaultPageSize={10} className="data-table -striped -highlight" />;
        }
    }

    render() {
        return <section className="">
            <h1>QC3 - Failed Orderlines</h1><br />
            {this.renderDeliveries()}
            <ReactModal className="" isOpen={this.state.viewQCModal} onRequestClose={this.hideQCModal.bind(this)} contentLabel="Change QC Status">
                <span onClick={this.hideQCModal.bind(this)}>×</span>
                <br />
                <h3>Calculate Damage</h3>
                <br />
                <input type="number" onChange={() => { this.changeAmount(e) }} value={this.state.amount} /><br />
                <input type="text" onChange={() => { this.changeReason(e) }} value={this.state.reason} /><br />
                <button className="" onClick={this.markQC3Damage.bind(this)}>Approve Damage</button>
            </ReactModal>
        </section>
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getQC3FailOrderlines,
        markQC3Damage
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        deliveries: state.getQC3FailOrderlines,
        role: state.auth.role,
        user: state.auth.email
    };
}


export default connect(mapStateToProps, matchDispatchToProps)(QADeductions);
