const categoryModel = require("../models/category.model");
/**
 * Create new category
 */

const createNewCategory = async (req, res) => {
  const { name, description, image } = req.body;

  if (name && image) {
    try {
      let newCategory = new categoryModel({ name, description, thumb: image });

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
