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

  maxSpeed: number;
  acceleration: number;
  velocity: number;
  modified: boolean;

  constructor() {
    super({ color: varyColor(Sand.baseColor) });
    this.maxSpeed = 8;
    this.acceleration = 0.4;
    this.velocity = 0;
    this.modified = false;
  }

  resetVelocity() {
    this.velocity = 0;
  }

  updateVelocity() {
    let newVelocity = this.velocity + this.acceleration;

    if (Math.abs(newVelocity) > this.maxSpeed) {
      newVelocity = Math.sign(newVelocity) * this.maxSpeed;
    }
    this.velocity = newVelocity;
  }

  update() {
    if ((this.maxSpeed ?? 0) === 0) {
      this.modified = false;
      return;
    }
    this.updateVelocity();
    this.modified = this.velocity !== 0;
  }

  getUpdateCount() {
    const abs = Math.abs(this.velocity);
    const floored = Math.floor(abs);
    const mod = abs - floored;
    return floored + (Math.random() < mod ? 1 : 0);
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
