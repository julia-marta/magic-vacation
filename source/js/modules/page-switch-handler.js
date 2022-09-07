import AccentTypographyBuild from "./accent-typography-builder";
import {ACCENT_TYPOGRAPHY_ANIMATIONS} from "../common/const.js";

export default class PageSwitchHandler {
  constructor() {
    const accentTypographyElements = ACCENT_TYPOGRAPHY_ANIMATIONS.reduce(
        (acc, item) => {
          acc[item.name] = new AccentTypographyBuild(
              item.elementClassName,
              item.duration,
              item.minDelay,
              item.maxDelay
          );

          return acc;
        },
        {}
    );

    const {
      introTitle1,
      introTitle2,
      introDate,
      storyTitle,
      prizesTitle,
      rulesTitle,
      gameTitle,
    } = accentTypographyElements;

    this.scriptRunSchema = {
      top: [
        introTitle1.runAnimation.bind(introTitle1),
        introTitle2.runAnimation.bind(introTitle2),
        introDate.runAnimation.bind(introDate),
      ],
      story: [storyTitle.runAnimation.bind(storyTitle)],
      prizes: [prizesTitle.runAnimation.bind(prizesTitle)],
      rules: [rulesTitle.runAnimation.bind(rulesTitle)],
      game: [gameTitle.runAnimation.bind(gameTitle)],
    };

    this.scriptDestroySchema = {
      top: [
        introTitle1.destroyAnimation.bind(introTitle1),
        introTitle2.destroyAnimation.bind(introTitle2),
        introDate.destroyAnimation.bind(introDate),
      ],
      story: [storyTitle.destroyAnimation.bind(storyTitle)],
      prizes: [prizesTitle.destroyAnimation.bind(prizesTitle)],
      rules: [rulesTitle.destroyAnimation.bind(rulesTitle)],
      game: [gameTitle.destroyAnimation.bind(gameTitle)],
    };
  }

  runAnimationScheme(sectionId) {
    this.resetAnimationScheme();

    if (this.scriptRunSchema[sectionId]) {
      [...this.scriptRunSchema[sectionId]].forEach((funct) =>
        setTimeout(() => funct(), 100)
      );
    }
  }

  resetAnimationScheme() {
    for (const destroySchema in this.scriptDestroySchema) {
      if (this.scriptDestroySchema.hasOwnProperty(destroySchema)) {
        this.scriptDestroySchema[destroySchema].forEach((funct) => funct());
      }
    }
  }
}
