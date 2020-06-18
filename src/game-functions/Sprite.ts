export default class Sprite {
  currentFrame: number;

  spriteWidth: number;

  spriteHeight: number;

  maxFrames: number;

  image: any;

  constructor(
    imageSource: string,
    spriteWidth: number,
    spriteHeight: number,
    maxFrames: number,
  ) {
    this.currentFrame = 0;
    this.maxFrames = maxFrames;
    this.spriteWidth = spriteWidth;
    this.spriteHeight = spriteHeight;
    this.image = new Image(spriteWidth, spriteHeight);
    this.image.src = imageSource;
  }

  drawStrip = (ctx: any, x: number, y: number, scale = 200) => {
    ctx.clearRect(x, y, this.image.width * 2, this.image.height * 1.4);
    ctx.drawImage(
      this.image,
      this.image.width * this.currentFrame,
      0,
      this.image.width,
      this.image.height,
      x - this.currentFrame * 7,
      y,
      scale,
      scale,
    );

    this.currentFrame += 1;
    if (this.currentFrame >= this.maxFrames) {
      this.currentFrame = 0;
    }
  };
}
