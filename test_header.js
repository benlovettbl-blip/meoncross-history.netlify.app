const { unitData } = require('./edexcel_medicine/data.js');
const lesson = unitData.lessons.find(l => l.id === 'lesson_1_2');
let lessonPrefix = 'Lesson';
let ktMatch = lesson.title ? lesson.title.match(/^(?:KT|Key Topic)\s*([\d\.]+)/i) : null;
if (ktMatch) lessonPrefix = `KT ${ktMatch[1]}`;

let headerEnquiry = lesson.enquiry || lesson.enquiry_question || lesson.inquiry_question;
let targetText = headerEnquiry || lesson.title || '';
let stickyHeaderText = '';

if (/^(?:KT|Key Topic|Lesson)\s*[\d\.]+/i.test(targetText)) {
  stickyHeaderText = targetText;
} else {
  stickyHeaderText = `${lessonPrefix}: ${targetText}`;
}
console.log('SIMULATED HEADER OUTPUT:', stickyHeaderText);
