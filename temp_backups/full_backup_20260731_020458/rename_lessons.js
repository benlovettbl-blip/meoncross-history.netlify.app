const fs = require('fs');
let code = fs.readFileSync('great_war/data.js', 'utf8'); 

code = code.replace(/title: "How did the Franco-Prussian War create a lasting legacy of hatred\?"/g, 'title: "Lesson 1: How did the Franco-Prussian War create a lasting legacy of hatred?"'); 
code = code.replace(/title: "To what extent did the 'Scramble for Africa' increase tension in Europe\?"/g, 'title: "Lesson 2: To what extent did the \'Scramble for Africa\' increase tension in Europe?"'); 
code = code.replace(/title: "Why did a battleship building contest destroy Anglo-German relations\?"/g, 'title: "Lesson 3: Why did a battleship building contest destroy Anglo-German relations?"'); 
code = code.replace(/title: "Did the Alliance System protect Europe or guarantee a global war\?"/g, 'title: "Lesson 4: Did the Alliance System protect Europe or guarantee a global war?"'); 
code = code.replace(/title: "Why did a single assassination in Sarajevo ignite a World War\?"/g, 'title: "Lesson 5: Why did a single assassination in Sarajevo ignite a World War?"'); 

fs.writeFileSync('great_war/data.js', code); 
console.log('Updated lesson titles in great_war/data.js');
