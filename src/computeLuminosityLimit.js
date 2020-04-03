/**
 * @see https://gist.github.com/aduh95/65b9400953f7d5f1cc4903897a2f0496
 */

const COEFFICIENT_DATABASE = [
  {
    min: 0,
    max: 60,
    aGradient: 0.00533868,
    aIntercept: -0.06198633,
    bGradient: -0.005494084,
    bIntercept: 0.060984323,
  },
  {
    min: 60,
    max: 120,
    aGradient: -0.000964304,
    aIntercept: 0.156285941,
    bGradient: 0.001229152,
    bIntercept: -0.176667868,
  },
  {
    min: 120,
    max: 180,
    aGradient: 0.000341357,
    aIntercept: 0.000868722,
    bGradient: -0.000441242,
    bIntercept: 0.020208875,
  },
  {
    min: 180,
    max: 240,
    aGradient: -0.004097794,
    aIntercept: 0.753975725,
    bGradient: 0.002574875,
    bIntercept: -0.522826186,
  },
  {
    min: 240,
    max: 300,
    aGradient: 0.000632425,
    aIntercept: -0.37230259,
    bGradient: 0.0006,
    bIntercept: -0.05,
  },
  {
    min: 300,
    max: 360,
    aGradient: -0.001,
    aIntercept: 0.31,
    bGradient: 0.001918519,
    bIntercept: -0.62519087,
  },
];

export default function computeLuminosityLimit(hue, saturation) {
  const {
    aGradient,
    aIntercept,
    bGradient,
    bIntercept,
  } = COEFFICIENT_DATABASE.find(({ min, max }) => max >= hue && min <= hue);
  const a = aGradient * hue + aIntercept;
  const b = bGradient * hue + bIntercept;
  const c = 0.34806606292724607;

  return a * saturation * saturation + b * saturation + c;
}
