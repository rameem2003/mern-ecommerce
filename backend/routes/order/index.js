const { placeOrder } = require("../../controllers/order.controller");
const orderModel = require("../../models/order.model");

const router = require("express").Router();

/**
 * http://localhost:5000/api/v1/order/place
 */

router.post("/order/place", placeOrder);

router.get("/order/get", async (req, res) => {
  try {
    let data = await orderModel.find().populate("cartItems");
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
