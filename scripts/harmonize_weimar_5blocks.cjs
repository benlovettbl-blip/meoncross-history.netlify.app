/**
 * scripts/harmonize_weimar_5blocks.cjs
 *
 * Harmonizes all 16 Weimar & Nazi Germany lessons to the Gold Standard 5-block narrative architecture,
 * aligned 1-to-1 with Sources A-E in strict chronological sequence.
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = 'C:/Projects/the-history-revision-hub';
const dataPath = path.join(ROOT_DIR, 'units', 'weimar_nazi_germany', 'data.js');
const publicDataPath = path.join(ROOT_DIR, 'public', 'units', 'weimar_nazi_germany', 'data.js');

let code = fs.readFileSync(dataPath, 'utf8');
code = code.replace(/export default\s+[a-zA-Z0-9_]+;?/, '');
const vm = require('vm');
const sandbox = { window: {}, console: console, require: require };
vm.createContext(sandbox);
vm.runInContext(code + '\n;data = weimar_nazi_germany_data;', sandbox);
const data = sandbox.data;

const EXPECTED_LETTERS = ['A', 'B', 'C', 'D', 'E'];

// Specific source mapping from existing index to chronological Block 1-5 (A-E)
const SOURCE_ORDER_MAP = {
  // L1: Max von Baden abdication (D=3), Scheidemann proclamation (A=0), Barricades (B=1), Ebert Assembly address (E=4), Weimar Constitution doc (C=2)
  0: [3, 0, 1, 4, 2],

  // L2: Spartacist soldiers (E=4), Dolchstoßlegende (A=0), Kapp Putsch (B=1), Eyewitness/Assassinations (D=3), Hyperinflation note (C=2)
  1: [4, 0, 1, 3, 2],

  // L3: Stresemann Letter/stabilisation (E=4), Dawes Bond (B=1), Locarno (A=0), Kellogg-Briand (C=2), Young Plan (D=3)
  2: [4, 1, 0, 2, 3],

  // L4: Hufeisensiedlung (D=3), New Woman (B=1), Metropolis/Bauhaus (C=2), Otto Dix (A=0), DNVP poster (E=4)
  3: [3, 1, 2, 0, 4],

  // L5: Police report on Hitler speeches (E=4), 25-Point Programme leaflet (D=3), Völkischer Beobachter (C=2), 25-Point text (A=0), Hitler & SA in Munich (B=1)
  4: [4, 3, 2, 0, 1],

  // L6: Armed SA in Marienplatz (D=3), Treason trial speech (A=0), Landsberg prison (B=1), Mein Kampf (C=2), Anti-Young Plan poster (E=4)
  5: [3, 0, 1, 2, 4],

  // L7: Maschmann memoir (E=4), Brüning decree (B=1), SA parade (C=2), Work Freedom Bread poster (D=3), Our Last Hope (A=0)
  6: [4, 1, 2, 3, 0],

  // L8: Papen boast / setback (B=1), Schleicher photo (D=3), Punch cartoon (A=0), Hitler cabinet (E=4), Goebbels diary (C=2)
  7: [1, 3, 0, 4, 2],

  // L9: Marinus van der Lubbe (B=1), Otto Wels SPD address (C=2), Emergency decree (A=0), Ernst Röhm (D=3), Hitler speech (E=4)
  8: [1, 2, 0, 3, 4],

  // L10: Heydrich photo (B=1), Gestapo dossier (A=0), People's Court law (C=2), Mit Brennender Sorge (D=3), Barmen Declaration (E=4)
  9: [1, 0, 2, 3, 4],

  // L11: Goebbels radio address (B=1), Volksempfänger radio (A=0), Shirer Nuremberg diary (C=2), Daily press directive (E=4), Degenerate music poster (D=3)
  10: [1, 0, 2, 4, 3],

  // L12: Sopade report (E=4), Tarnschrift pamphlet (C=2), Edelweiss Pirates report (A=0), Swing Youth report (B=1), Bonhoeffer photo (D=3)
  11: [4, 2, 0, 1, 3],

  // L13: Scholtz-Klink address (B=1), Marriage law (C=2), BDM Landdienst (A=0), Sterilisation law (D=3), Sopade female labour (E=4)
  12: [1, 2, 0, 3, 4],

  // L14: Hitler address to 54,000 boys (B=1), BDM drill (A=0), Hitler youth decree 1939 (D=3), Nazi maths book (C=2), Sopade report (E=4)
  13: [1, 0, 3, 2, 4],

  // L15: Robert Ley union dissolution (B=1), RAD law (C=2), Unemployment figures (E=4), KdF emblem (A=0), Sopade real wages (D=3)
  14: [1, 2, 4, 0, 3],

  // L16: SA Boycott photo (A=0), Nuremberg laws chart (B=1), Reich citizenship law (C=2), Heydrich Kristallnacht instructions (D=3), British consul report (E=4)
  15: [0, 1, 2, 3, 4],
};

data.lessons.forEach((lesson, lIdx) => {
  const lessonNum = lIdx + 1;

  // Re-sequence sources
  const map = SOURCE_ORDER_MAP[lIdx];
  const oldSources = [...lesson.sources];
  const newSources = [];

  for (let i = 0; i < 5; i++) {
    const origIdx = map[i];
    const src = { ...oldSources[origIdx] };
    const letter = EXPECTED_LETTERS[i];

    src.letter = letter;
    if (src.title) {
      src.title = src.title.replace(/^Source\s+[A-Z]:\s*/, `Source ${letter}: `);
    }
    if (src.image) {
      src.src = src.image;
    } else {
      delete src.src;
    }
    newSources.push(src);
  }

  lesson.sources = newSources;

  // Harmonize narrative blocks
  lesson.narrative_blocks.forEach((block, bIdx) => {
    const step = bIdx + 1;
    const stage = lesson.causal_domino_spine.stages[bIdx];

    block.act = step;
    stage.step = step;
    block.act_title = `Stage ${step}: ${stage.title} — ${stage.question}`;

    const assignedSource = lesson.sources[bIdx];
    block.sources = [assignedSource];
    block.source = assignedSource;

    // Extract clean paragraphs array
    const rawText = block.content || block.text || '';
    let paras = [];
    if (rawText.includes('</p>')) {
      const matches = rawText.match(/<p>([\s\S]*?)<\/p>/g);
      if (matches) {
        paras = matches.map((m) => m.replace(/<\/?p>/g, '').trim());
      }
    } else {
      paras = rawText
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean);
    }

    // Format paragraphs with clean [step.para] notation if needed
    paras = paras.map((p, pIdx) => {
      const pNum = pIdx + 1;
      const refTag = `[${step}.${pNum}]`;
      if (!p.includes('class="para-ref"') && !p.includes(`[${step}.${pNum}]`)) {
        return `<span class="para-ref">${refTag}</span> ${p}`;
      } else if (p.includes(`[${step}.${pNum}]`) && !p.includes('class="para-ref"')) {
        return p.replace(`[${step}.${pNum}]`, `<span class="para-ref">${refTag}</span>`);
      }
      return p;
    });

    block.paragraphs = paras;
    block.content = paras.map((p) => `<p>${p}</p>`).join('\n\n');
    block.text = block.content;
  });
});

// Format file output
const outputCode = `const weimar_nazi_germany_data = ${JSON.stringify(data, null, 2)};

if (typeof window !== 'undefined') {
  window.weimar_nazi_germany_data = weimar_nazi_germany_data;
}

if (typeof module !== 'undefined') {
  module.exports = weimar_nazi_germany_data;
}

export default weimar_nazi_germany_data;
`;

fs.writeFileSync(dataPath, outputCode, 'utf8');
fs.writeFileSync(publicDataPath, outputCode, 'utf8');
console.log(
  'Successfully harmonized Weimar & Nazi Germany to 5-block standard in both units/ and public/units/!',
);
