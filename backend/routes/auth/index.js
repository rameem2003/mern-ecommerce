const {
  registerUser,
  loginUser,
  allusers,
  verifyOTP,
  resendOTP,
  verifyAdmin,
} = require("../../controllers/auth.controller");
const checkAdminMiddleware = require("../../middlewares/checkAdminMiddleware");

const router = require("express").Router();

/**
 * Register Route
 * http://localhost:5000/api/v1/auth/register
 */
router.post("/auth/register", registerUser);

/**
 * Login Route
 * http://localhost:5000/api/v1/auth/login
 */
router.post("/auth/login", loginUser);

/**
 * OTP Verification Route
 * http://localhost:5000/api/v1/auth/otp-verify
 */
router.post("/auth/otp-verify", verifyOTP);

/**
 * OTP Resend Route
 * http://localhost:5000/api/v1/auth/otp-resend
 */
router.post("/auth/otp-resend", resendOTP);

/**
 * Admin Token Validation Check
 * http://localhost:5000/api/v1/auth/verify-admin
 */
router.get("/auth/verify-admin", checkAdminMiddleware, verifyAdmin);

/**
 * Protected User Test Route
 * http://localhost:5000/api/v1/auth/users
 */

router.get("/auth/users", checkAdminMiddleware, allusers);

module.exports = router;
