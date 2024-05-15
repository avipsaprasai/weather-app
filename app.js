document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-btn');
    const weatherIcon = document.querySelector('.weather-icon');
    const temperature = document.querySelector('.temperature');
    const description = document.querySelector('.description');
    const location = document.querySelector('.location');

    searchButton.addEventListener('click', function() {
        const cityName = searchInput.value.trim();
        if (cityName !== '') {
            getWeather(cityName);
        } else {
            alert('Please enter a city name');
        }
    });

    async function getWeather(cityName) {
        const apiKey = 'cff2a6b10c313407cde266f695d503fd';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
    
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            displayWeather(data);
        } catch (error) {
            console.log('Error fetching weather data:', error);
            alert('Error fetching weather data. Please try again later.');
        }
    }
    

    function displayWeather(data) {
        if (data.cod === 200) {
            weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="Weather Icon">`;
            temperature.textContent = `${Math.round(data.main.temp)}°C`;
            description.textContent = data.weather[0].description;
            location.textContent = data.name + ', ' + data.sys.country;
        } else {
            alert('City not found. Please enter a valid city name.');
        }
    }
});
