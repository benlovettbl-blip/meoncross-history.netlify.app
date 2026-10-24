/**
 * scripts/backfill_usa_cloze_and_dominos.cjs
 *
 * Backfills for all 16 lessons of USA 1954–75:
 * 1. Normalized 5-item vocabulary with { term, def, definition }
 * 2. Narrative vocab_cloze_text embedding all 5 [bracketed] terms
 * 3. Rigorous 5-stage causal_domino_spine with { step, date, title, actor, tag, trigger, because, therefore, connective, exam_link }
 *
 * Updates:
 * - public/data/usa.json
 * - data/usa.json
 * - units/usa/data.js
 */

const fs = require('fs');
const path = require('path');

const USA_ENHANCEMENTS = {
  lesson_1_1: {
    vocab: [
      {
        term: 'Jim Crow Laws',
        def: 'State and local statutory laws in the American South mandating racial segregation in all public facilities, schools, and transportation.',
        definition:
          'State and local statutory laws in the American South mandating racial segregation in all public facilities, schools, and transportation.',
      },
      {
        term: 'Plessy v. Ferguson',
        def: "The 1896 Supreme Court ruling establishing the 'separate but equal' legal doctrine justifying racial segregation.",
        definition:
          "The 1896 Supreme Court ruling establishing the 'separate but equal' legal doctrine justifying racial segregation.",
      },
      {
        term: 'NAACP',
        def: 'The National Association for the Advancement of Colored People, founded in 1909 to dismantle segregation through federal court challenges.',
        definition:
          'The National Association for the Advancement of Colored People, founded in 1909 to dismantle segregation through federal court challenges.',
      },
      {
        term: 'CORE',
        def: 'Congress of Racial Equality, an interracial civil rights group formed in 1942 that pioneered non-violent direct action and sit-ins.',
        definition:
          'Congress of Racial Equality, an interracial civil rights group formed in 1942 that pioneered non-violent direct action and sit-ins.',
      },
      {
        term: 'Disenfranchisement',
        def: 'The systematic denial of voting rights to Black citizens through poll taxes, literacy tests, and violent intimidation.',
        definition:
          'The systematic denial of voting rights to Black citizens through poll taxes, literacy tests, and violent intimidation.',
      },
    ],
    vocab_cloze_text:
      "In the early 1950s, African Americans in Southern states lived under the oppressive weight of [Jim Crow Laws], which legally enforced racial segregation in every sphere of public life. This system of legal inequality was anchored in the 1896 Supreme Court ruling [Plessy v. Ferguson], which had established the cynical doctrine of 'separate but equal'. To overturn this constitutional injustice, lawyers from the [NAACP] filed strategic legal lawsuits targeting school segregation in federal courts. Meanwhile, direct action advocates founded [CORE] to challenge segregated public facilities using non-violent picketing and sit-ins. Beyond segregated facilities, the most devastating instrument of white supremacy was political [Disenfranchisement], which barred over 95% of eligible Black adults from voting in Mississippi and Alabama through rigged literacy tests and poll taxes.",
    causal_domino_spine: {
      title: 'Segregation & Disenfranchisement in the Early 1950s: 5-Stage Causal Domino Chain',
      subtitle: 'Edexcel Paper 3 Analytical Strategy for Causation & Historical Significance',
      exam_strategy:
        'Trace how constitutional doctrine institutionalised white supremacy and provoked organised legal and direct action challenges.',
      stages: [
        {
          step: 1,
          date: '1896',
          title: 'The Plessy v. Ferguson Precedent',
          actor: 'US Supreme Court',
          tag: 'Constitutional Legitimation',
          trigger:
            "The US Supreme Court rules in Plessy v. Ferguson that racial segregation is constitutional under the 'separate but equal' doctrine.",
          because:
            'Southern states sought legal immunity from federal intervention after Reconstruction ended to reassert white political and social dominance.',
          therefore:
            'Gave Southern state governments legal authority to pass comprehensive Jim Crow statutes segregating all public spaces.',
          connective:
            'With segregation enshrined in constitutional law, Southern states systematically stripped Black citizens of their political power...',
          exam_link:
            'Significance: Established the legal foundation of segregation that the civil rights movement had to overturn.',
        },
        {
          step: 2,
          date: '1900–1950',
          title: 'Institutionalisation of Jim Crow',
          actor: 'Southern State Legislatures',
          tag: 'Legalised Inequality',
          trigger:
            'Southern legislatures pass comprehensive Jim Crow codes segregating trains, buses, schools, hospitals, parks, and cemeteries.',
          because:
            'White segregationists sought to prevent any social or economic equality between Black and white citizens.',
          therefore:
            'Black Americans were relegated to inferior public services, substandard schools, and humiliating daily subordination.',
          connective:
            'Economic and social subjugation was reinforced by total exclusion from the ballot box...',
          exam_link:
            'Significance: Created a dual society where public facilities for Black citizens were drastically underfunded and degraded.',
        },
        {
          step: 3,
          date: '1910–1950',
          title: 'Systematic Voter Disenfranchisement',
          actor: 'Southern Registrars & Vigilantes',
          tag: 'Political Exclusion',
          trigger:
            'County registrars enforce discriminatory literacy tests, exorbitant poll taxes, and white primaries backed by KKK terror.',
          because:
            'White politicians feared that Black voting majorities in rural counties would unseat segregationist sheriffs and judges.',
          therefore:
            'Fewer than 5% of eligible Black citizens were registered to vote across the Deep South, leaving them powerless to change discriminatory laws.',
          connective:
            'Faced with completely blocked political avenues, civil rights leaders turned to the federal judicial system...',
          exam_link:
            'Significance: Ensured that southern courts, sheriffs, and politicians remained entirely white and committed to segregation.',
        },
        {
          step: 4,
          date: '1909–1940s',
          title: 'Formation of NAACP Legal Defense',
          actor: 'NAACP Legal Team',
          tag: 'Judicial Strategy',
          trigger:
            'The NAACP establishes its Legal Defense Fund under Thurgood Marshall to systematically challenge the inequality of segregated facilities in federal court.',
          because:
            'State legislatures and Congress were paralyzed by Southern filibusters, making the federal courts the only viable path to reform.',
          therefore:
            'Won key legal victories proving that separate graduate and law schools were inherently unequal, laying the groundwork to attack school segregation.',
          connective:
            'Alongside legal litigation, grassroots activists pioneered direct confrontation...',
          exam_link:
            'Significance: Built the courtroom jurisprudence that directly dismantled Plessy v. Ferguson in 1954.',
        },
        {
          step: 5,
          date: '1942–1954',
          title: 'Emergence of Non-Violent Direct Action',
          actor: 'CORE Activists',
          tag: 'Grassroots Resistance',
          trigger:
            'CORE organizes the 1947 Journey of Reconciliation and early restaurant sit-ins to expose the failure to enforce interstate desegregation rulings.',
          because:
            'Activists recognized that courtroom rulings alone were ignored by Southern officials unless compelled by public direct action.',
          therefore:
            'Pioneered Gandhian non-violent protest techniques that would define the mass civil rights campaigns of the late 1950s and 1960s.',
          connective:
            'These dual prongs of courtroom litigation and direct action converged into the historic school desegregation crisis of 1954...',
          exam_link:
            'Significance: Established the moral power and tactical framework of non-violent resistance for the entire civil rights era.',
        },
      ],
    },
  },

  lesson_1_2: {
    vocab: [
      {
        term: 'Brown v. Board of Education',
        def: 'The landmark 1954 Supreme Court decision ruling unanimously that segregated public schools were inherently unequal and unconstitutional.',
        definition:
          'The landmark 1954 Supreme Court decision ruling unanimously that segregated public schools were inherently unequal and unconstitutional.',
      },
      {
        term: 'Earl Warren',
        def: 'The progressive US Supreme Court Chief Justice who orchestrated the unanimous 9-0 ruling striking down school segregation.',
        definition:
          'The progressive US Supreme Court Chief Justice who orchestrated the unanimous 9-0 ruling striking down school segregation.',
      },
      {
        term: 'Orval Faubus',
        def: 'The segregationist Governor of Arkansas who deployed the state National Guard to block nine Black students from Central High School.',
        definition:
          'The segregationist Governor of Arkansas who deployed the state National Guard to block nine Black students from Central High School.',
      },
      {
        term: '101st Airborne Division',
        def: 'Elite US Army paratroopers deployed by President Eisenhower to Little Rock to escort the Little Rock Nine and enforce federal court orders.',
        definition:
          'Elite US Army paratroopers deployed by President Eisenhower to Little Rock to escort the Little Rock Nine and enforce federal court orders.',
      },
      {
        term: 'The Lost Year',
        def: 'The 1958–59 school year when Governor Faubus closed all Little Rock public high schools to prevent court-ordered desegregation.',
        definition:
          'The 1958–59 school year when Governor Faubus closed all Little Rock public high schools to prevent court-ordered desegregation.',
      },
    ],
    vocab_cloze_text:
      'On 17 May 1954, the legal landscape of the United States was revolutionized by the Supreme Court decision [Brown v. Board of Education], which declared that racial segregation in public schools violated the 14th Amendment. Newly appointed Chief Justice [Earl Warren] recognized the moral necessity of unity, working tirelessly behind closed doors to achieve an unequivocal 9-0 unanimous verdict. However, Southern states resisted with fierce obstinacy; in September 1957, Arkansas Governor [Orval Faubus] deployed armed state National Guardsmen to physically bar nine Black teenagers from entering Little Rock Central High School. Recognizing an unprecedented constitutional crisis where a state openly defied federal law, President Eisenhower dispatched 1,000 battle-hardened soldiers of the [101st Airborne Division] to escort the students past violent white mobs with fixed bayonets. Furious at his defeat, Faubus retaliated the following autumn by shutting down all four municipal high schools, inflicting [The Lost Year] upon thousands of local students before federal courts forced them to reopen.',
    causal_domino_spine: {
      title: 'The Battle for School Integration (1954–1958): 5-Stage Causal Domino Chain',
      subtitle: 'Edexcel Paper 3 Analytical Strategy for Causation & Historical Significance',
      exam_strategy:
        'Analyze how judicial desegregation mandates triggered massive state resistance and compelled unprecedented federal military enforcement.',
      stages: [
        {
          step: 1,
          date: 'May 1954',
          title: 'The Brown v. Board Ruling',
          actor: 'Supreme Court under Earl Warren',
          tag: 'Judicial Breakthrough',
          trigger:
            'The Supreme Court rules 9-0 in Brown v. Board that segregated schools are inherently unequal and generate feelings of inferiority.',
          because:
            'NAACP lawyers demonstrated psychological damage to Black children and proved that facilities were never equal in funding or quality.',
          therefore:
            'Overturned Plessy v. Ferguson in public education and legally outlawed state-sponsored school segregation nationwide.',
          connective:
            "However, the Supreme Court failed to set a firm deadline, issuing a vague 'with all deliberate speed' decree in 1955...",
          exam_link:
            'Significance: Removed the legal legitimacy of segregation and inspired civil rights activists to challenge all Jim Crow laws.',
        },
        {
          step: 2,
          date: '1955–1956',
          title: 'Southern Massive Resistance',
          actor: 'Southern Governors & Legislators',
          tag: 'Defiance of Federal Law',
          trigger:
            'Southern politicians sign the Southern Manifesto and pass laws cutting off state funding to any school district that attempts integration.',
          because:
            'Southern political leaders believed they could protect white supremacy by exploiting federal reluctance to use force.',
          therefore:
            'Virtually zero schools in the Deep South were integrated in the three years following the Brown decision.',
          connective:
            'When the school board in Little Rock, Arkansas finally agreed to integrate nine students, the state government intervened directly...',
          exam_link:
            'Significance: Demonstrating that court rulings alone would not end segregation without direct executive enforcement.',
        },
        {
          step: 3,
          date: 'September 1957',
          title: 'Faubus Blocks the Little Rock Nine',
          actor: 'Governor Orval Faubus',
          tag: 'State-Level Nullification',
          trigger:
            'Governor Faubus surrounds Central High School with the Arkansas National Guard, turning away the Little Rock Nine to appease racist mobs.',
          because:
            'Faubus faced a tough re-election campaign and sought to secure conservative white segregationist votes.',
          therefore:
            'Created a direct confrontation between state authority and the federal Constitution broadcast live on international television.',
          connective:
            'Faced with open rebellion against federal judicial orders during the Cold War, the White House was forced to act...',
          exam_link:
            'Significance: Turned local school desegregation into a worldwide symbol of American racial injustice, damaging US Cold War prestige.',
        },
        {
          step: 4,
          date: 'September 1957',
          title: 'Eisenhower Deploys the 101st Airborne',
          actor: 'President Dwight D. Eisenhower',
          tag: 'Federal Military Intervention',
          trigger:
            'President Eisenhower federalizes the Arkansas National Guard and sends 1,000 paratroopers of the 101st Airborne Division to Little Rock.',
          because:
            'The President could not tolerate state defiance of the Supreme Court without risking the collapse of federal constitutional authority.',
          therefore:
            'Paratroopers escorted the nine Black students into Central High School at bayonet point, protecting them from violent crowds.',
          connective:
            'Humiliated by military occupation, segregationist politicians resorted to scorched-earth tactics...',
          exam_link:
            'Significance: The first time federal troops were sent to the South to protect Black constitutional rights since Reconstruction.',
        },
        {
          step: 5,
          date: '1958–1959',
          title: 'The Lost Year in Little Rock',
          actor: 'Governor Faubus & School Board',
          tag: 'Total School Shutdown',
          trigger:
            'Governor Faubus closes all four Little Rock high schools for an entire academic year to prevent further court-ordered integration.',
          because:
            'Faubus sought to prove that white citizens preferred no public education at all over racially integrated classrooms.',
          therefore:
            'Over 3,000 students were left without education until federal courts ruled the closures unconstitutional and forced the schools to reopen in 1959.',
          connective:
            'The Little Rock crisis proved that school integration would require years of bitter struggle and unrelenting federal enforcement...',
          exam_link:
            'Significance: Showed the extraordinary lengths white supremacists would go to resist integration, stiffening civil rights determination.',
        },
      ],
    },
  },

  lesson_1_3: {
    vocab: [
      {
        term: 'Rosa Parks',
        def: 'NAACP secretary whose refusal to give up her bus seat to a white man in Montgomery, Alabama sparked the Montgomery Bus Boycott.',
        definition:
          'NAACP secretary whose refusal to give up her bus seat to a white man in Montgomery, Alabama sparked the Montgomery Bus Boycott.',
      },
      {
        term: 'Montgomery Improvement Association',
        def: 'The grassroots organization formed by Black community leaders and ministers to organize and direct the Montgomery Bus Boycott.',
        definition:
          'The grassroots organization formed by Black community leaders and ministers to organize and direct the Montgomery Bus Boycott.',
      },
      {
        term: 'Martin Luther King Jr.',
        def: 'The charismatic 26-year-old Baptist minister elected leader of the MIA, who championed non-violent civil disobedience and Christian love.',
        definition:
          'The charismatic 26-year-old Baptist minister elected leader of the MIA, who championed non-violent civil disobedience and Christian love.',
      },
      {
        term: '381 Days',
        def: 'The remarkable duration of the Montgomery Bus Boycott from 5 December 1955 to 20 December 1956, sustained by 40,000 Black citizens.',
        definition:
          'The remarkable duration of the Montgomery Bus Boycott from 5 December 1955 to 20 December 1956, sustained by 40,000 Black citizens.',
      },
      {
        term: 'Browder v. Gayle',
        def: 'The landmark 1956 Supreme Court ruling declaring that segregated seating on municipal public buses was unconstitutional.',
        definition:
          'The landmark 1956 Supreme Court ruling declaring that segregated seating on municipal public buses was unconstitutional.',
      },
    ],
    vocab_cloze_text:
      "On 1 December 1955, respected seamstress and NAACP activist [Rosa Parks] was arrested in Montgomery, Alabama after quietly refusing to surrender her bus seat to a white passenger. That evening, community leaders rallied at Dexter Avenue Baptist Church and formed the [Montgomery Improvement Association] to coordinate an all-out boycott of municipal transit. The committee chose dynamic newcomer [Martin Luther King Jr.] as its president, captivated by his powerful message of Christian fellowship and disciplined non-violent resistance. Despite police intimidation, firebombings of leaders' homes, and arrests for hitchhiking, 40,000 Black citizens organized carpools and walked miles in the rain for [381 Days], depriving the city bus company of 70% of its operating revenue. The protracted standoff finally ended in triumph when the US Supreme Court affirmed [Browder v. Gayle], striking down city transit segregation and legally ending the boycott on 20 December 1956.",
    causal_domino_spine: {
      title: 'The Montgomery Bus Boycott (1955–1956): 5-Stage Causal Domino Chain',
      subtitle: 'Edexcel Paper 3 Analytical Strategy for Causation & Historical Significance',
      exam_strategy:
        'Examine how individual defiance sparked a disciplined community boycott that forced a national legal breakthrough.',
      stages: [
        {
          step: 1,
          date: '1 December 1955',
          title: 'The Arrest of Rosa Parks',
          actor: 'Rosa Parks & Montgomery Police',
          tag: 'The Catalyst',
          trigger:
            "Rosa Parks refuses to give up her seat in the 'colored' section when the driver orders her to stand for a white passenger, and is arrested.",
          because:
            'Parks was an experienced NAACP activist outraged by decades of daily abuse and humiliating treatment of Black bus riders.',
          therefore:
            'Provided civil rights leaders with an impeccably dignified, respectable plaintiff around whom the community could unite.',
          connective:
            "Local women's groups and ministers immediately mobilized the entire Black population...",
          exam_link:
            'Significance: Transformed individual outrage into a coordinated collective movement against municipal segregation.',
        },
        {
          step: 2,
          date: '5 December 1955',
          title: 'Founding of the MIA & Boycott Launch',
          actor: 'Montgomery Improvement Association & MLK',
          tag: 'Community Mobilisation',
          trigger:
            'The MIA is formed; 40,000 Black residents refuse to ride city buses on the first day, voting unanimously to continue the boycott.',
          because:
            'Black citizens constituted 75% of transit passengers and recognized their collective economic power to demand fair treatment.',
          therefore:
            'Emptied city buses overnight and catapulted 26-year-old Martin Luther King Jr. into national civil rights leadership.',
          connective:
            'To sustain the boycott against city efforts to break it, the community built an alternative transit system...',
          exam_link:
            'Significance: Established the church and minister network as the primary organizing infrastructure of the Southern movement.',
        },
        {
          step: 3,
          date: 'Dec 1955 – Nov 1956',
          title: 'Sustaining the 381-Day Boycott',
          actor: 'Montgomery Black Community',
          tag: 'Grassroots Solidarity',
          trigger:
            'Volunteers operate a 300-car private carpool network, church station wagons, and walking clubs for 381 consecutive days.',
          because:
            'City officials refused to negotiate, revoking carpool taxi licenses and arresting drivers on fabricated charges to break their resolve.',
          therefore:
            'The city bus company lost 65% of its revenue, facing near-bankruptcy, while white businesses suffered severe downtown trade losses.',
          connective:
            "Faced with white violence, including the bombing of King's home, the MIA pursued federal legal relief...",
          exam_link:
            'Significance: Proved that sustained, disciplined economic boycotts could withstand police harassment and physical terrorism.',
        },
        {
          step: 4,
          date: '13 November 1956',
          title: 'The Browder v. Gayle Ruling',
          actor: 'US Supreme Court',
          tag: 'Judicial Victory',
          trigger:
            'The Supreme Court affirms Browder v. Gayle, ruling that segregation on intra-state public buses violates the 14th Amendment.',
          because:
            "Federal courts applied the core logic of Brown v. Board to municipal transportation, rejecting 'separate but equal' on public buses.",
          therefore:
            'Stripped Alabama and the City of Montgomery of any legal power to enforce transit segregation.',
          connective:
            'Following the formal arrival of the court injunction, the boycott concluded in total victory...',
          exam_link:
            'Significance: Expanded the constitutional prohibition of segregation beyond schools to all municipal public facilities.',
        },
        {
          step: 5,
          date: '21 December 1956',
          title: 'Desegregation of Montgomery Buses',
          actor: 'MLK & Montgomery Citizens',
          tag: 'Triumphant Integration',
          trigger:
            'King and fellow activists board the first integrated Montgomery city bus, sitting in the front seats without incident.',
          because:
            'City officials were forced to comply with federal court orders backed by the threat of federal contempt citations.',
          therefore:
            'Proved that peaceful, mass direct action combined with federal litigation could overcome entrenched Jim Crow segregation.',
          connective:
            'Emboldened by victory, King and Southern pastors founded the Southern Christian Leadership Conference (SCLC) in 1957...',
          exam_link:
            'Significance: Provided the blueprint for the wider 1960s civil rights movement and established MLK as a global figure.',
        },
      ],
    },
  },

  lesson_1_4: {
    vocab: [
      {
        term: 'The Southern Manifesto',
        def: "A 1956 resolution signed by 101 Southern congressmen pledging 'massive resistance' against federal school integration rulings.",
        definition:
          "A 1956 resolution signed by 101 Southern congressmen pledging 'massive resistance' against federal school integration rulings.",
      },
      {
        term: "White Citizens' Councils",
        def: 'Networks of white business and professional elites formed in 1954 to wage economic warfare and intimidation against civil rights supporters.',
        definition:
          'Networks of white business and professional elites formed in 1954 to wage economic warfare and intimidation against civil rights supporters.',
      },
      {
        term: 'Ku Klux Klan',
        def: 'A violent white supremacist terrorist organization that revived in the 1950s, using bombings, lynchings, and arson to terrorize activists.',
        definition:
          'A violent white supremacist terrorist organization that revived in the 1950s, using bombings, lynchings, and arson to terrorize activists.',
      },
      {
        term: 'Dixiecrats',
        def: 'Conservative Southern Democrats who used their congressional seniority and filibusters to block federal civil rights legislation.',
        definition:
          'Conservative Southern Democrats who used their congressional seniority and filibusters to block federal civil rights legislation.',
      },
      {
        term: 'Civil Rights Act of 1957',
        def: 'The first federal civil rights statute passed since 1875, creating a Civil Rights Division in the Justice Department with modest powers.',
        definition:
          'The first federal civil rights statute passed since 1875, creating a Civil Rights Division in the Justice Department with modest powers.',
      },
    ],
    vocab_cloze_text:
      "Following the Brown ruling, Southern white leaders launched an aggressive campaign of 'Massive Resistance', formalised in 1956 when 101 senators and representatives signed [The Southern Manifesto], denouncing integration as an assault on state rights. In towns across the South, respectable bankers, landlords, and politicians flocked to [White Citizens' Councils], weaponising economic coercion by terminating mortgages, cancelling farm credit, and firing any Black resident who dared sign integration petitions. Alongside this economic pressure operated the violent terror of the [Ku Klux Klan], whose masked vigilantes detonated dynamite in Black churches, homes, and synagogues across Alabama and Mississippi. In Washington, powerful Southern senators known as [Dixiecrats] deployed marathon filibusters to paralyze the Senate and gut civil rights proposals. Although Congress ultimately enacted the [Civil Rights Act of 1957], Southern filibuster compromises stripped away its voter protection enforcement teeth, resulting in fewer than 3% more Black voters being registered over the following three years.",
    causal_domino_spine: {
      title: 'Southern White Resistance & Massive Retaliation: 5-Stage Causal Domino Chain',
      subtitle: 'Edexcel Paper 3 Analytical Strategy for Causation & Historical Significance',
      exam_strategy:
        'Assess how white economic intimidation, political obstruction, and vigilante terror blunted early civil rights gains.',
      stages: [
        {
          step: 1,
          date: '1954–1955',
          title: "Formation of White Citizens' Councils",
          actor: 'Southern White Business Elites',
          tag: 'Economic Coercion',
          trigger:
            "Robert Patterson founds the first Citizens' Council in Mississippi; membership swells to 250,000 across the South within two years.",
          because:
            "White elites wanted a 'respectable' alternative to the Klan to enforce segregation through financial devastation.",
          therefore:
            'Black activists and parents who enrolled children in white schools were fired from jobs, evicted from tenant farms, and denied bank loans.',
          connective:
            'Economic bullying was rapidly bolstered by direct political action at the highest levels of government...',
          exam_link:
            'Significance: Made public advocacy for integration economically suicidal for ordinary Black families in rural counties.',
        },
        {
          step: 2,
          date: 'March 1956',
          title: 'The Southern Manifesto Declaration',
          actor: '101 Southern Congressmen',
          tag: 'Political Defiance',
          trigger:
            "Almost all Southern senators and congressmen sign the Southern Manifesto pledging to use 'all lawful means' to resist Brown.",
          because:
            "Southern politicians sought to legitimise resistance to federal court orders as heroic defense of states' rights.",
          therefore:
            'Signaled to state governors, police chiefs, and school boards that open defiance of the Supreme Court was politically praised.',
          connective:
            'This political legitimation of resistance emboldened violent white supremacist terror groups...',
          exam_link:
            'Significance: Created a united Southern political front that paralyzed federal civil rights enforcement for a decade.',
        },
        {
          step: 3,
          date: '1955–1958',
          title: 'Resurgence of KKK Bombings & Terror',
          actor: 'Ku Klux Klan Vigilantes',
          tag: 'Vigilante Violence',
          trigger:
            'The Klan launches a campaign of dynamite bombings targeting Black churches, activist homes, and integrated institutions in Birmingham.',
          because:
            'Hardline segregationists realized that legal stalling could not prevent federal court orders forever.',
          therefore:
            "Earned Birmingham the moniker 'Bombingham' and created an atmosphere of constant physical danger for civil rights workers.",
          connective:
            'As violence mounted, the Eisenhower administration attempted to pass federal voting rights legislation...',
          exam_link:
            'Significance: Demonstrating that southern law enforcement was actively complicit with or unable to control racial terrorism.',
        },
        {
          step: 4,
          date: 'August 1957',
          title: "Strom Thurmond's Marathon Filibuster",
          actor: 'Senator Strom Thurmond & Dixiecrats',
          tag: 'Congressional Sabotage',
          trigger:
            'South Carolina Senator Strom Thurmond filibusters the 1957 Civil Rights Bill for a record-shattering 24 hours and 18 minutes.',
          because:
            'Dixiecrat senators used Senate procedural rules to wear down Northern moderates and demand sweeping concessions.',
          therefore:
            'Forced the Eisenhower administration to remove strict criminal penalties and voter-registrar enforcement powers from the final bill.',
          connective: 'The diluted compromise was finally signed into law as a symbolic gesture...',
          exam_link:
            'Significance: Demonstrated the immense power of Southern committee chairmen to dilute civil rights legislation.',
        },
        {
          step: 5,
          date: 'September 1957',
          title: 'Passage of the Flawed 1957 Act',
          actor: 'President Eisenhower & Congress',
          tag: 'Toothless Compromise',
          trigger:
            'President Eisenhower signs the Civil Rights Act of 1957 into law, creating the Civil Rights Commission and Division.',
          because:
            'The White House sought to demonstrate progress on civil rights without alienating Southern conservative Democrats.',
          therefore:
            'Because juries for voting violations remained all-white, the bill added almost no new Black voters to Southern rolls.',
          connective:
            'The total failure of the 1957 Act convinced young Black students that gradualism and litigation alone were insufficient...',
          exam_link:
            'Significance: Exposed the limits of legislative compromise, paving the way for the youth-led direct action revolts of 1960.',
        },
      ],
    },
  },

  lesson_2_1: {
    vocab: [
      {
        term: 'Greensboro Sit-Ins',
        def: "The historic February 1960 lunch-counter sit-ins at Woolworth's in North Carolina that ignited a wave of student direct action across the South.",
        definition:
          "The historic February 1960 lunch-counter sit-ins at Woolworth's in North Carolina that ignited a wave of student direct action across the South.",
      },
      {
        term: 'SNCC',
        def: 'The Student Nonviolent Coordinating Committee, founded in April 1960 by student activists to organize frontline non-violent direct action.',
        definition:
          'The Student Nonviolent Coordinating Committee, founded in April 1960 by student activists to organize frontline non-violent direct action.',
      },
      {
        term: 'Freedom Rides',
        def: 'The 1961 integrated bus journeys organized by CORE through the Deep South to enforce federal desegregation of interstate travel.',
        definition:
          'The 1961 integrated bus journeys organized by CORE through the Deep South to enforce federal desegregation of interstate travel.',
      },
      {
        term: 'Anniston Bus Bombing',
        def: "The Mother's Day 1961 attack in Anniston, Alabama, where a white mob firebombed a Freedom Rider bus and beat escaping passengers.",
        definition:
          "The Mother's Day 1961 attack in Anniston, Alabama, where a white mob firebombed a Freedom Rider bus and beat escaping passengers.",
      },
      {
        term: 'James Meredith',
        def: 'Air Force veteran who became the first Black student admitted to the University of Mississippi in 1962, requiring federal military intervention.',
        definition:
          'Air Force veteran who became the first Black student admitted to the University of Mississippi in 1962, requiring federal military intervention.',
      },
    ],
    vocab_cloze_text:
      "On 1 February 1960, four Black college freshmen initiated the [Greensboro Sit-Ins] by sitting at a whites-only Woolworth's lunch counter in North Carolina and refusing to leave when refused service. Within weeks, the tactic swept through over fifty Southern cities, prompting student delegates to gather at Shaw University to establish [SNCC] as an independent frontline direct action organization. In May 1961, CORE director James Farmer launched the daring [Freedom Rides], sending mixed groups of Black and white riders on commercial buses into the Deep South to test Supreme Court desegregation decrees. The campaign met savage mob violence, most notably the horrific [Anniston Bus Bombing], where a Klan mob barricaded the doors of a burning Greyhound bus before riders barely escaped through broken windows. The struggle for higher education desegregation reached a bloody climax in 1962 when military veteran [James Meredith] attempted to register at Ole Miss, provoking campus riots that killed two people and forced President Kennedy to dispatch 30,000 soldiers and federal marshals to secure his enrollment.",
    causal_domino_spine: {
      title: 'Direct Action & The Student Vanguard (1960–1962): 5-Stage Causal Domino Chain',
      subtitle: 'Edexcel Paper 3 Analytical Strategy for Causation & Historical Significance',
      exam_strategy:
        'Trace how student-led sit-ins and Freedom Rides forced federal intervention through non-violent confrontation.',
      stages: [
        {
          step: 1,
          date: 'February 1960',
          title: 'The Greensboro Lunch Counter Sit-Ins',
          actor: 'The Greensboro Four',
          tag: 'Youth Spark',
          trigger:
            "Four college freshmen refuse to vacate whites-only seats at Woolworth's in Greensboro, North Carolina; by week's end, hundreds join them.",
          because:
            'Students were frustrated by the slow pace of NAACP legal lawsuits and inspired by non-violent resistance principles.',
          therefore:
            "Ignited sit-ins across 54 Southern cities within two months, leading to Woolworth's integrating its lunch counters nationwide.",
          connective:
            'The spontaneous eruption of student energy required a permanent organizing body...',
          exam_link:
            'Significance: Marked the entry of fearless student youth as the vanguard of the civil rights movement.',
        },
        {
          step: 2,
          date: 'April 1960',
          title: 'The Founding of SNCC',
          actor: 'Ella Baker & Student Activists',
          tag: 'Organisational Engine',
          trigger:
            'Ella Baker organizes a conference of student leaders at Shaw University, founding the Student Nonviolent Coordinating Committee.',
          because:
            'Baker urged young activists to maintain autonomy from conservative adult ministers and pursue radical grassroots community organizing.',
          therefore:
            'Created an aggressive, decentralized organization willing to confront segregation in the most dangerous rural counties of the South.',
          connective:
            'Building on student sit-in momentum, civil rights leaders turned to interstate transportation...',
          exam_link:
            'Significance: Transformed student energy into an enduring grassroots force that drove voter registration and direct action.',
        },
        {
          step: 3,
          date: 'May 1961',
          title: 'The Launch of the Freedom Rides',
          actor: 'CORE & Interracial Volunteers',
          tag: 'Interstate Challenge',
          trigger:
            'Thirteen CORE volunteers depart Washington DC on Greyhound and Trailways buses to test federal desegregation of interstate terminals.',
          because:
            'Southern states completely ignored the 1960 Boynton v. Virginia Supreme Court ruling desegregating interstate travel facilities.',
          therefore:
            'Challenged the federal government to enforce its own interstate commerce laws in recalcitrant Southern jurisdictions.',
          connective:
            'When the buses entered Alabama, white supremacists launched premeditated mob violence...',
          exam_link:
            'Significance: Deliberately provoked federal intervention by forcing racists to expose their brutality on interstate carriers.',
        },
        {
          step: 4,
          date: 'May 1961',
          title: 'The Anniston & Montgomery Ambush',
          actor: 'KKK Mobs & Complicit Police',
          tag: 'Savage Backlash',
          trigger:
            'A mob firebombs the bus in Anniston, Alabama; in Montgomery, riders including John Lewis are beaten unconscious while police watch.',
          because:
            'Birmingham Police Commissioner Bull Connor gave the Klan fifteen uninterrupted minutes to attack riders before police arrived.',
          therefore:
            'Images of the burning bus and bloodied riders made front-page news worldwide, deeply embarrassing President Kennedy during the Cold War.',
          connective:
            'Faced with global humiliation, Attorney General Robert Kennedy intervened decisively...',
          exam_link:
            'Significance: Proved that local police were complicit in racial terrorism, forcing the Kennedy administration into federal intervention.',
        },
        {
          step: 5,
          date: 'November 1961',
          title: 'The ICC Desegregation Order',
          actor: 'Interstate Commerce Commission & RFK',
          tag: 'Federal Enforcement',
          trigger:
            'The Interstate Commerce Commission issues strict regulations ordering all interstate bus and rail terminals to remove segregation signs.',
          because:
            "Over 400 Freedom Riders poured into Mississippi prisons, refusing bail and overwhelming local jails under the slogan 'Jail, No Bail'.",
          therefore:
            'By the end of 1962, Jim Crow signs had been permanently taken down in interstate terminals across the entire United States.',
          connective:
            'Having broken transportation segregation, the movement moved directly into the citadel of university education...',
          exam_link:
            'Significance: One of the first unequivocal, federally enforced desegregation victories of the direct action movement.',
        },
      ],
    },
  },

  lesson_2_2: {
    vocab: [
      {
        term: "Eugene 'Bull' Connor",
        def: 'The aggressive segregationist Birmingham Public Safety Commissioner who deployed attack dogs and high-pressure firehoses against peaceful marchers.',
        definition:
          'The aggressive segregationist Birmingham Public Safety Commissioner who deployed attack dogs and high-pressure firehoses against peaceful marchers.',
      },
      {
        term: "Children's Crusade",
        def: 'The pivotal May 1963 marches in Birmingham where hundreds of school children marched peacefully and were arrested and attacked by police.',
        definition:
          'The pivotal May 1963 marches in Birmingham where hundreds of school children marched peacefully and were arrested and attacked by police.',
      },
      {
        term: 'March on Washington',
        def: 'The historic 28 August 1963 demonstration where 250,000 Americans gathered at the Lincoln Memorial to demand federal civil rights legislation.',
        definition:
          'The historic 28 August 1963 demonstration where 250,000 Americans gathered at the Lincoln Memorial to demand federal civil rights legislation.',
      },
      {
        term: '16th Street Baptist Church',
        def: 'The Birmingham church bombed by the KKK on 15 September 1963, killing four young Black girls and galvanizing national outrage.',
        definition:
          'The Birmingham church bombed by the KKK on 15 September 1963, killing four young Black girls and galvanizing national outrage.',
      },
      {
        term: 'Letter from Birmingham Jail',
        def: "Martin Luther King Jr.'s eloquent moral manifesto defending non-violent direct action and civil disobedience against unjust laws.",
        definition:
          "Martin Luther King Jr.'s eloquent moral manifesto defending non-violent direct action and civil disobedience against unjust laws.",
      },
    ],
    vocab_cloze_text:
      "In spring 1963, Martin Luther King Jr. and the SCLC launched Project C in Alabama to confront notorious segregationist [Eugene 'Bull' Connor]. Imprisoned for defying an injunction against protesting, King composed the celebrated [Letter from Birmingham Jail] on scraps of newspaper, eloquently arguing that individuals had a moral duty to disobey unjust segregation statutes. When adult protest numbers dwindled due to fears of job losses, James Bevel organized the daring [Children's Crusade], sending hundreds of singing schoolchildren into the streets where Connor unleashed snarling police dogs and 100-pound water cannons on them. The harrowing televised footage horrified the American conscience, compelling local merchants to desegregate downtown stores and prompting the massive [March on Washington] in August 1963, where 250,000 demonstrators rallied for civil rights. However, white supremacist fury struck back weeks later with the heinous bombing of [16th Street Baptist Church], murdering four innocent young girls attending Sunday school and intensifying the urgent national demand for comprehensive federal reform.",
    causal_domino_spine: {
      title: 'The Birmingham Crisis & The March on Washington (1963): 5-Stage Causal Domino Chain',
      subtitle: 'Edexcel Paper 3 Analytical Strategy for Causation & Historical Significance',
      exam_strategy:
        "Examine how Birmingham's confrontation compelled President Kennedy to propose landmark civil rights legislation.",
      stages: [
        {
          step: 1,
          date: 'April 1963',
          title: 'Project C in Birmingham',
          actor: 'SCLC & Martin Luther King Jr.',
          tag: 'Strategic Confrontation',
          trigger:
            "SCLC launches Project C ('Confrontation') with boycotts and marches targeting downtown merchants in the South's most segregated city.",
          because:
            'King recognized that previous campaigns had stalled and that only dramatic television footage from Birmingham could force federal action.',
          therefore:
            'Confronted Police Commissioner Bull Connor, filling local city jails and setting the stage for national media exposure.',
          connective:
            'When adult marchers faced arrest and retaliatory dismissals, organizers made a controversial gamble...',
          exam_link:
            'Significance: Deliberately selected the most violent segregationist stronghold to force a national moral reckoning.',
        },
        {
          step: 2,
          date: 'May 1963',
          title: "The Children's Crusade",
          actor: 'Birmingham Schoolchildren & Bull Connor',
          tag: 'Televised Brutality',
          trigger:
            'Over 1,000 children march from 16th Street Baptist Church; Connor orders police attack dogs and 100-psi firehoses turned on them.',
          because:
            'Adults could not afford to lose jobs, while children were willing to go to jail to demand their own constitutional futures.',
          therefore:
            'Televised footage of teenagers slammed against brick walls by firehoses shocked the world and triggered international condemnation.',
          connective:
            'The economic boycott and bad publicity shattered white business unity in Birmingham...',
          exam_link:
            'Significance: Destroyed the credibility of Southern segregationist policing and compelled downtown stores to desegregate.',
        },
        {
          step: 3,
          date: '11 June 1963',
          title: "Kennedy's Civil Rights Address",
          actor: 'President John F. Kennedy',
          tag: 'Executive Commitment',
          trigger:
            "President Kennedy delivers a nationwide television address calling civil rights a 'moral issue as old as the scriptures'.",
          because:
            'Birmingham proved that racial segregation was causing domestic instability that threatened American standing in the Cold War.',
          therefore:
            'Formally committed the White House to drafting and passing a comprehensive federal Civil Rights Act outlawing segregation.',
          connective:
            "To pressure a reluctant Congress to pass Kennedy's proposed bill, civil rights leaders organized a historic mass rally...",
          exam_link:
            'Significance: The first time a US president explicitly framed civil rights as a fundamental moral obligation of the nation.',
        },
        {
          step: 4,
          date: '28 August 1963',
          title: 'The March on Washington',
          actor: 'The Big Six Civil Rights Leaders',
          tag: 'National Mobilisation',
          trigger:
            '250,000 Americans of all races gather peacefully at the Lincoln Memorial for the March on Washington for Jobs and Freedom.',
          because:
            "Organizers sought to demonstrate overwhelming public solidarity for Kennedy's civil rights bill and economic justice.",
          therefore:
            "Martin Luther King Jr. delivered his immortal 'I Have a Dream' speech, cementing civil rights at the center of American national identity.",
          connective:
            'Tragically, white supremacist terrorists answered the triumph of the march with cowardly bloodshed...',
          exam_link:
            'Significance: Displayed the moral grandeur and multiracial unity of the movement to a watching global audience.',
        },
        {
          step: 5,
          date: '15 September 1963',
          title: '16th Street Baptist Church Bombing',
          actor: 'Ku Klux Klan Klansmen',
          tag: 'Terrorist Atrocity',
          trigger:
            'A dynamite bomb explodes under the steps of 16th Street Baptist Church on Youth Sunday, murdering four young girls: Addie, Denise, Carole, and Cynthia.',
          because:
            "Racist vigilantes sought to terrorize the Black community following the desegregation of Birmingham's public schools.",
          therefore:
            "Outraged millions of white Americans and eliminated any lingering congressional resistance to passing Kennedy's civil rights legislation.",
          connective:
            "Following Kennedy's assassination two months later, President Johnson harnessed this moral outrage to enact the Civil Rights Act...",
          exam_link:
            'Significance: Galvanized insurmountable public momentum that ensured the passage of the landmark Civil Rights Act of 1964.',
        },
      ],
    },
  },

  lesson_2_3: {
    vocab: [
      {
        term: 'Freedom Summer',
        def: 'The 1964 campaign that mobilized over 1,000 student volunteers to register Black voters and open Freedom Schools in Mississippi.',
        definition:
          'The 1964 campaign that mobilized over 1,000 student volunteers to register Black voters and open Freedom Schools in Mississippi.',
      },
      {
        term: 'Mississippi Burning Case',
        def: 'The June 1964 murder of civil rights workers James Chaney, Andrew Goodman, and Michael Schwerner by the KKK and deputy sheriffs.',
        definition:
          'The June 1964 murder of civil rights workers James Chaney, Andrew Goodman, and Michael Schwerner by the KKK and deputy sheriffs.',
      },
      {
        term: 'Fannie Lou Hamer',
        def: 'MFDP leader whose impassioned televised testimony at the 1964 Democratic National Convention exposed the violent terror used to disenfranchise Black Mississippians.',
        definition:
          'MFDP leader whose impassioned televised testimony at the 1964 Democratic National Convention exposed the violent terror used to disenfranchise Black Mississippians.',
      },
      {
        term: 'Edmund Pettus Bridge',
        def: "The bridge in Selma, Alabama where state troopers brutally attacked 600 voting rights marchers with clubs and tear gas on 'Bloody Sunday'.",
        definition:
          "The bridge in Selma, Alabama where state troopers brutally attacked 600 voting rights marchers with clubs and tear gas on 'Bloody Sunday'.",
      },
      {
        term: 'Voting Rights Act of 1965',
        def: 'Landmark federal legislation that suspended literacy tests and authorized federal examiners to register Southern voters directly.',
        definition:
          'Landmark federal legislation that suspended literacy tests and authorized federal examiners to register Southern voters directly.',
      },
    ],
    vocab_cloze_text:
      "In the summer of 1964, civil rights coalitions launched [Freedom Summer], deploying over a thousand predominantly white Northern college students to establish community centers and register voters across repressive Mississippi. Within days of arriving, tragedy struck in the infamous [Mississippi Burning Case], when three young activists—James Chaney, Andrew Goodman, and Michael Schwerner—were abducted and murdered by Klansmen working with county deputy sheriffs. That August, sharecropper and voting activist [Fannie Lou Hamer] captivated the nation at the Democratic National Convention, movingly asking 'Is this America?' after recounting savage beatings endured for attempting to register. In early 1965, the voting struggle shifted to Selma, Alabama, where state troopers ambushed peaceful marchers on the [Edmund Pettus Bridge] on 'Bloody Sunday', fracturing skulls with billy clubs on live television. Outraged by the brutality, President Lyndon Johnson addressed Congress and invoked the movement's anthem 'We Shall Overcome', signing the transformative [Voting Rights Act of 1965] to dismantle Southern voter suppression forever.",
    causal_domino_spine: {
      title:
        'From Freedom Summer to the Voting Rights Act (1964–1965): 5-Stage Causal Domino Chain',
      subtitle: 'Edexcel Paper 3 Analytical Strategy for Causation & Historical Significance',
      exam_strategy:
        'Analyze the direct causal sequence connecting Mississippi voter registration, Selma brutality, and the passage of the Voting Rights Act.',
      stages: [
        {
          step: 1,
          date: 'June–August 1964',
          title: 'Freedom Summer in Mississippi',
          actor: 'SNCC, CORE & Student Volunteers',
          tag: 'Grassroots Registration',
          trigger:
            '1,000 northern volunteers travel to Mississippi to operate Freedom Schools and register Black voters through the MFDP.',
          because:
            'Mississippi had the lowest Black voter registration in the country (under 7%) due to state intimidation and courthouse terrorism.',
          therefore:
            'Educated thousands of children and exposed the virulent lawlessness of the state government to the national media.',
          connective:
            'White supremacists reacted to the influx of volunteers with deadly vigilante terror...',
          exam_link:
            'Significance: Highlighted the national sacrifice required to challenge total political disenfranchisement.',
        },
        {
          step: 2,
          date: '21 June 1964',
          title: 'The Murder of Chaney, Goodman, & Schwerner',
          actor: 'KKK & Neshoba County Deputies',
          tag: 'Murder of Activists',
          trigger:
            'Klansmen ambush, execute, and bury three young civil rights workers under an earthen dam in Philadelphia, Mississippi.',
          because:
            'The Klan sought to terrorize northern volunteers into abandoning the state and halting voter registration drives.',
          therefore:
            'Triggered a massive federal FBI manhunt ordered by LBJ, exposing systemic collusion between local law enforcement and the Klan.',
          connective:
            'Although the murders failed to stop Freedom Summer, Black Mississippians remained denied their ballot rights...',
          exam_link:
            'Significance: Proved that local Southern courts would never convict white murderers without federal civil rights statutes.',
        },
        {
          step: 3,
          date: 'January–March 1965',
          title: 'The Selma Voting Rights Campaign',
          actor: 'SCLC & Dallas County Voters',
          tag: 'Targeted Registration',
          trigger:
            'SCLC launches voting rights demonstrations in Selma, Alabama, where only 2% of eligible Black adults were registered.',
          because:
            "King targeted Sheriff Jim Clark's notoriously short temper to provoke public confrontations that would demand a federal voting law.",
          therefore:
            'Hundreds of teachers and citizens were arrested, creating national momentum for a direct march to the state capital in Montgomery.',
          connective:
            'When marchers stepped onto the highway on 7 March 1965, state authorities launched a vicious ambush...',
          exam_link:
            'Significance: Shifted the national civil rights spotlight squarely onto the denial of fundamental constitutional voting rights.',
        },
        {
          step: 4,
          date: '7 March 1965',
          title: "'Bloody Sunday' at Edmund Pettus Bridge",
          actor: 'Alabama State Troopers & Marchers',
          tag: 'Televised Assault',
          trigger:
            'Mounted state troopers attack 600 peaceful marchers on Edmund Pettus Bridge with bullwhips, clubs, and tear gas.',
          because:
            'Governor George Wallace ordered troopers to use whatever force was necessary to prevent the march to Montgomery.',
          therefore:
            'Televised footage interrupted Sunday night movies across America, shocking 48 million viewers and sparking nationwide protests.',
          connective:
            'The public horror compelled the President to intervene personally with Congress...',
          exam_link:
            'Significance: Created the decisive moral shockwave that made federal voting legislation immediately unavoidable.',
        },
        {
          step: 5,
          date: '6 August 1965',
          title: 'Enactment of the Voting Rights Act',
          actor: 'President Lyndon B. Johnson',
          tag: 'Legislative Triumph',
          trigger:
            'President Johnson signs the Voting Rights Act of 1965, outlawing literacy tests and deploying federal voter examiners to the South.',
          because:
            'Bloody Sunday destroyed all political resistance in Congress to sweeping federal voting protections.',
          therefore:
            'Black voter registration in Mississippi soared from 7% to over 60% within two years, permanently revolutionizing Southern politics.',
          connective:
            'With legal voting rights won, the movement pivoted toward northern urban poverty and economic inequality...',
          exam_link:
            'Significance: The single most effective piece of civil rights legislation in American history, transforming political representation.',
        },
      ],
    },
  },

  lesson_2_4: {
    vocab: [
      {
        term: 'Civil Rights Act of 1964',
        def: 'Sweeping federal legislation signed by LBJ prohibiting discrimination in public facilities, housing federal integration enforcement, and establishing the EEOC.',
        definition:
          'Sweeping federal legislation signed by LBJ prohibiting discrimination in public facilities, housing federal integration enforcement, and establishing the EEOC.',
      },
      {
        term: 'EEOC',
        def: 'The Equal Employment Opportunity Commission, created under Title VII to investigate and eliminate racial and sex discrimination in employment.',
        definition:
          'The Equal Employment Opportunity Commission, created under Title VII to investigate and eliminate racial and sex discrimination in employment.',
      },
      {
        term: '24th Amendment',
        def: 'Constitutional amendment ratified in January 1964 outlawing the use of poll taxes in federal elections.',
        definition:
          'Constitutional amendment ratified in January 1964 outlawing the use of poll taxes in federal elections.',
      },
      {
        term: 'The Great Society',
        def: "President Lyndon B. Johnson's comprehensive domestic reform agenda aimed at eradicating poverty, extending healthcare, and expanding racial equality.",
        definition:
          "President Lyndon B. Johnson's comprehensive domestic reform agenda aimed at eradicating poverty, extending healthcare, and expanding racial equality.",
      },
      {
        term: 'Fair Housing Act',
        def: "The Civil Rights Act of 1968 passed days after MLK's assassination, prohibiting racial and religious discrimination in the sale or rental of housing.",
        definition:
          "The Civil Rights Act of 1968 passed days after MLK's assassination, prohibiting racial and religious discrimination in the sale or rental of housing.",
      },
    ],
    vocab_cloze_text:
      "On 2 July 1964, President Lyndon B. Johnson signed the monumental [Civil Rights Act of 1964] into law, legally eradicating Jim Crow segregation across all public accommodations and empowering federal attorneys to sue recalcitrant school boards. Crucially, Title VII of the statute established the [EEOC] to investigate discriminatory workplace hiring practices and enforce fair employment protections for Black workers and women. Earlier that year, the constitutional barricades to the ballot box were further dismantled by the [24th Amendment], which outlawed the prohibitive poll taxes that had disenfranchised poor citizens for over half a century. Harnessing his landslide 1964 electoral mandate, Johnson launched [The Great Society], a visionary legislative crusade that created Medicare, Medicaid, Head Start, and substantial federal anti-poverty grants for inner cities. Following King's tragic assassination in April 1968, Johnson pushed the landmark [Fair Housing Act] through Congress, outlawing racial discrimination in real estate sales and rentals to tackle northern urban residential segregation.",
    causal_domino_spine: {
      title: 'Landmark Federal Legislation & The Great Society: 5-Stage Causal Domino Chain',
      subtitle: 'Edexcel Paper 3 Analytical Strategy for Causation & Historical Significance',
      exam_strategy:
        'Evaluate how executive skill and civil rights pressure produced the most expansive civil rights reforms in US history.',
      stages: [
        {
          step: 1,
          date: 'January 1964',
          title: 'Ratification of the 24th Amendment',
          actor: 'US Congress & States',
          tag: 'Constitutional Reform',
          trigger:
            'The 24th Amendment is ratified by three-fourths of states, prohibiting poll taxes in all federal elections.',
          because:
            'Civil rights campaigns proved that charging fees to register was an unconstitutional barrier targeting impoverished citizens.',
          therefore:
            'Removed a primary mechanism used in five Southern states to suppress Black voter participation.',
          connective:
            'With the poll tax eliminated federally, President Johnson tackled full public desegregation...',
          exam_link:
            'Significance: Set the constitutional stage for the broader abolition of voting restrictions.',
        },
        {
          step: 2,
          date: 'June 1964',
          title: 'Breaking the 54-Day Senate Filibuster',
          actor: 'President Johnson & Senate Leaders',
          tag: 'Legislative Mastery',
          trigger:
            'The Senate invokes cloture by a vote of 71–29 to end a grueling 54-day filibuster staged by Southern Dixiecrats.',
          because:
            "Johnson forged an alliance with Republican minority leader Everett Dirksen, declaring 'No army can withstand the strength of an idea whose time has come.'",
          therefore:
            'Broke the stranglehold Southern conservatives had held over civil rights legislation for nearly a century.',
          connective: "The historic bipartisan vote cleared the bill for the President's desk...",
          exam_link:
            'Significance: Overcame the most formidable legislative roadblock in American congressional history.',
        },
        {
          step: 3,
          date: '2 July 1964',
          title: 'Signing of the 1964 Civil Rights Act',
          actor: 'President Lyndon B. Johnson',
          tag: 'Dismantling Jim Crow',
          trigger:
            'President Johnson signs the Civil Rights Act of 1964 into law in front of Dr. King and congressional leaders.',
          because:
            "The moral weight of the March on Washington and Kennedy's martyrdom compelled comprehensive federal action.",
          therefore:
            'Permanently outlawed segregation in restaurants, hotels, theaters, and public facilities, giving teeth to federal desegregation.',
          connective:
            'The law established dedicated machinery to enforce equal workplace opportunity...',
          exam_link:
            'Significance: The death blow to legal de jure segregation in the American South.',
        },
        {
          step: 4,
          date: '1964–1965',
          title: "Launch of Johnson's Great Society",
          actor: 'LBJ Administration',
          tag: 'War on Poverty',
          trigger:
            'Johnson passes the Economic Opportunity Act, Medicare, Medicaid, and federal education funding under the Great Society banner.',
          because:
            'LBJ recognized that legal rights were meaningless without economic opportunity, healthcare, and quality schools.',
          therefore:
            'Significantly reduced national poverty rates and provided unprecedented federal investment to impoverished Black communities.',
          connective:
            'However, racial discrimination remained deeply entrenched in the housing sector...',
          exam_link:
            'Significance: Marked the largest expansion of the American social welfare safety net since the New Deal.',
        },
        {
          step: 5,
          date: '11 April 1968',
          title: 'The Fair Housing Act of 1968',
          actor: 'Congress & President Johnson',
          tag: 'Residential Integration',
          trigger:
            'Congress passes the Fair Housing Act just seven days after the assassination of Martin Luther King Jr.',
          because:
            "Nationwide urban rioting and King's martyrdom broke the resistance of Northern real estate lobbies.",
          therefore:
            'Outlawed discrimination in the sale, financing, and rental of housing, tackling northern suburban white flight and redlining.',
          connective:
            'These historic laws completed the legal framework of civil rights, shifting the debate entirely to social and economic realities...',
          exam_link:
            'Significance: The final major federal civil rights statute of the classic era, aiming at northern housing inequality.',
        },
      ],
    },
  },

  lesson_3_1: {
    vocab: [
      {
        term: 'Malcolm X',
        def: 'Charismatic Black nationalist leader who rejected non-violence and racial integration, advocating Black pride and armed self-defense.',
        definition:
          'Charismatic Black nationalist leader who rejected non-violence and racial integration, advocating Black pride and armed self-defense.',
      },
      {
        term: 'Nation of Islam',
        def: 'A Black nationalist religious organization led by Elijah Muhammad advocating racial separatism and self-sufficiency.',
        definition:
          'A Black nationalist religious organization led by Elijah Muhammad advocating racial separatism and self-sufficiency.',
      },
      {
        term: 'Black Nationalism',
        def: 'The political and cultural ideology asserting that African Americans must establish their own economic, political, and cultural institutions independent of white society.',
        definition:
          'The political and cultural ideology asserting that African Americans must establish their own economic, political, and cultural institutions independent of white society.',
      },
      {
        term: 'By Any Means Necessary',
        def: "Malcolm X's famous doctrine asserting that African Americans have the moral right to defend themselves against racist violence using whatever methods are required.",
        definition:
          "Malcolm X's famous doctrine asserting that African Americans have the moral right to defend themselves against racist violence using whatever methods are required.",
      },
      {
        term: 'Hajj to Mecca',
        def: "Malcolm X's transformative April 1964 pilgrimage where seeing Muslims of all races worshipping together led him to reject racial separatism.",
        definition:
          "Malcolm X's transformative April 1964 pilgrimage where seeing Muslims of all races worshipping together led him to reject racial separatism.",
      },
    ],
    vocab_cloze_text:
      "During the early 1960s, a fiery alternative to the Southern non-violent movement emerged in the northern urban ghettos, championed by [Malcolm X]. As the chief national spokesman for the [Nation of Islam], he vehemently denounced white people as historical oppressors and rejected racial integration, arguing that Black Americans should not beg for acceptance from those who had enslaved them. Malcolm promoted militant [Black Nationalism], urging African Americans to achieve economic self-sufficiency, embrace African heritage, and reclaim their psychological dignity. Rejecting Martin Luther King's philosophy of non-violence in the face of brutal beatings and bombings, Malcolm proclaimed that Black people must secure their freedom [By Any Means Necessary]. However, in 1964, Malcolm split with Elijah Muhammad and embarked on his historic [Hajj to Mecca], where worshipping beside blonde-haired and blue-eyed Muslims revolutionized his thinking, leading him to abandon anti-white rhetoric and adopt a universal human rights perspective before his tragic assassination in 1965.",
    causal_domino_spine: {
      title: 'Malcolm X & The Radicalization of Black Nationalism: 5-Stage Causal Domino Chain',
      subtitle: 'Edexcel Paper 3 Analytical Strategy for Causation & Historical Significance',
      exam_strategy:
        "Analyze why Malcolm X's ideology resonated with northern urban youth and transformed the trajectory of civil rights.",
      stages: [
        {
          step: 1,
          date: '1952–1960',
          title: 'Malcolm X Rises in the Nation of Islam',
          actor: 'Malcolm X & Elijah Muhammad',
          tag: 'Separatist Theology',
          trigger:
            "Upon release from prison, Malcolm Little joins the Nation of Islam, discarding his 'slave name' for 'X' and rising to chief spokesman.",
          because:
            "The Nation's message of strict moral discipline, economic independence, and racial pride resonated deeply in northern inner cities.",
          therefore:
            'Grew the Nation of Islam from 500 members to over 40,000, creating a formidable cultural counterweight to Southern integrationism.',
          connective:
            "Malcolm's fiery television appearances captivated a generation disillusioned with Southern gradualism...",
          exam_link:
            'Significance: Popularized the concept that self-respect and dignity required breaking mental subservience to white culture.',
        },
        {
          step: 2,
          date: '1960–1963',
          title: 'Critique of Non-Violent Integrationism',
          actor: 'Malcolm X vs Southern Leaders',
          tag: 'Ideological Divide',
          trigger:
            "Malcolm delivers stinging speeches attacking the March on Washington as a 'farce' and mocking non-violence as 'the philosophy of fools'.",
          because:
            'He argued that integrationist legislation failed to address northern ghetto realities: slum slumlords, police brutality, and 50% youth joblessness.',
          therefore:
            'Articulated the simmering anger of urban Black youth who felt abandoned by the middle-class Southern movement.',
          connective:
            "However, tensions with the Nation's leadership erupted after Malcolm commented on JFK's assassination...",
          exam_link:
            'Significance: Exposed the deep geographic and tactical fracture within the broader Black freedom movement.',
        },
        {
          step: 3,
          date: 'March 1964',
          title: 'Split from the Nation of Islam',
          actor: 'Malcolm X & Elijah Muhammad',
          tag: 'Political Independence',
          trigger:
            'Silenced by Elijah Muhammad, Malcolm formally breaks with the Nation to establish the secular Organization of Afro-American Unity (OAAU).',
          because:
            "He was disillusioned by Elijah Muhammad's personal scandals and frustrated by the Nation's ban on active political campaigning.",
          therefore:
            'Freed Malcolm to build independent political coalitions and connect the African American struggle to anti-colonial African revolutions.',
          connective:
            'To ground his new independent direction, Malcolm undertook a transformative religious journey...',
          exam_link:
            'Significance: Allowed Malcolm to transition from religious separatism to revolutionary international politics.',
        },
        {
          step: 4,
          date: 'April 1964',
          title: 'The Hajj to Mecca Transformation',
          actor: 'El-Hajj Malik El-Shabazz',
          tag: 'Universal Human Rights',
          trigger:
            'Malcolm performs the Hajj pilgrimage to Mecca, witnessing Muslims of all skin colors, nationalities, and classes worshipping as equals.',
          because:
            'Experiencing authentic orthodox Islamic brotherhood shattered his belief that all white people were inherently demonic.',
          therefore:
            'Renounced racial separatism and declared his willingness to cooperate with white allies who genuinely fought racism.',
          connective:
            'His new moderate and internationalist stance enraged his former associates in the Nation of Islam...',
          exam_link:
            'Significance: Broadened the American civil rights struggle into an international human rights movement.',
        },
        {
          step: 5,
          date: '21 February 1965',
          title: 'Assassination & Enduring Legacy',
          actor: 'Nation of Islam Gunmen',
          tag: 'Martyrdom',
          trigger:
            'Three Nation of Islam members shoot Malcolm X 21 times as he prepares to speak at the Audubon Ballroom in Harlem.',
          because:
            "Nation leaders viewed Malcolm as an apostate and dangerous rival who threatened their organization's power.",
          therefore:
            'His posthumously published Autobiography became a worldwide bestseller, inspiring the Black Power movement and Black Panther Party.',
          connective:
            'Within a year of his death, young activists like Stokely Carmichael took his ideas to the front lines...',
          exam_link:
            'Significance: Established the philosophical foundation for the Black Power, Black pride, and Black Arts movements.',
        },
      ],
    },
  },

  lesson_3_2: {
    vocab: [
      {
        term: 'Black Power',
        def: 'A militant slogan and movement coined by Stokely Carmichael in 1966 demanding Black political independence, cultural pride, and community control.',
        definition:
          'A militant slogan and movement coined by Stokely Carmichael in 1966 demanding Black political independence, cultural pride, and community control.',
      },
      {
        term: 'Stokely Carmichael',
        def: "Elected chairman of SNCC in 1966 who popularized the 'Black Power' cry and expelled white members to foster Black leadership.",
        definition:
          "Elected chairman of SNCC in 1966 who popularized the 'Black Power' cry and expelled white members to foster Black leadership.",
      },
      {
        term: 'Black Panther Party',
        def: 'A revolutionary socialist organization founded in Oakland in 1966 by Huey Newton and Bobby Seale to fight police brutality and operate community programs.',
        definition:
          'A revolutionary socialist organization founded in Oakland in 1966 by Huey Newton and Bobby Seale to fight police brutality and operate community programs.',
      },
      {
        term: 'Ten-Point Program',
        def: 'The founding manifesto of the Black Panthers demanding employment, decent housing, education, and an end to police brutality.',
        definition:
          'The founding manifesto of the Black Panthers demanding employment, decent housing, education, and an end to police brutality.',
      },
      {
        term: '1968 Olympic Salute',
        def: 'The silent protest at the Mexico City Olympics where US sprinters Tommie Smith and John Carlos raised black-gloved fists on the medal podium.',
        definition:
          'The silent protest at the Mexico City Olympics where US sprinters Tommie Smith and John Carlos raised black-gloved fists on the medal podium.',
      },
    ],
    vocab_cloze_text:
      "In June 1966, during the Meredith March Against Fear in Mississippi, SNCC chairman [Stokely Carmichael] galvanized a crowd by raising his fist and shouting for [Black Power], signaling a decisive break with traditional non-violence. In October 1966, young radicals in California established the [Black Panther Party] for Self-Defense, donning black leather jackets and berets while openly carrying loaded shotguns to monitor racist police patrols. The party published a radical [Ten-Point Program] that demanded decent housing, full employment, and exemptions from the Vietnam draft, while winning immense community loyalty through its Free Breakfast for Children and mobile health clinics. The movement's cultural resonance exploded into global consciousness during the [1968 Olympic Salute] in Mexico City, where gold and bronze medalists Tommie Smith and John Carlos bowed their heads and hoisted black-gloved fists during the American anthem, sacrificing their professional athletic careers to broadcast Black dignity to the entire planet.",
    causal_domino_spine: {
      title: 'The Rise of Black Power & The Black Panthers: 5-Stage Causal Domino Chain',
      subtitle: 'Edexcel Paper 3 Analytical Strategy for Causation & Historical Significance',
      exam_strategy:
        'Analyze the ideological, tactical, and political causes behind the emergence of militant Black Power.',
      stages: [
        {
          step: 1,
          date: 'June 1966',
          title: 'The Meredith March Against Fear',
          actor: 'James Meredith & Stokely Carmichael',
          tag: 'The Radical Cry',
          trigger:
            'James Meredith is shot and wounded while marching alone through Mississippi; King and Carmichael continue the march.',
          because:
            'Years of enduring beatings, jailings, and unpunished murders had exhausted the patience of young frontline SNCC workers.',
          therefore:
            "Carmichael rallied thousands chanting 'We want Black Power!', openly rejecting King's calls for non-violence and interracial harmony.",
          connective:
            'The cry electrified young radicals in California who translated the slogan into an armed organization...',
          exam_link:
            'Significance: Marked the public, irrevocable split between non-violent integrationists and radical Black separatists.',
        },
        {
          step: 2,
          date: 'October 1966',
          title: 'Founding of the Black Panther Party',
          actor: 'Huey P. Newton & Bobby Seale',
          tag: 'Armed Self-Defense',
          trigger:
            'Newton and Seale establish the Black Panther Party in Oakland, California, drafting their Ten-Point Program.',
          because:
            'They sought to protect poor Black communities from widespread police harassment and economic exploitation.',
          therefore:
            "Instituted armed 'patrols of the pigs', following police cruisers with loaded shotguns and law books to prevent police abuse.",
          connective:
            'To curtail armed Panther patrols, the California legislature drafted emergency gun-control legislation...',
          exam_link:
            'Significance: The first prominent civil rights organization to openly utilize the Second Amendment for armed community defense.',
        },
        {
          step: 3,
          date: 'May 1967',
          title: 'Panthers Storm the Sacramento Capitol',
          actor: 'Thirty Armed Black Panthers',
          tag: 'Media Shockwave',
          trigger:
            'Thirty armed Black Panthers in black berets peacefully enter the California State Assembly to protest the Mulford Gun Control Act.',
          because:
            'They wanted to alert the nation that white politicians were attempting to disarm Black citizens while racists remained armed.',
          therefore:
            'Televised images of armed Black men inside a state legislature terrified suburban white America while captivating inner-city youth.',
          connective:
            'Alongside armed patrols, the Panthers developed impactful community survival initiatives...',
          exam_link:
            'Significance: Catapulted the Black Panther Party into the national spotlight as an international revolutionary symbol.',
        },
        {
          step: 4,
          date: '1968–1969',
          title: 'Survival Programs Feed the Community',
          actor: 'Panther Volunteers & Neighborhoods',
          tag: 'Community Survival',
          trigger:
            'The Panthers launch their Free Breakfast for School Children Program, feeding over 20,000 children daily across 45 chapters.',
          because:
            'The party recognized that malnourished children could not learn and that socialist mutual aid built deep grassroots trust.',
          therefore:
            'Won immense respect in working-class neighborhoods and inspired the creation of free medical clinics and screening for sickle-cell anemia.',
          connective:
            'Viewing the Panthers as a grave national security threat, the federal government launched a covert war against them...',
          exam_link:
            'Significance: Demonstrated that the Panthers were a comprehensive social movement rather than merely a paramilitary street group.',
        },
        {
          step: 5,
          date: '1968–1971',
          title: 'FBI COINTELPRO Dismantles the Panthers',
          actor: 'J. Edgar Hoover & FBI',
          tag: 'Covert Suppression',
          trigger:
            "FBI Director Hoover labels the Panthers 'the greatest threat to the internal security of the country', deploying COINTELPRO.",
          because:
            'The federal government feared the emergence of a unified Black socialist revolution that could ignite urban rebellions.',
          therefore:
            'Assassinated Chicago Panther leader Fred Hampton, fabricated internal rivalries, and jailed party leadership, shattering the organization.',
          connective:
            'While the party fractured, its aesthetic and message of Black pride permanently altered American culture...',
          exam_link:
            'Significance: Showed the extraordinary lengths the state apparatus would take to crush radical political movements.',
        },
      ],
    },
  },

  lesson_3_3: {
    vocab: [
      {
        term: 'Watts Riots',
        def: 'The six days of violent urban rebellion in Los Angeles in August 1965 sparked by police mistreatment, killing 34 and causing $40 million in destruction.',
        definition:
          'The six days of violent urban rebellion in Los Angeles in August 1965 sparked by police mistreatment, killing 34 and causing $40 million in destruction.',
      },
      {
        term: 'Long, Hot Summers',
        def: 'The wave of over 150 race riots that swept northern and western industrial cities between 1965 and 1967, including Newark and Detroit.',
        definition:
          'The wave of over 150 race riots that swept northern and western industrial cities between 1965 and 1967, including Newark and Detroit.',
      },
      {
        term: 'Kerner Commission',
        def: 'The presidential commission appointed by LBJ that concluded white racism and ghetto neglect were the root causes of the 1960s urban riots.',
        definition:
          'The presidential commission appointed by LBJ that concluded white racism and ghetto neglect were the root causes of the 1960s urban riots.',
      },
      {
        term: 'De Facto Segregation',
        def: 'Racial segregation maintained by custom, economic inequality, residential redlining, and private discrimination rather than statutory law.',
        definition:
          'Racial segregation maintained by custom, economic inequality, residential redlining, and private discrimination rather than statutory law.',
      },
      {
        term: 'White Backlash',
        def: "The conservative political reaction among white voters against urban riots and civil rights protests, leading to 'law and order' victories in 1968.",
        definition:
          "The conservative political reaction among white voters against urban riots and civil rights protests, leading to 'law and order' victories in 1968.",
      },
    ],
    vocab_cloze_text:
      "Just five days after President Johnson signed the Voting Rights Act, the streets of Los Angeles exploded in the catastrophic [Watts Riots] of August 1965, requiring 14,000 National Guardsmen to suppress six days of arson, looting, and gunfire that left 34 dead. This erupted into the [Long, Hot Summers] of 1966 and 1967, as more than 150 northern industrial metropolises—most catastrophically Detroit, where 43 people perished—rebelled against miserable ghetto housing, corrupt slumlords, and aggressive white police forces. Investigating the unprecedented urban turmoil, the presidentially appointed [Kerner Commission] issued a scathing report in 1968, warning that the nation was rapidly 'moving toward two societies, one black, one white—separate and unequal'. The commission made clear that northern cities suffered not from southern Jim Crow laws, but from entrenched [De Facto Segregation] enforced by predatory bank redlining and job discrimination. Instead of funding the commission's sweeping recommendations for billions in federal housing and school investment, white suburban voters experienced a furious [White Backlash], embracing Richard Nixon's conservative 'law and order' campaign in the 1968 presidential election.",
    causal_domino_spine: {
      title: 'The Urban Riots & The Kerner Commission (1965–1968): 5-Stage Causal Domino Chain',
      subtitle: 'Edexcel Paper 3 Analytical Strategy for Causation & Historical Significance',
      exam_strategy:
        'Examine the underlying structural causes of northern urban unrest and the political reaction that followed.',
      stages: [
        {
          step: 1,
          date: '1960–1965',
          title: 'The Reality of Northern Ghetto Life',
          actor: 'Northern Black Urban Communities',
          tag: 'Structural Inequality',
          trigger:
            'Millions of Black migrants in northern cities face de facto segregation, decayed housing, predatory slumlords, and 40% youth unemployment.',
          because:
            'Banks practiced redlining to deny mortgages in Black neighborhoods, while white-dominated unions excluded Black workers from trades.',
          therefore:
            'Created deep frustration among urban youth who realized that Southern civil rights laws did nothing to improve northern economic despair.',
          connective:
            'This powder keg of resentment needed only a tiny spark of police brutality to ignite...',
          exam_link:
            'Significance: Exposed the failure of the Southern legislative approach to solve northern economic and housing apartheid.',
        },
        {
          step: 2,
          date: '11–17 August 1965',
          title: 'The Watts Rebellion in Los Angeles',
          actor: 'Watts Residents & LAPD',
          tag: 'Urban Uprising',
          trigger:
            'The arrest of young Black driver Marquette Frye by California highway patrol sparks a riot that engulfs the Watts district for six days.',
          because:
            "Decades of heavy-handed policing by Chief William Parker's LAPD treated Black neighborhoods as occupied enemy territory.",
          therefore:
            'Resulted in 34 deaths, 1,000 injuries, and 3,000 arrests, forcing 14,000 National Guardsmen to impose a military curfew.',
          connective:
            'Watts was not an isolated incident, but the opening salvo of three years of summer unrest...',
          exam_link:
            'Significance: Shattered the illusion that racial conflict was confined to the Jim Crow South.',
        },
        {
          step: 3,
          date: 'July 1967',
          title: 'The Detroit Rebellion',
          actor: 'Detroit Residents & Federal Troops',
          tag: 'Bloodiest Rebellion',
          trigger:
            'Police raid an unlicensed after-hours bar on 12th Street, sparking five days of rebellion that killed 43 people and destroyed 2,000 buildings.',
          because:
            'Despite Detroit having a liberal mayor, Black residents were excluded from skilled automotive jobs and abused by the all-white police force.',
          therefore:
            'President Johnson dispatched 82nd Airborne paratroopers and tanks to regain control of an American industrial metropolis.',
          connective:
            'Terrified by the scale of nationwide urban combustion, the White House launched an official investigation...',
          exam_link:
            'Significance: The deadliest domestic civil disturbance in the United States since the Civil War.',
        },
        {
          step: 4,
          date: 'March 1968',
          title: 'The Kerner Commission Findings',
          actor: "Governor Otto Kerner's Commission",
          tag: 'Indictment of White Racism',
          trigger:
            "The Kerner Commission releases its report, bluntly concluding: 'Our nation is moving toward two societies, one black, one white—separate and unequal.'",
          because:
            'Thorough field investigations proved that riots were spontaneous reactions to white racism, police brutality, and institutional neglect.',
          therefore:
            'Recommended billions in federal spending for 2 million jobs, 6 million low-income housing units, and aggressive school integration.',
          connective:
            'Rather than investing in urban renewal, white suburban voters reacted with defensive hostility...',
          exam_link:
            'Significance: The most honest official federal indictment of white institutional racism in American history.',
        },
        {
          step: 5,
          date: 'November 1968',
          title: "White Backlash & Nixon's Victory",
          actor: "Richard Nixon & The 'Silent Majority'",
          tag: 'Conservative Pivot',
          trigger:
            "Richard Nixon wins the 1968 presidency campaigning on 'Law and Order' and an anti-busing 'Southern Strategy'.",
          because:
            'White suburban voters felt threatened by black militant rhetoric, burning cities, and liberal court decisions.',
          therefore:
            'Halted federal Great Society urban funding expansion and pivoted national priorities toward aggressive law enforcement and policing.',
          connective:
            'The election signaled the close of the liberal reform era and ushered in a decades-long conservative ascendancy...',
          exam_link:
            "Significance: Transformed American presidential politics, solidifying the Republican party's grip on the Sunbelt and white suburbs.",
        },
      ],
    },
  },

  lesson_3_4: {
    vocab: [
      {
        term: "Poor People's Campaign",
        def: "Martin Luther King Jr.'s 1968 multiracial crusade demanding an Economic Bill of Rights, living wages, and federal anti-poverty legislation.",
        definition:
          "Martin Luther King Jr.'s 1968 multiracial crusade demanding an Economic Bill of Rights, living wages, and federal anti-poverty legislation.",
      },
      {
        term: 'Memphis Sanitation Strike',
        def: "The early 1968 strike by 1,300 Black sanitation workers carrying 'I AM A MAN' placards that brought Dr. King to Memphis.",
        definition:
          "The early 1968 strike by 1,300 Black sanitation workers carrying 'I AM A MAN' placards that brought Dr. King to Memphis.",
      },
      {
        term: 'James Earl Ray',
        def: 'The escaped white convict and racist who assassinated Dr. Martin Luther King Jr. at the Lorraine Motel on 4 April 1968.',
        definition:
          'The escaped white convict and racist who assassinated Dr. Martin Luther King Jr. at the Lorraine Motel on 4 April 1968.',
      },
      {
        term: '1968 Holy Week Uprisings',
        def: "The immediate wave of violent unrest that erupted in over 100 American cities following Dr. King's murder, requiring 45,000 federal soldiers.",
        definition:
          "The immediate wave of violent unrest that erupted in over 100 American cities following Dr. King's murder, requiring 45,000 federal soldiers.",
      },
      {
        term: 'Movement Fragmentation',
        def: 'The fracturing of the civil rights coalition after 1968 between moderate legalists, non-violent pastors, and armed Black Power separatists.',
        definition:
          'The fracturing of the civil rights coalition after 1968 between moderate legalists, non-violent pastors, and armed Black Power separatists.',
      },
    ],
    vocab_cloze_text:
      "In the final months of his life, Martin Luther King Jr. broadened his vision from southern desegregation to radical economic equality, organizing the multiracial [Poor People's Campaign] to demand federal guarantees for decent jobs and income. In March 1968, he traveled to Tennessee to march alongside 1,300 striking garbage workers in the [Memphis Sanitation Strike], who marched proudly wearing placards proclaiming 'I AM A MAN'. On the evening of 4 April 1968, King stepped onto the balcony of the Lorraine Motel and was shot dead by white supremacist sniper [James Earl Ray]. News of the murder detonated grief and fury across the country, unleashing the [1968 Holy Week Uprisings] in more than 100 American cities, including Washington DC and Chicago, which required 45,000 military troops to restore order. The loss of King's unifying moral voice accelerated the [Movement Fragmentation], as the traditional alliance between non-violent Christian ministers, white liberals, and militant youth permanently splintered.",
    causal_domino_spine: {
      title:
        'The Assassination of MLK & The Fracturing of the Movement: 5-Stage Causal Domino Chain',
      subtitle: 'Edexcel Paper 3 Analytical Strategy for Causation & Historical Significance',
      exam_strategy:
        "Analyze the consequences of King's assassination on the unity, tactics, and legacy of the civil rights movement.",
      stages: [
        {
          step: 1,
          date: 'March 1968',
          title: 'King Joins the Memphis Sanitation Strike',
          actor: 'Martin Luther King Jr. & Sanitation Workers',
          tag: 'Labor & Dignity',
          trigger:
            'King travels to Memphis, Tennessee to support 1,300 Black municipal workers striking over miserable pay and dangerous working conditions.',
          because:
            'Two workers were crushed to death by a malfunctioning garbage truck compactor, symbolizing systemic contempt for Black laborers.',
          therefore:
            "Drew national attention to the economic frontline of civil rights and delivered his prophetic 'I've Been to the Mountaintop' address.",
          connective: 'The following evening, as he prepared to attend dinner, tragedy struck...',
          exam_link:
            "Significance: Highlighted King's evolution into a champion of labor rights and democratic socialism.",
        },
        {
          step: 2,
          date: '4 April 1968',
          title: 'The Assassination at the Lorraine Motel',
          actor: 'James Earl Ray & Martin Luther King Jr.',
          tag: 'The Fatal Shot',
          trigger:
            'King is assassinated by a single rifle bullet fired by white supremacist James Earl Ray while standing on his motel balcony.',
          because:
            'Ray was a virulent racist motivated by deep hatred of civil rights progress and racial equality.',
          therefore:
            'Robbed the civil rights movement of its paramount moral leader, greatest orator, and chief architect of non-violent coalition politics.',
          connective:
            'News of the execution of the apostle of non-violence sparked instantaneous national rage...',
          exam_link:
            'Significance: The single most devastating leadership loss in the modern history of American social movements.',
        },
        {
          step: 3,
          date: '4–11 April 1968',
          title: 'The 1968 Holy Week Rebellions',
          actor: 'Urban Communities Nationwide',
          tag: 'National Firestorm',
          trigger:
            'Uprisings erupt in over 110 cities; smoke rises within sight of the White House as 45,000 troops occupy American streets.',
          because:
            "Millions of Black Americans felt heartbroken despair and concluded that King's dream of non-violent progress was dead.",
          therefore:
            'Left 43 dead, thousands injured, and entire commercial corridors destroyed in Washington, Baltimore, Chicago, and Kansas City.',
          connective:
            "In a desperate bid to honor King's memory and quiet the burning cities, Congress rushed landmark legislation...",
          exam_link:
            "Significance: Demonstrated the immense emotional devastation and volcanic anger caused by King's murder.",
        },
        {
          step: 4,
          date: '11 April 1968',
          title: 'The Civil Rights Act of 1968 Passes',
          actor: 'President Johnson & Congress',
          tag: 'Memorial Legislation',
          trigger:
            "President Johnson signs the Civil Rights Act of 1968, containing Title VIII fair housing provisions, just one week after King's death.",
          because:
            "Congress realized that passing King's stalled fair housing legislation was the only way to demonstrate federal goodwill during the crisis.",
          therefore:
            'Federally prohibited housing discrimination, completing the core legislative trilogy of the civil rights revolution.',
          connective:
            'Despite this final legislative triumph, the civil rights movement lost its central cohesion...',
          exam_link:
            'Significance: The final monumental legislative achievement of the classic civil rights era.',
        },
        {
          step: 5,
          date: '1968–1975',
          title: 'Permanent Movement Fragmentation',
          actor: 'SCLC, SNCC, NAACP & Black Panthers',
          tag: 'Fractured Legacy',
          trigger:
            'The coalition divides into competing factions: NAACP legalists, disillusioned SCLC ministers, and militant Black Panthers.',
          because:
            "Without King's moral stature to bridge the gap between white donors, federal officials, and young militants, unity was impossible.",
          therefore:
            'The era of mass Southern direct action concluded, shifting to local electoral politics, Black mayors, and cultural empowerment.',
          connective:
            'Yet the achievements of the movement remained permanent: Jim Crow was buried and Black political power was forever established...',
          exam_link:
            'Significance: Marked the transition from the heroic direct action era to contemporary electoral and institutional civil rights struggles.',
        },
      ],
    },
  },

  lesson_4_1: {
    vocab: [
      {
        term: 'Domino Theory',
        def: "President Eisenhower's foreign policy doctrine postulating that if South Vietnam fell to communism, neighboring Southeast Asian nations would topple like dominoes.",
        definition:
          "President Eisenhower's foreign policy doctrine postulating that if South Vietnam fell to communism, neighboring Southeast Asian nations would topple like dominoes.",
      },
      {
        term: 'Geneva Accords',
        def: 'The 1954 treaty that temporarily partitioned Vietnam at the 17th Parallel and scheduled nationwide reunification elections for 1956.',
        definition:
          'The 1954 treaty that temporarily partitioned Vietnam at the 17th Parallel and scheduled nationwide reunification elections for 1956.',
      },
      {
        term: 'Ngo Dinh Diem',
        def: 'The autocratic Catholic, anti-communist leader of South Vietnam backed by the US who refused to hold reunification elections in 1956.',
        definition:
          'The autocratic Catholic, anti-communist leader of South Vietnam backed by the US who refused to hold reunification elections in 1956.',
      },
      {
        term: 'Vietcong (NLF)',
        def: 'The communist guerrilla movement formed in 1960 in South Vietnam to overthrow Diem and unify the nation under Ho Chi Minh.',
        definition:
          'The communist guerrilla movement formed in 1960 in South Vietnam to overthrow Diem and unify the nation under Ho Chi Minh.',
      },
      {
        term: 'Strategic Hamlet Program',
        def: 'The joint US-South Vietnamese initiative that forcibly relocated rural peasants into barbed-wire stockade villages, alienating the countryside.',
        definition:
          'The joint US-South Vietnamese initiative that forcibly relocated rural peasants into barbed-wire stockade villages, alienating the countryside.',
      },
    ],
    vocab_cloze_text:
      'Following the humiliating defeat of French colonial forces at Dien Bien Phu in 1954, world powers signed the [Geneva Accords], temporarily dividing the country at the 17th Parallel into communist North Vietnam and non-communist South Vietnam. Convinced of the Cold War [Domino Theory]—the belief that if Vietnam fell to communism, all of Southeast Asia would collapse—the United States pumped hundreds of millions of dollars into supporting southern president [Ngo Dinh Diem]. However, Diem was an autocratic, corrupt ruler who favored his Catholic minority, cancelled the scheduled 1956 national reunification elections, and violently crushed peasant dissidents. In response, southern communist insurgents united with Northern backing in 1960 to form the [Vietcong (NLF)], launching an effective rural guerrilla war. To isolate the guerrillas from rural villagers, Diem and American advisers introduced the deeply unpopular [Strategic Hamlet Program] in 1962, which forcibly uprooted peasants from their ancestral farming lands and deepened peasant sympathy for the communist rebellion.',
    causal_domino_spine: {
      title: 'US Entanglement & The Rise of the Vietcong (1954–1963): 5-Stage Causal Domino Chain',
      subtitle: 'Edexcel Paper 3 Analytical Strategy for Causation & Historical Significance',
      exam_strategy:
        'Trace how Cold War ideology and flawed support for Diem led to direct US military escalation in Vietnam.',
      stages: [
        {
          step: 1,
          date: 'May–July 1954',
          title: 'Dien Bien Phu & The Geneva Accords',
          actor: 'Viet Minh & World Powers',
          tag: 'Colonial Collapse',
          trigger:
            'Communist forces defeat France at Dien Bien Phu; the Geneva Accords temporarily partition Vietnam at the 17th Parallel.',
          because:
            'France could no longer sustain its colonial war, and the superpowers sought a compromise to avoid direct nuclear conflict.',
          therefore:
            "Created two separate regimes: Ho Chi Minh's communist North and a Western-backed regime in the South, promising 1956 elections.",
          connective:
            'Terrified that Ho Chi Minh would easily win a democratic election, the US intervened to back an alternative ruler...',
          exam_link:
            'Significance: Created the artificial partition of Vietnam that set the stage for twenty years of military conflict.',
        },
        {
          step: 2,
          date: '1955–1956',
          title: 'Diem Rejects National Elections',
          actor: 'Ngo Dinh Diem & US Government',
          tag: 'Election Sabotage',
          trigger:
            'With US blessing, Diem cancels the 1956 nationwide reunification elections mandated by the Geneva Accords.',
          because:
            'US intelligence estimated that Ho Chi Minh would win over 80% of the vote across both North and South.',
          therefore:
            'Destroyed any peaceful path to national reunification and convinced northern communists that armed struggle was necessary.',
          connective:
            "Having canceled elections, Diem's corrupt regime alienated its own population...",
          exam_link:
            'Significance: Made a civil war for national reunification mathematically inevitable.',
        },
        {
          step: 3,
          date: 'December 1960',
          title: 'Founding of the Vietcong (NLF)',
          actor: 'Southern Insurgents & North Vietnam',
          tag: 'Guerrilla Formation',
          trigger:
            "Southern communist guerrillas formally establish the National Liberation Front (Vietcong) to overthrow Diem's regime.",
          because:
            "Diem's brutal anti-communist roundups and persecution of dissidents drove peasant opposition into armed insurgency.",
          therefore:
            'Created an elusive rural guerrilla army operating throughout South Vietnam, funded and armed via the Ho Chi Minh Trail.',
          connective:
            'In desperation to contain the guerrilla uprising, the US and Diem launched rural relocation schemes...',
          exam_link:
            'Significance: Established the primary military adversary that US combat forces would battle in the jungles of Vietnam.',
        },
        {
          step: 4,
          date: '1962–1963',
          title: 'Failure of the Strategic Hamlets',
          actor: 'Diem Regime & US Military Assistance',
          tag: 'Alienating Peasants',
          trigger:
            "The South Vietnamese government forcibly moves millions of peasants into fortified, barbed-wire 'strategic hamlets'.",
          because:
            'Military planners believed that fencing off villages would deny Vietcong guerrillas food, intelligence, and recruits.',
          therefore:
            'Outraged peasants who resented forced labor and separation from family ancestral graves, turning whole villages toward the Vietcong.',
          connective:
            'Peasant outrage exploded into urban chaos when Diem turned against the Buddhist majority...',
          exam_link:
            'Significance: Backfired disastrously, accelerating Vietcong penetration of the South Vietnamese countryside.',
        },
        {
          step: 5,
          date: 'November 1963',
          title: 'The Overthrow & Execution of Diem',
          actor: 'ARVN Generals & CIA',
          tag: "Coup d'État",
          trigger:
            'Following public self-immolations by Buddhist monks, South Vietnamese generals overthrow and assassinate Diem with CIA foreknowledge.',
          because:
            "President Kennedy realized Diem's tyranny made winning the war impossible and was discrediting the US internationally.",
          therefore:
            'Created severe political instability in Saigon, with ten successive military juntas ruling in eighteen months.',
          connective:
            'With the South Vietnamese government in total collapse, the US was forced to choose between abandoning Saigon or sending troops...',
          exam_link:
            'Significance: Left South Vietnam leaderless and directly propelled Lyndon Johnson into massive direct US military escalation.',
        },
      ],
    },
  },

  lesson_4_2: {
    vocab: [
      {
        term: 'Gulf of Tonkin Resolution',
        def: "The August 1964 congressional act authorising President Johnson to 'take all necessary measures' in Vietnam, effectively a blank check for war.",
        definition:
          "The August 1964 congressional act authorising President Johnson to 'take all necessary measures' in Vietnam, effectively a blank check for war.",
      },
      {
        term: 'Operation Rolling Thunder',
        def: 'The sustained, three-year US aerial bombardment campaign against North Vietnam from 1965 to 1968.',
        definition:
          'The sustained, three-year US aerial bombardment campaign against North Vietnam from 1965 to 1968.',
      },
      {
        term: 'Da Nang Landing',
        def: 'The arrival of 3,500 US Marines at Da Nang on 8 March 1965, marking the introduction of US direct ground combat troops.',
        definition:
          'The arrival of 3,500 US Marines at Da Nang on 8 March 1965, marking the introduction of US direct ground combat troops.',
      },
      {
        term: 'General William Westmoreland',
        def: 'The supreme commander of US forces in Vietnam who implemented a strategy of attrition based on superior firepower and enemy body counts.',
        definition:
          'The supreme commander of US forces in Vietnam who implemented a strategy of attrition based on superior firepower and enemy body counts.',
      },
      {
        term: 'The Military Draft',
        def: 'The conscription system that drafted hundreds of thousands of young American men (average age 19) into combat, sparking anti-war resistance.',
        definition:
          'The conscription system that drafted hundreds of thousands of young American men (average age 19) into combat, sparking anti-war resistance.',
      },
    ],
    vocab_cloze_text:
      "In August 1964, following skirmishes involving the USS Maddox off North Vietnam, President Johnson persuaded Congress to pass the [Gulf of Tonkin Resolution], which granted the executive branch virtually unchecked constitutional authority to wage full-scale war without a formal declaration. In February 1965, after a deadly Vietcong mortar strike on the US barracks at Pleiku, Johnson unleashed [Operation Rolling Thunder], a devastating three-year air bombardment dropping a million tons of bombs on North Vietnamese military infrastructure. Recognizing that air bases required ground defense, Johnson ordered the historic [Da Nang Landing] on 8 March 1965, sending the first 3,500 US Marines ashore and fundamentally shifting the American role from advisory support to direct combat. US commander [General William Westmoreland] instituted a bloody war of attrition, deploying massive artillery and air superiority to inflict more casualties than the enemy could replace ('body count'). To sustain the ballooning troop levels, which surpassed 500,000 soldiers by 1968, the government expanded [The Military Draft], which conscripted working-class nineteen-year-olds while wealthier students used college deferments, triggering furious anti-war protests across American campuses.",
    causal_domino_spine: {
      title:
        'Escalation & The Commitment of Ground Combat Troops (1964–1965): 5-Stage Causal Domino Chain',
      subtitle: 'Edexcel Paper 3 Analytical Strategy for Causation & Historical Significance',
      exam_strategy:
        'Trace how dubious naval reports triggered presidential war powers and led to a half-million American soldiers in Vietnam.',
      stages: [
        {
          step: 1,
          date: '2–4 August 1964',
          title: 'The Gulf of Tonkin Incident',
          actor: 'USS Maddox & North Vietnamese Torpedo Boats',
          tag: 'Naval Clashes',
          trigger:
            'Reports claim North Vietnamese patrol boats fired torpedoes at US destroyers in the Gulf of Tonkin in murky weather.',
          because:
            'US warships were conducting covert electronic surveillance missions aiding South Vietnamese commando raids on northern islands.',
          therefore:
            'Provided President Johnson with the pretext he needed to demonstrate firmness against communism before the 1964 election.',
          connective: 'Johnson immediately presented the alleged unprovoked attack to Congress...',
          exam_link:
            'Significance: The controversial triggering event used to justify total American military intervention in Southeast Asia.',
        },
        {
          step: 2,
          date: '7 August 1964',
          title: 'The Gulf of Tonkin Resolution Passes',
          actor: 'US Congress & President Johnson',
          tag: 'Blank Check for War',
          trigger:
            "Congress overwhelmingly passes the Tonkin Resolution (416-0 in House, 88-2 in Senate) authorising 'all necessary measures'.",
          because:
            "Congressmen believed the administration's claims of unprovoked aggression and rallied around the flag.",
          therefore:
            'Surrendered constitutional war-making powers to the President, enabling LBJ to escalate without congressional oversight.',
          connective:
            'When Vietcong guerrillas attacked an American air base at Pleiku in February 1965, Johnson used his new war powers...',
          exam_link:
            'Significance: The functional equivalent of a declaration of war that enabled unilateral executive military escalation.',
        },
        {
          step: 3,
          date: 'March 1965',
          title: 'Operation Rolling Thunder Begins',
          actor: 'US Air Force & Navy Bombers',
          tag: 'Strategic Bombing',
          trigger:
            'The US launches Operation Rolling Thunder, a continuous 3-year strategic bombing offensive against North Vietnam.',
          because:
            'Military chiefs claimed intensive bombing would destroy northern industry and force Ho Chi Minh to halt aid to the Vietcong.',
          therefore:
            'Dropped more tonnage of explosives on Vietnam than was dropped in all of World War II, but failed to break North Vietnamese resolve.',
          connective:
            'To protect the jet air bases from mortar attacks, commanders insisted that ground troops were required...',
          exam_link:
            'Significance: Marked the transition from retaliatory pin-prick strikes to total, systemic aerial warfare.',
        },
        {
          step: 4,
          date: '8 March 1965',
          title: 'US Marines Land at Da Nang',
          actor: '3,500 US Marines',
          tag: 'Ground Combat Deployment',
          trigger:
            'The first US combat troops wade ashore at Da Nang beaches with rifles ready, greeted by local schoolgirls with floral leis.',
          because:
            'General Westmoreland convinced Johnson that South Vietnamese troops were incapable of defending strategic American airfields.',
          therefore:
            'Crossed the Rubicon from an advisory mission to direct American ground warfare on the Asian mainland.',
          connective:
            'Once ground troops were deployed, their role rapidly expanded from base defense to active hunting...',
          exam_link:
            'Significance: The definitive transformation of the Vietnam conflict into an American ground war.',
        },
        {
          step: 5,
          date: '1965–1968',
          title: 'Massive Escalation & The Draft',
          actor: 'General Westmoreland & Selective Service',
          tag: '536,000 Troops',
          trigger:
            'Troop levels climb from 184,000 in 1965 to 536,000 by 1968; the draft calls up 40,000 teenagers every month.',
          because:
            "Westmoreland's strategy of attrition required massive manpower to locate and destroy Vietcong units across jungles.",
          therefore:
            'Disproportionately conscripted poor and working-class nineteen-year-olds, triggering massive draft-card burnings and campus riots.',
          connective:
            'This massive American army entered a deadly jungle war against an invisible, deeply entrenched guerrilla enemy...',
          exam_link:
            "Significance: Created the deep domestic political crisis that ultimately destroyed Lyndon Johnson's presidency.",
        },
      ],
    },
  },

  lesson_4_3: {
    vocab: [
      {
        term: 'Agent Orange',
        def: 'A toxic chemical defoliant containing dioxin sprayed over millions of acres of jungle to strip forest canopy and destroy food crops.',
        definition:
          'A toxic chemical defoliant containing dioxin sprayed over millions of acres of jungle to strip forest canopy and destroy food crops.',
      },
      {
        term: 'Ho Chi Minh Trail',
        def: 'The 16,000-kilometer logistical supply network through Laos and Cambodia funnelling weapons, munitions, and troops from North to South Vietnam.',
        definition:
          'The 16,000-kilometer logistical supply network through Laos and Cambodia funnelling weapons, munitions, and troops from North to South Vietnam.',
      },
      {
        term: 'Napalm',
        def: 'A highly flammable jellied petroleum bomb that clung to human skin and surfaces, creating catastrophic, incinerating fires.',
        definition:
          'A highly flammable jellied petroleum bomb that clung to human skin and surfaces, creating catastrophic, incinerating fires.',
      },
      {
        term: 'Search and Destroy',
        def: 'US combat doctrine where helicopter-borne platoons raided villages to locate Vietcong, burn settlements, and count enemy dead.',
        definition:
          'US combat doctrine where helicopter-borne platoons raided villages to locate Vietcong, burn settlements, and count enemy dead.',
      },
      {
        term: 'Cu Chi Tunnels',
        def: 'An extensive 250-kilometer multi-level underground tunnel complex that sheltered Vietcong fighters from US air strikes and artillery.',
        definition:
          'An extensive 250-kilometer multi-level underground tunnel complex that sheltered Vietcong fighters from US air strikes and artillery.',
      },
    ],
    vocab_cloze_text:
      'In the dense tropical jungles of Vietnam, US troops struggled against an elusive enemy that avoided pitched conventional battles in favor of deadly booby traps and surprise ambushes. Vietcong guerrillas took refuge in the multi-tiered [Cu Chi Tunnels], an underground labyrinth containing command bunkers, hospitals, and weapons caches immune to conventional bombing. The lifeblood of the southern insurgency was the [Ho Chi Minh Trail], a 16,000-kilometer network of camouflaged roads and paths through neutral Laos and Cambodia that funneled continuous supplies and North Vietnamese army regulars into the South. To expose the concealed trail and jungle hideouts, the US Air Force dumped 19 million gallons of [Agent Orange], a toxic defoliant that poisoned waterways, devastated agriculture, and caused severe birth defects. US aircraft also dropped [Napalm], a gelatinous petroleum incendiary that adhered to skin and burned at 1,000 degrees Celsius, incinerating entire forest clearings. On the ground, American infantries were tasked with grueling [Search and Destroy] missions, flying into isolated hamlets in helicopters to eradicate hidden guerrilla caches and torch sympathizer huts with Zippo lighters, generating widespread peasant resentment.',
    causal_domino_spine: {
      title: 'Jungle Warfare & Asymmetric Tactics: 5-Stage Causal Domino Chain',
      subtitle: 'Edexcel Paper 3 Analytical Strategy for Causation & Historical Significance',
      exam_strategy:
        'Evaluate how guerrilla warfare neutralized US technological superiority and led to military stalemate.',
      stages: [
        {
          step: 1,
          date: '1965–1968',
          title: 'Vietcong Asymmetric Guerrilla Tactics',
          actor: 'Vietcong & NVA Soldiers',
          tag: 'Guerrilla Doctrine',
          trigger:
            "The Vietcong adopt hit-and-run ambushes, punji-stick booby traps, and 'hanging onto the belts' of US troops in close combat.",
          because:
            'They recognized they could never defeat the US in open conventional battle due to American air and artillery superiority.',
          therefore:
            'Terrified American soldiers who never knew when a sniper, tripwire, or concealed landmine would strike, grinding down troop morale.',
          connective: 'To survive devastating US airstrikes, the guerrillas went underground...',
          exam_link:
            'Significance: Neutralized American technological dominance and denied the US army a visible target to destroy.',
        },
        {
          step: 2,
          date: '1960–1975',
          title: 'Construction of the Cu Chi Tunnels',
          actor: 'Vietcong Tunnel S在那ppers',
          tag: 'Underground Fortress',
          trigger:
            'Guerrillas dig a 250-kilometer network of multi-tiered underground tunnels beneath Cu Chi, right under the nose of US military headquarters.',
          because:
            'They needed bomb-proof living quarters, weapons factories, and surgical wards capable of withstanding B-52 carpet bombing.',
          therefore:
            'Allowed Vietcong fighters to emerge invisibly from trapdoors, ambush US patrols, and vanish back into the earth without a trace.',
          connective:
            'Guerrilla units were continuously supplied by an unstoppable logistical highway...',
          exam_link:
            'Significance: Proved the incredible resourcefulness and resilience of Vietnamese resistance against overwhelming firepower.',
        },
        {
          step: 3,
          date: '1959–1975',
          title: 'The Ho Chi Minh Trail Highway',
          actor: '300,000 Trail Workers & NVA',
          tag: 'Logistical Lifeline',
          trigger:
            'North Vietnam routes supplies and troops south via 16,000 kilometers of jungle roads traversing neutral Laos and Cambodia.',
          because:
            'Direct movement through the 17th Parallel was heavily guarded by American bases and sensor networks.',
          therefore:
            'Despite dropping millions of tons of bombs on the trail, the US could never choke off the flow of Soviet and Chinese weapons.',
          connective:
            'Frustrated by the invisible enemy, the US military turned to chemical defoliation...',
          exam_link:
            'Significance: Ensured that the communist insurgency in the South could never be starved of munitions or reinforcements.',
        },
        {
          step: 4,
          date: '1962–1971',
          title: 'Operation Ranch Hand (Chemical Defoliation)',
          actor: "US Air Force 'Defoliators'",
          tag: 'Ecological Warfare',
          trigger:
            'US planes spray 19 million gallons of Agent Orange and Agent Blue over South Vietnamese jungles and crop fields.',
          because:
            'Commanders believed that stripping away the dense jungle canopy would eliminate Vietcong concealment and starve their units.',
          therefore:
            'Destroyed 5 million acres of forest, poisoned food crops, and caused generational cancers and severe birth defects among villagers and US veterans.',
          connective:
            'On the ground, foot patrols implemented scorched-earth tactics in suspected villages...',
          exam_link:
            'Significance: Severely damaged the moral reputation of the United States and alienated millions of Vietnamese civilians.',
        },
        {
          step: 5,
          date: '1965–1968',
          title: "Search & Destroy ('Zippo Raids')",
          actor: 'US Infantry Platoons',
          tag: 'Alienating the Populace',
          trigger:
            'US troops conduct Search and Destroy raids, evacuating civilians and setting fire to thatched huts with Zippo lighters.',
          because:
            "Commanders demanded high 'body counts' and believed burning suspected villages denied shelter to roaming Vietcong fighters.",
          therefore:
            'Rendered millions of peasants homeless refugees, driving thousands of young Vietnamese into the arms of the Vietcong.',
          connective:
            'This growing stalemate burst into catastrophic national crisis during the lunar new year of 1968...',
          exam_link:
            "Significance: Highlighted the fatal contradiction of destroying South Vietnamese villages in order to 'save' them.",
        },
      ],
    },
  },

  lesson_4_4: {
    vocab: [
      {
        term: 'Tet Offensive',
        def: 'The massive January 1968 surprise assault by 84,000 communist troops striking over 100 South Vietnamese towns, cities, and the US Embassy.',
        definition:
          'The massive January 1968 surprise assault by 84,000 communist troops striking over 100 South Vietnamese towns, cities, and the US Embassy.',
      },
      {
        term: 'Credibility Gap',
        def: 'The chasm between optimistic official government claims of imminent victory and the bleak reality of brutal stalemate seen on television.',
        definition:
          'The chasm between optimistic official government claims of imminent victory and the bleak reality of brutal stalemate seen on television.',
      },
      {
        term: 'My Lai Massacre',
        def: 'The March 1968 war crime where Charlie Company soldiers under Lieutenant William Calley slaughtered over 500 unarmed Vietnamese civilians.',
        definition:
          'The March 1968 war crime where Charlie Company soldiers under Lieutenant William Calley slaughtered over 500 unarmed Vietnamese civilians.',
      },
      {
        term: 'Vietnamization',
        def: "President Richard Nixon's policy announced in 1969 to withdraw US combat ground forces and train South Vietnamese (ARVN) troops to fight alone.",
        definition:
          "President Richard Nixon's policy announced in 1969 to withdraw US combat ground forces and train South Vietnamese (ARVN) troops to fight alone.",
      },
      {
        term: 'Fall of Saigon',
        def: 'The capture of the South Vietnamese capital by North Vietnamese tanks on 30 April 1975, ending the war and unifying Vietnam under communism.',
        definition:
          'The capture of the South Vietnamese capital by North Vietnamese tanks on 30 April 1975, ending the war and unifying Vietnam under communism.',
      },
    ],
    vocab_cloze_text:
      'In the early morning hours of 31 January 1968, communist forces detonated the decisive turning point of the war with the massive [Tet Offensive], simultaneously attacking over 100 South Vietnamese towns, military bases, and even breaching the US Embassy compound in Saigon. Although the offensive was a catastrophic tactical defeat for the Vietcong—costing them roughly 40,000 veteran fighters—it shattered American home front morale by exposing an enormous [Credibility Gap] between official claims of impending victory and the gritty televised combat. Public horror deepened in late 1969 when investigative journalists revealed the [My Lai Massacre], in which US troops under Lieutenant William Calley had murdered over 500 unarmed women, infants, and old men in cold blood. To disengage from the quagmire, newly elected President Nixon introduced [Vietnamization], withdrawing over 500,000 American ground soldiers while vastly expanding secret bombing campaigns into neutral Cambodia. Following the 1973 Paris Peace Accords, American combat forces withdrew; two years later, without US air support, South Vietnam collapsed during the [Fall of Saigon] on 30 April 1975 as communist tanks crashed through the gates of the Presidential Palace.',
    causal_domino_spine: {
      title:
        'The Tet Turning Point, Peace Accords & The Fall of Saigon (1968–1975): 5-Stage Causal Domino Chain',
      subtitle: 'Edexcel Paper 3 Analytical Strategy for Causation & Historical Significance',
      exam_strategy:
        'Evaluate how the Tet shockwave transformed American public opinion and led to the collapse of South Vietnam.',
      stages: [
        {
          step: 1,
          date: '31 January 1968',
          title: 'The Tet Offensive Shockwave',
          actor: '84,000 Vietcong & NVA Soldiers',
          tag: 'The Turning Point',
          trigger:
            'Communist forces launch a simultaneous surprise attack on over 100 cities, provincial capitals, and the US Embassy during the lunar new year truce.',
          because:
            'Hanoi hoped to spark a general urban uprising that would overthrow the South Vietnamese government and expel the Americans.',
          therefore:
            'While militarily disastrous for the Vietcong, it proved to the American public that the war was deadlocked and unwinnable.',
          connective:
            "The shock of Tet broke the administration's political credibility beyond repair...",
          exam_link:
            'Significance: The psychological and political turning point of the Vietnam War.',
        },
        {
          step: 2,
          date: 'February–March 1968',
          title: 'The Cronkite Verdict & LBJ Steps Down',
          actor: 'Walter Cronkite & Lyndon B. Johnson',
          tag: 'Political Resignation',
          trigger:
            'Legendary CBS news anchor Walter Cronkite reports that the war is mired in stalemate; LBJ declares he will not seek re-election.',
          because:
            "Johnson famously remarked, 'If I've lost Cronkite, I've lost Middle America,' recognizing his political support had evaporated.",
          therefore:
            "Opened the door for Richard Nixon to win the presidency on promises of 'peace with honor'.",
          connective: 'As peace talks opened, atrocities from 1968 came to light...',
          exam_link:
            'Significance: Destroyed the political career of President Johnson and ended unlimited escalation.',
        },
        {
          step: 3,
          date: 'November 1969',
          title: 'Exposure of the My Lai Massacre',
          actor: 'Seymour Hersh & Charlie Company',
          tag: 'Moral Crisis',
          trigger:
            'Journalist Seymour Hersh reveals that US soldiers murdered 504 unarmed Vietnamese civilians in the village of My Lai.',
          because:
            'Charlie Company was traumatized by unseen booby traps and instructed by officers that everyone in the village was hostile.',
          therefore:
            'Horrified the American public, destroyed the moral authority of the war, and fueled massive 500,000-person anti-war marches.',
          connective: 'Facing unprecedented anti-war fury, Nixon began phased troop withdrawals...',
          exam_link:
            'Significance: The most notorious war crime in modern American military history, permanently eroding public trust.',
        },
        {
          step: 4,
          date: '1969–1973',
          title: "Nixon's Vietnamization & Paris Accords",
          actor: 'Richard Nixon & Henry Kissinger',
          tag: 'Phased Withdrawal',
          trigger:
            'Nixon pulls out 500,000 US combat troops while bombing Cambodia; the Paris Peace Accords are signed in January 1973.',
          because:
            'The US could no longer sustain domestic unrest, rising drug abuse among soldiers, and economic inflation caused by war spending.',
          therefore:
            'All remaining US combat troops departed Vietnam and American POWs were released, leaving South Vietnam to defend itself.',
          connective:
            'Deprived of US air support and hobbled by corruption, South Vietnam could not survive on its own...',
          exam_link:
            'Significance: Allowed the United States to extract its ground forces while delaying the inevitable fall of the Saigon regime.',
        },
        {
          step: 5,
          date: '30 April 1975',
          title: 'The Fall of Saigon',
          actor: 'North Vietnamese Army Tanks',
          tag: 'Communist Triumph',
          trigger:
            'North Vietnamese tanks smash through the gates of the Presidential Palace in Saigon as US helicopters evacuate the last Americans.',
          because:
            "Congress refused President Ford's request for emergency military funds under the War Powers Act.",
          therefore:
            "South Vietnam unconditionally surrendered, reunifying the entire country under communist rule and completing America's first military defeat.",
          connective:
            'The war left 58,000 Americans and over 2 million Vietnamese dead, permanently reshaping American foreign policy...',
          exam_link:
            'Significance: The final, definitive conclusion of the Vietnam War, shattering the myth of American military invincibility.',
        },
      ],
    },
  },
};

function backfillUsaClozeAndDominos() {
  console.log(
    '📦 Backfilling USA 1954–75: Vocab, Cloze Texts & Causal Domino Spines across all 16 lessons...',
  );

  const targetFiles = [
    path.join(__dirname, '..', 'public', 'data', 'usa.json'),
    path.join(__dirname, '..', 'data', 'usa.json'),
  ];

  targetFiles.forEach((fp) => {
    if (fs.existsSync(fp)) {
      const data = JSON.parse(fs.readFileSync(fp, 'utf8'));
      const lessons = data.data?.lessons || data.lessons || [];

      lessons.forEach((l) => {
        if (USA_ENHANCEMENTS[l.id]) {
          const enh = USA_ENHANCEMENTS[l.id];
          l.vocab = enh.vocab;
          l.vocab_cloze_text = enh.vocab_cloze_text;
          l.causal_domino_spine = enh.causal_domino_spine;
        }
      });

      fs.writeFileSync(fp, JSON.stringify(data, null, 2), 'utf8');
      console.log(`  ✔ Injected vocab, cloze & domino spines into ${fp}`);
    }
  });

  // Also update units/usa/data.js
  const unitJs = path.join(__dirname, '..', 'units', 'usa', 'data.js');
  if (fs.existsSync(unitJs)) {
    try {
      const pubData = JSON.parse(fs.readFileSync(targetFiles[0], 'utf8'));
      const unitObj = pubData.data || pubData;
      const jsContent = `// USA 1954–75: Conflict at Home and Abroad Unit Data\nexport const unitData = ${JSON.stringify(unitObj, null, 2)};\nexport default unitData;\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = unitData;\n}\n`;
      fs.writeFileSync(unitJs, jsContent, 'utf8');
      console.log(`  ✔ Synchronized units/usa/data.js`);
    } catch (err) {
      console.warn(`  ⚠️ Could not update units/usa/data.js: ${err.message}`);
    }
  }

  console.log(
    `✅ USA 1954–75: Successfully enhanced all 16 lessons with vocab, cloze texts, and 5-stage causal domino spines.`,
  );
}

if (require.main === module) {
  backfillUsaClozeAndDominos();
}

module.exports = { backfillUsaClozeAndDominos, USA_ENHANCEMENTS };
