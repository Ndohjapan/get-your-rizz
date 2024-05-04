const { redis_client } = require('../connection/redis-conn');

class RedisRepository {
  async addKey(key, value) {
    return await redis_client.set(key, value);
  }
  async addKeyAndTTL(key, value, ttl) {
    return await redis_client.set(key, value, 'EX', ttl);
  }
  async getVal(key) {
    return await redis_client.get(key);
  }
  async delKey(key) {
    return await redis_client.del(key);
  }

  async expireKey(key, seconds) {
    return await redis_client.expire(key, seconds);
  }

  async addToSet(key, members) {
    return await redis_client.sAdd(key, members);
  }

  async removeFromSet(key, members) {
    return await redis_client.sRem(key, members);
  }

  async getSetMembers(key) {
    return await redis_client.sMembers(key);
  }

  async setHashField(key, field, value) {
    return await redis_client.hSet(key, field, value);
  }

  async getHashField(key, field) {
    return await redis_client.hGet(key, field);
  }

  async getHashValues(key) {
    return await redis_client.hVals(key);
  }

  async delHashField(key, field) {
    return await redis_client.hDel(key, field);
  }

  async getAllHashFields(key) {
    return await redis_client.hGetAll(key);
  }

  async leftPushToList(key, values) {
    return await redis_client.lPush(key, values);
  }

  async rightPushToList(key, values) {
    return await redis_client.rPush(key, values);
  }

  async leftPopFromList(key) {
    return await redis_client.lPop(key);
  }

  async rightPopFromList(key) {
    return await redis_client.rPop(key);
  }

  async getListRange(key, start, stop) {
    return await redis_client.lRange(key, start, stop);
  }

  async getListLength(key) {
    return await redis_client.lLen(key);
  }

  async removeFromList(key, count, value) {
    return await redis_client.lRem(key, count, value);
  }

  async trimList(key, start, stop) {
    return await redis_client.lTrim(key, start, stop);
  }
}

module.exports = RedisRepository;
