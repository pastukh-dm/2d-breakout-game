export class Ball {
  #ctx: BallConfig['ctx']
  x: BallConfig['x']
  y: BallConfig['y']
  #color: BallConfig['color']
  radius: BallConfig['radius']

  constructor(config: BallConfig) {
    this.x = config.x;
    this.#ctx = config.ctx;
    this.y = config.y;
    this.#color = config.color;
    this.radius = config.radius;
  }

  draw() {
    this.#ctx.beginPath();
    this.#ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.#ctx.fillStyle = this.#color;
    this.#ctx.fill();
    this.#ctx.closePath();
  }
  
}

interface BallConfig {
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  color: string,
  radius: number,
}