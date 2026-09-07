const fs = require('fs');
const path = require('path');

const specChecklistPath =
  'C:\\Projects\\edexcelgcsehistoryusa.netlify.app\\src\\spec_checklist_data.js';
const content = fs.readFileSync(specChecklistPath, 'utf8');

// Use vm to execute cleanly
const vm = require('vm');
const scriptContext = { module: { exports: {} } };
vm.createContext(scriptContext);
const cjsCode = content.replace(/export\s+const\s+SPEC_CHECKLIST_DATA\s*=/, 'module.exports =');
vm.runInContext(cjsCode, scriptContext);
const specDataRaw = scriptContext.module.exports;

const ktTitles = {
  1: 'Key topic 1: The development of the civil rights movement, 1954–60',
  2: 'Key topic 2: Protest, progress and radicalism, 1960–75',
  3: 'Key topic 3: US involvement in the Vietnam War, 1954–75',
  4: 'Key topic 4: Reactions to, and the end of, US involvement in the Vietnam War, 1964–75',
};

const subtopicTitles = {
  '1_1': '1 The position of Black Americans in the early 1950s',
  '1_2': '2 Progress in education and legal challenges',
  '1_3': '3 The Montgomery Bus Boycott and its impact',
  '1_4': '4 The 1957 Civil Rights Act and Little Rock',
  '2_1': '1 Progress 1960–62: Sit-ins and Freedom Rides',
  '2_2': '2 Birmingham, Washington and the Civil Rights Act 1964',
  '2_3': '3 Selma, the Voting Rights Act 1965 and Malcolm X',
  '2_4': '4 Black Power, the Black Panthers and MLK assassination',
  '3_1': '1 Reasons for US involvement in Vietnam, 1954–63',
  '3_2': '2 Escalation under Johnson and the Gulf of Tonkin',
  '3_3': '3 Nature of the conflict: Vietcong tactics and US strategies',
  '3_4': '4 The Tet Offensive (1968) and its impact',
  '4_1': '1 Reasons for the growth of opposition to the war',
  '4_2': '2 Peace negotiations, Vietnamization and Nixon Doctrine',
  '4_3': '3 Widening the war: Cambodia and Laos, and Kent State',
  '4_4': '4 The Paris Peace Accords and the fall of Saigon',
};

const sections = [];

for (let kt = 1; kt <= 4; kt++) {
  const topics = [];
  for (let st = 1; st <= 4; st++) {
    const key = `subtopic_${kt}_${st}`;
    const items = specDataRaw[key] || [];
    const points = [];
    items.forEach((item) => {
      let pt = `**${item.point}**`;
      if (item.keyFacts && item.keyFacts.length > 0) {
        const factsText = item.keyFacts.map((f) => f.replace(/<[^>]+>/g, '')).join('; ');
        pt += `: ${factsText}`;
      }
      points.push(pt);
    });
    topics.push({
      title: subtopicTitles[`${kt}_${st}`] || `Topic ${kt}.${st}`,
      points: points,
    });
  }
  sections.push({
    id: `key-topic-${kt}`,
    title: ktTitles[kt],
    topics: topics,
  });
}

const finalSpec = {
  title: 'Pearson Edexcel GCSE (9–1) History Specification',
  subtitle: 'Option 33: Conflict at Home and Abroad: the USA, 1954–75',
  sections: sections,
};

fs.writeFileSync(
  path.join(__dirname, '../public/data/usa_spec.json'),
  JSON.stringify(finalSpec, null, 2),
  'utf8',
);
console.log('Successfully generated public/data/usa_spec.json with', sections.length, 'sections!');
