const fs = require('fs');
const path = require('path');
const https = require('https');

const dataPath = path.resolve(__dirname, '../edexcel_medicine/data.js');
let dataString = fs.readFileSync(dataPath, 'utf8');

// Convert to commonjs temporarily
let tempFile = dataString.replace('export const unitData = ', 'module.exports = ');
fs.writeFileSync(path.resolve(__dirname, 'temp_data18.js'), tempFile);
delete require.cache[require.resolve('./temp_data18.js')];
const unitData = require('./temp_data18.js');

const updates = [
  {
    wiki: 'Four_temperaments', title: 'Theory of the Four Humours',
    q1: 'Describe one feature of the Theory of the Four Humours.', a1: 'It was originally created by the Ancient Greek physician Hippocrates. He claimed the body was made of blood, phlegm, yellow bile, and black bile.',
    q2: "Describe one feature of the Catholic Church's medical beliefs.", a2: 'They taught that illness was a punishment sent directly from God for committing sins.'
  },
  {
    wiki: 'Bloodletting', title: 'A medieval illustration of phlebotomy',
    q1: 'Describe one feature of medieval bloodletting.', a1: "It was used to treat illnesses by removing excess blood from the body, based on Galen's Theory of Opposites to restore humoral balance.",
    q2: 'Describe one feature of the role of the apothecary.', a2: 'Apothecaries mixed herbal remedies and ointments using a manual called the Materia Medica, providing a cheaper alternative to physicians.'
  },
  {
    wiki: 'Black_Death', title: 'An illustration of the Danse Macabre',
    q1: 'Describe one feature of the flagellants.', a1: 'They were religious groups who marched through streets whipping themselves in public to show God they were sorry for their sins, hoping to avoid the plague.',
    q2: 'Describe one feature of medieval quarantine.', a2: 'Local councils tried to isolate infected houses and forced ships to wait 40 days before unloading, although these measures were rarely strictly enforced.'
  },
  {
    wiki: 'Andreas_Vesalius', title: 'Andreas Vesalius, from De Humani Corporis Fabrica',
    q1: 'Describe one feature of the printing press.', a1: 'Invented in the 1440s, it allowed medical books to be mass-produced cheaply and accurately without the Catholic Church controlling or censoring the content.',
    q2: "Describe one feature of Vesalius's work.", a2: 'He performed his own dissections and proved Galen had made over 200 anatomical errors, such as proving the human jaw bone is a single piece.'
  },
  {
    wiki: 'William_Harvey', title: 'William Harvey',
    q1: "Describe one feature of William Harvey's discoveries.", a1: "He proved experimentally that blood circulates around the body in a single system driven by the heart acting as a pump, disproving Galen's idea that blood was constantly manufactured in the liver.",
    q2: 'Describe one feature of Renaissance hospitals.', a2: 'Many monastic hospitals were forced to close after Henry VIII dissolved the monasteries, leading to a temporary decline in hospital care until charity hospitals opened later.'
  },
  {
    wiki: 'Great_Plague_of_London', title: 'The Great Plague of London',
    q1: "Describe one feature of the government's response to the Great Plague.", a1: 'The Mayor of London ordered that all plague victims be locked inside their homes for 28 days with a red cross painted on the door.',
    q2: 'Describe one feature of the plague searchers.', a2: 'They were usually older women hired by the parish to inspect dead bodies and officially determine if the cause of death was the plague.'
  },
  {
    wiki: 'Louis_Pasteur', title: 'Louis Pasteur',
    q1: 'Describe one feature of the Theory of Spontaneous Generation.', a1: 'It was the false 18th-century belief that rotting matter naturally created microbes, which Pasteur successfully disproved in 1861.',
    q2: "Describe one feature of Robert Koch's work.", a2: 'Koch developed a technique to stain bacteria with industrial dyes, allowing him to officially identify the specific microbes that caused tuberculosis and cholera.'
  },
  {
    wiki: 'Joseph_Lister', title: 'Joseph Lister',
    q1: "Describe one feature of James Simpson's work.", a1: 'In 1847, he discovered the anesthetic properties of chloroform, which effectively knocked patients unconscious and solved the problem of pain during surgery.',
    q2: 'Describe one feature of carbolic acid.', a2: 'Used by Joseph Lister in 1865, it was sprayed in operating theatres to kill bacteria and prevent fatal post-operative infections like sepsis.'
  },
  {
    wiki: '1854_Broad_Street_cholera_outbreak', title: 'John Snow Broad Street Map',
    q1: "Describe one feature of John Snow's investigation.", a1: 'He mapped cholera deaths in Soho and proved the disease was water-borne by removing the handle of the contaminated Broad Street water pump.',
    q2: 'Describe one feature of the 1875 Public Health Act.', a2: 'It was the first compulsory public health law, forcing local councils to provide clean drinking water and build proper sewage systems.'
  },
  {
    wiki: 'Rosalind_Franklin', title: 'Rosalind Franklin',
    q1: 'Describe one feature of the Human Genome Project.', a1: 'Launched in 1990, it successfully mapped all three billion chemical base pairs in human DNA, allowing scientists to understand hereditary diseases.',
    q2: 'Describe one feature of the discovery of DNA.', a2: 'In 1953, Watson and Crick published the double-helix structure of DNA, fundamentally shifting medicine towards a genetic understanding of illness.'
  },
  {
    wiki: 'Penicillin', title: 'Penicillium Mold',
    q1: "Describe one feature of Alexander Fleming's discovery.", a1: 'In 1928, he accidentally left a petri dish out and noticed that a growing mould had killed the surrounding staphylococcus bacteria.',
    q2: 'Describe one feature of the mass production of penicillin.', a2: 'During WWII, the US government funded massive deep-fermentation tanks to mass-produce the antibiotic in time for the D-Day landings.'
  },
  {
    wiki: 'Jonas_Salk', title: 'Jonas Salk',
    q1: 'Describe one feature of the Clean Air Acts.', a1: "Passed in 1956 following the Great Smog, the Acts forced cities to create 'smokeless zones' and banned the burning of toxic coal in homes.",
    q2: 'Describe one feature of modern government vaccination campaigns.', a2: 'The government launched massive national campaigns, such as the 1942 diphtheria campaign, which nearly eradicated the disease in Britain.'
  },
  {
    wiki: 'Aneurin_Bevan', title: 'Aneurin Bevan',
    q1: 'Describe one feature of the impact of the Boer War on public health.', a1: 'The government was shocked to find that a huge percentage of working-class recruits were unfit for military service, prompting the 1906 Liberal welfare reforms.',
    q2: 'Describe one feature of the establishment of the NHS.', a2: 'Launched in 1948, it nationalised hospitals and provided free, comprehensive medical care to all citizens, funded by taxation.'
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
  for (let i = 0; i <= 12; i++) {
    const update = updates[i];
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
  console.log('Successfully injected Core Medicine visual sources and GCSE tasks!');
}

main();
