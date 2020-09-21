export class Brick{
  x: BrickConfig['x'];
  y: BrickConfig['y'];
  #ctx: BrickConfig['ctx']
  width: BrickConfig['width']
  height: BrickConfig['height']
  padding: BrickConfig['padding']
  offsetLeft: BrickConfig['offsetLeft']
  offsetTop: BrickConfig['offsetTop']
  column: BrickConfig['column']
  row: BrickConfig['row']

  status = true;

  constructor(config: BrickConfig) {
    this.x = config.x;
    this.y = config.y;

    this.#ctx = config.ctx;
    this.x = config.x;
    this.y = config.y;
    this.width = config.width;
    this.height = config.height;
    this.padding = config.padding;
    this.offsetLeft = config.offsetLeft;
    this.offsetTop = config.offsetTop;
    this.column = config.column;
    this.row = config.row;
  }

  draw() {
    if (this.status) {
      var brickX = this.column * (this.width + this.padding) + this.offsetLeft;
      var brickY = this.row * (this.height + this.padding) + this.offsetTop;
      this.x = brickX;
      this.y = brickY;
      this.#ctx.beginPath();
      this.#ctx.rect(brickX, brickY, this.width, this.height);
      this.#ctx.fillStyle = "#0095DD";
      this.#ctx.fill();
      this.#ctx.closePath();
    }
  }

  destroy() {
    this.status = false
  }
}

interface BrickConfig {
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  padding: number,
  offsetLeft: number,
  offsetTop: number,
  column: number,
  row: number
}