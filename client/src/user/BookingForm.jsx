import React, { useState } from "react";
import axios from "axios";
import "./UserPackages.css";

const BookingForm = ({ pkg, onClose }) => {
  const [form, setForm] = useState({
    userName: "",
    userEmail: "",
    travelDate: "",
    noOfPeople: 1,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 1) Create provisional booking -> returns booking._id (status: pending)
  // 2) Request Stripe Checkout session from backend with bookingId and amount
  // 3) Redirect browser to session.url
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 1) create booking (pending)
      const createRes = await axios.post("http://localhost:5000/api/bookings", {
        userName: form.userName,
        userEmail: form.userEmail,
        packageId: pkg._id,
        packageTitle: pkg.title,
        amount: pkg.price,
        // optional: travelDate, noOfPeople
        travelDate: form.travelDate,
        noOfPeople: form.noOfPeople,
      });

      const booking = createRes.data;
      const bookingId = booking._id;

      // 2) request checkout session from backend
      // Backend expected: POST /api/payments/create-checkout-session
      // body: { bookingId, packageTitle, amount }
     const checkoutRes = await axios.post(
  "http://localhost:5000/api/payments/create-checkout-session",
  {
    bookingId,
    packageTitle: pkg.title,   // ✅ use pkg not selectedPackage
    amount: pkg.price,
    successUrl: `${window.location.origin}/payment-success?bookingId=${bookingId}`,
    cancelUrl: `${window.location.origin}/payment-cancel?bookingId=${bookingId}`,
  }
);

const { url } = checkoutRes.data;
if (!url) throw new Error("No checkout url returned from server");
window.location.href = url;

    } catch (err) {
      console.error("Booking/payment init error:", err);
      alert("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="booking-overlay">
      <div className="booking-modal">
        <h2>Book: {pkg.title}</h2>
        <form onSubmit={handleSubmit} className="booking-form">
          <input
            type="text"
            name="userName"
            placeholder="Your Name"
            value={form.userName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="userEmail"
            placeholder="Your Email"
            value={form.userEmail}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="travelDate"
            value={form.travelDate}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="noOfPeople"
            min="1"
            value={form.noOfPeople}
            onChange={handleChange}
            required
          />

          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <button
              type="submit"
              className="confirm-btn"
              disabled={loading}
            >
              {loading ? "Please wait..." : `Pay ₹${pkg.price}`}
            </button>

            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
