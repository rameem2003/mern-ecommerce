const {
  placeOrder,
  paymentSuccess,
  getAllOrders,
  getSingleUserOrder,
} = require("../../controllers/order.controller");
const orderModel = require("../../models/order.model");

const router = require("express").Router();

/**
 * Get all orders
 * http://localhost:5000/api/v1/order/all
 */
router.get("/order/all", getAllOrders);

/**
 * Get single user orders
 * http://localhost:5000/api/v1/order/single/:id
 */
router.get("/order/single/:id", getSingleUserOrder);

/**
 * Place Order
 * http://localhost:5000/api/v1/order/place
 */
router.post("/order/place", placeOrder);

/**
 * Order success
 * http://localhost:5000/api/v1/order/success
 */
router.post("/order/success", paymentSuccess);

router.get("/order/get", async (req, res) => {
  try {
    let data = await orderModel
      .find({})
      .populate({
        path: "cartItems",
        populate: {
          path: "product",
        },
      })
      .populate("user");

    res.send(data);
  } catch (error) {
    res.status(500).send({
      success: false,
      msg: "Internal Server Error",
      error,
    });
  }
});

module.exports = router;
