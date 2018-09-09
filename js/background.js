import Sprite from './base/sprite'
import DataBus from './databus'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const BG_IMG_SRC = 'images/bg.png'
const BG_WIDTH = 114
const BG_HEIGHT = 122

const databus = new DataBus();

export default class BackGround extends Sprite {
  constructor(ctx) {
    super(BG_IMG_SRC, BG_WIDTH, BG_HEIGHT);

    this.top = 0;

    this.render(ctx);
  }

  update() {
    if(databus.gameplayPaused) {
      return;
    }

    this.top += 2;

    if (this.top >= screenHeight)
      this.top = 0;
  }

  render(ctx) {
    ctx.drawImage(
      this.img,
      0,
      0,
      this.width,
      this.height,
      0,
      -screenHeight + this.top,
      screenWidth,
      screenHeight
    );

    ctx.drawImage(
      this.img,
      0,
      0,
      this.width,
      this.height,
      0,
      this.top,
      screenWidth,
      screenHeight
    );
  }
}
