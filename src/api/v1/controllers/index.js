"use strict";
const PayrollController = require("./payroll");
const RecruitmentController = require("./recruitment");
const JobListingController = require("./recruitment/jobListing");
const JobEntryController = require("./recruitment/jobEntry");
const TalentPoolController = require("./talentPool");


module.exports = function Controllers(service, logger) {
  return Object.freeze({
    payrollController: PayrollController(service, logger),
    recruitmentController: RecruitmentController(service, logger),
    jobListingController: JobListingController(service, logger),
    jobEntryController: JobEntryController(service, logger),
    talentPoolController: TalentPoolController(service, logger),
  });
};
