import mongoose, { Promise } from 'mongoose';
import _ from 'lodash';
import mongodb from './mongodb';

// 集合名称
const SYSTEMS = [
  'test',
  'accounts',
];

const TYPES = {
  'String': String,
  'Number': Number,
  'Date': Date,
  'Buffer': Buffer,
  'Boolean': Boolean,
  'Array': Array,
  'Mixed': mongoose.Schema.Types.Mixed
};

const FORMS = {
  forms: {},
  get({ alias, form }) {
    if (!alias || !form) {
      throw {
        err_desc: '数据库未设置'
      };
    }

    const maps = (this.forms[ alias ] || (this.forms[ alias ] = {}));
    return maps[ form ];
  },
  set({ alias, form, value }) {
    if (!alias || !form) {
      throw {
        err_desc: '数据库未设置'
      };
    }

    const maps = (this.forms[ alias ] || (this.forms[ alias ] = {}));
    return maps[ form ] = value;
  },
  clear() {
    this.forms = {};
  },
  alias() {
    const alias = [];
    for (const tmp in this.forms) {
      alias.push(tmp);
    }

    return alias;
  }
};

export default {
  // 初始化每个集合的model
  async init({ alias }) {
    for (const form of SYSTEMS) {
      await this.model({ form,  alias });
    }
  },
  async model({ form, alias = 'default' }) {
    const connect = mongodb.getConnect({ alias });

    // 如果该model已init，则直接返回
    if (connect.models[form]) {
      return connect.models[form];
    }

    return await mongodb.getConnect({ alias }).model(form, new mongoose.Schema({}, { strict: false }));
  },
  // 支持批量插入和单个插入
  async create({ form, alias = 'default', doc, docs }) {
    const collection = await this.model({ form, alias });

    // 新增函数
    const handler = async (obj) => ({
      data: await collection.create(obj),
      alias,
    });

    // 判断是否批量新增
    const result = await (async () => {
      if (docs && docs.length > 0) {
        return {
          data: await Promise.all(docs.map(doc => handler(doc))),
          alias,
        };
      }

      return await handler(doc);
    })();

    return result;
  },
  // 查询，返回列表
  async find({ form, alias = 'default', query, sort = {}, pagination }) {
    const collection = await this.model({ form, alias });

    if (pagination) {
      const { pageNum, pageSize } = pagination;

      return {
        data: await collection.find(query).sort(sort).skip((pageNum - 1) * pageSize).limit(pageSize),
        pagination: {
          pageNum,
          pageSize,
          total: (await this.count({ form, query, alias })).data,
        },
        alias,
      };
    }

    return {
      data: await collection.find(query).sort(sort),
      alias,
    };
  },
  // 查询单个
  async findOne({ form, alias = 'default', query }) {
    const collection = await this.model({ form, alias });

    return {
      data: await collection.findOne(query),
      alias,
    };
  },
  // 批量删除
  async remove({ form, alias = 'default', query, queries }) {
    const collection = await this.model({ form, alias });

    const handler = async (query) => {
      if (_.isEmpty(query) || !(_.isObject(query))) {
        throw {
          err_desc: '删除参数错误',
        };
      }
      return {
        data: await collection.deleteMany(query),
        alias
      };
    };

    if (queries && queries.length > 0) {
      return {
        data: await Promise.all(queries.map(q => handler(q))),
        alias,
      };
    }

    if (!query) {
      throw {
        err_desc: '删除参数错误',
      };
    }

    return {
      data: await handler(query),
      alias,
    };
  },
  // 依靠id，单个删除
  async removeById({ form, alias = 'default', id }) {
    const collection = await this.model({ form, alias });

    return {
      data: await collection.deleteOne({ _id: id }),
      alias,
    };
  },
  // 可根据单一条件更新多条数据，可不同条件分别更新数据
  async update({ form, alias = 'default', doc, docs, query }) {
    const collection = await this.model({ form, alias });

    console.log(query, doc);

    // 更新函数
    const handler = async (query, doc) => {

      if (_.isEmpty(query) || !_.isObject(query)) {
        throw {
          err_desc: '更新参数错误',
        };
      }

      return {
        data: await collection.updateMany(query, doc),
        alias
      };
    };

    // 判断是否批量更新
    if (docs && docs.length > 0) {
      return {
        data: await Promise.all(docs.map(({ query, doc }) => handler(query, doc))),
        alias,
      };
    }

    return await handler(query, doc);
  },
  // 根据查询条件，计算数据总数
  async count({ form, query, alias }) {
    const collection = await this.model({ form, alias });

    return {
      data: await collection.find(query).countDocuments(),
      alias,
    };
  },
};
