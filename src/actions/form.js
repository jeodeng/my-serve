import formService from '../helpers/form';
import { ReqResponse } from '../models';

export default {
  async find(ctx) {
    const { form } = ctx.query;
    const { query = {}, sort, pagination, alias } = ctx.request.body;

    if (!form) {
      ctx.body = new ReqResponse({
        code: -1,
        desc: '集合form参数错误',
      });
      ctx.status = 500;
      return;
    }

    if (!alias) {
      ctx.body = new ReqResponse({
        code: -1,
        desc: '数据库alias参数错误',
      });
      ctx.status = 500;
      return;
    }

    const data = await formService.find({
      form,
      alias,
      query,
      pagination,
      sort,
    });

    ctx.body = new ReqResponse({
      code: 200,
      desc: 'success',
      data,
    });

    return;
  },
  async findOne(ctx) {
    const { form } = ctx.query;
    const { query = {}, alias } = ctx.request.body;

    if (!form) {
      ctx.body = new ReqResponse({
        code: -1,
        desc: '集合form参数错误',
      });
      ctx.status = 500;
      return;
    }

    if (!alias) {
      ctx.body = new ReqResponse({
        code: -1,
        desc: '数据库alias参数错误',
      });
      ctx.status = 500;
      return;
    }

    const data = await formService.findOne({
      form,
      query,
      alias,
    });

    ctx.body = new ReqResponse({
      code: 200,
      desc: 'success',
      data,
    });

    return;
  },
  async create(ctx) {
    const { form } = ctx.query;
    const { doc, docs, alias } = ctx.request.body;

    if (!form) {
      ctx.body = new ReqResponse({
        code: -1,
        desc: '集合form参数错误',
      });
      ctx.status = 500;
      return;
    }

    if (!alias) {
      ctx.body = new ReqResponse({
        code: -1,
        desc: '数据库alias参数错误',
      });
      ctx.status = 500;
      return;
    }

    if (!doc && !docs) {
      ctx.body = new ReqResponse({
        code: -1,
        desc: '插入数据为空',
      });
      ctx.status = 500;
      return;
    }

    const data = await formService.create({
      form,
      doc,
      docs,
      alias,
    });

    ctx.body = new ReqResponse({
      code: 200,
      desc: 'success',
      data,
    });

    return;
  },
  async remove(ctx) {
    const { form } = ctx.query;
    const { query, alias, queries } = ctx.request.body;

    if (!form) {
      ctx.body = new ReqResponse({
        code: -1,
        desc: '集合form参数错误',
      });
      ctx.status = 500;
      return;
    }

    if (!alias) {
      ctx.body = new ReqResponse({
        code: -1,
        desc: '数据库alias参数错误',
      });
      ctx.status = 500;
      return;
    }

    const data = await formService.remove({
      form,
      query,
      alias,
      queries,
    });

    ctx.body = new ReqResponse({
      code: 200,
      desc: 'success',
      data,
    });

    return;
  },
  async removeById(ctx) {
    const { form } = ctx.query;
    const { alias, id } = ctx.request.body;

    if (!form) {
      ctx.body = new ReqResponse({
        code: -1,
        desc: '集合form参数错误',
      });
      ctx.status = 500;
      return;
    }

    if (!alias) {
      ctx.body = new ReqResponse({
        code: -1,
        desc: '数据库alias参数错误',
      });
      ctx.status = 500;
      return;
    }

    const data = await formService.removeById({
      form,
      alias,
      id,
    });

    ctx.body = new ReqResponse({
      code: 200,
      desc: 'success',
      data,
    });

    return;
  },
  async update(ctx) {
    const { form } = ctx.query;
    const { doc, docs, alias, query } = ctx.request.body;

    if (!form) {
      ctx.body = new ReqResponse({
        code: -1,
        desc: '集合form参数错误',
      });
      ctx.status = 500;
      return;
    }

    if (!alias) {
      ctx.body = new ReqResponse({
        code: -1,
        desc: '数据库alias参数错误',
      });
      ctx.status = 500;
      return;
    }

    if (!doc && !docs) {
      ctx.body = new ReqResponse({
        code: -1,
        desc: '更新数据为空',
      });
      ctx.status = 500;
      return;
    }

    const data = await formService.update({
      form,
      doc,
      docs,
      alias,
      query,
    });

    ctx.body = new ReqResponse({
      code: 200,
      desc: 'success',
      data,
    });

    return;
  },
  async test(ctx) {
    ctx.body = 'hello world';
    return;
  },
};
