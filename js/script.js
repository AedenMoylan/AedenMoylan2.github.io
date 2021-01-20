
var canvas = document.getElementById("game");
var context = canvas.getContext("2d");



// Update Heads Up Display with song Information
function musicSelection() {
  var selection = document.getElementById("songs").value;

  var active = document.getElementById("active");
  if (active.checked == true) 
  {
    document.getElementById("HUD").innerHTML = selection + " active ";
    console.log("song Active");

	// plays 3 songs based on the selection
	if ( selection === "Pursuit.mp3")
	{
	pursuitAudio.play();
	}

	if ( selection === "battleff7.mp3")
	{
	ff7Audio.play();
	}

	if ( selection === "battleXeno2.mp3")
	{
	xeno2Audio.play();
	}

  } 
  else
  {
    document.getElementById("HUD").innerHTML = selection + " selected ";
    console.log("song Selected");

	// pauses the song and restarts them
	pursuitAudio.pause();
	pursuitAudio.currentTime = 0;

	ff7Audio.pause();
	ff7Audio.currentTime = 0;

	xeno2Audio.pause();
	xeno2Audio.currentTime = 0;
  }
}


// Draw a HealthBar on Canvas, can be used to indicate players health
function drawHealthbar() {
  var width = 100;
  var height = 20;
  var max = 3;
  var val = playerHealth;

  // Draw the background
  context.fillStyle = "#000000";
  context.clearRect(0, 0, width, height);
  context.fillRect(0, 0, width, height);

  // Draw the fill
  context.fillStyle = "#00FF00";
  var fillVal = Math.min(Math.max(val / max, 0), 1);
  context.fillRect(0, 0, fillVal * width, height);
}

// Array of music Options
var options = [{
    "text": "Select a song",
    "value": "No song",
    "selected": true
  },
  {
    "text": "Pursuit",
    "value": "Pursuit.mp3"
	
  },
  {
    "text": "ff7 battle",
    "value": "battleff7.mp3"
  },
  {
    "text": "Xeno 2 battle",
    "value": "battleXeno2.mp3"
  }
];

// gets big dragon sprite
var npcsprite = new Image();
npcsprite.src = "./img/bahamut.png"; 
// gets player sprite
var sprite = new Image();
sprite.src = "./img/blackmage2.png"; 
// gets background sprite
var backGroundSprite = new Image();
backGroundSprite.src = "./img/cave.jpg"
// gets gameover sprite
var gameOverSprite = new Image();
gameOverSprite.src = "./img/gameOver.jpg"

// audio which is used in the game
var buttonAudio = new Audio('buttonSound3.mp3');
var ff7Audio = new Audio("battleff7.mp3");
var xeno2Audio = new Audio("battleXeno2.mp3");
var pursuitAudio = new Audio("pursuit.mp3");

var selectBox = document.getElementById('songs');

// add all of the things from the options array to the selectbox
for (var i = 0; i < options.length; i++) {
  var option = options[i];
  selectBox.options.add(new Option(option.text, option.value, option.selected));
}


// gameover when health <= 0
var playerHealth = 4;
// gameobject
function GameObject(name, img, health)
{
    this.name = name;
    this.img = img;
    this.health = health;
    this.x = 0;
    this.y = 0;
}

// gamerInput holds the player input (up, down, left, right)
function GamerInput(input)
{
    this.action = input;
}

// Default Player
var player = new GameObject("player",sprite,100);

// Default GamerInput is set to None. used when theres no input
var gamerInput = new GamerInput("None"); 



// creates array gameobjects. 0 = player, 1 = enemy.
var gameobjects = [player, new GameObject("NPC",npcsprite, 100)];


document.getElementById("buttonUp").onmouseup = function() {buttonUp()};
document.getElementById("buttonDown").onmouseup = function() {buttonUp()};
document.getElementById("buttonLeft").onmouseup = function() {buttonUp()};
document.getElementById("buttonRight").onmouseup = function() {buttonUp()};

// plays a button sound anytime one of these functions is activated
function leftButtonOnClick()
{
gamerInput = new GamerInput("Left");
  buttonAudio.play();

}

function rightButtonOnClick()
{
gamerInput = new GamerInput("Right");
  buttonAudio.play();
}

function upButtonOnClick()
{
gamerInput = new GamerInput("Up");
  buttonAudio.play();
}

function downButtonOnClick()
{
gamerInput = new GamerInput("Down");
  buttonAudio.play();
}

function buttonUp()
{
	gamerInput = new GamerInput("None");
	  
}


// Process keyboard input event
function input(event)
{
   //  used to detect what the player has entered
	// when a key is pressed
   if (event.type == "keydown")
   {
       switch (event.keyCode) 
	   {
	   // numbers 37 to 40 are the number codes for the keys up, down, left, right
           case 37:
               gamerInput = new GamerInput("Left");
                break; //Left key
            case 38:
                gamerInput = new GamerInput("Up");

                break; //Up key
           case 39:
                gamerInput = new GamerInput("Right");
               break; //Right key
            case 40:
                gamerInput = new GamerInput("Down");
                break; //Down key
         //   default:
		// no input
            //    gamerInput = new GamerInput("None"); 
        }
    } 
	else
	{
	// no input
       gamerInput = new GamerInput("None"); 
    }
     console.log("Gamer Input :" + gamerInput.action);

}


function update() {
  // adding key input functionality
  // move player
        if (gamerInput.action == "Up") 
		{
           gameobjects[0].y -=3;

        }
		
		if (gamerInput.action == "Down") 
    	{
			gameobjects[0].y +=3;
        }
		
		if(gamerInput.action == "Left")
		{
			gameobjects[0].x -=3;

		}

		if(gamerInput.action == "Right")
		{
		gameobjects[0].x +=3;
}
		
	// move enemy
		if(gameobjects[0].x > gameobjects[1].x)
		{
			gameobjects[1].x +=1;
		}
		
		
		if(gameobjects[0].x < gameobjects[1].x)
		{
			gameobjects[1].x -=1;
     	}
		
		
		if(gameobjects[0].y > gameobjects[1].y)
		{
			gameobjects[1].y +=1;
		}
		
		
		if(gameobjects[0].y < gameobjects[1].y)
		{
			gameobjects[1].y -=1;
		}
		// decreases health if collide
		if (gameobjects[0].y == gameobjects[1].y && gameobjects[0].x == gameobjects[1].x)
		{
			playerHealth -= 1;
			console.log(playerHealth);
		}
		
	
	
		
    }

// draw gameobjects
function draw() {
    // Clear Canvas
    // Iterate through all GameObjects
    // Draw each GameObject
    // console.log("Draw");
	
}


// Total Frames
var frames = 4;

// Current Frame
var currentFrame = 0;

// Initial time set
var initial = new Date().getTime();
var current; // current time



function animate() {
// cleans the animation and movement constantly so It's not trailing behind
	context.clearRect(0, 0, canvas.width, canvas.height); 
    current = new Date().getTime(); 
	// used for the speed between frames. lower the number, lower the speed of the Animation
    if (current - initial >= 200) { // check is greater that 500 ms
        currentFrame = (currentFrame + 1) % frames; // update frame
        initial = current; // reset initial
    } 
	
    // Draw sprites
	context.drawImage(backGroundSprite, 0, 0, 800, 600 );
    context.drawImage(sprite, (sprite.width / 4) * currentFrame, (sprite.height / 4), 34, 45, gameobjects[0].x, gameobjects[0].y, 100, 100);
	context.drawImage(npcsprite, (npcsprite.width / 4) * currentFrame, 0, 100, 100, gameobjects[1].x, gameobjects[1].y, 150, 150);
	// draws gameover is health <= 0
	if ( playerHealth <=0 )
	{
	context.drawImage(gameOverSprite, 0, 0, 800, 600);
	}
	// detects collision
	if(gameobjects[0].x == gameobjects[1].x && gameobjects[0].y == gameobjects[1].y)
	{
		gameobjects[1].x = 600;
		gameobjects[1].y = 10;
	}
	
	drawHealthbar();
}

function onPageLoad() {
	
	var url = document.location.href;
	var welcomeMessage = "welcome ";
	var splitString = url.split("=");
	var fullMessage = welcomeMessage.concat(splitString[1]);
	alert(fullMessage);
}
// gameloop
function gameloop() {
    update();
    draw();
	animate();
    window.requestAnimationFrame(gameloop);
	
}

// Handle Active Browser Tag Animation
window.requestAnimationFrame(gameloop);

// Handle Keypressed
// used to detect when keys are released
window.addEventListener('keyup', input);
// used to detect when keys are pressed
window.addEventListener('keydown', input);



