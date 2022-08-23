"use strict";
const AuthMiddleware = require("./authMiddleware");


module.exports = function Middlewares(logger, services, redisClient) {
  return Object.freeze({
    accessTokenAuth: AuthMiddleware(logger, services, redisClient),
  });
};
