"use strict";
// console.log({env: process.env.NODE_ENV})
// if(process.env.NODE_ENV === "development"){
//   require("dotenv").config();
// }

require("dotenv").config({ silent: process.env.NODE_ENV === "production" });

const NODE_ENV = process.env.NODE_ENV;

const DBURL = process.env.DBURL;
const PORT = process.env.PORT;
const BASE_URI = process.env.BASE_URI;
const DNUEMA_ORGANIZATION_MS_URL = process.env.DNUEMA_ORGANIZATION_MS_URL;
const DNUEMA_BASE_URL = process.env.DNUEMA_BASE_URL;
const DNUEMA_BASE_URL_REMOTE = process.env.DNUEMA_BASE_URL_REMOTE;
const DNUEMA_API_ACCESS_CODE = process.env.DNUEMA_API_ACCESS_CODE;
const URI = process.env.URI;
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_DB = process.env.MONGO_DB;
const JWT_SECRET = process.env.JWT_SECRET;
const REDIS_URI = process.env.REDIS_URI;
const HASH_SALT_ROUND = process.env.HASH_SALT_ROUND;

module.exports = {
  NODE_ENV,
  DBURL,
  PORT,
  BASE_URI,
  DNUEMA_ORGANIZATION_MS_URL,
  DNUEMA_BASE_URL,
  DNUEMA_BASE_URL_REMOTE,
  DNUEMA_API_ACCESS_CODE,
  URI,
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_DB,
  JWT_SECRET,
  REDIS_URI,
  HASH_SALT_ROUND
};
