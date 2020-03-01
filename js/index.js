'use strict';

var currentPlayer = [];

var userForm = document.getElementById('userForm');
userForm.addEventListener('submit', handleSubmit);
userForm.addEventListener('keypress', handleSubmit => handleSubmit.key === 'Enter');

function handleSubmit(event) {
  event.preventDefault();
  if ( JSON.parse(localStorage.getItem('currentPlayer')) ) 
  
  
  
  new NewPlayer(event.target.enteredUsername.value);
  localStorage.setItem('currentPlayer', JSON.stringify(currentPlayer));
  // document.location = 'game.html';
}

function NewPlayer(username) {
  this.username = username;
  this.currentPosition = 'devilsnare';
  this.deathCount = 0;
  currentPlayer.push(this);
}


// add a 'continue' and 'new game' button on homepage