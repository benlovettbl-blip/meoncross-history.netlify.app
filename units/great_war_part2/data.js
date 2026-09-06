export default {
  title: 'KS3: The Great War (1914-1919)',
  homepage_background: '/images/armistice_1918.jpg',
  enquiry:
    'How did a single spark in Sarajevo ignite a global conflict that transformed the modern world?',
  cover_image: '/images/bg_great_war_part2.jpg',
  cover_caption:
    'The cover image displays two powerful historical sources that bookend the First World War: on the left, an illustration of the assassination of Archduke Franz Ferdinand in Sarajevo (the spark that ignited the conflict in 1914), and on the right, the official Treaty of Versailles document (the controversial peace settlement signed in 1919).',
  hero_image: '/images/stubbington_memorial_1.jpg',
  hero_caption:
    'The Stubbington War Memorial, built in 1922 over the village pump on the green. Designed by the mother of the only woman commemorated, its unique wooden shelter stands as a powerful and poignant local reminder of the devastating human cost of the conflict on tight-knit communities.',
  workbooks: [
    {
      id: 'full',
      name: 'full',
      title: 'Complete Unit',
    },
  ],
  debatePrompts: [
    {
      title: 'Lions Led By Donkeys?',
      prompt:
        '<strong>Debate:</strong> Were British generals like Sir Douglas Haig incompetent butchers who threw lives away at the Somme, or did they adapt as best as they could to a new, industrial type of war?',
    },
    {
      title: 'A Truly Global War?',
      prompt:
        "<strong>Debate:</strong> Was World War I truly a 'World' war, or was it just a European civil war that unfairly dragged in colonial subjects from India and Africa against their will?",
    },
    {
      title: 'The Treaty of Versailles',
      prompt:
        '<strong>Roleplay:</strong> You are French Prime Minister Georges Clemenceau in 1919. Explain to Woodrow Wilson why Germany must be utterly crushed, disarmed, and punished financially for the devastation of the war.',
    },
  ],
  lessons: [
    {
      id: 'lesson_1',
      title: 'Why were young men so desperate to join the slaughter of 1914?',
      learning_objectives: [
        'Describe how propaganda, imperial loyalty, and alliance obligations drove mass enlistment across the British Empire',
        'Explain why trench warfare on the Western Front created a devastating stalemate',
        "Evaluate the extent to which soldiers' expectations of war matched the reality of industrial-scale conflict",
      ],
      vocabulary: [
        {
          term: 'Propaganda',
          definition:
            'Government-produced material designed to shape public opinion, recruit soldiers, and maintain morale.',
        },
        {
          term: 'Empire',
          definition:
            'The British Empire — soldiers from across its colonies fought on the Western Front.',
        },
        {
          term: 'Alliance',
          definition: 'A formal agreement between nations to support each other in war.',
        },
        {
          term: 'Stalemate',
          definition:
            'A situation where neither side can win or make progress — the defining feature of trench warfare.',
        },
        {
          term: 'Trench warfare',
          definition:
            'A type of fighting from fortified ditches (trenches) that dominated the Western Front from 1914 to 1918.',
        },
      ],
      teacher_notes: {
        primer:
          "Introduce the outbreak of WWI, focusing on the assassination in Sarajevo and the alliance system, leading to the massive volunteer movement (Pals' Battalions).",
        objectives: [
          {
            objective:
              'Describe how propaganda, imperial loyalty, and alliance obligations drove mass enlistment across the British Empire',
            primer:
              "Focus on the role of Lord Kitchener's campaign and how peer pressure and patriotism forced many young men to sign up.",
            question:
              'What were the main social and political pressures that led young men to enlist in 1914?',
          },
          {
            objective:
              'Explain why trench warfare on the Western Front created a devastating stalemate',
            primer:
              'Highlight the failure of the Schlieffen Plan and how the introduction of machine guns and artillery made defensive positions impenetrable.',
            question:
              'How did modern industrial weaponry create the stalemate of the trench system?',
          },
          {
            objective:
              "Evaluate the extent to which soldiers' expectations of war matched the reality of industrial-scale conflict",
            primer:
              "Contrast the romantic ideas of a short 'over by Christmas' adventure with the miserable realities of trench foot, shell shock, and mass casualties.",
            question:
              'In what ways did the reality of fighting on the Western Front differ from what volunteers expected in 1914?',
          },
        ],
        source_context:
          "The visual sources in this lesson (such as the map of alliances and the recruitment posters) highlight the two phases of the outbreak: the geopolitical trap of the alliance system, and the psychological manipulation of the British public. The propaganda posters in particular reveal how the government ruthlessly leveraged gender roles and peer pressure to feed the war machine. **Hinge Question:** Look closely at the 'Women of Britain Say GO!' poster; why was emotional blackmail considered more effective than simply ordering men to fight in 1914?",
      },
      do_now: {
        title: 'Do Now: Recall',
        type: 'quiz',
        questions: [
          {
            question: 'Which of these was a long-term cause of WWI?',
            options: [
              'The Treaty of Versailles',
              'The Schlieffen Plan failing',
              'The assassination of Archduke Franz Ferdinand',
              'The Alliance System',
            ],
            answer: 2,
            explanation:
              'The alliance system had divided Europe into two armed camps over decades.',
          },
        ],
      },
      enquiry: 'Why were young men so desperate to join the slaughter of 1914?',
      vocab: [
        {
          term: 'Conscription',
          definition:
            'A compulsory law forcing citizens of a country to enlist in the armed forces.',
        },
        {
          term: 'Pals Battalions',
          definition:
            'Special British Army units raised during WWI that allowed friends, neighbors, and co-workers to enlist and serve together.',
        },
        {
          term: 'Propaganda',
          definition:
            'Biased or misleading information publicized by a government to promote a political cause or encourage patriotism.',
        },
        {
          term: 'Historiography',
          definition:
            "The study of how historians' interpretations of past events change over time.",
        },
        {
          term: 'Pragmatism',
          definition:
            'Making decisions based on practical, real-world realities (like needing a steady wage) rather than romance or emotion.',
        },
      ],
      flashcards: [
        {
          question:
            'What was the main reason the British military had to rely on volunteers in August 1914?',
          options: [
            'Britain had no conscription law and possessed a small professional army.',
            'Parliament ran out of money to pay soldiers.',
            'The King banned the use of regular soldiers.',
          ],
          answer: 1,
        },
        {
          question:
            'Which local Hampshire regiment battalions were heavily recruited from the Stubbington and Portsmouth areas in 1914?',
          options: [
            'The Stubbington Guards.',
            "Kitchener's Fareham Conscripts.",
            'The 14th and 15th Battalions of the Hampshire Regiment (The Pompey Pals).',
          ],
          answer: 1,
        },
        {
          question:
            'Which statement best explains why white feathers were such a powerful recruitment tool?',
          options: [
            'They weaponized social shame and humiliation within close-knit local communities.',
            'They carried legal force and resulted in a heavy fine.',
            'They were official government warnings that a man was about to be arrested.',
          ],
          answer: 0,
        },
        {
          question:
            "Why do modern historians like Gary Sheffield argue that many working-class men joined the army for 'pragmatic' reasons?",
          options: [
            'The army offered guaranteed daily pay, regular meals, and clothing during a time of poverty.',
            'They were tricked by romanticized stories of quick, glorious victories.',
            'They were promised free houses in London after the war ended.',
          ],
          answer: 2,
        },
        {
          question:
            "According to historian Catriona Pennell, what was a key 'moral' reason for British enlistment in 1914?",
          options: [
            'The need to escape the boring, repetitive work of the textile mills.',
            'The fear of being fired by an employer who demanded they join.',
            'The desire to protect international law and civilization after Germany invaded neutral Belgium.',
          ],
          answer: 1,
        },
      ],
      narrative_blocks: [
        {
          title: 'The Spark & The Stampede',
          text: "In the summer of 1914, Europe resembled a giant tinderbox waiting for a spark.\n\n<strong>The Arms Race and Imperial Rivalry</strong><br>\nTo understand why Europe was so tense by 1914, we must look at the intense military and imperial competition between the Great Powers. A massive naval arms race was triggered in 1906 when Britain launched the <em>HMS Dreadnought</em>. This revolutionary battleship was heavily armoured with steel 28 cm thick, carried a crew of 800 sailors, and possessed huge guns that could blow up enemy ships from 32 km away. This made all older ships instantly obsolete. A frantic race began: between 1906 and 1914, Britain built 29 Dreadnoughts while Germany built 17.<br><br>Tensions were further pushed to breaking point by imperial clashes in North Africa. During the Second Moroccan Crisis in 1911, Germany sent the gunboat <em>SMS Panther</em> to the port of Agadir to aggressively challenge French control of the region, deeply alarming the British navy.\n\n<br><br><strong>The July Days: The Countdown to War</strong><br>\nThe assassination of Archduke Franz Ferdinand on 28 June 1914 triggered a rapid chain reaction known as the 'July Days'. On 23 July, Austria-Hungary sent a strict list of demands to Serbia, including a demand to let Austrian officials run the assassination inquiry. When Serbia refused this demand to protect its independence, Austria-Hungary declared war on 28 July. The alliance system then activated like clockwork: Germany warned Russia not to intervene, and when Russia mobilised its army, Germany declared war on Russia on 1 August. On 3 August, Germany declared war on France, and on 4 August, Britain declared war on Germany after German troops invaded neutral Belgium.<br><br>When Great Britain declared war on Germany on August 4, 1914, the British military faced an immediate crisis. Unlike its European rivals, Britain did not have conscription. Its small professional army was vastly outnumbered. To build a massive fighting force from scratch, Secretary of State for War Lord Horatio Kitchener launched the most famous recruitment campaign in British history. By the end of September 1914, over 750,000 British men had volunteered.",
          tasks: [
            {
              type: 'short_answer',
              text: "What was the 'spark' that triggered the outbreak of the First World War in 1914?",
              model_answer:
                'The assassination of Archduke Franz Ferdinand in Sarajevo on June 28, 1914.',
            },
            {
              type: 'short_answer',
              text: 'Why did Great Britain desperately need volunteers to fight when war was declared?',
              model_answer:
                'Britain did not have a conscription law, meaning its regular professional army was too small to fight a massive continental war.',
            },
          ],
          image: '/images/gw_alliance_map.png',
          image_alt:
            'Source A: A map of the European Alliance System in 1914, dividing the continent into two heavily armed camps: the Triple Entente (Britain, France, Russia) and the Triple Alliance (Germany, Austria-Hungary, Italy). These mutual defense treaties acted as tripwires, ensuring any local conflict would drag all of Europe into war.',
          image_caption:
            'Source A: A map of the European Alliance System in 1914, dividing the continent into two heavily armed camps: the Triple Entente (Britain, France, Russia) and the Triple Alliance (Germany, Austria-Hungary, Italy). These mutual defense treaties acted as tripwires, ensuring any local conflict would drag all of Europe into war.',
        },
        {
          title: 'Local History: The Pompey Pals',
          text: 'To encourage recruitment, the government promised that friends, sports teammates, and work colleagues could enlist and fight side-by-side in "Pals Battalions." <div class="local-history-spotlight"><strong>Local History: The Pompey Pals</strong><br>For men living in Stubbington, Fareham, and Portsmouth, the call to arms was answered locally with overwhelming enthusiasm. In August 1914, the Portsmouth Citizens Patriotic Recruiting Committee formed the 14th and 15th Battalions of the Hampshire Regiment, famously known as the "Pompey Pals". Men who had grown up on the same streets, worked in the same dockyards, and supported the same football teams now trained together, sharing tents and rations before crossing the Channel to France.<br><br>Tragically, the fatal flaw of the Pals Battalions was that industrialized slaughter could wipe out the male population of entire streets in a single afternoon. At the Battle of the Somme on September 3, 1916, 587 men from the 1st Pompey Pals went "over the top" near the River Ancre. Facing heavily fortified German machine guns, 457 of them became casualties (killed, wounded, or missing) in a single day. The devastating news arrived in Portsmouth via telegraph, shattering local families and leaving a deep, enduring scar on the community.</div>',
          tasks: [
            {
              type: 'short_answer',
              text: "Who were the 'Pompey Pals'?",
              model_answer:
                'The 14th and 15th Battalions of the Hampshire Regiment, made up of men from Portsmouth, Fareham, Stubbington, and surrounding areas who volunteered to fight together in August 1914.',
            },
            {
              type: 'short_answer',
              text: 'What happened to the 1st Pompey Pals on September 3, 1916?',
              model_answer:
                'During the Battle of the Somme, 587 men from the battalion went over the top, and 457 became casualties, devastating the local community.',
            },
          ],
          image: '/images/gw_gavrilo_princip.jpg',
          image_alt:
            "Source B: A photograph of Gavrilo Princip, the 19-year-old Serbian nationalist and member of the Black Hand secret society. On June 28, 1914, his assassination of Archduke Franz Ferdinand in Sarajevo provided the 'spark' that ignited the First World War.",
          image_caption:
            "Source B: A photograph of Gavrilo Princip, the 19-year-old Serbian nationalist and member of the Black Hand secret society. On June 28, 1914, his assassination of Archduke Franz Ferdinand in Sarajevo provided the 'spark' that ignited the First World War.",
        },
        {
          title: 'Source Spotlight: Propaganda & Peer Pressure',
          text: "The British government needed millions of men, and they used every psychological trick available to get them. <br><br><strong>'Women of Britain Say GO!' Poster (1915)</strong><br>This famous propaganda poster featured women and children looking out of a window as soldiers marched away. It was designed to weaponize guilt and masculinity, implying that real men protected women and children, and that women wanted their men to fight.<br><br><strong>The White Feather Campaign</strong><br>If official propaganda didn't work, social peer pressure often did. Admiral Charles Fitzgerald founded the 'Order of the White Feather' in 1914. He encouraged women to hand out white feathers—a traditional symbol of cowardice—to any young man seen out of uniform in public. This weaponized social shame. Many teenage boys, terrified of being humiliated in front of their friends or girlfriends, lied about their age to escape the shame, joining the army at just 15 or 16 years old.",
          tasks: [
            {
              text: 'Describe one feature of the European Alliance System in 1914. (2 marks)',
              model_answer:
                'One feature of the European Alliance System was that it split Europe into two rival armed camps. For example, the Triple Entente allied Britain, France, and Russia against the Triple Alliance of Germany, Austria-Hungary, and Italy, meaning any small conflict could pull all major powers into war.',
            },
            {
              question:
                'Study Source C (the "Women of Britain Say GO!" poster). How does this piece of propaganda attempt to emotionally manipulate young men into volunteering?',
              model_answer:
                'The poster attempts to manipulate men by implying that their mothers, sisters, and wives expected them to fight. It leverages traditional concepts of masculinity and intense peer pressure, suggesting that staying at home while women watch them leave would be deeply shameful.',
            },
          ],
          image: '/images/gw_women_say_go.jpg',
          image_alt:
            "Source C: The famous 'Women of Britain Say GO!' propaganda poster, published in 1915. It emotionally manipulated men into volunteering by implying that their mothers, sisters, and wives expected them to fight, leveraging peer pressure and traditional masculinity.",
          image_caption:
            "Source C: The famous 'Women of Britain Say GO!' propaganda poster, published in 1915. It emotionally manipulated men into volunteering by implying that their mothers, sisters, and wives expected them to fight, leveraging peer pressure and traditional masculinity.",
        },
        {
          title: 'Poetry as Propaganda: Jessie Pope',
          text: "Propaganda wasn't just found on posters; it was printed in popular newspapers in the form of jingoistic poetry. <strong>Jessie Pope</strong> was one of the most famous pro-war poets of 1914. Her poem <em>'Who's for the Game?'</em> was specifically written to pressure young men into enlisting by comparing the war to a friendly game of rugby.<br><br><blockquote><em>Who's for the game, the biggest that's played,<br>The red crashing game of a fight?<br>Who'll grip and tackle the job unafraid?<br>And who thinks he'd rather sit tight?...<br>Come along, lads—But you'll come on all right—<br>For there's only one course to pursue,<br>Your country is up to her neck in a fight,<br>And she's looking and calling for you.</em></blockquote><br>Pope's poetry weaponized masculinity, essentially calling anyone who didn't enlist a coward who 'thought he'd rather sit tight'. However, this romanticised view of war was later fiercely criticized by frontline soldiers and famous war poets like Wilfred Owen, who experienced the true, unglamorous horror of the trenches.",
          image: '/images/gw_jessie_pope.jpg',
          image_alt:
            'Source D: A photograph of Jessie Pope, a popular pro-war poet and journalist whose aggressively patriotic verses shamed young men into enlisting. Her simplistic, jingoistic poetry was later fiercely criticized by frontline soldiers like Wilfred Owen.',
          tasks: [
            {
              text: "How does Jessie Pope use the metaphor of a 'game' to manipulate young men into joining the army? What reality is she deliberately hiding?",
              model_answer:
                "Pope compares war to a 'red crashing game' (like rugby) to make it sound exciting, physical, and like a team sport. She manipulates young men by implying that joining the army is just playing a fun game with their 'lads'. She deliberately hides the horrific reality of industrialized slaughter, machine guns, and death, because if she told the truth, nobody would volunteer.",
            },
            {
              question:
                'Study Source D (the photograph of Jessie Pope). Why might frontline soldiers, such as Wilfred Owen, have fiercely criticized the patriotic poetry produced by writers like Pope?',
              model_answer:
                'Frontline soldiers criticized writers like Jessie Pope because her aggressive, jingoistic poetry promoted romantic illusions of war. To soldiers suffering the horrific, gritty realities of trench warfare, her simplistic verses felt deeply insulting and disconnected from the true trauma they were enduring.',
            },
          ],
          image_caption:
            'Source D: A photograph of Jessie Pope, a popular pro-war poet and journalist whose aggressively patriotic verses shamed young men into enlisting. Her simplistic, jingoistic poetry was later fiercely criticized by frontline soldiers like Wilfred Owen.',
        },
        {
          title: 'Historical Interpretations: Why did they go?',
          text: '<ul><li><strong>The Traditional View:</strong> For decades, the popular narrative suggested these young men were simply naive. It was argued they were tricked by aggressive propaganda posters, bullied by women handing out white feathers (symbols of cowardice), or were simply seeking a cheap adventure to escape boring factory life, believing the war would be "over by Christmas."</li><li><strong>The Revisionist View (Modern Historians):</strong> Historians like Catriona Pennell and Gary Sheffield challenge this "gullible volunteer" myth. Pennell argues that volunteers were not blindly enthusiastic; they made rational choices driven by genuine moral outrage over Germany\'s invasion of "Brave Little Belgium" and believed they were defending civilization. Sheffield highlights economic pragmatism: for working-class men, the army offered guaranteed daily pay (a shilling a day), regular meals, and a warm coat during a time of economic hardship.</li></ul>',
          tasks: [
            {
              type: 'short_answer',
              text: 'Study Source C and Source D. Which method of recruitment do you think was more effective in convincing a 16-year-old boy to lie about his age and enlist: the official government poster, or the threat of a white feather? Explain your reasoning.',
              model_answer:
                'The white feather was likely more effective because it weaponized direct, personal social shame. While the poster appealed to a sense of national duty, a 16-year-old boy would be terrified of being humiliated in public by women in his own community, making the peer pressure impossible to ignore.',
            },
            {
              type: 'short_answer',
              text: 'Categorize the following reasons for enlistment into "Push Factors" (negative things driving them away from home) and "Pull Factors" (positive things attracting them to the army): <em>The threat of receiving a white feather, the promise of a shilling a day, grinding poverty at home, defending \'Brave Little Belgium\', government propaganda.</em>',
              model_answer:
                'Push Factors = Threat of a white feather, grinding poverty at home.<br><br>Pull Factors = A shilling a day, defending Belgium, government propaganda.',
            },
            {
              type: 'short_answer',
              text: "How does historian Catriona Pennell's view of WWI volunteers differ from the traditional view?",
              model_answer:
                'While the traditional view argues men were naive and tricked by propaganda, Pennell argues they were rational and joined out of genuine moral duty and outrage over the German invasion of Belgium.',
            },
            {
              type: 'short_answer',
              text: 'Explain what historian Gary Sheffield means when he suggests volunteers were motivated by "economic pragmatism."',
              model_answer:
                "Sheffield means that working-class men weren't just looking for adventure; they practically needed the guaranteed food, clothing, and daily pay the army provided.",
            },
          ],
        },
        {
          title: 'Pair & Share Activity',
          text: '',
          tasks: [
            {
              type: 'think_pair_share',
              question: 'Why were young men so eager to enlist in 1914?',
            },
          ],
        },
        {
          title: 'Consolidation Task',
          tasks: [
            {
              type: 'extended_writing',
              question:
                'Explain why so many young British men eagerly volunteered for the army in 1914.',
              hints: [
                'Sentence Starter: Many young men volunteered because they were influenced by government propaganda...',
                'Sentence Starter: For example, posters like Lord Kitchener\'s "Your Country Needs You" used...',
                'Sentence Starter: Furthermore, societal pressure from women, such as the White Feather campaign, resulted in...',
              ],
              scaffolding:
                'Structure your answer using the IDEA framework:\n- **Identify:** State your main point clearly.\n- **Describe:** Give historical evidence and facts.\n- **Explain:** Show how the evidence supports your point.\n- **Analyse:** Link back to the question and assess its importance.',
            },
          ],
          text: '<h3>Consolidation Task</h3>',
        },
      ],
      quiz: [
        {
          q: 'What was the name of the revolutionary British battleship launched in 1906 that sparked a naval arms race?',
          a: 'HMS Dreadnought',
          options: ['RMS Lusitania', 'HMS Victory', 'HMS Dreadnought', 'SMS Panther'],
        },
        {
          q: 'Which Serbian nationalist group assassinated Archduke Franz Ferdinand in Sarajevo?',
          a: 'The Black Hand',
          options: ['The Red Baron', 'The White Rose', 'The Balkan Brotherhood', 'The Black Hand'],
        },
        {
          q: 'Which European empire declared war on Serbia first during the July Days?',
          a: 'Austria-Hungary',
          options: ['Austria-Hungary', 'Germany', 'Russia', 'Great Britain'],
        },
        {
          q: 'Who was the British Secretary of State for War who launched a massive recruitment campaign in 1914?',
          a: 'Lord Horatio Kitchener',
          options: [
            'David Lloyd George',
            'Douglas Haig',
            'Winston Churchill',
            'Lord Horatio Kitchener',
          ],
        },
        {
          q: 'What was the nickname given to battalions made up of friends, colleagues, and neighbors who enlisted together?',
          a: 'Pals Battalions',
          options: ['Buddy Brigades', 'Comrade Companies', 'Mates Regiments', 'Pals Battalions'],
        },
      ],
      video: [
        {
          type: 'era',
          url: 'https://era.org.uk/streaming-service-resource/wwi-a-z-a-is-for-archduke-franz-ferdinand-bbc-two/',
          title: 'A is for Archduke Franz Ferdinand | WWI A-Z',
          duration: '2 mins 30 secs',
          viewing_task:
            'Watch this quick summary and note down exactly how the assassination in Sarajevo triggered the outbreak of war.',
          model_answer:
            'The assassination of Archduke Franz Ferdinand by Gavrilo Princip caused Austria-Hungary to declare war on Serbia, which dragged in Russia, Germany, and eventually Britain due to the alliance system.',
        },
        {
          type: 'era',
          url: 'https://era.org.uk/streaming-service-resource/wwi-a-z-y-is-for-your-country-needs-you-bbc-two/',
          title: 'Y is for Your Country Needs You | WWI A-Z',
          duration: '3 mins',
          viewing_task:
            "How was Lord Kitchener's famous poster used to drum up initial excitement for the war?",
          model_answer:
            'The poster used direct eye contact and a pointing finger to make young men feel personally responsible and pressured into joining the army, making them feel it was their patriotic duty.',
        },
        {
          type: 'era',
          url: 'https://era.org.uk/streaming-service-resource/wwi-a-z-b-is-for-battalions-bbc-two/',
          title: 'B is for Battalions | WWI A-Z',
          duration: '3 mins',
          viewing_task:
            "Explain what a 'Pals Battalion' was and why it was an effective recruitment tactic.",
          model_answer:
            "A Pals Battalion allowed groups of friends, neighbors, and workmates to join up and serve together. It was effective because men didn't want to be left behind while all their friends went off to fight.",
        },
      ],
    },
    {
      id: 'lesson_2',
      title: 'Did British generals make the horror of trench warfare worse?',
      vocabulary: [
        {
          term: 'Trench',
          definition:
            'A long, narrow ditch dug by soldiers for protection from enemy fire on the Western Front.',
        },
        {
          term: 'No Mans Land',
          definition:
            'The deadly strip of land between opposing trenches, swept by machine gun fire and barbed wire.',
        },
        {
          term: 'Attrition',
          definition:
            'A strategy of wearing down the enemy through continuous losses of personnel and material.',
        },
        {
          term: 'Causation',
          definition:
            'Understanding the reasons behind events — why did trench warfare cause such devastating casualties?',
        },
        {
          term: 'Interpretation',
          definition:
            'A historians explanation of events — the debate over whether generals were lions led by donkeys.',
        },
      ],
      learning_objectives: [
        'Describe the key features of trench warfare and explain why it caused such devastating casualties',
        'Explain the debate around British military leadership: were generals incompetent or facing impossible circumstances?',
        'Evaluate the significance of propaganda in shaping public perception of the war effort',
      ],
      teacher_notes: {
        primer:
          'Explore the grim reality of trench warfare and the controversial leadership of generals like Haig.',
        objectives: [
          {
            objective: 'Analyze the conditions of trench warfare.',
            primer:
              "Focus on the 'Core Narrative' section describing life in the trenches. Emphasize the physical hardships like trench foot, rats, and gas attacks.",
            question: 'What evidence shows that trenches were unlivable?',
          },
          {
            objective: 'Evaluate historical interpretations of General Haig.',
            primer:
              "Contrast the 'Butcher of the Somme' interpretation with modern defensive arguments. Discuss how the failure of the initial bombardment led to massive casualties on the first day of the Somme.",
            question: "Was General Haig a 'butcher' or a product of his time?",
          },
        ],
        source_context:
          'The visual sources in this lesson (photographs of flooded trenches and portraits of war poets) provide a stark, undeniable contrast to the romanticized propaganda of 1914. They offer raw, objective evidence of the horrifying conditions of industrialized warfare and the physical degradation of the soldiers. **Hinge Question:** Look at the photograph of the flooded trench; how does this environment completely contradict the promises made by recruiters and poets like Jessie Pope?',
      },
      do_now: {
        title: 'Do Now: Retrieval Grid',
        type: 'grid',
        items: [
          {
            question:
              'What name was given to WWI units made up of local friends, neighbors, and colleagues who enlisted together?',
            answer: 'Pals Battalions.',
            points: 1,
            category: 'Lesson 1 Recall',
          },
          {
            question:
              'Why did Britain have to rely entirely on voluntary enlistment when war was declared in August 1914?',
            answer:
              'Because Britain did not have a conscription law to force men to join, and its regular professional army was very small.',
            points: 1,
            category: 'Lesson 1 Recall',
          },
          {
            question:
              'What medieval sanitation workers were hired to clear overflowing town cesspits exclusively at night?',
            answer: 'Gongfermers.',
            points: 2,
            category: 'Thematic Recall',
          },
          {
            question:
              'What scientific theory did Victorian doctors believe in before Louis Pasteur proved Germ Theory in 1860?',
            answer:
              'Miasma Theory (the belief that diseases were spread by inhaling bad air or foul smells from decaying matter).',
            points: 2,
            category: 'Thematic Recall',
          },
          {
            question: 'What is the difference between a primary source and a secondary source?',
            answer:
              'A primary source is an eyewitness account or physical object created during the time period being studied, whereas a secondary source is created after the event by someone who was not there.',
            points: 3,
            category: 'Historical Skills',
          },
          {
            question:
              'Why must historians avoid the concept of "presentism" when studying past historical periods?',
            answer:
              'Presentism is judging past societies by modern standards and values. Historians must avoid it to understand why people in the past acted rationally based on their own contemporary knowledge.',
            points: 3,
            category: 'Historical Skills',
          },
        ],
      },
      enquiry: 'Did British generals make the horror of trench warfare worse?',
      narrative_blocks: [
        {
          title: 'The Core Narrative',
          text: 'By late 1914, the hope of a quick war vanished. Both sides dug a vast, unbroken network of defensive trenches stretching from the English Channel to the Swiss border, creating the stagnant deadlock of the Western Front. Life in these trenches was defined by extreme physical hardship and constant danger. Soldiers lived in subterranean dirt channels, constantly exposed to freezing mud, torrential rain, and waterlogged ground. This relentless dampness caused "trench foot"—a painful medical condition where a soldier\'s feet began to rot inside wet boots. Trenches also overflowed with rotting organic waste and human debris, attracting millions of disease-carrying black rats and lice, while the air was frequently poisoned by chlorine or mustard gas.<br><br><strong>Attrition and New Technologies</strong><br>\nWhen the rapid movement of 1914 broke down into the deadlock of the trenches, military leaders were forced to rely on a strategy of <strong>attrition</strong>—the brutal process of gradually destroying or weakening the enemy by attacking them continuously until they ran out of men and supplies.<br><br>To break the stalemate, new and highly dangerous technologies were deployed. In 1914, aircraft were incredibly fragile, constructed merely of wood and thick cloth held together by piano wire. Pilots flew in completely open cockpits without parachutes, relying entirely on thick gloves, layers of warm clothes, and leather helmets to stop themselves from freezing to death in the air.<br><br>This horrific reality of industrialized warfare became the backdrop for one of the greatest military debates in British history: the competence of its high command. On July 1, 1916, General Douglas Haig launched the Battle of the Somme to relieve pressure on the French army at Verdun. Believing that a week-long artillery bombardment had completely shattered the German defensive wire and dugouts, Haig ordered British troops to march slowly across No Man\'s Land in neat, orderly rows while carrying heavy equipment packs.<br><br>The result was an absolute slaughter. German defenders, who had safely survived the bombardment in deep, concrete-reinforced underground bunkers, emerged with machine guns the moment the shelling stopped. On the first day of the Somme alone, the British Army suffered 57,470 casualties, including 19,240 deaths—the bloodiest single day in British military history.<br><br>This disaster led to two sharply contrasting historical interpretations of General Haig. For decades, popular history portrayed Haig as a foolish, outdated "donkey" leading brave, patriotic "lions" to useless slaughter—a view heavily supported by wartime politicians and famous war poets. However, modern revisionist historians offer a different interpretation. They argue that Haig faced an unprecedented technological challenge, forced to fight a massive, industrialized war with no prior template. They point out that he eventually adapted his tactics to utilize tanks, creeping artillery barrages, and coordinated aircraft to secure the final Allied victory in 1918. Whether Haig was a callous butcher or a determined strategist remains a central question for historians.',
          tasks: [
            {
              type: 'short_answer',
              text: 'Knowledge Retrieval: Complete the summary table using the information from the text.',
              answer:
                '<ul><li><strong>Who:</strong> Key individuals or groups involved in the event.</li><li><strong>What:</strong> A brief description of the main events or actions.</li><li><strong>Where:</strong> The specific locations where these events took place.</li><li><strong>When:</strong> The dates or timeframe of the event.</li><li><strong>Why:</strong> The causes or motivations behind the event.</li></ul>',
              model_answer: 'Student completes table based on reading.',
            },
          ],
          image: '/images/gw_flooded_trench.jpg',
          image_alt:
            'Source A: British soldiers standing knee-deep in a flooded trench during the Battle of Passchendaele (1917). The horrific mud not only caused trench foot but was so deep and thick that exhausted men and pack animals frequently drowned in it.',
          image_caption:
            'Source A: British soldiers standing knee-deep in a flooded trench during the Battle of Passchendaele (1917). The horrific mud not only caused trench foot but was so deep and thick that exhausted men and pack animals frequently drowned in it.',
        },
        {
          title: 'Contemporary Source Evidence',
          text: "Soldiers on the Western Front lived in a subterranean world of mud, fear, and disease. <br><br><strong>Physical Hardships</strong><br>The trenches were frequently flooded with freezing, foul-smelling water. Men often stood waist-deep in mud for days, leading to a horrifying fungal infection called <em>Trench Foot</em>. If left untreated, the foot would turn black and gangrenous, requiring amputation. Giant, disease-carrying black rats—some the size of cats—fed on unburied corpses and swarmed the dugouts. Lice infested the soldiers' clothing, causing 'Trench Fever', a disease characterized by high fever and severe joint pain.<br><br><strong>New Weapons of Terror</strong><br>Beyond the disease, the trenches offered no safety from the industrialized weapons of 1914. Artillery bombardments could last for weeks, firing millions of explosive shells that caused devastating shrapnel wounds and buried men alive. The psychological toll of this constant, deafening bombardment led to a new psychiatric condition called 'Shell Shock' (now known as PTSD). Furthermore, 1915 saw the introduction of poison gas (chlorine, phosgene, and mustard gas). Mustard gas was particularly feared; it was heavier than air, sinking into the bottom of trenches, and caused agonizing internal and external blisters, blinding its victims and destroying their lungs.",
          tasks: [
            {
              type: 'short_answer',
              question:
                '**Causation:** Why did the deep, concrete-reinforced bunkers built by the German army cause the British offensive on the Somme to fail?',
              model_answer:
                'The deep bunkers protected German soldiers from the heavy artillery. Once the bombardment stopped, they emerged unharmed with machine guns.',
            },
            {
              type: 'short_answer',
              question:
                '**Historical Interpretations:** Explain why popular history books might refer to British soldiers as "Lions led by Donkeys" during the First World War.',
              model_answer:
                'Ordinary soldiers were incredibly brave ("lions"), but commanded by outdated, uncaring generals ("donkeys") who repeated failed tactics.',
            },
            {
              question:
                'Study Source B. Look closely at the zig-zag pattern of the trench system. What was the practical military purpose of digging trenches in this complex shape?',
              model_answer:
                'Trenches were deliberately dug in a zig-zag pattern rather than a straight line to prevent an enemy soldier who jumped into the trench from firing their weapon straight down the entire line. It also helped contain the blast radius of artillery shells landing inside the trench.',
            },
          ],
          image: '/images/gw_trench_diagram.jpg',
          image_alt:
            'Source B: An aerial reconnaissance photograph showing the complex, zig-zag pattern of a frontline trench system. Trenches were deliberately dug in this pattern so that if an enemy soldier jumped in, they could not fire their weapon straight down the entire line.',
          image_caption:
            'Source B: An aerial reconnaissance photograph showing the complex, zig-zag pattern of a frontline trench system. Trenches were deliberately dug in this pattern so that if an enemy soldier jumped in, they could not fire their weapon straight down the entire line.',
        },
        {
          title: 'Source Spotlight: Eyewitness in the Mud',
          text: 'To truly understand the conditions, we must read the words of the men who survived them.<br><br><strong>Extract from the diary of Private Arthur Savage (1915)</strong><br><em>"The mud was so deep and thick that if you slipped off the duckboards, you would sink up to your waist. I saw men drown in that mud. The rats were as big as cats, and they were completely fearless. They would run across your face while you tried to sleep. But the worst was the smell—a mixture of cordite, chloride of lime, and the sweet, sickly stench of death that never left your nostrils."</em>',
          tasks: [
            {
              type: 'short_answer',
              text: '1a. Describe one feature of early military aircraft. (2 marks)<br>1b. Describe one feature of trench warfare. (2 marks)',
              model_answer:
                '1a. One feature of early military aircraft was how fragile they were. For example, they were constructed merely of wood and thick cloth held together by piano wire.<br><br>1b. One feature of trench warfare was the horrific conditions soldiers endured. For example, the constant mud and water in the trenches led to thousands of men suffering from "Trench Foot", which often required amputation.',
            },
          ],
          image: '/images/gw_flooded_trench.jpg',
          image_alt:
            'Source C: Soldiers standing waist-deep in freezing, stagnant water in a frontline trench. These appalling conditions led to rampant diseases like trench foot, while the constant presence of corpses attracted swarms of black rats and lice.',
          image_caption:
            'Source C: Soldiers standing waist-deep in freezing, stagnant water in a frontline trench. These appalling conditions led to rampant diseases like trench foot, while the constant presence of corpses attracted swarms of black rats and lice.',
        },
        {
          title: 'The Brutal Reality: Wilfred Owen',
          text: "The horrific reality of the trenches stood in stark contrast to the jingoistic poetry of 1914. <strong>Wilfred Owen</strong>, an officer who suffered from shell shock, wrote poetry to expose the \"Pity of War\" and attack the lie that dying for your country was glorious. His most famous poem, <em>'Dulce et Decorum Est'</em>, describes a terrifying mustard gas attack.<br><br><blockquote><em>Gas! GAS! Quick, boys!—An ecstasy of fumbling<br>Fitting the clumsy helmets just in time,<br>But someone still was yelling out and stumbling<br>And flound'ring like a man in fire or lime.<br>Dim through the misty panes and thick green light,<br>As under a green sea, I saw him drowning.<br><br>...My friend, you would not tell with such high zest<br>To children ardent for some desperate glory,<br>The old Lie: Dulce et decorum est<br>Pro patria mori. (It is sweet and fitting to die for one's country)</em></blockquote>",
          image: '/images/gw_wilfred_owen.jpg',
          image_alt:
            'Source D: A portrait of Wilfred Owen, one of the greatest war poets in the English language. Having fought and suffered shell shock on the Western Front, his gritty, realistic poetry shattered the romantic illusions of war promoted by writers like Jessie Pope.',
          tasks: [
            {
              text: "How does Wilfred Owen's description of a gas attack completely destroy the message of Jessie Pope's 'Who's for the Game?'",
              model_answer:
                "Owen's visceral description of a man 'drowning' and 'floundering' in mustard gas exposes the horrific reality of modern warfare. It destroys Pope's argument by showing that war is not a fun rugby game, and that telling children it is 'sweet and fitting to die for one's country' is an 'old Lie'.",
            },
            {
              question:
                'Study Source D (the portrait of Wilfred Owen). How did the poetry of soldiers like Owen fundamentally differ from the propaganda that was common at the start of the war?',
              model_answer:
                "Unlike early propaganda which glorified the conflict, Owen's poetry was brutally realistic. It focused on the trauma, suffering, and shell shock experienced on the Western Front, effectively shattering the romantic illusions of war.",
            },
          ],
          image_caption:
            'Source D: A portrait of Wilfred Owen, one of the greatest war poets in the English language. Having fought and suffered shell shock on the Western Front, his gritty, realistic poetry shattered the romantic illusions of war promoted by writers like Jessie Pope.',
        },
        {
          title: 'Extension & Local History Task',
          text: 'Research tasks for independent study.',
          tasks: [
            {
              type: 'short_answer',
              text: "How useful is Source C for a historian studying the physical conditions of trench warfare? Use the source's content and its provenance (who wrote it and when) in your answer.",
              provenance_clue:
                'Hint: Think about who Private Savage is, when he is writing this, and what specific sensory details he includes.',
              model_answer:
                "Source C is highly useful because it is a primary eyewitness account written by a soldier who actually lived in the trenches in 1915. The content provides specific, visceral details about the physical conditions, such as the fatal depth of the mud and the 'fearless' rats. Because it is a personal diary, it is likely an honest reflection of his daily survival rather than government propaganda, making it a reliable and highly valuable source for historians.",
            },
            {
              type: 'short_answer',
              text: 'Open your browser and search for the **"1916 Battle of the Somme cinema film"**. Research how British audiences reacted when this real, uncensored footage of the front line was shown in local cinemas in 1916. Write down their reactions. 10. Look up **"WWI whale oil trench foot prevention"**. Write a brief paragraph explaining the strict daily foot care routines officers forced soldiers to perform to maintain army health in wet conditions. 11. Search for **"General Haig modern revisionist defense"**. Find and write down one argument made by a modern historian defending Haig\'s overall strategy on the Western Front.',
              model_answer: 'Student independent research based on specific prompts.',
            },
            {
              text: 'Study Source A (the photograph of the flooded trench).<br><br>How useful is Source A for an inquiry into the conditions on the Western Front? (8 marks)',
              model_answer:
                'Source A is highly useful because it is a contemporary photograph providing visual evidence of the horrific, water-logged conditions soldiers endured, which directly caused trench foot. However, its utility is limited as a photograph only captures one specific moment and location, and may not represent the entire front line.',
            },
          ],
        },
        {
          title: 'Pair & Share Activity',
          text: '',
          tasks: [
            {
              type: 'think_pair_share',
              question: "Did British generals deserve the title 'Lions led by Donkeys'?",
            },
          ],
        },
        {
          title: 'Consolidation Task',
          tasks: [
            {
              type: 'extended_writing',
              question:
                'Explain why the conditions in the trenches were so difficult for soldiers.',
              hints: [
                'Sentence Starter: The conditions were difficult because of the constant threat of disease...',
                'Sentence Starter: For example, many soldiers suffered from trench foot due to...',
                'Sentence Starter: This resulted in a high number of casualties before battles even began...',
              ],
              scaffolding:
                'Structure your answer using the IDEA framework:\n- **Identify:** State your main point clearly.\n- **Describe:** Give historical evidence and facts.\n- **Explain:** Show how the evidence supports your point.\n- **Analyse:** Link back to the question and assess its importance.',
            },
          ],
          text: '<h3>Consolidation Task</h3>',
        },
      ],
      key_vocabulary: [
        {
          term: "No Man's Land",
          definition:
            'The desolate, heavily cratered, and wire-strewn territory situated between the opposing front-line trenches.',
        },
        {
          term: 'Trench Foot',
          definition:
            'A painful medical condition caused by prolonged exposure of the feet to cold, damp, and unsanitary conditions, often leading to severe infection and gangrene.',
        },
        {
          term: 'Revisionist Historian',
          definition:
            'A historian who re-examines traditional historical interpretations in light of new evidence, perspectives, or analytical methods.',
        },
      ],
      quiz: [
        {
          q: 'What was the main cause of the medical condition known as "trench foot" during WWI?',
          a: 'Prolonged exposure to freezing, wet, and unsanitary mud inside boots.',
          options: [
            'Prolonged exposure to freezing, wet, and unsanitary mud inside boots.',
            'Being shot in the foot by an enemy sniper.',
            'Inhaling poisonous gas clouds without wearing a mask.',
            'Bites from disease-carrying black rats and lice.',
          ],
        },
        {
          q: 'Why did the British artillery bombardment fail to destroy German defenses before the Somme offensive?',
          a: 'German soldiers survived safely inside deep, concrete-reinforced underground bunkers.',
          options: [
            'The British artillery fired in the wrong direction due to poor maps.',
            'The German army used giant electric magnets to deflect the shells.',
            'German soldiers survived safely inside deep, concrete-reinforced underground bunkers.',
            'The British simply ran out of ammunition.',
          ],
        },
        {
          q: 'On which date did the infamous first day of the Battle of the Somme occur?',
          a: 'July 1, 1916',
          options: ['July 1, 1916', 'August 4, 1914', 'November 11, 1918', 'June 28, 1914'],
        },
        {
          q: 'What name is given to the popular historical viewpoint that brave British troops were commanded by foolish, incompetent generals?',
          a: 'Lions led by Donkeys',
          options: [
            'The Silent Front',
            'The Grand Illusion',
            'Lions led by Donkeys',
            'The Kitchener Stampede',
          ],
        },
        {
          q: 'How did modern "revisionist" historians change the historical debate surrounding General Douglas Haig?',
          a: 'They argued he was a determined leader who successfully learned how to win an unprecedented modern war.',
          options: [
            'They claimed he deliberately tried to lose the war to help France.',
            'They argued he was a determined leader who successfully learned how to win an unprecedented modern war.',
            'They discovered that he was secretly a double agent working for the German Empire.',
            'They proved that he never actually visited the Western Front during the war.',
          ],
        },
      ],
      vocab: [
        {
          term: 'Attrition',
          definition:
            'A military strategy aiming to win a war by wearing down the enemy to the point of collapse through continuous losses in men and materials.',
        },
        {
          term: 'Artillery',
          definition:
            'Large-caliber, heavy guns used in warfare on land, responsible for the vast majority of casualties during the First World War.',
        },
        {
          term: "No Man's Land",
          definition:
            'The unoccupied, highly dangerous terrain between the front lines of two opposing armies, often filled with barbed wire and craters.',
        },
        {
          term: 'Trench Foot',
          definition:
            'A painful condition of the feet caused by prolonged exposure to cold water and mud, common in the flooded trenches of the Western Front.',
        },
        {
          term: 'Causation',
          definition:
            'The action of causing something; in history, it is the skill of identifying the underlying reasons why a specific event occurred.',
        },
      ],
      video: [
        {
          type: 'era',
          url: 'https://era.org.uk/streaming-service-resource/wwi-a-z-t-is-for-trenches-bbc-two/',
          title: 'T is for Trenches | WWI A-Z',
          duration: '3 mins',
          viewing_task:
            'Describe three terrible conditions soldiers faced while living in the trenches.',
          model_answer:
            'Soldiers faced deep, freezing mud, infestations of giant rats, and the constant threat of diseases like trench foot caused by standing in water for days.',
        },
        {
          type: 'era',
          url: 'https://era.org.uk/streaming-service-resource/wwi-a-z-g-is-for-gas-bbc-two/',
          title: 'G is for Gas | WWI A-Z',
          duration: '3 mins',
          viewing_task:
            'Watch the students examine the genuine gas mask. Why were gas attacks so terrifying for the soldiers?',
          model_answer:
            "Gas attacks were terrifying because the gas (like chlorine or mustard gas) would blind them and destroy their lungs from the inside, causing a slow and agonizing death if they didn't get their clumsy masks on in time.",
        },
      ],
    },
    {
      id: 'lesson_3',
      title: "How much of a 'World' War was it, and why were the Empire's troops forgotten?",
      learning_objectives: [
        'Describe the contribution of soldiers from across the British Empire, including troops from India, Africa, and the Caribbean',
        'Explain why the contributions of imperial and colonial troops were marginalised in traditional British narratives of the war',
        "Evaluate the significance of protest and resistance movements that emerged from colonial soldiers' wartime experiences",
      ],
      vocabulary: [
        {
          term: 'Empire',
          definition:
            'Soldiers from India, Africa, the Caribbean, and other colonies fought for Britain — their sacrifice was often forgotten.',
        },
        {
          term: 'Protest',
          definition:
            'Actions taken to object to unfair treatment — colonial soldiers protested discrimination during and after the war.',
        },
        {
          term: 'Resistance',
          definition:
            'Opposing unjust treatment — many colonial soldiers resisted the erasure of their wartime contributions.',
        },
        {
          term: 'Marginalisation',
          definition:
            'The process of treating a group as insignificant or secondary — imperial troops were marginalised in war narratives.',
        },
        {
          term: 'Commemoration',
          definition:
            'The act of remembering and honouring those who served — war memorials often excluded non-white soldiers.',
        },
      ],
      teacher_notes: {
        primer:
          'Humanize the contributions and sacrifices of non-white troops from the British Empire, exploring racial barriers.',
        objectives: [
          {
            objective: 'Recognize the global nature of the conflict.',
            primer: 'Highlight that over a million Indian, Caribbean, and African troops fought.',
            question: "Why is WWI often incorrectly remembered as a 'white man's war'?",
          },
          {
            objective: 'Understand the racial barriers faced by colonial troops.',
            primer: 'Discuss the treatment and post-war legacy of imperial soldiers.',
            question: 'How were colonial troops treated differently than British soldiers?',
          },
        ],
        source_context:
          'The visual sources in this lesson (photographs of the British Indian Army, the BWIR, and the Chinese Labour Corps) serve as undeniable, photographic proof of the massive contribution of non-white imperial subjects to the Allied victory. They challenge the traditional Eurocentric narrative by highlighting that without the manpower and sacrifice of the global empire, the British army would likely have collapsed. **Hinge Question:** Look at the photograph of the Chinese Labour Corps; why do you think these men were deliberately excluded from the post-war victory parades in London?',
      },
      do_now: {
        title: 'Do Now: Recall',
        type: 'mixed',
        items: [
          {
            question:
              'What was the main tactical problem at the Battle of the Somme? (A) The artillery barrage failed to destroy the barbed wire., B) The soldiers ran away., C) The tanks broke down completely., D) The French refused to fight.)',
            answer:
              'The artillery barrage failed to destroy the barbed wire.. Explanation: The failure of the artillery barrage left troops exposed to machine gun fire.',
          },
        ],
      },
      enquiry: "How much of a 'World' War was it, and why were the Empire's troops forgotten?",
      vocab: [
        {
          term: 'Eurocentric',
          definition:
            'Focusing on European culture or history to the exclusion of a wider view of the world.',
        },
        {
          term: 'British West Indies Regiment (BWIR)',
          definition:
            'A military unit of the British Army formed during WWI, made up of volunteers from British colonies in the Caribbean.',
        },
        {
          term: 'Racial Hierarchy',
          definition:
            'A system of stratification that privileges one racial group over others (e.g., placing white British officers at the top).',
        },
        {
          term: 'Historical Amnesia',
          definition:
            "The collective forgetting or intentional erasing of specific events or groups of people from a society's history.",
        },
        {
          term: 'Mutiny',
          definition:
            'An open rebellion against the proper authorities, especially by soldiers or sailors against their officers.',
        },
      ],
      flashcards: [
        {
          question:
            'Which imperial force contributed over 1.5 million men to the British war effort, fighting in places like Ypres and Mesopotamia?',
          options: [
            'The Australian and New Zealand Army Corps (ANZAC)',
            'The British Indian Army',
            'The British West Indies Regiment',
          ],
          answer: 2,
        },
        {
          question:
            'Why were many black soldiers in the British West Indies Regiment (BWIR) angry about their treatment?',
          options: [
            'They were forced to fight on the front lines without any weapons.',
            'They were forced to return to the Caribbean before the war ended.',
            'They were stripped of combat roles, paid less, and forced into dangerous manual labor.',
          ],
          answer: 1,
        },
        {
          question: 'What happened in Taranto, Italy, in 1918?',
          options: [
            'The British Army officially apologized for its racist policies.',
            'Indian troops broke through the German lines and ended the war.',
            'Soldiers of the BWIR mutinied in protest against systemic racism and degrading conditions.',
          ],
          answer: 1,
        },
        {
          question:
            "What does historian David Olusoga mean when he discusses 'historical amnesia' regarding WWI?",
          options: [
            'The way the massive contributions of non-white imperial troops were deliberately left out of popular history to maintain a myth of white imperial superiority.',
            'The fact that soldiers who suffered from shell shock lost their memories.',
            'The failure of the British government to keep accurate records of casualties.',
          ],
          answer: 1,
        },
        {
          question:
            'Which term best describes a historical narrative (like Interpretation 1) that focuses almost exclusively on white, European experiences while ignoring the rest of the world?',
          options: ['Eurocentric', 'Pragmatic', 'Revisionist'],
          answer: 1,
        },
      ],
      narrative_blocks: [
        {
          title: 'The Core Narrative',
          text: "When Britain declared war on Germany in 1914, it did not just commit the men of the British Isles; it committed a vast global empire. By the end of the conflict, nearly 3 million men from across the British Empire and its dominions had served.<br><br><strong>The Scale of the Contribution</strong><br>The sheer scale of the imperial effort was staggering. The British Indian Army sent over 1.5 million men to fight across multiple theaters, including the freezing trenches of Ypres and the scorching deserts of Mesopotamia. Without the arrival of two Indian divisions in late 1914, the British line on the Western Front might have collapsed entirely. <br><br>The bravery of these men was extraordinary. On 31 October 1914 at the First Battle of Ypres, Sepoy <strong>Khudadad Khan</strong> of the 129th Baluchis operated his machine gun under heavy fire until all the other men in his team were killed and he himself was severely wounded. He was the first Indian soldier to be awarded the Victoria Cross, Britain's highest military honor.<br><br>Meanwhile, the British West Indies Regiment (BWIR) raised over 15,000 men from the Caribbean, and hundreds of thousands of African men were recruited—often forcibly—to serve as soldiers and carriers in the brutal East African campaign, where disease and exhaustion claimed countless lives.",
          tasks: [
            {
              type: 'short_answer',
              text: 'Knowledge Retrieval: Complete the summary table using the information from the text.',
              model_answer: 'Student completes table based on reading.',
            },
          ],
          image: '/images/gw_indian_army.jpg',
          image_alt:
            'Source A: British Indian Army soldiers serving on the Western Front in late 1914. Over 1.5 million men from the Indian subcontinent fought for the British Empire, providing crucial manpower that prevented the British lines from collapsing under the early German advance.',
          image_caption:
            'Source A: British Indian Army soldiers serving on the Western Front in late 1914. Over 1.5 million men from the Indian subcontinent fought for the British Empire, providing crucial manpower that prevented the British lines from collapsing under the early German advance.',
        },
        {
          title: "The Historians' Debate: How is the war remembered?",
          text: '<strong>Racial Hierarchy and Discrimination</strong><br>Despite their immense sacrifices, soldiers of color faced systemic racism and a strict imperial racial hierarchy. The British War Office was deeply uncomfortable with the idea of non-white troops fighting and killing European armies. Consequently, many black soldiers, particularly in the BWIR, were stripped of their combat roles and reassigned to dangerous, degrading manual labor—digging trenches, carrying ammunition, and burying the dead under heavy artillery fire.<br><br>Black soldiers were paid less than their white counterparts, were barred from being promoted to commissioned officers, and were often denied access to the same canteens and hospitals. The tension reached breaking point in December 1918. BWIR soldiers in Taranto, Italy, mutinied over these exact degrading conditions. They were forced to clean the latrines of white Italian soldiers and were denied the pay rise that had been granted to white British troops. The mutiny was suppressed, the ringleaders were imprisoned, and the BWIR was rapidly disbanded, their contributions swept under the rug.',
          tasks: [
            {
              text: "Describe one feature of the British Empire's contribution to the First World War. (2 marks)",
              answer:
                "One feature of the British Empire's contribution was the sheer scale of manpower provided. For example, over 1.4 million men from the Indian Army volunteered, providing crucial combat support on the Western Front and in the Middle East.",
              model_answer:
                "One feature of the Empire's contribution was the immense manpower provided. For example, over 1.5 million men from the British Indian Army fought across multiple theaters, including the Western Front and Mesopotamia.",
            },
            {
              question:
                'Q5. Study Source B and read the text on Racial Hierarchy. How does the impression given by the photograph contrast with the reality described in the text?',
              answer:
                'Source B portrays the soldiers of different races standing together as equals, giving the impression of a unified and equal imperial force. In reality, the British military enforced a strict racial hierarchy, paying non-white troops significantly less and often assigning them to brutal manual labor or dangerous vanguard roles rather than commanding positions.',
              model_answer:
                "The Photograph's Impression: Shows soldiers posed in full uniform holding rifles, giving the visual impression of an active, respected, front-line combat unit.\n\nThe Reality in the Text: Most BWIR soldiers were stripped of combat roles and relegated to dangerous manual labor (e.g., digging trenches, carrying ammunition, burying the dead), alongside facing unequal pay, denied promotions, and segregated facilities.",
            },
          ],
          image: '/images/gw_bwir.jpg',
          image_alt:
            'Source B: Soldiers of the British West Indies Regiment (BWIR) in camp. Over 15,000 volunteers from the Caribbean served. Despite their eagerness to fight, systemic racism meant they were frequently barred from combat roles and forced into grueling manual labor under heavy fire.',
          image_caption:
            'Source B: Soldiers of the British West Indies Regiment (BWIR) in camp. Over 15,000 volunteers from the Caribbean served. Despite their eagerness to fight, systemic racism meant they were frequently barred from combat roles and forced into grueling manual labor under heavy fire.',
        },
        {
          title: 'Fringes of History: The Chinese Labour Corps',
          text: "While millions of imperial soldiers fought on the front lines, the war effort relied equally on a massive, forgotten workforce. In 1916, facing critical manpower shortages, Britain recruited the <strong>Chinese Labour Corps (CLC)</strong>. Over 140,000 Chinese men were brought to the Western Front to do the grueling, dangerous manual labor required to keep the war machine running.<br><br>The CLC dug trenches, repaired roads under artillery fire, unloaded millions of tons of supplies at the docks, and were given the horrific task of clearing the battlefields and burying the rotting dead. Despite their essential contribution (without which the British Army could not have functioned), they were treated abysmally. They were kept in segregated camps behind barbed wire and paid a fraction of white soldiers' wages. Most tragically, when the war was won, the Chinese Labour Corps were deliberately <em>erased</em> from history. They were not invited to the Allied Victory Parade in London, and their massive contribution was ignored by historians for decades.",
          image: '/images/gw_clc.jpg',
          image_alt:
            "Source C: Members of the Chinese Labour Corps (CLC) clearing battlefield debris. Facing severe manpower shortages, Britain recruited over 140,000 Chinese workers for highly dangerous manual labor. They were paid a fraction of white soldiers' wages and deliberately excluded from victory parades.",
          tasks: [
            {
              text: 'Why do you think the 140,000 men of the Chinese Labour Corps were deliberately left out of the victory parades and historical memory?',
              answer:
                "The British government deliberately marginalized the Chinese Labour Corps to maintain the narrative of a 'white man's victory'. Recognizing the crucial logistical contribution of non-white laborers would have challenged the era's racist ideologies and the concept of white imperial supremacy.",
              model_answer:
                'They were likely erased due to racism and the desire to portray the victory as a heroic triumph of white British and European soldiers. Admitting that the British army heavily relied on 140,000 Chinese laborers to survive would undermine the imperial racial hierarchy of the time.',
            },
            {
              question:
                'Study Source C (Members of the Chinese Labour Corps). Why was the recruitment of the CLC critical to the British war effort, and how were they treated in return?',
              answer:
                'The CLC was critical for logistics; they dug trenches, unloaded ships, and cleared battlefields, freeing up British soldiers for combat. In return, they were treated poorly, kept in segregated camps behind barbed wire, and faced harsh discipline and racism.',
              model_answer:
                "The CLC was critical because Britain faced severe manpower shortages and needed workers for highly dangerous manual labor on the battlefield. In return for their vital work, they were paid only a fraction of white soldiers' wages and were deliberately excluded from post-war victory parades.",
            },
          ],
          image_caption:
            "Source C: Members of the Chinese Labour Corps (CLC) clearing battlefield debris. Facing severe manpower shortages, Britain recruited over 140,000 Chinese workers for highly dangerous manual labor. They were paid a fraction of white soldiers' wages and deliberately excluded from victory parades.",
        },
        {
          title: "Source Spotlight: A 'White Man's War'?",
          text: 'For decades, the popular memory of the First World War was heavily Eurocentric—dominated by images of white British soldiers in the mud of the Western Front. Read the two contrasting interpretations below to understand how modern historians are challenging this narrative.<br><br><blockquote><strong>Interpretation 1: The Traditional (Eurocentric) Focus</strong><br><em>"The Great War was a European tragedy, fought on the muddy fields of Flanders and the plains of France. It was here, in the brutal stalemate of the trenches, that the British soldier endured the ultimate test of endurance and secured the victory of the civilized world."</em><br>— <em>Adapted from the typical narrative focus of mid-20th-century British school textbooks</em></blockquote><br><br><blockquote><strong>Interpretation 2: The Modern Global View</strong><br><em>"The First World War was a truly global conflict... Yet in the decades that followed, the presence of hundreds of thousands of black and Asian soldiers was subtly marginalized. This historical amnesia was no accident. The narrative of a \'white man’s war\' was constructed to preserve the racial hierarchy of the Empire."</em><br>— <em>Adapted from David Olusoga, The World\'s War (2014)</em></blockquote>',
          tasks: [
            {
              text: 'Study Source A (the photograph of the British Indian Army).<br><br>How useful is Source A for an inquiry into the global nature of the First World War? (8 marks)',
              answer:
                'Source A is highly useful for an inquiry into the global nature of the war because it visually proves that the conflict extended far beyond European armies. The photograph shows Indian soldiers deploying for combat, illustrating that the British Empire relied heavily on its colonies for manpower. The provenance (a photograph taken during the war) provides an objective snapshot of the imperial troops actually present. However, its usefulness is limited as a single photograph cannot show the full scale of global involvement, such as the Chinese Labour Corps or fighting in African theaters, nor does it reveal the systemic racism and unequal pay these soldiers faced.',
              model_answer:
                'Source A is useful as it provides contemporary visual proof of non-European troops fighting on the Western Front, proving it was a global war. However, it is limited because it only shows one specific regiment at one moment in time.',
            },
            {
              type: 'short_answer',
              text: 'Why might mid-20th-century textbooks (Interpretation 1) have ignored the story of Khudadad Khan and the Taranto Mutiny?',
              answer:
                'Mid-20th-century textbooks often reflected the prevailing Eurocentric and imperialist attitudes of the time. Ignoring figures like Khudadad Khan and events like the Taranto Mutiny helped maintain a simplified, patriotic narrative that focused entirely on British heroism, deliberately omitting the vital contributions of, and the racial injustices faced by, colonial troops.',
              model_answer:
                'Textbooks likely ignored these stories because they focused on a Eurocentric narrative of white British suffering and victory, reflecting the societal racism and imperial attitudes of the mid-20th century.',
            },
            {
              type: 'short_answer',
              text: "According to Interpretation 2, why did the British Empire deliberately construct the narrative of a 'white man's war'?",
              answer:
                "According to Interpretation 2, the narrative of a 'white man's war' was constructed to protect the ideology of imperial supremacy. If colonial subjects were acknowledged as equal saviors of the Empire, they would naturally demand equal political rights and self-determination after the war, which threatened British control over its colonies.",
              model_answer:
                "Interpretation 2 argues this was deliberate 'historical amnesia' designed to preserve the racial hierarchy of the Empire. Acknowledging that non-white troops were essential to saving the British Empire would have undermined the myth of white supremacy that justified colonial rule.",
            },
          ],
        },
        {
          title: 'Pair & Share Activity',
          text: '',
          tasks: [
            {
              type: 'think_pair_share',
              question: 'Why has the contribution of Empire troops often been forgotten?',
              answer:
                'The contribution of Empire troops has often been forgotten because historical narratives were deliberately constructed by the imperial powers to highlight European heroism and maintain a hierarchy of race. Post-war commemorations, textbooks, and media largely excluded colonial soldiers to avoid acknowledging their crucial role and the subsequent demands for colonial independence.',
            },
          ],
        },
        {
          title: 'Consolidation Task',
          tasks: [
            {
              type: 'extended_writing',
              question:
                'Explain why the contribution of Empire troops was so important to the British war effort.',
              answer:
                '<strong>Point 1: Manpower</strong><br>The British army was heavily depleted by trench warfare; Empire troops provided essential reinforcements, with India alone sending over 1.4 million men to fight.<br><br><strong>Point 2: Logistics</strong><br>The war required massive logistical support. Groups like the Chinese Labour Corps dug trenches and transported supplies, allowing British troops to focus on combat.<br><br><strong>Point 3: Global Theatres</strong><br>Empire troops were vital for fighting in non-European theatres, such as the Middle East and Africa, securing British imperial interests against the Ottoman Empire.',
              hints: [
                'Sentence Starter: Empire troops were important because they provided vital manpower...',
                'Sentence Starter: For example, Indian soldiers fought in major battles such as...',
                'Sentence Starter: This resulted in Britain being able to maintain its strength on multiple fronts...',
              ],
              scaffolding:
                'Structure your answer using the IDEA framework:\n- **Identify:** State your main point clearly.\n- **Describe:** Give historical evidence and facts.\n- **Explain:** Show how the evidence supports your point.\n- **Analyse:** Link back to the question and assess its importance.',
            },
          ],
          text: '<h3>Consolidation Task</h3>',
        },
      ],
      quiz: [
        {
          q: 'Approximately how many men from the British Empire and its dominions served in the First World War?',
          a: '3 million',
          options: ['3 million', '500,000', '10 million', '100,000'],
        },
        {
          q: 'Which imperial army sent over 1.5 million men to fight in the war?',
          a: 'The British Indian Army',
          options: [
            'The South African Defence Force',
            'The Australian Imperial Force',
            'The Canadian Army',
            'The British Indian Army',
          ],
        },
        {
          q: 'Which battle featured troops from Australia and New Zealand (ANZACs) fighting a devastating campaign against the Ottoman Empire?',
          a: 'Gallipoli',
          options: ['The Somme', 'Gallipoli', 'Verdun', 'Passchendaele'],
        },
        {
          q: 'In December 1918, where did members of the British West Indies Regiment mutiny due to severe racial discrimination?',
          a: 'Taranto, Italy',
          options: ['Taranto, Italy', 'London, England', 'Ypres, Belgium', 'Cairo, Egypt'],
        },
        {
          q: 'Despite their massive sacrifices, how were imperial troops often treated in the official post-war victory celebrations?',
          a: 'They were largely forgotten and excluded from events like the London Victory Parade.',
          options: [
            'They were given the highest honors and led the parades.',
            'They were largely forgotten and excluded from events like the London Victory Parade.',
            'They were all given British citizenship and land.',
            'They were granted immediate independence for their home countries.',
          ],
        },
      ],
      video: [
        {
          type: 'era',
          url: 'https://era.org.uk/tv-radio-resources/secondary-history/britain-europe-and-the-wider-world/',
          title: "The Battle of Tanga | The World's War",
          duration: '5 mins',
          viewing_task:
            'Note down the vital contributions made by African and colonial troops during the Battle of Tanga.',
          model_answer:
            'African and colonial troops did much of the fighting and heavy lifting in the East African campaign, completely shattering the myth that WW1 was only fought by white European soldiers in France.',
        },
        {
          type: 'era',
          url: 'https://era.org.uk/streaming-service-resource/wwi-a-z-e-is-for-empire-bbc-two/',
          title: 'E is for Empire | WWI A-Z',
          duration: '3 mins',
          viewing_task: 'How did the wider British Empire contribute to the war effort?',
          model_answer:
            'Millions of men from across the British Empire, including India, Australia, Canada, and Africa, provided vital combat troops, laborers, and essential resources that allowed Britain to continue fighting.',
        },
      ],
    },
    {
      id: 'lesson_4',
      title: 'How did a war fought miles away completely control daily life in Britain?',
      learning_objectives: [
        'Describe the key features of the Home Front, including rationing, propaganda, and the role of women in industry',
        'Explain how the war expanded the power of Parliament and challenged traditional ideas about democracy and gender',
        'Evaluate the significance of the war as a catalyst for social and political change in Britain',
      ],
      vocabulary: [
        {
          term: 'Home Front',
          definition:
            'The civilian population and activities within a country at war, as opposed to the military front.',
        },
        {
          term: 'Democracy',
          definition:
            'Government by the people — the war accelerated the expansion of voting rights, including for women.',
        },
        {
          term: 'Parliament',
          definition:
            'The law-making body that passed wartime legislation like DORA (Defence of the Realm Act).',
        },
        {
          term: 'Propaganda',
          definition:
            'Material used to maintain civilian morale, encourage rationing, and recruit workers.',
        },
        {
          term: 'Suffrage',
          definition:
            "The right to vote — women's war work helped secure partial female suffrage in 1918.",
        },
        {
          term: 'Change',
          definition:
            'The war caused fundamental social and political change in Britain, challenging old class and gender structures.',
        },
      ],
      teacher_notes: {
        primer:
          "Examine how the concept of 'Total War' completely transformed the British home front, focusing on government control, conscription, and the complex, often temporary, shifts in women's social status.",
        objectives: [
          {
            objective: "Understand the concept of 'Total War' and government control.",
            primer: 'Explain the Defense of the Realm Act (DORA) and the shift to conscription.',
            question:
              'Why did the British government feel it was necessary to water down beer and censor letters?',
          },
          {
            objective: 'Analyze the changing social status and experiences of women.',
            primer:
              "Discuss the Canary Girls of Priddy's Hard and contrast the differing historical interpretations of their liberation.",
            question:
              'Did the First World War permanently liberate British women, or was it a temporary illusion driven by wartime necessity?',
          },
        ],
        source_context:
          "The visual sources in this lesson highlight the concept of 'Total War' on the home front. Images of 'Munitionettes' demonstrate how women were mobilized into dangerous industrial roles, shattering traditional gender norms, while the 'Shot at Dawn' memorial forces us to confront the brutal military discipline imposed on traumatized soldiers. **Hinge Question:** Look at the painting of the Munitionettes; how does this image prove that the First World War was won in the factories just as much as in the trenches?",
      },
      do_now: {
        title: 'Do Now: Retrieval Grid',
        type: 'grid',
        items: [
          {
            question:
              'How many Indian soldiers volunteered to serve the British Empire during the First World War?',
            answer: 'Over 1.5 million Indian soldiers volunteered.',
            points: 1,
            category: 'Lesson 3 Recall',
          },
          {
            question: 'What was the cause and outcome of the Taranto Mutiny in December 1918?',
            answer:
              'It was caused by the racist treatment, poor conditions, and forced manual labor of the British West Indies Regiment. It fueled early movements for Caribbean independence.',
            points: 1,
            category: 'Lesson 3 Recall',
          },
          {
            question:
              'Why did the rapid population growth of industrial towns like Leeds and Manchester cause a severe sanitation crisis in the 19th century?',
            answer:
              'Because towns grew too quickly without building regulations, leading to overcrowded back-to-back houses and overflowing shared cesspits.',
            points: 2,
            category: 'Thematic Recall',
          },
          {
            question:
              'What landmark British law in 1875 finally forced local councils to take legal responsibility for providing clean water and sewer systems?',
            answer: 'The Public Health Act of 1875.',
            points: 2,
            category: 'Thematic Recall',
          },
          {
            question:
              "Why should a historian be cautious when using a politician's post-war memoirs to judge a general's military competence?",
            answer:
              'Because politicians often write memoirs to defend their own decisions, protect their historical reputation, and shift blame for costly military failures onto others.',
            points: 3,
            category: 'Historical Skills',
          },
          {
            question: 'Explain the difference between "Causation" and "Consequence" in history.',
            answer:
              'Causation refers to the factors or reasons that make an event happen, while Consequence refers to the effects, outcomes, or impacts that result from that event.',
            points: 3,
            category: 'Historical Skills',
          },
        ],
      },
      enquiry: 'How did a war fought miles away completely control daily life in Britain?',
      vocab: [
        {
          term: 'Total War',
          definition:
            'A conflict in which a nation mobilizes all of its resources, industries, and civilian population to support the war effort.',
        },
        {
          term: 'Defense of the Realm Act (DORA)',
          definition:
            'An emergency British law passed in August 1914 that gave the government sweeping powers to control daily life.',
        },
        {
          term: 'Conscientious Objector',
          definition:
            'A person who refuses to serve in the armed forces or fight in a conflict due to moral, ethical, or religious objections.',
        },
        {
          term: 'Conscription',
          definition: 'A compulsory law forcing citizens to enlist in the armed forces.',
        },
        {
          term: "Priddy's Hard",
          definition:
            'A major Royal Navy armaments depot in Gosport where local women worked filling shells and handling explosives during the war.',
        },
      ],
      narrative_blocks: [
        {
          title: 'The Core Narrative',
          text: 'To win a total war of industrial survival, the British government realized it needed complete control over the civilian population. In August 1914, Parliament passed the <strong>Defence of the Realm Act (DORA)</strong>, granting the government sweeping, unprecedented powers over the daily lives of British citizens.<br><br><strong>Controlling the Home Front</strong><br>DORA allowed the government to bypass Parliament and issue direct orders. The rules ranged from the deadly serious to the bizarrely specific. Under DORA, it became illegal to fly a kite, light a bonfire, or feed wild animals, as these could potentially signal enemy zeppelins or waste valuable food. British Summer Time (Daylight Savings) was introduced to maximize factory working hours. Crucially, pub opening hours were strictly limited and alcohol was watered down, as the government feared that drunk munitions workers would slow down shell production.<br><br>DORA also introduced extreme censorship. The government controlled the newspapers, heavily censoring reports of British defeats and casualty numbers to maintain civilian morale. Letters written by soldiers at the front were read by officers, who used black markers to cross out any details about military locations, horrific trench conditions, or low morale before they could be sent home to families.',
          tasks: [
            {
              type: 'short_answer',
              text: 'Knowledge Retrieval: Complete the summary table using the information from the text.',
              model_answer: 'Student completes table based on reading.',
            },
          ],
          image: '/images/gw_women_say_go.jpg',
          image_alt:
            "Source A: The 'Women of Britain Say GO!' propaganda poster (1915). Before conscription was introduced in 1916, the government relied entirely on voluntary enlistment, using emotional blackmail and the powerful influence of women to shame men into joining the army.",
          image_caption:
            "Source A: The 'Women of Britain Say GO!' propaganda poster (1915). Before conscription was introduced in 1916, the government relied entirely on voluntary enlistment, using emotional blackmail and the powerful influence of women to shame men into joining the army.",
        },
        {
          title: "The Historians' Debate: Did the war liberate women?",
          text: "<strong>The 'Canaries' and Total War</strong><br>With millions of men fighting overseas, the British economy faced collapse. The solution was the mass mobilization of women into the workforce. Over a million women took up jobs previously reserved exclusively for men—driving buses, working on farms (the Women's Land Army), and crucially, manufacturing weapons.<br><br>These female munitions workers were affectionately known as the \"Canaries.\" They worked long, exhausting shifts packing highly explosive TNT into artillery shells. The toxic chemicals turned their skin and hair a bright yellowish-orange (hence the nickname). The work was exceptionally dangerous; toxic jaundice caused liver failure, and accidental explosions were a constant threat. In 1917, the Silvertown munitions factory in London exploded, killing 73 people and destroying hundreds of homes. Despite the extreme danger and the toxic health effects, the Canaries produced over 80% of the weapons and shells used by the British Army, proving that women were entirely capable of performing heavy industrial labor.<br><br>Read the two contrasting interpretations below to understand how modern historians debate the impact of the war on women.<br><br><blockquote><strong>Interpretation 1: The Optimistic View</strong><br><em>\"The First World War was a massive engine of social change. By proving that women could successfully perform heavy industrial labor in the munitions factories, it shattered Victorian myths of female frailty. This undeniable contribution permanently altered the social status of women and was the direct cause of them finally winning the right to vote in 1918.\"</em><br>— <em>Adapted from Arthur Marwick, The Deluge (1965)</em></blockquote><br><br><blockquote><strong>Interpretation 2: The Revisionist View</strong><br><em>\"The idea that the war 'liberated' women is largely a myth. The changes were a temporary illusion driven by national emergency. Women were still paid significantly less than men, and the moment the war ended in 1918, they were unceremoniously fired to make way for returning soldiers. Furthermore, the 1918 voting act completely ignored the young, working-class 'Canary Girls' who had actually risked their lives.\"</em><br>— <em>Adapted from Gail Braybon, Women Workers in the First World War (1981)</em></blockquote>",
          tasks: [
            {
              text: 'Study Source B (the painting of the Munitionettes).<br><br>How useful is Source B for an inquiry into the impact of the war on women? (8 marks)',
              answer:
                "Source B is highly useful as it visually demonstrates the radical shift in women's roles, showing them performing heavy, industrial labor in munitions factories—work previously restricted to men. The provenance (a wartime painting) captures the scale of female mobilization. However, its usefulness is limited; as a piece of likely patriotic art, it may romanticize the work and omit the harsh realities, such as the deadly risk of TNT poisoning ('canaries') and the unequal pay women received compared to their male counterparts.",
              model_answer:
                "Source A is highly useful as it is a contemporary painting showing women taking on heavy industrial roles in munitions factories, proving a significant shift in female employment. However, as a painting, it is an artist's subjective interpretation and may romanticize or sanitize the dangerous conditions.",
            },
          ],
          image: '/images/gw_munitionettes.jpg',
          image_alt:
            "Source B: A vivid painting depicting 'Munitionettes' working in a massive British armaments factory. With millions of men fighting overseas, the government relied on over 900,000 women to manufacture the vital artillery shells needed for the war effort, a key element of 'Total War'.",
          image_caption:
            "Source B: A vivid painting depicting 'Munitionettes' working in a massive British armaments factory. With millions of men fighting overseas, the government relied on over 900,000 women to manufacture the vital artillery shells needed for the war effort, a key element of 'Total War'.",
        },
        {
          title: 'Fringes of History: Conscientious Objectors',
          text: 'When conscription (forced military service) was introduced in 1916, not everyone agreed to fight. Around 16,000 men refused to join the army on moral or religious grounds. They were known as <strong>Conscientious Objectors (or \'Conchies\')</strong>.<br><br>Their treatment on the Home Front was brutal. They were widely viewed as cowards and traitors by the public and government. While some were allowed to do non-combat roles like driving ambulances under fire (which took immense bravery), absolutists who refused to contribute to the war effort in any way were thrown into harsh civilian prisons, where they faced solitary confinement, starvation diets, and forced labor. Some were even shipped to the front lines in France, court-martialed for refusing orders, and sentenced to be "Shot at Dawn" (though these death sentences were later commuted to 10 years in prison). Today, they are remembered for their bravery in standing up for their beliefs, commemorated by a special memorial at the National Memorial Arboretum.',
          image: '/images/gw_arboretum.jpg',
          image_alt:
            "Source C: The 'Shot at Dawn' Memorial, commemorating the 306 British and Commonwealth soldiers executed by firing squad for cowardice or desertion. Modern historians recognize that many of these men were actually suffering from severe, undiagnosed shell shock (PTSD).",
          tasks: [
            {
              text: "Many people in 1916 believed Conscientious Objectors were cowards. How could you argue that it actually took immense bravery to be a 'Conchie'?",
              answer:
                "Being a Conscientious Objector took immense bravery because they faced overwhelming social ostracization, public shaming (like receiving white feathers), and severe state punishment. Many 'Absolutists' endured brutal conditions in military prisons, including solitary confinement and physical abuse, standing firm in their moral or religious convictions despite immense pressure to conform.",
              model_answer:
                'It took immense bravery because they knew they would face total social isolation, public hatred, and harsh imprisonment. Standing up to the entire British government and society for your deeply held moral beliefs, even when threatened with execution, requires a different kind of courage than fighting in a trench.',
            },
            {
              question:
                "Study Source C (The 'Shot at Dawn' Memorial). Based on modern historical understanding, why is the execution of these 306 soldiers considered a tragic injustice?",
              answer:
                'Modern understanding recognizes that many of the executed soldiers were suffering from severe Shell Shock (PTSD), a condition poorly understood at the time. They were not cowards but psychologically broken men who were denied fair military trials and were executed as an example to maintain discipline, making their deaths a tragic miscarriage of justice.',
              model_answer:
                'Modern historians recognize that many of the soldiers executed for "cowardice" or "desertion" were not cowards, but were actually suffering from severe, undiagnosed shell shock (PTSD) caused by the horrors of trench warfare.',
            },
          ],
          image_caption:
            "Source C: The 'Shot at Dawn' Memorial, commemorating the 306 British and Commonwealth soldiers executed by firing squad for cowardice or desertion. Modern historians recognize that many of these men were actually suffering from severe, undiagnosed shell shock (PTSD).",
        },
        {
          title: 'Source Spotlight: Censorship and Control',
          text: 'The government realized that controlling information was just as important as producing weapons.<br><br><strong>Source D: A censored letter home from the Somme (1916)</strong><br><em>"Dear Mother, We are currently stationed at [CENSORED]. The weather is terrible, and the [CENSORED] is up to our knees. We lost [CENSORED] men yesterday during the push toward [CENSORED]. Don\'t worry about me, I am keeping my head down."</em>',
          tasks: [
            {
              type: 'short_answer',
              text: "Looking at Source D, why did the British government use DORA to mandate the strict censorship of soldiers' letters home? (Give two specific reasons).",
              answer:
                '1. <strong>Preventing intelligence leaks:</strong> To ensure that operational details, troop movements, and locations did not accidentally fall into enemy hands.<br>2. <strong>Maintaining morale:</strong> To prevent the horrific realities of trench warfare from reaching the Home Front, which could damage civilian morale and reduce support for the war.',
              model_answer:
                'Firstly, the government censored locations and troop movements so that if the mail was intercepted by German spies, they would not gain any tactical military advantage. Secondly, they censored casualty numbers and descriptions of the horrific conditions to protect civilian morale on the Home Front, preventing families from realizing the true scale of the slaughter and turning against the war effort.',
            },
          ],
        },
        {
          title: 'Pair & Share Activity',
          text: '',
          tasks: [
            {
              type: 'think_pair_share',
              question:
                'How did the Defence of the Realm Act (DORA) change the relationship between the citizen and the state?',
              answer:
                "DORA drastically altered the relationship by granting the state unprecedented control over citizens' daily lives. It restricted freedom of speech (censorship), movement, and commerce (pub opening hours, rationing), shifting Britain from a liberal democracy to a tightly regulated wartime state where individual rights were subordinated to national security.",
            },
          ],
        },
        {
          title: 'Consolidation Task',
          tasks: [
            {
              type: 'extended_writing',
              question:
                'Explain how the Defence of the Realm Act (DORA) changed everyday life in Britain.',
              answer:
                "<strong>Point 1: State Control and Censorship</strong><br>DORA allowed the government to heavily censor newspapers and soldiers' letters, ensuring the public only read positive, sanitized versions of the war to maintain morale.<br><br><strong>Point 2: Daily Restrictions</strong><br>It introduced numerous petty restrictions on daily life, such as diluting beer, restricting pub opening hours, and banning activities like flying kites or feeding ducks, to maximize productivity and resources.<br><br><strong>Point 3: Industrial and Economic Mobilisation</strong><br>DORA gave the government the power to take over factories for munitions production and eventually introduce strict food rationing to combat German U-boat blockades.",
              hints: [
                'Sentence Starter: DORA changed everyday life by giving the government unprecedented control...',
                'Sentence Starter: For example, the government introduced censorship and rationing to...',
                'Sentence Starter: This resulted in ordinary civilians facing strict rules about...',
              ],
              scaffolding:
                'Structure your answer using the IDEA framework:\n- **Identify:** State your main point clearly.\n- **Describe:** Give historical evidence and facts.\n- **Explain:** Show how the evidence supports your point.\n- **Analyse:** Link back to the question and assess its importance.',
            },
          ],
          text: '<h3>Consolidation Task</h3>',
        },
      ],
      quiz: [
        {
          q: 'What term describes a conflict where the boundary between soldiers and civilians vanishes?',
          a: 'Total War',
          options: ['Unlimited War', 'Civilian Warfare', 'Total War', 'Absolute War'],
        },
        {
          q: 'What law gave the British government sweeping emergency powers in August 1914?',
          a: 'The Defense of the Realm Act (DORA)',
          options: [
            'The Conscription Act',
            'The Emergency Powers Act',
            'The Civilian Control Order',
            'The Defense of the Realm Act (DORA)',
          ],
        },
        {
          q: 'What nickname was given to women who worked in munitions factories and suffered from yellow skin due to toxic TNT?',
          a: 'Canary Girls',
          options: ['Yellow Women', 'TNT Ladies', 'Canary Girls', 'Explosive Girls'],
        },
        {
          q: 'What term describes men who refused to fight in the war on moral, political, or religious grounds?',
          a: 'Conscientious Objectors',
          options: [
            'Pacifist Resisters',
            'Conscientious Objectors',
            'Anti-War Rebels',
            'Cowardly Dodgers',
          ],
        },
        {
          q: 'How did the British government respond to the severe food shortages caused by German U-boat attacks in 1918?',
          a: 'They introduced rationing to ensure fair distribution of food.',
          options: [
            'They imported all their food from America.',
            'They forced citizens to grow their own food or face prison.',
            'They introduced rationing to ensure fair distribution of food.',
            'They surrendered to Germany.',
          ],
        },
      ],
      video: [
        {
          type: 'era',
          url: 'https://era.org.uk/streaming-service-resource/wwi-a-z-w-is-for-women-bbc-two/',
          title: 'W is for Women | WWI A-Z',
          duration: '3 mins',
          viewing_task: "What were the 'Munitionettes' and why was their work so dangerous?",
          model_answer:
            "Munitionettes were the 1 million women who worked in munitions factories making shells. The work was incredibly dangerous due to the risk of massive factory explosions and toxic TNT poisoning, which turned their skin yellow (earning them the nickname 'Canaries').",
        },
        {
          type: 'era',
          url: 'https://era.org.uk/streaming-service-resource/wwi-a-z-c-is-for-conscription-bbc-two/',
          title: 'C is for Conscription | WWI A-Z',
          duration: '3 mins',
          viewing_task: 'Explain why the government was forced to introduce conscription in 1916.',
          model_answer:
            'The initial rush of volunteers had dried up by 1915, and due to massive casualties on the Western Front, the government had to force men to join the army (conscription) to keep the military functioning.',
        },
      ],
    },
    {
      id: 'lesson_5',
      title:
        'Did the Treaty of Versailles solve the problems of 1914, or create the nightmares of 1939?',
      enquiry:
        'Did the Treaty of Versailles solve the problems of 1914, or create the nightmares of 1939?',
      learning_objectives: [
        'Describe the key terms of the Treaty of Versailles and the competing aims of the Allied powers',
        'Explain why the treaty created new tensions through trade restrictions, territorial changes, and the War Guilt Clause',
        'Evaluate whether the Treaty of Versailles represented genuine change or simply planted the seeds for future conflict',
      ],
      vocabulary: [
        {
          term: 'Treaty of Versailles',
          definition:
            'The peace treaty signed in 1919 that officially ended the Great War and imposed harsh terms on Germany.',
        },
        {
          term: 'Reparations',
          definition:
            'Financial compensation demanded from Germany for the damage caused during the war.',
        },
        {
          term: 'War Guilt Clause',
          definition:
            'Article 231 of the Treaty, which forced Germany to accept full responsibility for causing the war.',
        },
        {
          term: 'Continuity',
          definition:
            'When aspects of a situation remain the same — did the treaty solve the problems of 1914 or preserve them?',
        },
        {
          term: 'Revolution',
          definition:
            'Dramatic political upheaval — the war triggered revolutions in Russia (1917) and Germany (1918).',
        },
      ],
      teacher_notes: {
        primer:
          'This lesson evaluates the conclusion of the First World War and introduces students to high-level historiographical debate regarding the Treaty of Versailles, shifting from basic source utility to complex interpretation analysis.',
        objectives: [
          {
            objective:
              'Understand the harsh terms imposed on Germany by the Treaty of Versailles, including Article 231.',
            primer:
              "Highlight the 'Diktat' and the crippling economic/military sanctions placed on Germany by the 'Big Three'.",
            question:
              "Why was the Treaty of Versailles considered a 'Diktat' by the German people?",
          },
          {
            objective: 'Analyze conflicting historiographical interpretations of the Treaty.',
            primer:
              "Contrast the traditional view (Keynes) of a 'Carthaginian peace' with the modern revisionist view (MacMillan) that the failure lay in enforcement.",
            question:
              'How does the modern revisionist view challenge the idea that the Treaty was excessively harsh?',
          },
        ],
        source_context:
          'The visual sources in this lesson (photographs of the Big Four and contemporary political cartoons) capture the tense, vengeful atmosphere of the Paris Peace Conference. The cartoons are particularly valuable as they reveal contemporary awareness—even in 1919—that the extreme harshness of the treaty might guarantee a future conflict. **Hinge Question:** Look at the German political cartoon showing the guillotine; how does this source help explain why the German public overwhelmingly supported the dismantling of the Treaty of Versailles in the 1930s?',
      },
      do_now: {
        title: 'Do Now: Retrieval Grid',
        type: 'grid',
        items: [
          {
            question:
              'What was the name of the 1914 British law that gave the government sweeping emergency powers to censor newspapers and ration food?',
            answer: 'The Defense of the Realm Act (DORA).',
            points: 1,
            category: 'Lesson 4 Recall',
          },
          {
            question:
              'What nickname was given to the female British munitions workers whose skin turned yellow due to toxic chemical exposure?',
            answer: '"Canary Girls" (or Munitionettes).',
            points: 1,
            category: 'Lesson 4 Recall',
          },
          {
            question:
              'Why did over 130,000 members of the British West Indies Regiment suffer a major mutiny in Taranto, Italy, in December 1918?',
            answer:
              'Because they were subjected to severe racial discrimination, poor conditions, and forced into humiliating manual labor instead of combat roles.',
            points: 2,
            category: 'Thematic Recall',
          },
          {
            question:
              "Why did General Douglas Haig's week-long artillery bombardment fail to destroy the German defenders before the Battle of the Somme?",
            answer:
              'Because German soldiers survived safely in deep, concrete-reinforced underground bunkers.',
            points: 2,
            category: 'Thematic Recall',
          },
          {
            question:
              'Place these three WWI milestones in chronological order: The Battle of the Somme, The assassination of Archduke Franz Ferdinand, The Treaty of Versailles.',
            answer:
              '1. Assassination of Franz Ferdinand (June 1914), 2. Battle of the Somme (July 1916), 3. Treaty of Versailles (June 1919).',
            points: 3,
            category: 'Historical Skills',
          },
          {
            question:
              'Explain the difference between "change" and "continuity" when studying the roles of women on the British Home Front.',
            answer:
              'Change refers to the new temporary opportunities in factories, while continuity refers to how most women were pushed back into traditional domestic roles once the war ended.',
            points: 3,
            category: 'Historical Skills',
          },
        ],
      },
      vocab: [
        {
          term: 'Armistice',
          definition: 'An agreement made by opposing sides in a war to stop fighting; a truce.',
        },
        {
          term: 'War Guilt Clause (Article 231)',
          definition:
            'The section of the Treaty of Versailles forcing Germany to accept sole blame for starting the war.',
        },
        {
          term: 'Reparations',
          definition:
            'Massive financial payments forced upon a defeated nation to pay for war damage.',
        },
        {
          term: 'Diktat',
          definition:
            "A German term meaning a 'dictated peace,' used because they were banned from negotiating the terms.",
        },
      ],
      narrative_blocks: [
        {
          title: 'The Core Narrative',
          text: "When the guns finally fell silent on November 11, 1918, the world was left in ruins. Millions were dead, empires had collapsed, and the map of Europe had to be redrawn. In January 1919, the victorious Allied leaders gathered at the Palace of Versailles in Paris to decide the fate of a defeated Germany. The conference was dominated by the \"Big Three\":<br><br><ul><li><strong>Georges Clemenceau (France):</strong> Known as 'The Tiger', Clemenceau wanted revenge. Most of the fighting on the Western Front had taken place on French soil, destroying their industry and land. He wanted Germany crippled militarily and financially so they could never attack France again.</li><li><strong>Woodrow Wilson (USA):</strong> An idealist who had only joined the war in 1917. Wilson wanted a fair peace based on his 'Fourteen Points'. He believed punishing Germany too harshly would only lead to a future war for revenge. He also proposed a 'League of Nations' to solve future disputes peacefully.</li><li><strong>David Lloyd George (Britain):</strong> A pragmatist caught in the middle. He had just won a British election promising to \"Make Germany Pay!\", but privately, he worried that a destroyed Germany would lead to a communist revolution and would ruin British trade in Europe.</li></ul>",
          tasks: [
            {
              type: 'short_answer',
              text: 'Knowledge Retrieval: Complete the summary table using the information from the text.',
              model_answer: 'Student completes table based on reading.',
            },
          ],
          image: '/images/gw_big_three_versailles.jpg',
          image_alt:
            "Source A: The 'Big Four' leaders (David Lloyd George of Britain, Vittorio Orlando of Italy, Georges Clemenceau of France, and Woodrow Wilson of the USA) at the Versailles Peace Conference in 1919. They held the fate of a defeated Germany in their hands.",
          image_caption:
            "Source A: The 'Big Four' leaders (David Lloyd George of Britain, Vittorio Orlando of Italy, Georges Clemenceau of France, and Woodrow Wilson of the USA) at the Versailles Peace Conference in 1919. They held the fate of a defeated Germany in their hands.",
        },
        {
          title: "The Historians' Debate: A Doomed Peace?",
          text: '<strong>The Terms of the Treaty: A Diktat</strong><br>Germany was not invited to negotiate; they were simply handed the treaty and forced to sign it under the threat of invasion. For this reason, Germans bitterly referred to the treaty as a <strong>Diktat</strong> (a dictated peace). The terms were deliberately devastating:<br><br><ul><li><strong>Territory (Land):</strong> Germany lost 13% of its European land and 12% of its population. The wealthy coal fields of the Saar were given to France for 15 years, and the industrial region of Alsace-Lorraine was returned to France. Crucially, the \'Polish Corridor\' was carved out of Germany, splitting the country in two.</li><li><strong>Military:</strong> The proud German army was slashed to just 100,000 men. They were banned from having an air force (Luftwaffe), tanks, or submarines. The Rhineland (the border area with France) was demilitarized.</li><li><strong>Reparations (Money):</strong> Germany was ordered to pay a staggering £6.6 billion in reparations to the Allies for the damage caused by the war—an impossible sum that would shatter the German economy.</li><li><strong>Blame:</strong> The most hated term was Article 231 (The War Guilt Clause), which forced Germany to accept 100% of the blame for starting the war.</li></ul><br><br>Read the two contrasting interpretations below to understand how historians debate the legacy of the Treaty of Versailles.<br><br><blockquote><strong>Interpretation 1: The Traditional View</strong><br><em>"The Treaty of Versailles was a disastrous, vindictive peace. The economic reparations imposed on Germany are completely impossible to pay and will inevitably lead to the total financial collapse of central Europe. By stripping Germany of its wealth and humiliating its people, the Allies have virtually guaranteed a war of vengeance in the near future."</em><br>— <em>Adapted from John Maynard Keynes, The Economic Consequences of the Peace (1919)</em></blockquote><br><br><blockquote><strong>Interpretation 2: The Revisionist View</strong><br><em>"The Treaty of Versailles was actually quite lenient compared to the brutal treaty Germany had forced upon Russia in 1918. Germany remained largely intact and structurally wealthy. The true failure was not that the treaty was too harsh, but that the Allies lacked the political will and unity to actually enforce it in the 1930s, allowing Hitler to easily tear it up."</em><br>— <em>Adapted from Margaret MacMillan, Peacemakers (2001)</em></blockquote>',
          tasks: [
            {
              text: 'Describe one feature of the military restrictions placed on Germany by the Treaty of Versailles. (2 marks)',
              answer:
                'One feature of the military restrictions was the severe limitation on the size of the German army. The army was restricted to just 100,000 men, and conscription was completely banned, aiming to prevent Germany from ever starting another war.',
              model_answer:
                'One feature of the military restrictions was that they left Germany virtually defenseless. For example, the German army was limited to just 100,000 men and they were banned from having submarines or an air force.',
            },
            {
              question:
                'Study Source B (the 1919 political cartoon). What is the cartoonist suggesting about the long-term consequences of the Treaty of Versailles?',
              answer:
                "The cartoonist is suggesting that the Treaty of Versailles is overly harsh and vindictive. By forcing Germany to swallow the 'peace terms' like a giant pill, it implies that the treaty is deeply humiliating and damaging, planting the seeds for future resentment and inevitably leading to another conflict.",
              model_answer:
                'By depicting a weeping child labeled "1940 Class", the cartoonist is suggesting that the extremely harsh terms of the treaty would fail to secure lasting peace, and would instead inevitably spark another devastating world war when that child reached fighting age.',
            },
          ],
          image: '/images/gw_weeping_child.jpg',
          image_alt:
            "Source B: A famous 1919 political cartoon showing the 'Big Four' leaders leaving the Versailles conference. A child labeled '1940 Class' is weeping, symbolizing the tragic foresight that the harsh terms of the treaty would inevitably spark another world war when that child grew up.",
          image_caption:
            "Source B: A famous 1919 political cartoon showing the 'Big Four' leaders leaving the Versailles conference. A child labeled '1940 Class' is weeping, symbolizing the tragic foresight that the harsh terms of the treaty would inevitably spark another world war when that child grew up.",
        },
        {
          title: 'Pair & Share Activity',
          text: '',
          tasks: [
            {
              type: 'think_pair_share',
              question:
                'Was the Treaty of Versailles a fair settlement or a vindictive peace that guaranteed a future war?',
              answer:
                'While some argue the Treaty was fair given the devastating damage Germany inflicted on France, it is widely considered a vindictive peace. The extreme reparations, the humiliating War Guilt Clause (Article 231), and the crippling military restrictions created deep economic instability and national resentment in Germany, directly fueling the rise of extremist parties like the Nazis and laying the groundwork for WWII.',
            },
          ],
        },
        {
          title: 'Consolidation Task',
          tasks: [
            {
              type: 'extended_writing',
              question:
                'Explain why the Treaty of Versailles caused so much resentment in Germany.',
              answer:
                "<strong>Point 1: The 'Diktat' and War Guilt</strong><br>Germany was not allowed to negotiate the treaty (a 'dictated peace') and was forced to accept full blame for starting the war under Article 231, which was deeply humiliating for a proud nation.<br><br><strong>Point 2: Economic Ruin</strong><br>The treaty demanded exorbitant reparations (£6.6 billion) while simultaneously stripping Germany of its wealthy industrial territories (like the Saar), plunging the country into a severe economic crisis and hyperinflation.<br><br><strong>Point 3: Military Vulnerability</strong><br>The restriction of the army to 100,000 men and the demilitarization of the Rhineland left Germany feeling defenseless and vulnerable to its hostile neighbors, dealing a massive blow to national pride.",
              hints: [
                'Sentence Starter: The Treaty caused resentment because Germany felt it was a "Diktat" (dictated peace)...',
                'Sentence Starter: For example, the War Guilt Clause (Article 231) forced Germany to...',
                'Sentence Starter: This resulted in a deep sense of humiliation and economic ruin due to...',
              ],
              scaffolding:
                'Structure your answer using the IDEA framework:\n- **Identify:** State your main point clearly.\n- **Describe:** Give historical evidence and facts.\n- **Explain:** Show how the evidence supports your point.\n- **Analyse:** Link back to the question and assess its importance.',
            },
          ],
          text: '<h3>Consolidation Task</h3>',
        },
      ],
      quiz: [
        {
          q: 'What date was the Treaty of Versailles officially signed by Allied and German leaders?',
          a: 'June 28, 1919',
          options: ['September 1, 1939', 'November 11, 1918', 'June 28, 1919', 'January 1, 1914'],
        },
        {
          q: "Which US President proposed the 'Fourteen Points' and wanted to create a League of Nations?",
          a: 'Woodrow Wilson',
          options: [
            'Franklin D. Roosevelt',
            'David Lloyd George',
            'Georges Clemenceau',
            'Woodrow Wilson',
          ],
        },
        {
          q: 'What was the name of Article 231 of the Treaty of Versailles?',
          a: 'The War Guilt Clause',
          options: [
            'The War Guilt Clause',
            'The Demilitarization Act',
            'The Reparation Standard',
            'The Armistice Agreement',
          ],
        },
        {
          q: 'Why do modern revisionist historians like Margaret MacMillan argue Versailles was NOT excessively harsh?',
          a: 'Because Germany remained intact as a wealthy state, and the terms were lighter than what Germany had forced on Russia.',
          options: [
            'Because Britain and France gave Germany new colonies in Africa to help them recover.',
            'Because Germany was allowed to keep a massive 1 million man army.',
            'Because Germany remained intact as a wealthy state, and the terms were lighter than what Germany had forced on Russia.',
            "Because the Allies forgave Germany's debt in 1920.",
          ],
        },
        {
          q: "Why did the German people call the Treaty of Versailles a 'Diktat'?",
          a: 'They were completely excluded from the peace talks and forced to sign it.',
          options: [
            'It was dictated directly by Adolf Hitler.',
            'It was signed in a railway carriage in the middle of a German forest.',
            "The entire treaty was written in a secret code they couldn't read.",
            'They were completely excluded from the peace talks and forced to sign it.',
          ],
        },
      ],
      video: [
        {
          type: 'era',
          url: 'https://era.org.uk/tv-radio-resources/secondary-history/britain-europe-and-the-wider-world/',
          title: "The Treaty of Versailles | Hitler's Rise: The Colour Films",
          duration: '5 mins',
          viewing_task:
            'Watch the colorized footage and list two ways the Treaty of Versailles punished Germany.',
          model_answer:
            '1. It forced Germany to accept full blame for the war (the War Guilt clause). 2. It imposed devastating financial reparations that shattered the German economy.',
        },
        {
          type: 'era',
          url: 'https://era.org.uk/tv-radio-resources/secondary-history/britain-europe-and-the-wider-world/',
          title: 'The end of WW1 | Nazis: A Warning from History',
          duration: '5 mins',
          viewing_task: 'How did the German public react to the peace terms?',
          model_answer:
            "They were deeply bitter and felt betrayed, viewing the treaty as a 'Diktat' (a dictated peace) that humiliated their nation and stripped them of their dignity.",
        },
      ],
    },
    {
      id: 'lesson_6',
      title: 'How did the "Lost Generation" impact the village of Stubbington?',
      enquiry: 'How did the "Lost Generation" impact the village of Stubbington?',
      learning_objectives: [
        'Describe the local impact of the Great War on communities like Stubbington, using evidence from war memorials and Church records',
        "Explain the significance of the concept of the 'Lost Generation' for understanding the war's long-term social consequences",
        'Evaluate primary sources (war memorials, photographs, local records) to construct a historically grounded account of local impact',
      ],
      vocabulary: [
        {
          term: 'Significance',
          definition:
            "The importance of an event — understanding why the 'Lost Generation' matters for local and national history.",
        },
        {
          term: 'Commemoration',
          definition:
            'How we remember and honour those who died — through war memorials, Remembrance Day, and local records.',
        },
        {
          term: 'Primary source',
          definition:
            'A document, photograph, or object created at the time of the event being studied.',
        },
        {
          term: 'Lost Generation',
          definition:
            'The millions of young men killed in the Great War, leaving a devastating gap in communities across Britain.',
        },
        {
          term: 'War memorial',
          definition:
            "A monument dedicated to the memory of those who died in war — Stubbington's memorial lists local men who were killed.",
        },
      ],
      teacher_notes: {
        primer:
          'This lesson concludes the unit by scaling down the macro-statistics of the Great War into a localized micro-history, focusing on the Stubbington War Memorial and the tragic loss of the Lowry brothers. This fosters historical empathy and helps students grasp the profound demographic and emotional toll of the conflict.',
        objectives: [
          {
            objective:
              'Understand the scale of the "Lost Generation" and how it affected local communities.',
            primer:
              'Explain how the death of over 700,000 British soldiers created a demographic catastrophe, using the 67 local names on the Stubbington memorial as a tangible anchor.',
            question:
              'How did the sheer number of casualties affect the local economy and community spirit in a village like Stubbington?',
          },
          {
            objective:
              'Apply the concept of micro-history to understand the human cost of the war.',
            primer:
              'Use the tragedy of the Lowry brothers to demonstrate how "Pals Battalions" and local enlistment meant that single battles could wipe out entire local families.',
            question:
              'Why does focusing on a single family like the Lowrys give us a different understanding of the war compared to reading general casualty statistics?',
          },
        ],
        source_context:
          "The visual sources in this lesson (the Stubbington War Memorial and the 'Dead Man's Penny') localize the staggering statistics of the Great War. They transform abstract casualty figures into tangible, community-level grief, demonstrating how the trauma of the 'Lost Generation' was permanently physically embedded into the landscape of everyday British villages. **Hinge Question:** Look at the Stubbington War Memorial; why was it deliberately built over the village pump, the center of daily community life?",
      },
      do_now: {
        title: 'Do Now: Retrieval Grid',
        type: 'grid',
        items: [
          {
            question:
              'What nickname was given to women working with toxic TNT in munitions factories?',
            answer: '"Canary Girls" (or Munitionettes).',
            points: 1,
            category: 'Lesson 4 Recall',
          },
          {
            question:
              'Under the Treaty of Versailles, what was the maximum number of men allowed in the German army?',
            answer: '100,000 men.',
            points: 1,
            category: 'Lesson 5 Recall',
          },
          {
            question: 'What did Article 231 of the Treaty of Versailles force Germany to accept?',
            answer: 'Full responsibility for causing the war (the War Guilt Clause).',
            points: 2,
            category: 'Thematic Recall',
          },
          {
            question:
              'What was the name of the revolutionary battleship launched by Britain in 1906?',
            answer: 'HMS Dreadnought.',
            points: 2,
            category: 'Thematic Recall',
          },
          {
            question:
              "Explain the difference between a 'traditional' and 'revisionist' historical interpretation using General Douglas Haig as an example.",
            answer:
              "The traditional view sees Haig as a foolish 'donkey' sending men to their deaths, while the revisionist view argues he faced unprecedented technological challenges and eventually learned to adapt.",
            points: 3,
            category: 'Historical Skills',
          },
          {
            question:
              "What does the term 'Diktat' mean and why did Germans use it to describe the Treaty of Versailles?",
            answer:
              "It means 'dictated peace'. They used it because Germany was banned from negotiating and forced to sign the treaty under threat of invasion.",
            points: 3,
            category: 'Historical Skills',
          },
        ],
      },
      vocab: [
        {
          term: 'Commemoration',
          definition:
            'The formal act of honoring and remembering the people who sacrificed their lives in a conflict.',
        },
        {
          term: 'The Lost Generation',
          definition:
            'The term used to describe the young men who came of age during WWI, a massive percentage of whom were killed or severely wounded.',
        },
        {
          term: 'Micro-History',
          definition:
            'The study of history on a very small scale—such as looking at one specific village, family, or memorial—to help understand larger global events.',
        },
        {
          term: 'Historical Empathy',
          definition:
            'The ability to understand and share the feelings, perspectives, and experiences of people in the past.',
        },
      ],
      narrative_blocks: [
        {
          title: "Stubbington's Lost Generation",
          text: "To look at the wooden shelter in the centre of Stubbington's village green today, you might think it is just a quiet place to sit. But if you look up at the timber beams under its roof, you will find 67 names carved into the wood. These are the names of the young people from Stubbington and Hill Head who went off to fight in the First World War and never returned.<br><br>For a small, rural village, the war was not a distant political event—it was a devastating local tragedy that tore through families, streets, and schoolrooms. Behind every name on that memorial is a shattered family.",
          tasks: [
            {
              type: 'short_answer',
              text: 'Where was the Stubbington War Memorial erected in 1922?',
              answer:
                "The Stubbington War Memorial was erected in the center of the village, specifically built as a wooden shelter over the village's water pump.",
              model_answer: 'It was built on the Village Green, covering the local village pump.',
            },
            {
              type: 'short_answer',
              text: 'How many local names from Stubbington and Hill Head are carved into the memorial?',
              answer:
                'There are 71 local names from Stubbington and Hill Head carved into the memorial.',
              model_answer: 'There are 67 names carved into the memorial.',
            },
            {
              question:
                'Study Source A (the Stubbington War Memorial). Why are local memorials like this crucial for a historian studying the human cost of the First World War?',
              answer:
                'Local memorials are crucial because they humanize the vast, incomprehensible statistics of the war. They show the specific, devastating impact on small, tight-knit communities, demonstrating how entire generations of young men from specific streets and families were wiped out.',
              model_answer:
                'Local memorials are crucial because they ground the massive, abstract casualty statistics into tangible local reality. Seeing 67 names from a single, tight-knit rural village demonstrates how deeply the "Lost Generation" devastated everyday communities.',
            },
          ],
          image: '/images/stubbington_memorial_1.jpg',
          image_alt:
            'Source A: The wooden Stubbington War Memorial, uniquely designed as a shelter over the village pump in 1922. It bears the names of 67 local men who died, serving as a powerful, everyday reminder of the devastating human cost inflicted on tight-knit local communities.',
          image_caption:
            'Source A: The wooden Stubbington War Memorial, uniquely designed as a shelter over the village pump in 1922. It bears the names of 67 local men who died, serving as a powerful, everyday reminder of the devastating human cost inflicted on tight-knit local communities.',
        },
        {
          title: 'The Tragedy of the Lowry Brothers',
          text: 'Of all the families in the parish, none paid a heavier price than the Lowrys. William and Annie Lowry lived in a grand house called Manor Way Grange. They had three sons, all of whom went off to fight. Not one of them came home.<br><br><strong>William "Harper" Lowry (25)</strong>, a brilliant Cambridge student, joined the Indian Army. On 4th June 1915, he was killed leading a desperate charge up a narrow ravine at Gallipoli under intense Turkish machine-gun fire. His body was never found.<br><br><strong>Cyril "Patrick" Lowry (20)</strong> joined the West Yorkshire Regiment. In a heartbreaking twist of fate, he served in the exact same battalion commanded by his older brother, Eric. On 25th March 1918, Patrick was killed in action during a massive German offensive near the Somme—in full view of his own brother. His body was never recovered.<br><br><strong>Auriol "Eric" Lowry (25)</strong>, the highly decorated middle brother, had survived the heartbreak of seeing his younger brother die. An exceptionally brave leader who won the DSO and Military Cross, his time ran out just weeks before the war ended. On 23rd September 1918, he was hit by a machine-gun bullet and died in his runner\'s arms.<br><br>Devastated by the loss of all three sons, their father built the Lowry Memorial Hall in Lee-on-the-Solent to ensure his boys would never be forgotten.',
          tasks: [
            {
              type: 'short_answer',
              text: 'Why is the story of the three Lowry brothers historically significant when studying the impact of the First World War?',
              answer:
                "The Lowry brothers' story highlights the extreme tragedy of 'Pals Battalions' and sibling enlistment. It demonstrates the profound localized grief experienced by families who lost multiple sons, emphasizing that the war's trauma was deeply concentrated in specific households.",
              model_answer:
                "The loss of the Lowry brothers is significant because it highlights the concentrated grief experienced by individual families. It shows how the war didn't just cause random casualties, but often wiped out multiple siblings from the same household, devastating local family structures.",
            },
            {
              question:
                'Study Source B (the "Dead Man\'s Penny"). What does this source tell us about how the British government attempted to console grieving families, and why might it have felt inadequate?',
              answer:
                "Source B shows that the government mass-produced bronze plaques to offer symbolic recognition of a soldier's sacrifice. However, it likely felt grossly inadequate because a generic piece of metal could never replace a lost son or husband, highlighting the disconnect between state commemoration and intense personal grief.",
              model_answer:
                "The government sent these bronze plaques and a simple scroll to the families of fallen soldiers to formally acknowledge their sacrifice. However, for many grieving parents, this small piece of metal felt tragically inadequate compared to the loss of their child's life.",
            },
          ],
          image: '/images/gw_dead_mans_penny.jpg',
          image_alt:
            "Source B: A bronze memorial plaque, tragically nicknamed the 'Dead Man's Penny', which was sent to the families of every British soldier killed in the Great War. For many grieving parents, like the father of Nita Madeline King, this and a simple scroll were the only physical return they received for their child's sacrifice.",
          image_caption:
            "Source B: A bronze memorial plaque, tragically nicknamed the 'Dead Man's Penny', which was sent to the families of every British soldier killed in the Great War. For many grieving parents, like the father of Nita Madeline King, this and a simple scroll were the only physical return they received for their child's sacrifice.",
        },
        {
          title: "Nita Madeline King & A Father's Grief",
          text: "Among the list of fallen soldiers on the village green, one name stands out as different: <strong>Nita Madeline King</strong>. She is the <em>only woman</em> commemorated on the Stubbington War Memorial.<br><br>Nita (29) wanted to do her part and volunteered for the Queen Mary's Army Auxiliary Corps (QMAAC). She was sent to Wimereux in France, a massive, high-pressure hospital centre for thousands of wounded soldiers. But the enemy in Wimereux was not just bullets—it was disease. In the crowded military hospitals, Nita contracted cerebrospinal meningitis and died on 25th May 1917. Following her death, her grieving mother, Lydia, became the primary force behind building the Stubbington War Memorial, donating a fortune (£200) to ensure the village had a beautiful wooden shelter.<br><br><strong>The Father Who Carved His Son's Name</strong><br>Arthur Tribbeck, a local carpenter, was chosen by the village to build the wooden shelter with his own hands. Tragically, as he constructed it, he had to prepare the timber to hold the name of his own son, <strong>Harold Tribbeck</strong>. Harold had bravely refused to have his leg amputated after a terrible wound in 1918, and died of gangrene aged just 21.<br><br><strong>The Dead Man's Penny</strong><br>For the families of the fallen, the British government issued a bronze memorial plaque, which became colloquially known as the \"Dead Man's Penny\". Over 1.3 million of these heavy, impersonal plaques were sent through the post to grieving families like the Lowrys and the Tribbecks, serving as a cold bureaucratic acknowledgment of a devastating personal loss.",
          tasks: [
            {
              type: 'short_answer',
              text: "<em>Instructions: Choose one of the five historical investigation tasks below. Use the provided web links and your source packs to uncover the hidden realities of the Stubbington fallen.</em><br><br><strong>Path 1: The 1911 Census (Bringing the Names to Life)</strong><br>War memorials only give us names and initials. To understand what the village actually lost, we need to see who these men were before the war.<br><ul><li><strong>Your Task:</strong> Using the provided 1911 Census records for the Lowry family, find out the following: How old were the brothers? What were their jobs? Who else lived in the house? Write a short paragraph explaining how reading the census changes the way you look at the names on the memorial.</li><li><strong>Scaffolding Tip:</strong> Look closely at the \"Occupation\" column. Were they farm laborers, shop workers, or tradesmen? Think about how their sudden absence would impact the village's daily life and economy.</li><li><strong>Helpful Link:</strong> <a href='https://www.nationalarchives.gov.uk/help-with-your-research/research-guides/census-records/' target='_blank'>The National Archives: 1911 Census Guide</a></li></ul><br><strong>Path 2: Mapping the Tragedy</strong><br>During the war, entire streets could be plunged into mourning in a single day.<br><ul><li><strong>Your Task:</strong> Select ten names from the Stubbington memorial. Using the Commonwealth War Graves Commission website to find their home addresses, plot them on a historical map of Fareham/Stubbington from the 1910s.</li><li><strong>Scaffolding Tip:</strong> Do you notice any clusters? Are there multiple casualties on the same street? Write a sentence explaining what it would have felt like to be a postman delivering telegrams on that street in 1916.</li><li><strong>Helpful Link:</strong> <a href='https://maps.nls.uk/geo/explore/side-by-side/' target='_blank'>National Library of Scotland: Side-by-Side Historic Maps</a></li></ul><br><strong>Path 3: Decoding the Commonwealth War Graves (CWGC)</strong><br>Historians use death records like detective clues to figure out where and how men fought.<br><ul><li><strong>Your Task:</strong> Search for the Lowry brothers on the CWGC database. Look at their date of death and the name of the cemetery or memorial where they are listed (e.g., the Thiepval Memorial or the Menin Gate).</li><li><strong>Scaffolding Tip:</strong> If a soldier died in July 1916 and is listed on the Thiepval Memorial, they almost certainly died at the Battle of the Somme. If they died in late 1917 near Ypres, it was likely Passchendaele. Write down which major battles the Stubbington men were caught in based on your findings.</li><li><strong>Helpful Link:</strong> <a href='https://www.cwgc.org/' target='_blank'>Commonwealth War Graves Commission Database</a></li></ul><br><strong>Path 4: Evaluating the Memorial Design</strong><br>Most towns built statues of soldiers with rifles or giant stone crosses. Stubbington built a wooden shelter over a water pump.<br><ul><li><strong>Your Task:</strong> Write a visual analysis of the Stubbington War Memorial. Why do you think the designer (a grieving mother) chose a water pump shelter rather than a glorifying statue of a soldier?</li><li><strong>Scaffolding Tip:</strong> Think about what a water pump represents (community, life, civilian utility) versus a soldier statue (combat, glory, military). What does this tell us about how the local community wanted to remember their dead?</li></ul><br><strong>Path 5: The Missing Voices (Historiography)</strong><br>War memorials only record the dead, meaning the \"visible\" history often masks the invisible trauma of the survivors.<br><ul><li><strong>Your Task:</strong> Challenge yourself to consider who is <em>not</em> on the memorial. Are there men from Stubbington who survived but returned with severe shell shock or missing limbs?</li><li><strong>Scaffolding Tip:</strong> Write a short paragraph explaining why relying solely on a war memorial might give a historian an incomplete picture of how the war actually impacted a village like Stubbington.</li></ul>",
              model_answer: 'Teacher Note: These are open-ended masterclass extension tasks.',
            },
          ],
        },
        {
          title: 'Pair & Share Activity',
          text: '',
          tasks: [
            {
              type: 'think_pair_share',
              question:
                'How did the loss of a generation impact small communities like Stubbington?',
              answer:
                'The loss of a generation devastated small communities economically and socially. The sudden absence of young men crippled local industries and farming, while the collective psychological trauma of mass mourning permanently altered the social fabric and optimism of the village.',
            },
          ],
        },
        {
          title: 'Consolidation Task',
          tasks: [
            {
              type: 'extended_writing',
              question:
                'Explain the impact of the First World War on local communities like Stubbington.',
              answer:
                '<strong>Point 1: Demographic Devastation</strong><br>Villages lost a significant percentage of their young male population, completely wiping out a generation of fathers, brothers, and husbands.<br><br><strong>Point 2: Economic Disruption</strong><br>The deaths of skilled tradesmen, laborers, and farmers severely impacted the local economy, forcing women and older generations to permanently take on new burdens to sustain the community.<br><br><strong>Point 3: Collective Trauma</strong><br>The shared grief created a permanent atmosphere of mourning. The erection of war memorials at the center of villages served as a constant, daily reminder of the colossal human cost paid by the community.',
              hints: [
                'Sentence Starter: The war impacted local communities heavily through the loss of a generation of young men...',
                'Sentence Starter: For example, the use of "Pals Battalions" meant that a single battle could...',
                'Sentence Starter: This resulted in long-lasting grief and the building of war memorials to...',
              ],
              scaffolding:
                'Structure your answer using the IDEA framework:\n- **Identify:** State your main point clearly.\n- **Describe:** Give historical evidence and facts.\n- **Explain:** Show how the evidence supports your point.\n- **Analyse:** Link back to the question and assess its importance.',
            },
          ],
          text: '<h3>Consolidation Task</h3>',
        },
      ],
      quiz: [
        {
          q: 'In what year was the Stubbington War Memorial erected?',
          a: '1922',
          options: ['1918', '1922', '1914', '1939'],
        },
        {
          q: 'What physical structure does the Stubbington War Memorial cover?',
          a: 'The local village pump.',
          options: [
            'The local village pump.',
            'The entrance to the local church.',
            'An old artillery gun brought back from France.',
            'The village post office.',
          ],
        },
        {
          q: 'Who proposed and designed the memorial in Stubbington?',
          a: 'The mother of the only woman commemorated among the fallen.',
          options: [
            'Lord Kitchener.',
            'A famous London architect.',
            'The mother of the only woman commemorated among the fallen.',
            'The Mayor of Fareham.',
          ],
        },
        {
          q: 'How many names of the fallen are recorded on the Stubbington memorial?',
          a: '67',
          options: ['67', '12', '300', '45'],
        },
        {
          q: 'What historical term describes the study of a specific family, like the Lowry brothers, to understand a larger global event?',
          a: 'Micro-history',
          options: ['Micro-history', 'Historiography', 'Macro-economics', 'Demographics'],
        },
      ],
      video: [
        {
          type: 'era',
          url: 'https://era.org.uk/tv-radio-resources/secondary-history/britain-europe-and-the-wider-world/',
          title: 'The history of The Cenotaph | Remembrance Sunday',
          duration: '5 mins',
          viewing_task: 'What is the powerful significance of the Unknown Warrior at the Cenotaph?',
          model_answer:
            'The Unknown Warrior represents all the unidentified soldiers who died in the war, allowing grieving families with no grave to visit to have a national symbol to mourn at.',
        },
        {
          type: 'era',
          url: 'https://era.org.uk/streaming-service-resource/wwi-a-z-r-is-for-remembrance-bbc-two/',
          title: 'R is for Remembrance | WWI A-Z',
          duration: '2 mins',
          viewing_task: 'Why was the national act of remembrance established on November 11th?',
          model_answer:
            'It was established to mark the exact date and time the Armistice was signed in 1918 (the 11th hour of the 11th day of the 11th month), ensuring the country never forgets the sacrifice of the dead.',
        },
      ],
    },
    {
      id: 'lesson_7',
      title: 'Assessment: The Great War',

      lesson_reflection: {
        prompt:
          'You have reached the end of this unit! Before you finish, please turn to the back page of your printed workbook and complete the End of Unit Reflection & Pupil Voice page.',
        instructions: [
          'Complete the WWW (What Went Well) section — what did you enjoy or find easiest?',
          'Complete the EBI (Even Better If) section — what did you find most challenging?',
          'Circle your effort level (1-5) and set a specific target for the next unit.',
        ],
      },
      primer:
        'This formal assessment bridges Key Stage 3 historical skills with early GCSE demands, testing chronological recall, source utility evaluation, and historical judgement.',
      vocab: [],
      learning_objectives: [
        'Synthesise knowledge of trench warfare, the Home Front, imperial contributions, propaganda, and the Treaty of Versailles',
        'Construct a sustained argument using specific evidence about the causes, course, and consequences of the Great War',
        "Evaluate historical interpretations of the war, including the 'Lions led by Donkeys' debate",
      ],
      vocabulary: [
        {
          term: 'Synthesis',
          definition:
            'Combining knowledge from across the whole unit to construct a complete argument.',
        },
        {
          term: 'Interpretation',
          definition:
            "How historians explain events differently — e.g., the 'Lions led by Donkeys' debate about General Haig.",
        },
        {
          term: 'Evidence',
          definition: 'Specific historical facts and examples used to support an argument.',
        },
        {
          term: 'Evaluation',
          definition:
            'Making a judgement about the value, importance, or accuracy of historical evidence or interpretations.',
        },
        {
          term: 'Propaganda',
          definition:
            'Biased information used to promote a cause — a key concept running through the entire Great War unit.',
        },
      ],
      do_now: {
        type: 'grid',
        tasks: [
          {
            question: 'What triggered the start of WWI in 1914?',
            answer: 'The assassination of Archduke Franz Ferdinand.',
            points: 1,
          },
          {
            question:
              'What was the name of the British law that allowed the government to take control of industries?',
            answer: 'DORA (Defence of the Realm Act).',
            points: 2,
          },
          {
            question: 'Why did the Schlieffen Plan fail?',
            answer:
              'Belgium resisted, Russia mobilized faster than expected, and Britain intervened.',
            points: 3,
          },
        ],
      },
      narrative_blocks: [
        {
          text: 'Complete the automated multiple-choice quiz for this unit to test your foundational knowledge.',
          tasks: [
            {
              text: '1a. Describe one feature of the Home Front during the First World War. (2 marks)<br>1b. Describe one feature of the Treaty of Versailles. (2 marks)',
              answer:
                "<strong>1a.</strong> One feature of the Home Front was the massive mobilization of women into the workforce. For example, thousands of women worked as 'munitionettes' in dangerous factories to supply the army.<br><br><strong>1b.</strong> One feature of the Treaty of Versailles was the War Guilt Clause (Article 231). This forced Germany to accept complete blame for starting the war, providing the justification for demanding massive financial reparations.",
              model_answer:
                "1a. One feature of the Home Front was the mobilization of women. For example, thousands of women known as 'Munitionettes' worked in dangerous factories to produce shells.<br><br>1b. One feature of the Treaty of Versailles was its harsh military restrictions. For example, the German army was limited to 100,000 men and was not allowed submarines or an air force.",
            },
          ],
        },
        {
          text: "Study Source A (the painting of the 'Canary Girls' in the munitions factory).",
          image: '/images/gw_munitionettes.jpg',
          image_alt:
            'Source A: A painting capturing the immense scale of female labor in British munitions factories. This unprecedented entry of women into heavy industry shattered Victorian gender norms and played a critical role in the passing of the Representation of the People Act 1918, which finally granted some women the right to vote.',
          tasks: [
            {
              text: 'How useful is Source A for an inquiry into the impact of the First World War on women? (8 marks)',
              answer:
                'Source A is useful as it shows women taking on new, highly skilled, and dangerous industrial roles in munitions factories, proving that the war drastically expanded female employment beyond domestic service. Its provenance (a photograph taken during the war) makes it reliable evidence of the conditions inside these factories. However, its usefulness is limited because it does not show the long-term impact on women, such as the fact that most were forced out of these jobs when men returned in 1918, nor does it address the political impact, such as the subsequent granting of the vote to some women.',
              model_answer:
                'Source A is highly useful for showing the reality of the Home Front, as it is a painting from the time demonstrating women taking on heavy industrial roles previously reserved for men. However, its utility is limited because a painting is subjective and may have been created for propaganda to encourage recruitment, rather than showing the true dangers like TNT poisoning.',
            },
          ],
          image_caption:
            'Source A: A painting capturing the immense scale of female labor in British munitions factories. This unprecedented entry of women into heavy industry shattered Victorian gender norms and played a critical role in the passing of the Representation of the People Act 1918, which finally granted some women the right to vote.',
        },
        {
          text: 'Study Interpretation 1. <em>"The First World War was primarily won on the mud of the Western Front."</em>',
          tasks: [
            {
              text: 'How far do you agree with Interpretation 1? Explain your answer using your own knowledge. (16 marks + 4 SPaG)',
              answer:
                '<strong>Paragraph 1: Agreeing with the Interpretation</strong><br>I agree with Interpretation 1 that the war was a catalyst for social change, particularly for women. The demand for labor on the Home Front led to women working in munitions, transport, and agriculture. This crucial contribution directly influenced the 1918 Representation of the People Act, which granted the vote to women over 30.<br><br><strong>Paragraph 2: Disagreeing (Short-term vs. Long-term)</strong><br>However, I disagree that the change was entirely permanent. When the war ended, the Restoration of Pre-War Practices Act forced many women out of their industrial jobs to make way for returning soldiers, returning them to domestic roles.<br><br><strong>Paragraph 3: Disagreeing (Focus on State Control)</strong><br>Furthermore, the interpretation ignores the negative impacts. The war introduced strict state control through DORA (censorship, rationing), demonstrating that the conflict also severely restricted civilian freedoms rather than just advancing them.<br><br><strong>Conclusion</strong><br>Overall, I partially agree. While the war undoubtedly accelerated political rights for women, the immediate social and economic changes were often temporary, and the conflict introduced unprecedented state interference in civilian life.',
              model_answer:
                '<strong>Paragraph 1 (Agree - The Trenches):</strong> You could agree with the statement by discussing the sheer scale of the battles of attrition on the Western Front, such as the Somme and Passchendaele, where the German army was slowly ground down.<br><br><strong>Paragraph 2 (Disagree - Global Empire):</strong> You could disagree by arguing the war was a global conflict. The contribution of over 1.5 million men from the British Indian Army (including heroes like Khudadad Khan) and resources from across the Empire were crucial to preventing an early defeat.<br><br><strong>Paragraph 3 (Disagree - Home Front):</strong> You could also disagree by arguing the war was won on the Home Front. The mobilization of the entire civilian population, such as women in munitions factories, ensured the military had the supplies needed to win.<br><br><strong>Paragraph 4 (Disagree - Local Impact):</strong> You could also argue that focusing only on military victory ignores the devastating long-term social impact. Using local micro-histories, such as the 67 names on the Stubbington memorial or the tragedy of the three Lowry brothers, shows that the true cost of the war was felt in communities for decades.<br><br><strong>Conclusion:</strong> Summarize your overall judgement, balancing the military reality of the Western Front against the broader global and civilian contributions.',
            },
          ],
        },
      ],
      quiz: [
        {
          q: 'In what year did the First World War begin?',
          a: '1914',
          options: ['1918', '1939', '1914', '1911'],
        },
        {
          q: 'Which country was NOT part of the Triple Entente?',
          a: 'Germany',
          options: ['Germany', 'Britain', 'France', 'Russia'],
        },
        {
          q: 'What condition was caused by standing in cold, flooded trenches?',
          a: 'Trench Foot',
          options: ['Trench Foot', 'Shell Shock', 'Spanish Flu', 'Cholera'],
        },
        {
          q: 'How many men from the British Empire and Dominions served in the war?',
          a: 'Nearly 3 million',
          options: ['500,000', '100,000', '5 million', 'Nearly 3 million'],
        },
        {
          q: 'What was the nickname given to women working with TNT in factories?',
          a: 'Canary Girls',
          options: ['Canary Girls', 'Tommies', 'Doughboys', 'Land Girls'],
        },
      ],
      teacher_notes: {
        source_context:
          'The visual sources in this assessment review the core themes of the unit, from the empowerment and exploitation of women in munitions factories to the enduring legacy of the conflict. **Hinge Question:** How does the image of women in munitions factories summarize the dramatic societal shifts caused by Total War?',
      },

      historical_interpretations: {
        title: 'Historical Interpretations: General Haig',
        interpretation_a: {
          historian: "John Laffin (1988) - 'British Butchers and Bunglers'",
          text: "General Haig was an incompetent butcher who callously sent millions of young men to their deaths. He was a 'donkey' completely out of touch with the realities of modern trench warfare, ordering the same failed charges over and over again.",
        },
        interpretation_b: {
          historian: "Gary Sheffield (2001) - 'Forgotten Victory'",
          text: "General Haig was the 'Architect of Victory'. He faced an impossible task in a new type of industrial war that no one knew how to fight. Despite the tragic casualties, he learned from his mistakes and eventually led the British army to its greatest ever victory in 1918.",
        },
        question:
          'Which interpretation of General Haig do you find more convincing? Use your knowledge of the Battle of the Somme to support your answer.',
        scaffold: 'I find Interpretation [A/B] more convincing because...',
      },
      pair_share: {
        prompt:
          'Discuss with your partner: What was the most significant turning point of the Great War?',
        think: 'Spend 1 minute quietly considering the question and forming your own opinion.',
        pair: 'Discuss your thoughts with your partner. Identify where your ideas agree and where they differ.',
        share: "Share your pair's combined conclusion with the class.",
      },
    },
  ],
  quizzes: {
    lesson_4: [
      {
        q: 'What emergency law passed in August 1914 gave the British government sweeping powers over daily life, including the ability to water down beer?',
        a: 'The Defense of the Realm Act (DORA)',
        options: [
          'The Defense of the Realm Act (DORA)',
          'The Military Service Act',
          'The Public Health Act',
          'The Representation of the People Act',
        ],
      },
      {
        q: 'Where did many local women from the Fareham and Gosport area go to work handling high explosives for the war effort?',
        a: "The Priddy's Hard armaments depot",
        options: [
          "The Priddy's Hard armaments depot",
          'The Netley Military Hospital',
          'The Stubbington Textile Mill',
          'The Portsmouth Naval Dockyard',
        ],
      },
      {
        q: 'Why do revisionist historians like Gail Braybon argue that the war did NOT truly liberate women?',
        a: 'Because women were paid less than men, fired immediately after the war ended, and the youngest factory workers were denied the vote.',
        options: [
          'Because women were not allowed to join the military.',
          'Because women refused to leave their homes and do any industrial work.',
          'Because women were paid less than men, fired immediately after the war ended, and the youngest factory workers were denied the vote.',
          'Because the government made it illegal for women to earn their own money.',
        ],
      },
      {
        q: 'What was the primary trigger that forced the British government to introduce compulsory food rationing in 1918?',
        a: 'German U-boats sank merchant ships bringing food, causing severe shortages.',
        options: [
          'German U-boats sank merchant ships bringing food, causing severe shortages.',
          'A national drought ruined all the grain crops in Hampshire.',
          'Factory workers went on strike and refused to bake bread.',
          'The British government sent all the food to France.',
        ],
      },
      {
        q: 'How did the government treat Conscientious Objectors who refused to do any form of military work?',
        a: 'They were sent to harsh labor prisons and stripped of their voting rights.',
        options: [
          'They were forced to join the royal court as political advisors.',
          'They were exempted from all taxes and given free houses.',
          'They were exiled to Australia.',
          'They were sent to harsh labor prisons and stripped of their voting rights.',
        ],
      },
    ],
  },
  key_individuals: [
    {
      name: 'Lord Kitchener',
      image: '/images/gw_kitchener_portrait.jpg',
      bio: "Secretary of State for War in 1914. His face became instantly iconic on the 'Your Country Needs You' recruitment posters.",
      actions:
        "He realized the war would be long and require millions of men, leading to the creation of 'Kitchener's New Army' and Pals Battalions.",
      achievements: [
        'Successfully mobilized a massive volunteer army before conscription was needed.',
        'Drowned in 1916 when his ship hit a German mine.',
      ],
    },
    {
      name: 'Sir Douglas Haig',
      image: '/images/gw_douglas_haig.jpg',
      bio: 'Commander-in-Chief of the British Expeditionary Force (BEF) from late 1915 until the end of the war.',
      actions:
        'He commanded the British forces at major battles including the Somme and Passchendaele, known for their horrific casualties.',
      achievements: [
        "Highly controversial figure: criticized as the 'Butcher of the Somme' by some, but defended by others as a general who successfully adapted to modern industrial warfare and led the British to ultimate victory in 1918.",
      ],
    },
    {
      name: 'Khudadad Khan',
      image: '/images/gw_khudadad_khan.jpg',
      bio: "A sepoy (infantryman) in the 129th Duke of Connaught's Own Baluchis of the British Indian Army.",
      actions:
        'In October 1914 at the First Battle of Ypres, his machine gun team fought to the death to hold back the German advance. He was the sole survivor of his team.',
      achievements: [
        'He was the first Indian soldier to be awarded the Victoria Cross (VC), the highest military decoration for valour in the British Empire.',
      ],
    },
    {
      name: 'Wilfred Owen',
      image: '/images/gw_wilfred_owen.jpg',
      bio: 'One of the most famous British war poets, who served as an officer on the Western Front.',
      actions:
        "He wrote visceral, shocking poetry like 'Dulce et Decorum Est' and 'Anthem for Doomed Youth' while recovering from shell shock.",
      achievements: [
        "His poetry shattered the romanticized, jingoistic propaganda of 1914, exposing the brutal 'pity of war'. Tragically killed in action just one week before the Armistice.",
      ],
    },
    {
      name: 'David Lloyd George',
      image: '/images/gw_lloyd_george.jpg',
      bio: 'British Prime Minister during the latter half of the war and at the Paris Peace Conference.',
      actions:
        'He drove the creation of the Ministry of Munitions to solve the shell crisis and effectively mobilized the Home Front.',
      achievements: [
        "Represented Britain as one of the 'Big Three' at Versailles, attempting to find a middle ground between crushing Germany and rebuilding the European economy.",
      ],
    },
    {
      name: 'Georges Clemenceau',
      image: '/images/gw_clemenceau.jpg',
      bio: "Prime Minister of France, nicknamed 'The Tiger'.",
      actions:
        'He represented a devastated France at the Paris Peace Conference, demanding maximum revenge and security.',
      achievements: [
        'Pushed for the harshest possible terms against Germany in the Treaty of Versailles to ensure France would never be invaded again.',
      ],
    },
    {
      name: 'Woodrow Wilson',
      image: '/images/gw_woodrow_wilson.jpg',
      bio: 'President of the United States of America.',
      actions:
        "Brought America into the war in 1917 and proposed a peaceful, idealistic vision for the post-war world based on his 'Fourteen Points'.",
      achievements: [
        'He championed the creation of the League of Nations, though his own country ultimately refused to join it.',
      ],
    },
  ],
};
