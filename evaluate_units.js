const fs = require('fs');
const db = JSON.parse(fs.readFileSync('public/database.json', 'utf8'));

let md = '# Curriculum Unit Evaluation\n\n';
md += '| Unit | Total Lessons | Missing Do Nows | Missing Vocab | Missing Sources | Missing Exam Practice | Overall Status |\n';
md += '|---|---|---|---|---|---|---|\n';

Object.keys(db).forEach(unitId => {
  const unit = db[unitId].data;
  if (!unit || !unit.lessons) return;
  
  let total = 0;
  let noDoNow = [];
  let noVocab = [];
  let noSource = [];
  let noExam = [];
  
  let lessonCounter = 1;
  unit.lessons.forEach((l) => {
    if (l.title) {
        const t = l.title.toLowerCase();
        if (t === 'cover' || t.includes('cover page') || t.includes('assessment:') || t.includes('unit workbook')) {
            return;
        }
    }
    // Check if it's the title page (often lesson_0 or no id but index 0 in some units if named appropriately, but let's rely on keywords for now)
    if (l.id === 'lesson_0' && (!l.title || !l.title.toLowerCase().includes('kt1'))) {
        return;
    }
    
    total++;
    let lessonName = `L${lessonCounter}`;
    lessonCounter++;
    
    // 1. Do Now
    let hasDoNow = false;
    if (l.do_now) {
      if (Array.isArray(l.do_now)) hasDoNow = l.do_now.length > 0;
      else if (l.do_now.items && l.do_now.items.length > 0) hasDoNow = true;
      else if (typeof l.do_now === 'string' && l.do_now.length > 0) hasDoNow = true;
      else if (Object.keys(l.do_now).length > 0) hasDoNow = true;
    }
    if (!hasDoNow) noDoNow.push(lessonName);
    
    // 2. Vocab
    let vCount = 0;
    if (l.vocabulary && Array.isArray(l.vocabulary)) vCount += l.vocabulary.length;
    if (l.vocab && Array.isArray(l.vocab)) vCount += l.vocab.length;
    if (l.glossary && Array.isArray(l.glossary)) vCount += l.glossary.length;
    if (vCount === 0) noVocab.push(lessonName);
    
    // 3. Sources
    let sCount = 0;
    if (l.sources && Array.isArray(l.sources) && l.sources.length > 0) sCount += l.sources.length;
    if (l.source_a || l.source_b) sCount++;
    
    // Helper to deeply check for source/image indicators in any object
    const deepCheckSource = (obj) => {
       if (!obj) return 0;
       let count = 0;
       let str = JSON.stringify(obj);
       if (str.includes('"image"') || str.includes('"source_letter"') || str.includes('"image_alt"') || str.includes('"caption"')) count++;
       if (str.includes('Source A') || str.includes('Source B') || str.includes('Source C') || str.includes('Source D')) count++;
       if (obj.sources && Array.isArray(obj.sources) && obj.sources.length > 0) count++;
       if (obj.interpretations && Array.isArray(obj.interpretations) && obj.interpretations.length > 0) count++;
       if (obj.stimulus && Array.isArray(obj.stimulus) && obj.stimulus.length > 0) count++;
       return count;
    };
    
    if (l.exam_practice) sCount += deepCheckSource(l.exam_practice);
    if (l.gcse_task) sCount += deepCheckSource(l.gcse_task);
    if (l.extended) sCount += deepCheckSource(l.extended);
    if (l.narrative_blocks) sCount += deepCheckSource(l.narrative_blocks);
    if (l.historians_corner) sCount += deepCheckSource(l.historians_corner);
    if (l.do_now) sCount += deepCheckSource(l.do_now);
    if (l.pair_share) sCount += deepCheckSource(l.pair_share);
    if (l.primary_source) sCount += deepCheckSource(l.primary_source);
    
    if (sCount === 0) noSource.push(lessonName);
    
    // 4. Exam Practice
    let hasExam = false;
    if (l.exam_practice) {
      if (Array.isArray(l.exam_practice) && l.exam_practice.length > 0) hasExam = true;
      else if (l.exam_practice.questions && l.exam_practice.questions.length > 0) hasExam = true;
      else if (l.exam_practice.question) hasExam = true;
      else if (Object.keys(l.exam_practice).length > 0) hasExam = true;
    }
    if (l.gcse_task && (l.gcse_task.questions || l.gcse_task.question || l.gcse_task.tasks)) hasExam = true;
    if (l.extended && (l.extended.question || l.extended.questions || l.extended.tasks)) hasExam = true;
    
    // Sometimes exam practice is just under 'tasks' array on the lesson
    if (l.tasks && Array.isArray(l.tasks) && l.tasks.some(t => t.type === 'exam' || t.type === 'gcse')) hasExam = true;

    // Sometimes narrative blocks have tasks with type 'exam'
    if (l.narrative_blocks && Array.isArray(l.narrative_blocks)) {
        l.narrative_blocks.forEach(nb => {
            if (nb.tasks && Array.isArray(nb.tasks)) {
                nb.tasks.forEach(t => {
                    if (t.type && (t.type.includes('exam') || t.type.includes('gcse') || t.type.includes('16 marks') || t.type.includes('12 marks') || t.type.includes('8 marks'))) {
                        hasExam = true;
                    }
                });
            }
        });
    }

    if (!hasExam) noExam.push(lessonName);
  });
  
  let status = '✅ Complete';
  if (noDoNow.length > 0 || noVocab.length > 0 || noSource.length > 0 || noExam.length > 0) status = '⚠️ Needs Work';
  if (total === 0) status = '❌ Empty';
  
  const formatCell = (arr) => {
     if (arr.length === 0) return '✅';
     return `**${arr.length}**<br><span style="font-size: 0.8em; color: #64748b;">(${arr.join(', ')})</span>`;
  };

  md += `| **${unit.title || unitId}** (${unitId}) | ${total} | ${formatCell(noDoNow)} | ${formatCell(noVocab)} | ${formatCell(noSource)} | ${formatCell(noExam)} | ${status} |\n`;
});

fs.writeFileSync('C:/Users/fives/.gemini/antigravity-ide/brain/90f3ce63-12a1-4694-b0a4-505042e3b38d/unit_evaluation.md', md, 'utf8');
console.log('Evaluation written to unit_evaluation.md');
