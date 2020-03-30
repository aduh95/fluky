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
  constructor(height, speedAmplitude, color = generateRandomColor()) {
    this._color = color;
    this._speed = Math.random() * speedAmplitude + 0.125;
    this._seed = Math.random();
    this._offset = (Math.random() * 0xffff) | 0;
    this._positionX = this._offset;
    this._positionY = (1 - this._seed - (this._offset % 3)) * height;
    this._positionZ = Math.random() + 0.3;
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
    ctx.fillRect(
      0,
      0,
      CONFETTI_WIDTH * this._positionZ,
      CONFETTI_HEIGHT * this._positionZ
    );
  }
}

export default class CanvasAnimation {
  constructor(canvas, speedAmplitude, color) {
    this._canvas = canvas;
    this._context = this._canvas.getContext("2d");
    this._skewIndex = 0;
    const density =
      (speedAmplitude * speedAmplitude) / CONFETTI_WIDTH / CONFETTI_HEIGHT;
    const nbOfConfetti = Math.sqrt(
      window.innerWidth * window.innerHeight * density
    );
    this._confetti = Array.from(
      { length: nbOfConfetti },
      () => new Confetto(window.innerHeight, speedAmplitude, color)
    );
    this._draw = this.draw.bind(this);
    requestAnimationFrame(timestamp => {
      this._lastTimestamp = timestamp;
      this.updateCanvasSize();
    });
    addEventListener("resize", this.updateCanvasSize.bind(this), {
      passive: true,
    });
  }

  draw(timestamp = this._lastTimestamp) {
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
