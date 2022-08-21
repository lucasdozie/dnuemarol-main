"use strict";
import logger from "./../../../config/logger";
import { BaseError } from "./../../../utils/errors";
/**
 * @todo import loggerService, mailService & senteryService
 * */

class ErrorHandler {
  async handleError(err, req, res, next) {
    await logger.error(
      `Error message from the centralized error-handling component: ${err}`
    );
    //    await sendMailToAdminIfCritical();
    //    await sendEventsToSentry();
    return res.status(err.httpCode || err.status || 500).json({
      status: "failure",
      message: err.description || err.message || `error: ${err}`,
    });
  }

  isTrustedError(error) {
    if (error instanceof BaseError) {
      return error.isOperational;
    }
    return false;
  }
}
module.exports = new ErrorHandler();
