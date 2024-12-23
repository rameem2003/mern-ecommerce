const router = require("express").Router();

const auth = require("./auth");
const baseUrl = process.env.BASE_URL;

router.use(baseUrl, auth); // http://localhost:5000/api/v1

router.use(baseUrl, (req, res) => {
  res.status(404).send({
    msg: "Invalid Route",
  });
});
module.exports = router;
