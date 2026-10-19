const fs = require('fs');
const path = require('path');

const unitsDir = path.join(__dirname, '..', 'units', 'ks2_ww2');
const pubDir = path.join(__dirname, '..', 'public', 'units', 'ks2_ww2');

function getBase64Image(relPath) {
  if (!relPath) return null;
  const clean = relPath.replace(/^\//, '');
  const candidates = [
    path.join(__dirname, '..', 'public', clean),
    path.join(__dirname, '..', clean),
    path.join(__dirname, '..', 'units', 'ks2_ww2', 'assets', path.basename(clean)),
    path.join(__dirname, '..', 'public', 'units', 'ks2_ww2', 'assets', path.basename(clean)),
    path.join(__dirname, '..', 'public', 'units', 'ks2_ww2', path.basename(clean)),
    path.join(__dirname, '..', 'units', 'ks2_ww2', path.basename(clean)),
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

const enquiries = [
  {
    num: 1,
    title: 'Outbreak 1939 & Home Front Mobilisation',
    subtitle: "Neville Chamberlain's Radio Broadcast & 38 Million Gas Masks",
    img: 'gas_masks_children_1939.jpg',
    sourceTitle: 'Source A (Photograph): Schoolchildren in a Gas Mask Drill (1939)',
    sourceCaption:
      'A teacher leads schoolchildren in double file across the playground during a practice drill while wearing gas masks.',
    prose:
      'On Sunday 3 September 1939, Prime Minister Neville Chamberlain announced over the radio that Britain was at war with Germany. Within fifteen minutes, the first wailing air raid siren sounded across London.<br><br>Fearing that enemy bombers might drop poison gas bombs on civilian cities, the British government issued 38 million gas masks in cardboard boxes with string straps. Even walking to school or playing outside, children had to carry their boxes everywhere and practise wearing them during lessons.',
    vocab: ['Respirator', 'Blackout', 'Mobilisation', 'Air Raid Warden'],
    q1: 'Look closely at Source A. How do you think it felt for children to do their schoolwork wearing rubber gas masks?',
    q2: 'Why did the British government insist that every baby, child, and adult carry a gas mask before any bombs had fallen?',
    q3: 'Every window had to be covered with heavy black curtains. Why was the blackout so strictly enforced by Air Raid Wardens?',
    q4: 'Big Question: In what ways did the outbreak of war change the daily routine of ordinary British schoolchildren overnight?',
  },
  {
    num: 2,
    title: 'Operation Pied Piper & British Evacuation',
    subtitle: 'The Great Railway Exodus from Crowded Cities to the Countryside',
    img: 'evacuees_railway_1939.jpg',
    sourceTitle: 'Source A (Photograph): Evacuees Arriving at a Rural Railway Station (1939)',
    sourceCaption:
      'Children with luggage labels pinned to their coats arrive at a countryside station carrying suitcases and gas mask boxes.',
    prose:
      'In the first four days of September 1939, the British government launched "Operation Pied Piper", evacuating over 1.5 million schoolchildren, teachers, and mothers with babies from crowded cities to rural villages and coastal towns.<br><br>Children assembled at school at dawn carrying a small suitcase and their gas mask box. Each child wore a cardboard luggage label pinned to their coat showing their name and school. Mothers were forbidden from platforms to avoid distress, and children often had no idea where their train was heading.',
    vocab: ['Operation Pied Piper', 'Billeting Officer', 'Foster Family', 'Evacuee'],
    q1: "Look at Source A. Why did authorities attach luggage labels to children's coats rather than placing identification inside their bags?",
    q2: 'What contrasting feelings might a young evacuee experience upon arriving at a quiet countryside railway station?',
    q3: 'Imagine arriving in a village hall where local villagers choose which child to take home. How would you feel standing in line?',
    q4: 'Big Question: Why was evacuation both an adventure and a heartbreaking separation for British families?',
  },
  {
    num: 3,
    title: "Vera's Journey & The Kindertransport",
    subtitle: 'The Rescue of Nearly 10,000 Refugee Children (1938–1939)',
    img: 'kindertransport_arrival.jpg',
    sourceTitle: 'Source A (Photograph): Children Arriving on the Kindertransport (1939)',
    sourceCaption:
      "Refugee children walking down the ship's gangway after arriving safely in Britain, wearing numbered identity cards around their necks.",
    prose:
      'Following the violence of the November Pogrom in 1938, the British government agreed to permit unaccompanied refugee children into Britain. Over the next nine months, rescue trains called the Kindertransport brought nearly 10,000 predominantly Jewish children from Germany, Austria, and Czechoslovakia.<br><br>Children like 9-year-old Vera Schaufeld from Prague said goodbye to their parents at railway stations, not knowing they would never see them again. Each child was allowed only one small suitcase and had to wear a numbered identity card around their neck.',
    vocab: ['Kindertransport', 'Refugee', 'Identity Tag', 'Foster Care'],
    q1: 'Look at Source A. Why did each child have to wear a numbered identity card around their neck walking down this gangway?',
    q2: 'Each refugee child was allowed only ONE small suitcase. What 3 personal items would you pack to remember your family?',
    q3: 'How did British volunteers and foster families demonstrate extraordinary compassion to welcome children who spoke no English?',
    q4: 'Big Question: Why is the Kindertransport remembered as one of the greatest humanitarian rescue missions in British history?',
  },
  {
    num: 4,
    title: 'The Blitz & Air Raids',
    subtitle: 'Night Raids, Garden Anderson Shelters & Tube Station Havens',
    img: 'anderson_shelter_family.jpg',
    sourceTitle: 'Source A (Photograph): Alan and Doris Entering their Anderson Shelter (1940)',
    sourceCaption:
      'Alan and Doris stepping down into their steel Anderson shelter in their London garden during the summer of 1940.',
    prose:
      'Between September 1940 and May 1941, the German air force bombed British cities for 57 consecutive nights in a campaign called the Blitz. Over one million London homes were damaged or destroyed.<br><br>To protect families, the government provided curved corrugated steel Anderson shelters to bury in back gardens covered with soil. In crowded streets without gardens, thousands sheltered in Underground tube stations, sleeping along the platforms while trains thundered past.',
    vocab: ['The Blitz', 'Anderson Shelter', 'Air Raid Siren', 'Morrison Shelter'],
    q1: 'Look at Source A. Why did families bury their Anderson shelter halfway into the soil and pile earth and turf on top?',
    q2: 'What supplies and comforts would you want to take with you into a dark garden shelter during a nighttime air raid?',
    q3: 'Why did over 150,000 Londoners choose to sleep on dusty Underground platforms rather than stay in their own bedrooms?',
    q4: 'Big Question: Why was British civilian resilience and community spirit described as the secret weapon that defeated the Blitz?',
  },
  {
    num: 5,
    title: 'Dig for Victory & Wartime Rationing',
    subtitle: 'Convoys, Food Coupons, Allotments & Fair Shares for All',
    img: 'dig_for_victory_poster.jpg',
    sourceTitle: 'Source A (Wartime Poster): Dig for Victory — Helping in the Garden (1940)',
    sourceCaption:
      'A colourful wartime poster showing a young child carrying a garden hoe and spade to help grow vegetables for their family.',
    prose:
      'Before the war, Britain imported 55 million tonnes of food each year by merchant ship. When German U-boat submarines began sinking cargo vessels in the Atlantic, food supplies dropped dangerously low.<br><br>The government introduced rationing: every person received a Ration Book with coupons for meat, butter, sugar, and eggs. Meanwhile, the "Dig for Victory" campaign urged families to turn flowerbeds, parks, and school lawns into vegetable allotments.',
    vocab: ['Ration Book', 'Dig for Victory', 'Allotment', 'Merchant Navy'],
    q1: 'Look at Source A. Why did the government use pictures of cheerful children on posters to encourage families to grow food?',
    q2: 'One egg, 50g of butter, and two rashers of bacon for the entire week! How would your family plan breakfast and dinner?',
    q3: 'Why was throwing away leftover food made a criminal offence punishable by heavy fines during wartime?',
    q4: 'Big Question: Why was the rationing system considered one of the fairest and healthiest government policies in British history?',
  },
  {
    num: 6,
    title: 'Women at War & The Land Army',
    subtitle: 'Land Girls, Munitions Factories, Spitfire Assembly & Courage',
    img: 'womens_land_army_harvest.jpg',
    sourceTitle: 'Source A (Wartime Painting): Land Girls Having Lunch in the Fields (1941)',
    sourceCaption:
      "A watercolour painting showing Women's Land Army volunteers resting and having lunch under the shade of a tree during a busy harvest day.",
    prose:
      'With millions of young men drafted into the armed forces, Britain faced an acute labour shortage. For the first time in British history, women were called up to serve their country in industry, transport, and agriculture.<br><br>Over 80,000 volunteers joined the Women\'s Land Army ("Land Girls"), working 50-hour weeks driving tractors, milking cows, and harvesting crops. Others built fighter planes, drove buses, and operated radar stations.',
    vocab: ["Women's Land Army", 'Munitions', 'Timber Jill', 'Conscription'],
    q1: 'Look at Source A. What clues in this painting show what daily life was like for the women working on British farms?',
    q2: "Before 1939, many women were expected to stay at home. How did assembling Spitfire engines change women's place in society?",
    q3: 'Imagine leaving a comfortable city home to live in a draughty farm barn rising at 5am each morning. What would you find hardest?',
    q4: 'Big Question: Why could Britain not have survived or won the Second World War without the mobilization of women?',
  },
  {
    num: 7,
    title: 'Pre-War Everyday Life & Rights Lost',
    subtitle: 'Vibrant Childhoods, Football Teams & The Gradual Loss of Rights',
    img: 'prewar_children_holiday.jpg',
    sourceTitle: "Source A (Photograph): A Boys' Football Team (1935)",
    sourceCaption:
      "A boys' football team posing together in their matching striped shirts with their goalkeeper sitting in front.",
    prose:
      'Before the Second World War, over nine million Jewish people lived across Europe in vibrant cities, quiet market towns, and rural villages. Jewish children went to ordinary schools, rode their bicycles, and played in local football teams just like children today.<br><br>However, when the Nazi regime came to power, they introduced anti-Jewish laws step-by-step. Year after year, ordinary joys were taken away: first sports clubs, then public parks, family pets, radios, and finally in November 1938, the right to attend school with their friends.',
    vocab: ['Pre-War Life', 'Discrimination', 'Schultüte', 'Exclusion'],
    q1: 'Look closely at Source A. What can we learn about these boys from looking at their photograph? Can you tell their religion or nationality?',
    q2: 'Why is it so vital to learn how children lived, laughed, and played football before studying the laws that took their rights away?',
    q3: 'How would you feel if a new rule suddenly told you that you could no longer go to school or play football with your friends?',
    q4: 'Big Question: Why did the gradual stripping of rights step-by-step make it so difficult for families to foresee what lay ahead?',
  },
  {
    num: 8,
    title: 'Secret Codebreakers & Bletchley Park',
    subtitle: 'The Enigma Machine, Alan Turing & The Mechanical Bombes',
    img: 'enigma_machine_bletchley.jpg',
    sourceTitle: 'Source A (Museum Artifact): The Secret Enigma Machine',
    sourceCaption:
      'An Enigma cipher machine showing its alphabetical keyboard, illuminating letters, and spinning rotor wheels.',
    prose:
      'The German military used an electrical cipher typewriter called the Enigma machine to scramble their battle orders into code. With spinning rotor wheels and plugboard cables, Enigma could scramble a message into 158 million million million combinations.<br><br>At secret Bletchley Park in Buckinghamshire, genius mathematician Alan Turing and thousands of young codebreakers designed "Bombe" machines that checked combinations at lightning speed, breaking the code daily.',
    vocab: ['Enigma Machine', 'Alan Turing', 'Bombe Machine', 'Official Secrets Act'],
    q1: 'Look at Source A. Why did the German military believe that no human codebreaker could ever crack the Enigma machine?',
    q2: 'Why did the codebreakers at Bletchley Park have to build a machine (the Bombe) to defeat another machine?',
    q3: 'Over 10,000 staff worked at Bletchley, mostly young women. Why did they never speak about their work to their own families for 30 years?',
    q4: 'Big Question: Historians estimate Bletchley Park shortened the war by up to two years. How did codebreaking save millions of lives?',
  },
  {
    num: 9,
    title: 'Who Were the Rescuers? Nicholas Winton & Trevor Chadwick',
    subtitle: 'Prague Airfields, Leather Scrapbooks & 669 Rescued Lives',
    img: 'winton_prague_child_1939.jpg',
    sourceTitle: 'Source A (Photograph): Nicholas Winton with a Rescued Child (1939)',
    sourceCaption:
      'Nicholas Winton holding a young refugee child in his arms in Prague before the rescue train departed.',
    prose:
      'In December 1938, a 29-year-old London stockbroker named Nicholas Winton visited Prague. Seeing thousands of refugees living in freezing camps, he set up a makeshift rescue office in his hotel bedroom.<br><br>Working with Dorset schoolteacher Trevor Chadwick, Winton found British foster families, raised £50 guarantee deposits for each child, and organized eight trains that carried 669 children to safety. He kept his rescue work a secret for nearly 50 years until his wife Grete found his leather scrapbook in the attic.',
    vocab: ['Nicholas Winton', 'Trevor Chadwick', 'Upstander', 'Moral Courage'],
    q1: 'Look at Source A. What qualities make someone like Nicholas Winton step forward as a rescuer when others choose to look away?',
    q2: "Winton recorded every child's name, transport number, and foster family in a leather scrapbook. Why were these records so important?",
    q3: 'What is the vital difference between a "bystander" who watches injustice happen and an "upstander" who takes action?',
    q4: 'Big Question: What can young people today learn from the moral courage of Nicholas Winton and Trevor Chadwick?',
  },
  {
    num: 10,
    title: 'VE Day, Post-War Rebuilding & Remembrance',
    subtitle: 'Victory in Europe, Trestle Street Parties & The Legacy of Peace',
    img: 've_day_street_party_1945.jpg',
    sourceTitle: 'Source A (Photograph): Trafalgar Square Celebrations on VE Day (8 May 1945)',
    sourceCaption:
      'A vast crowd of celebrating citizens fills Trafalgar Square beneath Nelson\'s Column, draped with the banner "Victory Over Germany 1945".',
    prose:
      'On Tuesday 8 May 1945, Prime Minister Winston Churchill announced that Nazi Germany had surrendered. After five years, eight months, and four days of air raids, blackout, and separation, the war in Europe was finally over.<br><br>Across Britain, communities dragged tables into the middle of bomb-damaged streets, decorated houses with Union flags, and shared precious saved ration sweets so children could celebrate peace. Yet amid the joy, families paused in silence to remember those who would never return.',
    vocab: ['VE Day', 'Winston Churchill', 'Remembrance', 'Post-War Rebuilding'],
    q1: "Look at Source A. What does this immense crowd celebrating in the heart of London tell us about the nation's relief when war finally ended?",
    q2: 'Why was VE Day both a moment of ecstatic celebration and a time of quiet heartache for millions of families?',
    q3: 'Even though war ended in Europe, why did rationing of food and clothes continue in Britain until 1954?',
    q4: 'Big Question: Why is it vital that we continue to remember the sacrifices and courage of the Second World War generation today?',
  },
];

const shortMissions = [
  'Outbreak & Gas Masks',
  'Pied Piper & Evacuation',
  "Vera's Kindertransport",
  'The Blitz & Garden Shelters',
  'Dig for Victory & Rationing',
  'Women at War & Land Army',
  'Pre-War Life & Rights Lost',
  'Codebreakers & Bletchley',
  'The Rescuers: Winton & Chadwick',
  'VE Day & Remembrance',
];

function generateWorkbookHtml() {
  let pagesHtml = '';

  // PAGE 1: MASTER FRONT COVER
  pagesHtml += `
  <!-- PAGE 1: MASTER FRONT COVER -->
  <div class="workbook-page" id="page-1">
    <div class="exercise-book-cutline cover-cutline">
      <div class="cover-masthead">
        <span class="cover-brand-badge">THE HISTORY REVISION HUB</span>
        <span class="cover-date-pill">1939–1945 • KEY STAGE 2</span>
      </div>

      <div class="cover-hero-box">
        <h1 class="cover-title">WORLD WAR II &amp; THE HOME FRONT</h1>
        <p class="cover-subtitle">PUPIL WORKBOOK &amp; HISTORIAN COMPANION</p>
      </div>

      <div class="cover-plate-box">
        <img src="${getBase64Image('evacuees_station_1940_hu36871.jpg') || '/units/ks2_ww2/assets/evacuees_station_1940_hu36871.jpg'}" class="cover-hero-img" alt="London schoolchildren evacuees at railway station 1940">
        <div class="cover-caption">Primary Archival Record: London schoolchildren carrying luggage labels and gas mask boxes pass through the railway station as Britain mobilises for war, 1940 (IWM HU 36871).</div>
      </div>

      <div class="student-id-block">
        <div class="id-row"><span>Pupil Name:</span> <div class="id-line"></div></div>
        <div class="id-row"><span>Class / Group:</span> <div class="id-line"></div> <span style="margin-left: 15px;">Teacher:</span> <div class="id-line"></div></div>
        <div class="id-row"><span>Year Group:</span> <div class="id-line" style="width: 28mm;"></div> <span style="margin-left: 15px;">Historical Topic:</span> <span class="id-tag-accent">World War II &amp; The Home Front</span></div>
      </div>

      <div class="cover-enquiries-dir">
        <div class="dir-header">
          <div class="dir-header-title">
            <span style="font-size: 1.1rem;">⭐</span>
            <span>YOUR 10 HISTORIAN MISSIONS</span>
          </div>
          <span class="dir-header-sub">Tick off each enquiry as you investigate the evidence!</span>
        </div>
        <div class="dir-grid">
          ${enquiries
            .map(
              (e, idx) => `
            <div class="dir-item">
              <span class="dir-pill">${e.num < 10 ? 'Enquiry 0' + e.num : 'Enquiry ' + e.num}</span>
              <span class="dir-name">${shortMissions[idx] || e.title}</span>
              <span class="dir-check-box"></span>
            </div>
          `,
            )
            .join('')}
        </div>
      </div>

      <div class="cover-footer">
        <span>The History Revision Hub • Key Stage 2 History</span>
        <span>World War II Pupil Workbook • 10 Historian Missions</span>
      </div>
    </div>
  </div>
  `;

  // PAGES 2–21: 10 DOUBLE-PAGE ENQUIRY SPREADS
  enquiries.forEach((e) => {
    // Left Page: Narrative Story & Evidence
    pagesHtml += `
    <!-- ENQUIRY ${e.num} LEFT: READING & EVIDENCE -->
    <div class="workbook-page" id="page-${e.num * 2}">
      <div class="exercise-book-cutline">
        <div class="sheet-masthead">
          <div class="brand-left">
            <span class="brand-badge">MISSION 0${e.num}</span>
            <span class="brand-text">Historical Story &amp; Primary Evidence</span>
          </div>
          <span style="font-size: 7.2pt; font-weight:700; color:#64748b;">Key Stage 2 History</span>
        </div>

        <div class="enquiry-banner">
          <div class="enquiry-title-group">
            <h1>${e.title}</h1>
            <p class="enquiry-question">${e.subtitle}</p>
          </div>
          <div class="lesson-badge">MISSION 0${e.num}<br><span style="font-size:5.8pt; font-weight:700;">STORY &amp; EVIDENCE</span></div>
        </div>

        <div class="spread-verso-body">
          <div class="verso-story-box">
            <div class="story-header">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
              Historical Reading • What this tells us
            </div>
            <p class="story-prose">${e.prose}</p>
          </div>

          <div class="verso-plate-box">
            <img src="${getBase64Image(e.img) || `/units/ks2_ww2/assets/${e.img}`}" class="verso-img" alt="${e.title}">
            <p class="archival-caption"><strong>${e.sourceTitle}:</strong> ${e.sourceCaption}</p>
          </div>

          <div class="vocab-strip">
            <span class="vocab-title">KEY TERMS:</span>
            ${e.vocab.map((v) => `<span class="vocab-pill">${v}</span>`).join('')}
          </div>
        </div>

        <div class="sheet-footer">
          <span>The History Revision Hub • KS2 Pupil Workbook</span>
          <span>Mission 0${e.num} • Story &amp; Evidence • Page ${e.num * 2} of 24</span>
        </div>
      </div>
    </div>

    <!-- ENQUIRY ${e.num} RIGHT: INQUIRY TASKS & CHALLENGE -->
    <div class="workbook-page" id="page-${e.num * 2 + 1}">
      <div class="exercise-book-cutline">
        <div class="sheet-masthead">
          <div class="brand-left">
            <span class="brand-badge">HISTORIAN INVESTIGATION</span>
            <span class="brand-text">${e.title}</span>
          </div>
          <div class="student-fields">
            <div class="field-item">Name: <span class="field-line"></span></div>
          </div>
        </div>

        <div class="recto-tasks-container">
          <div class="task-box">
            <div class="task-header">
              <span class="task-num-title">1. Primary Evidence Detective</span>
              <span class="task-tag">Source Clues</span>
            </div>
            <p class="task-prompt">${e.q1}</p>
            <div class="ruled-lines"><div class="ruled-line"></div><div class="ruled-line"></div><div class="ruled-line"></div></div>
          </div>

          <div class="task-box">
            <div class="task-header">
              <span class="task-num-title">2. Historical Explanation</span>
              <span class="task-tag">Cause &amp; Effect</span>
            </div>
            <p class="task-prompt">${e.q2}</p>
            <div class="ruled-lines"><div class="ruled-line"></div><div class="ruled-line"></div><div class="ruled-line"></div></div>
          </div>

          <div class="task-box">
            <div class="task-header">
              <span class="task-num-title">3. Living History: Step Into Their Shoes</span>
              <span class="task-tag">Personal Experiences</span>
            </div>
            <p class="task-prompt">${e.q3}</p>
            <div class="ruled-lines"><div class="ruled-line"></div><div class="ruled-line"></div><div class="ruled-line"></div></div>
          </div>

          <div class="task-box synthesis-box">
            <div class="task-header">
              <span class="task-num-title">4. Mission Challenge • The Big Question</span>
              <span class="task-tag" style="background:#fef3c7; color:#b45309;">Historian Challenge</span>
            </div>
            <p class="task-prompt font-bold">${e.q4}</p>
            <div class="ruled-lines"><div class="ruled-line"></div><div class="ruled-line"></div><div class="ruled-line"></div><div class="ruled-line"></div></div>
          </div>
        </div>

        <div class="sheet-footer">
          <span>The History Revision Hub • KS2 Pupil Workbook</span>
          <span>Mission 0${e.num} • Your Investigation • Page ${e.num * 2 + 1} of 24</span>
        </div>
      </div>
    </div>
    `;
  });

  // PAGE 22–23: MASTER RECALL RETRIEVAL CHALLENGE (40 QUESTIONS)
  pagesHtml += `
  <!-- PAGE 22: RETRIEVAL QUIZ PART 1 -->
  <div class="workbook-page" id="page-22">
    <div class="exercise-book-cutline">
      <div class="sheet-masthead">
        <div class="brand-left">
          <span class="brand-badge">RETRIEVAL CHALLENGE</span>
          <span class="brand-text">Knowledge Recall • Questions 1 to 20</span>
        </div>
        <div class="student-fields"><div class="field-item">Score: <span class="field-line" style="width:18mm;"></span> / 40</div></div>
      </div>

      <div class="enquiry-banner">
        <div class="enquiry-title-group">
          <h1>WW2 Knowledge Retrieval Challenge (Part 1)</h1>
          <p class="enquiry-question">Answer each factual question from memory to prove your historical mastery.</p>
        </div>
        <div class="lesson-badge">QUIZ<br><span style="font-size:6pt; font-weight:600;">PART 1</span></div>
      </div>

      <div class="quiz-questions-grid">
        ${[
          '1. On what date did Prime Minister Chamberlain announce war with Germany?',
          '2. How many million gas masks were distributed to British civilians in 1939?',
          '3. What was the name of the official government evacuation plan?',
          '4. Why did evacuee children wear cardboard luggage labels pinned to their coats?',
          '5. How many refugee children were rescued on the Kindertransport from 1938–39?',
          '6. What was the name of 9-year-old Czech girl who travelled on the train from Prague?',
          '7. Name the garden shelter made of curved corrugated steel covered with soil.',
          '8. Where did over 150,000 Londoners shelter during night air raids in the Blitz?',
          '9. What was the name of the government campaign urging families to grow food?',
          '10. Why was throwing away leftover food made a criminal offence during wartime?',
          '11. What book of coupons did every British citizen carry to buy meat, butter, and sugar?',
          "12. What was the popular nickname given to volunteers in the Women's Land Army?",
          '13. Name two jobs women carried out in wartime Britain besides farming.',
          '14. Approximately how many Jewish people lived across Europe before 1939?',
          '15. What cardboard cone filled with sweets did German children carry on their first day of school?',
          '16. In what year were Jewish pupils completely banned from attending state schools?',
          '17. What was the name of the German cipher typewriter used to scramble battle orders?',
          '18. Name the genius mathematician who designed the Bombe machines at Bletchley Park.',
          '19. How many rotor wheels scrambled the electrical circuits inside an Enigma machine?',
          '20. For how many years did Bletchley Park workers keep their codebreaking work secret?',
        ]
          .map(
            (q) => `
          <div class="quiz-q-item">
            <span class="quiz-q-text">${q}</span>
            <div class="ruled-line quiz-line"></div>
          </div>
        `,
          )
          .join('')}
      </div>

      <div class="sheet-footer">
        <span>The History Revision Hub • KS2 Pupil Workbook</span>
        <span>Retrieval Challenge • Page 22 of 24</span>
      </div>
    </div>
  </div>

  <!-- PAGE 23: RETRIEVAL QUIZ PART 2 -->
  <div class="workbook-page" id="page-23">
    <div class="exercise-book-cutline">
      <div class="sheet-masthead">
        <div class="brand-left">
          <span class="brand-badge">RETRIEVAL CHALLENGE</span>
          <span class="brand-text">Knowledge Recall • Questions 21 to 40</span>
        </div>
        <div class="student-fields"><div class="field-item">Total: <span class="field-line" style="width:18mm;"></span> / 40</div></div>
      </div>

      <div class="enquiry-banner">
        <div class="enquiry-title-group">
          <h1>WW2 Knowledge Retrieval Challenge (Part 2)</h1>
          <p class="enquiry-question">Questions 21 to 40 covering Rescuers, VE Day, and the Home Front.</p>
        </div>
        <div class="lesson-badge">QUIZ<br><span style="font-size:6pt; font-weight:600;">PART 2</span></div>
      </div>

      <div class="quiz-questions-grid">
        ${[
          '21. Who was the 29-year-old London stockbroker who rescued 669 children from Prague?',
          '22. Name the Dorset schoolmaster who stayed in Prague facing the Gestapo.',
          '23. Where did Nicholas Winton hide his rescue scrapbook for nearly 50 years?',
          "24. Who discovered Nicholas Winton's scrapbook in the attic in 1988?",
          '25. What is the definition of an "upstander"?',
          '26. What does "VE Day" stand for, and on what date did it occur in 1945?',
          "27. Who was the Prime Minister who announced Germany's surrender on VE Day?",
          '28. What food did communities save their coupons for to celebrate on VE Day?',
          '29. In what year did food rationing finally end in Great Britain?',
          '30. What was the name of the indoor steel shelter that could double as a kitchen table?',
          '31. What did people paint white on city streets to help drivers in the blackout?',
          '32. Why did ships travel together in "convoys" across the Atlantic Ocean?',
          '33. What weapon did German submarines use to attack merchant ships?',
          '34. What did Air Raid Wardens shout if they saw a chink of light at night?',
          '35. How many consecutive nights was London bombed during the Blitz?',
          '36. What famous cathedral survived the Blitz surrounded by fires in London?',
          '37. Name the country where Nicholas Winton travelled to rescue children in 1938.',
          '38. What station in London did the Kindertransport children arrive at?',
          '39. Why did families plant cabbages and potatoes on top of their Anderson shelters?',
          '40. What is the most important lesson the Second World War generation taught us?',
        ]
          .map(
            (q) => `
          <div class="quiz-q-item">
            <span class="quiz-q-text">${q}</span>
            <div class="ruled-line quiz-line"></div>
          </div>
        `,
          )
          .join('')}
      </div>

      <div class="sheet-footer">
        <span>The History Revision Hub • KS2 Pupil Workbook</span>
        <span>Retrieval Challenge • Page 23 of 24</span>
      </div>
    </div>
  </div>

  <!-- PAGE 24: BACK COVER & HISTORIAN PROGRESS -->
  <div class="workbook-page" id="page-24">
    <div class="exercise-book-cutline back-cover-cutline">
      <div class="sheet-masthead">
        <div class="brand-left">
          <span class="brand-badge">HISTORIAN RECORD</span>
          <span class="brand-text">Teacher Feedback &amp; Historical Word Bank</span>
        </div>
      </div>

      <div class="back-cover-header">
        <h2>YOUR HISTORIAN JOURNEY • SKILLS &amp; MASTERY</h2>
        <p>Key Stage 2 Historical Knowledge, Evidence Detective &amp; Empathy</p>
      </div>

      <div class="rubric-grid">
        <div class="rubric-card">
          <h4>Historical Knowledge &amp; Chronology</h4>
          <p>Understands the causes, major milestones, and home front conditions of the Second World War (1939–1945).</p>
          <div class="rubric-grade">Working Towards / At Age / Greater Depth</div>
        </div>
        <div class="rubric-card">
          <h4>Primary Evidence &amp; Visual Deduction</h4>
          <p>Extracts meaningful historical deductions from photographs, government posters, and artifact records without bias.</p>
          <div class="rubric-grade">Working Towards / At Age / Greater Depth</div>
        </div>
        <div class="rubric-card">
          <h4>Historical Empathy &amp; Significance</h4>
          <p>Explains how ordinary children, evacuees, Land Girls, and refugees experienced wartime separation and resilience.</p>
          <div class="rubric-grade">Working Towards / At Age / Greater Depth</div>
        </div>
      </div>

      <div class="teacher-feedback-box">
        <div class="feedback-title">TEACHER COMMENDATION &amp; TARGET FEEDBACK</div>
        <div class="feedback-lines">
          <div class="ruled-line"></div>
          <div class="ruled-line"></div>
          <div class="ruled-line"></div>
          <div class="ruled-line"></div>
        </div>
        <div class="feedback-sig-row">
          <span>Teacher Signature: ______________________</span>
          <span>Date: ____________</span>
          <span>Mastery Award: ⭐⭐⭐</span>
        </div>
      </div>

      <div class="glossary-box">
        <div class="glossary-title">HISTORICAL WORD BANK</div>
        <div class="glossary-grid">
          <div><strong>Evacuee:</strong> Child sent from cities to safety.</div>
          <div><strong>Blackout:</strong> Turning off lights to hide from bombers.</div>
          <div><strong>Anderson Shelter:</strong> Corrugated steel garden bunker.</div>
          <div><strong>Rationing:</strong> Fair sharing of food during shortage.</div>
          <div><strong>Kindertransport:</strong> Rescue of 10,000 refugee children.</div>
          <div><strong>Bletchley Park:</strong> Secret UK codebreaking station.</div>
          <div><strong>Upstander:</strong> Person who acts to protect others.</div>
          <div><strong>VE Day:</strong> Victory in Europe Day (8 May 1945).</div>
        </div>
      </div>

      <div class="sheet-footer">
        <span>The History Revision Hub • Key Stage 2 History</span>
        <span>World War II Pupil Workbook • Page 24 of 24 • Well Done Historian!</span>
      </div>
    </div>
  </div>
  `;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>KS2 History: World War II &amp; The Home Front — Complete Pupil Workbook</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700;800;900&family=Inter:wght@400;500;600;700;800&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Outfit:wght@600;700;800;900&display=swap" rel="stylesheet">
  <style>
    :root {
      --ink: #1e293b;
      --ink-muted: #475569;
      --navy-primary: #1e3a8a;
      --navy-deep: #0f172a;
      --parchment: #fdfbf7;
      --accent-gold: #b45309;
      --border-gray: #cbd5e1;
      --card-bg: #ffffff;
      --cut-guide: #94a3b8;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    body {
      background: #f1f5f9;
      font-family: 'Inter', sans-serif;
      color: var(--ink);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 15mm;
      padding: 15mm 0;
    }

    @page {
      size: A4 portrait;
      margin: 0;
    }

    @media print {
      body {
        background: transparent;
        padding: 0;
        gap: 0;
      }
      .workbook-page {
        box-shadow: none !important;
        page-break-after: always;
        break-after: page;
        margin: 0;
      }
    }

    .workbook-page {
      width: 210mm;
      height: 297mm;
      background: #ffffff;
      box-shadow: 0 10px 25px rgba(0,0,0,0.08);
      position: relative;
      overflow: hidden;
      padding: 6.5mm 7.5mm;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
    }

    .exercise-book-cutline {
      width: 100%;
      height: 100%;
      border: 1.5px dashed var(--cut-guide);
      border-radius: 6px;
      padding: 4.5mm 5.5mm;
      display: flex;
      flex-direction: column;
      position: relative;
      background: #ffffff;
      box-sizing: border-box;
      overflow: hidden;
    }

    /* COVER STYLES */
    .cover-cutline {
      justify-content: space-between;
      border: 2px solid var(--navy-deep);
      padding: 6mm 7mm;
    }
    .cover-masthead {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid var(--navy-deep);
      padding-bottom: 1.8mm;
    }
    .cover-brand-badge {
      font-family: 'Cinzel', serif;
      font-size: 8.5pt;
      font-weight: 800;
      color: var(--navy-deep);
      letter-spacing: 0.08em;
    }
    .cover-date-pill {
      background: #0f172a;
      color: #fde68a;
      font-size: 7.2pt;
      font-weight: 800;
      padding: 2px 8px;
      border-radius: 12px;
      letter-spacing: 0.05em;
    }
    .cover-hero-box {
      text-align: center;
      margin: 2mm 0;
    }
    .cover-title {
      font-family: 'Cinzel', serif;
      font-size: 19pt;
      font-weight: 900;
      color: var(--navy-deep);
      letter-spacing: 0.03em;
      line-height: 1.15;
    }
    .cover-subtitle {
      font-size: 8.5pt;
      font-weight: 700;
      color: var(--accent-gold);
      letter-spacing: 0.1em;
      margin-top: 1mm;
    }
    .cover-plate-box {
      background: #f8fafc;
      border: 1.5px solid var(--border-gray);
      border-radius: 6px;
      padding: 2.2mm;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .cover-hero-img {
      max-height: 66mm;
      max-width: 100%;
      width: auto;
      height: auto;
      object-fit: contain;
      border-radius: 4px;
      display: block;
      margin: 0 auto;
    }
    .cover-caption {
      font-size: 7.2pt;
      color: var(--ink-muted);
      margin-top: 1.2mm;
      font-style: italic;
    }
    .student-id-block {
      background: #fdfbf7;
      border: 1.5px solid #fed7aa;
      border-radius: 6px;
      padding: 2.5mm 4mm;
      display: flex;
      flex-direction: column;
      gap: 1.8mm;
      font-size: 8.2pt;
      font-weight: 700;
      color: var(--navy-deep);
    }
    .id-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .id-line {
      flex: 1;
      border-bottom: 1.2px solid var(--navy-deep);
      height: 4mm;
    }
    .id-tag {
      background: #1e3a8a;
      color: #ffffff;
      padding: 1px 7px;
      border-radius: 4px;
      font-size: 7.4pt;
      font-weight: 800;
    }
    .id-tag-accent {
      color: #b45309;
      font-weight: 800;
      font-size: 8.0pt;
    }
    .cover-enquiries-dir {
      border: 1.6px solid #93c5fd;
      border-radius: 6px;
      overflow: hidden;
      box-shadow: 0 2px 6px rgba(30,58,138,0.06);
    }
    .dir-header {
      background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
      color: #ffffff;
      font-family: 'Outfit', sans-serif;
      padding: 2.0mm 3.5mm;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1.5px;
    }
    .dir-header-title {
      font-size: 8.8pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .dir-header-sub {
      font-size: 6.8pt;
      font-weight: 500;
      color: #dbeafe;
      letter-spacing: 0.02em;
    }
    .dir-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.8mm 3.2mm;
      padding: 2.2mm 3.2mm;
      background: #f8fafc;
    }
    .dir-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-family: 'Outfit', sans-serif;
      font-size: 7.8pt;
      color: var(--ink);
      gap: 6px;
      background: #ffffff;
      padding: 1.2mm 2.4mm;
      border-radius: 4px;
      border: 1px solid #cbd5e1;
    }
    .dir-pill {
      font-weight: 800;
      color: #ffffff;
      background: #1e3a8a;
      font-size: 6.8pt;
      padding: 1.2px 5.5px;
      border-radius: 3px;
      flex-shrink: 0;
    }
    .dir-name {
      flex: 1;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #0f172a;
    }
    .dir-check-box {
      width: 12px;
      height: 12px;
      border: 1.5px solid #3b82f6;
      border-radius: 3px;
      background: #ffffff;
      flex-shrink: 0;
    }
    .cover-footer {
      display: flex;
      justify-content: space-between;
      font-size: 6.8pt;
      color: #94a3b8;
      border-top: 1px solid var(--border-gray);
      padding-top: 1.5mm;
    }

    /* SPREAD STYLES */
    .sheet-masthead {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid var(--navy-deep);
      padding-bottom: 1.5mm;
      margin-bottom: 1.6mm;
      flex-shrink: 0;
    }
    .brand-left {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .brand-badge {
      background: var(--navy-deep);
      color: #ffffff;
      font-size: 7.4pt;
      font-weight: 800;
      padding: 1.5px 6px;
      border-radius: 3px;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }
    .brand-text {
      font-size: 8.0pt;
      font-weight: 700;
      color: var(--navy-deep);
      letter-spacing: 0.02em;
      text-transform: uppercase;
    }
    .student-fields {
      display: flex;
      gap: 12px;
      font-size: 7.8pt;
      color: var(--ink-muted);
      font-weight: 600;
    }
    .field-item {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .field-line {
      display: inline-block;
      width: 24mm;
      border-bottom: 1.2px solid var(--ink);
    }
    .enquiry-banner {
      background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%);
      color: #ffffff;
      border-radius: 6px;
      padding: 2.2mm 3.5mm;
      margin-bottom: 1.8mm;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-shrink: 0;
    }
    .enquiry-title-group h1 {
      font-family: 'Cinzel', serif;
      font-size: 11.2pt;
      font-weight: 800;
      letter-spacing: 0.02em;
      margin-bottom: 0.6mm;
      line-height: 1.15;
    }
    .enquiry-question {
      font-size: 7.8pt;
      font-weight: 500;
      color: #cbd5e1;
    }
    .lesson-badge {
      background: rgba(255, 255, 255, 0.12);
      border: 1px solid rgba(255, 255, 255, 0.25);
      border-radius: 4px;
      padding: 1.5mm 3.5mm;
      text-align: center;
      font-size: 7.4pt;
      font-weight: 800;
      letter-spacing: 0.05em;
      color: #fde68a;
      flex-shrink: 0;
      margin-left: 8px;
    }

    /* VERSO BODY */
    .spread-verso-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 0;
    }
    .verso-story-box {
      background: var(--parchment);
      border: 1px solid #fed7aa;
      border-left: 4px solid var(--accent-gold);
      border-radius: 6px;
      padding: 2.2mm 3.5mm;
    }
    .story-header {
      font-size: 8.8pt;
      font-weight: 800;
      color: var(--accent-gold);
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin-bottom: 1.0mm;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .story-prose {
      font-family: 'Lora', serif;
      font-size: 11.6pt;
      line-height: 1.54;
      color: #0f172a;
      font-weight: 500;
    }
    .verso-plate-box {
      background: #f8fafc;
      border: 1.5px solid var(--border-gray);
      border-radius: 6px;
      padding: 2.2mm;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .verso-img {
      max-height: 76mm;
      max-width: 100%;
      width: auto;
      height: auto;
      object-fit: contain;
      border-radius: 4px;
      border: 1px solid #cbd5e1;
      display: block;
      margin: 0 auto;
    }
    .archival-caption {
      font-size: 7.6pt;
      color: var(--ink-muted);
      margin-top: 1.4mm;
      line-height: 1.35;
      text-align: center;
      width: 100%;
    }
    .vocab-strip {
      background: #eef2ff;
      border: 1.2px solid #c7d2fe;
      border-radius: 6px;
      padding: 1.6mm 3.5mm;
      display: flex;
      align-items: center;
      gap: 7px;
      flex-wrap: wrap;
    }
    .vocab-title {
      font-size: 8.0pt;
      font-weight: 800;
      color: #3730a3;
      letter-spacing: 0.04em;
    }
    .vocab-pill {
      background: #ffffff;
      border: 1.2px solid #a5b4fc;
      color: #312e81;
      font-size: 8.0pt;
      font-weight: 700;
      padding: 1.5px 7px;
      border-radius: 10px;
    }

    /* RECTO TASKS */
    .recto-tasks-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 2.8mm;
      min-height: 0;
    }
    .task-box {
      background: var(--card-bg);
      border: 1.2px solid var(--border-gray);
      border-radius: 6px;
      padding: 2.2mm 3.2mm 2.0mm;
      display: flex;
      flex-direction: column;
      flex: 1;
      min-height: 0;
    }
    .synthesis-box {
      background: #fdfbf7;
      border-color: #fed7aa;
      border-left: 4px solid var(--accent-gold);
      flex: 1.25;
    }
    .task-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.8mm;
      flex-shrink: 0;
    }
    .task-num-title {
      font-size: 8.6pt;
      font-weight: 800;
      color: var(--navy-deep);
    }
    .task-tag {
      font-size: 6.8pt;
      font-weight: 700;
      padding: 1px 5px;
      border-radius: 3px;
      text-transform: uppercase;
      background: #e0e7ff;
      color: #3730a3;
    }
    .task-prompt {
      font-size: 8.4pt;
      color: #334155;
      margin-bottom: 1.0mm;
      line-height: 1.30;
      flex-shrink: 0;
    }
    .font-bold {
      font-weight: 700;
      color: #1e3a8a;
    }
    .ruled-lines {
      display: flex;
      flex-direction: column;
      flex: 1;
      justify-content: space-between;
      min-height: 0;
      gap: 0;
    }
    .ruled-line {
      border-bottom: 1.2px dashed #94a3b8;
      flex: 1;
      min-height: 5.4mm;
      width: 100%;
    }

    /* QUIZ & BACK COVER */
    .quiz-questions-grid {
      flex: 1;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.6mm 4mm;
      min-height: 0;
    }
    .quiz-q-item {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .quiz-q-text {
      font-size: 7.6pt;
      font-weight: 700;
      color: var(--navy-deep);
      line-height: 1.25;
    }
    .quiz-line {
      height: 4.6mm;
    }
    .back-cover-cutline {
      justify-content: space-between;
    }
    .back-cover-header {
      text-align: center;
      margin-bottom: 1.6mm;
    }
    .back-cover-header h2 {
      font-family: 'Cinzel', serif;
      font-size: 13pt;
      font-weight: 800;
      color: var(--navy-deep);
    }
    .back-cover-header p {
      font-size: 7.8pt;
      color: var(--accent-gold);
      font-weight: 700;
    }
    .rubric-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 2.0mm;
    }
    .rubric-card {
      background: #f8fafc;
      border: 1px solid var(--border-gray);
      border-radius: 6px;
      padding: 2.0mm;
      font-size: 7.2pt;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .rubric-card h4 {
      font-size: 7.6pt;
      font-weight: 800;
      color: var(--navy-primary);
      margin-bottom: 0.8mm;
    }
    .rubric-grade {
      margin-top: 1.4mm;
      padding: 1.2mm;
      background: #ffffff;
      border: 1px dashed var(--navy-primary);
      text-align: center;
      font-weight: 700;
      color: var(--navy-primary);
      border-radius: 4px;
      font-size: 6.4pt;
    }
    .teacher-feedback-box {
      background: #fffdfa;
      border: 1.5px solid #fed7aa;
      border-radius: 6px;
      padding: 2.4mm 3mm;
    }
    .feedback-title {
      font-size: 7.6pt;
      font-weight: 800;
      color: var(--accent-gold);
      margin-bottom: 1.0mm;
    }
    .feedback-lines {
      display: flex;
      flex-direction: column;
      gap: 0;
      margin-bottom: 1.5mm;
    }
    .feedback-sig-row {
      display: flex;
      justify-content: space-between;
      font-size: 7.0pt;
      font-weight: 600;
      color: var(--ink-muted);
    }
    .glossary-box {
      border: 1px solid var(--border-gray);
      border-radius: 6px;
      padding: 2.0mm 3mm;
    }
    .glossary-title {
      font-size: 7.4pt;
      font-weight: 800;
      color: var(--navy-deep);
      margin-bottom: 1.0mm;
    }
    .glossary-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1mm 3mm;
      font-size: 7.0pt;
      color: var(--ink-muted);
    }

    .sheet-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid #e2e8f0;
      padding-top: 1.2mm;
      margin-top: 1.2mm;
      font-size: 6.8pt;
      color: #94a3b8;
      flex-shrink: 0;
    }
  </style>
</head>
<body>

${pagesHtml}

</body>
</html>
  `;
}

const html = generateWorkbookHtml();
fs.writeFileSync(path.join(unitsDir, 'pupil_workbook.html'), html, 'utf8');
fs.writeFileSync(path.join(pubDir, 'pupil_workbook.html'), html, 'utf8');
console.log('🎉 Successfully created 24-page KS2 Pupil Workbook!');
