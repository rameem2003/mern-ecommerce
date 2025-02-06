const {
  addToCart,
  singleUserCart,
  incrementCartItem,
  decrementCartItem,
  deleteCartItem,
} = require("../../controllers/cart.controller");
const checkUserMiddleware = require("../../middlewares/checkUserMiddleware");

const router = require("express").Router();

/**
 * http://localhost:5000/api/v1/cart/add
 */
router.post("/cart/add", checkUserMiddleware, addToCart);

/**
 * http://localhost:5000/api/v1/cart/single/:id
 */
router.get("/cart/single/:id", singleUserCart);

/**
 * http://localhost:5000/api/v1/cart/increment/:id
 */
router.patch("/cart/increment/:id", checkUserMiddleware, incrementCartItem);

/**
 * http://localhost:5000/api/v1/cart/decrement/:id
 */
router.patch("/cart/decrement/:id", checkUserMiddleware, decrementCartItem);

/**
 * http://localhost:5000/api/v1/cart/delete/:id
 */
router.delete("/cart/delete/:id", checkUserMiddleware, deleteCartItem);

module.exports = router;
