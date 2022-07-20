"use strict";
if (process.env.NODE_ENV == "development") {
  require("dotenv").config();
}

const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const morgan = require("morgan");
const express = require("express");
// const db = require("./../config/db");
// const errorHandler = require("./../middlewares/errorHandlerNew");
const router = express.Router();

const { default: logger } = require("../config/logger");

module.exports = (app) => {
  app.use(bodyParser.json());

  app.use(bodyParser.urlencoded({ extended: true }));

  //app.use(cors());

  if (process.env.NODE_ENV !== "production") {
    app.use(morgan("combined"));
  } else {
    // create a write stream (in append mode)
    const accessLogStream = fs.createWriteStream(
      path.join(__dirname, "access.log"),
      {
        flags: "a",
      }
    );
    app.use(morgan("combined", { stream: accessLogStream }));
  }

  //main route
  app.use(router);

  //External api route slug is external or third-party
  //app.use("external", router);

  require("./../api/v1/router")(router);

  

  app.use(async (err, req, res, next) => {
    if (!errorHandler.isTrustedError(err)) {
      logger.warn("Operation can continue safely: ");
      next(err);
    }
    logger.warn("It can't inside operation can continue safely: ");
    await errorHandler.handleError(err, req, res);
  });

  process.on("unhandledRejection", function (reason, promise) {
    logger.error("Unhandled Rejection at:", promise, "reason:", reason);
  });

  process.on("unhandledException", function (reason, promise) {
    logger.error("Unhandled Exception at:", promise, "reason:", reason);
  });

  const shutdown = async function (signal) {
    logger.info(`${signal} recieved`);
    //give aos api 15 seconds to properly shutdown or we do it ourselves
    setTimeout(function () {
      logger.info(`Timeout to shutdown, forcing shut down`);
      process.exit();
    }, 15 * 1000);
    //closing db now
    try {
      //await db.close();
      console.log("shutting down server")
    } catch (error) {
      logger.info(`Database may already be closed`);
      logger.warn(error);
    }
    process.exit();
  };

  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);

  router.get("/", (req, res) => {
    res.status(200).json({
      status: "success",
      message: "Welcome to Dnuemarol Api!!!",
    });
  });

};