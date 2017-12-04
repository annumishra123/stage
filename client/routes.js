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
  // require('./modules/Post/pages/PostListPage/PostListPage');
}
if (process.env.NODE_ENV !== 'production') {
  // Require async routes only in development for react-hot-reloader to work.
  require('./modules/Dashboard/components/Login');
  require('./modules/Dashboard/components/Navigation');
  require('./modules/Shop/components/ShopOrders');
  require('./modules/Shop/components/CreateShopOrder');
  require('./modules/Customer/components/Customer');
  require('./modules/Rent/components/RentOrders');
  require('./modules/Rent/components/CreateRentOrder');
  require('./modules/Delivery/components/DeliveryOrders');
  require('./modules/Inventory/components/Inventory');
  require('./modules/Dashboard/components/Users');
  require('./modules/Designer/components/Orders');
  require('./modules/Designer/components/Inventory');
  require('./modules/Designer/components/Invoice');
}
// react-router setup with code-splitting
// More info: http://blog.mxstbr.com/2016/01/react-apps-with-pages/
export default function getRoutes(store, req) {
  let token = null;

  if (req && req.session) {
    token = req.session.token ? req.session.token : null;
  // console.log(token);
  }

  const checkSuperUser = (nextState, replace, cb) => {
    function checkAuth() {
      const {auth: {isAuthenticated, role}} = store.getState();
      if (role !== 'superuser' || (!isAuthenticated)) {
        replace('/');
      }
      cb();
    }
    if (typeof window !== 'undefined') {
      const {auth: {loaded}} = store.getState();
      if (!loaded) {
        store.dispatch(Actions.checkToken(token)).then(checkAuth);
      } else {
        checkAuth();
      }
    } else {
      cb();
    }
  };

  const checkUser = (nextState, replace, cb) => {
    function checkAuth() {
      const {auth: {isAuthenticated, role}} = store.getState();
      if ((!isAuthenticated) || role == 'designer') {
        replace('/');
      }
      cb();
    }
    if (typeof window !== 'undefined') {
      const {auth: {loaded}} = store.getState();
      if (!loaded) {
        store.dispatch(Actions.checkToken(token)).then(checkAuth);
      } else {
        checkAuth();
      }
    } else {
      cb();
    }
  };

  const checkAuth = (nextState, replace, cb) => {
    function checkAuth() {
      const {auth: {isAuthenticated, role}} = store.getState();
      if (!isAuthenticated) {
        replace('/');
      }
      cb();
    }
    if (typeof window !== 'undefined') {
      const {auth: {loaded}} = store.getState();
      if (!loaded) {
        store.dispatch(Actions.checkToken(token)).then(checkAuth);
      } else {
        checkAuth();
      }
    } else {
      cb();
    }
  };

  const checkDesigner = (nextState, replace, cb) => {
    function checkAuth() {
      const {auth: {isAuthenticated, role}} = store.getState();
      if ((!isAuthenticated) || role !== 'designer') {
        replace('/');
      }
      cb();
    }
    if (typeof window !== 'undefined') {
      const {auth: {loaded}} = store.getState();
      if (!loaded) {
        store.dispatch(Actions.checkToken(token)).then(checkAuth);
      } else {
        checkAuth();
      }
    } else {
      cb();
    }
  };

  return (
    <Route path="/" component={ App }>
      <IndexRoute getComponent={ (nextState, cb) => {
                                   require.ensure([], require => {
                                     cb(null, require('./modules/Dashboard/components/Login').default);
                                   });
                                 } } />
      <Route path="/users" onEnter={ checkSuperUser } getComponent={ (nextState, cb) => {
                                                                       require.ensure([], require => {
                                                                         cb(null, require('./modules/Dashboard/components/Users').default);
                                                                       });
                                                                     } } />
      <Route path="/menu" onEnter={ checkAuth } getComponent={ (nextState, cb) => {
                                                                 require.ensure([], require => {
                                                                   cb(null, require('./modules/Dashboard/components/Navigation').default);
                                                                 });
                                                               } } />
      <Route path="/shop" onEnter={ checkUser } getComponent={ (nextState, cb) => {
                                                                 require.ensure([], require => {
                                                                   cb(null, require('./modules/Shop/components/ShopOrders').default);
                                                                 });
                                                               } } />
      <Route path="/shop/create" onEnter={ checkUser } getComponent={ (nextState, cb) => {
                                                                        require.ensure([], require => {
                                                                          cb(null, require('./modules/Shop/components/CreateShopOrder').default);
                                                                        });
                                                                      } } />
      <Route path="/customer" onEnter={ checkUser } getComponent={ (nextState, cb) => {
                                                                     require.ensure([], require => {
                                                                       cb(null, require('./modules/Customer/components/Customer').default);
                                                                     });
                                                                   } } />
      <Route path="/rent" onEnter={ checkUser } getComponent={ (nextState, cb) => {
                                                                 require.ensure([], require => {
                                                                   cb(null, require('./modules/Rent/components/RentOrders').default);
                                                                 });
                                                               } } />
      <Route path="/rent/create" onEnter={ checkUser } getComponent={ (nextState, cb) => {
                                                                        require.ensure([], require => {
                                                                          cb(null, require('./modules/Rent/components/CreateRentOrder').default);
                                                                        });
                                                                      } } />
      <Route path="/delivery" onEnter={ checkUser } getComponent={ (nextState, cb) => {
                                                                     require.ensure([], require => {
                                                                       cb(null, require('./modules/Delivery/components/DeliveryOrders').default);
                                                                     });
                                                                   } } />
      <Route path="/inventory" onEnter={ checkUser } getComponent={ (nextState, cb) => {
                                                                      require.ensure([], require => {
                                                                        cb(null, require('./modules/Inventory/components/Inventory').default);
                                                                      });
                                                                    } } />
      <Route path="/designer/inventory" onEnter={ checkDesigner } getComponent={ (nextState, cb) => {
                                                                                   require.ensure([], require => {
                                                                                     cb(null, require('./modules/Designer/components/Inventory').default);
                                                                                   });
                                                                                 } } />
      <Route path="/designer/orders" onEnter={ checkDesigner } getComponent={ (nextState, cb) => {
                                                                                require.ensure([], require => {
                                                                                  cb(null, require('./modules/Designer/components/Orders').default);
                                                                                });
                                                                              } } />
      <Route path="/designer/invoice" onEnter={ checkDesigner } getComponent={ (nextState, cb) => {
                                                                                 require.ensure([], require => {
                                                                                   cb(null, require('./modules/Designer/components/Invoice').default);
                                                                                 });
                                                                               } } />
    </Route>
    );
}
