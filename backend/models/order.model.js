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
        cartId: { type: mongoose.Schema.Types.ObjectId, ref: "cart" },
        product: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
        quantity: { type: Number, default: 1 },
      },
    ],
    grandTotal: {
      type: Number,
    },
    transactionID: {
      type: String,
      require: true,
      unique: true,
    },
    paymentMethod: {
      type: String,
      enum: ["COD", "online"],
    },
    paymentStatus: {
      type: String,
      enum: ["paid", "unpaid", "COD"],
      default: "unpaid",
    },
    deliveryStatus: {
      type: String,
      enum: ["pending", "shipping", "delivered"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("order", orderSchema);
