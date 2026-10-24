/**
 * scripts/usa_textbook_data_kt4.cjs
 *
 * Component bank, primary sources, vocabulary, curated 4-Act narratives, and back-cover data for
 * Key Topic 4: Reactions to, and the End of, US Involvement in the Vietnam War, 1964–75
 * Pearson Edexcel GCSE (9–1) History • Option 33 (1HI0/33)
 */

module.exports = function getKt4Data(helpers) {
  const { getBase64Image } = helpers;

  const coverConfig = {
    ktId: 'KT4',
    topicNumber: 4,
    title: 'Reactions to, and the End of, US Involvement in the Vietnam War, 1964–75',
    subtitle:
      'Pearson Edexcel GCSE (9–1) History &bull; Paper 3 Option 33 (1HI0/33) &bull; Key Topic 4 Synthesis',
    enquiry:
      'Why did domestic opposition make the Vietnam War unwinnable, and why did South Vietnam collapse so rapidly after the US withdrawal?',
    coverImage: 'antiwar-pentagon-protest-1967.jpg',
    caption:
      'Plate I: Anti-war demonstrators confront armed military police during the March on the Pentagon in Washington D.C. (October 1967).',
    specTopics: [
      {
        num: 1,
        title: '1. Growth of Anti-War Protest & Flashpoints',
        bullets: [
          'The "living room war": uncensored television footage, rising casualty counts, and the credibility gap.',
          'Draft resistance: student deferments, racial inequalities in the draft, burning draft cards, and VVAW.',
          'Flashpoints: My Lai massacre (1968), court-martial of Lt. Calley, and the Kent State shootings (May 1970).',
        ],
      },
      {
        num: 2,
        title: '2. Support for the War & The "Silent Majority"',
        bullets: [
          'Reasons for continued support: patriotism, anti-communism, fear of the Domino Theory, and law and order.',
          'Nixon\'s "Silent Majority" televised address (Nov 1969) and political polarization.',
          'The "Hard Hats": construction worker counter-demonstrations and the New York City Hard Hat Riot (May 1970).',
        ],
      },
      {
        num: 3,
        title: '3. Peace Negotiations & The Exit, 1972–73',
        bullets: [
          "Secret negotiations in Paris between Henry Kissinger and North Vietnam's Le Duc Tho.",
          'The 1972 Easter Offensive, Nixon\'s Operation Linebacker II ("Christmas Bombings"), and the Paris Peace Accords (1973).',
          'Terms of the peace agreement: immediate US troop withdrawal, exchange of POWs, and PAVN forces remaining in the South.',
        ],
      },
      {
        num: 4,
        title: '4. The Fall of Saigon & Failure Synthesis, 1974–75',
        bullets: [
          "Congressional budget cuts, the War Powers Act (1973), and the Watergate scandal forcing Nixon's resignation (1974).",
          'The North Vietnamese Spring Offensive (1975), rapid ARVN collapse, and the Fall of Saigon (30 April 1975).',
          'Comprehensive synthesis of reasons why the US failed: military, political, Vietnamese, and domestic factors.',
        ],
      },
    ],
  };

  const USA_COMPONENT_BANK = {
    // Page 3: KT 4.1 (Growth of Protest: Draft, Media, My Lai, Kent State)
    p3: {
      keyFigure: {
        name: 'Lt. William Calley',
        lifespan: 'Born 1943',
        role: 'Platoon Leader, Charlie Company, 11th Infantry Brigade',
        significance:
          'Sole American officer convicted for the mass murder of over 500 unarmed South Vietnamese civilians at My Lai in March 1968.',
        actions: [
          'Ordered soldiers of Charlie Company to shoot unarmed women, infants, and elderly peasants in the village of Son My.',
          'Participated directly in herding over 100 villagers into an irrigation ditch and executing them with automatic rifle fire.',
          'Sentenced to life imprisonment in 1971, but had his sentence reduced by President Nixon to three years of house arrest.',
        ],
        image: getBase64Image('units/usa/assets/sources/portraits/william_calley.jpg'),
      },
      conceptSpotlight: `
        <div class="concept-spotlight-box">
          <div class="csb-header">
            <span class="csb-tag">CATALYST OF MORAL CRISIS</span>
            <span class="csb-category">WAR ATROCITIES &bull; 1968–1970</span>
          </div>
          <h4 class="csb-title">The My Lai Massacre &amp; The Death of Moral Authority</h4>
          <div class="csb-body">
            On 16 March 1968, American soldiers of Charlie Company slaughtered up to 504 unarmed Vietnamese civilians in the village of <strong>My Lai</strong>. The military covered up the atrocity for over twenty months until investigative journalist <strong>Seymour Hersh</strong> exposed the slaughter in late 1969. Photographs by Ronald Haeberle showing heaps of murdered women and infants shattered the core American myth that US soldiers were noble defenders of democracy, cementing the domestic anti-war movement.
          </div>
          <div class="csb-takeaway">
            <strong>Strategic Legacy:</strong> My Lai proved to millions of middle-class Americans that the war had morally corrupted the US Armed Forces, making continued military presence politically impossible to defend.
          </div>
        </div>
      `,
      timeline: [
        {
          date: '16 March 1968',
          title: 'My Lai Massacre',
          text: 'Charlie Company murders over 500 unarmed villagers; military brass conceals atrocity.',
        },
        {
          date: '1 Dec 1969',
          title: 'The Draft Lottery',
          text: 'Selective Service holds first military draft lottery broadcast live on television, galvanizing student resistance.',
        },
        {
          date: '4 May 1970',
          title: 'Kent State Shootings',
          text: 'Ohio National Guardsmen fire 67 rounds into unarmed student demonstrators, killing 4 and wounding 9.',
        },
        {
          date: 'June 1971',
          title: 'The Pentagon Papers',
          text: 'Daniel Ellsberg leaks classified DoD history to the NY Times, exposing presidential deception over Vietnam.',
        },
      ],
    },

    // Page 5: KT 4.2 (Support for the War: The Silent Majority & Hard Hats)
    p5: {
      keyFigure: {
        name: 'President Richard Nixon',
        lifespan: '1913–1994',
        role: '37th President of the United States (1969–1974)',
        significance:
          'Skillfully mobilized working-class and conservative resentment against the anti-war movement to build the "Silent Majority".',
        actions: [
          'Delivered his famous "Silent Majority" televised speech on 3 November 1969, securing an overwhelming 77% public approval rating.',
          'Framed anti-war protesters as radical, flag-burning, privileged college elites who betrayed working-class soldiers dying in combat.',
          'Forged an unprecedented alliance with blue-collar labor unions following the Hard Hat Riot in New York City.',
        ],
        image: getBase64Image('units/usa/assets/sources/portraits/nixon.jpg'),
      },
      conceptSpotlight: `
        <div class="concept-spotlight-box">
          <div class="csb-header">
            <span class="csb-tag">POLITICAL MECHANISM: POPULIST POLARIZATION</span>
            <span class="csb-category">THE SILENT MAJORITY &bull; 1969–1972</span>
          </div>
          <h4 class="csb-title">The "Silent Majority" &amp; The Blue-Collar Counter-Offensive</h4>
          <div class="csb-body">
            Nixon appealed directly to the millions of middle-class and working-class Americans who did not demonstrate: <em>"And so tonight—to you, the great silent majority of my fellow Americans—I ask for your support."</em> Working-class citizens deeply resented college protesters who enjoyed draft deferments while working-class sons were conscripted. On 8 May 1970, this cultural resentment erupted in the <strong>Hard Hat Riot</strong> in Lower Manhattan, where 1,000 construction workers assaulted anti-war students chanting "USA All the Way!"
          </div>
          <div class="csb-takeaway">
            <strong>Strategic Legacy:</strong> The Silent Majority demonstrated that America was bitterly divided along class lines, providing Nixon with the political mandate to continue aerial warfare while withdrawing ground troops.
          </div>
        </div>
      `,
      timeline: [
        {
          date: '3 Nov 1969',
          title: 'Silent Majority Address',
          text: 'Nixon appeals to conservative Middle America; tens of thousands send telegrams of support.',
        },
        {
          date: '30 April 1970',
          title: 'Invasion of Cambodia',
          text: 'Nixon announces ground incursions into Cambodia, triggering nationwide student strikes on 450 campuses.',
        },
        {
          date: '8 May 1970',
          title: 'The Hard Hat Riot',
          text: 'Construction workers assault anti-war demonstrators near Wall Street; union leaders visit White House.',
        },
        {
          date: 'Nov 1972',
          title: 'Nixon Landslide Re-election',
          text: 'Nixon defeats anti-war candidate George McGovern in 49 of 50 states, validating his "Peace with Honour" stance.',
        },
      ],
    },

    // Page 7: KT 4.3 (Peace Process, Paris Accords & Fall of Saigon)
    p7: {
      keyFigure: {
        name: 'Henry Kissinger & Le Duc Tho',
        lifespan: '1923–2023 &bull; 1911–1990',
        role: 'US National Security Advisor & Chief North Vietnamese Negotiator',
        significance:
          'Conducted three years of secretive, grueling diplomatic negotiations in Paris culminating in the 1973 Paris Peace Accords.',
        actions: [
          'Held secret negotiations in Paris beginning in 1969, bypassing the formal diplomatic delegation and the Saigon government.',
          'Conceded the crucial point in October 1972 allowing 150,000 North Vietnamese combat troops to remain inside South Vietnam.',
          'Jointly awarded the 1973 Nobel Peace Prize; Le Duc Tho refused to accept it, stating genuine peace had not been achieved.',
        ],
        image: getBase64Image('units/usa/assets/sources/portraits/kissinger.jpg'),
      },
      conceptSpotlight: `
        <div class="concept-spotlight-box">
          <div class="csb-header">
            <span class="csb-tag">DIPLOMATIC APPARATUS: FLAWED ACCORDS</span>
            <span class="csb-category">THE PARIS ACCORDS &bull; 1973</span>
          </div>
          <h4 class="csb-title">The Paris Peace Accords: "A Decent Interval"</h4>
          <div class="csb-body">
            Signed on 27 January 1973, the <strong>Paris Peace Accords</strong> provided for the complete withdrawal of all remaining US combat forces within 60 days and the release of 591 American prisoners of war (POWs). Crucially, the accords allowed over 150,000 North Vietnamese PAVN soldiers to remain entrenched across South Vietnamese territory. Historians characterize this as Nixon\'s search for a <em>"decent interval"</em>—a diplomatic pause allowing the US to exit cleanly before South Vietnam was inevitably overrun.
          </div>
          <div class="csb-takeaway">
            <strong>Strategic Legacy:</strong> Without American air support, South Vietnam was militarily doomed; the accords simply formalized the American disengagement while leaving North Vietnam positioned for total military conquest.
          </div>
        </div>
      `,
      timeline: [
        {
          date: '18–29 Dec 1972',
          title: 'Christmas Bombings',
          text: 'Operation Linebacker II drops 20,000 tons of bombs on Hanoi and Haiphong to force final concessions.',
        },
        {
          date: '27 Jan 1973',
          title: 'Paris Peace Accords Signed',
          text: 'Direct US military involvement ends; all American combat troops depart Vietnam by 29 March 1973.',
        },
        {
          date: '7 Nov 1973',
          title: 'War Powers Act Passed',
          text: "Congress overrides Nixon's veto to restrict presidential authority to commit troops overseas without approval.",
        },
        {
          date: '30 April 1975',
          title: 'The Fall of Saigon',
          text: 'North Vietnamese tanks smash gates of the Presidential Palace; Saigon renamed Ho Chi Minh City.',
        },
      ],
    },

    // Page 9: KT 4.4 (Failure Synthesis: Why the US Failed to Win)
    p9: {
      keyFigure: {
        name: 'Ho Chi Minh',
        lifespan: '1890–1969',
        role: 'President of the Democratic Republic of Vietnam (North Vietnam)',
        significance:
          'Inspirational nationalist and communist leader whose moral stature and unyielding resolve outlasted three American presidencies.',
        actions: [
          'Founded the Viet Minh in 1941 to wage armed resistance against both Japanese occupiers and French colonial forces.',
          'Proclaimed Vietnamese independence in Hanoi on 2 September 1945, quoting the American Declaration of Independence.',
          'Famously warned the French and Americans: "You can kill ten of our men for every one we kill of yours. But even at those odds, you will lose and we will win."',
        ],
        image: getBase64Image('units/usa/assets/sources/portraits/ho_chi_minh.jpg'),
      },
      conceptSpotlight: `
        <div class="concept-spotlight-box">
          <div class="csb-header">
            <span class="csb-tag">HISTORIOGRAPHICAL VERDICT: FAILURE MATRIX</span>
            <span class="csb-category">SYNOPTIC EVALUATION &bull; 1954–1975</span>
          </div>
          <h4 class="csb-title">Why the Superpower Failed: Asymmetric Limits of Power</h4>
          <div class="csb-body">
            The American defeat was the product of four interconnected failures: <strong>(1) Vietnamese Nationalism:</strong> North Vietnam and the Vietcong were waging a total war of national liberation, prepared to endure unlimited casualties; <strong>(2) Military Inadequacy:</strong> Industrial firepower and bombing could not conquer a dispersed peasant guerrilla insurgency; <strong>(3) South Vietnamese Illegitimacy:</strong> The Saigon government was corrupt and never earned the loyalty of its population; and <strong>(4) Domestic Collapse:</strong> Uncensored media coverage, casualty tolls, and the draft destroyed the American public\'s political will to sustain the war.
          </div>
          <div class="csb-takeaway">
            <strong>Strategic Legacy:</strong> The war shattered the Cold War consensus, created the enduring "Vietnam Syndrome" (reluctance to deploy US troops overseas), and proved that military firepower cannot defeat a deeply rooted political movement.
          </div>
        </div>
      `,
      timeline: [
        {
          date: '1973–1974',
          title: 'Congress Slashes Military Aid',
          text: 'US Congress cuts financial and military supplies to Saigon by 50%, starving the ARVN of fuel and ammo.',
        },
        {
          date: '9 Aug 1974',
          title: 'Resignation of Richard Nixon',
          text: "Watergate scandal forces Nixon's resignation; President Gerald Ford is powerless to intervene militarily.",
        },
        {
          date: 'Early 1975',
          title: 'The Spring Offensive',
          text: 'PAVN forces sweep across the Central Highlands; ARVN units panic and rout in the "Convoy of Tears".',
        },
        {
          date: '29–30 April 1975',
          title: 'Operation Frequent Wind',
          text: 'US helicopters evacuate 7,000 Americans and South Vietnamese from Saigon rooftops as the war ends.',
        },
      ],
    },
  };

  const leftSources = {
    p2: {
      sourceA: {
        title: 'Source A: The First Military Draft Lottery Broadcast on National Television',
        type: 'Official Press Wire Photo &bull; Associated Press Archive',
        date: '1 December 1969',
        image: getBase64Image('units/usa/assets/sources/vietnam-draft-lottery.jpg'),
        quote:
          'Selective Service Director Alexander Pirnie draws the first capsule determining draft call order.',
        context:
          'The Selective Service System conducted the first draft lottery since World War II. Three hundred and sixty-six blue plastic capsules containing birth dates were drawn from a glass bowl. Young men with low lottery numbers faced immediate conscription into the infantry.',
        hingeQuestion:
          'How did the introduction of the draft lottery mobilize millions of college students and their families into active anti-war protest?',
      },
      sourceB: {
        isWritten: true,
        title: 'Source B: Vietnam Veteran John Kerry Testifies Before the US Senate (1971)',
        type: 'US Senate Congressional Testimony &bull; Foreign Relations Committee',
        date: '22 April 1971',
        quote:
          "We saw Vietnam ravaged by American bombs and search-and-destroy missions. We watched the men who were sent to fight die for a mistake... Someone has to die so that President Nixon won't be the first American president to lose a war. And we are asking: how do you ask a man to be the last man to die for a mistake?",
        context:
          'Former Navy Lieutenant John Kerry representing Vietnam Veterans Against the War (VVAW), testifying before the US Senate on the moral bankruptcy of continuing the conflict.',
        hingeQuestion:
          'Why did testimony from decorated combat veterans inflict far greater political damage on the war effort than student protests?',
      },
    },
    p4: {
      sourceA: {
        title: 'Source A: Pro-War Patriotic Rally in New York City',
        type: 'Press Photograph &bull; Associated Press / Library of Congress',
        date: 'May 1970',
        image: getBase64Image('units/usa/assets/sources/pro-war-rally-nyc.jpg'),
        quote:
          'Marchers carry American flags and banners proclaiming: "God Bless America & Our Fighting Men."',
        context:
          "Tens of thousands of union members, office workers, and veterans march through Lower Manhattan in support of President Nixon's foreign policy. Demonstrators condemned student protesters as unpatriotic cowards who insulted American soldiers dying in combat.",
        hingeQuestion:
          'What underlying social and cultural values motivated the "Silent Majority" to vehemently defend the military intervention in Vietnam?',
      },
      sourceB: {
        isWritten: true,
        title: 'Source B: President Richard Nixon\'s "Silent Majority" Address to the Nation',
        type: 'Presidential Television Broadcast &bull; White House Historical Record',
        date: '3 November 1969',
        quote:
          'Let historians not record that when America was the most powerful nation in the world, we passed on to the other side of the road and allowed the last hopes for peace and freedom of millions of people to be suffocated by the forces of totalitarianism. And so tonight—to you, the great silent majority of my fellow Americans—I ask for your support.',
        context:
          'Delivered from the Oval Office, Nixon appealed directly over the heads of the anti-war movement to middle-class and working-class Americans, securing a 77% approval rating.',
        hingeQuestion:
          'How did Nixon use the concept of the "Silent Majority" to delegitimize the anti-war movement as an unrepresentative minority?',
      },
    },
    p6: {
      sourceA: {
        title: 'Source A: Henry Kissinger and Le Duc Tho in Secret Paris Negotiations',
        type: 'Press Photograph &bull; Keystone / Getty Archive',
        date: 'October 1972',
        image: getBase64Image('units/usa/assets/sources/kissinger-peace-talks.jpg'),
        quote: 'Kissinger and Le Duc Tho converse in a secluded villa outside Paris.',
        context:
          'Henry Kissinger and North Vietnamese politburo member Le Duc Tho meeting secretly at Gif-sur-Yvette near Paris. By late 1972, both sides were exhausted: the US was desperate to exit, while North Vietnam agreed to allow President Thieu to remain temporarily in power in Saigon.',
        hingeQuestion:
          'What diplomatic concessions did the United States make in 1972 that made the eventual fall of South Vietnam inevitable?',
      },
      sourceB: {
        isWritten: true,
        title: 'Source B: South Vietnamese President Nguyen Van Thieu on the Paris Accords',
        type: 'Official Presidential Address to the ARVN &bull; Saigon Radio Broadcast',
        date: '28 January 1973',
        quote:
          'The United States has signed an agreement that leaves 150,000 North Vietnamese communist soldiers stationed on our sovereign soil. We have been forced to accept an agreement that signs the death warrant of South Vietnam. The Americans have taken their prisoners and gone home, washing their hands of us.',
        context:
          'President Nguyen Van Thieu bitterly addressing his generals following intense pressure from President Nixon to sign the Paris Peace Accords under threat of complete aid cutoff.',
        hingeQuestion:
          'Why did the terms of the Paris Peace Accords leave the South Vietnamese government convinced that the United States had betrayed them?',
      },
    },
    p8: {
      sourceA: {
        title: 'Source A: US Infantrymen Bogged Down in Muddy Rice Paddies',
        type: 'Combat Photograph &bull; US Army Signal Corps / National Archives',
        date: 'c. 1968',
        image: getBase64Image('units/usa/assets/sources/us-troops-bogged-down.jpg'),
        quote: 'Exhausted American infantry wade through waist-deep mud in the Mekong Delta.',
        context:
          'American soldiers struggling through swampy rice paddies laden with 30kg field packs under blistering tropical heat. Conventional mechanized doctrine proved useless in terrain where heavy tanks and armored personnel carriers were completely immobilized.',
        hingeQuestion:
          "How did Vietnam's challenging topography and tropical climate undermine the technological advantages of the US military?",
      },
      sourceB: {
        isWritten: true,
        title: 'Source B: General Van Tien Dung on the Liberation of Saigon (1975)',
        type: 'North Vietnamese PAVN High Command Memoir &bull; Military History Record',
        date: 'May 1975',
        quote:
          'Our tanks smashed through the iron gates of the Independence Palace in Saigon. The puppet regime dissolved like salt in water. The total victory of our people was not won simply by weapons, but by thirty years of unbroken struggle, sacrifice, and the absolute conviction that our nation could never remain divided by imperialist aggression.',
        context:
          'General Van Tien Dung, commander of the Ho Chi Minh Campaign that captured Saigon on 30 April 1975, reflecting on the rapid military collapse of South Vietnam once US air support was terminated.',
        hingeQuestion:
          'To what extent was the rapid collapse of South Vietnam in 1975 the result of political illegitimacy rather than military inferiority?',
      },
    },
  };

  const leftVocab = {
    p2: [
      {
        term: 'Living Room War:',
        def: 'The phenomenon whereby uncensored, graphic television news brought the violent reality of combat and body bags directly into American homes.',
      },
      {
        term: 'Credibility Gap:',
        def: 'The growing chasm between optimistic official government statements and the bleak, bloody reality reported by journalists on the ground.',
      },
      {
        term: 'My Lai Massacre (1968):',
        def: 'The mass murder of up to 504 unarmed South Vietnamese civilians by US soldiers of Charlie Company, shocking the conscience of the nation.',
      },
      {
        term: 'Kent State Shootings (1970):',
        def: 'The killing of four unarmed university students by Ohio National Guardsmen during protests against the invasion of Cambodia.',
      },
      {
        term: 'Pentagon Papers (1971):',
        def: 'Leaked top-secret Department of Defense study revealing that successive administrations had systematically lied to Congress and the public.',
      },
    ],
    p4: [
      {
        term: 'Silent Majority:',
        def: "The large segment of middle-class and working-class Americans who supported Nixon's war policies and opposed radical student counterculture.",
      },
      {
        term: 'Hard Hat Riot (1970):',
        def: 'Violent confrontation in New York City where construction workers assaulted anti-war students, demonstrating blue-collar patriotic support for the war.',
      },
      {
        term: 'Invasion of Cambodia (1970):',
        def: 'Cross-border ground military incursion ordered by Nixon to destroy North Vietnamese sanctuaries, sparking nationwide university shutdowns.',
      },
      {
        term: 'George McGovern:',
        def: 'Anti-war Democratic senator defeated in a historic 49-state landslide by Nixon in 1972 on a platform of immediate Vietnam withdrawal.',
      },
      {
        term: 'Counterculture:',
        def: '1960s youth movement rejecting traditional social norms, consumerism, and the war, embracing rock music, communal living, and pacifism.',
      },
    ],
    p6: [
      {
        term: 'Paris Peace Accords (1973):',
        def: 'Peace agreement between the US, North Vietnam, South Vietnam, and Vietcong that ended direct US combat involvement and repatriated POWs.',
      },
      {
        term: 'Christmas Bombings (1972):',
        def: 'Operation Linebacker II; eleven days of relentless B-52 carpet bombing of Hanoi and Haiphong that forced North Vietnam to sign the accords.',
      },
      {
        term: 'War Powers Act (1973):',
        def: "Federal law enacted over Nixon's veto requiring the president to notify Congress within 48 hours of deploying troops and limiting deployments to 60 days.",
      },
      {
        term: 'Fall of Saigon (1975):',
        def: "The capture of South Vietnam's capital by North Vietnamese forces on 30 April 1975, completing the communist reunification of Vietnam.",
      },
      {
        term: 'Operation Frequent Wind:',
        def: "The emergency helicopter evacuation of over 7,000 Americans and South Vietnamese from Saigon during the city's final collapse.",
      },
    ],
    p8: [
      {
        term: 'Asymmetric Warfare:',
        def: 'Conflict where a weaker force uses unconventional guerrilla tactics, tunnels, and popular support to neutralize a technologically superior enemy.',
      },
      {
        term: 'Vietnam Syndrome:',
        def: 'The enduring reluctance of the American public and politicians to deploy US ground military forces abroad for fear of another unwinnable quagmire.',
      },
      {
        term: 'Nguyen Van Thieu:',
        def: 'President of South Vietnam from 1967 to 1975 whose regime collapsed within weeks once US military and financial aid was terminated.',
      },
      {
        term: 'Watergate Scandal:',
        def: "Political scandal involving Nixon administration break-ins and cover-ups that forced Nixon's resignation in 1974, paralyzing US foreign policy.",
      },
      {
        term: 'Socialist Republic of Vietnam:',
        def: "The unified communist state proclaimed in 1976 following North Vietnam's military victory, with Saigon renamed Ho Chi Minh City.",
      },
    ],
  };

  /**
   * Curated Christine Counsell 4-Act Narrative Enquiries (Strict Word Budget & Layout Balanced)
   */
  const narratives = {
    enquiry1: {
      act1: {
        title: 'Act 1: The "Living Room War" & The Deepening Credibility Gap',
        text: `**The Television Revolution and Uncensored Combat:** Vietnam was the first televised war in human history. Every evening, thirty million American households watched graphic colour footage on network news broadcasts: soldiers firing M16s into dense tree lines, wounded infantrymen screaming on stretchers, and body bags being loaded onto helicopters. Unlike World War II, there was no official military censorship. Journalists like Morley Safer accompanied troops into combat; in August 1965, Safer broadcast footage of Marines burning thatched civilian huts with Zippo lighters in the village of Cam Ne, outraging President Johnson.

**The Chasm of the Credibility Gap:** As casualty tolls climbed past 30,000 dead, public confidence in the federal government collapsed. The Johnson administration repeatedly assured the public that the war was being won, issuing inflated enemy "body counts" and optimistic progress reports. However, journalists on the ground exposed a grim reality of stalemate, confusion, and corruption. This profound divergence between official White House claims and visual television truth created the "credibility gap", permanently eroding public trust in the presidency and the military establishment.`,
      },
      act2: {
        title: 'Act 2: Conscription, Injustice & The Rebellion Against the Draft',
        text: `**A Deeply Discriminatory Draft System:** Opposition to the war was intensely concentrated around the military draft (Selective Service). Between 1965 and 1973, over two million young men were conscripted. The draft system was rife with socioeconomic bias: middle-class and wealthy youths secured college deferments, joined the safe National Guard, or obtained sympathetic doctor's notes for minor physical ailments. Consequently, the burden of jungle combat fell disproportionately upon poor, working-class, and minority youths. African Americans made up roughly 11% of the US population but accounted for over 20% of combat deaths in the early war years.

**Mass Resistance and the Anti-War Vanguard:** In response, draft resistance erupted across the nation. Young men staged mass rallies to publicly burn their draft registration cards, while thousands fled to Canada or Sweden. Heavyweight boxing champion Muhammad Ali refused induction in 1967 on religious and racial grounds, famously declaring: "I ain't got no quarrel with them Vietcong; no Vietcong ever called me nigger." In December 1969, Nixon introduced a televised draft lottery, but rather than placating students, it provoked even broader panic and protest as young men discovered their fate drawn live on national television.`,
      },
      act3: {
        title: 'Act 3: Moral Catastrophe at My Lai & The Court-Martial of Calley',
        text: `**The Slaughter at Son My (16 March 1968):** On the morning of 16 March 1968, Charlie Company of the 11th Infantry Brigade landed in the village of Son My (My Lai hamlet). Angered by heavy booby-trap casualties and briefed that the village was a Vietcong stronghold, soldiers found only unarmed women, children, and elderly men preparing breakfast. Under the direct orders of Lieutenant William Calley, American troops spent four hours systematically slaughtering up to 504 unarmed civilians, herding families into ditches and executing them, raping girls, and slaughtering livestock. The massacre was halted only when helicopter pilot Hugh Thompson landed between the soldiers and villagers, threatening to open fire on his fellow Americans.

**Exposure and the Shattering of Moral Authority:** Military brass buried reports of the atrocity for twenty months. In November 1969, investigative journalist Seymour Hersh broke the story, accompanied by horrifying photographs taken by army photographer Ronald Haeberle showing corpses piled in ditches. The revelations shattered the cherished myth of American moral exceptionalism. In March 1971, Calley was convicted of premeditated murder and sentenced to life imprisonment, but President Nixon quickly reduced his sentence to three years of house arrest, further outraging the anti-war movement.`,
      },
      act4: {
        title: 'Act 4: The Historical Verdict: Kent State & The Campus Shutdown',
        text: `**The Incursion into Cambodia and the Kent State Tragedy:** On 30 April 1970, President Nixon announced that US and ARVN forces were invading neutral Cambodia to destroy North Vietnamese sanctuaries. The announcement sparked massive outrage among students who felt betrayed by Nixon's withdrawal promises. On 4 May 1970, at Kent State University in Ohio, after three days of tense protests and the burning of the campus ROTC building, twenty-eight Ohio National Guardsmen suddenly turned and fired 67 rifle rounds into an unarmed crowd of student demonstrators, killing four students and wounding nine others.

**A Nation in Revolt:** John Filo's Pulitzer Prize-winning photograph of fourteen-year-old runaway Mary Ann Vecchio screaming over the lifeless body of student Jeffrey Miller became the defining icon of domestic trauma. Ten days later, police opened fire at Jackson State College in Mississippi, killing two Black students. In the aftermath, over four million students staged nationwide strikes, shutting down more than 450 universities and colleges. The anti-war movement had grown from an idealistic fringe into an unstoppable mass movement that made the indefinite continuation of the war politically impossible.`,
      },
    },

    enquiry2: {
      act1: {
        title: 'Act 1: The Patriotic Bastion: Anti-Communism & Middle America',
        text: `**The Enduring Power of Cold War Patriotism:** Despite the visibility of university protests, a substantial portion of the American public continued to support the war effort throughout the late 1960s and early 1970s. For millions of conservative and middle-class citizens, opposing communism was an unquestioned moral duty rooted in the lessons of World War II and the Korean War. Veterans' organizations like the American Legion and the Veterans of Foreign Wars (VFW) organized patriotic rallies, arguing that American soldiers were fighting to defend freedom against ruthless totalitarian aggression and prevent the Domino Theory from unfolding across Asia.

**The Resentment of the Anti-War Counterculture:** Pro-war sentiment was fueled as much by cultural animosity as by foreign policy convictions. Working-class Americans who worked long hours in factories and mines deeply resented the student counterculture, viewing anti-war demonstrators as spoiled, unpatriotic, drug-taking elites who took advantage of college draft deferments while working-class sons shed blood in the jungle. Images of radicals waving Vietcong flags and chanting "Ho, Ho, Ho Chi Minh!" were viewed as a direct, treasonous insult to American soldiers dying in combat.`,
      },
      act2: {
        title: 'Act 2: Nixon & The Mobilization of the "Silent Majority"',
        text: `**The Historic Address of 3 November 1969:** Recognizing the deep cultural resentment brewing beneath the surface of American society, President Richard Nixon delivered one of the most effective televised speeches in modern political history. Addressing the nation from the Oval Office, Nixon explicitly framed the debate as a struggle between a vocal, radical minority of street demonstrators and the vast, patriotic populace that followed the law, paid taxes, and sent their children to church: *"And so tonight—to you, the great silent majority of my fellow Americans—I ask for your support."*

**A Triumphant Domestic Mandate:** Nixon's appeal was a political triumph. The White House switchboard was overwhelmed by tens of thousands of supportive telegrams and telephone calls, and Gallup polls recorded a staggering 77% approval rating for Nixon's Vietnam strategy. The concept of the "Silent Majority" became the central organizing weapon of conservative politics, transforming Middle America into a formidable electoral coalition and convincing Nixon that he possessed the domestic political mandate to withdraw ground troops while aggressively expanding aerial bombing.`,
      },
      act3: {
        title: 'Act 3: Blue-Collar Backlash: The Hard Hat Riots of 1970',
        text: `**The Eruption in Lower Manhattan (8 May 1970):** Four days after the Kent State shootings, roughly 1,000 anti-war high school and college students gathered near City Hall in Lower Manhattan to hold a solemn memorial vigil for the slain students. Suddenly, an organized brigade of roughly 200 construction workers in yellow hard hats, carrying American flags and heavy metal tools, charged into the unarmed crowd. Shouting patriotic slogans like "USA All the Way!" and "Love It or Leave It!", the workers brutally beat student protesters with wrenches, pipes, and fists while sympathetic city police officers largely looked on.

**The Alliance of Labor and the White House:** The violence escalated into the "Hard Hat Riot", spilling into Pace University and surrounding streets, leaving over 70 people injured. Far from condemning the assault, blue-collar unions staged massive pro-war parades involving over 100,000 workers through New York City two weeks later. Nixon capitalized immediately on the event, inviting New York union leader Peter Brennan to the White House and appointing him Secretary of Labor. The Hard Hat Riot symbolized a seismic realignment in American politics: working-class union voters, traditionally the backbone of Roosevelt's Democratic coalition, defected to the Republican Party.`,
      },
      act4: {
        title: 'Act 4: The Historical Verdict: The Fractured American Soul',
        text: `**The Landslide of 1972:** The political power of the Silent Majority was demonstrated conclusively in the presidential election of November 1972. The Democratic Party nominated Senator George McGovern, a staunch anti-war liberal who campaigned on the promise of immediate troop withdrawal and amnesty for draft evaders. Nixon and the Republicans successfully branded McGovern as the candidate of "Acid, Amnesty, and Abortion", winning an unprecedented 49-state landslide victory with over 60% of the popular vote, carrying every single state except Massachusetts and Washington, D.C.

**A Permanently Polarized Nation:** While Nixon's victory proved that a decisive majority of Americans supported his search for "peace with honor", the domestic battle over Vietnam left the American nation permanently scarred. The war destroyed the post-World War II bipartisan consensus in foreign policy, unleashed bitter culture wars between cosmopolitan progressives and traditionalist conservatives, and fostered an enduring cynicism toward national institutions that would define American political life for decades to come.`,
      },
    },

    enquiry3: {
      act1: {
        title: 'Act 1: Secret Diplomacy in Paris: Kissinger & Le Duc Tho',
        text: `**The Secret Channel (1969–1972):** While public peace negotiations dragged on fruitlessly in Paris under the glare of international media, the real diplomatic breakthrough occurred behind closed doors. Beginning in August 1969, National Security Advisor Henry Kissinger conducted clandestine meetings in private Parisian apartments with North Vietnamese Politburo member Le Duc Tho. The negotiations were grueling and hostile: Hanoi insisted that any peace deal must remove South Vietnamese President Nguyen Van Thieu, while Washington demanded the total withdrawal of North Vietnamese combat troops from the South.

**The Crucial Concession of October 1972:** By the autumn of 1972, both superpowers faced acute exhaustion. North Vietnam had suffered catastrophic casualties during the failed Easter Offensive, while Nixon was under intense congressional pressure to end the war. In October 1972, Kissinger made the fatal concession that broke the deadlock: the United States agreed that 150,000 North Vietnamese regular troops (PAVN) could remain in their positions inside South Vietnam after the American withdrawal. In return, Hanoi agreed that Thieu could temporarily remain in power in Saigon. Kissinger triumphantly announced: "Peace is at hand."`,
      },
      act2: {
        title: 'Act 2: Operation Linebacker II: The Christmas Bombings',
        text: `**Thieu\'s Refusal and Diplomatic Collapse:** When Kissinger presented the draft treaty to President Thieu in Saigon, the South Vietnamese leader burst into tears of fury, correctly recognizing that leaving 150,000 communist troops inside his country was a death sentence for South Vietnam. Thieu demanded 69 substantive revisions to the treaty. Emboldened by American hesitation, Le Duc Tho walked out of the Paris talks in December 1972, accusing Washington of bad faith.

**The Christmas Bombings (18–29 December 1972):** Furious at Hanoi and determined to force Thieu into compliance, Nixon ordered Operation Linebacker II: the most ferocious aerial assault of the entire war. For eleven days over Christmas, waves of B-52 Stratofortress bombers dropped over 20,000 tons of ordnance on Hanoi and Haiphong, pulverizing rail yards, power stations, and residential districts, causing over 1,600 civilian deaths. While international outrage was deafening, the bombing compelled Hanoi to resume talks, while Nixon privately threatened Thieu that if he did not sign the agreement, the US would sign alone and cut off all aid.`,
      },
      act3: {
        title: 'Act 3: The Paris Peace Accords: The Terms of American Exit',
        text: `**Signing the Accords (27 January 1973):** On 27 January 1973, the foreign ministers of the United States, North Vietnam, South Vietnam, and the Vietcong formally signed the Paris Peace Accords at the Hotel Majestic. The treaty mandated an immediate ceasefire in place, the complete withdrawal of all remaining US combat troops and advisors within sixty days, the dismantling of all US military bases, and the repatriation of all prisoners of war (POWs). In exchange, North Vietnam promised to return 591 American POWs and respect the territorial integrity of South Vietnam pending free democratic elections.

**The Departure of US Combat Forces:** On 29 March 1973, the last American combat troops boarded transport aircraft at Tan Son Nhut airport, bringing direct US military involvement in Vietnam to an official end. For the United States, the nightmare of ground combat had ended; 591 American prisoners, including future senator John McCain, stepped onto American soil to emotional national celebrations. However, the underlying reality was tragic: the treaty left North Vietnam in an overwhelmingly dominant military position inside South Vietnam, with no effective enforcement mechanism.`,
      },
      act4: {
        title: 'Act 4: The Historical Verdict: The Illusion of "A Decent Interval"',
        text: `**The "Decent Interval" Strategy:** Declassified White House tapes have since confirmed what historians long suspected: Nixon and Kissinger never believed South Vietnam could survive independently under the terms of the Paris Peace Accords. Their primary strategic goal was to achieve a "decent interval"—a politically acceptable buffer of one or two years between American military withdrawal and Saigon's inevitable collapse—allowing Washington to avoid the catastrophic humiliation of direct military defeat while securing the return of American POWs.

**Congress and the Shackling of Presidential Power:** Nixon had privately promised Thieu that if North Vietnam violated the ceasefire, the US would respond with overwhelming air strikes. However, this guarantee was completely nullified by domestic events. The burgeoning Watergate scandal destroyed Nixon's political authority, forcing his resignation in August 1974. Furthermore, in November 1973, Congress passed the War Powers Act over Nixon's veto, severely curtailing executive authority to commit troops overseas. When Congress subsequently slashed financial and military aid to Saigon by 50%, South Vietnam was left entirely defenseless.`,
      },
    },

    enquiry4: {
      act1: {
        title: 'Act 1: The Final Cataclysm: The Spring Offensive of 1975',
        text: `**The Abandonment of South Vietnam:** By late 1974, South Vietnam was suffering severe economic and military collapse. The cutoff of American subsidies caused runaway inflation, fuel shortages, and a desperate lack of ammunition; ARVN artillery batteries were rationed to just three shells per gun per day, and transport trucks were immobilized for lack of spare parts. Sensing total American impotence, North Vietnamese military chief General Van Tien Dung planned a multi-year campaign to conquer the South by 1976.

**The "Convoy of Tears" (March 1975):** In March 1975, PAVN forces launched a massive surprise armored offensive, capturing the strategic Central Highlands city of Ban Me Thuot in just three days. In a catastrophic panic, President Thieu ordered an immediate, disorderly retreat to consolidate forces along the coast. The retreat degenerated into absolute chaos: over 200,000 ARVN soldiers and a million civilian refugees jammed coastal highways under relentless communist artillery fire in the infamous "Convoy of Tears". Within weeks, Hue and Da Nang fell without a fight; the South Vietnamese military had effectively dissolved.`,
      },
      act2: {
        title: 'Act 2: Operation Frequent Wind & The Fall of Saigon (30 April 1975)',
        text: `**The Final Days of Saigon:** By late April 1975, eighteen North Vietnamese divisions surrounded the doomed capital of Saigon. President Thieu resigned on 21 April, bitterly denouncing the United States on television for abandoning an ally before fleeing into exile. As communist artillery shells rained down on Tan Son Nhut air base, the US military launched Operation Frequent Wind: the largest helicopter evacuation in history. Over two days, American helicopters evacuated over 7,000 American personnel and vulnerable South Vietnamese from the roof of the US Embassy and CIA safe houses to aircraft carriers offshore.

**Tanks at the Independence Palace:** On the morning of 30 April 1975, North Vietnamese T-54 tank Number 843 crashed through the wrought-iron ornamental gates of the Presidential Palace in Saigon. A soldier ran to the roof and unfurled the red, blue, and gold flag of the National Liberation Front. Inside, South Vietnam's final president, Duong Van Minh, surrendered unconditionally, stating: "I have been waiting since early morning to transfer the government to you." The victorious North Vietnamese officer replied bluntly: "You cannot transfer what you do not have." The Vietnam War was officially over; Saigon was renamed Ho Chi Minh City.`,
      },
      act3: {
        title: 'Act 3: The Fourfold Synthesis of American Defeat',
        text: `**The Inadequacy of Technological Power:** The catastrophic failure of the United States in Vietnam was the synthesis of four decisive factors: First, **Vietnamese Revolutionary Nationalism:** The Vietcong and North Vietnamese were fighting an existential anti-colonial war for national survival, inspired by Ho Chi Minh and prepared to sacrifice millions of lives to outlast a foreign invader. Second, **Military and Tactical Inadequacy:** The US military relied on conventional attrition, search and destroy sweeps, and heavy carpet bombing, which alienated the rural peasantry and completely failed to neutralize asymmetric guerrilla tunnel networks and jungle supply trails.

**Political Illegitimacy and Domestic Collapse:** Third, **The Illegitimacy of the Saigon Regime:** The South Vietnamese government was an artificial American creation, crippled by nepotism, corruption, and military juntas that never commanded popular loyalty. Fourth, **The Collapse of the American Home Front:** The draft, rising casualty counts, graphic uncensored television coverage, and moral atrocities like My Lai destroyed the domestic political will required to sustain an open-ended war, forcing the political establishment to withdraw under intense public opposition.`,
      },
      act4: {
        title: 'Act 4: The Historical Verdict: The Traumatic Legacy of Defeat',
        text: `**The Human and Physical Cost:** The Vietnam War exacted an appalling toll. Over 58,220 American soldiers died and more than 300,000 were wounded, with hundreds of thousands suffering from lifelong physical disabilities and Post-Traumatic Stress Disorder (PTSD). For the Vietnamese people, the catastrophe was apocalyptic: between two and three million Vietnamese civilians and combatants were killed, large swaths of the country were poisoned by Agent Orange, and millions of unexploded cluster munitions contaminated agricultural land for generations.

**The "Vietnam Syndrome" and American Foreign Policy:** For the United States, the war shattered the myth of American military invincibility and moral righteousness. The trauma produced the "Vietnam Syndrome"—a profound, enduring reluctance among the American public and Congress to intervene in foreign civil conflicts without overwhelming force, clear exit strategies, and guaranteed public support. The heroic era of post-World War II global interventionism had come to a bitter, painful end in the smouldering ruins of Southeast Asia.`,
      },
    },
  };

  const backCoverData = {
    title: 'Key Topic 4 Master Synoptic Consolidation',
    timeline: [
      {
        date: '16 Mar 1968',
        title: 'The My Lai Massacre',
        body: 'Charlie Company slaughters over 500 unarmed Vietnamese civilians; Seymour Hersh exposes cover-up in late 1969.',
      },
      {
        date: '3 Nov 1969',
        title: 'Silent Majority Address',
        body: 'President Nixon appeals to conservative Middle America over the heads of protesters, securing 77% approval.',
      },
      {
        date: '4 May 1970',
        title: 'Kent State Shootings',
        body: 'Ohio National Guardsmen shoot dead four student anti-war protesters, triggering nationwide shutdowns of 450 campuses.',
      },
      {
        date: '27 Jan 1973',
        title: 'Paris Peace Accords Signed',
        body: 'Direct US military involvement ends; all American combat troops depart Vietnam within 60 days.',
      },
      {
        date: '7 Nov 1973',
        title: 'War Powers Act Passed',
        body: "Congress overrides Nixon's veto to strictly restrict presidential authority to commit troops overseas without approval.",
      },
      {
        date: '30 Apr 1975',
        title: 'The Fall of Saigon',
        body: 'North Vietnamese tanks smash the gates of the Presidential Palace, reunifying Vietnam and renaming the capital Ho Chi Minh City.',
      },
    ],
    pillars: [
      {
        title: 'I. The Living Room War & Moral Outrage',
        body: 'Uncensored television broadcasts brought combat carnage into thirty million homes, widening the credibility gap. Flashpoints like the My Lai massacre and Kent State shootings shattered the moral legitimacy of the military intervention.',
      },
      {
        title: 'II. The Silent Majority & Class Polarization',
        body: "Nixon mobilized Middle America and blue-collar workers against privileged college anti-war protesters, culminating in the 1970 Hard Hat Riots and Nixon's historic 49-state landslide re-election victory in November 1972.",
      },
      {
        title: 'III. Flawed Diplomacy & "A Decent Interval"',
        body: "Kissinger and Le Duc Tho negotiated the 1973 Paris Peace Accords, allowing 150,000 North Vietnamese troops to remain in the South. The agreement was an American exit strategy designed to provide a decent interval before Saigon's collapse.",
      },
      {
        title: 'IV. The Fall of Saigon & The Vietnam Syndrome',
        body: 'Crippled by congressional aid cuts and Watergate, South Vietnam collapsed in 55 days during the 1975 Spring Offensive. The war produced the enduring Vietnam Syndrome, shattering domestic faith in foreign military interventions.',
      },
    ],
    historiographyDebate: {
      interp1: {
        title:
          'Interpretation 1: The Primacy of the Domestic Anti-War Movement (Christian G. Appy)',
        text: '"The Vietnam War was lost on the domestic front. The courageous resistance of students, civil rights leaders, and returning veterans, amplified by uncensored television coverage and moral atrocities like My Lai, made it politically impossible for Washington to sustain military operations."',
      },
      interp2: {
        title:
          'Interpretation 2: The Decisive Force of Revolutionary Nationalism (Marilyn B. Young)',
        text: '"The United States was defeated by the unyielding resolve of Vietnamese nationalism. No amount of American carpet bombing or domestic political unity could have sustained an illegitimate, corrupt Saigon regime against a dedicated population fighting an anti-colonial war for independence."',
      },
    },
    verdicts: [
      {
        title: 'The Dissolution of Domestic Consensus:',
        body: 'Vietnam permanently shattered the post-World War II bipartisan consensus in American foreign policy, establishing an enduring credibility gap between the public and government while entrenching deep cultural and political polarization.',
      },
      {
        title: 'The Cynicism of the Paris Accords:',
        body: 'The 1973 Paris Peace Accords served merely to disguise American disengagement and secure POW repatriation, knowingly leaving South Vietnam militarily defenseless against inevitable North Vietnamese conquest.',
      },
      {
        title: 'The Enduring "Vietnam Syndrome":',
        body: 'The loss of 58,220 American lives and the apocalyptic destruction of Indochina permanently restrained American imperial power, leaving the public and Congress deeply averse to open-ended foreign military interventions.',
      },
    ],
    quizzes: [
      {
        num: 'KT 4.1',
        title: 'Opposition: Media & My Lai',
        url: 'https://the-history-revision-hub.netlify.app/?unit=usa&quiz=kt4_1',
      },
      {
        num: 'KT 4.2',
        title: 'The Silent Majority',
        url: 'https://the-history-revision-hub.netlify.app/?unit=usa&quiz=kt4_2',
      },
      {
        num: 'KT 4.3',
        title: 'Peace & Fall of Saigon',
        url: 'https://the-history-revision-hub.netlify.app/?unit=usa&quiz=kt4_3',
      },
      {
        num: 'KT 4.4',
        title: 'Why the US Failed',
        url: 'https://the-history-revision-hub.netlify.app/?unit=usa&quiz=kt4_4',
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
