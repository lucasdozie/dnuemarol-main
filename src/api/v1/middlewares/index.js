"use strict";
const AuthMiddleware = require("./authMiddleware");


module.exports = function Middlewares(logger, services) {
  return Object.freeze({
    accessTokenAuth: AuthMiddleware(logger, services),
  });
};
