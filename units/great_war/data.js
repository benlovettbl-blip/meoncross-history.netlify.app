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
      id: 'lesson_0',
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
          options: ['50', '39', '300', '15'],
        },
        {
          q: 'Which state was the most powerful among the German states before 1871?',
          a: 'Prussia',
          options: ['Saxony', 'Austria', 'Bavaria', 'Prussia'],
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
            'Peaceful treaties',
            'Warfare and military strength',
            'Industrial factories only',
            'Democratic votes',
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
            'Tower of London',
            'Reichstag in Berlin',
            'Schönbrunn Palace',
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
          options: ['Burgundy', 'Normandy', 'Brittany', 'Alsace-Lorraine'],
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
            'It caused the collapse of the British Empire',
            'It led directly to the Russian Revolution',
            'It made France and Germany permanent allies',
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
          title: 'Briefing (GCSE Taster!)',
          text: 'Today, Germany is one of the most powerful and successful industrial countries in Europe. But if you looked at a map of Europe in 1800, you would not find a country called "Germany" at all. Instead, you would see a messy patchwork of hundreds of small, independent states. In this lesson, you will discover the remarkable story of how a brilliant, ruthless statesman used "blood and iron" to crush his neighbours, unite these states, and create a brand-new superpower that would completely change the history of the world.',
        },
        {
          title: '1. The Chessboard of 39 States',
          text: 'At the start of the 19th century, the German-speaking people were divided. In 1800, there were around 400 separate states making up what was known as the Holy Roman Empire, each with its own independent ruler. Following the Napoleonic Wars, these states were simplified and reduced to 39 states, forming a loose grouping known as the German Confederation in 1815.\n\nWithin this Confederation, the two largest and most powerful states—the Catholic empire of Austria and the militaristic kingdom of Prussia—constantly competed with each other for leadership.\n\nIn 1834, Prussia gained a massive economic advantage by setting up a free-trade customs union called the *Zollverein*. By removing internal customs barriers while keeping taxes on foreign imports, the *Zollverein* bound the smaller German states economically to Prussia while deliberately excluding Austria. Prussia had won the first round of the battle for dominance.',
        },
        {
          title: '2. Otto von Bismarck and "Blood and Iron"',
          text: 'In 1862, a brilliant and fiercely conservative nobleman named Otto von Bismarck was appointed Chancellor of Prussia. Bismarck had a clear and single-minded goal: to exclude Austria from German affairs once and for all and unite the remaining German states under Prussian leadership.\n\nBismarck despised the slow, democratic methods of speeches and parliaments. In his very first speech as Chancellor, he warned the Prussian parliament of his plans:\n\n> *"Germany is not looking to Prussia’s liberalism, but to her power... The great questions of the day will not be decided by speeches and resolutions of majorities... but by **blood and iron**."*\n\nBy "blood," Bismarck meant the lives of soldiers; by "iron," he meant the advanced technology of Prussia’s military machine, including its modern railways, artillery, and rapid-firing guns. From the mid-nineteenth century, Prussia built up a massive, exceptionally well-trained, and highly disciplined army. Bismarck was ready to unleash it.',
          tasks: [
            {
              type: 'comprehension',
              text: "Task 1: Interpreting 'Blood and Iron'. In your own words, explain what Otto von Bismarck meant when he said Germany would be united by 'blood and iron'. How did Prussia use its industrial and military power to prove Bismarck’s speech right between 1864 and 1871?",
              model_answer:
                "By 'blood and iron', Bismarck meant that unification would be achieved through warfare (blood) and industrial/military strength (iron), rather than through peaceful democratic speeches or votes. Prussia proved this right by building a modernized army with advanced railways and artillery, and then using this military machine to crush Denmark, Austria, and France in rapid succession between 1864 and 1871.",
            },
          ],
        },
        {
          title: '3. The Three Wars of Unification',
          text: 'To unite Germany, Bismarck orchestrated three short, decisive wars over a seven-year period:\n\n*   **War 1: The Danish War (1864):** Prussia teamed up with Austria to quickly defeat Denmark in a dispute over territory, showing off their military coordination.\n*   **War 2: The Austro-Prussian War (1866):** Bismarck turned on his former ally, Austria. The modernized Prussian army crushed the Austrian forces in just seven weeks. Following this defeat, Austria was completely excluded from German affairs, leaving Prussia as the undisputed leader of the German states.\n*   **War 3: The Franco-Prussian War (1870–1871):** To convince the southern German states (who were wary of Prussian dominance) to join his new union, Bismarck needed a common enemy. He cleverly provoked a war with France. The Prussian military machine invaded France, totally destroyed the French armies, and captured the French Emperor.',
          tasks: [
            {
              type: 'comprehension',
              text: 'Task 2: The Steps to Unification. Create a three-step staircase diagram in your book to show how Bismarck built the German Empire. For each step, write down: 1. The name of the country Prussia defeated. 2. The year of the war. 3. How this war helped Prussia achieve its ultimate goal of unification.',
              model_answer:
                'Step 1: Denmark (1864) - Showed off military coordination. Step 2: Austria (1866) - Excluded Austria from German affairs, making Prussia the undisputed leader. Step 3: France (1870-1871) - Provided a common enemy to convince the southern German states to join the union, completing the creation of the German Empire.',
            },
            {
              type: 'drag_drop_timeline',
              title: 'Interactive Task: The Three Wars of Unification',
              instruction:
                'Drag the three wars into the correct chronological order to reveal the secret code.',
              items: [
                {
                  id: 'w1',
                  text: 'Denmark (1864)',
                },
                {
                  id: 'w2',
                  text: 'Austria (1866)',
                },
                {
                  id: 'w3',
                  text: 'France (1870)',
                },
              ],
              secret_code: 'BISMARCK1871',
              question: 'Interactive Task: The Three Wars of Unification',
            },
          ],
        },
        {
          title: "4. Crowning a Kaiser in the Enemy's Palace",
          text: "Having defeated France, Bismarck successfully united the remaining independent northern and southern German states into a single, massive German Empire (the *Kaiserreich*).\n\nTo add ultimate humiliation to France's defeat, Bismarck arranged for the King of Prussia, Wilhelm I, to be officially proclaimed the first German Emperor (Kaiser) on 18 January 1871 inside the Hall of Mirrors at the Palace of Versailles—the historic home of French kings.\n\nAs part of the peace treaty, Germany also seized Alsace-Lorraine, a highly valuable French industrial region rich in coal and iron. While Germany celebrated its spectacular unification, French citizens looked on with deep bitterness. This land grab created a furious, long-term rivalry between Germany and France that would eventually help spark the First World War forty years later.",
        },
        {
          title: 'Consolidation Task',
          tasks: [
            {
              type: 'extended_writing',
              question:
                "Explain why Bismarck's policy of 'Blood and Iron' was successful in uniting Germany.",
              hints: [
                "Sentence Starter: Bismarck's policy was successful because it relied on military strength rather than...",
                'Sentence Starter: For example, he modernized the Prussian army and used it to...',
                'Sentence Starter: This resulted in a unified German Empire that was built on military victories over...',
              ],
            },
          ],
          text: '<h3>Consolidation Task</h3>',
        },
      ],
      primary_source: {
        title:
          'Source A: Cartographic Analysis — The German Empire (1871) vs Modern European Borders',
        src: ['/images/german_empire_1871.png', '/images/modern_germany_map.png'],
        caption:
          'This map illustrates the dramatic shift in European borders following the Franco-Prussian War in 1871. By uniting various independent German states into a single, massive German Empire under Prussian leadership, Otto von Bismarck completely altered the balance of power in Europe. This sudden creation of a massive, heavily armed, and highly industrialized powerhouse in the center of Europe deeply terrified its neighbors, setting the stage for future conflict.',
        question:
          'Enquiry: Look at the A4 map provided. Why might the geographical location of the new German Empire cause fear for both Germany and its neighbors?',
        tasks: [
          {
            type: 'short_answer',
            text: "Task 3: Analyzing the Seeds of Future Conflict. Write a short analysis explaining why Bismarck’s decision to take Alsace-Lorraine from France in 1871 was highly successful for Germany's economy in the short term, but incredibly dangerous for Germany's security in the long term.",
            model_answer:
              "In the short term, taking Alsace-Lorraine was an economic success for Germany because the region was rich in coal and iron, fueling Germany's industrial growth. However, in the long term, it was incredibly dangerous for Germany's security because it created a permanent, bitter rivalry with France. France would seek revenge and the return of its territory, leading to tensions that ultimately helped spark the First World War.",
          },
          {
            type: 'short_answer',
            text: 'Task 4: Spot the Difference (Geography). Compare the 1871 German Empire map with the modern-day Germany map. Identify two major territories that belonged to the German Empire but are no longer part of modern Germany.',
            model_answer:
              'Students should identify territories such as Alsace-Lorraine (now back in France) and East Prussia/Silesia/Pomerania (now in Poland and Russia).',
          },
        ],
        shelfmark: 'Comparative Cartographic Study',
        citation:
          'Comparative Historical Cartography: German Empire (1871) boundary surveys paired with modern European geopolitical borders.',
        context:
          "In January 1871, following Prussia's swift victory over France in the Franco-Prussian War, Otto von Bismarck united thirty-nine sovereign German states into a single unified empire dominated by Prussia. This cartographic comparison reveals the massive geopolitical footprint of the new state in the very heart of Central Europe, stretching from Alsace-Lorraine in the west to East Prussia in the east. The sudden arrival of a heavily industrialized empire with an army of over one million men completely shattered the traditional European balance of power established after the Napoleonic Wars. **Hinge Question:** How did the central geographical position and massive borders of the newly unified German Empire create immediate security dilemmas for both Germany and its neighbors?",
      },
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
    },
    {
      id: 'lesson_1',
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
        {
          type: 'youtube',
          url: 'https://www.youtube.com/watch?v=xKtSXGisbxU',
          title:
            'The World of the Franco-Prussian War – The 19th Century up to 1870 | GLORY & DEFEAT',
          duration: '13 mins 1 sec',
          viewing_task:
            'Examine the broader 19th-century background leading up to 1870. Identify how industrialisation, expanding railway networks, and rising European nationalism created the geopolitical tensions that led directly to the Franco-Prussian War.',
          model_answer:
            'The documentary explains that 19th-century industrialisation and modern railway networks radically transformed state power and the speed of military mobilization. Emerging nationalist movements disrupted traditional balances of power, creating intense friction between an established French Empire and a rising, ambitious Prussia that Otto von Bismarck skillfully exploited to spark the conflict of 1870.',
        },
      ],
      sources: [
        {
          title: 'Map A: The Annexation of Alsace-Lorraine (Treaty of Frankfurt, 1871)',
          src: '/units/great_war/assets/alsace_lorraine_1871_map.png',
          caption:
            'Map showing the strategic borderland of Alsace-Lorraine (Reichsland Elsaß-Lothringen), seized from France by Otto von Bismarck following the Franco-Prussian War of 1870–71.',
          context:
            'Following their victory in 1871, the Germans annexed Alsace and northern Lorraine. This was an economic and psychological catastrophe for France: the region contained 80% of France’s iron ore, vital coal deposits, and major textile factories, while placing 1.5 million French citizens under German military control. For the next 44 years, French school children were taught that Alsace-Lorraine was a "stolen child," and the statue representing Strasbourg in Paris was draped in black mourning cloth until 1918. This annexation made permanent peace between France and Germany impossible, driving France into the arms of Russia and Britain and creating the rigid alliance system of 1914. **Hinge Question:** Why did Bismarck’s annexation of Alsace-Lorraine make a future war between France and Germany virtually inevitable?',
          shelfmark: 'Curriculum Reference Cartography',
          citation:
            'Historical reference cartography illustrating the border changes and territorial cessions under the Treaty of Frankfurt (1871).',
        },
        {
          title: 'Source B: The Black Spot (La Tache Noire) by Albert Bettannier (1887)',
          src: '/units/great_war/assets/la_tache_noire_1887.jpg',
          caption:
            'Albert Bettannier’s iconic 1887 painting (Musée d’Orsay) showing a French schoolmaster in a black coat pointing with a wooden pointer to the blacked-out region of Alsace-Lorraine on a classroom map of France. A young French boy in a cadet uniform stands attentively beside him while solemn schoolmates look on, illustrating how an entire generation of French schoolchildren was educated to prepare for revenge (revanche) against Germany.',
          context:
            'Painted in 1887, this masterpiece captures the intense patriotic indoctrination in French schools under the Third Republic. Following the humiliation of 1871, school textbooks taught French boys that Alsace-Lorraine was a sacred territory stolen by the German Empire. Physical education and military drill were introduced into elementary schools so that pupils would grow into soldiers ready to reconquer the lost provinces. Notice the military medal on the student on the right and the drums in the corner. This relentless cultural focus on revanche meant that no French politician could ever accept permanent German control over the borderlands. **Hinge Question:** How does Bettannier use the classroom setting to prove that the Franco-Prussian War of 1871 had not truly ended?',
          shelfmark: "Musée d'Orsay RF 1982-53",
          citation:
            "Albert Bettannier, La Tache Noire (The Black Spot), 1887, Oil on canvas, Musée d'Orsay, Paris",
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
        type: 'timeline',
        events: [
          {
            year: '1871',
            title: 'The Unification of Germany',
            detail: 'The Franco-Prussian War',
            img: 'assets/was_germany_unification.png',
          },
          {
            year: '1897',
            title: 'Imperial Rivalries',
            detail: 'The Place in the Sun speech',
            img: 'assets/was_greedy_boy.png',
          },
          {
            year: '1906',
            title: 'The Naval Arms Race',
            detail: 'The Launch of HMS Dreadnought',
            img: 'assets/was_dreadnought_blueprint.png',
          },
          {
            year: '1907',
            title: 'Encirclement & Alliances',
            detail: 'The Triple Entente System',
            img: 'assets/was_military_matrix.png',
          },
          {
            year: 'June 1914',
            title: 'The Spark in Sarajevo',
            detail: 'The Assassination of the Archduke',
            img: 'assets/was_boiling_point.png',
          },
        ],
        prediction_question:
          'Predict: Looking at this long-term timeline, which factor do you think was the most dangerous necessary cause of the war?',
      },
      primary_source: {
        title:
          'Source A: Anton von Werner’s Masterwork — The Proclamation of the German Empire (Versailles, 18 January 1871)',
        src: '/units/great_war/assets/was_germany_unification.png',
        caption:
          'Anton von Werner’s famous 1885 painting depicting the official birth of the unified German Empire inside the Hall of Mirrors at the Palace of Versailles. Chancellor Otto von Bismarck stands prominently in the centre in his gleaming white cuirassier uniform, surrounded by German princes and generals cheering Kaiser Wilhelm I on the dais with raised sabres. Holding this triumphal coronation in the historic heart of French royal power was a calculated national humiliation of France that sparked decades of burning French resentment (revanche).',
        question:
          'Enquiry: What are the two opposing figures doing in this 1871 painting by Anton von Werner, and why is this event significant?',
        tasks: [
          {
            type: 'draw',
            text: 'Task 1: Draw an arrow to Kaiser Wilhelm I and Chancellor Otto von Bismarck at the center of the cheering military crowd.',
            model_answer:
              'Kaiser Wilhelm I stands elevated on the dais as Emperor, while Chancellor Otto von Bismarck stands prominently in the center wearing a bright white cuirassier uniform and holding the proclamation document.',
          },
          {
            type: 'draw',
            text: 'Task 2: Circle the surrounding architecture of the French Royal Palace, noting where this ceremony took place.',
            model_answer:
              'The ceremony took place inside the Hall of Mirrors at the Palace of Versailles, the historic seat of French royal supremacy, chosen deliberately by Bismarck to humiliate defeated France.',
          },
        ],
        model_answer:
          'The painting depicts the coronation of Kaiser Wilhelm I as Emperor of a newly united Germany. Crucially, this ceremony is taking place inside the Palace of Versailles (the traditional seat of French royal power) after Germany defeated France in the Franco-Prussian War. This was a deliberate humiliation of France, which fueled a burning French desire for revenge (revanche) that lasted until the outbreak of WWI in 1914.',
        shelfmark: 'BArch Bild 183-R1218-502 / Friedrichsruh Edition',
        citation:
          'Anton von Werner, The Proclamation of the German Empire, 1885 (Third Version, Bismarck-Museum Friedrichsruh)',
        context:
          'Anton von Werner was commissioned by the Prussian royal family to immortalize the declaration of the German Empire. The ceremony was deliberately staged inside the Hall of Mirrors at the Palace of Versailles—the ancestral palace of French kings—while Prussian siege artillery was still shelling Paris. Otto von Bismarck stands prominently in the center wearing a gleaming white cuirassier uniform, surrounded by German princes raising their sabers to Kaiser Wilhelm I. This calculated humiliation caused a deep, enduring trauma in French society known as revanche (revenge). **Hinge Question:** Why was staging the German coronation inside the French royal palace of Versailles guaranteed to make future reconciliation between the two nations impossible?',
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
          theme_heading: 'The European Shockwave: 1871',
          text: 'In 1871, a dramatic event shocked Europe. Prussia defeated France in the Franco-Prussian War. Prussian Chancellor Otto von Bismarck united thirty-nine independent German states into a single, powerful German Empire. This sudden victory destroyed the old balance of power. France lost vital land and wealth. A bitter rivalry began between France and Germany. This rivalry would poison European peace for over forty years.',
        },
        {
          theme_heading: 'A Fragmented Germany',
          text: 'Before 1871, there was no single country called Germany. Instead, central Europe was divided into dozens of independent states. They shared a common language and customs, but had separate rulers. The northern kingdom of Prussia was the strongest military power. Prussia was led by Chancellor Otto von Bismarck. Bismarck first united the northern states into the <strong>North German Confederation</strong>. However, the southern German states remained independent. Bismarck needed a clever plan to unite the north and south. He believed that a shared foreign enemy would force all Germans to unite under Prussian leadership.',
          level_4:
            'Before 1871, Germany did not exist as a single nation. Central Europe was divided into dozens of separate states. Prussia was the strongest military power. Chancellor Otto von Bismarck united the northern states first into the North German Confederation. He realized that a war against a common enemy would make the southern states join him.',
          tasks: [
            {
              type: 'comprehension',
              text: 'To what extent did the maps of central Europe fundamentally change prior to 1871? Use the term "North German Confederation" in your answer.',
              model_answer:
                'Before 1871, central Europe was divided into many independent German states. Bismarck first united the northern states into the North German Confederation. After defeating France, he brought the southern states into the union. This fundamentally changed the map of Europe by creating a massive, united German Empire.',
            },
          ],
        },
        {
          theme_heading: 'Ems Telegram Provokes War',
          text: "In July 1870, Bismarck found his opportunity. King Wilhelm I of Prussia met with the French ambassador at the spa town of Bad Ems. The King sent Bismarck a telegram describing their polite meeting. Bismarck cleverly altered the message. He shortened the sentences to make it sound like the King had insulted France. Bismarck then leaked this edited <strong>Ems Telegram</strong> to newspapers across Europe. The French public was furious. French Emperor Napoleon III fell directly into Bismarck's trap and declared war on Prussia. The independent southern German states immediately rushed to support Prussia.",
          level_4:
            "In July 1870, the Prussian King sent Bismarck a telegram about a meeting with the French ambassador. Bismarck cleverly edited this <strong>Ems Telegram</strong> to make it sound insulting to France. When the French read it, they were furious and declared war. Bismarck's trap worked, and the southern German states united behind Prussia.",
          tasks: [
            {
              type: 'comprehension',
              text: 'Describe the diplomatic trick Chancellor Otto von Bismarck used to manufacture a war with France in 1870.',
              model_answer:
                "In July 1870, Bismarck received a telegram describing a peaceful meeting between the Prussian King and the French ambassador. Bismarck edited the Ems Telegram to make it sound as if both men had insulted each other. When this edited message was published, the outraged French Emperor declared war, walking directly into Bismarck's trap.",
            },
          ],
        },
        {
          theme_heading: 'Prussian Military Advantages',
          text: 'The Prussian army defeated France with remarkable speed. First, Prussia used an <strong>advanced railway network</strong> to move 500,000 soldiers to the border in days. France mobilized much more slowly. Second, the Germans used heavy <strong>Krupp steel artillery</strong>. These Krupp guns fired explosive shells much faster and further than French bronze cannons. German forces surrounded the main French army at the Battle of Sedan on 1 September 1870. The French suffered 17,000 casualties. Over 21,000 French soldiers were captured, including Emperor Napoleon III himself. Paris was besieged during a bitter winter and finally surrendered on 28 January 1871.',
          level_4:
            'Prussia defeated France rapidly using two major advantages. First, an advanced railway network moved 500,000 troops to the border in days. Second, modern Krupp steel artillery outranged the French cannons. The French army was crushed at the Battle of Sedan, and Paris surrendered in January 1871.',
          tasks: [
            {
              type: 'comprehension',
              text: 'Identify two distinct military advantages that allowed the Prussian-led German army to quickly defeat the conventional French forces.',
              model_answer:
                'First, the Prussian army used an advanced railway network to mobilize and transport 500,000 troops to the front lines in days. Second, the Prussian army used modern Krupp steel artillery, which had greater range and firepower than the French cannons.',
            },
          ],
        },
        {
          theme_heading: "France's Humiliation",
          text: 'The German victory permanently altered European history. On 18 January 1871, the German princes gathered in the Palace of Versailles. Inside the historic Hall of Mirrors, they proclaimed King Wilhelm I as German Emperor. Choosing the French royal palace was a deliberate, agonizing insult to France. In the Treaty of Frankfurt, Germany forced three brutal penalties on France. First, France had to hand over the rich border regions of <strong>Alsace-Lorraine</strong>. Second, France was forced to pay a huge war indemnity of <strong>5 billion francs</strong>. Third, France was forced to host a <strong>German occupation army</strong> until the fine was paid.',
          level_4:
            'The German victory changed Europe forever. On 18 January 1871, King Wilhelm was proclaimed German Emperor inside the French royal Palace of Versailles. Germany forced three harsh terms on France: taking the rich province of Alsace-Lorraine, demanding 5 billion francs, and stationing German occupation troops on French soil.',
          tasks: [
            {
              type: 'comprehension',
              text: 'List the three severe penalties forced upon France by the victorious German Empire in the 1871 peace treaty.',
              model_answer:
                'The three penalties were: first, France had to give up the provinces of Alsace-Lorraine; second, France had to pay a war indemnity of 5 billion francs; third, France had to host a German occupation army until the debt was paid.',
            },
          ],
        },
        {
          theme_heading: "Bismarck's Nightmare: Fear of Revanche",
          text: 'These cruel peace terms created a dangerous legacy. French citizens felt deeply humiliated. They demanded <strong>revanche</strong> <small>(revenge)</small> to win back Alsace-Lorraine. In French schools, pupils were taught never to forget the lost provinces. Bismarck realized he had created a permanent enemy. He feared that France would seek revenge. His greatest nightmare was a <strong>two-front war</strong> <small>(fighting enemies on two opposite borders at once)</small>. If France allied with Russia, Germany would be trapped in the middle and attacked from both the west and the east.',
          level_4:
            'The peace terms created lasting bitterness. The French people demanded revanche (revenge) to take back Alsace-Lorraine. Bismarck knew France was now a permanent enemy. His greatest fear was a two-front war, where Germany would be attacked by France in the west and Russia in the east at the same time.',
          tasks: [
            {
              type: 'comprehension',
              text: 'Explain why the loss of Alsace-Lorraine and the ceremony at Versailles created a long-term "nightmare" for European peace.',
              model_answer:
                'The loss of Alsace-Lorraine and the humiliation of the German Empire being proclaimed inside the French Royal Palace of Versailles shattered French national pride. This created a bitter desire for revenge (revanche). Bismarck lived in constant fear of a two-front war if France allied with Russia, forcing Germany into defensive alliance webs that ultimately divided Europe into rival armed camps.',
            },
          ],
        },
        {
          theme_heading: "Bismarck's Alliance Web",
          text: 'To protect Germany, Bismarck worked tirelessly for twenty years. His main strategy was to keep France completely isolated without allies. In 1882, he built the Triple Alliance between Germany, Austria-Hungary, and Italy. In 1887, he signed a secret treaty with Russia called the <strong>Reinsurance Treaty</strong>. This guaranteed that Russia and Germany would not attack each other. Bismarck was a master diplomat. He kept peace by making sure Germany always had more friends than enemies.',
          level_4:
            'To protect Germany, Bismarck spent twenty years keeping France isolated without allies. He formed the Triple Alliance with Austria-Hungary and Italy. He also signed a secret Reinsurance Treaty with Russia to guarantee peace between them. Bismarck made sure Germany always had more allies than enemies.',
        },
        {
          theme_heading: 'Wilhelm Undoes Bismarck',
          text: "In 1888, a young and ambitious new emperor took power: Kaiser Wilhelm II. The new Kaiser wanted personal glory and dismissed Bismarck in 1890. Wilhelm made a disastrous mistake. He refused to renew the secret Reinsurance Treaty with Russia. Isolated and desperate for a friend, Russia turned to France. In 1894, France and Russia signed a military alliance. Bismarck's worst nightmare had come true. Germany was now surrounded by two powerful rivals. The German army immediately began planning for a two-front war.",
          level_4:
            "In 1888, the ambitious Kaiser Wilhelm II became emperor and dismissed Bismarck in 1890. Wilhelm foolishly dropped the secret treaty with Russia. As a result, Russia signed a military alliance with France in 1894. Bismarck's nightmare had happened: Germany was now surrounded by enemies on both sides.",
        },
        {
          title: 'Consolidation Task',
          tasks: [
            {
              type: 'extended_writing',
              question:
                'Explain why the Franco-Prussian War created a lasting legacy of hatred between France and Germany.',
              hints: [
                'Sentence Starter: The Franco-Prussian War created lasting hatred because the peace treaty humiliated France...',
                'Sentence Starter: For example, France was forced to give up Alsace-Lorraine and pay 5 billion francs...',
                'Sentence Starter: Consequently, French people felt a deep desire for revenge (revanche), while Germany lived in fear of a two-front war...',
              ],
              model_answer:
                'The Franco-Prussian War created a lasting legacy of hatred for three main reasons. First, the Treaty of Frankfurt deeply humiliated France by taking Alsace-Lorraine, demanding 5 billion francs, and occupying French territory. Second, proclaiming the German Empire inside the French Palace of Versailles wounded French national pride. Third, this humiliation created an obsessive French desire for revenge (revanche). To protect itself, Germany built alliances to isolate France, but Kaiser Wilhelm II later allowed France to ally with Russia, dividing Europe into hostile armed camps.',
            },
          ],
          text: '<h3>Consolidation Task</h3>',
        },
      ],
      quiz: [
        {
          q: 'Who was the Chancellor of Prussia that orchestrated the Franco-Prussian War?',
          a: 'Otto von Bismarck',
          options: [
            'Kaiser Wilhelm II',
            'Napoleon III',
            'Count von Schlieffen',
            'Otto von Bismarck',
          ],
        },
        {
          q: 'Which telegram did Bismarck edit to provoke France into war?',
          a: 'Ems Telegram',
          options: ['Versailles Dispatch', 'Blank Cheque', 'Ems Telegram', 'Zimmermann Telegram'],
        },
        {
          q: 'In what year did the Franco-Prussian War break out?',
          a: '1870',
          options: ['1890', '1870', '1914', '1871'],
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
          options: ['Palace of Versailles', 'Berlin Palace', 'Notre Dame', 'Reichstag Building'],
        },
        {
          q: 'What was the size of the war indemnity France was forced to pay?',
          a: '5 billion francs',
          options: [
            '132 billion gold marks',
            '5 billion francs',
            '1 billion marks',
            '6.6 billion pounds',
          ],
        },
        {
          q: 'Who became the new German Emperor in 1888 and dismissed Bismarck?',
          a: 'Kaiser Wilhelm II',
          options: ['Franz Joseph', 'Kaiser Wilhelm I', 'Tsar Nicholas II', 'Kaiser Wilhelm II'],
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
          options: ['France', 'Britain', 'Italy', 'Austria-Hungary'],
        },
        {
          q: "What was Germany's greatest fear that drove its military planning?",
          a: 'A two-front war',
          options: [
            'A socialist revolution',
            'A two-front war',
            'A naval blockade',
            'An Italian invasion',
          ],
        },
        {
          q: 'What was the name of the German military plan created to defeat France quickly?',
          a: 'Schlieffen Plan',
          options: ['Moltke Offensive', 'Plan XVII', 'Bismarck Plan', 'Schlieffen Plan'],
        },
        {
          q: 'Which French leader was captured at the Battle of Sedan?',
          a: 'Napoleon III',
          options: ['Georges Clemenceau', 'Charles de Gaulle', 'Napoleon III', 'Louis XVI'],
        },
        {
          q: 'What was the primary goal of Bismarck in defeating France?',
          a: 'To unify the southern German states with the north',
          options: [
            'To unify the southern German states with the north',
            'To crown himself Emperor',
            'To conquer Paris permanently',
            'To steal French gold',
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
          options: ['Wilhelm II', 'Bismarck', 'Wilhelm I', 'Frederick the Great'],
        },
        {
          q: 'What event did Bismarck use to trick France into declaring war?',
          a: 'Editing the Ems Telegram',
          options: [
            'Assassinating a French minister',
            'Editing the Ems Telegram',
            'Sinking a French ship',
            'Invading a border town',
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
            'It would stop German trade',
            'France would buy Russian weapons',
          ],
        },
        {
          q: 'Where exactly was the new German Empire proclaimed?',
          a: 'The Hall of Mirrors at Versailles',
          options: [
            'Notre Dame Cathedral',
            'The Hall of Mirrors at Versailles',
            'The Louvre',
            'The Reichstag in Berlin',
          ],
        },
      ],
    },
    {
      id: 'lesson_2',
      title: "To what extent did the 'Scramble for Africa' increase tension in Europe?",
      sources: [
        {
          title: 'Map A: The Partition of Africa at the Outbreak of War (1914)',
          src: '/units/great_war/assets/map_lesson2.png',
          caption:
            'Curriculum reference map illustrating the complete division of the African continent following thirty years of imperial expansion under the Berlin Act of 1885.',
          shelfmark: 'Curriculum Reference Cartography',
          citation:
            'Curriculum Reference Cartography based on colonial territorial boundaries established following the 1884–85 Berlin Conference.',
          context:
            "Between 1881 and 1914, European powers invaded and colonized 90% of the African continent during the 'Scramble for Africa'. At the Berlin Conference of 1884–85, Bismarck mediated the partition of territory to prevent war between European empires, establishing the principle of 'effective occupation'. By 1914, Britain held a vast continuous north-south corridor from Egypt to South Africa, France dominated West and Equatorial Africa, while Germany controlled Tanganyika, South-West Africa, Cameroon, and Togoland. Clashes over African territory—such as the Fashoda Incident (1898) and the First and Second Moroccan Crises (1905, 1911)—brought the great powers to the brink of war and solidified the Anglo-French Entente Cordiale. **Hinge Question:** To what extent did imperial rivalry in Africa accelerate the division of Europe into hostile military alliance blocs?",
        },
        {
          title: 'Map B: Walter Crane’s Imperial Federation Map of the World (1886)',
          src: '/units/great_war/assets/map_lesson2_b.png',
          caption:
            'Walter Crane’s famous 1886 world map showing the extent of the British Empire (coloured in red), maritime shipping routes, and global telegraph cables, framed by figures representing the colonies.',
          shelfmark: 'British Library Cartographic Collection Maps 957.(46.)',
          citation:
            'Walter Crane, Imperial Federation: Map of the World Showing the Extent of the British Empire in 1886 (London: Maclure & Co., 1886)',
          context:
            "Created for the Colonial and Indian Exhibition of 1886, Walter Crane's iconic map visualizes the vast global network of the British Empire, spanning one-quarter of the world's landmass and population. The map prominently traces the global maritime shipping lanes and submarine telegraph cables that connected London to Bombay, Singapore, Sydney, and Cape Town. When Kaiser Wilhelm II launched Germany's Weltpolitik (World Policy) and built a high-seas fleet, British statesmen viewed it as an existential threat to these delicate maritime arteries that sustained the British home islands. **Hinge Question:** Why would any attempt by Germany to build a powerful navy directly threaten the global imperial trade routes shown on Crane's map?",
        },
      ],
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
      primary_source: {
        title:
          "Source A: John Tenniel’s Satirical Cartoon — 'The Greedy Boy' (Punch Magazine, 10 January 1885)",
        src: '/units/great_war/assets/was_greedy_boy.png',
        caption:
          "This British cartoon satirizes Germany's Chancellor Otto von Bismarck as a \"greedy boy\" grabbing slices of a pudding that represents colonial territories in Africa and New Guinea. This reflects British anxiety and suspicion about Germany's aggressive efforts to build a global empire, which threatened Britain's status as the world's leading power.",
        question:
          'Enquiry: Look closely at the man standing over Africa. What is his posture suggesting about imperial ambitions?',
        tasks: [
          {
            type: 'draw',
            text: 'Task 1: Draw an arrow to the globe and label what the different slices represent to European leaders.',
            model_answer:
              'A detailed historical explanation using specific chronology and evidence from the lesson.',
          },
          {
            type: 'draw',
            text: 'Task 2: Circle the facial expression of the Kaiser, annotating what this reveals about British fears of German intentions.',
            model_answer:
              'A detailed historical explanation using specific chronology and evidence from the lesson.',
          },
          {
            type: 'draw',
            text: 'Contrast how British politicians and German politicians viewed Germany\'s right to acquire an empire. Use the word "obstacle" or "encirclement" in your answer.',
            model_answer:
              'A detailed historical explanation using specific chronology and evidence from the lesson.',
          },
        ],
        model_answer:
          "The 'greedy boy' posture suggests Germany's aggressive and insatiable appetite for colonial expansion. By showing Bismarck grabbing large pieces of the 'pudding' (representing Africa and New Guinea), the cartoon highlights British anxieties that Germany's imperial ambitions were directly threatening Britain's established dominance as a global empire.",
        shelfmark: 'Punch Historical Archive, Vol. 88, p. 19',
        citation:
          "Sir John Tenniel, 'The Greedy Boy', Punch, or the London Charivari, 10 January 1885",
        context:
          "Published during the Berlin Conference (1884–85), this cartoon captures British alarm over German Chancellor Otto von Bismarck's sudden entry into the colonial arena. John Bull, depicted as an innocent schoolboy with an empty plate, watches in astonishment as Bismarck cuts himself massive portions of the imperial plum pudding, labeled 'New Guinea' and 'Angra Pequena' (German South-West Africa). The cartoon illustrates the growing British suspicion that Germany was no longer content with being a European continental power and was now demanding a global empire ('a place in the sun'). **Hinge Question:** How does Tenniel's depiction of Bismarck as a greedy boy reflect British anxieties about Germany overturning the global status quo?",
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
          theme_heading: 'The Gamble of Weltpolitik',
          text: "In 1905, Kaiser Wilhelm II sailed to Tangier in Morocco. He backed Moroccan independence against French rule. The Kaiser expected Britain and France to quarrel and split. Instead, his risky gamble backfired. At the 1906 Algeciras Conference, Britain firmly backed France. Germany was left isolated and humiliated. In 1911, the Kaiser sent a German warship to Agadir in Morocco. Once again, Britain stood by France and prepared the Royal Navy for war. The Kaiser's clumsy gunboat diplomacy convinced both nations that Germany was a dangerous threat.",
          level_4:
            "In 1905, Kaiser Wilhelm II visited Morocco to challenge French rule. He hoped to divide Britain and France. Instead, Britain strongly supported France at the Algeciras Conference. In 1911, the Kaiser sent a warship to Agadir, Morocco. Britain stood by France again. The Kaiser's aggressive actions pushed Britain and France closer together.",
        },
        {
          theme_heading: 'The Scramble for Africa',
          text: 'By 1900, European Great Powers were racing to build overseas empires. This fierce race was known as Imperialism. Possessing colonies gave a country great status, wealth, and global power. Every colony provided cheap raw materials to feed European factories. In return, colonies bought European factory goods. In 1884, European leaders met at the Berlin Conference. They divided the African continent among themselves on a map. No African leaders were invited to the meeting. The Congo Free State suffered harsh cruelty under King Leopold II of Belgium.',
          level_4:
            'By 1900, European powers were racing to build overseas empires. This competition was called Imperialism. Colonies gave nations raw materials for factories and markets to sell goods. In 1884, European leaders met at the Berlin Conference. They divided Africa between themselves without asking any Africans. King Leopold II of Belgium exploited the Congo Free State with extreme brutality.',
          tasks: [
            {
              type: 'comprehension',
              text: 'Explain two distinct economic reasons why possessing overseas colonies was vital to the industrial growth of a Great Power.',
              model_answer:
                'Possessing overseas colonies was vital for two economic reasons: first, colonies provided cheap raw materials needed to feed the factories back home; second, they served as locked-down, captive markets where the ruling nation could easily sell its manufactured goods.',
            },
          ],
        },
        {
          theme_heading: 'The British and French Empires',
          text: 'Great Britain ruled the largest empire in human history. As an island nation, Britain relied entirely on open sea routes. Thousands of British merchant ships sailed the oceans every day. The Royal Navy protected these vital global trade routes from rival fleets. Crucially, Britain controlled the Suez Canal in Egypt. This canal was the vital sea shortcut to India. Any challenge to British naval power was seen as a direct threat to survival. France held the second-largest empire, mainly in North and West Africa. France had lost Alsace-Lorraine to Germany in 1871. French leaders fiercely guarded their colonies to restore national pride. In 1898, Britain and France nearly fought over Sudan during the tense Fashoda Incident.',
          level_4:
            'Great Britain ruled the largest empire in the world. As an island nation, Britain needed open seas for trade. The Royal Navy protected British merchant ships worldwide. Britain also controlled the Suez Canal to secure trade with India. France held the second-largest empire, mostly in North and West Africa. Having lost Alsace-Lorraine in 1871, France guarded its colonies to protect national pride. In 1898, Britain and France nearly fought over Sudan during the Fashoda Incident.',
          tasks: [
            {
              type: 'comprehension',
              text: 'Why did French politicians feel it was absolutely vital to maintain a firm hold on their remaining global colonies after 1871?',
              model_answer:
                'After suffering the bitter humiliation of losing the Alsace-Lorraine region to Germany in 1871, French politicians felt they had to fiercely guard their remaining overseas colonies to protect whatever international power and reputation France still had.',
            },
          ],
        },
        {
          theme_heading: "Germany Demands a 'Place in the Sun'",
          text: "European peace was shaken when Germany entered the imperial race. Germany had only unified in 1871. However, German factories and steel mills were expanding at unmatched speed. Kaiser Wilhelm II wanted Germany to match the global influence of Britain and France. He launched an ambitious new foreign policy called Weltpolitik. On 6 December 1897, Foreign Secretary Bernhard von Bülow gave a famous speech in parliament. He declared that Germany would no longer stand in the shadows. He boldly demanded Germany's own place in the sun.",
          level_4:
            "European peace changed when Germany joined the race for colonies. Germany had united in 1871 and was growing rapidly. Kaiser Wilhelm II wanted a world empire to match Britain and France. In 1897, Foreign Secretary Bernhard von Bülow gave a famous speech. He demanded Germany's own place in the sun.",
        },
        {
          theme_heading: 'German Ambitions Alarm Britain',
          text: "Germany rapidly seized lands across Africa and the Pacific. These colonies included Cameroon, Togo, German East Africa, and Kaiser-Wilhelmsland in New Guinea. However, German leaders wanted an even larger world empire. To protect these distant colonies, Germany began building a huge battle fleet. This naval build-up deeply alarmed Great Britain. British leaders feared Germany wanted to destroy the Royal Navy. Meanwhile, German leaders believed Britain was an arrogant barrier blocking Germany's rightful rise.",
          level_4:
            'Germany quickly seized colonies in Africa and the Pacific, including Cameroon, Togo, and Kaiser-Wilhelmsland. German leaders then began building a huge battle fleet to protect these colonies. This alarmed Britain, which relied on naval dominance. British leaders worried Germany wanted to challenge the Royal Navy, while Germany saw Britain as an obstacle.',
          tasks: [
            {
              type: 'comprehension',
              text: 'Explain how Germany’s sudden desire to build a naval fleet to protect its new colonies acted as a cause of friction with Great Britain.',
              model_answer:
                'Because Britain was an island nation, its survival relied on absolute control of the sea lanes. When Germany announced plans to build a massive battle fleet to protect its new empire, British politicians viewed this as a direct, aggressive threat to undermine the Royal Navy and the British Empire.',
            },
            {
              type: 'comprehension',
              text: 'What specific geographical territory did Foreign Secretary Bernhard von Bülow target when he demanded a "place in the sun" for Germany?',
              model_answer:
                "Bülow wasn't targeting one specific territory; demanding a 'place in the sun' meant he wanted Germany to have a massive global empire to match Britain and France, which soon led to Germany aggressively seizing territories like the Cameroons, East Africa, Togo, and Kaiser-Wilhelmsland.",
            },
          ],
        },
        {
          theme_heading: 'Germany Tests the Entente Cordiale',
          text: 'In 1904, Britain and France signed a historic treaty called the Entente Cordiale. This agreement settled their old colonial disputes in North Africa. France recognised British rule in Egypt. In return, Britain accepted French influence in Morocco. Kaiser Wilhelm II was furious about this friendly partnership. He feared that Britain and France were plotting to encircle Germany. The Kaiser decided to test the new alliance. He believed Britain would never risk war to defend French interests in North Africa.',
          level_4:
            'In 1904, Britain and France signed the Entente Cordiale to settle their colonial disputes. France accepted British control in Egypt, and Britain accepted French influence in Morocco. Kaiser Wilhelm II feared this friendship was meant to encircle Germany. He decided to test the alliance by causing a crisis in Morocco.',
        },
        {
          theme_heading: 'The First Moroccan Crisis (1905)',
          text: 'In March 1905, the Kaiser arrived in Tangier, Morocco. He rode through the streets on a white horse. Wilhelm announced that he supported the Sultan of Morocco as an independent ruler. He demanded an international conference to settle the Moroccan crisis. The Kaiser hoped to humiliate France and break the Anglo-French friendship. However, his gamble failed completely. At the 1906 Algeciras Conference, Britain strongly supported France. Germany was left isolated, backed only by Austria-Hungary.',
          level_4:
            'In March 1905, Kaiser Wilhelm II rode into Tangier, Morocco, on a white horse. He declared support for Moroccan independence against France. He wanted an international conference to humiliate France. But at the Algeciras Conference in 1906, Britain backed France completely. Only Austria-Hungary supported Germany.',
        },
        {
          theme_heading: 'The Agadir Crisis (1911)',
          text: 'In 1911, the Kaiser triggered a second dangerous standoff known as the Agadir Crisis. France sent troops to Morocco to put down a rebellion. Germany claimed this broke the Algeciras agreement. In response, Wilhelm sent a gunboat, the SMS Panther, to the Moroccan port of Agadir. The Kaiser tried to use gunboat diplomacy to bully France into giving up land in the Congo. Britain was furious at this German aggression. Chancellor David Lloyd George warned that Britain would fight rather than let Germany dominate Europe. The Royal Navy was placed on alert for war. Germany backed down in exchange for small strips of swamp in Central Africa. The crisis proved to Britain and France that Germany was an unpredictable and dangerous threat.',
          level_4:
            'In 1911, France sent troops to put down a rebellion in Morocco. In response, Germany sent the gunboat SMS Panther to the port of Agadir. Kaiser Wilhelm tried to bully France into handing over territory. Britain warned that it would fight to defend France. The Royal Navy was prepared for war. Germany backed down and received only small areas of swamp in the Congo. The crisis made Britain and France distrust Germany even more.',
        },
        {
          theme_heading: 'Europe Divided: The Alliance System',
          text: '<div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #cbd5e1; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin: 20px 0;"><img src="./assets/alliance_system.svg" style="width: 100%; max-width: 350px; display: block; margin: 0 auto;" alt="The European Alliance System (1914)"></div>',
          level_4:
            '<div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #cbd5e1; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin: 20px 0;"><img src="./assets/alliance_system.svg" style="width: 100%; max-width: 350px; display: block; margin: 0 auto;" alt="The European Alliance System (1914)"></div>',
        },
        {
          title: 'Consolidation Task',
          tasks: [
            {
              type: 'extended_writing',
              question:
                "Explain how the 'Scramble for Africa' increased tension between European powers.",
              hints: [
                'Sentence Starter: The Scramble for Africa increased tension because it led to intense imperial competition...',
                'Sentence Starter: For example, incidents like the Moroccan Crises showed that Germany was trying to...',
                'Sentence Starter: This resulted in European powers forming tighter alliances and increasing their military readiness to protect their...',
              ],
            },
          ],
          text: '<h3>Consolidation Task</h3>',
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
            'Paul von Hindenburg',
            'Adolf Hitler',
            'Otto von Bismarck',
          ],
        },
        {
          q: 'In which year did the First Moroccan Crisis occur?',
          a: '1905',
          options: ['1898', '1911', '1905', '1914'],
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
            'He wanted to conquer South America',
            'He wanted to control the Mediterranean Sea',
            'He wanted a holiday home in Africa',
            'He wanted Germany to have a global empire like Britain and France',
          ],
        },
        {
          q: 'What happened during the First Moroccan Crisis (1905)?',
          a: 'The Kaiser visited Tangier and declared support for Moroccan independence',
          options: [
            'The local sultan defeated the French army',
            'The Kaiser visited Tangier and declared support for Moroccan independence',
            'Germany invaded Morocco',
            'France surrendered Morocco to Britain',
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
            'Moroccans attacked German tourists',
            'Germany sent the gunboat Panther to the port of Agadir',
            'Britain blockaded the Moroccan coast',
            'France declared war on Germany',
          ],
        },
        {
          q: 'How did the Agadir Crisis end?',
          a: 'Germany backed down after being given a small strip of the Congo',
          options: [
            'Germany backed down after being given a small strip of the Congo',
            'Britain declared war on Germany',
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
            'It pushed Britain and France closer together in a strong alliance',
            'It led to Britain abandoning its empire',
          ],
        },
      ],
    },
    {
      id: 'lesson_3',
      title: 'Why did a battleship building contest destroy Anglo-German relations?',
      sources: [
        {
          title: 'Map A: The North Sea & Naval Chokepoints (Strategic Hydrographic Map)',
          src: '/units/great_war/assets/map_lesson3.png',
          caption:
            'Strategic hydrographic reference map of the North Sea showing the shallow German Bight, the English Channel bottleneck, and the northern naval blockade patrol lines between Scotland and Norway.',
          shelfmark: 'Curriculum Reference Cartography',
          citation:
            'Curriculum Reference Cartography based on British Admiralty North Sea naval patrol zones and strategic choke points (1914).',
          context:
            'Geography dictated naval strategy in the Anglo-German arms race. The German High Seas Fleet was trapped in the shallow waters of the German Bight behind Heligoland, with only two exits into the open Atlantic: the heavily defended English Channel and the northern choke point between the Orkney Islands and Norway. By stationing the British Grand Fleet at Scapa Flow in Scotland, the Royal Navy could enforce a distant blockade on Germany without risking its battleships near German minefields and U-boats. This blockade would eventually starve Germany of vital food and fertilizer imports during World War I. **Hinge Question:** How did the natural geography of the North Sea give Britain a decisive strategic advantage over the German fleet?',
        },
      ],
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
      primary_source: {
        title:
          'Source A: Admiralty Elevation & Deck Plan — The Revolutionary Design of HMS Dreadnought (1906)',
        src: '/units/great_war/assets/was_dreadnought_blueprint.png',
        caption:
          "Contemporary architectural elevation and upper deck layout from Brassey's Naval Annual, illustrating the revolutionary 'all-big-gun' armament and turbine machinery of HMS Dreadnought.",
        question:
          'Enquiry: This blueprint represents the HMS Dreadnought. Why would this ship make all other navies obsolete?',
        tasks: [
          {
            type: 'draw',
            text: 'Task 1: Draw an arrow to the rotating gun turrets and label the maximum distance their shells could hit an enemy ship.',
            model_answer:
              'Students should draw an arrow to the large rotating gun turrets on the blueprint, noting that these guns could hit enemy targets from much further away than older battleships.',
          },
        ],
        model_answer:
          "The HMS Dreadnought rendered older navies obsolete because of its revolutionary design: it was significantly faster and equipped entirely with massive, long-range guns ('all-big-gun' armament). This meant it could outrun and outgun any existing battleship, effectively resetting the naval balance of power to zero and forcing other nations to build their own dreadnoughts to compete.",
        shelfmark: 'National Maritime Museum / Brassey’s Naval Warship Archives (1913 Edition)',
        citation:
          "Brassey's Naval Annual, British Warship Plans & Elevations, 1913 (London: J. Griffin & Co., p. 216)",
        context:
          'Launched in February 1906 under the direction of First Sea Lord Sir John Fisher, HMS Dreadnought was the most powerful warship ever built. Equipped with ten 12-inch guns in rotating turrets and powered by revolutionary steam turbine engines, she could steam at 21 knots—faster than any existing battleship—and fire a broadside twice as heavy as any vessel afloat. However, by rendering all pre-dreadnought battleships obsolete overnight, Britain inadvertently wiped out its own overwhelming naval lead. Kaiser Wilhelm II and Admiral Alfred von Tirpitz immediately seized the opportunity to match the Royal Navy by passing the German Naval Laws and building their own dreadnought fleet (the Nassau and Helgoland classes). **Hinge Question:** Why did building HMS Dreadnought represent both a crowning British technological triumph and a disastrous strategic gamble?',
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
          theme_heading: 'The Royal Navy and Splendid Isolation',
          text: "For a century, Great Britain ruled the oceans. The Royal Navy was the strongest fleet on earth. However, in 1898, Kaiser Wilhelm II decided to challenge British sea power. He began building a massive German battle fleet. In 1906, Britain launched a revolutionary warship named HMS Dreadnought. It was faster and more heavily armoured than any ship in history. Yet this super-battleship created an unexpected problem. It made all older battleships obsolete overnight. Britain's massive naval lead was instantly wiped out. Germany could now challenge Britain on equal terms to build dreadnoughts.",
          level_4:
            "For a century, Great Britain ruled the world's oceans. In 1898, Kaiser Wilhelm II began building a large German battle fleet to challenge Britain. In 1906, Britain launched a revolutionary warship called HMS Dreadnought. It was faster and more powerful than any battleship before it. However, it made all older battleships useless. Britain's huge lead in ships was wiped out, giving Germany a chance to catch up.",
        },
        {
          theme_heading: 'British Naval Dominance',
          text: "Following the Battle of Trafalgar in 1805, Great Britain dominated the world's oceans without challenge. Britain was an island nation with a vast global empire. It relied on naval supremacy to protect trade routes and defend its shores. Britain followed a strict policy called the Two-Power Standard. This rule stated that the Royal Navy must always be as large as the next two biggest navies combined. To British leaders, naval supremacy was essential for national survival.",
          level_4:
            'After defeating the French at Trafalgar in 1805, Great Britain dominated the seas. As an island empire, Britain needed a supreme navy to protect trade and food supplies. Britain followed the Two-Power Standard. This policy stated that the Royal Navy must be as large as the next two biggest navies combined.',
          tasks: [
            {
              type: 'comprehension',
              text: "Describe the 'Two-Power Standard' and explain why Great Britain adhered to this strict naval policy.",
              model_answer:
                'The Two-Power Standard was a strict British naval policy stating that the Royal Navy must always be at least equal to or larger than the next two most powerful navies in the world combined. Britain adhered to this to ensure absolute naval supremacy to protect its island shores and vast global empire.',
            },
          ],
        },
        {
          theme_heading: "Germany's Naval Challenge",
          text: 'Everything changed in 1898 when Kaiser Wilhelm II set out to build a powerful German navy. The Kaiser believed Germany required a great battle fleet to become a true world power. In 1898 and 1900, Germany passed the historic German Navy Laws. These laws ordered shipyards to build 19 battleships in the first law and 38 more in the second. Admiral Alfred von Tirpitz directed the build-up. He established the Navy League to build public support. This patriotic league organised shipyard tours and delivered lectures to inspire civilian enthusiasm.',
          level_4:
            'In 1898, Kaiser Wilhelm II set out to build a great German navy. Germany passed the German Navy Laws in 1898 and 1900 to order dozens of new battleships. Admiral Alfred von Tirpitz led this build-up. He set up the Navy League, organizing shipyard tours and patriotic lectures to win public support.',
          tasks: [
            {
              type: 'comprehension',
              text: 'Detail what the German Navy Laws of 1898 and 1900 explicitly ordered the German industrial shipyards to construct.',
              model_answer:
                'The German Navy Laws of 1898 and 1900 explicitly ordered the rapid construction of a massive fleet, specifically commanding the building of 19 battleships in the first law and an additional 38 in the second.',
            },
            {
              type: 'comprehension',
              text: "Explain how Admiral Tirpitz used the Navy League to manufacture civilian support and patriotism for Germany's expanding fleet.",
              model_answer:
                'Admiral Tirpitz established the Navy League, a massive organization that arranged civilian tours of industrial shipyards and delivered public lectures across Germany. This successfully stimulated intense public interest and built a fierce sense of patriotism and support among ordinary citizens.',
            },
            {
              type: 'comprehension',
              text: 'Explain why maintaining a massive navy was a matter of survival for Great Britain, but was viewed as a matter of status and power for Germany.',
              model_answer:
                "As an island nation with a global empire, Britain relied entirely on naval supremacy to protect its trade routes and defend its shores, making the navy a matter of national survival. In contrast, Germany was a land-based power; Kaiser Wilhelm II wanted a fleet to explicitly challenge British dominance and achieve the prestige of being a 'true world power'.",
            },
          ],
        },
        {
          theme_heading: 'British Fear German Navy',
          text: "British politicians were deeply alarmed by Germany's naval expansion. They believed the German High Seas Fleet was designed specifically to fight Britain. British leaders pointed out a fundamental difference between the two nations. For Britain, a massive navy was essential to secure food imports and trade. For Germany, a huge standing army already protected its borders on land. A German battle fleet seemed to Britain like a weapon created for war.",
          level_4:
            "British leaders were deeply worried by Germany's naval build-up. Britain needed a large navy to protect its island trade. Germany already had a huge army to protect its land borders. To British politicians, a German battle fleet looked like a weapon built for war.",
        },
        {
          theme_heading: 'Naval Arms Race Begins',
          text: "Britain responded to the German challenge by designing the ultimate warship. In 1906, Britain launched HMS Dreadnought. The ship possessed thick steel armour and ten heavy 12-inch guns in rotating turrets. It used steam turbine engines to travel faster than any rival battleship. The vessel was so advanced that it made all existing battleships obsolete overnight. However, this wiped out Britain's advantage. Germany immediately began building its own dreadnoughts, beginning with SMS Rheinland. By 1914, Germany had doubled its fleet, becoming the second-largest naval power in the world.",
          level_4:
            'Britain answered the German threat by building HMS Dreadnought in 1906. It had thick steel armour, ten 12-inch guns, and fast steam engines. It made all older battleships obsolete overnight. But this meant Germany could build new dreadnoughts and compete on equal terms. By 1914, Germany had the second-largest navy in the world.',
          tasks: [
            {
              type: 'comprehension',
              text: 'Identify three specific technological features of HMS Dreadnought that made it superior to all previous warships.',
              model_answer:
                'The HMS Dreadnought was vastly superior because of its increased speed, its advanced heavy armor plating, and its long-range rotating turrets. These features rendered all older battleships instantly obsolete.',
            },
          ],
        },
        {
          theme_heading: 'Preparing for Naval Standoff',
          text: 'This competitive naval race produced a tense standoff in the North Sea. The British Grand Fleet was stationed at its main base at Scapa Flow in northern Scotland. The German High Seas Fleet was based at Wilhelmshaven on the North Sea coast. Both navies prepared for a huge, decisive sea clash. To move its dreadnoughts rapidly between the Baltic and North Seas, Germany widened the Kiel Canal. This huge project was finished in 1914, just weeks before the outbreak of war.',
          level_4:
            'The naval arms race led to a tense standoff in the North Sea. The British Grand Fleet was based at Scapa Flow in Scotland. The German High Seas Fleet was stationed at Wilhelmshaven. Both navies prepared for a huge battle. Germany widened the Kiel Canal so dreadnoughts could move safely between the Baltic and North Seas.',
        },
        {
          theme_heading: 'Naval Power Shift',
          text: "Before 1906, Britain felt secure behind the Two-Power Standard. German shipyards struggled to match Britain's hundreds of older warships. However, launching HMS Dreadnought accidentally levelled the playing field. Because older warships no longer counted in battle, both empires were forced to restart the race from scratch.",
          level_4:
            'Before 1906, Britain held a huge lead in older warships. But HMS Dreadnought made older ships useless in modern warfare. This accidentally restarted the naval race from zero for both nations.',
        },
        {
          theme_heading: 'A Naval Revolution: The Super-Battleship',
          text: 'HMS Dreadnought was a triumph of British engineering. Its uniform battery of 12-inch guns could fire at extreme ranges. Its heavy armour resisted enemy shells, and its steam turbines delivered unmatched speed. Yet it contained a fatal strategic flaw. By showing that older warships were useless, Britain made its own huge fleet obsolete.',
          level_4:
            "HMS Dreadnought was a triumph of British engineering. Its ten heavy guns could destroy enemy ships at great distances. Its armour and steam turbines gave great protection and speed. However, it made Britain's existing fleet obsolete.",
        },
        {
          theme_heading: 'The Dreadnought Arms Race',
          text: "Germany seized this historic chance at once. The naval competition transformed into a contest to build modern dreadnought-class vessels. German shipyards worked day and night to rival British production. In Britain, alarmed citizens demanded more warships with the famous slogan: 'We want eight and we won't wait!' This bitter naval race drained national budgets and created toxic distrust between Britain and Germany.",
          level_4:
            "Germany jumped at the chance to build dreadnoughts. German shipyards worked night and day to match Britain. In Britain, the public demanded more ships with the slogan: 'We want eight and we won't wait!' The naval race cost huge amounts of money and created intense distrust.",
          tasks: [
            {
              type: 'comprehension',
              text: 'Explain how the launching of HMS Dreadnought in 1906 represented an industrial turning point in the naval arms race, rather than maintaining the status quo.',
              model_answer:
                "The HMS Dreadnought was so technologically advanced that it rendered all previous battleships obsolete. This effectively reset the naval arms race to zero; it wiped out Britain's numerical head start and allowed Germany to start building Dreadnought-class ships on an equal footing with Britain.",
            },
          ],
        },
        {
          title: 'Consolidation Task',
          tasks: [
            {
              type: 'extended_writing',
              question:
                'Explain why the naval race between Britain and Germany damaged their relations.',
              hints: [
                'Sentence Starter: The naval race damaged relations because Britain saw it as a direct threat to...',
                'Sentence Starter: For example, the launch of HMS Dreadnought in 1906 escalated the competition by...',
                'Sentence Starter: This resulted in widespread public fear in Britain and the belief that Germany was preparing for...',
              ],
            },
          ],
          text: '<h3>Consolidation Task</h3>',
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
          options: ['Kaiser Wilhelm II', 'Admiral Scheer', 'Admiral Hipper', 'Admiral von Tirpitz'],
        },
        {
          q: 'What policy dictated that the British Royal Navy must be as large as the next two largest navies combined?',
          a: 'Two-Power Standard',
          options: [
            'Splendid Isolation',
            'Dreadnought Rule',
            'Two-Power Standard',
            'Naval Supremacy Act',
          ],
        },
        {
          q: 'Why was the HMS Dreadnought completely revolutionary?',
          a: "It was faster, heavier armored, and had all 'big-guns'",
          options: [
            "It was faster, heavier armored, and had all 'big-guns'",
            'It could launch airplanes',
            'It was completely invisible to radar',
            'It was the first submarine',
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
            'Refusing to build any ships to avoid angering Britain',
            'Attacking Britain immediately',
            'Building only submarines',
            "Building a navy large enough that Britain wouldn't risk fighting it",
          ],
        },
        {
          q: 'What slogan did the British public chant in 1909 to demand more ships?',
          a: "'We want eight and we won't wait!'",
          options: [
            "'We want eight and we won't wait!'",
            "'Rule Britannia!'",
            "'More dreadnoughts now!'",
            "'Sink the Kaiser!'",
          ],
        },
        {
          q: 'Why did Britain feel so threatened by the German naval expansion?',
          a: 'Britain is an island and relied entirely on its navy for survival and trade',
          options: [
            'They had no army at all',
            'Britain is an island and relied entirely on its navy for survival and trade',
            'They wanted to attack Germany',
            'They were worried Germany would steal their ships',
          ],
        },
        {
          q: 'What laws were passed in Germany to fund their massive naval buildup?',
          a: 'The Naval Laws of 1898 and 1900',
          options: [
            'The Imperial Fleet Bills',
            'The Shipyard Acts',
            'The Naval Laws of 1898 and 1900',
            'The Tirpitz Decrees',
          ],
        },
        {
          q: 'By 1914, who had won the naval race?',
          a: "Britain, with 29 dreadnoughts to Germany's 17",
          options: [
            'They had exactly the same number',
            "Germany, with 30 dreadnoughts to Britain's 10",
            "Britain, with 29 dreadnoughts to Germany's 17",
            'France overtook both of them',
          ],
        },
        {
          q: 'How did the naval race affect British foreign policy?',
          a: "It forced Britain out of 'Splendid Isolation' and into an alliance with France and Russia",
          options: [
            'It made them give up their empire',
            "It forced Britain out of 'Splendid Isolation' and into an alliance with France and Russia",
            'It caused them to declare war on America',
            'It made them ally with Germany',
          ],
        },
      ],
    },
    {
      id: 'lesson_4',
      title: 'Did the Alliance System protect Europe or guarantee a global war?',
      sources: [
        {
          title: 'Diagram A: The European Alliance System Matrix (1879–1914)',
          src: '/units/great_war/assets/alliance_system.svg',
          caption:
            'Curriculum analytical matrix mapping the interlocking bilateral and multilateral mutual defence pacts dividing Europe into the Triple Alliance and Triple Entente.',
          shelfmark: 'Curriculum Analytical Diagram',
          citation:
            'Curriculum analytical diagram mapping the bilateral and multilateral mutual defence pacts (1879–1914).',
          context:
            "Between the Dual Alliance of 1879 and the Anglo-Russian Convention of 1907, Europe gradually crystallized into two armed camps: the Triple Alliance (Germany, Austria-Hungary, Italy) and the Triple Entente (Britain, France, Russia). While statesmen argued that balance-of-power alliances would deter any single power from risking war, the system removed flexibility. Each power felt bound to support its ally even in reckless ventures—such as Germany backing Austria-Hungary with the 'blank cheque'—for fear of losing its only partner and facing encirclement. **Hinge Question:** Why did the formation of the Triple Entente convince German military planners that war was inevitable sooner rather than later?",
        },
        {
          title: 'Map A: European Military Alliance Blocs & Ethno-National Minorities (1914)',
          src: '/units/great_war/assets/map_lesson4.png',
          caption:
            'Geopolitical reference map of Europe in 1914 showing the central bloc of the Central Powers (brown) surrounded by the Triple Entente (green), highlighting the volatile ethnic fault lines within Austria-Hungary.',
          question:
            'Enquiry: Look at the geographical position of Germany and Austria-Hungary. Why would they feel encircled by the Triple Entente?',
          shelfmark: 'Curriculum Reference Cartography',
          citation:
            'Curriculum reference map illustrating the Triple Entente and Central Powers European military alliance blocs in 1914.',
          context:
            'This map illustrates the profound strategic vulnerability felt in Berlin and Vienna. Positioned in the center of Europe, Germany and Austria-Hungary faced a two-front war against France in the west and the Russian Empire in the east. At the same time, Austria-Hungary was an empire of eleven distinct nationalities (Germans, Hungarians, Czechs, Slovaks, Poles, Ukrainians, Croats, Serbs, Slovenes, Romanians, and Italians), many of whom yearned for independence. If Serbia succeeded in uniting South Slavs, Austria-Hungary would disintegrate. This internal fragility made Austro-Hungarian leaders desperate to crush Serbian nationalism once and for all. **Hinge Question:** How did the internal ethnic instability of Austria-Hungary make its alliance with Germany extraordinarily dangerous for European peace?',
        },
      ],
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
      primary_source: {
        title:
          "Source A: Nelson Harding’s Editorial Cartoon — 'The Chain of Friendship' (July 1914)",
        src: '/units/great_war/assets/was_military_matrix.png',
        caption:
          'Editorial cartoon published in the Brooklyn Daily Eagle (July 1914) satirising how the rigid system of European treaty obligations dragged one nation after another into war.',
        question:
          'Enquiry: Study the intertwined hands and figures in this cartoon. What does it suggest about how a local conflict might spread?',
        tasks: [
          {
            type: 'draw',
            text: 'Task 1: Identify which figure represents Germany and explain how you know.',
            model_answer:
              'The large, aggressive figure second from the right, wearing the spiked Pickelhaube helmet, represents Germany threatening Russia.',
          },
          {
            type: 'written',
            text: 'Task 2: Draw an arrow to the figure representing Russia and annotate why they are getting involved.',
            model_answer:
              'Russia (the third figure from the left) is getting involved to protect its smaller Slavic ally, Serbia, from being crushed by Austria-Hungary.',
          },
        ],
        model_answer:
          "The intertwined hands and figures demonstrate how the alliance system acted as a deadly chain reaction. It suggests that if one smaller nation (like Serbia) is attacked, its larger allies (like Russia) are bound by treaties to defend it. This pulls in the attacker's allies (like Germany), guaranteeing that a localized conflict in the Balkans would instantly escalate into a massive, continent-wide war.",
        shelfmark: 'Library of Congress Prints & Photographs LC-USZ62-114782',
        citation:
          "Nelson Harding, 'The Chain of Friendship', Brooklyn Daily Eagle, July 1914 (Reprinted across American newspapers)",
        context:
          "Created in July 1914 as the Austro-Hungarian ultimatum expired, this classic cartoon portrays the major powers of Europe as a line of men ready to strike each other. Serbia is confronted by Austria-Hungary ('If you touch me I'll—'), who is threatened by Russia ('If you make a move I'll—'), who is threatened by Germany ('If you strike my friend I'll—'), who is confronted by France and Britain. The cartoon illustrates how defensive treaties, originally negotiated to deter aggression through mutual defense, instead functioned as a lethal tripwire mechanism that converted a regional Balkan clash into an uncontrollable world war. **Hinge Question:** Does Harding's cartoon portray the European leaders as calculated aggressors or as helpless prisoners of their own treaties?",
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
      ],
      narrative_blocks: [
        {
          theme_heading: 'The Armed Camps of Europe',
          text: "By 1914, Europe was divided into two hostile armed camps. On 5 July 1914, Kaiser Wilhelm II issued the famous 'Blank Cheque' to Austria-Hungary. This was an unconditional promise of total German military backing against Serbia. Historians still debate why Germany gave this reckless promise. Some argue the Kaiser acted out of personal loyalty to his murdered friend. Others argue the German High Command used the crisis to force a war. German generals feared that Russia's army was modernising rapidly. They believed that if war was coming, Germany must strike before Russia grew too strong.",
          level_4:
            "By 1914, Europe was split into two hostile armed camps. On 5 July 1914, Germany gave Austria-Hungary the 'Blank Cheque'—a promise of total military support against Serbia. Some historians argue Kaiser Wilhelm acted out of loyalty to his murdered friend. Others argue the German High Command wanted a war in 1914 before Russia's army grew too strong.",
        },
        {
          theme_heading: "Europe's Alliance System",
          text: 'As European empires expanded, rival nations grew suspicious of each other. European leaders looked for ways to protect their borders from sudden attack. Their main strategy was to sign binding military alliances. Over several decades, Europe was carved into two heavily armed, opposing camps. Instead of creating lasting peace, this web of treaties created a dangerous trap.',
          level_4:
            'As European empires expanded, nations grew worried about sudden attacks. To protect themselves, countries signed military alliances. Over time, Europe was divided into two armed camps. Instead of preventing war, these alliances created a dangerous trap.',
        },
        {
          theme_heading: "Europe's Two Alliances",
          text: 'By 1907, the alliance system had split Europe into two rival groups. On one side stood the Triple Alliance, formed in 1882 by Germany, Austria-Hungary, and Italy. On the opposing side was the Triple Entente, uniting Great Britain, France, and Russia. Diplomats argued that this balance of power would keep the peace. Their logic was simple. Attacking one nation would trigger an immediate war against all its allies. Leaders believed no country would be foolish enough to start such a terrible conflict.',
          level_4:
            'By 1907, Europe was divided into two alliance systems. The Triple Alliance included Germany, Austria-Hungary, and Italy. The Triple Entente included Britain, France, and Russia. Diplomats hoped this balance of power would stop war, because an attack on one nation meant fighting the entire group.',
          tasks: [
            {
              type: 'comprehension',
              text: 'Identify the specific member countries that made up the Triple Alliance and the Triple Entente by 1907.',
              model_answer:
                'By 1907, the Triple Alliance consisted of Germany, Austria-Hungary, and Italy. The opposing Triple Entente united Great Britain, France, and Russia.',
            },
            {
              type: 'comprehension',
              text: 'Explain the diplomatic logic of how the alliance system was theoretically supposed to keep European nations safe from a outbreak of war.',
              model_answer:
                'The diplomatic logic was that going to war against just one member of an alliance would instantly trigger a massive war against the entire opposing bloc. Politicians believed that the sheer terror of such a massive conflict would prevent anyone from being reckless enough to start a war, thereby keeping everyone safe.',
            },
          ],
        },
        {
          theme_heading: 'German Fears and War Plans',
          text: "However, the alliance system bred deep fear rather than safety. German leaders viewed the Triple Entente as a hostile ring designed to encircle Germany. Crucially, military leaders like Austria's Conrad von Hötzendorf believed a European war was inevitable and necessary. German generals feared that Russia was building railways and modernising its army at rapid speed. They believed Germany must fight before Russia became unbeatable. This fear drove the Schlieffen Plan. This plan aimed to defeat France in six weeks before turning east to face Russia.",
          level_4:
            'The alliance system caused suspicion and fear. Germany felt surrounded by enemies, a fear called encirclement. Military leaders like Conrad von Hötzendorf in Austria believed war was inevitable. German generals feared that Russia was modernising rapidly and building railways. They believed Germany should fight before Russia became too strong, using the Schlieffen Plan to defeat France first.',
          tasks: [
            {
              type: 'comprehension',
              text: 'According to Germany\'s military leaders, explain why a European war was considered "inevitable and necessary" rather than avoidable.',
              model_answer:
                "German military leaders believed that Russia's rapid industrialization and military growth would soon make Russia too powerful to defeat. Therefore, they viewed a massive European war as inevitable and felt it was necessary to launch a preventative war immediately to crush their enemies before Russia became overwhelmingly strong.",
            },
          ],
        },
        {
          theme_heading: "Europe's Industrial War Machine",
          text: 'At the same time, European factories fueled a massive arms race on land. Between 1906 and 1914, German steel production surged to over 17 million tonnes, far outpacing Britain and France. Steel mills forged heavy artillery, machine guns, and millions of rifle shells. Thousands of miles of new railway tracks were laid across Europe. These tracks allowed armies to move hundreds of thousands of troops to the front line in days. Europe had become a powder keg waiting for a single spark.',
          level_4:
            'European factories fueled a massive arms race on land. German steel production jumped to over 17 million tonnes, far more than Britain and France. Steel was used for artillery and machine guns. New railway networks allowed armies to move hundreds of thousands of soldiers to the border in days. Europe became a powder keg waiting for a spark.',
          tasks: [
            {
              type: 'comprehension',
              text: 'Detail how the massive expansion of steel production and railway tracks across Europe altered the speed and scale of army mobilization.',
              model_answer:
                'The massive expansion of steel production allowed countries to forge huge quantities of heavy artillery and armaments. Simultaneously, millions of kilometers of railway tracks were laid down, allowing nations to mobilize and transport hundreds of thousands of soldiers to the front lines within mere hours of a crisis.',
            },
            {
              type: 'extended_writing',
              text: 'Explain how the transformation of Europe into two "armed camps" by 1914 represented a dangerous change in international relations compared to the traditional balance of power. <br><br><em>Use the <abbr title="Identify, Describe, Explain, Analyse">IDEA framework</abbr> to structure your response.</em>',
              model_answer:
                'Unlike the traditional balance of power where conflicts remained localized, dividing Europe into two heavily armed, rigid camps turned the continent into a highly volatile powder keg. This meant that any small, local dispute could act as a spark that would automatically drag all the Great Powers into a massive global war.',
            },
          ],
        },
        {
          theme_heading: "Germany's Blank Check",
          text: "In July 1914, that spark arrived in the Balkans. Following the assassination of Archduke Franz Ferdinand, Austria-Hungary wanted to crush Serbia. However, Austrian leaders feared that Russia would step in to protect Serbia. To act safely, Austria needed a guarantee of German backing. On 5 July 1914, Kaiser Wilhelm II gave Austria-Hungary the 'Blank Cheque'. This was a promise of unconditional support, even if war broke out with Russia.",
          level_4:
            "After Archduke Franz Ferdinand was assassinated, Austria-Hungary wanted to crush Serbia. But Austria feared Russia would protect Serbia. On 5 July 1914, Kaiser Wilhelm II gave Austria the 'Blank Cheque'. This was an unconditional promise of German military support.",
        },
        {
          theme_heading: "Kaiser's Motives",
          text: "The 'Blank Cheque' remains one of the most debated actions in modern history. Some historians argue the Kaiser acted impulsively out of friendship. They note that Wilhelm went on a sailing holiday right after making the promise. This suggests he did not expect a world war to erupt.",
          level_4:
            "Historians still debate the 'Blank Cheque'. Some believe Kaiser Wilhelm acted impulsively out of loyalty. He went on a sailing holiday right afterwards, showing he did not expect a global war.",
        },
        {
          theme_heading: "Germany's Calculated War",
          text: "However, other historians argue that the German High Command deliberately pushed Austria into war. German generals knew Russia's military was growing stronger every month. If a major European war was inevitable, they wanted to fight it in 1914 rather than wait. By giving Austria unconditional support, Germany ensured the crisis would explode into a total European war.",
          level_4:
            'Other historians argue that German generals used the Blank Cheque to start a war. They believed Russia was growing stronger every year. If war was coming, they wanted to fight in 1914. Giving Austria total support ensured the crisis would lead to war.',
        },
        {
          title: 'Consolidation Task',
          tasks: [
            {
              type: 'extended_writing',
              question:
                'Explain how the Alliance System contributed to the outbreak of the First World War.',
              hints: [
                'Sentence Starter: The Alliance System contributed to the war by dividing Europe into two armed camps...',
                'Sentence Starter: For example, if one country was attacked, its allies were obligated to...',
                'Sentence Starter: This resulted in a local conflict in the Balkans rapidly escalating into a...',
              ],
            },
          ],
          text: '<h3>Consolidation Task</h3>',
        },
      ],
      quiz: [
        {
          q: 'Which three countries formed the Triple Entente in 1907?',
          a: 'Britain, France, Russia',
          options: [
            'Britain, France, Russia',
            'Britain, France, Italy',
            'Germany, Austria-Hungary, Italy',
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
            'Germany, Austria-Hungary, Italy',
            'Germany, Ottoman Empire, Italy',
          ],
        },
        {
          q: 'Which three countries formed the Triple Entente by 1907?',
          a: 'Britain, France, Russia',
          options: [
            'Britain, USA, France',
            'Germany, Austria-Hungary, Italy',
            'France, Russia, Italy',
            'Britain, France, Russia',
          ],
        },
        {
          q: 'What was a major flaw of the alliance system?',
          a: 'A small dispute between two nations could drag all major powers into war',
          options: [
            'It made the armies too small',
            'A small dispute between two nations could drag all major powers into war',
            'It forced countries to disarm',
            'It prevented any trade between the blocs',
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
            'An agreement to build dreadnoughts together',
            'A military alliance between Germany and Russia',
            'A peace treaty ending a war',
            'A friendly agreement between Britain and France, settling colonial disputes',
          ],
        },
        {
          q: 'Why did Britain finally decide to form alliances?',
          a: "They felt threatened by Germany's growing navy and aggressive Weltpolitik",
          options: [
            "They felt threatened by Germany's growing navy and aggressive Weltpolitik",
            'They wanted to conquer Europe',
            'They needed money from Russia',
            'They were invaded by France',
          ],
        },
        {
          q: "What does 'Weltpolitik' mean?",
          a: "World policy (Germany's desire for a global empire)",
          options: [
            'Peaceful co-existence',
            'Naval supremacy',
            "World policy (Germany's desire for a global empire)",
            'Splendid isolation',
          ],
        },
        {
          q: "Which nation in the Triple Alliance was seen as the 'weak link'?",
          a: 'Italy',
          options: ['Austria-Hungary', 'Italy', 'Germany', 'Britain'],
        },
      ],
    },
    {
      id: 'lesson_5',
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
      ],
      sources: [
        {
          title: 'Diagram A: The July Crisis Domino Sequence (1914)',
          src: '/units/great_war/assets/july_crisis.svg',
          caption:
            'Curriculum causal flowchart illustrating the thirty-seven days of escalating ultimatums and mobilisations following the assassination of Archduke Franz Ferdinand.',
          shelfmark: 'Curriculum Analytical Flowchart',
          citation:
            'Curriculum causal chronology tracing the escalation of the July Crisis from the Sarajevo assassination to the outbreak of war.',
          context:
            "The assassination of Franz Ferdinand on 28 June 1914 did not immediately cause war. For three weeks, European diplomacy seemed normal. But behind the scenes, Austria-Hungary secured a 'blank cheque' of unconditional support from Germany on 5 July, and on 23 July issued an impossible 48-hour ultimatum to Serbia. When Serbia accepted nine of the ten points but rejected Austro-Hungarian officials running investigations inside Serbia, Austria declared war on 28 July and bombarded Belgrade. Russia mobilized to protect Serbia; Germany declared war on Russia and France; and Germany's invasion of neutral Belgium on 4 August triggered Britain's entry into the war. **Hinge Question:** At which specific point during the July Crisis could the escalation to a world war have been averted?",
        },
        {
          title: 'Map A: The Balkan Peninsula & The Frontiers of 1914',
          src: '/units/great_war/assets/balkans_1914_simple_map.png',
          caption:
            'Cartographic reference map showing the expansion of Serbia and the Balkan states following the Balkan Wars of 1912–13, bordering the Austro-Hungarian provinces of Bosnia and Herzegovina.',
          shelfmark: 'Curriculum Reference Cartography',
          citation:
            'Historical reference cartography illustrating the borders of Serbia, Bulgaria, Greece, and Ottoman Thrace following the Balkan Wars (1912–13).',
          context:
            "Known as the 'powder keg of Europe', the Balkan Peninsula was the meeting point of three decaying empires: the Ottoman Empire, the Austro-Hungarian Empire, and the Russian Empire. The annexation of Bosnia and Herzegovina by Austria-Hungary in 1908 provoked deep outrage in Serbia, which hoped to unite all South Slavic peoples into a Greater Serbia. Russia, humiliated by having to back down during the 1908 Bosnian Crisis, vowed never to abandon Serbia again. By 1914, Serbia's military victories in the Balkan Wars made it appear as a grave mortal danger to Austria-Hungary's southern frontier. **Hinge Question:** Why did the geographical expansion of Serbia in 1912–13 terrify Austro-Hungarian leaders in Vienna?",
        },
        {
          title: 'Map B: Forensic Crime Scene Plan — Sarajevo, 28 June 1914: The Fatal Route',
          src: '/units/great_war/assets/map_sarajevo_route.jpg',
          caption:
            "Historical schematic plan of the Franz Josef Street intersection along the Appel Quay, marking the positions of the assassins and the fateful wrong turn taken by the Archduke's chauffeur.",
          shelfmark: 'Historical Forensic Plan',
          citation:
            'Historical schematic crime scene plan of Franz Josef Street and Appel Quay, Sarajevo (28 June 1914).',
          context:
            "This forensic map was compiled by the Sarajevo police following the assassination of Archduke Franz Ferdinand and his wife Sophie. The route followed the Appel Quay along the Miljacka River. After an initial bomb thrown by Nedeljko Čabrinović bounced off the car and exploded behind them, the Archduke decided to visit wounded officers in hospital. Crucially, the motorcade's Czech chauffeur, Leopold Lojka, was never informed of the change of route. When Lojka mistakenly turned right onto Franz Josef Street, Governor Potiorek shouted at him to stop. Lojka braked directly in front of Schiller's delicatessen, where nineteen-year-old Gavrilo Princip was standing just five feet away. Princip drew his Browning FN Model 1910 semi-automatic pistol and fired two shots that ignited the First World War. **Hinge Question:** How does the police sketch map demonstrate the role of pure chance versus careful terrorist conspiracy in the assassination of Franz Ferdinand?",
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
      primary_source: {
        title:
          "Source A: Leonard Raven-Hill’s Satirical Cartoon — 'The Boiling Point' (Punch Magazine, 2 October 1912)",
        src: '/units/great_war/assets/was_boiling_point.png',
        caption:
          "Leonard Raven-Hill's celebrated 1912 cartoon depicting European emperors and statesmen struggling to sit on the lid of the boiling cauldron of 'Balkan Troubles'.",
        question:
          "Enquiry: Look at the men sitting on the 'Balkan Troubles' pot. What are they desperately trying to prevent?",
        tasks: [
          {
            type: 'draw',
            text: 'Task 1: Draw an arrow to the figure representing Austria-Hungary and label what its main fear was regarding the Balkans.',
            model_answer:
              "(Draw an arrow to the Austro-Hungarian figure on the lid. Label: 'Fearful that rising Balkan nationalism and Slavic independence movements would cause their multi-ethnic empire to collapse.')",
          },
          {
            type: 'draw',
            text: 'Task 2: Circle the steam escaping from the pot and annotate what specific short-term force this steam represents.',
            model_answer:
              "(Circle the steam. Annotation: 'The steam represents the explosive, short-term tension of the July Crisis and the assassination of Archduke Franz Ferdinand.')",
          },
        ],
        model_answer:
          "The men represent the leaders of the European Great Powers, and they are desperately trying to prevent the 'Balkan Troubles' pot from boiling over. This symbolizes their efforts to contain the explosive ethnic and nationalistic tensions in the Balkans, knowing that if the region erupted into conflict, the rigid alliance system would drag all of their empires into a catastrophic global war.",
        shelfmark: 'Punch Historical Archive, Vol. 143, p. 273',
        citation:
          "Leonard Raven-Hill, 'The Boiling Point', Punch, or the London Charivari, 2 October 1912",
        context:
          "Published during the First Balkan War in autumn 1912, Raven-Hill's cartoon personifies the Balkans as a violently bubbling cauldron of nationalism and ethnic conflict. The leaders of Britain, Germany, France, Russia, and Austria-Hungary are shown perched precariously on the cauldron lid, desperate to contain the explosive steam before it blows Europe apart. By 1914, two successive Balkan Wars had doubled the territory of Serbia, emboldened radical Slavic nationalist societies like the Black Hand, and left Austria-Hungary determined to crush Serbia before it could destabilize the Habsburg crown lands of Bosnia. **Hinge Question:** What visual symbols does Raven-Hill use to indicate that the Great Powers' attempt to contain the Balkan crisis was unsustainable?",
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
          theme_heading: 'The Powder Keg of Europe',
          text: "The Balkans region in south-east Europe was known as the 'powder keg of Europe'. It had long been ruled by the Turkish Ottoman Empire. As Ottoman power weakened, new independent nations emerged. These young Balkan states fought bitter local wars for territory. The area was filled with intense nationalism, ethnic hatred, and military rivalry.",
          level_4:
            "The Balkans in south-east Europe was known as the 'powder keg of Europe'. As the Ottoman Empire lost control, young Balkan nations fought wars over land. The region was full of ethnic hatred, nationalism, and tension.",
        },
        {
          theme_heading: 'Austro-Hungarian Fears of Serbia',
          text: 'For the neighbouring Austro-Hungarian Empire, Slavic nationalism was a deadly threat. Austria-Hungary was a vast empire made of many different nationalities. Its leaders feared that if Serbia grew strong, the millions of Serbs living inside Austrian borders would rebel. In 1908, Austria caused outrage by annexing Bosnia and Herzegovina. Furious Serbian army officers formed a secret terrorist society called the Black Hand. They swore to unite all South Slavs by force.',
          level_4:
            'Austria-Hungary feared Serbian nationalism. Austria-Hungary contained many different nationalities that wanted freedom. In 1908, Austria annexed Bosnia and Herzegovina, angering Serbs. Serbian officers formed the Black Hand, a secret group that used terror to unite all Serbs.',
          tasks: [
            {
              type: 'comprehension',
              text: 'Explain why the rise of independent Balkan states and Serbian nationalism represented a catastrophic nightmare for the Austro-Hungarian Empire.',
              model_answer:
                'Austria-Hungary was a vast empire containing many different nationalities. Its politicians feared that if Serbian nationalism rose unchecked, the millions of Serbs living inside Austro-Hungarian borders would rebel, causing the entire empire to collapse.',
            },
          ],
        },
        {
          theme_heading: "Archduke Franz Ferdinand's Royal Visit",
          text: 'By June 1914, Balkan tensions were ready to explode. Archduke Franz Ferdinand was the heir to the Austro-Hungarian throne. He scheduled a royal visit to Sarajevo, the capital of Bosnia. The date was 28 June—a sacred national day for Serbs. The visit was widely reported in newspapers. The Black Hand knew the exact route. Six young assassins lined the riverfront Appel Quay armed with pistols and bombs.',
          level_4:
            'Archduke Franz Ferdinand was the heir to the throne of Austria-Hungary. On 28 June 1914, he visited Sarajevo, the capital of Bosnia. The Black Hand knew his route along Appel Quay. Six young assassins waited with guns and bombs.',
        },
        {
          theme_heading: 'A Fateful Wrong Turn',
          text: 'At first, the assassination plot failed completely. One terrorist lost his nerve. Another felt pity and went home. A third threw a grenade that bounced off the royal car and wounded officers behind. Franz Ferdinand was furious. He decided to visit the wounded officers in hospital. However, the driver took a fatal wrong turn onto Franz Josef Street. When the driver realized his error, he stopped the car and tried to reverse.',
          level_4:
            'The first bomb bounced off the royal car and wounded officers behind. Franz Ferdinand decided to visit the wounded officers in hospital. But the driver took a wrong turn onto Franz Josef Street. When the driver stopped to reverse, the car halted right in front of assassin Gavrilo Princip.',
          tasks: [
            {
              type: 'comprehension',
              text: 'Detail how the structural failure of the first bomb plot inadvertently led to the exact scenario where Gavrilo Princip was able to shoot the Archduke.',
              model_answer:
                'The first assassin threw a bomb that bounced off the car and exploded behind them. Because of this, the driver later changed the route to visit the injured in the hospital. However, the driver took a wrong turn and stopped the car to reverse right in front of where Gavrilo Princip was standing, giving him a point-blank shot.',
            },
          ],
        },
        {
          theme_heading: "Gavrilo Princip's Fatal Shots",
          text: 'The open-top car stopped right in front of nineteen-year-old Gavrilo Princip. Seizing his chance, the Black Hand assassin stepped forward. He fired two shots at point-blank range. One bullet hit the Archduke in the neck. The second bullet struck his wife, Sophie, in the stomach. Both died within minutes.',
          level_4:
            'Gavrilo Princip stepped forward and fired two shots at the open car. One bullet hit the Archduke in the neck. The other hit his wife, Sophie, in the stomach. Both died within minutes.',
        },
        {
          theme_heading: 'The Road to Global War',
          text: "This local double-murder triggered a rapid countdown to world war. Backed by Germany's 'Blank Cheque', Austria-Hungary issued a harsh ultimatum to Serbia. On 28 July 1914, Austria declared war and shelled Belgrade. Russia mobilized its massive army to defend Serbia. Germany then declared war on Russia and France. To invade France quickly, German troops marched into neutral Belgium. Britain had promised to protect Belgium in the 1839 Treaty of London. On 4 August 1914, Britain declared war on Germany.",
          level_4:
            "The assassination triggered the First World War. Backed by Germany's Blank Cheque, Austria declared war on Serbia on 28 July. Russia mobilized its army to protect Serbia. Germany declared war on Russia and France. When Germany invaded neutral Belgium, Britain entered the war on 4 August 1914 under the 1839 Treaty of London.",
          tasks: [
            {
              type: 'comprehension',
              text: 'Outline the chronological sequence of events from July 23 to August 4, 1914, that transformed a local Balkan assassination into a total European war.',
              model_answer:
                'Austria-Hungary issued a harsh ultimatum to Serbia on July 23, declaring war on July 28. Russia mobilised its army to defend Serbia. Germany declared war on Russia, and then invaded neutral Belgium to attack France. This forced Britain to declare war on Germany on August 4.',
            },
          ],
        },
        {
          theme_heading: 'The July Crisis: Descent into War',
          text: 'The 37 days between the Sarajevo murder and the outbreak of war are called the July Crisis. During this tense month, diplomats and rulers scrambled to prevent a catastrophe. The tragic reality of the July Crisis is how close Europe came to stopping the disaster.',
          level_4:
            'The 37 days between the assassination and the outbreak of war are called the July Crisis. During this time, European diplomats tried desperately to prevent a full-scale war.',
        },
        {
          theme_heading: "The Cousins' Failed Peace",
          text: "The most famous peace effort was the 'Willy-Nicky Telegrams'. Kaiser Wilhelm II and Tsar Nicholas II were cousins. They sent urgent, personal telegrams pleading with each other to stop army mobilizations. However, neither monarch dared to halt their troops first. Each feared being left defenseless if the other attacked.",
          level_4:
            "Kaiser Wilhelm II and Tsar Nicholas II of Russia were cousins. They sent the 'Willy-Nicky Telegrams', pleading with each other to stop military preparations. But neither leader dared to stop first, fearing defeat.",
          tasks: [
            {
              type: 'comprehension',
              text: "What does the desperate tone of the 'Willy-Nicky Telegrams' reveal about the monarchs' control over the escalating July Crisis?",
              model_answer:
                'The telegrams reveal that both Kaiser Wilhelm and Tsar Nicholas desperately wanted to avoid war but felt completely trapped. They were too afraid to stop their military mobilizations in case the other attacked, showing that civilian leaders had lost control to their military generals.',
            },
          ],
        },
        {
          theme_heading: 'Generals in Control',
          text: "Ultimately, civilian politicians lost control to military generals. War plans like Germany's Schlieffen Plan depended on strict railway timetables. Once mobilization began, the generals insisted it could not be stopped. The alliance system acted like a giant doomsday machine, pulling every Great Power into the abyss.",
          level_4:
            "Civilian leaders lost control to military generals. War plans like Germany's Schlieffen Plan depended on strict railway schedules. Once armies began moving, the generals refused to stop. The alliance system dragged all the Great Powers into war.",
          tasks: [
            {
              type: 'comprehension',
              text: "Explain why it is historically inaccurate to describe the First World War strictly as a 'European' conflict in 1914.",
              model_answer:
                "Because of the aggressive 'Scramble for Colonies' by European empires, millions of colonized people across Africa, Asia, and the Middle East were dragged into the conflict to fight and provide labour, making it a truly global war.",
            },
          ],
        },
        {
          theme_heading: 'Colonies Join the Conflict',
          text: 'When war began in 1914, it was never just a European conflict. Because of imperial expansion across Africa and Asia, millions of colonial soldiers were pulled into the fighting. Without the courage and sacrifice of these colonial troops, the European empires could not have fought the war.',
          level_4:
            'The war quickly became global. Because European powers had vast overseas empires, millions of colonial soldiers from Africa and Asia were brought to fight. Their courage and sacrifice helped keep the empires alive.',
        },
        {
          theme_heading: 'The Falling Dominoes: Europe at War',
          text: '<div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #cbd5e1; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin: 20px 0;"><img src="./assets/july_crisis.svg" style="width: 100%; max-width: 350px; display: block; margin: 0 auto;" alt="The July Crisis (1914) - The Domino Effect"></div>',
          level_4:
            '<div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #cbd5e1; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin: 20px 0;"><img src="./assets/july_crisis.svg" style="width: 100%; max-width: 350px; display: block; margin: 0 auto;" alt="The July Crisis (1914) - The Domino Effect"></div>',
        },
        {
          title: 'Consolidation Task',
          tasks: [
            {
              type: 'extended_writing',
              question:
                'Explain why the assassination of Archduke Franz Ferdinand led to the outbreak of the First World War.',
              hints: [
                'Sentence Starter: The assassination led to war because it provided Austria-Hungary with the perfect excuse to...',
                'Sentence Starter: For example, Austria-Hungary issued an impossible ultimatum to Serbia, knowing that...',
                'Sentence Starter: This resulted in the activation of the alliance system, drawing Russia and then Germany into the...',
              ],
            },
          ],
          text: '<h3>Consolidation Task</h3>',
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
          options: ['The White Rose', 'The Red Guards', 'Young Bosnia', 'The Black Hand'],
        },
        {
          q: 'On what exact date was the Archduke assassinated?',
          a: '28 June 1914',
          options: ['28 June 1914', '28 July 1914', '4 August 1914', '11 November 1918'],
        },
        {
          q: 'Which empire had annexed Bosnia in 1908, angering Serbian nationalists?',
          a: 'Austria-Hungary',
          options: ['Germany', 'Austria-Hungary', 'The Ottoman Empire', 'Russia'],
        },
        {
          q: 'Who was the heir to the Austro-Hungarian throne that visited Sarajevo?',
          a: 'Archduke Franz Ferdinand',
          options: [
            'Kaiser Wilhelm II',
            'Tsar Nicholas II',
            'Archduke Franz Ferdinand',
            'Emperor Franz Joseph',
          ],
        },
        {
          q: 'What terrorist group supplied the assassins with weapons?',
          a: 'The Black Hand',
          options: ['The Red Army', 'The Serbian Guard', 'Young Bosnia', 'The Black Hand'],
        },
        {
          q: 'What was the first, failed assassination attempt on the Archduke that morning?',
          a: 'A bomb was thrown at his car but bounced off',
          options: [
            'A bomb was thrown at his car but bounced off',
            'He was shot at but missed',
            'A bridge was blown up',
            'His driver was poisoned',
          ],
        },
        {
          q: "Why was Gavrilo Princip standing outside Schiller's Delicatessen when the Archduke's car stopped?",
          a: 'By total coincidence, the driver took a wrong turn and stalled the car right in front of him',
          options: [
            'The police ordered the car to stop there',
            'By total coincidence, the driver took a wrong turn and stalled the car right in front of him',
            'Princip had planned the exact route',
            'The Archduke went in to buy a sandwich',
          ],
        },
        {
          q: "What was the 'Blank Cheque'?",
          a: "Germany's promise of unconditional support to Austria-Hungary against Serbia",
          options: [
            'A peace offer from Russia',
            'A bribe paid to the assassins',
            "Germany's promise of unconditional support to Austria-Hungary against Serbia",
            'The money used to buy the guns',
          ],
        },
        {
          q: 'What happened on July 23, 1914?',
          a: 'Austria-Hungary sent an impossibly harsh ultimatum to Serbia',
          options: [
            'Russia declared war',
            'Germany invaded Belgium',
            'Britain joined the war',
            'Austria-Hungary sent an impossibly harsh ultimatum to Serbia',
          ],
        },
        {
          q: 'Why did Britain declare war on Germany on August 4, 1914?',
          a: 'Germany invaded neutral Belgium, violating the 1839 Treaty of London',
          options: [
            'Germany invaded neutral Belgium, violating the 1839 Treaty of London',
            'Because Germany sank a British ship',
            'Because of the assassination in Sarajevo',
            'Because France surrendered',
          ],
        },
      ],
    },
  ],
  quizPack: [
    {
      q: 'In what year did the Franco-Prussian War end?',
      a: '1871',
      options: ['1890', '1914', '1871', '1882'],
      id: 'gw_q1',
    },
    {
      q: 'Which wealthy region did Germany take from France in 1871?',
      a: 'Alsace-Lorraine',
      options: ['Alsace-Lorraine', 'The Sudetenland', 'The Rhineland', 'The Ruhr Valley'],
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
        'A British naval blockade',
        'A war on two fronts (Encirclement)',
        'The collapse of Austria-Hungary',
      ],
      id: 'gw_q5',
    },
    {
      q: 'Which two countries did Bismarck fear would ally against Germany?',
      a: 'France and Russia',
      options: [
        'Russia and Austria-Hungary',
        'Britain and Russia',
        'Britain and France',
        'France and Russia',
      ],
      id: 'gw_q6',
    },
    {
      q: 'What was the secret 1887 agreement between Germany and Russia?',
      a: 'The Reinsurance Treaty',
      options: [
        'The Treaty of London',
        'The Reinsurance Treaty',
        'The Dual Alliance',
        'The Entente Cordiale',
      ],
      id: 'gw_q7',
    },
    {
      q: 'Which ambitious German Emperor dismissed Bismarck in 1890?',
      a: 'Kaiser Wilhelm II',
      options: [
        'Kaiser Wilhelm II',
        'Kaiser Wilhelm I',
        'Tsar Nicholas II',
        'Archduke Franz Ferdinand',
      ],
      id: 'gw_q8',
    },
    {
      q: "What was Wilhelm II's aggressive global policy called?",
      a: 'Weltpolitik (World Policy)',
      options: ['Lebensraum', 'Realpolitik', 'Splendid Isolation', 'Weltpolitik (World Policy)'],
      id: 'gw_q9',
    },
    {
      q: "What previous policy of Bismarck's focused on European peace?",
      a: 'Realpolitik',
      options: ['Realpolitik', 'Pan-Slavism', 'Mitteleuropa', 'Weltpolitik (World Policy)'],
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
      options: ['Sudan', 'Egypt', 'Morocco', 'South Africa'],
      id: 'gw_q12',
    },
    {
      q: 'What was the result of the First Moroccan (Tangier) Crisis?',
      a: 'Britain and France grew closer, isolating Germany',
      options: [
        'The Entente Cordiale was dissolved',
        'Russia declared war on Germany',
        'Germany gained control of Morocco',
        'Britain and France grew closer, isolating Germany',
      ],
      id: 'gw_q13',
    },
    {
      q: "What name was given to Germany's aggressive threat of military force?",
      a: 'Gunboat Diplomacy',
      options: ['Dollar Diplomacy', 'Gunboat Diplomacy', 'Risk Theory', 'Appeasement'],
      id: 'gw_q14',
    },
    {
      q: 'What was the name of the German gunboat sent to Agadir in 1911?',
      a: 'SMS Panther',
      options: ['SMS Emden', 'SMS Bismarck', 'SMS Panther', 'HMS Dreadnought'],
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
      options: ['HMS Victory', 'HMS Invincible', 'HMS Iron Duke', 'HMS Dreadnought'],
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
      options: ['Splendid Isolation', 'Appeasement', 'The Two-Power Standard', 'Balance of Power'],
      id: 'gw_q19',
    },
    {
      q: "What was German Admiral Tirpitz's naval strategy called?",
      a: 'Risk Theory',
      options: [
        'The Schlieffen Plan',
        'Risk Theory',
        'Unrestricted Submarine Warfare',
        'Weltpolitik',
      ],
      id: 'gw_q20',
    },
    {
      q: "What volatile region was known as the 'Powder Keg of Europe'?",
      a: 'The Balkans',
      options: ['The Caucasus', 'The Balkans', 'The Middle East', 'The Rhineland'],
      id: 'gw_q21',
    },
    {
      q: 'What declining multi-ethnic empire dominated the northern Balkans?',
      a: 'The Austro-Hungarian Empire',
      options: [
        'The Russian Empire',
        'The British Empire',
        'The Austro-Hungarian Empire',
        'The Ottoman Empire',
      ],
      id: 'gw_q22',
    },
    {
      q: 'Which empire was retreating from the Balkans, leaving a power vacuum?',
      a: 'The Ottoman Empire',
      options: [
        'The Russian Empire',
        'The German Empire',
        'The Austro-Hungarian Empire',
        'The Ottoman Empire',
      ],
      id: 'gw_q23',
    },
    {
      q: "Which nation wanted to unite all South Slavs into a 'Greater' nation?",
      a: 'Serbia',
      options: ['Serbia', 'Bulgaria', 'Bosnia', 'Croatia'],
      id: 'gw_q24',
    },
    {
      q: 'Which region did Austria-Hungary formally annex in 1908?',
      a: 'Bosnia',
      options: ['Bosnia', 'Romania', 'Serbia', 'Albania'],
      id: 'gw_q25',
    },
    {
      q: 'Which major power considered itself the protector of the Slavic people?',
      a: 'Russia',
      options: ['Germany', 'Britain', 'Russia', 'France'],
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
      options: ['Berlin', 'Belgrade', 'Vienna', 'Sarajevo'],
      id: 'gw_q28',
    },
    {
      q: 'On what date was the Archduke assassinated?',
      a: 'June 28, 1914',
      options: ['June 28, 1914', 'August 4, 1914', 'July 23, 1914', 'November 11, 1918'],
      id: 'gw_q29',
    },
    {
      q: 'Who assassinated the Archduke?',
      a: 'Gavrilo Princip',
      options: ['Leon Trotsky', 'Nedeljko Čabrinović', 'Dragutin Dimitrijević', 'Gavrilo Princip'],
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
        'The July Crisis',
        'The Blank Check Incident',
        'The Balkan Wars',
        'The Sarajevo Crisis',
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
      options: ['Britain', 'Germany', 'France', 'Russia'],
      id: 'gw_q35',
    },
    {
      q: "What was the name of Germany's military strategy for a two-front war?",
      a: 'The Schlieffen Plan',
      options: ['Plan XVII', 'The Risk Theory', 'The Schlieffen Plan', 'The Bismarck Strategy'],
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
      options: ['Italy', 'Britain', 'The United States', 'Russia'],
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
        'The Grand Alliance',
        'The Allied Powers',
        'The Triple Entente',
      ],
      id: 'gw_q40',
    },
    {
      q: 'What treaty ended the First World War in 1919?',
      a: 'The Treaty of Versailles',
      options: [
        'The Treaty of Trianon',
        'The Congress of Vienna',
        'The Treaty of Versailles',
        'The Treaty of Brest-Litovsk',
      ],
      id: 'gw_q41',
    },
    {
      q: 'Which clause forced Germany to accept full responsibility for the war?',
      a: 'Article 231 (War Guilt Clause)',
      options: [
        'Article 231 (War Guilt Clause)',
        'Article 48',
        'The Reparations Clause',
        'The Blank Check',
      ],
      id: 'gw_q42',
    },
    {
      q: 'What is the term for a war launched to destroy a rising threat before it gets too strong?',
      a: 'Preventative War',
      options: ['Proxy War', 'Total War', 'War of Attrition', 'Preventative War'],
      id: 'gw_q43',
    },
    {
      q: 'Which historian famously argued Germany planned a war of aggression?',
      a: 'Fritz Fischer',
      options: ['A.J.P. Taylor', 'Fritz Fischer', 'Margaret MacMillan', 'Christopher Clark'],
      id: 'gw_q44',
    },
    {
      q: 'Which historian argued the nations blundered into war due to rigid alliances?',
      a: 'Margaret MacMillan',
      options: ['Richard Evans', 'Margaret MacMillan', 'Ian Kershaw', 'Fritz Fischer'],
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
      options: ['Poland', 'Romania', 'Bulgaria', 'Serbia'],
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
      options: ['Anarchism', 'Imperialism', 'Fascism', 'Soviet Communism'],
      id: 'gw_q49',
    },
    {
      q: 'Which country did Germany invade on 3 August 1914?',
      a: 'Belgium',
      options: ['Belgium', 'Russia', 'France', 'Serbia'],
      id: 'gw_q50',
    },
  ],
  glossary: [
    {
      term: 'Weltpolitik [Velt-pol-ee-teek]',
      definition:
        '"World Policy." Kaiser Wilhelm II\'s aggressive foreign policy to transform Germany into a dominant global superpower with an overseas empire and massive battlefleet.',
    },
    {
      term: 'Revanche [Ruh-vahnsh]',
      definition:
        '"Revenge." The profound, enduring French national desire to avenge their humiliating defeat in the Franco-Prussian War (1870–71) and reclaim Alsace-Lorraine.',
    },
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
if (typeof module !== 'undefined') module.exports = great_war;
