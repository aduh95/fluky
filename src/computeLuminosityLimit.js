/**
 * @see https://gist.github.com/aduh95/65b9400953f7d5f1cc4903897a2f0496
 */

const COEFFICIENT_DATABASE = [
  {
    min: 0,
    max: 30,
    aGradient: 0.007622554,
    aIntercept: -0.223522909,
    bGradient: -0.006972816,
    bIntercept: 0.159400333,
  },
  {
    min: 30,
    max: 60,
    aGradient: 0.003800316,
    aIntercept: -0.125796416,
    bGradient: -0.002237613,
    bIntercept: 0.044251669,
  },
  {
    min: 60,
    max: 90,
    aGradient: -0.000978743,
    aIntercept: 0.157473997,
    bGradient: 0.000476455,
    bIntercept: -0.115588066,
  },
  {
    min: 90,
    max: 120,
    aGradient: -0.000896412,
    aIntercept: 0.149120725,
    bGradient: 0.000316902,
    bIntercept: -0.100832758,
  },
  {
    min: 120,
    max: 150,
    aGradient: 0.000304561,
    aIntercept: 0.005848966,
    bGradient: -0.000110541,
    bIntercept: -0.049997044,
  },
  {
    min: 150,
    max: 180,
    aGradient: 0.000375923,
    aIntercept: -0.004854929,
    bGradient: -0.000138959,
    bIntercept: -0.029084065,
  },
  {
    min: 180,
    max: 210,
    aGradient: -0.003984596,
    aIntercept: 0.778812054,
    bGradient: 0.002196531,
    bIntercept: -0.452163624,
  },
  {
    min: 210,
    max: 240,
    aGradient: -0.005585318,
    aIntercept: 1.120966131,
    bGradient: 0.006121434,
    bIntercept: -1.240756882,
  },
  {
    min: 240,
    max: 270,
    aGradient: -0.000135415,
    aIntercept: -0.17221474,
    bGradient: 0,
    bIntercept: 0.21,
  },
  {
    min: 270,
    max: 300,
    aGradient: 0.001179809,
    aIntercept: -0.542348823,
    bGradient: 0,
    bIntercept: 0.21,
  },
  {
    min: 300,
    max: 360,
    aGradient: -0.001044457,
    aIntercept: 0.133977501,
    bGradient: 0.001918519,
    bIntercept: -0.43519087,
  },
];
/**
 * Computes the maximum luminosity you can display white text on to meet the
 * WACG contrast ratio requirements.
 * @param {number} hue in unit turn
 * @param {number} saturation between 0 and 1
 * @returns {number} luminosity between 0 and 1
 */
export default function computeLuminosityLimit(hue, saturation) {
  hue = (hue % 1) * 360; // converting hue to degrees
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
