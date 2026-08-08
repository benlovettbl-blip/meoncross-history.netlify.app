const fs = require('fs');
const path = require('path');

let data;
try {
    data = require('./weimar_nazi_germany/data.js').unitData;
} catch (e) {
    console.error("Could not require data.js:", e);
    process.exit(1);
}

if (!data.key_individuals) data.key_individuals = [];
if (!data.geographical_locations) data.geographical_locations = [];

const newHistorians = [
    {
      "name": "Prof. Ian Kershaw",
      "role": "Modern British Historian",
      "bio": "One of the world's leading experts on Hitler and Nazi Germany. He coined the 'Hitler Myth' and focuses on how the German people 'worked towards the Fhrer'.",
      "actions": "<ul><li>Author of the definitive biography of Adolf Hitler.</li><li>Explored the 'structuralist' view of how Nazi power actually functioned day-to-day.</li></ul>",
      "achievements": "Focus: The 'Hitler Myth' & Structuralism",
      "group": "Historians",
      "image": "/images/individuals/ian_kershaw.jpg"
    },
    {
      "name": "Prof. Richard J. Evans",
      "role": "Modern British Historian",
      "bio": "A specialist in modern German history, most famous for his comprehensive 'Third Reich' trilogy.",
      "actions": "<ul><li>Wrote 'The Coming of the Third Reich', 'The Third Reich in Power', and 'The Third Reich at War'.</li><li>Acted as an expert witness in the David Irving Holocaust denial trial.</li></ul>",
      "achievements": "Focus: Comprehensive analysis of Nazi Germany",
      "group": "Historians",
      "image": "/images/individuals/richard_evans.jpg"
    },
    {
      "name": "Prof. Mary Fulbrook",
      "role": "Modern British Historian",
      "bio": "A leading historian of Germany who focuses on the everyday lives of ordinary Germans under the Nazi dictatorship.",
      "actions": "<ul><li>Author of 'Dissonant Lives: Generations and Violence Through the German Dictatorships'.</li><li>Explored the complex nature of 'complicity' among ordinary citizens.</li></ul>",
      "achievements": "Focus: 'Alltagsgeschichte' (Everyday History) & Complicity",
      "group": "Historians",
      "image": "/images/individuals/mary_fulbrook.jpg"
    }
];

const newLocations = [
    {
      "name": "Berlin",
      "region": "Prussia, Germany",
      "coordinates": "52° 31' N, 13° 24' E",
      "description": "The capital of Germany. It was a center of thriving, avant-garde culture during the 'Golden Age' of Weimar, but later became the dark heart of the Nazi dictatorship.",
      "image": "/images/locations/berlin_reichstag.jpg",
      "mapQuery": "Berlin, Germany",
      "timeline": [
        "1919 - Spartacist Uprising suppressed in the streets.",
        "1920s - Becomes a hub of cabaret, cinema, and modernism.",
        "1933 - The Reichstag Fire destroys the parliament building.",
        "1936 - Hosts the propaganda-heavy Olympic Games."
      ]
    },
    {
      "name": "Munich",
      "region": "Bavaria, Germany",
      "coordinates": "48° 8' N, 11° 34' E",
      "description": "The capital of Bavaria and the 'Capital of the Movement' for the Nazi Party. It was a hotbed of right-wing extremism after World War I.",
      "image": "/images/locations/munich_odeonsplatz.jpg",
      "mapQuery": "Munich, Germany",
      "timeline": [
        "1919 - The short-lived Bavarian Soviet Republic is crushed.",
        "1920 - The DAP becomes the NSDAP (Nazi Party) at the Hofbruhaus.",
        "1923 - Hitler leads the failed Munich Putsch (Beer Hall Putsch).",
        "1938 - The Munich Agreement is signed, giving the Sudetenland to Germany."
      ]
    },
    {
      "name": "Weimar",
      "region": "Thuringia, Germany",
      "coordinates": "50° 59' N, 11° 19' E",
      "description": "A quiet cultural city that gave its name to the new German Republic, as the National Assembly met here in 1919 because Berlin was too dangerous.",
      "image": "/images/locations/weimar_city.jpg",
      "mapQuery": "Weimar, Germany",
      "timeline": [
        "1919 - The new democratic constitution is drafted here.",
        "1919 - Walter Gropius founds the Bauhaus school of design.",
        "1925 - The Bauhaus is forced to move to Dessau due to right-wing pressure.",
        "1937 - Buchenwald concentration camp is built just outside the city."
      ]
    },
    {
      "name": "Nuremberg",
      "region": "Bavaria, Germany",
      "coordinates": "49° 27' N, 11° 4' E",
      "description": "An ancient, highly symbolic German city chosen by the Nazis to host their massive, highly choreographed annual party rallies.",
      "image": "/images/locations/nuremberg_rally.jpg",
      "mapQuery": "Nuremberg, Germany",
      "timeline": [
        "1927 - The first Nazi Party rally is held here.",
        "1933 - Hitler declares Nuremberg the 'City of the Party Rallies'.",
        "1935 - The antisemitic 'Nuremberg Laws' are passed during a rally.",
        "1945 - Chosen as the site for the post-war war crimes trials."
      ]
    }
];

// Safely append historians
for (const hist of newHistorians) {
    if (!data.key_individuals.some(i => i.name === hist.name)) {
        data.key_individuals.push(hist);
    }
}

// Safely append locations
for (const loc of newLocations) {
    if (!data.geographical_locations.some(l => l.name === loc.name)) {
        data.geographical_locations.push(loc);
    }
}

// Write back to file
const newDataStr = `const unitData = ${JSON.stringify(data, null, 2)};\n\nif (typeof module !== 'undefined') {\n  module.exports = { unitData };\n}\n`;
fs.writeFileSync('weimar_nazi_germany/data.js', newDataStr, 'utf8');

console.log("Successfully injected Historians and Locations into Weimar Germany!");
