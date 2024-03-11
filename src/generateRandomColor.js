import computeLuminosityLimit from "./computeLuminosityLimit.js";

function* generateHue(hueAngle = Math.random()) {
  const goldenRatio = (1 + Math.sqrt(5)) / 2;
  while (true) yield (hueAngle += goldenRatio);
}

const hueGenerator = generateHue();

export default function generateRandomColor() {
  const hue = hueGenerator.next().value;

  // Set saturation and lightness to mid-range values for visual appeal
  const saturation = Math.random() * 0.2 + 0.6; // 60% to 80%
  const lightness = computeLuminosityLimit(hue, saturation);

  return `hsl(${hue}turn,${saturation * 100}%,${lightness * 100}%)`;
}
