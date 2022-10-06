"use strict";
const bcryptHash = require("./bcryptHash");
const getStrings = require("./getStrings");

module.exports = function Utils({bcrypt,crypto}, logger) {
  return Object.freeze({
    bcryptHash: bcryptHash(bcrypt),
    getStr: getStrings({crypto}, logger)
  });
};
