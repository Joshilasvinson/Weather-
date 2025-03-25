// script.js

const apiKey = '77afe6969264178e5edae7817c9cfc16'; 
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('city');
const weatherDetails = document.getElementById('weatherDetails');
const errorMessage = document.getElementById('errorMessage');
const cityName = document.getElementById('cityName');
const weatherIcon = document.getElementById('weatherIcon');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');
const description = document.getElementById('description');

// Function to fetch weather data
async function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('City not found');
    }
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    errorMessage.classList.remove('hidden');
    weatherDetails.classList.add('hidden');
  }
}

// Function to display weather data
function displayWeather(data) {
  cityName.textContent = data.name;
  temperature.textContent = `Temperature: ${data.main.temp}°C`;
  humidity.textContent = `Humidity: ${data.main.humidity}%`;
  description.textContent = `Description: ${data.weather[0].description}`;
  weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
  weatherIcon.alt = data.weather[0].description;

  weatherDetails.classList.remove('hidden');
  errorMessage.classList.add('hidden');
}

// Event listener for the search button
searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) {
    fetchWeather(city);
  }
});

// Optional: Handle pressing Enter to trigger the search
cityInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    searchBtn.click();
  }
});
