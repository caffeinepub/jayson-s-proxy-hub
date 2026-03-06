import typography from "@tailwindcss/typography";
import containerQueries from "@tailwindcss/container-queries";
import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["index.html", "src/**/*.{js,ts,jsx,tsx,html,css}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Courier New"', "Courier", "monospace"],
        sans: ['"JetBrains Mono"', '"Courier New"', "Courier", "monospace"],
      },
      colors: {
        border: "oklch(var(--border))",
        input: "oklch(var(--input))",
        ring: "oklch(var(--ring) / <alpha-value>)",
        background: "oklch(var(--background))",
        foreground: "oklch(var(--foreground))",
        primary: {
          DEFAULT: "oklch(var(--primary) / <alpha-value>)",
          foreground: "oklch(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "oklch(var(--secondary) / <alpha-value>)",
          foreground: "oklch(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "oklch(var(--destructive) / <alpha-value>)",
          foreground: "oklch(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "oklch(var(--muted) / <alpha-value>)",
          foreground: "oklch(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "oklch(var(--accent) / <alpha-value>)",
          foreground: "oklch(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "oklch(var(--popover))",
          foreground: "oklch(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "oklch(var(--card))",
          foreground: "oklch(var(--card-foreground))",
        },
        chart: {
          1: "oklch(var(--chart-1))",
          2: "oklch(var(--chart-2))",
          3: "oklch(var(--chart-3))",
          4: "oklch(var(--chart-4))",
          5: "oklch(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "oklch(var(--sidebar))",
          foreground: "oklch(var(--sidebar-foreground))",
          primary: "oklch(var(--sidebar-primary))",
          "primary-foreground": "oklch(var(--sidebar-primary-foreground))",
          accent: "oklch(var(--sidebar-accent))",
          "accent-foreground": "oklch(var(--sidebar-accent-foreground))",
          border: "oklch(var(--sidebar-border))",
          ring: "oklch(var(--sidebar-ring))",
        },
        // Terminal-specific colors
        "terminal-green": "oklch(85% 0.3 145)",
        "terminal-dim": "oklch(40% 0.15 145)",
        "terminal-bright": "oklch(92% 0.35 145)",
        "terminal-red": "oklch(65% 0.28 25)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgba(0,0,0,0.05)",
        "terminal": "0 0 5px oklch(85% 0.3 145), 0 0 15px oklch(85% 0.3 145 / 0.4)",
        "terminal-lg": "0 0 10px oklch(85% 0.3 145), 0 0 25px oklch(85% 0.3 145 / 0.6), 0 0 40px oklch(85% 0.3 145 / 0.3)",
        "terminal-red": "0 0 5px oklch(65% 0.28 25), 0 0 15px oklch(65% 0.28 25 / 0.4)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        glitch: {
          "0%": { transform: "translate(0)", textShadow: "0 0 8px oklch(85% 0.3 145)" },
          "2%": { transform: "translate(-2px, 0)", textShadow: "-2px 0 oklch(65% 0.28 25), 2px 0 oklch(65% 0.28 200)" },
          "4%": { transform: "translate(2px, 0)", textShadow: "2px 0 oklch(65% 0.28 25), -2px 0 oklch(65% 0.28 200)" },
          "6%": { transform: "translate(0)", textShadow: "0 0 8px oklch(85% 0.3 145)" },
          "100%": { transform: "translate(0)", textShadow: "0 0 8px oklch(85% 0.3 145)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "10%": { transform: "translateX(-8px)" },
          "20%": { transform: "translateX(8px)" },
          "30%": { transform: "translateX(-8px)" },
          "40%": { transform: "translateX(8px)" },
          "50%": { transform: "translateX(-4px)" },
          "60%": { transform: "translateX(4px)" },
          "70%": { transform: "translateX(-4px)" },
          "80%": { transform: "translateX(4px)" },
          "90%": { transform: "translateX(-2px)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 5px oklch(85% 0.3 145), 0 0 10px oklch(85% 0.3 145 / 0.5)" },
          "50%": { boxShadow: "0 0 15px oklch(85% 0.3 145), 0 0 30px oklch(85% 0.3 145 / 0.7), 0 0 50px oklch(85% 0.3 145 / 0.3)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "blink": "blink 1s step-end infinite",
        "glitch": "glitch 4s infinite",
        "shake": "shake 0.5s ease-in-out",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [typography, containerQueries, animate],
};
