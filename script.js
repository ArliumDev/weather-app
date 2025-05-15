// DOM

function manageForm() {
  const form = document.querySelector('#input-form');
  const input = document.querySelector('#user-input');
  const button = document.querySelector('#submit');
  button.addEventListener('click', (event) => {
    event.preventDefault();
    form.style.display = 'none';
    console.log(input.value);
    const city = input.value;
    resolveJSON(city);
  });
}

// Testing

manageForm();

// Logic

async function getWeatherData(city) {
  const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(city)}/next7days?unitGroup=us&key=M792QL5LYYLEX3EX73KR52WH5`);
  const weatherData = await response.json();
  console.log(weatherData);
  return weatherData;
}

async function resolveJSON(city) {
  const response = await getWeatherData(city);
  const location = response.address;
  const summary = response.description;
  const forecast = response.days.forEach((day, index) => {
    console.log(`Día ${index + 1}:`, day, `Humedad: ${day.humidity}`, `Amanecer: ${day.sunrise}`, `Atardecer: ${day.sunset}`);
  });
  console.log(location);
  console.log(summary);
  console.log(forecast);
  // return { location, summary, forecast }
}
