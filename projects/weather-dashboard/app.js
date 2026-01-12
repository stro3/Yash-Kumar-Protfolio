const API_KEY = '30a2b507179d6536d33ba88a505eda9f';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

let isCelsius = true;
let currentWeatherData = null;
let forecastData = null;

const elements = {
    searchInput: document.getElementById('searchInput'),
    searchBtn: document.getElementById('searchBtn'),
    unitToggle: document.getElementById('unitToggle'),
    cityName: document.getElementById('cityName'),
    dateTime: document.getElementById('dateTime'),
    temperature: document.getElementById('temperature'),
    tempUnit: document.getElementById('tempUnit'),
    weatherIcon: document.getElementById('weatherIcon'),
    weatherDesc: document.getElementById('weatherDesc'),
    feelsLike: document.getElementById('feelsLike'),
    humidity: document.getElementById('humidity'),
    windSpeed: document.getElementById('windSpeed'),
    pressure: document.getElementById('pressure'),
    forecastContainer: document.getElementById('forecastContainer')
};

function init() {
    elements.searchBtn.addEventListener('click', handleSearch);
    elements.searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });
    elements.unitToggle.addEventListener('click', toggleUnit);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
            },
            () => {
                fetchWeatherByCity('Delhi');
            }
        );
    } else {
        fetchWeatherByCity('Delhi');
    }

    updateDateTime();
    setInterval(updateDateTime, 60000);
}

function handleSearch() {
    const city = elements.searchInput.value.trim();
    if (city) {
        fetchWeatherByCity(city);
        elements.searchInput.value = '';
    }
}

async function fetchWeatherByCity(city) {
    try {
        const response = await fetch(
            `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
        );

        if (!response.ok) {
            throw new Error('City not found');
        }

        currentWeatherData = await response.json();
        updateCurrentWeather(currentWeatherData);

        const forecastResponse = await fetch(
            `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
        );
        forecastData = await forecastResponse.json();
        updateForecast(forecastData);

    } catch (error) {
        showError(error.message);
    }
}

async function fetchWeatherByCoords(lat, lon) {
    try {
        const response = await fetch(
            `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );

        currentWeatherData = await response.json();
        updateCurrentWeather(currentWeatherData);

        const forecastResponse = await fetch(
            `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        forecastData = await forecastResponse.json();
        updateForecast(forecastData);

    } catch (error) {
        showError(error.message);
    }
}

function updateCurrentWeather(data) {
    elements.cityName.textContent = `${data.name}, ${data.sys.country}`;

    const temp = isCelsius ? data.main.temp : celsiusToFahrenheit(data.main.temp);
    elements.temperature.textContent = Math.round(temp);
    elements.tempUnit.textContent = isCelsius ? '°C' : '°F';

    elements.weatherDesc.textContent = data.weather[0].description;

    const feelsLike = isCelsius ? data.main.feels_like : celsiusToFahrenheit(data.main.feels_like);
    elements.feelsLike.textContent = `${Math.round(feelsLike)}°${isCelsius ? 'C' : 'F'}`;
    elements.humidity.textContent = `${data.main.humidity}%`;
    elements.windSpeed.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;
    elements.pressure.textContent = `${data.main.pressure} hPa`;

    updateWeatherIcon(data.weather[0].main);
}

function updateForecast(data) {
    const dailyData = [];
    const seenDates = new Set();

    data.list.forEach(item => {
        const date = new Date(item.dt * 1000).toDateString();
        if (!seenDates.has(date) && dailyData.length < 5) {
            seenDates.add(date);
            dailyData.push(item);
        }
    });

    elements.forecastContainer.innerHTML = dailyData.map(day => {
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const temp = isCelsius ? day.main.temp : celsiusToFahrenheit(day.main.temp);
        const tempMin = isCelsius ? day.main.temp_min : celsiusToFahrenheit(day.main.temp_min);

        return `
            <div class="forecast-card">
                <div class="forecast-day">${dayName}</div>
                <div class="forecast-icon">
                    ${getWeatherIconSVG(day.weather[0].main)}
                </div>
                <div class="forecast-temp">${Math.round(temp)}°</div>
                <div class="forecast-temp-min">Low: ${Math.round(tempMin)}°</div>
            </div>
        `;
    }).join('');
}

function updateWeatherIcon(condition) {
    elements.weatherIcon.innerHTML = getWeatherIconSVG(condition);
}

function getWeatherIconSVG(condition) {
    const icons = {
        Clear: `<svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="12" cy="12" r="5"></circle>
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>
        </svg>`,
        Clouds: `<svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
        </svg>`,
        Rain: `<svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M16 13v8M8 13v8M12 15v8M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"></path>
        </svg>`,
        Snow: `<svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"></path>
            <path d="M8 16h.01M8 20h.01M12 18h.01M12 22h.01M16 16h.01M16 20h.01"></path>
        </svg>`,
        Thunderstorm: `<svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"></path>
            <polyline points="13 11 9 17 15 17 11 23"></polyline>
        </svg>`,
        Drizzle: `<svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M8 19v2M8 13v2M16 19v2M16 13v2M12 21v2M12 15v2M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"></path>
        </svg>`,
        Mist: `<svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M5 5h14M3 10h18M5 15h14M3 20h18"></path>
        </svg>`
    };

    return icons[condition] || icons.Clear;
}

function toggleUnit() {
    isCelsius = !isCelsius;
    if (currentWeatherData) {
        updateCurrentWeather(currentWeatherData);
    }
    if (forecastData) {
        updateForecast(forecastData);
    }
}

function celsiusToFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}

function updateDateTime() {
    const now = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    elements.dateTime.textContent = now.toLocaleDateString('en-US', options);
}

function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = `Error: ${message}. Please try again.`;

    const existing = document.querySelector('.error-message');
    if (existing) existing.remove();

    document.querySelector('.main-content').prepend(errorDiv);

    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

document.addEventListener('DOMContentLoaded', init);
