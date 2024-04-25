// In your Express app.js
require('dotenv').config();
const express = require("express");
const fetch = require("node-fetch"); // You'll need to install node-fetch: npm install node-fetch
const app = express();

app.get("/search", (req, res) => {
  const searchTerm = req.query.term;
  const yelpApiUrl = `https://api.yelp.com/v3/businesses/search?term=${searchTerm}`;

  fetch(yelpApiUrl, {
    headers: {
      Authorization: `Bearer ${process.env.YELP_API_KEY}`, // Your Yelp API key should be stored as an environment variable
      "Content-Type": "application/json",
    },
  })
    .then((apiRes) => apiRes.json())
    .then((apiJson) => res.json(apiJson)) // Send the JSON response back to the client
    .catch((error) => {
      console.error("Error fetching data from Yelp:", error);
      res.status(500).send("Error fetching data");
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
