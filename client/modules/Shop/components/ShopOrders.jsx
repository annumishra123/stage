import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getShopOrderListByDate, getOrderDetail } from '../ShopActions.js';
import DatePicker from 'react-datepicker';
import moment from 'moment';



class ShopOrders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: moment().subtract(1, 'days'),
            endDate: moment(),
            viewOrderDetail: false
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

    showOrderDetail(id) {
        this.props.getOrderDetail(id);
        this.setState({
            viewOrderDetail: true
        });
    }

    renderOrders() {
        if (this.props.orders) {
            if (this.props.orders.length > 0) {
                return <div>
                         { this.props.orders.map(function(order, i) {
                               return <div key={ i } className="row">
                                        <p>
                                          { order.frontendOrderId }
                                        </p>
                                        <p>
                                          { order.userId }
                                        </p>
                                        <p>
                                          { moment(order.orderDate).format("dddd, MMMM Do YYYY, h:mm:ss a") }
                                        </p>
                                        <button onClick={ this.showOrderDetail.bind(this, order.frontendOrderId) }>Order Detail</button>
                                      </div>
                           }, this) }
                       </div>
            }
        }
    }

    renderOrderDetail() {
        if (this.props.orderDetail) {
            return <div>
                     <p>
                       { JSON.stringify(this.props.orderDetail) }
                     </p>
                   </div>
        }
    }

    render() {
        return <section>
                 { !this.state.viewOrderDetail ?
                   <div>
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
                   </div> :
                   <div>
                     { this.renderOrderDetail() }
                   </div> }
               </section>
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getShopOrderListByDate: getShopOrderListByDate,
        getOrderDetail: getOrderDetail
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        orders: state.orders,
        orderDetail: state.orderDetail
    };
}


export default connect(mapStateToProps, matchDispatchToProps)(ShopOrders);