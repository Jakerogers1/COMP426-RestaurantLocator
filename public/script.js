document.addEventListener("DOMContentLoaded", () => {
    const searchForm = document.getElementById("search-form");
  
    searchForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const searchTerm = document.getElementById("search-input").value.trim();
      const city = document.getElementById("city-input").value.trim(); // New: Get the city input value
      if (searchTerm && city) {
        // Check if both search term and city are provided
        performSearch(searchTerm, city); // Pass both search term and city to the performSearch function
      } else {
        alert("Please enter both a search term and a city.");
      }
    });
  });
  
  function performSearch(searchTerm, city) {
    // Update performSearch function to accept city parameter
    // Simulating an API request
    fetch(
      `/search?term=${encodeURIComponent(searchTerm)}&city=${encodeURIComponent(
        city
      )}`
    ) // Include city parameter in the API request
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((results) => {
        updateSearchResults(results);
      })
      .catch((error) => {
        console.error("Failed to fetch: ", error);
        displayErrorMessage("Failed to perform search. Please try again later.");
      });
  }
  
  function updateSearchResults(results) {
    const resultsContainer = document.getElementById("search-results");
    resultsContainer.innerHTML = ""; // Clear existing results
  
    results.businesses.forEach((business) => { // Access businesses property from results
      const resultElement = createResultElement(business);
      resultsContainer.appendChild(resultElement);
    });
  }
  
  function createResultElement(business) {
    const div = document.createElement("div");
    div.className = "search-result";
    div.innerHTML = `<h2>${business.name}</h2>
                       <p>${business.location.address1}, ${business.location.city}, ${business.location.state}</p>`;
    // Add more business details here
    return div;
  }
  
  function displayErrorMessage(message) {
    const resultsContainer = document.getElementById("search-results");
    resultsContainer.innerHTML = `<p class="error-message">${message}</p>`;
  }
  