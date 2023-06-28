import * as THREE from "three";

export const ACCENT_TYPOGRAPHY_ANIMATIONS = [
  {
    name: `introTitle1`,
    elementClassName: `.slogan--intro1`,
    duration: `0.5s`,
    minDelay: 0,
    maxDelay: 0.3,
  },
  {
    name: `introTitle2`,
    elementClassName: `.slogan--intro2`,
    duration: `0.5s`,
    minDelay: 0.3,
    maxDelay: 0.5,
  },
  {
    name: `introDate`,
    elementClassName: `.intro__date`,
    duration: `0.4s`,
    minDelay: 0.8,
    maxDelay: 1,
  },
  {
    name: `storyTitle`,
    elementClassName: `.slider__item-title`,
    duration: `0.4s`,
    minDelay: 0,
    maxDelay: 0.4,
  },
  {
    name: `prizesTitle`,
    elementClassName: `.prizes__title`,
    duration: `0.4s`,
    minDelay: 0,
    maxDelay: 0.4,
  },
  {
    name: `rulesTitle`,
    elementClassName: `.rules__title`,
    duration: `0.4s`,
    minDelay: 0,
    maxDelay: 0.4,
  },
  {
    name: `gameTitle`,
    elementClassName: `.game__title`,
    duration: `0.4s`,
    minDelay: 0,
    maxDelay: 0.4,
  },
];

export const PRIZES_ANIMATIONS = [
  {
    name: `journeys`,
    startDelay: 0,
    animations: {
      SMIL: `journeysPrizeAnimation`,
      CSS: [
        {
          element: `block`,
          keyframes: [
            {transform: `translateX(33rem)`},
            {transform: `translateX(0)`},
          ],
          options: {
            duration: 767,
            easing: `cubic-bezier(0.33, 0, 0.67, 1)`,
            delay: 3400,
            fill: `both`,
          },
        },
        {
          element: `count`,
          keyframes: [{opacity: 0}, {opacity: 1}],
          options: {
            duration: 67,
            easing: `cubic-bezier(0.33, 0, 0.67, 1)`,
            delay: 2500,
            fill: `both`,
          },
        },
        {
          element: `desc`,
          keyframes: [{opacity: 0}, {opacity: 1}],
          options: {
            duration: 667,
            easing: `cubic-bezier(0.19, 0.05, 0.21, 1)`,
            delay: 2533,
            fill: `both`,
          },
        },
        {
          element: `desc`,
          keyframes: [
            {transform: `translateX(2rem)`},
            {transform: `translateX(0)`},
          ],
          options: {
            duration: 667,
            easing: `cubic-bezier(0.19, 0.24, 0.21, 1)`,
            delay: 2533,
            fill: `both`,
          },
        },
      ],
    },
  },
  {
    name: `cases`,
    startDelay: 3799,
    animations: {
      SMIL: `casesPrizeAnimation`,
      CSS: [
        {
          element: `count`,
          keyframes: [{opacity: 0}, {opacity: 1}],
          options: {
            duration: 67,
            easing: `cubic-bezier(0.33, 0, 0.67, 1)`,
            delay: 1234,
            fill: `both`,
          },
        },
        {
          element: `desc`,
          keyframes: [{opacity: 0}, {opacity: 1}],
          options: {
            duration: 667,
            easing: `cubic-bezier(0.19, 0.05, 0.21, 1)`,
            delay: 1234,
            fill: `both`,
          },
        },
        {
          element: `desc`,
          keyframes: [
            {transform: `translateX(2rem)`},
            {transform: `translateX(0)`},
          ],
          options: {
            duration: 667,
            easing: `cubic-bezier(0.22, 0.27, 0.15, 1)`,
            delay: 1234,
            fill: `both`,
          },
        },
      ],
      frame: {
        startValue: 1,
        endValue: 7,
        duration: 600,
        delay: 1234,
      },
    },
  },
  {
    name: `codes`,
    startDelay: 6200,
    animations: {
      SMIL: `codesPrizeAnimation`,
      CSS: [
        {
          element: `block`,
          keyframes: [
            {transform: `translateX(4rem)`},
            {transform: `translateX(0)`},
          ],
          options: {
            duration: 400,
            easing: `cubic-bezier(0.33, 0, 0.67, 1)`,
            delay: 0,
            fill: `both`,
          },
        },
        {
          element: `count`,
          keyframes: [{opacity: 0}, {opacity: 1}],
          options: {
            duration: 67,
            easing: `cubic-bezier(0.33, 0, 0.67, 1)`,
            delay: 1000,
            fill: `both`,
          },
        },
        {
          element: `desc`,
          keyframes: [{opacity: 0}, {opacity: 1}],
          options: {
            duration: 667,
            easing: `cubic-bezier(0.24, 0.07, 0.15, 1)`,
            delay: 1000,
            fill: `both`,
          },
        },
        {
          element: `desc`,
          keyframes: [
            {transform: `translateX(2rem)`},
            {transform: `translateX(0)`},
          ],
          options: {
            duration: 667,
            easing: `cubic-bezier(0.27, 0.26, 0.18, 1)`,
            delay: 1000,
            fill: `both`,
          },
        },
      ],
      frame: {
        startValue: 11,
        endValue: 900,
        duration: 600,
        delay: 1000,
      },
    },
  },
];

export const RESULT_ANIMATIONS = [
  {
    id: `result`,
    canvas: `sea-calf-scene`,
    imagesUrls: Object.freeze({
      plane: `img/airplane.png`,
      tree: `img/tree.png`,
      tree2: `img/tree-2.png`,
      ice: `img/ice.png`,
      seaCalf: `img/sea-calf-2.png`,
      snowflake: `img/snowflake.png`,
    }),
    objects: Object.freeze({
      plane: {
        imageId: `plane`,
        x: 90,
        y: 50,
        size: 10,
        opacity: 0,
        transforms: {
          translateY: -10,
        },
      },
      tree: {
        imageId: `tree`,
        x: 65,
        y: 62,
        size: 5,
        opacity: 0,
        transforms: {
          translateY: 30,
        },
      },
      tree2: {
        imageId: `tree2`,
        x: 60,
        y: 60,
        size: 5,
        opacity: 0,
        transforms: {
          translateY: 30,
        },
      },
      ice: {
        imageId: `ice`,
        x: 50,
        y: 70,
        size: 50,
        opacity: 0,
        transforms: {
          translateY: 30,
        },
      },
      seaCalf: {
        imageId: `seaCalf`,
        x: 50,
        y: 60,
        size: 50,
        opacity: 0,
        transforms: {
          translateY: 30,
        },
      },
      snowflake: {
        imageId: `snowflake`,
        x: 25,
        y: 55,
        size: 30,
        opacity: 0,
        transforms: {
          rotate: -30,
        },
      },
      snowflake2: {
        imageId: `snowflake`,
        x: 75,
        y: 65,
        size: 15,
        opacity: 0,
        transforms: {
          rotate: 30,
          scaleX: -1,
        },
      },
    }),
    locals: Object.freeze({
      blob: {
        centerX: 45,
        centerY: 55,
        radius: 15,
        endX: 87,
        endY: 53,
        angle: 45,
        deltasLength: 10,
        opacity: 0,
      },
    }),
  },
  {
    id: `result3`,
    canvas: `crocodile-scene`,
    imagesUrls: Object.freeze({
      key: `img/key.png`,
      crocodile: `img/crocodile.png`,
      flamingo: `img/flamingo.png`,
      watermelon: `img/watermelon.png`,
      leaf: `img/leaf.png`,
      snowflake: `img/snowflake.png`,
      saturn: `img/saturn.png`,
    }),
    objects: Object.freeze({
      key: {
        imageId: `key`,
        x: 58,
        y: 57,
        size: 21.5,
        opacity: 0,
        transforms: {
          scaleX: 0.8,
          scaleY: 0.8,
        },
      },

      flamingo: {
        imageId: `flamingo`,
        x: 32,
        y: 49.5,
        size: 19.5,
        opacity: 1,
        transforms: {
          scaleX: 0,
          scaleY: 0,
          translateY: 6,
          translateX: 23,
          rotate: 60,
        },
      },
      watermelon: {
        imageId: `watermelon`,
        x: 5.5,
        y: 69.5,
        size: 17,
        opacity: 1,
        transforms: {
          scaleX: 0,
          scaleY: 0,
          translateY: -14,
          translateX: 50,
          rotate: 60,
        },
      },
      leaf: {
        imageId: `leaf`,
        x: 102.3,
        y: 41.4,
        size: 22,
        opacity: 1,
        transforms: {
          scaleX: 0,
          scaleY: 0,
          translateY: 14,
          translateX: -46,
          rotate: -40,
        },
      },
      snowflake: {
        imageId: `snowflake`,
        x: 81.8,
        y: 59.8,
        size: 14.5,
        opacity: 1,
        transforms: {
          scaleX: 0,
          scaleY: 0,
          translateY: -5,
          translateX: -26,
          rotate: -60,
        },
      },
      saturn: {
        imageId: `saturn`,
        x: 101,
        y: 79.1,
        size: 17.2,
        opacity: 1,
        transforms: {
          scaleX: 0,
          scaleY: 0,
          translateY: -23,
          translateX: -43,
          rotate: 50,
        },
      },
      crocodile: {
        imageId: `crocodile`,
        x: 57,
        y: 63.5,
        size: 93,
        opacity: 1,
        transforms: {
          translateY: -15,
          translateX: 45,
          rotate: 15,
        },
      },
    }),
    locals: Object.freeze({
      drop: {
        centerX: 54.4,
        centerY: 69.7,
        radius: 2.6,
        endX: 54.4,
        endY: 65,
        angle: 55,
        deltasLength: 3,
        opacity: 0,
      },
    }),
  },
];

export const TIMER_DURATION_MIN = 5;

export const PLANES = [
  {
    name: `top`,
    url: `img/scenes-textures/scene-0.png`,
    effects: {},
  },
  {
    name: `story1`,
    url: `img/scenes-textures/scene-1.png`,
    effects: {},
  },
  {
    name: `story2`,
    url: `img/scenes-textures/scene-2.png`,
    effects: {
      hueShift: -0.025,
      blobs: [
        {
          radius: 90,
          position: new THREE.Vector2(
              0.22 * window.innerWidth,
              0.4 * window.innerHeight
          ).multiplyScalar(window.devicePixelRatio),
          glowOffset: 20,
          glowClippingPosition: 20,
        },
        {
          radius: 125,
          position: new THREE.Vector2(
              0.37 * window.innerWidth,
              0.85 * window.innerHeight
          ).multiplyScalar(window.devicePixelRatio),
          glowOffset: 20,
          glowClippingPosition: 30,
        },
        {
          radius: 50,
          position: new THREE.Vector2(
              0.48 * window.innerWidth,
              0.17 * window.innerHeight
          ).multiplyScalar(window.devicePixelRatio),
          glowOffset: 15,
          glowClippingPosition: 1,
        },
      ],
    },
  },
  {
    name: `story3`,
    url: `img/scenes-textures/scene-3.png`,
    effects: {},
  },
  {
    name: `story4`,
    url: `img/scenes-textures/scene-4.png`,
    effects: {},
  },
];
