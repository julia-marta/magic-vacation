import throttle from "lodash/throttle";
import PageSwitchHandler from "./page-switch-handler.js";
import ResultsSwitchHandler from "./results-switch-handler.js";
import Chat from "./chat.js";
import TimerAnimation from "./2d/animations/timer-animation.js";
import PrizesAnimation from "./2d/animations/prizes-animation.js";
import SonyaAnimation from "./2d/animations/sonya-animation.js";
import {Screens, ColorThemes, Scenes, SliderScenes} from "../common/enums.js";
import {setColorTheme} from "../common/utils.js";
import {PRIZES_ANIMATIONS, SonyaAnimations} from "../data/animations.js";


export default class FullPageScroll {
  constructor(scene3D) {
    this.THROTTLE_TIMEOUT = 1000;
    this.scrollFlag = true;
    this.timeout = null;
    this.pageAnimationSwitcher = new PageSwitchHandler();
    this.prizesAnimation = new PrizesAnimation(PRIZES_ANIMATIONS);
    this.sonyaAnimation = new SonyaAnimation(SonyaAnimations);
    this.gameResultsSwitcher = new ResultsSwitchHandler();
    this.chat = new Chat(this.gameResultsSwitcher);
    this.gameTimer = new TimerAnimation(this.gameResultsSwitcher);
    this.scene3D = scene3D;

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
    this.gameResultsSwitcher.hideResults();

    const onSceneLoaded = () => {
      this.changeVisibilityDisplay();
      this.changeActiveMenuItem();
      this.pageAnimationSwitcher.runAnimationScheme(activeScreenId);
      this.emitChangeDisplayEvent();
      this.scene3D.finishPreloader();
      document.body.classList.add(`loaded`);
    };

    const activeScreenId = this.screenElements[this.activeScreen].id;

    // main page
    if (this.activeScreen === Screens.TOP) {
      const activeSceneId = Scenes[this.activeScreen];
      this.scene3D.initScenes(activeScreenId, activeSceneId, onSceneLoaded);
    }
    // story
    if (this.activeScreen === Screens.STORY) {
      const slider = this.screenElements[this.activeScreen].children[0].dom7ElementDataStorage.swiper;
      const scene3D = this.scene3D;
      const activeSlide = slider.realIndex;
      const activeSceneId = SliderScenes[activeSlide];
      this.scene3D.initScenes(activeScreenId, activeSceneId, onSceneLoaded);
      setColorTheme(ColorThemes, 0);

      slider.on(`slideChange`, function () {
        scene3D.initScenes(activeScreenId, SliderScenes[slider.realIndex], onSceneLoaded);
        setColorTheme(ColorThemes, slider.realIndex);
      });

    } else {
      setColorTheme(ColorThemes, 6);
    }
    // prizes
    if (this.activeScreen === Screens.PRIZES) {
      onSceneLoaded();
      this.prizesAnimation.init();
    } else {
      this.prizesAnimation.destroy();
    }
    // rules
    if (this.activeScreen === Screens.RULES) {
      onSceneLoaded();
    }
    // game
    if (this.activeScreen === Screens.GAME) {
      onSceneLoaded();
      this.gameTimer.init();
      this.sonyaAnimation.start();
    } else {
      this.gameTimer.destroyTimer();
      this.sonyaAnimation.finish();
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
