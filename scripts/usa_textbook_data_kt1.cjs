/**
 * scripts/usa_textbook_data_kt1.cjs
 *
 * Component bank, primary sources, vocabulary, curated 4-Act narratives, and back-cover data for
 * Key Topic 1: The Development of the Civil Rights Movement, 1954–60
 * Pearson Edexcel GCSE (9–1) History • Option 33 (1HI0/33)
 */

module.exports = function getKt1Data(helpers) {
  const { getBase64Image } = helpers;

  const coverConfig = {
    ktId: 'KT1',
    topicNumber: 1,
    title: 'The Development of the Civil Rights Movement, 1954–60',
    subtitle:
      'Pearson Edexcel GCSE (9–1) History &bull; Paper 3 Option 33 (1HI0/33) &bull; Key Topic 1 Synthesis',
    enquiry:
      'How did grassroots courage, landmark legal rulings, and non-violent direct action dismantle the constitutional pillars of Southern segregation between 1954 and 1960?',
    coverImage: 'airborne-little-rock-patrol.jpg',
    caption:
      'Plate I: Soldiers of the 101st Airborne Division escort the Little Rock Nine into Central High School, Arkansas (September 1957).',
    specTopics: [
      {
        num: 1,
        title: '1. Position of Black Americans (1950s)',
        bullets: [
          'De jure segregation under Southern Jim Crow laws and daily racial discrimination.',
          'Systematic voter disenfranchisement: poll taxes, impossible literacy tests, and KKK terror.',
          'Legal and direct action strategies: NAACP litigation versus early CORE challenges.',
        ],
      },
      {
        num: 2,
        title: '2. Developments in Education (1954–57)',
        bullets: [
          'Brown v. Topeka (1954): NAACP legal strategy, Chief Justice Earl Warren, and 9–0 verdict.',
          'Southern resistance to desegregation: the Southern Manifesto and White Citizens’ Councils.',
          'Little Rock Central High (1957): Governor Faubus, Elizabeth Eckford, and Eisenhower’s intervention.',
        ],
      },
      {
        num: 3,
        title: '3. Montgomery Bus Boycott (1955–60)',
        bullets: [
          'Arrest of Rosa Parks (1 Dec 1955), Jo Ann Robinson, and Women’s Political Council leaflets.',
          '381 days of mass non-violence: 300-car pool network and charismatic leadership of Dr Martin Luther King Jr.',
          'Browder v. Gayle Supreme Court ruling (Nov 1956), founding of SCLC (1957), and the 1957 Civil Rights Act.',
        ],
      },
      {
        num: 4,
        title: '4. White Resistance in the Deep South',
        bullets: [
          'White supremacist terror: Ku Klux Klan lynchings, cross-burnings, and the murder of Emmett Till (1955).',
          'Political resistance: Southern Manifesto signed by 101 congressmen urging state nullification.',
          'Economic retaliation: White Citizens’ Councils using evictions, mortgage cancellations, and job dismissals.',
        ],
      },
    ],
  };

  const USA_COMPONENT_BANK = {
    // Page 3: KT 1.1 (Position of Black Americans in the early 1950s)
    p3: {
      keyFigure: {
        name: 'Thurgood Marshall',
        lifespan: '1908–1993',
        role: 'Chief Counsel of the NAACP Legal Defense Fund',
        significance:
          'Masterminded the incremental constitutional litigation strategy that destroyed the legal foundation of "separate but equal".',
        actions: [
          'Argued 32 civil rights cases before the US Supreme Court, securing victory in 29 landmark rulings.',
          'Pioneered the sociological argument that segregated education inflicted irreparable psychological harm on Black children.',
          'Persuaded the unanimous Supreme Court to strike down school segregation in Brown v. Board of Education (1954).',
        ],
        image: getBase64Image('units/usa/assets/sources/portraits/thurgood_marshall.jpg'),
      },
      conceptSpotlight: `
        <div class="concept-spotlight-box">
          <div class="csb-header">
            <span class="csb-tag">CONSTITUTIONAL MECHANISM: 14TH AMENDMENT</span>
            <span class="csb-category">FEDERAL JURISPRUDENCE &bull; 1954</span>
          </div>
          <h4 class="csb-title">The Equal Protection Clause vs. Jim Crow States’ Rights</h4>
          <div class="csb-body">
            Southern states maintained racial apartheid through the 1896 doctrine of <em>"separate but equal"</em> (Plessy v. Ferguson), claiming states possessed constitutional authority over public welfare. The NAACP challenged this by weaponizing the <strong>14th Amendment’s Equal Protection Clause</strong> (1868), which forbids any state from denying equal protection of the laws to any citizen. By proving that segregated facilities were inherently unequal, civil rights lawyers established that state Jim Crow statutes were unconstitutional federal violations.
          </div>
          <div class="csb-takeaway">
            <strong>Strategic Legacy:</strong> The 14th Amendment provided the federal judiciary with the legal authority to overrule Southern state sovereignty, transforming desegregation from a regional political dispute into an enforceable constitutional mandate.
          </div>
        </div>
      `,
      timeline: [
        {
          date: '1896',
          title: 'Plessy v. Ferguson',
          text: 'Supreme Court legalizes segregation under "separate but equal" doctrine.',
        },
        {
          date: '1909',
          title: 'NAACP Founded',
          text: 'W.E.B. Du Bois and civil rights activists establish litigation campaign against Jim Crow.',
        },
        {
          date: '1942',
          title: 'CORE Established',
          text: 'James Farmer founds Congress of Racial Equality to pioneer non-violent direct action.',
        },
        {
          date: '1948',
          title: 'Executive Order 9981',
          text: 'President Truman orders the desegregation of the US Armed Forces.',
        },
      ],
    },

    // Page 5: KT 1.2 (Developments in education: Brown v. Topeka & Little Rock)
    p5: {
      keyFigure: {
        name: 'Chief Justice Earl Warren',
        lifespan: '1891–1974',
        role: 'Chief Justice of the United States Supreme Court (1953–1969)',
        significance:
          'Unified a divided Supreme Court to deliver an unassailable 9–0 decision outlawing racial segregation in public schools.',
        actions: [
          'Lobbied skeptical associate justices behind closed doors to achieve an unprecedented unanimous 9–0 consensus.',
          'Authored the historic Brown ruling, famously declaring: "In the field of public education, the doctrine of \'separate but equal\' has no place."',
          'Upheld federal judicial supremacy over state governors defying court desegregation orders in Cooper v. Aaron (1958).',
        ],
        image: getBase64Image('units/usa/assets/sources/portraits/earl_warren.jpg'),
      },
      conceptSpotlight: `
        <div class="concept-spotlight-box">
          <div class="csb-header">
            <span class="csb-tag">EXECUTIVE CONSTITUTIONAL MECHANISM</span>
            <span class="csb-category">PRESIDENTIAL AUTHORITY &bull; 1957</span>
          </div>
          <h4 class="csb-title">Executive Order 10730 &amp; Federal Military Supremacy</h4>
          <div class="csb-body">
            When Arkansas Governor Orval Faubus deployed the Arkansas National Guard to block nine Black students from entering Little Rock Central High, he asserted state nullification over federal court authority. President Dwight D. Eisenhower responded with <strong>Executive Order 10730</strong>: he federalized the Arkansas National Guard (removing them from Faubus's command) and dispatched 1,200 elite paratroopers of the <strong>101st Airborne Division</strong> to Little Rock. Armed soldiers escorted Black pupils past screaming white mobs with fixed bayonets.
          </div>
          <div class="csb-takeaway">
            <strong>Strategic Legacy:</strong> Eisenhower demonstrated that the federal government would deploy direct military force to crush armed state-level defiance against constitutional court rulings, setting an irreversible precedent of federal supremacy.
          </div>
        </div>
      `,
      timeline: [
        {
          date: '17 May 1954',
          title: 'Brown v. Topeka Ruling',
          text: 'Supreme Court unanimously declares segregated schools unconstitutional.',
        },
        {
          date: '31 May 1955',
          title: 'Brown II Ruling',
          text: 'Court orders desegregation to proceed with "all deliberate speed", enabling Southern delay.',
        },
        {
          date: '4 Sept 1957',
          title: 'Little Rock Mob Violence',
          text: 'Governor Faubus deploys National Guard; Elizabeth Eckford faces angry mob alone.',
        },
        {
          date: '24 Sept 1957',
          title: '101st Airborne Deployed',
          text: 'Eisenhower federalizes Arkansas Guard and deploys federal troops to enforce integration.',
        },
      ],
    },

    // Page 7: KT 1.3 (Montgomery Bus Boycott)
    p7: {
      keyFigure: {
        name: 'Rosa Parks & Jo Ann Robinson',
        lifespan: '1913–2005 &bull; 1912–1992',
        role: 'NAACP Activist & President of the Women’s Political Council (WPC)',
        significance:
          'Transformed individual resistance into a methodically planned 381-day community boycott that crippled city transit revenues.',
        actions: [
          'Parks calmly refused to surrender her municipal bus seat to a white passenger on 1 December 1955, providing the ideal legal test case.',
          'Robinson mimeographed and distributed 35,000 protest leaflets overnight, mobilizing the entire Black community within 48 hours.',
          'Organized the 300-car pool network that sustained daily transport for 40,000 citizens until the Supreme Court outlawed bus segregation.',
        ],
        image: getBase64Image('units/usa/assets/sources/portraits/rosa_parks.jpg'),
      },
      conceptSpotlight: `
        <div class="concept-spotlight-box">
          <div class="csb-header">
            <span class="csb-tag">DISCIPLINARY CATALYST: ECONOMIC ATTRITION</span>
            <span class="csb-category">CIVIC BOYCOTT &bull; 1955–1956</span>
          </div>
          <h4 class="csb-title">Grassroots Economic Power &amp; Browder v. Gayle</h4>
          <div class="csb-body">
            Black citizens comprised over 70% of Montgomery bus passengers. By maintaining total boycott discipline for 381 days, the community deprived the bus company of hundreds of thousands of dollars in revenue. However, municipal authorities refused to compromise out of segregationist ideology. Victory was achieved when attorney Fred Gray filed a federal lawsuit on behalf of Aurelia Browder. In <strong>Browder v. Gayle</strong> (November 1956), the US Supreme Court ruled that Alabama state bus segregation laws violated the 14th Amendment.
          </div>
          <div class="csb-takeaway">
            <strong>Strategic Legacy:</strong> Economic boycotts demonstrated immense collective moral power, but permanent institutional desegregation required binding federal judicial intervention to compel recalcitrant Southern municipalities to comply.
          </div>
        </div>
      `,
      timeline: [
        {
          date: '1 Dec 1955',
          title: 'Rosa Parks Arrested',
          text: "Parks refuses to yield bus seat; Women's Political Council mimeographs 35,000 boycott leaflets.",
        },
        {
          date: '5 Dec 1955',
          title: 'MIA Formed & MLK Elected',
          text: 'Dr King addresses 5,000 citizens at Holt Street Baptist Church, launching 381-day boycott.',
        },
        {
          date: '5 June 1956',
          title: 'Federal Court Ruling',
          text: 'District court in Browder v. Gayle strikes down bus segregation; city appeals to Supreme Court.',
        },
        {
          date: '21 Dec 1956',
          title: 'Montgomery Buses Integrated',
          text: 'Supreme Court affirms Browder ruling; King and MIA leaders board desegregated buses.',
        },
      ],
    },

    // Page 9: KT 1.4 (Southern White Resistance & Emmett Till)
    p9: {
      keyFigure: {
        name: 'Governor Orval Faubus',
        lifespan: '1910–1994',
        role: 'Democratic Governor of Arkansas (1955–1967)',
        significance:
          'Became the national symbol of Southern "Massive Resistance" by using state militia to defy federal court desegregation orders.',
        actions: [
          'Ordered the Arkansas National Guard on 2 September 1957 to surround Central High and block nine Black students from entering.',
          "Exploited racial hysteria to secure re-election, branding federal integration orders an unconstitutional violation of states' rights.",
          'Closed all Little Rock public high schools throughout the 1958–59 school year ("The Lost Year") to prevent integrated education.',
        ],
        image: getBase64Image('units/usa/assets/sources/portraits/orval_faubus.jpg'),
      },
      conceptSpotlight: `
        <div class="concept-spotlight-box">
          <div class="csb-header">
            <span class="csb-tag">SYSTEMIC REPRESSION: ECONOMIC COERCION</span>
            <span class="csb-category">MIDDLE-CLASS RESISTANCE &bull; 1954–1960</span>
          </div>
          <h4 class="csb-title">White Citizens’ Councils: The "Uptown Klan"</h4>
          <div class="csb-body">
            Founded in Mississippi in 1954 following the Brown decision, the <strong>White Citizens’ Councils</strong> enrolled over 250,000 middle-class bankers, merchants, landlords, and politicians. Rejecting the crude violence of the KKK, they waged sophisticated economic warfare against civil rights activists. Black applicants attempting to register to vote had their names published in local newspapers, triggering immediate dismissal from jobs, eviction from sharecropped land, and foreclosure of bank mortgages.
          </div>
          <div class="csb-takeaway">
            <strong>Strategic Legacy:</strong> Economic coercion was far more pervasive than physical terrorism, weaponizing the Southern financial and employment infrastructure to deter ordinary Black families from demanding their constitutional rights.
          </div>
        </div>
      `,
      timeline: [
        {
          date: 'July 1954',
          title: 'White Citizens’ Councils Formed',
          text: 'Middle-class white resistance mobilizes economic retaliation against integrationists.',
        },
        {
          date: 'Aug 1955',
          title: 'Murder of Emmett Till',
          text: '14-year-old Emmett Till lynched in Mississippi; all-white jury acquits killers in 67 minutes.',
        },
        {
          date: 'March 1956',
          title: 'The Southern Manifesto',
          text: '101 Southern congressmen pledge to use all lawful means to reverse the Brown decision.',
        },
        {
          date: 'Sept 1957',
          title: 'Civil Rights Act of 1957',
          text: 'First federal civil rights bill since 1875 passes after being heavily diluted by Dixiecrats.',
        },
      ],
    },
  };

  const leftSources = {
    p2: {
      sourceA: {
        title: 'Source A: Jim Crow Segregated Waiting Room Sign, Florida (c. 1950)',
        type: 'Archival Photograph &bull; Municipal Railway Station',
        date: 'c. 1950',
        image: getBase64Image('units/usa/assets/sources/colored-waiting-room-sign.jpg'),
        quote: 'COLORED WAITING ROOM &rarr;',
        context:
          'A municipal street sign directing Black travelers towards separate, segregated accommodations in Jacksonville, Florida. Under Southern Jim Crow laws, racial separation in railway stations, bus depots, restrooms, and drinking fountains was legally mandatory.',
        hingeQuestion:
          'Why did de jure segregation in everyday public transit facilities represent a cornerstone of white supremacist social control in the Southern states?',
      },
      sourceB: {
        isWritten: true,
        title: 'Source B: The Reality of Southern Disenfranchisement (Mississippi, 1952)',
        type: 'Official Testimony &bull; US Civil Rights Commission Record',
        date: '1952',
        quote:
          'A Negro citizen who presents himself to register is required to read, copy, and interpret any section of the state constitution to the personal satisfaction of the white registrar. If he possesses a university degree, he is asked how many bubbles there are in a bar of soap. Registration is utterly impossible.',
        context:
          'From sworn testimony before civil rights investigators detailing the arbitrary literacy tests and official intimidation deployed by Southern county registrars to maintain total Black disenfranchisement.',
        hingeQuestion:
          'How did arbitrary voter literacy tests prevent Southern Black citizens from exercising their constitutional rights under the 15th Amendment?',
      },
    },
    p4: {
      sourceA: {
        title: 'Source A: The Warren Supreme Court Bench (1954)',
        type: 'Official Archival Portrait &bull; US Supreme Court Collection',
        date: '1954',
        image: getBase64Image('units/usa/assets/sources/warren-court-1954.jpg'),
        quote: 'Separate educational facilities are inherently unequal.',
        context:
          'Chief Justice Earl Warren with the eight associate justices who unanimously struck down the doctrine of "separate but equal" in Brown v. Board of Education (17 May 1954). Warren insisted on an absolute 9–0 verdict to prevent Southern segregationists from exploiting judicial dissent.',
        hingeQuestion:
          'Why was achieving a unanimous 9–0 ruling essential for the Supreme Court when confronting Southern state segregation laws?',
      },
      sourceB: {
        isWritten: true,
        title: 'Source B: Elizabeth Eckford Recalls Facing the Little Rock Mob (1957)',
        type: 'Eyewitness Primary Account &bull; Oral History Record',
        date: '4 September 1957',
        quote:
          'I looked for a friendly face somewhere in the crowd, someone who might help. I looked into the face of an old woman, but her face seemed so kind, and when I looked at her again, she spat on me. The mob surged closer, chanting: "Lynch her! Lynch the nigger!"',
        context:
          'Elizabeth Eckford, one of the Little Rock Nine, describing the terrifying white mob that surrounded her as she attempted to enter Central High School alone after missing the group rendezvous.',
        hingeQuestion:
          'How does Eckford’s personal testimony expose the extreme danger faced by teenage pioneers attempting to enforce federal desegregation orders?',
      },
    },
    p6: {
      sourceA: {
        title: 'Source A: Rosa Parks Fingerprinted Following Montgomery Arrest',
        type: 'Police Booking Photograph &bull; Montgomery Police Department',
        date: '22 February 1956',
        image: getBase64Image('units/usa/assets/sources/rosa-parks-fingerprint.jpg'),
        quote: 'Police booking record of Rosa Parks during mass indictments of boycott leaders.',
        context:
          'Rosa Parks being fingerprinted by Deputy Sheriff D.H. Lackey after being indicted alongside 88 other boycott leaders under an archaic 1921 Alabama anti-boycott statute. Far from being intimidated, activists voluntarily surrendered to jail.',
        hingeQuestion:
          'Why did the mass arrest of boycott leaders backfire against Montgomery municipal authorities?',
      },
      sourceB: {
        isWritten: true,
        title: 'Source B: Dr Martin Luther King Jr. Addressing Holt Street Baptist Church',
        type: 'Historic Public Address &bull; MIA Mass Meeting',
        date: '5 December 1955',
        quote:
          'We are here this evening for serious business. We are here in a general sense because first and foremost we are American citizens, and we are determined to apply our citizenship to the fullness of its meaning. We are tired of being segregated and humiliated; tired of being kicked around by the brutal feet of oppression.',
        context:
          "Dr Martin Luther King Jr.'s electrifying speech to over 5,000 Montgomery citizens on the first evening of the bus boycott, fusing constitutional democracy with Christian non-violence.",
        hingeQuestion:
          'How did King’s appeal to both American constitutional values and Christian theology mobilize the community for a prolonged boycott?',
      },
    },
    p8: {
      sourceA: {
        title: 'Source A: Southern Senators Signing the Southern Manifesto',
        type: 'Official Press Photograph &bull; US Capitol Historical Society',
        date: '12 March 1956',
        image: getBase64Image('units/usa/assets/sources/southern-manifesto-signing.jpg'),
        quote:
          'We pledge ourselves to use all lawful means to bring about a reversal of this decision.',
        context:
          'Southern senators, led by Strom Thurmond and Richard Russell, sign the Declaration of Constitutional Principles (the Southern Manifesto). Signed by 19 senators and 82 representatives, it urged Southern states to defy the Supreme Court desegregation ruling.',
        hingeQuestion:
          'Why did congressional political backing for "Massive Resistance" embolden Southern governors to openly defy federal law?',
      },
      sourceB: {
        isWritten: true,
        title: 'Source B: Senator Strom Thurmond on the Civil Rights Bill (1957)',
        type: 'US Senate Congressional Record &bull; 24-Hour Filibuster',
        date: '28 August 1957',
        quote:
          'This so-called civil rights bill is an unconstitutional federal monstrosity designed to rob the sovereign states of their local self-government. It will set up a federal Gestapo empowered to persecute decent Southern white citizens without the constitutional protection of a trial by jury.',
        context:
          'From Senator Strom Thurmond’s record-breaking 24-hour and 18-minute filibuster in the US Senate, fiercely resisting the passage of the Civil Rights Act of 1957.',
        hingeQuestion:
          'How did Southern politicians use the concept of "states’ rights" to justify the continued denial of basic civil rights to Black Americans?',
      },
    },
  };

  const leftVocab = {
    p2: [
      {
        term: 'Jim Crow Laws:',
        def: 'State and municipal statutes enacted across the American South enforcing strict racial segregation.',
      },
      {
        term: 'Disenfranchisement:',
        def: 'The systematic exclusion of Black Americans from voting through poll taxes, literacy tests, and terror.',
      },
      {
        term: 'Plessy v. Ferguson (1896):',
        def: 'US Supreme Court ruling establishing the legal doctrine of "separate but equal", legitimizing apartheid.',
      },
      {
        term: 'NAACP:',
        def: 'National Association for the Advancement of Colored People; pioneered constitutional litigation in federal courts.',
      },
      {
        term: 'CORE:',
        def: 'Congress of Racial Equality, founded in 1942; pioneered non-violent direct action, sit-ins, and protest rides.',
      },
    ],
    p4: [
      {
        term: 'Brown v. Board (1954):',
        def: 'Unanimous 9–0 Supreme Court ruling that school segregation violated the 14th Amendment Equal Protection Clause.',
      },
      {
        term: 'Earl Warren:',
        def: 'Progressive Chief Justice of the US who forged consensus and declared separate educational facilities inherently unequal.',
      },
      {
        term: 'Massive Resistance:',
        def: 'Southern political campaign orchestrated by Senator Harry Byrd to systematically block and delay desegregation.',
      },
      {
        term: 'Little Rock Nine:',
        def: 'Nine Black students who desegregated Little Rock Central High School in Sept 1957 under federal military protection.',
      },
      {
        term: 'Executive Order 10730:',
        def: "Eisenhower's order federalizing the Arkansas Guard and deploying the 101st Airborne Division to Little Rock.",
      },
    ],
    p6: [
      {
        term: 'Montgomery Bus Boycott:',
        def: 'A 381-day protest (1955–56) by 40,000 Black citizens that crippled transit revenues and secured desegregation.',
      },
      {
        term: 'Women’s Political Council:',
        def: 'Led by Jo Ann Robinson; grassroots organization of Black women educators who planned the boycott and printed flyers.',
      },
      {
        term: 'Martin Luther King Jr.:',
        def: 'Charismatic 26-year-old Baptist minister elected MIA president who articulated non-violent Christian direct action.',
      },
      {
        term: 'Browder v. Gayle (1956):',
        def: 'Landmark Supreme Court ruling upholding that Alabama bus segregation statutes were unconstitutional.',
      },
      {
        term: 'SCLC:',
        def: 'Southern Christian Leadership Conference, formed in 1957 by King and ministers to coordinate non-violent campaigns.',
      },
    ],
    p8: [
      {
        term: 'White Citizens’ Councils:',
        def: 'Organizations of white professionals founded in 1954 that deployed economic retaliation against integrationists.',
      },
      {
        term: 'Southern Manifesto (1956):',
        def: 'Document signed by 101 Southern congressmen condemning Brown v. Board and urging state resistance.',
      },
      {
        term: 'Emmett Till:',
        def: '14-year-old Black youth brutally murdered in Mississippi in Aug 1955; his open-casket funeral galvanized fury.',
      },
      {
        term: 'Dixiecrats:',
        def: "Conservative Southern Democrats who defended states' rights, racial segregation, and used Senate filibusters.",
      },
      {
        term: 'Civil Rights Act of 1957:',
        def: 'First federal civil rights legislation since 1875; established Civil Rights Commission, though heavily diluted.',
      },
    ],
  };

  /**
   * Curated Christine Counsell 4-Act Narrative Enquiries (Strict Word Budget & Layout Balanced)
   */
  const narratives = {
    enquiry1: {
      act1: {
        title: 'Act 1: The Jim Crow Reality: Segregation, Disenfranchisement & Terror',
        text: `**De Jure Segregation and the "Separate but Equal" Fiction:** In the American South of the early 1950s, seventeen states and the District of Columbia enforced compulsory racial segregation by law (*de jure* segregation). Grounded in the 1896 Supreme Court ruling in *Plessy v. Ferguson*, which sanctioned the constitutional doctrine of "separate but equal", state and municipal Jim Crow codes mandated the total separation of Black and white citizens across all aspects of civic life: public transit, schools, hospitals, restaurants, parks, and water fountains. In reality, facilities provided for Black Americans were grossly inferior, dilapidated, and starved of municipal funding, reinforcing a rigid racial caste system.

**Systematic Disenfranchisement and the Wall of White Supremacy:** Behind racial segregation lay the systematic political exclusion of Black citizens. Although the 15th Amendment (1870) constitutionally guaranteed the right to vote regardless of race, Southern state legislatures erected insurmountable barriers to registration. County registrars deployed discriminatory poll taxes that impoverished sharecroppers could not pay, alongside impossible "literacy tests" featuring obscure constitutional clauses interpreted at the registrar's arbitrary whim. In Mississippi, fewer than 5% of eligible Black adults were registered to vote in 1950, leaving Black communities entirely without political representation, judicial influence, or police protection.`,
      },
      act2: {
        title: 'Act 2: Resistance and Reform: The Dual Front of NAACP and CORE',
        text: `**The NAACP and the Strategy of Incremental Legal Litigation:** Confronting this entrenched system, the National Association for the Advancement of Colored People (NAACP), founded in 1909 by W.E.B. Du Bois and interracial activists, pursued an incremental constitutional litigation strategy. Led by chief legal counsel Thurgood Marshall, the NAACP systematically attacked Jim Crow through the federal courts rather than direct street confrontation. They targeted the Equal Protection Clause of the 14th Amendment, chipping away at segregation in graduate and professional education. Landmark victories, such as *Sweatt v. Painter* (1950) which forced the University of Texas Law School to admit Black students, established vital legal precedents proving that segregated facilities were inherently unequal.

**CORE and the Vanguard of Non-Violent Direct Action:** Operating alongside the legal front, the Congress of Racial Equality (CORE) pioneered a radically different methodology. Founded in Chicago in 1942 by James Farmer and George Houser, CORE was deeply inspired by Mahatma Gandhi's philosophy of non-violent resistance (*satyagraha*). In 1947, CORE organized the "Journey of Reconciliation"—an interracial bus ride through the Upper South to test a Supreme Court ruling banning segregation in interstate travel. Though riders were arrested and sentenced to hard labour, CORE proved that direct, bodily confrontation of discriminatory laws could expose the brutality of segregation to the national conscience.`,
      },
      act3: {
        title: "Act 3: Post-War Disillusionment and Truman's Executive Breakthrough",
        text: `**Black Veterans and the Double V Campaign:** The return of over one million Black servicemen from the battlefields of the Second World War created a profound crisis of expectations. Having fought abroad against fascist tyranny under the banner of democracy, Black veterans returned home to the American South only to face routine humiliation, racial slurs, and lynch mob violence. The Black press championed the "Double V Campaign"—victory over fascism abroad and victory over racism at home. Veterans refused to accept pre-war subservience, swelling the membership of local NAACP branches and providing disciplined leadership for the emerging civil rights movement.

**Executive Order 9981 and Cold War Geopolitics:** Racial violence against returning veterans shocked President Harry S. Truman. In 1947, Truman's Committee on Civil Rights published *To Secure These Rights*, a scathing indictment of American apartheid that warned racial inequality was damaging US prestige in the Cold War against Soviet propaganda. In July 1948, defying fierce opposition from Southern Democrats ("Dixiecrats"), Truman signed Executive Order 9981, officially ordering the desegregation of the United States Armed Forces. This marked the first decisive federal executive action against racial discrimination since Reconstruction.`,
      },
      act4: {
        title: 'Act 4: The Historical Verdict: An Apartheid State on the Brink',
        text: `**The Limits of Executive Power and Regional Entrenchment:** By 1954, the foundational groundwork for the modern civil rights revolution had been laid, but the daily reality for Southern Black Americans remained virtually unchanged. Truman's executive orders did not extend to state Jim Crow statutes, and congressional civil rights legislation was repeatedly killed by Southern senators through Senate filibusters. The white power structure—enforced by all-white police forces, juries, and the omnipresent threat of the Ku Klux Klan—remained completely intact across the Deep South.

**A Nation at the Crossroads:** Nevertheless, the early 1950s witnessed the convergence of essential causal mechanisms: a legally triumphant NAACP armed with the 14th Amendment, a growing network of non-violent direct-action activists, and a federal executive increasingly sensitive to international Cold War embarrassment. As the NAACP prepared its final, defining assault on segregated public schools in *Brown v. Board of Education*, the fragile edifice of Southern white supremacy stood on the brink of an unprecedented constitutional explosion.`,
      },
    },

    enquiry2: {
      act1: {
        title: 'Act 1: The Road to Brown: Thurgood Marshall & Psychological Evidence',
        text: `**The Strategic Challenge to Plessy v. Ferguson:** In 1951, the NAACP Legal Defense Fund under Thurgood Marshall launched a coordinated constitutional offensive against public school segregation, consolidating five separate state lawsuits into *Brown v. Board of Education of Topeka, Kansas*. The lead plaintiff was Oliver Brown, an African American welder whose eight-year-old daughter Linda was forced to walk six blocks across dangerous rail switchyards to catch an overcrowded bus to a segregated Black school, despite a modern white elementary school sitting just seven blocks from her home.

**The Psychological Doll Tests and the 14th Amendment:** Rather than merely arguing that Black schools lacked equal funding, Marshall pioneered a revolutionary sociological strategy. Drawing upon the famous "doll tests" conducted by Black psychologists Kenneth and Mamie Clark, Marshall proved that segregated education inflicted profound, permanent psychological trauma on Black children, conditioning them to believe they were inherently inferior. Marshall argued before the Supreme Court that such state-imposed stigma was a direct, fatal violation of the 14th Amendment's guarantee of Equal Protection.`,
      },
      act2: {
        title: 'Act 2: The Warren Verdict: "Inherently Unequal" & The Southern Backlash',
        text: `**Chief Justice Earl Warren and the Unanimous Verdict:** On 17 May 1954, newly appointed Chief Justice Earl Warren delivered the unanimous 9–0 verdict of the Supreme Court. Recognizing that any judicial dissent would be weaponized by Southern segregationists, Warren had lobbied skeptical associate justices for months to forge total consensus. The ruling declared unequivocally: *"In the field of public education, the doctrine of 'separate but equal' has no place. Separate educational facilities are inherently unequal."* After 58 years, the legal foundation of Jim Crow apartheid was constitutionally shattered.

**The Fatal Compromise of Brown II and "All Deliberate Speed":** While Brown was hailed as a magnificent constitutional milestone, the Supreme Court issued an ambiguous implementation ruling in May 1955 (*Brown II*). Refusing to set a binding deadline, the Court merely ordered desegregation to proceed *"with all deliberate speed"*. Southern school boards seized upon this vague phrase to delay integration indefinitely. Emboldened by judicial hesitation, Southern politicians launched "Massive Resistance", pledging to defund public education, shut down schools, and resist federal desegregation by any lawful means.`,
      },
      act3: {
        title: 'Act 3: Crisis at Little Rock: Mob Rule vs The 101st Airborne',
        text: `**Governor Orval Faubus and the Little Rock Nine:** In September 1957, the federal court ordered Central High School in Little Rock, Arkansas, to admit nine Black students. Seeking re-election, Governor Orval Faubus openly defied the federal judiciary: he deployed armed soldiers of the Arkansas National Guard to surround the school and block the students' entry. On 4 September, fifteen-year-old Elizabeth Eckford arrived alone, facing an enraged white mob of thousands that screamed death threats while guardsmen turned her away at bayonet point. Televised footage of the screaming mob horrified the nation and foreign allies.

**Eisenhower's Military Intervention:** For three weeks, President Dwight D. Eisenhower attempted to negotiate with Faubus, but when local police withdrew and a violent mob besieged the school on 23 September, Eisenhower took decisive action. Exercising Executive Order 10730, he federalized the Arkansas National Guard (stripping Faubus of command) and dispatched 1,200 elite paratroopers of the 101st Airborne Division to Little Rock. Armed with fixed bayonets, federal troops escorted the Little Rock Nine into Central High, establishing that federal military force would crush state defiance.`,
      },
      act4: {
        title: 'Act 4: The Historical Verdict: Precedent, Limitation & Delay',
        text: `**The "Lost Year" and the Resilience of Resistance:** Although federal troops protected the Little Rock Nine through the academic year, white resistance was far from defeated. In September 1958, Governor Faubus took the extreme step of closing all four public high schools in Little Rock for an entire academic year (the "Lost Year"), attempting to force white pupils into private, segregated academies. It was not until the Supreme Court ruled in *Cooper v. Aaron* (1958) that states were bound by Supreme Court orders that Little Rock schools reopened on an integrated basis in 1959.

**The Realities of Educational Desegregation by 1960:** The battle over education exposed the fundamental dualism of the early civil rights movement. While the NAACP won total constitutional supremacy in the federal courts, the absence of executive enforcement mechanisms meant that desegregation was painfully slow. By 1960, six years after the Brown ruling, less than one percent of Black children in the eleven states of the former Confederacy attended school with white children. The legal victory was complete, but the struggle on the ground had only just begun.`,
      },
    },

    enquiry3: {
      act1: {
        title: 'Act 1: The Spark in Montgomery: Rosa Parks & Jo Ann Robinson',
        text: `**The Degradation of the Montgomery Bus Lines:** In Montgomery, Alabama, municipal bus segregation was a source of constant daily humiliation for Black residents, who made up over 70% of transit ridership. City ordinances required Black passengers to pay their fare at the front, exit, and re-enter through the rear door. The first four rows of seats were reserved exclusively for whites; if white seats filled up, Black passengers seated in the middle "coloured section" were legally required to vacate entire rows so no white passenger had to sit near a Black person. Bus drivers carried firearms, routinely abusing Black women with racial profanities.

**The Arrest of Rosa Parks and the WPC Leaflet Blitz:** On 1 December 1955, seamstress Rosa Parks, a respected NAACP officer trained at the Highlander Folk School, refused a driver's command to surrender her seat to a white man. Her arrest provided the NAACP with the morally impeccable test case it had been waiting for. Overnight, Jo Ann Robinson and the Women’s Political Council (WPC) duplicated 35,000 protest leaflets on a college mimeograph machine. Mobilizing churches and social clubs, they called for a one-day boycott of all municipal buses on Monday, 5 December—the day of Parks' trial.`,
      },
      act2: {
        title: 'Act 2: Organizing Resistance: The 381-Day Community Boycott',
        text: `**The Formation of the MIA and the Rise of Martin Luther King Jr.:** The one-day boycott was an astonishing 90% effective, with buses running completely empty through Black neighbourhoods. That afternoon, community leaders founded the Montgomery Improvement Association (MIA) to direct the campaign. Seeking a leader uncompromised by local political factions, they elected 26-year-old Baptist minister Dr Martin Luther King Jr. as president. That evening, addressing 5,000 citizens at Holt Street Baptist Church, King combined the Christian doctrine of redemptive love with the US Constitution, igniting a disciplined 381-day mass movement.

**The Logistics of Attrition: The 300-Car Pool Network:** Maintaining a boycott across 381 days required extraordinary organizational genius. Denied public transit, 40,000 citizens walked miles to work through rain and scorching heat. To sustain domestic workers and elderly labourers, the MIA organized a sophisticated 300-car pool network with 40 dispatch stations, coordinated like a military operation. Black taxi drivers provided subsidised rides, while church congregations purchased station wagons nicknamed "rolling churches" to replace private vehicles seized by segregationist police harassment.`,
      },
      act3: {
        title: 'Act 3: The Supreme Court Intervenes: Browder v. Gayle & SCLC',
        text: `**White Retaliation and Judicial Victory:** As the bus company suffered catastrophic financial losses, municipal authorities retaliated ruthlessly. King's home was firebombed with his wife and infant daughter inside; eighty-nine boycott leaders were indicted under an archaic 1921 anti-conspiracy statute; and police issued thousands of bogus traffic tickets. Refusing to yield to violence, attorney Fred Gray bypassed state courts to file *Browder v. Gayle* in federal district court. On 13 November 1956, the US Supreme Court affirmed that Alabama's state and local bus segregation laws violated the 14th Amendment.

**Founding the Southern Christian Leadership Conference (SCLC):** On 21 December 1956, Montgomery's buses were officially integrated, ending the boycott in complete victory. Building on this triumph, King convened a conference of sixty Black ministers in Atlanta in January 1957, establishing the Southern Christian Leadership Conference (SCLC). Adopting the motto *"To save the soul of America"*, the SCLC unified Black churches across the South into a coordinated regional vehicle for non-violent mass direct action, establishing King as the undisputed moral voice of the freedom struggle.`,
      },
      act4: {
        title: 'Act 4: The Historical Verdict: The Triumph of Disciplined Non-Violence',
        text: `**The Lessons of Montgomery for the Freedom Movement:** The Montgomery Bus Boycott permanently transformed the civil rights movement in three profound ways. First, it proved that ordinary working-class Black citizens possessed immense economic power when organized with disciplined solidarity. Second, it demonstrated that non-violent resistance could disarm white racist violence by claiming the moral and constitutional high ground. Third, it proved that local community protests could force federal judicial and executive intervention to dismantle municipal segregation.

**Persistent Violence in the Aftermath:** However, the end of the boycott did not bring immediate racial peace. White supremacists retaliated with bombings of Black churches and snipers firing into integrated buses, forcing a temporary night-time bus curfew. In addition, integration remained strictly confined to transit; Montgomery's parks, libraries, and public schools remained totally segregated. The boycott proved that Jim Crow was vulnerable, but crushing Southern white supremacy would require a prolonged, nationwide confrontation.`,
      },
    },

    enquiry4: {
      act1: {
        title: 'Act 1: Massive Resistance: The Southern Manifesto & White Citizens’ Councils',
        text: `**The Southern Manifesto and State Nullification:** Following the Brown ruling, Southern white political leaders mobilized to preserve segregation through state-sponsored defiance. In March 1956, 101 Southern congressmen (19 senators and 82 representatives), led by Senator Strom Thurmond of South Carolina, signed the Declaration of Constitutional Principles, popularly known as the *Southern Manifesto*. Condemning the Supreme Court for a "clear abuse of judicial power", the manifesto commended states that pledged resistance and urged the South to deploy all lawful means to prevent desegregation.

**White Citizens’ Councils and Economic Warfare:** While the Ku Klux Klan operated in the shadows, the middle class mobilized through the White Citizens’ Councils. Founded in Indianola, Mississippi, in July 1954, the Councils enrolled over 250,000 white bankers, merchants, landlords, and civic leaders across the South. Nicknamed the "uptown Klan", they rejected physical violence in favor of economic terror: Black citizens who attempted to register to vote or signed school desegregation petitions had their names published, facing immediate eviction, job dismissal, credit denial, and mortgage foreclosures.`,
      },
      act2: {
        title: 'Act 2: Vigilante Terror: The Murder of Emmett Till & KKK Impunity',
        text: `**The Lynching of Emmett Till:** In August 1955, fourteen-year-old Emmett Till, visiting relatives in Money, Mississippi, from Chicago, was abducted from his uncle's home by two white men, Roy Bryant and J.W. Milam, after allegedly whistling at a white female shopkeeper. Till was savagely beaten, had an eye gouged out, was shot in the head, and his body was tied to a 75-pound cotton gin fan with barbed wire before being dumped into the Tallahatchie River. His mother, Mamie Till-Mobley, insisted on an open-casket funeral in Chicago, allowing 50,000 people to witness his mutilated body.

**Judicial Impunity and National Awakening:** The trial of Bryant and Milam in Sumner, Mississippi, exposed the total corruption of the Southern legal system. Despite courageous testimony from Till's uncle, Mose Wright, an all-white, all-male jury acquitted both murderers in just 67 minutes, with one juror boasting that they would have finished sooner had they not paused to drink soda. Months later, protected by double jeopardy, the killers sold the confession of their brutal crime to *Look* magazine for $4,000. The trial galvanized a generation of young Black Americans into active resistance.`,
      },
      act3: {
        title: 'Act 3: Congressional Obstruction: The Battle for the 1957 Civil Rights Act',
        text: `**The Push for Federal Voting Legislation:** In 1957, seeking to demonstrate civil rights progress before the 1958 midterm elections, the Eisenhower administration proposed the first federal civil rights legislation since 1875. The bill aimed to protect Black voting rights by establishing a federal Civil Rights Commission and empowering the Justice Department to seek federal court injunctions against local registrars who denied Black citizens the ballot.

**Dixiecrat Dilution and Strom Thurmond's Filibuster:** Southern Democrats in the Senate fought the bill ferociously. Senator Strom Thurmond staged the longest individual filibuster in US Senate history, speaking continuously for 24 hours and 18 minutes to block the vote. Led by Senate Majority Leader Lyndon B. Johnson, who sought a compromise to preserve party unity, the bill was drastically gutted: provisions allowing federal enforcement of school desegregation were deleted, and voting registrars accused of contempt were granted jury trials before local, all-white Southern juries.`,
      },
      act4: {
        title: 'Act 4: The Historical Verdict: Flawed Compromise & The Road Ahead',
        text: `**The Weakness of the 1957 Act in Practice:** When Eisenhower signed the Civil Rights Act of 1957 into law on 9 September 1957, it was widely recognized as a toothless piece of legislation. Because all-white Southern juries refused to convict white registrars, the act registered fewer than 200,000 additional Black voters across the entire South between 1957 and 1960. A follow-up Civil Rights Act in 1960, which introduced federal voting referees, proved equally ineffective, adding only 3% to Southern Black voter rolls.

**The Decisive Shift to Direct Action:** By the end of 1960, the civil rights movement had reached a critical turning point. The dual pillars of litigation and diluted federal legislation had proved that while the legal edifice of Jim Crow was constitutionally broken, the white power structure would never voluntarily implement change. Frustrated by political delays and Southern intransigence, young Black college students decided they could wait no longer, preparing to take the freedom struggle directly to lunch counters and highways across America.`,
      },
    },
  };

  const backCoverData = {
    title: 'Key Topic 1 Master Synoptic Consolidation',
    timeline: [
      {
        date: '17 May 1954',
        title: 'Brown v. Board Ruling',
        body: 'Supreme Court unanimously outlaws public school segregation 9–0, overturning Plessy.',
      },
      {
        date: '28 Aug 1955',
        title: 'Murder of Emmett Till',
        body: '14-year-old lynched in Mississippi; all-white jury acquits killers in 67 minutes, shocking the nation.',
      },
      {
        date: '1 Dec 1955',
        title: 'Rosa Parks Arrested',
        body: 'Refusal to yield bus seat ignites the 381-day Montgomery Bus Boycott led by Dr King.',
      },
      {
        date: '12 Mar 1956',
        title: 'The Southern Manifesto',
        body: '101 Southern congressmen pledge Massive Resistance against federal desegregation.',
      },
      {
        date: '13 Nov 1956',
        title: 'Browder v. Gayle',
        body: 'Supreme Court affirms bus segregation violates 14th Amendment; transit fully integrated.',
      },
      {
        date: '24 Sept 1957',
        title: 'Little Rock 101st Airborne',
        body: 'Eisenhower deploys federal paratroopers to escort the Little Rock Nine past mobs.',
      },
    ],
    pillars: [
      {
        title: 'I. De Jure Apartheid & Disenfranchisement',
        body: 'Southern Jim Crow statutes enforced compulsory racial segregation backed by all-white police forces and systematic voter suppression (poll taxes, literacy tests) that locked 95% of Black adults out of the franchise.',
      },
      {
        title: 'II. Constitutional Litigation & Judicial Victory',
        body: 'The NAACP\'s incremental legal strategy culminated in Brown v. Board (1954) and Browder v. Gayle (1956), weaponizing the 14th Amendment Equal Protection Clause to legally overturn the 1896 "separate but equal" doctrine.',
      },
      {
        title: 'III. Grassroots Direct Action & Moral Power',
        body: 'The Montgomery Bus Boycott demonstrated that disciplined non-violent community action could wield decisive economic power, bringing Dr Martin Luther King Jr. and the SCLC to the forefront of the national struggle.',
      },
      {
        title: 'IV. Massive Resistance & Federal Coercion',
        body: 'Southern politicians responded with the Southern Manifesto, White Citizens’ Councils, and school closures. Progress required federal executive coercion, as demonstrated by Eisenhower deploying the 101st Airborne to Little Rock.',
      },
    ],
    historiographyDebate: {
      interp1: {
        title: 'Interpretation 1: The Primacy of Legal Constitutionalism (Michael J. Klarman)',
        text: '"The decisive catalyst of the early civil rights movement was the federal judiciary. Without the NAACP\'s methodical legal campaign and the Warren Court\'s willingness to overrule Plessy v. Ferguson in Brown, local direct-action protests would have been crushed by state police power without constitutional protection."',
      },
      interp2: {
        title: 'Interpretation 2: The Power of Grassroots Mobilization (Clayborne Carson)',
        text: '"Court rulings alone were dead letters in the Deep South, easily nullified by Southern states through \'deliberate speed\' delays. Real change was driven from below by courageous ordinary citizens—such as the 40,000 Montgomery boycotters and the Little Rock Nine—who forced reluctant presidents to enforce the law."',
      },
    },
    verdicts: [
      {
        title: 'Constitutional Transformation:',
        body: 'Between 1954 and 1960, the legal pillar of American racial apartheid was decisively overthrown in federal jurisprudence. The 14th Amendment was transformed into a potent judicial weapon against state-sponsored racial discrimination.',
      },
      {
        title: 'The Reality of Massive Resistance:',
        body: 'Despite constitutional rulings, Southern white political elites orchestrated "Massive Resistance". By 1960, fewer than 1% of Black children in the Deep South attended integrated schools, and the 1957 Civil Rights Act registered virtually no new voters.',
      },
      {
        title: 'The Emerging Philosophy of Non-Violence:',
        body: 'The Montgomery Bus Boycott established non-violent direct action as an effective political weapon, proving that collective economic and moral pressure could compel federal intervention and establish a template for the 1960s.',
      },
    ],
    quizzes: [
      {
        num: 'KT 1.1',
        title: 'Position of Black Americans',
        url: 'https://the-history-revision-hub.netlify.app/?unit=usa&quiz=kt1_1',
      },
      {
        num: 'KT 1.2',
        title: 'Brown & Little Rock',
        url: 'https://the-history-revision-hub.netlify.app/?unit=usa&quiz=kt1_2',
      },
      {
        num: 'KT 1.3',
        title: 'Montgomery Bus Boycott',
        url: 'https://the-history-revision-hub.netlify.app/?unit=usa&quiz=kt1_3',
      },
      {
        num: 'KT 1.4',
        title: 'Southern White Resistance',
        url: 'https://the-history-revision-hub.netlify.app/?unit=usa&quiz=kt1_4',
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
