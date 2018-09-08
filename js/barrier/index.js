import DataBus from '../databus'
import Sprite from '../base/sprite'

const ENEMY_IMG_SRC = 'images/barrier.png';
const ENEMY_WIDTH   = 60;
const ENEMY_HEIGHT  = 60;

const __ = {
  speed: Symbol('speed')
}

let databus = new DataBus()

function rnd(start, end){
  return Math.floor(Math.random() * (end - start) + start)
}

export default class Enemy extends Sprite {
  constructor() {
    super(ENEMY_IMG_SRC, ENEMY_WIDTH, ENEMY_HEIGHT)
  }

  init(roadId) {
    switch(roadId) {
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

    this.y = -this.height;

    this[__.speed] = 4; // should be same speed as the road scroll speed

    this.visible = true;
  }

  update() {
    this.y += this[__.speed];

    if(this.y > window.innerHeight + this.height)
      databus.removeBarrier(this)
  }
}
