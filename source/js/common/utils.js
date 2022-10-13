export const getRandomDecimal = (min, max) => {
  return Number((Math.random() * (max - min) + min).toFixed(2));
};

export const setColorTheme = (themes, activeIndex) => {
  const themeClasses = Object.values(themes);
  const isBodyWithTheme = themeClasses.some((themeClass) => document.body.classList.contains(themeClass));

  if (isBodyWithTheme) {
    document.body.classList.remove(...themeClasses);
  }

  document.body.classList.add(themes[activeIndex]);
};
