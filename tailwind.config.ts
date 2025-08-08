import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx,js,jsx,mdx}',
    './lib/**/*.{ts,tsx,js,jsx}',
    './content/**/*.json'
  ],
  theme: {
    extend: {
      colors: {
        brand: '#5eead4', // AI Visions teal glow — change if you want
      },
      typography: ({ theme }) => ({
        invert: {
          css: {
            '--tw-prose-body': theme('colors.zinc[300]'),
            '--tw-prose-headings': theme('colors.zinc[100]'),
            '--tw-prose-links': theme('colors.zinc[50]'),
            '--tw-prose-bold': theme('colors.zinc[100]'),
            '--tw-prose-quotes': theme('colors.zinc[200]'),
            '--tw-prose-quote-borders': theme('colors.zinc[700]'),
            '--tw-prose-captions': theme('colors.zinc[400]'),
            '--tw-prose-code': theme('colors.zinc[100]'),
            '--tw-prose-pre-code': theme('colors.zinc[200]'),
            '--tw-prose-pre-bg': theme('colors.zinc[900]'),
          }
        }
      })
    },
  },
  plugins: [typography],
}

export default config

