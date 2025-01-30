const deleteFile = require("../helpers/deleteFile");
const path = require("path");
const categoryModel = require("../models/category.model");

/**
 * All Categories
 */
const allCategory = async (req, res) => {
  try {
    let allCategory = await categoryModel.find();
    res.status(200).send({
      success: true,
      msg: "All Category Fetched Success",
      data: allCategory,
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
 * Create new category
 */
const createNewCategory = async (req, res) => {
  const { name, description } = req.body;
  const { filename } = req.file;

  if (name && filename) {
    try {
      let newCategory = new categoryModel({
        name,
        description,
        thumb: `${process.env.HOST_URL}${process.env.PORT}/${filename}`,
      });

      await newCategory.save();

      res.status(201).send({
        msg: "New Category",
        newCategory,
      });
    } catch (error) {
      res.status(500).send({
        msg: "Internal Server Error",
        error,
      });
    }
  } else {
    res.status(404).send({
      msg: "Please fill all fields",
    });
  }
};

/**
 * Single Category
 */
const singleCategory = async (req, res) => {
  const { id } = req.params;
  try {
    let category = await categoryModel.findOne({ _id: id });
    res.status(200).send({
      success: true,
      msg: "Category Fetched Success",
      data: category,
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
 * Update Category
 */

const updateCategory = async (req, res) => {
  const { id } = req.params;

  let { name, description } = req.body;
  const image = req.file;
  const { filename } = image;

  try {
    const targetCategory = await categoryModel.findOneAndUpdate(
      { _id: id },
      {
        name,
        description,
        thumb: `${process.env.HOST_URL}${process.env.PORT}/${filename}`,
      }
    );

    let imagePath = targetCategory.thumb.split("/");
    let oldimage = imagePath[imagePath.length - 1];

    let fileDeleteErr = deleteFile(
      `${path.join(__dirname, "../temp")}/${oldimage}`
    );

    if (fileDeleteErr) {
      res.status(500).send({
        success: false,
        msg: "Internal Server Error",
        fileDeleteErr,
      });
    } else {
      res.status(200).send({
        success: true,
        msg: "Category is update",
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
 * Delete category
 */
const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    let category = await categoryModel.findOneAndDelete({ _id: id });
    let imagePath = category.thumb.split("/");
    let oldimage = imagePath[imagePath.length - 1];

    let fileDeleteErr = deleteFile(
      `${path.join(__dirname, "../temp")}/${oldimage}`
    );

    if (fileDeleteErr) {
      res.status(500).send({
        success: false,
        msg: "Internal Server Error",
        fileDeleteErr,
      });
    } else {
      res.status(200).send({
        success: true,
        msg: "Category deleted",
        data: category,
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
  allCategory,
  createNewCategory,
  singleCategory,
  updateCategory,
  deleteCategory,
};
