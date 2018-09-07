import DataBus from './databus'
import Player from './player/index'

let ctx = canvas.getContext('2d')
let databus = new DataBus()

export default class Main {
  constructor() {
    this.restart()

    this.player = new Player(ctx)

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
    console.log("Col det");
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
