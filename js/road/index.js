import Sprite from '../base/sprite'
const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const ROAD_IMAGE_SRC = 'images/road.png'
const ROAD_WIDTH = 600   // nonsense
const ROAD_HEIGHT = 500  // nonsense

export default class Road extends Sprite {
 
  constructor(ctx, roadX) {
    super(ROAD_IMAGE_SRC, ROAD_WIDTH, ROAD_HEIGHT)

    this.top = 0
    this.x = roadX

    this.render(ctx)
  }

  update(ctx) {
    this.top += 4;

    if (this.top >= screenHeight)
      this.top = 0
  }

  render(ctx) {
    ctx.drawImage(
      this.img,
      0,
      0,
      this.width,
      this.height,
      this.x,
      this.top - screenHeight,
      screenWidth,
      screenHeight * 2
    );
  }
}