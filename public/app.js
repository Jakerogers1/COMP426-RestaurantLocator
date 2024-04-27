let weatherApiKey = "";
let yelpApiKey = "";

// Function to fetch API keys from the server
function fetchConfig() {
  fetch("/config")
    .then(response => response.json())
    .then(config => {
      weatherApiKey = config.weatherApiKey;
      yelpApiKey = config.yelpApiKey;
      document.getElementById("findRestaurantsButton").disabled = false;
    })
    .catch(error => {
      console.error("Error fetching config:", error);
      alert("Failed to load configuration, please try reloading the page.");
    });
}

// Function to fetch restaurants based on city and food category
function fetchRestaurants() {
  const city = document.getElementById("city").value;
  const category = document.getElementById("category").value;
  const results = document.getElementById("results");

  if (!city.trim() || !category.trim()) {
    alert("Please enter both city and food category.");
    return;
  }

  results.innerHTML = "<p>Fetching location and searching for restaurants...</p>";

  fetch(`/search-restaurants?city=${encodeURIComponent(city)}&category=${encodeURIComponent(category)}`)
    .then(response => response.json())
    .then(data => {
      if (data.businesses && data.businesses.length > 0) {
        const businessList = data.businesses
          .map(business => `
            <div class="restaurant-card">
              <img src="${business.image_url || "default-image-url.jpg"}" alt="${business.name}" class="restaurant-image">
              <div class="restaurant-info">
                <h2 class="restaurant-name">${business.name}</h2>
                <div class="restaurant-meta">
                  <span class="restaurant-rating">${business.rating} <span class="star-rating">★</span></span>
                  <p class="restaurant-address">${business.location.address1}</p>
                  <p class="restaurant-phone">${business.display_phone}</p>
                  <a href="${business.url}" target="_blank" class="yelp-link">View on Yelp</a>
                  <button onclick="showReviewForm('${business.id}')">Leave a Review</button>
                </div>
              </div>
            </div>
          `)
          .join("");
        results.innerHTML = businessList;
      } else {
        results.innerHTML = "<p>No restaurants found.</p>";
      }
    })
    .catch(error => {
      console.error("Error searching for restaurants:", error);
      results.innerHTML = `<p>Failed to search for restaurants. Error: ${error}</p>`;
    });
}


function showReviewForm(restaurantId) {
  window.location.href = `review_page.html?restaurantId=${restaurantId}`;
}


// Wait for the DOM to load before running the script
document.addEventListener("DOMContentLoaded", () => {
  const restaurantButton = document.getElementById("findRestaurantsButton");
  restaurantButton.addEventListener("click", fetchRestaurants);
  fetchConfig();
});
