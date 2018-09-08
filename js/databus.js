import Pool from './base/pool'

let instance

/**
 * 全局状态管理器
 */
export default class DataBus {
  constructor() {
    if (instance)
      return instance

    instance = this

    this.pool = new Pool();
    this.currentPlayerRoad = 2;
    this.barriers = [];
    this.gameOver = false;

    this.reset()
  }

  reset() {
    this.frame = 0;
    this.score = 0;
    this.currentPlayerRoad = 2;
    this.gameOver = false;
  }

  removeBarrier(barrier) {
    let temp = this.barriers.shift();
    temp.visible = false;
    this.pool.recover('barrier', barrier)
  }
}
