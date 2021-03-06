import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { runnerPickupColumns } from '../../../orderProcessTableConfig';
import ReactTable from 'react-table';
import { getToBePickedOrderlines, markPicked, getAllRunners } from '../OrderProcessActions';

// Import Style
import styles from './OrderProcess.css';

class RunnerPickups extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            delivery: {
                pageNumber: 0,
                pageSize: 0,
                runnerId: this.props.user
            },
            selectedRunner: ''
        };
    }

    componentDidMount() {
        this.props.getToBePickedOrderlines(this.state.delivery);
        this.props.getAllRunners();
    }

    markPicked(id) {
        let data = {
            orderlineId: id,
            user: this.props.user
        }
        this.props.markPicked(data, this.state.delivery);
    }

    renderDeliveries() {
        if (this.props.deliveries) {
            let deliveryIndex = runnerPickupColumns.findIndex(o => o.id == 'generateWaybill');
            if (deliveryIndex != -1) { runnerPickupColumns.splice(deliveryIndex, 1); }

            runnerPickupColumns.unshift({
                Header: '',
                id: 'generateWaybill',
                accessor: o => {
                    return <div>
                        <button onClick={() => this.markPicked(o.id)} className={styles.deductBtn}>Picked</button>
                    </div>
                }
            });

            return <ReactTable filterable data={this.props.deliveries} columns={runnerPickupColumns}
                defaultPageSize={10} className="data-table -striped -highlight" />;
        }
    }

    selectRunner(e) {
        let delivery = {
            pageNumber: 0,
            pageSize: 0,
            runnerId: e.target.value
        };
        this.setState({
            delivery: delivery
        });
        this.props.getToBePickedOrderlines(delivery);
    }

    render() {
        return <section className="">
            <h1>Pickups</h1><br />
            {this.props.runners && (this.props.role == 'superuser' || this.props.role == 'warehouse' || this.props.role == 'logistics' || this.props.role == 'admin') ? <select onChange={(e) => { this.selectRunner(e) }} className={styles.orderProcessSelect}>
                <option value=""> -- Select Runner -- </option>
                {this.props.runners.map((runner, i) => {
                    return <option key={i} value={runner.email}>{runner.name}</option>;
                })}
            </select> : null}
            {this.renderDeliveries()}
        </section>
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getToBePickedOrderlines,
        markPicked,
        getAllRunners
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        deliveries: state.getToBePickedOrderlines,
        runners: state.getAllRunners,
        role: state.auth.role,
        user: state.auth.email
    };
}


export default connect(mapStateToProps, matchDispatchToProps)(RunnerPickups);
