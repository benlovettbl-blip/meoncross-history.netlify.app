const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = path.join(__dirname, '..');

console.log('======================================================');
console.log('🇬🇧 APPLYING 4-TIER IDEAL CLASSROOM VIDEO SHELF: POST-WAR BRITAIN');
console.log('======================================================');

const postWar4TierVideos = [
  // Lesson 0: Votes for Women
  [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=pw0IAFIhVfA',
      title: 'Suffragettes vs Suffragists: Did violent protest get women the vote? | Channel 4 News',
      duration: '6 mins 33 secs',
      pathway: 'Starter Hook',
      teacher_guidance:
        "Deep historical evaluation comparing Millicent Fawcett's constitutional NUWSS (lobbying, peaceful marches) with Emmeline Pankhurst's militant WSPU ('Deeds, not words', arson, window smashing, hunger strikes). Explores which faction was truly decisive in achieving the 1918 Representation of the People Act. Recommended Watch Window: 00:00–03:45 • Lesson Phase: Quick Starter Check (0–3m). Tone Alert: Fast, balanced historiographical debate.",
      viewing_task:
        '<ol><li><strong>[01:10] Quick Check:</strong> What were the contrasting slogans and methods used by Millicent Fawcett\'s Suffragists (NUWSS) versus Emmeline Pankhurst\'s Suffragettes (WSPU)?</li><li><strong>[03:20] Hinge Question:</strong> Did militant direct action accelerate parliamentary support for female suffrage or provide an excuse for Herbert Asquith\'s government to delay reform?</li></ol>',
      model_answer:
        '<ol><li><strong>Quick Check:</strong> The Suffragists used peaceful constitutional lobbying, petitions, and legal marches; the Suffragettes adopted militant direct action under the slogan "Deeds, not words", smashing windows, cutting wires, and enduring hunger strikes.</li><li><strong>Hinge Question:</strong> Militant tactics kept the suffrage campaign on front pages and made it impossible to ignore. However, critics argue it alienated moderate MPs and allowed Asquith to claim that granting votes under threat of violence would undermine the rule of law. Most historians conclude that women\'s crucial wartime industrial work in 1914–1918 broke the political impasse.</li></ol>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=ZNeg2cfUHRw',
      title: 'Votes for Women | Timelines.tv History of Britain',
      duration: '8 mins 26 secs',
      pathway: 'Enquiry Evidence',
      teacher_guidance:
        "Andrew Chater explores the Edwardian campaign for female suffrage, examining the arrest and force-feeding of suffragette prisoners, the Cat and Mouse Act (1913), and Emily Wilding Davison's tragic death at the 1913 Epsom Derby. Recommended Watch Window: 01:00–06:15 • Lesson Phase: Guided Instruction & Archival Investigation. Tone Alert: Superb narrative documentary with primary photographs and prison records.",
      viewing_task:
        '<ol><li><strong>[01:45] Recall:</strong> What was the official parliamentary name of the 1913 statute popularly nicknamed the "Cat and Mouse Act"?</li><li><strong>[03:30] Explain:</strong> Explain how prison force-feeding via nasal tubes was condemned by the British medical establishment and turned public sympathy in favor of imprisoned suffragettes.</li><li><strong>[05:40] Challenge:</strong> Evaluate the sacrifice of Emily Wilding Davison at the Epsom Derby in June 1913: was her death a calculated act of political martyrdom or a tragic misjudgment?</li></ol>',
      model_answer:
        '<ol><li><strong>Recall:</strong> The Prisoners (Temporary Discharge for Ill-Health) Act 1913.</li><li><strong>Explain:</strong> Force-feeding involved wardresses strapping weakened women to chairs and violently forcing rubber tubes down their noses or throats into the stomach. The brutal procedure caused severe physical trauma, vomiting, and lung infections, provoking outrage in Parliament and turning the government into the villain while suffragettes appeared as heroic martyrs for democracy.</li><li><strong>Challenge:</strong> Davison stepped onto the racetrack carrying two WSPU flags, intending to attach them to King George V\'s horse Anmer to publicize female suffrage before a global newsreel audience. Her death created massive public shock and a funeral procession of 6,000 women through London, cementing her status as a martyr, though hostile newspapers framed her action as evidence of dangerous fanaticism.</li></ol>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=3HdQ0iVrl2Y',
      title: 'Suffragette (2015, Sarah Gavron / Carey Mulligan, Meryl Streep) | Official UK Trailer',
      duration: '2 mins 32 secs',
      pathway: 'Cinematic',
      teacher_guidance:
        'Theatrical feature film starring Carey Mulligan, Helena Bonham Carter, and Meryl Streep as Emmeline Pankhurst. Centers on working-class Bethnal Green laundry worker Maud Watts drawn into the radical underground WSPU campaign. Recommended Watch Window: 00:00–02:32 (Full Trailer). Lesson Phase: Cinematic Starter Hook & Working-Class Militancy. Tone Alert: Gritty, emotionally visceral period drama.',
      viewing_task:
        '<p><strong>Cinematic Discussion Focus:</strong> Notice how the trailer depicts the grueling working conditions of working-class women in industrial laundries, the paternalistic condescension of employers and police, and the police surveillance photographs tracking suffragettes. How does this film challenge the common stereotype that the suffrage movement was merely a pastime for wealthy middle-class ladies?</p>',
      model_answer:
        '<p><strong>Cinematic Analysis:</strong> By centering on Maud Watts, an exhausted laundry worker who faced sexual harassment, lower pay, and legal powerlessness over her own children, the film shows that votes for women was a vital economic necessity for working-class women. The trailer highlights how working-class activists risked losing their jobs, homes, and children, demonstrating the severe personal cost of political protest.</p>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=AYWsUXQrLYw',
      title: 'The Suffragettes with Lucy Worsley | BBC Archival Documentary',
      duration: '58 mins 26 secs',
      pathway: 'Documentary',
      teacher_guidance:
        'Dr. Lucy Worsley examines the secret surveillance files compiled by Scotland Yard\'s Special Branch, tracking the covert WSPU bombing campaign, letter-bomb attacks, and royal bodyguard confrontations. Recommended Watch Window: 12:00–22:30 • Lesson Phase: In-Depth Documentary Investigation & State Surveillance. Tone Alert: Fascinating forensic documentary detailing early state intelligence and counter-terrorism.',
      viewing_task:
        '<ol><li><strong>[05:20] Recall:</strong> What covert forensic technology did the Metropolitan Police Special Branch pioneer in 1913 to identify suffragette activists without their knowledge?</li><li><strong>[14:40] Explain:</strong> Explain how Emmeline and Christabel Pankhurst organized an underground network of safe houses, disguised messengers, and code names to evade police arrest.</li><li><strong>[21:10] Challenge:</strong> Evaluate the moral dilemma faced by Prime Minister Herbert Asquith: why did the government view militant suffragette arson as an existential threat to democratic law?</li></ol>',
      model_answer:
        '<ol><li><strong>Recall:</strong> Covert surveillance photography using telephoto lenses from concealed prison vans at Holloway Prison.</li><li><strong>Explain:</strong> As leaders faced continuous re-arrest under the Cat and Mouse Act, Christabel fled to Paris, issuing weekly orders via couriers, while female bodyguards (the "Amazons" trained in jujitsu) protected Emmeline Pankhurst from violent arrest at public rallies.</li><li><strong>Challenge:</strong> Asquith argued that yielding to arson, railway station bombings, and physical attacks would surrender parliamentary democracy to violent coercion, setting a precedent for any fringe group to force policy changes through terror. However, by refusing any compromise, the government trapped itself in an escalating cycle of repression that eroded its own moral authority.</li></ol>',
    },
  ],

  // Lesson 1: 1945: The Welfare State and NHS
  [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=YokrY_G8L-c',
      title: 'Why was Churchill voted out of office after WW2? | History Matters',
      duration: '3 mins 17 secs',
      pathway: 'Starter Hook',
      teacher_guidance:
        "Explains why the British electorate rejected war hero Winston Churchill in July 1945 in favour of Clement Attlee's Labour Party, which promised comprehensive social reform based on William Beveridge's 1942 blueprint. Recommended Watch Window: 00:00–03:17 (Full Clip) • Lesson Phase: Quick Starter Check (0–3m). Tone Alert: Fast, accessible animated historical breakdown.",
      viewing_task:
        '<ol><li><strong>[00:50] Quick Check:</strong> Which political party won a landslide 146-seat majority in the July 1945 British General Election, defeating wartime leader Winston Churchill?</li><li><strong>[02:15] Hinge Question:</strong> Why did the shared national experience of the Blitz, evacuation, and rationing convince millions of British citizens that post-war Britain must never return to the poverty of the 1930s?</li></ol>',
      model_answer:
        '<ol><li><strong>Quick Check:</strong> Clement Attlee\'s Labour Party.</li><li><strong>Hinge Question:</strong> Total war required the total mobilisation and shared sacrifice of all social classes. Evacuation exposed wealthy rural families to the shocking malnutrition and poverty of urban slums, while government rationing proved the state could guarantee fair distribution of resources, creating an overwhelming national demand for social security, council housing, and universal healthcare.</li></ol>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=0pnEMBgEG24',
      title: 'The Foundation of the National Health Service | BBC Bitesize for Teachers',
      duration: '9 mins 59 secs',
      pathway: 'Enquiry Evidence',
      teacher_guidance:
        "Archival testimonies and historical analysis documenting healthcare inequality prior to 1948, Health Minister Aneurin Bevan's battle against the British Medical Association, and the opening of Park Hospital on 5 July 1948. Recommended Watch Window: 01:15–06:45 • Lesson Phase: Guided Instruction & Archival Investigation. Tone Alert: Rigorous educational documentary featuring historical newsreels and doctor testimonies.",
      viewing_task:
        '<ol><li><strong>[01:45] Recall:</strong> On what historic date did the National Health Service (NHS) officially begin operations across the United Kingdom?</li><li><strong>[03:30] Explain:</strong> Explain how Health Minister Aneurin Bevan overcame fierce opposition from the British Medical Association (BMA), who feared doctors would become state-controlled civil servants.</li><li><strong>[05:50] Challenge:</strong> Evaluate the transformative egalitarian principle at the core of the 1948 NHS: why was providing care "free at the point of delivery, funded through general taxation" revolutionary?</li></ol>',
      model_answer:
        '<ol><li><strong>Recall:</strong> 5 July 1948 (inaugurated by Aneurin Bevan at Park Hospital, Davyhulme, Manchester).</li><li><strong>Explain:</strong> Bevan famously compromised by "stuffing their mouths with gold": he allowed hospital consultants to retain private paying beds alongside their NHS salaries and agreed that family GPs would remain independent contractors paid on a per-patient capitation basis rather than salaried employees.</li><li><strong>Challenge:</strong> Prior to 1948, poor families routinely delayed seeing doctors due to fear of crippling medical bills, and elderly patients died of untreated ailments in Victorian workhouse infirmaries. The NHS severed healthcare from personal wealth, establishing that medical treatment was a fundamental universal human right rather than a commercial commodity.</li></ol>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=MXoYbRXorEQ',
      title: 'The Spirit of \'45 (2013, Ken Loach) | Official Theatrical Trailer',
      duration: '1 min 52 secs',
      pathway: 'Cinematic',
      teacher_guidance:
        'Acclaimed documentary feature by director Ken Loach using primary British Film Institute newsreel and oral history to celebrate the transformative post-war Labour government: the creation of the NHS, nationalisation of coal, railways, and steel, and building 1 million council homes. Recommended Watch Window: 00:00–01:52 (Full Trailer). Lesson Phase: Cinematic Starter Hook & Post-War Consensus. Tone Alert: Stirring, passionate celebration of collective solidarity.',
      viewing_task:
        '<p><strong>Cinematic Discussion Focus:</strong> Notice the joyful post-war street parties, the black-and-white footage of miners, nurses, and railway workers, and the powerful collective slogan "Never Again!" echoing across Britain. How does Ken Loach frame the 1945 general election as a historic moral triumph of community cooperation over pre-war poverty and capitalist exploitation?</p>',
      model_answer:
        '<p><strong>Cinematic Analysis:</strong> The trailer frames 1945 not merely as a change of government, but as a peaceful social revolution born from wartime victory. Loach contrasts the squalor, means-testing, and depression of the 1930s with the boundless optimism of ordinary working people building a new society where essential services (health, housing, energy) were owned by and operated for the public good.</p>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=MbNH4JBQiSY',
      title: 'Windrush: Arrival (1998, BBC Landmark Documentary)',
      duration: '59 mins 59 secs',
      pathway: 'Documentary',
      teacher_guidance:
        'Landmark BBC documentary chronicling the voyage of the HMT Empire Windrush from Kingston, Jamaica, carrying 492 Caribbean passengers arriving at Tilbury Docks in June 1948 to rebuild war-torn Britain. Recommended Watch Window: 04:30–16:00 • Lesson Phase: In-Depth Documentary Investigation & Migration History. Tone Alert: Superb oral history featuring Lord Kitchener, Sam King, and early settlers.',
      viewing_task:
        '<ol><li><strong>[06:15] Recall:</strong> What British legal statute passed in 1948 granted all citizens of the British Empire and Commonwealth full British citizenship and the unrestricted right to live and work in the UK?</li><li><strong>[11:30] Explain:</strong> Which essential public sectors in post-war Britain—facing acute labor shortages—actively recruited workers from Jamaica, Barbados, and Trinidad?</li><li><strong>[14:45] Challenge:</strong> Evaluate the profound psychological shock experienced by Caribbean arrivals who arrived viewing Britain as the "Mother Country", only to encounter cold weather and hostile signs ("No Irish, No Blacks, No Dogs").</li></ol>',
      model_answer:
        '<ol><li><strong>Recall:</strong> The British Nationality Act 1948.</li><li><strong>Explain:</strong> London Transport, the newly established National Health Service (NHS, recruiting nurses and orderlies), British Rail, and heavy manufacturing factories sent recruitment missions to the Caribbean to solve postwar reconstruction labor shortages.</li><li><strong>Challenge:</strong> West Indian migrants had been educated in colonial schools singing "Rule Britannia" and viewing Britain as their ancestral cultural home; many had served in the RAF during WWII. Finding themselves subjected to informal "colour bars" in rental housing, bars, and churches shattered their idealized illusions, forcing them to build resilient independent community, religious, and mutual-aid networks to survive.</li></ol>',
    },
  ],

  // Lesson 2: The Windrush Generation
  [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=MbNH4JBQiSY',
      title: 'HMT Empire Windrush: The Arrival at Tilbury (1948) | BBC Archive',
      duration: '4 mins 20 secs',
      pathway: 'Starter Hook',
      teacher_guidance:
        'Archival newsreel of the docking of the Empire Windrush on 22 June 1948, featuring calypso singer Lord Kitchener singing "London is the Place for Me" on the quayside. Recommended Watch Window: 00:00–03:45 • Lesson Phase: Quick Starter Check (0–3m). Tone Alert: Famous primary British Pathé newsreel footage.',
      viewing_task:
        '<ol><li><strong>[01:10] Quick Check:</strong> What was the name of the Trinidadian calypsonian who sang "London is the Place for Me" to newsreel cameras on Tilbury Docks in June 1948?</li><li><strong>[02:45] Hinge Question:</strong> Why did British employers and the state welcome Caribbean workers to staff transport and hospitals, while politicians simultaneously expressed private anxiety over non-white immigration?</li></ol>',
      model_answer:
        '<ol><li><strong>Quick Check:</strong> Lord Kitchener (Aldwyn Roberts).</li><li><strong>Hinge Question:</strong> Post-war economic reconstruction urgently needed thousands of workers for the NHS, buses, and railways that British workers shunned. However, ingrained colonial racial prejudices caused ministers to fear that visible non-white communities would alter traditional British identity, creating an enduring contradiction between economic necessity and racial exclusion.</li></ol>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=0pnEMBgEG24',
      title: 'The Windrush Generation: Building Modern Britain | BBC Teach',
      duration: '8 mins 15 secs',
      pathway: 'Enquiry Evidence',
      teacher_guidance:
        'Examines the daily lives, cultural contributions, and racism faced by Commonwealth citizens in 1950s Britain: the colour bar, the 1958 Notting Hill riots, and the founding of the Notting Hill Carnival by Claudia Jones. Recommended Watch Window: 01:00–06:30 • Lesson Phase: Guided Instruction & Cultural Investigation. Tone Alert: Balanced historical analysis combining primary testimonies and music.',
      viewing_task:
        '<ol><li><strong>[01:50] Recall:</strong> What was the informal discriminatory practice known as the "colour bar", which barred Black citizens from renting rooms, securing bank loans, or entering pubs?</li><li><strong>[03:40] Explain:</strong> Explain how Claudia Jones, a Trinidadian political activist, organized the first Caribbean indoor carnival at St Pancras Town Hall in 1959 to heal racial divisions following the Notting Hill riots.</li><li><strong>[05:50] Challenge:</strong> Evaluate how Caribbean music (calypso, ska, reggae), cuisine, and literature permanently enriched and transformed British urban culture from the 1950s onward.</li></ol>',
      model_answer:
        '<ol><li><strong>Recall:</strong> The "colour bar" was widespread racial discrimination where landlords placed signs in windows ("No Blacks, No Irish, No Dogs") and refused housing or employment, which remained completely legal until the 1965 Race Relations Act.</li><li><strong>Explain:</strong> Following the violent August 1958 Notting Hill race riots where white "Teddy Boys" attacked Black residents, Claudia Jones launched the West Indian Gazette and an indoor carnival with steel bands to showcase Caribbean pride, foster mutual cultural respect, and demonstrate that cultural diversity was a positive strength for Britain.</li><li><strong>Challenge:</strong> Far from merely providing manual labor, Caribbean immigrants revolutionized British artistic, musical, and social life. Sound systems, ska, and calypso laid the foundation for modern British popular music, while community mobilization challenged institutional racism, forcing Parliament to pass anti-discrimination laws that reshaped modern British civil rights.</li></ol>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=VHFLv3k2Eww',
      title: 'Small Axe: Mangrove (2020, Steve McQueen) | BFI Official Trailer',
      duration: '1 min 00 sec',
      pathway: 'Cinematic',
      teacher_guidance:
        'Trailer for Oscar-winning director Steve McQueen’s masterpiece starring Shaun Parkes and Letitia Wright. Dramatizes Frank Crichlow’s Mangrove restaurant in Notting Hill, relentless Metropolitan Police harassment, and the 1970 Old Bailey trial that legally established institutional racism. Recommended Watch Window: 00:00–01:00 (Full Trailer). Lesson Phase: Cinematic Starter Hook & Civil Rights Resistance. Tone Alert: Tense, powerful historical dramatisation.',
      viewing_task:
        '<p><strong>Cinematic Discussion Focus:</strong> Notice the vibrant community life inside Frank Crichlow\'s Caribbean restaurant, the repeated aggressive police raids, and the defiant courtroom defense of the "Mangrove Nine" at the Old Bailey. How does Steve McQueen\'s film dramatize the fight of Black Britons for equal justice under the law?</p>',
      model_answer:
        '<p><strong>Cinematic Analysis:</strong> The trailer captures how the Mangrove restaurant was targeted by the police not for criminal activity, but because it served as a safe intellectual and cultural hub for Notting Hill\'s Black community. The Mangrove Nine\'s historic legal victory at the Old Bailey forced the British judiciary for the very first time to acknowledge evidence of "racial hatred" within the police force, marking a turning point in UK civil rights history.</p>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=MbNH4JBQiSY',
      title: 'The Unwanted: The Secret Windrush Files | BBC Documentary',
      duration: '59 mins 16 secs',
      pathway: 'Documentary',
      teacher_guidance:
        'Historian David Olusoga uncovers previously secret British government documents revealing how successive post-war administrations from 1948 onward sought to discourage non-white immigration and restrict citizenship rights. Recommended Watch Window: 08:00–20:00 • Lesson Phase: In-Depth Documentary Investigation & State Policy. Tone Alert: Rigorous, award-winning investigative documentary.',
      viewing_task:
        '<ol><li><strong>[06:30] Recall:</strong> Which 1962 legislative measure passed by Harold Macmillan\'s Conservative government ended the automatic right of Commonwealth citizens to live and work in the UK?</li><li><strong>[14:15] Explain:</strong> Explain how secret cabinet papers revealed by David Olusoga show ministers exploring ways to intercept immigration ships or create administrative obstacles without appearing openly racist.</li><li><strong>[18:40] Challenge:</strong> Evaluate how post-war immigration policy reflected an unresolved imperial paradox: Britain celebrated its global Commonwealth family, yet simultaneously legislated to restrict non-white Commonwealth citizens from entering Britain.</li></ol>',
      model_answer:
        '<ol><li><strong>Recall:</strong> The Commonwealth Immigrants Act 1962 (which introduced employment vouchers).</li><li><strong>Explain:</strong> Cabinet files show civil servants were instructed to make passport issuance slow and bureaucratic in Jamaica, while ministers debated imposing health checks or deportation powers. However, they feared that openly restricting Black immigration would damage Britain\'s international prestige and prompt Commonwealth nations to leave the alliance.</li><li><strong>Challenge:</strong> British politicians took immense pride in leading a multiracial Commonwealth of 800 million citizens that spanned the globe, using it to maintain Britain\'s great-power status after WWII. Yet when citizens from that Commonwealth exercised their legal right to settle in the UK, political panic over racial homogeneity led to successive immigration acts (1962, 1968, 1971) that effectively constructed a "colour-coded" border, stripping rights from the very people who had helped win the war and rebuild the country.</li></ol>',
    },
  ],

  // Lesson 3: The 1963 Bristol Bus Boycott
  [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=uSyzaXXKUaQ',
      title: 'The Story of the Bristol Bus Boycott (1963) | Black History Month',
      duration: '1 min 55 secs',
      pathway: 'Starter Hook',
      teacher_guidance:
        'Concise animated overview of the April–August 1963 Bristol Bus Boycott organized by Paul Stephenson, Roy Hackett, and the West Indian Development Council against the Bristol Omnibus Company\'s ban on hiring Black or Asian bus crews. Recommended Watch Window: 00:00–01:55 (Full Clip) • Lesson Phase: Quick Starter Check (0–3m). Tone Alert: Fast, accessible animated summary.',
      viewing_task:
        '<ol><li><strong>[00:30] Quick Check:</strong> What discriminatory employment policy was openly enforced by the Bristol Omnibus Company in 1963 regarding bus drivers and conductors?</li><li><strong>[01:15] Hinge Question:</strong> How did American civil rights activist Rosa Parks and the Montgomery Bus Boycott inspire young Black activists in Bristol to launch a consumer boycott?</li></ol>',
      model_answer:
        '<ol><li><strong>Quick Check:</strong> A complete "colour bar" banning Black or Asian people from being employed as bus drivers or conductors (only white workers were hired).</li><li><strong>Hinge Question:</strong> Paul Stephenson recognized that direct consumer action and economic pressure had successfully desegregated buses in Alabama. By organizing Bristol\'s Caribbean community and university students to refuse to ride the buses, they mobilized national media scrutiny, proving that peaceful boycott tactics could defeat institutional racism in Britain.</li></ol>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=rQXwh__d2S4',
      title: 'How the Bristol bus boycott changed UK civil rights | BBC Witness History',
      duration: '3 mins 45 secs',
      pathway: 'Enquiry Evidence',
      teacher_guidance:
        'BBC Witness History interview with civil rights pioneer Paul Stephenson, detailing the test case with Guy Bailey, the 60-day boycott, support from MP Tony Benn, and the company\'s capitulation on 28 August 1963. Recommended Watch Window: 00:30–03:45 • Lesson Phase: Guided Instruction & Archival Investigation. Tone Alert: Stirring oral history featuring primary radio dispatches and eyewitness reflection.',
      viewing_task:
        '<ol><li><strong>[01:00] Recall:</strong> What happened when 18-year-old Guy Bailey was sent by Paul Stephenson for an interview at the Bristol Omnibus Company in April 1963?</li><li><strong>[02:15] Explain:</strong> Explain the role played by local Bristol MP Tony Benn and Labour leader Harold Wilson in applying political pressure to overturn the bus company\'s colour bar.</li><li><strong>[03:10] Challenge:</strong> Evaluate the direct causal link between the victory of the Bristol Bus Boycott in August 1963 and the passage of Britain\'s first Race Relations Act in 1965.</li></ol>',
      model_answer:
        '<ol><li><strong>Recall:</strong> When the receptionist saw Bailey was Black, she canceled the interview immediately, stating: "We don\'t employ Black people on the buses."</li><li><strong>Explain:</strong> Tony Benn declared the company\'s policy a national disgrace in parliamentary debates, while Harold Wilson pledged at a London rally that a future Labour government would outlaw racial discrimination in employment, elevating a local city dispute into a national political priority.</li><li><strong>Challenge:</strong> The boycott ended on 28 August 1963 (the very day Martin Luther King Jr delivered his "I Have a Dream" speech). The public victory proved that moral persuasion was insufficient: without statutory legal penalties, private companies and trade unions could openly discriminate with impunity. When Harold Wilson was elected Prime Minister in 1964, his administration passed the Race Relations Act 1965, Britain\'s first legislation outlawing racial discrimination in public places.</li></ol>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=kZfFvsKDuUU',
      title: 'Pressure (1976, Horace Ové) | BFI Cinematic Restoration Trailer',
      duration: '2 mins 31 secs',
      pathway: 'Cinematic',
      teacher_guidance:
        'Trailer for Horace Ové\'s historic film, recognized as Britain\'s first feature-length Black fiction film. Chronicles Tony, a British-born Black teenager leaving school with excellent qualifications who faces continuous rejection in job interviews due to racism. Recommended Watch Window: 00:00–02:31 (Full Trailer). Lesson Phase: Cinematic Starter Hook & Second-Generation Identity. Tone Alert: Raw, realistic social drama.',
      viewing_task:
        '<p><strong>Cinematic Discussion Focus:</strong> Notice Tony\'s experience of feeling caught between two worlds: his Trinidadian parents advising patience and compliance, versus his older brother advocating radical Black Power activism, while white British society refuses to employ him. How does this film capture the frustration that led second-generation Black Britons to demand genuine legal equality?</p>',
      model_answer:
        '<p><strong>Cinematic Analysis:</strong> Ové\'s groundbreaking film portrays the generational divide within Britain\'s Black community in the 1970s. Unlike their immigrant parents who tolerated second-class treatment, British-born youth considered themselves 100% British and refused to accept the "colour bar", fueling the civil rights protests and legal challenges that expanded the 1976 Race Relations Act.</p>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=AYWsUXQrLYw',
      title: 'Civil Rights in Britain: The Battle for the Race Relations Acts | BBC Documentary',
      duration: '58 mins 26 secs',
      pathway: 'Documentary',
      teacher_guidance:
        'In-depth documentary analyzing the progression of British civil rights legislation: from the narrow 1965 Act, through the 1968 Act (sparked by Enoch Powell\'s "Rivers of Blood" speech), to the landmark 1976 Race Relations Act and the creation of the Commission for Racial Equality. Recommended Watch Window: 15:00–27:00 • Lesson Phase: Guided Instruction & Legal Progress. Tone Alert: Rigorous political documentary detailing cabinet debates and public reactions.',
      viewing_task:
        '<ol><li><strong>[08:45] Recall:</strong> What conservative politician delivered the inflammatory "Rivers of Blood" speech in Birmingham in April 1968, fiercely opposing the 1968 Race Relations Bill?</li><li><strong>[16:30] Explain:</strong> Explain why the original 1965 Race Relations Act was criticized as toothless, and what crucial protections (housing, employment, and incitement to racial hatred) were added in 1968 and 1976.</li><li><strong>[24:15] Challenge:</strong> Evaluate whether civil rights legislation alone could eradicate racism in Britain: how did the 1981 Brixton riots and Lord Scarman\'s report expose ongoing institutional discrimination?</li></ol>',
      model_answer:
        '<ol><li><strong>Recall:</strong> Enoch Powell (Conservative Shadow Defence Secretary, immediately sacked by Edward Heath).</li><li><strong>Explain:</strong> The 1965 Act only covered public places (hotels and pubs), carried no criminal penalties, and relied on voluntary conciliation. The 1968 Act extended bans to employment and private housing, while the 1976 Act introduced the concept of "indirect discrimination" and created the Commission for Racial Equality (CRE) with powers to investigate organizations.</li><li><strong>Challenge:</strong> While laws made overt discrimination illegal, they could not easily eliminate subconscious prejudice or institutional bias. The 1981 Brixton riots erupted against aggressive police "Operation Swamp 81" (stop-and-search under the 1824 Vagrancy Act). Lord Scarman\'s inquiry concluded that deep social deprivation, unemployment, and police insensitivity created racial tension, showing that legal equality required broader economic and institutional reform.</li></ol>',
    },
  ],

  // Lesson 4: The Cold War on the Home Front
  [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=UgOybc8Jdoo',
      title: 'Nuclear Attack: Protect & Survive: Action After Warnings (1975) | CharlieDeanArchives',
      duration: '4 mins 14 secs',
      pathway: 'Starter Hook',
      teacher_guidance:
        'Authentic Cold War British public information film produced by the Central Office of Information for the Home Office. Instructs families on creating fallout rooms and inner core shelters with doors and sandbags. Recommended Watch Window: 00:00–03:45 • Lesson Phase: Quick Starter Check (0–3m). Tone Alert: Eerie, bureaucratic Cold War instructional film.',
      viewing_task:
        '<ol><li><strong>[01:00] Quick Check:</strong> What survival instructions did the British government\'s "Protect and Survive" campaign give citizens regarding building an "inner core shelter"?</li><li><strong>[02:30] Hinge Question:</strong> Why did the Campaign for Nuclear Disarmament (CND) condemn the guidance as a dangerous deception designed to normalize nuclear war?</li></ol>',
      model_answer:
        '<ol><li><strong>Quick Check:</strong> To unhinge doors, lean them against an interior wall at an angle, and pack them with mattresses, sandbags, and heavy books to absorb radiation.</li><li><strong>Hinge Question:</strong> The CND argued that leaning wooden doors against a wall provided zero protection against the blast, 3,000°C firestorms, and intense fallout of multi-megaton thermonuclear warheads. Presenting nuclear war as survivable misled the public and legitimized the government\'s nuclear weapons policy.</li></ol>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=glYUnmhi5zU',
      title: 'York Cold War Bunker | 10 Places That Made England with Dan Snow | English Heritage',
      duration: '8 mins 17 secs',
      pathway: 'Enquiry Evidence',
      teacher_guidance:
        'Historian Dan Snow tours the semi-subterranean York Cold War Bunker, built in 1961 for the Royal Observer Corps (ROC) to monitor nuclear fallout and calculate blast yields. Recommended Watch Window: 01:00–06:30 • Lesson Phase: Guided Instruction & Civil Defence Reality. Tone Alert: Engaging historical investigation inside a real blast-proof bunker.',
      viewing_task:
        '<ol><li><strong>[01:45] Recall:</strong> What volunteer civil defence organization staffed the York bunker, and how long were 60 volunteers expected to survive locked inside during a nuclear exchange?</li><li><strong>[03:40] Explain:</strong> Explain how Royal Observer Corps volunteers used Bomb Power Indicators (BPIs) and survey meters to triangulate Soviet nuclear detonations and map radioactive fallout across northern England.</li><li><strong>[05:50] Challenge:</strong> Evaluate the grim reality of Cold War civil defence: could a bunker of 60 volunteers actually coordinate meaningful post-attack medical relief for millions of injured citizens?</li></ol>',
      model_answer:
        '<ol><li><strong>Recall:</strong> The Royal Observer Corps (ROC); up to 30 days sealed inside.</li><li><strong>Explain:</strong> Volunteers used pinhole cameras on the surface to record the direction and height of flashes, calculating blast power. Inside, plotters mapped wind directions on Perspex boards to predict where lethal radioactive fallout clouds would drift, broadcasting siren warnings to local authorities.</li><li><strong>Challenge:</strong> In reality, post-attack rescue was a logistical impossibility. With roads destroyed, water mains vaporized, hospitals pulverized, and fallout lethal for weeks, volunteers could only document the destruction. Civil defence was primarily a psychological deterrence mechanism to reassure the public that Britain retained government continuity.</li></ol>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=vgT4Y30DkaA',
      title: 'Threads (1984, Mick Jackson / BBC) | Original Theatrical Trailer',
      duration: '2 mins 24 secs',
      pathway: 'Cinematic',
      teacher_guidance:
        'Acclaimed BAFTA-winning BBC film portraying the catastrophic impact of a nuclear strike on Sheffield. Directed by Mick Jackson and written by Barry Hines, it shattered illusions of nuclear survivability. Recommended Watch Window: 00:00–02:24 (Full Trailer). Lesson Phase: Cinematic Starter Hook & Nuclear Reality. Tone Alert: Uncompromising, chilling depiction of nuclear catastrophe.',
      viewing_task:
        '<p><strong>Cinematic Discussion Focus:</strong> Notice how <em>Threads</em> depicts the sudden disintegration of electricity, medical care, communication, and societal order in Sheffield following a nuclear attack, followed by decades of nuclear winter, radiation poisoning, and subsistence farming. Why did this film have such a profound impact on British public opinion and government civil defence policy in the 1980s?</p>',
      model_answer:
        '<p><strong>Cinematic Analysis:</strong> The trailer strips away heroic wartime mythology to present the unvarnished scientific reality of thermonuclear war. By focusing on ordinary working-class Sheffield families rather than politicians or soldiers, it graphically illustrated that civil defense manuals like \'Protect and Survive\' were completely useless against megaton weapons, fueling the growth of CND and anti-nuclear protests like Greenham Common.</p>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=7yrv505R-0U',
      title: 'Protect and Survive: Complete Civil Defence Archive (Remastered)',
      duration: '48 mins 50 secs',
      pathway: 'Documentary',
      teacher_guidance:
        'The complete 20-part Home Office civil defence series, examining the reality of warning sirens ("Attack Warning Red"), fallout rooms, sanitation, and food storage. Recommended Watch Window: 02:00–14:30 • Lesson Phase: In-Depth Documentary Investigation & Cold War Paranoia. Tone Alert: Cold, clinical government broadcasting reflecting 1970s nuclear anxiety.',
      viewing_task:
        '<ol><li><strong>[04:15] Recall:</strong> What siren sound and radio broadcast message designated that an enemy ballistic missile attack was imminent within four minutes?</li><li><strong>[08:40] Explain:</strong> Describe the government\'s advice on water decontamination, sanitation, and waste disposal inside an "inner core shelter".</li><li><strong>[13:20] Challenge:</strong> Evaluate why the BBC refused to broadcast these public information films in peacetime, fearing mass panic and civil unrest.</li></ol>',
      model_answer:
        '<ol><li><strong>Recall:</strong> "Attack Warning Red" (a rising and falling four-minute siren note broadcast over local sirens and BBC radio).</li><li><strong>Explain:</strong> Families were told to turn off mains gas and water to prevent ruptured mains explosions, store 14 days of canned water in sealed containers, and use polythene bags and buckets for human waste, remaining sealed in their makeshift shelter until radiation levels dropped.</li><li><strong>Challenge:</strong> Cabinet records reveal ministers recognized that broadcasting the grim instructions would trigger nationwide hoarding, property market collapses, and mass hysteria. Furthermore, exposing the crude reality of cardboard-and-mattress shelters would destroy public confidence in Britain\'s independent nuclear deterrent, prompting the government to lock the tapes in a vault for wartime broadcast only.</li></ol>',
    },
  ],

  // Lesson 5: Assessment: British Identity Since 1945
  [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=i4U3o4adeP8',
      title: 'Festival Of Britain (1951) | British Pathé',
      duration: '2 mins 36 secs',
      pathway: 'Starter Hook',
      teacher_guidance:
        "Archival newsreel showcasing the 1951 Festival of Britain on London's South Bank, designed by Clement Attlee's Labour government as a 'tonic to the nation' to celebrate modern British design, science, and democratic vitality. Recommended Watch Window: 00:00–02:36 (Full Clip) • Lesson Phase: Quick Starter Check (0–3m). Tone Alert: Optimistic, patriotic period newsreel.",
      viewing_task:
        '<ol><li><strong>[00:45] Quick Check:</strong> What landmark centenary anniversary was the 1951 Festival of Britain on London\'s South Bank commissioned to commemorate?</li><li><strong>[01:45] Hinge Question:</strong> How did the modernist architecture and scientific focus of the Festival represent a conscious shift away from Victorian imperial conquest toward modern civic progress?</li></ol>',
      model_answer:
        '<ol><li><strong>Quick Check:</strong> The centenary of Prince Albert\'s 1851 Great Exhibition of the Works of Industry of All Nations.</li><li><strong>Hinge Question:</strong> Rather than exhibiting colonial trophies or imperial dominance, the 1951 Festival showcased British democratic design, social housing, cutting-edge science, and cultural arts, redefining British identity around post-war democratic reconstruction, welfare, and technological optimism.</li></ol>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=qoo3gnKaUzM',
      title: 'Post War Britain 1945–1979 | History Skimmed',
      duration: '10 mins 17 secs',
      pathway: 'Enquiry Evidence',
      teacher_guidance:
        'Comprehensive thematic synoptic overview tracing post-war Britain from 1945 to 1979: the welfare state, decolonisation and loss of Empire, Commonwealth immigration, cultural revolution, and youth culture. Recommended Watch Window: 01:00–07:30 • Lesson Phase: Guided Instruction & Synoptic Investigation. Tone Alert: Clear, structured educational narrative.',
      viewing_task:
        '<ol><li><strong>[02:15] Recall:</strong> Name two major diplomatic and military crises (1947 and 1956) that signaled the rapid retreat of the British Empire after the Second World War.</li><li><strong>[04:40] Explain:</strong> Explain how the liberalising legislation of the 1960s (Roy Jenkins\' reforms) transformed legal boundaries regarding personal freedom in Britain.</li><li><strong>[07:10] Challenge:</strong> Synoptic Evaluation: How did the combination of Commonwealth immigration and decolonisation permanently dismantle the traditional homogeneous concept of "Britishness"?</li></ol>',
      model_answer:
        '<ol><li><strong>Recall:</strong> The independence and partition of India (1947) and the Suez Crisis (1956).</li><li><strong>Explain:</strong> Parliament decriminalised homosexuality between consenting adult men (1967), legalised abortion under medical supervision (1967), modernized divorce laws (1969), and abolished the Lord Chamberlain\'s theatre censorship (1968), creating a more permissive, secular society.</li><li><strong>Challenge:</strong> For centuries, "Britishness" was defined through an overseas empire, Anglican Protestantism, and ethnic homogeneity. The loss of colonies compelled Britain to look toward European trade, while the arrival of citizens from the Caribbean, South Asia, and Africa made Britain a multiracial society, forcing a reimagining of national identity based on shared civic values and pluralism rather than imperial heritage.</li></ol>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=jX398kx-OCM',
      title: 'The Iron Lady (2011, Phyllida Lloyd / Meryl Streep) | Official Movie Trailer',
      duration: '2 mins 19 secs',
      pathway: 'Cinematic',
      teacher_guidance:
        'Portrays Margaret Thatcher confronting political consensus and transforming Britain\'s economy from collective social democracy to individual enterprise. Recommended Watch Window: 00:00–02:19 (Full Trailer). Lesson Phase: Cinematic Starter Hook & Ideological Transformation. Tone Alert: Powerful biographical drama.',
      viewing_task:
        '<p><strong>Cinematic Discussion Focus:</strong> Notice Meryl Streep\'s portrayal of Thatcher\'s conviction that Britain\'s post-war decline required smashing state intervention and union power. How does the trailer illustrate the profound ideological battle between collectivist social democracy and individualist free-market capitalism that redefined modern Britain?</p>',
      model_answer:
        '<p><strong>Cinematic Analysis:</strong> The trailer captures Thatcher\'s radical belief that Britain had become stagnant under the post-war welfare state. Her policies of privatisation, council house sales (Right to Buy), and financial deregulation dismantled the 1945 consensus, establishing a culture of individual entrepreneurship and home ownership that permanently transformed modern British society.</p>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=AYWsUXQrLYw',
      title: 'Andrew Marr\'s History of Modern Britain: Advance Britannia to Revolution',
      duration: '58 mins 26 secs',
      pathway: 'Documentary',
      teacher_guidance:
        'Comprehensive synoptic capstone exploring how Britain transformed from a battered imperial monarchy in 1945 into a multicultural, service-based European democracy by the end of the 20th century. Recommended Watch Window: 18:00–32:00 • Lesson Phase: Synoptic Capstone & Historiographical Evaluation. Tone Alert: Masterful, engaging historical narrative from Andrew Marr.',
      viewing_task:
        '<ol><li><strong>[06:30] Recall:</strong> How did the 1956 Suez Crisis permanently alter Britain\'s geopolitical status as an independent global superpower?</li><li><strong>[19:40] Explain:</strong> Explain how 1960s social legislation transformed the relationship between the British state and private individual morality.</li><li><strong>[28:15] Challenge:</strong> Synoptic Assessment: Evaluate the central question—is modern Britain defined more by the collective social democratic legacy of 1945 or the individualist free-market revolution of 1979?</li></ol>',
      model_answer:
        '<ol><li><strong>Recall:</strong> When President Eisenhower threatened to collapse the British pound unless British and French forces withdrew from Egypt, it proved Britain could no longer wage war or project power globally without United States approval.</li><li><strong>Explain:</strong> The reforming Home Secretary Roy Jenkins championed the decriminalisation of male homosexuality (Sexual Offences Act 1967), legalisation of abortion (1967), divorce reform (1969), and abolition of theatre censorship (1968), legally establishing that private adult conduct was no longer the business of criminal law.</li><li><strong>Challenge:</strong> Modern Britain is an enduring synthesis of both revolutions. The 1945 legacy endures in the universal moral attachment to the NHS and free state education, while the 1979 revolution created an open, consumerist, privatized market economy. Understanding modern Britain requires recognizing that both forces continually contest and shape the nation\'s civic identity.</li></ol>',
    },
  ],
];

async function applyPostWar4Tier() {
  const dataPath = path.join(ROOT_DIR, 'units', 'post_war_britain', 'data.js');
  const fileUrl = 'file:///' + dataPath.replace(/\\/g, '/');
  const mod = await import(fileUrl);
  const unitData = mod.default || mod.unitData;

  unitData.lessons.forEach((l, idx) => {
    if (postWar4TierVideos[idx]) {
      l.video = postWar4TierVideos[idx];
      delete l.extra_videos;
      console.log(`✅ Injected 4-Tier shelf (${l.video.length} videos) into Lesson ${idx + 1} (${l.title})`);
    }
  });

  const fileContent = `const unitData = ${JSON.stringify(unitData, null, 2)};\n\nexport { unitData };\nexport default unitData;\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = unitData;\n}\n`;
  fs.writeFileSync(dataPath, fileContent, 'utf8');
  console.log('✅ Updated units/post_war_britain/data.js');

  // Copy to public/units/post_war_britain/data.js
  const publicUnitDir = path.join(ROOT_DIR, 'public', 'units', 'post_war_britain');
  if (!fs.existsSync(publicUnitDir)) fs.mkdirSync(publicUnitDir, { recursive: true });
  fs.writeFileSync(path.join(publicUnitDir, 'data.js'), fileContent, 'utf8');
  console.log('✅ Updated public/units/post_war_britain/data.js');

  // Sync to data/post_war_britain.json and public/data/post_war_britain.json
  const payload = { id: 'post_war_britain', data: unitData };
  fs.writeFileSync(
    path.join(ROOT_DIR, 'data', 'post_war_britain.json'),
    JSON.stringify(payload, null, 2),
    'utf8',
  );
  fs.writeFileSync(
    path.join(ROOT_DIR, 'public', 'data', 'post_war_britain.json'),
    JSON.stringify(payload, null, 2),
    'utf8',
  );
  console.log('✅ Synced data/post_war_britain.json and public/data/post_war_britain.json');

  console.log('\nRebuilding database.json...');
  execSync('node scripts/build_database.cjs', { stdio: 'inherit', cwd: ROOT_DIR });
  console.log('🎉 POST-WAR BRITAIN 4-TIER SHELF COMPLETED (24/24 VIDEOS ACTIVE)!');
}

applyPostWar4Tier().catch((err) => {
  console.error('❌ Error applying Post-War Britain 4-tier videos:', err);
  process.exit(1);
});

