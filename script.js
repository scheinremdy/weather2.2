document.getElementById('weather-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const city = document.getElementById('city-input').value;
    const apiKey = 'your_api_key_here'; // Replace with your OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    document.getElementById('error-message').style.display = 'none';

    fetch(apiUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error('City not found.');
            }
            return response.json();
        })
        .then((data) => {
            updateWeather(data);
            updateBackground(data.weather[0].main);
        })
        .catch((error) => {
            showError('Error: Could not fetch weather data. Please try again.');
            console.error(error);
        });
});

function updateWeather(data) {
    const weatherIconMap = {
        Clear: '☀️',
        Clouds: '☁️',
        Rain: '🌧️',
        Snow: '❄️',
        Thunderstorm: '⛈️',
        Drizzle: '🌦️',
        Mist: '🌫️',
    };

    // Display weather details
    document.getElementById('weather-display').classList.remove('hidden');
    document.getElementById('city-name').textContent = data.name;
    document.getElementById('weather-description').textContent = data.weather[0].description;
    document.getElementById('temp').textContent = data.main.temp.toFixed(1);
    document.getElementById('feels-like').textContent = data.main.feels_like.toFixed(1);
    document.getElementById('humidity').textContent = data.main.humidity;
    document.getElementById('wind-speed').textContent = data.wind.speed.toFixed(1);
    document.getElementById('sunrise').textContent = formatTime(data.sys.sunrise);
    document.getElementById('sunset').textContent = formatTime(data.sys.sunset);
    document.getElementById('weather-icon').textContent = weatherIconMap[data.weather[0].main] || '🌍';
}

function formatTime(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

function updateBackground(condition) {
    const body = document.body;
    body.className = ''; // Reset classes
    if (condition === 'Clear') body.classList.add('sunny');
    if (condition === 'Clouds') body.classList.add('cloudy');
    if (condition === 'Rain' || condition === 'Drizzle' || condition === 'Thunderstorm') body.classList.add('rainy');
}

function showError(message) {
    const errorElement = document.getElementById('error-message');
    errorElement.style.display = 'block';
    errorElement.textContent = message;
    document.getElementById('weather-display').classList.add('hidden');
}

function updateClock() {
    document.getElementById('clock').textContent = new Date().toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();
