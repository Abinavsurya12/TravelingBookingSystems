import React, { useState } from "react";
import axios from "axios";

const BookingForm = ({ pkg, onClose }) => {
  const [form, setForm] = useState({
    userName: "",
    userEmail: "",
    travelDate: "",
    noOfPeople: 1,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/bookings", {
        ...form,
        packageId: pkg._id,
      });
      alert("✅ Booking Successful!");
      onClose();
    } catch (err) {
      console.error("Booking error:", err);
      alert("❌ Booking Failed");
    }
  };

  return (
    <div className="booking-form">
      <h3>Book {pkg.title}</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" name="userName" placeholder="Your Name" onChange={handleChange} required />
        <input type="email" name="userEmail" placeholder="Your Email" onChange={handleChange} required />
        <input type="date" name="travelDate" onChange={handleChange} required />
        <input type="number" name="noOfPeople" placeholder="No. of People" onChange={handleChange} min="1" required />
        <button type="submit">Confirm Booking</button>
      </form>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default BookingForm;
