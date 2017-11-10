import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchProduct, addItemToCart, placeOrder, removeItemFromCart, fetchAccessory, getBookedDates, getDeliveryDates, applyDiscount } from '../RentActions';
import clientConfig from '../../../config';
import DatePicker from 'react-datepicker';
import moment from 'moment';


class CreateRentOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sku: '',
            looknumber: '',
            paymentMethod: '',
            occasionDate: moment(),
            days: 3,
            discountCode: ''
        }
    }

    componentDidMount() {
        if (!this.props.customerDetail) {
            browserHistory.push('/customer');
        } else if (this.props.rentalPricing) {
            if (Object.keys(this.props.rentalPricing.pricing.linePricing).length > 0) {
                this.applyDiscountCode();
            }
        }
    }

    handleChangeOccasionDate(date) {
        this.setState({
            occasionDate: date
        });
        let isSixDay = this.state.days == 6;
        this.props.getDeliveryDates(date, isSixDay);

    }

    onMonthChange(date) {
        this.props.getBookedDates(date);
    }

    selectDays(days) {
        this.setState({
            days: days
        });
        let isSixDay = days == 6;
        this.props.getDeliveryDates(this.state.occasionDate, isSixDay);
    }

    handleChangeLookNumber(e) {
        this.setState({
            looknumber: e.target.value
        })
    }

    handleChangeSKU(e) {
        this.setState({
            sku: e.target.value
        })
    }

    changePaymentMethod(e) {
        this.setState({
            paymentMethod: e.target.value
        });
    }

    handleChangeDiscountCode(e) {
        this.setState({
            discountCode: e.target.value
        })
    }

    findProduct() {
        this.props.fetchProduct(this.state.looknumber);
    }

    findAccessory() {
        this.props.fetchAccessory(this.state.sku);
    }

    addProductToCart() {
        let isSixDay = this.state.days == 6;
        let discountCode = this.state.discountCode;
        let product = {
            id: this.props.productDetail._id,
            isSevenDay: isSixDay,
            occassionDate: this.state.occasionDate.unix() * 1000,
            productId: this.props.productDetail._id,
            type: this.props.productDetail.looknumber ? 'product' : 'accessory'
        };
        this.props.addItemToCart(product, discountCode);
    }

    removeProductFromCart(id) {
        let discountCode = this.state.discountCode;
        this.props.removeItemFromCart(id, discountCode);
    }

    applyDiscountCode() {
        this.props.applyDiscount(this.state.discountCode);
    }

    placeOrder() {
        let cartLine = Object.keys(this.props.rentalPricing.pricing.linePricing).map((item) => {
            let cartObj = this.props.rentalPricing.pricing.linePricing[item];
            let cartItem = {
                id: cartObj.lineId,
                isSevenDay: cartObj.sixDay,
                occassionDate: cartObj.occasionDate,
                productId: cartObj.productId,
                type: cartObj.type
            }
            return cartItem;
        });
        let orderObject = {
            shippingInformation: this.props.selectedAddress,
            measurementsMatched: true,
            cartLine: cartLine,
            discountCoupon: this.state.discountCode,
            isFrontend: false,
            paymentType: this.state.paymentMethod,
            userId: this.props.customerDetail.email
        }
        this.props.placeOrder(orderObject);
    }

    isPastdate(date) {
        return date.isAfter(moment().subtract(1, 'd'));
    }

    renderDeliveryDates() {
        if (this.props.deliveryDates) {
            return <div>
                <p>Delivery Date:
                       {' ' + moment(this.props.deliveryDates.deliveryDate).format('ll')}
                </p>
                <p>Pickup Date:
                       {' ' + moment(this.props.deliveryDates.pickupDate).format('ll')}
                </p>
            </div>;
        }
    }

    renderProductPreview() {
        if (this.props.productDetail) {
            let gender = this.props.productDetail.gender == 'male' ? 'men' : 'women';
            return <div>
                <img src={this.props.productDetail.looknumber ? this.props.productDetail.frontimage : this.props.productDetail.image} style={{ width: '200px' }} />
                <p>
                    Designer:
                       {' ' + this.props.productDetail.designer}
                </p>
                <p>
                    Name:
                       {' ' + this.props.productDetail.name}
                </p>
                {this.props.productDetail.looknumber ? <p>
                    Discounted Rental Price:
                                                               {' ' + this.state.days == 3 ? Math.round(this.props.productDetail.discountedrentalprice * 3) : Math.round(this.props.productDetail.discountedrentalprice * 4.2)}
                </p> : null}
                <p>
                    Rental Price:
                       {' ' + this.state.days == 3 ? Math.round(this.props.productDetail.rentalprice * 3) : Math.round(this.props.productDetail.rentalprice * 4.2)}
                </p>
                <p>
                    Deposit Price:
                       {' ' + this.state.days == 3 ? Math.round(this.props.productDetail.depositprice * 3) : Math.round(this.props.productDetail.depositprice * 4.2)}
                </p>
                {this.props.productDetail.looknumber ? <a target="blank" href={clientConfig.targetURL + '/' + gender + '/' + this.props.productDetail.url + '/p/' + this.props.productDetail.looknumber}>View Complete Product</a> : null}
                <div>
                    <br />
                    <p>Rental Period:</p>
                    <input type="radio" name="days" defaultChecked={true} onChange={this.selectDays.bind(this, 3)} />
                    <label>3 Days</label>
                    <input type="radio" name="days" onChange={this.selectDays.bind(this, 6)} />
                    <label>6 Days</label>
                </div>
                <br />
                <DatePicker onMonthChange={this.onMonthChange.bind(this)} inline selected={this.state.occasionDate} filterDate={this.isPastdate} excludeDates={this.props.bookableStatus ? this.props.bookableStatus.bookedDates : null} highlightDates={this.props.bookableStatus ? this.props.bookableStatus.productAvailability.expressDates : null}
                    onChange={this.handleChangeOccasionDate.bind(this)} />
                <br />
                {this.renderDeliveryDates()}
                <br />
                <button onClick={this.addProductToCart.bind(this)}>
                    {this.props.productDetail.looknumber ? 'Add Product' : 'Add Accessory'}
                </button>
                <br />
                <br />
            </div>
        }
    }

    renderCart() {
        if (this.props.rentalPricing && Object.keys(this.props.rentalPricing.pricing.linePricing).length > 0) {
            return <div>
                <h3>Order Summary</h3>
                <hr />
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th style={{ width: '100px' }}>SKU</th>
                                <th style={{ width: '100px' }}>Original Price</th>
                                <th style={{ width: '100px' }}>Rent Price</th>
                                <th style={{ width: '100px' }}>Deposit Price</th>
                                <th style={{ width: '100px' }}>Occasion Date</th>
                                <th style={{ width: '100px' }}>Type</th>
                                <th style={{ width: '100px' }}>Days</th>
                                <th style={{ width: '100px' }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(this.props.rentalPricing.pricing.linePricing).map((item, i) => {
                                return <tr key={i}>
                                    <td>
                                        {this.props.rentalPricing.pricing.linePricing[item].sku}
                                    </td>
                                    <td>
                                        {this.props.rentalPricing.pricing.linePricing[item].totalOriginalPrice}
                                    </td>
                                    <td>
                                        {this.props.rentalPricing.pricing.linePricing[item].totalDiscountedPrice}
                                    </td>
                                    <td>
                                        {this.props.rentalPricing.pricing.linePricing[item].totalOriginalDeposit}
                                    </td>
                                    <td>
                                        {moment(this.props.rentalPricing.pricing.linePricing[item].occasionDate).format('ll')}
                                    </td>
                                    <td>
                                        {this.props.rentalPricing.pricing.linePricing[item].type}
                                    </td>
                                    <td>
                                        {this.props.rentalPricing.pricing.linePricing[item].sixDay ? 6 : 3}
                                    </td>
                                    <td>
                                        <button onClick={this.removeProductFromCart.bind(this, item)}>Remove Product</button>
                                    </td>
                                </tr>;
                            }, this)}
                        </tbody>
                    </table>
                </div>
                <br />
                <p>Total Original Price:
                       {' ' + this.props.rentalPricing.pricing.totalOriginalPrice}
                </p>
                <p>Total Rent Price:
                       {' ' + this.props.rentalPricing.pricing.totalDiscountedPrice}
                </p>
                <p>Total Deposit:
                       {' ' + this.props.rentalPricing.pricing.totalOriginalDeposit}
                </p>
                <br />
                <label>Discount Code:</label>
                <input type="text" onChange={this.handleChangeDiscountCode.bind(this)} />
                <button onClick={this.applyDiscountCode.bind(this)}>Apply Discount</button>
                <br />
                <br />
                <select onChange={this.changePaymentMethod.bind(this)}>
                    <option value="">-- Select Payment Method --</option>
                    {clientConfig.paymentMethods.map((method, i) => {
                        return <option key={i} value={method}>
                            {method}
                        </option>;
                    })}
                </select>
                <button onClick={this.placeOrder.bind(this)}>Place Order</button>
            </div>
        }
    }

    renderCustomerDetails() {
        if (this.props.customerDetail) {
            let address = this.props.customerDetail.shippingInfo.find(x => x.shippingId == this.props.selectedAddress);
            return <div>
                <h3>Customer Details</h3>
                <br />
                <p> Name:
                   {' ' + this.props.customerDetail.firstName + ' ' + this.props.customerDetail.lastName}
                </p>
                <p> Email:
                   {' ' + this.props.customerDetail.email}
                </p>
                <p> Phone Number:
                   {' ' + this.props.customerDetail.phoneNumber}
                </p>
                <p> Credit Points:
                   {' ' + this.props.creditPoints}
                </p>
                <br />
                <h4>Selected Address:</h4>
                <p>
                    {address.address + ','}
                </p>
                <p>
                    {address.city + ', ' + address.state + ' - ' + address.pincode}
                </p>
                <br />
            </div>
        }
    }

    render() {
        return <section>
            {this.renderCustomerDetails()}
            <h3>Create New Rent Order</h3>
            <br />
            <h4>Find Product</h4>
            <label>Look Number: </label>
            <input type="text" onChange={this.handleChangeLookNumber.bind(this)} />
            <button onClick={this.findProduct.bind(this)}>Find</button>
            <br />
            <br />
            <h4>Find Accessory</h4>
            <label>SKU: </label>
            <input type="text" onChange={this.handleChangeSKU.bind(this)} />
            <button onClick={this.findAccessory.bind(this)}>Find</button>
            <br />
            <br />
            {this.renderProductPreview()}
            {this.renderCart()}
        </section>
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchProduct,
        addItemToCart,
        placeOrder,
        removeItemFromCart,
        fetchAccessory,
        getBookedDates,
        getDeliveryDates,
        applyDiscount
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        productDetail: state.rentProductDetail,
        customerDetail: state.customerDetail,
        rentalPricing: state.rentalPricing,
        selectedAddress: state.selectedAddress,
        bookableStatus: state.bookableStatus,
        deliveryDates: state.deliveryDates,
        creditPoints: state.creditPoints
    };
}


export default connect(mapStateToProps, matchDispatchToProps)(CreateRentOrder);
