const {
  createNewCategory,
  deleteCategory,
  singleCategory,
  allCategory,
  updateCategory,
} = require("../../controllers/category.controller");
const checkAdminMiddleware = require("../../middlewares/checkAdminMiddleware");
const errorHandleMiddleware = require("../../middlewares/errorHandleMiddleware");
const upload = require("../../middlewares/fileupload");

const router = require("express").Router();

/**
 * http://localhost:5000/api/v1/category/all
 */
router.get("/category/all", allCategory);

/**
 * http://localhost:5000/api/v1/category/single/:id
 */
router.get("/category/single/:id", singleCategory);

/**
 * http://localhost:5000/api/v1/category/create
 */
router.post(
  "/category/create",
  checkAdminMiddleware,
  upload.single("image"),
  errorHandleMiddleware,
  createNewCategory
);

/**
 * http://localhost:5000/api/v1/category/update
 */
router.patch(
  "/category/update/:id",
  checkAdminMiddleware,
  upload.single("image"),
  errorHandleMiddleware,
  updateCategory
);

/**
 * http://localhost:5000/api/v1/category/delete/:id
 */
router.delete("/category/delete/:id", checkAdminMiddleware, deleteCategory);

module.exports = router;
