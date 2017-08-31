/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import app from './modules/App/AppReducer';
import intl from './modules/Intl/IntlReducer';
import {orders, orderDetail} from './modules/Shop/ShopReducer';

// Combine all reducers into one root reducer
export default combineReducers({
  app,
  intl,
  orders,
  orderDetail
});
