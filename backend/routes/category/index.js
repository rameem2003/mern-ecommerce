const { createNewCategory } = require("../../controllers/category.controller");
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

module.exports = router;
