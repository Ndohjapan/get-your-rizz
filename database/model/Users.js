const mongoose = require('mongoose');
const { mongoose_paginate } = require('../../connection/db-conn');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    __v: {
      type: Number,
      select: false,
    },
    is_deleted: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

userSchema.plugin(mongoose_paginate);

module.exports = mongoose.model('user', userSchema);
