"use strict";
export const HttpStatusCode = {
  OK: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER: 500,
};

export class BaseError extends Error {
  constructor(name, httpCode, isOperational, description) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.httpCode = httpCode;
    this.isOperational = isOperational;
    this.description = description;

    Error.captureStackTrace(this);
  }
}

export class APIError extends BaseError {
  constructor(
    name,
    httpCode = HttpStatusCode.INTERNAL_SERVER,
    isOperational = true,
    description = `internal server error.`
  ) {
    super(name, httpCode, isOperational, description);
  }
}

export class UnauthorizedError extends APIError {
  constructor(
    name,
    httpCode = HttpStatusCode.INTERNAL_SERVER,
    isOperational = true,
    description = `unauthorize error.`
  ) {
    super(name, httpCode, isOperational, description);
  }
}

export class BadRequestError extends APIError {
  constructor(description = `Bad request.`) {
    super("BAD REQUEST", HttpStatusCode.BAD_REQUEST, true, description);
  }
}

export class NotFoundError extends APIError {
  constructor(description = `error: not found.`) {
    super("NOT FOUND", HttpStatusCode.NOT_FOUND, true, description);
  }
}
