import HSLAToRGBA, { hslaColorObj, rgbaColorObj } from "../utilities/hslaToRGBA";

export interface ParticleOptions {
  color?: rgbaColorObj;
  empty?: boolean;
}

export class Particle {
  color: rgbaColorObj;
  empty: boolean;

  constructor({ color = [0, 0, 0, 0], empty }: ParticleOptions = {}) {
    this.color = color,
      this.empty = empty ?? false;
  }

  update() { }
}

export class Sand extends Particle {
  static baseColor: hslaColorObj = { h: 38.4, s: 50.7, l: 60.2, a: 1 };
  static addPropability = 0.5;
  constructor() {
    super({ color: varyColor(Sand.baseColor) });
  }
}

export class Empty extends Particle {
  static baseColor = [0, 0, 0, 0];

  constructor() {
    super({ empty: true });
  }
}

export const varyColor = (color: hslaColorObj): rgbaColorObj => {
  let saturation = color.s + Math.floor(Math.random() * 20) - 20;
  saturation = Math.max(0, Math.min(saturation, 100));
  let lightness = color.l + Math.floor(Math.random() * 20) - 10;
  lightness = Math.max(0, Math.min(lightness, 100));
  return HSLAToRGBA([color.h, saturation, lightness, color.a]);
}
