import { Ball } from './components/Ball';
import { Brick } from './components/Brick';
import { Paddle } from './components/Paddle';

// class Game {
//   constructor() {}
// }


const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");


const ball = new Ball({
  ctx: ctx,
  x: canvas.width / 2,
  y: canvas.height - 30,
  color: '#ff95DD',
  radius: 10
})

const paddle = new Paddle({
  ctx: ctx,
  x: (canvas.width - 75) / 2,
  y: canvas.height - 10,
  height: 10,
  width: 75
});


var dx = 2;
var dy = -2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var score = 0;
var lives = 3;

var bricks = [];
for (var c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (var r = 0; r < brickRowCount; r++) {
    bricks[c][r] = new Brick({
      x: 0,
      y: 0,
      column: c,
      row: r,
      ctx: ctx,
      width: 75,
      height: 30,
      padding: 10,
      offsetLeft: 30,
      offsetTop: 30
    });
  }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddle.x = relativeX - paddle.width / 2;
  }
}

function keyDownHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = true;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false;
  }
}

function collisionDetection() {
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      var b = bricks[c][r];
      if (b.status == 1) {
        if (
          ball.x > b.x &&
          ball.x < b.x + brickWidth &&
          ball.y > b.y &&
          ball.y < b.y + brickHeight
        ) {
          dy = -dy;
          b.status = 0;
          score++;
          if (score == brickRowCount * brickColumnCount) {
            alert("YOU WIN, CONGRATULATIONS!");
            document.location.reload();
            // clearInterval(interval);
          }
        }
      }
    }
  }
}
function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095dd";
  ctx.fillText("Score: " + score, 8, 20);
}
function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}
function drawBricks() {
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      bricks[c][r].draw();
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  ball.draw();
  paddle.draw();
  collisionDetection();
  drawScore();
  drawLives();

  if (ball.x + dx > canvas.width - ball.radius || ball.x + dx < ball.radius) {
    dx = -dx;
  }
  if (ball.y + dy < ball.radius) {
    dy = -dy;
  } else if (ball.y + dy > canvas.height - ball.radius) {
    if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
      ball.y -= paddle.height;
      if (ball.y) {
        dy = -dy;
      }
    } else {
      lives--;
      if (!lives) {
        // alert("GAME OVER");
        document.location.reload();
        // clearInterval(interval); // Needed for Chrome to end game
      } else {
        ball.x = canvas.width / 2;
        ball.y = canvas.height - 30;
        dx = 2;
        dy = -2;
        paddle.x = (canvas.width - paddle.width) / 2;
      }
    }
  }

  if (rightPressed && paddle.x < canvas.width - paddle.width) {
    paddle.x += 7;
  } else if (leftPressed && paddle.x > 0) {
    paddle.x -= 7;
  }

  ball.x += dx;
  ball.y += dy;
  requestAnimationFrame(draw);
}

draw();