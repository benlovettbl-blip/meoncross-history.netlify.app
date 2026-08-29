const fs = require('fs');
const data = fs.readFileSync('public/units/trip_ypres/data.js', 'utf8');
console.log('Nash: ', data.includes('— <strong>Paul Nash</strong>, British War Artist (1917)</blockquote>"'));
console.log('Richards: ', data.includes('— <strong>Private Frank Richards</strong>, Royal Welch Fusiliers</blockquote>"'));
console.log('Brooding: ', data.includes('not victory.</li></ul></div>"'));
console.log('Sanctuary: ', data.includes('collapsed back into the woods.</li> </ul></div></div>"'));
console.log('Menin: ', data.includes('Last Post begins at 8:00 PM.</p></div></div>"'));
