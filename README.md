# Restaurant Finder App

## Introduction Video

For a quick overview and demonstration of our Restaurant Finder App, watch our [introduction video](https://www.canva.com/design/DAGEAReXpwU/0b9Yu48h5R1rw_5fFMwVbw/watch?utm_content=DAGEAReXpwU&utm_campaign=designshare&utm_medium=link&utm_source=editor). This video provides a visual guide on how to navigate the app and utilize its features effectively, perfect for new users.

## Project Description

This web application is designed to help users effortlessly find restaurants based on their location and culinary preferences. By entering a city and a specific food category, users can discover a variety of dining options, view these on an interactive map, and read through or leave personal reviews. The application integrates several APIs to pull in real-time data, making it a dynamic tool for restaurant seekers. It also includes functionality for sorting search results and switching between a traditional list view and a map view.

## APIs Integrated

- **OpenWeatherMap API**: Used to determine geographical coordinates based on user-input city names, ensuring accurate restaurant searches within the desired locality.
- **Yelp Fusion API**: Sources comprehensive details about restaurants, including their ratings, user reviews, and photos, to help users make informed dining choices.
- **Google Maps JavaScript API**: Powers the map functionality of the app, allowing users to visually explore the locations of restaurants and plan their visits accordingly.

## Installation and Setup

To get the Restaurant Finder App up and running on your local machine, follow these steps:

1. **Clone the repository**:
   ```
   git clone [repository URL]
   ```
2. **Install necessary dependencies**:
Navigate to your project directory and run:
   ```
   npm install
   ```
4. **Environment configuration**:
Create a `.env` file in the project root and populate it with your API keys:
     ```
     OPENWEATHERMAP_API_KEY=<your_key>
     YELP_API_KEY=<your_key>
     GOOGLE_MAPS_API_KEY=<your_key>
     ```
5. **Start the server**:
   ```
   npm start
   ```
7. **Access the app**:
Open your web browser and go to `http://localhost:3000`.

## Key Features

- **Dynamic Search**: Users can search for restaurants by specifying a city and food category. Search results can be further refined and sorted by criteria such as rating, distance, and price.
- **Map Integration**: Toggle the view to display an interactive map that shows pins for each restaurant based on the search results, enhancing the navigational experience.
- **Review System**: Users can contribute reviews and rate restaurants using a star-rating system, fostering a community of informed and engaged users.
- **Responsive Design**: Features a responsive web design that adapts to different device screens, ensuring a smooth user experience across desktops, tablets, and smartphones.
- **Theme Switching**: Offers a light and dark mode for user preference, which can be toggled at any time to enhance visual comfort.

## Application Usage

- **Finding Restaurants**: Enter a city and a type of cuisine to see available restaurants that meet your criteria.
- **Navigating Results**: Use the sorting features to order restaurants by distance, price, or rating.
- **Leaving Feedback**: After visiting, you can easily leave a review and rate the restaurant directly within the app.

## Planned Future Enhancements

- **User Authentication**: We plan to introduce user profiles that allow for saving favorite restaurants and custom preferences.
- **Mobile Optimization**: Further enhancements to improve the mobile user experience, ensuring seamless functionality across all devices.







