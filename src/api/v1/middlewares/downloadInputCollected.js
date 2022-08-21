"use strict";

module.exports = function(req, res, next) {
  const filename = "farmCollectedInput1.csv";
  res.setHeader("Content-desposition", `attachment; filename=${filename}`);
  res.writeHead(200, { "Content-type": "text/csv" });

  //Flushing the header before we start putting the csv content
  res.flushHeaders();

  next();
};
