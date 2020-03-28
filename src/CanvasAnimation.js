function generateRandomColor() {
  const color = (Math.random() * 0xffffff) | 0;
  return (
    "#" +
    "0".repeat(Math.ceil(6 - Math.log2(color) / 4) - 1) +
    color.toString(16)
  );
}

const CONFETTI_HEIGHT = 10;
const CONFETTI_WIDTH = 5;

class Confetto {
  constructor(height, offsetSpeed) {
    this._color = generateRandomColor();
    this._speed = Math.random() / 8 + offsetSpeed;
    this._seed = Math.random();
    this._offset = (Math.random() * 0xffff) | 0;
    this._positionX = this._offset;
    this._positionY = (1 - this._seed - (this._offset % 3)) * height;
  }

  draw(ctx, skewIndex, { width, height }, deltaT) {
    this._positionY += deltaT * this._speed;
    if (this._positionY < height) return;

    const skew = Math.cos((skewIndex + this._offset) / 100);

    this._positionX +=
      (skew + this._seed - 0.5) * (Math.sin(this._seed * 0xfff) % 1);

    ctx.fillStyle = this._color;
    ctx.setTransform(
      1,
      1 - skew,
      skew,
      1,
      this._positionX % (width + CONFETTI_WIDTH),
      (this._positionY % (height + CONFETTI_HEIGHT)) - CONFETTI_HEIGHT
    );
    ctx.fillRect(0, 0, CONFETTI_WIDTH, CONFETTI_HEIGHT);
  }
}

export default class CanvasAnimation {
  constructor(canvas, density) {
    this._canvas = canvas;
    this._context = this._canvas.getContext("2d");
    addEventListener("resize", this.updateCanvasSize.bind(this), {
      passive: true,
    });
    this._skewIndex = 0;
    const nbOfConfetti = Math.sqrt(
      ((window.innerWidth * window.innerHeight) / 200) * density
    );
    const offsetSpeed = Math.sqrt(density / 4);
    this._confetti = Array.from(
      { length: nbOfConfetti },
      () => new Confetto(window.innerHeight, offsetSpeed)
    );
    this._draw = this.draw.bind(this);
    this._lastTimestamp = 0;
    this.updateCanvasSize();
  }

  draw(timestamp = 0) {
    const { width, height } = this._canvas;
    const ctx = this._context;
    const skewIndex = this._skewIndex++;
    ctx.resetTransform();
    ctx.clearRect(0, 0, width, height);
    this._confetti.forEach(confetto =>
      confetto.draw(
        ctx,
        skewIndex,
        { width, height },
        timestamp - this._lastTimestamp
      )
    );

    this._lastTimestamp = timestamp;
    requestAnimationFrame(this._draw);
  }

  updateCanvasSize() {
    this._canvas.height = document.documentElement.clientHeight;
    this._canvas.width = document.documentElement.clientWidth;
    this.draw();
  }
}
