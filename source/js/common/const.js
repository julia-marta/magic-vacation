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

export const TIMER_DURATION_MIN = 5;
