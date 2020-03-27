const colorCache = new Set();
function generateRandomColor() {
  let color;
  do {
    color = (Math.random() * 0xffffff) | 0;
  } while (colorCache.has(color));

  colorCache.add(color);
  return "#" + color.toString(16);
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
