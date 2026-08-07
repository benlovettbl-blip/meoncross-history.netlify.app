const fs = require('fs');
let dataStr = fs.readFileSync('early_modern_world/data.js', 'utf8');

const reps = [
  {
    regex: /"source_letter": "B",\s*"tasks"/g,
    replace: `"source_letter": "B",
            "image_context": "Notice the prominent display of European flags (Danish, Spanish, American, Swedish, British, and Dutch) confined to a tiny strip of land outside the city walls. This image shatters the myth of European dominance in the 1700s—Western merchants were entirely at the mercy of the powerful Qing Emperor, restricted to these small 'factories' because China had little need for European goods, while Europeans desperately craved Chinese tea, silk, and porcelain.",
            "tasks"`
  },
  {
    regex: /"source_letter": "C",\s*"tasks"/g,
    replace: `"source_letter": "C",
            "image_context": "Observe the massive defensive walls of the city being breached by Ottoman cannons. The fall of Constantinople was a seismic shock to Christian Europe, not just religiously, but economically. With the Ottoman Empire now controlling the vital land routes to Asia, European merchants were suddenly cut off from the lucrative Silk Road, forcing them to look to the oceans for new routes to the East.",
            "tasks"`
  },
  {
    regex: /"source_letter": "D",\s*"tasks"/g,
    replace: `"source_letter": "D",
            "image_context": "Look closely at the intricate details of the figures, their weapons, and their ceremonial clothing. This is not primitive art; it requires highly advanced metallurgical skills (lost-wax casting) that rivalled or exceeded anything in Europe at the time. It serves as powerful evidence of the complex, wealthy, and highly organized societies that existed in West Africa long before European colonization.",
            "tasks"`
  },
  {
    regex: /"source_letter": "E",\s*"tasks"/g,
    replace: `"source_letter": "E",
            "image_context": "Trace the sprawling network of red lines stretching from China, across Central Asia, and into the Mediterranean. Before the era of global maritime empires, this was the economic superhighway of the world. Europe was merely a peripheral terminus at the far western edge of this vast Eurasian trading system, entirely dependent on Asian and Middle Eastern middlemen for luxury goods.",
            "tasks"`
  }
];

let lesson1End = dataStr.indexOf('"title": "How did religious conflict trigger global exploration');

let lesson1Str = dataStr.substring(0, lesson1End);
let restStr = dataStr.substring(lesson1End);

reps.forEach(r => {
  let rgx = new RegExp(r.regex.source, ''); 
  lesson1Str = lesson1Str.replace(rgx, r.replace);
});

fs.writeFileSync('early_modern_world/data.js', lesson1Str + restStr);
console.log('Injected contexts into Lesson 1 in data.js');
