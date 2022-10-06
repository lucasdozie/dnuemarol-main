"use strict";

module.exports = function JobListingSchema(schemaProvider) {
  const jobListingSchema = new schemaProvider.Schema(
    {
      user: {
        id: {type: schemaProvider.Schema.Types.ObjectId},
        name: String
      },
      name: {
        type: String,
      }, 
      slug: {
        type: String,
      },
      description: {
        type: String,
      }, 
      category: {
        type: String,
      }, 
      role: {
        type: String, //job role
      },
      department: {
        type: String,
      }, 
      status: {
        type: String,
        enum: ("active", "draft", "publish", "pending"),
        default: "pending"
      },
      comment: {
        type: String,
      },
      created_at: {
        type: Date,
        default: Date.now,
      },
      onboarded_at: Date,
      updated_at: Date,
      deleted_at: Date,
    },
    {
      usePushEach: true,
    }
  );

  return jobListingSchema;
};
