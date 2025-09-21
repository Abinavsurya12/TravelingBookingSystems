import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Admin.css";

const API = "http://localhost:5000/api/packages";

const AdminPanel = () => {
  const [packages, setPackages] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    days: "",
    imageFile: null,
    imagePreview: "",
  });
  const [editId, setEditId] = useState(null);

  // 📌 Fetch all packages from DB
  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const res = await axios.get(API);
      setPackages(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  // 📌 Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files.length > 0) {
      setFormData({
        ...formData,
        imageFile: files[0],
        imagePreview: URL.createObjectURL(files[0]),
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // 📌 Submit form (Add or Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("days", formData.days);
      if (formData.imageFile) data.append("image", formData.imageFile);

      if (editId) {
        // Update package
        await axios.put(`${API}/${editId}`, data);
      } else {
        // Add new package
        await axios.post(API, data);
      }

      await fetchPackages(); // Refresh table immediately
      resetForm();
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  // 📌 Reset form
  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      price: "",
      days: "",
      imageFile: null,
      imagePreview: "",
    });
    setEditId(null);
  };

  // 📌 Edit package
  const handleEdit = (pkg) => {
    setFormData({
      title: pkg.title,
      description: pkg.description,
      price: pkg.price,
      days: pkg.days,
      imageFile: null,
      imagePreview: pkg.image,
    });
    setEditId(pkg._id);
  };

  // 📌 Delete package
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this package?")) {
      try {
        await axios.delete(`${API}/${id}`);
        await fetchPackages();
      } catch (err) {
        console.error("Delete error:", err);
      }
    }
  };

  return (
    <div className="admin-container">
      <div className="content">

        {/* Form Section */}
        <div className="form-section">
          <h2>{editId ? "Edit Package" : "Add Package"}</h2>
          <form onSubmit={handleSubmit} className="package-form">
            <input
              type="text"
              name="title"
              placeholder="Package Title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
            <input
              type="number"
              name="price"
              placeholder="Price (₹)"
              value={formData.price}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="days"
              placeholder="Number of Days"
              value={formData.days}
              onChange={handleChange}
              required
            />
            <input type="file" name="image" onChange={handleChange} />

            {/* Preview Image */}
            {formData.imagePreview && (
              <img
                src={
                  formData.imagePreview.startsWith("/uploads/")
                    ? `http://localhost:5000${formData.imagePreview}`
                    : formData.imagePreview
                }
                alt="Preview"
                className="preview-img"
              />
            )}

            <button type="submit" className="submit-btn">
              {editId ? "Update Package" : "Add Package"}
            </button>
          </form>
        </div>

        {/* Table Section */}
        <div className="table-section">
          <h2>All Packages</h2>
          <table>
            <thead>
              <tr>
                <th>SL No</th>
                <th>Image</th>
                <th>Title</th>
                <th>Description</th>
                <th>Price</th>
                <th>Days</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {packages.length > 0 ? (
                packages.map((pkg, index) => (
                  <tr key={pkg._id}>
                    <td>{index + 1}</td>
                    <td>
                      {pkg.image && (
                        <img
                          src={`http://localhost:5000/${pkg.image}`} 
                          alt={pkg.title}
                          width="60"
                        />
                      )}
                    </td>
                    <td>{pkg.title}</td>
                    <td>{pkg.description}</td>
                    <td>₹{pkg.price}</td>
                    <td>{pkg.days}</td>
                    <td>
                      <button onClick={() => handleEdit(pkg)} className="edit-btn">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(pkg._id)} className="delete-btn">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No Packages Added Yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default AdminPanel;
