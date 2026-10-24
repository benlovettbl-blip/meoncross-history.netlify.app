const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const rootDir = path.resolve(__dirname, '..');
const dataJsPath = path.join(rootDir, 'units', 'usa', 'data.js');
const pubJsonPath = path.join(rootDir, 'public', 'data', 'usa.json');
const dbPath = path.join(rootDir, 'public', 'database.json');

const USA_PEDAGOGY = {
  // LESSON 1.1: What was the position of Black Americans in the early 1950s?
  lesson_1_1: [
    {
      match: /voter registration|Deep South/i,
      hinge_question:
        'Why did white authorities rely on both administrative tricks (like literacy tests) and economic intimidation to prevent Black citizens from exercising their constitutional right to vote?',
      discussion_ideas: [
        "Administrative Plausible Deniability: White registrars used subjective 'literacy tests' and confusing constitutional interpretation clauses to disguise racial disenfranchisement as objective civic qualifications; this allowed Southern state governments to circumvent the Fifteenth Amendment in federal courts by claiming they were merely ensuring voters were educated.",
        'Devastating Economic Coercion Without State Violence: In the rural Jim Crow South, most Black citizens worked as sharecroppers, domestic laborers, or tenant farmers dependent on white landowners and white-owned banks; by threatening immediate job dismissal, home evictions, and calling in agricultural loans, white elites could enforce political subjugation quietly and effectively without needing police or Klan violence.',
      ],
    },
  ],

  // LESSON 2.1: How did peaceful protests force the government to act?
  lesson_2_1: [
    {
      match: /Freedom Rider|Anniston/i,
      hinge_question:
        'How did the willingness of Freedom Riders to risk fatal violence expose the moral bankruptcy of Southern white resistance to national and international audiences?',
      discussion_ideas: [
        'Shocking Moral Contrast on National Television: The image of dignified, non-violent young Black and white students being firebombed aboard a public Greyhound bus and beaten with iron pipes by white mobs in Anniston and Birmingham, while local police deliberately delayed intervention, visually shattered Southern claims of a peaceful, paternalistic society and horrified Northern television viewers.',
        "Cold War Geopolitical Embarrassment for the Federal Government: The brutal violence occurred right before President John F. Kennedy's Vienna summit with Soviet Premier Nikita Khrushchev; Soviet propaganda exploited the images of burning buses and bleeding American citizens to accuse the US of hypocrisy in championing global freedom, forcing Robert Kennedy and the Interstate Commerce Commission to finally enforce federal desegregation on interstate transport.",
      ],
    },
  ],

  // LESSON 3.1: Why did the US support the unpopular government of Ngo Dinh Diem?
  lesson_3_1: [
    {
      match: /Strategic Hamlet/i,
      hinge_question:
        'Why did the US and Diem fail to realize that forcibly separating Vietnamese peasants from their ancestral land would strengthen, rather than weaken, the Vietcong insurgency?',
      discussion_ideas: [
        'The Strategic Hamlet Program demonstrated a fatal misunderstanding of traditional Vietnamese rural culture and Buddhist religious values. In Vietnamese society, family identity and spiritual life were intimately tied to ancestral villages and sacred burial plots; uprooting over eight million peasants behind barbed-wire perimeters and watchtowers made them feel like prisoners in concentration camps rather than protected citizens. Furthermore, forcing peasants to build their own huts without compensation while corrupt Saigon officials stole financial aid created intense resentment against the Diem regime. Consequently, instead of severing ties with the National Liberation Front, the hamlets became fertile recruiting grounds for the Vietcong, who infiltrated the compounds from within and presented themselves as protectors of traditional village life against corrupt, foreign-backed oppressors.',
      ],
    },
  ],

  // LESSON 3.4: What was Nixon's 'Vietnamization' policy?
  lesson_3_4: [
    {
      match: /Cambodian incursion|Kent State shootings, May 1970/i,
      hinge_question:
        'Why did the expansion of the Vietnam War into neutral Cambodia cause such an immediate and explosive reaction on American university campuses?',
      discussion_ideas: [
        "Sense of Betrayal Over Nixon's Peace Promises: President Nixon had campaigned on a secret plan to end the war and had repeatedly assured the public that 'Vietnamization' was steadily withdrawing American troops and winding down the conflict; announcing a massive ground invasion of neutral Cambodia on 30 April 1970 felt like a blatant expansion and escalation of the war, shattering public trust in the presidency.",
        'Direct Threat to College Students and the Draft: Expanding military operations into Cambodia reignited intense student panic over the military draft, threatening hundreds of thousands of young men who faced conscription to fight in a widened war they viewed as morally unjust, triggering student strikes and shutdowns across more than 400 campuses nationwide.',
      ],
    },
  ],

  // LESSON 4.1: Why did so many Americans oppose the Vietnam War?
  lesson_4_1: [
    {
      match: /Kent State University student.*4 May 1970/i,
      hinge_question:
        'Why did the use of lethal military force against domestic student demonstrators provoke such shock and moral outrage across the United States?',
      discussion_ideas: [
        'The Kent State massacre on 4 May 1970 marked a horrifying psychological threshold where the violence of the Vietnam War—previously seen on television screens taking place in distant Asian jungles—was unleashed directly against unarmed American youth on an ordinary college campus in Ohio. Twenty-eight National Guardsmen firing 67 rounds of combat ammunition into a crowd of unarmed students, killing four (including two bystanders walking between classes) and wounding nine, shattered the foundational democratic expectation that peaceful protest was protected by the First Amendment. The iconic photograph of fourteen-year-old runaway Mary Ann Vecchio kneeling and screaming in grief over the slain body of student Jeffrey Miller became a searing national symbol of a country violently divided against itself, sparking a nationwide student strike of over four million college students and pushing American society into its deepest domestic crisis since the Civil War.',
      ],
    },
  ],
};

async function main() {
  console.log('🚀 Starting USA (1954–1975) Enrichment...');

  // Load from data.js
  const fileUrl = pathToFileURL(dataJsPath).href;
  const dataModule = await import(fileUrl);
  const unitData = dataModule.default || dataModule.unitData;

  let totalSourcesUpdated = 0;
  let totalNarrativeUpdated = 0;

  unitData.lessons.forEach((l) => {
    const rules = USA_PEDAGOGY[l.id];
    if (!rules) return;

    console.log(`\nWiring ${l.id} (${l.title})...`);

    function matchRule(s) {
      const textToMatch = [s.title, s.id, s.caption, s.source_context].filter(Boolean).join(' ');
      return rules.find((r) => r.match.test(textToMatch));
    }

    // 1. Update l.sources if any
    (l.sources || []).forEach((s, idx) => {
      const rule = matchRule(s);
      if (rule) {
        s.hinge_question = rule.hinge_question;
        s.discussion_ideas = rule.discussion_ideas;
        totalSourcesUpdated++;
        console.log(
          `  ✅ [l.sources ${idx}] "${s.title}" -> ${rule.discussion_ideas.length} idea(s)`,
        );
      }
    });

    // 2. Update narrative_blocks
    (l.narrative_blocks || []).forEach((b, idx) => {
      if (b.source) {
        const rule = matchRule(b.source);
        if (rule) {
          b.source.hinge_question = rule.hinge_question;
          b.source.discussion_ideas = rule.discussion_ideas;
          totalNarrativeUpdated++;
          console.log(
            `  ✅ [narrative ${idx}] "${b.source.title}" -> ${rule.discussion_ideas.length} idea(s)`,
          );
        } else {
          console.warn(
            `  ⚠️ [narrative ${idx}] No match for: "${b.source.title}" (id=${b.source.id})`,
          );
        }
      }
    });
  });

  console.log(
    `\n🎉 Total sources updated across USA: ${totalSourcesUpdated} in l.sources, ${totalNarrativeUpdated} in narrative_blocks`,
  );

  // 1. Write back to units/usa/data.js
  const serialized = JSON.stringify(unitData, null, 2);
  const jsContent = `// USA 1954–75: Conflict at Home and Abroad Unit Data\nexport const unitData = ${serialized};\nexport default unitData;\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = unitData;\n}\n`;
  fs.writeFileSync(dataJsPath, jsContent, 'utf8');
  console.log('✅ Successfully wrote units/usa/data.js');

  // 2. Write to public/data/usa.json
  const pubData = { id: 'usa', data: unitData };
  fs.writeFileSync(pubJsonPath, JSON.stringify(pubData, null, 2), 'utf8');
  console.log('✅ Successfully created public/data/usa.json');

  // 3. Write to public/database.json
  if (fs.existsSync(dbPath)) {
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    if (db.usa) {
      db.usa.data = unitData;
      fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
      console.log('✅ Successfully updated usa in public/database.json');
    }
  }

  console.log('\n🏁 Completed USA (1954–1975) enrichment!');
}

main().catch((err) => {
  console.error('❌ Error executing enrich script:', err);
  process.exit(1);
});
