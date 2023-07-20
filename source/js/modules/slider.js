import Swiper from "swiper";
import {ColorThemes, Slider3DPlanes} from "../common/enums";
import {setColorTheme} from "../common/utils";

export default (plane3DView) => {
  let storySlider;
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
            plane3DView.setPlane(Slider3DPlanes[storySlider.activeIndex]);
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
            plane3DView.setPlane(Slider3DPlanes[storySlider.activeIndex]);
            plane3DView.setEffect(Slider3DPlanes[storySlider.activeIndex]);
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

    const isCurrentScreen = window.location.hash === `#story`;
    if (isCurrentScreen) {
      plane3DView.setPlane(Slider3DPlanes[storySlider.activeIndex]);
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
