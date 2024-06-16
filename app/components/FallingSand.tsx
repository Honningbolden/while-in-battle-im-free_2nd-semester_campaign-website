"use client";

import HSLAToRGBA from "../utilities/hslaToRGBA";
import { useEffect, useRef, useState } from "react";

type hslaColorObj = {
  h: number;
  s: number;
  l: number;
  a: number;
};

type rgbaColorObj = [number, number, number, number];

export default function FallingSandOverlay() {
  const hasAdjustedCanvasSize = useRef<boolean>(false);
  const RESOLUTION = 5;

  const currentParticleType = useRef(Sand);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  let gridRef = useRef<Grid | null>(null);


  useEffect(() => {
    if (!hasAdjustedCanvasSize.current) {
      const canvas = canvasRef.current;
      if (canvas) {
        const parent = canvas.parentElement;
        if (parent) {
          canvas.width = parent.clientWidth;
          canvas.height = parent.clientHeight;
          hasAdjustedCanvasSize.current = true;
          // Run setup function
          setup();
        }
      }
    }
  }, [])

  const setup = () => {
    const gridWidth = canvasRef.current!.width / RESOLUTION;
    const gridHeight = canvasRef.current!.height / RESOLUTION;

    ctxRef.current = canvasRef.current!.getContext("2d");
    gridRef.current = new Grid(Math.floor(gridWidth), Math.floor(gridHeight), ctxRef.current!, canvasRef.current!, RESOLUTION);


    canvasRef.current!.addEventListener("mousemove", (event) => {
      let rect = canvasRef.current!.getBoundingClientRect();
      let x = Math.floor((event.clientX - rect.left) / RESOLUTION);
      let y = Math.floor((event.clientY - rect.top) / RESOLUTION);
      gridRef.current!.setCircle(
        x,
        y,
        () => new currentParticleType.current,
        2, // radius
        currentParticleType.current.addPropability // propability
      );
    });

    // if (gridRef.current!.needsUpdate()) {} // For later
    draw();
  };

  const draw = () => {
    // ctxRef.current!.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height); // Clear canvas
    // gridRef.current!.update();
    if (gridRef.current!.needsUpdate()) {
      // console.log("needsUpdate");
      gridRef.current!.drawGrid();
    }

    requestAnimationFrame(draw);
  }

  return (
    <div className="absolute top-0 left-0 h-full w-full">
      <canvas className="z-50" ref={canvasRef}></canvas>
    </div>
  )
}














interface ParticleOptions {
  color?: rgbaColorObj;
  empty?: boolean;
}

class Particle {
  color: rgbaColorObj;
  empty: boolean;

  constructor({ color = [0, 0, 0, 0], empty }: ParticleOptions = {}) {
    this.color = color,
      this.empty = empty ?? false;
  }

  update() { }
}

class Sand extends Particle {
  static baseColor: hslaColorObj = { h: 38.4, s: 50.7, l: 60.2, a: 1 };
  static addPropability = 0.5;
  constructor() {
    super({ color: varyColor(Sand.baseColor) });
  }
}

class Empty extends Particle {
  static baseColor = [0, 0, 0, 0];

  constructor() {
    super({ empty: true });
  }
}






class Grid {
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

  clear() { // Clear canvas
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
    console.log("update")
    this.cleared = false;
    this.modifiedIndices.clear() //= new Set();
    for (let i = this.grid.length - this.width - 1; i > 0; i--) {
      this.updatePixel(i);
    }
  }

  needsUpdate() {
    return this.cleared || this.modifiedIndices.size > 0;
  }

  drawGrid() {
    console.log("drawgrid", Date.now())

    if (this.cleared) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // This is for later (Conditional rendering)
      this.cleared = false;
    } else if (this.modifiedIndices.size > 0) {
      this.modifiedIndices.forEach((index) => {
        this.setPixel(index, this.grid[index].color || [0, 0, 0, 0])
      })
    }

    this.modifiedIndices.clear();


    this.grid.forEach((particle, index) => { // Update pixels
      this.setPixel(index, this.grid[index].color!);
    });
  }

  setPixel(i: number, color: rgbaColorObj) {
    const x = i % this.width * this.resolution;
    const y = Math.floor(i / this.width) * this.resolution;
    this.ctx.fillStyle = `rgba(${color![0]}, ${color[1]}, ${color[2]}, ${color[3]})`;
    this.ctx.fillRect(x, y, this.resolution, this.resolution);
  }
}

const varyColor = (color: hslaColorObj): rgbaColorObj => {
  let saturation = color.s + Math.floor(Math.random() * 20) - 20;
  saturation = Math.max(0, Math.min(saturation, 100));
  let lightness = color.l + Math.floor(Math.random() * 20) - 10;
  lightness = Math.max(0, Math.min(lightness, 100));
  return HSLAToRGBA([color.h, saturation, lightness, color.a]);
}

function isRgbaColorObj(color: any): color is rgbaColorObj {
  return Array.isArray(color) && color.length === 4 && color.every(c => typeof c === 'number');
}