/**
 * usa_exam_practice_data.cjs
 *
 * Full Edexcel GCSE History Paper 3 (Option 33: Conflict at Home and Abroad:
 * the USA, 1954–75) Exam Practice Suite.
 *
 * Provides complete dual-question pairs for all 16 lessons:
 *   - Question 1 [4 marks]: Source Inference (Inference + Quote formula)
 *   - Question 2 [12 marks]: Causation Essay (PEEL structure strip + 2 stimulus points)
 *
 * Fully populated with:
 *   - Acronyms & guidance
 *   - Scaffolding steps & sentence starters
 *   - High-scoring model answers (Level 4 standard)
 */

const USA_EXAM_PRACTICE_DATA = {
  // =========================================================================
  // KEY TOPIC 1: CIVIL RIGHTS IN THE 1950s (Lessons 1–4)
  // =========================================================================

  lesson_1_1: {
    title: "Edexcel GCSE (9–1) Paper 3 Exam Practice",
    tariff: "16 marks (Q1 Inference [4m] & Q2 Causation Essay [12m])",
    questions: [
      {
        tariff: "4 marks",
        type: "inference_4m",
        question: "1. Give two things you can infer from Source A about legal segregation in the American South in the early 1950s. [4 marks]",
        prompt: "Give two separate inferences. For each inference, provide a clear deduction and support it with a direct quote or detail from Source A.",
        model: "<p><strong>(i) What I can infer:</strong><br>I can infer that racial segregation was strictly enforced by state law and physical separation across public facilities.<br><strong>Details in the source that tell me this:</strong><br>The statute explicitly mandates separate waiting rooms, water fountains, and transport seating, threatening criminal prosecution for integration.</p><p><strong>(ii) What I can infer:</strong><br>I can infer that the legal doctrine of 'separate but equal' functioned in practice to enforce racial inequality and white dominance.<br><strong>Details in the source that tell me this:</strong><br>The statute reserves superior, central facilities exclusively for white patrons while relegating Black citizens to substandard, segregated areas.</p>",
        scaffolding: {
          acronym: "Inference + Detail Formula (AO3)",
          acronym_title: "Inference Formula: (i) Inference + Quote, (ii) Inference + Quote",
          steps: [
            { letter: "I1", name: "First Inference", prompt: "State your first deduction about legal segregation (do not just copy words).", starter: "What I can infer: I can infer that legal segregation in the South was..." },
            { letter: "Q1", name: "Supporting Detail", prompt: "Quote the precise detail from Source A that supports your deduction.", starter: "Details in the source that tell me this: The source explicitly states that..." },
            { letter: "I2", name: "Second Inference", prompt: "State your second, distinct deduction about how the laws functioned.", starter: "What I can infer: Furthermore, I can infer that the legal system..." },
            { letter: "Q2", name: "Supporting Detail", prompt: "Quote the second detail from Source A confirming this inference.", starter: "Details in the source that tell me this: The extract demonstrates this by noting that..." }
          ]
        }
      },
      {
        tariff: "12 marks",
        type: "explain_why_12",
        question: "2. Explain why it was difficult for Black Americans in the Southern states to exercise their civil rights in the early 1950s. [12 marks]",
        stimulus: [
          "Jim Crow laws and legal disenfranchisement",
          "The Ku Klux Klan (KKK) and white supremacist terror"
        ],
        prompt: "Write a three-paragraph causal explanation using PEEL paragraphs. Integrate the two stimulus points and your own detailed historical knowledge.",
        model: "One major reason why it was exceptionally difficult for Black Americans to exercise their civil rights was the institutional system of <strong>Jim Crow laws and voter disenfranchisement</strong> enforced by Southern state governments. Following the 1896 Supreme Court ruling in Plessy v. Ferguson, Southern states legally segregated every aspect of public life, from transport to schools. To prevent Black political representation, registrars used deliberately rigged literacy tests, complex constitutional quizzes, and cumulative poll taxes that impoverished Black sharecroppers could not afford. Consequently, Black voter registration remained below five percent across states like Mississippi and Alabama, denying Black citizens the democratic power to challenge systemic oppression.<br><br>A second decisive barrier was the pervasive atmosphere of <strong>white supremacist terror and violence</strong> spearheaded by the Ku Klux Klan (KKK) and local law enforcement. Black citizens who attempted to register to vote, challenge segregation, or demand fair wages faced severe economic retaliation, including immediate dismissal from jobs and eviction by white landlords. More brutally, violence and extralegal terror were routinely deployed, including house bombings, beatings, and lynchings—such as the brutal 1955 murder of fourteen-year-old Emmett Till. Because all-white juries routinely acquitted white murderers, Black Americans lived under constant intimidation with zero protection from local police.<br><br>Finally, an underlying reason was the <strong>failure of the federal government</strong> to enforce constitutional amendments. While the 14th and 15th Amendments guaranteed equal protection and voting rights, the executive and legislative branches in Washington were paralyzed by powerful Southern segregationist Democrats in Congress who filibustered civil rights bills. Without federal marshals or federal legislation to compel Southern states to comply with the constitution, Southern governors and judges maintained an unchecked racist monopoly over state institutions.",
        scaffolding: {
          acronym: "PEEL Structure Strip",
          acronym_title: "12-Mark Causal Explanation (Point • Evidence • Explain • Link)",
          steps: [
            { letter: "CAUSE 1", name: "Jim Crow Laws & Disenfranchisement", prompt: "Explain how literacy tests, poll taxes, and legal segregation blocked voting rights.", starter: "One major reason why civil rights were denied was the institutional system of Jim Crow laws..." },
            { letter: "CAUSE 2", name: "KKK Terror & Economic Retaliation", prompt: "Explain how the KKK, lynchings, police brutality, and evictions terrorized Black citizens.", starter: "Furthermore, a second decisive barrier was the pervasive threat of violence orchestrated by the KKK..." },
            { letter: "CAUSE 3", name: "Federal Inaction & Southern Legal Control", prompt: "Explain how Southern Democrats in Congress and all-white courts blocked federal intervention.", starter: "Finally, an underlying factor was the lack of federal enforcement of constitutional rights..." }
          ],
          sentence_starters: [
            "One major reason was...",
            "For example, ...",
            "This meant that...",
            "Therefore, this made it difficult because...",
            "A second key factor was...",
            "Consequently, this resulted in..."
          ],
          connectives_bank: ["Jim Crow", "Plessy v. Ferguson", "Poll taxes", "Literacy tests", "Disenfranchisement", "Ku Klux Klan", "Emmett Till", "14th Amendment", "15th Amendment"]
        }
      }
    ]
  },

  lesson_1_2: {
    title: "Edexcel GCSE (9–1) Paper 3 Exam Practice",
    tariff: "16 marks (Q1 Inference [4m] & Q2 Causation Essay [12m])",
    questions: [
      {
        tariff: "4 marks",
        type: "inference_4m",
        question: "1. Give two things you can infer from Source A about the opposition faced by Black students attempting to desegregate Southern schools in 1957. [4 marks]",
        prompt: "Give two separate inferences supported by precise details from Source A (photograph of Elizabeth Eckford at Little Rock Central High).",
        model: "<p><strong>(i) What I can infer:</strong><br>I can infer that Black students faced overwhelming, aggressive hostility from ordinary white community members.<br><strong>Details in the source that tell me this:</strong><br>The photograph shows an angry crowd of white adults and teenagers screaming abuse directly behind Elizabeth Eckford as she walks alone.</p><p><strong>(ii) What I can infer:</strong><br>I can infer that the students required immense personal courage and dignity to confront state-supported segregation.<br><strong>Details in the source that tell me this:</strong><br>Elizabeth Eckford walks forward calmly with her eyes fixed ahead and books in hand, refusing to retaliate or flee despite terrifying intimidation.</p>",
        scaffolding: {
          acronym: "Inference + Detail Formula (AO3)",
          acronym_title: "Inference Formula: (i) Inference + Quote, (ii) Inference + Quote",
          steps: [
            { letter: "I1", name: "First Inference", prompt: "State what you deduce about the white community's aggressive reaction.", starter: "What I can infer: I can infer that Black students faced violent hostility..." },
            { letter: "Q1", name: "Supporting Detail", prompt: "Quote or describe the specific visual detail in Source A showing this anger.", starter: "Details in the source that tell me this: The photograph shows crowds screaming abuse..." },
            { letter: "I2", name: "Second Inference", prompt: "State what you deduce about the personal composure of Elizabeth Eckford.", starter: "What I can infer: A second inference is that the students demonstrated remarkable courage..." },
            { letter: "Q2", name: "Supporting Detail", prompt: "Identify the detail in the image demonstrating her stoic composure.", starter: "Details in the source that tell me this: She walks calmly with her head held high..." }
          ]
        }
      },
      {
        tariff: "12 marks",
        type: "explain_why_12",
        question: "2. Explain why the Supreme Court decision in Brown v. Board of Education (1954) was a turning point in the struggle for civil rights. [12 marks]",
        stimulus: [
          "The legal doctrine of 'separate but equal'",
          "The role of the NAACP and Thurgood Marshall"
        ],
        prompt: "Write a three-paragraph PEEL essay explaining the constitutional, psychological, and practical impact of the Brown ruling.",
        model: "One major reason why Brown v. Board of Education was a decisive turning point was that it overturned the constitutional doctrine of <strong>'separate but equal'</strong> established by Plessy v. Ferguson in 1896. Chief Justice Earl Warren delivered an unanimous 9–0 verdict, ruling that legally segregated schools were 'inherently unequal' and violated the 14th Amendment's Equal Protection Clause. By dismantling the legal foundation of segregation in education, the Supreme Court provided civil rights lawyers with an unassailable constitutional precedent that could subsequently be used to challenge segregation in housing, transportation, and public facilities across the nation.<br><br>Furthermore, the ruling demonstrated the strategic success of the <strong>NAACP Legal Defense Fund</strong> led by Thurgood Marshall. Marshall meticulously deployed psychological and sociological evidence—such as Kenneth and Mamie Clark’s famous 'doll tests'—to prove that state-mandated segregation inflicted profound, permanent psychological harm on Black children's self-esteem. This victory proved to civil rights activists that the federal judiciary could be utilized as an effective weapon against state-level white supremacy, inspiring grassroots organizations to escalate legal and non-violent direct action.<br><br>Finally, Brown functioned as a catalyst by exposing the ferocious nature of <strong>Southern 'Massive Resistance'</strong>, thereby compelling the executive branch to intervene directly. When Southern politicians signed the Southern Manifesto in 1956 and Arkansas Governor Orval Faubus deployed the National Guard to block the Little Rock Nine in 1957, President Eisenhower was forced to send in the 101st Airborne Division. This established the crucial precedent that the federal government would deploy military force to enforce Supreme Court integration orders against defiant states.",
        scaffolding: {
          acronym: "PEEL Structure Strip",
          acronym_title: "12-Mark Causal Explanation (Point • Evidence • Explain • Link)",
          steps: [
            { letter: "CAUSE 1", name: "Overturning 'Separate but Equal'", prompt: "Explain how Warren's 9-0 ruling shattered Plessy v. Ferguson under the 14th Amendment.", starter: "One major reason why Brown was a turning point was that it struck down 'separate but equal'..." },
            { letter: "CAUSE 2", name: "NAACP Strategy & Precedent", prompt: "Explain Thurgood Marshall's psychological arguments and the new legal momentum.", starter: "Furthermore, the case proved the power of NAACP legal challenges in federal courts..." },
            { letter: "CAUSE 3", name: "Triggering Federal Military Enforcement", prompt: "Explain how Southern resistance at Little Rock forced Eisenhower to send federal troops.", starter: "Finally, the ruling was a turning point because it compelled federal intervention..." }
          ],
          sentence_starters: ["One major reason was...", "For example, ...", "This was significant because...", "Therefore, this represented a turning point...", "Furthermore, ...", "Consequently, ..."],
          connectives_bank: ["Earl Warren", "Plessy v. Ferguson", "Thurgood Marshall", "NAACP", "14th Amendment", "Little Rock Nine", "Eisenhower", "101st Airborne"]
        }
      }
    ]
  },

  lesson_1_3: {
    title: "Edexcel GCSE (9–1) Paper 3 Exam Practice",
    tariff: "16 marks (Q1 Inference [4m] & Q2 Causation Essay [12m])",
    questions: [
      {
        tariff: "4 marks",
        type: "inference_4m",
        question: "1. Give two things you can infer from Source A about the determination of the Black community during the Montgomery Bus Boycott (1955–56). [4 marks]",
        prompt: "Give two separate inferences based on Source A (MLK addressing 5,000 supporters at Holt Street Baptist Church).",
        model: "<p><strong>(i) What I can infer:</strong><br>I can infer that the boycott was supported by massive, unified community mobilization centered around the Black church.<br><strong>Details in the source that tell me this:</strong><br>Over 5,000 citizens packed inside and overflowed outside Holt Street Baptist Church to endorse the boycott unanimously.</p><p><strong>(ii) What I can infer:</strong><br>I can infer that leaders framed the boycott as a moral, disciplined campaign grounded in Christian non-violence.<br><strong>Details in the source that tell me this:</strong><br>Dr. King urged the crowd to protest courageously yet without violence, declaring that their only weapon was the weapon of protest.</p>",
        scaffolding: {
          acronym: "Inference + Detail Formula (AO3)",
          acronym_title: "Inference Formula: (i) Inference + Quote, (ii) Inference + Quote",
          steps: [
            { letter: "I1", name: "First Inference", prompt: "Deduce the scale of mass community mobilization and unity.", starter: "What I can infer: I can infer that the boycott enjoyed overwhelming community solidarity..." },
            { letter: "Q1", name: "Supporting Detail", prompt: "Quote the extract regarding attendance and overflow crowds at the church.", starter: "Details in the source that tell me this: The source notes that thousands filled the church..." },
            { letter: "I2", name: "Second Inference", prompt: "Deduce the ideological and religious commitment to non-violence.", starter: "What I can infer: A second inference is that the campaign was anchored in Christian non-violence..." },
            { letter: "Q2", name: "Supporting Detail", prompt: "Quote Dr. King's words about protest and moral discipline.", starter: "Details in the source that tell me this: King stated that love and protest were their guiding principles..." }
          ]
        }
      },
      {
        tariff: "12 marks",
        type: "explain_why_12",
        question: "2. Explain why the Montgomery Bus Boycott succeeded in achieving its aims between 1955 and 1956. [12 marks]",
        stimulus: [
          "The Montgomery Improvement Association (MIA) and Martin Luther King Jr.",
          "The Supreme Court ruling in Browder v. Gayle (1956)"
        ],
        prompt: "Write a three-paragraph PEEL essay explaining community organization, economic leverage, and the decisive Supreme Court ruling.",
        model: "One major reason why the Montgomery Bus Boycott succeeded was the exceptional organizational leadership of the <strong>Montgomery Improvement Association (MIA)</strong>, led by the twenty-six-year-old Dr. Martin Luther King Jr. Following Rosa Parks’ arrest in December 1955, the MIA coordinated a remarkably disciplined community effort that lasted 381 days. Because Montgomery’s Black population accounted for over 70% of bus passengers, the MIA organized an intricate private transport network comprising over 300 private carpools, volunteer station wagons, and reduced-fare Black taxi services. King’s inspirational oratory at weekly church rallies maintained community morale and non-violent discipline despite police harassment and KKK firebombings.<br><br>Furthermore, the boycott exerted devastating <strong>economic pressure on Montgomery’s municipal economy</strong>. As tens of thousands of Black domestic workers and labourers walked or carpooled, the city bus company suffered a catastrophic sixty percent collapse in revenue, forcing drastic service cuts and fare increases. Simultaneously, white-owned downtown retail stores lost hundreds of thousands of dollars in patronage as Black shoppers avoided the commercial district. This severe financial distress alienated white business owners, who began pressuring city commissioners to negotiate an end to the ruinous dispute.<br><br>Finally, the decisive catalyst that ensured absolute victory was legal action in the federal courts, culminating in the <strong>Supreme Court ruling in Browder v. Gayle (November 1956)</strong>. While the boycott maintained economic and moral pressure on the streets, NAACP attorneys challenged Alabama’s segregation statutes in federal court. The Supreme Court upheld the lower court's ruling that segregated public transport was unconstitutional under the 14th Amendment. This provided an enforceable federal mandate that overruled recalcitrant local authorities, legally forcing Montgomery to desegregate all public buses on 20 December 1956.",
        scaffolding: {
          acronym: "PEEL Structure Strip",
          acronym_title: "12-Mark Causal Explanation (Point • Evidence • Explain • Link)",
          steps: [
            { letter: "CAUSE 1", name: "MIA Leadership & Carpool Logistics", prompt: "Explain MLK's leadership, 381-day endurance, and the 300-car transport system.", starter: "One major reason for success was the organization of the MIA and carpool system..." },
            { letter: "CAUSE 2", name: "Economic Pressure on Bus Company & Retailers", prompt: "Explain the 70% passenger collapse, lost revenue, and white business alarm.", starter: "Furthermore, the boycott exerted crippling economic pressure on downtown businesses..." },
            { letter: "CAUSE 3", name: "Supreme Court Ruling (Browder v. Gayle)", prompt: "Explain how federal legal authority compelled municipal desegregation.", starter: "Finally, the decisive factor was the Supreme Court ruling in Browder v. Gayle..." }
          ],
          sentence_starters: ["One major reason was...", "For example, ...", "This was crucial because...", "Therefore, the boycott succeeded because...", "Furthermore, ...", "Consequently, ..."],
          connectives_bank: ["Rosa Parks", "MIA", "Martin Luther King Jr.", "Carpool system", "Economic boycott", "Browder v. Gayle", "14th Amendment", "Desegregation"]
        }
      }
    ]
  },

  lesson_1_4: {
    title: "Edexcel GCSE (9–1) Paper 3 Exam Practice",
    tariff: "16 marks (Q1 Inference [4m] & Q2 Causation Essay [12m])",
    questions: [
      {
        tariff: "4 marks",
        type: "inference_4m",
        question: "1. Give two things you can infer from Source A about the racial violence and terror inflicted on Black Americans in the South in 1955. [4 marks]",
        prompt: "Give two separate inferences based on Source A (Chicago Defender report on the lynching of Emmett Till).",
        model: "<p><strong>(i) What I can infer:</strong><br>I can infer that white racists in the South reacted with extreme, lethal brutality to perceived breaches of racial etiquette.<br><strong>Details in the source that tell me this:</strong><br>The report describes how 14-year-old Emmett Till was kidnapped at gunpoint and brutally tortured merely for allegedly whistling at a white woman.</p><p><strong>(ii) What I can infer:</strong><br>I can infer that the Southern judicial system provided complete legal impunity for white murderers of Black citizens.<br><strong>Details in the source that tell me this:</strong><br>The account notes that the confessed killers, Roy Bryant and J.W. Milam, were acquitted in just over an hour by an all-white, all-male Mississippi jury.</p>",
        scaffolding: {
          acronym: "Inference + Detail Formula (AO3)",
          acronym_title: "Inference Formula: (i) Inference + Quote, (ii) Inference + Quote",
          steps: [
            { letter: "I1", name: "First Inference", prompt: "Deduce the disproportionate and barbaric nature of racist retaliation.", starter: "What I can infer: I can infer that Southern whites used barbaric violence..." },
            { letter: "Q1", name: "Supporting Detail", prompt: "Quote the extract describing the kidnapping and torture of Emmett Till.", starter: "Details in the source that tell me this: The article details how he was abducted..." },
            { letter: "I2", name: "Second Inference", prompt: "Deduce the corrupt complicity of all-white juries and Southern law.", starter: "What I can infer: A second inference is that the justice system protected white perpetrators..." },
            { letter: "Q2", name: "Supporting Detail", prompt: "Quote the detail highlighting the rapid acquittal by the jury.", starter: "Details in the source that tell me this: The murderers were acquitted in 67 minutes..." }
          ]
        }
      },
      {
        tariff: "12 marks",
        type: "explain_why_12",
        question: "2. Explain why white segregationists mounted 'Massive Resistance' across the South between 1954 and 1960. [12 marks]",
        stimulus: [
          "White Citizens' Councils and economic intimidation",
          "The 'Southern Manifesto' and state governors"
        ],
        prompt: "Write a three-paragraph PEEL essay analysing why white Southerners fiercely resisted integration through political, economic, and institutional means.",
        model: "One major reason why white segregationists mounted Massive Resistance was the political leadership provided by Southern elected officials through the <strong>'Southern Manifesto' of 1956</strong>. Signed by 101 Southern congressmen and senators—including Strom Thurmond—the manifesto denounced the Brown ruling as an unconstitutional abuse of judicial power that infringed upon 'states' rights'. Southern state governors, such as Orval Faubus in Arkansas and Harry Byrd in Virginia, actively championed defiance, using state legislation to close integrated public schools and divert public tax revenues to private, all-white academies. This top-down political defiance legitimized resistance, giving ordinary white citizens official state sanction to defy federal law.<br><br>Furthermore, resistance was driven by community-level mobilization through the rapid rise of <strong>White Citizens' Councils</strong>. Formed in Mississippi in 1954, these councils quickly expanded to over 250,000 members, consisting of middle-class white bankers, doctors, and civic leaders. Unlike the clandestine KKK, the Councils used sophisticated economic terrorism: they fired Black employees who signed desegregation petitions, cancelled bank mortgages, denied farm credit to Black sharecroppers, and publicly boycotted businesses that showed racial moderation. This economic pressure terrorized Black families into withdrawing desegregation lawsuits, effectively freezing integration across vast swathes of the rural South.<br><br>Finally, resistance was fueled by deep-seated <strong>cultural racism and existential fear</strong> of social equality. White Southerners viewed school integration as an existential assault on Southern tradition that would lead to racial intermarriage and the breakdown of white supremacy. In response, segregationist state legislatures passed hundreds of evasion statutes—such as pupil placement laws, tuition grant schemes, and the outright abolition of compulsory education laws—ensuring that by 1960, less than one percent of Black pupils in the Deep South attended integrated schools.",
        scaffolding: {
          acronym: "PEEL Structure Strip",
          acronym_title: "12-Mark Causal Explanation (Point • Evidence • Explain • Link)",
          steps: [
            { letter: "CAUSE 1", name: "Political Leadership & Southern Manifesto", prompt: "Explain how 101 congressmen and governors legitimized defiance under 'states' rights'.", starter: "One major reason was political leadership via the Southern Manifesto..." },
            { letter: "CAUSE 2", name: "White Citizens' Councils & Economic Terror", prompt: "Explain how 250,000 middle-class members used job loss, credit denial, and mortgages.", starter: "Furthermore, resistance was driven by White Citizens' Councils using economic terror..." },
            { letter: "CAUSE 3", name: "Cultural Fears & School Evasion Laws", prompt: "Explain pupil placement laws, school closures in Virginia, and less than 1% integration.", starter: "Finally, deep racial fears led states to pass legislation closing public schools..." }
          ],
          sentence_starters: ["One major reason was...", "For example, ...", "This meant that...", "Therefore, Massive Resistance succeeded because...", "Furthermore, ...", "Consequently, ..."],
          connectives_bank: ["Massive Resistance", "Southern Manifesto", "Harry Byrd", "Orval Faubus", "White Citizens' Councils", "Pupil placement laws", "States' rights", "Prince Edward County"]
        }
      }
    ]
  },

  // =========================================================================
  // KEY TOPIC 2: EXPANSION OF CIVIL RIGHTS (Lessons 5–8)
  // =========================================================================

  lesson_2_1: {
    title: "Edexcel GCSE (9–1) Paper 3 Exam Practice",
    tariff: "16 marks (Q1 Inference [4m] & Q2 Causation Essay [12m])",
    questions: [
      {
        tariff: "4 marks",
        type: "inference_4m",
        question: "1. Give two things you can infer from Source A about the discipline of civil rights demonstrators during the lunch counter sit-ins (1960). [4 marks]",
        prompt: "Give two separate inferences supported by details from Source A (photograph of students enduring physical and verbal abuse at a segregated lunch counter).",
        model: "<p><strong>(i) What I can infer:</strong><br>I can infer that the student demonstrators maintained total non-violent discipline despite extreme physical and psychological provocation.<br><strong>Details in the source that tell me this:</strong><br>The students sit upright with eyes forward, refusing to lash out even as white youths pour drinks, hot coffee, and food over their heads.</p><p><strong>(ii) What I can infer:</strong><br>I can infer that the sit-ins exposed the savage aggression of white segregationists to national public scrutiny.<br><strong>Details in the source that tell me this:</strong><br>The photograph clearly shows white attackers smirking and violently assaulting seated, defenseless Black and white students in public view.</p>",
        scaffolding: {
          acronym: "Inference + Detail Formula (AO3)",
          acronym_title: "Inference Formula: (i) Inference + Quote, (ii) Inference + Quote",
          steps: [
            { letter: "I1", name: "First Inference", prompt: "Deduce the extraordinary non-violent discipline of the students.", starter: "What I can infer: I can infer that student demonstrators maintained total non-violent discipline..." },
            { letter: "Q1", name: "Supporting Detail", prompt: "Cite the detail showing them sitting stoically while being assaulted.", starter: "Details in the source that tell me this: The image depicts students sitting calmly as food is dumped..." },
            { letter: "I2", name: "Second Inference", prompt: "Deduce how the protest exposed the brutal intolerance of white segregationists.", starter: "What I can infer: A second inference is that the sit-ins highlighted the unprovoked cruelty of white youths..." },
            { letter: "Q2", name: "Supporting Detail", prompt: "Cite the detail showing the attackers taunting the peaceful protesters.", starter: "Details in the source that tell me this: White attackers surround the students and jeer aggressively..." }
          ]
        }
      },
      {
        tariff: "12 marks",
        type: "explain_why_12",
        question: "2. Explain why peaceful direct action (sit-ins and Freedom Rides) succeeded in desegregating public facilities between 1960 and 1961. [12 marks]",
        stimulus: [
          "The Greensboro sit-ins and the Student Nonviolent Coordinating Committee (SNCC)",
          "The Freedom Rides and the Interstate Commerce Commission (ICC)"
        ],
        prompt: "Write a three-paragraph PEEL essay explaining the role of youth mobilization, economic loss for retailers, and federal regulatory intervention.",
        model: "One major reason why direct action succeeded was the explosive, student-led spread of <strong>lunch counter sit-ins initiated by SNCC</strong>. When four Black students sat down at the segregated Woolworth's lunch counter in Greensboro, North Carolina, in February 1960, they ignited a nationwide movement. Within months, over 70,000 Black and white students across fifty-five cities engaged in disciplined sit-ins. By occupying seats daily, the demonstrators denied white patrons access to stores and inflicted severe financial losses on downtown retailers. Woolworth’s and other chain stores, facing lost profits and boycotts in northern branches, quickly capitulated, desegregating their lunch counters in over one hundred Southern cities by late 1960.<br><br>A second decisive factor was the <strong>courageous strategy of the Freedom Rides in 1961</strong> organized by CORE and SNCC. Integrated teams of activists boarded interstate buses into the Deep South to test Supreme Court rulings (Morgan v. Virginia and Boynton v. Virginia) banning terminal segregation. In Anniston, Alabama, a KKK mob firebombed a bus and barricaded the doors, while riders in Birmingham and Montgomery were brutally beaten with lead pipes with the complicity of local police. Televised images of bloodied, burning buses shocked the world and created immense domestic and international embarrassment for the newly elected Kennedy administration during the Cold War.<br><br>Finally, this strategic provocation compelled the <strong>federal government to deploy binding regulatory enforcement</strong>. Attorney General Robert F. Kennedy was forced to dispatch 400 armed federal marshals to Alabama to protect the riders. Recognizing that violent state defiance could not be allowed to disrupt interstate transit, Kennedy petitioned the Interstate Commerce Commission (ICC). In September 1961, the ICC issued tough federal regulations banning all racial segregation on interstate buses, trains, and terminal facilities, with severe financial penalties for non-compliance, officially ending Jim Crow transit in the South.",
        scaffolding: {
          acronym: "PEEL Structure Strip",
          acronym_title: "12-Mark Causal Explanation (Point • Evidence • Explain • Link)",
          steps: [
            { letter: "CAUSE 1", name: "Greensboro Sit-ins & Commercial Boycotts", prompt: "Explain the four students, 70,000 participants, retail profits, and Woolworth's capitulation.", starter: "One major reason was the rapid spread of student sit-ins organized by SNCC..." },
            { letter: "CAUSE 2", name: "Freedom Rides & Media Shock", prompt: "Explain CORE riders, Anniston firebombing, Birmingham pipe beatings, and global embarrassment.", starter: "Furthermore, the Freedom Rides forced the issue into the national media spotlight..." },
            { letter: "CAUSE 3", name: "Federal ICC Enforcement Order", prompt: "Explain Robert Kennedy's federal marshals and the September 1961 ICC desegregation mandate.", starter: "Finally, direct action succeeded because it compelled federal intervention via the ICC..." }
          ],
          sentence_starters: ["One major reason was...", "For example, ...", "This resulted in...", "Therefore, direct action succeeded because...", "Furthermore, ...", "Consequently, ..."],
          connectives_bank: ["Greensboro", "Woolworth's", "SNCC", "CORE", "Freedom Rides", "Anniston firebombing", "Robert Kennedy", "ICC order", "Boynton v. Virginia"]
        }
      }
    ]
  },

  lesson_2_2: {
    title: "Edexcel GCSE (9–1) Paper 3 Exam Practice",
    tariff: "16 marks (Q1 Inference [4m] & Q2 Causation Essay [12m])",
    questions: [
      {
        tariff: "4 marks",
        type: "inference_4m",
        question: "1. Give two things you can infer from Source A about the message and impact of the 1963 March on Washington. [4 marks]",
        prompt: "Give two separate inferences supported by details from Source A (Dr. King delivering his 'I Have a Dream' speech before 250,000 marchers).",
        model: "<p><strong>(i) What I can infer:</strong><br>I can infer that the civil rights movement enjoyed massive, multiracial popular support across the United States.<br><strong>Details in the source that tell me this:</strong><br>An unprecedented crowd of over 250,000 Black and white Americans packed the Lincoln Memorial reflecting pool in peaceful unity.</p><p><strong>(ii) What I can infer:</strong><br>I can infer that Dr. King sought to align civil rights with foundational American constitutional and religious ideals.<br><strong>Details in the source that tell me this:</strong><br>King directly references the Declaration of Independence and Constitution, describing his dream as deeply rooted in the American dream.</p>",
        scaffolding: {
          acronym: "Inference + Detail Formula (AO3)",
          acronym_title: "Inference Formula: (i) Inference + Quote, (ii) Inference + Quote",
          steps: [
            { letter: "I1", name: "First Inference", prompt: "Deduce the scale, unity, and multiracial coalition present at the march.", starter: "What I can infer: I can infer that the movement commanded immense, multiracial support..." },
            { letter: "Q1", name: "Supporting Detail", prompt: "Quote the size of the crowd and unity shown at the Lincoln Memorial.", starter: "Details in the source that tell me this: Over 250,000 citizens gathered together in peaceful protest..." },
            { letter: "I2", name: "Second Inference", prompt: "Deduce the moral appeal King made to American democratic values.", starter: "What I can infer: A second inference is that King framed equality as a fulfillment of American promises..." },
            { letter: "Q2", name: "Supporting Detail", prompt: "Quote King's reference to the promissory note and American Dream.", starter: "Details in the source that tell me this: King referred to the Constitution as a promissory note for all citizens..." }
          ]
        }
      },
      {
        tariff: "12 marks",
        type: "explain_why_12",
        question: "2. Explain why the Civil Rights Act was passed in 1964. [12 marks]",
        stimulus: [
          "The Birmingham Campaign (May 1963)",
          "The assassination of President John F. Kennedy (November 1963)"
        ],
        prompt: "Write a three-paragraph PEEL essay evaluating the impact of Birmingham, Kennedy's martyrdom/LBJ's leadership, and the March on Washington.",
        model: "One major reason why the Civil Rights Act was passed was the national and international outrage generated by the <strong>Birmingham Campaign of May 1963</strong> ('Project C'). When Police Chief Eugene 'Bull' Connor deployed vicious attack dogs and high-pressure fire hoses against peaceful student demonstrators in the Children's Crusade, the brutal images were broadcast worldwide. This savagery deeply embarrassed the US government during the Cold War, exposing American hypocrisy on human rights. In direct response, President Kennedy delivered a historic television address on 11 June 1963, declaring civil rights an urgent 'moral issue' and formally committing his administration to drafting comprehensive federal civil rights legislation.<br><br>A second decisive factor was the <strong>assassination of President Kennedy in November 1963</strong> and the formidable legislative skill of President Lyndon B. Johnson. In his address to Congress following the assassination, Johnson masterfully framed the Civil Rights Bill as a sacred memorial to the fallen president, declaring: 'No memorial oration or eulogy could more eloquently honor President Kennedy's memory than the earliest possible passage of the civil rights bill.' Furthermore, Johnson utilized decades of Senate mastery (the 'Johnson Treatment') to break an unprecedented 54-day filibuster mounted by Southern segregationist senators, forging a bipartisan coalition with Republican leader Everett Dirksen.<br><br>Finally, the massive mobilization of the <strong>March on Washington in August 1963</strong> demonstrated undeniable public consensus for federal action. Over 250,000 Black and white Americans gathered peacefully at the Lincoln Memorial, where Dr. King delivered his electrifying 'I Have a Dream' speech. This dignified, orderly spectacle broadcast on live television dispelled white moderate fears of racial chaos and exerted intense moral pressure on wavering northern congressmen, making the passage of the landmark Civil Rights Act of July 1964 politically unstoppable.",
        scaffolding: {
          acronym: "PEEL Structure Strip",
          acronym_title: "12-Mark Causal Explanation (Point • Evidence • Explain • Link)",
          steps: [
            { letter: "CAUSE 1", name: "Birmingham Campaign & Bull Connor", prompt: "Explain Children's Crusade, attack dogs, hoses, global shock, and JFK's moral speech.", starter: "One major reason was the public shock caused by the Birmingham Campaign..." },
            { letter: "CAUSE 2", name: "JFK Martyrdom & LBJ's Legislative Mastery", prompt: "Explain Johnson using Kennedy's legacy, breaking the 54-day filibuster, and Dirksen's alliance.", starter: "A second decisive factor was JFK's assassination and Lyndon Johnson's political skill..." },
            { letter: "CAUSE 3", name: "March on Washington & Public Consensus", prompt: "Explain 250,000 marchers, MLK's 'I Have a Dream', and moral pressure on Congress.", starter: "Finally, the March on Washington exerted irresistible moral pressure on politicians..." }
          ],
          sentence_starters: ["One major reason was...", "For example, ...", "This meant that...", "Therefore, the Act was passed because...", "Furthermore, ...", "Consequently, ..."],
          connectives_bank: ["Birmingham Campaign", "Bull Connor", "Project C", "Children's Crusade", "JFK moral address", "Lyndon B. Johnson", "54-day filibuster", "Everett Dirksen", "March on Washington"]
        }
      }
    ]
  },

  lesson_2_3: {
    title: "Edexcel GCSE (9–1) Paper 3 Exam Practice",
    tariff: "16 marks (Q1 Inference [4m] & Q2 Causation Essay [12m])",
    questions: [
      {
        tariff: "4 marks",
        type: "inference_4m",
        question: "1. Give two things you can infer from Source A about the Black Power salute at the 1968 Mexico City Olympic Games. [4 marks]",
        prompt: "Give two separate inferences based on Source A (Tommie Smith and John Carlos on the podium).",
        model: "<p><strong>(i) What I can infer:</strong><br>I can infer that Black athletes were determined to use their international platform to protest systemic racial injustice in the United States.<br><strong>Details in the source that tell me this:</strong><br>Smith and Carlos bow their heads and raise black-gloved fists during the American national anthem, wearing human rights badges.</p><p><strong>(ii) What I can infer:</strong><br>I can infer that the protest was intended to highlight poverty and ongoing racial oppression back home.<br><strong>Details in the source that tell me this:</strong><br>The athletes wore black socks with no shoes to represent Black poverty, and a bead necklace commemorating victims of lynchings.</p>",
        scaffolding: {
          acronym: "Inference + Detail Formula (AO3)",
          acronym_title: "Inference Formula: (i) Inference + Quote, (ii) Inference + Quote",
          steps: [
            { letter: "I1", name: "First Inference", prompt: "Deduce the use of a global sporting stage for civil rights protest.", starter: "What I can infer: I can infer that the athletes used the Olympic podium as a platform..." },
            { letter: "Q1", name: "Supporting Detail", prompt: "Quote the gesture of bowed heads and black-gloved fists during the anthem.", starter: "Details in the source that tell me this: They bowed their heads and raised clenched fists..." },
            { letter: "I2", name: "Second Inference", prompt: "Deduce the symbolism of poverty and racial solidarity.", starter: "What I can infer: A second inference is that the protest symbolized Black poverty and suffering..." },
            { letter: "Q2", name: "Supporting Detail", prompt: "Quote the detail regarding black socks without shoes and bead necklaces.", starter: "Details in the source that tell me this: They wore black socks without shoes to represent poverty..." }
          ]
        }
      },
      {
        tariff: "12 marks",
        type: "explain_why_12",
        question: "2. Explain why the Voting Rights Act was passed in 1965. [12 marks]",
        stimulus: [
          "The Selma to Montgomery marches and 'Bloody Sunday' (March 1965)",
          "The Mississippi Freedom Summer and the murder of civil rights workers (1964)"
        ],
        prompt: "Write a three-paragraph PEEL essay explaining the voter registration crisis, the shock of Selma's 'Bloody Sunday', and LBJ's executive leadership.",
        model: "One major reason why the Voting Rights Act was passed was the ongoing, violent disenfranchisement exposed by the <strong>Mississippi Freedom Summer of 1964</strong>. Organized by SNCC and CORE, hundreds of northern college student volunteers travelled to Mississippi to register Black voters and establish Freedom Schools. Segregationists responded with savage violence: thirty Black churches were firebombed, dozens of homes burned, and three civil rights workers—James Chaney, Andrew Goodman, and Michael Schwerner—were abducted and murdered by the KKK with police complicity. The national outrage following the discovery of their buried bodies proved that state authorities would kill to prevent Black voting, making federal voting legislation imperative.<br><br>A second and decisive trigger was the <strong>Selma to Montgomery campaign of March 1965</strong>, particularly the events of 'Bloody Sunday'. In Selma, Alabama, where only 335 of 15,000 eligible Black adults were registered to vote, civil rights activists organized a 54-mile protest march. On 7 March, as 600 peaceful marchers crossed the Edmund Pettus Bridge, Alabama state troopers and Sheriff Jim Clark’s posse attacked them with tear gas, bullwhips, and billy clubs on horseback. Broadcast on national television to fifty million Americans, the brutal footage deeply shocked the nation and triggered sympathy demonstrations in eighty cities.<br><br>Finally, this crisis galvanized <strong>President Lyndon B. Johnson’s direct personal intervention</strong>. Eight days after Bloody Sunday, Johnson delivered a landmark televised address to a joint session of Congress. In a passionate speech, he declared that the denial of voting rights was an assault on American democracy itself, famously adopting the civil rights anthem by concluding: 'And we shall overcome.' Johnson immediately introduced the Voting Rights Bill and used his political clout to sweep aside Southern opposition. Signed in August 1965, the Act suspended all literacy tests and empowered federal examiners to register voters directly, transforming Southern politics by registering 250,000 new Black voters within six months.",
        scaffolding: {
          acronym: "PEEL Structure Strip",
          acronym_title: "12-Mark Causal Explanation (Point • Evidence • Explain • Link)",
          steps: [
            { letter: "CAUSE 1", name: "Freedom Summer & Murders (1964)", prompt: "Explain Chaney, Goodman, Schwerner murders, KKK terror, and voting suppression.", starter: "One major reason was the national outrage over Mississippi Freedom Summer..." },
            { letter: "CAUSE 2", name: "Selma Marches & 'Bloody Sunday' (1965)", prompt: "Explain Edmund Pettus Bridge, state trooper brutality on TV, and national shock.", starter: "The decisive catalyst was 'Bloody Sunday' at the Edmund Pettus Bridge in Selma..." },
            { letter: "CAUSE 3", name: "LBJ's 'We Shall Overcome' Address & Act", prompt: "Explain Johnson's congressional address, federal registrars, and literacy test bans.", starter: "Finally, the Act was passed because of President Johnson's resolute federal leadership..." }
          ],
          sentence_starters: ["One major reason was...", "For example, ...", "This highlighted that...", "Therefore, the Act was passed because...", "Furthermore, ...", "Consequently, ..."],
          connectives_bank: ["Freedom Summer", "Chaney, Goodman, Schwerner", "Selma", "Edmund Pettus Bridge", "Bloody Sunday", "Jim Clark", "Lyndon B. Johnson", "We Shall Overcome", "Federal examiners"]
        }
      }
    ]
  },

  lesson_2_4: {
    title: "Edexcel GCSE (9–1) Paper 3 Exam Practice",
    tariff: "16 marks (Q1 Inference [4m] & Q2 Causation Essay [12m])",
    questions: [
      {
        tariff: "4 marks",
        type: "inference_4m",
        question: "1. Give two things you can infer from Source A about the causes of urban riots in American cities between 1965 and 1968. [4 marks]",
        prompt: "Give two separate inferences based on Source A (Summary of the 1968 Kerner Commission Report).",
        model: "<p><strong>(i) What I can infer:</strong><br>I can infer that the federal investigation blamed pervasive white racism and institutional neglect for the urban rebellions.<br><strong>Details in the source that tell me this:</strong><br>The Kerner Commission stated bluntly: 'White society is deeply implicated in the ghetto. White institutions created it, white institutions maintain it, and white society condones it.'</p><p><strong>(ii) What I can infer:</strong><br>I can infer that America was dangerously fracturing along racial and economic lines.<br><strong>Details in the source that tell me this:</strong><br>The report famously warned that the United States was 'moving toward two societies, one black, one white—separate and unequal.'</p>",
        scaffolding: {
          acronym: "Inference + Detail Formula (AO3)",
          acronym_title: "Inference Formula: (i) Inference + Quote, (ii) Inference + Quote",
          steps: [
            { letter: "I1", name: "First Inference", prompt: "Deduce the finding that white racism and institutional neglect caused the riots.", starter: "What I can infer: I can infer that the report concluded white racism created ghetto misery..." },
            { letter: "Q1", name: "Supporting Detail", prompt: "Quote the line regarding white society creating and maintaining the ghetto.", starter: "Details in the source that tell me this: The commission stated that white institutions created the ghetto..." },
            { letter: "I2", name: "Second Inference", prompt: "Deduce the severe societal polarization highlighted by the commission.", starter: "What I can infer: A second inference is that America was splitting into two hostile, unequal societies..." },
            { letter: "Q2", name: "Supporting Detail", prompt: "Quote the famous 'two societies' warning from the report.", starter: "Details in the source that tell me this: It warned of moving toward two separate and unequal societies..." }
          ]
        }
      },
      {
        tariff: "12 marks",
        type: "explain_why_12",
        question: "2. Explain why the Black Power movement grew in popularity in the late 1960s. [12 marks]",
        stimulus: [
          "The ideas of Malcolm X and the Black Panther Party",
          "Frustration with the limitations of non-violent civil rights laws in northern cities"
        ],
        prompt: "Write a three-paragraph PEEL essay explaining disillusionment with non-violence, Northern ghetto poverty/police brutality, and the empowering pride of Black Power.",
        model: "One major reason why Black Power grew rapidly was deep frustration with the <strong>limitations of mainstream non-violent achievements</strong>. While the Civil Rights Act (1964) and Voting Rights Act (1965) dismantled legal Jim Crow in the South, they did virtually nothing to alleviate the economic misery, de facto segregation, and police brutality endemic to northern and western urban ghettos. When Dr. King brought non-violent marches to Chicago in 1966 to challenge slum housing, he faced violent white mobs and achieved only token concessions. Younger activists in SNCC and CORE concluded that King’s philosophy of 'turning the other cheek' was ineffective against systemic northern economic discrimination, leading leaders like Stokely Carmichael to popularize the call for 'Black Power' in 1966.<br><br>Furthermore, Black Power’s appeal was amplified by the <strong>radical, empowering philosophy of Malcolm X</strong> and the Nation of Islam. Malcolm X challenged the mainstream movement's goal of integration into a corrupt white society, urging Black Americans to embrace racial pride, self-determination, and 'armed self-defense by any means necessary'. His fiery rhetoric resonated deeply with angry, unemployed young men in northern cities who felt alienated by the middle-class, Christian leadership of the SCLC. Following Malcolm X's assassination in 1965, his ideas inspired Huey P. Newton and Bobby Seale to establish the Black Panther Party for Self-Defense in Oakland in 1966.<br><br>Finally, the movement expanded because the <strong>Black Panthers offered practical, community-based solutions</strong> alongside militant rhetoric. The Panthers patrolled police officers with loaded weapons to prevent police brutality, but they also established highly successful survival programs, including the Free Breakfast for Children Program (feeding tens of thousands of poor children daily), free health clinics, and sickle-cell anemia testing. By providing tangible welfare support while fostering racial pride ('Black is Beautiful'), the Panthers and Black Power organizations offered working-class Black Americans a powerful sense of dignity and direct community empowerment.",
        scaffolding: {
          acronym: "PEEL Structure Strip",
          acronym_title: "12-Mark Causal Explanation (Point • Evidence • Explain • Link)",
          steps: [
            { letter: "CAUSE 1", name: "Frustration with Non-Violence in Northern Ghettos", prompt: "Explain Chicago campaign failure, economic misery, de facto segregation, and Carmichael's speech.", starter: "One major reason was growing disillusionment with non-violence in northern cities..." },
            { letter: "CAUSE 2", name: "Influence of Malcolm X & Self-Defense", prompt: "Explain rejection of integration, racial pride, and self-defense by any means necessary.", starter: "Furthermore, the movement was inspired by the radical philosophy of Malcolm X..." },
            { letter: "CAUSE 3", name: "Black Panther Community Programs & Pride", prompt: "Explain Huey Newton, police patrols, Free Breakfast program, and 'Black is Beautiful'.", starter: "Finally, the Black Panthers gained mass support through practical community survival programs..." }
          ],
          sentence_starters: ["One major reason was...", "For example, ...", "This was significant because...", "Therefore, Black Power expanded because...", "Furthermore, ...", "Consequently, ..."],
          connectives_bank: ["Stokely Carmichael", "Black Power", "Malcolm X", "Nation of Islam", "Black Panther Party", "Huey Newton", "Bobby Seale", "Police patrols", "Free Breakfast", "Self-defense"]
        }
      }
    ]
  },

  // =========================================================================
  // KEY TOPIC 3: US INVOLVEMENT IN VIETNAM (Lessons 9–12)
  // =========================================================================

  lesson_3_1: {
    title: "Edexcel GCSE (9–1) Paper 3 Exam Practice",
    tariff: "16 marks (Q1 Inference [4m] & Q2 Causation Essay [12m])",
    questions: [
      {
        tariff: "4 marks",
        type: "inference_4m",
        question: "1. Give two things you can infer from Source A about American geopolitical fears regarding the spread of communism in Southeast Asia (1954). [4 marks]",
        prompt: "Give two separate inferences based on Source A (President Eisenhower's press conference formulating the 'Domino Theory').",
        model: "<p><strong>(i) What I can infer:</strong><br>I can infer that the US government viewed communist expansion in Southeast Asia as an interconnected, chain-reaction threat.<br><strong>Details in the source that tell me this:</strong><br>Eisenhower explicitly describes the 'falling domino' principle, arguing that if Indochina falls, neighbouring nations will collapse rapidly.</p><p><strong>(ii) What I can infer:</strong><br>I can infer that American leaders believed the loss of Southeast Asia would threaten vital Western economic and strategic security.<br><strong>Details in the source that tell me this:</strong><br>Eisenhower warns that the loss of Indochina would endanger Malaya, Indonesia, and Japan, cutting off essential rubber, tin, and trade routes.</p>",
        scaffolding: {
          acronym: "Inference + Detail Formula (AO3)",
          acronym_title: "Inference Formula: (i) Inference + Quote, (ii) Inference + Quote",
          steps: [
            { letter: "I1", name: "First Inference", prompt: "Deduce the strategic fear of a rapid communist chain reaction.", starter: "What I can infer: I can infer that US leaders feared a rapid chain reaction of communist expansion..." },
            { letter: "Q1", name: "Supporting Detail", prompt: "Quote Eisenhower's words on the falling domino principle.", starter: "Details in the source that tell me this: Eisenhower stated that knocking over the first domino..." },
            { letter: "I2", name: "Second Inference", prompt: "Deduce the threat to vital economic resources and Pacific allies.", starter: "What I can infer: A second inference is that America feared losing vital economic resources and Pacific bases..." },
            { letter: "Q2", name: "Supporting Detail", prompt: "Quote the extract regarding trade routes, tin, rubber, and Japan.", starter: "Details in the source that tell me this: He highlighted the loss of millions of people and economic resources..." }
          ]
        }
      },
      {
        tariff: "12 marks",
        type: "explain_why_12",
        question: "2. Explain why the United States became increasingly involved in Vietnam between 1954 and 1963. [12 marks]",
        stimulus: [
          "The Domino Theory and the Cold War containment policy",
          "US support for Ngo Dinh Diem and the growth of the Vietcong"
        ],
        prompt: "Write a three-paragraph PEEL essay explaining the French defeat/Geneva partition, Diem's unpopularity/Vietcong growth, and Kennedy's military adviser surge.",
        model: "One major reason why the United States became involved in Vietnam was the overarching Cold War doctrine of <strong>containment and the 'Domino Theory'</strong>. Following the French military catastrophe at Dien Bien Phu in May 1954, the Geneva Accords temporarily partitioned Vietnam along the 17th Parallel. Fearing President Eisenhower’s warning that the fall of Vietnam would trigger the communist takeover of Laos, Cambodia, Thailand, and Indonesia, Washington refused to sign the Geneva Accords. Convinced that Ho Chi Minh’s communist regime was a pawn of Moscow and Beijing, the US committed itself to building an anti-communist bastion in South Vietnam to contain Soviet and Chinese expansion.<br><br>Furthermore, US involvement deepened because of Washington's uncritical backing of the corrupt and authoritarian <strong>regime of Ngo Dinh Diem</strong>. Diem established a brutal Catholic-dominated dictatorship in Saigon, violently persecuting the Buddhist majority and cancelling the nationwide reunification elections scheduled for 1956. Diem’s corruption, land evictions, and imprisonment of political opponents alienated the peasant population, prompting the creation of the National Liberation Front (Vietcong) in 1960. Supported by North Vietnam via the Ho Chi Minh Trail, the Vietcong launched a successful guerrilla insurgency that rapidly eroded South Vietnamese army (ARVN) control in the countryside, forcing the US to provide millions of dollars in aid to keep Diem in power.<br><br>Finally, involvement escalated sharply under <strong>President John F. Kennedy between 1961 and 1963</strong>. Determined to demonstrate American resolve following the Bay of Pigs disaster and the construction of the Berlin Wall, Kennedy dramatically increased the number of US military advisers ('Green Berets') from 900 in 1960 to over 16,000 by late 1963. Kennedy authorized chemical defoliation (Operation Ranch Hand) and the 'Strategic Hamlet Program' to isolate peasants from the Vietcong. When Diem’s repression sparked Buddhist self-immolations that embarrassed Washington, the US secretly backed a military coup that overthrew and assassinated Diem in November 1963, leaving South Vietnam in total political chaos and locking the US into direct responsibility for the war.",
        scaffolding: {
          acronym: "PEEL Structure Strip",
          acronym_title: "12-Mark Causal Explanation (Point • Evidence • Explain • Link)",
          steps: [
            { letter: "CAUSE 1", name: "Dien Bien Phu & Domino Theory", prompt: "Explain French collapse, Geneva 17th Parallel partition, and US containment strategy.", starter: "One major reason was the US commitment to containment and the Domino Theory..." },
            { letter: "CAUSE 2", name: "Diem's Repression & Rise of the Vietcong", prompt: "Explain cancelled 1956 elections, Buddhist persecution, and Vietcong guerrilla growth.", starter: "Furthermore, involvement deepened because of US support for the unpopular Diem regime..." },
            { letter: "CAUSE 3", name: "Kennedy's Escalation & 16,000 Advisers", prompt: "Explain Green Berets, Strategic Hamlets, Buddhist crisis, and Diem's assassination.", starter: "Finally, President Kennedy escalated involvement by deploying thousands of advisers..." }
          ],
          sentence_starters: ["One major reason was...", "For example, ...", "This meant that...", "Therefore, US involvement escalated because...", "Furthermore, ...", "Consequently, ..."],
          connectives_bank: ["Dien Bien Phu", "Geneva Accords", "17th Parallel", "Domino Theory", "Ngo Dinh Diem", "National Liberation Front (NLF)", "Vietcong", "Ho Chi Minh Trail", "Green Berets", "Strategic Hamlets"]
        }
      }
    ]
  },

  lesson_3_2: {
    title: "Edexcel GCSE (9–1) Paper 3 Exam Practice",
    tariff: "16 marks (Q1 Inference [4m] & Q2 Causation Essay [12m])",
    questions: [
      {
        tariff: "4 marks",
        type: "inference_4m",
        question: "1. Give two things you can infer from Source A about the deployment of US Marines to Vietnam in March 1965. [4 marks]",
        prompt: "Give two separate inferences based on Source A (US Marines of the 9th Expeditionary Brigade landing on the beaches of Da Nang).",
        model: "<p><strong>(i) What I can infer:</strong><br>I can infer that the US mission in Vietnam was shifting from background military advising to direct, large-scale combat operations.<br><strong>Details in the source that tell me this:</strong><br>Heavily armed combat Marines are shown landing in full battle gear from amphibious landing craft directly onto the beaches.</p><p><strong>(ii) What I can infer:</strong><br>I can infer that the United States government made a major public show of military strength to demonstrate its commitment to South Vietnam.<br><strong>Details in the source that tell me this:</strong><br>The landing at Da Nang was accompanied by national press photographers, television cameras, and welcoming crowds of local officials.</p>",
        scaffolding: {
          acronym: "Inference + Detail Formula (AO3)",
          acronym_title: "Inference Formula: (i) Inference + Quote, (ii) Inference + Quote",
          steps: [
            { letter: "I1", name: "First Inference", prompt: "Deduce the transition from advisers to an active ground combat force.", starter: "What I can infer: I can infer that the American military role shifted to direct combat..." },
            { letter: "Q1", name: "Supporting Detail", prompt: "Quote or describe the battle gear and amphibious landing craft in Source A.", starter: "Details in the source that tell me this: The photograph shows combat Marines landing with heavy weaponry..." },
            { letter: "I2", name: "Second Inference", prompt: "Deduce the public, high-profile demonstration of American power.", starter: "What I can infer: A second inference is that the US intended to project resolute military power..." },
            { letter: "Q2", name: "Supporting Detail", prompt: "Describe the presence of cameras and official fanfare on the beach.", starter: "Details in the source that tell me this: The landing was staged before international media and local dignitaries..." }
          ]
        }
      },
      {
        tariff: "12 marks",
        type: "explain_why_12",
        question: "2. Explain why US military involvement in Vietnam escalated under President Johnson between 1964 and 1965. [12 marks]",
        stimulus: [
          "The Gulf of Tonkin incident (August 1964)",
          "The attack on the US base at Pleiku (February 1965)"
        ],
        prompt: "Write a three-paragraph PEEL essay explaining the Gulf of Tonkin Resolution, Operation Rolling Thunder, and the deployment of ground combat troops to Da Nang.",
        model: "One major reason why US military involvement escalated dramatically was the <strong>Gulf of Tonkin incident in August 1964</strong>. Following reports that North Vietnamese torpedo boats had engaged the destroyer USS Maddox in the Gulf of Tonkin, President Lyndon B. Johnson seized upon the contested second engagement to request emergency war powers from Congress. With only two dissenting votes, Congress passed the Gulf of Tonkin Resolution, empowering the president to 'take all necessary measures to repel any armed attack against the forces of the United States and to prevent further aggression.' This congressional blank cheque allowed Johnson to initiate military action without a formal declaration of war, removing legislative checks on presidential warmaking.<br><br>A second decisive trigger was the <strong>Vietcong attack on the US airbase at Pleiku in February 1965</strong>, which killed eight American servicemen and destroyed numerous aircraft. Johnson’s national security adviser, McGeorge Bundy, warned that South Vietnam was on the verge of total collapse and urged immediate retaliation. Johnson seized upon Pleiku as the pretext to launch Operation Rolling Thunder—a sustained, devastating aerial bombing offensive against North Vietnam intended to destroy factories, military bases, and the supply lines of the Ho Chi Minh Trail. Over three years, US aircraft dropped more tonnage of bombs on Vietnam than was dropped in all of World War II.<br><br>Finally, air strikes inevitably necessitated the <strong>deployment of American ground combat troops</strong> to secure airfields. General William Westmoreland warned Johnson that US airbases like Da Nang were surrounded by hostile guerrilla territory and could not be adequately protected by demoralized South Vietnamese forces. In March 1965, Johnson authorized the landing of 3,500 US Marines at Da Nang. Crucially, once combat troops were on the ground, Westmoreland immediately shifted their mission from defensive base security to aggressive offensive 'Search and Destroy' operations, causing US troop levels to surge past 184,000 by the end of 1965.",
        scaffolding: {
          acronym: "PEEL Structure Strip",
          acronym_title: "12-Mark Causal Explanation (Point • Evidence • Explain • Link)",
          steps: [
            { letter: "CAUSE 1", name: "Gulf of Tonkin Incident & Resolution", prompt: "Explain USS Maddox, congressional blank cheque, and executive war powers.", starter: "One major reason was the Gulf of Tonkin incident in August 1964..." },
            { letter: "CAUSE 2", name: "Pleiku Attack & Operation Rolling Thunder", prompt: "Explain 8 dead at Pleiku, McGeorge Bundy, and sustained aerial bombing of the North.", starter: "A second critical trigger was the attack on the US base at Pleiku..." },
            { letter: "CAUSE 3", name: "Da Nang Marine Landing & Search and Destroy", prompt: "Explain Westmoreland, base defense, Marines at Da Nang, and 184,000 troop surge.", starter: "Finally, aerial bombing necessitated the deployment of US ground combat troops..." }
          ],
          sentence_starters: ["One major reason was...", "For example, ...", "This meant that...", "Therefore, involvement escalated because...", "Furthermore, ...", "Consequently, ..."],
          connectives_bank: ["USS Maddox", "Gulf of Tonkin Resolution", "Blank cheque", "Pleiku attack", "Operation Rolling Thunder", "McGeorge Bundy", "Da Nang", "William Westmoreland", "Search and Destroy"]
        }
      }
    ]
  },

  lesson_3_3: {
    title: "Edexcel GCSE (9–1) Paper 3 Exam Practice",
    tariff: "16 marks (Q1 Inference [4m] & Q2 Causation Essay [12m])",
    questions: [
      {
        tariff: "4 marks",
        type: "inference_4m",
        question: "1. Give two things you can infer from Source A about the role of helicopters in US combat operations in Vietnam. [4 marks]",
        prompt: "Give two separate inferences based on Source A (Bell UH-1 'Huey' landing troops on a search-and-destroy mission).",
        model: "<p><strong>(i) What I can infer:</strong><br>I can infer that helicopters were essential for navigating difficult jungle terrain and deploying troops rapidly.<br><strong>Details in the source that tell me this:</strong><br>The Huey helicopter is shown landing directly in cleared jungle clearings and tall elephant grass where conventional vehicles could not travel.</p><p><strong>(ii) What I can infer:</strong><br>I can infer that American patrols relied heavily on air mobility for quick evacuation and close air support.<br><strong>Details in the source that tell me this:</strong><br>The soldiers leap out while the rotors are still spinning, prepared for immediate combat while the armed helicopter provides perimeter fire.</p>",
        scaffolding: {
          acronym: "Inference + Detail Formula (AO3)",
          acronym_title: "Inference Formula: (i) Inference + Quote, (ii) Inference + Quote",
          steps: [
            { letter: "I1", name: "First Inference", prompt: "Deduce the tactical necessity of helicopters in roadless jungle terrain.", starter: "What I can infer: I can infer that helicopters were crucial for operating in roadless jungle..." },
            { letter: "Q1", name: "Supporting Detail", prompt: "Describe the helicopter hovering over dense elephant grass and jungle clearings.", starter: "Details in the source that tell me this: The photograph shows the helicopter touching down in dense jungle..." },
            { letter: "I2", name: "Second Inference", prompt: "Deduce the rapid insertion and reliance on immediate aerial evacuation.", starter: "What I can infer: A second inference is that US combat doctrine depended on rapid troop insertion..." },
            { letter: "Q2", name: "Supporting Detail", prompt: "Describe the soldiers leaping out under spinning rotors in combat readiness.", starter: "Details in the source that tell me this: Soldiers are shown exiting rapidly while rotors are in motion..." }
          ]
        }
      },
      {
        tariff: "12 marks",
        type: "explain_why_12",
        question: "2. Explain why US military tactics failed to defeat the Vietcong between 1965 and 1968. [12 marks]",
        stimulus: [
          "Vietcong guerrilla tactics and underground tunnel networks",
          "US Search and Destroy missions and chemical defoliants (Agent Orange)"
        ],
        prompt: "Write a three-paragraph PEEL essay explaining guerrilla tactics/tunnels, alienating civilian tactics (napalm/Zippo raids), and the failure of attrition/body counts.",
        model: "One major reason why US tactics failed was the asymmetric superiority of <strong>Vietcong guerrilla tactics and tunnel networks</strong>. Lacking tanks and aircraft, the Vietcong avoided pitched battles, adopting Maoist guerrilla principles: 'When the enemy advances, we retreat; when the enemy camps, we harass.' The Vietcong lived among the peasantry, wore ordinary civilian clothes, and operated an extensive network of subterranean tunnels—such as Cu Chi—which contained hospitals, weapons factories, and living quarters impervious to US bombing. By employing punji-stick traps, tripwires, and 'hanging onto the belts' of American troops (fighting at such close quarters that US artillery and air strikes could not be called without killing their own men), the Vietcong neutralized American technological and air superiority.<br><br>Furthermore, American tactics alienated the South Vietnamese rural population through brutal <strong>Search and Destroy missions and chemical warfare</strong>. General Westmoreland’s strategy relied on transporting troops by helicopter into suspected guerrilla villages, killing suspected Vietcong, and burning the settlement to the ground (known as 'Zippo raids'). To strip away jungle canopy and destroy food supplies, US planes sprayed over nineteen million gallons of toxic defoliants like Agent Orange and dropped napalm (jellied petroleum). These indiscriminate tactics destroyed crops, caused catastrophic civilian burns and birth defects, and turned millions of peasants into homeless refugees. Consequently, instead of pacifying the countryside, US tactics drove thousands of furious peasants into actively supporting the Vietcong.<br><br>Finally, the American strategy of <strong>attrition based on 'body counts'</strong> was fundamentally flawed against a fanatically motivated enemy. Westmoreland believed that inflicting massive casualties would reach a 'crossover point' where the communists could no longer replace their losses. However, the North Vietnamese and Vietcong demonstrated extraordinary ideological endurance, accepting over 200,000 casualties a year to achieve national reunification. The Ho Chi Minh Trail, heavily fortified and constantly repaired by 300,000 labourers, kept an endless flow of weapons and Soviet/Chinese supplies moving south, ensuring that US tactical victories never translated into strategic defeat for the communists.",
        scaffolding: {
          acronym: "PEEL Structure Strip",
          acronym_title: "12-Mark Causal Explanation (Point • Evidence • Explain • Link)",
          steps: [
            { letter: "CAUSE 1", name: "Guerrilla Warfare & Cu Chi Tunnels", prompt: "Explain fighting at close quarters, punji traps, tunnel networks, and no pitched battles.", starter: "One major reason was the effectiveness of Vietcong guerrilla tactics and underground tunnels..." },
            { letter: "CAUSE 2", name: "Alienation via Search & Destroy / Defoliants", prompt: "Explain Zippo raids, civilian burns, Agent Orange, and losing civilian 'hearts and minds'.", starter: "Furthermore, US tactics like Search and Destroy and Agent Orange alienated ordinary peasants..." },
            { letter: "CAUSE 3", name: "Flawed Attrition Strategy & Ho Chi Minh Trail", prompt: "Explain body counts failure, endless communist replenishment, and Soviet/Chinese supplies.", starter: "Finally, the American strategy of attrition failed because communist morale could not be broken..." }
          ],
          sentence_starters: ["One major reason was...", "For example, ...", "This meant that...", "Therefore, US tactics failed because...", "Furthermore, ...", "Consequently, ..."],
          connectives_bank: ["Guerrilla warfare", "Cu Chi tunnels", "Punji sticks", "Hanging onto belts", "Search and Destroy", "Zippo raids", "Agent Orange", "Napalm", "Body counts", "Ho Chi Minh Trail"]
        }
      }
    ]
  },

  lesson_3_4: {
    title: "Edexcel GCSE (9–1) Paper 3 Exam Practice",
    tariff: "16 marks (Q1 Inference [4m] & Q2 Causation Essay [12m])",
    questions: [
      {
        tariff: "4 marks",
        type: "inference_4m",
        question: "1. Give two things you can infer from Source A about President Nixon's visit to US soldiers in Vietnam in 1969. [4 marks]",
        prompt: "Give two separate inferences based on Source A (President Nixon visiting troops of the 1st Infantry Division at Di An).",
        model: "<p><strong>(i) What I can infer:</strong><br>I can infer that President Nixon was eager to demonstrate personal solidarity and boost morale among frontline troops.<br><strong>Details in the source that tell me this:</strong><br>Nixon is shown in casual attire shaking hands and chatting directly with young infantrymen in a relaxed field setting.</p><p><strong>(ii) What I can infer:</strong><br>I can infer that the visit was staged to reassure the American public that the newly elected president was managing the war responsibly.<br><strong>Details in the source that tell me this:</strong><br>The encounter was heavily photographed by White House press teams to broadcast images of presidential leadership back to the home front.</p>",
        scaffolding: {
          acronym: "Inference + Detail Formula (AO3)",
          acronym_title: "Inference Formula: (i) Inference + Quote, (ii) Inference + Quote",
          steps: [
            { letter: "I1", name: "First Inference", prompt: "Deduce the attempt to bolster soldier morale and demonstrate solidarity.", starter: "What I can infer: I can infer that Nixon sought to boost troop morale directly..." },
            { letter: "Q1", name: "Supporting Detail", prompt: "Describe Nixon shaking hands and interacting casually with soldiers.", starter: "Details in the source that tell me this: The photograph shows him shaking hands warmly in the field..." },
            { letter: "I2", name: "Second Inference", prompt: "Deduce the political PR aim of reassuring domestic voters during Vietnamization.", starter: "What I can infer: A second inference is that the visit was intended for domestic political PR..." },
            { letter: "Q2", name: "Supporting Detail", prompt: "Describe the presence of news cameras capturing the staged encounter.", starter: "Details in the source that tell me this: White House cameras captured the event for national broadcast..." }
          ]
        }
      },
      {
        tariff: "12 marks",
        type: "explain_why_12",
        question: "2. Explain why the Tet Offensive of January 1968 was a decisive turning point in the Vietnam War. [12 marks]",
        stimulus: [
          "The military outcome for the Vietcong and US forces",
          "The 'credibility gap' and Walter Cronkite's television report"
        ],
        prompt: "Write a three-paragraph PEEL essay explaining military reality vs political shock, media coverage/credibility gap, and Johnson’s decision to abandon re-election.",
        model: "One major reason why the Tet Offensive was a turning point was the profound <strong>psychological and political shock</strong> it inflicted on the American public and political leadership. Prior to January 1968, the Johnson administration and General Westmoreland repeatedly assured Americans that the war was being won and that the enemy was running out of men. However, during the Vietnamese lunar new year, 84,000 North Vietnamese and Vietcong troops launched coordinated surprise assaults against over one hundred cities, including provincial capitals and the US Embassy in Saigon. Although US and ARVN forces quickly repelled the attacks and killed an estimated 45,000 communist fighters—virtually wiping out the Vietcong as an effective fighting force—the sheer scale of the offensive shattered the administration's optimistic claims.<br><br>Furthermore, the offensive created an insurmountable <strong>'credibility gap' exacerbated by honest media reporting</strong>. For the first time, Americans watched unedited television footage of street fighting in Saigon, dead bodies inside the US Embassy compound, and the execution of a suspected Vietcong fighter by South Vietnam's police chief on national news. Respected CBS news anchor Walter Cronkite visited Vietnam and declared on prime-time television that the war was 'mired in stalemate' and that negotiations were the only rational exit. Upon watching Cronkite’s broadcast, President Johnson famously remarked: 'If I’ve lost Cronkite, I’ve lost Middle America', marking the collapse of the bipartisan consensus supporting the war.<br><br>Finally, the Tet Offensive led directly to a <strong>complete reversal of US strategic policy</strong>. Public approval for Johnson's handling of the war plummeted to twenty-six percent, while anti-war challengers Eugene McCarthy and Robert F. Kennedy surged in Democratic primary elections. Facing political exhaustion and military failure, Johnson shocked the nation in a televised address on 31 March 1968: he announced an immediate halt to bombing over most of North Vietnam, called for peace talks, and declared that he would not seek re-election. Tet marked the decisive end of American escalation and forced Washington onto the defensive path of negotiated disengagement.",
        scaffolding: {
          acronym: "PEEL Structure Strip",
          acronym_title: "12-Mark Causal Explanation (Point • Evidence • Explain • Link)",
          steps: [
            { letter: "CAUSE 1", name: "Psychological Shock vs Military Reality", prompt: "Explain 84,000 attackers, US embassy siege, Vietcong destruction vs domestic shock.", starter: "One major reason Tet was a turning point was the psychological shock it inflicted..." },
            { letter: "CAUSE 2", name: "Credibility Gap & Walter Cronkite", prompt: "Explain live TV footage, embassy bodies, Cronkite's 'stalemate' verdict, and LBJ's despair.", starter: "Furthermore, Tet created an insurmountable credibility gap through media reporting..." },
            { letter: "CAUSE 3", name: "LBJ's Abdication & Strategic De-escalation", prompt: "Explain March 31 speech, halting bombing, peace talks, and LBJ refusing re-election.", starter: "Finally, Tet forced a fundamental reversal of American military strategy..." }
          ],
          sentence_starters: ["One major reason was...", "For example, ...", "This meant that...", "Therefore, Tet was a turning point because...", "Furthermore, ...", "Consequently, ..."],
          connectives_bank: ["Tet Offensive", "US Embassy siege", "Westmoreland", "Credibility gap", "Walter Cronkite", "Middle America", "Eugene McCarthy", "March 31 1968 speech", "Peace talks"]
        }
      }
    ]
  },

  // =========================================================================
  // KEY TOPIC 4: END OF THE VIETNAM WAR (Lessons 13–16)
  // =========================================================================

  lesson_4_1: {
    title: "Edexcel GCSE (9–1) Paper 3 Exam Practice",
    tariff: "16 marks (Q1 Inference [4m] & Q2 Causation Essay [12m])",
    questions: [
      {
        tariff: "4 marks",
        type: "inference_4m",
        question: "1. Give two things you can infer from Source A about the introduction of the military draft lottery in 1969. [4 marks]",
        prompt: "Give two separate inferences based on Source A (Drawing birthdate capsules from a glass urn during the first US draft lottery, December 1969).",
        model: "<p><strong>(i) What I can infer:</strong><br>I can infer that the federal government sought to make the conscription process appear transparent and impartial.<br><strong>Details in the source that tell me this:</strong><br>Officials pulled birthdates from a large transparent glass urn on live national television under public scrutiny.</p><p><strong>(ii) What I can infer:</strong><br>I can infer that military conscription generated immense anxiety and directly affected millions of young American men.<br><strong>Details in the source that tell me this:</strong><br>The lottery determined the draft order for all men aged 19 to 26, meaning a low lottery number meant almost certain deployment to Vietnam.</p>",
        scaffolding: {
          acronym: "Inference + Detail Formula (AO3)",
          acronym_title: "Inference Formula: (i) Inference + Quote, (ii) Inference + Quote",
          steps: [
            { letter: "I1", name: "First Inference", prompt: "Deduce the government's attempt to prove the draft was fair and random.", starter: "What I can infer: I can infer that authorities attempted to make conscription appear impartial..." },
            { letter: "Q1", name: "Supporting Detail", prompt: "Describe the transparent glass urn and televised broadcast in Source A.", starter: "Details in the source that tell me this: The photograph shows capsules drawn publicly from a glass urn..." },
            { letter: "I2", name: "Second Inference", prompt: "Deduce the profound anxiety and direct life-or-death impact on young Americans.", starter: "What I can infer: A second inference is that conscription caused widespread dread among draft-age men..." },
            { letter: "Q2", name: "Supporting Detail", prompt: "Explain how drawing birthdates directly determined call-up to the war zone.", starter: "Details in the source that tell me this: A low number selected meant immediate military induction..." }
          ]
        }
      },
      {
        tariff: "12 marks",
        type: "explain_why_12",
        question: "2. Explain why public opposition to the Vietnam War intensified in the United States between 1968 and 1971. [12 marks]",
        stimulus: [
          "Revelations of the My Lai massacre (November 1969)",
          "The Kent State University shootings (May 1970)"
        ],
        prompt: "Write a three-paragraph PEEL essay explaining moral horror over war atrocities (My Lai), the unpopularity of the draft/veterans protesting, and campus tragedies like Kent State.",
        model: "One major reason why anti-war opposition intensified was moral outrage following revelations of the <strong>My Lai massacre in November 1969</strong>. In March 1968, American troops of Charlie Company, commanded by Lieutenant William Calley, murdered over 500 unarmed Vietnamese civilians—including women, children, and infants—in the village of My Lai. When journalist Seymour Hersh uncovered the massacre and photographs of piles of corpses were published in Life magazine, the revelations shattered the cherished American belief that US troops were fighting a noble, moral crusade for democracy. Public disgust escalated when the military initially covered up the massacre and Calley served only three and a half years of house arrest, driving millions of moderate Americans into the anti-war movement.<br><br>Furthermore, anti-war sentiment was fueled by growing anger over the <strong>military draft and the active resistance of Vietnam veterans</strong>. The conscription system was widely viewed as deeply discriminatory, as college deferments allowed affluent white youths to avoid service while working-class and minority youths were drafted in disproportionate numbers. Activists burned draft cards, dodged conscription by fleeing to Canada, and staged the massive Moratorium protests in October 1969, bringing two million citizens into the streets. Crucially, the creation of Vietnam Veterans Against the War (VVAW), led by figures like John Kerry, provided devastating moral authority: decorated veterans threw their combat medals onto the Capitol steps in Washington, testifying before Congress about widespread military atrocities.<br><br>Finally, opposition exploded into violent national turmoil following <strong>Nixon's invasion of Cambodia and the Kent State shootings in May 1970</strong>. When President Nixon announced on television that US forces had invaded neutral Cambodia—directly contradicting his promise of de-escalation—colleges across the country erupted in furious strikes. At Kent State University in Ohio, panicked National Guardsmen fired sixty-seven live rounds into a crowd of unarmed student demonstrators, killing four and wounding nine. The tragedy triggered a nationwide student strike that shut down over 450 universities, polarizing American society and convincing millions that the war was destroying democracy at home.",
        scaffolding: {
          acronym: "PEEL Structure Strip",
          acronym_title: "12-Mark Causal Explanation (Point • Evidence • Explain • Link)",
          steps: [
            { letter: "CAUSE 1", name: "My Lai Massacre & Moral Disillusionment", prompt: "Explain 500 murdered civilians, William Calley, Seymour Hersh, Life magazine photos.", starter: "One major reason opposition intensified was the moral horror of the My Lai massacre..." },
            { letter: "CAUSE 2", name: "Draft Inequity & Vietnam Veterans Protesting", prompt: "Explain draft unfairness, Moratorium marches, and Vietnam Veterans Against the War.", starter: "Furthermore, anger grew over the military draft and veteran opposition..." },
            { letter: "CAUSE 3", name: "Cambodia Invasion & Kent State Shootings", prompt: "Explain Nixon's secret war, 4 students killed by National Guard, and 450 campus strikes.", starter: "Finally, opposition exploded following the invasion of Cambodia and the Kent State massacre..." }
          ],
          sentence_starters: ["One major reason was...", "For example, ...", "This caused outrage because...", "Therefore, anti-war sentiment intensified because...", "Furthermore, ...", "Consequently, ..."],
          connectives_bank: ["My Lai", "Charlie Company", "William Calley", "Seymour Hersh", "Draft lottery", "Moratorium", "Vietnam Veterans Against the War", "Cambodia invasion", "Kent State", "National Guard"]
        }
      }
    ]
  },

  lesson_4_2: {
    title: "Edexcel GCSE (9–1) Paper 3 Exam Practice",
    tariff: "16 marks (Q1 Inference [4m] & Q2 Causation Essay [12m])",
    questions: [
      {
        tariff: "4 marks",
        type: "inference_4m",
        question: "1. Give two things you can infer from Source A about President Nixon's televised 'Silent Majority' address (November 1969). [4 marks]",
        prompt: "Give two separate inferences based on Source A (President Nixon delivering his address from the Oval Office).",
        model: "<p><strong>(i) What I can infer:</strong><br>I can infer that President Nixon believed a substantial portion of Americans still supported his war policy despite loud anti-war protests.<br><strong>Details in the source that tell me this:</strong><br>Nixon explicitly appeals to the 'great silent majority' of Americans, asking for their backing against vocal street demonstrators.</p><p><strong>(ii) What I can infer:</strong><br>I can infer that Nixon rejected immediate withdrawal as an unacceptable defeat that would destroy American global credibility.<br><strong>Details in the source that tell me this:</strong><br>He warns that an immediate precipitate retreat would be a disaster for peace and result in a massacre of South Vietnamese allies.</p>",
        scaffolding: {
          acronym: "Inference + Detail Formula (AO3)",
          acronym_title: "Inference Formula: (i) Inference + Quote, (ii) Inference + Quote",
          steps: [
            { letter: "I1", name: "First Inference", prompt: "Deduce Nixon's belief in widespread, quiet conservative support.", starter: "What I can infer: I can infer that Nixon claimed the majority of Americans supported his war policy..." },
            { letter: "Q1", name: "Supporting Detail", prompt: "Quote the famous phrase appealing to the 'great silent majority'.", starter: "Details in the source that tell me this: He explicitly asked the great silent majority for support..." },
            { letter: "I2", name: "Second Inference", prompt: "Deduce the refusal to accept immediate retreat due to global credibility.", starter: "What I can infer: A second inference is that Nixon argued immediate withdrawal was dangerous and humiliating..." },
            { letter: "Q2", name: "Supporting Detail", prompt: "Quote his warning that precipitate withdrawal would cause a bloodbath and humiliation.", starter: "Details in the source that tell me this: He argued that precipitate withdrawal would result in disaster..." }
          ]
        }
      },
      {
        tariff: "12 marks",
        type: "explain_why_12",
        question: "2. Explain why President Richard Nixon introduced the policy of 'Vietnamization' in 1969. [12 marks]",
        stimulus: [
          "Domestic anti-war protests and the 'Silent Majority'",
          "The aim of achieving 'peace with honour'"
        ],
        prompt: "Write a three-paragraph PEEL essay explaining the need to appease the home front, the military goal of training the ARVN, and Nixon’s triangular diplomacy.",
        model: "One major reason why President Nixon introduced Vietnamization was the intense domestic political pressure to <strong>reduce American battlefield casualties and defuse the anti-war movement</strong>. When Nixon assumed office in January 1969, over 540,000 US troops were stationed in Vietnam, with American casualties exceeding 300 per week. With public opinion sharply turning against the war, Nixon recognized that he could not sustain direct American military involvement without risking civil chaos at home. By announcing the systematic, phased withdrawal of US ground forces—withdrawing over 400,000 troops between 1969 and 1972—Nixon successfully took the steam out of anti-war protests and rallied his 'Silent Majority' of conservative, patriotic voters.<br><br>Furthermore, Vietnamization was designed to achieve Nixon's central foreign policy objective: <strong>'peace with honour'</strong>. Nixon refused to simply withdraw unilaterally, arguing that a sudden American abandonment of South Vietnam would look like a humiliating defeat that would destroy American credibility among Cold War allies. Instead, Vietnamization aimed to modernize and equip the Army of the Republic of Vietnam (ARVN) with billions of dollars in advanced US weaponry, tanks, and aircraft so that South Vietnam could defend itself independently. By shifting the burden of ground combat to the ARVN while maintaining ferocious US air support, Nixon hoped to force North Vietnam into diplomatic concessions at the Paris peace talks.<br><br>Finally, Vietnamization was a crucial pillar of the broader <strong>Nixon Doctrine and triangular diplomacy</strong> orchestrated by National Security Adviser Henry Kissinger. Nixon recognized that the US could no longer act as the world’s unilateral policeman and needed to adjust to a multipolar world. By opening historic diplomatic relations with communist China in 1972 and pursuing détente with the Soviet Union, Nixon pressured North Vietnam's primary military suppliers to encourage Hanoi to negotiate. Vietnamization allowed Nixon to extricate US ground troops while using triangular diplomacy and heavy aerial bombing (Operation Linebacker) to preserve a pro-Western government in Saigon.",
        scaffolding: {
          acronym: "PEEL Structure Strip",
          acronym_title: "12-Mark Causal Explanation (Point • Evidence • Explain • Link)",
          steps: [
            { letter: "CAUSE 1", name: "Domestic Pressure & Troop Reductions", prompt: "Explain 540k troops, 300 dead per week, appeasing the public, and Silent Majority.", starter: "One major reason was domestic pressure to reduce American casualties and defuse protests..." },
            { letter: "CAUSE 2", name: "Aim of 'Peace with Honour' & ARVN Training", prompt: "Explain avoiding humiliation, supplying ARVN with modern arms, and diplomatic leverage.", starter: "Furthermore, Vietnamization was designed to achieve 'peace with honour'..." },
            { letter: "CAUSE 3", name: "Nixon Doctrine & Triangular Diplomacy", prompt: "Explain Henry Kissinger, opening China, détente with Moscow, and Operation Linebacker.", starter: "Finally, the policy fit Nixon's wider strategic framework of triangular diplomacy..." }
          ],
          sentence_starters: ["One major reason was...", "For example, ...", "This was crucial because...", "Therefore, Vietnamization was adopted because...", "Furthermore, ...", "Consequently, ..."],
          connectives_bank: ["Vietnamization", "Peace with honour", "Silent Majority", "Phased withdrawal", "ARVN", "Nixon Doctrine", "Henry Kissinger", "Triangular diplomacy", "Détente", "Operation Linebacker"]
        }
      }
    ]
  },

  lesson_4_3: {
    title: "Edexcel GCSE (9–1) Paper 3 Exam Practice",
    tariff: "16 marks (Q1 Inference [4m] & Q2 Causation Essay [12m])",
    questions: [
      {
        tariff: "4 marks",
        type: "inference_4m",
        question: "1. Give two things you can infer from Source A about the signing of the Paris Peace Accords in January 1973. [4 marks]",
        prompt: "Give two separate inferences based on Source A (Formal signing ceremony at the Centre International de Conférences in Paris).",
        model: "<p><strong>(i) What I can infer:</strong><br>I can infer that the peace agreement was concluded through formal, high-level multilateral diplomacy.<br><strong>Details in the source that tell me this:</strong><br>Delegates from the United States, North Vietnam, South Vietnam, and the Vietcong are seated around a grand formal diplomatic conference table.</p><p><strong>(ii) What I can infer:</strong><br>I can infer that the accords represented an uneasy, strained diplomatic compromise rather than genuine reconciliation.<br><strong>Details in the source that tell me this:</strong><br>The opposing representatives remain rigidly formal and separated, signing separate copies without personal celebration or handshake.</p>",
        scaffolding: {
          acronym: "Inference + Detail Formula (AO3)",
          acronym_title: "Inference Formula: (i) Inference + Quote, (ii) Inference + Quote",
          steps: [
            { letter: "I1", name: "First Inference", prompt: "Deduce the high-level, formal diplomatic nature of the treaty signing.", starter: "What I can infer: I can infer that the agreement was the result of extensive multilateral diplomacy..." },
            { letter: "Q1", name: "Supporting Detail", prompt: "Describe the grand conference table with all four delegations present.", starter: "Details in the source that tell me this: The photograph shows all four delegations seated formally..." },
            { letter: "I2", name: "Second Inference", prompt: "Deduce the lingering tension and lack of genuine trust between the parties.", starter: "What I can infer: A second inference is that deep ideological hostility remained between the signatories..." },
            { letter: "Q2", name: "Supporting Detail", prompt: "Note the stiff, cold demeanor of the delegates signing without celebration.", starter: "Details in the source that tell me this: The representatives sign documents in rigid separation..." }
          ]
        }
      },
      {
        tariff: "12 marks",
        type: "explain_why_12",
        question: "2. Explain why the Paris Peace Accords were signed in January 1973. [12 marks]",
        stimulus: [
          "The 'Christmas Bombings' (Operation Linebacker II, December 1972)",
          "The diplomatic rapprochement between the US, China, and the Soviet Union"
        ],
        prompt: "Write a three-paragraph PEEL essay explaining US triangular diplomacy, the Christmas Bombings/coercion, and mutual exhaustion/compromise.",
        model: "One major reason why the Paris Peace Accords were signed was the strategic leverage created by <strong>Nixon and Kissinger’s triangular diplomacy</strong>. In 1972, Nixon made historic visits to Beijing and Moscow, securing trade pacts and initiating détente. Recognizing that the superpower Cold War was shifting, China and the Soviet Union were eager to improve relations with the US and reduce their financial commitments to North Vietnam. Consequently, both Beijing and Moscow exerted diplomatic pressure on Hanoi to show flexibility at the secret Paris peace talks conducted by Henry Kissinger and Le Duc Tho, depriving North Vietnam of unconditional superpower support.<br><br>Furthermore, the breakthrough was achieved through intense military coercion via the <strong>'Christmas Bombings' of December 1972 (Operation Linebacker II)</strong>. When talks broke down in late 1972 due to South Vietnamese President Thieu’s objections, Nixon unleashed the most ferocious aerial bombardment of the war. For eleven consecutive days, waves of B-52 bombers dropped over 20,000 tons of bombs on military targets in Hanoi and Haiphong, devastating North Vietnam's air defense infrastructure. The brutal bombardment signaled to North Vietnam that Nixon was prepared to use extreme violence, while reassuring a reluctant President Thieu that the US would enforce the terms of the treaty with massive airpower if the communists violated the agreement.<br><br>Finally, the treaty was signed because <strong>both sides reached mutual concessions born of exhaustion</strong>. For the United States, with only 24,000 troops remaining in Vietnam and Congress threatening to cut off all war funding, an agreement was essential to secure the return of 591 American prisoners of war (POWs). For North Vietnam, the final agreement permitted 150,000 North Vietnamese troops (PAVN) to remain stationed in South Vietnam, ensuring that while US combat forces would withdraw completely within sixty days, the communist military apparatus in the South remained intact for an inevitable future offensive.",
        scaffolding: {
          acronym: "PEEL Structure Strip",
          acronym_title: "12-Mark Causal Explanation (Point • Evidence • Explain • Link)",
          steps: [
            { letter: "CAUSE 1", name: "Triangular Diplomacy (China & USSR)", prompt: "Explain Nixon in Beijing/Moscow, détente, and pressure on Hanoi to negotiate.", starter: "One major reason was the diplomatic pressure generated by triangular diplomacy..." },
            { letter: "CAUSE 2", name: "Christmas Bombings (Operation Linebacker II)", prompt: "Explain 11 days of B-52 raids, 20k tons of bombs, forcing Hanoi and reassuring Thieu.", starter: "Furthermore, the signing was coerced by the Christmas Bombings in December 1972..." },
            { letter: "CAUSE 3", name: "Mutual Concessions & POW Release", prompt: "Explain US complete withdrawal within 60 days, return of 591 POWs, and PAVN staying in South.", starter: "Finally, the accords were signed because both sides reached crucial compromises..." }
          ],
          sentence_starters: ["One major reason was...", "For example, ...", "This meant that...", "Therefore, the accords were signed because...", "Furthermore, ...", "Consequently, ..."],
          connectives_bank: ["Paris Peace Accords", "Henry Kissinger", "Le Duc Tho", "Triangular diplomacy", "Beijing and Moscow", "Christmas Bombings", "Operation Linebacker II", "Nguyen Van Thieu", "POW release"]
        }
      }
    ]
  },

  lesson_4_4: {
    title: "Edexcel GCSE (9–1) Paper 3 Exam Practice",
    tariff: "16 marks (Q1 Inference [4m] & Q2 Causation Essay [12m])",
    questions: [
      {
        tariff: "4 marks",
        type: "inference_4m",
        question: "1. Give two things you can infer from Source A about the physical and psychological toll on US combat soldiers in Vietnam. [4 marks]",
        prompt: "Give two separate inferences based on Source A (Exhausted, mud-covered US conscript resting in a canal after patrol).",
        model: "<p><strong>(i) What I can infer:</strong><br>I can infer that American soldiers endured punishing physical conditions in extreme, grueling environments.<br><strong>Details in the source that tell me this:</strong><br>The soldier is drenched in muddy canal water, with soaked boots and clothes weighed down by heavy combat gear.</p><p><strong>(ii) What I can infer:</strong><br>I can infer that the war inflicted severe psychological exhaustion and trauma on combat troops.<br><strong>Details in the source that tell me this:</strong><br>The soldier displays a hollow, vacant facial expression ('thousand-yard stare'), resting his head on his rifle in profound fatigue.</p>",
        scaffolding: {
          acronym: "Inference + Detail Formula (AO3)",
          acronym_title: "Inference Formula: (i) Inference + Quote, (ii) Inference + Quote",
          steps: [
            { letter: "I1", name: "First Inference", prompt: "Deduce the grueling, punishing physical environment endured by soldiers.", starter: "What I can infer: I can infer that combat soldiers suffered punishing physical exhaustion..." },
            { letter: "Q1", name: "Supporting Detail", prompt: "Describe the mud, canal water, and heavy combat equipment in Source A.", starter: "Details in the source that tell me this: The photograph shows the soldier drenched in muddy water..." },
            { letter: "I2", name: "Second Inference", prompt: "Deduce the profound psychological shock, trauma, and emotional numbness.", starter: "What I can infer: A second inference is that soldiers suffered acute psychological trauma..." },
            { letter: "Q2", name: "Supporting Detail", prompt: "Describe the hollow facial stare and slumped posture in the ditch.", starter: "Details in the source that tell me this: His vacant facial expression and slumped posture demonstrate shock..." }
          ]
        }
      },
      {
        tariff: "12 marks",
        type: "explain_why_12",
        question: "2. Explain why South Vietnam collapsed so rapidly in 1975 following the withdrawal of US forces. [12 marks]",
        stimulus: [
          "The corruption and military weaknesses of the ARVN",
          "US congressional cuts to military and economic aid"
        ],
        prompt: "Write a three-paragraph PEEL essay explaining ARVN weakness/desertion, US congressional aid cuts/Watergate, and the rapid 1975 Spring Offensive.",
        model: "One major reason why South Vietnam collapsed so rapidly was the profound structural <strong>weakness, corruption, and low morale of the ARVN</strong> (Army of the Republic of Vietnam). Despite receiving billions of dollars in American tanks, aircraft, and artillery, the ARVN was crippled by corrupt, politically appointed officers who embezzled military funds and falsified troop numbers ('ghost soldiers'). When North Vietnamese forces launched local probes in late 1974, ARVN units panicked, suffering desertion rates exceeding 100,000 men per year. A chaotic tactical retreat ordered by President Thieu in the Central Highlands turned into the 'Convoy of Tears', where military discipline disintegrated and soldiers abandoned their equipment, leaving major cities like Da Nang and Hue to fall without a fight.<br><br>Furthermore, South Vietnam’s collapse was accelerated by <strong>drastic US congressional cuts to military and economic aid</strong>. Following the Paris Accords, the Watergate scandal broke, fatally weakening President Nixon and forcing his resignation in August 1974. Asserting its authority, the Democrat-controlled Congress passed the War Powers Act (1973) to curb presidential military action and drastically slashed financial aid to Saigon from $3 billion to less than $700 million. Deprived of spare parts, fuel, and ammunition, the ARVN could no longer operate its sophisticated American aircraft or heavy artillery. Crucially, when North Vietnam launched its final invasion, Congress refused President Gerald Ford’s desperate pleas for emergency air support, leaving Saigon completely abandoned.<br><br>Finally, the collapse was sealed by the overwhelming speed and unified strategy of <strong>North Vietnam's 1975 Spring Offensive</strong>. Realizing that the United States would not re-intervene, General Van Tien Dung launched a massive conventional blitzkrieg spearheaded by heavy Soviet-supplied T-54 tanks and motorized divisions. Originally planned as a two-year campaign, the North Vietnamese overran the South in just fifty-five days. On 30 April 1975, communist tanks smashed through the gates of the Presidential Palace in Saigon, marking the unconditional surrender of South Vietnam and the ultimate reunification of the country under communist rule.",
        scaffolding: {
          acronym: "PEEL Structure Strip",
          acronym_title: "12-Mark Causal Explanation (Point • Evidence • Explain • Link)",
          steps: [
            { letter: "CAUSE 1", name: "ARVN Corruption & 'Convoy of Tears'", prompt: "Explain ghost soldiers, desertions over 100k, Thieu's retreat, and collapse at Da Nang.", starter: "One major reason was the internal corruption and collapse of the ARVN..." },
            { letter: "CAUSE 2", name: "US Congressional Aid Cuts & Watergate", prompt: "Explain Watergate, War Powers Act, aid slashed to $700M, and Congress refusing air support.", starter: "Furthermore, the collapse was accelerated by US congressional cuts to military aid..." },
            { letter: "CAUSE 3", name: "1975 Spring Offensive & Fall of Saigon", prompt: "Explain 55-day blitzkrieg, T-54 tanks, April 30 surrender, and reunification.", starter: "Finally, the rapid collapse was sealed by North Vietnam's 1975 Spring Offensive..." }
          ],
          sentence_starters: ["One major reason was...", "For example, ...", "This meant that...", "Therefore, South Vietnam collapsed rapidly because...", "Furthermore, ...", "Consequently, ..."],
          connectives_bank: ["ARVN", "President Thieu", "Ghost soldiers", "Convoy of Tears", "Watergate", "War Powers Act 1973", "Aid cuts", "Gerald Ford", "Spring Offensive 1975", "Fall of Saigon"]
        }
      }
    ]
  }
};

module.exports = {
  USA_EXAM_PRACTICE_DATA
};
