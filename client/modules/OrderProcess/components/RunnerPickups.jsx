import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import clientConfig from '../../../config';
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
            let deliveryIndex = clientConfig.orderProcessColumns.findIndex(o => o.id == 'generateWaybill');
            if (deliveryIndex != -1) { clientConfig.orderProcessColumns.splice(deliveryIndex, 1); }

            clientConfig.orderProcessColumns.unshift({
                Header: '',
                id: 'generateWaybill',
                accessor: o => {
                    return <div>
                        <button onClick={() => this.markPicked(o.id)} className="">Picked</button>
                    </div>
                }
            });

            return <ReactTable filterable data={this.props.deliveries} columns={clientConfig.orderProcessColumns}
                defaultPageSize={10} className="data-table -striped -highlight" />;
        }
    }

    selectRunner(e) {
        let delivery = {
            pageNumber: 0,
            pageSize: 0,
            runnerId: e.target.value
        }
        this.props.getToBePickedOrderlines(delivery);
    }

    render() {
        return <section className="">
            <h1>Pickups</h1><br />
            {this.props.runners && (this.props.role == 'superuser') ? <select onChange={(e) => { this.selectRunner(e) }} className={styles.orderProcessSelect}>
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
