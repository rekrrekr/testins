import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0a0b0f',
        graphite: '#12141a',
        gunmetal: '#1a1d25',
        electric: {
          teal: '#00f0ff',
          magenta: '#ff1fb8',
        },
      },
      borderRadius: {
        xs: 'var(--radius-xs)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
      },
      keyframes: {
        swoosh: {
          '0%': { transform: 'translateX(-20%)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
      },
      animation: {
        swoosh: 'swoosh 350ms ease-in-out',
      },
    },
  },
  plugins: [],
};

export default config;