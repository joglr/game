let ww: number;
let wh: number;

export default class App {
  root: HTMLElement;
  canvasEl: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  mx: number;
  my: number;
  ants: Ant[];
  drawables: Drawable[];

  constructor({ root }: { root: HTMLElement }) {
    this.canvasEl = document.createElement("canvas");
    const ctx = this.canvasEl.getContext("2d");
    if (ctx) this.ctx = ctx;
    else {
      throw new Error("fuck");
    }
    this.root = root;
    [ww, wh] = getWindowDimensions();
    this.mx = Math.floor(ww / 2);
    this.my = Math.floor(wh / 2);
    this.ants = [];
    this.drawables = [];
    for (let i = 0; i < 1; i++) {
      const ant = new Ant(Math.floor(ww / 2), Math.floor(wh / 2));
      this.ants.push(ant);
      this.drawables.push(ant);
    }
    this.init();
  }

  init() {
    this.root.appendChild(this.canvasEl);
    this.subscribe();
    this.resizeHandler();
    this.fill();
    this.update(0);
  }
  gutterInc = 20;
  x = 1;
  dir = 1;

  fill() {
    this.ctx.fillStyle = "#00000003";
    this.ctx.fillRect(0, 0, ww, wh);
    this.ctx.fillStyle = "#fff";
  }

  update(t: number) {
    this.fill();

    for (const ant of this.drawables) {
      ant.draw(this.ctx);
    }

    for (const ant of this.ants) {
      ant.move(t);
    }

    const draw = (
      startX: number,
      startY: number,
      len: number,
      angle: number
    ) => {
      this.x += 0.3 * this.dir;
      this.ctx.strokeStyle = "#fff";
      this.ctx.fillStyle = "#fff";
      this.ctx.beginPath();
      this.ctx.save();
      this.ctx.translate(startX, startY);
      this.ctx.rotate((angle * Math.PI) / 180);
      this.ctx.moveTo(0, 0);
      this.ctx.lineTo(0, -len);

      this.ctx.stroke();

      if (len < 10) {
        this.ctx.restore();
        return;
      }

      draw(0, -len, len * 0.8, -15);
      draw(0, -len, len * 0.8, +15);

      this.ctx.restore();
    };
    draw(ww / 2, wh / 2, Math.sqrt(this.x), 0);

    if (this.x > 5000) {
      this.dir = -1;
    }
    if (this.x <= 1) {
      this.dir = 1;
    }
    requestAnimationFrame((t) => this.update(t));
  }

  subscribe() {
    window.addEventListener("resize", () => this.resizeHandler());
    window.addEventListener("mousemove", (e) => this.mouseMoveHandler(e));
  }

  resizeHandler() {
    [ww, wh] = getWindowDimensions();
    [this.canvasEl.width, this.canvasEl.height] = [ww, wh];
  }

  mouseMoveHandler(e: MouseEvent) {
    [this.mx, this.my] = [e.pageX, e.pageY];
  }
}

function getWindowDimensions(): [number, number] {
  return [window.innerWidth || 0, window.innerHeight || 0];
}

class Ant implements Drawable {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "#fff";
    ctx.fillRect(this.x, this.y, 1.5, 1.5);
  }

  move(t: number) {
    // this.x += ;
    // this.y += ;
    this.x =
      ww / 2 +
      Math.cos(t / 1000) *
        (50 + 100 * (Math.cos(t / 1000) + 0.1 * Math.random()));
    this.y =
      wh / 2 +
      Math.sin(t / 1000) *
        (50 + 100 * (Math.sin(t / 1000) + 0.1 * Math.random()));
    // Math.random() * 15;
    // + 0.5
  }
}

interface Drawable {
  draw(ctx: CanvasRenderingContext2D): void;
}
