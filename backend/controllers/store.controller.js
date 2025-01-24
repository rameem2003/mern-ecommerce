const storeModel = require("../models/store.model");
/**
 * Create New Store
 */

const createNewStore = async (req, res) => {
  const { name, description } = req.body;
  const { filename } = req.file;

  try {
    const newStore = new storeModel({
      name,
      description,
      image: `${process.env.HOST_URL}${process.env.PORT}/${filename}`,
    });

    await newStore.save();

    res.status(201).send({
      success: true,
      msg: "New Store Created",
      newStore,
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

module.exports = { createNewStore };
