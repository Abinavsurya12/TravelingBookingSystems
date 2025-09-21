import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // login function
  const loginfunc = async (e) => {
    e.preventDefault();

    // basic validation
    if (!formData.email || !formData.password) {
      alert("Please fill both email and password");
      return;
    }

    try {
      setLoading(true);

      // call backend login API
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);

      // check if backend is sending user object
      const user = res.data.user;

      if (!user) {
        alert("Login failed: No user data received");
        return;
      }

      // save role to localStorage
      localStorage.setItem("role", user.role);

      alert(res.data.message || "Login successful");

      // redirect based on role
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    } catch (err) {
      console.error(err.response || err.message);
      alert(err.response?.data?.error || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="background-radial-gradient overflow-hidden">
      <div className="container px-4 py-5 text-center">
        <div className="card bg-glass p-4">
          <h2 className="mb-3">Login Form</h2>
          <form onSubmit={loginfunc}>
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
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <p className="mt-3">
            Don’t have an account?{" "}
            <Link to="/register" className="text-primary fw-bold">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
