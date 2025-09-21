const express = require("express");
const router = express.Router();
const multer = require("multer");
const Package = require("../models/Package");

// multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// GET all packages
router.get("/", async (req, res) => {
  try {
    const data = await Package.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Fetch error" });
  }
});

// POST add package
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, description, price, days } = req.body;
    const image = req.file ? `uploads/${req.file.filename}` : "";
    const newPackage = new Package({ title, description, price, days, image });
    await newPackage.save();
    res.status(201).json(newPackage);
  } catch (err) {
    res.status(500).json({ error: "Add error" });
  }
});

// PUT update package
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { title, description, price, days } = req.body;
    const updateData = { title, description, price, days };
    if (req.file) updateData.image = `uploads/${req.file.filename}`;
    const updated = await Package.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Update error" });
  }
});

// DELETE package
router.delete("/:id", async (req, res) => {
  try {
    await Package.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Delete error" });
  }
});

module.exports = router;
