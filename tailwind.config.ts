import daisyui from "daisyui";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#00deec",
          secondary: "#0056d9",
          accent: "#00e48c",
          neutral: "#070403",
          "base-100": "#27362c",
          info: "#00f7ff",
          success: "#00c392",
          warning: "#c58000",
          error: "#ba1c2d",
          body: {
            //this way to add a dark theme with different background color
            "background-color": "#546969",
          },
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
export default config;
