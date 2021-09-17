//initiate the game
var state = false; //set playing state to false
const TOTAL_LIVES = 3; //set total lives to 3
const INIT_SCORE = 0; //set initial score to 0
var fall;
$(".score").text(`${INIT_SCORE}`); //display "score: 0"

//click on start game button
$("#playButton").click(function(){
    if(state) //playing
    {
        location.reload(); //reload the page
    }
    else //not playing
    {
        state = true;
        lives = TOTAL_LIVES; //set total lives to total lives
        score = INIT_SCORE; //set initial score to initial score
        $("#message").hide(); //hide game-over message
        $("#live").show(); //display live box
        $(".score").text(`${score}`); //display score

        //display lives inside live box
        for(var i = 1; i <= 3; i++)
        {
            $(`#live${i}`).show();
        }

        $("#playButton").text("Reset Game"); //change button text to "Reset Game"
        generateFruit(); //generate a random fruit
    }
});

//generate a random fruit
function generateFruit()
{
    $("#fruitGenerator").html("<div id='fruits'></div>"); //create a new fruit div inside the fruitGenerator div
    var fruit = Math.round(Math.random() * 5); //randomize a fruit
    var topPos = 10; //initialize the vertical position
    var leftPos = Math.round(Math.random() * 60) + 10; //randomize horizontal position
    var speed = Math.round(Math.random() * 14) + 1; //randomize speed

    //move fruit down by 1px every random "speed" second
    fall = setInterval(function(){
        //display the fruit after moving it down
        $("#fruits").css({
            background: `url(/styling/Images/Fruits/${fruit}.png) center no-repeat`,
            top: `${topPos}px`,
            left: `${leftPos}%`,
        });

        //check if fruit is too low
        if(topPos > $("#hideFruits2").position().top)
        {
            //yes -> remove it and clear its interval
            $("#fruits").remove();
            clearInterval(fall);

            //check if fruit is a bomb
            if(fruit != 5)
            {
                //no -> decrease one live
                $(`#live${lives}`).hide();
                lives--;

                //check if have any lives left
                if(lives == 0)
                {
                    //no -> game over
                    endGame();
                }
                else
                {
                    //yes -> generate a new fruit
                    generateFruit();
                }
            }
            else
            {
                //yes -> generate a new fruit
                generateFruit();
            }
        }
        else
        {
            //no -> make the fruit slice-able
            $("#fruits").mouseover(function(){
                //check if slice a bomb

                if(fruit == 5)
                {
                    //yes -> game over

                    //play the bomb explosion sound effect
                    $("#explosion")[0].play();

                    endGame();
                }
                else
                {
                    //play slice sound effect
                    $("#slice")[0].play();

                    //no -> explode the fruit and generate a new one
                    $(this).hide("explode", function(){
                        $(this).remove();
                        clearInterval(fall);
                        generateFruit();

                        //update score
                        score++;
                        $(".score").text(`${score}`);
                    });
                }
            });
        }

        //move fruit down 1px
        topPos++;
    }, speed);
}

//game over
function endGame()
{
    clearInterval(fall); //clear the fall interval
    $("#live").hide(); //hide the live box
    $(".score").html(` ${score}`); //update the score
    $("#message").show(); //display the game-over message

    //play the game-over sound effect after 700 miliseconds
    setTimeout(function(){
        $("#gameOver")[0].play();
    }, 700);
}

/*
Note:
Can use the screen as the fruit generator and set the overflow property to hidden.
Use <img> with different 'src' to generate different fruits instead of creating a new `<div id="fruits"></div>' each time
Can use stopAction() and startAction()
*/