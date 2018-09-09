import Sprite from './base/sprite'
import DataBus from './databus'

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

const ROAD_IMAGE_SRC = 'images/road.png';
const ROAD_WIDTH = 200;
const ROAD_HEIGHT = 1598;
const ROAD_DISPLAY_WIDTH = 100;
const ROAD_DISPLAY_HEIGHT = ROAD_HEIGHT;
let databus = new DataBus()

export default class Road extends Sprite {
  constructor(ctx, roadX, roadId) {
    super(ROAD_IMAGE_SRC, ROAD_WIDTH, ROAD_HEIGHT);

    this.top = 0;
    this.x = roadX;
    this.id = roadId;

    this.render(ctx);

    this.initEvent()
  }

  checkIfRoadIsTouched(x, y) {
    const deviation = 0;

    return !!(x >= this.x - deviation
      && y >= this.y - deviation
      && x <= this.x + ROAD_DISPLAY_WIDTH + deviation
      && y <= this.y + ROAD_DISPLAY_HEIGHT+ deviation)
  }

  initEvent() {
    canvas.addEventListener('touchstart', ((e) => {
      e.preventDefault();

      let x = e.touches[0].clientX;
      let y = e.touches[0].clientY;

      if(!databus.gameOver) {
        if (this.checkIfRoadIsTouched(x, y)) {
          databus.currentPlayerRoad = this.id;
        }
      }
    }).bind(this));
  }

  update(ctx) {
    if(databus.gameplayPaused) {
      return;
    }

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
