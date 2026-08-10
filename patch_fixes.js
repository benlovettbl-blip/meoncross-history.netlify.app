const fs = require('fs');

function patchFrayerModel(filename, isWorkbook) {
  let code = fs.readFileSync(filename, 'utf8');
  
  const oldFrayerRegex = /\} else if \(vocabStyle === 2\) \{[\s\S]*?<\/table>\s*`;\s*\}/;
  
  let newFrayer = '} else if (vocabStyle === 2) {\n';
  newFrayer += '        starterActivitiesHtml += `<p style="font-weight: bold; font-size: 9.5pt; margin: 2px 0;">Style: Definition & Example</p>`;\n';
  newFrayer += '        let focusWord = vocabTerms[0].term;\n';
  newFrayer += '        starterActivitiesHtml += `<p style="font-style: italic; font-size: 9.5pt; margin: 2px 0 5px 0;">Define the term <strong>${focusWord}</strong> in your own words, and provide one historical example.</p>`;\n';
        
  if (isWorkbook) {
    newFrayer += '        starterActivitiesHtml += `<div class="task-lines" style="height: 12px; margin-top: 3px;"></div><div class="task-lines" style="height: 12px; margin-top: 3px;"></div><div class="task-lines" style="height: 12px; margin-top: 3px;"></div>`;\n';
  }
  newFrayer += '      }';

  code = code.replace(oldFrayerRegex, newFrayer);
  fs.writeFileSync(filename, code);
  console.log('Patched Frayer model in ' + filename);
}

function stripWorkbookImages() {
  let code = fs.readFileSync('generate_workbooks.js', 'utf8');
  
  // Strip primary sources block
  const oldPrimarySource = /let primarySourceHtml = '';[\s\S]*?\/\/ Starter Activities \(Do Now & Vocab stacked\) Generation/m;
  const newPrimarySource = "let primarySourceHtml = '';\n    // Starter Activities (Do Now & Vocab stacked) Generation";
  code = code.replace(oldPrimarySource, newPrimarySource);
  
  // Double check narrative images are stripped. We already nullified finalRenderedText, 
  // but if any <img tags slipped through, let's remove them directly from the HTML generation.
  // We can just wipe out 'imageHtml' again.
  code = code.replace(/let imageHtml = '';[\s\S]*?const bg = /m, 'let imageHtml = ""; const bg = ');

  fs.writeFileSync('generate_workbooks.js', code);
  console.log('Stripped visual sources from workbook');
}

patchFrayerModel('generate_textbooks.js', false);
patchFrayerModel('generate_workbooks.js', true);
stripWorkbookImages();
