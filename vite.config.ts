import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Hosted on Vercel at the domain root, so base is '/'.
// If it is ever served from a subpath, set base to that path (for example '/my-repo/').
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
})
