const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'cme_structured', 'workbook_stash', 'workbook_KT1_v2.html');
let html = fs.readFileSync(filePath, 'utf8');

const vocabData = {
  1: {
    term: "Zionism",
    definition: "The movement for the re-establishment of a Jewish nation in the ancient homeland of Israel.",
    example: "The rise of Zionism led to increased Jewish immigration to Palestine under the British Mandate."
  },
  2: {
    term: "Irgun",
    definition: "A Zionist paramilitary organisation that operated in Mandate Palestine.",
    example: "The Irgun bombed the King David Hotel in 1946 to force the British to leave."
  },
  3: {
    term: "Arab League",
    definition: "A regional organisation of Arab states formed in 1945 to coordinate political action.",
    example: "The Arab League coordinated the invasion of Israel in 1948."
  }
};

let updated = html;

// Lesson 1
updated = updated.replace(
  /(<h2>🎓 Lesson 1:.*?<\/h2>)/,
  `$1\n<div class="tier3-vocab-box" style="border: 2px solid #004d40; background: #e0f2f1; padding: 15px; margin: 20px 0; border-radius: 4px; box-shadow: 2px 2px 0px #004d40; page-break-inside: avoid;">
    <div style="font-weight: 800; font-size: 11pt; color: #004d40; margin-bottom: 8px; text-transform: uppercase; border-bottom: 1px solid #004d40; padding-bottom: 5px;">
      <i class="fa-solid fa-book-open"></i> Tier 3 Vocabulary Focus: ${vocabData[1].term}
    </div>
    <div style="display: flex; gap: 15px; margin-top: 10px;">
      <div style="flex: 1;">
        <strong>Meaning:</strong> ${vocabData[1].definition}
      </div>
      <div style="flex: 1; border-left: 2px solid #b2dfdb; padding-left: 15px;">
        <strong>Active Task:</strong> Write a sentence using <em>${vocabData[1].term}</em> to explain why the Jewish population in Palestine grew rapidly after WWII.
        <div class="task-lines-small"></div>
      </div>
    </div>
  </div>\n`
);

// Lesson 2
updated = updated.replace(
  /(<h2>🎓 Lesson 2:.*?<\/h2>)/,
  `$1\n<div class="tier3-vocab-box" style="border: 2px solid #004d40; background: #e0f2f1; padding: 15px; margin: 20px 0; border-radius: 4px; box-shadow: 2px 2px 0px #004d40; page-break-inside: avoid;">
    <div style="font-weight: 800; font-size: 11pt; color: #004d40; margin-bottom: 8px; text-transform: uppercase; border-bottom: 1px solid #004d40; padding-bottom: 5px;">
      <i class="fa-solid fa-book-open"></i> Tier 3 Vocabulary Focus: ${vocabData[2].term}
    </div>
    <div style="display: flex; gap: 15px; margin-top: 10px;">
      <div style="flex: 1;">
        <strong>Meaning:</strong> ${vocabData[2].definition}
      </div>
      <div style="flex: 1; border-left: 2px solid #b2dfdb; padding-left: 15px;">
        <strong>Active Task:</strong> Write a sentence using <em>${vocabData[2].term}</em> to describe how Jewish paramilitary groups responded to British immigration limits.
        <div class="task-lines-small"></div>
      </div>
    </div>
  </div>\n`
);

// Lesson 3
updated = updated.replace(
  /(<h2>🎓 Lesson 3:.*?<\/h2>)/,
  `$1\n<div class="tier3-vocab-box" style="border: 2px solid #004d40; background: #e0f2f1; padding: 15px; margin: 20px 0; border-radius: 4px; box-shadow: 2px 2px 0px #004d40; page-break-inside: avoid;">
    <div style="font-weight: 800; font-size: 11pt; color: #004d40; margin-bottom: 8px; text-transform: uppercase; border-bottom: 1px solid #004d40; padding-bottom: 5px;">
      <i class="fa-solid fa-book-open"></i> Tier 3 Vocabulary Focus: ${vocabData[3].term}
    </div>
    <div style="display: flex; gap: 15px; margin-top: 10px;">
      <div style="flex: 1;">
        <strong>Meaning:</strong> ${vocabData[3].definition}
      </div>
      <div style="flex: 1; border-left: 2px solid #b2dfdb; padding-left: 15px;">
        <strong>Active Task:</strong> Write a sentence using <em>${vocabData[3].term}</em> to explain the Arab reaction to the creation of Israel.
        <div class="task-lines-small"></div>
      </div>
    </div>
  </div>\n`
);

fs.writeFileSync(filePath, updated);
console.log('Tier 3 Vocab boxes injected successfully.');
