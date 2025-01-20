const router = require("express").Router();

const auth = require("./auth");
const category = require("./category");
const baseUrl = process.env.BASE_URL;

/**
 * Auth
 */
router.use(baseUrl, auth); // http://localhost:5000/api/v1/auth

/**
 * Product Category
 */
router.use(baseUrl, category); // http://localhost:5000/api/v1/category

router.use(baseUrl, (req, res) => {
  res.status(404).send({
    msg: "Invalid Route",
  });
});
module.exports = router;
