const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authModel = require("../models/auth.model");
const checkEmailValid = require("../helpers/checkEmailValid");
const sendOtpEmail = require("../helpers/sendOtpEmail");
const generateOTP = require("../helpers/generateOTP");

/**
 * user register
 */
const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  // if no name, email, password
  if (!name || !email || !password) {
    return res.status(400).send({
      success: false,
      msg: "Please Enter All Fields",
    });
  }

  // password length is less than 6
  if (password.length < 6) {
    return res.status(400).send({
      success: false,
      msg: "Password Must Be Atleast 6 Characters",
    });
  }

  // if not an email
  if (!checkEmailValid(email)) {
    return res.status(400).send({
      success: false,
      msg: "Please Enter Valid Email",
    });
  }

  // if email is exist
  let existingUser = await authModel.findOne({ email });
  if (existingUser) {
    return res.status(400).send({
      success: false,
      msg: "Email Already Exist",
    });
  }

  // new user create and send response
  try {
    let otp = generateOTP(); // generate an otp

    // hashing the password
    bcrypt.hash(
      password,
      parseInt(process.env.SALT),
      async function (err, hash) {
        if (err) {
          console.log(err);
          return res.status(500).send({
            msg: "Something Went Wrong Please Try Again",
            error: err,
          });
        }
        let user = new authModel({
          name,
          email,
          password: hash, // Store hash in your password DB.
          role,
          otp,
        });
        await user.save();

        sendOtpEmail(email, otp); // send an otp email

        // remove otp after 1 minute
        setTimeout(async () => {
          user.otp = null;
          await user.save();
        }, 60000);
        return res.status(201).send({
          success: true,
          msg: "New User Account Created",
          user,
        });
      }
    );
  } catch (error) {
    return res.status(500).send({
      success: false,
      msg: "Something Went Wrong Please Try Again",
      error,
    });
  }
};

/**
 * user login
 */
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // if no email or password
  if (!email || !password) {
    return res.status(400).send({
      success: false,
      msg: "Please Enter All Fields",
    });
  }

  // if not an email
  if (!checkEmailValid(email)) {
    return res.status(400).send({
      success: false,
      msg: "Please Enter Valid Email",
    });
  }

  // send response, token, cookies
  try {
    let user = await authModel.findOne({ email });

    // if no user
    if (!user) {
      return res.status(400).send({
        success: false,
        msg: "User Not Found",
      });
    }

    // password compare
    bcrypt.compare(password, user.password, async function (err, result) {
      // if password not matched
      if (err) {
        console.log(err);
        return res.status(500).send({
          success: false,
          msg: "Something Went Wrong Please Try Again",
          error: err,
        });
      }
      // if password matched
      if (result) {
        let existUser = {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        };

        // if admin
        if (existUser.role === "admin") {
          let token = jwt.sign(existUser, process.env.JWT_SECRET, {
            expiresIn: "1h",
          });

          res.cookie("token", token, {
            httpOnly: true,
            secure: false,
          });
          return res.status(200).send({
            success: true,
            msg: "Admin Login Successfully",
            user: existUser,
            token,
          });
        }
        // if user
        else if (existUser.role === "user") {
          let token = jwt.sign(existUser, process.env.JWT_SECRET, {
            expiresIn: "1d",
          });

          res.cookie("token", token, {
            httpOnly: true,
            secure: false,
          });
          return res.status(200).send({
            success: true,
            msg: "User Login Successfully",
            user: existUser,
            token,
          });
        }
      } // if password not matched
      else {
        return res.status(400).send({
          success: false,
          msg: "Invalid Credentials",
        });
      }
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      msg: "Something Went Wrong Please Try Again",
      error,
    });
  }
};

/**
 * OTP Verification
 */
const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  const existingUser = await authModel.findOne({ email });

  // if email is found
  if (existingUser) {
    // if otp is matched
    if (existingUser.otp == otp) {
      existingUser.isVarify = true; // change the verify state to true
      await existingUser.save();

      res.status(200).send({
        success: true,
        msg: "Account is verified",
      });
    } else {
      // if otp not matched
      res.status(404).send({
        success: false,
        msg: "Invalid OTP",
      });
    }
  } else {
    // if email is not found
    res.status(404).send({
      success: false,
      msg: "Email is not found",
    });
  }
};

/**
 * Resend OTP to email
 */
const resendOTP = async (req, res) => {
  const { email } = req.body;

  const existingUser = await authModel.findOne({ email });

  // if email is found
  if (existingUser) {
    let otp = generateOTP(); // generate otp

    existingUser.otp = otp;
    await existingUser.save();

    sendOtpEmail(email, otp, (resend = true)); // send an otp email

    // remove otp after 1 minute
    setTimeout(async () => {
      existingUser.otp = null;
      await existingUser.save();
    }, 30000);
    return res.status(201).send({
      success: true,
      msg: "OTP Resend Successful",
    });
  } else {
    // email is not found
    res.status(404).send({
      success: false,
      msg: "Email is not found",
    });
  }
};

/**
 * All Users
 */

const allusers = async (req, res) => {
  let User = await authModel.find();
  res.status(200).send({
    success: true,
    msg: "All Users",
    users: User,
  });
};

module.exports = { loginUser, registerUser, verifyOTP, resendOTP, allusers };
