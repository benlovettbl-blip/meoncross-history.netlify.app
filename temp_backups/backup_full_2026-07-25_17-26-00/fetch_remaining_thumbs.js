const fs = require('fs');
const https = require('https');

async function getArticleThumbnail(searchTerm) {
  return new Promise((resolve) => {
    const url = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(searchTerm)}&gsrnamespace=0&gsrlimit=1&prop=pageimages&pithumbsize=500&format=json`;
    https.get(url, { headers: { 'User-Agent': 'AntigravityIDE/2.0' } }, (res) => {
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

const lessonStarters = {
  'lesson_2_3': ["William Harvey", "Bills of mortality"],
  'lesson_3_1': ["Swan neck flask", "Robert Koch"],
  'lesson_3_2': ["Florence Nightingale", "History of general anesthesia"],
  'lesson_3_3': ["Edward Jenner", "1854 Broad Street cholera outbreak"],
  'lesson_4_1': ["Photo 51", "Bacteriophage"],
  'lesson_4_2': ["Aneurin Bevan", "Radiotherapy"],
  'lesson_4_3': ["Alexander Fleming", "History of penicillin"],
  'lesson_4_4': ["Health effects of tobacco", "Tobacco packaging warning messages"],
  'lesson_5_1': ["Battle of Passchendaele", "Trench warfare"],
  'lesson_5_2': ["Trench foot", "Gas mask"],
  'lesson_5_3': ["X-ray", "Shell shock"],
  'lesson_5_4': ["Stretcher bearer", "Field ambulance"],
  'lesson_5_5': ["Thomas splint", "Harold Gillies"]
};

const delay = ms => new Promise(res => setTimeout(res, ms));

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
        console.log(`Waiting to fetch ${searches[i]}...`);
        await delay(3000); 
        const url = await getArticleThumbnail(searches[i]);
        if (url) {
          lesson.starters[i].source = url;
          console.log(`Updated ${lesson.id} Source ${i}: ${url}`);
        } else {
          console.log(`Failed to fetch thumbnail for ${lesson.id} Source ${i} (${searches[i]})`);
        }
      }
    }
  }

  const newDataCode = 'export default ' + JSON.stringify(dataObj, null, 2) + ';';
  fs.writeFileSync(dataPath, newDataCode, 'utf8');
  console.log('Saved data.js');
}

main();
