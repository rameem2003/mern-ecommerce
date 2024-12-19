const { default: mongoose } = require("mongoose");

const authSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: [true, "Email Already Exist"],
    },
    password: {
      type: String,
      require: true,
    },
    otp: {
      type: Number,
    },
    phone: {
      type: String,
      unique: [true, "Phone Number Already Exist"],
    },
    address: {
      type: String,
    },
    photo: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("auth", authSchema);
