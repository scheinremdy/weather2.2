document.getElementById('weather-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const city = document.getElementById('city-input').value;
    const apiKey = 'your_api_key_here';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    document.getElementById('error-message').style.display = 'none';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === '404') {
                showError('City not found. Please try again.');
            } else {
                updateWeather(data);
                updateBackground(data.weather[0].main);
            }
        })
        .catch(() => {
            showError('Error fetching data. Please check your connection.');
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

    document.getElementById('weather-display').classList.remove('hidden');
    document.getElementById('city-name').textContent = data.name;
    document.getElementById('weather-description').textContent = data.weather[0].description;
    document.getElementById('temp').textContent = data.main.temp;
    document.getElementById('feels-like').textContent = data.main.feels_like;
    document.getElementById('humidity').textContent = data.main.humidity;
    document.getElementById('wind-speed').textContent = data.wind.speed;
    document.getElementById('sunrise').textContent = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
    document.getElementById('sunset').textContent = new Date(data.sys.sunset * 1000).toLocaleTimeString();
    document.getElementById('weather-icon').textContent = weatherIconMap[data.weather[0].main] || '🌍';
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
