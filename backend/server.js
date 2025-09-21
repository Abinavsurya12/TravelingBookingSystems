require("dotenv").config(); // 🟢 This must be at top

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const bookingsRoute = require("./routes/bookings");
const authRoute = require("./routes/auth");
const packagesRoute = require("./routes/packages");
const paymentRoutes = require("./routes/payments"); // 🟢 Payments route

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Serve uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoute);
app.use("/api/packages", packagesRoute);
app.use("/api/bookings", bookingsRoute);
app.use("/api/payments", paymentRoutes); // 🟢 Stripe payments

// DB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
