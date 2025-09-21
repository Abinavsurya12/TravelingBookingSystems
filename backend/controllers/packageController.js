const Package = require("../models/Package");

// ✅ Get all packages
exports.getPackages = async (req, res) => {
  try {
    const packages = await Package.find().sort({ createdAt: -1 });
    res.json(packages);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Add new package
exports.addPackage = async (req, res) => {
  try {
    const { name, location, duration, price, categories } = req.body;
    if (!req.file) return res.status(400).json({ message: "Image required" });

    const newPackage = new Package({
      name,
      location,
      duration,
      price,
      categories,
      img: `/uploads/${req.file.filename}`,
    });

    await newPackage.save();
    res.status(201).json({ message: "Package added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Update package
exports.updatePackage = async (req, res) => {
  try {
    const { id } = req.params;
    let updateData = { ...req.body };

    if (req.file) {
      updateData.img = `/uploads/${req.file.filename}`;
    }

    const updated = await Package.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Package not found" });

    res.json({ message: "Package updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Delete package
exports.deletePackage = async (req, res) => {
  try {
    const { id } = req.params;
    await Package.findByIdAndDelete(id);
    res.json({ message: "Package deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
