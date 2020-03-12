import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { qaPostOrderColumns } from '../../../orderProcessTableConfig';
import ReactTable from 'react-table';
import { getReceivedOrderlines, markQC3 } from '../OrderProcessActions';

// Import Style
import styles from './OrderProcess.css';

class PostOrderQA extends React.Component {
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
        this.props.getReceivedOrderlines(this.state.delivery);
    }

    markQC3(id, status) {
        let data = {
            orderlineId: id,
            user: this.props.user,
            isPass: status
        }
        this.props.markQC3(data)
    }

    renderDeliveries() {
        if (this.props.deliveries) {
            let deliveryIndex = qaPostOrderColumns.findIndex(o => o.id == 'generateWaybill');
            if (deliveryIndex != -1) { qaPostOrderColumns.splice(deliveryIndex, 1); }

            qaPostOrderColumns.unshift({
                Header: '',
                id: 'generateWaybill',
                accessor: o => {
                    return <div>
                        <button onClick={() => this.markQC3(o.id, true)} className="">Pass</button>
                        <button onClick={() => this.markQC3(o.id, false)} className="">Fail</button>
                    </div>
                }
            });

            return <ReactTable filterable data={this.props.deliveries} columns={qaPostOrderColumns}
                defaultPageSize={10} className="data-table -striped -highlight" />;
        }
    }

    render() {
        return <section className="">
            <h1>QC3 - Received Orderlines</h1><br />
            {this.renderDeliveries()}
        </section>
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getReceivedOrderlines,
        markQC3
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        deliveries: state.getReceivedOrderlines,
        role: state.auth.role,
        user: state.auth.email
    };
}


export default connect(mapStateToProps, matchDispatchToProps)(PostOrderQA);
