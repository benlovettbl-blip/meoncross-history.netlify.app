const fs = require('fs');
const path = require('path');

const westernFrontUtilityData = {
  // Lesson 21 (KT5.1: Trench Geography & Battles)
  L21_B2: {
    question:
      'How useful is Source A for an enquiry into the design and defensive layout of the British trench system on the Western Front?',
    content_inferences:
      'Source A is highly useful because it depicts the distinct saw-tooth, zig-zag traverses of frontline, support, and communication trenches criss-crossed with artillery craters. This allows us to infer that trenches were deliberately engineered with sharp right-angle bends to localise high-explosive shell bursts and prevent enfilade machine-gun fire from sweeping down the entire line if enemy troops penetrated the parapet.',
    provenance_evaluation:
      'Official aerial reconnaissance photograph taken by the Royal Flying Corps Photographic Section near Ypres in 1917 (IWM Collection). Highly valuable operational military intelligence captured vertically to verify trench integrity and map enemy positions; while completely accurate in physical geography, its distant top-down perspective omits the human reality of deep mud, waterlogging, and soldier misery at ground level.',
    context_limitations:
      'From own knowledge, the British sector in Flanders had an exceptionally high water table and non-porous clay subsoil. Trenches could rarely be dug deeper than 2–3 feet without hitting water, requiring breastworks made of sandbags built upwards instead. The photograph shows the Ypres Salient, where British forces were overlooked on three sides by German artillery occupying the dominant Messines and Passchendaele ridges.',
  },
  L21_B3: {
    question:
      'How useful is Source B for an enquiry into the transport and evacuation difficulties caused by environmental conditions in the Ypres Salient?',
    content_inferences:
      'Source B is exceptionally useful because it shows British infantry wading through waist-deep, liquid mud and water along a collapsed communication trench, with duckboards submerged and revetment walls crumbling. This proves that moving troops, rations, ammunition, and wounded casualties between the frontline and rear support lines was severely obstructed by chronic waterlogging.',
    provenance_evaluation:
      'Official British War Office photograph taken by Lieutenant Ernest Brooks in Flanders during the Third Battle of Ypres (Passchendaele), 1917 (IWM Q 5935). Direct frontline visual evidence documenting authentic conditions; although official photographers were strictly censored from depicting corpses or military panic, the stark depiction of environmental destruction demonstrates the sheer physical ordeal endured by frontline personnel.',
    context_limitations:
      'From own knowledge, communication trenches were the sole lifeline for RAMC stretcher bearers carrying casualties back to Regimental Aid Posts. When trenches flooded, bearers were forced to climb onto the exposed parapet under direct sniper and machine-gun fire, or risk slipping off submerged duckboards where wounded men could drown in liquid mud before reaching medical assistance.',
  },

  // Lesson 22 (KT5.2: Trench Environment & Illnesses)
  L22_B2: {
    question:
      'How useful is Source A for an enquiry into the living conditions and health hazards faced by British soldiers in the frontline trenches of the Somme?',
    content_inferences:
      'Source A is very useful because it depicts exhausted infantrymen wrapped in rubberised waterproof groundsheets, sitting crowded together directly on wooden duckboards in a narrow trench while a sentry remains on watch. This shows that soldiers were constantly exposed to damp, cold, vermin, and sleep deprivation, relying on basic personal gear to ward off wet weather and trench foot.',
    provenance_evaluation:
      'Official War Office photograph taken by Lieutenant John Warwick Brooke at Ovillers-la-Boisselle during the Battle of the Somme, July 1916 (IWM Collection). Highly authentic contemporary record taken within days of the capture of Ovillers; it captures the grim, weary resignation of frontline soldiers, though it deliberately focuses on orderly rest and vigilant discipline rather than acute sickness, lice infestation, or shell shock.',
    context_limitations:
      'From own knowledge, standing for days in cold, waterlogged mud caused trench foot—a fungal and circulatory condition that could rapidly turn gangrenous and necessitate amputation. The British Army combated this through strict preventive discipline: mandatory daily foot inspections, rubbing feet with whale oil, and pairing soldiers to change into dry socks. Crowded conditions also caused epidemic trench fever, later discovered to be transmitted by body lice.',
  },
  L22_B4: {
    question:
      'How useful is Source B for an enquiry into the medical adaptations made by the RAMC to treat wounded soldiers in the Ypres Salient?',
    content_inferences:
      'Source B is highly useful because it shows RAMC orderlies and stretcher bearers outside the massive vaulted brick entrance of an Advanced Dressing Station built deep into the medieval city ramparts of Ypres. This reveals that the RAMC utilised existing historic urban fortifications to create underground, shell-proof medical shelters where wounded soldiers could be stabilised away from surface artillery bombardments.',
    provenance_evaluation:
      'Official British military photograph taken in the Ypres sector, c.1916 (IWM Q 10762). Reliable visual evidence illustrating how the RAMC adapted urban and military architecture for casualty care; as an official military record, it portrays an organised, functioning facility and omits the severe overcrowding, foul air, and agonizing surgical conditions experienced during major German offensives.',
    context_limitations:
      'From own knowledge, the Ramparts Dressing Station was located within the Lille Gate of Ypres, capable of sheltering hundreds of casualties and containing operating tables and rest stations. Because standard surface dressing stations in canvas tents or wood-and-earth dugouts were frequently obliterated by German heavy artillery, deep underground stations in Ypres and the chalk caves of Arras became indispensable links in the chain of evacuation.',
  },

  // Lesson 23 (KT5.3: Battlefield Trauma & Infection)
  L23_B2: {
    question:
      'How useful is Source A for an enquiry into the types of wound infections caused by battlefield conditions on the Western Front?',
    content_inferences:
      'Source A is exceptionally useful because it shows extensive tissue necrosis, swelling, and blackening in the lower limb of a soldier. This demonstrates the devastating impact of anaerobic bacterial infections like gas gangrene, where lack of oxygen and bacterial gas production rapidly destroyed muscular tissue and released fatal toxins into the bloodstream.',
    provenance_evaluation:
      'Official clinical medical case record compiled by the Royal Army Medical Corps and Medical Research Committee, c.1916 (Wellcome Collection RAMC 442/1). Highly objective, forensic clinical evidence produced by military doctors to document pathology and develop surgical treatment protocols; because it is an individual clinical case, it does not show the frontline trench conditions where the wound was contracted.',
    context_limitations:
      'From own knowledge, the intensive agricultural fertilisation of French and Belgian soil meant it was saturated with bacteria (Clostridium welchii and tetanus spores). When high-explosive shrapnel drove dirty uniform cloth and soil deep into jagged wounds, closed anaerobic pockets formed. Because conventional antiseptics like carbolic acid were ineffective inside deep wounds, surgeons had to develop wound debridement (cutting away dead tissue) and the Carrel-Dakin antiseptic irrigation method.',
  },
  L23_B4: {
    question:
      'How useful is Source B for an enquiry into the protective measures adopted by the British Army against chemical gas attacks?',
    content_inferences:
      'Source B is very useful because it depicts a machine-gun crew firing a Vickers gun while wearing Phenate-Hexamine (PH) anti-gas hoods tucked into their tunics, fitted with glass eyepieces and an exhale flutter-valve. This reveals that the British Army developed specialized chemical-soaked fabric hoods to enable combat crews to maintain defensive fire during chemical gas bombardments.',
    provenance_evaluation:
      'Official War Office photograph taken by Lieutenant John Warwick Brooke near Ovillers, July 1916 (IWM Collection). Authentic battlefield evidence demonstrating contemporary protective equipment during the Somme offensive; while accurately showing the equipment, photographs of gas helmet use were often staged or taken during lulls to show British preparedness and reassure the domestic public.',
    context_limitations:
      'From own knowledge, the PH helmet was introduced in early 1916 to neutralise phosgene as well as chlorine gas (impregnated with phenate and hexamine). However, the fabric hood was hot, claustrophobic, and severely restricted peripheral vision and verbal communication. By late 1916, it was superseded by the Small Box Respirator (SBR), which had a separated filter canister and provided far superior protection, especially against blistering mustard gas introduced in 1917.',
  },

  // Lesson 24 (KT5.4: Chain of Evacuation)
  L24_B2: {
    question:
      'How useful is Source A for an enquiry into the challenges faced by the RAMC in evacuating casualties from the frontline?',
    content_inferences:
      'Source A is highly useful because it depicts six stretcher bearers struggling through knee-deep, liquid mud to carry a single wounded soldier on a canvas stretcher. This proves that the physical devastation of the battlefield required 50% more manpower than the standard four bearers per team, slowing casualty movement and exhausting frontline medical staff.',
    provenance_evaluation:
      'Official British War Office photograph taken by Lieutenant John Warwick Brooke at Boesinghe during the Third Battle of Ypres (Passchendaele), 1 August 1917 (IWM Collection). Highly valuable frontline record capturing authentic operational difficulties on the opening day of the offensive; as an official War Office photograph, it emphasises teamwork and resilience rather than medical despair or casualties dying before reaching aid.',
    context_limitations:
      'From own knowledge, the destruction of Flanders drainage canals by artillery fire created impassable swamps where wheeled transport could not operate. The chain of evacuation began with Regimental Stretcher Bearers (16 per battalion) carrying casualties to the Regimental Aid Post (RAP). Under these conditions, a 1-mile journey to an Advanced Dressing Station could take up to 6–10 hours, creating critical delays that led to shock and wound infection.',
  },
  L24_B5: {
    question:
      'How useful is Source B for an enquiry into the transport methods used to evacuate severe casualties to Base Hospitals on the Western Front?',
    content_inferences:
      'Source B is very useful because it shows a large canal barge converted into a floating hospital ward, equipped with canvas weather awnings, clean raised cots, and heating. This proves that the RAMC made extensive use of inland waterways to provide smooth, stable transport for severely wounded soldiers who could not survive rough road travel.',
    provenance_evaluation:
      'Official British military record photograph taken on northern French waterways, c.1916 (IWM Q 11048). Reliable visual documentation of specialised military-medical logistics; while it clearly demonstrates the spacious interior layout, it does not reveal the slow speed of water travel, which made barges unsuitable for emergency surgical cases requiring immediate operation.',
    context_limitations:
      'From own knowledge, motor ambulances and horse-drawn wagons on cratered roads caused violent jolting that reopened surgical sutures and induced fatal haemorrhaging or shock, especially in men with penetrating abdominal or skull wounds. The RAMC used 33 converted barges in France to transport post-operative casualties from Casualty Clearing Stations (CCS) directly to Base Hospitals in coastal ports like Le Havre, Boulogne, and Calais.',
  },

  // Lesson 25 (KT5.5: Surgical Breakthroughs & Thomas Splint)
  L25_B2: {
    question:
      'How useful is Source B for an enquiry into the provision of emergency surgical care at Casualty Clearing Stations on the Western Front?',
    content_inferences:
      'Source B is exceptionally useful because it depicts surgeons, anaesthetists, and QAIMNS nurses working simultaneously at multiple clean operating tables under electric lamps inside a large canvas hospital marquee. This proves that CCSs were equipped with advanced surgical facilities, sterile instruments, and professional nursing staff close to the front line.',
    provenance_evaluation:
      "Official War Office photograph taken at No. 47 Casualty Clearing Station, 1917 (IWM Q 6185). Highly informative official record depicting surgical capacity during a major offensive; commissioned to document RAMC efficiency, it presents an orderly, sterile operating room and does not show the chaotic backlog, triaged dying soldiers who were deemed beyond help (the 'moribund' ward), or overwhelming casualty surges.",
    context_limitations:
      'From own knowledge, Casualty Clearing Stations were situated around 7–12 miles behind the front, out of range of normal artillery but accessible by ambulance and rail. By 1917, CCSs performed the vast majority of emergency operations—including wound debridement, laparotomies (abdominal surgery), and amputations—because military doctors realised that operating within the first 12 hours was critical to preventing fatal sepsis and gas gangrene.',
  },
  L25_B3: {
    question:
      'How useful is Source A for an enquiry into surgical and mechanical innovations used to treat compound fractures on the Western Front?',
    content_inferences:
      'Source A is highly useful because it shows an authentic surviving British Army Thomas Splint, featuring an oval padded groin ring, two parallel steel rods, and canvas support straps. This illustrates the mechanical simplicity of the design, which maintained constant traction along the leg to prevent broken femur ends from grinding together, severing the femoral artery, or tearing soft tissue.',
    provenance_evaluation:
      'Authentic historical medical artefact preserved in the Wellcome Historical Medical Collection, London (Object No. A654128). Forensic physical evidence of the exact standardised medical device issued to British frontline units; as an isolated museum artefact, it does not demonstrate how it was applied under field conditions in muddy trenches by orderlies.',
    context_limitations:
      'From own knowledge, the Thomas Splint was designed by Hugh Owen Thomas in the 19th century but introduced to the Western Front in 1915–16 by his nephew, Robert Jones. Prior to its use, compound fractures of the femur had a mortality rate of approximately 80% due to catastrophic internal bleeding, shock, and infection. Once stretcher bearers were trained to apply the splint at the frontline before transport, the mortality rate plummeted to below 20%.',
  },

  // Lesson 26 (KT5.6: Lifesaving Innovations: Blood & Plastic Surgery)
  L26_B3: {
    question:
      'How useful is Source A for an enquiry into the development of blood storage and transfusion techniques on the Western Front?',
    content_inferences:
      'Source A is exceptionally useful because it shows the wooden transport chest, ice container, glass collection bottles, and rubber delivery tubes used by Captain Robertson. This reveals the creation of portable blood-storage kits that could be prepared in advance, kept cold, and deployed directly into frontline field stations to treat haemorrhagic shock.',
    provenance_evaluation:
      "Authentic historical medical equipment preserved in the Royal Army Medical Corps Museum Collection (Object No. RAMC-1917-BLD). Invaluable material evidence of the world's first field blood bank, designed and used by Captain Oswald Robertson during the Battle of Cambrai in November 1917; being an artefact, it does not demonstrate the biological risks, such as clotting failures or transfusion reactions, that occurred in practice.",
    context_limitations:
      'From own knowledge, earlier direct person-to-person transfusions (using Kimpton-Brown tubes) were slow and impossible during mass casualties. Breakthroughs by Hustin (1914) and Lewisohn (1915) using sodium citrate prevented clotting, while Rous and Turner (1916) discovered that adding dextrose allowed blood to be stored on ice for up to 28 days. Robertson put this into practice at Cambrai, treating 20 severely wounded soldiers, 11 of whom survived.',
  },
  L26_B5: {
    question:
      'How useful is Source B for an enquiry into innovations in reconstructive plastic surgery for soldiers wounded on the Western Front?',
    content_inferences:
      'Source B is highly useful because it demonstrates the surgical technique of cutting a flap of healthy skin from the chest or neck, rolling it into an enclosed tube, and stitching one end to facial wounds. This illustrates how surgeons maintained a continuous blood supply through the living tube until the graft took hold, preventing tissue necrosis and infection.',
    provenance_evaluation:
      "Clinical diagram and patient photographic record from Queen's Hospital, Sidcup, authored by Harold Gillies and his surgical team, c.1917 (Royal College of Surgeons Archive). Invaluable clinical documentation created by the pioneering surgeon himself to train other doctors in facial reconstruction; because it documents successful surgical innovation, it does not convey the immense psychological trauma, social ostracisation, and years of painful repeated operations endured by disfigured soldiers.",
    context_limitations:
      "From own knowledge, trench warfare caused unprecedented numbers of severe facial injuries because soldiers peered over parapets into bullet and shrapnel fire. In 1917, Harold Gillies established the specialised Queen's Hospital at Sidcup, which treated over 11,000 men. Gillies developed the 'tubed pedicle' method specifically because free skin grafts frequently failed due to poor vascularisation in scarred, infected tissue.",
  },
};

// 1. Read from data/edexcel_medicine.json (master with all 26 lessons)
const masterJsonPath = path.join(__dirname, '..', 'data', 'edexcel_medicine.json');
const masterData = JSON.parse(fs.readFileSync(masterJsonPath, 'utf8'));

let matchCount = 0;
masterData.lessons.forEach((l, lIdx) => {
  const lNum = lIdx + 1;
  (l.narrative_blocks || []).forEach((b, bIdx) => {
    const bNum = bIdx + 1;
    const key = `L${lNum}_B${bNum}`;
    if (westernFrontUtilityData[key] && b.source) {
      b.source.utility_enquiry = {
        exam_label: 'Edexcel Paper 1 • Q2(a) Source Utility Enquiry [8 Marks]',
        ...westernFrontUtilityData[key],
      };
      matchCount++;
      console.log(
        `Updated: ${key} -> ${b.source.title.slice(0, 45)}... with Edexcel Paper 1 Utility Triad.`,
      );
    }
  });
});
console.log(`Matched and injected ${matchCount} utility enquiries.`);

// Write back to data/edexcel_medicine.json
fs.writeFileSync(masterJsonPath, JSON.stringify(masterData, null, 2), 'utf8');
console.log('✅ Successfully wrote to data/edexcel_medicine.json');

// 2. Update units/edexcel_medicine/data.js and public/units/edexcel_medicine/data.js
const unitJsContent = 'export const unitData = ' + JSON.stringify(masterData, null, 2) + ';\n';
const unitJsPath = path.join(__dirname, '..', 'units', 'edexcel_medicine', 'data.js');
fs.writeFileSync(unitJsPath, unitJsContent, 'utf8');
console.log('✅ Successfully synced into units/edexcel_medicine/data.js');

const publicUnitJsPath = path.join(
  __dirname,
  '..',
  'public',
  'units',
  'edexcel_medicine',
  'data.js',
);
if (fs.existsSync(path.dirname(publicUnitJsPath))) {
  fs.writeFileSync(publicUnitJsPath, unitJsContent, 'utf8');
  console.log('✅ Successfully synced into public/units/edexcel_medicine/data.js');
}

// 3. Update public/data/edexcel_medicine.json
const pubJsonPath = path.join(__dirname, '..', 'public', 'data', 'edexcel_medicine.json');
let pubJson = {};
if (fs.existsSync(pubJsonPath)) {
  try {
    pubJson = JSON.parse(fs.readFileSync(pubJsonPath, 'utf8'));
  } catch (e) {}
}
pubJson.data = masterData;
fs.writeFileSync(pubJsonPath, JSON.stringify(pubJson, null, 2), 'utf8');
console.log('✅ Successfully wrote to public/data/edexcel_medicine.json');

// 4. Update public/database.json
const dbPath = path.join(__dirname, '..', 'public', 'database.json');
if (fs.existsSync(dbPath)) {
  const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  if (!dbData.edexcel_medicine) dbData.edexcel_medicine = {};
  dbData.edexcel_medicine.data = masterData;
  fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2), 'utf8');
  console.log('✅ Successfully synced into public/database.json');
}
