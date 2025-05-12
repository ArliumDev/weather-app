async function getWeatherData() {
  const response = await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Las%20Palmas?unitGroup=us&key=M792QL5LYYLEX3EX73KR52WH5');
  const weatherData = await response.json();
  console.log(weatherData);
  return weatherData;
}

async function resolveJSON() {
  const response = await getWeatherData();
  const location = response.address;
  const summary = response.description;
  const forecast = response.days.forEach((day, index) => {
    console.log(`Día ${index + 1}:`, day);
  });
  console.log(location);
  console.log(summary);
  console.log(forecast);
}
resolveJSON();