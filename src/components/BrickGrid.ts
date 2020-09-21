import { Ball } from './Ball';
import { Brick } from './Brick';

export class BrickGrid {
  #ctx: BrickGridConfig['ctx']
  cols: BrickGridConfig['cols']
  rows: BrickGridConfig['rows']
  brickWidth: BrickGridConfig['brickWidth']
  brickHeight: BrickGridConfig['brickHeight']

  bricks: Brick[][] = []


  constructor(config: BrickGridConfig) {
    this.cols = config.cols;
    this.rows = config.rows;

    this.#ctx = config.ctx;
    this.brickWidth = config.brickWidth;
    this.brickHeight = config.brickHeight;
  }

  generateBricks() {
    for (var c = 0; c < this.cols; c++) {
      this.bricks[c] = [];
      for (var r = 0; r < this.rows; r++) {
        this.bricks[c][r] = new Brick({
          x: 0,
          y: 0,
          column: c,
          row: r,
          ctx: this.#ctx,
          width: this.brickWidth,
          height: this.brickHeight,
          padding: 10,
          offsetLeft: 30,
          offsetTop: 30
        });
      }
    }
  }

  draw() {
    for (const brick of this.bricks.flat()) {
      brick.draw();
    }
  }


  checkCollision(ball: Ball): boolean {
    for (const brick of this.bricks.flat()) {
      if (brick.status === true) {
        if (
          ball.x > brick.x &&
          ball.x < brick.x + this.brickWidth &&
          ball.y > brick.y &&
          ball.y < brick.y + this.brickHeight
        ) {

          brick.destroy();
          return true
        }
      }
    }
    return false;
  }
}

interface BrickGridConfig {
  ctx: CanvasRenderingContext2D,
  rows: number,
  cols: number,
  brickWidth: number,
  brickHeight: number,
}