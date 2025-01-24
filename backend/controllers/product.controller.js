const categoryModel = require("../models/category.model");
const productModel = require("../models/product.model");
const storeModel = require("../models/store.model");

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

    await storeModel.findOneAndUpdate(
      { _id: store },
      {
        $push: {
          products: newProduct._id,
        },
      },
      { new: true }
    );

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

module.exports = { createNewProduct };
