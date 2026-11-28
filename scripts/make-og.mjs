// Generates public/og-image.png (1200x630 link preview) and public/apple-touch-icon.png.
// Run with: npm run og
import sharp from 'sharp'

const ink = '#0f0f10'
const paper = '#f2f2f0'
const muted = '#a4a4a6'
const accent = '#c6f36b'
const line = '#2a2a2d'

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
  <text x="74" y="300" font-family="'Segoe UI', Arial, sans-serif" font-weight="700" font-size="112" letter-spacing="-5" fill="${paper}">I build and ship</text>
  <text x="74" y="420" font-family="'Segoe UI', Arial, sans-serif" font-weight="700" font-size="112" letter-spacing="-5" fill="${accent}">real products<tspan fill="${paper}">.</tspan></text>
  <line x1="80" y1="500" x2="1120" y2="500" stroke="${line}" stroke-width="2"/>
  <circle cx="88" cy="549" r="6" fill="${accent}"/>
  <text x="108" y="557" font-family="'Segoe UI', Arial, sans-serif" font-size="26" fill="${muted}">Northampton, UK. Looking for a placement or graduate role.</text>
</svg>`

const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
  <rect width="180" height="180" fill="${ink}"/>
  <text x="90" y="114" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="72" letter-spacing="-4" fill="${accent}">CN</text>
</svg>`

await sharp(Buffer.from(og)).png({ compressionLevel: 9, palette: true }).toFile('public/og-image.png')
await sharp(Buffer.from(icon)).png().toFile('public/apple-touch-icon.png')
console.log('Wrote public/og-image.png and public/apple-touch-icon.png')
