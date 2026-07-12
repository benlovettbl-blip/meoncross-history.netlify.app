import fs from 'fs';
import { execSync } from 'child_process';
import path from 'path';

const diagrams = [
  {
    id: 'nasser_aims',
    matchStr: "[Nasser's Domestic & Geopolitical Aims]",
    mmd: `flowchart TD
  A[Nasser's Domestic & Geopolitical Aims]
  A --> B(Throw Off British Imperialism)
  A --> C(Socialist Internal Reforms)
  A --> D(The Aswan High Dam)
  B --> E["Expelled 80,000 British<br>troops from Suez Canal zone<br>Stood as champion of Arab pride"]
  C --> F["Redistributed fertile land<br>to the poor peasants<br>Built schools & hospitals"]
  D --> G["Ultimate pride project<br>Required massive foreign<br>loans to build on Nile"]`
  },
  {
    id: 'gaza_raid',
    matchStr: "[1955 Gaza Raid Humiliates Egypt]",
    mmd: `flowchart TD
  A[1955 Gaza Raid Humiliates Egypt] --> B(Nasser Realises Military Weakness)
  B --> C[1955 Czech Arms Deal Soviet Bloc]
  C --> D(Egypt Receives Advanced Jets/Tanks)
  D --> E[Western Alarm: US/UK Cancel Dam Loan]
  E --> F(Nasser Nationalises Suez Canal)`
  },
  {
    id: 'sevres_protocol',
    matchStr: "[THE SECRET PROTOCOL OF SÈVRES]",
    mmd: `flowchart TD
  A[THE SECRET PROTOCOL OF SÈVRES]
  A --> B[Step 1: IDF Invades Sinai]
  B --> C[Step 2: UK/France Demand Ceasefire & Pullback]
  C --> D[Step 3: Egypt Refuses]
  D --> E[Step 4: Anglo-French Troops Occupy Canal to Protect It]`
  },
  {
    id: 'suez_consequences',
    matchStr: "[CONSEQUENCES OF SUEZ FOR ISRAEL]",
    mmd: `flowchart TD
  A[CONSEQUENCES OF SUEZ FOR ISRAEL]
  A --> B(UNEF Deployment in Sinai)
  A --> C(Straits of Tiran Open)
  A --> D(IDF Military Deterrence)
  B --> E["Stationed as a buffer<br>Gaza Fedayeen raids<br>stopped for 10 years"]
  C --> F["Port of Eilat reopened<br>Secured vital trade<br>with Asia/Africa"]
  D --> G["Egyptian army routed<br>Deterred Arab states<br>from war until 1967"]`
  },
  {
    id: 'cairo_conference',
    matchStr: "[THE 1964 CAIRO CONFERENCE]",
    mmd: `flowchart TD
  A[THE 1964 CAIRO CONFERENCE]
  A --> B(Establishment of the PLO)
  A --> C(Dispute Over River Jordan)
  B --> D["Goal: Unite resistance groups<br>Officially backed by Arab League<br>Emergence of Fatah as military force"]
  C --> E["Israel builds National Water Carrier<br>Arab states build diversion canals<br>Led to intense border tank/artillery battles"]`
  },
  {
    id: 'syria_fatah',
    matchStr: "[Syria funds/arms Fatah guerrillas]",
    mmd: `flowchart TD
  A[Syria funds/arms Fatah guerrillas] --> B[Fatah launches sabotage raids into Israel]
  B --> C[IDF launches massive reprisal on Jordanian Samu]
  C --> D[King Hussein is deeply alienated]`
  },
  {
    id: 'operation_focus',
    matchStr: "[OPERATION FOCUS: 5 JUNE 1967]",
    mmd: `flowchart TD
  A[OPERATION FOCUS: 5 JUNE 1967]
  A --> B[Low-altitude surprise air strike]
  B --> C[Egyptian radar successfully bypassed]
  C --> D[Bomb runways & destroy 309 Egyptian jets]
  D --> E[Total Israeli air superiority secured]`
  }
];

const htmlBlocks = [
  {
    id: 'kt2_map',
    matchStr: "SPECIFICATION STUDY MAP: KEY TOPIC 2.1",
    html: `
<div style="background-color: #f8f9fa; border: 1px solid #ddd; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
  <h3 style="margin-top: 0; color: #333; text-align: center;">SPECIFICATION STUDY MAP: KEY TOPIC 2.1</h3>
  <ol style="line-height: 1.6; margin-bottom: 0;">
    <li><strong>Palestinian Nationalism</strong> &rarr; Cairo Conference (1964), creation of the PLO and Fatah.</li>
    <li><strong>Border Wars &amp; Skirmishes</strong> &rarr; Disputes over Jordan water, Samu Raid (1966), 7 April 1967.</li>
    <li><strong>The Slide to War (May '67)</strong> &rarr; Soviet misinformation, UNEF withdrawal, closure of Tiran.</li>
    <li><strong>The Six Day War</strong> &rarr; June 5 pre-emptive strike, lightning land war, redrawn boundaries.</li>
  </ol>
</div>`
  },
  {
    id: 'may_1967_cascade',
    matchStr: "THE MAY 1967 CASCADE: CHRONOLOGY OF CRISIS",
    html: `
<div style="background-color: #f8f9fa; border: 1px solid #ddd; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
  <h3 style="margin-top: 0; color: #333; text-align: center;">THE MAY 1967 CASCADE: CHRONOLOGY OF CRISIS</h3>
  <ul style="line-height: 1.6; margin-bottom: 0; list-style-type: none; padding-left: 0;">
    <li><strong>13 May</strong> &rarr; <em>Soviet Misinformation:</em> USSR falsely tells Nasser Israel is massing troops on Syria.</li>
    <li><strong>15 May</strong> &rarr; <em>Egyptian Mobilization:</em> Nasser puts army on alert, moves troops into Sinai.</li>
    <li><strong>16 May</strong> &rarr; <em>UN Out:</em> Nasser orders UN peacekeepers (UNEF) to evacuate the border buffer.</li>
    <li><strong>23 May</strong> &rarr; <em>Maritime Blockade:</em> Egypt closes the Straits of Tiran, choking Israel's port of Eilat.</li>
    <li><strong>30 May</strong> &rarr; <em>Encirclement:</em> King Hussein of Jordan signs a joint defence pact with Egypt.</li>
  </ul>
</div>`
  }
];

fs.mkdirSync('scratch/mmd', { recursive: true });

for (const diag of diagrams) {
  const mmdPath = path.join('scratch', 'mmd', `${diag.id}.mmd`);
  const outPath = path.join('cme_new', 'assets', `${diag.id}.svg`);
  
  const themeVariables = `%%{init: {'theme': 'base', 'themeVariables': { 'fontFamily': 'arial', 'primaryColor': '#ECECFF', 'primaryBorderColor': '#9370DB', 'primaryTextColor': '#333', 'lineColor': '#333333'}}}%%`;
  fs.writeFileSync(mmdPath, `${themeVariables}\n${diag.mmd}`);
  
  console.log(`Generating SVG for ${diag.id}...`);
  try {
    execSync(`mmdc -i "${mmdPath}" -o "${outPath}" -b transparent`);
  } catch (err) {
    console.error(`Failed to generate ${diag.id}: ${err.message}`);
  }
}

let dataJs = fs.readFileSync('cme_new/data.js', 'utf8');

for (const diag of diagrams) {
  const replacement = `<img src="assets/${diag.id}.svg" class="svg-diagram" style="max-width: 100%; border-radius: 8px;" alt="${diag.id}">`;
  dataJs = dataJs.replace(/<pre style=[^>]*>([\s\S]*?)<\/pre>/g, (match, content) => {
    if (content.includes(diag.matchStr)) return replacement;
    return match;
  });
}

for (const block of htmlBlocks) {
  dataJs = dataJs.replace(/<pre style=[^>]*>([\s\S]*?)<\/pre>/g, (match, content) => {
    if (content.includes(block.matchStr)) return block.html;
    return match;
  });
}

fs.writeFileSync('cme_new/data.js', dataJs);
console.log('Successfully patched remaining diagrams in data.js!');
