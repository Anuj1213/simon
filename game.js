var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;
var level = 0;

// Detect keypress
$(document).keypress(function(){
 if(!started){
    nextSequence();
    $("#level-title").text("level " + level);
    started = true;
  }
});

// Detect start button to start
$(".start-button").click(function(){
  if(!started){
     nextSequence();
     $("#level-title").text("level " + level);
     started = true;

     setTimeout(function(){
       $("#start-btn").hide();
     });
  }
});

// Detect Button press

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  // user click button and play sounds
  playSound(userChosenColour);

  checkAnswere(userClickedPattern.length - 1);

  // animation
  animatePress(userChosenColour);
});


function nextSequence(){

  // Increasing level
  userClickedPattern = [];
  level++;
  $("#level-title").text("level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColours = buttonColours[randomNumber];

  gamePattern.push(randomChosenColours);

  // Selecting button withe same id
  $("#" + randomChosenColours).fadeOut(100).fadeIn(100);
  playSound(randomChosenColours);

}

function checkAnswere(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){

    // calling nextSequence
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");

    // Game over
    $("#level-title").text("Game over press here to restart");

    setTimeout(function(){
      $("#start-btn").text("Restart");
      $("#start-btn").show();
    })

    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);


    startOver();
  }
}

//  Play sounds when usere press button
function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Animations
function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");

  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

// Restart Game
function startOver(){
  started = false;
  level = 0;
  gamePattern = [];

}
