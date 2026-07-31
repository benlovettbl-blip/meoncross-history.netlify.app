import fs from 'fs';

let content = fs.readFileSync('src/exam_practice_zone.js', 'utf8');

// 1. Add auto-categorisation and ktPrefix logic when building examBank
content = content.replace(
    /practices\.forEach\(ep => \{\s*examBank\.push\(\{[\s\S]*?\}\);\s*\}\);/,
    `practices.forEach(ep => {
          let qText = ep.question || ep.text;
          let type = ep.type;
          if (!type) {
              if (qText.includes("12 marks")) type = "12-mark";
              else if (qText.includes("16 marks")) type = "16-mark";
              else if (qText.includes("2 marks") || qText.includes("4 marks") || qText.includes("8 marks")) {
                  let m = qText.match(/\\((\\d+) marks?\\)/);
                  type = m ? \`\${m[1]}-mark\` : "4-mark";
              } else {
                  type = "Exam";
              }
          }
          let blockTitle = l.title || "";
          let ktPrefix = blockTitle.split(':')[0]; // e.g. "KT1.1"

          examBank.push({
            ...ep,
            question: qText,
            blockTitle: blockTitle,
            ktPrefix: ktPrefix,
            type: type
          });
        });`
);

// 2. Add CSS for pills
content = content.replace(
    /(\.epz-card::after \{[\s\S]*?\})/,
    `$1
      .epz-pill {
        padding: 8px 16px;
        border-radius: 20px;
        border: 2px solid #cbd5e1;
        background: white;
        color: #475569;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
        font-size: 0.95rem;
      }
      .epz-pill:hover {
        border-color: #3b82f6;
        color: #3b82f6;
      }
      .epz-pill.active {
        background: #3b82f6;
        color: white;
        border-color: #3b82f6;
      }`
);

// 3. Replace dropdown with pills
content = content.replace(
    /<select id="epz-type-filter"[\s\S]*?<\/select>/,
    `<div id="epz-type-pills" style="display: flex; gap: 10px; flex-wrap: wrap;">
              <button class="epz-pill active" data-type="all">📚 All Question Types</button>
              \${uniqueTypes.map(t => \`<button class="epz-pill" data-type="\${t}">\${t.charAt(0).toUpperCase() + t.slice(1)}</button>\`).join('')}
            </div>`
);

// 4. Update elements selection (remove typeFilter, add typePills)
content = content.replace(
    /const typeFilter = document.getElementById\('epz-type-filter'\);/,
    `let currentSelectedType = 'all';\n  const typePills = document.getElementById('epz-type-pills');`
);

// 5. Update populateSpecificQuestions logic to use currentSelectedType
content = content.replace(
    /const selectedType = typeFilter\.value;/,
    `const selectedType = currentSelectedType;`
);

// 6. Update HTML generation in populateSpecificQuestions to include [ktPrefix]
content = content.replace(
    /html \+= \`<option value="\${originalIndex}">\${typeIcon} Q: \${truncatedText}<\/option>\`;/,
    `let prefix = q.ktPrefix ? \`[\${q.ktPrefix}] \` : '';
        html += \`<option value="\${originalIndex}">\${typeIcon} \${prefix}\${truncatedText}</option>\`;`
);

// 7. Replace typeFilter.addEventListener with pill event listeners
content = content.replace(
    /typeFilter\.addEventListener\('change', populateSpecificQuestions\);/,
    `if (typePills) {
    typePills.addEventListener('click', (e) => {
      if (e.target.classList.contains('epz-pill')) {
        // Update active class
        Array.from(typePills.children).forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        // Update state and refresh
        currentSelectedType = e.target.getAttribute('data-type');
        populateSpecificQuestions();
      }
    });
  }`
);

// 8. Update generateBtn logic to use currentSelectedType instead of typeFilter.value
content = content.replace(
    /const selectedType = typeFilter\.value;/,
    `const selectedType = currentSelectedType;`
);

fs.writeFileSync('src/exam_practice_zone.js', content);
console.log("exam_practice_zone.js updated successfully!");
