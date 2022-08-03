"use strict";
const { AOS_API_ACCESS_CODE } = require("./../config/env");
module.exports = (req, res, next) => {
  /********************************
   *       AUTH MIDDLEWARE         *
   * ******************************/

  //console.log({headers: req.headers, header2: req.headers["x-aos_access_code"], AOS_API_ACCESS_CODE})
  if (req.headers["x-aos_access_code"] == AOS_API_ACCESS_CODE) {
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized Admin!" });
  }
};
