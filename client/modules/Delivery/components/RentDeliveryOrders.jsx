import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import ReactTable from 'react-table';
import moment from 'moment';
import { getRentOrderListByDate, changeDeliveryStatus } from '../DeliveryActions';
import clientConfig from '../../../config';
import { CSVLink } from 'react-csv';
import ReactModal from 'react-modal';

// Import Style
import styles from './deliveryOrders.css';


class RentDeliveryOrders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: moment().startOf('day'),
            endDate: moment().endOf('day'),
            dateType: 'orderDate',
            csvData: null,
            deliveryDate: moment().startOf('day'),
            viewDeliveryModal: false,
            awbNumber: '',
            orderlineId: ''
        };
    }

    componentDidMount() {
        this.props.getRentOrderListByDate(this.state.dateType, this.state.startDate.unix() * 1000, this.state.endDate.unix() * 1000);
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

    getOrders() {
        this.setState({
            csvData: null
        });
        this.props.getRentOrderListByDate(this.state.dateType, this.state.startDate.unix() * 1000, this.state.endDate.unix() * 1000);
    }

    handleChangeDateType(e) {
        this.setState({
            dateType: e.target.value
        });
    }

    handleChangeDeliveryDate(date) {
        this.setState({
            deliveryDate: date.startOf('day'),
        });
    }

    generateExportLink() {
        this.setState({
            csvData: this.deliveryTable.getResolvedState().sortedData
        });
    }

    markDispatched() {
        let deliveryObject = {
            "action": "DISPATCHED",
            "awbNumber": this.state.awbNumber,
            "dateTimeUtcMs": this.state.deliveryDate.unix() * 1000,
            "orderlineId": this.state.orderlineId
        }
        this.props.changeDeliveryStatus(deliveryObject);
        this.hideDeliveryModal();
    }

    showDeliveryModal(id) {
        this.setState({
            viewDeliveryModal: true,
            orderlineId: id,
            deliveryDate: moment().startOf('day')
        });
    }

    hideDeliveryModal() {
        this.setState({
            viewDeliveryModal: false,
            orderlineId: ''
        });
    }

    markReceived() {
        let deliveryObject = {
            "action": "RECEIVED",
            "awbNumber": this.state.awbNumber,
            "dateTimeUtcMs": this.state.deliveryDate.unix() * 1000,
            "orderlineId": this.state.orderlineId
        }
        this.props.changeDeliveryStatus(deliveryObject);
        this.hideDeliveryModal();
    }

    handleChangeAWBNumber(e) {
        this.setState({
            awbNumber: e.target.value
        })
    }

    renderOrders() {
        if (this.props.orders) {
            if (this.props.orders.length > 0) {
                if (!clientConfig.rentDeliveryColumns.find(o => o.id == 'changeDeliveryStatus') && (this.props.role == 'delivery' || this.props.role == 'admin')) {
                    clientConfig.rentDeliveryColumns.unshift({
                        Header: '',
                        id: 'changeDeliveryStatus',
                        accessor: 'id',
                        Cell: ({ value }) => (<div>
                            <button className={styles.tableBtn} onClick={this.showDeliveryModal.bind(this, value)}>Dispatched/Received</button>
                        </div>)
                    });
                }
                return <div>
                    <ReactTable filterable onSortedChange={this.generateExportLink.bind(this)} onFilteredChange={this.generateExportLink.bind(this)} data={this.props.orders} ref={(r) => this.deliveryTable = r} columns={clientConfig.rentDeliveryColumns}
                        defaultPageSize={10} className="data-table -striped -highlight" />
                    {!this.state.csvData ? <button onClick={this.generateExportLink.bind(this)}>Generate Export Link</button> : null}
                    {this.state.csvData ? <CSVLink data={this.state.csvData} filename={"Rent Delivery Orders.csv"}>Export CSV</CSVLink> : null}
                </div>;
            }
        }
    }

    renderOrderCount() {
        if (this.props.orders) {
            return <span style={{ color: 'green' }}>{'[ ' + this.props.orders.filter((order) => order.product.type == 'product').length + ' Looks & ' + this.props.orders.filter((order) => order.product.type == 'accessory').length + ' Accessories ]'}</span>;
        }
    }

    render() {
        return <section className={styles.deliveryOrders}>
            <div>
                <h3>Rent Orders {this.renderOrderCount()}</h3>
                <br />
                <div>
                    <div>
                        <div>
                            <h4>Date Type</h4>
                            <select onChange={this.handleChangeDateType.bind(this)}>
                                <option value="orderDate">Order</option>
                                <option value="deliveryDate">Delivery</option>
                                <option value="pickupDate">Pickup</option>
                            </select>
                        </div>
                        <div>
                            <h4>Start Date</h4>
                            <DatePicker selected={this.state.startDate} onChange={this.handleChangeStartDate.bind(this)} />
                        </div>
                        <div>
                            <h4>End Date</h4>
                            <DatePicker selected={this.state.endDate} onChange={this.handleChangeEndDate.bind(this)} />
                        </div>
                    </div>
                    <br />
                    <div>
                        <button onClick={this.getOrders.bind(this)}>Search</button>
                    </div>
                </div>
                <br />
                {this.renderOrders()}
            </div>
            <ReactModal className={styles.statusPop} isOpen={this.state.viewDeliveryModal} onRequestClose={this.hideDeliveryModal.bind(this)} contentLabel="Change Delivery Status">
                <span onClick={this.hideDeliveryModal.bind(this)}>×</span>
                <br />
                <h3>Select Date: </h3>
                <DatePicker selected={this.state.deliveryDate} onChange={this.handleChangeDeliveryDate.bind(this)} />
                <h3>AWB Number: </h3>
                <input onChange={this.handleChangeAWBNumber.bind(this)} />
                <button onClick={this.markDispatched.bind(this)}>Mark Dispatched</button>
                <button onClick={this.markReceived.bind(this)}>Mark Received</button>
            </ReactModal>
        </section>
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getRentOrderListByDate,
        changeDeliveryStatus
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        orders: state.rentDeliveryOrders,
        role: state.auth.role,
        user: state.auth.email
    };
}


export default connect(mapStateToProps, matchDispatchToProps)(RentDeliveryOrders);