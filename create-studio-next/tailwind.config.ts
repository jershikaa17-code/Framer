import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#141414',
        accent: '#FF6041',
        white: '#FFFFFF',
        off: '#F2F2F2',
        paper: '#FAFAFA',
        muted: '#D5D7DE',
        'grey-600': '#5C6063',
        'grey-500': '#797D82',
      },
      fontFamily: {
        display: ['var(--font-figtree)', 'sans-serif'],
        mono: ['var(--font-fragment-mono)', 'monospace'],
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'soft-in-out': 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      maxWidth: {
        page: '1600px',
      },
    },
  },
  plugins: [],
}
export default config
