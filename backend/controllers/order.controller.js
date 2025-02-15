const cartModel = require("../models/cart.model");
const orderModel = require("../models/order.model");

const placeOrder = async (req, res) => {
  const {
    user,
    address,
    city,
    phone,
    cartItems,
    grandTotal,
    paymentMethod,
    paymentStatus,
  } = req.body;

  try {
    if (city && phone && address) {
      let order = new orderModel({
        user,
        address,
        city,
        phone,
        cartItems,
        grandTotal,
        paymentMethod,
        paymentStatus,
      });

      await order.save();

      // cartItems.map(async (item) => {
      //   await cartModel.findOneAndDelete({ _id: item });
      // });

      res.status(201).send({
        success: true,
        msg: "Order Successful",
        data: order,
      });
    } else {
      res.status(404).send({
        success: false,
        msg: "Some Information Needed",
        error,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      msg: "Internal Server Error",
      error,
    });
  }
};

module.exports = { placeOrder };
