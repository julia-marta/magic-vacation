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
