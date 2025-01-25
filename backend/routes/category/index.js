const {
  createNewCategory,
  deleteCategory,
} = require("../../controllers/category.controller");
const errorHandleMiddleware = require("../../middlewares/errorHandleMiddleware");
const upload = require("../../middlewares/fileupload");

const router = require("express").Router();

/**
 * http://localhost:5000/api/v1/category/create
 */
router.post(
  "/category/create",
  upload.single("image"),
  errorHandleMiddleware,
  createNewCategory
);

/**
 * http://localhost:5000/api/v1/category/delete/:id
 */
router.delete("/category/delete/:id", deleteCategory);

module.exports = router;
