
var canvas = document.getElementById("game");
var context = canvas.getContext("2d");

var shotCount = 5;
var shotMessage = "Shots Fired: ";

var xSpriteCounter = 0;
var xSpriteXPos = [-200, -200, -200, -200, -200];
var xSpriteYPos = [-200, -200, -200, -200, -200];

var splashPositionX = -200;
var splashPositionY = -200;

var explosionPositionX = -200;
var explosionPositionY = -200;

var isPlayerOnEnemy = false;

playerPosition = [
  [100, 100]
];

var enemyPosition;

var ranNumx = Math.floor((Math.random() * 8) + 1);

var ranNumy = Math.floor((Math.random() * 6) + 1);

var radarXCoordinate = 0;
var radarYCoordinate = 0;

console.log(ranNumx);
console.log(ranNumy);

makeEnemyPosition();

displayWelcomeMessage();

// var radarText = canvas.getContext("2d");
// radarText.font = "30px Arial";
// radarText.fillText("Hello World", 10, 50);


// Update Heads Up Display with song Information
function missileSelection() {
  var selection = document.getElementById("missiles").value;

  var active = document.getElementById("active");
  if (active.checked == true) {
    document.getElementById("HUD").innerHTML = selection + " active ";
    console.log("song Active");

    // plays 3 songs based on the selection
    if (selection === "Pursuit.mp3") {
      pursuitAudio.play();
    }

    if (selection === "battleff7.mp3") {
      ff7Audio.play();
    }

    if (selection === "battleXeno2.mp3") {
      xeno2Audio.play();
    }

  }
  else {
    document.getElementById("HUD").innerHTML = selection + " selected ";

    // pauses the song and restarts them
    pursuitAudio.pause();
    pursuitAudio.currentTime = 0;

    ff7Audio.pause();
    ff7Audio.currentTime = 0;

    xeno2Audio.pause();
    xeno2Audio.currentTime = 0;
  }
}


function makeEnemyPosition() {

  enemyPosition = [
    [ranNumx * 100 - 100, ranNumy * 100 - 100]
  ]

  console.log(enemyPosition);
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
  "text": "Select missile",
  "value": "No missile",
  "selected": true
},
{
  "text": "missile",
  "value": "missile"

},
{
  "text": "sensor missile",
  "value": "sens missile"
},

];

// gets big dragon sprite
var npcsprite = new Image();
npcsprite.src = "./img/bahamut.png";

var splashSprite = new Image();
splashSprite.src = "./img/splash.png";
// gets player sprite
var sprite = new Image();
sprite.src = "./img/reticle.png";
// gets background sprite
var backGroundSprite = new Image();
backGroundSprite.src = "./img/ocean.jpg"
// gets gameover sprite
var gridSprite = new Image();
gridSprite.src = "./img/grid.png"

var gameOverSprite = new Image();
gameOverSprite.src = "./img/gameOver.jpg"

var explosionSprite = new Image();
explosionSprite.src = "./img/explosion.png"





xSprite1 = new Image();
xSprite1.src = './img/x sprite.png';

xSprite2 = new Image();
xSprite2.src = './img/x sprite.png';

xSprite3 = new Image();
xSprite3.src = './img/x sprite.png';

xSprite4 = new Image();
xSprite4.src = './img/x sprite.png';

xSprite5 = new Image();
xSprite5.src = './img/x sprite.png';

// audio which is used in the game
var buttonAudio = new Audio('buttonSound3.mp3');
var ff7Audio = new Audio("battleff7.mp3");
var xeno2Audio = new Audio("battleXeno2.mp3");
var pursuitAudio = new Audio("pursuit.mp3");
var splashSound = new Audio("splash.mp3");
var selectBox = document.getElementById('missiles');

// add all of the things from the options array to the selectbox
for (var i = 0; i < options.length; i++) {
  var option = options[i];
  selectBox.options.add(new Option(option.text, option.value, option.selected));
}


// gameover when health <= 0
var playerHealth = 4;
// gameobject
function GameObject(name, img, health) {
  this.name = name;
  this.img = img;
  this.health = health;
  this.x = 0;
  this.y = 0;
}

// gamerInput holds the player input (up, down, left, right)
function GamerInput(input) {
  this.action = input;
}

// Default Player
var player = new GameObject("player", sprite, 100);

// Default GamerInput is set to None. used when theres no input
var gamerInput = new GamerInput("None");



// creates array gameobjects. 0 = player, 1 = enemy.
var gameobjects = [player, new GameObject("NPC", npcsprite, 100)];


document.getElementById("buttonUp").onmouseup = function () { buttonUp() };
document.getElementById("buttonDown").onmouseup = function () { buttonUp() };
document.getElementById("buttonLeft").onmouseup = function () { buttonUp() };
document.getElementById("buttonRight").onmouseup = function () { buttonUp() };
document.getElementById("splash").onmouseup = function () { shootMissile() };

// plays a button sound anytime one of these functions is activated
function leftButtonOnClick() {
  gamerInput = new GamerInput("Left");
  buttonAudio.play();

}

function rightButtonOnClick() {
  gamerInput = new GamerInput("Right");
  buttonAudio.play();
}

function upButtonOnClick() {
  gamerInput = new GamerInput("Up");
  buttonAudio.play();
}

function downButtonOnClick() {
  gamerInput = new GamerInput("Down");
  buttonAudio.play();
}

function buttonUp() {
  gamerInput = new GamerInput("None");

}


// Process keyboard input event
function input(event) {
  //  used to detect what the player has entered
  // when a key is pressed
  if (event.type == "keydown") {
    switch (event.keyCode) {
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
  else {
    // no input
    gamerInput = new GamerInput("None");
  }
  console.log("Gamer Input :" + gamerInput.action);

}


function update() {
  // adding key input functionality
  // move player
  if (gamerInput.action === "Up") {
    gameobjects[0].y -= 100;
    gamerInput.action = "None"
  }

  if (gamerInput.action == "Down") {
    gameobjects[0].y += 100;
    gamerInput.action = "None"
  }

  if (gamerInput.action == "Left") {
    gameobjects[0].x -= 100;
    gamerInput.action = "None"

  }

  if (gamerInput.action == "Right") {
    gameobjects[0].x += 100;
    gamerInput.action = "None"
  }



  checkIfPosIsEqual();
}

// draw gameobjects
function draw() {
  // Clear Canvas
  // Iterate through all GameObjects
  // Draw each GameObject
  // console.log("Draw");

}

function checkIfPosIsEqual() {

  if (gameobjects[0].x == enemyPosition[0][0] && gameobjects[0].y == enemyPosition[0][1]) {

    isPlayerOnEnemy = true;
  }
  else {
    isPlayerOnEnemy = false;
  }
  console.log(isPlayerOnEnemy);

}

function shootMissile() {
  gamerInput = new GamerInput("splash");

  console.log(shotMessage);
  console.log(shotCount);

  if (shotCount <= 0) {
    console.log("you lose");
  }
  shotCount--;

  playSplashSound();
  moveXSprite();
  moveAppropriateSprites();

  if (isPlayerOnEnemy == true) {

  }

  splashPositionX = gameobjects[0].x;
  splashPositionY = gameobjects[0].y;

  moveXSprite();

  onPageLoad();

  displayRadarCoordinates();
}


function playSplashSound() {
  gamerInput = new GamerInput("splash");
  splashSound.play();






}

function moveAppropriateSprites() {

  if (isPlayerOnEnemy == false) {
    splashPositionX = gameobjects[0].x;
    splashPositionY = gameobjects[0].y;
  }
  else if (isPlayerOnEnemy == true) {
    explosionPositionX = gameobjects[0].x;
    explosionPositionY = gameobjects[0].y;
  }
}


function hitEnemy() {


}

function moveXSprite() {

  xSpriteXPos[xSpriteCounter] = gameobjects[0].x;
  xSpriteYPos[xSpriteCounter] = gameobjects[0].y

  xSpriteCounter++;

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
  context.drawImage(backGroundSprite, 0, 0, 800, 600);
  context.drawImage(gridSprite, 0, 0, 800, 800);
  context.drawImage(sprite, (0), (0), 42, 42, gameobjects[0].x, gameobjects[0].y, 100, 100);

  context.drawImage(splashSprite, (splashSprite.width / 4) * currentFrame, (splashSprite.height / 2), 62, 33, splashPositionX, splashPositionY, 100, 100);


  context.drawImage(xSprite1, xSpriteXPos[0] + 30, xSpriteYPos[0] + 30, 42, 42);
  context.drawImage(xSprite2, xSpriteXPos[1] + 30, xSpriteYPos[1] + 30, 42, 42);
  context.drawImage(xSprite3, xSpriteXPos[2] + 30, xSpriteYPos[2] + 30, 42, 42);
  context.drawImage(xSprite4, xSpriteXPos[3] + 30, xSpriteYPos[3] + 30, 42, 42);
  context.drawImage(xSprite5, xSpriteXPos[4] + 30, xSpriteYPos[4] + 30, 42, 42);


  context.drawImage(explosionSprite, (explosionSprite.width / 4) * currentFrame, (explosionSprite.height / 4), 64, 64, explosionPositionX, explosionPositionY, 100, 100);



  //context.drawImage(xSprite, xSpriteXPos + 30, xSpriteYPos + 30, 42, 42);
  // draws gameover is health <= 0
  if (playerHealth <= 0) {
    context.drawImage(gameOverSprite, 0, 0, 800, 600);
  }


}

function displayWelcomeMessage() {

  var url = document.location.href;
  var welcomeMessage = "welcome ";
  var splitString = url.split("=");
  var fullMessage = welcomeMessage.concat(splitString[1]);
  alert(fullMessage);

}

function displayRadarCoordinates() {

  radarXCoordinate = gameobjects[0].x - enemyPosition[0][0];
  radarYCoordinate = gameobjects[0].x - enemyPosition[0][1];

  if (radarXCoordinate < 0) {
    radarXCoordinate = radarXCoordinate * -1;
  }

  if (radarYCoordinate < 0) {
    radarYCoordinate = radarYCoordinate * -1;
  }

  alert("Enemy is (" + radarXCoordinate + "," + radarYCoordinate + ") away from the player ");

}

function onPageLoad() {



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



