import { rgbaColorObj } from "../utilities/hslaToRGBA";
import { Empty, Particle } from "./Particle";

interface ParticleOptions {
  color?: rgbaColorObj;
  empty?: boolean;
}

export class Grid {
  width: number;
  height: number;
  grid: Array<ParticleOptions>;
  modifiedIndices: Set<number>;
  cleared: boolean;
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  resolution: number;

  constructor(width: number, height: number, ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, resolution: number) {
    this.width = width;
    this.height = height;
    this.grid = new Array(this.width * this.height).fill(0).map(() => new Empty());
    this.modifiedIndices = new Set<number>();
    this.cleared = false;
    this.ctx = ctx;
    this.canvas = canvas;
    this.resolution = resolution;
  }

  clear() {
    this.cleared = true;
    this.grid = new Array(this.width * this.height).fill(0).map(() => new Empty());
  }

  index(x: number, y: number) {
    return y * this.width + x;
  }

  setIndex(i: number, particle: ParticleOptions) {
    this.grid[i] = particle;
    this.modifiedIndices.add(i);
  }

  set(x: number, y: number, particle: Particle) {
    const index = this.index(x, y);
    this.setIndex(index, particle);
  }

  swap(a: number, b: number) {
    if (this.grid[a].empty && this.grid[b].empty) return;

    const temp = this.grid[a];
    this.grid[a] = this.grid[b];
    this.grid[b] = temp;

    this.modifiedIndices.add(a);
    this.modifiedIndices.add(b);
  }

  isEmpty(index: number) {
    // For now, if out of bounds, return "not empty"
    return this.grid[index]?.empty ?? false;
  }

  setCircle(x: number, y: number, createParticle: () => Particle, radius: number = 2, propability: number = 1.0) {
    let radiusSq = radius ** 2;
    for (let y1 = -radius; y1 <= radius; y1++) {
      for (let x1 = -radius; x1 <= radius; x1++) {
        if (x1 ** 2 + y1 ** 2 <= radiusSq && Math.random() < propability) {
          this.set(x + x1, y + y1, createParticle());
        }
      }
    }
  }

  updatePixel(i: number) {
    if (this.isEmpty(i)) return;

    const below = i + this.width;
    const belowLeft = below - 1;
    const belowRight = below + 1;

    if (this.isEmpty(below)) {
      this.swap(i, below);
    } else if (this.isEmpty(belowLeft)) {
      this.swap(i, belowLeft);
    } else if (this.isEmpty(belowRight)) {
      this.swap(i, belowRight);
    }
  }

  update() {
    this.cleared = false;
    this.modifiedIndices = new Set();
    for (let i = this.grid.length - this.width - 1; i > 0; i--) {
      this.updatePixel(i);
    }
  }

  needsUpdate() {
    return this.cleared || this.modifiedIndices.size > 0;
  }

  drawGrid() {
    if (this.cleared) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.cleared = false;
    }

    this.modifiedIndices.forEach((index) => {
      this.setPixel(index, this.grid[index])
    })


    this.modifiedIndices.clear();
  }

  setPixel(i: number, particle: ParticleOptions) {
    const x = i % this.width * this.resolution;
    const y = Math.floor(i / this.width) * this.resolution;

    if (!particle.empty && particle.color) {
      this.ctx.fillStyle = `rgba(${particle.color[0]}, ${particle.color[1]}, ${particle.color[2]}, ${particle.color[3]})`;
      this.ctx.fillRect(x, y, this.resolution, this.resolution);
    } else {
      this.ctx.clearRect(x, y, this.resolution, this.resolution);
    }
  }
}