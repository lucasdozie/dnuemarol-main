const JobListingSchema = require("./jobListing");
const JobEntrySchema = require("./jobEntry");
const TalentPoolSchema = require("./talentPool");

module.exports = function DatabaseSchemas(
  schemaProvider,
  config,
  utils,
  logger
) {
  return Object.freeze({
    jobListing: JobListingSchema(schemaProvider, config, utils.bcryptHash),
    talentPool: TalentPoolSchema(schemaProvider),
    jobEntry: JobEntrySchema(schemaProvider)
  });
}