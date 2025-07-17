document.addEventListener('DOMContentLoaded', () => {
    const weatherWidget = document.getElementById('weather-widget');

    if (weatherWidget && API_KEYS.weather !== 'YOUR_OPENWEATHERMAP_API_KEY') {
        // Fetch weather data from OpenWeatherMap
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${API_KEYS.weather}&units=metric`)
            .then(response => response.json())
            .then(data => {
                const weatherHTML = `
                    <h3>Current Weather</h3>
                    <p><strong>Location:</strong> ${data.name}</p>
                    <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
                    <p><strong>Condition:</strong> ${data.weather[0].description}</p>
                `;
                weatherWidget.innerHTML = weatherHTML;
            })
            .catch(error => {
                weatherWidget.innerHTML = `<p>Could not fetch weather data.</p>`;
            });
    } else if (weatherWidget) {
        weatherWidget.innerHTML = `<p>Please add your OpenWeatherMap API key.</p>`;
    }
});
