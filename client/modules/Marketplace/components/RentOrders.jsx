import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getShopOrderListByDate, getOrdersByUserId, getOrdersByLookNumber, getOrdersBySellerId, getOrdersById } from '../RentActions';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import clientConfig from '../../../config';
import ReactTable from 'react-table';
import { CSVLink } from 'react-csv';

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
      sellerId: '',
      orderId: '',
      csvData: null,
      sku: ''
    };
  }

  componentDidMount() {
    this.props.getShopOrderListByDate(this.state.startDate, this.state.endDate);
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

  handleChangeSellerId(e) {
    this.setState({
      sellerId: e.target.value
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
    this.setState({
      csvData: null
    }, () => this.props.getShopOrderListByDate(this.state.startDate, this.state.endDate));
  }

  getOrdersByUserId(e) {
    e.preventDefault();
    this.setState({
      csvData: null
    }, () => this.props.getOrdersByUserId(this.state.emailId));
  }

  getOrdersById(e) {
    e.preventDefault();
    this.setState({
      csvData: null
    }, () => this.props.getOrdersById(this.state.orderId));
  }

  getOrdersBySellerId(e) {
    e.preventDefault();
    this.setState({
      csvData: null
    }, () => this.props.getOrdersBySellerId(this.state.sellerId));
  }

  getOrdersByLookNumber(e) {
    e.preventDefault();
    this.setState({
      csvData: null
    }, () => this.props.getOrdersByLookNumber(this.state.sku));
  }

  renderOrders() {
    const { orders } = this.props;
    if (orders && orders.length > 0) {
      return <div>
        <ReactTable data={this.props.orders} filterable columns={clientConfig.marketRentalColumns} ref={(r) => this.marketOrdersTable = r} defaultPageSize={10} defaultPageSize={10} className="-striped -highlight" />
        {!this.state.csvData ? <button onClick={this.generateExportLink.bind(this)}>Generate Export Link</button> : null}
        {this.state.csvData ? <CSVLink data={this.state.csvData} filename={"Marketplace Logistics.csv"}>Export CSV</CSVLink> : null}
      </div>
    }
  }

  generateExportLink() {
    let csvDataArray = this.marketOrdersTable.getResolvedState().sortedData;
    this.setState({
      csvData: csvDataArray
    });
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
            <form onSubmit={this.getOrdersById.bind(this)}>
              <h4>Order Id</h4>
              <input type="text" onChange={this.handleChangeOrderId.bind(this)} />
              <div>
                <button onClick={this.getOrdersById.bind(this)}>Search By Order Id</button>
              </div>
            </form>
          </div>
          <div>
            <form onSubmit={this.getOrdersByUserId.bind(this)}>
              <h4>Email Id</h4>
              <input type="text" onChange={this.handleChangeEmailId.bind(this)} />
              <div>
                <button type="submit" onClick={this.getOrdersByUserId.bind(this)}>Search By Buyer Email Id</button>
              </div>
            </form>
          </div>
          <div>
            <form onSubmit={this.getOrdersBySellerId.bind(this)}>
              <h4>Email Id</h4>
              <input type="text" onChange={this.handleChangeSellerId.bind(this)} />
              <div>
                <button type="submit" onClick={this.getOrdersBySellerId.bind(this)}>Search By Seller Email Id</button>
              </div>
            </form>
          </div>
          <div>
            <form onSubmit={this.getOrdersByLookNumber.bind(this)}>
              <h4>SKU</h4>
              <input type="text" onChange={this.handleChangeLookNumber.bind(this)} />
              <div>
                <button onClick={this.getOrdersByLookNumber.bind(this)}>Search By SKU</button>
              </div>
            </form>
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
    getOrdersById,
    getOrdersByLookNumber,
    getOrdersBySellerId
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
