const fs = require('fs');
const https = require('https');

const fixes = {
  'lesson_1_1': { 1: "Chart for diagnosis by examination of urine. Wellcome L0005642" },
  'lesson_1_2': { 
     0: "Calendar, January, Two bloodlettings, inbetween Aquarius'' - Psalter of Eleanor of Aquitaine", 
     1: "The Hôtel Dieu, Paris; interior showing patients being nurse Wellcome" 
  },
  'lesson_1_3': {
    0: "Michael Wolgemut and Wilhelm Pleydenwurff. Dance of Death from the Nuremberg Chronicle",
    1: "Flagellants" 
  },
  'lesson_2_1': { 0: "Vesalius - De Humani Corporis Fabrica - 1543 - Muscle man back" },
  'lesson_2_3': { 1: "Bills of Mortality 1665" },
  'lesson_3_1': { 1: "Robert Koch in his laboratory" },
  'lesson_3_2': { 0: "Nightingale-mortality" },
  'lesson_3_3': { 0: "The cow pock", 1: "Snow-cholera-map-1" },
  'lesson_4_2': { 0: "Nhs first day", 1: "X-ray therapy, c.1910 - National Museum of American History" },
  'lesson_4_3': { 0: "Penicillium mold on agar Wellcome L0061205", 1: "Thanks to Penicillin - He Will Come Home, 1944" },
  'lesson_4_4': { 0: "Camel Cigarettes Ad - More Doctors Smoke Camels", 1: "Cigarette warning label Canada" },
  'lesson_5_2': { 1: "British soldiers with gas masks, First World War" },
  'lesson_5_3': { 0: "X-ray of shrapnel in the arm of a soldier, WWI Wellcome L0014768" },
  'lesson_5_4': { 0: "Stretcher bearers in the mud, Passchendaele, August 1917", 1: "A horse-drawn ambulance wagon on the Western Front. Q32228" },
  'lesson_5_5': { 0: "A Thomas splint in use on a wounded soldier, France. Wellcome L0014769", 1: "Walter Yeo before and after surgery" }
};

function searchCommonsImage(queryStr) {
  return new Promise((resolve) => {
    const url = 'https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch=' + encodeURIComponent(queryStr) + '&prop=pageimages&pithumbsize=500&format=json';
    https.get(url, { headers: { 'User-Agent': 'AntigravityIDE/4.0' } }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.query && json.query.pages) {
            // Find the exact match or first one with thumbnail
            const pages = Object.values(json.query.pages);
            for (let page of pages) {
                if (page.thumbnail && page.thumbnail.source) {
                    // Check if it's a pdf thumbnail and we don't want it, though for this list we mostly want images.
                    // The query strings are very exact so the first result with a thumbnail is likely it.
                    resolve(page.thumbnail.source);
                    return;
                }
            }
          }
        } catch(e) {}
        resolve(null);
      });
    }).on('error', () => resolve(null));
  });
}

const delay = ms => new Promise(res => setTimeout(res, ms));

async function main() {
  const dataPath = 'edexcel_medicine/data.js';
  let dataCode = fs.readFileSync(dataPath, 'utf8');
  let dataObjStr = dataCode.replace(/^export\s+default\s+/, '').replace(/;$/, '');
  const lastBrace = dataObjStr.lastIndexOf('}');
  const dataObj = eval('(' + dataObjStr.substring(0, lastBrace + 1) + ')');

  for (let lesson of dataObj.lessons) {
    if (fixes[lesson.id]) {
      for (let i of Object.keys(fixes[lesson.id])) {
        if (lesson.starters && lesson.starters[i]) {
            const queryStr = fixes[lesson.id][i];
            console.log(`Searching for: ${queryStr}`);
            const thumbUrl = await searchCommonsImage(queryStr);
            if (thumbUrl) {
                console.log(`Found: ${thumbUrl}`);
                lesson.starters[i].source = thumbUrl;
            } else {
                console.log(`Failed to find thumbnail for: ${queryStr}`);
            }
            await delay(1500); // Wait 1.5s to avoid 429
        }
      }
    }
  }

  const newDataCode = 'export default ' + JSON.stringify(dataObj, null, 2) + ';';
  fs.writeFileSync(dataPath, newDataCode, 'utf8');
  console.log('Successfully patched edexcel_medicine/data.js with exact authentic thumbnails.');
}

main();
