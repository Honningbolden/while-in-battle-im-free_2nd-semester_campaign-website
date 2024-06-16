type rgbaColorObj = [number, number, number, number];


export default function HSLToRGB(hsla: number[]): rgbaColorObj {
  const hue = hsla[0];
  const saturation = hsla[1] / 100;
  const lightness = hsla[2] / 100;
  const alpha = hsla[3];

  let c = (1 - Math.abs(2 * lightness - 1)) * saturation,
    x = c * (1 - Math.abs(((hue / 60) % 2) - 1)),
    m = lightness - c/2,
    r = 0,
    g = 0,
    b = 0;

    if (0 <= hue && hue < 60) {
      r = c; g = x; b = 0;  
    } else if (60 <= hue && hue < 120) {
      r = x; g = c; b = 0;
    } else if (120 <= hue && hue < 180) {
      r = 0; g = c; b = x;
    } else if (180 <= hue && hue < 240) {
      r = 0; g = x; b = c;
    } else if (240 <= hue && hue < 300) {
      r = x; g = 0; b = c;
    } else if (300 <= hue && hue < 360) {
      r = c; g = 0; b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);
  
    return [r,g,b,alpha];
}
