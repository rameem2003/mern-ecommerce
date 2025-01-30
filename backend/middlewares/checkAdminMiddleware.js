const jwt = require("jsonwebtoken");
const checkAdminMiddleware = (req, res, next) => {
  const { token } = req.cookies;
  // if token found
  if (token) {
    // token verify
    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
      // if error
      if (err) {
        res.status(400).send({
          success: false,
          msg: "Invalid Token",
        });
      } else {
        // if decoded and user role is matched to admin
        if (decoded.role == "admin") {
          next();
        }
        // if not matched
        else {
          res.status(401).send({
            success: false,
            msg: "Admin Unauthorized",
          });
        }
      }
    });
  }
  // if token not found
  else {
    res.status(400).send({
      success: false,
      msg: "Admin Token Not Found, Please Login Again As An Admin",
    });
  }
};

module.exports = checkAdminMiddleware;
