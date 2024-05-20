const mongoose = require('mongoose');
const { connectToDatabase } = require('../connection/db-conn');
const { redis_client } = require('../connection/redis-conn');
const Rizz = require('../database/model/Rizz');
const User = require('../database/model/Users');
const seed_data = require('./seed-data');
const { v4: uuidv4 } = require('uuid');

const setup = () => {
  beforeEach(async () => {
    await connectToDatabase(`mongodb://127.0.0.1:27017/test_${uuidv4()}`);
  });

  afterEach(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await redis_client.flushDb();
  });
};

const SeedDB = async () => {
  try {
    
    await Rizz.insertMany(seed_data.rizz);

    console.log('inserted default rizz')

    await User.insertMany(seed_data.users);

    console.log('Seed complete');

  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  setup,
  SeedDB
};