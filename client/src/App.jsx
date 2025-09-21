import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import UserAllPackages from "./user/UserAllPackages"; // ✅ User side packages
import Register from "./pages/Register";
import Login from "./pages/Login";
import ContactUs from "./pages/ContactUs";

// Admin Panel
import AdminLayout from "./admin/AdminLayout";
import AddPackage from "./admin/AddPackage";
import AdminAllPackages from "./admin/AllPackages"; // ✅ Admin packages
import AllBookings from "./admin/AllBookings"; // ✅ Admin bookings


import PaymentSuccess from "./user/PaymentSuccess";
import PaymentCancel from "./user/PaymentCancel";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public site layout with Header + Footer */}
        <Route
          path="/*"
          element={
            <>
              <Header />
              <Routes>
                <Route path="/" element={<Navigate to="/home" replace />} />
                <Route path="/home" element={<Home />} />
                <Route path="/all-packages" element={<UserAllPackages />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="*" element={<Navigate to="/home" replace />} />
                <Route path="/payment-success" element={<PaymentSuccess />} />
<Route path="/payment-cancel" element={<PaymentCancel />} />
              </Routes>
              <Footer />
            </>
          }
        />

        {/* Admin panel routes */}
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route path="add-item" element={<AddPackage />} />
          <Route path="library" element={<AdminAllPackages />} />
          <Route path="bookings" element={<AllBookings />} /> {/* 🟢 Added here */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
