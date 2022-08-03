module.exports = function(error, req, res, next) {
  res.status(500).json({
    status: "failure",
    message: `Something went wrong ${error.message}`
  });
};
