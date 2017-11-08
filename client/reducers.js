/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import app from './modules/App/AppReducer';
import intl from './modules/Intl/IntlReducer';
import { orders, orderDetail, productDetail, shopPricing } from './modules/Shop/ShopReducer';
import { rentOrders, rentOrderDetail, rentProductDetail, rentalPricing, bookableStatus, deliveryDates } from './modules/Rent/RentReducer';
import auth from './modules/Auth/AuthReducer';
import { customerDetail, selectedAddress,creditPoints } from './modules/Customer/CustomerReducer';
import { reducer as formReducer } from 'redux-form';

// Combine all reducers into one root reducer
export default combineReducers({
  app,
  auth,
  intl,
  orders,
  rentOrders,
  orderDetail,
  rentOrderDetail,
  form: formReducer,
  customerDetail,
  productDetail,
  rentProductDetail,
  shopPricing,
  rentalPricing,
  bookableStatus,
  selectedAddress,
  deliveryDates,
  creditPoints
});
