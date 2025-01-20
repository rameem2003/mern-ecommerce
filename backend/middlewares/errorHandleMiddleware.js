const errorHandleMiddleware = (err, req, res, next) => {
  if (err) {
    console.log(err.message);

    if (err.message == "Unexpected field") {
      res.status(404).send({
        success: false,
        msg: err.message,
      });
    }
    if (err.message == "File too large") {
      res.status(404).send({
        success: false,
        msg: err.message,
      });
    }
  } else {
    next();
  }
};
module.exports = errorHandleMiddleware;
