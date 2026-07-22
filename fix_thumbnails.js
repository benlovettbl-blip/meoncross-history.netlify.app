const fs = require('fs');
const https = require('https');

async function fetchWikiThumbnailUrl(searchTerm) {
  return new Promise((resolve) => {
    // using pageimages and pithumbsize
    const url = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(searchTerm)}&gsrnamespace=6&prop=pageimages&pithumbsize=500&format=json`;
    https.get(url, { headers: { 'User-Agent': 'AntigravityIDE/1.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.query && json.query.pages) {
            const pages = Object.values(json.query.pages);
            if (pages.length > 0 && pages[0].thumbnail && pages[0].thumbnail.source) {
              resolve(pages[0].thumbnail.source);
              return;
            }
          }
        } catch(e) {}
        resolve(null);
      });
    }).on('error', () => resolve(null));
  });
}

// Map the old search terms to the lessons to re-fetch
const lessonStarters = {
  'lesson_1_1': ["Zodiac man manuscript", "Urine wheel episkopion"],
  'lesson_1_2': ["Bloodletting manuscript illustration", "Hotel Dieu medieval hospital"],
  'lesson_1_3': ["Tournai citizens burying the dead", "Flagellants medieval plague"],
  'lesson_2_1': ["De humani corporis fabrica Vesalius muscle", "Leonardo da Vinci anatomy skull"],
  'lesson_2_2': ["Quack doctor painting", "Culpeper's Complete Herbal title page"],
  'lesson_2_3': ["William Harvey veins valves", "Bill of Mortality 1665 plague"],
  'lesson_3_1': ["Louis Pasteur swan neck flask experiment", "Robert Koch laboratory"],
  'lesson_3_2': ["Nightingale rose diagram", "Early surgery anesthesia photograph"],
  'lesson_3_3': ["James Gillray cow pock", "John Snow cholera map"],
  'lesson_4_1': ["Rosalind Franklin Photograph 51", "Bacteriophage electron microscope"],
  'lesson_4_2': ["Aneurin Bevan NHS hospital", "Early radiotherapy machine"],
  'lesson_4_3': ["Alexander Fleming penicillin petri dish", "Penicillin WWII poster"],
  'lesson_4_4': ["Vintage cigarette advertisement doctor", "Graphic smoking warning label"],
  'lesson_5_1': ["Passchendaele mud trenches", "WW1 trench aerial map"],
  'lesson_5_2': ["Trench foot WW1", "WW1 gas mask soldiers"],
  'lesson_5_3': ["WW1 shrapnel X-ray", "Shell shock soldier WW1"],
  'lesson_5_4': ["Stretcher bearers WW1 mud", "WW1 horse drawn ambulance"],
  'lesson_5_5': ["Thomas splint WW1", "Harold Gillies plastic surgery WW1"]
};

async function main() {
  const dataPath = 'edexcel_medicine/data.js';
  let dataCode = fs.readFileSync(dataPath, 'utf8');
  let dataObjStr = dataCode.replace(/^export\s+default\s+/, '').replace(/;$/, '');
  
  const lastBrace = dataObjStr.lastIndexOf('}');
  const dataObj = eval('(' + dataObjStr.substring(0, lastBrace + 1) + ')');

  for (let lesson of dataObj.lessons) {
    if (lesson.starters && lessonStarters[lesson.id]) {
      const searches = lessonStarters[lesson.id];
      for (let i = 0; i < lesson.starters.length; i++) {
        const url = await fetchWikiThumbnailUrl(searches[i]);
        if (url) {
          lesson.starters[i].source = url;
          console.log(`Updated ${lesson.id} Source ${i}: ${url}`);
        } else {
          // If thumbnail fails, try to use the raw filename but prepended with the thumbnail path pattern.
          console.log(`Failed to fetch thumbnail for ${lesson.id} Source ${i}`);
        }
      }
    }
  }

  const newDataCode = 'export default ' + JSON.stringify(dataObj, null, 2) + ';';
  fs.writeFileSync(dataPath, newDataCode, 'utf8');
  console.log('Saved data.js');
}

main();
