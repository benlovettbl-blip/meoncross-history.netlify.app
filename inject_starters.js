const fs = require('fs');
const https = require('https');

const lessonStarters = {
  'lesson_1_1': [
    { title: "The 'Zodiac Man' (Homo Signorum)", search: "Zodiac man manuscript", caption: "A 14th-century detailed drawing showing how different astrological star signs govern different body parts.", think_wonder: "Why are the signs of the zodiac drawn over specific body parts? How do you think a medieval physician used this chart to decide when to treat a patient?" },
    { title: "Medieval Urine Chart", search: "Urine wheel episkopion", caption: "A circular chart showing 20 different shades and consistencies of urine.", think_wonder: "What is this physician doing? Why would the colour, smell, and even taste of urine be considered the most important diagnostic tool in the 1300s?" }
  ],
  'lesson_1_2': [
    { title: "Medieval Bloodletting", search: "Bloodletting manuscript illustration", caption: "A graphic manuscript illumination showing a surgeon slicing a patient's arm to drain blood into a bowl.", think_wonder: "What is being done to this patient's arm? Why might bleeding someone out intentionally be considered a 'cure'?" },
    { title: "The Hotel-Dieu Hospital", search: "Hotel Dieu medieval hospital", caption: "An illumination showing nuns caring for patients in a large, religious hospital ward.", think_wonder: "Notice who is providing the care. Why are there no trained doctors visible? What does this tell us about the purpose of a medieval hospital?" }
  ],
  'lesson_1_3': [
    { title: "The Tournai Mass Burial (1349)", search: "Tournai citizens burying the dead", caption: "An illumination showing citizens stacking dozens of wooden coffins into deep trenches.", think_wonder: "What does the sheer number of coffins suggest about the scale of the disaster? Why have normal burial practices collapsed?" },
    { title: "Flagellants Whipping Themselves", search: "Flagellants medieval plague", caption: "An illustration of a procession of flagellants whipping their own backs in public.", think_wonder: "Why are these people intentionally hurting themselves? What do they believe this will achieve in the eyes of God?" }
  ],
  'lesson_2_1': [
    { title: "Vesalius' 'Muscle Men'", search: "De humani corporis fabrica Vesalius muscle", caption: "A hyper-detailed, incredibly accurate anatomical drawing of a flayed human body standing against an Italian landscape.", think_wonder: "Compare this drawing to the medieval 'Zodiac Man'. How was this astonishing level of anatomical detail achieved, and why was it so dangerous to discover?" },
    { title: "Da Vinci Anatomical Sketch", search: "Leonardo da Vinci anatomy skull", caption: "A detailed sketch of the human skull and spine by Leonardo da Vinci.", think_wonder: "Why would an artist need to understand the human skeleton in such intricate detail? How does this cross the line between art and medicine?" }
  ],
  'lesson_2_2': [
    { title: "A Quack Doctor", search: "Quack doctor painting", caption: "A contemporary painting of an eccentric 'quack' performing to a crowd to sell bottled remedies.", think_wonder: "Why are people buying medicine from a performer instead of a trained physician? How safe do you think these 'cure-all' potions really were?" },
    { title: "Printed Herbal Book", search: "Culpeper's Complete Herbal title page", caption: "The title page of Nicholas Culpeper's famous printed book of herbal remedies.", think_wonder: "How would mass-producing cheap books about herbal remedies change the way ordinary people treated illnesses?" }
  ],
  'lesson_2_3': [
    { title: "Harvey’s Diagram of Vein Valves", search: "William Harvey veins valves", caption: "A sketch of a human arm with a tourniquet, showing fingers pressing on the veins.", think_wonder: "What is the hand doing to the vein? What does this simple experiment prove about the direction that blood flows?" },
    { title: "London Bill of Mortality (1665)", search: "Bill of Mortality 1665 plague", caption: "A printed broadsheet grimly listing the thousands of people who died from the plague in a single week.", think_wonder: "What do these terrifying numbers tell us about the impact of the Great Plague? Why are city officials tracking the deaths so carefully?" }
  ],
  'lesson_3_1': [
    { title: "Pasteur's Swan-Neck Flask", search: "Louis Pasteur swan neck flask experiment", caption: "The original diagram of Pasteur's famous experiment that disproved spontaneous generation.", think_wonder: "Why didn't the liquid in the curved flask rot? What invisible thing is being kept out?" },
    { title: "Robert Koch at the Microscope", search: "Robert Koch laboratory", caption: "A photograph of Robert Koch in his laboratory looking through a microscope.", think_wonder: "What is he looking for? How did this technology change medicine forever?" }
  ],
  'lesson_3_2': [
    { title: "Florence Nightingale’s 'Rose Diagram'", search: "Nightingale rose diagram", caption: "Her revolutionary statistical coxcomb chart showing deaths in the Crimean War.", think_wonder: "Look closely at the blue areas vs the red areas. Why did Nightingale invent a visual diagram instead of just handing the government a boring list of numbers?" },
    { title: "Early Chloroform Surgery", search: "Early surgery anesthesia photograph", caption: "A photograph of a Victorian operating theatre with a patient completely unconscious under a cloth mask.", think_wonder: "Notice how calm the patient is. How did the invention of this invisible gas completely revolutionize the speed and success of surgery?" }
  ],
  'lesson_3_3': [
    { title: "The Cow-Pock Cartoon", search: "James Gillray cow pock", caption: "James Gillray’s famous cartoon showing cows literally bursting out of people's arms after taking Jenner's vaccine.", think_wonder: "What were people terrified would happen if they took Jenner's new vaccine? Why was there such fierce, hysterical opposition to his idea?" },
    { title: "John Snow's Ghost Map", search: "John Snow cholera map", caption: "The original map of Soho showing black bars clustered around the Broad Street pump.", think_wonder: "Why are all the black bars (representing deaths) clustered around that specific street corner? What does this visual map prove about how cholera spreads?" }
  ],
  'lesson_4_1': [
    { title: "Photograph 51 (1952)", search: "Rosalind Franklin Photograph 51", caption: "Rosalind Franklin's blurry X-ray diffraction image of DNA.", think_wonder: "What on earth is this an image of? How did this blurry 'X' unlock the ultimate secrets of human genetics?" },
    { title: "Electron Microscope Virus", search: "Bacteriophage electron microscope", caption: "An electron microscope image of a virus, magnified thousands of times.", think_wonder: "This object is thousands of times smaller than a bacterium. How did discovering it change our approach to disease?" }
  ],
  'lesson_4_2': [
    { title: "Aneurin Bevan and the NHS", search: "Aneurin Bevan NHS hospital", caption: "A photograph of the Health Minister chatting with a young patient in 1948.", think_wonder: "Why is this moment historically significant for ordinary British people? What financial nightmare did the NHS finally eliminate?" },
    { title: "Early Radiotherapy", search: "Early radiotherapy machine", caption: "An early photograph of a massive radiotherapy machine being used on a patient.", think_wonder: "How does high-tech machinery change the role of the doctor and the experience of the patient?" }
  ],
  'lesson_4_3': [
    { title: "Fleming's Original Petri Dish", search: "Alexander Fleming penicillin petri dish", caption: "A photograph of the moldy staphylococcus plate from 1928.", think_wonder: "Notice the clear, empty ring around the white mold. What is the mold doing to the deadly bacteria, and why is this an accident that changed the world?" },
    { title: "WWII Penicillin Propaganda", search: "Penicillin WWII poster", caption: "A propaganda poster urging the mass production of Penicillin.", think_wonder: "Why was there such a desperate, government-funded rush to mass-produce this drug during the Second World War?" }
  ],
  'lesson_4_4': [
    { title: "Vintage Cigarette Advertisement", search: "Vintage cigarette advertisement doctor", caption: "A 1950s poster featuring a smiling physician endorsing cigarettes.", think_wonder: "Why on earth did doctors actively endorse smoking in the past? How does this shocking image compare to the government's approach today?" },
    { title: "Modern Anti-Smoking Warning", search: "Graphic smoking warning label", caption: "A modern graphic anti-smoking warning label on a cigarette pack.", think_wonder: "Why did the government switch from ignoring smoking to forcing these graphic warnings on every pack?" }
  ],
  'lesson_5_1': [
    { title: "Flooded Trenches", search: "Passchendaele mud trenches", caption: "A photograph of soldiers thigh-deep in liquid mud on the Western Front.", think_wonder: "What medical conditions would thrive in this horrific environment? How hard would it be to safely treat an open wound here?" },
    { title: "Aerial Trench Map", search: "WW1 trench aerial map", caption: "An aerial map showing the complicated zigzag pattern of the trench system.", think_wonder: "Look at the zigzag lines. How difficult would it be to quickly carry a stretcher through these narrow, winding corridors?" }
  ],
  'lesson_5_2': [
    { title: "Trench Foot", search: "Trench foot WW1", caption: "A stark medical photograph of rotting feet suffering from Trench Foot.", think_wonder: "What caused this horrific condition? How could the British Army possibly try to prevent it in permanently flooded trenches?" },
    { title: "Early Gas Masks", search: "WW1 gas mask soldiers", caption: "Soldiers wearing early, primitive gas masks in the trenches.", think_wonder: "Why are they wearing these? How did the invention of poison gas change the nature of warfare and military medicine?" }
  ],
  'lesson_5_3': [
    { title: "Shrapnel X-Ray", search: "WW1 shrapnel X-ray", caption: "An early X-ray showing jagged metal fragments embedded deep in bone.", think_wonder: "Why are artillery shells so much more destructive than regular bullets? How difficult would it be for a surgeon to find and remove these fragments without this machine?" },
    { title: "Shell Shock", search: "Shell shock soldier WW1", caption: "A photograph of a soldier suffering from shell shock, displaying the 'thousand-yard stare'.", think_wonder: "What are the invisible wounds of war? How did doctors try to treat a psychological condition they couldn't physically see?" }
  ],
  'lesson_5_4': [
    { title: "Stretcher Bearers in Mud", search: "Stretcher bearers WW1 mud", caption: "A photograph of four exhausted men struggling to carry a single casualty through deep sludge.", think_wonder: "Why does it take four men to carry one casualty? What dangers did these brave stretcher-bearers face while trying to save lives?" },
    { title: "Horse-Drawn Ambulance", search: "WW1 horse drawn ambulance", caption: "An image of a horse-drawn ambulance transporting wounded soldiers.", think_wonder: "Why were horse-drawn ambulances eventually replaced by motorized ones? What were their main limitations?" }
  ],
  'lesson_5_5': [
    { title: "The Thomas Splint", search: "Thomas splint WW1", caption: "A photograph of the simple metal frame holding a soldier's shattered leg rigid.", think_wonder: "How does this simple metal frame stop a fractured femur bone from piercing the skin and bleeding a soldier to death?" },
    { title: "Harold Gillies' Plastic Surgery", search: "Harold Gillies plastic surgery WW1", caption: "A photograph of early, pioneering plastic surgery on a disfigured soldier.", think_wonder: "How did the horrific facial injuries caused by modern shrapnel lead to the desperate invention of plastic surgery?" }
  ]
};

async function fetchWikiImageUrl(searchTerm) {
  return new Promise((resolve) => {
    const url = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(searchTerm)}&gsrnamespace=6&prop=imageinfo&iiprop=url&format=json`;
    https.get(url, { headers: { 'User-Agent': 'AntigravityIDE/1.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.query && json.query.pages) {
            const pages = Object.values(json.query.pages);
            if (pages.length > 0 && pages[0].imageinfo && pages[0].imageinfo.length > 0) {
              resolve(pages[0].imageinfo[0].url);
              return;
            }
          }
        } catch(e) {}
        resolve(null);
      });
    }).on('error', () => resolve(null));
  });
}

const fallbackImages = [
  "https://upload.wikimedia.org/wikipedia/commons/3/3a/Zodiac_man_from_a_Welsh_manuscript.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/7/7b/Fasciculus_medicinae%3B_urine_chart_Wellcome_L0026330.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/e/ec/Bloodletting_from_a_vein%2C_from_a_14th_century_manuscript_Wellcome_L0006248.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/8/87/H%C3%B4tel-Dieu_de_Paris.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/2/22/Tournai_citizens_burying_the_dead_during_the_Black_Death.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/1/1a/Flagellants_in_the_Low_Countries.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/0/05/De_humani_corporis_fabrica_Vesalius_muscle.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/4/4b/Leonardo_da_Vinci_-_Anatomical_studies_of_the_shoulder_-_WGA12653.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/7/71/Jan_Victors_-_The_Quack_-_WGA25076.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/e/ee/Culpeper%27s_English_physician_and_complete_herbal_Wellcome_L0026569.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/9/91/William_Harvey%27s_experiments_on_the_valves_in_the_veins_Wellcome_L0002162.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/7/7f/Bill_of_Mortality_1665.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/6/6f/Louis_Pasteur_experiment_swan_neck_flask.png",
  "https://upload.wikimedia.org/wikipedia/commons/e/ef/Robert_Koch_in_his_laboratory.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/1/17/Nightingale-mortality.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/0/03/Early_surgery_with_ether_anesthesia.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/7/7f/The_cow_pock.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/2/27/Snow-cholera-map-1.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/0/02/Photo_51_x-ray_diffraction_image.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/5/5f/Bacteriophage_electron_microscope.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/7/72/Aneurin_Bevan_NHS.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/4/41/Early_radiotherapy_machine.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/e/eb/Alexander_Fleming_penicillin_petri_dish.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/3/36/Thanks_to_Penicillin...He_Will_Come_Home.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/4/4c/Vintage_cigarette_advertisement_doctor.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/1/1b/Graphic_smoking_warning_label.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/1/14/Passchendaele_mud_trenches.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/3/39/WW1_trench_aerial_map.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/e/e0/Trench_foot_WW1.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/8/87/WW1_gas_mask_soldiers.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/d/da/WW1_shrapnel_X-ray.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/7/75/Shell_shock_soldier_WW1.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/b/b2/Stretcher_bearers_WW1_mud.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/9/91/WW1_horse_drawn_ambulance.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/6/6f/Thomas_splint_WW1.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/e/e7/Harold_Gillies_plastic_surgery_WW1.jpg"
];

async function main() {
  const dataPath = 'edexcel_medicine/data.js';
  let dataCode = fs.readFileSync(dataPath, 'utf8');
  let dataObjStr = dataCode.replace(/^export\s+default\s+/, '').replace(/;$/, '');
  
  // Use a hack to inject safely: evaluate the object
  const lastBrace = dataObjStr.lastIndexOf('}');
  const dataObj = eval('(' + dataObjStr.substring(0, lastBrace + 1) + ')');

  let fallbackIndex = 0;
  
  for (let lesson of dataObj.lessons) {
    if (lessonStarters[lesson.id]) {
      const starters = lessonStarters[lesson.id];
      lesson.starters = [];
      for (let s of starters) {
        let url = await fetchWikiImageUrl(s.search);
        if (!url) {
          url = fallbackImages[fallbackIndex % fallbackImages.length];
        }
        fallbackIndex++;
        
        lesson.starters.push({
          source: url,
          title: s.title,
          caption: s.caption,
          think_wonder: s.think_wonder
        });
      }
      console.log(`Added starters to ${lesson.id}`);
    }
  }

  const newDataCode = 'export default ' + JSON.stringify(dataObj, null, 2) + ';';
  fs.writeFileSync(dataPath, newDataCode, 'utf8');
  console.log('Saved data.js');
}

main();
