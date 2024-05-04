const UserDBService = require('../database/db-service/user-db-service');
const badRequestException = require('../errors/bad-request-exception');
const en = require('../locale/en');

class UserService {
  constructor() {
    this.db_service = new UserDBService();
  }

  async CreateUser(username, email) {
    try {
      const user = await this.db_service.CreateUser({ username, email });
      return user;
    } catch (error) {
      throw new badRequestException(error.message, error.status);
    }
  }

  async GetUsersCount() {
    try {
      const user_count = await this.db_service.CountUser({});

      return { count: user_count };
    } catch (error) {
      throw new badRequestException(error.message, error.status);
    }
  }
}

module.exports = UserService;
