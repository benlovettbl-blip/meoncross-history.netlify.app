const fs = require('fs');
const content = fs.readFileSync('public/units/weimar_nazi_germany/data.js', 'utf8');
const vm = require('vm');
const script = new vm.Script(content + ';\n unitData;');
const context = { mock_exams: [] };
vm.createContext(context);
try {
  const result = script.runInContext(context);
  console.log(JSON.stringify(result.lessons[1].do_now, null, 2));
} catch (e) {
  console.error(e);
}
