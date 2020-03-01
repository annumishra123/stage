import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import clientConfig from '../../../config';
import ReactTable from 'react-table';
import { getOrderlinesForNCRDelivery, get } from '../OrderProcessActions';


class LogisticsDeliveries extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        let dataForNCR = {
            location: 'ncr',
            pageNumber: 0,
            pageSize: 100,
            daysBeforePickupDate: 2
        }
        this.props.getOrderlinesForNCRDelivery(dataForNCR);
    }

    render() {
        return <section className="">

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
        role: state.auth.role,
        user: state.auth.email
    };
}


export default connect(mapStateToProps, matchDispatchToProps)(LogisticsDeliveries);
