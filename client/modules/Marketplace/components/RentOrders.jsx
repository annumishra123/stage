import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getShopOrderListByDate, getOrderDetail, getOrdersByUserId, getOrdersByLookNumber } from '../RentActions';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import clientConfig from '../../../config';
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
      emailId: '',
      orderId: '',
      sku: ''
    };
  }

  componentDidMount() {
    this.props.getShopOrderListByDate(this.state.startDate, this.state.endDate);
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

  handleChangeLookNumber(e) {
    this.setState({
      sku: e.target.value
    });
  }

  getOrders(e) {
    e.preventDefault();
    this.props.getShopOrderListByDate(this.state.startDate, this.state.endDate);
  }

  getOrdersByUserId(e) {
    e.preventDefault();
    this.props.getOrdersByUserId(this.state.emailId);
  }

  getOrdersByLookNumber() {
    this.props.getOrdersByLookNumber(this.state.sku);
  }

  showOrderDetail(id) {
    this.props.getOrderDetail(id);
  }

  renderOrders() {
    const { orders } = this.props;
    if (orders && orders.length > 0) {
      return <div>
        <ReactTable data={this.props.orders} filterable columns={clientConfig.marketRentalColumns} defaultPageSize={10} className="-striped -highlight" />
      </div>
    }
  }

  render() {
    return <section className={styles.rentOrders}>
      <button className={styles.backBtn} onClick={() => browserHistory.goBack()}><i className="login__backicon__a-Exb fa fa-chevron-left" aria-hidden="true" /> Back</button>
      <div>
        <h3>Marketplace Orders</h3>
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
            <h4>SKU</h4>
            <input type="text" onChange={this.handleChangeLookNumber.bind(this)} />
            <div>
              <button onClick={this.getOrdersByLookNumber.bind(this)}>Search By SKU</button>
            </div>
          </div>
        </div>
        <br />
        {this.renderOrders()}
      </div>
    </section>
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    getShopOrderListByDate,
    getOrdersByUserId,
    getOrderDetail,
    getOrdersByLookNumber
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    orders: state.marketRentOrders,
    orderDetail: state.rentOrderDetail,
    role: state.auth.role,
    user: state.auth.email,
    details: state.customerDetail
  };
}


export default connect(mapStateToProps, matchDispatchToProps)(RentOrders);
