const {
  createNewProduct,
  deleteProduct,
} = require("../../controllers/product.controller");
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

/**
 * http://localhost:5000/api/v1/product/delete
 */
router.delete("/product/delete/:id", deleteProduct);

module.exports = router;
