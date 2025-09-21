const mongoose = require("mongoose");

const PackageSchema = new mongoose.Schema({
  title: { type: String, required: true },
 
  price: { type: Number, required: true },
  days: { type: Number, required: true }, // 🔥 Added field
  image: { type: String }, // optional
});

module.exports = mongoose.model("Package", PackageSchema);
