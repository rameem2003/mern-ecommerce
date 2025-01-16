const { createNewCategory } = require("../../controllers/category.controller");

const router = require("express").Router();

/**
 * http://localhost:5000/api/v1/category/create
 */

router.post("/category/create", createNewCategory);

module.exports = router;
