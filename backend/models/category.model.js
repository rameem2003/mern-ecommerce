const { default: mongoose } = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Category name is required"],
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    thumb: {
      type: String,
      require: true,
    },

    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("category", categorySchema);
