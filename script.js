// DOM

const forecastDisplay = document.querySelector('#forecast-display');

function manageForm() {
  const form = document.querySelector('#input-form');
  const input = document.querySelector('#user-input');
  const button = document.querySelector('#submit');
  button.addEventListener('click', (event) => {
    event.preventDefault();
    form.style.display = 'none';
    console.log(input.value);
    const city = input.value;
    display(city);
  });
}

manageForm();

// Logic

async function getWeatherData(city) {
  const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(city)}/next7days?unitGroup=metric&key=M792QL5LYYLEX3EX73KR52WH5`);
  const weatherData = await response.json();
  console.log(weatherData);
  return weatherData;
}

async function resolveJSON(city) {
  const loader = document.querySelector('.loader');
  loader.style.display = 'flex';
  forecastDisplay.textContent = '';
  try {
    const response = await getWeatherData(city);
    const forecast = response.days.map((day) => {
      return {
        date: reverseString(day.datetime),
        conditions: day.conditions,
        summary: day.description,
        feels_like: day.feelslike,
        humidity: day.humidity,
        icon: day.icon,
        sunrise: day.sunrise,
        sunset: day.sunset,
        av_temp: day.temp,
        max_temp: day.tempmax,
        min_temp: day.tempmin,
        uv: day.uvindex,
      };
    });
    console.log(forecast);
    return forecast;
  } catch (error) {
    forecastDisplay.textContent = 'Error obteniendo datos.';
    console.log('Error obteniendo datos, detalles: ', error);
  } finally {
    loader.style.display = 'none';
  }
}

async function display(city) {
  const data = await resolveJSON(city);
  if (!data) return;
  forecastDisplay.textContent = '';
  const locationDiv = document.createElement('div');
  locationDiv.classList.add('location-display');
  locationDiv.innerHTML = `<strong>Location: </strong>${city}`;
  forecastDisplay.appendChild(locationDiv);
  data.forEach((day) => {
    const dayDiv = document.createElement('div');
    dayDiv.classList.add('forecast-day');
    dayDiv.innerHTML = `
    <strong>${day.date}</strong><br>
    <strong>Conditions:</strong> ${day.conditions}<br>
    <strong>Summary:</strong> ${day.summary}<br>
    <strong>Feels like:</strong> ${day.feels_like}ºC<br>
    <strong>Humidity:</strong> ${day.humidity}%<br>
    <strong>Icon:</strong> ${getWeatherIcon(day.icon)}<br>
    <strong>Sunrise:</strong> ${deleteSeconds(day.sunrise)}h<br>
    <strong>Sunset:</strong> ${deleteSeconds(day.sunset)}h<br>
    <strong>Average temp:</strong> ${day.av_temp}ºC<br>
    <strong>Max temp:</strong> ${day.max_temp}ºC<br>
    <strong>Min temp:</strong> ${day.min_temp}ºC<br>
    <strong>UV:</strong> ${day.uv}<br>
    `;
    forecastDisplay.appendChild(dayDiv);
  });
}

// Data format

function reverseString(str) {
  const splitString = str.split('-');
  const reverseArr = splitString.reverse();
  const joinArr = reverseArr.join('-');
  return joinArr;
}

function deleteSeconds(hour) {
  const formatHour = hour.slice(0, 5);
  return formatHour;
}

function getWeatherIcon(str) {
  return iconMap[str] || '❔';
}

// Icon mapping

const iconMap = {
  'clear-day': '☀️',
  'clear-night': '🌙',
  'partly-cloudy-day': '🌤️',
  'partly-cloudy-night': '🌥️',
  cloudy: '☁️',
  rain: '🌧️',
  snow: '❄️',
  sleet: '🌨️',
  wind: '🌬️',
  fog: '🌫️',
  'showers-day': '🌦️',
  'showers-night': '🌧️',
  'thunder-rain': '⛈️',
  'thunder-showers-day': '⛈️',
  'thunder-showers-night': '⛈️',
  hail: '🌨️',
};


// Este es el commit correcto