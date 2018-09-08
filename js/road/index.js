import Sprite from '../base/sprite'
const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const ROAD_IMAGE_SRC = 'images/road.png'
const ROAD_WIDTH = 150   
const ROAD_HEIGHT = 633
const ROAD_DISPLAY_WIDTH = 100
const ROAD_DISPLAY_HEIGHT = ROAD_HEIGHT * 3

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
      this.x,
      this.top - screenHeight,
      ROAD_DISPLAY_WIDTH,
      ROAD_DISPLAY_HEIGHT
    )
  }
}