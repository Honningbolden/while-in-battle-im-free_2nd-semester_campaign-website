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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hasAdjustedCanvasSize = useRef<boolean>(false);
  let ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  let gridRef = useRef<Grid | null>(null);
  const RESOLUTION = 10;

  const SAND_COLOR: hslaColorObj = { h: 38.4, s: 50.7, l: 60.2, a: 1 };


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
    gridRef.current = new Grid(Math.floor(gridWidth), Math.floor(gridHeight), ctxRef.current!, RESOLUTION);


    canvasRef.current!.addEventListener("mousemove", (event) => {
      let rect = canvasRef.current!.getBoundingClientRect();
      let x = Math.floor((event.clientX - rect.left) / RESOLUTION);
      let y = Math.floor((event.clientY - rect.top) / RESOLUTION);
      let color: rgbaColorObj = varyColor(SAND_COLOR);
      gridRef.current!.set(x, y, color);
    });

    draw();
  };

  const draw = () => {
    ctxRef.current!.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
    gridRef.current!.update();
    gridRef.current!.drawingGrid();

    requestAnimationFrame(draw);
  }

  return (
    <div className="absolute top-0 left-0 h-full w-full">
      <canvas className="z-50" ref={canvasRef}></canvas>
    </div>
  )
}

class Grid {
  width: number;
  height: number;
  grid: Array<number | rgbaColorObj>;
  ctx: CanvasRenderingContext2D;
  resolution: number;

  constructor(width: number, height: number, ctx: CanvasRenderingContext2D, resolution: number) {
    this.width = width;
    this.height = height;
    this.grid = new Array(width * height).fill(0)
    this.ctx = ctx;
    this.resolution = resolution;
  }

  drawingGrid() {
    this.grid.forEach((color, index) => {
      if (color !== 0 && isRgbaColorObj(color)) this.setPixel(index, color);
    })
  }

  update() {
    for (let i = this.grid.length - this.width - 1; i > 0; i--) {
      this.updatePixel(i);
    }
  }

  updatePixel(i: number) {
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

  clear() { // Clear canvas
    this.grid = new Array(this.width * this.height).fill(0);
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  setPixel(i: number, color: rgbaColorObj) {
    const x = i % this.width * this.resolution;
    const y = Math.floor(i / this.width) * this.resolution;
    this.ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`;
    this.ctx.fillRect(x, y, this.resolution, this.resolution);
  }

  set(x: number, y: number, color: rgbaColorObj) {
    this.grid[y * this.width + x] = color;
  }

  swap(a: number, b: number) {
    const temp = this.grid[a];
    this.grid[a] = this.grid[b];
    this.grid[b] = temp;
  }

  isEmpty(index: number) {
    return this.grid[index] === 0;
  }
}

const varyColor = (color: hslaColorObj) => {
  let saturation = color.s + Math.floor(Math.random() * 20) - 20;
  saturation = Math.max(0, Math.min(saturation, 100));
  let lightness = color.l + Math.floor(Math.random() * 20) - 10;
  lightness = Math.max(0, Math.min(lightness, 100));
  return HSLAToRGBA([color.h, saturation, lightness, color.a]);
}

function isRgbaColorObj(color: any): color is rgbaColorObj {
  return Array.isArray(color) && color.length === 4 && color.every(c => typeof c === 'number');
}