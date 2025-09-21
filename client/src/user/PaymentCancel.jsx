import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./UserPackages.css";

const PaymentCancel = () => {
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!bookingId) {
      setLoading(false);
      return;
    }
    const cancelBooking = async () => {
      try {
        await axios.put(`http://localhost:5000/api/bookings/${bookingId}`, {
          status: "cancelled",
        });
      } catch (err) {
        console.error("Failed to update booking status:", err);
      } finally {
        setLoading(false);
      }
    };
    cancelBooking();
  }, [bookingId]);

  return (
    <div className="payment-result">
      <div className="card">
        <h2>Payment Cancelled</h2>
        {loading ? (
          <p>Updating booking... please wait.</p>
        ) : (
          <>
            <p>Your payment was cancelled. Booking not completed.</p>
            <button onClick={() => navigate("/all-packages")}>Back to Packages</button>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentCancel;
