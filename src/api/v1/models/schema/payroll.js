"use strict";
const mongoose = require("mongoose");
//@todo: test model
const payrollSchema = new mongoose.Schema({
  name: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId },
  organization: { type: mongoose.Schema.Types.ObjectId },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date },
},
{
  usePushEach: true
});

module.exports = payrollSchema;