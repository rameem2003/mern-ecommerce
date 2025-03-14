const deleteFile = require("../helpers/deleteFile");
const path = require("path");
const bannerModel = require("../models/banner.model");

/**
 * All Banner
 */
const allBanner = async (req, res) => {
  try {
    let banners = await bannerModel.find({});

    res.status(200).send({
      success: true,
      msg: "Banner is fetch success",
      data: banners,
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
 * Add New Banner
 */
const addNewBanner = async (req, res) => {
  const { description } = req.body;
  const { filename } = req.file;

  if (filename) {
    try {
      let banner = new bannerModel({
        banner: `${process.env.HOST_URL}${process.env.PORT}/${filename}`,
        description,
      });

      await banner.save();

      res.status(201).send({
        success: true,
        msg: "New Banner Uploaded",
        data: banner,
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        msg: "Internal Server Error",
        error,
      });
    }
  } else {
    res.status(404).send({
      success: false,
      msg: "Please fill all fields",
    });
  }
};

/**
 * Delete The banner
 */
const deleteBanner = async (req, res) => {
  const { id } = req.params;

  try {
    let banner = await bannerModel.findOneAndDelete({ _id: id });

    let imagePath = banner.banner.split("/");
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
    } else {
      res.status(200).send({
        success: true,
        msg: "Banner Delete Success",
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

module.exports = { allBanner, addNewBanner, deleteBanner };
