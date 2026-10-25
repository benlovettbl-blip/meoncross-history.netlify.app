const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const coldWarDataPath = path.join(ROOT, 'units', 'cold_war', 'data.js');
let raw = fs.readFileSync(coldWarDataPath, 'utf8');

// Bridge of Spies 2015 Object
const bridgeOfSpiesVideo = {
  type: 'youtube',
  url: 'https://www.youtube.com/watch?v=mBBuzHrZBro',
  id: 'mBBuzHrZBro',
  title: 'Bridge of Spies (2015, Steven Spielberg / Tom Hanks) | Official Trailer',
  duration: '2 mins 24 secs',
  pathway: 'Cinematic',
  tier: 'Tier 3: Cinematic Feature',
  teacher_guidance: 'Steven Spielberg’s historical drama depicting the U-2 reconnaissance crisis, CIA-KGB tradecraft, the newly erected Berlin Wall, and the tense prisoner exchange of pilot Francis Gary Powers and student Frederic Pryor for Soviet spy Rudolf Abel on the Glienicke Bridge. Recommended Watch Window: 00:00–02:24 (Full Trailer). Lesson Phase: Cinematic Starter Hook & Espionage Duel. Tone Alert: Tense, authentic historical recreation of Cold War clandestine confrontation.',
  viewing_task: '<p><strong>Cinematic Discussion Focus:</strong> Notice the stark visual contrast between comfortable Brooklyn courtrooms and the frozen, barbed-wire ruins of divided East Berlin. Observe how the shootdown of Francis Gary Powers’ U-2 spy plane and the sudden construction of the Berlin Wall in August 1961 heighten the risk of war. How does the trailer dramatize the extreme vulnerability of individual operatives caught between superpower intelligence agencies compared to formal diplomatic negotiations?</p>',
  model_answer: '<p><strong>Cinematic Analysis:</strong> Spielberg contrasts the constitutional rule of law championed by James B. Donovan (arguing that American principles require a vigorous legal defense even for Soviet spies like Rudolf Abel) with the realpolitik of the CIA and KGB, who treat individuals as expendable assets. The high-altitude U-2 reconnaissance sequence illustrates how photographic surveillance stripped away Soviet secrecy—the exact technological mechanism that would, months later in October 1962, capture the photographic proof of Soviet SS-4 ballistic missiles in San Cristóbal, Cuba, triggering the Cuban Missile Crisis.</p>'
};

// Parse cold war data
let evalCode = raw.replace('export const unitData =', 'var unitData =').replace('const unitData =', 'var unitData =');
evalCode = evalCode.replace(/export\s*\{[^}]*\};?/g, '');
evalCode = evalCode.replace(/export\s+default\s+unitData;?/g, '');
eval(evalCode);

console.log('Unit loaded:', unitData.title);

// Lesson 3: The Iron Curtain & The Berlin Blockade
const l3 = unitData.lessons.find(l => l.id === 'lesson_3' || l.title.includes('Iron Curtain'));
if (l3) {
  // Add Bridge of Spies or replace Dr. Strangelove
  const existingBos = (l3.video || []).find(v => v.id === 'mBBuzHrZBro' || (v.title && v.title.includes('Bridge of Spies')));
  if (!existingBos) {
    l3.video.push(bridgeOfSpiesVideo);
    console.log('Added Bridge of Spies to Lesson 3 (total videos:', l3.video.length + ')');
  }
}

// Lesson 4: Cuban Missile Crisis
const l4 = unitData.lessons.find(l => l.id === 'lesson_4' || l.title.includes('Cuban Missile Crisis'));
if (l4) {
  const existingBos = (l4.video || []).find(v => v.id === 'mBBuzHrZBro' || (v.title && v.title.includes('Bridge of Spies')));
  if (!existingBos) {
    l4.video.splice(2, 0, bridgeOfSpiesVideo); // Place right next to Thirteen Days
    console.log('Added Bridge of Spies to Lesson 4 (total videos:', l4.video.length + ')');
  }
}

// Format back to JSON module
const outCode = `export const unitData = ${JSON.stringify(unitData, null, 2)};\n`;
fs.writeFileSync(coldWarDataPath, outCode, 'utf8');
fs.writeFileSync(path.join(ROOT, 'public', 'units', 'cold_war', 'data.js'), outCode, 'utf8');

console.log('Successfully updated cold_war/data.js and public/units/cold_war/data.js!');
