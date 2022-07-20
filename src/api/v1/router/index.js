"use strict";

// Add access to the router objects to each route

module.exports = (router) => {
  require("./user")(router);
  require("./payroll")(router);
  require("./okr")(router)
  require("./recruitment")(router)
}