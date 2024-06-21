import type { Config } from "tailwindcss";
import fluid, { extract, screens } from "fluid-tailwind";

const config: Config = {
  content: {
    files: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
    extract,
  },
  theme: {
    screens: {
      'xs': '20rem',
      'sm': '40rem',
      'md': '48rem',
      'lg': '64rem',
      'xl': '80rem',
      '2xl': '96rem',
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      lineHeight: {
        quart: "0.75",
        half: "0.5",
      },
      backgroundColor: {
        "primary-blue": "#0024cc",
        "primary-black": "#2D2C2A",
        "primary-white": "#FCFCFC",
      },
      textColor: {
        "primary-blue": "#0024cc",
        "primary-black": "#2D2C2A",
        "primary-white": "#FCFCFC",
      },
    },
  },
  plugins: [
    fluid,
    require('@tailwindcss/container-queries'),
  ],
};
export default config;
