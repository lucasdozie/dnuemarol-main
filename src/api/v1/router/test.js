"use strict"

module.exports = function (route){
    route.get(`test`, (req, res, next) => console.log("Test RecruitmentRouter")),
    route.get("/testCpus", (req, res, next) => {
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
    })
    //return {}
};