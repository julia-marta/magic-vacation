import Scene2DSeaCalf from "./2d/scene-2d-sea-calf.js";
import Scene2DCrocodile from "./2d/scene-2d-crocodile.js";
import {RESULT_ANIMATIONS} from "../data/animations.js";

export default class ResultsSwitchHandler {
  constructor() {
    this.timer = null;
    this.resultScenes = {
      result: (options) => new Scene2DSeaCalf(options),
      result3: (options) => new Scene2DCrocodile(options)
    };
    this.resultScreens = document.querySelectorAll(`.screen--result`);
    this.showResultButtons = document.querySelectorAll(`.js-show-result`);
    this.restartButton = document.querySelector(`.js-play`);
    this.hideResults = this.hideResults.bind(this);
    this.showResultScreen = this.showResultScreen.bind(this);
    this.setTimer = this.setTimer.bind(this);
    this.init();
  }

  init() {
    this._initResultButtonsListeners();
    this._initRestartButtonListener();
  }

  _initResultButtonsListeners() {
    if (this.showResultButtons.length) {
      for (let i = 0; i < this.showResultButtons.length; i++) {
        this.showResultButtons[i].addEventListener(`click`, () => {
          let target = this.showResultButtons[i].getAttribute(`data-target`);
          this.hideResults();
          this.showResultScreen(target);
        });
      }
    }
  }

  _initRestartButtonListener() {
    if (this.restartButton) {
      this.restartButton.addEventListener(`click`, () => {
        this.hideResults();
        this.restartGame();
      });
    }
  }

  hideResults() {
    [].slice.call(this.resultScreens).forEach((el) => {
      el.classList.remove(`screen--show`);
      el.classList.remove(`screen--animate`);
      el.classList.add(`screen--hidden`);
    });
  }

  restartGame() {
    document.getElementById(`messages`).innerHTML = ``;
    document.getElementById(`message-field`).focus();
    if (this.timer) {
      this.timer.init();
    }
  }

  showResultScreen(target) {
    let targetEl = [].slice.call(this.resultScreens).filter((el) => {
      return el.getAttribute(`id`) === target;
    });
    const targetScene = this.resultScenes[target];
    const targetSceneOptions = RESULT_ANIMATIONS.filter((animation) => {
      return animation.id === target;
    });
    const targetAnimations = targetEl[0].querySelectorAll(`.animation`);
    const targetAnimationsDelayed =
      targetEl[0].querySelectorAll(`.animation-delay`);
    let delay = 0.099;
    const delayStep = 0.033;

    targetEl[0].classList.add(`screen--show`);
    targetEl[0].classList.remove(`screen--hidden`);

    setTimeout(() => {
      targetEl[0].classList.add(`screen--animate`);
      targetAnimations.forEach((item) => item.beginElement());
      targetAnimationsDelayed.forEach((item) => {
        item.beginElementAt(delay);
        delay += delayStep;
      });
      if (targetScene) {
        targetScene(targetSceneOptions[0]);
      }
    }, 100);
  }

  setTimer(timer) {
    this.timer = timer;
  }
}

