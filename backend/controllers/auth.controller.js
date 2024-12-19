/**
 * user register
 */

const bcrypt = require("bcrypt");
const authModel = require("../models/auth.model");

const registerUser = async (req, res) => {
  const { name, email, password, phone, address } = req.body;

  try {
    bcrypt.hash(
      password,
      parseInt(process.env.SALT),
      async function (err, hash) {
        if (err) {
          console.log(err);
        }
        let user = new authModel({
          name,
          email,
          password: hash, // Store hash in your password DB.
          phone,
          address,
        });
        await user.save();
        res.status(201).send({
          msg: "New User Account Created",
          user,
        });
      }
    );
  } catch (error) {
    res.status(404).send({
      msg: "Something Went Wrong Please Try Again",
      error,
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  res.status(200).send({
    msg: "Login Successfully",
    email,
    password,
  });
};

module.exports = { loginUser, registerUser };
