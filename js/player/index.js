import Sprite from '../base/sprite'
import DataBus from '../databus'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

// 玩家相关常量设置
const PLAYER_IMG_SRC = 'images/truck.jpeg'
const PLAYER_WIDTH = 32
const PLAYER_HEIGHT = 109

let databus = new DataBus()

export default class Player extends Sprite {
  constructor() {
    super(PLAYER_IMG_SRC, PLAYER_WIDTH, PLAYER_HEIGHT)

    // 玩家默认处于屏幕底部居中位置
    this.x = screenWidth / 2 - this.width / 2
    this.y = screenHeight - this.height - 30

    // 用于在手指移动的时候标识手指是否已经在飞机上了
    this.touched = false

    this.currentRoad = 2;
  }

  checkIsFingerOnAir(x, y) {
    const deviation = 30

    return !!(x >= this.x - deviation
      && y >= this.y - deviation
      && x <= this.x + this.width + deviation
      && y <= this.y + this.height + deviation)
  }

  setCurrentRoad(road) {
    this.currentRoad = road;

    switch(this.currentRoad) {
      case 1:
        this.x = 75;
        break;
      case 2:
        this.x = 175;
        break;
      case 3:
        this.x = 275;
        break;
    }
  }
}
