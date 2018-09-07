import DataBus from './databus'
import Player from './player/index'
import BackGround from './background/index'
import Road from './road/index'

let ctx = canvas.getContext('2d')
let databus = new DataBus()

export default class Main {
  constructor() {
    this.restart();

    this.bg = new BackGround(ctx)
    this.player = new Player(ctx)
    this.road1 = new Road(ctx, 30);
    this.road2 = new Road(ctx, 130);
    this.road3 = new Road(ctx, 230);

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

    ctx.fillStyle = "#ffffff"
    ctx.font = "20px Arial"

    ctx.fillText(
      "Cool beans buddy",
      50,
      50
    )

    this.player.drawToCanvas(ctx)
  }

  // 游戏逻辑更新主函数
  update() {
    this.collisionDetection()
    this.bg.update()
    this.road1.update()
    this.road2.update()
    this.road3.update()
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
}
