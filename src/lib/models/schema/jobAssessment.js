"use strict";

module.exports = function JobAssessmentSchema(schemaProvider) {
  const assessmentSchema = new schemaProvider.Schema(
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
      alloted_time: {type: String, default: "10"},//in mins
      questions: {type: Array},
      answers: {type: Array},
      description: {
        type: String,
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

  return assessmentSchema;
};
