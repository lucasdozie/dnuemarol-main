"use strict";
const mongoose = require("mongoose");
module.exports = mongoose.model("Payroll", require("./schema/payroll"));
