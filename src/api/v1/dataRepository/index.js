"use strict";
const PayrollRepo = require("./payroll");
const RecruitmentRepo = require("./recruitment");


//@todo - db or model should be injected
module.exports = function DataRepository(conn,logger) {
  return Object.freeze({
    payrollRepo: PayrollRepo(conn,logger),
    recruitmentRepo: RecruitmentRepo(conn,logger),
  });
};
