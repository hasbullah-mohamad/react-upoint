const ConstantHelper = {
  getItem: (object, key) => {
    if (object[key]) {
      return object[key];
    }
    return null;
  },
  getItemByField: (list, field, value) => {
    for (let i = 0, ni = list.length; i < ni; i++) {
      const item = list[i];
      if (item[field] === value) {
        return item;
      }
    }
    return null;
  }
};

export default ConstantHelper;
