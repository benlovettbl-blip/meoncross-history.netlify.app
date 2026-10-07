const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'units', 'edexcel_medicine', 'data.js');
let content = fs.readFileSync(dataPath, 'utf8');

// Define the vetted videos for each lesson index (0-indexed, 0 to 25)
const vettedVideos = [
  // L1: KT1.1
  [
    {
      url: 'https://www.youtube.com/watch?v=nVJV8iEAm88',
      title: '[STARTER HOOK] Medieval Beliefs: The Church, Galen & Supernatural Causes',
      duration: '4 mins 20 secs',
      teacher_guidance:
        "Concise classroom hook explaining why medieval people believed illness was a punishment from God or testing of faith, and how the Church preserved Galen's texts.",
    },
    {
      url: 'https://era.org.uk/streaming-service-resource/1-medicine-and-religion-history-file/',
      title: '[EXAM EXTENSION] History File: Medicine and Religion in the Middle Ages (BBC Two)',
      duration: '24 mins 2 secs',
      teacher_guidance:
        '⏱️ Watch Window: 00:00–07:15. Primary focus on monastic scriptoria, church control of medical education, and Galenic doctrine. (Later segments cover ancient origins).',
    },
  ],

  // L2: KT1.2
  [
    {
      url: 'https://www.youtube.com/watch?v=nVJV8iEAm88',
      title: '[STARTER HOOK] Medieval Rational Medicine: The Four Humours & Galen',
      duration: '4 mins 20 secs',
      teacher_guidance:
        "Overview of Hippocratic clinical observation, the Four Humours (blood, phlegm, yellow bile, black bile), and Galen's Theory of Opposites.",
    },
    {
      url: 'https://era.org.uk/streaming-service-resource/bbc-four-the-beauty-of-anatomy-galen-and-leonardo-galenic-anatomy/',
      title: '[ENQUIRY EVIDENCE] BBC Four: Galenic Anatomy & Blood Movement',
      duration: '5 mins 7 secs',
      teacher_guidance:
        'Dr Adam Rutherford explores Galen’s anatomical doctrines and why nobody challenged his errors on animal dissection for over 1,300 years.',
    },
  ],

  // L3: KT1.3
  [
    {
      url: 'https://era.org.uk/streaming-service-resource/3-medicine-women-and-society-history-file/',
      title: '[ENQUIRY EVIDENCE] History File: Medieval Treatments, Bleeding & Society (BBC Two)',
      duration: '19 mins 2 secs',
      teacher_guidance:
        '⏱️ Watch Window: 02:10–07:45. Shows the practical reality of phlebotomy (bloodletting), leeching, purging, cupping, and zodiac charts used by medieval barber-surgeons.',
    },
  ],

  // L4: KT1.4
  [
    {
      url: 'https://era.org.uk/streaming-service-resource/4-medicine-and-long-term-change-history-file/',
      title: '[ENQUIRY EVIDENCE] History File: Monastic Hospitals & "Care Not Cure" (BBC Two)',
      duration: '18 mins 48 secs',
      teacher_guidance:
        "⏱️ Watch Window: 03:30–09:15. Case study of St Leonard’s Hospital in York, illustrating monastic care, prayer, and why medical curing was not the hospital's priority.",
    },
  ],

  // L5: KT1.5
  [
    {
      url: 'https://www.youtube.com/watch?v=YhsPPBGtquo',
      title: '[STARTER HOOK] Timelines.tv: The Black Death (1348)',
      duration: '6 mins 33 secs',
      teacher_guidance:
        'Dramatic classroom overview of the arrival of the bubonic and pneumonic plague in Melcombe Regis (Dorset) in 1348 and its catastrophic demographic impact.',
    },
    {
      url: 'https://era.org.uk/streaming-service-resource/bbc-two-a-history-of-britain-by-simon-schama-series-1-king-death-the-symptoms-of-black-death-and-how-it-spread/',
      title: '[PRIMARY EVIDENCE] Simon Schama: King Death – Symptoms & Spread (BBC Two)',
      duration: '2 mins 28 secs',
      teacher_guidance:
        'Historian Simon Schama details the biological symptoms (buboes, black spots) and the rapid, terrifying speed of contagion.',
    },
    {
      url: 'https://era.org.uk/streaming-service-resource/bbc-two-a-history-of-britain-by-simon-schama-series-1-king-death-medieval-treatment-and-beliefs-on-the-cause-of-the-black-death/',
      title:
        '[ENQUIRY EVIDENCE] Simon Schama: Medieval Beliefs & Responses to the Plague (BBC Two)',
      duration: '2 mins 12 secs',
      teacher_guidance:
        'Visual demonstration of flagellants, burning of aromatic herbs, and the religious panic that swept medieval Europe.',
    },
  ],

  // L6: KT2.1
  [
    {
      url: 'https://www.youtube.com/watch?v=walfj2dpU-E',
      title: '[STARTER HOOK] The Renaissance Scientific Revolution: Gutenberg & The Royal Society',
      duration: '4 mins 30 secs',
      teacher_guidance:
        'How the movable type printing press (1440) and the Royal Society\'s motto "Nullius in Verba" (1660) broke the Catholic Church\'s monopoly on medical knowledge.',
    },
  ],

  // L7: KT2.2
  [
    {
      url: 'https://www.youtube.com/watch?v=7pjAH84f-c0',
      title: '[STARTER HOOK] Thomas Sydenham: "The English Hippocrates" & Bedside Observation',
      duration: '5 mins 40 secs',
      teacher_guidance:
        'Examines how Thomas Sydenham classified diseases as distinct species in "Observationes Medicae" (1676) and pioneered cinchona bark (quinine) for malaria.',
    },
  ],

  // L8: KT2.3
  [
    {
      url: 'https://era.org.uk/streaming-service-resource/bbc-four-the-beauty-of-anatomy-andreas-vesalius-the-muscle-men/',
      title:
        '[PRIMARY EVIDENCE] BBC Four: Andreas Vesalius – The Muscle Men (The Beauty of Anatomy)',
      duration: '3 mins 8 secs',
      teacher_guidance:
        'Visual analysis of the iconic anatomical woodcuts in "De Humani Corporis Fabrica" (1543) and Vesalius\'s correction of over 200 of Galen’s anatomical errors.',
    },
    {
      url: 'https://www.youtube.com/watch?v=walfj2dpU-E',
      title: "[STARTER HOOK] Vesalius & Human Dissection: Challenging Galen's Anatomy",
      duration: '4 mins 30 secs',
      teacher_guidance:
        'How Vesalius carried out dissections himself at Padua, proving Galen had only dissected apes and pigs (e.g. human lower jaw is one bone, not two).',
    },
  ],

  // L9: KT2.4
  [
    {
      url: 'https://www.youtube.com/watch?v=w6q50_qNMoA',
      title: "[STARTER HOOK] Ceaseless Motion: William Harvey's Blood Circulation Experiments",
      duration: '3 mins 18 secs',
      teacher_guidance:
        "Royal College of Physicians animation demonstrating Harvey's mechanical experiments with tight arm bandages, valves, and the heart as a pump.",
    },
    {
      url: 'https://www.youtube.com/watch?v=LoeAVaM48Y0',
      title: '[ENQUIRY EVIDENCE] William Harvey: De Motu Cordis (1628) & Mathematical Proof',
      duration: '4 mins 12 secs',
      teacher_guidance:
        'Detailed breakdown of how Harvey calculated the volume of blood pumped by the heart in an hour, disproving Galen’s theory that liver manufactures new blood.',
    },
  ],

  // L10: KT2.5
  [
    {
      url: 'https://www.youtube.com/watch?v=7r15ej0iN1k',
      title: '[EXAM STRATEGY] GCSE History: The Great Plague 1665 & Comparing 1348 vs 1665',
      duration: '12 mins 2 secs',
      teacher_guidance:
        'Direct preparation for Edexcel Paper 1 4-mark similarity/difference questions comparing plague orders, government action, and medical understanding.',
    },
  ],

  // L11: KT3.1
  [
    {
      url: 'https://era.org.uk/streaming-service-resource/bbc-four-medical-mavericks-series-1-beating-infection-robert-koch-cholera/',
      title: '[ENQUIRY EVIDENCE] BBC Medical Mavericks: Robert Koch & Microbe Hunting',
      duration: '3 mins 12 secs',
      teacher_guidance:
        "Demonstrates Robert Koch's laboratory innovations: using agar jelly in petri dishes, chemical methylene blue staining, and microphotography to isolate the anthrax, TB, and cholera bacteria.",
    },
    {
      url: 'https://era.org.uk/streaming-service-resource/2-medicine-and-science-history-file/',
      title:
        '[EXAM EXTENSION] History File: Medicine and Science – Germ Theory & Bacteriology (BBC Two)',
      duration: '24 mins 8 secs',
      teacher_guidance:
        "⏱️ Watch Window: 12:40–18:15. Skip straight to 12:40 for Pasteur’s swan-neck flask experiments disproving spontaneous generation and Koch's competition. (00:00–12:40 covers earlier centuries).",
    },
  ],

  // L12: KT3.2
  [
    {
      url: 'https://era.org.uk/streaming-service-resource/jenners-marvellous-medicine-a-history-of-the-world/',
      title:
        "[STARTER HOOK] Jenner's Marvellous Medicine: Milkmaids, Cowpox & The 1796 Breakthrough",
      duration: '15 mins 0 secs',
      teacher_guidance:
        'Explores how Edward Jenner tested folklore about milkmaids and inoculated James Phipps with cowpox matter in 1796 to prove immunity against smallpox.',
    },
    {
      url: 'https://era.org.uk/streaming-service-resource/bbc-two-true-stories-episode-2-the-life-and-work-of-edward-jenner/',
      title:
        '[ENQUIRY EVIDENCE] BBC Two True Stories: The Opposition to Jenner & Compulsory Vaccination',
      duration: '20 mins 0 secs',
      teacher_guidance:
        "Investigates why the Royal Society and the Anti-Vaccine League fiercely opposed Jenner's vaccine, leading to the 1853 Compulsory Vaccination Act.",
    },
  ],

  // L13: KT3.3
  [
    {
      url: 'https://era.org.uk/streaming-service-resource/florence-nightingale-nursing-pioneer/',
      title: '[STARTER HOOK] Florence Nightingale: Hospital Architecture & The Sanitary Revolution',
      duration: '15 mins 0 secs',
      teacher_guidance:
        'Focuses on Nightingale’s work at Scutari Hospital (Crimea), her "Notes on Nursing" (1859), and the design of pavilion-style hospitals with ventilation and clean water.',
    },
    {
      url: 'https://era.org.uk/streaming-service-resource/bbc-four-the-beauty-of-diagrams-florence-nightingale-florence-nightingales-rose-diagram/',
      title: "[ENQUIRY EVIDENCE] BBC Four: Florence Nightingale's Polar Area Rose Diagram",
      duration: '29 mins 0 secs',
      teacher_guidance:
        "⏱️ Watch Window: 04:10–09:30. In-depth analysis of Nightingale's revolutionary statistical diagram proving that the vast majority of soldiers died from preventable hospital diseases, not wounds.",
    },
  ],

  // L14: KT3.4
  [
    {
      url: 'https://www.youtube.com/watch?v=7pjAH84f-c0',
      title: '[STARTER HOOK] 18th & 19th Century Surgery: Overcoming Pain, Infection & Blood Loss',
      duration: '5 mins 40 secs',
      teacher_guidance:
        'Concise classroom summary of the "Black Period" of surgery, James Simpson’s chloroform experiments (1847), and Queen Victoria\'s use of chloroform in childbirth (1853).',
    },
    {
      url: 'https://era.org.uk/streaming-service-resource/5-medicine-and-surgery-history-file/',
      title: '[ENQUIRY EVIDENCE] History File: Joseph Lister & Antiseptic Surgery (BBC Two)',
      duration: '24 mins 0 secs',
      teacher_guidance:
        "⏱️ Watch Window: 08:30–14:45. Reconstructs Lister’s use of carbolic acid spray in the Glasgow Royal Infirmary operating theatre after reading Pasteur's germ theory.",
    },
  ],

  // L15: KT3.5
  [
    {
      url: 'https://www.youtube.com/watch?v=TT4Z1Ikf36w',
      title: '[STARTER HOOK] Chadwick and Snow: The 19th Century Public Health Crisis',
      duration: '4 mins 52 secs',
      teacher_guidance:
        "Contrasts Edwin Chadwick's 1842 report on sanitary conditions with John Snow's breakthrough during the 1854 Soho cholera outbreak.",
    },
    {
      url: 'https://era.org.uk/streaming-service-resource/the-story-of-john-snow-moments-of-genius/',
      title: '[PRIMARY EVIDENCE] Moments of Genius: John Snow & The Broad Street Pump',
      duration: '8 mins 32 secs',
      teacher_guidance:
        "The forensic investigation of the Broad Street water pump, the removal of the pump handle, and Snow's spot map disproving the miasma theory.",
    },
    {
      url: 'https://era.org.uk/streaming-service-resource/2-medicine-public-health-and-government-history-file/',
      title: '[EXAM EXTENSION] History File: Public Health & The 1875 Act (BBC Two)',
      duration: '24 mins 0 secs',
      teacher_guidance:
        '⏱️ Watch Window: 14:20–19:10. The Great Stink (1858), Bazalgette’s sewer network, and the shift from laissez-faire to the compulsory Public Health Act 1875.',
    },
  ],

  // L16: KT4.1
  [
    {
      url: 'https://www.youtube.com/watch?v=my14ZuzjH5I',
      title: '[STARTER HOOK] Modern Medicine: DNA, Genetics & Diagnosis',
      duration: '5 mins 15 secs',
      teacher_guidance:
        'The discovery of the DNA double helix (Watson, Crick, Franklin 1953) and the Human Genome Project (completed 2003) enabling targeted genetic screening.',
    },
    {
      url: 'https://era.org.uk/streaming-service-resource/5-medicine-technology-and-the-individual-history-file/',
      title: '[EXAM EXTENSION] History File: 20th Century Technology & Genetics (BBC Two)',
      duration: '24 mins 0 secs',
      teacher_guidance:
        '⏱️ Watch Window: 08:15–13:40. Explores genetic testing, hereditary disease prevention, and ethical questions in modern biotechnology.',
    },
  ],

  // L17: KT4.2
  [
    {
      url: 'https://www.youtube.com/watch?v=my14ZuzjH5I',
      title: '[STARTER HOOK] High-Tech Diagnosis: X-rays, CT Scans, MRI & Endoscopes',
      duration: '5 mins 15 secs',
      teacher_guidance:
        "How medical diagnosis shifted from external observation to internal non-invasive imaging: Röntgen's X-rays (1895), ultrasound, CT scans (1972), and MRI.",
    },
    {
      url: 'https://era.org.uk/streaming-service-resource/into-the-brain-blood-and-guts-a-history-of-surgery/',
      title: '[ENQUIRY EVIDENCE] BBC Four: Blood and Guts – Into the Brain (High-Tech Surgery)',
      duration: '58 mins 0 secs',
      teacher_guidance:
        '⏱️ Watch Window: 32:00–37:45. Shows micro-surgery, stereotactic imaging, and endoscopes allowing surgeons to operate inside the brain without opening the entire cranium.',
    },
  ],

  // L18: KT4.3
  [
    {
      url: 'https://era.org.uk/streaming-service-resource/pain-pus-and-poison-the-search-for-modern-medicine-viruses-and-vaccines-bbc-four/',
      title: '[STARTER HOOK] Paul Ehrlich, Salvarsan 606 & Prontosil (Magic Bullets)',
      duration: '5 mins 30 secs',
      teacher_guidance:
        '⏱️ Watch Window: 18:20–23:50. Explains how Ehrlich used chemical antibodies to target specific bacteria, creating the first "magic bullet" (Salvarsan 606 for syphilis) and Domagk\'s Prontosil (1932).',
    },
    {
      url: 'https://era.org.uk/streaming-service-resource/bbc-two-exploring-the-past-post-war-britain-post-war-britain-the-development-of-the-national-health-service-nhs/',
      title: '[ENQUIRY EVIDENCE] BBC Two: Aneurin Bevan & The Launch of the NHS (1948)',
      duration: '18 mins 0 secs',
      teacher_guidance:
        '⏱️ Watch Window: 00:00–06:30. The Beveridge Report (1942), overcoming doctor opposition by "stuffing their mouths with gold", and the founding of free healthcare at the point of delivery.',
    },
  ],

  // L19: KT4.4
  [
    {
      url: 'https://era.org.uk/streaming-service-resource/pain-pus-and-poison-the-search-for-modern-medicine-discovery-of-penicillin-bbc-four/',
      title: '[STARTER HOOK] The Discovery & Mass Production of Penicillin (BBC Four)',
      duration: '22 mins 0 secs',
      teacher_guidance:
        '⏱️ Watch Window: 04:30–10:15. Fleming’s untidy petri dish (1928), Florey & Chain’s Oxford lab apparatus, and US industrial fermentation tanks during WWII.',
    },
    {
      url: 'https://era.org.uk/streaming-service-resource/breaking-the-mould-the-story-of-penicillin/',
      title: '[DRAMA EXTENSION] BBC Drama: Breaking the Mould – The Albert Alexander Trial (1941)',
      duration: '82 mins 0 secs',
      teacher_guidance:
        "⏱️ Watch Window: 42:15–48:30. The dramatic first human trial on police constable Albert Alexander, showing penicillin's miraculous effect and the tragedy of running out of supply.",
    },
  ],

  // L20: KT4.5
  [
    {
      url: 'https://www.youtube.com/watch?v=tlNtakmOOho',
      title: '[STARTER HOOK] GCSE History: Modern Medicine – Government & Lung Cancer',
      duration: '7 mins 10 secs',
      teacher_guidance:
        'The shift from infectious diseases to lifestyle illnesses: Richard Doll and Austin Bradford Hill’s 1950 epidemiological study linking smoking to cancer, followed by public health bans and modern radiotherapy.',
    },
  ],

  // L21: KT5.1
  [
    {
      url: 'https://era.org.uk/streaming-service-resource/4-medicine-and-war-history-file/',
      title: '[EXAM EXTENSION] History File: Medicine and War – The Western Front (BBC Two)',
      duration: '24 mins 0 secs',
      teacher_guidance:
        '⏱️ Watch Window: 03:10–08:45. Geography of the British sector: the Ypres Salient, underground tunnels at Arras, shell craters at the Somme, and tank warfare at Cambrai.',
    },
    {
      url: 'https://www.youtube.com/watch?v=bSPh5Jgx_wY',
      title: '[STARTER HOOK] Simple History: Life in the Frontline Trenches',
      duration: '3 mins 32 secs',
      teacher_guidance:
        "Animated introduction to trench architecture: fire step, duckboards, traverse, communication trenches, and the dangers of No Man's Land.",
    },
  ],

  // L22: KT5.2
  [
    {
      url: 'https://www.youtube.com/watch?v=bSPh5Jgx_wY',
      title: '[STARTER HOOK] Simple History: Day in the Life of a WW1 Soldier',
      duration: '3 mins 32 secs',
      teacher_guidance:
        'The daily routine of trench life: stand-to at dawn, trench maintenance, bully beef rations, and constant sniper vigilance.',
    },
    {
      url: 'https://www.youtube.com/watch?v=x8OazQml0gw',
      title: '[PRIMARY EVIDENCE] Dan Snow: Trench Foot, Lice & Shell Shock (BBC WW1 Uncut)',
      duration: '4 mins 45 secs',
      teacher_guidance:
        'Direct exploration of non-combat conditions: whale oil and dry socks for trench foot, delousing stations for trench fever, and the medical stigma of shell shock (NYDN).',
    },
  ],

  // L23: KT5.3
  [
    {
      url: 'https://www.youtube.com/watch?v=x8OazQml0gw',
      title: '[STARTER HOOK] Infections, Shrapnel & Gas – WW1 Uncut with Dan Snow (BBC)',
      duration: '4 mins 45 secs',
      teacher_guidance:
        'Dan Snow demonstrates the devastating physical effects of artillery shrapnel balls, heavily manured soil causing gas gangrene, and chlorine/phosgene/mustard gas burns.',
    },
  ],

  // L24: KT5.4
  [
    {
      url: 'https://www.youtube.com/watch?v=4xKWnE63E8U',
      title: '[STARTER HOOK] How the RAMC Worked: The Chain of Evacuation Explained',
      duration: '6 mins 12 secs',
      teacher_guidance:
        'Explains the full sequence: Stretcher Bearers → Regimental Aid Post (RAP) → Advanced Dressing Station (ADS) → Casualty Clearing Station (CCS) → Base Hospital.',
    },
    {
      url: 'https://www.youtube.com/watch?v=TTaoz0YVO2Y',
      title: '[ENQUIRY EVIDENCE] Andy Robertshaw: Inside the Casualty Clearing Station (CCS)',
      duration: '5 mins 20 secs',
      teacher_guidance:
        'Historian Andy Robertshaw reconstructs the triage system inside a frontline CCS, determining who was treated immediately, sent to Base Hospital, or made comfortable.',
    },
    {
      url: 'https://www.youtube.com/watch?v=xsz0-8-qAi8',
      title: '[PRIMARY ARCHIVE] Somme 1916: Authentic Advanced Dressing Station Archival Film',
      duration: '3 mins 45 secs',
      teacher_guidance:
        'Restored 1916 imperial war footage showing walking wounded arriving at an Advanced Dressing Station near Minden Post during the Battle of the Somme.',
    },
  ],

  // L25: KT5.5
  [
    {
      url: 'https://era.org.uk/streaming-service-resource/carrel-dakin-method-the-crimson-field/',
      title: '[ENQUIRY EVIDENCE] The Crimson Field: Carrel-Dakin Antiseptic Method & Debridement',
      duration: '8 mins 0 secs',
      teacher_guidance:
        'Dramatisation of frontline military surgery: wound debridement (cutting away dead tissue) and continuous irrigation with sodium hypochlorite (Carrel-Dakin method) to defeat gas gangrene.',
    },
    {
      url: 'https://www.youtube.com/watch?v=4xKWnE63E8U',
      title: '[STARTER HOOK] The Thomas Splint & Mobile X-Ray Units on the Frontline',
      duration: '4 mins 15 secs',
      teacher_guidance:
        "How Robert Jones introduced his uncle's Thomas Splint in 1915, stabilizing fractured femurs during transit and reducing mortality from 80% to under 20%.",
    },
  ],

  // L26: KT5.6
  [
    {
      url: 'https://era.org.uk/streaming-service-resource/fixing-faces-blood-and-guts-a-history-of-surgery/',
      title:
        "[ENQUIRY EVIDENCE] Harold Gillies & Queen's Hospital Sidcup: Pioneering Plastic Surgery (BBC Four)",
      duration: '12 mins 0 secs',
      teacher_guidance:
        'Explores the work of Harold Gillies developing the pedicle tube skin graft at Sidcup, reconstructing severe facial shrapnel wounds for over 11,000 soldiers.',
    },
    {
      url: 'https://www.youtube.com/watch?v=4xKWnE63E8U',
      title:
        "[STARTER HOOK] Blood Transfusions: Sodium Citrate & Robertson's Blood Depot at Cambrai (1917)",
      duration: '4 mins 30 secs',
      teacher_guidance:
        'How Landsteiner’s ABO blood groups (1901), Lewisohn’s sodium citrate anticoagulant (1915), and Francis Rous’s dextrose storage allowed Oswald Robertson to establish the first blood depot at Cambrai.',
    },
  ],
];

// Helper to format a video object nicely into JS code
function formatVideoBlock(videoList) {
  let out = '      video: [\n';
  videoList.forEach((v) => {
    out += '        {\n';
    out += `          url: '${v.url}',\n`;
    out += `          title: '${v.title.replace(/'/g, "\\'")}',\n`;
    out += `          duration: '${v.duration}',\n`;
    out += `          teacher_guidance:\n            '${v.teacher_guidance.replace(/'/g, "\\'")}',\n`;
    out += '        },\n';
  });
  out += '      ],';
  return out;
}

// Find all matches of `video: [ ... ],`
const matches = [...content.matchAll(/video:\s*\[([\s\S]*?)\]\s*,/g)];
if (matches.length !== 26) {
  console.error(`Expected 26 video blocks, found ${matches.length}`);
  process.exit(1);
}

// Replace in reverse order so character indices remain valid
for (let i = matches.length - 1; i >= 0; i--) {
  const match = matches[i];
  const replacement = formatVideoBlock(vettedVideos[i]);
  content =
    content.slice(0, match.index) + replacement + content.slice(match.index + match[0].length);
}

fs.writeFileSync(dataPath, content, 'utf8');
console.log(
  '🎉 Successfully realigned all 26 lesson video blocks in units/edexcel_medicine/data.js!',
);
