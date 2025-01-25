const categoryModel = require("../models/category.model");
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
        msg: "Something went wrong",
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
 * Delete category
 */
const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    await categoryModel.findByIdAndDelete({ _id: id });

    res.status(200).send({
      success: true,
      msg: "Category deleted",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      msg: "Something went wrong",
      error,
    });
  }
};

module.exports = { createNewCategory, deleteCategory };
