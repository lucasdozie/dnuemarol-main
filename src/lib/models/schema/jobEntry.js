"use strict";

module.exports = function JobEntrySchema(schemaProvider) {
  const jobEntrySchema = new schemaProvider.Schema(
    {
      user: {
        id: {type: schemaProvider.Schema.Types.ObjectId},
        name: String
      },
      jobopeningId: {type: schemaProvider.Schema.Types.ObjectId}, 
      candidate: {
        id: String,
        name: String,
        phone_number: String,
        dob: String,
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        },
        address: String,
        state: String,
        gender: {type: String, enum: ["male", "female", "others"]},
        expectedSalary: String,
        degree: String,
        tertiary: String,
        currentRole: String,
        yearsOfExperience: Number,
        skills: {type: Array},
        cv: String,//url link to the location of the CV file
      },
      stages: {
        type: String,
        enum: ["pending", "under review", "interview", "assessment", "Hr review", "hired"],
        default: "pending"
      },
      status: {
        type: String,
        enum: ["active", "draft", "publish", "pending"],
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

  return jobEntrySchema;
};