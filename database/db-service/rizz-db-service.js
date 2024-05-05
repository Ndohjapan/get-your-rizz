const badRequestException = require('../../errors/bad-request-exception');
const RizzRepository = require('../repository/rizz-repository');
const RedisRepository = require('../redis-repository');

class RizzDBService {
  constructor() {
    this.db_repository = new RizzRepository();
    this.redis_repository = new RedisRepository();
    this.service = 'rizz';
  }

  async CreateRizz({ image, audio }) {
    try {
      const rizz = await this.db_repository.CreateRizz({
        image,
        audio,
      });

      this.redis_repository.delKey(this.service);

      return rizz;
    } catch (error) {
      throw new badRequestException(error.message, error.status);
    }
  }

  async GetRizz(page = 1, limit = 100, sort = {}, select = []) {
    try {
      const hash_key = `all-${page}-${limit}-${JSON.stringify(
        sort
      )}-${JSON.stringify(select)}`;

      const cached_response = await this.redis_repository.getHashField(
        this.service,
        hash_key
      );

      if (cached_response) {
        return JSON.parse(cached_response);
      }

      const rizzes = await this.db_repository.FindByFilter(
        {},
        page,
        limit,
        sort,
        select
      );

      this.redis_repository.setHashField(
        this.service,
        hash_key,
        JSON.stringify(rizzes)
      );

      return rizzes;
    } catch (error) {
      throw new badRequestException(error.message, error.status);
    }
  }

  async GetRizzByFilter(filter, page = 1, limit = 100, sort = {}, select = []) {
    try {
      const hash_key = `${JSON.stringify(
        filter
      )}-${page}-${limit}-${JSON.stringify(sort)}-${JSON.stringify(select)}`;

      const cached_response = await this.redis_repository.getHashField(
        this.service,
        hash_key
      );

      if (cached_response) {
        return JSON.parse(cached_response);
      }

      const rizz = await this.db_repository.FindByFilter(
        filter,
        page,
        limit,
        sort,
        select
      );

      this.redis_repository.setHashField(
        this.service,
        hash_key,
        JSON.stringify(rizz)
      );

      return rizz;
    } catch (error) {
      throw new badRequestException(error.message, error.status);
    }
  }

  async UpdateOneRizzByFilter(
    filter = {},
    update_data = {},
    increament_data = {},
    append_data = {},
    pull_data = {}
  ) {
    try {
      const course = await this.db_repository.UpdateOneByFilter(
        filter,
        update_data,
        increament_data,
        append_data,
        pull_data
      );

      this.redis_repository.delKey(this.service);

      return course;
    } catch (error) {
      console.log(error);
      throw new badRequestException(error.message, error.status);
    }
  }

  async UpdateManyRizzByFilter(
    filter,
    update_data,
    increament_data,
    append_data
  ) {
    try {
      const update = await this.db_repository.UpdateManyByFilter(
        filter,
        update_data,
        increament_data,
        append_data
      );

      this.redis_repository.delKey(this.service);

      return update;
    } catch (error) {
      throw new badRequestException(error.message, error.status);
    }
  }

  async CountRizz(filter = {}) {
    try {
      const hash_key = `count-${JSON.stringify(filter)}`;

      const cached_response = await this.redis_repository.getHashField(
        this.service,
        hash_key
      );

      if (cached_response) {
        return JSON.parse(cached_response);
      }

      const courses_count = await this.db_repository.CountDocument(filter);

      this.redis_repository.setHashField(
        this.service,
        hash_key,
        JSON.stringify(courses_count)
      );

      return courses_count;
    } catch (error) {
      throw new badRequestException(error.message, error.status);
    }
  }
}

module.exports = RizzDBService;
