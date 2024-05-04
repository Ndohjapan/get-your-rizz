const RizzDBService = require("../database/db-service/rizz-db-service");
const badRequestException = require("../errors/bad-request-exception");

class RizzService {
  constructor() {
    this.db_service = new RizzDBService();
  }

  async CreateRizz(audio, image) {
    try {
      const rizz = await this.db_service.CreateRizz({ audio, image });
      return rizz;
    } catch (error) {
      throw new badRequestException(error.message, error.status);
    }
  }

  async GetTopRizz(page = 1, limit = 100) {
    try {
      const rizz = await this.db_service.GetRizz(page, limit, {
        likes: -1,
      });

      return rizz;
    } catch (error) {
      throw new badRequestException(error.message, error.status);
    }
  }

  async GetLatestRizz(page = 1, limit = 100) {
    try {
      const rizz = await this.db_service.GetRizz(page, limit, {
        created_at: -1,
      });

      return rizz;
    } catch (error) {
      throw new badRequestException(error.message, error.status);
    }
  }

  async LikeRizz(rizz_id = "") {
    try {
      const rizz = await this.db_service.UpdateOneRizzByFilter(
        { _id: rizz_id },
        {},
        { likes: 1 }
      );

      return rizz;
    } catch (error) {
      throw new badRequestException(error.message, error.status);
    }
  }
}

module.exports = RizzService;
