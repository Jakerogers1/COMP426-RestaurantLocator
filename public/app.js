let weatherApiKey = "";
let yelpApiKey = "";
let googleMapsApiKey = "";
let pendingRestaurants = []; // This will store restaurant data if the map isn't ready

// Function to fetch API keys from the server
function fetchConfig() {
  fetch("/config")
    .then(response => response.json())
    .then(config => {
      weatherApiKey = config.weatherApiKey;
      yelpApiKey = config.yelpApiKey;
      googleMapsApiKey = config.googleMapsApiKey;
      document.getElementById("findRestaurantsButton").disabled = false;
    })
    .catch(error => {
      console.error("Error fetching config:", error);
      alert("Failed to load configuration, please try reloading the page.");
    });
}

// Function to fetch restaurants based on city and food category


function showReviewForm(restaurantId) {
  window.location.href = `review_page.html?restaurantId=${restaurantId}`;
}


// Wait for the DOM to load before running the script
document.addEventListener("DOMContentLoaded", () => {
  const restaurantButton = document.getElementById("findRestaurantsButton");
  restaurantButton.addEventListener("click", fetchRestaurants);
  fetchConfig();
});



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
        displayRestaurants(data.businesses);
        results.dataset.businesses = JSON.stringify(data.businesses);

        if (data.businesses[0] && data.businesses[0].coordinates) {
          updateMapLocation(data.businesses[0].coordinates.latitude, data.businesses[0].coordinates.longitude);
        }
      } else {
        results.innerHTML = "<p>No restaurants found.</p>";
      }
    })
    .catch(error => {
      console.error("Error searching for restaurants:", error);
      results.innerHTML = `<p>Failed to search for restaurants. Error: ${error}</p>`;
    });
}

function sortRestaurants() {
  const sortCriteria = document.getElementById('sort').value;
  const results = document.getElementById('results');
  let businesses = JSON.parse(results.dataset.businesses || "[]");

  if (businesses.length > 0) {
    switch (sortCriteria) {
      case 'rating':
        businesses.sort((a, b) => b.rating - a.rating);
        break;
      case 'distance':
        businesses.sort((a, b) => a.distance - b.distance);
        break;
      case 'priceLowHigh':
        businesses.sort((a, b) => (a.price || "").length - (b.price || "").length);
        break;
      case 'priceHighLow':
        businesses.sort((a, b) => (b.price || "").length - (a.price || "").length);
        break;
    }
    displayRestaurants(businesses);
  }
}

function displayRestaurants(businesses) {
  const businessList = businesses.map(business => `
      <div class="restaurant-card">
          <img src="${business.image_url || 'default-image-url.jpg'}" alt="${business.name}" class="restaurant-image">
          <div class="restaurant-info">
              <h2 class="restaurant-name">${business.name}</h2>
              <div class="restaurant-meta">
                  <span class="restaurant-rating">${business.rating} stars</span>
                  <span class="restaurant-distance">${(business.distance / 1609.34).toFixed(2)} mi</span>
                  <span class="restaurant-price">${business.price || "N/A"}</span>
                  <p class="restaurant-address">${business.location.address1}</p>
                  <p class="restaurant-phone">${business.display_phone}</p>
                  <a href="${business.url}" target="_blank" class="button yelp-link">View on Yelp</a>
                  <button onclick="showReviewForm('${business.id}')" class="button review-button">Leave a Review</button>
              </div>
          </div>
      </div>
  `).join("");

  const results = document.getElementById('results');
  results.innerHTML = businessList;
  results.dataset.businesses = JSON.stringify(businesses);

  if (mapLoaded) {
      businesses.forEach(business => {
          if (business.coordinates) {
              const marker = new google.maps.Marker({
                  position: new google.maps.LatLng(business.coordinates.latitude, business.coordinates.longitude),
                  map: map,
                  title: business.name
              });

              const infoWindow = new google.maps.InfoWindow({
                  content: `<div class="info-window">
                              <h3>${business.name}</h3>
                              <p>Rating: ${business.rating} stars</p>
                              <p>${business.price || "N/A"}</p>
                              <p>${business.location.address1}</p>
                              <a href="${business.url}" target="_blank">View on Yelp</a>
                            </div>`
              });

              marker.addListener('click', function() {
                  infoWindow.open(map, marker);
              });
          }
      });
  } else {
      pendingRestaurants = businesses; // Store the businesses to be processed once the map is ready
  }
}

let mapLoaded = false; // Flag to check if the map has already been initialized
let map = null; // Holds the map object globally
let pendingCenter = null; // Stores pending center coordinates if map isn't ready

// Function to initialize the Google Map
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 35.91305, lng: -79.05542}, // Default center
      zoom: 15
  });
  mapLoaded = true;

  // Process any restaurants that were loaded before the map was initialized
  if (pendingRestaurants.length > 0) {
      displayRestaurants(pendingRestaurants);
      pendingRestaurants = []; // Clear the temporary storage
  }

  if (pendingCenter) {
      map.setCenter(new google.maps.LatLng(pendingCenter.lat, pendingCenter.lng));
      pendingCenter = null; // Clear the pending center
  }
}


// Function to update the map location
function updateMapLocation(lat, lng) {
  if (map) {
      map.setCenter(new google.maps.LatLng(lat, lng));
      map.setZoom(15); // Adjust the zoom level if necessary
  } else {
      pendingCenter = {lat: lat, lng: lng}; // Store coordinates to center later
  }
}

// Function to load the Google Maps script
function loadMap() {
  if (!googleMapsApiKey) {
    console.error("Google Maps API key is not defined.");
    return;
  }

  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&callback=initMap`;
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
}


// Ensure to call this function when toggling to the map view
function toggleMapView() {
  const mapDiv = document.getElementById('map');
  const resultsDiv = document.getElementById('results');
  if (mapDiv.style.display === 'block') {
      mapDiv.style.display = 'none';
      resultsDiv.style.display = 'block';
      document.getElementById('toggleMapView').innerText = 'Map View';
  } else {
      mapDiv.style.display = 'block';
      resultsDiv.style.display = 'none';
      document.getElementById('toggleMapView').innerText = 'List View';
      if (!mapLoaded) {
          loadMap(); // Initialize the map if it hasn't been loaded
      }
  }
}

document.addEventListener("DOMContentLoaded", () => {
    const restaurantButton = document.getElementById("findRestaurantsButton");
    restaurantButton.addEventListener("click", fetchRestaurants);
    fetchConfig(); // Fetch API keys and load map script
});