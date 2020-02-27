'use strict';



var questionList = [];

function NewQuestion(questionId, questionText, imgSrc, answerOneText = null, answerOnePath = null, answerTwoText = null, answerTwoPath = null, ) {
  this.questionId = questionId;
  this.questionText = questionText;
  this.imgSrc = imgSrc;
  this.answerOneText = answerOneText;
  this.answerOnePath = answerOnePath;
  this.answerTwoText = answerTwoText;
  this.answerTwoPath = answerTwoPath;
  questionList.push(this);
}


// add features: button to restart, back track, or nav to home about etc

// new questions go here. includes death state and success state. could include a death text feature for unique death states for each question
new NewQuestion('death', 'You have died. Your ghost haunts the Forbidden Forest warning wary travelers of the dangers that reside therein.', 'yamcha.jpg', 'Play again?', 'devilsnare');
new NewQuestion('success', 'Congratulations! You have escaped the Forbidden Forest with your life.', 'goku.jpg', 'Play again?', 'devilsnare');
new NewQuestion('devilsnare', 'You walk through the dark and damp Forbidden Forest when vines start to wrap around your ankles causing you to stumble. As you fall, the snake-like tendrils wrap even tighter and move up your legs. Do you:', null, 'Struggle and pull your legs free.', 'death', 'Point your wand at the vines and yell, "Incendio!!"', 'fluffy');
new NewQuestion('fluffy', 'Continuing along the path, you come across a giant three-headed dog guarding a forked intersection. It gets up lazily as three massive heads turn to glare at you with drool leaking out of three sets of teeth. Do you:', null, 'Pull out the flute tucked in your robe and play an improvised song.', 'potions', 'Run! Are you kidding me!? You don\'t want to become dinner!', 'death');
new NewQuestion('potions', 'Ahead of you are seven bottles of different sizes and colors in row on a large tree stump. A sign next to the stump reads, "Drink one to continue on your journey. Warning: May be hazardous to health. Choose wisely." Do you:', null, 'Drink the smallest bottle in the middle.', 'the ghost', 'Drink the round red bottle on the left.', 'death');
new NewQuestion('the ghost', 'An insubstantial ghost of a woodsman with a grisly chest injury sends chills down your spine. As you shudder and hurry by, he wheezes out behind you "You.. look lost... to get out of here head north... and remember, *cough hack* .. remember that moss always grows on the north side of a tree. More access to sunlight in these here woods." Continuing on, the path stops at the trunk of a large tree, with trails leading left and right. Sure enough, there is moss growing on the left side of its trunk. Do you:', null, 'Take the trail on the left.', 'the lantern', 'Take the trail on the right.', 'death');
new NewQuestion('the lantern', 'The earth under your feet is getting squishy and you splash through some shallow muddy puddles. The smell of dank water lingers on the air. 20 yards ahead of you is a small wooden foot bridge. On the other side of the bride, the glow of a lantern hangs in the mist. A voice from that direction says, "Beware of sinkholes in the marsh." Do you:', null, 'Cross the bridge.', 'death', 'Walk around the bridge.', 'sick');
new NewQuestion('sick', 'After some time passes you aren\'t feeling so good. A worrying feeling at the pit of your stomach tells you that you may be poisoned. Do you:', null, 'Drink a potion brewed of fluxweed, knotgrass, and powdered Bicorn horn.', 'death', 'Swallow a bezoar.', 'hippogriff');
new NewQuestion('hippogriff', 'You feel a gust of strong wind behind your back and it is a hippogriff. Do you bow or run?', null, 'You bow.', 'spiders', 'You run.', 'death');
new NewQuestion('spiders', 'You are surrounded by spiders. Do you step on them or hold them?', null, 'Hold them.', 'death', 'Step on them.', 'centaur');
new NewQuestion('centaur', 'A centaur is walking towards you. Do you:', null, 'Walk towards the centaur and greet it.', 'fork', 'Turn your back and run.', 'death');
new NewQuestion('fork', 'After greeting the centaur, you continue on your path. You come to a fork in the road.', null, 'Left path.', 'death', 'Right path.', 'house');
new NewQuestion('house', 'You walk along the path and the sorting hat appears, "Which house would like me to sort you into?"', null, 'Hufflepuff and Ravenclaw', 'success', 'Gryffindor and Slytherin', 'success');


// general purpose function to write anything to the DOM and give it an id
function renderToDom(parentEl, childEl, textToWrite, domId) {
  var parentLocation = document.getElementById(parentEl);
  var newEl = document.createElement(childEl);
  newEl.setAttribute('id', domId);
  newEl.textContent = (textToWrite);
  parentLocation.appendChild(newEl);
}

// this is written so that questions can be referenced by id, and adding questions or switching the order of questions in questionList array doesn't break anything
function findQuestionIndex(id) {
  for (var i = 0; i < questionList.length; i++) {
    if (questionList[i].questionId === id) {
      return i;
    }
  }
  console.log('findQLIdIndex() was given a bad Question ID.');
}

// generates a question based on id string. could add functionality to display answers randomly
function loadQuestion(id) {
  localStorage.setItem('currentPosition', id);

  var questionObject = questionList[findQuestionIndex(id)];
  // this could be written in a for loop (probably with an array)
  renderToDom('questionSectionElement', 'p', questionObject.questionId, 'domQuestionId');
  renderToDom('questionSectionElement', 'p', questionObject.questionText, 'domQuestionText');
  renderToDom('questionSectionElement', 'p', questionObject.answerOneText, 'domAnswerOneText');
  renderToDom('questionSectionElement', 'p', questionObject.answerTwoText, 'domAnswerTwoText');
  document.getElementById('domAnswerOneText').path = questionObject.answerOnePath; // assigns next path (represented by .answerOnePath string) to dom answer element to be called in pathHandler()
  document.getElementById('domAnswerOneText').addEventListener('click', pathHandler); // adds event listener to answer element, to create a button
  document.getElementById('domAnswerTwoText').path = questionObject.answerTwoPath; // assigns next path (represented by .answerTwoPath string) to dom answer element to be called in pathHandler()
  document.getElementById('domAnswerTwoText').addEventListener('click', pathHandler); // adds event listener to answer element, to create a button
  document.getElementById('questionImage').src = questionObject.imgSrc; // dynamically generate image by assigning .imgSrc to img element's .src in dom
}

// basically the function for clicking on answers. 
function pathHandler(event) {
  // first clears the screen by element.remove() on the displayed html elements
  // this can be shorted with a loop
  document.getElementById('domQuestionId').remove();
  document.getElementById('domQuestionText').remove();
  document.getElementById('domAnswerOneText').remove();
  document.getElementById('domAnswerTwoText').remove();
  // runs loadQuestion() with the answers path assigned as .path 
  // again, this won't work unless .path is assigned in loadQuestion()
  loadQuestion(event.target.path); 
}

// starts game by loading first question
if (localStorage.getItem('currentPosition') === 'undefined') {
  loadQuestion('devilsnare');
} else {
  loadQuestion(localStorage.getItem('currentPosition'));
}
