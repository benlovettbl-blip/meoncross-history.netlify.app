const fs = require('fs');
const path = require('path');

const postWarVideos = [
  // Lesson 1: Votes for Women (Suffragists vs Suffragettes)
  [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=pw0IAFIhVfA',
      title:
        'Suffragettes vs Suffragists: Did violent protest get women the vote? | Channel 4 News',
      duration: '6 mins 33 secs',
      teacher_guidance:
        "Deep historical evaluation comparing Millicent Fawcett's constitutional NUWSS (lobbying, peaceful marches) with Emmeline Pankhurst's militant WSPU ('Deeds, not words', arson, window smashing, hunger strikes). Explores which faction was truly decisive in achieving the 1918 Representation of the People Act.",
      viewing_task:
        'How did the contrasting methods of the Suffragists (NUWSS) and Suffragettes (WSPU) differ, and what evidence is there for which group was more influential in securing the vote?',
      model_answer:
        "The Suffragists (NUWSS, led by Millicent Fawcett from 1897) believed in non-violent, constitutional methods such as presenting parliamentary petitions, organising public meetings, and lobbying MPs, proving women were responsible and politically mature. In contrast, the Suffragettes (WSPU, founded by Emmeline Pankhurst in 1903) adopted militant direct action under the slogan 'Deeds, not words'—smashing shop windows, cutting telegraph wires, burning post boxes, and enduring hunger strikes and force-feeding in prison. While militant tactics kept women's suffrage on the front pages and made it impossible for the government to ignore, critics argue it alienated moderate politicians and provided an excuse for Herbert Asquith's government to refuse concessions. Most historians conclude that women's indispensable economic and industrial contribution during the First World War (1914–1918), combined with decades of patient Suffragist groundwork, ultimately convinced Parliament to pass the 1918 Representation of the People Act.",
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=ZNeg2cfUHRw',
      title: 'Votes for Women | Timelines.tv History of Britain',
      duration: '8 mins 26 secs',
      teacher_guidance:
        "Andrew Chater explores the Edwardian campaign for female suffrage, examining the arrest and force-feeding of suffragette prisoners, the Cat and Mouse Act (1913), and Emily Wilding Davison's tragic death at the 1913 Epsom Derby.",
      viewing_task:
        'Why did the Suffragettes escalate their campaign to militant tactics, and how did the British government respond to hunger strikes?',
      model_answer:
        "Suffragettes escalated to militant direct action because decades of peaceful campaigning and broken political promises had produced zero legislative progress in Parliament. Frustrated by government stalling, the WSPU used civil disobedience to force the issue into national consciousness. When arrested Suffragettes went on hunger strike in prison as political prisoners, the Liberal government feared creating martyrs and initially subjected them to painful, dangerous force-feeding via nasal tubes. Following public outrage, Parliament passed the Prisoners (Temporary Discharge for Ill-Health) Act 1913—popularly dubbed the 'Cat and Mouse Act'—which temporarily released severely weakened hunger-striking women to recover at home before re-arresting them to complete their sentences.",
    },
  ],

  // Lesson 2: 1945: The Welfare State and NHS
  [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=YokrY_G8L-c',
      title: 'Why was Churchill voted out of office after WW2? | History Matters',
      duration: '3 mins 17 secs',
      teacher_guidance:
        "Explains why the British electorate rejected war hero Winston Churchill in July 1945 in favour of Clement Attlee's Labour Party, which promised comprehensive social reform based on William Beveridge's 1942 blueprint.",
      viewing_task:
        "Why did the British public elect Clement Attlee's Labour Party in July 1945 despite Winston Churchill's wartime popularity?",
      model_answer:
        "Although Winston Churchill was celebrated as a victorious wartime leader, voters associated the Conservative Party with the bitter economic depression, mass unemployment, and means-tested poverty of the 1930s. Furthermore, the shared sacrifice of total war, rationing, and evacuation had created a powerful national consensus that post-war reconstruction must build a fairer society. Clement Attlee's Labour Party offered a clear, radical domestic programme pledging full employment, mass council house construction, and the complete implementation of the 1942 Beveridge Report to slay the 'Five Giants' (Want, Disease, Ignorance, Squalor, and Idleness). Churchill's campaign focus on foreign policy and his ill-judged claim that Labour would require a 'Gestapo' convinced the public that Labour was best suited to win the peace.",
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=0pnEMBgEG24',
      title: 'The Foundation of the National Health Service | BBC Bitesize for Teachers',
      duration: '9 mins 59 secs',
      teacher_guidance:
        "Archival testimonies and historical analysis documenting healthcare inequality prior to 1948, Health Minister Aneurin Bevan's battle against the British Medical Association, and the opening of Park Hospital on 5 July 1948.",
      viewing_task:
        "How did healthcare in Britain change on 5 July 1948, and how did Health Minister Aneurin Bevan overcome doctors' opposition?",
      model_answer:
        "Prior to 5 July 1948, British healthcare was deeply unequal and fragmented: low-paid working men had limited GP cover under the 1911 National Insurance Act, but wives, children, and the elderly had to pay private fees, join charitable clubs, or rely on stigmatised municipal workhouse infirmaries. On 5 July 1948, Minister of Health Aneurin Bevan officially opened the National Health Service (NHS) at Park Hospital, Manchester, establishing a universal system funded through general taxation and free at the point of delivery for all citizens regardless of wealth. To defeat fierce opposition from the British Medical Association (BMA), who feared becoming state-controlled civil servants, Bevan pragmatically compromised—famously stating he 'stuffed their mouths with gold'—by permitting hospital consultants to retain private paying beds alongside their NHS work and paying GPs on a per-patient capitation basis.",
    },
  ],

  // Lesson 3: The Windrush Generation
  [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=Si3IRAPJkkU',
      title:
        'What is the Windrush Generation? | Finding My Family: A Windrush Special | BBC Newsround',
      duration: '2 mins 09 secs',
      teacher_guidance:
        'Essential primer introducing the arrival of the HMT Empire Windrush on 22 June 1948, the British Nationality Act 1948, post-war labour shortages, and Caribbean contributions to British public services.',
      viewing_task:
        'Why were Caribbean citizens invited to Britain in 1948, and what rights did they hold under British law?',
      model_answer:
        "Following the Second World War, Britain faced severe labour shortages to rebuild bombed cities, run London Transport, staff British Rail, and operate the newly established National Health Service. Under the British Nationality Act 1948, all citizens of the British Empire and Commonwealth were granted British citizenship, holding an unrestricted legal right to enter, settle, and work in the United Kingdom. On 22 June 1948, the HMT Empire Windrush docked at Tilbury carrying 492 passengers from Jamaica, Trinidad, and other Caribbean islands, who arrived as proud British subjects responding to government recruitment calls to help reconstruct the post-war 'Mother Country'.",
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=g2vLT8xwSf4',
      title:
        "1974: Windrush Generation Recall Arriving in Britain in 1948 | Yesterday's Witness | BBC Archive",
      duration: '4 mins 44 secs',
      teacher_guidance:
        "Primary oral history testimonies from Windrush passengers recalling their arrival, freezing British weather, racial discrimination in private housing ('No Irish, No Blacks, No Dogs'), and community resilience.",
      viewing_task:
        'What practical challenges and racial discrimination did early Caribbean arrivals face when settling in post-war Britain?',
      model_answer:
        "Upon arriving in Britain, Caribbean migrants faced harsh weather, austere living conditions, and widespread colour bars in accommodation and employment. Landlords routinely refused housing to Black tenants, displaying racist signs in windows reading 'No Irish, No Blacks, No Dogs', forcing many migrants to pool money through informal saving schemes (Pardner schemes) to buy homes collectively. In the workplace, highly qualified professionals like teachers, engineers, and nurses were often relegated to low-skilled manual labour or denied promotion. Despite these hostile barriers, Caribbean communities established churches, social clubs, and cultural traditions that enriched British society, laying the foundations for modern multicultural Britain.",
    },
  ],

  // Lesson 4: The 1963 Bristol Bus Boycott & UK Civil Rights
  [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=uSyzaXXKUaQ',
      title: 'The Story of the Bristol Bus Boycott | The Black Curriculum',
      duration: '1 min 54 secs',
      teacher_guidance:
        "High-impact animated and photographic breakdown of the 1963 Bristol Bus Boycott, detailing the 'colour bar' operated by the Bristol Omnibus Company and the union, and how non-violent direct action triumphed.",
      viewing_task:
        'Why was the Bristol Bus Boycott launched in April 1963, and what tactical inspiration did the organisers draw from abroad?',
      model_answer:
        "In early 1963, the state-owned Bristol Omnibus Company operated an open 'colour bar', refusing to hire Black or Asian conductors or drivers despite acute staff shortages, with the compliance of the Transport and General Workers' Union (TGWU). When 18-year-old Guy Bailey was denied an interview purely because of his race, youth worker Paul Stephenson, Roy Hackett, Audley Evans, and Owen Henry formed the West Indian Development Council. Inspired by Rosa Parks and Martin Luther King Jr.'s 1955 Montgomery Bus Boycott in Alabama, they launched a total boycott of Bristol buses on 30 April 1963, rallying students, church leaders, and politicians to demand an end to racial discrimination.",
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=rQXwh__d2S4',
      title:
        'How the Bristol Bus Boycott Changed UK Civil Rights | Witness History | BBC World Service',
      duration: '3 mins 45 secs',
      teacher_guidance:
        "Explores the national fallout of the boycott, intervention by Labour MP Tony Benn and Harold Wilson, the collapse of the colour bar on 28 August 1963, and how it directly led to Britain's Race Relations Acts of 1965 and 1968.",
      viewing_task:
        'What were the major short-term and long-term consequences of the 1963 Bristol Bus Boycott for British legislation?',
      model_answer:
        "In the short term, after four months of public pressure, passenger boycotts, and student protest marches, the Bristol Omnibus Company surrendered on 28 August 1963—the exact same day Martin Luther King Jr. delivered his 'I Have a Dream' speech in Washington—announcing an immediate end to the colour bar and hiring Bristol's first non-white bus conductor, Raghbir Singh, in September. In the long term, the boycott exposed the complete absence of UK legal protections against racial discrimination, prompting Harold Wilson's incoming Labour government to pass the landmark Race Relations Act 1965 (outlawing discrimination in public places) and the Race Relations Act 1968 (extending protections to housing and employment).",
    },
  ],

  // Lesson 5: The Cold War on the Home Front
  [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=UgOybc8Jdoo',
      title:
        'Nuclear Attack: Protect & Survive: Action After Warnings (1975) | CharlieDeanArchives',
      duration: '4 mins 14 secs',
      teacher_guidance:
        "Authentic Cold War British public information film produced by the Central Office of Information for the Home Office. Instructs families on creating 'fallout rooms' and inner core shelters with doors and sandbags.",
      viewing_task:
        "What survival instructions did the British government's 'Protect and Survive' campaign give citizens in the event of a nuclear strike, and why was it criticised?",
      model_answer:
        "The British government's 'Protect and Survive' campaign advised families to prepare an 'inner core shelter' inside the safest room of their house—typically under stairs or using unhinged doors leaned against walls and packed with sandbags, mattresses, and books to absorb fallout radiation. Citizens were instructed to hoard 14 days of canned food and water, paint window panes white with slaked lime to reflect thermal flash, and remain sheltered until official radio broadcasts sounded the all-clear. However, the campaign faced intense public mockery and political criticism from groups like the Campaign for Nuclear Disarmament (CND) and scientist E.P. Thompson, who pointed out that flimsy domestic lean-to shelters provided zero real protection against the blast, heat, and lethal fallout of multi-megaton thermonuclear warheads.",
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=glYUnmhi5zU',
      title: 'York Cold War Bunker | 10 Places That Made England with Dan Snow | English Heritage',
      duration: '8 mins 17 secs',
      teacher_guidance:
        'Historian Dan Snow tours the semi-subterranean York Cold War Bunker, built in 1961 for the Royal Observer Corps (ROC) to monitor nuclear fallout and calculate blast yields.',
      viewing_task:
        "What was the purpose of the York Cold War Bunker, and what role did Royal Observer Corps volunteers play in Britain's civil defence?",
      model_answer:
        "Built in 1961 during the height of Cold War tensions, the York Cold War Bunker served as the blast-proof headquarters for the No. 20 Group of the Royal Observer Corps (ROC). Designed with massive reinforced concrete walls, decontamination airlocks, and independent air filtration systems, the bunker was engineered to shelter 60 volunteers sealed inside for up to 30 days during a thermonuclear attack. The ROC's mission was to triangulate atomic detonations using pinhole Bomb Power Indicators (BPIs), track lethal radioactive fallout plumes with survey meters, and relay fallout warnings to local authorities and military command posts across Yorkshire to coordinate emergency responses.",
    },
  ],

  // Lesson 6: Assessment: How has British identity transformed since 1945?
  [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=i4U3o4adeP8',
      title: 'Festival Of Britain - Short Version (1951) | British Pathé',
      duration: '2 mins 36 secs',
      teacher_guidance:
        "Archival newsreel showcasing the 1951 Festival of Britain on London's South Bank, designed by Clement Attlee's Labour government as a 'tonic to the nation' to celebrate modern British design, science, and democratic vitality.",
      viewing_task:
        'What was the primary purpose of the 1951 Festival of Britain, and how did it represent a reimagining of British post-war identity?',
      model_answer:
        "The 1951 Festival of Britain was commissioned by Clement Attlee's government to mark the centenary of Prince Albert's 1851 Great Exhibition and provide a 'tonic to the nation' following six years of wartime destruction and grim post-war austerity. Located on London's regenerated South Bank, the exhibition showcased futuristic British architecture, modernist engineering (such as the Skylon and the Dome of Discovery), and technological innovation. It represented a deliberate shift in British identity away from imperial militarism toward modern social democracy, civic optimism, scientific prowess, and cultural renewal.",
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=qoo3gnKaUzM',
      title: 'Post War Britain 1945–1979 | History Skimmed',
      duration: '10 mins 17 secs',
      teacher_guidance:
        'Comprehensive thematic synoptic overview tracing post-war Britain from 1945 to 1979: the welfare state, decolonisation and loss of Empire, Commonwealth immigration, cultural revolution, and youth culture.',
      viewing_task:
        "How did decolonisation, Commonwealth immigration, and changing social values transform the definition of 'Britishness' between 1945 and the late 1970s?",
      model_answer:
        "Between 1945 and the late 1970s, British national identity underwent a profound transformation on multiple fronts. Geopolitically, the rapid decline and collapse of the British Empire (marked by Indian independence in 1947, the 1956 Suez Crisis, and Harold Macmillan's 1960 'Wind of Change') dismantled the traditional identity of Britain as a global imperial ruler. Demographically and culturally, the arrival of hundreds of thousands of Commonwealth citizens from the Caribbean, India, Pakistan, and Bangladesh created a diverse, multi-ethnic society, celebrated in music, food, and civil rights activism despite enduring racial prejudice. Domestically, universal healthcare (the NHS), compulsory secondary education (1944 Butler Act), the expansion of higher education, and the liberalising legislation of the 1960s (decriminalisation of homosexuality, legalisation of abortion, and abolition of theatre censorship) reshaped Britain into a more secular, pluralistic, and tolerant modern democracy.",
    },
  ],
];

// Read existing unitData
const dataFilePath = path.join(__dirname, '../units/post_war_britain/data.js');
let content = fs.readFileSync(dataFilePath, 'utf8');

// Load unitData safely
// Remove ESM exports for node eval
const sandbox = {};
const executableContent = content
  .replace(/export\s+default\s+unitData;?/g, '')
  .replace(/export\s+\{\s*unitData\s*\};?/g, '')
  .replace(/if\s*\(typeof\s+module[\s\S]*?\}/g, '');

const vm = require('vm');
vm.runInNewContext(executableContent + '\nthis.unitData = unitData;', sandbox);
const unitData = sandbox.unitData;

if (!unitData || !unitData.lessons) {
  console.error('Could not parse unitData from post_war_britain/data.js');
  process.exit(1);
}

console.log(`Loaded post_war_britain with ${unitData.lessons.length} lessons.`);

unitData.lessons.forEach((lesson, idx) => {
  if (postWarVideos[idx]) {
    lesson.video = postWarVideos[idx];
    console.log(`Lesson ${idx + 1}: Injected ${lesson.video.length} videos.`);
  }
});

// Construct new clean data.js with dual exports
const newContent = `const unitData = ${JSON.stringify(unitData, null, 2)};\nexport default unitData;\nexport { unitData };\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = unitData;\n}\n`;

fs.writeFileSync(dataFilePath, newContent, 'utf8');
console.log(`Updated ${dataFilePath}`);

// Sync to public/data/post_war_britain.json
const publicJsonPath = path.join(__dirname, '../public/data/post_war_britain.json');
if (fs.existsSync(publicJsonPath)) {
  fs.writeFileSync(publicJsonPath, JSON.stringify(unitData, null, 2), 'utf8');
  console.log(`Updated ${publicJsonPath}`);
}

// Sync to data/post_war_britain.json
const dataJsonPath = path.join(__dirname, '../data/post_war_britain.json');
if (fs.existsSync(dataJsonPath)) {
  fs.writeFileSync(dataJsonPath, JSON.stringify(unitData, null, 2), 'utf8');
  console.log(`Updated ${dataJsonPath}`);
}

console.log('Post-War Britain video injection complete!');
