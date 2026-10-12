const great_war = {
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
      skill: 'Change & Continuity: Balance of Power & Revanche',
      title: 'Enquiry 1: German Unification, Franco-Prussian War & Bismarck (1871–1890)',
      subtitle: 'From Blood & Iron to the Hall of Mirrors and the Seizure of Alsace-Lorraine',
      enquiryQuestion:
        'How did the creation of the German Empire and the seizure of Alsace-Lorraine permanently rupture European peace?',
      a4_map: ['/images/german_empire_1871.png', '/images/modern_germany_map.png'],
      margin_spine: [
        {
          year: '1862–1866',
          label: '1.1 Balance of Power',
        },
        {
          year: '1870–1871',
          label: '1.2 Versailles Proclamation',
        },
        {
          year: 'May 1871',
          label: '1.3 Alsace-Lorraine Annexed',
        },
        {
          year: '1871–1889',
          label: '1.4 French Revanche',
        },
        {
          year: '1871–1890',
          label: '1.5 Bismarckian Isolation',
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
          title: '1.1 The Fragmented Chessboard, Zollverein & Prussian Power (1862–1866)',
          text: '<span class="para-ref">[1.1]</span> For more than two centuries after the Peace of Westphalia, Central Europe resembled a fractured chessboard rather than a nation. Between the Rhine and the Vistula lay over three hundred sovereign duchies, free cities, and petty principalities. Even after the 1815 Congress of Vienna consolidated these into <strong>thirty-nine independent states (39 independent states)</strong>, they remained paralyzed by mutual distrust. Two rival titans competed for dominance: the polyglot Austrian Empire, ruled by Catholic Habsburgs who feared German national unity would tear their multinational realm apart, and the <strong>Kingdom of Prussia</strong>—a disciplined Protestant military powerhouse ruled from Berlin by the Hohenzollern dynasty, possessing an advanced railway network and the mighty Krupp steel industry.<br><br><span class="para-ref">[1.2]</span> In 1834, Berlin orchestrated a masterstroke of economic statecraft: the <strong>Zollverein</strong> (Customs Union). By abolishing internal tariffs while deliberately excluding Austria, Prussia created a booming single market. Steam locomotives thundered across the Ruhr and Silesia along tracks cast in Prussian iron, knitting the German states into economic dependency on Berlin. When <strong>Otto von Bismarck</strong> became Prussian Minister-President in 1862, he bypassed the Prussian parliament unconstitutionally and laid down his ruthless political creed: <em>"The great questions of the day will not be decided by speeches and majority votes... but by iron and blood."</em> Practicing pure <em>Realpolitik</em>, Bismarck manufactured short, decisive wars: crushing Denmark in 1864, and annihilating the Austrian army at Königgrätz in the Seven Weeks\' War of 1866 with breech-loading needle guns.',
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
          title: '1.2 The Sedan Debacle & Proclamation at Versailles (1870–1871)',
          text: '<span class="para-ref">[1.2]</span> To sweep the reluctant Catholic southern German states into Berlin’s embrace, Bismarck engineered a common enemy. In July 1870, he doctored and carefully edited the <strong>Ems Telegram</strong>—deleting polite words to make it appear that King Wilhelm I had insulted the French ambassador. Enraged by national vanity, Emperor Napoleon III declared war. It was a catastrophic French miscalculation. Masterminded by General Helmuth von Moltke, Prussian railways and Krupp steel breech-loading artillery pulverized French positions. On 1 September 1870, at the decisive <strong>Battle of Sedan</strong>, the German armies encircled Napoleon III, capturing the emperor and 104,000 soldiers. Overnight, the French Empire collapsed.<br><br><span class="para-ref">[1.3]</span> The republican government in Paris refused to surrender, prompting a brutal four-month <strong>Siege of Paris</strong> where starving citizens ate carriage horses and zoo animals. On a freezing winter morning—18 January 1871—Bismarck delivered the supreme humiliation. Inside the gilded <strong>Hall of Mirrors at the Palace of Versailles</strong> outside besieged Paris, German princes and generals amidst drawn sabres and spiked pickelhaube helmets proclaimed King Wilhelm I the first German Emperor (Kaiser). The German Empire was not born in a democratic assembly, but hammered together on the battlefield and christened on the ashes of French defeat.',
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
          title: '1.3 The Treaty of Frankfurt & Annexation of Alsace-Lorraine (May 1871)',
          text: '<span class="para-ref">[1.3]</span> Finalized in May 1871, the <strong>Treaty of Frankfurt</strong> was designed by German generals not merely to conclude peace, but to cripple France militarily for a generation. France was forced to pay an astronomical financial indemnity of <strong>five billion gold francs (5 billion gold francs)</strong>, with German occupation troops quartered on French soil until the final centime was delivered. Far more devastating was the territorial amputation: Germany tore away the mineral-rich border province of <strong>Alsace</strong> and the northern half of <strong>Lorraine</strong>.<br><br><span class="para-ref">[1.4]</span> This seizure stripped France of 1.6 million citizens, advanced textile manufacturing centres, and the irreplaceable iron-ore basins of Briey and Thionville. The ancient fortress city of Metz and the cathedral city of Strasbourg were converted into fortified bulwarks of the new German Empire. Over forty-one million people, welded to the booming industrial foundries of the Krupp arms works, were suddenly concentrated into a colossal military superpower situated squarely in the vulnerable centre of continental Europe.',
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
          title: '1.4 French Revanche & The Cult of the Lost Provinces (1871–1889)',
          text: '<span class="para-ref">[1.4]</span> For the French nation, the loss of Alsace-Lorraine was an unendurable psychic trauma that poisoned European international politics for over four decades. In the Place de la Concorde in Paris, the monumental stone statue representing the city of Strasbourg was draped in mourning black crepe. In classrooms across the French Republic, schoolmasters taught generations of young boys that their highest civic obligation was <strong>Revanche</strong> (revenge)—the sacred mission to liberate the lost provinces.<br><br><span class="para-ref">[1.5]</span> In schoolrooms, wall maps displayed Alsace-Lorraine shaded in pitch black—the infamous <em>"tache noire"</em> (black spot). Compulsory military conscription was introduced, and physical education drill in schools was modeled on military marching. As the patriotic French statesman Léon Gambetta famously instructed the nation: <em>"Think of it always; speak of it never."</em> No French political leader could ever sign a permanent friendship treaty with Berlin while German garrisons occupied Strasbourg and Metz.',
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
          title: '1.5 Bismarckian Isolation, The Reinsurance Treaty & Two-Front Dread (1871–1890)',
          text: '<span class="para-ref">[1.5]</span> On 9 February 1871, British opposition leader <strong>Benjamin Disraeli</strong> warned Parliament that the German victory was <em>"the German Revolution, a greater political event than the French Revolution... You have a new world, new influences at work, new and unknown objects and dangers with which to cope."</em> The delicate balance of power negotiated at Vienna in 1815 was dead. Recognizing that France would never forgive its defeat, Bismarck spent the next twenty years pursuing a single paramount foreign policy goal: <strong>to keep France diplomatically isolated and maintain continental peace</strong>.<br><br><span class="para-ref">[1.6]</span> Germany’s greatest strategic military nightmare was a <strong>war on two fronts (encirclement)</strong>, attacked simultaneously by France from the west and the Russian Empire from the east. To avert this, Bismarck spun a complex defensive web of treaties, culminating in the secret 1887 <strong>Reinsurance Treaty</strong> with Tsarist Russia, pledging neutrality if either empire faced attack. So long as Bismarck remained Chancellor, his brilliant diplomatic balancing act kept France isolated. But in 1888, the impulsive young <strong>Kaiser Wilhelm II</strong> ascended the throne. In 1890, Wilhelm dismissed Bismarck and allowed the Reinsurance Treaty with Russia to lapse—unleashing the exact two-front encirclement Bismarck had spent his career trying to prevent.',
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
          options: ['300', '39', '15', '50'],
        },
        {
          q: 'Which state was the most powerful among the German states before 1871?',
          a: 'Prussia',
          options: ['Bavaria', 'Saxony', 'Austria', 'Prussia'],
        },
        {
          q: 'Who became the Prime Minister of Prussia in 1862?',
          a: 'Otto von Bismarck',
          options: [
            'Frederick the Great',
            'Wilhelm I',
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
            'Industrial factories only',
            'Warfare and military strength',
            'Democratic votes',
            'Peaceful treaties',
          ],
        },
        {
          q: 'Which three countries did Prussia defeat to unify Germany?',
          a: 'Denmark, Austria, France',
          options: [
            'Italy, Austria, Spain',
            'Britain, Russia, France',
            'Denmark, Austria, France',
            'Sweden, Denmark, Russia',
          ],
        },
        {
          q: 'In what year did the Franco-Prussian War begin?',
          a: '1870',
          options: ['1914', '1866', '1864', '1870'],
        },
        {
          q: 'Where was the King of Prussia proclaimed the first German Emperor?',
          a: 'Palace of Versailles',
          options: [
            'Palace of Versailles',
            'Reichstag in Berlin',
            'Schönbrunn Palace',
            'Tower of London',
          ],
        },
        {
          q: 'When was the German Empire officially created?',
          a: '18 January 1871',
          options: ['28 June 1914', '1 September 1870', '18 January 1871', '11 November 1918'],
        },
        {
          q: 'Which valuable French territory did Germany seize in 1871?',
          a: 'Alsace-Lorraine',
          options: ['Normandy', 'Brittany', 'Burgundy', 'Alsace-Lorraine'],
        },
        {
          q: 'What was the economic union created by Prussia in 1834 called?',
          a: 'Zollverein',
          options: ['Kaiserreich', 'Zollverein', 'Reichstag', 'Wehrmacht'],
        },
        {
          q: 'Which major German-speaking power was deliberately excluded from the Zollverein?',
          a: 'Austria',
          options: ['Austria', 'Bavaria', 'Saxony', 'Hanover'],
        },
        {
          q: 'What was the German term for the new German Empire?',
          a: 'Kaiserreich',
          options: ['Lebensraum', 'Reichstag', 'Kaiserreich', 'Blitzkrieg'],
        },
        {
          q: 'How long did it take the Prussian army to crush Austria in 1866?',
          a: 'Seven weeks',
          options: ['Seven weeks', 'One year', 'Two months', 'Four years'],
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
          options: ['Napoleon III', 'Louis XIV', 'Charles de Gaulle', 'Napoleon Bonaparte'],
        },
        {
          q: 'What natural resources was Alsace-Lorraine rich in?',
          a: 'Coal and iron',
          options: ['Gold and silver', 'Timber and wheat', 'Coal and iron', 'Oil and gas'],
        },
        {
          q: 'What long-term effect did the taking of Alsace-Lorraine have?',
          a: 'It created long-term rivalry and hatred between France and Germany',
          options: [
            'It made France and Germany permanent allies',
            'It caused the collapse of the British Empire',
            'It led directly to the Russian Revolution',
            'It created long-term rivalry and hatred between France and Germany',
          ],
        },
        {
          q: 'Why was the unification of Germany a shock to the balance of power in Europe?',
          a: 'A massive, powerful, militaristic state suddenly appeared in the center of Europe',
          options: [
            'It meant Europe was now entirely peaceful',
            'A massive, powerful, militaristic state suddenly appeared in the center of Europe',
            'Germany was very weak and needed protecting',
            'Britain lost its navy',
          ],
        },
      ],
    },
    {
      id: 'lesson_2',
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
          label: '2.1 Berlin Conference',
        },
        {
          year: '1890–1897',
          label: '2.2 Weltpolitik',
        },
        {
          year: 'Mar 1905',
          label: '2.3 Tangier Crisis',
        },
        {
          year: '1906',
          label: '2.4 Algeciras Isolation',
        },
        {
          year: 'Jul 1911',
          label: '2.5 Panther at Agadir',
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
          title: '2.1 The Scramble for Africa & The Berlin Conference (1884–1885)',
          text: '<span class="para-ref">[2.1]</span> Between 1881 and 1914, European powers engaged in a frenzied race to conquer and colonize the African continent, a phenomenon known as the <strong>Scramble for Africa</strong>. Driven by the voracious industrial appetite for raw materials—rubber, copper, cotton, and palm oil—as well as captive consumer markets and competitive national prestige, European explorers and armies carved through African kingdoms. In 1870, less than ten percent of Africa was under European control; by 1914, that figure had soared to ninety percent.<br><br><span class="para-ref">[2.2]</span> To prevent this land grab from triggering wars among European nations, Chancellor Otto von Bismarck hosted the landmark <strong>Berlin West Africa Conference (1884–1885)</strong>. Fourteen nations gathered in Berlin to establish ground rules. The conference established the principle of <strong>effective occupation</strong>: no European power could claim sovereign territory merely by planting a flag; it had to establish physical administrative posts, police garrisons, and economic development. With rulers and colored pencils, European diplomats carved up millions of square miles, completely disregarding indigenous cultures, languages, and ethnic borders.',
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
          title: '2.2 Kaiser Wilhelm II, "Weltpolitik" & "A Place in the Sun" (1890–1897)',
          text: '<span class="para-ref">[2.2]</span> So long as Bismarck governed Germany, he insisted that Germany was a "satiated" continental power with no need for distant colonies. Bismarck famously pointed to a map of Europe and declared: <em>"Here lies Russia, and here lies France, and we are in the middle; that is my map of Africa."</em> But in 1888, the ambitious, erratic twenty-nine-year-old <strong>Kaiser Wilhelm II</strong> ascended the Hohenzollern throne. Impatient with Bismarck’s caution, Wilhelm II forced the Chancellor’s resignation in 1890, an event immortalized in British cartoons as "Dropping the Pilot."<br><br><span class="para-ref">[2.3]</span> Wilhelm II was determined on personal autocratic rule and demanded that Germany take its rightful place as a global empire. In 1897, Foreign Minister Bernhard von Bülow declared in the Reichstag that Germany demanded its <strong>"place in the sun" (Platz an der Sonne)</strong>. This aggressive doctrine was christened <strong>Weltpolitik</strong> ("World Policy"). Germany was late to the imperial banquet; Britain and France had already seized the most fertile and mineral-rich territories. To acquire an overseas empire and protect German merchant shipping, Wilhelm II resolved to build a colossal battlefleet, putting Germany on a direct collision course with Great Britain.',
        },
        {
          act: 3,
          title: '2.3 The First Moroccan Crisis & The Landing at Tangier (March 1905)',
          text: '<span class="para-ref">[2.3]</span> In April 1904, alarmed by Germany’s rising industrial power and naval ambitions, Great Britain and France signed the historic <strong>Entente Cordiale</strong> ("Friendly Understanding"). This was not a military alliance, but a settlement of colonial rivalries: France recognized British control of Egypt, while Britain recognized French dominance over the independent North African Sultanate of <strong>Morocco</strong>. To German leaders, this rapprochement was an intolerable diplomatic encirclement.<br><br><span class="para-ref">[2.4]</span> On 31 March 1905, Kaiser Wilhelm II staged a theatrical provocation in the <strong>First Moroccan Crisis</strong>. Landing at the Moroccan port of <strong>Tangier</strong> riding a white charger, Wilhelm II addressed the Sultan’s representatives, declaring that he viewed the Sultan as a completely independent sovereign ruler and would protect German commercial rights against French monopoly. The Kaiser calculated that France was militarily unready for war and that Britain would abandon Paris when challenged. It was a spectacular diplomatic miscalculation.',
        },
        {
          act: 4,
          title: '2.4 The Algeciras Conference & German Diplomatic Isolation (1906)',
          text: '<span class="para-ref">[2.4]</span> To resolve the Moroccan standoff, Germany demanded a general European conference, confident that international opinion would rebuke French expansion. In January 1906, diplomats convened at the <strong>Algeciras Conference</strong> in southern Spain. The outcome was a humiliating catastrophe for Berlin.<br><br><span class="para-ref">[2.5]</span> Rather than driving a wedge between Britain and France, German bullying cemented their partnership. The British Foreign Secretary, Sir Edward Grey, firmly supported France, warning Berlin that Britain would not remain neutral if France were attacked. Russia, Italy, Spain, and the United States also voted in favor of France controlling the Moroccan police and state bank. Only Austria-Hungary voted with Germany. Deeply embittered, Kaiser Wilhelm II left Algeciras convinced that the other European Great Powers were conspiring to surround and humiliate the German Empire—a paranoia known as <strong>Einkreisung</strong> (encirclement).',
        },
        {
          act: 5,
          title:
            '2.5 The Second Moroccan Crisis: The Panther at Agadir & Mansion House (July 1911)',
          text: '<span class="para-ref">[2.5]</span> Five years later, in the spring of 1911, Moroccan tribes rebelled against the Sultan, besieging him in his palace at Fez. The French government dispatched an army to occupy Fez to protect European residents. Accusing France of violating the Algeciras agreement, German Foreign Minister Alfred von Kiderlen-Waechter decided on a dangerous gamble of <strong>gunboat diplomacy</strong>. On 1 July 1911, the German imperial navy dispatched the gunboat <strong>SMS Panther</strong> to the Atlantic port of <strong>Agadir</strong>, ostensibly to protect German merchants, but in reality to blackmail France into ceding the French Congo.<br><br><span class="para-ref">[2.6]</span> The dispatch of the <em>Panther</em> caused outrage in London. Agadir lay close to vital British Atlantic shipping routes to South Africa and South America; a German naval base there would threaten British naval security. On 21 July 1911, Chancellor of the Exchequer <strong>David Lloyd George</strong> delivered his famous <strong>Mansion House Speech</strong>, warning Germany that Britain would fight alongside France rather than see peace maintained through national humiliation: <em>"If Britain is to be treated where she is concerned as if she were of no account... then I say emphatically that peace at that price would be a humiliation intolerable for a great country like ours to endure."</em> Germany backed down, accepting minor territorial concessions in the Congo in exchange for recognizing France’s protectorate over Morocco. Most crucially, the crisis convinced the British and French General Staffs to initiate secret, coordinated military planning for deploying a British Expeditionary Force to France in the event of German invasion.',
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
            'Paul von Hindenburg',
            'Adolf Hitler',
            'Kaiser Wilhelm II',
            'Otto von Bismarck',
          ],
        },
        {
          q: 'In which year did the First Moroccan Crisis occur?',
          a: '1905',
          options: ['1898', '1905', '1911', '1914'],
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
            'He wanted a holiday home in Africa',
            'He wanted Germany to have a global empire like Britain and France',
            'He wanted to conquer South America',
            'He wanted to control the Mediterranean Sea',
          ],
        },
        {
          q: 'What happened during the First Moroccan Crisis (1905)?',
          a: 'The Kaiser visited Tangier and declared support for Moroccan independence',
          options: [
            'Germany invaded Morocco',
            'France surrendered Morocco to Britain',
            'The local sultan defeated the French army',
            'The Kaiser visited Tangier and declared support for Moroccan independence',
          ],
        },
        {
          q: 'What was the main result of the Algeciras Conference (1906)?',
          a: 'Germany was humiliated and France was given control of Moroccan police',
          options: [
            'Britain took over Morocco',
            'Morocco became fully independent',
            'Germany was humiliated and France was given control of Moroccan police',
            'Germany gained full control of Morocco',
          ],
        },
        {
          q: 'What sparked the Second Moroccan Crisis (Agadir Crisis) in 1911?',
          a: 'Germany sent the gunboat Panther to the port of Agadir',
          options: [
            'Germany sent the gunboat Panther to the port of Agadir',
            'Moroccans attacked German tourists',
            'Britain blockaded the Moroccan coast',
            'France declared war on Germany',
          ],
        },
        {
          q: 'How did the Agadir Crisis end?',
          a: 'Germany backed down after being given a small strip of the Congo',
          options: [
            'Britain declared war on Germany',
            'Germany backed down after being given a small strip of the Congo',
            'Germany successfully conquered Morocco',
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
    },
    {
      id: 'lesson_3',
      skill: 'Technological Causation & Arms Race: The Anglo-German Naval Rivalry',
      title: 'Enquiry 3: The Anglo-German Naval Arms Race & HMS Dreadnought (1898–1914)',
      subtitle:
        'The Two-Power Standard, Admiral Tirpitz’s Risk Theory, and the Dreadnought Revolution',
      enquiryQuestion:
        'Why did a battleship building contest destroy Anglo-German relations and reset naval supremacy?',
      margin_spine: [
        {
          year: '1889–1897',
          label: '3.1 Two-Power Standard',
        },
        {
          year: '1898–1900',
          label: '3.2 Tirpitz Risk Theory',
        },
        {
          year: 'Feb 1906',
          label: '3.3 HMS Dreadnought',
        },
        {
          year: '1909',
          label: '3.4 Naval Panic',
        },
        {
          year: '1912–1914',
          label: '3.5 Haldane Mission',
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
          title: '3.1 The Two-Power Standard & British Maritime Survival (1889–1897)',
          text: '<span class="para-ref">[3.1]</span> For Great Britain, naval supremacy was not a luxury; it was the foundation of national survival. As an island nation, Britain could not feed its growing urban population without food imported across the oceans: by 1900, four-fifths of Britain’s wheat and four-fifths of its meat arrived on merchant ships. If enemy warships severed these maritime arteries, Britain would be starved into unconditional surrender within six weeks. Furthermore, the Royal Navy guarded an empire spanning one-quarter of the globe and four hundred million subjects.<br><br><span class="para-ref">[3.2]</span> Under the <strong>Naval Defence Act of 1889</strong>, Britain codified its core maritime doctrine: the <strong>Two-Power Standard</strong>. This statutory rule required the Royal Navy to maintain a battlefleet at least equal to the combined strength of the world\'s next two largest navies (at the time, France and Russia). British statesmen believed that maintaining undisputed mastery of the seas was the ultimate guarantee of European peace, deterring rival continental empires from launching aggressive wars.',
        },
        {
          act: 2,
          title: '3.2 Admiral von Tirpitz, German Naval Laws & "Risk Theory" (1898–1900)',
          text: '<span class="para-ref">[3.2]</span> In 1897, Kaiser Wilhelm II appointed an iron-willed, ambitious naval officer as Secretary of the Imperial Navy: <strong>Admiral Alfred von Tirpitz</strong>. Tirpitz possessed a passionate conviction that Germany could never achieve true greatness as a world empire without a powerful oceanic battlefleet. In 1898 and 1900, Tirpitz skillfully mobilized the German press, industrial shipbuilders, and the patriotic Navy League to push the monumental <strong>German Naval Laws</strong> through the Reichstag, authorizing the construction of dozens of colossal battleships to build the <strong>High Seas Fleet</strong>.<br><br><span class="para-ref">[3.3]</span> Tirpitz justified this ruinous expenditure through his famous <strong>Risk Theory (Risikotheorie)</strong>. Tirpitz recognized that Germany could not build a fleet larger than the entire Royal Navy, which was scattered across the globe guarding imperial trade routes. Instead, Germany would concentrate a lethal, modern battlefleet directly across the North Sea in German ports like Wilhelmshaven and Kiel. Tirpitz calculated that if Britain attacked, the German fleet would be strong enough to inflict catastrophic damage, even if defeated—thereby destroying Britain’s margin of superiority over rival powers like France or Russia. Consequently, Tirpitz believed Britain would avoid confrontation and concede Germany’s colonial and diplomatic demands. It was a fatal misreading of British strategic resolve.',
        },
        {
          act: 3,
          title: '3.3 The Dreadnought Revolution: All-Big-Gun Technology (February 1906)',
          text: '<span class="para-ref">[3.3]</span> Britain’s response to the German challenge was spearheaded by a brilliant, ruthless reformer: First Sea Lord <strong>Admiral Sir John "Jackie" Fisher</strong>. Fisher recognized that pre-existing battleships, armed with a chaotic mix of small and medium caliber guns, were obsolete. Working in utmost secrecy at Portsmouth Dockyard, Fisher oversaw the design and construction of <strong>HMS Dreadnought</strong>, completed in just four months and launched in February 1906.<br><br><span class="para-ref">[3.4]</span> <em>Dreadnought</em> was an engineering marvel that revolutionized naval warfare. It was the world\'s first "all-big-gun" warship, carrying ten 12-inch heavy guns mounted in rotating steel turrets capable of hurling 850-pound armor-piercing shells over eight miles. Powered by revolutionary Parsons steam turbines rather than reciprocating coal engines, it could cruise at a staggering 21 knots, outrunning and outgunning every warship afloat. Yet <em>Dreadnought</em> created a dangerous strategic paradox. By rendering every existing battleship obsolete, it wiped out Britain’s enormous numerical advantage of fifty pre-dreadnoughts to Germany’s twenty. The naval race was instantly reset to zero: <strong>Britain 1, Germany 0</strong>. Germany could now compete on equal terms by widening the Kiel Canal and laying down dreadnoughts of its own.',
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
          title: '3.4 The 1909 Naval Panic: "We Want Eight and We Won\'t Wait!" (1909)',
          text: '<span class="para-ref">[3.4]</span> Between 1906 and 1908, the German Reichstag passed amendments accelerating battleship construction, building four dreadnoughts a year. In late 1908, British intelligence discovered that German shipyards in Hamburg and Bremen were secretly pre-ordering steel and armor plates to accelerate construction beyond official quotas. In January 1909, a wave of patriotic hysteria known as the <strong>1909 Naval Panic</strong> swept through the British press and Parliament.<br><br><span class="para-ref">[3.5]</span> The British Liberal government, led by Prime Minister H.H. Asquith and Chancellor David Lloyd George, had hoped to economize on naval spending to fund historic social reforms like old-age pensions and national insurance. But Conservative politicians, newspapers, and the Navy League launched a fierce public campaign with the roaring slogan: <em>"We want eight and we won\'t wait!"</em> The public pressure proved irresistible. Parliament voted to fund eight massive super-dreadnoughts in a single fiscal year, heavily out-building Germany and imposing soaring tax burdens on both empires.',
        },
        {
          act: 5,
          title: '3.5 The Haldane Mission Failure & Strategic Redeployment (1912–1914)',
          text: '<span class="para-ref">[3.5]</span> By 1912, the ruinous economic cost of the naval arms race prompted British leaders to attempt a diplomatic truce. British War Secretary <strong>Lord Haldane</strong> traveled to Berlin to meet Kaiser Wilhelm II and Admiral Tirpitz. Haldane proposed a naval holiday: Britain would slow down dreadnought construction if Germany agreed to limit High Seas Fleet expansion. But the Kaiser insisted on a condition Britain could never accept: <strong>Germany demanded an unconditional treaty pledge that Britain would remain strictly neutral in any future European war</strong>.<br><br><span class="para-ref">[3.6]</span> Accepting this condition would have given Germany a free hand to crush France and dominate Europe, so Haldane rejected it and the mission collapsed. Concluding that a diplomatic settlement was impossible, First Lord of the Admiralty <strong>Winston Churchill</strong> enacted a radical strategic redistribution in 1912. Britain withdrew its major battleships from the Mediterranean Sea and concentrated sixty percent of the Royal Navy directly in the North Sea at Scapa Flow and Rosyth. Under an informal naval agreement, the French navy agreed to protect British commercial routes in the Mediterranean, while Britain undertook to defend the northern French coast from German attack. The naval race had failed to give Germany maritime dominance; instead, it poisoned commercial cooperation between London and Berlin, and forced Britain to abandon "splendid isolation" to weld an unbreakable naval and military partnership with the French Republic. Yet while dreadnoughts fueled tension, the spark that ignited the conflagration arose from Balkan ethnic nationalism.',
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
            'The fundamental reason the interpretations differ is...',
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
          options: ['Admiral von Tirpitz', 'Admiral Scheer', 'Admiral Hipper', 'Kaiser Wilhelm II'],
        },
        {
          q: 'What policy dictated that the British Royal Navy must be as large as the next two largest navies combined?',
          a: 'Two-Power Standard',
          options: [
            'Splendid Isolation',
            'Dreadnought Rule',
            'Naval Supremacy Act',
            'Two-Power Standard',
          ],
        },
        {
          q: 'Why was the HMS Dreadnought completely revolutionary?',
          a: "It was faster, heavier armored, and had all 'big-guns'",
          options: [
            'It was the first submarine',
            'It could launch airplanes',
            "It was faster, heavier armored, and had all 'big-guns'",
            'It was completely invisible to radar',
          ],
        },
        {
          q: "What was the consequence of the Dreadnought's launch?",
          a: 'It made all older battleships instantly obsolete, resetting the naval race',
          options: [
            'Germany immediately surrendered',
            'It made all older battleships instantly obsolete, resetting the naval race',
            'France allied with Germany',
            'Britain stopped building ships',
          ],
        },
        {
          q: "What was the German 'Risk Theory' proposed by Admiral Tirpitz?",
          a: "Building a navy large enough that Britain wouldn't risk fighting it",
          options: [
            'Attacking Britain immediately',
            'Building only submarines',
            "Building a navy large enough that Britain wouldn't risk fighting it",
            'Refusing to build any ships to avoid angering Britain',
          ],
        },
        {
          q: 'What slogan did the British public chant in 1909 to demand more ships?',
          a: "'We want eight and we won't wait!'",
          options: [
            "'Rule Britannia!'",
            "'More dreadnoughts now!'",
            "'Sink the Kaiser!'",
            "'We want eight and we won't wait!'",
          ],
        },
        {
          q: 'Why did Britain feel so threatened by the German naval expansion?',
          a: 'Britain is an island and relied entirely on its navy for survival and trade',
          options: [
            'Britain is an island and relied entirely on its navy for survival and trade',
            'They had no army at all',
            'They wanted to attack Germany',
            'They were worried Germany would steal their ships',
          ],
        },
        {
          q: 'What laws were passed in Germany to fund their massive naval buildup?',
          a: 'The Naval Laws of 1898 and 1900',
          options: [
            'The Shipyard Acts',
            'The Naval Laws of 1898 and 1900',
            'The Tirpitz Decrees',
            'The Imperial Fleet Bills',
          ],
        },
        {
          q: 'By 1914, who had won the naval race?',
          a: "Britain, with 29 dreadnoughts to Germany's 17",
          options: [
            'They had exactly the same number',
            "Britain, with 29 dreadnoughts to Germany's 17",
            "Germany, with 30 dreadnoughts to Britain's 10",
            'France overtook both of them',
          ],
        },
        {
          q: 'How did the naval race affect British foreign policy?',
          a: "It forced Britain out of 'Splendid Isolation' and into an alliance with France and Russia",
          options: [
            "It forced Britain out of 'Splendid Isolation' and into an alliance with France and Russia",
            'It made them give up their empire',
            'It caused them to declare war on America',
            'It made them ally with Germany',
          ],
        },
      ],
    },
    {
      id: 'lesson_4',
      skill: 'Interpretation & Alliances: The Alliance System & The Balkan Powder Keg',
      title: 'Enquiry 4: The Alliance Systems & the Balkan Powder Keg (1879–1913)',
      subtitle:
        'From the Dual Alliance and Triple Entente to the Bosnian Annexation and Balkan Wars',
      enquiryQuestion:
        'Did European military alliances protect continental peace or guarantee a domino-effect catastrophe?',
      margin_spine: [
        {
          year: '1879–1882',
          label: '4.1 Triple Alliance',
        },
        {
          year: '1894–1907',
          label: '4.2 Triple Entente',
        },
        {
          year: '1900–1908',
          label: '4.3 Balkan Powder Keg',
        },
        {
          year: 'Oct 1908',
          label: '4.4 Bosnian Annexation',
        },
        {
          year: '1912–1913',
          label: '4.5 Balkan Wars',
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
          title: '4.1 The Central European Bloc: Dual Alliance & Triple Alliance (1879–1882)',
          text: '<span class="para-ref">[4.1]</span> In October 1879, haunted by the specter of a hostile coalition between France and Russia, Chancellor Otto von Bismarck negotiated the historic <strong>Dual Alliance</strong> with the Austro-Hungarian Empire. Both empires pledged that if either were attacked by Russia, the other would intervene with its entire armed forces; if attacked by another power (such as France), the other promised benevolent neutrality. Three years later, in 1882, Italy joined the partnership after losing Tunisia to France in an imperial dispute, expanding the bloc into the <strong>Triple Alliance</strong>.<br><br><span class="para-ref">[4.2]</span> Bismarck intended the Triple Alliance as a strictly defensive shield to stabilize Central Europe and preserve peace through strength. But it had a dangerous unintended consequence: it tied Germany’s military destiny to the fragile, multi-ethnic Austro-Hungarian Empire, an ancient realm ruled by the elderly Habsburg Emperor Franz Joseph that was being torn apart from within by violent nationalist rebellions.',
        },
        {
          act: 2,
          title: '4.2 The Counter-Alliance: Franco-Russian Alliance & Triple Entente (1894–1907)',
          text: '<span class="para-ref">[4.2]</span> In 1890, Kaiser Wilhelm II made the fateful blunder of allowing Bismarck’s secret 1887 Reinsurance Treaty with Russia to lapse. Desperate for capital loans to build the Trans-Siberian Railway and fearful of German military dominance, autocratic Tsarist Russia turned to republican France. In 1894, the two ideologically opposite regimes signed the <strong>Franco-Russian Military Alliance</strong>, promising mutual military assistance if either were attacked by Germany. Bismarck’s supreme nightmare—a two-front encirclement—had become a reality.<br><br><span class="para-ref">[4.3]</span> Alarmed by German naval expansion, Great Britain abandoned its traditional policy of "Splendid Isolation." In 1904, Britain settled century-old colonial disputes with France in the <strong>Entente Cordiale</strong>. In 1907, Britain and Russia resolved imperial rivalries in Persia and Tibet in the <strong>Anglo-Russian Convention</strong>. Together, these bilateral treaties formed the <strong>Triple Entente</strong> (Britain, France, Russia). Europe was now divided into two armed, suspicious coalitions. The alliance system was designed as a mutual deterrent, but it operated like a string of linked dynamite: if any two powers went to war, all six would be dragged into the conflagration.',
        },
        {
          act: 3,
          title: '4.3 The "Balkan Powder Keg", Ottoman Decline & Pan-Slavism (1900–1908)',
          text: '<span class="para-ref">[4.3]</span> For centuries, the Balkan peninsula in south-eastern Europe had been ruled by the Islamic <strong>Ottoman Empire</strong>. But by 1900, the Ottoman state was decaying rapidly, mocked across Europe as the "Sick Man of Europe." As Ottoman power collapsed, independent Christian nations—Greece, Bulgaria, Romania, and <strong>Serbia</strong>—threw off Turkish rule. A dangerous geopolitical vacuum emerged in south-eastern Europe, known as the <strong>"Balkan Powder Keg."</strong><br><br><span class="para-ref">[4.4]</span> Two rival Great Powers competed to dominate this vacuum. The Russian Empire claimed the mantle of protector of fellow Orthodox Christians and Slavs under the banner of <strong>Pan-Slavism</strong>, seeking warm-water naval access through the Dardanelles Straits to the Mediterranean. Directly opposing Russia was the Austro-Hungarian Empire, which feared that if Slavic nationalism triumphed in the Balkans, the millions of Serbs, Croats, and Bosnians living inside the Habsburg realm would break away and destroy the empire. Independent Serbia, dreaming of a "Greater Serbia" uniting all South Slavs, became Austria’s mortal enemy.',
        },
        {
          act: 4,
          title: '4.4 The 1908 Bosnian Annexation Crisis & Russian Humiliation (October 1908)',
          text: '<span class="para-ref">[4.4]</span> In October 1908, the powder keg came close to exploding. Exploiting a revolution in the Ottoman Empire, Austro-Hungarian Foreign Minister Alois von Aehrenthal unilaterally <strong>annexed the provinces of Bosnia and Herzegovina</strong>, which Austria had occupied administratively since 1878. The annexation sparked furious outrage in Serbia, which viewed Bosnia—with its large Serbian population—as its natural sovereign territory. Serbian crowds protested in Belgrade and demanded war.<br><br><span class="para-ref">[4.5]</span> Russia stepped forward to champion Serbia, mobilizing troops along its western border. But Germany’s Chancellor Bernhard von Bülow intervened with brutal clarity. In March 1909, Germany delivered a harsh ultimatum to Saint Petersburg: Russia must accept the annexation immediately without an international conference, or Germany would support Austria with total military force. Still recovering from its disastrous 1905 defeat by Japan, the Russian army was unready for war. Deeply humiliated, Tsar Nicholas II backed down and forced Serbia to submit. But the humiliation left a legacy of bitter fury: Russia launched a massive military rearmament program and resolved never to back down in the Balkans again.',
        },
        {
          act: 5,
          title: '4.5 The 1912–1913 Balkan Wars & The Pre-emptive War Urge (1912–1913)',
          text: '<span class="para-ref">[4.5]</span> In October 1912, the <strong>First Balkan War</strong> erupted. An alliance of Serbia, Greece, Bulgaria, and Montenegro (the Balkan League) attacked the Ottoman Empire, sweeping Turkish armies out of almost all their European territories in just six weeks. In 1913, the victors quarrelled over the spoils in the bloody <strong>Second Balkan War</strong>, which ended with Serbia decisively defeating Bulgaria.<br><br><span class="para-ref">[4.6]</span> The consequences of the Balkan Wars were catastrophic for Austro-Hungarian security. Serbia emerged from the wars triumphant: its national territory expanded by eighty percent and its population swelled from three million to four and a half million. Flush with military confidence and armed with modern French artillery, Serbian nationalists intensified terrorist agitation inside Austria-Hungary. In Vienna, Austrian Chief of General Staff <strong>Franz Conrad von Hötzendorf</strong> became convinced that a <strong>pre-emptive war</strong> to militarily crush Serbia was essential before Slavic subversion destroyed the Habsburg monarchy: Conrad urged war against Serbia over twenty times in 1913 alone. The stage was set: all that was needed was a spark.',
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
            'Britain, France, Italy',
            'Germany, Austria-Hungary, Italy',
            'Britain, France, Russia',
            'Germany, Russia, Austria-Hungary',
          ],
        },
        {
          q: 'Which country left the Triple Alliance and joined the Entente in 1915?',
          a: 'Italy',
          options: ['Ottoman Empire', 'Romania', 'Bulgaria', 'Italy'],
        },
        {
          q: "What was Britain's traditional foreign policy before forming alliances?",
          a: 'Splendid Isolation',
          options: ['Splendid Isolation', 'Weltpolitik', 'Continental Commitment', 'Appeasement'],
        },
        {
          q: 'Which three countries made up the Triple Alliance of 1882?',
          a: 'Germany, Austria-Hungary, Italy',
          options: [
            'Britain, France, Russia',
            'Germany, Russia, Austria-Hungary',
            'Germany, Ottoman Empire, Italy',
            'Germany, Austria-Hungary, Italy',
          ],
        },
        {
          q: 'Which three countries formed the Triple Entente by 1907?',
          a: 'Britain, France, Russia',
          options: [
            'Britain, USA, France',
            'Britain, France, Russia',
            'Germany, Austria-Hungary, Italy',
            'France, Russia, Italy',
          ],
        },
        {
          q: 'What was a major flaw of the alliance system?',
          a: 'A small dispute between two nations could drag all major powers into war',
          options: [
            'It prevented any trade between the blocs',
            'It made the armies too small',
            'A small dispute between two nations could drag all major powers into war',
            'It forced countries to disarm',
          ],
        },
        {
          q: 'Why did Russia ally with France in 1894?',
          a: 'Because Kaiser Wilhelm II allowed the Reinsurance Treaty with Russia to lapse',
          options: [
            'Because they shared the same religion',
            'Because Kaiser Wilhelm II allowed the Reinsurance Treaty with Russia to lapse',
            'Because Britain attacked them',
            'Because France promised them African colonies',
          ],
        },
        {
          q: "What was the 'Entente Cordiale' signed in 1904?",
          a: 'A friendly agreement between Britain and France, settling colonial disputes',
          options: [
            'A friendly agreement between Britain and France, settling colonial disputes',
            'A military alliance between Germany and Russia',
            'A peace treaty ending a war',
            'An agreement to build dreadnoughts together',
          ],
        },
        {
          q: 'Why did Britain finally decide to form alliances?',
          a: "They felt threatened by Germany's growing navy and aggressive Weltpolitik",
          options: [
            'They wanted to conquer Europe',
            'They needed money from Russia',
            "They felt threatened by Germany's growing navy and aggressive Weltpolitik",
            'They were invaded by France',
          ],
        },
        {
          q: "What does 'Weltpolitik' mean?",
          a: "World policy (Germany's desire for a global empire)",
          options: [
            'Naval supremacy',
            'Splendid isolation',
            'Peaceful co-existence',
            "World policy (Germany's desire for a global empire)",
          ],
        },
        {
          q: "Which nation in the Triple Alliance was seen as the 'weak link'?",
          a: 'Italy',
          options: ['Austria-Hungary', 'Germany', 'Britain', 'Italy'],
        },
      ],
    },
    {
      id: 'lesson_5',
      skill: 'Short-Term Causation & The July Crisis: From Sarajevo to World War',
      title: 'Enquiry 5: The July Crisis: Sarajevo to the Outbreak of War (June–August 1914)',
      subtitle:
        'From the Shots at the Latin Bridge and the Blank Cheque to the Invasion of Belgium',
      enquiryQuestion:
        'Why did a single assassination in Sarajevo ignite thirty-seven days of diplomatic madness and world war?',
      margin_spine: [
        {
          year: '28 Jun 1914',
          label: '5.1 Sarajevo Shots',
        },
        {
          year: '5 Jul 1914',
          label: '5.2 The Blank Cheque',
        },
        {
          year: '23–28 Jul',
          label: '5.3 The Ultimatum',
        },
        {
          year: '29–31 Jul',
          label: '5.4 Train Timetables',
        },
        {
          year: '1–4 Aug',
          label: '5.5 Belgian Neutrality',
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
          title: '5.1 The Assassination of Franz Ferdinand in Sarajevo (28 June 1914)',
          text: '<span class="para-ref">[5.1]</span> On Sunday, 28 June 1914, the heir to the Austro-Hungarian throne, <strong>Archduke Franz Ferdinand</strong>, and his wife Sophie arrived in the Bosnian capital of <strong>Sarajevo</strong> for an official military inspection. The date was deeply provocative: 28 June was <em>Vidovdan</em> (St Vitus Day), a sacred Serbian national holiday commemorating the heroic 1389 Battle of Kosovo. Stationed along the Appel Quay beside the Miljacka River was a six-man assassination squad from the radical nationalist movement <strong>Young Bosnia</strong>, armed with pistols and bombs supplied by the secret Serbian military society the <strong>Black Hand (Crna Ruka)</strong>, led by Colonel Dragutin Dimitrijević ("Apis").<br><br><span class="para-ref">[5.2]</span> The initial assassination attempt failed: a bomb thrown by Nedeljko Čabrinović bounced off the Archduke’s convertible roof, detonating beneath the following vehicle and wounding twenty people. Franz Ferdinand attended a reception at City Hall, then bravely insisted on visiting the wounded officers in hospital. But his chauffeur, Leopold Lojka, was not informed of the changed itinerary. Turning right into Franz Josef Street outside <strong>Schiller’s Delicatessen</strong> beside the <strong>Latin Bridge</strong>, the driver was ordered to stop and reverse. The car stalled. Standing on the pavement just five feet away was nineteen-year-old student <strong>Gavrilo Princip</strong>. Seizing the astonishing opportunity, Princip drew his Browning pistol and fired two shots at point-blank range. Sophie was shot in the stomach; Franz Ferdinand was severed in the jugular. As his wife lay dying, the Archduke murmured: <em>"Sophie, Sophie, don\'t die! Stay alive for our children!"</em> Both were dead within fifteen minutes.',
          source: {
            letter: 'A',
            title:
              'Source A (Cartographic & Primary Record): The Fatal Wrong Turn at the Latin Bridge, Sarajevo (28 June 1914)',
            image: '/units/great_war/assets/july_crisis.svg',
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
          title: '5.2 The "Blank Cheque" & The Escalation of the Crisis (5 July 1914)',
          text: '<span class="para-ref">[5.2]</span> The assassinations provoked horrified outrage across Europe. Aggressive Serbian nationalism and Austro-Hungarian determination to launch a pre-emptive strike caused Austrian leaders to resolve that Serbia’s complicity in the plot provided the perfect opportunity to eliminate the Serbian threat once and for all. But Austrian leaders hesitated to attack, knowing that attacking Serbia risked military intervention by Russia. On 5 July 1914, Austrian envoy Count Alexander Hoyos traveled to Berlin to seek German backing.<br><br><span class="para-ref">[5.3]</span> In what historians consider one of the most reckless diplomatic blunders in history, Kaiser Wilhelm II and Chancellor Theobald von Bethmann-Hollweg issued the infamous <strong>"Blank Cheque" (Blankovollmacht)</strong>. Germany promised unconditional, total military support to Austria-Hungary, urging Vienna to strike swiftly against Serbia while international outrage was high, even if Russia intervened. German leaders calculated that Russia was still unready for war and that Britain would stay neutral. Backed by German might, Austrian hawks drafted a plan not for negotiation, but for war.',
        },
        {
          act: 3,
          title: '5.3 The Ten-Point Ultimatum & Declaration of War on Serbia (23–28 July 1914)',
          text: '<span class="para-ref">[5.3]</span> On the evening of 23 July 1914, Austria-Hungary delivered a severe <strong>Ten-Point Ultimatum</strong> to the Serbian government in Belgrade, demanding complete acceptance within forty-eight hours. The terms were deliberately designed to be intolerable: they demanded that Serbia ban all anti-Austrian newspapers and societies, dismiss anti-Austrian military officers, and, critically, permit Austro-Hungarian police and judicial officials to enter Serbia to conduct investigations.<br><br><span class="para-ref">[5.4]</span> Accepting foreign police on sovereign soil would have meant the surrender of Serbian national independence. Yet, advised by Russia to show maximum restraint, Serbia submitted an astonishingly conciliatory reply on 25 July, accepting eight of the ten demands and offering to submit the remaining two to the International Court at The Hague. British Foreign Secretary Sir Edward Grey praised Serbia’s response as the greatest capitulation ever offered by a sovereign state. But Austria-Hungary was determined on war. On <strong>28 July 1914</strong>, Austria declared war on Serbia. That night, Austrian artillery gunboats on the Danube opened fire, shelling the Serbian capital of Belgrade. The third Balkan war had begun.',
        },
        {
          act: 4,
          title: '5.4 Railway Mobilisation Schedules & The Domino Effect (29–31 July 1914)',
          text: '<span class="para-ref">[5.4]</span> The bombardment of Belgrade triggered the inexorable domino effect of the alliance systems. The division of Europe into the Triple Alliance and Triple Entente created an automatic tripwire mechanism. In Saint Petersburg, Tsar Nicholas II came under intense pressure from Russian military commanders: if Russia did not mobilize immediately, Austria would crush Serbia and dominate the Balkans. Furthermore, because of Russia’s vast geographic expanse and sparse railway network, Russian mobilization took six weeks; delaying mobilization would leave Russia defenseless if Germany attacked. On <strong>30 July 1914</strong>, the Tsar signed the order for <strong>general mobilization</strong>.<br><br><span class="para-ref">[5.5]</span> Russian mobilization transformed diplomacy into an automated military machine, a phenomenon historian A.J.P. Taylor termed <strong>"War by Timetable."</strong> In nineteenth-century warfare, mobilization was not merely preparation; it was an act of war involving millions of reservists and thousands of trains on rigid timetables that generals claimed could not be halted without risking total defeat. In Berlin, the Chief of the General Staff, <strong>Helmuth von Moltke the Younger</strong>, informed the Chancellor that Russia’s mobilization made war unavoidable. On 31 July, Germany issued an ultimatum to Russia demanding it halt mobilization within twelve hours, and an ultimatum to France demanding neutrality within eighteen hours. Both refused. On 1 August, Germany declared war on Russia, and on 3 August declared war on France.',
        },
        {
          act: 5,
          title: '5.5 The Schlieffen Plan, Belgian Neutrality & British Entry (1–4 August 1914)',
          text: '<span class="para-ref">[5.5]</span> Germany’s entire war strategy was dictated by the rigid, inflexible <strong>Schlieffen Plan</strong>, conceived a decade earlier by Count Alfred von Schlieffen to solve the nightmare of a two-front war. The plan assumed that Russia’s "steamroller" army would take six weeks to mobilize. During those six weeks, Germany would concentrate ninety percent of its army in the west to crush France in forty-two days with a colossal right-hook sweep, before wheeling east along railways to defeat Russia. To bypass France’s impregnable frontier forts along the Vosges, the German right wing was ordered to march across the plains of neutral <strong>Belgium</strong>.<br><br><span class="para-ref">[5.6]</span> On 2 August, Germany demanded free passage across Belgium; King Albert of Belgium heroically refused, declaring: <em>"Belgium is a nation, not a road."</em> On <strong>3 August 1914</strong>, German armies crossed the Belgian frontier at Gemmenich, burning towns and shooting civilians in an invasion that outraged global opinion. For Great Britain, Belgian neutrality was non-negotiable: Britain had guaranteed Belgian sovereignty in the historic <strong>1839 Treaty of London</strong>, and no British government could permit a hostile superpower to control the Channel ports facing the Thames estuary. When German Chancellor Bethmann-Hollweg dismissed the 1839 treaty as a mere <em>"scrap of paper,"</em> Britain delivered an ultimatum demanding German withdrawal by midnight. Germany refused. At 11:00 PM on <strong>4 August 1914</strong>, Great Britain entered the First World War. Watching the street lamps being lit along Whitehall from the Foreign Office window, Sir Edward Grey uttered his unforgettable epitaph: <em>"The lamps are going out all over Europe; we shall not see them lit again in our lifetime."</em>',
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
            'Dragutin Dimitrijevic',
            'Nedeljko Cabrinovic',
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
          options: ['28 July 1914', '28 June 1914', '4 August 1914', '11 November 1918'],
        },
        {
          q: 'Which empire had annexed Bosnia in 1908, angering Serbian nationalists?',
          a: 'Austria-Hungary',
          options: ['The Ottoman Empire', 'Russia', 'Germany', 'Austria-Hungary'],
        },
        {
          q: 'Who was the heir to the Austro-Hungarian throne that visited Sarajevo?',
          a: 'Archduke Franz Ferdinand',
          options: [
            'Archduke Franz Ferdinand',
            'Emperor Franz Joseph',
            'Kaiser Wilhelm II',
            'Tsar Nicholas II',
          ],
        },
        {
          q: 'What terrorist group supplied the assassins with weapons?',
          a: 'The Black Hand',
          options: ['Young Bosnia', 'The Black Hand', 'The Red Army', 'The Serbian Guard'],
        },
        {
          q: 'What was the first, failed assassination attempt on the Archduke that morning?',
          a: 'A bomb was thrown at his car but bounced off',
          options: [
            'He was shot at but missed',
            'A bridge was blown up',
            'A bomb was thrown at his car but bounced off',
            'His driver was poisoned',
          ],
        },
        {
          q: "Why was Gavrilo Princip standing outside Schiller's Delicatessen when the Archduke's car stopped?",
          a: 'By total coincidence, the driver took a wrong turn and stalled the car right in front of him',
          options: [
            'Princip had planned the exact route',
            'The Archduke went in to buy a sandwich',
            'By total coincidence, the driver took a wrong turn and stalled the car right in front of him',
            'The police ordered the car to stop there',
          ],
        },
        {
          q: "What was the 'Blank Cheque'?",
          a: "Germany's promise of unconditional support to Austria-Hungary against Serbia",
          options: [
            'A peace offer from Russia',
            "Germany's promise of unconditional support to Austria-Hungary against Serbia",
            'A bribe paid to the assassins',
            'The money used to buy the guns',
          ],
        },
        {
          q: 'What happened on July 23, 1914?',
          a: 'Austria-Hungary sent an impossibly harsh ultimatum to Serbia',
          options: [
            'Austria-Hungary sent an impossibly harsh ultimatum to Serbia',
            'Russia declared war',
            'Germany invaded Belgium',
            'Britain joined the war',
          ],
        },
        {
          q: 'Why did Britain declare war on Germany on August 4, 1914?',
          a: 'Germany invaded neutral Belgium, violating the 1839 Treaty of London',
          options: [
            'Because of the assassination in Sarajevo',
            'Because France surrendered',
            'Because Germany sank a British ship',
            'Germany invaded neutral Belgium, violating the 1839 Treaty of London',
          ],
        },
      ],
    },
  ],
  quizPack: [
    {
      q: 'In what year did the Franco-Prussian War end?',
      a: '1871',
      options: ['1871', '1890', '1914', '1882'],
      id: 'gw_q1',
    },
    {
      q: 'Which wealthy region did Germany take from France in 1871?',
      a: 'Alsace-Lorraine',
      options: ['The Sudetenland', 'The Rhineland', 'Alsace-Lorraine', 'The Ruhr Valley'],
      id: 'gw_q2',
    },
    {
      q: 'What was the French desire for revenge called?',
      a: 'Revanche',
      options: ['Pan-Slavism', 'Encirclement', 'Weltpolitik', 'Revanche'],
      id: 'gw_q3',
    },
    {
      q: 'Who was the German Chancellor that unified Germany?',
      a: 'Otto von Bismarck',
      options: [
        'Count Leo von Caprivi',
        'Otto von Bismarck',
        'Kaiser Wilhelm II',
        'Theobald von Bethmann-Hollweg',
      ],
      id: 'gw_q4',
    },
    {
      q: "What was Bismarck's greatest strategic fear?",
      a: 'A war on two fronts (Encirclement)',
      options: [
        'An uprising by the working class',
        'A war on two fronts (Encirclement)',
        'A British naval blockade',
        'The collapse of Austria-Hungary',
      ],
      id: 'gw_q5',
    },
    {
      q: 'Which two countries did Bismarck fear would ally against Germany?',
      a: 'France and Russia',
      options: [
        'Britain and France',
        'Russia and Austria-Hungary',
        'Britain and Russia',
        'France and Russia',
      ],
      id: 'gw_q6',
    },
    {
      q: 'What was the secret 1887 agreement between Germany and Russia?',
      a: 'The Reinsurance Treaty',
      options: [
        'The Reinsurance Treaty',
        'The Treaty of London',
        'The Dual Alliance',
        'The Entente Cordiale',
      ],
      id: 'gw_q7',
    },
    {
      q: 'Which ambitious German Emperor dismissed Bismarck in 1890?',
      a: 'Kaiser Wilhelm II',
      options: [
        'Kaiser Wilhelm I',
        'Tsar Nicholas II',
        'Kaiser Wilhelm II',
        'Archduke Franz Ferdinand',
      ],
      id: 'gw_q8',
    },
    {
      q: "What was Wilhelm II's aggressive global policy called?",
      a: 'Weltpolitik (World Policy)',
      options: ['Lebensraum', 'Weltpolitik (World Policy)', 'Realpolitik', 'Splendid Isolation'],
      id: 'gw_q9',
    },
    {
      q: "What previous policy of Bismarck's focused on European peace?",
      a: 'Realpolitik',
      options: ['Pan-Slavism', 'Mitteleuropa', 'Realpolitik', 'Weltpolitik (World Policy)'],
      id: 'gw_q10',
    },
    {
      q: 'What agreement did Britain and France sign in 1904?',
      a: 'The Entente Cordiale',
      options: [
        'The Triple Entente',
        'The Treaty of Versailles',
        'The Reinsurance Treaty',
        'The Entente Cordiale',
      ],
      id: 'gw_q11',
    },
    {
      q: 'In which African country did Wilhelm provoke crises in 1905 and 1911?',
      a: 'Morocco',
      options: ['Morocco', 'Egypt', 'South Africa', 'Sudan'],
      id: 'gw_q12',
    },
    {
      q: 'What was the result of the First Moroccan (Tangier) Crisis?',
      a: 'Britain and France grew closer, isolating Germany',
      options: [
        'Germany gained control of Morocco',
        'Britain and France grew closer, isolating Germany',
        'The Entente Cordiale was dissolved',
        'Russia declared war on Germany',
      ],
      id: 'gw_q13',
    },
    {
      q: "What name was given to Germany's aggressive threat of military force?",
      a: 'Gunboat Diplomacy',
      options: ['Dollar Diplomacy', 'Risk Theory', 'Gunboat Diplomacy', 'Appeasement'],
      id: 'gw_q14',
    },
    {
      q: 'What was the name of the German gunboat sent to Agadir in 1911?',
      a: 'SMS Panther',
      options: ['HMS Dreadnought', 'SMS Emden', 'SMS Bismarck', 'SMS Panther'],
      id: 'gw_q15',
    },
    {
      q: 'What was the British policy requiring their navy to be larger than the next two combined?',
      a: 'The Two-Power Standard',
      options: [
        'The Two-Power Standard',
        'The Continental Commitment',
        'The Imperial Defense Act',
        'The Risk Theory',
      ],
      id: 'gw_q16',
    },
    {
      q: 'What revolutionary British battleship was launched in 1906?',
      a: 'HMS Dreadnought',
      options: ['HMS Victory', 'HMS Dreadnought', 'HMS Invincible', 'HMS Iron Duke'],
      id: 'gw_q17',
    },
    {
      q: 'Why did the Dreadnought ironically threaten British supremacy?',
      a: 'It made all older ships obsolete, resetting the naval race',
      options: [
        'It was too expensive to build more than one',
        'Its guns could not hit moving targets',
        'It made all older ships obsolete, resetting the naval race',
        'It was easily destroyed by German U-Boats',
      ],
      id: 'gw_q18',
    },
    {
      q: "What was Britain's traditional foreign policy of avoiding European alliances called?",
      a: 'Splendid Isolation',
      options: ['The Two-Power Standard', 'Balance of Power', 'Appeasement', 'Splendid Isolation'],
      id: 'gw_q19',
    },
    {
      q: "What was German Admiral Tirpitz's naval strategy called?",
      a: 'Risk Theory',
      options: [
        'Risk Theory',
        'The Schlieffen Plan',
        'Unrestricted Submarine Warfare',
        'Weltpolitik',
      ],
      id: 'gw_q20',
    },
    {
      q: "What volatile region was known as the 'Powder Keg of Europe'?",
      a: 'The Balkans',
      options: ['The Caucasus', 'The Middle East', 'The Balkans', 'The Rhineland'],
      id: 'gw_q21',
    },
    {
      q: 'What declining multi-ethnic empire dominated the northern Balkans?',
      a: 'The Austro-Hungarian Empire',
      options: [
        'The Austro-Hungarian Empire',
        'The Ottoman Empire',
        'The Russian Empire',
        'The British Empire',
      ],
      id: 'gw_q22',
    },
    {
      q: 'Which empire was retreating from the Balkans, leaving a power vacuum?',
      a: 'The Ottoman Empire',
      options: [
        'The Austro-Hungarian Empire',
        'The Russian Empire',
        'The German Empire',
        'The Ottoman Empire',
      ],
      id: 'gw_q23',
    },
    {
      q: "Which nation wanted to unite all South Slavs into a 'Greater' nation?",
      a: 'Serbia',
      options: ['Bosnia', 'Serbia', 'Croatia', 'Bulgaria'],
      id: 'gw_q24',
    },
    {
      q: 'Which region did Austria-Hungary formally annex in 1908?',
      a: 'Bosnia',
      options: ['Romania', 'Serbia', 'Bosnia', 'Albania'],
      id: 'gw_q25',
    },
    {
      q: 'Which major power considered itself the protector of the Slavic people?',
      a: 'Russia',
      options: ['Germany', 'Britain', 'France', 'Russia'],
      id: 'gw_q26',
    },
    {
      q: 'Who was the heir to the Austro-Hungarian throne?',
      a: 'Archduke Franz Ferdinand',
      options: [
        'Emperor Franz Joseph',
        'Archduke Franz Ferdinand',
        'Tsar Nicholas II',
        'Kaiser Wilhelm II',
      ],
      id: 'gw_q27',
    },
    {
      q: 'In which city was the Archduke assassinated?',
      a: 'Sarajevo',
      options: ['Sarajevo', 'Belgrade', 'Vienna', 'Berlin'],
      id: 'gw_q28',
    },
    {
      q: 'On what date was the Archduke assassinated?',
      a: 'June 28, 1914',
      options: ['August 4, 1914', 'July 23, 1914', 'November 11, 1918', 'June 28, 1914'],
      id: 'gw_q29',
    },
    {
      q: 'Who assassinated the Archduke?',
      a: 'Gavrilo Princip',
      options: ['Gavrilo Princip', 'Nedeljko Čabrinović', 'Dragutin Dimitrijević', 'Leon Trotsky'],
      id: 'gw_q30',
    },
    {
      q: 'What secret Serbian society did the assassin belong to?',
      a: 'The Black Hand',
      options: ['The White Rose', 'The Black Hand', 'The Bolsheviks', 'The Young Turks'],
      id: 'gw_q31',
    },
    {
      q: 'What unconditional promise did Germany give Austria-Hungary in July 1914?',
      a: "The 'Blank Check'",
      options: [
        'The Reinsurance Treaty',
        'The Ultimatum',
        "The 'Blank Check'",
        'The Entente Cordiale',
      ],
      id: 'gw_q32',
    },
    {
      q: 'What is the month of diplomatic failures after the assassination called?',
      a: 'The July Crisis',
      options: [
        'The Blank Check Incident',
        'The Balkan Wars',
        'The Sarajevo Crisis',
        'The July Crisis',
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
      options: ['France', 'Britain', 'Russia', 'Germany'],
      id: 'gw_q35',
    },
    {
      q: "What was the name of Germany's military strategy for a two-front war?",
      a: 'The Schlieffen Plan',
      options: ['The Schlieffen Plan', 'Plan XVII', 'The Risk Theory', 'The Bismarck Strategy'],
      id: 'gw_q36',
    },
    {
      q: 'Which neutral country did Germany invade to attack France?',
      a: 'Belgium',
      options: ['Switzerland', 'The Netherlands', 'Luxembourg', 'Belgium'],
      id: 'gw_q37',
    },
    {
      q: 'Which country declared war on Germany due to the invasion of Belgium?',
      a: 'Britain',
      options: ['Russia', 'Italy', 'Britain', 'The United States'],
      id: 'gw_q38',
    },
    {
      q: 'What was the alliance of Germany, Austria-Hungary, and Italy called?',
      a: 'The Triple Alliance',
      options: [
        'The Triple Alliance',
        'The Triple Entente',
        'The Central Powers',
        'The League of Three Emperors',
      ],
      id: 'gw_q39',
    },
    {
      q: 'What was the alliance of Britain, France, and Russia called?',
      a: 'The Triple Entente',
      options: [
        'The Triple Alliance',
        'The Triple Entente',
        'The Grand Alliance',
        'The Allied Powers',
      ],
      id: 'gw_q40',
    },
    {
      q: 'What treaty ended the First World War in 1919?',
      a: 'The Treaty of Versailles',
      options: [
        'The Treaty of Brest-Litovsk',
        'The Treaty of Versailles',
        'The Treaty of Trianon',
        'The Congress of Vienna',
      ],
      id: 'gw_q41',
    },
    {
      q: 'Which clause forced Germany to accept full responsibility for the war?',
      a: 'Article 231 (War Guilt Clause)',
      options: [
        'Article 48',
        'The Reparations Clause',
        'Article 231 (War Guilt Clause)',
        'The Blank Check',
      ],
      id: 'gw_q42',
    },
    {
      q: 'What is the term for a war launched to destroy a rising threat before it gets too strong?',
      a: 'Preventative War',
      options: ['Total War', 'War of Attrition', 'Proxy War', 'Preventative War'],
      id: 'gw_q43',
    },
    {
      q: 'Which historian famously argued Germany planned a war of aggression?',
      a: 'Fritz Fischer',
      options: ['Fritz Fischer', 'A.J.P. Taylor', 'Margaret MacMillan', 'Christopher Clark'],
      id: 'gw_q44',
    },
    {
      q: 'Which historian argued the nations blundered into war due to rigid alliances?',
      a: 'Margaret MacMillan',
      options: ['Margaret MacMillan', 'Richard Evans', 'Ian Kershaw', 'Fritz Fischer'],
      id: 'gw_q45',
    },
    {
      q: "What was the 'quarantine line' of new states created after WWI called?",
      a: 'Cordon Sanitaire',
      options: ['Mitteleuropa', 'The Maginot Line', 'Cordon Sanitaire', 'The Iron Curtain'],
      id: 'gw_q46',
    },
    {
      q: 'Name one new state created by the Treaty of Versailles.',
      a: 'Poland',
      options: ['Romania', 'Poland', 'Bulgaria', 'Serbia'],
      id: 'gw_q47',
    },
    {
      q: 'What European power was completely dismantled by the peace treaties?',
      a: 'The Austro-Hungarian Empire',
      options: [
        'The German Empire',
        'The Russian Empire',
        'The British Empire',
        'The Austro-Hungarian Empire',
      ],
      id: 'gw_q48',
    },
    {
      q: 'What ideological threat did the Allies want to separate from Germany after the war?',
      a: 'Soviet Communism',
      options: ['Soviet Communism', 'Fascism', 'Anarchism', 'Imperialism'],
      id: 'gw_q49',
    },
    {
      q: 'Which country did Germany invade on 3 August 1914?',
      a: 'Belgium',
      options: ['Russia', 'France', 'Serbia', 'Belgium'],
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
      cover_image: 'assets/clark_cover.png',
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
      cover_image: 'assets/conrad_cover.png',
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
      cover_image: 'assets/childers_cover.png',
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
      cover_image: 'assets/tuchman_cover.png',
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
      cover_image: 'assets/all_quiet_cover.png',
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

export default great_war;
export const unitData = great_war;
if (typeof module !== 'undefined' && module.exports) module.exports = great_war;
