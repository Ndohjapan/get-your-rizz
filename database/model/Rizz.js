const mongoose = require('mongoose');
const { mongoose_paginate } = require('../../connection/db-conn');

const rizzSchema = new mongoose.Schema(
  {
    image: {
      type: [{
        number: Number,
        link: String
      }],
    },
    likes: {
      type: Number,
      default: 0,
    },
    audio: {
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

rizzSchema.plugin(mongoose_paginate);

module.exports = mongoose.model('rizz', rizzSchema);
