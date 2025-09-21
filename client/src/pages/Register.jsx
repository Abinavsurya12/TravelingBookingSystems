import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "user", // default role
  });

  const navigate = useNavigate();

  // handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle registration
  const handleRegister = async (e) => {
    e.preventDefault();

    // basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const payload = {
        username: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
        role: formData.role
      };

      const res = await axios.post("http://localhost:5000/api/auth/register", payload);

      if (res.data.error) {
        alert(res.data.error);
        return;
      }

      alert(res.data.message || "Registration successful");

      // save role to localStorage
      localStorage.setItem("role", formData.role);

      // redirect based on role
      if (formData.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    } catch (err) {
      console.error(err.response || err);
      alert(err.response?.data?.error || "Registration failed. Try again.");
    }
  };

  return (
    <section className="background-radial-gradient overflow-hidden">
      <div className="container px-4 py-5 text-center">
        <div className="card bg-glass">
          <h2>Register Form</h2>
          <div className="card-body">
            <form onSubmit={handleRegister}>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className="form-control mb-3"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="form-control mb-3"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="form-control mb-3"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="form-control mb-3"
                value={formData.password}
                onChange={handleChange}
                required
              />

              {/* Role select */}
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="form-control mb-3"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>

              <button type="submit" className="btn btn-primary w-100">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
