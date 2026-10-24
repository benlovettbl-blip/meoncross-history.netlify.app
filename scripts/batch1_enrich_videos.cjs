const fs = require('fs');
const path = require('path');

function updateUnit(unitId, updateFn) {
  const jsPath = path.resolve(__dirname, `../units/${unitId}/data.js`);
  const pubJsonPath = path.resolve(__dirname, `../public/data/${unitId}.json`);
  const dataJsonPath = path.resolve(__dirname, `../data/${unitId}.json`);

  delete require.cache[require.resolve(jsPath)];
  const mod = require(jsPath);
  const data = mod.default || mod.unitData || mod;

  updateFn(data);

  // Write JS
  const jsContent = `const unitData = ${JSON.stringify(data, null, 2)};\n\nexport default unitData;\nexport { unitData };\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = unitData;\n}\n`;
  fs.writeFileSync(jsPath, jsContent, 'utf8');

  // Write JSON
  fs.writeFileSync(pubJsonPath, JSON.stringify(data, null, 2), 'utf8');
  if (fs.existsSync(dataJsonPath)) {
    fs.writeFileSync(dataJsonPath, JSON.stringify(data, null, 2), 'utf8');
  }
  console.log(`✅ Successfully updated ${unitId}`);
}

// 1. industrialisation_and_empire
updateUnit('industrialisation_and_empire', (data) => {
  const l1 = data.lessons[0];
  if (l1 && l1.video) {
    l1.video[0] = {
      type: 'local',
      url: '/images/funtley/funtley_weir_hydraulic_flow.mp4',
      title: 'Funtley Ironworks: River Meon Hydraulic Weir & Mill Race Flow (Fieldwork Footage)',
      duration: '0 mins 6 secs',
      teacher_guidance:
        "Fieldwork video recording showing the hydraulic weir and mill race along the River Meon at Funtley Ironworks. Use this clip to demonstrate how 18th-century industrial pioneers harnessed natural watercourse flow to power heavy waterwheels, which drove Henry Cort's revolutionary rolling mills and grooved rollers.",
      viewing_task:
        'Watch the flow of water across the weir and mill race. How did 18th-century ironmasters like Henry Cort utilize hydraulic water power to mechanize the production of wrought iron?',
      model_answer:
        "Early industrial ironmasters located their works along fast-flowing river valleys like the River Meon to exploit renewable hydraulic power. Water diverted through artificial mill races and sluice gates fell onto large waterwheels, generating immense mechanical torque. This rotary power drove the blast furnace bellows, trip hammers, and Henry Cort's newly patented grooved rolling mills, allowing iron to be rolled into standardized bars fifteen times faster than traditional manual hammering.",
    };
    l1.video[1] = {
      type: 'external',
      url: 'https://era.org.uk/streaming-service-resource/bbc-two-black-and-british-a-forgotten-history-moral-mission-mississippi-cotton/',
      title: 'Black and British: Moral Mission (Mississippi Cotton)',
      duration: '10 mins 15 secs',
      teacher_guidance:
        "David Olusoga's BBC documentary sequence examining the global dependency connecting British textile mills in Lancashire to slave labor on American cotton plantations. Crucial for understanding how Britain's industrial manufacturing boom was fundamentally entangled with the transatlantic slave trade and chattel slavery.",
      viewing_task:
        "How does historian David Olusoga demonstrate the direct economic link between Lancashire's cotton mills and enslaved labourers on Mississippi plantations?",
      model_answer:
        "David Olusoga demonstrates that Britain's Industrial Revolution was not a purely domestic technological achievement, but was directly powered by global chattel slavery. By the early 19th century, Lancashire's textile mills consumed millions of bales of raw cotton grown by millions of enslaved African Americans on southern US plantations. The British factory system transformed raw slave-picked cotton into cheap manufactured textiles for worldwide export, generating vast commercial profits in Liverpool and Manchester that were built upon brutal human exploitation.",
    };
  }
});

// 2. great_war_part2
const gw2Guidance = {
  'Y is for Your Country Needs You | WWI A-Z':
    "Examines the visual psychology of Alfred Leete's famous 1914 recruitment poster featuring Lord Kitchener. Discuss how direct address and patriotic obligation drove over one million men to enlist voluntarily before conscription was introduced in 1916.",
  'B is for Battalions | WWI A-Z':
    "Analyses the concept of 'Pals Battalions' conceived by Lord Derby and the War Office. Highlight to pupils how civic pride and social pressure encouraged men from the same towns, sports clubs, or offices to enlist together, with devastating collective consequences on the Somme.",
  'T is for Trenches | WWI A-Z':
    'Archival footage and architectural breakdown of the Western Front trench system. Guide pupils to identify frontline, support, and reserve trenches, communications saps, duckboards, fire steps, and the omnipresent threat of mud and trench foot.',
  'G is for Gas | WWI A-Z':
    'Examines the introduction of chemical warfare by the German army at Second Ypres in April 1915. Focus on the psychological terror of chlorine, phosgene, and mustard gas, and the rapid evolution from urine-soaked rags to sophisticated box respirators.',
  'I is for Indian Army | WWI A-Z':
    'Crucial global perspective highlighting the 1.3 million Indian soldiers who served in the Great War. Emphasizes how the Indian Corps arrived in France in autumn 1914 to plug critical gaps at First Ypres, suffering heavy casualties in freezing, unfamiliar conditions.',
  'E is for Empire | WWI A-Z':
    'Explores the worldwide mobilization of British Empire forces, including Canada, Australia, New Zealand, South Africa, the West Indies, and the Chinese Labour Corps. Demonstrates that the Western Front relied completely on global logistical and combat manpower.',
  'W is for Women | WWI A-Z':
    "Investigates the mobilization of over one million British women into munitions factories, transport, and agriculture. Explores the extreme dangers of toxic TNT handling ('Canary Girls'), industrial explosions, and the social impact on post-war female suffrage.",
  'C is for Conscientious Objector | WWI A-Z':
    "Examines the introduction of the Military Service Act 1916 (conscription) and the moral, religious, and political objections raised by Conscientious Objectors ('Conchies'). Explores tribunals, the Non-Combatant Corps, and harsh imprisonment at Richmond Castle and Dartmoor.",
  'V is for Versailles | WWI A-Z':
    'Curriculum breakdown of the 1919 Paris Peace Conference and the Treaty of Versailles. Helps pupils evaluate Article 231 (War Guilt Clause), £6.6 billion reparations, German demilitarization, and the loss of Alsace-Lorraine and the Polish Corridor.',
  'P is for Peace | WWI A-Z':
    "Examines the signing of the Armistice on 11 November 1918 and the bitter German reaction to the 'Diktat' of Versailles. Discusses the emergence of the 'Stab-in-the-Back' myth (Dolchstoßlegende) and how post-war resentment destabilized the nascent Weimar Republic.",
};

updateUnit('great_war_part2', (data) => {
  data.lessons.forEach((l) => {
    (l.video || []).forEach((v) => {
      if (gw2Guidance[v.title]) {
        v.teacher_guidance = gw2Guidance[v.title];
      }
    });
  });
});

// 3. water_and_sanitation
const wsGuidance = {
  'Roman Bathing and Wellness: How Were Roman Baths Really Used?':
    'Engaging cultural overview exploring Roman public baths (thermae). Frame the discussion around Roman hydraulic engineering (aqueducts, hypocaust central heating) and why hygiene was seen as a civic and social necessity rather than private medical care.',
  'Medieval Monasteries: Engineering Water and Cleanliness':
    'Focuses on monastic water systems at Canterbury Cathedral Priory and Fountains Abbey. Guide pupils to notice how monks engineered running water conduits, settling basins, and latrines, contrasting monastic cleanliness with filthy medieval towns.',
  'The Black Death (1348): Causes, Symptoms, and Medieval Responses':
    'Essential analysis of the 1348 pandemic. Prepare pupils to examine supernatural and miasmatic explanations (wrath of God, misaligned planets, corrupt air) and why medieval treatments failed against Yersinia pestis carried by black rat fleas.',
  'Sir John Harington and the Invention of the Flush Toilet':
    "Examines Queen Elizabeth I's godson Sir John Harington and his 1596 water closet (the 'Ajax'). Use this clip to explore why technological inventions often fail to catch on until urban infrastructure (running water, sewers) catches up.",
  'Victorian Slums and the Public Health Crisis':
    'Illustrates the appalling sanitary consequences of rapid industrialisation in cities like Manchester and Leeds. Emphasize back-to-back housing, open cesspools, privy sharing, and infant mortality rates that triggered early health investigations.',
  'Edwin Chadwick and the 1848 Public Health Act':
    "Examines Edwin Chadwick's landmark 1842 Report on the Sanitary Condition of the Labouring Population. Direct pupils to notice Chadwick's use of statistical evidence and economic arguments to persuade a reluctant laissez-faire Parliament to act.",
  'Bazalgette: Saviour of the Great Stink (Institution of Civil Engineers)':
    "Engineering case study by the ICE celebrating Joseph Bazalgette's Victorian marvel. Highlights the use of Portland cement, egg-shaped brick tunnels, and Bazalgette's foresight in doubling the sewer pipe capacity to prevent future bottlenecks.",
  '05: The Sewer King | Seven Wonders of the Industrial World (BBC)':
    "Superb BBC docudrama tracing Joseph Bazalgette's engineering triumph over political resistance, cholera outbreaks, and administrative apathy, culminating in London's 82-mile underground intercepting sewer network.",
  "The Great Stink & Bazalgette's London Sewers (BBC Bitesize GCSE History)":
    'Crisp curriculum summary explaining how the unbearable summer heatwave of June 1858 turned the River Thames into an open sewer, forcing MPs in Parliament to abandon laissez-faire and pass emergency funding for Bazalgette.',
  'Louis Pasteur & Germ Theory (Science Museum)':
    "Clear demonstration of Louis Pasteur's 1861 swan-neck flask experiments. Guides pupils to understand how Pasteur disproved 'spontaneous generation' and proved that invisible airborne microorganisms cause fermentation, decay, and disease.",
  'Dr John Snow and the 1854 Broad Street Cholera Outbreak':
    "Classic epidemiological case study. Guide pupils to analyze Dr John Snow's scientific detective work in Soho, plotting cholera deaths on a spot map to pinpoint contaminated drinking water from the Broad Street pump.",
};

updateUnit('water_and_sanitation', (data) => {
  data.lessons.forEach((l) => {
    (l.video || []).forEach((v) => {
      if (wsGuidance[v.title]) {
        v.teacher_guidance = wsGuidance[v.title];
      }
    });
  });
});

// 4. the_shoah
const shoahPedagogy = {
  1: {
    task: 'How does Yad Vashem illustrate the rich diversity of Jewish life, occupations, religious traditions, and cultural contributions across Europe prior to 1939?',
    answer:
      "Yad Vashem emphasizes that the 9.5 million Jewish people living in Europe before 1939 did not form a single homogeneous group, but represented a vibrant, multifaceted mosaic of communities. In Western and Central Europe (such as Germany, France, and Britain), Jews were largely urban, highly assimilated, and made substantial contributions as doctors, lawyers, academics, scientists, and shopkeepers. In Eastern Europe (such as Poland, Lithuania, and Ukraine), millions lived in traditional Yiddish-speaking towns ('shtetls') or thriving urban centres like Warsaw, maintaining deep religious, cultural, and political traditions spanning Zionism, socialism, and Orthodox Judaism.",
  },
  2: {
    task: 'How did the Nazi regime use legal decrees, the 1935 Nuremberg Laws, and the state-sponsored violence of Kristallnacht (1938) to transform German Jews from equal citizens into persecuted outcasts?',
    answer:
      'The USHMM documentary demonstrates a calculated three-stage escalation in anti-Jewish policy between 1933 and 1938. First, economic ostracisation began with the April 1933 nationwide boycott of Jewish businesses and civil service dismissals. Second, the September 1935 Nuremberg Laws (the Reich Citizenship Law and the Law for the Protection of German Blood and German Honour) legally stripped Jews of German citizenship, revoked their voting rights, and banned intermarriage or relationships with non-Jews. Third, state-orchestrated violence erupted during the Kristallnacht pogrom of November 1938, during which hundreds of synagogues were burned, 30,000 Jewish men were interned in concentration camps, and Jewish property was looted, making life in Germany unsustainable.',
  },
  3: {
    task: 'Why did Nazi authorities establish enclosed ghettos across occupied Poland from autumn 1939, and how did prisoners maintain human dignity and cultural resistance under conditions of deliberate starvation?',
    answer:
      "Following the invasion of Poland in September 1939, Nazi authorities segregated Jewish populations into overcrowded, sealed urban ghettos—such as Warsaw, Łódź, and Kraków—surrounded by brick walls, barbed wire, and armed guards. The Nazi objective was strict containment, exploitation for forced labour, and attrition through starvation rations and rampant typhus epidemics. Despite these lethal conditions, inhabitants organized remarkable cultural, spiritual, and clandestine resistance: they operated underground schools, soup kitchens, secret religious services, artistic exhibitions, and historical archives (such as Emanuel Ringelblum's 'Oyneg Shabes' milk can archive in Warsaw) to preserve historical truth and human dignity.",
  },
  4: {
    task: 'How did the German invasion of the Soviet Union (Operation Barbarossa) in June 1941 mark a fatal shift toward systematic mass murder carried out by the Einsatzgruppen?',
    answer:
      "The launch of Operation Barbarossa on 22 June 1941 transformed Nazi anti-Jewish policy from forced expulsion and ghettoisation into direct, systematic extermination. Four specialized paramilitary battalions of the SS and Security Police (Einsatzgruppen A, B, C, and D) advanced immediately behind the Wehrmacht across Soviet territories. Aided by local auxiliary militias, these mobile killing squads rounded up entire Jewish communities, marched them to ravines, anti-tank ditches, and forest pits (such as Babi Yar outside Kyiv and Ponary near Vilnius), and murdered over 1.5 million men, women, and children by mass shooting in what historians designate the 'Holocaust by Bullets'.",
  },
  5: {
    task: "What was the industrial architecture of the 'Final Solution' at Auschwitz-Birkenau, and how did prisoners demonstrate armed resistance against impossible odds?",
    answer:
      "Auschwitz-Birkenau operated as the epicentre of the 'Final Solution' by combining a vast slave-labour concentration camp complex (Auschwitz I and III) with an industrialised extermination facility (Birkenau / Auschwitz II). Victims arrived from across Europe in locked cattle wagons, where SS physicians conducted immediate 'selections' on the railway ramp—sending roughly 75–80% of new arrivals directly to subterranean gas chambers disguised as showers to be murdered with Zyklon B prussic acid pellets, before their bodies were incinerated in massive crematoria. Despite terrifying surveillance, prisoners mounted armed resistance: in October 1944, the Jewish Sonderkommando staged an armed uprising, smuggling gunpowder from the Union munitions factory, killing SS guards, and blowing up Crematorium IV.",
  },
  6: {
    task: "How did Danish civil society, ordinary citizens, and the Danish resistance successfully rescue over 90% of Denmark's Jewish population in October 1943?",
    answer:
      "When German diplomat Georg Ferdinand Duckwitz secretly leaked that the Gestapo planned to round up Denmark's 7,800 Jews on Rosh Hashanah in October 1943, Danish society initiated a spontaneous nationwide rescue effort. Danish doctors, police officers, clergymen, fishermen, and neighbours hid Jewish families in hospitals, attics, and coastal cottages. Over a two-week period, Danish fishermen and boat owners ferried over 7,200 Jews and 686 non-Jewish relatives across the narrow Øresund strait to safety in neutral Sweden. As a result of this collective civic solidarity and defiance of Nazi orders, over 99% of Danish Jews survived the Holocaust.",
  },
  7: {
    task: 'What conditions confronted the British 11th Armoured Division upon liberating Bergen-Belsen in April 1945, and why does survivor testimony remain vital for human rights today?',
    answer:
      'When British soldiers entered Bergen-Belsen on 15 April 1945, they uncovered unimaginable horror: over 60,000 starving, typhus-stricken prisoners surrounded by thousands of unburied corpses. Medical teams worked heroically to save lives, but nearly 14,000 survivors died in the weeks following liberation due to severe malnutrition and disease. Recording authentic survivor testimony and preserving primary archival evidence remains essential today to counter Holocaust denial, educate future generations about the perils of dehumanisation and state-sponsored hatred, and inspire vigilance in defending universal human rights.',
  },
};

updateUnit('the_shoah', (data) => {
  data.lessons.forEach((l, li) => {
    const p = shoahPedagogy[li + 1];
    if (p && l.video && l.video[0]) {
      l.video[0].viewing_task = p.task;
      l.video[0].model_answer = p.answer;
    }
  });
});

console.log('🎉 Successfully completed Batch 1 updates!');
