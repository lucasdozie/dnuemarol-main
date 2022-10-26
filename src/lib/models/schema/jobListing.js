"use strict";

module.exports = function JobListingSchema(schemaProvider) {
  const jobListingSchema = new schemaProvider.Schema(
    {
      user: {
        id: {type: schemaProvider.Schema.Types.ObjectId},
        name: String
      },
      title: {
        type: String,
      }, 
      slug: {
        type: String,
      },
      organization: {
        id: String,
        name: String,
        about: String,
        state: {type: String, default: "Lagos"},
        industry: {type: String, default: "tech"},
      },
      detail: {
        description: {
          type: String,
        }, //description about the job
        banner_url: {type: String, default: "banner.jpg"},
        job_id: {type: String},//6 - 8 random generated alphaNumeric characters
        skill_qualifications: {type: Array}, //requirement for the role
        skill_tools: {type: Array}, //other requirement/tools used for the role
        job_role: {type: String, enum: ["frontend", "backend", "Quality Assurance", "finiance officier"]},
        job_address: {type: String},
        job_type: {type: String, enum: ["remote", "onsite", "hybrid"], default: "onsite"},
        job_responsibility: {type: Array},
        benefits: {type: Array}
      },
      salary_range: {
        min: {type: String},
        max: {type: String},
      },
      department: {
        type: String,
        default: "HR"
      }, 
      category: {
        type: String,
      }, 
      role: {
        type: String, //job role
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
