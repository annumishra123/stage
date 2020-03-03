import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import clientConfig from '../../../config';
import ReactTable from 'react-table';
import { getOrderLinesForNCRPickup, getAllRunners, assignRunnerToOrderlinesPickup } from '../OrderProcessActions';

// Import Style
import styles from './OrderProcess.css';

class LogisticsPickups extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pickup: {
                pageNumber: 0,
                pageSize: 0,
                daysBeforePickupDate: 10
            },
            selectedRunner: null,
            selectedOrderlines: []
        };
    }

    componentDidMount() {
        this.props.getOrderLinesForNCRPickup(this.state.pickup);
        this.props.getAllRunners();
    }

    selectOrderline(value, e) {
        let array = this.state.selectedOrderlines;
        if (e.target.checked) {
            array.push(value.id);
        } else {
            array = array.filter(function (obj) {
                return obj !== value.id;
            });
        }
        this.setState({
            selectedOrderlines: array
        });
        console.log(array);
    }

    renderpickups() {
        if (this.props.pickups) {
            let deliveryIndex = clientConfig.orderProcessColumns.findIndex(o => o.id == 'generateWaybill');
            if (deliveryIndex != -1) { clientConfig.orderProcessColumns.splice(deliveryIndex, 1); }

            clientConfig.orderProcessColumns.unshift({
                Header: '',
                id: 'generateWaybill',
                accessor: o => {
                    return <div>
                        <input type="checkbox" className="" onChange={this.selectOrderline.bind(this, o)} />
                    </div>
                }
            });

            return <ReactTable filterable data={this.props.pickups} columns={clientConfig.orderProcessColumns}
                defaultPageSize={10} className="data-table -striped -highlight" />;
        }
    }

    assignRunner() {
        let data = {
            "orderlineIds": this.state.selectedOrderlines,
            "runnerContact": `${this.state.selectedRunner.phoneNumber}`,
            "runnerId": this.state.selectedRunner.email,
            "runnerName": this.state.selectedRunner.name,
            "user": this.props.user
        };
        this.props.assignRunnerToOrderlinesPickup(data);
    }

    selectRunner(e) {
        let runner = this.props.runners.filter(function (obj) {
            return obj.email == e.target.value;
        });
        this.setState({
            selectedRunner: runner[0]
        });
    }

    render() {
        return <section className="">
            <h1>Pickups (NCR)</h1><br />
            {this.props.runners ? <select onChange={(e) => { this.selectRunner(e) }} className={styles.orderProcessSelect}>
                <option value=""> -- Select Runner -- </option>
                {this.props.runners.map((runner, i) => {
                    return <option key={i} value={runner.email}>{runner.name}</option>;
                })}
            </select> : null}
            <button onClick={(e) => { this.assignRunner(e) }} className={styles.btnBlack}>Assign</button>
            <br /><br />
            {this.renderpickups()}
        </section>
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        assignRunnerToOrderlinesPickup,
        getAllRunners,
        getOrderLinesForNCRPickup
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        pickups: state.getOrderLinesForNCRPickup,
        runners: state.getAllRunners,
        role: state.auth.role,
        user: state.auth.email
    };
}


export default connect(mapStateToProps, matchDispatchToProps)(LogisticsPickups);
