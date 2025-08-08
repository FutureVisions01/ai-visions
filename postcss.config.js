/**
 * PostCSS configuration enabling TailwindCSS and autoprefixer.
 * Tailwind generates utility classes based on the config in
 * `tailwind.config.ts`, while autoprefixer ensures your CSS
 * works across a wide range of browsers.
 */
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};