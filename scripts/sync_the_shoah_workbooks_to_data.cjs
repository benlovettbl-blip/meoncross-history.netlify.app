const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const workbookScriptPath = path.join(ROOT_DIR, 'scripts', 'render_the_shoah_workbook.cjs');
const dataFilePath = path.join(ROOT_DIR, 'units', 'the_shoah', 'data.js');

// 1. Load enquiryConfigs from render_the_shoah_workbook.cjs
const wbContent = fs.readFileSync(workbookScriptPath, 'utf8');
const startIdx = wbContent.indexOf('const enquiryConfigs = [');
const endIdx = wbContent.indexOf('function renderNotesPage', startIdx);
const code = wbContent.substring(startIdx, endIdx).replace('const enquiryConfigs =', 'this.enquiryConfigs =');

const vm = require('vm');
const sandbox = {};
vm.createContext(sandbox);
vm.runInContext(code, sandbox);
const configs = sandbox.enquiryConfigs;

// 2. Load the unit data
const rawDataContent = fs.readFileSync(dataFilePath, 'utf8');
const cleanJsonMatch = rawDataContent.match(/export\s+const\s+unitData\s*=\s*(\{[\s\S]*\});\s*export\s+default\s+unitData;/);
if (!cleanJsonMatch) {
  throw new Error('Could not parse units/the_shoah/data.js JSON structure');
}
const unitData = JSON.parse(cleanJsonMatch[1]);

// 3. Build Model Answers and Scaffolding for each Enquiry
const shoahExamPractice = [
  // Lesson 1: Pre-War European Jewish Life (Feature Drill [4m] + Consequence [4m])
  {
    title: 'Key Stage 3 Disciplinary Writing: Pre-War Life & Racial Antisemitism',
    tariff: '8 marks (Feature Drill [4m] & Consequence Writing [4m])',
    questions: [
      {
        tariff: '4 marks',
        type: 'feature_drills_4m',
        question: 'Describe two features of pre-war Jewish life in Eastern Europe. [4 marks]',
        prompt: 'Identify two distinct features of Eastern European Jewish society before 1939. For each feature, provide a clear identification followed by supporting factual knowledge.',
        model: 'Feature 1: One key feature was that Eastern Europe was the vibrant heartland of Yiddish culture and language.<br>Detail: Over three million Jewish people lived in Poland, creating an irreplaceable intellectual world of Yiddish daily newspapers, professional theatre, literature, and secular schools like the Tarbut network in towns such as Kostopol.<br><br>Feature 2: A second key feature was the distinct demographic division between traditional rural shtetls and urban centers.<br>Detail: While thousands lived in small close-knit market towns maintaining observant religious traditions, cities like Warsaw and Vilna hosted renowned talmudic academies and active trade union movements.',
        scaffolding: {
          acronym: 'F1 + D1 • F2 + D2',
          acronym_title: '4-Mark Feature Drill Formula',
          steps: [
            { letter: 'F1', name: 'Feature 1 (Yiddish Culture)', prompt: 'Identify the cultural heartland of Yiddish language and literature.', starter: 'One key feature was that...' },
            { letter: 'D1', name: 'Detail 1', prompt: 'Add precise factual detail (3 million Jews in Poland, newspapers, Tarbut schools).', starter: 'Specifically, this involved...' },
            { letter: 'F2', name: 'Feature 2 (Shtetls vs Urban Centres)', prompt: 'Identify the demographic contrast between small shtetls and major cities.', starter: 'A second key feature was...' },
            { letter: 'D2', name: 'Detail 2', prompt: 'Add precise factual detail (Warsaw, Vilna, academies, Bund trade unions).', starter: 'In particular, this meant that...' }
          ],
          sentence_starters: [
            'One key feature was that...',
            'Specifically, this involved...',
            'A second key feature was...',
            'In particular, this meant that...'
          ],
          connectives_bank: ['Yiddishland', 'shtetl', 'assimilation', '100,000 German soldiers', 'Thessaloniki', 'anti-Judaism', 'biological racism', 'Wilhelm Marr']
        }
      },
      {
        tariff: '4 marks',
        type: 'consequence_4m',
        question: 'Explain one consequence of the development of 19th-century racial antisemitism for European Jews. [4 marks]',
        prompt: 'Focus on how pseudo-scientific biology treated Jewish identity as an unalterable genetic trait in the blood, removing baptism or conversion as an escape.',
        model: 'One significant consequence of 19th-century racial antisemitism was the shift from religious prejudice to biological determinism. Under medieval Christian anti-Judaism, hostility was rooted in religious beliefs, meaning conversion or baptism offered a path to societal acceptance. However, 19th-century theorists like Wilhelm Marr redefined Jewish identity as an immutable biological race carried in the blood. As a direct result, religious conversion was rendered completely irrelevant; Jews were categorized as permanent racial enemies of the state. Consequently, this biological racism provided the ideological foundation for the 1935 Nuremberg Laws and the Nazi regime’s eventual policy of total physical annihilation.',
        scaffolding: {
          acronym: 'P-F-C (Point • Fact • Consequence)',
          acronym_title: 'High-Yield Consequence Formula (1 Concise Paragraph)',
          steps: [
            { letter: 'POINT', name: 'Identify Consequence', prompt: 'State the shift from religious hostility to immutable biological determinism.', starter: 'One significant consequence of 19th-century racial antisemitism was...' },
            { letter: 'FACT', name: 'Historical Evidence', prompt: 'Cite Wilhelm Marr, the concept of blood heritage, and the invalidation of baptism.', starter: 'In particular, racial theorists argued that...' },
            { letter: 'CONSEQUENCE', name: 'Explain Result', prompt: 'Explain how this directly laid the groundwork for the 1935 Nuremberg Race Laws and extermination.', starter: 'Consequently, this directly resulted in...' }
          ],
          sentence_starters: [
            'A significant consequence was that...',
            'In particular, this meant that...',
            'As a direct result...',
            'Consequently, the impact was...'
          ],
          connectives_bank: ['biological racism', 'immutable blood', 'Wilhelm Marr', 'conversion invalid', 'Nuremberg Laws', 'racial determinism']
        }
      }
    ]
  },

  // Lesson 2: Nazi Persecution & The Stripping of Rights (Narrative Account [8m])
  {
    title: 'Key Stage 3 Disciplinary Writing: Persecution & The Stripping of Rights (1933–1939)',
    tariff: '8 marks (Narrative Account)',
    questions: [
      {
        tariff: '8 marks',
        type: 'narrative_account_8m',
        question: 'Write a narrative account analysing the key stages in the persecution of German Jews between 1933 and 1939. [8 marks]',
        stimulus: [
          'The enactment of the Nuremberg Laws (1935)',
          'The November Pogrom (Kristallnacht, 1938)'
        ],
        prompt: 'Write a structured chronological account examining the escalation from initial economic and civic exclusion (1933), to legal racial segregation (1935), and finally to state-sponsored physical violence (1938–1939). Use linking connectives to show cause and consequence.',
        model: 'Between 1933 and 1939, Nazi anti-Jewish policy escalated systematically from economic marginalisation to legal segregation and state-directed terror. Initially, persecution began in April 1933 with the nationwide one-day boycott of Jewish shops and doctors, rapidly followed by the Law for the Restoration of the Professional Civil Service, which summarily purged Jews from the civil service, judiciary, and universities.<br><br>Following this initial exclusion, a major legislative turning point occurred in September 1935 with the enactment of the Nuremberg Laws. The Reich Citizenship Law revoked German citizenship for Jews, reducing them to second-class "subjects", while the Law for the Protection of German Blood and German Honour criminalized marriage and sexual relations between Jews and "Aryans". Over the subsequent three years, over 400 separate bureaucratic decrees enforced total "social death", banning Jews from parks, public transit, and professional careers.<br><br>The culmination of this pre-war escalation occurred on 9–10 November 1938 with the November Pogrom (Kristallnacht). Instigated by Joseph Goebbels and executed by the SA and SS, over 1,400 synagogues were burned, thousands of businesses destroyed, and 30,000 Jewish men incarcerated in concentration camps. Consequently, this state-sponsored violence eliminated any remaining legal security and triggered frantic, desperate efforts to emigrate, concluding the transition from civic exclusion to violent physical expulsion.',
        scaffolding: {
          acronym: '3-Stage Chronological Narrative Framework',
          acronym_title: 'Narrative Account Formula (Beginning • Escalation • Climax & Outcome)',
          steps: [
            { letter: 'STAGE 1', name: '1933 Civic & Economic Purges', prompt: 'Explain the April 1933 boycott and Civil Service Law excluding Jews from public institutions.', starter: 'Initially, persecution began in April 1933 when...' },
            { letter: 'STAGE 2', name: '1935 Nuremberg Laws & Social Death', prompt: 'Explain how citizenship was revoked, intermarriage banned, and 400 decrees isolated families.', starter: 'Following this, a decisive escalation occurred in September 1935 when...' },
            { letter: 'STAGE 3', name: '1938 Kristallnacht & Forced Emigration', prompt: 'Explain the November Pogrom, burning of synagogues, camp arrests, and flight.', starter: 'The violent culmination of pre-war policy occurred in November 1938 when...' }
          ],
          sentence_starters: [
            'Initially, persecution began when...',
            'Following this, a major escalation occurred in 1935 when...',
            'A violent turning point was reached when...',
            'Consequently, this resulted in...',
            'This ultimately led to...'
          ],
          connectives_bank: ['April Boycott (1933)', 'Civil Service Law', 'Reich Citizenship Law', 'Blood Protection Law', 'Victor Klemperer', 'Kristallnacht', '30,000 arrested', 'Evian Conference', 'Kindertransport']
        }
      }
    ]
  },

  // Lesson 3: War, Forced Segregation & The Warsaw Ghetto (Source Utility [8m])
  {
    title: 'Key Stage 3 Disciplinary Writing: The Warsaw Ghetto & Ringelblum Archive',
    tariff: '8 marks (Forensic Source Utility)',
    questions: [
      {
        tariff: '8 marks',
        type: 'source_utility_8m',
        question: 'How useful is Source A for an enquiry into the living conditions and physical confinement of Jews in the Warsaw Ghetto? [8 marks]',
        stimulus: [
          'Source A: Extract from the diary of 16-year-old Mary Berg, written inside the sealed Warsaw Ghetto, January 1941.'
        ],
        prompt: 'Evaluate Source A for its historical utility. Analyse its content with contextual knowledge (caloric rationing, overcrowding, disease) and interrogate its provenance (first-hand contemporary diary, limitations of localized viewpoint).',
        model: 'Content & Context: Source A is highly useful because it provides vivid, direct eyewitness evidence of the physical and psychological enclosure imposed on Warsaw’s Jews. Berg details how the 3-metre brick wall severed contact with the outside world and documents the severe starvation and cold suffered by children. This aligns precisely with historical knowledge: official ghetto rations supplied merely 180 calories per day, causing over 80,000 deaths from starvation and typhus. Crucially, Berg also reveals spiritual resistance—describing clandestine cellar classes defying Nazi bans.<br><br>Provenance & Limitations: The provenance significantly enhances its utility. Written contemporaneously in January 1941 by a 16-year-old resident inside the sealed ghetto, it captures immediate raw observations free from the distortion of post-war hindsight. However, a historian must recognize its limitations: as a private diary, it reflects only Berg’s localized sector of the ghetto, and she could not possess knowledge of the high-level extermination directives being formulated in Berlin. Overall, Source A remains exceptionally valuable for understanding daily human survival under confinement.',
        scaffolding: {
          acronym: 'C-K-P (Content • Knowledge • Provenance)',
          acronym_title: 'Edexcel GCSE Forensic Source Utility Framework',
          steps: [
            { letter: 'CONTENT', name: 'Analyse Source Detail', prompt: 'Identify what Berg reveals about physical walls, starving children, and cellar classes.', starter: 'Source A is highly useful because its content reveals that...' },
            { letter: 'KNOWLEDGE', name: 'Contextual Corroboration', prompt: 'Corroborate with 180-calorie daily rations, 80,000 starvation deaths, and typhus epidemics.', starter: 'From my own historical knowledge, I know that...' },
            { letter: 'PROVENANCE', name: 'Evaluate Origin & Motive', prompt: 'Evaluate the strength of a contemporaneous eyewitness diary vs localized observational limits.', starter: 'Furthermore, the provenance makes it valuable because...' }
          ],
          sentence_starters: [
            'Source A is useful because of its content, which reveals that...',
            'In particular, it shows that living conditions were...',
            'Furthermore, the provenance makes it valuable because it was written by...',
            'However, a historian must also consider its limitations, such as...'
          ],
          connectives_bank: ['Warsaw Ghetto wall', '180 calories', 'starvation', 'typhus', 'child smugglers', 'Mary Berg', 'Oneg Shabbat', 'Emanuel Ringelblum', 'milk cans']
        }
      }
    ]
  },

  // Lesson 4: Barbarossa & The Holocaust by Bullets (Evaluative Essay [12m])
  {
    title: 'Key Stage 3 Disciplinary Writing: Operation Barbarossa & The Holocaust by Bullets',
    tariff: '12 marks (Evaluative Statement Essay)',
    questions: [
      {
        tariff: '12 marks',
        type: 'evaluative_essay_12m',
        question: '‘The invasion of the Soviet Union in June 1941 was the main turning point in the development of the Holocaust.’ How far do you agree? [12 marks]',
        stimulus: [
          'The invasion of the Soviet Union and the Einsatzgruppen mass shootings (1941)',
          'The enactment of the Nuremberg Laws and Kristallnacht (1935–1938)'
        ],
        prompt: 'Construct a balanced evaluative argument weighing the decisive military watershed of Operation Barbarossa against prior peacetime legal and social persecution. Reach a supported conclusion.',
        model: 'To a large extent, the invasion of the Soviet Union in June 1941 was indeed the decisive turning point in the development of the Holocaust, marking the irrevocable transition from forced emigration and confinement to systematic, state-organized physical extermination.<br><br>On the one hand, Operation Barbarossa fundamentally transformed the nature and scale of Nazi persecution. Hitler framed the invasion as a Vernichtungskrieg (war of annihilation) against "Judeo-Bolshevism", suspending conventional military rules. Following directly behind the Wehrmacht, four SS Einsatzgruppen squads and Order Police battalions initiated mass face-to-face shootings of entire Jewish communities. At Babi Yar in September 1941, 33,771 Jewish people were murdered in just 36 hours. Over 1.5 million victims were shot into ravines across Ukraine, Lithuania, and Belarus in the "Holocaust by Bullets" before stationary gas chambers were operational. This demonstrated that physical annihilation had become official, active state policy.<br><br>On the other hand, it can be argued that pre-1941 developments established the indispensable ideological, legal, and institutional preconditions for genocide. The 1935 Nuremberg Laws stripped German Jews of citizenship, while over 400 decrees systematically dehumanized them. The November Pogrom of 1938 proved that the regime was prepared to deploy state violence openly. Without this domestic radicalization and the subsequent ghettoization of Polish Jews in 1939–1940, the psychological acclimatization required for mass murder could not have occurred.<br><br>In conclusion, while pre-1941 persecution established the administrative machinery and ideological hatred, Operation Barbarossa was the decisive catalyst. It was in June 1941 that the regime crossed the barrier from violent discrimination and starvation to total biological murder, making it the true watershed of the Holocaust.',
        scaffolding: {
          acronym: 'PEEL Evaluative Framework',
          acronym_title: '12-Mark Evaluative Statement Essay Standard',
          steps: [
            { letter: 'THESIS', name: 'State Position', prompt: 'State clearly to what extent Barbarossa was the primary watershed turning point.', starter: 'To a large extent, it can be argued that...' },
            { letter: 'THEME 1', name: 'Barbarossa & Einsatzgruppen (1941)', prompt: 'Explain Vernichtungskrieg, mobile killing squads, Babi Yar, and 1.5m shot face-to-face.', starter: 'On the one hand, Operation Barbarossa was decisive because...' },
            { letter: 'THEME 2', name: 'Pre-1941 Foundation (1935–1939)', prompt: 'Evaluate counter-arguments: Nuremberg Laws, social death, Kristallnacht, and ghettos.', starter: 'On the other hand, an alternative view is that...' },
            { letter: 'JUDGMENT', name: 'Weighed Conclusion', prompt: 'Explain why the transition to active physical extermination makes June 1941 the decisive turning point.', starter: 'In conclusion, the primary turning point was... because...' }
          ],
          sentence_starters: [
            'To a large extent, it can be argued that...',
            'On the one hand, Operation Barbarossa was decisive because...',
            'In particular, this meant that...',
            'On the other hand, an alternative view is that...',
            'In conclusion, the primary turning point was... because...'
          ],
          connectives_bank: ['Operation Barbarossa', 'Vernichtungskrieg', 'Einsatzgruppen', 'Babi Yar (33,771 dead)', 'Ponary', 'Christopher Browning', 'Ordinary Men', 'Chełmno gas vans']
        }
      }
    ]
  },

  // Lesson 5: The "Final Solution" & Armed Resistance (Feature Drill [4m] + Explain Why [8m])
  {
    title: 'Key Stage 3 Disciplinary Writing: Operation Reinhard & Death Camp Resistance',
    tariff: '12 marks (Feature Drill [4m] & Causal Analysis [8m])',
    questions: [
      {
        tariff: '4 marks',
        type: 'feature_drills_4m',
        question: 'Describe two features of the Operation Reinhard extermination camps. [4 marks]',
        prompt: 'Identify two distinct features of Bełżec, Sobibór, or Treblinka. For each feature, provide a clear identification followed by supporting factual knowledge.',
        model: 'Feature 1: One key feature was that Operation Reinhard camps were designed purely for immediate extermination with zero selection for labour.<br>Detail: Arriving transports of up to 5,000 men, women, and children at Treblinka, Bełżec, and Sobibór were stripped, marched into carbon monoxide gas chambers, and murdered within two hours of train arrival.<br><br>Feature 2: A second key feature was the extensive use of psychological deception and camouflage.<br>Detail: Treblinka was constructed with a fake railway station complete with painted ticket booths, timetables, and an artificial clock to keep victims calm until they were pushed into the gas chambers.',
        scaffolding: {
          acronym: 'F1 + D1 • F2 + D2',
          acronym_title: '4-Mark Feature Drill Formula',
          steps: [
            { letter: 'F1', name: 'Feature 1 (Immediate Murder)', prompt: 'Identify the total lack of selection for labour compared to concentration camps.', starter: 'One key feature was that...' },
            { letter: 'D1', name: 'Detail 1', prompt: 'Add precise details (carbon monoxide, dead within 2 hours, Bełżec, Sobibór, Treblinka).', starter: 'Specifically, this involved...' },
            { letter: 'F2', name: 'Feature 2 (Deception & Camouflage)', prompt: 'Identify the fake railway facades and deceptive announcements.', starter: 'A second key feature was...' },
            { letter: 'D2', name: 'Detail 2', prompt: 'Add precise details (painted ticket booths, fake clocks, false promises of transit).', starter: 'In particular, this meant that...' }
          ],
          sentence_starters: [
            'One key feature was that...',
            'Specifically, this involved...',
            'A second key feature was...',
            'This served the purpose of...'
          ],
          connectives_bank: ['Wannsee Protocol', 'Operation Reinhard', 'Treblinka', 'Auschwitz-Birkenau', 'Zyklon B', 'selection', 'Mordechai Anielewicz', 'ŻOB', 'Sonderkommando revolt']
        }
      },
      {
        tariff: '8 marks',
        type: 'explain_why_8m',
        question: 'Explain why Jewish fighters in the Warsaw Ghetto chose to launch an armed uprising in April 1943. [8 marks]',
        prompt: 'Focus on the deportation of 300,000 residents during the Grossaktion Warsaw, the determination to die with dignity and honour, and the organized leadership of the ŻOB under Mordechai Anielewicz.',
        model: 'One primary reason for the Warsaw Ghetto Uprising was the catastrophic reality of mass deportations in the summer of 1942. During the "Grossaktion Warsaw", SS authorities deported over 300,000 ghetto residents directly to the gas chambers of Treblinka under the guise of "resettlement in the East". When underground couriers discovered the truth of Treblinka’s extermination facilities, the remaining 60,000 residents recognized that deportation meant certain death, shattering any remaining illusions of compliance.<br><br>Furthermore, the uprising was driven by a resolute moral determination to die with honour rather than surrender silently. Led by 23-year-old Mordechai Anielewicz, the Jewish Combat Organization (ŻOB) and the Jewish Military Union (ŻZW) acquired small arms, built underground bunkers, and prepared for battle. As Anielewicz famously declared, their goal was not military victory, but to prove that Jewish people would resist Nazi tyranny with arms in hand. Consequently, when German forces entered the ghetto on 19 April 1943 to conduct the final liquidation, Jewish fighters held off heavily armed SS troops and tanks for 27 heroic days.',
        scaffolding: {
          acronym: 'P-E-E-L Dual Causal Analysis',
          acronym_title: '8-Mark Causal Explanation Framework',
          steps: [
            { letter: 'CAUSE 1', name: 'Grossaktion Deportations to Treblinka', prompt: 'Explain how the deportation of 300,000 people and uncovering Treblinka removed all hope.', starter: 'A primary reason was that...' },
            { letter: 'CAUSE 2', name: 'Determination to Resist with Honour', prompt: 'Explain Mordechai Anielewicz, ŻOB organization, and dying with arms in hand.', starter: 'Furthermore, the fighters were driven by...' },
            { letter: 'LINK', name: 'Synthesize Outcome', prompt: 'Explain the 27 days of armed defiance that delayed German liquidation.', starter: 'Consequently, this resulted in...' }
          ],
          sentence_starters: [
            'A primary reason was that...',
            'In particular, this meant that...',
            'Furthermore, this was significant because...',
            'A secondary factor was...',
            'Consequently, this resulted in...'
          ],
          connectives_bank: ['Grossaktion Warsaw', 'Treblinka', 'ŻOB', 'Mordechai Anielewicz', 'bunkers', '27 days', 'armed resistance', 'spiritual dignity']
        }
      }
    ]
  },

  // Lesson 6: Complicity, Bystanders & Rescue (Narrative Account [8m])
  {
    title: 'Key Stage 3 Disciplinary Writing: Allied Response & The Rescue of European Jewry',
    tariff: '8 marks (Narrative Account)',
    questions: [
      {
        tariff: '8 marks',
        type: 'narrative_account_8m',
        question: 'Write a narrative account analysing how the international community and Allied powers responded to the Holocaust between 1938 and 1944. [8 marks]',
        stimulus: [
          'The failure of the Evian Conference (1938)',
          'The Allied Joint Declaration on Nazi extermination (December 1942)'
        ],
        prompt: 'Write a structured chronological account examining the international response from pre-war closed borders (Evian 1938), to wartime eyewitness intelligence and diplomatic condemnation (1942), and the military prioritization debate over bombing death camp infrastructure (1944).',
        model: 'Between 1938 and 1944, the international community’s response to the persecution and mass murder of European Jews transitioned from pre-war diplomatic paralysis to moral condemnation, yet stopped short of direct military rescue operations.<br><br>Initially, the international response was defined by diplomatic inaction and closed borders. In July 1938, delegates from 32 nations met at the Evian Conference to address the desperate German-Jewish refugee crisis. However, almost all participating nations—including Britain, the United States, and Canada—refused to expand immigration quotas, leaving hundreds of thousands trapped inside expanding Nazi territory. Although Britain subsequently permitted 10,000 unaccompanied children to enter via the Kindertransport following Kristallnacht, adult borders remained firmly locked.<br><br>Following the outbreak of war and the commencement of the "Final Solution", detailed intelligence reached Allied capitals. Eyewitness couriers like Jan Karski were smuggled out of Poland to deliver first-hand accounts of death camps to Winston Churchill and Franklin D. Roosevelt. In response, on 17 December 1942, eleven Allied governments issued a formal Joint Declaration condemning Germany’s "bestial policy of cold-blooded extermination" and promising post-war retribution.<br><br>However, in practice, the Allies strictly subordinated humanitarian rescue to total military victory. Despite urgent appeals in 1944 from Jewish leaders to bomb the railway lines leading to Auschwitz-Birkenau to halt the deportation of 437,000 Hungarian Jews, Allied air commands repeatedly refused, arguing that military aircraft could not be diverted from combat operations. Consequently, international action remained largely diplomatic until Allied soldiers physically overran the concentration camps in 1945.',
        scaffolding: {
          acronym: '3-Stage Chronological Narrative Framework',
          acronym_title: 'Narrative Account Formula (Pre-War • Mid-War • Late-War)',
          steps: [
            { letter: 'STAGE 1', name: 'Evian 1938 & Closed Borders', prompt: 'Explain the 32 nations at Evian refusing quotas, leaving refugees trapped.', starter: 'Initially, before the war began, international policy was characterized by...' },
            { letter: 'STAGE 2', name: 'Jan Karski & Dec 1942 Declaration', prompt: 'Explain Polish underground intelligence and the 11-nation Allied condemnation.', starter: 'Following the outbreak of war, detailed intelligence arrived when...' },
            { letter: 'STAGE 3', name: '1944 Rail Bombing Debate & Priority', prompt: 'Explain why Allied commands refused to bomb Auschwitz railway tracks.', starter: 'However, in the final stages of the war, military priorities meant that...' }
          ],
          sentence_starters: [
            'Initially, before the war began...',
            'Following the outbreak of war, detailed intelligence arrived when...',
            'A diplomatic milestone occurred in December 1942 when...',
            'However, in practice...',
            'Consequently, this resulted in...'
          ],
          connectives_bank: ['Evian Conference', 'Kindertransport', 'Jan Karski', 'Joint Declaration (1942)', 'Bermuda Conference', 'Auschwitz rail bombing debate', 'War Refugee Board']
        }
      }
    ]
  },

  // Lesson 7: Liberation, Aftermath & The Legacy of Memory (Evaluative Essay [12m])
  {
    title: 'Key Stage 3 Disciplinary Writing: Liberation, DP Camps & The Struggle for Justice',
    tariff: '12 marks (Evaluative Statement Essay)',
    questions: [
      {
        tariff: '12 marks',
        type: 'evaluative_essay_12m',
        question: '‘The liberation of the concentration camps in 1945 marked the end of the suffering of Holocaust survivors.’ How far do you agree? [12 marks]',
        stimulus: [
          'The liberation of Bergen-Belsen and Auschwitz (1945) and ongoing mortality in Displaced Persons (DP) camps',
          'The struggle of survivors attempting to reach British Mandate Palestine (e.g. SS Exodus 1947) and the movement for a Jewish homeland'
        ],
        prompt: 'Construct a balanced evaluative argument examining whether physical liberation ended survivor suffering, or whether bereavement, virulent antisemitism in Europe, statelessness in DP camps, and geopolitical conflict prolonged their agony. Reach a nuanced conclusion.',
        model: 'To a significant extent, it is inaccurate to claim that liberation in 1945 marked the end of survivor suffering. While the arrival of Allied forces halted industrial mass murder, liberation was not a moment of sudden joy, but the beginning of an agonizing period of physical collapse, bereavement, statelessness, and geopolitical conflict.<br><br>On the one hand, liberation brought immediate deliverance from Nazi extermination and the winter death marches. When British troops entered Bergen-Belsen on 15 April 1945, they disarmed the SS guards and established emergency hospital wards, ending the gas chambers and summary shootings. For survivors, liberation meant physical survival was finally possible under international protection.<br><br>However, profound physical and emotional suffering persisted long after the guns fell silent. Extreme starvation and virulent typhus meant that over 14,000 liberated prisoners died at Bergen-Belsen within weeks of British arrival. Furthermore, when survivors attempted to return to their hometowns in Poland, they discovered their entire families had been murdered, their homes confiscated, and they faced violent pogroms—most infamously at Kielce in July 1946, where 42 Jewish survivors were murdered by local mobs. Consequently, over 250,000 homeless Jewish survivors were forced to live behind barbed wire in Allied Displaced Persons (DP) camps across Germany for years.<br><br>Crucially, survivor suffering was compounded by the geopolitical crisis in British Mandate Palestine. Enforcing the 1939 White Paper immigration quotas, the British government blockaded Palestine and turned back refugee vessels. In July 1947, the Royal Navy intercepted the SS Exodus 1947 carrying 4,500 Holocaust survivors, attacking the ship in international waters and forcibly returning the refugees to camps in Germany. This outrage galvanized global Zionist resolve, convincing survivors that true safety required sovereign self-determination. This pressure directly accelerated the 1947 UN Partition Plan (Resolution 181) and the establishment of the State of Israel in May 1948.<br><br>In conclusion, liberation was not the end of suffering, but the conclusion of physical extermination. The psychological trauma of the obliterated Yiddishland, the loss of entire family trees, and the desperate post-war struggle for a sovereign homeland meant that for survivors, the struggle to rebuild their lives lasted for decades.',
        scaffolding: {
          acronym: 'PEEL Evaluative Framework',
          acronym_title: '12-Mark Evaluative Statement Essay Standard',
          steps: [
            { letter: 'THESIS', name: 'Evaluative Argument', prompt: 'State clearly that liberation halted physical murder but began an agonizing period of statelessness and trauma.', starter: 'To a significant extent, it is inaccurate to claim that liberation ended survivor suffering because...' },
            { letter: 'THEME 1', name: 'Physical Deliverance & Medical Rescue', prompt: 'Explain the end of death marches, medical wards at Bergen-Belsen, and international protection.', starter: 'On the one hand, Allied liberation brought immediate deliverance from...' },
            { letter: 'THEME 2', name: 'Ongoing Trauma, Kielce & DP Camps', prompt: 'Explain 14,000 post-liberation deaths, annihilated families, Kielce Pogrom 1946, and 250,000 in DP camps.', starter: 'However, intense physical and emotional suffering persisted because...' },
            { letter: 'THEME 3', name: 'British Mandate Palestine & SS Exodus', prompt: 'Explain the 1939 White Paper blockade, the SS Exodus 1947 tragedy, and Zionist struggle leading to 1948 statehood.', starter: 'Crucially, survivor suffering was compounded by the geopolitical crisis over...' },
            { letter: 'JUDGMENT', name: 'Nuanced Conclusion', prompt: 'Synthesize why physical liberation was distinct from the enduring emotional and political struggle.', starter: 'In conclusion, liberation was not the end of suffering, but rather... because...' }
          ],
          sentence_starters: [
            'To a large extent, it can be argued that...',
            'On the one hand, Allied liberation brought immediate deliverance from...',
            'However, intense suffering endured because...',
            'In particular, the geopolitical struggle over British Mandate Palestine meant that...',
            'Consequently, for tens of thousands of survivors on ships like the SS Exodus 1947...',
            'In conclusion, liberation was not the end of suffering but rather... because...'
          ],
          connectives_bank: ['Bergen-Belsen', 'typhus', 'Displaced Persons (DP) camps', 'Windermere Children', 'Kielce Pogrom 1946', 'British Mandate Palestine', '1939 White Paper', 'Aliyah Bet', 'SS Exodus 1947', 'Zionism', 'UN Resolution 181', 'State of Israel', 'Nuremberg Trials', 'Raphael Lemkin', '1948 Genocide Convention']
        }
      }
    ]
  }
];

// 4. Inject into unitData.lessons
unitData.lessons.forEach((lesson, idx) => {
  if (shoahExamPractice[idx]) {
    lesson.exam_practice = shoahExamPractice[idx];
  }
});

// 5. Serialize back to units/the_shoah/data.js
const serialized = `export const unitData = ${JSON.stringify(unitData, null, 2)};\nexport default unitData;\n`;
fs.writeFileSync(dataFilePath, serialized, 'utf8');
console.log('✅ Successfully synchronized all 7 lessons of The Shoah with workbook examination practice!');
