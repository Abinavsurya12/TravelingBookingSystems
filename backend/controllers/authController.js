// backend/controllers/authController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// User Register
exports.register = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // check user already
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ email, password: hashedPassword, role: role || "user" });
    await user.save();

    res.json({ success: true, message: "Registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// User Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      "mysecret", // secret key
      { expiresIn: "1h" }
    );

    res.json({ success: true, token, role: user.role, message: "Login successful" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
