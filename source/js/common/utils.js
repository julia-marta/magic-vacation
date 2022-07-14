export const getRandomDecimal = (min, max) => {
  return Number((Math.random() * (max - min) + min).toFixed(2));
};
