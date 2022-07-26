const express = require("express");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");

const app = express();

app.use(compression)

app.use(helmet()) //protect the header

app.use(cors());

// database();
//routes



// app.use("api/v1", (req, res, next) => {
//     return res.status(200).json({
//         status: "success",
//         message: "Welcome to dnuemarol !!!"
//     })
// });
module.exports = app