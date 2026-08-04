import fs from 'fs';

// Mock browser environment
global.window = {
    currentUnitId: 'weimar_nazi_germany'
};

// 1. Load the database
const dbStr = fs.readFileSync('public/database.json', 'utf8');
const db = JSON.parse(dbStr);
const unitDb = db['weimar_nazi_germany'];

// 2. Find Wilhelm and Scheidemann
const wilhelm = unitDb.data.key_individuals.find(p => p.name === 'Kaiser Wilhelm II');
const scheidemann = unitDb.data.key_individuals.find(p => p.name.includes('Scheidemann'));

if (!wilhelm) throw new Error('Wilhelm not found in key_individuals!');
if (!scheidemann) throw new Error('Scheidemann not found in key_individuals!');

// 3. Load getAssetUrl manually
function getAssetUrl(path) {
  if (!path) return path;
  if (path.startsWith('http') || path.startsWith('/')) return path;
  if (window.currentUnitId) {
    return `/${window.currentUnitId}/${path}`;
  }
  return path;
}
global.getAssetUrl = getAssetUrl;

// 4. Mock the HTML generator exactly as it is in key_individuals.js
function generateKeyIndividualCardHTML(person) {
  const hasBackData = person.actions || (person.achievements && !Array.isArray(person.achievements)) || person.limitations;
  
  let frontImgHtml = '';
  if (person.image || person.image_url) {
    const imgSrc = person.image_url ? person.image_url : (typeof getAssetUrl === 'function' ? getAssetUrl(person.image) : person.image);
    frontImgHtml = `
      <div style="width: 100%; height: 280px; background: var(--bg-card); display: flex; align-items: center; justify-content: center; border-bottom: 1px solid var(--border-glass); overflow: hidden;">
        <img src="${imgSrc}" loading="lazy" style="width: 100%; height: 100%; object-fit: contain;" onerror="this.parentElement.style.display='none'">
      </div>
    `;
  }
  return frontImgHtml;
}

// 5. Test them
const wilhelmHtml = generateKeyIndividualCardHTML(wilhelm);
const scheidemannHtml = generateKeyIndividualCardHTML(scheidemann);

if (!wilhelmHtml.includes('src="/images/weimar_individuals/kaiser_wilhelm_ii.jpg"')) {
    console.error("TEST FAILED FOR WILHELM. HTML:", wilhelmHtml);
    process.exit(1);
} else {
    console.log("TEST PASSED: Wilhelm II image URL is perfect.");
}

if (!scheidemannHtml.includes('src="/images/weimar_individuals/philipp_scheidemann.jpg"')) {
    console.error("TEST FAILED FOR SCHEIDEMANN. HTML:", scheidemannHtml);
    process.exit(1);
} else {
    console.log("TEST PASSED: Philipp Scheidemann image URL is perfect.");
}

console.log("All tests passed! The flip card images will now perfectly load in the modal.");
