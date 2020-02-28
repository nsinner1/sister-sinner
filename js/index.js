'use strict';

var userForm = document.getElementById('userForm');
userForm.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  var name = event.target.enteredUsername.value;

  //saving username to local storage
  localStorage.setItem('localUserName', JSON.stringify(name));

  // retrieving from local storage
  // var test = JSON.parse(localStorage.getItem('localUserName'));
  // console.log(test);

  // link to gamepage
  document.location = 'game.html';
}
