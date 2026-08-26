const fs = require('fs');
const path = require('path');

const units = [
  'water_and_sanitation',
  'change_1450_1750',
  'great_war',
  'cme_new',
  'edexcel_medicine'
];

let violations = [];

units.forEach(unit => {
  const dataPath = path.join(__dirname, 'public', 'units', unit, 'data.js');
  if (!fs.existsSync(dataPath)) {
    console.log(`Missing data for ${unit}`);
    return;
  }
  
  let dataStr = fs.readFileSync(dataPath, 'utf8');
  dataStr = dataStr.replace(/export\s+const\s+(\w+)\s*=/g, 'const $1 =');
  dataStr = dataStr.replace(/export\s+default\s+\w+;?/g, '');
  
  let data;
  try {
    const fn = new Function('module', 'exports', 'require', dataStr + '\nreturn typeof unitData !== "undefined" ? unitData : typeof lessonData !== "undefined" ? lessonData : module.exports;');
    const m = { exports: {} };
    data = fn(m, m.exports, require);
  } catch (e) {
    console.log(`Error parsing ${unit}:`, e.message);
    return;
  }
  
  if (!data) {
     console.log('No data returned for', unit);
     return;
  }
  const lessons = data.lessons || (data.unitData && data.unitData.lessons) || [];
  
  lessons.forEach((lesson, index) => {
    if (lesson.do_now && Array.isArray(lesson.do_now.items)) {
      lesson.do_now.items.forEach(dn => {
        violations.push({
          unit,
          lesson: index + 1,
          lessonTitle: lesson.title,
          question: dn.question || dn.text,
          answer: dn.answer
        });
      });
    } else if (Array.isArray(lesson.do_now)) {
       lesson.do_now.forEach(dn => {
        violations.push({
          unit,
          lesson: index + 1,
          lessonTitle: lesson.title,
          question: dn.question || dn.text,
          answer: dn.answer
        });
      });
    }
  });
});

fs.writeFileSync('term1_donows_audit.json', JSON.stringify(violations, null, 2));
console.log('Audited Do Nows and saved to term1_donows_audit.json');
