"use strict";
const mongoose = require("mongoose");
//@todo: test model
const recruitmentSchema = new mongoose.Schema({
  name: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId },
  candidate: [{ type: mongoose.Schema.Types.ObjectId }],
  organization: { type: mongoose.Schema.Types.ObjectId },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date },
},
{
  usePushEach: true
});

module.exports = recruitmentSchema;