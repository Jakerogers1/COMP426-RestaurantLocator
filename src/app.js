// In your Express app.js
require("dotenv").config();
const express = require("express");
const https = require("https"); // Import the built-in https module
const app = express();
app.use(express.static("public"));

// Define a route handler for the root URL
app.get("/", (req, res) => {
  res.send("Hello, world!"); // Send a simple response for demonstration
});

app.get("/search", (req, res) => {
  const searchTerm = req.query.term;
  const city = req.query.city; // New: Get city from query parameters
  const yelpApiUrl = `https://api.yelp.com/v3/businesses/search?term=${searchTerm}&location=${city}`; // Update Yelp API URL to include city

  // Make an HTTP GET request using the https module
  https
    .get(
      yelpApiUrl,
      {
        headers: {
          Authorization: `Bearer ${process.env.YELP_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
      (apiRes) => {
        let data = "";
        apiRes.on("data", (chunk) => {
          data += chunk;
        });

        apiRes.on("end", () => {
          res.json(JSON.parse(data));
        });
      }
    )
    .on("error", (error) => {
      console.error("Error fetching data from Yelp:", error);
      res.status(500).send("Error fetching data");
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
