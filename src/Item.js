const goldenRatio = (1 + Math.sqrt(5)) / 2;
let randomColorHue = Math.random();

function generateRandomColor() {
  const saturation = Math.random() * 0.3 + 0.4;
  const luminosity = Math.random() * 0.4 + 0.2;
  randomColorHue += goldenRatio;
  return `hsl(${randomColorHue}turn,${saturation * 100}%,${luminosity * 100}%)`;
}

export default class Item {
  constructor(label) {
    this._color = generateRandomColor();
    this.label = label;
  }

  get color() {
    return this._color;
  }
}
