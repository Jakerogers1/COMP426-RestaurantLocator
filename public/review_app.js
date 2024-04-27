let currentRating = 0;

function setRating(rating) {
  currentRating = rating;
  const stars = document.querySelectorAll('.star');
  stars.forEach((star, index) => {
    star.style.color = index < rating ? 'gold' : 'gray';
  });
}

function submitReview() {
  const reviewText = document.getElementById('reviewText').value;
  const restaurantId = window.location.search.split('=')[1]; // Get restaurant ID from URL

  fetch(`/submit-review`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      restaurantId,
      rating: currentRating,
      text: reviewText
    })
  })
  .then(response => response.json())
  .then(data => {
    alert('Review submitted!');
    window.location.reload(); // Reload the page to show new review
  })
  .catch(error => {
    console.error('Error submitting review:', error);
    alert('Failed to submit review.');
  });
}

document.addEventListener("DOMContentLoaded", () => {
    // Parse the restaurant ID from the URL query string
    const queryParams = new URLSearchParams(window.location.search);
    const restaurantId = queryParams.get('restaurantId');
  
    // Fetch restaurant details and update the page
    fetch(`/restaurant-details/${restaurantId}`) 
      .then(response => response.json())
      .then(data => {
        // If any of these are undefined, make sure to check the server response and database structure
        if (data && data.id && data.name && data.address && data.phone && data.image_url) {
          document.getElementById('restaurantName').textContent = data.name || 'Restaurant Name';
          document.getElementById('restaurantImage').src = data.image_url || 'default-image-placeholder.png';
          document.getElementById('restaurantDetails').textContent = `${data.address || 'Address'}, ${data.phone || 'Phone'}`;
        } else {
          // Log the error and update the UI to inform the user
          console.error('Invalid restaurant data received:', data);
          document.getElementById('restaurantName').textContent = 'Restaurant Details Not Found';
          // Hide or show a default image
          document.getElementById('restaurantImage').style.display = 'none';
          // Provide a message or hide details section
          document.getElementById('restaurantDetails').textContent = 'No details available for this restaurant.';
        }
        // Fetch and display reviews
        fetchAndDisplayReviews(restaurantId);
      })
      .catch(error => {
        console.error('Error fetching restaurant details:', error);
        // Update the UI to inform the user of an error
        document.getElementById('restaurantName').textContent = 'Error Loading Restaurant Details';
        document.getElementById('restaurantDetails').textContent = 'Please try again later.';
      });

      function fetchAndDisplayReviews(restaurantId) {
        fetch(`/reviews/${restaurantId}`)
          .then(response => response.json())
          .then(reviews => {
            const reviewsHtml = reviews.map(review => `
              <div class="review">
                <p>Rating: ${review.rating}</p>
                <p>${review.text}</p>
              </div>
            `).join('');
            document.getElementById('reviews').innerHTML = reviewsHtml;
          })
          .catch(error => {
            console.error('Failed to fetch reviews:', error);
          });
      }

  });
  
  
