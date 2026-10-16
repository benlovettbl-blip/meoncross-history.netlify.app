/**
 * Master Compiler: Builds units/water_and_sanitation/data.js
 * Assembles all 6 lessons from scripts/ws_5block_builder/
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..', '..');
const targetFile = path.join(ROOT_DIR, 'units', 'water_and_sanitation', 'data.js');

const l1 = require('./lesson_1.cjs');
const l2 = require('./lesson_2.cjs');
const l3 = require('./lesson_3.cjs');
const l4 = require('./lesson_4.cjs');
const l5 = require('./lesson_5.cjs');
const l6 = require('./lesson_6.cjs');

const water_and_sanitation = {
  id: 'water_and_sanitation',
  edition: '2026.1',
  title: 'KS3: Water and Sanitation Through Time',
  short_title: 'Water & Sanitation',
  period: 'c.AD 43–Present',
  enquiry: 'Why did it take so long to clean up Britain?',
  description:
    'From Roman aqueducts and medieval cesspits to the Great Stink of 1858 and John Snow’s Broad Street pump, explore how two millennia of engineering triumphs, devastating epidemics, and scientific breakthroughs transformed public health in Britain.',
  cover_image: '/images/john_snow_cholera_map.jpg',
  homepage_background: '/images/john_snow_cholera_map.jpg',
  color: '#0288d1',
  is_ks3: true,
  year_group: 'Year 7',

  debatePrompts: [
    {
      title: 'Roman Public Health',
      prompt:
        '<strong>Debate:</strong> Did the Romans build complex aqueducts and bathhouses because they actually understood how disease spread, or just because they liked feeling clean and showing off their imperial wealth?',
    },
    {
      title: 'Medieval Public Health',
      prompt:
        '<strong>Roleplay:</strong> You are a medieval town councilor. The Black Death is approaching. Defend your decision to clean the streets of rotting animals and fine butchers for dumping waste, rather than just praying.',
    },
    {
      title: 'The Great Stink',
      prompt:
        "<strong>Debate:</strong> 'It wasn't cholera or John Snow that forced the government to build London's sewers, it was simply the overwhelming smell of the River Thames outside Parliament.' Do you agree? Argue your case.",
    },
  ],

  timeline: [
    {
      year: 'c.AD 75',
      title: 'Roman Aqueducts & Fishbourne Lead Pipes',
      description:
        'Romans construct monumental gravity-fed aqueducts and public thermae, laying jointed lead pipes at Fishbourne Palace.',
      dual_coding_prompt:
        'Draw a multi-arched stone aqueduct bridge crossing a valley with flowing water.',
    },
    {
      year: 'c.1165',
      title: 'Canterbury Monastic Conduits & Settling Tanks',
      description:
        'Monk Wibert designs five settling tanks and lead conduits to bring filtered spring water to Christ Church Priory.',
      dual_coding_prompt: 'Draw five rectangular stone water tanks connected by lead pipes.',
    },
    {
      year: '1348',
      title: 'The Black Death Pandemic',
      description:
        'Bubonic plague arrives in Dorset ports and kills up to 50% of the English population; doctors blame miasma and divine wrath.',
      dual_coding_prompt: 'Draw a medieval town gate locked with chains and an infected red cross.',
    },
    {
      year: '1596',
      title: 'Sir John Harington: The Flush Toilet',
      description:
        'Elizabeth I’s godson invents the world’s first valve-operated flushing water closet, though lack of running water prevents wide adoption.',
      dual_coding_prompt:
        'Draw a high overhead cistern tank with a pull lever flushing into a pan.',
    },
    {
      year: '1831',
      title: 'Asiatic Cholera & Industrial Boomtowns',
      description:
        'Cholera arrives in Sunderland, spreading rapidly through back-to-back slum housing and sewage-contaminated wells.',
      dual_coding_prompt:
        'Draw a row of back-to-back terraced houses sharing three walls without windows.',
    },
    {
      year: '1858',
      title: 'The Great Stink & Bazalgette’s Sewers',
      description:
        'A heatwave turns the Thames into an unbearable sewer, driving MPs from Parliament and funding 82 miles of brick intercepting sewers.',
      dual_coding_prompt: 'Draw an egg-shaped brick underground sewer tunnel with flowing water.',
    },
    {
      year: '1854–1884',
      title: 'John Snow, Germ Theory & Robert Koch',
      description:
        'John Snow maps the Broad Street pump, Pasteur proves Germ Theory in 1861, and Koch isolates Vibrio cholerae under the microscope in 1884.',
      dual_coding_prompt:
        'Draw a street water pump with its iron handle removed and a cholera spot map.',
    },
  ],

  key_individuals: [
    {
      id: 'snow',
      name: 'Dr John Snow',
      role: 'Physician & Epidemiologist',
      image: '/images/john_snow_cholera_map.jpg',
      bio: 'Pioneered modern epidemiology by mapping the 1854 Soho cholera outbreak to the Broad Street pump, proving water-borne transmission.',
    },
    {
      id: 'chadwick',
      name: 'Edwin Chadwick',
      role: 'Social Reformer & Civil Servant',
      image: '/images/chadwick.jpg',
      bio: 'Published the landmark 1842 Sanitary Report proving squalor caused disease, poverty, and high poor-relief taxes, leading to the 1848 Public Health Act.',
    },
    {
      id: 'bazalgette',
      name: 'Sir Joseph Bazalgette',
      role: 'Chief Civil Engineer',
      image: '/images/bazalgette.jpg',
      bio: 'Designed and constructed London’s monumental 82-mile underground intercepting sewer network between 1859 and 1865, eliminating water-borne cholera.',
    },
    {
      id: 'pasteur',
      name: 'Louis Pasteur',
      role: 'Chemist & Microbiologist',
      image: '/images/pasteur_swan_neck.jpg',
      bio: 'Disproved spontaneous generation with his 1861 swan-neck flask experiments and proved Germ Theory: that living bacteria cause disease.',
    },
    {
      id: 'pepys',
      name: 'Samuel Pepys',
      role: 'Naval Administrator & Diarist',
      image: '/images/pepys.jpg',
      bio: 'Kept a vivid 1660s diary documenting the Great Plague of 1665 and the squalor of his basement flooded with a neighbour’s overflowing cesspit.',
    },
    {
      id: 'harington',
      name: 'Sir John Harington',
      role: 'Courtier & Inventor',
      image: '/images/harington.jpg',
      bio: 'Godson to Queen Elizabeth I who invented the first mechanical valve-operated flushing water closet in 1596.',
    },
    {
      id: 'myddelton',
      name: 'Sir Hugh Myddelton',
      role: 'Goldsmith & Entrepreneur',
      image: '/images/myddelton.jpg',
      bio: 'Financed and built the 38-mile New River canal in 1613, bringing fresh Hertfordshire spring water into London.',
    },
    {
      id: 'faraday',
      name: 'Michael Faraday',
      role: 'Scientist & Chemist',
      image: '/images/faraday.jpg',
      bio: 'Published an influential 1855 letter to The Times demonstrating that the Thames was an opaque, fermenting sewer of human excrement.',
    },
  ],

  workbooks: [
    {
      id: 'full',
      name: 'full',
      title: 'Complete Unit',
    },
  ],

  lessons: [l1, l2, l3, l4, l5, l6],
};

// Write output
const fileContent = `/**
 * History Revision Hub — Master 5-Block Decimal Curriculum
 * Key Stage 3 Year 7 • Water & Sanitation Through Time
 * 
 * Commercial Neutrality: 100% Institutional-neutral.
 * Architecture: 5-Stage Decimal Standard (1.1 to 1.5) with Inline Evidential Sources
 */

const water_and_sanitation = ${JSON.stringify(water_and_sanitation, null, 2)};

export const unitData = water_and_sanitation;
export { water_and_sanitation };
export default water_and_sanitation;

if (typeof module !== 'undefined' && module.exports) {
  module.exports = water_and_sanitation;
}
`;

fs.writeFileSync(targetFile, fileContent, 'utf8');
console.log(
  `✅ Successfully compiled units/water_and_sanitation/data.js (${(fileContent.length / 1024).toFixed(1)} KB)`,
);
