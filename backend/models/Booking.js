const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userName: { type: String, required: true }, // later auth connect panna mudiyum
  packageId: { type: mongoose.Schema.Types.ObjectId, ref: "Package", required: true },
  packageTitle: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Booking", bookingSchema);
