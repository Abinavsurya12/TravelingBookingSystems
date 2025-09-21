
import React from "react";
import "./TravelBlog.css"; // optional CSS file

const TravelBlog = () => {
    const blogs = [
        {
            id: 1,
            title: "Exploring the Hidden Place of Bali",
            date: "August 2025",
            description:
                "Discover Bali’s serene spots away from tourist crowds,\nwhere turquoise waters meet golden sands,\nand experience vibrant local culture."
,
            image: "./images/bali.jpg",
        },
        {
            id: 2,
            title: "A Foodie’s Guide to streat food of Goa",
            date: "July 2025",
            description:
               
  "Experience the vibrant street food culture of Bangkok,\nfrom spicy noodles to sweet mango sticky rice,\nand enjoy flavors that awaken your senses.",

            image: "./images/goaa.png",
        },
        {
            id: 3,
            title: "Exploring the Wonders of China",
            date: "June 2025",
            description:
                "From the majestic Great Wall to the tranquil beauty of Guilin, China offers a journey through history, culture, and breathtaking landscapes.",
            image: "./images/china.jpg",
        },
        
    ];

    return (
        <section className="travel-blog">
            <h2>Travel Article</h2>
            <div className="blog-grid">
                {blogs.map((blog) => (
                    <div key={blog.id} className="blog-card">
                        <img src={blog.image} alt={blog.title} />
                        <div className="blog-content">
                            <h3>{blog.title}</h3>
                            <span className="date">{blog.date}</span>
                            <p>{blog.description}</p>
                            <button className="read-more">Read More</button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TravelBlog;
