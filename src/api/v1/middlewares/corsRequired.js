const cors = require("cors");

const whitelist = [process.env.TRANSACTION_MS_DOMAIN];

module.exports = cors((req, callback) => {
  if (whitelist.indexOf(req.get("host")) !== -1) {
    callback(null, true);
  } else {
    callback(new Error("Not allowed"));
  }
});
