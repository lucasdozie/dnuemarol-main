"use strict";
const PayrollRepo = require("./payroll");
const RecruitmentRepo = require("./recruitment");
const JobListingRepo = require("./jobListing");
const JobEntryRepo = require("./jobEntry");
const TalentPoolRepo = require("./talentPool");


//@todo - db or model should be injected
module.exports = function DataRepository(conn,logger) {
  return Object.freeze({
    payrollRepo: PayrollRepo(conn,logger),
    recruitmentRepo: RecruitmentRepo(conn,logger),
    jobListingRepo: JobListingRepo(conn,logger),
    jobEntryRepo: JobEntryRepo(conn,logger),
    talentPoolRepo: TalentPoolRepo(conn,logger),
  });
};
