/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import app from './modules/App/AppReducer';
import intl from './modules/Intl/IntlReducer';
import { orders, orderDetail } from './modules/Shop/ShopReducer';
import auth from './modules/Auth/AuthReducer';
import { reducer as formReducer } from 'redux-form';
// Combine all reducers into one root reducer
export default combineReducers({
  app,
  auth,
  intl,
  orders,
  orderDetail,
  form: formReducer,
});
