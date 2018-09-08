import Sprite from '../base/sprite'
import DataBus from '../databus'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const ROAD_IMAGE_SRC = 'images/road.png'
const ROAD_WIDTH = 204
const ROAD_HEIGHT = 622
const ROAD_DISPLAY_WIDTH = 100
const ROAD_DISPLAY_HEIGHT = ROAD_HEIGHT * 2.5
let databus = new DataBus()

export default class Road extends Sprite {
  constructor(ctx, roadX, roadId) {
    super(ROAD_IMAGE_SRC, ROAD_WIDTH, ROAD_HEIGHT)

    this.top = 0
    this.x = roadX
    this.id = roadId;

    this.render(ctx)

    this.initEvent()
  }

  checkIsFingerOnAir(x, y) {
    const deviation = 0

    return !!(x >= this.x - deviation
      && y >= this.y - deviation
      && x <= this.x + ROAD_DISPLAY_WIDTH + deviation
      && y <= this.y + ROAD_DISPLAY_HEIGHT+ deviation)
  }

  initEvent() {
    canvas.addEventListener('touchstart', ((e) => {
      e.preventDefault()

      let x = e.touches[0].clientX;
      let y = e.touches[0].clientY;

      if (this.checkIsFingerOnAir(x, y)) {
        this.touched = true;
        console.log("Touched a road");

        databus.currentPlayerRoad = this.id;
      }
    }).bind(this));
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
