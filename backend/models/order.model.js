const { default: mongoose } = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth",
    },
    address: {
      type: String,
      require: true,
    },
    city: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      require: true,
    },
    cartItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "cart",
      },
    ],
    grandTotal: {
      type: Number,
    },
    paymentMethod: {
      type: String,
      enum: ["COD", "online"],
    },
    paymentStatus: {
      type: String,
      enum: ["paid", "unpaid"],
      default: "unpaid",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("order", orderSchema);
