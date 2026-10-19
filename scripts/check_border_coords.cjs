const fs = require('fs');

const content = fs.readFileSync('public/units/ks2_ww2/assets/comparison/uk_base.svg', 'utf8');

// Let's find polyline_GB-ENG_GB-WLS_landborder
const wlsMatch = content.match(
  /<polyline[^>]+id="polyline_GB-ENG_GB-WLS_landborder"[^>]*points="([^"]+)"/,
);
if (wlsMatch) {
  const points = wlsMatch[1]
    .trim()
    .split(/\s+/)
    .map((p) => p.split(',').map(Number));
  console.log('Wales border point count:', points.length);
  const xs = points.map((p) => p[0]);
  const ys = points.map((p) => p[1]);
  console.log('Wales border X range:', Math.min(...xs), Math.max(...xs));
  console.log('Wales border Y range:', Math.min(...ys), Math.max(...ys));
}

// Let's find polyline_GB-ENG_GB-SCT_landborder
const sctMatch = content.match(
  /<polyline[^>]+id="polyline_GB-ENG_GB-SCT_landborder"[^>]*points="([^"]+)"/,
);
if (sctMatch) {
  const points = sctMatch[1]
    .trim()
    .split(/\s+/)
    .map((p) => p.split(',').map(Number));
  console.log('Scotland border point count:', points.length);
  const xs = points.map((p) => p[0]);
  const ys = points.map((p) => p[1]);
  console.log('Scotland border X range:', Math.min(...xs), Math.max(...xs));
  console.log('Scotland border Y range:', Math.min(...ys), Math.max(...ys));
}
