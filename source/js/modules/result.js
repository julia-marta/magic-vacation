import Scene2DSeaCalf from "./scene-2d-sea-calf";
import Scene2DCrocodile from "./scene-2d-crocodile";
import {RESULT_ANIMATIONS} from "../data/animations.js";

const resultScenes = {
  result: (options) => new Scene2DSeaCalf(options),
  result3: (options) => new Scene2DCrocodile(options)
};

export default () => {
  let showResultEls = document.querySelectorAll(`.js-show-result`);
  let results = document.querySelectorAll(`.screen--result`);
  if (results.length) {
    for (let i = 0; i < showResultEls.length; i++) {
      showResultEls[i].addEventListener(`click`, function () {
        let target = showResultEls[i].getAttribute(`data-target`);
        [].slice.call(results).forEach(function (el) {
          el.classList.remove(`screen--show`);
          el.classList.remove(`screen--animate`);
          el.classList.add(`screen--hidden`);
        });
        let targetEl = [].slice.call(results).filter(function (el) {
          return el.getAttribute(`id`) === target;
        });
        const targetScene = resultScenes[target];
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
      });
    }

    let playBtn = document.querySelector(`.js-play`);
    if (playBtn) {
      playBtn.addEventListener(`click`, function () {
        [].slice.call(results).forEach(function (el) {
          el.classList.remove(`screen--show`);
          el.classList.remove(`screen--animate`);
          el.classList.add(`screen--hidden`);
        });
        document.getElementById(`messages`).innerHTML = ``;
        document.getElementById(`message-field`).focus();
      });
    }
  }
};
