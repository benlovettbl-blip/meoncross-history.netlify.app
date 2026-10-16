/**
 * History Revision Hub — Weimar and Nazi Germany, 1918–1939
 * Migration: Key Topic 1 (The Weimar Republic, 1918–1929) to 5-Act Gold Standard & Digital Spine Parity
 *
 * Converts Key Topic 1 lessons 1.1 through 1.4 in units/weimar_nazi_germany/data.js:
 * 1. Structures narrative_blocks into 5 chronological Acts ([1.1] to [5.2]).
 * 2. Maps authentic primary visual sources (Sources A, B) to their respective Acts.
 * 3. Injects 5-stage `workbook_stages` matching WEIMAR_ENQUIRY_CONFIGS.KT1.
 * 4. Injects 5-stage `causal_domino_spine` with domino triggers, consequences, actors, and tags.
 * 5. Aligns `timeline_anchor` to 5 stages.
 * 6. Updates `teacher_notes` with 5 structured objectives & hinge questions.
 */

const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '..', 'units', 'weimar_nazi_germany', 'data.js');
let fileContent = fs.readFileSync(dataFilePath, 'utf8');

const startIndex = fileContent.indexOf('{');
const endIndex = fileContent.lastIndexOf('}');
const unitData = eval('(' + fileContent.substring(startIndex, endIndex + 1) + ')');

console.log('Loaded weimar_nazi_germany unitData with', unitData.lessons.length, 'lessons.');

const KT1_5_ACT_DATA = {
  lesson_1_1: {
    teacher_notes: {
      primer:
        'This enquiry examines the chaotic birth of the Weimar Republic from the ashes of military defeat in late 1918, exploring the impact of the First World War and naval blockade, the Kiel Mutiny and revolution, the abdication of Kaiser Wilhelm II, the creation of the provisional government under Friedrich Ebert, and the democratic architecture and fatal structural flaws of the 1919 Weimar Constitution.',
      objectives: [
        {
          objective:
            'Explain how military collapse and civilian starvation forced German leaders to seek an immediate armistice in 1918.',
          primer:
            'Direct students to paragraphs [1.1]–[1.2]. Highlight that Germany’s debt had tripled, 2 million soldiers were dead, and 750,000 civilians died of malnutrition and hypothermia under the British naval blockade, forcing General Ludendorff to demand a truce.',
          question:
            'How did the British naval blockade and civilian starvation contribute to the political collapse of Imperial Germany in autumn 1918?',
        },
        {
          objective:
            'Analyse why the Kiel Mutiny sparked a nationwide revolution that forced Kaiser Wilhelm II to abdicate.',
          primer:
            'Direct students to paragraphs [2.1]–[2.2]. Explain that sailors refused a suicidal final attack, forming workers’ and soldiers’ councils that swept across Germany until Prince Max of Baden announced the Kaiser’s abdication on 9 November 1918.',
          question:
            'Why did the naval mutiny at Kiel spread so rapidly into a popular revolution across German cities?',
        },
        {
          objective:
            'Assess how Friedrich Ebert established the provisional government and secured the army’s loyalty via the Ebert-Groener Pact.',
          primer:
            'Direct students to paragraphs [3.1]–[3.2] and Source A (Armed revolutionaries in Berlin). Emphasize that Ebert signed the Armistice on 11 November and allied secretly with General Groener to protect the government against communist revolution.',
          question:
            'Why did Friedrich Ebert make a secret alliance with the imperial military leadership to defend the new republic?',
        },
        {
          objective:
            'Examine why the National Assembly met in Weimar to draft the new democratic constitution in early 1919.',
          primer:
            'Direct students to paragraphs [4.1]–[4.2]. Focus on the January 1919 elections, the 76% majority for pro-republican parties, and the relocation to the peaceful town of Weimar away from violent Berlin street riots.',
          question:
            'Why was the National Assembly held in the provincial town of Weimar rather than the capital city of Berlin?',
        },
        {
          objective:
            'Evaluate the structural strengths and fatal vulnerabilities of the 1919 Weimar Constitution, focusing on Proportional Representation and Article 48.',
          primer:
            'Direct students to paragraphs [5.1]–[5.2]. Contrast progressive democratic rights and female suffrage with the instability of coalition governments under PR and the dictatorial loophole of Article 48 presidential decrees.',
          question:
            'Why did Proportional Representation and Article 48 emergency decrees prove to be fatal structural weaknesses in the Weimar Constitution?',
        },
      ],
      source_context: {
        'Source A':
          'Source A: Armed Workers and Soldiers in Berlin during the German Revolution (November 1918). Official German press photograph taken in Berlin in November 1918, showing armed revolutionary soldiers and industrial workers manning barricades following the Kaiser’s abdication. Hinge Question: How does Source A illustrate why Friedrich Ebert felt compelled to make a secret alliance with the imperial military leadership to maintain public order?',
      },
    },
    narrative_blocks: [
      {
        act: 1,
        title: 'Act 1: Military Collapse & The Kiel Mutiny (Oct–Nov 1918)',
        theme_heading: 'Act 1: Military Collapse & The Kiel Mutiny (Oct–Nov 1918)',
        text: '<span class="para-ref">[1.1]</span> By the autumn of 1918, Imperial Germany was physically, financially, and psychologically broken. Four years of total industrialized warfare had drained the nation’s resources. The imperial government’s national debt had tripled from 50 billion marks in 1914 to 150 billion marks in 1918, while over two million German soldiers were killed and four million wounded. On the home front, the relentless British naval blockade in the North Sea choked off imports of food and fertilizer, causing catastrophic civilian deprivation: over 750,000 German civilians died from starvation and hypothermia during the notorious "Turnip Winter." In September 1918, following the collapse of the German Spring Offensives on the Western Front, supreme military commanders Field Marshal Paul von Hindenburg and General Erich Ludendorff informed Kaiser Wilhelm II that the war was irrevocably lost, urging the Kaiser to transfer power to a civilian government to secure favorable armistice terms.<br><br><span class="para-ref">[1.2]</span> The breaking point occurred in late October 1918. Despite the government seeking peace, the German High Command ordered a final, suicidal naval sortie against the British Grand Fleet. At the naval bases of Wilhelmshaven and Kiel, sailors refused to follow orders, declaring they would not sacrifice their lives for a lost war. The mutiny spread like wildfire across Germany: sailors, soldiers, and industrial workers established revolutionary councils modeled on the Russian Soviets, seizing control of major cities including Hamburg, Munich, and Cologne. Military discipline collapsed entirely, and the authority of the Kaiser evaporated.',
      },
      {
        act: 2,
        title: 'Act 2: The Abdication of Kaiser Wilhelm II (9 Nov 1918)',
        theme_heading: 'Act 2: The Abdication of Kaiser Wilhelm II (9 Nov 1918)',
        text: '<span class="para-ref">[2.1]</span> By early November 1918, revolution had engulfed the capital city of Berlin. On 9 November, hundreds of thousands of industrial workers staged a massive general strike, marching through central Berlin and surrounding government ministries and army barracks. The police and local army regiments refused to fire upon the demonstrators, fraternizing with the crowds. Recognizing that civil war was imminent and that US President Woodrow Wilson refused to negotiate peace with an imperial autocrat, the Imperial Chancellor, Prince Max of Baden, took decisive action: without the Kaiser’s authorization, Prince Max publicly announced that Kaiser Wilhelm II had abdicated both the imperial German throne and the royal Prussian crown.<br><br><span class="para-ref">[2.2]</span> Stripped of military support by his own generals at army headquarters in Spa, Belgium, Kaiser Wilhelm II fled across the Dutch border at dawn on 10 November 1918, living in quiet exile at Huis Doorn until his death in 1941. Meanwhile, inside the Reichstag building in Berlin, politicians scrambled to control the revolution. Learning that communist leader Karl Liebknecht was about to declare a Soviet republic, Philipp Scheidemann, a moderate leader of the Social Democratic Party (SPD), rushed to an open window of the Reichstag and proclaimed Germany a democratic republic, pre-empting the communists and establishing civilian parliamentary governance.',
      },
      {
        act: 3,
        title: 'Act 3: The Armistice & Council of People’s Representatives (11 Nov 1918)',
        theme_heading: 'Act 3: The Armistice & Council of People’s Representatives (11 Nov 1918)',
        source: {
          id: 'source_a_spartacist_crowd',
          letter: 'A',
          title:
            'Source A: Armed Workers and Soldiers in Berlin during the German Revolution (November 1918)',
          src: '/images/spartacist_uprising.jpg',
          source: '/images/spartacist_uprising.jpg',
          image: '/images/spartacist_uprising.jpg',
          caption:
            'Armed revolutionary soldiers and industrial workers manning barricades in Berlin following the Kaiser’s abdication, showing the revolutionary chaos confronting Friedrich Ebert’s provisional government.',
          desc: 'Official press photograph of armed revolutionaries in Berlin during the November 1918 Revolution.',
          provenance:
            'Official German press photograph taken in Berlin, November 1918. German Federal Archives (Bundesarchiv Bild 183-B24522).',
          citation: 'Bundesarchiv Bild 183-B24522, Berlin Revolution, November 1918.',
          question:
            'How does Source A illustrate why Friedrich Ebert felt compelled to make a secret alliance with the imperial military leadership to maintain public order?',
          hinge_question:
            'How does Source A illustrate why Friedrich Ebert felt compelled to make a secret alliance with the imperial military leadership to maintain public order?',
          source_context:
            'Official German press photograph taken in Berlin in November 1918, showing armed revolutionary soldiers and industrial workers manning barricades following the Kaiser’s abdication. Hinge Question: How does Source A illustrate why Friedrich Ebert felt compelled to make a secret alliance with the imperial military leadership to maintain public order?',
          context:
            'Official German press photograph taken in Berlin in November 1918, showing armed revolutionary soldiers and industrial workers manning barricades following the Kaiser’s abdication.',
        },
        text: '<span class="para-ref">[3.1]</span> Prince Max of Baden handed the chancellorship to <strong>Friedrich Ebert</strong>, the pragmatic leader of the SPD. Ebert immediately formed the Council of People’s Representatives, a provisional six-man cabinet consisting of moderate Social Democrats and Independent Socialists to run the country until a national assembly could be elected. Ebert’s primary imperative was ending the war: on 11 November 1918, German delegates led by civilian politician Matthias Erzberger met Allied Supreme Commander Marshal Foch inside a railway carriage in the Compiègne Forest, signing the <strong>Armistice</strong> that silenced the guns of the First World War under humiliating surrender terms, including the surrender of all submarines, heavy artillery, and locomotives.<br><br><span class="para-ref">[3.2]</span> However, Ebert governed on a razor’s edge amidst armed street mobs (<span class="archival-meta-tag">Source A</span>). On the evening of 10 November 1918, Ebert concluded a fateful secret telephone agreement with General Wilhelm Groener, head of the Supreme Army Command: the <strong>Ebert-Groener Pact</strong>. Groener promised that the imperial military officer corps would support the new civilian government and maintain public order; in return, Ebert guaranteed that the government would defend the military against communist revolution and preserve traditional command structures. While the pact secured short-term survival, it left the anti-democratic imperial officer corps intact at the heart of the new republic.',
      },
      {
        act: 4,
        title: 'Act 4: The National Assembly at Weimar (Jan–Feb 1919)',
        theme_heading: 'Act 4: The National Assembly at Weimar (Jan–Feb 1919)',
        text: '<span class="para-ref">[4.1]</span> In January 1919, Germany held its first truly democratic national elections. Defying extremist disruptions, over 83% of the eligible electorate cast ballots. Moderate pro-republican parties won an overwhelming victory: the Social Democrats (SPD), Catholic Centre Party (Zentrum), and liberal German Democratic Party (DDP) secured 76% of the seats between them. Because Berlin was engulfed in violent street fighting following the communist Spartacist Uprising, the newly elected 421 delegates convened on 6 February 1919 in the peaceful, historic town of <strong>Weimar</strong> in Thuringia, famous as the home of Goethe and Schiller, deliberately choosing a setting associated with German enlightenment culture rather than Prussian militarism.<br><br><span class="para-ref">[4.2]</span> Meeting inside the German National Theatre in Weimar, the National Assembly formally elected Friedrich Ebert as the first President of the Republic. Under the legal guidance of liberal jurist Hugo Preuss, the assembly spent six months drafting a modern democratic constitution designed to replace Prussian autocracy with a transparent, representative parliamentary democracy.',
      },
      {
        act: 5,
        title: 'Act 5: The Weimar Constitution: Architecture & Flaws (Aug 1919)',
        theme_heading: 'Act 5: The Weimar Constitution: Architecture & Flaws (Aug 1919)',
        text: '<span class="para-ref">[5.1]</span> Passed on 11 August 1919, the <strong>Weimar Constitution</strong> established one of the most progressive democratic frameworks in the twentieth-century world. It introduced universal voting rights for all men and women over the age of twenty (decades ahead of France and Britain), established a bill of fundamental rights protecting free speech, press freedom, and religious liberty, and made the Chancellor and government accountable to an elected parliament (the <em>Reichstag</em>). The head of state was an elected President serving a seven-year term, commanding the armed forces and appointing the Chancellor.<br><br><span class="para-ref">[5.2]</span> However, historians emphasize that the constitution contained two fatal structural flaws. First, it enforced strict <strong>Proportional Representation (PR)</strong>, allocating one Reichstag seat for every 60,000 votes cast nationally. This mathematical purity allowed twenty-eight tiny splinter parties to win seats, making single-party majorities impossible and forcing endless, unstable coalition governments (twenty different cabinets collapsed between 1919 and 1933). Second, <strong>Article 48</strong> granted the President emergency powers to suspend fundamental constitutional rights and rule by decree without parliamentary consent during national emergencies. Intended as a protective shield against revolution, Article 48 became a dictatorial backdoor that later enabled authoritarian chancellors and Adolf Hitler to bypass democracy entirely.',
      },
    ],
    workbook_stages: [
      {
        step: 1,
        date: 'Oct–Nov 1918',
        para_ref: '[1.1–1.2]',
        heading:
          'How did naval mutiny and civilian starvation force military leaders to surrender?',
        bullets: [
          'Turnip Winter starvation in bread queues',
          'Sailors raising red flags on battleships',
          'General Ludendorff demanding immediate Allied truce',
        ],
        focus_clue:
          'How did naval mutiny and civilian starvation force military leaders to surrender?',
      },
      {
        step: 2,
        date: '9 Nov 1918',
        para_ref: '[2.1–2.2]',
        heading:
          'Why did moderate Social Democrats rush to proclaim a republic before Communists did?',
        bullets: [
          'Fleeing across border into Dutch exile',
          'Philipp Scheidemann shouting from Reichstag window',
          'General strike shutting down Berlin factories',
        ],
        focus_clue:
          'Why did moderate Social Democrats rush to proclaim a republic before Communists did?',
      },
      {
        step: 3,
        date: '11 Nov 1918',
        para_ref: '[3.1–3.2]',
        heading: 'Why did Ebert form a secret pact with the Imperial Army leadership?',
        bullets: [
          'Signing ceasefire inside Compiègne railway carriage',
          'Friedrich Ebert forming six-man provisional cabinet',
          'Ebert-Groener telephone pact promising army protection',
        ],
        focus_clue: 'Why did Ebert form a secret pact with the Imperial Army leadership?',
      },
      {
        step: 4,
        date: 'Jan–Feb 1919',
        para_ref: '[4.1–4.2]',
        heading: 'Why was the constitutional assembly held in Weimar rather than Berlin?',
        bullets: [
          'Moving politicians away from violent capital',
          'Electing Friedrich Ebert as first president',
          'Drafting new democratic constitution in state theatre',
        ],
        focus_clue: 'Why was the constitutional assembly held in Weimar rather than Berlin?',
      },
      {
        step: 5,
        date: 'Aug 1919',
        para_ref: '[5.1–5.2]',
        heading:
          'Why did proportional representation and Article 48 undermine constitutional stability?',
        bullets: [
          'Universal voting rights for men and women',
          'Splinter parties multiplying under proportional representation',
          'Article 48 emergency decrees bypassing parliament',
        ],
        focus_clue:
          'Why did proportional representation and Article 48 undermine constitutional stability?',
      },
    ],
    causal_domino_spine: {
      title: 'The Origins of the Republic, 1918–1919',
      subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
      stages: [
        {
          step: 1,
          date: 'Oct–Nov 1918',
          para_ref: '[1.1–1.2]',
          title: 'Military Collapse & The Kiel Mutiny',
          actor: 'High Seas Fleet Sailors & General Ludendorff',
          tag: '⚓ KIEL MUTINY & REVOLUTION',
          trigger:
            'The German naval command ordered a suicidal final naval sortie against the British fleet, sparking mutinies at Wilhelmshaven and Kiel that triggered popular revolution.',
          desc: 'The German naval command ordered a suicidal final naval sortie against the British fleet, sparking mutinies at Wilhelmshaven and Kiel that triggered popular revolution.',
          connective:
            'Mutinous sailors and striking workers formed revolutionary councils across Germany, shattering imperial authority and making peace negotiations unavoidable.',
          question:
            'How did naval mutiny and civilian starvation force military leaders to surrender?',
        },
        {
          step: 2,
          date: '9 Nov 1918',
          para_ref: '[2.1–2.2]',
          title: 'Abdication of Kaiser Wilhelm II',
          actor: 'Prince Max of Baden & Philipp Scheidemann',
          tag: '👑 MONARCHY COLLAPSE',
          trigger:
            'Facing general strikes in Berlin, Chancellor Prince Max announced the Kaiser’s abdication without his consent; Scheidemann proclaimed a republic from the Reichstag.',
          desc: 'Facing general strikes in Berlin, Chancellor Prince Max announced the Kaiser’s abdication without his consent; Scheidemann proclaimed a republic from the Reichstag.',
          connective:
            'Ended five centuries of Hohenzollern monarchical rule and created a democratic republic before radical communists could declare a Soviet regime.',
          question:
            'Why did moderate Social Democrats rush to proclaim a republic before Communists did?',
        },
        {
          step: 3,
          date: '11 Nov 1918',
          para_ref: '[3.1–3.2]',
          title: 'Armistice & Ebert-Groener Pact',
          actor: 'Friedrich Ebert & General Wilhelm Groener',
          tag: '🤝 EBERT-GROENER ALLIANCE',
          trigger:
            'Ebert’s provisional government signed the Armistice ending the war, and concluded a secret telephone pact with General Groener to preserve army discipline.',
          desc: 'Ebert’s provisional government signed the Armistice ending the war, and concluded a secret telephone pact with General Groener to preserve army discipline.',
          connective:
            'Secured army backing to suppress left-wing uprisings, but left the traditional imperial officer corps entrenched within the new democratic republic.',
          question: 'Why did Ebert form a secret pact with the Imperial Army leadership?',
        },
        {
          step: 4,
          date: 'Jan–Feb 1919',
          para_ref: '[4.1–4.2]',
          title: 'The National Assembly at Weimar',
          actor: 'National Assembly Delegates & Hugo Preuss',
          tag: '🏛️ WEIMAR NATIONAL ASSEMBLY',
          trigger:
            'Following democratic elections in January 1919 where pro-republican parties won 76% of votes, the assembly met in Weimar to escape Berlin’s street violence.',
          desc: 'Following democratic elections in January 1919 where pro-republican parties won 76% of votes, the assembly met in Weimar to escape Berlin’s street violence.',
          connective:
            'Allowed delegates to draft a progressive democratic constitution in peaceful isolation, establishing a parliamentary republic with universal suffrage.',
          question: 'Why was the constitutional assembly held in Weimar rather than Berlin?',
        },
        {
          step: 5,
          date: 'Aug 1919',
          para_ref: '[5.1–5.2]',
          title: 'Weimar Constitution Architecture & Flaws',
          actor: 'Reichstag Politicians & President Ebert',
          tag: '📜 CONSTITUTIONAL CRITICAL FLAWS',
          trigger:
            'The Weimar Constitution was ratified in August 1919, combining universal democratic voting rights with Proportional Representation and Article 48 emergency powers.',
          desc: 'The Weimar Constitution was ratified in August 1919, combining universal democratic voting rights with Proportional Representation and Article 48 emergency powers.',
          connective:
            'Fostered dozens of splinter parties and weak coalition cabinets, while Article 48 provided a legal mechanism that later enabled authoritarian rule.',
          question:
            'Why did proportional representation and Article 48 undermine constitutional stability?',
        },
      ],
    },
  },

  lesson_1_2: {
    teacher_notes: {
      primer:
        'This enquiry evaluates the existential political and economic challenges that threatened the Weimar Republic between 1919 and 1923, investigating the territorial, military, and financial terms of the Treaty of Versailles, the Dolchstoßlegende myth, the left-wing Spartacist Uprising, the right-wing Kapp Putsch, right-wing political assassinations, and the 1923 French occupation of the Ruhr that triggered runaway hyperinflation.',
      objectives: [
        {
          objective:
            'Explain how the Treaty of Versailles and the "stab-in-the-back" myth alienated German nationalists from the Republic.',
          primer:
            'Direct students to paragraphs [1.1]–[1.2] and Source A (Versailles political cartoon). Highlight territorial losses (Alsace-Lorraine, Polish Corridor), the 100,000 army cap, Article 231 War Guilt, and £6.6bn reparations branded as the "Diktat".',
          question:
            'How did the terms of the Treaty of Versailles foster deep nationalist hatred toward the "November Criminals" who founded the Weimar Republic?',
        },
        {
          objective:
            'Analyse the Spartacist Uprising of January 1919 and the consequences of Ebert’s reliance on the Freikorps.',
          primer:
            'Direct students to paragraphs [2.1]–[2.2]. Emphasize that Rosa Luxemburg and Karl Liebknecht’s communist revolt was violently crushed by right-wing Freikorps mercenaries, creating permanent socialist-communist division.',
          question:
            'Why did the brutal suppression of the Spartacist Uprising create a lasting divide on the German political left?',
        },
        {
          objective:
            'Evaluate the Kapp Putsch of March 1920 and explain why General von Seeckt’s army refused to defend the government.',
          primer:
            'Direct students to paragraphs [3.1]–[3.2] and Source B (Freikorps occupying Berlin). Contrast General von Seeckt’s refusal ("Reichswehr does not fire on Reichswehr") with the general strike of trade unionists that defeated the putsch.',
          question:
            'Why did the Kapp Putsch reveal the dangerous disloyalty of the regular German army toward the democratic Republic?',
        },
        {
          objective:
            'Examine the wave of right-wing political assassinations and the profound judicial bias in Weimar courts.',
          primer:
            'Direct students to paragraphs [4.1]–[4.2]. Focus on Organization Consul murdering Matthias Erzberger and Walter Rathenau, and how conservative judges granted lenient sentences to nationalist killers while punishing left-wing rebels harshly.',
          question:
            'How did judicial bias in Weimar courtrooms protect right-wing nationalist assassins while undermining public faith in democracy?',
        },
        {
          objective:
            'Assess how the French occupation of the Ruhr and the policy of passive resistance triggered catastrophic hyperinflation in 1923.',
          primer:
            'Direct students to paragraphs [5.1]–[5.2] and Source C (50 Million Mark Banknote). Explain that French troops seized industrial assets, passive resistance halted production, and the government printed unbacked money, wiping out middle-class savings.',
          question:
            'Why did the German government’s response to the French invasion of the Ruhr result in runaway hyperinflation?',
        },
      ],
      source_context: {
        'Source A':
          'Source A: Contemporary German Political Cartoon on the Treaty of Versailles (1919). A German satirical cartoon published in Simplicissimus in July 1919, depicting the Allied leaders forcing a helpless German civilian to swallow the bitter medicine of the Versailles Treaty. Hinge Question: Why did German nationalists depict the Treaty of Versailles as a "Diktat" (dictated peace), and how did this undermine the legitimacy of the Weimar Republic from its inception?',
        'Source B':
          'Source B: Marine Brigade Ehrhardt Freikorps Occupying Berlin during the Kapp Putsch (March 1920). Official press photograph taken in Berlin in March 1920, showing armed Freikorps soldiers of the Marine Brigade Ehrhardt bearing swastikas on their helmets, occupying the government quarter. Hinge Question: How does General von Seeckt’s famous refusal to order the army to fire on the Freikorps in Source B reveal the precarious dependency of the Weimar Republic on the old imperial officer corps?',
        'Source C':
          'Source C: Weimar 50 Million Mark Banknote Issued during Hyperinflation (1923). An authentic emergency 50 million mark banknote issued by the Reichsbank in Berlin during the peak of hyperinflation in autumn 1923. Hinge Question: Why did the collapse of the German mark shown in Source C completely wipe out middle-class life savings, and how did this permanently destroy their trust in the Weimar democracy?',
      },
    },
    narrative_blocks: [
      {
        act: 1,
        title: 'Act 1: The Treaty of Versailles & The "Stab in the Back" (June 1919)',
        theme_heading: 'Act 1: The Treaty of Versailles & The "Stab in the Back" (June 1919)',
        source: {
          id: 'source_a_versailles_cartoon',
          letter: 'A',
          title:
            'Source A: Contemporary German Political Cartoon on the Treaty of Versailles (1919)',
          src: '/images/gw_versailles_cartoon.jpg',
          source: '/images/gw_versailles_cartoon.jpg',
          image: '/images/gw_versailles_cartoon.jpg',
          caption:
            'A German satirical cartoon depicting the Allied leaders forcing a helpless German civilian to swallow the bitter medicine of the Versailles Treaty, captioned "You’ve got to swallow it, whether you like it or not!"',
          desc: 'German political cartoon from Simplicissimus commenting on the Versailles Treaty, July 1919.',
          provenance: 'Contemporary German satirical magazine Simplicissimus, Munich, July 1919.',
          citation: 'Simplicissimus Magazine, Munich, July 1919 edition.',
          question:
            'Why did German nationalists depict the Treaty of Versailles as a "Diktat" (dictated peace), and how did this undermine the legitimacy of the Weimar Republic from its inception?',
          hinge_question:
            'Why did German nationalists depict the Treaty of Versailles as a "Diktat" (dictated peace), and how did this undermine the legitimacy of the Weimar Republic from its inception?',
          source_context:
            'A German satirical cartoon published in Simplicissimus in July 1919, depicting the Allied leaders forcing a helpless German civilian to swallow the bitter medicine of the Versailles Treaty. Hinge Question: Why did German nationalists depict the Treaty of Versailles as a "Diktat" (dictated peace), and how did this undermine the legitimacy of the Weimar Republic from its inception?',
          context:
            'A German satirical cartoon published in Simplicissimus in July 1919, depicting the Allied leaders forcing a helpless German civilian to swallow the bitter medicine of the Versailles Treaty.',
        },
        text: '<span class="para-ref">[1.1]</span> In May 1919, the German delegation was summoned to the Palace of Versailles outside Paris. Expecting a negotiated peace based on US President Woodrow Wilson’s Fourteen Points, the Germans were barred from discussions and presented with a finished treaty: a non-negotiable <strong>Diktat</strong> (<span class="archival-meta-tag">Source A</span>). If the German government refused to sign within five days, Allied armies would invade and occupy the country. Reluctantly, the Weimar National Assembly voted to sign on 28 June 1919. The territorial losses were catastrophic: Germany lost 13% of its European land, 12% of its population, 16% of its coalfields, and 48% of its iron ore production. Alsace-Lorraine was returned to France; West Prussia and Posen were given to Poland, creating the "Polish Corridor" that severed East Prussia from the rest of Germany; and all overseas colonies were confiscated by the Allies.<br><br><span class="para-ref">[1.2]</span> The military and financial clauses inflicted profound national humiliation. The German Army was capped at 100,000 volunteers with conscription abolished; the General Staff was banned; armored tanks, military aircraft, and submarines were prohibited; and the Rhineland border zone was permanently demilitarised and occupied by Allied troops. Crucially, <strong>Article 231 (The War Guilt Clause)</strong> forced Germany to accept sole moral blame for causing the war, providing the legal basis for massive financial reparations set in 1921 at £6.6 billion (132 billion gold marks). Right-wing nationalists, monarchists, and embittered war veterans branded the republican politicians who signed the treaty the "November Criminals," propagating the poisonous <strong>Dolchstoßlegende</strong> (the "stab-in-the-back" myth) which falsely claimed that the German Army was never defeated on the battlefield, but was betrayed from behind by socialist, liberal, and Jewish politicians in Berlin.',
      },
      {
        act: 2,
        title: 'Act 2: The Threat from the Left: The Spartacist Uprising (Jan 1919)',
        theme_heading: 'Act 2: The Threat from the Left: The Spartacist Uprising (Jan 1919)',
        text: '<span class="para-ref">[2.1]</span> Before the Versailles Treaty was even presented, the fledgling Republic faced armed insurrection from the extreme left. The <strong>Spartacist League</strong>, a revolutionary communist movement founded by Karl Liebknecht and Rosa Luxemburg, rejected parliamentary democracy, seeking to replicate Lenin’s 1917 Bolshevik Revolution in Russia by establishing a workers’ dictatorship based on factory councils. On 6 January 1919, following the dismissal of Berlin’s popular radical police chief, the Spartacists launched an armed uprising. Over 100,000 armed workers seized key government buildings, newspaper printing presses, and telegraph offices across Berlin, declaring the Ebert government deposed.<br><br><span class="para-ref">[2.2]</span> Because the regular army had disintegrated, Defense Minister Gustav Noske turned to the <strong>Freikorps</strong>—volunteer paramilitary units of demobilized First World War soldiers, fiercely nationalist, anti-communist, and trained in trench assault tactics. Approximately 3,000 heavily armed Freikorps troops entered Berlin with machine guns, armored cars, and flamethrowers, recapturing government buildings and ruthlessly executing over 100 communist rebels. On 15 January 1919, Freikorps officers captured Rosa Luxemburg and Karl Liebknecht: both leaders were interrogated, brutally beaten with rifle butts, and executed, with Luxemburg’s body dumped into Berlin’s Landwehr Canal. While Ebert survived, his reliance on right-wing paramilitaries created an unbridgeable rift between the Social Democrats (SPD) and Communists (KPD), permanently fracturing the German left.',
      },
      {
        act: 3,
        title: 'Act 3: The Threat from the Right: The Kapp Putsch (March 1920)',
        theme_heading: 'Act 3: The Threat from the Right: The Kapp Putsch (March 1920)',
        source: {
          id: 'source_b_kapp_putsch',
          letter: 'B',
          title:
            'Source B: Marine Brigade Ehrhardt Freikorps Occupying Berlin during the Kapp Putsch (March 1920)',
          src: '/images/kapp_putsch_freikorps.jpg',
          source: '/images/kapp_putsch_freikorps.jpg',
          image: '/images/kapp_putsch_freikorps.jpg',
          caption:
            'Armed Freikorps soldiers of the Marine Brigade Ehrhardt bearing swastikas on their helmets, occupying the government quarter in Berlin during the short-lived right-wing Kapp Putsch.',
          desc: 'Official press photograph of Freikorps troops in Berlin during the Kapp Putsch, March 1920.',
          provenance:
            'Official press photograph taken in Berlin, March 1920. Imperial War Museum Collection (Shelfmark: Q 10798).',
          citation: 'IWM Collection Q 10798, Kapp Putsch Berlin, March 1920.',
          question:
            'How does General von Seeckt’s famous refusal to order the army to fire on the Freikorps in Source B reveal the precarious dependency of the Weimar Republic on the old imperial officer corps?',
          hinge_question:
            'How does General von Seeckt’s famous refusal to order the army to fire on the Freikorps in Source B reveal the precarious dependency of the Weimar Republic on the old imperial officer corps?',
          source_context:
            'Official press photograph taken in Berlin in March 1920, showing armed Freikorps soldiers of the Marine Brigade Ehrhardt bearing swastikas on their helmets, occupying the government quarter. Hinge Question: How does General von Seeckt’s famous refusal to order the army to fire on the Freikorps in Source B reveal the precarious dependency of the Weimar Republic on the old imperial officer corps?',
          context:
            'Official press photograph taken in Berlin in March 1920, showing armed Freikorps soldiers of the Marine Brigade Ehrhardt bearing swastikas on their helmets, occupying the government quarter.',
        },
        text: '<span class="para-ref">[3.1]</span> In early 1920, the mortal threat shifted to the extreme right. To comply with the 100,000-man army ceiling mandated by Versailles, the Ebert government ordered the disbandment of several prominent Freikorps brigades, including the 5,000-man <strong>Marine Brigade Ehrhardt</strong>. Outraged by what they saw as national betrayal, the brigade commanders allied with Wolfgang Kapp, a rabidly nationalist civil servant, and General Walther von Lüttwitz. On 13 March 1920, the Marine Brigade Ehrhardt marched into Berlin under the old imperial war flag (<span class="archival-meta-tag">Source B</span>), occupying the Reichstag and proclaiming Kapp the new Chancellor of Germany.<br><br><span class="para-ref">[3.2]</span> When President Ebert ordered the regular Reichswehr army to suppress the rebellion, Army Commander-in-Chief General Hans von Seeckt coldly refused, famously telling the Defense Minister: <em>"Reichswehr does not fire on Reichswehr."</em> The government was forced to flee the capital, taking refuge in Dresden and Stuttgart. Ebert and the trade unions saved democracy by calling a nationwide <strong>general strike</strong>: twelve million workers halted Berlin’s railways, gas, water, electricity, and postal services. Unable to govern a paralyzed capital, Kapp’s regime collapsed within 100 hours, and Kapp fled to Sweden. While the strike defeated the putsch, the crisis revealed that the regular army would not defend the Republic against right-wing treason.',
      },
      {
        act: 4,
        title: 'Act 4: Political Assassinations & Judicial Bias (1921–1922)',
        theme_heading: 'Act 4: Political Assassinations & Judicial Bias (1921–1922)',
        text: '<span class="para-ref">[4.1]</span> Defeated in overt street rebellions, right-wing extremists launched a campaign of covert terrorism. Between 1919 and 1922, ultra-nationalist assassination squads, most notably <strong>Organisation Consul</strong>, carried out 376 political murders targeting republican statesmen. In August 1921, Matthias Erzberger—the Centre Party politician who signed the 1918 Armistice and endorsed the Versailles reparations—was gunned down while walking in the Black Forest. In June 1922, the brilliant Foreign Minister <strong>Walter Rathenau</strong>, an intellectual, wealthy industrialist, and Jew who negotiated the Rapallo Treaty with Soviet Russia, was assassinated in his open motorcar by young nationalist ex-officers hurling grenades and firing submachine guns.<br><br><span class="para-ref">[4.2]</span> Rathenau’s assassination shocked the nation, prompting over a million Germans to demonstrate in Berlin in defense of the Republic. However, the Weimar legal system systematically sabotaged justice. Weimar judges were holdovers from the authoritarian Kaiserreich who harbored deep contempt for the democratic Republic. Judicial bias was glaring: of the twenty-two left-wing political murders committed between 1919 and 1922, seventeen resulted in harsh prison terms and ten death sentences; in contrast, out of 354 right-wing murders, not a single nationalist assassin was executed, and the average prison sentence was a negligible four months. This institutional subversion convinced right-wing extremists that they could attack the democratic state with virtual legal impunity.',
      },
      {
        act: 5,
        title: 'Act 5: Crisis of 1923: Ruhr Occupation & Hyperinflation (Jan–Nov 1923)',
        theme_heading: 'Act 5: Crisis of 1923: Ruhr Occupation & Hyperinflation (Jan–Nov 1923)',
        source: {
          id: 'source_c_hyperinflation',
          letter: 'C',
          title: 'Source C: Weimar 50 Million Mark Banknote Issued during Hyperinflation (1923)',
          src: '/images/weimar_hyperinflation_note.jpg',
          source: '/images/weimar_hyperinflation_note.jpg',
          image: '/images/weimar_hyperinflation_note.jpg',
          caption:
            'An emergency 50 million mark banknote issued in Germany during the peak of hyperinflation in autumn 1923, illustrating how currency values collapsed to worthless paper.',
          desc: 'Original emergency banknote issue during the peak of German hyperinflation, autumn 1923.',
          provenance:
            'Original Reichsbank emergency banknote issue, Berlin, autumn 1923. British Museum Department of Coins and Medals.',
          citation:
            'Reichsbank Emergency Currency Issue, Berlin, 1923 (British Museum Collection).',
          question:
            'Why did the collapse of the German mark shown in Source C completely wipe out middle-class life savings, and how did this permanently destroy their trust in the Weimar democracy?',
          hinge_question:
            'Why did the collapse of the German mark shown in Source C completely wipe out middle-class life savings, and how did this permanently destroy their trust in the Weimar democracy?',
          source_context:
            'An authentic emergency 50 million mark banknote issued by the Reichsbank in Berlin during the peak of hyperinflation in autumn 1923. Hinge Question: Why did the collapse of the German mark shown in Source C completely wipe out middle-class life savings, and how did this permanently destroy their trust in the Weimar democracy?',
          context:
            'An authentic emergency 50 million mark banknote issued by the Reichsbank in Berlin during the peak of hyperinflation in autumn 1923.',
        },
        text: '<span class="para-ref">[5.1]</span> In late 1922, the Weimar economy faltered, and Germany defaulted on scheduled deliveries of timber and coal to the Allies. In retaliation, French Prime Minister Raymond Poincaré ordered 60,000 French and Belgian troops to march into the <strong>Ruhr</strong>—Germany’s industrial heartland that produced 80% of its coal and steel—in January 1923 to confiscate raw materials directly. The Weimar government responded with a policy of <strong>passive resistance</strong>: miners, railway workers, and factory operators went on general strike, refusing to collaborate or move coal for the invaders. French occupation forces responded with martial law, expelling 150,000 German civilians from the region and shooting over 100 striking workers during protests.<br><br><span class="para-ref">[5.2]</span> Passive resistance provoked an economic apocalypse: the government lost all tax revenues and export earnings from its most valuable industrial valley, yet promised to pay the wages of millions of striking Ruhr workers. To cover these immense obligations, the government simply printed paper currency without gold reserves. The resulting flood of worthless paper triggered catastrophic <strong>Hyperinflation</strong>. In 1919, a US dollar was worth 9 marks; by November 1923, one dollar was worth 4.2 trillion marks, and a loaf of bread cost 201 billion marks (<span class="archival-meta-tag">Source C</span>). Workers collected daily wages in wheelbarrows, spending money immediately before prices doubled hourly. While debtors and industrialists with mortgages paid off debts with worthless paper, the thrifty middle class (the <em>Mittelstand</em>)—teachers, doctors, small shopkeepers, and pensioners—saw lifetime savings, pensions, and war bonds wiped out overnight, leaving an enduring scar of bitterness that permanently poisoned their loyalty to the democratic Republic.',
      },
    ],
    workbook_stages: [
      {
        step: 1,
        date: 'Jan 1919',
        para_ref: '[1.1–1.2]',
        heading:
          'Why did the government rely on right-wing paramilitaries to crush the Spartacists?',
        bullets: [
          'Seizing Berlin newspaper offices and telegraph stations',
          'Rosa Luxemburg organizing Communist street barricades',
          'Freikorps ex-soldiers executing rebel leaders in park',
        ],
        focus_clue:
          'Why did the government rely on right-wing paramilitaries to crush the Spartacists?',
      },
      {
        step: 2,
        date: '28 Jun 1919',
        para_ref: '[2.1–2.2]',
        heading: 'How did the Versailles Treaty foster deep nationalist hatred of the Republic?',
        bullets: [
          'War Guilt Article 231 fixing sole blame',
          'Demilitarising Rhineland border and capping troops',
          'Frontline soldiers claiming civilian backstab betrayal',
        ],
        focus_clue: 'How did the Versailles Treaty foster deep nationalist hatred of the Republic?',
      },
      {
        step: 3,
        date: 'Mar 1920',
        para_ref: '[3.1–3.2]',
        heading: 'Why did the army refuse to defend Ebert against the right-wing putsch?',
        bullets: [
          'Marine Brigade Ehrhardt marching into capital',
          'General von Seeckt refusing to fire on troops',
          'Trade unionists staging massive citywide general strike',
        ],
        focus_clue: 'Why did the army refuse to defend Ebert against the right-wing putsch?',
      },
      {
        step: 4,
        date: '1921–1922',
        para_ref: '[4.1–4.2]',
        heading: 'How did judicial bias protect right-wing nationalist assassins?',
        bullets: [
          'Consul Organisation gunning down armistice signatory',
          'Assassinating Jewish foreign minister in open motorcar',
          'Courts handing light sentences to nationalist killers',
        ],
        focus_clue: 'How did judicial bias protect right-wing nationalist assassins?',
      },
      {
        step: 5,
        date: 'Jan–Nov 1923',
        para_ref: '[5.1–5.2]',
        heading: 'How did passive resistance in the Ruhr trigger runaway hyperinflation?',
        bullets: [
          'Sixty thousand French troops occupying industrial valleys',
          'Calling passive resistance and halting coal trains',
          'Printing trillion-mark banknotes wiping out family savings',
        ],
        focus_clue: 'How did passive resistance in the Ruhr trigger runaway hyperinflation?',
      },
    ],
    causal_domino_spine: {
      title: 'The Early Challenges to the Weimar Republic, 1919–1923',
      subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
      stages: [
        {
          step: 1,
          date: 'Jan 1919',
          para_ref: '[1.1–1.2]',
          title: 'The Spartacist Uprising',
          actor: 'Spartacist League & Rosa Luxemburg',
          tag: '🚩 SPARTACIST INSURRECTION',
          trigger:
            'The revolutionary communist Spartacist League launched an armed general uprising in Berlin to overthrow Ebert and establish a Soviet workers’ republic.',
          desc: 'The revolutionary communist Spartacist League launched an armed general uprising in Berlin to overthrow Ebert and establish a Soviet workers’ republic.',
          connective:
            'Ebert deployed right-wing Freikorps paramilitaries who crushed the rebellion brutally, creating an enduring rift that permanently fractured the German political left.',
          question:
            'Why did the government rely on right-wing paramilitaries to crush the Spartacists?',
        },
        {
          step: 2,
          date: '28 Jun 1919',
          para_ref: '[2.1–2.2]',
          title: 'The Treaty of Versailles (The Diktat)',
          actor: 'Allied Powers & Weimar Signatories',
          tag: '⚖️ VERSAILLES DIKTAT',
          trigger:
            'Allied leaders forced Germany under threat of renewed invasion to sign the Versailles Treaty, imposing Article 231 War Guilt, £6.6bn reparations, and severe land loss.',
          desc: 'Allied leaders forced Germany under threat of renewed invasion to sign the Versailles Treaty, imposing Article 231 War Guilt, £6.6bn reparations, and severe land loss.',
          connective:
            'Nationalists branded Weimar politicians the "November Criminals" and propagated the Dolchstoßlegende, permanently undermining public faith in democracy.',
          question: 'How did the Versailles Treaty foster deep nationalist hatred of the Republic?',
        },
        {
          step: 3,
          date: 'Mar 1920',
          para_ref: '[3.1–3.2]',
          title: 'The Kapp Putsch',
          actor: 'Wolfgang Kapp & General von Seeckt',
          tag: '⚔️ RIGHT-WING REBELLION',
          trigger:
            'When the government ordered the disbandment of Freikorps units to meet Versailles troop limits, 5,000 armed troops marched on Berlin to seize power.',
          desc: 'When the government ordered the disbandment of Freikorps units to meet Versailles troop limits, 5,000 armed troops marched on Berlin to seize power.',
          connective:
            'The regular army refused to fire on the rebels, forcing Ebert to flee until a nationwide general strike by trade unionists paralyzed the capital and defeated the putsch.',
          question: 'Why did the army refuse to defend Ebert against the right-wing putsch?',
        },
        {
          step: 4,
          date: '1921–1922',
          para_ref: '[4.1–4.2]',
          title: 'Political Assassinations & Judicial Bias',
          actor: 'Organisation Consul & Conservative Judges',
          tag: '🎯 NATIONALIST TERRORISM',
          trigger:
            'Right-wing death squads assassinated prominent republican figures, including Matthias Erzberger (1921) and Jewish Foreign Minister Walter Rathenau (1922).',
          desc: 'Right-wing death squads assassinated prominent republican figures, including Matthias Erzberger (1921) and Jewish Foreign Minister Walter Rathenau (1922).',
          connective:
            'Weimar judges exhibited blatant political bias, granting light sentences to right-wing murderers while severely punishing left-wing radicals.',
          question: 'How did judicial bias protect right-wing nationalist assassins?',
        },
        {
          step: 5,
          date: 'Jan–Nov 1923',
          para_ref: '[5.1–5.2]',
          title: 'Occupation of the Ruhr & Hyperinflation',
          actor: 'French Occupation Forces & Reichsbank',
          tag: '💸 RUHR CRISIS & HYPERINFLATION',
          trigger:
            'French and Belgian troops invaded the Ruhr following a reparations default; the government declared passive resistance and printed unbacked currency to pay strikers.',
          desc: 'French and Belgian troops invaded the Ruhr following a reparations default; the government declared passive resistance and printed unbacked currency to pay strikers.',
          connective:
            'Triggered catastrophic hyperinflation where the mark collapsed to 4.2 trillion per dollar, wiping out middle-class savings and creating enduring anti-republican bitterness.',
          question: 'How did passive resistance in the Ruhr trigger runaway hyperinflation?',
        },
      ],
    },
  },

  lesson_1_3: {
    teacher_notes: {
      primer:
        'This enquiry evaluates the apparent stabilization of the Weimar Republic during the "Golden Twenties" under Gustav Stresemann, examining the Rentenmark currency reform, the Dawes Plan of 1924, American Wall Street loans, the Locarno Treaties of 1925, Germany’s admission to the League of Nations in 1926, the Kellogg-Briand Pact, the Young Plan of 1929, and Stresemann’s prophetic warning that Germany was "dancing on a volcano".',
      objectives: [
        {
          objective:
            'Explain how Gustav Stresemann halted passive resistance and stabilized the currency with the Rentenmark in late 1923.',
          primer:
            'Direct students to paragraphs [1.1]–[1.2]. Emphasize that Stresemann ended the ruinous Ruhr strike and introduced the Rentenmark, strictly backed by agricultural and industrial land mortgages to stop hyperinflation.',
          question:
            'How did the introduction of the Rentenmark restore public confidence in the German monetary system in late 1923?',
        },
        {
          objective:
            'Analyse the mechanisms of the Dawes Plan (1924) and the impact of American loans on German industrial recovery.',
          primer:
            'Direct students to paragraphs [2.1]–[2.2]. Highlight that the Dawes Plan rescheduled reparations, secured French withdrawal from the Ruhr, and injected 800 million gold marks in US loans to modernize industry.',
          question:
            'Why did American loans under the Dawes Plan create a rapid economic boom while leaving Germany financially vulnerable?',
        },
        {
          objective:
            'Evaluate the diplomatic significance of the 1925 Locarno Treaties in breaking Germany’s post-war international isolation.',
          primer:
            'Direct students to paragraphs [3.1]–[3.2]. Detail Stresemann’s policy of fulfillment, the voluntary guarantee of western frontiers with France and Belgium, and the Nobel Peace Prize awarded to Stresemann and Briand.',
          question:
            'How did the Locarno Treaties transform Germany’s diplomatic relationship with Britain and France?',
        },
        {
          objective:
            'Assess the political impact of Germany’s entry into the League of Nations with a permanent Council seat in 1926.',
          primer:
            'Direct students to paragraphs [4.1]–[4.2]. Focus on Germany’s rehabilitation as a recognized great power, Stresemann’s speech in Geneva, and the restoration of national pride.',
          question:
            'Why was admission to the League of Nations with a permanent Council seat a major foreign policy triumph for Gustav Stresemann?',
        },
        {
          objective:
            'Assess the Young Plan of 1929 and explain why Stresemann warned that Germany was "dancing on a volcano".',
          primer:
            'Direct students to paragraphs [5.1]–[5.2]. Contrast the reduction of reparations to £2bn with right-wing opposition led by Hugenberg and Hitler, and explain how dependency on short-term US loans proved fatal in October 1929.',
          question:
            'Why did Gustav Stresemann describe Germany’s economic recovery as "dancing on a volcano" shortly before the Wall Street Crash?',
        },
      ],
      source_context: {
        'Source A':
          'Source A: Berliners Transporting Devalued Paper Currency to the Bank (Autumn 1923). Official German press photograph showing bank customers transporting baskets and laundry hampers loaded with near-worthless paper banknotes during the hyperinflation crisis before Stresemann introduced the Rentenmark. Hinge Question: How does Source A illustrate why Gustav Stresemann’s immediate introduction of the Rentenmark was essential to restore basic economic stability?',
      },
    },
    narrative_blocks: [
      {
        act: 1,
        title: 'Act 1: Stresemann & The Rentenmark Currency (Nov 1923)',
        theme_heading: 'Act 1: Stresemann & The Rentenmark Currency (Nov 1923)',
        source: {
          id: 'source_a_hyperinflation_currency',
          letter: 'A',
          title:
            'Source A: Berliners Transporting Devalued Paper Currency to the Bank (Autumn 1923)',
          src: '/images/weimar_hyperinflation_note.jpg',
          source: '/images/weimar_hyperinflation_note.jpg',
          image: '/images/weimar_hyperinflation_note.jpg',
          caption:
            'Berliners using laundry baskets and hampers to transport bundles of rapidly devaluing paper banknotes to the Reichsbank in autumn 1923, illustrating the absurdity of hyperinflation.',
          desc: 'Historical photograph of bank customers with laundry baskets of devalued marks, Berlin 1923.',
          provenance:
            'German Federal Archives (Bundesarchiv Bild 183-R1215-502), Berlin, October 1923.',
          citation: 'Bundesarchiv Bild 183-R1215-502, Berlin Currency Crisis, 1923.',
          question:
            'How does Source A illustrate why Gustav Stresemann’s immediate introduction of the Rentenmark was essential to restore basic economic stability?',
          hinge_question:
            'How does Source A illustrate why Gustav Stresemann’s immediate introduction of the Rentenmark was essential to restore basic economic stability?',
          source_context:
            'Official German press photograph showing bank customers transporting baskets and laundry hampers loaded with near-worthless paper banknotes during the hyperinflation crisis before Stresemann introduced the Rentenmark. Hinge Question: How does Source A illustrate why Gustav Stresemann’s immediate introduction of the Rentenmark was essential to restore basic economic stability?',
          context:
            'Official German press photograph showing bank customers transporting baskets and laundry hampers loaded with near-worthless paper banknotes during the hyperinflation crisis before Stresemann introduced the Rentenmark.',
        },
        text: '<span class="para-ref">[1.1]</span> In August 1923, at the absolute nadir of the hyperinflation crisis, President Ebert appointed <strong>Gustav Stresemann</strong> as Chancellor. A brilliant, pragmatic politician of the German People’s Party (DVP), Stresemann recognized that Germany was disintegrating: communists were plotting uprisings in Saxony, right-wing paramilitaries were organizing in Bavaria, and the mark was worthless (<span class="archival-meta-tag">Source A</span>). Although Stresemann served as Chancellor for just 102 days before his coalition collapsed, he remained as Foreign Minister under successive chancellors until his death in October 1929, providing six years of continuous diplomatic and economic leadership. His first decisive act was calling off the ruinous passive resistance in the Ruhr in September 1923, ending government payouts to striking workers and convincing the French that negotiations were possible.<br><br><span class="para-ref">[1.2]</span> Stresemann then tackled the currency catastrophe. In November 1923, under financial commissioner Hjalmar Schacht, the government destroyed the old worthless paper marks and introduced a strictly controlled, temporary emergency currency: the <strong>Rentenmark</strong>. Because Germany possessed no gold reserves, the Rentenmark was backed by a real mortgage on Germany’s agricultural land and industrial factories. The supply of Rentenmarks was strictly limited to 3.2 billion marks, and one Rentenmark was exchanged for exactly one trillion old paper marks. The German public trusted land backing, prices stabilized almost overnight, and in 1924 the permanent <strong>Reichsmark</strong> was introduced, fully backed by gold reserves and ending the nightmare of hyperinflation.',
      },
      {
        act: 2,
        title: 'Act 2: The Dawes Plan (1924) & American Wall Street Loans',
        theme_heading: 'Act 2: The Dawes Plan (1924) & American Wall Street Loans',
        text: '<span class="para-ref">[2.1]</span> With currency stabilized, Stresemann resolved the crippling reparations deadlock with the Allies. In April 1924, an international committee chaired by American banker Charles G. Dawes formulated the <strong>Dawes Plan</strong>. The plan reorganized reparations without reducing the overall sum: annual payments were reduced to an affordable level, starting at 1 billion gold marks for the first year and rising over five years to 2.5 billion marks based on Germany’s economic performance. In return, the French government agreed to evacuate all occupation troops from the Ruhr basin, which was completed by August 1925, restoring full sovereign German control over its industrial heartland.<br><br><span class="para-ref">[2.2]</span> Crucially, the Dawes Plan arranged a massive initial loan of 800 million gold marks from American Wall Street financiers, followed by an influx of private American investment totaling over 25 billion gold marks ($3 billion) over the next five years. This American capital stimulated an extraordinary industrial modernizing boom: German corporations built modern chemical plants, automated coal mines, and electrified railway networks. By 1928, German industrial production exceeded pre-war 1913 levels, exports surged by 40%, and unemployment fell, creating the buoyant commercial prosperity of the "Golden Twenties."',
      },
      {
        act: 3,
        title: 'Act 3: The Locarno Treaties & Demilitarised Rhineland (Oct 1925)',
        theme_heading: 'Act 3: The Locarno Treaties & Demilitarised Rhineland (Oct 1925)',
        text: '<span class="para-ref">[3.1]</span> Stresemann pursued a deliberate foreign policy strategy termed <strong>Erfüllungspolitik</strong> (the "policy of fulfillment"). Rather than defying the Versailles Treaty militarily—which had led to the ruinous Ruhr invasion—Stresemann cooperated with former wartime enemies to build international trust, using Germany’s growing economic strength to renegotiate treaty restrictions peacefully. In October 1925, Stresemann met British Foreign Secretary Austen Chamberlain and French Foreign Minister Aristide Briand in the Swiss resort of Locarno to negotiate a comprehensive peace settlement.<br><br><span class="para-ref">[3.2]</span> The resulting <strong>Locarno Treaties</strong> were a landmark breakthrough. For the first time since 1918, Germany negotiated as an equal sovereign partner rather than receiving a dictated Diktat. Germany voluntarily guaranteed its western borders with France and Belgium, renouncing any future claim to Alsace-Lorraine, and accepted that the Rhineland would remain permanently demilitarised. In return, France agreed never again to invade Germany, and Britain and Italy guaranteed the borders against aggression by either side. The "spirit of Locarno" dismantled Europe’s post-war diplomatic isolation, earning Stresemann and Briand the joint Nobel Peace Prize in 1926.',
      },
      {
        act: 4,
        title: 'Act 4: Germany’s Entry into the League of Nations (Sep 1926)',
        theme_heading: 'Act 4: Germany’s Entry into the League of Nations (Sep 1926)',
        text: '<span class="para-ref">[4.1]</span> In 1919, the Treaty of Versailles had deliberately excluded Germany from the newly created League of Nations, treating the country as an international pariah. However, following the success of the Locarno Treaties, Stresemann applied for Germany’s admission. In September 1926, the League’s General Assembly in Geneva voted unanimously to admit Germany, marking the country’s complete diplomatic rehabilitation.<br><br><span class="para-ref">[4.2]</span> Furthermore, Stresemann secured Germany a prestigious <strong>permanent seat on the League of Nations Council</strong>, giving Germany the same supreme executive status as victorious powers Britain and France. Stresemann delivered a triumphant address in Geneva, declaring that the two great nations of France and Germany must replace centuries of bloodshed with peaceful cooperation. Stresemann skillfully utilized Germany’s council veto to protect German minorities living in Poland and Czechoslovakia, raising Germany’s global stature while advancing national interests through multilateral diplomacy.',
      },
      {
        act: 5,
        title: 'Act 5: The Kellogg-Briand Pact, Young Plan & "Dancing on a Volcano" (1928–1929)',
        theme_heading:
          'Act 5: The Kellogg-Briand Pact, Young Plan & "Dancing on a Volcano" (1928–1929)',
        text: '<span class="para-ref">[5.1]</span> Stresemann’s diplomatic momentum peaked in 1928–1929. In August 1928, Germany was among sixty-two nations that signed the <strong>Kellogg-Briand Pact</strong>, an international treaty renouncing war as an instrument of national policy. In 1929, Stresemann finalized the <strong>Young Plan</strong>, negotiated by American industrialist Owen D. Young. The Young Plan slashed Germany’s total reparations debt from £6.6 billion down to £2 billion (a 20% reduction in annual burdens), extended payments over fifty-nine years until 1988, and secured the complete withdrawal of all Allied occupation troops from the German Rhineland five years ahead of schedule, by June 1930.<br><br><span class="para-ref">[5.2]</span> However, right-wing extremists led by nationalist press magnate Alfred Hugenberg and Nazi leader Adolf Hitler launched a furious campaign against the Young Plan, forming a joint opposition front that introduced a national plebiscite ("The Freedom Law") to brand any minister who paid reparations a traitor. More ominously, Stresemann himself recognized the existential flaw in Germany’s recovery: prosperity was entirely dependent upon short-term American loans that could be recalled at any moment. In November 1928, Stresemann prophetically warned: <em>"The economic position is only flourishing on the surface. Germany is dancing on a volcano. If the short-term American loans are called in, a large section of our economy will collapse."</em> On 3 October 1929, Stresemann died of a stroke at age fifty-one; just twenty-six days later, on 29 October, the Wall Street Crash struck New York, collapsing American loans and plunging Weimar Germany into fatal economic ruin.',
      },
    ],
    workbook_stages: [
      {
        step: 1,
        date: 'Nov 1923',
        para_ref: '[1.1–1.2]',
        heading: 'How did the Rentenmark restore basic confidence in the monetary system?',
        bullets: [
          'Burning trillions of worthless old paper marks',
          'Mortgaging national agricultural land and factory assets',
          'Fixing stable exchange rate at 4.2 trillion to dollar',
        ],
        focus_clue: 'How did the Rentenmark restore basic confidence in the monetary system?',
      },
      {
        step: 2,
        date: 'Apr–Aug 1924',
        para_ref: '[2.1–2.2]',
        heading: 'Why did American loans provide temporary relief but leave Germany vulnerable?',
        bullets: [
          'Charles Dawes rescheduling annual indemnity instalments',
          'Wall Street bankers injecting eight hundred million gold marks',
          'Modernising chemical plants and municipal public works',
        ],
        focus_clue: 'Why did American loans provide temporary relief but leave Germany vulnerable?',
      },
      {
        step: 3,
        date: 'Oct 1925',
        para_ref: '[3.1–3.2]',
        heading: 'How did the Locarno Treaties break Germany’s post-war diplomatic isolation?',
        bullets: [
          'Voluntarily accepting western frontiers with France and Belgium',
          'Keeping Rhineland border zone permanently demilitarised',
          'Winning joint Nobel Peace Prize in Oslo',
        ],
        focus_clue: 'How did the Locarno Treaties break Germany’s post-war diplomatic isolation?',
      },
      {
        step: 4,
        date: 'Sep 1926',
        para_ref: '[4.1–4.2]',
        heading: 'Why was admission to the League of Nations a major victory for Stresemann?',
        bullets: [
          'Awarding permanent seat on Geneva governing council',
          'Restoring great power diplomatic status in Europe',
          'Stresemann delivering triumphant German address to assembly',
        ],
        focus_clue: 'Why was admission to the League of Nations a major victory for Stresemann?',
      },
      {
        step: 5,
        date: '1928–1929',
        para_ref: '[5.1–5.2]',
        heading: 'Why did right-wing nationalists fiercely oppose the Young Plan?',
        bullets: [
          'Sixty-two countries outlawing war as national policy',
          'Owen Young reducing total indemnity to two billion pounds',
          'Alfred Hugenberg launching nationalist plebiscite campaign against debt',
        ],
        focus_clue: 'Why did right-wing nationalists fiercely oppose the Young Plan?',
      },
    ],
    causal_domino_spine: {
      title: 'The Recovery of the Republic, 1924–1929',
      subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
      stages: [
        {
          step: 1,
          date: 'Nov 1923',
          para_ref: '[1.1–1.2]',
          title: 'Stresemann & The Rentenmark Currency',
          actor: 'Gustav Stresemann & Hjalmar Schacht',
          tag: '💱 CURRENCY STABILISATION',
          trigger:
            'Chancellor Stresemann halted passive resistance in the Ruhr and introduced the Rentenmark, backed by national industrial and agricultural mortgages.',
          desc: 'Chancellor Stresemann halted passive resistance in the Ruhr and introduced the Rentenmark, backed by national industrial and agricultural mortgages.',
          connective:
            'Ended hyperinflation and restored price stability, laying the financial foundation for international loan negotiations.',
          question: 'How did the Rentenmark restore basic confidence in the monetary system?',
        },
        {
          step: 2,
          date: 'Apr–Aug 1924',
          para_ref: '[2.1–2.2]',
          title: 'The Dawes Plan & American Loans',
          actor: 'Charles G. Dawes & Wall Street Bankers',
          tag: '🏦 DAWES PLAN & US LOANS',
          trigger:
            'The Dawes Plan rescheduled annual reparations to affordable levels, prompted French evacuation of the Ruhr, and injected 800m gold marks in American loans.',
          desc: 'The Dawes Plan rescheduled annual reparations to affordable levels, prompted French evacuation of the Ruhr, and injected 800m gold marks in American loans.',
          connective:
            'Stimulated a major industrial modernizing boom, but created extreme financial dependency on short-term American capital.',
          question: 'Why did American loans provide temporary relief but leave Germany vulnerable?',
        },
        {
          step: 3,
          date: 'Oct 1925',
          para_ref: '[3.1–3.2]',
          title: 'The Locarno Treaties',
          actor: 'Gustav Stresemann & Aristide Briand',
          tag: '🕊️ LOCARNO RECONCILIATION',
          trigger:
            'Germany voluntarily guaranteed its western frontiers with France and Belgium, keeping the Rhineland demilitarised in exchange for French non-aggression.',
          desc: 'Germany voluntarily guaranteed its western frontiers with France and Belgium, keeping the Rhineland demilitarised in exchange for French non-aggression.',
          connective:
            'Dismantled Germany’s post-war diplomatic isolation and paved the way for entry into the League of Nations as an equal power.',
          question: 'How did the Locarno Treaties break Germany’s post-war diplomatic isolation?',
        },
        {
          step: 4,
          date: 'Sep 1926',
          para_ref: '[4.1–4.2]',
          title: 'Entry into the League of Nations',
          actor: 'League of Nations Assembly & Stresemann',
          tag: '🌐 LEAGUE COUNCIL SEAT',
          trigger:
            'Germany was unanimously admitted to the League of Nations and awarded a prestigious permanent seat on the executive Council.',
          desc: 'Germany was unanimously admitted to the League of Nations and awarded a prestigious permanent seat on the executive Council.',
          connective:
            'Restored Germany’s great power diplomatic status, enabling Stresemann to champion German minority interests across Europe peacefully.',
          question: 'Why was admission to the League of Nations a major victory for Stresemann?',
        },
        {
          step: 5,
          date: '1928–1929',
          para_ref: '[5.1–5.2]',
          title: 'The Kellogg-Briand Pact & The Young Plan',
          actor: 'Owen D. Young & Alfred Hugenberg',
          tag: '🌋 DANCING ON A VOLCANO',
          trigger:
            'The Young Plan slashed reparations to £2bn and secured early Rhineland evacuation, but right-wing nationalists launched a furious anti-republican campaign.',
          desc: 'The Young Plan slashed reparations to £2bn and secured early Rhineland evacuation, but right-wing nationalists launched a furious anti-republican campaign.',
          connective:
            'Stresemann warned Germany was "dancing on a volcano"; his death in October 1929 and the Wall Street Crash collapsed US loans and destroyed the economy.',
          question: 'Why did right-wing nationalists fiercely oppose the Young Plan?',
        },
      ],
    },
  },

  lesson_1_4: {
    teacher_notes: {
      primer:
        'This enquiry examines the social and cultural transformations of the Weimar Republic between 1924 and 1929, exploring rising wages and the 1927 Unemployment Insurance Act, the changing position of women and the phenomenon of the "New Woman", Walter Gropius and the Bauhaus architectural movement, Neue Sachlichkeit art and Weimar cinema, and the bitter cultural polarization between modern urbanites and conservative traditionalists.',
      objectives: [
        {
          objective:
            'Explain how rising real wages, municipal housing programs, and the 1927 Unemployment Insurance Act improved working-class living standards.',
          primer:
            'Direct students to paragraphs [1.1]–[1.2]. Detail the 9–12% rise in real wages, construction of 2 million new apartments, and the national insurance scheme protecting 16.4 million workers against joblessness.',
          question:
            'How did social welfare legislation and municipal housing programs raise living standards for German industrial workers between 1924 and 1929?',
        },
        {
          objective:
            'Analyse the progress and persistent limitations experienced by women in politics, the workforce, and the emergence of the "New Woman".',
          primer:
            'Direct students to paragraphs [2.1]–[2.2]. Contrast Article 109 granting female suffrage (10% of Reichstag deputies) and white-collar employment with hostility toward "double-earners" and falling birth rates.',
          question:
            'To what extent did the Weimar "Golden Age" genuinely transform the social and economic position of women in Germany?',
        },
        {
          objective:
            'Evaluate how Walter Gropius and the Bauhaus movement revolutionized modernist architecture and functional design.',
          primer:
            'Direct students to paragraphs [3.1]–[3.2] and Source A (Bauhaus Dessau building). Highlight the principle of functionalism ("art and technology: a new unity"), clean geometric glass-and-steel facades, and modern social housing.',
          question:
            'How did the Bauhaus movement reflect both revolutionary artistic modernism and the democratic values of the Weimar Republic?',
        },
        {
          objective:
            'Examine how Neue Sachlichkeit painting and Weimar cinema reflected the gritty realities and moral ambiguities of the Republic.',
          primer:
            'Direct students to paragraphs [4.1]–[4.2] and Source B (Berlin Cabaret culture). Discuss Otto Dix and George Grosz satirizing corrupt elites and wounded veterans, and Fritz Lang’s masterpiece Metropolis.',
          question:
            'Why did Neue Sachlichkeit painters and avant-garde filmmakers reject romantic traditionalism to depict raw urban reality?',
        },
        {
          objective:
            'Assess why the avant-garde culture of Berlin provoked fierce moral and political backlash from conservative, rural, and nationalist Germans.',
          primer:
            'Direct students to paragraphs [5.1]–[5.2]. Explain that conservative churchgoers and right-wing nationalists condemned Berlin cabaret culture as "cultural Bolshevism" and moral degeneracy, deepening societal fractures.',
          question:
            'Why did the cultural explosion of the 1920s deepen political polarization and alienate conservative Germans from the Weimar Republic?',
        },
      ],
      source_context: {
        'Source A':
          'Source A: The Bauhaus College Building in Dessau Designed by Walter Gropius (1925–1926). Architectural photograph of the Bauhaus Dessau complex, showing the revolutionary steel-frame structure, curtain glass walls, and geometric functionalism. Hinge Question: How does the functional, glass-and-steel design of the Bauhaus building in Source A reflect the democratic, forward-looking ideals of the Weimar Republic?',
        'Source B':
          'Source B: Berlin Cabaret and Street Life in the Golden Twenties (c.1926). Contemporary promotional print illustrating Berlin’s vibrant nightlife, jazz cafes, and avant-garde street culture during the height of the Weimar Golden Twenties. Hinge Question: Why did the avant-garde cabaret culture of Berlin shown in Source B provoke such intense moral outrage from conservative and rural Germans?',
      },
    },
    narrative_blocks: [
      {
        act: 1,
        title: 'Act 1: Standard of Living: Wages, Housing & Unemployment Insurance (1924–1928)',
        theme_heading:
          'Act 1: Standard of Living: Wages, Housing & Unemployment Insurance (1924–1928)',
        text: '<span class="para-ref">[1.1]</span> Between 1924 and 1929, the stabilization of the currency and the influx of American capital stimulated tangible improvements in the daily standard of living for millions of German industrial workers. Real wages—the actual purchasing power of wages after accounting for inflation—rose by 9% in 1927 and by an additional 12% in 1928, making German workers among the highest-paid in continental Europe. The average length of the working week was reduced from fifty hours to forty-six hours. Furthermore, local municipal authorities launched ambitious public works: between 1924 and 1931, subsidized housing programs constructed over two million modern apartments, clearing damp, tuberculosis-ridden urban tenements and providing working-class families with electric lighting, indoor plumbing, and private balconies.<br><br><span class="para-ref">[1.2]</span> Social welfare protections were dramatically expanded under the landmark <strong>Unemployment Insurance Act of 1927</strong>. This pioneering national legislation established a mandatory social safety net funded by equal contributions from employers and employees, guaranteeing unemployment benefits and sickness pay to over 16.4 million German workers. In addition, the state provided war pensions to 750,000 disabled veterans, 400,000 war widows, and nearly two million orphans. However, this vast welfare state was extraordinarily expensive: it placed a heavy tax burden on the middle classes and business owners, and it relied upon a stable economy, leaving the government vulnerable to catastrophic deficits if mass unemployment returned.',
      },
      {
        act: 2,
        title: 'Act 2: The Changing Position of Women: Suffrage & The "New Woman" (1924–1929)',
        theme_heading:
          'Act 2: The Changing Position of Women: Suffrage & The "New Woman" (1924–1929)',
        text: '<span class="para-ref">[2.1]</span> The Weimar Republic introduced legal equality for women that was among the most progressive in the world. <strong>Article 109</strong> of the Weimar Constitution stated that men and women had fundamental equal rights as citizens, granting women full voting rights and the right to enter all public professions. In the 1919 national elections, over 90% of eligible women cast their ballots. Throughout the 1920s, women made up roughly 10% of all Reichstag deputies (compared to barely 2% in the British House of Commons), and female politicians like Marie Juchacz of the SPD championed maternity protections and juvenile welfare legislation.<br><br><span class="para-ref">[2.2]</span> Economic expansion created millions of new white-collar jobs for young women in urban retail, banking, secretarial work, and civil service. This economic independence gave rise to the cultural phenomenon of the <strong>"New Woman"</strong> (<em>die neue Frau</em>): young, fashionable women who cut their hair into short bobs, wore loose knee-length flapper dresses, smoked cigarettes in public cafes, went unchaperoned to jazz clubs, and practiced birth control. However, social reality was conflicted: traditional conservative attitudes persisted fiercely. Society frowned upon married women working, branding them selfish "double-earners" (<em>Doppelverdiener</em>) who stole jobs from male breadwinners. Women in factories were paid on average 33% less than men for identical labor, and female representation in senior management and university professorships remained negligible.',
      },
      {
        act: 3,
        title: 'Act 3: Modernist Architecture: Walter Gropius & The Bauhaus Movement (1925–1929)',
        theme_heading:
          'Act 3: Modernist Architecture: Walter Gropius & The Bauhaus Movement (1925–1929)',
        source: {
          id: 'source_a_bauhaus_dessau',
          letter: 'A',
          title:
            'Source A: The Bauhaus College Building in Dessau Designed by Walter Gropius (1925–1926)',
          src: '/images/bauhaus_dessau.jpg',
          source: '/images/bauhaus_dessau.jpg',
          image: '/images/bauhaus_dessau.jpg',
          caption:
            'The famous Bauhaus building in Dessau, showing the revolutionary steel-frame structure, curtain glass walls, and geometric functionalism that defined Weimar modernist design.',
          desc: 'Architectural photograph of the Bauhaus Dessau complex, 1926.',
          provenance:
            'Architectural photograph of the Bauhaus Dessau, 1926. Bauhaus Archive / Museum of Design, Berlin.',
          citation: 'Bauhaus Archive Berlin, Walter Gropius Dessau Complex, 1926.',
          question:
            'How does the functional, glass-and-steel design of the Bauhaus building in Source A reflect the democratic, forward-looking ideals of the Weimar Republic?',
          hinge_question:
            'How does the functional, glass-and-steel design of the Bauhaus building in Source A reflect the democratic, forward-looking ideals of the Weimar Republic?',
          source_context:
            'Architectural photograph of the Bauhaus Dessau complex, showing the revolutionary steel-frame structure, curtain glass walls, and geometric functionalism. Hinge Question: How does the functional, glass-and-steel design of the Bauhaus building in Source A reflect the democratic, forward-looking ideals of the Weimar Republic?',
          context:
            'Architectural photograph of the Bauhaus Dessau complex, showing the revolutionary steel-frame structure, curtain glass walls, and geometric functionalism.',
        },
        text: '<span class="para-ref">[3.1]</span> In the 1920s, the end of imperial censorship, guaranteed constitutional freedom of speech, and government arts funding transformed Germany into the epicenter of the European artistic avant-garde. The crowning achievement of Weimar design was the <strong>Bauhaus</strong> school of architecture and design, founded in Weimar in 1919 by visionary architect <strong>Walter Gropius</strong> before relocating to Dessau in 1925 (<span class="archival-meta-tag">Source A</span>). Gropius rejected the heavy, ornate stone pillars and nationalist statues of the Kaiser’s Prussia, declaring that design must reflect the modern industrial machine age: <em>"Art and technology: a new unity."</em><br><br><span class="para-ref">[3.2]</span> Bauhaus pioneered the philosophy of <strong>functionalism</strong>: the principle that an object or building’s form must follow its practical function without superfluous ornamental clutter. Architects utilized steel-frame construction, reinforced concrete, flat cantilevered roofs, and floor-to-ceiling curtain walls of glass that flooded interiors with natural sunlight. Bauhaus designers revolutionized daily domestic life by mass-producing elegant, affordable consumer products: tubular steel cantilever chairs designed by Marcel Breuer, functional electric desk lamps, and geometric municipal housing blocks. Bauhaus proved that modern design could serve working people, becoming Germany’s most influential cultural export to the modern world.',
      },
      {
        act: 4,
        title: 'Act 4: Cultural Innovation: Neue Sachlichkeit Art & Golden Age Cinema (1924–1929)',
        theme_heading:
          'Act 4: Cultural Innovation: Neue Sachlichkeit Art & Golden Age Cinema (1924–1929)',
        source: {
          id: 'source_b_weimar_culture',
          letter: 'B',
          title: 'Source B: Berlin Cabaret and Street Life in the Golden Twenties (c.1926)',
          src: '/images/weimar_kt1_cover.jpg',
          source: '/images/weimar_kt1_cover.jpg',
          image: '/images/weimar_kt1_cover.jpg',
          caption:
            'A depiction of Berlin’s vibrant nightlife, jazz cafes, and avant-garde street culture during the height of the Weimar Golden Twenties.',
          desc: 'Contemporary poster showing Berlin cabaret culture and street nightlife, c.1926.',
          provenance:
            'Contemporary promotional poster for Berlin cabaret and entertainment revue, c.1926. Berlin City Museum Collection.',
          citation: 'Berlin City Museum Collection, Cabaret and Nightlife Poster, c.1926.',
          question:
            'Why did the avant-garde cabaret culture of Berlin shown in Source B provoke such intense moral outrage from conservative and rural Germans?',
          hinge_question:
            'Why did the avant-garde cabaret culture of Berlin shown in Source B provoke such intense moral outrage from conservative and rural Germans?',
          source_context:
            'Contemporary promotional print illustrating Berlin’s vibrant nightlife, jazz cafes, and avant-garde street culture during the height of the Weimar Golden Twenties. Hinge Question: Why did the avant-garde cabaret culture of Berlin shown in Source B provoke such intense moral outrage from conservative and rural Germans?',
          context:
            'Contemporary promotional print illustrating Berlin’s vibrant nightlife, jazz cafes, and avant-garde street culture during the height of the Weimar Golden Twenties.',
        },
        text: '<span class="para-ref">[4.1]</span> Parallel revolutions unfolded in fine art, literature, and cinema. Leading painters formed the <strong>Neue Sachlichkeit</strong> (New Objectivity) movement, abandoning romanticism to confront post-war reality with ruthless, satirical precision. Artists like <strong>Otto Dix</strong>—himself a decorated machine-gunner—painted nightmarish canvasses of legless war amputees begging outside luxury jewellery shops, while <strong>George Grosz</strong> painted grotesque caricatures of fat capitalists, corrupt judges, and militaristic generals feasting while ordinary veterans starved. In literature, Erich Maria Remarque’s anti-war masterpiece <em>All Quiet on the Western Front</em> (1929) exposed the psychological trauma and senseless slaughter of the trenches, selling half a million copies in three months.<br><br><span class="para-ref">[4.2]</span> Meanwhile, Berlin became the nightlife and entertainment capital of the world (<span class="archival-meta-tag">Source B</span>). In darkened cabarets, satirists mocked politicians and subverted traditional moral boundaries. The Babelsberg film studios in Berlin, operated by UFA, were the most technologically advanced outside Hollywood. Visionary director <strong>Fritz Lang</strong> directed groundbreaking expressionist films, including the dystopian science fiction masterpiece <em>Metropolis</em> (1927), while Robert Wiene’s <em>The Cabinet of Dr. Caligari</em> pioneered psychological horror with distorted, angular sets. German cinema produced international icons like Marlene Dietrich in <em>The Blue Angel</em> (1930), projecting Weimar’s dazzling avant-garde brilliance across the globe.',
      },
      {
        act: 5,
        title: 'Act 5: The Cultural Backlash & Deep Societal Division (1924–1929)',
        theme_heading: 'Act 5: The Cultural Backlash & Deep Societal Division (1924–1929)',
        text: '<span class="para-ref">[5.1]</span> However, historians emphasize that the cultural "Golden Age" was an urban phenomenon that alienated large swathes of the German population. While intellectuals and young cosmopolitans in Berlin, Hamburg, and Frankfurt embraced modernism, millions of conservative Germans in small provincial towns and rural farming communities were appalled. Traditional Protestant and Catholic church leaders viewed Berlin as a modern "Sodom and Gomorrah," denouncing jazz clubs, sexually explicit cabarets, bobbed hair, and female emancipation as moral corruption that was destroying the traditional German family and Christian morality.<br><br><span class="para-ref">[5.2]</span> Right-wing nationalist movements—including the German National People’s Party (DNVP) and Adolf Hitler’s Nazi Party (NSDAP)—ruthlessly exploited this conservative moral panic. They denounced Weimar modernism as <strong>Kulturbolschewismus</strong> ("Cultural Bolshevism")—a subversive conspiracy allegedly orchestrated by Jewish intellectuals and communists to undermine German racial and national pride. When conservative Field Marshal Paul von Hindenburg was elected President of the Republic in 1925, he represented the traditionalist yearning for imperial order. This bitter cultural polarization ensured that when economic catastrophe struck in 1929, millions of conservative Germans were already psychologically alienated from the democratic Republic, ready to embrace authoritarian salvation.',
      },
    ],
    workbook_stages: [
      {
        step: 1,
        date: '1924–1928',
        para_ref: '[1.1–1.2]',
        heading: 'How did welfare legislation and real wage growth raise living standards?',
        bullets: [
          'Real wages rising by nine percent nationally',
          'Compulsory worker contributions funding sixteen million citizens',
          'Erecting municipal apartment blocks in urban centres',
        ],
        focus_clue: 'How did welfare legislation and real wage growth raise living standards?',
      },
      {
        step: 2,
        date: '1924–1929',
        para_ref: '[2.1–2.2]',
        heading: 'Why did urban women experience new freedoms while traditional roles persisted?',
        bullets: [
          'Women taking ten percent of Reichstag seats',
          'Young female clerks earning independent secretarial wages',
          'Cutting bobbed haircuts and smoking in public cafes',
        ],
        focus_clue:
          'Why did urban women experience new freedoms while traditional roles persisted?',
      },
      {
        step: 3,
        date: '1925–1929',
        para_ref: '[3.1–3.2]',
        heading: 'How did the Bauhaus school embody modern functionalist design?',
        bullets: [
          'Walter Gropius moving design school to Dessau',
          'Replacing ornate Prussian pillars with glass facades',
          'Designing steel tube chairs and functional apartment blocks',
        ],
        focus_clue: 'How did the Bauhaus school embody modern functionalist design?',
      },
      {
        step: 4,
        date: '1924–1929',
        para_ref: '[4.1–4.2]',
        heading: 'Why did Neue Sachlichkeit painters reject traditional romantic art?',
        bullets: [
          'Otto Dix painting wounded war veterans on sidewalks',
          'George Grosz satirising corrupt industrialists and bankers',
          'Exhibiting raw urban reality in public galleries',
        ],
        focus_clue: 'Why did Neue Sachlichkeit painters reject traditional romantic art?',
      },
      {
        step: 5,
        date: '1926–1929',
        para_ref: '[5.1–5.2]',
        heading: 'Why did conservative Germans view Berlin culture as degenerate?',
        bullets: [
          'Fritz Lang directing science fiction epic Metropolis',
          'UFA film studios dominating European cinematic exports',
          'Conservative rural churchgoers condemning Berlin night clubs',
        ],
        focus_clue: 'Why did conservative Germans view Berlin culture as degenerate?',
      },
    ],
    causal_domino_spine: {
      title: 'Changes in Society, 1924–1929',
      subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
      stages: [
        {
          step: 1,
          date: '1924–1928',
          para_ref: '[1.1–1.2]',
          title: 'Rising Wages & The 1927 Unemployment Act',
          actor: 'Industrial Workers & Weimar Welfare State',
          tag: '📈 WAGES & WELFARE STATE',
          trigger:
            'Economic stabilization boosted real wages by 9–12% and enabled the passage of the 1927 Unemployment Insurance Act protecting 16.4 million workers.',
          desc: 'Economic stabilization boosted real wages by 9–12% and enabled the passage of the 1927 Unemployment Insurance Act protecting 16.4 million workers.',
          connective:
            'Raised working-class living standards and built 2m subsidized apartments, but placed heavy tax burdens on middle-class business owners.',
          question: 'How did welfare legislation and real wage growth raise living standards?',
        },
        {
          step: 2,
          date: '1924–1929',
          para_ref: '[2.1–2.2]',
          title: 'The "New Woman" in Politics & Work',
          actor: 'Female Reichstag Deputies & Urban Working Women',
          tag: '👩 NEW WOMAN EMANCIPATION',
          trigger:
            'Article 109 guaranteed equal rights, electing women to 10% of Reichstag seats while expanding white-collar secretarial employment in cities.',
          desc: 'Article 109 guaranteed equal rights, electing women to 10% of Reichstag seats while expanding white-collar secretarial employment in cities.',
          connective:
            'Fostered financial independence and modern bobbed-hair styles, but provoked conservative backlash against working wives as "double-earners."',
          question:
            'Why did urban women experience new freedoms while traditional roles persisted?',
        },
        {
          step: 3,
          date: '1925–1929',
          para_ref: '[3.1–3.2]',
          title: 'The Bauhaus Movement & Modernist Architecture',
          actor: 'Walter Gropius & Bauhaus Designers',
          tag: '🏢 BAUHAUS FUNCTIONALISM',
          trigger:
            'Walter Gropius relocated the Bauhaus school to Dessau, pioneering functionalist architecture with steel-frame construction and glass curtain walls.',
          desc: 'Walter Gropius relocated the Bauhaus school to Dessau, pioneering functionalist architecture with steel-frame construction and glass curtain walls.',
          connective:
            'Revolutionized twentieth-century industrial design and municipal housing, embodying democratic, forward-looking Weimar culture.',
          question: 'How did the Bauhaus school embody modern functionalist design?',
        },
        {
          step: 4,
          date: '1924–1929',
          para_ref: '[4.1–4.2]',
          title: 'Neue Sachlichkeit & Weimar Cinema',
          actor: 'Otto Dix, George Grosz & Fritz Lang',
          tag: '🎨 CRITICAL AVANT-GARDE',
          trigger:
            'Painters Otto Dix and George Grosz created biting satirical portraits of society, while UFA Babelsberg produced cinematic classics like Metropolis.',
          desc: 'Painters Otto Dix and George Grosz created biting satirical portraits of society, while UFA Babelsberg produced cinematic classics like Metropolis.',
          connective:
            'Made Berlin the vibrant entertainment capital of Europe, but exposed raw social fractures between war veterans and corrupt wealthy elites.',
          question: 'Why did Neue Sachlichkeit painters reject traditional romantic art?',
        },
        {
          step: 5,
          date: '1926–1929',
          para_ref: '[5.1–5.2]',
          title: 'Cultural Backlash & Societal Division',
          actor: 'Rural Traditionalists & Nationalist Groups',
          tag: '⚡ MORAL PANIC & POLARIZATION',
          trigger:
            'Conservative churchgoers, rural provincial communities, and right-wing nationalists condemned Berlin modernism as decadent "Cultural Bolshevism."',
          desc: 'Conservative churchgoers, rural provincial communities, and right-wing nationalists condemned Berlin modernism as decadent "Cultural Bolshevism."',
          connective:
            'Deepened political polarization, ensuring conservative Germans remained culturally alienated from the Republic when economic crisis struck in 1929.',
          question: 'Why did conservative Germans view Berlin culture as degenerate?',
        },
      ],
    },
  },
};

for (let i = 0; i < 4; i++) {
  const lesson = unitData.lessons[i];
  const updateData = KT1_5_ACT_DATA[lesson.id];
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
  '\n✅ Successfully migrated Key Topic 1 (Weimar Republic) to 5-Act Gold Standard in data.js!',
);
