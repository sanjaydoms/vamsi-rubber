import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: "#101E3C", // Deep Navy Slate
        obsidian: "#0A1128", // Rich Deep Midnight Navy Blue Base
        "warm-white": "#F8FAFC", // Crisp Studio Ice White
        "industrial-orange": "#E52E2E", // Precision Racing Red Accent
        "racing-red": "#E52E2E", // Signature Racing Red
        "navy-blue": "#0B1736", // Deep Corporate Navy
        "royal-blue": "#1E40AF", // Royal Technical Blue
        "electric-blue": "#2563EB", // Electric Accent Blue
        "neutral-grey": "#94A3B8", // Cool Slate Grey
        "dark-card": "#0E1B3A", // Elevated Navy Card
      },
      fontFamily: {
        heading: ["var(--font-space-grotesk)", "var(--font-heading)", "sans-serif"],
        body: ["var(--font-space-grotesk)", "var(--font-body)", "sans-serif"],
      },
      letterSpacing: {
        editorial: "-0.03em",
        technical: "0.14em",
      },
    },
  },
  plugins: [],
};

export default config;
