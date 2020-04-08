import computeLuminosityLimit from "./computeLuminosityLimit.js";

function* generateHue(hueAngle = Math.random()) {
  const goldenRatio = (1 + Math.sqrt(5)) / 2;
  while (true) yield (hueAngle += goldenRatio);
}

const hueGenerator = generateHue();

export default function generateRandomColor() {
  const hue = hueGenerator.next().value;
  const saturation = Math.random() * 0.7 + 0.3;
  const luminosity = computeLuminosityLimit(hue, saturation);
  return `hsl(${hue}turn,${saturation * 100}%,${luminosity * 100}%)`;
}
