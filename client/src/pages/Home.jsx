import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import "./exclusiveOffers.css";
import Packages from "../components/packages";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import emailjs from "emailjs-com";
import { FaStar } from "react-icons/fa";
import TravelBlog from "../components/TravelBlog";






// Component: TravelPackages
const TravelPackages = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    fetch("/trips.json") // Make sure trips.json is in public folder
      .then((response) => response.json())
      .then((data) => setTrips(data))
      .catch((error) => console.error("Error fetching JSON:", error));
  }, []);

  return (
    <section className="packages">
      <h2>Popular Packages</h2>
      <div className="package-grid">
        {trips
          .filter((trip) => trip.reviews === 5 || trip.reviews === 4)
          .map((trip) => (
            <Packages key={trip.id} tripData={trip} />
          ))}
      </div>
    </section>
  );
};

const Home = () => {
  const [trips, setTrips] = useState([]);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_9d1vazr",   // from EmailJS
        "template_djcya4z",  // from EmailJS
        e.target,
        "OfDL303BAo1RPxyrH"    // from EmailJS
      )
      .then(
        (result) => {
          alert("✅ Message sent successfully!");
        },
        (error) => {
          alert("❌ Failed to send message. Try again.");
        }
      );

    e.target.reset(); // clear form
  };

  useEffect(() => {
    fetch("/trips.json")
      .then((response) => response.json())
      .then((data) => setTrips(data))
      .catch((error) => console.error("Error fetching JSON:", error));
  }, []);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Explore the World with TravelBuddy</h1>
          <p>Your dream vacation is just a few clicks away!</p>
          <Link to="/allPackages" className="btn-explore">
            Explore Packages
          </Link>
        </div>
      </section>

      <br />
      <br />

      {/* Popular Packages */}
      <TravelPackages />

      {/* Featured Destinations */}
      <section className="exclusive-offers">
        <div className="container">
          <h1 className="section-title">🌍 Exclusive Offers</h1>
          <p className="section-subtitle">
            Discover hand-picked travel deals and special packages crafted just
            for you.
          </p>

          <div className="offers-grid">
            {trips
              .filter((trip) => trip.offer === true)
              .map((offer) => (
                <div className="offer-card" key={offer.id}>
                  <div className="image-wrapper">
                    <img src={offer.img} alt={offer.title} />
                    <div className="image-overlay"></div>
                  </div>
                  <div className="offer-content">
                    <h3>{offer.name}</h3>
                    <p>{offer.desc}</p>
                    <span className="price">{offer.price}</span>
                    <button className="book-btn">Book Now</button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>


      {/* Testimonials */}
      <div className="background">
        <section className="testimonials">
          <h2>What Our Customers Say</h2>
          <div className="testimonial-container">

            <div className="testimonial-card">
              <p>
                "TravelBuddy made our honeymoon in Maldives unforgettable! Highly recommend!"
              </p>
              <div className="stars">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>
              <span>- Aishwarya & Rohit</span>
            </div>

            <div className="testimonial-card">
              <p>
                "Smooth booking, great support. Loved our trip to Manali."
              </p>
              <div className="stars">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>
              <span>- Prakash R</span>
            </div>

            <div className="testimonial-card">
              <p>
                "Best vacation planning ever! The Bali package was exactly as promised."
              </p>
              <div className="stars">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>
              <span>- Sneha & Arjun</span>
            </div>

          </div>
        </section>
      </div>


      <TravelBlog />




      {/*contact*/}
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
              <form method="post" encType="multipart/form-data" action="/enquiry" onSubmit={sendEmail}>
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

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 TravelBuddy. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
