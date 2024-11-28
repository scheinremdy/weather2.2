document.getElementById('weather-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const city = document.getElementById('city-input').value;
    const apiKey = 'your_api_key_here'; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    // Clear previous messages
    document.getElementById('error-message').style.display = 'none';

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
    document.getElementById('error-message').style.display = 'none'; // Hide error
    document.getElementById('city-name').textContent = data.name;
    document.getElementById('weather-description').textContent = data.weather[0].description;
    document.getElementById('temp').textContent = data.main.temp;
    document.getElementById('humidity').textContent = data.main.humidity;
    document.getElementById('wind-speed').textContent = data.wind.speed;
}

function showError(message) {
    const errorElement = document.getElementById('error-message');
    errorElement.style.display = 'block';
    errorElement.textContent = message; // Show error message
    document.getElementById('weather-display').classList.add('hidden'); // Hide weather details
}
