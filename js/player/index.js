import Sprite from '../base/sprite'
import DataBus from '../databus'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const PLAYER_IMG_SRC = 'images/truck.jpeg'
const PLAYER_WIDTH = 32
const PLAYER_HEIGHT = 109

export default class Player extends Sprite {
  constructor() {
    super(PLAYER_IMG_SRC, PLAYER_WIDTH, PLAYER_HEIGHT)

    this.y = screenHeight - this.height - 30

    this.currentRoad = 2;
  }

  setCurrentRoad(road) {
    this.currentRoad = road;

    switch(this.currentRoad) {
      case 1:
        this.x = 82;
        break;
      case 2:
        this.x = 182;
        break;
      case 3:
        this.x = 282;
        break;
    }
  }
}
