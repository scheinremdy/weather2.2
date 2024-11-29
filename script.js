document.addEventListener("DOMContentLoaded", () => {
    const weatherForm = document.getElementById("weatherForm");
    const weatherInfo = document.getElementById("weatherInfo");
    const weatherIcon = document.getElementById("weatherIcon");
    const effectCanvas = document.getElementById("effectCanvas");

    let canvasCtx = effectCanvas.getContext("2d");
    let particlesArray = [];
    let weatherCondition = "";

    weatherForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const city = document.getElementById("city").value;
        const apiKey = "0dc2957f911be0df7a060c2992526cba"; // Replace with your OpenWeather API key
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                if (data.cod === 200) {
                    document.getElementById("cityName").textContent = data.name;
                    document.getElementById("temperature").textContent = data.main.temp;
                    document.getElementById("condition").textContent =
                        data.weather[0].description;
                    document.getElementById("humidity").textContent = data.main.humidity;
                    document.getElementById("windSpeed").textContent = data.wind.speed;

                    const iconCode = data.weather[0].icon;
                    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

                    weatherCondition = data.weather[0].main.toLowerCase();
                    updateCanvas(weatherCondition);

                    weatherInfo.classList.remove("hidden");
                } else {
                    alert("City not found!");
                }
            })
            .catch(() => alert("Error fetching weather data!"));
    });

    function updateCanvas(condition) {
        particlesArray = [];
        if (condition === "rain") {
            for (let i = 0; i < 100; i++) {
                particlesArray.push(new Particle("raindrop"));
            }
        } else if (condition === "snow") {
            for (let i = 0; i < 100; i++) {
                particlesArray.push(new Particle("snowflake"));
            }
        } else {
            particlesArray = [];
        }
    }

    class Particle {
        constructor(type) {
            this.type = type;
            this.x = Math.random() * window.innerWidth;
            this.y = Math.random() * window.innerHeight;
            this.size = Math.random() * 3 + 1;
            this.speed = Math.random() * 2 + 1;
        }

        update() {
            this.y += this.speed;
            if (this.y > window.innerHeight) this.y = 0;

            if (this.type === "raindrop") {
                this.x += Math.random() * 2 - 1;
            }
        }

        draw() {
            canvasCtx.fillStyle = this.type === "raindrop" ? "blue" : "white";
            canvasCtx.beginPath();
            canvasCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            canvasCtx.fill();
        }
    }

    function animateParticles() {
        canvasCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        particlesArray.forEach((particle) => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animateParticles);
    }

    animateParticles();
});
