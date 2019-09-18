export class ReqResponse {
  constructor({ code = 200, desc = '请求成功', data = null }) {
    this.code = code;
    this.desc = desc;
    this.data = data;
  }
};
