export default class Rectangle {
  height: number;

  width: number;

  x: number;

  y: number;

  color: string;

  constructor(
    height: number,
    width: number,
    x: number,
    y: number,
    color: string,
  ) {
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
    this.color = color;
  }

  get bottom() {
    return this.y + this.height;
  }

  get left() {
    return this.x;
  }

  get right() {
    return this.x + this.width;
  }

  get top() {
    return this.y;
  }

  draw = (ctx: any) => {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
  };

  testCollision = (rectangle: Rectangle) => {
    if (
      this.top > rectangle.bottom ||
      this.right < rectangle.left ||
      this.bottom < rectangle.top ||
      this.left > rectangle.right
    ) {
      return false;
    }
    return true;
  };
}
