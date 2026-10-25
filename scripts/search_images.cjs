const fs = require('fs');

const files = fs.readdirSync('public/images');
console.log('Total files in public/images:', files.length);

const keywords = ['vietnam', 'hanoi', 'linebacker', 'nixon', 'bomb', 'tunnel', 'hospital', 'bart', 'guy', 'coram', 'foundling', 'plague', '1665', 'exchange', 'hollar'];
keywords.forEach(kw => {
  const matches = files.filter(f => f.toLowerCase().includes(kw));
  console.log(`Keyword "${kw}":`, matches);
});
