import React from "react";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import "./ContactUs.css";
import { Link } from 'react-router-dom';

const ContactUs = () => {
  return (
    <>
      <div className="background-contact">
        <section className="contact-section">
          <div className="contact-container">
            {/* Left Side - Stay Connected */}
            <div className="contact-info">
              <h2>Stay Connected</h2>
              <div className="info-item">
                <FaPhoneAlt className="icon" />
                <a href="tel:+917010815556">7010815556</a>
              </div>
              <div className="info-item">
                <FaEnvelope className="icon" />
                <a href="mailto:abinavsuryapm@gmail.com">abinavsuryapm@gmail.com</a>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="contact-form">
              <h2>Book Your Dream Vacay Today!</h2>
              <form method="post" encType="multipart/form-data" action="/enquiry">
                <input type="text" placeholder="Name *" name="name" required />
                <input type="text" placeholder="City of Residence *" name="city" required />
                <input type="email" placeholder="Email *" name="email" required />
                <input type="tel" placeholder="Phone Number *" name="PhoneNumber" required />
                <input type="text" placeholder="WhatsApp" />
                <input type="text" placeholder="Travel Destination *" name="TravelDestination" required />
                <input type="date" placeholder="Date of Travel *" required />
                <input type="number" placeholder="No. of People * " name="NoOfPeople" required />
                <input type="text" placeholder="Vacation Type *" name="vacationtype" required />
                <button type="submit" className="submit-btn">ENQUIRE NOW</button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ContactUs;
