const { default: mongoose } = require("mongoose");

const bannerSchema = new mongoose.Schema(
  {
    banner: {
      type: String,
      require: true,
    },
    description: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("banner", bannerSchema);
