import throttle from "lodash/throttle";
import PageSwitchHandler from "./page-switch-handler.js";
import Timer from "./timer.js";
import PrizesAnimation from "./prizes-animation.js";
import {Screens, ColorThemes, Slider3DPlanes} from "../common/enums.js";
import {setColorTheme} from "../common/utils.js";
import {PRIZES_ANIMATIONS} from "../common/const.js";

export default class FullPageScroll {
  constructor(plane3DView) {
    this.THROTTLE_TIMEOUT = 1000;
    this.scrollFlag = true;
    this.timeout = null;
    this.pageAnimationSwitcher = new PageSwitchHandler();
    this.prizesAnimation = new PrizesAnimation(PRIZES_ANIMATIONS);
    this.gameTimer = new Timer();
    this.plane3DView = plane3DView;

    this.screenElements = document.querySelectorAll(
        `.screen:not(.screen--result)`
    );
    this.screenBackground = document.querySelector(`.screen__background`);
    this.menuElements = document.querySelectorAll(
        `.page-header__menu .js-menu-link`
    );

    this.activeScreen = 0;
    this.onScrollHandler = this.onScroll.bind(this);
    this.onUrlHashChengedHandler = this.onUrlHashChanged.bind(this);
  }

  init() {
    document.addEventListener(
        `wheel`,
        throttle(this.onScrollHandler, this.THROTTLE_TIMEOUT, {trailing: true})
    );
    window.addEventListener(`popstate`, this.onUrlHashChengedHandler);

    this.onUrlHashChanged();
  }

  onScroll(evt) {
    if (this.scrollFlag) {
      this.reCalculateActiveScreenPosition(evt.deltaY);
      const currentPosition = this.activeScreen;
      if (currentPosition !== this.activeScreen) {
        this.changePageDisplay();
      }
    }
    this.scrollFlag = false;
    if (this.timeout !== null) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      this.timeout = null;
      this.scrollFlag = true;
    }, this.THROTTLE_TIMEOUT);
  }

  onUrlHashChanged() {
    const newIndex = Array.from(this.screenElements).findIndex(
        (screen) => location.hash.slice(1) === screen.id
    );
    const changeScreen = () => {
      this.activeScreen = newIndex < 0 ? 0 : newIndex;
      this.changePageDisplay();
    };

    if (this.activeScreen === Screens.STORY && newIndex === Screens.PRIZES) {
      this.screenBackground.classList.add(`screen__background--active`);
      this.screenBackground.addEventListener(`transitionend`, () => {
        changeScreen();
        this.screenBackground.classList.remove(`screen__background--active`);
      });
      return;
    }
    changeScreen();
  }

  changePageDisplay() {
    this.changeVisibilityDisplay();
    this.changeActiveMenuItem();
    this.pageAnimationSwitcher.runAnimationScheme(
        this.screenElements[this.activeScreen].id
    );
    this.emitChangeDisplayEvent();

    if (this.activeScreen === Screens.TOP) {
      this.plane3DView.setPlane(`top`);
    }

    if (this.activeScreen === Screens.STORY) {
      const slider = this.screenElements[this.activeScreen].children[0].dom7ElementDataStorage.swiper;
      const activeSlide = slider.realIndex;
      this.plane3DView.setPlane(Slider3DPlanes[activeSlide]);
      setColorTheme(ColorThemes, 0);
    } else {
      setColorTheme(ColorThemes, 6);
    }

    if (this.activeScreen === Screens.PRIZES) {
      this.prizesAnimation.init();
    } else {
      this.prizesAnimation.destroy();
    }

    if (this.activeScreen === Screens.GAME) {
      this.gameTimer.init();
    } else {
      this.gameTimer.destroyTimer();
    }
  }

  changeVisibilityDisplay() {
    this.screenElements.forEach((screen) => {
      screen.classList.add(`screen--hidden`);
      screen.classList.remove(`active`);
    });
    this.screenElements[this.activeScreen].classList.remove(`screen--hidden`);
    setTimeout(() => {
      this.screenElements[this.activeScreen].classList.add(`active`);
    }, 100);
  }

  changeActiveMenuItem() {
    const activeItem = Array.from(this.menuElements).find(
        (item) => item.dataset.href === this.screenElements[this.activeScreen].id
    );
    if (activeItem) {
      this.menuElements.forEach((item) => item.classList.remove(`active`));
      activeItem.classList.add(`active`);
    }
  }

  emitChangeDisplayEvent() {
    const event = new CustomEvent(`screenChanged`, {
      detail: {
        screenId: this.activeScreen,
        screenName: this.screenElements[this.activeScreen].id,
        screenElement: this.screenElements[this.activeScreen],
      },
    });

    document.body.dispatchEvent(event);
  }

  reCalculateActiveScreenPosition(delta) {
    if (delta > 0) {
      this.activeScreen = Math.min(
          this.screenElements.length - 1,
          ++this.activeScreen
      );
    } else {
      this.activeScreen = Math.max(0, --this.activeScreen);
    }
  }
}
