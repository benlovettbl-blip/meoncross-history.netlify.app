/**
 * History Revision Hub — Weimar and Nazi Germany, 1918–1939
 * Migration: Key Topic 3 (Nazi Control and Dictatorship, 1933–1939) to 5-Act Gold Standard & Digital Spine Parity
 *
 * Converts Key Topic 3 lessons 3.1 through 3.4 in units/weimar_nazi_germany/data.js:
 * 1. Structures narrative_blocks into 5 chronological Acts ([1.1] to [5.2]).
 * 2. Maps authentic primary visual sources to their respective Acts.
 * 3. Injects 5-stage `workbook_stages` matching WEIMAR_ENQUIRY_CONFIGS.KT3.
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

const KT3_5_ACT_DATA = {
  // --------------------------------------------------------------------------
  // LESSON 3.1: THE CREATION OF A DICTATORSHIP, 1933–1934
  // --------------------------------------------------------------------------
  lesson_3_1: {
    teacher_notes: {
      primer:
        'This enquiry examines the rapid and ruthless process through which Adolf Hitler dismantled the Weimar constitutional democracy to create a totalitarian one-party dictatorship between February 1933 and August 1934. Students investigate the Reichstag Fire and the suspension of civil liberties via the emergency decree, the passage of the Enabling Act through intimidation in the Kroll Opera House, the process of Gleichschaltung (co-ordination) that abolished trade unions and political parties, the bloody purge of Ernst Röhm and the SA during the Night of the Long Knives, and the death of President Hindenburg leading to the military oath of personal obedience to the Führer.',
      objectives: [
        {
          objective:
            'Explain how the Reichstag Fire of 27 February 1933 was exploited to crush civil liberties and outlaw political opponents.',
          primer:
            'Direct students to paragraphs [1.1]–[1.2] and Source A (Reichstag Fire ruins). Emphasize that Marinus van der Lubbe’s arrest was seized upon to declare a communist conspiracy, prompting Hindenburg to sign the Reichstag Fire Decree suspending all constitutional liberties.',
          question:
            'How did the Reichstag Fire Decree provide legal authority for the mass arrest of political opponents before the March 1933 election?',
        },
        {
          objective:
            'Analyse how the Enabling Act of 23 March 1933 transferred legislative and constitutional power directly to Adolf Hitler.',
          primer:
            'Direct students to paragraphs [2.1]–[2.2]. Explain how SA intimidation, the banning of Communist deputies, and false promises to the Catholic Centre Party secured the necessary two-thirds majority to govern by decree without the Reichstag.',
          question:
            'Why did the Enabling Act effectively mark the constitutional end of the Weimar Republic?',
        },
        {
          objective:
            'Assess the process of Gleichschaltung in abolishing free trade unions and establishing a legal one-party state by July 1933.',
          primer:
            'Direct students to paragraphs [3.1]–[3.2]. Detail the storming of trade union offices on 2 May 1933, the creation of Robert Ley’s German Labour Front (DAF), the banning of the SPD, and the July 1933 Law Against the Formation of Parties.',
          question:
            'How did Gleichschaltung systematically eliminate all independent institutions capable of organizing political opposition?',
        },
        {
          objective:
            'Examine why Hitler launched the bloody purge of Ernst Röhm and the SA leadership during the Night of the Long Knives in June 1934.',
          primer:
            'Direct students to paragraphs [4.1]–[4.2]. Focus on Röhm’s ambition to merge the regular army into a four-million-strong SA militia ("second revolution"), which threatened the Reichswehr high command whose support Hitler needed.',
          question:
            'Why did Hitler prioritize the loyalty of the regular German Army over his long-standing paramilitary stormtroopers?',
        },
        {
          objective:
            'Evaluate how the death of President Hindenburg and the armed forces oath cemented Hitler’s supreme totalitarian authority in August 1934.',
          primer:
            'Direct students to paragraphs [5.1]–[5.2]. Detail the merger of the offices of President and Chancellor into the title of Führer, confirmed by the personal oath of loyalty sworn by every soldier in the armed forces.',
          question:
            'Why was the personal oath of loyalty to Hitler far more dangerous than an oath to the German constitution or state?',
        },
      ],
      source_context: {
        'Source A':
          'Source A: The Ruins of the Reichstag Fire in Berlin (February 1933). Archival photograph showing the burnt-out, smoking interior of the Reichstag debating chamber following the arson attack on the night of 27 February 1933. Hinge Question: How did the dramatic physical destruction depicted in Source A allow Hitler to persuade President Hindenburg that Germany was on the brink of a Bolshevik revolution?',
      },
    },
    narrative_blocks: [
      {
        act: 1,
        title: 'Act 1: The Reichstag Fire & Emergency Decree (27 Feb 1933)',
        theme_heading: 'Act 1: The Reichstag Fire & Emergency Decree (27 Feb 1933)',
        source: {
          id: 'source_a_reichstag_fire',
          letter: 'A',
          title: 'Source A: The Ruins of the Reichstag Debating Chamber (February 1933)',
          src: '/images/reichstag_fire_ruins.jpg',
          source: '/images/reichstag_fire_ruins.jpg',
          image: '/images/reichstag_fire_ruins.jpg',
          caption:
            'The gutted interior of the German Reichstag building following the catastrophic fire of 27 February 1933, which Hitler exploited to suspend civil liberties.',
          desc: 'Archival photograph of the burnt-out Reichstag building in Berlin.',
          provenance:
            'Archival photograph of the Reichstag interior, Berlin, 28 February 1933. German Federal Archives (Bundesarchiv Bild 102-14376).',
          citation: 'Bundesarchiv Bild 102-14376, Reichstag Fire Ruins, 1933.',
          question:
            'How did the dramatic physical destruction depicted in Source A allow Hitler to persuade President Hindenburg that Germany was on the brink of a Bolshevik revolution?',
          hinge_question:
            'How did the dramatic physical destruction depicted in Source A allow Hitler to persuade President Hindenburg that Germany was on the brink of a Bolshevik revolution?',
          source_context:
            'Archival photograph showing the burnt-out, smoking interior of the Reichstag debating chamber following the arson attack on the night of 27 February 1933. Hinge Question: How did the dramatic physical destruction depicted in Source A allow Hitler to persuade President Hindenburg that Germany was on the brink of a Bolshevik revolution?',
          context:
            'Archival photograph showing the burnt-out interior of the Reichstag debating chamber after the fire of 27 February 1933.',
        },
        text: '<span class="para-ref">[1.1]</span> Upon taking office in January 1933, Hitler immediately persuaded President Hindenburg to dissolve parliament and call fresh elections for 5 March, aiming to win an outright parliamentary majority. The campaign took place in an atmosphere of intense violence, with Göring enrolling 50,000 SA and SS men as auxiliary police. Then, late on the evening of <strong>27 February 1933</strong>, disaster struck: the iconic Reichstag building in Berlin burst into flames (<span class="archival-meta-tag">Source A</span>). Inside the burning hall, police arrested <strong>Marinus van der Lubbe</strong>, a young, unemployed Dutch communist bricklayer found shirtless with matches and firelighters. Hitler and Goebbels arrived at the scene immediately, declaring without evidence that the fire was the signal for a nationwide armed Bolshevik insurrection.<br><br><span class="para-ref">[1.2]</span> The following morning, 28 February 1933, Hitler rushed to the presidential palace and persuaded the panicked eighty-five-year-old Hindenburg to invoke Article 48. Hindenburg signed the <strong>Decree for the Protection of People and State</strong> (commonly known as the Reichstag Fire Decree). This fateful law indefinitely suspended fundamental civil liberties guaranteed by the Weimar Constitution: freedom of speech, freedom of the press, the right to public assembly, and privacy of postal and telephone communication. Armed state police and brownshirts immediately arrested over four thousand communist leaders, including KPD chairman Ernst Thälmann, closing down all left-wing newspapers. Although the Nazis won 288 seats (43.9%) in the 5 March election, they still lacked the absolute parliamentary majority needed to amend the constitution.',
      },
      {
        act: 2,
        title: 'Act 2: The Enabling Act (23 Mar 1933)',
        theme_heading: 'Act 2: The Enabling Act (23 Mar 1933)',
        text: '<span class="para-ref">[2.1]</span> Determined to free himself from both parliamentary oversight and reliance on Hindenburg’s presidential decrees, Hitler drafted the <strong>Enabling Act</strong> (formally titled the "Law for the Removal of the Distress of the People and Reich"). This constitutional amendment proposed to grant the Chancellor the power to enact laws without the consent of the Reichstag for a period of four years—even if those laws violated the existing Weimar Constitution. Because this law altered the constitution, it required a two-thirds majority in parliament.<br><br><span class="para-ref">[2.2]</span> On <strong>23 March 1933</strong>, the Reichstag met inside the temporary Kroll Opera House in Berlin. The atmosphere was one of terrifying intimidation: armed SA and SS stormtroopers lined the aisles, blocked the exits, and surrounded the building, chanting aggressively: "Give us the bill or else fire and murder!" Hitler had already banned the eighty-one elected Communist deputies from attending, while twenty-six Social Democrats were arrested or in hiding. To secure the crucial votes of the Catholic Centre Party, Hitler promised their leader, Monsignor Ludwig Kaas, that Catholic schooling and church independence would be protected. The Centre Party capitulated: the bill passed overwhelmingly by <strong>444 votes to 94</strong>. Only the remaining Social Democrats, led with immense courage by Otto Wels, voted against. Otto Wels boldly declared to Hitler: "You can strip us of our freedom and our lives, but you cannot strip us of our honour." With the passage of the Enabling Act, parliamentary democracy in Germany was extinguished.',
      },
      {
        act: 3,
        title: 'Act 3: Gleichschaltung (Co-ordination of State & Society) (May–Jul 1933)',
        theme_heading: 'Act 3: Gleichschaltung (Co-ordination of State & Society) (May–Jul 1933)',
        text: '<span class="para-ref">[3.1]</span> Armed with dictatorial power under the Enabling Act, Hitler launched the policy of <strong><em>Gleichschaltung</em></strong> ("co-ordination" or bringing into line), designed to bring every institution in German civic, economic, and political life under total Nazi control. The first target was the independent labour movement. Hitler declared 1 May 1933 a national holiday ("Day of National Labour"), encouraging workers to celebrate. The very next morning, on <strong>2 May 1933</strong>, SA and police stormtroopers smashed their way into trade union offices across the nation, seizing their bank accounts, beating officials, and dragging union bosses into newly opened concentration camps. Free trade unions were outlawed and replaced by a compulsory state monopoly: the <strong>German Labour Front (DAF)</strong>, led by Dr. Robert Ley, which stripped workers of the right to strike or negotiate wages.<br><br><span class="para-ref">[3.2]</span> Political parties were eliminated next. In May 1933, the government confiscated the assets of the Social Democratic Party (SPD), formally banning it as "hostile to the state" on 22 June. Intimidated by constant arrests, the remaining conservative and liberal parties dissolved themselves in rapid succession, including the German National People’s Party (DNVP) and the Catholic Centre Party. On <strong>14 July 1933</strong>, Hitler enacted the <strong>Law Against the Establishment of Parties</strong>, which declared the NSDAP to be the sole legal political party in Germany and made any attempt to maintain or form another party a punishable crime. In just six months, Germany had been transformed into a monolithic one-party police state.',
      },
      {
        act: 4,
        title: 'Act 4: The Night of the Long Knives (30 Jun 1934)',
        theme_heading: 'Act 4: The Night of the Long Knives (30 Jun 1934)',
        text: '<span class="para-ref">[4.1]</span> By the summer of 1934, only two major institutions retained the potential to challenge Hitler: the traditional conservative German Army (<em>Reichswehr</em>) and his own four-million-strong paramilitary wing, the SA. The SA leader, <strong>Ernst Röhm</strong>, was growing increasingly dangerous. Röhm openly demanded a "second revolution" to nationalize big businesses, ridiculing Hitler’s compromises with wealthy industrialists. More alarmingly for the military high command, Röhm demanded that his four million street fighters should absorb and replace the professional 100,000-man regular army. Defense Minister General Werner von Blomberg delivered an ultimatum: unless Hitler reined in the unruly SA, President Hindenburg would declare martial law and transfer all executive power to the army.<br><br><span class="para-ref">[4.2]</span> Faced with a stark choice between the brawling stormtroopers who had brought him to power and the professional army whose heavy weapons and aristocratic officer corps he needed to conquer Europe, Hitler chose the army. On the night of <strong>30 June 1934</strong>, in the bloody purge known as the <strong>Night of the Long Knives</strong> (<em>Operation Hummingbird</em>), Hitler personally led SS execution squads into the Bavarian resort town of Bad Wiessee. Röhm was dragged from his bed at gunpoint; refusing an invitation to shoot himself with a pistol left in his cell at Stadelheim prison, he was executed by SS officers. Over the next forty-eight hours, SS executioners murdered an estimated four hundred people across Germany, including former Chancellor Kurt von Schleicher, Nazi dissident Gregor Strasser, and Bavarian commissioner Gustav von Kahr. The purge eliminated internal left-wing dissent, pacified the army, and established murder as an accepted instrument of state policy.',
      },
      {
        act: 5,
        title: 'Act 5: Death of Hindenburg & The Army Oath (2 Aug 1934)',
        theme_heading: 'Act 5: Death of Hindenburg & The Army Oath (2 Aug 1934)',
        text: '<span class="para-ref">[5.1]</span> On <strong>2 August 1934</strong>, eighty-six-year-old President Paul von Hindenburg died at his Neudeck estate in East Prussia. Within hours, Hitler acted ruthlessly to eliminate the presidency as an independent check on his power. Capitalizing on the legislation pre-drafted the previous evening, the cabinet promulgated the Law Concerning the Head of State of the German Reich: the office of the President was merged with that of the Chancellor. Hitler chose not to take the title of President out of respect for Hindenburg, instead assuming the supreme title of <strong><em>Führer und Reichskanzler</em></strong> (Leader and Reich Chancellor), becoming both head of state and head of government.<br><br><span class="para-ref">[5.2]</span> Most critically, Defense Minister Blomberg ensured that every officer and enlisted soldier in the German Army immediately swore a new, unprecedented <strong>oath of unconditional personal obedience</strong>: "I swear by God this holy oath, that I will render unconditional obedience to the Führer of the German Reich and People, Adolf Hitler, the Supreme Commander of the Armed Forces, and will at all times be prepared, as a brave soldier, to surrender my life for this oath." In German military culture, an oath sworn before God was an unbreakable sacred bond. On 19 August 1934, Hitler held a nationwide plebiscite to confirm his new dictatorial powers: eighty-nine point nine percent of the electorate voted "Yes." Hitler’s dictatorship was absolute, backed by the full military might of the German armed forces.',
      },
    ],
    workbook_stages: [
      {
        stage: 1,
        dates: '27 Feb 1933',
        title: 'The Reichstag Fire & Emergency Decree',
        spec_focus:
          'Van der Lubbe; Reichstag Fire Decree; suspension of civil liberties; mass arrests.',
        focus_clue: 'How was the arson used as a pretext to destroy constitutional rights?',
        para_ref: '[1.1–1.2]',
        bullets: [
          'Marinus van der Lubbe arrested inside burning parliamentary hall',
          'Suspending all civil liberties and freedom of press',
          'Imprisoning four thousand Communist deputies without court trial',
        ],
        writing_frame: {
          connectives:
            'A primary turning point was... &bull; Specifically, the arson allowed the government to... &bull; This was significant because... &bull; Consequently, ...',
        },
      },
      {
        stage: 2,
        dates: '23 Mar 1933',
        title: 'The Enabling Act',
        spec_focus: 'Enabling Act; Kroll Opera House; SA intimidation; end of democracy.',
        focus_clue: 'Why did the Enabling Act effectively end parliamentary democracy in Germany?',
        para_ref: '[2.1–2.2]',
        bullets: [
          'Surrounding Kroll Opera House with armed brownshirts',
          'Intimidating Catholic Centre Party into voting for decree',
          'Passing law granting four years of rule without parliament',
        ],
        writing_frame: {
          connectives:
            'Parliamentary democracy was dismantled when... &bull; For example, the passage of... &bull; This gave Hitler the power to... &bull; As a result, ...',
        },
      },
      {
        stage: 3,
        dates: 'May–Jul 1933',
        title: 'Gleichschaltung (Co-ordination of State & Society)',
        spec_focus:
          'Gleichschaltung; trade union suppression; DAF; Law Against Formation of Parties.',
        focus_clue: 'How did Gleichschaltung dismantle independent social and political bodies?',
        para_ref: '[3.1–3.2]',
        bullets: [
          'Stormtroopers smashing trade union offices on second of May',
          'Confiscating socialist assets and outlawing rival parties',
          'Declaring one-party state under July legal decree',
        ],
        writing_frame: {
          connectives:
            'Another major step was the process of... &bull; In particular, the regime targeted... &bull; This eliminated opposition because... &bull; Furthermore, ...',
        },
      },
      {
        stage: 4,
        dates: '30 Jun 1934',
        title: 'The Night of the Long Knives',
        spec_focus: 'Night of the Long Knives; Ernst Röhm; SA purge; army pacification.',
        focus_clue: 'Why did the Führer purge his own paramilitary commanders?',
        para_ref: '[4.1–4.2]',
        bullets: [
          'Dragging Ernst Röhm from Bavarian lakeside hotel bed',
          'Murdering four hundred stormtroopers and political opponents',
          'Army generals celebrating removal of rowdy street rival',
        ],
        writing_frame: {
          connectives:
            'A violent purge occurred because... &bull; For instance, Hitler moved against... &bull; This action was taken to appease... &bull; In addition, ...',
        },
      },
      {
        stage: 5,
        dates: '2 Aug 1934',
        title: 'Death of Hindenburg & The Army Oath',
        spec_focus: 'Death of Hindenburg; Führer title; military personal oath; plebiscite.',
        focus_clue: 'How did the military oath cement total control over the armed forces?',
        para_ref: '[5.1–5.2]',
        bullets: [
          'Merging presidency and chancellorship into supreme dictator',
          'Every soldier swearing personal obedience to head of state',
          'Confirming absolute power with ninety percent plebiscite vote',
        ],
        writing_frame: {
          connectives:
            'Total dictatorship was completed when... &bull; On 2 August 1934, following... &bull; This was crucial because the army... &bull; Overall, ...',
        },
      },
    ],
    causal_domino_spine: {
      title: 'KT3.1: The Creation of a Dictatorship (1933–1934)',
      subtitle: 'From Reichstag Fire to the Supreme Führer Oath',
      stages: [
        {
          step: 1,
          date: '27 Feb 1933',
          para_ref: '[1.1–1.2]',
          title: 'The Reichstag Fire & Emergency Decree',
          actor: 'Marinus van der Lubbe & Adolf Hitler',
          tag: '🔥 ARSON & SUSPENSION OF RIGHTS',
          trigger:
            'The Reichstag building was torched, prompting Hitler to extract the Reichstag Fire Decree from Hindenburg, suspending all civil liberties and arresting 4,000 communists.',
          desc: 'The Reichstag building was torched, prompting Hitler to extract the Reichstag Fire Decree from Hindenburg, suspending all civil liberties and arresting 4,000 communists.',
          connective:
            'Crippled left-wing opposition, clearing the path to push through absolute emergency legislation in parliament.',
          question: 'How was the arson used as a pretext to destroy constitutional rights?',
        },
        {
          step: 2,
          date: '23 Mar 1933',
          para_ref: '[2.1–2.2]',
          title: 'The Enabling Act',
          actor: 'Reichstag Deputies & SA Intimidators',
          tag: '📜 KROLL OPERA HOUSE ENABLING ACT',
          trigger:
            'Surrounded by chanting brownshirts in the Kroll Opera House, the Reichstag passed the Enabling Act by 444 to 94 votes, granting Hitler power to enact laws without parliament.',
          desc: 'Surrounded by chanting brownshirts in the Kroll Opera House, the Reichstag passed the Enabling Act by 444 to 94 votes, granting Hitler power to enact laws without parliament.',
          connective:
            'Gave the Nazi cabinet total legal power to unilaterally dismantle all remaining democratic and civic institutions.',
          question: 'Why did the Enabling Act effectively end parliamentary democracy in Germany?',
        },
        {
          step: 3,
          date: 'May–Jul 1933',
          para_ref: '[3.1–3.2]',
          title: 'Gleichschaltung (Co-ordination of State & Society)',
          actor: 'Robert Ley (DAF) & Nazi Police',
          tag: '⚙️ TOTALITARIAN CO-ORDINATION',
          trigger:
            'The regime smashed trade unions on 2 May to create the DAF, banned the SPD, and declared a one-party state on 14 July 1933.',
          desc: 'The regime smashed trade unions on 2 May to create the DAF, banned the SPD, and declared a one-party state on 14 July 1933.',
          connective:
            'Extinguished all independent political parties and labor organizations across German civil society.',
          question: 'How did Gleichschaltung dismantle independent social and political bodies?',
        },
        {
          step: 4,
          date: '30 Jun 1934',
          para_ref: '[4.1–4.2]',
          title: 'The Night of the Long Knives',
          actor: 'Adolf Hitler, SS & Ernst Röhm',
          tag: '🗡️ RÖHM & SA PARAMILITARY PURGE',
          trigger:
            'Hitler purged Ernst Röhm and the SA leadership, executing an estimated 400 individuals to eliminate internal radical dissent and win the loyalty of the regular army.',
          desc: 'Hitler purged Ernst Röhm and the SA leadership, executing an estimated 400 individuals to eliminate internal radical dissent and win the loyalty of the regular army.',
          connective:
            'Pacified the Reichswehr high command and removed the last organized domestic challenge to Hitler’s authority.',
          question: 'Why did the Führer purge his own paramilitary commanders?',
        },
        {
          step: 5,
          date: '2 Aug 1934',
          para_ref: '[5.1–5.2]',
          title: 'Death of Hindenburg & The Army Oath',
          actor: 'Adolf Hitler & German Armed Forces',
          tag: '👑 SUPREME FÜHRER & MILITARY OATH',
          trigger:
            'President Hindenburg died; Hitler merged the presidency and chancellorship into the supreme title of Führer, requiring every soldier to swear an oath of personal loyalty.',
          desc: 'President Hindenburg died; Hitler merged the presidency and chancellorship into the supreme title of Führer, requiring every soldier to swear an oath of personal loyalty.',
          connective:
            'Completed the transformation of Germany into an absolute totalitarian dictatorship with total military obedience.',
          question: 'How did the military oath cement total control over the armed forces?',
        },
      ],
    },
  },

  // --------------------------------------------------------------------------
  // LESSON 3.2: THE POLICE STATE
  // --------------------------------------------------------------------------
  lesson_3_2: {
    teacher_notes: {
      primer:
        'This enquiry examines the mechanisms of terror, surveillance, and legal perversion through which the Nazi police state maintained control over Germany between 1933 and 1939. Students explore Heinrich Himmler’s expansion of the Schutzstaffel (SS) and the creation of early concentration camps like Dachau, the clandestine operations and public myth of the Gestapo under Reinhard Heydrich, the subversion of the judiciary through the People’s Court (Volksgerichtshof) and Roland Freisler, the regime’s persecution of the Roman Catholic Church and Pope Pius XI’s 1937 encyclical With Burning Concern, and the suppression of Protestant dissent alongside Martin Niemöller’s Confessional Church.',
      objectives: [
        {
          objective:
            'Explain how Heinrich Himmler transformed the SS from an elite bodyguard into a vast state machinery of racial terror and concentration camps.',
          primer:
            'Direct students to paragraphs [1.1]–[1.2] and Source A (Dachau roll call). Detail the establishment of Dachau in March 1933 under Theodor Eicke, the Death’s Head units (SS-Totenkopfverbände), and the concept of protective custody (Schutzhaft).',
          question:
            'How did early concentration camps like Dachau serve to neutralize political opposition in the early months of the regime?',
        },
        {
          objective:
            'Analyse the operational reality of the Gestapo under Reinhard Heydrich versus the popular myth of omnipresent surveillance.',
          primer:
            'Direct students to paragraphs [2.1]–[2.2]. Emphasize that the Gestapo was remarkably small (only 32,000 agents nationwide), relying heavily on voluntary denunciations from ordinary German citizens motivated by petty grudges.',
          question:
            'Why did voluntary civilian denunciations prove to be the most vital intelligence source for the Gestapo?',
        },
        {
          objective:
            'Assess how the traditional German legal system was Nazified through the People’s Court and ideological jurist leagues.',
          primer:
            'Direct students to paragraphs [3.1]–[3.2]. Explain how judges were forced to join the National Socialist League of Jurists, sworn to rule in accordance with the "healthy instinct of the people," while Roland Freisler led show trials with no juries or appeals.',
          question:
            'How did the creation of the People’s Court undermine traditional standards of justice and the rule of law?',
        },
        {
          objective:
            'Examine the regime’s relationship with the Roman Catholic Church, from the 1933 Concordat to the 1937 Papal Encyclical.',
          primer:
            'Direct students to paragraphs [4.1]–[4.2]. Contrast the July 1933 treaty signed with Cardinal Pacelli with the subsequent harassment of Catholic youth groups, closure of monastic schools, and Pope Pius XI’s encyclical Mit brennender Sorge.',
          question:
            'Why did the Nazi regime systematically violate the 1933 Concordat despite having guaranteed Catholic religious rights?',
        },
        {
          objective:
            'Evaluate the conflict within German Protestantism between the pro-Nazi Reich Church and Martin Niemöller’s Confessional Church.',
          primer:
            'Direct students to paragraphs [5.1]–[5.2]. Contrast Ludwig Müller’s "German Christians" (who removed the Old Testament and placed Mein Kampf on altars) with the Pastors’ Emergency League, resulting in Niemöller’s arrest and concentration camp imprisonment.',
          question:
            'Why did Martin Niemöller and the Confessional Church resist state control over Protestant theology and clergy appointments?',
        },
      ],
      source_context: {
        'Source A':
          'Source A: Roll Call at Dachau Concentration Camp (1933). Archival photograph showing communist and socialist political prisoners standing at attention during morning roll call under armed SS guard at Dachau, the first Nazi concentration camp established near Munich in March 1933. Hinge Question: How does Source A demonstrate the psychological and physical mechanisms used by the SS to break the spirit of political opponents?',
      },
    },
    narrative_blocks: [
      {
        act: 1,
        title: 'Act 1: The SS & Heinrich Himmler’s Terror Empire (1933–1939)',
        theme_heading: 'Act 1: The SS & Heinrich Himmler’s Terror Empire (1933–1939)',
        source: {
          id: 'source_a_dachau_roll_call',
          letter: 'A',
          title: 'Source A: Morning Roll Call at Dachau Concentration Camp (1933)',
          src: '/images/dachau_roll_call.jpg',
          source: '/images/dachau_roll_call.jpg',
          image: '/images/dachau_roll_call.jpg',
          caption:
            'Political prisoners standing at attention during morning roll call at Dachau Concentration Camp in 1933 under armed SS surveillance.',
          desc: 'Archival photograph of political prisoners at Dachau Concentration Camp in 1933.',
          provenance:
            'Archival photograph of Dachau Concentration Camp, 1933. German Federal Archives (Bundesarchiv Bild 152-01-26).',
          citation: 'Bundesarchiv Bild 152-01-26, Dachau Roll Call, 1933.',
          question:
            'How does Source A demonstrate the psychological and physical mechanisms used by the SS to break the spirit of political opponents?',
          hinge_question:
            'How does Source A demonstrate the psychological and physical mechanisms used by the SS to break the spirit of political opponents?',
          source_context:
            'Archival photograph showing communist and socialist political prisoners standing at attention during morning roll call under armed SS guard at Dachau, the first Nazi concentration camp established near Munich in March 1933. Hinge Question: How does Source A demonstrate the psychological and physical mechanisms used by the SS to break the spirit of political opponents?',
          context:
            'Archival photograph showing political prisoners during morning roll call at Dachau Concentration Camp in 1933.',
        },
        text: '<span class="para-ref">[1.1]</span> The supreme foundation of the Nazi police state was the <strong>Schutzstaffel (SS)</strong>. Originally formed in 1925 as Hitler’s personal personal bodyguard of a few hundred men, the SS was transformed under <strong>Reichsführer-SS Heinrich Himmler</strong> into a terrifying, ideologically fanatical empire within the state. SS members were recruited according to strict biological racial criteria, required to prove pure Aryan ancestry dating back to 1750, wear menacing black uniforms designed by Hugo Boss, and swear total personal loyalty to Hitler. By 1939, the SS had expanded to over 240,000 men, organized into distinct branches: the General-SS (administrative and racial governance), the SS-Verfügungstruppe (armed combat divisions), and the ruthless <strong>SS-Totenkopfverbände</strong> (Death’s Head units).<br><br><span class="para-ref">[1.2]</span> Under Himmler’s command, the Death’s Head units operated the regime’s system of <strong>concentration camps</strong> (<em>Konzentrationslager</em>). In March 1933, Himmler opened the first model concentration camp at an abandoned munitions factory in <strong>Dachau</strong> near Munich (<span class="archival-meta-tag">Source A</span>). Unlike ordinary civil prisons, concentration camps were explicitly exempt from judicial review or civil law. Under the Reichstag Fire Decree, the SS held prisoners in indefinite <strong>"protective custody"</strong> (<em>Schutzhaft</em>) without charge, trial, or access to legal defense. Camp commandant Theodor Eicke introduced brutal disciplinary codes: harsh physical labour, starvation rations, public floggings, and summary executions. By 1939, six major camps were operating across Germany—including Sachsenhausen, Buchenwald, and Ravensbrück—holding over 20,000 political opponents, trade unionists, Jehovah’s Witnesses, homosexuals, and Roma.',
      },
      {
        act: 2,
        title: 'Act 2: The Gestapo & Informer Network (1933–1939)',
        theme_heading: 'Act 2: The Gestapo & Informer Network (1933–1939)',
        text: '<span class="para-ref">[2.1]</span> The secret state police, known as the <strong>Gestapo</strong> (<em>Geheime Staatspolizei</em>), was created by Hermann Göring in Prussia in April 1933 and brought under Himmler and his brilliant, cold-blooded deputy <strong>Reinhard Heydrich</strong> in 1934. The Gestapo wore plain civilian clothes and operated with absolute legal impunity. In 1936, the Reich law formally confirmed that the Gestapo’s actions were exempt from any judicial review by administrative courts: whatever the Gestapo deemed necessary to protect the state was lawful. The Gestapo had the power to tap telephones, intercept private mail, conduct warrantless searches at any hour of the night, and extract confessions through brutal torture in the basement cells of their headquarters at Prinz-Albrecht-Strasse in Berlin.<br><br><span class="para-ref">[2.2]</span> Popular propaganda portrayed the Gestapo as an all-seeing, omnipresent terror network that had an operative watching every street corner. However, modern historical research has revealed that the Gestapo was remarkably small: across the entire German Reich of nearly seventy million people, there were only approximately <strong>32,000 Gestapo officers</strong>. In major industrial cities like Frankfurt, a mere forty or fifty agents policed half a million citizens. The true secret of the Gestapo’s deadly efficiency lay in <strong>voluntary denunciations</strong> by ordinary German citizens. Over eighty percent of all Gestapo political investigations were initiated by tip-offs from neighbors, work colleagues, landlords, and estranged spouses settling petty personal grudges, property disputes, or professional jealousies, creating an atmosphere of suffocating paranoia where nobody felt safe to speak their mind.',
      },
      {
        act: 3,
        title: 'Act 3: Nazifying the Legal System & People’s Court (1933–1934)',
        theme_heading: 'Act 3: Nazifying the Legal System & People’s Court (1933–1934)',
        text: '<span class="para-ref">[3.1]</span> In a totalitarian police state, the independent administration of justice is an intolerable obstacle. The Nazi regime systematically dismantled the independence of the German legal profession. All judges, prosecutors, and lawyers were compelled to join the <strong>National Socialist League for the Maintenance of Law</strong> (BNSDJ). In 1936, judges were required to wear the swastika emblem on their black robes and swear a personal oath of loyalty to Hitler, instructed that their primary legal duty was not objective justice, but interpreting the law in accordance with the "Führer’s will" and the "healthy instinct of the German people." Traditional civil rights—such as trial by jury and the presumption of innocence—were abolished.<br><br><span class="para-ref">[3.2]</span> In 1934, furious that the Supreme Court had acquitted three of the four communist defendants accused of the Reichstag Fire, Hitler established a separate, specialized political tribunal: the <strong>People’s Court</strong> (<em>Volksgerichtshof</em>). Composed of two professional judges and five high-ranking Nazi Party and SS officials, the People’s Court tried cases of high treason and political subversion in secret. Defendants were denied choice of counsel, and defense lawyers who argued too forcefully were themselves arrested. Later overseen by the screaming, fanatical judge <strong>Roland Freisler</strong>, the People’s Court functioned as an execution assembly line: between 1934 and 1939, hundreds of political dissenters were condemned to the guillotine or hanging with no possibility of appeal.',
      },
      {
        act: 4,
        title: 'Act 4: The Catholic Concordat & Papal Resistance (Jul 1933)',
        theme_heading: 'Act 4: The Catholic Concordat & Papal Resistance (Jul 1933)',
        text: '<span class="para-ref">[4.1]</span> With approximately twenty-two million German citizens belonging to the Roman Catholic Church, Hitler recognized that open confrontation with the Papacy would be politically dangerous in the early months of his regime. In July 1933, Vice-Chancellor Franz von Papen traveled to Rome and signed a formal diplomatic treaty—the <strong>Reichskonkordat</strong> (Concordat)—with Cardinal Eugenio Pacelli (the future Pope Pius XII), representing Pope Pius XI. Under the Concordat, the Papacy guaranteed that German Catholic bishops and priests would abstain entirely from domestic political activity and agreed to the dissolution of the Catholic Centre Party. In return, Hitler gave a solemn international guarantee that the state would protect Catholic freedom of worship, youth organizations, and independent Catholic schools.<br><br><span class="para-ref">[4.2]</span> Hitler’s promises were cynically worthless. Almost immediately, the regime began systematically violating the Concordat. Catholic youth leagues were harassed and forcibly merged into the Hitler Youth, crucifixes were ordered removed from classroom walls, and Catholic schools were converted into secular community schools. In 1936 and 1937, the regime launched sensationalized show trials accusing hundreds of Catholic priests and monks of financial embezzlement and sexual immorality ("immorality trials"). The Vatican struck back: on Palm Sunday in March 1937, Catholic priests across Germany stunned congregations by reading out from every pulpit an encyclical by Pope Pius XI entitled <strong><em>Mit brennender Sorge</em></strong> ("With Burning Concern"). Smuggled into Germany in secret, the papal letter condemned the Nazi regime as a treacherous violator of treaties that idolatrously worshiped race and the state. The Gestapo raided church printing presses and arrested hundreds of outspoken priests, but the regime dared not execute high-ranking bishops for fear of provoking civil unrest.',
      },
      {
        act: 5,
        title: 'Act 5: The Reich Church & The Confessional Resistance (1933–1937)',
        theme_heading: 'Act 5: The Reich Church & The Confessional Resistance (1933–1937)',
        text: '<span class="para-ref">[5.1]</span> The Protestant majority—comprising forty million Germans across twenty-eight regional Lutheran and Reformed churches—presented a different challenge. In 1933, pro-Nazi Protestant theologians organized themselves into the <strong>"German Christians"</strong> (<em>Deutsche Christen</em>) movement, led by Hitler’s military chaplain, <strong>Ludwig Müller</strong>. The German Christians advocated an aggressive "Aryanized Christianity": they removed the Old Testament from the Bible as "Jewish literature," portrayed Jesus Christ as a heroic Aryan warrior who fought Jewish corruption, and placed swastika banners alongside copies of <em>Mein Kampf</em> on church altars. In September 1933, Hitler engineered Müller’s election as supreme <strong>Reich Bishop</strong> of a unified National Reich Church, enforcing the Nazi "Aryan Paragraph" that dismissed any clergyman with Jewish ancestry.<br><br><span class="para-ref">[5.2]</span> This blatant theological perversion sparked fierce rebellion among traditional conservative Protestants. Led by the charismatic First World War U-boat commander <strong>Pastor Martin Niemöller</strong> and theologian Dietrich Bonhoeffer, six thousand pastors broke away in late 1933 to form the Pastors’ Emergency League. In May 1934, they issued the famous Barmen Declaration, establishing the independent <strong>Confessional Church</strong> (<em>Bekennende Kirche</em>), which declared that the Christian church owed allegiance only to Jesus Christ and rejected Nazi ideological interference. Niemöller preached fiery sermons to packed congregations in Berlin-Dahlem, openly declaring: "We must obey God rather than man." In July 1937, the Gestapo arrested Niemöller; he was tried by the People’s Court and spent the next seven years in solitary confinement in Sachsenhausen and Dachau concentration camps as Hitler’s "personal prisoner," surviving the war to author the famous poem: "First they came for the Communists..."',
      },
    ],
    workbook_stages: [
      {
        stage: 1,
        dates: '1933–1939',
        title: 'The SS & Heinrich Himmler’s Terror Empire',
        spec_focus:
          'The SS; Heinrich Himmler; Totenkopf units; Dachau concentration camp; protective custody.',
        focus_clue:
          'How did Heinrich Himmler transform the SS into a vast machinery of racial terror?',
        para_ref: '[1.1–1.2]',
        bullets: [
          'Selecting black-uniformed guards by strict Aryan lineage',
          'Establishing Dachau concentration camp for political detainees',
          'Enforcing protective custody without legal trial or representation',
        ],
        writing_frame: {
          connectives:
            'A central instrument of terror was... &bull; Specifically, Heinrich Himmler expanded... &bull; This was used to control society because... &bull; As a consequence, ...',
        },
      },
      {
        stage: 2,
        dates: '1933–1939',
        title: 'The Gestapo & Informer Network',
        spec_focus:
          'The Gestapo; Reinhard Heydrich; telephone tapping; voluntary civilian denunciations.',
        focus_clue:
          'Why did voluntary civilian denunciations prove to be the most vital intelligence source?',
        para_ref: '[2.1–2.2]',
        bullets: [
          "Operating without uniforms under Reinhard Heydrich's command",
          'Interrogating suspects under protective custody arrest warrants',
          'Relying on civilian tip-offs from neighbours and postmen',
        ],
        writing_frame: {
          connectives:
            'The regime enforced surveillance through... &bull; For instance, the Gestapo operated... &bull; However, historians emphasize that... &bull; Therefore, ...',
        },
      },
      {
        stage: 3,
        dates: '1933–1934',
        title: 'Nazifying the Legal System & People’s Court',
        spec_focus: "Legal subversion; BNSDJ; People's Court (1934); Roland Freisler; show trials.",
        focus_clue: 'How did the abolition of independent courts undermine the rule of law?',
        para_ref: '[3.1–3.2]',
        bullets: [
          'Forcing judges to join National Socialist League of jurists',
          'Abolishing jury trials for serious political offences',
          'Roland Freisler screaming treason sentences in special courts',
        ],
        writing_frame: {
          connectives:
            "Justice was systematically perverted when... &bull; In particular, judges were required to... &bull; Furthermore, the creation of the People's Court meant... &bull; Consequently, ...",
        },
      },
      {
        stage: 4,
        dates: 'Jul 1933',
        title: 'The Catholic Concordat & Papal Resistance',
        spec_focus:
          'Reichskonkordat (1933); persecution of Catholic groups; Mit brennender Sorge (1937).',
        focus_clue: 'Why did the regime violate the Concordat and persecute Catholic youth groups?',
        para_ref: '[4.1–4.2]',
        bullets: [
          'Signing diplomatic treaty with Vatican representative Pacelli',
          'Banning Catholic Centre Party while guaranteeing religious schooling',
          'Pope Pius XI smuggling anti-Nazi encyclical into pulpits',
        ],
        writing_frame: {
          connectives:
            'Relations with religion deteriorated because... &bull; Although the 1933 Concordat promised... &bull; The regime soon broke these terms by... &bull; In response, ...',
        },
      },
      {
        stage: 5,
        dates: '1933–1937',
        title: 'The Reich Church & The Confessional Resistance',
        spec_focus:
          'German Christians; Ludwig Müller; Reich Church; Confessional Church; Martin Niemöller.',
        focus_clue: 'Why did the creation of the Reich Church spark theological rebellion?',
        para_ref: '[5.1–5.2]',
        bullets: [
          'Uniting twenty-eight Protestant churches under Ludwig Müller',
          'Placing swastika flags and Mein Kampf copies on altars',
          'Martin Niemöller leading Pastor Emergency League into arrest',
        ],
        writing_frame: {
          connectives:
            'Protestant resistance emerged when... &bull; For example, the pro-Nazi Reich Church attempted to... &bull; This provoked traditional pastors like Niemöller to... &bull; Ultimately, ...',
        },
      },
    ],
    causal_domino_spine: {
      title: 'KT3.2: The Police State (1933–1939)',
      subtitle: 'Terror Apparatus, Surveillance, Judicial Perversion, and Religious Suppression',
      stages: [
        {
          step: 1,
          date: '1933–1939',
          para_ref: '[1.1–1.2]',
          title: 'The SS & Heinrich Himmler’s Terror Empire',
          actor: 'Heinrich Himmler & SS-Totenkopf',
          tag: '🛡️ SS & CONCENTRATION CAMPS',
          trigger:
            'Himmler expanded the SS into an elite 240,000-man racial police force, opening Dachau in March 1933 to detain political prisoners indefinitely in protective custody.',
          desc: 'Himmler expanded the SS into an elite 240,000-man racial police force, opening Dachau in March 1933 to detain political prisoners indefinitely in protective custody.',
          connective:
            'Created a permanent concentration camp apparatus operated outside the jurisdiction of civil courts.',
          question:
            'How did Heinrich Himmler transform the SS into a vast machinery of racial terror?',
        },
        {
          step: 2,
          date: '1933–1939',
          para_ref: '[2.1–2.2]',
          title: 'The Gestapo & Informer Network',
          actor: 'Reinhard Heydrich & Civilian Informers',
          tag: '👁️ GESTAPO & DENUNCIATIONS',
          trigger:
            'The Gestapo operated with legal immunity, relying on voluntary denunciations from neighbors and colleagues to police a population of 70 million with only 32,000 agents.',
          desc: 'The Gestapo operated with legal immunity, relying on voluntary denunciations from neighbors and colleagues to police a population of 70 million with only 32,000 agents.',
          connective:
            'Induced an atmosphere of pervasive paranoia that paralyzed spontaneous political resistance.',
          question:
            'Why did voluntary civilian denunciations prove to be the most vital intelligence source?',
        },
        {
          step: 3,
          date: '1933–1934',
          para_ref: '[3.1–3.2]',
          title: 'Nazifying the Legal System & People’s Court',
          actor: 'Roland Freisler & Nazi Jurists',
          tag: '⚖️ PEOPLE’S COURT & JURIST PURGE',
          trigger:
            'Judges joined the Nazi Jurists League, swearing loyalty to Hitler, while the People’s Court was established in 1934 to execute political dissidents without juries.',
          desc: 'Judges joined the Nazi Jurists League, swearing loyalty to Hitler, while the People’s Court was established in 1934 to execute political dissidents without juries.',
          connective:
            'Subverted the rule of law into an instrument of state terror and judicial execution.',
          question: 'How did the abolition of independent courts undermine the rule of law?',
        },
        {
          step: 4,
          date: 'Jul 1933',
          para_ref: '[4.1–4.2]',
          title: 'The Catholic Concordat & Papal Resistance',
          actor: 'Pope Pius XI & Franz von Papen',
          tag: '⛪ CONCORDAT & MIT BRENNENDER SORGE',
          trigger:
            'Hitler signed the Concordat with the Vatican, then breached it by harassing youth groups, prompting Pope Pius XI’s 1937 encyclical Mit brennender Sorge.',
          desc: 'Hitler signed the Concordat with the Vatican, then breached it by harassing youth groups, prompting Pope Pius XI’s 1937 encyclical Mit brennender Sorge.',
          connective:
            'Provoked moral resistance from Catholic pulpits while triggering retaliatory Gestapo arrests of outspoken clergy.',
          question: 'Why did the regime violate the Concordat and persecute Catholic youth groups?',
        },
        {
          step: 5,
          date: '1933–1937',
          para_ref: '[5.1–5.2]',
          title: 'The Reich Church & The Confessional Resistance',
          actor: 'Ludwig Müller & Martin Niemöller',
          tag: '📖 CONFESSIONAL CHURCH REVOLT',
          trigger:
            'The pro-Nazi Reich Church Nazified Protestantism, provoking Pastor Martin Niemöller to establish the Confessional Church before being imprisoned at Sachsenhausen.',
          desc: 'The pro-Nazi Reich Church Nazified Protestantism, provoking Pastor Martin Niemöller to establish the Confessional Church before being imprisoned at Sachsenhausen.',
          connective:
            'Demonstrated principled theological defiance, exposing the limits of Nazi ideological conformity among devout Christians.',
          question: 'Why did the creation of the Reich Church spark theological rebellion?',
        },
      ],
    },
  },

  // --------------------------------------------------------------------------
  // LESSON 3.3: CONTROLLING AND INFLUENCING ATTITUDES
  // --------------------------------------------------------------------------
  lesson_3_3: {
    teacher_notes: {
      primer:
        'This enquiry examines the sophisticated propaganda, censorship, and cultural control apparatus engineered by Dr. Joseph Goebbels to manufacture total ideological conformity across Germany between 1933 and 1939. Students analyze the establishment of the Reich Chamber of Culture and the symbolic book burnings of May 1933, the state monopoly over print and broadcasting through the affordable Volksempfänger (People’s Receiver), the theatrical mass spectacle of the Nuremberg Rallies and the "Cathedral of Light," the international propaganda triumph of the 1936 Berlin Olympic Games, and the aesthetic purging of modernist culture through the 1937 Degenerate Art exhibition.',
      objectives: [
        {
          objective:
            'Explain how Joseph Goebbels used the Reich Chamber of Culture and book burnings to enforce intellectual censorship in 1933.',
          primer:
            'Direct students to paragraphs [1.1]–[1.2]. Detail the founding of the Ministry of Public Enlightenment and Propaganda, the purging of Jewish and anti-fascist writers, and the torching of 20,000 books in Berlin’s Opernplatz on 10 May 1933.',
          question:
            'Why were public book burnings considered an essential symbolic ritual by Nazi student organizations in May 1933?',
        },
        {
          objective:
            'Analyse how mass-produced radios (Volksempfänger) and daily press conferences transformed homes and workplaces into propaganda echo chambers.',
          primer:
            'Direct students to paragraphs [2.1]–[2.2]. Explain that the cheap 35-mark Volksempfänger had short-range reception preventing foreign broadcasts, while the 1933 Editorial Law made journalists civil servants accountable to Goebbels.',
          question:
            'How did the Volksempfänger ensure that Hitler’s speeches penetrated directly into the private sphere of German family homes?',
        },
        {
          objective:
            'Assess how choreographed mass spectacles—such as the annual Nuremberg Rallies—cultivated the Führer myth and overwhelmed individual critical thought.',
          primer:
            'Direct students to paragraphs [3.1]–[3.2] and Source A (Nuremberg Rally). Detail Albert Speer’s "Cathedral of Light" using 152 anti-aircraft searchlights, mass choirs, and synchronized martial marching at the Zeppelin Field.',
          question:
            'How did Albert Speer’s architectural staging at Nuremberg create an impression of religious awe and absolute national unity?',
        },
        {
          objective:
            'Examine why the August 1936 Berlin Olympic Games was staged as a global propaganda showcase of Nazi prosperity and efficiency.',
          primer:
            'Direct students to paragraphs [4.1]–[4.2]. Focus on the temporary removal of anti-Semitic signs, the construction of the 100,000-seat Olympiastadion, Leni Riefenstahl’s Olympia film, and Jesse Owens winning four gold medals.',
          question:
            'How did the Nazi regime temporarily sanitize its public image during the 1936 Berlin Olympics to deceive international visitors?',
        },
        {
          objective:
            'Evaluate the cultural purge of modern artistic expression, contrasting "Degenerate Art" with Aryan neoclassical realism in 1937.',
          primer:
            'Direct students to paragraphs [5.1]–[5.2]. Contrast the Munich Degenerate Art (Entartete Kunst) exhibition—mocking Dix, Grosz, and Picasso—with the Great German Art Exhibition celebrating muscular farmers, warriors, and fertile mothers.',
          question:
            'Why did the Nazi leadership regard modern avant-garde art and jazz music as biological and cultural threats to the German Volk?',
        },
      ],
      source_context: {
        'Source A':
          'Source A: The Nuremberg Rally and the Cathedral of Light (1936). Archival photograph showing hundreds of thousands of uniform-clad party members assembled at the Zeppelin Field during the annual Nuremberg Party Rally, illuminated by Albert Speer’s soaring Cathedral of Light composed of 152 anti-aircraft searchlights shining into the night sky. Hinge Question: How does the monumental scale and theatrical lighting in Source A illustrate why mass rallies were effective in overwhelming individual critical judgment?',
      },
    },
    narrative_blocks: [
      {
        act: 1,
        title: 'Act 1: Goebbels & The Reich Chamber of Culture (Mar–May 1933)',
        theme_heading: 'Act 1: Goebbels & The Reich Chamber of Culture (Mar–May 1933)',
        text: '<span class="para-ref">[1.1]</span> In March 1933, Hitler established the <strong>Ministry of Public Enlightenment and Propaganda</strong>, appointing the thirty-five-year-old Dr. Joseph Goebbels as its minister. Goebbels declared his mission: "To work on people until they have surrendered to us... so that they cannot escape us." In September 1933, the regime established the <strong>Reich Chamber of Culture</strong> (<em>Reichskulturkammer</em>), with seven distinct chambers regulating the press, radio, cinema, theatre, music, fine arts, and literature. Every creative artist, writer, musician, and journalist had to register with their respective chamber; Jews, communists, and critics of the regime were refused membership, which barred them from publishing, performing, or earning a living.<br><br><span class="para-ref">[1.2]</span> The violent cultural purge began almost immediately. On the night of <strong>10 May 1933</strong>, Nazi student associations, accompanied by SA stormtroopers and brass bands, staged massive public <strong>book burnings</strong> in university squares across Germany. In Berlin’s Opernplatz, opposite the university, students hurled over 20,000 un-German and "Jewish-Bolshevik" books onto a giant bonfire, while Goebbels addressed the crowd, shouting that "the era of Jewish intellectualism is dead." Works by Albert Einstein, Sigmund Freud, Karl Marx, Thomas Mann, Heinrich Heine, and Helen Keller were reduced to ashes, signaling the total intellectual regimentation of the German nation.',
      },
      {
        act: 2,
        title: 'Act 2: Radio (Volksempfänger) & The Daily Press (1933–1939)',
        theme_heading: 'Act 2: Radio (Volksempfänger) & The Daily Press (1933–1939)',
        text: '<span class="para-ref">[2.1]</span> Goebbels regarded radio as the ultimate weapon of modern propaganda, stating: "What the press was to the nineteenth century, radio is to the twentieth." To ensure that every German citizen could hear Hitler’s speeches, the Propaganda Ministry ordered manufacturers to produce the <strong><em>Volksempfänger 301</em></strong> (People’s Receiver). Priced at an affordable thirty-five marks—roughly one week’s average wage—and available on easy hire-purchase terms, it was the cheapest radio in the world. Crucially, the Volksempfänger had a limited short-range receiver designed to prevent citizens from tuning into foreign broadcasts like the BBC. Between 1932 and 1939, household radio ownership in Germany soared from 4.3 million to over twelve million (over seventy percent of households), representing the highest density of radio ownership in Europe.<br><br><span class="para-ref">[2.2]</span> Communal listening was compulsory. Whenever Hitler or Goebbels delivered a major broadcast, factory sirens sounded: work ceased, workers gathered around workshop loudspeakers, and wardens checked that cafes and public squares had their speakers turned on. The press was subjected to identical regimentation. Under the <strong>Editor’s Law of October 1933</strong>, journalists became civil servants who could be dismissed or imprisoned for printing anything damaging to the Reich. Every morning at 11:00 AM, editors attended a mandatory press conference at the Propaganda Ministry in Berlin, where Goebbels’ officials dictated the exact front-page headlines, editorial angles, and photographs to be printed that evening, shutting down independent publications and reducing the German press to uniform state propaganda.',
      },
      {
        act: 3,
        title: 'Act 3: Mass Rallies & The Cult of the Führer (1933–1938)',
        theme_heading: 'Act 3: Mass Rallies & The Cult of the Führer (1933–1938)',
        source: {
          id: 'source_a_nuremberg_rally',
          letter: 'A',
          title: 'Source A: The Nuremberg Rally and the Cathedral of Light (1936)',
          src: '/images/nuremberg_rally.jpg',
          source: '/images/nuremberg_rally.jpg',
          image: '/images/nuremberg_rally.jpg',
          caption:
            'Hundreds of thousands assembled at the Zeppelin Field during the Nuremberg Rally, illuminated by Albert Speer’s dramatic "Cathedral of Light" searchlights.',
          desc: 'Archival photograph of the Nuremberg Party Rally at night.',
          provenance:
            'Archival photograph of the Nuremberg Rally, September 1936. German Federal Archives (Bundesarchiv Bild 183-1987-0703-507).',
          citation: 'Bundesarchiv Bild 183-1987-0703-507, Nuremberg Rally, 1936.',
          question:
            'How does the monumental scale and theatrical lighting in Source A illustrate why mass rallies were effective in overwhelming individual critical judgment?',
          hinge_question:
            'How does the monumental scale and theatrical lighting in Source A illustrate why mass rallies were effective in overwhelming individual critical judgment?',
          source_context:
            'Archival photograph showing hundreds of thousands of uniform-clad party members assembled at the Zeppelin Field during the annual Nuremberg Party Rally, illuminated by Albert Speer’s soaring Cathedral of Light composed of 152 anti-aircraft searchlights shining into the night sky. Hinge Question: How does the monumental scale and theatrical lighting in Source A illustrate why mass rallies were effective in overwhelming individual critical judgment?',
          context:
            'Archival photograph showing the Nuremberg Rally at night, illuminated by searchlights in 1936.',
        },
        text: '<span class="para-ref">[3.1]</span> Goebbels and Hitler understood that collective psychological excitement could dissolve individual critical judgment. The pinnacle of mass indoctrination was the annual <strong>Nuremberg Party Rallies</strong> (<em>Reichsparteitag</em>), held every September for an entire week in the medieval city of Nuremberg (<span class="archival-meta-tag">Source A</span>). Hundreds of thousands of SA men, Hitler Youth, and ordinary citizens traveled on subsidized trains to camp in sprawling tent cities, assembling on the massive parade grounds of the Zeppelin Field designed by Hitler’s chief architect, <strong>Albert Speer</strong>.<br><br><span class="para-ref">[3.2]</span> The rallies were breathtaking masterpieces of political theatre. Speer ringed the parade grounds with <strong>152 anti-aircraft searchlights</strong> pointed straight up into the night sky at intervals of forty feet. Their beams met at a height of twenty-five thousand feet, creating the illusion of a vast, shining luminous temple that British Ambassador Sir Nevile Henderson described as a "Cathedral of Light." In the darkness beneath, hundreds of thousands of men stood in rigid geometric blocks holding glowing torches, while massive blood-red swastika banners hung seventy feet high. Hitler was deified through cinematic lighting: entering along a mile-long central aisle to Wagnerian brass music, he delivered roaring speeches celebrating the rebirth of the German racial soul, capturing the collective adulation of an entire nation.',
      },
      {
        act: 4,
        title: 'Act 4: The Berlin Olympic Games Showcase (Aug 1936)',
        theme_heading: 'Act 4: The Berlin Olympic Games Showcase (Aug 1936)',
        text: '<span class="para-ref">[4.1]</span> In August 1936, the regime secured its greatest international public relations triumph by hosting the <strong>XI Summer Olympic Games in Berlin</strong>. Initially, Hitler had opposed hosting the Games, dismissing them as an invention of "Jews and Freemasons." However, Goebbels persuaded him that the Olympics provided an unprecedented opportunity to showcase the peaceful revival, economic efficiency, and physical superiority of the new Germany to the world. A gigantic, modern sports complex was constructed, centered on the neoclassical <strong>100,000-seat Olympiastadion</strong> decorated with massive swastika banners and classical Aryan statues sculpted by Arno Breker.<br><br><span class="para-ref">[4.2]</span> To prevent an international boycott and deceive foreign visitors, the regime engaged in calculated deception. Anti-Semitic street signs declaring "Jews not wanted here" were quietly removed from Berlin hotels, restaurants, and parks; the violently anti-Semitic newspaper <em>Der Stürmer</em> was taken off newsstands; and a half-Jewish fencer, Helene Mayer, was cynically included in the German squad. The Games were filmed by pioneering director <strong>Leni Riefenstahl</strong>, who utilized groundbreaking camera tracks and underwater lenses to create the documentary epic <em>Olympia</em>. Germany topped the medal table with eighty-nine medals (thirty-three gold), which the domestic press claimed proved Aryan racial superiority—even as African-American track star <strong>Jesse Owens</strong> shattered Nazi racial theories by winning four gold medals in sprinting and long jump, becoming the darling of the German crowd.',
      },
      {
        act: 5,
        title: 'Act 5: Purging Culture: Degenerate Art vs Aryan Realism (1937)',
        theme_heading: 'Act 5: Purging Culture: Degenerate Art vs Aryan Realism (1937)',
        text: '<span class="para-ref">[5.1]</span> The Nazi war on culture reached its ideological climax in July 1937 in Munich. Hitler and Goebbels organized two contrasting art exhibitions held across the park from each other. In the newly opened House of German Art, Hitler unveiled the <strong>Great German Art Exhibition</strong>, showcasing official Nazi-approved art: massive classical bronzes of muscular Aryan warriors, realistic pastoral oil paintings of blonde peasant women toiling in wheat fields, and heroic depictions of German soldiers. Hitler declared that true art must be wholesome, eternal, and accessible to the racial community, free from any intellectual experimentation.<br><br><span class="para-ref">[5.2]</span> Meanwhile, in the cramped, gloomy rooms of the Institute of Archaeology, the regime staged the notorious <strong>"Degenerate Art"</strong> (<em>Entartete Kunst</em>) exhibition. Over 650 confiscated modern masterpieces by legendary artists—including Otto Dix, George Grosz, Paul Klee, Wassily Kandinsky, Ernst Kirchner, and Pablo Picasso—were displayed deliberately hung askew on crooked walls, surrounded by graffiti mocking their work as "insane," "biological filth," and "cultural Bolshevism." Entry was free (while the Great German Art Exhibition charged admission), and visitors were encouraged to mock the works. Ironically, over two million people queued around the block to view the Degenerate Art exhibition—three times the attendance of the official Aryan exhibition. Modern music was similarly purged: American jazz and swing music were outlawed as "Negro music" (<em>Negermusik</em>), replaced on the airwaves by German classical composers like Richard Wagner, Ludwig van Beethoven, and traditional Bavarian folk songs.',
      },
    ],
    workbook_stages: [
      {
        stage: 1,
        dates: 'Mar–May 1933',
        title: 'Goebbels & The Reich Chamber of Culture',
        spec_focus: 'Goebbels; Ministry of Propaganda; Reich Chamber of Culture; book burnings.',
        focus_clue: 'How did the Ministry enforce strict ideological conformity across all media?',
        para_ref: '[1.1–1.2]',
        bullets: [
          'Creating Propaganda Ministry with seven specialized divisions',
          'Torching twenty thousand un-German books in university squares',
          'Requiring official licence for every professional journalist',
        ],
        writing_frame: {
          connectives:
            'A crucial method of control was... &bull; Specifically, Goebbels established... &bull; This ensured ideological conformity because... &bull; Consequently, ...',
        },
      },
      {
        stage: 2,
        dates: '1933–1939',
        title: 'Radio (Volksempfänger) & The Daily Press',
        spec_focus:
          "Volksempfänger 301; short-range radio; communal listening; Editor's Law (1933).",
        focus_clue: "Why was the affordable People's Receiver the most powerful propaganda tool?",
        para_ref: '[2.1–2.2]',
        bullets: [
          'Mass-producing cheap thirty-five-mark household receivers',
          'Broadcasting speeches through loudspeakers on factory floors',
          'Dictating daily front-page headlines at morning press conferences',
        ],
        writing_frame: {
          connectives:
            'Mass communication was dominated by... &bull; For instance, the mass production of... &bull; This penetrated daily life because... &bull; As a result, ...',
        },
      },
      {
        stage: 3,
        dates: '1933–1938',
        title: 'Mass Rallies & The Cult of the Führer',
        spec_focus: 'Nuremberg Rallies; Albert Speer; Cathedral of Light; mass psychology.',
        focus_clue: 'How did choreographed mass rallies overwhelm individual critical thought?',
        para_ref: '[3.1–3.2]',
        bullets: [
          'Assembling hundreds of thousands at Zeppelin field in Nuremberg',
          'Lighting sky with hundred and fifty anti-aircraft searchlights',
          'Staging theatrical torchlight parades to celebrate national unity',
        ],
        writing_frame: {
          connectives:
            'Another powerful technique was... &bull; In particular, the annual Nuremberg rallies used... &bull; This created a powerful impact because... &bull; Furthermore, ...',
        },
      },
      {
        stage: 4,
        dates: 'Aug 1936',
        title: 'The Berlin Olympic Games Showcase',
        spec_focus:
          '1936 Berlin Olympics; Olympiastadion; removal of anti-Semitic signs; Jesse Owens.',
        focus_clue:
          'Why were the 1936 Olympics staged as an international showcase of Nazi success?',
        para_ref: '[4.1–4.2]',
        bullets: [
          'Building hundred-thousand-seat stadium decorated with swastikas',
          'Temporarily removing anti-Jewish street signs to deceive visitors',
          'Jesse Owens winning four sprinting gold medals on track',
        ],
        writing_frame: {
          connectives:
            'International prestige was sought through... &bull; For example, the 1936 Berlin Olympics were... &bull; The regime used this event to... &bull; In addition, ...',
        },
      },
      {
        stage: 5,
        dates: '1937',
        title: 'Purging Culture: Degenerate Art vs Aryan Realism',
        spec_focus: 'House of German Art; Degenerate Art exhibition (1937); ban on jazz music.',
        focus_clue: 'Why did the regime denounce modern artistic expression as degenerate?',
        para_ref: '[5.1–5.2]',
        bullets: [
          'Displaying modern paintings on crooked walls in Munich',
          'Banning jazz music and African-American syncopated rhythms',
          'Commissioning massive classical statues showing muscular Aryan bodies',
        ],
        writing_frame: {
          connectives:
            "Finally, cultural policy enforced racial doctrine by... &bull; Specifically, the 1937 exhibitions contrasted... &bull; This demonstrated the regime's belief that... &bull; Overall, ...",
        },
      },
    ],
    causal_domino_spine: {
      title: 'KT3.3: Controlling and Influencing Attitudes (1933–1939)',
      subtitle: 'Propaganda Ministry, Radio, Mass Rallies, Olympics, and Cultural Purging',
      stages: [
        {
          step: 1,
          date: 'Mar–May 1933',
          para_ref: '[1.1–1.2]',
          title: 'Goebbels & The Reich Chamber of Culture',
          actor: 'Dr. Joseph Goebbels & Nazi Students',
          tag: '🔥 BOOK BURNING & REICHSKULTURKAMMER',
          trigger:
            'Goebbels created the Propaganda Ministry and Reich Chamber of Culture, while students torched 20,000 un-German books in Berlin’s Opernplatz.',
          desc: 'Goebbels created the Propaganda Ministry and Reich Chamber of Culture, while students torched 20,000 un-German books in Berlin’s Opernplatz.',
          connective:
            'Purged intellectual dissidents, establishing total state licensing over all literature, press, and arts.',
          question: 'How did the Ministry enforce strict ideological conformity across all media?',
        },
        {
          step: 2,
          date: '1933–1939',
          para_ref: '[2.1–2.2]',
          title: 'Radio (Volksempfänger) & The Daily Press',
          actor: '70% German Households & German Press',
          tag: '📻 PEOPLE’S RECEIVER & PRESS DICTATION',
          trigger:
            'The 35-mark Volksempfänger reached 70% of households with short-range reception, while daily morning press conferences dictated headlines.',
          desc: 'The 35-mark Volksempfänger reached 70% of households with short-range reception, while daily morning press conferences dictated headlines.',
          connective:
            'Brought Hitler’s voice directly into private homes and eliminated independent investigative journalism.',
          question: "Why was the affordable People's Receiver the most powerful propaganda tool?",
        },
        {
          step: 3,
          date: '1933–1938',
          para_ref: '[3.1–3.2]',
          title: 'Mass Rallies & The Cult of the Führer',
          actor: 'Albert Speer & Hundreds of Thousands',
          tag: '💡 CATHEDRAL OF LIGHT & NUREMBERG',
          trigger:
            'Albert Speer staged the annual Nuremberg Rallies using 152 anti-aircraft searchlights to project the "Cathedral of Light" above hundreds of thousands.',
          desc: 'Albert Speer staged the annual Nuremberg Rallies using 152 anti-aircraft searchlights to project the "Cathedral of Light" above hundreds of thousands.',
          connective:
            'Manufactured religious adulation for Hitler and created an overwhelming spectacle of national unity.',
          question: 'How did choreographed mass rallies overwhelm individual critical thought?',
        },
        {
          step: 4,
          date: 'Aug 1936',
          para_ref: '[4.1–4.2]',
          title: 'The Berlin Olympic Games Showcase',
          actor: 'Leni Riefenstahl & Jesse Owens',
          tag: '🏅 1936 BERLIN OLYMPICS',
          trigger:
            'The regime sanitized Berlin by hiding anti-Semitic signs to present a modern, prosperous face to the world at the 100,000-seat Olympiastadion.',
          desc: 'The regime sanitized Berlin by hiding anti-Semitic signs to present a modern, prosperous face to the world at the 100,000-seat Olympiastadion.',
          connective:
            'Gained international prestige and deceived foreign visitors, despite Jesse Owens challenging Aryan racial superiority.',
          question:
            'Why were the 1936 Olympics staged as an international showcase of Nazi success?',
        },
        {
          step: 5,
          date: '1937',
          para_ref: '[5.1–5.2]',
          title: 'Purging Culture: Degenerate Art vs Aryan Realism',
          actor: 'Munich Art Curators & Banned Modernists',
          tag: '🎨 ENTARTETE KUNST & ARYAN ART',
          trigger:
            'The regime staged the Degenerate Art exhibition to mock modernists like Dix and Grosz, outlawing jazz while promoting heroic Aryan pastoral realism.',
          desc: 'The regime staged the Degenerate Art exhibition to mock modernists like Dix and Grosz, outlawing jazz while promoting heroic Aryan pastoral realism.',
          connective:
            'Enforced aesthetic conformity, stripping German culture of avant-garde creativity and international influences.',
          question: 'Why did the regime denounce modern artistic expression as degenerate?',
        },
      ],
    },
  },

  // --------------------------------------------------------------------------
  // LESSON 3.4: OPPOSITION, RESISTANCE AND CONFORMITY
  // --------------------------------------------------------------------------
  lesson_3_4: {
    teacher_notes: {
      primer:
        'This enquiry examines the complex spectrum between passive conformity, everyday dissent, and active political resistance inside Nazi Germany between 1933 and 1939. Students analyze the reasons why the majority of ordinary Germans conformed (economic recovery, fear of the Gestapo, and foreign policy triumphs), the clandestine underground resistance of outlawed socialist and communist workers (SPD Sopade and KPD cells), the cultural and physical rebellion of working-class youth groups (Edelweiss Pirates) and middle-class jazz fans (Swing Youth), and the courageous moral opposition of Christian leaders including Martin Niemöller and Bishop Clemens August Graf von Galen.',
      objectives: [
        {
          objective:
            'Explain why the majority of ordinary German citizens conformed to the Nazi regime rather than actively resisting.',
          primer:
            'Direct students to paragraphs [1.1]–[1.2]. Balance the terror of Gestapo surveillance and concentration camps with genuine popular support driven by falling unemployment, autobahn construction, and foreign policy triumphs overturning Versailles.',
          question:
            'Why did widespread economic recovery and national pride make active political resistance extremely rare among ordinary citizens?',
        },
        {
          objective:
            'Analyse the methods, dangers, and limitations of underground left-wing workers’ resistance (KPD and SPD).',
          primer:
            'Direct students to paragraphs [2.1]–[2.2]. Examine clandestine anti-fascist leaflets, industrial sabotage, absenteeism, and intelligence smuggling by networks like the Red Orchestra (Rote Kapelle).',
          question:
            'Why was underground socialist and communist resistance unable to mount a serious threat to Hitler’s regime?',
        },
        {
          objective:
            'Assess the youth rebellion of the Edelweiss Pirates against regimentation and compulsory Hitler Youth service.',
          primer:
            'Direct students to paragraphs [3.1]–[3.2] and Source A (Edelweiss Pirates graffiti). Focus on their working-class subculture: camping in nature, wearing check shirts and metal flower badges, writing anti-Nazi slogans, and ambushing Hitler Youth patrols.',
          question:
            'How did the Edelweiss Pirates reject the militarized conformity demanded by the Hitler Youth movement?',
        },
        {
          objective:
            'Examine how the Swing Youth used American jazz and Anglo-American fashion as cultural dissent against Nazi totalitarianism.',
          primer:
            'Direct students to paragraphs [4.1]–[4.2]. Contrast working-class physical rebellion with middle-class urban defiance: playing banned African-American jazz, jitterbug dancing in basements, and wearing British tweed jackets.',
          question:
            'Why did the Gestapo consider listening to American jazz music a dangerous act of political subversion?',
        },
        {
          objective:
            'Evaluate the moral and public resistance of religious leaders, specifically Martin Niemöller and Bishop Clemens August Graf von Galen.',
          primer:
            'Direct students to paragraphs [5.1]–[5.2] and Source B (Bishop Galen). Explain how Galen’s outspoken sermons against the Gestapo and the T4 euthanasia programme forced the regime to temporarily halt the killings due to fear of popular Catholic unrest.',
          question:
            'Why was Bishop von Galen able to openly criticize the regime and survive when political opponents were executed?',
        },
      ],
      source_context: {
        'Source A':
          'Source A: Edelweiss Pirates Resistance Slogan on a Wall (c. 1939). Archival photograph of anti-Nazi graffiti chalked by working-class youth rebels in the Rhineland: "Eternal Watch Against the Hitler Youth / Edelweiss Pirates." Hinge Question: How does Source A illustrate how rebellious German teenagers used simple acts of vandalism to reject totalitarian state regimentation?',
        'Source B':
          'Source B: Clemens August Graf von Galen (1878–1946), Bishop of Münster. Archival portrait photograph of Bishop von Galen, the "Lion of Münster," whose courageous public sermons in 1941 denounced the Gestapo terror and condemned the secret Aktion T4 disabled euthanasia programme. Hinge Question: Why did the Nazi leadership hesitate to execute prominent religious leaders like Bishop Galen depicted in Source B despite their outspoken public condemnation of state atrocities?',
      },
    },
    narrative_blocks: [
      {
        act: 1,
        title: 'Act 1: The Reality of Conformity & Everyday Grumbling (1933–1939)',
        theme_heading: 'Act 1: The Reality of Conformity & Everyday Grumbling (1933–1939)',
        text: '<span class="para-ref">[1.1]</span> Between 1933 and 1939, open active opposition to the Nazi regime was remarkably rare. The vast majority of the German population conformed to the dictatorship. For millions of citizens, compliance was not merely driven by terror of the Gestapo, but by genuine approval of the regime’s tangible achievements. Hitler had restored public order, slashed unemployment from six million in 1932 to under 300,000 by 1939, built modern motorways (Autobahnen), expanded state welfare through <em>Strength Through Joy</em>, and successfully overturned the humiliating terms of Versailles by remilitarizing the Rhineland and uniting with Austria (Anschluss) without firing a single shot. For ordinary Germans, living standards and national pride had dramatically improved.<br><br><span class="para-ref">[1.2]</span> Nevertheless, historians like Ian Kershaw have demonstrated that conformity was often accompanied by widespread private dissatisfaction, known as <strong>everyday grumbling</strong> (<em>Meckern</em>). Citizens frequently complained behind closed doors about rising food prices, meat shortages, compulsory donations to the Winter Relief Fund (<em>Winterhilfswerk</em>), and the corrupt, arrogant behavior of local Nazi officials ("little Hitlers"). To survive, Germans developed the art of "living in two worlds": delivering the compulsory "Heil Hitler" street salute and hanging swastika flags from windows on official holidays to avoid suspicion, while sharing political jokes in the privacy of their kitchens.',
      },
      {
        act: 2,
        title: 'Act 2: Left-Wing Underground Workers’ Resistance (1933–1938)',
        theme_heading: 'Act 2: Left-Wing Underground Workers’ Resistance (1933–1938)',
        text: '<span class="para-ref">[2.1]</span> The most organized political resistance came from the outlawed left-wing parties: the Social Democrats (SPD) and Communists (KPD). Having had their assets seized and their leaders imprisoned in early 1933, both parties operated in conditions of extreme peril. The SPD leadership in exile (<strong>Sopade</strong>), based first in Prague and later in Paris, maintained clandestine networks inside Germany. Brave couriers smuggled microscopic copies of the illegal socialist newspaper <em>Vorwärts</em>—disguised inside packets of tea or shampoo bottles—to distribute across factory floors, while compiling secret reports on the true mood of the German working class.<br><br><span class="para-ref">[2.2]</span> The Communist Party operated an even more aggressive underground network. Small communist cells (consisting of three to five members to prevent Gestapo infiltration) printed illegal anti-fascist pamphlets in hidden basements, painted hammers and sickles on railway bridges at night, and organized industrial sabotage: deliberately slowing down factory assembly lines, damaging munitions machinery, and calling "go-slows" to disrupt Hitler’s rearmament drive. In Berlin, the <strong>Red Orchestra</strong> (<em>Rote Kapelle</em>), led by Arvid Harnack and Harro Schulze-Boysen, infiltrated state ministries and passed vital industrial and military intelligence to the Soviet Union. However, left-wing resistance was crippled by two fatal weaknesses: deep ideological hatred between communists and socialists prevented a united front, while ruthless Gestapo infiltration resulted in mass arrests and execution.',
      },
      {
        act: 3,
        title: 'Act 3: Youth Rebellion: The Edelweiss Pirates (1936–1939)',
        theme_heading: 'Act 3: Youth Rebellion: The Edelweiss Pirates (1936–1939)',
        source: {
          id: 'source_a_edelweiss_pirates',
          letter: 'A',
          title: 'Source A: Edelweiss Pirates Resistance Graffiti (c. 1939)',
          src: '/images/edelweiss_pirates_graffiti.jpg',
          source: '/images/edelweiss_pirates_graffiti.jpg',
          image: '/images/edelweiss_pirates_graffiti.jpg',
          caption:
            'Anti-Nazi graffiti chalked by working-class youth rebels in the Rhineland: "Eternal Watch Against the Hitler Youth / Edelweiss Pirates."',
          desc: 'Archival photograph of Edelweiss Pirates resistance graffiti on an urban brick wall.',
          provenance:
            'Gestapo photographic evidence file, Cologne, c. 1939. German Federal Archives (Bundesarchiv Bild 146-1985-067-12).',
          citation: 'Bundesarchiv Bild 146-1985-067-12, Edelweiss Pirates Graffiti.',
          question:
            'How does Source A illustrate how rebellious German teenagers used simple acts of vandalism to reject totalitarian state regimentation?',
          hinge_question:
            'How does Source A illustrate how rebellious German teenagers used simple acts of vandalism to reject totalitarian state regimentation?',
          source_context:
            'Archival photograph of anti-Nazi graffiti chalked by working-class youth rebels in the Rhineland: "Eternal Watch Against the Hitler Youth / Edelweiss Pirates." Hinge Question: How does Source A illustrate how rebellious German teenagers used simple acts of vandalism to reject totalitarian state regimentation?',
          context:
            'Archival photograph of anti-Nazi graffiti chalked by youth rebels in the Rhineland, c. 1939.',
        },
        text: '<span class="para-ref">[3.1]</span> Following the 1936 decree making Hitler Youth service compulsory, a distinct subculture of youth rebellion emerged. In the industrial cities of western Germany—such as Cologne, Düsseldorf, and Essen—working-class teenagers aged fourteen to seventeen formed loose rebellious gangs known collectively as the <strong>Edelweiss Pirates</strong> (<em>Edelweißpiraten</em>). Rejecting the rigid military drills, boring ideological lectures, and weekend route marches of the Hitler Youth, they sought freedom and companionship. They signaled their defiance through their appearance: wearing checkered shirts, dark short trousers, white socks, and pinning a small metal <strong>edelweiss flower badge</strong> to their lapels.<br><br><span class="para-ref">[3.2]</span> The Pirates met on street corners and spent weekends hiking and camping in the countryside, singing satirical parodies of Hitler Youth marching songs around campfires and socializing freely with girls. However, their defiance escalated into active resistance (<span class="archival-meta-tag">Source A</span>). They daubed anti-Nazi graffiti on railway walls, slashed the tires of military vehicles, dropped propaganda leaflets from Allied planes into letterboxes, and engaged in violent street ambushes, beating up Hitler Youth patrols in dark alleys with clubs and brass knuckles. The regime responded ruthlessly: the Gestapo arrested hundreds, shaved their heads, and sent ringleaders to juvenile reformatories. In November 1944, the Gestapo publicly hanged thirteen young Edelweiss Pirates in the center of Cologne without trial.',
      },
      {
        act: 4,
        title: 'Act 4: Cultural Dissent: The Swing Youth (1937–1939)',
        theme_heading: 'Act 4: Cultural Dissent: The Swing Youth (1937–1939)',
        text: '<span class="para-ref">[4.1]</span> While the Edelweiss Pirates were working-class street rebels, a completely different form of cultural rebellion emerged among affluent, middle-class urban teenagers: the <strong>Swing Youth</strong> (<em>Swingjugend</em>). Concentrated in wealthy commercial centers like Hamburg, Frankfurt, and Berlin, these young men and women passionately rejected the militaristic, puritanical lifestyle demanded by the Third Reich. Instead, they were obsessed with British and American popular culture: listening to forbidden American big-band jazz musicians like Benny Goodman, Duke Ellington, and Louis Armstrong.<br><br><span class="para-ref">[4.2]</span> The Swing Youth expressed their dissent through flamboyant fashion and dance. Boys grew their hair long and untidy, wore oversized British tweed jackets, carried umbrellas, and wore English ties; girls wore short pleated skirts, painted their fingernails bright red, and applied heavy makeup. They gathered in underground clubs, private apartments, and hotel dance halls to drink alcohol, smoke English cigarettes, and dance wild, uninhibited American jitterbug and swing steps. To Heinrich Himmler and the SS, this was not merely youthful eccentricity; it was racial treason and biological degeneration. In 1942, Himmler ordered the Gestapo to crack down on the Swing Youth, decreeing that ringleaders should be sent to concentration camps for two to three years of hard labor and beatings to "cure them of this foreign filth."',
      },
      {
        act: 5,
        title: 'Act 5: Religious Resistance: Niemöller & Galen (1937–1939)',
        theme_heading: 'Act 5: Religious Resistance: Niemöller & Galen (1937–1939)',
        source: {
          id: 'source_b_bishop_galen',
          letter: 'B',
          title: 'Source B: Clemens August Graf von Galen, Bishop of Münster',
          src: '/images/galen_portrait.jpg',
          source: '/images/galen_portrait.jpg',
          image: '/images/galen_portrait.jpg',
          caption:
            'Clemens August Graf von Galen, Catholic Bishop of Münster, whose courageous sermons denounced Gestapo terror and euthanasia killings.',
          desc: 'Archival photographic portrait of Bishop Clemens August Graf von Galen.',
          provenance:
            'Archival portrait photograph of Bishop von Galen, Münster, c. 1938. German Federal Archives (Bundesarchiv Bild 146-1979-057-04).',
          citation: 'Bundesarchiv Bild 146-1979-057-04, Bishop von Galen.',
          question:
            'Why did the Nazi leadership hesitate to execute prominent religious leaders like Bishop Galen depicted in Source B despite their outspoken public condemnation of state atrocities?',
          hinge_question:
            'Why did the Nazi leadership hesitate to execute prominent religious leaders like Bishop Galen depicted in Source B despite their outspoken public condemnation of state atrocities?',
          source_context:
            'Archival portrait photograph of Bishop von Galen, the "Lion of Münster," whose courageous public sermons in 1941 denounced the Gestapo terror and condemned the secret Aktion T4 disabled euthanasia programme. Hinge Question: Why did the Nazi leadership hesitate to execute prominent religious leaders like Bishop Galen depicted in Source B despite their outspoken public condemnation of state atrocities?',
          context:
            'Archival portrait photograph of Bishop Clemens August Graf von Galen, Münster, c. 1938.',
        },
        text: '<span class="para-ref">[5.1]</span> The Christian churches provided the most prominent moral resistance to Nazi totalitarianism. In the Protestant Church, Pastor <strong>Martin Niemöller</strong> used the pulpit of his Berlin-Dahlem church to deliver outspoken attacks on Nazi racial interference in theology, leading the Confessional Church until his arrest by the Gestapo in 1937. Alongside him, the brilliant young theologian <strong>Dietrich Bonhoeffer</strong> established an illegal underground seminary to train anti-Nazi pastors, later joining the German military intelligence (Abwehr) resistance circle to smuggle Jews into Switzerland and participate in plots to assassinate Hitler, for which he was executed at Flossenbürg concentration camp in April 1945.<br><br><span class="para-ref">[5.2]</span> Within the Catholic Church, resistance found a towering figure in <strong>Clemens August Graf von Galen</strong>, the aristocratic Bishop of Münster (<span class="archival-meta-tag">Source B</span>). Known as the "Lion of Münster," Galen preached sensational public sermons that were typed out, mimeographed, and passed from hand to hand across Germany. He openly denounced the Gestapo’s warrantless arrests, the seizure of church property, and, most famously in the summer of 1941, exposed the regime’s secret <strong>Aktion T4 euthanasia programme</strong> that was systematically murdering mentally disabled and physically handicapped German patients in gas chambers. Galen’s moral authority was so immense that Hitler, fearing an open revolt among German Catholics in the middle of the war, officially suspended the T4 programme. Joseph Goebbels warned Hitler that executing Galen would turn the entire Catholic population of Westphalia against the war effort; Hitler vowed that after final victory, he would "settle the score with Galen to the last penny."',
      },
    ],
    workbook_stages: [
      {
        stage: 1,
        dates: '1933–1939',
        title: 'The Reality of Conformity & Everyday Grumbling',
        spec_focus:
          'Conformity vs resistance; falling unemployment; Autobahnen; everyday grumbling.',
        focus_clue: 'Why did the majority of German citizens conform rather than openly resist?',
        para_ref: '[1.1–1.2]',
        bullets: [
          'Delivering standard street greeting to avoid suspicion',
          'Benefiting from restored employment and autobahn public works',
          'Muttering jokes in private kitchens away from Gestapo ears',
        ],
        writing_frame: {
          connectives:
            'Most Germans conformed because... &bull; For example, the regime delivered... &bull; In addition, open dissent was deterred by... &bull; Consequently, ...',
        },
      },
      {
        stage: 2,
        dates: '1933–1938',
        title: 'Left-Wing Underground Workers’ Resistance',
        spec_focus:
          'KPD and SPD underground; Sopade; Vorwärts smuggling; industrial sabotage; Red Orchestra.',
        focus_clue:
          'How did outlawed Communist and Socialist cells maintain clandestine resistance?',
        para_ref: '[2.1–2.2]',
        bullets: [
          'Printing illegal anti-fascist leaflets in hidden cellars',
          'Slowing down assembly lines and faking factory sickness',
          'Red Orchestra network smuggling industrial intelligence abroad',
        ],
        writing_frame: {
          connectives:
            'Political opposition was maintained underground by... &bull; Specifically, left-wing workers used... &bull; However, their impact was limited because... &bull; Furthermore, ...',
        },
      },
      {
        stage: 3,
        dates: '1936–1939',
        title: 'Youth Rebellion: The Edelweiss Pirates',
        spec_focus:
          'Edelweiss Pirates; working-class youth; check shirts and badges; street brawls.',
        focus_clue: 'Why did working-class youth rebel against compulsory state youth movements?',
        para_ref: '[3.1–3.2]',
        bullets: [
          'Camping in wild countryside away from regimented drills',
          'Wearing metal flower badges and check shirts',
          'Beating up Hitler Youth patrols in dark alleys',
        ],
        writing_frame: {
          connectives:
            'Youth rebellion was demonstrated by... &bull; In particular, the Edelweiss Pirates rejected... &bull; Their actions escalated to... &bull; As a result, ...',
        },
      },
      {
        stage: 4,
        dates: '1937–1939',
        title: 'Cultural Dissent: The Swing Youth',
        spec_focus:
          'Swing Youth; American jazz; Benny Goodman; long hair and fashion; Gestapo raids.',
        focus_clue: 'How did middle-class youth use foreign music to reject Nazi conformity?',
        para_ref: '[4.1–4.2]',
        bullets: [
          'Playing illegal American jazz records in dance halls',
          'Growing long greasy hair and wearing English coats',
          'Gestapo raiding private basement parties in Hamburg',
        ],
        writing_frame: {
          connectives:
            'A cultural form of dissent was practiced by... &bull; For instance, the Swing Youth embraced... &bull; This alarmed the authorities because... &bull; In addition, ...',
        },
      },
      {
        stage: 5,
        dates: '1937–1939',
        title: 'Religious Resistance: Niemöller & Galen',
        spec_focus:
          'Martin Niemöller; Dietrich Bonhoeffer; Bishop von Galen; T4 euthanasia sermons.',
        focus_clue: 'Why did the regime hesitate to execute high-profile church critics?',
        para_ref: '[5.1–5.2]',
        bullets: [
          'Martin Niemöller refusing to withdraw outspoken sermons',
          'Preaching to thousands before transfer to Sachsenhausen camp',
          'Bishop Galen preparing public protests against euthanasia killings',
        ],
        writing_frame: {
          connectives:
            'The most influential public resistance came from... &bull; For example, Bishop Galen openly challenged... &bull; This forced the regime to... &bull; Overall, ...',
        },
      },
    ],
    causal_domino_spine: {
      title: 'KT3.4: Opposition, Resistance and Conformity (1933–1939)',
      subtitle: 'Everyday Conformity, Underground Left, Youth Rebellion, and Religious Dissent',
      stages: [
        {
          step: 1,
          date: '1933–1939',
          para_ref: '[1.1–1.2]',
          title: 'The Reality of Conformity & Everyday Grumbling',
          actor: 'German Public & Nazi Administration',
          tag: '🏙️ CONFORMITY & POPULAR APPROVAL',
          trigger:
            'Millions conformed due to economic recovery (unemployment falling to 300,000) and fear of the Gestapo, limiting dissent to private "everyday grumbling."',
          desc: 'Millions conformed due to economic recovery (unemployment falling to 300,000) and fear of the Gestapo, limiting dissent to private "everyday grumbling."',
          connective:
            'Provided the regime with broad domestic stability and prevented spontaneous mass resistance.',
          question: 'Why did the majority of German citizens conform rather than openly resist?',
        },
        {
          step: 2,
          date: '1933–1938',
          para_ref: '[2.1–2.2]',
          title: 'Left-Wing Underground Workers’ Resistance',
          actor: 'Sopade, KPD Cells & Red Orchestra',
          tag: '🚩 UNDERGROUND CELLS & SABOTAGE',
          trigger:
            'Outlawed socialist and communist cells distributed secret anti-Nazi pamphlets and sabotaged factory lines, but remained crippled by division and Gestapo arrests.',
          desc: 'Outlawed socialist and communist cells distributed secret anti-Nazi pamphlets and sabotaged factory lines, but remained crippled by division and Gestapo arrests.',
          connective:
            'Maintained clandestine ideological defiance without being able to threaten the regime’s hold on state power.',
          question:
            'How did outlawed Communist and Socialist cells maintain clandestine resistance?',
        },
        {
          step: 3,
          date: '1936–1939',
          para_ref: '[3.1–3.2]',
          title: 'Youth Rebellion: The Edelweiss Pirates',
          actor: 'Edelweiss Pirates & Hitler Youth',
          tag: '🌸 EDELWEISS PIRATES REBELLION',
          trigger:
            'Working-class youth rejected compulsory Hitler Youth drills, wearing flower badges, camping freely, and ambushing Nazi youth patrols in western cities.',
          desc: 'Working-class youth rejected compulsory Hitler Youth drills, wearing flower badges, camping freely, and ambushing Nazi youth patrols in western cities.',
          connective:
            'Provoked harsh police crackdowns, culminating in public hangings of youth ringleaders in Cologne.',
          question: 'Why did working-class youth rebel against compulsory state youth movements?',
        },
        {
          step: 4,
          date: '1937–1939',
          para_ref: '[4.1–4.2]',
          title: 'Cultural Dissent: The Swing Youth',
          actor: 'Urban Swing Youth & Gestapo',
          tag: '🎷 JAZZ DISSENT & JITTERBUG',
          trigger:
            'Middle-class teenagers in Hamburg and Berlin embraced forbidden American jazz, English tweed fashion, and jitterbug dancing to reject totalitarian conformity.',
          desc: 'Middle-class teenagers in Hamburg and Berlin embraced forbidden American jazz, English tweed fashion, and jitterbug dancing to reject totalitarian conformity.',
          connective:
            'Demonstrated passive cultural alienation among privileged youth, leading Himmler to order concentration camp internment.',
          question: 'How did middle-class youth use foreign music to reject Nazi conformity?',
        },
        {
          step: 5,
          date: '1937–1939',
          para_ref: '[5.1–5.2]',
          title: 'Religious Resistance: Niemöller & Galen',
          actor: 'Martin Niemöller & Bishop von Galen',
          tag: '⛪ MORAL RESISTANCE & AKTION T4',
          trigger:
            'Niemöller defied state control over Protestantism before his arrest, while Bishop Galen’s sermons exposed the Aktion T4 euthanasia programme, forcing Hitler to halt it.',
          desc: 'Niemöller defied state control over Protestantism before his arrest, while Bishop Galen’s sermons exposed the Aktion T4 euthanasia programme, forcing Hitler to halt it.',
          connective:
            'Proved that principled moral opposition with broad public backing could force tactical retreats from the totalitarian state.',
          question: 'Why did the regime hesitate to execute high-profile church critics?',
        },
      ],
    },
  },
};

for (let i = 8; i < 12; i++) {
  const lesson = unitData.lessons[i];
  const updateData = KT3_5_ACT_DATA[lesson.id];
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
  '\n✅ Successfully migrated Key Topic 3 (Nazi Control and Dictatorship) to 5-Act Gold Standard in data.js!',
);
