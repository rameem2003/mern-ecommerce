const cartModel = require("../models/cart.model");

/**
 * Single User Cart
 */

const singleUserCart = async (req, res) => {
  const { id } = req.params;

  try {
    let cartList = await cartModel.find({ user: id });

    res.status(201).send({
      success: true,
      msg: "Cart Fetched Success",
      data: cartList,
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
 * Add to cart
 */
const addToCart = async (req, res) => {
  const { user, product, price, quantity } = req.body;

  try {
    const cart = new cartModel({
      user,
      product,
      price,
      quantity,
    });

    await cart.save();

    res.status(201).send({
      success: true,
      msg: "Product added to cart",
      data: cart,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      msg: "Internal Server Error",
      error,
    });
  }
};

module.exports = { addToCart, singleUserCart };
