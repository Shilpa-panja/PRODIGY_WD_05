// script.js
const apiKey = '8d707c71b6e1c347c1e22ee89da56f2e'; // Replace with your OpenWeatherMap API key
const weatherInfo = document.getElementById('weatherInfo');
const getWeatherBtn = document.getElementById('getWeatherBtn');

getWeatherBtn.addEventListener('click', () => {
    const location = document.getElementById('locationInput').value;
    if (location) {
        getWeather(location);
    } else {
        weatherInfo.innerHTML = '<p>Please enter a location.</p>';
    }
});

function getWeather(location) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
    
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('API response:', data); // Log the entire API response for debugging
            displayWeather(data);
        })
        .catch(error => {
            weatherInfo.innerHTML = `<p>Error fetching weather data: ${error.message}. Please try again.</p>`;
            console.error('Error fetching weather data:', error);
        });
}

function displayWeather(data) {
    if (data.cod === '405') {
        weatherInfo.innerHTML = `<p>Location not found. Please try again.</p>`;
        return;
    }

    if (!data.main || !data.weather || !data.wind) {
        weatherInfo.innerHTML = `<p>Unexpected API response structure. Please try again.</p>`;
        console.error('Unexpected API response structure:', data);
        return;
    }

    const { name, main, weather, wind } = data;
    const temp = main.temp;
    const weatherDescription = weather[0].description;
    const humidity = main.humidity;
    const windSpeed = wind.speed;

    weatherInfo.innerHTML = `
        <h2>Weather in ${name}</h2>
        <p><strong>Temperature:</strong> ${temp}°C</p>
        <p><strong>Description:</strong> ${weatherDescription}</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
        <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
    `;
}
