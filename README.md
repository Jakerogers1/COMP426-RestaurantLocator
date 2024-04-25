# COMP426-FinalProject

# Choosey Web Application

Choosey is a web application that leverages the Yelp API to provide users with business search functionality. It is built with Node.js, Express, and vanilla JavaScript for the front-end interactivity.

## Directory Structure

- `public/`: Contains all client-facing files, including HTML, CSS, and client-side JavaScript.
- `src/`: Contains the server-side JavaScript file for the Express application.
- `script.js`: Contains JavaScript code for client-side logic.

## Getting Started

### Prerequisites

Before running the application, make sure you have Node.js installed on your system.

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/choosey-webapp.git

   ```

2. Navigate to the project directory:

   ```sh
   cd choosey-webapp

   ```

3. Install the required dependencies:

   ```sh
   npm install

   ```

4. Install the express module and node-fetch module:

   ```sh
   npm install express
   npm install node-fetch

   ```

5. Create a .env file in the root directory with the following content, replacing your_yelp_api_key_here with your actual Yelp API key:
   ```sh
   YELP_API_KEY=your_yelp_api_key_here
   ```

## Running the Application

To start the server, run:

```sh
npm start

```

The application will be available at http://localhost:3000.

## Testing

To test the search functionality:

Navigate to http://localhost:3000 in your web browser.
Use the search form to enter a search term.
Verify that the search results are displayed correctly.

```

```
