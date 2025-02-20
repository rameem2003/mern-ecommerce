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
    // cartItems: [ // previous order schema issue
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "cart",
    //   },
    // ],

    cartItems: [
      // Issue fixed
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
        quantity: { type: Number, default: 1 },
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
