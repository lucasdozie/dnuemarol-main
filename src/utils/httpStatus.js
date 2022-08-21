"use strict";

import {
  RESPONSE_STATUS_SUCCESS,
  RESPONSE_STATUS_FAILURE,
  SUCCESS_RESPONSE,
  NOT_FOUND
} from "../config/httpStatus";

export const successResponse = (resData = {}) => {
  return {
    ...resData,
    status: RESPONSE_STATUS_SUCCESS,
    statusCode: SUCCESS_RESPONSE
  };
};

export const failedResponse = ({ resData }) => {
  return {
    ...resData,
    status: RESPONSE_STATUS_FAILURE,
    statusCode: NOT_FOUND
  };
};
