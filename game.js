var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameHasStarted = false;
var level = 0;

function nextSequence(){
    userClickedPattern = [];

    level++;
    $('#level-title').text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playAudio(randomChosenColour);

}

function animatePress(currentColour) {
    $("#" + currentColour).addClass('pressed');
    setTimeout(function(){
        $("#" + currentColour).removeClass('pressed') }, 100);
}

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    var lastIndex = userClickedPattern.length-1;
    userClickedPattern.push(userChosenColour);

    playAudio(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(lastIndex);
});

$(document).keydown(function(e){
    e.preventDefault();
    if(!gameHasStarted){
        $('#level-title').text("Level " + level);
        nextSequence();
        gameHasStarted = true;
    }
});


function playAudio(color){
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    } 
    else {
        console.log("wrong");
        playAudio("wrong");
        $("body").addClass('game-over');
        setTimeout(function(){
            $("body").removeClass('game-over');
        }, 200);
        $('#level-title').text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = []
    gameHasStarted = false;
}

function arrayEquals(a, b){
    return Array.isArray(a) && Array.isArray(b)
    && a.length === b.length && a.every((val, index) => val === b[index]);
}



