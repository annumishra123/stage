import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import ReactTable from 'react-table';
import moment from 'moment';
import { getOrderListByDate } from '../DeliveryActions';
import clientConfig from '../../../config';
import { CSVLink } from 'react-csv';


class RentOrders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: moment().startOf('day'),
            endDate: moment().endOf('day'),
            dateType: 'deliveryDate',
            csvData: null
        };
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

    getOrders() {
        this.props.getOrderListByDate(this.state.dateType, this.state.startDate.unix() * 1000, this.state.endDate.unix() * 1000);
    }

    handleChangeDateType(e) {
        this.setState({
            dateType: e.target.value
        });
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
                         <ReactTable filterable onSortedChange={ this.generateExportLink.bind(this) } onFilteredChange={ this.generateExportLink.bind(this) } data={ this.props.orders } ref={ (r) => this.deliveryTable = r } columns={ clientConfig.deliveryColumns }
                           defaultPageSize={ 10 } className="-striped -highlight" />
                         { !this.state.csvData ? <button onClick={ this.generateExportLink.bind(this) }>Generate Export Link</button> : null }
                         { this.state.csvData ? <CSVLink data={ this.state.csvData } filename={ "Delivery Orders.csv" }>Export CSV</CSVLink> : null }
                       </div>;
            }
        }
    }

    render() {
        return <section>
                 <div>
                   <h2>Delivery Orders</h2>
                   <hr />
                   <br />
                   <div>
                     <div>
                       <div>
                         <h3>Date Type</h3>
                         <select onChange={ this.handleChangeDateType.bind(this) }>
                           <option value="deliveryDate">Delivery</option>
                           <option value="pickupDate">Pickup</option>
                         </select>
                       </div>
                       <br/>
                       <div>
                         <h3>Start Date</h3>
                         <DatePicker selected={ this.state.startDate } onChange={ this.handleChangeStartDate.bind(this) } />
                       </div>
                       <br/>
                       <div>
                         <h3>End Date</h3>
                         <DatePicker selected={ this.state.endDate } onChange={ this.handleChangeEndDate.bind(this) } />
                       </div>
                     </div>
                     <br/>
                     <div>
                       <button onClick={ this.getOrders.bind(this) }>Search</button>
                     </div>
                   </div>
                   <br />
                   { this.renderOrders() }
                 </div>
               </section>
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getOrderListByDate
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        orders: state.deliveryOrders,
        orderDetail: state.deliveryOrderDetail,
        role: state.auth.role,
        user: state.auth.email
    };
}


export default connect(mapStateToProps, matchDispatchToProps)(RentOrders);
