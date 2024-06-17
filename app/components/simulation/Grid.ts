import { rgbaColorObj } from "@/app/utilities/hslaToRGBA";
import { Empty, Particle, ParticleOptions, IParticle } from "./Particle";

export class Grid {
  width: number;
  height: number;
  grid: Array<Particle | IParticle>;
  rowCount: number;
  modifiedIndices: Set<number>;
  cleared: boolean;
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  resolution: number;

  constructor(width: number, height: number, ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, resolution: number) {
    this.width = width;
    this.height = height;
    this.grid = new Array(this.width * this.height).fill(0).map(() => new Empty());
    this.rowCount = Math.floor(this.grid.length / this.width);
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

  setIndex(i: number, particle: IParticle | Particle) {
    if (this.isEmpty(i)) {
      this.grid[i] = particle;
      this.modifiedIndices.add(i);
    }
  }

  set(x: number, y: number, particle: IParticle | Particle) {
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

  setCircle(x: number, y: number, createParticle: () => IParticle, radius: number = 2, propability: number = 1.0) {
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
    const column = i % this.width;

    if (this.isEmpty(below)) {
      this.swap(i, below);
      return below;
      // Check to make sure belowLeft didn't wrap to the next line
    } else if (this.isEmpty(belowLeft) && belowLeft % this.width < column) {
      this.swap(i, belowLeft);
      return belowLeft;
      // Check to make sure belowRight didn't wrap to the next line
    } else if (this.isEmpty(belowRight) && belowRight % this.width > column) {
      this.swap(i, belowRight);
      return belowRight;
    }
    return i;
  }

  // update() {
  //   this.cleared = false;
  //   this.modifiedIndices = new Set();

  //   for (let row = this.height - 1; row >= 0; row--) {
  //     const rowOffset = row * this.width;
  //     const leftToRight = Math.random() > 0.5;
  //     for (let i = 0; i < this.width; i++) {
  //       const columnOffset = leftToRight ? i : -i - 1 + this.width;
  //       this.updatePixel(rowOffset + columnOffset);
  //     }
  //   }
  // }

  update() {
    this.cleared = false;
    this.modifiedIndices = new Set();

    for (let row = this.rowCount - 1; row >= 0; row--) {
      const rowOffset = row * this.width;
      const leftToRight = Math.random() > 0.5;
      for (let i = 0; i < this.width; i++) {
        const columnOffset = leftToRight ? i : -i - 1 + this.width;
        let index = rowOffset + columnOffset;
        // If it's empty, just skip this logic
        if (this.isEmpty(index)) {
          continue;
        }
        const particle = this.grid[index];

        particle.update();

        // If the particle will be modified, mark it as such.
        // This is needed as fractional (probabilistic) movement
        // will not otherwise be tracked.
        if (!particle.modified) {
          // If it wasn't modified, just continue in the loop
          continue;
        }

        if ('getUpdateCount' in particle) {
          // Update the number of tims the particle isntruct us to
          for (let v = 0; v < particle.getUpdateCount(); v++) {
            const newIndex: number = this.updatePixel(index) as number;
  
            // If we swapped the particle to a new location,
            // we need to update our index to be that new one.
            // As we are repeatedly updating the same particle.
            if (newIndex !== index) {
              // We can add the same index multiple times, it's a set.
              this.modifiedIndices.add(index);
              this.modifiedIndices.add(newIndex);
              index = newIndex;
            } else {
              particle.resetVelocity();
              break;
            }
          }
        }
      }
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
      this.setPixel(index, this.grid[index]);
    });

    this.modifiedIndices.clear();
  }

  setPixel(i: number, particle: ParticleOptions) {
    const x = (i % this.width) * this.resolution;
    const y = Math.floor(i / this.width) * this.resolution;

    if (!particle.empty && particle.color) {
      this.ctx.fillStyle = `rgba(${particle.color[0]}, ${particle.color[1]}, ${particle.color[2]}, ${particle.color[3]})`;
      this.ctx.fillRect(x, y, this.resolution, this.resolution);
    } else {
      this.ctx.clearRect(x, y, this.resolution, this.resolution);
    }
  }
}
