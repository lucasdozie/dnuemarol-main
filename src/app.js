const express = require("express");
const compression = require("compression");
const helmet = require("helmet");

const app = express();

app.use(compression)

app.use(helmet()) //protect the header

app.use("api/v1", (req, res, next) => {
    return res.status(200).json({
        status: "success",
        message: "Welcome to dnuemarol !!!"
    })
});

//app.get("api/v1/testCpus", (req, res, next) => {
    const router = app.route() 
router.get("/testCpus", (req, res, next) => {
    let n = parseInt(req.query.n);
    let count = 0;
     
    if (n > 5000000000) n = 5000000000;
     
    for (let i = 0; i <= n; i++) {
      count += i;
    }
     
    return res.status(200).json({
        status: "success",
        message: "Welcome to dnuemarol !!!",
        message2: `Final count is ${count}`
    })
});

module.exports = app