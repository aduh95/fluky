import generateRandomColor from "./generateRandomColor.js";

export default class Item {
  constructor(label) {
    this._color = generateRandomColor();
    this.label = label;
  }

  get color() {
    return this._color;
  }
}
