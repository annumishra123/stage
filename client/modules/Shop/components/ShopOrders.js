import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getShopOrderListByDate } from '../ShopActions.js';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

class ShopOrders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: moment().subtract(1, 'days'),
            endDate: moment()
        };
    }

    componentDidMount() {}

    handleChangeStartDate(date) {
        this.setState({
            startDate: date
        });
    }

    handleChangeEndDate(date) {
        this.setState({
            endDate: date
        });
    }

    getOrders() {
        this.props.getShopOrderListByDate(this.state.startDate, this.state.endDate);
    }

    renderOrders() {
        if (this.props.orders) {
            if (this.props.orders.length > 0) {
                return <div>
                         { this.props.orders.map(function(order, i) {
                               return <div key={ i }>
                                        <h3>{ order.frontendOrderId }</h3>
                                        <h3>{ order.userId }</h3>
                                        <h3>{ order.status }</h3>
                                      </div>
                           }) }
                       </div>
            }
        }
    }

    render() {
        return <section>
                 <div className="container">
                   <div className="col-md-6">
                     <h3>Start Date</h3>
                     <DatePicker selected={ this.state.startDate } onChange={ this.handleChangeStartDate.bind(this) } />
                   </div>
                   <div className="col-md-6">
                     <h3>End Date</h3>
                     <DatePicker selected={ this.state.endDate } onChange={ this.handleChangeEndDate.bind(this) } />
                   </div>
                 </div>
                 <div>
                   <button onClick={ this.getOrders.bind(this) }>Search By Date</button>
                 </div>
                 { this.renderOrders() }
               </section>
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getShopOrderListByDate: getShopOrderListByDate
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        orders: state.orders
    };
}


export default connect(mapStateToProps, matchDispatchToProps)(ShopOrders);