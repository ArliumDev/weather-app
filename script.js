// Fetch data

fetch('data.json')
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => {
    console.error('Error al cargar el JSON:', error);
  });

// DOM

const forecastDisplay = document.querySelector('#forecast-display');

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
