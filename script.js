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
        fecha: reverseString(day.datetime),
        condiciones: day.conditions,
        descripcion: day.description,
        sensacion_termica: day.feelslike,
        humedad: day.humidity,
        icono: day.icon,
        amanecer: day.sunrise,
        atardecer: day.sunset,
        temp_media: day.temp,
        temp_max: day.tempmax,
        temp_min: day.tempmin,
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

  data.forEach((day) => {
    const dayDiv = document.createElement('div');
    dayDiv.classList.add('forecast-day');
    dayDiv.innerHTML = `
    <strong>${day.fecha}</strong><br>
    Condiciones: ${day.condiciones}<br>
    Descripción: ${day.descripcion}<br>
    Sensación térmica: ${day.sensacion_termica}<br>
    Humedad: ${day.humedad}<br>
    Icono: ${day.icono}<br>
    Amanecer: ${day.amanecer}<br>
    Atardecer: ${day.atardecer}<br>
    Temperatura media: ${day.temp_media}<br>
    Temperatura máxima: ${day.temp_max}<br>
    Temperatura mínima: ${day.temp_min}<br>
    Índice UV: ${day.uv}<br>
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
