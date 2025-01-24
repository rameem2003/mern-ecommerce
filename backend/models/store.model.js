const { default: mongoose } = require("mongoose");

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Store name is required"],
    trim: true,
  },
  description: String,
  image: {
    type: String,
    require: true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
  ],
});

module.exports = mongoose.model("store", storeSchema);
