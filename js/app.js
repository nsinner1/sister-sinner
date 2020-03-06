'use strict';

var questionList = [];

function NewQuestion(questionId, questionText, imgSrc, answerOneText = null, answerOnePath = null, answerTwoText = null, answerTwoPath = null) {
  this.questionId = questionId;
  this.questionText = questionText;
  this.imgSrc = imgSrc;
  this.answerOneText = answerOneText;
  this.answerOnePath = answerOnePath;
  this.answerTwoText = answerTwoText;
  this.answerTwoPath = answerTwoPath;
  questionList.push(this);
}

// New questions go here. includes death state and success state
new NewQuestion('death', 'You have died. Your ghost haunts the Forbidden Forest warning wary travelers of the dangers that reside therein.', 'images/particle.gif', 'Play again?', 'devilsnare');
new NewQuestion('success', 'Congratulations! You have escaped the Forbidden Forest with your life.', '../images/congrats.gif', 'Play again?', 'devilsnare');
new NewQuestion('devilsnare', 'You walk through the dark and damp Forbidden Forest when vines start to wrap around your ankles causing you to stumble. As you fall, the snake-like tendrils wrap even tighter and move up your legs. Do you:', '../images/devils_snare1.jpg', 'Struggle and pull your legs free.', 'death', 'Point your wand at the vines and yell, "Incendio!!"', 'fluffy');
new NewQuestion('fluffy', 'Continuing along the path, you come across a giant three-headed dog guarding a forked intersection. It gets up lazily as three massive heads turn to glare at you with drool leaking out of three sets of teeth. Do you:', '../images/Fluffy1.png', 'Pull out the flute tucked in your robe and play an improvised song.', 'potions', 'Run! Are you kidding me!? You don\'t want to become dinner!', 'death');
new NewQuestion('potions', 'Ahead of you are seven bottles of different sizes and colors in row on a large tree stump. A sign next to the stump reads, "Drink one to continue on your journey. Warning: May be hazardous to health. Choose wisely." Do you:', '../images/potions1.jpg', 'Drink the smallest bottle in the middle.', 'the ghost', 'Drink the round red bottle on the left.', 'death');
new NewQuestion('the ghost', 'An insubstantial ghost of a woodsman with a grisly chest injury sends chills down your spine. As you shudder and hurry by, he wheezes out behind you "You.. look lost... to get out of here head north... and remember, *cough hack* .. remember that moss always grows on the north side of a tree. More access to sunlight in these here woods." Continuing on, the path stops at the trunk of a large tree, with trails leading left and right. Sure enough, there is moss growing on the left side of its trunk. Do you:', '../images/myrtle1.jpg', 'Take the trail on the left.', 'the lantern', 'Take the trail on the right.', 'death');
new NewQuestion('the lantern', 'The earth under your feet is getting squishy and you splash through some shallow muddy puddles. The smell of dank water lingers on the air. 20 yards ahead of you is a small wooden foot bridge. On the other side of the bride, the glow of a lantern hangs in the mist. A voice from that direction says, "Beware of sinkholes in the marsh." Do you:', '../images/dark_forest1.jpg', 'Cross the bridge.', 'death', 'Walk around the bridge.', 'sick');
new NewQuestion('sick', 'After some time passes you aren\'t feeling so good. A worrying feeling at the pit of your stomach tells you that you may be poisoned. Do you:', '../images/Mandrake1.png', 'Drink a potion brewed of fluxweed, knotgrass, and powdered Bicorn horn.', 'death', 'Swallow a bezoar.', 'hippogriff');
new NewQuestion('hippogriff', 'You feel a gust of strong wind behind your back and it is a hippogriff. Do you bow or run?', '../images/hippogriff1.jpg', 'You bow.', 'spiders', 'You run.', 'death');
new NewQuestion('spiders', 'You are surrounded by spiders. Do you step on them or hold them?', '../images/spiders1.jpg', 'Hold them.', 'death', 'Step on them.', 'centaur');
new NewQuestion('centaur', 'A centaur is walking towards you. Do you:', '../images/Centaur1.jpg', 'Walk towards the centaur and greet it.', 'fork', 'Turn your back and run.', 'death');
new NewQuestion('fork', 'After greeting the centaur, you continue on your path. You come to a fork in the road.', '../images/fork1.png', 'Left path.', 'death', 'Right path.', 'house');
new NewQuestion('house', 'You walk along the path and the sorting hat appears, "Which house would like me to sort you into?"', '../images/house1.jpg', 'Hufflepuff and Ravenclaw', 'success', 'Gryffindor and Slytherin', 'success');

// General purpose function to write anything to the DOM and give it an id
function renderToDom(parentEl, childEl, textToWrite, domId) {
  var parentLocation = document.getElementById(parentEl);
  var newEl = document.createElement(childEl);
  newEl.setAttribute('id', domId);
  newEl.textContent = (textToWrite);
  parentLocation.appendChild(newEl);
}

// This is written so that questions can be referenced by id, and adding questions or switching the order of questions in questionList array doesn't break anything
function findQuestionIndex(id) {
  for (var i = 0; i < questionList.length; i++) {
    if (questionList[i].questionId === id) {
      return i;
    }
  }
}

// Generates a question based on id string and manipulates local storage.
function loadQuestion(id) {
  savedPlayer[0].currentPosition = id; // updates savedPlayer array
  saveToLocalStorage(savedPlayer, `player${savedPlayer[0].username}`); // save current question (from savedPlayer array) to local storage. tied to currentPlayer
  var questionObject = questionList[findQuestionIndex(id)]; // current question object assigned to variable qustionObject
  // logic to count deaths
  if (questionObject.questionId === 'death') {
    savedPlayer[0].deathCount++; // updates savedPlayer array
    saveToLocalStorage(savedPlayer, `player${savedPlayer[0].username}`); // saves savedPlayer array to local storage with updated death count
  }
  renderToDom('questionSectionElement', 'p', questionObject.questionId, 'domQuestionId');
  var parentEl = document.getElementById('domQuestionId');
  var imgEl = document.createElement('img');
  imgEl.src = questionObject.imgSrc;
  imgEl.alt = '';
  imgEl.setAttribute('id', 'questionImage');
  parentEl.appendChild(imgEl);
  renderToDom('questionSectionElement', 'p', questionObject.questionText, 'domQuestionText');
  renderToDom('questionSectionElement', 'p', questionObject.answerOneText, 'domAnswerOneText');
  renderToDom('questionSectionElement', 'p', questionObject.answerTwoText, 'domAnswerTwoText');
  document.getElementById('domAnswerOneText').path = questionObject.answerOnePath; // assigns next path (represented by .answerOnePath string) to dom answer element to be called in pathHandler()
  document.getElementById('domAnswerOneText').addEventListener('click', pathHandler); // adds event listener to answer element, to create a button
  document.getElementById('domAnswerTwoText').path = questionObject.answerTwoPath; // assigns next path (represented by .answerTwoPath string) to dom answer element to be called in pathHandler()
  document.getElementById('domAnswerTwoText').addEventListener('click', pathHandler); // adds event listener to answer element, to create a button
  // logic for success state
  if (questionObject.questionId === 'success') {
    var getTable = document.getElementById('myTable');
    var th = document.createElement('thead');
    th.setAttribute('id', 'highScore');
    th.textContent = `Congratulations ${savedPlayer[0].username}, you have successfully found your way out of the Forbidden Forest. Your score is ${savedPlayer[0].deathCount} deaths!`;
    getTable.appendChild(th);
    savedPlayer[0].deathCount = 0; // updates savedPlayer array, resets death count to 0
    saveToLocalStorage(savedPlayer, `player${savedPlayer[0].username}`); // saves savedPlayer array to local storage with updated death count
  }
}

// Basically the function for clicking on answers.
function pathHandler(event) {
  // first clears the screen by element.remove() on the displayed html elements
  document.getElementById('domQuestionId').remove();
  document.getElementById('domQuestionText').remove();
  document.getElementById('domAnswerOneText').remove();
  document.getElementById('domAnswerTwoText').remove();
  if (document.getElementById('questionImage') !== null){
    document.getElementById('questionImage').remove();
  }
  if (document.getElementById('highScore') !== null){
    document.getElementById('highScore').remove();
  }
  // runs loadQuestion() with the answers path assigned as .path
  loadQuestion(event.target.path);
}

// *****LOCAL STORAGE CODE*****

var harryArray = [];

function SaveImages(src){
  this.src = src;
  harryArray.push(this);
}

new SaveImages('../images/harryavatar.png');
new SaveImages('../images/hermoineavatar.png');
new SaveImages('../images/ronavatar.png');

var pic1 = document.getElementById('image');

var savedPlayer = []; // same as in index.js

// Logic to load proper question on game.html loading, based on currentPlayer in local storage
if (localStorage.getItem('currentPlayer') !== null) {
  var loadedLocalData = getFromLocalStorage(`player${getFromLocalStorage('currentPlayer')}`);
  new NewPlayer(loadedLocalData[0].username, loadedLocalData[0].playerAvatar, loadedLocalData[0].currentPosition, loadedLocalData[0].deathCount);
  loadQuestion(savedPlayer[0].currentPosition);
  pic1.src = savedPlayer[0].playerAvatar;
} else {
  loadQuestion('death');
}

// Same constructor function from index.js
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

// Reset Button
document.getElementById('playAgain').addEventListener('click', resetGame);

function resetGame(event) {
  event.preventDefault();
  savedPlayer[0].deathCount = 0;
  saveToLocalStorage(savedPlayer, `player${savedPlayer[0].username}`);
  document.getElementById('domQuestionId').remove();
  document.getElementById('domQuestionText').remove();
  document.getElementById('domAnswerOneText').remove();
  document.getElementById('domAnswerTwoText').remove();
  if (document.getElementById('highScore') !== null){
    document.getElementById('highScore').remove();
  }
  loadQuestion('devilsnare');
}
