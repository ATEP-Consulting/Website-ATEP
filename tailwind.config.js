/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fdf2f8",
          100: "#fce7f3",
          200: "#fbcfe8",
          300: "#f9a8d4",
          400: "#f472b6",
          500: "#e11d48",
          600: "#be123c",
          700: "#9f1239",
          800: "#881337",
          900: "#4c0519",
          950: "#23010b",
        },
        neutral: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
        cream: {
          DEFAULT: "#f5f1e8",
          surface: "#ecdfc7",
          surface2: "#e3d4b6",
          panel: "#fdfaf2",
        },
        navy: {
          DEFAULT: "#0b1f3a",
          hover: "#13335c",
          ink: "#0a1626",
          soft: "#1a2a40",
          surface: "#0f1d33",
        },
        accent: {
          DEFAULT: "#9f1239",
          hover: "#7a0d2c",
          light: "#d94661",
          ink: "#4c0519",
        },
        muted: {
          DEFAULT: "#5a6a7e",
          dim: "#8a96a8",
        },
      },
      fontFamily: {
        serif: ['"Newsreader"', '"Source Serif Pro"', 'Georgia', 'serif'],
        sans: ['"IBM Plex Sans"', '-apple-system', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'Menlo', 'monospace'],
      },
      fontSize: {
        'display': ['6.5rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'jumbo': ['5rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'hero': ['4rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '88': '22rem',
        '100': '25rem',
        '104': '26rem',
        '120': '30rem',
      },
      screens: {
        'tm': '820px',
      },
      maxWidth: {
        '8xl': '88rem',
      },
    },
  },
  plugins: [],
};
