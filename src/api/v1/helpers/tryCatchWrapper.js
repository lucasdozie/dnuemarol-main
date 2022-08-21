module.exports = (func) => async (req, res, next) => {
  try {
    await func(req, res);
  } catch (err) {
    next(err);
  }
};
