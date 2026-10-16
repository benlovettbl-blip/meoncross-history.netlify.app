/**
 * History Revision Hub — Weimar and Nazi Germany, 1918–1939
 * Migration: Key Topic 4 (Life in Nazi Germany, 1933–1939) to 5-Act Gold Standard & Digital Spine Parity
 *
 * Converts Key Topic 4 lessons 4.1 through 4.4 in units/weimar_nazi_germany/data.js:
 * 1. Structures narrative_blocks into 5 chronological Acts ([1.1] to [5.2]).
 * 2. Maps authentic primary visual sources to their respective Acts.
 * 3. Injects 5-stage `workbook_stages` matching WEIMAR_ENQUIRY_CONFIGS.KT4.
 * 4. Injects 5-stage `causal_domino_spine` with domino triggers, consequences, actors, and tags.
 * 5. Aligns `timeline_anchor` to 5 stages.
 * 6. Updates `teacher_notes` with 5 structured objectives & hinge questions.
 */

const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '..', 'units', 'weimar_nazi_germany', 'data.js');
const raw = require(dataFilePath);
const unitData = raw.default || raw;

console.log('Loaded weimar_nazi_germany unitData with', unitData.lessons.length, 'lessons.');

const KT4_5_ACT_DATA = {
  // --------------------------------------------------------------------------
  // LESSON 4.1: NAZI POLICIES TOWARDS WOMEN
  // --------------------------------------------------------------------------
  lesson_4_1: {
    teacher_notes: {
      primer:
        'This enquiry examines the deeply contradictory ideological and practical policies enacted by the Nazi regime towards German women between 1933 and 1939. Students explore the traditional patriarchal ideal summarized in the slogan Kinder, Küche, Kirche (Children, Kitchen, Church) and the removal of women from professional employment, the financial incentives of the 1933 Law for the Encouragement of Marriage, the eugenic obsession with population expansion via the Mother’s Cross (Mutterkreuz) and Lebensborn breeding clinics, the brutal enforcement of racial purity through forced sterilization under the 1933 Genetic Health Courts, and the dramatic policy reversal from 1937 when Hermann Göring’s Four-Year Plan and rearmament forced millions of women back into factories.',
      objectives: [
        {
          objective:
            'Explain the traditional domestic ideal of Kinder, Küche, Kirche and the systematic removal of women from professional careers.',
          primer:
            'Direct students to paragraphs [1.1]–[1.2]. Contrast Weimar-era female emancipation with Nazi measures banning female lawyers, doctors, civil servants, and university entrants, while dictating modest clothing and braided hair.',
          question:
            'Why did the Nazi regime seek to dismantle the educational and employment advances made by German women during the Weimar Republic?',
        },
        {
          objective:
            'Analyse how the Law for the Encouragement of Marriage (June 1933) combined pro-natalist incentives with unemployment reduction.',
          primer:
            'Direct students to paragraphs [2.1]–[2.2]. Detail the 1,000-mark interest-free marriage loans, the requirement that brides leave employment, and the 25% debt cancellation for each child born ("quartering out").',
          question:
            'How did marriage loans serve the dual purpose of removing women from the official jobless count and increasing the birth rate?',
        },
        {
          objective:
            'Assess how state honours like the Mother’s Cross and the Lebensborn programme aimed to expand the racially pure Aryan population.',
          primer:
            'Direct students to paragraphs [3.1]–[3.2] and Source A (Mother’s Cross award). Detail the bronze, silver, and gold medals awarded on Hitler’s mother’s birthday, alongside Heinrich Himmler’s Lebensborn maternity homes for racially selected SS offspring.',
          question:
            'How did the Mother’s Cross elevate childbearing into a militarized civic service for the German Reich?',
        },
        {
          objective:
            'Examine how eugenic legislation and the Law for the Prevention of Hereditarily Diseased Offspring enforced biological control.',
          primer:
            'Direct students to paragraphs [4.1]–[4.2]. Focus on the compulsory sterilization of over 300,000 women diagnosed with alleged hereditary illnesses, mental illness, alcoholism, or physical deformities by Genetic Health Courts.',
          question:
            'Why did Nazi family policy strictly distinguish between "valuable" Aryan mothers and "unworthy" citizens subjected to forced sterilization?',
        },
        {
          objective:
            'Evaluate the dramatic policy reversal after 1937 when Hermann Göring’s Four-Year Plan forced women back into industrial labour.',
          primer:
            'Direct students to paragraphs [5.1]–[5.2]. Explain how military conscription created an acute labor shortage, compelling the regime to introduce the compulsory Duty Year and recruit seven million women into armaments factories by 1939.',
          question:
            'Why was the Nazi regime forced to abandon its core domestic ideology concerning women when preparing for total war?',
        },
      ],
      source_context: {
        'Source A':
          'Source A: The Cross of Honour of the German Mother (Mutterkreuz) (c. 1938). Archival photograph of the gold, silver, and bronze Cross of Honour of the German Mother, an official state medal inscribed "The child ennobles the mother," awarded to women who bore four or more racially pure children. Hinge Question: How does the militaristic cross design of Source A demonstrate that the Nazi regime regarded childbearing as an equivalent patriotic service to frontline combat?',
      },
    },
    narrative_blocks: [
      {
        act: 1,
        title: 'Act 1: The Domestic Ideal: Kinder, Küche, Kirche (1933)',
        theme_heading: 'Act 1: The Domestic Ideal: Kinder, Küche, Kirche (1933)',
        text: '<span class="para-ref">[1.1]</span> The Nazi regime embraced a radically reactionary, patriarchal view of the role of women in society. While the Weimar Republic had granted women full voting rights, legal equality under Article 109, and unprecedented career opportunities in medicine, education, and politics, National Socialist ideology vehemently rejected female emancipation as an unnatural product of "Jewish-Bolshevik decadence." Hitler declared in a 1934 speech: "The world of the man is the state, his struggle, his readiness to devote his powers to the service of the community. The world of woman is her husband, her family, her children, and her home." The party promoted the traditional domestic trinity: <strong><em>Kinder, Küche, Kirche</em></strong> (Children, Kitchen, Church).<br><br><span class="para-ref">[1.2]</span> From 1933, the regime moved ruthlessly to purge women from public professional life. Female doctors, civil servants, and judges were summarily dismissed from their posts; female lawyers were barred from practicing law; and female representation in the Reichstag was abolished. In secondary education, female enrollment in universities was strictly capped at ten percent of the student body, and grammar school headmistresses were replaced by men. The regime also sought to dictate women’s physical appearance: the ideal German woman was expected to reject modern cosmopolitan fashion, wear no cosmetics or lipstick, avoid dyed or permed hair in favor of traditional braids or a bun, wear plain dirndl dresses, and abstain from smoking or dieting, which the regime claimed endangered reproductive fertility.',
      },
      {
        act: 2,
        title: 'Act 2: The Law for the Encouragement of Marriage (Jun 1933)',
        theme_heading: 'Act 2: The Law for the Encouragement of Marriage (Jun 1933)',
        text: '<span class="para-ref">[2.1]</span> A primary demographic obsession of the Nazi regime was reversing Germany’s falling birth rate, which had dropped from over two million births per year in 1900 to under one million by 1932. To expand the biological manpower needed for future agricultural colonization and military conquest, the government enacted the <strong>Law for the Encouragement of Marriage</strong> in June 1933. Under this scheme, newlywed couples were offered an interest-free state loan of up to <strong>1,000 marks</strong> (equivalent to roughly six months’ average wages) in the form of state vouchers to purchase furniture and essential household goods.<br><br><span class="para-ref">[2.2]</span> The loan carried two vital conditions designed to achieve dual economic and demographic objectives. First, to qualify, the bride had to give up her permanent employment and promise not to re-enter the labor market until the loan was repaid, immediately opening up jobs for unemployed men and artificially lowering the official unemployment figures. Second, for each child born to the couple, twenty-five percent of the loan debt was permanently cancelled (a process known colloquially as "abkindern," or "quartering out"). A couple having four children had their entire 1,000-mark debt forgiven. The scheme proved extraordinarily popular: between 1933 and 1937, over 800,000 newly married couples took out marriage loans, contributing to a noticeable temporary rise in the German birth rate.',
      },
      {
        act: 3,
        title: 'Act 3: The Mother’s Cross & Lebensborn Programme (1935–1938)',
        theme_heading: 'Act 3: The Mother’s Cross & Lebensborn Programme (1935–1938)',
        source: {
          id: 'source_a_mothers_cross',
          letter: 'A',
          title: 'Source A: The Cross of Honour of the German Mother (Mutterkreuz)',
          src: '/images/mothers_cross_award.jpg',
          source: '/images/mothers_cross_award.jpg',
          image: '/images/mothers_cross_award.jpg',
          caption:
            'The Cross of Honour of the German Mother (Mutterkreuz), awarded in bronze, silver, and gold to honour women who bore four or more racially pure Aryan children.',
          desc: 'Archival photograph of the Cross of Honour of the German Mother medal.',
          provenance:
            'Archival photograph of the Mutterkreuz medal, 1938. German Federal Archives (Bundesarchiv Bild 183-1988-0112-501).',
          citation: 'Bundesarchiv Bild 183-1988-0112-501, Mutterkreuz.',
          question:
            'How does the militaristic cross design of Source A demonstrate that the Nazi regime regarded childbearing as an equivalent patriotic service to frontline combat?',
          hinge_question:
            'How does the militaristic cross design of Source A demonstrate that the Nazi regime regarded childbearing as an equivalent patriotic service to frontline combat?',
          source_context:
            'Archival photograph of the gold, silver, and bronze Cross of Honour of the German Mother, an official state medal inscribed "The child ennobles the mother," awarded to women who bore four or more racially pure children. Hinge Question: How does the militaristic cross design of Source A demonstrate that the Nazi regime regarded childbearing as an equivalent patriotic service to frontline combat?',
          context:
            'Archival photograph of the Cross of Honour of the German Mother medal, c. 1938.',
        },
        text: '<span class="para-ref">[3.1]</span> To celebrate maternity as a heroic national sacrifice comparable to military service, the regime instituted prestigious state honours. In December 1938, Hitler created the <strong>Cross of Honour of the German Mother</strong> (<em>Mutterkreuz</em>) (<span class="archival-meta-tag">Source A</span>). Awarded annually on 12 August—the birthday of Hitler’s mother, Klara—the medal was modeled on the Iron Cross, suspended from a blue-and-white ribbon and inscribed on the reverse: <em>"Das Kind adelt die Mutter"</em> (The child ennobles the mother). It was conferred in three tiers: <strong>Bronze</strong> for bearing four or five children, <strong>Silver</strong> for six or seven, and <strong>Gold</strong> for eight or more. Medal-holders received special civic privileges: members of the Hitler Youth were required to salute them in the street, railway conductors vacated first-class seats for them, and shopkeepers served them ahead of long queues.<br><br><span class="para-ref">[3.2]</span> For Reichsführer-SS Heinrich Himmler, conventional marriage was insufficient to generate the required racial birth rate. In 1935, Himmler established the <strong>Lebensborn</strong> ("Fountain of Life") organization. Lebensborn operated discreet, luxurious maternity homes where unmarried, racially pure "Aryan" women were encouraged to bear children fathered by racially selected SS officers. The state provided financial upkeep and legal secrecy, adopting out the children to approved SS families. Approximately 11,000 children were born in Lebensborn homes in Germany and occupied Norway between 1935 and 1945, representing the extreme biological commodification of women for racial engineering.',
      },
      {
        act: 4,
        title: 'Act 4: Forced Sterilisation & Eugenic Control (1933–1935)',
        theme_heading: 'Act 4: Forced Sterilisation & Eugenic Control (1933–1935)',
        text: '<span class="para-ref">[4.1]</span> While fertile, racially "healthy" Aryan women were celebrated and rewarded, women deemed biologically or racially "inferior" suffered horrific persecution. Nazi population policy was founded on ruthless Social Darwinism and eugenics: the state sought not merely more children, but exclusively children of "pure German blood." On 14 July 1933, the government enacted the <strong>Law for the Prevention of Hereditarily Diseased Offspring</strong>. This legislation established over two hundred specialized "Genetic Health Courts" (<em>Erbgesundheitsgerichte</em>) empowered to order the compulsory surgical sterilization of any citizen diagnosed with alleged hereditary ailments.<br><br><span class="para-ref">[4.2]</span> Conditions targeted for mandatory sterilization included schizophrenia, manic depression, hereditary epilepsy, congenital blindness or deafness, severe physical deformities, and chronic alcoholism. Doctors, midwives, and welfare workers were legally required to report suspected individuals to health authorities. Between 1933 and 1939, over <strong>300,000 women and 100,000 men were compulsorily sterilized</strong> against their will via vasectomy or tubal ligation, resulting in severe physical complications and the deaths of hundreds of women. In October 1935, the <strong>Law for the Protection of the Hereditary Health of the German People</strong> took eugenic control a step further: couples applying for marriage certificates were compelled to undergo intrusive medical examinations to prove their genetic purity and freedom from mental illness before receiving a marriage license.',
      },
      {
        act: 5,
        title: 'Act 5: Rearmament Demands & The Policy Reversal (1937–1939)',
        theme_heading: 'Act 5: Rearmament Demands & The Policy Reversal (1937–1939)',
        text: '<span class="para-ref">[5.1]</span> By 1937, the ideological fantasy of keeping women confined to the domestic hearth collided violently with the harsh economic realities of total rearmament. In 1936, Hermann Göring launched the <strong>Four-Year Plan</strong>, demanding the mobilization of all national resources to prepare Germany for war by 1940. As hundreds of thousands of young men were conscripted into the expanding Wehrmacht and heavy munitions production quadrupled, German factories faced an acute, paralyzing labor shortage. Heavy industry desperately needed workers, and women represented the only available domestic labor reserve.<br><br><span class="para-ref">[5.2]</span> The regime was forced into an embarrassing ideological about-turn. In 1937, the government abolished the rule requiring women to give up their jobs when receiving marriage loans. In 1938, the regime introduced the compulsory <strong>"Duty Year"</strong> (<em>Pflichtjahr</em>), requiring all unmarried women under twenty-five to complete a year of unpaid labor on farms or in domestic service before entering paid employment, freeing rural men for military service. By the time the Second World War broke out in September 1939, over <strong>7.1 million German women were employed in factories, offices, and agriculture</strong>—representing thirty-seven percent of the entire workforce and nearly two million more working women than during the Weimar Republic. The regime’s domestic dogma had been ruthlessly discarded in the pursuit of military expansion.',
      },
    ],
    workbook_stages: [
      {
        stage: 1,
        dates: '1933',
        title: 'The Domestic Ideal: Kinder, Küche, Kirche',
        spec_focus:
          'Kinder, Küche, Kirche; dismissal of women from professions; female university quota.',
        focus_clue: 'How did the regime attempt to remove women from public professions?',
        para_ref: '[1.1–1.2]',
        bullets: [
          'Banning female lawyers, doctors, and civil servants',
          'Reversing Weimar era educational and workplace gains',
          'Wearing plain unvarnished faces and braided traditional hair',
        ],
        writing_frame: {
          connectives:
            'A primary ideological policy was... &bull; Specifically, the regime promoted... &bull; This impacted women because... &bull; Consequently, ...',
        },
      },
      {
        stage: 2,
        dates: 'Jun 1933',
        title: 'The Law for the Encouragement of Marriage',
        spec_focus:
          'Marriage loans (1,000 marks); abkindern debt relief; removal from unemployment counts.',
        focus_clue:
          'How were financial loans used to encourage childbearing and lower unemployment?',
        para_ref: '[2.1–2.2]',
        bullets: [
          'Offering thousand-mark interest-free vouchers to newlyweds',
          'Deducting twenty-five percent debt for each newborn infant',
          'Requiring bride to surrender permanent job upon wedding',
        ],
        writing_frame: {
          connectives:
            'Financial incentives were introduced through... &bull; For example, the 1933 marriage law provided... &bull; This served a double purpose because... &bull; As a result, ...',
        },
      },
      {
        stage: 3,
        dates: '1935–1938',
        title: "The Mother's Cross & Lebensborn Programme",
        spec_focus:
          'Mutterkreuz (Bronze, Silver, Gold); civic privileges; Lebensborn maternity homes.',
        focus_clue: 'How did honors and breeding centres aim to expand the Aryan population?',
        para_ref: '[3.1–3.2]',
        bullets: [
          'Awarding gold medals for bearing eight or more children',
          'Hitler Youth required to salute medal-holders in street',
          'Establishing maternity homes for unmarried racially pure mothers',
        ],
        writing_frame: {
          connectives:
            "Maternity was glorified through... &bull; In particular, the Mother's Cross was awarded to... &bull; Furthermore, Himmler created Lebensborn to... &bull; In addition, ...",
        },
      },
      {
        stage: 4,
        dates: '1933–1935',
        title: 'Forced Sterilisation & Eugenic Control',
        spec_focus:
          'Eugenics; Law for Prevention of Hereditarily Diseased Offspring; 300,000 sterilisations.',
        focus_clue: 'How did eugenics legislation enforce biological selection on German families?',
        para_ref: '[4.1–4.2]',
        bullets: [
          'Enacting Law for Prevention of Hereditarily Diseased Offspring',
          'Sterilising three hundred thousand women with mental illnesses',
          'Barring couples with genetic disabilities from marriage licences',
        ],
        writing_frame: {
          connectives:
            "A brutal eugenic policy was enforced through... &bull; For instance, the 1933 sterilization law targeted... &bull; This demonstrated the regime's belief that... &bull; Therefore, ...",
        },
      },
      {
        stage: 5,
        dates: '1937–1939',
        title: 'Rearmament Demands & The Policy Reversal',
        spec_focus:
          'Four-Year Plan; labor shortages; Duty Year (Pflichtjahr); 7.1m women working by 1939.',
        focus_clue: 'Why did the Four-Year Plan force the regime to abandon its domestic ideology?',
        para_ref: '[5.1–5.2]',
        bullets: [
          'Hermann Goering demanding female labour for munitions plants',
          'Compulsory Duty Year forcing unmarried girls into agriculture',
          'Seven million women working in factories by outbreak of war',
        ],
        writing_frame: {
          connectives:
            'Ultimately, domestic policy was reversed because... &bull; By 1937, rearmament created... &bull; This forced the government to... &bull; Overall, ...',
        },
      },
    ],
    causal_domino_spine: {
      title: 'KT4.1: Nazi Policies Towards Women (1933–1939)',
      subtitle: 'From Kinder, Küche, Kirche and Marriage Loans to Rearmament Conscription',
      stages: [
        {
          step: 1,
          date: '1933',
          para_ref: '[1.1–1.2]',
          title: 'The Domestic Ideal: Kinder, Küche, Kirche',
          actor: 'Adolf Hitler & German Women',
          tag: '🍳 DOMESTIC PATRIARCHY',
          trigger:
            'The regime banned women from legal and medical professions, restricted university entry to 10%, and promoted the slogan Kinder, Küche, Kirche.',
          desc: 'The regime banned women from legal and medical professions, restricted university entry to 10%, and promoted the slogan Kinder, Küche, Kirche.',
          connective:
            'Reversed Weimar emancipation, confining women to traditional domestic roles and family reproduction.',
          question: 'How did the regime attempt to remove women from public professions?',
        },
        {
          step: 2,
          date: 'Jun 1933',
          para_ref: '[2.1–2.2]',
          title: 'The Law for the Encouragement of Marriage',
          actor: 'Newlyweds & Ministry of Finance',
          tag: '💍 1,000-MARK MARRIAGE LOANS',
          trigger:
            'Couples received 1,000-mark marriage loans with 25% debt forgiven per child born, provided the bride left the workforce.',
          desc: 'Couples received 1,000-mark marriage loans with 25% debt forgiven per child born, provided the bride left the workforce.',
          connective:
            'Artificially reduced male unemployment figures while encouraging early marriage and increased childbearing.',
          question:
            'How were financial loans used to encourage childbearing and lower unemployment?',
        },
        {
          step: 3,
          date: '1935–1938',
          para_ref: '[3.1–3.2]',
          title: "The Mother's Cross & Lebensborn Programme",
          actor: 'Heinrich Himmler & Mutterkreuz Holders',
          tag: '🏅 MUTTERKREUZ & LEBENSBORN',
          trigger:
            'Hitler awarded the Mother’s Cross (Bronze, Silver, Gold for 4, 6, 8+ children), while Himmler established Lebensborn breeding centres for SS men.',
          desc: 'Hitler awarded the Mother’s Cross (Bronze, Silver, Gold for 4, 6, 8+ children), while Himmler established Lebensborn breeding centres for SS men.',
          connective:
            'Elevated childbearing into a militarized civic duty and expanded the biological pool of pure Aryan offspring.',
          question: 'How did honors and breeding centres aim to expand the Aryan population?',
        },
        {
          step: 4,
          date: '1933–1935',
          para_ref: '[4.1–4.2]',
          title: 'Forced Sterilisation & Eugenic Control',
          actor: 'Genetic Health Courts & 300,000 Victims',
          tag: '🧬 COMPULSORY STERILISATION',
          trigger:
            'The 1933 Sterilisation Law forced over 300,000 women diagnosed with mental or physical disabilities to undergo compulsory surgical sterilization.',
          desc: 'The 1933 Sterilisation Law forced over 300,000 women diagnosed with mental or physical disabilities to undergo compulsory surgical sterilization.',
          connective:
            'Enforced biological selection, denying reproductive rights to citizens judged outside the racial community.',
          question: 'How did eugenics legislation enforce biological selection on German families?',
        },
        {
          step: 5,
          date: '1937–1939',
          para_ref: '[5.1–5.2]',
          title: 'Rearmament Demands & The Policy Reversal',
          actor: 'Hermann Göring & 7.1m Working Women',
          tag: '🏭 FOUR-YEAR PLAN WORKFORCE REVERSAL',
          trigger:
            'Four-Year Plan labor shortages forced the regime to introduce the Duty Year, placing 7.1 million women into armaments factories by September 1939.',
          desc: 'Four-Year Plan labor shortages forced the regime to introduce the Duty Year, placing 7.1 million women into armaments factories by September 1939.',
          connective:
            'Shattered the domestic ideal of Kinder, Küche, Kirche in order to fuel the industrial machinery of war.',
          question: 'Why did the Four-Year Plan force the regime to abandon its domestic ideology?',
        },
      ],
    },
  },

  // --------------------------------------------------------------------------
  // LESSON 4.2: NAZI POLICIES TOWARDS THE YOUNG
  // --------------------------------------------------------------------------
  lesson_4_2: {
    teacher_notes: {
      primer:
        'This enquiry examines the total totalitarian indoctrination of German youth through state youth organizations and the Nazification of the education system between 1933 and 1939. Students explore the training of boys for warfare in the Hitler Youth (Hitlerjugend) under Baldur von Schirach, the domestic and racial grooming of girls in the League of German Girls (Bund Deutscher Mädel), the 1936 and 1939 decrees making youth membership compulsory, the ideological purging and regimentation of teachers under the National Socialist Teachers’ League (NSLB), and the complete restructuring of the academic curriculum around racial biology, military mathematics, and elite leadership academies (Napolas).',
      objectives: [
        {
          objective:
            'Explain how the Hitler Youth (Hitlerjugend) prepared boys for future military service and total obedience to the Führer.',
          primer:
            'Direct students to paragraphs [1.1]–[1.2]. Detail military route marches, map reading, obstacle courses, rifle shooting, and swearing the personal oath to Hitler upon receiving the ceremonial pocket knife.',
          question:
            'How did the physical activities and paramilitary drills of the Hitler Youth prepare adolescent boys for future service in the Wehrmacht?',
        },
        {
          objective:
            'Analyse the training of adolescent girls for motherhood and racial preservation in the League of German Girls (BDM).',
          primer:
            'Direct students to paragraphs [2.1]–[2.2] and Source A (BDM domestic and athletic activities). Contrast the boys’ military drills with the girls’ training in gymnastics, baby hygiene, cooking, and campfire folk songs celebrating racial solidarity.',
          question:
            'Why did the BDM place equal emphasis on strenuous physical exercise and traditional domestic household skills?',
        },
        {
          objective:
            'Assess why the regime enacted decrees in 1936 and 1939 to make youth group attendance legally compulsory.',
          primer:
            'Direct students to paragraphs [3.1]–[3.2]. Explain the banning of competing Catholic and socialist youth clubs, the 1936 Youth Service Law, and the 1939 Second Executive Order drafting 8.2 million children into uniform.',
          question:
            'Why did the Nazi state find it necessary to outlaw competing youth movements and introduce compulsory attendance?',
        },
        {
          objective:
            'Examine how the teaching profession was purged and Nazified through the National Socialist Teachers’ League (NSLB).',
          primer:
            'Direct students to paragraphs [4.1]–[4.2]. Focus on the dismissal of Jewish and socialist teachers under the 1933 Civil Service Law, with 97% of remaining teachers joining the NSLB and attending mandatory holiday ideological training camps.',
          question:
            'How did the regime ensure that schoolteachers actively delivered Nazi racial ideology in the classroom?',
        },
        {
          objective:
            'Evaluate how the school curriculum and elite academies (Napolas) were rewritten to prioritize physical fitness, racial theory, and militarism.',
          primer:
            'Direct students to paragraphs [5.1]–[5.2]. Detail 15% of timetable devoted to PE, mathematics word problems calculating military bombing runs, Eugenics textbooks measuring skulls, and elite boarding schools.',
          question:
            'How did the Nazification of academic subjects transform the primary purpose of school education from intellectual learning to ideological conditioning?',
        },
      ],
      source_context: {
        'Source A':
          'Source A: League of German Girls (BDM) Practicing Gymnastics and Domestic Skills (c. 1936). Official press photograph showing adolescent members of the Bund Deutscher Mädel (BDM) performing synchronized rhythmic gymnastics in matching white blouses and dark skirts. Hinge Question: How does Source A illustrate how the BDM combined outdoor physical conditioning with the preparation of girls for healthy motherhood?',
      },
    },
    narrative_blocks: [
      {
        act: 1,
        title: 'Act 1: The Hitler Youth (Hitlerjugend) for Boys (1933–1936)',
        theme_heading: 'Act 1: The Hitler Youth (Hitlerjugend) for Boys (1933–1936)',
        text: '<span class="para-ref">[1.1]</span> Adolf Hitler recognized that the long-term survival of the Thousand-Year Reich depended on capturing the minds of the next generation. As he proclaimed in a 1933 speech: "When an opponent says, \'I will not come over to your side,\' I calmly say, \'Your child belongs to us already... What are you? You will pass on. Your descendants, however, now stand in the new camp. In a short time they will know nothing else but this new community.\'" The youth was organized into a continuous conveyor belt of regimented state movements overseen by Reich Youth Leader <strong>Baldur von Schirach</strong>. Boys aged six to ten joined the <em>Pimpfe</em> (Little Fellows); at age ten they graduated into the <em>Jungvolk</em> (Young Folk); and at age fourteen they entered the <strong>Hitler Youth</strong> (<em>Hitlerjugend</em>, or HJ), remaining until age eighteen when they transitioned directly into the military.<br><br><span class="para-ref">[1.2]</span> The Hitler Youth was designed from the outset as a military preparatory school. Boys wore military-style brown shirts with swastika armbands and black shorts. Their activities revolved around rugged outdoor life, physical hardship, and military training: overnight marches carrying twenty-pound packs, compass and map reading, digging trenches, throwing dummy stick grenades, and firing live-ammunition small-bore rifles at targets. Discipline was harsh: boys were encouraged to endure pain without crying and swear absolute personal obedience to Hitler. Upon passing their fitness and ideological examinations at age fourteen, boys were presented with their official <strong>Hitler Youth pocket knife</strong>, inscribed with the motto <em>"Blut und Ehre"</em> (Blood and Honour)—a treasured talisman that bound their loyalty to the Führer.',
      },
      {
        act: 2,
        title: 'Act 2: The League of German Girls (Bund Deutscher Mädel) (1933–1936)',
        theme_heading: 'Act 2: The League of German Girls (Bund Deutscher Mädel) (1933–1936)',
        source: {
          id: 'source_a_bdm_gymnastics',
          letter: 'A',
          title: 'Source A: League of German Girls (BDM) Exercising Outdoors (c. 1936)',
          src: '/images/bdm_gymnastics.jpg',
          source: '/images/bdm_gymnastics.jpg',
          image: '/images/bdm_gymnastics.jpg',
          caption:
            'Members of the League of German Girls (BDM) engaged in outdoor gymnastics, designed to build stamina and strength for future Aryan motherhood.',
          desc: 'Archival photograph of BDM girls performing gymnastics outdoors.',
          provenance:
            'Archival press photograph of BDM members exercising, Berlin, c. 1936. German Federal Archives (Bundesarchiv Bild 183-J00705).',
          citation: 'Bundesarchiv Bild 183-J00705, BDM Gymnastics.',
          question:
            'How does Source A illustrate how the BDM combined outdoor physical conditioning with the preparation of girls for healthy motherhood?',
          hinge_question:
            'How does Source A illustrate how the BDM combined outdoor physical conditioning with the preparation of girls for healthy motherhood?',
          source_context:
            'Official press photograph showing adolescent members of the Bund Deutscher Mädel (BDM) performing synchronized rhythmic gymnastics in matching white blouses and dark skirts. Hinge Question: How does Source A illustrate how the BDM combined outdoor physical conditioning with the preparation of girls for healthy motherhood?',
          context:
            'Official press photograph of BDM girls performing gymnastics in Berlin, c. 1936.',
        },
        text: '<span class="para-ref">[2.1]</span> Parallel organizations existed for German girls: aged ten to fourteen they entered the <em>Jungmädel</em> (Young Girls), and from fourteen to eighteen they belonged to the <strong>League of German Girls</strong> (<em>Bund Deutscher Mädel</em>, or BDM) (<span class="archival-meta-tag">Source A</span>). Their uniform consisted of a dark blue skirt, a crisp white blouse, and a brown suede vest with a black neckerchief. While boys were trained for aggressive warfare, the BDM was structured around preparing girls for their supreme biological destiny: becoming the fertile, stoic mothers of future soldiers.<br><br><span class="para-ref">[2.2]</span> The BDM curriculum combined intensive physical conditioning with domestic and ideological grooming. Girls engaged in strenuous outdoor gymnastics, folk dancing, and ten-kilometer hikes, which Nazi doctors asserted widened the pelvic bone and strengthened the body for childbearing. Concurrently, they were trained in household cooking, infant hygiene, sewing, and first aid. Around evening campfires, BDM leaders lectured girls on Nazi racial hygiene, teaching them to identify "inferior" racial traits and warning them never to fraternize with Jewish or Slavic men. For many working-class girls, however, the BDM offered an exciting escape from strict parental control, providing opportunities to travel, hike in the mountains, and participate in community sports.',
      },
      {
        act: 3,
        title: 'Act 3: Compulsory Youth Membership & Resistance (1936–1939)',
        theme_heading: 'Act 3: Compulsory Youth Membership & Resistance (1936–1939)',
        text: '<span class="para-ref">[3.1]</span> In the early years of the regime, youth group membership was theoretically voluntary, though social pressure from peers and teachers was intense. However, many parents—particularly devout Catholics and working-class socialists—objected to their children spending weekends away from church or home. In 1933, the regime banned all socialist and communist youth movements; in 1936, sports clubs were integrated; and Catholic youth groups were systematically harassed despite the protections promised in the Concordat.<br><br><span class="para-ref">[3.2]</span> In December 1936, Hitler enacted the <strong>First Hitler Youth Law</strong>, declaring that all German youths were to be educated in the Hitler Youth "physically, intellectually, and morally in the spirit of National Socialism." When significant numbers of children still avoided meetings, the regime enacted the <strong>Second Execution Order in March 1939</strong>, making membership strictly compulsory for all healthy boys and girls aged ten to eighteen. Parents who refused to register their children faced heavy fines or imprisonment, and their children could be placed in state reformatories. By late 1939, over <strong>8.2 million children</strong>—representing eighty-two percent of all German youth—were enrolled. Yet compulsory attendance bred growing resentment: as meetings became dominated by tedious military drill and ideological lectures, absenteeism soared, and rebellious teenagers drifted into outlawed counter-culture gangs like the Edelweiss Pirates.',
      },
      {
        act: 4,
        title: 'Act 4: Purging Teachers & The Nazi Teachers’ League (1933–1937)',
        theme_heading: 'Act 4: Purging Teachers & The Nazi Teachers’ League (1933–1937)',
        text: '<span class="para-ref">[4.1]</span> In the formal education system, the regime recognized that control over the curriculum required total control over the teachers. Under the <strong>Law for the Restoration of the Professional Civil Service</strong> of April 1933, all Jewish schoolteachers, communist educators, and politically outspoken democrats were dismissed from their jobs. Those who remained were subjected to intensive ideological regimentation. All educators were pressured to join the <strong>National Socialist Teachers’ League</strong> (<em>Nationalsozialistischer Lehrerbund</em>, or NSLB), led by Hans Schemm. By 1937, a staggering <strong>ninety-seven percent of all German teachers</strong> had joined the league, and over thirty percent had formally joined the Nazi Party—representing a higher proportion of party membership than any other civil service profession.<br><br><span class="para-ref">[4.2]</span> To ensure total compliance, teachers were required to attend compulsory month-long ideological training camps during school holidays. At these camps, teachers lived in tents, completed military obstacle courses, and listened to lectures on racial biology and anti-Semitism. In the classroom, the teacher’s authority was constrained by fear: teachers had to begin and end every lesson with the Hitler salute and the phrase "Heil Hitler!" Students were encouraged to inform on teachers who failed to show sufficient enthusiasm for the regime or who expressed religious sentiments, creating an atmosphere where teachers lived in terror of denunciation by their own pupils.',
      },
      {
        act: 5,
        title: 'Act 5: Indoctrinating the Curriculum & Elite Schools (1933–1939)',
        theme_heading: 'Act 5: Indoctrinating the Curriculum & Elite Schools (1933–1939)',
        text: '<span class="para-ref">[5.1]</span> The entire school timetable was systematically rewritten to serve the military and racial goals of the Third Reich. Physical education was prioritized above all academic learning: at least <strong>fifteen percent of weekly school hours</strong> was dedicated to PE, including boxing for boys to build aggression. Academic subjects were thoroughly Nazified. In <strong>History</strong>, textbooks taught that the Weimar Republic was born of the "stab in the back" (<em>Dolchstoßlegende</em>) by Jewish-Marxist traitors and glorified German military heroes. In <strong>Geography</strong>, pupils studied maps of Eastern Europe to justify the conquest of <em>Lebensraum</em>. In <strong>Mathematics</strong>, word problems were militarized: students were asked to calculate the trajectory of artillery shells, the bomb-carrying capacity of Dornier bombers, or the financial cost of caring for the mentally disabled compared to building worker apartments. In <strong>Biology</strong>, renamed "Racial Science" (<em>Rassenkunde</em>), pupils used calipers to measure skull dimensions and eye color, learning to classify humans into Aryan "master race" (<em>Herrenvolk</em>) and inferior "sub-humans" (<em>Untermenschen</em>).<br><br><span class="para-ref">[5.2]</span> For the most ideologically fanatical and physically exceptional boys, the regime established specialized elite boarding academies designed to produce the future military and administrative rulers of the Reich. These included the <strong>Napolas</strong> (National Political Institutes of Education), administered by the SS, and the <strong>Adolf Hitler Schools</strong>, run by the Hitler Youth and Robert Ley’s DAF. Boys in these academies lived under iron military discipline, ate Spartan rations, and engaged in live-fire weapons training, glider flying, and ideological indoctrination, groomed to become ruthless SS commanders and colonial administrators.',
      },
    ],
    workbook_stages: [
      {
        stage: 1,
        dates: '1933–1936',
        title: 'The Hitler Youth (Hitlerjugend) for Boys',
        spec_focus:
          'Hitler Youth; Baldur von Schirach; military drills; outdoor training; blood and honor motto.',
        focus_clue:
          'How did the Hitler Youth prepare boys for future military service and total obedience?',
        para_ref: '[1.1–1.2]',
        bullets: [
          'Training boys in compass reading and trench warfare',
          'Marching on overnight hikes carrying heavy military packs',
          'Passing fitness tests before receiving official pocket knives',
        ],
        writing_frame: {
          connectives:
            'A primary method of youth control was... &bull; Specifically, the Hitler Youth focused on... &bull; This prepared boys for the future because... &bull; Consequently, ...',
        },
      },
      {
        stage: 2,
        dates: '1933–1936',
        title: 'The League of German Girls (Bund Deutscher Mädel)',
        spec_focus:
          'BDM; outdoor gymnastics; preparation for motherhood; domestic skills; racial hygiene.',
        focus_clue: 'How did the BDM train adolescent girls for motherhood and domestic duty?',
        para_ref: '[2.1–2.2]',
        bullets: [
          'Exercising in blue skirts and white blouses outdoors',
          'Learning domestic cooking and infant hygiene skills',
          'Singing campfire folk songs celebrating racial community',
        ],
        writing_frame: {
          connectives:
            'Girls were indoctrinated separately through... &bull; For instance, BDM training emphasized... &bull; This was intended to ensure... &bull; As a result, ...',
        },
      },
      {
        stage: 3,
        dates: '1936–1939',
        title: 'Compulsory Youth Membership & Resistance',
        spec_focus:
          'Youth laws (1936 and 1939); banning rival youth clubs; 8.2m members; youth resentment.',
        focus_clue: 'Why did the regime make youth group attendance legally compulsory in 1939?',
        para_ref: '[3.1–3.2]',
        bullets: [
          'Banning rival church youth groups and scout troops',
          'Passing law making youth service compulsory for all children',
          'Drafting eight million children into uniform by war outbreak',
        ],
        writing_frame: {
          connectives:
            'State control expanded when... &bull; In 1936 and 1939, legislation was passed to... &bull; This was necessary because... &bull; However, ...',
        },
      },
      {
        stage: 4,
        dates: '1933–1937',
        title: "Purging Teachers & The Nazi Teachers' League",
        spec_focus:
          'Dismissal of Jewish/socialist teachers; NSLB (97% membership); ideological holiday camps.',
        focus_clue: 'How did the regime ensure that school teachers actively delivered propaganda?',
        para_ref: '[4.1–4.2]',
        bullets: [
          'Firing Jewish and politically unreliable educators from classrooms',
          'Ninety-seven percent of teachers joining national league',
          'Attending compulsory ideological camps during school holidays',
        ],
        writing_frame: {
          connectives:
            'The education system was Nazified by... &bull; For example, teachers were forced to... &bull; This created compliance because... &bull; In addition, ...',
        },
      },
      {
        stage: 5,
        dates: '1933–1939',
        title: 'Indoctrinating the Curriculum & Elite Schools',
        spec_focus:
          'PE emphasis (15%); Racial Science; military maths; Napolas and Adolf Hitler Schools.',
        focus_clue:
          'How were academic subjects rewritten to reinforce racial theory and militarism?',
        para_ref: '[5.1–5.2]',
        bullets: [
          'Allocating fifteen percent of timetable to physical fitness',
          'Calculating military bombing runs in mathematics word problems',
          'Establishing Napolas and Adolf Hitler boarding academies for leaders',
        ],
        writing_frame: {
          connectives:
            'Finally, the curriculum was overhauled to... &bull; Specifically, subjects such as history and biology... &bull; Furthermore, elite schools were created to... &bull; Overall, ...',
        },
      },
    ],
    causal_domino_spine: {
      title: 'KT4.2: Nazi Policies Towards the Young (1933–1939)',
      subtitle: 'From Hitler Youth Paramilitary Training to Indoctrinated School Classrooms',
      stages: [
        {
          step: 1,
          date: '1933–1936',
          para_ref: '[1.1–1.2]',
          title: 'The Hitler Youth (Hitlerjugend) for Boys',
          actor: 'Baldur von Schirach & Millions of Boys',
          tag: '⛺ PARAMILITARY SCOUT DRILLS',
          trigger:
            'Boys were drilled in trench warfare, map reading, and small-bore rifle shooting, swearing personal loyalty to Hitler upon receiving their pocket knives.',
          desc: 'Boys were drilled in trench warfare, map reading, and small-bore rifle shooting, swearing personal loyalty to Hitler upon receiving their pocket knives.',
          connective:
            'Prepared German boys physically and psychologically for future combat service in the armed forces.',
          question:
            'How did the Hitler Youth prepare boys for future military service and total obedience?',
        },
        {
          step: 2,
          date: '1933–1936',
          para_ref: '[2.1–2.2]',
          title: 'The League of German Girls (Bund Deutscher Mädel)',
          actor: 'Adolescent Girls & BDM Leaders',
          tag: '👧 BDM RACIAL MOTHERHOOD',
          trigger:
            'Adolescent girls exercised outdoors to build stamina and learned domestic cooking, infant hygiene, and racial science to prepare for motherhood.',
          desc: 'Adolescent girls exercised outdoors to build stamina and learned domestic cooking, infant hygiene, and racial science to prepare for motherhood.',
          connective:
            'Conditioned girls to accept their domestic role as breeders of the Aryan racial community.',
          question: 'How did the BDM train adolescent girls for motherhood and domestic duty?',
        },
        {
          step: 3,
          date: '1936–1939',
          para_ref: '[3.1–3.2]',
          title: 'Compulsory Youth Membership & Resistance',
          actor: 'Reich Youth Directorate & 8.2m Youths',
          tag: '📜 COMPULSORY YOUTH CONVEYOR',
          trigger:
            'The regime banned rival church youth groups and made attendance legally compulsory in 1939, enrolling 8.2 million children into state uniforms.',
          desc: 'The regime banned rival church youth groups and made attendance legally compulsory in 1939, enrolling 8.2 million children into state uniforms.',
          connective:
            'Monopolized young people’s leisure time while sparking resentment among rebellious gangs like the Edelweiss Pirates.',
          question: 'Why did the regime make youth group attendance legally compulsory in 1939?',
        },
        {
          step: 4,
          date: '1933–1937',
          para_ref: '[4.1–4.2]',
          title: "Purging Teachers & The Nazi Teachers' League",
          actor: 'Hans Schemm & 97% German Teachers',
          tag: '👨‍🏫 97% NSLB TEACHER REGIMENTATION',
          trigger:
            'Jewish and democratic teachers were dismissed, while 97% of educators joined the NSLB, attending mandatory ideological camps during holidays.',
          desc: 'Jewish and democratic teachers were dismissed, while 97% of educators joined the NSLB, attending mandatory ideological camps during holidays.',
          connective:
            'Eliminated classroom dissent, ensuring that state propaganda was delivered uniformly across German schools.',
          question: 'How did the regime ensure that school teachers actively delivered propaganda?',
        },
        {
          step: 5,
          date: '1933–1939',
          para_ref: '[5.1–5.2]',
          title: 'Indoctrinating the Curriculum & Elite Schools',
          actor: 'School Pupils & Napola Cadets',
          tag: '🧬 RACIAL CURRICULUM & NAPOLAS',
          trigger:
            'Schools allocated 15% of time to PE, militarized maths word problems, taught racial science with skull calipers, and trained leaders in Napolas.',
          desc: 'Schools allocated 15% of time to PE, militarized maths word problems, taught racial science with skull calipers, and trained leaders in Napolas.',
          connective:
            'Subverted intellectual inquiry into racial conditioning and military obedience across an entire generation.',
          question:
            'How were academic subjects rewritten to reinforce racial theory and militarism?',
        },
      ],
    },
  },

  // --------------------------------------------------------------------------
  // LESSON 4.3: EMPLOYMENT AND LIVING STANDARDS
  // --------------------------------------------------------------------------
  lesson_4_3: {
    teacher_notes: {
      primer:
        'This enquiry examines the economic policies, labor regimentation, and living standards of German workers under the Nazi dictatorship between 1933 and 1939. Students analyze the destruction of free trade unions and the creation of Robert Ley’s compulsory German Labour Front (DAF), public works schemes including the Reich Labour Service (RAD) and Autobahn motorway construction, the statistical manipulation behind the claim of full employment ("invisible unemployment"), the compensatory leisure programs of Strength Through Joy (KdF) and Beauty of Labour (SdA), and the severe strain of Hermann Göring’s Four-Year Plan that produced the classic "Guns vs. Butter" dilemma, declining real wages, and extended working hours by 1939.',
      objectives: [
        {
          objective:
            'Explain how the destruction of independent trade unions and the creation of the German Labour Front (DAF) eliminated workers’ rights.',
          primer:
            'Direct students to paragraphs [1.1]–[1.2]. Detail the storming of trade union offices on 2 May 1933, the outlawing of strikes, the freezing of hourly wages, and the compulsory 22-million-member DAF under Dr. Robert Ley.',
          question:
            'Why did the abolition of free trade unions leave German industrial workers powerless to negotiate higher wages?',
        },
        {
          objective:
            'Analyse how public works schemes—specifically the Reich Labour Service (RAD) and Autobahn construction—artificially absorbed the unemployed.',
          primer:
            'Direct students to paragraphs [2.1]–[2.2] and Source A (Autobahn construction). Detail the compulsory six-month RAD service for men aged 18–25 living in military barracks with spades, alongside Fritz Todt’s 7,000-kilometer motorway network.',
          question:
            'How did the Reich Labour Service combine economic public works with military-style indoctrination?',
        },
        {
          objective:
            'Assess how the reintroduction of military conscription and "invisible unemployment" distorted official employment statistics.',
          primer:
            'Direct students to paragraphs [3.1]–[3.2]. Reveal how official figures masked hundreds of thousands of Wehrmacht conscripts, dismissed Jews, married women forced out of jobs, and political prisoners in concentration camps.',
          question:
            'Why was the Nazi claim to have achieved an "economic miracle of full employment" statistically misleading?',
        },
        {
          objective:
            'Examine how Strength Through Joy (KdF) and Beauty of Labour (SdA) provided state-sponsored leisure to compensate for lost liberties.',
          primer:
            'Direct students to paragraphs [4.1]–[4.2]. Focus on subsidized Mediterranean cruises on purpose-built liners like the Wilhelm Gustloff, theater tickets, the Volkswagen Beetle five-mark savings stamp scheme, and improved factory canteens.',
          question:
            'How did Strength Through Joy (KdF) function as an instrument of social pacification and political control?',
        },
        {
          objective:
            'Evaluate the impact of Hermann Göring’s Four-Year Plan and the "Guns vs. Butter" dilemma on German workers’ living standards by 1939.',
          primer:
            'Direct students to paragraphs [5.1]–[5.2]. Detail the rise in average working hours from 43 to 47 per week, shortages of meat and butter, rising food prices, and the subordination of civilian welfare to total war rearmament.',
          question:
            'Did the standard of living for ordinary German industrial workers actually improve or deteriorate between 1933 and 1939?',
        },
      ],
      source_context: {
        'Source A':
          'Source A: Construction of the Reich Autobahn Motorway Network (c. 1935). Official press photograph showing hundreds of Reich Labour Service (RAD) workers manually shovelling earth and laying gravel to construct the new German Autobahn motorway network. Hinge Question: How does Source A demonstrate how public works projects were designed to maximize manual labour and reduce official unemployment numbers?',
      },
    },
    narrative_blocks: [
      {
        act: 1,
        title: 'Act 1: Smashed Unions & The German Labour Front (DAF) (May 1933)',
        theme_heading: 'Act 1: Smashed Unions & The German Labour Front (DAF) (May 1933)',
        text: '<span class="para-ref">[1.1]</span> When Hitler took power in January 1933, Germany was paralyzed by economic depression, with six million registered unemployed and industrial factories standing silent. Hitler recognized that to rearm the nation, he needed total control over the industrial workforce. Free trade unions, which had defended workers’ wages and working conditions for half a century, were viewed as dangerous bastions of Marxist subversion. On 2 May 1933, the day after the regime staged deceptive "Day of National Labour" celebrations, SA and police squads raided trade union offices across Germany, arresting union leaders, beating organizers, and confiscating all union bank accounts. Striking was made a capital offense punishable by concentration camp imprisonment.<br><br><span class="para-ref">[1.2]</span> In place of independent unions, the regime established a single compulsory state monopoly: the <strong>German Labour Front</strong> (<em>Deutsche Arbeitsfront</em>, or DAF), headed by the eccentric, fanatical <strong>Dr. Robert Ley</strong>. Membership was practically mandatory for all industrial workers and employers, expanding to over twenty-two million members by 1939. The DAF completely abolished collective bargaining: wages were frozen at 1933 depression levels by state-appointed "Trustees of Labour." Every German worker was issued a compulsory <strong>Work Book</strong> (<em>Arbeitsbuch</em>), which recorded their employment history, disciplinary record, and skills. No worker could change jobs without their employer’s permission and the surrender of their Work Book, effectively tying German industrial workers to their factory benches like medieval serfs.',
      },
      {
        act: 2,
        title: 'Act 2: The Reich Labour Service (RAD) & Public Works (1933–1935)',
        theme_heading: 'Act 2: The Reich Labour Service (RAD) & Public Works (1933–1935)',
        source: {
          id: 'source_a_autobahn_construction',
          letter: 'A',
          title: 'Source A: Manual Construction of the Reich Autobahn (c. 1935)',
          src: '/images/autobahn_construction.jpg',
          source: '/images/autobahn_construction.jpg',
          image: '/images/autobahn_construction.jpg',
          caption:
            'Reich Labour Service workers manually shovelling earth during the construction of the German Autobahn network, reducing unemployment figures.',
          desc: 'Archival photograph of RAD workers constructing an Autobahn motorway.',
          provenance:
            'Archival photograph of Autobahn construction, Germany, c. 1935. German Federal Archives (Bundesarchiv Bild 183-C12345).',
          citation: 'Bundesarchiv Bild 183-C12345, Autobahn Construction.',
          question:
            'How does Source A demonstrate how public works projects were designed to maximize manual labour and reduce official unemployment numbers?',
          hinge_question:
            'How does Source A demonstrate how public works projects were designed to maximize manual labour and reduce official unemployment numbers?',
          source_context:
            'Official press photograph showing hundreds of Reich Labour Service (RAD) workers manually shovelling earth and laying gravel to construct the new German Autobahn motorway network. Hinge Question: How does Source A demonstrate how public works projects were designed to maximize manual labour and reduce official unemployment numbers?',
          context:
            'Official press photograph showing RAD workers constructing the German Autobahn network, c. 1935.',
        },
        text: '<span class="para-ref">[2.1]</span> To absorb millions of unemployed men off city streets, the regime poured billions of marks into state-funded public works. In 1935, service in the <strong>Reich Labour Service</strong> (<em>Reichsarbeitsdienst</em>, or RAD) was made compulsory for all men aged eighteen to twenty-five for a period of six months. RAD recruits lived in austere military barracks, wore military-style uniforms with spade badges, underwent daily marching drills, and were paid nominal pocket money (barely enough to buy tobacco). They were deployed on major manual labor projects: draining swampland, planting state pine forests, and digging irrigation canals across the German countryside.<br><br><span class="para-ref">[2.2]</span> The showpiece public works project was the construction of the <strong>Reich Autobahn</strong>—a revolutionary 7,000-kilometer network of dual-carriageway concrete motorways designed by engineer Fritz Todt (<span class="archival-meta-tag">Source A</span>). The project was deliberately engineered to be labor-intensive: heavy earth-moving machinery was banned in favor of pickaxes, shovels, and wheelbarrows to maximize the number of workers employed. At its peak, over 125,000 men toiled directly on the Autobahnen, with hundreds of thousands more employed in ancillary steel, asphalt, and concrete industries. While Nazi propaganda celebrated the motorways as symbols of modern national unity and personal motoring, their strategic purpose was military: enabling the rapid redeployment of motorized troops and tanks between the French and Polish frontiers.',
      },
      {
        act: 3,
        title: 'Act 3: Conscription & "Invisible Unemployment" (1935–1939)',
        theme_heading: 'Act 3: Conscription & "Invisible Unemployment" (1935–1939)',
        text: '<span class="para-ref">[3.1]</span> Nazi propaganda loudly celebrated an "economic miracle," pointing to official government statistics showing that unemployment had plummeted from six million in January 1933 to under one million by 1937, and to a mere <strong>302,000 by 1939</strong>. Hitler declared that the Third Reich had conquered unemployment where all democratic nations had failed. However, modern economic historians have shown that these statistics were heavily manipulated through the phenomenon of <strong>"invisible unemployment"</strong> (<em>unsichtbare Arbeitslosigkeit</em>), artificially removing over 1.5 million jobless citizens from the official registers.<br><br><span class="para-ref">[3.2]</span> The manipulation operated on multiple levels. First, in March 1935, Hitler reintroduced <strong>universal military conscription</strong> in open defiance of the Treaty of Versailles: by 1939, over 1.4 million young men were serving in the Wehrmacht, removing an entire generation of working-age youths from the jobless queue. Second, the 300,000 young men performing compulsory six-month service in the RAD were counted as fully employed. Third, hundreds of thousands of Jewish Germans who had been stripped of their jobs in law, medicine, academia, and civil service were excluded from unemployment counts. Fourth, married women who surrendered their jobs under the 1933 Marriage Loan scheme were removed from the registers. Finally, thousands of political prisoners, trade unionists, and so-called "workshy asocials" held in concentration camps and municipal workhouses were struck from the records, concealing the true economic reality.',
      },
      {
        act: 4,
        title: 'Act 4: Strength Through Joy (KdF) & Beauty of Labour (SdA) (1933–1939)',
        theme_heading: 'Act 4: Strength Through Joy (KdF) & Beauty of Labour (SdA) (1933–1939)',
        text: '<span class="para-ref">[4.1]</span> Aware that German workers had lost their trade unions, right to strike, and wage independence, Dr. Robert Ley created elaborate state-sponsored leisure programs to pacify the workforce. In November 1933, the DAF established <strong><em>Kraft durch Freude</em></strong> (<strong>KdF</strong>, or "Strength Through Joy"). The philosophy behind KdF was psychological: healthy, contented workers who enjoyed their leisure time would be more productive in armaments factories and loyal to Hitler. KdF became the world’s largest tourism operator: in 1938 alone, over ten million workers participated in KdF activities, which included subsidized weekend theatre outings, museum visits, gym memberships, and seaside holidays.<br><br><span class="para-ref">[4.2]</span> The most glamorous KdF rewards were luxury ocean cruises. The DAF commissioned purpose-built cruise liners—including the 25,000-ton <em>Wilhelm Gustloff</em>—offering ordinary factory workers two-week cruises to Norway’s fjords, the Mediterranean, or Madeira for just sixty marks (equivalent to two weeks’ wages). In 1938, Hitler unveiled the <strong>Volkswagen Beetle</strong> ("People’s Car"), designed by Ferdinand Porsche. Under a KdF savings scheme, workers paid five marks a week into a stamp book to purchase a new family car for 990 marks. Over 300,000 workers bought stamps, though not a single civilian ever received a car: when war erupted in 1939, the Wolfsburg factory was converted to produce military Kubelwagen jeeps. A subsidiary branch, the <strong>Beauty of Labour</strong> (<em>Schönheit der Arbeit</em>, or SdA), pressured factory owners to install improved workshop ventilation, washrooms, and sports fields—though workers were often forced to construct these facilities in their own unpaid spare time.',
      },
      {
        act: 5,
        title: 'Act 5: Four-Year Plan: Guns vs Butter Dilemma (1936–1939)',
        theme_heading: 'Act 5: Four-Year Plan: Guns vs Butter Dilemma (1936–1939)',
        text: '<span class="para-ref">[5.1]</span> In October 1936, the German economy underwent a radical structural shift with the launching of the <strong>Four-Year Plan</strong>, headed by Hermann Göring as Plenipotentiary for the War Economy. Göring’s mandate was simple: make the German armed forces and the domestic economy ready for total war within four years. The core objective was achieving economic self-sufficiency (<strong>autarky</strong>), freeing Germany from dependence on foreign imports of oil, rubber, and iron ore that had crippled the nation during the British naval blockade of 1914–1918. Billions of marks were invested in massive industrial plants—such as the Reichswerke Hermann Göring and IG Farben—to produce synthetic raw materials (<em>Ersatz</em> goods), including synthetic petrol from coal and synthetic rubber (Buna).<br><br><span class="para-ref">[5.2]</span> The Four-Year Plan triggered the famous <strong>"Guns vs. Butter" dilemma</strong> (<em>Kanonen statt Butter</em>). As Göring famously proclaimed in a radio speech: "Guns will make us powerful; butter will only make us fat." Rearmament consumed vast quantities of foreign currency, making it impossible to import luxury foodstuffs. Living standards for German industrial workers suffered severe strains: butter, meat, and coffee were strictly rationed; real wages (accounting for inflation and heavy compulsory deductions for DAF dues and the Winter Relief Fund) remained below 1928 levels; and average weekly working hours soared from forty-three hours in 1933 to <strong>forty-seven hours by 1939</strong> (and over sixty hours in munitions plants). While German workers enjoyed the security of employment, their daily existence was characterized by exhausting labor, shortages of consumer goods, and total political subjugation.',
      },
    ],
    workbook_stages: [
      {
        stage: 1,
        dates: 'May 1933',
        title: 'Smashed Unions & The German Labour Front (DAF)',
        spec_focus:
          'Destruction of trade unions; Robert Ley; DAF; wage freeze; Work Book (Arbeitsbuch).',
        focus_clue: 'How did the DAF destroy independent collective bargaining for wages?',
        para_ref: '[1.1–1.2]',
        bullets: [
          'Arresting union bosses and seizing headquarters buildings',
          'Robert Ley establishing single compulsory state labour organisation',
          'Outlawing strikes and freezing basic hourly wages',
        ],
        writing_frame: {
          connectives:
            'A primary change in working conditions was... &bull; Specifically, the regime banned... &bull; In their place, the DAF... &bull; Consequently, ...',
        },
      },
      {
        stage: 2,
        dates: '1933–1935',
        title: 'The Reich Labour Service (RAD) & Public Works',
        spec_focus: 'RAD compulsory service; barrack life; Autobahn construction; Fritz Todt.',
        focus_clue:
          'How did public works and motorway construction artificially reduce jobless figures?',
        para_ref: '[2.1–2.2]',
        bullets: [
          'Sending young men to live in barracks for six months',
          'Shovelling dirt without machinery to build motorways',
          'Earning pocket money while wearing spade badge uniforms',
        ],
        writing_frame: {
          connectives:
            'Unemployment was targeted through... &bull; For instance, young men were conscripted into... &bull; Furthermore, motorway construction provided... &bull; As a result, ...',
        },
      },
      {
        stage: 3,
        dates: '1935–1939',
        title: 'Conscription & "Invisible Unemployment"',
        spec_focus:
          'Military conscription (1935); statistical manipulation; invisible unemployment.',
        focus_clue: 'Why was the Nazi claim of full employment statistically misleading?',
        para_ref: '[3.1–3.2]',
        bullets: [
          'Reintroducing military draft for half a million youths',
          'Excluding unmarried women and dismissed Jews from counts',
          'Arresting political opponents as asocials in workhouses',
        ],
        writing_frame: {
          connectives:
            'However, official statistics were misleading because... &bull; In particular, invisible unemployment concealed... &bull; In addition, conscription removed... &bull; Therefore, ...',
        },
      },
      {
        stage: 4,
        dates: '1933–1939',
        title: 'Strength Through Joy (KdF) & Beauty of Labour (SdA)',
        spec_focus:
          'KdF leisure schemes; Wilhelm Gustloff cruises; Volkswagen savings; SdA canteens.',
        focus_clue: 'How did leisure schemes compensate workers for lost political rights?',
        para_ref: '[4.1–4.2]',
        bullets: [
          'Booking subsidized Mediterranean cruises for factory staff',
          'Saving five marks weekly toward stamp book for car',
          'Installing factory canteens and improved workshop ventilation',
        ],
        writing_frame: {
          connectives:
            'To compensate workers, the regime introduced... &bull; For example, KdF offered... &bull; This was designed to ensure... &bull; Furthermore, ...',
        },
      },
      {
        stage: 5,
        dates: '1936–1939',
        title: 'Four-Year Plan: Guns vs Butter Dilemma',
        spec_focus:
          'Four-Year Plan; Hermann Göring; autarky; Kanonen statt Butter; rising hours (47/week).',
        focus_clue: 'How did total rearmament erode real worker purchasing power by 1939?',
        para_ref: '[5.1–5.2]',
        bullets: [
          'Goering prioritizing steel factories over consumer goods',
          'Working hours climbing to forty-seven per week',
          'Rationing butter and meat while synthetic petrol developed',
        ],
        writing_frame: {
          connectives:
            'By 1939, living standards deteriorated because... &bull; Specifically, the Four-Year Plan prioritized... &bull; This led to the Guns vs Butter dilemma where... &bull; Overall, ...',
        },
      },
    ],
    causal_domino_spine: {
      title: 'KT4.3: Employment and Living Standards (1933–1939)',
      subtitle: 'From Trade Union Destruction to Autobahn Works and the Guns vs Butter Dilemma',
      stages: [
        {
          step: 1,
          date: 'May 1933',
          para_ref: '[1.1–1.2]',
          title: 'Smashed Unions & The German Labour Front (DAF)',
          actor: 'Dr. Robert Ley & 22m Workers',
          tag: '🔨 DAF COMPULSION & WAGE FREEZE',
          trigger:
            'The regime smashed free trade unions on 2 May, freezing hourly wages and forcing 22 million workers into Robert Ley’s compulsory German Labour Front.',
          desc: 'The regime smashed free trade unions on 2 May, freezing hourly wages and forcing 22 million workers into Robert Ley’s compulsory German Labour Front.',
          connective:
            'Stripped industrial workers of collective bargaining rights and tied them to their employers via compulsory Work Books.',
          question: 'How did the DAF destroy independent collective bargaining for wages?',
        },
        {
          step: 2,
          date: '1933–1935',
          para_ref: '[2.1–2.2]',
          title: 'The Reich Labour Service (RAD) & Public Works',
          actor: 'RAD Recruits & Fritz Todt',
          tag: '⛏️ RAD BARRACKS & AUTOBAHN',
          trigger:
            'Young men completed compulsory six-month service in the RAD shovelling earth, building the 7,000-km Reich Autobahn network without machinery.',
          desc: 'Young men completed compulsory six-month service in the RAD shovelling earth, building the 7,000-km Reich Autobahn network without machinery.',
          connective:
            'Absorbed hundreds of thousands of unemployed men into labor-intensive public works and military-style discipline.',
          question:
            'How did public works and motorway construction artificially reduce jobless figures?',
        },
        {
          step: 3,
          date: '1935–1939',
          para_ref: '[3.1–3.2]',
          title: 'Conscription & "Invisible Unemployment"',
          actor: 'Wehrmacht Conscripts & Excluded Citizens',
          tag: '🪖 INVISIBLE UNEMPLOYMENT MASK',
          trigger:
            'Reintroducing conscription absorbed 1.4m men into the Wehrmacht, while dismissing Jews, married women, and RAD recruits masked real jobless numbers.',
          desc: 'Reintroducing conscription absorbed 1.4m men into the Wehrmacht, while dismissing Jews, married women, and RAD recruits masked real jobless numbers.',
          connective:
            'Manufactured the illusion of an "economic miracle of full employment" while preparing the nation for war.',
          question: 'Why was the Nazi claim of full employment statistically misleading?',
        },
        {
          step: 4,
          date: '1933–1939',
          para_ref: '[4.1–4.2]',
          title: 'Strength Through Joy (KdF) & Beauty of Labour (SdA)',
          actor: '10m KdF Participants & DAF',
          tag: '🚢 WILHELM GUSTLOFF CRUISES & KDF',
          trigger:
            'The DAF subsidized theatre trips, ocean cruises on the Wilhelm Gustloff, and the Volkswagen Beetle stamp scheme to pacify industrial workers.',
          desc: 'The DAF subsidized theatre trips, ocean cruises on the Wilhelm Gustloff, and the Volkswagen Beetle stamp scheme to pacify industrial workers.',
          connective:
            'Compensated workers for frozen wages and lost civil rights with state-controlled leisure and consumer promises.',
          question: 'How did leisure schemes compensate workers for lost political rights?',
        },
        {
          step: 5,
          date: '1936–1939',
          para_ref: '[5.1–5.2]',
          title: 'Four-Year Plan: Guns vs Butter Dilemma',
          actor: 'Hermann Göring & Industrial Workforce',
          tag: '⚔️ "GUNS VS BUTTER" REARMAMENT STRAIN',
          trigger:
            'Göring prioritized synthetic autarky and rearmament over consumer goods; working hours rose to 47 per week while meat and butter were rationed.',
          desc: 'Göring prioritized synthetic autarky and rearmament over consumer goods; working hours rose to 47 per week while meat and butter were rationed.',
          connective:
            'Eroded workers’ real purchasing power and living standards, subordinating the domestic economy entirely to the machinery of war.',
          question: 'How did total rearmament erode real worker purchasing power by 1939?',
        },
      ],
    },
  },

  // --------------------------------------------------------------------------
  // LESSON 4.4: THE PERSECUTION OF MINORITIES
  // --------------------------------------------------------------------------
  lesson_4_4: {
    teacher_notes: {
      primer:
        'This enquiry examines the escalating, systematic persecution and legal dehumanization of Jewish Germans and other minority groups under the Nazi dictatorship between 1933 and 1939. Students analyze the biological hierarchy of the Aryan "master race" (Herrenvolk) and the April 1933 nationwide anti-Jewish boycott, the codification of racial discrimination in the September 1935 Nuremberg Laws (Reich Citizenship Law and Blood Protection Law), the parallel persecution of Roma, homosexuals, and the disabled through forced sterilization, the state-orchestrated pogrom of Kristallnacht (Night of Broken Glass) in November 1938, and the subsequent economic Aryanization and forced emigration orchestrated by Reinhard Heydrich.',
      objectives: [
        {
          objective:
            'Explain how the biological hierarchy of Herrenvolk and Untermenschen underpinned the nationwide anti-Jewish boycott of 1 April 1933.',
          primer:
            'Direct students to paragraphs [1.1]–[1.2]. Detail Nazi racial theory (Social Darwinism), SA stormtroopers picketing Jewish department stores and doctors’ surgeries with yellow Stars of David, and the April Civil Service exclusion law.',
          question:
            'How did the boycott of 1 April 1933 mark the transition from street-level antisemitic violence to official state-sponsored discrimination?',
        },
        {
          objective:
            'Analyse how the Nuremberg Laws of September 1935 converted antisemitic ideology into statutory German constitutional law.',
          primer:
            'Direct students to paragraphs [2.1]–[2.2]. Distinguish between the Reich Citizenship Law (stripping Jewish Germans of citizenship and political rights) and the Law for the Protection of German Blood and Honour (outlawing intermarriage and sexual relations).',
          question:
            'Why did the Nuremberg Laws fundamentally transform the legal status of Jewish citizens living in Germany?',
        },
        {
          objective:
            'Assess the persecution of Roma and Sinti, homosexuals, and the disabled under Nazi racial hygiene policies.',
          primer:
            'Direct students to paragraphs [3.1]–[3.2]. Detail the internment of Roma in municipal concentration camps (Marzahn), the criminalization of homosexuality under Paragraph 175 with pink-triangle badges, and eugenic sterilizations.',
          question:
            'How did Nazi racial hygiene theories justify the persecution of non-Jewish minority groups in German society?',
        },
        {
          objective:
            'Examine the causes, execution, and devastating impact of the Kristallnacht pogrom of 9–10 November 1938.',
          primer:
            'Direct students to paragraphs [4.1]–[4.2] and Source A (Kristallnacht shopfront). Detail the assassination of Ernst vom Rath by Herschel Grynszpan in Paris, Goebbels’ orders for plainclothes SA attacks, the destruction of 1,000 synagogues and 7,500 shops, and 30,000 Jewish men sent to concentration camps.',
          question:
            'Why did the Kristallnacht pogrom represent a decisive turning point in the Nazi regime’s treatment of the Jewish population?',
        },
        {
          objective:
            'Evaluate the post-Kristallnacht economic Aryanization and the forced emigration policy orchestrated by Reinhard Heydrich.',
          primer:
            'Direct students to paragraphs [5.1]–[5.2]. Detail the one-billion-mark collective fine, confiscation of jewelry and businesses, expulsion of Jewish children from state schools, and the Central Office for Jewish Emigration.',
          question:
            'How did the Nazi regime seek to make daily life completely impossible for Jewish Germans between 1938 and 1939?',
        },
      ],
      source_context: {
        'Source A':
          'Source A: Shattered Jewish Shopfront in Berlin following Kristallnacht (November 1938). Archival photograph showing pedestrians passing the smashed, looted storefront of a Jewish-owned business in Berlin on the morning of 10 November 1938, surrounded by shattered glass and anti-Semitic graffiti. Hinge Question: How does Source A illustrate how the Kristallnacht pogrom shattered the illusion that Jewish Germans could safely live within German society?',
      },
    },
    narrative_blocks: [
      {
        act: 1,
        title: 'Act 1: Aryan Supremacy & The April Anti-Jewish Boycott (1933)',
        theme_heading: 'Act 1: Aryan Supremacy & The April Anti-Jewish Boycott (1933)',
        text: '<span class="para-ref">[1.1]</span> At the very core of National Socialist ideology lay a pseudo-scientific racial hierarchy rooted in extreme Social Darwinism. Hitler divided humanity into biological categories: at the apex stood the <strong>Aryan "master race"</strong> (<em>Herrenvolk</em>)—blond, blue-eyed, culturally creative Germanic peoples destined to rule the globe. Beneath them were subordinate European races (Latins and Celts), followed by "sub-humans" (<strong><em>Untermenschen</em></strong>), comprising Slavic peoples (Poles, Russians, and Czechs) destined for enslavement. At the very bottom were groups the Nazis deemed "biological parasites" (<em>Schmarotzer</em>) who allegedly contaminated the racial bloodstream: Roma and Sinti gypsies, the mentally and physically disabled, and, above all, the Jews, whom Hitler portrayed not as a religious group, but as a distinct biological race responsible for all of Germany’s misfortunes.<br><br><span class="para-ref">[1.2]</span> On Saturday, <strong>1 April 1933</strong>, the regime initiated its first nationwide state-sponsored antisemitic action: a coordinated <strong>one-day boycott of all Jewish-owned shops, department stores, lawyers’ offices, and medical practices</strong>. Brownshirt SA stormtroopers stood menacingly outside shop entrances with placards declaring: <em>"Germans! Defend yourselves! Do not buy from Jews!"</em> They painted the yellow Star of David and the word <em>"Jude"</em> across plate-glass display windows, intimidating customers. One week later, on 7 April 1933, the regime enacted the Law for the Restoration of the Professional Civil Service, summarily firing all Jewish judges, civil servants, university professors, and schoolteachers. By autumn 1933, Jewish doctors were barred from treating insured Aryan patients, and Jewish journalists were excluded from the press.',
      },
      {
        act: 2,
        title: 'Act 2: The Nuremberg Laws (Citizenship & Blood Protection) (Sep 1935)',
        theme_heading: 'Act 2: The Nuremberg Laws (Citizenship & Blood Protection) (Sep 1935)',
        text: '<span class="para-ref">[2.1]</span> Between 1933 and 1935, anti-Semitic persecution was sporadic and uneven, varying from town to town. However, on <strong>15 September 1935</strong>, at the annual Nuremberg Party Rally, Hitler codified racial discrimination into permanent constitutional law by proclaiming the <strong>Nuremberg Laws</strong>. The first statute, the <strong>Reich Citizenship Law</strong>, divided the German population into two distinct legal classes: "citizens of German or kindred blood" who possessed full civil and political rights, and subordinate "state subjects." German Jews were stripped of their German citizenship: they lost the right to vote, the right to hold public office, and the protection of German passports, becoming stateless outcasts in the land of their birth.<br><br><span class="para-ref">[2.2]</span> The second statute, the <strong>Law for the Protection of German Blood and German Honour</strong>, criminalized biological mixing to preserve Aryan racial purity. It strictly prohibited marriages and sexual relations between Jews and citizens of German blood (termed "race defilement," or <em>Rassenschande</em>, punishable by imprisonment in concentration camps). Jews were also forbidden from employing German female domestic servants under forty-five years of age and barred from flying the national swastika flag. Crucially, supplementary decrees established legal definitions of Jewishness based on genealogy rather than religious practice: anyone with three or four Jewish grandparents was classified as a full Jew (<em>Volljude</em>), while those with one or two Jewish grandparents were classified as mixed-race (<em>Mischlinge</em>), using church parish baptismal records to trace ancestry.',
      },
      {
        act: 3,
        title: 'Act 3: Persecution of Roma, Homosexuals & The Disabled (1933–1938)',
        theme_heading: 'Act 3: Persecution of Roma, Homosexuals & The Disabled (1933–1938)',
        text: '<span class="para-ref">[3.1]</span> The Nazi obsession with racial purity targeted multiple minority groups deemed detrimental to the genetic health and moral discipline of the Volk. Germany’s approximately 30,000 <strong>Roma and Sinti</strong> were classified as "racial aliens" and chronic "asocials." In 1936, the Central Office for Combating the Gypsy Nuisance was established under police command. In preparation for the 1936 Berlin Olympics, police rounded up hundreds of Roma families, forcibly interning them in a squalid, sewage-ridden municipal camp at <strong>Berlin-Marzahn</strong> next to a cemetery and sewage dump. In December 1938, Heinrich Himmler issued the "Decree for Combating the Gypsy Plague," classifying all Roma genealogically and paving the way for their deportation to Auschwitz.<br><br><span class="para-ref">[3.2]</span> Homosexual men were targeted with extreme ferocity because the regime viewed them as failing in their reproductive duty to expand the Aryan population. In 1935, the regime radically expanded <strong>Paragraph 175</strong> of the Criminal Code to criminalize any homosexual act, including a glance or touch. In 1936, Himmler created the Reich Central Office for the Combating of Homosexuality and Abortion. Over 100,000 men were arrested and 50,000 imprisoned; an estimated 10,000 to 15,000 homosexual men were sent to concentration camps, forced to wear the humiliating <strong>pink triangle</strong> badge, where they were subjected to medical experiments, castration, and extraordinarily high mortality rates. Concurrently, citizens with mental and physical disabilities were subjected to forced sterilization under the 1933 genetic health laws, culminating in 1939 with Hitler’s secret authorization of the <strong>Aktion T4 euthanasia programme</strong>, which murdered over 70,000 disabled German infants and adults in carbon monoxide gas chambers.',
      },
      {
        act: 4,
        title: 'Act 4: Kristallnacht (The Night of Broken Glass) (9–10 Nov 1938)',
        theme_heading: 'Act 4: Kristallnacht (The Night of Broken Glass) (9–10 Nov 1938)',
        source: {
          id: 'source_a_kristallnacht_shop',
          letter: 'A',
          title: 'Source A: Shattered Jewish Shopfront in Berlin after Kristallnacht (1938)',
          src: '/images/kristallnacht_shop.jpg',
          source: '/images/kristallnacht_shop.jpg',
          image: '/images/kristallnacht_shop.jpg',
          caption:
            'A Jewish-owned shop in Berlin vandalized during Kristallnacht (9–10 November 1938), surrounded by shattered glass and onlookers.',
          desc: 'Archival photograph of a vandalized Jewish shopfront in Berlin after Kristallnacht.',
          provenance:
            'Archival photograph of Kristallnacht aftermath, Berlin, 10 November 1938. German Federal Archives (Bundesarchiv Bild 146-1970-083-42).',
          citation: 'Bundesarchiv Bild 146-1970-083-42, Kristallnacht Berlin.',
          question:
            'How does Source A illustrate how the Kristallnacht pogrom shattered the illusion that Jewish Germans could safely live within German society?',
          hinge_question:
            'How does Source A illustrate how the Kristallnacht pogrom shattered the illusion that Jewish Germans could safely live within German society?',
          source_context:
            'Archival photograph showing pedestrians passing the smashed, looted storefront of a Jewish-owned business in Berlin on the morning of 10 November 1938, surrounded by shattered glass and anti-Semitic graffiti. Hinge Question: How does Source A illustrate how the Kristallnacht pogrom shattered the illusion that Jewish Germans could safely live within German society?',
          context:
            'Archival photograph of a shattered Jewish shopfront in Berlin after the Kristallnacht pogrom, November 1938.',
        },
        text: '<span class="para-ref">[4.1]</span> In the autumn of 1938, anti-Semitic persecution shifted from legal discrimination to violent, state-orchestrated terror. In late October 1938, the German authorities rounded up 17,000 Polish-born Jews living in Germany, dumping them penniless in no-man’s-land at the Polish frontier. Among them was the family of seventeen-year-old <strong>Herschel Grynszpan</strong>, living in Paris. Distraught at his parents’ suffering, Grynszpan marched into the German Embassy in Paris on 7 November 1938 and shot the junior diplomat <strong>Ernst vom Rath</strong>. When vom Rath died two days later, Hitler and Goebbels were attending the annual Munich Beer Hall Putsch reunion. Goebbels seized the assassination to incite violence, announcing to party leaders that while the party would not officially organize demonstrations, it would not hinder "spontaneous" public fury.<br><br><span class="para-ref">[4.2]</span> On the night of <strong>9–10 November 1938</strong>, the regime unleashed a nationwide pogrom known as <strong><em>Kristallnacht</em></strong> ("The Night of Broken Glass") (<span class="archival-meta-tag">Source A</span>), named after the millions of shards of shattered glass littering city pavements. Following secret telex instructions from Reinhard Heydrich, SA stormtroopers and SS men in plain clothes rampaged through every German city. Over <strong>1,000 synagogues were torched</strong> and desecrated, and <strong>7,500 Jewish-owned shops and businesses were ransacked</strong> and looted. Jewish homes were invaded, and at least ninety-one Jewish citizens were murdered in the streets (with hundreds more committing suicide). Fire brigades were strictly instructed to stand by and only douse neighboring Aryan properties to prevent fires from spreading. The next morning, the Gestapo arrested <strong>30,000 wealthy Jewish men</strong>, deporting them to Dachau, Buchenwald, and Sachsenhausen concentration camps, releasing them weeks later only after they agreed to surrender their property and emigrate immediately.',
      },
      {
        act: 5,
        title: 'Act 5: Economic Expropriation & Forced Emigration (1938–1939)',
        theme_heading: 'Act 5: Economic Expropriation & Forced Emigration (1938–1939)',
        text: '<span class="para-ref">[5.1]</span> Following Kristallnacht, the regime moved to completely liquidate Jewish participation in the German economy. On 12 November 1938, Hermann Göring convened a high-level ministerial conference. Adding financial insult to violent injury, Göring announced that the German Jewish community was collectively held responsible for the pogrom and imposed a staggering <strong>one-billion-mark fine</strong> (approx. $400 million) upon them for the damage caused by Nazi stormtroopers. Furthermore, insurance payouts to Jewish shopkeepers were seized by the state, and Jewish owners were compelled to repair the damage at their own expense.<br><br><span class="para-ref">[5.2]</span> Over the following months, a barrage of discriminatory decrees stripped Jews of all remaining economic existence (a process known as <strong>"Aryanization"</strong>). All Jewish-owned enterprises, factories, and properties were forcibly transferred to non-Jewish buyers at fractions of their true value. Jews were barred from cinemas, theatres, public concerts, swimming pools, and public parks; Jewish children were expelled from all state schools and universities; all Jewish identity cards were stamped with a large red letter <strong>"J"</strong>; and Jewish men and women without distinctively Jewish first names were legally compelled to add "Israel" or "Sara" to their names. In January 1939, Göring appointed Reinhard Heydrich to head the <strong>Central Office for Jewish Emigration</strong> in Berlin, tasking him with expelling all Jews from the Reich through forced emigration. By September 1939, over 250,000 German Jews had fled the country as penniless refugees. On 30 January 1939, Hitler delivered a chilling speech to the Reichstag, prophesying that if international finance Jewry plunged Europe into a world war, the outcome would not be the victory of the Jews, but the "annihilation of the Jewish race in Europe."',
      },
    ],
    workbook_stages: [
      {
        stage: 1,
        dates: '1933',
        title: 'Aryan Supremacy & The April Anti-Jewish Boycott',
        spec_focus:
          'Herrenvolk vs Untermenschen; April 1933 shop boycott; exclusion of Jewish civil servants.',
        focus_clue:
          'How did the regime initiate public state-sponsored antisemitic discrimination?',
        para_ref: '[1.1–1.2]',
        bullets: [
          'Placing Aryans atop biological hierarchy and others beneath',
          'Stormtroopers standing outside department stores with placards',
          'Excluding Jewish civil servants from government administrative posts',
        ],
        writing_frame: {
          connectives:
            "Persecution was initiated through... &bull; Specifically, the regime's racial theory classified... &bull; This led to official action on 1 April 1933 when... &bull; Consequently, ...",
        },
      },
      {
        stage: 2,
        dates: 'Sep 1935',
        title: 'The Nuremberg Laws (Citizenship & Blood Protection)',
        spec_focus:
          'Reich Citizenship Law; Blood Protection Law; Rassenschande; genealogical definition.',
        focus_clue: 'Why did the Nuremberg Laws turn antisemitism into legal statute?',
        para_ref: '[2.1–2.2]',
        bullets: [
          'Stripping German Jews of civil rights and passport vote',
          'Outlawing marriage and sexual relations with German blood',
          'Classifying citizens through grandfather parish baptism records',
        ],
        writing_frame: {
          connectives:
            'A decisive escalation occurred with... &bull; For example, the Nuremberg Laws enacted... &bull; This fundamentally changed the legal status of Jews because... &bull; As a result, ...',
        },
      },
      {
        stage: 3,
        dates: '1933–1938',
        title: 'Persecution of Roma, Homosexuals & The Disabled',
        spec_focus:
          'Roma internment (Marzahn); Paragraph 175; pink triangle; sterilization and Aktion T4.',
        focus_clue: 'How did racial hygiene theories target groups outside the racial community?',
        para_ref: '[3.1–3.2]',
        bullets: [
          'Deporting Roma into municipal camps on city outskirts',
          'Sending pink-triangle prisoners to concentration camp barracks',
          'Compulsorily sterilising patients diagnosed with schizophrenia',
        ],
        writing_frame: {
          connectives:
            'Other minority groups were targeted through... &bull; In particular, the regime persecuted... &bull; This was justified using... &bull; Furthermore, ...',
        },
      },
      {
        stage: 4,
        dates: '9–10 Nov 1938',
        title: 'Kristallnacht (The Night of Broken Glass)',
        spec_focus:
          'Kristallnacht; vom Rath assassination; 1,000 synagogues burned; 30,000 sent to camps.',
        focus_clue:
          'How did the November pogrom mark a decisive shift toward violent state terror?',
        para_ref: '[4.1–4.2]',
        bullets: [
          'Goebbels ordering SA in plain clothes into streets',
          'Shattering windows of seven thousand Jewish shops',
          'Burning thousand synagogues as police instructed to watch',
        ],
        writing_frame: {
          connectives:
            'A major turning point occurred on 9–10 November 1938 with... &bull; For instance, following the vom Rath assassination... &bull; This marked an escalation to state violence because... &bull; In addition, ...',
        },
      },
      {
        stage: 5,
        dates: '1938–1939',
        title: 'Economic Expropriation & Forced Emigration',
        spec_focus:
          'One-billion-mark fine; Aryanization of businesses; "J" stamp; forced emigration.',
        focus_clue:
          'How did the regime eliminate all remaining Jewish participation in economic life?',
        para_ref: '[5.1–5.2]',
        bullets: [
          'Imposing one-billion-mark fine on community for damages',
          'Banning children from attending German state primary schools',
          'Central Office for Jewish Emigration expelling thousands penniless',
        ],
        writing_frame: {
          connectives:
            'Finally, Jewish existence was eliminated by... &bull; Specifically, the regime imposed... &bull; In addition, Aryanization meant that... &bull; Overall, ...',
        },
      },
    ],
    causal_domino_spine: {
      title: 'KT4.4: The Persecution of Minorities (1933–1939)',
      subtitle: 'From April 1933 Boycott and Nuremberg Laws to Kristallnacht and Forced Emigration',
      stages: [
        {
          step: 1,
          date: '1933',
          para_ref: '[1.1–1.2]',
          title: 'Aryan Supremacy & The April Anti-Jewish Boycott',
          actor: 'Adolf Hitler, SA & Jewish Businesses',
          tag: '🛑 APRIL 1933 SHOP BOYCOTT',
          trigger:
            'The regime initiated state anti-Semitism by deploying brownshirts to picket Jewish shops with placards on 1 April and barring Jews from civil service posts.',
          desc: 'The regime initiated state anti-Semitism by deploying brownshirts to picket Jewish shops with placards on 1 April and barring Jews from civil service posts.',
          connective:
            'Marked the transition from violent street agitation into official state discrimination.',
          question:
            'How did the regime initiate public state-sponsored antisemitic discrimination?',
        },
        {
          step: 2,
          date: 'Sep 1935',
          para_ref: '[2.1–2.2]',
          title: 'The Nuremberg Laws (Citizenship & Blood Protection)',
          actor: 'Reichstag & German Jewish Population',
          tag: '📜 1935 NUREMBERG RACIAL LAWS',
          trigger:
            'The Nuremberg Laws stripped Jews of German citizenship, outlawed intermarriage and sexual relations with Aryans, and classified race via parish records.',
          desc: 'The Nuremberg Laws stripped Jews of German citizenship, outlawed intermarriage and sexual relations with Aryans, and classified race via parish records.',
          connective:
            'Turned racial discrimination into permanent constitutional law, legally isolating Jews from German society.',
          question: 'Why did the Nuremberg Laws turn antisemitism into legal statute?',
        },
        {
          step: 3,
          date: '1933–1938',
          para_ref: '[3.1–3.2]',
          title: 'Persecution of Roma, Homosexuals & The Disabled',
          actor: 'Himmler’s Police & Targeted Minorities',
          tag: '🧬 RACIAL PURITY PERSECUTION',
          trigger:
            'Police interned Roma at Marzahn, sent homosexuals wearing pink triangles to camps, and compulsorily sterilized 300,000 citizens with disabilities.',
          desc: 'Police interned Roma at Marzahn, sent homosexuals wearing pink triangles to camps, and compulsorily sterilized 300,000 citizens with disabilities.',
          connective:
            'Expanded state terror to eliminate any groups deemed biological or moral threats to the Aryan Volk.',
          question: 'How did racial hygiene theories target groups outside the racial community?',
        },
        {
          step: 4,
          date: '9–10 Nov 1938',
          para_ref: '[4.1–4.2]',
          title: 'Kristallnacht (The Night of Broken Glass)',
          actor: 'Joseph Goebbels, SA & 30,000 Detainees',
          tag: '🔥 KRISTALLNACHT STATE TERROR',
          trigger:
            'Goebbels ordered a nationwide pogrom following vom Rath’s assassination: 1,000 synagogues burned, 7,500 shops looted, and 30,000 men sent to camps.',
          desc: 'Goebbels ordered a nationwide pogrom following vom Rath’s assassination: 1,000 synagogues burned, 7,500 shops looted, and 30,000 men sent to camps.',
          connective:
            'Represented a violent escalation from legal exclusion to state-orchestrated destruction and mass incarceration.',
          question:
            'How did the November pogrom mark a decisive shift toward violent state terror?',
        },
        {
          step: 5,
          date: '1938–1939',
          para_ref: '[5.1–5.2]',
          title: 'Economic Expropriation & Forced Emigration',
          actor: 'Hermann Göring & Reinhard Heydrich',
          tag: '💰 1-BILLION FINE & ARYANIZATION',
          trigger:
            'The regime imposed a 1-billion-mark collective fine, forcibly "Aryanized" remaining businesses, and tasked Heydrich with expelling all Jews from the Reich.',
          desc: 'The regime imposed a 1-billion-mark collective fine, forcibly "Aryanized" remaining businesses, and tasked Heydrich with expelling all Jews from the Reich.',
          connective:
            'Liquidated Jewish economic survival in Germany, driving 250,000 into exile and laying the groundwork for wartime genocide.',
          question:
            'How did the regime eliminate all remaining Jewish participation in economic life?',
        },
      ],
    },
  },
};

for (let i = 12; i < 16; i++) {
  const lesson = unitData.lessons[i];
  const updateData = KT4_5_ACT_DATA[lesson.id];
  if (!updateData) continue;

  console.log(`\nTransforming ${lesson.id} (${lesson.title})...`);

  // 1. Apply 5 narrative_blocks
  lesson.narrative_blocks = updateData.narrative_blocks;
  console.log(`  - Applied 5 narrative blocks (${lesson.narrative_blocks.length} Acts).`);

  // 2. Apply workbook_stages
  lesson.workbook_stages = updateData.workbook_stages;
  console.log(`  - Aligned workbook_stages (${lesson.workbook_stages.length} stages).`);

  // 3. Apply causal_domino_spine
  lesson.causal_domino_spine = updateData.causal_domino_spine;
  console.log(
    `  - Aligned causal_domino_spine (${lesson.causal_domino_spine.stages.length} stages).`,
  );

  // 4. Update timeline_anchor
  lesson.timeline_anchor = updateData.causal_domino_spine.stages.map((st) => ({
    date: st.date,
    title: st.title,
    desc: st.trigger,
    para_ref: st.para_ref,
  }));
  console.log(`  - Aligned timeline_anchor (${lesson.timeline_anchor.length} anchors).`);

  // 5. Apply teacher_notes
  lesson.teacher_notes = updateData.teacher_notes;
  console.log(`  - Updated teacher_notes with 5 structured objectives & hinge questions.`);
}

const newFileContent =
  'const unitData = ' +
  JSON.stringify(unitData, null, 2) +
  ';\n\nexport default unitData;\nif (typeof module !== "undefined" && module.exports) {\n  module.exports = unitData;\n}\n';
fs.writeFileSync(dataFilePath, newFileContent, 'utf8');

console.log(
  '\n✅ Successfully migrated Key Topic 4 (Life in Nazi Germany) to 5-Act Gold Standard in data.js!',
);
