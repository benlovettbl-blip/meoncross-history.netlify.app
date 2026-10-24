const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// =========================================================================
// 1. WEIMAR & NAZI GERMANY SPECIFICATION ANCHORS (16 Lessons)
// =========================================================================
const WEIMAR_SPEC = {
  lesson_1_1:
    'The Weimar Republic 1918–29: the origins of the Republic, 1918–19; political unrest, the abdication of the Kaiser, armistice and the strengths and weaknesses of the Weimar Constitution.',
  lesson_1_2:
    "The Weimar Republic 1918–29: early challenges, 1919–23; the 'stab in the back' myth, Treaty of Versailles, political violence (Spartacists, Freikorps, Kapp Putsch), and the crises of 1923 (invasion of the Ruhr, hyperinflation).",
  lesson_1_3:
    "The Weimar Republic 1918–29: the 'Golden Years' of recovery, 1924–29; Stresemann's economic strategy (Rentenmark, Dawes Plan, Young Plan) and international diplomacy (Locarno, League of Nations, Kellogg-Briand).",
  lesson_1_4:
    'The Weimar Republic 1918–29: changes in society, 1924–29; living standards, the changing position of women in work and politics, and cultural developments in art, architecture (Bauhaus) and cinema.',
  lesson_2_1:
    "Hitler's rise to power, 1919–33: early development of the Nazi Party, 1920–22; the German Workers' Party (DAP), Hitler's 25-Point Programme, and the founding and role of the SA.",
  lesson_2_2:
    "Hitler's rise to power, 1919–33: the Munich Putsch (1923), consequences and Mein Kampf; the 'Lean Years' (1924–28), party reorganisation, the Bamberg Conference, and limited electoral appeal.",
  lesson_2_3:
    "Hitler's rise to power, 1919–33: the growth in support for the Nazis, 1929–32; the Wall Street Crash and impact of mass unemployment, growth of the KPD, and the appeal of Hitler, Goebbels and the SA.",
  lesson_2_4:
    "Hitler's rise to power, 1919–33: how Hitler became Chancellor, 1932–33; presidential and Reichstag elections, political scheming by von Papen and von Hindenburg, and Hitler's appointment in January 1933.",
  lesson_3_1:
    'Nazi control and dictatorship, 1933–39: the creation of a dictatorship, 1933–34; the Reichstag Fire, the Enabling Act, banning of political parties and trade unions, the Night of the Long Knives, and the death of Hindenburg.',
  lesson_3_2:
    "Nazi control and dictatorship, 1933–39: the police state; the roles of the SS, SD, Gestapo and concentration camps; Nazi control of the legal system, judges and the People's Court.",
  lesson_3_3:
    'Nazi control and dictatorship, 1933–39: controlling and influencing attitudes; Goebbels and propaganda, censorship, rallies, radio and cinema; control of the arts, literature and sports; policy towards Protestant and Catholic Churches.',
  lesson_3_4:
    'Nazi control and dictatorship, 1933–39: opposition, resistance and conformity; the extent of public support; religious opposition (Martin Niemöller, Dietrich Bonhoeffer) and youth rebellion (Edelweiss Pirates, Swing Youth).',
  lesson_4_1:
    "Life in Nazi Germany, 1933–39: Nazi policies towards women; views on women and the family (Kinder, Küche, Kirche), policies on marriage, loans, the Mother's Cross, and employment restrictions.",
  lesson_4_2:
    'Life in Nazi Germany, 1933–39: Nazi policies towards the young; aims and compulsory membership of the Hitler Youth and BDM; control of education, school curricula and teacher coordination.',
  lesson_4_3:
    'Life in Nazi Germany, 1933–39: employment and living standards; policies to reduce unemployment (RAD, autobahns, rearmament, invisible unemployment); standard of living, the DAF, KdF and Beauty of Labour.',
  lesson_4_4:
    'Life in Nazi Germany, 1933–39: the persecution of minorities; Nazi racial theories and eugenics (Slavs, Romani, disabled people); anti-Semitic persecution, boycotts, the Nuremberg Laws (1935), and Kristallnacht (1938).',
};

// =========================================================================
// 2. CONFLICT IN THE MIDDLE EAST SPECIFICATION ANCHORS (12 Lessons)
// =========================================================================
const CME_SPEC = {
  lesson_1:
    'The birth of the state of Israel, 1945–63: the historical origins and British Mandate; conflicting wartime promises (Sykes-Picot, McMahon-Hussein, Balfour Declaration), Zionism and Arab Nationalism.',
  lesson_2:
    'The birth of the state of Israel, 1945–63: the end of the British Mandate; conflicting interests of Jews and Arabs, Jewish insurgency (King David Hotel), UN Partition Resolution 181, declaration of the state of Israel, and the 1948–49 Arab-Israeli War.',
  lesson_3:
    'The birth of the state of Israel, 1945–63: aftermath of the 1948–49 war; armistice borders (Green Line), the Palestinian refugee crisis (Nakba), the creation of the IDF, and the Law of Return (1950).',
  lesson_4:
    'The birth of the state of Israel, 1945–63: increased tension, 1955–63; Nasser and Pan-Arab leadership, the 1955 Gaza raid, nationalisation of the Suez Canal, the 1956 Suez Crisis, and the deployment of UNEF.',
  lesson_6:
    "The escalating conflict, 1964–73: origins of the Six-Day War (1967); the 1964 Cairo Conference, the Headwater Diversion dispute, cross-border raids by Fatah, Syrian border clashes, and Nasser's eviction of UNEF and closure of the Straits of Tiran.",
  lesson_7:
    'The escalating conflict, 1964–73: the Six-Day War (June 1967); Operation Focus pre-emptive airstrikes, fighting on three fronts (Sinai, West Bank/Jerusalem, Golan Heights), and the decisive Israeli military victory.',
  lesson_8:
    "The escalating conflict, 1964–73: aftermath of the 1967 war; UN Resolution 242 ('land for peace'), the Khartoum Resolution ('Three Nos'), Israeli occupation of Sinai, Gaza, West Bank and Golan Heights, and the founding of Israeli settlements.",
  lesson_9:
    'The escalating conflict, 1964–73: Palestinian resistance and international terrorism; the rise of the PLO and Yasser Arafat, the Battle of Karameh (1968), Black September in Jordan (1970), and the Munich Olympics massacre (1972).',
  lesson_10:
    "The escalating conflict, 1964–73: the War of Attrition (1969–70) and the Yom Kippur War (1973); Sadat's surprise offensive on the Bar Lev Line and Golan, superpower nuclear alert, the OPEC oil embargo, and the diplomatic aftermath.",
  lesson_11:
    "Attempts at a solution, 1974–95: diplomatic negotiations; the oil crisis, Kissinger's shuttle diplomacy, reopening of the Suez Canal, Sadat's historic visit to Jerusalem (1977), and the Camp David Accords and Egyptian-Israeli Peace Treaty (1978–79).",
  lesson_12:
    "Attempts at a solution, 1974–95: the Palestinian issue; Arafat's 1974 UN speech, the Israeli invasion of Lebanon (Operation Peace for Galilee, 1982), Sabra and Shatila, and the outbreak and impact of the First Intifada (1987–93).",
  lesson_13:
    "Attempts at a solution, 1974–95: peace initiatives and accords; Arafat's renunciation of terrorism (1988), the 1991 Madrid Conference, the Oslo Accords (1993), the establishment of the Palestinian Authority, and the assassination of Yitzhak Rabin (1995).",
};

// =========================================================================
// 3. EARLY ELIZABETHAN ENGLAND SPEC ANCHORS & MISSING OBJECTIVES (12 Lessons)
// =========================================================================
const EEE_SPEC = {
  lesson_1_1:
    "Queen, government and religion, 1558–69: the situation on Elizabeth's accession; society and government in 1558, challenges of legitimacy, gender and marriage, Crown debt (£300,000), and threats from France and Scotland.",
  lesson_1_2:
    "Queen, government and religion, 1558–69: the 'settlement' of religion, 1559; the Act of Supremacy ('Supreme Governor'), the Act of Uniformity, the 1559 Book of Common Prayer, Royal Injunctions, and the role of the Church of England in society.",
  lesson_1_3:
    'Queen, government and religion, 1558–69: challenges to the religious settlement; the Puritan challenge (crucifix and vestments controversies), the Catholic challenge at home (recusancy, the nobility), and foreign Catholic threats (Papacy, France, Spain and the Netherlands).',
  lesson_1_4:
    "Queen, government and religion, 1558–69: the problem of Mary, Queen of Scots; her claim to the English throne, Darnley's murder and Mary's flight to England (1568), the York Inquiry and Casket Letters, and Elizabeth's house arrest dilemma.",
  lesson_2_1:
    "Challenges to Elizabeth at home and abroad, 1569–88: plots and revolts at home; the Revolt of the Northern Earls (1569–70), the Ridolfi Plot (1571), Throckmorton Plot (1583), Babington Plot (1586), Walsingham's spy network, and Mary's execution (1587).",
  lesson_2_2:
    "Challenges to Elizabeth at home and abroad, 1569–88: relations with Spain; political, religious and commercial rivalry, the Dutch Revolt, English privateering in the New World, and Drake's circumnavigation (1577–80).",
  lesson_2_3:
    "Challenges to Elizabeth at home and abroad, 1569–88: outbreak of war with Spain, 1585–88; the Treaty of Nonsuch and Leicester's expedition to the Netherlands, Drake's raid on Cadiz ('singeing the King of Spain's beard') and preparations for war.",
  lesson_2_4:
    "Challenges to Elizabeth at home and abroad, 1569–88: the Spanish Armada, 1588; Philip II's invasion strategy, key battles (Gravelines, fireships), tactical leadership of Drake and Howard, communications breakdown with Parma, and reasons for English victory.",
  lesson_3_1:
    'Elizabethan society in the Age of Exploration, 1558–88: education and leisure; grammar schools, petty schools, university education, social class disparities, sports, pastimes, and the development of Elizabethan theatre.',
  lesson_3_2:
    'Elizabethan society in the Age of Exploration, 1558–88: the problem of the poor; causes of poverty and vagabondage (population growth, enclosure, sheep farming, bad harvests), distinguishing the deserving and idle poor, and the Poor Laws.',
  lesson_3_3:
    "Elizabethan society in the Age of Exploration, 1558–88: exploration and voyages of discovery; navigational technology (astrolabe, compass, triangular caravel sails), new trade routes (Muscovy Company), and Drake's circumnavigation of the globe.",
  lesson_3_4:
    'Elizabethan society in the Age of Exploration, 1558–88: Raleigh and the colonisation of Virginia; economic and strategic motivations for American colonisation, the 1585 and 1587 Roanoke expeditions, and reasons for the failure of the first English colony.',
};

const EEE_MISSING_OBJECTIVES = {
  lesson_1_1: [
    'Explain the social and political structure of Elizabethan England on Elizabeth’s accession in 1558.',
    'Analyze the immediate domestic and foreign challenges facing the young Queen: Crown debt, gender, legitimacy, and the threat of France and Scotland.',
    'Evaluate how Elizabeth established her royal authority through the Privy Council and local government.',
  ],
  lesson_1_2: [
    'Explain the religious divisions in England in 1558 between Catholics, Protestants, and Puritans.',
    'Analyze the key terms and compromises of the 1559 Religious Settlement: the Acts of Supremacy and Uniformity, and the Royal Injunctions.',
    'Evaluate the role of the Church of England in enforcing religious conformity across parishes.',
  ],
  lesson_1_3: [
    'Explain the nature of the Puritan challenge to the Religious Settlement, focusing on the crucifix and vestment controversies.',
    'Analyze the domestic Catholic challenge: recusancy, church papists, and the influence of conservative northern gentry.',
    'Evaluate the external Catholic threat: the Papacy, the Dutch Revolt, and the arrival of the Duke of Alba in the Netherlands.',
  ],
  lesson_1_4: [
    'Explain Mary, Queen of Scots’ lineage and claim to the English throne as a Catholic alternative to Elizabeth.',
    'Analyze the political crisis in Scotland: the murder of Darnley, the Bothwell marriage, and Mary’s flight to England in 1568.',
    'Evaluate Elizabeth’s dilemma regarding Mary’s detention and the findings of the York Inquiry (1568–69).',
  ],
  lesson_2_2: [
    'Explain the political and religious rivalries that developed between Elizabethan England and Catholic Spain between 1569 and 1585.',
    'Analyze the commercial conflict in the New World and the impact of Francis Drake’s privateering voyages and circumnavigation.',
    'Evaluate why the assassination of William of Orange and the Treaty of Joinville brought England and Spain to open war.',
  ],
};

// =========================================================================
// 4. USA SPEC ANCHORS & 3-PART SCAFFOLDED OBJECTIVES (16 Lessons)
// =========================================================================
const USA_SPEC = {
  lesson_1_1:
    'The development of the civil rights movement, 1954–60: the position of Black Americans in the early 1950s; segregation, Jim Crow laws, disenfranchisement in the South, and campaigns of the NAACP and CORE.',
  lesson_1_2:
    'The development of the civil rights movement, 1954–60: progress in education and legal challenges; the Supreme Court ruling in Brown v. Board of Education (1954), white backlash, and the Little Rock Central High crisis (1957).',
  lesson_1_3:
    'The development of the civil rights movement, 1954–60: the Montgomery Bus Boycott (1955–56); Rosa Parks, the leadership of Martin Luther King Jr., MIA organisation, Browder v. Gayle, the creation of the SCLC, and the 1957 Civil Rights Act.',
  lesson_1_4:
    "The development of the civil rights movement, 1954–60: resistance to desegregation; the Dixiecrats, White Citizens' Councils, the Southern Manifesto, and violent intimidation by the Ku Klux Klan including the murder of Emmett Till (1955).",
  lesson_2_1:
    'Protest, progress and radicalism, 1960–75: progress 1960–62; the Greensboro sit-ins and founding of SNCC, the Freedom Rides (1961), white supremacist violence, and the desegregation crisis at the University of Mississippi (James Meredith, 1962).',
  lesson_2_2:
    "Protest, progress and radicalism, 1960–75: Birmingham, Washington and landmark legislation; Project 'C' and Bull Connor in Birmingham (1963), the March on Washington, the 1964 Civil Rights Act, Freedom Summer (Mississippi murders), the Selma March (1965), and the Voting Rights Act of 1965.",
  lesson_2_3:
    'Protest, progress and radicalism, 1960–75: the rise of Black radicalism; the ideology and impact of Malcolm X and the Nation of Islam, Stokely Carmichael and the emergence of Black Power, the 1968 Mexico Olympics salute, and the founding and survival programmes of the Black Panther Party.',
  lesson_2_4:
    "Protest, progress and radicalism, 1960–75: urban rebellion and the end of an era; race riots in northern cities (Watts 1965, Detroit/Newark 1967), the Kerner Report (1968), King's Chicago campaign, the assassination of Martin Luther King Jr. (1968), and assessment of civil rights progress by 1975.",
  lesson_3_1:
    "US involvement in the Vietnam War, 1954–75: reasons for US involvement, 1954–63; the Domino Theory, the 1954 Geneva Accords, US financial and military support for Ngo Dinh Diem in South Vietnam, the growth of the Vietcong, and Kennedy's Strategic Hamlets and Green Berets.",
  lesson_3_2:
    'US involvement in the Vietnam War, 1954–75: escalation under President Johnson; the 1964 Gulf of Tonkin incident and Resolution, the start of combat troop deployment (1965), and the expansion of the US military draft.',
  lesson_3_3:
    'US involvement in the Vietnam War, 1954–75: nature of the conflict; conventional US tactics (Operation Rolling Thunder, search-and-destroy missions, napalm, Agent Orange) contrasted with Vietcong guerrilla tactics (tunnels, booby traps, the Ho Chi Minh Trail).',
  lesson_3_4:
    "US involvement in the Vietnam War, 1954–75: the turning point; the 1968 Tet Offensive and its military versus political impact, the Cronkite broadcast, Nixon's election, the Nixon Doctrine, and the policy of Vietnamisation.",
  lesson_4_1:
    'Reactions to, and the end of, US involvement in the Vietnam War, 1964–75: the anti-war movement; student protests, media and television coverage, exposure of the My Lai Massacre (1968) and Calley trial, and the Kent State shootings (1970).',
  lesson_4_2:
    "Reactions to, and the end of, US involvement in the Vietnam War, 1964–75: support for the war; Nixon's 'Silent Majority' speech, anti-communist sentiment, patriotism, and the 1970 New York 'Hard Hat' counter-demonstrations.",
  lesson_4_3:
    "Reactions to, and the end of, US involvement in the Vietnam War, 1964–75: peace negotiations and withdrawal; the widening of the war into Cambodia and Laos, Kissinger's secret diplomacy, the 1973 Paris Peace Accords, US military exit, and the Fall of Saigon (1975).",
  lesson_4_4:
    'Reactions to, and the end of, US involvement in the Vietnam War, 1964–75: reasons for US failure; military, geographical, cultural, and political factors explaining why the United States failed to prevent communist victory in Vietnam.',
};

const USA_OBJECTIVES = {
  lesson_1_1: [
    'Explain the system of legal segregation and Jim Crow laws enforced across the American South in the 1950s.',
    'Analyze the methods used to disenfranchise Black voters, including literacy tests and white supremacist intimidation.',
    'Evaluate the contrasting early civil rights strategies of the NAACP (legal challenge) and CORE (direct action).',
  ],
  lesson_1_2: [
    'Explain how the NAACP successfully challenged school segregation in Brown v. Board of Education (1954).',
    "Analyze the Southern white backlash to the Supreme Court ruling, including the Southern Manifesto and White Citizens' Councils.",
    'Evaluate the constitutional confrontation between federal authority (President Eisenhower) and state defiance at Little Rock Central High (1957).',
  ],
  lesson_1_3: [
    'Explain the catalytic role of Rosa Parks and the local community in launching the Montgomery Bus Boycott (1955).',
    'Analyze the organisational leadership of the Montgomery Improvement Association (MIA) and Martin Luther King Jr.',
    "Evaluate the national significance of the Supreme Court's Browder v. Gayle ruling and the founding of the SCLC.",
  ],
  lesson_1_4: [
    "Explain the tactics used by Southern politicians and White Citizens' Councils to block racial desegregation.",
    'Analyze the impact of white supremacist terror and the lynching of Emmett Till (1955) on national public consciousness.',
    'Evaluate the weaknesses and limited enforcement of the Civil Rights Act of 1957.',
  ],
  lesson_2_1: [
    'Explain how the 1960 Greensboro sit-ins launched the student non-violent direct action movement and led to the creation of SNCC.',
    'Analyze the violent opposition faced by CORE and SNCC Freedom Riders across Alabama and Mississippi in 1961.',
    "Evaluate the federal intervention of the Kennedy administration in desegregating interstate transport and the James Meredith crisis at 'Ole Miss' (1962).",
  ],
  lesson_2_2: [
    "Explain how Martin Luther King Jr. and the SCLC orchestrated Project 'C' in Birmingham (1963) to provoke a national crisis.",
    'Analyze the impact of the 1963 March on Washington and Freedom Summer on passing the 1964 Civil Rights Act.',
    "Evaluate how the violence of 'Bloody Sunday' in Selma directly forced President Johnson to enact the Voting Rights Act of 1965.",
  ],
  lesson_2_3: [
    "Explain the religious and political ideology of Malcolm X and the Nation of Islam, contrasting it with MLK's integrationism.",
    'Analyze the emergence of Black Power under Stokely Carmichael and its symbolic impact at the 1968 Mexico Olympics.',
    'Evaluate the revolutionary goals, community survival programmes, and federal suppression of the Black Panther Party.',
  ],
  lesson_2_4: [
    'Explain the socio-economic causes of urban rioting in northern cities between 1965 and 1968 (Watts, Detroit, Newark).',
    'Analyze the findings of the 1968 Kerner Commission on systemic racism and police brutality in America.',
    "Evaluate the national impact of Martin Luther King Jr.'s assassination and assess the overall achievements of the civil rights movement by 1975.",
  ],
  lesson_3_1: [
    "Explain why US Cold War policy and the 'Domino Theory' led to American support for Ngo Dinh Diem in South Vietnam.",
    'Analyze the corruption and religious oppression of the Diem regime and evaluate the growing strength of the Vietcong (NLF).',
    'Assess the military escalation under President Kennedy, including the Strategic Hamlet Programme and the dispatch of US military advisers.',
  ],
  lesson_3_2: [
    'Explain how the 1964 Gulf of Tonkin incident led Congress to grant President Johnson sweeping war powers.',
    'Analyze the strategic decision to send US combat ground troops to Vietnam and begin Operation Rolling Thunder in 1965.',
    'Evaluate the challenges of the US military draft system and the growing reliance on conscripted troops.',
  ],
  lesson_3_3: [
    'Compare conventional US military tactics (search-and-destroy, air strikes, napalm, Agent Orange) with Vietcong guerrilla tactics.',
    'Analyze how the Ho Chi Minh Trail and underground tunnel complexes enabled the Vietcong to survive relentless bombing.',
    "Evaluate why US technological and firepower superiority failed to win the 'hearts and minds' of the Vietnamese peasantry.",
  ],
  lesson_3_4: [
    'Explain the military and psychological impact of the 1968 Tet Offensive on American public opinion.',
    "Analyze the shift in US policy from escalation to President Nixon's strategy of 'Vietnamisation' and the Nixon Doctrine.",
    'Evaluate the military and political failures of the ARVN during the 1970–71 cross-border invasions of Cambodia and Laos.',
  ],
  lesson_4_1: [
    'Explain the diverse reasons for the growth of domestic anti-war opposition in the United States between 1965 and 1971.',
    'Analyze the public outrage caused by the exposure of the 1968 My Lai Massacre and the trial of Lieutenant Calley.',
    'Evaluate the significance of the 1970 Kent State University shootings in polarizing American society against the war.',
  ],
  lesson_4_2: [
    'Explain the arguments used by Americans who supported the Vietnam War, including anti-communism and national honor.',
    "Analyze President Nixon's appeal to the 'Silent Majority' and evaluate the pro-war 'Hard Hat' riots of 1970.",
    'Assess the political and cultural divide between the pro-war and anti-war movements in the United States.',
  ],
  lesson_4_3: [
    'Explain the diplomatic negotiations between Henry Kissinger and Le Duc Tho leading to the 1973 Paris Peace Accords.',
    'Analyze the terms of the Paris Peace Agreement and evaluate the consequences of the total withdrawal of US combat troops.',
    'Assess the rapid collapse of South Vietnam and the Fall of Saigon to North Vietnamese forces in April 1975.',
  ],
  lesson_4_4: [
    'Evaluate the military, geographical, and technological factors that caused the United States to fail in Vietnam.',
    'Analyze the political and social weaknesses of the South Vietnamese government compared to the dedication of the North Vietnamese and Vietcong.',
    'Synthesize the domestic and international consequences of the Vietnam War for American foreign policy and society.',
  ],
};

// =========================================================================
// PIPELINE EXECUTION
// =========================================================================
(async () => {
  console.log('🚀 Starting Master GCSE Uniformity Synchronization...\n');

  // --- UNIT 1: WEIMAR & NAZI GERMANY ---
  console.log('Processing weimar_nazi_germany...');
  const weimarPath = path.resolve('units/weimar_nazi_germany/data.js');
  const weimarMod = await import('file:///' + weimarPath.replace(/\\/g, '/'));
  const weimarData = weimarMod.default || weimarMod.unitData;
  weimarData.lessons.forEach((l) => {
    if (WEIMAR_SPEC[l.id]) {
      l.specification_anchor = WEIMAR_SPEC[l.id];
    }
  });
  const weimarOutput =
    'export const unitData = ' +
    JSON.stringify(weimarData, null, 2) +
    ';\nexport default unitData;\n';
  fs.writeFileSync(weimarPath, weimarOutput, 'utf8');
  console.log('  ✅ Wrote units/weimar_nazi_germany/data.js');

  const pubWeimarPath = path.resolve('public/data/weimar_nazi_germany.json');
  if (fs.existsSync(pubWeimarPath)) {
    const pubW = JSON.parse(fs.readFileSync(pubWeimarPath, 'utf8'));
    if (pubW.data && Array.isArray(pubW.data.lessons)) {
      pubW.data.lessons.forEach((l) => {
        if (WEIMAR_SPEC[l.id]) l.specification_anchor = WEIMAR_SPEC[l.id];
      });
      fs.writeFileSync(pubWeimarPath, JSON.stringify(pubW, null, 2), 'utf8');
      console.log('  ✅ Wrote public/data/weimar_nazi_germany.json');
    }
  }

  // --- UNIT 2: CONFLICT IN THE MIDDLE EAST ---
  console.log('\nProcessing cme_new...');
  const cmePath = path.resolve('units/cme_new/data.js');
  const cmeMod = await import('file:///' + cmePath.replace(/\\/g, '/'));
  const cmeData = cmeMod.default || cmeMod.unitData;
  cmeData.lessons.forEach((l) => {
    if (CME_SPEC[l.id]) {
      l.specification_anchor = CME_SPEC[l.id];
    }
  });
  const cmeOutput =
    'const unitData = ' +
    JSON.stringify(cmeData, null, 2) +
    ";\nexport default unitData;\nexport { unitData };\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = unitData;\n}\n";
  fs.writeFileSync(cmePath, cmeOutput, 'utf8');
  console.log('  ✅ Wrote units/cme_new/data.js');

  const pubCmePath = path.resolve('public/data/cme_new.json');
  if (fs.existsSync(pubCmePath)) {
    const pubC = JSON.parse(fs.readFileSync(pubCmePath, 'utf8'));
    if (pubC.data && Array.isArray(pubC.data.lessons)) {
      pubC.data.lessons.forEach((l) => {
        if (CME_SPEC[l.id]) l.specification_anchor = CME_SPEC[l.id];
      });
      fs.writeFileSync(pubCmePath, JSON.stringify(pubC, null, 2), 'utf8');
      console.log('  ✅ Wrote public/data/cme_new.json');
    }
  }

  // --- UNIT 3: EARLY ELIZABETHAN ENGLAND ---
  console.log('\nProcessing eee...');
  const eeePath = path.resolve('units/eee/data.js');
  const eeeMod = await import('file:///' + eeePath.replace(/\\/g, '/'));
  const eeeData = eeeMod.default || eeeMod.unitData;
  eeeData.lessons.forEach((l) => {
    if (EEE_SPEC[l.id]) {
      l.specification_anchor = EEE_SPEC[l.id];
    }
    if (EEE_MISSING_OBJECTIVES[l.id]) {
      l.learning_objectives = {
        overarching: l.title.replace(/^KT\s*\d+\.\d+:\s*/i, '').trim(),
        scaffolded: EEE_MISSING_OBJECTIVES[l.id],
      };
    }
  });
  const eeeOutput =
    '// Early Elizabethan England, 1558–88 Unit Data\nexport const unitData = ' +
    JSON.stringify(eeeData, null, 2) +
    ";\nexport default unitData;\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = unitData;\n}\n";
  fs.writeFileSync(eeePath, eeeOutput, 'utf8');
  console.log('  ✅ Wrote units/eee/data.js');

  const pubEeePath = path.resolve('public/data/eee.json');
  if (fs.existsSync(pubEeePath)) {
    const pubE = JSON.parse(fs.readFileSync(pubEeePath, 'utf8'));
    if (pubE.data && Array.isArray(pubE.data.lessons)) {
      pubE.data.lessons.forEach((l) => {
        if (EEE_SPEC[l.id]) l.specification_anchor = EEE_SPEC[l.id];
        if (EEE_MISSING_OBJECTIVES[l.id]) {
          l.learning_objectives = {
            overarching: l.title.replace(/^KT\s*\d+\.\d+:\s*/i, '').trim(),
            scaffolded: EEE_MISSING_OBJECTIVES[l.id],
          };
        }
      });
      fs.writeFileSync(pubEeePath, JSON.stringify(pubE, null, 2), 'utf8');
      console.log('  ✅ Wrote public/data/eee.json');
    }
  }

  // --- UNIT 4: USA ---
  console.log('\nProcessing usa...');
  const usaPath = path.resolve('units/usa/data.js');
  const usaMod = await import('file:///' + usaPath.replace(/\\/g, '/'));
  const usaData = usaMod.default || usaMod.unitData;
  usaData.lessons.forEach((l) => {
    // 1. Move narrative blurb from overarching to hook_text
    if (l.learning_objectives && l.learning_objectives.overarching) {
      l.hook_text = l.learning_objectives.overarching.trim();
    }
    // 2. Set official specification anchor
    if (USA_SPEC[l.id]) {
      l.specification_anchor = USA_SPEC[l.id];
    }
    // 3. Set rigorous scaffolded objectives
    if (USA_OBJECTIVES[l.id]) {
      l.learning_objectives = {
        overarching: l.title.replace(/^KT\s*\d+\.\d+:\s*/i, '').trim(),
        scaffolded: USA_OBJECTIVES[l.id],
      };
    }
  });
  const usaOutput =
    '// USA 1954–75: Conflict at Home and Abroad Unit Data\nexport const unitData = ' +
    JSON.stringify(usaData, null, 2) +
    ";\nexport default unitData;\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = unitData;\n}\n";
  fs.writeFileSync(usaPath, usaOutput, 'utf8');
  console.log('  ✅ Wrote units/usa/data.js');

  const pubUsaPath = path.resolve('public/data/usa.json');
  if (fs.existsSync(pubUsaPath)) {
    const pubU = JSON.parse(fs.readFileSync(pubUsaPath, 'utf8'));
    if (pubU.data && Array.isArray(pubU.data.lessons)) {
      pubU.data.lessons.forEach((l) => {
        if (l.learning_objectives && l.learning_objectives.overarching) {
          l.hook_text = l.learning_objectives.overarching.trim();
        }
        if (USA_SPEC[l.id]) l.specification_anchor = USA_SPEC[l.id];
        if (USA_OBJECTIVES[l.id]) {
          l.learning_objectives = {
            overarching: l.title.replace(/^KT\s*\d+\.\d+:\s*/i, '').trim(),
            scaffolded: USA_OBJECTIVES[l.id],
          };
        }
      });
      fs.writeFileSync(pubUsaPath, JSON.stringify(pubU, null, 2), 'utf8');
      console.log('  ✅ Wrote public/data/usa.json');
    }
  }

  // --- REBUILD MASTER DATABASE.JSON ---
  console.log('\n🗄️ Rebuilding public/database.json via scripts/build_database.cjs...');
  execSync('node scripts/build_database.cjs', {
    stdio: 'inherit',
    cwd: path.join(__dirname, '..'),
  });

  // --- RUN FINAL AUDIT ---
  console.log('\n🔍 Running final platform-wide audit...');
  execSync('node scripts/scan_all_units_uniformity.cjs', {
    stdio: 'inherit',
    cwd: path.join(__dirname, '..'),
  });

  console.log('\n🎉 ALL GCSE UNITS SUCCESSFULLY SYNCHRONIZED AND UNIFORM!');
})();
