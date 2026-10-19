const fs = require('fs');
const content = fs.readFileSync('public/units/ks2_ww2/assets/comparison/uk_base.svg', 'utf8');

const gbMatch = content.match(/<path[^>]+id="path_GB_mainland"[^>]*d="([^"]+)"/);
if (gbMatch) {
  const d = gbMatch[1];
  const nums = d.match(/[-+]?[0-9]*\.?[0-9]+/g).map(Number);
  const xs = [];
  const ys = [];
  for (let i = 0; i < nums.length; i += 2) {
    // approximate absolute vs relative, let's just see coordinate bounds
    xs.push(nums[i]);
    if (nums[i + 1] !== undefined) ys.push(nums[i + 1]);
  }
  console.log('X sample min/max:', Math.min(...xs), Math.max(...xs));
  console.log('Y sample min/max:', Math.min(...ys), Math.max(...ys));
}
