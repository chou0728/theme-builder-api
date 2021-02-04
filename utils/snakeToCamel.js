const toCamelCase = (data) => {
  let rtn = data;
  if (typeof data === 'object') {
    if (data instanceof Array) {
      rtn = data.map(toCamelCase);
    } else {
      rtn = {};
      for (let key in data) {
        if (data.hasOwnProperty(key)) {
          const newKey = key.replace(/(_\w)/g, (k) => k[1].toUpperCase());
          rtn[newKey] = toCamelCase(data[key]);
        }
      }
    }
  }
  return rtn;
};

module.exports = toCamelCase;
