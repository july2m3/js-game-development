export default class Rectangle {
  height: number;

  width: number;

  x: number;

  y: number;

  xVelocity: number;

  yVelocity: number;

  jumping: boolean;

  constructor(height: number, width: number, x: number, y: number) {
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
    this.xVelocity = 0;
    this.yVelocity = 0;
    this.jumping = false;
  }

  move = (border: number) => {
    this.x += this.xVelocity;
    this.xVelocity += 0.5;
    if (this.x >= border) {
      this.x = -this.width;
      this.xVelocity = 1;
    }
  };
}
