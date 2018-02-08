/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import app from './modules/App/AppReducer';
import intl from './modules/Intl/IntlReducer';
import { orders, orderDetail, productDetail, shopPricing } from './modules/Shop/ShopReducer';
import { rentOrders, rentOrderDetail, rentProductDetail, rentalPricing, bookableStatus, deliveryDates, measurementStatus } from './modules/Rent/RentReducer';
import auth from './modules/Auth/AuthReducer';
import { customerDetail, selectedAddress, creditPoints, customerComments } from './modules/Customer/CustomerReducer';
import { deliveryOrders } from './modules/Delivery/DeliveryReducer';
import { accessoryCatalog, rentCatalog, shopCatalog } from './modules/Inventory/InventoryReducer';
import { instagramFeeds } from './modules/CMS/CMSReducer';
import { designerInventory, cancelledDesignerOrders, completedDesignerOrders, pendingDesignerOrders, designerShare } from './modules/Designer/DesignerReducer';
import { revshares } from './modules/Designer/DesignerReducer';
import { revShareOrderLine } from './modules/ManualOrder/ManualOrderReducer';
import { reducer as formReducer } from 'redux-form';

// Combine all reducers into one root reducer
export default combineReducers({
  app,
  auth,
  intl,
  orders,
  rentOrders,
  deliveryOrders,
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
  creditPoints,
  measurementStatus,
  accessoryCatalog,
  rentCatalog,
  shopCatalog,
  designerInventory,
  customerComments,
  completedDesignerOrders,
  cancelledDesignerOrders,
  pendingDesignerOrders,
  customerComments,
  revshares,
  designerShare,
  instagramFeeds,
  revShareOrderLine
});
