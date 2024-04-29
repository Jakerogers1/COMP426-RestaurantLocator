let currentRating = 0;

function setRating(rating) {
    currentRating = rating;
    const stars = document.querySelectorAll('.star-rating .star');
    stars.forEach((star, index) => {
      if (index < rating) {
        star.style.color = '#ffd700'; 
      } else {
        star.style.color = 'gray'; 
      }
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
    const stars = document.querySelectorAll('.star-rating .star');

    stars.forEach((star, index) => {
        star.addEventListener('mouseover', () => {
        // Highlight all stars to the left including this one
        for (let i = 0; i <= index; i++) {
            stars[i].style.color = '#d32323'; // Highlight color
        }
        for (let i = index + 1; i < stars.length; i++) {
            stars[i].style.color = 'gray'; // Default color
        }
        });

        star.addEventListener('mouseout', () => {
        // Reset all stars on mouse out
        stars.forEach((s, idx) => {
            s.style.color = idx < currentRating ? '#ffd700' : 'gray'; // Reset based on current rating
        });
        });

        star.addEventListener('click', () => {
        currentRating = index + 1; // Set the current rating
        });
    });
    // Parse the restaurant ID from the URL query string
    const queryParams = new URLSearchParams(window.location.search);
    const restaurantId = queryParams.get('restaurantId');
  
    // Fetch restaurant details and update the page
    // Fetch restaurant details and update the page
    fetch(`/restaurant-details/${restaurantId}`) 
    .then(response => response.json())
    .then(data => {
    // Check for the necessary data and its structure
    if (data && data.id && data.name && data.location && data.display_phone && data.image_url) {
        document.getElementById('restaurantName').textContent = data.name || 'Restaurant Name';
        document.getElementById('restaurantImage').src = data.image_url || 'default-image-placeholder.png';
        // Make sure to reference the address and phone correctly
        document.getElementById('restaurantDetails').textContent = `${data.location.address1 || 'Address'}, ${data.display_phone || 'Phone'}`;
    } else {
        // Handle errors or incomplete data
        console.error('Invalid restaurant data received:', data);
        document.getElementById('restaurantName').textContent = 'Restaurant Details Not Found';
        document.getElementById('restaurantImage').style.display = 'none';
        document.getElementById('restaurantDetails').textContent = 'No details available for this restaurant.';
    }
    // Fetch and display reviews
    fetchAndDisplayReviews(restaurantId);
    })
    .catch(error => {
    console.error('Error fetching restaurant details:', error);
    document.getElementById('restaurantName').textContent = 'Error Loading Restaurant Details';
    document.getElementById('restaurantDetails').textContent = 'Please try again later.';
    });


    function fetchAndDisplayReviews(restaurantId) {
        fetch(`/reviews/${restaurantId}`)
          .then(response => response.json())
          .then(reviews => {
            const reviewsHtml = reviews.map(review => {
              const filledStars = '★'.repeat(review.rating);
              const emptyStars = '★'.repeat(5 - review.rating);
              return `
                <div class="review">
                  <div class="rating">
                    <span class="filled-stars">${filledStars}</span><span class="empty-stars">${emptyStars}</span>
                    <span class="numeric-rating">(${review.rating})</span>
                  </div>
                  <p>${review.text}</p>
                </div>
              `;
            }).join('');
            document.getElementById('reviews').innerHTML = reviewsHtml;
          })
          .catch(error => {
            console.error('Failed to fetch reviews:', error);
          });
      }      
  });
  
  
