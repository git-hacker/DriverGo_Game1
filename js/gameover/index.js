const screenWidth  = window.innerWidth
const screenHeight = window.innerHeight

export default class GameOver {
  renderGameScore(ctx, score) {
    ctx.fillStyle = "#ffffff"
    ctx.font      = "20px Arial"

    ctx.fillText(
      score,
      10,
      30
    )
  }

  renderGameOver(ctx, score) {
    ctx.fillStyle = "#ffffff"
    ctx.font      = "20px Arial"

    ctx.fillText(
      'Game Over',
      screenWidth / 2 - 40,
      screenHeight / 2 - 100 + 50
    )

    ctx.fillText(
      'Score: ' + score,
      screenWidth / 2 - 40,
      screenHeight / 2 - 100 + 130
    )
  }
}

