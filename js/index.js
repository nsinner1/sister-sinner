'use strict'

//add functionality to store name in local storage//
// var userName = '';
var userForm = document.getElementById('userForm');

userForm.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
    e.preventDefault();
    var name = e.target.username.value;
    // userName = userName.concat(name);
    // console.log(userName);

    localStorage.setItem('localUserName', name);
}
