// backend/routes/payments.js
const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config(); // 🟢 Load .env

// 🟢 Initialize Stripe with secret key
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// ✅ Debugging log
console.log("Stripe Key Loaded:", process.env.STRIPE_SECRET_KEY ? "YES" : "NO");

// 🟢 Create Checkout Session
router.post("/create-checkout-session", async (req, res) => {
  try {
    const { bookingId, packageTitle, amount, successUrl, cancelUrl } = req.body;

    console.log("📥 Request Body:", req.body);

    if (!amount || isNaN(amount)) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: { name: packageTitle || "Travel Package" },
            unit_amount: Math.round(amount * 100), // Stripe expects paise
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: successUrl || "http://localhost:5173/payment-success",
      cancel_url: cancelUrl || "http://localhost:5173/payment-cancel",
      metadata: { bookingId },
    });

    console.log("✅ Stripe Session Created:", session.id);

    res.json({ url: session.url });
  } catch (err) {
    console.error("❌ Stripe Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
