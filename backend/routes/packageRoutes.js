const express = require('express');
const router = express.Router();
const Package = require('../routes/packages');

// Get all packages
router.get('/', async (req, res) => {
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new package
router.post('/', async (req, res) => {
  const pkg = new Package(req.body);
  try {
    const newPkg = await pkg.save();
    res.status(201).json(newPkg);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update package
router.put('/:id', async (req, res) => {
  try {
    const updatedPkg = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPkg);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete package
router.delete('/:id', async (req, res) => {
  try {
    await Package.findByIdAndDelete(req.params.id);
    res.json({ message: 'Package deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
