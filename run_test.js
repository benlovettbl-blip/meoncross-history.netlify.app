const fs = require('fs');
let pw = fs.readFileSync('generate_pupil_workbooks.js', 'utf8');
pw = pw.replace('obj.examQNum = globalExamQNum++;', 'obj.examQNum = globalExamQNum++; if(unitId==="edexcel_medicine") console.log("Assigned Q" + (globalExamQNum-1) + ": " + (qText || "").substring(0, 40).replace(/\\n/g, " "));');
fs.writeFileSync('temp_gen.js', pw);
const { execSync } = require('child_process');
execSync('node temp_gen.js', {stdio: 'inherit'});
