const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const dbPath = path.join(rootDir, 'public', 'database.json');

// --- 1. CME_NEW ENRICHMENTS ---
const CME_ENRICHMENTS = {
  // Lesson 1 primary source
  sykes_picot: {
    match: /Sykes-Picot/i,
    hinge_question:
      'Study Source A. Using the partition map, explain why the secret Anglo-French division of the Middle East in the Sykes-Picot Agreement laid the groundwork for decades of border conflicts and Arab betrayal.',
    discussion_ideas: [
      "Imperial Betrayal of Arab Independence: The map visually demonstrates how Britain and France secretly carved up the provinces of the collapsing Ottoman Empire into direct and indirect zones of imperial control (the 'Blue' and 'Red' zones). This directly violated the solemn promises of post-war independence made by Sir Henry McMahon to Sherif Hussein of Mecca in the 1915–16 correspondence, planting deep generational distrust and a sense of Western betrayal across the Arab world.",
      "Imposition of Artificial, Contested Frontiers: The straight, geometric borders drawn across the Syrian desert and Fertile Crescent ignored historic ethnic, religious, and tribal geography, forcibly dividing communities while yoking disparate factions together under British and French mandates. By placing Palestine under a vaguely defined 'international administration' (Brown zone), the agreement laid the precise territorial framework for subsequent conflicts over land, sovereignty, and statehood.",
    ],
  },
  // Lesson 3 primary source
  war_1948: {
    match: /Israeli Troops in Heavy Fighting During the 1948 War/i,
    hinge_question:
      'Study Source A. What does this photograph reveal about the fighting conditions facing the newly formed IDF, and how was Israel able to defeat the five invading Arab armies in 1948–49?',
    discussion_ideas: [
      "Urban Desperation and Total Mobilisation: The photograph captures the gritty, improvised street fighting of the newly formed Israel Defense Forces (IDF) during the 1948 War of Independence (or Nakba). Fighting with a disparate collection of light weapons and makeshift armoured vehicles, Jewish forces were unified by an existential sense of 'Ein Bereira' ('no choice/no alternative'), defending their newly declared state and civilian enclaves against multiple invading Arab armies.",
      "Strategic Exploitation of the UN Truce and Arab Fragmentation: While the photograph highlights localized tactical combat, Israel's ultimate victory relied on structural advantages: superior unified command under David Ben-Gurion, disciplined coordination of former underground militias (Haganah, Palmach), and the vital four-week UN truce in June 1948. Israel used the ceasefire to rapidly procure modern rifles, machine guns, and Avia S-199 fighter aircraft from Czechoslovakia, decisively shifting the military balance against divided and poorly coordinated Arab commands.",
    ],
  },
};

// --- 2. EARLY MODERN WORLD ENRICHMENTS ---
const EMW_ENRICHMENTS = {
  act_of_union_symbols: {
    match: /Coat of Arms|combine the English and Scottish symbols/i,
    hinge_question:
      'Study Source A. Why did the monarch combine the English and Scottish symbols into a single Coat of Arms?',
    discussion_ideas: [
      'Dynastic Legitimisation of the Union of the Crowns: Following the death of Elizabeth I without an heir in 1603, James VI of Scotland succeeded to the English throne as James I. By quartering the English lions and French fleurs-de-lis alongside the Scottish red lion rampant and the Irish harp, James visually proclaimed that the two ancient rival realms were now divinely united under one legitimate Stuart dynasty.',
      "Political Pragmatism and Royal Propaganda: The blended heraldic iconography was designed to project imperial strength and royal cohesion to domestic subjects and European rivals alike. Although England and Scotland retained separate parliaments, legal systems, and churches until the 1707 Act of Union, the unified Coat of Arms declared the King’s personal ambition to forge a single, inseparable 'Kingdom of Great Britain'.",
    ],
  },
  great_seal_obverse: {
    match: /Great Seal of the Commonwealth of England.*reflect the political upheaval/i,
    hinge_question:
      'Study Source E (The Great Seal of the Commonwealth of England). How does the imagery on this 1651 seal reflect the political upheaval following the execution of Charles I?',
    discussion_ideas: [
      'The Erasure of Royal Sovereign Iconography: For six centuries, every Great Seal of England featured an equestrian portrait of the monarch on one side and an enthroned king in royal regalia on the other, symbolizing divinely ordained individual rule. Following the regicide of Charles I in 1649, the Commonwealth seal radically abolished all royal imagery, replacing the king with an aerial cartographic map of England and Ireland to declare that the land itself, rather than an anointed monarch, was sovereign.',
      "Enthronement of Parliamentary Republican Authority: The reverse of the seal depicts the House of Commons assembled in full debate under the speaker's chair, inscribed with 'In the Third Yeare of Freedome by Gods Blessing Restored'. This visually codified the revolutionary constitutional doctrine that supreme sovereign power resided exclusively in the elected representatives of the people in Parliament, rejecting monarchy and the House of Lords.",
    ],
  },
  great_seal_reverse: {
    match: /Great Seal signal about Britain's new priorities/i,
    hinge_question:
      "Look at Source E. What did the design of the 1651 Great Seal signal about Britain's new priorities compared to the previous 600 years?",
    discussion_ideas: [
      "A Republic Defined by Maritime and Naval Supremacy: Rather than displaying feudal symbols of hereditary chivalry and continental land claims (such as the French fleurs-de-lis), the Commonwealth seal prominently features armed warships sailing the seas around the British coastline. This mirrored the Cromwellian state's aggressive naval expansion, the Navigation Act of 1651, and the transformation of England into an assertive global maritime trading empire.",
      'Constitutional Realism over Sacred Kingship: By replacing the mystical, sacred symbols of kingship (the orb, sceptre, and crown) with a realistic parliamentary chamber and geographic fleet charts, the Commonwealth communicated that government was a functional, practical covenant of law, national defence, and commerce rather than a mystical inheritance passed through royal bloodlines.',
    ],
  },
};

// --- 3. GREAT WAR PART 2 ENRICHMENTS ---
const GW2_ENRICHMENTS = {
  women_say_go: {
    match: /Women of Britain Say GO!/i,
    hinge_question:
      'Enquiry: Study Source A. How does this poster use emotional manipulation and gender expectations to pressure men into volunteering?',
    discussion_ideas: [
      'Emotional Weaponization of the Domestic Sphere: By positioning middle-class women and an innocent child looking out from the domestic sanctuary while brave soldiers march into the distance, the poster establishes a powerful moral contract: women are not holding men back, but actively urging them into battle. This created acute psychological pressure and social guilt for civilian men who had not yet enlisted, making remaining at home seem cowardly and dishonourable.',
      'Pre-Conscription Social Coercion: Produced in 1915 before the Military Service Act of 1916 introduced conscription, the British government relied heavily on voluntary recruitment campaigns. This poster mobilized civilian women as moral enforcers on the home front, leveraging traditional chivalric ideals to shame eligible men into uniform during the transition toward total national mobilization.',
    ],
  },
  aerial_trenches: {
    match: /Aerial Reconnaissance of German & British Trench Systems/i,
    hinge_question:
      'Enquiry: Study Source A. How does this aerial photograph reveal why defensive trench warfare completely overwhelmed traditional 19th-century infantry tactics?',
    discussion_ideas: [
      'Decisive Defensive Superiority: The aerial perspective exposes why the Western Front remained an unbroken stalemate. Trenches were not simple straight ditches, but deeply engineered zig-zag networks with defensive traverses that localized artillery shell blasts and prevented attackers from raking an entire trench with enfilading machine-gun fire, rendering traditional massed infantry charges suicidal.',
      "The Lethal Reality of No Man's Land: The photograph starkly captures the lunar, cratered wasteland separating the opposing lines. To assault the enemy, infantry had to advance across hundreds of yards of churned mud, pulverized chalk, and thick belts of barbed wire under direct observation and pre-sighted defensive artillery, explaining why commanders struggled to achieve operational breakthroughs until combined-arms tactics developed.",
    ],
  },
  khudadad_khan: {
    match: /Khudadad Khan/i,
    hinge_question:
      'Enquiry: Study Source A. How does the heroism of Sepoy Khudadad Khan demonstrate the vital military role of the Indian Army in saving the British line in 1914?',
    discussion_ideas: [
      "The Indispensable Role of Colonial Armies: Sepoy Khudadad Khan's heroism at Hollebeke during the First Battle of Ypres in October 1914 proved decisive in plugging the collapsed line and preventing a German breakthrough to the Channel ports. The presence of the Indian Expeditionary Force in France directly preserved the British Expeditionary Force from destruction during the critical opening months of the war.",
      "Breaking the Imperial Racial Ceiling: Awarded the Victoria Cross on 31 October 1914, Khudadad Khan became the very first South Asian soldier in history to receive Britain's highest decoration for gallantry in combat. His recognition shattered long-standing colonial military racial hierarchies that had previously barred non-white imperial soldiers from receiving the VC, forcing British military authorities to publicly honour colonial equality on the battlefield.",
    ],
  },
  munitionettes: {
    match: /Munitionettes|Women Workers in a British Munitions Factory/i,
    hinge_question:
      'Enquiry: Study Source A. How does this photograph demonstrate the radical transformation of women’s roles in British society during the First World War?',
    discussion_ideas: [
      'Shattering Victorian Gender Spheres: The image of female workers operating heavy lathes and filling artillery shells demonstrates how the shell shortages of 1915 forced the British state to dismantle strict gender divisions in heavy industry. Over one million women entered munitions and engineering factories, permanently undermining the Victorian ideology that women were physically and technically unfit for industrial labour.',
      "The Lethal Hazards of the Home Front: The workers' protective gear highlights the extreme occupational dangers endured by civilian 'munitionettes'. Handling toxic chemicals like TNT caused fatal toxic jaundice, turning their skin and hair bright yellow ('Canary Girls') and causing severe liver damage, alongside constant risks of catastrophic factory detonations (such as the 1917 Silvertown explosion), showing that civilian women faced frontline risks in total war.",
    ],
  },
  weeping_child: {
    match: /Peace and Future Cannon Fodder|Will Dyson/i,
    hinge_question:
      'Enquiry: Study Source A. How does Will Dyson use symbolism to predict that the Treaty of Versailles would cause a second world war?',
    discussion_ideas: [
      "Prescient Critique of Punitive Retribution: Will Dyson brilliantly predicts the catastrophic trajectory of European history with stunning accuracy. By depicting the 'Big Four' exiting the Versailles negotiations while a weeping child labeled '1940 Class' stands in the shadows, Dyson exposed that the punitive clauses (War Guilt Clause 231, crippling reparations, and territorial dismemberment) were not a lasting peace, but a seedbed for revanchism that would send the newborn generation into a second world war in 1939–1940.",
      "The Arrogance and Moral Blindness of Allied Leadership: Georges Clemenceau's callous remark—'Curious! I seem to hear a child weeping!'—personifies the short-sighted arrogance of victorious politicians. Dyson, writing from a socialist Labour perspective in the Daily Herald, argued that Allied statesmen were consumed by electoral vengeance and nationalist retribution, wilfully ignoring John Maynard Keynes's contemporaneous warnings that crushing Germany's economy would destabilize European civilization.",
    ],
  },
};

function enrichUnit(unitId, enrichMap) {
  console.log(`\n========================================`);
  console.log(`Processing unit: ${unitId}`);
  const dataJsPath = path.join(rootDir, 'units', unitId, 'data.js');
  const pubJsonPath = path.join(rootDir, 'public', 'data', `${unitId}.json`);

  let unitData;
  if (fs.existsSync(pubJsonPath)) {
    const raw = JSON.parse(fs.readFileSync(pubJsonPath, 'utf8'));
    unitData = raw.data || raw;
  } else if (fs.existsSync(dbPath)) {
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    unitData = db[unitId]?.data || db[unitId];
  }

  let updatedCount = 0;

  (unitData.lessons || []).forEach((l) => {
    // Check primary_source
    if (l.primary_source) {
      const psList = Array.isArray(l.primary_source) ? l.primary_source : [l.primary_source];
      psList.forEach((ps) => {
        const text = `${ps.title || ''} ${ps.caption || ''} ${ps.question || ''}`;
        for (const key of Object.keys(enrichMap)) {
          const rule = enrichMap[key];
          if (rule.match.test(text)) {
            ps.hinge_question = rule.hinge_question;
            ps.discussion_ideas = rule.discussion_ideas;
            updatedCount++;
            console.log(`  ✅ [primary_source] "${ps.title || key}" enriched with 2 angles.`);
          }
        }
      });
    }

    // Check l.sources
    (l.sources || []).forEach((s) => {
      const text = `${s.title || ''} ${s.caption || ''} ${s.question || ''} ${s.text || ''}`;
      for (const key of Object.keys(enrichMap)) {
        const rule = enrichMap[key];
        if (rule.match.test(text)) {
          s.hinge_question = rule.hinge_question;
          s.discussion_ideas = rule.discussion_ideas;
          updatedCount++;
          console.log(`  ✅ [l.sources] "${s.title || s.question || key}" enriched with 2 angles.`);
        }
      }
    });

    // Check narrative_blocks
    (l.narrative_blocks || []).forEach((b) => {
      if (b.source) {
        const text = `${b.source.title || ''} ${b.source.caption || ''} ${b.source.question || ''}`;
        for (const key of Object.keys(enrichMap)) {
          const rule = enrichMap[key];
          if (rule.match.test(text)) {
            b.source.hinge_question = rule.hinge_question;
            b.source.discussion_ideas = rule.discussion_ideas;
            updatedCount++;
            console.log(
              `  ✅ [narrative_block] "${b.source.title || key}" enriched with 2 angles.`,
            );
          }
        }
      }
    });
  });

  console.log(`Total enriched in ${unitId}: ${updatedCount}`);

  // Write to units/[unitId]/data.js
  const serialized = JSON.stringify(unitData, null, 2);
  const jsOut = `const unitData = ${serialized};\nexport default unitData;\nexport { unitData };\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = unitData;\n}\n`;
  fs.writeFileSync(dataJsPath, jsOut, 'utf8');
  console.log(`  -> Wrote ${dataJsPath}`);

  // Write to public/data/[unitId].json
  const pubData = { id: unitId, data: unitData };
  fs.writeFileSync(pubJsonPath, JSON.stringify(pubData, null, 2), 'utf8');
  console.log(`  -> Wrote ${pubJsonPath}`);

  // Write to public/database.json
  if (fs.existsSync(dbPath)) {
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    if (db[unitId]) {
      db[unitId].data = unitData;
      fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
      console.log(`  -> Wrote public/database.json (${unitId})`);
    }
  }
}

enrichUnit('cme_new', CME_ENRICHMENTS);
enrichUnit('early_modern_world', EMW_ENRICHMENTS);
enrichUnit('great_war_part2', GW2_ENRICHMENTS);

console.log('\n🏁 Enrichment completed successfully across all targets!');
