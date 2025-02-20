const sslcz = require("../helpers/paymentGateway");
const cartModel = require("../models/cart.model");
const orderModel = require("../models/order.model");

/**
 * Get all orders
 */
const getAllOrders = async (req, res) => {
  try {
    let allOrders = await orderModel
      .find()
      .populate({
        path: "cartItems",
        populate: {
          path: "product",
        },
      })
      .populate("user");
    res.status(201).send({
      success: true,
      msg: "Order Fetched Success",
      data: allOrders,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      msg: "Internal Server Error",
      error,
    });
  }
};

/**
 * Get Orders by single user
 */
const getSingleUserOrder = async (req, res) => {
  const { id } = req.params;
  try {
    let allOrders = await orderModel
      .find({ user: id })
      .populate({
        path: "cartItems",
        populate: {
          path: "product",
        },
      })
      .populate("user");
    res.status(201).send({
      success: true,
      msg: "Single User Order Fetched Success",
      data: allOrders,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      msg: "Internal Server Error",
      error,
    });
  }
};

/**
 * Place a new Order
 */
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

      cartItems.map(async (item) => {
        await cartModel.findOneAndDelete({ _id: item.cartId });
      });

      const data = {
        total_amount: grandTotal,
        currency: "BDT",
        tran_id: "order._id", // use unique tran_id for each api call
        success_url: `${process.env.HOST_URL}${process.env.PORT}${process.env.BASE_URL}/order/success`,
        fail_url: "http://localhost:3030/fail",
        cancel_url: "http://localhost:3030/cancel",
        ipn_url: "http://localhost:3030/ipn",
        shipping_method: "Courier",
        product_name: "Computer.",
        product_category: "Electronic",
        product_profile: "general",
        cus_name: "Customer Name",
        cus_email: "customer@example.com",
        cus_add1: address,
        cus_add2: address,
        cus_city: city,
        cus_state: city,
        cus_postcode: "1000",
        cus_country: "Bangladesh",
        cus_phone: phone,
        cus_fax: phone,
        ship_name: "Customer Name",
        ship_add1: address,
        ship_add2: address,
        ship_city: city,
        ship_state: city,
        ship_postcode: 1000,
        ship_country: "Bangladesh",
      };

      if (paymentMethod == "COD") {
        return res.status(201).send({
          success: true,
          msg: "Order Successful",
          data: order,
        });
      } else if (paymentMethod == "online") {
        let apiRes = await sslcz.init(data);
        return res.status(201).send({
          success: true,
          msg: "Order Successful",
          data: order,
          url: apiRes.GatewayPageURL,
        });
      }
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

/**
 * Success Response
 */
const paymentSuccess = async (req, res) => {
  return res.redirect(`http://localhost:5173/payment/success/`);
};
module.exports = {
  getAllOrders,
  getSingleUserOrder,
  placeOrder,
  paymentSuccess,
};
