import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getShopOrderListByDate, getOrderDetail, removeItem, getOrderDetailByUserId, getOrderDetailByOrderId } from '../ShopActions.js';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import clientConfig from '../../../config'


class ShopOrders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: moment().subtract(1, 'days'),
            endDate: moment(),
            viewOrderDetail: false,
            cancelReason: '',
            emailId: '',
            orderId: ''
        };
    }

    componentDidMount() {}

    handleChangeStartDate(date) {
        this.setState({
            startDate: date,
        });
    }

    handleChangeEndDate(date) {
        this.setState({
            endDate: date,
        });
    }

    handleChangeEmailId(e) {
        this.setState({
            emailId: e.target.value
        })
    }

    handleChangeOrderId(e) {
        this.setState({
            orderId: e.target.value
        })
    }

    getOrders() {
        this.props.getShopOrderListByDate(this.state.startDate, this.state.endDate);
    }

    getOrdersByUserId() {
        this.props.getOrderDetailByUserId(this.state.emailId);
    }

    showOrderDetail(id) {
        this.props.getOrderDetail(id);
        this.setState({
            viewOrderDetail: true,
            cancelReason: ''
        });
    }

    showOrderList() {
        this.setState({
            viewOrderDetail: false
        })
    }

    changeCancelReason(e) {
        this.setState({
            cancelReason: e.target.value
        });
        console.log(e.target.value);
    }

    removeItem(sku) {
        let cancelRequest = {
            orderId: this.props.orderDetail.id,
            frontendOrderId: this.props.orderDetail.frontendOrderId,
            sku: sku ? sku : null,
            cancelReason: this.state.cancelReason
        }
        let confirmCancel = sku ? confirm("Do you confirm to remove this item!") : confirm("Do you confirm to delete this order!");
        if (confirmCancel) {
            this.props.removeItem(cancelRequest);
        }
    }

    renderOrders() {
        if (this.props.orders) {
            if (this.props.orders.length > 0) {
                return <div>
                         <hr/>
                         { this.props.orders.map(function(order, i) {
                               return <div key={ i } className="row">
                                        <br />
                                        <p>
                                          <strong>ORDER ID :</strong>
                                          { order.frontendOrderId }
                                        </p>
                                        <p>
                                          <strong>USER ID :</strong>
                                          { order.userId }
                                        </p>
                                        <p>
                                          <strong>DATE OF ORDER :</strong>
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

            return (<div>
                      <button onClick={ this.showOrderList.bind(this) }>Back</button>
                      <br/>
                      <br/>
                      <h3>ORDER DETAILS</h3>
                      <hr />
                      <br />
                      <p>
                        <strong>ORDER ID :</strong>
                        { this.props.orderDetail.id }
                      </p>
                      <br />
                      <p><strong>ORDER DATE :</strong>
                        { this.props.orderDetail.orderDate }
                      </p>
                      <br />
                      <p><strong>STATUS :</strong>
                        { this.props.orderDetail.status }
                      </p>
                      <br />
                      <p><strong>USER ID :</strong>
                        { this.props.orderDetail.userId }
                      </p>
                      <br />
                      <p><strong>FRONT-END ORDER ID :</strong>
                        { this.props.orderDetail.frontendOrderId }
                      </p>
                      <br />
                      <p><strong>ADDRESS :</strong>
                        { this.props.orderDetail.deliveryAddress.address }
                      </p>
                      <br />
                      <p><strong>CITY :</strong>
                        { this.props.orderDetail.deliveryAddress.city }
                      </p>
                      <br />
                      <p><strong>PINCODE :</strong>
                        { this.props.orderDetail.deliveryAddress.pincode }
                      </p>
                      <br />
                      <p><strong>STATE :</strong>
                        { this.props.orderDetail.deliveryAddress.state }
                      </p>
                      <br />
                      <br />
                      <h3>ITEM DETAILS</h3>
                      <hr />
                      { this.props.orderDetail.orderLinesFrontend.map((line, i) => {
                            return (
                                <div key={ i }>
                                  <br/>
                                  <p><strong>OUTFIT :</strong>
                                    { line.product.name }
                                  </p>
                                  <br />
                                  <p><strong>SKU :</strong>
                                    { line.product.sku }
                                  </p>
                                  <br />
                                  <p><strong>DESIGNER NAME :</strong>
                                    { line.product.designer }
                                  </p>
                                  <br />
                                  <p><strong>ORIGINAL PRICE :</strong>
                                    { this.props.orderDetail.originalPrice }
                                  </p>
                                  <br />
                                  <p><strong>DISCOUNTED PRICE :</strong>
                                    { this.props.orderDetail.discountedPrice }
                                  </p>
                                  <br />
                                  <p><strong>PAYMENT METHOD :</strong>
                                    { line.paymentMethod }
                                  </p>
                                  <br />
                                  <p><strong>STATUS :</strong>
                                    { this.props.orderDetail.status }
                                  </p>
                                  <br/>
                                  <select onChange={ this.changeCancelReason.bind(this) }>
                                    <option value="">-- Select --</option>
                                    { clientConfig.cancelReasons.map((reason, i) => {
                                          return <option key={ i } value={ reason }>
                                                   { reason }
                                                 </option>;
                                      }) }
                                  </select>
                                  <button onClick={ this.removeItem.bind(this, line.product.sku) }>Remove Item</button>
                                  <br />
                                </div>)
                        }) }
                      <br/>
                      <hr/>
                      <select onChange={ this.changeCancelReason.bind(this) }>
                        <option value="">-- Select --</option>
                        { clientConfig.cancelReasons.map((reason, i) => {
                              return <option key={ i } value={ reason }>
                                       { reason }
                                     </option>;
                          }) }
                      </select>
                      <button onClick={ this.removeItem.bind(this, null) }>Cancel Complete Order</button>
                    </div>)
        }
    }

    render() {
        return <section>
                 { !this.state.viewOrderDetail ?
                   <div>
                     <div>
                       <div>
                         <div>
                           <h3>Start Date</h3>
                           <DatePicker selected={ this.state.startDate } onChange={ this.handleChangeStartDate.bind(this) } />
                         </div>
                         <div>
                           <h3>End Date</h3>
                           <DatePicker selected={ this.state.endDate } onChange={ this.handleChangeEndDate.bind(this) } />
                         </div>
                       </div>
                       <div>
                         <button onClick={ this.getOrders.bind(this) }>Search By Date</button>
                       </div>
                       <br/>
                       <div>
                         <h3>Email Id</h3>
                         <input type="text" onChange={ this.handleChangeEmailId.bind(this) } />
                         <div>
                           <button onClick={ this.getOrdersByUserId.bind(this) }>Search By Email Id</button>
                         </div>
                       </div>
                       <br/>
                       <div>
                         <h3>Order Id</h3>
                         <input type="text" onChange={ this.handleChangeOrderId.bind(this) } />
                         <div>
                           <button onClick={ this.showOrderDetail.bind(this, this.state.orderId) }>Search By Order Id</button>
                         </div>
                       </div>
                     </div>
                     <br/>
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
        getShopOrderListByDate,
        getOrderDetailByUserId,
        getOrderDetailByOrderId,
        getOrderDetail,
        removeItem
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        orders: state.orders,
        orderDetail: state.orderDetail
    };
}


export default connect(mapStateToProps, matchDispatchToProps)(ShopOrders);
