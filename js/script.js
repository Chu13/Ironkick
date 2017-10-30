console.log('Working');

var canvas = document.querySelector('#canvas-game');

var ctx = canvas.getContext('2d');

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









// --------------------------------------
// Game two

var canvasTwo = document.querySelector('#game-two');
var gameTwo = canvasTwo.getContext('2d');

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
