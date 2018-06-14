/* eslint-disable global-require */
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './modules/App/App';
import * as Actions from './modules/Auth/AuthActions';

// require.ensure polyfill for node
if (typeof require.ensure !== 'function') {
  require.ensure = function requireModule(deps, callback) {
    callback(require);
  };
}

/* Workaround for async react routes to work with react-hot-reloader till
  https://github.com/reactjs/react-router/issues/2182 and
  https://github.com/gaearon/react-hot-loader/issues/288 is fixed.
 */
if (process.env.NODE_ENV !== 'production') {
  // Require async routes only in development for react-hot-reloader to work.
  require('./modules/Dashboard/components/Login');
  require('./modules/Dashboard/components/Navigation');
  require('./modules/Shop/components/ShopOrders');
  require('./modules/Shop/components/CreateShopOrder');
  require('./modules/Customer/components/Customer');
  require('./modules/Rent/components/RentOrders');
  require('./modules/Rent/components/CreateRentOrder');
  require('./modules/Delivery/components/RentDeliveryOrders');
  require('./modules/Delivery/components/ShopDeliveryOrders');
  require('./modules/Inventory/components/Inventory');
  require('./modules/Inventory/components/ShopProduct');
  require('./modules/Inventory/components/RentProduct');
  require('./modules/Inventory/components/Accessory');
  require('./modules/Dashboard/components/Users');
  require('./modules/Designer/components/Orders');
  require('./modules/Designer/components/Inventory');
  require('./modules/Designer/components/Invoice');
  require('./modules/Designer/components/Owner');
  require('./modules/Auth/components/ChangePassword');
  require('./modules/CMS/components/Instagram');
  require('./modules/ManualOrder/components/ManualOrder');
  require('./modules/Inventory/components/ShopStockManager');
  require('./modules/Rent/components/Coupons');
  require('./modules/CRM/components/Tasks');
  require('./modules/CRM/components/Metadata');
  require('./modules/CRM/components/Inbound');
  require('./modules/CRM/components/TaskDetail');
  require('./modules/Auth/components/CreateUser');
}

// react-router setup with code-splitting
// More info: http://blog.mxstbr.com/2016/01/react-apps-with-pages/
export default function getRoutes(store, req) {

  const checkSuperUser = (nextState, replace, cb) => {
    function checkAuth() {
      const { auth: { role } } = store.getState();
      if (role !== 'superuser') {
        replace('/');
      }
      cb();
    }
    if (typeof window !== 'undefined') {
      const { auth: { role } } = store.getState();
      if (!role && localStorage.getItem('token')) {
        store.dispatch(Actions.checkToken(localStorage.getItem('token'))).then(checkAuth);
      } else {
        checkAuth();
      }
    } else {
      cb();
    }
  };

  const checkAdmin = (nextState, replace, cb) => {
    function checkAuth() {
      const { auth: { role } } = store.getState();
      if (role !== 'admin' && role !== 'superuser') {
        replace('/');
      }
      cb();
    }
    if (typeof window !== 'undefined') {
      const { auth: { role } } = store.getState();
      if (!role && localStorage.getItem('token')) {
        store.dispatch(Actions.checkToken(localStorage.getItem('token'))).then(checkAuth);
      } else {
        checkAuth();
      }
    } else {
      cb();
    }
  };

  const checkEmployee = (nextState, replace, cb) => {
    function checkAuth() {
      const { auth: { role } } = store.getState();
      if (role !== 'admin' && role !== 'viewer' && role !== 'superuser' && role !== 'delivery') {
        replace('/');
      }
      cb();
    }
    if (typeof window !== 'undefined') {
      const { auth: { role } } = store.getState();
      if (!role && localStorage.getItem('token')) {
        store.dispatch(Actions.checkToken(localStorage.getItem('token'))).then(checkAuth);
      } else {
        checkAuth();
      }
    } else {
      cb();
    }
  };

  const checkAuth = (nextState, replace, cb) => {
    function checkAuth() {
      const { auth: { role } } = store.getState();
      if (role !== 'admin' && role !== 'viewer' && role !== 'superuser' && role !== 'delivery' && role !== 'designer') {
        replace('/');
      }
      cb();
    }
    if (typeof window !== 'undefined') {
      const { auth: { role } } = store.getState();
      if (!role && localStorage.getItem('token')) {
        store.dispatch(Actions.checkToken(localStorage.getItem('token'))).then(checkAuth);
      } else {
        checkAuth();
      }
    } else {
      cb();
    }
  };

  const checkDesigner = (nextState, replace, cb) => {
    function checkAuth() {
      const { auth: { role } } = store.getState();
      if (role !== 'designer') {
        replace('/');
      }
      cb();
    }
    if (typeof window !== 'undefined') {
      const { auth: { role } } = store.getState();
      if (!role && localStorage.getItem('token')) {
        store.dispatch(Actions.checkToken(localStorage.getItem('token'))).then(checkAuth);
      } else {
        checkAuth();
      }
    } else {
      cb();
    }
  };

  return (
    <Route path="/" component={App}>
      <IndexRoute getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Dashboard/components/Login').default);
        });
      }} />
      <Route path="/users" onEnter={checkSuperUser} getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Dashboard/components/Users').default);
        });
      }} />
      <Route path="/menu" onEnter={checkAuth} getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Dashboard/components/Navigation').default);
        });
      }} />
      <Route path="/shop" onEnter={checkEmployee} getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Shop/components/ShopOrders').default);
        });
      }} />
      <Route path="/shop/create" onEnter={checkEmployee} getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Shop/components/CreateShopOrder').default);
        });
      }} />
      <Route path="/customer" onEnter={checkEmployee} getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Customer/components/Customer').default);
        });
      }} />
      <Route path="/rent" onEnter={checkEmployee} getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Rent/components/RentOrders').default);
        });
      }} />
      <Route path="/rent/create" onEnter={checkEmployee} getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Rent/components/CreateRentOrder').default);
        });
      }} />
      <Route path="/rent/coupons" onEnter={checkAdmin} getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Rent/components/Coupons').default);
        });
      }} />
      <Route path="/delivery/rent" onEnter={checkEmployee} getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Delivery/components/RentDeliveryOrders').default);
        });
      }} />
      <Route path="/delivery/shop" onEnter={checkEmployee} getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Delivery/components/ShopDeliveryOrders').default);
        });
      }} />
      <Route path="/inventory" onEnter={checkEmployee} getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Inventory/components/Inventory').default);
        });
      }} />
      <Route path="/designer/inventory" onEnter={checkDesigner} getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Designer/components/Inventory').default);
        });
      }} />
      <Route path="/designer/orders" onEnter={checkDesigner} getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Designer/components/Orders').default);
        });
      }} />
      <Route path="/designer/invoice" onEnter={checkDesigner} getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Designer/components/Invoice').default);
        });
      }} />
      <Route path="/owners" onEnter={checkAdmin} getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Designer/components/Owner').default);
        });
      }} />
      <Route path="/cms/instagram" onEnter={checkAdmin} getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/CMS/components/Instagram').default);
        });
      }} />
      <Route path="/login/update" onEnter={checkDesigner} getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Auth/components/ChangePassword').default);
        });
      }} />
      <Route path="/inventory/shop/stock" onEnter={checkAdmin} getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Inventory/components/ShopStockManager').default);
        });
      }} />
      <Route path="/inventory/shop/:id" onEnter={checkEmployee} getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Inventory/components/ShopProduct').default);
        });
      }} />
      <Route path="/inventory/rent/:id" onEnter={checkEmployee} getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Inventory/components/RentProduct').default);
        });
      }} />
      <Route path="/inventory/accessory/:id" onEnter={checkEmployee} getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Inventory/components/Accessory').default);
        });
      }} />
      <Route path="/order/manual/:owner" onEnter={checkAdmin} getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/ManualOrder/components/ManualOrder').default);
        });
      }} />
      <Route path="/order/manual/:owner/:id" onEnter={checkAdmin} getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/ManualOrder/components/ManualOrder').default);
        });
      }} />
      <Route path="/crm/tasks/:context/:sort/:page/:size" onEnter={checkAdmin} getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/CRM/components/Tasks').default);
        });
      }} />
      <Route path="/crm/tasks/:id" onEnter={checkAdmin} getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/CRM/components/TaskDetail').default);
        });
      }} />
      <Route path="/crm/inbound" onEnter={checkAdmin} getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/CRM/components/Inbound').default);
        });
      }} />
      <Route path="/crm/metadata" onEnter={checkSuperUser} getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/CRM/components/Metadata').default);
        });
      }} />
      <Route path="/create" onEnter={checkSuperUser} getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Auth/components/CreateUser').default);
        });
      }} />
    </Route>
  );
}
