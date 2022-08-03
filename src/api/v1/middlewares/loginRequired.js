const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  /********************************
   *       AUTH MIDDLEWARE         *
   * ******************************/
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized Admin!" });
  }
};

// module.exports = async (req, res, next) => {
//   try {
//     const token = req.headers("access_token");
//     console.log({ reqHeader: req.headers });
//     console.log({ token });
//     const decoded = jwt.verify(token, process.env.PUBLIC_JWT_SECRET);
//     console.log({ decoded });
//     req.user = decoded;
//     next();
//   } catch (ex) {
//     res.status(FORBIDDEN).json({
//       status: "failure",
//       message: "Invalid Token",
//       error: ex.message
//     });
//   }
// };
