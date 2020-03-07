'use strict';

var savedPlayer = [];
var savedAvatar = [];

var userForm = document.getElementById('userForm');
userForm.addEventListener('submit', handleSubmit);
userForm.addEventListener('keypress', handleSubmit => handleSubmit.key === 'Enter');

var harryP = document.getElementById('harry');
var hermoineG = document.getElementById('hermoine');
var ronW = document.getElementById('ron');
harryP.addEventListener('click', handleClick);
hermoineG.addEventListener('click', handleClick1);
ronW.addEventListener('click', handleClick2);


// When a player enters a username: if new name it saves player to local storage, sets them as current player, and starts new game.
// If name is already in local storage, then loads player data, sets them as current user, and continues game.
function handleSubmit(event) {
  event.preventDefault();
  // continue game
  if (getFromLocalStorage(`player${event.target.enteredUsername.value}`)) {
    saveToLocalStorage(event.target.enteredUsername.value, 'currentPlayer'); // set current player
    // document.location = 'game.html'; loads game page
    // new game
  } else {
    new NewPlayer(event.target.enteredUsername.value, savedAvatar[0]); // create NewPlayer object which goes in savedPlayer array. The values passed in are username and avatar
    saveToLocalStorage(savedPlayer, `player${event.target.enteredUsername.value}`); // save NewPlayer object to local storage with key = 'player'+username
    saveToLocalStorage(event.target.enteredUsername.value, 'currentPlayer'); // set current player
    // document.location = 'game.html'; loads game page
  }
}

// Constructor for NewPlayer objects. same as in app.js
function NewPlayer(username, playerAvatar = undefined, currentPosition = 'devilsnare', deathCount = 0) {
  this.username = username;
  this.playerAvatar = playerAvatar;
  this.currentPosition = currentPosition;
  this.deathCount = deathCount;
  savedPlayer.push(this);
}

// Saves an array to local storage and names it
function saveToLocalStorage(arr, keyname) {
  var stringedData = JSON.stringify(arr); // stringify data
  localStorage.setItem(keyname, stringedData); // saves to local storage
}

// Returns parsed data saved in local storage
function getFromLocalStorage(keyname) {
  var stringedData = localStorage.getItem(keyname);
  var parsedData = JSON.parse(stringedData);
  return parsedData;
}

var harryArray = [];

function SaveImages(src) {
  this.src = src;
  harryArray.push(this);
}

new SaveImages('images/harryavatar.png');
new SaveImages('images/hermoineavatar.png');
new SaveImages('images/ronavatar.png');

function handleClick(e) {
  e.preventDefault();
  var clickedPic = e.target.src;
  var harry1 = harryArray[0].src;

  if(clickedPic){
    savedAvatar = [];
    savedAvatar.push(harry1);
  }
}

function handleClick1(e) {
  e.preventDefault();
  var clickedPic = e.target.src;
  var hermoine1 = harryArray[1].src;
  if(clickedPic) {
    savedAvatar = [];
    savedAvatar.push(hermoine1);
  }
}

function handleClick2(e) {
  e.preventDefault();
  var clickedPic = e.target.src;
  var ron1 = harryArray[2].src;
  if(clickedPic){
    savedAvatar = [];
    savedAvatar.push(ron1);
  }
}

var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName('mySlides');
  if (n > x.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = x.length;
  }
  for (i = 0; i < x.length; i++) {
    x[i].style.display = 'none';
  }
  x[slideIndex-1].style.display = 'block';
}
