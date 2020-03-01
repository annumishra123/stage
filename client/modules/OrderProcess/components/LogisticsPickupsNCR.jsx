import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import clientConfig from '../../../config';
import ReactTable from 'react-table';
import { getOrderlinesForNCRDelivery } from '../OrderProcessActions';


class LogisticsDeliveries extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            delivery: {
                pageNumber: 0,
                pageSize: 0,
                daysBeforePickupDate: 2
            }
        };
    }

    componentDidMount() {
        this.props.getOrderlinesForNCRDelivery(this.state.delivery);
    }

    renderDeliveries() {
        if (this.props.deliveries) {
            return <ReactTable filterable data={this.props.deliveries} columns={clientConfig.rentDeliveryColumns}
                defaultPageSize={20} className="data-table -striped -highlight" />;
        }
    }

    render() {
        return <section className="">
            <h1>Deliveries</h1>
            {this.renderDeliveries()}
        </section>
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getOrderlinesForNCRDelivery
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        deliveries: state.getOrderlinesForNCRDelivery,
        role: state.auth.role,
        user: state.auth.email
    };
}


export default connect(mapStateToProps, matchDispatchToProps)(LogisticsDeliveries);
