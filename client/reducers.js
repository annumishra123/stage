/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import app from './modules/App/AppReducer';
import intl from './modules/Intl/IntlReducer';
import { orders, orderDetail, productDetail, shopPricing } from './modules/Shop/ShopReducer';
import { rentOrders, rentOrderDetail, rentProductDetail, rentalPricing, bookableStatus, deliveryDates, measurementStatus, allCoupons, refundLogs, customerRefundLogs } from './modules/Rent/RentReducer';
import { authReducer as auth, allUsers } from './modules/Auth/AuthReducer';
import { customerDetail, selectedAddress, creditPoints, customerComments } from './modules/Customer/CustomerReducer';
import { rentDeliveryOrders, shopDeliveryOrders } from './modules/Delivery/DeliveryReducer';
import { instagramFeeds, allStores } from './modules/CMS/CMSReducer';
import { accessoryCatalog, rentCatalog, shopCatalog, rentProduct, shopProduct, updateProduct, updateRentProduct, accessory, updateAccessory, shopStock, uploadLogs, lastQCStatus } from './modules/Inventory/InventoryReducer';
import { designerInventory, cancelledDesignerOrders, completedDesignerOrders, pendingDesignerOrders, designerShare } from './modules/Designer/DesignerReducer';
import { revshares } from './modules/Designer/DesignerReducer';
import { revShareOrderLine } from './modules/ManualOrder/ManualOrderReducer';
import { reducer as formReducer } from 'redux-form';
import { tasks, contexts, dispositions, taskDetail } from './modules/CRM/CRMReducer';
import { waybills } from './modules/Shipping/ShippingReducer';
import { allRawMaterials, allOutfits } from './modules/AlayaInventoryManager/AlayaInventoryReducer';
import { scannedLook, scanLogs, locationLogs } from './modules/Scan/ScanReducer';
import { getToBePickedOrderlines, getOutForDeliveryOrderlines, getOrderlinesForNCRDelivery, getOrderLinesForNCRPickup, getOrderlinesForOutstationDelivery, getOrderLinesForOutstationPickup, getAllRunners, getOrderLinesToBeDispatched, getOrderLinesToBeReceived } from './modules/OrderProcess/OrderProcessReducer';

// Combine all reducers into one root reducer
export default combineReducers({
  app,
  auth,
  intl,
  orders,
  rentOrders,
  rentDeliveryOrders,
  shopDeliveryOrders,
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
  rentProduct,
  shopProduct,
  accessory,
  updateRentProduct,
  updateProduct,
  updateAccessory,
  revShareOrderLine,
  shopStock,
  allCoupons,
  tasks,
  contexts,
  dispositions,
  taskDetail,
  uploadLogs,
  waybills,
  lastQCStatus,
  allStores,
  allUsers,
  allRawMaterials,
  allOutfits,
  refundLogs,
  customerRefundLogs,
  scannedLook,
  scanLogs,
  locationLogs,
  getOrderlinesForNCRDelivery,
  getOrderLinesForOutstationPickup,
  getOrderlinesForOutstationDelivery,
  getOrderLinesForNCRPickup,
  getAllRunners,
  getOrderLinesToBeDispatched,
  getOrderLinesToBeReceived,
  getOutForDeliveryOrderlines,
  getToBePickedOrderlines
});
