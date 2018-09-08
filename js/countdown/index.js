import DataBus from '../databus'

const screenWidth  = window.innerWidth;
const screenHeight = window.innerHeight;

const databus = new DataBus();

export default class Countdown {
  renderCountdown(ctx) {
    let countdownInSeconds = Math.ceil(databus.countdownToStart / 1000.0);
    console.log(countdownInSeconds);

    ctx.fillStyle = "#ffffff";
    ctx.font      = "20px Arial";
    ctx.fillText(
      countdownInSeconds,
      10,
      30
    );
  }
}

