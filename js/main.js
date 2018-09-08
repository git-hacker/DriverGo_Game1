import DataBus from './databus'
import Player from './player/index'
import BackGround from './background/index'
import Road from './road/index'
import Barrier from './barrier/index'

let ctx = canvas.getContext('2d')
let databus = new DataBus()

function rnd(start, end){
  return Math.floor(Math.random() * (end - start) + start)
}

export default class Main {
  constructor() {
    this.restart();

    this.bg = new BackGround(ctx)
    this.player = new Player(ctx, databus.currentPlayerRoad);
    this.road1 = new Road(ctx, 50, 1);
    this.road2 = new Road(ctx, 150, 2);
    this.road3 = new Road(ctx, 250, 3);

    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }

  restart() {
    databus.reset()

    this.bindLoop = this.loop.bind(this)
  }

  collisionDetection() {
  }

  touchEventHandler(e) {
    e.preventDefault()

    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    let area = this.gameinfo.btnArea

    if (x >= area.startX
      && x <= area.endX
      && y >= area.startY
      && y <= area.endY)
      this.restart()
  }

  render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    this.bg.render(ctx)

    this.road1.render(ctx);
    this.road2.render(ctx);
    this.road3.render(ctx);

    databus.barriers
      .forEach((item) => {
        item.drawToCanvas(ctx)
      })

    ctx.fillStyle = "#ffffff"
    ctx.font = "20px Arial"

    ctx.fillText(
      `Current Score: ${2 + 2}`,
      50,
      50
    );

    this.player.drawToCanvas(ctx)
  }

  // 游戏逻辑更新主函数
  update() {
    this.collisionDetection()
    this.bg.update()
    this.road1.update()
    this.road2.update()
    this.road3.update()
    this.player.setCurrentRoad(databus.currentPlayerRoad);

    this.barrierGenerate();

    databus.barriers
      .forEach((item) => {
        item.update()
      })
  }

  // 实现游戏帧循环
  loop() {
    databus.frame++

    this.update()
    this.render()

    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }

  barrierGenerate() {
    if (databus.frame % 50 === 0) {
      let barrier = databus.pool.getItemByClass('barrier', Barrier);
      barrier.init(rnd(1, 4));
      databus.barriers.push(barrier);
    }
  }
}
