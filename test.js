 alert("How to play a game?\n 1.	Press any button or click on screen to start a level.\n 2.	Notice which button is flashed, and press that button 1 time. \n 3.	Subsequently, another random button will flash. So repeat sequence from level 1. \n Example. \nFlash: red, \n Click: red \n Flash: green \n Click: red, green \n Flash: red \n Click: red, green, red \n Flash: Yellow \n Click: red, green, red, yellow. \n And so On….")

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).on("click",function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
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
      var levelDefine= level -1;
      $("#level-title").html("<h2 class='redColor'>Game Over</h2><h2 class='fonty'>You have reached @ Level "+levelDefine+"</h2><h2> click to Restart</h2>");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
    }
}


function nextSequence() {
  userClickedPattern = [];
  $("#level-title").text("Level " + level);
  level++;
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
  started = false;
}

$(".restart").on("click",Nikesh)
function Nikesh(){
  startOver();
}
