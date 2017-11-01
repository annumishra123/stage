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
          viewOrderDetail: false,
        };
    }

  componentDidMount() { }

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

  getOrders() {
      this.props.getShopOrderListByDate(this.state.startDate, this.state.endDate);
    }

  showOrderDetail(id) {
      this.props.getOrderDetail(id);
      this.setState({
          viewOrderDetail: true,
        });
    }

    renderOrders() {
        if (this.props.orders) {
            if (this.props.orders.length > 0) {
                return <div>
                    {this.props.orders.map(function (order, i) {
                        return <div key={i} className="row">
                            <br />
                            <p>
                                <strong>ORDER ID :</strong> {order.frontendOrderId}
                            </p>
                            <p>
                                <strong>USER ID :</strong> {order.userId}
                            </p>
                            <p>
                                <strong>DATE OF ORDER :</strong> {moment(order.orderDate).format("dddd, MMMM Do YYYY, h:mm:ss a")}
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

                <p>
                    <strong>ORDER ID :</strong> {JSON.stringify(this.props.orderDetail.id)}
                    <br />
                    <strong>ORDER DATE :</strong> {JSON.stringify(this.props.orderDetail.orderDate)}
                    <br />
                    <strong>STATUS :</strong> {JSON.stringify(this.props.orderDetail.status)}
                    <br />
                    <strong>USER ID :</strong> {JSON.stringify(this.props.orderDetail.userId)}
                    <br />
                    <strong>FRONT-END ORDER ID :</strong> {JSON.stringify(this.props.orderDetail.frontendOrderId)}
                    <br />
                    <strong>ADDRESS :</strong> {JSON.stringify(this.props.orderDetail.deliveryAddress.address)}
                    <br />
                    <strong>CITY :</strong> {JSON.stringify(this.props.orderDetail.deliveryAddress.city)}
                    <br />
                    <strong>PINCODE :</strong> {JSON.stringify(this.props.orderDetail.deliveryAddress.pincode)}
                    <br />
                    <strong>STATE :</strong> {JSON.stringify(this.props.orderDetail.deliveryAddress.state)}
                    <br />
                    <br />

                    {this.props.orderDetail.orderLinesFrontend.map((line) => {
                        return (
                            <div><strong>OUTFIT :</strong> {JSON.stringify(line.product.name)}
                                <br />
                                <strong>SKU :</strong> {JSON.stringify(line.product.sku)}
                                <br />
                                <strong>DESIGNER NAME :</strong> {JSON.stringify(line.product.designer)}
                                <br />
                                <strong>ORIGINAL PRICE :</strong> {JSON.stringify(this.props.orderDetail.originalPrice)}
                                <br />
                                <strong>DISCOUNTED PRICE :</strong> {JSON.stringify(this.props.orderDetail.discountedPrice)}
                                <br />
                                <strong>PAYMENT TYPE :</strong> {JSON.stringify(this.props.orderDetail.paymentType)}
                                <br />
                                <strong>STATUS :</strong> {JSON.stringify(this.props.orderDetail.status)}
                                <br />
                                <br />
                            </div>)
                    })
                    }

                </p>
            </div>)
        }
    }

    render() {
        return <section>
            {!this.state.viewOrderDetail ?
                <div>
                    <div className="container">
                        <div className="col-md-6">
                            <h3>Start Date</h3>
                            <DatePicker selected={this.state.startDate} onChange={this.handleChangeStartDate.bind(this)} />
                        </div>
                        <div className="col-md-6">
                            <h3>End Date</h3>
                            <DatePicker selected={this.state.endDate} onChange={this.handleChangeEndDate.bind(this)} />
                        </div>
                    </div>
                    <div>
                        <button onClick={this.getOrders.bind(this)}>Search By Date</button>
                    </div>
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
      getOrderDetail,
    }, dispatch);
}

function mapStateToProps(state) {
  return {
      orders: state.orders,
      orderDetail: state.orderDetail,
    };
}


export default connect(mapStateToProps, matchDispatchToProps)(ShopOrders);
