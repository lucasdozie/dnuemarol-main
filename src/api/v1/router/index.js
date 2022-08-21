"use strict";

// Add access to the router objects to each route

module.exports.load = (router, controller, middleware) => {
  //require("./user")(router);
  require("./payroll")(router, controller, middleware);
  require("./okr")(router, controller, middleware)
  require("./recruitment")(router, controller, middleware)
}