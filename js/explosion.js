import Animation from './base/animation'

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

const EXPLOSION_FAKE_IMG_SRC = 'images/transparent.png';
const EXPLOSION_WIDTH = 64;
const EXPLOSION_HEIGHT = 48;

export default class Player extends Animation {
  constructor() {
    super(EXPLOSION_FAKE_IMG_SRC, EXPLOSION_WIDTH, EXPLOSION_HEIGHT);

    this.y = screenHeight - this.height - 30;

    this.initExplosionAnimation()
  }

  initExplosionAnimation() {
    let frames = [];

    const EXPLO_IMG_PREFIX  = 'images/explosion';
    const EXPLO_FRAME_COUNT = 19;

    for(let i = 0; i < EXPLO_FRAME_COUNT; i++) {
      frames.push(EXPLO_IMG_PREFIX + (i + 1) + '.png');
    }

    this.initFrames(frames);
  }
}
