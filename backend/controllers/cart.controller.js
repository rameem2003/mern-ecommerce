const cartModel = require("../models/cart.model");

/**
 * Single User Cart
 */

const singleUserCart = async (req, res) => {
  const { id } = req.params;

  try {
    let cartList = await cartModel.find({ user: id }).populate("product");

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
  const { user, product, quantity } = req.body;

  try {
    const cart = new cartModel({
      user,
      product,
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

/**
 * Increment Cart Item
 */
const incrementCartItem = async (req, res) => {
  const { id } = req.params;

  try {
    let item = await cartModel.findOne({ _id: id }).populate("product");

    if (item.quantity < item.product.stock) {
      item.quantity++;

      await item.save();
      res.status(200).send({
        success: true,
        msg: "Cart Item Quantity Increment",
        data: item,
      });
    } else {
      res.status(404).send({
        success: false,
        msg: "Stock Limit Reached",
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
 * Decrement Cart
 */
const decrementCartItem = async (req, res) => {
  const { id } = req.params;
  try {
    let item = await cartModel.findOne({ _id: id }).populate("product");

    if (item.quantity > 1) {
      item.quantity--;
      await item.save();
      res.status(200).send({
        success: true,
        msg: "Cart Item Quantity Decrement",
        data: item,
      });
    } else {
      res.status(404).send({
        success: false,
        msg: "You have to stay with One Item",
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
 * delete cart
 */
const deleteCartItem = async (req, res) => {
  const { id } = req.params;
  try {
    let item = await cartModel.findByIdAndDelete({ _id: id });

    if (item) {
      res.status(200).send({
        success: true,
        msg: "Cart Item Deleted",
        data: item,
      });
    } else {
      res.status(404).send({
        success: false,
        msg: "Cart Item Not Found",
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

module.exports = {
  addToCart,
  singleUserCart,
  incrementCartItem,
  decrementCartItem,
  deleteCartItem,
};
