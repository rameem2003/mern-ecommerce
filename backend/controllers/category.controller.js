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

module.exports = { createNewCategory };
