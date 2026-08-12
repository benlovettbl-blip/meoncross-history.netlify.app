const fs = require('fs');
let code = fs.readFileSync('great_war/data.js', 'utf8');

code = code.replace(
  "A British political cartoon from 1897 showing Kaiser Wilhelm II.",
  "Source A: 'The Greedy Boy', a British political cartoon published in 1885 showing German Chancellor Otto von Bismarck."
);

code = code.replace(
  "the cartoon depicts Kaiser Wilhelm II greedily grabbing the globe, mocking his desire for global domination.",
  "the cartoon depicts Chancellor Bismarck greedily carving up colonial territories, mocking Germany's aggressive desire for a larger empire."
);

code = code.replace(
  "showing the expansion of Serbia after 1913.",
  "showing the borders of Serbia and the Austro-Hungarian Empire in 1914."
);

fs.writeFileSync('great_war/data.js', code);
console.log("Fixed data.js");
