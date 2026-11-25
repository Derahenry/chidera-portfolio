import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages serves this repo at derahenry.github.io/chidera-portfolio/,
// so base must match the repo name. Change both together if the repo is renamed.
export default defineConfig({
  base: '/chidera-portfolio/',
  plugins: [react(), tailwindcss()],
})
