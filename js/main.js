import DataBus from './databus'
import Player from './player/index'
import BackGround from './background/index'
import Road from './road/index'
import Barrier from './barrier/index'
import GameOver from './gameover/index'
import Countdown from './countdown/index'
import Music from './music'

let ctx = canvas.getContext('2d');
let databus = new DataBus();

function rnd(start, end){
  return Math.floor(Math.random() * (end - start) + start)
}

export default class Main {
  constructor() {
    this.restart();

    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }

  restart() {
    databus.reset();

    canvas.removeEventListener(
      'touchstart',
      this.touchHandler
    );

    this.music = new Music();

    this.bg = new BackGround(ctx);
    this.player = new Player(ctx, databus.currentPlayerRoad);
    this.road1 = new Road(ctx, 50, 1);
    this.road2 = new Road(ctx, 150, 2);
    this.road3 = new Road(ctx, 250, 3);

    this.gameOverScreen = new GameOver();
    this.countdownScreen = new Countdown();

    this.bindLoop     = this.loop.bind(this)
    this.hasEventBind = false;

    this.music.playCountdown();
  }

  touchEventHandler(e) {
    e.preventDefault();

    const x = e.touches[0].clientX;
    const y = e.touches[0].clientY;

    const area = this.gameOverScreen.tryAgainButtonArea;

    if(  x >= area.startX
      && x <= area.endX
      && y >= area.startY
      && y <= area.endY) {
      this.restart();
    }
  }

  collisionDetection() {
    for(let i = 0; i < databus.barriers.length; i++) {
      let barrier = databus.barriers[i];

      if(this.player.isCollideWith(barrier)) {
        databus.gameOver = true;
        databus.gameplayPaused = true;

        break;
      }
    }
  }

  render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.bg.render(ctx);

    this.road1.render(ctx);
    this.road2.render(ctx);
    this.road3.render(ctx);

    databus.barriers
      .forEach((item) => {
        item.drawToCanvas(ctx)
      })

    ctx.fillStyle = "#ffffff"
    ctx.font = "20px Arial"

    ctx.fillText(`Current Score: ${databus.score}`, 50, 50);

    this.player.drawToCanvas(ctx)

    if(databus.gameOver) {
      this.gameOverScreen.renderGameOver(ctx, databus.score);
      if (!this.hasEventBind) {
        this.hasEventBind = true;
        this.touchHandler = this.touchEventHandler.bind(this);
        canvas.addEventListener('touchstart', this.touchHandler);
      }
    }

    if(databus.countdownToStart > 0) {
      this.countdownScreen.renderCountdown(ctx);
    }
  }

  update() {
    this.player.setCurrentRoad(databus.currentPlayerRoad);

    if(!databus.gameplayPaused) {
      this.collisionDetection();
      this.bg.update();
      this.road1.update();
      this.road2.update();
      this.road3.update();
      this.barrierGenerate();

      databus.barriers
        .forEach((item) => {
          item.update();
        });


      this.updateScore();
    }
  }

  updateScore() {
    if(databus.gameOver) {
      return;
    }

    if(databus.frame % 15 === 0) {
      databus.score += 1;
    }
  }

  loop() {
    databus.frame++;

    this.update();
    this.render();

    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    );
  }

  barrierGenerate() {
    if (databus.frame % 50 === 0) {
      let barrier = databus.pool.getItemByClass('barrier', Barrier);
      barrier.init(rnd(1, 4));
      databus.barriers.push(barrier);
    }
  }
}
