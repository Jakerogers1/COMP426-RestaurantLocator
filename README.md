# Restaurant Finder App

## Description

This web application allows users to input a city and a category of food (e.g., sushi, Italian). It then retrieves a list of nearby restaurants matching the category using the Yelp Fusion API. The app demonstrates integration with external APIs and backend development with Node.js.

## APIs Used

- **OpenWeatherMap API**: Used to get the latitude and longitude coordinates for the entered city.
- **Yelp Fusion API**: Provides data on restaurants, including their location, rating, and category.

## Setup

1. **Clone the repository**: Execute `git clone` followed by the repository URL to clone it onto your local machine.
2. **Install dependencies**: In the terminal, navigate to the root directory of the project and run `npm install` to install all required dependencies.
3. **Set up environment variables**:
   - Create a `.env` file in the root directory.
   - Add your OpenWeatherMap, Yelp Fusion API and Google Maps JavaScript API Keys to the `.env` file as follows:
     ```
     OPENWEATHERMAP_API_KEY=your_openweathermap_api_key
     YELP_API_KEY=your_yelp_api_key
     GOOGLE_MAPS_API_KEY=your_google_maps_api_key
     ```
4. **Start the server**: Run `npm start` to launch the server.
5. **Access the application**: In your web browser, visit `http://localhost:3000` to interact with the app.

## Running the Application

With the server up and running, use the app by:

- Typing in a city name in the designated field.
- Selecting or entering a food category.
- Clicking the "Find Restaurants" button to display a list of matching restaurants, presented in an attractive card layout with options to view more details on Yelp.
- Clicking the "Map View" button displays a map of the city the user searched for with markers representing the restraunts within the results on "List View". 

## Notes

- The frontend is served statically from the `public` directory.
- API keys are securely managed through environment variables, ensuring they are not exposed in the frontend code.
- The app now incorporates a more user-friendly interface, with restaurant information displayed in a modern card-style layout.

## Future Enhancements

- Provide user authentication for personalized experiences, like saving favorite restaurants or preferences.

