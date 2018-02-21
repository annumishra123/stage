import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchProduct, addItemToCart, placeOrder, removeItemFromCart, getPricingOfShoppingCart } from '../ShopActions';
import clientConfig from '../../../config';

// Import Style
import styles from './shopOrder.css';


class CreateShopOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sku: '',
      paymentMethod: '',
      source: '',
      discountCode: ''
    }
  }

  componentDidMount() {
    if (!this.props.customerDetail) {
      browserHistory.push('/customer');
    }
  }

  handleChangeSKU(e) {
    this.setState({
      sku: e.target.value
    })
  }

  changeOrderSource(e) {
    this.setState({
      source: e.target.value
    });
  }

  changePaymentMethod(e) {
    this.setState({
      paymentMethod: e.target.value
    });
  }

  findProduct() {
    this.props.fetchProduct(this.state.sku);
  }

  addProductToCart() {
    this.props.addItemToCart(this.props.productDetail.id, this.state.discountCode);
  }

  removeProductFromCart(id) {
    this.props.removeItemFromCart(id, this.state.discountCode);
  }

  handleDiscountCodeChange(e) {
    this.setState({
      discountCode: e.target.value
    });
  }

  applyDiscount() {
    let cart = this.props.shopPricing ? Object.keys(this.props.shopPricing.linePricing) : [];
    this.props.getPricingOfShoppingCart(cart, this.state.discountCode);
  }

  placeOrder() {
    if (this.state.source && this.state.paymentMethod) {
      let orderObject = {
        billingAddressId: this.props.selectedAddress,
        cartLines: Object.keys(this.props.shopPricing.linePricing),
        discountCoupon: this.state.discountCode,
        isFrontend: false,
        paymentMethod: this.state.paymentMethod,
        shippingAddressId: this.props.selectedAddress,
        userId: this.props.customerDetail.email,
        source: this.state.source
      }
      this.props.placeOrder(orderObject);
    } else {
      alert('Please Select Payment Method & Order Source');
    }
  }

  renderProductPreview() {
    if (this.props.productDetail) {
      return <div className={ styles.orderShopView }>
               <img src={ this.props.productDetail.frontimage } style={ { width: '200px' } } />
               <div className={ styles.width70 }>
                 <p>
                   Designer:
                   { ' ' + this.props.productDetail.designer }
                 </p>
                 <p>
                   Name:
                   { ' ' + this.props.productDetail.name }
                 </p>
                 <p>
                   Sale Price:
                   { ' ' + this.props.productDetail.saleprice }
                 </p>
                 <p>
                   Original Price:
                   { ' ' + this.props.productDetail.originalretailprice }
                 </p>
               </div>
               <a className={ styles.link } target="blank" href={ clientConfig.targetURL + '/shop/product/' + this.props.productDetail.id }>View Complete Product</a>
               <br />
               <br />
               <button onClick={ this.addProductToCart.bind(this) }>Add Product</button>
               <br />
               <br />
             </div>
    }
  }

  renderCart() {
    if (this.props.shopPricing && Object.keys(this.props.shopPricing.linePricing).length > 0) {
      return <div>
               <h3>Order Summary</h3>
               <hr />
               <div>
                 <table>
                   <thead>
                     <tr>
                       <th style={ { width: '100px' } }>SKU</th>
                       <th style={ { width: '100px' } }>Original Price</th>
                       <th style={ { width: '100px' } }>Sale Price</th>
                       <th style={ { width: '100px' } }></th>
                     </tr>
                   </thead>
                   <tbody>
                     { Object.keys(this.props.shopPricing.linePricing).map((item, i) => {
                         return <tr key={ i }>
                                  <td>
                                    { this.props.shopPricing.linePricing[item].productId }
                                  </td>
                                  <td>
                                    { this.props.shopPricing.linePricing[item].totalOriginalPrice }
                                  </td>
                                  <td>
                                    { this.props.shopPricing.linePricing[item].totalDiscountedPrice }
                                  </td>
                                  <td>
                                    <button onClick={ this.removeProductFromCart.bind(this, item) }>Remove Product</button>
                                  </td>
                                </tr>;
                       }, this) }
                   </tbody>
                 </table>
               </div>
               <div>
                 <input type="text" onChange={ this.handleDiscountCodeChange.bind(this) } placeholder="Enter Code" />
                 <button onClick={ this.applyDiscount.bind(this) }>Apply Discount</button>
                 { this.props.shopPricing.discountApplied ? <p style={ { color: 'green' } }>Discount Applied</p> : null }
               </div>
               <br />
               <p>Total Original Price:
                 { ' ' + this.props.shopPricing.totalOriginalPrice }
               </p>
               <p>Total Sale Price:
                 { ' ' + this.props.shopPricing.totalDiscountedPrice }
               </p>
               <br />
               <select onChange={ this.changePaymentMethod.bind(this) }>
                 <option value="">-- Select Payment Method --</option>
                 { clientConfig.paymentMethods.map((method, i) => {
                     return <option key={ i } value={ method }>
                              { method }
                            </option>;
                   }) }
               </select>
               <select onChange={ this.changeOrderSource.bind(this) }>
                 <option value="">-- Select Order Source --</option>
                 { clientConfig.orderSource.map((source, i) => {
                     return <option key={ i } value={ source }>
                              { source }
                            </option>;
                   }) }
               </select>
               <button onClick={ this.placeOrder.bind(this) }>Place Order</button>
             </div>
    }
  }

  renderCustomerDetails() {
    if (this.props.customerDetail && this.props.selectedAddress) {
      let address = this.props.customerDetail.shippingInfo.find(x => x.shippingId == this.props.selectedAddress);
      return <div>
               <h3>Customer Details</h3>
               <br />
               <p> Name:
                 { ' ' + this.props.customerDetail.firstName + ' ' + this.props.customerDetail.lastName }
               </p>
               <p> Email:
                 { ' ' + this.props.customerDetail.email }
               </p>
               <p> Phone Number:
                 { ' ' + this.props.customerDetail.phoneNumber }
               </p>
               <br />
               <h4>Selected Address:</h4>
               <p>
                 { address.address + ',' }
               </p>
               <p>
                 { address.city + ', ' + address.state + ' - ' + address.pincode }
               </p>
               <br />
             </div>
    }
  }

  render() {
    return <section className={ styles.shopOrders }>
             { this.renderCustomerDetails() }
             <h3>Create New Shop Order</h3>
             <br />
             <label>SKU: </label>
             <input type="text" onChange={ this.handleChangeSKU.bind(this) } />
             <button onClick={ this.findProduct.bind(this) }>Find</button>
             <br />
             <br />
             { this.renderProductPreview() }
             { this.renderCart() }
           </section>
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchProduct,
    addItemToCart,
    placeOrder,
    removeItemFromCart,
    getPricingOfShoppingCart
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    productDetail: state.productDetail,
    customerDetail: state.customerDetail,
    shopPricing: state.shopPricing,
    selectedAddress: state.selectedAddress
  };
}


export default connect(mapStateToProps, matchDispatchToProps)(CreateShopOrder);
