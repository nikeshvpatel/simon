
// alert("How to play a game?\n 1.	Press any button or click on screen to start a level.\n 2.	Notice which button is flashed, and press that button 1 time. \n 3.	Subsequently, another random button will flash. So repeat sequence from level 1. \n Example. \nFlash: red, \n Click: red \n Flash: green \n Click: red, green \n Flash: red \n Click: red, green, red \n Flash: Yellow \n Click: red, green, red, yellow. \n And so On….")



var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var NewGame = false;
var level = 0;

$(document).keypress(function() {
  if (!NewGame) {
    $("#level-title").text("Level " + level);
    nextSequence();
    NewGame = true;
  }
});
$(document).click(function() {
  if (!NewGame) {
    $("#level-title").text("Level " + level);
    nextSequence();
    NewGame = true;
  }
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over \n Press Any Key to Restart");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      // startOver();
    }
}


function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  NewGame = false;
}
