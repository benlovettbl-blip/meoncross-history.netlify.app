/**
 * scripts/enrich_post_war_britain_narrative.cjs
 *
 * Populates units/post_war_britain/data.js with high-calibre, Send-accessible,
 * Christine Counsell disciplinary historical narrative blocks across all lessons.
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT_DIR = path.resolve(__dirname, '..');
const dataPath = path.join(ROOT_DIR, 'units', 'post_war_britain', 'data.js');
const publicJsonPath = path.join(ROOT_DIR, 'public', 'data', 'post_war_britain.json');
const dataJsonPath = path.join(ROOT_DIR, 'data', 'post_war_britain.json');

// Safely load existing unitData
let raw = fs.readFileSync(dataPath, 'utf8');
raw =
  raw
    .replace(/export\s+const\s+unitData\s*=/g, 'const unitData =')
    .replace(/export\s+default\s+unitData;?/g, '')
    .replace(/export\s*\{[^}]*\};?/g, '') + '; unitData;';
const unitData = vm.runInNewContext(raw);

// Canonical Disciplinary Narrative Blocks
const ENRICHED_NARRATIVE = {
  // Lesson 1: Votes for Women
  lesson_1: [
    {
      act: 1,
      title: 'The Suffragists & Constitutional Campaigning (1897–1903)',
      text: '<span class="para-ref">[1.1]</span> In late Victorian Britain, women were denied the parliamentary vote, despite paying taxes and subject to the laws of the realm. In 1897, <strong>Millicent Fawcett</strong> united diverse regional societies into the <strong>National Union of Women’s Suffrage Societies (NUWSS)</strong>. The Suffragists believed fervently in peaceful, constitutional persuasion. They argued that women could only win the vote by demonstrating moral rectitude, patience, and political maturity to a sceptical male Parliament.<br><br><span class="para-ref">[1.2]</span> The NUWSS organised public lectures, collected hundreds of thousands of signatures on parliamentary petitions, and patiently lobbied Members of Parliament. By 1914, the NUWSS had grown into a formidable democratic federation of over 50,000 members. However, despite decades of peaceful campaigning, consecutive Liberal and Conservative governments repeatedly stalled, shelving private members\' suffrage bills and refusing to grant female emancipation.',
    },
    {
      act: 2,
      title: "The Militant Turn: Suffragettes & 'Deeds, Not Words' (1903–1913)",
      text: '<span class="para-ref">[1.3]</span> Frustrated by decades of parliamentary stalling, <strong>Emmeline Pankhurst</strong> and her daughters Christabel and Sylvia founded the <strong>Women’s Social and Political Union (WSPU)</strong> in Manchester in 1903. Adopting the uncompromising battle-cry <em>"Deeds, not words"</em>, the "Suffragettes" abandoned quiet lobbying for militant direct action. They chained themselves to Downing Street railings, interrupted cabinet meetings, smashed commercial shop windows along Oxford Street, cut telegraph wires, and burned post boxes and railway stations to force women’s suffrage into national headlines.<br><br><span class="para-ref">[1.4]</span> When arrested, Suffragette prisoners went on hunger strike, demanding the status of political prisoners. Herbert Asquith’s government responded with brutal force-feeding through rubber nasal tubes. Following fierce public condemnation, Parliament passed the Prisoners (Temporary Discharge for Ill-Health) Act 1913—popularly dubbed the <strong>"Cat and Mouse Act"</strong>—which released weakened hunger strikers only to re-arrest them once recovered. In June 1913, <strong>Emily Wilding Davison</strong> stepped in front of the King’s horse Anmer at the Epsom Derby, suffering fatal injuries in a dramatic act of martyrdom that stunned the British Empire.',
    },
    {
      act: 3,
      title: 'Total War Mobilisation & The Home Front (1914–1918)',
      text: '<span class="para-ref">[1.5]</span> The outbreak of the First World War in August 1914 transformed the suffrage struggle overnight. Both the NUWSS and WSPU suspended campaigning to support the national war effort. With hundreds of thousands of men fighting in the trenches of the Western Front, women stepped forward to keep the British economy alive. Over 1.5 million women entered the workforce, operating heavy machinery in munitions factories ("Canary Girls"), driving buses and trams, working the agricultural Land Army, and staffing field hospitals in France.<br><br><span class="para-ref">[1.6]</span> Women’s indispensable contribution dismantled the anti-suffrage argument that women were physically or temperamentally unfit for public responsibility. Facing postwar electoral reform for returning soldiers, Parliament could no longer justify excluding women. In February 1918, Prime Minister David Lloyd George passed the <strong>Representation of the People Act 1918</strong>, enfranchising women over thirty who met property qualifications. A decade later, the Equal Franchise Act 1928 granted women the vote on equal terms with men at age twenty-one.',
    },
  ],

  // Lesson 2: 1945 Welfare State & The NHS
  lesson_2: [
    {
      act: 1,
      title: 'Total War, Shared Sacrifice & The Beveridge Blueprint (1940–1942)',
      text: '<span class="para-ref">[2.1]</span> The shared ordeal of the Second World War permanently altered British social attitudes. Evacuation exposed wealthy rural families to the shocking poverty of inner-city children, while the Blitz and universal food rationing united the population in common sacrifice. In December 1942, civil servant <strong>William Beveridge</strong> published his landmark report on <em>Social Insurance and Allied Services</em>, selling over 630,000 copies as people queued at bookshops.<br><br><span class="para-ref">[2.2]</span> Beveridge declared war on the <strong>"Five Giants"</strong> blocking postwar reconstruction: <strong>Want</strong> (poverty), <strong>Disease</strong> (lack of medical care), <strong>Ignorance</strong> (inadequate education), <strong>Squalor</strong> (poor housing), and <strong>Idleness</strong> (unemployment). Beveridge proposed a comprehensive system of social security "from the cradle to the grave", funded through universal weekly national insurance contributions to protect every citizen against hardship.',
    },
    {
      act: 2,
      title: 'The 1945 Labour Landslide & The Modern Welfare State',
      text: '<span class="para-ref">[2.3]</span> In July 1945, British voters stunned international observers by rejecting wartime Prime Minister Winston Churchill and electing <strong>Clement Attlee\'s</strong> Labour Party in a landslide general election victory. While Churchill was revered as a war leader, voters bitterly remembered the 1930s Great Depression, mass unemployment, and humiliating means tests overseen by Conservative-led governments. Labour pledged to "win the peace" through full employment, mass council housing, and the complete enactment of the Beveridge Report.<br><br><span class="para-ref">[2.4]</span> Attlee’s administration rapidly established the foundations of the modern Welfare State. The <strong>National Insurance Act 1946</strong> provided universal sickness, maternity, invalidity, and unemployment benefits, while the National Assistance Act 1948 abolished the hated centuries-old Poor Law workhouses, establishing an unconditional state safety net for the most vulnerable citizens.',
    },
    {
      act: 3,
      title: 'Aneurin Bevan & The Creation of the NHS (1946–1948)',
      text: '<span class="para-ref">[2.5]</span> Prior to 1948, British healthcare was deeply unequal and fragmented: low-paid working men had limited GP cover, but wives, children, and elderly people had to pay private fees, join charity clubs, or rely on grim municipal infirmaries. Minister of Health <strong>Aneurin Bevan</strong>, a former Welsh coal miner, was determined to create a single national health service funded through general taxation and completely free at the point of delivery.<br><br><span class="para-ref">[2.6]</span> Bevan encountered fierce, prolonged resistance from the <strong>British Medical Association (BMA)</strong>, whose leaders feared becoming salaried civil servants. To defeat their boycott, Bevan pragmatically compromised—famously declaring he <em>"stuffed their mouths with gold"</em>—by allowing hospital consultants to treat private paying patients in NHS beds and paying family GPs on a per-patient capitation basis. On <strong>5 July 1948</strong>, Bevan officially opened the National Health Service at Park Hospital, Davyhulme, near Manchester, pioneering the principle that healthcare is a fundamental human right.',
    },
  ],

  // Lesson 3: The Windrush Generation
  lesson_3: [
    {
      act: 1,
      title: 'Post-War Reconstruction & The British Nationality Act (1948)',
      text: '<span class="para-ref">[3.1]</span> In the aftermath of the Second World War, Britain faced acute labour shortages to rebuild bombed cities, manufacture export goods, and staff vital public infrastructure, including London Transport, British Railways, and the newly created National Health Service. In 1948, Clement Attlee’s government passed the <strong>British Nationality Act 1948</strong>, which conferred full British citizenship and an unrestricted legal right of entry, residence, and employment upon all subjects throughout the British Empire and Commonwealth.<br><br><span class="para-ref">[3.2]</span> Recruitment drives in the Caribbean invited colonial citizens to help reconstruct the war-weary "Mother Country". For young Caribbean men and women, many of whom had served in the Royal Air Force or British military during the war, answering the call to rebuild Britain was seen as both a patriotic duty and an opportunity for professional advancement.',
    },
    {
      act: 2,
      title: 'Arrival of HMT Empire Windrush & The Cold Reality (1948–1958)',
      text: '<span class="para-ref">[3.3]</span> On <strong>22 June 1948</strong>, the converted German troopship <strong>HMT Empire Windrush</strong> docked at Tilbury Port in Essex, carrying 492 passengers from Jamaica, Trinidad, and other Caribbean islands. The arrivals included decorated war veterans, carpenters, nurses, mechanics, and musicians. Greeted on the dockside by newsreels and calypsonian Lord Kitchener singing <em>"London is the Place for Me"</em>, they represented the pioneers of the "Windrush Generation".<br><br><span class="para-ref">[3.4]</span> Upon arrival in London, Birmingham, and Manchester, Caribbean migrants encountered bitter British winters, bomb-damaged housing, and widespread racial discrimination. Landlords routinely posted signs in windows reading <em>"No Irish, No Blacks, No Dogs"</em>, forcing families into squalid bedsits. Excluded from commercial bank loans and mortgages, Caribbean communities established cooperative savings circles known as <strong>"Pardner"</strong> or <strong>"Susu"</strong> schemes to pool money and purchase homes collectively.',
    },
    {
      act: 3,
      title: 'Racial Tensions, Resistance & The Birth of Notting Hill Carnival (1958–1962)',
      text: '<span class="para-ref">[3.5]</span> In late August 1958, racial tensions erupted into violent riots in Notting Hill, London, and Nottingham, as gangs of white youths ("Teddy Boys") attacked Black residents, homes, and businesses. Rather than retreating, Caribbean communities organised defence committees and political associations to demand police protection and legal justice. In January 1959, Trinidadian activist <strong>Claudia Jones</strong> founded the <em>West Indian Gazette</em> and organised an indoor Caribbean Carnival at St Pancras Town Hall, a cultural celebration designed to heal racial divides that grew into the annual <strong>Notting Hill Carnival</strong>.<br><br><span class="para-ref">[3.6]</span> Despite fierce public hostility and the passage of the <strong>Commonwealth Immigrants Act 1962</strong>—which restricted Commonwealth migration for the first time—the Windrush Generation persevered. Their dedication built the NHS, modernized public transport, and irrevocably enriched British music, language, cuisine, and literature, laying the indelible foundations of modern multicultural Britain.',
    },
  ],

  // Lesson 4: The 1963 Bristol Bus Boycott
  lesson_4: [
    {
      act: 1,
      title: "The Bristol 'Colour Bar' & Guy Bailey's Rejection (1963)",
      text: '<span class="para-ref">[4.1]</span> In early 1963, racial discrimination in employment, housing, and commercial services was entirely legal in the United Kingdom. In the port city of Bristol, the state-owned <strong>Bristol Omnibus Company</strong> enforced an open, rigid <strong>"colour bar"</strong>, refusing to employ Black or Asian workers as bus drivers or conductors, despite experiencing a severe shortage of over 200 staff.<br><br><span class="para-ref">[4.2]</span> The bus company’s exclusionary policy was actively supported by the local branch of the Transport and General Workers\' Union (TGWU), whose shop stewards feared that hiring non-white workers would dilute wages and conditions. In March 1963, eighteen-year-old <strong>Guy Bailey</strong>, a qualified warehouseman and Boys\' Brigade officer, applied for an advertised conductor post. When youth worker <strong>Paul Stephenson</strong> phoned the depot to confirm Bailey was Jamaican, company managers immediately cancelled the interview.',
    },
    {
      act: 2,
      title: 'The West Indian Development Council & The Citywide Boycott',
      text: '<span class="para-ref">[4.3]</span> Outraged by the brazen discrimination, Paul Stephenson joined forces with Caribbean community leaders <strong>Roy Hackett</strong>, <strong>Audley Evans</strong>, and <strong>Owen Henry</strong> to establish the <strong>West Indian Development Council</strong>. Inspired directly by Rosa Parks, Martin Luther King Jr., and the 1955 Montgomery Bus Boycott in Alabama, they resolved to use non-violent direct action to defeat the company.<br><br><span class="para-ref">[4.4]</span> On <strong>30 April 1963</strong>, Stephenson held a press conference announcing a total passenger boycott of Bristol buses. Thousands of Caribbean residents refused to board company vehicles, walking miles to work every day. University of Bristol students joined the campaign, holding protest marches through the city centre and picketing the bus depot, generating national media coverage that exposed British racism to the world.',
    },
    {
      act: 3,
      title: 'Victory & The Landmark Race Relations Acts (1963–1968)',
      text: '<span class="para-ref">[4.5]</span> The four-month boycott attracted national political intervention. Local Bristol MP Tony Benn and Labour Party leader Harold Wilson publicly supported the boycott, while cricketer and diplomat Sir Learie Constantine condemned the colour bar. Faced with mounting financial losses and national disgrace, on <strong>28 August 1963</strong>—the very same day Martin Luther King delivered his "I Have a Dream" speech in Washington—the Bristol Omnibus Company capitulated, announcing the immediate end of the colour bar. In September, <strong>Raghbir Singh</strong> became Bristol’s first Sikh bus conductor.<br><br><span class="para-ref">[4.6]</span> The triumph of the Bristol Bus Boycott exposed the urgent need for legislation against racial prejudice. Upon taking office in 1964, Harold Wilson’s Labour government introduced the <strong>Race Relations Act 1965</strong>, which outlawed racial discrimination in public places, followed by the <strong>Race Relations Act 1968</strong>, which banned discrimination in employment and housing, establishing the foundational legal framework for British racial equality.',
    },
  ],

  // Lesson 5: Cold War on the Home Front
  lesson_5: [
    {
      act: 1,
      title: 'The Nuclear Shadow & Postwar British Deterrence (1945–1958)',
      text: '<span class="para-ref">[5.1]</span> Following the atomic devastation of Hiroshima and Nagasaki in August 1945, Britain entered the Cold War under the constant threat of nuclear annihilation. Determined that Britain should remain an independent Great Power and not rely solely on the United States, Prime Minister Clement Attlee secretly authorised the construction of Britain’s own nuclear deterrent in 1947. Britain successfully tested its first atomic bomb in 1952 (Operation Hurricane) and its first thermonuclear hydrogen bomb in 1957.<br><br><span class="para-ref">[5.2]</span> As the Soviet Union developed intercontinental ballistic missiles, the British Isles became a frontline target. Situated between Washington and Moscow and hosting American strategic bomber bases, Britain was uniquely vulnerable to catastrophic nuclear attack, creating pervasive civilian anxiety that permeated postwar domestic life and popular culture.',
    },
    {
      act: 2,
      title: 'The Peace Movement: CND & The Aldermaston Marches (1958–1965)',
      text: '<span class="para-ref">[5.3]</span> In February 1958, public horror at nuclear fallout led prominent philosophers, scientists, and journalists—including <strong>Bertrand Russell</strong>, Canon John Collins, and J.B. Priestley—to establish the <strong>Campaign for Nuclear Disarmament (CND)</strong>. Artist Gerald Holtom designed the universal CND peace symbol, combining the semaphore signals for the letters \'N\' (Nuclear) and \'D\' (Disarmament) inside a circle representing the Earth.<br><br><span class="para-ref">[5.4]</span> Over the 1958 Easter weekend, the CND organised the first <strong>Aldermaston March</strong>, leading thousands of demonstrators on a fifty-two-mile trek from Trafalgar Square to the Atomic Weapons Research Establishment in Berkshire. The annual marches drew tens of thousands of young people, trade unionists, and families, forging a mass protest culture that challenged government nuclear policy and popularized anti-war music, literature, and fashion across Britain.',
    },
    {
      act: 3,
      title: "Civil Defence, The York Bunker & 'Protect and Survive' (1961–1980)",
      text: '<span class="para-ref">[5.5]</span> To maintain national command during thermonuclear war, the government built a covert network of subterranean bunkers. In 1961, the semi-underground <strong>York Cold War Bunker</strong> was constructed as the regional headquarters for the <strong>Royal Observer Corps (ROC)</strong>. Designed with blast-proof reinforced concrete, airlocks, and air filters, sixty ROC volunteers were tasked with surviving thirty days sealed underground to triangulate bomb detonation coordinates using Bomb Power Indicators (BPIs) and plot lethal fallout plumes on wall maps.<br><br><span class="para-ref">[5.6]</span> For ordinary families, the Home Office established an air-raid siren network linked to RAF Fylingdales, designed to give the public a chilling <strong>"Four-Minute Warning"</strong> before missile impact. In May 1980, the government published the infamous <strong>"Protect and Survive"</strong> booklet, advising citizens to build domestic "inner core shelters" using unhinged doors leaned against walls and packed with sandbags. Mocked by peace activists as dangerously naive, nuclear paranoia shaped an entire generation, inspiring haunting anti-war pop anthems, Raymond Briggs’ graphic novel <em>When the Wind Blows</em> (1982), and the chilling BBC drama <em>Threads</em> (1984).',
    },
  ],
};

// Update lesson narrative blocks
unitData.lessons.forEach((lesson, index) => {
  const lessonKey = `lesson_${index + 1}`;
  if (ENRICHED_NARRATIVE[lessonKey]) {
    lesson.narrative_blocks = ENRICHED_NARRATIVE[lessonKey];
    console.log(
      `✅ Injected ${ENRICHED_NARRATIVE[lessonKey].length} rich narrative acts into ${lesson.title}`,
    );
  }
});

// Write updated data.js
const updatedCode = `const unitData = ${JSON.stringify(unitData, null, 2)};\nexport default unitData;\nexport { unitData };\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = unitData;\n}\n`;
fs.writeFileSync(dataPath, updatedCode, 'utf8');
console.log(`✅ Saved enriched units/post_war_britain/data.js`);

// Sync to json files
if (fs.existsSync(publicJsonPath)) {
  fs.writeFileSync(publicJsonPath, JSON.stringify(unitData, null, 2), 'utf8');
  console.log(`✅ Synced to ${publicJsonPath}`);
}
if (fs.existsSync(dataJsonPath)) {
  fs.writeFileSync(dataJsonPath, JSON.stringify(unitData, null, 2), 'utf8');
  console.log(`✅ Synced to ${dataJsonPath}`);
}

console.log('🎉 Post-War Britain narrative enrichment complete!');
