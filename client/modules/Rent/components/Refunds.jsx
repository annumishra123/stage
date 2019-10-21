import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getAllUnprocessedRefunds, markRefunded, getRefundsByUserId } from '../RentActions';
import ReactTable from 'react-table';
import clientConfig from '../../../config';

// Import Style
import styles from './rentOrders.css';

class Refunds extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refunded: false,
            customerId: ''
        };
    }

    componentDidMount() {
        this.props.getAllUnprocessedRefunds();
        this.props.getRefundsByUserId();
    }

    markRefunded(_id) {
        this.props.markRefunded(_id)
    }

    handleCustomerId(e) {
        this.setState({
            customerId: e.target.value
        });
    }

    getRefundsByUserId(e) {
        e.preventDefault();
        if (this.state.customerId) {
            this.props.getRefundsByUserId(this.state.customerId);
            this.setState({
                customerId: '',
            })
        }
    }

    handleNavigationPage() {
        browserHistory.push('/menu');
    }

    renderRefunds() {
        if (this.props.refundLogs) {
            if (this.props.refundLogs.length > 0) {
                if (!clientConfig.refundLogsColumns.find(o => o.id == 'markRefunded')) {
                    clientConfig.refundLogsColumns.unshift({
                        Header: '',
                        id: 'markRefunded',
                        accessor: '_id',
                        Cell: ({ value }) => (<button onClick={this.markRefunded.bind(this, value)}>Refund</button>)
                    });
                }
                return <div>
                    <ReactTable filterable data={this.props.refundLogs} columns={clientConfig.refundLogsColumns} className="-striped -highlight" />
                </div>
            } else {
                return <div><br /><p className={styles.noRefund}>No Pending Refunds</p></div>;
            }
        } else {
            return <p className={styles.noRefund}>No Pending Refunds</p>;
        }
    }

    renderRefundsByUserId() {
        if (this.props.customerRefundLogs) {
            if (this.props.customerRefundLogs.length > 0) {
                if (this.props.customerRefundLogs.length > 0) {
                    return <div>
                        <ReactTable filterable data={this.props.customerRefundLogs} columns={clientConfig.customerIdRefundsColumns} className="-striped -highlight" />
                    </div>
                }
            }
        }
    }

    render() {
        return <section>
            <div><h1>Refunds</h1></div>
            <br />
            <button onClick={this.handleNavigationPage.bind(this)} className={styles.backBtn}><i aria-hidden="true"></i>Back</button>
            <br />
            <br />
            {this.renderRefunds()}
            <br />
            <div><h1>Search Refunds By Email</h1></div>
            <br />
            <form onSubmit={this.getRefundsByUserId.bind(this)}>
                <div className={styles.emailform}>
                    <input type="text" placeholder="Email" value={this.state.customerId} onChange={(e) => this.handleCustomerId(e)} />
                    <button type="submit" onClick={this.getRefundsByUserId.bind(this)}>Search</button>
                </div>
            </form>
            <br />
            <br />
            {this.renderRefundsByUserId()}
        </section>
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getAllUnprocessedRefunds,
        markRefunded,
        getRefundsByUserId
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        role: state.auth.role,
        user: state.auth.email,
        refundLogs: state.refundLogs ? state.refundLogs : null,
        customerRefundLogs: state.customerRefundLogs ? state.customerRefundLogs : null
    };
}


export default connect(mapStateToProps, matchDispatchToProps)(Refunds);
