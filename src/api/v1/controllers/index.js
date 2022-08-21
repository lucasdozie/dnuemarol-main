"use strict";
const PayrollController = require("./payroll");
const RecruitmentController = require("./recruitment");


module.exports = function Controllers(service, logger) {
  return Object.freeze({
    payrollController: PayrollController(service, logger),
    recruitmentController: RecruitmentController(service, logger),
  });
};
