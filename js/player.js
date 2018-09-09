import Sprite from './base/sprite'
import DataBus from './databus'
import Animation from './base/animation'
import Explosion from './explosion'

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

    this.explosion = new Explosion();
  }

  setCurrentRoad(road) {
    this.currentRoad = road;

    switch(this.currentRoad) {
      case 1:
        this.x = 105;
        break;
      case 2:
        this.x = 192;
        break;
      case 3:
        this.x = 280;
        break;
    }
  }

  playExplosionAnimation() {
    this.explosion.x = this.x - (PLAYER_WIDTH * 2.5);
    this.explosion.y = this.y;
    this.explosion.playAnimation();
    this.visible = false;
  }
}
