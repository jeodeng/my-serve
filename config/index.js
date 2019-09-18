const { isBrowser, deepClone } = require('./utils');

const env = process.env.NODE_ENV || 'production';
const test = process.env.TEST_ENV || '';

// use webpack env to sep server and client config
// so server config cannot be seen in client
// do not modify anything here
const targetConfig = require('./server.config.js');

// load extra configs
// const extraConfig = process.env.EXT_CFG && process.env.EXT_CFG != 'undefined' ?
//   require(`${process.env.EXT_CFG}/index.js`) : {};

module.exports = {
  timestamp: +new Date,
  env,
  test,
  baseUrl: process.env.BASE_URL || '',
  assets: /\.(png|jpe?g|gif|svg|pdf|ico|ttf)(\?.*)?$/i,
  browserSync: {
    port: 6001,
    ui_port: 10000,
    reloadDelay: 300,
    notify: false
  },
  ... deepClone(
    {
      local: {},
      dev: {},
      production: {},
    }[(isBrowser() ? (window.__TEST_ENV || window.__NODE_ENV) : '') || (test || env)],
    //extraConfig,
    targetConfig,
  )
};
