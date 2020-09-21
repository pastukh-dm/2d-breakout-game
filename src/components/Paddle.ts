export class Paddle {
  #width: PaddleConfig['width']
  #height: PaddleConfig['height']
  #ctx: PaddleConfig['ctx']
  x: PaddleConfig['x']
  y: PaddleConfig['y']

  constructor(config: PaddleConfig) {
    this.#width= config.width;
    this.#height= config.height;
    this.x = config.x;
    this.#ctx = config.ctx;
    this.y = config.y;
  }

  draw() {
    this.#ctx.beginPath();
    this.#ctx.rect(this.x, this.#ctx.canvas.height - this.height, this.width, this.height);
    this.#ctx.fillStyle = "#0095DD";
    this.#ctx.fill();
    this.#ctx.closePath();
  }

  get width() {
    return this.#width
  }

  get height() {
    return this.#height
  }
}

interface PaddleConfig {
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  height: number,
  width: number,
}