"use strict";
const rateLimiter = require("express-rate-limit");

// @ts-ignore
const limiter = rateLimiter({
  windowMs: 30 * 1000, //30 seconds
  max: 2, // limit each IP to 2 requests per windowMs
});
module.exports = limiter;
