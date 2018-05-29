import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import ReactTable from 'react-table';
import moment from 'moment';
import { getShopOrderListByDate } from '../DeliveryActions';
import clientConfig from '../../../config';
import { CSVLink } from 'react-csv';
import ReactModal from 'react-modal';

// Import Style
import styles from './deliveryOrders.css';


class ShopDeliveryOrders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: moment().startOf('day'),
            endDate: moment().endOf('day'),
            csvData: null
        };
    }

    componentDidMount() {
        this.props.getShopOrderListByDate(this.state.startDate.unix() * 1000, this.state.endDate.unix() * 1000);
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
        this.props.getShopOrderListByDate(this.state.startDate.unix() * 1000, this.state.endDate.unix() * 1000);
    }

    generateExportLink() {
        this.setState({
            csvData: this.deliveryTable.getResolvedState().sortedData
        });
    }

    renderOrders() {
        if (this.props.orders) {
            if (this.props.orders.length > 0) {
                return <div>
                    <ReactTable filterable onSortedChange={this.generateExportLink.bind(this)} onFilteredChange={this.generateExportLink.bind(this)} data={this.props.orders} ref={(r) => this.deliveryTable = r} columns={clientConfig.shopDeliveryColumns}
                        defaultPageSize={10} className="data-table -striped -highlight" />
                    {!this.state.csvData ? <button onClick={this.generateExportLink.bind(this)}>Generate Export Link</button> : null}
                    {this.state.csvData ? <CSVLink data={this.state.csvData} filename={"Shop Delivery Orders.csv"}>Export CSV</CSVLink> : null}
                </div>;
            }
        }
    }

    render() {
        return <section className={styles.deliveryOrders}>
            <div>
                <h3>Shop Orders</h3>
                <br />
                <div>
                    <div>
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
        </section>
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getShopOrderListByDate
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        orders: state.shopDeliveryOrders,
        role: state.auth.role,
        user: state.auth.email
    };
}


export default connect(mapStateToProps, matchDispatchToProps)(ShopDeliveryOrders);
