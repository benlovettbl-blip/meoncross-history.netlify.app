const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'units', 'great_war_part2', 'data.js');

const spinesByLessonId = {
  lesson_1_enlistment: {
    title: '1914 & The Rush to the Colours: Chronology Spine',
    subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
    stages: [
      {
        step: 1,
        date: 'Aug 1914',
        title: 'Kitchener’s Urgent Call for 500,000',
        actor: 'Lord Kitchener & War Office',
        tag: '💂 RECRUITMENT',
        trigger:
          'With the British Expeditionary Force numbering just 120,000 men and no peacetime conscription, newly appointed War Secretary Lord Kitchener realised Britain needed a massive volunteer army for a long, brutal war.',
        connective:
          'Forced the government into an unprecedented national recruitment drive, plastering town halls and streets with iconic appeals.',
        question: 'What forced Britain to launch Kitchener’s urgent call for 500,000 volunteers?',
      },
      {
        step: 2,
        date: 'Aug–Sept 1914',
        title: 'Invasion of Belgium & Treaty of London',
        actor: 'German Army & Belgian Civilians',
        tag: '⚖️ MORAL OUTRAGE',
        trigger:
          'Germany invaded neutral Belgium to bypass French border fortresses, violating the 1839 Treaty of London and unleashing widespread atrocities and destruction.',
        connective:
          'Ignited fierce moral outrage across Britain, transforming enlistment into a righteous patriotic crusade to protect international law and small nations.',
        question: 'How did the invasion of Belgium spark genuine moral outrage and civic duty?',
      },
      {
        step: 3,
        date: 'Sept 1914',
        title: 'Pals Battalions & Civic Camaraderie',
        actor: 'Lord Derby & Civic Volunteers',
        tag: '🤝 COMRADESHIP',
        trigger:
          'Lord Derby established the ‘Pals Battalions’ policy, allowing friends, neighbours, and workmates from the same factories, rugby teams, and towns to enlist and serve together.',
        connective:
          'Provoked an avalanche of enlistment among close-knit working-class communities, binding local civic identity directly to military duty.',
        question:
          'Why did workplace camaraderie and local pride drive the formation of Pals Battalions?',
      },
      {
        step: 4,
        date: 'Autumn 1914',
        title: 'Poverty, Adventure & The King’s Shilling',
        actor: 'Working-Class British Youths',
        tag: '💰 ECONOMIC LURE',
        trigger:
          'Impoverished Edwardian youths faced grueling factory hours and precarious wages, making regular army food, clean uniforms, and steady pay deeply appealing.',
        connective:
          'Combined economic necessity with the naive belief that the war would be an exciting adventure ‘over by Christmas’, speeding recruitment.',
        question:
          'In what ways did poverty, adventure, and the King’s Shilling lure young recruits?',
      },
      {
        step: 5,
        date: 'Late 1914',
        title: 'Social Coercion & The White Feather',
        actor: 'State Propaganda & Civic Shaming',
        tag: '📢 SOCIAL PRESSURE',
        trigger:
          'Visual propaganda posters combined with the civilian White Feather movement to publicly brand able-bodied men out of uniform as cowards and slackers.',
        connective:
          'Created overwhelming social stigma that made staying at home psychologically unbearable, driving the final waves of voluntary recruits into uniform.',
        question: 'How did state propaganda and social coercion make refusal to enlist unbearable?',
      },
    ],
  },
  lesson_2_trenches_haig: {
    title: 'Trench Warfare & The Haig Controversy: Chronology Spine',
    subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
    stages: [
      {
        step: 1,
        date: 'Autumn 1914',
        title: 'Race to the Sea & Industrial Stalemate',
        actor: 'Allied & German Armies',
        tag: '⚙️ INDUSTRIAL WAR',
        trigger:
          'After mobile maneuvers collapsed in the ‘Race to the Sea’, deadly Maxim and Vickers machine guns made open infantry movement suicidal, forcing armies underground.',
        connective:
          'Created an unbroken 400-mile Western Front from the Swiss border to the North Sea that neither side could outflank.',
        question: 'What forced armies underground into a 400-mile line of industrial stalemate?',
      },
      {
        step: 2,
        date: '1915',
        title: 'The Three-Tier Trench Defensive System',
        actor: 'Combat Engineers & Frontline Troops',
        tag: '🛡️ DEFENSIVE NETWORK',
        trigger:
          'Armies developed a sophisticated three-tier defence of front-line, support, and reserve trenches, dug in zig-zags with deep concrete dugouts and thick barbed wire belts.',
        connective:
          'Made defensive positions virtually impregnable to direct infantry assault, tipping the technological balance entirely toward the defender.',
        question: 'How was the three-tier trench system constructed, traversed, and defended?',
      },
      {
        step: 3,
        date: '1915–1916',
        title: 'Trench Conditions & Psychological Trauma',
        actor: 'Infantry Soldiers & Medical Corps',
        tag: '⚠️ PHYSICAL TRAUMA',
        trigger:
          'Waterlogged clay trenches, freezing winters, and rotting corpses caused debilitating trench foot, while relentless industrial artillery bombardments induced severe shell shock.',
        connective:
          'Physically and mentally degraded frontline soldiers, making survival an ongoing battle against the elements as much as against the enemy.',
        question: 'What lethal physical and psychological trauma did infantry endure in the mud?',
      },
      {
        step: 4,
        date: '1 July 1916',
        title: 'The Catastrophe of the Somme',
        actor: 'General Haig & British Fourth Army',
        tag: '💥 ARTILLERY DISASTER',
        trigger:
          'A 7-day British bombardment of 1.5 million shells failed to cut German barbed wire or destroy deep concrete bunkers, leaving advancing infantry exposed to machine guns.',
        connective:
          'Inflicted 57,470 British casualties on the first day alone—the bloodiest single day in British military history—and shattered the civilian volunteer Pals Battalions.',
        question:
          'Why did the First Day of the Somme become the bloodiest disaster in British history?',
      },
      {
        step: 5,
        date: '1916–1918',
        title: 'Haig’s Learning Curve & Combined Arms',
        actor: 'General Sir Douglas Haig',
        tag: '⚖️ HISTORICAL DEBATE',
        trigger:
          'Haig faced harsh criticism as a stubborn ‘butcher’, yet he systematically integrated tanks, creeping artillery barrages, sound-ranging, and air reconnaissance.',
        connective:
          'Gradually transformed the British Army into the sophisticated combined-arms fighting force that broke the German Hindenburg Line in 1918.',
        question: 'Was Sir Douglas Haig a callous "butcher" or a commander learning total war?',
      },
    ],
  },
  lesson_3_empire_troops: {
    title: 'Global Empire & The Forgotten Fronts: Chronology Spine',
    subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
    stages: [
      {
        step: 1,
        date: '1914',
        title: 'Mobilising the Imperial Lifeline',
        actor: 'The British Empire & Colonies',
        tag: '🌍 GLOBAL MOBILISATION',
        trigger:
          'Britain could not sustain an industrial continental war alone and immediately mobilised over 4 million colonial troops, merchant sailors, and labourers from across five continents.',
        connective:
          'Secured the vital manpower, food shipments, and raw materials needed to keep Allied armies in the field and prevent imperial collapse.',
        question: 'Why was Britain completely dependent on mobilising 4 million imperial subjects?',
      },
      {
        step: 2,
        date: '1914–1915',
        title: 'Indian Troops Save the Line at Ypres',
        actor: 'Indian Expeditionary Force',
        tag: '🎖️ FIRST YPRES CRISIS',
        trigger:
          'Arriving in freezing autumn mud wearing thin tropical khaki, 1.5 million Indian Army troops plugged critical gaps at First Ypres, where Sepoy Khudadad Khan won the first Asian VC.',
        connective:
          'Prevented a catastrophic German breakthrough to the Channel ports, proving the exceptional bravery and operational importance of non-white forces.',
        question:
          'How crucially did 1.5 million Indian soldiers save the crumbling Allied line at Ypres?',
      },
      {
        step: 3,
        date: 'April 1915',
        title: 'Gallipoli & The Birth of ANZAC Legend',
        actor: 'ANZAC & Ottoman Turkish Forces',
        tag: '🌊 SEABORNE INVASION',
        trigger:
          'Australian and New Zealand troops landed on the rugged, fire-swept cliffs of Anzac Cove, enduring eight months of brutal trench fighting before evacuated in defeat.',
        connective:
          'Forged a powerful sense of national identity, sacrifice, and distinct independence separate from British imperial command.',
        question:
          'Why did the catastrophe of Gallipoli forge national identity for Australia and New Zealand?',
      },
      {
        step: 4,
        date: '1916–1918',
        title: 'Chinese Labour Corps & African Pioneers',
        actor: 'Non-White Labour Battalions',
        tag: '⚒️ LOGISTICAL BACKBONE',
        trigger:
          'Over 140,000 Chinese labourers and hundreds of thousands of African carriers cleared unexploded ordnance, dug trenches, and hauled heavy shells under strict curfew.',
        connective:
          'Sustained the Allied Western Front logistics through lethal hazards, despite being segregated, poorly fed, and barred from military honours.',
        question:
          'In what ways did the Chinese Labour Corps and African Pioneers sustain Allied logistics?',
      },
      {
        step: 5,
        date: 'Post-1918',
        title: 'Imperial Erasure & The Unremembered',
        actor: 'Imperial War Graves Commission',
        tag: '🕊️ COMMEMORATIVE RACISM',
        trigger:
          'Imperial officials and the IWGC deliberately refused individual marked headstones for over 100,000 black African and Asian war dead, burying them in anonymous mass pits.',
        connective:
          'Whitewashed the multicultural reality of the war from British national memory, leaving colonial contributions marginalized for nearly a century.',
        question:
          'Why were non-white colonial soldiers denied equal pensions, medals, and remembrance?',
      },
    ],
  },
  lesson_4_home_front_dora: {
    title: 'The Home Front & Women’s Total War: Chronology Spine',
    subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
    stages: [
      {
        step: 1,
        date: 'Aug 1914',
        title: 'DORA & The Authoritarian State',
        actor: 'The British Parliament',
        tag: '📜 STATE CONTROL',
        trigger:
          'Parliament passed the Defence of the Realm Act (DORA), granting the government sweeping emergency powers to censor newspapers, seize land, restrict pub hours, and enforce blackouts.',
        connective:
          'Transformed Britain from a traditional laissez-faire liberal democracy into a strictly regulated wartime command society.',
        question:
          'In what ways did DORA grant the British state unprecedented authoritarian control?',
      },
      {
        step: 2,
        date: 'May 1915',
        title: 'The Shell Crisis & State Production',
        actor: 'David Lloyd George & Ministry of Munitions',
        tag: '💣 INDUSTRIAL OVERHAUL',
        trigger:
          'Frontline reports in the Daily Mail exposed a catastrophic shortage of high-explosive artillery shells, forcing the government to create the Ministry of Munitions under David Lloyd George.',
        connective:
          'Nationalised private armaments factories and reorganised British industry around state-directed total war production.',
        question: 'What forced David Lloyd George to nationalise munitions factories in 1915?',
      },
      {
        step: 3,
        date: 'Jan 1916',
        title: 'The Military Service Act & Conscription',
        actor: 'Herbert Asquith’s Government',
        tag: '⚖️ MILITARY SERVICE ACT',
        trigger:
          'With voluntary enlistment failing to replace horrific Somme-bound casualties, the Military Service Act imposed compulsory conscription for all unmarried men aged 18–41.',
        connective:
          'Represented the most radical infringement of individual liberty in British history and sparked the first formal trials of Conscientious Objectors.',
        question:
          'Why did catastrophic frontline casualties force Britain to impose conscription in 1916?',
      },
      {
        step: 4,
        date: '1916–1918',
        title: 'Canary Girls & Women’s Industrial War',
        actor: '1 Million Female Munitions Workers',
        tag: '🏭 CANARY GIRLS',
        trigger:
          'Over 1 million women stepped into factories to manufacture 80% of all British munitions, risking fatal TNT chemical poisoning that turned their skin yellow (‘Canary Girls’).',
        connective:
          'Decisively broke traditional Edwardian domestic gender barriers, strengthening the political campaign for women’s suffrage achieved in 1918.',
        question:
          'How did 1 million "Canary Girls" transform industrial production despite toxic hazards?',
      },
      {
        step: 5,
        date: '1917–1918',
        title: 'Unrestricted U-Boats & Food Rationing',
        actor: 'German Submarines & Ministry of Food',
        tag: '🍞 FOOD CRISIS',
        trigger:
          'Unrestricted German U-boat attacks sank hundreds of Allied merchant ships, reducing British grain and sugar reserves to less than six weeks’ supply.',
        connective:
          'Forced the introduction of compulsory ration books for sugar, meat, and butter, ending food panic and guaranteeing fair nutritional distribution until the Armistice.',
        question:
          'Why did unrestricted German submarine warfare push Britain to the brink of starvation?',
      },
    ],
  },
  lesson_5_versailles: {
    title: '1918–1919 & The Treaty of Versailles: Chronology Spine',
    subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
    stages: [
      {
        step: 1,
        date: '11 Nov 1918',
        title: 'The Armistice & German Collapse',
        actor: 'German High Command & Sailors',
        tag: '🚂 ARMISTICE RAILWAY CAR',
        trigger:
          'Strangled by the British naval blockade and beaten back by the Allied Hundred Days Offensive, German sailors mutinied at Kiel and the Kaiser abdicated, forcing Germany to sign the Armistice.',
        connective:
          'Ended four years of slaughter on the Western Front, leaving an exhausted Germany facing Allied dictated terms.',
        question:
          'What forced the German military to concede defeat and accept the Armistice in 1918?',
      },
      {
        step: 2,
        date: 'Jan–June 1919',
        title: 'The Big Three & Conflicting Aims',
        actor: 'Clemenceau, Lloyd George & Wilson',
        tag: '🤝 DIPLOMATIC CLASH',
        trigger:
          'The Paris Peace Conference saw French Premier Clemenceau demand crushing revenge, American President Wilson promote the idealistic 14 Points, and British PM Lloyd George seek imperial trade.',
        connective:
          'Produced an uneasy, fragile compromise that satisfied none of the victorious Allies while deeply alienating the defeated powers.',
        question:
          'How did conflicting national motives divide Clemenceau, Lloyd George, and Wilson?',
      },
      {
        step: 3,
        date: '28 June 1919',
        title: 'The Diktat & German Humiliation',
        actor: 'Weimar German Delegates & Allies',
        tag: '📜 TREATY TERMS (GARGLE)',
        trigger:
          'German representatives were barred from negotiations and forced under threat of invasion to sign the Treaty of Versailles, accepting Article 231 War Guilt and a £6.6 billion reparations debt.',
        connective:
          'Provoked unanimous outrage across all German political parties, branding the settlement an illegitimate ‘Diktat’ and creating the dangerous ‘stab-in-the-back’ myth.',
        question:
          'Why did Germans across all political parties denounce the Treaty terms as an unjust "Diktat"?',
      },
      {
        step: 4,
        date: '1919–1920',
        title: 'Keynes’ Warning & The "1940 Class"',
        actor: 'John Maynard Keynes & Will Dyson',
        tag: '⚠️ CATACLYSMIC WARNING',
        trigger:
          'British economist John Maynard Keynes resigned in protest, publishing ‘The Economic Consequences of the Peace’, while cartoonist Will Dyson warned Versailles would produce ‘1940 Cannon Fodder’.',
        connective:
          'Accurately predicted that economically crippling Germany’s democratic republic would fuel extremist nationalism and trigger a second European war within twenty years.',
        question:
          'How did Article 231, Keynes’ warning, and Will Dyson’s cartoon predict future catastrophe?',
      },
      {
        step: 5,
        date: '1920–1939',
        title: 'The Verdict: Harsh Peace or Unenforced Compromise?',
        actor: 'Inter-War European Powers',
        tag: '⚖️ HISTORICAL VERDICT',
        trigger:
          'Versailles left Germany’s industrial core and population largely intact, yet the United States retreated into isolationism and Britain and France lacked the political will to enforce its terms.',
        connective:
          'Allowed Adolf Hitler to exploit grievance and dismantle the treaty unopposed in the 1930s, proving that the fatal failure lay in enforcement rather than severity.',
        question:
          'The Historical Verdict: Was Versailles an impossibly harsh peace or an unenforced compromise?',
      },
    ],
  },
};

let content = fs.readFileSync(dataPath, 'utf8');

for (const [lessonId, spineData] of Object.entries(spinesByLessonId)) {
  const lessonRegex = new RegExp(
    `(id:\\s*['"]${lessonId}['"](?:(?!id:\\s*['"])[\\s\\S])*?)(workbook_stages:\\s*\\[)`,
  );
  const match = content.match(lessonRegex);
  if (match) {
    if (match[1].includes('causal_domino_spine:')) {
      console.log(`ℹ️ causal_domino_spine already present for ${lessonId}, skipping`);
      continue;
    }
    const formattedSpine = `causal_domino_spine: ${JSON.stringify(spineData, null, 6)},\n      $2`;
    content = content.replace(lessonRegex, `$1${formattedSpine}`);
    console.log(`✅ Injected causal_domino_spine for ${lessonId}`);
  } else {
    console.warn(`⚠️ Could not find injection point for ${lessonId}`);
  }
}

fs.writeFileSync(dataPath, content, 'utf8');
console.log('🎉 Successfully processed milestone spines for units/great_war_part2/data.js');
