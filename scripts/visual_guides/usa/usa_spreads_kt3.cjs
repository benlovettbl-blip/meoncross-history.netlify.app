/**
 * usa_spreads_kt3.cjs
 *
 * Spreads 9 to 12 for Key Topic 3: US Involvement in the Vietnam War, 1954–75
 * Grounded in Hodder GCSE History for Edexcel (Steve Waugh & John Wright, pp. 64–95)
 *
 * Enforces the Paper 3 4-4-4-4 Question Matrix:
 * - Spread 9 (KT 3.1): inference_causation (Section A: Q1 Inference [4m] + Q2 Explain Why [12m])
 * - Spread 10 (KT 3.2): source_utility (Section B: Q3(a) Utility of Sources B and C [8m])
 * - Spread 11 (KT 3.3): interpretation_diff_why (Section B: Q3(b) Views Diff [4m] + Q3(c) Reasons [4m])
 * - Spread 12 (KT 3.4): interpretation_eval (Section B: Q3(d) Evaluative Essay [16+4m])
 */

module.exports = [
  // =========================================================================
  // SPREAD 9: KT 3.1 — REASONS FOR US INVOLVEMENT, 1954–63 (EISENHOWER & KENNEDY)
  // Exam Format: inference_causation (Section A: Q1 [4m] + Q2 [12m])
  // =========================================================================
  {
    id: 'lesson_3_1',
    topic: 'Key Topic 3: US Involvement in Vietnam, 1954–75',
    title: 'KT 3.1: Reasons for US Involvement in Vietnam, 1954–63',
    footerTag: 'KT 3.1: US Involvement, 1954–63',
    left: {
      sectionTag: 'Cold War Origins',
      contextTitle: 'Strategic Context & Geopolitical Overview',
      summary:
        "Following France's defeat at Dien Bien Phu and the 1954 Geneva Accords dividing Vietnam at the 17th Parallel, the US intervened to contain communism. Driven by Eisenhower's Domino Theory, Washington installed Ngo Dinh Diem, cancelled the scheduled 1956 elections, and funded Saigon. However, Diem's autocracy, corruption, and persecution of Buddhists alienated the rural population, culminating in his overthrow in November 1963.",
      pillars: [
        {
          title: 'Geneva Accords & The Domino Theory (1954)',
          subtitle: 'Partition & The Cold War Rationale',
          bullets: [
            'Following the French surrender at **Dien Bien Phu** (May 1954), the Geneva Accords temporarily partitioned Vietnam along the **17th Parallel**.',
            'Nationwide democratic elections were scheduled for July 1956 to reunify the country under a single national government.',
            'President Eisenhower formulated the **"Domino Theory"**: if South Vietnam fell to communism, Laos, Cambodia, Thailand, and Burma would rapidly collapse.',
            'The US refused to endorse Geneva, backed **Ngo Dinh Diem** as South Vietnamese President, and established SEATO to block communist expansion.',
          ],
        },
        {
          title: "Weaknesses of Ngo Dinh Diem's Regime",
          subtitle: 'Autocracy, Corruption & Catholic Favoritism',
          bullets: [
            'Diem cancelled the 1956 national elections with US approval, knowing communist leader **Ho Chi Minh** would win an estimated 80% majority.',
            'Diem ruled as an autocrat: rigged the 1955 referendum (claiming 98.2% of votes), gave government jobs to Catholic relatives, and imprisoned 40,000 opponents.',
            'He reversed land reforms, taking 2 million acres from peasants to return to wealthy Catholic landlords, who demanded up to 40% crop rent.',
            'In Dec 1960, southern rebels formed the **National Liberation Front (NLF / Vietcong)**, launching guerrilla warfare to overthrow Diem.',
          ],
        },
        {
          title: 'Kennedy Escalation & The Buddhist Crisis (1961–63)',
          subtitle: 'Strategic Hamlets & The Fall of Diem',
          bullets: [
            'President Kennedy dramatically expanded US aid, sending the "Green Berets" and increasing US military advisers from 900 to **16,000 by 1963**.',
            'In 1962, the US launched the **Strategic Hamlet Program**, moving peasants into fortified barbed-wire villages to isolate the Vietcong; it deeply alienated peasants.',
            "In May 1963, Diem banned the Buddhist flag on Buddha's birthday; monk **Thich Quang Duc** publicly burned himself to death in Saigon in protest.",
            'Recognising Diem was an impossible liability, the US covertly backed an ARVN military coup on **1–2 Nov 1963**; Diem was overthrown and assassinated.',
          ],
        },
      ],
      keyFigures: [
        {
          name: 'Dwight D. Eisenhower',
          role: '34th US President (1953–61); formulated Domino Theory and poured $1.2bn into South Vietnam to construct an anti-communist buffer state.',
        },
        {
          name: 'Ngo Dinh Diem',
          role: 'Catholic President of South Vietnam (1955–63); autocratic ruler assassinated in US-backed coup after alienating the 80% Buddhist majority.',
        },
        {
          name: 'Ho Chi Minh',
          role: 'Communist nationalist leader of North Vietnam; revered founder of Vietminh who orchestrated guerrilla resistance to French and US forces.',
        },
        {
          name: 'Thich Quang Duc',
          role: '66-year-old Buddhist monk whose self-immolation in Saigon on 11 June 1963 shocked global audiences and destroyed Diem’s international legitimacy.',
        },
      ],
      milestones: [
        {
          date: 'May 1954',
          event: 'French defeated at Dien Bien Phu; Geneva Accords divide Vietnam',
        },
        {
          date: 'Jul 1956',
          event: 'Diem cancels nationwide reunification elections with US support',
        },
        {
          date: 'Dec 1960',
          event: 'National Liberation Front (Vietcong) established in South Vietnam',
        },
        { date: 'Mar 1962', event: 'Strategic Hamlet Program launched to isolate rural Vietcong' },
        { date: 'Nov 1963', event: 'Diem overthrown and assassinated in US-backed military coup' },
      ],
    },
    right: {
      question: {
        typeHeader: 'Section A: Q1 Inference [4m] & Q2 Explain Why [12m]',
        title: 'Strategic Hamlets & US Cold War Escalation, 1954–63',
        stem: 'Q1 (4m) Inference from Source A &bull; Q2 (12m) Explain why US involvement in Vietnam increased between 1954 and 1963.',
        marks: '4 + 12 = 16',
        marksTime: '16 Marks &bull; ~24 Mins Total',
        planningGuideTitle: 'Examiner Planning & Structural Framework:',
        planningGuide:
          '<strong>Q1 Formula:</strong> Inference 1 + Direct Quote from Source A; Inference 2 + Direct Quote. Zero provenance.<br/><strong>Q2 Formula (3 PEE Paragraphs):</strong> (1) Geopolitical fear of Domino Theory & containment after Dien Bien Phu &rarr; (2) Inherent weakness and autocracy of Diem’s regime requiring US propping up &rarr; (3) Kennedy’s determination to look strong against communism after Cuba/Berlin.',
        modelAnswer:
          '<strong>Q1 (Inference):</strong> One inference from Source A is that Strategic Hamlets caused intense peasant resentment: "peasants were forcibly uprooted from ancestral grounds at bayonet point", showing resettlement was coerced by military force. A second inference is that hamlets failed to stop the Vietcong: "cadres operated freely inside the perimeter after dark", proving fortifications were easily infiltrated by communist guerrillas.<br/><br/><strong>Q2 (Explain Why):</strong> One major reason US involvement increased was Eisenhower’s "Domino Theory". Following the French defeat at Dien Bien Phu and the 1954 Geneva Accords dividing Vietnam at the 17th Parallel, US policymakers feared neighboring states (Laos, Cambodia, Thailand) would topple sequentially to communism. Washington poured $1.2 billion in aid into South Vietnam and established SEATO to guarantee regional defense.<br/><br/>A second crucial reason was the acute weakness of Ngo Dinh Diem’s autocratic regime. Diem cancelled the 1956 national elections, knowing Ho Chi Minh would win over 80% of votes. Diem’s nepotism, persecution of the 80% Buddhist majority, and reversal of land reforms drove peasants into the Vietcong (NLF). To keep Saigon from collapsing, US military advisers expanded from 900 under Eisenhower to 16,000 under Kennedy.<br/><br/>A third reason was Kennedy’s determination to demonstrate Cold War resolve after humiliations at the Bay of Pigs (1961) and Berlin Wall. Kennedy sent the Green Berets and backed the 1962 Strategic Hamlet Program, deepening US entanglement until Washington ultimately sanctioned Diem’s overthrow in November 1963.',
        examinerNote:
          'Full 16/16. Q1 gives two distinct inferences with concise verbatim quotes. Q2 produces three rich, multi-causal paragraphs integrating precise specification knowledge (Geneva 17th Parallel, SEATO, 80% Buddhist majority, Green Berets, 16,000 advisers) and causal connectives.',
        pitfallCategory: 'Inference & Causation Pitfalls',
        pitfall:
          'In Q1, do not waste time evaluating provenance or reliability—stick strictly to text inferences. In Q2, avoid simple chronological storytelling: always explain HOW each factor caused increased US commitment.',
      },
      causalPathway: {
        title: 'Visual Causal Pathway: The Trajectory of US Escalation in Vietnam (1954–63)',
        steps: [
          {
            stage: '1. Geneva Accords (1954)',
            desc: 'Vietnam divided at 17th Parallel; US backs Diem to build anti-communist buffer.',
          },
          {
            stage: '2. Cancelled Vote (1956)',
            desc: 'Diem cancels elections; autocracy and land seizures spawn Vietcong insurgency.',
          },
          {
            stage: '3. Kennedy Advisers (1961–62)',
            desc: 'JFK expands advisers to 16,000; launches failed Strategic Hamlet Program.',
          },
          {
            stage: '4. Coup & Vacuum (1963)',
            desc: 'Buddhist crisis triggers US-backed coup killing Diem; leaves political chaos.',
          },
        ],
      },
      wordBank: [
        {
          term: 'Geneva Accords',
          def: '1954 agreements ending French rule, temporarily dividing Vietnam along the 17th Parallel.',
        },
        {
          term: '17th Parallel',
          def: 'Demilitarised line separating communist North Vietnam from pro-Western South Vietnam.',
        },
        {
          term: 'Domino Theory',
          def: "Eisenhower's doctrine that the fall of South Vietnam would cause neighboring Asian states to fall.",
        },
        {
          term: 'SEATO',
          def: 'Southeast Asia Treaty Organization; 1954 collective defense alliance formed to block communism.',
        },
        {
          term: 'Ngo Dinh Diem',
          def: 'Catholic, anti-communist President of South Vietnam (1955–63), overthrown in Nov 1963.',
        },
        {
          term: 'Vietminh',
          def: 'Communist nationalist movement led by Ho Chi Minh that defeated French forces at Dien Bien Phu.',
        },
        {
          term: 'National Liberation Front',
          def: 'NLF (Vietcong); guerrilla organization founded in Dec 1960 to overthrow Diem and unify Vietnam.',
        },
        {
          term: 'Strategic Hamlets',
          def: 'Fortified villages established in 1962 to isolate rural peasants from Vietcong guerrillas.',
        },
        {
          term: 'Military Advisers',
          def: 'US personnel sent to train South Vietnamese forces; increased from 900 to 16,000 under JFK.',
        },
        {
          term: 'Green Berets',
          def: 'Elite US Special Forces trained in counter-insurgency warfare deployed to Vietnam by Kennedy.',
        },
        {
          term: 'Buddhist Crisis',
          def: '1963 protests and self-immolations sparked by Diem’s ban on flying Buddhist religious flags.',
        },
        {
          term: 'ARVN',
          def: 'Army of the Republic of Vietnam; South Vietnamese official armed forces funded by the US.',
        },
      ],
    },
  },

  // =========================================================================
  // SPREAD 10: KT 3.2 — ESCALATION UNDER JOHNSON & GULF OF TONKIN (1964–65)
  // Exam Format: source_utility (Section B: Q3(a) [8m])
  // =========================================================================
  {
    id: 'lesson_3_2',
    topic: 'Key Topic 3: US Involvement in Vietnam, 1954–75',
    title: 'KT 3.2: Escalation Under Johnson: Tonkin to Ground Combat',
    footerTag: 'KT 3.2: Escalation under Johnson',
    left: {
      sectionTag: 'Direct Military Escalation',
      contextTitle: 'Strategic Context & Geopolitical Overview',
      summary:
        'Following the assassination of President Kennedy in November 1963, President Lyndon B. Johnson inherited an unstable South Vietnam with the Vietcong controlling vast rural territories. The controversial Gulf of Tonkin Incident in August 1964 gave Johnson the congressional blank check he needed to wage full-scale war. By March 1965, Operation Rolling Thunder was underway and 3,500 US Marines landed at Da Nang.',
      pillars: [
        {
          title: 'The Gulf of Tonkin Incident (August 1964)',
          subtitle: 'The Catalyst for Direct War',
          bullets: [
            'On 2 Aug 1964, destroyer USS *Maddox* was attacked by 3 North Vietnamese torpedo boats in international waters while gathering covert electronic intelligence.',
            'On 4 Aug, *Maddox* and USS *Turner Joy* reported a second torpedo attack in darkness and stormy seas; sonar operators reported phantom torpedo tracks.',
            'Captain John Herrick cabled Washington that freak weather caused false readings, but LBJ ignored doubts and ordered immediate retaliatory airstrikes.',
            'Johnson used the incident to present himself as firm against communism during the 1964 presidential election campaign against Barry Goldwater.',
          ],
        },
        {
          title: 'The Gulf of Tonkin Resolution (August 1964)',
          subtitle: 'The Congressional "Blank Check"',
          bullets: [
            'On 7 Aug 1964, Congress passed the **Gulf of Tonkin Resolution** almost unanimously (416–0 in House, 88–2 in Senate).',
            'Authorized the President to take *"all necessary measures to repel any armed attack... and to prevent further aggression"*.',
            'Gave Johnson total executive power to wage war in Southeast Asia without requiring a formal constitutional declaration of war.',
            'Senators Wayne Morse and Ernest Gruening cast the only dissenting votes, warning the resolution granted monarchical war-making powers.',
          ],
        },
        {
          title: 'Pleiku, Rolling Thunder & Da Nang (1965)',
          subtitle: 'The Shift to Ground Warfare',
          bullets: [
            'In Feb 1965, Vietcong guerrillas attacked the US base at **Pleiku**, killing 8 US soldiers and destroying 10 aircraft; Johnson retaliated with airstrikes.',
            'On 2 Mar 1965, LBJ launched **Operation Rolling Thunder**, a massive 3-year bombing campaign targeting North Vietnamese bridges, roads, and army bases.',
            'On 8 March 1965, **3,500 US Marines landed at Da Nang** to protect US air bases, marking the arrival of the first American ground combat troops.',
            'Troop numbers skyrocketed from 23,000 in late 1964 to 184,000 by late 1965, and reached 536,000 by 1968 under General William Westmoreland.',
          ],
        },
      ],
      keyFigures: [
        {
          name: 'Lyndon B. Johnson',
          role: '36th US President (1963–69); used Gulf of Tonkin Resolution to transform Vietnam into an American ground war, committing over 500,000 troops.',
        },
        {
          name: 'Robert McNamara',
          role: 'US Secretary of Defense (1961–68); key architect of US military escalation, body count metrics, and Operation Rolling Thunder bombing campaigns.',
        },
        {
          name: 'General William Westmoreland',
          role: 'Commander of US forces in Vietnam (1964–68); devised the "Search and Destroy" attrition strategy and demanded continual troop increases.',
        },
        {
          name: 'Wayne Morse',
          role: 'US Senator from Oregon; one of only two senators to vote against the Gulf of Tonkin Resolution, warning it was unconstitutional.',
        },
      ],
      milestones: [
        {
          date: '2–4 Aug 1964',
          event: 'USS Maddox involved in disputed naval skirmishes in Gulf of Tonkin',
        },
        {
          date: '7 Aug 1964',
          event: 'Congress passes Gulf of Tonkin Resolution granting LBJ blank-check war power',
        },
        {
          date: 'Feb 1965',
          event: 'Vietcong attack on Pleiku airbase kills 8 Americans; triggers retaliation',
        },
        {
          date: '2 Mar 1965',
          event: 'Operation Rolling Thunder begins; sustained 3-year bombing of North Vietnam',
        },
        {
          date: '8 Mar 1965',
          event: 'First 3,500 US combat Marines land at Da Nang; ground war begins',
        },
      ],
    },
    right: {
      question: {
        typeHeader: 'Section B: Q3(a) Source Utility [8m]',
        title: 'US Escalation & the Gulf of Tonkin Resolution (1964)',
        stem: 'How useful are Sources B and C for an enquiry into the reasons for US military escalation in Vietnam in 1964–65? [8 Marks]',
        marks: '8',
        marksTime: '8 Marks &bull; ~14 Mins',
        planningGuideTitle: 'Examiner Planning & Structural Framework (C-O-P Matrix):',
        planningGuide:
          '<strong>Source B:</strong> Evaluate Content (unprovoked communist aggression, international law) &rarr; Context (DESOTO covert raids, 1964 election) &rarr; Provenance (official LBJ presidential address to Congress).<br/><strong>Source C:</strong> Evaluate Content (giving unconstitutional blank check, executive war power) &rarr; Context (Senate debate, Wayne Morse dissent) &rarr; Provenance (critical speech on Senate floor).<br/><strong>Synthesis:</strong> Weigh how both sources together show the political justification versus the constitutional alarm over escalation.',
        modelAnswer:
          'Source B is useful because its content reveals the public justifications President Johnson used to rally Congress for military intervention. Johnson asserts that North Vietnamese naval vessels launched "deliberate and unprovoked attacks" on US warships on the high seas, claiming military retaliation was vital to protect freedom in Southeast Asia. From my contextual knowledge, Johnson omitted that the USS Maddox was engaged in covert electronic espionage supporting South Vietnamese commando raids (OPLAN 34A), and that reports of the 4 August attack were heavily disputed by sonar operators. The provenance as an official presidential message to Congress makes it exceptionally valuable for showing how the administration manufactured political consent to pass the Tonkin Resolution, especially while LBJ wanted to appear decisive against communism ahead of the 1964 election.<br/><br/>Source C is useful in a contrasting way because it highlights contemporary political opposition to this escalation. Senator Wayne Morse warns that the resolution constitutes an unconstitutional "blank check" that surrenders congressional war powers directly to the executive, warning it will inevitably plunge America into a protracted Asian ground war. From my knowledge, Morse and Ernest Gruening were the sole two senators to vote against the resolution on 7 August 1964, predicting that the 3,500 Marines sent to Da Nang in March 1965 would rapidly multiply into hundreds of thousands of combat troops. The provenance as a speech delivered on the Senate floor makes it highly reliable for capturing the constitutional alarm of dissenting lawmakers who recognized the danger of unchecked presidential war power.<br/><br/>Overall, both sources are mutually useful: Source B illustrates the top-down rhetoric of anti-communist self-defense used to justify war, while Source C demonstrates that contemporary politicians recognized the resolution as a dangerous blank check for massive military escalation.',
        examinerNote:
          'Full 8/8 marks (Level 3). Comprehensively evaluates Content, Own Knowledge context (OPLAN 34A, 1964 election, Da Nang 1965), and Provenance (NOP) for both sources, culminating in a balanced comparative judgement.',
        pitfallCategory: 'Source Utility Traps',
        pitfall:
          'Never dismiss Source B because Johnson "lied" or was "biased". The fact that the president used deceptive claims IS what makes it historically useful for studying the reasons for escalation!',
      },
      causalPathway: {
        title: 'Visual Causal Pathway: From Naval Skirmish to Open Ground Combat (1964–65)',
        steps: [
          {
            stage: '1. Covert Missions',
            desc: 'US conducts DESOTO electronic patrols supporting South Vietnamese commando raids.',
          },
          {
            stage: '2. Tonkin Incident (Aug 1964)',
            desc: 'Skirmishes with Maddox exploited by LBJ to claim unprovoked aggression.',
          },
          {
            stage: '3. Tonkin Resolution',
            desc: 'Congress passes blank check 416–0; surrenders constitutional war powers to LBJ.',
          },
          {
            stage: '4. Rolling Thunder & Da Nang',
            desc: 'Pleiku attack sparks bombing campaign; 3,500 Marines land at Da Nang (Mar 1965).',
          },
        ],
      },
      wordBank: [
        {
          term: 'USS Maddox',
          def: 'US destroyer attacked by North Vietnamese torpedo boats in Gulf of Tonkin on 2 Aug 1964.',
        },
        {
          term: 'Gulf of Tonkin Incident',
          def: 'August 1964 naval skirmishes used by Johnson as the justification for direct military war.',
        },
        {
          term: 'Gulf of Tonkin Resolution',
          def: 'Congressional act of 7 Aug 1964 giving LBJ authority to use all necessary military force.',
        },
        {
          term: 'Blank Check',
          def: 'Metaphor describing how the Tonkin Resolution gave the President limitless war powers.',
        },
        {
          term: 'Pleiku Attack',
          def: 'Feb 1965 Vietcong assault on US airbase killing 8 soldiers; triggered Rolling Thunder.',
        },
        {
          term: 'Operation Rolling Thunder',
          def: 'Sustained US bombing campaign against North Vietnam from March 1965 to November 1968.',
        },
        {
          term: 'Da Nang',
          def: 'Coastal South Vietnamese airbase where first 3,500 US combat Marines landed on 8 March 1965.',
        },
        {
          term: 'William Westmoreland',
          def: 'US commanding general who instituted the Search and Destroy attrition strategy.',
        },
        {
          term: 'Attrition Strategy',
          def: 'Military doctrine aiming to wear down enemy forces through superior firepower and body counts.',
        },
        {
          term: 'Robert McNamara',
          def: 'US Secretary of Defense who applied statistical analysis and body count metrics to the war.',
        },
        {
          term: 'Wayne Morse',
          def: 'Oregon Senator who voted against Tonkin Resolution, warning of unconstitutional war powers.',
        },
        {
          term: 'Escalation',
          def: 'The rapid expansion of US military commitment from advisers to over 500,000 combat troops.',
        },
      ],
    },
  },

  // =========================================================================
  // SPREAD 11: KT 3.3 — NATURE OF THE CONFLICT & TET OFFENSIVE (1964–68)
  // Exam Format: interpretation_diff_why (Section B: Q3(b) [4m] + Q3(c) [4m])
  // =========================================================================
  {
    id: 'lesson_3_3',
    topic: 'Key Topic 3: US Involvement in Vietnam, 1954–75',
    title: 'KT 3.3: Nature of Conflict: Tactics & the 1968 Tet Offensive',
    footerTag: 'KT 3.3: Nature of conflict, 1964–68',
    left: {
      sectionTag: 'Tactics & Turning Points',
      contextTitle: 'Strategic Context & Geopolitical Overview',
      summary:
        'Between 1965 and 1968, the Vietnam War became a clash of mismatched doctrines. US forces utilized overwhelming technology, Search and Destroy missions, and chemical defoliants, but were confounded by Vietcong guerrilla warfare, tunnel complexes, and the Ho Chi Minh Trail. In January 1968, the Tet Offensive shattered American claims of imminent victory, delivering a psychological shock that forced LBJ to abandon re-election.',
      pillars: [
        {
          title: 'Vietcong Guerrilla Tactics & The Trail',
          subtitle: 'Tunnels, Traps & "Hanging on Belts"',
          bullets: [
            'Vietcong guerrillas avoided open battle; they practiced **"hanging onto US belts"** (fighting at close quarters) so US air strikes and artillery could not be used without killing Americans.',
            'Constructed over **200 miles of underground tunnels** (such as Cu Chi) containing hospitals, weapon factories, kitchens, and command bunkers impervious to bombing.',
            'Employed lethal booby traps (punji bamboo stakes smeared with excrement, Bouncing Betty mines); booby traps caused **11% of US deaths and 17% of wounds**.',
            'Resupplied along the **Ho Chi Minh Trail**, a 600-mile network through Laos and Cambodia maintained by 300,000 workers despite relentless US bombing.',
          ],
        },
        {
          title: 'US Military Tactics & Chemical Warfare',
          subtitle: 'Search & Destroy, Agent Orange & Napalm',
          bullets: [
            'General Westmoreland implemented **Search and Destroy** missions: US platoons helicoptered into jungles to locate Vietcong, burn suspected villages ("Zippo raids"), and count dead bodies.',
            'Missions alienated civilians: soldiers burned thatched huts, destroyed rice stocks, and killed livestock, driving angry peasants to support the Vietcong.',
            'Operation Ranch Hand sprayed **19 million gallons of defoliants**; **Agent Orange** destroyed 4.5 million acres of jungle and crops, causing birth defects and cancer.',
            'US bombers dropped **napalm** (jellied gasoline burning at 800°C) that stuck to human skin, causing horrific burns to civilians and soldiers alike.',
          ],
        },
        {
          title: 'The Tet Offensive (January–February 1968)',
          subtitle: 'The Decisive Psychological Turning Point',
          bullets: [
            'On 31 Jan 1968, during the sacred Tet lunar holiday truce, 84,000 Vietcong and North Vietnamese troops launched surprise assaults on over **100 cities and military bases**.',
            'A 19-man Vietcong sapper unit breached the US Embassy compound in Saigon, fighting for 6 hours; bloody battles raged in Hue for 25 days.',
            '**Military Outcome:** A catastrophic defeat for the Vietcong; 45,000 communist fighters were killed, effectively breaking the Vietcong as an independent fighting force.',
            '**Psychological Impact:** Shattered US government claims that the war was being won; news anchor Walter Cronkite declared the war was "mired in stalemate".',
          ],
        },
      ],
      keyFigures: [
        {
          name: 'General Vo Nguyen Giap',
          role: 'Brilliant North Vietnamese military commander; masterminded the anti-French victory at Dien Bien Phu and orchestrated the 1968 Tet Offensive.',
        },
        {
          name: 'General William Westmoreland',
          role: 'US commander who assured the American public in late 1967 that there was "light at the end of the tunnel", before Tet destroyed his credibility.',
        },
        {
          name: 'Walter Cronkite',
          role: 'CBS News anchor known as "the most trusted man in America"; his Feb 1968 broadcast declaring the war unwinnable convinced LBJ he had lost public support.',
        },
        {
          name: 'Ho Chi Minh',
          role: 'North Vietnamese leader who inspired communist fighters: "You can kill ten of my men for every one I kill of yours, but even at those odds, you will lose and I will win."',
        },
      ],
      milestones: [
        {
          date: '1965–68',
          event: 'US forces conduct Search and Destroy missions and spray Agent Orange',
        },
        {
          date: 'Late 1967',
          event: 'Westmoreland claims the end of the war is in sight ("light at end of tunnel")',
        },
        {
          date: '31 Jan 1968',
          event:
            'Tet Offensive launched; 84,000 communist troops attack 100+ South Vietnamese cities',
        },
        {
          date: '27 Feb 1968',
          event: 'Walter Cronkite CBS editorial declares the Vietnam War a bloody stalemate',
        },
        {
          date: '31 Mar 1968',
          event: 'LBJ halts bombing of North Vietnam and announces he will not run for re-election',
        },
      ],
    },
    right: {
      question: {
        typeHeader: 'Section B: Q3(b) [4m] & Q3(c) [4m] Interpretations',
        title: 'Historiographical Debate: Significance of the 1968 Tet Offensive',
        stem: 'Q3(b) How do Interpretations 1 and 2 differ about the outcome of the Tet Offensive? [4m] &bull; Q3(c) Suggest one reason why they differ. [4m]',
        marks: '4 + 4 = 8',
        marksTime: '8 Marks &bull; ~14 Mins Total',
        planningGuideTitle: 'Examiner Planning & Structural Framework:',
        planningGuide:
          '<strong>Q3(b) Views Difference (4m):</strong> Identify precise contrasting viewpoints. Int 1 views Tet as a decisive military victory for US/ARVN forces that decimated the Vietcong. Int 2 views Tet as a catastrophic psychological and political disaster that broke American will to fight.<br/><strong>Q3(c) Reasons for Difference (4m):</strong> Explain difference by linking to different sources/evidence or differing historical focus (military statistics vs domestic political and media fallout).',
        modelAnswer:
          '<strong>Q3(b) (Differences in Views):</strong> Interpretations 1 and 2 differ substantially over whether the Tet Offensive was a military victory or a strategic disaster for the United States. Interpretation 1 argues that Tet was an overwhelming military triumph for US and ARVN forces. It emphasizes that communist troops were slaughtered in the open, suffering 45,000 casualties and failing to hold a single city or trigger a popular civilian uprising, leaving the Vietcong permanently broken as a combat force.<br/><br/>In direct contrast, Interpretation 2 focuses on the psychological and political impact, arguing that Tet was a catastrophic turning point that lost the war for America. It highlights that television images of Vietcong commandos attacking the US Embassy in Saigon destroyed the credibility of President Johnson and General Westmoreland, exposing their claims of imminent victory as false and turning public opinion, media figures like Walter Cronkite, and political leaders against continuing the war.<br/><br/><strong>Q3(c) (Reasons for Difference):</strong> One reason the interpretations differ is that the historians have focused on different aspects of the conflict and relied on different types of historical evidence. The author of Interpretation 1 has focused on battlefield statistics, Pentagon kill ratios, and tactical military outcomes, which show that US firepower successfully repelled the communist assault and inflicted unsustainable losses on the Vietcong. Conversely, the author of Interpretation 2 has focused on domestic American politics, media coverage, and public opinion. They give greater weight to the "credibility gap", the demoralization of the US public, and Walter Cronkite’s broadcast, which led directly to President Johnson’s decision to halt escalation and withdraw from the 1968 presidential election.',
        examinerNote:
          'Full 4/4 for Q3(b) and 4/4 for Q3(c). Q3(b) explicitly contrasts the two core views with specific textual detail. Q3(c) provides a valid, sophisticated explanation for the divergence (tactical/military focus vs political/media perspective) rather than a generic claim about bias.',
        pitfallCategory: 'Interpretation Difference Pitfalls',
        pitfall:
          'In Q3(b), do not write two separate summaries—quote and compare them directly! In Q3(c), never say "historians have different opinions because one is biased"—explain how their historical evidence or focus differs.',
      },
      causalPathway: {
        title: 'Visual Causal Pathway: The Dual Impact of the 1968 Tet Offensive',
        steps: [
          {
            stage: '1. "Light in Tunnel"',
            desc: 'US officials claim victory is near; public believes war is almost won.',
          },
          {
            stage: '2. Surprise Assault',
            desc: '84,000 communist troops attack 100+ cities; invade Saigon US Embassy.',
          },
          {
            stage: '3. Tactical Defeat',
            desc: 'US/ARVN kill 45,000 communist troops; Vietcong severely decimated.',
          },
          {
            stage: '4. Political Defeat',
            desc: 'Credibility gap widens; Walter Cronkite declares stalemate; LBJ quits 1968 race.',
          },
        ],
      },
      wordBank: [
        {
          term: 'Tet Offensive',
          def: 'Massive January 1968 communist surprise attack across South Vietnam during lunar new year.',
        },
        {
          term: 'Credibility Gap',
          def: 'The difference between optimistic government claims and the reality shown on television.',
        },
        {
          term: 'Walter Cronkite',
          def: 'Influential CBS newsman whose 1968 broadcast convinced LBJ he had lost public support.',
        },
        {
          term: 'Guerrilla Warfare',
          def: 'Hit-and-run military tactics avoiding large pitched battles against superior firepower.',
        },
        {
          term: 'Cu Chi Tunnels',
          def: '200-mile underground tunnel system near Saigon housing Vietcong hospitals and barracks.',
        },
        {
          term: 'Search and Destroy',
          def: 'US military missions inserting platoons into jungles to locate and kill Vietcong units.',
        },
        {
          term: 'Agent Orange',
          def: 'Toxic herbicide chemical sprayed by US aircraft to strip away jungle foliage and crops.',
        },
        {
          term: 'Napalm',
          def: 'Jellied gasoline weapon used in firebombing strikes, causing devastating burn injuries.',
        },
        {
          term: 'Punji Sticks',
          def: 'Sharpened bamboo stakes concealed in pit traps, often smeared with excrement to cause infection.',
        },
        {
          term: 'Ho Chi Minh Trail',
          def: 'Supply corridor through Laos and Cambodia supplying communist forces in the South.',
        },
        {
          term: 'Body Count',
          def: 'US military metric measuring success by the number of enemy soldiers killed rather than land held.',
        },
        {
          term: 'Zippo Raids',
          def: 'US troop actions using cigarette lighters to torch suspected Vietcong village huts.',
        },
      ],
    },
  },

  // =========================================================================
  // SPREAD 12: KT 3.4 — CHANGES UNDER NIXON, 1969–73 (VIETNAMISATION & EXPANSION)
  // Exam Format: interpretation_eval (Section B: Q3(d) [16+4m])
  // =========================================================================
  {
    id: 'lesson_3_4',
    topic: 'Key Topic 3: US Involvement in Vietnam, 1954–75',
    title: 'KT 3.4: Changes Under Nixon: Vietnamisation & War Expansion',
    footerTag: 'KT 3.4: Changes under Nixon, 1969–73',
    left: {
      sectionTag: 'De-escalation & Expansion',
      contextTitle: 'Strategic Context & Geopolitical Overview',
      summary:
        'Elected in 1968 promising "peace with honor", President Richard Nixon introduced Vietnamisation—withdrawing American ground troops while training the ARVN to assume combat duties. However, to force North Vietnam into concessions, Nixon simultaneously widened the war: secretly bombing and invading Cambodia (1970) and Laos (1971), and unleashing devastating air offensives (Linebacker) on North Vietnam.',
      pillars: [
        {
          title: 'Vietnamisation & The Nixon Doctrine (1969)',
          subtitle: 'Troop Withdrawals & ARVN Expansion',
          bullets: [
            'In June 1969, Nixon announced **Vietnamisation**: handing over the ground fighting to the ARVN while progressively withdrawing US troops.',
            'The **Nixon Doctrine (July 1969)** declared the US would provide financial and military aid, but Asian allies had to supply their own combat manpower.',
            'US troop levels plummeted dramatically from **543,000 in early 1969 to under 30,000 by late 1972**, significantly reducing US casualties.',
            'The US poured billions into modernizing the ARVN: expanded to 1 million men, equipped with modern M16 rifles, helicopters, and artillery.',
          ],
        },
        {
          title: 'Invasions of Cambodia (1970) & Laos (1971)',
          subtitle: 'Widening the War to Cut Supply Lines',
          bullets: [
            'From March 1969, Nixon ordered **Operation Menu**, dropping 110,000 tons of bombs on secret communist sanctuaries inside neutral Cambodia.',
            'In April 1970, 30,000 US and ARVN troops officially invaded **Cambodia** to destroy Vietcong bases, sparking massive anti-war protests across US campuses.',
            'In Feb 1971, South Vietnamese troops alone invaded **Laos** (Operation Lam Son 719) with US air support to sever the Ho Chi Minh Trail.',
            'Laos was a military catastrophe: ARVN forces met intense NVA tank resistance and fled in panic, suffering a **50% casualty rate**.',
          ],
        },
        {
          title: 'Air War Escalation: Linebacker I & II (1972)',
          subtitle: 'The Easter Offensive & Christmas Bombings',
          bullets: [
            'In March 1972, North Vietnam launched the conventional **Easter Offensive**; Nixon retaliated with **Operation Linebacker I**, mining Haiphong harbour and bombing northern rail links.',
            'When peace negotiations stalled in Dec 1972, Nixon unleashed **Linebacker II ("The Christmas Bombings")**, dropping 20,000 tons of explosives on Hanoi and Haiphong in 11 days.',
            'Linebacker was the most intense bombing campaign in world history; the US lost 15 B-52 bombers, but forced North Vietnam to sign the **Paris Peace Accords (Jan 1973)**.',
            'Despite US claims of success, Vietnamisation failed fundamentally: the ARVN remained dependent on US air power, plagued by desertion, and riddled with corruption.',
          ],
        },
      ],
      keyFigures: [
        {
          name: 'Richard M. Nixon',
          role: '37th US President (1969–74); implemented Vietnamisation to withdraw US troops while expanding aerial warfare into Cambodia and Laos.',
        },
        {
          name: 'Henry Kissinger',
          role: 'Nixon’s National Security Adviser and Secretary of State; conducted secret peace talks in Paris with North Vietnam’s Le Duc Tho.',
        },
        {
          name: 'Nguyen Van Thieu',
          role: 'President of South Vietnam (1967–75); opposed US troop withdrawals and protested the Paris Peace Accords allowing NVA troops to stay in South.',
        },
        {
          name: 'Le Duc Tho',
          role: 'Senior North Vietnamese diplomat who negotiated the Paris Peace Accords with Kissinger; refused Nobel Peace Prize because real peace had not arrived.',
        },
      ],
      milestones: [
        {
          date: 'Jun 1969',
          event: 'Nixon announces Vietnamisation and begins withdrawing US combat troops',
        },
        {
          date: 'Apr 1970',
          event: 'US and ARVN forces invade Cambodia; triggers Kent State campus shootings',
        },
        {
          date: 'Feb 1971',
          event: 'ARVN invades Laos (Lam Son 719); suffers 50% casualties in disastrous retreat',
        },
        {
          date: 'May 1972',
          event: 'Operation Linebacker I launches heavy bombing and mines Haiphong harbour',
        },
        {
          date: 'Dec 1972',
          event:
            'Operation Linebacker II ("Christmas Bombing") drops 20,000 tons of bombs in 11 days',
        },
      ],
    },
    right: {
      question: {
        typeHeader: 'Section B: Q3(d) Evaluative Essay [16+4m]',
        title: 'Evaluation: Was Vietnamisation a Doomed Failure from Inception?',
        stem: "How far do you agree with Interpretation 2 that Nixon's policy of Vietnamisation was an inevitable failure that merely delayed communist victory? [16+4 SPaG Marks]",
        marks: '16 + 4',
        marksTime: '20 Marks &bull; ~25 Mins',
        planningGuideTitle: 'Examiner Planning & Structural Framework (Criteria-Led Essay):',
        planningGuide:
          '<strong>Paragraph 1 (Agree with Int 2):</strong> Vietnamisation was a flawed political facade. ARVN plagued by desertion, corrupt officers, low morale, and dependent on US air support (proven by 50% casualties in Laos 1971).<br/><strong>Paragraph 2 (Evaluate Int 1 - Alternative View):</strong> Vietnamisation had genuine military successes. ARVN expanded to 1m men, successfully repelled 1972 Easter Offensive with US air support, Linebacker forced Hanoi to sign Paris Peace Accords (1973).<br/><strong>Conclusion:</strong> Formulate criteria judgement: Militarily, ARVN could hold ground only with US air power; once Congress cut funding and banned bombing in 1973, collapse was inevitable.',
        modelAnswer:
          'Interpretation 2 argues that Nixon’s policy of Vietnamisation was fundamentally flawed and merely delayed an inevitable communist victory. There is strong evidence for this view. From its launch in June 1969, Vietnamisation was primarily a political exit strategy designed to quell domestic anti-war protests by cutting US casualties, rather than a viable military plan. Although the ARVN expanded to over one million men, it remained crippled by corruption, political appointments under President Thieu, and desertion rates reaching 100,000 annually. The fatal weakness of Vietnamisation was exposed in the February 1971 invasion of Laos (Operation Lam Son 719): lacking US ground support, the ARVN was routed by North Vietnamese tanks, suffering a disastrous 50% casualty rate.<br/><br/>However, Interpretation 1 argues that Vietnamisation achieved genuine military success. Backed by US air power, the modernized ARVN successfully repelled North Vietnam’s massive conventional Easter Offensive in March 1972. Furthermore, Nixon’s decisive air offensives—mining Haiphong harbour (Linebacker I) and the devastating "Christmas Bombings" of December 1972 (Linebacker II dropping 20,000 tons of bombs)—forced Hanoi to sign the Paris Peace Accords in January 1973. South Vietnam survived for over two years after American troops departed, collapsing only when Congress cut military funding in 1974.<br/><br/>In conclusion, I agree with Interpretation 2 to a great extent. While Vietnamisation temporarily equipped the ARVN to resist conventional attacks, it created an army utterly dependent on US air power and logistics. Once US ground forces withdrew under the 1973 Paris Accords and air support ceased, the collapse of South Vietnam was inevitable.',
        examinerNote:
          'Full marks (16/16 Level 4 + 4 SPaG = 20/20). Masterfully evaluates both interpretations with rich contextual knowledge (Lam Son 719, Laos 50% casualties, 1972 Easter Offensive, Linebacker II Christmas Bombings, Paris Peace Accords 1973) and delivers a sophisticated criteria-driven conclusion.',
        pitfallCategory: 'Paper 3 Essay Pitfalls',
        pitfall:
          'Do not write a one-sided essay agreeing only with Interpretation 2! To reach Level 4, you must thoroughly evaluate the counter-arguments in Interpretation 1 before reaching your final balanced verdict.',
      },
      causalPathway: {
        title: 'Visual Causal Pathway: The Trajectory and Collapse of Vietnamisation (1969–73)',
        steps: [
          {
            stage: '1. Troop Drawdowns (1969)',
            desc: 'Nixon announces Vietnamisation; US troops cut from 543k to 30k by 1972.',
          },
          {
            stage: '2. Cambodia & Laos (1970–71)',
            desc: 'Secret bombings and invasions widen war; ARVN suffers 50% losses in Laos.',
          },
          {
            stage: '3. Linebacker Bombings (1972)',
            desc: 'Devastating air offensives mine Haiphong and bomb Hanoi during Christmas.',
          },
          {
            stage: '4. Paris Accords (1973)',
            desc: 'US troops withdraw completely; ARVN left fatally vulnerable without air support.',
          },
        ],
      },
      wordBank: [
        {
          term: 'Vietnamisation',
          def: "Nixon's policy of withdrawing US troops while training and equipping the ARVN to fight.",
        },
        {
          term: 'Nixon Doctrine',
          def: '1969 foreign policy declaring the US would provide aid, but Asian allies must supply troops.',
        },
        {
          term: 'Operation Menu',
          def: 'Covert US aerial bombing campaign targeting communist sanctuaries in neutral Cambodia.',
        },
        {
          term: 'Cambodian Incursion',
          def: 'April 1970 invasion by US and ARVN forces to destroy North Vietnamese bases.',
        },
        {
          term: 'Operation Lam Son 719',
          def: 'Disastrous February 1971 ARVN invasion of Laos resulting in a 50% casualty rate.',
        },
        {
          term: 'Easter Offensive',
          def: 'Massive conventional North Vietnamese invasion of South Vietnam in March 1972.',
        },
        {
          term: 'Operation Linebacker I',
          def: 'Heavy US bombing campaign in 1972 that mined Haiphong harbour and halted the Easter Offensive.',
        },
        {
          term: 'Linebacker II',
          def: 'The "Christmas Bombings" of Dec 1972 dropping 20,000 tons of bombs on Hanoi and Haiphong.',
        },
        {
          term: 'Paris Peace Accords',
          def: 'January 1973 agreement ending direct US military involvement in the Vietnam War.',
        },
        {
          term: 'Henry Kissinger',
          def: 'US National Security Adviser who negotiated the Paris Peace Accords with Le Duc Tho.',
        },
        {
          term: 'Nguyen Van Thieu',
          def: 'President of South Vietnam (1967–75) who reluctantly accepted the 1973 peace treaty.',
        },
        {
          term: 'Peace with Honor',
          def: 'Nixon’s campaign slogan promising an honorable exit from Vietnam without surrender.',
        },
      ],
    },
  },
];
