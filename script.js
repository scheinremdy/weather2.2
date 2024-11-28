document.getElementById('weather-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const city = document.getElementById('city-input').value;
    const apiKey = '0dc2957f911be0df7a060c2992526cba'; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === '404') {
                showError('City not found. Please try again.');
            } else {
                showWeather(data);
            }
        })
        .catch(() => {
            showError('Error fetching data. Please check your internet connection.');
        });
});

function showWeather(data) {
    document.getElementById('weather-display').classList.remove('hidden');
    document.getElementById('error-message').classList.add('hidden');
    
    document.getElementById('city-name').textContent = data.name;
    document.getElementById('weather-description').textContent = data.weather[0].description;
    document.getElementById('temp').textContent = data.main.temp;
    document.getElementById('humidity').textContent = data.main.humidity;
    document.getElementById('wind-speed').textContent = data.wind.speed;
}

function showError(message) {
    document.getElementById('error-message').classList.remove('hidden');
    document.getElementById('weather-display').classList.add('hidden');
    document.getElementById('error-message').textContent = message;
}
