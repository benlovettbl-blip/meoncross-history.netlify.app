/**
 * generate_usa_visual_guide.cjs
 *
 * Compiles the complete, print-perfect Pearson Edexcel GCSE (9–1) History Paper 3:
 * "Conflict at Home and Abroad: the USA, 1954–75 (1HI0/33)"
 * Visual Revision Masterclasses & Exam Assessment Guide (36-Page Master Volume).
 *
 * Implements strict Edexcel Specification Rules for Paper 3:
 * 1. Section A:
 *    - Q1 Inference [4m]: Two inferences from Source A with supporting details.
 *    - Q2 Explain Why [12m]: Causation with 2 stimulus points + compulsory own knowledge.
 * 2. Section B:
 *    - Q3(a) Source Utility [8m]: Content, Provenance (COP), and Contextual knowledge for Sources B & C.
 *    - Q3(b) Interpretation Difference [4m]: Comparing main arguments with quotes.
 *    - Q3(c) Suggest Reasons for Difference [4m]: Explaining differing historical sources/evidence.
 *    - Q3(d) Evaluation of Interpretation [16m + 4 SPaG = 20m]: Balanced historiographical essay with criteria-based judgement.
 * 3. 16 Double-Page Content Spreads (32 content pages) + Cover + Spec Guide + Master Chronology + Historiography Guide = 36 Pages.
 * 4. Puppeteer PDF Export with automated zero-overflow layout guardrail (<= 1123px per page).
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { pathToFileURL } = require('url');

const PDF_OUT_PUBLIC = path.join(
  __dirname,
  '..',
  'public',
  'pdfs',
  'edexcel_usa_visual_revision_and_exam_guide.pdf',
);
const PDF_OUT_UNIT = path.join(
  __dirname,
  '..',
  'public',
  'units',
  'usa',
  'edexcel_usa_visual_revision_and_exam_guide.pdf',
);
const PDF_OUT_GDRIVE = path.join(
  'G:\\My Drive\\AAMX\\Dep File',
  'Year 11 (GCSE)',
  'Paper 3 - USA 1954-75',
  'Edexcel GCSE USA Visual Revision and Exam Guide.pdf',
);
const HTML_OUT_PUBLIC = path.join(
  __dirname,
  '..',
  'public',
  'units',
  'usa',
  'visual_revision_guide.html',
);

// Helper to convert relative public paths to base64 Data URIs for offline Puppeteer rendering
function getImageDataUri(imgPath) {
  if (!imgPath) return '';
  const cleanPath = imgPath.startsWith('/') ? imgPath.slice(1) : imgPath;
  const fullPath = path.join(process.cwd(), 'public', cleanPath);
  if (fs.existsSync(fullPath)) {
    const ext = path.extname(fullPath).toLowerCase().replace('.', '');
    const mime = ext === 'svg' ? 'image/svg+xml' : ext === 'png' ? 'image/png' : 'image/jpeg';
    const b64 = fs.readFileSync(fullPath).toString('base64');
    return `data:${mime};base64,${b64}`;
  }
  return imgPath;
}

// Markdown formatting helper
function formatMd(text) {
  if (!text) return '';
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>');
}

// Lined answer generator for print workbooks
function renderLines(count) {
  return Array.from({ length: count }, () => '<div class="line"></div>').join('');
}

// Complete 16-Spread Data Model for Paper 3: USA 1954–75
const SPREADS = [
  // =========================================================================
  // KEY TOPIC 1: THE DEVELOPMENT OF THE CIVIL RIGHTS MOVEMENT, 1954–60
  // =========================================================================
  {
    id: 'lesson_1_1',
    topic: 'Key Topic 1 • Civil Rights 1954–1960',
    title: 'KT 1.1: What was the position of Black Americans in the early 1950s?',
    examType: 'inference_causation',
    left: {
      tag: 'KT 1.1 • Deep Knowledge',
      headline: 'The Realities of Jim Crow: Segregation, Disenfranchisement & Racial Terror',
      summary:
        'In the early 1950s, Black Americans in the American South lived under a comprehensive system of state-sponsored racial apartheid known as Jim Crow. Legitimised by the 1896 Plessy v. Ferguson ruling, enforced by white supremacist terror, and sustained through total political disenfranchisement, Black citizens were denied basic constitutional protections guaranteed by the 14th and 15th Amendments.',
      pillars: [
        {
          title: 'De Jure Segregation',
          subtitle: 'The Legal Machinery of Jim Crow',
          bullets: [
            'Based on the 1896 Supreme Court ruling **Plessy v. Ferguson** establishing "separate but equal".',
            'State laws mandated strict segregation in schools, public transport, restaurants, parks, and hospitals.',
            'Facilities for Black citizens were chronically underfunded, dilapidated, and structurally inferior.',
          ],
        },
        {
          title: 'Voter Disenfranchisement',
          subtitle: 'Systematic Exclusion from Democracy',
          bullets: [
            'Southern states used **poll taxes**, property requirements, and complex **literacy tests** to block Black voters.',
            'Registrars deliberately failed Black applicants by asking impossible constitutional questions.',
            'In 1950, fewer than 20% of eligible Southern Black adults were registered (under 5% in rural Mississippi).',
          ],
        },
        {
          title: 'White Supremacist Violence',
          subtitle: 'Extrajudicial Control & Judicial Impunity',
          bullets: [
            'The **Ku Klux Klan (KKK)** used beatings, cross burnings, house firebombings, and lynchings to enforce subservience.',
            'Southern law enforcement and police chiefs were frequently active members or sympathisers of the Klan.',
            'All-white juries and white judges guaranteed complete legal immunity for white perpetrators of racial violence.',
          ],
        },
      ],
      deepKnowledgeGrid: [
        {
          title: '1. Constitutional Betrayal',
          points: [
            '**14th Amendment (1868):** Guaranteed citizenship and equal protection, yet Southern states systematically ignored it via state "Black Codes".',
            '**15th Amendment (1870):** Banned voting discrimination based on race, but Southern states bypassed it through racially neutral-sounding tests.',
            '**Federal Reluctance:** Presidents Truman and Eisenhower avoided confronting Southern Democratic "Dixiecrats" in Congress.',
          ],
        },
        {
          title: '2. De Facto Northern Reality',
          points: [
            '**Ghettoization:** While northern law did not mandate segregation, racial redlining and restrictive covenants forced Black families into slums.',
            '**Employment Gaps:** Black workers were "last hired, first fired", earning wages on average 50% lower than white workers.',
            '**Great Migration:** Millions of Black Americans fled north seeking factory work, creating vibrant cultural hubs in Harlem and Chicago.',
          ],
        },
        {
          title: '3. Legal Resistance (NAACP)',
          points: [
            '**Founded 1909:** National Association for the Advancement of Colored People focused on judicial and courtroom challenges.',
            '**Thurgood Marshall:** Chief legal counsel who methodically attacked the "equal" component of Plessy v. Ferguson in universities.',
            '**Legal Foundation:** Proved that segregated graduate and law schools could never offer equal educational standing.',
          ],
        },
        {
          title: '4. Everyday Humiliation',
          points: [
            '**Public Etiquette:** Black people were required to address white youths as "Sir", step off pavements, and remove hats.',
            '**Health & Infant Mortality:** Black infant mortality rates in the South were double those of white infants due to hospital segregation.',
            '**Public Transport:** Black passengers paid at the front, exited, re-entered at the rear, and surrendered seats on demand.',
          ],
        },
      ],
      vocabBank: [
        {
          term: 'De Jure Segregation',
          def: 'Racial separation enforced by legislation and local law (Jim Crow).',
        },
        {
          term: 'De Facto Segregation',
          def: 'Racial separation existing in practice due to economic factors and housing patterns.',
        },
        {
          term: 'Plessy v. Ferguson (1896)',
          def: 'Supreme Court decision ruling that "separate but equal" public facilities were constitutional.',
        },
        {
          term: 'Disenfranchisement',
          def: 'The state-sponsored revocation or denial of the right to vote.',
        },
        {
          term: 'Poll Tax',
          def: 'A fee required to vote, intentionally pricing out poor Black sharecroppers.',
        },
        {
          term: 'Literacy Test',
          def: 'Biased, confusing civic tests administered arbitrarily by white Southern voting registrars.',
        },
      ],
      causalFactors: [
        "**1. States' Rights Ideology:** Southern state politicians claimed federal anti-lynching and civil rights laws violated state sovereignty.",
        '**2. Economic Exploitation:** Sharecropping and segregation ensured white Southern landowners retained cheap, powerless agricultural labour.',
        '**3. Total Police Complicity:** Law enforcement was weaponized to suppress any Black commercial, political, or social self-assertion.',
      ],
      examinerTraps: [
        {
          trap: 'Believing racial segregation existed only in the American South.',
          correction:
            'Northern and western cities had extensive *de facto* segregation through bank redlining, discriminatory hiring, and segregated housing covenants.',
        },
        {
          trap: 'Assuming Black Americans chose not to vote due to political apathy.',
          correction:
            'Black citizens risked losing their jobs, being evicted from tenancy, having mortgages foreclosed, or being lynched if they attempted to register.',
        },
        {
          trap: 'Treating the 1950s civil rights movement as appearing spontaneously out of nowhere.',
          correction:
            'Decades of patient courtroom litigation by the NAACP and returning WWII veterans laid the critical groundwork for mass mobilization.',
        },
      ],
    },
    right: {
      q1: {
        title: 'Question 1: Source Inference [4 Marks]',
        sourceTitle: 'Source A: Railway station sign, Jacksonville, Florida, early 1950s',
        sourceImage: 'units/usa/assets/sources/colored-waiting-room-sign.jpg',
        sourceCaption:
          'Contemporary photograph showing a prominent municipal sign directing Black passengers to a segregated waiting room.',
        question:
          'Give two things you can infer from Source A about the system of racial segregation in the American South in the early 1950s.',
      },
      q2: {
        title: 'Question 2: Causation Essay [12 Marks]',
        question:
          'Explain why it was difficult for Black Americans in the Southern states to register to vote in the early 1950s.',
        stimulus: ['Literacy tests', 'Ku Klux Klan (KKK)'],
        spanNote: '1950–1955',
        lines: 24,
      },
    },
  },

  // =========================================================================
  // SPREAD 2: KT 1.2 — CHALLENGING SEGREGATION IN EDUCATION
  // =========================================================================
  {
    id: 'lesson_1_2',
    topic: 'Key Topic 1 • Civil Rights 1954–1960',
    title: 'KT 1.2: How did developments in education challenge segregation (1954–57)?',
    examType: 'source_utility',
    left: {
      tag: 'KT 1.2 • Deep Knowledge',
      headline: 'Brown v. Topeka & Little Rock: Judicial Triumph vs Southern Nullification',
      summary:
        'The legal assault on school segregation culminated in the landmark 1954 Brown v. Board of Education ruling, where Chief Justice Earl Warren declared segregated education inherently unequal. However, the ruling met fierce Southern "Massive Resistance", forcing President Eisenhower to deploy federal troops to Little Rock Central High School in 1957 to uphold the supremacy of the US Constitution.',
      pillars: [
        {
          title: 'Brown v. Board of Education (1954)',
          subtitle: 'Overturning Plessy v. Ferguson',
          bullets: [
            'NAACP lawyer **Thurgood Marshall** consolidated five cases, arguing segregation psychologically harmed Black children.',
            'Unanimous 9–0 decision written by **Chief Justice Earl Warren**: "Separate educational facilities are inherently unequal."',
            'Legally shattered the doctrine of Plessy v. Ferguson in public education across 17 segregationist states.',
          ],
        },
        {
          title: 'The Loophole of Brown II (1955)',
          subtitle: 'The Southern Strategy of Delay',
          bullets: [
            'In 1955, the Supreme Court ordered desegregation to proceed with **"all deliberate speed"** without setting a hard deadline.',
            'Southern states exploited this vague phrasing to stall, file endless legal appeals, and create private white academies.',
            'In 1956, 101 Southern congressmen signed the **Southern Manifesto**, pledging defiance to federal court orders.',
          ],
        },
        {
          title: 'Little Rock Central High (1957)',
          subtitle: 'Federal Power Confronts State Defiance',
          bullets: [
            'Arkansas Governor **Orval Faubus** deployed the state National Guard to block nine Black students from entering.',
            'Televised scenes of an angry white mob screaming at 15-year-old **Elizabeth Eckford** shocked the international community.',
            'Eisenhower federalized the National Guard and sent 1,000 troops of the **101st Airborne Division** to escort the students.',
          ],
        },
      ],
      deepKnowledgeGrid: [
        {
          title: '1. Doll Test Psychological Proof',
          points: [
            "**Kenneth & Mamie Clark:** Psychologists proved segregation damaged Black children's self-esteem using Black and white dolls.",
            '**Judicial Impact:** Convinced the Supreme Court that physical parity could never compensate for the stigma of state-enforced segregation.',
            '**Sociological Precedent:** Marked the first time sociological and psychological evidence was decisive in Supreme Court rulings.',
          ],
        },
        {
          title: "2. Faubus' Political Motive",
          points: [
            '**Gubernatorial Re-election:** Faubus had previously been a moderate, but pandered to segregationists to win a third term.',
            '**Closing the Schools (1958):** In 1958, Faubus closed all Little Rock high schools for a year (the "Lost Year") rather than integrate.',
            '**Federal Precedent:** Proved that state governors could not nullify federal law with impunity.',
          ],
        },
        {
          title: '3. Cold War Geopolitics',
          points: [
            '**Soviet Propaganda:** Moscow broadcast Little Rock mob violence to Asia and Africa to expose American democratic hypocrisy.',
            "**Eisenhower's Realpolitik:** Eisenhower acted not from passionate moral support for civil rights, but to protect US global prestige.",
            '**Constitutional Crisis:** Eisenhower could not permit a state governor to defy federal court orders without destroying federal authority.',
          ],
        },
        {
          title: '4. The Limits of Victory',
          points: [
            '**Token Integration:** Only 9 students entered Little Rock; the majority of Southern schools remained completely segregated.',
            '**Retaliation Against Parents:** Parents of the Little Rock Nine were fired from jobs; the Eckford family faced death threats.',
            '**Pace of Change:** By 1964, ten years after Brown, fewer than 2% of Black children in the Deep South attended integrated schools.',
          ],
        },
      ],
      vocabBank: [
        {
          term: 'Brown v. Board of Education',
          def: 'The 1954 landmark Supreme Court decision outlawing racial segregation in public schools.',
        },
        {
          term: 'Earl Warren',
          def: 'The progressive Chief Justice of the US Supreme Court who unified the court in the 9–0 Brown decision.',
        },
        {
          term: 'All Deliberate Speed',
          def: 'Vague enforcement clause in Brown II (1955) that allowed Southern states to delay desegregation.',
        },
        {
          term: 'Southern Manifesto (1956)',
          def: 'Declaration signed by 101 Southern congressmen pledging resistance to school integration.',
        },
        {
          term: 'Orval Faubus',
          def: 'Segregationist Governor of Arkansas who used armed troops to bar the Little Rock Nine in 1957.',
        },
        {
          term: '101st Airborne Division',
          def: 'Elite US Army paratroopers deployed by Eisenhower to enforce federal court orders at Little Rock.',
        },
      ],
      causalFactors: [
        '**1. Coordinated Legal Strategy:** Thurgood Marshall spent decades building legal precedents in higher education before tackling schools.',
        '**2. Televised Shock:** Broadcasts of white adults spitting at teenagers horrified northern voters and damaged American foreign policy.',
        '**3. Executive Intervention:** Eisenhower proved that the full military power of the federal government would enforce Supreme Court mandates.',
      ],
      examinerTraps: [
        {
          trap: 'Assuming Brown v. Board of Education immediately desegregated all Southern schools.',
          correction:
            'Brown legally outlawed school segregation, but Southern "Massive Resistance" delayed meaningful integration for over a decade.',
        },
        {
          trap: 'Believing President Eisenhower deployed troops because he was an outspoken civil rights champion.',
          correction:
            'Eisenhower acted reluctantly to uphold federal constitutional supremacy and protect US Cold War diplomatic standing.',
        },
        {
          trap: 'Confusing the Arkansas National Guard with the 101st Airborne Division.',
          correction:
            'Faubus used the Arkansas National Guard to block the students; Eisenhower federalized that guard and sent the 101st Airborne to escort them.',
        },
      ],
    },
    right: {
      q3a: {
        enquiry:
          'the opposition to school desegregation at Little Rock Central High School in 1957',
        sourceB: {
          title:
            'Source B: Photograph of US 101st Airborne soldiers escorting the Little Rock Nine, September 1957',
          image: 'units/usa/assets/sources/airborne-little-rock-patrol.jpg',
          caption:
            'Official US Army photograph showing paratroopers armed with fixed bayonets escorting Black students past crowds into Little Rock Central High.',
        },
        sourceC: {
          title:
            'Source C: From an interview with Melba Pattillo Beals, one of the Little Rock Nine, published in 1994',
          text: "\"The heat was intense and the noise from the crowd was terrifying. People were screaming, 'Lynch them! Lynch them!' It wasn't just men; well-dressed mothers were shouting vile slurs and spitting on the ground. When the 101st Airborne soldiers arrived in their jeeps, it was the first time in my life I felt that the government of my own country actually considered my life worth protecting. But inside the school halls, away from the guards, the torment never stopped: ink poured on dresses, kicks in the stairwells, and acid sprayed into eyes.\"",
          provenance:
            "Melba Pattillo Beals reflecting 37 years later in her memoir 'Warriors Don't Cry'.",
        },
        provenanceClue:
          'Consider the visual evidence of armed military force required to protect children in Source B, and evaluate Melba Pattillo Beals’ visceral eyewitness testimony in Source C regarding the unrelenting hostility of white local citizens.',
        lines: 28,
      },
    },
  },

  // =========================================================================
  // SPREAD 3: KT 1.3 — MONTGOMERY BUS BOYCOTT & RISE OF MLK
  // =========================================================================
  {
    id: 'lesson_1_3',
    topic: 'Key Topic 1 • Civil Rights 1954–1960',
    title: 'KT 1.3: How did the Montgomery Bus Boycott happen, and why did it succeed?',
    examType: 'interpretation_diff_why',
    left: {
      tag: 'KT 1.3 • Deep Knowledge',
      headline: 'The 381-Day Economic Siege: Grassroots Unity, Non-Violence & Legal Victory',
      summary:
        'Sparked by the arrest of Rosa Parks on December 1, 1955, the Montgomery Bus Boycott demonstrated the immense power of organized non-violent direct action combined with economic leverage. Led by the newly formed Montgomery Improvement Association under 26-year-old Dr Martin Luther King Jr., the Black community maintained a 381-day transit strike that ended when the Supreme Court ruled bus segregation unconstitutional.',
      pillars: [
        {
          title: 'The Catalyst: Rosa Parks & WPC',
          subtitle: 'The Carefully Planned Spark',
          bullets: [
            'On December 1, 1955, **Rosa Parks** (trained NAACP activist) refused to surrender her bus seat to a white passenger.',
            "**Jo Ann Robinson** and the Women's Political Council (WPC) immediately mimeographed and distributed 35,000 boycott leaflets.",
            'A one-day protest on December 5 achieved over 90% Black compliance, proving the community was ready for sustained action.',
          ],
        },
        {
          title: 'The Logistics of Resistance',
          subtitle: 'The MIA & Alternative Transport Networks',
          bullets: [
            'The **Montgomery Improvement Association (MIA)** was formed, electing charismatic young pastor **Dr Martin Luther King Jr.** as leader.',
            'Organized an intricate carpool network with 300+ private cars, low-fare Black taxi networks, and church dispatch stations.',
            'Church mass rallies held twice weekly sustained community morale, discipline, and commitment to Christian non-violence.',
          ],
        },
        {
          title: 'Legal Force: Browder v. Gayle',
          subtitle: 'The Decisive Constitutional Verdict',
          bullets: [
            'Black riders constituted 75% of bus revenue; the sustained boycott pushed the municipal bus company into financial crisis.',
            "White backlash was violent: King's home was firebombed; city authorities arrested boycott carpool drivers on bogus charges.",
            'In November 1956, the US Supreme Court confirmed **Browder v. Gayle**, ruling bus segregation violated the 14th Amendment.',
          ],
        },
      ],
      deepKnowledgeGrid: [
        {
          title: '1. Economic Vulnerability',
          points: [
            '**Loss of Fares:** The Montgomery City Lines lost an estimated $3,000 per day throughout the 381-day strike.',
            '**Downtown Business Losses:** White merchants in downtown Montgomery lost millions in retail sales as Black shoppers stayed away.',
            "**Insurance Sabotage:** White city commissioners forced local insurers to cancel policies on church carpools; King secured Lloyd's of London coverage.",
          ],
        },
        {
          title: '2. The Philosophy of King',
          points: [
            "**Christian Non-Violence:** King blended Jesus's Sermon on the Mount with Mahatma Gandhi's technique of *satyagraha* (soul-force).",
            '**Moral Superiority:** Commanded protesters never to retaliate physically: "If we are arrested every day, let no man pull you down so low as to hate him."',
            "**National Media Icon:** King's oratorical brilliance attracted northern newspaper correspondents, national television networks, and international sympathy.",
          ],
        },
        {
          title: '3. Strategic Role of Women',
          points: [
            '**Claudette Colvin:** A 15-year-old girl arrested nine months before Parks; NAACP chose not to use her case due to pregnancy controversy.',
            '**Domestic Workers:** Thousands of domestic maids walked up to 12 miles daily in rain and heat: "My feets is tired, but my soul is rested."',
            "**Organizing Backbone:** The Women's Political Council provided the administrative labor and street-level coordination throughout 1956.",
          ],
        },
        {
          title: '4. Institutional Legacy',
          points: [
            '**Foundation of SCLC:** In January 1957, King co-founded the **Southern Christian Leadership Conference (SCLC)** to coordinate southern protests.',
            '**Model for Direct Action:** Proved that mass civil disobedience was economically effective and morally unassailable.',
            '**Limits of Triumph:** Integration applied only to public buses; schools, parks, housing, and voting remained fiercely segregated.',
          ],
        },
      ],
      vocabBank: [
        {
          term: 'Rosa Parks',
          def: 'Respected NAACP activist whose arrest for refusing to yield her seat sparked the Montgomery Bus Boycott.',
        },
        {
          term: 'Montgomery Improvement Association',
          def: 'Organization formed in December 1955 to direct and administer the bus boycott.',
        },
        {
          term: 'Martin Luther King Jr.',
          def: '26-year-old Baptist minister chosen to lead the MIA; champion of non-violent civil disobedience.',
        },
        {
          term: 'Jo Ann Robinson',
          def: "President of the Women's Political Council who produced and distributed 35,000 boycott leaflets overnight.",
        },
        {
          term: 'Browder v. Gayle (1956)',
          def: 'Federal court ruling upheld by the Supreme Court outlawing segregation on interstate and municipal buses.',
        },
        {
          term: 'SCLC (1957)',
          def: 'Southern Christian Leadership Conference; church-led civil rights body established by MLK.',
        },
      ],
      causalFactors: [
        '**1. Comprehensive Logistics:** The carpool system neutralized city efforts to break the boycott by walking passengers into submission.',
        '**2. Unshakeable Church Discipline:** Twice-weekly mass prayer meetings kept 50,000 Black citizens unified despite bomb threats and arrests.',
        '**3. Supreme Court Ruling:** Grassroots boycott created financial distress, but the Browder v. Gayle verdict provided the legal mandate.',
      ],
      examinerTraps: [
        {
          trap: 'Believing Rosa Parks was simply an exhausted seamstress who acted impulsively.',
          correction:
            'Parks was an experienced NAACP secretary and civil rights activist who had trained at the Highlander Folk School.',
        },
        {
          trap: 'Assuming economic pressure alone forced the Montgomery bus company to integrate.',
          correction:
            "The bus company wanted to integrate to stop losses, but city laws forbade it; only the Supreme Court's ruling in Browder v. Gayle forced integration.",
        },
        {
          trap: 'Thinking the Montgomery Boycott immediately integrated all public facilities in the city.',
          correction:
            'The victory desegregated buses only; Montgomery parks, swimming pools, restaurants, and schools remained strictly segregated.',
        },
      ],
    },
    right: {
      int1: {
        author: "Historian Danielle L. McGuire, 'At the Dark End of the Street' (2010)",
        text: '"The Montgomery Bus Boycott was fundamentally the accomplishment of organized Black women and working-class domestic workers. Jo Ann Robinson and the Women\'s Political Council mobilized the community within hours of Rosa Parks\' arrest, distributing 35,000 leaflets overnight and managing an intricate 300-car dispatch network. For over a year, thousands of maids and labourers walked miles daily, starving the municipal bus company of over 70% of its revenue. It was this sustained economic sacrifice and grassroots community solidarity that created an intolerable crisis for the city."',
      },
      int2: {
        author: "Historian David L. Lewis, 'King: A Critical Biography' (1970)",
        text: '"While grassroots logistics provided the skeleton of the protest, the boycott achieved national prominence and ultimate victory because of the charismatic oratory and spiritual leadership of Dr Martin Luther King Jr. King gave the movement its unshakeable Christian non-violent philosophy, uniting disparate factions and attracting crucial northern financial and media support. Furthermore, local economic pressure could never legally force integration; only the decisive federal intervention of the Supreme Court in Browder v. Gayle compelled Montgomery to yield."',
      },
      q3b: {
        question:
          'Study Interpretations 1 and 2. They give different views about the main reason why the Montgomery Bus Boycott was successful. What is the main difference between these views? Explain your answer, using details from both interpretations.',
        lines: 5,
      },
      q3c: {
        question:
          'Suggest one reason why Interpretations 1 and 2 give different views about the main reason why the Montgomery Bus Boycott succeeded. You may use information from your own knowledge to help explain your answer.',
        lines: 5,
      },
    },
  },

  // =========================================================================
  // SPREAD 4: KT 1.4 — WHITE RESISTANCE & EMMETT TILL
  // =========================================================================
  {
    id: 'lesson_1_4',
    topic: 'Key Topic 1 • Civil Rights 1954–1960',
    title: 'KT 1.4: Why did white people in the South resist integration, and how did they do it?',
    examType: 'interpretation_eval',
    left: {
      tag: 'KT 1.4 • Deep Knowledge',
      headline: 'White Supremacy Under Threat: Legal Defiance, Economic Terrorism & Lynching',
      summary:
        'The legal victories of Brown and Montgomery provoked a ferocious counter-offensive across the South known as "Massive Resistance". White resistance operated across all levels of society: politicians drafted the Southern Manifesto, white professionals organized White Citizens\' Councils to economically starve activists, and vigilantes used murder—most infamously the gruesome 1955 lynching of 14-year-old Emmett Till in Mississippi.',
      pillars: [
        {
          title: "White Citizens' Councils (WCC)",
          subtitle: 'The "Uptown Klan" & Economic Coercion',
          bullets: [
            'Founded in Indianola, Mississippi (1954); grew to 250,000 middle-class business owners, lawyers, and bankers.',
            'Used economic terrorism: fired Black workers who signed integration petitions, cancelled mortgages, and evicted sharecroppers.',
            'Convinced white public officials to defund or shut public schools rather than permit a single Black child to enroll.',
          ],
        },
        {
          title: 'The Ku Klux Klan & Violent Terror',
          subtitle: 'Bombings, Beatings & Assassinations',
          bullets: [
            'Revived violently after 1954; targeted civil rights leaders, NAACP officers, and white sympathisers.',
            'Responsible for hundreds of bombings (Birmingham, Alabama became known as "Bombingham" due to 50+ dynamite attacks).',
            'Complicity of local sheriffs and all-white juries ensured Klansmen operated with near-total judicial immunity.',
          ],
        },
        {
          title: 'The Murder of Emmett Till (1955)',
          subtitle: 'The Catalyst that Galvanized a Generation',
          bullets: [
            '14-year-old Chicago boy visiting relatives in Money, Mississippi, accused of whistling at white store clerk Carolyn Bryant.',
            'Abducted by Roy Bryant and J.W. Milam; savagely beaten, eye gouged out, shot, and weighted with a 75-pound cotton gin fan in the Tallahatchie River.',
            'His mother **Mamie Till Bradley** held an open-casket funeral in Chicago; an all-white jury acquitted the killers in 67 minutes.',
          ],
        },
      ],
      deepKnowledgeGrid: [
        {
          title: '1. Look Magazine Confession',
          points: [
            '**Protected by Double Jeopardy:** Four months after acquittal, Bryant and Milam sold their full murder confession to *Look* magazine for $4,000.',
            '**Total Lack of Remorse:** Openly bragged about beating and shooting Till to "teach Chicago Black boys a lesson".',
            '**Global Outrage:** Highlighted the absolute corruption of Southern jurisprudence to millions of northern and European observers.',
          ],
        },
        {
          title: '2. The Role of the Black Press',
          points: [
            "**Jet Magazine:** Published unedited photographs of Emmett Till's mutilated corpse; circulated to millions of readers.",
            '**Mose Wright\'s Courage:** Till\'s 64-year-old great-uncle stood in court, pointed directly at the white killers, and said "There he is"—an act of suicidal bravery in 1955 Mississippi.',
            '**Youth Radicalization:** Young Black Americans across the country (including John Lewis and Muhammad Ali) cited Till as the awakening of their activism.',
          ],
        },
        {
          title: '3. The Southern Manifesto (1956)',
          points: [
            '**Drafted by Senators:** Authored by Senator Strom Thurmond and signed by 101 Southern congressmen and senators.',
            '**Nullification Doctrine:** Condemned the Supreme Court for "clear abuse of judicial power" and encouraged state governors to resist integration.',
            '**Legitimising Resistance:** Provided intellectual and legal respectability to violent obstructionism on the ground.',
          ],
        },
        {
          title: '4. The 1957 Civil Rights Act',
          points: [
            '**First Civil Rights Act Since 1875:** Proposed by Eisenhower to protect Black voting rights, but severely weakened by Southern filibusters.',
            '**Strom Thurmond Filibuster:** Thurmond spoke for 24 hours and 18 minutes to stall the bill.',
            '**Toothless Enforcement:** Established the Civil Rights Commission, but left voting rights enforcement dependent on hostile local southern courts.',
          ],
        },
      ],
      vocabBank: [
        {
          term: "White Citizens' Councils",
          def: 'Associations of white business and civic leaders dedicated to economically punishing integrationists.',
        },
        {
          term: 'Emmett Till',
          def: '14-year-old Black youth from Chicago murdered in Mississippi in August 1955; his death shocked the nation.',
        },
        {
          term: 'Mamie Till Bradley',
          def: "Emmett Till's mother whose decision to hold an open-casket funeral exposed Southern brutality.",
        },
        {
          term: 'Double Jeopardy',
          def: "Constitutional clause preventing a defendant from being tried twice for the same crime, exploited by Till's killers.",
        },
        {
          term: 'Southern Manifesto',
          def: '1956 congressional declaration pledging to resist school desegregation by all lawful means.',
        },
        {
          term: 'Massive Resistance',
          def: 'Policy declared by Virginia Senator Harry Byrd urging Southern white politicians to defy federal court orders.',
        },
      ],
      causalFactors: [
        '**1. Preservation of White Hegemony:** Segregationists saw school integration as an existential threat to white social, sexual, and racial purity.',
        '**2. Judicial Complicity:** All-white juries, segregationist judges, and compliant sheriffs effectively legalized violence against Black citizens.',
        "**3. The Power of Visual Media:** Mamie Till's open-casket decision turned a private lynching into an unignorable national moral crisis.",
      ],
      examinerTraps: [
        {
          trap: "Confusing the White Citizens' Councils with the Ku Klux Klan.",
          correction:
            'The KKK used hooded nocturnal violence, while the WCC consisted of respectable white professionals who weaponized mortgages, credit, and employment.',
        },
        {
          trap: 'Assuming Emmett Till was the only lynching in the South in the 1950s.',
          correction:
            'Lynchings were common; Till became iconic specifically because his mother insisted on showing his mutilated body to the national press.',
        },
        {
          trap: 'Believing the 1957 Civil Rights Act successfully guaranteed voting rights.',
          correction:
            'Southern senators gutted the bill; it was so weak that only 3% more Black voters were registered by 1960.',
        },
      ],
    },
    right: {
      essay: {
        title: 'Question 3(d): Evaluative Essay [16 Marks + 4 SPaG = 20 Marks]',
        int1: {
          author: "Historian David Garrow, 'Bearing the Cross' (1986)",
          text: '"The lynching of Emmett Till and the subsequent sham trial in Sumner, Mississippi, was the single most powerful emotional catalyst of the early civil rights era. By forcing the world to view her son\'s butchered face in Jet magazine, Mamie Till transformed private grief into an undeniable public indictment. It shook northern Black communities out of complacency, radicalized a generation of high school and university students, and created a profound moral outrage that fueled the direct action movement of the 1960s."',
        },
        int2: {
          author: "Historian Stephen Oates, 'Let the Trumpet Sound' (1982)",
          text: '"While the murder of Emmett Till generated intense national headlines and genuine grief, its actual practical outcome demonstrated the terrifying, unyielding power of white resistance. The shameless speed of the all-white jury\'s acquittal, followed by the killers\' arrogant public confession in Look magazine, proved that in the Deep South, white supremacy was completely above the law. Far from dismantling Jim Crow, it reminded Southern Black citizens that seeking equality carried a sentence of death."',
        },
        question:
          'How far do you agree with Interpretation 2 about the impact of the murder of Emmett Till on the civil rights struggle?',
        targetInt: 'Interpretation 2',
        planningGuide:
          'Intro: State clear criteria for impact &rarr; Section 1: Support Int 2 (white legal impunity, Look magazine confession, terror in the rural South) &rarr; Section 2: Evaluate Int 1 (catalyst for youth mobilization, northern outrage, Jet magazine) &rarr; Conclusion: Deliver a sustained, nuanced judgement on Interpretation 2.',
        lines: 38,
      },
    },
  },

  // =========================================================================
  // SPREAD 5: KT 2.1 — PEACEFUL DIRECT ACTION (SIT-INS & FREEDOM RIDES)
  // =========================================================================
  {
    id: 'lesson_2_1',
    topic: 'Key Topic 2 • Civil Rights 1960–1968',
    title: 'KT 2.1: How did peaceful protests force the government to act?',
    examType: 'inference_causation',
    left: {
      tag: 'KT 2.1 • Deep Knowledge',
      headline: 'The Direct Action Wave: Youth Mobilization, Violent Backlash & Federal Crisis',
      summary:
        'In the early 1960s, a new generation of student activists broke away from slow legalism and launched confrontational non-violent direct action. Through lunch counter sit-ins, the Freedom Rides, and mass marches, organizations like SNCC and CORE provoked violent southern white reactions, forcing the Kennedy administration to use federal marshals and interstate commerce regulations to outlaw public segregation.',
      pillars: [
        {
          title: 'The Greensboro Sit-ins (1960)',
          subtitle: 'The Student Movement Takes Command',
          bullets: [
            "On February 1, 1960, four Black college students sat at a whites-only **Woolworth's counter** in Greensboro, North Carolina.",
            'Within a week, 54 students joined; within months, sit-ins spread across 55 cities in 13 states with 70,000+ participants.',
            'Led to the founding of **SNCC (Student Nonviolent Coordinating Committee)**, committed to frontline grassroots action.',
          ],
        },
        {
          title: 'The Freedom Rides (1961)',
          subtitle: 'Testing Federal Law on Interstate Travel',
          bullets: [
            'CORE organized integrated bus trips across the South to test the 1960 *Boynton v. Virginia* ruling desegregating bus terminals.',
            'In Anniston, Alabama, a bus was firebombed by a Klan mob; in Birmingham and Montgomery, riders were beaten with iron pipes.',
            'Attorney General **Robert Kennedy** sent 500 US Marshals and ordered the **ICC** to strictly ban all interstate transit segregation.',
          ],
        },
        {
          title: 'March on Washington (1963)',
          subtitle: 'The Moral Climax of the Movement',
          bullets: [
            'On August 28, 1963, 250,000 people (including 60,000 white allies) marched for "Jobs and Freedom" at the Lincoln Memorial.',
            'Martin Luther King Jr. delivered his historic **"I Have a Dream"** speech, broadcast live on national television networks.',
            'Put immense moral pressure on President Kennedy and Congress to pass comprehensive civil rights legislation.',
          ],
        },
      ],
      deepKnowledgeGrid: [
        {
          title: '1. Economic Boycotts',
          points: [
            "**Woolworth's Losses:** Boycotting store lunch counters cost national retail chains hundreds of thousands in sales.",
            "**July 1960 Victory:** The Greensboro Woolworth's desegregated its counter after six months of persistent daily picketing.",
            '**Jail, No Bail:** Activists chose prison over fines to strain municipal jail capacities and maximize financial costs to cities.',
          ],
        },
        {
          title: '2. CORE & James Farmer',
          points: [
            '**Congress of Racial Equality (CORE):** Founded in 1942; pioneered non-violent direct action techniques.',
            '**Calculated Risk:** Director James Farmer acknowledged riders might die: "We anticipated violence; our aim was to make it impossible for the federal government to look the other way."',
            "**Parchman Penitentiary:** Hundreds of arrested riders were sent to Mississippi's notorious state prison, singing freedom songs in cells.",
          ],
        },
        {
          title: '3. The Albany Movement (1961–62)',
          points: [
            "**King's Tactical Defeat:** Police Chief Laurie Pritchett studied King's tactics; instructed officers to treat protesters gently and avoid televised violence.",
            '**No Federal Intervention:** Without brutal police violence, the Kennedy administration refused to intervene, leaving Albany segregated.',
            '**Vital Lesson for King:** King realized federal intervention occurred only when local authorities erupted in shocking, televised brutality.',
          ],
        },
        {
          title: "4. Kennedy's Evolution",
          points: [
            '**Cautious Cold Warrior:** JFK initially viewed civil rights as a nuisance that alienated southern Democratic committee chairmen.',
            "**Forced Hand:** The savagery of Klan attacks on Freedom Riders and Bull Connor's brutality in Birmingham forced Kennedy to act.",
            '**June 1963 Address:** Delivered a landmark television speech declaring civil rights a "moral issue as old as the scriptures".',
          ],
        },
      ],
      vocabBank: [
        {
          term: 'Sit-in',
          def: 'Non-violent protest where activists occupy segregated seats and refuse to leave until served or arrested.',
        },
        {
          term: 'SNCC',
          def: 'Student Nonviolent Coordinating Committee, formed in 1960 to direct youth direct-action protests.',
        },
        {
          term: 'CORE',
          def: 'Congress of Racial Equality; interracial civil rights body that organized the 1961 Freedom Rides.',
        },
        {
          term: 'Freedom Riders',
          def: 'Black and white activists who rode interstate buses into the segregated South in 1961.',
        },
        {
          term: 'ICC Ruling (1961)',
          def: 'Interstate Commerce Commission order desegregating all interstate buses, trains, and terminal facilities.',
        },
        {
          term: 'March on Washington',
          def: 'Massive peaceful demonstration in August 1963 demanding civil rights legislation and jobs.',
        },
      ],
      causalFactors: [
        '**1. Weaponizing Television Media:** Broadcasts of peaceful students being beaten, burned, and attacked provoked national moral revulsion.',
        '**2. Forced Federal Protection:** The Kennedy administration was compelled to deploy federal marshals to prevent mob lynchings.',
        '**3. Youth Radicalism:** Student willingness to endure beatings and jail sentences without bail overwhelmed southern municipal legal systems.',
      ],
      examinerTraps: [
        {
          trap: 'Believing the Freedom Rides were protected by local police in Alabama.',
          correction:
            'Birmingham Police Chief Bull Connor made a pact with the Klan giving them 15 uninterrupted minutes to beat the riders before police arrived.',
        },
        {
          trap: 'Assuming all civil rights leaders agreed on the March on Washington.',
          correction:
            'Malcolm X condemned it as the "Farce on Washington", while SNCC\'s John Lewis was forced to tone down his speech criticizing Kennedy.',
        },
        {
          trap: 'Thinking the March on Washington immediately passed the Civil Rights Act.',
          correction:
            "The bill remained stuck in southern-dominated congressional committees; it passed only in 1964 after JFK's assassination under LBJ.",
        },
      ],
    },
    right: {
      q1: {
        title: 'Question 1: Source Inference [4 Marks]',
        sourceTitle: "Source A: The Greensboro Four leaving Woolworth's, February 1960",
        sourceImage: 'images/greensboro_four_1960.jpg',
        sourceCaption:
          'Contemporary photograph showing Ezell Blair Jr., Franklin McCain, Joseph McNeil, and David Richmond walking calmly out of the store after the first sit-in.',
        question:
          'Give two things you can infer from Source A about the methods and discipline of civil rights protesters in the 1960s.',
      },
      q2: {
        title: 'Question 2: Causation Essay [12 Marks]',
        question:
          'Explain why peaceful direct action protests (such as sit-ins and Freedom Rides) forced the federal government to act in the early 1960s.',
        stimulus: ['Television media coverage', 'Violence against Freedom Riders'],
        spanNote: '1960–1963',
        lines: 24,
      },
    },
  },

  // =========================================================================
  // SPREAD 6: KT 2.2 — BIRMINGHAM, SELMA & CIVIL RIGHTS ACTS
  // =========================================================================
  {
    id: 'lesson_2_2',
    topic: 'Key Topic 2 • Civil Rights 1960–1968',
    title: 'KT 2.2: How did Birmingham, Selma, and federal laws reshape America?',
    examType: 'interpretation_diff_why',
    left: {
      tag: 'KT 2.2 • Deep Knowledge',
      headline: 'The Climax of Reform: Bull Connor, Bloody Sunday & The Landmark Acts',
      summary:
        'Faced with entrenched southern resistance, Martin Luther King Jr. and the SCLC orchestrated confrontations in Birmingham (1963) and Selma (1965), knowing Police Chief "Bull" Connor and Sheriff Jim Clark would react with vicious public brutality. The televised spectacle of attack dogs, water cannons, and state troopers clubbing peaceful marchers shocked the nation, empowering President Lyndon B. Johnson to push through the Civil Rights Act of 1964 and Voting Rights Act of 1965.',
      pillars: [
        {
          title: 'Project C: Birmingham (1963)',
          subtitle: "The Children's Crusade & Bull Connor",
          bullets: [
            'SCLC launched "Project C" (Confrontation) in America\'s most segregated city; King jailed, writing **"Letter from Birmingham Jail"**.',
            'SCLC organizer James Bevel recruited thousands of school children; Police Chief **Eugene "Bull" Connor** deployed police dogs and high-pressure fire hoses.',
            'Televised images of children slammed against walls by 100-psi water jets shocked the global public and forced city merchants to desegregate.',
          ],
        },
        {
          title: 'Selma & Bloody Sunday (1965)',
          subtitle: 'The Edmund Pettus Bridge Confrontation',
          bullets: [
            'To demand voting rights in Dallas County, Alabama (where only 1% of Black citizens were registered), King organized a 54-mile march to Montgomery.',
            'On March 7, 1965 (**Bloody Sunday**), state troopers mounted on horses attacked 600 marchers on the Edmund Pettus Bridge with tear gas, whips, and clubs.',
            'President **Lyndon B. Johnson** took to national television, quoted the movement anthem *"We Shall Overcome"*, and submitted the Voting Rights Bill.',
          ],
        },
        {
          title: 'The Great Legislative Victories',
          subtitle: 'The 1964 and 1965 Landmark Acts',
          bullets: [
            '**Civil Rights Act of 1964:** Banned discrimination in public accommodations, outlawed employment discrimination, established the EEOC.',
            'Allowed the federal government to withhold funds from segregated school districts, speeding up desegregation.',
            '**Voting Rights Act of 1965:** Suspended literacy tests and authorized **federal voting registrars** in counties where voter turnout was under 50%.',
          ],
        },
      ],
      deepKnowledgeGrid: [
        {
          title: '1. 16th Street Baptist Church',
          points: [
            '**Klan Retaliation:** In September 1963, KKK members bombed the 16th Street Baptist Church in Birmingham, killing four young girls.',
            '**Deep South Radicalization:** Convinced many younger activists that non-violent integration would never satisfy murderous white supremacists.',
            '**Catalyst for Legislation:** Deepened national resolve in Washington to pass the stalled civil rights bill.',
          ],
        },
        {
          title: "2. LBJ's Legislative Genius",
          points: [
            '**The "Johnson Treatment":** LBJ used his formidable Senate experience to cajole, intimidate, and break the 57-day southern filibuster.',
            '**Honouring Kennedy:** Framed the 1964 Act as a living memorial to the assassinated President Kennedy.',
            '**Political Cost:** LBJ famously remarked that in signing the 1964 Act, the Democratic Party had "lost the South for a generation".',
          ],
        },
        {
          title: '3. Voting Registration Transformation',
          points: [
            '**Mississippi Surge:** Black voter registration in Mississippi jumped from 6.7% in 1964 to 66.5% by 1968.',
            '**Black Elected Officials:** Enabled the election of hundreds of Black mayors, sheriffs, and state legislators across the South.',
            '**End of the White Primary:** Dismantled the institutional machinery that had enforced Jim Crow since Reconstruction.',
          ],
        },
        {
          title: '4. Persistent Economic Divide',
          points: [
            '**Limits of Law:** The 1964 and 1965 Acts solved legal (de jure) segregation, but did not address ghetto poverty, poor housing, or joblessness.',
            '**Northern Disillusionment:** Black residents in northern cities felt southern voting rights did nothing to solve police brutality and slum landlords.',
            "**Seeds of Black Power:** Young activists began turning away from King's focus on integration toward economic self-determination.",
          ],
        },
      ],
      vocabBank: [
        {
          term: 'Project C',
          def: 'The SCLC campaign of economic boycotts and mass demonstrations in Birmingham, Alabama (1963).',
        },
        {
          term: 'Eugene "Bull" Connor',
          def: 'Notorious Birmingham Police Commissioner whose brutal tactics were broadcast worldwide.',
        },
        {
          term: 'Civil Rights Act of 1964',
          def: 'Landmark federal law outlawing racial discrimination in public accommodations and employment.',
        },
        {
          term: 'Bloody Sunday (1965)',
          def: "Violent attack by Alabama state troopers on peaceful voting rights marchers at Selma's Edmund Pettus Bridge.",
        },
        {
          term: 'Voting Rights Act of 1965',
          def: 'Federal law outlawing literacy tests and sending federal registrars to register southern Black voters.',
        },
        {
          term: 'EEOC',
          def: 'Equal Employment Opportunity Commission; federal agency created in 1964 to investigate workplace bias.',
        },
      ],
      causalFactors: [
        '**1. Provoking White Extremism:** King strategically selected locations where white officials would violently overreact on camera.',
        '**2. Presidential Political Skill:** Lyndon B. Johnson exercised unprecedented executive pressure to crush the southern filibuster.',
        '**3. Federal Electoral Power:** The Voting Rights Act fundamentally restructured Southern politics by empowering millions of Black voters.',
      ],
      examinerTraps: [
        {
          trap: 'Attributing the passage of the 1964 Civil Rights Act entirely to John F. Kennedy.',
          correction:
            'Kennedy introduced the bill, but it was deadlocked in committee; Lyndon B. Johnson used his mastery of Congress to pass it.',
        },
        {
          trap: 'Confusing the Civil Rights Act of 1964 with the Voting Rights Act of 1965.',
          correction:
            'The 1964 Act targeted public accommodations and jobs; the 1965 Act specifically tackled voting disenfranchisement and literacy tests.',
        },
        {
          trap: 'Believing the Voting Rights Act ended all racial discrimination in America.',
          correction:
            'The Act secured access to the ballot box, but left northern urban poverty, housing segregation, and economic injustice unresolved.',
        },
      ],
    },
    right: {
      int1: {
        author:
          "Historian Clayborne Carson, 'In Struggle: SNCC and the Black Awakening of the 1960s' (1981)",
        text: '"The passage of the Civil Rights Act of 1964 and the Voting Rights Act of 1965 was fundamentally the accomplishment of the masses of ordinary Black people who put their bodies on the line in Birmingham and Selma. By willingly enduring police dogs, fire hoses, tear gas, and jail cells, grassroots activists created an intolerable moral and geopolitical crisis that no president could ignore. Washington did not act out of enlightened benevolence; the federal government was forced to intervene because courageous local people rendered the status quo completely unworkable."',
      },
      int2: {
        author: "Historian Mark Newman, 'The Civil Rights Movement' (2004)",
        text: '"While public demonstrations generated essential moral urgency, they would have achieved very little without the decisive, forceful intervention of President Lyndon B. Johnson. The American political system was deliberately designed to permit Southern senators to filibuster and kill progressive legislation indefinitely. It took Johnson\'s exceptional legislative arm-twisting, his ability to rally moderate Republicans, and his ruthless utilization of Kennedy\'s martyrdom to break the Southern blockade and enact transformative statutory law."',
      },
      q3b: {
        question:
          'Study Interpretations 1 and 2. They give different views about the main factor responsible for the passage of the landmark civil rights legislation of 1964 and 1965. What is the main difference between these views? Explain your answer, using details from both interpretations.',
        lines: 5,
      },
      q3c: {
        question:
          'Suggest one reason why Interpretations 1 and 2 give different views about the main factor responsible for the civil rights legislation. You may use information from your own knowledge to help explain your answer.',
        lines: 5,
      },
    },
  },

  // =========================================================================
  // SPREAD 7: KT 2.3 — THE BLACK POWER MOVEMENT
  // =========================================================================
  {
    id: 'lesson_2_3',
    topic: 'Key Topic 2 • Civil Rights 1960–1968',
    title:
      'KT 2.3: What was the Black Power movement, and how did it differ from non-violent protests?',
    examType: 'interpretation_eval',
    left: {
      tag: 'KT 2.3 • Deep Knowledge',
      headline: 'Black Power: Pride, Self-Defense & The Critique of Non-Violent Integration',
      summary:
        'Frustrated by the slow pace of change, unrelenting white violence, and persistent economic misery in northern urban ghettos, younger activists rejected King\'s non-violent integrationist philosophy. Inspired by Malcolm X, Stokely Carmichael popularized "Black Power" in 1966, while Huey Newton and Bobby Seale formed the Black Panther Party, championing armed self-defense, revolutionary socialism, and community survival programs.',
      pillars: [
        {
          title: 'Malcolm X & The Nation of Islam',
          subtitle: 'The Ideological Catalyst',
          bullets: [
            'Promoted Black nationalism, racial pride, and self-defense **"by any means necessary"**; rejected integration as subservience.',
            'Condemned King\'s non-violent philosophy as toothless: "There is no such thing as a non-violent revolution."',
            'Split from the Nation of Islam in 1964; shifted toward inclusive, international human rights before his assassination in February 1965.',
          ],
        },
        {
          title: 'Stokely Carmichael & SNCC',
          subtitle: 'The Birth of Black Power (1966)',
          bullets: [
            'During the 1966 **Meredith March Against Fear** in Mississippi, Carmichael chanted: **"We want Black Power!"**',
            'Moved SNCC away from non-violence and expelled white members, arguing Black Americans needed to lead their own liberation.',
            'Defined Black Power as political, economic, and psychological self-determination and the cultivation of African cultural pride.',
          ],
        },
        {
          title: 'The Black Panther Party (BPP)',
          subtitle: 'Huey Newton, Bobby Seale & The 10-Point Program',
          bullets: [
            'Formed in Oakland, California (1966); carried loaded firearms on public patrols to protect Black citizens from police brutality.',
            'Created community survival programs: **Free Breakfast for Children** (fed 20,000 daily), free health clinics, and sickle-cell testing.',
            "Targeted by FBI Director J. Edgar Hoover's covert **COINTELPRO** campaign, resulting in raids, arrests, and the killing of Fred Hampton.",
          ],
        },
      ],
      deepKnowledgeGrid: [
        {
          title: '1. 1968 Mexico City Olympics',
          points: [
            '**Tommie Smith & John Carlos:** Raised black-gloved fists on the medal podium during the US national anthem; wore black socks representing Black poverty.',
            '**Global Impact:** Broadcast the Black Power salute to a worldwide television audience of hundreds of millions.',
            '**Retribution:** Both athletes were immediately stripped of their medals, expelled from the Olympic Village, and faced death threats.',
          ],
        },
        {
          title: '2. Cultural & Psychological Pride',
          points: [
            '**"Black is Beautiful":** Encouraged African-Americans to embrace their heritage, wear afro hairstyles, and study Black history in universities.',
            '**Swahili & African Attire:** Replaced European cultural standards with African dashikis and cultural revivalism.',
            '**Psychological Liberation:** Broke the internalized feeling of racial inferiority ingrained by centuries of slavery and segregation.',
          ],
        },
        {
          title: "3. The FBI's COINTELPRO War",
          points: [
            '**Hoover\'s Objective:** Hoover declared the Black Panthers the "greatest threat to internal security", ordering agents to "disrupt and neutralize".',
            '**Infiltration & Disinformation:** Planted fake letters to spark armed feuds between the Panthers and rival Black nationalist groups.',
            '**Assassination of Fred Hampton:** Chicago police and FBI raided the apartment of 21-year-old Illinois Panther leader Fred Hampton, shooting him in bed.',
          ],
        },
        {
          title: '4. White Backlash & Polarization',
          points: [
            '**Alienating White Liberals:** Militant rhetoric, black leather jackets, and weapons terrified white suburban voters and damaged fundraising.',
            '**Nixon\'s "Law and Order":** Richard Nixon leveraged white fears of Black militancy to win the 1968 presidential election.',
            '**Splits in Civil Rights:** Deepened divisions between moderate organizations (NAACP, SCLC) and radical youth bodies (SNCC, BPP).',
          ],
        },
      ],
      vocabBank: [
        {
          term: 'Black Power',
          def: 'Movement emphasizing Black pride, economic self-reliance, and independent political empowerment.',
        },
        {
          term: 'Malcolm X',
          def: 'Charismatic Black nationalist orator whose ideas on self-defense and Black pride inspired the movement.',
        },
        {
          term: 'Stokely Carmichael',
          def: 'SNCC leader who popularized the slogan "Black Power" during the 1966 Meredith March.',
        },
        {
          term: 'Black Panther Party',
          def: 'Militant socialist organization founded in 1966 advocating armed self-defense and community social programs.',
        },
        {
          term: 'Ten-Point Program',
          def: 'The founding manifesto of the Black Panthers demanding employment, decent housing, education, and justice.',
        },
        {
          term: 'COINTELPRO',
          def: 'Covert FBI counter-intelligence program designed to infiltrate, discredit, and destroy radical Black groups.',
        },
      ],
      causalFactors: [
        '**1. Disillusionment with Non-Violence:** Activists were frustrated by repeated beatings, lynchings, and the lack of economic progress in the North.',
        '**2. Police Brutality:** The Black Panthers arose directly to monitor systemic police violence against Black youth in urban ghettos.',
        '**3. Psychological Empowerment:** Black Power provided a powerful antidote to white beauty standards and cultural erasure.',
      ],
      examinerTraps: [
        {
          trap: 'Viewing the Black Panthers solely as violent street thugs with guns.',
          correction:
            'The Panthers were deeply committed to social welfare, running free breakfast programs for 20,000 children, free health clinics, and literacy classes.',
        },
        {
          trap: 'Assuming Malcolm X and Martin Luther King Jr. remained bitter lifelong enemies.',
          correction:
            'Toward the end of their lives, their philosophies converged: Malcolm adopted pan-African human rights, while King embraced radical economic redistribution.',
        },
        {
          trap: 'Thinking Black Power was a cohesive, unified political party.',
          correction:
            'Black Power was a broad, diverse umbrella encompassing cultural nationalists, revolutionary Marxists, and electoral politicians who often feuded.',
        },
      ],
    },
    right: {
      essay: {
        title: 'Question 3(d): Evaluative Essay [16 Marks + 4 SPaG = 20 Marks]',
        int1: {
          author: "Historian Peniel Joseph, 'Waiting 'Til the Midnight Hour' (2006)",
          text: '"The Black Power movement fundamentally transformed American democracy by expanding the civil rights struggle from southern desegregation to nationwide economic justice, cultural pride, and community control. The Black Panthers\' community survival programs, free medical clinics, and emphasis on Black dignity inspired an enduring cultural renaissance. Far from merely dividing the movement, Black Power addressed the deep structural misery of urban ghettos that King\'s non-violent appeals to white Christian conscience had failed to touch."',
        },
        int2: {
          author: "Historian Manning Marable, 'Race, Reform, and Rebellion' (1991)",
          text: '"Despite its electrifying rhetoric and genuine cultural appeal, Black Power ultimately caused catastrophic damage to the political struggle for racial equality. By adopting militant posturing and carrying firearms, leaders like Stokely Carmichael and the Black Panthers alienated essential white liberal allies, fractured the broad civil rights coalition, and handed reactionary politicians like Richard Nixon the perfect \'law and order\' pretext to unleash ruthless federal police repression that destroyed radical organizations."',
        },
        question:
          'How far do you agree with Interpretation 2 about the impact of the Black Power movement on the civil rights struggle?',
        targetInt: 'Interpretation 2',
        planningGuide:
          "Intro: State clear criteria for impact &rarr; Section 1: Support Int 2 (alienation of white allies, fragmentation of movement, Nixon's backlash, FBI repression) &rarr; Section 2: Evaluate Int 1 (cultural pride, free breakfast programs, urban ghetto focus) &rarr; Conclusion: Deliver a justified, criteria-driven verdict on Interpretation 2.",
        lines: 38,
      },
    },
  },

  // =========================================================================
  // SPREAD 8: KT 2.4 — URBAN RIOTS & KERNER COMMISSION
  // =========================================================================
  {
    id: 'lesson_2_4',
    topic: 'Key Topic 2 • Civil Rights 1960–1968',
    title: 'KT 2.4: Why did riots break out in American cities between 1965 and 1968?',
    examType: 'source_utility',
    left: {
      tag: 'KT 2.4 • Deep Knowledge',
      headline: "The Long Hot Summers: Ghetto Rage, The Kerner Commission & King's Death",
      summary:
        'Between 1965 and 1968, over 300 riots erupted across American cities, shattering the illusion that racial inequality was purely a southern issue. Sparked by routine police confrontations in impoverished northern and western ghettos, explosions in Watts (1965), Newark (1967), and Detroit (1967) prompted the landmark Kerner Commission Report, which warned that the nation was dividing into "two societies, one black, one white—separate and unequal."',
      pillars: [
        {
          title: 'The Watts Riot (August 1965)',
          subtitle: 'The Explosion of Northern Ghetto Anger',
          bullets: [
            'Erupted five days after the Voting Rights Act was signed; sparked by the violent arrest of Black driver Marquette Frye by California highway patrolmen.',
            'Lasted 6 days in Los Angeles; 14,000 National Guard deployed; 34 deaths, over 1,000 injuries, and $40 million in property damage.',
            'Revealed that southern voting rights meant nothing to northern Black families trapped in poverty, joblessness, and police brutality.',
          ],
        },
        {
          title: 'Detroit & Newark Riots (1967)',
          subtitle: 'The Deadliest "Long Hot Summer"',
          bullets: [
            'In July 1967, Newark erupted (26 dead); followed by **Detroit** where a police raid on an unlicensed drinking club sparked 5 days of civil warfare.',
            'President Johnson deployed the **82nd and 101st Airborne Divisions** and tanks to retake Detroit streets; 43 dead, 7,000 arrested.',
            "Over 2,000 buildings burned to the ground, cementing white flight to the suburbs and gutting the city's tax base.",
          ],
        },
        {
          title: 'The Kerner Commission (1968)',
          subtitle: 'Indictment of White Racism & Segregation',
          bullets: [
            'Appointed by LBJ to investigate causes; concluded: **"Our nation is moving toward two societies, one black, one white—separate and unequal."**',
            'Explicitly identified **white institutional racism**, ghetto poverty, poor schools, and police harassment as primary causes.',
            'Recommended massive federal investment in housing, jobs, and welfare; LBJ, absorbed in Vietnam War spending, shelved the report.',
          ],
        },
      ],
      deepKnowledgeGrid: [
        {
          title: "1. King's Chicago Campaign (1966)",
          points: [
            '**Confronting the North:** King moved into a Chicago slum to campaign against housing discrimination and slum landlords.',
            '**Fierce White Backlash:** Marched in white suburbs (Marquette Park); hit in the head with a brick: "I have never seen mobs as hostile and hate-filled as in Chicago."',
            '**Political Failure:** Mayor Richard Daley agreed to cosmetic concessions, demonstrating northern de facto racism was harder to tackle than southern Jim Crow.',
          ],
        },
        {
          title: '2. The Spark vs Underlying Cause',
          points: [
            '**The Trigger:** Almost every major riot was triggered by an aggressive police arrest of a Black suspect by white police officers.',
            '**Underlying Fuel:** Decades of unaddressed unemployment, inferior schools, overcrowded tenements, and systemic police misconduct.',
            '**Looting as Redistribution:** Rioters targeted white-owned grocery stores and pawnshops that charged extortionate credit rates in ghettos.',
          ],
        },
        {
          title: '3. Assassination of MLK (1968)',
          points: [
            '**April 4, 1968:** Dr King shot dead on the balcony of the Lorraine Motel in Memphis, Tennessee, by James Earl Ray.',
            '**Nationwide Uprising:** Sparked riots in over 100 cities; federal troops surrounded the White House with machine gun nests.',
            '**End of the Golden Era:** Shattered the mainstream faith in non-violent direct action and marked the end of the classical civil rights movement.',
          ],
        },
        {
          title: '4. Civil Rights Act of 1968',
          points: [
            "**Fair Housing Act:** Passed in the immediate wake of King's assassination; banned racial discrimination in the sale or rental of housing.",
            '**Enforcement Weakness:** Lacked strong federal enforcement mechanisms, allowing real estate agents to continue stealth redlining.',
            '**Rise of Law and Order Politics:** The urban riots generated immense white suburban resentment, powering Richard Nixon to the presidency.',
          ],
        },
      ],
      vocabBank: [
        {
          term: 'Watts Riot (1965)',
          def: 'Massive six-day urban rebellion in Los Angeles resulting in 34 deaths and military occupation.',
        },
        {
          term: 'Long Hot Summer',
          def: 'Phrase referring to the epidemic of urban uprisings across American cities between 1965 and 1967.',
        },
        {
          term: 'Detroit Riot (1967)',
          def: 'Violent five-day uprising in Detroit resulting in 43 deaths and federal paratrooper deployment.',
        },
        {
          term: 'Kerner Commission',
          def: 'Presidential commission that blamed urban riots on white racism, poverty, and police brutality.',
        },
        {
          term: 'White Flight',
          def: 'Mass migration of middle-class white families from racially diverse city centres to segregated suburbs.',
        },
        {
          term: 'Fair Housing Act (1968)',
          def: "Federal law passed after King's death banning racial discrimination in the sale or rental of housing.",
        },
      ],
      causalFactors: [
        '**1. Systematic Economic Deprivation:** Deindustrialization, poor schools, and discriminatory bank lending trapped Black urban families in ghettos.',
        '**2. Police as an Occupying Army:** White police forces treated Black neighbourhoods with open contempt, harassment, and brutality.',
        '**3. Federal Neglect:** Great Society funding was cannibalized by the spiraling economic cost of the Vietnam War ($30 billion per year).',
      ],
      examinerTraps: [
        {
          trap: 'Believing urban riots were organized and led by Martin Luther King or the SCLC.',
          correction:
            'King opposed the riots; they were spontaneous explosions of fury against ghetto conditions and police brutality.',
        },
        {
          trap: 'Assuming the Kerner Commission blamed Black militants for inciting the riots.',
          correction:
            'The Kerner Report explicitly concluded that white institutional racism, poverty, and police misconduct were the primary drivers.',
        },
        {
          trap: 'Thinking the Fair Housing Act of 1968 instantly eliminated residential segregation.',
          correction:
            'The Act prohibited overt discrimination, but redlining and discriminatory mortgage practices perpetuated segregation for decades.',
        },
      ],
    },
    right: {
      q3a: {
        enquiry: 'the causes of urban riots in American cities between 1965 and 1968',
        sourceB: {
          title: 'Source B: Photograph of burned-out ruins in Detroit following the July 1967 riot',
          image: 'images/detroit_riot_guard_1967.jpg',
          caption:
            'Contemporary photograph showing destroyed brick buildings, chimneys, and gutted storefronts in Detroit after 5 days of civil unrest.',
        },
        sourceC: {
          title:
            'Source C: From the Report of the National Advisory Commission on Civil Disorders (Kerner Commission), March 1968',
          text: '"The urban disorders were not caused by any single factor, but by a complex mixture of racial discrimination and economic despair. Segregation and poverty have created in the racial ghetto a destructive environment totally unknown to most white Americans. What white Americans have never fully understood—but what the Negro can never forget—is that white society is deeply implicated in the ghetto. White institutions created it, white institutions maintain it, and white society condones it. Furthermore, almost every riot was preceded by a specific incident involving aggressive police misconduct that served as the final spark in a dry forest."',
          provenance:
            'Official bipartisan report commissioned by President Lyndon B. Johnson, published in March 1968.',
        },
        provenanceClue:
          'Evaluate how Source B provides physical evidence of the sheer scale of destructive rage and destruction in Detroit, and assess the official authority of the Kerner Commission in Source C diagnosing deep systemic white institutional racism.',
        lines: 28,
      },
    },
  },

  // =========================================================================
  // KEY TOPIC 3: US INVOLVEMENT IN VIETNAM, 1954–75 (ESCALATION & TACTICS)
  // =========================================================================
  {
    id: 'lesson_3_1',
    topic: 'Key Topic 3 • US Involvement in Vietnam 1954–1975',
    title: 'KT 3.1: Why did the US support Ngo Dinh Diem in South Vietnam (1954–63)?',
    examType: 'inference_causation',
    left: {
      tag: 'KT 3.1 • Deep Knowledge',
      headline: 'The Cold War Quagmire: Domino Theory, Ngo Dinh Diem & The Buddhist Crisis',
      summary:
        'Following the catastrophic French defeat at Dien Bien Phu and the 1954 Geneva Accords dividing Vietnam at the 17th Parallel, the United States viewed Southeast Asia through the rigid lens of the Cold War. Driven by Eisenhower\'s "Domino Theory", Washington backed the autocratic, Catholic regime of Ngo Dinh Diem in South Vietnam, cancelling scheduled democratic elections and provoking the rise of the Vietcong guerrilla movement.',
      pillars: [
        {
          title: 'Dien Bien Phu & Geneva (1954)',
          subtitle: 'The Collapse of French Colonial Rule',
          bullets: [
            "General Giap's Vietminh besieged and defeated the French garrison at **Dien Bien Phu** in May 1954, ending colonial rule.",
            'The **Geneva Accords** temporarily divided Vietnam at the 17th Parallel into communist North (Ho Chi Minh) and non-communist South.',
            'Stipulated nationwide democratic elections to reunify Vietnam by July 1956; the US and South Vietnam refused to sign.',
          ],
        },
        {
          title: 'The Domino Theory & Diem',
          subtitle: "Washington's Flawed Puppet Regime",
          bullets: [
            'President **Eisenhower** articulated the **Domino Theory**: if South Vietnam fell to communism, Laos, Cambodia, Thailand, and Burma would follow.',
            'US installed **Ngo Dinh Diem**, an anti-communist Catholic; funneled billions in aid and military advisers to create the ARVN.',
            'Diem cancelled the 1956 elections, knowing Ho Chi Minh would win overwhelmingly (an estimated 80% of the popular vote).',
          ],
        },
        {
          title: 'Strategic Hamlets & Buddhist Crisis',
          subtitle: 'The Downfall of Diem (1962–63)',
          bullets: [
            '**Strategic Hamlet Program (1962):** Forcibly relocated peasants into fortified villages to isolate them from Vietcong; deeply alienated villagers.',
            "Diem's Catholic government violently repressed the Buddhist majority; banned Buddhist flags during the Buddha's birthday celebrations in 1963.",
            'Monk **Thich Quang Duc** publicly burned himself to death in Saigon; Kennedy realized Diem was an incurable liability; Diem overthrown and executed in a CIA-backed coup (Nov 1963).',
          ],
        },
      ],
      deepKnowledgeGrid: [
        {
          title: '1. Creation of the Vietcong (1960)',
          points: [
            '**National Liberation Front (NLF):** Formed in December 1960; brought together communist cadres and southern nationalists resisting Diem.',
            '**US Terminology:** The Americans labeled them the **Vietcong** (short for Vietnamese Communists).',
            '**Peasant Support:** The Vietcong gained immense rural loyalty by redistributing land from wealthy landlords to poor peasants.',
          ],
        },
        {
          title: "2. Diem's Nepotism & Corruption",
          points: [
            '**Family Rule:** Diem ruled through his brother Ngo Dinh Nhu (head of the secret police) and sister-in-law Madame Nhu.',
            '**Anti-Buddhist Oppression:** Over 70% of South Vietnamese were Buddhist, yet Diem gave top military and government posts exclusively to the Catholic minority.',
            '**Madame Nhu\'s Cruelty:** Dismissed self-immolations as "barbecue shows", further disgusting American and world opinion.',
          ],
        },
        {
          title: "3. Kennedy's Escalation (1961–63)",
          points: [
            '**Green Berets:** Kennedy expanded military involvement, deploying Special Forces to train ARVN troops.',
            '**Adviser Surge:** Increased US military advisers from 900 in 1961 to over 16,000 by late 1963.',
            '**Operation Ranch Hand Begins:** Authorized the initial chemical defoliation experiments in 1961 to strip jungle cover.',
          ],
        },
        {
          title: '4. The Coup of November 1963',
          points: [
            '**US Green Light:** US Ambassador Henry Cabot Lodge signaled that Washington would not oppose a military coup against Diem.',
            '**Assassination:** On November 2, 1963, ARVN generals captured and murdered Diem and his brother in an armoured car.',
            "**Political Instability:** Diem's death triggered a merry-go-round of military juntas; South Vietnam had 10 different governments in 18 months.",
          ],
        },
      ],
      vocabBank: [
        {
          term: 'Dien Bien Phu (1954)',
          def: 'Decisive battle where communist Vietminh defeated French colonial forces, ending French rule.',
        },
        {
          term: 'Geneva Accords (1954)',
          def: 'International agreement dividing Vietnam at the 17th Parallel and scheduling 1956 elections.',
        },
        {
          term: 'Domino Theory',
          def: 'Cold War belief that if one country fell to communism, neighbouring nations would fall like dominoes.',
        },
        {
          term: 'Ngo Dinh Diem',
          def: 'Corrupt, autocratic Catholic leader of South Vietnam backed by the US until his assassination in 1963.',
        },
        {
          term: 'National Liberation Front (NLF)',
          def: "Communist-led political organization fighting Diem's government, known in the West as the Vietcong.",
        },
        {
          term: 'Strategic Hamlet Program',
          def: 'Unpopular plan forcibly relocating Vietnamese peasants into fortified villages to isolate guerrillas.',
        },
      ],
      causalFactors: [
        '**1. Cold War Containment Mindset:** US policymakers viewed Vietnamese anti-colonial nationalism entirely as Soviet/Chinese communist expansionism.',
        "**2. Diem's Flawed Governance:** Extreme Catholic favouritism, corruption, and brutality drove ordinary peasants directly into the arms of the Vietcong.",
        '**3. The Trap of Escalation:** Refusing to allow democratic elections in 1956 locked the US into defending an illegitimate, unpopular regime.',
      ],
      examinerTraps: [
        {
          trap: 'Believing the Vietnam War began with combat troop deployment in 1965.',
          correction:
            'The US had been heavily financing French forces since 1950 and had over 16,000 military advisers deployed by 1963.',
        },
        {
          trap: 'Assuming Ngo Dinh Diem was a popular, democratic leader.',
          correction:
            'Diem was an authoritarian autocrat who rigged elections, imprisoned political critics, and brutally persecuted the Buddhist majority.',
        },
        {
          trap: 'Confusing the Vietminh with the Vietcong.',
          correction:
            'The Vietminh fought French colonialists (1946–54); the Vietcong (NLF) fought Diem, the ARVN, and American troops (1960–75).',
        },
      ],
    },
    right: {
      q1: {
        title: 'Question 1: Source Inference [4 Marks]',
        sourceTitle: 'Source A: ARVN forces raiding a Buddhist Pagoda in Saigon, August 1963',
        sourceImage: 'units/usa/assets/sources/buddhist-protests-1963.jpg',
        sourceCaption:
          'Contemporary photograph showing South Vietnamese combat troops firing tear gas and raiding Buddhist monks at the Xa Loi Pagoda.',
        question:
          "Give two things you can infer from Source A about the unpopularity and instability of Ngo Dinh Diem's government in 1963.",
      },
      q2: {
        title: 'Question 2: Causation Essay [12 Marks]',
        question:
          'Explain why the United States became increasingly involved in South Vietnam between 1954 and 1963.',
        stimulus: ["Eisenhower's Domino Theory", "Weakness of Ngo Dinh Diem's regime"],
        spanNote: '1954–1963',
        lines: 24,
      },
    },
  },

  // =========================================================================
  // SPREAD 10: KT 3.2 — GULF OF TONKIN & ESCALATION
  // =========================================================================
  {
    id: 'lesson_3_2',
    topic: 'Key Topic 3 • US Involvement in Vietnam 1954–1975',
    title: 'KT 3.2: Why did the US send combat troops to Vietnam after the Gulf of Tonkin?',
    examType: 'source_utility',
    left: {
      tag: 'KT 3.2 • Deep Knowledge',
      headline: 'Crossing the Rubicon: The Tonkin Resolution, Rolling Thunder & Ground Troops',
      summary:
        'Following the disputed Gulf of Tonkin Incident in August 1964, President Lyndon B. Johnson secured near-unanimous congressional approval for the Gulf of Tonkin Resolution, granting him blank-check authority to conduct open war. When Vietcong attacks threatened US bases in early 1965, Johnson launched the sustained aerial bombing of North Vietnam (Operation Rolling Thunder) and deployed the first US ground combat troops to Da Nang.',
      pillars: [
        {
          title: 'Gulf of Tonkin Incident (1964)',
          subtitle: 'The Disputed Casus Belli',
          bullets: [
            'On August 2, 1964, the destroyer **USS Maddox** engaged North Vietnamese torpedo boats in the Gulf of Tonkin while supporting covert South Vietnamese commando raids (OPLAN 34A).',
            'A second alleged attack on August 4 in heavy weather likely never occurred due to faulty radar and nervous sonar operators.',
            'Johnson misled Congress, concealing that US ships were engaged in covert intelligence operations inside North Vietnamese waters.',
          ],
        },
        {
          title: 'The Gulf of Tonkin Resolution',
          subtitle: 'The Congressional "Blank Check"',
          bullets: [
            'Passed on August 7, 1964; authorized the President to take **"all necessary measures to repel any armed attack"** without declaring war.',
            'Passed the House 416–0 and Senate 88–2; effectively transferred constitutional war-making powers from Congress to the President.',
            'Johnson kept the draft resolution in his pocket for months, waiting for an incident to present to Congress during his 1964 re-election campaign.',
          ],
        },
        {
          title: 'Operation Rolling Thunder & Da Nang',
          subtitle: 'The Shift to Direct Combat (1965)',
          bullets: [
            'In February 1965, Vietcong attacked a US air base at Pleiku, killing 8 soldiers; Johnson launched **Operation Rolling Thunder**.',
            'Rolling Thunder was a three-year continuous bombing campaign dropping 864,000 tons of bombs on North Vietnam to sever the Ho Chi Minh Trail.',
            'To protect air bases from Vietcong mortars, General **William Westmoreland** requested combat troops; on March 8, 1965, 3,500 US Marines landed at **Da Nang**.',
          ],
        },
      ],
      deepKnowledgeGrid: [
        {
          title: '1. The Logic of Escalation',
          points: [
            '**Adviser Ineffectiveness:** ARVN forces suffered catastrophic defeats in early 1965; Johnson believed South Vietnam would collapse within months without direct US troops.',
            '**American Credibility:** Secretary of Defense Robert McNamara argued that abandoning South Vietnam would destroy American credibility with Cold War allies.',
            '**Troop Numbers Explode:** From 3,500 Marines in March 1965 to 184,000 by late 1965, reaching a peak of 536,000 soldiers by late 1968.',
          ],
        },
        {
          title: '2. Limits of Strategic Bombing',
          points: [
            '**Agrarian Target:** North Vietnam had few industrial factories; bombs struck jungle roads, rice paddies, and bridges quickly repaired by peasants.',
            '**Soviet & Chinese Aid:** Moscow and Beijing supplied North Vietnam with advanced radar, anti-aircraft guns, and SAM missile networks.',
            '**Hardened Resolve:** Rather than breaking morale, American bombing unified the North Vietnamese population in patriotic resistance.',
          ],
        },
        {
          title: '3. The Political Context of 1964',
          points: [
            '**Goldwater\'s Challenge:** Republican presidential candidate Barry Goldwater accused Johnson of being "soft on communism".',
            '**Domestic Reform Protection:** Johnson wanted to protect his beloved "Great Society" welfare programs from conservative attacks.',
            '**Campaign Deception:** Johnson ran as the peace candidate in 1964, proclaiming: "We are not about to send American boys to do what Asian boys ought to be doing for themselves."',
          ],
        },
        {
          title: "4. General Westmoreland's Strategy",
          points: [
            '**War of Attrition:** Westmoreland planned to kill enemy fighters faster than North Vietnam could replace them (the "crossover point").',
            '**Body Count Metric:** Progress was measured not by taking and holding ground, but by weekly body counts of dead enemy combatants.',
            '**Fatal Flaw:** North Vietnam had 200,000 young men reach draft age each year; Ho Chi Minh was prepared to lose ten men for every one American killed.',
          ],
        },
      ],
      vocabBank: [
        {
          term: 'USS Maddox',
          def: 'US destroyer involved in the August 1964 Gulf of Tonkin naval clash that triggered direct US military intervention.',
        },
        {
          term: 'Gulf of Tonkin Resolution',
          def: '1964 congressional act granting President Johnson executive power to conduct military operations in Vietnam.',
        },
        {
          term: 'Operation Rolling Thunder',
          def: 'Sustained US aerial bombing campaign against North Vietnam from March 1965 to November 1968.',
        },
        {
          term: 'General William Westmoreland',
          def: 'Commander of US Military Assistance Command Vietnam (MACV) from 1964 to 1968.',
        },
        {
          term: 'Da Nang (1965)',
          def: 'Site of the first landing of US ground combat troops (3,500 Marines) in South Vietnam on March 8, 1965.',
        },
        {
          term: 'War of Attrition',
          def: 'Military strategy seeking to exhaust the enemy through relentless destruction of personnel and material.',
        },
      ],
      causalFactors: [
        '**1. Presidential Misrepresentation:** Johnson used the murky August 4 incident to secure congressional authority he had prepared months earlier.',
        '**2. The Imminent Collapse of ARVN:** Military intelligence indicated South Vietnam would fall to the NLF by late 1965 without direct combat intervention.',
        '**3. The Trap of Protecting Bases:** Once air bases were constructed, infantry was required to defend perimeters, quickly expanding into search-and-destroy sweeps.',
      ],
      examinerTraps: [
        {
          trap: 'Believing the Gulf of Tonkin incident was an unprovoked surprise attack on a peaceful US patrol.',
          correction:
            'The USS Maddox was carrying out secret electronic espionage in coordination with South Vietnamese commando raids on North Vietnamese islands.',
        },
        {
          trap: 'Assuming Congress formally declared war on North Vietnam.',
          correction:
            'Congress never officially declared war; the entire Vietnam War was fought under executive authority granted by the Gulf of Tonkin Resolution.',
        },
        {
          trap: "Thinking Operation Rolling Thunder crushed North Vietnam's military capacity.",
          correction:
            'North Vietnam was an agrarian economy with few industrial targets; supplies continued flowing south down the Ho Chi Minh Trail.',
        },
      ],
    },
    right: {
      q3a: {
        enquiry: 'the reasons for the deployment of US combat troops to Vietnam in 1965',
        sourceB: {
          title:
            'Source B: US Navy tactical battle map of the Gulf of Tonkin action, August 4, 1964',
          image: 'units/usa/assets/sources/uss-maddox.jpg',
          caption:
            'Declassified tactical tracking chart showing the reported movement and disputed torpedo boat engagements of the USS Maddox and USS Turner Joy.',
        },
        sourceC: {
          title:
            "Source C: From President Lyndon B. Johnson's televised address to Congress, August 5, 1964",
          text: '"The North Vietnamese regime has repeatedly conducted deliberate, unprovoked armed aggression against United States naval vessels on the high seas. These acts of open violence against our flag cannot be tolerated. The issue is whether we shall permit aggression to succeed. We seek no wider war, but our response must be firm and decisive. I ask Congress to pass a resolution making it clear that our nation is united in its determination that all necessary measures be taken to defend our forces and preserve freedom throughout Southeast Asia."',
          provenance:
            'Official address broadcast live on national television by the President of the United States.',
        },
        provenanceClue:
          'Weigh the technical tactical plotting in Source B reflecting the military friction in the Tonkin waters against President Johnson’s political rhetoric in Source C rallying congressional consensus for unchecked executive war powers.',
        lines: 28,
      },
    },
  },

  // =========================================================================
  // SPREAD 11: KT 3.3 — MILITARY TACTICS (SEARCH & DESTROY VS GUERRILLA)
  // =========================================================================
  {
    id: 'lesson_3_3',
    topic: 'Key Topic 3 • US Involvement in Vietnam 1954–1975',
    title: 'KT 3.3: Why did US military tactics fail to defeat the Vietcong?',
    examType: 'interpretation_diff_why',
    left: {
      tag: 'KT 3.3 • Deep Knowledge',
      headline: 'Asymmetric Attrition: High-Tech Firepower vs Guerrilla Survival',
      summary:
        'The Vietnam War was an asymmetric clash between the most technologically advanced military in history and a resilient peasant guerrilla force. While the US relied on massive firepower, helicopter airmobility, chemical defoliation, and search-and-destroy missions measured by body count, the Vietcong countered with underground tunnel networks, booby traps, close-quarters combat, and unshakeable ideological commitment.',
      pillars: [
        {
          title: 'Vietcong Guerrilla Tactics',
          subtitle: 'The Art of Asymmetric Survival',
          bullets: [
            '**"Hanging onto the belts"** of American soldiers: fought at ultra-close quarters (under 30 yards) to prevent US artillery and airstrikes.',
            'Operated without uniforms, blending seamlessly into local civilian populations; operated primarily at night.',
            'Constructed complex booby traps: punji stakes smeared with feces, tripwire grenades, and bouncing betty landmines; caused 11% of US deaths and 17% of wounds.',
          ],
        },
        {
          title: 'Cu Chi Tunnels & Ho Chi Minh Trail',
          subtitle: 'Subterranean Logistics & Supply',
          bullets: [
            'Over 200 miles of multi-level tunnels around Saigon (**Cu Chi**); contained hospitals, sleeping quarters, weapons workshops, and command posts.',
            'The **Ho Chi Minh Trail**: an intricate 1,000-mile network of paths through Laos and Cambodia used by 40,000 porters to supply 60 tons of supplies daily.',
            'US bombed the trail continuously, but North Vietnamese labourers and female volunteer battalions repaired damaged tracks within hours.',
          ],
        },
        {
          title: 'US Tactics: Search & Destroy',
          subtitle: 'Heliborne Firepower & Chemical Defoliation',
          bullets: [
            'Troops inserted by **UH-1 Huey helicopters** into jungle clearings to locate and kill enemy units (**Search and Destroy**); "Zippo raids" burned peasant villages.',
            'Chemical warfare: sprayed 20 million gallons of **Agent Orange** (toxic defoliant) and **Napalm** (jellied petroleum) to destroy jungle canopies and food crops.',
            'Massive civilian casualties and village destruction completely alienated the rural population, making "winning hearts and minds" impossible.',
          ],
        },
      ],
      deepKnowledgeGrid: [
        {
          title: '1. The Failure of Body Count',
          points: [
            '**Inflated Reporting:** US officers faced intense pressure from Westmoreland to report high kills, leading to routine overcounting.',
            '**Civilian Classification:** Unarmed peasant farmers killed in free-fire zones were routinely tallied as dead Vietcong: "If it\'s dead and Vietnamese, it\'s VC."',
            '**Strategic Bankruptcy:** High body counts failed to destroy enemy resolve; the North Vietnamese simply replaced fallen fighters.',
          ],
        },
        {
          title: '2. Morale Decay & "Fragging"',
          points: [
            '**One-Year Tour (DEROS):** Soldiers served 12 months, meaning units never maintained experienced combat cohesion; green troops made fatal errors.',
            '**Drug Abuse:** Cheap heroin and marijuana were rampant; by 1971, an estimated 15% of US servicemen were addicted to heroin.',
            '**Fragging:** Murdering or attempting to murder aggressive officers with fragmentation grenades; over 800 recorded incidents between 1969 and 1972.',
          ],
        },
        {
          title: '3. Airmobility & The Huey',
          points: [
            '**Tactical Flexibility:** Bell UH-1 Huey helicopters transformed warfare, functioning as troop transports, gunships, and medevac lifelines.',
            '**Medevac Miracle:** Wounded soldiers reached field hospitals within an hour, cutting battlefield mortality rates dramatically.',
            '**No Ground Retained:** Helicopters dropped troops into battles, but units withdrew at night, leaving the jungle to the Vietcong.',
          ],
        },
        {
          title: '4. Environmental & Human Devastation',
          points: [
            '**Dioxin Poisoning:** Agent Orange contained lethal dioxin, causing horrific cancers, birth defects, and miscarriages for generations.',
            '**Unexploded Ordnance:** Millions of cluster bomblets and landmines remained in Vietnamese soil, killing thousands of farmers after 1975.',
            '**Napalm Burns:** Inflicted agonizing third-degree chemical burns that destroyed skin tissue and caused asphyxiation.',
          ],
        },
      ],
      vocabBank: [
        {
          term: 'Search and Destroy',
          def: 'US military tactic inserting infantry into jungle sectors to find, kill, and withdraw from enemy units.',
        },
        {
          term: 'Guerrilla Warfare',
          def: 'Irregular warfare involving ambushes, sabotage, booby traps, and hit-and-run mobility.',
        },
        {
          term: 'Cu Chi Tunnels',
          def: 'Vast underground labyrinth used by the Vietcong for living quarters, hospitals, and staging surprise raids.',
        },
        {
          term: 'Ho Chi Minh Trail',
          def: 'Jungle logistics route running through Laos and Cambodia supplying communist forces in the South.',
        },
        {
          term: 'Agent Orange',
          def: 'Highly toxic chemical herbicide sprayed by US aircraft to strip forest foliage and expose enemy supply lines.',
        },
        {
          term: 'Fragging',
          def: 'The deliberate assassination of unpopular or overzealous US commanding officers by their own enlisted men.',
        },
      ],
      causalFactors: [
        '**1. Asymmetric Motivation:** Vietcong fighters were fighting a total war for national survival and reunification; US draftees were fighting to survive a 1-year tour.',
        '**2. Inappropriate Heavy Weaponry:** Massive artillery, B-52 carpet bombing, and defoliants devastated the civilian countryside, driving peasants to support the NLF.',
        "**3. Subterranean Sanctuary:** The Vietcong's tunnel systems and cross-border sanctuaries in Laos and Cambodia neutralized American technological superiority.",
      ],
      examinerTraps: [
        {
          trap: 'Believing the US military lost major pitched set-piece battles against the Vietcong.',
          correction:
            'The US military won virtually every conventional, set-piece tactical engagement; they lost because tactical victories could not break enemy resolve.',
        },
        {
          trap: 'Assuming search-and-destroy missions achieved their objective of pacification.',
          correction:
            'Search-and-destroy alienated the local population; burning hooches and destroying rice stores created thousands of new Vietcong recruits.',
        },
        {
          trap: 'Thinking Vietcong tunnels were simple dugouts in the mud.',
          correction:
            'Tunnels were sophisticated engineering complexes across multiple levels, featuring trapdoors, hospitals, kitchens, and blast baffles against gas.',
        },
      ],
    },
    right: {
      int1: {
        author:
          "Historian Christian G. Appy, 'Working-Class War: American Combat Soldiers and Vietnam' (1993)",
        text: '"American military tactics failed because heavy conventional firepower was fundamentally counterproductive in an asymmetric guerrilla war. General Westmoreland\'s reliance on massive B-52 carpet bombing, toxic defoliants like Agent Orange, and aggressive search-and-destroy missions devastated the civilian countryside. By burning peasant villages with Zippo lighters and killing innocent farmers to inflate the body count, US forces alienated the very rural population they were sent to protect, actively driving thousands of recruits into the Vietcong."',
      },
      int2: {
        author: "Historian Mark Moyar, 'Triumph Forsaken: The Vietnam War, 1954–1965' (2006)",
        text: '"The failure of US tactics was primarily caused by the extraordinary resilience, subterranean ingenuity, and logistical tenacity of the communist forces. Through the vast Cu Chi tunnel complexes, invisible booby traps, and the endless supplies flowing down the Ho Chi Minh Trail, the Vietcong successfully neutralized American technological and air superiority. Commanded by dedicated cadres and shielded by neutral sanctuaries in Laos and Cambodia, the guerrillas dictated the terms of combat, fighting only when they possessed the advantage."',
      },
      q3b: {
        question:
          'Study Interpretations 1 and 2. They give different views about the main reason why US military tactics failed to defeat the Vietcong. What is the main difference between these views? Explain your answer, using details from both interpretations.',
        lines: 5,
      },
      q3c: {
        question:
          'Suggest one reason why Interpretations 1 and 2 give different views about why US military tactics failed to defeat the Vietcong. You may use information from your own knowledge to help explain your answer.',
        lines: 5,
      },
    },
  },

  // =========================================================================
  // SPREAD 12: KT 3.4 — TET OFFENSIVE & VIETNAMIZATION
  // =========================================================================
  {
    id: 'lesson_3_4',
    topic: 'Key Topic 3 • US Involvement in Vietnam 1954–1975',
    title: 'KT 3.4: What was the Tet Offensive, and why was it the decisive turning point?',
    examType: 'interpretation_eval',
    left: {
      tag: 'KT 3.4 • Deep Knowledge',
      headline: 'The Tet Turning Point: Tactical Defeat, Psychological Rupture & Vietnamization',
      summary:
        'On January 31, 1968, during the sacred Tet holiday truce, 84,000 communist troops launched a massive surprise offensive across 100 South Vietnamese towns and cities, penetrating the US Embassy compound in Saigon. While the offensive was a catastrophic military defeat for the Vietcong, it shattered the Washington "credibility gap", convinced the American public the war was unwinnable, prompted LBJ to abandon re-election, and led to Richard Nixon\'s strategy of "Vietnamization".',
      pillars: [
        {
          title: 'The Tet Offensive (Jan 1968)',
          subtitle: 'The Coordinated Nation-Wide Assault',
          bullets: [
            'Simultaneous attacks launched on 100+ cities, 36 provincial capitals, and 5 major US air bases during the lunar new year truce.',
            'A 19-man Vietcong sapper unit blasted through the outer wall of the **US Embassy in Saigon**, fighting for six hours.',
            'In **Hue**, communist forces seized the ancient imperial citadel and held it for 26 days of brutal house-to-house fighting.',
          ],
        },
        {
          title: 'The Catastrophic Military Outcome',
          subtitle: 'Destruction of the Vietcong Infrastructure',
          bullets: [
            'The hoped-for popular civilian uprising against the South Vietnamese government failed to materialize.',
            'The Vietcong suffered devastating losses: an estimated 45,000 to 50,000 experienced guerrilla fighters were killed.',
            'The NLF was permanently crippled as an independent fighting force; the North Vietnamese Army (NVA) had to take over conventional combat.',
          ],
        },
        {
          title: 'The Psychological Shock & Aftermath',
          subtitle: "The Credibility Gap & LBJ's Abdication",
          bullets: [
            'General Westmoreland had claimed the enemy was "at the end of his rope"; Tet completely destroyed the administration\'s credibility.',
            'Legendary CBS anchor **Walter Cronkite** declared the war "mired in stalemate"; Johnson lamented: "If I\'ve lost Cronkite, I\'ve lost Middle America."',
            'On March 31, 1968, Johnson announced a partial bombing halt, offered peace negotiations, and withdrew from the presidential election.',
          ],
        },
      ],
      deepKnowledgeGrid: [
        {
          title: '1. The Battle of Hue & Atrocities',
          points: [
            '**Communist Purges:** During their occupation of Hue, communist cadres systematically executed 3,000 civilians (teachers, doctors, officials).',
            '**Total Urban Devastation:** US Marines and ARVN used heavy artillery and airstrikes to retake the city; 80% of Hue was destroyed and 10,000 died.',
            '**Iconic Quote:** A US major famously remarked regarding Ben Tre: "It became necessary to destroy the town to save it."',
          ],
        },
        {
          title: "2. General Westmoreland's Request",
          points: [
            '**206,000 More Troops:** After Tet, Westmoreland requested an additional 206,000 troops and mobilization of the Reserves.',
            "**Clark Clifford's Reversal:** New Secretary of Defense Clark Clifford grilled the Joint Chiefs; discovered they had no plan to win the war.",
            '**The Turning of the Elites:** The "Wise Men" (senior foreign policy advisers) told Johnson that military victory was impossible.',
          ],
        },
        {
          title: "3. Nixon's Policy: Vietnamization",
          points: [
            '**The Nixon Doctrine (1969):** Shifting the ground combat burden entirely to South Vietnam while US troops were phased out.',
            '**Troop Withdrawals:** US troop levels dropped from 543,000 in 1969 to under 50,000 by 1972.',
            '**Modernizing ARVN:** US transferred billions in weaponry, aircraft, and tanks, making ARVN the fourth-largest military in the world on paper.',
          ],
        },
        {
          title: '4. The Expansion of Air Warfare',
          points: [
            '**Secret Bombing of Cambodia (Operation Menu):** In 1969, Nixon ordered covert carpet bombing of communist sanctuaries inside neutral Cambodia.',
            '**1970 Cambodian Incursion:** Ground invasion of Cambodia sparked massive domestic protests and the Kent State shootings.',
            '**Linebacker Campaigns:** Nixon used crushing B-52 air power (Operation Linebacker I and II) to stop North Vietnamese conventional offensives in 1972.',
          ],
        },
      ],
      vocabBank: [
        {
          term: 'Tet Offensive (1968)',
          def: 'Massive, coordinated surprise attacks by communist forces across South Vietnam on January 31, 1968.',
        },
        {
          term: 'Credibility Gap',
          def: 'The profound divide between optimistic US government statements and the grim reality shown on television.',
        },
        {
          term: 'Walter Cronkite',
          def: 'Respected CBS news anchor whose 1968 broadcast declaring the war a stalemate shifted public opinion.',
        },
        {
          term: 'Vietnamization',
          def: "President Nixon's policy of withdrawing US combat troops while building up ARVN forces to fight on their own.",
        },
        {
          term: 'Operation Menu',
          def: "Nixon's secret 1969–70 carpet-bombing campaign targeting communist sanctuaries in neutral Cambodia.",
        },
        {
          term: 'Clark Clifford',
          def: 'Secretary of Defense who replaced Robert McNamara in 1968 and advised Johnson to disengage from Vietnam.',
        },
      ],
      causalFactors: [
        '**1. Psychological Contradiction:** Tet proved that despite half a million US troops, the enemy could strike anywhere, shattering government claims of victory.',
        '**2. The Power of Television:** Viewers saw combat inside the US Embassy compound in their living rooms, turning public opinion permanently against escalation.',
        '**3. Irreversible Shift to Disengagement:** Tet forced Washington to abandon the objective of military victory in favour of negotiated withdrawal ("peace with honour").',
      ],
      examinerTraps: [
        {
          trap: 'Calling the Tet Offensive a military victory for the Vietcong.',
          correction:
            'Tactically, Tet was a disastrous defeat for the Vietcong, who lost around 50,000 fighters and failed to hold any cities; its triumph was purely political.',
        },
        {
          trap: 'Assuming Walter Cronkite single-handedly forced Johnson to withdraw from the war.',
          correction:
            'Cronkite reflected a broader, deep shift among American establishment elites, Wall Street financiers, and the general public.',
        },
        {
          trap: 'Believing Vietnamization meant the US reduced military violence.',
          correction:
            'While US ground troops were withdrawn, Nixon expanded the war into Cambodia and dropped more bomb tonnage than under Johnson.',
        },
      ],
    },
    right: {
      essay: {
        title: 'Question 3(d): Evaluative Essay [16 Marks + 4 SPaG = 20 Marks]',
        int1: {
          author: "Historian George Herring, 'America's Longest War' (1986)",
          text: '"The Tet Offensive was a crushing tactical disaster for the communist forces. The Vietcong suffered catastrophic losses from which their guerrilla cadres never recovered, and the hoped-for popular uprising in the cities was a total failure. Yet, paradoxically, Tet was the decisive turning point of the war because it destroyed the Johnson administration\'s domestic political credibility. By demonstrating that the war was far from won, it shattered the American public\'s will, forced Johnson to halt escalation, and made American disengagement inevitable."',
        },
        int2: {
          author: "Historian Christian Appy, 'Working-Class War' (1993)",
          text: '"To interpret the Tet Offensive simply as a military defeat transformed into a public relations victory misses the essential reality of the war. Tet exposed the fundamental bankruptcy of General Westmoreland\'s war of attrition. The fact that communist forces could coordinate attacks on over one hundred cities simultaneously proved that American strategy had completely failed to pacify the country. Tet did not create the anti-war mood; it simply stripped away the administration\'s propaganda and revealed that the war had been an unwinnable quagmire from the start."',
        },
        question:
          'How far do you agree with Interpretation 2 about the effects of the Tet Offensive on the American war effort in Vietnam?',
        targetInt: 'Interpretation 2',
        planningGuide:
          'Intro: Set clear criteria (tactical military vs strategic political impact) &rarr; Section 1: Support Int 2 (attrition bankruptcy, credibility gap, simultaneous strikes on 100+ cities) &rarr; Section 2: Evaluate Int 1 (devastation of Vietcong combat strength, Cronkite broadcast, LBJ withdrawal) &rarr; Conclusion: Deliver a sustained, criteria-based judgement on Interpretation 2.',
        lines: 38,
      },
    },
  },

  // =========================================================================
  // KEY TOPIC 4: REACTIONS TO & THE END OF THE VIETNAM WAR, 1964–75
  // =========================================================================
  {
    id: 'lesson_4_1',
    topic: 'Key Topic 4 • Reactions & The End of the War 1964–1975',
    title: 'KT 4.1: Why did opposition to the Vietnam War grow so rapidly (1968–70)?',
    examType: 'source_utility',
    left: {
      tag: 'KT 4.1 • Deep Knowledge',
      headline: 'The Domestic Storm: Televised Atrocity, Draft Inequity & Campus Slaughter',
      summary:
        'Between 1968 and 1970, domestic opposition to the Vietnam War expanded from fringe student movements into a broad national consensus. Fueled by uncensored television coverage of brutal combat, outrage over the unfairness of the military draft, revelations of horrific atrocities at My Lai, and the lethal shooting of unarmed student protesters by the National Guard at Kent State, millions of Americans mobilized to demand an immediate end to the conflict.',
      pillars: [
        {
          title: 'The Living Room War & The Draft',
          subtitle: 'Uncensored Media & Working-Class Inequity',
          bullets: [
            'Vietnam was the first **"televised war"**; nightly news broadcasts showed burning villages, body bags, and wounded teenagers without military censorship.',
            'The **draft system (Selective Service)** was deeply class-biased: middle-class youths received college deferments, leaving the poor and minorities to fight.',
            'Protesters burned draft cards; 40,000 draft resisters fled to Canada; in 1969, the draft lottery was introduced, widening anti-war anger among suburban families.',
          ],
        },
        {
          title: 'The My Lai Massacre (1968/1969)',
          subtitle: 'The Destruction of American Moral Authority',
          bullets: [
            'On March 16, 1968, Charlie Company led by **Lt William Calley** murdered over 500 unarmed Vietnamese women, children, and elderly civilians.',
            'The military covered up the massacre for 20 months until investigative journalist **Seymour Hersh** broke the story with horrific photographs in late 1969.',
            'Calley was convicted of murder in 1971; the atrocity shattered the moral claim that the US was defending Vietnamese freedom.',
          ],
        },
        {
          title: 'Kent State Shootings (May 1970)',
          subtitle: 'The War Brought Home to Middle America',
          bullets: [
            'In April 1970, Nixon announced the ground invasion of Cambodia, triggering massive protests on hundreds of university campuses.',
            'On May 4, 1970, Ohio National Guardsmen opened fire on student demonstrators at **Kent State University**, killing four and wounding nine.',
            'Triggered an unprecedented nationwide student strike: 4 million students walked out, closing over 450 colleges and universities.',
          ],
        },
      ],
      deepKnowledgeGrid: [
        {
          title: '1. Vietnam Veterans Against the War',
          points: [
            '**VVAW Formed 1967:** Combat veterans returned to testify against the war; John Kerry famously asked the Senate: "How do you ask a man to be the last man to die for a mistake?"',
            '**Discarding Medals (1971):** Hundreds of decorated combat veterans threw their Purple Hearts, Silver Stars, and medals over barricades at the US Capitol.',
            '**Devastating Moral Impact:** Public opinion found it impossible to dismiss decorated combat veterans as unpatriotic cowards or communist dupes.',
          ],
        },
        {
          title: '2. The Moratorium Marches (1969)',
          points: [
            '**October 15, 1969:** Two million Americans took part in the nationwide Moratorium day of peaceful anti-war demonstrations.',
            '**Diverse Coalition:** Clergy, business executives, suburban mothers, and high school students joined radical counter-culture youth.',
            '**March on Washington:** In November 1969, 500,000 marchers gathered peacefully at the Washington Monument, the largest protest in US history.',
          ],
        },
        {
          title: '3. Jackson State Killings (1970)',
          points: [
            "**Police Fire on Black Students:** Ten days after Kent State, police fired on a women's dormitory at Jackson State College (Mississippi), killing two Black students.",
            '**Double Standard in Outrage:** The killings received far less national media attention than Kent State, highlighting ongoing racial disparities in media coverage.',
            '**Radicalization of Black Movement:** Deepened Black community conviction that the Vietnam War was a racist enterprise sacrificing Black lives.',
          ],
        },
        {
          title: '4. Muhammad Ali & The Draft',
          points: [
            '**Refusal of Induction (1967):** Heavyweight champion Muhammad Ali refused the draft on religious and political grounds.',
            '**Iconic Declaration:** "I ain\'t got no quarrel with them Vietcong... No Vietcong ever called me nigger."',
            '**Stripped of Title:** Ali was stripped of his boxing title, convicted of draft evasion, and banned from boxing for three years, becoming a global anti-war icon.',
          ],
        },
      ],
      vocabBank: [
        {
          term: 'Living Room War',
          def: 'Term describing the uncensored television news coverage of the Vietnam War that brought combat into American homes.',
        },
        {
          term: 'Draft Deferment',
          def: 'Official postponement of military conscription, routinely granted to wealthy college students.',
        },
        {
          term: 'My Lai Massacre (1968)',
          def: 'Mass murder of over 500 unarmed Vietnamese civilians by US soldiers under Lt William Calley.',
        },
        {
          term: 'Seymour Hersh',
          def: 'Investigative reporter who exposed the My Lai massacre and subsequent military cover-up in 1969.',
        },
        {
          term: 'Kent State Shootings (1970)',
          def: 'Killing of four unarmed anti-war student protesters by the Ohio National Guard on May 4, 1970.',
        },
        {
          term: 'VVAW',
          def: 'Vietnam Veterans Against the War; group of returned servicemen who actively campaigned against the war.',
        },
      ],
      causalFactors: [
        '**1. Graphic Visual Realism:** Uncensored color footage of dead teenagers and napalmed children made the human cost of war unbearable to voters.',
        "**2. Moral Disillusionment:** Revelations of war crimes at My Lai shattered America's patriotic belief in its own moral exceptionalism.",
        '**3. Conscription of the Middle Class:** The 1969 draft lottery made suburban white families vulnerable to the draft, transforming campus protest into mainstream politics.',
      ],
      examinerTraps: [
        {
          trap: 'Assuming all anti-war protesters were radical hippies and draft-dodging students.',
          correction:
            'By 1969, the anti-war movement included returned combat veterans (VVAW), suburban parents, respected journalists, and moderate politicians.',
        },
        {
          trap: 'Believing the My Lai massacre was exposed immediately in March 1968.',
          correction:
            'The US military successfully covered up My Lai for 20 months until Seymour Hersh and whistle-blower Ron Ridenhour exposed it in late 1969.',
        },
        {
          trap: 'Thinking Kent State students were armed or attacking guardsmen with weapons.',
          correction:
            'The students were unarmed; some threw rocks, but the guardsmen turned and fired 67 rifle rounds across 13 seconds from over 100 yards away.',
        },
      ],
    },
    right: {
      q3a: {
        enquiry:
          'the reasons for growing opposition to the Vietnam War in the USA between 1968 and 1970',
        sourceB: {
          title:
            'Source B: Photograph of National Guardsmen confronting student protesters at Kent State University, May 4, 1970',
          image: 'units/usa/assets/sources/kent-state-protests-1970.jpg',
          caption:
            'Contemporary photograph showing Ohio National Guard soldiers with fixed bayonets advancing and firing tear gas canisters at student anti-war demonstrators on campus.',
        },
        sourceC: {
          title:
            'Source C: From testimony by helicopter pilot Hugh Thompson Jr. regarding the My Lai massacre, 1969',
          text: '"We kept flying over the village and saw bodies everywhere—infants, toddlers, women, very old men. Not a single military-aged male with a weapon. I landed my helicopter between a squad of American troops and a bunker filled with terrified Vietnamese women and children. I told my door gunner to aim his machine gun at our own troops and open fire if they tried to murder any more civilians. It wasn\'t combat; it was cold-blooded murder. When I reported it to headquarters, the officers tried to sweep it under the rug and claim it was a great victory against a communist stronghold."',
          provenance:
            'Official military testimony by US Army helicopter pilot Hugh Thompson Jr., who intervened to halt the slaughter.',
        },
        provenanceClue:
          'Weigh the visual reality of armed state forces confronting domestic university students in Source B against Hugh Thompson’s devastating eyewitness testimony in Source C describing the complete collapse of moral and military discipline at My Lai.',
        lines: 28,
      },
    },
  },

  // =========================================================================
  // SPREAD 14: KT 4.2 — SUPPORT FOR THE WAR & SILENT MAJORITY
  // =========================================================================
  {
    id: 'lesson_4_2',
    topic: 'Key Topic 4 • Reactions & The End of the War 1964–1975',
    title: "KT 4.2: Why did some Americans support the war, and who were the 'Silent Majority'?",
    examType: 'interpretation_diff_why',
    left: {
      tag: 'KT 4.2 • Deep Knowledge',
      headline: 'The Patriotic Counter-Offensive: Anti-Communism, Hard Hats & The Silent Majority',
      summary:
        'Despite vocal anti-war demonstrations, millions of Americans continued to support the war effort throughout the late 1960s and early 1970s. Appealing to patriotic pride, anti-communist conviction, and working-class resentment of privileged student draft-dodgers, President Richard Nixon mobilized what he famously termed the "Silent Majority", winning overwhelming political support for his policy of gradual withdrawal and law and order.',
      pillars: [
        {
          title: 'The "Silent Majority" Speech (1969)',
          subtitle: "Nixon's Strategy of Political Populism",
          bullets: [
            'On November 3, 1969, Nixon addressed the nation: **"And so tonight—to you, the great silent majority of my fellow Americans—I ask for your support."**',
            'Warned that immediate withdrawal would result in a bloodbath in Vietnam and humiliate the US globally.',
            'The speech was an enormous political triumph: 77% of viewers backed Nixon; 50,000 telegrams of support flooded the White House.',
          ],
        },
        {
          title: 'The Hard Hat Riots (May 1970)',
          subtitle: 'Working-Class Anger Against Student Radicals',
          bullets: [
            'On May 8, 1970, in New York City, 200 construction workers attacked high school and college students protesting Kent State.',
            'Workers carrying American flags chased and beat protesters with helmets, chanting: "All the way with the USA!" and "Love it or leave it!"',
            'Police stood by or joined the cheering; union leaders subsequently presented Nixon with an honorary white hard hat at the White House.',
          ],
        },
        {
          title: 'Ideological & Cultural Pillars of Support',
          subtitle: 'Anti-Communism & Patriotic Honor',
          bullets: [
            'Genuine belief in the **Domino Theory**: many Americans feared communist victory in Vietnam would directly threaten global freedom.',
            'Support for "our boys": belief that protesting soldiers in combat was treasonous, demoralizing, and disloyal to fallen servicemen.',
            'Suburban and small-town resentment of the radical counter-culture, illegal drugs, flag-burning, and sexual promiscuity.',
          ],
        },
      ],
      deepKnowledgeGrid: [
        {
          title: '1. The Cultural Class War',
          points: [
            '**Working-Class Resentment:** Working-class parents watched middle-class students attend college on draft deferments while their sons were drafted.',
            '**Cultural Polarization:** Viewed anti-war demonstrators as ungrateful, spoiled elites who despised traditional American values and religion.',
            '**The 1972 Electoral Landslide:** Nixon translated this resentment into an overwhelming victory over anti-war Democrat George McGovern, carrying 49 of 50 states.',
          ],
        },
        {
          title: '2. The Role of Veterans & POW Families',
          points: [
            '**National League of POW/MIA Families:** Formed in 1970; insisted the US must not abandon Vietnam until all prisoners were accounted for.',
            "**Nixon's Leverage:** Nixon used the emotional plight of POWs to justify continued bombing and demand strict North Vietnamese concessions.",
            '**Honor vs Betrayal:** Supported the view that accepting defeat would mean 50,000 American soldiers died in vain.',
          ],
        },
        {
          title: '3. Media Distortion Claims',
          points: [
            '**Vice President Spiro Agnew:** Attacked television networks and journalists as "an effete corps of impudent snobs" who biased the news against America.',
            '**Public Distrust:** Millions of Americans believed television news selectively showed US atrocities while ignoring communist terror.',
            "**Rallying the Base:** Agnew's fiery speeches mobilized conservative donors and built enduring distrust of mainstream media.",
          ],
        },
        {
          title: '4. The Limits of Silent Support',
          points: [
            "**Support for Peace with Honour, Not Forever War:** The Silent Majority supported Nixon's plan to withdraw US ground troops, not an endless war.",
            '**Fatigue & Casualties:** Even pro-war voters welcomed Vietnamization because it brought American casualties down to near zero by 1972.',
            "**Economic Strain:** Rising inflation and tax surcharges eroded the public's patience for open-ended military spending.",
          ],
        },
      ],
      vocabBank: [
        {
          term: 'Silent Majority',
          def: "Nixon's term for mainstream, patriotic Americans who did not protest, riot, or join the counter-culture.",
        },
        {
          term: 'Hard Hat Riot (1970)',
          def: 'Violent confrontation in Manhattan where construction workers attacked anti-war student demonstrators.',
        },
        {
          term: 'Spiro Agnew',
          def: "Nixon's aggressive Vice President who launched fierce public attacks on anti-war critics and the media.",
        },
        {
          term: 'Peace with Honour',
          def: "Nixon's campaign slogan promising an exit from Vietnam that preserved American global credibility.",
        },
        {
          term: 'POW / MIA',
          def: 'Prisoners of War / Missing in Action; soldiers whose capture or disappearance became a major political issue.',
        },
        {
          term: 'Counter-culture',
          def: '1960s youth movement rejecting conventional social norms, materialism, and the Vietnam War.',
        },
      ],
      causalFactors: [
        '**1. Patriotism & Family Sacrifice:** Millions of families with sons serving in Vietnam viewed anti-war protests as an insult to their sacrifice.',
        '**2. Resentment of Student Privilege:** Blue-collar workers deeply resented college youths who avoided the draft while burning the American flag.',
        "**3. Nixon's Strategic Framing:** Nixon framed withdrawal as maintaining American global prestige rather than humiliating surrender.",
      ],
      examinerTraps: [
        {
          trap: 'Assuming the entire American public opposed the Vietnam War after 1968.',
          correction:
            "A massive portion of the population (the Silent Majority) supported Nixon's policies and deeply detested anti-war protesters.",
        },
        {
          trap: 'Believing the Silent Majority wanted to expand ground troops in Vietnam.',
          correction:
            'They supported "Peace with Honour"—a dignified exit through Vietnamization, not an open-ended troop escalation.',
        },
        {
          trap: 'Confusing working-class hard hats with wealthy pro-war business elites.',
          correction:
            'Pro-war support had a strong blue-collar, trade-union foundation motivated by cultural patriotism and resentment of college elites.',
        },
      ],
    },
    right: {
      int1: {
        author:
          "Historian Rick Perlstein, 'Nixonland: The Rise of a President and the Fracturing of America' (2008)",
        text: '"Richard Nixon recognized what intellectual commentators had missed: beneath the screaming student protests lay an immense, angry bedrock of working-class and suburban Americans who felt culturally insulted and politically abandoned. The \'Silent Majority\' speech was a political masterpiece because it legitimized the feelings of blue-collar workers, police officers, and suburban parents who were sickened by flag-burners, urban rioters, and campus draft-dodgers. Support for the war was not about foreign policy; it was a furious cultural counter-revolution against liberal elites."',
      },
      int2: {
        author: "Historian Bruce Schulman, 'The Seventies' (2001)",
        text: "\"It is a mistake to interpret Nixon's 'Silent Majority' as enthusiastic, unwavering supporters of the Vietnam War. While millions of Americans certainly resented the excesses and arrogance of radical student demonstrators, their support for Nixon was essentially defensive and temporary. What the public actually craved was an end to the social turmoil and an honorable way out of an exhausting conflict. They supported Nixon because he was bringing American soldiers home through Vietnamization, not because they believed in military victory.\"",
      },
      q3b: {
        question:
          "Study Interpretations 1 and 2. They give different views about the nature and motivations of support for the Vietnam War and the 'Silent Majority'. What is the main difference between these views? Explain your answer, using details from both interpretations.",
        lines: 5,
      },
      q3c: {
        question:
          'Suggest one reason why Interpretations 1 and 2 give different views about the support for the war and the Silent Majority. You may use information from your own knowledge to help explain your answer.',
        lines: 5,
      },
    },
  },

  // =========================================================================
  // SPREAD 15: KT 4.3 — PEACE NEGOTIATIONS & FALL OF SAIGON
  // =========================================================================
  {
    id: 'lesson_4_3',
    topic: 'Key Topic 4 • Reactions & The End of the War 1964–1975',
    title: 'KT 4.3: How did the US exit Vietnam, and why did South Vietnam fall in 1975?',
    examType: 'inference_causation',
    left: {
      tag: 'KT 4.3 • Deep Knowledge',
      headline: 'The Endgame: Triangular Diplomacy, The Paris Accords & The Fall of Saigon',
      summary:
        'Determined to achieve "Peace with Honour", President Nixon and National Security Adviser Henry Kissinger pursued triangular diplomacy with Moscow and Beijing while conducting brutal bombing campaigns to force North Vietnam to negotiate. Signed in January 1973, the Paris Peace Accords enabled the total withdrawal of US troops, but left 150,000 North Vietnamese soldiers in South Vietnam, leading to the total collapse of the South Vietnamese regime in April 1975.',
      pillars: [
        {
          title: 'Triangular Diplomacy & Detente',
          subtitle: "Nixon & Kissinger's Geopolitical Chessboard",
          bullets: [
            'Exploited the bitter Sino-Soviet split; Nixon made historic visits to **Communist China** (Feb 1972) and **Moscow** (May 1972).',
            'Pressured both communist superpowers to reduce arms shipments to Hanoi in exchange for trade, grain, and arms control treaties (SALT I).',
            'Isolated North Vietnam diplomatically, forcing Chief Negotiator **Le Duc Tho** to engage in serious secret talks in Paris.',
          ],
        },
        {
          title: 'The Paris Peace Accords (Jan 1973)',
          subtitle: 'The Flawed Fig Leaf of Exit',
          bullets: [
            'Ceasefire agreed; all remaining US troops withdrawn within 60 days; North Vietnam released 591 American POWs.',
            'Fatal concession: allowed **150,000 North Vietnamese Army (NVA)** troops to remain inside South Vietnam.',
            'South Vietnamese President **Nguyen Van Thieu** was coerced into signing when Nixon secretly promised US air power would return if the North violated the treaty.',
          ],
        },
        {
          title: 'The Fall of Saigon (April 1975)',
          subtitle: 'The 55-Day Collapse of South Vietnam',
          bullets: [
            'In 1974, Nixon resigned over the **Watergate scandal**; Congress passed the **War Powers Act (1973)** and slashed aid to South Vietnam.',
            'In spring 1975, the NVA launched a massive conventional offensive; ARVN forces collapsed rapidly in panic and disarray.',
            'On April 29–30, 1975, **Operation Frequent Wind** evacuated 7,000 Americans and South Vietnamese by helicopter; North Vietnamese tanks crashed through the gates of the Presidential Palace.',
          ],
        },
      ],
      deepKnowledgeGrid: [
        {
          title: '1. The 1972 Christmas Bombing',
          points: [
            '**Operation Linebacker II:** When talks broke down in Dec 1972, Nixon ordered 12 days of unprecedented B-52 carpet bombing of Hanoi and Haiphong.',
            '**Over 20,000 Tons of Bombs:** Heaviest bombing of the war; destroyed rail yards, power plants, and factories, losing 16 B-52s to Soviet SAMs.',
            '**Political Motive:** Designed to reassure President Thieu of US commitment and force Hanoi back to the negotiating table.',
          ],
        },
        {
          title: '2. The Impact of Watergate (1972–74)',
          points: [
            "**Destruction of Executive Power:** Nixon's domestic crimes stripped the presidency of political authority; Nixon resigned in August 1974.",
            '**President Gerald Ford:** Weak and unelected, Ford faced a hostile Democratic Congress determined to end all US involvement in Indochina.',
            '**Aid Slashed:** Congress cut military aid to South Vietnam by 50% in 1974, leaving ARVN troops short of fuel, ammunition, and spare parts.',
          ],
        },
        {
          title: '3. Operation Frequent Wind (1975)',
          points: [
            '**The Final Chaos:** April 29–30, 1975: Helicopters ferried evacuees from the US Embassy roof to aircraft carriers in the South China Sea.',
            '**Pushing Hueys Overboard:** US carrier crews pushed millions of dollars worth of helicopters into the ocean to make room for more refugees.',
            '**Saigon Renamed:** On April 30, 1975, Saigon fell and was immediately renamed **Ho Chi Minh City**, completing the communist reunification of Vietnam.',
          ],
        },
        {
          title: '4. The Plight of the "Boat People"',
          points: [
            '**Re-education Camps:** Hundreds of thousands of former ARVN officers, civil servants, and intellectuals were sent to brutal communist re-education camps.',
            '**Mass Exodus:** Over 1.5 million refugees fled Vietnam in flimsy fishing boats over the next decade; an estimated 200,000 drowned at sea.',
            '**Global Resettlement:** Hundreds of thousands eventually settled in the United States, Australia, France, and Canada.',
          ],
        },
      ],
      vocabBank: [
        {
          term: 'Triangular Diplomacy',
          def: "Kissinger's strategy of using improved relations with China and the USSR to pressure North Vietnam.",
        },
        {
          term: 'Le Duc Tho',
          def: 'Chief North Vietnamese negotiator who conducted secret Paris talks with Henry Kissinger.',
        },
        {
          term: 'Paris Peace Accords (1973)',
          def: 'Treaty ending direct US military involvement in Vietnam and securing the release of American POWs.',
        },
        {
          term: 'Nguyen Van Thieu',
          def: 'President of South Vietnam from 1967 to 1975 who bitterly opposed the Paris treaty concessions.',
        },
        {
          term: 'War Powers Act (1973)',
          def: 'Federal law requiring the President to obtain congressional approval within 60 days of deploying troops abroad.',
        },
        {
          term: 'Operation Frequent Wind',
          def: 'The final helicopter evacuation of American personnel and at-risk South Vietnamese from Saigon in April 1975.',
        },
      ],
      causalFactors: [
        "**1. Nixon's Geopolitical Squeeze:** Triangular diplomacy stripped Hanoi of unconditional backing from Beijing and Moscow.",
        '**2. The Fatal Accords Flaw:** Leaving 150,000 NVA combat troops inside South Vietnam made the resumption of war and northern victory inevitable.',
        '**3. Watergate & Congressional Abandonment:** The Watergate scandal destroyed presidential power, ensuring Congress refused emergency aid when the North attacked in 1975.',
      ],
      examinerTraps: [
        {
          trap: 'Believing US combat troops were in South Vietnam when Saigon fell in April 1975.',
          correction:
            'All US combat troops had been completely withdrawn over two years earlier, in March 1973, following the Paris Peace Accords.',
        },
        {
          trap: 'Assuming South Vietnam collapsed because its soldiers lacked modern weapons.',
          correction:
            'ARVN had immense modern weaponry, but lacked fuel, ammunition, spare parts, and above all competent leadership and morale.',
        },
        {
          trap: 'Thinking Henry Kissinger and Le Duc Tho both proudly accepted the Nobel Peace Prize.',
          correction:
            'Kissinger accepted the 1973 Nobel Peace Prize, but Le Duc Tho refused it, pointing out that true peace did not exist in Vietnam.',
        },
      ],
    },
    right: {
      q1: {
        title: 'Question 1: Source Inference [4 Marks]',
        sourceTitle: 'Source A: Evacuation of the CIA safehouse in Saigon, April 29, 1975',
        sourceImage: 'units/usa/assets/sources/saigon-embassy-evacuation.jpg',
        sourceCaption:
          'Iconic photograph by Hubert van Es showing evacuees ascending a rooftop ladder to an Air America helicopter hours before the fall of Saigon.',
        question:
          'Give two things you can infer from Source A about the American evacuation and the collapse of South Vietnam in April 1975.',
      },
      q2: {
        title: 'Question 2: Causation Essay [12 Marks]',
        question: 'Explain why the United States signed the Paris Peace Accords in January 1973.',
        stimulus: [
          'Domestic anti-war opposition in the USA',
          'Impact of triangular diplomacy with China and the USSR',
        ],
        spanNote: '1969–1973',
        lines: 24,
      },
    },
  },

  // =========================================================================
  // SPREAD 16: KT 4.4 — REASONS FOR US FAILURE & LEGACY
  // =========================================================================
  {
    id: 'lesson_4_4',
    topic: 'Key Topic 4 • Reactions & The End of the War 1964–1975',
    title: 'KT 4.4: What were the main reasons why the US failed to win the war in Vietnam?',
    examType: 'interpretation_eval',
    left: {
      tag: 'KT 4.4 • Deep Knowledge',
      headline: 'The Anatomy of Defeat: Military, Political, Moral & Cultural Limits of Superpower',
      summary:
        'The American failure in Vietnam was a multidimensional catastrophe resulting from inappropriate military doctrine, an illegitimate South Vietnamese client state, unshakeable Vietnamese communist nationalism, domestic political collapse, and severe economic exhaustion. Costing over 58,000 American lives, 2 million Vietnamese lives, and $168 billion, the war shattered the post-WWII American consensus and created the lasting "Vietnam Syndrome".',
      pillars: [
        {
          title: 'Military Deficiencies',
          subtitle: 'Inappropriate Doctrine & Intelligence Failure',
          bullets: [
            'Over-reliance on heavy conventional firepower, aerial bombing, and artillery in an asymmetric counter-insurgency environment.',
            'The **"body count"** delusion: failed to understand that Ho Chi Minh was willing to absorb catastrophic casualties to achieve national unity.',
            'The **one-year draft tour (DEROS)** destroyed military cohesion, professional continuity, and tactical competence.',
          ],
        },
        {
          title: 'Political & Cultural Illegitimacy',
          subtitle: 'The Failure to Win "Hearts and Minds"',
          bullets: [
            'South Vietnamese regimes (Diem, Ky, Thieu) were viewed by the peasant population as corrupt, Catholic-dominated puppets of foreign white powers.',
            'American search-and-destroy tactics, napalm, and Agent Orange destroyed the rural agricultural society the US was supposedly defending.',
            'The communist forces held the unshakeable moral high ground of anti-colonial national liberation against foreign invaders.',
          ],
        },
        {
          title: 'Domestic Collapse & Economic Cost',
          subtitle: 'The Home Front & The Vietnam Syndrome',
          bullets: [
            'Loss of domestic political consensus: the credibility gap, student strikes, My Lai, and Kent State made sustaining the war politically impossible.',
            "Massive economic strain: $168 billion in war spending triggered 1970s inflation and forced cuts to Johnson's Great Society anti-poverty programs.",
            'The **Vietnam Syndrome**: decades-long public and congressional reluctance to deploy US ground troops abroad without guaranteed rapid victory.',
          ],
        },
      ],
      deepKnowledgeGrid: [
        {
          title: '1. The Human & Social Cost',
          points: [
            '**American Casualties:** 58,220 US military personnel dead; over 150,000 wounded; tens of thousands suffering from chronic PTSD and substance abuse.',
            '**Vietnamese Casualties:** An estimated 2 to 3 million Vietnamese civilians and combatants killed; hundreds of thousands disabled by defoliants and landmines.',
            '**Veteran Alienation:** Unlike WWII veterans, returned Vietnam veterans faced public indifference, hostility, or were stereotyped as drug-addled war criminals.',
          ],
        },
        {
          title: '2. Cold War Strategic Realities',
          points: [
            '**Soviet & Chinese Support:** Moscow and Beijing provided over $2 billion in modern military hardware, SAM missiles, and grain, keeping North Vietnam armed.',
            '**Geopolitical Containment:** The US could not invade North Vietnam or close the port of Haiphong for fear of triggering direct military war with China or the USSR.',
            '**Asymmetrical Sanctuaries:** Communist forces exploited neutral territory in Laos and Cambodia with impunity throughout the war.',
          ],
        },
        {
          title: '3. The War Powers Act of 1973',
          points: [
            "**Restraining the Imperial Presidency:** Congress overrode Nixon's veto to pass the War Powers Resolution, capping presidential troop deployments at 60 days.",
            '**End of the Imperial Presidency:** Reasserted legislative oversight over foreign military entanglements.',
            '**Congressional Skepticism:** Directly prevented President Ford from providing military air support when South Vietnam was overrun in 1975.',
          ],
        },
        {
          title: '4. Historiographical Debate',
          points: [
            '**Orthodox / Liberal View (Herring, Sheehan):** The war was fundamentally unwinnable; Vietnamese nationalism and southern corruption doomed US intervention from the start.',
            '**Revisionist / Conservative View (Moyar, Summers):** The war was winnable; the US military was betrayed by timid politicians, hostile media, and congressional abandonment.',
            '**Post-Revisionist Synthesis:** Recognizes both profound American strategic misjudgments and the critical agency of local Vietnamese actors.',
          ],
        },
      ],
      vocabBank: [
        {
          term: 'Vietnam Syndrome',
          def: 'Post-1975 public and political reluctance to commit US military forces to foreign conflicts overseas.',
        },
        {
          term: 'Hearts and Minds',
          def: 'Counter-insurgency doctrine attempting to win the emotional and political allegiance of civilian populations.',
        },
        {
          term: 'Body Count',
          def: 'Flawed quantitative metric used by US commanders to measure military progress by the number of enemy dead.',
        },
        {
          term: 'Asymmetric Warfare',
          def: 'Conflict between belligerents whose relative military power, strategy, or tactics differ significantly.',
        },
        {
          term: 'Stagflation',
          def: 'Economic crisis of high inflation and stagnant growth caused in part by massive, unbudgeted Vietnam War deficit spending.',
        },
        {
          term: 'DEROS',
          def: 'Date Eligible for Return from Overseas; the one-year individual rotation tour that degraded combat cohesion.',
        },
      ],
      causalFactors: [
        '**1. The Primacy of Vietnamese Nationalism:** The communist forces were fighting for national sovereignty, accepting losses that no democratic power could endure.',
        '**2. Incurable Corruption of the South:** No amount of American firepower or economic aid could manufacture legitimacy for an unpopular, repressive puppet government.',
        '**3. Collapse of the Domestic Will:** The loss of television, press, and congressional backing made it democratically impossible to sustain an open-ended foreign war.',
      ],
      examinerTraps: [
        {
          trap: 'Concluding that the US lost simply because the American military was defeated on the battlefield.',
          correction:
            'The US military was never militarily destroyed in the field; the war was lost because of political failure, domestic collapse, and strategic illegitimacy.',
        },
        {
          trap: 'Blaming the loss entirely on the anti-war movement and the media.',
          correction:
            'The media and protesters reflected real military failures and atrocities; the core problem was the unviability of the South Vietnamese state.',
        },
        {
          trap: 'Forgetting the massive military and economic assistance provided by the Soviet Union and China.',
          correction:
            'North Vietnam did not fight alone; Soviet SAM missile batteries, modern tanks, and Chinese grain were indispensable to northern victory.',
        },
      ],
    },
    right: {
      essay: {
        title: 'Question 3(d): Evaluative Essay [16 Marks + 4 SPaG = 20 Marks]',
        int1: {
          author: "Historian Neil Sheehan, 'A Bright Shining Lie' (1988)",
          text: '"The American disaster in Vietnam was not a failure of military bravery or tactical execution; it was a fundamental failure of political comprehension. The United States entered Vietnam in thrall to an arrogant Cold War dogma that blinded policymakers to the reality that they were fighting a genuine, deep-rooted anti-colonial revolution. By propping up a succession of corrupt, self-serving Saigon dictators who enjoyed zero legitimacy among their own peasant population, Washington doomed its cause from the outset. No amount of high explosives, napalm, or body counts could ever substitute for an authentic, legitimate government."',
        },
        int2: {
          author: "Historian Mark Moyar, 'Triumph Forsaken: The Vietnam War, 1954–1965' (2006)",
          text: '"The Vietnam War was far from an unwinnable quagmire. The United States possessed the military, technological, and economic resources to preserve South Vietnam as a secure non-communist nation, exactly as it had done in South Korea. The war was lost not on the battlefields of Southeast Asia, but in the halls of Washington and the studios of American television. Political timidity in refusing to invade North Vietnam, combined with media defeatism and ultimately Congress\'s dishonorable abandonment of South Vietnam in 1974, snatched defeat from the jaws of a viable military containment."',
        },
        question:
          'How far do you agree with Interpretation 2 about the main reasons why the United States failed to achieve its objectives in the Vietnam War?',
        targetInt: 'Interpretation 2',
        planningGuide:
          'Intro: Establish clear criteria (political illegitimacy vs military execution vs home-front betrayal) &rarr; Section 1: Support Int 2 (military restrictions, media bias, 1974 congressional aid cuts, Cold War containment) &rarr; Section 2: Evaluate Int 1 (Diem/Thieu corruption, peasant alienation, strength of nationalism, failure of search-and-destroy) &rarr; Conclusion: Deliver a balanced, sustained judgement on Interpretation 2.',
        lines: 38,
      },
    },
  },
];

// Helper to render the Left-Hand Knowledge Page (Dense Specification Masterclass)
function renderLeftPage(data, pageNum, spreadNum) {
  const left = data.left;
  const deepGrid = left.deepKnowledgeGrid || [];
  const vocab = left.vocabBank || [];
  const causal = left.causalFactors || [];
  const traps = left.examinerTraps || [];

  const pillarsHtml = left.pillars
    .map((pillar) => {
      const bulletsHtml = pillar.bullets
        .map((b) => `<li style="margin-bottom: 2px;">${formatMd(b)}</li>`)
        .join('');
      return `
      <div style="background: #ffffff; border: 1.5px solid #1e3a8a; border-radius: 5px; padding: 9px 11px; flex: 1; display: flex; flex-direction: column;">
        <div style="border-bottom: 1px solid #e2e8f0; padding-bottom: 3px; margin-bottom: 4px;">
          <div style="font-size: 9.4pt; font-weight: 800; color: #0f172a; line-height: 1.2; margin-bottom: 2px;">${pillar.title}</div>
          <div style="font-size: 7.2pt; font-weight: 700; color: #1e3a8a; text-transform: uppercase; letter-spacing: 0.4px;">${pillar.subtitle || ''}</div>
        </div>
        <ul style="margin: 0; padding-left: 13px; font-size: 7.6pt; color: #334155; line-height: 1.38; flex: 1;">
          ${bulletsHtml}
        </ul>
      </div>
    `;
    })
    .join('');

  const colsHtml = deepGrid
    .map((col) => {
      const ptsHtml = col.points
        .map((pt) => `<li style="margin-bottom: 2px;">${formatMd(pt)}</li>`)
        .join('');
      return `
      <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 4px; padding: 7px 8px;">
        <div style="font-size: 7.6pt; font-weight: 800; color: #1e3a8a; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px; margin-bottom: 3px;">
          ${col.title}
        </div>
        <ul style="margin: 0; padding-left: 11px; font-size: 7.2pt; color: #1e293b; line-height: 1.35;">
          ${ptsHtml}
        </ul>
      </div>
    `;
    })
    .join('');

  const deepGridHtml = `
    <div style="border: 1.5px solid #0f172a; border-radius: 5px; padding: 8px 11px; background: #fafafa;">
      <div style="font-size: 8.2pt; font-weight: 800; color: #0f172a; text-transform: uppercase; letter-spacing: 0.4px; margin-bottom: 5px; display: flex; justify-content: space-between;">
        <span>Core Knowledge Matrix &bull; Specification Evidence:</span>
        <span style="color: #64748b; font-weight: 700;">Textbook Grounded Evidence</span>
      </div>
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px;">
        ${colsHtml}
      </div>
    </div>
  `;

  const vItems = vocab
    .map(
      (v) =>
        `<div style="margin-bottom: 2px;"><strong>${v.term}:</strong> ${formatMd(v.def)}</div>`,
    )
    .join('');
  const vocabHtml = `
    <div style="flex: 1; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 5px; padding: 8px 10px; font-size: 7.3pt; line-height: 1.36; color: #334155;">
      <div style="font-size: 7.8pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; margin-bottom: 4px; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px;">
        Key Terminology &amp; Analytical Vocabulary:
      </div>
      ${vItems}
    </div>
  `;

  const cItems = causal
    .map((c) => `<div style="margin-bottom: 2px;">${formatMd(c)}</div>`)
    .join('');
  const causalHtml = `
    <div style="flex: 1.3; background: #fffbeb; border: 1px solid #fde68a; border-radius: 5px; padding: 8px 10px; font-size: 7.3pt; line-height: 1.36; color: #78350f;">
      <div style="font-size: 7.8pt; font-weight: 800; color: #92400e; text-transform: uppercase; margin-bottom: 4px; border-bottom: 1px solid #fef3c7; padding-bottom: 2px;">
        Causal Factors &amp; Historical Analysis:
      </div>
      ${cItems}
    </div>
  `;

  const tItems = traps
    .map(
      (t) => `
    <div style="margin-bottom: 2px;">
      <strong>&bull; Common Error:</strong> ${formatMd(t.trap)}<br/>
      <strong style="color: #1e3a8a;">&rarr; How to improve:</strong> ${formatMd(t.correction)}
    </div>
  `,
    )
    .join('');

  const trapsHtml = `
    <div style="background: #ffffff; border: 1.5px solid #b91c1c; border-radius: 5px; padding: 8px 11px; font-size: 7.2pt; line-height: 1.36; color: #1e293b;">
      <div style="font-size: 7.8pt; font-weight: 800; color: #b91c1c; text-transform: uppercase; margin-bottom: 4px; display: flex; justify-content: space-between;">
        <span>Examiner Pitfalls &amp; High-Yield Distinction Corrections:</span>
        <span style="font-size: 6.8pt; color: #7f1d1d;">Avoid Generalised Assertions</span>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
        ${tItems}
      </div>
    </div>
  `;

  return `
    <div class="page" id="spread-${spreadNum}" data-page="${pageNum}" data-spread="${spreadNum}">
      <span id="page_${pageNum}" style="display:none;"></span>
      <span id="${data.id}_left" style="display:none;"></span>
      <span id="${data.id}" style="display:none;"></span>
      <div class="page-header">
        <div>
          <span class="archival-tag">${data.topic}</span>
          <h2 class="page-title">${data.title}</h2>
        </div>
        <div class="page-badge">Paper 3 &bull; Section A/B</div>
      </div>

      <div class="masterclass-container" style="display: flex; flex-direction: column; justify-content: space-between; height: 1010px;">
        <div style="background: #f8fafc; border-left: 4px solid #1e3a8a; border-radius: 4px; padding: 8px 12px;">
          <div style="font-size: 9.6pt; font-weight: 800; color: #1e3a8a; margin-bottom: 3px;">${left.headline}</div>
          <div style="font-size: 7.8pt; color: #334155; line-height: 1.40;">${left.summary}</div>
        </div>

        <div style="display: flex; gap: 8px;">
          ${pillarsHtml}
        </div>

        ${deepGridHtml}

        <div style="display: flex; gap: 8px;">
          ${vocabHtml}
          ${causalHtml}
        </div>

        ${trapsHtml}
      </div>

      <div class="page-footer">
        <span>Pearson Edexcel GCSE (9–1) History &bull; Option 33: Conflict at Home and Abroad: the USA, 1954–75</span>
        <span class="page-num">${pageNum}</span>
      </div>
    </div>
  `;
}

// Helper to render the Right-Hand Exam Assessment Page
function renderRightPage(data, pageNum, spreadNum) {
  const right = data.right;
  let examContentHtml = '';

  if (data.examType === 'inference_causation') {
    const q1 = right.q1;
    const q2 = right.q2;
    const imgUri = getImageDataUri(q1.sourceImage);

    examContentHtml = `
      <!-- Q1 Source Inference Container [4 Marks] -->
      <div style="background: #ffffff; border: 1.5px solid #1e3a8a; border-radius: 5px; padding: 7px 10px; margin-bottom: 5px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
          <strong style="font-size: 8.5pt; color: #1e3a8a;">${q1.title}</strong>
          <span style="font-size: 6.8pt; font-weight: 700; color: #475569;">Timing: ~6 mins</span>
        </div>
        <div style="font-size: 7.6pt; font-weight: 800; color: #0f172a; margin-bottom: 4px;">
          ${q1.question}
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1.35fr; gap: 10px; margin-bottom: 4px;">
          <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; padding: 5px; display: flex; flex-direction: column;">
            <div style="font-size: 7.0pt; font-weight: 800; color: #1e3a8a; margin-bottom: 3px;">${q1.sourceTitle}</div>
            <div style="height: 115px; border: 1px solid #94a3b8; border-radius: 3px; overflow: hidden; background: #0f172a; margin-bottom: 3px;">
              <img src="${imgUri}" style="width: 100%; height: 100%; object-fit: contain; background: #0f172a;" alt="${q1.sourceTitle}" />
            </div>
            <div style="font-size: 6.3pt; color: #475569; line-height: 1.25;"><em>${q1.sourceCaption}</em></div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 5px;">
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; padding: 5px 8px; font-size: 7.0pt;">
              <strong style="color: #1e3a8a;">(i) What I can infer:</strong>
              <div class="line"></div>
              <div class="line"></div>
              <strong style="color: #1e3a8a; margin-top: 4px; display: block;">Details in the source that tell me this:</strong>
              <div class="line"></div>
              <div class="line"></div>
            </div>
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; padding: 5px 8px; font-size: 7.0pt;">
              <strong style="color: #1e3a8a;">(ii) What I can infer:</strong>
              <div class="line"></div>
              <div class="line"></div>
              <strong style="color: #1e3a8a; margin-top: 4px; display: block;">Details in the source that tell me this:</strong>
              <div class="line"></div>
              <div class="line"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Q2 Explain Why Container [12 Marks] -->
      <div style="background: #ffffff; border: 1.5px solid #0f172a; border-radius: 5px; padding: 8px 10px; margin-bottom: 6px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
          <strong style="font-size: 8.5pt; color: #0f172a;">${q2.title}</strong>
          <span style="font-size: 6.8pt; font-weight: 700; color: #ffffff; background: #0f172a; padding: 1px 6px; border-radius: 3px;">Timing: ~18 mins</span>
        </div>
        <div style="font-size: 7.6pt; font-weight: 800; color: #0f172a; margin-bottom: 4px;">
          ${q2.question}
        </div>

        <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; padding: 4px 8px; margin-bottom: 5px; display: flex; justify-content: space-between; align-items: center;">
          <div style="font-size: 7.0pt; color: #1e293b;">
            <strong>You may use in your answer:</strong> &bull; ${q2.stimulus.join(' &bull; ')}
          </div>
          <div style="font-size: 6.4pt; font-weight: 800; color: #dc2626; background: #fee2e2; padding: 1px 6px; border-radius: 2px;">
            ⚠️ MUST include own knowledge beyond stimulus!
          </div>
        </div>

        ${renderLines(Math.max(q2.lines || 0, 31))}
      </div>

      <!-- Rubric -->
      <div style="border-top: 1.5px solid #0f172a; padding-top: 4px; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 8px; font-size: 6.8pt; color: #334155; align-items: center;">
        <div>
          <strong>Q1 Target:</strong> 2 supported inferences with quotes/details (4m).<br/>
          <strong>Q2 Target:</strong> 3 developed explanatory PEEL paragraphs + own knowledge (12m).
        </div>
        <div style="text-align: right;">
          <strong>Target Time:</strong> ~25 Mins
        </div>
        <div style="display: flex; justify-content: flex-end; gap: 4px;">
          <div style="border: 1px solid #0f172a; border-radius: 3px; padding: 2px 5px; text-align: center;">
            <span style="display: block; font-size: 5.4pt; text-transform: uppercase;">Q1</span>
            <strong style="font-size: 6.8pt;">___ / 4</strong>
          </div>
          <div style="border: 1px solid #0f172a; border-radius: 3px; padding: 2px 5px; text-align: center;">
            <span style="display: block; font-size: 5.4pt; text-transform: uppercase;">Q2</span>
            <strong style="font-size: 6.8pt;">___ / 12</strong>
          </div>
          <div style="border: 1px solid #1e3a8a; background: #1e3a8a; color: #fff; border-radius: 3px; padding: 2px 6px; text-align: center;">
            <span style="display: block; font-size: 5.4pt; text-transform: uppercase;">Total</span>
            <strong style="font-size: 6.8pt;">___ / 16</strong>
          </div>
        </div>
      </div>
    `;
  } else if (data.examType === 'source_utility') {
    const q3a = right.q3a;
    const imgUri = getImageDataUri(q3a.sourceB.image);

    examContentHtml = `
      <!-- Q3(a) Source Utility Container [8 Marks] -->
      <div style="background: #ffffff; border: 2px solid #1e3a8a; border-radius: 5px; padding: 8px 10px; margin-bottom: 6px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
          <strong style="font-size: 8.6pt; color: #1e3a8a;">Question 3(a): Source Utility [8 Marks]</strong>
          <span style="font-size: 6.8pt; font-weight: 700; color: #ffffff; background: #1e3a8a; padding: 1px 6px; border-radius: 3px;">Timing: ~15 mins</span>
        </div>
        <div style="font-size: 7.6pt; font-weight: 800; color: #0f172a; margin-bottom: 5px; line-height: 1.3;">
          Study Sources B and C. How useful are Sources B and C for an enquiry into ${q3a.enquiry}? Explain your answer, using Sources B and C and your knowledge of the historical context.
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1.3fr; gap: 8px; margin-bottom: 5px;">
          <!-- Source B Visual -->
          <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; padding: 5px; display: flex; flex-direction: column;">
            <strong style="font-size: 6.8pt; color: #1e3a8a; margin-bottom: 2px;">${q3a.sourceB.title}</strong>
            <div style="height: 95px; border: 1px solid #94a3b8; border-radius: 3px; overflow: hidden; background: #0f172a; margin-bottom: 3px;">
              <img src="${imgUri}" style="width: 100%; height: 100%; object-fit: contain; background: #0f172a;" alt="${q3a.sourceB.title}" />
            </div>
            <div style="font-size: 6.0pt; color: #475569; line-height: 1.2;"><em>${q3a.sourceB.caption}</em></div>
          </div>

          <!-- Source C Written -->
          <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; padding: 5px; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <strong style="font-size: 6.8pt; color: #1e3a8a; margin-bottom: 2px; display: block;">${q3a.sourceC.title}</strong>
              <div style="font-size: 6.6pt; color: #1e293b; font-style: italic; line-height: 1.32; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 3px; padding: 5px; margin-bottom: 3px;">
                ${q3a.sourceC.text}
              </div>
            </div>
            <div style="font-size: 6.0pt; color: #475569; line-height: 1.2;"><strong>Provenance:</strong> ${q3a.sourceC.provenance}</div>
          </div>
        </div>

        <!-- Scaffolding Guide -->
        <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 4px; padding: 5px 8px; margin-bottom: 5px; font-size: 6.5pt; color: #1e3a8a; display: flex; justify-content: space-between;">
          <span><strong>How to answer (Utility):</strong> Evaluate Content (quotes/details) + Provenance (Author, Date, Purpose) + Contextual Knowledge for BOTH sources.</span>
          <span style="color: #b91c1c; font-weight: 700;">No generic reliability claims!</span>
        </div>

        <div style="display: flex; gap: 12px; margin-bottom: 5px; font-size: 6.5pt; color: #475569; font-weight: 600;">
          <span>&bull; Para 1: Utility of Source B (Content + COP Provenance + Context)</span>
          <span>&bull; Para 2: Utility of Source C (Content + COP Provenance + Context)</span>
        </div>

        ${renderLines(Math.max(q3a.lines || 0, 34))}
      </div>

      <!-- Rubric -->
      <div style="border-top: 1.5px solid #0f172a; padding-top: 4px; display: grid; grid-template-columns: 2.5fr 1fr; gap: 8px; font-size: 6.8pt; color: #334155; align-items: center;">
        <div>
          <strong>Level 3 (6–8m):</strong> Assesses utility of BOTH sources using content, provenance (author/motive/audience), and rich contextual knowledge.
        </div>
        <div style="display: flex; justify-content: flex-end; align-items: center; gap: 6px;">
          <div style="border: 1.5px solid #1e3a8a; background: #1e3a8a; color: #fff; border-radius: 3px; padding: 2px 8px; text-align: center;">
            <span style="display: block; font-size: 5.5pt; text-transform: uppercase;">Q3(a) Marks</span>
            <strong style="font-size: 7.5pt;">___ / 8</strong>
          </div>
        </div>
      </div>
    `;
  } else if (data.examType === 'interpretation_diff_why') {
    const int1 = right.int1;
    const int2 = right.int2;

    examContentHtml = `
      <!-- Interpretations Container -->
      <div style="background: #f8fafc; border: 1.5px solid #1e3a8a; border-radius: 5px; padding: 6px 8px; margin-bottom: 6px;">
        <div style="font-size: 7.8pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; margin-bottom: 4px;">
          Study Interpretations 1 and 2 below:
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
          <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 4px; padding: 6px 8px; font-size: 6.8pt; line-height: 1.34;">
            <strong style="color: #1e3a8a; display: block; margin-bottom: 2px;">Interpretation 1: From ${int1.author}</strong>
            <div style="font-style: italic; color: #1e293b;">"${int1.text}"</div>
          </div>
          <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 4px; padding: 6px 8px; font-size: 6.8pt; line-height: 1.34;">
            <strong style="color: #1e3a8a; display: block; margin-bottom: 2px;">Interpretation 2: From ${int2.author}</strong>
            <div style="font-style: italic; color: #1e293b;">"${int2.text}"</div>
          </div>
        </div>
      </div>

      <!-- Q3(b) Differences Container [4 Marks] -->
      <div style="background: #ffffff; border: 1.5px solid #0f172a; border-radius: 5px; padding: 6px 8px; margin-bottom: 6px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
          <strong style="font-size: 8.4pt; color: #0f172a;">Question 3(b): Difference in Views [4 Marks]</strong>
          <span style="font-size: 6.8pt; font-weight: 700; color: #475569;">Timing: ~5 mins &bull; Target: 4–5 Lines</span>
        </div>
        <div style="font-size: 7.6pt; font-weight: 800; color: #0f172a; margin-bottom: 3px;">
          ${right.q3b.question}
        </div>
        <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 3px; padding: 3px 7px; margin-bottom: 4px; font-size: 6.4pt; color: #1e3a8a;">
          <strong>Exam Technique Formula (4–5 Lines Max):</strong> [1] State the core difference in view ➔ [2] Direct detail from Interpretation 1 ➔ [3] Contrasting detail from Interpretation 2.
        </div>
        ${renderLines(5)}
      </div>

      <!-- Q3(c) Reasons for Difference Container [4 Marks] -->
      <div style="background: #ffffff; border: 1.5px solid #0f172a; border-radius: 5px; padding: 6px 8px; margin-bottom: 6px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
          <strong style="font-size: 8.4pt; color: #0f172a;">Question 3(c): Suggest Reasons for Difference [4 Marks]</strong>
          <span style="font-size: 6.8pt; font-weight: 700; color: #475569;">Timing: ~5 mins &bull; Target: 4–5 Lines</span>
        </div>
        <div style="font-size: 7.6pt; font-weight: 800; color: #0f172a; margin-bottom: 3px;">
          ${right.q3c.question}
        </div>
        <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 3px; padding: 3px 7px; margin-bottom: 4px; font-size: 6.4pt; color: #1e3a8a;">
          <strong>Exam Technique Formula (4–5 Lines Max):</strong> [1] State ONE reason why they differ (e.g. authors gave weight to different sources, timeframes, or criteria) ➔ [2] Explain using specific details.
        </div>
        ${renderLines(5)}
      </div>

      <!-- Rubric -->
      <div style="border-top: 1.5px solid #0f172a; padding-top: 4px; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 8px; font-size: 6.8pt; color: #334155; align-items: center;">
        <div>
          <strong>Q3(b) Target:</strong> Direct comparison of main views using quotes from both texts (4m).<br/>
          <strong>Q3(c) Target:</strong> One clear reason (different evidence/focus) with explanation (4m).
        </div>
        <div style="text-align: right;">
          <strong>Target Time:</strong> ~15 Mins
        </div>
        <div style="display: flex; justify-content: flex-end; gap: 4px;">
          <div style="border: 1px solid #0f172a; border-radius: 3px; padding: 2px 5px; text-align: center;">
            <span style="display: block; font-size: 5.4pt; text-transform: uppercase;">Q3(b)</span>
            <strong style="font-size: 6.8pt;">___ / 4</strong>
          </div>
          <div style="border: 1px solid #0f172a; border-radius: 3px; padding: 2px 5px; text-align: center;">
            <span style="display: block; font-size: 5.4pt; text-transform: uppercase;">Q3(c)</span>
            <strong style="font-size: 6.8pt;">___ / 4</strong>
          </div>
          <div style="border: 1px solid #1e3a8a; background: #1e3a8a; color: #fff; border-radius: 3px; padding: 2px 6px; text-align: center;">
            <span style="display: block; font-size: 5.4pt; text-transform: uppercase;">Total</span>
            <strong style="font-size: 6.8pt;">___ / 8</strong>
          </div>
        </div>
      </div>
    `;
  } else if (data.examType === 'interpretation_eval') {
    const q3d = right.essay;

    examContentHtml = `
      <!-- Q3(d) Evaluative Essay Container [16m + 4 SPaG = 20 Marks] -->
      <div style="background: #ffffff; border: 2px solid #0f172a; border-radius: 5px; padding: 7px 9px; margin-bottom: 6px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
          <strong style="font-size: 8.6pt; color: #0f172a;">${q3d.title}</strong>
          <span style="font-size: 6.8pt; font-weight: 700; color: #ffffff; background: #0f172a; padding: 1px 6px; border-radius: 3px;">Timing: ~30 mins</span>
        </div>
        <div style="font-size: 7.6pt; font-weight: 800; color: #0f172a; margin-bottom: 5px;">
          ${q3d.question}
        </div>

        <!-- Interpretations Box -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 5px;">
          <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; padding: 6px 8px; font-size: 6.8pt; line-height: 1.34;">
            <strong style="color: #1e3a8a; display: block; margin-bottom: 2px;">Interpretation 1: From ${q3d.int1.author}</strong>
            <div style="font-style: italic; color: #1e293b;">"${q3d.int1.text}"</div>
          </div>
          <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; padding: 6px 8px; font-size: 6.8pt; line-height: 1.34;">
            <strong style="color: #1e3a8a; display: block; margin-bottom: 2px;">Interpretation 2: From ${q3d.int2.author}</strong>
            <div style="font-style: italic; color: #1e293b;">"${q3d.int2.text}"</div>
          </div>
        </div>

        <!-- Suggested Essay Plan -->
        <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 4px; padding: 5px 8px; margin-bottom: 5px; font-size: 6.8pt; color: #1e3a8a;">
          <strong>Suggested Essay Plan:</strong> ${q3d.planningGuide}
        </div>

        ${renderLines(Math.max(q3d.lines || 0, 38))}
      </div>

      <!-- Rubric -->
      <div style="border-top: 1.5px solid #0f172a; padding-top: 4px; display: grid; grid-template-columns: 2fr 1fr 1.2fr; gap: 8px; font-size: 6.8pt; color: #334155; align-items: center;">
        <div>
          <strong>Level 4 (13–16m):</strong> Analytical throughout; evaluates BOTH interpretations with precise own knowledge; sustained criteria-based conclusion.
        </div>
        <div style="text-align: right;">
          <strong>Target Time:</strong> ~30 Mins
        </div>
        <div style="display: flex; justify-content: flex-end; gap: 4px;">
          <div style="border: 1px solid #0f172a; border-radius: 3px; padding: 2px 5px; text-align: center;">
            <span style="display: block; font-size: 5.4pt; text-transform: uppercase;">Essay</span>
            <strong style="font-size: 6.8pt;">___ / 16</strong>
          </div>
          <div style="border: 1px solid #0f172a; border-radius: 3px; padding: 2px 5px; text-align: center;">
            <span style="display: block; font-size: 5.4pt; text-transform: uppercase;">SPaG</span>
            <strong style="font-size: 6.8pt;">___ / 4</strong>
          </div>
          <div style="border: 1px solid #1e3a8a; background: #1e3a8a; color: #fff; border-radius: 3px; padding: 2px 6px; text-align: center;">
            <span style="display: block; font-size: 5.4pt; text-transform: uppercase;">Total</span>
            <strong style="font-size: 6.8pt;">___ / 20</strong>
          </div>
        </div>
      </div>
    `;
  }

  return `
    <div class="page" id="page_${pageNum}" data-page="${pageNum}" data-spread="${spreadNum}">
      <span id="${data.id}_right" style="display:none;"></span>
      <span id="page-${pageNum}" style="display:none;"></span>
      <div class="page-header">
        <div>
          <span class="archival-tag">Edexcel GCSE (9–1) History &bull; Paper 3 Exam Practice</span>
          <h2 class="page-title">${data.title}</h2>
        </div>
        <div class="page-badge">Exam Practice</div>
      </div>

      <div class="exam-container" style="display: flex; flex-direction: column; justify-content: flex-start; gap: 8px; height: 1010px;">
        ${examContentHtml}
      </div>

      <div class="page-footer">
        <span>Pearson Edexcel GCSE (9–1) History &bull; Option 33: Conflict at Home and Abroad: the USA, 1954–75</span>
        <span class="page-num">${pageNum}</span>
      </div>
    </div>
  `;
}

// Generate the complete HTML document (36 Pages)
function generateFullHTML() {
  // Page 1: Cover Page (Clean White Ink-Friendly Specification Matrix Standard)
  const page1 = `
    <div class="page page-cover" id="page_1" data-page="1" style="box-sizing: border-box; width: 794px; height: 1123px; padding: 22px 26px; font-family: 'Inter', sans-serif; background: #ffffff; color: #0f172a; display: flex; flex-direction: column; justify-content: space-between; overflow: hidden; position: relative; scroll-margin-top: 65px;">
      <div style="position: absolute; top: 10px; left: 10px; right: 10px; bottom: 10px; border: 2px solid #0f172a; border-radius: 6px; pointer-events: none;"></div>

      <div style="position: relative; z-index: 2; display: flex; flex-direction: column; flex: 1; justify-content: space-between;">
        <div style="display: flex; flex-direction: column; justify-content: space-between; flex: 1;">
          <!-- Top Bar -->
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #0f172a; padding-bottom: 6px; margin-bottom: 8px;">
            <span style="font-size: 9.2pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; letter-spacing: 0.8px;">
              Edexcel GCSE (9–1) History &bull; Paper 3 (1HI0/33)
            </span>
            <span style="font-size: 7.6pt; font-weight: 700; color: #475569; background: #f8fafc; border: 1px solid #cbd5e1; padding: 3px 8px; border-radius: 4px;">
              Modern Depth Study &bull; Option 33
            </span>
          </div>

          <!-- Header Row with Title on Left, Candidate Box on Right -->
          <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 10px; border-bottom: 1.5px solid #0f172a; padding-bottom: 9px;">
            <div>
              <h1 style="font-family: 'Playfair Display', Georgia, serif; font-size: 25pt; font-weight: 900; line-height: 1.05; margin: 0; color: #0f172a; letter-spacing: -0.5px;">
                Conflict at Home &amp; Abroad
              </h1>
              <div style="font-family: 'Playfair Display', Georgia, serif; font-size: 13.5pt; font-style: italic; color: #475569; margin: 3px 0;">
                The USA, 1954–1975 &bull; Depth Study
              </div>
              <div style="font-size: 8.8pt; font-weight: 700; color: #1e3a8a;">
                Civil Rights &amp; The Vietnam War &bull; Visual Revision &amp; Exam Assessment Guide
              </div>
            </div>
            <div style="border: 1.5px solid #0f172a; border-radius: 5px; padding: 9px 13px; background: #f8fafc; width: 320px; flex-shrink: 0;">
              <div style="font-size: 7.4pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 5px;">
                Candidate Information:
              </div>
              <div style="font-size: 8.4pt; font-weight: 700; color: #0f172a; margin-bottom: 7px;">
                Pupil Name: <span style="display: inline-block; width: 210px; border-bottom: 1.5px solid #0f172a; margin-left: 4px;">&nbsp;</span>
              </div>
              <div style="font-size: 8.4pt; font-weight: 700; color: #0f172a;">
                Class / Teacher: <span style="display: inline-block; width: 190px; border-bottom: 1.5px solid #0f172a; margin-left: 4px;">&nbsp;</span>
              </div>
            </div>
          </div>

          <!-- Syllabus Overview Header Bar -->
          <div style="display: flex; justify-content: space-between; align-items: center; background: #0f172a; color: #ffffff; padding: 7px 14px; border-radius: 4px; margin-bottom: 10px;">
            <span style="font-size: 8.6pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px;">
              Official Pearson Edexcel Paper 3 Specification Content
            </span>
            <span style="font-size: 7.6pt; color: #cbd5e1;">
              Word-for-Word Syllabus Matrix &bull; Key Topics 1–4
            </span>
          </div>

          <!-- 2-Column Specification Grid -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 7.5pt; line-height: 1.36; color: #1e293b;">
            <!-- Left Column: Key Topic 1 & Key Topic 2 -->
            <div>
              <!-- Key Topic 1 -->
              <div style="border: 1.4px solid #1e3a8a; border-radius: 5px; padding: 9px 12px; margin-bottom: 10px; background: #ffffff;">
                <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1.2px solid #bfdbfe; padding-bottom: 3px; margin-bottom: 5px;">
                  <strong style="color: #1e3a8a; font-size: 8.4pt; text-transform: uppercase; letter-spacing: 0.3px;">
                    Key Topic 1: Civil Rights Movement, 1954–60
                  </strong>
                  <span style="font-size: 7.0pt; font-weight: 800; color: #1e3a8a; background: #eff6ff; padding: 1px 5px; border-radius: 3px; white-space: nowrap;">Section A</span>
                </div>
                <div style="margin-bottom: 4px;">
                  <strong style="color: #0f172a; font-size: 7.8pt;">1. Position of Black Americans in early 1950s:</strong>
                  <div style="padding-left: 8px; margin-top: 1px;">
                    &bull; Segregation, Jim Crow laws, voting discrimination in the South.<br/>
                    &bull; Work of civil rights organisations: NAACP and CORE.
                  </div>
                </div>
                <div style="margin-bottom: 4px;">
                  <strong style="color: #0f172a; font-size: 7.8pt;">2. Progress in education:</strong>
                  <div style="padding-left: 8px; margin-top: 1px;">
                    &bull; Brown v. Board of Education (1954), Brown II (1955).<br/>
                    &bull; Little Rock Central High School (1957) and Eisenhower's intervention.
                  </div>
                </div>
                <div style="margin-bottom: 4px;">
                  <strong style="color: #0f172a; font-size: 7.8pt;">3. Montgomery Bus Boycott &amp; impact, 1955–60:</strong>
                  <div style="padding-left: 8px; margin-top: 1px;">
                    &bull; Rosa Parks, MIA, MLK, Supreme Court ruling (Browder v Gayle).<br/>
                    &bull; Creation of SCLC; Civil Rights Act of 1957.
                  </div>
                </div>
                <div>
                  <strong style="color: #0f172a; font-size: 7.8pt;">4. Opposition to civil rights:</strong>
                  <div style="padding-left: 8px; margin-top: 1px;">
                    &bull; Ku Klux Klan and white violence, murder of Emmett Till (1955).<br/>
                    &bull; White Citizens' Councils; 'Dixiecrats' and Southern Manifesto.
                  </div>
                </div>
              </div>

              <!-- Key Topic 2 -->
              <div style="border: 1.4px solid #1e3a8a; border-radius: 5px; padding: 9px 12px; background: #ffffff;">
                <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1.2px solid #bfdbfe; padding-bottom: 3px; margin-bottom: 5px;">
                  <strong style="color: #1e3a8a; font-size: 8.4pt; text-transform: uppercase; letter-spacing: 0.3px;">
                    Key Topic 2: Protest, Progress &amp; Radicalism, 1960–75
                  </strong>
                  <span style="font-size: 7.0pt; font-weight: 800; color: #1e3a8a; background: #eff6ff; padding: 1px 5px; border-radius: 3px; white-space: nowrap;">Section A</span>
                </div>
                <div style="margin-bottom: 4px;">
                  <strong style="color: #0f172a; font-size: 7.8pt;">1. Progress, 1960–62:</strong>
                  <div style="padding-left: 8px; margin-top: 1px;">
                    &bull; Greensboro sit-ins (1960) and creation of SNCC.<br/>
                    &bull; Freedom Rides (1961); James Meredith and Ole Miss (1962).
                  </div>
                </div>
                <div style="margin-bottom: 4px;">
                  <strong style="color: #0f172a; font-size: 7.8pt;">2. Peaceful protests and impact, 1963–65:</strong>
                  <div style="padding-left: 8px; margin-top: 1px;">
                    &bull; Birmingham (1963); March on Washington ("I Have a Dream").<br/>
                    &bull; Mississippi Freedom Summer (1964); Selma March (1965).<br/>
                    &bull; Civil Rights Act (1964) and Voting Rights Act (1965).
                  </div>
                </div>
                <div style="margin-bottom: 4px;">
                  <strong style="color: #0f172a; font-size: 7.8pt;">3. Malcolm X and Black Power, 1963–70:</strong>
                  <div style="padding-left: 8px; margin-top: 1px;">
                    &bull; Malcolm X and Nation of Islam; Black Power (Carmichael).<br/>
                    &bull; 1968 Mexico Olympics; Black Panther Party (Newton, Seale).
                  </div>
                </div>
                <div>
                  <strong style="color: #0f172a; font-size: 7.8pt;">4. Movement 1965–75:</strong>
                  <div style="padding-left: 8px; margin-top: 1px;">
                    &bull; Urban riots (Watts 1965, Detroit 1967), Kerner Report (1968).<br/>
                    &bull; MLK Chicago (1966); MLK assassination (1968); 1968 Housing Act.
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Column: Key Topic 3 & Key Topic 4 -->
            <div>
              <!-- Key Topic 3 -->
              <div style="border: 1.4px solid #1e3a8a; border-radius: 5px; padding: 9px 12px; margin-bottom: 10px; background: #ffffff;">
                <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1.2px solid #bfdbfe; padding-bottom: 3px; margin-bottom: 5px;">
                  <strong style="color: #1e3a8a; font-size: 8.4pt; text-transform: uppercase; letter-spacing: 0.3px;">
                    Key Topic 3: US Involvement in Vietnam, 1954–75
                  </strong>
                  <span style="font-size: 7.0pt; font-weight: 800; color: #1e3a8a; background: #eff6ff; padding: 1px 5px; border-radius: 3px; white-space: nowrap;">Section B</span>
                </div>
                <div style="margin-bottom: 4px;">
                  <strong style="color: #0f172a; font-size: 7.8pt;">1. Reasons for US involvement, 1954–63:</strong>
                  <div style="padding-left: 8px; margin-top: 1px;">
                    &bull; Dien Bien Phu &amp; Geneva Accords (1954); Domino Theory.<br/>
                    &bull; Ngo Dinh Diem's regime; Strategic Hamlets; US military advisers.
                  </div>
                </div>
                <div style="margin-bottom: 4px;">
                  <strong style="color: #0f172a; font-size: 7.8pt;">2. Escalation of the conflict, 1964–68:</strong>
                  <div style="padding-left: 8px; margin-top: 1px;">
                    &bull; Gulf of Tonkin Incident (1964) and Tonkin Gulf Resolution.<br/>
                    &bull; LBJ's escalation; Operation Rolling Thunder; US ground combat troops.
                  </div>
                </div>
                <div style="margin-bottom: 4px;">
                  <strong style="color: #0f172a; font-size: 7.8pt;">3. Nature of conflict, 1964–68:</strong>
                  <div style="padding-left: 8px; margin-top: 1px;">
                    &bull; Vietcong guerrilla tactics: tunnels (Cu Chi), booby traps, Trail.<br/>
                    &bull; US tactics: Search &amp; Destroy, chemical defoliants (Napalm, Agent Orange).<br/>
                    &bull; Tet Offensive (1968): military failure for Vietcong, US political turning point.
                  </div>
                </div>
                <div>
                  <strong style="color: #0f172a; font-size: 7.8pt;">4. Changes under Nixon, 1969–73:</strong>
                  <div style="padding-left: 8px; margin-top: 1px;">
                    &bull; Nixon Doctrine &amp; Vietnamisation (ARVN build-up, US troop withdrawals).<br/>
                    &bull; Incursions into Cambodia (1970) and Laos (1971); 1972 Linebacker bombing.
                  </div>
                </div>
              </div>

              <!-- Key Topic 4 -->
              <div style="border: 1.4px solid #1e3a8a; border-radius: 5px; padding: 9px 12px; background: #ffffff;">
                <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1.2px solid #bfdbfe; padding-bottom: 3px; margin-bottom: 5px;">
                  <strong style="color: #1e3a8a; font-size: 8.4pt; text-transform: uppercase; letter-spacing: 0.3px;">
                    Key Topic 4: Reactions to &amp; End of War, 1964–75
                  </strong>
                  <span style="font-size: 7.0pt; font-weight: 800; color: #1e3a8a; background: #eff6ff; padding: 1px 5px; border-radius: 3px; white-space: nowrap;">Section B</span>
                </div>
                <div style="margin-bottom: 4px;">
                  <strong style="color: #0f172a; font-size: 7.8pt;">1. Reasons for growth of opposition:</strong>
                  <div style="padding-left: 8px; margin-top: 1px;">
                    &bull; The draft system (conscription); televised news and media coverage.<br/>
                    &bull; My Lai Massacre (1968) and Lt. Calley; Kent State shootings (1970).
                  </div>
                </div>
                <div style="margin-bottom: 4px;">
                  <strong style="color: #0f172a; font-size: 7.8pt;">2. Support for the war in the USA:</strong>
                  <div style="padding-left: 8px; margin-top: 1px;">
                    &bull; Reasons for support: anti-communism, containment, patriotism.<br/>
                    &bull; Nixon and the 'Silent Majority'; Hard Hat riots in New York (1970).
                  </div>
                </div>
                <div style="margin-bottom: 4px;">
                  <strong style="color: #0f172a; font-size: 7.8pt;">3. Peace process and end of the war:</strong>
                  <div style="padding-left: 8px; margin-top: 1px;">
                    &bull; Secret diplomacy: Kissinger and Le Duc Tho.<br/>
                    &bull; Paris Peace Agreement (1973); human, economic, and political costs.<br/>
                    &bull; 1975 Spring Offensive and Fall of Saigon.
                  </div>
                </div>
                <div>
                  <strong style="color: #0f172a; font-size: 7.8pt;">4. Reasons for failure in Vietnam:</strong>
                  <div style="padding-left: 8px; margin-top: 1px;">
                    &bull; Strengths of North Vietnam/NLF; weaknesses of US armed forces.<br/>
                    &bull; Failure of conventional tactics; domestic opposition and Congress.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Student Revision Roadmap Box -->
          <div style="border: 1.5px solid #0f172a; border-radius: 5px; padding: 10px 14px; background: #f8fafc; margin-top: 10px;">
            <div style="font-size: 8.4pt; font-weight: 800; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px; display: flex; justify-content: space-between;">
              <span>How to Use This Visual Revision &amp; Exam Assessment Guide:</span>
              <span style="color: #1e3a8a; font-weight: 700;">16 Double-Page Study Spreads &bull; Complete GCSE Preparation</span>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; font-size: 7.4pt; line-height: 1.36; color: #334155;">
              <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 4px; padding: 7px 10px;">
                <strong style="color: #1e3a8a; display: block; margin-bottom: 3px; font-size: 7.8pt;">1. Core Factual Evidence (Left Pages)</strong>
                Textbook-grounded factual knowledge, key dates, conceptual pillars, analytical terminology, causal factors, and common student errors with corrections.
              </div>
              <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 4px; padding: 7px 10px;">
                <strong style="color: #1e3a8a; display: block; margin-bottom: 3px; font-size: 7.8pt;">2. Authentic Exam Practice (Right Pages)</strong>
                Pearson Edexcel question stems (Q1 Inference, Q2 Causation, Q3a Utility, Q3b/c Differences &amp; Reasons, Q3d Essay) with authentic dotted lines, timings, and Level rubrics.
              </div>
              <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 4px; padding: 7px 10px;">
                <strong style="color: #1e3a8a; display: block; margin-bottom: 3px; font-size: 7.8pt;">3. Synoptic Chronology &amp; Historiography</strong>
                Page 35 synchronises Civil Rights and Vietnam events side-by-side; Page 36 details 6 academic historiographical schools and criteria toolkits for Level 4 judgements.
              </div>
            </div>
          </div>
        </div>

        <!-- Footer Signoff -->
        <div style="border-top: 2px solid #0f172a; padding-top: 9px; display: flex; justify-content: space-between; align-items: center; font-size: 7.4pt; color: #475569;">
          <div>
            <strong style="color: #0f172a;">MEONCROSS SCHOOL HISTORY DEPARTMENT</strong> &bull; GCSE (9–1) Revision Series<br/>
            <span>Head of Department: Benjamin Lovett &bull; Academic Year 2026–2027</span>
          </div>
          <div style="font-weight: 800; color: #1e3a8a; text-transform: uppercase; letter-spacing: 0.5px;">
            Option 33: Conflict at Home and Abroad: the USA, 1954–75
          </div>
        </div>
      </div>
    </div>
  `;

  // Page 2: Specification Blueprint & Exam Strategy
  const page2 = `
    <div class="page" id="page_2" data-page="2">
      <div class="page-header">
        <div>
          <span class="archival-tag">Paper 3 Blueprint &bull; Exam Overview</span>
          <h2 class="page-title">Edexcel GCSE Paper 3: Exam Structure, Timings &amp; Success Principles</h2>
        </div>
        <div class="page-badge">Total Marks: 52 &bull; Time: 1h 20m</div>
      </div>

      <div style="display: flex; flex-direction: column; justify-content: space-between; height: 1010px;">
        <!-- Top Banner -->
        <div style="background: linear-gradient(135deg, #1b365d 0%, #0f172a 100%); color: #ffffff; padding: 13px 18px; border-radius: 6px; border-left: 5px solid #facc15;">
          <div style="font-size: 12.0pt; font-weight: 800; margin-bottom: 4px; letter-spacing: 0.2px;">
            Pearson Edexcel GCSE (9–1) History &bull; Paper 3 Modern Depth Study Blueprint
          </div>
          <div style="font-size: 8.2pt; color: #e2e8f0; line-height: 1.44;">
            Paper 3 tests both knowledge recall and historical skills across two distinct sections: <strong>Section A (20% of GCSE)</strong> focuses on knowledge recall, inference, and multi-causal explanation, while <strong>Section B (30% of GCSE)</strong> focuses on primary source utility and historiographical interpretation analysis.
          </div>
        </div>

        <!-- Assessment Objectives & Weighting Bar -->
        <div style="border: 1.5px solid #0f172a; border-radius: 5px; padding: 10px 14px; background: #ffffff;">
          <div style="font-size: 8.6pt; font-weight: 800; color: #0f172a; text-transform: uppercase; letter-spacing: 0.4px; margin-bottom: 7px; display: flex; justify-content: space-between;">
            <span>Pearson Edexcel Paper 3 Assessment Objectives (AO1–AO4):</span>
            <span style="color: #1e3a8a; font-weight: 700;">52 Raw Marks Total &bull; 100% of Paper 3</span>
          </div>
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 9px; font-size: 7.2pt; line-height: 1.38; color: #334155;">
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 5px; padding: 8px 10px;">
              <strong style="color: #1e3a8a; font-size: 8.0pt; display: block; margin-bottom: 2px;">AO1: Recall &amp; Knowledge</strong>
              <div style="font-weight: 800; color: #0f172a; font-size: 7.6pt; margin-bottom: 3px;">16 Marks (31%)</div>
              Demonstrate precise historical knowledge and understanding of key features, events, and legislation across all 4 Key Topics.
            </div>
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 5px; padding: 8px 10px;">
              <strong style="color: #1e3a8a; font-size: 8.0pt; display: block; margin-bottom: 2px;">AO2: Explanation &amp; Causation</strong>
              <div style="font-weight: 800; color: #0f172a; font-size: 7.6pt; margin-bottom: 3px;">12 Marks (23%)</div>
              Explain and analyse historical events using second-order concepts: causation, consequence, change, continuity, and significance.
            </div>
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 5px; padding: 8px 10px;">
              <strong style="color: #1e3a8a; font-size: 8.0pt; display: block; margin-bottom: 2px;">AO3: Primary Source Utility</strong>
              <div style="font-weight: 800; color: #0f172a; font-size: 7.6pt; margin-bottom: 3px;">8 Marks (15%)</div>
              Analyse and evaluate contemporary visual and written sources to make substantiated judgements on their utility for specific enquiries.
            </div>
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 5px; padding: 8px 10px;">
              <strong style="color: #1e3a8a; font-size: 8.0pt; display: block; margin-bottom: 2px;">AO4: Interpretations Analysis</strong>
              <div style="font-weight: 800; color: #0f172a; font-size: 7.6pt; margin-bottom: 3px;">16m + 4 SPaG (31%)</div>
              Analyse and evaluate how and why different historical interpretations have been produced, reaching a sustained criteria-based conclusion.
            </div>
          </div>
        </div>

        <!-- Question Grid -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
          <!-- Section A -->
          <div style="border: 1.5px solid #1e3a8a; border-radius: 5px; padding: 11px 13px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;">
            <div style="font-size: 9.4pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; border-bottom: 1.5px solid #1e3a8a; padding-bottom: 4px; margin-bottom: 8px; display: flex; justify-content: space-between;">
              <span>SECTION A: Recall &amp; Causation</span>
              <span style="font-size: 7.8pt;">16 Marks &bull; ~25 Mins</span>
            </div>

            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 5px; padding: 9px 11px; margin-bottom: 9px;">
              <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 3px;">
                <strong style="font-size: 8.4pt; color: #1e3a8a;">Question 1: Source Inference [4 Marks]</strong>
                <span style="font-size: 7.2pt; font-weight: 700; color: #475569; background: #e2e8f0; padding: 1px 5px; border-radius: 3px;">Target: 6 Mins</span>
              </div>
              <p style="font-size: 7.6pt; color: #334155; margin: 0 0 5px 0; line-height: 1.36; font-style: italic;">
                "Give two things you can infer from Source A about..."
              </p>
              <ul style="margin: 0; padding-left: 14px; font-size: 7.2pt; color: #1e293b; line-height: 1.38;">
                <li>State two separate, valid historical inferences that go beyond surface description.</li>
                <li>Directly support each inference with a precise quote or detailed visual feature from Source A.</li>
                <li><strong>Common Error:</strong> Simply copying text without stating what the author is suggesting.</li>
              </ul>
            </div>

            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 5px; padding: 9px 11px;">
              <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 3px;">
                <strong style="font-size: 8.4pt; color: #1e3a8a;">Question 2: Causation Essay [12 Marks]</strong>
                <span style="font-size: 7.2pt; font-weight: 700; color: #475569; background: #e2e8f0; padding: 1px 5px; border-radius: 3px;">Target: 18 Mins</span>
              </div>
              <p style="font-size: 7.6pt; color: #334155; margin: 0 0 5px 0; line-height: 1.36; font-style: italic;">
                "Explain why [event happened / succeeded / failed]..."
              </p>
              <ul style="margin: 0; padding-left: 14px; font-size: 7.2pt; color: #1e293b; line-height: 1.38;">
                <li>Write three fully developed, analytical PEEL paragraphs.</li>
                <li>Address the two provided stimulus points, but <strong>MUST include substantial own knowledge</strong>.</li>
                <li>Link factors together: explain how economic, political, and social causes interacted.</li>
              </ul>
            </div>
          </div>

          <!-- Section B -->
          <div style="border: 1.5px solid #0f172a; border-radius: 5px; padding: 11px 13px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;">
            <div style="font-size: 9.4pt; font-weight: 800; color: #0f172a; text-transform: uppercase; border-bottom: 1.5px solid #0f172a; padding-bottom: 4px; margin-bottom: 8px; display: flex; justify-content: space-between;">
              <span>SECTION B: Enquiry &amp; Interpretations</span>
              <span style="font-size: 7.8pt;">36 Marks &bull; ~55 Mins</span>
            </div>

            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 5px; padding: 8px 10px; margin-bottom: 7px;">
              <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
                <strong style="font-size: 8.2pt; color: #0f172a;">Q3(a): Source Utility [8 Marks]</strong>
                <span style="font-size: 7.0pt; font-weight: 700; color: #475569; background: #e2e8f0; padding: 1px 5px; border-radius: 3px;">Target: 15 Mins</span>
              </div>
              <p style="font-size: 7.4pt; color: #334155; margin: 0 0 3px 0; line-height: 1.32; font-style: italic;">
                "How useful are Sources B and C for an enquiry into..."
              </p>
              <div style="font-size: 7.1pt; color: #1e293b; line-height: 1.34;">
                Evaluate Content + Provenance (COP: Author, Date, Motive) + Contextual Knowledge for <strong>BOTH</strong> sources. Explain how provenance affects utility.
              </div>
            </div>

            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 5px; padding: 8px 10px; margin-bottom: 7px;">
              <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
                <strong style="font-size: 8.2pt; color: #0f172a;">Q3(b) &amp; Q3(c): Interpretation Differences &amp; Reasons [4m + 4m]</strong>
                <span style="font-size: 7.0pt; font-weight: 700; color: #475569; background: #e2e8f0; padding: 1px 5px; border-radius: 3px;">Target: 12 Mins</span>
              </div>
              <div style="font-size: 7.1pt; color: #1e293b; line-height: 1.34;">
                <strong>Q3(b):</strong> Directly contrast the main arguments of Interpretations 1 and 2 with exact quotes.<br/>
                <strong>Q3(c):</strong> Give one reason why they differ (e.g. focused on different evidence, sources, or periods).
              </div>
            </div>

            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 5px; padding: 8px 10px;">
              <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
                <strong style="font-size: 8.2pt; color: #0f172a;">Q3(d): Evaluative Essay [16 Marks + 4 SPaG = 20 Marks]</strong>
                <span style="font-size: 7.0pt; font-weight: 700; color: #475569; background: #e2e8f0; padding: 1px 5px; border-radius: 3px;">Target: 28 Mins</span>
              </div>
              <p style="font-size: 7.4pt; color: #334155; margin: 0 0 3px 0; line-height: 1.32; font-style: italic;">
                "How far do you agree with Interpretation 2 about..."
              </p>
              <div style="font-size: 7.1pt; color: #1e293b; line-height: 1.34;">
                Structure: Evaluate Interpretation 2 using own knowledge &rarr; Contrast with Interpretation 1 &rarr; Sustained criteria judgement on Interpretation 2.
              </div>
            </div>
          </div>
        </div>

        <!-- Strategic Principles -->
        <div style="border: 1.5px solid #0f172a; border-radius: 5px; padding: 11px 14px; background: #fafafa;">
          <div style="font-size: 8.8pt; font-weight: 800; color: #0f172a; text-transform: uppercase; letter-spacing: 0.3px; margin-bottom: 7px;">
            ★ Four Non-Negotiable Exam Success Principles for Paper 3:
          </div>
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 9px; font-size: 7.2pt; line-height: 1.38; color: #334155;">
            <div style="background: #fff; border: 1px solid #cbd5e1; border-radius: 5px; padding: 8px 9px;">
              <strong style="color: #1e3a8a; font-size: 7.8pt; display: block; margin-bottom: 2px;">1. Strict Time Budgeting</strong>
              Spend exactly 25 mins on Section A (6m on Q1, 18m on Q2) and 55 mins on Section B. Never run out of time for the 20-mark Q3(d) essay!
            </div>
            <div style="background: #fff; border: 1px solid #cbd5e1; border-radius: 5px; padding: 8px 9px;">
              <strong style="color: #1e3a8a; font-size: 7.8pt; display: block; margin-bottom: 2px;">2. Beyond the Stimulus</strong>
              In Q2, using only the two stimulus bullet points caps your score at Level 2 (6 marks). You must add detailed outside historical evidence.
            </div>
            <div style="background: #fff; border: 1px solid #cbd5e1; border-radius: 5px; padding: 8px 9px;">
              <strong style="color: #1e3a8a; font-size: 7.8pt; display: block; margin-bottom: 2px;">3. Provenance Purpose</strong>
              Never write "Source B is biased and therefore useless". Explain <em>why</em> the author's motive or audience makes the source revealing about contemporary attitudes.
            </div>
            <div style="background: #fff; border: 1px solid #cbd5e1; border-radius: 5px; padding: 8px 9px;">
              <strong style="color: #1e3a8a; font-size: 7.8pt; display: block; margin-bottom: 2px;">4. Criteria-Based Verdict</strong>
              In Q3(d), do not sit on the fence. Establish clear historical criteria (e.g. short-term tactical vs long-term strategic success) to deliver a decisive verdict.
            </div>
          </div>
        </div>
      </div>

      <div class="page-footer">
        <span>Pearson Edexcel GCSE (9–1) History &bull; Option 33: Conflict at Home and Abroad: the USA, 1954–75</span>
        <span class="page-num">2</span>
      </div>
    </div>
  `;

  // Pages 3–34: 16 Content Spreads
  let contentPagesHtml = '';
  SPREADS.forEach((spread, idx) => {
    const leftPageNum = 3 + idx * 2;
    const rightPageNum = 4 + idx * 2;
    const spreadNum = idx + 1;
    contentPagesHtml += renderLeftPage(spread, leftPageNum, spreadNum);
    contentPagesHtml += renderRightPage(spread, rightPageNum, spreadNum);
  });

  // Page 35: Master Chronology Timeline
  const page35 = `
    <div class="page" id="page_35" data-page="35">
      <div class="page-header">
        <div>
          <span class="archival-tag">Synoptic Chronology &bull; The Cold War &amp; Civil Rights</span>
          <h2 class="page-title">Master Comparative Timeline: Civil Rights vs The Vietnam War (1954–1975)</h2>
        </div>
        <div class="page-badge">Synoptic Synthesis</div>
      </div>

      <div style="display: flex; flex-direction: column; justify-content: space-between; height: 1010px;">
        <div style="background: #f8fafc; border-left: 4px solid #1e3a8a; border-radius: 4px; padding: 7px 10px; font-size: 7.2pt; color: #334155; line-height: 1.38;">
          <strong>Synoptic Insight:</strong> The domestic struggle for Black civil rights and the foreign military intervention in Vietnam occurred simultaneously, constantly influencing each other. Television news beamed violence from both fronts into American homes, while the disproportionate drafting of Black youths fueled the radicalization of the Black Power movement.
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; flex: 1; margin: 4px 0;">
          <!-- Civil Rights Timeline -->
          <div style="border: 1.5px solid #1e3a8a; border-radius: 5px; padding: 10px 12px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;">
            <div style="font-size: 8.8pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; border-bottom: 2px solid #1e3a8a; padding-bottom: 4px;">
              Civil Rights Movement (1954–1968)
            </div>
            <div style="display: flex; flex-direction: column; justify-content: space-between; flex: 1; padding: 6px 0; font-size: 7.1pt; line-height: 1.36; color: #1e293b;">
              <div><strong style="color: #1e3a8a; min-width: 68px; display: inline-block;">May 1954:</strong> Brown v. Board of Education outlaws legal school segregation.</div>
              <div><strong style="color: #1e3a8a; min-width: 68px; display: inline-block;">Aug 1955:</strong> Emmett Till murdered in Mississippi; killers acquitted by all-white jury.</div>
              <div><strong style="color: #1e3a8a; min-width: 68px; display: inline-block;">1955–1956:</strong> Montgomery Bus Boycott; Browder v. Gayle desegregates buses.</div>
              <div><strong style="color: #1e3a8a; min-width: 68px; display: inline-block;">Sep 1957:</strong> Eisenhower sends 101st Airborne to escort Little Rock Nine.</div>
              <div><strong style="color: #1e3a8a; min-width: 68px; display: inline-block;">Feb 1960:</strong> Greensboro Woolworth sit-ins ignite national direct-action wave.</div>
              <div><strong style="color: #1e3a8a; min-width: 68px; display: inline-block;">May 1961:</strong> CORE Freedom Rides; firebombing in Anniston; ICC ruling desegregates terminals.</div>
              <div><strong style="color: #1e3a8a; min-width: 68px; display: inline-block;">May 1963:</strong> Birmingham Campaign; Bull Connor deploys police dogs and high-pressure hoses.</div>
              <div><strong style="color: #1e3a8a; min-width: 68px; display: inline-block;">Aug 1963:</strong> March on Washington; 250,000 hear MLK's "I Have a Dream" speech.</div>
              <div><strong style="color: #1e3a8a; min-width: 68px; display: inline-block;">Jul 1964:</strong> President Johnson signs historic Civil Rights Act of 1964.</div>
              <div><strong style="color: #1e3a8a; min-width: 68px; display: inline-block;">Feb 1965:</strong> Malcolm X assassinated in New York City by Nation of Islam members.</div>
              <div><strong style="color: #1e3a8a; min-width: 68px; display: inline-block;">Mar 1965:</strong> Bloody Sunday at Selma; Voting Rights Act signed into law in August.</div>
              <div><strong style="color: #1e3a8a; min-width: 68px; display: inline-block;">Aug 1965:</strong> Watts Riot in Los Angeles; 34 dead; shift to northern economic rage.</div>
              <div><strong style="color: #1e3a8a; min-width: 68px; display: inline-block;">Jun 1966:</strong> Stokely Carmichael proclaims "Black Power" on Meredith March Against Fear.</div>
              <div><strong style="color: #1e3a8a; min-width: 68px; display: inline-block;">Oct 1966:</strong> Black Panther Party for Self-Defense founded in Oakland by Newton &amp; Seale.</div>
              <div><strong style="color: #1e3a8a; min-width: 68px; display: inline-block;">Jul 1967:</strong> "Long Hot Summer": devastating urban rebellions in Newark and Detroit.</div>
              <div><strong style="color: #1e3a8a; min-width: 68px; display: inline-block;">Mar 1968:</strong> Kerner Commission warns: "Our nation is moving toward two societies: separate, unequal."</div>
              <div><strong style="color: #1e3a8a; min-width: 68px; display: inline-block;">Apr 1968:</strong> Martin Luther King Jr. assassinated in Memphis; riots in over 100 cities.</div>
              <div><strong style="color: #1e3a8a; min-width: 68px; display: inline-block;">Apr 1968:</strong> Fair Housing Act passes; conclusion of the classical civil rights movement.</div>
            </div>
          </div>

          <!-- Vietnam War Timeline -->
          <div style="border: 1.5px solid #0f172a; border-radius: 5px; padding: 10px 12px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;">
            <div style="font-size: 8.8pt; font-weight: 800; color: #0f172a; text-transform: uppercase; border-bottom: 2px solid #0f172a; padding-bottom: 4px;">
              Vietnam War &amp; Home Front (1954–1975)
            </div>
            <div style="display: flex; flex-direction: column; justify-content: space-between; flex: 1; padding: 6px 0; font-size: 7.1pt; line-height: 1.36; color: #1e293b;">
              <div><strong style="color: #0f172a; min-width: 68px; display: inline-block;">May 1954:</strong> French fortress falls at Dien Bien Phu; Geneva Accords divide Vietnam at 17th parallel.</div>
              <div><strong style="color: #0f172a; min-width: 68px; display: inline-block;">1955–1956:</strong> Ngo Dinh Diem proclaims Republic of Vietnam; refuses nationwide elections.</div>
              <div><strong style="color: #0f172a; min-width: 68px; display: inline-block;">Dec 1960:</strong> National Liberation Front (Vietcong) established in South Vietnam.</div>
              <div><strong style="color: #0f172a; min-width: 68px; display: inline-block;">1961–1963:</strong> Kennedy escalates US presence: 16,000 military advisers and Green Berets sent.</div>
              <div><strong style="color: #0f172a; min-width: 68px; display: inline-block;">May–Nov 1963:</strong> Buddhist Crisis and self-immolations; Diem overthrown and executed in coup.</div>
              <div><strong style="color: #0f172a; min-width: 68px; display: inline-block;">Aug 1964:</strong> Gulf of Tonkin Incident; Congress passes Tonkin Resolution granting LBJ blank check.</div>
              <div><strong style="color: #0f172a; min-width: 68px; display: inline-block;">Feb 1965:</strong> Operation Rolling Thunder begins; 3-year sustained aerial bombing of North Vietnam.</div>
              <div><strong style="color: #0f172a; min-width: 68px; display: inline-block;">Mar 1965:</strong> 3,500 US Marines land at Da Nang; launch of direct American ground combat role.</div>
              <div><strong style="color: #0f172a; min-width: 68px; display: inline-block;">1965–1967:</strong> Westmoreland's Search &amp; Destroy sweeps; Cu Chi tunnel warfare; defoliation with Agent Orange.</div>
              <div><strong style="color: #0f172a; min-width: 68px; display: inline-block;">Jan 1968:</strong> Tet Offensive launched; VC infiltrate US Embassy; Walter Cronkite declares war a stalemate.</div>
              <div><strong style="color: #0f172a; min-width: 68px; display: inline-block;">Mar 1968:</strong> My Lai Massacre of over 500 civilians; LBJ announces he will not seek re-election.</div>
              <div><strong style="color: #0f172a; min-width: 68px; display: inline-block;">Jan 1969:</strong> Richard Nixon inaugurated; introduces "Vietnamization" and gradual troop withdrawals.</div>
              <div><strong style="color: #0f172a; min-width: 68px; display: inline-block;">Mar 1969:</strong> Operation Menu: secret B-52 carpet bombing of neutral Cambodia ordered by Nixon.</div>
              <div><strong style="color: #0f172a; min-width: 68px; display: inline-block;">Nov 1969:</strong> Nixon appeals to the "Great Silent Majority"; 500,000 anti-war marchers converge on DC.</div>
              <div><strong style="color: #0f172a; min-width: 68px; display: inline-block;">May 1970:</strong> US ground invasion of Cambodia triggers nationwide strikes; 4 students shot at Kent State.</div>
              <div><strong style="color: #0f172a; min-width: 68px; display: inline-block;">Jan 1973:</strong> Paris Peace Accords signed; remaining US combat troops withdraw; 591 POWs repatriated.</div>
              <div><strong style="color: #0f172a; min-width: 68px; display: inline-block;">Nov 1973:</strong> War Powers Act enacted over Nixon's veto, sharply restricting presidential war-making power.</div>
              <div><strong style="color: #0f172a; min-width: 68px; display: inline-block;">Apr 1975:</strong> North Vietnamese Spring Offensive; Operation Frequent Wind helicopter airlift; Fall of Saigon.</div>
            </div>
          </div>
        </div>

        <div style="background: #fafafa; border: 1.5px solid #0f172a; border-radius: 5px; padding: 7px 10px; font-size: 6.8pt; color: #1e293b; line-height: 1.34;">
          <strong>Examiner Synoptic Takeaway:</strong> Notice how <strong>1964</strong> (Civil Rights Act + Tonkin Resolution), <strong>1965</strong> (Voting Rights Act + Combat Troop Deployment), and <strong>1968</strong> (Tet Offensive + King Assassination + Urban Riots) represent decisive pivot points where foreign conflict and domestic turmoil collided to reshape modern American politics.
        </div>
      </div>

      <div class="page-footer">
        <span>Pearson Edexcel GCSE (9–1) History &bull; Option 33: Conflict at Home and Abroad: the USA, 1954–75</span>
        <span class="page-num">35</span>
      </div>
    </div>
  `;

  // Page 36: Historiography Masterclass
  const page36 = `
    <div class="page" id="page_36" data-page="36">
      <div class="page-header">
        <div>
          <span class="archival-tag">Historiography &bull; Academic Interpretations</span>
          <h2 class="page-title">Historical Interpretations Guide: Key Historians &amp; Competing Schools</h2>
        </div>
        <div class="page-badge">Paper 3 Section B</div>
      </div>

      <div style="display: flex; flex-direction: column; justify-content: space-between; height: 1010px;">
        <div style="background: #f8fafc; border-left: 4px solid #1e3a8a; border-radius: 4px; padding: 9px 12px; font-size: 7.6pt; color: #334155; line-height: 1.40;">
          <strong>Why Historiography Matters:</strong> In Question 3(d) [16m + 4 SPaG], Level 4 marks require students to demonstrate sophisticated awareness of why historians reach contrasting conclusions. Use this guide to cite academic perspectives and understand the ideological foundations behind differing interpretations.
        </div>

        <!-- Historiographical Schools Grid -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
          <!-- Civil Rights Historiography -->
          <div style="border: 1.5px solid #1e3a8a; border-radius: 5px; padding: 9px 10px; background: #ffffff; display: flex; flex-direction: column; gap: 7px;">
            <div style="font-size: 8.8pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; border-bottom: 2px solid #1e3a8a; padding-bottom: 3px;">
              Civil Rights Movement: Competing Perspectives
            </div>

            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; padding: 7px 8px;">
              <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
                <strong style="font-size: 7.8pt; color: #1e3a8a;">1. The "Top-Down" Presidential School</strong>
                <span style="font-size: 6.6pt; color: #64748b; font-weight: 700;">Newman, Dallek, Caro</span>
              </div>
              <p style="font-size: 7.0pt; color: #1e293b; margin: 0 0 3px 0; line-height: 1.34;">
                <strong>Core Thesis:</strong> Argues that legislative breakthroughs required executive leverage. Lyndon B. Johnson's ruthless parliamentary arm-twisting, bipartisan coalition-building, and Supreme Court rulings were the essential engines that turned moral protest into enforceable federal law.
              </p>
              <div style="font-size: 6.6pt; color: #475569; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 3px; padding: 3px 6px; line-height: 1.28;">
                <strong>Q3(d) Application:</strong> Cite when defending interpretations crediting LBJ or Eisenhower; emphasize that street demonstrations alone could not break Southern Senate filibusters without executive intervention.
              </div>
            </div>

            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; padding: 7px 8px;">
              <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
                <strong style="font-size: 7.8pt; color: #1e3a8a;">2. The "Bottom-Up" Grassroots School</strong>
                <span style="font-size: 6.6pt; color: #64748b; font-weight: 700;">Carson, Payne, Chafe</span>
              </div>
              <p style="font-size: 7.0pt; color: #1e293b; margin: 0 0 3px 0; line-height: 1.34;">
                <strong>Core Thesis:</strong> Rejects the "Great Men" narrative centered on MLK and LBJ. Emphasizes courageous local activists, rural sharecroppers, and student organizers in SNCC and CORE who forced reluctant federal officials into action by creating unmanageable local crises on the ground.
              </p>
              <div style="font-size: 6.6pt; color: #475569; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 3px; padding: 3px 6px; line-height: 1.28;">
                <strong>Q3(d) Application:</strong> Cite when evaluating interpretations praising local community resistance (e.g. Montgomery carpools, Greensboro students, Mississippi Freedom Democratic Party).
              </div>
            </div>

            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; padding: 7px 8px;">
              <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
                <strong style="font-size: 7.8pt; color: #1e3a8a;">3. The Black Power Revisionist School</strong>
                <span style="font-size: 6.6pt; color: #64748b; font-weight: 700;">Joseph, Theoharis, Bloom</span>
              </div>
              <p style="font-size: 7.0pt; color: #1e293b; margin: 0 0 3px 0; line-height: 1.34;">
                <strong>Core Thesis:</strong> Overturns the traditional view that Black Power derailed the civil rights movement. Highlights how the Black Panthers addressed systemic northern ghettoization, police brutality, and community healthcare that non-violent southern campaigns had failed to solve.
              </p>
              <div style="font-size: 6.6pt; color: #475569; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 3px; padding: 3px 6px; line-height: 1.28;">
                <strong>Q3(d) Application:</strong> Cite when balancing Malcolm X or Panther radicalism against King's non-violence; evaluate whether self-defense was a logical response to unyielding state-sanctioned violence.
              </div>
            </div>
          </div>

          <!-- Vietnam War Historiography -->
          <div style="border: 1.5px solid #0f172a; border-radius: 5px; padding: 9px 10px; background: #ffffff; display: flex; flex-direction: column; gap: 7px;">
            <div style="font-size: 8.8pt; font-weight: 800; color: #0f172a; text-transform: uppercase; border-bottom: 2px solid #0f172a; padding-bottom: 3px;">
              The Vietnam War: The Great Historical Debate
            </div>

            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; padding: 7px 8px;">
              <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
                <strong style="font-size: 7.8pt; color: #0f172a;">1. The Orthodox / Liberal School</strong>
                <span style="font-size: 6.6pt; color: #64748b; font-weight: 700;">Herring, Sheehan, Halberstam</span>
              </div>
              <p style="font-size: 7.0pt; color: #1e293b; margin: 0 0 3px 0; line-height: 1.34;">
                <strong>Core Thesis:</strong> Asserts the war was fundamentally unwinnable. The US intervened blindly in an anti-colonial civil war, propping up an illegitimate and corrupt Saigon regime that could never command peasant loyalty against a determined nationalist insurgency.
              </p>
              <div style="font-size: 6.6pt; color: #475569; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 3px; padding: 3px 6px; line-height: 1.28;">
                <strong>Q3(d) Application:</strong> Deploy when agreeing with interpretations highlighting US tactical bankruptcy, the failure of Search &amp; Destroy, and the alienation of South Vietnamese villagers.
              </div>
            </div>

            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; padding: 7px 8px;">
              <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
                <strong style="font-size: 7.8pt; color: #0f172a;">2. The Revisionist / Conservative School</strong>
                <span style="font-size: 6.6pt; color: #64748b; font-weight: 700;">Moyar, Summers, Lewy</span>
              </div>
              <p style="font-size: 7.0pt; color: #1e293b; margin: 0 0 3px 0; line-height: 1.34;">
                <strong>Core Thesis:</strong> Argues the conflict was noble and militarily winnable. Contends the US defeated the Vietcong militarily (especially during Tet 1968), but was undermined by political micromanagement from Washington, sensationalist media coverage, and congressional aid cuts in 1974.
              </p>
              <div style="font-size: 6.6pt; color: #475569; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 3px; padding: 3px 6px; line-height: 1.28;">
                <strong>Q3(d) Application:</strong> Deploy when evaluating military perspectives on Tet 1968 or Operation Linebacker; contrast tactical battle victories with political and public-opinion defeat.
              </div>
            </div>

            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; padding: 7px 8px;">
              <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
                <strong style="font-size: 7.8pt; color: #0f172a;">3. The Post-Revisionist / Vietnamese-Centric School</strong>
                <span style="font-size: 6.6pt; color: #64748b; font-weight: 700;">Nguyen, Appy, Brigham</span>
              </div>
              <p style="font-size: 7.0pt; color: #1e293b; margin: 0 0 3px 0; line-height: 1.34;">
                <strong>Core Thesis:</strong> Moves beyond American ethnocentrism by consulting North and South Vietnamese archives. Shows that Hanoi pursued total reunification through ruthless political control, while South Vietnam had genuine nationalists crushed between communist violence and US intervention.
              </p>
              <div style="font-size: 6.6pt; color: #475569; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 3px; padding: 3px 6px; line-height: 1.28;">
                <strong>Q3(d) Application:</strong> Deploy to reach Level 4 complex judgements examining the agency of the Vietnamese actors, Sino-Soviet aid rivalries, and the asymmetric resilience of the NLF.
              </div>
            </div>
          </div>
        </div>

        <!-- Diagnostic Matrix for Q3(c) & Q3(d) -->
        <div style="border: 1.5px solid #0f172a; border-radius: 5px; padding: 10px 12px; background: #ffffff;">
          <div style="font-size: 8.6pt; font-weight: 800; color: #0f172a; text-transform: uppercase; margin-bottom: 6px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #cbd5e1; padding-bottom: 3px;">
            <span>★ The Historian's Craft: Three Drivers of Conflicting Interpretations (Q3c &amp; Q3d Framework)</span>
            <span style="font-size: 6.8pt; color: #1e3a8a; font-weight: 700;">Diagnostic Rubric</span>
          </div>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; font-size: 7.0pt; line-height: 1.36; color: #334155;">
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; padding: 7px 8px;">
              <strong style="color: #1e3a8a; font-size: 7.6pt; display: block; margin-bottom: 2px;">1. Divergent Evidence Bases</strong>
              Historians consult different archival collections. A study utilizing White House tapes or congressional committee hearings naturally emphasizes legislative leadership; a study examining SNCC field diaries or NLF combat logs naturally centers grassroots suffering and resilience.
            </div>
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; padding: 7px 8px;">
              <strong style="color: #1e3a8a; font-size: 7.6pt; display: block; margin-bottom: 2px;">2. Conflicting Criteria for 'Success'</strong>
              Authors define historical efficacy differently. Military revisionists evaluate the Vietnam conflict by tactical kill ratios and enemy containment; orthodox and anti-war historians define the war by its political failure to build a viable, legitimate South Vietnamese state.
            </div>
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; padding: 7px 8px;">
              <strong style="color: #1e3a8a; font-size: 7.6pt; display: block; margin-bottom: 2px;">3. Historiographical Era &amp; Context</strong>
              The era of publication shapes academic perspective. Immediate post-war accounts (1970s) were colored by anti-war protests and the Watergate scandal; 21st-century scholars benefit from declassified Hanoi archives and Chinese/Soviet diplomatic telegrams.
            </div>
          </div>
        </div>

        <!-- Evaluative Essay Toolkit -->
        <div style="background: #fafafa; border: 1.5px solid #0f172a; border-radius: 5px; padding: 10px 14px; font-size: 7.4pt; color: #1e293b; line-height: 1.38;">
          <strong>Evaluative Conjunctions &amp; Analysis Toolkit:</strong> When writing the Q3(d) essay, use sophisticated analytical markers: <em>"While Interpretation 1 convincingly captures the moral impetus generated by grassroots activists, it understates the constitutional bottleneck that only executive power could dismantle..."</em> &bull; <em>"Consequently, the validity of Interpretation 2 depends upon whether one evaluates success through a narrow tactical military lens or an overarching geopolitical perspective."</em>
        </div>
      </div>

      <div class="page-footer">
        <span>Pearson Edexcel GCSE (9–1) History &bull; Option 33: Conflict at Home and Abroad: the USA, 1954–75</span>
        <span class="page-num">36</span>
      </div>
    </div>
  `;

  // Complete HTML document
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Edexcel GCSE (9–1) History Paper 3: Conflict at Home and Abroad: the USA, 1954–75 &bull; Visual Revision &amp; Exam Guide</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600&family=Outfit:wght@300;400;500;600;700;800&display=swap');

    * { box-sizing: border-box; }
    body {
      font-family: 'Outfit', sans-serif;
      margin: 0;
      padding: 0;
      background: #e2e8f0;
      color: #0f172a;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .page {
      width: 794px;
      height: 1123px;
      max-height: 1123px;
      overflow: hidden;
      background: #ffffff;
      margin: 0 auto 10px auto;
      padding: 24px 28px;
      position: relative;
      page-break-after: always;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    @media print {
      body { background: #ffffff; }
      .page {
        margin: 0;
        box-shadow: none;
        page-break-after: always;
      }
    }

    /* Header */
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 2px solid #0f172a;
      padding-bottom: 5px;
      margin-bottom: 6px;
    }
    .archival-tag {
      font-size: 6.8pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: #1e3a8a;
      display: block;
      margin-bottom: 1px;
    }
    .page-title {
      font-family: 'Playfair Display', serif;
      font-size: 11pt;
      font-weight: 800;
      color: #0f172a;
      margin: 0;
      line-height: 1.15;
    }
    .page-badge {
      background: #1e3a8a;
      color: #ffffff;
      font-size: 6.5pt;
      font-weight: 700;
      padding: 3px 7px;
      border-radius: 3px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      white-space: nowrap;
    }

    /* Footer */
    .page-footer {
      border-top: 1px solid #cbd5e1;
      padding-top: 4px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 6.5pt;
      color: #64748b;
      margin-top: 4px;
    }
    .page-num {
      font-weight: 800;
      color: #0f172a;
      font-size: 7.5pt;
    }

    /* Lines for answer writing (18.5px dotted ruling matching standard 8mm exercise book) */
    .line {
      height: 18.5px;
      border-bottom: 1px dotted #94a3b8;
      width: 100%;
    }

    /* Cover Styling (Clean White Ink-Friendly Print Standard) */
    .cover-page {
      padding: 24px 28px;
      background: #ffffff;
      color: #0f172a;
    }
    .cover-border {
      border: 2.5px solid #0f172a;
      outline: 1px solid #1e3a8a;
      outline-offset: -6px;
      height: 100%;
      border-radius: 4px;
      padding: 24px 22px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: #ffffff;
    }
    .cover-header {
      border-bottom: 2px solid #0f172a;
      padding-bottom: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .archival-shelfmark-stamp {
      font-size: 8pt;
      font-weight: 800;
      letter-spacing: 1px;
      color: #1e3a8a;
    }
    .cover-spec-code {
      font-size: 7.5pt;
      font-weight: 700;
      color: #475569;
    }
    .cover-hero-title {
      margin: 14px 0 6px 0;
      text-align: center;
    }
    .cover-hero-title h1 {
      font-family: 'Playfair Display', serif;
      font-size: 25pt;
      font-weight: 800;
      color: #0f172a;
      margin: 0 0 6px 0;
      letter-spacing: 0.5px;
      line-height: 1.1;
    }
    .cover-hero-title h2 {
      font-family: 'Playfair Display', serif;
      font-size: 13pt;
      font-weight: 700;
      color: #1e3a8a;
      margin: 0 0 8px 0;
      letter-spacing: 0.3px;
    }
    .cover-tagline {
      font-size: 7.8pt;
      color: #475569;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.8px;
    }
    .cover-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin: 10px 0;
    }
    .cover-card {
      background: #f8fafc;
      border: 1.2px solid #cbd5e1;
      border-radius: 5px;
      padding: 10px 12px;
    }
    .cover-card-num {
      font-size: 7pt;
      font-weight: 800;
      color: #1e3a8a;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 2px;
    }
    .cover-card h3 {
      font-family: 'Playfair Display', serif;
      font-size: 10.5pt;
      color: #0f172a;
      margin: 0 0 4px 0;
    }
    .cover-card p {
      font-size: 7pt;
      color: #334155;
      line-height: 1.35;
      margin: 0;
    }
    .cover-footer {
      border-top: 2px solid #0f172a;
      padding-top: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .cover-footer-left {
      font-size: 7.5pt;
      color: #475569;
      line-height: 1.4;
    }
    .cover-footer-left strong {
      color: #0f172a;
      font-size: 8pt;
    }
  </style>
</head>
<body>
  ${page1}
  ${page2}
  ${contentPagesHtml}
  ${page35}
  ${page36}
</body>
</html>
`;
}

// Main Execution
async function run() {
  console.log('🚀 Compiling Edexcel GCSE Paper 3 (USA, 1954–75) Visual Revision & Exam Guide...');
  const htmlContent = generateFullHTML();
  fs.writeFileSync(HTML_OUT_PUBLIC, htmlContent, 'utf8');
  console.log(
    `📄 HTML rendered to ${HTML_OUT_PUBLIC} (${(htmlContent.length / 1024).toFixed(1)} KB)`,
  );

  console.log('🌐 Launching Puppeteer for print compilation and layout validation...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--allow-file-access-from-files'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });
  await page.goto(pathToFileURL(HTML_OUT_PUBLIC).href, { waitUntil: 'networkidle0' });
  await page.evaluateHandle('document.fonts.ready');

  // Strict Layout Overflow Audit
  const overflowReports = await page.evaluate(() => {
    const pages = Array.from(document.querySelectorAll('.page'));
    const overflows = [];
    pages.forEach((p, idx) => {
      const pageNum = p.getAttribute('data-page') || idx + 1;
      const scrollHeight = p.scrollHeight;
      if (scrollHeight > 1124) {
        overflows.push({
          pageNum,
          id: p.id,
          scrollHeight,
          overflowBy: scrollHeight - 1123,
        });
      }
    });
    return { totalPages: pages.length, overflows };
  });

  console.log(`📐 Page layout report: Total pages rendered = ${overflowReports.totalPages}`);
  if (overflowReports.overflows.length > 0) {
    const details = overflowReports.overflows
      .map(
        (o) =>
          `Page ${o.pageNum} (#${o.id}): ${o.scrollHeight}px (overflows by +${o.overflowBy}px)`,
      )
      .join('\n');
    throw new Error(`PDF Generation halted due to page overflow:\n${details}`);
  }
  console.log(
    '✅ Automated Overflow Check: All 36 pages fit cleanly within 1123px bounds (0 overflows)!',
  );

  // Export PDF to unit and public directories
  await page.pdf({
    path: PDF_OUT_UNIT,
    format: 'A4',
    landscape: false,
    printBackground: true,
    margin: { top: '0', bottom: '0', left: '0', right: '0' },
  });
  console.log(`📕 Exported unit PDF: ${PDF_OUT_UNIT}`);

  fs.copyFileSync(PDF_OUT_UNIT, PDF_OUT_PUBLIC);
  console.log(`📋 Synced PDF to public/pdfs/: ${PDF_OUT_PUBLIC}`);

  // Copy to Google Drive Department File
  try {
    const driveDir = path.dirname(PDF_OUT_GDRIVE);
    if (!fs.existsSync(driveDir)) {
      fs.mkdirSync(driveDir, { recursive: true });
    }
    fs.copyFileSync(PDF_OUT_UNIT, PDF_OUT_GDRIVE);
    console.log(`💾 Synced PDF to Google Drive Department File:\n   ${PDF_OUT_GDRIVE}`);
  } catch (err) {
    console.warn(`⚠️ Could not copy to Google Drive: ${err.message}`);
  }

  await browser.close();
  console.log(
    '\n🎉 SUCCESS: 36-Page Complete Edexcel GCSE Paper 3 USA Visual Revision & Exam Assessment Guide is compiled!',
  );
}

run().catch((err) => {
  console.error('❌ Error generating USA visual guide:', err);
  process.exit(1);
});
