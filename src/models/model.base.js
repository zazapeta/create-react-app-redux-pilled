const SAVE = '@MODEL/SAVE';

class BaseModel {
  constructor(rawData) {
    this.rawData = rawData;
  }

  static async create(rawData) {
    let data = rawData;
    if (typeof rawData === 'function') {
      data = await rawData();
    }
    return new this(data);
  }

  static async update(instance, newData) {
    let data = newData;
    if (typeof newData === 'function') {
      data = await newData();
    }
    return new this({ ...instance.rawData, ...data });
  }

  static validate(rawData) {
    if (process.env.NODE_ENV !== 'production') {
      const { error } = this.schema.validate(rawData);
      if (error) {
        console.error('Model Validation failed : ' + this.storeKey);
        console.error(error);
        return false;
      }
      return true;
    }
    return true;
  }

  static save(instance) {
    return {
      type: SAVE,
      payload: instance,
    };
  }

  static selector(store, defaultValue = []) {
    return store[BaseModel.storeKey][this.storeKey] || defaultValue;
  }

  static reducer(
    state = {
      [BaseModel.storeKey]: {},
    },
    action,
  ) {
    const { type } = action;
    switch (type) {
      case SAVE:
        return {
          ...state,
          [BaseModel.storeKey]: {
            [this.storeKey]: {
              ...state[BaseModel.storeKey][this.storeKey],
              ...action.payload,
            },
          },
        };
      default:
        return state;
    }
  }
}
BaseModel.storeKey = 'Models';

export default BaseModel;

class User extends BaseModel {}
User.storeKey = 'Users';
User.schema = {
  // Joi Schema
};

User.create(rawUser || asyncSrcUserFn);
User.update(id || findFn, newRawData || asyncSrcFn); // find + create
User.selector(store); // --
User.validate(rawData);
User.delete(id || findFn);

dispatch(User.create());
