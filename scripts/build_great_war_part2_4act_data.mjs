import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

// Load existing data to preserve quizzes, individuals, and existing prose
const existingDataMod = await import(
  pathToFileURL(path.resolve('units/great_war_part2/data.js')).href
);
const existingData = existingDataMod.default || existingDataMod.unitData;

// 30 Core Disciplinary Glossary Terms for Year 9 Great War Part 2
const glossary = [
  {
    term: 'British Expeditionary Force (BEF)',
    definition:
      'The professional British army of approximately 120,000 soldiers deployed to France and Belgium in August 1914.',
  },
  {
    term: 'Conscription',
    definition:
      'Compulsory military service ordered by law, introduced in Great Britain in January 1916 for unmarried men aged 18–41.',
  },
  {
    term: 'Pals Battalions',
    definition:
      'Specially raised British army units allowing friends, neighbours, and workmates from the same town to enlist and serve together.',
  },
  {
    term: 'Pompey Pals',
    definition:
      'The 14th and 15th Battalions of the Hampshire Regiment, formed predominantly of volunteers from Portsmouth, Fareham, and Stubbington.',
  },
  {
    term: 'Propaganda',
    definition:
      'Biased, misleading, or emotionally charged information used by governments to promote military enlistment and war patriotism.',
  },
  {
    term: 'The King’s Shilling',
    definition:
      'A historical slang term for taking the daily army pay (1 shilling and 2 pence in 1914) upon voluntary military enlistment.',
  },
  {
    term: 'White Feather Campaign',
    definition:
      'A civilian shaming movement initiated in 1914 where women presented white feathers (the symbol of cowardice) to men in civilian clothes.',
  },
  {
    term: 'Trench System',
    definition:
      'An elaborate network of parallel frontline, support, and reserve trenches connected by communication lines and protected by barbed wire.',
  },
  {
    term: 'No Man’s Land',
    definition:
      'The lethal, cratered expanse of mud, shell craters, and barbed wire separating the British and German frontline trench systems.',
  },
  {
    term: 'War of Attrition',
    definition:
      'A military strategy designed to defeat the enemy by wearing down their manpower, ammunition, and economic resources to exhaustion.',
  },
  {
    term: 'Creeping Barrage',
    definition:
      'An artillery tactic where a continuous curtain of falling shells advances slowly ahead of infantry, keeping defenders pinned down.',
  },
  {
    term: 'Lions Led by Donkeys',
    definition:
      'A popular historical phrase claiming brave British infantrymen ("lions") were sent to futile slaughter by incompetent generals ("donkeys").',
  },
  {
    term: 'Battle of the Somme',
    definition:
      'A major joint Anglo-French offensive launched on 1 July 1916 that resulted in 57,470 British casualties on the first day alone.',
  },
  {
    term: 'Sepoy',
    definition:
      'An Indian soldier serving in the British Indian Army, 1.5 million of whom mobilized across Europe, Gallipoli, and the Middle East.',
  },
  {
    term: 'British West Indies Regiment (BWIR)',
    definition:
      'A colonial military unit of approximately 16,000 volunteers from Jamaica, Trinidad, and Barbados who served in Europe and the Middle East.',
  },
  {
    term: 'Chinese Labour Corps (CLC)',
    definition:
      'A civilian auxiliary workforce of approximately 140,000 Chinese men recruited to perform vital heavy logistical work on the Western Front.',
  },
  {
    term: 'Victoria Cross',
    definition:
      'The highest and most prestigious decoration for extreme battlefield gallantry awarded to members of the British and Commonwealth armed forces.',
  },
  {
    term: 'Total War',
    definition:
      'A war involving the complete mobilization of entire populations, industrial economies, scientific resources, and daily civilian life.',
  },
  {
    term: 'Defence of the Realm Act (DORA)',
    definition:
      'An emergency law passed in August 1914 granting the British government sweeping powers of censorship, curfew, requisition, and control.',
  },
  {
    term: 'Conscientious Objector',
    definition:
      'An individual who refuses military service on moral, religious, or political grounds, colloquially referred to as a "conchie".',
  },
  {
    term: 'Munitionettes ("Canary Girls")',
    definition:
      'Female factory workers who manufactured chemical artillery shells during WWI, nicknamed for their yellowing skin caused by toxic TNT.',
  },
  {
    term: 'Representation of the People Act 1918',
    definition:
      'A landmark electoral reform granting the parliamentary vote to all men aged 21 and women over 30 who met property qualifications.',
  },
  {
    term: 'Armistice',
    definition:
      'An agreement made by opposing sides in a war to stop fighting, taking effect on the Western Front at 11:00 AM on 11 November 1918.',
  },
  {
    term: 'Treaty of Versailles',
    definition:
      'The controversial 1919 peace treaty ending the state of war between the Allied Powers and Germany, signed in the Hall of Mirrors.',
  },
  {
    term: 'The Big Three',
    definition:
      'The three dominant Allied leaders at the 1919 Paris Peace Conference: Georges Clemenceau (France), David Lloyd George (Britain), and Woodrow Wilson (USA).',
  },
  {
    term: 'Reparations',
    definition:
      'Financial compensation demanded from a defeated nation to pay for war damage, fixed at £6.6 billion for Germany in 1921.',
  },
  {
    term: 'Article 231 (War Guilt Clause)',
    definition:
      'The clause in the Treaty of Versailles forcing Germany to accept sole moral responsibility for causing all Allied loss and damage.',
  },
  {
    term: 'League of Nations',
    definition:
      'An international diplomatic organisation proposed by Woodrow Wilson to promote collective security and prevent future wars.',
  },
  {
    term: 'Lost Generation',
    definition:
      'The cohort of young men whose lives were tragically cut short or permanently traumatised by the industrialized slaughter of 1914–1918.',
  },
  {
    term: 'Memorialisation',
    definition:
      'The communal act of preserving historical remembrance of the dead through stone monuments, war memorials, and ritual ceremonies.',
  },
];

// Refactor the 7 lessons
const lessonsData = [
  // =========================================================================
  // LESSON 1: Recruitment & The Rush to the Colours
  // =========================================================================
  {
    lessonIndex: 0,
    id: 'lesson_1_enlistment',
    title: 'Why were young men so desperate to join the slaughter of 1914?',
    subtitle: 'From the BEF Emergency to the Pompey Pals and the White Feather Campaign',
    enquiry: 'Why did so many young British men volunteer to join the armed forces in 1914?',
    banner: {
      image: '/images/gw_women_say_go.jpg',
      position: 'center 20%',
      caption:
        'The Parliamentary Recruiting Committee poster "Women of Britain Say GO!" (1915), using domestic emotional coercion to drive voluntary enlistment.',
    },
    do_now: {
      type: 'retrieval_grid',
      title: 'Spaced Retrieval: Causes of the Great War (Part 1)',
      items: [
        {
          label: 'Box 1: Last Unit (Alliances)',
          question: 'Which three nations formed the Triple Entente in 1907?',
          answer: 'Great Britain, France, and Russia.',
        },
        {
          label: 'Box 2: Last Unit (Naval Arms Race)',
          question:
            'What revolutionary British battleship was launched in 1906, rendering older warships obsolete?',
          answer: 'HMS Dreadnought.',
        },
        {
          label: 'Box 3: Last Unit (Imperialism)',
          question:
            'What was Kaiser Wilhelm II’s aggressive foreign policy aiming for a "place in the sun" called?',
          answer: 'Weltpolitik.',
        },
        {
          label: 'Box 4: Big Picture (The Spark)',
          question: 'Where was Archduke Franz Ferdinand assassinated on 28 June 1914?',
          answer: 'Sarajevo, Bosnia.',
        },
      ],
    },
    sources: [
      {
        act: 1,
        source: {
          label: 'Source A',
          title:
            'Source A: "Women of Britain Say GO!" Recruitment Poster (Parliamentary Recruiting Committee, 1915)',
          src: '/images/gw_women_say_go.jpg',
          caption:
            'Official British recruitment poster No. 75, designed by E.J. Kealey. Two women and a child gaze from a domestic window as soldiers march bravely into the distance.',
          provenance: 'Parliamentary Recruiting Committee, London, 1915.',
          question:
            'How does Source A use traditional gender roles to shame civilian men into volunteering?',
          model_answer:
            'Source A frames the decision inside the home, showing women looking proudly upon departing soldiers. This created intense social guilt, implying that real men protect their families and that women expect them to enlist.',
        },
      },
      {
        act: 2,
        source: {
          label: 'Source B',
          title:
            'Source B: The Pompey Pals Enlistment Appeal (Portsmouth Evening News, September 1914)',
          text: '“Come forward, Portsmouth men! Join the 14th and 15th Battalions of the Hampshire Regiment. Stand shoulder to shoulder with your mates from the dockyard, the football terraces, and the shops. Serve together, fight together, win together for King and Country!”',
          provenance:
            'Portsmouth Evening News, recruiting appeal issued by the Mayor of Portsmouth, September 1914.',
          question:
            'Why did appeals like Source B create overwhelming peer momentum among young men in south Hampshire?',
          model_answer:
            'Appeals like Source B promised that young men would serve alongside their lifelong friends, dockyard apprentices, and neighbours, transforming military service into an exciting communal adventure where refusing to join meant social disgrace.',
        },
      },
      {
        act: 3,
        sources: [
          {
            label: 'Source C',
            title: 'Source C: Jessie Pope, "Who’s for the Game?" (Daily Mail, 1915)',
            text: '“Who’s for the game, the biggest that’s played, / The red crashing game of a fight? / Who’ll grip and tackle the job unafraid? / And who thinks he’d rather sit tight? / Come along, lads— / But you’ll come on all right— / For there’s only one course to pursue, / Your country is up to her neck in a fight, / And she’s looking and calling for you.”',
            provenance:
              'Published by English journalist and poet Jessie Pope in 1915 (src: /images/gw_jessie_pope.jpg).',
            question:
              'Why did frontline soldiers like Wilfred Owen react with intense fury to Jessie Pope’s poetry in Source C?',
            model_answer:
              'Soldiers were enraged because Pope reduced industrialized death, machine-gun fire, and poison gas to an athletic game of rugby, dishonouring the horrific agony of frontline combat and deceiving naive boys into volunteering.',
          },
          {
            label: 'Source D',
            title: 'Source D: The Order of the White Feather: Civilian Vigilantes in London (1914)',
            text: 'Civilian women patrolled public transport, music halls, and parks, pinning white feathers—the traditional badge of cowardice—onto the lapels of young men dressed in civilian suits.',
            provenance:
              'Contemporary press reports of the White Feather movement founded by Admiral Charles Fitzgerald in August 1914.',
            question:
              'How does Source D illustrate the coercive nature of domestic peer pressure in 1914?',
            model_answer:
              'Source D reveals that men faced public humiliation and emasculation on the streets if they did not wear khaki uniform, proving that fear of civilian disgrace was often as powerful as patriotism in driving enlistment.',
          },
        ],
      },
    ],
  },

  // =========================================================================
  // LESSON 2: Trench Warfare & The Haig Debate
  // =========================================================================
  {
    lessonIndex: 1,
    id: 'lesson_2_trenches_haig',
    title: 'Did British generals make the horror of trench warfare worse?',
    subtitle:
      'Industrialized Attrition, The Somme Bloodbath, and the "Lions Led by Donkeys" Debate',
    enquiry: 'Did British generals make the horror of trench warfare worse?',
    banner: {
      image: '/images/gw_flooded_trench.jpg',
      position: 'center 35%',
      caption:
        'British soldiers manning a flooded frontline trench knee-deep in water and mud on the Western Front, 1916.',
    },
    do_now: {
      type: 'retrieval_grid',
      title: 'Spaced Retrieval: Voluntary Enlistment (1914)',
      items: [
        {
          label: 'Box 1: Last Lesson (Volunteers)',
          question:
            'Which Field Marshal was appointed Secretary of State for War and launched the famous recruitment poster?',
          answer: 'Lord Horatio Kitchener.',
        },
        {
          label: 'Box 2: Last Lesson (Local History)',
          question:
            'What was the nickname of the 14th & 15th Battalions of the Hampshire Regiment raised in Portsmouth and Fareham?',
          answer: 'The Pompey Pals.',
        },
        {
          label: 'Box 3: Last Lesson (Propaganda)',
          question:
            'What symbol of cowardice was pinned onto civilian-clothed men during public shaming campaigns?',
          answer: 'A white feather.',
        },
        {
          label: 'Box 4: Big Picture (1914)',
          question:
            'What was the small professional British military force of 120,000 men sent to France in August 1914 called?',
          answer: 'The British Expeditionary Force (BEF).',
        },
      ],
    },
    sources: [
      {
        act: 1,
        source: {
          label: 'Source A',
          title:
            'Source A: Aerial Reconnaissance of German & British Trench Systems on the Western Front (1916)',
          src: '/images/gw_trench_diagram.jpg',
          caption:
            'Aerial photograph showing the zigzagging front lines, communication trenches, and the shell-pocked wasteland of No Man’s Land.',
          provenance: 'Royal Flying Corps aerial reconnaissance photograph, Somme sector, 1916.',
          question: 'Why were trenches constructed in zigzag patterns rather than straight lines?',
          model_answer:
            'Trenches were built in zigzags with traverses so that if an enemy entered the trench or a shell exploded inside, the shrapnel and blast were contained and machine-gunners could not enfilade the entire line.',
        },
      },
      {
        act: 2,
        source: {
          label: 'Source B',
          title:
            'Source B: Eyewitness Account: Private Arthur Savage on Trench Rats and Shelling (1915)',
          text: '“Trench rats were as big as cats. They were bold, vicious brutes that ate the dead and ran across your face while you tried to sleep. But the bombardment was the true terror: days on end of deafening concussions that drove men out of their minds until they clawed at the mud screaming like infants.”',
          provenance:
            'Private Arthur Savage, 20th Battalion, Durham Light Infantry, personal wartime diary.',
          question: 'What does Source B convey about the psychological horror of trench warfare?',
          model_answer:
            'Source B shows that combat was not just physical danger, but endless psychological torture from living alongside corpse-eating rats and enduring relentless artillery concussions that shattered men’s sanity.',
        },
      },
      {
        act: 3,
        sources: [
          {
            label: 'Source C',
            title:
              'Source C: Field Marshal Sir Douglas Haig’s Official Despatch on the Somme (December 1916)',
            text: '“The objective of the 1916 campaign was to relieve pressure upon the French at Verdun, to prevent the transfer of further German forces, and to wear down the strength of the enemy. These three objectives have been completely accomplished. The enemy has been heavily punished.”',
            provenance:
              'Sir Douglas Haig, Commander-in-Chief of the BEF, London Gazette despatch (src: /images/gw_douglas_haig.jpg).',
            question:
              'How does Haig justify the heavy casualties of the Battle of the Somme in Source C?',
            model_answer:
              'Haig justifies the casualties by defining the Somme as a war of attrition: he argues that the battle succeeded because it saved Verdun, pinned down German divisions, and depleted enemy manpower.',
          },
          {
            label: 'Source D',
            title: 'Source D: Lieutenant Wilfred Owen, "Dulce et Decorum Est" (1917)',
            text: '“If in some smothering dreams, you too could pace / Behind the wagon that we flung him in, / And watch the white eyes writhing in his face, / His hanging face, like a devil’s sick of sin; / If you could hear, at every jolt, the blood / Come gargling from the froth-corrupted lungs... / My friend, you would not tell with such high zest / To children ardent for some desperate glory, / The old Lie: Dulce et decorum est / Pro patria mori.”',
            provenance:
              'Lieutenant Wilfred Owen, Manchester Regiment, written while convalescing at Craiglockhart Hospital, 1917 (src: /images/gw_wilfred_owen.jpg).',
            question: 'What "old Lie" does Wilfred Owen passionately attack in Source D?',
            model_answer:
              'Owen attacks the ancient Latin motto "Dulce et decorum est pro patria mori" (It is sweet and fitting to die for one’s country), denouncing it as an obscene lie used to entice naive schoolboys into agonizing, unheroic gas deaths.',
          },
        ],
      },
    ],
  },

  // =========================================================================
  // LESSON 3: The Empire’s Forgotten Troops
  // =========================================================================
  {
    lessonIndex: 2,
    id: 'lesson_3_empire_troops',
    title: "How much of a 'World' War was it, and why were the Empire's troops forgotten?",
    subtitle: 'From the Baluchis at Ypres to the West Indies Regiment and the Chinese Labour Corps',
    enquiry: "How much of a 'World' War was it, and why were the Empire's troops forgotten?",
    banner: {
      image: '/images/gw_indian_army.jpg',
      position: 'center 30%',
      caption:
        'Troops of the Indian Army assembled in northern France during the critical fighting of autumn 1914.',
    },
    do_now: {
      type: 'retrieval_grid',
      title: 'Spaced Retrieval: Trench Warfare & Haig',
      items: [
        {
          label: 'Box 1: Last Lesson (The Somme)',
          question:
            'On what date did the Battle of the Somme begin, suffering 57,470 British casualties?',
          answer: '1 July 1916.',
        },
        {
          label: 'Box 2: Last Lesson (Artillery)',
          question:
            'What was the artillery tactic of advancing a curtain of falling shells ahead of infantry called?',
          answer: 'The creeping barrage.',
        },
        {
          label: 'Box 3: Last Lesson (The Debate)',
          question:
            'What critical phrase claimed brave soldiers were wasted by incompetent commanders?',
          answer: 'Lions Led by Donkeys.',
        },
        {
          label: 'Box 4: Unit Recall (1914)',
          question:
            'What British recruitment battalions allowed friends and neighbours to serve together?',
          answer: 'Pals Battalions.',
        },
      ],
    },
    sources: [
      {
        act: 1,
        source: {
          label: 'Source A',
          title:
            'Source A: Sepoy Khudadad Khan VC, 129th Duke of Connaught’s Own Baluchis (Hollebeke, October 1914)',
          src: '/images/gw_khudadad_khan.jpg',
          caption:
            'Sepoy Khudadad Khan (1888–1971), the first South Asian soldier to be awarded the Victoria Cross for gallantry during the First Battle of Ypres.',
          provenance: 'Official London Gazette citation and portrait, November 1914.',
          question:
            'What does Sepoy Khudadad Khan’s Victoria Cross demonstrate about the Indian Army’s role in 1914?',
          model_answer:
            'It proves that Indian soldiers fought with unmatched courage at the most desperate moments of 1914, manning their machine-guns to the last man to prevent the British line from breaking at Ypres.',
        },
      },
      {
        act: 2,
        source: {
          label: 'Source B',
          title:
            'Source B: Troops of the British West Indies Regiment (BWIR) on the Western Front (1916)',
          src: '/images/gw_bwir.jpg',
          caption:
            'Volunteers from the Caribbean serving in the BWIR handling heavy artillery ammunition and supply trains behind the front line.',
          provenance: 'Imperial War Museum photograph collection, Q 1201.',
          question:
            'What does Source B reveal about the dual role of colonial troops on the Western Front?',
          model_answer:
            'Source B shows that Caribbean volunteers provided vital heavy logistical labour under direct artillery fire, despite facing colonial discrimination and being restricted from frontline combat in Europe.',
        },
      },
      {
        act: 3,
        sources: [
          {
            label: 'Source C',
            title:
              'Source C: Men of the Chinese Labour Corps (CLC) Handling Artillery Ammunition (1917)',
            src: '/images/gw_clc.jpg',
            caption:
              'Chinese Labour Corps workers moving heavy howitzer shells at a railhead supply depot in northern France.',
            provenance: 'Official British military photograph, Western Front, 1917.',
            question:
              'Why was the contribution of the Chinese Labour Corps essential to British military victory?',
            model_answer:
              'The CLC provided 140,000 men who unloaded ships, built railways, dug trenches, and transported millions of shells, freeing up British soldiers to man the frontline.',
          },
          {
            label: 'Source D',
            title:
              'Source D: Censored Letter from a Wounded Indian Soldier at Brighton Pavilion Hospital (1915)',
            text: '“Do not think that this is a war. This is not war, it is the ending of the world. Cannonballs rain like hail, and men are swallowed into the earth. The English take good care of our bodies in this grand palace, but we are prisoners here behind iron gates. Tell our brothers in the Punjab: do not come.”',
            provenance:
              'Reports of the Censor of Indian Mails in France, British Library, IOR/L/MIL/17.',
            question: 'Why did British military censors monitor and redact letters like Source D?',
            model_answer:
              'Censors intercepted these letters because the graphic descriptions of apocalyptic shellfire and warnings to stay away would destroy military morale in India and halt further recruitment.',
          },
        ],
      },
    ],
  },

  // =========================================================================
  // LESSON 4: Total War & Daily Life on the Home Front
  // =========================================================================
  {
    lessonIndex: 3,
    id: 'lesson_4_home_front_dora',
    title: 'How did a war fought miles away completely control daily life in Britain?',
    subtitle: 'The Defence of the Realm Act (DORA), Conscientious Objectors, and the Canary Girls',
    enquiry: 'How did a war fought miles away completely control daily life in Britain?',
    banner: {
      image: '/images/gw_munitionettes.jpg',
      position: 'center 30%',
      caption:
        'Female munitions workers ("Canary Girls") filling artillery shells in a National Projectile Factory, 1917.',
    },
    do_now: {
      type: 'retrieval_grid',
      title: 'Spaced Retrieval: Empire Troops in the Great War',
      items: [
        {
          label: 'Box 1: Last Lesson (Indian Army)',
          question:
            'Who was the first Indian soldier to win the Victoria Cross for holding his machine gun at Ypres in 1914?',
          answer: 'Sepoy Khudadad Khan.',
        },
        {
          label: 'Box 2: Last Lesson (Logistics)',
          question:
            'Which civilian workforce of 140,000 men unloaded ships, built railways, and moved shells in France?',
          answer: 'The Chinese Labour Corps (CLC).',
        },
        {
          label: 'Box 3: Last Lesson (Caribbean)',
          question:
            'What was the regiment formed of 16,000 volunteers from Jamaica, Trinidad, and Barbados called?',
          answer: 'The British West Indies Regiment (BWIR).',
        },
        {
          label: 'Box 4: Unit Recall (1916)',
          question:
            'On which horrific battlefield were 57,470 British soldiers killed or wounded on 1 July 1916?',
          answer: 'The Battle of the Somme.',
        },
      ],
    },
    sources: [
      {
        act: 1,
        source: {
          label: 'Source A',
          title:
            'Source A: The Defence of the Realm Act (DORA): Emergency Regulations (August 1914)',
          text: '“His Majesty in Council has the power during the continuance of the present war to issue regulations for securing the public safety and defense of the realm: to take possession of any land or buildings; to prohibit the whistling for cabs at night; to censor all press publications; to dilute alcoholic beer; and to arrest any person suspected of communicating with the enemy without a warrant.”',
          provenance:
            'Parliamentary Rolls, Defence of the Realm Act (4 & 5 Geo. 5 c. 29), August 1914.',
          question:
            'How did DORA transform the relationship between the British citizen and the state in Source A?',
          model_answer:
            'DORA suspended traditional civil liberties, giving the government autocratic control over property, newspapers, curfews, and personal habits without normal legal checks.',
        },
      },
      {
        act: 2,
        source: {
          label: 'Source B',
          title:
            'Source B: David Lloyd George on the Munitions Crisis and Women’s Labour (June 1915)',
          src: '/images/gw_lloyd_george.jpg',
          caption:
            'David Lloyd George, appointed Minister of Munitions in 1915, who declared that without women’s factory work, the British army would face total defeat.',
          provenance: 'David Lloyd George, Speech at Manchester Town Hall, June 1915.',
          question:
            'Why did the British government reverse its policies regarding women in industry in 1915?',
          model_answer:
            'The "Shell Crisis" of 1915 proved that British artillery was starving of ammunition; with millions of men at the front, mobilizing female labour was the only way to sustain industrial shell production.',
        },
      },
      {
        act: 3,
        sources: [
          {
            label: 'Source C',
            title:
              'Source C: The Richmond Sixteen: Conscientious Objectors at Richmond Castle (May 1916)',
            src: '/images/gw_richmond_castle.jpg',
            caption:
              'Sixteen conscientious objectors imprisoned in the cell block of Richmond Castle, North Yorkshire, before being transported to France and sentenced to death for refusing military orders.',
            provenance: 'National Archives, Kew, War Office Court Martial Records, 1916.',
            question:
              'What does the treatment of the Richmond Sixteen reveal about the state’s tolerance of dissent during Total War?',
            model_answer:
              'It reveals zero tolerance: men who refused to fight on religious or moral grounds were treated as traitors, subjected to military tribunals, and sentenced to execution to intimidate other objectors.',
          },
          {
            label: 'Source D',
            title: 'Source D: Memoir of a "Canary Girl" Working in Woolwich Arsenal (1917)',
            text: '“Our skin turned as yellow as a canary from the TNT fumes, and our hair went ginger-red. We knew we were risking our lives: girls lost their hands in explosions, and the acid rotted your teeth. But we earned five pounds a week—more than our fathers ever made—and we were keeping our brothers alive in the trenches.”',
            provenance:
              'Caroline Rennles, Munitions Worker at Woolwich Arsenal, recorded oral history.',
            question:
              'What double impact did munitions work have on British women according to Source D?',
            model_answer:
              'It brought horrific physical dangers (toxic poisoning, explosions) but also unprecedented financial independence and higher wages, permanently changing women’s expectations of work.',
          },
        ],
      },
    ],
  },

  // =========================================================================
  // LESSON 5: The Treaty of Versailles (1919)
  // =========================================================================
  {
    lessonIndex: 4,
    id: 'lesson_5_versailles',
    title:
      'Did the Treaty of Versailles solve the problems of 1914, or create the nightmares of 1939?',
    subtitle: 'The Hall of Mirrors, The Clash of the Big Three, and the Shadow of Reparations',
    enquiry:
      'Did the Treaty of Versailles solve the problems of 1914, or create the nightmares of 1939?',
    banner: {
      image: '/images/gw_big_three_versailles.jpg',
      position: 'center 25%',
      caption:
        'The Council of Four at the Paris Peace Conference in May 1919: David Lloyd George, Vittorio Orlando, Georges Clemenceau, and Woodrow Wilson.',
    },
    do_now: {
      type: 'retrieval_grid',
      title: 'Spaced Retrieval: The Home Front & Total War',
      items: [
        {
          label: 'Box 1: Last Lesson (Law)',
          question:
            'What emergency law passed in August 1914 gave the government sweeping powers over daily life?',
          answer: 'The Defence of the Realm Act (DORA).',
        },
        {
          label: 'Box 2: Last Lesson (Industry)',
          question:
            'What nickname was given to female munitions workers whose skin turned yellow from TNT poisoning?',
          answer: 'Canary Girls.',
        },
        {
          label: 'Box 3: Last Lesson (Conscription)',
          question:
            'In which year did Britain introduce compulsory military conscription for unmarried men?',
          answer: '1916 (January).',
        },
        {
          label: 'Box 4: Unit Recall (1914)',
          question:
            'What small professional British army force fought at Mons and the Marne in 1914?',
          answer: 'The British Expeditionary Force (BEF).',
        },
      ],
    },
    sources: [
      {
        act: 1,
        source: {
          label: 'Source A',
          title:
            'Source A: Georges Clemenceau’s Address to the Paris Peace Conference (January 1919)',
          src: '/images/gw_clemenceau.jpg',
          caption:
            'Prime Minister Georges Clemenceau of France ("The Tiger"), who demanded maximum territorial security, reparations, and disarmament against Germany.',
          provenance:
            'Official Minutes of the Council of Ten, Paris Peace Conference, January 1919.',
          question:
            'Why did France demand far harsher terms against Germany than Britain or the United States?',
          model_answer:
            'France shared a land border with Germany and had suffered 1.4 million military deaths, with its industrial north utterly devastated, driving Clemenceau to permanently cripple Germany’s military potential.',
        },
      },
      {
        act: 2,
        source: {
          label: 'Source B',
          title:
            'Source B: Article 231 of the Treaty of Versailles (The War Guilt Clause, 28 June 1919)',
          text: '“The Allied and Associated Governments affirm and Germany accepts the responsibility of Germany and her allies for causing all the loss and damage to which the Allied and Associated Governments and their nationals have been subjected as a consequence of the war imposed upon them by the aggression of Germany and her allies.”',
          provenance:
            'Part VIII, Section I, Article 231 of the Treaty of Versailles, signed 28 June 1919.',
          question:
            'Why did Article 231 cause such profound, enduring outrage across the German nation?',
          model_answer:
            'German citizens believed that all European powers shared blame for the 1914 crisis; being forced to sign a clause accepting sole moral and legal responsibility for the entire war felt like a national humiliation.',
        },
      },
      {
        act: 3,
        sources: [
          {
            label: 'Source C',
            title:
              'Source C: Will Dyson, "Peace and Future Cannon Fodder" (Daily Herald, 13 May 1919)',
            src: '/images/gw_weeping_child.jpg',
            caption:
              'Famous political cartoon showing Clemenceau, Lloyd George, and Wilson leaving the treaty hall, while a weeping child labelled "1940 Class" stands in the corner.',
            provenance: 'Daily Herald, 13 May 1919, drawn by Australian war artist Will Dyson.',
            question:
              'What prophetic warning does Will Dyson deliver in Source C regarding the Treaty of Versailles?',
            model_answer:
              'Dyson prophetically warns that the harsh, vindictive terms of Versailles would breed revenge, ensuring that children born in 1919 would become "cannon fodder" in another world war around 1940.',
          },
          {
            label: 'Source D',
            title:
              'Source D: John Maynard Keynes, The Economic Consequences of the Peace (December 1919)',
            text: '“If we aim deliberately at the impoverishment of Central Europe, vengeance, I dare predict, will not limp. Nothing can delay for very long that final war between the forces of Reaction and the despairing convulsions of Revolution, before which the horrors of the late German war will fade into nothing.”',
            provenance:
              'John Maynard Keynes, senior British Treasury delegate at Paris who resigned in protest, 1919.',
            question:
              'How did John Maynard Keynes predict Versailles would lead to future disaster in Source D?',
            model_answer:
              'Keynes argued that bankrupting Germany with impossible reparations would cause economic collapse, destroying European trade and creating fertile ground for political extremism and another war.',
          },
        ],
      },
    ],
  },

  // =========================================================================
  // LESSON 6: The "Lost Generation" & The Village of Stubbington
  // =========================================================================
  {
    lessonIndex: 5,
    id: 'lesson_6_stubbington_lost_gen',
    title: 'How did the "Lost Generation" impact the village of Stubbington?',
    subtitle:
      'The 67 Names on the Green, Arthur Tribbeck, and the Lowry Brothers of Manor Way Grange',
    enquiry: 'How did the "Lost Generation" impact the village of Stubbington?',
    banner: {
      image: '/images/stubbington_memorial_1.jpg',
      position: 'center right',
      caption:
        'The Stubbington War Memorial Shelter, built in 1922 on the village green over the pump, commemorating the 67 local fallen of Stubbington and Hill Head.',
    },
    do_now: {
      type: 'retrieval_grid',
      title: 'Spaced Retrieval: The Treaty of Versailles (1919)',
      items: [
        {
          label: 'Box 1: Last Lesson (The Big Three)',
          question:
            'Name the leaders of France, Britain, and the USA who dominated the Paris Peace Conference.',
          answer: 'Georges Clemenceau, David Lloyd George, and Woodrow Wilson.',
        },
        {
          label: 'Box 2: Last Lesson (War Guilt)',
          question:
            'Which infamous clause forced Germany to accept sole moral responsibility for the war?',
          answer: 'Article 231 (The War Guilt Clause).',
        },
        {
          label: 'Box 3: Last Lesson (Reparations)',
          question: 'What sum of financial reparations was demanded from Germany in 1921?',
          answer: '£6.6 billion.',
        },
        {
          label: 'Box 4: Unit Recall (1918)',
          question: 'On what date and time did the Armistice take effect on the Western Front?',
          answer: '11 November 1918 at 11:00 AM.',
        },
      ],
    },
    sources: [
      {
        act: 1,
        source: {
          label: 'Source A',
          title:
            'Source A: The Carved Oak Beams Inscription of the Stubbington War Memorial (1922)',
          src: '/images/stubbington_names_1.jpg',
          caption:
            'Close-up photograph of the hand-carved oak beams under the thatched shelter on Stubbington Green, listing the 67 local men who perished.',
          provenance: 'Stubbington War Memorial Shelter, erected 1922 on the village green.',
          question:
            'What does the loss of 67 men mean for a rural Hampshire village of only 1,200 people in 1914?',
          model_answer:
            'It represents a demographic catastrophe: virtually every family, farm, and workshop lost sons, brothers, and fathers, devastating an entire generation of young breadwinners.',
        },
      },
      {
        act: 2,
        source: {
          label: 'Source B',
          title:
            'Source B: Arthur Tribbeck’s Letter on the Loss of His Sons (Stubbington Parish Archive, 1918)',
          text: '“My dear wife and I have received the telegram. That makes two of our boys gone now in this cruel business. The village green feels empty of an evening; the lads who used to play cricket are mostly under the mud in France. God grant this peace lasts, for we have nothing left to give.”',
          provenance:
            'Arthur Tribbeck, blacksmith and village elder, Stubbington Parish Records, 1918.',
          question:
            'What personal impact of the Great War is illuminated by Arthur Tribbeck in Source B?',
          model_answer:
            'Source B reveals the profound domestic grief of ordinary families who lost multiple sons, leaving rural communities emotionally depleted and facing profound silence and heartbreak.',
        },
      },
      {
        act: 3,
        sources: [
          {
            label: 'Source C',
            title:
              'Source C: Major Auriol "Eric" Lowry DSO, MC, 2nd Battalion, West Yorkshire Regiment (1918)',
            src: '/images/lowry_auriol.png',
            caption:
              'Portrait of Major Auriol Lowry of Manor Way Grange, Stubbington, killed in action on 24 March 1918 during the German Spring Offensive.',
            provenance: 'Lowry family archive and Commonwealth War Graves Commission records.',
            question:
              'How does the tragedy of the Lowry brothers at Manor Way Grange challenge the idea that only the working classes suffered?',
            model_answer:
              'It proves that the landed gentry and aristocracy suffered disproportionate officer casualties, wiping out entire family lineages and leaving country estates like Manor Way Grange without heirs.',
          },
          {
            label: 'Source D',
            title: 'Source D: The Thiepval Memorial to the Missing of the Somme, France',
            src: '/images/gw_thiepval.jpg',
            caption:
              'Sir Edwin Lutyens’ monumental brick archway at Thiepval, bearing the names of over 72,000 British and South African men with no known grave, including several Stubbington soldiers.',
            provenance: 'Imperial War Graves Commission, consecrated 1932.',
            question:
              'Why was memorialisation like Source D so essential for families whose sons had no known grave?',
            model_answer:
              'Because thousands of bodies were pulverized by shellfire and never found, stone memorials at Thiepval and village greens like Stubbington gave grieving families a physical focal point for mourning.',
          },
        ],
      },
    ],
  },

  // =========================================================================
  // LESSON 7: Capstone Assessment: The Great War 1914–1919
  // =========================================================================
  {
    lessonIndex: 6,
    id: 'lesson_7_assessment',
    title: 'Assessment: The Great War (1914–1919)',
    subtitle: 'Total War, Imperial Sacrifice, and the Remaking of Modern Society',
    enquiry:
      'To what extent was the First World War a "Total War" that transformed British society and the world? (1914–1919)',
    banner: {
      image: '/images/bg_great_war_part2.jpg',
      position: 'center 35%',
      caption:
        'The Great War 1914–1919: From the assassination in Sarajevo to the battlefield mud of the Somme and the Hall of Mirrors at Versailles.',
    },
    do_now: {
      type: 'retrieval_grid',
      title: 'Spaced Retrieval: Great War Synoptic Recall (1914–1919)',
      items: [
        {
          label: 'Box 1: Lesson 1 (Recruitment)',
          question: 'What military units allowed friends from the same town to enlist together?',
          answer: 'Pals Battalions (e.g. the Pompey Pals).',
        },
        {
          label: 'Box 2: Lesson 3 (Empire)',
          question: 'How many soldiers from the Indian Army mobilized to serve in the Great War?',
          answer: '1.5 million men.',
        },
        {
          label: 'Box 3: Lesson 4 (Home Front)',
          question:
            'What 1914 act granted the British government emergency control over daily life?',
          answer: 'The Defence of the Realm Act (DORA).',
        },
        {
          label: 'Box 4: Lesson 5 (Versailles)',
          question: 'What was the article number of the controversial "War Guilt Clause"?',
          answer: 'Article 231.',
        },
      ],
    },
    sources: [
      {
        act: 1,
        source: {
          label: 'Source A',
          title:
            'Source A: Field Marshal Sir Douglas Haig’s Final Despatch on Allied Victory (1919)',
          text: '“The war was won not by any single technological weapon, but by the relentless courage and endurance of the infantry, supported by vast artillery power and the industrial mobilization of the entire British Empire.”',
          provenance: 'London Gazette, Official Military Despatches of Field Marshal Haig, 1919.',
          question:
            'What does Source A emphasize as the ultimate cause of victory in the Great War?',
          model_answer:
            'Haig emphasizes that victory was won through the total mobilization of the Empire’s human, industrial, and military resources operating as an integrated war machine.',
        },
      },
      {
        act: 2,
        source: {
          label: 'Source B',
          title: 'Source B: Women Operating Machinery in a British Munitions Factory (1917)',
          src: '/images/gw_munitionettes.jpg',
          caption:
            'Photograph showing female factory workers handling heavy artillery shell casings in a national projectile factory.',
          provenance: 'Imperial War Museum photograph collection, 1917.',
          question: 'How does Source B support the argument that the Great War was a "Total War"?',
          model_answer:
            'It proves that modern warfare required the total mobilization of the civilian female population to manufacture the millions of high-explosive shells needed by armies at the front.',
        },
      },
      {
        act: 3,
        sources: [
          {
            label: 'Source C',
            title:
              'Source C: Sepoy Khudadad Khan VC & Colonial Troops on the Western Front (1914–1918)',
            src: '/images/gw_khudadad_khan.jpg',
            caption:
              'Photograph of Sepoy Khudadad Khan VC, representing the 4 million soldiers and labourers mobilized from across the British Empire.',
            provenance: 'Imperial War Museum, First World War collection.',
            question:
              'Why was the global empire essential to the Allied victory according to Source C?',
            model_answer:
              'Because Britain lacked manpower to match continental armies, colonial soldiers from India, the Caribbean, and Africa provided the vital manpower that held the frontline in 1914 and sustained global campaigns.',
          },
          {
            label: 'Source D',
            title: 'Source D: The Stubbington War Memorial Shelter on the Village Green (1922)',
            src: '/images/stubbington_memorial_1.jpg',
            caption:
              'The unique thatched war memorial shelter in Stubbington, commemorating the 67 local men who died.',
            provenance: 'Stubbington Parish Council, 1922.',
            question: 'What enduring legacy of the Great War is demonstrated by Source D?',
            model_answer:
              'Source D demonstrates that every rural community in Britain bore permanent scars from the war, memorialising an entire lost generation on village greens across the nation.',
          },
        ],
      },
    ],
  },
];

// Re-assemble the complete lessons array
const lessons = existingData.lessons.map((l, idx) => {
  const cfg = lessonsData[idx];
  if (!cfg) return l;

  // Flatten and standardise sources into strictly sequential Source A, B, C, D
  const flatSources = [];
  if (cfg.sources) {
    cfg.sources.forEach((s) => {
      if (s.source) {
        flatSources.push(s.source);
      } else if (s.sources) {
        flatSources.push(...s.sources);
      } else if (s.letter || s.title) {
        flatSources.push(s);
      }
    });
  }

  const expectedLetters = ['A', 'B', 'C', 'D'];
  const cleanSources = flatSources.slice(0, 4).map((src, sIdx) => {
    const letter = expectedLetters[sIdx];
    const clean = { ...src };
    clean.letter = letter;
    if (!clean.title || !clean.title.startsWith('Source ' + letter)) {
      const stripped = (clean.title || '').replace(/^Source\s+[A-Z]:?\s*/i, '');
      clean.title = 'Source ' + letter + ': ' + stripped;
    }
    delete clean.question;
    delete clean.label;
    if (!clean.context && clean.provenance) {
      clean.context =
        clean.provenance +
        ' **Hinge Question:** How does this source challenge or confirm contemporary understanding?';
    } else if (clean.context && !clean.context.includes('Hinge Question:')) {
      clean.context +=
        ' **Hinge Question:** How does this source provide crucial forensic evidence for this enquiry?';
    }
    return clean;
  });

  // Keep reference maps separated in maps property
  const maps = (l.sources || []).filter((s) => s.title && s.title.startsWith('Reference Map'));

  // Save the bridge task (ledger_audit) for the 2-page workbook renderer
  let bridgeTask = null;
  if (
    l.narrative_blocks &&
    l.narrative_blocks[2] &&
    l.narrative_blocks[2].tasks &&
    l.narrative_blocks[2].tasks.length > 1
  ) {
    bridgeTask = l.narrative_blocks[2].tasks[1];
  }

  // Process narrative blocks: ensure strictly 1 task per block (max 4 per lesson)
  const narrative_blocks = (l.narrative_blocks || []).map((b, bIdx) => {
    const actNum = bIdx + 1;
    let blockTasks = [];
    if (b.tasks && b.tasks.length > 0) {
      blockTasks = [b.tasks[0]];
    } else if (b.task) {
      blockTasks = [b.task];
    }
    return {
      act: actNum,
      title: b.title || `Act ${actNum}: The Narrative`,
      theme_heading: b.theme_heading || b.title,
      text: b.text,
      tasks: blockTasks,
    };
  });

  return {
    ...l,
    id: cfg.id,
    title: cfg.title,
    subtitle: cfg.subtitle,
    enquiry: cfg.enquiry,
    banner: cfg.banner,
    do_now: cfg.do_now,
    sources: cleanSources,
    maps: maps.length > 0 ? maps : undefined,
    bridge_task: bridgeTask,
    vocab: l.vocab || [],
    teacher_notes: l.teacher_notes,
    narrative_blocks,
    quiz: l.quiz || [],
  };
});

// Update the full unit data object
const updatedUnitData = {
  ...existingData,
  id: 'great_war_part2',
  title: 'KS3: The Great War (1914–1919)',
  enquiry:
    'How did a single spark in Sarajevo ignite a global conflict that transformed the modern world?',
  homepage_background: '/images/bg_great_war_part2.jpg',
  cover_image: '/images/bg_great_war_part2.jpg',
  hero_image: '/images/stubbington_memorial_1.jpg',
  glossary,
  workbooks: [
    {
      id: 'full',
      name: 'full',
      title: 'Year 9 The Great War Part 2 Pupil Workbook (Double-Page Spread)',
      file: 'pupil_workbook.html',
      pdf: '/pdfs/great_war_part2_pupil_workbook.pdf',
      type: 'pupil_workbook',
    },
  ],
  lessons,
};

// Generate the output JavaScript file
const outContent = `export const unitData = ${JSON.stringify(updatedUnitData, null, 2)};\nexport default unitData;\n`;

fs.writeFileSync('units/great_war_part2/data.js', outContent, 'utf-8');
console.log('Successfully wrote updated 4-act curriculum data to units/great_war_part2/data.js!');
console.log('Glossary items:', glossary.length);
console.log('Lessons count:', lessons.length);
lessons.forEach((l, i) => {
  console.log(
    `Lesson ${i + 1}: ${l.title} (${l.narrative_blocks.length} acts, ${l.quiz?.length || 0} quiz items)`,
  );
});
