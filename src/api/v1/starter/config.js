"use strict";
if (process.env.NODE_ENV == "development") {
  require("dotenv").config();
}

module.exports = (app) => {
  
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    // res.header(
    //   "Access-Control-Allow-Headers",
    //   "Content-Type, Accept, Authorization"
    // );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-nuema-customerid"
    );
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    res.header("Content-Type", "application/json");
    if (req.method === "OPTIONS") {
      return res.status(200).end();
    } else {
      next();
    }
  });
};
