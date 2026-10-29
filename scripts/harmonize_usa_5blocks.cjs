const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const SOURCE_FILE = path.join(ROOT_DIR, 'units', 'usa', 'data.js');
const PUBLIC_FILE = path.join(ROOT_DIR, 'public', 'units', 'usa', 'data.js');

console.log('======================================================================');
console.log('HARMONIZING USA (1954–1975) DIGITAL LESSONS TO 5 NARRATIVE BLOCKS &');
console.log('1-TO-1 CHRONOLOGICAL SOURCES A–E');
console.log('======================================================================\n');

// Specific source resequencing maps for each lesson (0-indexed from current lesson.sources)
// e.g. [3, 2, 4, 0, 1] means new A was D, new B was C, new C was E, new D was A, new E was B
const LESSON_SOURCE_MAPS = {
  lesson_1_1: [0, 1, 2, 3, 4], // A, B, C, D, E (already in order)
  lesson_1_2: [3, 2, 4, 0, 1], // D(Brown 1954), C(Manifesto 1956), E(Faubus 1957), A(Eckford 1957), B(101st 1957)
  lesson_1_3: [1, 2, 0, 4, 3], // B(Parks Docket), C(WPC Leaflet), A(King Speech), E(Carpool Fleet), D(Browder v Gayle)
  lesson_1_4: [1, 0, 2, 3, 4], // B(WCC Pamphlet), A(Till Lynching), C(Trial Arguments), D(1957 Act), E(Voter Map)
  lesson_2_1: [0, 2, 1, 3, 4], // A(Sit-In), C(SNCC Rules), B(Anniston Bus), D(Guardsmen Escort), E(ICC Order)
  lesson_2_2: [4, 0, 2, 1, 3], // E(Birmingham Jail), A(I Have a Dream), C(1964 Act), B(Bloody Sunday), D(1965 Act)
  lesson_2_3: [1, 2, 4, 3, 0], // B(Muhammad Speaks), C(Ballot or Bullet), E(Black Power), D(Panthers 10-Point), A(Olympics)
  lesson_2_4: [2, 0, 3, 4, 1], // C(Watts Resident), A(Kerner Report), D(RFK on King), E(1968 Act), B(Resurrection City)
  lesson_3_1: [0, 4, 1, 2, 3], // A(Domino Theory 1954), E(17th Parallel Map 1962), B(Thich Quang Duc 1963), C(Cable 243 1963), D(CIA Estimate 1963)
  lesson_3_2: [2, 4, 1, 3, 0], // C(Herrick Cable), E(Radio Hanoi), B(Tonkin Resolution), D(Rolling Thunder), A(Marines Landing)
  lesson_3_3: [4, 2, 1, 0, 3], // E(Cu Chi Tunnels), C(Booby Traps), B(Ho Chi Minh Trail), A(Huey Landing), D(Caputo Search & Destroy)
  lesson_3_4: [3, 0, 2, 1, 4], // D(Cronkite Tet), A(Nixon Di An), C(Cambodian Incursion), B(Lam Son 719), E(Decent Interval Tape)
  lesson_4_1: [3, 2, 0, 1, 4], // D(Thompson My Lai), C(Ridenhour Letter), A(Draft Lottery), B(Kent State Guardsmen), E(SMC Poster)
  lesson_4_2: [0, 2, 4, 3, 1], // A(Silent Majority), C(Hard Hat Riots), E(NY Daily News), D(Gallup Poll), B(VVAW Medals)
  lesson_4_3: [0, 1, 2, 3, 4], // A(Signing Accords), B(Key Articles), C(POWs Homecoming), D(Dung Ho Chi Minh Campaign), E(Ford Tulane)
  lesson_4_4: [0, 1, 2, 4, 3], // A(Conscript in Canal), B(Ho Chi Minh Trail), C(War Powers Act), E(DoD Summary Costs), D(Herring Analysis)
};

// Paragraph split definitions for the 8 paragraphs into 5 blocks
// e.g. [[0], [1], [2, 3], [4, 5], [6, 7]] defines which 0-indexed paragraphs go into each block
const LESSON_PARA_SPLITS = {
  lesson_1_1: [[0], [1], [2], [3], [4, 5, 6, 7]],
  lesson_1_2: [[0, 1], [2, 3], [4], [5], [6, 7]],
  lesson_1_3: [[0, 1], [2], [3], [4, 5], [6, 7]],
  lesson_1_4: [[0, 1], [2], [3], [4, 5], [6, 7]],
  lesson_2_1: [[0], [1], [2, 3], [4, 5], [6, 7]],
  lesson_2_2: [[0, 1], [2], [3], [4], [5, 6, 7]],
  lesson_2_3: [[0, 1], [2, 3], [4], [5], [6, 7]],
  lesson_2_4: [[0], [1, 2], [3], [4], [5, 6, 7]],
  lesson_3_1: [[0, 1], [2, 3], [4], [5], [6, 7]],
  lesson_3_2: [[0, 1], [2], [3], [4], [5, 6, 7]],
  lesson_3_3: [[0], [1], [2, 3], [4, 5], [6, 7]],
  lesson_3_4: [[0, 1], [2, 3], [4], [5], [6, 7]],
  lesson_4_1: [[0, 1], [2, 3], [4, 5], [6], [7]],
  lesson_4_2: [[0, 1], [2, 3], [4], [5], [6, 7]],
  lesson_4_3: [[0, 1], [2, 3], [4], [5], [6, 7]],
  lesson_4_4: [[0, 1], [2, 3], [4], [5], [6, 7]],
};

function harmonizeTarget(targetPath) {
  console.log(`\n▶ Processing: ${targetPath}`);
  const rawData = require(targetPath);
  const data = rawData.default || rawData.usa_data || rawData;

  const letterList = ['A', 'B', 'C', 'D', 'E'];

  data.lessons.forEach((lesson, lIdx) => {
    const lId = lesson.id;
    const stages = (lesson.causal_domino_spine && lesson.causal_domino_spine.stages) || [];
    if (stages.length !== 5) {
      console.warn(`  ⚠️ Lesson ${lId} does not have 5 stages! (found ${stages.length})`);
      return;
    }

    // 1. Gather all 8 paragraphs from existing narrative_blocks
    const allParas = [];
    (lesson.narrative_blocks || []).forEach((b) => {
      (b.text || '').split('\n\n').forEach((p) => {
        if (p.trim()) allParas.push(p.trim());
      });
    });

    if (allParas.length !== 8) {
      console.warn(`  ⚠️ Lesson ${lId} has ${allParas.length} paragraphs (expected 8)`);
    }

    // 2. Extract existing narrative images
    let imgBlock1 = null;
    let imgBlock3 = null;
    if (lesson.narrative_blocks && lesson.narrative_blocks[0] && lesson.narrative_blocks[0].image) {
      imgBlock1 = {
        image: lesson.narrative_blocks[0].image,
        image_alt: lesson.narrative_blocks[0].image_alt || '',
        caption: lesson.narrative_blocks[0].caption || '',
      };
    }
    if (lesson.narrative_blocks && lesson.narrative_blocks[2] && lesson.narrative_blocks[2].image) {
      imgBlock3 = {
        image: lesson.narrative_blocks[2].image,
        image_alt: lesson.narrative_blocks[2].image_alt || '',
        caption: lesson.narrative_blocks[2].caption || '',
      };
    }

    // 3. Resequence lesson.sources
    const currentSources = lesson.sources || [];
    const map = LESSON_SOURCE_MAPS[lId] || [0, 1, 2, 3, 4];
    const resequencedSources = map.map((oldIdx, newIdx) => {
      const srcObj = JSON.parse(JSON.stringify(currentSources[oldIdx]));
      const newLetter = letterList[newIdx];
      srcObj.letter = newLetter;
      // Update title prefix "Source X: "
      srcObj.title = srcObj.title.replace(/^Source\s+[A-Z]:\s*/i, `Source ${newLetter}: `);
      // Ensure src, image, and source are 100% synchronized
      if (srcObj.image) {
        srcObj.src = srcObj.image;
        srcObj.source = srcObj.image;
      } else if (srcObj.src) {
        srcObj.image = srcObj.src;
        srcObj.source = srcObj.src;
      }
      return srcObj;
    });

    lesson.sources = resequencedSources;

    // 4. Construct 5 discrete narrative blocks
    const splitDef = LESSON_PARA_SPLITS[lId] || [[0, 1], [2, 3], [4], [5], [6, 7]];
    const newNarrativeBlocks = [];

    for (let step = 1; step <= 5; step++) {
      const stage = stages[step - 1];
      const paraIndices = splitDef[step - 1] || [];
      const blockParas = paraIndices.map((idx) => allParas[idx]).filter(Boolean);
      const assignedSource = resequencedSources[step - 1];

      // Add decimal paragraph references if not already present
      const formattedParas = blockParas.map((p, pIdx) => {
        const refTag = `<span class="para-ref">[${step}.${pIdx + 1}]</span> `;
        if (p.includes('class="para-ref"')) {
          // Update existing tag
          return p.replace(/<span class="para-ref">\[\d+\.\d+\]<\/span>\s*/, refTag);
        }
        return refTag + p;
      });

      const blockObj = {
        act: step,
        act_title: `Stage ${step}: ${stage.title} — ${stage.question}`,
        title: stage.title,
        theme_heading: stage.title,
        text: formattedParas.join('\n\n'),
        paragraphs: formattedParas,
        sources: [assignedSource],
      };

      // Assign narrative visual support plates (alternating rhythm on blocks 1 and 3)
      if (step === 1 && imgBlock1) {
        blockObj.image = imgBlock1.image;
        blockObj.image_alt = imgBlock1.image_alt;
        blockObj.caption = imgBlock1.caption;
        blockObj.isReversed = false;
      } else if (step === 3 && imgBlock3) {
        blockObj.image = imgBlock3.image;
        blockObj.image_alt = imgBlock3.image_alt;
        blockObj.caption = imgBlock3.caption;
        blockObj.isReversed = true;
      } else {
        blockObj.isReversed = step % 2 === 0;
      }

      newNarrativeBlocks.push(blockObj);
    }

    lesson.narrative_blocks = newNarrativeBlocks;
    console.log(`  ✅ Lesson ${lIdx + 1} (${lId}): 5 narrative blocks & Sources A–E harmonized.`);
  });

  // Re-write file with dual CommonJS / ESM export structure
  const fileContent = `const usa_data = ${JSON.stringify(data, null, 2)};
if (typeof module !== 'undefined' && module.exports) {
  module.exports = usa_data;
}
export default usa_data;
export { usa_data };
`;

  fs.writeFileSync(targetPath, fileContent, 'utf8');
  console.log(`  💾 Successfully updated ${targetPath}`);
}

harmonizeTarget(SOURCE_FILE);
harmonizeTarget(PUBLIC_FILE);

console.log('\n======================================================================');
console.log('🎉 ALL 16 USA LESSONS SUCCESSFULLY HARMONIZED TO 5 BLOCKS');
console.log('======================================================================\n');
