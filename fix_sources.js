const fs = require('fs');
const https = require('https');

async function searchCommonsFile(query) {
  return new Promise((resolve) => {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srnamespace=6&srlimit=1&format=json`;
    https.get(url, { headers: { 'User-Agent': 'AntigravityIDE/3.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.query && json.query.search && json.query.search.length > 0) {
            resolve(json.query.search[0].title);
            return;
          }
        } catch(e) {}
        resolve(null);
      });
    }).on('error', () => resolve(null));
  });
}

async function getThumbnail(title) {
  return new Promise((resolve) => {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&pithumbsize=500&format=json`;
    https.get(url, { headers: { 'User-Agent': 'AntigravityIDE/3.0' } }, (res) => {
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

const queries = {
  'lesson_1_1': { 0: "Zodiac man", 1: "Urine wheel" },
  'lesson_1_2': { 0: "medieval bloodletting illumination", 1: "Hotel-Dieu illumination" },
  'lesson_1_3': { 0: "dance of death manuscript", 1: "flagellants medieval illustration" },
  'lesson_2_1': { 0: "Vesalius muscles", 1: "Leonardo da Vinci heart sketches" },
  'lesson_2_2': { 0: "quack doctor painting", 1: "Nicholas Culpeper herbal title page" },
  'lesson_2_3': { 0: "William Harvey vein valves", 1: "London Bill of Mortality 1665" },
  'lesson_3_1': { 0: "Pasteur swan neck flask", 1: "Robert Koch microscope laboratory" },
  'lesson_3_2': { 0: "Florence Nightingale rose diagram", 1: "first ether anesthesia photograph" },
  'lesson_3_3': { 0: "Edward Jenner cow pox cartoon", 1: "John Snow cholera map" },
  'lesson_4_1': { 0: "Rosalind Franklin Photo 51", 1: "electron microscope virus bacteriophage" },
  'lesson_4_2': { 0: "Aneurin Bevan NHS patient 1948", 1: "early radiotherapy machine" },
  'lesson_4_3': { 0: "Alexander Fleming petri dish 1928", 1: "WWII penicillin propaganda poster" },
  'lesson_4_4': { 0: "vintage cigarette advertisement doctor", 1: "modern anti-smoking warning label" },
  'lesson_5_1': { 0: "WW1 soldiers deep mud trench", 1: "WW1 aerial trench map" },
  'lesson_5_2': { 0: "trench foot WW1", 1: "early gas mask WW1 trenches" },
  'lesson_5_3': { 0: "early X-ray shrapnel", 1: "shell shock soldier WW1" },
  'lesson_5_4': { 0: "stretcher bearers WW1 mud", 1: "WW1 horse drawn ambulance" },
  'lesson_5_5': { 0: "Thomas splint WW1 leg", 1: "Harold Gillies plastic surgery WW1" }
};

const delay = ms => new Promise(res => setTimeout(res, ms));

async function main() {
  const dataPath = 'edexcel_medicine/data.js';
  let dataCode = fs.readFileSync(dataPath, 'utf8');
  let dataObjStr = dataCode.replace(/^export\s+default\s+/, '').replace(/;$/, '');
  
  const lastBrace = dataObjStr.lastIndexOf('}');
  const dataObj = eval('(' + dataObjStr.substring(0, lastBrace + 1) + ')');

  for (let lesson of dataObj.lessons) {
    if (lesson.starters && queries[lesson.id]) {
      const q = queries[lesson.id];
      for (let i = 0; i < lesson.starters.length; i++) {
        if (q[i]) {
          console.log(`Searching for: ${q[i]}`);
          await delay(2500); 
          const title = await searchCommonsFile(q[i]);
          if (title) {
            console.log(`Found title: ${title}`);
            await delay(1000);
            const url = await getThumbnail(title);
            if (url) {
              lesson.starters[i].source = url;
              console.log(`Updated ${lesson.id} Source ${i}: ${url}`);
            } else {
              console.log(`Failed to get thumbnail for ${title}`);
            }
          } else {
            console.log(`No results for ${q[i]}`);
          }
        }
      }
    }
  }

  const newDataCode = 'export default ' + JSON.stringify(dataObj, null, 2) + ';';
  fs.writeFileSync(dataPath, newDataCode, 'utf8');
  console.log('Saved data.js');
}

main();
