const deleteFile = require("../helpers/deleteFile");
const path = require("path");
const categoryModel = require("../models/category.model");
const productModel = require("../models/product.model");
const storeModel = require("../models/store.model");

/**
 * All Products
 */
const allProducts = async (req, res) => {
  try {
    let allProduct = await productModel.find().populate("category");
    res.status(200).send({
      success: true,
      msg: "All Products Fetched Success",
      data: allProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "Internal Server Error",
      error,
    });
  }
};

/**
 * Single Product
 */
const singleProduct = async (req, res) => {
  const { id } = req.params;
  try {
    let product = await productModel.findOne({ _id: id });
    res.status(200).send({
      success: true,
      msg: "Product Fetched Success",
      data: product,
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
 * Create New Product
 */
const createNewProduct = async (req, res) => {
  const {
    name,
    description,
    sellingPrice,
    discountPrice,
    stock,
    category,
    store,
    ratings,
    reviews,
  } = req.body;

  const imagesLink = req.files.map(
    (file) => `${process.env.HOST_URL}${process.env.PORT}/${file.filename}`
  );

  try {
    const newProduct = new productModel({
      name,
      description,
      sellingPrice,
      discountPrice,
      stock,
      store,
      category,
      ratings,
      reviews,
      images: imagesLink,
    });

    await newProduct.save();

    await categoryModel.findOneAndUpdate(
      { _id: category },
      { $push: { products: newProduct._id } },
      { new: true }
    );

    // await storeModel.findOneAndUpdate(
    //   { _id: store },
    //   {
    //     $push: {
    //       products: newProduct._id,
    //     },
    //   },
    //   { new: true }
    // );

    res.status(201).send({
      success: true,
      msg: "New Product",
      newProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "Internal Server Error",
      error,
    });
  }
};

/**
 * Update Product
 */
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const updateFields = {};

  // Extract only the fields that are present in the request body
  const fields = [
    "name",
    "description",
    "sellingPrice",
    "discountPrice",
    "stock",
    "category",
    "store",
    "ratings",
    "reviews",
  ];

  fields.forEach((field) => {
    if (req.body[field] !== undefined) {
      updateFields[field] = req.body[field];
    }
  });

  // Handle images separately if they are present in the request
  if (req.files && req.files.length > 0) {
    const imagesLink = req.files.map(
      (file) => `${process.env.HOST_URL}${process.env.PORT}/${file.filename}`
    );
    updateFields.images = imagesLink;
  }

  try {
    const targetProduct = await productModel.findOneAndUpdate(
      { _id: id },
      {
        $set: updateFields,
      }
    );

    // If images were updated, delete the old images
    if (updateFields.images) {
      let productImages = targetProduct.images;

      productImages.forEach((item) => {
        let imagePath = item.split("/");
        let oldImagePath = imagePath[imagePath.length - 1];

        let fileDeleteErr = deleteFile(
          `${path.join(__dirname, "../temp")}/${oldImagePath}`
        );

        if (fileDeleteErr) {
          return res.status(500).send({
            success: false,
            msg: "Internal Server Error",
            fileDeleteErr,
          });
        }
      });
    }

    res.status(200).send({
      success: true,
      msg: "Product is update",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "Internal Server Error",
      error,
    });
  }
};

/**
 * Product Delete
 */
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    let targetProduct = await productModel.findByIdAndDelete({ _id: id });

    let productImages = targetProduct.images;

    productImages.forEach((item) => {
      let imagePath = item.split("/");
      let oldImagePath = imagePath[imagePath.length - 1];

      let fileDeleteErr = deleteFile(
        `${path.join(__dirname, "../temp")}/${oldImagePath}`
      );

      if (fileDeleteErr) {
        return res.status(500).send({
          success: false,
          msg: "Internal Server Error",
          fileDeleteErr,
        });
      }
    });

    await categoryModel.findByIdAndUpdate(
      {
        _id: targetProduct.category,
      },
      {
        $pull: {
          products: targetProduct._id,
        },
      }
    );

    if (targetProduct.store) {
      await storeModel.findByIdAndUpdate(
        {
          _id: targetProduct.store,
        },
        {
          $pull: {
            products: targetProduct._id,
          },
        }
      );
    }

    res.status(200).send({
      success: true,
      msg: "Product Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "Internal Server Error",
      error,
    });
  }
};

module.exports = {
  allProducts,
  singleProduct,
  createNewProduct,
  updateProduct,
  deleteProduct,
};
