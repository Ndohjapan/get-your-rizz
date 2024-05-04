const mongoose = require('mongoose');
const mongoose_paginate = require('mongoose-paginate-v2');
const { rollbar } = require('./logging-conn');
const {
  pagination_labels,
  pagination_limit,
  pagination_page,
} = require('../utils/constant');

mongoose_paginate.paginate.options = {
  page: pagination_page,
  limit: pagination_limit,
  customLabels: pagination_labels,
  allowDiskUse: true,
  sort: { created_at: -1 },
};

async function connectToDatabase(DB_URL = process.env.DB_URL) {
  try {
    const conn = await mongoose.connect(DB_URL);
    console.log('Connected to Database successfully');
    return conn;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    rollbar.error(error);
    throw error; // Re-throw the error to handle it outside
  }
}

// Export other necessary functions and objects
module.exports = {
  mongoose_paginate,
  mongoose,
  connectToDatabase,
};
