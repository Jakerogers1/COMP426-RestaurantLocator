# Restaurant Finder App

## Introduction Video

Check out our [introduction video](https://www.canva.com/design/DAGEAReXpwU/0b9Yu48h5R1rw_5fFMwVbw/watch?utm_content=DAGEAReXpwU&utm_campaign=designshare&utm_medium=link&utm_source=editor) to see the app in action and understand its features.

## Description

This web application allows users to search for restaurants by entering a city and a food category (e.g., sushi, Italian). Users can view a list of matching restaurants, see them on a map, and leave reviews. The application uses several APIs to fetch real-time data and provides interactive features like sorting and dark/light mode.

## APIs Used

- **OpenWeatherMap API**: Retrieves latitude and longitude coordinates for the entered city.
- **Yelp Fusion API**: Provides details on restaurants, including location, ratings, and categories.
- **Google Maps JavaScript API**: Displays the restaurants on a map, enhancing the user interaction by allowing users to visually explore restaurant locations.

## Setup

1. **Clone the repository**: Use `git clone` followed by the repository URL.
2. **Install dependencies**: Navigate to the project root and execute `npm install`.
3. **Set up environment variables**:
   - Create a `.env` file at the root.
   - Include the API keys for OpenWeatherMap, Yelp Fusion, and Google Maps as follows:
     ```
     OPENWEATHERMAP_API_KEY=<your_key>
     YELP_API_KEY=<your_key>
     GOOGLE_MAPS_API_KEY=<your_key>
     ```
4. **Start the server**: Run `npm start`.
5. **Access the application**: Visit `http://localhost:3000` in your browser.

## Features

- **Search Functionality**: Users can search for restaurants by city and category. Results can be sorted by distance, rating, or price.
- **Interactive Map**: Toggle to a map view showing restaurant locations based on search results.
- **Reviews and Ratings**: Users can leave reviews and rate restaurants using a star system.
- **Responsive Design**: The app includes a responsive design with a dark/light mode option for enhanced user preference.

## Running the Application

- Input a city and select or type a food category.
- Use the "Find Restaurants" button to display results.
- Switch between list and map views for different perspectives of restaurant locations.
- Leave reviews and rate restaurants directly from the app interface.

## Future Enhancements

- Introduce user authentication for personalized experiences such as saving favorite restaurants or preferences.
- Improve mobile responsiveness and interactive features for an optimized user experience on various devices.
