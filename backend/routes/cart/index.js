const {
  addToCart,
  singleUserCart,
} = require("../../controllers/cart.controller");

const router = require("express").Router();

/**
 * http://localhost:5000/api/v1/cart/add
 */
router.post("/cart/add", addToCart);

/**
 * http://localhost:5000/api/v1/cart/single/:id
 */

router.get("/cart/single/:id", singleUserCart);

module.exports = router;
