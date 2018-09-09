import Pool from './base/pool'

let instance;

export default class DataBus {
  constructor() {
    if (instance) {
      return instance;
    }

    instance = this;
  }

  reset() {
    this.frame = 0;
    this.score = 0;
    this.currentPlayerRoad = 2;
    this.gameOver = false;
    this.barriers = [];
    this.coins = [];
    this.pool = new Pool();
    this.animations = [];

    this.gameplayPaused = true;

    this.countdownToStart = 3000;
    this.updateCountdownTimer(3000);
  }

  updateCountdownTimer(newTimeRemaining) {
    this.countdownToStart = newTimeRemaining;

    if(newTimeRemaining <= 0) {
      this.gameplayPaused = false;
    }
    else {
      setTimeout(() => { this.updateCountdownTimer(newTimeRemaining - 1000) }, 1000);
    }
  }

  removeBarrier(barrier) {
    let temp = this.barriers.shift();
    temp.visible = false;
    this.pool.recover('barrier', barrier)
  }

  removeCoin(coin) {
    let temp = this.coins.shift();
    temp.visible = false;
    this.pool.recover('coin', coin);
  }
}
