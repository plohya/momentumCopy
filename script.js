// DOM Elements
const time = document.querySelector('.time'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus');

  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let months = ["January", "February", "March", "April", "May", "June", 
              "July", "August", "September", "October", "November", "December"];

  const baseM = './assets/images/morning/';
  const baseD = './assets/images/day/';
  const baseE ='./assets/images/evening/';
  const baseN = './assets/images/night/';

  let images = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg','7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg' ];
  let i = 0;  

name.addEventListener('click', focusedName);
focus.addEventListener('click', focusedFocus);

function focusedName() {
  console.log('whohoo');
  name.textContent = localStorage.getItem('');
}

function focusedFocus() {
  console.log('whohoo');
  focus.textContent = localStorage.getItem('');
}

  const blockquote = document.querySelector('blockquote');
  // const bttn = document.querySelector('.bttn');
// Options
// const showAmPm = true;

// Show Time
function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds(),
    day = days[today.getDay()],
    dayDigit = today.getDate(),
    mnth = months[today.getMonth()],
    year = today.getFullYear();
  // Set AM or PM
  // const amPm = hour >= 12 ? 'PM' : 'AM';

  // 12hr Format
  // hour = hour % 24 || 0;

  // Output Time
  time.innerHTML = `${addZero(hour)}<span>:</span>${addZero(min)}<span>:</span>${addZero(
    sec
  )} <br>${day}<span>, </span>${mnth}<span> </span>${dayDigit}<span>, </span>${year}<span></span>`;

  setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// any backgrounds  

const btn = document.querySelector('.btn');
btn.addEventListener('click', getImage);

function getImage() {
  const index = i % images.length;
  let base = [];
  let today = new Date();
  let hour = today.getHours();
 
  if (hour >= 0 && hour < 6)
  {
    base = baseN;
  }
    if (hour >= 6 && hour < 12)
  {
    base = baseM;
  }
    if (hour >= 12 && hour < 18)
  {
    base = baseD;
  }
    if (hour >= 18 && hour < 24)
  {
    base = baseE;
  }
  
  const imageSrc = base + images[index+1];
  viewBgImage(imageSrc);
  i++;
} 

function viewBgImage(data) {
  const body = document.querySelector('body');
  const src = data;
  const img = document.createElement('img');
  img.src = src;
  img.onload = () => {      
    body.style.backgroundImage = `url(${src})`;
    // localStorage.backgroundImage = body.style.backgroundImage;  //Не работает запоминание фона для страницы
  }; 
}

// quote

  async function getQuote() {  
  const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en`;
  const res = await fetch(url);
  const data = await res.json(); 
  blockquote.textContent = data.quoteText;
}
document.addEventListener('DOMContentLoaded', getQuote);
// bttn.addEventListener('click', getQuote);

// Set Background and Greeting
function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();
    
  if (hour >= 6 && hour < 12) {
    // Morning
    document.body.style.backgroundImage =
      "url('./assets/images/morning/' + `${picCount}` +.jpg')";
    greeting.textContent = 'Good Morning, ';
  } else if (hour >= 12 && hour < 18) {
    // Afternoon
    document.body.style.backgroundImage =
      "url('./assets/images/day/1.jpg')";
    greeting.textContent = 'Good Afternoon, ';
  } else if (hour >= 18 && hour < 24) {
    // Evening
    document.body.style.backgroundImage =
      "url('./assets/images/evening/1.jpg')";
    greeting.textContent = 'Good Evening, ';
    document.body.style.color = 'white';
  }
    else  {
    // Night
    document.body.style.backgroundImage =
      "url('./assets/images/night/1.jpg')";
    greeting.textContent = 'Good Night, ';
    document.body.style.color = 'white';
  }
}

function getPictures(){
  let picNum = [], picCount;
  for(let i = 0; i<12; i++){
  picNum.push(Math.floor(Math.random()*picCount)+1)};
  return picNum;
  } 

// Get Name
function getName() {
  if (localStorage.getItem('name') === null || localStorage.getItem('name') === '') {
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

// Set Name
function setName(e) {
  // var name = document.querySelector('.name');
  // if(name.focused == true) {
    // console.log(e.target);
  // }

  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('name', e.target.innerText);
      name.blur();
      clearCheck();
    }
  } else {
    localStorage.setItem('name', e.target.innerText);
  }

  
}

function clearCheck() {
  if (name.textContent === null || name.textContent === '') {
    name.textContent = '[Enter Name]';
  } else if (focus.textContent === null || focus.textContent === '') {
    focus.textContent = '[Enter Focus]';
  }
}

// Get Focus
function getFocus() {
  if (localStorage.getItem('focus') === null || localStorage.getItem('focus') == '') {
    focus.textContent = '[Enter Focus]';
  } 
   else {
    focus.textContent = localStorage.getItem('focus');
  }
}

// Set Focus
function setFocus(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();
      clearCheck();
    }
  } else {
    localStorage.setItem('focus', e.target.innerText);
  }
}

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

// Run
showTime();
setBgGreet();
getName();
getFocus();
getPictures();