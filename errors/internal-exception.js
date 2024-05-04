const en = require('../locale/en');

module.exports = function InternalServerError(message, errors = '') {
  this.status = 500;
  this.message = message || 'server error';
  this.errors = errors;
};
