// Dummy trips data
exports.getTrips = (req, res) => {
  const trips = [
    { id: 1, destination: "Paris", price: 1200 },
    { id: 2, destination: "Maldives", price: 2000 },
    { id: 3, destination: "Goa", price: 500 }
  ];

  res.json({
    message: "✅ Trips fetched successfully",
    user: req.user, // logged-in user details from token
    trips
  });
};
