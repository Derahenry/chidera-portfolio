// Generates public/og-image.png (1200x630 link preview) and public/apple-touch-icon.png.
// Run with: npm run og
import sharp from 'sharp'

const ink = '#121211'
const paper = '#edebe5'
const muted = '#a5a299'
const accent = '#e3a46f'
const line = '#2c2b27'

const dots = []
for (let x = 13; x < 1200; x += 26) {
  for (let y = 13; y < 630; y += 26) {
    const d = Math.hypot((x - 900) / 1.4, y - 200)
    const o = Math.max(0, 0.22 - d / 2600)
    if (o > 0.01) dots.push(`<circle cx="${x}" cy="${y}" r="1.2" fill="${paper}" opacity="${o.toFixed(3)}"/>`)
  }
}

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${ink}"/>
  ${dots.join('')}
  <text x="80" y="118" font-family="Consolas, 'Courier New', monospace" font-size="22" letter-spacing="3" fill="${muted}">CHIDERA NWOKOLO  /  SOFTWARE ENGINEERING STUDENT</text>
  <text x="76" y="300" font-family="Georgia, 'Times New Roman', serif" font-size="118" fill="${paper}">I build and ship</text>
  <text x="76" y="420" font-family="Georgia, 'Times New Roman', serif" font-style="italic" font-size="118" fill="${accent}">real products<tspan fill="${paper}" font-style="normal">.</tspan></text>
  <line x1="80" y1="500" x2="1120" y2="500" stroke="${line}" stroke-width="2"/>
  <circle cx="88" cy="549" r="6" fill="${accent}"/>
  <text x="108" y="557" font-family="'Segoe UI', Arial, sans-serif" font-size="26" fill="${muted}">Northampton, UK. Looking for a placement or graduate role.</text>
  <text x="1120" y="557" text-anchor="end" font-family="'Segoe UI', Arial, sans-serif" font-size="26" fill="${paper}">chidera-portfolio.vercel.app</text>
</svg>`

const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
  <rect width="180" height="180" fill="${ink}"/>
  <text x="90" y="118" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-size="88" fill="${accent}">cn</text>
</svg>`

await sharp(Buffer.from(og)).png({ compressionLevel: 9, palette: true }).toFile('public/og-image.png')
await sharp(Buffer.from(icon)).png().toFile('public/apple-touch-icon.png')
console.log('Wrote public/og-image.png and public/apple-touch-icon.png')
