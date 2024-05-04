const internalException = require('../../errors/internal-exception');
const Users = require('../model/Users');

class UserRepository {
  async CreateUser({ username, email }) {
    try {
      const user = await Users.create({ username, email });

      return user;
    } catch (error) {
      throw new internalException(error.message, error);
    }
  }

  async FindByFilter(
    filter,
    page = 1,
    limit = 100,
    sort = {},
    select = [],
    populate = []
  ) {
    try {
      const options = {
        populate,
        page,
        limit,
        select,
        sort,
      };

      const user = await Users.paginate(
        {
          ...filter,
          is_deleted: false,
        },
        options
      );
      return user;
    } catch (error) {
      throw new internalException(error.message, error);
    }
  }

  async FindById(id, select = [], populate = []) {
    try {
      const user = await Users.findOne({
        _id: id,
        is_deleted: false,
      })
        .select(select)
        .populate(populate);
      return user;
    } catch (error) {
      throw new internalException(error.message, error);
    }
  }

  async DeleteById(id) {
    try {
      const user = await Users.findOneAndUpdate(
        { id, is_deleted: false },
        { $set: { is_deleted: true } }
      );
      return user;
    } catch (error) {
      throw new internalException(error.message, error);
    }
  }

  async UpdateOneByFilter(
    filter,
    update_data = {},
    increament_data = {},
    append_data = {},
    pull_data = {}
  ) {
    try {
      const user = await Users.findOneAndUpdate(
        { ...filter, is_deleted: false },
        {
          $set: update_data,
          $inc: increament_data,
          $push: append_data,
          $pull: pull_data,
        },
        { new: true }
      );
      return user;
    } catch (error) {
      throw new internalException(error.message, error);
    }
  }

  async UpdateManyByFilter(
    filter,
    update_data = {},
    increament_data = {},
    append_data = {}
  ) {
    try {
      const user = await Users.updateMany(
        { ...filter, is_deleted: false },
        { $set: update_data, $inc: increament_data, $push: append_data }
      );
      return user;
    } catch (error) {
      throw new internalException(error.message, error);
    }
  }

  async CountDocument(filter) {
    try {
      const user_count = await Users.countDocuments(filter);

      return user_count;
    } catch (error) {
      throw new internalException(error.message, error);
    }
  }
}

module.exports = UserRepository;
