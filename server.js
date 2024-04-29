require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser');
const db = require('./db');
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.json());

app.get("/config", (req, res) => {
  res.json({
    weatherApiKey: process.env.OPENWEATHERMAP_API_KEY,
    yelpApiKey: process.env.YELP_API_KEY, // Ensure you add this in your .env file
  });
});

// Assuming you have `node-fetch` installed and imported correctly
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

app.get("/search-restaurants", async (req, res) => {
  const { city, category } = req.query;
  try {
    // Fetch coordinates from OpenWeatherMap
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHERMAP_API_KEY}`
    );
    const weatherData = await weatherResponse.json();

    if (!weatherResponse.ok) {
      throw new Error(weatherData.message || "Error fetching location data.");
    }

    const coords = weatherData.coord;

    // Use coordinates to query Yelp
    const yelpResponse = await fetch(
      `https://api.yelp.com/v3/businesses/search?latitude=${coords.lat}&longitude=${coords.lon}&categories=${category}`,
      {
        headers: { Authorization: `Bearer ${process.env.YELP_API_KEY}` },
      }
    );
    const yelpData = await yelpResponse.json();

    if (!yelpResponse.ok) {
      throw new Error(
        yelpData.error?.description || "Error fetching Yelp data."
      );
    }

    res.json(yelpData);
  } catch (error) {
    console.error("API Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.post("/submit-review", (req, res) => {
  const { restaurantId, rating, text } = req.body;
  const sql = `INSERT INTO reviews (restaurantId, rating, text) VALUES (?, ?, ?)`;
  const params = [restaurantId, rating, text];
  db.run(sql, params, function(err) {
    if (err) {
      res.status(500).send(err.message);
    }
    res.status(201).json({ id: this.lastID, ...req.body });
  });
});

app.get("/restaurant-details/:restaurantId", async (req, res) => {
  const { restaurantId } = req.params;

  const yelpResponse = await fetch(
    `https://api.yelp.com/v3/businesses/${restaurantId}`,
    {
      headers: { Authorization: `Bearer ${process.env.YELP_API_KEY}` },
    }
  );
  const yelpData = await yelpResponse.json();

  if (!yelpResponse.ok) {
    throw new Error(
      yelpData.error?.description || "Error fetching Yelp data."
    );
  }

  res.json(yelpData);
  });


// Route to fetch reviews for a specific restaurant
app.get("/reviews/:restaurantId", (req, res) => {
  const { restaurantId } = req.params;
  const sql = "SELECT * FROM reviews WHERE restaurantId = ?";
  const params = [restaurantId];
  db.all(sql, params, (err, reviews) => {
    if (err) {
      console.error(err.message);
      res.status(500).send(err.message);
      return;
    }
    res.json(reviews);
  });
});

app.post("/reviews/:id/like", (req, res) => {
  const { id } = req.params;
  const findSql = "SELECT likes, dislikes FROM reviews WHERE id = ?";
  db.get(findSql, [id], (err, review) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (review.dislikes > 0) {
      res.status(409).json({ message: "Review already disliked" });
    } else {
      const updateSql = "UPDATE reviews SET likes = likes + 1 WHERE id = ?";
      db.run(updateSql, [id], function(err) {
        if (err) {
          res.status(400).json({ error: err.message });
          return;
        }
        res.json({ message: "Like added", likes: this.changes });
      });
    }
  });
});

app.post("/reviews/:id/dislike", (req, res) => {
  const { id } = req.params;
  const findSql = "SELECT likes, dislikes FROM reviews WHERE id = ?";
  db.get(findSql, [id], (err, review) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (review.likes > 0) {
      res.status(409).json({ message: "Review already liked" });
    } else {
      const updateSql = "UPDATE reviews SET dislikes = dislikes + 1 WHERE id = ?";
      db.run(updateSql, [id], function(err) {
        if (err) {
          res.status(400).json({ error: err.message });
          return;
        }
        res.json({ message: "Dislike added", dislikes: this.changes });
      });
    }
  });
});





app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});