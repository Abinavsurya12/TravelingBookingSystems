import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Admin.css";

const API = "http://localhost:5000/api/bookings";

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(API);
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  return (
    <div className="bookings-section">
      <h2>All Bookings</h2>
      <table className="bookings-table">
        <thead>
          <tr>
            <th>#</th>
            <th>User</th>
            <th>Package</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            bookings.map((b, i) => (
              <tr key={b._id}>
                <td>{i + 1}</td>
                <td>{b.userName || "N/A"}</td>
                <td>{b.packageTitle || "N/A"}</td>
                <td>{new Date(b.createdAt).toLocaleDateString()}</td>
                <td
                  className={
                    b.status === "confirmed"
                      ? "status-confirmed"
                      : b.status === "cancelled"
                      ? "status-cancelled"
                      : "status-pending"
                  }
                >
                  {b.status}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No Bookings Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllBookings;
