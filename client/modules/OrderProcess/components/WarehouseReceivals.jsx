import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { warehouseReceiveColumns } from '../../../orderProcessTableConfig';
import ReactTable from 'react-table';
import { getOrderLinesToBeReceived, markReceived } from '../OrderProcessActions';

// Import Style
import styles from './OrderProcess.css';

class WarehousePickups extends React.Component {
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
        this.props.getOrderLinesToBeReceived(this.state.delivery);
    }

    markReceived(id) {
        let data = {
            orderlineId: id,
            user: this.props.user
        }
        this.props.markReceived(data)
    }

    renderDeliveries() {
        if (this.props.deliveries) {
            let deliveryIndex = warehouseReceiveColumns.findIndex(o => o.id == 'generateWaybill');
            if (deliveryIndex != -1) { warehouseReceiveColumns.splice(deliveryIndex, 1); }

            warehouseReceiveColumns.unshift({
                Header: '',
                id: 'generateWaybill',
                accessor: o => {
                    return <div>
                        <button onClick={() => this.markReceived(o.id)} className={styles.deductBtn}>Received</button>
                    </div>
                }
            });

            return <ReactTable filterable data={this.props.deliveries} columns={warehouseReceiveColumns}
                defaultPageSize={10} className="data-table -striped -highlight" />;
        }
    }

    render() {
        return <section className="">
            <h1>Receivals</h1><br />
            {this.renderDeliveries()}
        </section>
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getOrderLinesToBeReceived,
        markReceived
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        deliveries: state.getOrderLinesToBeReceived,
        role: state.auth.role,
        user: state.auth.email
    };
}


export default connect(mapStateToProps, matchDispatchToProps)(WarehousePickups);
