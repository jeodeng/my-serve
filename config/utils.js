export const isBrowser = () => {
  return typeof window !== 'undefined';
};

export const isServer = () => {
  return !isBrowser();
};

export const isEmpty = (val) => { 
  return typeof val === 'undefined' || val === null;
};

export const isArray = (val) => {
  return Object.prototype.toString.call(val) === '[object Array]';
};

export const isObject = (obj) => {
  if (isEmpty(obj)) {
    return false;
  }

  return typeof obj === 'object';
};

export const isRegExp = (obj) => {
  return obj instanceof RegExp;
};

// deep
export const deepClone = (destObj, ...srcObjs) => {
  const iterator = (destObj, srcObj) => {
    if (isRegExp(srcObj)) {
      destObj = srcObj;
      return srcObj;
    }

    if (isArray(srcObj)) {
      destObj = destObj || (destObj = []);

      for (let i = 0, ii = srcObj.length; i < ii; i++) {
        if (srcObj[i]) {
          destObj[i] = iterator(destObj[i], srcObj[i]);
        }
      }

      return destObj;
    } 

    if (isObject(srcObj)) {
      destObj = destObj || (destObj = {});

      for (const key in srcObj) {
        destObj[key] = iterator(destObj[key], srcObj[key]);
      }

      return destObj;
    }
    
    return destObj = srcObj;
  };

  for (const srcObj of srcObjs) {
    destObj = iterator(destObj, srcObj);
  }

  return destObj;
};
