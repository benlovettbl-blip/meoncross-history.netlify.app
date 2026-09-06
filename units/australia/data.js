export const unitData = {
  lesson_reflection: {
    prompt:
      'You have reached the end of this unit! Before you finish, please turn to the back page of your printed workbook and complete the End of Unit Reflection & Pupil Voice page.',
    instructions: [
      'Complete the WWW (What Went Well) section — what did you enjoy or find easiest?',
      'Complete the EBI (Even Better If) section — what did you find most challenging?',
      'Circle your effort level (1-5) and set a specific target for the next unit.',
    ],
  },
  specification_file: '',
  title: 'KS3: History of Australia',
  homepage_background: '/images/prison_hulks.jpg',
  enquiry:
    'Invasion, Settlement, or Survival? How should we remember the colonization of Australia?',
  cover_image: '/images/prison_hulks.jpg',
  cover_caption: 'An 18th-century sketch of Prison Hulks in Portsmouth Harbour by Louis Garneray.',
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
      title: 'Claiming Australia',
      learning_objectives: [
        "Describe how and why the British Empire claimed Australia, including Captain Cook's voyage and the concept of terra nullius",
        'Explain the significance of colonisation for both the British Empire and the Indigenous Australian peoples',
        'Evaluate whether the British arrival should be understood as discovery, settlement, or invasion',
      ],
      vocabulary: [
        {
          term: 'Colonisation',
          definition:
            'The process of establishing control over a foreign territory — Britain colonised Australia from 1788.',
        },
        {
          term: 'Terra nullius',
          definition:
            "A Latin legal term meaning 'land belonging to nobody' — used by Britain to justify claiming Australia.",
        },
        {
          term: 'Empire',
          definition:
            'The British Empire expanded by claiming new territories like Australia for strategic and economic purposes.',
        },
        {
          term: 'Indigenous',
          definition:
            'The original inhabitants of a land — Indigenous Australians had lived there for over 65,000 years.',
        },
        {
          term: 'Significance',
          definition:
            'Why the colonisation of Australia matters — its consequences are still felt today.',
        },
      ],
      enquiry:
        "What is the significance of Captain Cook's voyage on the Endeavour in 1768 for the story of colonisation?",
      teacher_notes: {
        primer:
          "This lesson deconstructs the traditional progress narrative of Captain James Cook's landing in Australia in 1770. By analyzing the public scientific motives alongside secret imperial instructions, students will explore the crucial role of Polynesian star navigator Tupaia and evaluate the first encounter at Botany Bay from the defensive legal and spiritual perspective of the Gweagal Aboriginal people.",
        objectives: [
          {
            objective:
              "Explain the dual purpose of James Cook's voyage, contrasting the public scientific mission with the secret government orders to claim territory.",
            primer:
              'Instruct students on how the public transit of Venus observation masked private instructions from the Admiralty to locate and claim the Great Southern Land for King George III.',
            question:
              'How does discovering that Captain Cook carried secret instructions change our understanding of his voyage from a purely scientific mission to an imperial one?',
          },
          {
            objective:
              'Analyse the indispensable navigational and diplomatic contributions of the Polynesian high priest and master star navigator, Tupaia.',
            primer:
              "Focus heavily on Tupaia's mental map of 3,000 miles of ocean, his mastery of non-instrument star navigation, and his role as a translator with the Māori.",
            question:
              "Can we historically define Cook's voyage as a 'discovery' of Pacific islands if he was actively guided there by Tupaia, who already knew exactly where they were?",
          },
          {
            objective:
              'Evaluate the first encounter at Botany Bay in 1770 from both the British perspective and the defensive spiritual perspective of the Gweagal people.',
            primer:
              "Contrast Cook's journal entry of a native 'attack' with the Gweagal's tribal duty to protect their ancestral lands from uninvited strangers.",
            question:
              'Why did the Gweagal warriors throw rocks and spears at the British, and how did this reflect their spiritual laws rather than simple hostility?',
          },
        ],
      },
      do_now: {
        type: 'questions',
        items: [
          {
            question:
              "Who was the young botanist that led the Royal Society's scientific team on the Endeavour?",
            answer: 'Sir Joseph Banks',
          },
          {
            question: 'What public scientific event was the Endeavour sent to Tahiti to observe?',
            answer: 'The transit of Venus across the Sun',
          },
          {
            question:
              "Which prestigious British scientific academy funded Captain Cook's 1768 expedition?",
            answer: 'The Royal Society',
          },
          {
            question: 'What secret instructions was Captain Cook given by the British Admiralty?',
            answer:
              "To sail south, locate the 'Great Southern Land', and claim it for Britain before rival nations could.",
          },
          {
            question:
              'Who was the master Polynesian navigator who guided the Endeavour across the Pacific?',
            answer: 'Tupaia',
          },
          {
            question: 'How did Tupaia navigate the Pacific without European instruments?',
            answer:
              'By reading the stars, bird flight patterns, cloud formations, and ocean currents.',
          },
          {
            question: "Which Aboriginal Australian nation did Cook's crew encounter at Botany Bay?",
            answer: 'The Dharawal nation (specifically the Gweagal people)',
          },
          {
            question: "Why did the Gweagal warriors oppose Cook's landing in 1770?",
            answer:
              'It was their sacred, spiritual, and legal duty to protect their ancestral lands from uninvited strangers.',
          },
          {
            question:
              "What Latin legal term did the British use to falsely claim Australia was 'nobody's land'?",
            answer: 'Terra Nullius',
          },
          {
            question:
              'On which island did Captain Cook raise the Union Jack to claim the eastern coast for Britain?',
            answer: 'Possession Island',
          },
        ],
      },
      vocab: [
        {
          term: 'Ancestors',
          definition: 'The people that we are descended from, who lived in a territory before us.',
        },
        {
          term: 'Botany Bay',
          definition:
            'An area on the east coast of Australia where Captain Cook landed, named after the huge number of plant specimens found there by scientists.',
        },
        {
          term: 'Colony',
          definition:
            'A country or area under the full or partial political control of another country, typically occupied by settlers from that country.',
        },
        {
          term: 'Gweagal',
          definition:
            'The specific Aboriginal Australian group who first encountered Captain Cook on the beaches of Botany Bay in 1770.',
        },
        {
          term: 'Navigator',
          definition:
            'A person who directs the route or course of a ship or aircraft using maps, stars, and specialized tools.',
        },
        {
          term: 'Royal Society',
          definition:
            "A prestigious British scientific academy established in 1660 that funded Captain Cook's initial expedition.",
        },
      ],
      vocab_cloze_text:
        'In August 1768, Captain James Cook set sail on the Endeavour, funded by the [Royal Society] to observe the stars. In April 1770, the ship arrived on the east coast of Australia at a place they named [Botany Bay]. Here, they had a tense first meeting with the [Gweagal] people, whose [Ancestors] had lived on that coastline for thousands of years. Cook eventually sailed north and claimed the land as a British [Colony] called New South Wales, guided along the way by a master Polynesian [Navigator] named Tupaia.',
      flashcards: [
        {
          term: 'Ancestors',
          definition: 'The people that we are descended from, who lived in a territory before us.',
        },
        {
          term: 'Botany Bay',
          definition:
            'An area on the east coast of Australia where Captain Cook landed, named after the huge number of plant specimens found there by scientists.',
        },
        {
          term: 'Colony',
          definition:
            'A country or area under the full or partial political control of another country, typically occupied by settlers from that country.',
        },
        {
          term: 'Gweagal',
          definition:
            'The specific Aboriginal Australian group who first encountered Captain Cook on the beaches of Botany Bay in 1770.',
        },
        {
          term: 'Navigator',
          definition:
            'A person who directs the route or course of a ship or aircraft using maps, stars, and specialized tools.',
        },
        {
          term: 'Royal Society',
          definition:
            "A prestigious British scientific academy established in 1660 that funded Captain Cook's initial expedition.",
        },
      ],
      sources: [],
      narrative_blocks: [
        {
          type: 'narrative',
          theme_heading: '1. The Dual Mission of the Endeavour',
          text: "In August 1768, Lieutenant James Cook, an officer in the British Navy, left Plymouth on his ship, the Endeavour. This voyage was destined to change global history. Publicly, the journey was funded and framed as a peaceful mission of scientific discovery. On board were nine scientists from the prestigious [Royal Society], led by the wealthy and influential young botanist Sir Joseph Banks. Their official, public task was to travel to the South Pacific island of Tahiti to observe the transit of the planet Venus across the Sun. By timing this event from different parts of the world, scientists hoped to calculate the exact distance between the Earth and the Sun.<br><br>However, scientific curiosity was only a cover story. Cook also carried a packet of secret instructions from the British Admiralty. These private orders commanded him that once the scientific observations in Tahiti were complete, he was to sail further south into the uncharted waters of the Pacific to search for a rumored, massive landmass known as the 'Great Southern Land.' If he located this land, he was ordered to map its coastline, record its resources, and claim it for the British Crown before other rival European nations, like France or Spain, could do so.",
          tasks: [
            {
              qNum: 1,
              type: 'comprehension',
              question:
                "What was the public, scientific purpose of Captain Cook's 1768 voyage on the Endeavour?",
              model:
                'The public mission was to sail to Tahiti to observe the transit of Venus across the Sun for the Royal Society.',
            },
            {
              qNum: 2,
              type: 'comprehension',
              question:
                "Why did the British government give Captain Cook 'secret instructions' to find the Great Southern Land?",
              model:
                'The government wanted to secretly discover and claim new territory for the British Empire before rival European powers like France or Spain could get there.',
            },
          ],
          source: {
            id: 'source_c',
            type: 'written',
            title: 'Source A: Secret Instructions to Captain Cook',
            caption:
              'Source A: Secret Instructions to Captain James Cook from the British Admiralty, 1768.',
            content:
              '"You are also with the Consent of the Natives to take possession of Convenient Situations in the Country in the Name of the King of Great Britain; or, if you find the Country uninhabited take Possession for His Majesty..."',
            source_context:
              "When Captain Cook set sail on the Endeavour, his primary public mission was scientific. However, he carried secret orders from the British government. These orders instructed him to find the hypothetical 'Great Southern Continent' and claim it for Britain 'with the Consent of the Natives'. This shows that the British government recognized the land might already be inhabited.",
            question:
              "Why would the British government feel the need to keep these instructions a 'secret' from rival European nations and the general public?",
            model_answer:
              'The British government kept these instructions secret to prevent rival European empires, like France or Spain, from knowing about their plans to claim new territories and resources in the Pacific before they could.',
            provenance_clue:
              "This is an official government document from the British Admiralty. While it reveals the official policy (to get 'consent'), official documents don't always reflect what explorers actually did on the ground.",
          },
        },
        {
          type: 'narrative',
          theme_heading: '2. Tupaia: The Indispensable Star Navigator',
          text: "While British history books have celebrated Captain Cook's navigational genius for centuries, the survival and success of the Endeavour relied heavily on an extraordinary Indigenous figure: Tupaia. Joining the ship in Tahiti in 1769 at the urging of Joseph Banks, Tupaia was a high priest and master star navigator from the island of Ra'iatea. While Cook possessed state-of-the-art European maritime instruments like sextants, compasses, and marine clocks, he had no charts or understanding of the vast, complex, and dangerous Pacific reefs.<br><br>Tupaia possessed an exceptional, complex mental map spanning over 3,000 miles of ocean. He navigated using ancient, highly sophisticated Polynesian star navigation techniques. Without any mechanical tools, Tupaia could determine the ship's exact position by reading the stars, the path of the sun, bird flight patterns, cloud formations, and the unique temperature and vibration of ocean currents. Furthermore, Tupaia was a brilliant diplomat. As the only person on board who could speak languages closely related to the Pacific islanders, he served as a translator when the Endeavour reached New Zealand. He communicated directly with the Māori, defusing highly dangerous misunderstandings and preventing what would have been catastrophic colonial massacres. Despite saving the lives of the crew and creating a detailed chart of the islands, Tupaia's pivotal role was written out of mainstream history for over 250 years, leaving his story largely 'invisible.'",
          tasks: [
            {
              type: 'comprehension',
              question:
                'Why was Captain Cook completely dependent on Tupaia to navigate the dangerous Pacific waters?',
              model:
                'Captain Cook lacked navigational charts, local knowledge of Pacific reefs, and understanding of complex ocean currents across thousands of miles of ocean. Tupaia possessed an extraordinary mental map spanning over 3,000 miles and used ancient Polynesian star navigation—reading star courses, swell vibrations, bird migrations, and cloud formations—to guide the Endeavour safely through treacherous archipelagos without wrecking the ship.',
              model_answer:
                'Captain Cook lacked navigational charts, local knowledge of Pacific reefs, and understanding of complex ocean currents across thousands of miles of ocean. Tupaia possessed an extraordinary mental map spanning over 3,000 miles and used ancient Polynesian star navigation—reading star courses, swell vibrations, bird migrations, and cloud formations—to guide the Endeavour safely through treacherous archipelagos without wrecking the ship.',
            },
            {
              type: 'comprehension',
              question:
                'How did Tupaia prevent a violent massacre when the Endeavour arrived in New Zealand?',
              model:
                'Because Tupaia spoke a Tahitian dialect closely related to the Māori language, he was able to communicate directly with Māori warriors when frightened British crew members were prepared to open fire with muskets. By translating, explaining British intentions, and observing customary diplomatic protocols, Tupaia defused explosive misunderstandings and prevented what would have been catastrophic colonial bloodshed.',
              model_answer:
                'Because Tupaia spoke a Tahitian dialect closely related to the Māori language, he was able to communicate directly with Māori warriors when frightened British crew members were prepared to open fire with muskets. By translating, explaining British intentions, and observing customary diplomatic protocols, Tupaia defused explosive misunderstandings and prevented what would have been catastrophic colonial bloodshed.',
            },
          ],
          source: {
            id: 'source_b',
            type: 'visual',
            title: 'Source B: A Portrait of Captain James Cook',
            caption:
              'Source B: Portrait of Captain James Cook, painted by Nathaniel Dance-Holland, 1776.',
            src: '/images/james_cook.jpg',
            source_context:
              'This official portrait of Captain Cook presents him as a calm, heroic, and rational explorer. Such portraits were used to celebrate British naval supremacy and imperial expansion. However, they completely ignore the perspective of the Indigenous peoples whose lands were claimed without their consent.\n\n**Hinge Question:** How does this painting reflect British attitudes toward exploration and empire-building?',
            question:
              "How does this portrait's depiction of Cook contrast with the reality of his dependence on Indigenous navigators like Tupaia?",
            model_answer:
              'The portrait depicts Cook as a solitary, heroic master of navigation, ignoring the fact that his survival and success in the Pacific relied heavily on the indigenous knowledge and star-navigation of Tupaia.',
            provenance_clue:
              'Captain James Cook was a highly skilled Royal Navy navigator and cartographer. Remember that official portraits are usually painted to make the subject look heroic, noble, and in control, rather than showing reality.',
          },
        },
        {
          type: 'narrative',
          theme_heading: '3. The Landing at Botany Bay and the Gweagal Encounter',
          text: "In April 1770, the Endeavour sailed up the eastern coast of Australia. Although Dutch explorers had mapped parts of the western coast in the seventeenth century, they had never claimed ownership of the land. When Cook's crew located a sheltered bay and rowed toward the shore, they were met by two Gweagal Aboriginal men of the Dharawal nation armed with spears and shields. The Gweagal's ancestors had lived in harmony with that land for over 65,000 years.<br><br>From the spiritual and legal perspective of the Gweagal, it was their sacred duty to protect their ancestral country from uninvited strangers who did not have permission to be there. Cook wrote in his journal that when one of the Gweagal men threw a rock to warn them away, the British fired a warning musket. When the warriors stood their ground and a spear was thrown, the British fired two more times with buckshot, wounding one of the Gweagal men in the leg. Cook framed this in his records as an unprovoked attack by 'natives' on peaceful explorers, completely ignoring that the British were armed invaders. The Endeavour stayed in the bay for a week. Sir Joseph Banks and his scientists were so amazed by the thousands of unknown botanical specimens they collected that they named the place 'Botany Bay.' In May, Cook sailed north to an island he named 'Possession Island,' where he raised the Union Jack and claimed the entire eastern coast for Britain, naming it 'New South Wales' under the legal fiction of 'Terra Nullius' (nobody's land).",
          tasks: [
            {
              type: 'comprehension',
              question:
                'Why did the Gweagal Aboriginal men try to block the British from landing at Botany Bay?',
              model:
                "Under the spiritual, legal, and ancestral traditions of the Dharawal nation, the Gweagal had a sacred duty to protect their country from uninvited strangers who lacked permission to enter. When Cook's armed landing party approached their shores without ceremonial greeting or invitation, the warriors stood their ground, shouting warnings and throwing spears to defend their ancestral lands in accordance with their customary law.",
              model_answer:
                "Under the spiritual, legal, and ancestral traditions of the Dharawal nation, the Gweagal had a sacred duty to protect their country from uninvited strangers who lacked permission to enter. When Cook's armed landing party approached their shores without ceremonial greeting or invitation, the warriors stood their ground, shouting warnings and throwing spears to defend their ancestral lands in accordance with their customary law.",
            },
          ],
          source: {
            id: 'source_a',
            type: 'visual',
            title: 'Source C: Initial Encounter at Botany Bay',
            caption:
              'Source C: A contemporary sketch of two Gweagal men by Sydney Parkinson, 1770.',
            src: '/images/gweagal_encounter.jpg',
            source_context:
              "Sydney Parkinson was the lead botanical illustrator on the Endeavour. His sketch shows two Gweagal men standing peacefully by their canoes. This is highly significant because it completely contradicts Captain Cook's written journal, which claimed the men were instantly aggressive and violently attacked the British without provocation.\n\n**Hinge Question:** Why do you think a private sketch by a crew member might show a peaceful encounter, while the Captain's official logbook reported a violent, unprovoked attack?",
            question:
              "How does Source C challenge Captain Cook's official claim that the British landing was violently opposed?",
            model_answer:
              "Source C challenges Cook's claim by showing two Gweagal men standing calmly near their canoes and shields, indicating that they were not engaged in an aggressive or unprovoked attack against the British as Cook had recorded in his official journal.",
            provenance_clue:
              "Sydney Parkinson was a civilian artist, not a military officer. His private sketches were meant to accurately record what he saw for scientific purposes, making them potentially more reliable than Cook's official logbook, which Cook knew would be read by the British government.",
          },
        },
        {
          type: 'narrative',
          theme_heading: '3.5 The Botanical Collection',
          text: "While Cook was occupied with mapping the coastline, the wealthy botanist Sir Joseph Banks was busy collecting thousands of new plant species. The sheer volume and uniqueness of the flora they found is what prompted them to name the area 'Botany Bay'. Accompanying Banks was a highly skilled Scottish artist named Sydney Parkinson.",
          source: {
            id: 'source_e',
            type: 'visual',
            title: 'Source D: Botanical Illustration from the Endeavour',
            caption:
              "Source D: A botanical illustration of 'Acacia cunninghamii', collected at Botany Bay, 1770.",
            src: '/images/botany_parkinson.jpg',
            source_context:
              "Joseph Banks and his team collected thousands of plant specimens that were completely unknown to European science. This illustration highlights the scientific aspect of the expedition, which was used to justify the colonization of Australia as a 'discovery' rather than an invasion.\n\n**Hinge Question:** How did the British use 'science' and 'discovery' to justify claiming land that already belonged to Aboriginal people?",
            question: "How does Source D help explain why the British named the area 'Botany Bay'?",
            model_answer:
              "Source D shows a highly detailed botanical drawing of a new plant species. The fact that artists like Sydney Parkinson were producing hundreds of these drawings for Sir Joseph Banks proves that the British were discovering a massive amount of unique plant life, which is why they named the area 'Botany Bay'.",
            provenance_clue:
              "Drawn by Sydney Parkinson, this shows the British focus on 'Enlightenment' science. However, by giving these plants Latin names, the British ignored the fact that Aboriginal people had already named and used these plants for 60,000 years.",
          },
        },
        {
          type: 'narrative',
          theme_heading: '4. Aboriginal Perspectives',
          text: "The British narrative of 'discovery' and 'peaceful exploration' dominated history books for centuries. However, this one-sided view completely ignores the perspective of the people who were already there. Aboriginal oral histories provide a crucial counter-narrative to the written journals of British explorers.",
          source: {
            id: 'source_d',
            type: 'written',
            title: 'Source E: Aboriginal Oral History on Captain Cook',
            caption:
              'Source E: An Aboriginal oral history recounting the arrival of the Endeavour, passed down by the Dharawal people.',
            content:
              '"His maps were accurate in a geographical sense... but they did not show us our names for places. He didn\'t ask us."',
            source_context:
              "Aboriginal oral histories provide a crucial counter-narrative to British written records. This account describes the Endeavour as a giant 'white bird' and records the immediate hostility and confusion caused by the British arrival, emphasizing the unprovoked violence of the encounter.",
            question:
              "How does Source E challenge the British idea that Captain Cook 'discovered' Australia?",
            model_answer:
              "Source E challenges the idea of discovery by pointing out that the land already had 'names for places' given by its Indigenous inhabitants. It criticizes Cook for acting without permission ('He didn't ask us'), showing that he did not discover an empty land, but rather mapped an already occupied territory.",
            provenance_clue:
              "Oral histories are passed down through spoken word across generations. Historically, European historians unfairly dismissed them because they weren't written down, but they are crucial for providing the First Nations perspective that is missing from British colonial records.",
          },
          tasks: [
            {
              type: 'comprehension',
              question:
                "How did Captain Cook use the myth of 'Terra Nullius' to justify claiming the entire eastern coast for Britain?",
              model:
                "Cook and British legal authorities applied the legal fiction of 'Terra Nullius' ('land belonging to no one') by claiming that because Aboriginal Australians did not construct European-style towns, establish permanent fences, or practice European agriculture, they had no lawful ownership of the soil. This convenient myth allowed Cook to raise the Union Jack on Possession Island and claim the entire eastern seaboard for King George III without negotiating treaties, seeking native consent, or paying compensation.",
              model_answer:
                "Cook and British legal authorities applied the legal fiction of 'Terra Nullius' ('land belonging to no one') by claiming that because Aboriginal Australians did not construct European-style towns, establish permanent fences, or practice European agriculture, they had no lawful ownership of the soil. This convenient myth allowed Cook to raise the Union Jack on Possession Island and claim the entire eastern seaboard for King George III without negotiating treaties, seeking native consent, or paying compensation.",
            },
          ],
        },
      ],
      quiz: [
        {
          question:
            'What was the secret reason the British government sent Captain Cook to the South Pacific in 1768?',
          options: [
            "To locate and claim the 'Great Southern Land' for the British Empire",
            'To transport convicts to a new prison in Sydney',
            'To wage a surprise naval war against Spanish colonies',
            'To find a shorter trade route to India through the Arctic',
          ],
          answer: 0,
        },
        {
          question:
            'Which of the following describes a skill Tupaia used to navigate the Endeavour across 3,000 miles of ocean?',
          options: [
            'He used a French marine chronometer and paper charts',
            'He read the stars, bird flight patterns, and ocean currents',
            'He followed a compass provided by Sir Joseph Banks',
            "He used a Spanish sextant to calculate the sun's angle",
          ],
          answer: 1,
        },
        {
          question:
            "Why did the Gweagal warriors oppose Captain Cook's landing at Botany Bay in 1770?",
          options: [
            'They wanted to capture the British ship to steal its iron',
            'They believed it was their spiritual and legal duty to protect their ancestral lands from uninvited strangers',
            'They had been ordered to attack by French traders',
            'They believed the British were gods who needed to be sacrificed',
          ],
          answer: 1,
        },
      ],
      tasks: [],
      video: {
        type: 'youtube',
        url: 'https://www.youtube.com/watch?v=Up94ItsNm2U',
        title: "Tupaia's Endeavour | Official Trailer | DocPlay",
        duration: '2 mins 19 secs',
        viewing_task:
          'As you watch the programme, note down three key facts about the topic discussed.',
        model_answer:
          'Student answers will vary but should demonstrate active listening and extract relevant historical details.',
      },
      extra_videos: [
        {
          type: 'youtube',
          url: 'https://www.youtube.com/watch?v=i2nziqeKY-c',
          title: 'Sir David Attenborough on Joseph Banks',
          duration: '2 mins 8 secs',
          viewing_task:
            'As you watch the programme, note down three key facts about the topic discussed.',
          model_answer:
            'Student answers will vary but should demonstrate active listening and extract relevant historical details.',
        },
      ],
      banner: '/images/gweagal_encounter.jpg',
      pair_share: {
        prompt:
          "Discuss with your partner: Why does the story of the Gweagal resistance at Botany Bay challenge the old, traditional idea that Australia was 'peacefully settled'?",
        think: 'Spend 1 minute quietly considering the question and forming your own opinion.',
        pair: 'Discuss your thoughts with your partner. Identify where your ideas agree and where they differ.',
        share: "Share your pair's combined conclusion with the class.",
      },
    },
    {
      id: 'lesson_2',
      title: 'Creating a Convict Colony',
      learning_objectives: [
        'Describe the key features of the convict transportation system and explain why Britain used Australia as a penal colony',
        'Explain how the British Empire used convict labour to establish a colonial foothold in the Pacific',
        'Evaluate the human cost of the convict system and its role in the revolution of Australian settlement',
      ],
      vocabulary: [
        {
          term: 'Convict',
          definition:
            'A person found guilty of a crime — convicts were transported to Australia as punishment.',
        },
        {
          term: 'Transportation',
          definition:
            'The practice of sending convicted criminals to distant colonies as a form of punishment.',
        },
        {
          term: 'Penal colony',
          definition:
            "A settlement used to exile prisoners — Australia served as Britain's main penal colony from 1788.",
        },
        {
          term: 'Empire',
          definition:
            'Convict transportation served the empire by providing free labour to build colonial settlements.',
        },
        {
          term: 'Revolution',
          definition:
            'The American Revolution (1776) caused Britain to lose its American colonies, leading it to use Australia instead.',
        },
      ],
      enquiry: 'Whose story do we tell about the first colony in Australia in 1788?',
      teacher_notes: {
        primer:
          "This lesson investigates the establishment of Britain's first penal colony in Sydney Harbour in 1788. Students will analyze how the American War of Independence triggered a severe prison crisis, explore the harsh social and environmental realities faced by the First Fleet, and study the forced manual labor and rationing systems implemented under Governor Arthur Phillip.",
        objectives: [
          {
            objective:
              'Explain how the loss of the American colonies in 1776 directly caused a prison crisis in Britain that led to the system of transportation.',
            primer:
              "Guide students to construct a causal flow diagram linking the American War of Independence, the overcrowding of river 'hulks', and the eventual decision to settle Botany Bay.",
            question:
              'How did a political war fought in America in 1776 directly decide the fate of a petty thief in London ten years later?',
          },
          {
            objective:
              'Describe the physical and environmental challenges faced by Captain Arthur Phillip and the convicts during their first year at Sydney Cove.',
            primer:
              "Discuss the lack of skilled farmers, the infertile sandy soil of Sydney Cove, and how Phillip's introduction of equal food rationing prevented starvation.",
            question:
              'Why was the decision to share food completely equally between guards and convicts a highly radical and necessary act for survival?',
          },
          {
            objective:
              'Analyse the work and social conditions of the convicts, contrasting general labor with the punishments of the chain road gangs.',
            primer:
              'Detail the daily routines of clearing forests, quarrying stone, and the extreme punishments of the iron-shackled road gangs used to build infrastructure.',
            question:
              "Based on their daily tasks, was the First Fleet a simple prison ship or was it a 'colony-building kit' designed to expand the British Empire?",
          },
        ],
      },
      do_now: {
        type: 'questions',
        items: [
          {
            question:
              'Which global event in 1776 caused Britain to lose its primary location for transporting convicts?',
            answer: 'The American War of Independence',
          },
          {
            question:
              'Where were British convicts temporarily held when prisons overflowed before Botany Bay was established?',
            answer: "In 'hulks' (rotting decommissioned warships moored in the River Thames)",
          },
          {
            question: 'Who was appointed as the first Governor of the New South Wales colony?',
            answer: 'Captain Arthur Phillip',
          },
          {
            question:
              'What were the most common crimes committed by the convicts of the First Fleet?',
            answer: 'Petty theft (e.g. stealing clothing, food, or small sums of money)',
          },
          {
            question: 'How many ships made up the First Fleet that sailed to Australia in 1787?',
            answer: '11 ships',
          },
          {
            question:
              'Why did Governor Phillip decide to abandon Botany Bay and move the settlement?',
            answer:
              'Botany Bay lacked fresh water, had poor soil for farming, and offered no safe anchorage for the ships.',
          },
          {
            question:
              'What name did Governor Phillip give to the new, more suitable harbor where the fleet finally settled?',
            answer: 'Sydney Cove (Port Jackson)',
          },
          {
            question: 'On what exact date did the British raise the flag at Sydney Cove?',
            answer: '26 January 1788',
          },
          {
            question:
              "What system did Governor Phillip implement to ensure the colony's survival during the first year?",
            answer: 'Strict rationing and forced manual labor for all convicts.',
          },
          {
            question:
              'What skills did the early colony critically lack among its convict population?',
            answer: 'Skilled farmers, carpenters, and builders.',
          },
        ],
      },
      vocab: [
        {
          term: 'Convict',
          definition: 'A person found guilty of a crime and sentenced by a court of law.',
        },
        {
          term: 'Governor',
          definition:
            'The official appointed to govern a town, colony, or territory on behalf of a monarch or government.',
        },
        {
          term: 'Hard labour',
          definition:
            'Heavy physical work, such as quarrying stone or felling trees, carried out as a punishment.',
        },
        {
          term: 'Hulk',
          definition:
            'An old, decommissioned warship moored in rivers or ports and used as an overcrowded temporary prison.',
        },
        {
          term: 'Transportation',
          definition:
            'System for taking prison convicts to spend years away from home in a distant land as a punishment.',
        },
        {
          term: 'Sydney Harbour',
          definition:
            'The deep, natural harbor where Captain Arthur Phillip established the first British settlement in January 1788.',
        },
      ],
      vocab_cloze_text:
        "After the loss of the American colonies, British prisons became dangerously overcrowded. The government's temporary solution was to lock prisoners inside decaying [Hulk] ships along the south coast. To solve this crisis permanently, the government revived the policy of [Transportation], sending a fleet of eleven ships under the command of [Governor] Arthur Phillip. In January 1788, the fleet landed at [Sydney Harbour] to establish a penal colony. Here, every [Convict] faced years of grueling [Hard labour] clearing forests and building roads.",
      flashcards: [
        {
          term: 'Convict',
          definition: 'A person found guilty of a crime and sentenced by a court of law.',
        },
        {
          term: 'Governor',
          definition:
            'The official appointed to govern a town, colony, or territory on behalf of a monarch or government.',
        },
        {
          term: 'Hard labour',
          definition:
            'Heavy physical work, such as quarrying stone or felling trees, carried out as a punishment.',
        },
        {
          term: 'Hulk',
          definition:
            'An old, decommissioned warship moored in rivers or ports and used as an overcrowded temporary prison.',
        },
        {
          term: 'Transportation',
          definition:
            'System for taking prison convicts to spend years away from home in a distant land as a punishment.',
        },
        {
          term: 'Sydney Harbour',
          definition:
            'The deep, natural harbor where Captain Arthur Phillip established the first British settlement in January 1788.',
        },
      ],
      sources: [],
      narrative_blocks: [
        {
          type: 'narrative',
          theme_heading: '1. The American Revolution and the Gaol Crisis',
          text: "During the eighteenth century, the British legal system relied heavily on the Transportation Act of 1717 to deal with criminals. Under this system, the courts sentenced thousands of petty thieves to be sent to Britain's colonies in North America, where their labor was sold to tobacco plantation owners. However, in 1776, the American colonies declared their independence from Great Britain. This political revolution meant that sending British criminals to America was no longer possible, creating a severe and immediate prison crisis back in Britain.<br><br>British gaols quickly became dangerously overcrowded. To cope with this, the government passed the Hulks Act of 1776, which allowed them to lock prisoners inside 'hulks'—old, decommissioned warships moored in southern English ports like Portsmouth and Plymouth. These floating prisons were horrific: they were dark, suffocatingly hot, filthy, and disease-ridden, with thousands of prisoners dying of typhus and cholera. As public panic rose over the disease and frequent prison escapes, the British government realized they needed a permanent, distant alternative. In August 1786, they decided to establish a new penal colony on the eastern coast of Australia, which Captain Cook had claimed eighteen years earlier.",
          tasks: [
            {
              qNum: 1,
              type: 'comprehension',
              question:
                'How did the American War of Independence in 1776 directly cause a prison crisis in Britain?',
              model:
                "America's independence meant Britain could no longer transport its convicts to the American colonies, causing British prisons to rapidly overflow.",
            },
            {
              qNum: 2,
              type: 'comprehension',
              question:
                "Why were 'hulks' used as temporary prisons, and why did they ultimately fail as a solution?",
              model:
                'Hulks (decaying warships) were used because they were cheap floating prisons, but they failed because they became horrifically overcrowded and disease-ridden.',
            },
          ],
          source: {
            id: 'source_a',
            type: 'visual',
            title: 'Prison Hulks in Portsmouth Harbour',
            caption:
              'Source A: A contemporary sketch of Prison Hulks moored in Portsmouth Harbour, circa 1780.',
            src: '/images/prison_hulks.jpg',
            source_context:
              "After the American Revolution, Britain could no longer transport its convicts to America. The prison system became completely overwhelmed, leading to the use of 'hulks'—decommissioned, rotting warships anchored in rivers. These hulks were disease-ridden and horrifyingly overcrowded, which ultimately forced the government to look for a new penal colony.\n\n**Hinge Question:** Why would the British government choose to use rotting ships as prisons instead of simply building more prisons on land?",
            question:
              'What does Source A reveal about the conditions that led to the creation of the penal colony in Australia?',
            model_answer:
              "Source A shows massive, decommissioned warships crammed together to serve as floating prisons, revealing that Britain's prison system was overflowing and in crisis, forcing them to find a new place like Australia to send their convicts.",
            provenance_clue:
              'Sketches from the era, such as this one, were often produced to highlight social issues or document reality for the public. They provide crucial visual evidence of the horrifying and unsanitary conditions that justified the drastic measure of transportation.',
          },
        },
        {
          type: 'narrative',
          theme_heading: '2. The First Fleet and the Ordeal of the Lady Penrhyn',
          text: "In May 1787, the First Fleet—a group of eleven ships carrying approximately 1,400 people, including 750 convicts, marines, and sailors—departed Portsmouth under the command of Captain Arthur Phillip, who was appointed as the colony's first [Governor]. After an arduous, eight-month voyage, the fleet reached Botany Bay in January 1788. Phillip quickly realized the bay was too shallow and open to heavy winds, so he sailed slightly north to Port Jackson, establishing the settlement of Sydney Cove on January 26, 1788.<br><br>The arrival was marked by extreme physical and social chaos. On Wednesday, February 6, 1788, the female convicts were finally brought ashore from their transport ships. Arthur Bowes Smyth, a naval surgeon aboard the Lady Penrhyn (the ship carrying the majority of the female convicts), kept a highly detailed, eyewitness journal of that day. He recorded that as the women landed, a violent, terrifying tropical thunderstorm struck Sydney Cove, splitting a massive tree in the center of the camp and killing several sheep. Smyth described scenes of absolute riot and heavy drinking as sailors and male convicts broke into the women's tents. Bowes Smyth's journals are invaluable to historians today because they provide a rare, human face to the female convicts, recording their actual names, ages, trades, and personal struggles during the settlement's birth.",
        },
        {
          type: 'narrative',
          theme_heading: 'The Devastating Impact on the Eora People',
          text: 'While the British convicts were focused on surviving starvation, their arrival was a catastrophe for the Eora people. The British cleared the land, cut down sacred trees, and polluted the water sources. Worse still, in 1789, a devastating outbreak of smallpox swept through the Aboriginal population around Sydney Cove. Having no immunity to European diseases, it is estimated that up to 70% of the local Eora population died within a single year. Families were destroyed, and their ancient way of life was shattered by the very presence of the new colony.',
        },
        {
          type: 'historical_spotlight',
          title: 'First Fleet Profiles: Who Were the Convicts?',
          profiles: [
            {
              name: 'John Hudson',
              subtitle: 'The Youngest Convict (Age 13)',
              details:
                "John Hudson was a chimney sweep described at his trial as 'a boy 11 years old'. He was transported for seven years on the Friendship for stealing. He was so small he was forced to share a tiny sleeping space on the ship. Once in Sydney, he received 50 lashes for being out of his hut after 9pm.",
            },
            {
              name: 'Elizabeth Beckford',
              subtitle: 'The Oldest Convict (Age 70)',
              details:
                'Elizabeth Beckford was an elderly servant from London. She was sentenced to seven years transportation on the Lady Penrhyn for the petty crime of stealing cheese. She was 70 years old at the time of her trial and died shortly after.',
            },
            {
              name: 'Elizabeth Fowles',
              subtitle: 'Unusual Crime',
              details:
                'Elizabeth was transported on the Lady Penrhyn. Her crime? Stealing clothing and killing a hen. For this, she spent seven years in exile. In the colony, she repeatedly rebelled, receiving 75 lashes for killing another hen, and 50 lashes for stealing clothing.',
            },
          ],
        },
        {
          type: 'narrative',
          theme_heading: '3. Hard Labour and the Struggle for Survival',
          text: "The first year of the Sydney settlement was an intense struggle for survival. The colonists faced immediate starvation because the sandy soil around Sydney Cove was poor, the local climate was completely unfamiliar, and there were almost no skilled farmers, blacksmiths, or carpenters among the convicts. To prevent a total collapse and preserve order, Governor Phillip took the radical step of ordering that all food supplies be rationed completely equally between the officers, soldiers, and convicts.<br><br>To build the colony from scratch, every convict was forced into grueling [Hard labour]. During the day, they felled massive trees, cleared dense bush, grew food, and quarried sandstone blocks to construct the first barracks. Convicts who refused to work, stole food, or committed other offenses were severely punished. Many were sent to join a 'road gang'—forced to work day after day with their legs locked in heavy iron chains, breaking stones and shoveling earth to build Australia's first roads. Despite this brutal regime, by the 1820s, this forced manual labor had successfully transformed the wild bushland of Sydney into a thriving, highly profitable colonial port.",
          tasks: [
            {
              qNum: 3,
              type: 'comprehension',
              question:
                'Identify the major physical challenges the First Fleet faced when they tried to farm around Sydney Cove.',
              model:
                'They faced poor, sandy soil, a severe lack of fresh water, and the fact that very few convicts had any actual farming skills.',
            },
            {
              qNum: 4,
              type: 'comprehension',
              question:
                "How did Governor Arthur Phillip's radical decision to ration food equally ensure the survival of the colony?",
              model:
                'By giving equal rations to both officers and convicts, he prevented mass starvation and mutiny, ensuring everyone had just enough energy to keep working.',
            },
          ],
        },
        {
          type: 'interactive_map',
          maps: [
            {
              id: 'map-portsmouth',
              year: 'May 1787',
              label: 'Departure',
              src: '/images/portsmouth_map.jpg',
              caption:
                'The First Fleet departs from Portsmouth, England. 11 ships carrying over 1,400 people face an immense 15,000-mile journey into the unknown.',
            },
            {
              id: 'map-tenerife',
              year: 'Aug 1787',
              label: 'Tenerife & Rio',
              src: '/images/tenerife_map.jpg',
              caption:
                'The fleet stops at Tenerife and Rio de Janeiro to restock fresh water, meat, and citrus fruits. Scurvy is kept at bay, but the stifling tropical heat makes the cramped convict decks unbearable.',
            },
            {
              id: 'map-cape',
              year: 'Nov 1787',
              label: 'Cape of Good Hope',
              src: '/images/cape_of_good_hope_map.jpg',
              caption:
                'The final resupply stop. Governor Phillip loads the ships with cows, sheep, and seeds to ensure the new colony will survive. They now face the brutal, freezing storms of the roaring forties.',
            },
            {
              id: 'map-botanybay',
              year: 'Jan 1788',
              label: 'Botany Bay',
              src: '/images/botany_bay_map.jpg',
              caption:
                'After eight long months, the First Fleet arrives at Botany Bay. Finding it unsuitable, they quickly sail slightly north to establish the settlement at Sydney Cove.',
            },
          ],
        },
        {
          type: 'narrative',
          text: 'The Convict Database reveals the diverse and often tragic backgrounds of the people transported to Australia. Many were completely ordinary working-class people driven to petty crime by extreme poverty.',
          tasks: [
            {
              type: 'comprehension',
              question:
                'Look at the database profile of John Hudson. How does his story challenge the idea that the First Fleet was filled with hardened, dangerous adult criminals?',
              model:
                "John Hudson was only nine years old when arrested for petty theft, working as an impoverished child chimney sweep in London. Transported for seven years aboard the Friendship and brutally flogged with 50 lashes at age eleven, Hudson's profile proves that the First Fleet was not comprised solely of violent, career criminals, but included vulnerable, desperate children and impoverished working-class Britons punished disproportionately under harsh British penal laws.",
              model_answer:
                "John Hudson was only nine years old when arrested for petty theft, working as an impoverished child chimney sweep in London. Transported for seven years aboard the Friendship and brutally flogged with 50 lashes at age eleven, Hudson's profile proves that the First Fleet was not comprised solely of violent, career criminals, but included vulnerable, desperate children and impoverished working-class Britons punished disproportionately under harsh British penal laws.",
            },
          ],
        },
      ],
      quiz: [
        {
          question:
            'Why was the British government forced to stop transporting convicts to North America in 1776?',
          options: [
            'The American colonies declared their independence from Britain',
            'A massive plague of smallpox closed all American ports',
            'The King of England decided that transportation was too cruel',
            "The French navy destroyed all of Britain's transport ships",
          ],
          answer: 0,
        },
        {
          question:
            'Who was the naval surgeon aboard the Lady Penrhyn who wrote a famous eyewitness journal about the landing of female convicts in 1788?',
          options: [
            'Sir Joseph Banks',
            'Arthur Bowes Smyth',
            'Gregory Blaxland',
            'Edward Hargreaves',
          ],
          answer: 1,
        },
        {
          question:
            'What punishment was given to difficult convicts who committed further crimes in the Sydney colony?',
          options: [
            'They were immediately sent back to England on storeships',
            'They were forced to join road gangs and break stones in leg chains',
            'They were sent to live with the local Eora Aboriginal tribes',
            'They were forced to work as wig makers for the Governor',
          ],
          answer: 1,
        },
      ],
      tasks: [],
      video: {
        type: 'youtube',
        url: 'https://www.youtube.com/watch?v=M7O-6PDQp0A',
        title: 'Child Convicts of Australia – Chapter 1: Transportation and the First Fleet',
        duration: '3 mins 41 secs',
        viewing_task:
          'As you watch the programme, note down three key facts about the topic discussed.',
        model_answer:
          'Student answers will vary but should demonstrate active listening and extract relevant historical details.',
      },
      extra_videos: [
        {
          type: 'youtube',
          url: 'https://www.youtube.com/watch?v=5OWGbZJCn1k',
          title: 'Child Convicts of Australia – Chapter 2: A Day in the Life',
          duration: '3 mins 8 secs',
          viewing_task:
            'As you watch the programme, note down three key facts about the topic discussed.',
          model_answer:
            'Student answers will vary but should demonstrate active listening and extract relevant historical details.',
        },
        {
          type: 'youtube',
          url: 'https://www.youtube.com/watch?v=nbaF5FBI2nE',
          title: 'Short History of Convict Australia (Full Episode)',
          duration: '50 mins 59 secs',
          viewing_task:
            'As you watch the programme, note down three key facts about the topic discussed.',
          model_answer:
            'Student answers will vary but should demonstrate active listening and extract relevant historical details.',
        },
        {
          type: 'youtube',
          url: 'https://www.youtube.com/watch?v=dwfYMI-buKY',
          title: 'Life on Board the First Colonising Ships to South Australia',
          duration: '4 mins 54 secs',
          viewing_task:
            'As you watch the programme, note down three key facts about the topic discussed.',
          model_answer:
            'Student answers will vary but should demonstrate active listening and extract relevant historical details.',
        },
        {
          type: 'youtube',
          url: 'https://www.youtube.com/watch?v=gVQg_Sb1e1Q',
          title: 'Governor Arthur Phillip and the Eora [HD]',
          duration: '9 mins 48 secs',
          viewing_task:
            'As you watch the programme, note down three key facts about the topic discussed.',
          model_answer:
            'Student answers will vary but should demonstrate active listening and extract relevant historical details.',
        },
      ],
      banner: '/images/prison_hulks.jpg',
      banner_position: 'bottom center',
      pair_share: {
        prompt:
          'Discuss with your partner: If you were an officer in the First Fleet, why might you be angry that Governor Phillip gave you the exact same food ration as a convict?',
        think: 'Spend 1 minute quietly considering the question and forming your own opinion.',
        pair: 'Discuss your thoughts with your partner. Identify where your ideas agree and where they differ.',
        share: "Share your pair's combined conclusion with the class.",
      },
    },
    {
      id: 'lesson_3',
      title: 'Encounters with the Indigenous Peoples',
      learning_objectives: [
        'Describe the impact of British colonisation on Indigenous Australian communities, including the destruction of trade, culture, and land',
        'Explain how Indigenous Australians showed resistance to British settlement through both armed conflict and cultural survival',
        'Evaluate the significance of these encounters for understanding the long-term consequences of empire',
      ],
      vocabulary: [
        {
          term: 'Resistance',
          definition:
            'Actions taken by Indigenous Australians to oppose British colonisation and protect their land.',
        },
        {
          term: 'Dispossession',
          definition: 'The act of taking land and resources away from Indigenous peoples.',
        },
        {
          term: 'Frontier violence',
          definition:
            'Armed conflict between settlers and Indigenous Australians along the expanding colonial frontier.',
        },
        {
          term: 'Trade',
          definition:
            'Indigenous Australians had complex trade networks that were destroyed by colonisation.',
        },
        {
          term: 'Change',
          definition:
            'Colonisation caused devastating and irreversible change to Indigenous Australian communities.',
        },
      ],
      enquiry:
        "Was the colonization of Australia a story of 'amity and kindness' or frontier violence?",
      teacher_notes: {
        primer:
          "This lesson exposes the severe conflict and devastating consequences of British settlement on the Aboriginal Australian populations. Students will interrogate the vast gulf between King George III's official orders for amity, and the brutal reality of disease, dispossession, and frontier wars.",
        objectives: [
          {
            objective: 'Understand the impact of European diseases on the Aboriginal population.',
            primer:
              'Discuss the 1789 smallpox epidemic, noting how it devastated communities like the Cadigal.',
            question:
              'Why were European diseases like smallpox so deadly to the Aboriginal populations?',
          },
          {
            objective: 'Analyze the resistance of Aboriginal leaders like Pemulwuy.',
            primer: "Highlight Pemulwuy's 12-year guerrilla war against the British settlers.",
            question:
              "How does Pemulwuy's resistance challenge the myth that Aboriginal people passively accepted colonization?",
          },
          {
            objective: 'Examine the Myall Creek Massacre as an example of frontier violence.',
            primer: 'Explain the events of 1838 and the significance of the subsequent trials.',
            question:
              'Why was the Myall Creek Massacre trial a turning point, even though frontier violence continued?',
          },
        ],
      },
      do_now: {
        type: 'questions',
        items: [
          {
            question:
              'Who was the senior Eora man kidnapped by Governor Phillip to act as an intermediary?',
            answer: 'Bennelong',
          },
          {
            question:
              'What devastating disease swept through the Aboriginal population around Sydney in 1789?',
            answer: 'Smallpox',
          },
          {
            question: 'Who was Pemulwuy?',
            answer:
              'A Bidjigal resistance leader who waged a 12-year guerrilla war against British settlers.',
          },
          {
            question: "What was the 'Frontier War'?",
            answer:
              'The prolonged, violent conflict over land and resources between British colonizers and Aboriginal resistance fighters.',
          },
          {
            question:
              'How did the British expansion into the Hawkesbury River impact the Dharug people?',
            answer:
              'It destroyed their hunting grounds and food sources, leading to starvation and violent conflict.',
          },
          {
            question: 'What was the Myall Creek Massacre of 1838?',
            answer:
              'The unprovoked murder of 28 unarmed Aboriginal people by British stockmen, resulting in the rare execution of the white perpetrators.',
          },
          {
            question:
              'What horrific practice was conducted by scientists like Sir Joseph Banks regarding Aboriginal remains?',
            answer:
              "The stealing and exporting of Aboriginal skulls to British museums for racist 'scientific' study.",
          },
          {
            question:
              'Why did the British concept of land ownership conflict with Aboriginal views?',
            answer:
              'The British viewed land as property to be owned and fenced, while Aboriginal people saw it as a sacred, shared spiritual responsibility.',
          },
          {
            question:
              'What weapon gave the British a massive technological advantage during the Frontier Wars?',
            answer: 'Muskets (firearms)',
          },
          {
            question:
              "How did Governor Macquarie's policies toward Aboriginal people change over time?",
            answer:
              "He initially tried to 'civilize' them through assimilation schools, but later authorized violent military campaigns against them.",
          },
        ],
      },
      vocab: [
        {
          term: 'Frontier',
          definition:
            'The extreme limit of settled land beyond which lies wilderness; in Australia, the expanding line of British settlement.',
        },
        {
          term: 'Guerrilla Warfare',
          definition:
            'A form of irregular warfare in which small groups use military tactics like ambushes and raids.',
        },
        {
          term: 'Dispossession',
          definition: 'The action of depriving someone of land, property, or other possessions.',
        },
        {
          term: 'Massacre',
          definition: 'The deliberate and brutal slaughter of a large number of people.',
        },
      ],
      vocab_cloze_text:
        'As the British [Frontier] expanded, Aboriginal communities faced devastating [Dispossession] from their ancestral lands. While some leaders like Pemulwuy fought back using [Guerrilla Warfare], many innocent people were killed in brutal events like the Myall Creek [Massacre].',
      flashcards: [],
      sources: [],
      narrative_blocks: [
        {
          type: 'narrative',
          theme_heading: 'The Illusion of Amity',
          text: "Before the First Fleet departed, King George III explicitly instructed Governor Arthur Phillip to 'endeavour by every possible means to open an intercourse with the natives, and to conciliate their affections.' The official policy was one of 'amity and kindness.' However, this completely ignored the reality that the British were arriving to permanently occupy land that had been inhabited by Aboriginal Australians for over 60,000 years. The concept of 'terra nullius' (nobody's land) meant the British legally pretended the Indigenous owners did not exist, setting the stage for inevitable conflict.",
          tasks: [
            {
              type: 'comprehension',
              question:
                "Contrast King George III's official policy of 'amity and kindness' with the violent reality of British settlement.",
              model:
                "While King George III officially instructed Governor Arthur Phillip to 'live in amity and kindness' with Indigenous peoples and punish any British subjects who harmed them, the reality on the ground was immediate dispossession and violence. As British colonists cleared sacred woodlands, monopolised scarce fishing bays, and enclosed land under the myth of Terra Nullius, tensions inevitably erupted into frontier warfare, punitive military reprisal raids, and widespread slaughter that mocked the Crown's benevolent rhetoric.",
              model_answer:
                "While King George III officially instructed Governor Arthur Phillip to 'live in amity and kindness' with Indigenous peoples and punish any British subjects who harmed them, the reality on the ground was immediate dispossession and violence. As British colonists cleared sacred woodlands, monopolised scarce fishing bays, and enclosed land under the myth of Terra Nullius, tensions inevitably erupted into frontier warfare, punitive military reprisal raids, and widespread slaughter that mocked the Crown's benevolent rhetoric.",
            },
          ],
          source: {
            id: 'source_b',
            type: 'written',
            title: "Bennelong's Letter to England",
            caption:
              'Source A: An extract from a letter dictated by Bennelong to Governor Arthur Phillip, 1796.',
            content:
              '"I am very well. I hope you are very well. I live at the Governor’s. I have every day dinner there. I have not my wife: another black man took her... I would be very glad if you would send me two pair of stockings, and some handkerchiefs for my pocket, and some shoes..."',
            source_context:
              'Bennelong was a senior man of the Eora nation who was kidnapped by Governor Phillip to serve as a translator. He eventually traveled to England and met King George III. This letter demonstrates his complex position caught between two worlds, struggling to maintain his traditional authority while navigating the catastrophic invasion of his homeland.',
            question:
              "What does Source A suggest about how Bennelong's relationship with the British had changed his way of life?",
            model_answer:
              "Source A shows that Bennelong had adopted many aspects of a British lifestyle. He was living at the Governor's house, eating their food, and requesting European clothing like 'shoes' and 'stockings', suggesting he had become somewhat dependent on them and alienated from his traditional Wangal life.",
            provenance_clue:
              'Letters dictated by First Nations people to British officials give rare insight into their experiences. However, historians must be careful, as the British scribe may have altered or translated the words to fit European expectations.',
          },
        },
        {
          type: 'narrative',
          theme_heading: 'The Smallpox Epidemic of 1789',
          text: 'The most immediate and catastrophic impact of the British arrival was not guns, but disease. In 1789, a horrifying outbreak of smallpox swept through the Aboriginal communities around Sydney Cove. Having been isolated from the rest of the world for millennia, the Indigenous population had zero natural immunity. The results were apocalyptic. It is estimated that up to 70% of the local Cadigal and surrounding populations died within months. Families were destroyed, and ancient knowledge, traditions, and social structures were severely disrupted, leaving the survivors deeply vulnerable to the expanding colony.',
          tasks: [
            {
              type: 'comprehension',
              question:
                'How did the outbreak of smallpox in 1789 completely devastate the Eora nation?',
              model:
                'The 1789 smallpox epidemic was catastrophic because Indigenous Australians had had zero prior exposure or biological immunity to European pathogens. Within months, an estimated 50% to 70% of the local Eora population perished in agonizing agony, leaving beaches and inlets strewn with corpses. Crucially, the sudden death of clan elders and healers shattered oral lineages, destroyed sacred kinship structures, and crippled early organized tribal resistance against British expansion.',
              model_answer:
                'The 1789 smallpox epidemic was catastrophic because Indigenous Australians had had zero prior exposure or biological immunity to European pathogens. Within months, an estimated 50% to 70% of the local Eora population perished in agonizing agony, leaving beaches and inlets strewn with corpses. Crucially, the sudden death of clan elders and healers shattered oral lineages, destroyed sacred kinship structures, and crippled early organized tribal resistance against British expansion.',
            },
          ],
          source: {
            id: 'source_a',
            type: 'visual',
            title: 'Early Settlement at Sydney Cove',
            caption:
              "Source B: 'View of the Settlement on Sydney Cove, Port Jackson', a sketch by convict artist Thomas Watling, 1794.",
            src: '/images/sydney_cove_1792.jpg',
            source_context:
              "Thomas Watling was a skilled artist transported for forgery. His sketch shows the very early stages of the British settlement, highlighting how the landscape was rapidly being cleared of trees to build military barracks and governor's residences, fundamentally altering the local environment.\n\n**Hinge Question:** What evidence in this sketch suggests that the British intended to create a permanent, fortified settlement rather than a temporary prison camp?",
            question:
              'Based on Source B, how did the physical construction of the British colony inevitably lead to conflict with the Indigenous peoples?',
            model_answer:
              'Source B shows the British clearing trees and building permanent structures, which meant they were permanently occupying and destroying the natural environment and hunting grounds that the Indigenous peoples relied on, inevitably leading to conflict.',
            provenance_clue:
              'Thomas Watling was a skilled convict artist. While his sketches are highly useful firsthand evidence of the physical transformation of the landscape, he was still a prisoner working under the orders of British officers, which may have influenced what he chose to draw.',
          },
        },
        {
          type: 'narrative',
          theme_heading: 'Pemulwuy and the Hawkesbury River War',
          text: "Despite the devastating impact of disease, Aboriginal resistance was fierce and highly organized. The most famous resistance leader was Pemulwuy, a Bidjigal man. From 1790 to 1802, Pemulwuy led a brilliant campaign of guerrilla warfare against the British settlers who were stealing their hunting grounds along the Hawkesbury River. He burned crops, raided farms, and speared livestock, repeatedly outsmarting the British military. He survived multiple bullet wounds, leading his people to believe he was invincible. Tragically, in 1802, he was finally shot and killed. In a grim reflection of colonial attitudes, his head was severed and sent to London to join the dark collection of human skulls maintained by Sir Joseph Banks, the botanist from Cook's Endeavour voyage.",
          tasks: [
            {
              type: 'comprehension',
              question:
                'Who was Pemulwuy, and why was his resistance campaign so successful against the British military?',
              model:
                'Pemulwuy was a revered Bidjigal warrior who commanded a twelve-year guerrilla resistance campaign (1790–1802) against British colonization across the Sydney basin and Hawkesbury River. His campaign succeeded because he masterfully exploited the rugged bush terrain, targeted settler food supplies, burned standing crops, and ambushed isolated military patrols before disappearing into the bush, neutralizing the superior firepower of British infantry musket lines.',
              model_answer:
                'Pemulwuy was a revered Bidjigal warrior who commanded a twelve-year guerrilla resistance campaign (1790–1802) against British colonization across the Sydney basin and Hawkesbury River. His campaign succeeded because he masterfully exploited the rugged bush terrain, targeted settler food supplies, burned standing crops, and ambushed isolated military patrols before disappearing into the bush, neutralizing the superior firepower of British infantry musket lines.',
            },
          ],
        },
        {
          type: 'narrative',
          theme_heading: 'The Myall Creek Massacre (1838)',
          text: 'As the frontier pushed further inland, the violence became increasingly brutal. One of the most infamous atrocities occurred in 1838 at Myall Creek in New South Wales. A group of eleven heavily armed stockmen (mostly ex-convicts) rode into a camp of peaceful Weraerai people. Without provocation, they rounded up 28 unarmed elders, women, and children, tied them together, and systematically slaughtered them with swords and pistols, later burning the bodies. What made Myall Creek historically significant was not just the horrific violence, but that the perpetrators were actually arrested, tried, and seven were hanged. This was the first time in Australian history that white men were executed for the murder of Aboriginal people. However, it did not stop the frontier violence; it merely forced it underground, leading settlers to use poisoned flour rather than guns to avoid arrest.',
          tasks: [
            {
              type: 'comprehension',
              question: 'Why was the Myall Creek massacre of 1838 historically significant?',
              model:
                'The Myall Creek massacre of 1838 is historically significant because it was the only recorded instance in Australian colonial history where white settlers were arrested, formally tried, convicted, and hanged for the murder of Aboriginal people. Eleven stockmen had brutally slaughtered 28 unarmed Wirrayaraay women, children, and elders. Despite furious racist backlash and protests from wealthy pastoralists, Governor Gipps ordered a retrial that led to seven perpetrators being executed, establishing a landmark legal precedent that British law theoretically applied to protect Indigenous subjects.',
              model_answer:
                'The Myall Creek massacre of 1838 is historically significant because it was the only recorded instance in Australian colonial history where white settlers were arrested, formally tried, convicted, and hanged for the murder of Aboriginal people. Eleven stockmen had brutally slaughtered 28 unarmed Wirrayaraay women, children, and elders. Despite furious racist backlash and protests from wealthy pastoralists, Governor Gipps ordered a retrial that led to seven perpetrators being executed, establishing a landmark legal precedent that British law theoretically applied to protect Indigenous subjects.',
            },
          ],
        },
        {
          type: 'narrative',
          theme_heading: '3. Faces of the First Fleet: The Convict Database',
          text: 'For a long time, history painted the convicts of the First Fleet as dangerous, hardened criminals. However, historical databases reveal a very different reality. Many were impoverished men, women, and even children driven to petty theft by starvation in London\'s slums. \n    \n<div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; margin: 20px 0; overflow: hidden;">\n  <div style="background: #334155; color: white; padding: 12px; font-weight: bold; display: flex; align-items: center;">\n    <i class="fa-solid fa-database" style="margin-right: 10px;"></i> First Fleet Convict Database Extracts <a href="/assets/first_fleet_database.txt" download="first_fleet_database.txt" style="margin-left:auto; background:white; color:#334155; border:none; padding:4px 10px; border-radius:4px; font-size:0.85rem; text-decoration:none; cursor:pointer;"><i class="fa-solid fa-download"></i> Download Full DB</a>\n  </div>\n  <div style="padding: 15px; font-size: 0.95rem;">\n    <div style="border-bottom: 1px solid #e2e8f0; padding-bottom: 15px; margin-bottom: 15px;">\n      <strong style="color: #0f172a; font-size: 1.05rem;">John Hudson (Age: 9)</strong><br>\n      <span style="color: #64748b;">Crime:</span> Stealing<br>\n      <span style="color: #64748b;">Trade:</span> Chimney Sweep<br>\n      <span style="color: #64748b;">Sentence:</span> 7 Years Transportation<br>\n      <span style="color: #64748b;">Database Notes:</span> A child of just nine years old when arrested. Received 50 lashes in 1791 for being out of his hut after 9pm. Transported on the <i>Friendship</i>.\n    </div>\n    <div style="border-bottom: 1px solid #e2e8f0; padding-bottom: 15px; margin-bottom: 15px;">\n      <strong style="color: #0f172a; font-size: 1.05rem;">Esther Abrahams (Age: 20)</strong><br>\n      <span style="color: #64748b;">Crime:</span> Stealing lace<br>\n      <span style="color: #64748b;">Trade:</span> Milliner (Hat maker)<br>\n      <span style="color: #64748b;">Sentence:</span> 7 Years Transportation<br>\n      <span style="color: #64748b;">Database Notes:</span> Jewish. Travelled with her infant daughter. She survived the brutal conditions, became an "industrious woman", and later married Marine Lieutenant George Johnston, gaining enormous wealth and influence.\n    </div>\n    <div>\n      <strong style="color: #0f172a; font-size: 1.05rem;">Robert Abel (Age: 15)</strong><br>\n      <span style="color: #64748b;">Crime:</span> Assault and highway robbery<br>\n      <span style="color: #64748b;">Sentence:</span> Death (commuted to 7 Years Transportation)<br>\n      <span style="color: #64748b;">Database Notes:</span> On 12 June 1790, he was sentenced to receive a brutal 200 lashes simply for the theft of sugar, highlighting the sheer desperation and starvation in the early colony. Transported on the <i>Alexander</i>.\n    </div>\n  </div>\n</div>',
          tasks: [
            {
              type: 'convict_game',
              question: 'Play the Old Bailey Convict Game',
              model:
                "The Old Bailey proceedings highlight the extreme severity of 18th-century English criminal law ('the Bloody Code'), showing how impoverished workers, maidservants, and children were handed life-altering sentences of transportation across the globe for minor property thefts driven by hunger.",
              model_answer:
                "The Old Bailey proceedings highlight the extreme severity of 18th-century English criminal law ('the Bloody Code'), showing how impoverished workers, maidservants, and children were handed life-altering sentences of transportation across the globe for minor property thefts driven by hunger.",
            },
          ],
        },
      ],
      tasks: [],
      banner: '/images/sydney_cove_1792.jpg',
      pair_share: {
        prompt:
          "Discuss with your partner: Did the arrival of the First Fleet represent a 'settlement' or an 'invasion'?",
        think: 'Spend 1 minute quietly considering the question and forming your own opinion.',
        pair: 'Discuss your thoughts with your partner. Identify where your ideas agree and where they differ.',
        share: "Share your pair's combined conclusion with the class.",
      },
    },
    {
      id: 'lesson_4',
      title: 'From Penal Colony to Settlement',
      learning_objectives: [
        'Describe how Australia transitioned from a penal colony to a free settlement through migration and the Gold Rush',
        'Explain how empire, revolution, and change shaped the development of Australian society in the 19th century',
        "Evaluate who benefited most from Australia's transformation and who was marginalised",
      ],
      vocabulary: [
        {
          term: 'Gold Rush',
          definition:
            'The discovery of gold in the 1850s that triggered mass migration to Australia and transformed its economy.',
        },
        {
          term: 'Migration',
          definition:
            'The movement of people — free settlers migrated to Australia seeking land, wealth, and opportunity.',
        },
        {
          term: 'Empire',
          definition:
            'Australia remained part of the British Empire, exporting wool, gold, and other resources.',
        },
        {
          term: 'Change',
          definition:
            'Australia changed dramatically from a penal colony to a prosperous, self-governing settlement.',
        },
        {
          term: 'Marginalisation',
          definition:
            'The process of pushing a group to the edges of society — Indigenous Australians were increasingly marginalised.',
        },
      ],
      enquiry:
        'How did the discovery of gold transform Australia from a convict prison into a wealthy, diverse nation?',
      teacher_notes: {
        primer:
          'This lesson transitions the narrative from the early struggles of the convict colony to the explosive economic growth of the 1850s gold rushes. Students will explore how free settlers, the wool industry, and the arrival of global immigrants (especially Chinese miners) fundamentally changed the demographic and economic landscape of Australia.',
        objectives: [
          {
            objective:
              'Explain the role of the wool industry in making the colony economically viable.',
            primer: 'Discuss John Macarthur and the introduction of Merino sheep.',
            question: "Why was the wool industry critical to Australia's early economic survival?",
          },
          {
            objective: 'Analyze the impact of the 1850s gold rushes on Australian society.',
            primer:
              'Highlight the massive influx of free immigrants and the end of transportation.',
            question: 'How did the discovery of gold change the global perception of Australia?',
          },
          {
            objective: 'Examine the experiences and treatment of Chinese gold miners.',
            primer: 'Discuss the racism, taxes, and riots directed at Chinese immigrants.',
            question:
              'Why were Chinese miners targeted by European diggers and colonial governments?',
          },
        ],
      },
      do_now: {
        type: 'questions',
        items: [
          {
            question:
              "What highly profitable industry transformed Australia's economy in the 1820s?",
            answer: 'The wool industry (sheep farming)',
          },
          {
            question: "Who were 'squatters' in colonial Australia?",
            answer:
              'Wealthy settlers who illegally occupied massive tracts of Aboriginal land to graze their sheep.',
          },
          {
            question:
              'What major discovery in 1851 completely changed the demographics and wealth of Australia?',
            answer: 'The discovery of Gold in New South Wales and Victoria',
          },
          {
            question: 'What was the Eureka Rebellion of 1854?',
            answer:
              'A violent uprising by gold miners in Ballarat protesting against unfair mining licenses and police corruption.',
          },
          {
            question:
              'Which immigrant group faced severe racism, violence, and discriminatory taxes on the goldfields?',
            answer: 'Chinese immigrants',
          },
          {
            question: "What was a 'Ticket of Leave'?",
            answer:
              'A document granting a well-behaved convict freedom to work for themselves before their sentence fully expired.',
          },
          {
            question: 'Who was Lachlan Macquarie?',
            answer:
              'An influential Governor who transformed Sydney from a prison camp into a functioning city with roads, banks, and hospitals.',
          },
          {
            question: 'How were female convicts typically treated in the early colony?',
            answer:
              "They faced extreme vulnerability, exploitation, and were often forced into domestic servitude or the 'Female Factories'.",
          },
          {
            question:
              'What transportation system linked the Australian colonies by the late 19th century?',
            answer: 'The railway network',
          },
          {
            question:
              'In what year did the separate Australian colonies federate to become the Commonwealth of Australia?',
            answer: '1901',
          },
        ],
      },
      vocab: [
        {
          term: 'Squatter',
          definition:
            'A settler who occupied a large tract of Crown land in order to graze livestock, often without legal title initially.',
        },
        {
          term: 'Merino',
          definition:
            'A breed of sheep highly prized for its fine, soft wool, which became the backbone of the Australian economy.',
        },
        {
          term: 'Immigrant',
          definition: 'A person who comes to live permanently in a foreign country.',
        },
        {
          term: 'Xenophobia',
          definition: 'Dislike of or prejudice against people from other countries.',
        },
      ],
      vocab_cloze_text:
        'The early Australian economy relied heavily on the [Merino] sheep industry, driven by wealthy [Squatter] farmers. Later, the gold rushes attracted thousands of every type of [Immigrant], though the sudden arrival of Chinese miners sparked intense [Xenophobia] and racist legislation.',
      flashcards: [],
      sources: [],
      narrative_blocks: [
        {
          type: 'narrative',
          theme_heading: "Riding on the Sheep's Back",
          text: "For its first few decades, New South Wales was an expensive burden on the British taxpayer. It was essentially a massive outdoor prison that struggled to feed itself. The colony finally took its first steps towards self-sufficiency when an ex-convict named James Ruse successfully grew the first wheat crop at Experiment Farm. However, the real economic transformation came with the introduction of the Spanish Merino sheep by wealthy landowners like John Macarthur. As the massive flocks grew, farmers needed new grazing land, prompting explorers like Blaxland, Wentworth, and Lawson to finally cross the rugged, seemingly impassable Blue Mountains in 1813. The dry Australian climate was perfectly suited to sheep farming, and the seemingly endless tracts of land allowed for massive flocks. Enterprising men known as 'squatters' pushed far beyond the official boundaries of settlement, claiming vast areas of Aboriginal land to graze their sheep. By the 1830s, Australia was exporting millions of pounds of high-quality wool to feed the ravenous textile mills of the British Industrial Revolution. The colony was finally profitable.",
          tasks: [
            {
              qNum: 1,
              type: 'comprehension',
              question:
                'How did James Ruse prove that the colony of New South Wales could survive on its own?',
              model:
                'By clearing land and farming with immense grit, he proved within three years that a former convict could become completely self-sufficient.',
            },
            {
              qNum: 2,
              type: 'comprehension',
              question:
                'Explain how the introduction of Spanish Merino sheep transformed the economy of the young Australian colony.',
              model:
                'Merino sheep flourished in the dry climate and produced high-quality wool, which generated massive profits and drove the expansion of the colony.',
            },
            {
              qNum: 3,
              type: 'comprehension',
              question: 'Why did farmers need to cross the rugged Blue Mountains in 1813?',
              model:
                'Drought and soil exhaustion around Sydney forced them to cross the mountains in search of vast, new, rich grazing lands for their expanding flocks of sheep.',
            },
          ],
          source: {
            id: 'source_b',
            type: 'written',
            title: "William Barak's Testimony",
            caption:
              "Source A: Extract from Wurundjeri leader William Barak's testimony to the 1881 Parliamentary Inquiry.",
            content:
              '"And we don\'t want any Board nor inspecting Captain Page over us... and then we will show to the country that we can work it [the farm] and make it pay, and I know it will."',
            source_context:
              "By the late 1800s, Aboriginal people were often forced onto government-run reserves controlled by the 'Board for the Protection of Aborigines'. This Board strictly dictated where Aboriginal people could live and work. William Barak was the leader of Coranderrk, a highly successful Aboriginal farming community. When the Board tried to shut the farm down, Barak led a political campaign to prove Aboriginal people could run a profitable, independent farm without white interference.",
            question:
              "Based on Source A and its context, why was William Barak protesting against the 'Board', and what did he want to prove?",
            model_answer:
              "William Barak was protesting against the 'Board' because they were trying to shut down his community and control their lives. He wanted to prove that Aboriginal people could be independent and run a successful, profitable farm ('make it pay') without white government officials controlling them.",
            provenance_clue:
              'William Barak gave this testimony directly to an official parliamentary inquiry. This is highly useful for historians because it proves that Aboriginal people were actively fighting for their political rights and independence within the British legal system.',
          },
        },
        {
          type: 'narrative',
          theme_heading: 'The Tragedy of the Squatters',
          text: "The 'triumph' of the wool industry came at a terrible cost. The wealthy 'squatters' drove their millions of sheep deep into Aboriginal territories. The sheep destroyed the fragile ecosystem, eating the native plants and muddying the waterholes that Aboriginal people relied on for survival. When starving Aboriginal people hunted the sheep to survive, the squatters retaliated with extreme violence. This period saw massacres and the systematic driving of First Nations peoples off their ancestral lands—a brutal frontier war fought for the profits of the British Empire.",
          tasks: [
            {
              type: 'comprehension',
              question:
                'How did the introduction of Spanish Merino sheep and the wool industry devastate the Aboriginal way of life?',
              model:
                'The booming wool industry led wealthy squatters to illegally seize millions of acres of inland grazing pastures, driving Aboriginal clans from their ancestral lands. Millions of cloven-hoofed sheep trampled fragile soils, destroyed native yam-daisy root crops, and polluted scarce watering holes, while pastoralists aggressively shot native kangaroos and emus. Deprived of their traditional food resources, Aboriginal people faced starvation, and when they speared sheep for sustenance, squatters launched ruthless, violent reprisal raids.',
              model_answer:
                'The booming wool industry led wealthy squatters to illegally seize millions of acres of inland grazing pastures, driving Aboriginal clans from their ancestral lands. Millions of cloven-hoofed sheep trampled fragile soils, destroyed native yam-daisy root crops, and polluted scarce watering holes, while pastoralists aggressively shot native kangaroos and emus. Deprived of their traditional food resources, Aboriginal people faced starvation, and when they speared sheep for sustenance, squatters launched ruthless, violent reprisal raids.',
            },
          ],
        },
        {
          type: 'narrative',
          theme_heading: 'The Gold Rushes of 1851',
          text: 'If wool made Australia profitable, gold made it incredibly wealthy. In 1851, payable gold was discovered by Edward Hargreaves near Bathurst, New South Wales, and shortly after, massive fields were found in Victoria. The news sparked a global frenzy. Almost overnight, the image of Australia shifted from a dreaded, miserable convict prison to a land of unlimited opportunity. Between 1851 and 1860, the population of Australia nearly tripled, surging from 430,000 to over 1.1 million. Free immigrants flooded in from Britain, America, Europe, and Asia. This massive influx of free, ambitious people effectively ended the transportation of convicts to the eastern colonies, as the British government realized they could no longer punish criminals by sending them to a land where people were becoming millionaires.',
          tasks: [
            {
              type: 'comprehension',
              question:
                'How did the discovery of gold by Edward Hargreaves in 1851 permanently change the population of Australia?',
              model:
                "Edward Hargreaves's 1851 discovery sparked a worldwide gold rush that radically transformed Australia's demography. Within a single decade (1851–1861), the colony's population nearly tripled from 430,000 to over 1.1 million people. Hundreds of thousands of free, ambitious prospectors poured in from Britain, Ireland, North America, continental Europe, and China, shifting Australia's identity from a despised penal colony into a wealthy, self-confident, and rapidly growing society.",
              model_answer:
                "Edward Hargreaves's 1851 discovery sparked a worldwide gold rush that radically transformed Australia's demography. Within a single decade (1851–1861), the colony's population nearly tripled from 430,000 to over 1.1 million people. Hundreds of thousands of free, ambitious prospectors poured in from Britain, Ireland, North America, continental Europe, and China, shifting Australia's identity from a despised penal colony into a wealthy, self-confident, and rapidly growing society.",
            },
          ],
          source: {
            id: 'source_a',
            type: 'visual',
            title: 'The Australian Gold Rush',
            caption: "Source B: 'Ballarat 1853-54', an oil painting by Eugene von Guerard, 1854.",
            src: '/images/ballarat_gold.jpg',
            source_context:
              'The discovery of gold in 1851 sparked a massive influx of free immigrants to Australia. This painting shows the chaotic, sprawling nature of the gold diggings at Ballarat, where people from all over the world came to seek their fortune. Beyond the economic boom, the painting also vividly captures the devastating environmental impact of alluvial mining, showing a landscape completely stripped of trees and churned into mud.\n\n**Hinge Question:** How does this painting demonstrate that the Australian Gold Rush completely transformed both the environment and the population of the colony?',
            question:
              'How does Source B demonstrate that Australia had changed from a simple penal colony into a diverse, booming society?',
            model_answer:
              'Source B shows a vast, bustling landscape filled with thousands of tents and active miners, demonstrating that the discovery of gold had attracted massive numbers of free immigrants and transformed Australia into a rapidly growing and chaotic society, far beyond its origins as a small prison camp.',
            provenance_clue:
              'This painting captures the chaos and diversity of the goldfields. It is useful for showing the massive environmental destruction (deforestation, dug-up earth) that completely ruined traditional Aboriginal hunting grounds.',
          },
        },
        {
          type: 'narrative',
          theme_heading: 'The Chinese Experience on the Goldfields',
          text: "Among the hundreds of thousands of immigrants were over 40,000 miners from China. Fleeing poverty and conflict in their homeland, they came seeking 'New Gold Mountain.' Chinese miners were highly organised, hard-working, and often succeeded in finding gold in claims that European miners had abandoned. However, their success, combined with their different language, dress, and customs (such as wearing their hair in a traditional queue), made them targets of intense xenophobia and racism. European miners frequently harassed and attacked them, culminating in violent events like the 1857 Buckland River riot and the 1861 Lambing Flat riots, where Chinese camps were burned and miners were brutally beaten.",
          tasks: [
            {
              type: 'comprehension',
              question:
                'Why did the success of Chinese miners lead to violent events like the Lambing Flat riots?',
              model:
                'Chinese miners were highly organised, sober, and collective in their mining techniques, often working abandoned European claims thoroughly and striking rich deposits of gold. Driven by intense economic envy, water disputes, and deep-seated xenophobia regarding Chinese language, religion, and appearance, European miners formed vigilante anti-Chinese leagues. In 1861 at Lambing Flat, armed white mobs attacked Chinese miners, burning hundreds of tents, plundering possessions, and inflicting savage assaults.',
              model_answer:
                'Chinese miners were highly organised, sober, and collective in their mining techniques, often working abandoned European claims thoroughly and striking rich deposits of gold. Driven by intense economic envy, water disputes, and deep-seated xenophobia regarding Chinese language, religion, and appearance, European miners formed vigilante anti-Chinese leagues. In 1861 at Lambing Flat, armed white mobs attacked Chinese miners, burning hundreds of tents, plundering possessions, and inflicting savage assaults.',
            },
          ],
        },
        {
          type: 'narrative',
          theme_heading: 'Racist Legislation and the Foundation of a Nation',
          text: "Rather than protecting the Chinese miners, the colonial governments responded to the riots by passing discriminatory laws aimed at keeping them out. Victoria implemented an unfair '£10 poll tax' on every Chinese person entering the colony (a massive sum at the time), and restricted the number of Chinese passengers a ship could carry. To avoid the tax, thousands of Chinese immigrants were dropped off in South Australia and forced to walk over 400 kilometers across the harsh outback to reach the Victorian goldfields. This anti-Chinese sentiment laid the dark, racist foundations for the 'White Australia Policy' that would be enacted when Australia officially became a federated nation in 1901.",
          tasks: [
            {
              type: 'comprehension',
              question:
                'How did the colonial governments respond to the anti-Chinese riots on the goldfields?',
              model:
                "Rather than defending Chinese miners against European racial violence, colonial governments appeased the rioters by enacting harsh discriminatory legislation. Victoria and New South Wales passed Chinese Immigrants Restriction Acts, imposing an exorbitant £10 entry poll tax on Chinese arrivals and severely capping the number of Chinese passengers per ship. These discriminatory gold-rush policies formed the direct legal and ideological foundation for the 1901 Immigration Restriction Act ('White Australia Policy').",
              model_answer:
                "Rather than defending Chinese miners against European racial violence, colonial governments appeased the rioters by enacting harsh discriminatory legislation. Victoria and New South Wales passed Chinese Immigrants Restriction Acts, imposing an exorbitant £10 entry poll tax on Chinese arrivals and severely capping the number of Chinese passengers per ship. These discriminatory gold-rush policies formed the direct legal and ideological foundation for the 1901 Immigration Restriction Act ('White Australia Policy').",
            },
          ],
        },
      ],
      tasks: [],
      banner: '/images/ballarat_gold.jpg',
      pair_share: {
        prompt:
          'Discuss with your partner: Once poor migrants realized they could make a fortune digging for gold in Australia, why was it impossible for the British government to continue using transportation as a terrifying punishment?',
        think: 'Spend 1 minute quietly considering the question and forming your own opinion.',
        pair: 'Discuss your thoughts with your partner. Identify where your ideas agree and where they differ.',
        share: "Share your pair's combined conclusion with the class.",
      },
    },
    {
      id: 'lesson_5',
      title: "Lesson 5: Assessment - What's the story of Australia?",
      learning_objectives: [
        'Synthesise knowledge of colonisation, empire, resistance, and change across the history of Australia',
        "Construct a sustained argument evaluating whose perspective should shape how we remember Australia's history",
        'Deploy specific evidence to support a judgement about the legacy of empire in Australia',
      ],
      vocabulary: [
        {
          term: 'Synthesis',
          definition:
            "Combining all knowledge from the unit to form an overall judgement about Australia's history.",
        },
        {
          term: 'Empire',
          definition:
            "The British Empire is the overarching framework for understanding Australia's colonial history.",
        },
        {
          term: 'Perspective',
          definition:
            'A particular point of view — Indigenous and settler perspectives on Australian history differ fundamentally.',
        },
        {
          term: 'Evidence',
          definition: 'Historical facts and examples used to support an argument about the past.',
        },
        {
          term: 'Legacy',
          definition:
            'The long-lasting impact of past events — the legacy of colonisation still shapes Australia today.',
        },
      ],
      banner: '/images/sydney_cove.jpg',
      banner_position: 'center',
      enquiry: 'How did New South Wales develop, and how should we assess its history?',
      teacher_notes: {
        primer:
          'This is the final assessment lesson for the Australia unit. It provides two differentiated choices for students to demonstrate their historical knowledge and skills.',
        objectives: [
          {
            objective:
              'Synthesize knowledge of the development of New South Wales from a penal colony to a profitable settlement.',
            primer: 'Direct students to Assessment 1 for a narrative account.',
            question: "Can you sequence the key turning points in the colony's development?",
          },
          {
            objective: 'Evaluate the usefulness of primary sources for historical enquiries.',
            primer: 'Direct students to Assessment 2 for GCSE-style source utility practice.',
            question: 'Why does the provenance of a source affect its usefulness to a historian?',
          },
        ],
      },
      narrative_blocks: [
        {
          type: 'narrative',
          theme_heading: 'Assessment 1: Write a Narrative Account',
          text: 'Write a narrative account analyzing the development of Australia between the years 1788 and 1855. \n\nYou may use the following in your answer:\n* The near-starvation of the First Fleet (1788)\n* The introduction of Merino sheep and the wool industry\n\nYou must also use information of your own.',
          tasks: [
            {
              type: 'extended_writing',
              question:
                'Write a narrative account analyzing the development of Australia between the years 1788 and 1855.',
              marks: '8',
              instructions:
                'Use these sentence starters to build your narrative in chronological order:\n\n1. The development of Australia began in 1788 when...\n2. This was a very difficult period because...\n3. However, the situation changed dramatically when John Macarthur...\n4. This led to New South Wales becoming a profitable colony because...\n5. Finally, the development of Australia accelerated in the 1850s due to...',
              model:
                "The development of Australia began in 1788 when the First Fleet, carrying over 700 convicts and commanded by Governor Arthur Phillip, landed at Sydney Cove to establish a penal colony. This was a very difficult period because the settlers faced immediate near-starvation due to poor, sandy soil, a lack of farming tools and agricultural knowledge among urban convicts, and the delay of supply ships from Britain; only Governor Phillip's strict policy of equal food rationing for officers and convicts ensured the colony's fragile survival.\n\nHowever, the situation changed dramatically when pioneering farmers proved the colony could feed itself and entrepreneurs like John Macarthur introduced Spanish Merino sheep, which flourished in the dry Australian climate. In 1813, explorers crossed the rugged Blue Mountains, unlocking immense, fertile plains inland that allowed wealthy 'squatters' to expand their grazing runs.\n\nThis led to New South Wales becoming a highly profitable colony because millions of pounds of premium Merino wool were exported to feed the hungry textile mills of the British Industrial Revolution, creating substantial private fortunes and turning an expensive penal outpost into a thriving agricultural export economy (albeit through the catastrophic dispossession of First Nations peoples).\n\nFinally, the development of Australia accelerated rapidly in the 1850s due to the discovery of payable gold by Edward Hargreaves in 1851 near Bathurst and Victoria. The resulting gold rush triggered an international migration wave that nearly tripled Australia's population from 430,000 to over 1.1 million within ten years, bringing diverse free immigrants, ending convict transportation to eastern Australia, and permanently securing self-governing colonial prosperity.",
              model_answer:
                "The development of Australia began in 1788 when the First Fleet, carrying over 700 convicts and commanded by Governor Arthur Phillip, landed at Sydney Cove to establish a penal colony. This was a very difficult period because the settlers faced immediate near-starvation due to poor, sandy soil, a lack of farming tools and agricultural knowledge among urban convicts, and the delay of supply ships from Britain; only Governor Phillip's strict policy of equal food rationing for officers and convicts ensured the colony's fragile survival.\n\nHowever, the situation changed dramatically when pioneering farmers proved the colony could feed itself and entrepreneurs like John Macarthur introduced Spanish Merino sheep, which flourished in the dry Australian climate. In 1813, explorers crossed the rugged Blue Mountains, unlocking immense, fertile plains inland that allowed wealthy 'squatters' to expand their grazing runs.\n\nThis led to New South Wales becoming a highly profitable colony because millions of pounds of premium Merino wool were exported to feed the hungry textile mills of the British Industrial Revolution, creating substantial private fortunes and turning an expensive penal outpost into a thriving agricultural export economy (albeit through the catastrophic dispossession of First Nations peoples).\n\nFinally, the development of Australia accelerated rapidly in the 1850s due to the discovery of payable gold by Edward Hargreaves in 1851 near Bathurst and Victoria. The resulting gold rush triggered an international migration wave that nearly tripled Australia's population from 430,000 to over 1.1 million within ten years, bringing diverse free immigrants, ending convict transportation to eastern Australia, and permanently securing self-governing colonial prosperity.",
            },
          ],
        },
        {
          type: 'narrative',
          theme_heading: "Assessment 2: 'How Useful' Source Analysis",
          text: "<p>Study Sources A and B below. Then answer the question: <strong>How useful are Sources A and B for an enquiry into the impact of British colonization on Aboriginal Australians?</strong></p>\n\n<div style='display:flex; gap: 20px; flex-wrap: wrap;'>\n<div style='flex:1; min-width:300px; background:#f0fdf4; padding:15px; border-left:4px solid #16a34a; margin-bottom:15px;'>\n<strong>Source A: Extract from a letter written by a British squatter in New South Wales, published in a London newspaper in 1840.</strong><br/><br/>\"The land here is vast and entirely unimproved by the native people, who simply wander across it. We have brought civilization, built permanent farms, and our flocks of sheep are multiplying rapidly. We are turning a wasteland into a highly profitable jewel of the Empire. The natives are melting away, which is the natural outcome when a superior race arrives.\"<br/><br/><em>Provenance Clue: Written by a wealthy squatter trying to encourage more British investment, in an era where racism was common.</em>\n</div>\n\n<div style='flex:1; min-width:300px; background:#f0fdf4; padding:15px; border-left:4px solid #16a34a; margin-bottom:15px;'>\n<strong>Source B: Extract from a report by Lancelot Threlkeld, a Christian missionary living among the Awabakal people, written in 1838.</strong><br/><br/>\"It is a tragedy to witness the complete destruction of these people. The white settlers have stolen their hunting grounds. When the starving natives steal a single sheep to survive, they are hunted down and shot like dogs by the squatters. The British government has done nothing to protect them from this slaughter.\"<br/><br/><em>Provenance Clue: Written by a missionary whose job was to protect Aboriginal people, meaning he sympathised with them and saw the brutality of the squatters firsthand.</em>\n</div>\n</div>\n\n<div style='margin-top:20px; padding: 15px; background-color: #fffbeb; border-left: 4px solid #fbbf24;'>\n<h4>Scaffolding: How to analyze these sources</h4>\n<p>For <strong>both</strong> sources, make sure you address:</p>\n<ul>\n<li><strong>Content:</strong> What does the source actually say? What details are useful?</li>\n<li><strong>Context:</strong> What do you know about this from your lessons that supports or challenges the source?</li>\n<li><strong>Provenance (NOP):</strong> Who wrote it, when, and why? How does that affect its reliability and usefulness?</li>\n</ul>\n</div>",
          tasks: [
            {
              type: 'source_analysis',
              question:
                'How useful are Sources A and B for an enquiry into the impact of British colonization on Aboriginal Australians?',
              marks: '8',
              model:
                "Source A is highly useful for an enquiry into the impact of British colonization because it reveals the aggressive ideological mindset and economic greed that drove the dispossession of Aboriginal Australians. In its content, the author describes the land as 'unimproved' wasteland and refers to Aboriginal people as merely 'wandering', claiming they are 'melting away' as a 'natural outcome' of European superiority. This is useful because it directly reflects the doctrine of Terra Nullius and 19th-century racial Darwinism used by squatters to rationalize pastoral theft. In terms of provenance, as a letter by a wealthy squatter published in a London newspaper in 1840, its purpose was to attract British capital and settlers; while it completely distorts Aboriginal culture and whitewashes frontier violence, it is immensely useful for showing how colonizers justified ethnic cleansing to the British public.\n\nSource B is equally useful because it exposes the brutal, violent reality of British colonization from an empathetic eyewitness perspective. The content explicitly details how white settlers 'stolen their hunting grounds' and how starving natives were 'hunted down and shot like dogs by the squatters' with zero government protection. This aligns with our historical knowledge of the frontier wars, the depletion of native food sources by Merino sheep, and atrocities like the 1838 Myall Creek Massacre. As an 1838 report by Lancelot Threlkeld, a Christian missionary living directly among the Awabakal people, its purpose was to document settler atrocities and lobby the imperial government for legal intervention and native protection. Although Threlkeld's Christian evangelical perspective might lead him to focus on native victimhood, his firsthand observations provide authentic, corroborated evidence of frontier brutality.\n\nTaken together, Sources A and B are exceptionally useful: Source A exposes the racist justifications and economic expansion of the pastoral squatters, while Source B exposes the lethal human cost and violent dispossession inflicted upon Aboriginal peoples.",
              model_answer:
                "Source A is highly useful for an enquiry into the impact of British colonization because it reveals the aggressive ideological mindset and economic greed that drove the dispossession of Aboriginal Australians. In its content, the author describes the land as 'unimproved' wasteland and refers to Aboriginal people as merely 'wandering', claiming they are 'melting away' as a 'natural outcome' of European superiority. This is useful because it directly reflects the doctrine of Terra Nullius and 19th-century racial Darwinism used by squatters to rationalize pastoral theft. In terms of provenance, as a letter by a wealthy squatter published in a London newspaper in 1840, its purpose was to attract British capital and settlers; while it completely distorts Aboriginal culture and whitewashes frontier violence, it is immensely useful for showing how colonizers justified ethnic cleansing to the British public.\n\nSource B is equally useful because it exposes the brutal, violent reality of British colonization from an empathetic eyewitness perspective. The content explicitly details how white settlers 'stolen their hunting grounds' and how starving natives were 'hunted down and shot like dogs by the squatters' with zero government protection. This aligns with our historical knowledge of the frontier wars, the depletion of native food sources by Merino sheep, and atrocities like the 1838 Myall Creek Massacre. As an 1838 report by Lancelot Threlkeld, a Christian missionary living directly among the Awabakal people, its purpose was to document settler atrocities and lobby the imperial government for legal intervention and native protection. Although Threlkeld's Christian evangelical perspective might lead him to focus on native victimhood, his firsthand observations provide authentic, corroborated evidence of frontier brutality.\n\nTaken together, Sources A and B are exceptionally useful: Source A exposes the racist justifications and economic expansion of the pastoral squatters, while Source B exposes the lethal human cost and violent dispossession inflicted upon Aboriginal peoples.",
            },
          ],
        },
      ],
      do_now: {
        type: 'questions',
        items: [
          {
            question:
              "What Latin legal term did the British Crown use to claim Australia was 'nobody's land'?",
            answer: 'Terra Nullius',
          },
          {
            question:
              "Who was the master Polynesian star navigator who guided Captain Cook's Endeavour across the Pacific?",
            answer: 'Tupaia',
          },
          {
            question:
              'Which global event in 1776 stopped Britain from transporting convicts to North America?',
            answer: 'The American War of Independence',
          },
          {
            question:
              'What were the decaying, overcrowded decommissioned warships used as temporary prisons in Britain called?',
            answer: 'Prison hulks',
          },
          {
            question:
              'Which naval officer was the first Governor of New South Wales and instituted equal food rationing?',
            answer: 'Governor Arthur Phillip',
          },
          {
            question:
              'What catastrophic disease broke out in 1789, killing an estimated 50% to 70% of the Sydney Eora population?',
            answer: 'Smallpox',
          },
          {
            question:
              'Which Bidjigal warrior led a twelve-year guerrilla resistance campaign against British settlement until 1802?',
            answer: 'Pemulwuy',
          },
          {
            question:
              'At which 1838 massacre were seven white stockmen convicted and hanged for murdering 28 unarmed Aboriginal people?',
            answer: 'The Myall Creek Massacre',
          },
          {
            question:
              'Which breed of Spanish sheep, championed by John Macarthur, created a booming export industry for New South Wales?',
            answer: 'Merino sheep',
          },
          {
            question:
              "What major mineral discovery by Edward Hargreaves in 1851 caused Australia's population to nearly triple within a decade?",
            answer: 'Gold (the 1851 Gold Rush)',
          },
        ],
      },
    },
  ],
  quizPack: [
    {
      id: 'aus_q1',
      q: "What was the public scientific purpose of Captain Cook's 1768 voyage on the Endeavour?",
      a: 'To observe the transit of Venus across the Sun in Tahiti',
      options: [
        'To observe the transit of Venus across the Sun in Tahiti',
        'To establish a penal colony for British convicts',
        'To map the spice routes of the East Indies',
        'To wage a naval war against Spanish settlements',
      ],
    },
    {
      id: 'aus_q2',
      q: 'What secret orders did the British Admiralty give Captain Cook?',
      a: 'To search for and claim the Great Southern Land for King George III',
      options: [
        'To search for and claim the Great Southern Land for King George III',
        'To capture French trading vessels in the Pacific',
        'To purchase land from Indigenous leaders',
        'To build a naval fortress in Tahiti',
      ],
    },
    {
      id: 'aus_q3',
      q: 'Who was Tupaia?',
      a: "A master Polynesian star navigator and high priest from Ra'iatea",
      options: [
        "A master Polynesian star navigator and high priest from Ra'iatea",
        'The senior Eora warrior who opposed the landing at Botany Bay',
        'A British botanist who assisted Sir Joseph Banks',
        'The first convict to receive a land grant in Sydney',
      ],
    },
    {
      id: 'aus_q4',
      q: 'How did Tupaia navigate across thousands of miles of open Pacific Ocean?',
      a: 'By reading stars, ocean currents, bird flights, and cloud formations',
      options: [
        'By reading stars, ocean currents, bird flights, and cloud formations',
        'By using European brass sextants and marine chronometers',
        'By following compass bearings drawn by Captain Cook',
        'By copying secret Spanish nautical charts',
      ],
    },
    {
      id: 'aus_q5',
      q: "Which Aboriginal clan met Captain Cook's landing party at Botany Bay in 1770?",
      a: 'The Gweagal clan of the Dharawal nation',
      options: [
        'The Gweagal clan of the Dharawal nation',
        'The Wirrayaraay people of New South Wales',
        'The Wurundjeri clan of Victoria',
        'The Awabakal people of Lake Macquarie',
      ],
    },
    {
      id: 'aus_q6',
      q: "What legal fiction did Britain use to declare Australia 'belonging to no one'?",
      a: 'Terra Nullius',
      options: ['Terra Nullius', 'Habeas Corpus', 'Pax Britannica', 'Manifest Destiny'],
    },
    {
      id: 'aus_q7',
      q: 'Why did Britain face a severe prison crisis starting in 1776?',
      a: 'The American War of Independence ended convict transportation to America',
      options: [
        'The American War of Independence ended convict transportation to America',
        'A Great Fire destroyed the main prisons in London',
        'The King abolished capital punishment and replaced it with prison terms',
        'Crime rates tripled following the end of the Napoleonic Wars',
      ],
    },
    {
      id: 'aus_q8',
      q: "What were 'prison hulks'?",
      a: 'Old, rotting decommissioned warships used as temporary floating prisons',
      options: [
        'Old, rotting decommissioned warships used as temporary floating prisons',
        'Special underground dungeons beneath Newgate Prison',
        'Heavily armoured wagons used to transport prisoners between cities',
        'Remote island fortresses built off the Scottish coast',
      ],
    },
    {
      id: 'aus_q9',
      q: 'In what month and year did the First Fleet arrive at Sydney Cove?',
      a: 'January 1788',
      options: ['January 1788', 'April 1770', 'May 1813', 'August 1851'],
    },
    {
      id: 'aus_q10',
      q: 'How did Governor Arthur Phillip prevent mass starvation during the early years at Sydney Cove?',
      a: 'By enforcing equal food rationing for officers and convicts alike',
      options: [
        'By enforcing equal food rationing for officers and convicts alike',
        'By trading manufactured tools with local Eora hunters',
        'By sending half the convicts back to Britain immediately',
        'By forcing convicts to survive solely on native berries and kangaroo meat',
      ],
    },
    {
      id: 'aus_q11',
      q: 'Who was John Hudson on the First Fleet?',
      a: 'A nine-year-old chimney sweep transported for seven years for petty theft',
      options: [
        'A nine-year-old chimney sweep transported for seven years for petty theft',
        'The naval doctor who kept detailed journals on the voyage',
        'A violent highway robber sentenced to life imprisonment',
        'The first free settler to establish a commercial sheep flock',
      ],
    },
    {
      id: 'aus_q12',
      q: "What was King George III's official instruction to Governor Phillip regarding Indigenous Australians?",
      a: "To live in 'amity and kindness' and punish anyone who harmed them",
      options: [
        "To live in 'amity and kindness' and punish anyone who harmed them",
        'To conquer the interior and force Indigenous people into slavery',
        'To purchase land strictly via signed treaties and cash payments',
        'To avoid all contact and build high defensive stockades',
      ],
    },
    {
      id: 'aus_q13',
      q: 'What catastrophic epidemic struck the Eora people around Sydney in 1789?',
      a: 'Smallpox',
      options: ['Smallpox', 'Cholera', 'Bubonic Plague', 'Typhus'],
    },
    {
      id: 'aus_q14',
      q: 'Who was Bennelong?',
      a: 'A senior Eora man who acted as an intermediary and visited King George III in London',
      options: [
        'A senior Eora man who acted as an intermediary and visited King George III in London',
        'A Bidjigal guerrilla warrior who waged war on British farms for twelve years',
        'A Christian missionary who documented atrocities against Aboriginal people',
        'The leader of the Coranderrk Aboriginal farming community',
      ],
    },
    {
      id: 'aus_q15',
      q: 'Which Indigenous resistance leader waged a twelve-year guerrilla war against British settlers until 1802?',
      a: 'Pemulwuy',
      options: ['Pemulwuy', 'Bennelong', 'William Barak', 'Tupaia'],
    },
    {
      id: 'aus_q16',
      q: 'Why was the Myall Creek trial of 1838 a landmark legal event?',
      a: 'It was the only time white settlers were convicted and hanged for murdering Aboriginal people',
      options: [
        'It was the only time white settlers were convicted and hanged for murdering Aboriginal people',
        'It led directly to the official abolition of convict transportation',
        'It granted full voting rights to Indigenous Australians',
        'It recognized native land title for the first time in imperial courts',
      ],
    },
    {
      id: 'aus_q17',
      q: 'Who was the ex-convict who proved New South Wales could feed itself at Experiment Farm?',
      a: 'James Ruse',
      options: ['James Ruse', 'John Macarthur', 'Edward Hargreaves', 'Gregory Blaxland'],
    },
    {
      id: 'aus_q18',
      q: 'Which animal breed transformed the economy of New South Wales into a lucrative exporter?',
      a: 'Spanish Merino sheep',
      options: [
        'Spanish Merino sheep',
        'Hereford beef cattle',
        'Arabian thoroughbred horses',
        'Angora dairy goats',
      ],
    },
    {
      id: 'aus_q19',
      q: 'What discovery by Edward Hargreaves in 1851 transformed Australia from a penal colony to a booming migrant destination?',
      a: 'Gold near Bathurst, New South Wales',
      options: [
        'Gold near Bathurst, New South Wales',
        'Vast silver reserves in Broken Hill',
        'Iron ore deposits in Western Australia',
        'Underground oil wells in Queensland',
      ],
    },
    {
      id: 'aus_q20',
      q: 'What racist legislative policy had its direct roots in anti-Chinese goldfield riots like Lambing Flat?',
      a: 'The White Australia Policy',
      options: [
        'The White Australia Policy',
        'The Treaty of Waitangi',
        'The Native Title Act',
        'The Australian Federation Act',
      ],
    },
  ],
  glossary: [
    {
      term: 'Ancestors',
      definition: 'The people that we are descended from, who lived in a territory before us.',
    },
    {
      term: 'Botany Bay',
      definition:
        'An area on the east coast of Australia where Captain Cook landed in 1770, named after the immense number of plant specimens found there.',
    },
    {
      term: 'Colony',
      definition:
        'A country or area under the political control of another country and occupied by settlers from that country.',
    },
    {
      term: 'Gweagal',
      definition:
        'The specific Aboriginal Australian clan of the Dharawal nation who first encountered Captain Cook at Botany Bay in 1770.',
    },
    {
      term: 'Navigator',
      definition:
        'A person who directs the course of a ship using maps, stars, and specialised celestial knowledge.',
    },
    {
      term: 'Royal Society',
      definition:
        "A prestigious British scientific academy established in 1660 that co-funded Captain Cook's 1768 expedition.",
    },
    {
      term: 'Terra Nullius',
      definition:
        "A Latin legal term meaning 'land belonging to no one' — used falsely by Britain to justify claiming Australia without native consent.",
    },
    {
      term: 'First Fleet',
      definition:
        'The convoy of 11 British ships commanded by Arthur Phillip that carried over 1,400 people, including 700+ convicts, to Australia in 1788.',
    },
    {
      term: 'Convict',
      definition:
        'A person found guilty of a criminal offence and sentenced to transportation or penal servitude.',
    },
    {
      term: 'Governor',
      definition:
        'The supreme official appointed to govern a colony on behalf of the British Crown, such as Captain Arthur Phillip.',
    },
    {
      term: 'Hard labour',
      definition:
        'Heavy, grueling physical punishment, such as quarrying stone or road-building in iron chains.',
    },
    {
      term: 'Hulk',
      definition:
        'A decommissioned, decaying warship moored in British harbours and used as an overcrowded temporary floating prison.',
    },
    {
      term: 'Transportation',
      definition:
        'The legal punishment of banishing convicted criminals to a distant overseas penal colony for a term of years or life.',
    },
    {
      term: 'Sydney Cove',
      definition:
        'The deep, natural harbor in Port Jackson where Governor Phillip established the permanent settlement in January 1788.',
    },
    {
      term: 'Eora',
      definition:
        'The Indigenous nation of people native to the coastal Sydney basin prior to British colonisation.',
    },
    {
      term: 'Frontier',
      definition:
        'The expanding and contested boundary between British pastoral settlement and unconquered Indigenous lands.',
    },
    {
      term: 'Guerrilla Warfare',
      definition:
        'Irregular military tactics, including surprise raids, burning supplies, and ambushes, famously used by Pemulwuy.',
    },
    {
      term: 'Dispossession',
      definition:
        'The systematic removal of Aboriginal peoples from their ancestral lands, waters, and sacred heritage.',
    },
    {
      term: 'Massacre',
      definition:
        'The indiscriminate, brutal slaughter of defenseless people, such as the 1838 Myall Creek massacre.',
    },
    {
      term: 'Squatter',
      definition:
        'A wealthy pastoralist who occupied vast tracts of Crown or Aboriginal land to graze millions of sheep without legal title initially.',
    },
    {
      term: 'Merino',
      definition:
        "A hardy breed of Spanish sheep yielding premium fine wool that formed the foundation of Australia's 19th-century economy.",
    },
    {
      term: 'Gold Rush',
      definition:
        'The rapid migration of hundreds of thousands of prospectors following the 1851 discovery of payable gold in New South Wales and Victoria.',
    },
    {
      term: 'Immigrant',
      definition: 'A person who moves permanently to settle in a foreign country or colony.',
    },
    {
      term: 'Xenophobia',
      definition:
        'Fear, hatred, or prejudice against people from other cultures, which drove anti-Chinese goldfield riots like Lambing Flat.',
    },
    {
      term: 'White Australia Policy',
      definition:
        'A series of discriminatory colonial and federal laws starting in the 1850s designed to restrict non-European immigration.',
    },
  ],
  key_individuals: [
    {
      name: 'Captain James Cook',
      group: 'Explorers & Navigators',
      image: '/images/james_cook.jpg',
      title: 'Commander of the Endeavour',
      bio: "A British naval officer and explorer who commanded the Endeavour. He is famous for mapping the eastern coast of Australia in 1770 and claiming it for Great Britain under the false legal premise of Terra Nullius (nobody's land).",
      key_achievements: [
        'Commanded the Endeavour expedition (1768-1771)',
        'Mapped the eastern coast of Australia',
        'Claimed New South Wales for King George III',
      ],
    },
    {
      name: 'Sir Joseph Banks',
      group: 'Explorers & Navigators',
      image: '/images/joseph_banks.jpg',
      title: 'Lead Botanist on the Endeavour',
      bio: 'A wealthy and highly influential British botanist who funded and led the scientific expedition on the Endeavour. He collected thousands of unknown plant species at Botany Bay and was a major advocate for establishing a penal colony in Australia.',
      key_achievements: [
        "Led the Royal Society's scientific team on the Endeavour",
        'Collected thousands of new botanical specimens',
        'Advocated for the colonization of New South Wales',
      ],
    },
    {
      name: 'Tupaia',
      group: 'Explorers & Navigators',
      image: '/images/default_person.svg',
      title: 'Polynesian Star Navigator',
      bio: "A master Polynesian star navigator and high priest from Ra'iatea. He possessed a vast mental map of the Pacific Ocean and guided the Endeavour through treacherous waters. He also served as a crucial translator with the Māori in New Zealand.",
      key_achievements: [
        'Navigated the Endeavour across 3,000 miles of ocean without instruments',
        'Acted as a vital diplomat and translator with Pacific peoples',
        'Created a highly detailed chart of the Pacific Islands',
      ],
    },
    {
      name: 'Governor Arthur Phillip',
      group: 'Colonial Figures',
      image: '/images/arthur_phillip.jpg',
      title: 'First Governor of New South Wales',
      bio: 'The commander of the First Fleet and the first Governor of the penal colony. He was responsible for ensuring the survival of the settlement at Sydney Cove by enforcing strict rationing and forced manual labor.',
      key_achievements: [
        'Commanded the First Fleet to Australia in 1788',
        'Established the first British settlement at Sydney Cove',
        'Saved the colony from starvation through equal food rationing',
      ],
    },
    {
      name: 'Arthur Bowes Smyth',
      group: 'Colonial Figures',
      image: '/images/arthur_bowes_smyth.jpg',
      title: 'Naval Surgeon of the First Fleet',
      bio: 'A naval surgeon aboard the Lady Penrhyn, the ship carrying the majority of the female convicts. He kept a highly detailed eyewitness journal that provides invaluable historical insights into the lives and struggles of the first female convicts.',
      key_achievements: [
        'Served as a surgeon on the First Fleet',
        'Wrote one of the most detailed journals of the voyage',
        'Recorded the names, ages, and trades of the female convicts',
      ],
    },
    {
      name: 'John Macarthur',
      group: 'Colonial Figures',
      image: '/images/john_macarthur.jpg',
      title: 'Pioneer of the Wool Industry',
      bio: 'A wealthy British army officer and landowner who introduced Merino sheep to Australia. He played a pivotal role in transforming New South Wales from an expensive penal colony into a highly profitable exporter of wool.',
      key_achievements: [
        'Introduced Merino sheep to the Australian colonies',
        'Pioneered the highly profitable wool export industry',
        'Led the Rum Rebellion against Governor William Bligh',
      ],
    },
    {
      name: 'Bennelong',
      group: 'First Nations Leaders',
      image: '/images/bennelong.jpg',
      title: 'Senior Wangal Leader',
      bio: 'A senior Eora man who was kidnapped by the British to act as an intermediary. He navigated the complex clash of two cultures, becoming the first Aboriginal Australian to travel to England, and wrote the earliest known letter in English by an Indigenous person.',
      key_achievements: [
        'Acted as a crucial intermediary between the Eora and the British',
        'Traveled to London and met King George III',
        'Authored the earliest known letter in English by an Aboriginal person (1796)',
      ],
    },
    {
      name: 'Pemulwuy',
      group: 'First Nations Leaders',
      image: '/images/pemulwuy.jpg',
      title: 'Bidjigal Resistance Leader',
      bio: 'A fierce Bidjigal warrior who refused to accept British colonization. He waged a highly organized, 12-year guerrilla war against British expansion in the Sydney region, leading attacks on farms and military outposts to defend his homeland.',
      key_achievements: [
        'Led a 12-year guerrilla war of resistance against the British',
        'United different Aboriginal groups to fight colonial expansion',
        'Challenged the myth that Aboriginal people passively accepted British rule',
      ],
    },
    {
      name: 'William Barak',
      group: 'First Nations Leaders',
      image: '/images/william_barak.jpg',
      title: 'Wurundjeri Leader and Activist',
      bio: "A Wurundjeri leader who led a sophisticated political campaign in the late 19th century to protect the Coranderrk Aboriginal Station. He fought against the 'Board for the Protection of Aborigines', demanding land rights and self-determination for his people.",
      key_achievements: [
        'Led the political fight to save the Coranderrk farming community',
        'Testified at the 1881 Parliamentary Inquiry demanding self-determination',
        'Preserved Wurundjeri culture through his paintings and teachings',
      ],
    },
  ],
  assessments: [],
  guided_reading: [
    {
      lesson_index: 0,
      book_title: 'Captain James Cook’s Journal',
      author: 'Captain James Cook (22 August 1770)',
      author_context:
        "In 1770, Captain James Cook sailed the HMS Endeavour along the eastern coast of Australia. The land had been inhabited by Indigenous Australians for over 60,000 years, but under European law, because they did not build towns or farm the land in a European way, the British considered it terra nullius—nobody's land.",
      is_adapted: false,
      hinge_question:
        "<strong>Think:</strong> Write down the exact phrase Cook uses to explain *why* he believes he has the right to claim the land.<br><strong>Pair:</strong> Look at what Cook is actually claiming: 'the whole Eastern Coast... together with all the Bays, Harbours, Rivers, and Islands.' Discuss with your partner how ridiculous it is to claim half a continent just by planting a flag and firing a few guns on a beach.<br><strong>Share:</strong> Indigenous Australians were watching the Endeavour from the shore. Based on Cook's actions, how do you think the British are going to treat the people who already live there?",
      extract:
        '"As I am now about to quit the Eastern Coast of New Holland, which I have coasted from latitude 38 to this place, and which I am confident no European has ever seen before, I once more hoisted English Coulers, and in the Name of His Majesty King George the Third took possession of the whole Eastern Coast from the above latitude down to this place by the name of New South Wales, together with all the Bays, Harbours, Rivers, and Islands situate upon the said coast; after which we fired three volleys of small arms, which were answered by the like number from the ship.\n\nThis done, we set out for the ship, but were some time in getting on board on account of a very rapid ebb tide, which set NE out of the Strait."\n\n<strong>Glossary:</strong>\n<ul><li><strong>Hoisted English Coulers:</strong> Raised the British flag (the Union Jack).</li><li><strong>Situate:</strong> Located or placed.</li><li><strong>Volleys of small arms:</strong> Firing muskets or guns all at the same time as a salute.</li></ul>',
    },
    {
      lesson_index: 1,
      book_title: 'A Narrative of the Expedition to Botany Bay',
      author: 'Captain Watkin Tench (1789)',
      author_context:
        "In 1788, the 'First Fleet' arrived at Sydney Cove. It was packed with British criminals—many of whom had only stolen food or clothes—sent across the world to build a new prison colony. Captain Watkin Tench was an officer in charge of the marines guarding the convicts. Here, he describes the brutal reality of their first few months ashore.",
      is_adapted: false,
      hinge_question:
        '<strong>Think:</strong> Identify two specific reasons from the text why building the first settlement in Sydney was so difficult.<br><strong>Pair:</strong> Discuss the punishment given for stealing a single piece of soap. What does this extreme violence tell us about how the officers felt about keeping control of the colony?<br><strong>Share:</strong> These convicts were not skilled builders; they were pickpockets, thieves, and starving city-dwellers. Did the British Government set the First Fleet up to succeed, or set them up to die?',
      extract:
        '"The general business of the settlement was now directed to the building of huts, and the clearing of ground... The convicts were divided into gangs, and officers appointed to command them. But the progress of their labour was very slow.\n\nMany of them were so weakened by the scurvy, and other distempers, as to be poorly able to perform any labour; and the timber of this country is so remarkably hard, that our tools were broken, and blunted, by the wood, as fast as they were repaired.\n\n...Thefts were frequent, and punishments severe. A convict was caught in the act of stealing a piece of soap from a soldier... He was tried by the criminal court, and sentenced to receive three hundred lashes, which were severely inflicted."\n\n<strong>Glossary:</strong>\n<ul><li><strong>Scurvy:</strong> A horrific disease caused by a lack of vitamin C on long sea voyages, causing teeth to fall out and wounds to open up.</li><li><strong>Distempers:</strong> Illnesses or diseases.</li><li><strong>Lashes:</strong> Being whipped across the bare back. (300 lashes was a potentially fatal punishment).</li></ul>',
    },
    {
      lesson_index: 2,
      book_title: "Sydney's First Four Years",
      author: 'Captain Watkin Tench (April 1789)',
      author_context:
        'Within a year of the British arriving, a terrifying disaster struck the local Indigenous tribes (the Eora people) around Sydney. Because Australia had been isolated from the rest of the world for millennia, the Indigenous people had absolutely no immunity to European diseases.',
      is_adapted: false,
      hinge_question:
        "<strong>Think:</strong> Write down what the British surgeons found in the coves and inlets around the harbor.<br><strong>Pair:</strong> Tench says it was 'inexplicable' how the smallpox arrived, noting that none of the British people were currently sick with it. Discuss with your partner where the disease *must* have come from, even if the British didn't realize it.<br><strong>Share:</strong> It is estimated that up to 70% of the Indigenous population around Sydney died in this single outbreak. How would this catastrophic loss of life make it easier for the British to take over the rest of the land?",
      extract:
        '"An extraordinary calamity was now observed among the natives. Repeated accounts brought by our boats of finding bodies of the Indians in all the coves and inlets of the harbour, caused the governor to dispatch the surgeons...\n\nThey reported on their return, that they had found them in all the miserable, consuming stages of the smallpox. From this time a great number of dead bodies were found on the beaches, or floating in the water...\n\nHow a disease, to which our former observations had led us to suppose them entire strangers, could at once have introduced itself, and have spread so widely, seemed inexplicable... It is certain that none of our people were affected by it."\n\n<strong>Glossary:</strong>\n<ul><li><strong>Calamity:</strong> A terrible, sudden disaster causing huge damage or loss of life.</li><li><strong>Inlets:</strong> Small, narrow bays or strips of water running into the land.</li><li><strong>Inexplicable:</strong> Unable to be explained or understood.</li></ul>',
    },
    {
      lesson_index: 3,
      book_title: 'The Sydney Morning Herald',
      author: 'Newspaper Report (19 May 1851)',
      author_context:
        'For 60 years, Australia was seen as a miserable prison. But in 1851, everything changed. Gold was discovered in New South Wales and Victoria. Suddenly, instead of being dragged there in chains, thousands of free people from Britain, America, and China were desperately paying to sail to Australia.',
      is_adapted: false,
      hinge_question:
        "<strong>Think:</strong> According to the newspaper, what have the farmers and the tradesmen done?<br><strong>Pair:</strong> Look at the phrase 'the masters have been left by their servants, and the servants have left their masters.' Discuss with your partner how the Gold Rush was destroying the normal class system and social rules of the British Empire.<br><strong>Share:</strong> How did the discovery of gold permanently change the purpose and identity of Australia?",
      extract:
        '"A complete mental madness appears to have seized almost every member of the community. There has been a universal rush to the diggings... The towns of Bathurst and Wellington are almost deserted.\n\nThe mechanics and tradesmen have thrown down their tools, the farmers have left their crops, the masters have been left by their servants, and the servants have left their masters. All are hastening to the El Dorado...\n\nA gentleman who arrived in town last night reports that he met upwards of two hundred persons on the road, heavily laden with picks, spades, and washing dishes. Some were driving carts, others were on horseback, and the majority on foot."\n\n<strong>Glossary:</strong>\n<ul><li><strong>Mechanics:</strong> Skilled manual workers, like carpenters, blacksmiths, or bricklayers.</li><li><strong>Hastening:</strong> Hurrying or rushing.</li><li><strong>El Dorado:</strong> A legendary, mythical city made entirely of gold in South America (used here as a metaphor for the goldfields).</li></ul>',
    },
    {
      lesson_index: 4,
      book_title: 'Aborigines Claim Citizen Rights! (The Day of Mourning Manifesto)',
      author: 'Jack Patten and William Ferguson (26 January 1938)',
      author_context:
        "On January 26, 1938, white Australians celebrated the 150th anniversary of the arrival of the First Fleet with a massive party. On the exact same day, early Indigenous civil rights leaders Jack Patten and William Ferguson organized a 'Day of Mourning' and published this powerful manifesto to challenge the official 'story' of Australia.",
      is_adapted: false,
      hinge_question:
        "<strong>Think:</strong> How do the authors of this text refer to the British people who arrived on the First Fleet? (Write down the exact two-word phrase they use at the end of the first paragraph).<br><strong>Pair:</strong> Discuss why the authors put the word 'progress' in quotation marks. What might look like progress to a white settler, but look like disaster to an Indigenous Australian?<br><strong>Share:</strong> This document challenges us to look at the whole story of Australia. Based on everything we have studied in this unit (exploration, convicts, disease, gold, and dispossession), is the story of early Australia a story of heroic survival, or a story of brutal invasion?",
      extract:
        "\"The 26th of January, 1938, is not a day of rejoicing for Australia's Aborigines; it is a day of mourning. This festival of 150 years' so-called 'progress' in Australia commemorates also 150 years of misery and degradation imposed upon the original native inhabitants by the white invaders of this country.\n\nWe, representing the Aborigines, now ask you, the reader of this appeal, to pause in the midst of your rejoicing, and ask yourself honestly whether your 'conscience' is clear in regard to the treatment of the Australian blacks by the Australian whites during the period of 150 years' history which you celebrate?\n\n...You are the New Australians, but we are the Old Australians. We have in our arteries the blood of the Original Australians, who have lived in this land for many thousands of years. You came here only recently, and you took our land away from us by force.\"\n\n<strong>Glossary:</strong>\n<ul><li><strong>Rejoicing:</strong> Celebrating or showing great joy.</li><li><strong>Degradation:</strong> Being treated with extreme disrespect, humiliation, and cruelty.</li><li><strong>Commemorates:</strong> Remembers or marks an important event in history.</li></ul>",
    },
  ],
};

// Support both ES module and CommonJS environments (legacy fallback)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = unitData;
}
