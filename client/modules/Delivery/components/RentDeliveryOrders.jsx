import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import ReactTable from 'react-table';
import moment from 'moment';
import { getRentOrderListByDate, changeDeliveryStatus, setQCStatus } from '../DeliveryActions';
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
            viewQCModal: false,
            awbNumber: '',
            orderlineId: '',
            looknumber: '',
            frontendOrderId: '',
            status: '',
            sku: ''
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

    getOrders(e) {
        e.preventDefault();
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
        let csvData = [];
        let csvDataArray = this.deliveryTable.getResolvedState().sortedData;
        // console.log(csvDataArray)
        csvDataArray.sort((a,b) => {return new Date(a.orderDate) - new Date(b.orderDate) }).map(row => {
            let data = {
                frontendOrderId: row['parentOrder.frontendOrderId'],
                email: row['profile.email'],
                name: row.name,
                phoneNumber: row['profile.phoneNumber'],
                address: `${row['deliveryAddress.address']}, ${row['deliveryAddress.city']}, ${row['deliveryAddress.state']}, ${row['deliveryAddress.pincode']}`,
                city: `${row['deliveryAddress.city']}`,
                productName: row['product.name'],
                lookNumber: row['product.lookNumber'],
                gender: row.gender,
                sku: row['product.sku'],
                designer: row['product.designer'],
                owner: row['product.owner'],
                measurementStatus: row.measurementStatus,
                orderDate: row.orderDate,
                deliveryDate: row.deliveryDate,
                occasionDate: row.occasionDate,
                pickupDate: row.pickupDate,
                grossAmount: row.grossAmount,
                discount: row.discount,
                netAmount: row.netAmount,
                price: row.price,
                deposit: row.deposit,
                loss: row.loss,
                currentStatus: row.currentStatus,
                paymentType: row['parentOrder.paymentType'],
                discountCoupon: row['parentOrder.discountCoupon'],
                source: row.source,
                quality: row.quality
            };
            csvData.push(data);
        });
        this.setState({
            csvData: csvData
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

    showQCModal(value) {
        this.setState({
            viewQCModal: true,
            looknumber: value.product.lookNumber,
            frontendOrderId: value.parentOrder.frontendOrderId,
            status: '',
            sku: value.product.sku
        });
    }

    hideQCModal() {
        this.setState({
            viewQCModal: false,
            looknumber: '',
            frontendOrderId: '',
            status: '',
            sku: ''
        });
    }

    changeQCStatus() {
        if (this.props.user && this.state.looknumber && this.state.sku && this.state.status && this.state.frontendOrderId) {
            let qcObject = {
                user: this.props.user,
                looknumber: this.state.looknumber,
                sku: this.state.sku,
                status: this.state.status,
                frontendOrderId: this.state.frontendOrderId
            }
            this.props.setQCStatus(qcObject);
        }
    }

    handleChangeQCStatus(e) {
        this.setState({
            status: e.target.value
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

                let qcIndex = clientConfig.rentDeliveryColumns.findIndex(o => o.id == 'changeQCStatus');
                if (qcIndex != -1) { clientConfig.rentDeliveryColumns.splice(qcIndex, 1); }

                let deliveryIndex = clientConfig.rentDeliveryColumns.findIndex(o => o.id == 'changeDeliveryStatus');
                if (deliveryIndex != -1) { clientConfig.rentDeliveryColumns.splice(deliveryIndex, 1); }

                if (this.props.role == 'delivery' || this.props.role == 'admin') {
                    clientConfig.rentDeliveryColumns.unshift({
                        Header: '',
                        id: 'changeDeliveryStatus',
                        accessor: 'id',
                        Cell: ({ value }) => (<div>
                            <button className={styles.tableBtn} onClick={this.showDeliveryModal.bind(this, value)}>Dispatched/Received</button>
                        </div>)
                    });
                }

                if (this.props.role == 'delivery' || this.props.role == 'admin') {
                    clientConfig.rentDeliveryColumns.unshift({
                        Header: '',
                        id: 'changeQCStatus',
                        accessor: (value) => (<div>
                            <button className={styles.tableBtn} onClick={() => this.showQCModal(value)}>Mark Quality</button>
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
                    <form onSubmit={this.getOrders.bind(this)}>
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
                            <button type="submit" onClick={this.getOrders.bind(this)}>Search</button>
                        </div>
                    </form>
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
            <ReactModal className={styles.statusPop} isOpen={this.state.viewQCModal} onRequestClose={this.hideQCModal.bind(this)} contentLabel="Change QC Status">
                <span onClick={this.hideQCModal.bind(this)}>×</span>
                <br />
                <h3>Quality Check: Look #{this.state.looknumber}</h3>
                <select onChange={(e) => this.handleChangeQCStatus(e)}>
                    <option value=""> -- Select Status -- </option>
                    <option value="Request Temporary Disable">Temporary Disable</option>
                    <option value="Request Permanant Disable">Permanant Disable</option>
                    <option value="Request QC Passed">QC Passed</option>
                </select><br />
                <button className={styles.submit} onClick={this.changeQCStatus.bind(this)}>Update</button>
            </ReactModal>
        </section>
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getRentOrderListByDate,
        changeDeliveryStatus,
        setQCStatus
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
