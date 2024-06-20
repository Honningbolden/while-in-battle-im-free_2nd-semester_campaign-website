"use client";

import HSLAToRGBA, { hslaColorObj, rgbaColorObj } from "../utilities/hslaToRGBA";
import { useEffect, useRef, useState } from "react";
import { Sand, Bounds } from "@/app/components/simulation/Particle";

// Import simulation dependencies
import { Grid } from "@/app/components/simulation/Grid";
import { text } from "stream/consumers";

export const RESOLUTION = 1;
export const RADIUS = 8;

const A3 = { width: 1190, height: 1684 };
const pixelDensity = 4;

export default function FallingSandStyleTile() {
  const hasAdjustedCanvasSize = useRef<boolean>(false);
  let dpr = useRef<number>(1);

  const containerRef = useRef<HTMLDivElement>(null);

  const currentParticleType = useRef(Sand);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLImageElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  let ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  let gridRef = useRef<Grid | null>(null);


  useEffect(() => {
    const canvas = canvasRef.current;
    if (titleRef.current) {
      if (canvas && !hasAdjustedCanvasSize.current) {
        dpr.current = window.devicePixelRatio || 1;


        canvas.width = titleRef.current.naturalWidth * pixelDensity;
        canvas.height = titleRef.current.naturalHeight * pixelDensity;

        ctxRef.current = canvasRef.current!.getContext("2d");
        if (ctxRef.current) {
          ctxRef.current.scale(pixelDensity, pixelDensity); // High PPI
        }

        // Adjust CSS Size to maintain layout size
        // This maintains the aspect ratio and ensures the canvas is fully visible
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.style.objectFit = "contain";
        // canvas.style.maxWidth = `${A3.width}px`;
        // canvas.style.maxHeight = `${A3.height}px`;

        // Mark canvas adjustment and run setup function
        hasAdjustedCanvasSize.current = true;
        setup();

      }
    }
  }, [])

  const markTextOnGrid = () => {
    // Draw image
    const titleRect = titleRef.current!.getBoundingClientRect();

    // ctxRef.current!.drawImage(titleRef.current!, titleRect.x, titleRect.y + window.scrollY, titleRect.width, titleRect.height);
    ctxRef.current!.drawImage(titleRef.current!, 0, 0, canvasRef.current!.width / pixelDensity, canvasRef.current!.height / pixelDensity);

    // Get image data
    const imageData = ctxRef.current!.getImageData(0, 0, canvasRef.current!.width, canvasRef.current!.height);
    const data = imageData.data;

    for (let y = 0; y < canvasRef.current!.height; y += (RESOLUTION * pixelDensity)) {
      for (let x = 0; x < canvasRef.current!.width; x += (RESOLUTION * pixelDensity)) {
        let alphaSum = 0;
        let count = 0;

        const startX = x;
        const endX = x + RESOLUTION * pixelDensity;
        const startY = y;
        const endY = y + RESOLUTION * pixelDensity;

        for (let areaY = startY; areaY < endY; areaY++) {
          for (let areaX = startX; areaX < endX; areaX++) {
            const pixelIndex = (areaY * canvasRef.current!.width + areaX) * 4;
            let alpha = imageData.data[pixelIndex + 3];
            alphaSum += alpha > 200 ? alpha : 0;
            count++;
          }
        }

        const averageAlpha = alphaSum / count;

        const gridX = Math.round(x / (RESOLUTION * pixelDensity));
        const gridY = Math.round(y / (RESOLUTION * pixelDensity));
        if (averageAlpha > 200) {
          gridRef.current!.set(gridX, gridY, new Bounds())
        }
        ctxRef.current!.clearRect(gridX, gridY, RESOLUTION * pixelDensity, RESOLUTION * pixelDensity);
      }
    }
  }

  const setup = () => {
    const gridWidth = canvasRef.current!.width / (RESOLUTION * pixelDensity);
    const gridHeight = canvasRef.current!.height / (RESOLUTION * pixelDensity);

    gridRef.current = new Grid(Math.round(gridWidth), Math.round(gridHeight), ctxRef.current!, canvasRef.current!, RESOLUTION);

    if (titleRef) markTextOnGrid();

    const handleMouseMove = (event: MouseEvent) => {
      if (!titleRef.current) return;

      let rect = titleRef.current.getBoundingClientRect();
      const padding = 80;
      const scaleX = canvasRef.current!.width / (rect.width - padding * 2); // Adjust for CSS scaling
      const scaleY = canvasRef.current!.height / (rect.height - padding * 2); // Adjust for CSS scaling


      if (event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom) {
        let x = Math.round((event.clientX - rect.left - padding) * scaleX / (RESOLUTION * pixelDensity));
        let y = Math.round((event.clientY - rect.top - padding) * scaleY / (RESOLUTION * pixelDensity));
        gridRef.current!.setCircle(
          x,
          y,
          () => new currentParticleType.current,
          RADIUS, // radius
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

  const downloadCanvas = () => {
    if (!canvasRef.current) return;

    // Create temporary canvas
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = canvasRef.current.width;
    tempCanvas.height = canvasRef.current.height;

    console.log(tempCanvas.width, tempCanvas.height);

    // Ensure the context and the original canvas are available
    if (tempCtx && canvasRef.current) {
      tempCtx.drawImage(canvasRef.current, 0, 0, tempCanvas.width, tempCanvas.height);

      const dataUrl = tempCanvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "canvas-image.png";
      link.href = dataUrl;
      containerRef.current!.appendChild(link);
      link.click();
      containerRef.current!.removeChild(link);
    }

  }

  return (
    <>
      <div ref={containerRef} className="z-50 p-20 h-full flex justify-center items-center">
        <canvas className="z-50" ref={canvasRef}></canvas>
        <img ref={titleRef} src="/Visuel_Identitet.svg" alt="While In Battle I'm Free, Never Free To Rest" className="absolute top-0 z-50 h-full p-20" />

        <button onClick={downloadCanvas} className="absolute bottom-10 right-10 z-50 p-2 bg-blue-500 text-white rounded">
          Download Canvas
        </button>
      </div>
    </>
  )
}

function isRgbaColorObj(color: any): color is rgbaColorObj {
  return Array.isArray(color) && color.length === 4 && color.every(c => typeof c === 'number');
}