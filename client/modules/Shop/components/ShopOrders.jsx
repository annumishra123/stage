import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getShopOrderListByDate, getOrderDetail, removeItem, getOrdersByUserId, getOrderDetailByOrderId, getOrdersByPhoneNumber, confirmPayment } from '../ShopActions.js';
import DatePicker from 'react-datepicker';
import { clearCustomerDetail } from '../../Customer/CustomerActions';
import moment from 'moment';
import clientConfig from '../../../config'


class ShopOrders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: moment().startOf('day'),
            endDate: moment().endOf('day'),
            viewOrderDetail: false,
            cancelReason: '',
            emailId: '',
            orderId: '',
            paymentMethod: '',
            paymentStatus: '',
            phoneNumber: ''
        };
    }

    componentDidMount() {
        if (this.props.location.query.orderId) {
            this.props.getOrderDetail(this.props.location.query.orderId);
            this.setState({
                viewOrderDetail: true,
                cancelReason: ''
            });
        } else {
            this.setState({
                viewOrderDetail: false
            });
            this.props.clearCustomerDetail();
        }
    }

    componentWillReceiveProps(next) {
        if (this.props.location.query.orderId !== next.location.query.orderId) {
            if (next.location.query.orderId) {
                this.props.getOrderDetail(next.location.query.orderId);
                this.setState({
                    viewOrderDetail: true,
                    cancelReason: ''
                });
            } else {
                this.setState({
                    viewOrderDetail: false
                });
                this.props.clearCustomerDetail();
            }
        }
    }

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

    handleChangePaymentStatus(e) {
        this.setState({
            paymentStatus: e.target.value
        });
    }

    handleChangePhoneNumber(e) {
        this.setState({
            phoneNumber: e.target.value
        })
    }

    getOrders() {
        this.props.getShopOrderListByDate(this.state.startDate, this.state.endDate);
    }

    getOrdersByUserId() {
        this.props.getOrdersByUserId(this.state.emailId);
    }

    getOrdersByPhoneNumber() {
        this.props.getOrdersByPhoneNumber(this.state.phoneNumber);
    }

    showOrderDetail(id) {
        browserHistory.push('/shop?orderId=' + id);
    }

    showOrderList() {
        browserHistory.goBack();
    }

    changeCancelReason(e) {
        this.setState({
            cancelReason: e.target.value
        });
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

    changePaymentMethod(e) {
        this.setState({
            paymentMethod: e.target.value
        });
    }

    confirmPayment() {
        let confirmPaymentObject = {
            amount: this.props.orderDetail.discountedPrice,
            modifier: this.props.user,
            orderId: this.props.orderDetail.id,
            paymentType: this.state.paymentMethod,
            sha: 'stage3-admin-hash',
            status: this.state.paymentStatus
        };
        this.props.confirmPayment(confirmPaymentObject);
    }

    renderOrders() {
        if (this.props.orders) {
            if (this.props.orders.length > 0) {
                return <div>
                    <hr />
                    {this.props.orders.map(function (order, i) {
                        return <div key={i} className="row">
                            <br />
                            <p>
                                <strong>ORDER ID :</strong>
                                {order.frontendOrderId}
                            </p>
                            <p>
                                <strong>USER ID :</strong>
                                {order.userId}
                            </p>
                           <p>
                                <strong>DATE OF ORDER :</strong>
                                {moment(order.orderDate).format("dddd, MMMM Do YYYY, h:mm:ss a")}
                            </p>
                            <p>
                                <strong>STATUS :</strong>
                                {order.status}
                            </p>
                            <button onClick={this.showOrderDetail.bind(this, order.frontendOrderId)}>Order Detail</button>
                        </div>
                    }, this)}
                </div>
            }
        }
    }

    renderOrderDetail() {
        if (this.props.orderDetail) {

            return (<div>
                <button onClick={this.showOrderList.bind(this)}>Back</button>
                <br />
                <br />
                <h3>ORDER DETAILS</h3>
                <hr />
                <br />
                <p><strong> NAME :</strong>
                    {this.props.details ? this.props.details.firstName + ' ' + this.props.details.lastName : null}
                </p>
                <br />
                <p><strong> CONTACT NUMBER :</strong>
                    {this.props.details ? this.props.details.phoneNumber : null}
                </p>
                <br />
                <p><strong>ORDER DATE :</strong>
                    {moment(this.props.orderDetail.orderDate).format("dddd, MMMM Do YYYY, h:mm:ss a")}
                </p>
                <br />
                <p><strong>STATUS :</strong>
                    {this.props.orderDetail.status}
                </p>
                <br />
                <p><strong>USER ID :</strong>
                    {this.props.orderDetail.userId}
                </p>
                <br />
                <p><strong>ORDER ID :</strong>
                    {this.props.orderDetail.frontendOrderId}
                </p>
                <br />
                <p><strong>ADDRESS :</strong>
                    {this.props.orderDetail.deliveryAddress.address}
                </p>
                <br />
                <p><strong>CITY :</strong>
                    {this.props.orderDetail.deliveryAddress.city}
                </p>
                <br />
                <p><strong>PINCODE :</strong>
                    {this.props.orderDetail.deliveryAddress.pincode}
                </p>
                <br />
                <p><strong>STATE :</strong>
                    {this.props.orderDetail.deliveryAddress.state}
                </p>
                <br />
                {this.props.role === 'admin' ? <div>
                    <select onChange={this.changePaymentMethod.bind(this)}>
                        <option value="">-- Select Payment Method --</option>
                        {clientConfig.paymentMethods.map((method, i) => {
                            return <option key={i} value={method}>
                                {method}
                            </option>;
                        })}
                    </select>
                    <select onChange={this.handleChangePaymentStatus.bind(this)}>
                        <option value="">-- Select Payment Status --</option>
                        <option value="success">Success</option>
                        <option value="failed">Failed</option>
                    </select>
                    <button onClick={this.confirmPayment.bind(this)}>Confirm Payment</button>
                    <br />
                    <select onChange={this.changeCancelReason.bind(this)}>
                        <option value="">-- Select Reason --</option>
                        {clientConfig.cancelReasons.map((reason, i) => {
                            return <option key={i} value={reason}>
                                {reason}
                            </option>;
                        })}
                    </select>
                    <button onClick={this.removeItem.bind(this, null)}>Cancel Complete Order</button>
                    <br />
                </div> : null}
                <br />
                <h3>ITEM DETAILS</h3>
                <hr />
                {this.props.orderDetail.orderLinesFrontend.map((line, i) => {
                    return (
                        <div key={i}>
                            <br />
                            <p><strong>OUTFIT :</strong>
                                {line.product.name}
                            </p>
                            <br />
                            <p><strong>SKU :</strong>
                                {line.sku}
                            </p>
                            <br />
                            <p><strong>DESIGNER NAME :</strong>
                                {line.product.designer}
                            </p>
                            <br />
                            <p><strong>ORIGINAL PRICE :</strong>
                                {line.originalPrice}
                            </p>
                            <br />
                            <p><strong>DISCOUNTED PRICE :</strong>
                                {line.discountedPrice}
                            </p>
                            <br />
                            <p><strong>PAYMENT METHOD :</strong>
                                {line.paymentMethod}
                            </p>
                            <br />
                            <p><strong>STATUS :</strong>
                                {line.status}
                            </p>
                            <br />
                            {this.props.role === 'admin' ? <div>
                                <select onChange={this.changeCancelReason.bind(this)}>
                                    <option value="">-- Select Reason --</option>
                                    {clientConfig.cancelReasons.map((reason, i) => {
                                        return <option key={i} value={reason}>
                                            {reason}
                                        </option>;
                                    })}
                                </select>
                                <button onClick={this.removeItem.bind(this, line.product.sku)}>Remove Item</button>
                                <br />
                            </div> : null}
                        </div>)
                })}
                <br />
            </div>)
        }
    }

    render() {
        return <section>
            {!this.state.viewOrderDetail ?
                <div>
                    <h2>Shop Orders</h2>
                    <hr /><br />
                    <div>
                        <div>
                            <div>
                                <h3>Start Date</h3>
                                <DatePicker selected={this.state.startDate} onChange={this.handleChangeStartDate.bind(this)} />
                            </div>
                            <div>
                                <h3>End Date</h3>
                                <DatePicker selected={this.state.endDate} onChange={this.handleChangeEndDate.bind(this)} />
                            </div>
                        </div>
                        <div>
                            <button onClick={this.getOrders.bind(this)}>Search By Date</button>
                        </div>
                        <br />
                        <div>
                            <h3>Email Id</h3>
                            <input type="text" onChange={this.handleChangeEmailId.bind(this)} />
                            <div>
                                <button onClick={this.getOrdersByUserId.bind(this)}>Search By Email Id</button>
                            </div>
                        </div>
                        <br />
                        <div>
                            <h3>Order Id</h3>
                            <input type="text" onChange={this.handleChangeOrderId.bind(this)} />
                            <div>
                                <button onClick={this.showOrderDetail.bind(this, this.state.orderId)}>Search By Order Id</button>
                            </div>
                        </div>
                        <br />
                        <div>
                            <h3>Phone Number</h3>
                            <input type="text" onChange={this.handleChangePhoneNumber.bind(this)} />
                            <div>
                                <button onClick={this.getOrdersByPhoneNumber.bind(this)}>Search By Phone Number</button>
                            </div>
                        </div>
                    </div>
                    <br />
                    {this.renderOrders()}
                </div> :
                <div>
                    {this.renderOrderDetail()}
                </div>}
        </section>
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getShopOrderListByDate,
        getOrdersByUserId,
        getOrderDetailByOrderId,
        getOrdersByPhoneNumber,
        getOrderDetail,
        removeItem,
        confirmPayment,
        clearCustomerDetail
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        orders: state.orders,
        orderDetail: state.orderDetail,
        role: state.auth.role,
        user: state.auth.email,
        details: state.customerDetail
    };
}


export default connect(mapStateToProps, matchDispatchToProps)(ShopOrders);
