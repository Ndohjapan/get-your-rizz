const en = require('../locale/en');

module.exports = function BadRequestException(message, status) {
  this.status = status || 422;
  this.message = message || en['bad-request-error'];
};