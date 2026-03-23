import computeLuminosityLimit from "./computeLuminosityLimit.js";

function* generateHue(hueAngle = Math.random()) {
  const goldenRatio = (1 + Math.sqrt(5)) / 2;
  while (true) yield (hueAngle += goldenRatio);
}

const hueGenerator = generateHue();

export default function generateRandomColor() {
  const hue = hueGenerator.next().value;

  const sixAngle = 12 * Math.PI * hue;
  const saturation = 0.7 - (Math.cos(sixAngle) + Math.cos(2 * sixAngle) / 3) * 0.15; // 50% to 80%
  const lightness = computeLuminosityLimit(hue, saturation);

  return `hsl(${hue}turn,${saturation * 100}%,${lightness * 100}%)`;
}
