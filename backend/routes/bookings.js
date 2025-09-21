const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// 📌 Get all bookings (latest first)
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("packageId", "title price") // join pakkage details
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Fetch error" });
  }
});

// 📌 Create new booking
router.post("/", async (req, res) => {
  try {
    const { userName, packageId, packageTitle, amount } = req.body;

    if (!userName || !packageId || !packageTitle || !amount) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const booking = new Booking({ userName, packageId, packageTitle, amount });
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: "Create error" });
  }
});

// 📌 Update booking status (confirm / cancel)
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;
    if (!["pending", "confirmed", "cancelled"].includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const updated = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "Booking not found" });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Update error" });
  }
});

// 📌 Delete booking (optional)
router.delete("/:id", async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Delete error" });
  }
});

module.exports = router;
