(async () => {
  const config = require('../config');
  const { ReqResponse } = require('./models');

  await (require('./startups/mongodb').default)();
  await (require('./startups/form').default)();

  // koa实例
  const Koa = require('koa');
  const KoaBody = require('koa-body');
  const KoaCompress = require('koa-compress');
  const monitor = require('./middlewares/monitor').default;
  const router = await (require('./routes').default)();

  // koa-body配置
  const UPLOAD_CONFIG = {
    multipart: true, // 支持文件上传
    formidable: {
      multipart: false, // 多文件上传
      keepExtensions: true, // 保持文件后缀
      maxFieldsSize: 2 * 1024 * 1024, // 字段大小
      maxFileSize: config.upload.maxFileSize, // 文件大小
    },
    onError: (error, ctx) => {
      ctx.status = 400;
      return;
    },
  };

  const app = new Koa;

  // 报错
  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (error) {
      console.log(error);
      ctx.body = new ReqResponse({ code: -1, desc: error.err_desc || '请求失败' });
      ctx.status = 500;
    }
  });

  // 请求监测
  app.use(monitor);
  // 解析post请求数据/文件
  app.use(KoaBody(UPLOAD_CONFIG));
  app.use(KoaCompress());
  app.use(router.routes(), router.allowedMethods());

  console.log(`server started at: ${(new Date)}`);
  console.log(`current env is: ${config.env}， port ${config.port}`);
  app.listen(config.port);
})();
