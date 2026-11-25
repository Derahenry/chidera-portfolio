import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// User site (derahenry.github.io) is served from the domain root, so base is '/'.
// If you ever move this to a project repo, change base to '/<repo-name>/'.
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
})
