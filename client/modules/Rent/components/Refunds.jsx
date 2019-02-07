import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getAllUnprocessedRefunds, markRefunded } from '../RentActions';
import ReactTable from 'react-table';
import clientConfig from '../../../config';

// Import Style


class Refunds extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refunded: false,
        };
    }

    componentDidMount() {
        this.props.getAllUnprocessedRefunds();
    }

    markRefunded(_id) {
        this.props.markRefunded(_id)
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
                return <div><br /><p>No Pending Refunds</p></div>;
            }
        } else {
            return <p>No Pending Refunds</p>;
        }
    }

    render() {
        return (<section>
            <div><h2>Rent Orders</h2></div>
            <br />
            <button onClick={this.handleNavigationPage.bind(this)}><i aria-hidden="true"></i>Back</button>
            <br />
            {this.renderRefunds()}
        </section>)
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getAllUnprocessedRefunds,
        markRefunded
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        role: state.auth.role,
        user: state.auth.email,
        refundLogs: state.refundLogs ? state.refundLogs : null
    };
}


export default connect(mapStateToProps, matchDispatchToProps)(Refunds);
