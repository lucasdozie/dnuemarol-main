"use strict";
const PayrollController = require("./payroll");
const AssessmentController = require("./assessment");
const RecruitmentController = require("./recruitment");
const JobListingController = require("./recruitment/jobListing");
const JobEntryController = require("./recruitment/jobEntry");
const TalentPoolController = require("./talentPool");


module.exports = function Controllers(service, logger, utils, getConfig, subscriber) {
  return Object.freeze({
    payrollController: PayrollController(service, logger),
    recruitmentController: RecruitmentController(service, logger),
    jobListingController: JobListingController(service, logger, utils, getConfig, subscriber),
    jobEntryController: JobEntryController(service, logger, utils, getConfig, subscriber),
    assessmentController: AssessmentController(service, logger, utils, getConfig, subscriber),
    talentPoolController: TalentPoolController(service, logger),
  });
};
