import DataBus from './databus'
import Player from './player/index'
import BackGround from './background/index'
import Road from './road/index'
import Barrier from './barrier/index'
import GameOver from './gameover/index'
import Countdown from './countdown/index'
import Music from './music'
import Coin from './coin'
import Score from './score'

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
    this.scoreDisplay = new Score();

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
    // player with barrier
    for(let i = 0; i < databus.barriers.length; i++) {
      let barrier = databus.barriers[i];

      if(this.player.isCollideWith(barrier)) {
        databus.gameOver = true;
        databus.gameplayPaused = true;

        this.player.playExplosionAnimation();
        this.music.playExplosion();

        break;
      }
    }

    // player with coins
    for(let i = 0; i < databus.coins.length; i++) {
      let coin = databus.coins[i];

      if(this.player.isCollideWith(coin)) {
        databus.score += 25;

        databus.removeCoin(coin);

        this.music.playCoin();
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
      .concat(databus.coins)
      .forEach((item) => {
        item.drawToCanvas(ctx)
      });

    databus.animations.forEach((ani) => {
      if(ani.isPlaying) {
        ani.aniRender(ctx);
      }
    });

    this.scoreDisplay.renderGameScore(ctx);

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
      this.barrierAndCoinGeneration();

      databus.barriers
        .forEach((item) => {
          item.update();
        });

      databus.coins
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

  barrierAndCoinGeneration() {
    if (databus.frame % 25 === 0) {
      const result =  rnd(0, 100) % 3;
      if(result === 0 || result === 1) {
        this.barrierGenerate();
      }
      else {
        this.coinGenerate();
      }
    }
  }

  barrierGenerate() {
    let barrier = databus.pool.getItemByClass('barrier', Barrier);
    barrier.init(rnd(1, 4));
    databus.barriers.push(barrier);
  }

  coinGenerate() {
    let coin = databus.pool.getItemByClass('coin', Coin);
    coin.init(rnd(1, 4));
    databus.coins.push(coin);
  }
}
