export default [
  {
    path: '/form/create',
    method: 'post',
    action: require('../actions/form').default.create,
  },
  {
    path: '/form/update',
    method: 'post',
    action: require('../actions/form').default.update,
  },
  {
    path: '/form/find',
    method: 'post',
    action: require('../actions/form').default.find,
  },
  {
    path: '/form/findOne',
    method: 'post',
    action: require('../actions/form').default.findOne,
  },
  {
    path: '/form/remove',
    method: 'post',
    action: require('../actions/form').default.remove,
  },
  {
    path: '/form/removeById',
    method: 'post',
    action: require('../actions/form').default.removeById,
  }
];
