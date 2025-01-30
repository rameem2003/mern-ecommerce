const {
  createNewProduct,
  deleteProduct,
  updateProduct,
  allProducts,
  singleProduct,
} = require("../../controllers/product.controller");
const errorHandleMiddleware = require("../../middlewares/errorHandleMiddleware");
const upload = require("../../middlewares/fileupload");

const router = require("express").Router();

/**
 * http://localhost:5000/api/v1/product/all
 */
router.get("/product/all", allProducts);

/**
 * http://localhost:5000/api/v1/product/single/:id
 */
router.get("/product/single/:id", singleProduct);

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
 * http://localhost:5000/api/v1/product/update/:id
 */
router.patch(
  "/product/update/:id",
  upload.array("images"),
  errorHandleMiddleware,
  updateProduct
);

/**
 * http://localhost:5000/api/v1/product/delete
 */
router.delete("/product/delete/:id", deleteProduct);

module.exports = router;
