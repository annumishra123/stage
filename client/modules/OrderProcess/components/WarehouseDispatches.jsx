import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { warehouseDispatchColumns } from '../../../orderProcessTableConfig';
import ReactTable from 'react-table';
import { getOrderLinesToBeDispatched, markDispatched } from '../OrderProcessActions';

// Import Style
import styles from './OrderProcess.css';

class WarehouseDeliveries extends React.Component {
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
        this.props.getOrderLinesToBeDispatched(this.state.delivery);
    }

    markDispatched(id) {
        let data = {
            orderlineId: id,
            user: this.props.user
        }
        this.props.markDispatched(data)
    }

    renderDeliveries() {
        if (this.props.deliveries) {
            let deliveryIndex = warehouseDispatchColumns.findIndex(o => o.id == 'generateWaybill');
            if (deliveryIndex != -1) { warehouseDispatchColumns.splice(deliveryIndex, 1); }

            warehouseDispatchColumns.unshift({
                Header: '',
                id: 'generateWaybill',
                accessor: o => {
                    return <div>
                        <button onClick={() => this.markDispatched(o.id)} className={styles.deductBtn}>Dispatched</button>
                    </div>
                }
            });

            return <ReactTable filterable data={this.props.deliveries} columns={warehouseDispatchColumns}
                defaultPageSize={10} className="data-table -striped -highlight" />;
        }
    }

    render() {
        return <section className="">
            <h1>Dispatches</h1><br />
            {this.renderDeliveries()}
        </section>
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getOrderLinesToBeDispatched,
        markDispatched
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        deliveries: state.getOrderLinesToBeDispatched,
        role: state.auth.role,
        user: state.auth.email
    };
}


export default connect(mapStateToProps, matchDispatchToProps)(WarehouseDeliveries);
