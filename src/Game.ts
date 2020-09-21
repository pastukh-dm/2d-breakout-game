import { BrickGrid } from './components/BrickGrid';
import { Ball } from './components/Ball';
import { Paddle } from './components/Paddle';



class Game {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  ball: Ball;
  paddle: Paddle;
  brickGrid: BrickGrid;


  dx = 2;
  dy = -2;
  rightPressed = false;
  leftPressed = false;
  score = 0;
  lives = 3;
  brickColumnCount = 5; // TODO get rid of
  brickRowCount = 3; // TODO get rid of

  constructor(config: { canvas: HTMLCanvasElement}) {
    this.canvas = config.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.ball = new Ball({
      ctx: this.ctx,
      x: this.canvas.width / 2,
      y: this.canvas.height - 30,
      color: '#f95',
      radius: 10
    });
    this.paddle = new Paddle({
      ctx: this.ctx,
      x: (this.canvas.width - 75) / 2,
      y: this.canvas.height - 10,
      height: 10,
      width: 75
    })


    this.brickGrid = new BrickGrid({
      ctx: this.ctx,
      rows: this.brickRowCount,
      cols: this.brickColumnCount,
      brickHeight: 20,
      brickWidth: 75
    });

    document.addEventListener("keydown", this.handleKeyDown.bind(this), false);
    document.addEventListener("keyup", this.handleKeyUp.bind(this), false);
    document.addEventListener("mousemove", this.handleMouseMove.bind(this), false);

    this.listenStart();
  }

  start() {
    this.brickGrid.generateBricks();
    this.draw();
  }

  listenStart() {
    this.handleStartClick = this.handleStartClick.bind(this);
    this.handleStartPress = this.handleStartPress.bind(this);

    this.canvas.addEventListener("click", this.handleStartClick)
    document.addEventListener('keyup', this.handleStartPress)
  }
  stopListenStart() {
    this.canvas.removeEventListener('click', this.handleStartClick)
    document.removeEventListener('keyup', this.handleStartPress)
  }

  handleStartClick() {
    this.stopListenStart();
    this.start();
  }

  handleStartPress(e: KeyboardEvent) {
    if (e.key === ' ' || e.code === 'Space') {
      this.stopListenStart();
      this.start();
    }
  }


  handleMouseMove(e) {
    var relativeX = e.clientX - this.canvas.offsetLeft;
    if (relativeX > 0 && relativeX < this.canvas.width) {
      this.paddle.x = relativeX - this.paddle.width / 2;
    }
  }

  handleKeyDown(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
      this.rightPressed = true;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
      this.leftPressed = true;
    }
  }

  handleKeyUp(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
      this.rightPressed = false;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
      this.leftPressed = false;
    }
  }


 collisionDetection() {
   if (this.brickGrid.checkCollision(this.ball)) {
     this.dy = -this.dy;
     this.score++;
  }
}

 checkScore() {
   if (this.score == this.brickRowCount * this.brickColumnCount) {
    console.log("YOU WIN, CONGRATULATIONS!");
    document.location.reload();
    // clearInterval(interval);
  }
}
 drawScore() {
   this.ctx.font = "16px Arial";
   this.ctx.fillStyle = "#0095dd";
   this.ctx.fillText("Score: " + this.score, 8, 20);
}
 drawLives() {
   this.ctx.font = "16px Arial";
   this.ctx.fillStyle = "#0095DD";
   this.ctx.fillText("Lives: " + this.lives, this.canvas.width - 65, 20);
}

 draw() {
   this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
   this.brickGrid.draw();
   this.ball.draw();
   this.paddle.draw();
   this.collisionDetection();
   this.checkScore();
   this.drawScore();
   this.drawLives();

   if (this.ball.x + this.dx > this.canvas.width - this.ball.radius || this.ball.x + this.dx < this.ball.radius) {
     this.dx = -this.dx;
  }
   if (this.ball.y + this.dy < this.ball.radius) {
     this.dy = -this.dy;
   } else if (this.ball.y + this.dy > this.canvas.height - this.ball.radius) {
     if (this.ball.x > this.paddle.x && this.ball.x < this.paddle.x + this.paddle.width) {
       this.ball.y -= this.paddle.height;
       if (this.ball.y) {
         this.dy = -this.dy;
      }
    } else {
       this.lives--;
       if (!this.lives) {
        // alert("GAME OVER");
        document.location.reload();
        // clearInterval(interval); // Needed for Chrome to end game
      } else {
         this.ball.x = this.canvas.width / 2;
         this.ball.y = this.canvas.height - 30;
         this.dx = 2;
         this.dy = -2;
         this.paddle.x = (this.canvas.width - this.paddle.width) / 2;
      }
    }
  }

   if (this.rightPressed && this.paddle.x < this.canvas.width - this.paddle.width) {
     this.paddle.x += 7;
  } else if (this.leftPressed && this.paddle.x > 0) {
     this.paddle.x -= 7;
  }

  this.ball.x += this.dx;
  this.ball.y += this.dy;
  requestAnimationFrame(this.draw.bind(this));
}
}

const game = new Game({
  canvas: document.getElementById("myCanvas") as HTMLCanvasElement
});