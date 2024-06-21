"use client";

import HSLAToRGBA, { hslaColorObj, rgbaColorObj } from "../utilities/hslaToRGBA";
import { useEffect, useRef, useState } from "react";
import { Sand, Bounds } from "@/app/components/simulation/Particle";

// Import simulation dependencies
import { Grid } from "@/app/components/simulation/Grid";
import { text } from "stream/consumers";

export const RESOLUTION = 2;
export const RADIUS = 8;

export default function FallingSandOverlay() {
  const hasAdjustedCanvasSize = useRef<boolean>(false);
  let dpr = useRef<number>(1);

  const currentParticleType = useRef(Sand);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLImageElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  let ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  let gridRef = useRef<Grid | null>(null);


  useEffect(() => {
    if (!hasAdjustedCanvasSize.current) {
      const canvas = canvasRef.current;
      if (canvas) {
        const parent = canvas.parentElement;
        if (parent) {
          dpr.current = window.devicePixelRatio || 1;

          canvas.width = parent.clientWidth * dpr.current;
          canvas.height = parent.clientHeight * dpr.current;

          ctxRef.current = canvasRef.current!.getContext("2d");
          if (ctxRef.current) {
            ctxRef.current.scale(dpr.current, dpr.current);
          }

          // Adjust CSS Size to maintain layout size
          canvas.style.width = `${parent.clientWidth}px`;
          canvas.style.height = `${parent.clientHeight}px`;

          // Mark canvas adjustment and run setup function
          hasAdjustedCanvasSize.current = true;
          setup();
        }
      }
    }
  }, [])

  const markTextOnGrid = () => {
    // Draw image
    const titleRect = titleRef.current!.getBoundingClientRect();
    ctxRef.current!.drawImage(titleRef.current!, titleRect.x, titleRect.y + window.scrollY, titleRect.width, titleRect.height);

    // Get image data
    const imageData = ctxRef.current!.getImageData(0, 0, canvasRef.current!.width, canvasRef.current!.height);
    const data = imageData.data;

    for (let y = 0; y < canvasRef.current!.height; y += (RESOLUTION * dpr.current)) {
      for (let x = 0; x < canvasRef.current!.width; x += (RESOLUTION * dpr.current)) {
        // const pixelIndex = (y * canvasRef.current!.width + x) * 4; // RGBA values
        // const alpha = imageData.data[pixelIndex + 3];

        let alphaSum = 0;
        let count = 0;

        const startX = x;
        const endX = x + RESOLUTION * dpr.current;
        const startY = y;
        const endY = y + RESOLUTION * dpr.current;

        for (let areaY = startY; areaY < endY; areaY++) {
          for (let areaX = startX; areaX < endX; areaX++) {
            const pixelIndex = (areaY * canvasRef.current!.width + areaX) * 4;
            let alpha = imageData.data[pixelIndex + 3];
            alphaSum += alpha > 200 ? alpha : 0;
            count++;
          }
        }

        const averageAlpha = alphaSum / count;

        if (averageAlpha > 200) {
          const gridX = Math.round(x / (RESOLUTION * dpr.current));
          const gridY = Math.round(y / (RESOLUTION * dpr.current));
          gridRef.current!.set(gridX, gridY, new Bounds())
        }
      }
    }
  }

  const setup = () => {
    const gridWidth = canvasRef.current!.width / (RESOLUTION * dpr.current);
    const gridHeight = canvasRef.current!.height / (RESOLUTION * dpr.current);

    gridRef.current = new Grid(Math.round(gridWidth), Math.round(gridHeight), ctxRef.current!, canvasRef.current!, RESOLUTION);

    if (titleRef) markTextOnGrid();

    const handleMouseMove = (event: MouseEvent) => {
      if (!canvasRef.current) return;

      let rect = canvasRef.current!.getBoundingClientRect();
      if (event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom) {
        let x = Math.round((event.clientX - rect.left) / (RESOLUTION));
        let y = Math.round((event.clientY - rect.top) / (RESOLUTION));
        gridRef.current!.setCircle(
          x,
          y,
          () => new currentParticleType.current,
          RADIUS,
          currentParticleType.current.addPropability
        );
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

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
      <div className="absolute top-0 left-0 h-full w-full z-50">
        <canvas className="z-50" ref={canvasRef}></canvas>
      </div>
      <div className="z-50 flex justify-center shrink max-h-full ~xs/xl:~px-4/16">
        <img ref={titleRef} src="/Title_ALT.svg" alt="While In Battle I'm Free, Never Free To Rest" className="~md/lg:~py-32/16" />
      </div>
    </>
  )
}

function isRgbaColorObj(color: any): color is rgbaColorObj {
  return Array.isArray(color) && color.length === 4 && color.every(c => typeof c === 'number');
}