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

var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";  
  }
  x[slideIndex-1].style.display = "block";  
}