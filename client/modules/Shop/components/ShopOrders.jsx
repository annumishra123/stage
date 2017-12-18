import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getShopOrderListByDate, getOrderDetail, removeItem, getOrdersByUserId, getOrderDetailByOrderId, getOrdersByPhoneNumber, confirmPayment } from '../ShopActions.js';
import DatePicker from 'react-datepicker';
import { clearCustomerDetail } from '../../Customer/CustomerActions';
import moment from 'moment';
import clientConfig from '../../../config'
import ReactTable from 'react-table';

// Import Style
import styles from './shopOrder.css';


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
        if (!clientConfig.shopColumns.find(o => o.id == 'view')) {
          clientConfig.shopColumns.unshift({
            Header: '',
            id: 'view',
            accessor: 'frontendOrderId',
            Cell: ({value}) => (<button className={ styles.tableBtn } onClick={ this.showOrderDetail.bind(this, value) }>Order Detail</button>)
          });
        }
        return <div>
                 <ReactTable filterable data={ this.props.orders } columns={ clientConfig.shopColumns } defaultPageSize={ 10 } className="-striped -highlight data-table" />
               </div>
      }
    }
  }

  renderOrderDetail() {
    if (this.props.orderDetail) {

      return (<div>
                <button onClick={ this.showOrderList.bind(this) } className={ styles.backBtn }>Back</button>
                <br />
                <h3>ORDER DETAILS</h3>
                <table>
                  <tr>
                    <th>Name:</th>
                    <td>
                      { this.props.details ? this.props.details.firstName + ' ' + this.props.details.lastName : null }
                    </td>
                  </tr>
                  <tr>
                    <th>Contact Number</th>
                    <td>
                      { this.props.details ? this.props.details.phoneNumber : null }
                    </td>
                  </tr>
                  <tr>
                    <th>Order Date</th>
                    <td>
                      { moment(this.props.orderDetail.orderDate).format("dddd, MMMM Do YYYY, h:mm:ss a") }
                    </td>
                  </tr>
                  <tr>
                    <th>Status</th>
                    <td>
                      { this.props.orderDetail.status }
                    </td>
                  </tr>
                  <tr>
                    <th>User Id</th>
                    <td>
                      { this.props.orderDetail.userId }
                    </td>
                  </tr>
                  <tr>
                    <th>Order Id</th>
                    <td>
                      { this.props.orderDetail.frontendOrderId }
                    </td>
                  </tr>
                  <tr>
                    <th>Address</th>
                    <td>
                      { this.props.orderDetail.deliveryAddress ? this.props.orderDetail.deliveryAddress.address : null }
                    </td>
                  </tr>
                  <tr>
                    <th>City</th>
                    <td>
                      { this.props.orderDetail.deliveryAddress ? this.props.orderDetail.deliveryAddress.city : null }
                    </td>
                  </tr>
                  <tr>
                    <th>Pincode</th>
                    <td>
                      { this.props.orderDetail.deliveryAddress ? this.props.orderDetail.deliveryAddress.pincode : null }
                    </td>
                  </tr>
                  <tr>
                    <th>State</th>
                    <td>
                      { this.props.orderDetail.deliveryAddress ? this.props.orderDetail.deliveryAddress.state : null }
                    </td>
                  </tr>
                </table>
                <br />
                <p><strong>PAYMENT TYPE :</strong>
                  { this.props.orderDetail.paymentType }
                </p>
                <br />
                { this.props.role === 'admin' ? <div>
                                                  <select onChange={ this.changePaymentMethod.bind(this) }>
                                                    <option value="">-- Select Payment Method --</option>
                                                    { clientConfig.paymentMethods.map((method, i) => {
                                                        return <option key={ i } value={ method }>
                                                                 { method }
                                                               </option>;
                                                      }) }
                                                  </select>
                                                  <select onChange={ this.handleChangePaymentStatus.bind(this) }>
                                                    <option value="">-- Select Payment Status --</option>
                                                    <option value="success">Success</option>
                                                    <option value="failed">Failed</option>
                                                  </select>
                                                  <button onClick={ this.confirmPayment.bind(this) }>Confirm Payment</button>
                                                  <br />
                                                  <select onChange={ this.changeCancelReason.bind(this) }>
                                                    <option value="">-- Select Reason --</option>
                                                    { clientConfig.cancelReasons.map((reason, i) => {
                                                        return <option key={ i } value={ reason }>
                                                                 { reason }
                                                               </option>;
                                                      }) }
                                                  </select>
                                                  <button onClick={ this.removeItem.bind(this, null) }>Cancel Complete Order</button>
                                                  <br />
                                                </div> : null }
                <br />
                <h3>ITEM DETAILS</h3>
                { this.props.orderDetail.orderLinesFrontend.map((line, i) => {
                    return (
                      <div key={ i }>
                        <br />
                        <table>
                          <tr>
                            <th>Outfit</th>
                            <td>
                              { line.product.name }
                            </td>
                          </tr>
                          <tr>
                            <th>Sku</th>
                            <td>
                              { line.sku }
                            </td>
                          </tr>
                          <tr>
                            <th>Designer Name</th>
                            <td>
                              { line.product.designer }
                            </td>
                          </tr>
                          <tr>
                            <th>Order Type</th>
                            <td>
                              { line.orderType }
                            </td>
                          </tr>
                          <tr>
                            <th>Original Price</th>
                            <td>
                              { line.originalPrice }
                            </td>
                          </tr>
                          <tr>
                            <th>Discounted Price</th>
                            <td>
                              { line.discountedPrice }
                            </td>
                          </tr>
                          <tr>
                            <th>Status</th>
                            <td>
                              { line.status }
                            </td>
                          </tr>
                        </table>
                        <br />
                        { this.props.role === 'admin' ? <div>
                                                          <select onChange={ this.changeCancelReason.bind(this) }>
                                                            <option value="">-- Select Reason --</option>
                                                            { clientConfig.cancelReasons.map((reason, i) => {
                                                                return <option key={ i } value={ reason }>
                                                                         { reason }
                                                                       </option>;
                                                              }) }
                                                          </select>
                                                          <button onClick={ this.removeItem.bind(this, line.product.sku) }>Remove Item</button>
                                                          <br />
                                                        </div> : null }
                      </div>)
                  }) }
                <br />
              </div>)
    }
  }

  render() {
    return <section className={ styles.shopOrders }>
             { !this.state.viewOrderDetail ?
               <div>
                 <h2>Shop Orders</h2>
                 <div>
                   <div className={ styles.width50 }>
                     <div>
                       <h4>Start Date</h4>
                       <DatePicker selected={ this.state.startDate } onChange={ this.handleChangeStartDate.bind(this) } />
                     </div>
                     <div>
                       <h4>End Date</h4>
                       <DatePicker selected={ this.state.endDate } onChange={ this.handleChangeEndDate.bind(this) } />
                     </div>
                   </div>
                   <div>
                     <button onClick={ this.getOrders.bind(this) }>Search By Date</button>
                   </div>
                   <div>
                     <h4>Email Id</h4>
                     <input type="text" onChange={ this.handleChangeEmailId.bind(this) } />
                     <div>
                       <button onClick={ this.getOrdersByUserId.bind(this) }>Search By Email Id</button>
                     </div>
                   </div>
                   <div>
                     <h4>Order Id</h4>
                     <input type="text" onChange={ this.handleChangeOrderId.bind(this) } />
                     <div>
                       <button onClick={ this.showOrderDetail.bind(this, this.state.orderId) }>Search By Order Id</button>
                     </div>
                   </div>
                   <div>
                     <h4>Phone Number</h4>
                     <input type="text" onChange={ this.handleChangePhoneNumber.bind(this) } />
                     <div>
                       <button onClick={ this.getOrdersByPhoneNumber.bind(this) }>Search By Phone Number</button>
                     </div>
                   </div>
                 </div>
                 <br />
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
