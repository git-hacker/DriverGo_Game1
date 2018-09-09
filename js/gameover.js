const screenWidth  = window.innerWidth
const screenHeight = window.innerHeight

let gameoverBackground = new Image()
gameoverBackground.src = 'images/modal_bg.jpeg'

const GAMEOVER_BG_WIDTH =  350;
const GAMEOVER_BG_HEIGHT = 271;

export default class GameOver {
  renderGameOver(ctx, score) {
    ctx.drawImage(
      gameoverBackground,
      (screenWidth / 2) - (GAMEOVER_BG_WIDTH / 2),
      (screenHeight / 2) - (GAMEOVER_BG_HEIGHT / 2),
      GAMEOVER_BG_WIDTH,
      GAMEOVER_BG_HEIGHT
    );

    ctx.fillStyle = "#000000"
    ctx.font      = "20px Arial"

    ctx.fillText(
      'Score: ' + score,
      screenWidth / 2 - 40,
      screenHeight / 2 - 100 + 115
    )

    ctx.fillStyle = "#ffffff"
    ctx.font      = "20px Arial"

    ctx.fillText(
      'Try Again',
      screenWidth / 2 - 40,
      screenHeight / 2 - 100 + 195
    )

    this.tryAgainButtonArea = {
      startX: screenWidth / 2 - 40,
      startY: screenHeight / 2 - 100 + 180,
      endX  : screenWidth / 2  + 50,
      endY  : screenHeight / 2 - 100 + 255
    }
  }
}

