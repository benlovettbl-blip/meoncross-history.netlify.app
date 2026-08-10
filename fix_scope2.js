const fs = require('fs');
let f = fs.readFileSync('src/core_app.js', 'utf8');
f = f.replace(/function renderLesson\(lesson\) \{\s*window\.postRenderHooks = \[\];/, 'function renderLesson(lesson) {\n        window.postRenderHooks = [];\n        let htmlDoNow="", htmlPrimary="", htmlSources1="", htmlNarrative="", htmlPairShare="", htmlHistorian="", htmlTasks="";');
fs.writeFileSync('src/core_app.js', f);
