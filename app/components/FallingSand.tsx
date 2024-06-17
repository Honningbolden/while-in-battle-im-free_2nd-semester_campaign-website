"use client";

import HSLAToRGBA, { hslaColorObj, rgbaColorObj } from "../utilities/hslaToRGBA";
import { useEffect, useRef, useState } from "react";
import { Sand, Bounds } from "../simulation/Particle";

// Import simulation dependencies
import { Grid } from "../simulation/Grid";
import { text } from "stream/consumers";

export const RESOLUTION = 2;
export const RADIUS = 2;

export default function FallingSandOverlay() {
  const hasAdjustedCanvasSize = useRef<boolean>(false);

  const currentParticleType = useRef(Sand);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLImageElement>(null);
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

  const markTextOnGrid = () => {
    // Draw image
    const titleRect = titleRef.current!.getBoundingClientRect();
    console.log(titleRect)
    ctxRef.current!.drawImage(titleRef.current!, titleRect.x, titleRect.y, titleRect.width, titleRect.height);

    // Get image data
    // const imageData = ctxRef.current!.getImageData(titleRect.x, titleRect.y, titleRect.width, titleRect.height);
    const imageData = ctxRef.current!.getImageData(0, 0, canvasRef.current!.width, canvasRef.current!.height);

    const data = imageData.data;

    for (let y = 0; y < canvasRef.current!.height; y += RESOLUTION) {
      for (let x = 0; x < canvasRef.current!.width; x += RESOLUTION) {
        const pixelIndex = (y * canvasRef.current!.width + x) * 4; // RGBA values
        const alpha = imageData.data[pixelIndex + 3];
        // console.log("alpha", alpha)
        if (alpha > 200) {
          const gridX = Math.floor(x / RESOLUTION);
          const gridY = Math.floor(y / RESOLUTION);
          gridRef.current!.set(gridX, gridY, new Bounds())
        }
      }
    }
  }

  const setup = () => {
    const gridWidth = canvasRef.current!.width / RESOLUTION;
    const gridHeight = canvasRef.current!.height / RESOLUTION;

    ctxRef.current = canvasRef.current!.getContext("2d");
    gridRef.current = new Grid(Math.floor(gridWidth), Math.floor(gridHeight), ctxRef.current!, canvasRef.current!, RESOLUTION);

    if (titleRef) markTextOnGrid();

    canvasRef.current!.addEventListener("mousemove", (event) => {
      let rect = canvasRef.current!.getBoundingClientRect();
      let x = Math.floor((event.clientX - rect.left) / RESOLUTION);
      let y = Math.floor((event.clientY - rect.top) / RESOLUTION);
      gridRef.current!.setCircle(
        x,
        y,
        () => new currentParticleType.current,
        RADIUS, // radius
        currentParticleType.current.addPropability
      );
    });

    draw();
  };

  const draw = () => {
    gridRef.current!.update();

    if (gridRef.current!.needsUpdate()) {
      gridRef.current!.drawGrid();
    }

    requestAnimationFrame(draw);
  }

  return (
    <>
      <img ref={titleRef} src="/Title.svg" alt="While IN Battle I'm Free, Never Free To Rest" className="z-50" />
      <div className="absolute top-0 left-0 h-full w-full">
        <canvas className="z-50" ref={canvasRef}></canvas>
      </div>
    </>
  )
}

function isRgbaColorObj(color: any): color is rgbaColorObj {
  return Array.isArray(color) && color.length === 4 && color.every(c => typeof c === 'number');
}