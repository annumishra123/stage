import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { runnerDeliveryColumns } from '../../../orderProcessTableConfig';
import ReactTable from 'react-table';
import { getOutForDeliveryOrderlines, markDelivered, getAllRunners } from '../OrderProcessActions';

// Import Style
import styles from './OrderProcess.css';

class RunnerDeliveries extends React.Component {
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
        this.props.getOutForDeliveryOrderlines(this.state.delivery);
        this.props.getAllRunners();
    }

    markDelivered(id) {
        let data = {
            orderlineId: id,
            user: this.props.user
        }
        this.props.markDelivered(data, this.state.delivery)
    }

    renderDeliveries() {
        if (this.props.deliveries) {
            let deliveryIndex = runnerDeliveryColumns.findIndex(o => o.id == 'generateWaybill');
            if (deliveryIndex != -1) { runnerDeliveryColumns.splice(deliveryIndex, 1); }

            runnerDeliveryColumns.unshift({
                Header: '',
                id: 'generateWaybill',
                accessor: o => {
                    return <div>
                        <button onClick={() => this.markDelivered(o.id)} className={styles.deductBtn}>Delivered</button>
                    </div>
                }
            });

            return <ReactTable filterable data={this.props.deliveries} columns={runnerDeliveryColumns}
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
        this.props.getOutForDeliveryOrderlines(delivery);
    }

    render() {
        return <section className="">
            <h1>Deliveries</h1><br />
            {this.props.runners && (this.props.role == 'superuser' || this.props.role == 'logistics' || this.props.role == 'admin' || this.props.role == 'warehouse') ? <select onChange={(e) => { this.selectRunner(e) }} className={styles.orderProcessSelect}>
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
        getOutForDeliveryOrderlines,
        markDelivered,
        getAllRunners
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        deliveries: state.getOutForDeliveryOrderlines,
        runners: state.getAllRunners,
        role: state.auth.role,
        user: state.auth.email
    };
}


export default connect(mapStateToProps, matchDispatchToProps)(RunnerDeliveries);
