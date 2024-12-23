const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authModel = require("../models/auth.model");
const checkEmailValid = require("../helpers/checkEmailValid");

/**
 * user register
 */
const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send({
      msg: "Please Enter All Fields",
    });
  }

  if (password.length < 6) {
    return res.status(400).send({
      msg: "Password Must Be Atleast 6 Characters",
    });
  }

  if (!checkEmailValid(email)) {
    return res.status(400).send({
      msg: "Please Enter Valid Email",
    });
  }

  let existingUser = await authModel.findOne({ email });
  if (existingUser) {
    return res.status(400).send({
      msg: "Email Already Exist",
    });
  }

  try {
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

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({
      msg: "Please Enter All Fields",
    });
  }

  if (!checkEmailValid(email)) {
    return res.status(400).send({
      msg: "Please Enter Valid Email",
    });
  }

  try {
    let user = await authModel.findOne({ email });

    if (!user) {
      return res.status(400).send({
        msg: "User Not Found",
      });
    }

    bcrypt.compare(password, user.password, function (err, result) {
      if (err) {
        console.log(err);
        return res.status(500).send({
          msg: "Something Went Wrong Please Try Again",
          error: err,
        });
      }
      if (result) {
        let token = jwt.sign(
          { email: user.email, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );
        return res.status(200).send({
          msg: "Login Successfully",
          user: { name: user.name, email: user.email, role: user.role },
          token,
        });
      } else {
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

module.exports = { loginUser, registerUser };
