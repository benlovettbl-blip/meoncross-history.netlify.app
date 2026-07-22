const fs = require('fs');
const path = require('path');
const https = require('https');

const dataPath = path.resolve(__dirname, '../edexcel_medicine/data.js');
let dataString = fs.readFileSync(dataPath, 'utf8');

// Convert to commonjs temporarily
let tempFile = dataString.replace('export const unitData = ', 'module.exports = ');
fs.writeFileSync(path.resolve(__dirname, 'temp_data19.js'), tempFile);
delete require.cache[require.resolve('./temp_data19.js')];
const unitData = require('./temp_data19.js');

const updates = [
  {
    wiki: 'Western_Front_(World_War_I)', title: 'The Western Front',
    q1: 'Describe one feature of the First Battle of Ypres.', a1: 'The British held on to Ypres to stop the Germans advancing to the sea, which meant they retained control of the English Channel ports.',
    q2: 'Describe one feature of the Battle of the Somme.', a2: 'It resulted in over 400,000 British casualties, with an unprecedented 57,000 casualties on the very first day alone.'
  },
  {
    wiki: 'Battle_of_the_Somme', title: 'Map of the Somme Offensive',
    q1: 'Describe one feature of the trench system.', a1: 'The communication trenches ran vertically between the other trenches, allowing troops, stretcher-bearers, and supplies to move safely.',
    q2: 'Describe one feature of trench foot.', a2: 'It was a severe infection caused by standing in cold, waterlogged trenches for days without changing boots, which often led to gangrene.'
  },
  {
    wiki: 'Battle_of_Passchendaele', title: 'The devastated, muddy terrain of Passchendaele',
    q1: 'Describe one feature of the effects of poison gas.', a1: 'Mustard gas was an odourless gas that caused severe internal and external blistering, and could take days to slowly kill the victim.',
    q2: 'Describe one feature of shrapnel wounds.', a2: 'Shrapnel from artillery shells accounted for 58% of wounds and caused deep, jagged cuts that easily became infected by the bacteria-rich soil.'
  },
  {
    wiki: 'Battle_of_Arras_(1917)', title: 'Map of the Arras Offensive and Vimy Ridge',
    q1: 'Describe one feature of the FANY.', a1: 'The First Aid Nursing Yeomanry was a highly active volunteer corps of women who drove motorized ambulances on the Western Front.',
    q2: 'Describe one feature of the Chain of Evacuation.', a2: 'Casualty Clearing Stations (CCS) were large, well-equipped medical facilities located a few miles back from the frontline to operate on critical cases.'
  },
  {
    wiki: 'Marie_Curie', title: 'Marie Curie, pioneer of mobile X-ray units',
    q1: 'Describe one feature of the Thomas Splint.', a1: 'It was a metal frame that kept a fractured leg completely rigid, stopping the bones grinding together and reducing the death rate from 80% to 20%.',
    q2: 'Describe one feature of blood transfusions on the Western Front.', a2: 'Blood could not be stored until the discovery of sodium citrate in 1915, which successfully stopped donor blood from clotting.'
  }
];

async function getWikiUrl(title) {
  return new Promise((resolve, reject) => {
    https.get(`https://en.wikipedia.org/w/api.php?action=query&titles=${title}&prop=pageimages&format=json&pithumbsize=500`, { headers: { 'User-Agent': 'MeoncrossHistoryApp/1.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          const pages = parsed.query.pages;
          const pageId = Object.keys(pages)[0];
          if (pageId === '-1') resolve(null);
          else if (pages[pageId].thumbnail) resolve(pages[pageId].thumbnail.source);
          else resolve(null);
        } catch (e) { resolve(null); }
      });
    }).on('error', reject);
  });
}

async function main() {
  for (let i = 13; i <= 17; i++) {
    const update = updates[i - 13];
    const url = await getWikiUrl(update.wiki);
    
    // 1. Inject GCSE Task
    unitData.lessons[i].gcse_task = {
      title: "Edexcel Features Practice",
      tasks: [
        { type: "written", text: update.q1, model: update.a1 },
        { type: "written", text: update.q2, model: update.a2 }
      ]
    };
    
    // 2. Inject Visual Source
    if (url) {
      unitData.lessons[i].sources = [
        {
          title: "Source A: " + update.title,
          src: url,
          caption: update.title
        }
      ];
      
      // Update Teacher Notes with Hinge Question
      if (!unitData.lessons[i].teacher_notes.source_context) {
         unitData.lessons[i].teacher_notes.source_context = "";
      }
      unitData.lessons[i].teacher_notes.source_context += `\n\nLook at Source A. **If a student were analyzing this source for utility, what limitations might they find regarding its provenance?**`;
    }
  }

  const newString = 'export const unitData = ' + JSON.stringify(unitData, null, 2) + ';\n';
  fs.writeFileSync(dataPath, newString);
  console.log('Successfully injected Western Front visual sources and GCSE tasks!');
}

main();
