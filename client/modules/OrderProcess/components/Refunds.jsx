import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { refundColumns } from '../../../orderProcessTableConfig';
import ReactTable from 'react-table';
import { getRefundConfirmedOrderlines, approveRefund } from '../OrderProcessActions';
import ReactModal from 'react-modal';

// Import Style
import styles from './OrderProcess.css';

class Refunds extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            delivery: {
                pageNumber: 0,
                pageSize: 0
            },
            orderlineId: null,
            refundAmount: 0,
            viewRefundModal: false
        };
    }

    componentDidMount() {
        this.props.getRefundConfirmedOrderlines(this.state.delivery);
    }

    refund() {
        if (this.state.refundAmount > 0) {
            this.props.approveRefund({
                orderlineId: this.state.orderlineId,
                amount: this.state.refundAmount,
                user: this.props.user
            });
            this.hideRefundModal();
        } else {
            alert("Please check the refund amount.")
        }
    }

    renderDeliveries() {
        if (this.props.deliveries) {
            let deliveryIndex = refundColumns.findIndex(o => o.id == 'generateWaybill');
            if (deliveryIndex != -1) { refundColumns.splice(deliveryIndex, 1); }

            refundColumns.unshift({
                Header: '',
                id: 'generateWaybill',
                accessor: o => {
                    return <div>
                        <button onClick={() => this.viewModal(o)} className={styles.deductBtn}>Refund</button>
                        {/* <button onClick={() => this.refund(o.id)} className={styles.deductBtn}>Refund</button> */}
                    </div>
                }
            });

            return <section className="">
                <ReactTable filterable data={this.props.deliveries} columns={refundColumns}
                    defaultPageSize={10} className="data-table -striped -highlight" />
                <ReactModal className={styles.statusPop} isOpen={this.state.viewRefundModal} onRequestClose={this.hideRefundModal.bind(this)} contentLabel="Change QC Status">
                    <span onClick={this.hideRefundModal.bind(this)}>×</span>
                    <br />
                    <h3>Refund Confirmation</h3>
                    <br />
                    <label>Amount: </label>
                    <input type="number" min="0" onChange={(e) => { this.changeRefundAmount(e) }} value={this.state.refundAmount} /><br />
                    <br />
                    <button className="" onClick={this.refund.bind(this)}>Approve Refund</button>
                </ReactModal>
            </section>;
        }
    }

    viewModal(orderline) {
        let refundAmount = !isNaN(orderline.orderlineProcess.refundAmount) && orderline.orderlineProcess.refundAmount ? parseFloat(orderline.orderlineProcess.refundAmount) : 0;
        this.setState({
            refundAmount: refundAmount,
            orderlineId: orderline.id,
            reason: '',
            viewRefundModal: true
        });
    }
    hideRefundModal() {
        this.setState({
            orderlineId: null,
            refundAmount: 0,
            viewRefundModal: false
        });
    }

    changeRefundAmount(e) {
        this.setState({
            refundAmount: e.target.value
        });
    }

    render() {
        return <section className="">
            <h1>Refunds</h1><br />
            {this.renderDeliveries()}
        </section>
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        approveRefund,
        getRefundConfirmedOrderlines
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        deliveries: state.getRefundConfirmedOrderlines,
        role: state.auth.role,
        user: state.auth.email
    };
}


export default connect(mapStateToProps, matchDispatchToProps)(Refunds);
