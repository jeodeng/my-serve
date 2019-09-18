module.exports = {
  nfsUrl: 'http://ri124-3058.geekthing.cn',
  authUrl: 'http://ri125-3068.geekthing.cn',
  publicUrl: 'https://ri124-3080.geekthing.cn',
  mongodb: [
    {
      alias: 'default',
      uri: 'mongodb://172.50.1.210:27017,172.50.1.211:27017,172.50.1.212:27017/ri-business',
      user: 'ri-business',
      password: 'abcd@1234',
      poolSize: 2,
      replset: { rs_name: 'myset'},
      session: {
        secret: 'abcd@1234',
        maxAge: 2 * 60 * 60 * 1000,
      }
    },
    {
      alias: 'ri-auth',
      uri: 'mongodb://172.50.1.210:27017,172.50.1.211:27017,172.50.1.212:27017/ri-oauth',
      user: 'ri-oauth',
      password: 'abcd@1234',
      poolSize: 2,
      replset: { rs_name: 'myset'},
      session: {
        secret: 'abcd@1234',
        maxAge: 2 * 60 * 60 * 1000,
      }
    }
  ],
  redis: [
    {
      alias: 'default',
      password: 'abcd@1234',
      db: 3,
      sentinels: [
        { host: '172.50.1.128', port: 26379 },
        { host: '172.50.1.129', port: 26380 },
        { host: '172.50.1.129', port: 26381 },
      ],
      name: 'mymaster'
    }
  ],
};
