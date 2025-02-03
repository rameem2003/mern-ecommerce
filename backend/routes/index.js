const router = require("express").Router();

const auth = require("./auth");
const category = require("./category");
const product = require("./product");
const store = require("./store");
const cart = require("./cart");
const baseUrl = process.env.BASE_URL;

/**
 * Auth
 */
router.use(baseUrl, auth); // http://localhost:5000/api/v1/auth

/**
 * Product Category
 */
router.use(baseUrl, category); // http://localhost:5000/api/v1/category

/**
 * Product
 */
router.use(baseUrl, product); // http://localhost:5000/api/v1/product

/**
 * Store
 */
router.use(baseUrl, store); // http://localhost:5000/api/v1/store

/**
 * Cart
 */
router.use(baseUrl, cart); // http://localhost:5000/api/v1/cart

/**
 * Invalid Route
 */
router.use(baseUrl, (req, res) => {
  res.status(404).send({
    msg: "Invalid Route",
  });
});
module.exports = router;
