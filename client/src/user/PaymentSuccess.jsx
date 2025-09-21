import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./UserPackages.css";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!bookingId) {
      setLoading(false);
      return;
    }
    const confirmBooking = async () => {
      try {
        // mark booking as confirmed
        await axios.put(`http://localhost:5000/api/bookings/${bookingId}`, {
          status: "confirmed",
        });
      } catch (err) {
        console.error("Failed to update booking status:", err);
      } finally {
        setLoading(false);
      }
    };
    confirmBooking();
  }, [bookingId]);

  return (
    <div className="payment-result">
      <div className="card">
        <h2>Payment Successful</h2>
        {loading ? (
          <p>Confirming booking... please wait.</p>
        ) : (
          <>
            <p>Your payment was successful — booking confirmed.</p>
            <button onClick={() => navigate("/all-packages")}>
  ✈️ Explore More Trips
</button>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;
