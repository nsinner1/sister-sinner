'use strict';

var savedPlayers = [];

var userForm = document.getElementById('userForm');
userForm.addEventListener('submit', handleSubmit);
userForm.addEventListener('keypress', handleSubmit => handleSubmit.key === 'Enter');

function handleSubmit(event) {
  event.preventDefault();
  if (getFromLocalStorage(`player${event.target.enteredUsername.value}`)) {
    saveToLocalStorage(event.target.enteredUsername.value, 'currentPlayer'); // save current player in local storage to be referenced while using site
    document.location = 'game.html'; // loads game page
  } else {
    new NewPlayer(event.target.enteredUsername.value); // create NewPlayer object which goes in savedPlayers array
    saveToLocalStorage(savedPlayers, `player${event.target.enteredUsername.value}`); // save NewPlayer object to local storage with key 'player'+username
    saveToLocalStorage(event.target.enteredUsername.value, 'currentPlayer'); // save current player in local storage to be referenced while using site
    document.location = 'game.html'; // loads game page
  }
}

function NewPlayer(username) {
  this.username = username;
  this.currentPosition = 'devilsnare';
  this.deathCount = 0;
  savedPlayers.push(this);
}


// saves an array to local storage and names it
function saveToLocalStorage(arr, keyname) {
  // stringify data
  var stringedData = JSON.stringify(arr);
  // saves to local storage
  localStorage.setItem(keyname, stringedData);
}

// returns parsed data saved in local storage
function getFromLocalStorage(keyname) {
  var stringedData = localStorage.getItem(keyname);
  var parsedData = JSON.parse(stringedData);
  return parsedData;
}
