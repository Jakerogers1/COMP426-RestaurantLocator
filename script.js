// script.js
document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.getElementById("search-form");

  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const searchTerm = document.getElementById("search-input").value.trim();
    if (searchTerm) {
      performSearch(searchTerm);
    } else {
      alert("Please enter a search term.");
    }
  });
});

function performSearch(searchTerm) {
  // Simulating an API request
  fetch(`/search?term=${encodeURIComponent(searchTerm)}`)
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

  results.forEach((business) => {
    const resultElement = createResultElement(business);
    resultsContainer.appendChild(resultElement);
  });
}

function createResultElement(business) {
  const div = document.createElement("div");
  div.className = "search-result";
  div.innerHTML = `<h2>${business.name}</h2>
                     <p>${business.location}</p>`;
  // Add more business details here
  return div;
}

function displayErrorMessage(message) {
  const resultsContainer = document.getElementById("search-results");
  resultsContainer.innerHTML = `<p class="error-message">${message}</p>`;
}
