// DOM Elements

const forecastDisplay = document.querySelector('#forecast-display');

// Fetch data

async function loadData() {
  try {
    const response = await fetch('data.json');
    const data = await response.json();

    const retrievedData = data.days.map((day) => {
      return {
        datetime: day.datetime,
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
    console.log(retrievedData);
    return retrievedData;
  } catch (error) {
    console.error(error);
  }
}

loadData();

// Display data

async function displayForecast() {
  const data = await loadData();
  forecastDisplay.innerHTML = '';
  const location = document.createElement("div");
  location.classList.add("location");
  location.innerHTML = `<strong>Location: </strong>Las Palmas`;
  forecastDisplay.appendChild(location);
  data.forEach((day) => {
    const dayCard = document.createElement('div');
    dayCard.classList.add('day-card');
    dayCard.innerHTML = `
    <strong>Day: </strong>${reverseString(day.datetime)}<br>
    <strong>Conditions: </strong>${day.conditions}<br>
    <strong>Summary: </strong>${day.summary}<br>
    <strong>Feels like: </strong>${day.feels_like}ºC<br>
    <strong>Humidity: </strong>${day.humidity}%<br>
    <strong>Icon: </strong>${getWeatherIcon(day.icon)}<br>
    <strong>Sunrise: </strong>${deleteSeconds(day.sunrise)}h<br>
    <strong>Sunset: </strong>${deleteSeconds(day.sunset)}h<br>
    <strong>Average temp: </strong>${day.av_temp}ºC<br>
    <strong>Max temp: </strong>${day.max_temp}ºC<br>
    <strong>Min temp: </strong>${day.min_temp}ºC<br>
    <strong>UV: </strong>${day.uv}
    `;
    forecastDisplay.appendChild(dayCard);
  });
}

displayForecast();

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
