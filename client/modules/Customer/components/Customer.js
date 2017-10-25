import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getShopOrderListByDate, getOrderDetail } from '../ShopActions.js';
import DatePicker from 'react-datepicker';
import moment from 'moment';
if (typeof window !== 'undefined') {
    //require('react-datepicker/dist/react-datepicker.css');
}

class Customer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    render() {
        return <section></section>;
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getCustomerDetail: getCustomerDetail
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        customer: state.customer
    };
}


export default connect(mapStateToProps, matchDispatchToProps)(Customer);