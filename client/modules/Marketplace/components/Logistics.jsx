import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getOrdersForDelivery, updateBuyerAWB } from '../RentActions';
import moment from 'moment';
import clientConfig from '../../../config';
import ReactTable from 'react-table';
import ReactModal from 'react-modal';

// Import Style
import styles from './rentOrders.css';

class RentOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment().startOf('day'),
      endDate: moment().endOf('day'),
      orderlineId: '',
      openApproveModal: false,
      awbNo: ''
    };
  }

  componentDidMount() {
    this.props.getOrdersForDelivery();
  }

  handleApprovalModal(id) {
    this.setState({ openApproveModal: true, orderlineId: id });
  }

  hideApproveModal() {
    this.setState({ openApproveModal: false, awbNo: false });
  }

  handleUpdateAWB() {
    let body = {
      orderlineId: this.state.orderlineId,
      awbNo: this.state.awbNo
    }
    this.props.updateBuyerAWB(body);
    this.hideApproveModal();
  }

  changeAWB(e) {
    this.setState({
      awbNo: e.target.value
    })
  }

  renderOrders() {
    const { orders } = this.props;
    if (orders && orders.length > 0) {
      if (this.props.role == 'admin' || this.props.role == 'superuser') {
        if (!clientConfig.marketDeliveryColumns.find(o => o.id == 'approve')) {
          clientConfig.marketDeliveryColumns.unshift({
            Header: '',
            id: 'approve',
            accessor: 'id',
            filterable: false,
            sortable: false,
            Cell: ({ value }) => {
              return <button onClick={this.handleApprovalModal.bind(this, value)}>Update</button>
            }
          });
        }
      }
      return <div>
        <ReactTable data={orders} filterable columns={clientConfig.marketDeliveryColumns} defaultPageSize={10} className="-striped -highlight" />
      </div>
    }
  }

  render() {
    return <section className={styles.rentOrders}>
      <button className={styles.backBtn} onClick={() => browserHistory.goBack()}><i className="login__backicon__a-Exb fa fa-chevron-left" aria-hidden="true" /> Back</button>
      <div>
        <h3>Marketplace Orders</h3><br /><br />
        {this.renderOrders()}
      </div>
      <ReactModal isOpen={this.state.openApproveModal} onRequestClose={this.hideApproveModal.bind(this)} contentLabel="Update AWB">
        <span onClick={this.hideApproveModal.bind(this)}>×</span>
        <div style={{ marginTop: '2em' }}>
          <h3>Buyer AWB</h3>
          <input type="text" onChange={(e) => this.changeAWB(e)} />
          <button onClick={this.handleUpdateAWB.bind(this)}>Approve</button>
        </div>
      </ReactModal>
    </section>
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    getOrdersForDelivery,
    updateBuyerAWB
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    orders: state.marketDeliveryOrders,
    role: state.auth.role,
    user: state.auth.email
  };
}


export default connect(mapStateToProps, matchDispatchToProps)(RentOrders);
