const fs = require('fs');

// 1. Fix Pupil Workbooks Template Literal for Q[Num].
let pup = fs.readFileSync('generate_pupil_workbooks.js', 'utf8');
pup = pup.replace(
    /\$\{source\.qNum \? "Q" \+ source\.qNum \+ "\. " : ""\} \$\{source\.question\}/g,
    'Q${source.qNum}. ${source.question}'
);
pup = pup.replace(
    /\$\{block\.source\.qNum \? "Q" \+ block\.source\.qNum \+ "\. " : ""\}\$\{block\.source\.question\}/g,
    'Q${block.source.qNum}. ${block.source.question}'
);
pup = pup.replace(
    /<strong>Q\$\{lesson\.primary_source\.qNum\}\. \$\{lesson\.primary_source\.question\.replace/g,
    '<strong>Q${lesson.primary_source.qNum}. ${lesson.primary_source.question.replace'
);

// 2. Fix Pupil Workbooks Cover bracket typo (Remove strong tags)
pup = pup.replace(
    /<div style="text-align: center; font-size: 14pt; margin-top: 15px; color: #1e293b;"><strong>Scholar:<\/strong> \[__________\] &nbsp;&nbsp;&nbsp;&nbsp; <strong>Class:<\/strong> \[____\]<\/div>/g,
    '<div style="text-align: center; font-size: 14pt; margin-top: 15px; color: #1e293b; font-weight: bold;">Scholar: [__________] &nbsp;&nbsp;&nbsp;&nbsp; Class: [____]</div>'
);
fs.writeFileSync('generate_pupil_workbooks.js', pup, 'utf8');

// 3. Fix Textbooks Template Literal for Q[Num]. and Ghost Heading
let txt = fs.readFileSync('generate_textbooks.js', 'utf8');
txt = txt.replace(
    /\$\{source\.qNum \? "Q" \+ source\.qNum \+ "\. " : ""\} \$\{source\.question\}/g,
    'Q${source.qNum}. ${source.question}'
);
txt = txt.replace(
    /\$\{block\.source\.qNum \? "Q" \+ block\.source\.qNum \+ "\. " : ""\} \$\{block\.source\.question\}/g,
    'Q${block.source.qNum}. ${block.source.question}'
);
txt = txt.replace(
    /if \(lesson\.tasks && lesson\.tasks\.length > 0\) \{/g,
    'if (lesson.tasks && lesson.tasks.filter(t => t.text || t.question).length > 0) {'
);
fs.writeFileSync('generate_textbooks.js', txt, 'utf8');
console.log('Fixes applied!');
