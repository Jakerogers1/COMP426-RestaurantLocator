let currentRating = 0;

function setRating(rating) {
  currentRating = rating;
  const stars = document.querySelectorAll(".star-rating .star");
  stars.forEach((star, index) => {
    if (index < rating) {
      star.style.color = "#ffd700";
    } else {
      star.style.color = "gray";
    }
  });
}

function submitReview() {
  const reviewText = document.getElementById("reviewText").value;
  const restaurantId = window.location.search.split("=")[1]; // Get restaurant ID from URL

  fetch(`/submit-review`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      restaurantId,
      rating: currentRating,
      text: reviewText,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      alert("Review submitted!");
      window.location.reload(); // Reload the page to show new review
    })
    .catch((error) => {
      console.error("Error submitting review:", error);
      alert("Failed to submit review.");
    });
}

document.addEventListener("DOMContentLoaded", () => {
  const stars = document.querySelectorAll(".star-rating .star");

  stars.forEach((star, index) => {
    star.addEventListener("mouseover", () => {
      for (let i = 0; i <= index; i++) {
        stars[i].style.color = "#d32323";
      }
      for (let i = index + 1; i < stars.length; i++) {
        stars[i].style.color = "gray";
      }
    });

    star.addEventListener("mouseout", () => {
      // Reset all stars on mouse out
      stars.forEach((s, idx) => {
        s.style.color = idx < currentRating ? "#ffd700" : "gray";
      });
    });

    star.addEventListener("click", () => {
      currentRating = index + 1;
    });
  });
  const queryParams = new URLSearchParams(window.location.search);
  const restaurantId = queryParams.get("restaurantId");

  fetch(`/restaurant-details/${restaurantId}`)
    .then((response) => response.json())
    .then((data) => {
      if (
        data &&
        data.id &&
        data.name &&
        data.location &&
        data.display_phone &&
        data.image_url
      ) {
        document.getElementById("restaurantName").textContent =
          data.name || "Restaurant Name";
        document.getElementById("restaurantImage").src =
          data.image_url || "default-image-placeholder.png";
        document.getElementById("restaurantDetails").textContent = `${
          data.location.address1 || "Address"
        }, ${data.display_phone || "Phone"}`;
      } else {
        console.error("Invalid restaurant data received:", data);
        document.getElementById("restaurantName").textContent =
          "Restaurant Details Not Found";
        document.getElementById("restaurantImage").style.display = "none";
        document.getElementById("restaurantDetails").textContent =
          "No details available for this restaurant.";
      }
      fetchAndDisplayReviews(restaurantId);
    })
    .catch((error) => {
      console.error("Error fetching restaurant details:", error);
      document.getElementById("restaurantName").textContent =
        "Error Loading Restaurant Details";
      document.getElementById("restaurantDetails").textContent =
        "Please try again later.";
    });
});

function fetchAndDisplayReviews(restaurantId) {
  fetch(`/reviews/${restaurantId}`)
    .then((response) => response.json())
    .then((reviews) => {
      const reviewsHtml = reviews
        .map(
          (review) =>
            `
          <div class="review">
            <div class="rating">
              <span class="filled-stars">${"★".repeat(review.rating)}</span>
              <span class="empty-stars">${"★".repeat(5 - review.rating)}</span>
              <span class="numeric-rating">(${review.rating})</span>
            </div>
            <p>${review.text}</p>
            <button class="like-button" onclick="likeReview(${
              review.id
            })">Like (${review.likes})</button>
            <button class="dislike-button" onclick="dislikeReview(${
              review.id
            })">Dislike (${review.dislikes})</button>
          </div>
        `
        )
        .join("");
      document.getElementById("reviews").innerHTML = reviewsHtml;
    })
    .catch((error) => {
      console.error("Failed to fetch reviews:", error);
    });
}

function likeReview(id) {
  const restaurantId = window.location.search.split("=")[1];
  fetch(`/reviews/${id}/like`, { method: "POST" }).then(() => {
    fetchAndDisplayReviews(restaurantId);
  });
}

function dislikeReview(id) {
  const restaurantId = window.location.search.split("=")[1];
  fetch(`/reviews/${id}/dislike`, { method: "POST" }).then(() => {
    fetchAndDisplayReviews(restaurantId);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".like-button").forEach((button) => {
    button.addEventListener("click", function () {
      const reviewId = this.dataset.reviewId;
      fetch(`/reviews/${reviewId}/like`, { method: "POST" })
        .then((response) => response.json())
        .then((data) => {
          alert("Review liked!");
          location.reload();
        })
        .catch((error) => console.error("Error liking the review:", error));
    });
  });

  document.querySelectorAll(".dislike-button").forEach((button) => {
    button.addEventListener("click", function () {
      const reviewId = this.dataset.reviewId;
      fetch(`/reviews/${reviewId}/dislike`, { method: "POST" })
        .then((response) => response.json())
        .then((data) => {
          alert("Review disliked!");
          location.reload();
        })
        .catch((error) => console.error("Error disliking the review:", error));
    });
  });
});
