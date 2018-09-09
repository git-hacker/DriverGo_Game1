import DataBus from './databus'
import Sprite from './base/sprite'

const COIN_IMG_SRC = 'images/coin.png';
const COIN_WIDTH   = 300 / 4;
const COIN_HEIGHT  = 248 / 4;

const __ = {
  speed: Symbol('speed')
};

let databus = new DataBus()

function rnd(start, end){
  return Math.floor(Math.random() * (end - start) + start)
}

export default class Coin extends Sprite {
  constructor() {
    super(COIN_IMG_SRC, COIN_WIDTH, COIN_HEIGHT)
  }

  init(roadId) {
    switch(roadId) {
      case 1:
        this.x = 60;
        break;
      case 2:
        this.x = 160;
        break;
      case 3:
        this.x = 260;
        break;
    }

    this.y = -this.height;

    this[__.speed] = 4; // should be same speed as the road scroll speed

    this.visible = true;
  }

  update() {
    if(databus.gameplayPaused) {
      return;
    }

    this.y += this[__.speed];

    if(this.y > window.innerHeight + this.height)
      databus.removeCoin(this)
  }
}
