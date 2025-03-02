const {
  placeOrder,
  paymentSuccess,
  getAllOrders,
  getSingleUserOrder,
  paymentFail,
  paymentCancel,
  getOrderByID,
  responseDeliveryStatus,
} = require("../../controllers/order.controller");
const orderModel = require("../../models/order.model");

const router = require("express").Router();

/**
 * Get all orders
 * http://localhost:5000/api/v1/order/all
 */
router.get("/order/all", getAllOrders);

/**
 * Get order by id
 * http://localhost:5000/api/v1/order/singlebyid/:id
 */
router.get("/order/singlebyid/:id", getOrderByID);

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
 * Response for delivery status
 * http://localhost:5000/api/v1/order/response/:id
 */
router.post("/order/response/:id", responseDeliveryStatus);

/**
 * Order success
 * http://localhost:5000/api/v1/order/success/:orderId
 */
router.post("/order/success/:orderId", paymentSuccess);

/**
 * Order Fail
 * http://localhost:5000/api/v1/order/fail/:orderId
 */
router.post("/order/fail/:orderId", paymentFail);

/**
 * Order Cancel
 * http://localhost:5000/api/v1/order/cancel/:orderId
 */
router.post("/order/cancel/:orderId", paymentCancel);

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
