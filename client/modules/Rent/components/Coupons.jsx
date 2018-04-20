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
        let couponObject = {
            configs: this.state.configs,
            couponText: this.state.couponText,
            dateTillValidMillisUTC: this.state.dateTillValidMillisUTC.unix() * 1000,
            isAdvertized: this.state.isAdvertized,
            isReusable: this.state.isReusable,
            type: this.state.type
        };
        this.props.createCoupon(couponObject, this.state.pageIndex, this.state.pageSize);
    }

    render() {
        return <section className={ styles.coupon }>
            <h1>New Coupon</h1>
            <label>Coupon Type </label>
            <select onChange={(e) => { this.setState({ type: e.target.value, configs: {} }) }}>
                <option value=""> -- Select Type -- </option>
                <option value="PercentDiscount">Percentage Discount</option>
            </select><br />
            {this.state.type == 'PercentDiscount' ? <div>
                <label>Percentage (%) </label>
                <input type="number" placeholder="Percentage (%)" onChange={(e) => { this.setState({ configs: { percentOfDiscount: e.target.value, minimumCartValue: this.state.configs.minimumCartValue } }) }} />
                <br />
                <label>Minimum Cart Value </label>
                <input type="number" placeholder="Minimum Cart Value" onChange={(e) => { this.setState({ configs: { minimumCartValue: e.target.value, percentOfDiscount: this.state.configs.percentOfDiscount } }) }} />
            </div> : null}
            <label>Coupon Name </label>
            <input type="text" placeholder="Name" onChange={(e) => { this.setState({ couponText: e.target.value }) }} />
            <br/>
            <br/>
            <div><input type="checkbox" onChange={(e) => { this.setState({ isAdvertized: e.target.checked }) }} /><label> Advertize</label></div>
            <div><input type="checkbox" onChange={(e) => { this.setState({ isReusable: e.target.checked }) }} /><label> Reusable</label></div>
            <br/>
            <br/>
            <label>Valid Till </label>
            <div className={ styles.couponCalendar }>
            <Datetime  defaultValue={this.state.dateTillValidMillisUTC} onChange={(date) => this.handleChangeDate(date)} /></div><br />
            <button onClick={() => { this.createCoupon() }}>Create Coupon</button>
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

