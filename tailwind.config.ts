import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50:  '#fdf8ec',
          100: '#f9edcc',
          200: '#f2d98a',
          300: '#e9c14a',
          400: '#d4a832',
          500: '#c8932a',
          600: '#b87e24',
          700: '#9a6420',
          800: '#7d5020',
          900: '#67421e',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'serif'],
      },
    },
  },
  plugins: [],
}
export default config
