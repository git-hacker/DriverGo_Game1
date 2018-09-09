import DataBus from './databus'

const screenWidth  = window.innerWidth;
const screenHeight = window.innerHeight;

const databus = new DataBus();

export default class Countdown {
  renderCountdown(ctx) {
    let countdownInSeconds = Math.ceil(databus.countdownToStart / 1000.0);

    ctx.fillStyle = "#ffffff";
    ctx.font      = "72px Arial";
    ctx.fillText(
      `${countdownInSeconds}`,
      screenWidth / 2 - 20,
      screenHeight / 2
    );
  }
}

