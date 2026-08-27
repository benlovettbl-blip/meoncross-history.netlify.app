const fs = require('fs');
['generate_pupil_workbooks.js', 'generate_workbooks.js', 'generate_textbooks.js'].forEach(f => {
  if (fs.existsSync(f)) {
    let c = fs.readFileSync(f, 'utf8');
    c = c.replace(
      /const processTaskTextWithTariff = \(text\) => {/,
      'const processTaskTextWithTariff = (text, isExamContext = false) => {'
    );
    c = c.replace(
      /let isExam = text\.toLowerCase\(\)\.includes\('assessment'\) \|\| \/\\b\\d\+\\s\*marks\?\\b\/i\.test\(text\) \|\| text\.toLowerCase\(\)\.includes\('explain why'\);/g,
      "let isExam = text.toLowerCase().includes('assessment') || /\\b\\d+\\s*marks?\\b/i.test(text) || (isExamContext && text.toLowerCase().includes('explain why'));"
    );
    // Replace all calls inside exam_practice or extended with true
    c = c.replace(/let _extInfo = processTaskTextWithTariff\(lesson\.extended\.question\);/g, 'let _extInfo = processTaskTextWithTariff(lesson.extended.question, true);');
    c = c.replace(/let _tInfo3 = processTaskTextWithTariff\(rawQText\);/g, 'let _tInfo3 = processTaskTextWithTariff(rawQText, true);');
    c = c.replace(/let _tInfo2 = processTaskTextWithTariff\(ep\.question\);/g, 'let _tInfo2 = processTaskTextWithTariff(ep.question, true);');
    
    // There is also `processTaskTextWithTariff(task.text || task.question ...)` in gcse_tasks. 
    // Wait, the gcse_task ALWAYS contains the word "marks" if it's an exam, or we can just pass true if `task.examQNum` exists!
    // But it's easier to just pass true where we know it's exam practice.
    // If it's `l.gcse_task.tasks`, the user didn't mention it. The only issue was regular tasks getting badged.
    
    fs.writeFileSync(f, c);
  }
});
