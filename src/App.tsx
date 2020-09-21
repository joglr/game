export default class App {
  root: HTMLElement;
  canvasEl: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  ww: number;
  wh: number;

  constructor({ root }: { root: HTMLElement }) {
    this.canvasEl = document.createElement("canvas");
    const ctx = this.canvasEl.getContext("2d");
    if (ctx) this.ctx = ctx;
    else {
      throw new Error("fuck");
    }
    this.root = root;
    [this.ww, this.wh] = getWindowDimensions();
    this.init();
  }

  init() {
    this.root.appendChild(this.canvasEl);
    this.subscribe();
    this.resizeHandler();
  }

  gutterInc = 20;
  x = 0;
  dir = -1;

  fill() {
    let offset = this.x % 3 === 0 ? 1 : 0;
    this.ctx.fillRect(0, 0, this.ww, this.wh);

    let gutterX = 0;
    let gutterY = 0;
    let i = 0;
    while (this.ww / 2 - gutterX > 0 && this.wh / 2 - gutterY > 0) {
      console.log(gutterX, gutterY);
      this.ctx.fillStyle = (i + offset) % 2 === 0 ? "white" : "black";
      this.ctx.fillRect(
        gutterX,
        gutterY,
        this.ww - 2 * gutterX,
        this.wh - 2 * gutterY
      );
      gutterX += this.gutterInc;
      gutterY += this.gutterInc;
      i++;
    }
    this.x++;

    if (this.gutterInc + this.dir <= 0) this.dir = 1;
    else if (this.gutterInc + this.dir > 100) this.dir = -1;

    this.gutterInc += this.dir;

    requestAnimationFrame(() => this.fill());
  }

  subscribe() {
    window.addEventListener("resize", () => this.resizeHandler());
  }

  resizeHandler() {
    [this.ww, this.wh] = getWindowDimensions();
    [this.canvasEl.width, this.canvasEl.height] = [this.ww, this.wh];
    this.fill();
  }
}

function getWindowDimensions(): [number, number] {
  return [window.innerWidth || 0, window.innerHeight || 0];
}
