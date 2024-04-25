# Weather and GIFs App

## Description

This web application allows users to enter a city name and retrieves the current temperature and a weather-related GIF. It demonstrates the use of external APIs and Node.js for backend development.

## APIs Used

- **OpenWeatherMap API**: Provides real-time weather data.
- **GIPHY API**: Offers a wide range of animated GIFs, which this app uses to display GIFs that correlate with the current weather conditions.

## Setup

1. **Clone the repository**: Use `git clone` followed by the repository URL to clone the repo onto your local machine.
2. **Install dependencies**: Navigate to the root directory of the project in your terminal and run `npm install` to install all required dependencies.
3. **Set up environment variables**:
   - Create a `.env` file in the root directory of the project.
   - Add your OpenWeatherMap and GIPHY API keys to the `.env` file like so:
     ```
     OPENWEATHERMAP_API_KEY=your_openweathermap_api_key_here
     GIPHY_API_KEY=your_giphy_api_key_here
     ```
4. **Start the server**: Run `npm start` from the root directory to start the server.
5. **Access the application**: Open your web browser and go to `http://localhost:3000` to use the application.

## Running the Application

After the setup is complete and the server is running, you can interact with the application by:

- Entering a city name in the input field.
- Clicking the "Get Weather" button to retrieve and display the temperature and a GIF representing the current weather.

## Notes

- The application's frontend statically serves from the `public` directory.
- API keys are managed securely using environment variables and are not stored in the frontend code.
