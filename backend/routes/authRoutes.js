const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// ---------------------- REGISTER ----------------------
router.post("/register", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            role: req.body.role || "user" // admin or user
        });

        const savedUser = await newUser.save();
        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: savedUser._id,
                username: savedUser.username,
                email: savedUser.email,
                role: savedUser.role
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Registration failed" });
    }
});

// ---------------------- LOGIN ----------------------
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(404).json({ error: "User not found" });

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).json({ error: "Wrong password" });

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Login failed" });
    }
});

module.exports = router;
