
$(document).ready( function (){
    $('#third-gif').hide();
    $('#second-gif').hide();
    $('#game-two').hide();
    $('#first-gif').hide();
    $('#canvas-game').hide();
    $('#game-over').hide();
    $('#win-page').hide();
    $('#lose-gif').hide();
    $('#whistle-gif').hide();
    $('#celebration').hide();

           var audioPlay = new Audio('Sounds/playing.wav');
           var audioFoul = new Audio('Sounds/FoulE.wav');
           var audioLose = new Audio('Sounds/loseE.wav');

// ------- First Page --------
    $(".start-btn").click(function(){
        $(".start-page").fadeOut();
        setTimeout(function(){$('#first-gif').fadeOut();}, 3000);
        $("#first-gif").fadeIn(1000);
        setTimeout(function(){$("#canvas-game").fadeIn(2000);}, 3500);
        setTimeout(function(){audioPlay.play();}, 3500);
    });

// ------- Second Page -------
  function foul(){
        $("#canvas-game").fadeOut();
        $('#second-gif').fadeIn(1000);
        setTimeout(function(){$('#second-gif').fadeOut();}, 2500);
        setTimeout(function(){$("#game-two").fadeIn(1000);}, 3000);
        audioPlay.pause();
        audioFoul.play();
  }

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
    width: 40,
    height: 40,
    draw: function () {
        ctx.fillStyle = 'Red';
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
    if (player.x >= 800){
      foul();
    }
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
  new Defender (40, 40,'Blue', 85, 240, 4),
  new Defender (40, 40, 'Blue', 195, 240, 1),
  new Defender (40, 40, 'Blue', 315, 240, 2),
  new Defender (40, 40, 'Blue', 435, 240, 3),
  new Defender (40, 40, 'Blue', 555, 240, 4),
  new Defender (40, 40, 'Blue', 670, 240, 5),
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


//------ Last Defender ------
function Defender2 (width, height, color, x, y, speed) {
      this.width = width;
      this.height = height;
      this.color = color;
      this.x = x;
      this.y = y;
      this.speed = speed;
      this.draw = function (){
          ctx.fillStyle = this.color;
          ctx.fillRect(this.x, this.y, this.width, this.height);
          };
      this.update = function () {
          if (this.y + this.height > 400|| this.y < 100){
            this.speed = -this.speed;
          }
            this.y += this.speed;
            this.draw();
          };

      }
      var defender2 = new Defender2(50, 50, 'Blue', 950, 230, 10);


// ---------- Updating -------

var isGameOver = false;

function draw() {
 ctx.clearRect(0, 0, canvas.width, canvas.height);

  field();
  drawDefense(defense);
  player.draw();
  defender2.update();

    if (!isGameOver) {
     requestAnimationFrame(draw);
    }
}
requestAnimationFrame(draw);


// ---------- Defense ---------

function drawDefense(defenseArray){

  defenseArray.forEach(function (defender){
    if (defender.crashWith(player)){
  isGameOver = true;
  youLose();
}
    defender.update();
    defender.draw();
  });
}

function youLose(){
  $("#canvas-game").fadeOut();
  audioPlay.pause();
  audioLose.play();
  $('#lose-gif').fadeIn(1000);
  setTimeout(function(){$('#lose-gif').fadeOut();}, 3500);
  setTimeout(function(){$('#whistle-gif').fadeIn();}, 4000);
  setTimeout(function(){$('#whistle-gif').fadeOut();}, 5500);
  setTimeout(function(){$('#game-over').fadeIn();}, 6000);
}

});

// --------------------------------------
// Second Part --------

$(document).ready( function (){

var canvasTwo = document.querySelector('#game-two');
var gameTwo = canvasTwo.getContext('2d');

// ------- Field -------
function halfField() {
gameTwo.beginPath();
gameTwo.strokeStyle = 'white';
gameTwo.moveTo(20, 10);
gameTwo.lineTo(580, 10);
gameTwo.lineTo(580, 600);
gameTwo.moveTo(20, 600);
gameTwo.lineTo(20, 10);
gameTwo.stroke();
gameTwo.closePath();

// ------ Area -------
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
gameTwo.closePath();

gameTwo.beginPath();
gameTwo.arc(300,210,70,0*Math.PI,1*Math.PI);
gameTwo.stroke();
gameTwo.closePath();
}


// ---- Goal line ---
function goalLine () {
gameTwo.beginPath();
gameTwo.moveTo(230, 12);
gameTwo.lineTo(370,12);
gameTwo.strokeStyle = 'yellow';
gameTwo.stroke();
gameTwo.closePath();
}

// ------- Goalie -----
function Goalie (x, y, width, height, color, speed) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.color = color;
  this.speed = speed;
  this.draw = function (){
    gameTwo.fillStyle = this.color;
    gameTwo.fillRect(this.x, this.y, this.width, this.height);
  };

  this.update = function () {
    if (this.x + this.width > 380 || this.x < 220){
      this.speed = -this.speed;
    }
      this.x += this.speed;
      this.draw();
  };
}
 var goalie = new Goalie (290, 15, 20, 20, 'indigo', 1);

// ---------  Wall --------
 function WallP (width, height, color, x, y) {
   this.width = width;
   this.height = height;
   this.color = color;
   this.x = x;
   this.y = y;
   this.draw = function (){
     gameTwo.fillStyle = this.color;
     gameTwo.fillRect(this.x, this.y, this.width, this.height);
   };
 }

var wallOne = new WallP (20, 20, 'Blue', 230, 250);
var wallTwo = new WallP (20, 20, 'Blue', 255, 250);
var wallThird = new WallP (20, 20, 'Blue', 280, 250);
var wallFour = new WallP (20, 20, 'Blue', 305, 250);

// ------- Shooter -------

function Shooter (x, y, width, height, color) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.color = color;
  this.draw = function (){
    gameTwo.fillStyle = this.color;
    gameTwo.fillRect(this.x, this.y, this.width, this.height);
  };
}

var kicker = new Shooter (250, 400, 20, 20, 'Red');

// --------- Ball ----------

var ball = {
  x: 260,
  y: 390,
  speed: 5,
  radius: 5,
  start: 0*Math.PI,
  end: 2*Math.PI,
  draw: function () {
      gameTwo.beginPath();
      gameTwo.fillStyle = 'white';
      gameTwo.arc(this.x,this.y,this.radius,this.start,this.end);
      gameTwo.fill();
      gameTwo.closePath();
  },
  update: function() {
    if (ball.y < 1){
      // goal();
    }
    ball.y -= 3;
  }

};

var ballKick = false;
addEventListener('keydown', function(e) {
      if (e.keyCode == 32) {
      ballKick = true;
      audioGoal.play();
      audioWhistle.play();
      }
    });


// ---- Second Part Logic ----

var goal = false;

 function drawGoalie() {
     gameTwo.clearRect(0, 0, canvasTwo.width, canvasTwo.height);
     if (!goal){
     requestAnimationFrame(drawGoalie);
     }
     halfField();
     goalLine();
     wallOne.draw();
     wallTwo.draw();
     wallThird.draw();
     wallFour.draw();
     kicker.draw();
     ball.draw();
     if (ballKick == true){
     ball.update();
     }
     if (ball.y < 1){
       goal = true;
       isGoal();
     }

     goalie.update();
   }
   drawGoalie();

   function isGoal(){
     $('#game-two').fadeOut();
     $('#third-gif').fadeIn(100);
     setTimeout(function(){$('#third-gif').fadeOut();}, 4000);
     setTimeout(function(){$('#celebration').fadeIn();}, 4500);
     setTimeout(function(){$('#celebration').fadeOut();}, 5500);
     setTimeout(function(){$('#win-page').fadeIn();}, 6000);

   }

   // ------- Audio -------
       var audioGoal = new Audio('Sounds/GoalF.mp3');
       var audioWhistle = new Audio('Sounds/whistle.wav');
});






//https://media.giphy.com/media/IUmViDZrGLol2/giphy.gif

//----- Player sticker------
//https://media.giphy.com/media/11nUsPdWtoRQ40/giphy.gif
//https://media.giphy.com/media/FgIuR807RlpZe/giphy.gif
