export const getRandomDecimal = (min, max) => {
  return Number((Math.random() * (max - min) + min).toFixed(2));
};

export const setColorTheme = (themes, activeIndex) => {
  const themeClasses = Object.values(themes);
  const isBodyWithTheme = themeClasses.some((themeClass) =>
    document.body.classList.contains(themeClass)
  );

  if (isBodyWithTheme) {
    document.body.classList.remove(...themeClasses);
  }

  document.body.classList.add(themes[activeIndex]);
};

export const TimeUnits = {
  minute: {
    includesMS: 60000,
    contained: 60,
  },
  second: {
    includesMS: 1000,
    contained: 60,
  },
};

export const convertTimeToString = (milliseconds, unit) => {
  const count = Math.floor(
      (milliseconds / TimeUnits[unit].includesMS) % TimeUnits[unit].contained
  );
  return (`0` + count).slice(-2);
};

// стандартные изинги
// на вход получают прогресс, возвращают также прогресс, но с учетом временной функции
function easeLinear(x) {
  return x;
}


function easeInCubic(x) {
  return x * x * x;
}


function easeOutCubic(x) {
  return 1 - Math.pow(1 - x, 3);
}


function easeInExpo(x) {
  if (x === 0) {
    return 0;
  } else {
    return Math.pow(2, 10 * x - 10);
  }
}


function easeOutExpo(x) {
  if (x === 1) {
    return 1;
  } else {
    return 1 - Math.pow(2, -10 * x);
  }
}


function easeInElastic(x) {
  const c4 = (2 * Math.PI) / 3;

  if (x === 0) {
    return 0;
  } else if (x === 1) {
    return 1;
  } else {
    return Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4);
  }
}


function easeOutElastic(x) {
  const c4 = (2 * Math.PI) / 3;

  if (x === 0) {
    return 0;
  } else if (x === 1) {
    return 1;
  } else {
    return Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
  }
}


const _ = Object.freeze({
  easeLinear,
  easeInCubic,
  easeOutCubic,
  easeInExpo,
  easeOutExpo,
  easeInElastic,
  easeOutElastic
});


export default _;
