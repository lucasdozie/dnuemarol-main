"use strict";
const httpStatus = require("http-status");

exports.RESPONSE_STATUS_FAILURE = "failure";
exports.RESPONSE_STATUS_SUCCESS = "success";

exports.SUCCESS_RESPONSE = 200;
exports.OK = httpStatus.OK;
exports.INTERNAL_SERVER_ERROR = httpStatus.INTERNAL_SERVER_ERROR;
exports.NOT_FOUND = httpStatus.NOT_FOUND;
exports.FAILED = httpStatus.BAD_REQUEST;
exports.BAD_REQUEST = httpStatus.BAD_REQUEST;
