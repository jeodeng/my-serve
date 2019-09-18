import mongoose from 'mongoose';
import config from '../../config';

mongoose.set('useCreateIndex', true);

const connects =
  config.mongodb.reduce((connects, { alias }) => {
    connects[ alias ] = {
      model() {}
    };
    return connects;
  }, {});

export default {
  // 创建db的model实例
  async connect({ alias = 'default', uri, user, password, replset, poolSize }) {
    connects[ alias ] = await mongoose.createConnection(uri, {
      user: user,
      pass: password,
      poolSize: poolSize,
      replset: replset,
      useNewUrlParser: true
    });
  },
  async disconnect() {
    mongoose.disconnect();
  },
  getConnect({ alias = 'default' } = {}) {
    return connects[ alias ];
  }
};
