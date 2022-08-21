"use strict";
const PayrollService = require("./payroll");
const RecruitmentService = require("./recruitment");

module.exports = function UseCases(datarepo, logger, jwtSecret) {
  return Object.freeze({
    recruitmentService: RecruitmentService(datarepo, logger),
    payrollService: PayrollService(datarepo, logger)
  });
};
