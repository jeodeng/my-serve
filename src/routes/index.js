import Router from 'koa-router';
import Compose from 'koa-compose';
import form from './form';

// 路由容器
const router = new Router();

const iterator = (parent, route) => {
  const path = `${parent}${route.path}`;
  for (const child of route.children || []) {
    iterator(path, child);
  }

  // 保证路由规范
  if (route.method && route.action) {
    // 加入路由中间件
    const middlewares = Array.isArray(route.middlewares) ? route.middlewares : [];

    // 注册
    router[route.method](path, Compose(middlewares), route.action);
  }
};

export default async () => {
  [
    ...form,
  ].forEach((route) => {
    iterator('', route);
  });

  return router;
};
