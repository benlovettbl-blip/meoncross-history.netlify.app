const fs = require('fs');

const backgrounds = {
  'cme_new': '/units/cme_new/assets/yom_kippur_crossing.png',
  'edexcel_medicine': '/images/vesalius_muscle_men.jpg',
  'great_war': '/units/great_war/assets/ww1_road_to_war.png',
  'great_war_part2': '/units/great_war_part2/assets/map_postwar_europe.jpg',
  'water_and_sanitation': '/units/water_and_sanitation/assets/snow_cholera_map.jpg'
};

for (const unit of Object.keys(backgrounds)) {
  const file = 'public/units/' + unit + '/data.js';
  if (fs.existsSync(file)) {
     let content = fs.readFileSync(file, 'utf8');
     if (!content.includes('homepage_background')) {
        content = content.replace(/title:\s*"([^"]+)",/, 'title: "$1",\n  homepage_background: "' + backgrounds[unit] + '",');
        fs.writeFileSync(file, content);
     }
  }
}
