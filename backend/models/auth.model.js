const { default: mongoose } = require("mongoose");

const authSchema = new mongoose.Schema({});

module.exports = mongoose.model("auth", authSchema);
