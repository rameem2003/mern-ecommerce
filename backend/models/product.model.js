const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Product name is required"],
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    images: {
      type: Array,
      require: true,
    },
    sellingPrice: {
      type: Number,
      require: true,
    },
    discountPrice: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      require: true,
    },
    ratings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "rating",
      },
    ],
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "review",
      },
    ],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("product", productSchema);
