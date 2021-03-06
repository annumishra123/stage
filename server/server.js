import Express from 'express';
import compression from 'compression';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import IntlWrapper from '../client/modules/Intl/IntlWrapper';
import User from './models/user';
import Material from './models/rawMaterial';
import Outfit from './models/outfit';
import Scan from './models/scan';
import cuid from 'cuid';

// Webpack Requirements
import webpack from 'webpack';
import config from '../webpack.config.dev';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import proxy from 'http-proxy-middleware';

// Initialize the Express App
const app = new Express();

// Run Webpack dev server in development mode
if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
  }));
  app.use(webpackHotMiddleware(compiler));
}

// React And Redux Setup
import { configureStore } from '../client/store';
import { Provider } from 'react-redux';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import Helmet from 'react-helmet';

// Import required modules
import getRoutes from '../client/routes';
import { fetchComponentData } from './util/fetchData';
import { fetchIsAuthenticated } from './util/fetchAuth';
import auth from './routes/auth.routes';
import download from './routes/download.routes';
import managematerial from './routes/managematerial.routes';
import refundLog from './routes/refund.routes';
import scanLog from './routes/scan.routes';
import dummyData from './dummyData';
import serverConfig from './config';
import passport from './passport';

// Set native promises as mongoose promise
mongoose.Promise = global.Promise;

// MongoDB Connection
mongoose.connect(serverConfig.mongoURL, (error) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  }

  // feed some dummy data in DB.
  dummyData();
});

app.use('/api', passport.authenticate('jwt', {
  session: false,
}), (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(401).send("UNAUTHORISED");
  }
});

// Proxy Server Config
var options = {
  target: serverConfig.targetURL,
  changeOrigin: true,
  secure: false,
  logLevel: 'debug',
  onProxyReq: (proxyReq, req) => {
    // Convert session authentication into API authentication
    proxyReq.setHeader("Authorization", serverConfig.access_token);
  }
};

app.use(proxy('/api', options));

// Apply body Parser and server public assets and routes
app.use(compression());
app.use(bodyParser.json({
  limit: '20mb',
}));
app.use(bodyParser.urlencoded({
  limit: '20mb',
  extended: false,
}));
app.use(Express.static(path.resolve(__dirname, '../dist')));
app.use('/auth', auth);
app.use('/download', download);
app.use('/managematerial', managematerial);
app.use('/refund', refundLog);
app.use('/scan', scanLog);

// Render Initial HTML
const renderFullPage = (html, initialState) => {
  const head = Helmet.rewind();

  // Import Manifests
  const assetsManifest = process.env.webpackAssets && JSON.parse(process.env.webpackAssets);
  const chunkManifest = process.env.webpackChunkAssets && JSON.parse(process.env.webpackChunkAssets);

  return `
    <!doctype html>
    <html>
      <head>
        ${head.base.toString()}
        ${head.title.toString()}
        ${head.meta.toString()}
        ${head.link.toString()}
        ${head.script.toString()}

        ${process.env.NODE_ENV === 'production' ? `<link rel='stylesheet' href='${assetsManifest['/app.css']}' />` : ''}
        <link href="https://fonts.googleapis.com/css?family=Lato:300,400,400i,700,700i,900,900i" rel="stylesheet">
        <link rel="shortcut icon" href="https://res.cloudinary.com/stage3/image/upload/v1513254878/favicon.jpg" type="image/png" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" integrity="sha256-NuCn4IvuZXdBaFKJOAcsU2Q3ZpwbdFisd5dux4jkQ5w=" crossorigin="anonymous" />
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
          ${process.env.NODE_ENV === 'production' ?
      `//<![CDATA[
          window.webpackManifest = ${JSON.stringify(chunkManifest)};
          //]]>` : ''}
        </script>
        <script src='${process.env.NODE_ENV === 'production' ? assetsManifest['/vendor.js'] : '/vendor.js'}'></script>
        <script src='${process.env.NODE_ENV === 'production' ? assetsManifest['/app.js'] : '/app.js'}'></script>
      </body>
    </html>
  `;
};

const renderError = err => {
  const softTab = '&#32;&#32;&#32;&#32;';
  const errTrace = process.env.NODE_ENV !== 'production' ?
    `:<br><br><pre style="color:red">${softTab}${err.stack.replace(/\n/g, `<br>${softTab}`)}</pre>` : '';
  return renderFullPage(`Server Error${errTrace}`, {});
};

// Server Side Rendering based on routes matched by React-router.
app.use((req, res, next) => {
  const initialState = {
    auth: {
      isAuthenticated: false,
      isFetching: false,
    },
  };
  const store = configureStore(initialState);
  const routes = getRoutes(store, req);

  match({
    routes,
    location: req.url,
  }, (err, redirectLocation, renderProps) => {
    if (err) {
      return res.status(500).end(renderError(err));
    }

    if (redirectLocation) {
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }

    if (!renderProps) {
      return next();
    }

    return fetchIsAuthenticated(store.dispatch, req, passport)
      .then(() => fetchComponentData(store.dispatch, renderProps.components, renderProps.params))
      .then(() => {
        const initialView = renderToString(
          <Provider store={store}>
            <IntlWrapper>
              <RouterContext {...renderProps} />
            </IntlWrapper>
          </Provider>
        );
        const finalState = store.getState();

        res
          .set('Content-Type', 'text/html')
          .status(200)
          .end(renderFullPage(initialView, finalState));
      })
      .catch((error) => next(error));
  });
});

// start app
app.listen(serverConfig.port, (error) => {
  if (!error) {
    console.log(`MERN is running on port: ${serverConfig.port}! Build something amazing!`); // eslint-disable-line
  }
});

export default app;
