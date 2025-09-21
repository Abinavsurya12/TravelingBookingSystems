import React, { useEffect, useState } from "react";
import axios from "axios";
import BookingForm from "./BookingForm";
import "./UserPackages.css";

const UserAllPackages = () => {
  const [packages, setPackages] = useState([]);
  const [selectedPkg, setSelectedPkg] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/packages")
      .then((res) => setPackages(res.data))
      .catch((err) => console.error("Error fetching packages:", err));
  }, []);

  return (
    <div className="user-packages-container">
      <h2 className="user-packages-title">Available Packages</h2>
      <div className="user-packages-grid">
        {packages.map((pkg) => (
          <div key={pkg._id} className="user-package-card">
            <img
              src={pkg.image ? `http://localhost:5000/${pkg.image}` : "/placeholder.jpg"}
              alt={pkg.title}
              className="user-package-image"
            />
            <div className="user-package-content">
              <h3>{pkg.title}</h3>
              <p>{pkg.description}</p>
              <div className="user-package-meta">
                <span className="user-package-price">₹{pkg.price}</span>
                <span className="user-package-days">{pkg.days} days</span>
              </div>
              <button className="book-btn" onClick={() => setSelectedPkg(pkg)}>
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedPkg && (
        <BookingForm
          pkg={selectedPkg}
          onClose={() => setSelectedPkg(null)}
        />
      )}
    </div>
  );
};

export default UserAllPackages;
