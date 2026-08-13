const { execSync } = require('child_process');
const fs = require('fs');

const terms = ['Eastney Beam Engine House', 'Fishbourne Roman Palace', 'Mary Rose', 'Robert Rawlinson', 'Titchfield Abbey'];
const dests = ['eastney.jpg', 'fishbourne.jpg', 'mary_rose.jpg', 'robert_rawlinson.jpg', 'titchfield.jpg'];

async function fix() {
  for (let i=0; i<terms.length; i++) {
    const term = terms[i];
    const dest = 'public/images/' + dests[i];
    const url = 'https://en.wikipedia.org/w/api.php?action=query&titles=' + encodeURIComponent(term) + '&prop=pageimages&format=json&pithumbsize=500';
    console.log('Searching for', term);
    try {
      const res = await fetch(url);
      const data = await res.json();
      const pages = data.query.pages;
      const pageId = Object.keys(pages)[0];
      if (pageId !== '-1' && pages[pageId].thumbnail) {
        const imgUrl = pages[pageId].thumbnail.source;
        console.log('Found:', imgUrl);
        execSync(`curl.exe -s -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36" "${imgUrl}" -o "${dest}"`);
      } else {
        console.log('Not found for', term);
        try { fs.unlinkSync(dest); } catch(e){}
      }
    } catch(err) {
       console.error("Failed", err);
    }
  }
}
fix();
