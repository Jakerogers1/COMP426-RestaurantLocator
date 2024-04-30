let weatherApiKey = "";
let yelpApiKey = "";

// Function to fetch API keys from the server
function fetchConfig() {
  return fetch("/config")
    .then((response) => response.json())
    .then((config) => {
      weatherApiKey = config.weatherApiKey;
      yelpApiKey = config.yelpApiKey;
      document.getElementById("findRestaurantsButton").disabled = false;
    })
    .catch((error) => {
      console.error("Error fetching config:", error);
      alert("Failed to load configuration, please try reloading the page.");
    });
}

// Function to apply dark theme to restaurant cards
function applyDarkThemeToCards() {
  const cookieValue = getCookie('theme');
  if (cookieValue === 'dark') {
    document.body.style.backgroundColor = 'black';
    const restaurantCards = document.querySelectorAll('.restaurant-card');
    restaurantCards.forEach(card => {
      card.style.backgroundColor = 'darkgray'; // Change to the desired dark color
    });
  }
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

  results.innerHTML =
    "<p>Fetching location and searching for restaurants...</p>";

  fetch(
    `/search-restaurants?city=${encodeURIComponent(
      city
    )}&category=${encodeURIComponent(category)}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.businesses && data.businesses.length > 0) {
        const businessList = data.businesses
          .map(
            (business) => `
              <div class="restaurant-card">
                <img src="${business.image_url || "default-image-url.jpg"
              }" alt="${business.name}" class="restaurant-image">
                <div class="restaurant-info">
                  <h2 class="restaurant-name">${business.name}</h2>
                  <div class="restaurant-meta">
                    <span class="restaurant-rating">${business.rating
              } <span class="star-rating">★</span></span>
                    <p class="restaurant-address">${business.location.address1
              }</p>
                    <p class="restaurant-phone">${business.display_phone}</p>
                  </div>
                  <a href="${business.url
              }" target="_blank" class="yelp-link">View on Yelp</a>
                </div>
              </div>
            `
          )
          .join("");
        results.innerHTML = businessList;
        applyDarkThemeToCards(); // Apply dark theme after fetching restaurants
      } else {
        results.innerHTML = "<p>No restaurants found.</p>";
      }
    })
    .catch((error) => {
      console.error("Error searching for restaurants:", error);
      results.innerHTML = `<p>Failed to search for restaurants. Error: ${error}</p>`;
    });
}

// Wait for the DOM to load before running the script
document.addEventListener("DOMContentLoaded", () => {
  const restaurantButton = document.getElementById("findRestaurantsButton");
  restaurantButton.addEventListener("click", fetchRestaurants);

  // Check if the cookie exists
  const cookieValue = getCookie('theme');
  if (cookieValue === 'dark') {
    document.body.style.backgroundColor = 'black';
  }

  fetchConfig()
    .catch((error) => {
      console.error("Error fetching configuration:", error);
      // Handle errors if needed
    });
});

// Function to read cookie value
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

// Function to set cookie value
function setCookie(name, value, days) {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

document.addEventListener("DOMContentLoaded", function () {
  const cookieBanner = document.getElementById("cookieBanner");
  const dismiss = document.getElementById("dismiss");
  const darkModeBtn = document.getElementById("darkMode");

  // Check if user has already accepted cookies
  const cookiesAccepted = localStorage.getItem("cookiesAccepted");

  if (!cookiesAccepted) {
    cookieBanner.style.display = "block";
  }

  // Handle click on dismiss button
  dismiss.addEventListener("click", function () {
    cookieBanner.style.display = "none";
    // Set a flag in localStorage to indicate that the user has accepted cookies
    localStorage.setItem("cookiesAccepted", true);
  });

  // Handle click on dark mode button
  darkModeBtn.addEventListener("click", function () {
    // Toggle dark mode by adding/removing a class to the body
    setCookie('theme', 'dark', 30);
    applyDarkThemeToCards();

    // Hide the cookie banner after setting the dark mode cookie
    cookieBanner.style.display = "none";
    // Set a flag in localStorage to indicate that the user has accepted cookies
    localStorage.setItem("cookiesAccepted", true);
  });
});


// to delete cookies
//setCookie('theme', 'dark', -1);
