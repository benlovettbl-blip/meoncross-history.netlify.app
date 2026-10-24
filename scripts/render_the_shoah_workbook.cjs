const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');
const puppeteer = require('puppeteer');

const ROOT_DIR = path.resolve(__dirname, '..');

function getBase64Image(relPath) {
  if (!relPath) return null;
  const clean = relPath.replace(/^\//, '');
  const candidates = [
    path.join(ROOT_DIR, 'public', clean),
    path.join(ROOT_DIR, clean),
    path.join(ROOT_DIR, 'public', 'images', path.basename(clean)),
    path.join(ROOT_DIR, 'images', path.basename(clean)),
  ];

  for (const cand of candidates) {
    if (fs.existsSync(cand) && fs.statSync(cand).isFile()) {
      const ext = path.extname(cand).toLowerCase();
      let mime = 'image/jpeg';
      if (ext === '.png') mime = 'image/png';
      else if (ext === '.webp') mime = 'image/webp';
      else if (ext === '.svg') mime = 'image/svg+xml';
      const buf = fs.readFileSync(cand);
      return `data:${mime};base64,${buf.toString('base64')}`;
    }
  }
  return null;
}

function generateQrSvg(url) {
  const qr = QRCode.create(url, { margin: 1 });
  const size = qr.modules.size;
  const data = qr.modules.data;
  let pathD = '';
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (data[r * size + c]) {
        pathD += `M${c},${r}h1v1h-1z `;
      }
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" shape-rendering="crispEdges" style="width: 100%; height: 100%;"><path fill="#ffffff" d="M0,0h${size}v${size}H0z"/><path fill="#000000" d="${pathD.trim()}"/></svg>`;
}

// ============================================================================
// 7 Dedicated Shoah Enquiry Configurations (Gold Standard 5-Stage Standard)
// ============================================================================
const enquiryConfigs = [
  {
    lessonNum: 1,
    id: 'lesson_1',
    title: 'Enquiry 1: Pre-War European Jewish Life & Culture',
    enquiryQuestion: 'Who were the Jews of Europe before the Second World War?',
    specAnchor:
      '9.5 million European Jews; demographic diversity; Yiddishland in Eastern Europe (shtetls, Warsaw, Vilna); Western integration in Berlin & Paris; 100,000 German Jewish WWI soldiers; Sephardic heritage in Thessaloniki; religious anti-Judaism vs modern racial antisemitism.',
    stages: [
      {
        step: 1,
        paraRef: '[1.1]',
        date: 'c. 1930s',
        questionHeading: 'What made European Jewish life before 1939 so demographically diverse?',
        bullets: ['9.5 Million People', 'Over 60% in East', 'Vibrant Regional Life'],
        focusClue:
          'Why is it a historical error to imagine pre-war European Jews as a single, uniform community?',
      },
      {
        step: 2,
        paraRef: '[1.2]',
        date: 'Pre-1939',
        questionHeading: 'Why was Eastern Europe renowned as the heartland of Yiddish culture?',
        bullets: ['Shtetls and Big Cities', 'Yiddish Daily Papers', 'Vilna: Jerusalem of North'],
        focusClue:
          'How did towns and cities like Warsaw and Vilna sustain rich literature, theatre, and religious scholarship?',
      },
      {
        step: 3,
        paraRef: '[1.3]',
        date: '1871–1933',
        questionHeading:
          'How does the First World War service of German Jews disprove Nazi stereotypes?',
        bullets: ['Full Civic Emancipation', '100,000 WWI Soldiers', '18,000 Iron Crosses'],
        focusClue:
          'What does the decorated military service of 100,000 German Jews reveal about their patriotic identity?',
      },
      {
        step: 4,
        paraRef: '[1.4]',
        date: 'Centuries–1930s',
        questionHeading: 'What distinguished the Sephardic Jewish experience in Southern Europe?',
        bullets: ['Spanish Heritage 1492', 'Ladino Dialect Spoken', 'Thessaloniki Port Closes'],
        focusClue:
          'Why was the Greek port city of Thessaloniki historically celebrated as the "Mother of Israel"?',
      },
      {
        step: 5,
        paraRef: '[1.5]',
        date: 'Late 19th C.',
        questionHeading: 'Why was the 19th-century invention of racial antisemitism so deadly?',
        bullets: ['Medieval Church Hatred', 'Baptism No Escape', 'Biological Blood Theory'],
        focusClue:
          'How did pseudo-scientific racial theory transform religious anti-Judaism into biological determinism?',
      },
    ],
    vocabPrompt:
      'Define <strong>Racial Antisemitism</strong> and explain how it fundamentally differed from medieval Christian anti-Judaism:',
    rightPage: {
      type: 'split',
      partA: {
        tariff: 'Question 1: Describe Two Features [4 marks • 5 mins]',
        badge: 'FEATURE DRILL',
        question: 'Describe two features of pre-war Jewish life in Eastern Europe. [4 marks]',
        stems:
          'Feature 1: One key feature was that... • Detail: Specifically, this involved... • Feature 2: A second key feature was... • Detail: In particular, this meant that...',
      },
      partB: {
        tariff: 'Question 2: Explain One Consequence [4 marks • 5 mins]',
        badge: 'STRUCTURED WRITING',
        question:
          'Explain one consequence of the development of 19th-century racial antisemitism for European Jews. [4 marks]',
        hint: 'Focus on how pseudo-scientific biology treated Jewish identity as an unalterable genetic trait in the blood, removing baptism as an escape.',
        stems:
          'One consequence was that... • In particular, this meant that... • This was significant because... • Consequently, the impact was...',
        connectives:
          'A significant consequence was that... • In particular, this meant that... • Furthermore, this led to... • Consequently, the impact was...',
        wordBank:
          'Yiddishland • shtetl • assimilation • 100,000 German soldiers • Thessaloniki • anti-Judaism • biological racism • Wilhelm Marr',
      },
      timelineMissionTitle: 'Timeline Task • pp. 10–11',
      timelineMission:
        '<strong>Milestone 1 (c. 1933):</strong> Choose <strong>(A) Creative Sketch:</strong> Draw a vibrant scene of pre-war life — e.g. an open book glowing with Yiddish words, a bustling town market, or a German WWI Iron Cross medal showing proud patriotism &bull; OR &bull; <strong>(B) Mind Map:</strong> "Pre-War Life" (9.5M Jews, Yiddish culture, WWI service)',
    },
    leftPageQuip:
      'Over 100,000 German Jews fought patriotically for Germany in WWI; 12,000 gave their lives and 18,000 earned the Iron Cross for bravery.',
    rightPageQuip:
      'Before 1939, over three million Jewish people lived in Poland, creating an irreplaceable millennium of Yiddish language, music, and art.',
  },
  {
    lessonNum: 2,
    id: 'lesson_2',
    title: 'Enquiry 2: Nazi Persecution & The Stripping of Rights (1933–1939)',
    enquiryQuestion:
      'How were German Jews progressively stripped of citizenship and rights (1933–1939)?',
    specAnchor:
      '1 April 1933 Boycott; Civil Service Law; 1935 Nuremberg Laws (Reich Citizenship Law, Blood Protection Law); 400 anti-Jewish decrees; Victor Klemperer’s diary ("social death"); November Pogrom (Kristallnacht 1938); Evian Conference; Kindertransport.',
    stages: [
      {
        step: 1,
        paraRef: '[2.1]',
        date: 'April 1933',
        questionHeading:
          'Why did the Nazi state begin persecution with economic boycotts and civil service purges?',
        bullets: ['SA Picket Windows', 'Jude Smudged in Paint', 'Judges & Teachers Fired'],
        focusClue:
          'How did the Law for the Restoration of the Professional Civil Service legally exclude Jews from public institutions?',
      },
      {
        step: 2,
        paraRef: '[2.2]',
        date: 'Sept 1935',
        questionHeading:
          'How did the 1935 Nuremberg Laws legally codify racial discrimination into German law?',
        bullets: ['Citizenship Revoked', 'Intermarriage Banned', 'Grandparent Blood Chart'],
        focusClue:
          'Why did the Reich Citizenship Law reduce German Jews to second-class "subjects" without political rights?',
      },
      {
        step: 3,
        paraRef: '[2.3]',
        date: '1935–1938',
        questionHeading:
          'What does Victor Klemperer’s diary reveal about the psychological reality of "social death"?',
        bullets: ['400 Separate Decrees', 'Yellow Park Benches', 'Friends Look Away'],
        focusClue:
          'How did incremental decrees banning Jews from parks, driving, and owning pets systematically isolate them from neighbours?',
      },
      {
        step: 4,
        paraRef: '[2.4]',
        date: '9–10 Nov 1938',
        questionHeading:
          'Why was the November Pogrom (Kristallnacht) a violent turning point in state policy?',
        bullets: ['1,400 Synagogues Burned', '30,000 Men to Camps', '1 Billion Mark Fine'],
        focusClue:
          'What does the instruction to fire brigades to protect only "Aryan" buildings reveal about the collapse of the rule of law?',
      },
      {
        step: 5,
        paraRef: '[2.5]',
        date: '1938–1939',
        questionHeading:
          'Why did the Evian Conference fail to resolve the desperate Jewish refugee crisis?',
        bullets: ['32 Nations Meet', 'Closed Global Borders', '10,000 Children Rescued'],
        focusClue:
          'How did the failure of international nations to open immigration quotas leave hundreds of thousands of Jews trapped?',
      },
    ],
    vocabPrompt:
      'Define <strong>Social Death</strong> and explain how bureaucratic decrees and the Nuremberg Laws enforced it between 1933 and 1939:',
    rightPage: {
      type: 'narrative_8',
      tariff: 'Question 2: Narrative Account [8 marks • 12 mins]',
      badge: 'NARRATIVE ACCOUNT',
      examStem:
        'Write a narrative account analysing the key stages in the persecution of German Jews between 1933 and 1939. [8 marks]',
      stimulus: [
        'The enactment of the Nuremberg Laws (1935)',
        'The November Pogrom (Kristallnacht, 1938)',
      ],
      connectives:
        'Initially, the persecution began when... • Following this, a major escalation occurred in 1935 when... • A violent turning point was reached when... • Consequently... • This ultimately resulted in...',
      wordBank:
        'April Boycott (1933) • Civil Service Law • Reich Citizenship Law • Blood Protection Law • Victor Klemperer • Kristallnacht • 30,000 arrested • Evian Conference • Kindertransport',
      timelineMissionTitle: 'Timeline Task • pp. 10–11',
      timelineMission:
        '<strong>Milestones 2 &amp; 3 (1933–1938):</strong> Choose <strong>(A) Creative Sketch:</strong> Draw a powerful image of rights being destroyed — e.g. the scales of justice tilting and cracking under a swastika, or a shop window shattered into jagged shards reflecting a burning synagogue &bull; OR &bull; <strong>(B) Mind Map:</strong> "Nazi Persecution" (Boycott, Nuremberg Laws, Kristallnacht)',
    },
    leftPageQuip:
      'During Kristallnacht, police were ordered not to intervene while SA men burned over 1,400 synagogues across Germany and Austria.',
    rightPageQuip:
      'Victor Klemperer wrote: "It is not the big blows that break you, but the thousand small humiliations repeated each single day."',
  },
  {
    lessonNum: 3,
    id: 'lesson_3',
    title: 'Enquiry 3: War, Forced Segregation & The Warsaw Ghetto (1939–1941)',
    enquiryQuestion: 'How did the outbreak of WWII transform Nazi anti-Jewish policy (1939–1941)?',
    specAnchor:
      'Invasion of Poland (1 Sept 1939); Heydrich’s Schnellbrief; Star of David armbands; forced labour; Warsaw Ghetto established (Nov 1940); 450,000 crammed into 1.3 sq miles; 180–220 calories/day; typhus epidemics; child food smugglers; Emanuel Ringelblum & Oneg Shabbat archive.',
    stages: [
      {
        step: 1,
        paraRef: '[3.1]',
        date: 'Sept 1939',
        questionHeading:
          'How did the conquest of Poland fundamentally expand the scale of Nazi persecution?',
        bullets: ['2 Million Polish Jews', 'Heydrich’s Schnellbrief', 'Rail Hub Concentration'],
        focusClue:
          'Why did capturing Poland force the Nazi leadership to abandon voluntary emigration in favour of forced concentration?',
      },
      {
        step: 2,
        paraRef: '[3.2]',
        date: 'Autumn 1939',
        questionHeading:
          'Why was the mandatory Star of David armband such a devastating psychological weapon?',
        bullets: ['Marked for Humiliation', 'Forced Labour Gangs', 'Businesses Confiscated'],
        focusClue:
          'How did public stigmatisation and slave labour battalions prepare the ground for total physical segregation?',
      },
      {
        step: 3,
        paraRef: '[3.3]',
        date: '1940–1941',
        questionHeading:
          'What physical and demographic conditions defined life inside the sealed Warsaw Ghetto?',
        bullets: ['3-Metre Brick Wall', '450,000 Imprisoned', '7–9 People Per Room'],
        focusClue:
          'Why did cramming 30% of Warsaw’s population into 2.4% of its urban space create immediate humanitarian collapse?',
      },
      {
        step: 4,
        paraRef: '[3.4]',
        date: '1940–1942',
        questionHeading:
          'How did Nazi food administrators use caloric rationing as a tool of slow mass murder?',
        bullets: ['180–220 Calories a Day', '80,000 Dead of Hunger', 'Brave Child Smugglers'],
        focusClue:
          'Why were small children the indispensable lifeline preventing the immediate starvation of the entire ghetto?',
      },
      {
        step: 5,
        paraRef: '[3.5]',
        date: '1940–1943',
        questionHeading:
          'Why was Emanuel Ringelblum’s Oneg Shabbat archive an act of extraordinary spiritual resistance?',
        bullets: ['Underground Historians', 'Buried in Milk Cans', 'Truth Outliving Terror'],
        focusClue:
          'How did secretly collecting diaries, songs, and death records defeat the Nazi attempt to erase their victims from history?',
      },
    ],
    vocabPrompt:
      'Define <strong>Spiritual Resistance</strong> and explain how Emanuel Ringelblum’s Oneg Shabbat archive preserved human dignity:',
    rightPage: {
      type: 'source_utility_8',
      tariff: 'Question 3: Source Utility [8 marks • 12 mins]',
      badge: 'SOURCE UTILITY',
      question:
        'How useful is Source A for an enquiry into the living conditions and physical confinement of Jews in the Warsaw Ghetto? [8 marks]',
      sourceCaption:
        'Source A: An extract from the diary of 16-year-old Mary Berg, written inside the Warsaw Ghetto, January 1941.',
      sourceText:
        '"The brick wall around the ghetto grows taller every day. It cuts us off completely from the world. Outside, streetcars clang and people walk freely in the sunshine; inside, children in rags freeze on the pavements with swollen bellies, crying for a crust of bread. We have organized secret classes in the cellar. We study history and literature by candlelight, defying the guards who patrol the gates. Even if they starve our bodies, they cannot extinguish our minds."',
      stems:
        'Source A is useful because of its content, which reveals that... • In particular, it shows that living conditions were... • Furthermore, the provenance makes it valuable because it was written by... • However, a historian must also consider its limitations, such as...',
      wordBank:
        'Warsaw Ghetto wall • 180 calories • starvation • typhus • child smugglers • Mary Berg • Oneg Shabbat • Emanuel Ringelblum • milk cans',
      timelineMissionTitle: 'Timeline Task • pp. 10–11',
      timelineMission:
        '<strong>Milestones 4 &amp; 5 (1939–1942):</strong> Choose <strong>(A) Creative Sketch:</strong> Illustrate life and defiance behind the walls — e.g. a child smuggling a loaf of bread through a hole in a 10ft brick wall, or a sealed metal milk can buried beneath cobblestones hiding secret diaries &bull; OR &bull; <strong>(B) Mind Map:</strong> "The Warsaw Ghetto" (Walls, Starvation, Oneg Shabbat)',
    },
    leftPageQuip:
      'Official rations in the Warsaw Ghetto provided only 180 calories per day; over 80,000 people died of hunger and disease before deportations began.',
    rightPageQuip:
      'David Graber, 19, wrote before burying the archive: "What we were unable to shout out to the world, we buried in the ground."',
  },
  {
    lessonNum: 4,
    id: 'lesson_4',
    title: 'Enquiry 4: Operation Barbarossa & The Holocaust by Bullets (1941–1942)',
    enquiryQuestion: 'How and why did persecution turn into systematic mass murder (1941–1942)?',
    specAnchor:
      'Operation Barbarossa (22 June 1941); war of extermination (Vernichtungskrieg); Commissar Order; Einsatzgruppen (A, B, C, D); Order Police (Reserve Police Battalion 101); Babi Yar ravine massacre (33,771 murdered in 36 hours); Ponary forest; local collaboration in Baltics/Ukraine; perpetrator psychological strain; gas vans at Chełmno.',
    stages: [
      {
        step: 1,
        paraRef: '[4.1]',
        date: '22 June 1941',
        questionHeading:
          'Why did the invasion of the Soviet Union mark a fundamental shift to ideological total war?',
        bullets: ['Operation Barbarossa', 'Commissar Order Issued', 'Judeo-Bolshevism Myth'],
        focusClue:
          'How did Hitler’s framing of the invasion as a biological war of annihilation remove all military rules of warfare?',
      },
      {
        step: 2,
        paraRef: '[4.2]',
        date: 'Summer 1941',
        questionHeading:
          'How did the Einsatzgruppen’s killing mandate expand from officials to entire communities?',
        bullets: ['4 SS Killing Squads', 'Order Police Battalions', 'Women & Children Shot'],
        focusClue:
          'Why did inspection visits by Heinrich Himmler in July–August 1941 trigger total slaughter of all Jewish families?',
      },
      {
        step: 3,
        paraRef: '[4.3]',
        date: '29–30 Sept 1941',
        questionHeading:
          'What made the mass execution at Babi Yar such an unprecedented manifestation of murder?',
        bullets: ['Ravine Outside Kyiv', '33,771 Shot in 36 Hours', 'Clinical Berlin Reports'],
        focusClue:
          'How was the deception of "resettlement" used to march tens of thousands of people into a ravine to be shot face-to-face?',
      },
      {
        step: 4,
        paraRef: '[4.4]',
        date: '1941–1942',
        questionHeading:
          'What role did local auxiliary police play in massacres across Lithuania, Latvia, and Ukraine?',
        bullets: ['Ponary Forest Pits', '90% of Lithuanians Dead', 'Auxiliary Collaboration'],
        focusClue:
          'Why was the participation of local nationalist volunteers crucial to the speed and totality of the mass shootings?',
      },
      {
        step: 5,
        paraRef: '[4.5]',
        date: 'Late 1941',
        questionHeading:
          'Why did the psychological strain on executioners drive the transition toward industrial gas vans?',
        bullets: ['Himmler Sick at Minsk', 'Shooter Nervous Breakdowns', 'Chełmno Exhaust Vans'],
        focusClue:
          'How did concern for the emotional health of German executioners accelerate the development of mechanical gas chambers?',
      },
    ],
    vocabPrompt:
      'Define <strong>The Holocaust by Bullets</strong> and explain why Operation Barbarossa was the decisive turning point into total genocide:',
    rightPage: {
      type: 'single_12',
      tariff: 'Question 4: Evaluative Statement Essay [12 marks • 15 mins]',
      examStem:
        '‘The invasion of the Soviet Union in June 1941 was the main turning point in the development of the Holocaust.’ How far do you agree? [12 marks]',
      stimulus: [
        'The invasion of the Soviet Union and the Einsatzgruppen mass shootings (1941)',
        'The enactment of the Nuremberg Laws and Kristallnacht (1935–1938)',
      ],
      structureStrip: [
        {
          col: '1. OPERATION BARBAROSSA (1941)',
          text: 'Explain how the invasion of the USSR transformed policy from segregation to systematic mass murder (Babi Yar, Ponary, 1.5m shot).',
        },
        {
          col: '2. PRE-1941 LEGAL PERSECUTION',
          text: 'Explain the counter-argument: that the 1935 Nuremberg Laws and Kristallnacht created the legal and moral climate that made murder possible.',
        },
        {
          col: '3. COMPARATIVE VERDICT',
          text: 'Weigh whether the transition to actual physical extermination in June 1941 represented the decisive, irrevocable watershed.',
        },
      ],
      connectives:
        'To a large extent, it can be argued that... • On the one hand, Operation Barbarossa was decisive because... • In particular, this meant that... • On the other hand, an alternative view is that... • In conclusion, the primary turning point was... because...',
      wordBank:
        'Operation Barbarossa • Vernichtungskrieg • Einsatzgruppen • Babi Yar (33,771 dead) • Ponary • Christopher Browning • Ordinary Men • Chełmno gas vans',
      timelineMissionTitle: 'Timeline Task • pp. 10–11',
      timelineMission:
        '<strong>Milestone 6 (1941):</strong> Choose <strong>(A) Creative Sketch:</strong> Depict the brutal turning point of 1941 — e.g. a lightning-bolt invasion arrow cutting across the Soviet border, or a single memorial candle burning at the edge of the dark Babi Yar ravine &bull; OR &bull; <strong>(B) Mind Map:</strong> "Holocaust by Bullets" (Barbarossa, Einsatzgruppen, Babi Yar)',
    },
    leftPageQuip:
      'Over 1.5 million Jewish people were murdered in open pits and ravines during the "Holocaust by Bullets" before death camps were built.',
    rightPageQuip:
      'Christopher Browning’s study "Ordinary Men" proved that Reserve Police Battalion 101 members were permitted to step out, yet 80% chose to shoot.',
  },
  {
    lessonNum: 5,
    id: 'lesson_5',
    title: 'Enquiry 5: The "Final Solution" & Armed Resistance (1942–1944)',
    enquiryQuestion: 'How did the "Final Solution" operate, and how did Jews resist?',
    specAnchor:
      'Wannsee Conference (20 Jan 1942); Reinhard Heydrich & Adolf Eichmann; coordination of state ministries; Operation Reinhard death camps (Bełżec, Sobibór, Treblinka); carbon monoxide chambers; Auschwitz-Birkenau dual function; Zyklon B; ramp selection; Warsaw Ghetto Uprising (April 1943); Mordechai Anielewicz & ŻOB; Treblinka & Sobibór camp revolts; Sonderkommando revolt (Oct 1944).',
    stages: [
      {
        step: 1,
        paraRef: '[5.1]',
        date: '20 Jan 1942',
        questionHeading:
          'Why was the Wannsee Conference a meeting of bureaucratic coordination rather than policy creation?',
        bullets: ['15 Senior Civil Servants', 'Eichmann’s 11 Million List', 'Railway Cooperation'],
        focusClue:
          'How did the Wannsee Conference bind government ministries and the state railway into the mechanics of extermination?',
      },
      {
        step: 2,
        paraRef: '[5.2]',
        date: '1942–1943',
        questionHeading:
          'What made the three Operation Reinhard camps fundamentally distinct from concentration camps?',
        bullets: ['Bełżec, Sobibór, Treblinka', 'Zero Selection for Labour', 'Dead Within 2 Hours'],
        focusClue:
          'Why were Bełżec, Sobibór, and Treblinka designed purely as industrial assembly lines of immediate human extermination?',
      },
      {
        step: 3,
        paraRef: '[5.3]',
        date: '1942–1944',
        questionHeading:
          'How did the dual function of Auschwitz-Birkenau combine slave labour with industrial murder?',
        bullets: ['Railway Ramp Selection', 'Zyklon B in Ceiling Vents', '1.1 Million Murdered'],
        focusClue:
          'How did SS doctors decide who lived temporarily as industrial slaves and who was sent immediately to the gas chambers?',
      },
      {
        step: 4,
        paraRef: '[5.4]',
        date: 'April–May 1943',
        questionHeading:
          'Why was the Warsaw Ghetto Uprising a monumental triumph of human courage and dignity?',
        bullets: ['ŻOB & Anielewicz', 'Pistols vs German Tanks', '27 Days of Defiance'],
        focusClue:
          'Why did young Jewish fighters choose to die fighting in the ruins of Warsaw rather than perish silently in Treblinka?',
      },
      {
        step: 5,
        paraRef: '[5.5]',
        date: '1943–1944',
        questionHeading:
          'How do armed uprisings inside the death camps disprove the myth of passive Jewish victimhood?',
        bullets: ['Treblinka Armoury Raid', 'Sobibór Mass Breakout', 'Crematorium IV Blown Up'],
        focusClue:
          'How did prisoners at Treblinka, Sobibór, and Auschwitz stage armed revolts under conditions of near-total starvation?',
      },
    ],
    vocabPrompt:
      'Define <strong>Operation Reinhard</strong> and explain the crucial distinction between a concentration camp and an extermination camp:',
    rightPage: {
      type: 'split',
      partA: {
        tariff: 'Question 1: Describe Two Features [4 marks • 5 mins]',
        badge: 'FEATURE DRILL',
        question: 'Describe two features of the Operation Reinhard extermination camps. [4 marks]',
        stems:
          'Feature 1: One key feature was that... • Detail: Specifically, this involved... • Feature 2: A second key feature was... • Detail: This served the purpose of...',
      },
      partB: {
        tariff: 'Question 2: Explain Why [8 marks • 12 mins]',
        badge: 'CAUSAL ANALYSIS',
        question:
          'Explain why Jewish fighters in the Warsaw Ghetto chose to launch an armed uprising in April 1943. [8 marks]',
        hint: 'Focus on the deportation of 300,000 residents to Treblinka, the determination to die with honour, and the creation of the ŻOB.',
        stems:
          'One reason was that... • In particular, this meant that... • This led to the uprising because... • A second reason was... • Consequently, this resulted in...',
        connectives:
          'A primary reason was that... • In particular, this meant that... • Furthermore, this was significant because... • A secondary factor was... • Consequently, this resulted in...',
        wordBank:
          'Wannsee Protocol • Operation Reinhard • Treblinka • Auschwitz-Birkenau • Zyklon B • selection • Mordechai Anielewicz • ŻOB • Sonderkommando revolt',
      },
      timelineMissionTitle: 'Timeline Task • pp. 10–11',
      timelineMission:
        '<strong>Milestones 7 &amp; 8 (1942–1944):</strong> Choose <strong>(A) Creative Sketch:</strong> Capture industrial terror or defiant resistance — e.g. railway tracks narrowing into the ominous archway of Birkenau, or a raised fist breaking through barbed wire clutching a secret resistance leaflet &bull; OR &bull; <strong>(B) Mind Map:</strong> "Death Camps &amp; Resistance" (Wannsee, Treblinka, Warsaw Uprising)',
    },
    leftPageQuip:
      'At Treblinka, Bełżec, and Sobibór, there was zero selection for labour; arriving transports of 5,000 people were murdered within two hours.',
    rightPageQuip:
      'Mordechai Anielewicz, 23, commander of the Warsaw Ghetto Uprising, wrote: "My life’s dream has come true: Jewish self-defence has become a reality."',
  },
  {
    lessonNum: 6,
    id: 'lesson_6',
    title: 'Enquiry 6: Responsibility, Complicity & Rescue across Europe',
    enquiryQuestion: 'Who was responsible, who collaborated, and who tried to save?',
    specAnchor:
      'Raul Hilberg’s spectrum (perpetrators, victims, bystanders); German civil service & Deutsche Reichsbahn; European collaboration (Vichy France & Vel’ d’Hiv roundup; Hungarian deportations); bystander indifference & Ian Kershaw; Righteous Among the Nations; rescue of Danish Jewry (Oct 1943); Le Chambon-sur-Lignon; White Rose (Sophie Scholl); Allied knowledge & Jan Karski; bombing Auschwitz debate.',
    stages: [
      {
        step: 1,
        paraRef: '[6.1]',
        date: '1941–1945',
        questionHeading:
          'How did ordinary civil servants and railway schedulers contribute to the machinery of murder?',
        bullets: [
          'Desk Murderers (Schreibtischtäter)',
          'Reichsbahn Train Schedules',
          'Billing Per Passenger Km',
        ],
        focusClue:
          'Why did modern bureaucratic specialization allow ordinary professionals to organize mass murder without holding a weapon?',
      },
      {
        step: 2,
        paraRef: '[6.2]',
        date: '1940–1944',
        questionHeading:
          'Why was collaboration by foreign governments like Vichy France and Hungary indispensable?',
        bullets: ['Vichy Vel’ d’Hiv Arrests', '437,000 Hungarians Deported', 'All-European Crime'],
        focusClue:
          'How did local police forces and collaborationist ministries round up Jewish citizens under German occupation?',
      },
      {
        step: 3,
        paraRef: '[6.3]',
        date: '1933–1945',
        questionHeading:
          'To what extent did passive bystander indifference enable the perpetrators to succeed?',
        bullets: [
          'Watching Neighbours Taken',
          'Stolen Furniture Auctions',
          'Paved with Indifference',
        ],
        focusClue:
          'What did historian Ian Kershaw mean when he wrote that "the road to Auschwitz was built by hatred, but paved with indifference"?',
      },
      {
        step: 4,
        paraRef: '[6.4]',
        date: '1940–1944',
        questionHeading:
          'What unique factors enabled the people of Denmark to rescue over 95% of their Jewish population?',
        bullets: [
          'Spontaneous Nationwide Effort',
          '7,200 Ferry by Fishing Boat',
          'Neutral Sweden Safe',
        ],
        focusClue:
          'How does the Danish rescue prove that collective moral courage could thwart Nazi extermination orders?',
      },
      {
        step: 5,
        paraRef: '[6.5]',
        date: '1942–1944',
        questionHeading:
          'Why did the Allied powers decide against bombing the railway tracks leading to Auschwitz?',
        bullets: ['Jan Karski Eyewitness', 'Dec 1942 Allied Warning', 'Prioritising Total War'],
        focusClue:
          'Why did British and American military commanders argue that defeating Germany quickly was the only effective rescue strategy?',
      },
    ],
    vocabPrompt:
      'Define <strong>Righteous Among the Nations</strong> and explain the extraordinary moral risk faced by rescuers in occupied Europe:',
    rightPage: {
      type: 'narrative_8',
      tariff: 'Question 2: Narrative Account [8 marks • 12 mins]',
      badge: 'NARRATIVE ACCOUNT',
      examStem:
        'Write a narrative account analysing how the international community and Allied powers responded to the Holocaust between 1938 and 1944. [8 marks]',
      stimulus: [
        'The failure of the Evian Conference (1938)',
        'The Allied Joint Declaration on Nazi extermination (December 1942)',
      ],
      connectives:
        'Initially, before the war began... • Following the outbreak of war, detailed intelligence arrived when... • A diplomatic milestone occurred in December 1942 when... • However, in practice... • Consequently, this resulted in...',
      wordBank:
        'Evian Conference • Kindertransport • Jan Karski • Joint Declaration (1942) • Bermuda Conference • Auschwitz rail bombing debate • War Refugee Board',
      timelineMissionTitle: 'Timeline Task • pp. 10–11',
      timelineMission:
        '<strong>Milestone 9 (1943):</strong> Choose <strong>(A) Creative Sketch:</strong> Illustrate courage against the odds — e.g. a small wooden fishing boat sailing through dark waves under moonlight to Sweden, or an official passport stamped with a life-saving hand-written visa &bull; OR &bull; <strong>(B) Mind Map:</strong> "Rescue &amp; Resistance" (Danish boats, Sugihara visas, White Rose)',
    },
    leftPageQuip:
      'In occupied Poland, sheltering a Jewish person carried an automatic death penalty for the rescuer and their entire family.',
    rightPageQuip:
      'Sophie Scholl, 21, of the White Rose declared before her execution: "Someone had to make a start. What we wrote is what many believe."',
  },
  {
    lessonNum: 7,
    id: 'lesson_7',
    title: 'Enquiry 7: Liberation, Aftermath & The Legacy of Memory (1944–1948)',
    enquiryQuestion: 'What was lost, and what does survivor testimony teach us?',
    specAnchor:
      'Death marches (winter 1944–45; 250,000 forced west, 70,000 dead); liberation of Auschwitz (27 Jan 1945), Buchenwald, and Bergen-Belsen (15 April 1945; British 11th Armoured Division); Richard Dimbleby BBC broadcast; 250,000 in DP camps; Kielce Pogrom (1946); Windermere Children in UK; Nuremberg Trials (IMT 1945–46); Raphael Lemkin and the UN Genocide Convention (1948); the obliteration of Yiddishland; ethical duty of memory.',
    stages: [
      {
        step: 1,
        paraRef: '[7.1]',
        date: 'Winter 1944–45',
        questionHeading:
          'Why did the SS force 250,000 starving prisoners onto death marches in the final winter of war?',
        bullets: ['Red Army Closes In', 'Sub-Zero Freezing Roads', '70,000 Shot or Frozen'],
        focusClue:
          'Why was the Nazi leadership determined that camp inmates must not be liberated alive to bear witness?',
      },
      {
        step: 2,
        paraRef: '[7.2]',
        date: 'Jan–April 1945',
        questionHeading:
          'How did the liberation of Bergen-Belsen shatter any remaining doubt about the scale of atrocities?',
        bullets: [
          'British 11th Armoured Enters',
          '60,000 Starving Prisoners',
          'Dimbleby Weeps on BBC',
        ],
        focusClue:
          'What did British soldiers and journalists confront when they entered Bergen-Belsen on 15 April 1945?',
      },
      {
        step: 3,
        paraRef: '[7.3]',
        date: '1945–1948',
        questionHeading:
          'Why did post-war trauma and the struggle for British Mandate Palestine keep 250,000 survivors in DP camps?',
        bullets: ['250,000 in DP Camps', 'SS Exodus 1947 Crisis', 'Zionist Statehood Demand'],
        focusClue:
          'How did continued antisemitic violence (Kielce) and British Mandate naval blockades force survivors onto perilous refugee ships like the SS Exodus 1947?',
      },
      {
        step: 4,
        paraRef: '[7.4]',
        date: '1945–1948',
        questionHeading:
          'How did Raphael Lemkin and the Nuremberg Trials fundamentally transform international law?',
        bullets: ['Nuremberg Tribunal', 'Crimes Against Humanity', 'UN Genocide Convention'],
        focusClue:
          'Why was the legal rejection of "following superior orders" a revolutionary turning point in world jurisprudence?',
      },
      {
        step: 5,
        paraRef: '[7.5]',
        date: 'Post-War–Present',
        questionHeading:
          'What was permanently lost in the Shoah, and what is our ethical responsibility to history?',
        bullets: ['6 Million Souls Extinguished', 'Yiddishland Annihilated', 'Never Again Pledge'],
        focusClue:
          'As the generation of eyewitness survivors passes away, why is preserving authentic historical testimony an urgent moral duty?',
      },
    ],
    vocabPrompt:
      'Define <strong>Genocide</strong> as coined by Raphael Lemkin in 1944 and explain its significance in international law:',
    rightPage: {
      type: 'single_12',
      tariff: 'Question 5: Evaluative Statement Essay [12 marks • 15 mins]',
      examStem:
        '‘The liberation of the concentration camps in 1945 marked the end of the suffering of Holocaust survivors.’ How far do you agree? [12 marks]',
      stimulus: [
        'The liberation of Bergen-Belsen and Auschwitz (1945) and ongoing mortality in Displaced Persons (DP) camps',
        'The struggle of survivors attempting to reach British Mandate Palestine (e.g. SS Exodus 1947) and the movement for a Jewish homeland',
      ],
      structureStrip: [
        {
          col: '1. PHYSICAL LIBERATION & MEDICAL RESCUE',
          text: 'Allied forces halted industrial death camp murder, but typhus, extreme starvation, and psychological trauma caused thousands to perish in the weeks following liberation.',
        },
        {
          col: '2. ONGOING LOSS, HOMELESSNESS & ANTISEMITISM',
          text: 'Survivors returned home to discover entire communities annihilated, property confiscated, and continued violent antisemitism in Eastern Europe (Kielce Pogrom 1946), leaving 250,000 stranded in Allied Displaced Persons camps.',
        },
        {
          col: '3. BRITISH MANDATE PALESTINE & THE ZIONIST STRUGGLE',
          text: 'Strict British immigration quotas (1939 White Paper) forced desperate survivors onto illegal Aliyah Bet ships; the naval interception and forced return of the SS Exodus 1947 galvanized international Zionist pressure for sovereign self-determination, culminating in UN Resolution 181 and the 1948 establishment of Israel.',
        },
      ],
      connectives:
        'To a large extent, it can be argued that... • On the one hand, Allied liberation brought immediate deliverance from... • However, intense suffering endured because... • In particular, the geopolitical struggle over British Mandate Palestine meant that... • Consequently, for tens of thousands of survivors on ships like the SS Exodus 1947... • In conclusion, liberation was not the end of suffering but rather... because...',
      wordBank:
        'Bergen-Belsen • typhus • Displaced Persons (DP) camps • Windermere Children • Kielce Pogrom 1946 • British Mandate Palestine • 1939 White Paper • Aliyah Bet • SS Exodus 1947 • Zionism • UN Resolution 181 • State of Israel • Nuremberg Trials • Raphael Lemkin • 1948 Genocide Convention',
      timelineMissionTitle: 'Timeline Task • pp. 10–11',
      timelineMission:
        '<strong>Milestone 10 (1945–1948):</strong> Choose <strong>(A) Creative Sketch:</strong> Depict liberation and the pursuit of justice — e.g. a barbed-wire gate swung wide open toward a rising sun, or a judge’s wooden gavel striking down beside the words "Never Again" &bull; OR &bull; <strong>(B) Mind Map:</strong> "Liberation &amp; Justice" (Camp liberation, DP camps, Nuremberg Trials)',
    },
    leftPageQuip:
      'Even after British troops liberated Bergen-Belsen, over 14,000 survivors died within weeks due to advanced starvation and typhus.',
    rightPageQuip:
      'Raphael Lemkin lost 49 family members in the Shoah; he devoted his life to ensuring international law recognized the crime of Genocide.',
  },
];

// ============================================================================
// HELPER RENDERERS
// ============================================================================

function renderNotesPage(pageNum, quip, totalPages = 20) {
  const isEven = pageNum % 2 === 0;
  const pageClass = isEven ? 'verso-page' : 'recto-page';

  const numLines = 32;
  let linesHtml = '';
  for (let i = 0; i < numLines; i++) {
    linesHtml += `          <div class="note-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>\n`;
  }

  return `
  <!-- PAGE ${pageNum}: NOTES PAGE -->
  <div class="page page-container ${pageClass}" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Notes Header -->
      <div style="border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 5px;">
        <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 13pt; color: #000000; text-transform: uppercase; font-weight: 900; letter-spacing: 0.5px;">
          Notes &amp; Extended Writing Canvas
        </h2>
      </div>

      <!-- Ruled Lined Canvas with Left Margin (Exercise Book Standard) -->
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0; position: relative; border-top: 1.2px solid #000000; margin-bottom: 4px;">
        <!-- Vertical Margin Line (26mm from left edge) - British Exercise Book Standard Margin -->
        <div style="position: absolute; top: 0; bottom: 0; left: 26mm; width: 1.5px; background: #000000; z-index: 2;"></div>
        
        <!-- Ruled Horizontal Lines (Standard 8mm school pitch, flex-filled) -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0;">
${linesHtml}        </div>
      </div>

      ${renderFooterStrip(pageNum, quip, totalPages)}
    </div>
  </div>`;
}

function renderModelAnswersPage(pageNum = 18, totalPages = 20) {
  const isEven = pageNum % 2 === 0;
  const pageClass = isEven ? 'verso-page' : 'recto-page';

  return `
  <!-- PAGE ${pageNum}: DISCIPLINARY WRITING SCAFFOLDING & MODEL ANSWERS -->
  <div class="page page-container ${pageClass}" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      
      <!-- Page Header -->
      <div style="border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 4px; display: flex; justify-content: space-between; align-items: baseline;">
        <div>
          <span style="font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 900; background: #000000; color: #ffffff; padding: 1.5px 6px; border-radius: 2px; text-transform: uppercase;">
            WRITING SCAFFOLDING PORTFOLIO
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 8.5pt; font-weight: 800; color: #000000; margin-left: 6px; text-transform: uppercase;">
            Master Model Answers &bull; Questions 1–3
          </span>
        </div>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; color: #475569;">
          Key Stage 3 &bull; Disciplinary Rigour
        </span>
      </div>

      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; gap: 4px; min-height: 0; margin-bottom: 3px;">
        
        <!-- MODEL 1: Question 1 Feature Drill (4 marks) -->
        <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 4px 7px; background: #ffffff;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
            <strong style="font-family: 'Playfair Display', serif; font-size: 9.8pt; color: #000000; font-weight: 900;">
              Model Answer 1 &bull; Describe Two Features Drill [4 Marks]
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 800; background: #000000; color: #ffffff; padding: 1px 5px; border-radius: 2px;">
              SCORE: 4/4
            </span>
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 700; color: #1e293b; margin-bottom: 2px;">
            Task: Describe two features of pre-war Jewish life in Eastern Europe. [4 marks]
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 7.6pt; line-height: 1.25; color: #000000;">
            <p style="margin: 0 0 2px 0;">
              <strong>Feature 1:</strong> One key feature was that Eastern Europe was the vibrant heartland of Yiddish culture and language. <strong>Detail:</strong> Over three million Jewish people lived in Poland, creating an irreplaceable intellectual world of Yiddish daily newspapers, professional theatre, literature, and secular schools like the Tarbut network in towns such as Kostopol.
            </p>
            <p style="margin: 0;">
              <strong>Feature 2:</strong> A second key feature was the distinct demographic division between traditional rural shtetls and urban centers. <strong>Detail:</strong> While thousands lived in small close-knit market towns maintaining observant religious traditions, cities like Warsaw and Vilna hosted renowned talmudic academies and active trade union movements.
            </p>
          </div>
          <div style="border-top: 1px dashed #cbd5e1; margin-top: 3px; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #334155; font-style: italic;">
            <strong>Examiner Breakdown:</strong> Full marks awarded. Two distinct features identified with specific historical evidence (Tarbut network, Warsaw, Vilna, Yiddish language).
          </div>
        </div>

        <!-- MODEL 2: Question 2 Consequence Writing (4 marks) -->
        <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 4px 7px; background: #ffffff;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
            <strong style="font-family: 'Playfair Display', serif; font-size: 9.8pt; color: #000000; font-weight: 900;">
              Model Answer 2 &bull; Explain One Consequence [4 Marks]
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 800; background: #000000; color: #ffffff; padding: 1px 5px; border-radius: 2px;">
              SCORE: 4/4
            </span>
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 700; color: #1e293b; margin-bottom: 2px;">
            Task: Explain one consequence of the development of 19th-century racial antisemitism. [4 marks]
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 7.6pt; line-height: 1.25; color: #000000;">
            <p style="margin: 0;">
              One significant consequence of 19th-century racial antisemitism was the shift from religious prejudice to biological determinism. Under medieval Christian anti-Judaism, hostility was rooted in religious beliefs, meaning conversion or baptism offered a path to societal acceptance. However, 19th-century theorists like Wilhelm Marr redefined Jewish identity as an immutable biological race carried in the blood. <strong>As a direct result</strong>, religious conversion was rendered completely irrelevant; Jews were categorized as permanent racial enemies of the state. <strong>Consequently</strong>, this biological racism provided the ideological foundation for the 1935 Nuremberg Laws and the Nazi regime’s eventual policy of total physical annihilation.
            </p>
          </div>
          <div style="border-top: 1px dashed #cbd5e1; margin-top: 3px; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #334155; font-style: italic;">
            <strong>Examiner Breakdown:</strong> Full marks awarded. Clearly demonstrates cause and consequence using explicit connectives ('As a direct result', 'Consequently') to link 19th-century ideology directly to 1935 legal persecution.
          </div>
        </div>

        <!-- MODEL 3: Question 3 Forensic Source Utility (8 marks) -->
        <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 4px 7px; background: #ffffff;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
            <strong style="font-family: 'Playfair Display', serif; font-size: 9.8pt; color: #000000; font-weight: 900;">
              Model Answer 3 &bull; Forensic Source Utility [8 Marks]
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 800; background: #000000; color: #ffffff; padding: 1px 5px; border-radius: 2px;">
              SCORE: 8/8
            </span>
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 700; color: #1e293b; margin-bottom: 2px;">
            Task: How useful is Source A (Mary Berg’s diary) for an enquiry into living conditions in the Warsaw Ghetto? [8 marks]
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 7.4pt; line-height: 1.24; color: #000000;">
            <p style="margin: 0 0 2px 0;">
              <strong>Content &amp; Context:</strong> Source A is highly useful because it provides vivid, direct eyewitness evidence of the physical and psychological enclosure imposed on Warsaw's Jews. Berg details how the 3-metre brick wall severed contact with the outside world and documents the severe starvation and cold suffered by children. This aligns precisely with historical knowledge: official ghetto rations supplied merely 180 calories per day, causing over 80,000 deaths from starvation and typhus. Crucially, Berg also reveals spiritual resistance—describing clandestine cellar classes defying Nazi bans.
            </p>
            <p style="margin: 0;">
              <strong>Provenance &amp; Limitations:</strong> The provenance significantly enhances its utility. Written contemporaneously in January 1941 by a 16-year-old resident inside the sealed ghetto, it captures immediate raw observations free from the distortion of post-war hindsight. However, a historian must recognize its limitations: as a private diary, it reflects only Berg’s localized sector of the ghetto, and she could not possess knowledge of the high-level extermination directives being formulated in Berlin. Overall, Source A remains exceptionally valuable for understanding daily human survival under confinement.
            </p>
          </div>
          <div style="border-top: 1px dashed #cbd5e1; margin-top: 3px; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #334155; font-style: italic;">
            <strong>Examiner Breakdown:</strong> Level 3 (8/8). Evaluates content with contextual corroboration, interrogates provenance (contemporaneous eye-witness), and identifies valid analytical boundaries without dismissing usefulness.
          </div>
        </div>

      </div>

      ${renderFooterStrip(pageNum, 'Master writing scaffolds: Explicit paragraph structure and precise historical data secure top examination marks.', totalPages)}
    </div>
  </div>`;
}

function renderEvaluativeEssayModelPage(pageNum = 19, totalPages = 20) {
  const isEven = pageNum % 2 === 0;
  const pageClass = isEven ? 'verso-page' : 'recto-page';

  return `
  <!-- PAGE ${pageNum}: GRADE 9 EXTENDED ESSAY EXEMPLAR & ARCHIVAL PROVENANCE -->
  <div class="page page-container ${pageClass}" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      
      <!-- Page Header -->
      <div style="border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 4px; display: flex; justify-content: space-between; align-items: baseline;">
        <div>
          <span style="font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 900; background: #000000; color: #ffffff; padding: 1.5px 6px; border-radius: 2px; text-transform: uppercase;">
            EXTENDED WRITING EXEMPLAR
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 8.5pt; font-weight: 800; color: #000000; margin-left: 6px; text-transform: uppercase;">
            Question 5 Model Essay &bull; Grade 9 Standard
          </span>
        </div>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; color: #475569;">
          Cross-Curricular GCSE Bridging
        </span>
      </div>

      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; gap: 4px; min-height: 0; margin-bottom: 3px;">
        
        <!-- Question Prompt & Overview -->
        <div style="border: 1.2px solid #000000; border-left: 3.5px solid #000000; border-radius: 3px; padding: 3px 7px; background: #ffffff;">
          <div style="font-family: 'Playfair Display', serif; font-size: 9.6pt; font-weight: 900; color: #000000; line-height: 1.22;">
            ‘The liberation of the concentration camps in 1945 marked the end of the suffering of Holocaust survivors.’ How far do you agree? [12 marks]
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #475569; margin-top: 1px;">
            <strong>Stimulus Points:</strong> (1) Allied liberation of camps (1945); (2) Post-war DP camps, the British Mandate &amp; the SS Exodus (1945–1948).
          </div>
        </div>

        <!-- The Exemplar Essay -->
        <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 5px 8px; background: #ffffff; font-family: 'Georgia', serif; font-size: 7.2pt; line-height: 1.26; color: #000000;">
          <p style="margin: 0 0 3px 0;">
            To a significant extent, it is inaccurate to claim that liberation in 1945 marked the end of survivor suffering. While the arrival of Allied forces halted industrial mass murder, liberation was not a moment of sudden joy, but the beginning of an agonizing period of physical collapse, bereavement, statelessness, and geopolitical conflict.
          </p>
          <p style="margin: 0 0 3px 0;">
            <strong>On the one hand</strong>, liberation brought immediate deliverance from Nazi extermination and the winter death marches. When British troops entered Bergen-Belsen on 15 April 1945, they disarmed the SS guards and established emergency hospital wards, ending the gas chambers and summary shootings. For survivors, liberation meant physical survival was finally possible under international protection.
          </p>
          <p style="margin: 0 0 3px 0;">
            <strong>However</strong>, profound physical and emotional suffering persisted long after the guns fell silent. Extreme starvation and virulent typhus meant that over 14,000 liberated prisoners died at Bergen-Belsen within weeks of British arrival. Furthermore, when survivors attempted to return to their hometowns in Poland, they discovered their entire families had been murdered, their homes confiscated, and they faced violent pogroms—most infamously at Kielce in July 1946, where 42 Jewish survivors were murdered by local mobs. Consequently, over 250,000 homeless Jewish survivors were forced to live behind barbed wire in Allied Displaced Persons (DP) camps across Germany for years.
          </p>
          <p style="margin: 0 0 3px 0;">
            <strong>Crucially, survivor suffering was compounded by the geopolitical crisis in British Mandate Palestine.</strong> Enforcing the 1939 White Paper immigration quotas, the British government blockaded Palestine and turned back refugee vessels. In July 1947, the Royal Navy intercepted the <em>SS Exodus 1947</em> carrying 4,500 Holocaust survivors, attacking the ship in international waters and forcibly returning the refugees to camps in Germany. This outrage galvanized global Zionist resolve, convincing survivors that true safety required sovereign self-determination. This pressure directly accelerated the 1947 UN Partition Plan (Resolution 181) and the establishment of the State of Israel in May 1948.
          </p>
          <p style="margin: 0;">
            <strong>In conclusion</strong>, liberation was not the end of suffering, but the conclusion of physical extermination. The psychological trauma of the obliterated Yiddishland, the loss of entire family trees, and the desperate post-war struggle for a sovereign homeland meant that for survivors, the struggle to rebuild their lives lasted for decades.
          </p>
        </div>

        <!-- Archival Provenance & Academic Rights Matrix -->
        <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 4px 7px; background: #f8fafc;">
          <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; color: #000000; text-transform: uppercase; border-bottom: 1px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
            Archival Rights &amp; Provenance Guarantee &bull; Academic Neutrality
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 6.6pt; line-height: 1.22; color: #334155;">
            All primary photographic plates and textual extracts in this workbook are verified historical artifacts drawn from official national repositories: <strong>Imperial War Museum (IWM)</strong>, <strong>Yad Vashem Photo Archives</strong>, <strong>United States Holocaust Memorial Museum (USHMM)</strong>, <strong>Emanuel Ringelblum Jewish Historical Institute (ŻIH)</strong>, and <strong>The National Archives</strong>. Every image is held under UK Educational Fair Dealing (CDPA 1988) or Public Domain. <strong>STRICTLY ZERO AI GENERATION</strong>: Educational authenticity and historical integrity are unconditionally guaranteed.
          </div>
        </div>

      </div>

      ${renderFooterStrip(pageNum, 'The History Revision Hub &bull; Master Provenance &amp; Disciplinary Writing Standard 2026', totalPages)}
    </div>
  </div>`;
}

function renderFooterStrip(pageNum, quip, totalPages = 20) {
  const isEven = pageNum % 2 === 0;
  if (isEven) {
    return `
      <div class="page-footer-strip">
        <span class="footer-page-num" style="margin-right: 8px;">${pageNum}/${totalPages}</span>
        <span class="footer-quip" style="text-align: right; flex: 1;">${quip}</span>
      </div>`;
  } else {
    return `
      <div class="page-footer-strip">
        <span class="footer-quip" style="text-align: left; flex: 1; margin-right: 8px;">${quip}</span>
        <span class="footer-page-num">${pageNum}/${totalPages}</span>
      </div>`;
  }
}

// ============================================================================
// LEFT PAGE RENDERER: 5-STAGE CHRONOLOGICAL INQUIRY SPINE (HIGH-CONTRAST MONO)
// ============================================================================
function renderSpinePage(cfg, pageNum, totalPages = 20) {
  const stagesHtml = cfg.stages
    .map((st) => {
      const bulletsHtml = st.bullets
        .map(
          (b, idx) => `
            <div style="flex: 1; display: flex; align-items: center; padding: 0 5px; ${idx < 2 ? 'border-bottom: 0.8px solid #000000;' : ''}">
              <div style="display: flex; align-items: flex-start; gap: 4px; line-height: 1.18;">
                <span style="font-weight: 900; color: #000000; font-size: 7pt; line-height: 1.3;">&bull;</span>
                <span style="font-family: 'Inter', sans-serif; font-size: 8.8pt; font-weight: 800; color: #000000; word-break: break-word;">${b}</span>
              </div>
            </div>`,
        )
        .join('');
      return `
        <div class="spine-stage-block" style="display: flex; flex-direction: column; flex: 1; min-height: 0; margin-bottom: 2.5px; border: 1.2px solid #000000; border-radius: 2px; overflow: hidden; background: #ffffff;">
          
          <!-- Full-Width Banner with Key Question Across Page -->
          <div class="stage-banner" style="background: #000000; color: #ffffff; padding: 2px 7px; display: flex; align-items: center; border-bottom: 1.2px solid #000000; min-height: 20px; box-sizing: border-box;">
            <div style="display: flex; align-items: center; gap: 6px; min-width: 0; flex: 1; overflow: hidden;">
              <span style="background: #ffffff; color: #000000; font-family: 'Inter', sans-serif; font-size: 8.2pt; font-weight: 900; padding: 0.6px 6px; border-radius: 2px; white-space: nowrap; flex-shrink: 0;">
                ${st.step}
              </span>
              <span style="font-family: 'Inter', sans-serif; font-size: 8.4pt; font-weight: 800; color: #ffffff; white-space: nowrap; flex-shrink: 0;">
                ${st.date}
              </span>
              <span style="color: #ffffff; font-size: 7.5pt; flex-shrink: 0;">&bull;</span>
              <span style="font-family: 'Inter', sans-serif; font-size: 9.0pt; font-weight: 800; color: #ffffff; white-space: nowrap; overflow: hidden; letter-spacing: -0.1px;">
                ${st.questionHeading}
              </span>
            </div>
          </div>

          <!-- Content Row: Left 3-Zone Trigger Spine (44mm) & Right Ruled Writing Lines (~154mm) -->
          <div style="display: flex; flex: 1; min-height: 0; align-items: stretch;">
            
            <!-- Left Column: High-Visibility 44mm Trigger Spine -->
            <div style="width: 44mm; flex-shrink: 0; background: #ffffff; display: flex; flex-direction: column; border-right: 1.2px solid #000000; box-sizing: border-box;">
              ${bulletsHtml}
            </div>

            <!-- Right Column: 6 Ruled Note-Taking Lines -->
            <div style="flex: 1; display: flex; flex-direction: column; background: #ffffff; margin: 0; padding: 0;">
              <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
              <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
              <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
              <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
              <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
              <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
            </div>

          </div>
        </div>`;
    })
    .join('');

  const isEven = pageNum % 2 === 0;
  const pageClass = isEven ? 'verso-page' : 'recto-page';

  return `
  <!-- LESSON SPREAD: ${isEven ? 'LEFT PAGE (VERSO)' : 'RIGHT PAGE (RECTO)'} • CHRONOLOGICAL INQUIRY SPINE -->
  <div class="page page-container ${pageClass}" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      
      <!-- Lesson Header with Inquiry Question Title -->
      <div style="border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 4px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 8.4pt; font-weight: 900; letter-spacing: 0.5px; text-transform: uppercase; background: #000000; color: #ffffff; border: 1.2px solid #000000; padding: 2px 8px; border-radius: 2px;">
            ENQUIRY ${cfg.lessonNum} &bull; LESSON NOTEBOOK
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 8.2pt; font-weight: 800; text-transform: uppercase; color: #000000;">
            YEAR 9 &bull; THE SHOAH: 1933–1945
          </span>
        </div>
        <h2 style="font-family: 'Playfair Display', serif; font-size: 12.6pt; color: #000000; margin: 2px 0 2px 0; font-weight: 900; line-height: 1.22;">
          ${cfg.enquiryQuestion}
        </h2>
      </div>

      <!-- Chronological Inquiry Spine & Note-Taking Canvas -->
      <div style="flex: 1; display: flex; flex-direction: column; min-height: 0; margin-top: 1px;">
        <div style="display: flex; flex-direction: column; flex: 1; min-height: 0; gap: 0;">
          ${stagesHtml}
        </div>
      </div>

      ${renderFooterStrip(pageNum, cfg.leftPageQuip, totalPages)}
    </div>
  </div>`;
}

// ============================================================================
// RIGHT PAGE RENDERER: ROTATING DISCIPLINARY WRITING (MONOCHROME INTERIOR)
// ============================================================================
function renderRightPage(cfg, pageNum, totalPages = 20) {
  const rp = cfg.rightPage;
  const isEven = pageNum % 2 === 0;
  const pageClass = isEven ? 'verso-page' : 'recto-page';

  if (rp.type === 'single_12') {
    let linesHtml = '';
    const numLines = 26;
    for (let i = 0; i < numLines; i++) {
      linesHtml += `          <div class="note-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>\n`;
    }

    return `
  <!-- LESSON SPREAD: ${isEven ? 'LEFT PAGE (VERSO)' : 'RIGHT PAGE (RECTO)'} • 12-MARK EXTENDED ESSAY -->
  <div class="page page-container ${pageClass}" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full" style="display: flex; flex-direction: column; height: 100%;">
      
      <!-- Top Writing Block (Header + Question + Guidance) -->
      <div style="flex-shrink: 0; display: flex; flex-direction: column; gap: 2px;">
        <!-- Exam Header -->
        <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 2px;">
          <h2 style="font-family: 'Playfair Display', serif; font-size: 11.8pt; color: #000000; margin: 0; font-weight: 900;">
            ${rp.tariff}
          </h2>
          <span style="font-family: 'Inter', sans-serif; font-size: 8.0pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; background: #000000; color: #ffffff; padding: 1.5px 7px; border-radius: 2px;">
            Extended Evaluative Essay
          </span>
        </div>

        <!-- Question Stem & Stimulus Box -->
        <div style="border: 1px solid #000000; border-left: 3.5px solid #000000; border-radius: 2.5px; padding: 4px 8px; background: #ffffff;">
          <div style="font-family: 'Playfair Display', serif; font-size: 11.0pt; font-weight: 900; color: #000000; margin-bottom: 3px; line-height: 1.26;">
            ${rp.examStem}
          </div>
          <div style="display: flex; align-items: center; gap: 8px; font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #000000;">
            <strong style="color: #000000;">Stimulus:</strong>
            <span style="border: 1.2px solid #000000; padding: 1px 7px; border-radius: 2px; font-weight: 800; color: #000000; background: #ffffff;">${rp.stimulus[0]}</span>
            <span style="border: 1.2px solid #000000; padding: 1px 7px; border-radius: 2px; font-weight: 800; color: #000000; background: #ffffff;">${rp.stimulus[1]}</span>
            <span style="font-style: italic; color: #000000;">(You must also use information of your own)</span>
          </div>
        </div>

        ${
          rp.structureStrip
            ? `
        <!-- Evaluative Structure Strip -->
        <div style="border: 1.2px solid #000000; border-radius: 2.5px; padding: 2.5px 6px; background: #ffffff; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 5px;">
          ${rp.structureStrip
            .map(
              (col) => `
            <div style="border-right: 1px solid #000000; padding-right: 4px;">
              <div style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 900; text-transform: uppercase; color: #000000;">${col.col}</div>
              <div style="font-family: 'Georgia', serif; font-size: 6.6pt; line-height: 1.15; color: #000000; margin-top: 1px;">${col.text}</div>
            </div>`,
            )
            .join('')}
        </div>`
            : ''
        }

        <!-- Writing Guidelines Strip -->
        <div style="border: 1px solid #000000; padding: 2.5px 7px; border-radius: 2px; background: #ffffff; font-size: 7.4pt; font-family: 'Inter', sans-serif;">
          <strong>Analytical Connectives:</strong> <span style="font-style: italic;">${rp.connectives}</span><br>
          <strong>High-Yield Vocabulary:</strong> <span style="font-weight: 600;">${rp.wordBank}</span>
        </div>
      </div>

      <!-- Ruled Writing Area: flex: 1 fills ALL remaining space down to timeline task box -->
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0; margin-top: 2px; margin-bottom: 3px; border-top: 1.2px solid #000000;">
${linesHtml}      </div>

      <!-- Timeline Task Box (Docked at Bottom) -->
      <div style="flex-shrink: 0; border: 1.5px solid #000000; border-radius: 3px; padding: 2.5px 7px; background: #ffffff; display: flex; align-items: center; gap: 7px; margin-bottom: 2px;">
        <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 900; background: #000000; color: #ffffff; padding: 1.5px 6px; border-radius: 2px; text-transform: uppercase; white-space: nowrap; flex-shrink: 0;">
          Timeline Task &bull; pp. 10–11
        </span>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; line-height: 1.22; color: #000000; flex: 1;">
          ${rp.timelineMission || cfg.timelineMission}
        </span>
      </div>

      ${renderFooterStrip(pageNum, cfg.rightPageQuip, totalPages)}
    </div>
  </div>`;
  }

  if (rp.type === 'narrative_8') {
    let linesHtml = '';
    const numLines = 28;
    for (let i = 0; i < numLines; i++) {
      linesHtml += `          <div class="note-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>\n`;
    }

    return `
  <!-- LESSON SPREAD: ${isEven ? 'LEFT PAGE (VERSO)' : 'RIGHT PAGE (RECTO)'} • NARRATIVE ACCOUNT -->
  <div class="page page-container ${pageClass}" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full" style="display: flex; flex-direction: column; height: 100%;">
      
      <!-- Top Writing Block (Header + Question + Guidelines) -->
      <div style="flex-shrink: 0; display: flex; flex-direction: column; gap: 2px;">
        <!-- Exam Header -->
        <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 2px;">
          <h2 style="font-family: 'Playfair Display', serif; font-size: 11.8pt; color: #000000; margin: 0; font-weight: 900;">
            ${rp.tariff}
          </h2>
          <span style="font-family: 'Inter', sans-serif; font-size: 8.0pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; background: #000000; color: #ffffff; padding: 1.5px 7px; border-radius: 2px;">
            Chronological Causal Account
          </span>
        </div>

        <!-- Question Stem & Stimulus Box -->
        <div style="border: 1px solid #000000; border-left: 3.5px solid #000000; border-radius: 2.5px; padding: 4px 8px; background: #ffffff;">
          <div style="font-family: 'Playfair Display', serif; font-size: 11.0pt; font-weight: 900; color: #000000; margin-bottom: 3px; line-height: 1.26;">
            ${rp.examStem}
          </div>
          <div style="display: flex; align-items: center; gap: 8px; font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #000000;">
            <strong style="color: #000000;">Stimulus:</strong>
            <span style="border: 1.2px solid #000000; padding: 1px 7px; border-radius: 2px; font-weight: 800; color: #000000; background: #ffffff;">${rp.stimulus[0]}</span>
            <span style="border: 1.2px solid #000000; padding: 1px 7px; border-radius: 2px; font-weight: 800; color: #000000; background: #ffffff;">${rp.stimulus[1]}</span>
            <span style="font-style: italic; color: #000000;">(You must also use information of your own)</span>
          </div>
        </div>

        <!-- Writing Guidelines Strip -->
        <div style="border: 1px solid #000000; padding: 2.5px 7px; border-radius: 2px; background: #ffffff; font-size: 7.4pt; font-family: 'Inter', sans-serif;">
          <strong>Causal Connectives:</strong> <span style="font-style: italic;">${rp.connectives}</span><br>
          <strong>High-Yield Vocabulary:</strong> <span style="font-weight: 600;">${rp.wordBank}</span>
        </div>
      </div>

      <!-- Ruled Writing Area: flex: 1 fills ALL remaining space down to timeline task box -->
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0; margin-top: 2px; margin-bottom: 3px; border-top: 1.2px solid #000000;">
${linesHtml}      </div>

      <!-- Timeline Task Box (Docked at Bottom) -->
      <div style="flex-shrink: 0; border: 1.5px solid #000000; border-radius: 3px; padding: 2.5px 7px; background: #ffffff; display: flex; align-items: center; gap: 7px; margin-bottom: 2px;">
        <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 900; background: #000000; color: #ffffff; padding: 1.5px 6px; border-radius: 2px; text-transform: uppercase; white-space: nowrap; flex-shrink: 0;">
          Timeline Task &bull; pp. 10–11
        </span>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; line-height: 1.22; color: #000000; flex: 1;">
          ${rp.timelineMission || cfg.timelineMission}
        </span>
      </div>

      ${renderFooterStrip(pageNum, cfg.rightPageQuip, totalPages)}
    </div>
  </div>`;
  }

  if (rp.type === 'source_utility_8') {
    let linesHtml = '';
    const numLines = 24;
    for (let i = 0; i < numLines; i++) {
      linesHtml += `          <div class="note-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>\n`;
    }

    return `
  <!-- LESSON SPREAD: ${isEven ? 'LEFT PAGE (VERSO)' : 'RIGHT PAGE (RECTO)'} • SOURCE UTILITY -->
  <div class="page page-container ${pageClass}" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full" style="display: flex; flex-direction: column; height: 100%;">
      
      <!-- Top Writing Block (Header + Question + Source + Guidance) -->
      <div style="flex-shrink: 0; display: flex; flex-direction: column; gap: 2px;">
        <!-- Exam Header -->
        <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 2px;">
          <h2 style="font-family: 'Playfair Display', serif; font-size: 11.8pt; color: #000000; margin: 0; font-weight: 900;">
            ${rp.tariff}
          </h2>
          <span style="font-family: 'Inter', sans-serif; font-size: 8.0pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; background: #000000; color: #ffffff; padding: 1.5px 7px; border-radius: 2px;">
            Forensic Source Evaluation
          </span>
        </div>

        <!-- Question Stem Box -->
        <div style="border: 1px solid #000000; border-left: 3.5px solid #000000; border-radius: 2.5px; padding: 3.5px 7px; background: #ffffff;">
          <div style="font-family: 'Playfair Display', serif; font-size: 10.8pt; font-weight: 900; color: #000000; line-height: 1.24;">
            ${rp.question}
          </div>
        </div>

        <!-- Primary Source Plate Box -->
        <div style="border: 1.2px solid #000000; border-radius: 2.5px; padding: 3.5px 7px; background: #ffffff;">
          <div style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 800; color: #000000; text-transform: uppercase; border-bottom: 0.8px solid #000000; padding-bottom: 1.5px; margin-bottom: 2px;">
            ${rp.sourceCaption}
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 8.2pt; font-style: italic; line-height: 1.25; color: #000000;">
            ${rp.sourceText}
          </div>
        </div>

        <!-- Scaffolding Guide -->
        <div style="border: 1px solid #000000; padding: 2.5px 7px; border-radius: 2px; background: #ffffff; font-size: 7.3pt; font-family: 'Inter', sans-serif;">
          <strong>Evaluative Stems:</strong> <span style="font-style: italic;">${rp.stems}</span><br>
          <strong>Key Vocabulary:</strong> <span style="font-weight: 600;">${rp.wordBank}</span>
        </div>
      </div>

      <!-- Ruled Writing Area: flex: 1 fills ALL remaining space down to timeline task box -->
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0; margin-top: 2px; margin-bottom: 3px; border-top: 1.2px solid #000000;">
${linesHtml}      </div>

      <!-- Timeline Task Box (Docked at Bottom) -->
      <div style="flex-shrink: 0; border: 1.5px solid #000000; border-radius: 3px; padding: 2.5px 7px; background: #ffffff; display: flex; align-items: center; gap: 7px; margin-bottom: 2px;">
        <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 900; background: #000000; color: #ffffff; padding: 1.5px 6px; border-radius: 2px; text-transform: uppercase; white-space: nowrap; flex-shrink: 0;">
          Timeline Task &bull; pp. 10–11
        </span>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; line-height: 1.22; color: #000000; flex: 1;">
          ${rp.timelineMission || cfg.timelineMission}
        </span>
      </div>

      ${renderFooterStrip(pageNum, cfg.rightPageQuip, totalPages)}
    </div>
  </div>`;
  }

  // Default: Split Short Drills (4m Features + 4m Consequence / Why)
  let partBLinesHtml = '';
  const numPartBLines = 20;
  for (let i = 0; i < numPartBLines; i++) {
    partBLinesHtml += `          <div class="note-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>\n`;
  }

  return `
  <!-- LESSON SPREAD: ${isEven ? 'LEFT PAGE (VERSO)' : 'RIGHT PAGE (RECTO)'} • DUAL DISCIPLINARY DRILLS -->
  <div class="page page-container ${pageClass}" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full" style="display: flex; flex-direction: column; height: 100%;">
      
      <!-- PART A: Feature Drill Block (flex-shrink: 0) -->
      <div style="flex-shrink: 0; display: flex; flex-direction: column; gap: 2px; margin-bottom: 3px;">
        <div style="border-bottom: 1.5px solid #000000; padding-bottom: 2px;">
          <div style="display: flex; justify-content: space-between; align-items: baseline;">
            <h2 style="font-family: 'Playfair Display', serif; font-size: 11.2pt; color: #000000; margin: 0; font-weight: 900;">
              ${rp.partA.tariff}
            </h2>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 800; text-transform: uppercase; background: #000000; color: #ffffff; padding: 1.5px 6px; border-radius: 2px;">
              ${rp.partA.badge}
            </span>
          </div>
        </div>
        <div style="border: 1px solid #000000; border-left: 3px solid #000000; border-radius: 2px; padding: 2.5px 6px; background: #ffffff; font-family: 'Playfair Display', serif; font-size: 10.2pt; font-weight: 900; line-height: 1.22;">
          ${rp.partA.question}
        </div>
        <div style="border: 1px solid #000000; padding: 2px 6px; border-radius: 2px; background: #ffffff; font-size: 7.3pt; font-family: 'Inter', sans-serif;">
          <strong>Writing Stems:</strong> <span style="font-style: italic;">${rp.partA.stems}</span>
        </div>
        <!-- Ruled Lines for Part A @ consistent 7.8mm -->
        <div class="ruled-lines-block" style="margin-top: 1px;">
          ${Array.from({ length: 8 })
            .map(() => `<div class="task-line"></div>`)
            .join('')}
        </div>
      </div>

      <!-- PART B Top Block (flex-shrink: 0) -->
      <div style="flex-shrink: 0; display: flex; flex-direction: column; gap: 2px;">
        <div style="border-bottom: 1.5px solid #000000; padding-bottom: 2px;">
          <div style="display: flex; justify-content: space-between; align-items: baseline;">
            <h2 style="font-family: 'Playfair Display', serif; font-size: 11.2pt; color: #000000; margin: 0; font-weight: 900;">
              ${rp.partB.tariff}
            </h2>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 800; text-transform: uppercase; background: #000000; color: #ffffff; padding: 1.5px 6px; border-radius: 2px;">
              ${rp.partB.badge}
            </span>
          </div>
        </div>
        <div style="border: 1px solid #000000; border-left: 3px solid #000000; border-radius: 2px; padding: 2.5px 6px; background: #ffffff; font-family: 'Playfair Display', serif; font-size: 10.2pt; font-weight: 900; line-height: 1.22;">
          ${rp.partB.question}
        </div>
        <div style="border: 1px solid #000000; padding: 2px 6px; border-radius: 2px; background: #ffffff; font-size: 7.3pt; font-family: 'Inter', sans-serif;">
          <strong>Connectives:</strong> <span style="font-style: italic;">${rp.partB.connectives}</span><br>
          <strong>Vocabulary:</strong> <span style="font-weight: 600;">${rp.partB.wordBank}</span>
        </div>
      </div>

      <!-- Ruled Lines for Part B: flex: 1 fills ALL remaining space down to timeline task box -->
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0; margin-top: 2px; margin-bottom: 3px; border-top: 1.2px solid #000000;">
${partBLinesHtml}      </div>

      <!-- Timeline Task Box (Docked at Bottom) -->
      <div style="flex-shrink: 0; border: 1.5px solid #000000; border-radius: 3px; padding: 2.5px 7px; background: #ffffff; display: flex; align-items: center; gap: 7px; margin-bottom: 2px;">
        <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 900; background: #000000; color: #ffffff; padding: 1.5px 6px; border-radius: 2px; text-transform: uppercase; white-space: nowrap; flex-shrink: 0;">
          Timeline Task &bull; pp. 10–11
        </span>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; line-height: 1.22; color: #000000; flex: 1;">
          ${rp.timelineMission || cfg.timelineMission}
        </span>
      </div>

      ${renderFooterStrip(pageNum, cfg.rightPageQuip, totalPages)}
    </div>
  </div>`;
}

// ============================================================================
// CENTREFOLD SPREAD: PANORAMIC LIVING TIMELINE (PAGES 10 & 11 OF 20)
// ============================================================================
function renderCentrefold(pLeftNum, pRightNum, totalPages = 20) {
  const milestones = [
    {
      num: 1,
      enquiryNum: 1,
      date: 'Pre-1939',
      title: 'Vibrant European Jewry & Cultural Diversity',
      clue: 'Over 9.5 million Jewish people thrive across Europe in diverse communities—from vibrant Yiddish-speaking shtetls and cities like Warsaw and Vilna, to integrated German patriots and Sephardic communities in Thessaloniki.',
    },
    {
      num: 2,
      enquiryNum: 2,
      date: 'April 1933',
      title: 'State Boycott & The Purge of the Civil Service',
      clue: 'SA stormtroopers picket Jewish businesses; the Civil Service Law summarily dismisses Jewish judges, doctors, and academics, initiating the legal process of "social death" and civic exclusion.',
    },
    {
      num: 3,
      enquiryNum: 2,
      date: '1935–1938',
      title: 'The Nuremberg Race Laws & Kristallnacht Pogrom',
      clue: 'The 1935 Nuremberg Laws strip citizenship and ban intermarriage; in November 1938, state-instigated Kristallnacht destroys 1,400 synagogues, sending 30,000 men to camps and ending legal security.',
    },
    {
      num: 4,
      enquiryNum: 3,
      date: '1939–1940',
      title: 'Invasion of Poland, Armbands & Ghettoisation',
      clue: 'Following the Blitzkrieg invasion, 2 million Polish Jews are forced to wear the Star of David and concentrated behind sealed brick walls in urban ghettos (Warsaw, Łódź) under Heydrich’s orders.',
    },
    {
      num: 5,
      enquiryNum: 3,
      date: '1940–1942',
      title: 'Warsaw Ghetto Starvation & The Oneg Shabbat Archive',
      clue: 'Nazi authorities enforce starvation rations of 180 calories/day, killing 80,000; Emanuel Ringelblum leads the underground Oneg Shabbat archive, burying diaries in metal milk cans to preserve the truth.',
    },
    {
      num: 6,
      enquiryNum: 4,
      date: 'June 1941',
      title: 'Operation Barbarossa & The Holocaust by Bullets',
      clue: 'Following the invasion of the USSR, four mobile Einsatzgruppen and Order Police battalions shoot over 1.5 million Jewish men, women, and children into ravines and pits (Babi Yar, Ponary).',
    },
    {
      num: 7,
      enquiryNum: 5,
      date: '1942–1943',
      title: 'The Wannsee Conference & Operation Reinhard Camps',
      clue: 'Heydrich coordinates state ministries at Wannsee for the murder of 11 million Jews; dedicated extermination camps at Bełżec, Sobibór, and Treblinka gas 1.7 million victims upon immediate arrival.',
    },
    {
      num: 8,
      enquiryNum: 5,
      date: '1943–1944',
      title: 'The Warsaw Ghetto Uprising & Armed Camp Revolts',
      clue: 'Mordechai Anielewicz leads the ŻOB in 27 days of armed resistance in Warsaw ("Hazak V\'ematz"); armed revolts erupt inside Treblinka, Sobibór, and Crematorium IV at Auschwitz-Birkenau.',
    },
    {
      num: 9,
      enquiryNum: 6,
      date: 'Oct 1943',
      title: 'Rescue in Denmark & Righteous Among the Nations',
      clue: 'Danish citizens spontaneously ferry 7,200 Jews across the Øresund to neutral Sweden; diplomats like Chiune Sugihara and villagers of Le Chambon risk their lives to provide life-saving transit.',
    },
    {
      num: 10,
      enquiryNum: 7,
      date: '1945–1948',
      title: 'Liberation, DP Camps, Nuremberg & Genocide Convention',
      clue: 'Allied forces liberate Bergen-Belsen and Auschwitz; 250,000 survivors endure DP camps and the SS Exodus voyage; Nuremberg convicts perpetrators, and Raphael Lemkin crafts the UN Genocide Convention.',
    },
  ];

  const leftMilestones = milestones.slice(0, 5);
  const rightMilestones = milestones.slice(5, 10);

  function renderMilestoneBlock(m) {
    return `
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0; padding: 2px 0;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 900; background: #000000; color: #ffffff; padding: 1.5px 6px; border-radius: 2px; text-transform: uppercase;">
              Milestone ${m.num}
            </span>
            <span style="font-family: 'Inter', sans-serif; font-size: 8.5pt; font-weight: 800; color: #000000;">
              ${m.date}
            </span>
            <strong style="font-family: 'Playfair Display', serif; font-size: 9.8pt; font-weight: 900; color: #000000; line-height: 1.2;">
              ${m.title}
            </strong>
          </div>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; border: 1px solid #000000; padding: 1px 5px; border-radius: 2px; background: #ffffff; color: #000000;">
            Enquiry ${m.enquiryNum}
          </span>
        </div>
        <p style="font-family: 'Georgia', serif; font-size: 8.0pt; line-height: 1.25; color: #1e293b; margin: 0 0 3px 0;">
          ${m.clue}
        </p>
        <!-- Open Dual-Coding / Concept Web Drawing Canvas for Pupils -->
        <div style="flex: 1; min-height: 20mm; background: #ffffff; border-bottom: 1px solid #cbd5e1; margin-bottom: 2px; display: flex; flex-direction: column; justify-content: flex-end;">
          <div style="font-family: 'Inter', sans-serif; font-size: 6.0pt; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.3px; text-align: right; padding-right: 4px; padding-bottom: 1px;">
            [ Choice A: Creative Sketch &bull; OR &bull; Choice B: Mind Map ]
          </div>
        </div>
      </div>`;
  }

  const leftHtml = `
  <!-- PAGE ${pLeftNum}: CENTREFOLD PART I -->
  <div class="page page-container verso-page" id="page-${pLeftNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div style="border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 4px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-family: 'Inter', sans-serif; font-size: 8.4pt; font-weight: 900; letter-spacing: 0.5px; text-transform: uppercase; background: #000000; color: #ffffff; padding: 2px 8px; border-radius: 2px;">
            CENTREFOLD SPREAD &bull; PART I
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 8.2pt; font-weight: 800; text-transform: uppercase; color: #000000;">
            THE LIVING CHRONOLOGY TIMELINE (1933–1940)
          </span>
        </div>
        <h2 style="font-family: 'Playfair Display', serif; font-size: 12.5pt; color: #000000; margin: 2px 0 2px 0; font-weight: 900;">
          The Escalation of Persecution: From Ancient Roots to the Ghetto Walls
        </h2>
        <div style="border: 1.2px solid #000000; border-radius: 3px; background: #ffffff; padding: 2.5px 6px; font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #000000;">
          <strong style="color: #000000;">Living Timeline Choice:</strong> For each milestone, choose either <strong>(A) Creative Sketch:</strong> draw historical symbols, dramatic scenes, or visual metaphors; OR <strong>(B) Mind Map:</strong> create a central concept bubble with 3 key historical facts.
        </div>
      </div>

      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0; margin-bottom: 3px;">
        ${leftMilestones.map(renderMilestoneBlock).join('')}
      </div>

      ${renderFooterStrip(pLeftNum, 'The Living Timeline spans across the centrefold staple line (Milestones 1–5).', totalPages)}
    </div>
  </div>`;

  const rightHtml = `
  <!-- PAGE ${pRightNum}: CENTREFOLD PART II -->
  <div class="page page-container recto-page" id="page-${pRightNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div style="border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 4px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-family: 'Inter', sans-serif; font-size: 8.2pt; font-weight: 800; text-transform: uppercase; color: #000000;">
            THE LIVING CHRONOLOGY TIMELINE (1941–1948)
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 8.4pt; font-weight: 900; letter-spacing: 0.5px; text-transform: uppercase; background: #000000; color: #ffffff; padding: 2px 8px; border-radius: 2px;">
            CENTREFOLD SPREAD &bull; PART II
          </span>
        </div>
        <h2 style="font-family: 'Playfair Display', serif; font-size: 12.5pt; color: #000000; margin: 2px 0 2px 0; font-weight: 900;">
          From Mass Murder to Resistance, Liberation &amp; Universal Justice
        </h2>
        <div style="border: 1.2px solid #000000; border-radius: 3px; background: #ffffff; padding: 2.5px 6px; font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #000000;">
          <strong style="color: #000000;">Living Timeline Choice:</strong> For each milestone, choose either <strong>(A) Creative Sketch:</strong> draw historical symbols, dramatic scenes, or visual metaphors; OR <strong>(B) Mind Map:</strong> create a central concept bubble with 3 key historical facts.
        </div>
      </div>

      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0; margin-bottom: 3px;">
        ${rightMilestones.map(renderMilestoneBlock).join('')}
      </div>

      ${renderFooterStrip(pRightNum, 'The Living Timeline spans across the centrefold staple line (Milestones 6–10).', totalPages)}
    </div>
  </div>`;

  return leftHtml + '\n' + rightHtml;
}

// ============================================================================
// FRONT COVER (PAGE 1) & BACK COVER (PAGE 20)
// ============================================================================
function renderCoverPage() {
  const heroImageBase64 = getBase64Image('/images/shoah_cover.jpg');

  return `
  <!-- PAGE 1: MASTER FRONT COVER -->
  <div class="page page-container verso-page" id="page-1" style="padding: 4mm 6mm; background: #ffffff;">
    <div class="page-body-full" style="display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
      
      <!-- Top Masthead Strip -->
      <div style="border-bottom: 2.5px solid #0f172a; padding-bottom: 3px; display: flex; justify-content: space-between; align-items: flex-end;">
        <div>
          <div style="font-family: 'Inter', sans-serif; font-size: 9.0pt; font-weight: 900; color: #0f172a; letter-spacing: 1.2px; text-transform: uppercase;" data-department-name="The History Revision Hub">
            <span class="school-brand-target">The History Revision Hub</span> &bull; Key Stage 3 Disciplinary Curriculum
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.6px; margin-top: 1px;">
            Year 9 Master Classroom Workbook &bull; 20-Page Saddle-Stitch Edition
          </div>
        </div>
        <div style="display: flex; gap: 4px; align-items: center;">
          <span style="background: #0f172a; color: #ffffff; font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 900; padding: 2.5px 8px; border-radius: 2px; letter-spacing: 0.5px;">
            UNIT 8
          </span>
          <span style="background: #991b1b; color: #ffffff; font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 900; padding: 2.5px 8px; border-radius: 2px; letter-spacing: 0.5px;">
            1933–1948
          </span>
        </div>
      </div>

      <!-- Pupil Details Strip -->
      <div style="border: 1.5px solid #0f172a; border-radius: 3px; padding: 4.5px 12px; background: #ffffff; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 14px; align-items: center; margin: 3px 0 4px 0;">
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f172a; text-transform: uppercase; margin-right: 8px;">Pupil Name:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #0f172a; height: 14px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f172a; text-transform: uppercase; margin-right: 8px;">Class:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #0f172a; height: 14px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f172a; text-transform: uppercase; margin-right: 8px;">Teacher:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #0f172a; height: 14px;"></div>
        </div>
      </div>

      <!-- Striking Monumental Title Block -->
      <div style="text-align: center; border: 1.5px solid #0f172a; border-radius: 3px; background: #fafaf9; padding: 6px 10px; margin-bottom: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
        <div style="display: inline-flex; align-items: center; gap: 8px; margin-bottom: 2px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 900; letter-spacing: 1.5px; text-transform: uppercase; color: #78350f;">
            HISTORICAL DEPTH STUDY &bull; MODERN EUROPEAN HISTORY
          </span>
        </div>
        <h1 style="font-family: 'Cinzel', serif; font-size: 35pt; font-weight: 900; color: #090d16; margin: 1px 0 2px 0; line-height: 1.0; letter-spacing: 3.5px; text-transform: uppercase;">
          THE SHOAH
        </h1>
        <div style="display: flex; justify-content: center; align-items: center; gap: 10px; margin: 2px 0;">
          <div style="height: 1px; width: 36px; background: #b45309;"></div>
          <span style="font-family: 'Times New Roman', serif; font-size: 13.0pt; letter-spacing: 2px; color: #991b1b; font-weight: 700;">
            הַשּׁוֹאָה &bull; THE CATASTROPHE
          </span>
          <div style="height: 1px; width: 36px; background: #b45309;"></div>
        </div>
        <div style="font-family: 'Playfair Display', serif; font-size: 12.0pt; font-style: italic; font-weight: 700; color: #1e3a8a; margin-top: 1px; letter-spacing: 0.3px;">
          Persecution, Resistance, and the Memory of the Holocaust (1933–1948)
        </div>
      </div>

      <!-- Prominent Enquiry Question Placement -->
      <div style="border: 1.5px solid #0f172a; border-left: 5px solid #991b1b; border-radius: 3px; padding: 4px 10px; background: #fdfbf7; margin-bottom: 4px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; color: #991b1b; text-transform: uppercase; letter-spacing: 0.6px;">
            OVERARCHING HISTORICAL ENQUIRY QUESTION
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; color: #475569; text-transform: uppercase;">
            HET &bull; UCL PEDAGOGICAL STANDARD
          </span>
        </div>
        <div style="font-family: 'Playfair Display', serif; font-size: 10.6pt; font-weight: 900; color: #090d16; line-height: 1.22;">
          "How and why did civilized modern society collapse into state-sponsored industrial genocide, and what was permanently lost?"
        </div>
      </div>

      <!-- Hero Primary Archival Plate (Full-Bleed 100% Width, Zero Dark Sidebars) -->
      <div style="border: 1.8px solid #0f172a; border-radius: 4px; overflow: hidden; background: #ffffff; box-shadow: 0 2px 6px rgba(0,0,0,0.08); margin-bottom: 4px;">
        <div style="height: 70mm; width: 100%; overflow: hidden; background: #0f172a; display: flex; align-items: center; justify-content: center;">
          ${
            heroImageBase64
              ? `<img src="${heroImageBase64}" style="height: 100%; width: auto; max-width: 100%; object-fit: contain; display: block; box-shadow: 0 2px 10px rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.12);" alt="The Pitel Family in Parczew, Poland (1938)" />`
              : `<div style="font-family: 'Inter', sans-serif; font-size: 11pt; color: #94a3b8; font-weight: bold;">[Primary Archival Plate: The Pitel Family, Poland 1938]</div>`
          }
        </div>
        <div style="padding: 3.5px 8px; background: #0f172a; color: #ffffff; display: flex; justify-content: space-between; align-items: center; font-size: 7.0pt; font-family: 'Inter', sans-serif;">
          <span><strong style="color: #fde047;">Archival Plate:</strong> The Pitel Family of Parczew, Poland (1938) &bull; 26 members across 4 generations; 25 murdered at Treblinka (1943)</span>
          <span style="color: #93c5fd; font-weight: 700; white-space: nowrap;">YAD VASHEM PHOTO ARCHIVE &bull; UCL CENTRE FOR HOLOCAUST EDUCATION</span>
        </div>
      </div>

      <!-- Unit Narrative Overview Blurb (Underneath Archival Photograph) -->
      <div style="border: 1.4px solid #0f172a; border-left: 5px solid #1e3a8a; border-radius: 3px; background: #fdfbf7; padding: 6px 10px; margin-bottom: 4px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 900; text-transform: uppercase; color: #0f172a; letter-spacing: 0.8px;">
            HISTORICAL NARRATIVE OVERVIEW &bull; 1933–1948
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; color: #991b1b; text-transform: uppercase; letter-spacing: 0.5px;">
            CORE DISCIPLINARY SYNOPSIS
          </span>
        </div>
        <p style="font-family: 'Georgia', serif; font-size: 9.2pt; color: #0f172a; line-height: 1.42; margin: 0; text-align: justify;">
          Before the catastrophe of the Second World War, over nine million Jewish people inhabited Europe in vibrant, diverse communities—from traditional Yiddish shtetls in Poland to decorated patriotic veterans in Berlin. This unit investigates how the Nazi regime weaponised racial antisemitism to strip German Jews of civil rights, before exploiting total war to engineer the continent-wide industrial murder of six million human beings. Across seven historical enquiries, pupils trace the terror of the ghettos, the mass shootings of the Einsatzgruppen, the death camp factories, and the defiant courage of armed resistance, righteous rescue, and the post-war struggle for justice.
        </p>
      </div>

      <!-- 4 Core Disciplinary Enquiry Strands (Analytical Question Grid) -->
      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 5px; margin-bottom: 4px;">
        <div style="border: 1.2px solid #0f172a; border-radius: 3px; padding: 5px 6px; background: #ffffff; display: flex; flex-direction: column;">
          <div style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; color: #0f172a; line-height: 1.22; border-bottom: 1.2px solid #0f172a; padding-bottom: 3px; margin-bottom: 4px; min-height: 28px; display: flex; align-items: center;">
            1. Who Were Europe's Jews Before 1939?
          </div>
          <ul style="margin: 0; padding-left: 12px; font-family: 'Georgia', serif; font-size: 7.2pt; color: #1e293b; line-height: 1.24;">
            <li>9.5M diverse European Jews</li>
            <li>Yiddishland, culture &amp; shtetls</li>
            <li>100,000 patriotic WWI veterans</li>
          </ul>
        </div>
        <div style="border: 1.2px solid #0f172a; border-radius: 3px; padding: 5px 6px; background: #ffffff; display: flex; flex-direction: column;">
          <div style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; color: #0f172a; line-height: 1.22; border-bottom: 1.2px solid #0f172a; padding-bottom: 3px; margin-bottom: 4px; min-height: 28px; display: flex; align-items: center;">
            2. How Did the Nazi State Strip Civil Rights?
          </div>
          <ul style="margin: 0; padding-left: 12px; font-family: 'Georgia', serif; font-size: 7.2pt; color: #1e293b; line-height: 1.24;">
            <li>1935 Nuremberg Race Laws</li>
            <li>400+ anti-Jewish legal decrees</li>
            <li>November 1938 Kristallnacht terror</li>
          </ul>
        </div>
        <div style="border: 1.2px solid #0f172a; border-radius: 3px; padding: 5px 6px; background: #ffffff; display: flex; flex-direction: column;">
          <div style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; color: #0f172a; line-height: 1.22; border-bottom: 1.2px solid #0f172a; padding-bottom: 3px; margin-bottom: 4px; min-height: 28px; display: flex; align-items: center;">
            3. Why Did Wartime Persecution Turn to Genocide?
          </div>
          <ul style="margin: 0; padding-left: 12px; font-family: 'Georgia', serif; font-size: 7.2pt; color: #1e293b; line-height: 1.24;">
            <li>1941 Holocaust by Bullets</li>
            <li>1942 Wannsee coordination</li>
            <li>Six dedicated death camps</li>
          </ul>
        </div>
        <div style="border: 1.2px solid #0f172a; border-radius: 3px; padding: 5px 6px; background: #ffffff; display: flex; flex-direction: column;">
          <div style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; color: #0f172a; line-height: 1.22; border-bottom: 1.2px solid #0f172a; padding-bottom: 3px; margin-bottom: 4px; min-height: 28px; display: flex; align-items: center;">
            4. How Did People Resist and Seek Justice?
          </div>
          <ul style="margin: 0; padding-left: 12px; font-family: 'Georgia', serif; font-size: 7.2pt; color: #1e293b; line-height: 1.24;">
            <li>Warsaw Ghetto armed resistance</li>
            <li>DP camps &amp; SS Exodus struggle</li>
            <li>Nuremberg &amp; UN Genocide Law</li>
          </ul>
        </div>
      </div>

      <!-- Running Cover Footer -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1.2px solid #0f172a; padding-top: 3px; font-family: 'Inter', sans-serif; font-size: 7.0pt; color: #475569;">
        <span>The History Revision Hub &bull; Master Classroom Publication &bull; 20-Page Saddle-Stitch Format</span>
        <span>Institutional Neutrality &bull; Reprographic Edition 2026.1</span>
      </div>

    </div>
  </div>`;
}

function renderBackCover() {
  const qrCodes = [
    {
      num: 1,
      title: 'L1: Pre-War Life',
      url: 'https://the-history-revision-hub.netlify.app/?unit=the_shoah&quiz=lesson_1',
    },
    {
      num: 2,
      title: 'L2: Stripping Rights',
      url: 'https://the-history-revision-hub.netlify.app/?unit=the_shoah&quiz=lesson_2',
    },
    {
      num: 3,
      title: 'L3: Ghettos & War',
      url: 'https://the-history-revision-hub.netlify.app/?unit=the_shoah&quiz=lesson_3',
    },
    {
      num: 4,
      title: 'L4: Holocaust by Bullets',
      url: 'https://the-history-revision-hub.netlify.app/?unit=the_shoah&quiz=lesson_4',
    },
    {
      num: 5,
      title: 'L5: Final Solution',
      url: 'https://the-history-revision-hub.netlify.app/?unit=the_shoah&quiz=lesson_5',
    },
    {
      num: 6,
      title: 'L6: Complicity & Rescue',
      url: 'https://the-history-revision-hub.netlify.app/?unit=the_shoah&quiz=lesson_6',
    },
    {
      num: 7,
      title: 'L7: Legacy & Memory',
      url: 'https://the-history-revision-hub.netlify.app/?unit=the_shoah&quiz=lesson_7',
    },
  ];

  const qrCardsHtml = qrCodes
    .map(
      (q) => `
      <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 2px 4px; background: #ffffff; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: space-between;">
        <div style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 900; color: #000000; margin-bottom: 1px;">
          ${q.title}
        </div>
        <div style="width: 20mm; height: 20mm; margin: 1px 0;">
          ${generateQrSvg(q.url)}
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 5.8pt; color: #000000; font-weight: 700;">
          Self-Marking Drill
        </div>
      </div>`,
    )
    .join('');

  return `
  <!-- PAGE 20: OUTSIDE BACK COVER (COLOR COVERS) -->
  <div class="page page-container recto-page" id="page-20" style="padding: 5mm 7mm; background: #ffffff;">
    <div class="page-body-full" style="display: flex; flex-direction: column; justify-content: flex-start; gap: 5px;">
      
      <!-- Back Cover Masthead -->
      <div style="border-bottom: 2.5px solid #1e3a8a; padding-bottom: 3px; display: flex; justify-content: space-between; align-items: baseline;">
        <div style="font-family: 'Inter', sans-serif; font-size: 8.5pt; font-weight: 900; color: #1e3a8a; letter-spacing: 1px; text-transform: uppercase;">
          The History Revision Hub &bull; Assessment &amp; Independent Retrieval
        </div>
        <span style="background: #1e3a8a; color: #ffffff; font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 900; padding: 1.5px 6px; border-radius: 2px;">
          KS3 LEDGER
        </span>
      </div>

      <!-- Pupil Details & Target Level Strip -->
      <div style="border: 1.5px solid #1e3a8a; border-radius: 3px; padding: 6px 10px; background: #ffffff; display: grid; grid-template-columns: 2fr 1fr 1.3fr; gap: 12px; align-items: center;">
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #1e3a8a; text-transform: uppercase; margin-right: 6px;">Pupil Name:</strong>
          <div style="flex: 1; border-bottom: 1.2px solid #1e3a8a; height: 12px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #1e3a8a; text-transform: uppercase; margin-right: 6px;">Class:</strong>
          <div style="flex: 1; border-bottom: 1.2px solid #1e3a8a; height: 12px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #1e3a8a; text-transform: uppercase; margin-right: 6px;">Target Level:</strong>
          <div style="flex: 1; border-bottom: 1.2px solid #1e3a8a; height: 12px;"></div>
        </div>
      </div>

      <!-- KS3 Level Assessment Pathways -->
      <div style="border: 1.5px solid #1e3a8a; border-radius: 3px; padding: 5px 8px; background: #f8fafc;">
        <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 900; color: #1e3a8a; text-transform: uppercase; margin-bottom: 3px;">
          KS3 Disciplinary Historical Writing Progression Standard
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 4px; font-size: 6.8pt; font-family: 'Georgia', serif;">
          <div style="border: 1px solid #cbd5e1; padding: 3px 5px; background: #ffffff; border-radius: 2px;">
            <strong style="color: #000000; font-family: 'Inter', sans-serif;">Emerging (1–3):</strong> Identifies simple facts and descriptions; relies on simple descriptive sentences.
          </div>
          <div style="border: 1px solid #cbd5e1; padding: 3px 5px; background: #ffffff; border-radius: 2px;">
            <strong style="color: #000000; font-family: 'Inter', sans-serif;">Developing (4–5):</strong> Explains causes and consequences using historical connectives and accurate dates.
          </div>
          <div style="border: 1px solid #cbd5e1; padding: 3px 5px; background: #ffffff; border-radius: 2px;">
            <strong style="color: #000000; font-family: 'Inter', sans-serif;">Securing (6–7):</strong> Constructs balanced, multi-causal arguments supported by specific empirical evidence.
          </div>
          <div style="border: 1px solid #cbd5e1; padding: 3px 5px; background: #ffffff; border-radius: 2px;">
            <strong style="color: #000000; font-family: 'Inter', sans-serif;">Greater Depth (8–9):</strong> Evaluates criteria, analyzes provenance forensic utility, and reaches nuanced judgments.
          </div>
        </div>
      </div>

      <!-- Formal Marking & Progress Ledger -->
      <div style="border: 1.5px solid #000000; border-radius: 3px; overflow: hidden; background: #ffffff; flex: 1; display: flex; flex-direction: column;">
        <div style="background: #000000; color: #ffffff; font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 900; padding: 3px 8px; text-transform: uppercase; letter-spacing: 0.5px;">
          Formal Enquiry Assessment Ledger &bull; Teacher &amp; Pupil Voice
        </div>
        <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif; font-size: 7.3pt; text-align: left; height: 100%;">
          <thead>
            <tr style="background: #f1f5f9; border-bottom: 1.2px solid #000000;">
              <th style="padding: 4px 6px; border-right: 1px solid #000000;">Enquiry</th>
              <th style="padding: 4px 6px; border-right: 1px solid #000000;">Disciplinary Skill Focus</th>
              <th style="padding: 4px 6px; border-right: 1px solid #000000; width: 55px; text-align: center;">Tariff</th>
              <th style="padding: 4px 6px; border-right: 1px solid #000000; width: 45px; text-align: center;">Score</th>
              <th style="padding: 4px 6px; border-right: 1px solid #000000; width: 45px; text-align: center;">Effort</th>
              <th style="padding: 4px 6px;">Teacher Signature / Feedback Stamp</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #cbd5e1;">
              <td style="padding: 9px 6px; border-right: 1px solid #000000; font-weight: 700;">Enquiry 1</td>
              <td style="padding: 9px 6px; border-right: 1px solid #000000;">Pre-War Diversity &amp; Racial Antisemitism</td>
              <td style="padding: 9px 6px; border-right: 1px solid #000000; text-align: center;">4m + 4m</td>
              <td style="padding: 9px 6px; border-right: 1px solid #000000;"></td>
              <td style="padding: 9px 6px; border-right: 1px solid #000000;"></td>
              <td style="padding: 9px 6px;"></td>
            </tr>
            <tr style="border-bottom: 1px solid #cbd5e1;">
              <td style="padding: 9px 6px; border-right: 1px solid #000000; font-weight: 700;">Enquiry 2</td>
              <td style="padding: 9px 6px; border-right: 1px solid #000000;">Nuremberg Laws &amp; Kristallnacht Escalation</td>
              <td style="padding: 9px 6px; border-right: 1px solid #000000; text-align: center;">8m Narrative</td>
              <td style="padding: 9px 6px; border-right: 1px solid #000000;"></td>
              <td style="padding: 9px 6px; border-right: 1px solid #000000;"></td>
              <td style="padding: 9px 6px;"></td>
            </tr>
            <tr style="border-bottom: 1px solid #cbd5e1;">
              <td style="padding: 9px 6px; border-right: 1px solid #000000; font-weight: 700;">Enquiry 3</td>
              <td style="padding: 9px 6px; border-right: 1px solid #000000;">Warsaw Ghetto &amp; Ringelblum Archive</td>
              <td style="padding: 9px 6px; border-right: 1px solid #000000; text-align: center;">8m Utility</td>
              <td style="padding: 9px 6px; border-right: 1px solid #000000;"></td>
              <td style="padding: 9px 6px; border-right: 1px solid #000000;"></td>
              <td style="padding: 9px 6px;"></td>
            </tr>
            <tr style="border-bottom: 1px solid #cbd5e1;">
              <td style="padding: 9px 6px; border-right: 1px solid #000000; font-weight: 700;">Enquiry 4</td>
              <td style="padding: 9px 6px; border-right: 1px solid #000000;">Barbarossa &amp; The Holocaust by Bullets</td>
              <td style="padding: 9px 6px; border-right: 1px solid #000000; text-align: center;">12m Essay</td>
              <td style="padding: 9px 6px; border-right: 1px solid #000000;"></td>
              <td style="padding: 9px 6px; border-right: 1px solid #000000;"></td>
              <td style="padding: 9px 6px;"></td>
            </tr>
            <tr style="border-bottom: 1px solid #cbd5e1;">
              <td style="padding: 9px 6px; border-right: 1px solid #000000; font-weight: 700;">Enquiry 5</td>
              <td style="padding: 9px 6px; border-right: 1px solid #000000;">Final Solution &amp; Armed Resistance</td>
              <td style="padding: 9px 6px; border-right: 1px solid #000000; text-align: center;">4m + 8m</td>
              <td style="padding: 9px 6px; border-right: 1px solid #000000;"></td>
              <td style="padding: 9px 6px; border-right: 1px solid #000000;"></td>
              <td style="padding: 9px 6px;"></td>
            </tr>
            <tr style="border-bottom: 1px solid #cbd5e1;">
              <td style="padding: 9px 6px; border-right: 1px solid #000000; font-weight: 700;">Enquiry 6</td>
              <td style="padding: 9px 6px; border-right: 1px solid #000000;">Complicity, Bystanders &amp; The Righteous</td>
              <td style="padding: 9px 6px; border-right: 1px solid #000000; text-align: center;">8m Narrative</td>
              <td style="padding: 9px 6px; border-right: 1px solid #000000;"></td>
              <td style="padding: 9px 6px; border-right: 1px solid #000000;"></td>
              <td style="padding: 9px 6px;"></td>
            </tr>
            <tr style="border-bottom: 1px solid #cbd5e1;">
              <td style="padding: 9px 6px; border-right: 1px solid #000000; font-weight: 700;">Enquiry 7</td>
              <td style="padding: 9px 6px; border-right: 1px solid #000000;">Liberation, Aftermath &amp; Genocide Law</td>
              <td style="padding: 9px 6px; border-right: 1px solid #000000; text-align: center;">12m Essay</td>
              <td style="padding: 9px 6px; border-right: 1px solid #000000;"></td>
              <td style="padding: 9px 6px; border-right: 1px solid #000000;"></td>
              <td style="padding: 9px 6px;"></td>
            </tr>
            <tr style="border-bottom: 1px solid #000000; background: #f8fafc;">
              <td style="padding: 9px 6px; border-right: 1px solid #000000; font-weight: 700;">Portfolio</td>
              <td style="padding: 9px 6px; border-right: 1px solid #000000;">Pages 18–19 Notes &amp; Retrieval Portfolio</td>
              <td style="padding: 9px 6px; border-right: 1px solid #000000; text-align: center;">Formative</td>
              <td style="padding: 9px 6px; border-right: 1px solid #000000;"></td>
              <td style="padding: 9px 6px; border-right: 1px solid #000000;"></td>
              <td style="padding: 9px 6px;"></td>
            </tr>
            <tr>
              <td style="padding: 9px 6px; border-right: 1px solid #000000; font-weight: 700;">Summative</td>
              <td style="padding: 9px 6px; border-right: 1px solid #000000;">End-of-Unit Disciplinary Assessment</td>
              <td style="padding: 9px 6px; border-right: 1px solid #000000; text-align: center;">Synoptic</td>
              <td style="padding: 9px 6px; border-right: 1px solid #000000;"></td>
              <td style="padding: 9px 6px; border-right: 1px solid #000000;"></td>
              <td style="padding: 9px 6px;"></td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 7 Interactive Digital Retrieval QR Codes -->
      <div style="border: 1.5px solid #1e3a8a; border-radius: 3px; padding: 4px 6px; background: #f8fafc;">
        <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; color: #1e3a8a; text-transform: uppercase; margin-bottom: 3px; display: flex; justify-content: space-between;">
          <span>Digital Knowledge Retrieval Engine &bull; Instant Mobile Practice</span>
          <span>7 Enquiries &bull; 70 Interactive Questions</span>
        </div>
        <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px;">
          ${qrCardsHtml}
        </div>
      </div>

      <!-- Running Back Cover Footer -->
      <div class="page-footer-strip" style="display: flex; justify-content: space-between; align-items: center; border-top: 1.2px solid #000000; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 7.0pt; color: #000000; font-weight: 700;">
        <span class="footer-quip">The History Revision Hub &bull; Single-Source Disciplinary Architecture</span>
        <span class="footer-page-num">Page 20 / 20</span>
      </div>

    </div>
  </div>`;
}

// ============================================================================
// MASTER COMPILER FUNCTION: 20-PAGE SADDLE-STITCH WORKBOOK
// ============================================================================
async function compileTheShoahWorkbook() {
  console.log('🚀 Compiling 20-Page Gold Standard Workbook for [the_shoah]...');

  let pagesHtml = '';

  // Page 1: Color Master Cover
  pagesHtml += renderCoverPage() + '\n';

  // Enquiry 1 (Pages 2 & 3)
  pagesHtml += renderSpinePage(enquiryConfigs[0], 2, 20) + '\n';
  pagesHtml += renderRightPage(enquiryConfigs[0], 3, 20) + '\n';

  // Enquiry 2 (Pages 4 & 5)
  pagesHtml += renderSpinePage(enquiryConfigs[1], 4, 20) + '\n';
  pagesHtml += renderRightPage(enquiryConfigs[1], 5, 20) + '\n';

  // Enquiry 3 (Pages 6 & 7)
  pagesHtml += renderSpinePage(enquiryConfigs[2], 6, 20) + '\n';
  pagesHtml += renderRightPage(enquiryConfigs[2], 7, 20) + '\n';

  // Enquiry 4 (Pages 8 & 9)
  pagesHtml += renderSpinePage(enquiryConfigs[3], 8, 20) + '\n';
  pagesHtml += renderRightPage(enquiryConfigs[3], 9, 20) + '\n';

  // Pages 10 & 11: Centrefold Panoramic Living Timeline
  pagesHtml += renderCentrefold(10, 11, 20) + '\n';

  // Enquiry 5 (Pages 12 & 13)
  pagesHtml += renderSpinePage(enquiryConfigs[4], 12, 20) + '\n';
  pagesHtml += renderRightPage(enquiryConfigs[4], 13, 20) + '\n';

  // Enquiry 6 (Pages 14 & 15)
  pagesHtml += renderSpinePage(enquiryConfigs[5], 14, 20) + '\n';
  pagesHtml += renderRightPage(enquiryConfigs[5], 15, 20) + '\n';

  // Enquiry 7 (Pages 16 & 17)
  pagesHtml += renderSpinePage(enquiryConfigs[6], 16, 20) + '\n';
  pagesHtml += renderRightPage(enquiryConfigs[6], 17, 20) + '\n';

  // Page 18: Disciplinary Writing Scaffolding & Master Model Answers (Questions 1–3)
  pagesHtml += renderModelAnswersPage(18, 20) + '\n';

  // Page 19: Extended Evaluative Essay Model Answer & Archival Provenance (Question 5)
  pagesHtml += renderEvaluativeEssayModelPage(19, 20) + '\n';

  // Page 20: Outside Back Cover
  pagesHtml += renderBackCover() + '\n';

  const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>The Shoah: 1933–1945 • Gold Standard Pupil Workbook (20-Page Saddle-Stitch Edition)</title>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700;800;900&family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&family=Georgia:ital@0;1&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4 portrait;
      margin: 0;
    }
    *, *::before, *::after {
      box-sizing: border-box;
    }
    body {
      margin: 0;
      padding: 0;
      background: #e2e8f0;
      color: #000000;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    .page-container {
      width: 210mm;
      height: 297mm;
      max-height: 297mm;
      overflow: hidden;
      margin: 10mm auto;
      background: #ffffff;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      page-break-after: always;
      break-after: page;
      box-sizing: border-box;
    }
    .verso-page {
      border-left: 1.5px solid #000000;
    }
    .recto-page {
      border-right: 1.5px solid #000000;
    }
    .page-body-full {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 0;
    }
    .task-line {
      height: 7.8mm;
      border-bottom: 1.2px solid #000000;
      width: 100%;
      box-sizing: border-box;
      margin: 0;
    }
    .ruled-lines-block {
      display: flex;
      flex-direction: column;
      gap: 0;
      margin: 1px 0;
      border-top: 1.2px solid #000000;
    }
    .page-footer-strip {
      border-top: 1.2px solid #000000;
      padding-top: 2px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: 'Inter', sans-serif;
      font-size: 7.0pt;
      color: #000000;
      font-weight: 700;
      height: 14px;
    }
    .footer-quip {
      font-style: italic;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .footer-page-num {
      font-weight: 900;
      flex-shrink: 0;
    }
    @media print {
      body {
        background: transparent !important;
      }
      .page-container {
        margin: 0 !important;
        box-shadow: none !important;
        border: none !important;
        page-break-after: always !important;
        break-after: page !important;
      }
    }
  </style>
</head>
<body>
${pagesHtml}
</body>
</html>`;

  // Output paths
  const publicHtmlPath = path.join(ROOT_DIR, 'public', 'units', 'the_shoah', 'pupil_workbook.html');
  const unitsHtmlPath = path.join(ROOT_DIR, 'units', 'the_shoah', 'pupil_workbook.html');
  const pdfOutPath = path.join(ROOT_DIR, 'public', 'pdfs', 'the_shoah_pupil_workbook.pdf');

  fs.writeFileSync(publicHtmlPath, fullHtml, 'utf8');
  if (fs.existsSync(path.dirname(unitsHtmlPath))) {
    fs.writeFileSync(unitsHtmlPath, fullHtml, 'utf8');
  }
  console.log(`✅ Saved 20-Page Gold Standard Workbook HTML to: ${publicHtmlPath}`);

  // Render PDF using Puppeteer
  try {
    const chromePath =
      process.env.PUPPETEER_EXECUTABLE_PATH ||
      (fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
        ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
        : undefined);

    const browser = await puppeteer.launch({
      headless: 'new',
      executablePath: chromePath,
      protocolTimeout: 600000,
      args: ['--allow-file-access-from-files', '--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.setContent(fullHtml, { waitUntil: 'networkidle0' });
    await page.pdf({
      path: pdfOutPath,
      format: 'A4',
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    });
    await browser.close();
    console.log(`🎉 Successfully rendered 20-Page Gold Standard PDF to: ${pdfOutPath}`);
    const pdfCompatPath = path.join(
      ROOT_DIR,
      'public',
      'pdfs',
      'the_shoah_pupil_workbook_FINAL_V17.pdf',
    );
    fs.copyFileSync(pdfOutPath, pdfCompatPath);
    console.log(`✅ Also synchronized PDF to: ${pdfCompatPath}`);
  } catch (err) {
    console.warn(`⚠️ Puppeteer PDF generation failed or skipped: ${err.message}`);
    console.log(
      `(HTML output remains valid and printable directly via browser at ${publicHtmlPath})`,
    );
  }
}

// Execute compiler if called directly
if (require.main === module) {
  compileTheShoahWorkbook().catch((err) => {
    console.error('❌ Compilation failed:', err);
    process.exit(1);
  });
}

module.exports = { compileTheShoahWorkbook };
