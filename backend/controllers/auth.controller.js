const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authModel = require("../models/auth.model");
const checkEmailValid = require("../helpers/checkEmailValid");

/**
 * user register
 */
const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  // if no name, email, password
  if (!name || !email || !password) {
    return res.status(400).send({
      msg: "Please Enter All Fields",
    });
  }

  // password length is less than 6
  if (password.length < 6) {
    return res.status(400).send({
      msg: "Password Must Be Atleast 6 Characters",
    });
  }

  // if not an email
  if (!checkEmailValid(email)) {
    return res.status(400).send({
      msg: "Please Enter Valid Email",
    });
  }

  // if email is exist
  let existingUser = await authModel.findOne({ email });
  if (existingUser) {
    return res.status(400).send({
      msg: "Email Already Exist",
    });
  }

  // new user create and send response
  try {
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
        });
        await user.save();
        return res.status(201).send({
          msg: "New User Account Created",
          user,
        });
      }
    );
  } catch (error) {
    return res.status(500).send({
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
      msg: "Please Enter All Fields",
    });
  }

  // if not an email
  if (!checkEmailValid(email)) {
    return res.status(400).send({
      msg: "Please Enter Valid Email",
    });
  }

  // send response, token, cookies
  try {
    let user = await authModel.findOne({ email });

    // if no user
    if (!user) {
      return res.status(400).send({
        msg: "User Not Found",
      });
    }

    // password compare
    bcrypt.compare(password, user.password, async function (err, result) {
      // if password not matched
      if (err) {
        console.log(err);
        return res.status(500).send({
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
            msg: "User Login Successfully",
            user: existUser,
            token,
          });
        }
      } // if password not matched
      else {
        return res.status(400).send({
          msg: "Invalid Credentials",
        });
      }
    });
  } catch (error) {
    return res.status(500).send({
      msg: "Something Went Wrong Please Try Again",
      error,
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

module.exports = { loginUser, registerUser, allusers };
