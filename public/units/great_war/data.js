const unitData = {
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
    {
      id: 'lesson_1',
      causal_domino_spine: {
        title: 'German Unification & Alsace-Lorraine: Chronology Spine',
        subtitle: 'Key Turning Points & Causal Dominoes (M-A-I-N Framework)',
        stages: [
          {
            step: 1,
            para_ref: '[1.1]',
            date: '1862–1866',
            title: 'Prussian Rise & "Blood and Iron"',
            actor: 'Kingdom of Prussia',
            tag: '🚩 NATIONALISM',
            trigger:
              'Chief Minister Otto von Bismarck uses military expansion and short wars against Denmark and Austria to unite northern German states under Prussian dominance.',
            connective:
              'Shattered the traditional European balance of power, deeply alarming France who feared a powerful united neighbour on its eastern border.',
            question: 'What enabled Prussia to overturn the 1815 balance of power?',
          },
          {
            step: 2,
            para_ref: '[1.2]',
            date: 'September 1870',
            title: 'The Battle of Sedan & French Defeat',
            actor: 'Prussia & France',
            tag: '🎖️ MILITARISM',
            trigger:
              'Prussian armies encircle the French army at Sedan, capturing Emperor Napoleon III and 100,000 troops in a crushing French defeat.',
            connective:
              'Toppled the French imperial government, leaving Paris under siege and compelling southern German states to join the new Empire.',
            question: 'How was the German Empire proclaimed at Versailles in 1871?',
          },
          {
            step: 3,
            para_ref: '[1.3]',
            date: 'Jan–May 1871',
            title: 'Hall of Mirrors & Alsace-Lorraine Seized',
            actor: 'The German Empire',
            tag: '🚩 NATIONALISM',
            trigger:
              "Wilhelm I is proclaimed German Kaiser in Versailles' Hall of Mirrors; Germany annexes mineral-rich Alsace-Lorraine and imposes a 5 billion franc indemnity.",
            connective:
              'Inflicted deep national humiliation on France, creating permanent resentment and an unshakeable national obsession with revenge.',
            question: 'Why did the annexation of Alsace-Lorraine shatter peace?',
          },
          {
            step: 4,
            para_ref: '[1.4]',
            date: '1871–1889',
            title: 'The Cult of French "Revanche"',
            actor: 'The French Republic',
            tag: '🚩 NATIONALISM',
            trigger:
              'French schools, politics, and culture rally around "Revanche" (revenge)—a national determination to reclaim Alsace-Lorraine from Germany.',
            connective:
              'Convinced German leaders that France was a permanent enemy who would attack the moment an alliance was formed.',
            question: 'In what ways did French "Revanche" shape patriotic culture?',
          },
          {
            step: 5,
            para_ref: '[1.5]',
            date: '1873–1890',
            title: "Bismarck's Web & Two-Front Dread",
            actor: 'Chancellor Bismarck',
            tag: '🤝 ALLIANCES',
            trigger:
              'Bismarck constructs complex treaties (Dual Alliance, Reinsurance Treaty) to keep France isolated and avoid a two-front war with Russia.',
            connective:
              'Maintained fragile peace until Wilhelm II abandoned Russia in 1890, opening the door for rival European alliance blocs.',
            question: "Evaluate how Bismarck's diplomacy isolated the French Republic.",
          },
        ],
      },
      video: [
        {
          url: 'https://www.youtube.com/watch?v=-PAEmgYv0DE',
          title: 'German Unification and Empire - History in 5 Minutes',
          duration: '5 mins 21 secs',
          teacher_guidance:
            'Crisp curriculum summary of Bismarck\'s "Blood and Iron" strategy, the three wars of unification, and the proclamation of the German Empire in the Hall of Mirrors.',
        },
        {
          url: 'https://www.youtube.com/watch?v=j1Yk0lzV40Q',
          title: 'The Franco Prussian War - History Matters (Short Animated Documentary)',
          duration: '3 mins 49 secs',
          teacher_guidance:
            'Fast-paced animated breakdown of the Ems Telegram, the Battle of Sedan, and the loss of Alsace-Lorraine creating French revanchism.',
        },
        {
          url: 'https://www.youtube.com/watch?v=o_PKusG7NFs',
          title: 'The Great War: What Made Germany So Successful Before World War 1?',
          duration: '23 mins 7 secs',
          teacher_guidance:
            'In-depth documentary exploring German industrial supremacy, military mobilization systems, and Bismarckian diplomacy.',
        },
        {
          url: 'https://www.youtube.com/watch?v=xVISzFmBiPU',
          title: 'How Prussia Ended The French Empire: Franco-Prussian War | Animated History',
          duration: '27 mins 56 secs',
          teacher_guidance:
            'Comprehensive military and political analysis of the Franco-Prussian War and the collapse of Napoleon III.',
        },
      ],
      skill: 'Change & Continuity: Balance of Power & Revanche',
      title: 'Enquiry 1: German Unification, Franco-Prussian War & Bismarck (1871–1890)',
      subtitle: 'From Blood & Iron to the Hall of Mirrors and the Seizure of Alsace-Lorraine',
      enquiryQuestion:
        'How did the creation of the German Empire and the seizure of Alsace-Lorraine permanently rupture European peace?',
      a4_map: ['/images/german_empire_1871.png', '/images/modern_germany_map.png'],
      margin_spine: [
        {
          year: '1862–1866',
          label: 'Balance of Power',
        },
        {
          year: '1870–1871',
          label: 'Versailles Proclamation',
        },
        {
          year: 'May 1871',
          label: 'Alsace-Lorraine Annexed',
        },
        {
          year: '1871–1889',
          label: 'French Revanche',
        },
        {
          year: '1871–1890',
          label: 'Bismarckian Isolation',
        },
      ],
      teacher_notes: {
        primer:
          'This enquiry introduces students to the foundational geopolitical shockwave of modern European history: the creation of a unified, militaristic German Empire in 1871. Students examine how Otto von Bismarck used three calculated wars to unite 39 sovereign states under Prussian dominance, culminated in the coronation of Kaiser Wilhelm I inside the Hall of Mirrors at Versailles, and provoked permanent French hostility through the annexation of Alsace-Lorraine. The enquiry concludes by examining Bismarck’s intricate web of defensive alliances designed to isolate France and prevent Germany’s strategic nightmare: a two-front encirclement.',
        objectives: [
          {
            objective:
              "Understand how Otto von Bismarck used 'blood and iron' and the Franco-Prussian War to unify the German states.",
            primer:
              'Focus on paragraphs [1.1] and [1.2]. Emphasize that Bismarck rejected liberal parliamentary democracy in favor of military force, railway mobilization, and Krupp steel artillery.',
            question:
              "What did Bismarck mean by 'iron and blood', and why did crowning the Kaiser at Versailles deliberately humiliate France?",
          },
          {
            objective:
              "Analyze why the annexation of Alsace-Lorraine created permanent French 'Revanche' and shattered the European balance of power.",
            primer:
              "Direct students to paragraphs [1.3] and [1.4] alongside Bettannier’s painting 'La Tache Noire'. Show how losing border fortress cities and coalfields turned revenge into a civic religion.",
            question:
              'Why was the annexation of Alsace-Lorraine a far more dangerous penalty than the 5 billion gold franc indemnity?',
          },
          {
            objective:
              "Evaluate how Bismarck's post-1871 alliance system sought to prevent a two-front encirclement.",
            primer:
              'Focus on paragraph [1.5]. Explain Gordon Craig’s paradox: seizing Alsace-Lorraine gave Germany fortified borders but trapped it in permanent strategic paranoia.',
            question:
              'Why was maintaining friendship with Russia Bismarck’s supreme foreign policy rule after 1871?',
          },
        ],
        source_context:
          'Anton von Werner’s iconic oil painting depicts the proclamation of the German Empire on 18 January 1871 in the Hall of Mirrors at Versailles. Commissioned by the Prussian royal family for Bismarck’s 70th birthday, Werner places Bismarck in immaculate white at the visual centre of the composition, symbolizing that the Empire was forged not through democratic consensus, but through Prussian military dominance. **Hinge Question:** Why did Anton von Werner place Chancellor Otto von Bismarck in pure white at the visual centre of the painting, rather than Kaiser Wilhelm I on the raised dais?',
      },
      do_now: {
        title: 'Do Now: Foundations of European Power',
        type: 'mixed',
        items: [
          {
            question:
              'How many sovereign states formed the German Confederation before unification in 1871?',
            answer: '39 states',
          },
          {
            question: 'What was the Prussian-led customs union established in 1834 called?',
            answer: 'The Zollverein',
          },
          {
            question:
              'Which Prussian Minister-President famously declared that questions would be settled by "iron and blood"?',
            answer: 'Otto von Bismarck',
          },
          {
            question: 'In what year was the Franco-Prussian War fought?',
            answer: '1870–1871',
          },
          {
            question: 'What is meant by the diplomatic term "Balance of Power"?',
            answer:
              'An international system where power is distributed roughly equally among Great Powers, preventing any single state from dominating.',
          },
        ],
      },
      vocab: [
        {
          term: 'Realpolitik',
          definition:
            'Ruthless, practical statecraft based on national self-interest, industrial power, and military force rather than moral ideals.',
        },
        {
          term: 'Revanche',
          definition:
            'The deep-seated French national desire for vengeance against Germany and the recovery of Alsace-Lorraine following the 1871 defeat.',
        },
        {
          term: 'Zollverein',
          definition:
            'The Prussian-led customs union formed in 1834 that created economic unity among German states while excluding Austria.',
        },
        {
          term: 'Alsace-Lorraine',
          definition:
            'Mineral-rich French border provinces containing major iron-ore deposits and textile industries annexed by Germany in 1871.',
        },
        {
          term: 'Reinsurance Treaty',
          definition:
            'A secret 1887 defensive agreement between Germany and Russia pledging benevolent neutrality if either faced war, preventing encirclement.',
        },
      ],
      narrative_blocks: [
        {
          act: 1,
          title: 'The Fragmented Chessboard, Zollverein & Prussian Power (1862–1866)',
          text: '<span class="para-ref">[1.1]</span> Before 1871, Central Europe was deeply divided. In 1815, the Congress of Vienna organized the region into <strong>thirty-nine independent states (39 independent states)</strong>. Two rival powers competed for control. Catholic Austria ruled a vast, multinational empire. In contrast, Protestant <strong>Prussia</strong> was a disciplined military powerhouse, rich in coal, railways, and Krupp steel.<br><br><span class="para-ref">[1.2]</span> In 1834, Prussia launched the <strong>Zollverein</strong> (Customs Union). This agreement removed internal taxes between German states while deliberately locking out Austria. German trade boomed on Prussian railways. In 1862, <strong>Otto von Bismarck</strong> became Prussian Minister-President. Bismarck bypassed parliament and declared his ruthless philosophy: <em>"The great questions of the day will not be decided by speeches and majority votes... but by iron and blood."</em> Practicing pure <em>Realpolitik</em>, Bismarck led Prussia to swift military victories over Denmark in 1864 and Austria in 1866.',
          source: {
            letter: 'A',
            title: 'Source A (Cartographic Record): The German Empire in Central Europe (1871)',
            image: '/images/german_empire_1871.png',
            is_artwork: false,
            caption:
              'Geopolitical map showing the unification of thirty-nine sovereign German states into the German Empire under Prussian leadership in 1871.',
            citation: 'Prussian State Library, Map Department (1871).',
            context:
              'Following the 1871 Treaty of Frankfurt, thirty-nine previously independent German states united under Prussian leadership to form the German Empire, creating an economic and military powerhouse in the center of Europe.',
            hinge_question:
              'How did the sudden emergence of a unified German Empire fundamentally shatter the European balance of power?',
          },
        },
        {
          act: 2,
          title: 'The Sedan Debacle & Proclamation at Versailles (1870–1871)',
          text: '<span class="para-ref">[1.2]</span> To unite the southern German states with Prussia, Bismarck needed a common enemy. In July 1870, he edited the famous <strong>Ems Telegram</strong> to make it look like King Wilhelm I had insulted the French ambassador. Furious, Emperor Napoleon III declared war. France was completely unprepared. Prussian railways and heavy Krupp artillery crushed French defenses. On 1 September 1870, German forces encircled the French army at the <strong>Battle of Sedan</strong>, capturing Napoleon III and 104,000 soldiers.<br><br><span class="para-ref">[1.3]</span> The French government refused to surrender, triggering the brutal <strong>Siege of Paris</strong>. Starving citizens survived by eating horses and zoo animals. On <strong>18 January 1871</strong>, Bismarck delivered the ultimate humiliation. Inside the famous <strong>Hall of Mirrors at the Palace of Versailles</strong>, German princes proclaimed King Wilhelm I the first German Emperor (Kaiser). The German Empire was forged through war.',
          source: {
            letter: 'B',
            title:
              'Source B (Primary Oil Painting): Anton von Werner, The Proclamation of the German Empire at Versailles (18 January 1871)',
            image: '/images/werner_versailles_1871_highres.jpg',
            is_artwork: true,
            caption:
              'Anton von Werner (1885 Friedrichsruh version): Grand Duke Frederick I of Baden leads German princes and officers in cheering the newly proclaimed Kaiser Wilhelm I on the dais in the Hall of Mirrors at Versailles, while Chancellor Otto von Bismarck stands prominently in his white Cuirassier uniform holding the imperial proclamation.',
            citation:
              'Anton von Werner, Die Proklamierung des deutschen Kaiserreiches (18. Januar 1871), 1885, Oil on canvas, Bismarck-Museum Friedrichsruh.',
            context:
              'Staged deliberately inside Louis XIV’s royal palace during the siege of Paris, this coronation solemnized the unification of Germany on conquered French territory. Werner places Chancellor Otto von Bismarck in pure white at the optical centre of the hall, emphasizing that the Empire was forged not through popular democracy, but through Bismarckian military statecraft.',
            hinge_question:
              'Why did Anton von Werner place Chancellor Otto von Bismarck in pure white at the visual centre of the painting, rather than Kaiser Wilhelm I on the raised dais?',
          },
        },
        {
          act: 3,
          title: 'The Treaty of Frankfurt & Annexation of Alsace-Lorraine (May 1871)',
          text: '<span class="para-ref">[1.3]</span> In May 1871, the two nations signed the <strong>Treaty of Frankfurt</strong>. German leaders designed the treaty to crush French military power. France had to pay a massive fine of <strong>five billion gold francs (5 billion gold francs)</strong>. German occupation troops remained on French soil until every centime was paid. Even worse was the territorial loss: Germany seized the border provinces of <strong>Alsace</strong> and <strong>Lorraine</strong>.<br><br><span class="para-ref">[1.4]</span> This annexation tore away 1.6 million French citizens and vital iron-ore basins. The ancient fortress city of Metz and the cathedral city of Strasbourg became fortified German strongholds. Overnight, forty-one million people and the Krupp arms foundries merged into a giant military empire. A united Germany now stood at the heart of Europe.',
          source: {
            letter: 'C',
            title: 'Source C (Cartographic Record): The Annexation of Alsace-Lorraine (1871)',
            image: '/units/great_war/assets/alsace_lorraine_1871_map.png',
            is_artwork: false,
            caption:
              'Map detailing the territorial amputation of Alsace and northern Lorraine transferred to the German Empire under the 1871 Treaty of Frankfurt.',
            citation: 'Department Cartographic Collection (1871).',
            context:
              'The annexation pushed Germany’s western frontier to the Vosges Mountains and absorbed France’s richest iron deposits, permanently poisoning Franco-German relations.',
            hinge_question:
              'Why did the annexation of Alsace-Lorraine prove far more damaging to long-term European peace than the 5 billion gold franc indemnity?',
          },
        },
        {
          act: 4,
          title: 'French Revanche & The Cult of the Lost Provinces (1871–1889)',
          text: '<span class="para-ref">[1.4]</span> Losing Alsace-Lorraine deeply scarred the French nation for over forty years. In Paris, the statue of Strasbourg on the Place de la Concorde was draped in black mourning cloth. French schools taught generations of boys that their greatest duty was <strong>Revanche</strong> (revenge)—the recovery of their lost land.<br><br><span class="para-ref">[1.5]</span> In classrooms, wall maps showed Alsace-Lorraine shaded pitch-black as the <em>"tache noire"</em> (black spot). France introduced compulsory military training, and children practiced military marching in school drills. As French statesman Léon Gambetta declared: <em>"Think of it always; speak of it never."</em> No French politician could ever make peace with Berlin while German troops occupied Strasbourg and Metz.',
          source: {
            letter: 'D',
            title:
              'Source D (Visual Record): Albert Bettannier, La Tache Noire (The Black Spot, 1887)',
            image: '/units/great_war/assets/la_tache_noire_1887.jpg',
            is_artwork: true,
            caption:
              'Albert Bettannier’s iconic 1887 oil painting (Musée d’Orsay) depicting a French schoolmaster in a black coat pointing with a wooden pointer to the blacked-out region of Alsace-Lorraine on a classroom map of France, instructing a young pupil in a cadet uniform.',
            citation:
              "Albert Bettannier, La Tache Noire (The Black Spot), 1887, Oil on canvas, Musée d'Orsay, Paris.",
            context:
              'Painted sixteen years after the Franco-Prussian War, this image shows how French state schools systematically prepared an entire generation of boys for a war of revenge to reclaim their lost provinces.',
            hinge_question:
              'How does Bettannier use the classroom setting to prove that the Franco-Prussian War of 1871 had not truly ended?',
          },
        },
        {
          act: 5,
          title: 'Bismarckian Isolation, The Reinsurance Treaty & Two-Front Dread (1871–1890)',
          text: '<span class="para-ref">[1.5]</span> British statesman <strong>Benjamin Disraeli</strong> warned Parliament that German unification had destroyed the balance of power. Bismarck knew France would never forgive its defeat. For the next twenty years, Bismarck had one central goal: <strong>keep France diplomatically isolated to protect German peace</strong>.<br><br><span class="para-ref">[1.6]</span> Germany dreaded a <strong>war on two fronts (encirclement)</strong>, attacked by France from the west and Russia from the east. To prevent this, Bismarck built a network of defensive alliances. His masterpiece was the secret 1887 <strong>Reinsurance Treaty</strong> with Russia, promising neutrality if either empire faced war. Bismarck\'s diplomacy kept Europe peaceful. However, in 1888, the impetuous young <strong>Kaiser Wilhelm II</strong> took power. In 1890, Wilhelm fired Bismarck and let the Russian treaty lapse. Germany had stepped onto the path toward dangerous two-front encirclement.',
        },
      ],
      pair_share: {
        prompt:
          "Discuss with your partner: Was the German Empire created 'from below' by the people or 'from above' by military force and statecraft?",
        think: 'Spend 1 minute quietly considering the question and forming your own opinion.',
        pair: 'Discuss your thoughts with your partner. Identify where your ideas agree and where they differ.',
        share: "Share your pair's combined conclusion with the class.",
      },
      tasks: [
        {
          type: 'extended_writing',
          topic: 'Question 2: Explain Why [12 marks • 15 mins]',
          question:
            'Explain why the creation of the German Empire in 1871 created long-term instability in Europe. [12 marks]',
          stimulus: ['The annexation of Alsace-Lorraine', 'Bismarck’s dread of a two-front war'],
          hints: [
            {
              label: 'Point',
              prompt:
                'State a clear causal factor (e.g. the annexation of Alsace-Lorraine or Bismarck’s dread of a two-front war) that destabilised the European balance of power.',
            },
            {
              label: 'Evidence',
              prompt:
                'Deploy precise factual evidence: the 1871 Treaty of Frankfurt, the 5 billion franc indemnity, French revanchism, or the 1887 Reinsurance Treaty.',
            },
            {
              label: 'Explanation',
              prompt:
                'Analyse HOW this factor generated permanent diplomatic paranoia, forced military alliances, or shattered the 1815 Congress of Vienna balance of power.',
            },
            {
              label: 'Link',
              prompt:
                'Connect directly back to the question stem, demonstrating why this long-term instability set Europe on an inevitable path toward military conflict.',
            },
          ],
          scaffolding: {
            structure_strip: [
              {
                col: 'Paragraph 1: Alsace-Lorraine & Revanche',
                prompt:
                  'Explain how the annexation of Alsace-Lorraine under the Treaty of Frankfurt permanently poisoned Franco-German relations.',
                starter:
                  'A decisive factor creating long-term European instability was the annexation of Alsace-Lorraine in 1871...',
              },
              {
                col: 'Paragraph 2: Two-Front War & Alliances',
                prompt:
                  'Explain how Bismarck’s dread of a two-front war led to a complex web of secret defensive alliances that divided Europe.',
                starter:
                  'Furthermore, German foreign policy was dominated by Bismarck’s existential dread of a two-front war...',
              },
              {
                col: 'Paragraph 3: European Balance of Power',
                prompt:
                  'Explain how the sudden rise of a massive, industrialised German Empire overturned the 1815 Congress of Vienna balance of power.',
                starter:
                  'Ultimately, the fundamental cause of instability was the rupture of the traditional European balance of power...',
              },
            ],
            sentence_starters: [
              'A decisive factor creating long-term instability was...',
              'This rupture was intensified by the Treaty of Frankfurt because...',
              'In France, this triggered the cult of "Revanche", meaning that...',
              'To prevent encirclement, Bismarck attempted to isolate France through...',
              'Consequently, the creation of the German Empire divided Europe into...',
            ],
            connective_bank: [
              'A decisive factor was...',
              'This led directly to...',
              'Furthermore...',
              'In consequence of this...',
              'Ultimately, this meant that...',
            ],
            word_bank: [
              'Otto von Bismarck',
              'Realpolitik',
              'Blood and Iron',
              'Hall of Mirrors',
              'Treaty of Frankfurt',
              'Alsace-Lorraine',
              'Revanche',
              'Balance of Power',
              'Two-Front War',
            ],
          },
          model_answer:
            'The creation of the German Empire in 1871 created profound and enduring instability in Europe, fundamentally because it violently overturned the balance of power established by the 1815 Congress of Vienna. The emergence of a united Germany under Prussian military dominance placed an economic and industrial colossus at the physical centre of Europe, instantly threatening the security of its neighbours.\n\nFirst and foremost, the annexation of Alsace-Lorraine under the 1871 Treaty of Frankfurt permanently poisoned Franco-German relations. By seizing these mineral-rich border provinces and imposing a crushing 5 billion franc indemnity, Bismarck inflicted an unbearable national humiliation upon the French Republic. In France, this cultivated the powerful ideology of "Revanche" (revenge), symbolised by classroom maps veiling the lost provinces in black mourning crepe. French political leaders could never reconcile with Berlin while German garrisons occupied Strasbourg and Metz, ensuring that France remained an irreconcilable enemy permanently seeking allies to reverse the verdict of 1871.\n\nSecondly, the creation of the Empire generated permanent structural instability through Bismarck’s desperate attempts to prevent a two-front war. Realising France would seek vengeance, Bismarck’s supreme foreign policy objective was to keep France diplomatically isolated. This compelled him to construct an increasingly intricate, contradictory web of secret treaties—most notably the Dual Alliance with Austria-Hungary (1879) and the Reinsurance Treaty with Russia (1887). While Bismarck’s Realpolitik preserved peace during his tenure, it divided the continent into rigid armed camps. When Kaiser Wilhelm II dismissed Bismarck in 1890 and allowed the Russian treaty to lapse, Tsarist Russia naturally aligned with republican France in 1894, creating the very two-front encirclement Germany dreaded and locking Europe into competing alliance blocs.',
        },
      ],
      quiz: [
        {
          q: 'How many independent states existed in Central Europe before 1871?',
          a: '39',
          options: ['15', '39', '50', '300'],
        },
        {
          q: 'Which state was the most powerful among the German states before 1871?',
          a: 'Prussia',
          options: ['Austria', 'Bavaria', 'Saxony', 'Prussia'],
        },
        {
          q: 'Who became the Prime Minister of Prussia in 1862?',
          a: 'Otto von Bismarck',
          options: [
            'Wilhelm I',
            'Frederick the Great',
            'Otto von Bismarck',
            'Klemens von Metternich',
          ],
        },
        {
          q: "What was Bismarck's famous phrase for how Germany would be unified?",
          a: 'Blood and iron',
          options: [
            'Blood and iron',
            'Peace and diplomacy',
            'Gold and silver',
            'Speeches and majority decisions',
          ],
        },
        {
          q: "What did 'blood and iron' mean in Bismarck's approach?",
          a: 'Warfare and military strength',
          options: [
            'Democratic votes',
            'Warfare and military strength',
            'Peaceful treaties',
            'Industrial factories only',
          ],
        },
        {
          q: 'Which three countries did Prussia defeat to unify Germany?',
          a: 'Denmark, Austria, France',
          options: [
            'Britain, Russia, France',
            'Italy, Austria, Spain',
            'Denmark, Austria, France',
            'Sweden, Denmark, Russia',
          ],
        },
        {
          q: 'In what year did the Franco-Prussian War begin?',
          a: '1870',
          options: ['1864', '1866', '1914', '1870'],
        },
        {
          q: 'Where was the King of Prussia proclaimed the first German Emperor?',
          a: 'Palace of Versailles',
          options: [
            'Palace of Versailles',
            'Schönbrunn Palace',
            'Tower of London',
            'Reichstag in Berlin',
          ],
        },
        {
          q: 'When was the German Empire officially created?',
          a: '18 January 1871',
          options: ['1 September 1870', '28 June 1914', '18 January 1871', '11 November 1918'],
        },
        {
          q: 'Which valuable French territory did Germany seize in 1871?',
          a: 'Alsace-Lorraine',
          options: ['Brittany', 'Burgundy', 'Normandy', 'Alsace-Lorraine'],
        },
        {
          q: 'What was the economic union created by Prussia in 1834 called?',
          a: 'Zollverein',
          options: ['Reichstag', 'Zollverein', 'Kaiserreich', 'Wehrmacht'],
        },
        {
          q: 'Which major German-speaking power was deliberately excluded from the Zollverein?',
          a: 'Austria',
          options: ['Austria', 'Bavaria', 'Saxony', 'Hanover'],
        },
        {
          q: 'What was the German term for the new German Empire?',
          a: 'Kaiserreich',
          options: ['Lebensraum', 'Blitzkrieg', 'Kaiserreich', 'Reichstag'],
        },
        {
          q: 'How long did it take the Prussian army to crush Austria in 1866?',
          a: 'Seven weeks',
          options: ['Seven weeks', 'Four years', 'Two months', 'One year'],
        },
        {
          q: 'Who was the first Emperor (Kaiser) of the newly unified Germany?',
          a: 'Wilhelm I',
          options: ['Wilhelm II', 'Otto von Bismarck', 'Frederick III', 'Wilhelm I'],
        },
        {
          q: 'Why did Bismarck provoke a war with France in 1870?',
          a: 'To unite the southern German states with the north',
          options: [
            'To steal French gold',
            'To unite the southern German states with the north',
            'To impress the British',
            'Because France attacked first',
          ],
        },
        {
          q: 'Which French Emperor was captured by the Prussian military?',
          a: 'Napoleon III',
          options: ['Napoleon III', 'Louis XIV', 'Napoleon Bonaparte', 'Charles de Gaulle'],
        },
        {
          q: 'What natural resources was Alsace-Lorraine rich in?',
          a: 'Coal and iron',
          options: ['Gold and silver', 'Oil and gas', 'Coal and iron', 'Timber and wheat'],
        },
        {
          q: 'What long-term effect did the taking of Alsace-Lorraine have?',
          a: 'It created long-term rivalry and hatred between France and Germany',
          options: [
            'It led directly to the Russian Revolution',
            'It made France and Germany permanent allies',
            'It caused the collapse of the British Empire',
            'It created long-term rivalry and hatred between France and Germany',
          ],
        },
        {
          q: 'Why was the unification of Germany a shock to the balance of power in Europe?',
          a: 'A massive, powerful, militaristic state suddenly appeared in the center of Europe',
          options: [
            'Germany was very weak and needed protecting',
            'A massive, powerful, militaristic state suddenly appeared in the center of Europe',
            'It meant Europe was now entirely peaceful',
            'Britain lost its navy',
          ],
        },
      ],
      prologue:
        'In 1871, in the opulent Hall of Mirrors at Versailles, Prussian Chancellor Otto von Bismarck proclaimed a united German Empire, forged through three swift military victories. France lay humiliated, stripped of Alsace-Lorraine. To protect his new empire, Bismarck built a complex web of alliances. How did German unification upset Europe’s balance of power?',
    },
    {
      id: 'lesson_2',
      causal_domino_spine: {
        title: 'Imperialism & Moroccan Crises: Chronology Spine',
        subtitle: 'Key Turning Points & Causal Dominoes (M-A-I-N Framework)',
        stages: [
          {
            step: 1,
            para_ref: '[2.1]',
            date: '1884–1885',
            title: 'The Berlin Conference & Africa Carve-Up',
            actor: 'European Great Powers',
            tag: '🌍 IMPERIALISM',
            trigger:
              'Fourteen European powers meet in Berlin to establish rules for partitioning Africa, securing raw materials and colonial markets.',
            connective:
              'Britain and France gained the richest territories, leaving newly unified Germany with smaller colonies and growing resentment.',
            question: 'Why did European empires carve up Africa in the 1880s Scramble?',
          },
          {
            step: 2,
            para_ref: '[2.2]',
            date: '1890–1897',
            title: 'Weltpolitik & "A Place in the Sun"',
            actor: 'Kaiser Wilhelm II',
            tag: '🌍 IMPERIALISM',
            trigger:
              'Wilhelm II dismisses Bismarck and launches "Weltpolitik", declaring that Germany must build a battlefleet and conquer a global empire equal to Britain.',
            connective:
              'Alarmed Britain and France, who viewed German imperial ambition as a direct threat to their overseas colonies and trade.',
            question: 'Explain why Wilhelm II launched "Weltpolitik" in the 1890s.',
          },
          {
            step: 3,
            para_ref: '[2.3]',
            date: 'March 1905',
            title: 'The First Moroccan Crisis (Tangier)',
            actor: 'Imperial Germany & France',
            tag: '🌍 IMPERIALISM',
            trigger:
              'Kaiser Wilhelm II lands at Tangier on a white horse, publicly backing Moroccan independence to challenge French colonial dominance.',
            connective:
              'Attempted to test and divide the 1904 Entente Cordiale, but instead brought the European powers to the brink of war.',
            question: 'What happened when the Kaiser landed at Tangier in 1905?',
          },
          {
            step: 4,
            para_ref: '[2.4]',
            date: 'January–April 1906',
            title: 'The Algeciras Conference Humiliation',
            actor: 'Great Powers at Algeciras',
            tag: '🤝 ALLIANCES',
            trigger:
              'At the conference in Spain, Britain, Russia, and Italy all vote to back French control in Morocco, leaving Germany isolated.',
            connective:
              'Deeply humiliated Germany and convinced Britain and France to begin secret joint military conversations for mutual defence.',
            question: 'To what extent did the 1906 Algeciras Conference isolate Germany?',
          },
          {
            step: 5,
            para_ref: '[2.5]',
            date: 'July 1911',
            title: 'The Agadir Crisis (The Panther’s Leap)',
            actor: 'Germany, France & Britain',
            tag: '🌍 IMPERIALISM',
            trigger:
              'Germany sends the gunboat SMS Panther to Agadir, demanding the French Congo in exchange for accepting French control of Morocco.',
            connective:
              'Britain firmly backed France with the Mansion House speech; Germany backed down, feeling encircled and preparing for war.',
            question: 'Why did the gunboat Panther at Agadir bring Europe close to war?',
          },
        ],
      },
      video: [
        {
          url: 'https://www.youtube.com/watch?v=DduN1cU2p9U',
          title: "What was the 'Scramble for Africa'? - BBC What's New",
          duration: '3 mins 0 secs',
          teacher_guidance:
            'Accessible summary of the 1884 Berlin Conference and the European carving up of the African continent.',
        },
        {
          url: 'https://www.youtube.com/watch?v=efV3uZqc3so',
          title:
            'The Scramble for Africa Explained: Imperialism, Empire, and the Road to World War I',
          duration: '12 mins 49 secs',
          teacher_guidance:
            'Explores how colonial clashes in Africa, including the Moroccan Crises (1905, 1911), pushed Britain and France into diplomatic solidarity.',
        },
        {
          url: 'https://www.youtube.com/watch?v=0SEgckAL-xc',
          title: 'Powder Keg: Europe 1900 to 1914 | Historical Documentary | Lucasfilm',
          duration: '26 mins 6 secs',
          teacher_guidance:
            'Superb documentary overview of European imperial tensions, colonial rivalry, and the hardening of imperial ambitions.',
        },
      ],
      skill: 'Causation & Imperial Rivalry: The Scramble for Africa & Morocco',
      title:
        'Enquiry 2: Imperial Rivalry, the Scramble for Africa & the Moroccan Crises (1884–1911)',
      subtitle:
        'From the Berlin Conference and Weltpolitik to the Brink of War at Tangier and Agadir',
      enquiryQuestion:
        'How did imperial ambition in Africa and Kaiser Wilhelm II’s "Weltpolitik" bring European powers to the brink of war?',
      margin_spine: [
        {
          year: '1884–1885',
          label: 'Berlin Conference',
        },
        {
          year: '1890–1897',
          label: 'Weltpolitik',
        },
        {
          year: 'Mar 1905',
          label: 'Tangier Crisis',
        },
        {
          year: '1906',
          label: 'Algeciras Isolation',
        },
        {
          year: 'Jul 1911',
          label: 'Panther at Agadir',
        },
      ],
      teacher_notes: {
        primer:
          'This enquiry explores how imperial competition outside Europe poisoned relations between the Great Powers. In 1884, Bismarck convened the Berlin Conference to peacefully divide Africa under the doctrine of "effective occupation." But when Kaiser Wilhelm II dismissed Bismarck in 1890 and launched "Weltpolitik" demanding Germany’s "place in the sun," imperial expansion became aggressive and confrontational. The lesson focuses on the First Moroccan Crisis (1905, Tangier) and Second Moroccan Crisis (1911, Agadir), demonstrating how German attempts to fracture the Anglo-French Entente Cordiale completely backfired, driving Britain and France into secret joint military and naval planning.',
        objectives: [
          {
            objective:
              'Explain why European powers partitioned Africa at the 1884–85 Berlin Conference.',
            primer:
              'Focus on paragraph [2.1]. Emphasize the search for raw materials (rubber, minerals, cotton) and national prestige, regulated by Bismarck’s doctrine of effective occupation.',
            question:
              'Why did European empires prefer to establish rules at Berlin rather than fight wars directly over African territory?',
          },
          {
            objective:
              'Analyze how Kaiser Wilhelm II’s policy of "Weltpolitik" altered German foreign policy.',
            primer:
              'Direct students to paragraph [2.2]. Compare Bismarck’s cautious European balance of power with Wilhelm II’s bellicose demand for a global colonial empire.',
            question:
              'What did Wilhelm II mean by demanding Germany’s "place in the sun", and why did this alarm Great Britain?',
          },
          {
            objective:
              'Evaluate how the Moroccan Crises cemented the Anglo-French Entente and isolated Germany.',
            primer:
              'Focus on paragraphs [2.3] to [2.5]. Show how the Kaiser’s landing at Tangier and the dispatch of the gunboat Panther to Agadir united Britain and France against Germany.',
            question:
              'Why did Germany’s aggressive "gunboat diplomacy" in Morocco achieve the exact opposite of what Berlin intended?',
          },
        ],
        source_context:
          'Primary photograph depicting the German imperial gunboat SMS Panther anchored off the Atlantic port of Agadir, Morocco, in July 1911. Dispatched by the German Foreign Office under the pretext of protecting German commercial interests during local unrest, the Panther was actually sent to bully France into ceding territory in the Congo. This reckless act of "gunboat diplomacy" provoked widespread British fury, prompting Chancellor David Lloyd George’s famous Mansion House speech and initiating joint Anglo-French military staff talks. **Hinge Question:** Why did the deployment of a single small gunboat to an Atlantic port bring Europe to the threshold of a general war?',
      },
      do_now: {
        title: 'Do Now: Unification & European Alliances Recall',
        type: 'mixed',
        items: [
          {
            question: 'Which Prussian Minister-President unified Germany through "blood and iron"?',
            answer: 'Otto von Bismarck',
          },
          {
            question: 'In what year was the German Empire proclaimed at Versailles?',
            answer: '1871',
          },
          {
            question: 'Which mineral-rich border province did Germany seize from France in 1871?',
            answer: 'Alsace-Lorraine',
          },
          {
            question: 'What was the French term for their desire for national revenge?',
            answer: 'Revanche',
          },
          {
            question: 'Which Kaiser dismissed Bismarck in 1890?',
            answer: 'Kaiser Wilhelm II',
          },
        ],
      },
      vocab: [
        {
          term: 'Weltpolitik',
          definition:
            'Kaiser Wilhelm II’s aggressive "World Policy" aiming to transform Germany into a global superpower with overseas colonies and a battlefleet.',
        },
        {
          term: 'Gunboat Diplomacy',
          definition:
            'The pursuit of foreign policy objectives through conspicuous displays of naval military force to intimidate rivals.',
        },
        {
          term: 'Entente Cordiale',
          definition:
            'The 1904 diplomatic agreement between Great Britain and France resolving colonial disputes and inaugurating diplomatic cooperation.',
        },
        {
          term: 'Algeciras Conference',
          definition:
            'The 1906 international summit where twelve nations backed France in Morocco, leaving Germany diplomatically isolated.',
        },
        {
          term: 'Mansion House Speech',
          definition:
            'A 1911 public speech by British Chancellor David Lloyd George warning Germany that Britain would not allow France to be bullied.',
        },
      ],
      narrative_blocks: [
        {
          act: 1,
          title: 'The Scramble for Africa & The Berlin Conference (1884–1885)',
          text: '<span class="para-ref">[2.1]</span> Between 1881 and 1914, European powers raced to conquer Africa in the <strong>Scramble for Africa</strong>. Factories in Europe demanded cheap raw materials—rubber, copper, cotton, and palm oil. Rulers also wanted new trade markets and imperial prestige. In 1870, Europeans controlled under ten percent of Africa; by 1914, they ruled ninety percent.<br><br><span class="para-ref">[2.2]</span> To avoid war among European powers, Bismarck organized the <strong>Berlin Conference (1884–1885)</strong>. Fourteen nations met to agree rules for carving up the continent. They agreed the rule of <strong>effective occupation</strong>: countries had to set up physical offices, soldiers, and administration before claiming land. European diplomats drew straight borders across maps, completely ignoring African languages, cultures, and historic tribal kingdoms.',
          source: {
            letter: 'A',
            title:
              'Source A (Cartographic Record): The Partition of Africa by European Empires (1914)',
            image: '/units/great_war/assets/map_africa_1914.png',
            is_artwork: false,
            caption:
              'Map showing the division of the African continent among European colonial powers on the eve of World War I, with Britain and France holding the largest empires.',
            citation: 'Department Cartographic Collection (1914).',
            context:
              'By 1914, only Liberia and Ethiopia retained sovereign independence, with the rest of the continent partitioned among rival European empires.',
            hinge_question:
              'How did European imperial competition in Africa reflect and intensify rivalries on the European continent?',
          },
        },
        {
          act: 2,
          title: 'Kaiser Wilhelm II,"Weltpolitik" & "A Place in the Sun" (1890–1897)',
          text: '<span class="para-ref">[2.2]</span> Bismarck insisted Germany was a satisfied European power with no need for distant colonies. Pointing to a map, he declared: <em>"Here lies Russia, and here lies France, and we are in the middle; that is my map of Africa."</em> But in 1888, the young, ambitious <strong>Kaiser Wilhelm II</strong> took the German throne. Wilhelm wanted personal glory and dismissed Bismarck in 1890, an event dubbed "Dropping the Pilot."<br><br><span class="para-ref">[2.3]</span> The Kaiser demanded that Germany become a global superpower. In 1897, Bernhard von Bülow announced that Germany demanded its <strong>"place in the sun" (Platz an der Sonne)</strong>. This aggressive imperial policy was called <strong>Weltpolitik</strong> ("World Policy"). Because Britain and France already owned the richest territories, Wilhelm decided to build a mighty battlefleet, putting Germany on a direct collision course with Britain.',
        },
        {
          act: 3,
          title: 'The First Moroccan Crisis & The Landing at Tangier (March 1905)',
          text: '<span class="para-ref">[2.3]</span> In April 1904, alarmed by rising German power, Britain and France signed the <strong>Entente Cordiale</strong> ("Friendly Understanding"). This was a colonial pact rather than a military alliance. France accepted British control of Egypt, while Britain accepted French influence over the Sultanate of <strong>Morocco</strong>. German leaders feared this new friendship would surround them.<br><br><span class="para-ref">[2.4]</span> On 31 March 1905, Kaiser Wilhelm II triggered the <strong>First Moroccan Crisis</strong>. Arriving in the Moroccan port of <strong>Tangier</strong> on a white horse, Wilhelm announced his support for the Sultan\'s independence. He challenged French control and demanded equal German trading rights. The Kaiser gambled that France would back down and that Britain would not support Paris. His gamble failed completely.',
        },
        {
          act: 4,
          title: 'The Algeciras Conference & German Diplomatic Isolation (1906)',
          text: '<span class="para-ref">[2.4]</span> To resolve the Moroccan standoff, Germany demanded an international conference, expecting global support. In January 1906, diplomats met at the <strong>Algeciras Conference</strong> in southern Spain. The meeting ended in complete humiliation for Germany.<br><br><span class="para-ref">[2.5]</span> Instead of splitting Britain and France, German pressure pushed them closer together. British Foreign Secretary Sir Edward Grey firmly backed France. Russia, Italy, Spain, and the United States all voted to give France control over Moroccan police and banking. Only Austria-Hungary voted alongside Germany. Kaiser Wilhelm II left Algeciras furious. He was now convinced that the Great Powers were conspiring to encircle Germany, a paranoid fear known as <strong>Einkreisung</strong> (encirclement).',
        },
        {
          act: 5,
          title: 'The Second Moroccan Crisis: The Panther at Agadir & Mansion House (July 1911)',
          text: '<span class="para-ref">[2.5]</span> In spring 1911, Moroccan tribes rebelled against the Sultan in Fez. France sent troops to restore order. Accusing France of breaking the Algeciras agreement, Germany used <strong>gunboat diplomacy</strong>. On <strong>1 July 1911</strong>, Germany sent the gunboat <strong>SMS Panther</strong> to the Atlantic port of <strong>Agadir</strong>, trying to force France into handing over the French Congo.<br><br><span class="para-ref">[2.6]</span> The gunboat provoked outrage in London because Agadir lay near vital British shipping routes. On 21 July 1911, British Chancellor <strong>David Lloyd George</strong> gave his famous <strong>Mansion House Speech</strong>. He warned that Britain would fight rather than accept peace through national humiliation. Germany backed down and accepted a small piece of the Congo. The crisis backfired on Germany: Britain and France were pushed into secret joint military talks to defend against a German invasion.',
          source: {
            letter: 'B',
            title:
              'Source B (Primary Photograph): The German Gunboat SMS Panther at Agadir (July 1911)',
            image: '/units/great_war/assets/sms_panther_agadir_1911.jpg',
            is_artwork: false,
            caption:
              'Primary photograph depicting the German imperial gunboat SMS Panther anchored off the Moroccan port of Agadir during the Second Moroccan Crisis in July 1911.',
            citation:
              'Imperial War Museums Q 81745 • German Imperial Navy Photographic Record (1911).',
            context:
              'Germany dispatched this warship to intimidate France into surrendering colonial territory, triggering a major war scare with Great Britain.',
            hinge_question:
              'Why did the deployment of a single small gunboat to an Atlantic port bring Europe to the threshold of a general war?',
          },
        },
      ],
      pair_share: {
        prompt:
          "Discuss with your partner: Did Kaiser Wilhelm II's 'Weltpolitik' make war inevitable, or did Britain and France overreact to legitimate German colonial ambitions?",
        think: 'Spend 1 minute reflecting on the Moroccan Crises and the Kaiser’s goals.',
        pair: 'Take turns debating with your partner whether Germany was unfairly denied colonies.',
        share: 'Be prepared to report your partner’s best argument to the class.',
      },
      tasks: [
        {
          type: 'short_answer',
          topic: 'Question 1: Describe Two Features [4 marks • 5 mins]',
          qNum: 1,
          question:
            'Describe two features of the 1911 Agadir Crisis (Second Moroccan Crisis). [4 marks]',
          starter: 'One feature of the 1911 Agadir Crisis was... A second feature was...',
          model_answer:
            'One feature of the 1911 Agadir Crisis was Germany’s provocative deployment of the gunboat SMS Panther to the Moroccan port of Agadir, using military intimidation ("gunboat diplomacy") to challenge French colonial dominance and demand territorial compensation in the Congo. A second feature was the robust British diplomatic reaction, notably David Lloyd George’s Mansion House speech, which publicly warned Germany that Britain would fight alongside France rather than allow its maritime interests to be undermined, resulting in secret Anglo-French joint military staff talks.',
        },
        {
          type: 'extended_writing',
          topic: 'Question 2: Explain One Consequence [4 marks • 5 mins]',
          question:
            'Explain one consequence of the Moroccan Crises for relations between Great Britain and France. [4 marks]',
          stimulus: ['The 1906 Algeciras Conference', 'The 1911 Mansion House Speech'],
          hints: [
            {
              label: 'Point',
              prompt:
                'State a decisive consequence of the Moroccan Crises for Anglo-French relations (e.g., transforming a loose colonial agreement into a binding military partnership).',
            },
            {
              label: 'Evidence',
              prompt:
                'Deploy specific historical evidence: British backing of France at Algeciras (1906), Lloyd George’s Mansion House speech (1911), or secret joint military staff talks.',
            },
            {
              label: 'Explanation',
              prompt:
                'Explain HOW German imperial bullying backfired by convincing British and French leaders that German Weltpolitik posed a mortal threat to European security.',
            },
            {
              label: 'Link',
              prompt:
                'Conclude by showing how this solidified the Entente Cordiale into a de facto military alliance before 1914.',
            },
          ],
          scaffolding: {
            structure_strip: [
              {
                col: 'Consequence & Evidence',
                prompt:
                  'Identify how German aggression at Tangier and Agadir drove Britain and France together.',
                starter:
                  'A decisive consequence of the Moroccan Crises was the dramatic strengthening of diplomatic and military ties between Great Britain and France...',
              },
              {
                col: 'Causal Explanation & Impact',
                prompt:
                  'Explain how the 1906 Algeciras Conference and the 1911 Mansion House speech established joint military planning.',
                starter:
                  'This occurred because Kaiser Wilhelm II’s attempts to test the Entente Cordiale completely backfired...',
              },
            ],
            sentence_starters: [
              'A decisive consequence of the Moroccan Crises was...',
              'This happened because Kaiser Wilhelm II attempted to...',
              'At the 1906 Algeciras Conference, Britain firmly supported France by...',
              'Following the dispatch of the Panther in 1911, David Lloyd George warned that...',
              'Consequently, the crises transformed a colonial agreement into...',
            ],
            connective_bank: [
              'A decisive consequence was...',
              'This happened because...',
              'As a direct result...',
              'Consequently, this led to...',
              'Ultimately, this meant that...',
            ],
            word_bank: [
              'Kaiser Wilhelm II',
              'Weltpolitik',
              'Tangier (1905)',
              'Algeciras Conference',
              'Panther at Agadir (1911)',
              'David Lloyd George',
              'Mansion House Speech',
              'Entente Cordiale',
            ],
          },
          model_answer:
            'A decisive consequence of the Moroccan Crises was the fundamental transformation of the 1904 Anglo-French Entente Cordiale from a loose colonial understanding into a solid, unshakeable military partnership. Rather than driving Britain and France apart as Kaiser Wilhelm II had intended, German bullying at Tangier in 1905 and Agadir in 1911 convinced British statesmen that German Weltpolitik sought European hegemony. At the 1906 Algeciras Conference, Britain firmly backed France, leaving Germany diplomatically isolated with only Austria-Hungary for support. Following the 1911 Agadir Crisis and Lloyd George’s defiant Mansion House speech, the two nations initiated secret joint military staff conversations and agreed to divide naval responsibilities—with the Royal Navy safeguarding the North Sea and the French Navy securing the Mediterranean—locking both powers into an informal military alliance.',
        },
      ],
      quiz: [
        {
          q: 'What term describes the rapid colonization of Africa by European powers in the late 19th century?',
          a: 'The Scramble for Africa',
          options: [
            'The Great Game',
            'Manifest Destiny',
            'The African Partition',
            'The Scramble for Africa',
          ],
        },
        {
          q: "Which German leader famously stated that Germany wanted its 'place in the sun'?",
          a: 'Kaiser Wilhelm II',
          options: [
            'Otto von Bismarck',
            'Adolf Hitler',
            'Kaiser Wilhelm II',
            'Paul von Hindenburg',
          ],
        },
        {
          q: 'In which year did the First Moroccan Crisis occur?',
          a: '1905',
          options: ['1911', '1905', '1898', '1914'],
        },
        {
          q: 'What was the purpose of the 1884 Berlin Conference?',
          a: 'To regulate European colonization and trade in Africa',
          options: [
            'To regulate European colonization and trade in Africa',
            'To form a military alliance against Britain',
            'To ban slavery worldwide',
            'To divide Asia among European powers',
          ],
        },
        {
          q: 'Which European power controlled the largest empire in Africa by 1914?',
          a: 'Britain',
          options: ['Britain', 'France', 'Germany', 'Belgium'],
        },
        {
          q: "Why did Kaiser Wilhelm II demand a 'place in the sun'?",
          a: 'He wanted Germany to have a global empire like Britain and France',
          options: [
            'He wanted to control the Mediterranean Sea',
            'He wanted Germany to have a global empire like Britain and France',
            'He wanted a holiday home in Africa',
            'He wanted to conquer South America',
          ],
        },
        {
          q: 'What happened during the First Moroccan Crisis (1905)?',
          a: 'The Kaiser visited Tangier and declared support for Moroccan independence',
          options: [
            'France surrendered Morocco to Britain',
            'The local sultan defeated the French army',
            'Germany invaded Morocco',
            'The Kaiser visited Tangier and declared support for Moroccan independence',
          ],
        },
        {
          q: 'What was the main result of the Algeciras Conference (1906)?',
          a: 'Germany was humiliated and France was given control of Moroccan police',
          options: [
            'Germany gained full control of Morocco',
            'Morocco became fully independent',
            'Germany was humiliated and France was given control of Moroccan police',
            'Britain took over Morocco',
          ],
        },
        {
          q: 'What sparked the Second Moroccan Crisis (Agadir Crisis) in 1911?',
          a: 'Germany sent the gunboat Panther to the port of Agadir',
          options: [
            'Germany sent the gunboat Panther to the port of Agadir',
            'France declared war on Germany',
            'Britain blockaded the Moroccan coast',
            'Moroccans attacked German tourists',
          ],
        },
        {
          q: 'How did the Agadir Crisis end?',
          a: 'Germany backed down after being given a small strip of the Congo',
          options: [
            'Germany successfully conquered Morocco',
            'Germany backed down after being given a small strip of the Congo',
            'Britain declared war on Germany',
            'France was forced to leave Africa',
          ],
        },
        {
          q: 'What effect did the Moroccan Crises have on Anglo-French relations?',
          a: 'It pushed Britain and France closer together in a strong alliance',
          options: [
            'It caused a war between them',
            'It made Britain ally with Germany instead',
            'It led to Britain abandoning its empire',
            'It pushed Britain and France closer together in a strong alliance',
          ],
        },
      ],
      prologue:
        "By the late nineteenth century, European empires raced to claim colonies across Africa and Asia. When Kaiser Wilhelm II demanded Germany’s 'place in the sun', colonial rivalries erupted into tense showdowns in Morocco. Was imperial greed in distant lands the spark that poisoned European relations before 1914?",
    },
    {
      id: 'lesson_3',
      causal_domino_spine: {
        title: 'Naval Arms Race & HMS Dreadnought: Chronology Spine',
        subtitle: 'Key Turning Points & Causal Dominoes (M-A-I-N Framework)',
        stages: [
          {
            step: 1,
            para_ref: '[3.1]',
            date: '1889–1897',
            title: 'The British Two-Power Standard',
            actor: 'The British Empire',
            tag: '🎖️ MILITARISM',
            trigger:
              'Britain passes the Naval Defence Act 1889, decreeing the Royal Navy must equal the combined strength of the next two largest navies.',
            connective:
              'Secured Britain\'s vital sea lanes and food imports, maintaining British independence in "Splendid Isolation".',
            question: "Why was naval supremacy vital for Great Britain's survival?",
          },
          {
            step: 2,
            para_ref: '[3.2]',
            date: '1898–1900',
            title: "Tirpitz's Naval Laws & Risk Fleet",
            actor: 'Admiral von Tirpitz & Germany',
            tag: '🎖️ MILITARISM',
            trigger:
              'Germany passes Naval Laws to build 38 modern battleships directly facing Britain across the North Sea.',
            connective:
              'Britain viewed the German fleet as an existential threat to its survival, destroying Anglo-German diplomatic friendship.',
            question: 'How did Tirpitz\'s "Risk Theory" plan to challenge the Royal Navy?',
          },
          {
            step: 3,
            para_ref: '[3.3]',
            date: 'February 1906',
            title: 'The Dreadnought Revolution',
            actor: 'Admiral Jackie Fisher (Britain)',
            tag: '🎖️ MILITARISM',
            trigger:
              'Britain launches HMS Dreadnought, armed with ten 12-inch guns and steam turbines, rendering all previous battleships instantly obsolete.',
            connective:
              'Because older battleships were now obsolete, the naval race reset to zero: Germany rushed to build its own dreadnoughts.',
            question: 'Why did HMS Dreadnought reset naval supremacy to zero?',
          },
          {
            step: 4,
            para_ref: '[3.4]',
            date: '1908–1909',
            title: 'The 1909 British Naval Panic',
            actor: 'British Public & Government',
            tag: '🎖️ MILITARISM',
            trigger:
              'Amid fears Germany was secretly building dreadnoughts faster than Britain, the British public and press chant: "We want eight and we won\'t wait!"',
            connective:
              'Forced the British government to double its naval construction, spending vast sums to maintain its lead over Germany.',
            question: 'What triggered the 1909 British naval panic ("We want eight")?',
          },
          {
            step: 5,
            para_ref: '[3.5]',
            date: '1912–1914',
            title: 'Haldane Mission Failure & Redeployment',
            actor: 'Lord Haldane & Imperial Germany',
            tag: '🤝 ALLIANCES',
            trigger:
              'Talks for a naval truce collapse when Germany demands British neutrality in any European war; Britain redeploys its fleet to the North Sea.',
            connective:
              'Ended hopes of arms limitation; Britain agreed that France would guard the Mediterranean, sealing an unwritten military alliance.',
            question: 'Evaluate why the 1912 Haldane Mission failed to stop the arms race.',
          },
        ],
      },
      video: [
        {
          url: 'https://www.youtube.com/watch?v=yryey5NVODs',
          title:
            '14th June 1900: Anglo-German naval arms race triggered by the Second German Naval Law',
          duration: '2 mins 35 secs',
          teacher_guidance:
            "Concise explanation of Tirpitz's Second Naval Law and Germany's deliberate challenge to Britain's \"Two-Power Standard\".",
        },
        {
          url: 'https://www.youtube.com/watch?v=-osfjjJuY6U',
          title: 'Anglo-German Dreadnought Arms Race - Anything you can build I can build better!',
          duration: '32 mins 1 secs',
          teacher_guidance:
            'In-depth military engineering history of HMS Dreadnought, naval budgets, and the political escalation between Fisher and Tirpitz.',
        },
        {
          url: 'https://www.youtube.com/watch?v=qmYJUYwsZqY',
          title: 'Anglo-German Relations and the Naval Race',
          duration: '52 mins 22 secs',
          teacher_guidance:
            'Detailed academic documentary on diplomatic breakdown, domestic press jingoism, and naval expenditure.',
        },
      ],
      skill: 'Technological Causation & Arms Race: The Anglo-German Naval Rivalry',
      title: 'Enquiry 3: The Anglo-German Naval Arms Race & HMS Dreadnought (1898–1914)',
      subtitle:
        'The Two-Power Standard, Admiral Tirpitz’s Risk Theory, and the Dreadnought Revolution',
      enquiryQuestion:
        'Why did a battleship building contest destroy Anglo-German relations and reset naval supremacy?',
      margin_spine: [
        {
          year: '1889–1897',
          label: 'Two-Power Standard',
        },
        {
          year: '1898–1900',
          label: 'Tirpitz Risk Theory',
        },
        {
          year: 'Feb 1906',
          label: 'HMS Dreadnought',
        },
        {
          year: '1909',
          label: 'Naval Panic',
        },
        {
          year: '1912–1914',
          label: 'Haldane Mission',
        },
      ],
      teacher_notes: {
        primer:
          'This enquiry investigates the technological and strategic arms race that turned Great Britain and Germany from natural commercial partners into bitter existential rivals. For island Britain, naval supremacy was vital to safeguard imported food supplies and imperial sea lanes. When Admiral Alfred von Tirpitz persuaded the Kaiser to build the High Seas Fleet using his "Risk Theory," Britain viewed it as an intolerable threat to the North Sea. The launch of HMS Dreadnought in 1906 revolutionized naval warfare but dangerously erased Britain’s existing numerical lead, sparking the 1909 public naval panic and prompting Britain to redeploy its fleet from the Mediterranean to the North Sea.',
        objectives: [
          {
            objective:
              'Explain why naval supremacy was vital for Great Britain’s national survival.',
            primer:
              'Focus on paragraph [3.1]. Highlight Britain’s dependence on sea lanes for four-fifths of its grain and raw materials, leading to the 1889 Two-Power Standard.',
            question:
              'Why did British strategists view a large German battlefleet across the North Sea as an existential threat rather than ordinary national defense?',
          },
          {
            objective:
              'Analyze how Admiral Tirpitz’s "Risk Theory" aimed to challenge the Royal Navy.',
            primer:
              'Direct students to paragraph [3.2]. Explain that Tirpitz did not expect to defeat the entire Royal Navy, but to build a fleet large enough that Britain would risk losing its global supremacy if it attacked.',
            question:
              'Why did Tirpitz believe a strong battlefleet would force Britain into diplomatic concessions, and why was this calculation flawed?',
          },
          {
            objective: 'Evaluate the paradoxical impact of the launch of HMS Dreadnought in 1906.',
            primer:
              'Focus on paragraphs [3.3] to [3.5]. Show how Jackie Fisher’s steam turbine, all-big-gun warship made all pre-dreadnoughts obsolete, resetting the naval score to 1–0.',
            question:
              'Did the launch of HMS Dreadnought protect British imperial security, or did it dangerously erase Britain’s numerical advantage?',
          },
        ],
        source_context:
          'Primary photograph depicting the Royal Navy battleship HMS Dreadnought at sea (c. 1906–1907). Designed under First Sea Lord Admiral Sir John Fisher and constructed in just twelve months at Portsmouth Dockyard, HMS Dreadnought featured ten 12-inch guns and revolutionary steam-turbine engines producing a top speed of 21 knots. By making every pre-existing battleship on earth obsolete overnight, Dreadnought created a global sensation but wiped out Britain’s massive pre-existing lead in pre-dreadnoughts, allowing Germany to compete on equal terms. **Hinge Question:** Did the launch of HMS Dreadnought protect British imperial security, or did it dangerously erase Britain’s established naval advantage?',
      },
      do_now: {
        title: 'Do Now: Imperial Rivalry & Crises Recall',
        type: 'mixed',
        items: [
          {
            question:
              'What was the 1884–85 conference that established rules for colonizing Africa?',
            answer: 'The Berlin West Africa Conference',
          },
          {
            question: 'Which aggressive German foreign policy demanded a "place in the sun"?',
            answer: 'Weltpolitik',
          },
          {
            question: 'In what year was the Entente Cordiale signed between Britain and France?',
            answer: '1904',
          },
          {
            question: 'At which Moroccan port did Kaiser Wilhelm II land on a white horse in 1905?',
            answer: 'Tangier',
          },
          {
            question:
              'Which German warship was sent to Agadir in 1911, sparking the Second Moroccan Crisis?',
            answer: 'SMS Panther',
          },
        ],
      },
      vocab: [
        {
          term: 'Two-Power Standard',
          definition:
            'The official British naval doctrine established in 1889 requiring the Royal Navy to maintain a battleship fleet equal to the next two largest navies combined.',
        },
        {
          term: 'Risk Theory (Risikotheorie)',
          definition:
            'Admiral von Tirpitz’s strategic calculation that building a formidable German battlefleet in the North Sea would deter Britain from risking war.',
        },
        {
          term: 'Dreadnought',
          definition:
            'A revolutionary class of battleship introduced by Britain in 1906, powered by steam turbines and armed exclusively with heavy 12-inch guns.',
        },
        {
          term: 'Naval Laws',
          definition:
            'A series of German parliamentary statutes passed in 1898 and 1900 authorizing the massive construction of the High Seas Fleet.',
        },
        {
          term: 'Haldane Mission',
          definition:
            'A failed 1912 diplomatic mission to Berlin by British War Secretary Lord Haldane seeking a naval building truce.',
        },
      ],
      narrative_blocks: [
        {
          act: 1,
          title: 'The Two-Power Standard & British Maritime Survival (1889–1897)',
          text: '<span class="para-ref">[3.1]</span> For Great Britain, naval supremacy was essential for national survival. As an island nation, Britain could not feed its people without ocean imports. By 1900, Britain imported four-fifths of its wheat and meat on merchant ships. If enemy battleships cut these supply routes, Britain would starve within six weeks. The Royal Navy also defended a global empire of four hundred million subjects.<br><br><span class="para-ref">[3.2]</span> In the <strong>Naval Defence Act of 1889</strong>, Britain established the <strong>Two-Power Standard</strong>. This law required the Royal Navy to be as large as the world\'s next two biggest navies combined (then France and Russia). British leaders believed that unmatched sea power was the best way to prevent continental wars.',
        },
        {
          act: 2,
          title: 'Admiral von Tirpitz, German Naval Laws & "Risk Theory" (1898–1900)',
          text: '<span class="para-ref">[3.2]</span> In 1897, Kaiser Wilhelm II appointed <strong>Admiral Alfred von Tirpitz</strong> to run the Imperial Navy. Tirpitz believed Germany could not become a world empire without a powerful battlefleet. In 1898 and 1900, Tirpitz passed the famous <strong>German Naval Laws</strong> through the Reichstag, funding dozens of battleships for the new <strong>High Seas Fleet</strong>.<br><br><span class="para-ref">[3.3]</span> Tirpitz justified this cost using his <strong>Risk Theory (Risikotheorie)</strong>. Britain\'s navy was scattered around the globe protecting colonies. Germany would instead concentrate its fleet across the North Sea in ports like Wilhelmshaven and Kiel. Tirpitz argued that Britain would not risk a battle because heavy losses would ruin its naval supremacy over rivals. Tirpitz expected Britain to give in to German colonial demands. It was a disastrous miscalculation.',
        },
        {
          act: 3,
          title: 'The Dreadnought Revolution: All-Big-Gun Technology (February 1906)',
          text: '<span class="para-ref">[3.3]</span> Britain met the German challenge under First Sea Lord <strong>Admiral Sir John "Jackie" Fisher</strong>. Fisher recognized that older warships with mixed gun sizes were outdated. Building in secret at Portsmouth Dockyard, Fisher launched <strong>HMS Dreadnought</strong> in February 1906.<br><br><span class="para-ref">[3.4]</span> <em>Dreadnought</em> transformed naval warfare. It was the world\'s first "all-big-gun" battleship, armed with ten 12-inch heavy guns that fired 850-pound shells over eight miles. Powered by modern steam turbines, it cruised at 21 knots, faster than any battleship afloat. However, <em>Dreadnought</em> created a serious problem for Britain. By making older ships obsolete, it erased Britain\'s big lead of fifty pre-dreadnoughts to Germany\'s twenty. The naval race was reset to zero: <strong>Britain 1, Germany 0</strong>. Germany could now build dreadnoughts of its own.',
          source: {
            letter: 'A',
            title:
              'Source A (Primary Photograph): The Royal Navy Battleship HMS Dreadnought at Sea (1906)',
            image: '/images/great_war_cover.jpg',
            is_artwork: false,
            caption:
              'HMS Dreadnought underway during sea trials in 1906. Its revolutionary steam turbine propulsion and uniform 12-inch gun batteries rendered all previous battleships instantly obsolete.',
            citation: 'Royal Navy Photographic Archives (1906).',
            context:
              'Launched in Portsmouth in 1906, HMS Dreadnought reset the naval balance of power to zero, initiating an intense shipbuilding contest in the North Sea.',
            hinge_question:
              "Did the launch of HMS Dreadnought protect British imperial security, or did it dangerously erase Britain's established naval advantage?",
          },
        },
        {
          act: 4,
          title: 'The 1909 Naval Panic: "We Want Eight and We Won\'t Wait!" (1909)',
          text: '<span class="para-ref">[3.4]</span> Between 1906 and 1908, Germany accelerated naval building, constructing four dreadnoughts each year. In late 1908, British intelligence discovered German shipyards were secretly stockpiling steel to build even faster. In January 1909, public alarm erupted in the <strong>1909 Naval Panic</strong>.<br><br><span class="para-ref">[3.5]</span> Prime Minister H.H. Asquith and Chancellor David Lloyd George had hoped to spend money on social reforms like pensions. However, newspapers, the public, and politicians launched a fierce campaign demanding more warships: <em>"We want eight and we won\'t wait!"</em> The government yielded to public pressure. Parliament voted to build eight super-dreadnoughts in a single year, comfortably out-building Germany but placing massive tax burdens on both countries.',
        },
        {
          act: 5,
          title: 'The Haldane Mission Failure & Strategic Redeployment (1912–1914)',
          text: '<span class="para-ref">[3.5]</span> By 1912, the crushing cost of the naval race led Britain to seek a truce. British War Secretary <strong>Lord Haldane</strong> traveled to Berlin to propose a "naval holiday." Haldane offered to slow down dreadnought construction if Germany restricted its fleet. However, the Kaiser insisted that <strong>Britain must pledge strict neutrality in any future European war</strong>.<br><br><span class="para-ref">[3.6]</span> Britain refused because this pledge would allow Germany to crush France. The mission collapsed. In response, First Lord of the Admiralty <strong>Winston Churchill</strong> reorganized British naval defense. Britain pulled its main battleships from the Mediterranean Sea and placed sixty percent of the Royal Navy in the North Sea. Under a new agreement, the French navy guarded the Mediterranean, while Britain guarded the French coast. Germany had lost the naval race, but the rivalry permanently wrecked relations between London and Berlin.',
        },
      ],
      pair_share: {
        prompt:
          'Discuss with your partner: Was the Anglo-German naval arms race the primary cause of World War I, or merely a secondary symptom of deeper imperial tensions?',
        think:
          'Reflect on Paul Kennedy’s view of naval suspicion vs Christopher Clark’s view of Balkan instability.',
        pair: 'Compare the two interpretations with your partner.',
        share: 'Share your combined judgment with the class.',
      },
      tasks: [
        {
          type: 'historical_interpretations',
          topic: 'Question 3: Historiographical Analysis [8 marks • 10 mins]',
          title: 'Historiographical Analysis: The Impact of the Naval Arms Race',
          tariff: 'Question 3: Historiographical Analysis [8 marks • 10 mins]',
          question:
            'Study Interpretations 1 and 2. How do they differ about the causes and impact of the Anglo-German naval arms race? [4 marks] Suggest one reason why they differ. [4 marks]',
          interp1: {
            title: 'Interpretation 1: The Naval Race as Primary Catalyst',
            badge: 'Orthodox Historiography',
            author: 'Professor Paul Kennedy • The Rise of Anglo-German Antagonism',
            text: 'The naval race was the single most dangerous element in pre-1914 European diplomacy. For Britain, naval supremacy was not a luxury; it was the foundation of national survival and empire. When Germany began massing battleships directly across the North Sea, it transformed what had been friendly commercial relations into bitter existential suspicion. British leaders concluded that a German battlefleet could only be designed for one purpose: to destroy British naval power and dominate Europe.',
          },
          interp2: {
            title: 'Interpretation 2: Secondary Factor Overcome by 1912',
            badge: 'Revisionist Historiography',
            author: 'Professor Christopher Clark • The Sleepwalkers',
            text: 'Historians have greatly exaggerated the fatal impact of the naval race. By 1912, the battleship race was effectively over: Germany had abandoned the contest to concentrate resources on its land army, while Britain retained an insurmountable dreadnought lead. What ultimately triggered the catastrophe was not steel battleships in the North Sea, but unstable ethnic nationalism, crumbling imperial frontiers, and fatal alliance commitments in the volatile Balkan peninsula.',
          },
          matrix: [
            {
              col: '1. INTERPRETATION 1 (KENNEDY)',
              text: 'Argues the naval race was the primary existential catalyst that poisoned pre-1914 relations and made war inevitable.',
            },
            {
              col: '2. INTERPRETATION 2 (CLARK)',
              text: 'Argues the naval race was secondary, already resolved by 1912, and overshadowed by Balkan nationalism and land armies.',
            },
            {
              col: '3. HISTORIOGRAPHICAL VERDICT',
              text: 'Weigh both interpretations: Did naval rivalry create the structural hostility that made the 1914 July Crisis uncontrollable?',
            },
          ],
          connectives: [
            'Interpretation 1 contends that...',
            'Paul Kennedy emphasizes that naval supremacy was...',
            'In sharp contrast, Interpretation 2 argues that...',
            'Christopher Clark maintains that by 1912...',
            'One reason why Interpretations 1 and 2 differ is because they have a different focus...',
            'Specifically, Interpretation 1 focuses primarily on the long-term diplomatic polarization between 1898 and 1911...',
            'In contrast, Interpretation 2 focuses more on the immediate short-term Balkan triggers of 1912–1914...',
            'Weighing both perspectives against historical evidence, I conclude that...',
          ],
          model_answer:
            'Interpretations 1 and 2 differ fundamentally about the significance of the Anglo-German naval arms race in causing the outbreak of the First World War.\n\nInterpretation 1, by Paul Kennedy, argues that the naval race was the single most dangerous factor in pre-1914 European diplomacy. Kennedy emphasizes that British naval dominance was existential for national survival and food supply; consequently, Germany’s construction of a High Seas Fleet directly opposite the British coast poisoned friendly commercial ties and convinced British leaders that Berlin was bent on European hegemony.\n\nIn sharp contrast, Interpretation 2, by Christopher Clark, argues that historians have exaggerated the impact of the naval race. Clark stresses that by 1912 the contest was effectively over, as Germany conceded naval defeat to fund its army and Britain held an insurmountable lead. Instead, Clark identifies Balkan ethnic nationalism and rigid alliances as the true triggers of the war.\n\nThese interpretations differ because the historians focus on different chronological periods and causal mechanisms: Kennedy focuses on the long-term diplomatic polarization between 1898 and 1911 that drove Britain into the Entente with France and Russia, whereas Clark focuses on the immediate short-term triggers of 1912–1914 in south-eastern Europe.',
        },
      ],
      quiz: [
        {
          q: 'What revolutionary British battleship was launched in 1906?',
          a: 'HMS Dreadnought',
          options: ['HMS Victory', 'HMS Belfast', 'HMS Dreadnought', 'HMS Invincible'],
        },
        {
          q: 'Which German Admiral was in charge of expanding the German Navy?',
          a: 'Admiral von Tirpitz',
          options: ['Admiral von Tirpitz', 'Admiral Hipper', 'Kaiser Wilhelm II', 'Admiral Scheer'],
        },
        {
          q: 'What policy dictated that the British Royal Navy must be as large as the next two largest navies combined?',
          a: 'Two-Power Standard',
          options: [
            'Splendid Isolation',
            'Naval Supremacy Act',
            'Dreadnought Rule',
            'Two-Power Standard',
          ],
        },
        {
          q: 'Why was the HMS Dreadnought completely revolutionary?',
          a: "It was faster, heavier armored, and had all 'big-guns'",
          options: [
            'It was completely invisible to radar',
            'It was the first submarine',
            "It was faster, heavier armored, and had all 'big-guns'",
            'It could launch airplanes',
          ],
        },
        {
          q: "What was the consequence of the Dreadnought's launch?",
          a: 'It made all older battleships instantly obsolete, resetting the naval race',
          options: [
            'Germany immediately surrendered',
            'It made all older battleships instantly obsolete, resetting the naval race',
            'Britain stopped building ships',
            'France allied with Germany',
          ],
        },
        {
          q: "What was the German 'Risk Theory' proposed by Admiral Tirpitz?",
          a: "Building a navy large enough that Britain wouldn't risk fighting it",
          options: [
            'Building only submarines',
            'Refusing to build any ships to avoid angering Britain',
            "Building a navy large enough that Britain wouldn't risk fighting it",
            'Attacking Britain immediately',
          ],
        },
        {
          q: 'What slogan did the British public chant in 1909 to demand more ships?',
          a: "'We want eight and we won't wait!'",
          options: [
            "'Rule Britannia!'",
            "'Sink the Kaiser!'",
            "'More dreadnoughts now!'",
            "'We want eight and we won't wait!'",
          ],
        },
        {
          q: 'Why did Britain feel so threatened by the German naval expansion?',
          a: 'Britain is an island and relied entirely on its navy for survival and trade',
          options: [
            'Britain is an island and relied entirely on its navy for survival and trade',
            'They were worried Germany would steal their ships',
            'They wanted to attack Germany',
            'They had no army at all',
          ],
        },
        {
          q: 'What laws were passed in Germany to fund their massive naval buildup?',
          a: 'The Naval Laws of 1898 and 1900',
          options: [
            'The Tirpitz Decrees',
            'The Naval Laws of 1898 and 1900',
            'The Imperial Fleet Bills',
            'The Shipyard Acts',
          ],
        },
        {
          q: 'By 1914, who had won the naval race?',
          a: "Britain, with 29 dreadnoughts to Germany's 17",
          options: [
            "Germany, with 30 dreadnoughts to Britain's 10",
            "Britain, with 29 dreadnoughts to Germany's 17",
            'They had exactly the same number',
            'France overtook both of them',
          ],
        },
        {
          q: 'How did the naval race affect British foreign policy?',
          a: "It forced Britain out of 'Splendid Isolation' and into an alliance with France and Russia",
          options: [
            "It forced Britain out of 'Splendid Isolation' and into an alliance with France and Russia",
            'It made them ally with Germany',
            'It caused them to declare war on America',
            'It made them give up their empire',
          ],
        },
      ],
      prologue:
        'For centuries, Britain relied on the Royal Navy to rule the waves and safeguard its global empire. But in 1898, Admiral Tirpitz began building a massive German battle fleet. In 1906, Britain answered with HMS Dreadnought, making all previous warships obsolete. Did the naval arms race make European war inevitable?',
    },
    {
      id: 'lesson_4',
      causal_domino_spine: {
        title: 'Alliance Systems & Balkan Powder Keg: Chronology Spine',
        subtitle: 'Key Turning Points & Causal Dominoes (M-A-I-N Framework)',
        stages: [
          {
            step: 1,
            para_ref: '[4.1]',
            date: '1879–1882',
            title: 'The Triple Alliance Formed',
            actor: 'Germany, Austria-Hungary & Italy',
            tag: '🤝 ALLIANCES',
            trigger:
              'Germany and Austria-Hungary sign the Dual Alliance (1879) for mutual defence against Russia; Italy joins in 1882 to form the Triple Alliance.',
            connective:
              'Created a formidable Central European military bloc that alarmed France and Tsarist Russia.',
            question: "How did Bismarck's Dual Alliance create a Central European bloc?",
          },
          {
            step: 2,
            para_ref: '[4.2]',
            date: '1894–1907',
            title: 'The Triple Entente Emerges',
            actor: 'France, Russia & Great Britain',
            tag: '🤝 ALLIANCES',
            trigger:
              'France and Russia sign a military alliance (1894); Britain settles colonial disputes with France (1904) and Russia (1907) to complete the Triple Entente.',
            connective:
              'Cleanly divided Europe into two rival armed camps, ensuring any localized clash would drag all major powers into war.',
            question: 'Explain why the 1894 Franco-Russian Alliance broke isolation.',
          },
          {
            step: 3,
            para_ref: '[4.3]',
            date: '1900–1908',
            title: 'The Balkan Powder Keg',
            actor: 'Balkan States & Ottoman Empire',
            tag: '🚩 NATIONALISM',
            trigger:
              'As the Ottoman Empire weakens in Southeastern Europe, newly independent Serbia seeks to unite all South Slavs into a "Greater Serbia".',
            connective:
              'Austria-Hungary viewed Serbian nationalism as a mortal threat to the survival of its multi-ethnic empire.',
            question: 'Why was south-eastern Europe known as the "Balkan Powder Keg"?',
          },
          {
            step: 4,
            para_ref: '[4.4]',
            date: 'October 1908',
            title: 'The Bosnian Annexation Crisis',
            actor: 'Austria-Hungary, Serbia & Russia',
            tag: '🚩 NATIONALISM',
            trigger:
              'Austria-Hungary formally annexes Bosnia; Germany threatens war if Russia intervenes to protect Serbia, forcing Russia to back down.',
            connective:
              'Humiliated Russia vowed it would never back down again in the Balkans, and Serbian hostility towards Austria peaked.',
            question: 'What were the consequences of the 1908 Bosnian Annexation Crisis?',
          },
          {
            step: 5,
            para_ref: '[4.5]',
            date: '1912–1913',
            title: 'The Balkan Wars (Serbia Doubles)',
            actor: 'The Balkan League & Serbia',
            tag: '🎖️ MILITARISM',
            trigger:
              'Two bloody wars push the Ottoman Empire out of Europe; Serbia doubles in size and equips an army of 400,000 battle-hardened troops.',
            connective:
              'Convinced Austrian military chiefs that Serbia must be crushed in a pre-emptive strike at the earliest opportunity.',
            question: 'To what extent did the 1912–13 Balkan Wars embolden Serbia?',
          },
        ],
      },
      video: [
        {
          url: 'https://www.youtube.com/watch?v=dYrofaDfMKI',
          title: 'Tinderbox Europe - From Balkan Troubles to World War I | Prelude to WW1',
          duration: '7 mins 37 secs',
          teacher_guidance:
            'Focuses on the Bosnian Crisis (1908), the Balkan Wars, and Pan-Slav nationalism threatening the Austro-Hungarian Empire.',
        },
        {
          url: 'https://www.youtube.com/watch?v=c7nUDLKKEBY',
          title: 'How did WW1 Start? | Causes of the First World War',
          duration: '9 mins 19 secs',
          teacher_guidance:
            'Broad overview illustrating how militarism, alliances, imperialism, and nationalism combined to ignite the conflict.',
        },
        {
          url: 'https://www.youtube.com/watch?v=y-TmbOy4Jwg',
          title: '6 Key Steps to World War One',
          duration: '24 mins 26 secs',
          teacher_guidance:
            'Comprehensive History Hit documentary breaking down the six critical turning points and diplomatic crises that plunged Europe into continental war.',
        },
        {
          url: 'https://www.youtube.com/watch?v=f11CKYB2FCA',
          title: 'Europe Prior to World War I: Alliances and Enemies | Prelude to WW1',
          duration: '9 mins 47 secs',
          teacher_guidance:
            'Excellent breakdown of the Dual Alliance, Franco-Russian Alliance, Entente Cordiale, and Triple Entente.',
        },
        {
          url: 'https://era.org.uk/streaming-service-resource/1-the-approach-of-war-history-file/',
          title: 'History File: The Approach of War',
          duration: '20 mins 0 secs',
          teacher_guidance:
            'BBC educational documentary tracing how entangling alliances transformed regional disputes into systemic continental risk.',
        },
      ],
      skill: 'Interpretation & Alliances: The Alliance System & The Balkan Powder Keg',
      title: 'Enquiry 4: The Alliance Systems & the Balkan Powder Keg (1879–1913)',
      subtitle:
        'From the Dual Alliance and Triple Entente to the Bosnian Annexation and Balkan Wars',
      enquiryQuestion:
        'Did European military alliances protect continental peace or guarantee a domino-effect catastrophe?',
      a4_map: [
        '/units/great_war/assets/map_lesson4.png',
        '/units/great_war/assets/balkans_1914_simple_map.png',
      ],
      banner: {
        image: '/units/great_war/assets/map_lesson4.png',
        position: 'center 30%',
        caption:
          'Geopolitical cartography of Europe in 1914 illustrating the division into the Triple Entente and Triple Alliance.',
      },
      margin_spine: [
        {
          year: '1879–1882',
          label: 'Triple Alliance',
        },
        {
          year: '1894–1907',
          label: 'Triple Entente',
        },
        {
          year: '1900–1908',
          label: 'Balkan Powder Keg',
        },
        {
          year: 'Oct 1908',
          label: 'Bosnian Annexation',
        },
        {
          year: '1912–1913',
          label: 'Balkan Wars',
        },
      ],
      teacher_notes: {
        primer:
          'This enquiry examines how Europe was divided into two armed, rival treaty coalitions: the Triple Alliance (Germany, Austria-Hungary, Italy) and the Triple Entente (Britain, France, Russia). While originally intended as defensive deterrents to maintain peace through mutual balance, these rigid military pacts created an explosive tripwire mechanism. The enquiry investigates why south-eastern Europe was known as the "Balkan Powder Keg," analyzing how Ottoman imperial decay, Pan-Slavic nationalism, and Austro-Russian rivalry converged during the 1908 Bosnian Annexation Crisis and the 1912–13 Balkan Wars, leaving Serbia triumphant and Austrian leaders desperate for a pre-emptive strike.',
        objectives: [
          {
            objective:
              'Explain how the Triple Alliance and Triple Entente divided Europe into two armed camps.',
            primer:
              'Focus on paragraphs [4.1] and [4.2]. Trace the formation of Bismarck’s Dual Alliance (1879), the Franco-Russian Alliance (1894), and the 1907 Anglo-Russian Convention.',
            question:
              'How did alliances intended to deter enemies instead create a dangerous "domino effect"?',
          },
          {
            objective: 'Analyze why the Balkans became the "Powder Keg of Europe".',
            primer:
              'Direct students to paragraph [4.3]. Explain the collapse of Ottoman authority and the clash between Serbian Pan-Slavic dreams and Austro-Hungarian imperial survival.',
            question:
              'Why did the Austro-Hungarian Empire view a rising independent Serbia as a mortal threat?',
          },
          {
            objective:
              'Evaluate the consequences of the 1908 Bosnian Crisis and the 1912–13 Balkan Wars.',
            primer:
              'Focus on paragraphs [4.4] and [4.5]. Highlight Russian humiliation when forced to back down under German threats, vowing never to retreat again.',
            question:
              'Why did Russia’s retreat in 1908 guarantee that the Tsar would mobilize his army in 1914?',
          },
        ],
        source_context:
          'Primary political cartoon titled "The Boiling Point" (Punch, October 1912) depicting the major European monarchs (Kaiser Wilhelm II, Emperor Franz Joseph, King George V, Tsar Nicholas II, and the Sultan of Turkey) desperately sitting on the bubbling lid of a pot labeled "Balkan Troubles". The cartoon illustrates the widespread contemporary awareness that regional ethnic violence and nationalism in south-eastern Europe was threatening to boil over and engulf the entire continent in an uncontrollable conflagration. **Hinge Question:** Why did contemporary cartoonists depict the Balkans as an uncontrollable pot about to explode?',
      },
      do_now: {
        title: 'Do Now: Arms Race & Unification Recall',
        type: 'mixed',
        items: [
          {
            question: 'What was the revolutionary British battleship launched in 1906?',
            answer: 'HMS Dreadnought',
          },
          {
            question:
              'What official British policy required the Royal Navy to equal the next two navies combined?',
            answer: 'The Two-Power Standard',
          },
          {
            question: 'Which German Admiral drafted the Naval Laws and "Risk Theory"?',
            answer: 'Admiral Alfred von Tirpitz',
          },
          {
            question:
              'What secret treaty did Bismarck sign with Russia in 1887 that lapsed in 1890?',
            answer: 'The Reinsurance Treaty',
          },
          {
            question:
              'Which country allied with Russia in 1894 after the Reinsurance Treaty expired?',
            answer: 'France',
          },
        ],
      },
      vocab: [
        {
          term: 'Triple Alliance',
          definition:
            'The defensive military treaty signed in 1882 uniting Germany, Austria-Hungary, and Italy against rival Great Powers.',
        },
        {
          term: 'Triple Entente',
          definition:
            'The diplomatic alignment of Great Britain, France, and Russia completed in 1907 to counterbalance the Triple Alliance.',
        },
        {
          term: 'Balkan Powder Keg',
          definition:
            'The volatile south-eastern region of Europe where collapsing Ottoman authority and competing nationalisms created constant threat of war.',
        },
        {
          term: 'Pan-Slavism',
          definition:
            'A nationalist movement aiming to unite all Slavic peoples of eastern and south-eastern Europe under Russian protection.',
        },
        {
          term: 'Annexation',
          definition:
            'The formal, unilateral seizure and incorporation of a foreign territory into a sovereign state without the consent of its population.',
        },
      ],
      narrative_blocks: [
        {
          act: 1,
          title: 'The Central European Bloc: Dual Alliance & Triple Alliance (1879–1882)',
          text: '<span class="para-ref">[4.1]</span> In October 1879, Chancellor Otto von Bismarck acted to prevent a hostile coalition between France and Russia. He negotiated the <strong>Dual Alliance</strong> with Austria-Hungary. Both empires promised mutual military support if attacked by Russia, and neutrality if attacked by another power. In 1882, Italy joined after losing Tunisia to France, creating the <strong>Triple Alliance</strong>.<br><br><span class="para-ref">[4.2]</span> Bismarck designed the alliance to defend Central Europe and deter foreign attacks. However, it had a dangerous flaw. The treaty tied Germany\'s military power to the weak, multi-ethnic Austro-Hungarian Empire. Ruled by the aging Emperor Franz Joseph, Austria-Hungary was fracturing under intense nationalist unrest.',
          source: {
            letter: 'A',
            title:
              'Source A (Geopolitical Cartography): The Armed Camps: Triple Alliance & Triple Entente (1914)',
            image: '/units/great_war/assets/map_lesson4.png',
            is_artwork: false,
            caption:
              'Geopolitical map of Europe in 1914 showing the Triple Alliance (Germany, Austria-Hungary, Italy) and the Triple Entente (Britain, France, Russia), alongside minority nationalities within Austria-Hungary.',
            citation:
              'War Office Intelligence Department, London (1914); Historical Atlas of Modern Europe.',
            context:
              'By 1914, Europe was split into two hostile armed camps: the Central Powers (Germany and Austria-Hungary) surrounded on both sides by the Triple Entente (Britain, France, and Russia). This encirclement convinced German military leaders that a two-front war was inevitable.',
            hinge_question:
              'Why did the geographical encirclement of Germany by the Triple Entente make German military planners panic and favor a pre-emptive strike?',
          },
        },
        {
          act: 2,
          title: 'The Counter-Alliance: Franco-Russian Alliance & Triple Entente (1894–1907)',
          text: '<span class="para-ref">[4.2]</span> In 1890, Kaiser Wilhelm II allowed Germany\'s secret Reinsurance Treaty with Russia to lapse. Needing money to build the Trans-Siberian Railway, Russia turned to France. In 1894, the two nations signed the <strong>Franco-Russian Military Alliance</strong>, promising mutual defense against Germany. Bismarck\'s worst fear—a two-front encirclement—had come true.<br><br><span class="para-ref">[4.3]</span> Alarmed by German naval expansion, Britain abandoned its traditional "Splendid Isolation." Britain settled colonial disputes with France in the 1904 <strong>Entente Cordiale</strong>, and with Russia in the 1907 <strong>Anglo-Russian Convention</strong>. Together, Britain, France, and Russia formed the <strong>Triple Entente</strong>. Europe was now split into two hostile armed camps. Like a chain of dynamite, a quarrel between any two powers threatened to drag all six into war.',
          source: {
            letter: 'B',
            title:
              'Source B (Geopolitical Cartography): The Encirclement of Germany and Austria-Hungary',
            image: '/images/gw_alliance_map.png',
            is_artwork: false,
            caption:
              'Geopolitical map illustrating the central encirclement of Germany and Austria-Hungary (the Central Powers) by Britain, France, and Russia (the Triple Entente), also noting the subsequent alignment of neighbouring states during the escalation into general European war.',
            citation:
              'Historical Cartographic Department Archive (Modern European Geopolitical Series).',
            context:
              'When France and Russia formed an alliance in 1894, Bismarck’s nightmare of a two-front encirclement became reality. When Britain signed ententes with France (1904) and Russia (1907), Germany found itself encircled by three Great Powers.',
            hinge_question:
              'How did Britain’s decision to abandon "Splendid Isolation" transform regional European rivalries into a rigid continental deadlock?',
          },
        },
        {
          act: 3,
          title: 'The "Balkan Powder Keg", Ottoman Decline & Pan-Slavism (1900–1908)',
          text: '<span class="para-ref">[4.3]</span> For centuries, the <strong>Ottoman Empire</strong> ruled the Balkan peninsula. By 1900, Ottoman power was fading rapidly, earning the nickname the "Sick Man of Europe." As Turkish rule collapsed, new independent nations—Greece, Bulgaria, Romania, and <strong>Serbia</strong>—broke away. This unstable power vacuum became known as the <strong>"Balkan Powder Keg."</strong><br><br><span class="para-ref">[4.4]</span> Two rival empires competed for influence in the Balkans. Russia supported fellow Slavs and Orthodox Christians under the banner of <strong>Pan-Slavism</strong>, seeking warm-water sea routes to the Mediterranean. In contrast, Austria-Hungary feared that Slavic nationalism would tear its empire apart. Independent Serbia wanted to unite all South Slavs into a "Greater Serbia," making it Austria\'s fiercest rival.',
          source: {
            letter: 'C',
            title: 'Source C (Cartographic Record): The Balkan Powder Keg (1914)',
            image: '/units/great_war/assets/balkans_1914_simple_map.png',
            is_artwork: false,
            caption:
              'Strategic map of the Balkan Peninsula in 1914 following the Balkan Wars, showing the dramatic territorial expansion of independent Serbia on the southern frontier of Austria-Hungary.',
            citation: 'Department Cartographic Archive (1914).',
            context:
              'The collapse of Ottoman power created an explosive vacuum in the Balkans. Russia backed fellow Slavic Christians (Pan-Slavism), while Austria-Hungary feared that a powerful independent Serbia would tear the multinational Habsburg Empire apart.',
            hinge_question:
              'Why did Austria-Hungary view the expansion of Serbia following the Balkan Wars as an existential threat to its own imperial survival?',
          },
        },
        {
          act: 4,
          title: 'The 1908 Bosnian Annexation Crisis & Russian Humiliation (October 1908)',
          text: '<span class="para-ref">[4.4]</span> In October 1908, the powder keg nearly exploded. Taking advantage of chaos in the Ottoman Empire, Austria-Hungary <strong>annexed the provinces of Bosnia and Herzegovina</strong>. This annexation outraged Serbia, which considered Bosnia its rightful territory. Serbian crowds protested in Belgrade, demanding war.<br><br><span class="para-ref">[4.5]</span> Russia supported Serbia and prepared its army. However, German Chancellor Bernhard von Bülow intervened. In March 1909, Germany delivered an ultimatum: Russia must accept the annexation, or face war with Germany and Austria. Still recovering from its 1905 defeat by Japan, Russia could not fight. Tsar Nicholas II backed down and forced Serbia to accept Austrian rule. The humiliation was painful: Russia began rapid military rearmament and resolved never to surrender in the Balkans again.',
          source: {
            letter: 'D',
            title: 'Source D (Primary Political Cartoon): The Boiling Point (Punch, October 1912)',
            image: '/units/great_war/assets/was_boiling_point.png',
            is_artwork: true,
            caption:
              'Leonard Raven-Hill, "The Boiling Point" (Punch, 2 October 1912): Leaders and national figures of the five European Great Powers—Great Britain (John Bull), Germany (Kaiser Wilhelm II), Russia (Tsar Nicholas II), Austria-Hungary (Emperor Franz Joseph), and France (officer representing the Republic)—desperately struggle to hold down the lid of a cauldron boiling over with "Balkan Troubles".',
            citation: 'Leonard Raven-Hill, Punch Magazine, Vol. CXLIII, 2 October 1912.',
            context:
              'Published during the First Balkan War, this cartoon illustrates contemporary fears that regional ethnic and national rivalries in south-eastern Europe were threatening to boil over and engulf the entire continent.',
            hinge_question:
              'Why did the cartoonist depict the Great Power leaders struggling to keep the lid on the pot, rather than creating the fire underneath?',
          },
        },
        {
          act: 5,
          title: 'The 1912–1913 Balkan Wars & The Pre-emptive War Urge (1912–1913)',
          text: '<span class="para-ref">[4.5]</span> In October 1912, the <strong>First Balkan War</strong> broke out. Serbia, Greece, Bulgaria, and Montenegro (the Balkan League) attacked the Ottoman Empire, expelling Turkish forces from Europe within six weeks. In 1913, the allies turned on each other in the <strong>Second Balkan War</strong>, where Serbia defeated Bulgaria.<br><br><span class="para-ref">[4.6]</span> These wars transformed Serbia into a formidable regional power. Serbia expanded its territory by eighty percent, and its population jumped from three to 4.5 million. Armed with modern French artillery, Serbian nationalists intensified secret agitation inside Austria-Hungary. In Vienna, Austrian General <strong>Franz Conrad von Hötzendorf</strong> demanded a <strong>pre-emptive war</strong> to crush Serbia before it grew even stronger: Conrad urged war over twenty times in 1913 alone. Europe stood on the edge of catastrophe.',
          source: {
            letter: 'E',
            title: 'Source E (Strategic Operational Map): The German Schlieffen Plan',
            image: '/units/great_war/assets/schlieffen_plan_simple_map.png',
            is_artwork: false,
            caption:
              'Operational diagram of the Schlieffen Plan: Germany planned to rapidly violate Belgian neutrality and encircle Paris in 39 days before redeploying east to face slow-mobilizing Russia.',
            citation: 'German Great General Staff Operational Archive (1905/1914).',
            context:
              'Devised by Count Alfred von Schlieffen, this rigid operational timetable dictated that any war with Russia required an immediate pre-emptive invasion of France through neutral Belgium, guaranteeing British intervention under the 1839 Treaty of London.',
            hinge_question:
              'How did rigid military mobilization timetables like the Schlieffen Plan strip European diplomats of the power to stop war in July 1914?',
          },
        },
      ],
      pair_share: {
        prompt:
          'Discuss with your partner: Did the alliance systems cause the First World War, or were they merely the mechanism that spread a local Balkan conflict into a global war?',
        think: 'Reflect on whether alliances prevented war or made catastrophe inevitable.',
        pair: 'Take turns explaining your reasoning to your partner.',
        share: 'Be prepared to report your partner’s best argument to the class.',
      },
      tasks: [
        {
          type: 'extended_writing',
          topic: 'Question 1: Narrative Account [8 marks • 10 mins]',
          question:
            'Write a narrative account analysing how crises in the Balkans between 1908 and 1913 increased European tension. [8 marks]',
          stimulus: ['The Bosnian Annexation Crisis (1908)', 'The Balkan Wars (1912–1913)'],
          hints: [
            {
              label: 'Point',
              prompt:
                'Begin with the initial catalyst: Austria-Hungary’s 1908 annexation of Bosnia-Herzegovina and Russian humiliation.',
            },
            {
              label: 'Evidence',
              prompt:
                'Deploy chronological evidence: Serbian fury, German ultimatums backing Vienna, and the 1912–1913 Balkan Wars.',
            },
            {
              label: 'Explanation',
              prompt:
                'Trace how each event directly caused the next: Serbian territory doubling, Austro-Hungarian fear of Pan-Slavism, and Russian resolve never to retreat again.',
            },
            {
              label: 'Link',
              prompt:
                'Conclude with the outcome: the Balkans became a primed powder keg where any spark would trigger a general European war.',
            },
          ],
          scaffolding: {
            structure_strip: [
              {
                col: 'Phase 1: Bosnian Crisis (1908)',
                prompt:
                  'Describe the Austrian annexation of Bosnia and Germany’s military ultimatum to Russia.',
                starter:
                  'Initially, Balkan tensions escalated sharply in October 1908 when Austria-Hungary formally annexed Bosnia-Herzegovina...',
              },
              {
                col: 'Phase 2: Balkan Wars (1912–1913)',
                prompt:
                  'Explain how the defeat of the Ottoman Empire doubled Serbian territory and alarmed Vienna.',
                starter:
                  'Following this, the regional instability deepened during the Balkan Wars of 1912–1913...',
              },
              {
                col: 'Phase 3: The Primed Powder Keg',
                prompt:
                  'Analyse how these crises convinced Austria to seek pre-emptive war and Russia to mobilize next time.',
                starter:
                  'Consequently, the cumulative effect of these crises was to make south-eastern Europe the "powder keg of Europe"...',
              },
            ],
            sentence_starters: [
              'Initially, European tensions escalated in 1908 when...',
              'This provoked intense outrage in Serbia because...',
              'Russia was forced to back down when Germany issued an ultimatum stating that...',
              'Following this, the Balkan Wars of 1912–1913 dramatically altered the balance of power because...',
              'As an outcome of this, Austrian military leaders concluded that...',
              'Ultimately, Russia resolved that in any future Balkan confrontation it would...',
            ],
            connective_bank: [
              'Initially...',
              'This led directly to...',
              'Following this...',
              'Consequently...',
              'As an outcome of this...',
              'Ultimately...',
            ],
            word_bank: [
              'Balkan Powder Keg',
              'Bosnia-Herzegovina',
              'Pan-Slavism',
              'Tsar Nicholas II',
              'Franz Joseph',
              'Greater Serbia',
              'Balkan Wars',
              'pre-emptive war',
            ],
          },
          model_answer:
            'Between 1908 and 1913, a sequence of interconnected crises in the Balkans systematically dismantled regional stability and brought the Great Powers into acute confrontation.\n\nThe chain of events began in October 1908, when Austria-Hungary formally annexed Bosnia-Herzegovina, an Ottoman province populated largely by Serbs that Vienna had administered since 1878. This annexation provoked fury in Serbia, which harboured Pan-Slavic ambitions of creating a "Greater Serbia." Tsarist Russia moved to support its Slavic ally, but in March 1909 Germany intervened with a blunt ultimatum demanding that Russia accept the annexation without an international conference or face war. Humiliated and militarily unready following its 1905 defeat by Japan, Russia was forced to capitulate, leaving Tsar Nicholas II and his generals determined never to back down in the Balkans again.\n\nFollowing this crisis, the collapse of Ottoman authority sparked the First Balkan War (1912), in which the Balkan League (Serbia, Greece, Montenegro, and Bulgaria) drove the Turks almost entirely out of Europe. In the Second Balkan War (1913), Serbia defeated Bulgaria, resulting in Serbia doubling its territorial size and population. This explosive rise of an assertive, heavily armed Serbia terrified Austro-Hungarian leaders in Vienna, who feared that Pan-Slavic nationalism would tear their multi-ethnic empire apart.\n\nConsequently, the Balkan crises convinced Vienna’s military leadership, led by General Conrad von Hötzendorf, that a pre-emptive strike to crush Serbia was necessary for imperial survival. Combined with Russia’s vow to mobilize in any future crisis, south-eastern Europe had become a volatile powder keg awaiting a final trigger.',
        },
        {
          type: 'extended_writing',
          topic: 'Question 2: Explain Importance of Alliance Systems [8 marks • 10 mins]',
          question:
            'Explain the importance of the alliance systems for relations between European great powers before 1914. [8 marks]',
          stimulus: ['The Triple Alliance (1882)', 'The Triple Entente (1907)'],
          hints: [
            {
              label: 'Point',
              prompt:
                'State why the alliance systems were critically important (e.g. dividing Europe into two armed camps that transformed local crises into continental tripwires).',
            },
            {
              label: 'Evidence',
              prompt:
                'Deploy precise evidence: Dual Alliance (1879), Triple Alliance (1882), Franco-Russian Alliance (1894), Entente Cordiale (1904), and Triple Entente (1907).',
            },
            {
              label: 'Explanation',
              prompt:
                'Explain HOW mutual defence commitments eliminated diplomatic flexibility, heightened fears of encirclement, and created an automatic domino effect.',
            },
            {
              label: 'Link',
              prompt:
                'Link back to the question stem, showing how alliances locked great powers into supporting their allies regardless of the specific dispute.',
            },
          ],
          scaffolding: {
            structure_strip: [
              {
                col: 'Importance 1: Division into Two Armed Camps',
                prompt:
                  'Explain how the Triple Alliance and Triple Entente created mutual fear of encirclement and an arms race.',
                starter:
                  'The alliance systems were critically important because they divided Europe into two rigid, antagonistic coalitions...',
              },
              {
                col: 'Importance 2: The Domino Effect Tripwire',
                prompt:
                  'Explain how mutual military defence pledges converted localized disputes into general continental wars.',
                starter:
                  'Furthermore, the alliances were decisive because they operated as an automatic tripwire mechanism...',
              },
            ],
            sentence_starters: [
              'A decisive factor was...',
              'This was important because the formation of the Triple Alliance in 1882...',
              'In response, France and Russia formed a counter-bloc in 1894 which...',
              'By 1907, the Triple Entente completed the encirclement of Germany, leading to...',
              'As a direct result, any crisis involving one power automatically dragged in...',
              'Ultimately, this meant that the alliance system destroyed diplomatic compromise...',
            ],
            connective_bank: [
              'A decisive factor was...',
              'This was important because...',
              'Furthermore...',
              'As a direct result...',
              'Ultimately, this meant that...',
            ],
            word_bank: [
              'Dual Alliance',
              'Triple Alliance',
              'Franco-Russian Alliance',
              'Entente Cordiale',
              'Triple Entente',
              'Balance of Power',
              'Encirclement',
              'Domino Effect',
            ],
          },
          model_answer:
            'The alliance systems were of paramount importance for relations between the European great powers before 1914 because they polarized the continent into two heavily armed, mutually suspicious camps and created a dangerous domino-effect tripwire that made a general European conflict virtually impossible to contain.\n\nFirst, the development of the alliance blocs permanently altered the European balance of power. Bismarck had initially constructed the Dual Alliance (1879) with Austria-Hungary and expanded it into the Triple Alliance (1882) with Italy to isolate France. However, after Germany allowed its Reinsurance Treaty with Russia to lapse in 1890, France broke its isolation by securing the Franco-Russian Military Alliance in 1894. When Great Britain resolved its imperial disputes with France (1904) and Russia (1907) to form the Triple Entente, Europe became locked into two rigid coalitions. This created acute German paranoia regarding "encirclement" (Einkreisung), driving Berlin to cling unconditionally to its sole dependable ally, Austria-Hungary.\n\nSecond, the alliances were decisive because their mutual defence pledges removed diplomatic flexibility during international crises. Instead of regional disputes remaining localized, the commitments meant that a conflict involving one partner inevitably dragged in the entire coalition. In the July Crisis of 1914, Germany’s "Blank Cheque" to Vienna and France’s binding obligation to Russia ensured that a regional confrontation between Austria-Hungary and Serbia escalated into an all-out world war.',
        },
      ],
      quiz: [
        {
          q: 'Which three countries formed the Triple Entente in 1907?',
          a: 'Britain, France, Russia',
          options: [
            'Germany, Austria-Hungary, Italy',
            'Britain, France, Italy',
            'Britain, France, Russia',
            'Germany, Russia, Austria-Hungary',
          ],
        },
        {
          q: 'Which country left the Triple Alliance and joined the Entente in 1915?',
          a: 'Italy',
          options: ['Ottoman Empire', 'Bulgaria', 'Romania', 'Italy'],
        },
        {
          q: "What was Britain's traditional foreign policy before forming alliances?",
          a: 'Splendid Isolation',
          options: ['Splendid Isolation', 'Weltpolitik', 'Appeasement', 'Continental Commitment'],
        },
        {
          q: 'Which three countries made up the Triple Alliance of 1882?',
          a: 'Germany, Austria-Hungary, Italy',
          options: [
            'Germany, Russia, Austria-Hungary',
            'Britain, France, Russia',
            'Germany, Ottoman Empire, Italy',
            'Germany, Austria-Hungary, Italy',
          ],
        },
        {
          q: 'Which three countries formed the Triple Entente by 1907?',
          a: 'Britain, France, Russia',
          options: [
            'Germany, Austria-Hungary, Italy',
            'Britain, France, Russia',
            'Britain, USA, France',
            'France, Russia, Italy',
          ],
        },
        {
          q: 'What was a major flaw of the alliance system?',
          a: 'A small dispute between two nations could drag all major powers into war',
          options: [
            'It forced countries to disarm',
            'It prevented any trade between the blocs',
            'A small dispute between two nations could drag all major powers into war',
            'It made the armies too small',
          ],
        },
        {
          q: 'Why did Russia ally with France in 1894?',
          a: 'Because Kaiser Wilhelm II allowed the Reinsurance Treaty with Russia to lapse',
          options: [
            'Because they shared the same religion',
            'Because Kaiser Wilhelm II allowed the Reinsurance Treaty with Russia to lapse',
            'Because France promised them African colonies',
            'Because Britain attacked them',
          ],
        },
        {
          q: "What was the 'Entente Cordiale' signed in 1904?",
          a: 'A friendly agreement between Britain and France, settling colonial disputes',
          options: [
            'A friendly agreement between Britain and France, settling colonial disputes',
            'A peace treaty ending a war',
            'An agreement to build dreadnoughts together',
            'A military alliance between Germany and Russia',
          ],
        },
        {
          q: 'Why did Britain finally decide to form alliances?',
          a: "They felt threatened by Germany's growing navy and aggressive Weltpolitik",
          options: [
            'They wanted to conquer Europe',
            'They were invaded by France',
            "They felt threatened by Germany's growing navy and aggressive Weltpolitik",
            'They needed money from Russia',
          ],
        },
        {
          q: "What does 'Weltpolitik' mean?",
          a: "World policy (Germany's desire for a global empire)",
          options: [
            'Splendid isolation',
            'Peaceful co-existence',
            'Naval supremacy',
            "World policy (Germany's desire for a global empire)",
          ],
        },
        {
          q: "Which nation in the Triple Alliance was seen as the 'weak link'?",
          a: 'Italy',
          options: ['Germany', 'Austria-Hungary', 'Britain', 'Italy'],
        },
      ],
      prologue:
        "By 1914, Europe had divided into two heavily armed camps: the Triple Entente and the Triple Alliance. In the turbulent Balkans, crumbling Ottoman power and Slavic nationalism created a volatile 'powder keg' of regional tension. Why did interlocking alliance treaties turn a regional Balkan quarrel into a catastrophic continental war?",
    },
    {
      id: 'lesson_5',
      card_image: '/units/great_war/assets/archduke_sarajevo_car_1914.jpg',
      card_position: 'center 22%',
      banner: {
        image: '/units/great_war/assets/archduke_sarajevo_car_1914.jpg',
        position: 'center 22%',
        caption:
          'Archduke Franz Ferdinand and Sophie Duchess of Hohenberg in their open-top motor car in Sarajevo on 28 June 1914, shortly before the fatal shots at the Latin Bridge.',
      },
      causal_domino_spine: {
        title: 'The July Crisis & Countdown to War: Chronology Spine',
        subtitle: 'Key Turning Points & Causal Dominoes (M-A-I-N Framework)',
        stages: [
          {
            step: 1,
            para_ref: '[5.1]',
            date: '28 June 1914',
            title: 'The Sarajevo Assassination',
            actor: 'Gavrilo Princip & Franz Ferdinand',
            tag: '⚡ THE SPARK',
            trigger:
              'Nineteen-year-old Bosnian Serb Gavrilo Princip shoots Archduke Franz Ferdinand and his wife Sophie in Sarajevo.',
            connective:
              'Austria-Hungary resolved to crush Serbia once and for all, but urgently required German military guarantees first.',
            question: 'What motivated the Black Hand to assassinate Franz Ferdinand in Sarajevo?',
          },
          {
            step: 2,
            para_ref: '[5.2]',
            date: '5 July 1914',
            title: 'The German "Blank Cheque"',
            actor: 'Kaiser Wilhelm II & Austria',
            tag: '🤝 ALLIANCES',
            trigger:
              'Kaiser Wilhelm II promises Austria unconditional German military backing in whatever action it takes against Serbia.',
            connective:
              'Gave Austrian hawks reckless confidence to issue extreme demands that made peaceful compromise impossible.',
            question: 'How did Germany\'s "Blank Cheque" escalate the regional crisis?',
          },
          {
            step: 3,
            para_ref: '[5.3]',
            date: '23–28 July 1914',
            title: 'The Ultimatum & War Declared',
            actor: 'Austria-Hungary & Serbia',
            tag: '⚡ THE SPARK',
            trigger:
              'Austria delivers a harsh 10-point ultimatum; Serbia accepts nine points, but Austria declares war anyway on 28 July and bombards Belgrade.',
            connective:
              'Tsar Nicholas II ordered full Russian army mobilisation, activating the rigid chain reaction of European alliances.',
            question: 'Explain why Austria’s Ten-Point Ultimatum made war inevitable.',
          },
          {
            step: 4,
            para_ref: '[5.4]',
            date: '29–31 July 1914',
            title: 'Mobilisation & The Railway Trap',
            actor: 'Tsar Nicholas II & Germany',
            tag: '🎖️ MILITARISM',
            trigger:
              'Russia mobilizes its army; Germany demands a halt within 12 hours, then declares war on Russia on 1 August and mobilizes its own forces.',
            connective:
              'Diplomats lost control to military generals whose rigid railway mobilization timetables left no time for negotiation.',
            question:
              'In what ways did rigid railway mobilisation schedules trigger the domino effect?',
          },
          {
            step: 5,
            para_ref: '[5.5]',
            date: '1–4 August 1914',
            title: 'Schlieffen Plan & British Entry',
            actor: 'Germany, Belgium & Britain',
            tag: '🤝 ALLIANCES',
            trigger:
              'Germany invades neutral Belgium to execute the Schlieffen Plan against France; Britain honours the 1839 Treaty of London and declares war.',
            connective:
              'Thirty-seven days after the assassination, all five European great powers were plunged into the catastrophic First World War.',
            question: 'What forced Great Britain to declare war following the invasion of Belgium?',
          },
        ],
      },
      video: [
        {
          url: 'https://www.youtube.com/watch?v=OfO7TduevHA',
          title: 'How the Assassination of Archduke Franz Ferdinand Unfolded with Dan Snow',
          duration: '4 mins 12 secs',
          teacher_guidance:
            "Dan Snow narrates the exact sequence of events in Sarajevo on 28 June 1914 and Gavrilo Princip's fateful shots.",
        },
        {
          url: 'https://www.youtube.com/watch?v=Fmobm9pZtTg',
          title: 'The Bullet that Started WWI',
          duration: '10 mins 27 secs',
          teacher_guidance:
            'Dramatized forensic examination of the Black Hand conspiracy, the route mix-up, and the global diplomatic aftermath.',
        },
        {
          url: 'https://era.org.uk/streaming-service-resource/learning-zone-britain-and-the-start-of-ww1-bbc-two/',
          title: 'Britain and the Start of WW1 | Learning Zone (BBC Two)',
          duration: '15 mins 0 secs',
          teacher_guidance:
            "Explores the Schlieffen Plan, the invasion of neutral Belgium, and Britain's ultimatum to Germany in August 1914.",
        },
        {
          url: 'https://era.org.uk/streaming-service-resource/assassination-of-archduke-franz-ferdinand-days-that-shook-the-world/',
          title: 'Days That Shook the World: Assassination of Archduke Franz Ferdinand',
          duration: '28 mins 0 secs',
          teacher_guidance:
            'Gripping BBC docudrama detailing the minute-by-minute timeline of the Sarajevo assassination.',
        },
      ],
      skill: 'Short-Term Causation & The July Crisis: From Sarajevo to World War',
      title: 'Enquiry 5: The July Crisis: Sarajevo to the Outbreak of War (June–August 1914)',
      subtitle:
        'From the Shots at the Latin Bridge and the Blank Cheque to the Invasion of Belgium',
      enquiryQuestion:
        'Why did a single assassination in Sarajevo ignite thirty-seven days of diplomatic madness and world war?',
      margin_spine: [
        {
          year: '28 Jun 1914',
          label: 'Sarajevo Shots',
        },
        {
          year: '5 Jul 1914',
          label: 'The Blank Cheque',
        },
        {
          year: '23–28 Jul',
          label: 'The Ultimatum',
        },
        {
          year: '29–31 Jul',
          label: 'Train Timetables',
        },
        {
          year: '1–4 Aug',
          label: 'Belgian Neutrality',
        },
      ],
      teacher_notes: {
        primer:
          'This final enquiry investigates the dramatic thirty-seven-day countdown from the assassination of Archduke Franz Ferdinand in Sarajevo to the general outbreak of the First World War in August 1914. Students analyze the mechanics of short-term escalation: the Black Hand assassination, Kaiser Wilhelm II’s unconditional "Blank Cheque" to Austria, the deliberately intolerable Ten-Point Ultimatum delivered to Serbia, the inexorable pull of railway mobilization timetables, and Germany’s execution of the Schlieffen Plan violating Belgian neutrality. The enquiry challenges students to construct a synoptic historical verdict balancing long-term structural rivalries (MAIN: Militarism, Alliances, Imperialism, Nationalism) against the immediate human blunders of the July Crisis.',
        objectives: [
          {
            objective:
              'Explain why Archduke Franz Ferdinand was assassinated in Sarajevo on 28 June 1914.',
            primer:
              'Focus on paragraph [5.1]. Describe Franz Ferdinand’s visit on Vidovdan (St Vitus Day), the conspirators of Young Bosnia, and the fatal wrong turn outside Schiller’s Delicatessen near the Latin Bridge.',
            question:
              'Why did Serbian nationalists choose Franz Ferdinand as their primary target, and how did a series of blunders place him in front of Gavrilo Princip?',
          },
          {
            objective:
              'Analyze how Germany’s "Blank Cheque" escalated a regional conflict into a continental crisis.',
            primer:
              'Direct students to paragraph [5.2]. Show how Kaiser Wilhelm II pledged unconditional military support to Austria-Hungary, encouraging Vienna to issue its harsh ultimatum to Serbia.',
            question: 'Why was Germany’s "Blank Cheque" considered reckless imperial brinkmanship?',
          },
          {
            objective:
              'Evaluate how rigid railway mobilization timetables and the Schlieffen Plan forced Great Britain into the war.',
            primer:
              'Focus on paragraphs [5.4] and [5.5]. Explain A.J.P. Taylor’s "war by timetable" and how the German invasion of neutral Belgium forced Britain to honor the 1839 Treaty of London.',
            question:
              'Why did German generals insist that invading neutral Belgium was a military necessity, even though it guaranteed British entry into the war?',
          },
        ],
        source_context:
          'Primary forensic map and archival evidence depicting the assassination route of Archduke Franz Ferdinand along the Appel Quay in Sarajevo on 28 June 1914. Following an earlier failed bomb attack by Nedeljko Čabrinović, the Archduke’s motorcade attempted to alter its route to visit injured officers in hospital. However, the chauffeur Leopold Lojka was not informed and turned right into Franz Josef Street outside Schiller’s Delicatessen beside the Latin Bridge. Attempting to reverse, the engine stalled directly in front of nineteen-year-old assassin Gavrilo Princip, who drew his Browning pistol and fired two fatal shots at point-blank range. **Hinge Question:** Was the assassination of Archduke Franz Ferdinand the fundamental cause of the First World War, or merely the trigger that exposed existing systemic rivalries?',
      },
      do_now: {
        title: 'Do Now: Alliances & Balkan Crises Recall',
        type: 'mixed',
        items: [
          {
            question: 'Which three countries formed the Triple Alliance in 1882?',
            answer: 'Germany, Austria-Hungary, and Italy',
          },
          {
            question: 'Which three countries formed the Triple Entente in 1907?',
            answer: 'Great Britain, France, and Russia',
          },
          {
            question: 'Which European region was known as the "Powder Keg of Europe"?',
            answer: 'The Balkans',
          },
          {
            question: 'Which territory did Austria-Hungary illegally annex in October 1908?',
            answer: 'Bosnia-Herzegovina',
          },
          {
            question:
              'Which country emerged triumphant from the 1912–1913 Balkan Wars, doubling in size?',
            answer: 'Serbia',
          },
        ],
      },
      vocab: [
        {
          term: 'Black Hand (Crna Ruka)',
          definition:
            'A secret Serbian nationalist military terrorist society dedicated to creating a "Greater Serbia" by liberating South Slavs from Austria-Hungary.',
        },
        {
          term: 'Blank Cheque (Blankovollmacht)',
          definition:
            'Kaiser Wilhelm II’s unconditional guarantee of total German military backing given to Austria-Hungary on 5 July 1914.',
        },
        {
          term: 'Ultimatum',
          definition:
            'A final set of non-negotiable diplomatic demands with a rigid deadline, the rejection of which will result in an immediate declaration of war.',
        },
        {
          term: 'Mobilisation',
          definition:
            'The rapid assembly and organization of a nation’s military reserves, troops, and railway supplies for active combat.',
        },
        {
          term: 'Schlieffen Plan',
          definition:
            'Germany’s strategic war plan drafted by Count von Schlieffen to rapidly conquer France in 42 days via neutral Belgium before pivoting to defeat Russia.',
        },
      ],
      narrative_blocks: [
        {
          act: 1,
          title: 'The Assassination of Franz Ferdinand in Sarajevo (28 June 1914)',
          text: '<span class="para-ref">[5.1]</span> On Sunday, 28 June 1914, <strong>Archduke Franz Ferdinand</strong>, heir to the Austro-Hungarian throne, visited <strong>Sarajevo</strong> with his wife Sophie. The date was <em>Vidovdan</em> (St Vitus Day), a sacred Serbian national holiday. Six young assassins from <strong>Young Bosnia</strong> waited along the Appel Quay. They were armed with pistols and bombs supplied by the Serbian secret society, the <strong>Black Hand</strong>, led by Colonel Dragutin Dimitrijević ("Apis").<br><br><span class="para-ref">[5.2]</span> The first attack failed when a bomb bounced off the car, injuring bystanders. After a City Hall reception, Franz Ferdinand decided to visit the wounded in hospital. However, his driver took a wrong turn onto Franz Josef Street outside <strong>Schiller\'s Delicatessen</strong> near the <strong>Latin Bridge</strong>. When ordered to reverse, the car stalled. Standing nearby was nineteen-year-old student <strong>Gavrilo Princip</strong>. Princip stepped forward and fired two shots at close range, killing Sophie and Franz Ferdinand within minutes.',
          source: {
            letter: 'A',
            title:
              'Source A (Cartographic & Primary Record): The Fatal Wrong Turn at the Latin Bridge, Sarajevo (28 June 1914)',
            image: '/units/great_war/assets/map_sarajevo_route.jpg',
            is_artwork: false,
            caption:
              'Forensic street map of Sarajevo showing the route of Archduke Franz Ferdinand’s motorcade along the Appel Quay and the fatal wrong turn outside Schiller’s Delicatessen beside the Latin Bridge.',
            citation: 'Bosnian Archival Primary Record (1914).',
            context:
              'Gavrilo Princip’s two shots triggered the July Crisis, plunging Europe into world war thirty-seven days later.',
            hinge_question:
              'Was the assassination of Archduke Franz Ferdinand the fundamental cause of the First World War, or merely the trigger that exposed existing systemic rivalries?',
          },
        },
        {
          act: 2,
          title: 'The "Blank Cheque" & The Escalation of the Crisis (5 July 1914)',
          text: '<span class="para-ref">[5.2]</span> The assassination caused shock and outrage across Europe. Austrian leaders decided to use the murders as an excuse to destroy the Serbian threat forever. However, attacking Serbia risked a war with Russia. On 5 July 1914, Austrian envoy Count Alexander Hoyos traveled to Berlin to secure German support.<br><br><span class="para-ref">[5.3]</span> Kaiser Wilhelm II and Chancellor Theobald von Bethmann-Hollweg made a fateful decision. They issued the famous <strong>"Blank Cheque" (Blankovollmacht)</strong>, promising unconditional German military backing to Austria-Hungary. Germany urged Vienna to strike quickly while international sympathy was high. German leaders gambled that Russia was not ready to fight and that Britain would remain neutral. Strengthened by German promises, Austrian leaders prepared for war.',
        },
        {
          act: 3,
          title: 'The Ten-Point Ultimatum & Declaration of War on Serbia (23–28 July 1914)',
          text: '<span class="para-ref">[5.3]</span> On 23 July 1914, Austria-Hungary sent a harsh <strong>Ten-Point Ultimatum</strong> to Serbia, demanding an answer within forty-eight hours. The terms were deliberately designed to be impossible to accept. Austria demanded that Serbia ban anti-Austrian newspapers, dismiss hostile officers, and allow Austro-Hungarian police onto Serbian soil.<br><br><span class="para-ref">[5.4]</span> Allowing foreign police on sovereign soil would destroy Serbian independence. However, advised by Russia to show restraint, Serbia accepted eight demands and offered international arbitration for the other two. British Foreign Secretary Sir Edward Grey praised Serbia\'s peaceful reply. Nevertheless, Austria-Hungary was determined to fight. On <strong>28 July 1914</strong>, Austria declared war on Serbia. That night, Austrian gunboats shelled Belgrade from the Danube River. The July Crisis had turned into war.',
        },
        {
          act: 4,
          title: 'Railway Mobilisation Schedules & The Domino Effect (29–31 July 1914)',
          text: '<span class="para-ref">[5.4]</span> The shelling of Belgrade set off the alliance system like dominoes. Russian commanders warned Tsar Nicholas II that if Russia failed to act, Austria would conquer the Balkans. Because Russia was vast with few railways, its army took six weeks to assemble. Delaying mobilization would leave Russia defenseless. On <strong>30 July 1914</strong>, the Tsar ordered <strong>general mobilization</strong>.<br><br><span class="para-ref">[5.5]</span> Russian mobilization triggered rigid military plans across Europe, a process historian A.J.P. Taylor called <strong>"War by Timetable."</strong> In 1914, mobilization was treated as an act of war involving millions of troops and inflexible train schedules. German Chief of Staff <strong>Helmuth von Moltke the Younger</strong> warned that war could no longer be stopped. Germany ordered Russia to halt mobilization, and demanded that France promise neutrality. Both refused. On 1 August, Germany declared war on Russia; on 3 August, Germany declared war on France.',
        },
        {
          act: 5,
          title: 'The Schlieffen Plan, Belgian Neutrality & British Entry (1–4 August 1914)',
          text: '<span class="para-ref">[5.5]</span> Germany\'s strategy was dictated by the <strong>Schlieffen Plan</strong>, designed by Count Alfred von Schlieffen to prevent a two-front war. The plan assumed Russia would take six weeks to mobilize. During those six weeks, Germany would send ninety percent of its army through neutral <strong>Belgium</strong> to encircle Paris and knock France out in forty-two days, before turning east to fight Russia.<br><br><span class="para-ref">[5.6]</span> On 2 August, Germany demanded free passage through Belgium. King Albert refused, declaring: <em>"Belgium is a nation, not a road."</em> On <strong>3 August 1914</strong>, German armies invaded Belgium. This invasion brought Great Britain into the war. Britain had promised to protect Belgian neutrality in the <strong>1839 Treaty of London</strong>, and could not allow a hostile power to control Channel ports. When Germany dismissed the treaty as a <em>"scrap of paper,"</em> Britain declared war at 11:00 PM on <strong>4 August 1914</strong>. Watching London\'s street lamps, Sir Edward Grey remarked: <em>"The lamps are going out all over Europe; we shall not see them lit again in our lifetime."</em>',
        },
      ],
      pair_share: {
        prompt:
          'Discuss with your partner: Could the First World War have been avoided during the July Crisis, or was Europe already doomed by decades of militarism and alliances?',
        think:
          'Reflect on whether individual leaders made fatal blunders or whether systemic forces made war inevitable.',
        pair: 'Take turns debating with your partner.',
        share: 'Share your pair’s conclusion with the class.',
      },
      tasks: [
        {
          type: 'extended_writing',
          topic: 'Question 5: Evaluative Statement Essay [12 marks • 15 mins]',
          question:
            '“The main cause of the First World War was alliance rivalries.” How far do you agree? Explain your answer. [12 marks]',
          stimulus: [
            'The Triple Alliance and Triple Entente rivalries',
            'The assassination of Archduke Franz Ferdinand',
          ],
          hints: [
            {
              label: 'Point',
              prompt:
                'State your thesis: evaluate whether alliance commitments or other factors (the July Crisis, militarism, rigid mobilisation timetables) were decisive.',
            },
            {
              label: 'Evidence',
              prompt:
                'Deploy balanced historical evidence: Triple Alliance vs Triple Entente, the "Blank Cheque", Gavrilo Princip at Sarajevo, the Schlieffen Plan, and Belgian neutrality.',
            },
            {
              label: 'Explanation',
              prompt:
                'Weigh how alliances created the fatal structural mechanism, while militarism and imperial brinkmanship provided the immediate catalyst that unleashed it.',
            },
            {
              label: 'Link',
              prompt:
                'Provide a sustained historical judgment weighing short-term triggers against long-term structural pressures to reach a clear verdict.',
            },
          ],
          scaffolding: {
            structure_strip: [
              {
                col: 'Paragraph 1: Alliance Rivalries (Agree)',
                prompt:
                  'Explain how the Triple Alliance and Triple Entente locked nations into automated escalation.',
                starter:
                  'On the one hand, it can be strongly argued that alliance rivalries were the decisive cause of the war because...',
              },
              {
                col: 'Paragraph 2: The July Crisis & Sarajevo (Counter-Argument)',
                prompt:
                  'Explain how the assassination of Franz Ferdinand and Austrian aggression sparked the conflict.',
                starter:
                  'On the other hand, the immediate trigger that ignited the conflict was the assassination of Archduke Franz Ferdinand at Sarajevo...',
              },
              {
                col: 'Paragraph 3: Militarism & Inflexible War Plans (Alternative Factor)',
                prompt:
                  'Explain how rigid railway timetables and the German Schlieffen Plan made peaceful compromise impossible.',
                starter:
                  'Furthermore, a crucial alternative factor was the role of militarism and inflexible mobilization timetables...',
              },
              {
                col: 'Historiographical Verdict (Conclusion)',
                prompt: 'Reach a sustained evaluative conclusion weighing the hierarchy of causes.',
                starter:
                  'In the final analysis, while the assassination in Sarajevo was the spark and the Schlieffen Plan determined the military timeline, the alliance system was the indispensable structural cause...',
              },
            ],
            sentence_starters: [
              'On one hand, it can be argued that alliance rivalries were the main cause because...',
              'A decisive factor supporting this argument was Germany’s "Blank Cheque" to Austria, which...',
              'On the other hand, an alternative argument is that the immediate trigger of Sarajevo was crucial because...',
              'Furthermore, militarism and the German Schlieffen Plan escalated the crisis because...',
              'The invasion of neutral Belgium was decisive because it brought Great Britain into the war...',
              'In the final analysis, I agree / disagree that alliances were the primary cause, because...',
            ],
            connective_bank: [
              'On one hand, it can be argued that...',
              'A decisive factor supporting this is...',
              'On the other hand...',
              'An alternative argument is that...',
              'Furthermore, it must be recognized that...',
              'Consequently...',
              'In the final analysis...',
            ],
            word_bank: [
              'Alliance Rivalries',
              'Triple Alliance',
              'Triple Entente',
              'Balance of Power',
              'Franz Ferdinand',
              'Blank Cheque',
              'Sarajevo',
              'Schlieffen Plan',
              'Neutrality of Belgium',
            ],
          },
          model_answer:
            'Historians remain divided over whether the First World War was primarily caused by alliance rivalries or by a lethal cocktail of militarism, aggressive imperialism, and short-term miscalculation during the July Crisis. While alliances provided the rigid structural tripwires that converted a localized Balkan dispute into a global conflagration, they alone did not make war inevitable; rather, it was aggressive brinkmanship and inflexible military war plans that detonated the system.\n\nOn the one hand, alliance rivalries were undeniably fundamental in establishing the structural conditions for general war. By 1914, Europe was polarized into two armed camps: the Triple Alliance (Germany, Austria-Hungary, and Italy) and the Triple Entente (Britain, France, and Russia). This division created deep existential paranoia in Berlin regarding "encirclement" (Einkreisung), convincing German leadership that any loss of Austria-Hungary’s Great Power status would be fatal. Consequently, when Kaiser Wilhelm II issued the unconditional "Blank Cheque" to Vienna on 5 July 1914, he guaranteed German military backing for an invasion of Serbia even if Russia intervened. Similarly, France’s commitment to Russia ensured that Tsarist mobilization would automatically bring French armies into the field. Without these mutual obligations, the conflict between Austria-Hungary and Serbia would have remained a third Balkan War.\n\nOn the other hand, alliance commitments were not purely automatic mechanisms; the war was triggered by specific human decisions and militant imperial ambition. The immediate spark was the 28 June 1914 assassination of Archduke Franz Ferdinand in Sarajevo by Gavrilo Princip and the Black Hand. Austrian Chief of Staff Conrad von Hötzendorf seized upon this outrage to advocate a pre-emptive war of annihilation against Serbia. Moreover, the July Crisis was rendered uncontrollable by militarism and rigid mobilization timetables. Once Tsar Nicholas II ordered Russian general mobilization on 30 July, military commanders insisted that railway schedules could not be halted. Germany’s war plan, the Schlieffen Plan, dictated an immediate, rapid invasion of France through neutral Belgium before Russian forces fully concentrated. It was this deliberate violation of Belgian neutrality—shattering the 1839 Treaty of London—that compelled Great Britain to declare war on 4 August 1914.\n\nIn the final analysis, the statement is largely convincing. While the assassination at Sarajevo provided the initial spark and the Schlieffen Plan dictated the military timetable, it was the entangling alliance network that bound the survival of great powers together, ensuring that a single shot on the Latin Bridge inevitably plunged the entire European continent into catastrophe.',
        },
      ],
      quiz: [
        {
          q: 'Who assassinated Archduke Franz Ferdinand?',
          a: 'Gavrilo Princip',
          options: [
            'Nedeljko Cabrinovic',
            'Dragutin Dimitrijevic',
            'Gavrilo Princip',
            'Leon Trotsky',
          ],
        },
        {
          q: 'What was the name of the Serbian nationalist group responsible for the assassination?',
          a: 'The Black Hand',
          options: ['The Black Hand', 'The White Rose', 'The Red Guards', 'Young Bosnia'],
        },
        {
          q: 'On what exact date was the Archduke assassinated?',
          a: '28 June 1914',
          options: ['28 July 1914', '28 June 1914', '11 November 1918', '4 August 1914'],
        },
        {
          q: 'Which empire had annexed Bosnia in 1908, angering Serbian nationalists?',
          a: 'Austria-Hungary',
          options: ['Russia', 'Germany', 'The Ottoman Empire', 'Austria-Hungary'],
        },
        {
          q: 'Who was the heir to the Austro-Hungarian throne that visited Sarajevo?',
          a: 'Archduke Franz Ferdinand',
          options: [
            'Archduke Franz Ferdinand',
            'Tsar Nicholas II',
            'Emperor Franz Joseph',
            'Kaiser Wilhelm II',
          ],
        },
        {
          q: 'What terrorist group supplied the assassins with weapons?',
          a: 'The Black Hand',
          options: ['The Serbian Guard', 'The Black Hand', 'Young Bosnia', 'The Red Army'],
        },
        {
          q: 'What was the first, failed assassination attempt on the Archduke that morning?',
          a: 'A bomb was thrown at his car but bounced off',
          options: [
            'He was shot at but missed',
            'His driver was poisoned',
            'A bomb was thrown at his car but bounced off',
            'A bridge was blown up',
          ],
        },
        {
          q: "Why was Gavrilo Princip standing outside Schiller's Delicatessen when the Archduke's car stopped?",
          a: 'By total coincidence, the driver took a wrong turn and stalled the car right in front of him',
          options: [
            'The Archduke went in to buy a sandwich',
            'The police ordered the car to stop there',
            'By total coincidence, the driver took a wrong turn and stalled the car right in front of him',
            'Princip had planned the exact route',
          ],
        },
        {
          q: "What was the 'Blank Cheque'?",
          a: "Germany's promise of unconditional support to Austria-Hungary against Serbia",
          options: [
            'A bribe paid to the assassins',
            "Germany's promise of unconditional support to Austria-Hungary against Serbia",
            'A peace offer from Russia',
            'The money used to buy the guns',
          ],
        },
        {
          q: 'What happened on July 23, 1914?',
          a: 'Austria-Hungary sent an impossibly harsh ultimatum to Serbia',
          options: [
            'Austria-Hungary sent an impossibly harsh ultimatum to Serbia',
            'Germany invaded Belgium',
            'Russia declared war',
            'Britain joined the war',
          ],
        },
        {
          q: 'Why did Britain declare war on Germany on August 4, 1914?',
          a: 'Germany invaded neutral Belgium, violating the 1839 Treaty of London',
          options: [
            'Because France surrendered',
            'Because Germany sank a British ship',
            'Because of the assassination in Sarajevo',
            'Germany invaded neutral Belgium, violating the 1839 Treaty of London',
          ],
        },
      ],
      prologue:
        'On 28 June 1914, nineteen-year-old Gavrilo Princip fired two fatal pistol shots into the carriage of Archduke Franz Ferdinand in Sarajevo. Within thirty-seven days, ultimatums, imperial mobilisations, and German troops marching into neutral Belgium plunged Europe into total war. Could the catastrophic July Crisis have been avoided, or was war unstoppable?',
    },
    {
      id: 'lesson_6',
      title: 'November Assessment Masterclass: Why Did War Break Out in 1914?',
      enquiry: 'Why did war break out in 1914?',
      enquiryQuestion: 'Why did war break out in 1914?',
      subtitle:
        'Step-by-step PEEL Planning & Scaffolding Workshop: German Unification, Imperial Rivalry, Naval Arms Race, Alliances & Assassination',
      skill: 'Disciplinary Skill: Causal Explanation & Structured PEEL Synthesis',
      card_image: '/images/great_war_cover.jpg',
      card_position: 'center 45%',
      banner: '/images/great_war_cover.jpg',
      cover_image: '/images/great_war_cover.jpg',
      prologue:
        'Welcome to your Year 9 November Assessment Masterclass! In this workshop, you will prepare for your 30-minute formal assessment: "Why did war break out in 1914?". You will write three developed PEEL paragraphs choosing from four key historical catalysts: German unification, Imperial rivalry, the Naval arms race, or Alliances and the Sarajevo assassination. Remember: NO conclusion is needed for this question! Over your revision period, you are permitted to prepare ONE single sheet of A4 paper containing bullet points, mind maps, statistics, and dates to bring directly into the assessment room.',
      assessment_notice: {
        title: 'Year 9 November Formal Assessment Timetable & Rules',
        groups: [
          {
            set: 'Set 9Y',
            date: 'Monday 9th November',
            period: 'Formal Assessment (30 mins • 12 marks)',
          },
          {
            set: 'Set 9X',
            date: 'Thursday 12th November',
            period: 'Formal Assessment (30 mins • 12 marks)',
          },
        ],
        rules: [
          'You are permitted to bring ONE sheet of A4 lined paper with revision notes into the assessment.',
          'Notes MUST be in bullet points, timelines, or mind maps — strictly NO full continuous sentences or pre-written paragraphs.',
          'Write 3 developed PEEL paragraphs choosing 3 of the 4 key historical catalysts.',
          'Strictly 3 paragraphs — NO conclusion is required for this "Why" question!',
          'Total assessment time: 30 minutes (12 marks).',
        ],
      },
      margin_spine: [
        {
          year: '1871',
          label: 'Reason 1: German Unification',
        },
        {
          year: '1884–1911',
          label: 'Reason 2: Imperial Rivalry',
        },
        {
          year: '1898–1906',
          label: 'Reason 3: Naval Arms Race',
        },
        {
          year: '1879–1907',
          label: 'Reason 4a: Alliance Blocs',
        },
        {
          year: 'June 1914',
          label: 'Reason 4b: Sarajevo Assassination',
        },
      ],
      causal_domino_spine: {
        title: 'The Catalysts of the Great War (1871–1914)',
        subtitle:
          'How Decades of Imperial Tension, Militarism and Alliances Culminated in Global Conflict',
        stages: [
          {
            step: 1,
            para_ref: '[6.1]',
            date: '1871',
            title: 'Reason 1: German Unification & Alsace-Lorraine Seized',
            actor: 'Chancellor Otto von Bismarck & Kaiser Wilhelm I',
            tag: '🚩 NATIONALISM',
            trigger:
              'Prussia unites 39 independent states into the German Empire at Versailles and annexes Alsace-Lorraine from France.',
            connective:
              'Created a massive new military superpower in the heart of Europe and instilled a permanent French desire for revenge (Revanche).',
            question:
              'Why did German unification in 1871 permanently destabilise the European balance of power?',
          },
          {
            step: 2,
            para_ref: '[6.2]',
            date: '1884–1911',
            title: 'Reason 2: Imperial Rivalry & The Scramble for Africa',
            actor: 'Kaiser Wilhelm II & European Imperial Powers',
            tag: '🌍 IMPERIALISM',
            trigger:
              'European powers carved up Africa at the 1884 Berlin Conference; Wilhelm II launched Weltpolitik demanding Germany’s "place in the sun", sparking crises in Morocco (1905, 1911).',
            connective:
              'Drove Britain and France into a closer defensive alliance while isolating Germany and intensifying international paranoia.',
            question:
              'How did imperial ambitions in Africa poison diplomatic relations between Germany, France, and Britain?',
          },
          {
            step: 3,
            para_ref: '[6.3]',
            date: '1898–1906',
            title: 'Reason 3: Anglo-German Naval Race & HMS Dreadnought',
            actor: 'Admiral Tirpitz & Admiral Jackie Fisher',
            tag: '🎖️ MILITARISM',
            trigger:
              'Tirpitz passed Naval Laws to build 38 battleships; Britain launched the revolutionary all-big-gun HMS Dreadnought in 1906, resetting naval strength to zero.',
            connective:
              'Britain viewed Germany’s battlefleet as a direct threat to island survival and trade, ending British "Splendid Isolation".',
            question:
              'Why did the launch of HMS Dreadnought turn naval competition into an existential crisis?',
          },
          {
            step: 4,
            para_ref: '[6.4]',
            date: '1879–1907',
            title: 'Reason 4a: Division of Europe into Rival Armed Camps',
            actor: 'The Great Powers of Europe',
            tag: '🤝 ALLIANCES',
            trigger:
              'Europe split into two opposing blocs: Triple Alliance (Germany, Austria-Hungary, Italy) and Triple Entente (Britain, France, Russia).',
            connective:
              'Created an inflexible chain-reaction trap where any regional conflict would automatically drag all major powers into war.',
            question:
              'How did the alliance system ensure that a small dispute would escalate into a continent-wide war?',
          },
          {
            step: 5,
            para_ref: '[6.5]',
            date: '28 June 1914',
            title: 'Reason 4b: The Spark: Sarajevo Assassination & July Crisis',
            actor: 'Gavrilo Princip, Franz Ferdinand & Kaiser Wilhelm II',
            tag: '⚡ THE SPARK',
            trigger:
              'Serbian nationalist Gavrilo Princip shoots Archduke Franz Ferdinand; Germany gives Austria a "Blank Cheque", triggering mobilisations.',
            connective:
              'Rigid railway timetables and alliance obligations turned a local Balkan murder into an unstoppable world war within 37 days.',
            question:
              'Why did the assassination in Sarajevo trigger the immediate domino fall into global war?',
          },
        ],
      },
      teacher_notes: {
        primer:
          'This masterclass equips Year 9 students for their 30-minute formal written assessment: "Why did war break out in 1914?". Students select three developed reasons from four core curriculum strands: (1) German Unification and Bismarck; (2) Imperial Rivalry and the Scramble for Africa; (3) The Anglo-German Naval Arms Race and HMS Dreadnought; and (4) The Alliance System and the Sarajevo Assassination. Emphasize to lower-ability pupils that strictly 3 developed PEEL paragraphs are required with NO conclusion.',
        objectives: [
          {
            objective:
              'Select three developed historical reasons from the four assessment options and construct a compliant 1-page A4 revision notes sheet.',
            primer:
              'Direct students to paragraphs [6.2] through [6.5]. Emphasize that notes must be in bullet points, dates, and statistics only — no pre-drafted essays.',
            question:
              'What are the rules for your 1 sheet of A4 notes, and which three factors will you choose to explain?',
          },
          {
            objective:
              'Apply the PEEL technique (Point, Evidence, Explain, Link) with differentiated sentence frames to explain causation.',
            primer:
              'Review the color-coded PEEL models in the masterclass. Ensure pupils understand that the "Explain" step must show HOW the factor caused fear, suspicion, or military pressure leading to 1914.',
            question:
              'Why is explaining the causal mechanism (the "Because / Therefore" step) essential to securing top marks?',
          },
          {
            objective:
              'Structure 3 developed paragraphs within the 30-minute time constraint without wasting time on a conclusion.',
            primer:
              'Remind pupils that in a pure "Why" explanation question, marks are awarded for 3 detailed causal paragraphs. A conclusion is not required.',
            question: 'How will you divide your 30 minutes across the three paragraphs?',
          },
        ],
        source_context:
          'Contemporary archival records of the 1871 German Empire proclamation, the gunboat SMS Panther at Agadir, HMS Dreadnought, and the July Crisis illustrate how imperial ambition, naval rivalry, and rigid treaties triggered global conflict in 1914. Hinge Question: Which of the four catalysts made peaceful compromise impossible once Franz Ferdinand was assassinated?',
      },
      do_now: {
        title: 'Do Now: Retrieval from Prior Lessons',
        type: 'mixed',
        items: [
          {
            question: 'Who assassinated Archduke Franz Ferdinand on 28 June 1914 in Sarajevo?',
            answer: 'Gavrilo Princip (a member of the Serbian nationalist group the Black Hand).',
          },
          {
            question:
              'What unconditional pledge of military backing did Germany give Austria-Hungary on 5 July 1914?',
            answer:
              'The "Blank Cheque" (promising German support for whatever action Austria took against Serbia).',
          },
          {
            question:
              'What revolutionary British battleship launched in 1906 reset naval supremacy between Britain and Germany?',
            answer:
              'HMS Dreadnought (with 10 x 12-inch guns and steam turbines, making older warships obsolete).',
          },
          {
            question: 'Which three nations completed the Triple Entente alliance in 1907?',
            answer: 'Great Britain, France, and Tsarist Russia.',
          },
          {
            question:
              'Which two mineral-rich French border provinces were annexed by Germany following the Franco-Prussian War in 1871?',
            answer:
              'Alsace and Lorraine (creating deep French national desire for revenge, known as Revanche).',
          },
        ],
      },
      vocab: [
        {
          term: 'PEEL Technique',
          definition:
            'A 4-step paragraph structure for historical explanation: Point (topic factor), Evidence (precise facts & dates), Explain (cause-and-effect mechanism), Link (tie back to 1914).',
        },
        {
          term: 'M-A-I-N Causes',
          definition:
            'The four deep long-term causes of the First World War: Militarism, Alliances, Imperialism, and Nationalism.',
        },
        {
          term: 'Alsace-Lorraine',
          definition:
            'Mineral-rich French border province containing coal and iron ore, annexed by Germany in 1871, fueling French "Revanche".',
        },
        {
          term: 'Revanche',
          definition:
            'The deep French national desire for revenge against Germany and the liberation of the lost provinces of Alsace and Lorraine.',
        },
        {
          term: 'Weltpolitik',
          definition:
            'Kaiser Wilhelm II’s aggressive "world policy" launched in the 1890s, demanding a massive navy and a global empire ("a place in the sun").',
        },
        {
          term: 'Two-Power Standard',
          definition:
            'Britain’s official naval rule (Naval Defence Act 1889) that the Royal Navy must equal the combined strength of the next two largest navies.',
        },
        {
          term: 'HMS Dreadnought',
          definition:
            'Britain’s revolutionary 1906 battleship featuring ten 12-inch heavy guns and steam turbines, which made all previous battleships instantly obsolete.',
        },
        {
          term: 'Triple Alliance',
          definition:
            'The defensive military pact formed in 1882 between Germany, Austria-Hungary, and Italy.',
        },
        {
          term: 'Triple Entente',
          definition:
            'The diplomatic coalition formed in 1907 between Great Britain, France, and Tsarist Russia to counterbalance the Triple Alliance.',
        },
        {
          term: 'Blank Cheque',
          definition:
            'Kaiser Wilhelm II’s promise of unconditional German military support to Austria-Hungary in July 1914, emboldening Austria to declare war on Serbia.',
        },
      ],
      narrative_blocks: [
        {
          act: 1,
          title: 'Deconstructing the Question: "Why Did War Break Out in 1914?"',
          theme_heading: 'Deconstructing the Question: "Why Did War Break Out in 1914?"',
          text: '<span class="para-ref">[6.1]</span> In your formal November assessment, you will answer the central historical question: <strong>"Why did war break out in 1914?"</strong> [12 marks • 30 mins].<br><br>\n      To score full marks, you need to write <strong>strictly three developed PEEL paragraphs</strong> choosing 3 of the 4 key historical factors below. <strong>NO conclusion is required!</strong><br>\n      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px; margin: 16px 0;">\n        <div style="background: #ffffff; border: 1.5px solid #cbd5e1; border-left: 4px solid #ef4444; border-radius: 8px; padding: 12px 14px; box-shadow: 0 2px 4px rgba(0,0,0,0.03);">\n          <strong style="color: #991b1b; display: block; font-size: 0.95rem; margin-bottom: 4px;">1. German Unification (1871)</strong>\n          <span style="font-size: 0.84rem; color: #475569; line-height: 1.4;">Bismarck unites Germany, crowns Kaiser at Versailles, takes Alsace-Lorraine; French <em>Revanche</em>.</span>\n        </div>\n        <div style="background: #ffffff; border: 1.5px solid #cbd5e1; border-left: 4px solid #f59e0b; border-radius: 8px; padding: 12px 14px; box-shadow: 0 2px 4px rgba(0,0,0,0.03);">\n          <strong style="color: #92400e; display: block; font-size: 0.95rem; margin-bottom: 4px;">2. Imperial Rivalry &amp; Africa (1884–1911)</strong>\n          <span style="font-size: 0.84rem; color: #475569; line-height: 1.4;">Scramble for Africa, Wilhelm II\'s <em>Weltpolitik</em> ("place in the sun"), Moroccan Crises (1905, 1911).</span>\n        </div>\n        <div style="background: #ffffff; border: 1.5px solid #cbd5e1; border-left: 4px solid #3b82f6; border-radius: 8px; padding: 12px 14px; box-shadow: 0 2px 4px rgba(0,0,0,0.03);">\n          <strong style="color: #1e40af; display: block; font-size: 0.95rem; margin-bottom: 4px;">3. Naval Arms Race (1898–1914)</strong>\n          <span style="font-size: 0.84rem; color: #475569; line-height: 1.4;">British Two-Power Standard, German Naval Laws, launch of HMS Dreadnought (1906).</span>\n        </div>\n        <div style="background: #ffffff; border: 1.5px solid #cbd5e1; border-left: 4px solid #10b981; border-radius: 8px; padding: 12px 14px; box-shadow: 0 2px 4px rgba(0,0,0,0.03);">\n          <strong style="color: #065f46; display: block; font-size: 0.95rem; margin-bottom: 4px;">4. Alliances &amp; Sarajevo (1879–1914)</strong>\n          <span style="font-size: 0.84rem; color: #475569; line-height: 1.4;">Triple Alliance vs Triple Entente, Gavrilo Princip shoots Franz Ferdinand, Blank Cheque.</span>\n        </div>\n      </div>\n      <br><strong>The 30-Minute Timing Strategy (3 Paragraphs • No Conclusion):</strong><br>\n      • <strong>0–3 mins:</strong> Check your 1 sheet of A4 notes. Choose your 3 best factors.<br>\n      • <strong>3–12 mins (9 mins):</strong> Write Paragraph 1 using PEEL.<br>\n      • <strong>12–21 mins (9 mins):</strong> Write Paragraph 2 using PEEL.<br>\n      • <strong>21–30 mins (9 mins):</strong> Write Paragraph 3 using PEEL. Use final minute to check facts and spelling.<br><br>\n      <div style="margin: 16px 0; padding: 14px 18px; background: #eff6ff; border: 1.5px solid #93c5fd; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">\n        <div>\n          <span style="background: #1e40af; color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.72rem; font-weight: 800; text-transform: uppercase;">Assessment Gateway</span>\n          <strong style="margin-left: 8px; color: #1e3a8a; font-size: 0.95rem;">Need to revise the complete 1871–1914 Timeline?</strong>\n        </div>\n        <a href="/?view=lessons&unit=great_war" target="_blank" style="padding: 7px 15px; background: #2563eb; color: white; border-radius: 6px; text-decoration: none; font-size: 0.82rem; font-weight: 700; display: inline-flex; align-items: center; gap: 6px;">\n          <i class="fa-solid fa-arrow-up-right-from-square"></i> Open Causes of the Great War Unit Homepage\n        </a>\n      </div>',
        },
        {
          act: 2,
          title: 'Reason 1: German Unification, Bismarck & French Revanche (1871)',
          theme_heading: 'Reason 1: German Unification, Bismarck & French Revanche (1871)',
          text: '<span class="para-ref">[6.2]</span> In 1871, Prussian Minister-President <strong>Otto von Bismarck</strong> united thirty-nine independent German states into the German Empire after defeating France in the Franco-Prussian War. King Wilhelm I was crowned Kaiser in the French palace at Versailles. Under the 1871 <strong>Treaty of Frankfurt</strong>, Germany annexed the mineral-rich border province of <strong>Alsace-Lorraine</strong>.<br><br>\n      This caused war in 1914 because it created permanent French <strong>"Revanche"</strong> (revenge) and created a massive new military and industrial superpower in Central Europe, leaving Germany terrified of encirclement by France and Russia.<br><br>\n      <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-left: 5px solid #ef4444; border-radius: 8px; padding: 14px 18px; margin: 16px 0;">\n        <span style="font-size: 0.74rem; font-weight: 800; text-transform: uppercase; background: #fee2e2; color: #991b1b; padding: 2px 8px; border-radius: 4px;">Ready-to-Copy A4 Revision Notes • Reason 1</span>\n        <h4 style="margin: 8px 0 6px 0; color: #0f172a; font-size: 1rem;">Put these 4 bullet points on your 1 sheet of A4 paper:</h4>\n        <ul style="margin: 0; padding-left: 20px; font-size: 0.88rem; color: #334155; line-height: 1.6;">\n          <li><strong>1871 Unification:</strong> Bismarck used "blood and iron" to unite 39 states into the German Empire under Kaiser Wilhelm I.</li>\n          <li><strong>Treaty of Frankfurt:</strong> Germany seized mineral-rich <strong>Alsace-Lorraine</strong> and demanded 5 billion gold francs from France.</li>\n          <li><strong>Balance of Power:</strong> Germany instantly became the dominant military and steel superpower in Central Europe.</li>\n          <li><strong>French Revanche:</strong> France swore permanent revenge to reclaim Alsace-Lorraine, making lasting peace impossible.</li>\n        </ul>\n      </div>\n      <div style="margin: 16px 0; padding: 14px 18px; background: #eff6ff; border: 1.5px solid #93c5fd; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">\n        <div>\n          <span style="background: #1e40af; color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.72rem; font-weight: 800; text-transform: uppercase;">Revision Gateway</span>\n          <strong style="margin-left: 8px; color: #1e3a8a; font-size: 0.95rem;">Need to revise German Unification &amp; Alsace-Lorraine?</strong>\n        </div>\n        <a href="/?view=lessons&unit=great_war&lesson=1" target="_blank" style="padding: 7px 15px; background: #2563eb; color: white; border-radius: 6px; text-decoration: none; font-size: 0.82rem; font-weight: 700; display: inline-flex; align-items: center; gap: 6px;">\n          <i class="fa-solid fa-arrow-up-right-from-square"></i> Open Lesson 1: German Unification (1871–1890)\n        </a>\n      </div>',
        },
        {
          act: 3,
          title: 'Reason 2: Imperial Rivalry & The Scramble for Africa (1884–1911)',
          theme_heading: 'Reason 2: Imperial Rivalry & The Scramble for Africa (1884–1911)',
          text: '<span class="para-ref">[6.3]</span> In the 1880s, European powers competed to conquer overseas colonies during the <strong>Scramble for Africa</strong> (carved up at the 1884 Berlin Conference). In 1890, Kaiser Wilhelm II launched <strong>Weltpolitik</strong> ("World Policy"), aggressively demanding Germany\'s overseas <strong>"place in the sun"</strong> equal to Britain and France.<br><br>\n      This caused war in 1914 because Germany provoked two dangerous flashpoints in Morocco (landing at <strong>Tangier</strong> in 1905 and sending the gunboat <strong>SMS Panther</strong> to Agadir in 1911). Rather than dividing Britain and France, German aggression drove the two powers into secret military talks and a firm defensive alliance.<br><br>\n      <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-left: 5px solid #f59e0b; border-radius: 8px; padding: 14px 18px; margin: 16px 0;">\n        <span style="font-size: 0.74rem; font-weight: 800; text-transform: uppercase; background: #fef3c7; color: #92400e; padding: 2px 8px; border-radius: 4px;">Ready-to-Copy A4 Revision Notes • Reason 2</span>\n        <h4 style="margin: 8px 0 6px 0; color: #0f172a; font-size: 1rem;">Put these 4 bullet points on your 1 sheet of A4 paper:</h4>\n        <ul style="margin: 0; padding-left: 20px; font-size: 0.88rem; color: #334155; line-height: 1.6;">\n          <li><strong>Scramble for Africa (1884):</strong> 1884 Berlin Conference partitioned Africa; Britain and France took the richest colonies.</li>\n          <li><strong>Weltpolitik:</strong> Kaiser Wilhelm II demanded Germany\'s "place in the sun" through aggressive overseas empire building.</li>\n          <li><strong>Moroccan Crises:</strong> Germany challenged French control at Tangier (1905) and sent the gunboat <em>SMS Panther</em> to Agadir (1911).</li>\n          <li><strong>Strengthened Entente:</strong> German bullying backfired, uniting Britain and France into a firm defensive military partnership.</li>\n        </ul>\n      </div>\n      <div style="margin: 16px 0; padding: 14px 18px; background: #eff6ff; border: 1.5px solid #93c5fd; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">\n        <div>\n          <span style="background: #1e40af; color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.72rem; font-weight: 800; text-transform: uppercase;">Revision Gateway</span>\n          <strong style="margin-left: 8px; color: #1e3a8a; font-size: 0.95rem;">Need to revise Imperial Rivalry &amp; Morocco?</strong>\n        </div>\n        <a href="/?view=lessons&unit=great_war&lesson=2" target="_blank" style="padding: 7px 15px; background: #2563eb; color: white; border-radius: 6px; text-decoration: none; font-size: 0.82rem; font-weight: 700; display: inline-flex; align-items: center; gap: 6px;">\n          <i class="fa-solid fa-arrow-up-right-from-square"></i> Open Lesson 2: Imperialism &amp; Moroccan Crises (1884–1911)\n        </a>\n      </div>',
        },
        {
          act: 4,
          title: 'Reason 3: The Anglo-German Naval Arms Race & HMS Dreadnought (1898–1914)',
          theme_heading: 'Reason 3: The Anglo-German Naval Arms Race & HMS Dreadnought (1898–1914)',
          text: '<span class="para-ref">[6.4]</span> As an island nation, Great Britain relied on absolute naval mastery for trade and survival, enforcing the <strong>Two-Power Standard</strong> (the Royal Navy must equal the next two biggest navies combined). In 1898, Admiral Alfred von Tirpitz passed the German Naval Laws to build 38 battleships directly facing Britain across the North Sea.<br><br>\n      In 1906, Britain launched <strong>HMS Dreadnought</strong>, an all-big-gun battleship that made all older warships obsolete and reset the race to zero. Although Britain won the race (29 dreadnoughts to 17 by 1914), the building contest convinced Britain that Germany was a deadly threat to British survival.<br><br>\n      <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-left: 5px solid #3b82f6; border-radius: 8px; padding: 14px 18px; margin: 16px 0;">\n        <span style="font-size: 0.74rem; font-weight: 800; text-transform: uppercase; background: #dbeafe; color: #1e40af; padding: 2px 8px; border-radius: 4px;">Ready-to-Copy A4 Revision Notes • Reason 3</span>\n        <h4 style="margin: 8px 0 6px 0; color: #0f172a; font-size: 1rem;">Put these 4 bullet points on your 1 sheet of A4 paper:</h4>\n        <ul style="margin: 0; padding-left: 20px; font-size: 0.88rem; color: #334155; line-height: 1.6;">\n          <li><strong>Two-Power Standard:</strong> Britain’s 1889 rule that the Royal Navy must equal the next two biggest navies combined.</li>\n          <li><strong>German Naval Laws (1898):</strong> Admiral Tirpitz built 38 battleships directly opposite Britain to challenge British naval supremacy.</li>\n          <li><strong>HMS Dreadnought (1906):</strong> Revolutionary all-big-gun warship (10 x 12-inch guns) that reset the battleship race to zero.</li>\n          <li><strong>Naval Panic &amp; Tension:</strong> Public chanted "We want eight and we won\'t wait!"; permanently destroyed friendly Anglo-German relations.</li>\n        </ul>\n      </div>\n      <div style="margin: 16px 0; padding: 14px 18px; background: #eff6ff; border: 1.5px solid #93c5fd; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">\n        <div>\n          <span style="background: #1e40af; color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.72rem; font-weight: 800; text-transform: uppercase;">Revision Gateway</span>\n          <strong style="margin-left: 8px; color: #1e3a8a; font-size: 0.95rem;">Need to revise the Naval Race &amp; Dreadnought?</strong>\n        </div>\n        <a href="/?view=lessons&unit=great_war&lesson=3" target="_blank" style="padding: 7px 15px; background: #2563eb; color: white; border-radius: 6px; text-decoration: none; font-size: 0.82rem; font-weight: 700; display: inline-flex; align-items: center; gap: 6px;">\n          <i class="fa-solid fa-arrow-up-right-from-square"></i> Open Lesson 3: Naval Arms Race &amp; HMS Dreadnought (1898–1914)\n        </a>\n      </div>',
        },
        {
          act: 5,
          title: 'Reason 4: Rival Alliances & The Sarajevo Assassination (1879–1914)',
          theme_heading: 'Reason 4: Rival Alliances & The Sarajevo Assassination (1879–1914)',
          text: '<span class="para-ref">[6.5]</span> By 1914, Europe was split into two hostile armed camps: the <strong>Triple Alliance</strong> (Germany, Austria-Hungary, Italy) and the <strong>Triple Entente</strong> (Britain, France, Russia). While designed to deter attack, the alliances created a lethal trap where an attack on one ally dragged all six into war.<br><br>\n      On <strong>28 June 1914</strong>, Serbian nationalist <strong>Gavrilo Princip</strong> (Black Hand) assassinated Austrian Archduke <strong>Franz Ferdinand</strong> in Sarajevo. Germany gave Austria an unconditional <strong>"Blank Cheque"</strong> (5 July), causing Austria\'s attack on Serbia to trigger Russian, German, French, and British entry within six weeks.<br><br>\n      <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-left: 5px solid #10b981; border-radius: 8px; padding: 14px 18px; margin: 16px 0;">\n        <span style="font-size: 0.74rem; font-weight: 800; text-transform: uppercase; background: #d1fae5; color: #065f46; padding: 2px 8px; border-radius: 4px;">Ready-to-Copy A4 Revision Notes • Reason 4</span>\n        <h4 style="margin: 8px 0 6px 0; color: #0f172a; font-size: 1rem;">Put these 4 bullet points on your 1 sheet of A4 paper:</h4>\n        <ul style="margin: 0; padding-left: 20px; font-size: 0.88rem; color: #334155; line-height: 1.6;">\n          <li><strong>Two Armed Camps:</strong> Triple Alliance (Germany, Austria, Italy) vs Triple Entente (Britain, France, Russia) created a domino trap.</li>\n          <li><strong>Sarajevo (28 June 1914):</strong> Gavrilo Princip (Black Hand) shot Archduke Franz Ferdinand and wife Sophie in Sarajevo.</li>\n          <li><strong>German Blank Cheque (5 July):</strong> Kaiser promised unconditional backing to Austria-Hungary, leading Austria to invade Serbia.</li>\n          <li><strong>Chain Reaction (Aug 1914):</strong> Russia mobilized; Germany enacted Schlieffen Plan through Belgium; Britain declared war (4 Aug).</li>\n        </ul>\n      </div>\n      <div style="margin: 16px 0; padding: 14px 18px; background: #eff6ff; border: 1.5px solid #93c5fd; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">\n        <div>\n          <span style="background: #1e40af; color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.72rem; font-weight: 800; text-transform: uppercase;">Revision Gateways</span>\n          <strong style="margin-left: 8px; color: #1e3a8a; font-size: 0.95rem;">Need to revise Alliances or the July Crisis?</strong>\n        </div>\n        <div style="display: flex; gap: 8px; flex-wrap: wrap;">\n          <a href="/?view=lessons&unit=great_war&lesson=4" target="_blank" style="padding: 7px 15px; background: #2563eb; color: white; border-radius: 6px; text-decoration: none; font-size: 0.82rem; font-weight: 700; display: inline-flex; align-items: center; gap: 6px;">\n            <i class="fa-solid fa-arrow-up-right-from-square"></i> Open Lesson 4: Alliances &amp; Balkans\n          </a>\n          <a href="/?view=lessons&unit=great_war&lesson=5" target="_blank" style="padding: 7px 15px; background: #1e40af; color: white; border-radius: 6px; text-decoration: none; font-size: 0.82rem; font-weight: 700; display: inline-flex; align-items: center; gap: 6px;">\n            <i class="fa-solid fa-arrow-up-right-from-square"></i> Open Lesson 5: Sarajevo &amp; July Crisis\n          </a>\n        </div>\n      </div>',
        },
      ],
      tasks: [
        {
          id: 'gw_l6_assessment_masterclass',
          type: 'extended_writing',
          topic: 'November Assessment: Why Did War Break Out in 1914? [12 marks • 30 mins]',
          title: 'November Assessment: Why Did War Break Out in 1914? [12 marks • 30 mins]',
          question:
            'Why did war break out in 1914? Explain three reasons using the PEEL technique. [12 marks • 30 mins]',
          stimulus: [
            '1. German unification and Bismarck (1871)',
            '2. Imperial rivalry and the Scramble for Africa (1884–1911)',
            '3. Naval Arms race and HMS Dreadnought (1898–1914)',
            '4. Alliances and the Sarajevo assassination (1879–1914)',
          ],
          scaffolding: {
            guidance:
              'Choose THREE of the four reasons above. Write strictly three developed PEEL paragraphs (Point, Evidence, Explain, Link). NO conclusion is required for this "Why" question! You are allowed to use your ONE sheet of A4 revision notes (bullet points, mind maps, statistics, and dates only). Aim for approximately 9 minutes per paragraph.',
            structure_strip: [
              {
                col: '1. PARAGRAPH 1 (FIRST FACTOR)',
                prompt:
                  'State your first factor clearly. Deploy 2–3 precise facts from your notes (e.g. 1871 Unification, Alsace-Lorraine, 5 billion francs). Explain HOW it created tension/fear. Link directly back to 1914.',
                starter: 'A primary reason explaining why war broke out in 1914 was [Factor 1]...',
              },
              {
                col: '2. PARAGRAPH 2 (SECOND FACTOR)',
                prompt:
                  'State your second factor clearly. Deploy precise factual evidence (e.g. Two-Power Standard, 1898 Naval Laws, HMS Dreadnought 1906). Explain the causal mechanism. Link back to 1914.',
                starter:
                  'Furthermore, a second decisive factor that caused the war was [Factor 2]...',
              },
              {
                col: '3. PARAGRAPH 3 (THIRD FACTOR)',
                prompt:
                  'State your third factor clearly. Detail factual evidence (e.g. Triple Alliance vs Triple Entente, Gavrilo Princip 28 June 1914, Blank Cheque). Explain the domino chain reaction. Link back to 1914.',
                starter:
                  'Additionally, an essential reason explaining why war erupted was [Factor 3]...',
              },
            ],
          },
          hints: [
            'Point (P): Start each paragraph by stating your factor clearly: "A primary reason explaining why war broke out in 1914 was..."',
            'Evidence (E): Include specific facts, dates, and names from your 1 sheet of A4 notes: 1871, Alsace-Lorraine, 1884 Berlin Conference, Weltpolitik, HMS Dreadnought 1906, 28 June 1914, Gavrilo Princip, Blank Cheque.',
            'Explain (E): Use "Because / Therefore" to explain the mechanism: explain WHY this factor made a country feel threatened or compelled to mobilize.',
            'Link (L): Always end the paragraph by tying directly back to 1914: "Therefore, this contributed directly to war in 1914 because..."',
            'No Conclusion Needed: This is an explanation question. Full marks are awarded for 3 developed PEEL paragraphs. Do not waste time writing a conclusion!',
          ],
          model_answer:
            '<strong>[P - Point]</strong> A primary reason why war broke out in 1914 was German unification and the seizure of Alsace-Lorraine in 1871.<br><strong>[E - Evidence]</strong> Chancellor Otto von Bismarck used "blood and iron" to unite thirty-nine German states into a single empire, defeating France in the Franco-Prussian War and seizing the mineral-rich border province of Alsace-Lorraine under the 1871 Treaty of Frankfurt.<br><strong>[E - Explain]</strong> This created permanent French <em>"Revanche"</em> (revenge), while creating a massive new military superpower in Central Europe that left Germany constantly terrified of encirclement.<br><strong>[L - Link]</strong> Therefore, German unification caused war in 1914 because it made lasting peace between France and Germany impossible, ensuring France would mobilize against Germany the moment conflict erupted.<br><br><strong>[P - Point]</strong> Furthermore, a second decisive factor that caused the war was the Anglo-German naval arms race.<br><strong>[E - Evidence]</strong> Under the Two-Power Standard, Britain required a navy equal to the next two navies combined. When Germany passed Naval Laws to build 38 battleships, Britain launched the revolutionary all-big-gun HMS Dreadnought in 1906, resetting the naval race to zero.<br><strong>[E - Explain]</strong> Because Britain was an island nation relying on maritime trade for food, Germany’s High Seas Fleet was seen as an existential threat to British survival.<br><strong>[L - Link]</strong> Consequently, this contributed to war because it destroyed Anglo-German relations, ending British isolation and pushing Britain into a firm alliance with France and Russia.<br><br><strong>[P - Point]</strong> Additionally, a third decisive reason explaining why war broke out was the alliance system combined with the Sarajevo assassination.<br><strong>[E - Evidence]</strong> On 28 June 1914, Gavrilo Princip of the Black Hand shot Archduke Franz Ferdinand in Sarajevo. On 5 July, Germany gave Austria-Hungary an unconditional "Blank Cheque" of military backing to crush Serbia.<br><strong>[E - Explain]</strong> This transformed a local Balkan murder into a world war because Europe was divided into two armed camps (the Triple Alliance and Triple Entente), where an attack on one ally triggered the automatic domino mobilization of all.<br><strong>[L - Link]</strong> Therefore, alliances directly caused war in August 1914 because they trapped all five Great Powers into an unstoppable chain reaction from which none could escape.<br><br><em>(Note for Pupils: Notice how this model answer contains strictly 3 developed PEEL paragraphs. No conclusion is required for this 12-mark assessment!)</em>',
        },
      ],
      quick_quiz: [
        {
          question:
            'How many sovereign German states existed before Otto von Bismarck united Germany in 1871?',
          options: ['39 independent states', '4 states', '100 states', '12 states'],
          answer: '39 independent states',
          explanation:
            'Prior to 1871, Central Europe consisted of thirty-nine independent German states, led by Prussia and Austria.',
        },
        {
          question:
            'Which two French border provinces were annexed by Germany under the 1871 Treaty of Frankfurt?',
          options: [
            'Normandy and Brittany',
            'Flanders and Wallonia',
            'Alsace and Lorraine',
            'Bavaria and Saxony',
          ],
          answer: 'Alsace and Lorraine',
          explanation:
            'Germany annexed Alsace-Lorraine for its coal, iron, and textile industries, creating the French desire for "Revanche".',
        },
        {
          question:
            'What was Kaiser Wilhelm II’s aggressive foreign policy demanding an empire called?',
          options: [
            'Laissez-faire',
            'Realpolitik',
            'Splendid Isolation',
            'Weltpolitik ("World Policy")',
          ],
          answer: 'Weltpolitik ("World Policy")',
          explanation:
            'Wilhelm II launched Weltpolitik in the 1890s, demanding Germany’s "place in the sun" through colonial and naval expansion.',
        },
        {
          question:
            'In which North African country did Kaiser Wilhelm II trigger major crises in 1905 and 1911?',
          options: ['Egypt', 'Morocco', 'South Africa', 'Sudan'],
          answer: 'Morocco',
          explanation:
            'The Kaiser landed at Tangier (1905) and sent the gunboat Panther to Agadir (1911) to challenge French colonial dominance.',
        },
        {
          question:
            'What British naval policy decreed that the Royal Navy must equal the next two biggest navies combined?',
          options: [
            'Risk Theory',
            'The Two-Power Standard',
            'The Dreadnought Doctrine',
            'Splendid Isolation',
          ],
          answer: 'The Two-Power Standard',
          explanation:
            'The Naval Defence Act 1889 established the Two-Power Standard to guarantee British island survival and trade protection.',
        },
        {
          question:
            'In what year was the revolutionary British battleship HMS Dreadnought launched at Portsmouth?',
          options: ['1871', '1914', '1898', '1906'],
          answer: '1906',
          explanation:
            'HMS Dreadnought was launched in February 1906, armed with ten 12-inch guns and steam turbines.',
        },
        {
          question: 'Which three Great Powers formed the Triple Entente in 1907?',
          options: [
            'Great Britain, France, and Russia',
            'Germany, Austria-Hungary, and Italy',
            'France, Russia, and Serbia',
            'Britain, Germany, and Belgium',
          ],
          answer: 'Great Britain, France, and Russia',
          explanation:
            'Britain settled colonial disputes with France (1904) and Russia (1907) to complete the Triple Entente.',
        },
        {
          question: 'On what date was Archduke Franz Ferdinand assassinated in Sarajevo?',
          options: ['4 August 1914', '18 January 1871', '28 June 1914', '11 November 1918'],
          answer: '28 June 1914',
          explanation:
            'Nineteen-year-old Gavrilo Princip shot Franz Ferdinand and his wife Sophie on 28 June 1914 in Sarajevo.',
        },
        {
          question:
            'What was Germany’s promise of unconditional military backing to Austria-Hungary on 5 July 1914 called?',
          options: [
            'The Reinsurance Treaty',
            'The "Blank Cheque"',
            'The Schlieffen Plan',
            'The Dual Alliance',
          ],
          answer: 'The "Blank Cheque"',
          explanation:
            'Kaiser Wilhelm II gave Austria a "Blank Cheque", encouraging Austrian hawks to issue an impossible ultimatum to Serbia.',
        },
        {
          question: 'Is a conclusion required in your 30-minute Year 9 assessment?',
          options: [
            'YES — you must spend 15 minutes on a conclusion',
            'YES — a 2-page conclusion is mandatory',
            'NO — strictly 3 developed PEEL paragraphs only',
            'Only if you finish in the first 5 minutes',
          ],
          answer: 'NO — strictly 3 developed PEEL paragraphs only',
          explanation:
            'Full marks are awarded for 3 developed PEEL paragraphs. No conclusion is required for this 12-mark question.',
        },
      ],
      flashcards: [
        {
          q: 'What does PEEL stand for in historical writing?',
          a: 'Point (state factor), Evidence (deploy facts/dates), Explain (how it caused tension), Link (tie back to 1914).',
        },
        {
          q: 'Do you need to write a conclusion in this 30-minute assessment?',
          a: 'NO! Strictly three developed PEEL paragraphs are required. No conclusion is needed.',
        },
        {
          q: 'How did German Unification in 1871 create long-term tension?',
          a: 'Unified 39 states into a superpower and seized Alsace-Lorraine, creating permanent French "Revanche" (revenge).',
        },
        {
          q: 'How did Imperial Rivalry in Africa bring Europe closer to war?',
          a: 'Kaiser Wilhelm II demanded a "place in the sun" (Weltpolitik), provoking the 1905 and 1911 Moroccan Crises that drove Britain and France together.',
        },
        {
          q: 'Why did HMS Dreadnought in 1906 reset the naval arms race?',
          a: 'It was armed with ten 12-inch guns and steam turbines, making all older warships obsolete and forcing Britain and Germany into a direct building race.',
        },
        {
          q: 'What are the strict rules for your 1 sheet of A4 revision notes?',
          a: 'Bullet points, mind maps, dates, and statistics only. Strictly NO pre-written essays, full sentences, or drafted paragraphs allowed.',
        },
      ],
      exam_practice: {
        question:
          'Why did war break out in 1914? Explain three reasons using the PEEL technique. [12 marks • 30 mins]',
        type: '12-mark',
        marks: 12,
        stimulus: [
          '1. German unification and Bismarck (1871)',
          '2. Imperial rivalry and the Scramble for Africa (1884–1911)',
          '3. Naval Arms race and HMS Dreadnought (1898–1914)',
          '4. Alliances and the Sarajevo assassination (1879–1914)',
        ],
        hints: [
          'Choose 3 of the 4 factors. Write a developed PEEL paragraph for each (approx 9 mins per paragraph).',
          'Point: State your factor clearly using the question stem.',
          'Evidence: Include specific facts, dates, and names from your 1 sheet of A4 notes.',
          'Explain: Explain the causal mechanism: WHY did this factor create suspicion, fear, or military escalation?',
          'Link: Connect directly back to 1914.',
          'NO CONCLUSION: Full marks are awarded for 3 developed paragraphs. Do not write a conclusion!',
        ],
      },
      quiz: [
        {
          question:
            'How many sovereign German states existed before Otto von Bismarck united Germany in 1871?',
          options: ['4 states', '100 states', '12 states', '39 independent states'],
          answer: '39 independent states',
          explanation:
            'Prior to 1871, Central Europe consisted of thirty-nine independent German states, led by Prussia and Austria.',
        },
        {
          question:
            'Which two French border provinces were annexed by Germany under the 1871 Treaty of Frankfurt?',
          options: [
            'Alsace and Lorraine',
            'Normandy and Brittany',
            'Flanders and Wallonia',
            'Bavaria and Saxony',
          ],
          answer: 'Alsace and Lorraine',
          explanation:
            'Germany annexed Alsace-Lorraine for its coal, iron, and textile industries, creating the French desire for "Revanche".',
        },
        {
          question:
            'What was Kaiser Wilhelm II’s aggressive foreign policy demanding an empire called?',
          options: [
            'Laissez-faire',
            'Weltpolitik ("World Policy")',
            'Realpolitik',
            'Splendid Isolation',
          ],
          answer: 'Weltpolitik ("World Policy")',
          explanation:
            'Wilhelm II launched Weltpolitik in the 1890s, demanding Germany’s "place in the sun" through colonial and naval expansion.',
        },
        {
          question:
            'In which North African country did Kaiser Wilhelm II trigger major crises in 1905 and 1911?',
          options: ['Egypt', 'South Africa', 'Morocco', 'Sudan'],
          answer: 'Morocco',
          explanation:
            'The Kaiser landed at Tangier (1905) and sent the gunboat Panther to Agadir (1911) to challenge French colonial dominance.',
        },
        {
          question:
            'What British naval policy decreed that the Royal Navy must equal the next two biggest navies combined?',
          options: [
            'Risk Theory',
            'The Dreadnought Doctrine',
            'Splendid Isolation',
            'The Two-Power Standard',
          ],
          answer: 'The Two-Power Standard',
          explanation:
            'The Naval Defence Act 1889 established the Two-Power Standard to guarantee British island survival and trade protection.',
        },
        {
          question:
            'In what year was the revolutionary British battleship HMS Dreadnought launched at Portsmouth?',
          options: ['1906', '1871', '1914', '1898'],
          answer: '1906',
          explanation:
            'HMS Dreadnought was launched in February 1906, armed with ten 12-inch guns and steam turbines.',
        },
        {
          question: 'Which three Great Powers formed the Triple Entente in 1907?',
          options: [
            'Germany, Austria-Hungary, and Italy',
            'Great Britain, France, and Russia',
            'France, Russia, and Serbia',
            'Britain, Germany, and Belgium',
          ],
          answer: 'Great Britain, France, and Russia',
          explanation:
            'Britain settled colonial disputes with France (1904) and Russia (1907) to complete the Triple Entente.',
        },
        {
          question: 'On what date was Archduke Franz Ferdinand assassinated in Sarajevo?',
          options: ['4 August 1914', '18 January 1871', '28 June 1914', '11 November 1918'],
          answer: '28 June 1914',
          explanation:
            'Nineteen-year-old Gavrilo Princip shot Franz Ferdinand and his wife Sophie on 28 June 1914 in Sarajevo.',
        },
        {
          question:
            'What was Germany’s promise of unconditional military backing to Austria-Hungary on 5 July 1914 called?',
          options: [
            'The Reinsurance Treaty',
            'The Schlieffen Plan',
            'The Dual Alliance',
            'The "Blank Cheque"',
          ],
          answer: 'The "Blank Cheque"',
          explanation:
            'Kaiser Wilhelm II gave Austria a "Blank Cheque", encouraging Austrian hawks to issue an impossible ultimatum to Serbia.',
        },
        {
          question: 'Is a conclusion required in your 30-minute Year 9 assessment?',
          options: [
            'NO — strictly 3 developed PEEL paragraphs only',
            'YES — you must spend 15 minutes on a conclusion',
            'YES — a 2-page conclusion is mandatory',
            'Only if you finish in the first 5 minutes',
          ],
          answer: 'NO — strictly 3 developed PEEL paragraphs only',
          explanation:
            'Full marks are awarded for 3 developed PEEL paragraphs. No conclusion is required for this 12-mark question.',
        },
      ],
    },
  ],
  quizPack: [
    {
      q: 'In what year did the Franco-Prussian War end?',
      a: '1871',
      options: ['1882', '1914', '1871', '1890'],
      id: 'gw_q1',
    },
    {
      q: 'Which wealthy region did Germany take from France in 1871?',
      a: 'Alsace-Lorraine',
      options: ['Alsace-Lorraine', 'The Rhineland', 'The Sudetenland', 'The Ruhr Valley'],
      id: 'gw_q2',
    },
    {
      q: 'What was the French desire for revenge called?',
      a: 'Revanche',
      options: ['Weltpolitik', 'Encirclement', 'Pan-Slavism', 'Revanche'],
      id: 'gw_q3',
    },
    {
      q: 'Who was the German Chancellor that unified Germany?',
      a: 'Otto von Bismarck',
      options: [
        'Kaiser Wilhelm II',
        'Otto von Bismarck',
        'Count Leo von Caprivi',
        'Theobald von Bethmann-Hollweg',
      ],
      id: 'gw_q4',
    },
    {
      q: "What was Bismarck's greatest strategic fear?",
      a: 'A war on two fronts (Encirclement)',
      options: [
        'A British naval blockade',
        'An uprising by the working class',
        'A war on two fronts (Encirclement)',
        'The collapse of Austria-Hungary',
      ],
      id: 'gw_q5',
    },
    {
      q: 'Which two countries did Bismarck fear would ally against Germany?',
      a: 'France and Russia',
      options: [
        'Britain and Russia',
        'Britain and France',
        'Russia and Austria-Hungary',
        'France and Russia',
      ],
      id: 'gw_q6',
    },
    {
      q: 'What was the secret 1887 agreement between Germany and Russia?',
      a: 'The Reinsurance Treaty',
      options: [
        'The Entente Cordiale',
        'The Reinsurance Treaty',
        'The Dual Alliance',
        'The Treaty of London',
      ],
      id: 'gw_q7',
    },
    {
      q: 'Which ambitious German Emperor dismissed Bismarck in 1890?',
      a: 'Kaiser Wilhelm II',
      options: [
        'Kaiser Wilhelm II',
        'Kaiser Wilhelm I',
        'Archduke Franz Ferdinand',
        'Tsar Nicholas II',
      ],
      id: 'gw_q8',
    },
    {
      q: "What was Wilhelm II's aggressive global policy called?",
      a: 'Weltpolitik (World Policy)',
      options: ['Realpolitik', 'Lebensraum', 'Splendid Isolation', 'Weltpolitik (World Policy)'],
      id: 'gw_q9',
    },
    {
      q: "What previous policy of Bismarck's focused on European peace?",
      a: 'Realpolitik',
      options: ['Realpolitik', 'Weltpolitik (World Policy)', 'Mitteleuropa', 'Pan-Slavism'],
      id: 'gw_q10',
    },
    {
      q: 'What agreement did Britain and France sign in 1904?',
      a: 'The Entente Cordiale',
      options: [
        'The Triple Entente',
        'The Entente Cordiale',
        'The Treaty of Versailles',
        'The Reinsurance Treaty',
      ],
      id: 'gw_q11',
    },
    {
      q: 'In which African country did Wilhelm provoke crises in 1905 and 1911?',
      a: 'Morocco',
      options: ['South Africa', 'Sudan', 'Morocco', 'Egypt'],
      id: 'gw_q12',
    },
    {
      q: 'What was the result of the First Moroccan (Tangier) Crisis?',
      a: 'Britain and France grew closer, isolating Germany',
      options: [
        'Russia declared war on Germany',
        'Germany gained control of Morocco',
        'The Entente Cordiale was dissolved',
        'Britain and France grew closer, isolating Germany',
      ],
      id: 'gw_q13',
    },
    {
      q: "What name was given to Germany's aggressive threat of military force?",
      a: 'Gunboat Diplomacy',
      options: ['Dollar Diplomacy', 'Gunboat Diplomacy', 'Appeasement', 'Risk Theory'],
      id: 'gw_q14',
    },
    {
      q: 'What was the name of the German gunboat sent to Agadir in 1911?',
      a: 'SMS Panther',
      options: ['SMS Bismarck', 'HMS Dreadnought', 'SMS Panther', 'SMS Emden'],
      id: 'gw_q15',
    },
    {
      q: 'What was the British policy requiring their navy to be larger than the next two combined?',
      a: 'The Two-Power Standard',
      options: [
        'The Two-Power Standard',
        'The Risk Theory',
        'The Imperial Defense Act',
        'The Continental Commitment',
      ],
      id: 'gw_q16',
    },
    {
      q: 'What revolutionary British battleship was launched in 1906?',
      a: 'HMS Dreadnought',
      options: ['HMS Victory', 'HMS Invincible', 'HMS Iron Duke', 'HMS Dreadnought'],
      id: 'gw_q17',
    },
    {
      q: 'Why did the Dreadnought ironically threaten British supremacy?',
      a: 'It made all older ships obsolete, resetting the naval race',
      options: [
        'It was too expensive to build more than one',
        'It was easily destroyed by German U-Boats',
        'It made all older ships obsolete, resetting the naval race',
        'Its guns could not hit moving targets',
      ],
      id: 'gw_q18',
    },
    {
      q: "What was Britain's traditional foreign policy of avoiding European alliances called?",
      a: 'Splendid Isolation',
      options: ['Splendid Isolation', 'Balance of Power', 'Appeasement', 'The Two-Power Standard'],
      id: 'gw_q19',
    },
    {
      q: "What was German Admiral Tirpitz's naval strategy called?",
      a: 'Risk Theory',
      options: [
        'The Schlieffen Plan',
        'Risk Theory',
        'Weltpolitik',
        'Unrestricted Submarine Warfare',
      ],
      id: 'gw_q20',
    },
    {
      q: "What volatile region was known as the 'Powder Keg of Europe'?",
      a: 'The Balkans',
      options: ['The Rhineland', 'The Balkans', 'The Middle East', 'The Caucasus'],
      id: 'gw_q21',
    },
    {
      q: 'What declining multi-ethnic empire dominated the northern Balkans?',
      a: 'The Austro-Hungarian Empire',
      options: [
        'The British Empire',
        'The Ottoman Empire',
        'The Austro-Hungarian Empire',
        'The Russian Empire',
      ],
      id: 'gw_q22',
    },
    {
      q: 'Which empire was retreating from the Balkans, leaving a power vacuum?',
      a: 'The Ottoman Empire',
      options: [
        'The German Empire',
        'The Austro-Hungarian Empire',
        'The Russian Empire',
        'The Ottoman Empire',
      ],
      id: 'gw_q23',
    },
    {
      q: "Which nation wanted to unite all South Slavs into a 'Greater' nation?",
      a: 'Serbia',
      options: ['Serbia', 'Croatia', 'Bulgaria', 'Bosnia'],
      id: 'gw_q24',
    },
    {
      q: 'Which region did Austria-Hungary formally annex in 1908?',
      a: 'Bosnia',
      options: ['Bosnia', 'Serbia', 'Romania', 'Albania'],
      id: 'gw_q25',
    },
    {
      q: 'Which major power considered itself the protector of the Slavic people?',
      a: 'Russia',
      options: ['Germany', 'France', 'Russia', 'Britain'],
      id: 'gw_q26',
    },
    {
      q: 'Who was the heir to the Austro-Hungarian throne?',
      a: 'Archduke Franz Ferdinand',
      options: [
        'Emperor Franz Joseph',
        'Archduke Franz Ferdinand',
        'Kaiser Wilhelm II',
        'Tsar Nicholas II',
      ],
      id: 'gw_q27',
    },
    {
      q: 'In which city was the Archduke assassinated?',
      a: 'Sarajevo',
      options: ['Vienna', 'Berlin', 'Belgrade', 'Sarajevo'],
      id: 'gw_q28',
    },
    {
      q: 'On what date was the Archduke assassinated?',
      a: 'June 28, 1914',
      options: ['June 28, 1914', 'July 23, 1914', 'August 4, 1914', 'November 11, 1918'],
      id: 'gw_q29',
    },
    {
      q: 'Who assassinated the Archduke?',
      a: 'Gavrilo Princip',
      options: ['Dragutin Dimitrijević', 'Leon Trotsky', 'Nedeljko Čabrinović', 'Gavrilo Princip'],
      id: 'gw_q30',
    },
    {
      q: 'What secret Serbian society did the assassin belong to?',
      a: 'The Black Hand',
      options: ['The White Rose', 'The Black Hand', 'The Young Turks', 'The Bolsheviks'],
      id: 'gw_q31',
    },
    {
      q: 'What unconditional promise did Germany give Austria-Hungary in July 1914?',
      a: "The 'Blank Check'",
      options: [
        'The Reinsurance Treaty',
        'The Entente Cordiale',
        "The 'Blank Check'",
        'The Ultimatum',
      ],
      id: 'gw_q32',
    },
    {
      q: 'What is the month of diplomatic failures after the assassination called?',
      a: 'The July Crisis',
      options: [
        'The July Crisis',
        'The Sarajevo Crisis',
        'The Balkan Wars',
        'The Blank Check Incident',
      ],
      id: 'gw_q33',
    },
    {
      q: 'What did Austria-Hungary issue to Serbia on July 23?',
      a: 'An ultimatum',
      options: [
        'A declaration of war',
        'An ultimatum',
        'A peace treaty',
        'A demand for reparations',
      ],
      id: 'gw_q34',
    },
    {
      q: 'Which country began mobilizing its army to protect Serbia?',
      a: 'Russia',
      options: ['Germany', 'France', 'Britain', 'Russia'],
      id: 'gw_q35',
    },
    {
      q: "What was the name of Germany's military strategy for a two-front war?",
      a: 'The Schlieffen Plan',
      options: ['The Risk Theory', 'Plan XVII', 'The Schlieffen Plan', 'The Bismarck Strategy'],
      id: 'gw_q36',
    },
    {
      q: 'Which neutral country did Germany invade to attack France?',
      a: 'Belgium',
      options: ['Belgium', 'Switzerland', 'The Netherlands', 'Luxembourg'],
      id: 'gw_q37',
    },
    {
      q: 'Which country declared war on Germany due to the invasion of Belgium?',
      a: 'Britain',
      options: ['The United States', 'Britain', 'Russia', 'Italy'],
      id: 'gw_q38',
    },
    {
      q: 'What was the alliance of Germany, Austria-Hungary, and Italy called?',
      a: 'The Triple Alliance',
      options: [
        'The Triple Entente',
        'The Central Powers',
        'The Triple Alliance',
        'The League of Three Emperors',
      ],
      id: 'gw_q39',
    },
    {
      q: 'What was the alliance of Britain, France, and Russia called?',
      a: 'The Triple Entente',
      options: [
        'The Triple Alliance',
        'The Allied Powers',
        'The Grand Alliance',
        'The Triple Entente',
      ],
      id: 'gw_q40',
    },
    {
      q: 'What treaty ended the First World War in 1919?',
      a: 'The Treaty of Versailles',
      options: [
        'The Congress of Vienna',
        'The Treaty of Brest-Litovsk',
        'The Treaty of Versailles',
        'The Treaty of Trianon',
      ],
      id: 'gw_q41',
    },
    {
      q: 'Which clause forced Germany to accept full responsibility for the war?',
      a: 'Article 231 (War Guilt Clause)',
      options: [
        'Article 231 (War Guilt Clause)',
        'Article 48',
        'The Blank Check',
        'The Reparations Clause',
      ],
      id: 'gw_q42',
    },
    {
      q: 'What is the term for a war launched to destroy a rising threat before it gets too strong?',
      a: 'Preventative War',
      options: ['War of Attrition', 'Proxy War', 'Total War', 'Preventative War'],
      id: 'gw_q43',
    },
    {
      q: 'Which historian famously argued Germany planned a war of aggression?',
      a: 'Fritz Fischer',
      options: ['Margaret MacMillan', 'Fritz Fischer', 'A.J.P. Taylor', 'Christopher Clark'],
      id: 'gw_q44',
    },
    {
      q: 'Which historian argued the nations blundered into war due to rigid alliances?',
      a: 'Margaret MacMillan',
      options: ['Fritz Fischer', 'Margaret MacMillan', 'Ian Kershaw', 'Richard Evans'],
      id: 'gw_q45',
    },
    {
      q: "What was the 'quarantine line' of new states created after WWI called?",
      a: 'Cordon Sanitaire',
      options: ['The Iron Curtain', 'The Maginot Line', 'Cordon Sanitaire', 'Mitteleuropa'],
      id: 'gw_q46',
    },
    {
      q: 'Name one new state created by the Treaty of Versailles.',
      a: 'Poland',
      options: ['Poland', 'Serbia', 'Bulgaria', 'Romania'],
      id: 'gw_q47',
    },
    {
      q: 'What European power was completely dismantled by the peace treaties?',
      a: 'The Austro-Hungarian Empire',
      options: [
        'The German Empire',
        'The British Empire',
        'The Russian Empire',
        'The Austro-Hungarian Empire',
      ],
      id: 'gw_q48',
    },
    {
      q: 'What ideological threat did the Allies want to separate from Germany after the war?',
      a: 'Soviet Communism',
      options: ['Imperialism', 'Fascism', 'Anarchism', 'Soviet Communism'],
      id: 'gw_q49',
    },
    {
      q: 'Which country did Germany invade on 3 August 1914?',
      a: 'Belgium',
      options: ['Belgium', 'France', 'Russia', 'Serbia'],
      id: 'gw_q50',
    },
  ],
  glossary: [
    {
      term: 'Alsace-Lorraine',
      definition: 'A resource-rich border region taken by Germany from France in 1871.',
    },
    {
      term: 'Ems Telegram',
      definition: 'A diplomatic message altered by Bismarck to provoke France into declaring war.',
    },
    {
      term: 'Reparations',
      definition: 'Massive financial fines forced upon a defeated nation to pay for war damages.',
    },
    {
      term: 'Siege',
      definition:
        'A military operation where enemy forces surround a town or building, cutting off essential supplies.',
    },
    {
      term: 'Imperialism',
      definition:
        "A policy of extending a country's power and influence through diplomacy or military force.",
    },
    {
      term: 'Scramble for Africa',
      definition:
        'The rapid invasion, annexation, and division of African territory by European powers.',
    },
    {
      term: 'Empire',
      definition:
        'An extensive group of states or countries ruled over by a single supreme authority.',
    },
    {
      term: 'Colony',
      definition:
        'A country or area under the full or partial political control of another country.',
    },
    {
      term: 'Dreadnought',
      definition:
        'A revolutionary type of heavily-armoured battleship introduced by Britain in 1906.',
    },
    {
      term: 'Arms Race',
      definition:
        'A competition between nations to achieve superiority in the quantity and quality of military weapons.',
    },
    {
      term: 'Two-Power Standard',
      definition:
        'A British policy stating their navy must be as large as the next two largest navies combined.',
    },
    {
      term: 'Naval Supremacy',
      definition: 'Having the most powerful and dominant navy in the world.',
    },
    {
      term: 'Triple Entente',
      definition:
        'The military alliance linking the Russian Empire, the French Third Republic, and the United Kingdom.',
    },
    {
      term: 'Triple Alliance',
      definition:
        'A secret agreement between Germany, Austria-Hungary, and Italy formed in May 1882.',
    },
    {
      term: 'Reinsurance Treaty',
      definition:
        'A secret agreement between Germany and Russia arranged by Bismarck to prevent a two-front war.',
    },
    {
      term: 'Encirclement',
      definition:
        'A military term for the situation when a force or target is isolated and surrounded by enemy forces.',
    },
    {
      term: 'Assassination',
      definition: 'The murder of a prominent person, often a political leader or ruler.',
    },
    {
      term: 'Black Hand',
      definition:
        'A secret Serbian society that used terrorist methods to promote the liberation of Serbs outside Serbia.',
    },
    {
      term: 'Ultimatum',
      definition:
        'A final demand or statement of terms, the rejection of which will result in retaliation or a breakdown in relations.',
    },
    {
      term: 'Mobilisation',
      definition:
        'The action of a country or its government preparing and organizing troops for active service.',
    },
  ],
  key_individuals: [
    {
      id: 'wilhelm',
      name: 'Kaiser Wilhelm II',
      role: 'Emperor of Germany',
      image: '/units/great_war/assets/card_wilhelm.png',
      bio: "The impulsive and militaristic ruler of Germany whose aggressive 'Weltpolitik' foreign policy alienated Britain, France, and Russia, setting the stage for the Great War.",
    },
    {
      id: 'princip',
      name: 'Gavrilo Princip',
      role: 'Serbian Nationalist',
      image: '/units/great_war/assets/card_princip.png',
      bio: 'A member of the Black Hand secret society who assassinated Archduke Franz Ferdinand in Sarajevo, providing the spark that ignited the July Crisis and World War I.',
    },
    {
      id: 'nicholas',
      name: 'Tsar Nicholas II',
      role: 'Emperor of Russia',
      image: '/units/great_war/assets/card_nicholas.png',
      bio: "The autocratic ruler of Russia who mobilized his vast army to defend Serbia against Austria-Hungary, triggering Germany's mobilization and the activation of the Schlieffen Plan.",
    },
  ],
  guided_reading: [
    {
      lesson_index: 0,
      book_title: 'The Sleepwalkers: How Europe Went to War in 1914',
      author: 'Christopher Clark',
      cover_image: '/units/great_war/assets/clark_cover.png',
      author_context:
        "Christopher Clark is an acclaimed Australian historian. In 'The Sleepwalkers' (2012), he argues that the outbreak of World War I was not a premeditated crime by one single nation, but a tragic, complex failure of diplomacy where European leaders 'sleepwalked' into disaster without fully understanding the consequences.",
      extract:
        "The protagonists of 1914 were sleepwalkers, watchful but unseeing, haunted by dreams, yet blind to the reality of the horror they were about to bring into the world. For decades, the narrative of the Great War's outbreak has often focused on a single villain, usually pointing the finger of blame squarely at the German Empire. However, to truly understand the catastrophe, one must look at the entire continent of Europe—a continent caught in a rigid and paranoid web of its own making.\n\nIn the years leading up to 1914, Europe was dominated by a complex system of alliances. Originally designed as defensive measures to ensure peace through mutual protection, these agreements slowly morphed into dangerous tripwires. The Triple Entente, linking Britain, France, and Russia, stood in tense opposition to the Triple Alliance of Germany, Austria-Hungary, and Italy. Instead of feeling secure, the great powers felt entirely encircled and deeply suspicious of one another. The Franco-Prussian War of 1870 had left a bitter legacy; France was obsessed with regaining the lost territories of Alsace and Lorraine, while a newly unified Germany was determined to assert its dominance on the world stage.\n\nAmidst this atmosphere of mutual distrust, the military establishments across Europe grew vastly in size and influence. An unprecedented arms race took hold, most notably the fierce naval rivalry between Britain and Germany. Every nation began drafting intricate, inflexible mobilization plans. The most famous of these, the German Schlieffen Plan, dictated that in the event of war with Russia, Germany must rapidly strike and defeat France first to avoid a two-front war. Such plans meant that once the order to mobilize was given, the military timetables would take control, leaving politicians and diplomats entirely powerless to stop the descent into violence.\n\nThe spark that ignited this powder keg occurred in the volatile Balkan peninsula. The Austro-Hungarian Empire, a sprawling and multi-ethnic state, was terrified by the rise of Serbian nationalism on its southern border. When Archduke Franz Ferdinand was assassinated in Sarajevo on June 28, 1914, by a Bosnian Serb nationalist, the authorities in Vienna saw a perfect pretext to crush Serbia once and for all. They were emboldened by the infamous 'Blank Cheque' from their ally Germany, which promised unconditional support.\n\nYet, even after the assassination, a general European war was not inevitable. The ensuing July Crisis was a masterclass in diplomatic blundering, miscalculation, and brinkmanship. Leaders sent ambiguous messages, ambassadors failed to communicate their governments' true intentions, and monarchs desperately exchanged telegrams trying to preserve the peace while simultaneously signing mobilization orders. They were all playing a high-stakes game of bluff, assuming the other side would eventually back down.\n\nWhen Russia chose to mobilize its massive army in defense of its Slavic ally, Serbia, the fatal clockwork mechanism of the alliance system was triggered. Germany, bound by the rigid logic of the Schlieffen Plan, declared war on Russia and immediately invaded neutral Belgium to strike at France. This violation of Belgian neutrality finally brought the British Empire into the fray. \n\nIn the end, the outbreak of the First World War was not a premeditated crime planned in a single capital, but a tragic, collective failure. The statesmen of Europe were men who prided themselves on their rationality and diplomatic skill. Yet, gripped by fear, bound by rigid alliances, and overwhelmed by the speed of events, they sleepwalked past every opportunity to halt the crisis. They plunged their nations into a conflict of unprecedented scale and industrial slaughter, a war that would sweep away empires, redraw the map of the world, and cast a long, dark shadow over the rest of the twentieth century.",
      audio_file: '/assets/great_war_reading_gw_l0.mp3',
      questions: [
        'What metaphor does the author use in the opening paragraph to describe the European leaders of 1914?',
        'According to the text, why did defensive alliances like the Triple Entente and Triple Alliance actually make the great powers feel less secure?',
        'How did the existence of inflexible military strategies, such as the Schlieffen Plan, affect the power of politicians and diplomats during the July Crisis?',
      ],
      hinge_question:
        "If the European leaders were truly just 'sleepwalkers' who didn't want war, does that mean they are innocent of causing it? Why or why not?",
      is_adapted: true,
    },
    {
      lesson_index: 1,
      book_title: 'Heart of Darkness',
      author: 'Joseph Conrad',
      cover_image: '/units/great_war/assets/conrad_cover.png',
      author_context:
        "Joseph Conrad was a Polish-British author who worked as a sailor for many years. His 1899 novella 'Heart of Darkness' was based on his own horrifying experiences captaining a steamboat on the Congo River. It is a searing critique of the brutality, greed, and moral corruption of European imperialism in Africa.",
      extract:
        "The conquest of the earth, which mostly means the taking it away from those who have a different complexion or slightly flatter noses than ourselves, is not a pretty thing when you look into it too much. What redeems it is the idea only. An idea at the back of it; not a sentimental pretence but an idea; and an unselfish belief in the idea—something you can set up, and bow down before, and offer a sacrifice to...\n\nI left in a French steamer, and she called in every blamed port they have out there, for, as far as I could see, the sole purpose of landing soldiers and custom-house officers. I watched the coast. Watching a coast as it slips by the ship is like thinking about an enigma. There it is before you—smiling, frowning, inviting, grand, mean, insipid, or savage, and always mute with an air of whispering, 'Come and find out.' This one was almost featureless, as if still in the making, with an aspect of monotonous grimness. The edge of a colossal jungle, so dark-green as to be almost black, fringed with white surf, ran straight, like a ruled line, far, far away along a blue sea whose glitter was blurred by a creeping mist. The sun was fierce, the land seemed to glisten and drip with steam.\n\nNow and then a boat from the shore gave one a momentary contact with reality. It was paddled by black fellows. You could see from afar the white of their eyeballs glistening. They shouted, sang; their bodies streamed with perspiration; they had faces like grotesque masks—these chaps; but they had bone, muscle, a wild vitality, an intense energy of movement, that was as natural and true as the surf along their coast. They wanted no excuse for being there. They were a great comfort to look at. \n\nFor a time I would feel I belonged still to a world of straightforward facts; but the feeling would not last long. Something would turn up to scare it away. Once, I remember, we came upon a man-of-war anchored off the coast. There wasn't even a shed there, and she was shelling the bush. It appears the French had one of their wars going on thereabouts. Her ensign dropped limp like a rag; the muzzles of the long six-inch guns stuck out all over the low hull; the greasy, slimy swell swung her up lazily and let her down, swaying her thin masts. In the empty immensity of earth, sky, and water, there she was, incomprehensible, firing into a continent. Pop, would go one of the six-inch guns; a small flame would dart and vanish, a little white smoke would disappear, a tiny projectile would give a feeble screech—and nothing happened. Nothing could happen. There was a touch of insanity in the proceeding, a sense of lugubrious drollery in the sight; and it was not dissipated by somebody on board assuring me earnestly there was a camp of natives—he called them enemies!—hidden out of sight somewhere.\n\nWe gave her her letters (I heard the men in that lonely ship were dying of fever at the rate of three a day) and went on. We called at some more places with farcical names, where the merry dance of death and trade goes on in a still and earthy atmosphere as of an overheated catacomb; all along the formless coast bordered by dangerous surf, as if Nature herself had tried to ward off intruders; in and out of rivers, streams of death in life, whose banks were rotting into mud, whose waters, thickened into slime, invaded the contorted mangroves, that seemed to writhe at us in the extremity of an impotent despair.",
      audio_file: '/assets/great_war_reading_gw_l1.mp3',
      questions: [
        "According to Conrad, what does the 'conquest of the earth' really involve?",
        'How does the author describe the true motivations of the imperialists?',
        'Why do you think this text was considered highly controversial when it was published in 1899?',
      ],
      is_adapted: false,
      hinge_question:
        "How does Conrad use the image of the French warship 'firing into a continent' to expose the absurdity and violence of the 'civilizing mission' in Africa?",
    },
    {
      lesson_index: 2,
      book_title: 'The Riddle of the Sands',
      author: 'Erskine Childers',
      cover_image: '/units/great_war/assets/childers_cover.png',
      author_context:
        "Erskine Childers was a British author and sailor. Published in 1903, 'The Riddle of the Sands' is considered the first modern spy novel. It fueled British paranoia about a surprise German naval invasion, perfectly capturing the intense public anxiety surrounding the Anglo-German naval arms race.",
      extract:
        "It was a glorious, breezy morning, and the waters of the Frisian coast danced and sparkled in the brilliant sunshine. We had brought the 'Dulcibella' through the tricky channels behind the islands, navigating the intricate maze of sandbanks that guarded the German shore. To the casual observer, we were merely a pair of eccentric English yachtsmen indulging in a late summer cruise among the desolate, mud-strewn estuaries of the North Sea. But beneath the facade of our holiday, a dark and terrifying suspicion had taken root in our minds—a suspicion that had driven us into these treacherous, shifting waters.\n\nAs we dropped anchor in a narrow, desolate gut behind the island of Memmert, Davies stood by the mast, sweeping the horizon with his binoculars. The coastline here was a bleak, monotonous stretch of flat sand and grey water, seemingly devoid of human life. Yet, it was precisely this desolate emptiness that made it so perfect for a secret of such colossal magnitude. For weeks, we had been piecing together a puzzle made of innocuous clues: a tugboat operating where it had no business being, a mysterious salvage operation that recovered nothing, and the relentless, almost obsessive secrecy of a certain Herr Dollmann, an Englishman turned traitor in the service of the Kaiser.\n\n'Look there,' Davies said quietly, handing me the glasses and pointing towards the mainland. 'Just past the spit of sand. Do you see it?'\n\nI squinted through the lenses. At first, there was nothing but the grey blur of the tidal flats. Then, as my eyes adjusted, I saw them. Not fishing boats, not merchantmen, but long, low shapes moving with mechanical precision through a dredged channel that did not exist on any of our Admiralty charts. They were lighters—massive, flat-bottomed barges designed for carrying troops and heavy equipment. There were dozens of them, moored in a hidden basin, sheltered from the open sea and completely invisible from the standard shipping lanes.\n\nThe blood ran cold in my veins as the pieces of the terrible puzzle finally snapped into place. This was no innocent coastal defense project. The German Empire, cramped within its landlocked borders and burning with imperial ambition, was not merely building a High Seas Fleet to challenge our dreadnoughts in open battle. They were preparing something far more insidious, something that struck directly at the heart of our island security.\n\nBehind the barrier of these Frisian islands, protected by the shifting sands and the treacherous tides, a vast, secret invasion force was being assembled. These hidden channels, newly deepened by relentless dredging, were designed to allow a flotilla of troop-carrying barges to slip out into the North Sea under the cover of darkness or a thick sea fog. They would bypass the mighty guns of the Royal Navy and strike a sudden, paralyzing blow on the unprotected eastern shores of England. \n\nWe were sitting in the very nerve center of a meticulously organized naval conspiracy. The Kaiser's Germany was preparing to leap the moat. We alone held the secret, and our tiny, fragile yacht was the only thing standing between the oblivious British public and a sudden, catastrophic war. The riddle of the sands had been solved, but the true terror of what it meant for the future of our nation was only just beginning.",
      audio_file: '/assets/great_war_reading_gw_l2.mp3',
      questions: [
        'What secret threat did the narrator believe they had discovered?',
        'According to the extract, why was the German Empire building its fleet?',
        "How would reading a popular thriller like this have affected the British public's attitude toward Germany?",
      ],
      is_adapted: false,
      hinge_question:
        "If 'The Riddle of the Sands' was a fictional novel, why do you think it caused such real-world panic and paranoia among the British public regarding the German Navy?",
    },
    {
      lesson_index: 3,
      book_title: 'The Guns of August',
      author: 'Barbara W. Tuchman',
      cover_image: '/units/great_war/assets/tuchman_cover.png',
      author_context:
        "Barbara W. Tuchman was an American historian who won the Pulitzer Prize for 'The Guns of August' (1962). The book masterfully details the political calculations, military plans, and sheer arrogance of the Great Powers in the fateful month of August 1914 as the alliance system dragged them all into war.",
      extract:
        "The nations of Europe in the summer of 1914 were bound together by a series of treaties that were ostensibly designed for mutual defense. The theory behind these grand alliances was deterrence: if every major power was allied with another, the cost of aggression would be too high, and peace would be preserved. However, in reality, these treaties functioned not as safety nets, but as highly sensitive tripwires. The continent had become a rigid, inflexible machine, where a single spark could ignite the entire mechanism and drag millions into an unavoidable conflict. \n\nWhen the Archduke Franz Ferdinand was assassinated in the dusty streets of Sarajevo, the first of these tripwires was snapped. Austria-Hungary, determined to crush the irritating threat of Serbian nationalism, looked to its powerful ally, Germany, for support. The German Kaiser issued the infamous 'blank cheque,' a promise of unconditional backing that emboldened the Austrians to issue an ultimatum they knew Serbia could never fully accept. The localized crisis in the Balkans immediately began to pull the great powers into its gravitational vortex. \n\nRussia, presenting itself as the traditional protector of the Slavic people, felt compelled to stand by Serbia. But Russia’s vast size was its greatest weakness; its army was massive but agonizingly slow to gather. To have any hope of fighting effectively, the Russian Tsar had to order mobilization immediately, long before diplomacy had run its course. Once the Tsar gave the order, the fatal clockwork of the alliance system took over. \n\nMobilization in 1914 was not merely the calling up of reserves; it was an irrevocable step toward war. It meant the requisitioning of thousands of trains, the locking down of national borders, and the execution of highly detailed, down-to-the-minute railway timetables. For Germany, Russian mobilization triggered a terrifying strategic nightmare. Wedged between a hostile Russia to the east and a vengeful France to the west, the German military had devised the Schlieffen Plan. This plan dictated that Germany must immediately attack and defeat France in a lightning campaign of six weeks before the lumbering Russian army could reach the German borders. \n\nTherefore, when Russia mobilized, Germany could not wait. The German high command, terrified of fighting a two-front war, informed the civilian government that military necessity must now dictate political action. They declared war on Russia, but, bound by the rigid logic of the Schlieffen Plan, their armies immediately marched in the opposite direction—invading neutral Belgium to strike at France. \n\nThis violation of Belgian neutrality was the final tripwire. It outraged British public opinion and compelled the British Empire, tied to France and Russia by the Triple Entente, to declare war on Germany. In a matter of days, the entire continent had been plunged into disaster. The diplomats and politicians, who had spent the month of July sending frantic telegrams and attempting to bluff their way to victory, suddenly found themselves entirely powerless. The moment the mobilization orders were signed, control was handed over to the generals and their railway timetables. The statesmen of Europe had built a machine of alliances they believed would keep the peace, but once the gears started turning, it proved to be a machine of industrial slaughter that none of them could stop.",
      audio_file: '/assets/great_war_reading_gw_l3.mp3',
      questions: [
        "Why does the author describe the defensive alliances as 'tripwires'?",
        'What metaphor is used to describe the outbreak of the war?',
        'According to the text, why were the diplomats unable to stop the war once it started?',
      ],
      is_adapted: true,
      hinge_question:
        'How did the sheer speed and rigid timing of military mobilization plans like the Schlieffen Plan make a diplomatic solution almost impossible during the July Crisis?',
    },
    {
      lesson_index: 4,
      book_title: 'All Quiet on the Western Front',
      author: 'Erich Maria Remarque',
      cover_image: '/units/great_war/assets/all_quiet_cover.png',
      author_context:
        "Erich Maria Remarque was a German veteran of World War I. His 1929 novel 'All Quiet on the Western Front' became a defining anti-war masterpiece, detailing the extreme physical and mental trauma of the trenches, and the profound disillusionment of a generation. It was so powerful that it was later banned and burned by the Nazi regime.",
      extract:
        "We were eighteen years old, and we had only just begun to love life and the world; and we had to shoot it to pieces. Before the war, our lives were filled with the ordinary concerns of youth—school, parents, hobbies, and the vague, distant promises of the future. But all of that was swept away in a sudden, overwhelming tide of national fervor. The older generation, the men who sat comfortably in their armchairs and read the newspapers, told us it was our glorious duty to defend the Fatherland. They spoke of the Fatherland as if it were a beautiful, fragile thing that required our immediate sacrifice, and we, in our naive enthusiasm, believed them.\n\nThe most persuasive of these voices belonged to our schoolmaster, Kantorek. He was a small, stern man who used to glare at us through his spectacles, pacing in front of the chalkboard. During drill-time, Kantorek gave us long, impassioned lectures about the honor of wearing the uniform and the sacred duty of the German soldier. He spoke of heroism and glory with such conviction that the whole of our class went, under his shepherding, straight to the District Commandant and volunteered. I can see him now, his voice trembling with emotion as he asked, 'Won't you join up, Comrades?' \n\nWe were all at once terribly earnest. We marched out of the school gates feeling like men, ready to shoulder the destiny of the empire. No one had the vaguest idea what we were actually in for. The word 'war' was an abstract concept to us, a glorious adventure gleaned from history books and patriotic poetry. We pictured cavalry charges, gleaming medals, and a swift, victorious return home before the leaves fell from the trees. Kantorek called us the 'Iron Youth,' a phrase that made us stand a little taller and puff out our chests, completely unaware of the grim irony it would soon hold. \n\nIt was only when we reached the training camps, and later the muddy, rat-infested trenches of the Western Front, that the glittering facade of duty and glory was violently stripped away. The first bombardment showed us our mistake, and under it the world as they had taught it to us broke in pieces. We realized that the authority of our teachers and parents, the people who were supposed to guide us into the world, was a lie. They had sent us out into a storm of steel with high-sounding words, but they had no conception of the reality of modern, industrial slaughter. \n\nOut here in the mud, nobody cared about the 'Fatherland' or the grand political arguments of the Kaiser. We fought simply to survive, driven by instinct and a desperate loyalty to the men standing next to us in the trench. We had become a wasteland. The older men might have wives, children, and occupations to return to, a solid foundation built before the war. But for us, the young men of eighteen, the war was our only education. We were a generation of men who, even though they may have escaped shells, were destroyed by the war.",
      audio_file: '/assets/great_war_reading_gw_l4.mp3',
      questions: [
        'Who was Kantorek, and what did he persuade the entire class to do?',
        "How did the adults, like teachers, use the idea of 'duty' or 'comradeship' to pressure young men?",
        'How does this extract help explain the incredible surge of Nationalism and volunteering at the outbreak of the war?',
      ],
      is_adapted: true,
      hinge_question:
        "Why does the narrator argue that the older generation and teachers like Kantorek betrayed the 'Iron Youth' of Germany?",
    },
  ],
  assessments: [
    {
      id: 'timeline',
      title: 'Assessment Option 1: The July Crisis Domino Flowchart',
      type: 'timeline',
      description:
        "The rapid escalation of the 'July Crisis' in 1914 is mixed up below. Read each event carefully, then use your pen to draw arrows connecting the boxes in the correct chronological and causal order (Event A ➔ Event B ➔ Event C...).",
      events: [
        {
          year: '28 June 1914',
          title: 'The Spark',
          detail: 'Gavrilo Princip assassinates Archduke Franz Ferdinand in Sarajevo.',
        },
        {
          year: '5 July 1914',
          title: 'The Blank Cheque',
          detail:
            'Germany promises unconditional support to Austria-Hungary for any action against Serbia.',
        },
        {
          year: '23 July 1914',
          title: 'The Ultimatum',
          detail:
            'Austria-Hungary issues a harsh ultimatum to Serbia, knowing they will likely reject it.',
        },
        {
          year: '30 July 1914',
          title: 'Russian Mobilisation',
          detail: 'Russia mobilises its massive army to defend its Slavic ally, Serbia.',
        },
        {
          year: '3 August 1914',
          title: 'The Schlieffen Plan',
          detail:
            'Germany declares war on France and invades neutral Belgium to avoid a two-front war.',
        },
      ],
    },
    {
      id: 'diamond9',
      title: 'Assessment Option 2: The M.A.I.N. Significance Diamond',
      type: 'diamond9',
      description:
        "Arrange the 9 key causes of the Great War into a 'Diamond 9' shape, placing the most significant long-term or short-term cause at the top and the least significant at the bottom. Write two short paragraphs justifying your top choice and your bottom choice.",
      factors: [
        'The Assassination of Franz Ferdinand (The Spark)',
        'The Alliance System dividing Europe',
        "Germany's 'Blank Cheque' to Austria",
        'Anglo-German Naval Race (Militarism)',
        'The scramble for Imperial colonies in Africa',
        'Serbian Nationalism (The Black Hand)',
        'Russian Mobilisation schedules',
        "The Schlieffen Plan's invasion of Belgium",
        'The decline of the Ottoman Empire (Balkan instability)',
      ],
    },
    {
      id: 'source_utility',
      title: 'Assessment Option 3: Source Utility Analysis',
      type: 'source_utility',
      description:
        'Study Sources B and C below. How useful are Sources B and C for an enquiry into the causes of the Great War? (8 marks)',
      sources: [
        {
          id: 'Source B',
          text: 'The terrible war was triggered by the brutal assassination of the Archduke in Sarajevo. However, the true cause was that Germany was surrounded by hostile enemies. The secret alliance system meant that when Russia began moving its vast army to defend Serbia, Germany was forced to defend itself. We did not want this war; we were forced into it by the aggressive alliances of our enemies.',
          provenance:
            'Extract from the memoirs of the German Chancellor, Theobald von Bethmann Hollweg, published in 1919.',
          provenance_clue:
            "Bethmann Hollweg was the German Chancellor during the outbreak of the war. Because he is writing his memoirs *after* Germany lost, is he likely to accept blame or try to defend his country's actions?",
        },
        {
          id: 'Source C',
          text: 'The Allied Governments demand, and Germany accepts, full responsibility for causing all the terrible loss and damage of the war. This devastating war was forced upon the world solely by the aggression of Germany and her allies.',
          provenance:
            "Extract from the Treaty of Versailles, Article 231 (The 'War Guilt Clause'), signed by the victorious Allies in June 1919.",
          provenance_clue:
            "The Treaty of Versailles was written entirely by the victorious Allies. Since they had just defeated Germany, do they have a motive to exaggerate Germany's guilt to justify harsh punishments?",
        },
      ],
    },
    {
      id: 'interpretations',
      title: "Assessment Option 4: The Historians' Debate",
      type: 'interpretations',
      description:
        'Study Interpretations 1 and 2 below, which match Sources B and C from the previous assessment. Then answer the three Edexcel GCSE Paper 3 questions.',
      interpretations: [
        {
          id: 'Interpretation 1',
          text: 'No single nation can be entirely blamed for starting the First World War. The spark was the tragic assassination in Sarajevo, but the real problem was the rigid system of alliances. When the crisis erupted, leaders across all major powers blundered into a war they did not want, dragged along by secret treaties and the fear of being attacked first.',
        },
        {
          id: 'Interpretation 2',
          text: "The outbreak of the First World War was entirely the fault of Germany's aggressive militarism. The German leadership deliberately encouraged Austria to attack Serbia, giving them a 'blank cheque' of support. Germany used the assassination in Sarajevo as a convenient excuse to launch a massive war and conquer Europe.",
        },
      ],
      questions: [
        '1. What is the main difference between Interpretation 1 and Interpretation 2 regarding who was to blame for the war? (4 marks)',
        '2. Suggest one reason why Interpretation 1 and Interpretation 2 give different views. You may use Sources B and C to help explain your answer. (4 marks)',
        '3. How far do you agree with Interpretation 2 about the causes of the Great War? (16 marks)',
      ],
    },
  ],
};
export default unitData;
export { unitData };
