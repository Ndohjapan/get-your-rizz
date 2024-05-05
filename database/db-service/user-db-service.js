const badRequestException = require("../../errors/bad-request-exception");
const UserRepository = require("../repository/user-repository");
const RedisRepository = require("../redis-repository");

class UserDBService {
  constructor() {
    this.db_repository = new UserRepository();
    this.redis_repository = new RedisRepository();
    this.service = "user";
  }

  async CreateUser({ username, email }) {
    try {
      const user = await this.db_repository.CreateUser({
        username,
        email
      });

      this.redis_repository.delKey(this.service);

      return user;
    } catch (error) {
      throw new badRequestException(error.message, error.status);
    }
  }

  async GetUser(page = 1, limit = 100, sort = {}, select = []) {
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

      const users = await this.db_repository.FindByFilter(
        {},
        page,
        limit,
        sort,
        select
      );

      this.redis_repository.setHashField(
        this.service,
        hash_key,
        JSON.stringify(users)
      );

      return users;
    } catch (error) {
      throw new badRequestException(error.message, error.status);
    }
  }

  async GetUsersByFilter(filter, page = 1, limit = 100, sort = {}, select = []) {
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

      const users = await this.db_repository.FindByFilter(
        filter,
        page,
        limit,
        sort,
        select
      );

      this.redis_repository.setHashField(
        this.service,
        hash_key,
        JSON.stringify(users)
      );

      return users;
    } catch (error) {
      throw new badRequestException(error.message, error.status);
    }
  }

  async UpdateOneUserByFilter(
    filter = {},
    update_data = {},
    increament_data = {},
    append_data = {},
    pull_data = {}
  ) {
    try {
      const user = await this.db_repository.UpdateOneByFilter(
        filter,
        update_data,
        increament_data,
        append_data,
        pull_data
      );

      this.redis_repository.delKey(this.service);

      return user;
    } catch (error) {
      throw new badRequestException(error.message, error.status);
    }
  }

  async UpdateManyUserByFilter(
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

  async CountUser(filter = {}) {
    try {
      const hash_key = `count-${JSON.stringify(filter)}`;

      const cached_response = await this.redis_repository.getHashField(
        this.service,
        hash_key
      );

      if (cached_response) {
        return JSON.parse(cached_response);
      }

      const user_count = await this.db_repository.CountDocument(filter);

      this.redis_repository.setHashField(
        this.service,
        hash_key,
        JSON.stringify(user_count)
      );

      return user_count;
    } catch (error) {
      throw new badRequestException(error.message, error.status);
    }
  }
}

module.exports = UserDBService;
