import {TimeUnits, convertTimeToString} from "../../../common/utils.js";
import {TIMER_DURATION_MIN} from "../../../common/const.js";

const {minute} = TimeUnits;

export default class TimerAnimation {
  constructor() {
    this.timer = null;
    this.fps = 1;
    this.fpsInterval = 1000 / this.fps;
    this.timerElement = document.getElementById(`timer`);
    this.minutesField = this.timerElement.firstChild;
    this.secondsField = this.timerElement.lastChild;
    this.timerDeadline = null;
    this.now = null;
    this.then = null;
    this.elapsed = null;
  }

  init() {
    this.timerDeadline =
      new Date().getTime() + TIMER_DURATION_MIN * minute.includesMS;
    this.then = Date.now();
    this.runTimer();
  }

  _getRemainingTime(deadline) {
    const currentTime = new Date().getTime();
    return deadline - currentTime;
  }

  _setTimerValue() {
    const remainingTime = this._getRemainingTime(this.timerDeadline);
    const minutesValue = convertTimeToString(remainingTime, `minute`);
    const secondsValue = convertTimeToString(remainingTime, `second`);

    if (remainingTime > 0) {
      this.minutesField.textContent = minutesValue;
      this.secondsField.textContent = secondsValue;
    } else {
      this.minutesField.textContent = `00`;
      this.secondsField.textContent = `00`;
    }
  }

  runTimer() {
    this.timer = window.requestAnimationFrame(this.runTimer.bind(this));

    this.now = Date.now();
    this.elapsed = this.now - this.then;

    if (this.elapsed > this.fpsInterval) {
      this.then = this.now - (this.elapsed % this.fpsInterval);
      this._setTimerValue();
    }
  }

  destroyTimer() {
    this.minutesField.textContent = `05`;
    this.secondsField.textContent = `00`;
    window.cancelAnimationFrame(this.timer);
  }
}
