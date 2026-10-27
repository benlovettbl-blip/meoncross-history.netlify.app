const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const dataFilePath = path.join(ROOT_DIR, 'units', 'great_war_part2', 'data.js');

// Load original data
const rawDataContent = fs.readFileSync(dataFilePath, 'utf8');
const cleanJsonMatch = rawDataContent.match(/const\s+unitData\s*=\s*(\{[\s\S]*\});\s*export\s*\{\s*unitData\s*\};/);
if (!cleanJsonMatch) {
  throw new Error('Could not parse units/great_war_part2/data.js JSON structure');
}
const unitData = JSON.parse(cleanJsonMatch[1]);

const gw2ExamPractice = [
  // Lesson 1: 1914 & The Rush to the Colours (12m Explain Why)
  {
    title: 'Key Stage 3 Disciplinary Writing: 1914 & The Rush to the Colours',
    tariff: '12 marks (Explain Why Causal Analysis)',
    questions: [
      {
        tariff: '12 marks',
        type: 'explain_why_12m',
        question: 'Explain why young British men volunteered in such massive numbers in the autumn of 1914. [12 marks]',
        stimulus: [
          'The moral outrage surrounding the German invasion of Belgium (1914)',
          'The creation of civic Pals Battalions (e.g. civic and local town battalions)'
        ],
        prompt: 'Explain three distinct causal reasons: moral outrage and patriotism sparked by the invasion of Belgium and "Rape of Belgium" propaganda; the social appeal and peer encouragement of civic "Pals Battalions"; and widespread economic motives, romanticism, and the belief that the war would be over by Christmas.',
        model: 'One primary reason young British men volunteered in unprecedented numbers was profound moral outrage and patriotic duty following the German invasion of neutral Belgium. In August 1914, Imperial German armies violated the 1839 Treaty of London, executing Belgian civilians and burning the ancient university library at Louvain. British government propaganda and newspaper reports heavily emphasized the "Rape of Belgium", portraying the war as a righteous moral crusade against brutal militarism. Coupled with Lord Kitchener’s iconic recruiting poster pointing directly at the reader ("Your Country Needs You"), young men felt an overwhelming moral and social imperative to enlist to defend liberty and protect their homes.<br><br>Furthermore, a second decisive factor was the brilliant recruitment innovation of civic "Pals Battalions". General Henry Rawlinson recognized that men would enlist far more willingly if they were guaranteed to serve alongside their friends, workmates, and neighbours. Towns and civic corporations across Britain raised dedicated units—such as the Accrington Pals, Leeds Pals, and local municipal battalions—drawn from single factories, sports clubs, and railway companies. This fostered immense local pride and peer encouragement, transforming recruitment into a celebratory civic ritual where entire streets or offices marched to enlist together.<br><br>Finally, volunteering was spurred by a combination of socio-economic factors and romantic naivety about modern industrial warfare. For millions of working-class men enduring low wages, precarious employment, or grim industrial labour, the army offered steady pay, three square meals a day, travel, and smart uniforms. Furthermore, having not experienced a major European war since Waterloo in 1815, popular culture romanticised combat as a glorious, sporting adventure. Encouraged by politicians and the press, the widespread belief that "it will all be over by Christmas" convinced hundreds of thousands of young men that they had to volunteer immediately or risk missing out on the great adventure of their lives.',
        scaffolding: {
          acronym: '3-Paragraph Causal Analysis (PEEL)',
          acronym_title: '12-Mark Explain Why Standard',
          steps: [
            { letter: 'REASON 1', name: 'Moral Outrage & Invasion of Belgium', prompt: 'Explain the Treaty of London, burning of Louvain, Kitchener poster, and righteous crusade.', starter: 'One primary reason young British men volunteered was...' },
            { letter: 'REASON 2', name: 'Civic Pals Battalions & Peer Pressure', prompt: 'Explain Henry Rawlinson, serving with friends, local civic pride, and sports/factory units.', starter: 'Furthermore, a second decisive factor was...' },
            { letter: 'REASON 3', name: 'Economic Appeal & "Over by Christmas" Myth', prompt: 'Explain steady pay, escaping poverty, romantic notions of war, and fear of missing out.', starter: 'Finally, enlistment was fueled by economic incentives and...' }
          ],
          sentence_starters: [
            'One primary reason was that...',
            'For example, the invasion of Belgium...',
            'This led directly to mass volunteering because...',
            'Another key factor was the creation of...',
            'Consequently, this meant that...',
            'Ultimately, this resulted in...'
          ],
          connectives_bank: ['Lord Kitchener', 'Your Country Needs You', 'Treaty of London (1839)', 'Rape of Belgium', 'Louvain', 'Pals Battalions', 'civic recruitment', 'over by Christmas']
        }
      }
    ]
  },

  // Lesson 2: Trench Warfare & The Somme (Feature Drill [4m] & Explain Why [8m])
  {
    title: 'Key Stage 3 Disciplinary Writing: Trench Warfare & The Somme Controversy',
    tariff: '12 marks (Feature Drill [4m] & Causal Analysis [8m])',
    questions: [
      {
        tariff: '4 marks',
        type: 'feature_drills_4m',
        question: 'Describe two features of the trench defensive systems on the Western Front. [4 marks]',
        prompt: 'Identify two distinct features of trench architecture and defensive organization. For each feature, provide a clear identification followed by supporting factual knowledge.',
        model: 'Feature 1: One key feature was the three-tier defensive layout of interconnected parallel lines.<br>Detail: Armies dug a front-line fire trench for sentries and snipers, a support trench 70–100 yards behind containing reserve troops and first-aid posts, and a reserve trench further back, all linked by zigzagging communication trenches to evacuate wounded and prevent enfilading gunfire.<br><br>Feature 2: A second key feature was the extensive use of protective engineering and obstacles in No Man’s Land.<br>Detail: Trenches were fortified with sandbags, wooden duckboards to prevent trench foot, raised fire-steps for shooting, and barbed-wire entanglements up to thirty metres deep strung out in front of the parapet to break up infantry charges.',
        scaffolding: {
          acronym: 'F1 + D1 • F2 + D2',
          acronym_title: '4-Mark Feature Drill Formula',
          steps: [
            { letter: 'F1', name: 'Feature 1 (Three-Tier System)', prompt: 'Identify front-line, support, and reserve trenches with communication trenches.', starter: 'One key feature was that...' },
            { letter: 'D1', name: 'Detail 1', prompt: 'Add precise details (70–100 yards apart, zigzag layout, first-aid posts).', starter: 'Specifically, this involved...' },
            { letter: 'F2', name: 'Feature 2 (Protective Fortifications)', prompt: 'Identify sandbags, duckboards, fire-steps, and barbed wire.', starter: 'A second key feature was...' },
            { letter: 'D2', name: 'Detail 2', prompt: 'Add precise details (duckboards against trench foot, 30m barbed wire belts in No Man’s Land).', starter: 'In particular, this meant that...' }
          ],
          sentence_starters: [
            'One key feature was that...',
            'Specifically, this involved...',
            'A second key feature was...',
            'In particular, this meant that...'
          ],
          connectives_bank: ['three-tier trench system', 'communication trenches', 'fire-step', 'duckboards', 'trench foot', 'barbed-wire entanglements', 'No Man’s Land', 'parapet']
        }
      },
      {
        tariff: '8 marks',
        type: 'explain_why_8m',
        question: 'Explain why the First Day of the Somme (1 July 1916) resulted in catastrophic British casualties. [8 marks]',
        prompt: 'Focus on the failure of the seven-day preliminary artillery bombardment to destroy German deep underground bunkers and cut barbed wire, and General Haig’s rigid tactics ordering infantry to advance slowly in line across No Man’s Land into Maxim machine-gun fire.',
        model: 'One primary reason for the catastrophic casualties on 1 July 1916 was the complete failure of the preliminary artillery bombardment. General Sir Douglas Haig’s plan relied upon a massive seven-day bombardment of 1.5 million shells to annihilate German trenches and cut their barbed wire. However, roughly one-third of the shells were duds that failed to explode, while light field shrapnel merely tangled the barbed wire rather than slicing it. Crucially, the German defenders sheltered safely thirty feet underground in reinforced concrete dugouts (Stollen). When the bombardment lifted at 7:30 am, German machine gunners rushed upstairs to their parapets with their Maxim guns completely intact.<br><br>Furthermore, the catastrophe was compounded by rigid tactical orders and tactical surprise being lost. Believing that no German could survive the bombardment, British commanders ordered inexperienced Pals Battalions to climb out of their trenches and advance in slow, steady waves laden with 66 pounds of equipment. Walking slowly across 200–500 yards of open No Man’s Land towards uncut wire, the soldiers were funneled into lethal kill zones and mown down in minutes. Consequently, by the end of the first day, the British Army suffered 57,470 casualties—including 19,240 dead—making 1 July 1916 the deadliest single day in British military history.',
        scaffolding: {
          acronym: 'P-E-E-L Dual Causal Analysis',
          acronym_title: '8-Mark Causal Explanation Framework',
          steps: [
            { letter: 'CAUSE 1', name: 'Artillery Failure & Deep Concrete Dugouts', prompt: 'Explain 1.5m shells, 30% duds, uncut barbed wire, and Germans surviving in Stollen.', starter: 'One primary reason for catastrophic casualties was...' },
            { letter: 'CAUSE 2', name: 'Rigid Tactical Orders (Walking into Machine Guns)', prompt: 'Explain slow walking waves, 66lb kit, uncut wire bottlenecks, and Maxim machine guns.', starter: 'Furthermore, the catastrophe was compounded by...' },
            { letter: 'LINK', name: 'Synthesize the Toll', prompt: 'Cite 57,470 casualties and 19,240 dead on 1 July 1916.', starter: 'Consequently, by the end of the first day, this resulted in...' }
          ],
          sentence_starters: [
            'One primary reason was that...',
            'In particular, this meant that...',
            'Furthermore, this was compounded by...',
            'A secondary tactical factor was...',
            'Consequently, this resulted in...'
          ],
          connectives_bank: ['First Day of the Somme (1 July 1916)', 'Douglas Haig', 'preliminary bombardment', 'concrete dugouts (Stollen)', 'uncut barbed wire', 'Maxim machine guns', '57,470 casualties', 'Pals Battalions']
        }
      }
    ]
  },

  // Lesson 3: Global Empire & The Forgotten Fronts (Contrasting Interpretations [8m])
  {
    title: 'Key Stage 3 Disciplinary Writing: Global Empire & The Forgotten Fronts',
    tariff: '8 marks (Contrasting Historical Interpretations)',
    questions: [
      {
        tariff: '4 marks',
        type: 'interpretations_diff_4m',
        question: 'Task A: Explain how Interpretations 1 and 2 differ about the experiences of colonial troops. [4 marks]',
        stimulus: [
          'Interpretation 1: Lord Curzon, British War Cabinet Minister, Speech at Royal Albert Hall (1917) — praises colonial troops for their devoted loyalty to the King-Emperor, claiming they volunteered with enthusiasm and were treated with full equality and gratitude by Britain.',
          'Interpretation 2: David Olusoga, Modern British Historian, The World’s War (2014) — argues that colonial and Commonwealth troops faced systemic racial segregation, unequal pay, deliberate erasure from victory parades, and were exploited as expendable labour in deadly front-line environments.'
        ],
        prompt: 'Explain the difference between Lord Curzon’s wartime imperial propaganda emphasizing cheerful loyalty and British gratitude, and David Olusoga’s modern historical analysis emphasizing racial segregation, unequal pay, and historical erasure.',
        model: 'Interpretations 1 and 2 differ fundamentally on the treatment and motivations of empire troops during the First World War. Interpretation 1, advanced by Lord Curzon in 1917, presents a romanticised imperial view, asserting that millions of Indian, African, and Commonwealth soldiers volunteered out of devoted loyalty to the King-Emperor, experiencing shared brotherhood and gratitude alongside white British soldiers. In sharp contrast, Interpretation 2, by modern historian David Olusoga, emphasizes systemic racial discrimination, coercion, and post-war marginalisation. Olusoga argues that colonial troops endured institutional racism, unequal wages, were frequently relegated to hazardous labour battalions without weapons, and were deliberately erased from official victory celebrations in 1919. Thus, Curzon depicts loyal partnership, while Olusoga reveals racial exploitation.',
        scaffolding: {
          acronym: 'Point • Interp 1 • Interp 2 • Contrast',
          acronym_title: 'Edexcel Paper 3 Q3(b) Interpretation Difference Formula',
          steps: [
            { letter: 'POINT', name: 'State the Core Difference', prompt: 'State clearly that they differ on whether colonial troops experienced loyal equality or racial exploitation.', starter: 'Interpretations 1 and 2 differ fundamentally on...' },
            { letter: 'INTERP 1', name: 'Exemplify Curzon (Loyalty & Gratitude)', prompt: 'Quote or summarize Curzon on devoted loyalty, imperial brotherhood, and mutual affection.', starter: 'Interpretation 1 argues that...' },
            { letter: 'INTERP 2', name: 'Exemplify Olusoga (Segregation & Erasure)', prompt: 'Quote or summarize Olusoga on institutional racism, unequal pay, and victory parade erasure.', starter: 'In contrast, Interpretation 2 suggests that...' },
            { letter: 'CONTRAST', name: 'Synthesize the Divergence', prompt: 'Explicitly synthesize the difference between imperial propaganda and critical post-colonial history.', starter: 'This is a fundamental difference because...' }
          ],
          sentence_starters: [
            'Interpretations 1 and 2 differ on...',
            'Interpretation 1 argues that...',
            'In contrast, Interpretation 2 suggests that...',
            'This is a difference because...'
          ],
          connectives_bank: ['Lord Curzon (1917)', 'David Olusoga (2014)', 'imperial brotherhood', 'Indian Army (1.3m)', 'Chinese Labour Corps', 'African carriers', 'racial segregation', 'erasure from history']
        }
      },
      {
        tariff: '4 marks',
        type: 'interpretations_reason_4m',
        question: 'Task B: Suggest one reason why Interpretations 1 and 2 differ about the role of empire soldiers. [4 marks]',
        prompt: 'Explain why Curzon and Olusoga arrive at contrasting conclusions. Consider Curzon’s wartime political motive to maintain imperial morale and recruitment versus Olusoga’s modern academic mission to uncover marginalized archival records.',
        model: 'One primary reason why Interpretations 1 and 2 differ is that the authors write from radically different historical contexts, motives, and source bases. Lord Curzon was a senior minister in David Lloyd George’s War Cabinet speaking publicly in 1917 at the height of the war. His direct political motive was to promote wartime imperial unity, reassure the British public of global support, and maintain voluntary recruitment across India and the Dominions, leading him to produce idealized patriotic propaganda. In contrast, David Olusoga is a twenty-first-century documentary historian writing with access to declassified colonial military records, private soldiers’ letters, and oral histories. Olusoga’s motive is to interrogate the unvarnished reality of empire and recover the forgotten experiences of 4 million non-white participants, explaining why he reaches a critical and revisionist conclusion.',
        scaffolding: {
          acronym: 'Context Contrast • Motive • Source Base',
          acronym_title: 'Edexcel Paper 3 Q3(c) Why Interpretations Differ Formula',
          steps: [
            { letter: 'REASON', name: 'State Core Reason (Context & Motive)', prompt: 'Identify that Curzon writes wartime propaganda, while Olusoga conducts modern archival history.', starter: 'One reason why Interpretations 1 and 2 differ is because they write from...' },
            { letter: 'AUTHOR 1', name: 'Curzon’s Wartime Motive', prompt: 'Explain Curzon was a War Cabinet minister boosting morale and empire recruitment in 1917.', starter: 'Specifically, Lord Curzon was speaking in 1917 as a British politician whose motive was...' },
            { letter: 'AUTHOR 2', name: 'Olusoga’s Archival Mission', prompt: 'Explain Olusoga uses declassified files and personal letters to uncover racial realities.', starter: 'In contrast, David Olusoga writes as a modern academic historian who...' }
          ],
          sentence_starters: [
            'One reason why Interpretations 1 and 2 differ is because they have different motives...',
            'Specifically, Interpretation 1 was delivered in 1917 to justify...',
            'In contrast, Interpretation 2 was written in 2014 to uncover...',
            'As a result, the authors reach different conclusions because...'
          ],
          connectives_bank: ['War Cabinet (1917)', 'wartime propaganda', 'imperial morale', 'David Olusoga', 'The World’s War', 'declassified archives', 'soldiers’ letters']
        }
      }
    ]
  },

  // Lesson 4: The Home Front & Women’s Total War (Narrative Account [8m] & Explain Importance [8m])
  {
    title: 'Key Stage 3 Disciplinary Writing: The Home Front & Women’s Total War',
    tariff: '16 marks (Narrative Account [8m] & Explain Importance [8m])',
    questions: [
      {
        tariff: '8 marks',
        type: 'narrative_account_8m',
        question: 'Task A: Write a narrative account analysing the key events leading from the Shell Crisis of 1915 to the introduction of compulsory conscription in 1916. [8 marks]',
        stimulus: [
          'The Daily Mail exposure of the 1915 Shell Crisis and the creation of the Ministry of Munitions',
          'The failure of the Derby Scheme and the Military Service Act (January 1916)'
        ],
        prompt: 'Write a chronological account examining the escalation of state intervention on the British home front: the May 1915 Shell Crisis exposing acute ammunition shortages, Lloyd George’s takeover as Minister of Munitions mobilizing female labour, and the collapse of voluntary recruitment leading directly to conscription in January 1916.',
        model: 'Between May 1915 and January 1916, the British government was forced to abandon voluntary laissez-faire principles and introduce total state control over industry and manpower.<br><br>The crisis began in May 1915 following the failed offensive at the Battle of Neuve Chapelle. Sir John French, commander of the British Expeditionary Force, leaked to The Times and The Daily Mail that British attacks had collapsed because artillery guns were rationed to only two shells per day due to catastrophic shortages. The resulting "Shell Crisis" provoked public outrage, brought down Herbert Asquith’s Liberal government, and forced the creation of a cross-party coalition. Crucially, David Lloyd George was appointed to head the newly established Ministry of Munitions, passing the Munitions of War Act 1915 to requisition private factories, ban strikes, and direct female industrial labour into state factories.<br><br>However, as industrial production surged, the military faced a parallel manpower catastrophe due to horrific casualties at Gallipoli and Loos. To salvage the voluntary system, the government launched the "Derby Scheme" in October 1915, asking men aged 18–41 to voluntarily promise to enlist when summoned. The scheme failed catastrophically: over 318,000 unmarried men of military age refused to attest, proving that voluntary enlistment could no longer replenish the army’s losses.<br><br>Consequently, in January 1916, Parliament passed the Military Service Act, introducing compulsory military conscription for all unmarried men aged 18–41 (extended to married men in May 1916). This marked an unprecedented historical milestone, permanently establishing state compulsion over British citizens’ bodies to sustain the war of attrition.',
        scaffolding: {
          acronym: '3-Stage Chronological Narrative Framework',
          acronym_title: 'Narrative Account Formula (Beginning • Escalation • Climax)',
          steps: [
            { letter: 'STAGE 1', name: 'May 1915 Shell Crisis & Ministry of Munitions', prompt: 'Explain Neuve Chapelle shortages, newspaper leaks, coalition government, and Lloyd George.', starter: 'Initially, the home front crisis began in May 1915 when...' },
            { letter: 'STAGE 2', name: 'Autumn 1915 Derby Scheme Failure', prompt: 'Explain heavy casualties, voluntary attestation scheme, and 318,000 men refusing to sign.', starter: 'Following this, the military manpower crisis deepened in late 1915 when...' },
            { letter: 'STAGE 3', name: 'January 1916 Military Service Act (Conscription)', prompt: 'Explain Parliament passing conscription, ending voluntary enlistment, and total state control.', starter: 'The decisive turning point occurred in January 1916 when...' }
          ],
          sentence_starters: [
            'Initially, the crisis erupted in May 1915 when...',
            'Following this, state intervention escalated when...',
            'A critical manpower dilemma arose in late 1915 when...',
            'Consequently, this culminated in January 1916 when...'
          ],
          connectives_bank: ['Shell Crisis (1915)', 'Daily Mail / The Times', 'David Lloyd George', 'Ministry of Munitions', 'Derby Scheme', 'Military Service Act (1916)', 'conscription', 'total war']
        }
      },
      {
        tariff: '8 marks',
        type: 'explain_importance_8m',
        question: 'Task B: Explain the importance of female munitions workers to the British war effort in the period 1915–1918. [8 marks]',
        prompt: 'Explain two distinct reasons why female munitions workers ("munitionettes") were vital: first, how their labour resolved the industrial shell crisis, producing millions of explosives that enabled victory on the Western Front; second, how their economic indispensability dismantled patriarchal Victorian gender roles, contributing to the 1918 Representation of the People Act.',
        model: 'One reason female munitions workers were vital was that their industrial labour saved the British war effort from imminent military collapse. Following the 1915 Shell Crisis and the dilution agreements negotiated with trade unions, over 700,000 women entered heavy armament factories like the National Cordite Factory at Gretna and the Royal Arsenal in Woolwich. Known as "munitionettes", they endured toxic 12-hour shifts handling hazardous chemical compounds like TNT, which turned their skin yellow and poisoned their lungs (earning them the nickname "Canary Girls"). Their high-precision manufacturing produced over 80% of Britain’s shells, cordite, and machine guns, providing the overwhelming artillery firepower that sustained Haig’s armies through 1917 and 1918.<br><br>Furthermore, women’s industrial mobilization was critical because it permanently revolutionized British society and accelerated the political campaign for women’s suffrage. By taking over jobs previously restricted to men—operating cranes, welding steel, and assembling delicate fuses—female workers thoroughly dismantled Victorian prejudices that claimed women were physically and intellectually incapable of heavy industrial work. Their indispensable contribution made it politically impossible to deny women democratic representation. Consequently, in February 1918, Parliament passed the Representation of the People Act, granting the parliamentary vote to approximately 8.5 million women aged 30 and over, marking the foundational breakthrough for British gender equality.',
        scaffolding: {
          acronym: 'Importance Point 1 • Importance Point 2',
          acronym_title: 'Edexcel Paper 2 Period Study 8-Mark Importance Standard',
          steps: [
            { letter: 'IMPACT 1', name: 'Industrial Output & Military Firepower', prompt: 'Explain 700,000 women, Canary Girls, TNT poisoning, Woolwich Arsenal, and 80% of shells.', starter: 'One reason female munitions workers were vital was that...' },
            { letter: 'IMPACT 2', name: 'Shattering Gender Roles & 1918 Suffrage', prompt: 'Explain dismantling Victorian stereotypes, proving equality, and 1918 Representation of the People Act.', starter: 'Furthermore, their wartime contribution was critical because it transformed...' }
          ],
          sentence_starters: [
            'One reason why female munitions workers were important was...',
            'In particular, they sustained the military by...',
            'Furthermore, their mobilization was critical because...',
            'Consequently, this transformed British society because...'
          ],
          connectives_bank: ['munitionettes', 'Canary Girls', 'TNT poisoning', 'Woolwich Arsenal', 'dilution of labour', '80% of munitions', 'Representation of the People Act (1918)', 'women’s suffrage']
        }
      }
    ]
  },

  // Lesson 5: 1918–1919 & The Treaty of Versailles (12m Evaluative Essay)
  {
    title: 'Key Stage 3 Disciplinary Writing: 1918–1919 & The Treaty of Versailles',
    tariff: '12 marks (Evaluative Statement Essay)',
    questions: [
      {
        tariff: '12 marks',
        type: 'evaluative_essay_12m',
        question: '‘The Treaty of Versailles was so harsh that it made another European war inevitable.’ How far do you agree with this statement? [12 marks]',
        stimulus: [
          'Article 231 (War Guilt) and £6.6 billion reparations',
          'The establishment of the League of Nations and the principle of self-determination'
        ],
        prompt: 'Construct a balanced evaluative argument: on the one hand, evaluate the punitive terms—Article 231, reparations, military demilitarization, and loss of territory (Polish Corridor)—which fueled German grievance and the "stab-in-the-back" myth; on the other hand, evaluate how the treaty preserved German economic unity, created the League of Nations, and how it was the Great Depression of 1929 and the failure of enforcement, rather than the treaty itself, that made war inevitable. Reach a weighed conclusion.',
        model: 'To a moderate extent, the Treaty of Versailles contributed significantly to future European conflict by imposing humiliating terms on Germany without rendering it permanently incapable of future aggression; however, another world war was not inherently inevitable until the global economic collapse of 1929 and the Allied failure to enforce the treaty enabled Adolf Hitler’s rearmament.<br><br>On the one hand, the Treaty of Versailles inflicted profound psychological and economic grievances that poisoned democratic politics within the Weimar Republic. Under Article 231 (the "War Guilt Clause"), Germany was forced to accept sole moral responsibility for causing the war. This justified the astronomical reparations bill of £6.6 billion, which fueled severe inflation and bitter popular resentment. Militarily, the German army was slashed to 100,000 volunteers, conscription was banned, and the Rhineland was demilitarized. Territorially, Germany lost 13% of its European land, including Alsace-Lorraine and the Polish Corridor, which severed East Prussia from the rest of the nation. Because the German delegation was refused negotiation and forced to sign under threat of renewed invasion, the treaty was universally reviled as a diktat (dictated peace), directly fueling the right-wing Dolchstoßlegende ("stab-in-the-back" myth) that right-wing extremists ruthlessly weaponized against the democratic republic.<br><br>On the other hand, it can be strongly argued that the treaty was far more moderate than contemporary critics claimed, and that war was not inevitable. Versailles left Germany as the single largest economic and industrial power in Central Europe, with its core industrial heartland in the Ruhr intact. Furthermore, under President Woodrow Wilson’s influence, the treaty established the League of Nations to resolve future disputes peacefully, while creating democratic sovereign nations across Eastern Europe based on national self-determination. During the "Golden Twenties" (1924–1929), the Dawes Plan restructured reparations, and the 1925 Locarno Treaties reconciled Germany with France and Britain, proving that peaceful integration was achievable. It was the catastrophic Great Depression of 1929, creating six million unemployed Germans and causing the collapse of the Weimar political centre, that propelled the Nazi Party to power, rather than the treaty itself.<br><br>In conclusion, while the Treaty of Versailles created dangerous resentment and alienated Germany without permanently weakening its industrial potential, it did not make war inevitable in 1919. A second European war became unavoidable only when the economic catastrophe of 1929 empowered Adolf Hitler, whose explicit racial ideology sought continental Lebensraum, and when Britain and France failed to enforce the treaty’s terms through collective security.',
        scaffolding: {
          acronym: 'PEEL Evaluative Essay Framework',
          acronym_title: '12-Mark Evaluative Statement Essay Standard',
          steps: [
            { letter: 'THESIS', name: 'State Position', prompt: 'State clearly that while Versailles created dangerous resentment, war was not inevitable until 1929.', starter: 'To a moderate extent, the Treaty of Versailles created profound grievances, but war was not inevitable because...' },
            { letter: 'THEME 1', name: 'Punitive Diktat & Grievance (Article 231)', prompt: 'Explain Article 231, £6.6bn reparations, 100,000 army limit, Polish Corridor, and Dolchstoßlegende.', starter: 'On the one hand, the Treaty of Versailles generated enduring hostility because...' },
            { letter: 'THEME 2', name: 'Moderation, League of Nations & 1929 Depression', prompt: 'Evaluate Ruhr intact, League of Nations, Locarno Treaties, and the true catalyst: 1929 Great Depression.', starter: 'On the other hand, it can be argued that the treaty did not make war inevitable because...' },
            { letter: 'JUDGMENT', name: 'Weighed Verdict', prompt: 'Synthesize why economic collapse and Hitler’s ideology, combined with appeasement, caused war.', starter: 'In conclusion, while Versailles provided the political ammunition for extremists, another war became inevitable only when...' }
          ],
          sentence_starters: [
            'To a moderate extent, it can be argued that...',
            'On the one hand, the punitive clauses generated fierce resentment, such as...',
            'In particular, Article 231 and reparations...',
            'On the other hand, historians argue that war was not inevitable because...',
            'In conclusion, the most decisive factor leading to war was... because...'
          ],
          connectives_bank: ['Treaty of Versailles (1919)', 'Article 231 (War Guilt)', '£6.6 billion reparations', 'diktat', 'Dolchstoßlegende (stab-in-the-back)', 'Polish Corridor', 'League of Nations', 'Locarno Treaties (1925)', 'Great Depression (1929)']
        }
      }
    ]
  }
];

// Inject into unitData.lessons
unitData.lessons.forEach((lesson, idx) => {
  if (gw2ExamPractice[idx]) {
    lesson.exam_practice = gw2ExamPractice[idx];
  }
});

// Serialize back to units/great_war_part2/data.js
const serialized = `const unitData = ${JSON.stringify(unitData, null, 2)};\n\nexport { unitData };\nexport default unitData;\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = unitData;\n}\n`;
fs.writeFileSync(dataFilePath, serialized, 'utf8');
console.log('✅ Successfully synchronized all 5 lessons of Great War Part 2 with workbook examination practice!');
