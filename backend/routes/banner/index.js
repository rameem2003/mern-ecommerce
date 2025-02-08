const {
  addNewBanner,
  deleteBanner,
  allBanner,
} = require("../../controllers/banner.controller");
const checkAdminMiddleware = require("../../middlewares/checkAdminMiddleware");
const errorHandleMiddleware = require("../../middlewares/errorHandleMiddleware");
const upload = require("../../middlewares/fileupload");

const router = require("express").Router();

/**
 * http://localhost:5000/api/v1/banner/all
 */
router.get("/banner/all", allBanner);

/**
 * http://localhost:5000/api/v1/banner/create
 */
router.post(
  "/banner/create",
  checkAdminMiddleware,
  upload.single("banner"),
  errorHandleMiddleware,
  addNewBanner
);

/**
 * http://localhost:5000/api/v1/banner/delete/:id
 */
router.delete("/banner/delete/:id", checkAdminMiddleware, deleteBanner);

module.exports = router;
