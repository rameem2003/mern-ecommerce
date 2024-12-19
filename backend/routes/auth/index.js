const {
  registerUser,
  loginUser,
} = require("../../controllers/auth.controller");

const router = require("express").Router();

/**
 * Register Route
 *  http://localhost:5000/api/v1/auth/register
 */
router.post("/auth/register", registerUser);
/**
 * Login Route
 *  http://localhost:5000/api/v1/auth/login
 */
router.post("/auth/login", loginUser);

module.exports = router;
