import generateRandomColor from "./generateRandomColor.js";

export default class Item {
  constructor(label) {
    this.color = generateRandomColor();
    this.label = label;
  }
}
