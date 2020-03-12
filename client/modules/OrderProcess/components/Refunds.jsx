import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { refundColumns } from '../../../orderProcessTableConfig';
import ReactTable from 'react-table';
import { getRefundConfirmedOrderlines, approveRefund } from '../OrderProcessActions';

// Import Style
import styles from './OrderProcess.css';

class Refunds extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            delivery: {
                pageNumber: 0,
                pageSize: 0
            }
        };
    }

    componentDidMount() {
        this.props.getRefundConfirmedOrderlines(this.state.delivery);
    }

    refund(id) {
        this.props.approveRefund({
            orderlineId: id,
            user: this.props.user
        });
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
                        <button onClick={() => this.refund(o.id)} className={styles.deductBtn}>Refund</button>
                    </div>
                }
            });

            return <ReactTable filterable data={this.props.deliveries} columns={refundColumns}
                defaultPageSize={10} className="data-table -striped -highlight" />;
        }
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
