import throttle from "lodash/throttle";
import PageSwitchHandler from "./page-switch-handler.js";
import Timer from "./timer.js";
import PrizesAnimation from "./prizes-animation.js";
import {Screens, ColorThemes, Scenes, SliderScenes} from "../common/enums.js";
import {setColorTheme} from "../common/utils.js";
import {PRIZES_ANIMATIONS} from "../data/animations.js";


export default class FullPageScroll {
  constructor(scene3D) {
    this.THROTTLE_TIMEOUT = 1000;
    this.scrollFlag = true;
    this.timeout = null;
    this.pageAnimationSwitcher = new PageSwitchHandler();
    this.prizesAnimation = new PrizesAnimation(PRIZES_ANIMATIONS);
    this.gameTimer = new Timer();
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
  // меняет отображаемую страницу, рисует нужные 3D сцены и запускает необходимые анимации
  changePageDisplay() {
    // делаем текущий экран видимым
    this.changeVisibilityDisplay();
    // меняем активный пункт меню
    this.changeActiveMenuItem();
    // передаём на body событие смены экрана
    this.emitChangeDisplayEvent();
    // определяем id активного экрана
    const activeScreenId = this.screenElements[this.activeScreen].id;
    // запускаем css анимации в зависимости от id экрана
    this.pageAnimationSwitcher.runAnimationScheme(activeScreenId);
    // добавляем сцену в зависимости от id экрана
    if (this.activeScreen === Screens.TOP) {
      // берём id конкретной сцены, соответствующей данному экрану
      const activeSceneId = Scenes[this.activeScreen];
      // отрисовываем конкретную сцену, соответсвующую данном экрану
      this.scene3D.initScenes(activeScreenId, activeSceneId);

    }

    if (this.activeScreen === Screens.STORY) {
      // берём id конкретной сцены, соответствующей текущему слайду в свайпере
      const slider = this.screenElements[this.activeScreen].children[0].dom7ElementDataStorage.swiper;
      const activeSlide = slider.realIndex;
      const activeSceneId = SliderScenes[activeSlide];
      this.scene3D.initScenes(activeScreenId, activeSceneId);
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

    // тут надо навести порядок

    // потом летят предметы из скважины и чемодан чуть позже
    // с середины где-то появляются даты проведения
    // последним вылетает самолёт
  }

  // меняет видимость экранов (добавляет и убирает соответствующие классы active и screen--hidden)
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

  // меняет активный пункт меню
  changeActiveMenuItem() {
    const activeItem = Array.from(this.menuElements).find(
        (item) => item.dataset.href === this.screenElements[this.activeScreen].id
    );
    if (activeItem) {
      this.menuElements.forEach((item) => item.classList.remove(`active`));
      activeItem.classList.add(`active`);
    }
  }
  // передаёт кастомное событие на body (пока не используется)
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
