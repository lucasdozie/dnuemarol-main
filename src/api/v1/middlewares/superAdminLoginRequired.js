module.exports = (req, res, next) => {
  /********************************
   *       AUTH MIDDLEWARE         *
   * ******************************/
  // console.log({ user: req.user });
  if (req.user && req.user.role == "superAdmin") {
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized Admin!" });
  }
};
