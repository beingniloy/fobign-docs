import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: '#f7f7f4',
          soft: '#fafaf7',
          dark: '#0e0f11',
          surface: '#151517',
          card: '#1b1b1c',
        },
        ink: {
          DEFAULT: '#26251e',
          body: '#5a5852',
          muted: '#807d72',
        },
        primary: {
          DEFAULT: '#f54e00',
          hover: '#d04200',
        },
        hairline: {
          light: '#e6e5e0',
          dark: '#2e2e32',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;

