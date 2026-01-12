# Weather Analytics Dashboard

A modern weather dashboard application that displays real-time weather data with 5-day forecasts, built with HTML, CSS, and JavaScript.

## Features

- Real-time weather data display
- City search functionality
- Geolocation support (auto-detect user location)
- 5-day weather forecast
- Temperature unit toggle (Celsius/Fahrenheit)
- Weather details: Feels like, Humidity, Wind speed, Pressure
- Responsive design for all devices
- Modern dark theme UI

## Technologies Used

- HTML5
- CSS3 (Flexbox, Grid, Gradients)
- Vanilla JavaScript (ES6+)
- OpenWeatherMap API

## Setup Instructions

1. Get a free API key from [OpenWeatherMap](https://openweathermap.org/api)
2. Open `app.js` and replace `YOUR_API_KEY_HERE` with your actual API key
3. Open `index.html` in a browser

## API Key Setup

```javascript
const API_KEY = 'your_actual_api_key_here';
```

## Project Structure

```
weather-dashboard/
├── index.html      # Main HTML file
├── style.css       # Styles and responsive design
├── app.js          # JavaScript logic and API integration
└── README.md       # Project documentation
```

## Screenshots

The dashboard displays:
- Current temperature with weather icon
- City name and current date/time
- Weather description
- 4 detail cards (Feels like, Humidity, Wind, Pressure)
- 5-day forecast section

## Live Demo

Open `index.html` in your browser after adding your API key.

## Author

Built by Yash Kumar
