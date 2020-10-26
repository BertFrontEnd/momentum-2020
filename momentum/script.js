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
const LEFT = document.querySelector('.left');
const RIGHT = document.querySelector('.right');

// Handlers
document.addEventListener('DOMContentLoaded', () => {
  setInterval(() => {
    renderTime();
  }, 1);
  renderLocation();
  renderDay();
  renderDate();
  renderForecast();
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

NAME.addEventListener('keypress', setValue);
NAME.addEventListener('blur', setValue);
NAME.addEventListener('click', resetName);

FOCUS.addEventListener('keypress', setValue);
FOCUS.addEventListener('blur', setValue);
FOCUS.addEventListener('click', resetFocus);

REFRESH.addEventListener('click', renderPhrase);
REFRESH.addEventListener('click', addAnimation);

RIGHT.addEventListener('click', renderBackgroundNext);
LEFT.addEventListener('click', renderBackgroundPrevious);

/* Functions */

/* --------- */

// Get Location
function getLocation() {
  const urlApi = 'https://ipinfo.io?token=5f652187a3f894';

  const requestApi = fetch(urlApi)
    .then((res) => res.json())
    .then((data) => data)
    .catch(() => {
      throw new Error('Something went wrong!');
    });

  return requestApi;
}

// Render Location
async function renderLocation() {
  const objLocation = await getLocation();
  LOCATION.innerHTML = `<span class="location">${objLocation.city}, ${objLocation.country}</span>`;
}

/* --------- */

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
  const urlApi = 'https://api.openweathermap.org/data/2.5/forecast?q=Minsk,by&APPID=1b6b5070efbf756fbf0bba5241bcc2db';

  const requestApi = fetch(urlApi)
    .then((res) => res.json())
    .then((data) => data)
    .catch(() => {
      throw new Error('Something went wrong!');
    });

  return requestApi;
}

// Render Forecast
async function renderForecast() {
  const currentForecast = await getForecast();

  WEATHER.innerHTML = `
    <div class="temperature"><span>${Math.round(currentForecast.list[0].main.temp - 273.15)}°</span>
    <img class="icon" src="./assets/img/weather/${currentForecast.list[0].weather[0].icon}.svg" alt="" width="30" /></div>
    <div class="feels">Feels: ${Math.round(currentForecast.list[0].main.feels_like - 273.15)}°</div>
    <div class="wind">Wind: ${currentForecast.list[0].wind.speed} m/s</div>
    <div class="humidity">Humidity: ${currentForecast.list[0].main.humidity}%</div>
  `;
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

// Get Background
let currentImage = 0;
console.log('currentImage Global: ', currentImage);
const imageArray = getRandomArray();
console.log('Main Array: ', imageArray);

function getBackground() {
  const index = currentImage % imageArray.length;
  const imageSrc = imageArray[index] < 10 ? `0${imageArray[index]}` : imageArray[index];
  const currentHour = getTime().hour;
  let backgroundImage = '';

  switch (true) {
    case currentHour >= 6 && currentHour < 12:
      backgroundImage = `url(./assets/img/background/morning/${imageSrc}.jpg)`;
      break;
    case currentHour >= 12 && currentHour < 18:
      backgroundImage = `url(./assets/img/background/day/${imageSrc}.jpg)`;
      break;
    case currentHour >= 18 && currentHour < 24:
      backgroundImage = `url(./assets/img/background/evening/${imageSrc}.jpg)`;
      break;
    case currentHour >= 0 && currentHour < 6:
      backgroundImage = `url(./assets/img/background/night/${imageSrc}.jpg)`;
      break;
  }
  console.log('Src of image: ', backgroundImage);
  console.log('currentImage Local: ', currentImage);
  currentImage++;
  return backgroundImage;
}

let startScript = (new Date().getHours() + 1) % 24;
/* console.log(startScript); */

if (new Date().getMinutes() == 0) {
  renderBackground();
}

// Set Loop
function setLoop() {
  let date = new Date();
  /* console.log(date); */
  if (date.getMinutes() == 0 && date.getHours() == startScript) {
    startScript = (startScript + 1) % 24;
    console.log(startScript);
    renderBackground();
  }

  setTimeout(setLoop, 500);
}

// Render Background
async function renderBackground() {
  BODY.style.backgroundImage = `${await getBackground()}`;
}

/* --------- */

/* let currentImageForButton = 0; */

// Get Background Next
function getBackgroundNext() {
  let nextImageArray = imageArray;
  const index = currentImage % nextImageArray.length;
  const imageSrc = nextImageArray[index] < 10 ? `0${nextImageArray[index]}` : nextImageArray[index];
  let backgroundImage = `url(./assets/img/background/morning/${imageSrc}.jpg)`;
  console.log('From Next: ', backgroundImage);

  RIGHT.disabled = true;

  setTimeout(function () {
    RIGHT.disabled = false;
  }, 1000);

  currentImage++;

  console.log('From Next: ', currentImage);
  return backgroundImage;
}

// render Background Next
async function renderBackgroundNext() {
  BODY.style.backgroundImage = `${await getBackgroundNext()}`;
}

// Get Background Previous
function getBackgroundPrevious() {
  /* let previousImageArray = imageArray; */
  let previousImageArray = [...imageArray].reverse();
  const index = currentImage % previousImageArray.length;
  const imageSrc = previousImageArray[index] < 10 ? `0${previousImageArray[index]}` : previousImageArray[index];
  let backgroundImage = `url(./assets/img/background/morning/${imageSrc}.jpg)`;
  console.log('From Prev: ', backgroundImage);

  LEFT.disabled = true;

  setTimeout(function () {
    LEFT.disabled = false;
  }, 1000);

  currentImage--;
  if (currentImage < 0) {
    return (currentImage = 0);
  }

  console.log('From Prev: ', currentImage);
  return backgroundImage;
}

// render Background Previous
async function renderBackgroundPrevious() {
  BODY.style.backgroundImage = `${await getBackgroundPrevious()}`;
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
