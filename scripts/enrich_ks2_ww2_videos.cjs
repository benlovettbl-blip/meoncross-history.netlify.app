const fs = require('fs');
const path = require('path');

// Helper to convert duration string to seconds for reliable sorting
function parseDurationSecs(dur) {
  if (!dur) return 999999;
  let secs = 0;
  const hrMatch = dur.match(/(\d+)\s*hr/i);
  const minMatch = dur.match(/(\d+)\s*min/i);
  const secMatch = dur.match(/(\d+)\s*sec/i);
  if (hrMatch) secs += parseInt(hrMatch[1], 10) * 3600;
  if (minMatch) secs += parseInt(minMatch[1], 10) * 60;
  if (secMatch) secs += parseInt(secMatch[1], 10);
  return secs > 0 ? secs : 999999;
}

const enrichedKs2Videos = {
  lesson_1: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=t2qlZHW-fDI',
      title: 'Neville Chamberlain: Declaration of War (3 September 1939)',
      duration: '50 secs',
      teacher_guidance:
        "Primary audio-visual record of Prime Minister Neville Chamberlain's 11:15 am radio broadcast from 10 Downing Street. Prepare pupils to listen to the sombre tone and the solemn announcement that Britain was at war with Germany following the invasion of Poland.",
      viewing_task:
        'Listen to the exact words Prime Minister Chamberlain spoke from 10 Downing Street. How does his tone of voice convey the gravity of the situation, and what ultimatum had expired?',
      model_answer:
        "Prime Minister Neville Chamberlain spoke in a solemn, grave, and sorrowful voice to the British public. He explained that the British government had delivered a final ultimatum demanding that Nazi Germany withdraw its invading troops from Poland by 11:00 am. Because no reply was received from Berlin, Chamberlain announced with deep regret that 'this country is at war with Germany', marking the formal start of the Second World War.",
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=GCPAeD1K6To',
      title: 'How to Fit a Gas Mask (1939) | Air Raid Precautions',
      duration: '1 min 57 secs',
      teacher_guidance:
        'Archival public information film showing civil defence wardens demonstrating the fitting of civilian gas masks issued to men, women, and children across Britain in 1939. Highlight to pupils why civilians were required to carry these cardboard boxes everywhere.',
      viewing_task:
        'Watch how the rubber gas mask was fitted over the face. Why was it vital to check the airtight seal around the cheeks and chin, and how was it tested?',
      model_answer:
        'The rubber gas mask had to fit tightly against the face so that deadly poison gas could not leak in around the edges of the cheeks or under the chin. Civilians were instructed to pull the elastic harness straps firmly over the head and test the airtight seal by placing their palm over the filter inlet; if the mask collapsed slightly against the face when inhaling, the seal was completely secure, ensuring all air was safely drawn through the protective charcoal filter.',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=i234eVT_P8Q',
      title: 'Britain Declares War on Germany | BBC Teach',
      duration: '4 mins 51 secs',
      teacher_guidance:
        "Superb BBC educational overview exploring how Britain mobilized for war in September 1939. Covers Chamberlain's radio broadcast, the instantaneous sounding of the first air raid sirens in London, blackout regulations, and civilian preparations.",
      viewing_task:
        'What reasons did Neville Chamberlain give for declaring war, and what dramatic event occurred across London within minutes of his broadcast finishing?',
      model_answer:
        "Chamberlain explained that Britain had guaranteed Poland's independence and that Adolf Hitler's refusal to halt the German military invasion left Britain with no choice but to honour its treaty obligations. Within fifteen minutes of the radio broadcast ending, London's air raid sirens wailed across the capital, creating immediate alarm as millions of citizens, ARP wardens, and families rushed to shelters with their gas masks, expecting an immediate aerial bombardment.",
    },
  ],
  lesson_2: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=HFBlvWkNEKU',
      title: 'A Day in the Life of a 10-Year-Old Evacuee | BBC Hands On History',
      duration: '2 mins 31 secs',
      teacher_guidance:
        'Lively primary-focused dramatisation following a 10-year-old child experiencing Operation Pied Piper. Prompt pupils to observe the luggage label, the essential items packed in the small suitcase, and the emotional separation from parents at railway stations.',
      viewing_task:
        'What belongings was the young evacuee allowed to pack, and what label did they wear around their neck?',
      model_answer:
        'The young evacuee was allowed only a small suitcase packed with essential clothing: a warm coat, change of underwear, socks, a toothbrush, soap, and their gas mask in a cardboard box hung with string. Around their neck, every child wore an official luggage label displaying their name, home address, school, and destination billeting code so they could be identified upon arrival.',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=Wvgojxu2hp4',
      title: 'The Lives of WW2 Evacuees | Hunting for History | BBC Teach',
      duration: '6 mins 19 secs',
      teacher_guidance:
        'Historical investigation examining real archival evidence from Operation Pied Piper in September 1939. Teachers should guide pupils to analyze how historians use billeting forms, school registers, and evacuee letters to uncover contrasting rural experiences.',
      viewing_task:
        'What historical primary sources does the historian examine to find out what life was like for evacuees arriving in the countryside?',
      model_answer:
        "The historian examines original primary sources including local billeting officers' ledgers, school registration logs, letters written home by evacuees, and period photographs of village halls. These sources show that while many children experienced cultural shock—encountering farm animals, outside toilets, and unfamiliar food for the first time—many formed lifelong bonds with their host families, while others found the separation deeply distressing.",
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=0SYDBJAwYCI',
      title: "An Evacuee's Adventure | History - Children of World War Two | BBC Teach",
      duration: '9 mins 41 secs',
      teacher_guidance:
        'Oral history documentary following real wartime evacuee Betty as she revisits her evacuation destination in the Welsh valleys. Excellent for exploring emotional empathy, social differences between industrial cities and rural villages, and host family dynamics.',
      viewing_task:
        'Watch Betty retrace her journey from Cardiff to Aberdare. How did she feel when she arrived at the village hall to be chosen by a host family?',
      model_answer:
        "Betty describes feeling anxious, bewildered, and self-conscious as she sat in the crowded village hall while prospective foster families walked along the rows picking out children ('I'll take that one'). Despite her initial fear of the unknown, Betty was relieved and comforted when she was chosen by a warm, welcoming Welsh mining family who treated her like their own daughter, giving her fresh food and introducing her to valley community life.",
    },
  ],
  lesson_3: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=JXrCnJppIUM',
      title: 'Kindertransport: How It Happened | Safe Passage',
      duration: '3 mins 20 secs',
      teacher_guidance:
        'Animated documentary explaining the origins of the Kindertransport following the Kristallnacht pogrom of November 1938. Use to introduce Key Stage 2 pupils gently to refugee history, humanitarian rescue efforts, and the arrival at London Liverpool Street.',
      viewing_task:
        'How many children escaped on the Kindertransport between December 1938 and September 1939, and where did their trains arrive in London?',
      model_answer:
        'Between December 1938 and the outbreak of war in September 1939, the Kindertransport rescued nearly 10,000 predominantly Jewish unaccompanied children from Nazi Germany, Austria, Czechoslovakia, and Poland. After travelling by train across Europe and ferry across the North Sea to Harwich, the children arrived at Liverpool Street Station in London, where volunteer committees and British foster families met them.',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=-KkElrPdA_I',
      title: 'Trude’s Story: Escaping Nazi-Occupied Czechoslovakia | BBC Teach',
      duration: '3 mins 40 secs',
      teacher_guidance:
        "Gentle animated testimony of survivor Trude, who was sent from Prague to Britain on a Kindertransport organized by Nicholas Winton. Highlights the sacrifice of parents who said goodbye on station platforms to save their children's lives.",
      viewing_task:
        'Watch the animated story of Trude. Why did her parents decide to put her on a train to Britain, and what was her journey like?',
      model_answer:
        "Trude's parents realized their family was in mortal danger after Nazi German forces occupied Czechoslovakia in early 1939. To save her life, they made the heartbreaking sacrifice of securing her a seat on a rescue train. Trude packed a small suitcase, said goodbye to her parents at Prague main railway station, and endured a long, anxious train journey through Germany to the coast, eventually finding safety with a caring foster family in England.",
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=Era_O5PS0bA',
      title: "Ruth's Story: Escaping the Nazis as War Began | BBC Teach",
      duration: '5 mins 49 secs',
      teacher_guidance:
        "Poignant animated oral history of Ruth, who escaped Nazi persecution as borders closed across Europe. Focus pupils' attention on the dramatic timeline and the coincidence of arriving in Britain exactly as the war began.",
      viewing_task:
        'How did Ruth and her mother manage to escape from Germany, and on what historic date did she finally arrive in Britain?',
      model_answer:
        'Ruth and her family faced intensifying anti-Jewish persecution, forcing them to secure emergency travel papers and visas before Nazi borders sealed shut. They caught one of the very last civilian trains out of Germany into the Netherlands and boarded a cross-channel ferry, stepping onto British soil on Sunday 3 September 1939—the very morning Neville Chamberlain declared war over the radio.',
    },
  ],
  lesson_4: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=rHyxP3epU-w',
      title: 'Your Anderson Shelter This Winter (1940) | British Pathé',
      duration: '2 mins 16 secs',
      teacher_guidance:
        'Authentic 1940 Ministry of Home Security newsreel offering advice to householders on weatherproofing Anderson shelters. Emphasize how families adapted corrugated iron shelters with drainage, bunks, and earth banks against blast shockwaves.',
      viewing_task:
        'How were corrugated steel Anderson shelters adapted by families to keep them warm and dry during winter bombings?',
      model_answer:
        'Anderson shelters, made from six curved corrugated steel panels bolted together and sunk three feet into garden soil, were adapted for winter by mounding at least fifteen inches of earth over the top and sides to absorb bomb blasts. To combat flooding and dampness, families dug drainage sumps at the entrance, laid wooden floorboards, fitted tiered bunk beds, and insulated the interior with rugs, blankets, and hot water bottles.',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=1VwY_UxXkYU',
      title: 'The Blitz (1940–1941) | Simple History',
      duration: '3 mins 41 secs',
      teacher_guidance:
        'Concise animated overview of the 1940–1941 German bombing campaign against British industrial centres and ports. Explains the transition from daylight fighter battles to nighttime city bombing, blackout enforcement, and civilian fortitude.',
      viewing_task:
        'Why did the German Luftwaffe switch to bombing British cities, and which cities were most heavily targeted?',
      model_answer:
        "After failing to destroy RAF Fighter Command during the daylight air battles of the Battle of Britain in summer 1940, the German Luftwaffe switched to nocturnal bombing ('The Blitz'). Hitler aimed to shatter civilian morale, demolish vital manufacturing factories, and wreck docks and ports. London was bombed for 57 consecutive nights, alongside major industrial and naval centres including Coventry, Liverpool, Birmingham, Plymouth, and Glasgow.",
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=4idj7fI6OZg',
      title: 'Living Through Air Raids | History - Children of World War Two | BBC Teach',
      duration: '9 mins 54 secs',
      teacher_guidance:
        'Evocative documentary featuring firsthand memories of children who lived through the Blitz. Explores the eerie wail of air raid sirens, searchlight beams, anti-aircraft artillery noise, and community resilience in public shelters.',
      viewing_task:
        'Listen to Alan describe how his family took cover when the sirens wailed. What was life like spending nights inside an air raid shelter?',
      model_answer:
        "Alan recounts how his family grabbed their emergency bags and rushed to their shelter as soon as the warning sirens wailed. Spending the night in the shelter was cold, cramped, and terrifying due to the deafening roar of aircraft engines, exploding bombs, and shaking ground. However, families demonstrated incredible resilience: neighbours sang songs, shared hot tea from thermoses, played card games, and comforted children to keep spirits high until the 'all-clear' siren sounded.",
    },
  ],
  lesson_5: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=JMS0_R4pguw',
      title: 'Digging For Victory (1940) | British Pathé',
      duration: '2 mins 04 secs',
      teacher_guidance:
        "Archival newsreel illustrating the nationwide 'Dig for Victory' campaign led by the Ministry of Agriculture. Encourage pupils to look for famous public landmarks and green spaces converted into productive vegetable plots.",
      viewing_task:
        'Notice where ordinary citizens are digging. What unexpected spaces were converted into allotments?',
      model_answer:
        'Citizens across Britain converted virtually every available patch of green open space into vegetable gardens. The newsreel shows public parks, front and back flower beds, sports pitches, golf courses, railway verges, and even the moat of the Tower of London being ploughed and turned into thriving allotments to grow potatoes, cabbages, carrots, and onions.',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=35NpLveVZDg',
      title: 'Dig For Victory | Imperial War Museums',
      duration: '5 mins 59 secs',
      teacher_guidance:
        'In-depth Imperial War Museum curator talk explaining the strategic necessity of food rationing and domestic cultivation. Explains how German U-boats targeted Atlantic supply convoys, making self-sufficiency essential for survival.',
      viewing_task:
        'Why did the government urge millions of people to turn their lawns, parks, and flower beds into vegetable patches?',
      model_answer:
        "Before 1939, Britain imported over 70% of its food (55 million tons annually) by merchant shipping. When German U-boat submarines began sinking merchant convoys in the Battle of the Atlantic, food imports plummeted, threatening the country with starvation. The government launched 'Dig for Victory' so that domestic food production would reduce shipping dependency, freeing up merchant vessels to transport troops, weapons, and ammunition instead.",
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=DuO1CYsPf_M',
      title: "A Soldier's Daughter: Rationing & The Home Front | BBC Teach",
      duration: '9 mins 30 secs',
      teacher_guidance:
        "Rich primary-focused oral history exploring daily domestic life under food rationing. Illustrates the use of ration books, points systems, queues, and creative wartime recipes like 'Woolton Pie' and egg substitutes.",
      viewing_task:
        'How did food rationing change what Sarah and her family could eat each week in Bolton?',
      model_answer:
        "Rationing strictly limited the weekly quantities of staple foods Sarah's family could buy: each person received only one fresh egg per fortnight, 50g of butter, 100g of bacon, and limited sugar and tea. Her mother had to register with specific local grocers, hand over ration book coupons, and queue patiently for hours. Meals had to be stretched using homegrown vegetables, powdered dried eggs, and creative substitutes like potato-based stews.",
    },
  ],
  lesson_6: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=Z8FrnZwysEs',
      title: "Britain's Land Girls | BBC World Service",
      duration: '3 mins 27 secs',
      teacher_guidance:
        "Focuses on the Women's Land Army (WLA) and their vital agricultural labour. Teachers should draw attention to how tens of thousands of young urban women volunteered or were conscripted to work on farms, overcoming hard physical labour.",
      viewing_task: "What duties did members of the Women's Land Army perform on British farms?",
      model_answer:
        "Members of the Women's Land Army carried out grueling manual farm labour that had previously been done by male agricultural workers called into the armed forces. 'Land Girls' ploughed fields using tractors and heavy horses, milked cows by hand at dawn, planted and harvested wheat and potatoes, caught vermin and rats, and worked in forestry (the 'Lumber Jills') felling trees to produce timber for pit props and aircraft.",
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=oWF_Ylaq8Eg',
      title: "Women's Roles in World War Two | BBC Newsround",
      duration: '4 mins 41 secs',
      teacher_guidance:
        'Comprehensive Newsround explainer on the diverse mobilization of British women. Covers factory work, aircraft assembly, civil defence, firefighting, the auxiliary armed services (ATS, WAAF, WRNS), and espionage.',
      viewing_task:
        'What jobs did women take on to replace men who were called up to fight in the armed forces?',
      model_answer:
        'Women stepped into essential national roles across the economy and military. In industry, they assembled Spitfires and Lancaster bombers in aircraft factories and manufactured shells in hazardous munitions plants. In civil defence, they served as air raid wardens, ambulance drivers, and firefighters. Thousands also joined the armed auxiliary services (ATS, WRNS, WAAF), operating radar stations, anti-aircraft searchlights, and decoding top-secret enemy signals at Bletchley Park.',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=GOhYrBQFSTQ',
      title: 'What Did Queen Elizabeth II Do in the Second World War? | Imperial War Museums',
      duration: '8 mins 34 secs',
      teacher_guidance:
        'Fascinating IWM archive study exploring the wartime service of Princess Elizabeth (later Queen Elizabeth II). Shows her radio broadcast to evacuated children in 1940 and her military enlistment in the Auxiliary Territorial Service (ATS) in 1945.',
      viewing_task:
        'What military training did Princess Elizabeth undergo when she joined the Auxiliary Territorial Service (ATS) in 1945?',
      model_answer:
        'In early 1945, at age 18, Princess Elizabeth joined the Auxiliary Territorial Service (ATS) as Subaltern Elizabeth Windsor (Service No. 230873). She trained at the mechanical transport training centre in Aldershot, learning how to deconstruct and rebuild heavy vehicle engines, change lorry tyres, service spark plugs, and drive military ambulances and trucks in blackout conditions, making her the first female member of the Royal Family to serve on active military duty.',
    },
  ],
  lesson_7: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=N-kHHGAT2AE',
      title: 'What Was the Holocaust? | BBC Newsround',
      duration: '2 mins 59 secs',
      teacher_guidance:
        'Age-appropriate, sensitive Newsround explainer on the history of Nazi prejudice and persecution. Frame the discussion around civil rights, discrimination, and the importance of remembering historical injustice to promote tolerance and inclusion.',
      viewing_task:
        'How does Newsround explain the persecution of minorities in Nazi Germany, and why is this history remembered today?',
      model_answer:
        "Newsround explains that the Nazi regime, led by Adolf Hitler, promoted hateful propaganda that blamed Jewish people, Romani people, disabled people, and other minority groups for Germany's problems. The Nazis stripped these citizens of their human rights, separated them from society, and ultimately murdered six million Jewish people. This history is remembered annually on Holocaust Memorial Day so modern society learns from the past, combats hatred and prejudice, and protects human rights.",
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=ZDIXugTLGts',
      title: 'Heinz’s Story: Escaping to Britain from Kristallnacht | BBC Teach',
      duration: '5 mins 39 secs',
      teacher_guidance:
        'Powerful animated testimony of Heinz Skyte, who grew up in Nuremberg. Explores how everyday life gradually deteriorated under the Nuremberg Laws (1935) before culminating in the terrifying violence of Kristallnacht (the November Pogrom 1938).',
      viewing_task:
        'Watch the animated account of Heinz Skyte. How did his childhood in Nuremberg change after the Nazis came to power in 1933?',
      model_answer:
        'Heinz explains that following the Nazi takeover, his rights and dignity were eroded step-by-step: he was banned from local swimming pools and sports clubs, shunned by non-Jewish school friends, and forced to leave mainstream school. On the night of 9–10 November 1938 (Kristallnacht), Nazi Stormtroopers attacked his family home, ransacked their possessions, and arrested his father, convincing the family that they had to escape Germany immediately.',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=dl-PUfTBjzU',
      title: "Martin's Story: Childhood Experiences of a Holocaust Survivor | BBC Teach",
      duration: '5 mins 50 secs',
      teacher_guidance:
        'Animated oral history of Martin Stern, recounting his early childhood memories in Germany and the Netherlands. Excellent for discussing the psychological impact of exclusion, wearing the yellow Star of David, and the erosion of civic belonging.',
      viewing_task:
        'How does Martin describe the gradual loss of everyday freedoms for Jewish families in Germany before the war?',
      model_answer:
        "Martin describes how discriminatory Nazi legislation systematically closed off the outside world to Jewish children: they were forbidden from sitting on public park benches (marked 'For Aryans Only'), barred from playgrounds and public libraries, and forced to wear a yellow Star of David badge sewn onto their coats. Martin recalls the bewilderment and sadness of being treated as an outcast in his own neighbourhood simply because of his heritage.",
    },
  ],
  lesson_8: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=CspaXNkC2ec',
      title: 'How Did the Enigma Machine Work? | Science Museum',
      duration: '1 min 48 secs',
      teacher_guidance:
        'Clear scientific demonstration of the electromechanical Enigma cipher machine. Teachers can use this clip to illustrate the mechanical complexity of rotating rotors, plugboard cross-cabling, and the billions of possible cryptographic permutations.',
      viewing_task:
        'How did the typewriter keys, electric rotors, and plugboard work together to scramble German military messages?',
      model_answer:
        'When an operator pressed a letter on the keyboard, an electrical battery current passed through a front plugboard with cross-connected patch leads, then through three or four rotating cipher wheels (rotors), and finally through a reflector plate. Because the rotors stepped forward with every keystroke, the electrical circuit changed constantly, transforming a single letter into one of roughly 158 million million million possible cipher combinations, making manual decryption impossible.',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=mXZNayEPFKc',
      title: "How Was Hitler's Enigma Machine Cracked? | Smithsonian Channel",
      duration: '3 mins 06 secs',
      teacher_guidance:
        "Dramatic documentary explaining how Alan Turing, Gordon Welchman, and mathematicians at Bletchley Park designed the electromechanical 'Bombe' machine to break German naval and military ciphers, shortening the war by an estimated two years.",
      viewing_task:
        "What role did Alan Turing and the electromechanical 'Bombe' machine play in decoding enemy communications at Bletchley Park?",
      model_answer:
        "Alan Turing designed the electromechanical 'Bombe' machine, which replicated thirty Enigma machines running in parallel. By searching for predictable phrases in enemy communications (known as 'cribs', such as weather reports ending with 'Heil Hitler'), the Bombe automatically eliminated millions of false rotor combinations in minutes, allowing Bletchley Park codebreakers to deduce the daily German cipher keys and decrypt thousands of top-secret 'Ultra' intelligence messages daily.",
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=iwoU7Mjvm4Q',
      title: 'What to Expect When You Visit Bletchley Park',
      duration: '3 mins 52 secs',
      teacher_guidance:
        'Virtual tour of the Bletchley Park estate (Station X) in Buckinghamshire. Highlights the wooden huts where thousands of civilian women and mathematicians worked in extreme secrecy, bound by the Official Secrets Act.',
      viewing_task:
        'Look at the wooden huts at Bletchley Park. Why were thousands of civilian women and mathematicians sworn to absolute secrecy about their work?',
      model_answer:
        'Over 10,000 personnel worked at Bletchley Park—nearly 75% of whom were civilian women (Wrens and civil servants) working in freezing, cramped wooden huts. They were sworn to total secrecy under the Official Secrets Act because if Nazi military commanders had discovered that Britain was intercepting and reading their encrypted Enigma communications, they would have altered their cipher procedures immediately, blinding Allied intelligence and costing thousands of Allied lives.',
    },
  ],
  lesson_9: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=6_nFuJAF5F0',
      title: "Sir Nicholas Winton: That's Life (1988) | BBC TV",
      duration: '1 min 39 secs',
      teacher_guidance:
        "Iconic British television moment from the BBC programme 'That's Life!' hosted by Esther Rantzen. Prepare pupils for an emotionally moving clip demonstrating how one individual's quiet courage in 1938–39 saved generations of lives.",
      viewing_task:
        'Watch the famous moment when presenter Esther Rantzen asks the studio audience who owes their life to Nicholas Winton. How do they react?',
      model_answer:
        'Nicholas Winton sits in the studio audience unaware that Esther Rantzen is holding his original 1939 scrapbook. When Rantzen asks if anyone in the audience owes their life to Nicholas Winton, the woman sitting beside him stands up and embraces him. When Rantzen repeats the question to the entire auditorium, every single person in the surrounding rows stands up in unison, revealing that they were the very children he had rescued from Prague fifty years earlier.',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=M1JEuQfMZfY',
      title: 'Sir Nicholas Winton: The Life of a Holocaust Hero | BBC News',
      duration: '1 min 59 secs',
      teacher_guidance:
        'Concise biographical tribute summarizing the humanitarian achievements of Sir Nicholas Winton. Highlights how he canceled a Swiss skiing holiday in December 1938 to travel to Prague and organize the Czech Kindertransport.',
      viewing_task:
        'What did Nicholas Winton do in Prague in the winter of 1938 to arrange the rescue of 669 children?',
      model_answer:
        'In December 1938, young stockbroker Nicholas Winton traveled to Prague, set up an improvised rescue office in his hotel room, and compiled lists of vulnerable refugee children living in squalid camps. Working tirelessly with British volunteers, he lobbied the Home Office for entry visas, raised the required £50 financial guarantee per child, located British foster homes, and organized eight railway transports across Europe to bring 669 children to safety in the UK.',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=6ethollg-PI',
      title: 'One Life: The Story of Nicholas Winton | Official Trailer',
      duration: '2 mins 00 secs',
      teacher_guidance:
        'Cinematic trailer from the feature film starring Anthony Hopkins and Johnny Flynn. Shows the perilous race against time faced by Nicholas Winton, Doreen Warriner, and Trevor Chadwick as the German army closed in on Prague.',
      viewing_task:
        "How does the trailer show the urgency of Trevor Chadwick and Nicholas Winton's mission before borders closed in September 1939?",
      model_answer:
        'The trailer dramatizes the desperate race against bureaucratic delays and looming war: the rescue team worked night and day securing official permits, stamping identity documents, and boarding children onto trains while Nazi officers and secret police watched closely. Their final, largest train carrying 250 children was scheduled for 1 September 1939—the day Germany invaded Poland—forcing borders shut and tragically preventing that train from departing.',
    },
  ],
  lesson_10: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=q97bEp8Q0Mg',
      title: 'Remembrance Day: What Is It & Why Is It Important? | BBC Newsround',
      duration: '1 min 38 secs',
      teacher_guidance:
        "Sensitive primary introduction to the symbolism of Remembrance Day, the two-minute silence on 11 November, and the red poppy inspired by John McCrae's poem 'In Flanders Fields'. Focus pupils on reflection and gratitude.",
      viewing_task:
        'Why is the red poppy used as a symbol of remembrance, and why is it important to remember those who lived through the war?',
      model_answer:
        'The red poppy is used as a universal symbol of remembrance because bright scarlet poppies were the first flowers to grow across the devastated battlefields of Flanders and the Somme after the First World War. We observe a two-minute silence on Remembrance Day (11 November) to pause, pay tribute to the millions of soldiers and civilians who lost their lives in wars, and remind ourselves of the vital importance of peace and resolving conflict without violence.',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=U_FZlpQqhMg',
      title: 'V.E. Celebrations (1945) | British Pathé',
      duration: '2 mins 10 secs',
      teacher_guidance:
        'Vibrant British Pathé archival newsreel capturing street parties, bonfires, dancing, and mass celebrations across Britain on Victory in Europe Day, 8 May 1945. Have pupils contrast this joy with the ongoing physical devastation of bombed neighbourhoods.',
      viewing_task:
        'Look at the archival footage of neighbourhood street parties. How did communities make the day special for children?',
      model_answer:
        'Despite wartime rationing and widespread bomb damage, communities pooled together to throw festive street parties: long rows of dining tables and chairs were brought out into the roads, decorated with homemade red, white, and blue paper bunting. Neighbours saved precious rationed sugar, flour, and butter to bake cakes, buns, and jelly for the children, while brass bands played, bonfires burned, and families danced the conga in the streets.',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=uOEdJGE_j9g',
      title: 'VE Day: What Is It & Why Do We Remember? | BBC Newsround',
      duration: '3 mins 26 secs',
      teacher_guidance:
        "Educational Newsround retrospective explaining the historical significance of 8 May 1945. Explains Winston Churchill's radio announcement, the crowds gathering at Buckingham Palace, and the mixed emotions of families mourning lost loved ones.",
      viewing_task:
        "What does 'VE Day' stand for, and how did people across Britain celebrate on 8 May 1945?",
      model_answer:
        "VE Day stands for 'Victory in Europe Day', marking Nazi Germany's unconditional surrender and the end of World War Two in Europe on 8 May 1945. Following Winston Churchill's radio broadcast, millions flooded city centres: vast crowds gathered outside Buckingham Palace chanting 'We want the King!', church bells rang across the country for the first time in years, streetlights were turned back on, and people celebrated the end of six years of blackout and bombardment.",
    },
  ],
  lesson_11: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=b3XaiHLObk8',
      title: 'After the War: Official Book Trailer | Barrington Stoke & Tom Palmer',
      duration: '1 min 05 secs',
      teacher_guidance:
        "Animated book trailer for Tom Palmer's acclaimed historical novel 'After the War'. Introduces the arrival of child Holocaust survivors at Calgarth Estate by Lake Windermere in August 1945, highlighting themes of trauma, friendship, and recovery.",
      viewing_task:
        'Watch the animated book trailer. What challenges do Yossi, Leo, and Mordecai face as they try to settle into their new lives in Cumbria?',
      model_answer:
        'The trailer illustrates the profound emotional and psychological challenges the boys face: although they have survived concentration camps, they are haunted by nightmarish memories, fear uniforms and shouting, and desperately yearn to discover if any family members survived. At Lake Windermere, surrounded by peaceful mountains and supported by kind carers, they gradually find security, brotherhood, and the strength to rebuild their lives.',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=BZgeEbYuWP8',
      title: 'Turning Fact into Fiction: Interviewing Real Survivors | Tom Palmer',
      duration: '3 mins 42 secs',
      teacher_guidance:
        "Author interview exploring historical research and oral testimony. Tom Palmer explains how he interviewed living survivors including Arek Hersh MBE to ensure the authentic experiences of the 'Windermere Children' were faithfully captured in fiction.",
      viewing_task:
        "How did author Tom Palmer use real oral history and interviews with survivors like Arek Hersh to write 'After the War'?",
      model_answer:
        'Author Tom Palmer conducted in-depth oral history research by meeting and interviewing living survivors of the Windermere Children, including Arek Hersh MBE. He listened to their personal memories of arriving in England on RAF transport planes, their initial bewilderment at clean white sheets and abundant bread, and their joy at swimming in Lake Windermere. Palmer wove these authentic historical details into the narrative to ensure his novel preserved real survivor voices for young readers.',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=L-nPGLmpAJU',
      title: 'After the War: On Location at Lake Windermere | Tom Palmer',
      duration: '4 mins 27 secs',
      teacher_guidance:
        'Author Tom Palmer takes viewers on a guided historical walk around the former Calgarth Estate at Troutbeck Bridge, Lake Windermere. Demonstrates how historical geography and physical landscapes connect to memory and healing.',
      viewing_task:
        'Watch author Tom Palmer walking around Lake Windermere. What happened at the Calgarth Estate in 1945 and why did he choose this setting for his novel?',
      model_answer:
        'Tom Palmer explains that in August 1945, the British government and Jewish relief committees brought 300 child Holocaust survivors from liberated camps in Europe to the Calgarth Estate by Lake Windermere. Originally built as wartime housing for Sunderland flying boat factory workers, the chalets provided a peaceful sanctuary where traumatized children received medical care, therapy, nutritious food, and English lessons, turning a corner of Cumbria into a world-famous place of rebirth and hope.',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=w5gC3ySGGTI',
      title: "The Windermere Children: Mayer Hersh's True Story | LDHP",
      duration: '5 mins 12 secs',
      teacher_guidance:
        'Moving firsthand testimony from survivor Mayer Hersh MBE, produced by the Lake District Holocaust Project. Details his arrival in Cumbria and how the kindness of British volunteers restored his faith in humanity.',
      viewing_task:
        'Listen to survivor Mayer Hersh speak about his arrival at Lake Windermere. How did the local people and the peaceful setting help him begin to feel human again?',
      model_answer:
        'Mayer Hersh explains that arriving in the tranquil Lake District felt like entering another world after surviving the horrors of Auschwitz and Buchenwald. He recalls that having his own bed with clean sheets, being served wholesome meals without fear of starvation, and being treated with genuine dignity and kindness by British volunteers and counselors slowly restored his humanity and allowed him to feel safe again for the first time in six years.',
    },
    {
      type: 'youtube',
      url: 'https://era.org.uk/streaming-service-resource/the-windermere-children-in-their-own-words/',
      title: 'The Windermere Children: In Their Own Words (BBC Four Documentary, 2020)',
      duration: '59 mins 0 secs',
      teacher_guidance:
        'Award-winning BBC documentary featuring intimate interviews with the real Windermere survivors, including Sir Ben Helfgott, Harry Olmer, and Arek Hersh. Explores their arrival on RAF Stirling bombers in August 1945 and their lifelong bond.',
      viewing_task:
        'Listen to real survivors describe their memories of arriving at Lake Windermere. What did the gift of bicycles and swimming in the lake mean to their physical and emotional recovery?',
      model_answer:
        "The survivors explain that arriving at Lake Windermere was a miraculous turning point: after years of confinement, starvation, and fear in Nazi camps, the expansive beauty of the mountains and open water represented pure freedom. Swimming in the lake felt like washing away the past, while receiving brand-new bicycles gave them independent mobility and joyful recreation, helping them rediscover their childhood and form an unbreakable community known as 'The Boys'.",
    },
    {
      type: 'youtube',
      url: 'https://era.org.uk/streaming-service-resource/the-windermere-children/',
      title: 'The Windermere Children (BBC Two Feature Drama, 2020)',
      duration: '1 hr 28 mins',
      teacher_guidance:
        'Critically acclaimed BBC feature drama depicting the arrival of 300 child survivors in Cumbria. Superb for exploring the psychological trauma of survivors and the pioneering psychiatric care provided by Dr Oscar Friedman, Marie Paneth, and Leonard Montefiore.',
      viewing_task:
        'Watch how the young survivors react when they first step off the buses at the Calgarth Estate. What fears do they carry from the concentration camps, and how do carers gently reassure them that they are safe?',
      model_answer:
        'When the children arrive at Calgarth, they display deep trauma: they panic at the sight of uniformed personnel, fear that group showers are gas chambers, and hoard bread under their pillows because they cannot believe food will be provided tomorrow. Carers Dr Oscar Friedman and art therapist Marie Paneth respond with profound empathy, refusing to punish or restrict them, gently reassuring them in their native languages, and using art, sports, and nature to help them process their grief and trust adults again.',
    },
  ],
};

// Sort each lesson's videos by duration shortest-to-longest
for (const lessonKey of Object.keys(enrichedKs2Videos)) {
  enrichedKs2Videos[lessonKey].sort(
    (a, b) => parseDurationSecs(a.duration) - parseDurationSecs(b.duration),
  );
}

// Update units/ks2_ww2/data.js
const unitJsPath = path.resolve(__dirname, '../units/ks2_ww2/data.js');
let unitJsContent = fs.readFileSync(unitJsPath, 'utf8');

// Load unitData from js file
delete require.cache[require.resolve(unitJsPath)];
const ks2DataModule = require(unitJsPath);
const unitData = ks2DataModule.default || ks2DataModule.unitData || ks2DataModule;

unitData.lessons.forEach((l) => {
  if (enrichedKs2Videos[l.id]) {
    l.video = enrichedKs2Videos[l.id];
  }
});

// Write updated data.js
const newJsContent = `const unitData = ${JSON.stringify(unitData, null, 2)};\n\nexport default unitData;\nexport { unitData };\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = unitData;\n}\n`;
fs.writeFileSync(unitJsPath, newJsContent, 'utf8');
console.log('✅ Updated units/ks2_ww2/data.js');

// Sync to public/data/ks2_ww2.json and data/ks2_ww2.json
const pubJsonPath = path.resolve(__dirname, '../public/data/ks2_ww2.json');
const dataJsonPath = path.resolve(__dirname, '../data/ks2_ww2.json');

fs.writeFileSync(pubJsonPath, JSON.stringify(unitData, null, 2), 'utf8');
console.log('✅ Updated public/data/ks2_ww2.json');

if (fs.existsSync(dataJsonPath)) {
  fs.writeFileSync(dataJsonPath, JSON.stringify(unitData, null, 2), 'utf8');
  console.log('✅ Updated data/ks2_ww2.json');
}

// Rebuild public/database.json
const { execSync } = require('child_process');
execSync('node scripts/build_database.cjs', { stdio: 'inherit' });
console.log('🎉 Successfully enriched all 36 clips in ks2_ww2 and rebuilt database!');
