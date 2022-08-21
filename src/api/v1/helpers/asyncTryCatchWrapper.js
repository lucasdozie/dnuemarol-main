const Promise = require("bluebird");

const asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
// const trycatchMiddleware = func => async (req, res, next) => {
//   try {
//     await func(req, res);
//   } catch (err) {
//     next(err);
//   }
// };

module.exports = func => async (req, res, next) => {
  try {
    await func(req, res);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  asyncMiddleware
};