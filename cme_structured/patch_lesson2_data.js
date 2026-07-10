const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'src', 'lessons_data.js');
let content = fs.readFileSync(file, 'utf8');

const target = `    "steps": [
      {
        "title": "Step 1: Territorial Changes and the New Map",
        "isSplit": true,
        "bodyHtml": "<div class=\\"mastery-text-column\\">\\r\\n          <div class=\\"mastery-card-body card-content\\">\\r\\n            <p>As a result of the war, the proposed independent Arab state was completely wiped off the map.</p>\\r\\n            <ul>\\r\\n              <li><strong>Israel's Expansion:</strong> Israel captured <strong>50% more land</strong> than originally allocated (expanding its territory to cover <strong>79%</strong> of mandate Palestine), gaining control of vast new territories including the fertile <strong>Galilee</strong> region, the <strong>Negev Desert</strong>, and <strong>West Jerusalem</strong>.</li>\\r\\n              <li><strong>Jordan and Egypt:</strong> Transjordan occupied the <strong>West Bank</strong> and East Jerusalem, annexing it in <strong>1951</strong>. Egypt took military control of the <strong>Gaza Strip</strong>.</li>\\r\\n              <li><strong>The Green Line:</strong> The new borders were defined by the 1949 Armistice Agreements and became known as the <strong>Green Line</strong>.</li>\\r\\n            </ul>\\r\\n          </div>\\r\\n        </div>\\r\\n        <div class=\\"mastery-media-column\\">\\r\\n          <div class=\\"map-vector-box\\" style=\\"padding: 0;\\">\\r\\n            <img id=\\"map-image-placeholder\\" class=\\"map-image-display\\" src=\\"assets/sources/1949_armistice_map.png?v=3\\" alt=\\"1949 Armistice Borders\\" style=\\"width: 100%; height: 100%; object-fit: contain; display: block; border-radius: var(--border-radius-md);\\">\\r\\n          </div>\\r\\n          <div class=\\"map-toggles\\">\\r\\n            <button class=\\"map-toggle-btn\\" id=\\"btn-map-partition\\">[1947 UN Partition Plan]</button>\\r\\n            <button class=\\"map-toggle-btn active\\" id=\\"btn-map-borders\\">[1949 Post-War Borders]</button>\\r\\n          </div>\\r\\n          <div class=\\"map-analysis-box\\" style=\\"margin-top: 12px; background: var(--bg-card); border: 1px solid var(--border-glass); border-radius: var(--border-radius-sm); padding: 12px; font-size: 0.82rem; line-height: 1.4; color: var(--text-muted);\\">\\r\\n            <strong style=\\"display: block; margin-bottom: 4px; color: var(--accent);\\"><i class=\\"fa-solid fa-map-location-dot\\"></i> Geographical Significance:</strong>\\r\\n            The Green Line borders created highly vulnerable frontiers: Israel's coastal plain was left only 9 miles wide at its narrowest point (the 'narrow waist'), making security and border defense a dominant political priority for the new state.\\r\\n          </div>\\r\\n        </div>"
      },
      {
        "title": "Step 2: The Palestinian Refugee Crisis (The Nakba)",
        "isSplit": true,
        "bodyHtml": "<div class=\\"mastery-text-column\\">\\r\\n          <div class=\\"mastery-card-body card-content\\">\\r\\n            <p>The war was a disaster for Palestinian Arabs, who refer to the events of 1948 as the <strong>Nakba</strong> ('The Catastrophe').</p>\\r\\n            <ul>\\r\\n              <li><strong>The Exodus:</strong> Over <strong>700,000</strong> Palestinians fled or were forcibly expelled from their homes in the territory that became Israel.</li>\\r\\n              <li><strong>The Camps:</strong> Most fled to squalid, overcrowded refugee camps in the Gaza Strip, West Bank, Lebanon, Syria, and Jordan. They lost their homes, land, and livelihoods, ending up dependent on international aid.</li>\\r\\n              <li><strong>UNRWA:</strong> In December 1949, the UN established the United Nations Relief and Works Agency (<strong>UNRWA</strong>) to provide emergency food, health care, and schooling in these camps, ensuring their basic survival.</li>\\r\\n            </ul>\\r\\n            \\r\\n            <div class=\\"examiner-tip-box\\">\\r\\n              <span class=\\"tip-icon\\">💡</span>\\r\\n              <div>\\r\\n                <strong>Examiner Tip:</strong> When answering a 4-mark consequence question on the 1948-49 war, always use the Arabic term <strong>Nakba</strong> and the specific statistic of <strong>700,000</strong> refugees to secure top marks for your AO1 knowledge!\\r\\n              </div>\\r\\n            </div>\\r\\n          </div>\\r\\n        </div>\\r\\n        <div class=\\"mastery-media-column\\">\\r\\n          <div class=\\"examiner-tip-box\\" style=\\"margin: 0; background: var(--bg-app); border-left: 4px solid var(--primary); font-size: 0.85rem; padding: 14px;\\">\\r\\n            <strong style=\\"display: block; margin-bottom: 6px; color: var(--primary);\\">📝 Source A: UN Refugee Report (1949)</strong>\\r\\n            <p style=\\"font-style: italic; line-height: 1.4; color: var(--text-muted); margin: 0;\\">\\r\\n              \\"Hundreds of thousands of Arab families are housed in makeshift tents without sanitation. The situation in the Gaza and West Bank areas requires immediate international intervention to avert total famine.\\"\\r\\n            </p>\\r\\n          </div>\\r\\n        </div>",
        "scholarlyDepth": {
          "title": "Scholarly Perspective: Causes of the Palestinian Flight",
          "body": "The causes of the 1948 exodus remain highly contested. 'New Historian' Benny Morris argues that the flight was caused by a combination of fears, military pressure, and localized expulsions (e.g. at Lydda and Ramle), rather than a pre-meditated Zionist master plan. Traditional Arab history stresses systematic expulsions, while traditional Israeli history points to Arab leaders urging citizens to flee temporarily."
        }
      },
      {
        "title": "Step 3: Consolidating the State of Israel",
        "isSplit": true,
        "bodyHtml": "<div class=\\"mastery-text-column\\">\\r\\n          <div class=\\"mastery-card-body card-content\\">\\r\\n            <ul>\\r\\n              <li><strong>The Law of Return (1950):</strong> In July 1950, Israel passed this law, granting any Jew in the world the right to immigrate and receive immediate citizenship. Israel's population doubled within three years, welcoming Holocaust survivors and Jews fleeing Arab countries. This massive demographic growth strained the fragile economy, leading to strict food rationing (<strong>Tzena</strong>) and tent cities.</li>\\r\\n              <li><strong>The IDF Conscription:</strong> To secure the state during the fighting in May 1948, David Ben-Gurion forcibly merged pre-war militias (such as the <strong>Haganah</strong>, <strong>Irgun</strong>, and <strong>Lehi</strong>) into a single unified army: the <strong>Israeli Defence Forces (IDF)</strong>. In 1949, Israel introduced universal conscription, ensuring a massive reserve force to defend its borders.</li>\\r\\n              <li><strong>US Aid:</strong> To prevent economic collapse, the Israeli government applied to the USA for urgent financial assistance, resulting in grants amounting to <strong>$300 million</strong> to help support and house the new Jewish immigrants.</li>\\r\\n            </ul>\\r\\n          </div>\\r\\n        </div>\\r\\n        <div class=\\"mastery-media-column\\">\\r\\n          <div class=\\"examiner-tip-box\\" style=\\"margin: 0; background: var(--bg-app); border-left: 4px solid var(--primary); font-size: 0.85rem; padding: 14px;\\">\\r\\n            <strong style=\\"display: block; margin-bottom: 6px; color: var(--primary);\\">📝 Source B: Israeli Government Statement (1950)</strong>\\r\\n            <p style=\\"font-style: italic; line-height: 1.4; color: var(--text-muted); margin: 0;\\">\\r\\n              \\"This state will be open for Jewish immigration and for the Ingathering of the Exiles. It will promote the development of the country for the benefit of all its inhabitants.\\"\\r\\n            </p>\\r\\n          </div>\\r\\n        </div>",
        "scholarlyDepth": {
          "title": "Scholarly Perspective: The Economic Strains of Absorption",
          "body": "The Law of Return in 1950 caused massive population growth but also extreme economic strain. Prime Minister David Ben-Gurion prioritized 'Ingathering of Exiles' over economic stability. To keep the state afloat, Israel implemented a strict austerity regime (Tzena) with food rationing, heavily reliant on US loans and German Holocaust reparations."
        }
      },
      {
        "title": "Step 4: Hostile Relations with Egypt",
        "isSplit": true,
        "bodyHtml": "<div class=\\"mastery-text-column\\">\\r\\n          <div class=\\"mastery-card-body card-content\\">\\r\\n            <p>Following the war, relations between Israel and Egypt were characterized by deep hostility, resentment, and frequent violence, despite signing an armistice agreement in 1949.</p>\\r\\n            <ul>\\r\\n              <li><strong>Resentment & Refugees:</strong> Egypt bitterly resented Israel for its military defeat and for the massive burden of <strong>200,000</strong> Palestinian refugees now trapped in the Egyptian-controlled Gaza Strip.</li>\\r\\n              <li><strong>The Fedayeen Raids:</strong> Palestinian militant 'freedom fighters' known as the <strong>Fedayeen</strong> launched frequent raids from Gaza into Israel to attack settlements, steal property, and kill civilians.</li>\\r\\n              <li><strong>IDF Reprisals:</strong> The IDF responded with disproportionately harsh military reprisal raids against Egyptian and Palestinian targets in Gaza, steadily escalating the bloodshed and border tensions.</li>\\r\\n              <li><strong>Economic War:</strong> Egypt launched an economic war against Israel, banning Israeli shipping from using the <strong>Suez Canal</strong> and blockading the <strong>Straits of Tiran</strong> (the Gulf of Aqaba), deliberately suffocating Israel's trade.</li>\\r\\n            </ul>\\r\\n          </div>\\r\\n        </div>\\r\\n        <div class=\\"mastery-media-column\\">\\r\\n          <div class=\\"examiner-tip-box\\" style=\\"margin: 0; background: var(--bg-app); border-left: 4px solid var(--primary); font-size: 0.85rem; padding: 14px;\\">\\r\\n            <strong style=\\"display: block; margin-bottom: 6px; color: var(--primary);\\">📝 Source C: From an Egyptian Radio Broadcast (1953)</strong>\\r\\n            <p style=\\"font-style: italic; line-height: 1.4; color: var(--text-muted); margin: 0;\\">\\r\\n              \\"The Fedayeen will strike at the Zionist settlements day and night until our brothers' lands are returned. Let the enemy know there is no security on stolen land.\\"\\r\\n            </p>\\r\\n          </div>\\r\\n        </div>"
      }
    ]`;

const replacement = `    "do_now": {
      "type": "questions",
      "items": [
        {
          "question": "Q1. What was the exact British immigration quota set by Ernest Bevin?",
          "model": "1,500 people a month."
        },
        {
          "question": "Q2. On what exact date did the Irgun bomb the King David Hotel, and how many died?",
          "model": "22 July 1946; 91 people died."
        },
        {
          "question": "Q3. What percentage of the land did the UN Partition Plan give to the Jewish state?",
          "model": "55% of the land."
        }
      ]
    },
    "narrative": [
      "\\\"The 1948-49 Arab-Israeli War completely transformed the Middle East.\\\"",
      "As a result of the war, the proposed independent Arab state was completely wiped off the map. Israel captured 50% more land than originally allocated (expanding its territory to cover 79% of mandate Palestine), gaining control of vast new territories including the fertile Galilee region, the Negev Desert, and West Jerusalem.",
      "Meanwhile, Transjordan occupied the West Bank and East Jerusalem, annexing it in 1951. Egypt took military control of the Gaza Strip. The new borders were defined by the 1949 Armistice Agreements and became known as the Green Line. These Green Line borders created highly vulnerable frontiers: Israel's coastal plain was left only 9 miles wide at its narrowest point (the 'narrow waist'), making security and border defense a dominant political priority for the new state.",
      "The war was an absolute disaster for Palestinian Arabs, who refer to the events of 1948 as the Nakba ('The Catastrophe'). Over 700,000 Palestinians fled or were forcibly expelled from their homes in the territory that became Israel. Most fled to squalid, overcrowded refugee camps in the Gaza Strip, West Bank, Lebanon, Syria, and Jordan. They lost their homes, land, and livelihoods, ending up completely dependent on international aid.",
      "To secure the new state, David Ben-Gurion passed the Law of Return in 1950, granting any Jew in the world the right to immigrate and receive immediate citizenship. He also introduced universal conscription, cementing the newly formed Israeli Defence Forces (IDF) as the backbone of Israeli society. To prevent economic collapse from this massive demographic growth, the Israeli government secured grants amounting to $300 million from the USA.",
      "Following the war, relations between Israel and Egypt were characterized by deep hostility and frequent violence. Egypt bitterly resented Israel for its military defeat and the massive burden of 200,000 Palestinian refugees now trapped in the Gaza Strip. Palestinian militant 'freedom fighters' known as the Fedayeen launched frequent cross-border raids into Israel, prompting the IDF to respond with disproportionately harsh military reprisal raids, steadily escalating the bloodshed."
    ],
    "sources": [
      {
        "title": "Source A: 1949 Armistice Borders",
        "src": "assets/sources/1949_armistice_map.png",
        "caption": "Map showing the 'Green Line' borders following the 1949 Armistice Agreements."
      },
      {
        "title": "Source B: UN Refugee Report (1949)",
        "caption": "\\\"Hundreds of thousands of Arab families are housed in makeshift tents without sanitation. The situation in the Gaza and West Bank areas requires immediate international intervention to avert total famine.\\\""
      }
    ],
    "tasks": [
      {
        "type": "written",
        "text": "Q1: Using the narrative, identify the three countries that controlled parts of mandate Palestine by 1949."
      },
      {
        "type": "written",
        "text": "Q2: Define the term 'Nakba' and state the exact number of refugees it involved."
      },
      {
        "type": "written",
        "text": "Q3: Explain two ways David Ben-Gurion consolidated the security of the new state."
      },
      {
        "type": "written",
        "text": "Q4: How did the Palestinian refugee crisis directly contribute to escalating border tensions with Egypt?"
      },
      {
        "type": "complex",
        "text": "Source Analysis: Study Source A. How does the geographical reality of the 'narrow waist' explain Israel's aggressive border policies in the 1950s?"
      }
    ],
    "steps": []`;

if (content.includes("Step 1: Territorial Changes and the New Map")) {
    // Basic fallback replacement logic for string mismatch due to line endings
    const lines = content.split('\\n');
    const startIdx = lines.findIndex(l => l.includes('"steps": [') && (lines[lines.indexOf(l)+1].includes('Step 1: Territorial') || lines[lines.indexOf(l)+2].includes('Step 1: Territorial')));
    if (startIdx !== -1) {
        let endIdx = startIdx;
        let braceCount = 0;
        let foundBracket = false;
        for (let i = startIdx; i < lines.length; i++) {
            if (lines[i].includes('[')) { foundBracket = true; braceCount++; }
            if (lines[i].includes(']')) { braceCount--; }
            if (foundBracket && braceCount === 0) {
                endIdx = i;
                break;
            }
        }
        lines.splice(startIdx, endIdx - startIdx + 1, replacement);
        fs.writeFileSync(file, lines.join('\\n'), 'utf8');
        console.log("Patched subtopic_1_2 successfully via array boundaries.");
    } else {
        console.log("Could not find start index.");
    }
} else {
    console.log("Target not found.");
}
