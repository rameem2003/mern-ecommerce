const {
  createNewProduct,
  deleteProduct,
  updateProduct,
  allProducts,
  singleProduct,
  getFeaturedProducts,
  getHotSellProducts,
} = require("../../controllers/product.controller");
const checkAdminMiddleware = require("../../middlewares/checkAdminMiddleware");
const errorHandleMiddleware = require("../../middlewares/errorHandleMiddleware");
const upload = require("../../middlewares/fileupload");

const router = require("express").Router();

/**
 * Get all products
 * http://localhost:5000/api/v1/product/all
 */
router.get("/product/all", allProducts);

/**
 * Get all featured products
 * http://localhost:5000/api/v1/product/featured
 */
router.get("/product/featured", getFeaturedProducts);

/**
 * Get all hot sell products
 * http://localhost:5000/api/v1/product/hotsell
 */
router.get("/product/hotsell", getHotSellProducts);

/**
 * Get single product
 * http://localhost:5000/api/v1/product/single/:id
 */
router.get("/product/single/:id", singleProduct);

/**
 * Create new product
 * http://localhost:5000/api/v1/product/create
 */
router.post(
  "/product/create",
  checkAdminMiddleware,
  upload.array("images"),
  errorHandleMiddleware,
  createNewProduct
);

/**
 * Update product
 * http://localhost:5000/api/v1/product/update/:id
 */
router.patch(
  "/product/update/:id",
  checkAdminMiddleware,
  upload.array("images"),
  errorHandleMiddleware,
  updateProduct
);

/**
 * Delete product
 * http://localhost:5000/api/v1/product/delete
 */
router.delete("/product/delete/:id", checkAdminMiddleware, deleteProduct);

module.exports = router;
