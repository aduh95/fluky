import computeLuminosityLimit from "./computeLuminosityLimit.js";

function* generateHue(hueAngle = Math.random()) {
  const goldenRatio = (1 + Math.sqrt(5)) / 2;
  while (true) yield (hueAngle += goldenRatio);
}

const hueGenerator = generateHue();

export default function generateRandomColor() {
  const hue = hueGenerator.next().value;

  // Set saturation and lightness to mid-range values for visual appeal
  const saturation = 60 + Math.floor(Math.random() * 20); // 60% to 80%
  const lightness = 50 + Math.floor(Math.random() * 20); // 50% to 70%

  return `hsl(${hue}turn,${saturation}%,${lightness}%)`;
}
