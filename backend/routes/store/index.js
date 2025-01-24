const { createNewStore } = require("../../controllers/store.controller");
const errorHandleMiddleware = require("../../middlewares/errorHandleMiddleware");
const upload = require("../../middlewares/fileupload");

const router = require("express").Router();

/**
 * http://localhost:5000/api/v1/store/create
 */

router.post(
  "/store/create",
  upload.single("image"),
  errorHandleMiddleware,
  createNewStore
);

module.exports = router;
