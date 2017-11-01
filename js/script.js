
$(document).ready( function (){
var canvas = document.querySelector('#canvas-game');

var ctx = canvas.getContext('2d');


// ------ Field 1-----
function field() {
  ctx.beginPath();
  ctx.strokeStyle = 'white';
  ctx.moveTo(0, 20);
  ctx.lineTo(1000, 20);
  ctx.moveTo(0, 480);
  // ctx.lineTo(20, 480);
  ctx.lineTo(1000, 480);
  ctx.moveTo(400, 20);
  ctx.lineTo(400, 480);
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
  ctx.arc(400, 250, 100, 0, 360, false);
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
  ctx.moveTo(1000, 100);
  ctx.lineTo(940, 100);
  ctx.lineTo(940, 400);
  ctx.lineTo(1000, 400);
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
  ctx.arc(940, 250, 50, 0.5*Math.PI, 1.5*Math.PI, false);
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
  ctx.arc(998, 250, 2, 0, 360, false);
  ctx.fillStyle = 'white';
  ctx.fill();
  ctx.closePath();
}

// ------ Player ------

var player = {
  x: 0,
  y: 290,
  width: 50,
  height: 50,
  draw: function () {
      ctx.fillStyle = 'indigo';
      ctx.fillRect(this.x, this.y, this.width, this.height);
  }
};

// ------ Player Movement -----

$(document).keydown(function (event) {
  event.preventDefault();
  switch (event.keyCode) {
    case 37: //left arrow
      player.x -= 15;
      break;

    case 38: // "up" arrow
      player.y -= 15;
      break;

    case 39: // right arrow
    player.x += 15;
    break;

    case 40: // down arrow
      player.y += 15;
      break;
  }
});

// ------- Defender -------

function Defender (width, height, color, x, y, speed) {
  this.width = width;
  this.height = height;
  this.color = color;
  this.x = x;
  this.y = y;
  this.speed = speed;
}
Defender.prototype.update = function(){
  if (this.y + this.height > canvas.height || this.y < 0){
    this.speed = -this.speed;
  }
    this.y += this.speed;
};

Defender.prototype.draw = function (){
  ctx.fillStyle = this.color;
  ctx.fillRect(this.x, this.y, this.width, this.height);
};


var defense = [
  new Defender (50, 50,'white', 80, 240, 4),
  new Defender (50, 50, 'white', 200, 240, 1),
  new Defender (50, 50, 'white', 320, 240, 2),
  new Defender (50, 50, 'white', 440, 240, 3),
  new Defender (50, 50, 'white', 560, 240, 4),
  new Defender (50, 50, 'white', 680, 240, 5),
];

Defender.prototype.crashWith = function (obj) {
  return getBottom(this) >= getTop(obj) &&
         getTop(this)  <= getBottom(obj) &&
         getRight(this)  >= getLeft(obj) &&
         getLeft(this)   <= getRight(obj);
};

function getTop(obj) {
  return obj.y;
}

function getBottom(obj) {
  return obj.y + obj.height;
}

function getLeft(obj) {
  return obj.x;
}

function getRight(obj) {
  return obj.x + obj.width;
}

// ---------- Updating -------

var isGameOver = false;

function draw() {
 ctx.clearRect(0, 0, canvas.width, canvas.height);

  field();

 drawDefense(defense);

  player.draw();
    if (!isGameOver) {
     requestAnimationFrame(draw);
    }
}
requestAnimationFrame(draw);

function drawDefense(defenseArray){

  defenseArray.forEach(function (defender){
    if (defender.crashWith(player)){
  isGameOver = true;
}
    defender.update();
    defender.draw();
  });
}

});

// --------------------------------------
// Second Part --------

$(document).ready( function (){

var canvasTwo = document.querySelector('#game-two');
var gameTwo = canvasTwo.getContext('2d');

// ------- Field -------
gameTwo.beginPath();
gameTwo.strokeStyle = 'white';
gameTwo.moveTo(20, 10);
gameTwo.lineTo(580, 10);
gameTwo.lineTo(580, 600);
gameTwo.moveTo(20, 600);
gameTwo.lineTo(20, 10);
gameTwo.stroke();
gameTwo.closePath();

gameTwo.beginPath();
gameTwo.moveTo(100, 10);
gameTwo.lineTo(100, 210);
gameTwo.lineTo(500, 210);
gameTwo.lineTo(500, 10);
gameTwo.moveTo(180, 10);
gameTwo.lineTo(180, 110);
gameTwo.lineTo(420, 110);
gameTwo.lineTo(420, 10);
gameTwo.stroke();


// ---- Goal line ---
gameTwo.beginPath();
gameTwo.moveTo(230, 12);
gameTwo.lineTo(370,12);
gameTwo.strokeStyle = 'yellow';
gameTwo.stroke();
gameTwo.closePath();

// ------- Goalie -----



var goalie = {
  x: 290,
  y: 15,
  width: 20,
  height: 20,
  color: 'Blue',
  speed: 1,
  draw: function () {
      gameTwo.fillStyle = goalie.color;
      gameTwo.fillRect(this.x, this.y, this.width, this.height);
  }
};

goalie.draw();

});
