var jwt = require('jsonwebtoken');

module.exports.issueToken = function(payload, options) {
  var token = jwt.sign(payload, sails.config.custom.jwt_token_secret, options);
  return token;
};

module.exports.verifyToken = function(token, callback) {
  return jwt.verify(token, sails.config.custom.jwt_token_secret, {}, callback);
};