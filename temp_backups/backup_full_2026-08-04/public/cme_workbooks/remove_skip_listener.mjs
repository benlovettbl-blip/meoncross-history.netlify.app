import fs from 'fs';

let layout = fs.readFileSync('src/layout.js', 'utf8');

// The block to remove starts at document.getElementById('btn-exam-skip')
const blockToRemove = `  document.getElementById('btn-exam-skip').addEventListener('click', () => {
    if (state.examSession.activeIndex >= state.examSession.questions.length) return;
    // Record empty answer and grade incorrect
    const q = state.examSession.questions[state.examSession.activeIndex];
    state.examSession.answers[q.id] = "(Skipped)";
    state.examSession.grades[q.id] = false;
    
    AudioEngine.play('fail');
    state.examSession.activeIndex++;
    
    if (state.examSession.activeIndex >= state.examSession.questions.length) {
      finishExam();
    } else {
      displayExamQuestion();
    }
  });`;

layout = layout.replace(blockToRemove, '');

fs.writeFileSync('src/layout.js', layout);
console.log("Removed btn-exam-skip listener");
