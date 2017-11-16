import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getShopOrderListByDate, getOrderDetail, removeItem, getOrdersByUserId, getOrderDetailByOrderId, confirmPayment, cancelOrder, getOrdersByPhoneNumber } from '../RentActions';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import clientConfig from '../../../config';
import { clearCustomerDetail } from '../../Customer/CustomerActions';
import ReactTable from 'react-table';


class RentOrders extends React.Component {
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
        browserHistory.push('/rent?orderId=' + id);
    }

    showOrderList() {
        browserHistory.goBack();
    }

    changeCancelReason(e) {
        this.setState({
            cancelReason: e.target.value
        });
    }

    removeItem(lineId) {
        let cancelRequest = {
            lineId: lineId,
            cancelReason: this.state.cancelReason,
            frontendOrderId: this.props.orderDetail.frontendOrderId
        }
        let confirmCancel = confirm("Do you confirm to remove this item!");
        if (confirmCancel) {
            this.props.removeItem(cancelRequest);
        }
    }

    cancelOrder(orderId) {
        let cancelRequest = {
            orderId: orderId,
            cancelReason: this.state.cancelReason,
            frontendOrderId: this.props.orderDetail.frontendOrderId
        }
        let confirmCancel = confirm("Do you confirm to cancel this order!");
        if (confirmCancel) {
            this.props.cancelOrder(cancelRequest);
        }
    }

    changePaymentMethod(e) {
        this.setState({
            paymentMethod: e.target.value
        });
    }

    confirmPayment() {
        let confirmPaymentObject = {
            orderId: this.props.orderDetail.id,
            paymentInformation: {
                orderId: this.props.orderDetail.id,
                paymentAmount: this.props.orderDetail.totalDiscountedRentalPrice + this.props.orderDetail.totalDiscountedDepositPrice,
                paymentStatus: this.state.paymentStatus,
                paymentType: this.state.paymentMethod,
                paymentHash: 'stage3-admin-hash',
                userId: this.props.orderDetail.userId
            }
        };
        this.props.confirmPayment(confirmPaymentObject);
    }


    renderOrders() {
        if (this.props.orders) {
            if (this.props.orders.length > 0) {
                return <div>
                         <ReactTable data={ this.props.orders } columns={ clientConfig.rentalColumns } defaultPageSize={ 10 } className="-striped -highlight"
                         />
                            {/* <button onClick={this.showOrderDetail.bind(this, orders.frontendOrderId)}>Order Detail</button> */}
                        </div>
            }
        }
    }

    renderMeasurementStatus(id) {
        if (this.props.measurementStatus) {
            let measurementObj = this.props.measurementStatus.measurementOption[Object.keys(this.props.measurementStatus.measurementOption).find(x => x == id)];
            if (measurementObj) {
                return <div>
                    <p><strong>MEASUREMENT STATUS :</strong>
                        {measurementObj.aggregatedMatchStatus}
                    </p>
                    <br />
                    {Object.keys(measurementObj.matches).map((measurement, i) => {
                        return <p key={i}>
                            {measurement.toUpperCase()} -
                                        {measurementObj.matches[measurement]}
                        </p>
                    })}
                </div>;
            }
        }
    }

    renderorderDetail() {
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
                <p><strong>MEASUREMENT STATUS :</strong>
                    {this.props.measurementStatus ? this.props.measurementStatus.aggregatedStatusLine : 'Unavailable'}
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
                    {this.props.orderDetail.shippingInformationObj.address}
                </p>
                <br />
                <p><strong>CITY :</strong>
                    {this.props.orderDetail.shippingInformationObj.city}
                </p>
                <br />
                <p><strong>STATE :</strong>
                    {this.props.orderDetail.shippingInformationObj.state}
                </p>
                <br />
                <p><strong>PINCODE :</strong>
                    {this.props.orderDetail.shippingInformationObj.pincode}
                </p>
                <br />
                <p><strong>DISCOUNT COUPON :</strong>
                    {this.props.orderDetail.discountCoupon}
                </p>
                <br />
                <p><strong>TOTAL ORIGINAL RENT :</strong>
                    {this.props.orderDetail.totalRentalPrice}
                </p>
                <br />
                <p><strong>TOTAL RENT TO PAY :</strong>
                    {this.props.orderDetail.totalDiscountedRentalPrice}
                </p>
                <br />
                <p><strong>TOTAL DEPOSIT AMOUNT :</strong>
                    {this.props.orderDetail.totalDepositPrice}
                </p>
                <br />
                <p><strong>PAYMENT TYPE :</strong>
                    {this.props.orderDetail.paymentType}
                </p>
                <br />
                <p><strong>CREDIT POINTS EARNED :</strong>
                    {this.props.orderDetail.creditPointsForOrder}
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
                    <button onClick={this.cancelOrder.bind(this, this.props.orderDetail.id)}>Cancel Complete Order</button>
                    <br />
                </div> : null}

                <br />
                <h3>ITEM DETAILS</h3>
                <hr />
                {this.props.orderDetail.orderLinesView.map((line, i) => {
                    return (
                        <div key={i}>
                            <br />
                            <p><strong>OUTFIT :</strong>
                                {line.product.name}
                            </p>
                            <br />
                            <p><strong>SKU :</strong>
                                {line.product.sku}
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
                                {line.price}
                            </p>
                            <br />
                            <p><strong>DEPOSIT PRICE :</strong>
                                {line.originalDeposit}
                            </p>
                            <br />
                            <p><strong>STATUS :</strong>
                                {line.currentStatus}
                            </p>
                            <br />
                            {this.renderMeasurementStatus(line.productId)}
                            <br/>
                            <p><strong>DISPATCH DATE :</strong>
                                {moment(line.dispatchDateUTC).format("dddd, MMMM Do YYYY")}
                            </p>
                            <br />
                            <p><strong>OCCASION DATE :</strong>
                                {moment(line.occasionDateUTC).format("dddd, MMMM Do YYYY")}
                            </p>
                            <br />
                            <p><strong>DELIVERY DATE :</strong>
                                {moment(line.deliveryDateUTC).format("dddd, MMMM Do YYYY")}
                            </p>
                            <br/>
                            <p><strong>PICK UP DATE :</strong>
                                {moment(line.pickupDateUTC).format("dddd, MMMM Do YYYY")}
                            </p>
                            <br/>
                            <p><strong>RECEIVED DATE :</strong>
                                {moment(line.receivedDateUTC).format("dddd, MMMM Do YYYY")}
                            </p>
                            <br />
                            <p><strong>AVAILABLE DATE :</strong>
                                {moment(line.availableDateUTC).format("dddd, MMMM Do YYYY")}
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
                                <button onClick={this.removeItem.bind(this, line.id)}>Remove Item</button>
                                <br />
                            </div> : null}
                            <br />
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
                    <h2>Rent Orders</h2>
                    <hr />
                    <br />
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
                    {this.renderorderDetail()}
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
        cancelOrder,
        clearCustomerDetail
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        orders: state.rentOrders,
        orderDetail: state.rentOrderDetail,
        role: state.auth.role,
        user: state.auth.email,
        measurementStatus: state.measurementStatus,
        details: state.customerDetail
    };
}


export default connect(mapStateToProps, matchDispatchToProps)(RentOrders);
