// --- OPENWEATHERMAP API CONFIGURATION ---
const apiKey =  "f8edbbf29e74ee98ed602915e69861ff"; // Your API key
const lat = "9.0764785000"; // Latitude 
const lon = "7.3985740000"; // Longitude 
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

// --- WEATHER FUNCTIONS ---

async function fetchWeather() {
    try {
        const [currentResponse, forecastResponse] = await Promise.all([
            fetch(weatherUrl),
            fetch(forecastUrl)
        ]);

        if (!currentResponse.ok || !forecastResponse.ok) {
            throw new Error(`API Error: ${currentResponse.status || forecastResponse.status}`);
        }

        const currentData = await currentResponse.json();
        const forecastData = await forecastResponse.json();

        displayCurrentWeather(currentData);
        displayForecast(forecastData);

    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.getElementById('current-weather').innerHTML = '<p>Weather unavailable.</p>';
        document.getElementById('weather-forecast').innerHTML = '<h3>Forecast (3 Days)</h3><p>Unavailable.</p>';
    }
}

function displayCurrentWeather(data) {
    const tempCelsius = data.main.temp;
    const tempFahrenheit = (tempCelsius * 9/5 + 32).toFixed(0); 
    const description = data.weather[0].description.toUpperCase();
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

    const weatherHtml = `
        <div class="weather-summary">
            <img src="${iconUrl}" alt="${description}">
            <p class="temp">${tempFahrenheit}°F</p>
        </div>
        <p class="description">${description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
    `;
    document.getElementById('current-weather').innerHTML = weatherHtml;
}

function displayForecast(data) {
    const forecastElement = document.getElementById('weather-forecast');
    forecastElement.innerHTML = `<h3>Forecast (3 Days)</h3>`;
    
    const relevantForecasts = [
        data.list[8],  
        data.list[16], 
        data.list[24]  
    ];

    relevantForecasts.forEach((item) => {
        if (item) {
            const date = new Date(item.dt * 1000);
            const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()];
            const tempFahrenheit = (item.main.temp * 9/5 + 32).toFixed(0); 
            
            forecastElement.innerHTML += `
                <p><strong>${dayName}:</strong> ${tempFahrenheit}°F</p>
            `;
        }
    });
}

// --- SPOTLIGHT FUNCTIONS ---
async function fetchSpotlights() {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) throw new Error('Failed to load members.');
        
        const members = await response.json();
        
        const eligibleMembers = members.filter(member => 
            member.membershipLevel === 3 || member.membershipLevel === 2
        );
        
        const selectedSpotlights = getRandomElements(eligibleMembers, 3);
        
        displaySpotlights(selectedSpotlights);
  
    } catch (error) {
        console.error("Error fetching or displaying spotlights:", error);
        document.querySelector('.spotlight-container').innerHTML = '<p>Spotlights currently unavailable.</p>';
    }
  }
  
  function getRandomElements(arr, n) {
    if (n >= arr.length) return arr;
    
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  }
  
  function displaySpotlights(spotlights) {
    const container = document.querySelector('.spotlight-container');
    if (!container) return;
    
    container.innerHTML = '';
  
    spotlights.forEach(member => {
        const memberLevel = member.membershipLevel === 3 ? 'Gold' : 'Silver';
        const levelClass = memberLevel.toLowerCase();
  
        const spotlightCard = document.createElement('div');
        spotlightCard.classList.add('spotlight-card', `level-${levelClass}`);
        
        spotlightCard.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} Logo">
            <h3>${member.name}</h3>
            <p class="tagline">${member.description}</p>
            <hr>
            <p><strong>Level:</strong> ${memberLevel}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><a href="${member.website}" target="_blank">Visit Website</a></p>
        `;
        
        container.appendChild(spotlightCard);
    });
  }
  
  


    
// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    fetchWeather();
    fetchSpotlights();
});
