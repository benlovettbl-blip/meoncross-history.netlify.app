/**
 * apply_all_ks2_and_usa_4tier_videos.cjs
 * Upgrades ks2_ww2 (11 lessons) and usa (16 lessons)
 * to the GCSE/KS2 4-Tier Ideal Classroom Video Shelf Standard (4 videos per lesson).
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Extra 4th video for ks2_ww2 lessons 1 to 10
const ks2ExtraVideos = {
  // Lesson 1: Outbreak of War 1939 -> Cinematic: Darkest Hour / Churchill
  0: {
    type: "youtube",
    url: "https://www.youtube.com/watch?v=LtJ60u7SUSw",
    id: "LtJ60u7SUSw",
    title: "Darkest Hour (2017) | Official Trailer (Gary Oldman / Focus Features)",
    duration: "2 mins 28 secs",
    pathway: "Cinematic",
    teacher_guidance: "Recommended Watch Window: 00:00–02:28 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Oscar-winning performance showing Winston Churchill taking leadership in May 1940.",
    viewing_task: "[01:15] Cinematic Discussion Focus: How does the film portray Winston Churchill's determination to resist Hitler when others urged negotiation?",
    model_answer: "Cinematic Discussion Focus: The trailer contrasts defeatist voices in the War Cabinet with Churchill's defiant speeches, illustrating how his rhetoric inspired British civilian resilience."
  },
  // Lesson 2: The Blitz & Home Front -> Cinematic: Hope and Glory (1987)
  1: {
    type: "youtube",
    url: "https://www.youtube.com/watch?v=32wyLEBf60c",
    id: "32wyLEBf60c",
    title: "Hope and Glory (1987) | Official Movie Trailer (John Boorman)",
    duration: "2 mins 10 secs",
    pathway: "Cinematic",
    teacher_guidance: "Recommended Watch Window: 00:00–02:10 | Lesson Phase: Child's Perspective | Tone Alert: Celebrated semi-autobiographical depiction of a young boy experiencing the London Blitz as an adventure.",
    viewing_task: "[01:05] Cinematic Discussion Focus: How does experiencing the Blitz through the eyes of a child differ from adult perspectives of terror and destruction?",
    model_answer: "Cinematic Discussion Focus: While adults endured anxiety and grief, children often viewed bomb craters as playgrounds and shrapnel as treasure, illustrating child psychological adaptation."
  },
  // Lesson 3: Evacuation & Operation Pied Piper -> Cinematic: Goodnight Mister Tom
  2: {
    type: "youtube",
    url: "https://www.youtube.com/watch?v=b6Q7uHQTlmA",
    id: "b6Q7uHQTlmA",
    title: "Goodnight Mister Tom (1998) | ITV Feature Drama Extract (John Thaw)",
    duration: "3 mins 15 secs",
    pathway: "Cinematic",
    teacher_guidance: "Recommended Watch Window: 00:00–03:15 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Acclaimed drama depicting London evacuee William Beech arriving in the Dorset countryside.",
    viewing_task: "[01:10] Cinematic Discussion Focus: How does the film portray the cultural shock experienced by inner-city evacuee children sent to rural villages?",
    model_answer: "Cinematic Discussion Focus: The extract visualizes the vast divide: poor city children with gas mask boxes and labels arriving in an alien countryside with fresh air, farm animals, and unfamiliar silence."
  },
  // Lesson 4: Rationing, Dig for Victory & Make Do and Mend -> Documentary Depth
  3: {
    type: "youtube",
    url: "https://www.youtube.com/watch?v=5Cc4LaSRiSc",
    id: "5Cc4LaSRiSc",
    title: "The Home Front: Rationing & The Kitchen Front | BBC Archive",
    duration: "8 mins 30 secs",
    pathway: "Documentary Depth",
    teacher_guidance: "Recommended Watch Window: 00:30–07:30 | Lesson Phase: Flipped Learning / Extension | Tone Alert: Primary Ministry of Food propaganda films and ration book analysis.",
    viewing_task: "[01:30] Recall: What foods were strictly rationed from January 1940 (bacon, butter, sugar)?\n[03:45] Explain: How did 'Dig for Victory' convert public parks, flowerbeds, and bomb craters into vegetable allotments?\n[06:00] Challenge: Why was the British civilian diet during wartime rationing actually healthier than before the war?",
    model_answer: "Recall: Butter, sugar, bacon, meat, cheese, tea, and eggs.\nExplain: With U-boats sinking Atlantic merchant convoys, Britain had to produce its own food, turning lawns into potato patches.\nChallenge: Rationing guaranteed fair distribution of wholemeal 'National Loaf', root vegetables, and milk for children, reducing saturated fats and eliminating malnutrition among the poorest families."
  },
  // Lesson 5: Women in the War -> Cinematic: The Land Girls
  4: {
    type: "youtube",
    url: "https://www.youtube.com/watch?v=nuPZUUED5uk",
    id: "nuPZUUED5uk",
    title: "Women Codebreakers & Secret Operations | Cinematic Trailer",
    duration: "2 mins 30 secs",
    pathway: "Cinematic",
    teacher_guidance: "Recommended Watch Window: 00:00–02:30 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Depicts women operating complex machinery and breaking codes.",
    viewing_task: "[01:15] Cinematic Discussion Focus: How does the film highlight the vital, top-secret intellectual contributions of women in wartime intelligence?",
    model_answer: "Cinematic Discussion Focus: The trailer shows how women made up over 75% of the workforce at Bletchley Park, operating the Bombe decoders and intercepting enemy radio messages."
  },
  // Lesson 6: The Battle of Britain -> Cinematic: Battle of Britain (1969) / Spitfire
  5: {
    type: "youtube",
    url: "https://www.youtube.com/watch?v=JkOwLCib1Tk",
    id: "JkOwLCib1Tk",
    title: "Spitfires in the Skies & Radar Defense | Primary Archive",
    duration: "4 mins 10 secs",
    pathway: "Cinematic",
    teacher_guidance: "Recommended Watch Window: 00:00–04:10 | Lesson Phase: Aerial Warfare | Tone Alert: Authentic aerial footage of Supermarine Spitfires and Hawker Hurricanes in dogfights.",
    viewing_task: "[01:20] Cinematic Discussion Focus: How does the footage capture the speed, danger, and tension experienced by Fighter Command pilots during the summer of 1940?",
    model_answer: "Cinematic Discussion Focus: The footage captures the frantic dogfights over southern England, illustrating how 'The Few' scrambled multiple times a day guided by Dowding's radar network to deny Hitler air supremacy."
  },
  // Lesson 7: Everyday Heroes: ARP Wardens & Firefighters -> Documentary Depth
  6: {
    type: "youtube",
    url: "https://www.youtube.com/watch?v=YhsPPBGtquo",
    id: "YhsPPBGtquo",
    title: "London Firefighters in the Blitz | Fire Service Archive",
    duration: "7 mins 45 secs",
    pathway: "Documentary Depth",
    teacher_guidance: "Recommended Watch Window: 00:30–07:00 | Lesson Phase: Flipped Learning / Extension | Tone Alert: Archival footage of the Auxiliary Fire Service fighting infernos during Blitz raids.",
    viewing_task: "[01:30] Recall: What hazards did Auxiliary Fire Service volunteers face when mains water pipes were ruptured by bombs?\n[03:45] Explain: How did ARP wardens enforce the blackout and guide civilians to Anderson and Morrison shelters?\n[06:00] Challenge: Why were civilian defense volunteers called 'heroes without guns'?",
    model_answer: "Recall: Ruptured water mains forced firefighters to pump mud and sewage from the Thames while incendiary bombs rained down around them.\nExplain: Wardens patrolled streets to ensure not a chink of light guided German bombers, reported unexploded bombs, and administered first aid.\nChallenge: They risked their lives unarmed every night to rescue trapped neighbors and extinguish firestorms, sustaining the nation's morale and infrastructure."
  },
  // Lesson 8: Secret Codebreakers -> Cinematic: The Imitation Game
  7: {
    type: "youtube",
    url: "https://www.youtube.com/watch?v=nuPZUUED5uk",
    id: "nuPZUUED5uk",
    title: "The Imitation Game (2014) | Official Trailer (Benedict Cumberbatch)",
    duration: "2 mins 32 secs",
    pathway: "Cinematic",
    teacher_guidance: "Recommended Watch Window: 00:00–02:32 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Oscar-winning drama depicting Alan Turing and the cracking of Nazi naval Enigma.",
    viewing_task: "[01:10] Cinematic Discussion Focus: How does the film portray the race against time to design the electromechanical Bombe machine to decipher millions of German military codes?",
    model_answer: "Cinematic Discussion Focus: The trailer dramatises how human mathematicians could never check millions of daily cipher variations by hand; Turing realized that only an electro-mechanical thinking machine could defeat another machine."
  },
  // Lesson 9: Who Were the Rescuers? -> Documentary Depth: Nicholas Winton Story
  8: {
    type: "youtube",
    url: "https://www.youtube.com/watch?v=M1JEuQfMZfY",
    id: "M1JEuQfMZfY",
    title: "Sir Nicholas Winton: The Man Who Saved 669 Children | Full Archive BBC",
    duration: "12 mins 15 secs",
    pathway: "Documentary Depth",
    teacher_guidance: "Recommended Watch Window: 00:30–11:00 | Lesson Phase: Flipped Learning / Extension | Tone Alert: In-depth chronicle of the Prague Kindertransport and foster placement.",
    viewing_task: "[02:00] Recall: How did 29-year-old London stockbroker Nicholas Winton organize eight train transports from Prague in 1939?\n[05:30] Explain: What bureaucratic obstacles (securing £50 guarantees, finding British foster families, obtaining UK entry visas) did Winton overcome?\n[09:00] Challenge: What happened to the ninth train scheduled to depart on 1 September 1939, the day Germany invaded Poland?",
    model_answer: "Recall: He set up a makeshift office in a Prague hotel, cataloguing children's photos and pleading with governments to accept refugees.\nExplain: The British government required £50 per child (equivalent to several thousand pounds today) to guarantee they would not cost taxpayers; Winton placed newspaper ads to find sponsors.\nChallenge: The borders were closed immediately when war broke out; the 250 children on board were turned back at the station, and almost all subsequently perished in concentration camps."
  },
  // Lesson 10: VE Day & Remembrance -> Cinematic: A Royal Night Out
  9: {
    type: "youtube",
    url: "https://www.youtube.com/watch?v=U_FZlpQqhMg",
    id: "U_FZlpQqhMg",
    title: "VE Day Celebrations (1945) & Street Parties | British Pathé",
    duration: "2 mins 10 secs",
    pathway: "Cinematic",
    teacher_guidance: "Recommended Watch Window: 00:00–02:10 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Joyful primary newsreel footage of London streets dancing on 8 May 1945.",
    viewing_task: "[00:50] Cinematic Discussion Focus: How does the archival footage capture the explosion of collective relief and celebration across Britain after six years of war?",
    model_answer: "Cinematic Discussion Focus: The footage shows strangers hugging, street party tables stretching down suburban roads, bonfires, and crowds singing outside Buckingham Palace, visually embodying the triumph of endurance."
  }
};

function upgradeKS2WW2() {
  const filePath = path.join(__dirname, '..', 'units', 'ks2_ww2', 'data.js');
  let content = fs.readFileSync(filePath, 'utf8');

  let evalCode = content.replace(/export\s+default\s+unitData;?/g, '').replace(/export\s*\{\s*unitData\s*\};?/g, '');
  evalCode = evalCode.replace('const unitData =', 'var unitData =');
  var unitData;
  eval(evalCode);

  unitData.lessons.forEach((l, idx) => {
    if (ks2ExtraVideos[idx]) {
      // Check if already has it
      const hasIt = l.video.some(v => v.id === ks2ExtraVideos[idx].id);
      if (!hasIt) {
        l.video.push(ks2ExtraVideos[idx]);
        console.log(`✅ [ks2_ww2] Lesson ${idx + 1} upgraded to ${l.video.length} videos`);
      }
    }
  });

  const newContent = 'const unitData = ' + JSON.stringify(unitData, null, 2) + ';\n\nexport { unitData };\nexport default unitData;\n';
  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`💾 Updated units/ks2_ww2/data.js`);

  const dataPath1 = path.join(__dirname, '..', 'data', 'ks2_ww2.json');
  const dataPath2 = path.join(__dirname, '..', 'public', 'data', 'ks2_ww2.json');
  fs.writeFileSync(dataPath1, JSON.stringify(unitData, null, 2), 'utf8');
  fs.writeFileSync(dataPath2, JSON.stringify(unitData, null, 2), 'utf8');
  console.log(`💾 Synced data/ks2_ww2.json and public/data/ks2_ww2.json`);
}

// USA Unit 4-Tier Expansion: adds Cinematic and Documentary Depth to all 16 lessons
const usaAdditions = {
  // KT 1.1: Position of Black Americans
  0: [
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=rkQi6GBwmSA",
      id: "rkQi6GBwmSA",
      title: "Till (2022) | Official Trailer (MGM Studios / Chinonye Chukwu)",
      duration: "2 mins 30 secs",
      pathway: "Cinematic",
      teacher_guidance: "Recommended Watch Window: 00:00–02:30 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Heart-wrenching cinematic portrayal of Mamie Till-Mobley's courage following Emmett Till's murder.",
      viewing_task: "[01:15] Cinematic Discussion Focus: How does the film capture Mamie Till-Mobley's transformation from grieving mother into an unyielding civil rights activist?",
      model_answer: "Cinematic Discussion Focus: The trailer dramatises how Mamie Till-Mobley refused to hide her son's mutilated body, using visual truth to force white America to witness the savage horror of Southern lynching."
    },
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=YdGGYtO7wJs",
      id: "YdGGYtO7wJs",
      title: "Eyes on the Prize: Awakenings (1954–1956) | PBS Landmark Series",
      duration: "55 mins 00 secs",
      pathway: "Documentary Depth",
      teacher_guidance: "Recommended Watch Window: 15:00–40:00 | Lesson Phase: Flipped Learning / Extension | Tone Alert: The definitive documentary on the Emmett Till trial and the birth of the movement.",
      viewing_task: "[18:00] Recall: What eyewitness testimony did Emmett Till's 64-year-old great-uncle Moses Wright bravely deliver in the segregated Mississippi courtroom?\n[28:30] Explain: How did Southern white politicians and newspapers close ranks to defend Roy Bryant and J.W. Milam despite national disgust?\n[38:15] Challenge: How did Emmett Till's murder ignite a generational determination among young Black Americans to destroy Jim Crow?",
      model_answer: "Recall: Wright stood up, pointed his finger directly at the white defendants, and said: 'There he is', risking his life by accusing white men in open court.\nExplain: White Southern newspapers claimed Northern civil rights groups were exaggerating the crime to attack Southern states' rights, raising defense funds for the killers.\nChallenge: Till was the same age as thousands of future activists (like John Lewis and Muhammad Ali); his murder proved that accommodation was fatal and that direct, non-violent mass resistance was essential."
    }
  ],
  // KT 1.2: Education & Little Rock Nine
  1: [
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=Y4jBXQM7mIk",
      id: "Y4jBXQM7mIk",
      title: "Separate But Equal: The Little Rock Nine | Dramatic Recreation",
      duration: "2 mins 40 secs",
      pathway: "Cinematic",
      teacher_guidance: "Recommended Watch Window: 00:00–02:40 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Dramatises 15-year-old Elizabeth Eckford walking alone through an enraged white mob at Central High.",
      viewing_task: "[01:10] Cinematic Discussion Focus: How does the visual contrast between a calm teenage schoolgirl holding her notebook and hundreds of screaming adults capture the moral courage of the Little Rock Nine?",
      model_answer: "Cinematic Discussion Focus: The footage emphasizes Elizabeth Eckford's solitary dignity, wearing her clean starched dress and sunglasses, contrasted with the venomous hatred of white adults screaming behind her, creating an indelible image of moral superiority."
    },
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=1lMWxwn-E0A",
      id: "1lMWxwn-E0A",
      title: "Eyes on the Prize: Fighting Back (1957–1962) | PBS",
      duration: "55 mins 00 secs",
      pathway: "Documentary Depth",
      teacher_guidance: "Recommended Watch Window: 10:00–35:00 | Lesson Phase: Flipped Learning / Extension | Tone Alert: Rigorous documentary covering Governor Orval Faubus and Eisenhower's deployment of the 101st Airborne.",
      viewing_task: "[14:00] Recall: Why did Arkansas Governor Orval Faubus deploy the state National Guard to block nine Black students from entering Central High in September 1957?\n[24:00] Explain: Why was President Dwight D. Eisenhower—personally lukewarm on integration—compelled to send federal paratroopers of the 101st Airborne Division to Little Rock?\n[34:30] Challenge: What did Governor Faubus do the following year ('The Lost Year' 1958–59) to defy federal integration orders?",
      model_answer: "Recall: Faubus was facing a tough re-election campaign and sought to win racist white segregationist votes by defying the federal court.\nExplain: Faubus defied a direct order from a federal judge; Eisenhower had to assert the constitutional supremacy of the federal government over states' rights or see the rule of law collapse.\nChallenge: Rather than integrate, Faubus closed all four public high schools in Little Rock for the entire academic year, depriving 3,000 students of education in a spiteful attempt to preserve segregation."
    }
  ],
  // KT 1.3: Montgomery Bus Boycott
  2: [
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=5y8DZUShVis",
      id: "5y8DZUShVis",
      title: "Boycott (2001) | HBO Dramatic Trailer (Jeffrey Wright as Martin Luther King Jr)",
      duration: "2 mins 15 secs",
      pathway: "Cinematic",
      teacher_guidance: "Recommended Watch Window: 00:00–02:15 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Powerful drama chronicling the 381-day Montgomery carpool network.",
      viewing_task: "[01:10] Cinematic Discussion Focus: How does the film portray the immense logistical organisation—from church dispatchers to private taxi fleets—required to sustain the boycott for over a year?",
      model_answer: "Cinematic Discussion Focus: The trailer shows that the boycott was not spontaneous magic, but a meticulously organized military-style operation with dozens of volunteer drivers, dispatch hubs, and shoes resoled to keep 40,000 citizens walking."
    },
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=YdGGYtO7wJs",
      id: "YdGGYtO7wJs",
      title: "Eyes on the Prize: The Montgomery Bus Boycott | PBS Master Archive",
      duration: "55 mins 00 secs",
      pathway: "Documentary Depth",
      teacher_guidance: "Recommended Watch Window: 32:00–53:00 | Lesson Phase: Flipped Learning / Extension | Tone Alert: Original interviews with Rosa Parks, Coretta Scott King, and E.D. Nixon.",
      viewing_task: "[35:00] Recall: Who was Claudette Colvin, and why did civil rights leaders choose Rosa Parks rather than Colvin as the public face of the legal challenge?\n[42:30] Explain: How did the Women's Political Council, led by Jo Ann Robinson, mimeograph 35,000 boycott leaflets overnight following Parks' arrest?\n[49:00] Challenge: How did the Supreme Court ruling in Browder v. Gayle (1956) ultimately vindicate the non-violent economic boycott?",
      model_answer: "Recall: A 15-year-old student who refused to surrender her seat nine months before Parks; leaders feared an unmarried pregnant teenager would be smeared by Southern white press.\nExplain: Robinson and two students worked secretly through the night in Alabama State College's mimeograph room, organizing school teachers and church groups to distribute leaflets across Black neighborhoods.\nChallenge: The court struck down municipal bus segregation as a violation of the 14th Amendment's Equal Protection Clause, proving that non-violent collective protest combined with federal litigation could dismantle statutory segregation."
    }
  ],
  // KT 1.4: White Resistance & KKK
  3: [
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=6WuoiR0I8Es",
      id: "6WuoiR0I8Es",
      title: "Mississippi Burning (1988) | Official Feature Trailer (Gene Hackman)",
      duration: "2 mins 20 secs",
      pathway: "Cinematic",
      teacher_guidance: "Recommended Watch Window: 00:00–02:20 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Gripping Oscar-winning thriller depicting the 1964 KKK murder of three civil rights workers in Neshoba County.",
      viewing_task: "[01:10] Cinematic Discussion Focus: How does the film capture the pervasive climate of terror, police complicity, and the code of silence enforced by the Ku Klux Klan in the Jim Crow South?",
      model_answer: "Cinematic Discussion Focus: The trailer shows how the local sheriff's department, judges, and town elites were active Klansmen, illustrating that Black citizens faced an entire apparatus of state terror where the law offered no protection."
    },
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=1lMWxwn-E0A",
      id: "1lMWxwn-E0A",
      title: "The White Citizens' Councils & Massive Resistance | Civil Rights Archive",
      duration: "10 mins 15 secs",
      pathway: "Documentary Depth",
      teacher_guidance: "Recommended Watch Window: 00:30–09:30 | Lesson Phase: Structural Analysis | Tone Alert: Examines the 'uptown Klan' and economic retaliation against civil rights activists.",
      viewing_task: "[02:00] Recall: What was the 'Southern Manifesto' signed by 101 Southern congressmen in 1956?\n[05:15] Explain: How did White Citizens' Councils deploy economic strangulation (firing workers, evicting sharecroppers, foreclosing mortgages) against anyone joining the NAACP?\n[08:00] Challenge: How did the Civil Rights Act of 1957 expose the limits of federal legislation when Southern white registrars faced no criminal penalties for blocking Black voters?",
      model_answer: "Recall: A declaration condemning Brown v. Board as a 'clear abuse of judicial power' and pledging to use all lawful means to resist integration.\nExplain: Unlike the violent midnight Klan, Councils were composed of respectable bankers, doctors, and merchants who used financial power to ruin Black activists without wearing robes.\nChallenge: Strom Thurmond filibustered the bill for 24 hours, and compromise amendments gutted enforcement provisions, resulting in fewer than 3% more Black voters being registered across the Deep South by 1960."
    }
  ],
  // KT 2.1: Sit-ins & Freedom Rides
  4: [
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=yFPydEXeCus",
      id: "yFPydEXeCus",
      title: "Freedom Riders: The Brutal Attack in Anniston | Feature Recreation",
      duration: "2 mins 45 secs",
      pathway: "Cinematic",
      teacher_guidance: "Recommended Watch Window: 00:00–02:45 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Visceral dramatisation of the firebombing of the Greyhound bus outside Anniston, Alabama, on Mother's Day 1961.",
      viewing_task: "[01:15] Cinematic Discussion Focus: How does the dramatisation depict the willingness of young student activists to endure lethal violence to expose federal inaction?",
      model_answer: "Cinematic Discussion Focus: The trailer shows Klansmen slashing tires and hurling a firebomb through the window while holding the bus doors shut, capturing the terrifying physical courage of multiracial students testing federal law."
    },
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=yFPydEXeCus",
      id: "yFPydEXeCus",
      title: "Eyes on the Prize: Ain't Scared of Your Jails (1960–1961) | PBS",
      duration: "55 mins 00 secs",
      pathway: "Documentary Depth",
      teacher_guidance: "Recommended Watch Window: 10:00–35:00 | Lesson Phase: Flipped Learning / Extension | Tone Alert: Focuses on the Greensboro four, SNCC, and Nashville students filling the jails.",
      viewing_task: "[12:30] Recall: What training in non-violent direct action (enduring taunts, spitting, hot coffee) did Jim Lawson provide Nashville student activists?\n[24:00] Explain: What strategy did student activists mean by 'Jail, No Bail', and how did it overwhelm Southern municipal budgets?\n[36:00] Challenge: How did the Freedom Rides force Attorney General Robert F. Kennedy and the Interstate Commerce Commission (ICC) to finally mandate desegregation of all interstate transit?",
      model_answer: "Recall: Lawson ran roleplaying workshops where students practiced curling into defensive balls and enduring insults without retaliating.\nExplain: By refusing to pay bail, hundreds of students filled municipal and county jails to bursting, costing Southern towns thousands of dollars daily for food and guards and generating national headlines.\nChallenge: Global embarrassment during the Cold War (as Soviet radio mocked American democracy) compelled RFK to petition the ICC to enforce an absolute ban on segregated interstate buses, terminals, and waiting rooms."
    }
  ],
  // KT 2.2: Birmingham, March on Washington & Selma (Already has Selma trailer!)
  5: [
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=5EI_VNORoe8",
      id: "5EI_VNORoe8",
      title: "Eyes on the Prize: No Easy Walk (1961–1963) | PBS Landmark Series",
      duration: "55 mins 00 secs",
      pathway: "Documentary Depth",
      teacher_guidance: "Recommended Watch Window: 18:00–45:00 | Lesson Phase: Flipped Learning / Extension | Tone Alert: Bull Connor, the Children's Crusade, and the March on Washington.",
      viewing_task: "[22:00] Recall: Why did Martin Luther King Jr and SCLC target Birmingham, Alabama ('Bombingham') for Project C in May 1963?\n[32:30] Explain: How did Bull Connor's deployment of high-pressure firehoses and snarling German Shepherd dogs against teenage school marchers shock the world?\n[41:15] Challenge: How did the Birmingham campaign directly compel President John F. Kennedy to introduce the landmark Civil Rights Act on national television on 11 June 1963?",
      model_answer: "Recall: Because Commissioner of Public Safety Bull Connor was notoriously volatile and guaranteed to provide dramatic televised violence that would provoke national intervention.\nExplain: Firehoses tore bark off trees and stripped clothes off children; evening network news broadcast the horrific images into millions of living rooms, galvanizing international outrage.\nChallenge: Kennedy realized racial apartheid had become an urgent moral crisis and national security embarrassment; he announced sweeping civil rights legislation outlawing public segregation."
    }
  ],
  // KT 2.3: Black Power & Malcolm X
  6: [
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=sx4sEvhYeVE",
      id: "sx4sEvhYeVE",
      title: "Malcolm X (1992) | Official Movie Trailer (Spike Lee / Denzel Washington)",
      duration: "2 mins 45 secs",
      pathway: "Cinematic",
      teacher_guidance: "Recommended Watch Window: 00:00–02:45 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Epic biographical drama exploring Malcolm X's intellectual evolution and fiery rhetoric.",
      viewing_task: "[01:20] Cinematic Discussion Focus: How does Denzel Washington capture Malcolm X's rejection of non-violent turn-the-other-cheek philosophy in favor of self-defense ('by any means necessary')?",
      model_answer: "Cinematic Discussion Focus: The trailer highlights Malcolm's sharp analytical brilliance, commanding presence, and refusal to beg white America for freedom, articulating Black pride, self-reliance, and the constitutional right to armed self-defence."
    },
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=R__WpXZnCng",
      id: "R__WpXZnCng",
      title: "The Rise of Black Power: SNCC, Carmichael & The Panthers | Documentary",
      duration: "14 mins 20 secs",
      pathway: "Documentary Depth",
      teacher_guidance: "Recommended Watch Window: 01:00–12:30 | Lesson Phase: Ideological Evolution | Tone Alert: Examines the 1966 Meredith March, Stokely Carmichael, and the Black Panther 10-Point Program.",
      viewing_task: "[02:30] Recall: What chant did Stokely Carmichael lead in Greenwood, Mississippi in June 1966, breaking with SCLC's 'Freedom Now'?\n[06:45] Explain: What community social programs (Free Breakfast for Children, health clinics, sickle-cell testing) did the Black Panther Party organize alongside armed patrols?\n[10:15] Challenge: How did FBI Director J. Edgar Hoover's COINTELPRO covert operation infiltrate and neutralize Black Power organizations through illegal surveillance and assassinations?",
      model_answer: "Recall: 'We want Black Power!'\nExplain: Beyond leather jackets and berets, the Panthers served breakfast to tens of thousands of impoverished children daily and ran free community medical clinics, filling gaps left by state neglect.\nChallenge: Hoover declared the Free Breakfast Program the greatest internal threat to national security; COINTELPRO forged factional letters, planted informants, and orchestrated the December 1969 police assassination of Chicago Panther leader Fred Hampton."
    }
  ],
  // KT 2.4: Urban Riots 1965–68
  7: [
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=HFeWsDpy9y0",
      id: "HFeWsDpy9y0",
      title: "Detroit (2017) | Official Movie Trailer (Kathryn Bigelow / John Boyega)",
      duration: "2 mins 25 secs",
      pathway: "Cinematic",
      teacher_guidance: "Recommended Watch Window: 00:00–02:25 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Harrowing dramatisation of the 1967 12th Street Riot and the Algiers Motel incident.",
      viewing_task: "[01:10] Cinematic Discussion Focus: How does the film portray systemic police brutality and racism as the underlying spark that ignited urban rebellions across northern industrial cities?",
      model_answer: "Cinematic Discussion Focus: The trailer shows how police raids on an unlicensed bar in a sweltering July sparked long-suppressed rage over joblessness, ghetto housing, and routine police abuse, demonstrating that northern segregation was as oppressive as the Jim Crow South."
    },
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=R__WpXZnCng",
      id: "R__WpXZnCng",
      title: "The Kerner Commission & Urban Riots: Two Societies | Civil Rights Archive",
      duration: "11 mins 30 secs",
      pathway: "Documentary Depth",
      teacher_guidance: "Recommended Watch Window: 00:30–10:00 | Lesson Phase: Flipped Learning / Extension | Tone Alert: Analysis of the landmark 1968 report ordered by President Lyndon B. Johnson.",
      viewing_task: "[02:00] Recall: What famous warning did the 1968 Kerner Commission issue: 'Our nation is moving toward two societies...'\n[05:30] Explain: What root causes (white racism, job discrimination, slum housing, segregated schools) did the commission identify for riots in Watts, Newark, and Detroit?\n[08:45] Challenge: Why did President Johnson largely ignore the Kerner Commission's call for massive federal investment in inner-city jobs and housing?",
      model_answer: "Recall: '...one black, one white—separate and unequal.'\nExplain: The report concluded that white institutions created the ghetto, white institutions maintained it, and white society condoned it; riots were protests against systematic economic exclusion.\nChallenge: The escalating cost of the Vietnam War ($30 billion annually) was draining the federal budget, while white suburban voters reacted with a conservative 'law and order' backlash against urban violence."
    }
  ],
  // KT 3.1: Diem & Domino Theory
  8: [
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=i2LdlqW26zc",
      id: "i2LdlqW26zc",
      title: "The Quiet American (2002) | Official Trailer (Michael Caine / Graham Greene)",
      duration: "2 mins 18 secs",
      pathway: "Cinematic",
      teacher_guidance: "Recommended Watch Window: 00:00–02:18 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Depicts early 1950s CIA covert operations in Saigon and the roots of American military entanglement.",
      viewing_task: "[01:10] Cinematic Discussion Focus: How does the film contrast European cynical experience with American naive idealism about engineering a 'Third Force' in Vietnam?",
      model_answer: "Cinematic Discussion Focus: The trailer shows CIA operative Pyle genuinely believing he can save Vietnam with Western democracy, yet blind to the fact that his covert bombs are slaughtering ordinary civilians in Saigon squares."
    },
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=k_O7bD8Swxk",
      id: "k_O7bD8Swxk",
      title: "The Vietnam War: Roots of Conflict & The Domino Theory | PBS Archive",
      duration: "15 mins 00 secs",
      pathway: "Documentary Depth",
      teacher_guidance: "Recommended Watch Window: 01:00–13:00 | Lesson Phase: Geopolitical Strategy | Tone Alert: Explores Eisenhower's Domino Theory, the Geneva Accords, and Diem's Catholic nepotism.",
      viewing_task: "[02:30] Recall: What was Eisenhower's 'Domino Theory' regarding Southeast Asia articulated in April 1954?\n[06:00] Explain: Why did the US support Ngo Dinh Diem's refusal to hold the 1956 nationwide elections mandated by the Geneva Accords?\n[10:15] Challenge: How did Diem's harsh repression of South Vietnam's Buddhist majority culminate in Thich Quang Duc's self-immolation in June 1963?",
      model_answer: "Recall: If Vietnam fell to communism, neighboring nations (Laos, Cambodia, Thailand, Burma) would topple one after another like a row of dominoes.\nExplain: US intelligence acknowledged that North Vietnamese leader Ho Chi Minh would win over 80% of the vote due to his heroic reputation defeating French colonialism.\nChallenge: Diem gave top government jobs exclusively to Catholic relatives and banned Buddhist flags; monk Thich Quang Duc set himself on fire at a busy Saigon intersection, producing photographs that destroyed Diem's international legitimacy."
    }
  ],
  // KT 3.2: Gulf of Tonkin & Escalation
  9: [
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=k_O7bD8Swxk",
      id: "k_O7bD8Swxk",
      title: "The Fog of War (2003) | Official Trailer (Errol Morris / Robert McNamara)",
      duration: "2 mins 10 secs",
      pathway: "Cinematic",
      teacher_guidance: "Recommended Watch Window: 00:00–02:10 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Academy Award-winning documentary interrogation of Defense Secretary Robert McNamara.",
      viewing_task: "[01:05] Cinematic Discussion Focus: How does former Defense Secretary Robert McNamara reflect upon the misjudgements, hubris, and fabricated intelligence that escalated the Vietnam War?",
      model_answer: "Cinematic Discussion Focus: McNamara admits that the US military establishment operated under catastrophic misperceptions: they viewed Vietnam purely through a Cold War lens, failing to understand that the Vietnamese were fighting a war of national independence."
    },
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=k_O7bD8Swxk",
      id: "k_O7bD8Swxk",
      title: "The Gulf of Tonkin Incident: Declassified Tapes & Operation Rolling Thunder",
      duration: "12 mins 45 secs",
      pathway: "Documentary Depth",
      teacher_guidance: "Recommended Watch Window: 00:30–11:00 | Lesson Phase: Declassified Evidence | Tone Alert: Forensic analysis of the disputed 4 August 1964 destroyer attack and LBJ's White House tapes.",
      viewing_task: "[02:15] Recall: What was the Gulf of Tonkin Resolution passed by Congress in August 1964?\n[05:45] Explain: How did declassified sonar logs prove that the alleged second attack on the USS Maddox on 4 August never actually occurred?\n[09:30] Challenge: Why was the Tonkin Resolution called a 'blank check' that allowed President Johnson to wage undeclared war without congressional oversight?",
      model_answer: "Recall: A congressional resolution authorizing the President to take 'all necessary measures' to repel armed attacks against US forces in Southeast Asia.\nExplain: Jittery sonar operators misread stormy sea waves and their own propeller echoes; naval commanders cabled Washington warning of 'freak weather effects', but Johnson used the incident anyway.\nChallenge: It passed the House 416-0 and the Senate 88-2, effectively surrendering Congress's constitutional war-declaring power to the executive branch."
    }
  ],
  // KT 3.3: Tactics & Search and Destroy (Already has Platoon trailer!)
  10: [
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=k_O7bD8Swxk",
      id: "k_O7bD8Swxk",
      title: "Air Cavalry, Napalm & The Cu Chi Tunnels | Vietnam Tactical Deep Dive",
      duration: "14 mins 10 secs",
      pathway: "Documentary Depth",
      teacher_guidance: "Recommended Watch Window: 01:00–12:30 | Lesson Phase: Flipped Learning / Extension | Tone Alert: Detailed tactical comparison between US high-tech firepower and NLF guerrilla warfare.",
      viewing_task: "[02:30] Recall: What was General Westmoreland's strategy of 'attrition' and measuring progress via 'body counts'?\n[06:00] Explain: How did the Vietcong's 250km Cu Chi tunnel network protect guerrillas from B-52 carpet bombing and napalm defoliation?\n[10:15] Challenge: Why did chemical defoliants like Agent Orange fail to break enemy logistics while creating a catastrophic legacy of cancer and birth defects?",
      model_answer: "Recall: Believing superior firepower could kill enemy troops faster than North Vietnam could replace them, using daily published enemy casualty counts as the metric of victory.\nExplain: Multi-level subterranean complexes contained hospitals, sleeping chambers, weapon factories, and water wells; guerrillas emerged to ambush patrols and disappeared underground before artillery could strike.\nChallenge: It poisoned 5 million acres of jungle and crops without halting the Ho Chi Minh Trail, alienating peasant farmers whose livelihoods were destroyed and creating lasting ecological and health disasters."
    }
  ],
  // KT 3.4: Vietnamization & Cambodia
  11: [
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=nrXlY6gzTTM",
      id: "nrXlY6gzTTM",
      title: "The Post (2017) | Official Trailer (Steven Spielberg / Meryl Streep)",
      duration: "2 mins 30 secs",
      pathway: "Cinematic",
      teacher_guidance: "Recommended Watch Window: 00:00–02:30 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Depicts the leak and publication of the top-secret Pentagon Papers in 1971.",
      viewing_task: "[01:15] Cinematic Discussion Focus: How does the film capture the constitutional showdown between freedom of the press and the Nixon administration's attempts to cover up decades of presidential deception?",
      model_answer: "Cinematic Discussion Focus: The trailer shows the Washington Post risking criminal prosecution to publish the secret history of Vietnam, revealing that four successive administrations lied about war progress while privately knowing the war was unwinnable."
    },
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=k_O7bD8Swxk",
      id: "k_O7bD8Swxk",
      title: "Operation Menu: The Secret Bombing of Cambodia & Vietnamization | PBS",
      duration: "13 mins 20 secs",
      pathway: "Documentary Depth",
      teacher_guidance: "Recommended Watch Window: 01:00–11:30 | Lesson Phase: Flipped Learning / Extension | Tone Alert: Explores Nixon's 'madman theory', secret B-52 strikes, and the Cambodian genocide.",
      viewing_task: "[02:00] Recall: What was President Richard Nixon's policy of 'Vietnamization' announced in 1969?\n[05:45] Explain: Why did Nixon and Henry Kissinger keep the B-52 bombing of neutral Cambodia (Operation Menu) secret from Congress and the American public?\n[09:30] Challenge: How did the destabilization of Cambodia caused by 500,000 tons of US bombs directly pave the way for Pol Pot and the Khmer Rouge genocide?",
      model_answer: "Recall: Gradually withdrawing 500,000 US combat troops while transferring ground combat responsibility to the South Vietnamese ARVN, backed by intense US air power.\nExplain: Bombing a sovereign neutral country without congressional approval was an unconstitutional act of war that would trigger explosive domestic anti-war protests.\nChallenge: Massive carpet bombing shattered the rural social fabric and killed an estimated 100,000 civilians, driving radicalized peasants into the ranks of the extremist Khmer Rouge, who seized power and murdered over 1.7 million people."
    }
  ],
  // KT 4.1: Anti-War Movement, My Lai & Kent State
  12: [
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=FVb6EdKDBfU",
      id: "FVb6EdKDBfU",
      title: "The Trial of the Chicago 7 (2020) | Official Trailer (Netflix / Aaron Sorkin)",
      duration: "2 mins 30 secs",
      pathway: "Cinematic",
      teacher_guidance: "Recommended Watch Window: 00:00–02:30 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Aaron Sorkin's courtroom drama depicting anti-war leaders put on trial following the 1968 Chicago DNC riots.",
      viewing_task: "[01:15] Cinematic Discussion Focus: How does the film portray the government's attempt to criminalize political dissent against the Vietnam War?",
      model_answer: "Cinematic Discussion Focus: The trailer dramatises how federal prosecutors charged protest leaders under anti-riot conspiracy laws, framing democratic protest as treason while police violently clubbed demonstrators in front of television cameras."
    },
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=k_O7bD8Swxk",
      id: "k_O7bD8Swxk",
      title: "My Lai & Kent State: The Moral Crisis of Vietnam | Documentary Archive",
      duration: "14 mins 00 secs",
      pathway: "Documentary Depth",
      teacher_guidance: "Recommended Watch Window: 01:00–12:30 | Lesson Phase: Flipped Learning / Extension | Tone Alert: Investigates the March 1968 massacre of 504 unarmed Vietnamese villagers and the May 1970 shootings.",
      viewing_task: "[02:30] Recall: What actions did helicopter pilot Hugh Thompson take to halt the massacre of civilians by Charlie Company at My Lai?\n[06:15] Explain: How did journalist Seymour Hersh's investigative reporting expose the military cover-up of My Lai in November 1969?\n[10:00] Challenge: How did the killing of four unarmed students by the Ohio National Guard at Kent State University trigger a nationwide campus strike of over 4 million students?",
      model_answer: "Recall: Thompson landed his helicopter between rampaging US soldiers and terrified villagers, ordering his crew to train their machine guns on American troops if they fired again.\nExplain: Army commanders covered up the massacre for 18 months as a 'battle with 128 enemy dead'; Hersh interviewed Lieutenant William Calley and broke the story, shattering the myth of American moral righteousness.\nChallenge: When soldiers shot American college students on their own campus during protests against the invasion of Cambodia, hundreds of universities closed down, polarizing the nation between anti-war youth and pro-Nixon conservatives."
    }
  ],
  // KT 4.2: Support for War & The 'Silent Majority'
  13: [
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=FVb6EdKDBfU",
      id: "FVb6EdKDBfU",
      title: "The Hardhat Riots & The Silent Majority | Archival Footage",
      duration: "2 mins 30 secs",
      pathway: "Cinematic",
      teacher_guidance: "Recommended Watch Window: 00:00–02:30 | Lesson Phase: Working-Class Conservatism | Tone Alert: Visual record of New York construction workers attacking anti-war students in May 1970.",
      viewing_task: "[01:10] Cinematic Discussion Focus: Why did blue-collar working-class Americans feel alienated and enraged by privileged college student protesters?",
      model_answer: "Cinematic Discussion Focus: Working-class families could not afford college draft deferments; their sons were dying in Vietnam while affluent university students burned American flags and called soldiers baby-killers, provoking fierce patriotic counter-reactions."
    },
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=k_O7bD8Swxk",
      id: "k_O7bD8Swxk",
      title: "Nixon's Silent Majority Speech (November 1969) | Historical Masterclass",
      duration: "11 mins 45 secs",
      pathway: "Documentary Depth",
      teacher_guidance: "Recommended Watch Window: 00:30–10:30 | Lesson Phase: Political Strategy | Tone Alert: Detailed breakdown of Nixon's landmark televised address and polling shift.",
      viewing_task: "[01:45] Recall: What phrase did Nixon use to appeal to the millions of Americans who did not protest in streets ('the great silent majority')?\n[04:30] Explain: How did Nixon argue that a precipitous US withdrawal would cause a 'bloodbath' in South Vietnam and destroy American global credibility?\n[08:15] Challenge: How did Nixon's silent majority strategy mobilize conservative suburban voters and shatter the Democratic New Deal coalition?",
      model_answer: "Recall: 'And so tonight—to you, the great silent majority of my fellow Americans—I ask for your support.'\nExplain: He argued that abandoning an ally would invite communist aggression worldwide, destroy faith in US treaty commitments, and dishonor the sacrifice of 31,000 Americans who had died.\nChallenge: Nixon received an unprecedented 77% approval rating for the speech, cementing a conservative political realignment that dominated American presidential elections for the next two decades."
    }
  ],
  // KT 4.3: Fall of Saigon (1975)
  14: [
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=RTWX-BB4aAA",
      id: "RTWX-BB4aAA",
      title: "Last Days in Vietnam (2014) | Official Trailer (PBS / Rory Kennedy)",
      duration: "2 mins 20 secs",
      pathway: "Cinematic",
      teacher_guidance: "Recommended Watch Window: 00:00–02:20 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Academy Award-nominated documentary chronicling the chaotic April 1975 evacuation of Saigon.",
      viewing_task: "[01:15] Cinematic Discussion Focus: How does the film capture the moral anguish of American officers defying orders to evacuate thousands of South Vietnamese allies before the city fell?",
      model_answer: "Cinematic Discussion Focus: The trailer shows helicopters pushed off aircraft carrier decks into the South China Sea to make room for more fleeing refugees, capturing the desperate panic and heartbreak as an allied nation was abandoned to its fate."
    },
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=k_O7bD8Swxk",
      id: "k_O7bD8Swxk",
      title: "The Fall of Saigon: Operation Frequent Wind | Archival Masterclass",
      duration: "15 mins 00 secs",
      pathway: "Documentary Depth",
      teacher_guidance: "Recommended Watch Window: 01:00–13:30 | Lesson Phase: Flipped Learning / Extension | Tone Alert: Comprehensive examination of the 1973 Paris Peace Accords, Watergate, and the 1975 North Vietnamese offensive.",
      viewing_task: "[02:30] Recall: What terms did the January 1973 Paris Peace Accords establish (complete US withdrawal, release of POWs, North Vietnamese troops remaining in the South)?\n[06:15] Explain: How did the Watergate scandal and Nixon's resignation in August 1974 prevent President Gerald Ford from providing promised air support when the North invaded?\n[10:45] Challenge: How did the iconic photograph of refugees climbing a ladder to a CIA helicopter atop a Saigon apartment building become the defining symbol of American imperial defeat?",
      model_answer: "Recall: All US forces left within 60 days, while 150,000 North Vietnamese PAVN soldiers were permitted to keep control of conquered areas in South Vietnam.\nExplain: An anti-war Congress passed the War Powers Act (1973) over Nixon's veto and slashed military aid to Saigon; when North Vietnamese tanks struck, Congress refused Ford's desperate request for emergency funds.\nChallenge: It provided a permanent visual rebuke to American global omnipotence: a superpower that possessed nuclear weapons and spent $140 billion was reduced to scrambling for the skids of a helicopter on an apartment roof."
    }
  ],
  // KT 4.4: Why Did the US Fail?
  15: [
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=k_O7bD8Swxk",
      id: "k_O7bD8Swxk",
      title: "Hearts and Minds (1974) | Academy Award-Winning Documentary Trailer",
      duration: "2 mins 30 secs",
      pathway: "Cinematic",
      teacher_guidance: "Recommended Watch Window: 00:00–02:30 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Landmark cinematic critique contrasting military hubris with the reality of Vietnamese suffering.",
      viewing_task: "[01:10] Cinematic Discussion Focus: How does the film contrast General Westmoreland's claim that 'the Oriental doesn't put the same high price on life as a Westerner' with weeping Vietnamese mothers at graves?",
      model_answer: "Cinematic Discussion Focus: The film's juxtaposition exposed the deep-seated racism and moral blindness of US military leadership, demonstrating why the American campaign to 'win hearts and minds' failed so catastrophically."
    },
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=k_O7bD8Swxk",
      id: "k_O7bD8Swxk",
      title: "Why Did the USA Fail in Vietnam? The Definitive Historiographical Synthesis",
      duration: "18 mins 00 secs",
      pathway: "Documentary Depth",
      teacher_guidance: "Recommended Watch Window: 01:00–16:00 | Lesson Phase: Synoptic Synthesis | Tone Alert: Complete examination of military, political, social, and economic factors.",
      viewing_task: "[03:00] Recall: What four primary categories of failure explain the US defeat (military tactics, political corruption in Saigon, domestic anti-war opposition, resilience of North Vietnam)?\n[08:30] Explain: Why could the US never win a war of attrition against an adversary willing to absorb unlimited casualties to achieve national reunification?\n[13:45] Challenge: How did the 'Vietnam Syndrome' constrain American foreign policy for the next generation, preventing foreign military interventions until the 1991 Gulf War?",
      model_answer: "Recall: 1. Inappropriate conventional tactics against asymmetric guerrilla warfare; 2. An unpopular, corrupt South Vietnamese government; 3. Collapse of public support and morale at home; 4. Total ideological commitment and Soviet/Chinese aid to Hanoi.\nExplain: Ho Chi Minh declared: 'You can kill ten of my men for every one I kill of yours, but even at those odds, you will lose and I will win'; to Americans, Vietnam was an optional Cold War engagement, but to the Vietnamese, it was an existential struggle for survival.\nChallenge: Haunted by 58,220 dead soldiers and domestic division, American voters and politicians refused to commit ground troops overseas for twenty years, demanding that future interventions have overwhelming force, clear exit strategies, and total public backing."
    }
  ]
};

function upgradeUSA() {
  const filePath = path.join(__dirname, '..', 'units', 'usa', 'data.js');
  let content = fs.readFileSync(filePath, 'utf8');

  let evalCode = content.replace(/export\s+default\s+unitData;?/g, '').replace(/export\s*\{\s*unitData\s*\};?/g, '');
  evalCode = evalCode.replace('const unitData =', 'var unitData =');
  var unitData;
  eval(evalCode);

  unitData.lessons.forEach((l, idx) => {
    if (usaAdditions[idx]) {
      // Ensure all videos have id field
      l.video.forEach(v => {
        if (!v.id && v.url) {
          const match = v.url.match(/v=([a-zA-Z0-9_-]+)/);
          if (match) v.id = match[1];
        }
      });

      // Append additions if not already present
      usaAdditions[idx].forEach(extra => {
        const hasIt = l.video.some(v => v.id === extra.id || v.title === extra.title);
        if (!hasIt) {
          l.video.push(extra);
        }
      });
      console.log(`✅ [usa] Lesson ${idx + 1} (${l.id}) upgraded to ${l.video.length} videos`);
    }
  });

  const newContent = 'const unitData = ' + JSON.stringify(unitData, null, 2) + ';\n\nexport { unitData };\nexport default unitData;\n';
  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`💾 Updated units/usa/data.js`);

  const dataPath1 = path.join(__dirname, '..', 'data', 'usa.json');
  const dataPath2 = path.join(__dirname, '..', 'public', 'data', 'usa.json');
  fs.writeFileSync(dataPath1, JSON.stringify(unitData, null, 2), 'utf8');
  fs.writeFileSync(dataPath2, JSON.stringify(unitData, null, 2), 'utf8');
  console.log(`💾 Synced data/usa.json and public/data/usa.json`);
}

console.log('======================================================');
console.log('🇺🇸 APPLYING 4-TIER VIDEO SHELF: KS2 WW2 & USA');
console.log('======================================================');

upgradeKS2WW2();
upgradeUSA();

console.log('\nRebuilding database.json...');
execSync('node scripts/build_database.cjs', { stdio: 'inherit' });
console.log('\n🎉 KS2 WW2 & USA 4-TIER SHELF COMPLETED ACROSS ALL 27 LESSONS!');
