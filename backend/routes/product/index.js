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
 * http://localhost:5000/api/v1/product/all
 */
router.get("/product/all", allProducts);

/**
 * http://localhost:5000/api/v1/product/featured
 */
router.get("/product/featured", getFeaturedProducts);

/**
 * http://localhost:5000/api/v1/product/hotsell
 */
router.get("/product/hotsell", getHotSellProducts);

/**
 * http://localhost:5000/api/v1/product/single/:id
 */
router.get("/product/single/:id", singleProduct);

/**
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
 * http://localhost:5000/api/v1/product/delete
 */
router.delete("/product/delete/:id", checkAdminMiddleware, deleteProduct);

module.exports = router;
