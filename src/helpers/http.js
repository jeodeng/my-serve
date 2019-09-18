import rp from 'request-promise';

export default async (opts) => {
  const response = await rp({
    ...opts,
    resolveWithFullResponse: true,
    simple: false,
  });
  const { body: data, headers, statusCode: status_code } = response;
  if (status_code !== 200) {
    throw { headers, data, status_code } || 'internal error';
  }

  if (typeof data.err_code != 'undefined'
    && typeof data.err_desc != 'undefined'
  ) {
    if (data.err_code - 0 !== 0
      || data.err_desc !== '') {
      throw {
        headers,
        data,
        status_code,
      };
    }

    return {
      headers,
      data,
      status_code,
    };
  }

  return {
    headers,
    data,
  };
};
