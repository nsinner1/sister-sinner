'use strict';

var userForm = document.getElementById('userForm');
userForm.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  var name = event.target.enteredUsername.value;
  localStorage.setItem('localUserName', name);
  document.location = 'game.html';
}
