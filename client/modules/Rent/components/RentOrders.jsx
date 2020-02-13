import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getShopOrderListByDate, getOrderDetail, removeItem, getOrdersByUserId, getOrderDetailByOrderId, confirmPayment, cancelOrder, getOrdersByPhoneNumber, getOrdersByLookNumber, approveRefund, getRefundLogsByOrderId } from '../RentActions';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import clientConfig from '../../../config';
import { clearCustomerDetail } from '../../Customer/CustomerActions';
import ReactTable from 'react-table';

// Import Style
import styles from './rentOrders.css';


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
      phoneNumber: '',
      sku: '',
      refundAmount: 0
    };
  }

  componentDidMount() {
    if (this.props.location.query.orderId) {
      this.props.getRefundLogsByOrderId(this.props.location.query.orderId);
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
        this.props.getRefundLogsByOrderId(next.location.query.orderId);
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
      startDate: date.startOf('day'),
    });
  }

  handleChangeEndDate(date) {
    this.setState({
      endDate: date.endOf('day'),
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

  handleChangeLookNumber(e) {
    this.setState({
      sku: e.target.value
    });
  }

  handleChangeRefundAmount(e) {
    this.setState({
      refundAmount: e.target.value
    });
  }

  approveRefund(line) {
    if (this.state.refundAmount <= (line.deposit + line.price) && this.state.refundAmount > 0) {
      let data = {
        orderId: this.props.orderDetail.frontendOrderId,
        orderLineId: line.id,
        customerId: this.props.orderDetail.userId,
        amount: this.state.refundAmount,
        looknumber: line.product.lookNumber,
        phoneNumber: this.props.details ? `${this.props.details.phoneNumber}` : '',
        name: this.props.details ? this.props.details.firstName : ''
      }
      this.props.approveRefund(data);
      this.setState({
        refundAmount: '',
      })
    } else {
      alert('Kindly check the refund amount');
    }
  }

  getOrders(e) {
    e.preventDefault();
    this.props.getShopOrderListByDate(this.state.startDate, this.state.endDate);
  }

  getOrdersByUserId(e) {
    e.preventDefault();
    this.props.getOrdersByUserId(this.state.emailId);
  }

  getOrdersByPhoneNumber(e) {
    e.preventDefault();
    this.props.getOrdersByPhoneNumber(this.state.phoneNumber);
  }

  getOrdersByLookNumber() {
    this.props.getOrdersByLookNumber(this.state.sku);
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
    if (this.state.cancelReason != '') {
      let cancelRequest = {
        lineId: lineId,
        cancelReason: this.state.cancelReason,
        frontendOrderId: this.props.orderDetail.frontendOrderId
      }
      let confirmCancel = confirm("Do you confirm to remove this item!");
      if (confirmCancel) {
        this.props.removeItem(cancelRequest);
      }
    } else {
      alert('Select a reason for removing the item')
    }
  }

  cancelOrder(orderId) {
    if (this.state.cancelReason != '') {
      let cancelRequest = {
        orderId: orderId,
        cancelReason: this.state.cancelReason,
        frontendOrderId: this.props.orderDetail.frontendOrderId
      }
      let confirmCancel = confirm("Do you confirm to cancel this order!");
      if (confirmCancel) {
        this.props.cancelOrder(cancelRequest);
        this.setState({
          cancelReason: ''
        })
      }
    } else {
      alert('Select a reason for cancellation')
    }
  }

  changePaymentMethod(e) {
    this.setState({
      paymentMethod: e.target.value
    });
  }

  confirmPayment() {
    if (this.state.paymentMethod != '' && this.state.paymentStatus != '') {
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
      this.setState({
        paymentMethod: '',
        paymentStatus: '',
      })
    }
    else {
      alert('Select a payment method and payment status')
    }
  }


  renderOrders() {
    if (this.props.orders) {
      if (this.props.orders.length > 0) {
        if (!clientConfig.rentalColumns.find(o => o.id == 'view')) {
          clientConfig.rentalColumns.unshift({
            Header: '',
            id: 'view',
            accessor: 'frontendOrderId',
            Cell: ({ value }) => (<button className={styles.tableBtn} onClick={this.showOrderDetail.bind(this, value)}>Order Detail</button>)
          });
        }
        return <div>
          <ReactTable data={this.props.orders} filterable columns={clientConfig.rentalColumns} defaultPageSize={10} className="-striped -highlight" />
        </div>
      }
    }
  }

  renderMeasurementStatus(id) {
    if (this.props.measurementStatus) {
      let measurementObj = this.props.measurementStatus.measurementOption ? this.props.measurementStatus.measurementOption[Object.keys(this.props.measurementStatus.measurementOption).find(x => x == id)] : null;
      if (measurementObj) {
        return <div>
          <h4>Measurement Status</h4>
          <table>
            <tbody>
              <tr>
                <th>AGGREGATE STATUS</th>
                <td>
                  {measurementObj.aggregatedMatchStatus}
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          <table>
            <tbody>
              <tr>
                <th></th>
                <td>Status</td>
                <td>Product</td>
                <td>Customer</td>
              </tr>
              {Object.keys(measurementObj.matches).map((measurement, i) => {
                return <tr key={i}>
                  <th>
                    {measurement.toUpperCase()}
                  </th>
                  <td>
                    {measurementObj.matches[measurement]}
                  </td>
                  <td>
                    {measurementObj.productMeasurements[measurement].min + '-' + measurementObj.productMeasurements[measurement].max}
                  </td>
                  <td>
                    {this.props.measurementStatus.userMeasurements ? this.props.measurementStatus.userMeasurements[measurement] : null}
                  </td>
                </tr>
              })}
            </tbody>
          </table>
        </div>;
      }
    }
  }

  renderLastModifier(modifier) {
    if (modifier) {
      let modifiers = modifier.split(',');
      return modifiers[modifiers.length - 1];
    }
  }

  getRefundLogs(id) {
    if (this.props.refundLogs) {
      let refundLogs = this.props.refundLogs.filter((x => x.orderLineId == id));
      return refundLogs.map((refundLog, i) => {
        return (
          <div key={i}>
            <br />
            <table className={styles.greenbg}>
              <tr>
                <th>Approved Amount</th>
                <td>
                  ₹{refundLog.amount}
                </td>
              </tr>
              <tr>
                <th>Approved On</th>
                <td>
                  {moment(refundLog.createdDate).format("lll")}
                </td>
              </tr>
              <tr>
                <th>Approved By</th>
                <td>
                  {refundLog.createdBy}
                </td>
              </tr>
            </table>
          </div>
        )
      });
    }
  }

  renderorderDetail() {
    if (this.props.orderDetail) {

      return (<div>
        <button onClick={this.showOrderList.bind(this)} className={styles.backBtn}>Back</button>
        <br />
        <h3>ORDER DETAILS</h3>
        <br />
        <table>
          <tr>
            <th>Name</th>
            <td>
              {this.props.details ? this.props.details.firstName + ' ' + this.props.details.lastName : null}
            </td>
          </tr>
          <tr>
            <th>Contact Number</th>
            <td>
              {this.props.details ? this.props.details.phoneNumber : null}
            </td>
          </tr>
          <tr>
            <th>Order Date</th>
            <td>
              {moment(this.props.orderDetail.orderDate).format("dddd, MMMM Do YYYY, h:mm:ss a")}
            </td>
          </tr>
          <tr>
            <th>Status</th>
            <td>
              {this.props.orderDetail.status}
            </td>
          </tr>
          <tr>
            <th>Measurement Status</th>
            <td>
              {this.props.measurementStatus ? this.props.measurementStatus.aggregatedStatusLine : 'Unavailable'}
            </td>
          </tr>
          <tr>
            <th>User Id</th>
            <td>
              {this.props.orderDetail.userId}
            </td>
          </tr>
          <tr>
            <th>Order Id</th>
            <td>
              {this.props.orderDetail.frontendOrderId}
            </td>
          </tr>
          <tr>
            <th>Address</th>
            <td>
              {this.props.orderDetail.shippingInformationObj ? this.props.orderDetail.shippingInformationObj.address : null}
            </td>
          </tr>
          <tr>
            <th>City</th>
            <td>
              {this.props.orderDetail.shippingInformationObj ? this.props.orderDetail.shippingInformationObj.city : null}
            </td>
          </tr>
          <tr>
            <th>State</th>
            <td>
              {this.props.orderDetail.shippingInformationObj ? this.props.orderDetail.shippingInformationObj.state : null}
            </td>
          </tr>
          <tr>
            <th>Pincode</th>
            <td>
              {this.props.orderDetail.shippingInformationObj ? this.props.orderDetail.shippingInformationObj.pincode : null}
            </td>
          </tr>
          <tr>
            <th>Discount Coupon</th>
            <td>
              {this.props.orderDetail.discountCoupon}
            </td>
          </tr>
          <tr>
            <th>Total Original Rent</th>
            <td>
              {this.props.orderDetail.totalRentalPrice}
            </td>
          </tr>
          <tr>
            <th>Total Rent To Pay</th>
            <td>
              {this.props.orderDetail.totalDiscountedRentalPrice}
            </td>
          </tr>
          <tr>
            <th>Total Deposit Amount</th>
            <td>
              {this.props.orderDetail.totalDepositPrice}
            </td>
          </tr>
          <tr>
            <th>Payment Type</th>
            <td>
              {this.props.orderDetail.paymentType}
            </td>
          </tr>
          <tr>
            <th>Last Modifier</th>
            <td>
              {this.renderLastModifier(this.props.orderDetail.modifier)}
            </td>
          </tr>
          <tr>
            <th>Last Modified Date</th>
            <td>
              {moment(this.props.orderDetail.lastModifiedDate).format("dddd, MMMM Do YYYY, h:mm:ss a")}
            </td>
          </tr>
          <tr>
            <th>Credit Points Earned</th>
            <td>
              {this.props.orderDetail.creditPointsForOrder}
            </td>
          </tr>
        </table>
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
        {this.props.orderDetail.orderLinesView.map((line, i) => {
          return (
            <div key={i} className={styles.itemBox}>
              <br />
              <table>
                <tr>
                  <th>Outfit</th>
                  <td>
                    {line.product.name}
                  </td>
                </tr>
                <tr>
                  <th>Sku</th>
                  <td>
                    {line.product.sku}
                  </td>
                </tr>
                <tr>
                  <th>Designer Name</th>
                  <td>
                    {line.product.designer}
                  </td>
                </tr>
                <tr>
                  <th>Order Type</th>
                  <td>
                    {line.orderType}
                  </td>
                </tr>
                <tr>
                  <th>Original Price</th>
                  <td>
                    {line.originalPrice}
                  </td>
                </tr>
                <tr>
                  <th>Discounted Price</th>
                  <td>
                    {line.price}
                  </td>
                </tr>
                <tr>
                  <th>Deposit Price</th>
                  <td>
                    {line.originalDeposit}
                  </td>
                </tr>
                <tr>
                  <th>Loss</th>
                  <td>
                    {line.price - line.invoicePrice}
                  </td>
                </tr>
                <tr>
                  <th>Status</th>
                  <td>
                    {line.currentStatus}
                  </td>
                </tr>
                <tr>
                  <th>Order Source</th>
                  <td>
                    {line.orderType.split('_')[1]}
                  </td>
                </tr>
              </table>
              {this.renderMeasurementStatus(line.productId)}
              <h4>Delivery Dates</h4>

              <table>
                <tr>
                  <th>Dispatch Date</th>
                  <td>
                    {moment(line.dispatchDateUTC).format("dddd, MMMM Do YYYY")}
                  </td>
                </tr>
                <tr>
                  <th>Occasion Date</th>
                  <td>
                    {moment(line.occasionDateUTC).format("dddd, MMMM Do YYYY")}
                  </td>
                </tr>
                <tr>
                  <th>Delivery Date</th>
                  <td>
                    {moment(line.deliveryDateUTC).format("dddd, MMMM Do YYYY")}
                  </td>
                </tr>
                <tr>
                  <th>Pick Up Date</th>
                  <td>
                    {moment(line.pickupDateUTC).format("dddd, MMMM Do YYYY")}
                  </td>
                </tr>
                <tr>
                  <th>Received Date</th>
                  <td>
                    {moment(line.receivedDateUTC).format("dddd, MMMM Do YYYY")}
                  </td>
                </tr>
                <tr>
                  <th>Available Date</th>
                  <td>
                    {moment(line.deliveryDateUTC).format("dddd, MMMM Do YYYY")}
                  </td>
                </tr>
              </table>
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
              {line.product.type === "product" && this.props.role === 'finance' ? <div>
                <h4>Refund Amount: </h4>
                <input type="number" onChange={(e) => this.handleChangeRefundAmount(e)} />
                <button onClick={this.approveRefund.bind(this, line)}>Approve Refund</button>
              </div> : null}
              <br />
              {this.getRefundLogs(line.id)}
              <br />
            </div>)
        })}
        <br />
      </div>)
    }
  }

  render() {
    return <section className={styles.rentOrders}>
      {!this.state.viewOrderDetail ?
        <div>
          <h3>Rent Orders</h3>
          <div>
            <form onSubmit={this.getOrders.bind(this)}>
              <div className={styles.width50}>
                <div>
                  <h4>Start Date</h4>
                  <DatePicker selected={this.state.startDate} onChange={this.handleChangeStartDate.bind(this)} />
                </div>
                <div>
                  <h4>End Date</h4>
                  <DatePicker selected={this.state.endDate} onChange={this.handleChangeEndDate.bind(this)} />
                </div>
              </div>
              <div>
                <button type="submit" onClick={this.getOrders.bind(this)}>Search By Date</button>
              </div>
            </form>
            <div>
              <form onSubmit={this.getOrdersByUserId.bind(this)}>
                <h4>Email Id</h4>
                <input type="text" onChange={this.handleChangeEmailId.bind(this)} />
                <div>
                  <button type="submit" onClick={this.getOrdersByUserId.bind(this)}>Search By Email Id</button>
                </div>
              </form>
            </div>
            <div>
              <form onSubmit={this.showOrderDetail.bind(this)}>
                <h4>Order Id</h4>
                <input type="text" onChange={this.handleChangeOrderId.bind(this)} />
                <div>
                  <button type="submit" onClick={this.showOrderDetail.bind(this, this.state.orderId)}>Search By Order Id</button>
                </div>
              </form>
            </div>
            <div>
              <form onSubmit={this.getOrdersByPhoneNumber.bind(this)}>
                <h4>Phone Number</h4>
                <input type="text" onChange={this.handleChangePhoneNumber.bind(this)} />
                <div>
                  <button type="submit" onClick={this.getOrdersByPhoneNumber.bind(this)}>Search By Phone Number</button>
                </div>
              </form>
            </div>
            {/* <div>
                     <h4>Look Number</h4>
                     <input type="text" onChange={ this.handleChangeLookNumber.bind(this) } />
                     <div>
                       <button onClick={ this.getOrdersByLookNumber.bind(this) }>Search By Look Number</button>
                     </div>
                   </div> */}
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
    clearCustomerDetail,
    getOrdersByLookNumber,
    approveRefund,
    getRefundLogsByOrderId
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    orders: state.rentOrders,
    orderDetail: state.rentOrderDetail,
    role: state.auth.role,
    user: state.auth.email,
    measurementStatus: state.measurementStatus,
    details: state.customerDetail,
    refundLogs: state.refundLogs
  };
}


export default connect(mapStateToProps, matchDispatchToProps)(RentOrders);
