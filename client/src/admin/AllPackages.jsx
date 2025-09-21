import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AllPackages.css";

const AllPackages = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/packages");
        setPackages(res.data);
      } catch (err) {
        console.error("Error fetching packages:", err);
      }
    };
    fetchPackages();
  }, []);

  return (
    <div className="packages-container">
      <h2>Available Travel Packages</h2>
      <div className="package-list">
        {packages.length === 0 ? (
          <p>No packages found.</p>
        ) : (
          packages.map((p) => (
            <div key={p._id} className="package-card">
              {p.image && (
                <img
                  src={`http://localhost:5000/${p.image}`} 
                  alt={p.title}
                  className="package-img"
                />
              )}
              <h3>{p.title}</h3>
              <p>{p.description}</p>

              {/* 🔥 Price and Days combined in one line */}
              <p>₹{p.price} | {p.days} days</p>

              <button className="book-btn">Book Now</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllPackages;
