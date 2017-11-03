/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import app from './modules/App/AppReducer';
import intl from './modules/Intl/IntlReducer';
import { orders, orderDetail, productDetail, shoppingCart, shopPricing } from './modules/Shop/ShopReducer';
import auth from './modules/Auth/AuthReducer';
import { customerDetail, selectedAddress } from './modules/Customer/CustomerReducer';
import { reducer as formReducer } from 'redux-form';

// Combine all reducers into one root reducer
export default combineReducers({
  app,
  auth,
  intl,
  orders,
  orderDetail,
  form: formReducer,
  customerDetail,
  productDetail,
  shoppingCart,
  shopPricing,
  selectedAddress
});
