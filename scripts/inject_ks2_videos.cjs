const fs = require('fs');
const path = require('path');

const ks2DataPath = path.resolve(__dirname, '../data/ks2_ww2.json');
const ks2Data = JSON.parse(fs.readFileSync(ks2DataPath, 'utf8'));

const lessonVideos = {
  lesson_1: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=i234eVT_P8Q',
      title: 'Britain Declares War on Germany | BBC Teach',
      duration: '4 mins 51 secs',
      viewing_task:
        "Listen carefully to Neville Chamberlain's announcement. What reasons did he give for why Britain had to declare war on Germany, and what happened within 15 minutes of his broadcast?",
      model_answer:
        'Chamberlain explained that Germany had invaded Poland and refused to withdraw. Within 15 minutes of his broadcast ending, the first air raid sirens sounded across London, forcing people to take shelter.',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=GCPAeD1K6To',
      title: 'How to Fit a Gas Mask (1939) | Air Raid Precautions',
      duration: '1 min 57 secs',
      viewing_task:
        'Watch how the rubber gas mask was fitted over the face. Why was it vital to check the airtight seal around the cheeks and chin?',
      model_answer:
        'It had to create an airtight seal so that poisonous gas could not leak in around the edges of the mask, ensuring all air was breathed through the protective charcoal filter.',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=t2qlZHW-fDI',
      title: 'Neville Chamberlain: Declaration of War (3 September 1939)',
      duration: '50 secs',
      viewing_task:
        'Listen to the exact words Prime Minister Chamberlain spoke from 10 Downing Street. How does his tone of voice convey the gravity of the situation?',
      model_answer:
        "Chamberlain speaks in a solemn, sorrowful, and serious voice, explaining that despite all his efforts for peace, Hitler's refusal to halt the invasion of Poland made war inevitable.",
    },
  ],
  lesson_2: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=HFBlvWkNEKU',
      title: 'A Day in the Life of a 10-Year-Old Evacuee | BBC Hands On History',
      duration: '2 mins 31 secs',
      viewing_task:
        'What belongings was the young evacuee allowed to pack, and what label did they wear around their neck?',
      model_answer:
        'The evacuee carried a small suitcase with essential clothes, an identity card, a gas mask in a cardboard box, and wore a luggage tag with their name, school, and destination.',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=Wvgojxu2hp4',
      title: 'The Lives of WW2 Evacuees | Hunting for History | BBC Teach',
      duration: '6 mins 19 secs',
      viewing_task:
        'What historical primary sources does the historian examine to find out what life was like for evacuees arriving in the countryside?',
      model_answer:
        'The historian examines original billeting records, letters written home by evacuees, and archival photographs showing the selection process in village halls.',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=0SYDBJAwYCI',
      title: "An Evacuee's Adventure | History - Children of World War Two | BBC Teach",
      duration: '9 mins 41 secs',
      viewing_task:
        'Watch Betty retrace her journey from Cardiff to Aberdare. How did she feel when she arrived at the village hall to be chosen by a host family?',
      model_answer:
        'Betty felt anxious and bewildered because host families picked children one by one, but she was relieved when she was taken in by a warm and welcoming Welsh mining family.',
    },
  ],
  lesson_3: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=-KkElrPdA_I',
      title: 'Trude’s Story: Escaping Nazi-Occupied Czechoslovakia | BBC Teach',
      duration: '3 mins 40 secs',
      viewing_task:
        'Watch the animated story of Trude. Why did her parents decide to put her on a train to Britain, and what was her journey like?',
      model_answer:
        'Her parents put her on the train to save her life as the Nazis occupied Czechoslovakia. She had to say goodbye at the railway station and travel through Germany with other refugee children to safety in England.',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=Era_O5PS0bA',
      title: "Ruth's Story: Escaping the Nazis as War Began | BBC Teach",
      duration: '5 mins 49 secs',
      viewing_task:
        'How did Ruth and her mother manage to escape from Germany, and on what historic date did she finally arrive in Britain?',
      model_answer:
        'They travelled across borders and caught one of the final trains out of Europe, arriving in Britain on 3 September 1939—the very day the Second World War was declared.',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=JXrCnJppIUM',
      title: 'Kindertransport: How It Happened | Safe Passage',
      duration: '3 mins 20 secs',
      viewing_task:
        'How many children escaped on the Kindertransport between December 1938 and September 1939, and where did their trains arrive in London?',
      model_answer:
        'Nearly 10,000 predominantly Jewish children were rescued, arriving by ferry and train at Liverpool Street Station in London where foster families and volunteers met them.',
    },
  ],
  lesson_4: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=1VwY_UxXkYU',
      title: 'The Blitz (1940–1941) | Simple History',
      duration: '3 mins 41 secs',
      viewing_task:
        'Why did the German Luftwaffe switch to bombing British cities, and which cities were most heavily targeted?',
      model_answer:
        'After failing to defeat the RAF in the Battle of Britain, Hitler bombed cities like London, Coventry, and Liverpool to destroy factories, ports, and break civilian morale.',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=rHyxP3epU-w',
      title: 'Your Anderson Shelter This Winter (1940) | British Pathé',
      duration: '2 mins 16 secs',
      viewing_task:
        'How were corrugated steel Anderson shelters adapted by families to keep them warm and dry during winter bombings?',
      model_answer:
        'Families covered them with thick layers of soil, dug drainage trenches, installed wooden bunks, and brought hot water bottles and blankets.',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=4idj7fI6OZg',
      title: 'Living Through Air Raids | History - Children of World War Two | BBC Teach',
      duration: '9 mins 54 secs',
      viewing_task:
        'Listen to Alan describe how his family took cover when the sirens wailed. What was life like spending nights inside an air raid shelter?',
      model_answer:
        'It was cramped, cold, and noisy with the drone of planes and anti-aircraft guns outside, but neighbours supported each other and tried to keep spirits high.',
    },
  ],
  lesson_5: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=JMS0_R4pguw',
      title: 'Digging For Victory (1940) | British Pathé',
      duration: '2 mins 04 secs',
      viewing_task:
        'Notice where ordinary citizens are digging. What unexpected spaces were converted into allotments?',
      model_answer:
        'Public parks, railway embankments, golf courses, and sports grounds were all ploughed up to plant potatoes, cabbages, and carrots.',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=35NpLveVZDg',
      title: 'Dig For Victory | Imperial War Museums',
      duration: '5 mins 59 secs',
      viewing_task:
        'Why did the government urge millions of people to turn their lawns, parks, and flower beds into vegetable patches?',
      model_answer:
        'German U-boats were sinking merchant ships carrying food across the Atlantic, so Britain had to grow as much of its own food as possible to prevent starvation.',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=DuO1CYsPf_M',
      title: "A Soldier's Daughter: Rationing & The Home Front | BBC Teach",
      duration: '9 mins 30 secs',
      viewing_task:
        'How did food rationing change what Sarah and her family could eat each week in Bolton?',
      model_answer:
        'Meat, sugar, butter, and eggs were strictly limited. Families had to plan meals carefully, queue at shops with ration coupons, and make simple ingredients stretch.',
    },
  ],
  lesson_6: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=Z8FrnZwysEs',
      title: "Britain's Land Girls | BBC World Service",
      duration: '3 mins 27 secs',
      viewing_task: "What duties did members of the Women's Land Army perform on British farms?",
      model_answer:
        'They milked cows, ploughed fields with tractors, harvested crops, caught pests, and felled timber to keep the nation fed and supplied with raw materials.',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=oWF_Ylaq8Eg',
      title: "Women's Roles in World War Two | BBC Newsround",
      duration: '4 mins 41 secs',
      viewing_task:
        'What jobs did women take on to replace men who were called up to fight in the armed forces?',
      model_answer:
        'Women worked in munitions and aircraft factories, drove ambulances and fire engines, operated radar and anti-aircraft searchlights, and decoded messages at Bletchley Park.',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=GOhYrBQFSTQ',
      title: 'What Did Queen Elizabeth II Do in the Second World War? | Imperial War Museums',
      duration: '8 mins 34 secs',
      viewing_task:
        'What military training did Princess Elizabeth undergo when she joined the Auxiliary Territorial Service (ATS) in 1945?',
      model_answer:
        'She trained as an army driver and vehicle mechanic, learning how to change tyres, repair engines, and navigate military lorries through blackout conditions.',
    },
  ],
  lesson_7: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=N-kHHGAT2AE',
      title: 'What Was the Holocaust? | BBC Newsround',
      duration: '2 mins 59 secs',
      viewing_task:
        'How does Newsround explain the persecution of minorities in Nazi Germany, and why is this history remembered today?',
      model_answer:
        'The Nazis targeted Jewish people and other minority groups through prejudice and hatred. It is remembered so that future generations stand up against discrimination and bullying.',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=ZDIXugTLGts',
      title: 'Heinz’s Story: Escaping to Britain from Kristallnacht | BBC Teach',
      duration: '5 mins 39 secs',
      viewing_task:
        'Watch the animated account of Heinz Skyte. How did his childhood in Nuremberg change after the Nazis came to power in 1933?',
      model_answer:
        'He was excluded from his school and sports clubs, his family business was boycotted, and during Kristallnacht in November 1938, his home was raided and his father arrested.',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=dl-PUfTBjzU',
      title: "Martin's Story: Childhood Experiences of a Holocaust Survivor | BBC Teach",
      duration: '5 mins 50 secs',
      viewing_task:
        'How does Martin describe the gradual loss of everyday freedoms for Jewish families in Germany before the war?',
      model_answer:
        'Jewish children were forbidden from using public parks, swimming pools, and libraries, and were made to feel separate and unwelcome by discriminatory laws.',
    },
  ],
  lesson_8: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=CspaXNkC2ec',
      title: 'How Did the Enigma Machine Work? | Science Museum',
      duration: '1 min 48 secs',
      viewing_task:
        'How did the typewriter keys, electric rotors, and plugboard work together to scramble German military messages?',
      model_answer:
        'Every time a key was pressed, electrical currents flowed through rotating cipher wheels and cross-connected plugboard cables, changing the letter into a different cipher letter millions of possible ways.',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=mXZNayEPFKc',
      title: "How Was Hitler's Enigma Machine Cracked? | Smithsonian Channel",
      duration: '3 mins 06 secs',
      viewing_task:
        "What role did Alan Turing and the electromechanical 'Bombe' machine play in decoding enemy communications at Bletchley Park?",
      model_answer:
        'Alan Turing designed the Bombe machine, which rapidly tested thousands of rotor combinations every second to reveal the daily German cipher settings and read secret orders.',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=iwoU7Mjvm4Q',
      title: 'What to Expect When You Visit Bletchley Park',
      duration: '3 mins 52 secs',
      viewing_task:
        'Look at the wooden huts at Bletchley Park. Why were thousands of civilian women and mathematicians sworn to absolute secrecy about their work?',
      model_answer:
        'If the German military had suspected that Bletchley Park was intercepting and reading their Enigma messages, they would have changed their codes instantly, losing Britain a vital advantage.',
    },
  ],
  lesson_9: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=6_nFuJAF5F0',
      title: "Sir Nicholas Winton: That's Life (1988) | BBC TV",
      duration: '1 min 39 secs',
      viewing_task:
        'Watch the famous moment when presenter Esther Rantzen asks the studio audience who owes their life to Nicholas Winton. How do they react?',
      model_answer:
        'The entire audience surrounding Nicholas Winton stands up together to honour him, revealing that the adults sitting beside him were the very children he had saved from Prague 50 years earlier.',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=M1JEuQfMZfY',
      title: 'Sir Nicholas Winton: The Life of a Holocaust Hero | BBC News',
      duration: '1 min 59 secs',
      viewing_task:
        'What did Nicholas Winton do in Prague in the winter of 1938 to arrange the rescue of 669 children?',
      model_answer:
        'He set up an office in a hotel, compiled lists of children in refugee camps, found British foster families, arranged travel permits from the Home Office, and organized eight rescue trains.',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=6ethollg-PI',
      title: 'One Life: The Story of Nicholas Winton | Official Trailer',
      duration: '2 mins 00 secs',
      viewing_task:
        "How does the trailer show the urgency of Trevor Chadwick and Nicholas Winton's mission before borders closed in September 1939?",
      model_answer:
        'It shows the team racing against the clock to secure visas and funding for each child before the German army completed its occupation of Czechoslovakia.',
    },
  ],
  lesson_10: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=q97bEp8Q0Mg',
      title: 'Remembrance Day: What Is It & Why Is It Important? | BBC Newsround',
      duration: '1 min 38 secs',
      viewing_task:
        'Why is the red poppy used as a symbol of remembrance, and why is it important to remember those who lived through the war?',
      model_answer:
        'The poppy bloomed on the battlefields and represents sacrifice and peace. We remember those who served and suffered to honour their bravery and ensure war is never repeated.',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=U_FZlpQqhMg',
      title: 'V.E. Celebrations (1945) | British Pathé',
      duration: '2 mins 10 secs',
      viewing_task:
        'Look at the archival footage of neighbourhood street parties. How did communities make the day special for children?',
      model_answer:
        'Tables were brought out into the middle of streets, children wore paper party hats and red-white-and-blue ribbons, and neighbours shared precious rationed treats like cakes and jelly.',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=uOEdJGE_j9g',
      title: 'VE Day: What Is It & Why Do We Remember? | BBC Newsround',
      duration: '3 mins 26 secs',
      viewing_task:
        "What does 'VE Day' stand for, and how did people across Britain celebrate on 8 May 1945?",
      model_answer:
        "VE Day stands for 'Victory in Europe Day'. People celebrated with street parties, dancing, singing, hanging bunting, and gathering in huge crowds outside Buckingham Palace.",
    },
  ],
};

// Apply to each lesson in ks2Data
for (const lesson of ks2Data.lessons) {
  if (lessonVideos[lesson.id]) {
    lesson.video = lessonVideos[lesson.id];
  }
}

fs.writeFileSync(ks2DataPath, JSON.stringify(ks2Data, null, 2), 'utf8');
console.log(
  'Successfully injected curated video playlists into all 10 KS2 WW2 lessons in data/ks2_ww2.json!',
);
