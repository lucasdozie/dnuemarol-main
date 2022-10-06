"use strict";
const PayrollService = require("./payroll");
const RecruitmentService = require("./recruitment");
const JobListing = require("./jobListing");
const JobEntry = require("./jobEntry");
const TalentPool = require("./talentPool");

module.exports = function UseCases(datarepo, logger, redisClient, jwtSecret, {mongoose, jwt}, utils,getConfig) {
//module.exports = function UseCases(datarepo, logger, jwtSecret) {
  return Object.freeze({
    recruitmentService: RecruitmentService(datarepo, logger),
    payrollService: PayrollService(datarepo, logger),
    jobListing: JobListing(datarepo, logger),
    jobEntry: JobEntry(datarepo, logger),
    talentPool: TalentPool(datarepo, logger)
  });
};
