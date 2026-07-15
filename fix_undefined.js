const fs = require('fs');

const files = [
  './cme_new/generate_worksheets.js',
  './water_and_sanitation/generate_worksheets.js',
  './great_war/generate_worksheets.js'
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let code = fs.readFileSync(file, 'utf8');

  // Fix assignQuestionNumbers
  if (code.includes('if (lesson.gcse_task) lesson.gcse_task.qNum = q++;') && !code.includes('if (lesson.pair_share) lesson.pair_share.qNum = q++;')) {
    code = code.replace(
      'if (lesson.gcse_task) lesson.gcse_task.qNum = q++;',
      'if (lesson.gcse_task) lesson.gcse_task.qNum = q++;\n    if (lesson.pair_share) lesson.pair_share.qNum = q++;'
    );
  }

  // Fallback if assignQuestionNumbers completely lacks gcse_task (as seen in cme_new)
  if (!code.includes('lesson.gcse_task.qNum = q++')) {
     code = code.replace(
        'if (lesson.extended && lesson.extended.question) lesson.extended.qNum = q++;',
        'if (lesson.extended && lesson.extended.question) lesson.extended.qNum = q++;\n    if (lesson.gcse_task) lesson.gcse_task.qNum = q++;\n    if (lesson.pair_share) lesson.pair_share.qNum = q++;'
     );
  }

  // Fix GCSE Task
  const oldGCSE = "let cleanTask = (lesson.gcse_task.text || lesson.gcse_task.question || '').replace(/^(Q\\\\d+: |Task \\\\d+: |Question \\\\d+[a-z]?: |Enquiry Task: )/, '');";
  const newGCSE = "let cleanTask = (lesson.gcse_task.text || lesson.gcse_task.question || lesson.gcse_task.topic || '').replace(/^(Q\\\\d+: |Task \\\\d+: |Question \\\\d+[a-z]?: |Enquiry Task: )/, '');";
  if (code.includes(oldGCSE)) {
    code = code.replace(oldGCSE, newGCSE);
  }

  // Fix Pair & Share
  const oldPairShare = "html += `<p style=\"font-weight: bold;\">${lesson.pair_share.question || lesson.pair_share.text}</p>`;";
  const newPairShare = "let cleanTaskPS = (lesson.pair_share.question || lesson.pair_share.text || lesson.pair_share.prompt || '').replace(/^(Q\\\\d+: |Task \\\\d+: |Question \\\\d+[a-z]?: |Enquiry Task: )/, '');\n    html += `<p style=\"font-weight: bold;\">Q${lesson.pair_share.qNum || ''}. ${cleanTaskPS}</p>`;";
  if (code.includes(oldPairShare)) {
    code = code.replace(oldPairShare, newPairShare);
  }

  fs.writeFileSync(file, code, 'utf8');
  console.log('Fixed', file);
});
