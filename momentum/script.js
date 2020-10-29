// DOM
const TIME = document.querySelector('.time');
const LOCATION = document.querySelector('.location');
const DAY = document.querySelector('.day');
const DATE = document.querySelector('.date');
const WEATHERLOCATION = document.querySelector('.weather-location');
const NAME = document.querySelector('.name');
const FOCUS = document.querySelector('.focus');
const WEATHER = document.querySelector('.weather');
const GREETING = document.querySelector('.greeting');
const PHRASE = document.querySelector('.phrase');
const REFRESH = document.querySelector('.refresh');
const BODY = document.querySelector('body');
const RIGHT = document.querySelector('.right');

// Handlers
document.addEventListener('DOMContentLoaded', () => {
  setInterval(() => {
    renderTime();
  }, 1);
  /* renderLocation(); */
  renderDay();
  renderDate();
  renderForecastOnLoad();
  renderGreeting();
  getWeatherLocation();
  getName();
  getFocus();
  getRandomArray();
  renderBackground();
  setLoop();
  renderPhrase();
});

WEATHERLOCATION.addEventListener('keypress', setValue);
WEATHERLOCATION.addEventListener('blur', setValue);
WEATHERLOCATION.addEventListener('click', resetWeatherLocation);

WEATHERLOCATION.addEventListener('blur', renderForecast);

NAME.addEventListener('keypress', setValue);
NAME.addEventListener('blur', setValue);
NAME.addEventListener('click', resetName);

FOCUS.addEventListener('keypress', setValue);
FOCUS.addEventListener('blur', setValue);
FOCUS.addEventListener('click', resetFocus);

REFRESH.addEventListener('click', renderPhrase);
REFRESH.addEventListener('click', addAnimation);

RIGHT.addEventListener('click', renderBackgroundNext);

/* Functions */

// Get Day
function getCurrentDay() {
  let currentMonth = new Date().getMonth();
  switch (currentMonth) {
    case 0:
      currentMonth = 'January';
      break;
    case 1:
      currentMonth = 'February';
      break;
    case 2:
      currentMonth = 'March';
      break;
    case 3:
      currentMonth = 'April';
      break;
    case 4:
      currentMonth = 'May';
      break;
    case 5:
      currentMonth = 'June';
      break;
    case 6:
      currentMonth = 'July';
      break;
    case 7:
      currentMonth = 'August';
      break;
    case 8:
      currentMonth = 'September';
      break;
    case 9:
      currentMonth = 'October';
      break;
    case 10:
      currentMonth = 'November';
      break;
    case 11:
      currentMonth = 'November';
      break;

    default:
      throw new Error('Something went wrong!');
  }

  let currentDay = new Date().getDay();
  switch (currentDay) {
    case 0:
      currentDay = 'Sunday';
      break;
    case 1:
      currentDay = 'Monday';
      break;
    case 2:
      currentDay = 'Tuesday';
      break;
    case 3:
      currentDay = 'Wednesday';
      break;
    case 4:
      currentDay = 'Thursday';
      break;
    case 5:
      currentDay = 'Friday';
      break;
    case 6:
      currentDay = 'Saturday';
      break;

    default:
      throw new Error('Something went wrong!');
  }

  const objectDay = {
    month: currentMonth,
    day: currentDay,
  };

  return objectDay;
}

// Render Day
function renderDay() {
  DAY.innerHTML = `<span>${getCurrentDay().month}, ${getCurrentDay().day}</span>`;
}

/* --------- */

// Get Date
function getDate() {
  const currentDate = new Date().getDate();
  const currentYear = new Date().getFullYear();

  const currentNumberMonth = new Date().getMonth() < 10 ? `0${new Date().getMonth()}` : new Date().getMonth();

  const objectDate = {
    day: currentDate,
    month: currentNumberMonth,
    year: currentYear,
  };

  return objectDate;
}

// Render Date
function renderDate() {
  DATE.innerHTML = `<span>${getDate().day}.${+getDate().month + 1}.${getDate().year}</span>`;
}

/* --------- */

// Get Time
function getTime() {
  const h = new Date().getHours() < 10 ? `0${new Date().getHours()}` : new Date().getHours();
  const m = new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : new Date().getMinutes();
  const s = new Date().getSeconds() < 10 ? `0${new Date().getSeconds()}` : new Date().getSeconds();

  const objectTime = {
    hour: h,
    minute: m,
    second: s,
  };

  return objectTime;
}

// Render Time
function renderTime() {
  TIME.innerHTML = `
    <span class="hours">${getTime().hour}</span>
    <span>:</span>
    <span class="minutes">${getTime().minute}</span>
    <span>:</span>
    <span class="seconds">${getTime().second}</span>`;
}

/* --------- */

// Get Forecast
function getForecast() {
  const idApi = `1b6b5070efbf756fbf0bba5241bcc2db`;
  const urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${WEATHERLOCATION.textContent}&appid=${idApi}`;

  const requestApi = fetch(urlApi)
    .then((res) => {
      if (res.status >= 400 && res.status < 500 && res.status != 404) {
        console.log('Error res');
      } else {
        return res.json();
      }
    })
    .then((data) => {
      if (data.cod == '404') {
        console.log('Error data');
        renderErrorApi();
      } else {
        return data;
      }
    })
    .catch(() => {
      throw new Error(renderErrorFetch());
    });

  return requestApi;
}

// Render Forecast
async function renderForecast() {
  currentForecast = await getForecast();

  WEATHER.innerHTML = `
    <div class="temperature"><span>${Math.round(currentForecast.main.temp - 273.15)}°</span>
    <img class="icon" src="./assets/img/weather/${currentForecast.weather[0].icon}.svg" alt="" width="30" /></div>
    <div class="feels">Feels: ${Math.round(currentForecast.main.feels_like - 273.15)}°</div>
    <div class="wind">Wind: ${currentForecast.wind.speed} m/s</div>
    <div class="humidity">Humidity: ${currentForecast.main.humidity}%</div>
  `;
}

// Get Forecast On Load
function getForecastOnLoad() {
  const idApi = `1b6b5070efbf756fbf0bba5241bcc2db`;
  const urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${locationCity}&appid=${idApi}`;

  const requestApi = fetch(urlApi)
    .then((res) => {
      if (res.status >= 400 && res.status < 500 && res.status != 404) {
        console.log('Error res');
      } else {
        return res.json();
      }
    })
    .then((data) => {
      if (data.cod === '404') {
        console.log('Error data');
        renderErrorApi();
      } else {
        return data;
      }
    })
    .catch(() => {
      throw new Error(renderErrorFetch());
    });

  return requestApi;
}

// Render Forecast On Load
async function renderForecastOnLoad() {
  currentForecast = await getForecastOnLoad();

  WEATHER.innerHTML = `
    <div class="temperature"><span>${Math.round(currentForecast.main.temp - 273.15)}°</span>
    <img class="icon" src="./assets/img/weather/${currentForecast.weather[0].icon}.svg" alt="" width="30" /></div>
    <div class="feels">Feels: ${Math.round(currentForecast.main.feels_like - 273.15)}°</div>
    <div class="wind">Wind: ${currentForecast.wind.speed} m/s</div>
    <div class="humidity">Humidity: ${currentForecast.main.humidity}%</div>
  `;
}

// Render Error Api
function renderErrorApi() {
  if (WEATHERLOCATION.textContent === '[Enter Location]') {
    WEATHER.innerHTML = `<span>No Location</span>`;
  } else {
    WEATHER.innerHTML = `
  <span>Incorrect</span>
  <span>request</span>
  <span>to API</span>
  `;
  }
}

// Render Error Fetch
function renderErrorFetch() {
  if (WEATHERLOCATION.textContent === '[Enter Location]') {
    WEATHER.innerHTML = `<span>No Location</span>`;
  } else {
    WEATHER.innerHTML = `
  <span>Wrong request</span>
  <span>or crashed</span>
  <span>Internet / Api</span>
  `;
  }
}

/* --------- */

// Set Greeting
function setGreeting() {
  const currentHour = getTime().hour;
  let greeting = '';

  switch (true) {
    case currentHour >= 6 && currentHour < 12:
      greeting = 'Good morning, ';
      break;
    case currentHour >= 12 && currentHour < 18:
      greeting = 'Good day, ';
      break;
    case currentHour >= 18 && currentHour < 24:
      greeting = 'Good evening, ';
      break;
    case currentHour >= 0 && currentHour < 6:
      greeting = 'Good night, ';
      break;
  }

  return greeting;
}

// Render Greeting
function renderGreeting() {
  GREETING.textContent = `${setGreeting()}`;
}

/* --------- */

// Get Weather Location
function getWeatherLocation() {
  let loc = localStorage.getItem('weather-location');

  if (loc == null || loc.toString().trim() === '') {
    WEATHERLOCATION.innerText = '[Enter Location]';
  } else {
    WEATHERLOCATION.innerText = loc;
  }

  return loc;
}

let locationCity = getWeatherLocation();

// Get Name
function getName() {
  let loc = localStorage.getItem('name');

  if (loc == null || loc.toString().trim() === '') {
    NAME.innerText = '[Enter name]';
  } else {
    NAME.innerText = loc;
  }
}

// Get Focus
function getFocus() {
  let loc = localStorage.getItem('focus');

  if (loc == null || loc.toString().trim() === '') {
    FOCUS.innerText = '[Enter focus]';
  } else {
    FOCUS.innerText = localStorage.getItem('focus');
  }
}

// Set Value
function setValue(e) {
  let target = e.target;

  if (e.type === 'keypress') {
    if (e.which == 13 || e.keyCode === 13) {
      if (!target.innerText.toString().trim() == '' && !target.innerText.includes('[Enter ')) {
        localStorage.setItem(target.className, target.innerText);
      }
      target.blur();
    }
  } else if (e.type === 'blur') {
    if (target.innerText.toString().trim() == '' || target.innerText.includes('[Enter ')) {
      if (target.className === 'name') {
        getName();
      } else if (target.className === 'focus') {
        getFocus();
      } else if (target.className === 'weather-location') {
        getWeatherLocation();
      }
    } else {
      localStorage.setItem(target.className, target.innerText);
    }
  }
}

/* --------- */

// Reset Weather Location
function resetWeatherLocation() {
  WEATHERLOCATION.textContent = '';
}

// Reset Name
function resetName() {
  NAME.textContent = '';
}

// Reset Focus
function resetFocus() {
  FOCUS.textContent = '';
}

/* --------- */

// Get Random Array
function getRandomArray() {
  let arraySet = [];

  while (arraySet.length < 6) {
    arraySet.push(getRandomNumber(1, 20));
    arraySet = [...new Set(arraySet)];
  }
  return arraySet;
}

/* --------- */

// Get Random Number
function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* --------- */

// Set Background
let counter = 0;

const imageArray = getRandomArray().map((element) => {
  return (element = element < 10 ? `0${element}` : element.toString());
});

const timeOfDayArray = ['night', 'morning', 'day', 'evening'];

const timeOfDayObject = {
  night: imageArray,
  morning: imageArray,
  day: imageArray,
  evening: imageArray,
};

function setBackground() {
  let folder = timeOfDayArray[Math.floor((counter % 24) / 6)];
  let imageNumber = counter % 6;

  let img = document.createElement('img');
  let src = `assets/img/background/${folder}/${timeOfDayObject[folder][imageNumber]}.jpg`;
  img.src = src;
  img.onload = () => (BODY.style.backgroundImage = `url(${src})`);
}

// Render Background
function renderBackground() {
  counter++;
  setBackground();
}

let startScript = (new Date().getHours() + 1) % 24;

if (new Date().getMinutes() == 0) {
  renderBackground();
}

// Set Loop
function setLoop() {
  let date = new Date();
  if (date.getMinutes() == 0 && date.getHours() == startScript) {
    startScript = (startScript + 1) % 24;
    console.log(startScript);
    renderBackground();
  }

  setTimeout(setLoop, 500);
}

/* --------- */

// render Background Next
function renderBackgroundNext() {
  counter++;
  setBackground();

  RIGHT.disabled = true;

  setTimeout(function () {
    RIGHT.disabled = false;
  }, 1000);
}

/* --------- */

// Add Animation
function addAnimation() {
  REFRESH.classList.add('request');
}

// Remove Animation
function removeAnimation() {
  REFRESH.classList.remove('request');
}

// Get Phrase
function getPhrase() {
  const urlApi = 'https://api.chucknorris.io/jokes/random';

  const requestApi = fetch(urlApi)
    .then((res) => res.json())
    .then((data) => data)
    .catch(() => {
      throw new Error('Something went wrong!');
    })
    .finally(() => {
      removeAnimation();
    });

  return requestApi;
}

// Render Phrase
async function renderPhrase() {
  const currentPhrase = await getPhrase();

  PHRASE.textContent = `${currentPhrase.value}`;
}

/* --------- */
