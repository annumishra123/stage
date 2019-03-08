import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import clientConfig from '../../../config';
import { getAllCoupons, deleteCoupon, createCoupon } from '../RentActions';
import ReactTable from 'react-table';
import Datetime from 'react-datetime';
import moment from 'moment';

// Import Style
import styles from './rentOrders.css';

class Coupons extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageIndex: 0,
            pageSize: 5,
            configs: {},
            couponText: '',
            dateTillValidMillisUTC: moment(),
            isAdvertized: false,
            isReusable: false,
            type: ''
        }
    }

    componentDidMount() {
        this.props.getAllCoupons(this.state.pageIndex, this.state.pageSize);
    }

    deleteCoupon(coupon) {
        this.props.deleteCoupon(coupon, this.state.pageIndex, this.state.pageSize);
    }

    fetchData(state) {
        this.setState({
            pageIndex: state.page,
            pageSize: state.pageSize
        });
        this.props.getAllCoupons(state.page, state.pageSize);
    }

    renderCoupons() {
        if (this.props.allCoupons) {
            if (this.props.allCoupons.length > 0) {
                if (!clientConfig.rentalCouponColumns.find(o => o.id == 'delete')) {
                    clientConfig.rentalCouponColumns.unshift({
                        Header: '',
                        id: 'delete',
                        accessor: 'couponText',
                        Cell: ({ value }) => (<button onClick={this.deleteCoupon.bind(this, value)}>Delete</button>)
                    });
                }
                return <div>
                    <h1>Coupons</h1>
                    <ReactTable data={this.props.allCoupons} manual defaultPageSize={this.state.pageSize} columns={clientConfig.rentalCouponColumns} pages={this.props.pages} onFetchData={(state, instance) => { this.fetchData(state) }} className="-striped -highlight" />
                </div>
            }
        }
    }

    handleChangeDate(date) {
        this.setState({
            dateTillValidMillisUTC: date
        });
    }

    createCoupon() {
        let configs = this.state.configs;
        if (configs.startDate) {
            configs.startDate = configs.startDate.unix() * 1000;
        }
        if (configs.endDate) {
            configs.endDate = configs.endDate.unix() * 1000;
        }
        let couponObject = {
            configs: configs,
            couponText: this.state.couponText,
            dateTillValidMillisUTC: this.state.dateTillValidMillisUTC.unix() * 1000,
            isAdvertized: this.state.isAdvertized,
            isReusable: this.state.isReusable,
            type: this.state.type
        };
        this.props.createCoupon(couponObject, this.state.pageIndex, this.state.pageSize);
        // this.setState({
        //     configs: {},
        //     couponText: '',
        //     dateTillValidMillisUTC: moment(),
        //     isAdvertized: false,
        //     isReusable: false,
        //     type: ''
        // })
    }

    renderConfig() {
        switch (this.state.type) {
            case 'PercentDiscount':
                return <div>
                    <label>Percentage (%) </label>
                    <input type="number" placeholder="Percentage (%)" onChange={(e) => { this.setState({ configs: { percentOfDiscount: e.target.value, minimumCartValue: this.state.configs.minimumCartValue, storeName: this.state.configs.storeName } }) }} />
                    <br />
                    <label>Minimum Cart Value </label>
                    <input type="number" placeholder="Minimum Cart Value" onChange={(e) => { this.setState({ configs: { minimumCartValue: e.target.value, percentOfDiscount: this.state.configs.percentOfDiscount, storeName: this.state.configs.storeName } }) }} />
                    <br />
                    <label>Store Name</label>
                    <input type="name" placeholder="Store" onChange={(e) => { this.setState({ configs: { storeName: e.target.value, minimumCartValue: this.state.configs.minimumCartValue, percentOfDiscount: this.state.configs.percentOfDiscount } }) }} />
                </div>;
            case 'VacationRentalPackageCoupon':
                return <div>
                    <label>Store </label>
                    <input type="text" placeholder="Store" onChange={(e) => { this.setState({ configs: { store: e.target.value, bundlePrice: this.state.configs.bundlePrice, startDate: this.state.configs.startDate, endDate: this.state.configs.endDate } }) }} />
                    <br />
                    <label>Bundle Price </label>
                    <input type="number" placeholder="Bundle Price" onChange={(e) => { this.setState({ configs: { store: this.state.configs.store, bundlePrice: e.target.value, startDate: this.state.configs.startDate, endDate: this.state.configs.endDate } }) }} />
                    <br />
                    <label>Start Date </label>
                    <div className={styles.couponCalendar}>
                        <Datetime defaultValue={this.state.configs.startDate} onChange={(date) => { this.setState({ configs: { store: this.state.configs.store, bundlePrice: this.state.configs.bundlePrice, startDate: date, endDate: this.state.configs.endDate } }) }} />
                    </div>
                    <br />
                    <label>End Date </label>
                    <div className={styles.couponCalendar}>
                        <Datetime defaultValue={this.state.configs.endDate} onChange={(date) => { this.setState({ configs: { store: this.state.configs.store, bundlePrice: this.state.configs.bundlePrice, startDate: this.state.configs.startDate, endDate: date } }) }} />
                    </div>
                </div>;
            case 'FixedValue':
                return <div>
                    <label>Value Of Discount</label>
                    <input type="number" placeholder="Discount" onChange={(e) => { this.setState({ configs: { valueOfDiscount: e.target.value, minimumCartValue: this.state.configs.minimumCartValue } }) }} />
                    <br />
                    <label>Minimum Cart Value </label>
                    <input type="number" placeholder="Minimum Cart Value" onChange={(e) => { this.setState({ configs: { minimumCartValue: e.target.value, valueOfDiscount: this.state.configs.valueOfDiscount } }) }} />
                </div>;
            default:
                return null;
        }
    }

    render() {
        return <section className={styles.coupon}>
            <h1>New Coupon</h1>
            <label>Coupon Type </label>
            <select value={this.state.type} onChange={(e) => { this.setState({ type: e.target.value, configs: {} }) }}>
                <option value=""> -- Select Type -- </option>
                <option value="PercentDiscount">Percentage Discount</option>
                <option value="VacationRentalPackageCoupon">Vacation Rental</option>
                <option value="FixedValue">Fixed Value</option>
            </select>
            <br />
            {this.renderConfig()}
            <label>Coupon Name </label>
            <input type="text" value={this.state.couponText} placeholder="Coupon Name" onChange={(e) => { this.setState({ couponText: e.target.value }) }} />
            <br />
            <br />
            <div><input type="checkbox" checked={this.state.isAdvertized} onChange={(e) => { this.setState({ isAdvertized: e.target.checked }) }} /><label> Advertize</label></div>
            <div><input type="checkbox" checked={this.state.isReusable} onChange={(e) => { this.setState({ isReusable: e.target.checked }) }} /><label> Reusable</label></div>
            <br />
            <br />
            <label>Valid Till </label>
            <div className={styles.couponCalendar}>
                <Datetime value={this.state.dateTillValidMillisUTC} onChange={(date) => this.handleChangeDate(date)} />
            </div>
            <br />
            <button className={styles.createCoupon} onClick={() => { this.createCoupon() }}>Create Coupon</button>
            <br />
            {this.renderCoupons()}
        </section>
    }
}


function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getAllCoupons,
        createCoupon,
        deleteCoupon
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        role: state.auth.role,
        user: state.auth.email,
        allCoupons: state.allCoupons ? state.allCoupons.content : null,
        pages: state.allCoupons ? state.allCoupons.totalPages : -1
    };
}


export default connect(mapStateToProps, matchDispatchToProps)(Coupons);

