const internalException = require('../../errors/internal-exception');
const Rizz = require('../model/Rizz');

class RizzRepository {
  async CreateRizz({ audio, image }) {
    try {
      const rizz = await Rizz.create({ audio, image });

      return rizz;
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

      const rizz = await Rizz.paginate(
        {
          ...filter,
          is_deleted: false,
        },
        options
      );
      return rizz;
    } catch (error) {
      throw new internalException(error.message, error);
    }
  }

  async FindById(id, select = [], populate = []) {
    try {
      const rizz = await Rizz.findOne({
        _id: id,
        is_deleted: false,
      })
        .select(select)
        .populate(populate);
      return rizz;
    } catch (error) {
      throw new internalException(error.message, error);
    }
  }

  async DeleteById(id) {
    try {
      const rizz = await Rizz.findOneAndUpdate(
        { id, is_deleted: false },
        { $set: { is_deleted: true } }
      );
      return rizz;
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
      const rizz = await Rizz.findOneAndUpdate(
        { ...filter, is_deleted: false },
        {
          $set: update_data,
          $inc: increament_data,
          $push: append_data,
          $pull: pull_data,
        },
        { new: true }
      );
      return rizz;
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
      const rizz = await Rizz.updateMany(
        { ...filter, is_deleted: false },
        { $set: update_data, $inc: increament_data, $push: append_data }
      );
      return rizz;
    } catch (error) {
      throw new internalException(error.message, error);
    }
  }

  async CountDocument(filter) {
    try {
      const rizz_count = await Rizz.countDocuments(filter);

      return rizz_count;
    } catch (error) {
      throw new internalException(error.message, error);
    }
  }
}

module.exports = RizzRepository;
