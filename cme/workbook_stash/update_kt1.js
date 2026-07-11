const fs = require('fs');
const path = require('path');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

// Load LESSONS_DATA
const targetDir = 'c:/Projects/meoncross-history.netlify.app/cme_structured';
const lessonsDataCode = fs.readFileSync(path.join(targetDir, 'src/lessons_data.js'), 'utf8');
const cleanObjStr = lessonsDataCode.replace('export const LESSONS_DATA =', '').trim();
const LESSONS_DATA = (new Function("return " + cleanObjStr.replace(/;$/, '')))();

const filesToUpdate = ['workbook_KT1_v2.html'];

filesToUpdate.forEach(file => {
  const filePath = path.join(targetDir, 'workbook_stash', file);
  let html = fs.readFileSync(filePath, 'utf8');

  // 1. Change "Inquiries" to "Enquiries" and remove "and Inquiries"
  html = html.replace(/ and Inquiries/g, '');
  html = html.replace(/ and Enquiries/g, '');
  html = html.replace(/Inquiries/g, 'Enquiries');
  html = html.replace(/Inquiry/g, 'Enquiry');

  const dom = new JSDOM(html);
  const document = dom.window.document;

  // 2. Stacking the Tier 3 Vocab
  const vocabSections = document.querySelectorAll('.vocab-section');
  vocabSections.forEach(section => {
    const vocabItems = [];
    section.querySelectorAll('div').forEach(div => {
      const strong = div.querySelector('strong');
      if (strong) {
        const term = strong.textContent.trim().replace(/:$/, '');
        const def = div.textContent.replace(strong.textContent, '').replace(/^:\s*/, '').trim();
        vocabItems.push({ term, def });
      }
    });

    if (vocabItems.length > 0) {
      let newVocabHtml = `
      <div class="tier3-vocab-box" style="border: 2px solid #004d40; background: #e0f2f1; padding: 15px; margin: 20px 0; border-radius: 4px; box-shadow: 2px 2px 0px #004d40; page-break-inside: avoid;">
        <div style="font-weight: 800; font-size: 11pt; color: #004d40; margin-bottom: 8px; text-transform: uppercase; border-bottom: 1px solid #004d40; padding-bottom: 5px;">
          <i class="fa-solid fa-book-open"></i> Tier 3 Vocabulary Focus
        </div>
        <div style="margin-top: 10px;">
      `;

      vocabItems.forEach(item => {
        newVocabHtml += `
          <div style="margin-bottom: 10px; font-size: 10.5pt;">
            <strong style="color: #004d40;">Meaning:</strong> <em>${item.term}</em> - ${item.def}
          </div>
          <div style="border-top: 1px dashed #b2dfdb; padding-top: 10px; margin-bottom: 15px; font-size: 10.5pt;">
            <strong style="color: #004d40;">Active Task:</strong> Write a sentence using <em>${item.term}</em>.
            <div class="task-lines-small" style="border-bottom: 1px dashed #9ca3af; height: 25px; margin-top: 5px; width: 100%;"></div>
          </div>
        `;
      });

      newVocabHtml += `</div></div>`;
      
      const newVocabDiv = document.createElement('div');
      newVocabDiv.innerHTML = newVocabHtml;
      section.parentNode.replaceChild(newVocabDiv.firstElementChild, section);
    }
  });

  // 3. Vertically Stacking Dual Interpretations
  const mainTitles = document.querySelectorAll('.main-title');
  mainTitles.forEach(titleNode => {
    const text = titleNode.textContent;
    const match = text.match(/Topic\s+(\d)\.(\d)/);
    if (match) {
      const topic = match[1];
      const lesson = match[2];
      const subtopicId = `subtopic_${topic}_${lesson}`;
      
      const lessonData = LESSONS_DATA[subtopicId];
      if (lessonData && lessonData.dualPerspective) {
        const dual = lessonData.dualPerspective;
        
        let dualHtml = `
        <div class="dual-interpretation-stacked" style="border: 2px solid #5e35b1; border-radius: 4px; margin: 25px 0; background: #f3e5f5; page-break-inside: avoid; clear: both; width: 100%;">
          <div style="background: #5e35b1; color: white; padding: 10px 15px; font-weight: bold; font-size: 12pt; text-align: center;">
            ${dual.neutralTitle || '⚖️ Dual Interpretation: The Competing Narratives'}
          </div>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 15px; vertical-align: top; border-bottom: 1px solid #ce93d8;">
                <strong style="color: #4527a0; display: block; margin-bottom: 10px; font-size: 11pt;">${dual.leftHeadline}</strong>
                <div style="font-size: 10.5pt; text-align: justify; line-height: 1.5;">${dual.leftText}</div>
              </td>
            </tr>
            <tr>
              <td style="padding: 15px; vertical-align: top;">
                <strong style="color: #4527a0; display: block; margin-bottom: 10px; font-size: 11pt;">${dual.rightHeadline}</strong>
                <div style="font-size: 10.5pt; text-align: justify; line-height: 1.5;">${dual.rightText}</div>
              </td>
            </tr>
          </table>
        </div>
        `;
        
        // Find the narrative table in this lesson. 
        let sibling = titleNode.nextElementSibling;
        while (sibling && sibling.tagName !== 'H2') {
          if (sibling.tagName === 'TABLE' && sibling.querySelector('td')) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = dualHtml;
            sibling.parentNode.insertBefore(tempDiv.firstElementChild, sibling.nextSibling);
            break;
          }
          sibling = sibling.nextElementSibling;
        }
      }
    }
  });

  // Remove Vocab Spotlights as they are redundant now
  const vocabSpotlights = document.querySelectorAll('.vocab-spotlight');
  vocabSpotlights.forEach(el => el.remove());

  fs.writeFileSync(filePath, dom.serialize(), 'utf8');
  console.log(`Updated ${file}`);
});
