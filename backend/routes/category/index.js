const { createNewCategory } = require("../../controllers/category.controller");
const upload = require("../../middlewares/fileupload");

const router = require("express").Router();

/**
 * http://localhost:5000/api/v1/category/create
 */

router.post("/category/create", upload.single("image"), createNewCategory);

module.exports = router;
