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

// react-router setup with code-splitting
// More info: http://blog.mxstbr.com/2016/01/react-apps-with-pages/
export default function getRoutes(store, req) {
  let token = null;

  if (req && req.session) {
    token = req.session.token ? req.session.token : null;
  // console.log(token);
  }

  const checkAdmin = (nextState, replace, cb) => {
    function checkAuth() {
      const {auth: {isAuthenticated, role}} = store.getState();
      if ((!isAuthenticated || role !== 'admin' || role !== 'viewer') && !localStorage.getItem('token')) {
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

  const checkDelivery = (nextState, replace, cb) => {
    function checkAuth() {
      const {auth: {isAuthenticated, role}} = store.getState();
      if (!isAuthenticated || role !== 'delivery') {
        replace('/');
      }
      cb();
    }

    const {auth: {loaded}} = store.getState();
    if (!loaded) {
      store.dispatch(Actions.checkToken(token)).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  const checkViewer = (nextState, replace, cb) => {
    function checkAuth() {
      const {auth: {isAuthenticated, role}} = store.getState();
      if (!isAuthenticated || role !== 'viewer') {
        replace('/');
      }
      cb();
    }

    const {auth: {loaded}} = store.getState();
    if (!loaded) {
      store.dispatch(Actions.checkToken(token)).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  return (
    <Route path="/" component={ App }>
      <IndexRoute getComponent={ (nextState, cb) => {
                                   require.ensure([], require => {
                                     cb(null, require('./modules/Dashboard/components/Dashboard').default);
                                   });
                                 } } />
      <Route path="/shop" onEnter={ checkAdmin } getComponent={ (nextState, cb) => {
                                                                  require.ensure([], require => {
                                                                    cb(null, require('./modules/Shop/components/ShopOrders').default);
                                                                  });
                                                                } } />
      <Route path="/shop/create" onEnter={ checkAdmin } getComponent={ (nextState, cb) => {
                                                                         require.ensure([], require => {
                                                                           cb(null, require('./modules/Shop/components/CreateOrder').default);
                                                                         });
                                                                       } } />
      <Route path="/customer" onEnter={ checkAdmin } getComponent={ (nextState, cb) => {
                                                                      require.ensure([], require => {
                                                                        cb(null, require('./modules/Customer/components/Customer').default);
                                                                      });
                                                                    } } />
    </Route>
    );
}
