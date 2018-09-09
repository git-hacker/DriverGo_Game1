import DataBus from './databus'

const screenWidth  = window.innerWidth
const screenHeight = window.innerHeight

let scoreBackground = new Image()
scoreBackground.src = 'images/black_circle.png'

const SCORE_BG_WIDTH =  240;
const SCORE_BG_HEIGHT = 226;

const SCORE_DISPLAY_WIDTH = 75;
const SCORE_DISPLAY_HEIGHT = 75;

const databus = new DataBus();

export default class Score {
  renderGameScore(ctx) {
    ctx.drawImage(
      scoreBackground,
      10,
      10,
      SCORE_DISPLAY_WIDTH,
      SCORE_DISPLAY_HEIGHT
    );

    ctx.fillStyle = "#ffffff";
    ctx.font      = "20px Arial";

    ctx.fillText(databus.score, 38, 54);
  }
}

