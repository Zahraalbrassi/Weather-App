# Weather App

A simple weather application built with React that allows users to search for weather information by city, save favorite cities, and view the last searched city upon reloading the app.

## Features

- **Search Weather by City**: Enter the name of a city to get current weather information, including temperature, humidity, and wind speed.
- **Last Searched City**: The app remembers the last searched city and automatically displays its weather data when the app is reloaded.
- **Favorite Cities**: Users can save their favorite cities and quickly access the weather information for those cities. Favorites are stored in `localStorage`, so they persist across sessions.
- **Remove Favorite Cities**: Users can remove cities from their list of favorites.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **OpenWeather API**: Used to fetch current weather data for cities.
- **CSS**: Custom styling for the app.
## Project Structure

- **src/Weather.jsx**: Contains the main logic and UI for the weather app.
- **src/FavoriteCities.jsx**: A separate component for managing and displaying favorite cities.
- **src/AddToFavorites.jsx**: A separate component for adding cities to the favorites list.
- **src/Weather.css**: Contains the styling for the weather app.
- **public/**: Contains the `index.html` and assets used in the app.
## Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Zahraalbrassi/Weather-App.git
 