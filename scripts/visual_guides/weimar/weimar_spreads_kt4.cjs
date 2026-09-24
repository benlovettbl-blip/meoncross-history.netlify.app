/**
 * weimar_spreads_kt4.cjs
 *
 * Spreads 13 to 16 for Key Topic 4: Life in Nazi Germany, 1933–39
 * Pearson Edexcel GCSE (9–1) History Paper 3 Option 31 (1HI0/31).
 *
 * Enforces the Paper 3 4-4-4-4 Question Matrix:
 * - Spread 13 (KT 4.1): inference_causation (Section A: Q1 Inference [4m] + Q2 Explain Why [12m])
 * - Spread 14 (KT 4.2): source_utility (Section B: Q3(a) Utility of Sources B and C [8m])
 * - Spread 15 (KT 4.3): interpretation_diff_why (Section B: Q3(b) Views Diff [4m] + Q3(c) Reasons [4m])
 * - Spread 16 (KT 4.4): interpretation_eval (Section B: Q3(d) Evaluative Essay [16+4m])
 */

module.exports = [
  // =========================================================================
  // SPREAD 13: KT 4.1 — NAZI POLICIES TOWARDS WOMEN, 1933–1939
  // Exam Format: inference_causation (Section A: Q1 [4m] + Q2 [12m])
  // =========================================================================
  {
    id: 'lesson_4_1',
    topic: 'Key Topic 4: Life in Nazi Germany, 1933–39',
    title: 'KT 4.1: Nazi Policies Towards Women, 1933–1939',
    footerTag: 'KT 4.1: Policies Towards Women, 1933–39',
    left: {
      sectionTag: 'Family & Ideology',
      contextTitle: 'Strategic Context & Geopolitical Overview',
      summary:
        'Nazi social policy strictly confined women to the domestic sphere: their primary biological duty was bearing and raising pure Aryan children to expand the Reich, summarised by the traditional slogan *Kinder, Küche, Kirche* (Children, Kitchen, Church). Through financial incentives (marriage loans, tax relief) and honours (the Mother’s Cross), the regime boosted birthrates while simultaneously purging women from civil service, judicial, and medical professions.',
      pillars: [
        {
          title: 'The Domestic Ideology: Kinder, Küche, Kirche',
          subtitle: 'The Aryan Mother Ideal',
          bullets: [
            '**The Anti-Feminist Ideal:** Condemned the Weimar "New Woman"; celebrated fertile, modest mothers who shunned makeup, diets, and trousers.',
            '**NS-Frauenschaft:** The National Socialist Women’s League subordinated all female civic life under Reich Women’s Leader Gertrud Scholtz-Klink.',
            '**Political Exclusion:** Women were banned from holding political office, serving in the Reichstag, or occupying executive posts within the NSDAP.',
          ],
        },
        {
          title: 'Pro-Natalist Incentives & The Mother’s Cross',
          subtitle: 'Financial Bribes for Childbearing',
          bullets: [
            '**Marriage Loans (1933):** Interest-free loans of up to 1,000 marks given to newlyweds; 25% forgiven for each child born (*abgekindert*).',
            '**Cross of Honour of the German Mother:** Awarded on Hitler’s mother’s birthday: Bronze (4–5), Silver (6–7), and Gold (8+ children) medals.',
            '**Birth Rate Rebound:** Birthrates rose from 14.7 per 1,000 in 1933 to 20.4 by 1939, driven by loans, family allowances, and economic recovery.',
          ],
        },
        {
          title: 'Employment Purges & The Rearmament U-Turn',
          subtitle: 'From Kitchen back to Factory',
          bullets: [
            '**Professional Purges (1933–36):** Female doctors, judges, and civil servants dismissed; university enrollment strictly capped at a 10% quota.',
            '**The 1937 Labour Shortage:** As rearmament boomed, the regime reversed its rhetoric, introducing the compulsory "Duty Year" in factories.',
            '**Himmler’s Lebensborn (1935):** State breeding homes where racially screened SS men fathered 8,000 children with Aryan women out of wedlock.',
          ],
        },
      ],
      keyFigures: [
        {
          name: 'Gertrud Scholtz-Klink',
          role: 'Reich Women’s Leader (*Reichsfrauenführerin*); head of the NS-Frauenschaft tasked with promoting domestic motherhood and ideological compliance.',
        },
        {
          name: 'Heinrich Himmler',
          role: 'Reichsführer-SS who founded the Lebensborn programme in 1935 to encourage SS officers to father racially pure Aryan children.',
        },
        {
          name: 'Joseph Goebbels',
          role: 'Propaganda Minister who directed campaigns glorifying mothers, establishing Mother’s Day as an official national holiday.',
        },
        {
          name: 'Bernhard Rust',
          role: 'Reich Education Minister who enforced the 10% female university quota and converted girls’ grammar schools into domestic science academies.',
        },
      ],
      milestones: [
        {
          date: 'Jun 1933',
          event: 'Law for the Encouragement of Marriage introduces 1,000 mark interest-free loan',
        },
        {
          date: 'Jul 1933',
          event: 'Sterilization Law enacted, targeting women with alleged hereditary disabilities',
        },
        {
          date: 'Dec 1935',
          event: 'Heinrich Himmler establishes the SS Lebensborn ("Fount of Life") initiative',
        },
        {
          date: 'Dec 1938',
          event: 'Cross of Honour of the German Mother (Mutterkreuz) instituted by decree',
        },
        {
          date: 'Feb 1939',
          event: 'Compulsory "Duty Year" instituted for unmarried women to ease factory shortages',
        },
      ],
    },
    right: {
      question: {
        typeHeader: 'Section A: Q1 Inference [4m] & Q2 Explain Why [12m]',
        title: 'Nazi Aims and Policies Regarding Women (1933–1939)',
        stem: 'Q1 (4m) Give two inferences from Source A about Nazi views on the role of women in society • Q2 (12m) Explain why the Nazi regime changed its policies towards women in employment between 1933 and 1939.',
        marks: '4 + 12 = 16',
        marksTime: '16 Marks • ~24 Mins Total',
        planningGuideTitle: 'Examiner Planning & Structural Framework:',
        planningGuide:
          '<strong>Q1 Formula:</strong> Inference 1 + Direct Quote from Source A; Inference 2 + Direct Quote. Zero provenance.<br/><strong>Q2 Formula (3 PEE Paragraphs):</strong> (1) Initial ideological focus on removing women from work to cut male unemployment & boost birthrates → (2) Rapid economic rearmament under Göring’s Four-Year Plan creating severe industrial labour shortages → (3) The introduction of the compulsory "Duty Year" (1937–39) forcing women back into war production.',
        modelAnswer:
          '<strong>Q1 (Inference):</strong> One inference from Source A is that the Nazi regime believed a woman’s highest duty was domestic and maternal rather than professional. The source states "the German woman’s world is her husband, her family, her children and her home", showing the party sought to confine female life strictly to the domestic sphere. A second inference is that the regime viewed childbearing as an essential racial service to the state. The source notes "every child brought into the world by an Aryan mother is a battle won for the preservation of our people", proving motherhood was militarised as a national obligation.<br/><br/><strong>Q2 (Explain Why):</strong> One reason the Nazi regime initially sought to exclude women from employment between 1933 and 1936 was ideological and economic. Ideologically, the Nazis rejected the Weimar "New Woman", preaching that female identity belonged strictly to *Kinder, Küche, Kirche*. Economically, with over 6 million men unemployed in 1933, the regime offered financial bribes—notably the 1933 Marriage Loan (*Ehedarlehen*) of up to 1,000 marks—which was granted only if the bride agreed to leave her job. Furthermore, the regime dismissed thousands of female civil servants, doctors, and lawyers, and restricted female university entry to a 10% quota, effectively freeing up jobs for unemployed male breadwinners.<br/><br/>However, after 1936, the regime was forced to radically change its policies due to the economic pressures of rapid military rearmament. Under Hermann Göring’s Four-Year Plan, massive state investment in munitions, steel, and synthetic fuel industries generated an acute industrial labour shortage. With millions of young men conscripted into the expanding Wehrmacht, German factories desperately needed workers. Consequently, the regime executed a pragmatic policy reversal: the requirement for women to quit work to receive marriage loans was quietly dropped in 1937, and in 1938 the regime introduced the compulsory "Duty Year" (*Pflichtjahr*), which required all unmarried women under 25 to complete a year of manual labour in agriculture or arms factories. By 1939, over 14 million women were employed in Germany—far higher than under the Weimar Republic.',
        examinerNote:
          'Full marks. Q1 gives two distinct inferences with verbatim quotes. Q2 provides sophisticated multi-causal analysis explaining the direct mechanism behind the 1937 economic U-turn (Marriage Loans, 10% quota, Four-Year Plan, Duty Year).',
        pitfallCategory: 'Inference & Multi-Causal Pitfalls',
        pitfall:
          'In Q2, do not simply describe the policies. You must explain the *reasons for the change*—contrasting the 1933 unemployment reduction aims with the 1937 rearmament labour shortages.',
      },
      causalPathway: {
        title: 'Visual Causal Pathway: The Policy Reversal on Women in Labour',
        steps: [
          {
            stage: '1. 1933 Purges & Loans',
            desc: 'Women purged from civil service and medicine; 1,000 mark marriage loans given to leave jobs.',
          },
          {
            stage: '2. Pro-Natalist Honors',
            desc: 'Mother’s Cross and tax allowances celebrate domestic mothers; birthrates climb to 20.4 per 1,000.',
          },
          {
            stage: '3. Rearmament Shortage',
            desc: 'Göring’s 1936 Four-Year Plan creates severe industrial labour deficits; Wehrmacht conscription expands.',
          },
          {
            stage: '4. The 1937 U-Turn',
            desc: 'Marriage loan restrictions dropped; compulsory "Duty Year" drafts women back into arms factories.',
          },
        ],
      },
      wordBank: [
        {
          term: 'Kinder, Küche, Kirche',
          def: 'Children, Kitchen, Church; traditional slogan summarizing Nazi domestic ideology.',
        },
        {
          term: 'Marriage Loans',
          def: 'Interest-free loans of 1,000 marks; 25% cancelled per child born to encourage marriage.',
        },
        {
          term: 'Mother’s Cross',
          def: 'Mutterkreuz; medals awarded for childbearing (Bronze 4–5, Silver 6–7, Gold 8+).',
        },
        {
          term: 'NS-Frauenschaft',
          def: 'National Socialist Women’s League led by Gertrud Scholtz-Klink to promote conformity.',
        },
        {
          term: 'Lebensborn',
          def: 'Fount of Life; Himmler’s SS initiative where Aryan women fathered children with SS officers.',
        },
        {
          term: 'Duty Year',
          def: 'Pflichtjahr; compulsory labour service in farms and factories for unmarried women from 1938.',
        },
        {
          term: 'University Quota',
          def: 'Nazi policy strictly restricting female university students to a maximum of 10%.',
        },
        {
          term: 'Sterilization Law',
          def: '1933 law forcing 400,000 women and men with alleged hereditary defects to be sterilised.',
        },
        {
          term: 'Doppelverdiener',
          def: 'Derogatory Nazi term for married working women whose employment was condemned.',
        },
        {
          term: 'Four-Year Plan',
          def: 'Göring’s 1936 economic initiative that caused labour shortages, forcing women into work.',
        },
        {
          term: 'Scholtz-Klink',
          def: 'Reich Women’s Leader who directed ideological indoctrination and home economics.',
        },
        {
          term: 'Abgekindert',
          def: 'System of writing off 25% of the state marriage loan principal for each child born.',
        },
      ],
    },
  },

  // =========================================================================
  // SPREAD 14: KT 4.2 — NAZI POLICIES TOWARDS THE YOUNG, 1933–1939
  // Exam Format: source_utility (Section B: Q3(a) [8m])
  // =========================================================================
  {
    id: 'lesson_4_2',
    topic: 'Key Topic 4: Life in Nazi Germany, 1933–39',
    title: 'KT 4.2: Nazi Policies Towards the Young, 1933–1939',
    footerTag: 'KT 4.2: Policies Towards the Young, 1933–39',
    left: {
      sectionTag: 'Youth & Education',
      contextTitle: 'Strategic Context & Geopolitical Overview',
      summary:
        'Hitler understood that securing the "Thousand-Year Reich" required the complete indoctrination of German youth. Education was thoroughly Nazified: curricula were rewritten around racial biology, militarised history, and physical conditioning, while teachers were forced into the Nazi Teachers League (NSLB). Outside school, independent youth groups were absorbed into the compulsory Hitler Youth (*Hitlerjugend*) and League of German Girls (BDM).',
      pillars: [
        {
          title: 'Nazifying the School Curriculum & Teachers',
          subtitle: 'Ideological Indoctrination',
          bullets: [
            '**Racial Science & Biology:** Biology rewritten as *Rassenkunde*, teaching pupils to classify Aryans as creators and Jews as parasitic bacilli.',
            '**Militarised PE & History:** Physical training took up 15% of curriculum (2–3 hours daily); history emphasized German military victories and Versailles betrayal.',
            '**Vetting Teachers (NSLB):** 97% of teachers compelled to join Nazi League; Jewish teachers fired; pupils encouraged to report unenthusiastic staff.',
          ],
        },
        {
          title: 'The Hitler Youth (Hitlerjugend)',
          subtitle: 'Paramilitary Conditioning for Boys',
          bullets: [
            '**Deutsches Jungvolk & HJ:** Boys aged 10–14 joined Jungvolk, graduating at 14 to the Hitler Youth under Youth Leader Baldur von Schirach.',
            '**Military Drill:** Activities centered on small-bore rifle shooting, military map-reading, grenade tossing, and grueling endurance marches.',
            '**Compulsory Enrollment (1936/39):** Hitler Youth Law made membership mandatory; numbers swelled from 108,000 in 1932 to 8.2 million by 1939.',
          ],
        },
        {
          title: 'The BDM & Elite Nazi Academies',
          subtitle: 'Motherhood & The Spartan Caste',
          bullets: [
            '**League of German Girls (BDM):** Girls aged 14–18 trained in gymnastics, folk culture, camping, and domestic homemaking to prepare for motherhood.',
            '**Napolas & Adolf Hitler Schools:** Elite state boarding schools run under military discipline to produce future Wehrmacht officers and SS leaders.',
            '**Youth Alienation:** By late 1930s, boring drills and harsh discipline led to rising youth disaffection, spawning rival Edelweiss Pirates.',
          ],
        },
      ],
      keyFigures: [
        {
          name: 'Baldur von Schirach',
          role: 'Reich Youth Leader (*Reichsjugendführer*); orchestrated the Nazification of German youth and directed the Hitler Youth from 1931 to 1940.',
        },
        {
          name: 'Bernhard Rust',
          role: 'Reich Minister of Science, Education and National Culture; dismissed Jewish educators and rewritten national school curricula.',
        },
        {
          name: 'Trude Mohr',
          role: 'First national leader of the League of German Girls (BDM) from 1934 to 1937, establishing camping, fitness, and domestic curricula.',
        },
        {
          name: 'Jutta Rüdiger',
          role: 'Appointed head of the BDM in 1937; expanded compulsory membership and integrated girls into wartime agricultural relief services.',
        },
      ],
      milestones: [
        { date: '1933', event: 'First Napolas elite military boarding schools established' },
        {
          date: '1934',
          event: 'Teachers required to join the National Socialist Teachers League (NSLB)',
        },
        {
          date: 'Dec 1936',
          event: 'Hitler Youth Law gives state monopoly over youth organization',
        },
        {
          date: 'Mar 1939',
          event: 'Second Youth Execution Order makes Hitler Youth membership legally compulsory',
        },
        {
          date: '1939',
          event: 'Hitler Youth and BDM enrollment reaches 8.2 million German children',
        },
      ],
    },
    right: {
      question: {
        typeHeader: 'Section B: Q3(a) Source Utility [8m]',
        title: 'The Impact of the Hitler Youth on German Children',
        stem: 'Q3(a) Study Sources B and C. How useful are Sources B and C for an enquiry into the methods used by the Hitler Youth to indoctrinate German children in the 1930s? Explain your answer, using Sources B and C and your knowledge of the historical context. (8 marks)',
        marks: '8',
        marksTime: '8 Marks • ~14 Mins Total',
        planningGuideTitle: 'Examiner Planning & C-O-P Framework:',
        planningGuide:
          '<strong>Structure:</strong> (1) Evaluate Source B (Content + Context + Provenance NOP) → (2) Evaluate Source C (Content + Context + Provenance NOP) → (3) Comparative synthesis judging utility.<br/><strong>Core Rule:</strong> Highlight how Source B reflects the thrilling, adventurous outdoor appeal of early membership, while Source C captures the authoritarian military drilling and loss of personal freedom.',
        modelAnswer:
          'Source B is useful for showing how the Hitler Youth successfully attracted young boys through outdoor adventure and comradeship. The source, an extract from a memoir by a former member recalling his time in the *Deutsches Jungvolk* in 1934, describes the excitement of weekend camping trips, campfire singing, building rope bridges, and wearing smart uniforms that gave him a sense of national pride and maturity. This content matches historical context: in the early years of the regime, the Hitler Youth appealed powerfully to children eager to escape parental control and boring classrooms through sports and outdoor camaraderie. The provenance adds utility because, as a reflective post-war memoir, it provides an honest, introspective account explaining why ordinary children were genuinely captivated by Nazi youth initiatives before compulsory drilling took over.<br/><br/>Source C is equally useful because it illustrates the oppressive military indoctrination and authoritarian regimentation of the movement. A secret Gestapo surveillance report from 1938 notes growing truancy among 16-year-old boys in Cologne who resented spending their weekends doing repetitive rifle drills, obstacle courses, and memorising Nazi racial dogmas under arrogant teenage squad leaders. This is historically accurate: once the Hitler Youth Law made membership virtually compulsory in 1936 (and legally compulsory in 1939), the organization became heavily militarised under Baldur von Schirach, designed purely to churn out compliant soldiers for the Wehrmacht. This militarisation sparked significant resentment, driving working-class youths into rebellious countercultures like the Edelweiss Pirates. The provenance is highly reliable: as an internal police report intended only for senior officials, it had no propaganda motive to hide growing youth alienation. Together, Sources B and C provide comprehensive utility: Source B explains the seductive appeal of adventure that drew children into the movement, while Source C exposes the harsh military regimentation that caused widespread disillusionment.',
        examinerNote:
          'Full 8/8 marks. Evaluates both sources through Content, Context, and Provenance, explaining the shift from early enthusiasm to later regimentation.',
        pitfallCategory: 'Utility & Provenance Pitfalls',
        pitfall:
          'Do not overlook the difference between early voluntary membership (pre-1936) and late compulsory drilling (post-1936). The historical context evolved rapidly.',
      },
      causalPathway: {
        title: 'Visual Causal Pathway: Totalitarian Control of Youth (1933–1939)',
        steps: [
          {
            stage: '1. School Curricula Rewritten',
            desc: 'Biology becomes "Racial Science"; PE expanded to 15% of hours; NSLB vets all teachers.',
          },
          {
            stage: '2. Rival Groups Banned',
            desc: 'Church youth clubs and scout movements dissolved; absorbed into Hitler Youth and BDM.',
          },
          {
            stage: '3. Compulsory Law (1936/39)',
            desc: 'Hitler Youth Law makes membership legally compulsory, swelling ranks to 8.2 million boys and girls.',
          },
          {
            stage: '4. Military Conditioning',
            desc: 'Rifle practice, trench digging, and map-reading prepare a generation of boys for the Wehrmacht.',
          },
        ],
      },
      wordBank: [
        {
          term: 'Hitlerjugend (HJ)',
          def: 'The Hitler Youth; Nazi organisation for boys aged 14 to 18 preparing for military service.',
        },
        {
          term: 'Jungvolk',
          def: 'Deutsches Jungvolk; junior branch of the Hitler Youth for boys aged 10 to 14.',
        },
        {
          term: 'BDM',
          def: 'Bund Deutscher Mädel; League of German Girls training females aged 14 to 18 for motherhood.',
        },
        {
          term: 'Jungmädel',
          def: 'Junior branch of the League of German Girls for young females aged 10 to 14.',
        },
        {
          term: 'Baldur von Schirach',
          def: 'Reich Youth Leader who directed the expansion and militarization of the Hitler Youth.',
        },
        {
          term: 'NSLB',
          def: 'National Socialist Teachers League; professional body enrolling 97% of German educators.',
        },
        {
          term: 'Rassenkunde',
          def: 'Racial Science; mandatory biology curriculum teaching Aryan superiority and eugenics.',
        },
        {
          term: 'Napolas',
          def: 'Nationalpolitische Erziehungsanstalten; elite state boarding schools training military officers.',
        },
        {
          term: 'Adolf Hitler Schools',
          def: 'Elite boarding academies administered by the SS to educate the future Nazi ruling elite.',
        },
        {
          term: 'Ordensburgen',
          def: 'Castles of the Order; fortress academies for elite adult Nazi ideological and endurance training.',
        },
        {
          term: 'Hitler Youth Law',
          def: 'December 1936 law abolishing rival youth clubs and granting the HJ an organizational monopoly.',
        },
        {
          term: 'Bernhard Rust',
          def: 'Reich Education Minister who systematically Nazified the German school curriculum.',
        },
      ],
    },
  },

  // =========================================================================
  // SPREAD 15: KT 4.3 — EMPLOYMENT AND LIVING STANDARDS, 1933–1939
  // Exam Format: interpretation_diff_why (Section B: Q3(b) [4m] + Q3(c) [4m])
  // =========================================================================
  {
    id: 'lesson_4_3',
    topic: 'Key Topic 4: Life in Nazi Germany, 1933–39',
    title: 'KT 4.3: Employment and Living Standards, 1933–1939',
    footerTag: 'KT 4.3: Employment & Living Standards, 1933–39',
    left: {
      sectionTag: 'Labour & Economy',
      contextTitle: 'Strategic Context & Geopolitical Overview',
      summary:
        'Between 1933 and 1939, official unemployment in Germany plummeted from 6 million to under 302,000, which Nazi propaganda celebrated as an "economic miracle". However, this recovery was artificially driven by Schacht’s public works, Göring’s Four-Year Plan rearmament, and massive "invisible unemployment". While the German Labour Front provided subsidised leisure via Strength Through Joy (KdF), workers lost free trade unions, faced longer hours, and suffered stagnant real wages.',
      pillars: [
        {
          title: 'The "Economic Miracle" & Unemployment Drop',
          subtitle: 'Public Works & Rearmament',
          bullets: [
            '**The RAD (Reich Labour Service):** Made 6 months of manual labour compulsory for men aged 18–25; 400,000 men planted forests and drained marshes.',
            '**Reichsautobahn Construction:** Fritz Todt directed 125,000 workers building 3,800 km of dual-carriageway highways designed for rapid troop transit.',
            '**Göring’s Four-Year Plan (1936):** Aimed for total military self-sufficiency (*Autarky*) by boosting synthetic rubber (*Buna*), oil, and heavy industry.',
          ],
        },
        {
          title: 'The Reality: "Invisible Unemployment"',
          subtitle: 'Manipulating the Statistics',
          bullets: [
            '**Excluded Demographics:** Official jobless figures excluded Jews sacked from jobs, married women forced into the home, and RAD conscripts.',
            '**Conscription Absorption:** Reintroduction of military conscription in 1935 absorbed 1.4 million young men into the expanding Wehrmacht.',
            '**Concentration Camp Inmates:** Hundreds of thousands of political prisoners and "asocials" held in camps were eliminated from unemployment rolls.',
          ],
        },
        {
          title: 'The German Labour Front: DAF, KdF & SdA',
          subtitle: 'Subsidised Leisure vs Lost Freedoms',
          bullets: [
            '**The DAF under Robert Ley:** Free trade unions banned; strikes outlawed; workers could not leave jobs without employer-held Work Books (*Arbeitsbuch*).',
            '**Strength Through Joy (KdF):** Provided 10 million workers subsidised holidays, cinema tickets, and cruise liner tours (e.g. *Wilhelm Gustloff*).',
            '**The Volkswagen Scheme:** 336,000 workers paid 5 marks weekly for the KDF-Wagen; zero cars delivered as factories pivoted to military vehicles.',
          ],
        },
      ],
      keyFigures: [
        {
          name: 'Hjalmar Schacht',
          role: 'Reichsbank President and Economics Minister (1933–37); engineered public works, Mefo deficit financing, and the New Plan to reduce unemployment.',
        },
        {
          name: 'Dr. Robert Ley',
          role: 'Leader of the German Labour Front (DAF); abolished independent trade unions and managed Strength Through Joy (KdF) and the Volkswagen scheme.',
        },
        {
          name: 'Fritz Todt',
          role: 'Chief engineer and Inspector General of German Roads who supervised the monumental Reichsautobahn construction project.',
        },
        {
          name: 'Hermann Göring',
          role: 'Appointed Plenipotentiary of the Four-Year Plan in 1936, prioritizing military rearmament over consumer living standards ("Guns before Butter").',
        },
      ],
      milestones: [
        {
          date: 'May 1933',
          event: 'Independent trade unions abolished; German Labour Front (DAF) established',
        },
        {
          date: 'Jun 1933',
          event: 'First Reichsautobahn construction begins; Fritz Todt appointed head',
        },
        {
          date: 'Mar 1935',
          event: 'Compulsory military conscription reintroduced, expanding the Wehrmacht',
        },
        {
          date: 'Oct 1936',
          event: 'Hermann Göring launches the Four-Year Plan to achieve economic Autarky',
        },
        {
          date: '1938',
          event: 'Volkswagen "KDF-Wagen" savings stamp scheme launched at Wolfsburg',
        },
      ],
    },
    right: {
      question: {
        typeHeader: 'Section B: Q3(b) & Q3(c) Historians’ Views [8m]',
        title: 'Did the Standard of Living of German Workers Improve (1933–1939)?',
        stem: 'Q3(b) Study Interpretations 1 and 2. What is the main difference between these views on living standards in Nazi Germany between 1933 and 1939? (4 marks) • Q3(c) Suggest one reason why Interpretations 1 and 2 give different views. (4 marks)',
        marks: '4 + 4 = 8',
        marksTime: '8 Marks • ~12 Mins Total',
        planningGuideTitle: 'Examiner Planning & Structural Framework:',
        planningGuide:
          '<strong>Q3(b) Formula:</strong> State core difference in line 1 → Quote/detail Interpretation 1 → Quote/detail Interpretation 2.<br/><strong>Q3(c) Formula:</strong> Explain difference by showing historians chose different evidence/focus (e.g. KdF holidays & full employment vs longer working hours, higher food prices & lost union rights).',
        modelAnswer:
          '<strong>Q3(b) Difference in Views:</strong> The main difference is that Interpretation 1 argues that the living standards of German workers improved significantly under the Nazis due to full employment and subsidised leisure programmes, whereas Interpretation 2 contends that workers were exploited, facing longer hours, declining real purchasing power, and the total destruction of trade union freedoms. Interpretation 1 points out that "workers enjoyed complete job security, rising gross wages, and unprecedented access to subsidised KdF theatre tickets, sports facilities, and cruise holidays". In contrast, Interpretation 2 asserts that "the so-called economic miracle was a facade", arguing that longer working hours and food price inflation meant workers were materially worse off while losing the right to strike or negotiate wages.<br/><br/><strong>Q3(c) Reasons for Difference:</strong> Interpretations 1 and 2 differ because the historians have focused on different economic metrics. The author of Interpretation 1 examines official state welfare initiatives and nominal wage statistics—specifically the drop in unemployment from 6 million to 302,000, alongside the dramatic expansion of Robert Ley’s Strength Through Joy (KdF), which took over 10 million workers on subsidised excursions by 1938. Conversely, the author of Interpretation 2 focuses on working conditions and real wages, analysing data showing average weekly hours climbed from 43 to over 49 hours by 1939, while the DAF’s internal Work Books (*Arbeitsbuch*) stripped workers of freedom of movement, and the Volkswagen scheme took millions of marks in savings without ever delivering a civilian car.',
        examinerNote:
          'Full 8/8 marks. Q3(b) establishes a precise contrast supported by direct citations. Q3(c) explains WHY they differ by evaluating nominal wage/KdF data against real wages and working hours.',
        pitfallCategory: 'Interpretation Difference & Origin Pitfalls',
        pitfall:
          'Do not confuse gross wages with real wages. While take-home cash rose slightly, workers worked far longer hours and food costs were substantially higher.',
      },
      causalPathway: {
        title: 'Visual Causal Pathway: The Economics of Rearmament & Exploitation',
        steps: [
          {
            stage: '1. Trade Unions Smashed',
            desc: 'Free trade unions abolished in May 1933; DAF outlaws strikes and freezes wage bargaining.',
          },
          {
            stage: '2. Public Works & RAD',
            desc: 'Compulsory RAD and Autobahn construction artificially absorb hundreds of thousands of unemployed.',
          },
          {
            stage: '3. Rearmament Blitz',
            desc: 'Göring’s Four-Year Plan channels state capital into heavy arms; conscription absorbs 1.4M men.',
          },
          {
            stage: '4. Subsidised Pacification',
            desc: 'KdF holidays and VW schemes distract workers from longer hours and stagnant living standards.',
          },
        ],
      },
      wordBank: [
        {
          term: 'DAF',
          def: 'German Labour Front; compulsory state worker organisation replacing trade unions in 1933.',
        },
        {
          term: 'RAD',
          def: 'Reichsarbeitsdienst; compulsory 6-month manual labour service for young men aged 18–25.',
        },
        {
          term: 'Autobahn',
          def: 'Network of dual-carriageway motorways built under Fritz Todt to employ workers and move troops.',
        },
        {
          term: 'Four-Year Plan',
          def: '1936 economic initiative directed by Hermann Göring to prepare Germany for war.',
        },
        {
          term: 'Autarky',
          def: 'Economic self-sufficiency; Nazi objective of producing all food and raw materials internally.',
        },
        {
          term: 'KdF',
          def: 'Kraft durch Freude (Strength Through Joy); DAF leisure division providing subsidised holidays.',
        },
        {
          term: 'Beauty of Labour',
          def: 'Schönheit der Arbeit (SdA); DAF division improving factory lighting and canteens.',
        },
        {
          term: 'Volkswagen',
          def: 'People’s Car; savings scheme launched in 1938 that never delivered civilian vehicles.',
        },
        {
          term: 'Work Book',
          def: 'Arbeitsbuch; mandatory employment record held by employers, restricting job mobility.',
        },
        {
          term: 'Invisible Unemployment',
          def: 'Exclusion of women, Jews, and conscripts from official jobless statistics.',
        },
        {
          term: 'Mefo Bills',
          def: 'Promissory notes issued by Schacht to secretly finance military rearmament on credit.',
        },
        {
          term: 'Guns before Butter',
          def: 'Göring’s famous slogan justifying consumer goods shortages to fund armaments.',
        },
      ],
    },
  },

  // =========================================================================
  // SPREAD 16: KT 4.4 — THE PERSECUTION OF MINORITIES, 1933–1939
  // Exam Format: interpretation_eval (Section B: Q3(d) [16+4m])
  // =========================================================================
  {
    id: 'lesson_4_4',
    topic: 'Key Topic 4: Life in Nazi Germany, 1933–39',
    title: 'KT 4.4: The Persecution of Minorities, 1933–1939',
    footerTag: 'KT 4.4: Persecution of Minorities, 1933–39',
    left: {
      sectionTag: 'Racial Terror',
      contextTitle: 'Strategic Context & Geopolitical Overview',
      summary:
        'Nazi ideology rested upon pseudoscientific Social Darwinism: the Aryan race was viewed as the supreme *Herrenvolk*, while Jews, Roma, Sinti, homosexuals, and the disabled were categorised as "subhumans" (*Untermenschen*) or biological threats to racial hygiene. From the 1933 economic boycott and the 1935 Nuremberg Laws to the nationwide state-orchestrated violence of Kristallnacht in November 1938, persecution escalated systematically from legal exclusion to violent terror.',
      pillars: [
        {
          title: 'Nazi Racial Hierarchy & Eugenics',
          subtitle: 'The Biological State',
          bullets: [
            '**The Aryan Ideal (*Herrenvolk*):** Nordic peoples viewed as the master race; Slavs, Roma, and Black people classified as racially inferior *Untermenschen*.',
            '**Anti-Semitism as Biological Doctrine:** Jews defined not as a religious group, but as a parasitic bacillus destroying the purity of German blood.',
            '**Sterilization Law (1933):** Forced sterilization of 400,000 citizens diagnosed with alleged hereditary illnesses, mental disabilities, and alcoholism.',
          ],
        },
        {
          title: 'Legal Persecution & The Nuremberg Laws (1935)',
          subtitle: 'Apartheid Codified by Law',
          bullets: [
            '**April 1933 Boycott:** SA stormtroopers picketed Jewish shops, department stores, and doctors, painting Stars of David on windows.',
            '**Reich Citizenship Law (Sept 1935):** Stripped German Jews of citizenship, civil rights, and the right to vote, reducing them to second-class subjects.',
            '**Protection of German Blood:** Outlawed marriages and sexual relations between Jews and German citizens (*Rassenschande*).',
          ],
        },
        {
          title: 'Kristallnacht & Economic Expropriation (1938)',
          subtitle: 'State-Sanctioned Pogrom',
          bullets: [
            '**Kristallnacht (9–10 Nov 1938):** Following Vom Rath’s shooting, Goebbels unleashed SA/SS mobs: 250+ synagogues burned, 91 Jews killed, 7,500 shops looted.',
            '**Mass Internment:** Gestapo arrested 30,000 Jewish men, sending them to Dachau, Sachsenhausen, and Buchenwald to force emigration.',
            '**Aryanisation & 1B Mark Fine:** Jewish community forced to pay 1 billion Reichsmarks for damage; Jews completely barred from commercial and civic life.',
          ],
        },
      ],
      keyFigures: [
        {
          name: 'Reinhard Heydrich',
          role: 'Head of the SD and Gestapo; organized the mass arrest of 30,000 Jewish men during Kristallnacht and established early forced emigration offices.',
        },
        {
          name: 'Dr. Joseph Goebbels',
          role: 'Propaganda Minister who delivered the inflammatory Munich speech on 9 November 1938 that unleashed the Kristallnacht pogrom nationwide.',
        },
        {
          name: 'Herschel Grynszpan',
          role: '17-year-old Polish Jewish youth who shot German diplomat Ernst vom Rath in Paris after his parents were deported into no-man’s-land.',
        },
        {
          name: 'Julius Streicher',
          role: 'Notorious publisher of the violently anti-Semitic, pornographic newspaper *Der Stürmer*; leading instigator of anti-Jewish hatred.',
        },
      ],
      milestones: [
        {
          date: '1 Apr 1933',
          event: 'One-day nationwide boycott of Jewish shops, doctors, and lawyers',
        },
        {
          date: '15 Sep 1935',
          event: 'Nuremberg Laws strip German Jews of citizenship and ban intermarriage',
        },
        {
          date: '9–10 Nov 1938',
          event: 'Kristallnacht; 250+ synagogues burned, 91 Jews murdered, 30,000 arrested',
        },
        {
          date: '12 Nov 1938',
          event: 'Nazis impose collective 1 billion Reichsmark fine on German Jewish community',
        },
        {
          date: 'Sep 1939',
          event: 'Hitler signs secret decree initiating the Aktion T4 euthanasia programme',
        },
      ],
    },
    right: {
      question: {
        typeHeader: 'Section B: Q3(d) Evaluative Essay [16+4m]',
        title: 'The Nature and Escalation of Nazi Anti-Semitic Persecution',
        stem: 'Q3(d) How far do you agree with Interpretation 1 that the persecution of Jewish people in Germany between 1933 and 1939 was a gradual, planned escalation that led inevitably to violent physical destruction? (16+4 marks)',
        marks: '16 + 4 SPaG = 20',
        marksTime: '20 Marks • ~24 Mins Total',
        planningGuideTitle: 'Examiner Planning & Band 4 Rubric:',
        planningGuide:
          '<strong>Structure:</strong> (1) Introduction defining the debate (Intentionalist vs Structuralist/Functionalist) → (2) Arguments supporting Interpretation 1 (clear legal progression: 1933 Boycott → 1935 Nuremberg Laws → 1938 Kristallnacht) → (3) Arguments evaluating Interpretation 2 (spasmodic radicalisation driven by external events: 1936 Olympic pause, Vom Rath assassination & radical Party pressure) → (4) Nuanced evaluative verdict.',
        modelAnswer:
          'I partially agree with Interpretation 1 that Nazi anti-Semitic persecution escalated systematically in severity between 1933 and 1939, culminating in the violent terror of Kristallnacht. However, Interpretation 1 overstates the degree of master-planning: Interpretation 2 is historically more convincing in demonstrating that persecution was often spasmodic, improvised, and accelerated by external crises, radical grassroots SA pressure, and the economic demands of the regime.<br/><br/>Interpretation 1 is supported by the clear, step-by-step radicalisation of anti-Jewish legislation. From the moment Hitler took power, the regime pursued a relentless campaign to isolate Jews socially, legally, and economically. In April 1933, the regime staged a nationwide boycott of Jewish businesses and passed the Law for the Restoration of the Professional Civil Service, firing Jewish teachers and judges. This legal apartheid was codified at the 1935 Nuremberg Party Rally: the *Reich Citizenship Law* stripped German Jews of their citizenship, voting rights, and passports, while the *Law for the Protection of German Blood and Honour* criminalized marriages and sexual relationships between Jews and Aryans (*Rassenschande*). In November 1938, the violence escalated to physical destruction during Kristallnacht, where over 250 synagogues were burned, 91 Jews murdered, and 30,000 men sent to concentration camps. This progression demonstrates an undeniable trajectory of increasing state brutality aimed at forcing Jews out of Germany.<br/><br/>Nevertheless, Interpretation 2 correctly identifies that this escalation was not a rigid, pre-planned blueprint. The process was uneven and influenced by pragmatic international considerations. For example, during the 1936 Berlin Olympic Games, anti-Semitic signs ("Jews not wanted here") were temporarily removed from public view, and street violence was strictly suppressed by Goebbels to present an image of moderation to the world. Furthermore, as functionalist historians point out, Kristallnacht was not long-planned; it was an opportunistic explosion triggered by the assassination of diplomat Ernst vom Rath in Paris by Herschel Grynszpan. Goebbels seized upon the assassination to regain Hitler’s favour after a personal scandal, orchestrating the pogrom overnight. The subsequent economic "Aryanisation" was driven partly by the state’s desperate need for foreign exchange and plunder to fund Hermann Göring’s bankrupt Four-Year Plan rearmament programme.<br/><br/>In conclusion, while Hitler possessed an unwavering ideological objective to eradicate Jewish presence in Germany, the escalation between 1933 and 1939 was not an uninterrupted master plan. Interpretation 2 is more accurate: the radicalisation was "cumulative", with the regime reacting to internal party pressures and diplomatic opportunities to turn legal segregation into violent physical pogroms.',
        examinerNote:
          'Band 4 (16/16 marks + 4 SPaG). Exemplary historiographical understanding contrasting intentionalist gradual planning with functionalist cumulative radicalisation (1933 Boycott, 1935 Nuremberg Laws, 1936 Olympic pause, Kristallnacht, Aryanisation).',
        pitfallCategory: 'Evaluative Essay Pitfalls',
        pitfall:
          'Do not discuss the "Final Solution" or death camps like Auschwitz in this essay. The Paper 3 specification covers 1918–1939 only (pre-war Germany).',
      },
      causalPathway: {
        title: 'Visual Causal Pathway: The Escalation of Persecution (1933–1938)',
        steps: [
          {
            stage: '1. Economic Isolation (1933)',
            desc: 'April 1933 boycott pickets shops; Jewish doctors, lawyers, and teachers barred from public jobs.',
          },
          {
            stage: '2. Nuremberg Laws (1935)',
            desc: 'Reich Citizenship Law strips Jews of civil rights; Blood Protection Law outlaws intermarriage.',
          },
          {
            stage: '3. Olympic Pause (1936)',
            desc: 'Anti-Jewish signs temporarily dismantled; terror masked to deceive international visitors.',
          },
          {
            stage: '4. Kristallnacht Pogrom (1938)',
            desc: 'State pogrom burns 250+ synagogues; 30,000 men sent to camps; 1B mark fine forces mass flight.',
          },
        ],
      },
      wordBank: [
        {
          term: 'Herrenvolk',
          def: 'The Aryan "master race" destined to dominate inferior peoples in Nazi ideology.',
        },
        {
          term: 'Untermenschen',
          def: 'Subhumans; Nazi racial label for Jews, Roma, Sinti, and Slavic peoples.',
        },
        {
          term: 'Anti-Semitism',
          def: 'Racial hatred and systemic persecution of Jewish people central to Hitler’s world view.',
        },
        {
          term: 'Nuremberg Laws',
          def: 'September 1935 statutes stripping Jews of citizenship and outlawing intermarriage.',
        },
        {
          term: 'Rassenschande',
          def: 'Racial defilement; criminal offense of sexual relations between Jews and Aryans.',
        },
        {
          term: 'Kristallnacht',
          def: 'Night of Broken Glass; 9–10 Nov 1938 nationwide state-orchestrated pogrom.',
        },
        {
          term: 'Aryanisation',
          def: 'Forced expropriation and transfer of Jewish-owned businesses to non-Jewish owners.',
        },
        {
          term: 'Aktion T4',
          def: 'Secret euthanasia programme that gassed over 70,000 disabled adults and children.',
        },
        {
          term: 'Herschel Grynszpan',
          def: 'Polish Jewish youth who assassinated German diplomat Ernst vom Rath in Paris.',
        },
        {
          term: 'Der Stürmer',
          def: 'Violently anti-Semitic, pornographic propaganda weekly edited by Julius Streicher.',
        },
        {
          term: 'Reichsbürgergesetz',
          def: 'Reich Citizenship Law stripping Jews of German citizenship and voting rights.',
        },
        {
          term: 'Eugenics',
          def: 'Pseudoscience of selective breeding to improve the genetic qualities of the human race.',
        },
      ],
    },
  },
];
