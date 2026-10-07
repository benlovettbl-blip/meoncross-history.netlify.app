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
      skill: 'Change & Continuity',
      title: 'How was the German Empire created in 1871?',
      a4_map: ['/images/german_empire_1871.png', '/images/modern_germany_map.png'],
      teacher_notes: {
        primer:
          'This lesson introduces students to the unification of Germany. Before understanding the alliance systems or the arms race, students must grasp the geographical and political shockwave caused by a unified, militaristic German Empire suddenly dominating Central Europe.',
        objectives: [
          {
            objective:
              "Understand how Otto von Bismarck used 'blood and iron' to unify the German states.",
            primer:
              "Focus on the 'Otto von Bismarck and Blood and Iron' narrative block. Emphasize that he preferred military force over democratic speeches.",
            question:
              "What did Bismarck mean by 'blood and iron' and how did this differ from democratic methods?",
          },
          {
            objective:
              'Analyze the geographical impact of the new German Empire on the balance of power in Europe.',
            primer:
              "Focus on the 'Crowning a Kaiser' section and the taking of Alsace-Lorraine. Use the maps to show the massive new empire in the center of Europe.",
            question:
              "Why would the creation of the German Empire and the annexation of Alsace-Lorraine terrify Germany's neighbors?",
          },
        ],
      },
      do_now: {
        title: 'Do Now: Geography of Europe',
        type: 'mixed',
        items: [
          {
            question: 'Name two major powers in Europe in 1870.',
            answer: 'France and Russia',
          },
          {
            question: 'What is an empire?',
            answer: 'A large group of states or countries ruled by a single monarch (emperor).',
          },
          {
            question: 'Why is having a strong army important for a country surrounded by others?',
            answer: 'To defend against attacks from multiple sides (a two-front war).',
          },
          {
            question: "Define the term 'Balance of Power'.",
            answer:
              'A situation in which nations of the world have roughly equal power, preventing any one nation from dominating.',
          },
        ],
      },
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
      video: [
        {
          type: 'youtube',
          url: 'https://www.youtube.com/watch?v=-PAEmgYv0DE',
          title: 'German Unification and Empire - History in 5 Minutes',
          duration: '5 mins 21 secs',
          viewing_task:
            'Note down the key steps Bismarck took to unify the German states and create the Empire.',
          model_answer:
            "Bismarck used a policy of 'blood and iron' to strengthen the Prussian military. He orchestrated three strategic wars: defeating Denmark (1864), crushing Austria (1866) to establish undisputed Prussian dominance, and finally provoking a war with France (1870-1871) to rally the independent southern German states into joining the new German Empire.",
        },
        {
          type: 'youtube',
          url: 'https://www.youtube.com/watch?v=o_PKusG7NFs',
          title: '"The Great War" 1 | What Made Germany So Successful Before World War 1?',
          duration: '23 mins 7 secs',
          viewing_task:
            'Watch the first 5 minutes of this documentary and note down the key factors that made the German Empire such a powerful new nation.',
          model_answer:
            "Germany was highly successful because of its rapidly growing population, heavily industrialized economy (becoming Europe's leading producer of steel and chemicals), massive and well-disciplined army, and advanced education system.",
        },
      ],
      narrative_blocks: [
        {
          act: 1,
          title: 'Act 1: Context & Catalyst (The Fragmented Chessboard & The Zollverein)',
          text: '<span class="para-ref">[1.1]</span> After 1815, Central Europe remained a fragmented patchwork of thirty-nine sovereign German-speaking states within the loose German Confederation. Two rival Great Powers competed for continental dominance: the Catholic, multi-ethnic Austrian Empire and the Protestant military Kingdom of Prussia. While Austria remained an agrarian empire preoccupied with internal ethnic unrest, Prussia underwent rapid industrial expansion powered by the rich coal and iron mines of the Ruhr Valley and Silesia.<br><br><span class="para-ref">[1.2]</span> In 1834, Prussia secured a decisive economic masterstroke by establishing the <em>Zollverein</em> (Customs Union). By dismantling internal trade tariffs across northern and central Germany while excluding protectionist Austria, Prussia bound the German economies inexorably to Berlin. The rapid construction of state-funded railway networks proved that industrial modernization, economic efficiency, and German unity belonged under Prussian leadership.<br><br><span class="para-ref">[1.3]</span> Prussia\'s economic ascendancy coincided with rapid urban expansion. As coal foundries multiplied along the Ruhr, thousands of workers migrated into industrial hubs, forging an economic interdependence that rendered old confederate boundaries obsolete under Prussian leadership.',
          source: {
            letter: 'A',
            title: 'Source A (Cartographic Record): The German Empire in Central Europe (1871)',
            image: '/images/german_empire_1871.png',
            caption:
              'Geopolitical map showing the unification of thirty-nine sovereign German states into the German Empire under Prussian leadership in 1871.',
            citation: 'Prussian State Library, Map Department (1871).',
            context:
              'Following the 1871 Treaty of Frankfurt, thirty-nine previously independent German states united under Prussian leadership to form the German Empire, creating an economic and military powerhouse in the center of Europe.',
            hinge_question:
              'How did the sudden emergence of a unified German Empire fundamentally shatter the European balance of power?',
          },
          tasks: [],
        },
        {
          act: 2,
          title: 'Act 2: Tension & Escalation (Blood & Iron: Bismarck’s Three Decisive Wars)',
          text: '<span class="para-ref">[2.1]</span> In 1862, King Wilhelm I appointed Otto von Bismarck as Minister President. When parliament refused military funding, Bismarck governed unconstitutionally, collecting taxes to equip the Prussian army with Krupp cast-steel cannons and Dreyse needle-guns. He famously declared: <em>"The great questions of the day will not be decided by speeches and resolutions of majorities... but by <strong>blood and iron</strong>."</em><br><br><span class="para-ref">[2.2]</span> Bismarck orchestrated three short, calculated wars to achieve unification. In 1864, Prussia and Austria defeated Denmark over Schleswig-Holstein. In 1866, Prussia crushed Austria at Königgrätz, expelling Vienna from German affairs. Finally, in 1870, Bismarck provoked France into declaring war, uniting the southern German states and routing French armies at Sedan.<br><br><span class="para-ref">[2.3]</span> The crushing Prussian victory at Sedan unseated Emperor Napoleon III and demolished French military dominance. By uniting the northern and southern German confederations under Prussian military command, Bismarck forged a unified military empire that fundamentally altered the European balance of power.',
          tasks: [],
        },
        {
          act: 3,
          title: 'Act 3: Crisis & Decision (Forensic Evidence: The Proclamation at Versailles)',
          text: '<span class="para-ref">[3.1]</span> On 18 January 1871, inside the historic Hall of Mirrors at the Palace of Versailles, King Wilhelm I was proclaimed the first German Emperor (Kaiser). Staging the ceremony inside France\'s royal palace while Prussian artillery shelled Paris was a deliberate act of psychological subjugation. Under the Treaty of Frankfurt, defeated France ceded Alsace-Lorraine and paid a punitive five-billion-franc indemnity.<br><br><span class="para-ref">[3.2]</span> Forensic cartographic evidence demonstrates the immense geopolitical shift. Spanning 540,000 square kilometres with 41 million citizens, the German Empire instantly formed Europe\'s demographic and military colossus. Yet Germany\'s central geographical position with exposed frontiers left military planners permanently anxious about encirclement by hostile neighbours.',
          source: {
            letter: 'B',
            title:
              'Source B (Comparative Cartography): Modern European Boundaries vs 1871 Frontiers',
            image: '/images/modern_germany_map.png',
            caption:
              'Comparative cartography overlaying 1871 German imperial boundaries onto modern sovereign European borders.',
            citation: 'Department Cartographic Collection.',
            context:
              'Comparing nineteenth-century borders with modern Europe reveals how the massive German Empire occupied the territories of several modern sovereign nations, generating continuous friction with neighbouring empires.',
            hinge_question:
              "Why would Germany's geographical position between France and Russia cause German military planners permanent strategic anxiety?",
          },
          tasks: [],
        },
        {
          act: 4,
          title: 'Act 4: Consequence & Legacy (The Historical Verdict: Shattered Balance of Power)',
          text: '<span class="para-ref">[4.1]</span> Historians remain divided over Bismarck’s statecraft. Traditional accounts celebrated him as a master of <em>Realpolitik</em> executing a grand blueprint for national unity. Conversely, modern historians like A.J.P. Taylor demonstrate that Bismarck was a pragmatic opportunist, exploiting diplomatic crises to preserve Prussian aristocratic power against rising liberal democracy.<br><br><span class="para-ref">[4.2]</span> The geopolitical consequences were profound. As British statesman Benjamin Disraeli observed, unification destroyed the European balance of power. By annexing Alsace-Lorraine and humiliating France, Bismarck created an irreconcilable western adversary, ensuring that European diplomacy for the next four decades would be haunted by fear of a general European war.',
          tasks: [],
        },
      ],
      vocab: [
        {
          term: 'Chancellor',
          definition: 'The highest official of a monarch, often equivalent to a prime minister.',
        },
        {
          term: 'Blood and Iron',
          definition:
            "Bismarck's policy of using warfare and military strength to achieve German unification.",
        },
      ],
      pair_share: {
        prompt:
          "Discuss with your partner: Was the German Empire created 'from below' by the people or 'from above' by military force?",
        think: 'Spend 1 minute quietly considering the question and forming your own opinion.',
        pair: 'Discuss your thoughts with your partner. Identify where your ideas agree and where they differ.',
        share: "Share your pair's combined conclusion with the class.",
      },
      prologue:
        'For centuries, Central Europe was an ungovernable mosaic of over three hundred separate principalities and kingdoms, vulnerable to invasion and mocked as a geopolitical vacuum. By 1871, a single colossal military superpower had been forged in the heart of Europe under Prussian dominance. Did Chancellor Otto von Bismarck forge this new empire through visionary political genius, or through a ruthless, calculated gamble of "blood and iron"?',
      tasks: [
        {
          type: 'two_sided_argument',
          topic:
            "Task 3: Evidence Preparation — Bismarck's Statecraft & The 1871 Geopolitical Rupture",
          question:
            'Was the German Empire forged through master diplomacy or ruthless military aggression?',
          instruction:
            "Examine both interpretations of Otto von Bismarck's statecraft. Bullet-point two key pieces of factual evidence into each column, then develop your balanced argument below:",
          advancement: {
            title: 'Interpretation 1: Pragmatic Statesmanship & Diplomacy',
            points: [
              'Built economic unity early through the Zollverein customs union, binding German states peacefully through trade.',
              'Prudently halted Prussian armies after defeating Austria in 1866, refusing to humiliate Vienna to secure future friendship.',
              'Skillfully used defensive alliances to unite southern German states without imposing Prussian military dictatorship.',
            ],
            starter:
              'Historians praising Bismarck argue that his statecraft was guided by calculated moderation, because...',
          },
          limitations: {
            title: 'Interpretation 2: "Blood and Iron" & Provoked Warfare',
            points: [
              'Collected taxes unconstitutionally in 1862 and declared that major historical questions are decided only by iron and blood.',
              'Deliberately provoked three successive wars (against Denmark, Austria, and France) to crush parliamentary opposition.',
              'Bullied King Wilhelm I with emotional tantrums, threatening to jump from palace windows whenever the King hesitated.',
            ],
            starter:
              "Conversely, critics argue that Bismarck's unification rested upon cynical violence and militarism, because...",
          },
          synthesis_prompt:
            'Explain whether Bismarck unified Germany through diplomatic genius or calculated military aggression.',
          synthesis_connectives: [
            'On the one hand...',
            'For instance, Bismarck...',
            'However, in reality...',
            'Consequently...',
            'Overall, it is clear that...',
          ],
          model_answer:
            'While Bismarck was an exceptionally gifted diplomatic tactician who understood the value of moderation—as shown when he refused to march on Vienna in 1866—his entire political strategy rested upon calculated violence. He unconstitutionally bypassed the Prussian parliament to fund his army, manufactured three deliberate wars in seven years, and weaponized the edited Ems Telegram to provoke France. His diplomacy was not an alternative to war, but the art of choosing the precise moment to unleash "blood and iron."',
        },
        {
          type: 'extended_writing',
          topic: 'Task 4: Extended Writing — Change & Continuity Evaluation',
          question:
            'To what extent was the creation of the German Empire in 1871 a complete turning point in European peace?',
          hints: [
            'Point: The sudden emergence of a unified, industrialized German Empire in 1871 radically transformed European geopolitics, shattering the old balance of power.',
            'Evidence: Bismarck bypassed parliament to unleash "blood and iron", deployed Krupp steel and railways across three swift wars, annexed Alsace-Lorraine, and united 41 million people under Prussian militarism.',
            'Explanation: Whereas Central Europe had previously been a fragmented buffer of small states, Germany instantly became the dominant military giant, generating a permanent security dilemma for France and Britain.',
            'Link: However, continuities also persisted: traditional monarchical autocracy remained intact and Bismarck used cautious balance-of-power diplomacy to avoid war for twenty years.',
          ],
          model_answer:
            'The creation of the German Empire on 18 January 1871 represented a profound geopolitical turning point, though critical diplomatic and structural continuities endured. For centuries after Westphalia, Central Europe had been a fragmented mosaic of small states, enabling Britain, France, Austria, and Russia to preserve a delicate balance of power. Bismarck shattered this equilibrium: by harnessing Prussian militarism, Krupp steel artillery, and extensive railway mobilization, he unconstitutionally bypassed parliament and orchestrated three decisive wars against Denmark, Austria, and France. Annexing Alsace-Lorraine and proclaiming the Kaiserreich at Versailles united 41 million people into Europe’s preeminent industrial colossus, leaving France burning for revanche and permanently destabilizing European security. Nevertheless, significant continuities persisted: Bismarck spent the next two decades preserving the status quo through cautious defensive alliances, while Europe’s traditional dynastic empires still governed international relations. Ultimately, 1871 was a structural turning point that transformed the nature of continental power and set Europe on the long road to 1914.',
        },
      ],
      key_figure: {
        name: 'Prince Otto von Bismarck',
        lifespan: '1815–1898',
        role: 'Minister President of Prussia & First Imperial Chancellor of Germany',
        significance:
          'Masterminded the three wars of German unification and established Prussian dominance across Central Europe through ruthless Realpolitik.',
        actions: [
          'Declared in 1862 that the great questions of the age would be decided not by speeches but by "blood and iron" (Eisen und Blut).',
          'Engineered swift, decisive military victories against Denmark (1864), Austria (1866), and France (1870–1871).',
          'Proclaimed the German Empire in the Hall of Mirrors at Versailles, annexing Alsace-Lorraine and forging the dominant continental powerhouse.',
        ],
        image: '/images/otto_von_bismarck_portrait.jpg',
      },
      concept_spotlight: {
        tag: 'HISTORICAL DEEP DIVE: CRITICAL MECHANISM',
        category: 'THE VIENNA SETTLEMENT & REALPOLITIK • 1871',
        title: 'Realpolitik & Shattering the European Balance of Power',
        body: 'For centuries after the 1648 Peace of Westphalia, Central Europe was fragmented into dozens of small, weak German principalities, allowing Britain, France, Austria, and Russia to maintain a stable European balance of power. Bismarck\'s unification fused thirty-nine separate states into a single economic colossus of 41 million people possessing Europe\'s most efficient rail network, advanced chemical and steel industries, and an invincible Prussian army. British statesman Benjamin Disraeli warned Parliament: "The balance of power has been entirely destroyed; you have a new world, new influences, and new dangers."',
        takeaway:
          'The sudden emergence of a unified, industrialized Germany created an unresolved security dilemma: Germany felt vulnerable to encirclement, while its neighbors feared German continental hegemony.',
      },
      archival_dispatch: {
        badge: 'ARCHIVAL DISPATCH',
        type: 'Imperial Proclamation',
        date: '18 January 1871',
        title: 'Proclamation of the German Empire at Versailles',
        body: '"We, Wilhelm, by the grace of God King of Prussia, hereby announce that we assume the Imperial dignity... We accept it in the hope that it may be granted to the German people to enjoy the reward of its ardent and self-sacrificing struggles in lasting peace, within borders which guarantee to the Fatherland security against renewed attacks from France."',
        footer: 'Imperial Chancellery Archive, Berlin • Galerie des Glaces, Versailles',
      },
    },
    {
      id: 'lesson_2',
      skill: 'Dual-Source Utility',
      title: 'How did the Franco-Prussian War create a lasting legacy of hatred?',
      video: [
        {
          type: 'youtube',
          url: 'https://www.youtube.com/watch?v=j1Yk0lzV40Q',
          title: 'History Matters: The Franco Prussian War (Short Animated Documentary)',
          duration: '3 mins 49 secs',
          viewing_task:
            'Identify how Otto von Bismarck engineered the conflict against Napoleon III, how the German Empire was proclaimed in Versailles, and why the annexation of Alsace-Lorraine created permanent French resentment.',
          model_answer:
            'Bismarck used the Ems Dispatch to provoke Napoleon III into declaring war, uniting the southern German states with Prussia. Prussian military efficiency culminated in the catastrophic French defeat at Sedan. In January 1871, the German Empire was proclaimed in the Hall of Mirrors at Versailles, and Germany annexed the border province of Alsace-Lorraine and imposed a 5 billion franc indemnity, establishing an enduring French desire for revenge (revanche).',
        },
        {
          type: 'youtube',
          url: 'https://www.youtube.com/watch?v=xVISzFmBiPU',
          title: 'The Armchair Historian: How Prussia Ended The French Empire',
          duration: '27 mins 56 secs',
          viewing_task:
            'Observe the technological and logistical advantages of the Prussian military (Krupp breech-loading artillery, needle guns, railway mobilization) over the French Imperial Army.',
          model_answer:
            'Prussia utilised rapid railway mobilisation and a professional General Staff under Helmuth von Moltke. Prussian breech-loading Krupp steel artillery heavily outranged French bronze muzzle-loaders, allowing the Prussians to encircle and annihilate French armies at Sedan and Metz despite the superior French Chassepot rifle.',
        },
      ],
      vocab: [
        {
          term: 'Chancellor',
          definition: 'The highest official of a monarch, serving as the head of government.',
        },
        {
          term: 'Blood and Iron',
          definition:
            "Bismarck's policy of using warfare and military strength to achieve German unification.",
        },
        {
          term: 'Revanche',
          definition:
            'The deep French desire for national revenge against Germany after the humiliation of 1871.',
        },
        {
          term: 'Annexation',
          definition:
            "The forcible seizure and incorporation of another nation's territory into one's own country.",
        },
        {
          term: 'Indemnity',
          definition:
            'A massive financial penalty or fine forced upon a defeated country after a war.',
        },
        {
          term: 'Two-Front War',
          definition:
            'A devastating military conflict where a nation must fight enemies on two opposite borders at once.',
        },
        {
          term: 'North German Confederation',
          definition:
            'The military and political union of northern German states created by Prussia in 1867.',
        },
        {
          term: 'Reinsurance Treaty',
          definition:
            'A secret 1887 agreement between Germany and Russia pledging mutual neutrality if attacked.',
        },
      ],
      extended: {
        title: 'Assessment Practice: Explanatory Essay',
        question:
          "Evaluate how the change in leadership from Bismarck to Kaiser Wilhelm II fundamentally altered Germany's strategic position in Europe.",
        hints: [
          'Point 1: Bismarck’s Isolation of France — Created the Reinsurance Treaty with Russia and Triple Alliance to avoid a two-front war.',
          'Point 2: Wilhelm II’s Reckless Ambition — Dismissed Bismarck in 1890, pursued aggressive Weltpolitik, and allowed the Russian treaty to lapse.',
          'Point 3: The Franco-Russian Alliance (1894) — Pushed isolated France and Tsarist Russia together, creating the exact encirclement Bismarck feared.',
          'Point 4: The Path to 1914 — Divided Europe into two armed camps, turning local Balkan disputes into an inevitable continental clash.',
        ],
        teacher_guidance: {
          visualiser_prompt:
            "Model live under the visualiser how to write a high-tariff causation paragraph. Emphasise how Bismarck built a diplomatic safety net, and show students how Wilhelm II's erratic decision-making dismantled it piece by piece.",
          tiered_stems: [
            'Under Bismarck, Germany avoided a two-front war by...',
            'However, when Kaiser Wilhelm II took power, he fundamentally changed this policy because...',
            'Consequently, this shift destroyed Bismarck’s diplomatic safety net by...',
          ],
        },
        model_answer:
          "Bismarck's defensive web of alliances, specifically the Reinsurance Treaty with Russia, successfully isolated France and prevented a two-front war. Wilhelm II's aggressive ambition and dismissal of Bismarck led him to foolishly drop the Russian treaty, pushing Russia into an alliance with France. This completely destroyed Germany's diplomatic safety net, creating the exact 'encirclement' nightmare Bismarck had spent 20 years avoiding.",
        lines: 15,
      },
      do_now: {
        title: 'Do Now: Retrieval from Prior Learning (German Unification & Balance of Power)',
        type: 'mixed',
        items: [
          {
            question:
              'How many sovereign states formed the German Confederation established at the Congress of Vienna in 1815?',
            answer: '39 states',
          },
          {
            question:
              'What was the name of the Prussian-led customs union established in 1834 that economically united the German states while excluding Austria?',
            answer: 'The Zollverein',
          },
          {
            question:
              'Which Chancellor of Prussia declared in 1862 that the great questions of the day would be decided by "blood and iron"?',
            answer: 'Otto von Bismarck',
          },
          {
            question:
              "Which rival Great Power did the modernized Prussian army decisively defeat in the Seven Weeks' War of 1866?",
            answer: 'Austria (Austrian Empire)',
          },
          {
            question: 'What is meant by the historical diplomatic term "Balance of Power"?',
            answer:
              'An international system where military and political power is distributed roughly equally among nations, preventing any single Great Power from dominating the continent.',
          },
        ],
      },
      flashcards: [
        {
          term: 'Alsace-Lorraine',
          definition: 'A resource-rich border region taken by Germany from France in 1871.',
        },
        {
          term: 'Ems Telegram',
          definition:
            'A diplomatic message altered by Bismarck to provoke France into declaring war.',
        },
        {
          term: 'Reparations',
          definition:
            'Massive financial fines forced upon a defeated nation to pay for war damages.',
        },
        {
          term: 'Siege',
          definition:
            'A military operation where enemy forces surround a town or building, cutting off essential supplies.',
        },
      ],
      pair_share: {
        prompt:
          'Of the three penalties forced upon France in the 1871 treaty (loss of land, 5 billion franc fine, German occupation), which do you think caused the most bitter resentment, and why?',
        think: 'Jot down your choice and one strong reason to support it.',
        pair: 'Take turns explaining your choice. If you disagree, try to convince your partner!',
        share: "Be ready to report your partner's best point to the class.",
      },
      gcse_task: {
        sources: [
          {
            type: 'written',
            text: '“We must never forget the humiliation of 1871. The German Empire was proclaimed in our own Palace of Versailles, tearing away the bleeding wounds of Alsace and Lorraine. They have stolen our iron and our factories, and forced us to pay a crushing ransom of 5 billion francs. Every French child must grow up with one single thought: to rebuild our army and take back what was stolen from the motherland.”',
            title: 'Source A: Adapted from a French school textbook, published in Paris, 1885.',
          },
          {
            type: 'written',
            text: '“France will never forgive us for taking Alsace-Lorraine. The peace we have forced upon them has left a bitter resentment that will not fade. We must accept that a French war of revenge is a certainty in the future. Therefore, our entire diplomatic focus must be to ensure she never finds an ally to help her take it back. As long as France remains diplomatically isolated, particularly from Russia, Germany will remain secure.”',
            title:
              'Source B: Adapted from a private letter written by German Chancellor Otto von Bismarck to a fellow diplomat, 1872.',
          },
        ],
        topic: 'the reasons for French hatred of Germany after 1871',
        model_answer:
          '<strong>Source A is highly useful for revealing the deep, emotional humiliation felt by the French people;</strong> <strong style="color: #0284c7;">it highlights the "bleeding wounds of Alsace and Lorraine" and the desire to "take back what was stolen".</strong> <strong style="color: #9333ea;">The fact that this is a school textbook makes it incredibly useful for showing purpose: the French government was actively indoctrinating the next generation for a war of revenge, proving that the hatred was deeply embedded in French culture.</strong> <strong style="color: #16a34a;">This is supported by our contextual knowledge that France was forced to pay a crushing 5 billion franc ransom after the disastrous Franco-Prussian War of 1871, sparking a permanent desire for revanche.</strong><br><br><strong>Source B is also extremely useful because it provides the German perspective on this hostility.</strong> <strong style="color: #0284c7;">Bismarck openly acknowledges that taking Alsace-Lorraine has guaranteed a "French war of revenge" and argues that Germany must ensure France "never finds an ally".</strong> <strong style="color: #9333ea;">Because this is a private letter to a fellow diplomat, its nature makes it a highly reliable reflection of Germany\'s genuine strategic fears without any public censorship.</strong> <strong style="color: #16a34a;">This is accurate to the context, as Bismarck spent the next 20 years building a complex defensive web of alliances (such as the Dual Alliance) specifically to keep France isolated and prevent a two-front war.</strong>',
      },
      learning_objective: 'To understand Why did the Franco-Prussian War create long-term hatred?',
      learning_objectives: {
        overarching: 'To evaluate why the Franco-Prussian War created long-term hatred.',
        scaffolded: [
          'Identify the penalties forced upon France in 1871.',
          'Explain how the Ems Telegram sparked the Franco-Prussian War.',
          'Evaluate the long-term impact on European relations.',
        ],
      },
      teacher_notes: {
        primer:
          "The overarching goal of this lesson is to understand the long-term diplomatic impact of the Franco-Prussian War. The narrative goes beyond just the events of 1871. It focuses on the resulting *revanche* (French desire for revenge) and Bismarck's subsequent need to isolate France through a web of alliances. Ensure students understand that this single conflict permanently poisoned European relations, forcing the creation of the rigid alliance systems that ultimately dragged Europe into World War I.",
        objectives: [
          {
            objective: 'Identify the penalties forced upon France in 1871.',
            primer:
              "Direct students to paragraph 4. The text explicitly lists the penalties out in a clear, easy-to-spot sentence: 'The peace treaty forced three severe penalties upon France...' Because these key penalties are bolded in the text, it is a highly accessible recall task for a 14-year-old.",
            question:
              'If you were a French citizen in 1871, which of the three penalties (losing land, paying 5 billion francs, or hosting an enemy army) would make you the most angry, and why?',
          },
          {
            objective: 'Explain how the Ems Telegram sparked the Franco-Prussian War.',
            primer:
              "Focus on paragraph 2 as a chronological mini-story. Explain to students how Bismarck took a friendly message, 'carefully edited and shortened the text,' and made it look like the Prussian King had 'explicitly insulted the French government.'",
            question:
              "Bismarck didn't actually lie in the Ems Telegram; he just deleted parts of it to change the tone. Why is editing the truth sometimes more dangerous than a flat-out lie?",
          },
          {
            objective: 'Evaluate the long-term impact on European relations.',
            primer:
              "This requires higher-order thinking. The final two paragraphs explicitly guide students through this. Point out that Bismarck's 'greatest fear' was a two-front war, so he spent 20 years 'weaving a complex, dizzying web of alliances.'",
            question:
              'Bismarck created alliances to keep Germany safe, but how did these secret treaties actually make a future European war much more dangerous?',
          },
        ],
        source_context:
          'In the 1871 Franco-Prussian War, the newly formed German Empire conquered the French territories of Alsace and Lorraine. Proclaiming the German Empire inside the French royal palace of Versailles was a calculated humiliation. This fueled a burning French desire for revanche (revenge) that poisoned European diplomacy for decades. **Hinge Question:** Why might the location of this coronation guarantee future conflict between France and Germany?',
      },
      vocab_cloze_text:
        'In 1870, Chancellor Bismarck edited the [Ems Telegram] to trick France into war. After a devastating [Siege] of Paris, France was forced to pay massive [Reparations] and hand over the vital territory of [Alsace-Lorraine].',
      narrative_blocks: [
        {
          act: 1,
          title: 'Act 1: Context & Catalyst (The Spanish Vacancy & The Ems Telegram)',
          text: '<span class="para-ref">[1.1]</span> In early 1870, the vacant Spanish throne ignited a diplomatic crisis when the candidacy of Prince Leopold of Hohenzollern-Sigmaringen was proposed. French Emperor Napoleon III felt mortally threatened by the prospect of Prussian royal encirclement on both the Rhine and the Pyrenees. France demanded an unconditional Prussian pledge never to renew the candidacy.<br><br><span class="para-ref">[1.2]</span> When King Wilhelm I politely declined further concessions at the spa town of Bad Ems, Bismarck saw his opportunity. He deliberately edited the King\'s telegraphic dispatch to make the French ambassador and the Prussian monarch appear mutually insulting before releasing it to the international press. Outraged by the public snub, France declared war on 19 July 1870, walking straight into Bismarck\'s trap.<br><br><span class="para-ref">[1.3]</span> The edited telegram provoked fierce chauvinistic demonstrations across Paris and Berlin. Convinced of an easy victory and fearing domestic political collapse, French ministers rushed headlong into mobilization, while Bismarck had already mobilized German railway networks to assemble overwhelming firepower on the frontier.',
          tasks: [],
        },
        {
          act: 2,
          title: 'Act 2: Tension & Escalation (Krupp Steel, Sedan & The Fall of Paris)',
          text: '<span class="para-ref">[2.1]</span> The Prussian military machine, organized by General Helmuth von Moltke, moved with lethal speed. Utilizing six specialized railway trunk lines, the German states mobilized 380,000 troops to the frontier in eighteen days. At the decisive Battle of Sedan in September 1870, massed Krupp breech-loading artillery shattered French lines, forcing Napoleon III to surrender with 104,000 soldiers.<br><br><span class="para-ref">[2.2]</span> While the Second Empire collapsed, the newly proclaimed French Third Republic fought on with desperate defiance. German armies advanced rapidly to encircle Paris, subjecting the capital to a brutal four-month winter siege. Freezing temperatures and starvation forced Paris to capitulate in January 1871, leaving French national pride permanently traumatized.<br><br><span class="para-ref">[2.3]</span> The prolonged siege devastated Parisian civilian morale and hardened German diplomatic demands. Starving citizens consumed zoo animals and sewer vermin while Prussian shells rained onto historic monuments, instilling a profound mutual enmity that endured for generations.',
          tasks: [],
        },
        {
          act: 3,
          title: 'Act 3: Crisis & Decision (Annexation Cartography & "La Tache Noire")',
          text: '<span class="para-ref">[3.1]</span> Under the harsh terms of the 1871 Treaty of Frankfurt, victorious Germany annexed the provinces of Alsace and northern Lorraine. Beyond acquiring rich iron ore basins and textile factories, the German General Staff gained the strategic fortress cities of Metz and Strasbourg, establishing a formidable military buffer against future French counter-attacks.<br><br><span class="para-ref">[3.2]</span> For the 1.5 million annexed French citizens, German rule felt like alien military occupation. Across French schools, classroom maps systematically depicted the lost provinces shaded in mourning black—<em>la tache noire</em>. Generations of French schoolchildren were taught that their sacred patriotic duty was to prepare for revenge (<em>la revanche</em>).',
          source: {
            letter: 'A',
            title:
              'Source A (Visual Record): Albert Bettannier, La Tache Noire (The Black Spot, 1887)',
            src: '/units/great_war/assets/la_tache_noire_1887.jpg',
            caption:
              'Albert Bettannier’s iconic 1887 oil painting (Musée d’Orsay) depicting a French schoolmaster in a black coat pointing with a wooden pointer to the blacked-out region of Alsace-Lorraine on a classroom map of France, instructing a young pupil in a cadet uniform.',
            citation:
              "Albert Bettannier, La Tache Noire (The Black Spot), 1887, Oil on canvas, Musée d'Orsay, Paris",
            context:
              'Painted sixteen years after the war, this image shows how French schools systematically prepared a generation of young boys for a war of revenge to liberate their lost provinces. **Hinge Question:** How does Bettannier use the classroom setting to prove that the Franco-Prussian War of 1871 had not truly ended?',
            shelfmark: "Musée d'Orsay RF 1982-53",
          },
          tasks: [],
        },
        {
          act: 4,
          title: 'Act 4: Consequence & Legacy (The Historical Verdict: The Legacy of Hatred)',
          text: '<span class="para-ref">[4.1]</span> Military historians argue that annexing Alsace-Lorraine was Bismarck\'s greatest strategic blunder. While it provided a defensible frontier, it poisoned Franco-German relations for over forty years. Bismarck himself privately acknowledged that seizing French-speaking Metz would permanently alienate France, but bowed to pressure from Field Marshal Moltke and Prussian generals.<br><br><span class="para-ref">[4.2]</span> The annexation transformed European diplomacy into a zero-sum contest. France could never forgive the loss of its territorial integrity, forcing Germany into continuous diplomatic acrobatics to keep Paris isolated. The bitter legacy of 1871 guaranteed that any future European crisis would inevitably pull France and Germany into catastrophic conflict.',
          tasks: [],
        },
      ],
      quiz: [
        {
          q: 'Who was the Chancellor of Prussia that orchestrated the Franco-Prussian War?',
          a: 'Otto von Bismarck',
          options: [
            'Kaiser Wilhelm II',
            'Count von Schlieffen',
            'Napoleon III',
            'Otto von Bismarck',
          ],
        },
        {
          q: 'Which telegram did Bismarck edit to provoke France into war?',
          a: 'Ems Telegram',
          options: ['Zimmermann Telegram', 'Blank Cheque', 'Ems Telegram', 'Versailles Dispatch'],
        },
        {
          q: 'In what year did the Franco-Prussian War break out?',
          a: '1870',
          options: ['1914', '1870', '1871', '1890'],
        },
        {
          q: 'Which two provinces were taken from France in the peace settlement?',
          a: 'Alsace and Lorraine',
          options: [
            'Alsace and Lorraine',
            'Ruhr and Saar',
            'Normandy and Brittany',
            'Rhineland and Bavaria',
          ],
        },
        {
          q: 'Where was the German Empire proclaimed in 1871, humiliating the French?',
          a: 'Palace of Versailles',
          options: ['Palace of Versailles', 'Reichstag Building', 'Notre Dame', 'Berlin Palace'],
        },
        {
          q: 'What was the size of the war indemnity France was forced to pay?',
          a: '5 billion francs',
          options: [
            '6.6 billion pounds',
            '5 billion francs',
            '132 billion gold marks',
            '1 billion marks',
          ],
        },
        {
          q: 'Who became the new German Emperor in 1888 and dismissed Bismarck?',
          a: 'Kaiser Wilhelm II',
          options: ['Kaiser Wilhelm I', 'Franz Joseph', 'Tsar Nicholas II', 'Kaiser Wilhelm II'],
        },
        {
          q: 'What secret treaty did Bismarck sign with Russia that Wilhelm II allowed to expire?',
          a: 'Reinsurance Treaty',
          options: [
            'Treaty of London',
            'Dual Alliance',
            'Reinsurance Treaty',
            'Treaty of Frankfurt',
          ],
        },
        {
          q: "Which country allied with Russia in 1894 after Bismarck's dismissal?",
          a: 'France',
          options: ['France', 'Britain', 'Austria-Hungary', 'Italy'],
        },
        {
          q: "What was Germany's greatest fear that drove its military planning?",
          a: 'A two-front war',
          options: [
            'An Italian invasion',
            'A two-front war',
            'A socialist revolution',
            'A naval blockade',
          ],
        },
        {
          q: 'What was the name of the German military plan created to defeat France quickly?',
          a: 'Schlieffen Plan',
          options: ['Bismarck Plan', 'Moltke Offensive', 'Plan XVII', 'Schlieffen Plan'],
        },
        {
          q: 'Which French leader was captured at the Battle of Sedan?',
          a: 'Napoleon III',
          options: ['Georges Clemenceau', 'Louis XVI', 'Napoleon III', 'Charles de Gaulle'],
        },
        {
          q: 'What was the primary goal of Bismarck in defeating France?',
          a: 'To unify the southern German states with the north',
          options: [
            'To unify the southern German states with the north',
            'To conquer Paris permanently',
            'To steal French gold',
            'To crown himself Emperor',
          ],
        },
        {
          q: 'Which French territory was annexed by Germany, creating lasting resentment?',
          a: 'Alsace-Lorraine',
          options: ['Normandy', 'Burgundy', 'The Rhineland', 'Alsace-Lorraine'],
        },
        {
          q: 'Who was the Prussian King that was crowned German Emperor?',
          a: 'Wilhelm I',
          options: ['Wilhelm II', 'Frederick the Great', 'Wilhelm I', 'Bismarck'],
        },
        {
          q: 'What event did Bismarck use to trick France into declaring war?',
          a: 'Editing the Ems Telegram',
          options: [
            'Assassinating a French minister',
            'Editing the Ems Telegram',
            'Invading a border town',
            'Sinking a French ship',
          ],
        },
        {
          q: 'What happened to Napoleon III at the Battle of Sedan?',
          a: 'He was captured along with his army',
          options: [
            'He was killed in combat',
            'He successfully escaped to Britain',
            'He was captured along with his army',
            'He defeated the Prussians',
          ],
        },
        {
          q: 'What treaty formally ended the Franco-Prussian War?',
          a: 'Treaty of Frankfurt',
          options: [
            'Treaty of Versailles',
            'Treaty of Paris',
            'Treaty of Berlin',
            'Treaty of Frankfurt',
          ],
        },
        {
          q: 'Why did Bismarck fear a French alliance with Russia?',
          a: 'It would force Germany into a two-front war',
          options: [
            'It would force Germany into a two-front war',
            'Russia had a stronger navy',
            'France would buy Russian weapons',
            'It would stop German trade',
          ],
        },
        {
          q: 'Where exactly was the new German Empire proclaimed?',
          a: 'The Hall of Mirrors at Versailles',
          options: [
            'The Reichstag in Berlin',
            'The Hall of Mirrors at Versailles',
            'Notre Dame Cathedral',
            'The Louvre',
          ],
        },
      ],
      prologue:
        'In the sunny summer of 1870, Europe appeared at tranquil peace. Six months later, the French Second Empire had collapsed, two million starving Parisians had eaten their own zoo animals under siege, and the German Empire was proclaimed inside the sacred palace of French royalty. How did six months of catastrophic warfare forge a legacy of hatred that would poison an entire continent for over forty years?',
      tasks: [
        {
          type: 'two_sided_argument',
          topic:
            'Task 3: Forensic Source Interrogation — French Grief vs German Military Rationale',
          question:
            'How do French emotional grief and German military calculation reveal why the annexation of Alsace-Lorraine made lasting peace impossible?',
          instruction:
            'Examine both perspectives on the 1871 annexation: Albert Bettannier’s "La Tache Noire" (Source A) vs Bismarck’s defensive dispatch (Source B):',
          advancement: {
            title: 'Source A: French National Mourning & Revanche (Bettannier)',
            points: [
              'Classroom maps displayed Alsace-Lorraine shaded black in national mourning, visible to every pupil.',
              'French schoolboys were drilled in rifle handling and gymnastics, taught that winning back the provinces was a sacred duty.',
              'Created an irreconcilable emotional wound, ensuring French public opinion would never accept permanent German rule.',
            ],
            starter:
              'Source A is valuable for revealing the deep emotional trauma and cultivated culture of revanche in French society, because...',
          },
          limitations: {
            title: 'Source B: Prussian Military Strategy & Defensive Glacis (Bismarck)',
            points: [
              'Prussian generals insisted on holding the fortress of Metz as an indispensable defensive shield against French invasion.',
              'Deprived France of 1.5 million people and 80% of its domestic iron ore, attempting to cripple France as a military threat.',
              'Bismarck treated the territory as a strategic buffer rather than an act of aggression, prioritizing military geography over reconciliation.',
            ],
            starter:
              'In contrast, Source B is valuable for understanding cold Prussian military calculation, showing that...',
          },
          synthesis_prompt:
            'Evaluate how Sources A and B together demonstrate that the annexation made lasting European peace impossible.',
          synthesis_connectives: [
            'Source A demonstrates...',
            'In contrast, Source B exposes...',
            'Taken together, both sources reveal...',
            'Consequently...',
            'Ultimately, this proves that...',
          ],
          model_answer:
            'Taken together, Sources A and B explain why lasting Franco-German peace became impossible after 1871. Source A captures the profound emotional trauma of the French nation, where generations of schoolboys were systematically conditioned through "La Tache Noire" to prepare for revanche (revenge). Conversely, Source B reveals the unyielding military calculation of Berlin, where Bismarck and Prussian generals prioritized tactical geography—holding Metz as a defensive glacis—over political reconciliation. By creating a physical border shield at the cost of creating an incurable national enemy, the annexation locked both empires into permanent mutual terror, directly paving the way for the 1894 Franco-Russian Alliance and the two-front crisis of 1914.',
        },
        {
          type: 'extended_writing',
          topic: 'Task 4: Extended Writing — Dual-Source Utility Evaluation',
          question:
            'How useful are Sources A and B for an enquiry into why the annexation of Alsace-Lorraine made lasting peace impossible?',
          hints: [
            'Point: Source A is exceptionally useful for revealing the emotional atmosphere of revanche and patriotic indoctrination in post-1871 France.',
            'Evidence: Bettannier’s "La Tache Noire" depicts a French schoolmaster pointing to the black-shaded lost provinces, while students are drilled in patriotic duty.',
            'Point: Source B is equally valuable for demonstrating German strategic calculations and fear of French invasion.',
            'Evidence: Bismarck explicitly justifies the annexation not for imperial expansion, but as a "defensive glacis and shield" anchored on border fortresses like Metz.',
            'Synthesis: Together, both sources provide a comprehensive insight into why peace failed: Germany’s search for military security created France’s permanent thirst for vengeance.',
          ],
          model_answer:
            'Sources A and B are exceptionally useful when evaluated together for an enquiry into why the annexation of Alsace-Lorraine made lasting European peace impossible. Source A—Albert Bettannier’s 1887 painting "La Tache Noire"—is profoundly valuable for understanding French domestic sentiment and the institutionalization of revanche (revenge). Created during the height of Third Republic patriotic education, it vividly depicts schoolboys being taught that reclaiming the black-shaded provinces was their sacred patriotic duty, demonstrating how an entire generation was culturally conditioned for future conflict. However, Source A reflects artistic and patriotic propaganda, focusing purely on emotional grief rather than diplomatic reality. In contrast, Source B provides the indispensable German strategic rationale: Bismarck’s 1871 dispatch proves that Prussian high command annexed Alsace and northern Lorraine as a cold, calculated "defensive glacis and shield" to protect the Rhineland against centuries of French invasion. Its limitation lies in downplaying the political catastrophe of seizing 1.5 million unwilling French citizens. Combined, the sources reveal the fatal paradox identified by historian Gordon Craig: Germany’s pursuit of tactical military borders rendered diplomatic peace with France impossible, ensuring France would seek allies at all costs and polarize Europe into two armed camps.',
        },
      ],
      key_figure: {
        name: 'Field Marshal Helmuth von Moltke (The Elder)',
        lifespan: '1800–1891',
        role: 'Chief of the Prussian & German Great General Staff (1857–1888)',
        significance:
          'Pioneered modern staff planning, mobilization via military railways, and telegram communication to encircle French armies at Sedan.',
        actions: [
          'Transformed the Prussian General Staff into the world’s most formidable military planning organization.',
          'Exploited Prussian Krupp breech-loading steel artillery to annihilate French Emperor Napoleon III’s army at Sedan (September 1870).',
          'Warned in his final Reichstag speech in 1890 that the next European war could last seven or thirty years, bringing total ruin.',
        ],
        image: '/images/helmuth_von_moltke_elder.jpg',
      },
      concept_spotlight: {
        tag: 'HISTORICAL SPOTLIGHT: THE OPEN WOUND',
        category: 'TERRITORIAL CONFLICT • 1871–1914',
        title: 'Alsace-Lorraine: The Open Wound of French Revanchism',
        body: 'Under the Treaty of Frankfurt (May 1871), Germany annexed the French border provinces of Alsace and northern Lorraine, alongside a punishing indemnity of five billion gold francs. While Prussian generals insisted on the territory as a protective defensive glacis against future French invasions, the annexation poisoned European diplomacy for forty-three years. In French classrooms, maps showed the lost provinces shaded in mourning black (la tache noire), and generation after generation of French schoolchildren were taught: "Think of it always, speak of it never."',
        takeaway:
          'Annexing Alsace-Lorraine guaranteed that France would never permanently accept peace with Germany, forcing German planners into permanent two-front war anxieties.',
      },
      archival_dispatch: {
        badge: 'ARCHIVAL DISPATCH',
        type: 'French Primary School Primer',
        date: 'Circa 1887',
        title: 'Excerpt from G. Bruno’s "Le Tour de la France par deux enfants"',
        body: '"Do you see those two provinces shaded across the Rhine? They are Alsace and Lorraine, torn violently from our motherland. Never forget our brothers who weep under the Prussian helmet. Work, study, and grow strong so that one day justice and the tricolour shall return to Metz and Strasbourg."',
        footer: 'Bibliothèque Nationale de France • Paris Primary Education Curriculum',
      },
    },
    {
      id: 'lesson_3',
      skill: 'Historical Interpretations',
      title: "To what extent did the 'Scramble for Africa' increase tension in Europe?",
      vocab: [
        {
          term: 'Imperialism',
          definition:
            "The policy of extending a nation's rule over foreign countries by military force or diplomacy.",
        },
        {
          term: 'Scramble for Africa',
          definition:
            'The rapid invasion, division, and colonisation of Africa by European powers between 1881 and 1914.',
        },
        {
          term: 'Weltpolitik',
          definition:
            "Kaiser Wilhelm II's aggressive foreign policy to transform Germany into a dominant global superpower.",
        },
        {
          term: 'Place in the Sun',
          definition:
            "Bernhard von Bülow's phrase demanding a vast overseas empire and international respect for Germany.",
        },
        {
          term: 'Entente Cordiale',
          definition:
            'The 1904 diplomatic agreement between Britain and France settling colonial disputes and creating friendship.',
        },
        {
          term: 'Algeciras Conference',
          definition:
            'The 1906 international meeting where European powers backed France, humiliating Germany.',
        },
        {
          term: 'Agadir Crisis',
          definition:
            'The 1911 standoff where Germany sent the gunboat Panther to Morocco, alarming Britain and France.',
        },
        {
          term: 'Gunboat Diplomacy',
          definition:
            'The pursuit of foreign policy goals through conspicuous displays of naval military power.',
        },
        {
          term: 'Berlin Conference',
          definition:
            'The 1884 meeting where European leaders partitioned Africa without consulting any Africans.',
        },
        {
          term: 'Congo Free State',
          definition:
            'A huge Central African territory brutally exploited under King Leopold II of Belgium.',
        },
      ],
      extended: {
        question:
          "Explain why Kaiser Wilhelm's strategy of testing the Entente Cordiale during the Moroccan Crises was a massive strategic failure for Germany.",
        model_answer:
          'Wilhelm II attempted to test and break the new Entente Cordiale by interfering in French-controlled Morocco. However, his aggressive posturing (such as sending a gunboat in 1911) backfired completely; it convinced Britain that Germany was a genuine military threat, driving Britain and France into a much closer, formal military alliance against Germany.',
      },
      do_now: {
        type: 'questions',
        items: [
          {
            question: '1. Who was the first Emperor of the newly unified Germany in 1871?',
            answer: 'Kaiser Wilhelm I',
          },
          {
            question: '2. Which brilliant Chancellor united the German states?',
            answer: 'Otto von Bismarck',
          },
          {
            question: '3. Which country was humiliatingly defeated in the Franco-Prussian War?',
            answer: 'France',
          },
          {
            question: '4. What strategic border territory did Germany take in 1871?',
            answer: 'Alsace-Lorraine',
          },
          {
            question: '5. What is the French word for their desire for revenge?',
            answer: 'Revanche',
          },
          {
            question: '6. Explain how Bismarck used the Ems Telegram to trap France into a war.',
            answer:
              "He edited the King's telegram to make it look like an insult to the French ambassador, forcing France to declare war out of pride.",
          },
          {
            question: '7. Detail the two military advantages the Prussian army possessed.',
            answer:
              'Advanced railway networks for rapid mobilization and superior Krupp steel artillery.',
          },
          {
            question:
              "8. Why was the location of the German Empire's proclamation so humiliating for France?",
            answer:
              'It took place in the Hall of Mirrors at the Palace of Versailles, the historic heart of French royalty.',
          },
          {
            question: '9. Why did Bismarck weave a complex web of secret alliances after 1871?',
            answer:
              'To keep France diplomatically isolated so they could never find an ally to help them fight a revenge war.',
          },
          {
            question: "10. What was Bismarck's ultimate nightmare scenario?",
            answer: 'A two-front war against both France and Russia simultaneously.',
          },
        ],
      },
      flashcards: [
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
      ],
      pair_share: {
        prompt:
          "If you were a British politician in 1897, would you view Kaiser Wilhelm's 'Place in the Sun' speech as a direct threat, or just a young leader showing off? Why?",
        think: 'Jot down your view and one piece of evidence.',
        pair: 'Discuss your views. Did your partner point out anything you missed?',
        share: 'Be ready to share whether your partner changed your mind.',
      },
      gcse_task: {
        sources: [
          {
            type: 'visual',
            src: '/units/great_war/assets/was_greedy_boy.png',
            title:
              "Source A: Source A: 'The Greedy Boy', a British political cartoon published in 1885 showing German Chancellor Otto von Bismarck.",
          },
          {
            type: 'written',
            text: '“We do not want to put anyone in the shade, but we too demand our place in the sun.”',
            title:
              'Source B: Speech by German Foreign Minister Bernhard von Bülow to the Reichstag, 1897.',
          },
        ],
        topic: 'the impact of Weltpolitik on international relations',
        model_answer:
          '<strong>Source A is useful for showing the British perception of Weltpolitik as aggressive and threatening;</strong> <strong style="color: #0284c7;">the cartoon depicts Chancellor Bismarck greedily carving up colonial territories, mocking Germany\'s aggressive desire for a larger empire.</strong> <strong style="color: #9333ea;">As a satirical British cartoon, its purpose is to influence public opinion by exaggerating the Kaiser\'s arrogance, which accurately reflects the growing anti-German anxiety among the British public.</strong> <strong style="color: #16a34a;">This is supported by the context of the Moroccan Crises (1905 and 1911), where Wilhelm\'s aggressive posturing in Africa actually backfired and drove Britain into a closer military alliance with France.</strong><br><br><strong>Source B is highly useful for understanding the genuine German intent behind Weltpolitik.</strong> <strong style="color: #0284c7;">The Chancellor demands Germany\'s "place in the sun", openly declaring their ambition to build a massive overseas empire.</strong> <strong style="color: #9333ea;">As a public speech to the Reichstag, its purpose is to rally domestic nationalist support and justify increased military spending to the German politicians.</strong> <strong style="color: #16a34a;">We know from context that Kaiser Wilhelm II was deeply jealous of the British Empire and believed that for Germany to be a true \'World Power\', it needed vast African colonies, which directly triggered the imperial rivalry that destabilised Europe.</strong>',
      },
      learning_objective:
        'To understand Why did the scramble for colonies turn empires into rivals?',
      learning_objectives: {
        overarching: 'To evaluate why the scramble for colonies turned empires into rivals.',
        scaffolded: [
          'Identify the main European colonial powers and their territories.',
          "Explain how Kaiser Wilhelm II's 'Place in the Sun' policy threatened Britain.",
          'Evaluate the impact of the Moroccan Crises on the Entente Cordiale.',
        ],
      },
      teacher_notes: {
        primer:
          "The overarching goal of this lesson is to evaluate why the scramble for colonies turned empires into rivals. Ensure students understand that this wasn't just about claiming land; it was an economic race for raw materials and a strategic naval race. The Moroccan Crises serve as the key case study of how Germany's aggressive attempts to break up the British-French alliance actually pushed them closer together.",
        objectives: [
          {
            objective: 'Identify the main European colonial powers and their territories.',
            primer:
              "Direct students to paragraphs 1, 2, and 4. Have them identify Britain (largest empire, open sea routes, Suez Canal), France (North/West Africa), and Germany's late entry (Cameroons, East Africa).",
            question:
              'If you were the British Prime Minister looking at a map, why would Germany suddenly claiming colonies in Africa make you incredibly nervous about your own empire?',
          },
          {
            objective:
              "Explain how Kaiser Wilhelm II's 'Place in the Sun' policy threatened Britain.",
            primer:
              "Focus on paragraph 3 and 4. Emphasize that Germany wasn't just claiming land; they were building a 'massive battle fleet' to defend it, which directly threatened Britain's naval supremacy and survival as an island nation.",
            question:
              "Germany claimed they had a 'legitimate right to historical greatness.' Why did Britain see this exact same ambition as an aggressive threat?",
          },
          {
            objective: 'Evaluate the impact of the Moroccan Crises on the Entente Cordiale.',
            primer:
              "Read paragraphs 5, 6, and 7 as a story of a gamble gone wrong. The Kaiser tried to break the friendship between Britain and France by causing a crisis in Morocco. The key takeaway is that his 'gunboat diplomacy' backfired, pushing Britain and France into a 'much tighter military partnership.'",
            question:
              "Kaiser Wilhelm gambled that Britain wouldn't risk war to help France in Morocco. Why did his gamble actually make the alliance against Germany much stronger?",
          },
        ],
        source_context:
          'This cartoon references the 1884-85 Berlin Conference where Bismarck helped orchestrate the "Scramble for Africa". Britain, long the dominant global empire, felt deeply threatened by Germany\'s sudden, aggressive expansion into Africa and the Pacific (Weltpolitik), fearing it would disrupt their economic dominance. **Hinge Question:** How does this cartoon reflect the fundamental cause of the Anglo-German naval race?',
      },
      vocab_cloze_text:
        'In the late 19th century, European powers engaged in a [Scramble for Africa]. This fierce [Imperialism] was driven by a desire for raw materials and global prestige. Every major power wanted to build a vast overseas [Empire] by taking control of another [Colony].',
      video: [
        {
          type: 'youtube',
          url: 'https://www.youtube.com/watch?v=0SEgckAL-xc',
          title: 'Powder Keg: Europe 1900 to 1914 | Historical Documentary | Lucasfilm',
          duration: '26 mins 6 secs',
          viewing_task:
            'Watch this documentary to understand the intense imperial and naval rivalries in Europe leading up to 1914. Note down two examples of how European empires aggressively competed for power.',
          model_answer:
            "European empires competed fiercely for global dominance. Two examples include: the 'Scramble for Africa', where nations like Britain, France, and Germany rushed to claim colonies for resources; and the Naval Arms Race, where Germany aggressively expanded its battle fleet to challenge British maritime supremacy.",
        },
        {
          type: 'youtube',
          url: 'https://www.youtube.com/watch?v=efV3uZqc3so',
          title:
            '80 The Scramble for Africa Explained: Imperialism, Empire, and the Road to World War I',
          duration: '12 mins 49 secs',
          viewing_task:
            'Note down how the industrial revolution pushed European nations to scramble for African colonies.',
          model_answer:
            'The industrial revolution required massive amounts of raw materials and new markets. The Scramble for Africa allowed European powers to extract resources cheaply and sell manufactured goods back, rapidly increasing imperial wealth and military power.',
        },
        {
          type: 'youtube',
          url: 'https://www.youtube.com/watch?v=DduN1cU2p9U',
          title: "What was the 'Scramble for Africa'? - BBC What's New",
          duration: '3 mins 0 secs',
          viewing_task:
            'Watch this short BBC clip and summarize how the Berlin Conference formalized the division of Africa.',
          model_answer:
            'At the 1884 Berlin Conference, European leaders literally drew lines on a map of Africa, dividing the continent among themselves to prevent war between their empires. No African leaders were invited or consulted.',
        },
      ],
      narrative_blocks: [
        {
          act: 1,
          title: 'Act 1: Context & Catalyst (The 1884 Berlin Conference & Late Arrival)',
          text: '<span class="para-ref">[1.1]</span> Between 1881 and 1914, European imperial powers engaged in a frantic race to carve up the African continent, known as the "Scramble for Africa". Seeking rubber, copper, cotton, and captive markets, European nations expanded their colonial control from ten percent of Africa to over ninety percent in barely three decades.<br><br><span class="para-ref">[1.2]</span> To prevent imperial rivalry from sparking European wars, Chancellor Bismarck hosted the 1884–85 Berlin Conference. Fourteen European nations established the principle of "effective occupation", requiring powers to demonstrate administrative control before claiming territory. However, having unified late in 1871, Germany received only disconnected territories in South-West Africa, Cameroon, and Tanganyika.<br><br><span class="para-ref">[1.3]</span> The arbitrary borders drawn across maps of Africa ignored established ethnic and linguistic communities, locking indigenous populations into colonial exploitation. Meanwhile, German colonial enthusiasts grew increasingly resentful that Britain and France held the most fertile and strategically vital territories across the continent.',
          source: {
            letter: 'A',
            title: 'Source A (Cartographic Record): The Partition of Africa by 1914',
            image: '/units/great_war/assets/map_lesson2.png',
            caption:
              'Map showing how European imperial powers divided the African continent by 1914, with Britain and France holding the largest territories.',
            citation: 'Royal Geographical Society Map Collection.',
            context:
              'At the 1884–85 Berlin Conference, European powers carved up Africa to exploit its rubber, gold, and mineral wealth. Germany arrived late and acquired only marginal colonies, fueling Kaiser Wilhelm II’s demands for a "place in the sun".',
            hinge_question:
              'Did the Scramble for Africa relieve European tensions by providing a distant colonial outlet, or did it export European national rivalries across the globe?',
          },
          tasks: [],
        },
        {
          act: 2,
          title: 'Act 2: Tension & Escalation (Wilhelm II, Weltpolitik & "A Place in the Sun")',
          text: '<span class="para-ref">[2.1]</span> In 1890, Kaiser Wilhelm II dismissed Bismarck and abandoned cautious continental diplomacy in favour of <em>Weltpolitik</em> (World Policy). Wilhelm believed that Germany\'s booming industrial strength and demographic growth entitled it to global imperial status, demanding for Germany its rightful "place in the sun".<br><br><span class="para-ref">[2.2]</span> Wilhelm\'s aggressive colonial ambitions directly alarmed Britain and France. Britain viewed German colonial overtures as threats to vital sea routes to India, while France fiercely protected its North African sphere of influence. Rather than winning international prestige, German diplomatic bullying fostered deep international suspicion and colonial friction.<br><br><span class="para-ref">[2.3]</span> German attempts to challenge French hegemony in North Africa through aggressive theatrical diplomacy backfired. Rather than isolating France, German saber-rattling convinced British foreign ministers that Germany was an unpredictable imperial rival determined to dismantle established international treaties.',
          tasks: [],
        },
        {
          act: 3,
          title: 'Act 3: Crisis & Decision (The First Moroccan Crisis: Tangier (1905))',
          text: '<span class="para-ref">[3.1]</span> In March 1905, Kaiser Wilhelm II staged a provocative intervention in Tangier, riding through the streets on a white horse to declare support for Moroccan independence. His strategic objective was to test and humiliate the newly signed 1904 Anglo-French Entente Cordiale, expecting Britain to abandon France during a colonial dispute.<br><br><span class="para-ref">[3.2]</span> The gambit proved an unmitigated disaster for Berlin. At the 1906 Algeciras Conference, only Austria-Hungary supported the German position. Britain stood resolutely beside France, while British and French military staffs quietly initiated secret joint planning talks, tightening the very alliance Germany sought to destroy.',
          source: {
            letter: 'B',
            title: 'Source B (Visual Record): Gunboat Diplomacy: The SMS Panther at Agadir (1911)',
            image: '/units/great_war/assets/map_lesson2_b.png',
            caption:
              'Map detail and record of the colonial flashpoints in North Africa where German gunboat diplomacy challenged French control.',
            citation: 'Imperial German Naval Command, Agadir Mission Photographic Record.',
            context:
              'Twice (in 1905 at Tangier and 1911 at Agadir), Germany provoked international crises in Morocco to test the Anglo-French Entente, but succeeded only in driving Britain and France into closer military coordination.',
            hinge_question:
              'Why did Britain view Germany’s naval presence in Morocco as an unacceptable threat to British maritime supremacy?',
          },
          tasks: [],
        },
        {
          act: 4,
          title: 'Act 4: Consequence & Legacy (The Second Moroccan Crisis: Agadir (1911))',
          text: '<span class="para-ref">[4.1]</span> In July 1911, imperial tensions erupted again when Germany dispatched the gunboat <em>SMS Panther</em> to the Moroccan port of Agadir, ostensibly to protect German commercial interests after French troops occupied Fez. Germany demanded the entire French Congo in compensation for recognizing a French protectorate in Morocco.<br><br><span class="para-ref">[4.2]</span> Britain reacted with decisive fury. Chancellor David Lloyd George delivered his famous Mansion House speech, warning that Britain would fight rather than see its allies bullied. Humiliated, Germany backed down in exchange for slivers of marshland, leaving the German public bitter, isolated, and increasingly convinced that only military force could secure Germany\'s global destiny.',
          tasks: [],
        },
      ],
      quiz: [
        {
          q: 'What term describes the rapid colonization of Africa by European powers in the late 19th century?',
          a: 'The Scramble for Africa',
          options: [
            'The Great Game',
            'The Scramble for Africa',
            'Manifest Destiny',
            'The African Partition',
          ],
        },
        {
          q: "Which German leader famously stated that Germany wanted its 'place in the sun'?",
          a: 'Kaiser Wilhelm II',
          options: [
            'Kaiser Wilhelm II',
            'Otto von Bismarck',
            'Adolf Hitler',
            'Paul von Hindenburg',
          ],
        },
        {
          q: 'In which year did the First Moroccan Crisis occur?',
          a: '1905',
          options: ['1911', '1898', '1905', '1914'],
        },
        {
          q: 'What was the purpose of the 1884 Berlin Conference?',
          a: 'To regulate European colonization and trade in Africa',
          options: [
            'To form a military alliance against Britain',
            'To ban slavery worldwide',
            'To divide Asia among European powers',
            'To regulate European colonization and trade in Africa',
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
            'He wanted a holiday home in Africa',
            'He wanted to conquer South America',
            'He wanted Germany to have a global empire like Britain and France',
          ],
        },
        {
          q: 'What happened during the First Moroccan Crisis (1905)?',
          a: 'The Kaiser visited Tangier and declared support for Moroccan independence',
          options: [
            'France surrendered Morocco to Britain',
            'The Kaiser visited Tangier and declared support for Moroccan independence',
            'The local sultan defeated the French army',
            'Germany invaded Morocco',
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
            'France declared war on Germany',
            'Germany sent the gunboat Panther to the port of Agadir',
            'Britain blockaded the Moroccan coast',
            'Moroccans attacked German tourists',
          ],
        },
        {
          q: 'How did the Agadir Crisis end?',
          a: 'Germany backed down after being given a small strip of the Congo',
          options: [
            'Germany backed down after being given a small strip of the Congo',
            'Germany successfully conquered Morocco',
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
            'It pushed Britain and France closer together in a strong alliance',
            'It led to Britain abandoning its empire',
          ],
        },
      ],
      prologue:
        'In the late nineteenth century, Chancellor Otto von Bismarck famously dismissed imperial expansion, declaring that his map of Africa lay in Europe. Yet by 1905, the impetuous young Kaiser Wilhelm II was galloping a bad-tempered white stallion through Tangier to challenge French colonial dominance. Did the scramble for overseas empires drive European powers to the brink of war, or did it merely mirror existing continental rivalries?',
      tasks: [
        {
          type: 'two_sided_argument',
          topic:
            'Task 3: Historiographical Analysis — View A (Economic Greed) vs View B (National Status)',
          question:
            'Which interpretation gives a more convincing explanation of why European powers clashed over Africa: economic greed or national prestige?',
          instruction:
            'Evaluate both historical perspectives on the causes of imperial conflict during the Scramble for Africa:',
          advancement: {
            title: 'Interpretation 1: View A (Economic Greed & Resource Clashes)',
            points: [
              'European industrial factories desperately required raw materials (rubber, copper, cotton, palm oil) that Europe could not produce.',
              'European factory owners and trading firms pressured governments to establish closed imperial monopolies over overseas mineral wealth.',
              'Imperial disputes in Morocco and southern Africa were driven by fierce commercial competition over mining concessions and trading rights.',
            ],
            starter:
              'Proponents of View A argue that imperial rivalry was fundamentally driven by commercial and industrial greed, because...',
          },
          limitations: {
            title: 'Interpretation 2: View B (National Status, Pride & Diplomacy)',
            points: [
              'Most colonies cost far more to garrison and govern than they ever yielded in trade or raw material profits.',
              'For Kaiser Wilhelm II, demanding a "place in the sun" was about national pride and proving Germany was a respected world superpower.',
              'Imperial confrontations (such as Tangier 1905 and Agadir 1911) were diplomatic power-plays designed to test and break rival European alliances.',
            ],
            starter:
              'Conversely, advocates of View B argue that imperial clashes were primarily matters of national prestige and Great Power diplomacy, because...',
          },
          synthesis_prompt:
            'Judge which historical interpretation offers a more convincing explanation of imperial rivalry.',
          synthesis_connectives: [
            'While View A correctly identifies...',
            'Nevertheless, View B offers a more persuasive argument because...',
            'Evidence demonstrates that most German colonies...',
            'Furthermore, the Moroccan crises were...',
            'In conclusion, imperial tension was primarily...',
          ],
          model_answer:
            'While View A correctly identifies that the Industrial Revolution created an insatiable demand for rubber, oil, and mineral wealth, View B offers a significantly more convincing explanation for why Great Powers clashed over Africa. As economic historians have proven, most African colonies—especially Germany\'s territories in South-West Africa and Togoland—represented immense financial liabilities that cost far more to administer than they ever returned in trade. The driving engine of imperialism was political prestige and diplomatic posturing. Kaiser Wilhelm II’s aggressive Weltpolitik was explicitly designed to secure Germany\'s "place in the sun" as a global superpower, and his provocative challenges in Morocco were diplomatic tests aimed at shattering the Anglo-French Entente. Therefore, national status and imperial pride were far more influential than financial profit.',
        },
        {
          type: 'extended_writing',
          topic: 'Task 4: Extended Writing — Evaluating Historical Interpretations',
          question:
            'Which interpretation gives a more convincing explanation of why European powers clashed over Africa between 1884 and 1911?',
          hints: [
            'Point: View A provides a persuasive materialist explanation, showing that industrialization forced European nations to secure raw materials and captive export markets.',
            'Evidence: Factory economies in Britain, France, and Germany depended upon overseas supplies of rubber, copper, cotton, and palm oil, sparking intense commercial rivalry.',
            'Point: View B provides a compelling diplomatic and psychological explanation, demonstrating that imperial expansion was driven by national prestige and Great Power rivalry.',
            'Evidence: Kaiser Wilhelm II demanded a "place in the sun" to validate German status; his theatrical interventions at Tangier (1905) and Agadir (1911) were diplomatic probes to test the Anglo-French Entente.',
            'Verdict: Judge which view is more convincing, noting that most African colonies ran at a heavy financial loss, proving that national status outweighed economic return.',
          ],
          model_answer:
            'When evaluating the causes of imperial conflict between 1884 and 1911, View B (National Status, Pride & Diplomacy) provides a far more convincing explanation than View A (Economic Greed & Resource Clashes). View A offers valuable context: the rapid expansion of European manufacturing after 1870 created an undeniable appetite for raw materials like rubber, copper, and petroleum, leading industrialists to lobby for protected overseas markets. However, the economic argument fails to explain why governments expended vast military resources on territories of negligible financial value. As historical balance sheets demonstrate, Germany’s African empire absorbed substantial taxpayer subsidies while generating less than one percent of total German foreign trade. Instead, as View B demonstrates, imperialism was an arena of competitive nationalism and diplomatic brinkmanship. For Kaiser Wilhelm II, pursuing Weltpolitik and demanding a "place in the sun" was driven by dynastic insecurity and a desperate desire for international recognition. When the Kaiser rode into Tangier in 1905 or dispatched the gunboat Panther to Agadir in 1911, his objective was not commercial mining rights, but testing the solidarity of the 1904 Anglo-French Entente Cordiale. Because these clashes consistently arose from prestige and great power diplomacy rather than balance-sheet economics, View B is the superior historical interpretation.',
        },
      ],
      key_figure: {
        name: 'Kaiser Wilhelm II',
        lifespan: '1859–1941',
        role: 'German Emperor & King of Prussia (Reigned 1888–1918)',
        significance:
          'Dismissed Bismarck in 1890, abandoned cautious continental diplomacy, and aggressively pursued global empire (Weltpolitik) and naval expansion.',
        actions: [
          'Demanded for Germany a "place in the sun" (Platz an der Sonne) commensurate with its booming industrial strength.',
          'Sparked the First Moroccan Crisis (1905) by riding through Tangier on a white stallion to challenge French imperial hegemony.',
          'Dispatched the gunboat SMS Panther to Agadir in 1911, provoking British intervention and solidifying Anglo-French naval cooperation.',
        ],
        image: '/units/great_war/assets/card_wilhelm.png',
      },
      concept_spotlight: {
        tag: 'FLASHPOINT IN FOCUS: GUNBOAT CRISIS',
        category: 'DIPLOMATIC BRINKMANSHIP • 1905–1911',
        title: 'The Moroccan Crises & The Entente Cordiale',
        body: "In 1904, Britain and France resolved their colonial disputes by signing the Entente Cordiale, recognizing British dominance in Egypt and French influence in Morocco. Seeking to test and rupture this fledgling partnership, Kaiser Wilhelm II engineered the First Moroccan Crisis (1905) and Second Moroccan Crisis (Agadir, 1911). Wilhelm's aggressive gunboat diplomacy backfired catastrophically: at the 1906 Algeciras Conference, only Austria-Hungary supported Germany. Instead of shattering the Anglo-French friendship, German threats drove Britain and France to initiate secret military staff talks and divide naval patrol responsibilities.",
        takeaway:
          'German attempts to bully France in Africa convinced British statesmen that Germany was an unpredictable, expansionist menace, transforming a loose colonial agreement into a binding de facto alliance.',
      },
      archival_dispatch: {
        badge: 'ARCHIVAL DISPATCH',
        type: 'The Mansion House Speech',
        date: '21 July 1911',
        title: 'Chancellor of the Exchequer David Lloyd George Warns Germany',
        body: '"If Britain is to be treated where her interests are vitally affected as if she were of no account in the Cabinet of nations, then I say emphatically that peace at that price would be a humiliation intolerable for a great country like ours to endure."',
        footer: 'The National Archives, Kew (FO 371/1160) • London, Mansion House Address',
      },
    },
    {
      id: 'lesson_4',
      skill: 'Causation & Causal Hierarchy',
      title: 'Why did a battleship building contest destroy Anglo-German relations?',
      vocab: [
        {
          term: 'Naval Supremacy',
          definition: "Having the most powerful and dominant navy on the world's oceans.",
        },
        {
          term: 'Two-Power Standard',
          definition:
            'A British policy stating their navy must be as large as the next two largest navies combined.',
        },
        {
          term: 'Arms Race',
          definition:
            'A competition between nations to achieve superiority in the quantity and quality of military weapons.',
        },
        {
          term: 'Dreadnought',
          definition:
            'A revolutionary 1906 British battleship with all-big-guns, heavy armour, and steam turbine speed.',
        },
        {
          term: 'German Navy Laws',
          definition:
            'A series of laws passed from 1898 ordering the rapid construction of a massive German battle fleet.',
        },
        {
          term: 'Navy League',
          definition:
            'A massive German patriotic organisation created by Admiral Tirpitz to promote public support for naval expansion.',
        },
        {
          term: 'Grand Fleet',
          definition:
            'The primary British naval force stationed at Scapa Flow to dominate the North Sea.',
        },
        {
          term: 'High Seas Fleet',
          definition: 'The main battle fleet of the Imperial German Navy based at Wilhelmshaven.',
        },
        {
          term: 'Kiel Canal',
          definition:
            'A strategic German waterway widened in 1914 to allow dreadnoughts to pass quickly between the Baltic and North Seas.',
        },
        {
          term: 'Scapa Flow',
          definition:
            'The heavily defended British naval base in the Orkney Islands guarding the northern North Sea.',
        },
      ],
      extended: {
        question:
          'How did the invention of the HMS Dreadnought ironically endanger British naval supremacy despite being a British invention?',
        model_answer:
          'The HMS Dreadnought was so technologically advanced—being faster, heavily armored, and armed exclusively with massive long-range guns—that it rendered all previous battleships obsolete. This effectively reset the naval arms race to zero, allowing Germany to start building Dreadnoughts on an equal footing with Britain.',
      },
      do_now: {
        type: 'questions',
        items: [
          {
            question: "1. What was the name of Kaiser Wilhelm II's aggressive foreign policy?",
            answer: 'Weltpolitik (World Policy)',
          },
          {
            question:
              "2. Explain how Wilhelm II's actions during the Moroccan Crises backfired on Germany.",
            answer:
              'By aggressively interfering, he terrified Britain into forming a closer military alliance with France.',
          },
          {
            question: '3. Why was the Franco-Russian Alliance a strategic disaster for Germany?',
            answer:
              "It destroyed Bismarck's diplomatic safety net and threatened Germany with a two-front war.",
          },
          {
            question: "4. Evaluate how the 'Scramble for Africa' increased tensions in Europe.",
            answer:
              'It turned European empires into global rivals, causing constant friction and border disputes.',
          },
          {
            question:
              "5. Describe the impact of Britain abandoning its policy of 'Splendid Isolation'.",
            answer:
              'Britain realized it could no longer defend its empire alone and sought European allies.',
          },
          {
            question: "6. Evaluate the role of Wilhelm II's personality in destabilizing Europe.",
            answer:
              "His impulsive, aggressive nature alienated allies and destroyed Bismarck's careful diplomatic balance.",
          },
          {
            question: '7. Who dismissed Otto von Bismarck in 1890?',
            answer: 'Kaiser Wilhelm II',
          },
          {
            question: '8. What strategic territory did Germany take from France in 1871?',
            answer: 'Alsace-Lorraine',
          },
          {
            question: '9. Why did Bismarck weave a complex web of secret alliances after 1871?',
            answer:
              'To keep France diplomatically isolated so they could never start a revenge war.',
          },
          {
            question: "10. What was Bismarck's ultimate nightmare scenario?",
            answer: 'A two-front war against both France and Russia simultaneously.',
          },
        ],
      },
      flashcards: [
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
      ],
      pair_share: {
        prompt:
          "Who do you think was more to blame for the naval arms race: Germany for building a fleet they didn't strictly need, or Britain for refusing to share control of the seas?",
        think: 'Decide who is more to blame and write down your main reason.',
        pair: 'Debate your choice with your partner. Try to find a weakness in their argument.',
        share: 'Be ready to summarize the strongest argument you heard.',
      },
      gcse_task: {
        sources: [
          {
            type: 'visual',
            src: '/units/great_war/assets/was_dreadnought_blueprint.png',
            title: 'Source A: Official technical blueprint of HMS Dreadnought, 1906.',
          },
          {
            type: 'written',
            text: "“We want eight, and we won't wait!”",
            title: 'Source B: Popular British political slogan chanted by the public in 1909.',
          },
        ],
        topic: 'the effects of the Anglo-German naval arms race',
        model_answer:
          '<strong>Source A is highly useful for demonstrating the sudden technological leap that triggered the naval arms race;</strong> <strong style="color: #0284c7;">it visually details the massive, all-big-gun armaments of the HMS Dreadnought.</strong> <strong style="color: #9333ea;">As an official naval blueprint, its origin makes it highly reliable, objective evidence of the ship\'s revolutionary, heavily-armored design.</strong> <strong style="color: #16a34a;">This connects to our knowledge that the launch of the Dreadnought in 1906 was so advanced that it rendered all previous battleships obsolete, ironically wiping out Britain\'s naval advantage and allowing Germany to start building Dreadnoughts on an equal footing.</strong><br><br><strong>Source B is extremely useful for revealing the psychological impact of the arms race on the British public.</strong> <strong style="color: #0284c7;">The slogan "We want eight, and we won\'t wait!" shows the intense public demand for more warships.</strong> <strong style="color: #9333ea;">The purpose of this popular slogan was to place immense political pressure on the British government to out-build the Germans during the 1909 naval panic.</strong> <strong style="color: #16a34a;">This is supported by the context of \'Jingoism\'—an aggressive form of patriotism—where the British public viewed naval supremacy as a matter of national survival, leading the government to eventually build 29 Dreadnoughts to Germany\'s 17.</strong>',
      },
      learning_objective: 'To understand Whose Navy Was Biggest and Best? The Arms Race',
      learning_objectives: {
        overarching:
          'To analyze how the naval arms race heightened tensions between Britain and Germany.',
        scaffolded: [
          'Identify the significance of the HMS Dreadnought.',
          'Explain the concept of the Two-Power Standard and Risk Theory.',
          'Analyze how naval competition fed mutual suspicion.',
        ],
      },
      teacher_notes: {
        primer:
          "The overarching goal is to analyze how the naval arms race heightened tensions between Britain and Germany. The key concept here is the 'security dilemma': Britain built ships to feel safe, which made Germany feel unsafe, so Germany built ships, which made Britain feel unsafe. The HMS Dreadnought is the central turning point in this escalation.",
        objectives: [
          {
            objective: 'Identify the significance of the HMS Dreadnought.',
            primer:
              "Point students to paragraph 4 and 7. The HMS Dreadnought was so advanced it rendered all existing battleships 'obsolete overnight.' This is the crucial point to emphasize: it wiped out Britain's massive head start.",
            question:
              'The HMS Dreadnought was a triumph of British engineering, but why did launching it actually help Germany in the short term?',
          },
          {
            objective: 'Explain the concept of the Two-Power Standard and Risk Theory.',
            primer:
              "Focus on paragraph 1 (Two-Power Standard) and paragraph 2 (Tirpitz's Navy Laws). Ensure students understand that Britain needed its navy to be bigger than the next two combined to survive, while Germany built its navy specifically to challenge that dominance.",
            question:
              'If you were a German citizen listening to Admiral Tirpitz, why might you feel it was perfectly fair and justified for Germany to build a massive navy?',
          },
          {
            objective: 'Analyze how naval competition fed mutual suspicion.',
            primer:
              "Bring their attention to paragraph 8. The race was no longer about total ships, but about Dreadnoughts. This created a 'desperate scramble' that consumed the budgets and politics of both nations, destroying any trust between them.",
            question:
              'How does a massive arms race make war more likely, even if neither country originally planned to actually attack the other?',
          },
        ],
        source_context:
          'Launched in 1906, HMS Dreadnought was so heavily armored and carried such massive guns that it instantly made every older battleship in the world obsolete. Ironically, while intended to secure British naval supremacy, it effectively reset the naval arms race to zero, allowing Germany to start building their own Dreadnoughts on an equal footing. **Hinge Question:** Why did the launch of a single ship effectively reset the global balance of naval power?',
      },
      vocab_cloze_text:
        "Britain's traditional [Naval Supremacy] was challenged when Germany began a rapid naval buildup. This sparked a fierce [Arms Race] between the two nations. Britain relied on the [Two-Power Standard] to maintain a massive fleet, but the invention of the heavily-armed [Dreadnought] battleship reset the competition.",
      video: [
        {
          type: 'youtube',
          url: 'https://www.youtube.com/watch?v=-osfjjJuY6U',
          title: 'Anglo-German Dreadnought Arms Race - Anything you can build I can build better!',
          duration: '32 mins 1 sec',
          viewing_task:
            'Watch this documentary to understand the fierce naval competition between Britain and Germany. Note down how the dreadnought escalated tensions.',
          model_answer:
            'The Dreadnought made all older ships obsolete, effectively resetting the naval race to zero. This gave Germany a realistic chance to challenge British naval supremacy from scratch, escalating tensions as both sides scrambled to out-build each other.',
        },
        {
          type: 'youtube',
          url: 'https://www.youtube.com/watch?v=yryey5NVODs',
          title:
            '14th June 1900: Anglo-German naval arms race triggered by the Second German Naval Law',
          duration: '2 mins 35 secs',
          viewing_task:
            'Watch this short clip on the Second German Naval Law. Explain why Britain saw this law as a direct threat.',
          model_answer:
            'The Second German Naval Law ordered a massive expansion of the German fleet. Britain viewed this as a direct threat to its naval supremacy and survival, as it relied entirely on controlling the seas to protect its global empire and trade routes.',
        },
        {
          type: 'youtube',
          url: 'https://www.youtube.com/watch?v=qmYJUYwsZqY',
          title: '67. Anglo-German Relations',
          duration: '52 mins 22 secs',
          viewing_task:
            'Watch this in-depth lecture on Anglo-German relations to understand the wider diplomatic context of the naval arms race. Note down how public opinion in both countries escalated the tension.',
          model_answer:
            'Public opinion in both countries was whipped up by nationalist groups like the German Navy League and the British press. This turned the naval rivalry from a government policy into a fierce matter of national pride and paranoia.',
        },
      ],
      narrative_blocks: [
        {
          act: 1,
          title: 'Act 1: Context & Catalyst (The Two-Power Standard & The Island Empire)',
          text: '<span class="para-ref">[1.1]</span> For centuries, Great Britain\'s global security, commercial empire, and domestic survival depended upon unassailable naval supremacy. As an island nation that imported over sixty percent of its food supply and raw materials, Britain maintained the strict "Two-Power Standard"—a parliamentary policy requiring the Royal Navy to be as large as the next two rival navies combined.<br><br><span class="para-ref">[1.2]</span> In 1898 and 1900, German Admiral Alfred von Tirpitz, enthusiastically backed by Kaiser Wilhelm II, steered monumental Navy Laws through the Reichstag. Tirpitz initiated the rapid construction of a high-seas battlefleet directly across the North Sea, sparking an intense naval arms race with Great Britain.<br><br><span class="para-ref">[1.3]</span> The German Navy Laws allocated vast imperial resources to construct high-seas battleships within hours of the English coast. For British naval planners, this proximity was intolerable: while a continental army protected Germany from invasion, a rival high-seas fleet could only be intended to contest British maritime sovereignty.',
          tasks: [],
        },
        {
          act: 2,
          title: 'Act 2: Tension & Escalation (Tirpitz’s Risk Theory & The Strategic Threat)',
          text: '<span class="para-ref">[2.1]</span> Admiral von Tirpitz justified German naval expansion through his famous "Risk Theory" (<em>Risikogedanke</em>). He argued that if Germany possessed a fleet so formidable that even the mighty Royal Navy could not attack it without sustaining catastrophic losses, Britain would be compelled to grant Germany diplomatic concessions and colonial territory worldwide.<br><br><span class="para-ref">[2.2]</span> The strategy backfired catastrophically. Instead of intimidating Britain, Tirpitz\'s naval build-up was perceived by London as a direct existential threat. British military planners concluded that while a merchant navy was a necessity for Britain, a German battlefleet was a luxury designed solely for aggressive war.<br><br><span class="para-ref">[2.3]</span> The British Admiralty retaliated by redeploying capital ships from Mediterranean and Asian stations into domestic home waters. By concentrating the fleet in the North Sea and expanding North Sea destroyer patrols, Britain transformed German naval ambition into an unsustainable financial and diplomatic burden.',
          source: {
            letter: 'A',
            title: 'Source A (Satirical Record): Puck Magazine: "The Armaments Race" (1909)',
            image: '/units/great_war/assets/map_lesson3.png',
            caption:
              'Contemporary chart and cartoon illustrating the escalating dreadnought battleship building race between the Royal Navy and the Imperial German Navy between 1906 and 1914.',
            citation: 'Puck Magazine (New York), Vol. 65, No. 1678 (April 1909).',
            context:
              'When Britain launched HMS Dreadnought in 1906, it rendered all earlier warships obsolete. Both Britain and Germany poured immense national fortunes into building rival fleets of dreadnoughts.',
            hinge_question:
              'How does this illustration demonstrate the economic futility and mounting paranoia of the Anglo-German naval arms race?',
          },
          tasks: [],
        },
        {
          act: 3,
          title: 'Act 3: Crisis & Decision (Fisher’s Revolution: HMS Dreadnought (1906))',
          text: '<span class="para-ref">[3.1]</span> In 1906, Britain\'s visionary First Sea Lord, Sir John Fisher, revolutionized modern naval warfare by launching <strong>HMS Dreadnought</strong>. Built in a record 366 days, Dreadnought featured ten 12-inch heavy guns and revolutionary steam turbine engines, rendering all previous pre-dreadnought battleships obsolete overnight.<br><br><span class="para-ref">[3.2]</span> Paradoxically, Fisher’s technological triumph wiped out Britain’s enormous numerical lead in older battleships. Because older vessels were now helpless targets, Germany could begin building dreadnoughts on equal terms. German shipyards immediately widened the Kiel Canal and laid down rival Nassau-class dreadnoughts, accelerating the arms race.',
          source: {
            letter: 'B',
            title:
              'Source B (Written Archival Record): Admiral Sir John Fisher: Confidential Admiralty Memorandum (1906)',
            text: '“My principles are: Speed is armor. Hit first, hit hard, and keep on hitting. The British Empire floats upon the British Navy. An island people, dependent upon foreign food supplies, must maintain supreme command of the seas or starve. If Germany acquires a fleet capable of defeating our Channel Fleet, our empire dissolves and Britain ceases to exist as a Great Power.”',
            citation: 'First Sea Lord Secret Policy Papers, Board of Admiralty Records (1906).',
            context:
              'In this confidential 1906 policy memorandum, Admiral Sir John Fisher explained why Britain could never compromise on naval supremacy.',
            hinge_question:
              'Why did Admiral Fisher’s technological revolution accidentally give Imperial Germany an opportunity to catch up with the Royal Navy?',
          },
          tasks: [],
        },
        {
          act: 4,
          title: 'Act 4: Consequence & Legacy (The Public Frenzy & The Naval Arms Verdict)',
          text: '<span class="para-ref">[4.1]</span> By 1909, British public anxiety peaked amid rumours of secret German shipbuilding. The British press and public launched a fervent patriotic campaign, coining the famous slogan: <em>"We want eight and we won\'t wait!"</em> The Liberal government bowed to public pressure, laying down eight super-dreadnoughts in a single budgetary year.<br><br><span class="para-ref">[4.2]</span> By 1912, Britain had definitively won the naval race, possessing twenty-nine dreadnoughts to Germany\'s seventeen. Acknowledging that it could not outspend Britain, Germany diverted its military budget back to its army. However, the naval race left deep scars: it drove Britain firmly into diplomatic alignment with France and Russia, cementing the hostile camps that would clash across Europe in 1914.',
          tasks: [],
        },
      ],
      quiz: [
        {
          q: 'What revolutionary British battleship was launched in 1906?',
          a: 'HMS Dreadnought',
          options: ['HMS Victory', 'HMS Belfast', 'HMS Invincible', 'HMS Dreadnought'],
        },
        {
          q: 'Which German Admiral was in charge of expanding the German Navy?',
          a: 'Admiral von Tirpitz',
          options: ['Admiral Hipper', 'Kaiser Wilhelm II', 'Admiral Scheer', 'Admiral von Tirpitz'],
        },
        {
          q: 'What policy dictated that the British Royal Navy must be as large as the next two largest navies combined?',
          a: 'Two-Power Standard',
          options: [
            'Splendid Isolation',
            'Naval Supremacy Act',
            'Two-Power Standard',
            'Dreadnought Rule',
          ],
        },
        {
          q: 'Why was the HMS Dreadnought completely revolutionary?',
          a: "It was faster, heavier armored, and had all 'big-guns'",
          options: [
            "It was faster, heavier armored, and had all 'big-guns'",
            'It was completely invisible to radar',
            'It was the first submarine',
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
            'Attacking Britain immediately',
            "Building a navy large enough that Britain wouldn't risk fighting it",
          ],
        },
        {
          q: 'What slogan did the British public chant in 1909 to demand more ships?',
          a: "'We want eight and we won't wait!'",
          options: [
            "'We want eight and we won't wait!'",
            "'Rule Britannia!'",
            "'Sink the Kaiser!'",
            "'More dreadnoughts now!'",
          ],
        },
        {
          q: 'Why did Britain feel so threatened by the German naval expansion?',
          a: 'Britain is an island and relied entirely on its navy for survival and trade',
          options: [
            'They were worried Germany would steal their ships',
            'Britain is an island and relied entirely on its navy for survival and trade',
            'They wanted to attack Germany',
            'They had no army at all',
          ],
        },
        {
          q: 'What laws were passed in Germany to fund their massive naval buildup?',
          a: 'The Naval Laws of 1898 and 1900',
          options: [
            'The Tirpitz Decrees',
            'The Imperial Fleet Bills',
            'The Naval Laws of 1898 and 1900',
            'The Shipyard Acts',
          ],
        },
        {
          q: 'By 1914, who had won the naval race?',
          a: "Britain, with 29 dreadnoughts to Germany's 17",
          options: [
            "Germany, with 30 dreadnoughts to Britain's 10",
            'They had exactly the same number',
            "Britain, with 29 dreadnoughts to Germany's 17",
            'France overtook both of them',
          ],
        },
        {
          q: 'How did the naval race affect British foreign policy?',
          a: "It forced Britain out of 'Splendid Isolation' and into an alliance with France and Russia",
          options: [
            'It made them ally with Germany',
            "It forced Britain out of 'Splendid Isolation' and into an alliance with France and Russia",
            'It caused them to declare war on America',
            'It made them give up their empire',
          ],
        },
      ],
      prologue:
        'For over a century, Great Britain relied on undisputed command of the oceans to protect its global empire, enforcing a "Two-Power Standard" that required the Royal Navy to be stronger than any two rival fleets combined. When Germany began laying down massive steel battleships on the North Sea coast, Britain met the challenge with a technical revolution that shocked the world. Why did a race to build floating fortresses transform former royal friends into mortal enemies?',
      tasks: [
        {
          type: 'two_sided_argument',
          topic:
            'Task 3: Evidence Preparation — The Battleship Revolution & Naval Construction (1906)',
          question:
            'Was the naval arms race the primary reason Britain abandoned its "Splendid Isolation" to ally with France and Russia?',
          instruction:
            'Examine the causal factors driving Great Britain out of isolation into the Triple Entente:',
          advancement: {
            title: 'Factor 1: The German Naval Challenge (Existential Maritime Threat)',
            points: [
              'As an island nation with only six weeks of food reserves, Britain relied entirely on Royal Navy supremacy to prevent starvation and invasion.',
              "Admiral von Tirpitz's Navy Laws built a massive high-seas battle fleet directly across the North Sea, aimed squarely at Britain.",
              'Fisher’s HMS Dreadnought (1906) sparked an all-out construction frenzy, fueling public panic ("We want eight and we won\'t wait!").',
            ],
            starter:
              'Historians ranking the naval race as the primary cause argue that Germany threatened Britain’s existential lifeline, because...',
          },
          limitations: {
            title: 'Factor 2: Wider Geopolitical & Continental Pressures (Secondary Drivers)',
            points: [
              'German industrial steel exports and expanding manufacturing directly challenged British global trade dominance.',
              'The Kaiser and German diplomats convinced the British government that Germany intended to dominate continental Europe.',
              'Britain realized it could no longer defend its global empire without settling imperial disputes through agreements with France and Russia.',
            ],
            starter:
              'Conversely, other historians argue that the naval race was merely one symptom of wider geopolitical encirclement, because...',
          },
          synthesis_prompt:
            'Establish a causal hierarchy explaining whether naval fear was the primary or secondary factor behind the British diplomatic revolution.',
          synthesis_connectives: [
            'Undoubtedly, the naval arms race was...',
            'However, other significant pressures included...',
            'In terms of causal hierarchy...',
            'Because naval defeat meant immediate national ruin...',
            'Therefore, the naval challenge must be judged as...',
          ],
          model_answer:
            'In establishing a causal hierarchy for Britain’s abandonment of "Splendid Isolation," the German naval challenge must be ranked as the primary catalyst. While German industrial competition and aggressive posturing in Morocco generated severe diplomatic friction, neither threatened Britain’s physical existence. By contrast, an island nation holding only six weeks of grain reserves could not tolerate a rival battle fleet massing hours from London. When Admiral Tirpitz challenged the Two-Power Standard and Jackie Fisher launched HMS Dreadnought, naval security ceased to be an ordinary diplomatic dispute and became a matter of national survival. Consequently, the naval race was the decisive factor that forced Britain into the Triple Entente.',
        },
        {
          type: 'extended_writing',
          topic: 'Task 4: Extended Writing — Causal Hierarchy & National Security',
          question:
            'Was the naval arms race the primary reason Britain ended its "Splendid Isolation" to ally with France and Russia?',
          hints: [
            'Point: Identify the German naval challenge as the primary existential threat to British survival.',
            'Evidence: Explain the Two-Power Standard, Admiral Tirpitz’s Risk Fleet in the North Sea, and the launch of HMS Dreadnought in 1906.',
            'Point: Evaluate secondary factors, including German economic rivalry and diplomatic bullying in Morocco.',
            'Evidence: Detail the Berlin-to-Baghdad railway, trade competition, and the 1905/1911 Moroccan crises that pushed the British Foreign Office into continental alignment.',
            'Causal Hierarchy: Conclude decisively whether the naval race was primary or secondary, weighing national survival against general diplomatic rivalry.',
          ],
          model_answer:
            'The Anglo-German naval arms race was the primary reason Great Britain abandoned its nineteenth-century policy of "Splendid Isolation" and aligned with France and Russia. For over a century, Britain maintained global imperial dominance by avoiding continental alliances, relying instead upon the Royal Navy’s "Two-Power Standard"—a policy ensuring the fleet was stronger than any two rival navies combined. When Admiral Alfred von Tirpitz passed the German Navy Laws to construct a High Seas Fleet across the North Sea, British planners recognized an existential peril. As an island nation with an expanding industrial population holding only six weeks of food reserves, a lost naval battle meant immediate starvation and national subjugation. The commissioning of the revolutionary turbine-powered HMS Dreadnought in 1906, while technically brilliant, wiped out Britain’s existing numerical superiority and prompted a desperate building contest ("We want eight and we won\'t wait!"). Secondary factors undoubtedly contributed: booming German industrial exports rivalled British steel, and Kaiser Wilhelm’s clumsy aggression during the 1905 and 1911 Moroccan crises alarmed the British Foreign Office. However, in any causal hierarchy, these commercial and imperial disputes were secondary: Britain had coexisted with imperial rivals for decades. It was the naval arms race alone that transformed a manageable political rivalry into a mortal threat to national survival, making alliance with France and Russia an imperative.',
        },
      ],
      key_figure: {
        name: 'Admiral Sir John "Jackie" Fisher',
        lifespan: '1841–1920',
        role: 'First Sea Lord of the Royal Navy (1904–1910, 1914–1915)',
        significance:
          'Revolutionized naval architecture, scrapped obsolete warships, and commissioned HMS Dreadnought in 1906 to preserve British naval supremacy.',
        actions: [
          'Recognized that naval combat was being revolutionized by steam turbines, long-range heavy guns, and torpedoes.',
          'Built HMS Dreadnought in Portsmouth Dockyard in a record 366 days, armed exclusively with ten 12-inch heavy guns.',
          'Ruthlessly modernized the British fleet and concentrated Royal Navy capital ships in home waters facing the North Sea.',
          'Pioneered the development of high-speed battlecruisers and converted the Royal Navy fuel supply from Welsh coal to oil to achieve decisive tactical speed.',
        ],
        image: '/images/jackie_fisher_portrait.jpg',
      },
      concept_spotlight: {
        tag: 'HISTORICAL SPOTLIGHT: NAVAL DOCTRINE',
        category: "TIRPITZ'S RISK THEORY • 1906–1914",
        title: 'Tirpitz’s Risk Theory & The Two-Power Standard',
        body: 'Britain’s defense policy rested upon the Two-Power Standard: the Royal Navy had to maintain a fleet of battleships at least equal to the combined strength of the world’s next two largest navies. In Berlin, Grand Admiral Alfred von Tirpitz devised the "Risk Theory" (Risikogedanke): building a German High Seas Fleet so formidable that even if the Royal Navy defeated it in battle, British naval power would be so severely crippled that Britain would lose its global empire. However, the launch of HMS Dreadnought in 1906 wiped the slate clean by making all pre-dreadnoughts obsolete, sparking an intense industrial building race. Between 1906 and 1914, Britain laid down twenty-nine dreadnought super-battleships to Germany’s seventeen, establishing insurmountable British naval dominance in the North Sea.',
        takeaway:
          'Germany could never outbuild Britain’s superior shipbuilding yards. The naval race failed to win concessions and turned Britain from an uncommitted neutral into Germany’s fiercest adversary.',
      },
      archival_dispatch: {
        badge: 'ARCHIVAL DISPATCH',
        type: 'Parliamentary Hansard',
        date: '16 March 1909',
        title: 'First Lord of the Admiralty Reginald McKenna on German Naval Expansion',
        body: '"The difficulty in which the government finds itself arises not from what Germany has completed, but from the enormous speed and scale with which she is now producing capital ships. We cannot afford to gamble with national security. The safety of the Empire depends entirely upon our supremacy upon the sea."',
        footer: 'Hansard Parliamentary Debates, 5th Series • House of Commons, Westminster',
      },
    },
    {
      id: 'lesson_5',
      skill: 'Significance & Inevitability',
      title: 'Did the Alliance System protect Europe or guarantee a global war?',
      vocab: [
        {
          term: 'Triple Alliance',
          definition:
            'A secret military agreement formed in 1882 linking Germany, Austria-Hungary, and Italy.',
        },
        {
          term: 'Triple Entente',
          definition: 'The diplomatic coalition uniting Great Britain, France, and Russia by 1907.',
        },
        {
          term: 'Encirclement',
          definition:
            "Germany's fear of being surrounded and isolated by hostile allied nations on both sides.",
        },
        {
          term: 'Blank Cheque',
          definition:
            "Germany's unconditional promise on 5 July 1914 to back Austria-Hungary in any war against Serbia.",
        },
        {
          term: 'Schlieffen Plan',
          definition:
            "Germany's war plan to rapidly invade France through Belgium before turning east to fight Russia.",
        },
        {
          term: 'Mobilisation',
          definition:
            'The rapid assembly and transportation of armed forces and equipment for active service in war.',
        },
        {
          term: 'Armed Camps',
          definition:
            'The dangerous division of Europe into two heavily armed, rival military alliances.',
        },
        {
          term: 'Preventative War',
          definition:
            'A war initiated by a nation to knock out a rival before that rival becomes too strong.',
        },
        {
          term: 'Reinsurance Treaty',
          definition:
            'A secret 1887 agreement between Germany and Russia arranged by Bismarck to prevent a two-front war.',
        },
      ],
      extended: {
        question:
          "Was the 'Blank Check' a reckless mistake by the Kaiser, or a calculated move by the German military to trigger a necessary war? Use historical reasoning to justify your stance.",
        model_answer:
          "While some historians claim the Kaiser acted impulsively out of grief, the evidence heavily suggests a calculated military gamble. The German High Command knew Russia was rapidly modernizing and would soon be too strong to defeat. By writing the 'Blank Check', Germany deliberately encouraged Austria to crush Serbia, knowing it would provoke Russia. They saw 1914 as their last best chance to win a preventative war against the Franco-Russian alliance before it was too late.",
      },
      do_now: {
        type: 'questions',
        items: [
          {
            question: '1. What revolutionary British battleship was launched in 1906?',
            answer: 'HMS Dreadnought',
          },
          {
            question: "2. What was the 'Two-Power Standard'?",
            answer:
              'A British policy stating their navy must be as large as the next two rival navies combined.',
          },
          {
            question: '3. Why did Germany feel it needed a massive high seas fleet?',
            answer:
              'To protect their growing global trade and forcefully assert their status as a top-tier world power.',
          },
          {
            question:
              '4. Explain how the invention of the Dreadnought ironically hurt British supremacy.',
            answer:
              "It rendered older ships obsolete, wiping out Britain's numerical lead and allowing Germany to compete from scratch.",
          },
          {
            question: '5. What was the popular British slogan chanted by the public in 1909?',
            answer: "We want eight, and we won't wait!",
          },
          {
            question: '6. Why did Britain feel their survival depended on massive naval supremacy?',
            answer:
              'As an island nation, Britain relied on the sea to import food and defend its global empire.',
          },
          {
            question: '7. How did the Anglo-German naval race make war more likely?',
            answer:
              "It convinced Britain that Germany was an existential threat, cementing Britain's commitment to the Triple Entente.",
          },
          {
            question: "8. What was the name of Kaiser Wilhelm II's aggressive foreign policy?",
            answer: 'Weltpolitik (World Policy)',
          },
          {
            question:
              "9. Explain how Wilhelm II's actions during the Moroccan Crises backfired on Germany.",
            answer:
              'By aggressively interfering, he terrified Britain into forming a closer military alliance with France.',
          },
          {
            question: "10. Evaluate how the 'Scramble for Africa' increased tensions in Europe.",
            answer:
              'It turned European empires into global rivals, causing constant friction and border disputes.',
          },
        ],
      },
      flashcards: [
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
      ],
      pair_share: {
        prompt:
          "Imagine you are an ordinary Serbian citizen in 1908. Why would Austria-Hungary's aggressive takeover of Bosnia make you feel personally threatened?",
        think: 'Write down how you would feel and why.',
        pair: 'Share your perspective with your partner.',
        share: 'Be prepared to share an interesting insight from your discussion.',
      },
      gcse_task: {
        sources: [
          {
            type: 'visual',
            src: '/units/great_war/assets/balkans_1914_simple_map.png',
            title:
              'Source A: Map of the Balkans showing the borders of Serbia and the Austro-Hungarian Empire in 1914.',
          },
          {
            type: 'written',
            text: '“Serbia is a viper that must be crushed. If we do not destroy them now, our empire will be torn apart by Slavic nationalism.”',
            title:
              'Source B: Diary entry of the Austro-Hungarian Chief of Staff, Conrad von Hötzendorf, 1913.',
          },
        ],
        topic: 'the threat posed by Serbia to Austria-Hungary',
        model_answer:
          '<strong>Source A is useful for illustrating why Austria-Hungary felt physically threatened in the Balkans;</strong> <strong style="color: #0284c7;">the map shows how Serbia nearly doubled its territory after the Balkan Wars of 1912-1913.</strong> <strong style="color: #9333ea;">As a geographical map, its nature provides objective, factual evidence of Serbia\'s dramatic expansion southward.</strong> <strong style="color: #16a34a;">This matches our contextual knowledge that a larger, stronger Serbia acted as a powerful magnet for Slavic nationalism, deeply terrifying the Austro-Hungarian Empire, which contained millions of Serbs who wanted to break away and join this new \'Greater Serbia\'.</strong><br><br><strong>Source B is crucial for understanding the aggressive mindset of the Austro-Hungarian military.</strong> <strong style="color: #0284c7;">The diary describes Serbia as a "viper that must be crushed" to prevent the empire from being "torn apart by Slavic nationalism".</strong> <strong style="color: #9333ea;">Because it is a private diary entry written by the Chief of Staff, its origin makes it an incredibly reliable, unfiltered record of the military command\'s genuine panic and their desire for a preventative war.</strong> <strong style="color: #16a34a;">This is historically accurate, as the Austro-Hungarian leadership viewed the 1914 assassination of Archduke Franz Ferdinand not just as a tragedy, but as the perfect political excuse to finally invade and destroy Serbia before it grew too powerful.</strong>',
      },
      learning_objective:
        'To understand How did the alliance system turn a local Balkan crisis into a global war?',
      learning_objectives: {
        overarching:
          'To evaluate whether the alliance system provided security or created a dangerous threat.',
        scaffolded: [
          'Identify the members of the Triple Alliance and the Triple Entente.',
          'Explain why countries felt the need to form secret defensive treaties.',
          'Evaluate how the alliance system could drag all of Europe into a regional conflict.',
        ],
      },
      teacher_notes: {
        primer:
          'The overarching goal is to evaluate whether the alliance system provided security or created a dangerous threat. Students need to grasp the tragic irony of the alliances: they were built to act as a deterrent to stop wars, but they acted as a conveyor belt that dragged everyone into a global conflict once a local crisis broke out.',
        objectives: [
          {
            objective: 'Identify the members of the Triple Alliance and the Triple Entente.',
            primer:
              'This is a direct recall task from paragraph 2. Ensure they correctly identify the Triple Alliance (Germany, Austria-Hungary, Italy) and the Triple Entente (Great Britain, France, Russia).',
            question:
              "Looking at a map of Europe, what is Germany's biggest geographic nightmare when facing the Triple Entente?",
          },
          {
            objective: 'Explain why countries felt the need to form secret defensive treaties.',
            primer:
              "Focus on paragraph 1 and 3. The initial goal was deterrence—the logic that no one would attack a country if it meant fighting a whole alliance. However, as paragraph 3 shows, it bred 'intense suspicion and paranoia' instead.",
            question:
              'The alliances were designed to be purely defensive to keep countries safe. Why did they end up doing the exact opposite?',
          },
          {
            objective:
              'Evaluate how the alliance system could drag all of Europe into a regional conflict.',
            primer:
              "Focus on paragraphs 5 and 7. The 'Blank Check' is the perfect example. Because of the alliance system, Germany felt forced to back Austria unconditionally, which guaranteed a local Balkan crisis would explode into a continental war.",
            question:
              "Do you think Kaiser Wilhelm II gave Austria the 'Blank Check' because he actually wanted a world war, or because he felt trapped by the alliance system?",
          },
        ],
        source_context:
          "This cartoon perfectly illustrates how the alliance system functioned as a 'doomsday machine'. A localized dispute in the Balkans quickly cascaded into a global conflict because each nation was bound to protect its ally. **Hinge Question:** How does this cartoon demonstrate the inherent danger of mutual defense treaties?",
      },
      vocab_cloze_text:
        'Bismarck feared a two-front war and created the [Reinsurance Treaty] to keep Russia friendly. However, after his dismissal, Germany faced a nightmare scenario: [Encirclement] by hostile powers. Europe split into two armed camps: the [Triple Entente] (Britain, France, Russia) and the [Triple Alliance] (Germany, Austria-Hungary, Italy).',
      video: [
        {
          type: 'youtube',
          url: 'https://www.youtube.com/watch?v=f11CKYB2FCA',
          title: 'Europe Prior to World War I: Alliances and Enemies I PRELUDE TO WW1 - Part 1/3',
          duration: '9 mins 47 secs',
          viewing_task:
            'Watch this video to understand the formation of the alliance system. Note down why countries felt the need to form secret defensive treaties.',
          model_answer:
            'The alliance system was formed as countries sought security in an increasingly competitive Europe. The secret, defensive nature of these treaties was intended as a deterrent, but instead bred intense suspicion and paranoia, turning Europe into two armed camps.',
        },
        {
          type: 'youtube',
          url: 'https://www.youtube.com/watch?v=dYrofaDfMKI',
          title: 'Tinderbox Europe - From Balkan Troubles to World War I PRELUDE TO WW1 - Part 2/3',
          duration: '7 mins 37 secs',
          viewing_task:
            'Watch this video about the escalating tensions in the Balkans. Explain how the alliance system turned a local crisis into a global conflict.',
          model_answer:
            "The alliance system acted like a 'doomsday machine'. Because nations were strictly bound to protect their allies, the local dispute between Austria-Hungary and Serbia quickly dragged all the major European powers into a global conflict.",
        },
        {
          type: 'era',
          url: 'https://era.org.uk/streaming-service-resource/1-the-approach-of-war-history-file/',
          title: 'The First World War: 01: The Approach of War | History File (BBC Two)',
          duration: '18 mins 28 secs',
          teacher_guidance:
            'BBC Two History File documentary asking who was to blame for the war, examining the alliance system and naval arms race.',
        },
      ],
      narrative_blocks: [
        {
          act: 1,
          title: 'Act 1: Context & Catalyst (Bismarck’s Web & The Reinsurance Treaty)',
          text: '<span class="para-ref">[1.1]</span> Following the unification of Germany in 1871 after the Franco-Prussian War, Chancellor Bismarck\'s paramount foreign policy priority was preserving the newly created Reich by keeping defeated France diplomatically isolated. In 1882, Bismarck concluded the Triple Alliance with Austria-Hungary and Italy, creating a defensive bulwark across Central Europe.<br><br><span class="para-ref">[1.2]</span> Bismarck\'s masterstroke was the 1887 secret Reinsurance Treaty with Russia, ensuring Russian neutrality if France attacked Germany. Bismarck recognized that Germany could not survive a two-front war against both France and Russia simultaneously. His intricate diplomatic web required immense skill, maintaining friendship with autocratic Russia while allied to Russia\'s Balkan rival, Austria-Hungary.<br><br><span class="para-ref">[1.3]</span> Bismarck understood that Germany\'s exposed central European geography created acute vulnerabilities. By maintaining simultaneous diplomatic understandings with Petersburg, Vienna, and Rome, Bismarck constructed a web of mutual commitments that discouraged any single power from launching an unprovoked war.',
          source: {
            letter: 'A',
            title:
              'Source A (Geopolitical Record): The Armed Camps: Central Powers vs Triple Entente (1914)',
            image: '/units/great_war/assets/map_lesson4.png',
            caption:
              'Geopolitical map showing the division of Europe into two opposing alliance blocs: the Triple Entente and the Central Powers.',
            citation: 'Historical Atlas of Modern Europe (1914).',
            context:
              'By 1914, Europe was split into two hostile armed camps bound together by mutual defense treaties, ensuring that a localized border dispute would instantly pull every Great Power into total war.',
            hinge_question:
              'Why did the geopolitical encirclement of Germany make German military generals panic and favor preventative war?',
          },
          tasks: [],
        },
        {
          act: 2,
          title: 'Act 2: Tension & Escalation (The Lapse of Treaty & The Franco-Russian Entente)',
          text: '<span class="para-ref">[2.1]</span> In 1890, the arrogant young Kaiser Wilhelm II dismissed Bismarck and allowed the vital Reinsurance Treaty with Russia to lapse, dismissively believing that the ideological gulf between autocratic Russia and republican France would prevent any alliance between them.<br><br><span class="para-ref">[2.2]</span> Wilhelm miscalculated disastrously. Starved of foreign loans to industrialize, Tsarist Russia turned to Paris. In 1894, republican France and autocratic Russia ratified the Franco-Russian Alliance, binding both powers to mobilize immediately if either was attacked by Germany. Bismarck\'s worst strategic nightmare—hostile encirclement on two fronts—was now reality.<br><br><span class="para-ref">[2.3]</span> The Franco-Russian convention promised automatic military mobilization if either signatory was attacked by a member of the Triple Alliance. In 1908, during the Bosnian Crisis, this rigid, binding treaty transformed European diplomacy: any confrontation between Austria and Russia in the Balkans would now automatically drag France and Germany into armed conflict.',
          tasks: [],
        },
        {
          act: 3,
          title: 'Act 3: Crisis & Decision (Encirclement & The Triple Entente (1904–1907))',
          text: '<span class="para-ref">[3.1]</span> Alarmed by Germany\'s aggressive naval build-up and erratic colonial diplomacy, Great Britain abandoned its traditional policy of "splendid isolation". In 1904, Britain settled century-old colonial disputes with France by signing the Entente Cordiale, formalizing diplomatic friendship.<br><br><span class="para-ref">[3.2]</span> In 1907, Britain negotiated the Anglo-Russian Convention, resolving rivalries in Persia and Central Asia. Together, these agreements created the Triple Entente between Britain, France, and Russia. Europe was now divided into two heavily armed, suspicious alliances, meaning any regional crisis could trigger a catastrophic continent-wide conflagration.',
          source: {
            letter: 'B',
            title:
              'Source B (Military Strategy Record): The Alliance Network & The Schlieffen Plan',
            image: '/units/great_war/assets/alliance_system.svg',
            caption:
              'Diagram illustrating how interlocking treaty obligations and rigid military mobilization timetables escalated a regional crisis into continental war.',
            citation: 'Department Military Studies Collection.',
            context:
              'Terrified of fighting Russia and France simultaneously, the German General Staff created the Schlieffen Plan: a rigid, 39-day mobilization timetable requiring an immediate invasion of neutral Belgium.',
            hinge_question:
              'How did the rigid railway timetables of the Schlieffen Plan make diplomatic compromise impossible in August 1914?',
          },
          tasks: [],
        },
        {
          act: 4,
          title: 'Act 4: Consequence & Legacy (The Schlieffen Plan & The War Timetables)',
          text: '<span class="para-ref">[4.1]</span> Trapped between hostile armies in France and Russia, German Chief of Staff Alfred von Schlieffen drafted an audaciously risky operational war plan. Assuming Russia\'s vast army would take six weeks to mobilize, Schlieffen planned to deploy ninety percent of Germany\'s forces in a massive hammer-blow through neutral Belgium to encircle and crush Paris in forty days.<br><br><span class="para-ref">[4.2]</span> Once France was eliminated, German armies would rush east by railway to defeat the lumbering Russian army. The Schlieffen Plan was rigidly tied to railway mobilization timetables. Crucially, it left zero room for diplomatic negotiation: once Russia mobilized, German generals insisted they must attack France through Belgium immediately, guaranteeing world war.',
          tasks: [],
        },
      ],
      quiz: [
        {
          q: 'Which three countries formed the Triple Entente in 1907?',
          a: 'Britain, France, Russia',
          options: [
            'Britain, France, Russia',
            'Germany, Austria-Hungary, Italy',
            'Britain, France, Italy',
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
            'Germany, Austria-Hungary, Italy',
            'Germany, Ottoman Empire, Italy',
          ],
        },
        {
          q: 'Which three countries formed the Triple Entente by 1907?',
          a: 'Britain, France, Russia',
          options: [
            'Germany, Austria-Hungary, Italy',
            'Britain, USA, France',
            'France, Russia, Italy',
            'Britain, France, Russia',
          ],
        },
        {
          q: 'What was a major flaw of the alliance system?',
          a: 'A small dispute between two nations could drag all major powers into war',
          options: [
            'It forced countries to disarm',
            'A small dispute between two nations could drag all major powers into war',
            'It prevented any trade between the blocs',
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
            'A peace treaty ending a war',
            'An agreement to build dreadnoughts together',
            'A military alliance between Germany and Russia',
            'A friendly agreement between Britain and France, settling colonial disputes',
          ],
        },
        {
          q: 'Why did Britain finally decide to form alliances?',
          a: "They felt threatened by Germany's growing navy and aggressive Weltpolitik",
          options: [
            "They felt threatened by Germany's growing navy and aggressive Weltpolitik",
            'They wanted to conquer Europe',
            'They were invaded by France',
            'They needed money from Russia',
          ],
        },
        {
          q: "What does 'Weltpolitik' mean?",
          a: "World policy (Germany's desire for a global empire)",
          options: [
            'Splendid isolation',
            'Peaceful co-existence',
            "World policy (Germany's desire for a global empire)",
            'Naval supremacy',
          ],
        },
        {
          q: "Which nation in the Triple Alliance was seen as the 'weak link'?",
          a: 'Italy',
          options: ['Germany', 'Italy', 'Austria-Hungary', 'Britain'],
        },
      ],
      prologue:
        'Following the humiliation of France in 1871, Otto von Bismarck juggled competing empires like delicate crystal balls, determined to keep Germany safe by keeping France isolated. But when reckless successors dropped the balls, Europe split into two heavily armed, suspicious military coalitions. Did the Triple Alliance and Triple Entente act as a stabilizing balance of power, or did they construct an inflexible doomsday machine?',
      tasks: [
        {
          type: 'two_sided_argument',
          topic: 'Task 3: Archival Interrogation — The "Willy-Nicky" Telegrams & Alliance Clauses',
          question:
            'Did the European alliance system preserve peace between the Great Powers, or make a general war inevitable?',
          instruction:
            'Analyze both sides of the historical debate surrounding the pre-1914 alliance systems and the Willy-Nicky telegrams:',
          advancement: {
            title: 'Interpretation 1: The Alliances as a Stabilising Deterrent (Peacekeeper)',
            points: [
              'The balance of power maintained major European peace for over forty years following the 1871 Franco-Prussian War.',
              'Defensive treaties discouraged unilateral aggression by ensuring any attacker would face a formidable multi-nation coalition.',
              'Great Powers repeatedly restrained their allies during crises (such as Britain and France restraining Russia in 1908).',
            ],
            starter:
              'Defenders of the alliance system argue that it successfully preserved peace through mutual deterrence, because...',
          },
          limitations: {
            title: 'Interpretation 2: The Inflexible Tripwire & Doomsday Machine (Inevitability)',
            points: [
              'Secret military conventions tied political alliances to rigid, minute-by-minute railway mobilization timetables (Schlieffen Plan).',
              'Bound major empires to the reckless ambitions of unstable client states in the volatile Balkan powder keg.',
              'German railway mobilization timetables meant that European diplomacy was powerless once the military machine began.',
            ],
            starter:
              'Conversely, critics argue that the alliance system made a general European war virtually inevitable, because...',
          },
          synthesis_prompt:
            'Evaluate whether alliances preserved stability or functioned as an unavoidable tripwire to world war.',
          synthesis_connectives: [
            'While defensive coalitions preserved peace for decades...',
            'Their structural flaw was...',
            'As demonstrated by the Willy-Nicky correspondence...',
            'Once military mobilization commenced...',
            'Therefore, the alliance system ultimately proved...',
          ],
          model_answer:
            'While the European alliance system successfully maintained peace for four decades through mutual deterrence, its fundamental inflexibility made a general war inevitable once a Great Power was attacked. The fatal flaw was that political treaties had become chained to rigid military mobilization timetables, such as Germany’s Schlieffen Plan. As the July 1914 "Willy-Nicky" telegrams tragically revealed, even the personal pleas of the Kaiser and Tsar could not stop the momentum of army railway schedules. Rather than localized deterrence, the alliances operated as a lethal chain reaction: an Austrian conflict with Serbia automatically dragged in Russia, Germany, France, and Britain.',
        },
        {
          type: 'extended_writing',
          topic: 'Task 4: Extended Writing — Significance & The Inevitability Debate',
          question:
            'Did the European alliance system preserve peace between the Great Powers, or make a general war inevitable?',
          hints: [
            'Point: Acknowledge the deterrent function of the Triple Alliance and Triple Entente in maintaining European peace from 1871 to 1914.',
            'Evidence: Bipolar balance of power, mutual defense clauses, and diplomatic restraint exercised during the 1908 Bosnian and 1912–13 Balkan crises.',
            'Point: Contrast with the fatal structural mechanisms that made war inevitable once a crisis erupted.',
            'Evidence: Secret military protocols, rigid railway mobilization timetables, the Schlieffen Plan, and the "Blank Cheque".',
            'Historical Verdict: Evaluate whether the system preserved peace or guaranteed that any localized dispute would explode into world war.',
          ],
          model_answer:
            'The European alliance system functioned effectively as a peacekeeper for over forty years, yet paradoxically constructed the very mechanism that made a general continental war inevitable in 1914. Between 1871 and the early 1900s, the emergence of the Triple Alliance (Germany, Austria-Hungary, Italy) and the Triple Entente (Britain, France, Russia) established a bipolar balance of power. The sheer destructive potential of confronting a rival coalition acted as a powerful deterrent: during the 1908 Bosnian Crisis and the 1912–1913 Balkan Wars, Great Powers actively restrained their allies from escalating localized clashes into general conflict. However, this stability concealed a catastrophic structural defect: the militarization of alliances through rigid railway mobilization schedules. Military staff talks transformed defensive political promises into automated war plans. In Germany, fear of encirclement generated the Schlieffen Plan, which dictated that any Russian mobilization required an immediate German assault through neutral Belgium to defeat France within six weeks. When the July Crisis erupted, the desperate "Willy-Nicky" telegrams between Kaiser Wilhelm II and Tsar Nicholas II proved completely useless against the momentum of the military machine: General von Moltke insisted that railway schedules could not be altered. Consequently, while alliances prevented small wars between Great Powers for decades, they guaranteed that when conflict finally came, it could not be contained.',
        },
      ],
      key_figure: {
        name: 'Count Alfred von Schlieffen',
        lifespan: '1833–1913',
        role: 'Chief of the Imperial German General Staff (1891–1906)',
        significance:
          'Authored the operational war plan designed to knock France out of a two-front war in six weeks by invading through neutral Belgium.',
        actions: [
          'Observed that the Franco-Russian Alliance (1894) encircled Germany with hostile armies to the west and east.',
          'Calculated that Russia’s vast geographic expanse and primitive railways would require six weeks to mobilize its army.',
          'Devised the Schlieffen Plan: massing 90% of German combat strength on the right wing to swing through Belgium, envelop Paris, and defeat France before turning east.',
          'Warned on his deathbed in 1913: "Keep the right wing strong!"—a strategic principle fatally diluted by Helmuth von Moltke the Younger in August 1914.',
        ],
        image: '/units/great_war/assets/alfred_von_schlieffen.jpg',
      },
      concept_spotlight: {
        tag: 'HISTORICAL DEEP DIVE: THE ALLIANCE TRAP',
        category: 'RAILWAY MOBILIZATION • 1882–1914',
        title: 'Secret Military Conventions & Railway Mobilization Timetables',
        body: "European alliances were not merely defensive statements of intent; they were accompanied by rigid, top-secret military conventions with exact timetables for mobilization. In the era before mass motorized transport, moving millions of conscripts, horses, artillery, and ammunition required strict control of national railway networks. German, Russian, and French railway staff spent decades designing mobilization timetables where trains were timetabled down to the exact minute. Once a Great Power ordered general mobilization, it was virtually impossible to cancel or alter the train schedules without plunging the nation's military defenses into total chaos. The secret treaties chained the Great Powers together: an Austrian attack on Belgrade inevitably triggered Russian mobilization, which automatically triggered the Schlieffen Plan.",
        takeaway:
          'Military mobilization was viewed as equivalent to a declaration of war. Once Russia mobilized its trains to protect Serbia, German generals insisted they had to attack France immediately under the Schlieffen Plan.',
      },
      archival_dispatch: {
        badge: 'ARCHIVAL DISPATCH',
        type: 'Secret Military Convention',
        date: '17 August 1892',
        title: 'Franco-Russian Military Convention (Ratified 1894)',
        body: '"Clause 1: If France is attacked by Germany, or by Italy supported by Germany, Russia shall employ all her available forces to attack Germany. Clause 2: If Russia is attacked by Germany, or by Austria supported by Germany, France shall employ all her available forces to attack Germany."',
        footer:
          'Archives Diplomatiques du Ministère des Affaires Étrangères • Quai d’Orsay, Paris / St Petersburg',
      },
    },
    {
      id: 'lesson_6',
      skill: 'Synoptic Causation',
      title: 'Why did a single assassination in Sarajevo ignite a World War?',
      video: [
        {
          type: 'youtube',
          url: 'https://www.youtube.com/watch?v=Fmobm9pZtTg',
          title:
            'Simple History: The Bullet that Started WWI (The Assassination of Franz Ferdinand)',
          duration: '10 mins 27 secs',
          viewing_task:
            "Trace the sequence of events on 28 June 1914 in Sarajevo, from the Black Hand plot to Gavrilo Princip's fateful encounter with the Archduke's car outside Schiller's Delicatessen.",
          model_answer:
            "Six teenage Bosnian Serb nationalists recruited by the Black Hand lined the Appel Quay armed with bombs and pistols. An initial grenade thrown by Čabrinović missed. Later, when the motorcade changed plans to visit injured officers, the chauffeur took a wrong turn into Franz Josef Street. While trying to reverse, the car stalled outside Schiller's Delicatessen directly in front of Gavrilo Princip, who fired two shots, killing Sophie and Franz Ferdinand and sparking the July Crisis.",
        },
        {
          type: 'era',
          url: 'https://era.org.uk/streaming-service-resource/learning-zone-britain-and-the-start-of-ww1-bbc-two/',
          title: 'Britain and the Start of WW1 | Learning Zone (BBC Two)',
          duration: '7 mins 30 secs',
          teacher_guidance:
            'Dan Snow recreates a map of Europe on the beach to explain how Britain became involved in World War I.',
        },
      ],
      vocab: [
        {
          term: 'Assassination',
          definition: 'The planned murder of a prominent political leader or royal figure.',
        },
        {
          term: 'Black Hand',
          definition:
            'A secret Serbian nationalist terrorist group committed to uniting South Slavs through violence.',
        },
        {
          term: 'Pan-Slavism',
          definition:
            'The cultural and political movement to unite all Slavic peoples under Russian protection.',
        },
        {
          term: 'Annexation',
          definition:
            'The formal military seizure and incorporation of a foreign territory into another nation.',
        },
        {
          term: 'Ultimatum',
          definition:
            'A final list of non-negotiable demands, the rejection of which will instantly trigger war.',
        },
        {
          term: 'July Crisis',
          definition:
            'The month of tense diplomatic maneuvering in 1914 between the Sarajevo assassination and global war.',
        },
        {
          term: 'Mobilisation',
          definition:
            'The rapid call-up and movement of millions of reservist soldiers to their battle stations.',
        },
        {
          term: 'Schlieffen Plan',
          definition:
            "Germany's strategic timetable requiring a lightning invasion of France via neutral Belgium.",
        },
        {
          term: 'Treaty of London (1839)',
          definition:
            'The historic international treaty guaranteeing British military protection for Belgian neutrality.',
        },
        {
          term: 'Willy-Nicky Telegrams',
          definition:
            'The desperate series of telegrams exchanged between the Kaiser and the Tsar trying to avert war.',
        },
      ],
      do_now: {
        type: 'questions',
        items: [
          {
            question: '1. Which three countries made up the Triple Entente?',
            answer: 'Great Britain, France, and Russia',
          },
          {
            question: '2. Which three countries made up the Triple Alliance?',
            answer: 'Germany, Austria-Hungary, and Italy',
          },
          {
            question:
              '3. Explain the theoretical logic of how the alliance system was supposed to keep peace.',
            answer:
              'It was believed that the blocs were so heavily armed that attacking one would trigger an unwinnable global war, deterring aggression.',
          },
          {
            question:
              '4. Why did the alliance system actually increase paranoia instead of security?',
            answer:
              'Nations felt trapped by their defensive commitments and constantly feared their rivals were plotting a sudden attack.',
          },
          {
            question: '5. What military plan did Germany create to avoid a long two-front war?',
            answer: 'The Schlieffen Plan',
          },
          {
            question: '6. Which neutral country did the Schlieffen Plan require invading?',
            answer: 'Belgium',
          },
          {
            question: '7. What feeling of being surrounded by enemies haunted German planners?',
            answer: 'Encirclement',
          },
          {
            question: '8. What revolutionary British battleship was launched in 1906?',
            answer: 'HMS Dreadnought',
          },
          {
            question:
              '9. Explain how the invention of the Dreadnought ironically hurt British supremacy.',
            answer:
              "It rendered older ships obsolete, wiping out Britain's numerical lead and allowing Germany to compete from scratch.",
          },
          {
            question: '10. How did the Anglo-German naval race make war more likely?',
            answer:
              "It convinced Britain that Germany was an existential threat, cementing Britain's commitment to the Triple Entente.",
          },
        ],
      },
      flashcards: [
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
      pair_share: {
        prompt:
          'Look at the timeline of the July Crisis. At which exact moment do you think a world war became completely unstoppable? Was it the assassination, the blank cheque, or the mobilisations?',
        think: 'Pick the specific turning point and write down why you chose it.',
        pair: "Compare your turning points. Do you agree on when the 'point of no return' was?",
        share: "Be ready to defend your group's chosen turning point to the class.",
      },
      gcse_task: {
        sources: [
          {
            type: 'visual',
            src: '/units/great_war/assets/was_boiling_point.png',
            title:
              "Source A: 'The Boiling Point', a British cartoon published in Punch Magazine, 1912.",
          },
          {
            type: 'written',
            text: '“You may rest assured that His Majesty will faithfully stand by Austria-Hungary, as is required by the obligations of his alliance and of his ancient friendship.”',
            title:
              "Source B: The 'Blank Cheque' telegram sent from Germany to Austria-Hungary, 5 July 1914.",
          },
        ],
        topic: 'the causes of the outbreak of World War I',
        model_answer:
          '<strong>Source A is useful for showing the extreme volatility of the July Crisis;</strong> <strong style="color: #0284c7;">it depicts the European leaders desperately trying to keep the lid on the boiling \'Balkan Troubles\' pot.</strong> <strong style="color: #9333ea;">As a satirical cartoon published in Britain, its purpose is to warn the public that the Great Powers were rapidly losing control of the diplomatic situation.</strong> <strong style="color: #16a34a;">This reflects the historical reality that, due to the rigid Alliance System, the leaders knew that a local war in the Balkans would inevitably drag the entire continent into a catastrophic global conflict.</strong><br><br><strong>Source B is extremely useful for explaining the short-term trigger that turned the crisis into a war.</strong> <strong style="color: #0284c7;">The telegram guarantees that the Kaiser will "faithfully stand by Austria-Hungary" regardless of the consequences.</strong> <strong style="color: #9333ea;">As an official diplomatic communication (the \'Blank Check\'), its nature makes it undeniable proof of Germany\'s unconditional military support for Austria.</strong> <strong style="color: #16a34a;">This is vital contextual knowledge, as it was precisely this promise of German backing that gave Austria-Hungary the confidence to issue a deliberately unacceptable ultimatum to Serbia, knowing it would provoke Russia and trigger the First World War.</strong>',
      },
      learning_objective: 'To understand how a wrong turn in Sarajevo triggered a world war.',
      learning_objectives: {
        overarching: 'To analyze how a wrong turn in Sarajevo triggered a world war.',
        scaffolded: [
          'Identify the events of 28 June 1914.',
          'Explain how the assassination triggered the alliance system.',
          'Analyze whether the resulting war was inevitable or accidental.',
        ],
      },
      teacher_notes: {
        primer:
          'The overarching goal is to analyze how a wrong turn in Sarajevo triggered a world war. This lesson brings all the long-term causes together into the short-term spark. Focus on the timeline: the sheer bad luck of the assassination itself, followed by the rapid, rigid escalation of the July Crisis driven by military timetables.',
        objectives: [
          {
            objective: 'Identify the events of 28 June 1914.',
            primer:
              'Read paragraphs 4 and 5 as a tense, minute-by-minute narrative. Have students identify the failed bombings, the fateful wrong turn onto Franz Josef Street, and Gavrilo Princip seizing the unexpected opportunity.',
            question:
              "What was the single biggest piece of 'bad luck' that allowed Gavrilo Princip to assassinate the Archduke?",
          },
          {
            objective: 'Explain how the assassination triggered the alliance system.',
            primer:
              'Direct students to paragraph 6. This is a crucial chronological sequence: Austria blames Serbia -> Russia mobilises -> Germany declares war -> Britain declares war to protect Belgium. Have them trace the dominoes.',
            question:
              'The Archduke was killed by a Serbian terrorist. Why on earth did Great Britain end up declaring war on Germany because of it?',
          },
          {
            objective: 'Analyze whether the resulting war was inevitable or accidental.',
            primer:
              "Focus on the 'July Crisis' in paragraphs 7, 8, and 9. Point out the 'Willy-Nicky Telegrams' as an example of leaders trying to stop the war, versus the rigid military timetables (like the Schlieffen Plan) that forced it to happen.",
            question:
              "After reading about the 'Willy-Nicky Telegrams' and the military timetables, do you think the politicians were in charge in July 1914, or were the generals running the show?",
          },
        ],
        source_context:
          'The Balkans was known as the "Powder Keg of Europe" because of explosive nationalist movements, particularly Slavic groups seeking independence from the Austro-Hungarian Empire. The "Great Powers" (Britain, France, Germany, Russia, Austria-Hungary) are shown desperately trying to keep a lid on the tension, which finally exploded with the Archduke\'s assassination. **Hinge Question:** Based on this image, why were the Great Powers unable to permanently solve the \'Balkan Troubles\'?',
      },
      vocab_cloze_text:
        'The [Assassination] of Archduke Franz Ferdinand by the [Black Hand] terrorist group sparked a massive crisis. Austria-Hungary issued a severe [Ultimatum] to Serbia, demanding they surrender their sovereignty. When Serbia refused, Russia began a massive [Mobilisation] of its army, dragging the entire alliance system into war.',
      narrative_blocks: [
        {
          act: 1,
          title: 'Act 1: Context & Catalyst (The Balkan Powder Keg & The Annexation Crisis)',
          text: '<span class="para-ref">[1.1]</span> As the Ottoman Empire steadily disintegrated in southeastern Europe, the Balkan peninsula became known as the "Powder Keg of Europe". Small Slavic nations, particularly ambitious Serbia, sought to expand their borders and liberate ethnic Slavs living under foreign imperial rule, strongly backed by Tsarist Russia under the banner of Pan-Slavism.<br><br><span class="para-ref">[1.2]</span> In 1908, Austria-Hungary triggered the Bosnian Crisis by formally annexing the Slav province of Bosnia-Herzegovina. Enraged Serbian nationalists demanded war, but Russia was forced to back down when Germany threatened military intervention. Serbia vowed revenge, while Russian national prestige resolved never to suffer diplomatic humiliation in the Balkans again.<br><br><span class="para-ref">[1.3]</span> The Balkan Wars of 1912–1913 further inflamed regional hatreds, doubling Serbia\'s territory and convincing military leaders in Belgrade that Austrian rule over South Slavs was doomed, while Austro-Hungarian generals concluded that only a preemptive war could crush the Serbian threat.',
          source: {
            letter: 'A',
            title: 'Source A (Cartographic Record): The Balkan Powder Keg (1914)',
            image: '/units/great_war/assets/balkans_1914_simple_map.png',
            caption:
              'Map showing the competing ethnic, imperial, and territorial rivalries in the Balkan Peninsula before the outbreak of war.',
            citation: 'Balkan Historical Archive.',
            context:
              'Known as the "powder keg of Europe," the Balkans was a volatile region where the declining Ottoman Empire, expansionist Austria-Hungary, and Slavic Serbia backed by Russia clashed continuously.',
            hinge_question:
              'Why was the Balkans more dangerous to European peace than imperial rivalries in Africa or Asia?',
          },
          tasks: [],
        },
        {
          act: 2,
          title: 'Act 2: Tension & Escalation (The Black Hand & The Shots at Sarajevo)',
          text: '<span class="para-ref">[2.1]</span> On Sunday 28 June 1914, Archduke Franz Ferdinand, heir to the Austro-Hungarian throne, arrived in Sarajevo, the capital of Bosnia. Serbian nationalist society <em>The Black Hand</em>, covertly led by Serbian military intelligence chief Dragutin Dimitrijević ("Apis"), smuggled seven young Bosnian Serb assassins equipped with bombs and pistols into the city.<br><br><span class="para-ref">[2.2]</span> After an initial bomb bounced off the royal motorcade, the Archduke\'s driver took a wrong turn into Franz Josef Street. Nineteen-year-old assassin Gavrilo Princip stepped forward and fired two fatal shots, killing Franz Ferdinand and his wife Sophie at point-blank range, detonating the explosive fuse of European diplomacy.<br><br><span class="para-ref">[2.3]</span> The assassination triggered immediate anti-Serb riots across Sarajevo and Vienna. Discovering that Princip\'s weapons originated in Serbian arsenals, Austro-Hungarian hawks seized the long-sought pretext to crush their southern neighbour once and for all.',
          source: {
            letter: 'B',
            title: 'Source B (Forensic Police Map): Appel Quay & Franz Josef Street (28 June 1914)',
            image: '/units/great_war/assets/map_sarajevo_route.jpg',
            caption:
              'Forensic street map of Sarajevo showing the motorcade route along the Appel Quay, the site of the failed grenade attack, and the fatal wrong turn outside Schiller’s Delicatessen.',
            citation: 'State Archive of Bosnia and Herzegovina.',
            context:
              'After a failed bomb attack earlier in the morning, Archduke Franz Ferdinand’s motorcade took an unplanned route. The chauffeur made an accidental wrong turn, stalling the car directly in front of Gavrilo Princip.',
            hinge_question:
              'How does this route map illustrate the role of pure chance versus meticulous planning in the assassination?',
          },
          tasks: [],
        },
        {
          act: 3,
          title: 'Act 3: Crisis & Decision (The Blank Cheque & The Austrian Ultimatum)',
          text: '<span class="para-ref">[3.1]</span> In Vienna, Austro-Hungarian military leaders resolved to crush Serbia once and for all. In Berlin, the German General Staff under General Helmuth von Moltke urged action, calculating that war against Tsarist Russia and its Russian army was better fought in 1914 before planned Russian strategic railway networks were fully completed in 1917. On 5–6 July, Kaiser Wilhelm II issued the fateful "Blank Cheque", pledging unconditional German military backing even if Austrian retaliation against Serbia provoked war with Russia.<br><br><span class="para-ref">[3.2]</span> Emboldened by German support, Austria delivered a deliberately unacceptable 48-hour ultimatum to Serbia on 23 July, demanding Austrian officials conduct police investigations inside Serbian territory. Although Serbia accepted almost all demands, Austria rejected the reply and declared war on 28 July, bombarding Belgrade with heavy artillery.',
          source: {
            letter: 'C',
            title:
              'Source C (Primary Archival Document): The Secret Constitution & Blood Oath of the "Black Hand" (1911)',
            text: '“Article 1: This organization is created for the purpose of realizing the national ideal: the unification of all Serbs. Article 2: This organization prefers revolutionary struggle to cultural and diplomatic work. It shall therefore remain entirely secret from the official authorities. Article 33: Members must swear an unconditional oath: to carry to the grave all secrets of this organization, knowing that treason is punishable by immediate death.”',
            citation: 'State Archives of Serbia, Royal Serbian Army Records (1911).',
            context:
              'Formed by Serbian army officers, the Black Hand trained Gavrilo Princip and supplied the Browning semi-automatic pistols and cyanide capsules used in the Sarajevo plot.',
            hinge_question:
              'Does the Black Hand constitution prove that Princip was a lone nationalist fanatic or the agent of a state-backed conspiracy?',
          },
          tasks: [],
        },
        {
          act: 4,
          title: 'Act 4: Consequence & Legacy (The Sleepwalkers: The Cascading Mobilizations)',
          text: '<span class="para-ref">[4.1]</span> The alliance dominoes collapsed with terrifying speed. On 30 July, Tsar Nicholas II ordered general mobilization to protect Slavic Serbia. Germany demanded Russia halt within twelve hours; when Russia refused, Germany declared war on 1 August and activated the Schlieffen Plan, invading neutral Belgium on 3–4 August to attack France.<br><br><span class="para-ref">[4.2]</span> German violation of the 1839 Treaty of London compelled Great Britain to declare war at midnight on 4 August. As Sir Edward Grey famously observed: <em>"The lamps are going out all over Europe; we shall not see them lit again in our lifetime."</em> Decades of militarism, alliances, imperialism, and nationalism had culminated in thirty days of madness.',
          tasks: [],
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
          options: ['The White Rose', 'The Red Guards', 'Young Bosnia', 'The Black Hand'],
        },
        {
          q: 'On what exact date was the Archduke assassinated?',
          a: '28 June 1914',
          options: ['28 June 1914', '28 July 1914', '11 November 1918', '4 August 1914'],
        },
        {
          q: 'Which empire had annexed Bosnia in 1908, angering Serbian nationalists?',
          a: 'Austria-Hungary',
          options: ['Russia', 'Austria-Hungary', 'Germany', 'The Ottoman Empire'],
        },
        {
          q: 'Who was the heir to the Austro-Hungarian throne that visited Sarajevo?',
          a: 'Archduke Franz Ferdinand',
          options: [
            'Tsar Nicholas II',
            'Emperor Franz Joseph',
            'Archduke Franz Ferdinand',
            'Kaiser Wilhelm II',
          ],
        },
        {
          q: 'What terrorist group supplied the assassins with weapons?',
          a: 'The Black Hand',
          options: ['The Serbian Guard', 'Young Bosnia', 'The Red Army', 'The Black Hand'],
        },
        {
          q: 'What was the first, failed assassination attempt on the Archduke that morning?',
          a: 'A bomb was thrown at his car but bounced off',
          options: [
            'A bomb was thrown at his car but bounced off',
            'He was shot at but missed',
            'His driver was poisoned',
            'A bridge was blown up',
          ],
        },
        {
          q: "Why was Gavrilo Princip standing outside Schiller's Delicatessen when the Archduke's car stopped?",
          a: 'By total coincidence, the driver took a wrong turn and stalled the car right in front of him',
          options: [
            'The Archduke went in to buy a sandwich',
            'By total coincidence, the driver took a wrong turn and stalled the car right in front of him',
            'The police ordered the car to stop there',
            'Princip had planned the exact route',
          ],
        },
        {
          q: "What was the 'Blank Cheque'?",
          a: "Germany's promise of unconditional support to Austria-Hungary against Serbia",
          options: [
            'A bribe paid to the assassins',
            'A peace offer from Russia',
            "Germany's promise of unconditional support to Austria-Hungary against Serbia",
            'The money used to buy the guns',
          ],
        },
        {
          q: 'What happened on July 23, 1914?',
          a: 'Austria-Hungary sent an impossibly harsh ultimatum to Serbia',
          options: [
            'Germany invaded Belgium',
            'Russia declared war',
            'Britain joined the war',
            'Austria-Hungary sent an impossibly harsh ultimatum to Serbia',
          ],
        },
        {
          q: 'Why did Britain declare war on Germany on August 4, 1914?',
          a: 'Germany invaded neutral Belgium, violating the 1839 Treaty of London',
          options: [
            'Germany invaded neutral Belgium, violating the 1839 Treaty of London',
            'Because France surrendered',
            'Because Germany sank a British ship',
            'Because of the assassination in Sarajevo',
          ],
        },
      ],
      prologue:
        'On a bright June morning in 1914, Archduke Franz Ferdinand and his wife Sophie rode through Sarajevo in an open-topped car. Within hours, an amateurish plot marked by bungled bombs and expired cyanide ended in a bizarre wrong turn outside a delicatessen—triggering the most lethal chain reaction in human history. Why did two pistol shots in a remote Bosnian provincial capital bring down empires and kill twenty million people?',
      tasks: [
        {
          type: 'two_sided_argument',
          topic: 'Task 3: The Outbreak of War: Accidental Trigger vs Deep Structural Inevitability',
          question:
            'Was the outbreak of war in August 1914 caused by individual accidents in Sarajevo or deep structural forces?',
          instruction:
            'Compare the short-term catalyst of the Sarajevo assassination with the long-term structural pressures of M-A-I-N:',
          advancement: {
            title: 'Short-Term Human Agency & Chance (The Spark)',
            points: [
              "The assassination succeeded only due to an extraordinary string of blunders: a jammed gearbox and a wrong turn outside Schiller's Deli.",
              'Archduke Franz Ferdinand had been the leading voice of peace in Vienna, fiercely opposing war with Russia; his death removed that restraint.',
              'The reckless German "Blank Cheque" (5 July 1914) gave Austro-Hungarian hawks unconditional backing to crush Serbia.',
            ],
            starter:
              'Historians emphasizing chance and human error argue that the war was not inevitable because...',
          },
          limitations: {
            title: 'Long-Term Structural Pressures (The Powder Keg)',
            points: [
              'Decades of Militarism, Alliances, Imperialism, and Nationalism (M-A-I-N) had wound the European spring to breaking point.',
              'The German General Staff under Moltke believed that war with Russia was better fought in 1914 than after Russian railways were completed in 1917.',
              'Russian national prestige could not survive another humiliation in the Balkans after backing down during the 1908 Bosnian Crisis.',
            ],
            starter:
              'In contrast, structuralist historians argue that Sarajevo was merely the match that ignited a combustible continent because...',
          },
          synthesis_prompt:
            'Evaluate whether the First World War was caused by accidental blunders in July 1914 or inevitable structural forces.',
          synthesis_connectives: [
            'While the events in Sarajevo were bizarrely accidental...',
            'The underlying cause lay in...',
            'Without the pre-existing tensions of M-A-I-N...',
            'Consequently...',
            'In conclusion, the assassination...',
          ],
          model_answer:
            "While the physical assassination of Archduke Franz Ferdinand was a bizarre accident resulting from a stalled car and a lost driver, the catastrophe that followed was structural. Europe in 1914 was an armed camp waiting for a spark: military railway timetables dictated speed over diplomacy, the alliance system guaranteed contagion, and imperial pride made backing down unthinkable. The pistol shots outside Schiller's Delicatessen did not create the hatreds of Europe; they merely pulled the trigger on a gun that had been loaded for forty years.",
        },
        {
          type: 'extended_writing',
          topic: 'Task 4: Analytical Synthesis & Historical Essay',
          question:
            'Explain why the assassination of Archduke Franz Ferdinand in Sarajevo led directly to the outbreak of the First World War in August 1914.',
          hints: [
            'Point: The assassination provided the Austro-Hungarian military with the long-awaited pretext to crush Serbian nationalism once and for all.',
            'Evidence: On 28 June 1914, Gavrilo Princip and the Black Hand shot Franz Ferdinand; Germany issued the unconditional "Blank Cheque" on 5 July, and Austria presented an impossible ultimatum on 23 July.',
            "Explanation: Because Russia refused to allow Serbia to be destroyed again after the 1908 Bosnian humiliation, Tsar Nicholas II mobilized, triggering Germany's Schlieffen Plan.",
            'Link: Within days, the invasion of neutral Belgium brought Great Britain into the conflict, transforming a royal murder into a global catastrophe.',
          ],
          model_answer:
            'The assassination of Archduke Franz Ferdinand led directly to the outbreak of the First World War because it was seized upon by European leaders as an opportunity to resolve long-standing geopolitical conflicts by force. When 19-year-old Bosnian Serb Gavrilo Princip shot the Austrian heir in Sarajevo on 28 June 1914, hawks in Vienna such as General Conrad von Hötzendorf saw a golden opportunity to eliminate Serbia as a regional threat. Crucially, Kaiser Wilhelm II issued the fateful "Blank Cheque" on 5 July, guaranteeing unconditional German military support. Emboldened by Berlin, Austria-Hungary delivered an intentionally unacceptable ten-point ultimatum to Belgrade, declaring war on 28 July. Having endured humiliating diplomatic retreats in 1908 and 1912, Russia refused to abandon its fellow Slavic ally and ordered general mobilization. This movement activated the German Schlieffen Plan, which required Germany to knock out France within six weeks before turning to face Russia. When German troops violated Belgian neutrality to bypass French fortresses, Great Britain entered the war on 4 August. Thus, a botched political murder in Bosnia ignited the structural powder keg of alliances, militarism, and imperial fear, plunging humanity into four years of industrial slaughter.',
        },
      ],
      key_figure: {
        name: 'Gavrilo Princip',
        lifespan: '1894–1918',
        role: 'Bosnian Serb Nationalist Militant & Member of Young Bosnia / Black Hand',
        significance:
          'Assassinated Archduke Franz Ferdinand in Sarajevo on 28 June 1914, triggering the July Crisis and World War I.',
        actions: [
          'Recruited, armed with Belgian Browning semi-automatic pistols, and trained in Belgrade by the Serbian military intelligence network (The Black Hand).',
          'Stood outside Schiller’s Delicatessen on Franz Josef Street when the Archduke’s chauffeur took a wrong turn and stalled the car.',
          'Fired two shots at point-blank range, fatally severing the Archduke’s jugular vein and mortally wounding Duchess Sophie.',
        ],
        image: '/images/gw_gavrilo_princip.jpg',
      },
      concept_spotlight: {
        tag: 'HISTORICAL SPOTLIGHT: THE SARAJEVO SPARK',
        category: 'THE BALKAN POWDER KEG • JULY 1914',
        title: 'The "Blank Cheque" & The Austrian Ultimatum',
        body: 'Following the assassination of heir apparent Franz Ferdinand on 28 June 1914, Austro-Hungarian Chief of Staff Conrad von Hötzendorf saw a long-awaited opportunity to crush the Serbian kingdom once and for all. Before acting, Austria sent envoy Count Hoyos to Berlin. On 5–6 July, Kaiser Wilhelm II and Chancellor Bethmann-Hollweg issued the infamous "Blank Cheque" (carte blanche), promising unconditional German military support even if war with Russia resulted. Emboldened by German backing, Vienna issued a draconian 48-hour ultimatum to Serbia designed to be rejected, setting off thirty days of diplomatic miscalculation.',
        takeaway:
          'The Blank Cheque transformed a local Balkan clash into a general European conflagration by guaranteeing German military intervention if Russia defended Serbia.',
      },
      archival_dispatch: {
        badge: 'ARCHIVAL DISPATCH',
        type: 'Imperial Diplomatic Telegram',
        date: '6 July 1914',
        title: 'The German "Blank Cheque" to Austria-Hungary',
        body: '"His Majesty the Emperor Wilhelm authorizes me to inform Your Apostolic Majesty that Austria-Hungary may rely upon the full support of Germany as an ally. In the present crisis, Germany will stand loyally by Austria\'s side, even if grave European complications should arise."',
        footer:
          'Haus-, Hof- und Staatsarchiv, Vienna • Imperial Chancery, Berlin (Telegram No. 128)',
      },
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
