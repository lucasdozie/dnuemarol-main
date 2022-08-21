const express = require("express");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");

const app = express();

app.use(compression)

app.use(helmet()) //protect the header

app.use(cors());

module.exports = app