const { createNewProduct } = require("../../controllers/product.controller");
const errorHandleMiddleware = require("../../middlewares/errorHandleMiddleware");
const upload = require("../../middlewares/fileupload");

const router = require("express").Router();

/**
 * http://localhost:5000/api/v1/product/create
 */

router.post(
  "/product/create",
  upload.array("images"),
  errorHandleMiddleware,
  createNewProduct
);

module.exports = router;
