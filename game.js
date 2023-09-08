const buttonColors = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

$(document).keypress(function () {
  if (!started) {
    nextSequence();
    started = true;
  }
});

$('.btn').click(function () {
  let userChosenColor = $(this).attr('id');
  // console.log(userChosenColor);
  userClickedPattern.push(userChosenColor);
  // console.log(userClickedPattern);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound('wrong');
    $('body').addClass('game-over');
    setTimeout(function () {
      $('body').removeClass('game-over');
    }, 200);
    $('#level-title').text('Game Over, Press Any Key to Restart');
    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  //! random number
  let randomNumber = Math.round(Math.random() * 3);
  let randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);
  //! fade effect
  $(`#${randomChosenColor}`).fadeIn(100).fadeOut(100).fadeIn(100);

  //! Audio
  playSound(randomChosenColor);
  //!level increase
  level++;
  $('h1').text(`Level ${level}`);
}

//! audio function
function playSound(name) {
  let audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
}
//! .pressed css
function animatePress(currentColor) {
  $(`#${currentColor}`).addClass('pressed');
  setTimeout(function () {
    $(`#${currentColor}`).removeClass('pressed');
  }, 100);
}
//! restart
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
