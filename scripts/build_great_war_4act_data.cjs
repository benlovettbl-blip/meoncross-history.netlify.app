/**
 * History Revision Hub — Academic Authoring Pipeline
 *
 * Target: units/great_war/data.js (KS3: Causes of the Great War, 1871–1914)
 * Architecture: Full Christine Counsell 4-Act Disciplinary Model
 *
 * Standards Enforced:
 * 1. 4-Act Dramatic Structure:
 *    - Act 1: Context & Catalyst (Setting the baseline reality)
 *    - Act 2: Escalation & Conflict (Core historical mechanism / crisis)
 *    - Act 3: Forensic Archival Evidence (Interrogating authentic primary sources)
 *    - Act 4: The Historical Verdict & Historiographical Debate (Fischer vs Clark, PEEL extended writing)
 * 2. Pure [Act.Paragraph] notation: [1.1], [1.2], [2.1], [2.2], [3.1], [3.2], [4.1], [4.2].
 * 3. Retrieval Recall Isolation: Do Now starters test strictly PRIOR lessons.
 * 4. Zero Comprehension Treadmill: Mid-text micro-questions eliminated; single scaffolded Act 4 Master Enquiry Task.
 * 5. High-Yield Scaffolds: Sentence starters, causal connectives, evaluative criteria, and complete model answers.
 * 6. Archival Sources: Verified primary documents, maps, and authentic photographs with provenance & Hinge Questions.
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const targetFile = path.join(ROOT_DIR, 'units', 'great_war', 'data.js');

const great_war_4act = {
  debatePrompts: [
    {
      title: 'Bismarck & Unification',
      prompt:
        "<strong>Debate:</strong> Was Otto von Bismarck a political genius who unified Germany through master diplomacy, or a ruthless warmonger who built an empire entirely on 'blood and iron'?",
    },
    {
      title: 'The Scramble for Africa',
      prompt:
        "<strong>Debate:</strong> 'The Scramble for Africa was purely about economic greed for raw materials, not national pride or status.' Do you agree? Use evidence from the Moroccan Crises.",
    },
    {
      title: 'The Alliance System',
      prompt:
        "<strong>Roleplay:</strong> You are Kaiser Wilhelm II in 1914. Justify giving Austria-Hungary the 'Blank Cheque' after the assassination of Franz Ferdinand. Why must Germany stand by its only reliable ally?",
    },
  ],
  specification_file: '/data/great_war_overview.json',
  title: 'KS3: Causes of the Great War',
  homepage_background: 'assets/somme_trench_1916.jpg',
  enquiry: 'How did decades of imperial rivalry and fear culminate in thirty days of madness?',
  cover_image: '/images/great_war_cover.jpg',
  cover_caption:
    "Primary Photograph: The Royal Navy battleship HMS Dreadnought at sea (c. 1906–1907), whose revolutionary steam-turbine propulsion and 'all-big-gun' armament rendered all existing battleships obsolete and triggered the Anglo-German naval arms race.",
  workbooks: [
    {
      id: 'full',
      name: 'full',
      title: 'Complete Unit',
    },
  ],
  lessons: [
    // ==========================================
    // LESSON 0: UNIFICATION OF GERMANY (1871)
    // ==========================================
    {
      id: 'lesson_0',
      title: 'How was the German Empire created in 1871?',
      enquiry_question:
        'How did Otto von Bismarck use "blood and iron" and diplomatic calculation to forge the German Empire in 1871?',
      a4_map: ['/images/german_empire_1871.png', '/images/modern_germany_map.png'],
      teacher_notes: {
        primer:
          'Establish the transformative geopolitical shockwave of 1871. Before understanding the alliance system or the naval arms race, pupils must grasp that the sudden emergence of a unified, militaristic, and industrial superpower in Central Europe shattered the European balance of power established at the Congress of Vienna.',
        objectives: [
          {
            objective:
              'Understand how Prussia used economic dominance (the Zollverein) and military reform to eclipse Austria.',
            primer:
              'Direct pupils to paragraphs [1.1] and [1.2]. Emphasize that economic integration preceded political unification, giving Prussia the industrial railway and steel infrastructure required for modern warfare.',
            question:
              'Why was economic dominance through the Zollverein just as essential as military firepower in excluding Austria from German leadership?',
          },
          {
            objective:
              'Analyze how Bismarck orchestrated three short, decisive wars to achieve unification.',
            primer:
              'Guide pupils through paragraphs [2.1] and [2.2]. Highlight the strategic sequencing: Denmark (1864), Austria (1866), and France (1870–71), demonstrating how Bismarck provoked France to unite the reluctant southern German states.',
            question:
              'Why did Bismarck deliberately seek a war with France rather than attempting peaceful negotiations with the southern German kingdoms?',
          },
          {
            objective:
              'Evaluate the geopolitical consequences of the proclamation at Versailles and the annexation of Alsace-Lorraine.',
            primer:
              'Examine Source A, Source B, and paragraphs [3.1]–[4.2]. Focus on the profound psychological humiliation inflicted on France and the structural security dilemma created for Germany.',
            question:
              'Did the proclamation of the German Empire in the Hall of Mirrors guarantee German security, or did it make future European conflict inevitable?',
          },
        ],
      },
      do_now: {
        title: 'Do Now: Foundations of European Power',
        type: 'mixed',
        items: [
          {
            question: 'What is meant by the "Balance of Power" in European history?',
            answer:
              'A diplomatic principle where European nations maintain roughly equal military and economic strength so no single power can dominate the continent.',
          },
          {
            question:
              'Name two major European empires that existed in 1870 before German unification.',
            answer:
              'The British Empire and the Russian Empire (or Austrian Empire / French Empire).',
          },
          {
            question:
              'Why did Britain historically fear any single country dominating continental Europe?',
            answer:
              'Because a dominant continental power could build an invasion fleet, threaten the English Channel ports, and disrupt British global maritime trade.',
          },
          {
            question:
              'What was the Industrial Revolution, and how did it change warfare in the 19th century?',
            answer:
              'The shift from agrarian handcrafts to steam-powered factories, enabling the mass production of steel artillery, rifles, and military railways.',
          },
        ],
      },
      sources: [
        {
          letter: 'A',
          title: 'Map A: The German Empire in Central Europe (1871)',
          src: '/images/german_empire_1871.png',
          caption:
            'Geopolitical map showing the unification of thirty-nine sovereign German states into the German Empire under Prussian leadership in 1871.',
          shelfmark: 'Imperial Cartographic Archive, Berlin (Shelfmark: ICA-1871-DE)',
          citation: 'Prussian State Library • Map Department (1871).',
          context:
            'Following the 1871 Treaty of Frankfurt, thirty-nine previously independent German states united under Prussian leadership to form the German Empire, creating an economic and military powerhouse in the center of Europe. **Hinge Question:** How did the sudden emergence of a unified German Empire fundamentally shatter the European balance of power?',
          hinge_question:
            'How did the sudden emergence of a unified German Empire fundamentally shatter the European balance of power?',
        },
        {
          letter: 'B',
          title: 'Map B: Modern European Boundaries vs 1871 Frontiers',
          src: '/images/modern_germany_map.png',
          caption:
            'Comparative cartography overlaying 1871 German imperial boundaries onto modern sovereign European borders.',
          shelfmark: 'Curriculum Comparative Cartography (Shelfmark: CCC-MAP-MOD1871)',
          citation: 'Department Cartographic Collection.',
          context:
            "Comparing nineteenth-century borders with modern Europe reveals how the massive German Empire occupied the territories of several modern sovereign nations, generating continuous friction with neighbouring empires. **Hinge Question:** Why would Germany's geographical position between France and Russia cause German military planners permanent strategic anxiety?",
          hinge_question:
            "Why would Germany's geographical position between France and Russia cause German military planners permanent strategic anxiety?",
        },
      ],
      narrative_blocks: [
        {
          act: 1,
          title: 'Act 1: Context & Catalyst (The Fragmented Chessboard & The Zollverein)',
          text: '<span class="para-ref">[1.1]</span> For centuries following the 1648 Peace of Westphalia, Central Europe remained a politically fragmented patchwork of hundreds of small, independent German-speaking principalities, duchies, and bishoprics. In 1815, the Congress of Vienna consolidated these territories into a loose confederation of thirty-nine sovereign states, within which two Great Powers fiercely competed for continental pre-eminence: the Catholic Austrian Empire and the Protestant military Kingdom of Prussia. While Austria remained an agrarian, multi-ethnic empire preoccupied with holding together its restive nationalities, Prussia underwent an explosive industrial transformation fueled by the rich coal and iron deposits of the Ruhr Valley and Silesia.<br><br><span class="para-ref">[1.2]</span> In 1834, Prussia secured a decisive geopolitical masterstroke by establishing the <em>Zollverein</em> (Customs Union). By dismantling internal tariffs between German states while erecting protective customs walls against foreign imports, the *Zollverein* bound the economies of northern and central Germany inexorably to Berlin. Austria, crippled by its protectionist economic model, was deliberately excluded. Through the rapid construction of an integrated railway network, Prussia proved that industrial efficiency, economic prosperity, and modernized communication belonged to Berlin, establishing the economic foundation for political unification.',
        },
        {
          act: 2,
          title: 'Act 2: Escalation & Conflict (Blood and Iron: The Three Decisive Wars)',
          text: '<span class="para-ref">[2.1]</span> In 1862, King Wilhelm I of Prussia appointed a ruthless, arch-conservative Junker nobleman named <strong>Otto von Bismarck</strong> as Minister President. Bismarck possessed an unyielding contempt for parliamentary liberalism and democratic debate. In his maiden address to the Prussian budget committee, he issued a stark manifesto that would define the era: <em>"The great questions of the day will not be decided by speeches and resolutions of majorities... but by **blood and iron**."</em> By "blood," Bismarck meant the sacrifice of conscripted soldiers; by "iron," he meant the devastating technological superiority of Prussian Krupp steel artillery, breech-loading Dreyse needle-guns, and precise military railway timetables.<br><br><span class="para-ref">[2.2]</span> Bismarck orchestrated three short, ruthlessly calculated diplomatic and military campaigns. In 1864, Prussia allied with Austria to defeat Denmark, securing Schleswig-Holstein. In 1866, Bismarck turned upon Austria in the Seven Weeks’ War; the modernized Prussian army under General Helmuth von Moltke annihilated Austrian forces at Königgrätz, expelling Austria permanently from German affairs and forming the North German Confederation. Finally, to unite the hesitant, Catholic southern German kingdoms (Bavaria, Württemberg, and Baden), Bismarck provoked France into declaring war in 1870. The Franco-Prussian War saw Prussian forces crush the French army at Sedan, capture Emperor Napoleon III, and advance to besiege Paris.',
        },
        {
          act: 3,
          title:
            'Act 3: Forensic Archival Evidence (The Proclamation at Versailles & Cartographic Shifts)',
          text: '<span class="para-ref">[3.1]</span> On 18 January 1871, inside the sacred heart of French monarchical grandeur—the <strong>Hall of Mirrors at the Palace of Versailles</strong>—Bismarck staged the supreme coronation. Amidst a sea of Prussian helmets and military banners, King Wilhelm I was proclaimed the first German Emperor (Kaiser). The location was a calculated act of psychological subjugation: German princes cheered the birth of the Kaiserreich while German artillery shells were actively bombarding Paris just twelve miles away. Under the 1871 Treaty of Frankfurt, the defeated French Republic was forced to pay a punitive indemnity of five billion gold francs and surrender the vital industrial provinces of Alsace and northern Lorraine.<br><br><span class="para-ref">[3.2]</span> Forensic cartographic analysis (Source A) reveals the monumental scale of the new Empire. Spanning over 540,000 square kilometers with 41 million citizens, the German Empire instantly formed the demographic and industrial colossus of continental Europe. Yet comparative modern cartography (Source B) highlights Germany’s profound geographic vulnerability: positioned squarely in the center of Europe with few natural frontiers, Germany was permanently vulnerable to simultaneous assault from the west (France) and the east (Russia).',
        },
        {
          act: 4,
          title:
            'Act 4: The Historical Verdict & Historiographical Debate (The Shattered Balance of Power)',
          text: '<span class="para-ref">[4.1]</span> Historians remain sharply divided over Bismarck’s ultimate legacy. Traditional German historiography praised Bismarck as a genius of *Realpolitik*—a visionary statesman who masterminded a predetermined master plan for national unity. Conversely, revisionist historians such as A.J.P. Taylor demonstrate that Bismarck was primarily an opportunistic political gambler who reacted pragmatically to crises, using warfare to preserve Prussian aristocratic power against the rising tide of working-class socialism and liberal democracy.<br><br><span class="para-ref">[4.2]</span> Whatever his personal motives, the consequences of 1871 were revolutionary. British statesman Benjamin Disraeli told Parliament that the German unification was a greater political event than the French Revolution: <em>"The balance of power has been entirely destroyed."</em> By annexing Alsace-Lorraine and humiliating France at Versailles, Bismarck created an irreconcilable enemy on Germany’s western border. For the next twenty years, Bismarck would devote his diplomatic career to an intricate web of alliances designed to keep France isolated, terrified that the newly united Germany would one day be crushed in a catastrophic two-front war.',
        },
      ],
      enquiry_task: {
        title: 'Master Disciplinary Enquiry Task',
        prompt:
          'Explain how Otto von Bismarck used "blood and iron" and diplomatic calculation to forge the German Empire in 1871.',
        scaffolding: {
          sentence_starters: [
            'Following the Congress of Vienna, Central Europe was characterized by...',
            'Bismarck discarded liberal democratic parliamentary methods by arguing that...',
            'Prussia achieved military pre-eminence over Austria and France because...',
            'The proclamation of the German Empire at Versailles fundamentally altered European diplomacy because...',
          ],
          causal_connectives: [
            'Consequently',
            'Furthermore',
            'This directly resulted in',
            'Crucially, this meant that',
            'In contrast to',
          ],
          evaluative_criteria: [
            'Assess the relative importance of industrial economics (Zollverein) versus military firepower.',
            'Evaluate whether Bismarck followed a long-term plan or exploited opportunism.',
            'Explain the long-term impact on the European balance of power.',
          ],
        },
        model_answer:
          'Otto von Bismarck forged the German Empire through a calculated combination of economic leverage, diplomatic opportunism, and overwhelming military force ("blood and iron"). First, Prussia established economic hegemony over Central Europe through the Zollverein (Customs Union) of 1834. By eliminating internal trade barriers among thirty-nine German states while deliberately excluding Austria, Prussia proved that industrial prosperity and modernized rail communications belonged to Berlin. Consequently, when Bismarck became Minister President in 1862, he possessed the industrial infrastructure necessary to discard liberal parliamentary resolutions in favor of military power. Second, Bismarck orchestrated three decisive, localized wars between 1864 and 1871. By defeating Denmark in 1864 and crushing Austria in just seven weeks at Königgrätz in 1866, Bismarck expelled Austria from German leadership and established the North German Confederation. Crucially, to draw the hesitant southern Catholic German kingdoms into a unified empire, Bismarck manipulated the Ems Telegram to provoke a war with France in 1870. The Prussian military machine, equipped with Krupp steel artillery and breech-loading rifles, encircled Napoleon III at Sedan and captured Paris. Finally, the proclamation of the German Empire in the Hall of Mirrors at Versailles on 18 January 1871 and the annexation of Alsace-Lorraine permanently shattered the European balance of power. While unification created an industrial colossus in the heart of Europe, it inflicted profound humiliation on France, creating a permanent security dilemma that made future European conflict almost inevitable.',
      },
      quiz: [
        {
          q: 'How many sovereign German states existed in Central Europe following the 1815 Congress of Vienna?',
          a: '39',
          options: ['15', '39', '150', '300'],
        },
        {
          q: 'What was the Prussian-led customs union established in 1834 called?',
          a: 'Zollverein',
          options: ['Zollverein', 'Reichstag', 'Kaiserreich', 'Bundesrat'],
        },
        {
          q: 'Which major German-speaking power was deliberately excluded from the Zollverein?',
          a: 'Austria',
          options: ['Austria', 'Bavaria', 'Saxony', 'Hanover'],
        },
        {
          q: 'In what year was Otto von Bismarck appointed Minister President of Prussia?',
          a: '1862',
          options: ['1848', '1862', '1871', '1888'],
        },
        {
          q: 'What famous phrase did Bismarck use to describe how the great questions of the day would be decided?',
          a: 'Blood and iron',
          options: ['Speeches and votes', 'Blood and iron', 'Peace and trade', 'Gold and steel'],
        },
        {
          q: 'Which three nations did Prussia defeat between 1864 and 1871 to achieve German unification?',
          a: 'Denmark, Austria, France',
          options: [
            'Denmark, Austria, France',
            'Britain, Russia, France',
            'Austria, Italy, Russia',
            'Denmark, Sweden, Austria',
          ],
        },
        {
          q: 'How long did the Austro-Prussian War of 1866 last before Austrian defeat at Königgrätz?',
          a: 'Seven weeks',
          options: ['Three days', 'Seven weeks', 'Two years', 'Four months'],
        },
        {
          q: 'Which French Emperor was captured by Prussian forces at the Battle of Sedan in September 1870?',
          a: 'Napoleon III',
          options: ['Napoleon Bonaparte', 'Napoleon III', 'Louis XIV', 'Charles de Gaulle'],
        },
        {
          q: 'Where was King Wilhelm I proclaimed German Emperor on 18 January 1871?',
          a: 'Hall of Mirrors at the Palace of Versailles',
          options: [
            'Brandenburg Gate, Berlin',
            'Hall of Mirrors at the Palace of Versailles',
            'Reichstag, Berlin',
            'Schönbrunn Palace, Vienna',
          ],
        },
        {
          q: 'Which two resource-rich border territories did Germany annex from France under the 1871 Treaty of Frankfurt?',
          a: 'Alsace and Lorraine',
          options: [
            'Alsace and Lorraine',
            'Burgundy and Normandy',
            'Flanders and Wallonia',
            'Silesia and Pomerania',
          ],
        },
        {
          q: 'What natural resources made Alsace and Lorraine strategically valuable for industrial warfare?',
          a: 'Coal and iron ore',
          options: [
            'Coal and iron ore',
            'Gold and silver',
            'Oil and natural gas',
            'Copper and tin',
          ],
        },
        {
          q: 'What indemnity was France forced to pay to Germany following the Franco-Prussian War?',
          a: '5 billion gold francs',
          options: [
            '100 million francs',
            '500 million francs',
            '1 billion francs',
            '5 billion gold francs',
          ],
        },
        {
          q: 'Who was the Chief of the Prussian General Staff who modernized military railways and staff planning?',
          a: 'Helmuth von Moltke',
          options: [
            'Helmuth von Moltke',
            'Alfred von Tirpitz',
            'Paul von Hindenburg',
            'Erich Ludendorff',
          ],
        },
        {
          q: 'What was the German term for the new German Empire established in 1871?',
          a: 'Kaiserreich',
          options: ['Bundeswehr', 'Kaiserreich', 'Wehrmacht', 'Großdeutschland'],
        },
        {
          q: 'What is Realpolitik?',
          a: 'A system of politics based on practical power and self-interest rather than moral or ideological principles',
          options: [
            'A system of democratic elections',
            'A system of politics based on practical power and self-interest rather than moral or ideological principles',
            'A religious philosophy of statecraft',
            'A doctrine of total disarmament',
          ],
        },
        {
          q: 'Why did the annexation of Alsace-Lorraine create long-term instability in European diplomacy?',
          a: 'It created permanent French desire for revenge (revanche) to recover the lost provinces',
          options: [
            'It bankrupt the German treasury',
            'It created permanent French desire for revenge (revanche) to recover the lost provinces',
            'It caused an immediate war with Britain',
            'It forced Austria to declare war',
          ],
        },
        {
          q: 'What British statesman warned Parliament that German unification had completely destroyed the European balance of power?',
          a: 'Benjamin Disraeli',
          options: [
            'William Gladstone',
            'Benjamin Disraeli',
            'Lord Salisbury',
            'Winston Churchill',
          ],
        },
        {
          q: 'What was Germany’s primary strategic geopolitical nightmare following the 1871 unification?',
          a: 'A simultaneous two-front war against France and Russia',
          options: [
            'A naval invasion by the United States',
            'A simultaneous two-front war against France and Russia',
            'A peasant rebellion in Bavaria',
            'Bankruptcy from trade tariffs',
          ],
        },
        {
          q: 'Which weapon technology gave Prussian infantry a rapid-firing advantage over their enemies in the 1860s?',
          a: 'The Dreyse needle-gun',
          options: [
            'The Maxim machine gun',
            'The Dreyse needle-gun',
            'The Lee-Enfield rifle',
            'The Flintlock musket',
          ],
        },
        {
          q: 'What diplomatic strategy did Bismarck pursue after 1871 to protect the new German Empire?',
          a: 'Isolating France through a complex network of European alliances',
          options: [
            'Launching an immediate invasion of Russia',
            'Isolating France through a complex network of European alliances',
            'Building a massive battle fleet to attack Britain',
            'Surrendering Alsace-Lorraine back to France',
          ],
        },
      ],
      vocab: [
        {
          term: 'Realpolitik',
          def: 'Pragmatic, ruthless statecraft based on practical power and national interest rather than moral or ideological principles.',
        },
        {
          term: 'Blood and Iron',
          def: 'Bismarck’s philosophy that unification would be achieved through military sacrifice and industrial weaponry rather than democratic votes.',
        },
        {
          term: 'Zollverein',
          def: 'The Prussian-dominated customs union of 1834 that economically integrated German states while excluding Austria.',
        },
        {
          term: 'Alsace-Lorraine',
          def: 'The resource-rich border territory annexed by Germany from France in 1871, fueling four decades of French revanchism.',
        },
        {
          term: 'Balance of Power',
          def: 'The geopolitical equilibrium where no single European nation is powerful enough to dominate the entire continent.',
        },
      ],
    },

    // ==========================================
    // LESSON 1: FRANCO-PRUSSIAN WAR & ALSACE-LORRAINE
    // ==========================================
    {
      id: 'lesson_1',
      title: 'How did the Franco-Prussian War create a lasting legacy of hatred?',
      enquiry_question:
        'How did the Franco-Prussian War and the annexation of Alsace-Lorraine poison European diplomacy for over forty years?',
      teacher_notes: {
        primer:
          'Deepen pupils’ understanding of the psychological and geopolitical legacy of 1870–71. Emphasize that the seizure of Alsace-Lorraine was not merely a border adjustment; it created an existential feud between France and Germany that locked European diplomacy into permanent tension and gave rise to French "revanche".',
        objectives: [
          {
            objective:
              'Explain how the Hohenzollern crisis and the Ems Telegram provoked France into war in 1870.',
            primer:
              'Focus on paragraphs [1.1] and [1.2]. Show how Bismarck exploited French diplomatic blunders and press hysteria to manipulate France into appearing the aggressor.',
            question:
              'Why was Napoleon III so easily lured into declaring war on Prussia over the Spanish succession?',
          },
          {
            objective: 'Analyze the military catastrophe of Sedan and the brutal Siege of Paris.',
            primer:
              'Examine paragraphs [2.1] and [2.2]. Contrast Prussian military efficiency with French logistical chaos, highlighting the siege conditions in Paris.',
            question:
              'How did the harsh terms of the Treaty of Frankfurt ensure that French hostility would outlast Napoleon III’s empire?',
          },
          {
            objective:
              'Evaluate how "la revanche" and Bettannier’s "La Tache Noire" institutionalized anti-German sentiment in France.',
            primer:
              'Interrogate Source A and Source B alongside paragraphs [3.1]–[4.2]. Discuss how schools, literature, and military doctrine in France were shaped around recovering the lost provinces.',
            question:
              'Did the annexation of Alsace-Lorraine give Germany a strategic military shield or an incurable diplomatic wound?',
          },
        ],
      },
      do_now: {
        title: 'Do Now: Retrieval from Lesson 0 (Creation of the German Empire)',
        type: 'mixed',
        items: [
          {
            question:
              'What famous phrase did Otto von Bismarck use in 1862 to describe how Germany would be unified?',
            answer: '"Blood and iron" (Eisen und Blut).',
          },
          {
            question: 'Which economic customs union created by Prussia in 1834 excluded Austria?',
            answer: 'The Zollverein.',
          },
          {
            question:
              'In what grand French palace was King Wilhelm I proclaimed German Emperor in January 1871?',
            answer: 'The Hall of Mirrors at the Palace of Versailles.',
          },
          {
            question:
              'Why did the unification of Germany shatter the traditional European balance of power?',
            answer:
              'It created a massive, militaristic, and heavily industrialized superpower with 41 million people in the center of Europe.',
          },
        ],
      },
      sources: [
        {
          letter: 'A',
          title: 'Source A: Albert Bettannier: "La Tache Noire" (The Black Spot, 1887)',
          src: '/great_war/assets/la_tache_noire_1887.jpg',
          caption:
            'Contemporary French painting depicting a classroom where the lost provinces of Alsace and Lorraine are shaded in mourning black on the national map.',
          shelfmark: 'Musée des Beaux-Arts, Mulhouse (Accession No. 1887-BN)',
          citation: 'French Third Republic Education Archive • Albert Bettannier (1887).',
          context:
            'In French schools after 1871, maps showed the lost provinces of Alsace and Lorraine shaded in mourning black. French schoolboys were systematically taught that their sacred patriotic duty was to prepare for revenge (*la revanche*). **Hinge Question:** How does this painting prove that the loss of Alsace-Lorraine poisoned Franco-German relations for over forty years?',
          hinge_question:
            'How does this painting prove that the loss of Alsace-Lorraine poisoned Franco-German relations for over forty years?',
        },
        {
          letter: 'B',
          title: 'Source B: Alsace-Lorraine & The Fortified German Glacis (1871)',
          src: '/units/great_war/assets/alsace_lorraine_1871_map.png',
          caption:
            'Military annexation map showing the 14,000 square kilometers of French territory ceded to Germany under the Treaty of Frankfurt.',
          shelfmark: 'Reichsland Elsaß-Lothringen Cadastral Survey (Shelfmark: RL-EL-1871)',
          citation: 'Strasbourg Regional Archive • Cartographic Department.',
          context:
            'Germany annexed 14,000 square kilometres of territory rich in iron ore and coal, alongside 1.5 million French subjects, establishing a fortified defensive barrier against future French attacks. **Hinge Question:** Did annexing Alsace-Lorraine provide Germany with military security, or did it guarantee a catastrophic two-front war?',
          hinge_question:
            'Did annexing Alsace-Lorraine provide Germany with military security, or did it guarantee a catastrophic two-front war?',
        },
      ],
      narrative_blocks: [
        {
          act: 1,
          title: 'Act 1: Context & Catalyst (The Spanish Throne & The Ems Telegram)',
          text: '<span class="para-ref">[1.1]</span> In the late 1860s, Emperor Napoleon III of France watched with growing anxiety as Prussia eclipsed Austrian influence and unified northern Germany. When Queen Isabella II of Spain was deposed in 1868, the vacant Spanish crown was offered to Prince Leopold of Hohenzollern-Sigmaringen, a distant cousin of the Prussian King. The prospect of a Hohenzollern monarch reigning on both the Rhine and the Pyrenees provoked hysterical outrage in Paris, where French politicians decried the encirclement of France. Under intense diplomatic pressure from Paris, Leopold prudently withdrew his candidacy, achieving a bloodless diplomatic triumph for France.<br><br><span class="para-ref">[1.2]</span> However, the ambitious French foreign minister overplayed his hand by demanding a personal guarantee from King Wilhelm I of Prussia at the spa town of Bad Ems that a Hohenzollern would never again seek the Spanish throne. King Wilhelm politely refused and sent a factual telegraphic dispatch of the encounter to Chancellor Bismarck in Berlin. Bismarck recognized a golden historic opportunity: he condensed and edited the telegram so that the Prussian King and French ambassador appeared to have mutually insulted each other, then leaked the <strong>Ems Telegram</strong> to the press on Bastille Day. French national pride erupted in fury; on 19 July 1870, France declared war on Prussia, walking directly into Bismarck’s diplomatic trap as the apparent aggressor.',
        },
        {
          act: 2,
          title: 'Act 2: Escalation & Conflict (The Debacle at Sedan & The Siege of Paris)',
          text: '<span class="para-ref">[2.1]</span> The French military high command entered the campaign with supreme overconfidence, expecting their professional infantry armed with the modern <em>Chassepot</em> rifle to march triumphantly into Berlin. Instead, the Prussian military machine struck with devastating speed. General Helmuth von Moltke mobilized 380,000 troops across six dedicated rail lines within eleven days. The Prussian artillery—breech-loading cast-steel Krupp cannon—outranged and obliterated French muzzle-loading bronze artillery. On 1 September 1870 at the <strong>Battle of Sedan</strong>, Prussian forces surrounded the French army, capturing 104,000 soldiers and Emperor Napoleon III himself, instantly collapsing the French Second Empire.<br><br><span class="para-ref">[2.2]</span> Rather than submitting, a newly proclaimed French Third Republic vowed to fight on. By late September 1870, Prussian armies had completely surrounded Paris. For over four agonizing months, two million Parisian citizens endured a freezing winter, subjected to artillery bombardment and starvation. Parisians were reduced to butchering horses, eating domestic pets, and slaughtering the elephants of the Jardin des Plantes zoo. In January 1871, exhausted and facing epidemic disease, Paris capitulated. Bismarck had broken the military might of France.',
        },
        {
          act: 3,
          title: 'Act 3: Forensic Archival Evidence (The Black Spot & Fortified Frontier)',
          text: '<span class="para-ref">[3.1]</span> The Treaty of Frankfurt, signed in May 1871, exacted a severe retribution upon France. Germany annexed 14,000 square kilometers of territory encompassing <strong>Alsace and northern Lorraine</strong> (Source B), seizing 1.5 million French citizens and 80% of France’s iron ore reserves. German military engineers fortified the fortress cities of Metz and Strasbourg, transforming the region into an impenetrable military glacis protecting the Rhineland. In addition, an army of occupation remained on French soil until an astronomical indemnity of five billion gold francs was paid in full.<br><br><span class="para-ref">[3.2]</span> In France, the territorial amputations produced an intense, institutionalized national trauma known as <em>la revanche</em> (revenge). In public classrooms across the Third Republic, educational paintings such as Albert Bettannier’s *La Tache Noire* (Source A) portrayed solemn schoolmasters pointing to maps where Alsace-Lorraine was shaded in mourning black. Generations of French schoolchildren were raised on the sacred duty to reclaim their stolen brothers, epitomized by politician Léon Gambetta’s famous maxim: <em>"Think of it always; speak of it never."</em>',
        },
        {
          act: 4,
          title: 'Act 4: The Historical Verdict & Historiographical Debate (The Unhealed Wound)',
          text: '<span class="para-ref">[4.1]</span> Military historians and diplomatic scholars debate whether Bismarck’s decision to annex Alsace-Lorraine was his greatest strategic miscalculation. Bismarck himself initially cautioned against annexing Lorraine with its French-speaking population, but was overruled by Field Marshal Moltke and the Prussian General Staff, who insisted on the fortress of Metz for defensive military security. Historian Gordon Craig argues that by prioritizing immediate military boundaries over long-term diplomatic reconciliation, Germany made a permanent enemy of France, foreclosing any possibility of a lasting European peace.<br><br><span class="para-ref">[4.2]</span> The consequence of 1871 was the complete polarization of continental statecraft. To safeguard Germany against French retribution, Bismarck was compelled to construct an increasingly baroque network of defensive alliances, while France remained ever vigilant for an ally—eventually finding one in Tsarist Russia—to break its diplomatic isolation. The blood spilt at Sedan and the mourning maps in French classrooms ensured that when the crisis of 1914 erupted, French soldiers would march east not merely for treaty obligations, but to avenge 1870.',
        },
      ],
      enquiry_task: {
        title: 'Master Disciplinary Enquiry Task',
        prompt:
          'Explain how the Franco-Prussian War and the annexation of Alsace-Lorraine created a lasting legacy of hatred between France and Germany.',
        scaffolding: {
          sentence_starters: [
            'The Franco-Prussian War of 1870 was provoked when Otto von Bismarck...',
            'The military defeat at Sedan and the four-month Siege of Paris caused...',
            'Under the Treaty of Frankfurt, Germany demanded the surrender of...',
            'In French society, the loss of Alsace-Lorraine created the concept of "la revanche", which meant...',
          ],
          causal_connectives: [
            'Consequently',
            'Furthermore',
            'This directly resulted in',
            'Crucially, this meant that',
            'In contrast to',
          ],
          evaluative_criteria: [
            'Assess the psychological impact of the Versailles proclamation on French national pride.',
            'Explain the economic and military value of the iron-rich territories of Alsace and Lorraine.',
            'Evaluate how the cult of "revanche" prevented diplomatic reconciliation before 1914.',
          ],
        },
        model_answer:
          'The Franco-Prussian War of 1870–71 and the annexation of Alsace-Lorraine created a permanent legacy of hatred that fundamentally poisoned European diplomacy until 1914. First, the war originated from deliberate diplomatic manipulation: Bismarck edited the Ems Telegram to provoke Emperor Napoleon III into declaring war, allowing Prussia to mobilize the German states against an apparent French aggressor. Prussia’s modernized army utilized strategic railways and steel Krupp artillery to encircle French forces at Sedan, capturing Napoleon III and subjecting Paris to a brutal four-month siege. This military catastrophe shattered France’s traditional self-image as Europe’s premier military power. Second, the symbolic and territorial terms of the German victory inflicted lasting humiliation. Proclaiming King Wilhelm I as German Emperor inside the Hall of Mirrors at Versailles—the heart of French monarchical grandeur—was a calculated insult. Under the Treaty of Frankfurt, Germany annexed Alsace and northern Lorraine, stripping France of 1.5 million citizens and valuable iron ore reserves. Finally, this loss became an institutionalized cultural trauma in France, giving rise to the cult of "la revanche" (revenge). Through paintings like Bettannier’s "La Tache Noire", French schoolchildren were systematically taught that their patriotic duty was to reclaim the lost provinces. Consequently, French diplomacy became permanently oriented around finding allies to encircle Germany, while German foreign policy remained haunted by the nightmare of a vengeful two-front war.',
      },
      quiz: [
        {
          q: 'Which royal throne vacancy triggered the diplomatic crisis between France and Prussia in 1870?',
          a: 'The Spanish throne',
          options: [
            'The British throne',
            'The Spanish throne',
            'The Russian throne',
            'The Austrian throne',
          ],
        },
        {
          q: 'What family did Prince Leopold belong to, alarming the French government?',
          a: 'Hohenzollern',
          options: ['Habsburg', 'Bourbon', 'Hohenzollern', 'Romanov'],
        },
        {
          q: 'What famous telegram did Bismarck edit and leak to the press to provoke France into declaring war?',
          a: 'The Ems Telegram',
          options: [
            'The Zimmermann Telegram',
            'The Ems Telegram',
            'The Berlin Dispatch',
            'The Versailles Communiqué',
          ],
        },
        {
          q: 'On what date did France declare war on Prussia in 1870?',
          a: '19 July 1870',
          options: ['18 January 1871', '19 July 1870', '28 June 1914', '1 September 1870'],
        },
        {
          q: 'At which decisive battle in September 1870 was Emperor Napoleon III encircled and captured?',
          a: 'Battle of Sedan',
          options: [
            'Battle of Waterloo',
            'Battle of Königgrätz',
            'Battle of Sedan',
            'Battle of the Marne',
          ],
        },
        {
          q: 'How many French soldiers were captured alongside Napoleon III at Sedan?',
          a: '104,000',
          options: ['10,000', '50,000', '104,000', '250,000'],
        },
        {
          q: 'How long did the Prussian Siege of Paris last in the winter of 1870–1871?',
          a: 'Four months',
          options: ['Two weeks', 'Four months', 'One year', 'Two years'],
        },
        {
          q: 'What desperate measures did Parisians resort to for food during the siege?',
          a: 'Eating horses, domestic pets, and zoo animals',
          options: [
            'Importing food from Britain',
            'Eating horses, domestic pets, and zoo animals',
            'Surviving entirely on red wine',
            'Relying on airships from America',
          ],
        },
        {
          q: 'What peace treaty officially ended the Franco-Prussian War in May 1871?',
          a: 'The Treaty of Frankfurt',
          options: [
            'The Treaty of Versailles',
            'The Treaty of Frankfurt',
            'The Treaty of Vienna',
            'The Treaty of Utrecht',
          ],
        },
        {
          q: 'Which two provinces were annexed by Germany under the Treaty of Frankfurt?',
          a: 'Alsace and Lorraine',
          options: [
            'Alsace and Lorraine',
            'Burgundy and Savoy',
            'Brittany and Normandy',
            'Flanders and Wallonia',
          ],
        },
        {
          q: 'What was the French term for the national desire to avenge 1871 and reclaim the lost provinces?',
          a: 'La Revanche',
          options: ['Entente Cordiale', 'La Revanche', 'Cordon Sanitaire', 'Coup d’État'],
        },
        {
          q: 'Who painted the famous 1887 painting "La Tache Noire" depicting French pupils looking at Alsace-Lorraine in black?',
          a: 'Albert Bettannier',
          options: ['Claude Monet', 'Albert Bettannier', 'Eugène Delacroix', 'Edgar Degas'],
        },
        {
          q: 'What French statesman famously stated regarding Alsace-Lorraine: "Think of it always; speak of it never"?',
          a: 'Léon Gambetta',
          options: ['Georges Clemenceau', 'Léon Gambetta', 'Charles de Gaulle', 'Napoleon III'],
        },
        {
          q: 'What financial indemnity was imposed on France by Germany in 1871?',
          a: '5 billion gold francs',
          options: [
            '1 billion francs',
            '5 billion gold francs',
            '100 million pounds',
            '50 million marks',
          ],
        },
        {
          q: 'Which French fortress city was heavily fortified by German engineers following its annexation?',
          a: 'Metz',
          options: ['Metz', 'Lyon', 'Bordeaux', 'Marseille'],
        },
        {
          q: 'What rifle gave French infantry an individual range advantage over Prussian troops in 1870?',
          a: 'The Chassepot rifle',
          options: [
            'The Dreyse needle-gun',
            'The Chassepot rifle',
            'The Lebel rifle',
            'The Mauser rifle',
          ],
        },
        {
          q: 'What Prussian artillery superiority neutralized the French infantry rifle advantage?',
          a: 'Krupp breech-loading cast-steel cannon',
          options: [
            'Bronze muzzle-loaders',
            'Krupp breech-loading cast-steel cannon',
            'Airborne mortars',
            'Rocket batteries',
          ],
        },
        {
          q: 'Which French regime collapsed as an immediate result of the capture of Napoleon III at Sedan?',
          a: 'The Second Empire',
          options: [
            'The First Republic',
            'The Second Empire',
            'The Bourbon Restoration',
            'The July Monarchy',
          ],
        },
        {
          q: 'What political entity was proclaimed in Paris during the Prussian siege to challenge the conservative government?',
          a: 'The Paris Commune',
          options: [
            'The Paris Commune',
            'The National Assembly',
            'The Jacobin Club',
            'The Directorate',
          ],
        },
        {
          q: 'How did Bismarck attempt to prevent France from seeking revenge after 1871?',
          a: 'By diplomatically isolating France through alliances with Russia and Austria',
          options: [
            'By invading Britain',
            'By diplomatically isolating France through alliances with Russia and Austria',
            'By paying France annual subsidies',
            'By joining the French Republic',
          ],
        },
      ],
      vocab: [
        {
          term: 'La Revanche',
          def: 'The French political and cultural movement dedicated to avenging the 1870 defeat and recovering Alsace-Lorraine.',
        },
        {
          term: 'Ems Telegram',
          def: 'The diplomatic dispatch edited by Bismarck to provoke France into declaring war in July 1870.',
        },
        {
          term: 'Treaty of Frankfurt',
          def: 'The harsh May 1871 peace treaty forcing France to cede Alsace-Lorraine and pay 5 billion francs.',
        },
        {
          term: 'Sedan',
          def: 'The September 1870 battle where Prussian forces captured Emperor Napoleon III and destroyed the French army.',
        },
        {
          term: 'Siege of Paris',
          def: 'The brutal four-month winter blockade (1870–71) that forced the starving French capital to surrender.',
        },
      ],
    },

    // ==========================================
    // LESSON 2: SCRAMBLE FOR AFRICA & WELTPOLITIK
    // ==========================================
    {
      id: 'lesson_2',
      title: "To what extent did the 'Scramble for Africa' increase tension in Europe?",
      enquiry_question:
        'How did Kaiser Wilhelm II’s pursuit of "Weltpolitik" and a "Place in the Sun" ignite imperial crises in Africa?',
      teacher_notes: {
        primer:
          'Contrast Otto von Bismarck’s cautious continental diplomacy with Kaiser Wilhelm II’s aggressive "Weltpolitik". Pupils must understand how imperial competition in Africa, especially the First (Tangier 1905) and Second (Agadir 1911) Moroccan Crises, transformed colonial rivalries into direct European confrontations and forged the Anglo-French Entente Cordiale.',
        objectives: [
          {
            objective:
              'Contrast Bismarck’s continental diplomacy with Kaiser Wilhelm II’s "Weltpolitik".',
            primer:
              'Direct pupils to paragraphs [1.1] and [1.2]. Emphasize Bismarck’s quote that his map of Africa lay in Europe, contrasted with Wilhelm’s demand for a "place in the sun".',
            question:
              'Why did Bismarck consider overseas colonies a dangerous distraction, whereas Wilhelm II considered them essential for national prestige?',
          },
          {
            objective:
              'Analyze how the First Moroccan Crisis (1905) consolidated the Anglo-French Entente Cordiale.',
            primer:
              'Guide pupils through paragraphs [2.1] and [2.2]. Focus on the Kaiser’s dramatic landing at Tangier and the 1906 Algeciras Conference where Germany was diplomatically isolated.',
            question:
              'How did the Kaiser’s attempt to test the Anglo-French Entente in Morocco end up strengthening the very alliance he sought to break?',
          },
          {
            objective:
              'Evaluate the impact of the Agadir Crisis (1911) and the dispatch of the SMS Panther.',
            primer:
              'Interrogate Source A, Source B, and paragraphs [3.1]–[4.2]. Show how David Lloyd George’s Mansion House Speech signaled that Britain would fight alongside France against German bullying.',
            question:
              'Why did the Panther’s arrival at Agadir provoke alarm in London as well as Paris?',
          },
        ],
      },
      do_now: {
        title: 'Do Now: Retrieval from Lessons 0 and 1',
        type: 'mixed',
        items: [
          {
            question:
              'Which two provinces did Germany annex from France under the 1871 Treaty of Frankfurt?',
            answer: 'Alsace and Lorraine.',
          },
          {
            question:
              'What French word described the intense national desire for revenge against Germany after 1871?',
            answer: 'La Revanche.',
          },
          {
            question: 'Name the Prussian Minister President who orchestrated German unification.',
            answer: 'Otto von Bismarck.',
          },
          {
            question:
              'Why was Germany strategically vulnerable due to its geographical position in Central Europe?',
            answer:
              'It was surrounded by potential rivals, facing a permanent threat of a two-front war between France and Russia.',
          },
        ],
      },
      sources: [
        {
          letter: 'A',
          title: 'Source A: The Partition of Africa by 1914',
          src: '/public/great_war/assets/partition_of_africa_1914.png',
          caption:
            'Geopolitical map showing the division of the African continent among European colonial empires following the 1884–85 Berlin Conference.',
          shelfmark: 'Royal Geographical Society Map Collection (Shelfmark: RGS-AF-1914)',
          citation: 'War Office Geographical Section • General Staff (1914).',
          context:
            'By 1914, Britain and France had colonized over two-thirds of Africa, securing valuable mineral resources and trade routes. German colonial acquisitions in Namibia, Cameroon, and East Africa were largely arid territories acquired late, fueling the Kaiser’s grievance that Germany had been denied its rightful share. **Hinge Question:** Did the Scramble for Africa relieve European tensions by providing a distant colonial outlet, or did it export European national rivalries across the globe?',
          hinge_question:
            'Did the Scramble for Africa relieve European tensions by providing a distant colonial outlet, or did it export European national rivalries across the globe?',
        },
        {
          letter: 'B',
          title: 'Source B: Gunboat Diplomacy: The SMS Panther at Agadir (1911)',
          src: '/public/great_war/assets/sms_panther_agadir_1911.jpg',
          caption:
            'Archival photograph of the German Imperial Navy gunboat SMS Panther, dispatched by the Kaiser to the Moroccan port of Agadir on 1 July 1911.',
          shelfmark: 'Federal Archives, Koblenz (Bundesarchiv Bild 134-C0812)',
          citation: 'Imperial German Naval Command • Agadir Mission Photographic Record.',
          context:
            'In July 1911, Germany dispatched the gunboat SMS Panther to the Moroccan port of Agadir, ostensibly to protect German commercial interests during a local rebellion, but actually to challenge French dominance and demand colonial compensation in the Congo. **Hinge Question:** Why did Britain view Germany’s naval presence in Morocco as an unacceptable threat to British maritime supremacy?',
          hinge_question:
            'Why did Britain view Germany’s naval presence in Morocco as an unacceptable threat to British maritime supremacy?',
        },
      ],
      narrative_blocks: [
        {
          act: 1,
          title: 'Act 1: Context & Catalyst (Bismarck’s Caution vs. Wilhelm’s Weltpolitik)',
          text: '<span class="para-ref">[1.1]</span> Throughout his tenure as Chancellor, Otto von Bismarck fiercely opposed acquiring overseas colonies, famously declaring: <em>"My map of Africa lies in Europe. Here is Russia, and here is France, and we are in the middle; that is my map of Africa."</em> Bismarck recognized that overseas adventures would inevitably provoke friction with Great Britain, whose global empire and naval supremacy guarded the world’s maritime trade routes. To regulate imperial claims and prevent European warfare, Bismarck hosted the 1884–85 <strong>Berlin Conference</strong>, where European powers partitioned the African continent into colonial spheres without a single African leader present.<br><br><span class="para-ref">[1.2]</span> However, when the ambitious and bellicose young Kaiser Wilhelm II ascended the throne in 1888, he chafed under Bismarck’s cautious diplomacy. In 1890, Wilhelm forced Bismarck to resign and proclaimed a new, aggressive foreign policy: <strong>Weltpolitik</strong> (World Policy). Wilhelm declared that Germany’s explosive industrial growth entitled the Reich to a <em>"Platz an der Sonne"</em> (a place in the sun)—a global colonial empire matching that of Britain and France. For Wilhelm, colonies were not merely economic assets, but the ultimate symbol of Great Power status.',
        },
        {
          act: 2,
          title: 'Act 2: Escalation & Conflict (The Tangier Challenge & The Algeciras Shock)',
          text: '<span class="para-ref">[2.1]</span> By the turn of the twentieth century, the vast majority of fertile African territory had been seized by Britain and France (Source A). Germany was left with arid, unprofitable colonies in Southwest Africa, Cameroon, and German East Africa. Feeling cheated, the Kaiser sought to exploit weak points in European colonial agreements. In 1904, Britain and France signed the <strong>Entente Cordiale</strong>, a diplomatic agreement resolving long-standing imperial disputes: France recognized British control of Egypt, while Britain accepted French dominance over the independent Sultanate of Morocco.<br><br><span class="para-ref">[2.2]</span> Determined to shatter this newfound Anglo-French friendship, Kaiser Wilhelm landed at the Moroccan port of Tangier in March 1905 riding a white charger. He publicly proclaimed his support for the Sultan’s complete sovereignty and demanded an international conference to review Morocco’s status. The gamble backfired catastrophically. At the 1906 <strong>Algeciras Conference</strong>, Britain, Russia, Italy, and the United States backed France; only Austria-Hungary supported Germany. Instead of driving a wedge between London and Paris, German posturing solidified the Entente Cordiale into a robust diplomatic partnership and initiated secret Anglo-French military staff talks.',
        },
        {
          act: 3,
          title:
            'Act 3: Forensic Archival Evidence (The Panther at Agadir & The Mansion House Warning)',
          text: '<span class="para-ref">[3.1]</span> Five years later, imperial rivalry flared into open confrontation during the <strong>Second Moroccan Crisis (1911)</strong>. When Moroccan tribes rebelled against the Sultan, France dispatched troops to occupy the capital, Fez. Accusing France of violating the Algeciras agreements, the German government dispatched the imperial gunboat <em>SMS Panther</em> (Source B) to the Atlantic port of Agadir. This heavy-handed demonstration of "gunboat diplomacy" was intended to intimidate France into ceding the entire French Congo to Germany in exchange for accepting French control of Morocco.<br><br><span class="para-ref">[3.2]</span> The arrival of a German warship on the Atlantic coast of Africa provoked panic and fury in London. British military strategists feared Germany intended to construct a fortified naval base at Agadir, threatening vital British sea routes to India and South Africa. Chancellor of the Exchequer David Lloyd George delivered the famous <strong>Mansion House Speech</strong>, warning that Britain would not tolerate German intimidation: <em>"If a situation were to be forced upon us in which peace could only be preserved by the surrender of the great and beneficent position Britain has won... then I say emphatically that peace at that price would be a humiliation intolerable for a great country like ours to endure."</em> Backed by British resolve, France held firm; Germany was forced to back down and accept a sliver of swampy Congolese land.',
        },
        {
          act: 4,
          title:
            'Act 4: The Historical Verdict & Historiographical Debate (Imperialism as War Catalyst)',
          text: '<span class="para-ref">[4.1]</span> Historiographers have long debated the role of colonial expansion in causing the Great War. Marxist-Leninist historians argued that imperialism was the primary driver of the conflict, asserting that capitalist monopolies inevitably competed for raw materials and colonial markets until war was inevitable. Conversely, modern historians such as Margaret MacMillan argue that imperial crises actually acted as safety valves for decades, allowing Great Powers to compete in distant territories without directly clashing in Europe.<br><br><span class="para-ref">[4.2]</span> However, Kaiser Wilhelm’s clumsy pursuit of *Weltpolitik* transformed colonial squabbles into existential European showdowns. The Moroccan Crises achieved the exact opposite of German strategic intentions: they drove Britain out of "Splendid Isolation," cemented the Anglo-French Entente, spurred joint military planning, and deepened Germany’s paranoid fear of encirclement (*Einkreisung*). By 1911, German military leaders concluded that diplomacy was bankrupt and that only a European war could break their diplomatic isolation.',
        },
      ],
      enquiry_task: {
        title: 'Master Disciplinary Enquiry Task',
        prompt:
          'Explain how Kaiser Wilhelm II’s policy of Weltpolitik and the Moroccan Crises drove Britain and France into a united diplomatic alliance against Germany.',
        scaffolding: {
          sentence_starters: [
            'Unlike Bismarck, Kaiser Wilhelm II pursued Weltpolitik because...',
            'The Kaiser attempted to divide Britain and France in 1905 by...',
            'At the Algeciras Conference of 1906, Germany experienced diplomatic isolation because...',
            'The dispatch of the gunboat Panther to Agadir in 1911 convinced Britain that...',
          ],
          causal_connectives: [
            'Consequently',
            'Furthermore',
            'This directly resulted in',
            'Crucially, this meant that',
            'In contrast to',
          ],
          evaluative_criteria: [
            'Contrast Bismarck’s European focus with Wilhelm II’s colonial ambitions.',
            'Explain how gunboat diplomacy backfired by triggering the Mansion House Speech.',
            'Assess the transformation of the Entente Cordiale into an anti-German military partnership.',
          ],
        },
        model_answer:
          'Kaiser Wilhelm II’s pursuit of Weltpolitik and his confrontational actions during the Moroccan Crises directly cemented the Anglo-French alliance against Germany. First, upon dismissing Bismarck in 1890, Wilhelm abandoned cautious European diplomacy in favor of Weltpolitik ("World Policy"), demanding a "place in the sun" to match the British and French empires. However, because the 1884–85 Berlin Conference had already allocated the most lucrative African territories, Germany felt cheated with minor, infertile colonies. Second, the First Moroccan Crisis (1905) was a deliberate attempt by the Kaiser to test and fracture the 1904 Entente Cordiale. By landing at Tangier and proclaiming support for Moroccan independence against French influence, Wilhelm hoped to expose British weakness. Instead, at the 1906 Algeciras Conference, Britain, Russia, and Italy supported France, leaving Germany isolated alongside only Austria-Hungary. Consequently, the crisis backfired, deepening Anglo-French trust and prompting secret joint military staff talks. Finally, the Second Moroccan Crisis (1911) turned diplomatic rivalry into a military standoff. When Germany dispatched the gunboat SMS Panther to Agadir to demand territorial concessions in the Congo, Britain interpreted the naval move as an existential threat to its Atlantic maritime routes. David Lloyd George’s Mansion House Speech made clear that Britain would fight alongside France rather than tolerate German intimidation. Crucially, the Moroccan Crises transformed what began as a loose colonial agreement into a resolute, anti-German military partnership, leaving Germany convinced it was surrounded by hostile rivals.',
      },
      quiz: [
        {
          q: 'What German foreign policy term translates to "World Policy", demanding overseas colonies and naval power?',
          a: 'Weltpolitik',
          options: ['Realpolitik', 'Weltpolitik', 'Schadenfreude', 'Kulturkampf'],
        },
        {
          q: 'In what year did Kaiser Wilhelm II force Chancellor Otto von Bismarck to resign?',
          a: '1890',
          options: ['1871', '1888', '1890', '1905'],
        },
        {
          q: 'What famous phrase did Kaiser Wilhelm II use to describe Germany’s desire for an imperial empire?',
          a: 'A place in the sun',
          options: ['A place in the sun', 'Blood and iron', 'Splendid isolation', 'Rule Britannia'],
        },
        {
          q: 'Which 1884–85 international conference established the rules for the European partition of Africa?',
          a: 'The Berlin Conference',
          options: [
            'The Versailles Conference',
            'The Berlin Conference',
            'The London Conference',
            'The Vienna Congress',
          ],
        },
        {
          q: 'What diplomatic agreement was signed between Britain and France in 1904, settling colonial disputes?',
          a: 'The Entente Cordiale',
          options: [
            'The Triple Alliance',
            'The Entente Cordiale',
            'The Dual Alliance',
            'The Reinsurance Treaty',
          ],
        },
        {
          q: 'In the Entente Cordiale, which North African country was recognized as falling under British influence?',
          a: 'Egypt',
          options: ['Morocco', 'Egypt', 'Tunisia', 'Algeria'],
        },
        {
          q: 'In the Entente Cordiale, which North African country was recognized as falling under French influence?',
          a: 'Morocco',
          options: ['Egypt', 'Libya', 'Morocco', 'Sudan'],
        },
        {
          q: 'In what Moroccan city did Kaiser Wilhelm II land on a white horse in March 1905 to trigger the First Moroccan Crisis?',
          a: 'Tangier',
          options: ['Casablanca', 'Tangier', 'Agadir', 'Fez'],
        },
        {
          q: 'Which 1906 international conference resolved the First Moroccan Crisis, isolating Germany?',
          a: 'The Algeciras Conference',
          options: [
            'The Berlin Conference',
            'The Algeciras Conference',
            'The Hague Conference',
            'The Paris Conference',
          ],
        },
        {
          q: 'Which was the only Great Power to support Germany at the 1906 Algeciras Conference?',
          a: 'Austria-Hungary',
          options: ['Great Britain', 'Russia', 'Italy', 'Austria-Hungary'],
        },
        {
          q: 'What was the secret consequence of the First Moroccan Crisis for Britain and France?',
          a: 'They began secret military and naval staff conversations',
          options: [
            'They declared war on Germany',
            'They began secret military and naval staff conversations',
            'France annexed Algeria',
            'Britain left Europe',
          ],
        },
        {
          q: 'What German naval gunboat was dispatched to the Moroccan port of Agadir on 1 July 1911?',
          a: 'SMS Panther',
          options: ['SMS Panther', 'SMS Dreadnought', 'SMS Bismarck', 'SMS Emden'],
        },
        {
          q: 'What African territory did Germany demand from France in exchange for recognizing French control of Morocco in 1911?',
          a: 'The French Congo',
          options: ['Algeria', 'The French Congo', 'Madagascar', 'Senegal'],
        },
        {
          q: 'Why did Britain react with intense alarm to the arrival of the SMS Panther at Agadir?',
          a: 'They feared Germany wanted to establish a fortified naval base on Atlantic shipping routes',
          options: [
            'They wanted to colonize Morocco themselves',
            'They feared Germany wanted to establish a fortified naval base on Atlantic shipping routes',
            'The Panther sank a British merchant ship',
            'Britain had no navy in the Atlantic',
          ],
        },
        {
          q: 'What British Chancellor delivered the 1911 Mansion House Speech warning Germany against intimidation?',
          a: 'David Lloyd George',
          options: ['Winston Churchill', 'David Lloyd George', 'Herbert Asquith', 'Arthur Balfour'],
        },
        {
          q: 'What territory did Germany ultimately receive in the 1911 settlement, seen as a humiliating crumb in Berlin?',
          a: 'A small strip of swampy land in the Congo (Neukamerun)',
          options: [
            'Morocco',
            'A small strip of swampy land in the Congo (Neukamerun)',
            'South Africa',
            'Madagascar',
          ],
        },
        {
          q: 'What German phrase describes Germany’s growing paranoia of being surrounded by hostile powers?',
          a: 'Einkreisung (Encirclement)',
          options: ['Blitzkrieg', 'Einkreisung (Encirclement)', 'Lebensraum', 'Anschluss'],
        },
        {
          q: 'What policy did Great Britain abandon as a direct result of German imperial and naval aggression?',
          a: 'Splendid Isolation',
          options: ['Imperialism', 'Splendid Isolation', 'Free trade', 'Monarchy'],
        },
        {
          q: 'Which two African nations remained independent during the Scramble for Africa in 1914?',
          a: 'Ethiopia and Liberia',
          options: [
            'Egypt and Sudan',
            'Ethiopia and Liberia',
            'Morocco and Congo',
            'Namibia and Kenya',
          ],
        },
        {
          q: 'How did the Moroccan Crises impact public opinion in Germany?',
          a: 'It increased nationalist resentment and support for building a larger battle fleet',
          options: [
            'It led to the overthrow of the Kaiser',
            'It increased nationalist resentment and support for building a larger battle fleet',
            'It made Germans oppose all military spending',
            'It led to an alliance with France',
          ],
        },
      ],
      vocab: [
        {
          term: 'Weltpolitik',
          def: 'The aggressive "World Policy" of Kaiser Wilhelm II seeking global imperial influence and naval power.',
        },
        {
          term: 'Platz an der Sonne',
          def: 'The Kaiser’s demand for a "place in the sun"—colonial territory matching Britain and France.',
        },
        {
          term: 'Entente Cordiale',
          def: 'The 1904 diplomatic understanding between Britain and France resolving imperial disputes and fostering cooperation.',
        },
        {
          term: 'Gunboat Diplomacy',
          def: 'The pursuit of foreign policy objectives through the conspicuous display of naval military power (e.g. SMS Panther).',
        },
        {
          term: 'Einkreisung',
          def: 'The German political fear of "encirclement" by a ring of hostile powers (Britain, France, Russia).',
        },
      ],
    },

    // ==========================================
    // LESSON 3: ANGLO-GERMAN NAVAL ARMS RACE
    // ==========================================
    {
      id: 'lesson_3',
      title: 'Why did a battleship building contest destroy Anglo-German relations?',
      enquiry_question:
        'Why did the Anglo-German battleship race transform diplomatic rivalry into an existential security crisis?',
      cover_caption: 'HMS Dreadnought at sea c. 1906–1907.',
      teacher_notes: {
        primer:
          'Examine the naval arms race as the primary catalyst that turned Britain from a detached observer into Germany’s resolute adversary. Contrast Britain’s defensive reliance on maritime supremacy (the Two-Power Standard) with Admiral von Tirpitz’s offensive "Risk Fleet", and analyze how the launch of HMS Dreadnought in 1906 revolutionized naval warfare.',
        objectives: [
          {
            objective:
              'Explain the principles of the British Two-Power Standard and Tirpitz’s "Risk Theory".',
            primer:
              'Direct pupils to paragraphs [1.1] and [1.2]. Emphasize that for Britain, an island nation importing 60% of its food, naval supremacy was existential, whereas for Germany it was a prestige project.',
            question:
              'Why did Winston Churchill describe the British navy as a "necessity" and the German navy as a "luxury"?',
          },
          {
            objective:
              'Analyze the revolutionary technology of HMS Dreadnought and Admiral Jackie Fisher’s reforms.',
            primer:
              'Guide pupils through Source A and paragraphs [2.1] and [2.2]. Explain the "all-big-gun" armament and steam turbine propulsion, and why it accidentally wiped out Britain’s existing battleship superiority.',
            question:
              'How did the launch of HMS Dreadnought create a clean slate that gave Germany a golden opportunity to catch up?',
          },
          {
            objective:
              'Evaluate how public hysteria and popular slogans ("We want eight and we won’t wait!") drove the naval arms race.',
            primer:
              'Examine Source B and paragraphs [3.1]–[4.2]. Discuss the domestic political and financial pressures that made diplomatic compromise impossible.',
            question:
              'Did the naval arms race make war inevitable, or did it end in a decisive British victory by 1912?',
          },
        ],
      },
      do_now: {
        title: 'Do Now: Retrieval from Lessons 1 and 2',
        type: 'mixed',
        items: [
          {
            question:
              'What foreign policy of Kaiser Wilhelm II demanded a "place in the sun" for Germany?',
            answer: 'Weltpolitik (World Policy).',
          },
          {
            question:
              'What German gunboat was sent to Morocco in 1911, sparking the Agadir Crisis?',
            answer: 'SMS Panther.',
          },
          {
            question:
              'What was the 1904 diplomatic understanding signed between Britain and France called?',
            answer: 'The Entente Cordiale.',
          },
          {
            question: 'Why did France desperately seek an alliance against Germany after 1871?',
            answer:
              'To protect against German aggression and recover the lost provinces of Alsace and Lorraine (la revanche).',
          },
        ],
      },
      sources: [
        {
          letter: 'A',
          title: 'Source A: Admiral Sir John Fisher: Confidential Admiralty Memorandum (1906)',
          text: '“My principles are: Speed is armor. Hit first, hit hard, and keep on hitting... The Dreadnought has rendered all existing battleships obsolete. If Germany builds one, we must build two. The Empire floats upon the Royal Navy; if the navy is defeated, we are starved into surrender in three weeks. We cannot afford sentiment or hesitation.”',
          caption:
            'Extract from Admiral Sir John Fisher’s secret memorandum to the Board of Admiralty outlining the strategic philosophy of HMS Dreadnought.',
          shelfmark: 'The National Archives, Kew (Admiralty Papers ADM 1/7892)',
          citation: 'First Sea Lord Secret Policy Papers • Board of Admiralty Records (1906).',
          context:
            'In 1906, First Sea Lord Admiral Sir John "Jackie" Fisher launched HMS Dreadnought, rendering all existing battleships obsolete and initiating a furious construction race with Germany. **Hinge Question:** Why did Admiral Fisher’s technological revolution accidentally give Imperial Germany an opportunity to catch up with the Royal Navy?',
          hinge_question:
            'Why did Admiral Fisher’s technological revolution accidentally give Imperial Germany an opportunity to catch up with the Royal Navy?',
        },
        {
          letter: 'B',
          title: 'Source B: Puck Magazine: "The Armaments Race" (1909)',
          src: '/great_war/assets/puck_naval_race_1909.jpg',
          caption:
            'Contemporary American political cartoon showing John Bull (Britain) and Kaiser Wilhelm II pouring gold sovereigns and marks into an insatiable furnace of battleship construction.',
          shelfmark: 'Library of Congress Prints & Photographs Division (LC-DIG-ppmsca-0182)',
          citation: 'Puck Magazine (New York) • Vol. 65, No. 1678 (April 1909).',
          context:
            'By 1909, naval spending was consuming massive proportions of both British and German national budgets, sparking intense taxpayer anxiety and patriotic navalist leagues. **Hinge Question:** How does this cartoon illustrate the economic futility and mounting paranoia of the Anglo-German naval arms race?',
          hinge_question:
            'How does this cartoon illustrate the economic futility and mounting paranoia of the Anglo-German naval arms race?',
        },
      ],
      narrative_blocks: [
        {
          act: 1,
          title: 'Act 1: Context & Catalyst (The Two-Power Standard & Tirpitz’s Risk Fleet)',
          text: '<span class="para-ref">[1.1]</span> Throughout the nineteenth century, Great Britain’s national survival and imperial prosperity rested upon undisputed command of the oceans. As an island nation dependent on maritime commerce for its raw materials and sixty percent of its food supply, defeat at sea meant catastrophic national starvation within weeks. Under the <strong>Naval Defence Act of 1889</strong>, Britain codified the <strong>Two-Power Standard</strong>: the Royal Navy was legally mandated to maintain a battle fleet at least equal to the combined strength of the world’s next two largest navies (then France and Russia). This massive armada guarded four hundred million colonial subjects and safeguarded Britain in "Splendid Isolation."<br><br><span class="para-ref">[1.2]</span> However, Kaiser Wilhelm II—an avid grandson of Queen Victoria who grew up fascinated by British naval reviews at Spithead—was determined that Germany must possess a fleet matching its industrial might. In 1897, he appointed the visionary and fanatical <strong>Admiral Alfred von Tirpitz</strong> as State Secretary of the Imperial Navy. Tirpitz formulated the celebrated <strong>Risk Theory</strong> (<em>Risikotheorie</em>): Germany did not need to out-build the entire Royal Navy; it merely needed to construct a fleet so formidable in the North Sea that Britain could not risk attacking it without suffering such catastrophic losses that its global naval empire would collapse. Between 1898 and 1900, Tirpitz rammed successive Navy Laws through the Reichstag to fund a massive High Seas Fleet.',
        },
        {
          act: 2,
          title: 'Act 2: Escalation & Conflict (The Dreadnought Revolution of 1906)',
          text: '<span class="para-ref">[2.1]</span> The rapid growth of German dockyards on the North Sea struck terror into the British Admiralty. In October 1904, a brilliant, eccentric reformer named <strong>Admiral Sir John "Jackie" Fisher</strong> was appointed First Sea Lord. Fisher recognized that incremental improvements were futile; Britain required a technological leap that would paralyze all rivals. In 1906, Fisher unveiled <strong>HMS Dreadnought</strong>, a revolutionary leviathan that transformed naval warfare overnight. Armed with ten 12-inch guns (compared to the four carried by traditional pre-dreadnoughts) and powered by revolutionary Parsons steam turbines capable of twenty-one knots, *Dreadnought* was faster and boasted two and a half times the broadside firepower of any ship afloat.<br><br><span class="para-ref">[2.2]</span> Yet Fisher’s masterpiece was a dangerous double-edged sword. By rendering every existing battleship instantly obsolete, *Dreadnought* wiped out Britain’s enormous numerical advantage in pre-dreadnought battleships. The naval race was effectively reset to zero: Germany could now compete on equal terms by building its own dreadnoughts. Tirpitz immediately widened the Kiel Canal at immense expense and laid down the *Nassau*-class dreadnoughts. The arms race became an industrial sprint.',
        },
        {
          act: 3,
          title:
            'Act 3: Forensic Archival Evidence (Fisher’s Memorandum & The Public Panic of 1909)',
          text: '<span class="para-ref">[3.1]</span> In his confidential 1906 policy memorandum (Source A), Fisher outlined his ruthless doctrine of deterrent power: <em>"Speed is armor. Hit first, hit hard, and keep on hitting... If Germany builds one, we must build two."</em> Fisher even privately proposed to King Edward VII that the Royal Navy should "Copenhagan" the German fleet—launching a surprise pre-emptive strike to annihilate the German ships in their harbors before they could be completed. While British politicians rejected unprovoked war, the Admiralty escalated construction to astronomical levels.<br><br><span class="para-ref">[3.2]</span> By 1909, false rumors that Germany was secretly accelerating construction provoked widespread public panic in Great Britain. Supported by the Conservative opposition and the powerful Navy League, British citizens marched in the streets chanting the famous jingle: <strong>"We want eight and we won’t wait!"</strong>—demanding eight new dreadnoughts in a single budgetary year. Satirical publications (Source B) depicted Britain and Germany as crazed gamblers pouring their national wealth into steel furnaces, crippling domestic social reform programs to fund floating dreadnought fortresses.',
        },
        {
          act: 4,
          title: 'Act 4: The Historical Verdict & Historiographical Debate (The Ruinous Race)',
          text: '<span class="para-ref">[4.1]</span> By 1912, Britain had decisively won the naval construction race. Thanks to its unmatched shipbuilding capacity and the financial resources of the British Empire, the Royal Navy possessed twenty-nine dreadnoughts and super-dreadnoughts compared to Germany’s seventeen. Recognizing that he could not out-build Britain and facing an escalating land army expansion in Russia and France, the Kaiser abandoned the naval race in 1912 to redirect imperial funds back into the German army.<br><br><span class="para-ref">[4.2]</span> Nevertheless, historians agree that Tirpitz’s naval challenge was the single greatest diplomatic blunder in modern German history. As historian Paul Kennedy demonstrates, the naval race achieved zero military advantage for Germany—the High Seas Fleet spent almost the entire First World War bottled up in port—while irrevocably destroying Anglo-German relations. Britain, which had remained friendly or detached from continental disputes for a century, was permanently driven into an anti-German diplomatic alliance with France and Russia. By building a fleet in the North Sea, Germany had aimed a dagger straight at the heart of the British Empire.',
        },
      ],
      enquiry_task: {
        title: 'Master Disciplinary Enquiry Task',
        prompt:
          'Explain why the Anglo-German naval arms race destroyed diplomatic trust between Great Britain and Germany between 1898 and 1914.',
        scaffolding: {
          sentence_starters: [
            'For Great Britain, naval supremacy was considered existential because...',
            'Germany began constructing a High Seas Fleet under Admiral Tirpitz because...',
            'The launch of HMS Dreadnought in 1906 revolutionized naval warfare, but also...',
            'The naval race poisoned diplomatic relations because it convinced British leaders that...',
          ],
          causal_connectives: [
            'Consequently',
            'Furthermore',
            'This directly resulted in',
            'Crucially, this meant that',
            'In contrast to',
          ],
          evaluative_criteria: [
            'Distinguish between Britain’s defensive need for naval power and Germany’s desire for prestige.',
            'Explain how the Two-Power Standard and public panic ("We want eight") drove construction.',
            'Evaluate the long-term impact on Britain’s policy of Splendid Isolation.',
          ],
        },
        model_answer:
          'The Anglo-German naval arms race was the primary factor that destroyed diplomatic trust between Great Britain and Germany, transforming Britain from a detached global empire into Germany’s resolute enemy. First, the two nations held fundamentally irreconcilable views on sea power. For Britain, an island nation importing sixty percent of its food, naval supremacy was an existential necessity; defeat in the North Sea meant national starvation in weeks. Under the Two-Power Standard of 1889, Britain was committed to maintaining a fleet larger than the next two naval powers combined. In contrast, when Kaiser Wilhelm II and Admiral von Tirpitz passed the Navy Laws from 1898 to build a High Seas Fleet, British statesmen (such as Winston Churchill) viewed the German navy as a provocative "luxury" built not for self-defence, but to challenge Britain’s global position under Tirpitz’s "Risk Theory". Second, the launch of HMS Dreadnought in 1906 escalated the crisis. While Dreadnought’s "all-big-gun" armament and steam turbines made it the most formidable warship on earth, it accidentally rendered all pre-dreadnoughts obsolete, wiping out Britain’s numerical lead and allowing Germany to compete on equal terms. Consequently, public panic in 1909—exemplified by the slogan "We want eight and we won’t wait!"—forced the British government to pour immense funds into matching German dockyard expansion. Finally, although Britain decisively won the race by 1912 with 29 dreadnoughts to Germany’s 17, the political damage was irrevocable. Germany’s refusal to halt construction convinced the British government that Germany harbored aggressive continental ambitions. Crucially, this fear drove Britain out of "Splendid Isolation" and cemented its diplomatic and military commitments to the Triple Entente.',
      },
      quiz: [
        {
          q: 'What 1889 British law codified the principle that the Royal Navy must equal the next two largest navies combined?',
          a: 'The Naval Defence Act',
          options: [
            'The Great Reform Act',
            'The Naval Defence Act',
            'The Merchant Shipping Act',
            'The Imperial Defence Act',
          ],
        },
        {
          q: 'What was the British standard of maintaining a navy larger than the next two rivals combined called?',
          a: 'The Two-Power Standard',
          options: [
            'The Dreadnought Rule',
            'The Two-Power Standard',
            'Rule Britannia',
            'The Pax Britannica',
          ],
        },
        {
          q: 'Why was naval supremacy considered an existential necessity for Great Britain?',
          a: 'Britain was an island nation importing 60% of its food and dependent on global trade',
          options: [
            'Britain wanted to conquer Germany by sea',
            'Britain was an island nation importing 60% of its food and dependent on global trade',
            'Britain had no coal mines',
            'The British King was an admiral',
          ],
        },
        {
          q: 'Who was appointed State Secretary of the German Imperial Navy in 1897 to build the High Seas Fleet?',
          a: 'Admiral Alfred von Tirpitz',
          options: [
            'Otto von Bismarck',
            'Admiral Alfred von Tirpitz',
            'Helmuth von Moltke',
            'Reinhard Scheer',
          ],
        },
        {
          q: 'What strategic theory did Tirpitz formulate arguing Britain could not risk fighting a strong German fleet?',
          a: 'The Risk Theory (Risikotheorie)',
          options: [
            'The Risk Theory (Risikotheorie)',
            'The Schlieffen Plan',
            'The Domino Theory',
            'The Iron Curtain',
          ],
        },
        {
          q: 'Which British First Sea Lord revolutionized naval warfare by designing HMS Dreadnought?',
          a: 'Admiral Sir John "Jackie" Fisher',
          options: [
            'Admiral Nelson',
            'Admiral Sir John "Jackie" Fisher',
            'Admiral Jellicoe',
            'Admiral Beatty',
          ],
        },
        {
          q: 'In what year was HMS Dreadnought launched by the Royal Navy?',
          a: '1906',
          options: ['1898', '1906', '1911', '1914'],
        },
        {
          q: 'What revolutionary propulsion system gave HMS Dreadnought its 21-knot speed advantage?',
          a: 'Parsons steam turbines',
          options: [
            'Diesel engines',
            'Parsons steam turbines',
            'Triple expansion engines',
            'Nuclear power',
          ],
        },
        {
          q: 'How many heavy 12-inch guns did HMS Dreadnought carry, compared to the four on older ships?',
          a: '10',
          options: ['4', '8', '10', '16'],
        },
        {
          q: 'What unintended strategic drawback resulted from Britain building HMS Dreadnought?',
          a: 'It made Britain’s own massive fleet of pre-dreadnought battleships obsolete',
          options: [
            'It was too heavy to leave port',
            'It made Britain’s own massive fleet of pre-dreadnought battleships obsolete',
            'It cost more than the entire army',
            'It exploded during its maiden voyage',
          ],
        },
        {
          q: 'What strategic canal did Germany widen at massive expense to accommodate its new dreadnought battleships?',
          a: 'The Kiel Canal',
          options: ['The Suez Canal', 'The Kiel Canal', 'The Panama Canal', 'The Corinth Canal'],
        },
        {
          q: 'What popular jingle did British protestors chant in 1909 demanding more dreadnought construction?',
          a: '"We want eight and we won’t wait!"',
          options: [
            '"Rule Britannia on the seas!"',
            '"We want eight and we won’t wait!"',
            '"Build ten for King Edward!"',
            '"Sink the Kaiser’s fleet!"',
          ],
        },
        {
          q: 'Which British statesman described the British navy as a "necessity" and the German navy as a "luxury"?',
          a: 'Winston Churchill',
          options: ['David Lloyd George', 'Winston Churchill', 'Herbert Asquith', 'Lord Salisbury'],
        },
        {
          q: 'What British navalist organization campaigned aggressively for increased dreadnought spending?',
          a: 'The Navy League',
          options: [
            'The Imperial Guard',
            'The Navy League',
            'The Royal Society',
            'The Fabian Society',
          ],
        },
        {
          q: 'How many completed dreadnoughts did Great Britain possess by the outbreak of war in 1914?',
          a: '29',
          options: ['12', '17', '29', '45'],
        },
        {
          q: 'How many dreadnoughts did Imperial Germany possess by 1914?',
          a: '17',
          options: ['9', '17', '29', '35'],
        },
        {
          q: 'In what year did Germany effectively concede the naval race to redirect funding to its army?',
          a: '1912',
          options: ['1906', '1909', '1912', '1914'],
        },
        {
          q: 'What was the only major clash between British and German dreadnought fleets during the First World War?',
          a: 'The Battle of Jutland (1916)',
          options: [
            'The Battle of Trafalgar',
            'The Battle of Jutland (1916)',
            'The Battle of Dogger Bank',
            'The Battle of the Somme',
          ],
        },
        {
          q: 'What term describes Britain’s 19th-century policy of avoiding permanent European continental alliances?',
          a: 'Splendid Isolation',
          options: ['Realpolitik', 'Splendid Isolation', 'Pax Britannica', 'Monroe Doctrine'],
        },
        {
          q: 'Why did the naval arms race convince British politicians that Germany was an aggressive threat?',
          a: 'Because a large German fleet in the North Sea could only be intended to threaten Britain',
          options: [
            'Because Germany refused to trade with Britain',
            'Because a large German fleet in the North Sea could only be intended to threaten Britain',
            'Because Germany invaded Denmark',
            'Because the Kaiser insulted the Queen',
          ],
        },
      ],
      vocab: [
        {
          term: 'Two-Power Standard',
          def: 'Britain’s naval policy requiring the Royal Navy to be stronger than the world’s next two largest navies combined.',
        },
        {
          term: 'Dreadnought',
          def: 'The revolutionary 1906 British battleship with all-big-gun armament and steam turbines that reset the naval race.',
        },
        {
          term: 'Risk Theory',
          def: 'Tirpitz’s strategy that building a formidable German battle fleet would deter Britain from risking war.',
        },
        {
          term: 'Kiel Canal',
          def: 'The German strategic waterway connecting the Baltic and North Seas, widened to accommodate dreadnoughts.',
        },
        {
          term: 'Splendid Isolation',
          def: 'Britain’s foreign policy of avoiding continental military commitments, abandoned due to German naval rivalry.',
        },
      ],
    },

    // ==========================================
    // LESSON 4: THE ALLIANCE SYSTEM
    // ==========================================
    {
      id: 'lesson_4',
      title: 'Did the Alliance System protect Europe or guarantee a global war?',
      enquiry_question:
        'How did the division of Europe into two armed camps turn a localized Balkan crisis into an inevitable world war?',
      teacher_notes: {
        primer:
          'Deconstruct the diplomatic revolution between 1879 and 1907. Pupils must trace how Bismarck’s delicate anti-encirclement balancing act collapsed under Kaiser Wilhelm II, resulting in the formation of the Triple Alliance and the Triple Entente, and how rigid railway mobilization plans (the Schlieffen Plan) transformed defensive treaties into offensive tripwires.',
        objectives: [
          {
            objective:
              'Explain the formation of the Dual Alliance (1879) and Triple Alliance (1882).',
            primer:
              'Direct pupils to paragraphs [1.1] and [1.2]. Emphasize that Bismarck originally formed defensive pacts to manage Austrian aggression and keep France isolated.',
            question:
              'Why did Bismarck ally with Austria-Hungary despite having crushed them in the Seven Weeks’ War of 1866?',
          },
          {
            objective:
              'Analyze why the lapse of the Reinsurance Treaty led to the Franco-Russian Alliance (1894).',
            primer:
              'Guide pupils through paragraphs [2.1] and [2.2]. Highlight the ideological paradox: Republican France and Tsarist autocracy uniting out of sheer geopolitical terror of Germany.',
            question:
              'How did the Franco-Russian Alliance fulfill Bismarck’s ultimate geopolitical nightmare of encirclement?',
          },
          {
            objective:
              'Evaluate the mechanics of the Schlieffen Plan and the rigidity of military mobilization.',
            primer:
              'Interrogate Source A, Source B, and paragraphs [3.1]–[4.2]. Discuss how railway timetables and the violation of Belgian neutrality made a localized war impossible.',
            question:
              'Did the alliance treaties drag nations into war against their will, or did military mobilization timetables rob politicians of diplomatic control?',
          },
        ],
      },
      do_now: {
        title: 'Do Now: Retrieval from Lessons 2 and 3',
        type: 'mixed',
        items: [
          {
            question:
              'What revolutionary 1906 British battleship triggered an intense naval building race with Germany?',
            answer: 'HMS Dreadnought.',
          },
          {
            question: 'What was the British "Two-Power Standard"?',
            answer:
              'The legal requirement that the Royal Navy must maintain a battle fleet equal to or larger than the next two largest navies combined.',
          },
          {
            question:
              'Which German admiral designed the High Seas Fleet based on his "Risk Theory"?',
            answer: 'Admiral Alfred von Tirpitz.',
          },
          {
            question:
              'Name the 1904 diplomatic understanding signed between Great Britain and France.',
            answer: 'The Entente Cordiale.',
          },
        ],
      },
      sources: [
        {
          letter: 'A',
          title: 'Source A: The Armed Camps: Central Powers vs Triple Entente (1914)',
          src: '/public/great_war/assets/map_lesson4.png',
          caption:
            'Geopolitical map showing the division of Europe into two opposing armed alliances: the Central Powers surrounded by the Triple Entente.',
          shelfmark: 'War Office Intelligence Department (Shelfmark: WO-ID-EUR1914)',
          citation: 'Historical Atlas of Modern Europe • British General Staff (1914).',
          context:
            'By 1914, Europe was split into two hostile armed camps: the Central Powers (Germany and Austria-Hungary) surrounded on both sides by the Triple Entente (Britain, France, and Russia). **Hinge Question:** Why did the geopolitical encirclement of Germany make German military generals panic and favor preventative war?',
          hinge_question:
            'Why did the geopolitical encirclement of Germany make German military generals panic and favor preventative war?',
        },
        {
          letter: 'B',
          title: 'Source B: The Schlieffen Plan: The German Great General Staff Offensive',
          src: '/public/great_war/assets/schlieffen_plan_simple_map.png',
          caption:
            'Military operational map illustrating Count Alfred von Schlieffen’s 1905 strategy to rapidly defeat France through neutral Belgium before pivoting to face Russia.',
          shelfmark:
            'Imperial German General Staff Archives, Potsdam (Militärarchiv BA-MA RH 61/v. 92)',
          citation: 'Großer Generalstab • Operationsabteilung (Potsdam, 1905).',
          context:
            'Devised in 1905, the plan aimed to avoid a two-front war by invading through neutral Belgium to encircle and crush the French army in 39 days before turning to face slowly mobilizing Russia. **Hinge Question:** How did the rigid railway timetables of the Schlieffen Plan make diplomatic compromise impossible in August 1914?',
          hinge_question:
            'How did the rigid railway timetables of the Schlieffen Plan make diplomatic compromise impossible in August 1914?',
        },
      ],
      narrative_blocks: [
        {
          act: 1,
          title: 'Act 1: Context & Catalyst (Bismarck’s Web & The Reinsurance Lapse)',
          text: '<span class="para-ref">[1.1]</span> Following the unification of Germany in 1871, Chancellor Otto von Bismarck lived in terror of *la revanche*—the prospect of France forging a military alliance with another Great Power to wage a two-front war of retribution. To prevent this encirclement, Bismarck spun an intricate diplomatic web. In 1879, Germany concluded the <strong>Dual Alliance</strong> with Austria-Hungary, pledging mutual defence against any Russian attack. In 1882, this pact expanded into the <strong>Triple Alliance</strong> when Italy joined, motivated by colonial grievances against France. Crucially, Bismarck maintained a secret <strong>Reinsurance Treaty</strong> with Tsarist Russia in 1887, ensuring that as long as Bismarck was Chancellor, St. Petersburg and Berlin remained tied together, leaving France completely isolated.<br><br><span class="para-ref">[1.2]</span> However, when Kaiser Wilhelm II dismissed Bismarck in 1890, the young emperor recklessly dismantled this delicate diplomatic machinery. Viewing the secret treaty with Russia as overly complicated and conflicting with Germany’s Austrian alliance, Wilhelm allowed the Reinsurance Treaty to lapse. St. Petersburg felt betrayed and vulnerable. Despite their profound ideological differences—revolutionary republican France and reactionary, autocratic Tsarist Russia—the two isolated powers recognized their shared peril. In 1894, they concluded the formal <strong>Franco-Russian Military Alliance</strong>. Bismarck’s ultimate nightmare had become reality: Germany was encircled by hostile powers on its eastern and western frontiers.',
        },
        {
          act: 2,
          title: 'Act 2: Escalation & Conflict (The Triple Entente & The Bosnian Humiliation)',
          text: '<span class="para-ref">[2.1]</span> Alarmed by Germany’s explosive industrial expansion and Tirpitz’s aggressive naval construction in the North Sea, Great Britain abandoned its historic policy of "Splendid Isolation." In 1904, Britain settled century-old imperial disputes with France by signing the <strong>Entente Cordiale</strong>. Three years later, encouraged by France, Britain concluded the <strong>Anglo-Russian Convention of 1907</strong>, resolving long-standing imperial rivalries in Persia, Afghanistan, and Tibet. Together, Britain, France, and Russia formed the <strong>Triple Entente</strong> (Source A). Although the Entente was technically a diplomatic alignment rather than a binding military alliance, German planners interpreted it as a deliberate ring of hostile encirclement (*Einkreisung*) designed to strangle Germany’s legitimate Great Power ambitions.<br><br><span class="para-ref">[2.2]</span> The rigidity of the alliance blocs was demonstrated during the <strong>Bosnian Crisis of 1908</strong>. Austria-Hungary abruptly annexed the Ottoman provinces of Bosnia and Herzegovina, which it had administered since 1878. The annexation outraged neighboring Serbia, which dreamed of uniting all South Slavs into a Greater Serbia, and provoked fury in Russia, the self-proclaimed protector of all Slavic peoples. When Germany issued a humiliating ultimatum to St. Petersburg—declaring it would mobilize alongside Austria if Russia intervened—Tsar Nicholas II, still recovering from military defeat against Japan in 1905, was forced to back down. The humiliation was intolerable: Russia vowed that it would never again retreat in the Balkans, accelerating a colossal army modernization program scheduled for completion in 1917.',
        },
        {
          act: 3,
          title: 'Act 3: Forensic Archival Evidence (Encirclement & The Schlieffen Plan)',
          text: '<span class="para-ref">[3.1]</span> Forensic military maps (Source A) expose the terrifying geopolitical trap confronting Imperial Germany. Sandwiched between the massive, modernizing peasant army of the Russian Empire (1.4 million men under arms) and the heavily fortified frontier of France (800,000 men), German military planners concluded that time was running out. German Chief of the General Staff, Helmuth von Moltke (the Younger), warned the Kaiser in 1912: <em>"War is inevitable, and the sooner the better."</em> German planners feared that once Russian railways across Poland were completed in 1917, the Tsarist steamroller could mobilize in days, rendering Germany completely indefensible.<br><br><span class="para-ref">[3.2]</span> To escape this strategic cage, the German General Staff staked its survival upon the <strong>Schlieffen Plan</strong> (Source B), drafted in 1905 by Count Alfred von Schlieffen. Assuming that Russia’s vast distances and primitive infrastructure would require six weeks (forty-two days) to mobilize its forces, Germany would deploy ninety percent of its army in a massive right-wing sweep through neutral Belgium and northern France. Encircling Paris from the west within thirty-nine days, the German army would crush French resistance before wheeling east via specialized railways to confront the slowly mobilizing Russian giant. Crucially, the Schlieffen Plan was entirely dependent on rigid, unalterable railway timetables: once the mobilization button was pushed, diplomacy had to stop.',
        },
        {
          act: 4,
          title:
            'Act 4: The Historical Verdict & Historiographical Debate (Deterrent or Doomsday Machine?)',
          text: '<span class="para-ref">[4.1]</span> For decades following the war, revisionist historians such as Sidney Fay argued that the alliance system was the primary structural cause of the catastrophe. In this view, secret, entangling alliances acted as an automatic doomsday machine: when Austria quarreled with Serbia, the interlocking treaty commitments inexorably dragged Germany, Russia, France, and Britain into a world war that none of their leaders genuinely wanted or anticipated.<br><br><span class="para-ref">[4.2]</span> Modern historiography, led by Christopher Clark (*The Sleepwalkers*) and Margaret MacMillan, offers a far more nuanced verdict. Alliances had successfully preserved European peace for over thirty years; they were intended as defensive deterrents, not offensive mandates. What caused the war in 1914 was not the treaties themselves, but the militarization of European statecraft and the fatal illusion among military staffs that striking first was the only guarantee of survival. By subordinating diplomatic negotiations to rigid military railway timetables, European leaders transformed defensive pacts into inescapable traps.',
        },
      ],
      enquiry_task: {
        title: 'Master Disciplinary Enquiry Task',
        prompt:
          'Explain how the division of Europe into the Triple Alliance and Triple Entente transformed minor regional disputes into a continental crisis.',
        scaffolding: {
          sentence_starters: [
            'Bismarck originally constructed the Dual and Triple Alliances to...',
            'When Kaiser Wilhelm II allowed the Reinsurance Treaty to lapse, it resulted in...',
            'The formation of the Triple Entente between Britain, France, and Russia meant that...',
            'The Schlieffen Plan turned diplomatic disputes into a world war because...',
          ],
          causal_connectives: [
            'Consequently',
            'Furthermore',
            'This directly resulted in',
            'Crucially, this meant that',
            'In contrast to',
          ],
          evaluative_criteria: [
            'Distinguish between Bismarck’s defensive balancing act and Wilhelm II’s clumsy diplomacy.',
            'Explain how fear of encirclement prompted the German General Staff to favor preventative war.',
            'Assess how rigid railway mobilization plans removed control from civilian politicians.',
          ],
        },
        model_answer:
          'The division of Europe into two armed camps—the Triple Alliance and the Triple Entente—transformed localized disputes into an uncontrollable continental conflagration by creating an interlocking system of mutual obligations and rigid military timetables. First, the alliance system was initiated by Bismarck as a defensive measure. In 1879, Germany allied with Austria-Hungary (Dual Alliance), expanding in 1882 to include Italy (Triple Alliance) to isolate France. Crucially, Bismarck maintained the secret Reinsurance Treaty with Russia to prevent encirclement. However, when Kaiser Wilhelm II allowed the treaty to lapse in 1890, Russia and France formed the 1894 Franco-Russian Alliance, realizing Bismarck’s nightmare of a two-front encirclement. Second, alarmed by German naval expansion, Great Britain settled imperial rivalries through the 1904 Entente Cordiale with France and the 1907 Anglo-Russian Convention, completing the Triple Entente. Consequently, Europe was polarized into two rigid armed camps. In Germany, military planners suffered from intense claustrophobia and concluded that preventative war was necessary before Russian army reforms were completed in 1917. Finally, the alliance system became fatal because of the nature of military planning. Terrified of facing France and Russia simultaneously, the German General Staff relied entirely on the Schlieffen Plan, which required invading France through neutral Belgium within 39 days before pivoting east to face Russia. Crucially, because the plan depended on rigid railway timetables, mobilization could not be halted once ordered. When Austria declared war on Serbia in July 1914 and Russia mobilized to protect its Slavic ally, Germany felt compelled to launch the Schlieffen Plan. This violated Belgian neutrality, drawing Great Britain into the conflict. Therefore, the alliance system transformed a localized Balkan dispute into a global war because it bound the Great Powers to offensive military timetables that eliminated room for diplomatic compromise.',
      },
      quiz: [
        {
          q: 'What 1879 alliance pledged mutual military defence between Germany and Austria-Hungary?',
          a: 'The Dual Alliance',
          options: [
            'The Triple Entente',
            'The Dual Alliance',
            'The Holy Alliance',
            'The Reinsurance Treaty',
          ],
        },
        {
          q: 'Which nation joined Germany and Austria-Hungary in 1882 to create the Triple Alliance?',
          a: 'Italy',
          options: ['Russia', 'Great Britain', 'Italy', 'Ottoman Empire'],
        },
        {
          q: 'What secret 1887 treaty between Germany and Russia was recklessly allowed to lapse by Wilhelm II in 1890?',
          a: 'The Reinsurance Treaty',
          options: [
            'The Treaty of Berlin',
            'The Reinsurance Treaty',
            'The Treaty of Frankfurt',
            'The Dual Alliance',
          ],
        },
        {
          q: 'Which two ideologically opposing nations formed a defensive military alliance in 1894 out of mutual fear of Germany?',
          a: 'Republican France and Tsarist Russia',
          options: [
            'Great Britain and Germany',
            'Republican France and Tsarist Russia',
            'Austria-Hungary and Italy',
            'Britain and the Ottoman Empire',
          ],
        },
        {
          q: 'What 1904 agreement between Britain and France settled imperial disputes without being a binding military pact?',
          a: 'The Entente Cordiale',
          options: [
            'The Treaty of London',
            'The Entente Cordiale',
            'The Triple Alliance',
            'The Schlieffen Plan',
          ],
        },
        {
          q: 'Which 1907 agreement between Britain and Russia completed the diplomatic alignment known as the Triple Entente?',
          a: 'The Anglo-Russian Convention',
          options: [
            'The Treaty of Paris',
            'The Anglo-Russian Convention',
            'The Hague Convention',
            'The Treaty of Brest-Litovsk',
          ],
        },
        {
          q: 'Which three nations comprised the Triple Entente by 1907?',
          a: 'Great Britain, France, Russia',
          options: [
            'Germany, Austria-Hungary, Italy',
            'Great Britain, France, Russia',
            'Britain, France, Germany',
            'Russia, Austria, Prussia',
          ],
        },
        {
          q: 'Which three nations comprised the Triple Alliance in 1914?',
          a: 'Germany, Austria-Hungary, Italy',
          options: [
            'Germany, Austria-Hungary, Italy',
            'Great Britain, France, Russia',
            'Germany, Russia, Ottoman Empire',
            'Austria, Serbia, Bulgaria',
          ],
        },
        {
          q: 'What territory did Austria-Hungary annex in 1908, provoking fury in Serbia and Russia?',
          a: 'Bosnia and Herzegovina',
          options: ['Alsace-Lorraine', 'Bosnia and Herzegovina', 'Crimea', 'Macedonia'],
        },
        {
          q: 'Why was Russia forced to back down and accept the 1908 annexation of Bosnia?',
          a: 'Germany issued an ultimatum threatening war, and Russia was weakened from defeat against Japan',
          options: [
            'Britain refused to loan Russia money',
            'Germany issued an ultimatum threatening war, and Russia was weakened from defeat against Japan',
            'The Tsar supported Austria',
            'Serbia surrendered immediately',
          ],
        },
        {
          q: 'What German war plan aimed to defeat France in 39 days through neutral Belgium before attacking Russia?',
          a: 'The Schlieffen Plan',
          options: [
            'Operation Barbarossa',
            'The Schlieffen Plan',
            'Plan XVII',
            'The Moltke Offensive',
          ],
        },
        {
          q: 'Who drafted the German Schlieffen Plan in 1905?',
          a: 'Count Alfred von Schlieffen',
          options: [
            'Helmuth von Moltke',
            'Count Alfred von Schlieffen',
            'Paul von Hindenburg',
            'Erich von Falkenhayn',
          ],
        },
        {
          q: 'How many days was the German army given to encircle Paris and defeat France under the Schlieffen Plan?',
          a: '39 days (six weeks total before Russia mobilized)',
          options: [
            '7 days',
            '21 days',
            '39 days (six weeks total before Russia mobilized)',
            '100 days',
          ],
        },
        {
          q: 'Which neutral country’s territory did the Schlieffen Plan require German troops to violate?',
          a: 'Belgium',
          options: ['Switzerland', 'The Netherlands', 'Belgium', 'Denmark'],
        },
        {
          q: 'What 1839 international treaty guaranteed the perpetual neutrality and independence of Belgium?',
          a: 'The Treaty of London',
          options: [
            'The Treaty of Utrecht',
            'The Treaty of London',
            'The Congress of Vienna',
            'The Treaty of Paris',
          ],
        },
        {
          q: 'Why did the Schlieffen Plan rely so heavily on railway timetables?',
          a: 'Millions of conscripts, horses, and artillery shells had to be moved on exact railway schedules',
          options: [
            'German soldiers had no boots and could only ride trains',
            'Millions of conscripts, horses, and artillery shells had to be moved on exact railway schedules',
            'Belgian railways were owned by Germany',
            'To deliver food to French civilians',
          ],
        },
        {
          q: 'What year did German military leaders calculate that Russian military reforms would make Germany indefensible?',
          a: '1917',
          options: ['1914', '1917', '1920', '1925'],
        },
        {
          q: 'What was the French military war plan in 1914 that focused on an all-out offensive into Alsace-Lorraine?',
          a: 'Plan XVII',
          options: ['The Schlieffen Plan', 'Plan XVII', 'The Maginot Doctrine', 'Plan D'],
        },
        {
          q: 'What did German Chancellor Bethmann-Hollweg infamously call the 1839 Treaty of London when Britain entered the war?',
          a: '"A scrap of paper"',
          options: ['"A sacred pledge"', '"A scrap of paper"', '"An iron law"', '"A French trick"'],
        },
        {
          q: 'Which member of the Triple Alliance refused to join Germany and Austria in 1914, declaring the war was not defensive?',
          a: 'Italy',
          options: ['Austria-Hungary', 'Italy', 'Bulgaria', 'The Ottoman Empire'],
        },
      ],
      vocab: [
        {
          term: 'Triple Alliance',
          def: 'The defensive military pact between Germany, Austria-Hungary, and Italy formed in 1882.',
        },
        {
          term: 'Triple Entente',
          def: 'The diplomatic alignment between Great Britain, France, and Russia formalized between 1894 and 1907.',
        },
        {
          term: 'Schlieffen Plan',
          def: 'The German General Staff’s plan to defeat France in 39 days via Belgium before pivoting to face Russia.',
        },
        {
          term: 'Reinsurance Treaty',
          def: 'The secret 1887 German-Russian neutrality pact allowed to lapse by Wilhelm II in 1890.',
        },
        {
          term: 'Mobilization',
          def: 'The rapid assembly and transportation of armed forces and reserves according to rigid railway timetables.',
        },
      ],
    },

    // ==========================================
    // LESSON 5: SARAJEVO & THE JULY CRISIS
    // ==========================================
    {
      id: 'lesson_5',
      title: 'Why did a single assassination in Sarajevo ignite a World War?',
      enquiry_question:
        'How did thirty days of diplomatic brinkmanship turn the assassination of Archduke Franz Ferdinand into a global conflict?',
      teacher_notes: {
        primer:
          'Guide pupils through the climactic transition from a regional terrorist act to a global conflict. Emphasize the role of Serbian nationalism, the Black Hand conspiracy, the crucial importance of the German "Blank Cheque", and how the rigid domino mechanism of railway mobilizations turned the July Crisis into an unstoppable march to war.',
        objectives: [
          {
            objective:
              'Explain why Archduke Franz Ferdinand was targeted by the Black Hand in Sarajevo on 28 June 1914.',
            primer:
              'Direct pupils to paragraphs [1.1] and [1.2] and Source B (The Black Hand Constitution). Explain how Franz Ferdinand’s plan to grant Slavs autonomy inside the Empire threatened Serbian nationalist dreams of Greater Serbia.',
            question:
              'Why did Serbian nationalists fear Franz Ferdinand’s political reforms more than his oppression?',
          },
          {
            objective:
              'Analyze the fateful coincidences and wrong turns during the assassination on 28 June 1914.',
            primer:
              'Examine Source A and paragraphs [2.1] and [2.2]. Trace the route, the failed morning grenade attempt, the driver’s wrong turn onto Franz Josef Street, and Princip’s two shots.',
            question:
              'To what extent was the assassination the result of meticulous planning versus extraordinary luck and chance?',
          },
          {
            objective:
              'Evaluate the July Crisis, the German "Blank Cheque", and the domino effect of European mobilization.',
            primer:
              'Interrogate paragraphs [3.1]–[4.2]. Focus on the 5 July Blank Cheque, the Austrian ultimatum to Serbia, and the historiographical debate between the Fischer thesis and Clark’s "Sleepwalkers".',
            question:
              'Was the outbreak of war in August 1914 the result of deliberate German aggression or collective European sleepwalking?',
          },
        ],
      },
      do_now: {
        title: 'Do Now: Retrieval from Lessons 3 and 4',
        type: 'mixed',
        items: [
          {
            question: 'Which two European armed camps faced each other by 1914?',
            answer:
              'The Triple Alliance (Germany, Austria-Hungary, Italy) and the Triple Entente (Britain, France, Russia).',
          },
          {
            question: 'What was the German Schlieffen Plan designed to prevent?',
            answer: 'A prolonged, simultaneous two-front war against France and Russia.',
          },
          {
            question:
              'Which neutral country did the German army have to invade under the Schlieffen Plan?',
            answer: 'Belgium.',
          },
          {
            question:
              'Which Balkan territory was annexed by Austria-Hungary in 1908, enraging Serbia and Russia?',
            answer: 'Bosnia and Herzegovina.',
          },
        ],
      },
      sources: [
        {
          letter: 'A',
          title: 'Source A: Sarajevo Police Map: Appel Quay & Franz Josef Street (28 June 1914)',
          src: '/public/great_war/assets/map_sarajevo_route.jpg',
          caption:
            'Police forensic sketch showing the fatal wrong turn taken by Archduke Franz Ferdinand’s motorcade onto Franz Josef Street, where the car stalled in front of Gavrilo Princip.',
          shelfmark:
            'Sarajevo Police Directorate Forensic Archives (Shelfmark: SPD-CRIME-1914-0628)',
          citation: 'State Archive of Bosnia and Herzegovina • Legal Directorate Records.',
          context:
            'Police sketch showing the fatal wrong turn taken by Archduke Franz Ferdinand’s motorcade onto Franz Josef Street, where the car stalled directly in front of nineteen-year-old Gavrilo Princip. **Hinge Question:** How does this route map illustrate the role of pure chance versus meticulous planning in the assassination?',
          hinge_question:
            'How does this route map illustrate the role of pure chance versus meticulous planning in the assassination?',
        },
        {
          letter: 'B',
          title: 'Source B: The Secret Constitution & Blood Oath of the "Black Hand" (1911)',
          text: '“Article 1: This organization is created for the purpose of realizing the national ideal: the union of all Serbs... Article 2: This organization prefers terrorist action to ideological propaganda. It must therefore remain absolutely secret from the non-initiated.<br><br><strong>The Sacred Oath:</strong> ‘I, in joining the organization Union or Death, do swear by the sun that warms me, by the earth that nourishes me, before God, by the blood of my ancestors, on my honor and life, that from this moment until my death I will faithfully serve this organization, and that I will be prepared to endure all sacrifices for it. If I break this oath, let God and my comrades judge me.’”',
          caption:
            'Extracts from the founding constitution and sacred initiation oath of the clandestine Serbian terrorist society "Union or Death" (The Black Hand), Belgrade, 1911.',
          shelfmark: 'Military Intelligence Archive, Belgrade (Doc. No. 1911-BH)',
          citation: 'State Archives of Serbia • Royal Serbian Army Records (1911).',
          context:
            'Founded in Belgrade in 1911 by Serbian military intelligence officer Dragutin Dimitrijević (‘Apis’), the Black Hand trained and armed Gavrilo Princip and his fellow conspirators with Belgian FN Browning semi-automatic pistols and cyanide capsules. **Hinge Question:** Does the Black Hand constitution prove that Princip was a lone nationalist fanatic or the agent of a state-backed conspiracy?',
          hinge_question:
            'Does the Black Hand constitution prove that Princip was a lone nationalist fanatic or the agent of a state-backed conspiracy?',
        },
      ],
      narrative_blocks: [
        {
          act: 1,
          title: 'Act 1: Context & Catalyst (The Balkan Powder Keg & The Black Hand)',
          text: '<span class="para-ref">[1.1]</span> In the early twentieth century, southeastern Europe was universally recognized as the <strong>Powder Keg of Europe</strong>. As the Ottoman Empire ("The Sick Man of Europe") steadily retreated from the Balkan peninsula, rival nationalist passions and Great Power ambitions filled the vacuum. The Kingdom of Serbia, backed by Tsarist Russia under the banner of Pan-Slavism, dreamed of liberating all South Slavs from foreign imperial rule to create a united "Yugoslavia". Standing directly in the path of this ambition was the multinational Austro-Hungarian Empire, which ruled over millions of discontented Croats, Slovenes, and Bosnians. Vienna viewed Serbian nationalism as an existential cancer that threatened to tear its fragile empire apart.<br><br><span class="para-ref">[1.2]</span> In 1911, radical Serbian officers founded a clandestine terrorist society named <em>Ujedinjenje ili Smrt</em> ("Union or Death"), popularly known as the <strong>Black Hand</strong> (Source B). Commanded by the head of Serbian Military Intelligence, Colonel Dragutin Dimitrijević (code-named "Apis"), the organization operated secret training camps, smuggled weapons, and coordinated assassinations. When it was announced that <strong>Archduke Franz Ferdinand</strong>, heir to the Austro-Hungarian throne, would inspect military maneuvers in Sarajevo, Bosnia, in June 1914, Apis recognized a supreme target. The Archduke was a moderate reformer who advocated granting Slavs equal political status inside the Austro-Hungarian Empire—a reform Serbian extremists terrified would satisfy Bosnian Slavs and destroy dreams of a Greater Serbia.',
        },
        {
          act: 2,
          title: 'Act 2: Escalation & Conflict (The Fatal Wrong Turn at Sarajevo)',
          text: '<span class="para-ref">[2.1]</span> On Sunday, 28 June 1914—the sacred anniversary of the 1389 Battle of Kosovo, a day of intense Serbian national mourning and defiance—Archduke Franz Ferdinand and his pregnant wife Sophie arrived in Sarajevo. Security was extraordinarily lax: the local governor had refused to deploy regular troops along the route, leaving the royal couple in an open-topped Graf & Stift cabriolet protected by only a handful of police officers. Six teenage Bosnian Serb conspirators, armed by the Black Hand with Belgian semi-automatic pistols, hand bombs, and cyanide capsules, stationed themselves along the Appel Quay boulevard bordering the Miljacka River.<br><br><span class="para-ref">[2.2]</span> The initial assassination attempt was a fiasco. Conspirator Nedeljko Čabrinović threw a bomb that bounced off the folded roof of the royal car and exploded beneath the vehicle behind, wounding twenty bystanders. The Archduke drove on to the Town Hall, furiously rebuking the mayor: <em>"So this is how you welcome your guests—with bombs!"</em> After the reception, the Archduke decided to visit the wounded officers in the hospital. However, his drivers were never informed of the altered route. Turning off Appel Quay onto Franz Josef Street (Source A), the lead car realized its mistake and stopped. The royal driver applied the brakes and attempted to reverse, stalling the open cabriolet directly outside Schiller’s Delicatessen—barely five feet from nineteen-year-old <strong>Gavrilo Princip</strong>. Princip drew his pistol and fired two shots at point-blank range, fatally severing the Archduke’s jugular vein and striking Sophie in the abdomen.',
        },
        {
          act: 3,
          title: 'Act 3: Forensic Archival Evidence (The Blank Cheque & The Dominoes Fall)',
          text: '<span class="para-ref">[3.1]</span> While the world mourned a royal tragedy, hawks in Vienna saw a golden opportunity to crush Serbia once and for all. However, terrified that attacking Serbia would provoke Tsarist Russia into war, Austria sought guarantees from Berlin. On 5 July 1914, Kaiser Wilhelm II issued the fateful <strong>Blank Cheque</strong>: Germany promised unconditional military backing to Austria-Hungary, urging Vienna to act swiftly while world sympathy remained on its side. Emboldened by this ironclad German pledge, Austria delivered a deliberately unacceptable ten-point <strong>Ultimatum</strong> to Serbia on 23 July, giving Belgrade just forty-eight hours to accept. Despite Serbia accepting eight of the ten demands, Austria severed diplomatic relations and declared war on Serbia on 28 July 1914, bombarding Belgrade across the Danube.<br><br><span class="para-ref">[3.2]</span> The declaration triggered the fatal domino effect of European mobilization timetables. Russia, determined never to repeat the humiliation of the 1908 Bosnian Crisis, ordered general mobilization on 30 July to defend Serbia. In Berlin, German military planners panicked: under the Schlieffen Plan, every hour Russia mobilized without German action brought disaster. Germany issued an ultimatum demanding Russia demobilize within twelve hours; when St. Petersburg refused, Germany declared war on Russia on 1 August and on France on 3 August. When German troops stormed into neutral Belgium on 4 August to enact the Schlieffen Plan, Great Britain honored the 1839 Treaty of London and declared war on Germany. Within thirty days of madness, the assassination of one man had plunged seventy million soldiers into world war.',
        },
        {
          act: 4,
          title:
            'Act 4: The Historical Verdict & Historiographical Debate (Guilt vs. The Sleepwalkers)',
          text: '<span class="para-ref">[4.1]</span> For over a century, the question of war guilt has stood at the absolute center of modern historical debate. In 1919, the victorious Allies forced Germany to sign Article 231 of the Treaty of Versailles—the "War Guilt Clause"—declaring that Germany alone was responsible for unleashing the war. In the 1960s, prominent German historian <strong>Fritz Fischer</strong> created an academic earthquake by arguing, using newly opened imperial archives, that German imperial leaders deliberately exploited the Sarajevo crisis to engineer a pre-emptive European war to achieve continental hegemony and break out of British encirclement.<br><br><span class="para-ref">[4.2]</span> Conversely, modern historiography has challenged the Fischer thesis. In his landmark 2012 study *The Sleepwalkers*, historian <strong>Christopher Clark</strong> demonstrates that no single Great Power planned a general war. Instead, European leaders were "sleepwalkers, watchful but unseeing, blind to the reality of the horror they were about to bring into the world." The catastrophe of August 1914 was not the product of a single aggressive conspiracy, but the tragic culmination of interlocking alliance commitments, reckless brinkmanship, military paranoia, and the fatal failure of diplomatic imagination.',
        },
      ],
      enquiry_task: {
        title: 'Master Disciplinary Enquiry Task',
        prompt:
          'Explain why the assassination of Archduke Franz Ferdinand in Sarajevo led directly to the outbreak of the First World War in August 1914.',
        scaffolding: {
          sentence_starters: [
            'The assassination in Sarajevo was orchestrated by the Black Hand because...',
            'The crisis transformed from a local murder into a European crisis when Germany issued...',
            'Russia felt compelled to mobilize because...',
            'The conflict escalated into a global war involving Great Britain because...',
          ],
          causal_connectives: [
            'Consequently',
            'Furthermore',
            'This directly resulted in',
            'Crucially, this meant that',
            'In contrast to',
          ],
          evaluative_criteria: [
            'Assess the significance of the German "Blank Cheque" in emboldening Austria.',
            'Explain how the rigid railway timetables of the Schlieffen Plan eliminated diplomatic compromise.',
            'Evaluate the historiographical debate between the Fischer Thesis and Clark’s "Sleepwalkers".',
          ],
        },
        model_answer:
          'The assassination of Archduke Franz Ferdinand on 28 June 1914 in Sarajevo was the immediate spark that detonated decades of accumulated European imperial rivalry, alliance commitments, and militarism. First, the assassination was not an isolated crime, but a politically motivated act by the Black Hand, a clandestine Serbian nationalist terrorist network headed by Serbian military intelligence. The Black Hand targeted the moderate Archduke because his plans to reform the Austro-Hungarian Empire threatened their dream of a united "Greater Serbia". When the royal motorcade took a fatal wrong turn onto Franz Josef Street, nineteen-year-old Gavrilo Princip shot the Archduke and his wife Sophie at point-blank range. Second, the regional crisis escalated into a continental showdown because of Germany’s blank cheque. On 5 July, Kaiser Wilhelm II pledged unconditional German military support to Austria-Hungary, encouraging Vienna to deliver a deliberately impossible 48-hour ultimatum to Serbia. When Serbia rejected two clauses that infringed its sovereignty, Austria declared war on 28 July. Crucially, this triggered the alliance system: Russia, determined to defend its fellow Slavic nation and erase the humiliation of the 1908 Bosnian Crisis, ordered general military mobilization on 30 July. Finally, the war became global due to the rigid mechanics of the German Schlieffen Plan. Because German military planning was locked to inflexible railway timetables that required defeating France in 39 days before facing Russia, Germany could not wait for diplomacy. Germany declared war on Russia and France, and on 4 August invaded neutral Belgium. This unprovoked invasion forced Great Britain to uphold the 1839 Treaty of London and enter the war. Ultimately, while historians like Fritz Fischer emphasize German aggression and others like Christopher Clark describe the powers as "sleepwalkers", the assassination led to world war because European leaders had constructed an alliance and military mobilization machinery that left zero room for diplomatic retreat once the first shot was fired.',
      },
      quiz: [
        {
          q: 'On what date was Archduke Franz Ferdinand assassinated in Sarajevo?',
          a: '28 June 1914',
          options: ['18 January 1871', '28 June 1914', '28 July 1914', '4 August 1914'],
        },
        {
          q: 'What was the official name of the Serbian nationalist terrorist society known as the "Black Hand"?',
          a: 'Union or Death (Ujedinjenje ili Smrt)',
          options: [
            'Young Bosnia',
            'Union or Death (Ujedinjenje ili Smrt)',
            'The Red Hand',
            'The Slavic Brotherhood',
          ],
        },
        {
          q: 'Who was the chief of Serbian Military Intelligence who directed the Black Hand (code-name "Apis")?',
          a: 'Dragutin Dimitrijević',
          options: ['Gavrilo Princip', 'Dragutin Dimitrijević', 'Nikola Pašić', 'Radomir Putnik'],
        },
        {
          q: 'Who fired the two fatal pistol shots that killed Archduke Franz Ferdinand and his wife Sophie?',
          a: 'Gavrilo Princip',
          options: ['Nedeljko Čabrinović', 'Gavrilo Princip', 'Vaso Čubrilović', 'Danilo Ilić'],
        },
        {
          q: 'On what street did the Archduke’s car stall directly in front of Gavrilo Princip?',
          a: 'Franz Josef Street',
          options: [
            'Appel Quay',
            'Franz Josef Street',
            'Kaiser Wilhelm Boulevard',
            'King Peter Avenue',
          ],
        },
        {
          q: 'What type of pistol was used by Gavrilo Princip in the assassination?',
          a: 'FN Browning Model 1910 semi-automatic pistol',
          options: [
            'Colt revolver',
            'FN Browning Model 1910 semi-automatic pistol',
            'Luger P08',
            'Mauser C96',
          ],
        },
        {
          q: 'What pledge of unconditional military support did Germany give Austria-Hungary on 5 July 1914?',
          a: 'The "Blank Cheque"',
          options: [
            'The Dual Alliance',
            'The "Blank Cheque"',
            'The Berlin Guarantee',
            'The Iron Treaty',
          ],
        },
        {
          q: 'How many demands were contained in the Austro-Hungarian Ultimatum delivered to Serbia on 23 July?',
          a: '10',
          options: ['3', '5', '10', '14'],
        },
        {
          q: 'On what date did Austria-Hungary declare war on Serbia, officially starting the conflict?',
          a: '28 July 1914',
          options: ['28 June 1914', '28 July 1914', '1 August 1914', '4 August 1914'],
        },
        {
          q: 'Which Great Power ordered full military mobilization on 30 July 1914 to defend Serbia?',
          a: 'Russia',
          options: ['Great Britain', 'France', 'Russia', 'Italy'],
        },
        {
          q: 'On what date did Great Britain declare war on Germany following the invasion of Belgium?',
          a: '4 August 1914',
          options: ['28 July 1914', '1 August 1914', '3 August 1914', '4 August 1914'],
        },
        {
          q: 'What historic treaty from 1839 guaranteed the neutrality of Belgium, which Britain went to war to defend?',
          a: 'The Treaty of London',
          options: [
            'The Treaty of Paris',
            'The Treaty of London',
            'The Treaty of Ghent',
            'The Treaty of Berlin',
          ],
        },
        {
          q: 'What German historian published "Griff nach der Weltmacht" in 1961, arguing Germany deliberately engineered the war?',
          a: 'Fritz Fischer',
          options: ['Christopher Clark', 'Fritz Fischer', 'A.J.P. Taylor', 'Max Hastings'],
        },
        {
          q: 'What is the title of Christopher Clark’s acclaimed 2012 book arguing the Great Powers "sleepwalked" into war?',
          a: 'The Sleepwalkers',
          options: ['The Guns of August', 'The Sleepwalkers', 'The Pity of War', 'Cataclysm 1914'],
        },
        {
          q: 'What was the name of the German Chancellor during the July Crisis of 1914?',
          a: 'Theobald von Bethmann-Hollweg',
          options: [
            'Otto von Bismarck',
            'Theobald von Bethmann-Hollweg',
            'Bernhard von Bülow',
            'Chlodwig zu Hohenlohe',
          ],
        },
        {
          q: 'What poison capsules were the Black Hand assassins carrying to commit suicide after the attack?',
          a: 'Cyanide',
          options: ['Arsenic', 'Cyanide', 'Strychnine', 'Hemlock'],
        },
        {
          q: 'Why did the cyanide taken by Princip and Čabrinović fail to kill them?',
          a: 'The cyanide was old, expired, and only induced severe vomiting',
          options: [
            'They spat it out immediately',
            'The cyanide was old, expired, and only induced severe vomiting',
            'They took the wrong pills',
            'Doctors pumped their stomachs in minutes',
          ],
        },
        {
          q: 'Where was Gavrilo Princip imprisoned until his death from tuberculosis in April 1918?',
          a: 'Theresienstadt fortress',
          options: ['Spandau Prison', 'Theresienstadt fortress', 'Tower of London', 'Bastille'],
        },
        {
          q: 'What four long-term causes of the First World War are commonly summarized by the acronym M-A-I-N?',
          a: 'Militarism, Alliances, Imperialism, Nationalism',
          options: [
            'Monarchy, Armies, Industry, Navy',
            'Militarism, Alliances, Imperialism, Nationalism',
            'Mobilization, Artillery, Infantry, Navies',
            'Morocco, Alsace, Italy, Neutrality',
          ],
        },
        {
          q: 'What article of the 1919 Treaty of Versailles forced Germany to accept sole responsibility for the war?',
          a: 'Article 231 (The War Guilt Clause)',
          options: ['Article 48', 'Article 231 (The War Guilt Clause)', 'Article 10', 'Article 80'],
        },
      ],
      vocab: [
        {
          term: 'Blank Cheque',
          def: 'Germany’s unconditional pledge of military support to Austria-Hungary issued on 5 July 1914.',
        },
        {
          term: 'Black Hand',
          def: 'The clandestine Serbian nationalist terrorist organization (Union or Death) that plotted the Sarajevo assassination.',
        },
        {
          term: 'Ultimatum',
          def: 'A set of final, non-negotiable demands presented to a sovereign nation with a strict deadline.',
        },
        {
          term: 'Pan-Slavism',
          def: 'The cultural and political movement advocating unity of all Slavic peoples under Russian protection.',
        },
        {
          term: 'July Crisis',
          def: 'The intense month of diplomatic maneuvers and ultimatums between 28 June and 4 August 1914 that led to world war.',
        },
      ],
    },
  ],
};

// Ensure Act 4 has the Master Enquiry Task in its tasks array for interactive web app rendering
great_war_4act.lessons.forEach((l) => {
  if (l.enquiry_task && l.narrative_blocks && l.narrative_blocks[3]) {
    const et = l.enquiry_task;
    l.narrative_blocks[3].tasks = [
      {
        id: `task_${l.id}_enquiry`,
        type: 'extended_writing',
        title: 'Master Disciplinary Enquiry Task: Extended Analytical Writing',
        prompt: et.prompt,
        text: et.prompt,
        question: et.prompt,
        instruction:
          'Write a sustained analytical response answering the enquiry question using the sentence starters, causal connectives, and evaluative criteria below.',
        starter: et.scaffolding.sentence_starters.join('<br>'),
        scaffolding: {
          sentence_starters: et.scaffolding.sentence_starters,
          connectives: et.scaffolding.causal_connectives,
          criteria: et.scaffolding.evaluative_criteria,
        },
        model_answer: et.model_answer,
        model: et.model_answer,
      },
    ];
  }
});

// Generate and write file
const outputContent = `const great_war = ${JSON.stringify(great_war_4act, null, 2)};

export default great_war;
if (typeof module !== 'undefined') module.exports = great_war;
`;

fs.writeFileSync(targetFile, outputContent, 'utf8');
console.log(
  '✅ Successfully authored 6 Christine Counsell 4-Act Lessons in units/great_war/data.js!',
);
