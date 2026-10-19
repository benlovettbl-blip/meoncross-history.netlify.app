const fs = require('fs');
const path = require('path');

const dataFile = path.join(__dirname, '..', 'units', 'ks2_ww2', 'data.js');
let content = fs.readFileSync(dataFile, 'utf8');

// 1. Root updates
content = content.replace(
  "homepage_background: '/units/ks2_ww2/assets/evacuees_railway_1939.jpg',",
  "homepage_background: '/units/ks2_ww2/assets/gas_masks_children_1939.jpg',\n  cover_image: '/units/ks2_ww2/assets/gas_masks_children_1939.jpg',\n  cover_image_position: 'center 85%',",
);
// Remove any duplicate cover_image if already there
content = content.replace(
  "cover_image: '/units/ks2_ww2/assets/gas_masks_children_1939.jpg',\n  cover_image: '/units/ks2_ww2/assets/gas_masks_children_1939.jpg',",
  "cover_image: '/units/ks2_ww2/assets/gas_masks_children_1939.jpg',",
);

// 2. Lesson configurations
const lessonConfigs = {
  lesson_1: {
    hero_image: '/units/ks2_ww2/assets/gas_masks_children_1939.jpg',
    banner_position: 'center 82%',
    card_position: 'center 82%',
  },
  lesson_2: {
    hero_image: '/units/ks2_ww2/assets/evacuees_railway_1939.jpg',
    banner_position: 'center 55%',
    card_position: 'center 55%',
  },
  lesson_3: {
    hero_image: '/units/ks2_ww2/assets/kindertransport_arrival.jpg',
    banner_position: 'center 45%',
    card_position: 'center 45%',
  },
  lesson_4: {
    hero_image: '/units/ks2_ww2/assets/anderson_shelter_family.jpg',
    banner_position: 'center 30%',
    card_position: 'center 32%',
  },
  lesson_5: {
    hero_image: '/units/ks2_ww2/assets/dig_for_victory_poster.jpg',
    banner_position: 'center 18%',
    card_position: 'center 22%',
  },
  lesson_6: {
    hero_image: '/units/ks2_ww2/assets/womens_land_army_harvest.jpg',
    banner_position: 'center 70%',
    card_position: 'center 70%',
  },
  lesson_7: {
    hero_image: '/units/ks2_ww2/assets/prewar_children_holiday.jpg',
    banner_position: 'center 30%',
    card_position: 'center 32%',
  },
  lesson_8: {
    hero_image: '/units/ks2_ww2/assets/enigma_machine_bletchley.jpg',
    banner_position: 'center 50%',
    card_position: 'center 50%',
  },
  lesson_9: {
    hero_image: '/units/ks2_ww2/assets/winton_prague_child_1939.jpg',
    banner_position: 'center 20%',
    card_position: 'center 20%',
  },
  lesson_10: {
    hero_image: '/units/ks2_ww2/assets/ve_day_street_party_1945.jpg',
    banner_position: 'center 88%',
    card_position: 'center 88%',
  },
};

for (const [lessonId, cfg] of Object.entries(lessonConfigs)) {
  const lessonRegex = new RegExp(`id:\\s*'${lessonId}',[\\s\\S]*?skill:`);
  content = content.replace(lessonRegex, (match) => {
    return `id: '${lessonId}',\n      hero_image: '${cfg.hero_image}',\n      banner_position: '${cfg.banner_position}',\n      card_position: '${cfg.card_position}',\n      skill:`;
  });
}

fs.writeFileSync(dataFile, content, 'utf8');
console.log('Successfully updated units/ks2_ww2/data.js!');
