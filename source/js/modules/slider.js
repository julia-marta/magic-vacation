import Swiper from "swiper";
import {ColorThemes, SliderScenes} from "../common/enums";
import {setColorTheme} from "../common/utils";

export default (scene3D) => {
  let storySlider;
  const screenName = `story`;
  const setSlider = function () {
    if (window.innerWidth / window.innerHeight < 1 || window.innerWidth < 769) {
      storySlider = new Swiper(`.js-slider`, {
        pagination: {
          el: `.swiper-pagination`,
          type: `bullets`,
        },
        keyboard: {
          enabled: true,
        },
        on: {
          slideChange: () => {
            const sceneName = SliderScenes[storySlider.activeIndex];
            scene3D.initScenes(screenName, sceneName);
          },
          resize: () => {
            storySlider.update();
          },
        },
        observer: true,
        observeParents: true,
      });
    } else {
      storySlider = new Swiper(`.js-slider`, {
        slidesPerView: 2,
        slidesPerGroup: 2,
        pagination: {
          el: `.swiper-pagination`,
          type: `fraction`,
        },
        navigation: {
          nextEl: `.js-control-next`,
          prevEl: `.js-control-prev`,
        },
        keyboard: {
          enabled: true,
        },
        on: {
          slideChange: () => {
            const sceneName = SliderScenes[storySlider.activeIndex];
            scene3D.initScenes(screenName, sceneName);
            setColorTheme(ColorThemes, storySlider.activeIndex);
          },
          resize: () => {
            storySlider.update();

          },
        },
        observer: true,
        observeParents: true,
      });
    }
  };

  window.addEventListener(`resize`, function () {
    if (storySlider) {
      storySlider.destroy();
    }
    setSlider();
  });

  setSlider();
};
