'use strict';

const apikey = '7c89dfc6b8c54ab5daa516325e286b4b';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const container = document.createElement('div');
main.appendChild(container);
container.classList.add('container');

const url = (city) => {
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
};

const convertToCelcium = (degree) => (degree - 273).toFixed(2);

const showWeather = (weather) => {
  const temp = convertToCelcium(weather.main.temp);
  container.innerHTML = `
        <h2><img src="https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png" /> ${temp}°C <img src="https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png" /></h2>
        <small>${weather.weather[0].main}</small>
    `;
};

const getWeather = (city) => {
  fetch(url(city))
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
      container.innerHTML = `<small>Cant get weather info /n avc</small>`;
    })
    .then((weather) => {
      showWeather(weather);
    })
    .catch((error) => {
      console.log(error);
      container.innerHTML = `<small>No such city</small>`;
    });
};

form.addEventListener('submit', (e) => {
  const city = search.value;
  if (city) getWeather(city);
  e.preventDefault();
});
