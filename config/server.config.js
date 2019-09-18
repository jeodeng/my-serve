const { isBrowser, deepClone } = require('./utils');

const env = process.env.NODE_ENV || 'production';
const test = process.env.TEST_ENV || '';

// load extra configs
const extraConfig = process.env.EXT_CFG && process.env.EXT_CFG != 'undefined' ?
  require(`${process.env.EXT_CFG}/server.config.js`) : {};

module.exports = {
  port: 3070,
  mirage: {
    enable: false,
    limit: 3,
  },
  upload: {
    maxFileSize: 10 * 1024 * 1024,
  },
  ... deepClone(
    {
      dev: {
        mongodb: [
          {
            alias: 'default',
            uri: 'mongodb://120.76.117.8:27017/db_test',
            user: 'db_test',
            password: 'abcd@1234',
            poolSize: 2,
          },
        ],
        logger: {
          level: 'debug',
          maxsize: 100 * 1024 * 1024,
        },
      },
      // production
      production: {
        logger: {
          level: 'warn',
          maxsize: 100 * 1024 * 1024,
        },
      },
    }[(isBrowser() ? (window.__TEST_ENV || window.__NODE_ENV) : '') || (test || env)],
    extraConfig,
  )
};
