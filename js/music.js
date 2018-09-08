let instance;

/**
 * 统一的音效管理器
 */
export default class Music {
  constructor() {
    if ( instance )
      return instance;

    instance = this;

    this.bgmAudio      = new Audio()
    this.bgmAudio.loop = true;
    this.bgmAudio.src  = 'audio/background_music.mp3'

    this.countdownAudio      = new Audio()
    this.countdownAudio.src  = 'audio/countdown.mp3'

    this.coinAudio = new Audio();
    this.coinAudio.src = 'audio/coin.wav';

    this.playBgm();
  }

  playBgm() {
    this.bgmAudio.play()
  }

  playCountdown() {
    this.countdownAudio.currentTime = 0;
    this.countdownAudio.play()
  }

  playCoin() {
    this.coinAudio.currentTime = 0;
    this.coinAudio.play();
  }
}
