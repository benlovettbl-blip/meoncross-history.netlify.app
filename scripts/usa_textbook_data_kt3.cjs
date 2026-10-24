/**
 * scripts/usa_textbook_data_kt3.cjs
 *
 * Component bank, primary sources, vocabulary, curated 4-Act narratives, and back-cover data for
 * Key Topic 3: US Involvement in the Vietnam War, 1954–75
 * Pearson Edexcel GCSE (9–1) History • Option 33 (1HI0/33)
 */

module.exports = function getKt3Data(helpers) {
  const { getBase64Image } = helpers;

  const coverConfig = {
    ktId: 'KT3',
    topicNumber: 3,
    title: 'US Involvement in the Vietnam War, 1954–75',
    subtitle:
      'Pearson Edexcel GCSE (9–1) History &bull; Paper 3 Option 33 (1HI0/33) &bull; Key Topic 3 Synthesis',
    enquiry:
      'Why did the United States escalate military intervention in Vietnam, and why did advanced industrial warfare fail to crush the Vietcong?',
    coverImage: 'huey_combat_landing_vietnam.jpg',
    caption:
      'Plate I: Bell UH-1 Iroquois "Huey" helicopters land American infantrymen in an active combat landing zone in South Vietnam (c. 1966).',
    specTopics: [
      {
        num: 1,
        title: '1. Origins of US Involvement, 1954–63',
        bullets: [
          'Fall of Dien Bien Phu (1954), the Geneva Accords, and the partition of Vietnam at the 17th parallel.',
          "Eisenhower's Domino Theory, SEATO, and US financial and military backing for Ngo Dinh Diem.",
          "The Strategic Hamlet Program, Buddhist Crisis (1963), JFK's 16,000 military advisors, and Diem's overthrow.",
        ],
      },
      {
        num: 2,
        title: '2. Escalation Under Johnson, 1963–65',
        bullets: [
          'Rise of the National Liberation Front (Vietcong) and ARVN military weakness in the Mekong Delta.',
          'The Gulf of Tonkin Incident (August 1964) involving the USS Maddox and Turner Joy.',
          'The Gulf of Tonkin Resolution, Operation Rolling Thunder bombing, and US Marines landing at Da Nang (March 1965).',
        ],
      },
      {
        num: 3,
        title: '3. Nature of Conflict & Military Tactics',
        bullets: [
          'Vietcong guerrilla warfare: the Cu Chi tunnels, booby traps (punji sticks), and the Ho Chi Minh Trail.',
          'US military methods: Search and Destroy missions, "Zippo" raids, body counts, and air cavalry tactics.',
          'Chemical weapons: Operation Ranch Hand defoliation (Agent Orange) and napalm firebombing campaigns.',
        ],
      },
      {
        num: 4,
        title: '4. The Tet Offensive & Vietnamisation, 1968–72',
        bullets: [
          'The Tet Offensive (January 1968): attacks on 100 cities, siege of Khe Sanh, and the Walter Cronkite broadcast.',
          'Political collapse: Johnson decides not to seek re-election; election of Richard Nixon (1968).',
          "Nixon's Vietnamisation policy, troop withdrawals, the secret bombing of Cambodia, and the 1972 Easter Offensive.",
        ],
      },
    ],
  };

  const USA_COMPONENT_BANK = {
    // Page 3: KT 3.1 (Origins: Dien Bien Phu, Geneva, Diem)
    p3: {
      keyFigure: {
        name: 'Ngo Dinh Diem',
        lifespan: '1901–1963',
        role: 'First President of the Republic of Vietnam (South Vietnam, 1955–1963)',
        significance:
          'Autocratic Catholic ruler backed by Washington whose corruption, nepotism, and persecution of Buddhists destabilized South Vietnam.',
        actions: [
          'Rigged the 1955 referendum to depose Emperor Bao Dai and refused to hold nationwide 1956 elections required by Geneva.',
          'Instituted the hated Strategic Hamlet program in 1962, forcibly uprooting peasants from ancestral lands into barbed-wire enclosures.',
          'Attacked Buddhist pagodas in 1963, provoking international outrage and prompting a US-backed military coup that assassinated him.',
        ],
        image: getBase64Image('units/usa/assets/sources/portraits/diem.jpg'),
      },
      conceptSpotlight: `
        <div class="concept-spotlight-box">
          <div class="csb-header">
            <span class="csb-tag">GEOPOLITICAL AXIOM: COLD WAR CONTAINMENT</span>
            <span class="csb-category">PRESIDENTIAL DOCTRINE &bull; 1954</span>
          </div>
          <h4 class="csb-title">Eisenhower’s Domino Theory &amp; The 17th Parallel</h4>
          <div class="csb-body">
            Following the French defeat at <strong>Dien Bien Phu</strong> in May 1954, the Geneva Accords partitioned Vietnam temporarily at the 17th parallel pending 1956 national elections. President Dwight D. Eisenhower articulated the <strong>Domino Theory</strong>: if Indochina fell to communism, neighbouring countries like Laos, Cambodia, Thailand, Burma, and Indonesia would topple like dominoes. Washington resolved to prevent elections that communist leader Ho Chi Minh would easily win, creating an independent, anti-communist South Vietnam.
          </div>
          <div class="csb-takeaway">
            <strong>Strategic Legacy:</strong> The Domino Theory trapped successive US presidents into defending South Vietnam at any cost, subordinating local nationalist realities to global Cold War anti-communist containment.
          </div>
        </div>
      `,
      timeline: [
        {
          date: '7 May 1954',
          title: 'Fall of Dien Bien Phu',
          text: 'Viet Minh troops crush French fortress; marks the final collapse of French colonial rule in Indochina.',
        },
        {
          date: '21 July 1954',
          title: 'The Geneva Accords',
          text: 'Vietnam temporarily partitioned at 17th parallel; nationwide elections scheduled for 1956.',
        },
        {
          date: 'Oct 1955',
          title: 'Republic of Vietnam Formed',
          text: 'Diem proclaims South Vietnam independent with US backing; cancels the 1956 reunification elections.',
        },
        {
          date: '2 Nov 1963',
          title: 'Assassination of Diem',
          text: 'ARVN generals stage CIA-backed military coup; Diem and his brother Nhu are executed in Saigon.',
        },
      ],
    },

    // Page 5: KT 3.2 (Escalation: Gulf of Tonkin & Troops Landing)
    p5: {
      keyFigure: {
        name: 'General William Westmoreland',
        lifespan: '1914–2005',
        role: 'Commander of US Military Assistance Command, Vietnam (MACV, 1964–1968)',
        significance:
          'Architect of the US conventional military strategy in Vietnam, relying on massive aerial firepower, air mobility, and attrition.',
        actions: [
          'Convinced President Johnson in early 1965 that only the deployment of American ground combat troops could save South Vietnam.',
          'Devised the war of attrition: using helicopter-borne Search and Destroy missions to exhaust enemy forces and maximize the "body count".',
          'Assured the American public in late 1967 that there was "light at the end of the tunnel", just weeks before the catastrophic Tet Offensive.',
        ],
        image: getBase64Image('units/usa/assets/sources/portraits/westmoreland.jpg'),
      },
      conceptSpotlight: `
        <div class="concept-spotlight-box">
          <div class="csb-header">
            <span class="csb-tag">CONSTITUTIONAL MECHANISM: WAR POWERS</span>
            <span class="csb-category">CONGRESSIONAL RESOLUTION &bull; 1964</span>
          </div>
          <h4 class="csb-title">The Gulf of Tonkin Resolution: Congress\'s "Blank Cheque"</h4>
          <div class="csb-body">
            In August 1964, the destroyer <strong>USS Maddox</strong> reported being fired upon by North Vietnamese torpedo boats in the Gulf of Tonkin. Two days later, a second disputed attack was reported under stormy conditions. President Johnson used the incident to pass the <strong>Gulf of Tonkin Resolution</strong> with near-unanimous congressional support (416–0 in House, 88–2 in Senate). The resolution authorized the President to take "all necessary measures to repel armed attack" without a formal declaration of war.
          </div>
          <div class="csb-takeaway">
            <strong>Strategic Legacy:</strong> The resolution handed Johnson an unconstitutional "blank cheque" to dramatically escalate the conflict into a full-scale ground war involving over half a million American troops.
          </div>
        </div>
      `,
      timeline: [
        {
          date: '2 Aug 1964',
          title: 'Gulf of Tonkin Incident',
          text: 'USS Maddox clashes with North Vietnamese patrol torpedo boats off the North Vietnamese coast.',
        },
        {
          date: '7 Aug 1964',
          title: 'Tonkin Resolution Passed',
          text: 'Congress gives Johnson full war powers to deploy military forces without formal declaration.',
        },
        {
          date: '2 March 1965',
          title: 'Operation Rolling Thunder',
          text: 'Sustained three-year aerial bombing campaign launched against North Vietnamese infrastructure.',
        },
        {
          date: '8 March 1965',
          title: 'Marines Land at Da Nang',
          text: '3,500 US Marines land on Da Nang beaches, marking the formal arrival of US ground combat units.',
        },
      ],
    },

    // Page 7: KT 3.3 (Tactics: Guerrilla Warfare vs Industrial Might)
    p7: {
      keyFigure: {
        name: 'General Vo Nguyen Giap',
        lifespan: '1911–2013',
        role: 'Commander-in-Chief of the People’s Army of Vietnam (PAVN)',
        significance:
          'Master strategist of revolutionary asymmetric warfare who defeated both French colonial armies and US military intervention.',
        actions: [
          'Orchestrated the historic victory over the French garrison at Dien Bien Phu using hidden heavy artillery hauled up sheer jungle cliffs.',
          'Established the tactic of "hanging onto the belts" of American troops, fighting at close range to neutralize US artillery and air strikes.',
          'Planned the 1968 Tet Offensive and 1972 Easter Offensive, prioritizing strategic and political exhaustion over battlefield casualties.',
        ],
        image: getBase64Image('units/usa/assets/sources/portraits/general_giap.jpg'),
      },
      conceptSpotlight: `
        <div class="concept-spotlight-box">
          <div class="csb-header">
            <span class="csb-tag">MILITARY DOCTRINE: ASYMMETRIC WARFARE</span>
            <span class="csb-category">TACTICAL DOCTRINE &bull; 1965–1972</span>
          </div>
          <h4 class="csb-title">Guerrilla Invisibility vs. Chemical Defoliation</h4>
          <div class="csb-body">
            The Vietcong neutralized American technological superiority through asymmetric tactics: blending with the local peasantry, operating from deep underground tunnel complexes like <strong>Cu Chi</strong> (spanning over 250km), and resupplying via the <strong>Ho Chi Minh Trail</strong>. To strip jungle canopy and destroy food crops, the US Air Force launched <strong>Operation Ranch Hand</strong>, spraying over 20 million gallons of toxic herbicides—primarily dioxin-contaminated <strong>Agent Orange</strong>—inflicting horrific civilian health defects and environmental devastation.
          </div>
          <div class="csb-takeaway">
            <strong>Strategic Legacy:</strong> Heavy US chemical warfare and napalm bombing alienated the rural Vietnamese population, driving thousands of uncommitted peasants into the ranks of the National Liberation Front.
          </div>
        </div>
      `,
      timeline: [
        {
          date: '1961–1971',
          title: 'Operation Ranch Hand',
          text: 'US sprays 20 million gallons of Agent Orange defoliant over South Vietnamese jungles and farmland.',
        },
        {
          date: '1965–1968',
          title: 'Search & Destroy Missions',
          text: 'US air cavalry troops conduct helicopter sweeps, burning peasant villages suspected of harbouring VC.',
        },
        {
          date: 'Jan 1967',
          title: 'Operation Cedar Falls',
          text: 'Massive assault on the "Iron Triangle" near Saigon; discovers sprawling Cu Chi underground tunnel network.',
        },
        {
          date: '1965–1975',
          title: 'The Ho Chi Minh Trail',
          text: '16,000km network of jungle roads through Laos and Cambodia sustains uninterrupted North Vietnamese supply flow.',
        },
      ],
    },

    // Page 9: KT 3.4 (Tet Offensive & Nixon's Vietnamisation)
    p9: {
      keyFigure: {
        name: 'President Richard Nixon',
        lifespan: '1913–1994',
        role: '37th President of the United States (1969–1974)',
        significance:
          'Instituted the policy of Vietnamisation to withdraw American troops while unleashing unprecedented secret aerial bombardment in Indochina.',
        actions: [
          'Announced the "Nixon Doctrine" in 1969, transferring primary ground combat responsibility to the South Vietnamese army (ARVN).',
          'Ordered the secret aerial bombing of neutral Cambodia (Operation Menu) in 1969 to destroy Vietcong sanctuaries and supply depots.',
          'Ordered Operation Linebacker I and II (1972), subjecting North Vietnam to the heaviest carpet-bombing in human history to force peace terms.',
        ],
        image: getBase64Image('units/usa/assets/sources/portraits/nixon.jpg'),
      },
      conceptSpotlight: `
        <div class="concept-spotlight-box">
          <div class="csb-header">
            <span class="csb-tag">TURNING POINT: STRATEGIC SHIFT</span>
            <span class="csb-category">THE TET OFFENSIVE &bull; 1968</span>
          </div>
          <h4 class="csb-title">Military Defeat vs. Decisive Psychological Victory</h4>
          <div class="csb-body">
            On the Lunar New Year holiday in January 1968, 84,000 Vietcong and PAVN troops launched surprise simultaneous assaults on over 100 South Vietnamese towns, including the US Embassy in Saigon. Militarily, Tet was a catastrophic disaster for the Vietcong, losing over 45,000 veteran fighters. However, in the United States, it delivered an irreparable psychological shock. Americans watched television news anchors like <strong>Walter Cronkite</strong> declare the war an unwinnable stalemate, shattering public trust in government claims of progress.
          </div>
          <div class="csb-takeaway">
            <strong>Strategic Legacy:</strong> Tet permanently destroyed American domestic political will to continue the ground war, forcing Johnson to abandon re-election and compelling Nixon to implement the phased withdrawal of US ground forces.
          </div>
        </div>
      `,
      timeline: [
        {
          date: '30 Jan 1968',
          title: 'The Tet Offensive Begins',
          text: 'Vietcong launch coordinated surprise attacks across South Vietnam; storm the US Embassy compound in Saigon.',
        },
        {
          date: '27 Feb 1968',
          title: 'Cronkite "Stalemate" Broadcast',
          text: 'CBS anchor Walter Cronkite tells millions the war is deadlocked; LBJ remarks: "I\'ve lost Middle America."',
        },
        {
          date: '31 March 1968',
          title: 'Johnson Declines Re-election',
          text: 'LBJ halts bombing north of the 20th parallel and announces he will not seek another presidential term.',
        },
        {
          date: 'June 1969',
          title: 'Vietnamisation Announced',
          text: "Nixon orders the withdrawal of the first 25,000 US troops, passing combat duties to South Vietnam's ARVN.",
        },
      ],
    },
  };

  const leftSources = {
    p2: {
      sourceA: {
        title: 'Source A: Thich Quang Duc Self-Immolation during the Buddhist Crisis',
        type: 'Archival Photograph &bull; Malcolm Browne, Associated Press',
        date: '11 June 1963',
        image: getBase64Image('units/usa/assets/sources/buddhist-protests-1963.jpg'),
        quote:
          'Buddhist monk sits motionless in the lotus position while burning to death on a Saigon street.',
        context:
          "Seventy-three-year-old Buddhist monk Thich Quang Duc publicly immolated himself at a busy Saigon intersection to protest against President Diem's authoritarian regime and its violent suppression of Buddhist religious freedoms.",
        hingeQuestion:
          'How did global press photographs of the Buddhist crisis convince the Kennedy administration that President Diem was an unviable ally?',
      },
      sourceB: {
        isWritten: true,
        title: 'Source B: US Ambassador Henry Cabot Lodge Secret Cable to Washington (1963)',
        type: 'Declassified State Department Telegram &bull; US National Archives',
        date: '29 August 1963',
        quote:
          'We are launched on a course from which there is no respectable turning back: the overthrow of the Diem government... There is no possibility, in my view, that the war can be won under a Diem administration. His autocratic misrule, the persecution of Buddhists, and the hatred aroused by his brother Nhu make victory impossible.',
        context:
          'Secret cable sent by US Ambassador Henry Cabot Lodge Jr. to President John F. Kennedy, giving tacit White House approval for the ARVN military coup that would depose and assassinate President Ngo Dinh Diem.',
        hingeQuestion:
          'Why did the Kennedy administration ultimately decide that supporting a military coup against an anti-communist ally was unavoidable?',
      },
    },
    p4: {
      sourceA: {
        title: 'Source A: The USS Maddox in the Gulf of Tonkin',
        type: 'Official US Navy Photograph &bull; Naval Historical Center',
        date: 'August 1964',
        image: getBase64Image('units/usa/assets/sources/uss-maddox.jpg'),
        quote:
          'US Navy destroyer operating electronic intelligence missions off the North Vietnamese coast.',
        context:
          'The destroyer USS Maddox engaged North Vietnamese torpedo boats on 2 August 1964 while conducting covert electronic surveillance (Operation Desoto) in international waters. A disputed second engagement on 4 August was used to secure war powers from Congress.',
        hingeQuestion:
          'Why did the Johnson administration portray the Gulf of Tonkin incident as unprovoked aggression when presenting it to Congress?',
      },
      sourceB: {
        isWritten: true,
        title: 'Source B: The Gulf of Tonkin Resolution (Public Law 88-408)',
        type: 'Official Act of the US Congress &bull; Joint Session Record',
        date: '7 August 1964',
        quote:
          'The Congress approves and supports the determination of the President, as Commander in Chief, to take all necessary measures to repel any armed attack against the forces of the United States and to prevent further aggression... This resolution shall expire when the President shall determine that the peace and security of the area is reasonably assured.',
        context:
          'The congressional resolution passed with only two dissenting votes in the Senate, effectively surrendering Congress’s constitutional power to declare war and granting President Johnson unlimited executive authority to wage war in Southeast Asia.',
        hingeQuestion:
          'How did the wording of the Tonkin Resolution fundamentally alter the constitutional balance of war powers between Congress and the President?',
      },
    },
    p6: {
      sourceA: {
        title: 'Source A: North Vietnamese Supplies Hauled Down the Ho Chi Minh Trail',
        type: 'Archival Photograph &bull; Vietnam News Agency / National Archives',
        date: 'c. 1967',
        image: getBase64Image('units/usa/assets/sources/ho-chi-minh-trail-bicycles.jpg'),
        quote:
          'Vietnamese porters guide heavily loaded cargo bicycles through concealed mountain trails.',
        context:
          'North Vietnamese volunteer porters transport weapons, ammunition, and medical supplies using reinforced bicycles capable of carrying up to 250kg along the Ho Chi Minh Trail. Despite millions of tons of US aerial bombs, the supply network remained operational throughout the war.',
        hingeQuestion:
          'Why did massive American aerial bombardment fail to sever the subterranean and jungle supply corridors of the Ho Chi Minh Trail?',
      },
      sourceB: {
        isWritten: true,
        title: 'Source B: Vietcong Operational Directive on Asymmetric Combat (1966)',
        type: 'Captured NLF Operational Manual &bull; MACV Intelligence Translation',
        date: '1966',
        quote:
          'The enemy possesses immense firepower, tanks, and aircraft. We possess the people, the jungle, and time. Do not engage the enemy when he is prepared. Strike only when his forces are dispersed, exhausted, or moving. Cling to his belt: fight at such close range that his aircraft and heavy artillery cannot fire without slaughtering his own men.',
        context:
          'From a captured operational field manual issued by the National Liberation Front (Vietcong) outlining the principles of guerrilla warfare, stealth infiltration, and close-quarters ambush to nullify US technological superiority.',
        hingeQuestion:
          'Why was "clinging to the enemy\'s belt" an effective tactical counter-measure against overwhelming American aerial firepower?',
      },
    },
    p8: {
      sourceA: {
        title: 'Source A: President Nixon Announces the Policy of Vietnamisation',
        type: 'Television Broadcast Photograph &bull; White House Photo Office',
        date: '3 November 1969',
        image: getBase64Image('units/usa/assets/sources/nixon-television-address.jpg'),
        quote:
          'In the previous administration, we Americanized the war in Vietnam. In this administration, we are Vietnamizing the search for peace.',
        context:
          "President Richard Nixon addresses the American nation from the Oval Office, outlining his plan to gradually withdraw US combat troops while expanding the training and equipment of South Vietnam's army (ARVN) so they could assume full responsibility for their own defense.",
        hingeQuestion:
          'Was Vietnamisation a genuine military strategy for South Vietnamese survival or merely an exit strategy for American disengagement?',
      },
      sourceB: {
        isWritten: true,
        title: 'Source B: CBS News Special Report: Walter Cronkite on the Tet Stalemate',
        type: 'National Television Broadcast Editorial &bull; CBS News Archive',
        date: '27 February 1968',
        quote:
          'To say that we are closer to victory today is to believe, in the face of the evidence, the optimists who have been wrong in the past... It seems now more certain than ever that the bloody experience of Vietnam is to end in a stalemate. To say that we are mired in stalemate seems the only realistic, yet unsatisfactory, conclusion.',
        context:
          'Legendary television journalist Walter Cronkite addressing over nine million Americans following his personal fact-finding mission to South Vietnam during the aftermath of the Tet Offensive, permanently shattering official government optimism.',
        hingeQuestion:
          "Why did an editorial declaration of stalemate by a trusted news anchor exert such a devastating political impact on President Johnson's administration?",
      },
    },
  };

  const leftVocab = {
    p2: [
      {
        term: 'Dien Bien Phu (1954):',
        def: 'Catastrophic siege in northern Vietnam where Viet Minh forces crushed French elite troops, ending French colonial rule in Indochina.',
      },
      {
        term: 'Geneva Accords (1954):',
        def: 'International conference that partitioned Vietnam at the 17th parallel into a communist North and anti-communist South, promising 1956 elections.',
      },
      {
        term: 'Domino Theory:',
        def: 'US Cold War doctrine arguing that if one nation fell to communism, surrounding nations would inevitably collapse like a row of dominoes.',
      },
      {
        term: 'Strategic Hamlets:',
        def: 'Fortified rural villages created by Diem in 1962 to isolate peasants from the Vietcong, deeply resented by villagers for uprooting ancestral graves.',
      },
      {
        term: 'Buddhist Crisis (1963):',
        def: "Violent civil unrest in South Vietnam sparked by Diem's religious persecution of Buddhists, leading to public self-immolations.",
      },
    ],
    p4: [
      {
        term: 'Gulf of Tonkin Resolution:',
        def: 'Congressional act passed in August 1964 authorizing President Johnson to deploy US armed forces in Vietnam without declaring war.',
      },
      {
        term: 'Operation Rolling Thunder:',
        def: 'Massive, continuous three-year aerial bombing campaign (1965–1968) targeting North Vietnamese military bases, bridges, and supply depots.',
      },
      {
        term: 'Da Nang Landing (1965):',
        def: 'The arrival of 3,500 US Marines on 8 March 1965, marking the formal deployment of American ground combat units in the Vietnam War.',
      },
      {
        term: 'ARVN:',
        def: "Army of the Republic of Vietnam; South Vietnam's official armed forces, heavily trained, funded, and equipped by the United States.",
      },
      {
        term: 'Escalation:',
        def: 'The systematic expansion of American military commitment from 16,000 advisors under Kennedy to over 536,000 combat soldiers under Johnson by 1968.',
      },
    ],
    p6: [
      {
        term: 'Guerrilla Warfare:',
        def: 'Unconventional hit-and-run military tactics used by the Vietcong: ambushes, booby traps, close-quarters combat, and rapid jungle retreats.',
      },
      {
        term: 'Cu Chi Tunnels:',
        def: 'Massive 250km network of subterranean underground tunnels housing command centres, hospitals, and barracks immune to US artillery.',
      },
      {
        term: 'Search and Destroy:',
        def: 'US air cavalry tactic inserting helicopter infantry into suspected enemy territory to locate and eliminate VC and burn hostile villages.',
      },
      {
        term: 'Agent Orange:',
        def: 'Highly toxic dioxin-contaminated herbicide sprayed by US planes to strip dense jungle foliage and destroy enemy food crops.',
      },
      {
        term: 'Napalm:',
        def: 'Jellied gasoline weapon dropped from aircraft in firebombs that adhered to human skin and incinerated surrounding jungle terrain.',
      },
    ],
    p8: [
      {
        term: 'Tet Offensive (1968):',
        def: 'Massive coordinated surprise attack by 84,000 Vietcong across 100 South Vietnamese cities; a military defeat for the VC but a fatal US political shock.',
      },
      {
        term: 'Walter Cronkite:',
        def: 'Respected CBS news anchor whose February 1968 on-air declaration that Vietnam was deadlocked convinced millions the war was unwinnable.',
      },
      {
        term: 'Vietnamisation:',
        def: "President Nixon's policy of building up South Vietnam's military while systematically withdrawing American ground combat troops.",
      },
      {
        term: 'Nixon Doctrine (1969):',
        def: 'Foreign policy stating the US would provide financial and military aid, but Asian allies had to supply their own ground troops for defense.',
      },
      {
        term: 'Operation Menu (1969):',
        def: 'Secret, unauthorized 14-month aerial carpet bombing of neutral Cambodia ordered by Nixon to destroy North Vietnamese sanctuaries.',
      },
    ],
  };

  /**
   * Curated Christine Counsell 4-Act Narrative Enquiries (Strict Word Budget & Layout Balanced)
   */
  const narratives = {
    enquiry1: {
      act1: {
        title: 'Act 1: The Collapse of French Rule and the Geneva Partition',
        text: `**The Fall of Dien Bien Phu (1954):** In May 1954, following a grueling 55-day siege in the mountainous valley of Dien Bien Phu, the communist Viet Minh under General Vo Nguyen Giap decisively shattered French colonial forces. Despite the United States funding over 75% of the French war effort, the French garrison surrendered, bringing nearly a century of French colonial rule in Indochina to an ignominious end. The French defeat sent shockwaves through Washington, where the Eisenhower administration viewed Indochina through the rigid prism of global Cold War containment.

**The Geneva Accords and the 17th Parallel:** In July 1954, an international conference in Geneva partitioned Vietnam temporarily at the 17th parallel. Ho Chi Minh\'s communist government governed the North from Hanoi, while Emperor Bao Dai held power in the South from Saigon. Crucially, the accords mandated nationwide democratic elections in July 1956 to unify the country under a single government. Recognizing that Ho Chi Minh was an unassailable national hero who would win over 80% of the vote, the United States refused to sign the Geneva declaration, resolving instead to forge an independent, anti-communist bastion in South Vietnam.`,
      },
      act2: {
        title: 'Act 2: Ngo Dinh Diem and the Rise of the South Vietnamese Autocracy',
        text: `**The Puppet Miracle and the 1955 Rigged Referendum:** In 1954, the Eisenhower administration installed Ngo Dinh Diem, an ardent Catholic and fierce anti-communist, as Prime Minister of South Vietnam. Backed by millions in US military aid and CIA covert operations under Colonel Edward Lansdale, Diem rigged a 1955 national referendum to depose Emperor Bao Dai, claiming an impossible 98.2% of the vote. Diem immediately declared the Republic of Vietnam and repudiated the Geneva Accords, refusing to participate in the 1956 national reunification elections.

**Catholic Nepotism and Rural Alienation:** Celebrated uncritically by Washington politicians as an "Asian Churchill", Diem ruled South Vietnam as a ruthless family dictatorship. In a country that was over 80% Buddhist, Diem favoured the wealthy Catholic minority, awarding top government posts, military commands, and commercial monopolies to his relatives, particularly his sinister brother Ngo Dinh Nhu. Diem brutally suppressed political rivals and dismantled traditional village democracy by replacing elected village chiefs with Catholic appointees, breeding bitter resentment among the rural peasantry.`,
      },
      act3: {
        title: 'Act 3: The Strategic Hamlet Program and the Buddhist Explosion',
        text: `**The Strategic Hamlet Fiasco (1962):** To isolate the growing National Liberation Front (NLF/Vietcong) insurgency, Diem launched the Strategic Hamlet Program, funded by US advisors. Over eight million peasants were forcibly uprooted from ancestral lands and herded behind moats, bamboo spikes, and barbed wire. Peasants deeply resented being ripped away from ancestral burial grounds and forced to pay for the materials used to enclose them. Rather than isolating the Vietcong, the hated hamlets acted as recruitment incubators, with many peasants welcoming communist guerrillas who promised land redistribution.

**The Buddhist Crisis of 1963:** In May 1963, Diem\'s government prohibited Buddhists from flying religious flags in Hue while celebrating the Buddha's birthday. When thousands protested, government troops fired into the crowd, killing nine. On 11 June 1963, elderly monk Thich Quang Duc sat peacefully in the lotus position in a busy Saigon street and burned himself to death. Malcolm Browne's iconic photograph of the monk engulfed in flames flashed across front pages worldwide. Diem's sister-in-law, Madame Nhu, dismissively mocked the protest as a "barbecue show", provoking disgust across the American public.`,
      },
      act4: {
        title: "Act 4: The Historical Verdict: Kennedy's Coup and the Fatal Trap",
        text: `**The Overthrow of Diem (November 1963):** President John F. Kennedy realized that Diem had become an impossible liability. While Kennedy had expanded US military "advisors" from 700 to over 16,000 to assist the ARVN, Diem\'s religious persecution and military incompetence paralyzed the war effort. In August 1963, US Ambassador Henry Cabot Lodge Jr. informed Washington that the war could not be won with Diem in power. On 1 November 1963, ARVN generals launched a CIA-backed coup; Diem and his brother were captured and executed in the back of an armoured vehicle.

**An Irreversible Commitment:** Just three weeks later, President Kennedy was assassinated in Dallas. Diem's overthrow plunged South Vietnam into chronic instability: a succession of corrupt, incompetent military juntas seized and lost power in Saigon. Having orchestrated Diem\'s demise, the United States was now morally and politically responsible for the survival of the South Vietnamese state. Kennedy\'s successor, Lyndon B. Johnson, was trapped in a deepening quagmire from which there was no easy escape.`,
      },
    },

    enquiry2: {
      act1: {
        title: 'Act 1: ARVN Collapse & the Rise of the Vietcong, 1963–64',
        text: `**The Vulnerability of the Saigon Regime:** Following Diem\'s execution in late 1963, South Vietnam suffered severe political paralysis. A rapid succession of military coups created chaos in Saigon, while the Army of the Republic of Vietnam (ARVN) suffered chronic desertion and poor leadership. In the rural countryside, the National Liberation Front (NLF), known colloquially as the Vietcong (VC), expanded rapidly. Armed with modern Soviet and Chinese weapons, the Vietcong operated with near-total freedom across the fertile Mekong Delta, collecting taxes, assassinating government officials, and gaining popular support through land redistribution.

**Johnson\'s Cold War Imperative:** Inheriting the presidency in November 1963, Lyndon B. Johnson was haunted by the prospect of "losing" South Vietnam to communism. An insecure foreign policy leader, Johnson feared that if Vietnam fell, conservative Republicans would accuse him of being soft on communism, destroying his ambitious domestic reform program—the "Great Society". Johnson privately confided to advisors that Vietnam was "a raggedy-ass little fourth-rate country", yet he declared publicly that he would never be the first American president to lose a war.`,
      },
      act2: {
        title: 'Act 2: The Gulf of Tonkin Incident: Orchestrating War Powers',
        text: `**The Skirmish in the Gulf of Tonkin (August 1964):** In late July 1964, the US destroyer USS Maddox was conducting covert electronic intelligence patrols (Operation Desoto) off the coast of North Vietnam, supporting South Vietnamese commando raids against northern radar stations. On 2 August, three North Vietnamese torpedo boats engaged the Maddox, which returned fire, damaging two boats with help from carrier jets. Two nights later, on 4 August, in heavy sea swells and torrential rain, radar and sonar operators reported a second enemy torpedo attack; although captain John Herrick soon sent cables warning that radar freaks and overeager sonar operators made the attack doubtful, Johnson decided to act.

**The "Blank Cheque" Resolution:** Johnson withheld intelligence doubts from Congress and the American public. Taking to national television, he condemned "unprovoked Communist aggression" on the high seas and launched retaliatory airstrikes on North Vietnamese naval bases. On 7 August 1964, Congress overwhelmingly passed the Gulf of Tonkin Resolution (416–0 in the House, 88–2 in the Senate). The resolution gave the president extraordinary constitutional authority to "take all necessary measures to repel any armed attack" without requiring a formal congressional declaration of war.`,
      },
      act3: {
        title: 'Act 3: Operation Rolling Thunder & the Landing of Ground Combat Troops',
        text: `**Operation Rolling Thunder (March 1965):** In February 1965, Vietcong guerrically attacked an American military barracks at Pleiku, killing eight soldiers and wounding over a hundred. Seizing the provocation, Johnson initiated Operation Rolling Thunder: a sustained, gradual aerial bombing campaign against North Vietnam. Over the next three years, the US Air Force and Navy dropped 864,000 tons of ordnance on North Vietnamese bridges, rail lines, and military depots. However, because North Vietnam was a non-industrial agrarian society, aerial bombardment failed to break Hanoi\'s will or halt the infiltration of troops down the Ho Chi Minh Trail.

**The Landing at Da Nang (8 March 1965):** To defend the massive Da Nang air base from Vietcong retaliation, General William Westmoreland requested ground combat troops. On 8 March 1965, 3,500 heavily armed US Marines of the 9th Marine Expeditionary Brigade waded ashore onto the beaches of Da Nang. Greeted initially by local schoolgirls presenting flower garlands, the Marines\' defensive mission quickly morphed into offensive combat. By the end of 1965, Westmoreland had convinced Johnson to expand American troop strength from 23,000 advisors to over 184,000 ground combat infantrymen.`,
      },
      act4: {
        title: 'Act 4: The Historical Verdict: The Trap of Americanization',
        text: `**The Irreversible Escalation of 1965:** The decisions taken by Lyndon Johnson between August 1964 and July 1965 transformed what had been a localized anti-colonial and civil conflict into an Americanized war. In choosing massive military escalation over diplomatic negotiation, Johnson committed American global prestige to preserving an artificial, corrupt regime in Saigon that enjoyed virtually no legitimate popular base outside the urban Catholic elite.

**The Illusion of Rapid Victory:** American military planners entered the conflict with supreme technical hubris, convinced that the world\'s most technologically advanced industrial superpower could effortlessly crush a ragged peasant army in the Southeast Asian jungle. They completely failed to comprehend the nationalist dedication of the Vietnamese communist fighters, who had already endured twenty years of war against the French and were prepared to sacrifice millions of lives to achieve national reunification and independence.`,
      },
    },

    enquiry3: {
      act1: {
        title: 'Act 1: The Invisible Enemy: Vietcong Guerrilla Warfare',
        text: `**Asymmetric Guerrilla Tactics:** Confronting the overwhelming conventional firepower of the US military, the Vietcong and North Vietnamese Army (PAVN) adopted classic asymmetric guerrilla warfare. Guided by General Vo Nguyen Giap, communist fighters avoided pitched, large-scale set-piece battles where American artillery and tactical air strikes could annihilate them. Instead, they moved in small squads, operating under cover of darkness or bad weather, striking isolated outposts or ambushing American patrols before melting back into the jungle or vanishing among ordinary village peasants.

**Subterranean Warfare: The Cu Chi Tunnels:** To survive relentless US aerial bombing and artillery barrages, the Vietcong constructed vast underground tunnel systems. The most famous, the Cu Chi tunnel network near Saigon, spanned over 250 kilometres across multiple subterranean levels. These engineering marvels contained underground hospitals, dormitories, weapons factories, command headquarters, and kitchens with smoke-dissipating flues. American troops walking above had no idea thousands of enemy fighters were living beneath their boots, ready to emerge through concealed trapdoors, fire upon patrols, and vanish without a trace.`,
      },
      act2: {
        title: 'Act 2: The Supply Lifeline: The Ho Chi Minh Trail & Booby Traps',
        text: `**The Ho Chi Minh Trail:** The lifeblood of the communist insurgency was the Ho Chi Minh Trail: an intricate 16,000-kilometre logistical corridor of jungle roads, paths, and river waterways snaking from North Vietnam through neutral Laos and Cambodia into South Vietnam. Despite the US Air Force dropping millions of tons of bombs—more than fell on Germany and Japan combined in World War II—over 300,000 North Vietnamese volunteer labourers and youth brigades repaired damaged roads overnight. Reinforced cargo bicycles, pack animals, and convoys of Soviet trucks maintained an uninterrupted flow of heavy weapons and reinforcements.

**Psychological Terror: Booby Traps:** Vietcong fighters turned the jungle into a lethal psychological labyrinth. Roughly 11% of all American deaths and 17% of wounds were caused by booby traps. Troops feared "punji stick" pits: sharpened bamboo stakes smeared with human excrement designed to puncture combat boots and cause severe bacterial infection. Other traps included tripwire-detonated grenades, "Bouncing Betty" landmines that leaped waist-high before detonating, and hollowed-out bamboo logs filled with venomous vipers. This constant, invisible danger drove young American soldiers into chronic paranoia and psychological exhaustion.`,
      },
      act3: {
        title: 'Act 3: Industrial Warfare: Search & Destroy, Napalm & Defoliation',
        text: `**Westmoreland\'s War of Attrition:** General William Westmoreland adopted a strategy of attrition, believing American technological power could kill Vietcong fighters faster than Hanoi could replace them (the "crossover point"). American combat operations took the form of "Search and Destroy" missions: heavily armed infantry platoons were ferried by Bell UH-1 "Huey" helicopters into suspected enemy strongholds to locate the enemy, direct artillery and airstrikes, and count the dead ("body count"). Frustrated by their inability to find the enemy, American soldiers frequently burned suspected villages to the ground in notorious "Zippo raids".

**Chemical Weapons and Environmental Devastation:** To strip away dense jungle canopy and destroy food crops that sustained the guerrillas, the US military launched Operation Ranch Hand (1961–1971). Specially modified C-123 cargo aircraft sprayed over 20 million gallons of toxic herbicides across South Vietnam, primarily Agent Orange, which was heavily contaminated with deadly dioxin. Furthermore, the US dropped nearly 400,000 tons of napalm: jellied petroleum that clung to human skin and burned at over 1,000°C. These brutal chemical weapons disfigured tens of thousands of civilians and poisoned ecosystems for generations.`,
      },
      act4: {
        title: 'Act 4: The Historical Verdict: Winning Battles, Losing the War',
        text: `**Tactical Superiority vs. Strategic Impotence:** In purely military terms, the US armed forces won virtually every major tactical engagement they fought in Vietnam. Advanced air cavalry, B-52 Stratofortress carpet bombing, and devastating artillery fire inflicted staggering casualties on communist forces, who lost over one million soldiers during the conflict. Yet this military dominance proved strategically meaningless. The body count metric was fundamentally flawed: Hanoi\'s high birth rate and unwavering nationalist resolve meant communist forces easily replaced their battlefield losses.

**Losing the "Hearts and Minds":** Crucially, the destructive nature of American industrial firepower destroyed the political objective of the war. Search and destroy sweeps, forced peasant relocations, and widespread chemical destruction alienated the very population the United States was supposedly defending. Peasants whose ancestral homes and rice crops were incinerated by napalm viewed the Americans not as democratic liberators, but as foreign imperialist invaders far more brutal than the French colonial masters they had replaced.`,
      },
    },

    enquiry4: {
      act1: {
        title: 'Act 1: The Shock of Tet: The Country Under Siege',
        text: `**The Surprise Offensive (January 1968):** Throughout late 1967, General Westmoreland and the Johnson administration assured the American public that victory was in sight and there was "light at the end of the tunnel". This official optimism was shattered on 30 January 1968 during the Vietnamese Lunar New Year (Tet) holiday. Breaking a traditional ceasefire, over 84,000 Vietcong and North Vietnamese soldiers launched simultaneous, coordinated surprise assaults on 36 provincial capitals, 64 district towns, and five major cities across South Vietnam.

**Breaching the Citadel:** In Saigon, a suicide squad of 19 Vietcong commandos blasted through the outer perimeter wall of the heavily fortified US Embassy compound, engaging in a fierce six-hour firefight with US military police before being killed. In the imperial capital of Hue, communist forces captured the ancient Citadel, holding the city for 25 brutal days of house-to-house urban combat before being dislodged by US Marines and naval artillery, leaving the historic city in smouldering ruins and thousands of civilians dead in mass graves.`,
      },
      act2: {
        title: "Act 2: The Psychological Earthquake and Johnson's Abdication",
        text: `**A Tactical Catastrophe for the Vietcong:** From a strict military perspective, the Tet Offensive was a catastrophic disaster for the communists. Expected popular uprisings among the urban population failed to materialize. American and ARVN firepower decimated the Vietcong ranks, killing an estimated 45,000 veteran guerrilla fighters and permanently crippling the NLF as an independent fighting force, forcing Hanoi to rely on regular PAVN soldiers for the remainder of the war.

**A Decisive Strategic Victory for Hanoi:** Paradoxically, Tet was the decisive turning point of the war because of its psychological impact on the American home front. Television networks broadcast footage of dead Vietcong on the manicured lawns of the US Embassy and street fighting in Saigon into living rooms across America. The "credibility gap"—the chasm between government claims of imminent victory and the reality of the battlefield—became unbridgeable. Respected CBS anchor Walter Cronkite traveled to Vietnam and declared on prime-time television that the war was mired in an unwinnable stalemate. On 31 March 1968, facing cratering approval ratings, President Johnson shocked the nation by announcing he would halt bombing and would not seek re-election.`,
      },
      act3: {
        title: 'Act 3: Nixon, Vietnamisation & the Secret Expansion of the War',
        text: `**The Nixon Doctrine and Vietnamisation:** Elected in November 1968 on a promise to bring "peace with honor", President Richard Nixon and his National Security Advisor Henry Kissinger instituted the policy of "Vietnamisation". Formulated under the Nixon Doctrine, the strategy aimed to withdraw American ground troops in phased increments while expanding, equipping, and training the ARVN to assume primary combat responsibility. Between 1969 and 1972, US troop levels dropped precipitously from an all-time peak of 543,000 to under 25,000.

**The "Madman Theory" and Secret Incursions:** While withdrawing ground troops to placate domestic anti-war fury, Nixon simultaneously escalated aerial warfare to convince Hanoi he was unpredictable and dangerous ("Madman Theory"). In March 1969, Nixon launched Operation Menu: a secret, unauthorized 14-month B-52 carpet-bombing campaign of neutral Cambodia to obliterate communist sanctuaries and the Ho Chi Minh Trail. In April 1970, Nixon ordered US and ARVN ground troops to invade Cambodia, sparking massive anti-war demonstrations across American universities, climaxing in the Kent State shootings.`,
      },
      act4: {
        title: 'Act 4: The Historical Verdict: The Illusion of "Peace with Honor"',
        text: `**The Easter Offensive (1972):** In March 1972, Hanoi tested Vietnamisation by launching the Easter Offensive: a massive conventional invasion of South Vietnam involving 120,000 PAVN troops and Soviet T-54 tanks. While ARVN troops fought bravely in several battles, they survived only because Nixon unleashed Operation Linebacker: an apocalyptic wave of US B-52 strikes that decimated North Vietnamese armored columns. The offensive proved that without massive American aerial intervention, the South Vietnamese military could not survive independently.

**The Inevitable Collapse:** Vietnamisation was fundamentally an exit strategy designed to achieve a "decent interval" between American military disengagement and South Vietnam\'s ultimate collapse. Although Nixon forced Hanoi to sign the Paris Peace Accords in January 1973 by launching the Christmas Bombings (Operation Linebacker II), the treaty allowed 150,000 North Vietnamese troops to remain stationed inside South Vietnam. Once American combat forces departed and Congress cut off military funding in the wake of the Watergate scandal, South Vietnam was doomed to swift destruction.`,
      },
    },
  };

  const backCoverData = {
    title: 'Key Topic 3 Master Synoptic Consolidation',
    timeline: [
      {
        date: '7 May 1954',
        title: 'Fall of Dien Bien Phu',
        body: 'Viet Minh forces shatter the French garrison at Dien Bien Phu; Geneva Accords partition Vietnam at 17th parallel pending elections.',
      },
      {
        date: '2 Nov 1963',
        title: 'Assassination of Diem',
        body: 'CIA-backed ARVN generals execute President Ngo Dinh Diem; creates a chronic military leadership vacuum across South Vietnam.',
      },
      {
        date: '7 Aug 1964',
        title: 'Gulf of Tonkin Resolution',
        body: 'US Congress passes near-unanimous resolution granting President Johnson unlimited executive authority to wage undeclared war.',
      },
      {
        date: '8 Mar 1965',
        title: 'Marines Land at Da Nang',
        body: '3,500 US Marines arrive on Da Nang beaches, marking the formal deployment of American ground combat troops in offensive sweeps.',
      },
      {
        date: '30 Jan 1968',
        title: 'The Tet Offensive',
        body: '84,000 Vietcong and PAVN troops storm 100 cities; while a military defeat for the VC, it shatters US political will to continue the war.',
      },
      {
        date: '3 Nov 1969',
        title: 'Vietnamisation Address',
        body: 'President Nixon outlines his phased withdrawal of US combat troops while shifting primary ground combat duties to South Vietnam.',
      },
    ],
    pillars: [
      {
        title: 'I. Cold War Containment & Domino Theory',
        body: "Successive US administrations viewed Indochina through the rigid prism of Cold War containment and the Domino Theory, propping up Ngo Dinh Diem's corrupt, repressive autocracy to block nationwide democratic elections promised at Geneva.",
      },
      {
        title: 'II. Tonkin Resolution & War of Attrition',
        body: 'The 1964 Gulf of Tonkin Resolution granted President Johnson unchecked war powers to deploy over 536,000 ground combat troops. General William Westmoreland waged an industrial war of attrition relying on helicopter air mobility, defoliants, and body counts.',
      },
      {
        title: 'III. Asymmetric Guerrilla Warfare & Resilience',
        body: 'Communist forces neutralized overwhelming US technological firepower through asymmetric guerrilla tactics: extensive Cu Chi tunnel networks, lethal booby traps, close-quarters combat, and the uninterrupted supply corridor of the Ho Chi Minh Trail.',
      },
      {
        title: 'IV. Tet Shock, Credibility Gap & Vietnamisation',
        body: 'The 1968 Tet Offensive inflicted a fatal psychological shock on the American home front, shattering official optimism. Under intense domestic anti-war pressure, President Nixon enacted Vietnamisation, withdrawing US combat forces while secretly bombing Cambodia.',
      },
    ],
    historiographyDebate: {
      interp1: {
        title:
          'Interpretation 1: The Tragedy of Imperial Hubris & Political Blindness (George C. Herring)',
        text: '"American intervention in Vietnam was doomed from the outset by ethnocentric arrogance. Washington misdiagnosed a powerful anti-colonial nationalist revolution as a pawn in Soviet-Chinese global aggression, backing an artificial, corrupt Saigon regime that could never command the loyalty of its own people or achieve independent political legitimacy."',
      },
      interp2: {
        title:
          'Interpretation 2: The Flaw of Civilian Micromanagement & Limited War (H.R. McMaster)',
        text: '"The military defeat in Vietnam was not inevitable; it was caused by civilian political leaders in the Johnson administration who pursued a disastrous policy of gradual escalation. By refusing to declare war, micromanaging air targets, and restricting ground forces from cutting the Ho Chi Minh Trail in Laos, Washington made military victory impossible."',
      },
    },
    verdicts: [
      {
        title: 'The Failure of Cold War Containment:',
        body: 'The Domino Theory trapped the United States into a catastrophic geopolitical quagmire, subordinating Vietnamese anti-colonial nationalism to global Cold War ideology at the cost of 58,000 American and over two million Vietnamese lives.',
      },
      {
        title: 'The Bankruptcy of the Attrition Strategy:',
        body: 'Advanced military technology—B-52 carpet bombing, napalm, and Agent Orange defoliation—could not overcome dedicated revolutionary guerrillas fighting on their home terrain supported by an unyielding logistical supply line.',
      },
      {
        title: 'The Decent Interval of Vietnamisation:',
        body: "Vietnamisation was fundamentally an American exit strategy designed to achieve a decent interval before Saigon's inevitable collapse. Without indefinite American combat aviation and financial subsidies, South Vietnam was structurally incapable of independent survival.",
      },
    ],
    quizzes: [
      {
        num: 'KT 3.1',
        title: 'Origins & Diem Regime',
        url: 'https://the-history-revision-hub.netlify.app/?unit=usa&quiz=kt3_1',
      },
      {
        num: 'KT 3.2',
        title: 'Escalation under LBJ',
        url: 'https://the-history-revision-hub.netlify.app/?unit=usa&quiz=kt3_2',
      },
      {
        num: 'KT 3.3',
        title: 'Guerrilla vs US Tactics',
        url: 'https://the-history-revision-hub.netlify.app/?unit=usa&quiz=kt3_3',
      },
      {
        num: 'KT 3.4',
        title: 'Tet & Vietnamisation',
        url: 'https://the-history-revision-hub.netlify.app/?unit=usa&quiz=kt3_4',
      },
    ],
  };

  return {
    coverConfig,
    componentBank: USA_COMPONENT_BANK,
    leftSources,
    leftVocab,
    narratives,
    backCoverData,
  };
};
