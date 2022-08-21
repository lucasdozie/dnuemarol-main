"use strict";
const BASE_URL = "/api/v1/";
const ALLOWED_ADMIN_ROLE = [
  "superAdmin",
  "subAdmin",
  "regionalManager",
  "zonalManager",
  "finance",
];

const USER_ROLE = {
  ADMIN: "admin",
  SUPERADMIN: "superAdmin",
  SUBADMIN: "subAdmin",
  ZONALMANAGER: "zonalManager",
  REGIONALMANAGER: "regionalManager",
  FINANCE: "finance",
  AGENT: "agent",
  HABITANT: "habitant",
  GUEST: "guest",
};

const AVAILABLE_LANGUAGES = {
  EN: "en",
  FR: "fr",
};

const SESSION = {
  LOGIN_VALIDITY_IN_SECONDS: 30 * 24 * 60 * 60,//30DAYS,
  TOKEN_TYPES: {
    ACCESS_TOKEN: "access_token",
    REFRESH_TOKEN: "refresh_token",
    API_KEY: "api_key",
  }
}

module.exports = {
  BASE_URL,
  ALLOWED_ADMIN_ROLE,
  USER_ROLE,
  AVAILABLE_LANGUAGES,
  SESSION,
};
