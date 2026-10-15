const fs = require('fs');
const path = require('path');

const spines = {
  lesson_1: {
    title: 'German Unification & Alsace-Lorraine: 5-Stage Chronological Spine',
    subtitle: 'Core Knowledge & Causal Turning Points (M-A-I-N Framework)',
    exam_strategy:
      'Track how Prussian military victory created a powerful German Empire and lasting French bitterness.',
    stages: [
      {
        step: 1,
        date: '1862–1866',
        title: 'Prussian Rise & "Blood and Iron"',
        actor: 'Prussia (Bismarck)',
        tag: '🚩 NATIONALISM',
        trigger:
          'Chief Minister Otto von Bismarck uses military reforms and short wars against Denmark (1864) and Austria (1866) to unite northern German states under Prussian leadership.',
        because:
          'Bismarck believed German unification could only be forged through Prussian military supremacy, not democratic speeches or parliamentary votes.',
        therefore:
          'Prussia shattered the traditional European balance of power, deeply alarming France who feared a powerful united neighbour on its eastern border.',
        connective:
          'Fearing Prussian dominance, Emperor Napoleon III was provoked into declaring war in July 1870...',
        exam_link:
          '🎯 Assessment Focus: Explaining how Prussian military expansion disrupted European peace',
      },
      {
        step: 2,
        date: 'September 1870',
        title: 'The Battle of Sedan & French Defeat',
        actor: 'Prussia & France',
        tag: '🎖️ MILITARISM',
        trigger:
          'Prussian and German armies encircle the French army at Sedan, capturing Emperor Napoleon III and 100,000 troops in a catastrophic French defeat.',
        because:
          'Prussia sought a decisive military knockout to compel the southern German states to join a single German Empire.',
        therefore:
          'The Second French Empire collapsed overnight, Paris was placed under a brutal four-month siege, and France was forced to surrender.',
        connective:
          'Having crushed France militarily, Bismarck decided to cement the new German Empire with a humiliating ceremony...',
        exam_link: '🎯 Assessment Focus: Decisive military victory toppling rival governments',
      },
      {
        step: 3,
        date: 'Jan–May 1871',
        title: 'Hall of Mirrors & Alsace-Lorraine Seized',
        actor: 'The German Empire',
        tag: '🚩 NATIONALISM',
        trigger:
          "King Wilhelm I is crowned German Kaiser in Versailles' Hall of Mirrors; Germany annexes the mineral-rich provinces of Alsace-Lorraine and imposes a 5 billion franc indemnity.",
        because:
          'German nationalists demanded the historic German-speaking provinces as a defensive buffer against future French invasions.',
        therefore:
          'France suffered catastrophic national humiliation, creating permanent resentment and an unshakeable national obsession with revenge.',
        connective:
          'Furious at the loss of Alsace-Lorraine, French society rallied behind a single political goal...',
        exam_link:
          '🎯 Assessment Focus: Territorial loss as the long-term seed of revenge (Revanche)',
      },
      {
        step: 4,
        date: '1871–1889',
        title: 'The Cult of French "Revanche"',
        actor: 'The French Republic',
        tag: '🚩 NATIONALISM',
        trigger:
          'French schools, politics, and culture become dominated by "Revanche" (revenge)—a national determination to reclaim Alsace-Lorraine.',
        because:
          'French national pride could never accept the loss of the two provinces, which were draped in black mourning wreaths in Paris.',
        therefore:
          'Germany recognized that France was a permanent, irreconcilable enemy that would attack whenever an opportunity arose.',
        connective:
          'Terrified that France would seek an ally for a revenge war, Bismarck created a complex web of treaties...',
        exam_link: '🎯 Assessment Focus: How wounded nationalism poisoned European diplomacy',
      },
      {
        step: 5,
        date: '1873–1890',
        title: "Bismarck's Web & Two-Front Dread",
        actor: 'Chancellor Bismarck',
        tag: '🤝 ALLIANCES',
        trigger:
          "Bismarck constructs the Three Emperors' League (1873), Dual Alliance (1879), and Reinsurance Treaty (1887) to keep France completely isolated.",
        because:
          'Bismarck\'s permanent nightmare was a simultaneous "two-front war" against France in the west and Tsarist Russia in the east.',
        therefore:
          'Peace was maintained while Bismarck ruled, but Europe became dependent on fragile diplomatic bargains that Kaiser Wilhelm II soon abandoned.',
        connective:
          'When Wilhelm II dismissed Bismarck in 1890, he refused to renew the treaty with Russia, paving the way for rival alliances...',
        exam_link:
          '🎯 Assessment Focus: Alliances designed to isolate rivals and prevent two-front encirclement',
      },
    ],
  },
  lesson_2: {
    title: 'Imperialism & Moroccan Crises: 5-Stage Chronological Spine',
    subtitle: 'Core Knowledge & Causal Turning Points (M-A-I-N Framework)',
    exam_strategy:
      'Track how imperial ambition and German Weltpolitik transformed colonial disputes into direct European war threats.',
    stages: [
      {
        step: 1,
        date: '1884–1885',
        title: 'The Berlin Conference & Africa Carve-Up',
        actor: 'European Great Powers',
        tag: '🌍 IMPERIALISM',
        trigger:
          'Fourteen European powers meet in Berlin to establish ground rules for conquering and partitioning the African continent.',
        because:
          'Industrial economies desperately wanted cheap raw materials (rubber, copper, cotton), protected export markets, and imperial prestige.',
        therefore:
          'Britain and France secured the vast majority of fertile, resource-rich territory, leaving newly unified Germany with meager colonial leftovers.',
        connective:
          'Frustrated by Germany’s small empire, the ambitious young Kaiser demanded a radical change in foreign policy...',
        exam_link:
          '🎯 Assessment Focus: Economic greed and imperial prestige dividing world territory',
      },
      {
        step: 2,
        date: '1890–1897',
        title: 'Weltpolitik & "A Place in the Sun"',
        actor: 'Kaiser Wilhelm II',
        tag: '🌍 IMPERIALISM',
        trigger:
          'Wilhelm II dismisses Bismarck and launches "Weltpolitik" (World Policy), vowing that Germany must secure a global empire equal to Britain.',
        because:
          "The Kaiser believed Germany's booming industrial economy and army entitled it to be a dominant global superpower, not just a European land power.",
        therefore:
          'German aggressive rhetoric alarmed Britain and France, who viewed German imperial ambition as a direct threat to their overseas empires.',
        connective:
          'To test the new British-French Entente Cordiale, the Kaiser decided to challenge France directly in North Africa...',
        exam_link: '🎯 Assessment Focus: Weltpolitik creating international alarm and suspicion',
      },
      {
        step: 3,
        date: 'March 1905',
        title: 'The First Moroccan Crisis (Tangier)',
        actor: 'Imperial Germany & France',
        tag: '🌍 IMPERIALISM',
        trigger:
          'Kaiser Wilhelm II lands at Tangier, Morocco, on a white horse, openly declaring support for Moroccan independence from French colonial control.',
        because:
          'Germany wanted to test and break the new 1904 Entente Cordiale between Britain and France, betting Britain would not support France.',
        therefore:
          'France was outraged, international war tensions surged, and the great powers agreed to an international conference to avert conflict.',
        connective:
          'The powers gathered at Algeciras, where Germany expected to isolate France diplomatically...',
        exam_link:
          '🎯 Assessment Focus: Imperial brinkmanship testing the strength of rival alliances',
      },
      {
        step: 4,
        date: 'January–April 1906',
        title: 'The Algeciras Conference Humiliation',
        actor: 'Great Powers at Algeciras',
        tag: '🤝 ALLIANCES',
        trigger:
          'At the conference in Spain, only Austria-Hungary backs Germany; Britain, Russia, and Italy all vote in favor of French control in Morocco.',
        because:
          'Britain feared German bullying and was determined to demonstrate that the Entente Cordiale was a solid defensive partnership.',
        therefore:
          'Germany suffered a stinging diplomatic humiliation, and Britain and France began secret joint military staff conversations.',
        connective:
          'Humiliated at Algeciras, Germany waited for another opportunity to challenge French North Africa...',
        exam_link:
          '🎯 Assessment Focus: Diplomatic isolation driving Britain and France into closer military cooperation',
      },
      {
        step: 5,
        date: 'July 1911',
        title: 'The Agadir Crisis (The Panther’s Leap)',
        actor: 'Germany, France & Britain',
        tag: '🌍 IMPERIALISM',
        trigger:
          'Germany dispatches the gunboat SMS Panther to the Moroccan port of Agadir after French troops occupy Fez to suppress a rebellion.',
        because:
          "Germany demanded the entire French Congo as compensation in exchange for recognizing France's protectorate over Morocco.",
        therefore:
          "Britain strongly backed France with Lloyd George's Mansion House speech; Germany backed down for a small slice of swamp, feeling deeply encircled.",
        connective:
          'Fearing European war was now inevitable, the powers turned from colonial disputes to an urgent land and naval arms race...',
        exam_link:
          '🎯 Assessment Focus: How imperial crises reinforced German feelings of encirclement',
      },
    ],
  },
  lesson_3: {
    title: 'Naval Arms Race & HMS Dreadnought: 5-Stage Chronological Spine',
    subtitle: 'Core Knowledge & Causal Turning Points (M-A-I-N Framework)',
    exam_strategy:
      'Track how naval militarism and technological revolution destroyed Anglo-German relations and made war preparations unstoppable.',
    stages: [
      {
        step: 1,
        date: '1889–1897',
        title: 'The British Two-Power Standard',
        actor: 'The British Empire',
        tag: '🎖️ MILITARISM',
        trigger:
          'Britain passes the Naval Defence Act 1889, decreeing the Royal Navy must equal the combined battlefleet strength of the next two largest navies (France and Russia).',
        because:
          'As an island nation dependent on maritime imports for food and trade, absolute naval supremacy was Britain’s non-negotiable survival lifeline.',
        therefore:
          'Britain maintained uncontested command of the seas, keeping out of continental European pacts in "Splendid Isolation".',
        connective:
          "Britain's security was suddenly threatened when Germany decided to build a rival battlefleet across the North Sea...",
        exam_link: '🎯 Assessment Focus: Naval supremacy as Britain’s essential national defence',
      },
      {
        step: 2,
        date: '1898–1900',
        title: "Tirpitz's Naval Laws & Risk Fleet",
        actor: 'Admiral von Tirpitz & Germany',
        tag: '🎖️ MILITARISM',
        trigger:
          'Admiral von Tirpitz passes German Naval Laws to construct 38 modern battleships directly facing Britain across the North Sea.',
        because:
          'Tirpitz\'s "Risk Theory" argued that a powerful German battlefleet would force Britain to grant imperial concessions rather than risk heavy naval losses.',
        therefore:
          'Britain viewed the German fleet as a lethal dagger pointed directly at London, igniting widespread political alarm and hostility.',
        connective:
          'Determined to reassert absolute supremacy, the British Admiralty designed a revolutionary new warship...',
        exam_link: '🎯 Assessment Focus: Militarism creating intense mutual suspicion and rivalry',
      },
      {
        step: 3,
        date: 'February 1906',
        title: 'The Dreadnought Revolution',
        actor: 'Admiral Jackie Fisher (Britain)',
        tag: '🎖️ MILITARISM',
        trigger:
          'Britain launches HMS Dreadnought, armed with ten 12-inch guns and steam turbine engines, rendering all previous battleships instantly obsolete.',
        because:
          'Britain wanted to demonstrate overwhelming industrial and technological superiority to deter German naval expansion once and for all.',
        therefore:
          'Because all pre-dreadnoughts were now obsolete, the naval race reset to zero: Germany could now compete on equal terms by building dreadnoughts.',
        connective:
          'When Germany widened the Kiel Canal to build its own dreadnoughts, British public panic reached fever pitch...',
        exam_link:
          '🎯 Assessment Focus: Technological innovation resetting the balance of naval power',
      },
      {
        step: 4,
        date: '1908–1909',
        title: 'The 1909 British Naval Scare',
        actor: 'British Public & Government',
        tag: '🎖️ MILITARISM',
        trigger:
          'Amid fears Germany was secretly building dreadnoughts faster than Britain, the British public and press launch the popular cry: "We want eight and we won\'t wait!"',
        because:
          'The British public feared that falling behind in dreadnought construction would leave Britain vulnerable to German invasion and blockade.',
        therefore:
          'The British government doubled its naval budget, commissioning eight new dreadnoughts in a single year and winning the construction race.',
        connective:
          'Exhausted by the crippling financial cost of naval construction, Britain attempted a diplomatic compromise...',
        exam_link:
          '🎯 Assessment Focus: Public hysteria and the political momentum of an arms race',
      },
      {
        step: 5,
        date: '1912–1914',
        title: 'Haldane Mission Failure & Redeployment',
        actor: 'Lord Haldane & Imperial Germany',
        tag: '🤝 ALLIANCES',
        trigger:
          'British War Minister Haldane visits Berlin proposing a naval truce; Germany agrees only if Britain promises neutrality in any future European war, which Britain refuses.',
        because:
          'Britain could not stand aside and allow Germany to crush France and establish total mastery over continental Europe.',
        therefore:
          'Britain redeployed its Mediterranean battlefleet to the North Sea, leaving France to protect the Mediterranean and forging an unwritten military alliance.',
        connective:
          'With the naval race won by Britain, military competition shifted to massive continental army expansions and the volatile Balkans...',
        exam_link: '🎯 Assessment Focus: Failed arms control talks cementing military alliances',
      },
    ],
  },
  lesson_4: {
    title: 'Alliance Systems & Balkan Powder Keg: 5-Stage Chronological Spine',
    subtitle: 'Core Knowledge & Causal Turning Points (M-A-I-N Framework)',
    exam_strategy:
      'Track how rival alliance networks and ethnic nationalism in the Balkans created a rigid diplomatic trap across Europe.',
    stages: [
      {
        step: 1,
        date: '1879–1882',
        title: 'The Triple Alliance Formed',
        actor: 'Germany, Austria-Hungary & Italy',
        tag: '🤝 ALLIANCES',
        trigger:
          'Germany and Austria-Hungary sign the Dual Alliance (1879), promising mutual military defence against Russia; Italy joins in 1882 to form the Triple Alliance.',
        because:
          'Austria-Hungary needed German backing against Russian expansion in the Balkans; Germany wanted a reliable Central European ally.',
        therefore:
          'A powerful, united military bloc was established in Central Europe, threatening both France and Russia.',
        connective:
          'Alarmed by this Central European bloc, democratic France and Tsarist Russia overcame their ideological differences...',
        exam_link: '🎯 Assessment Focus: Defensive alliances provoking rival counter-alliances',
      },
      {
        step: 2,
        date: '1894–1907',
        title: 'The Triple Entente Emerges',
        actor: 'France, Russia & Great Britain',
        tag: '🤝 ALLIANCES',
        trigger:
          'France and Russia sign a military alliance (1894); Britain settles colonial disputes with France (1904) and Russia (1907) to complete the Triple Entente.',
        because:
          "All three powers were terrified of Germany's booming industrial power, huge conscript army, and aggressive diplomatic behaviour.",
        therefore:
          'Europe was cleanly divided into two heavily armed, rival camps, ensuring any localized clash would drag all major powers into war.',
        connective:
          'The most volatile point of friction between these two rival blocs was the crumbling Balkan peninsula...',
        exam_link:
          '🎯 Assessment Focus: Entangling alliances transforming local disputes into world war',
      },
      {
        step: 3,
        date: '1900–1908',
        title: 'The Balkan Powder Keg',
        actor: 'Balkan States & Ottoman Empire',
        tag: '🚩 NATIONALISM',
        trigger:
          'As the Ottoman Empire collapses in Southeastern Europe, newly independent Balkan states (led by Serbia) fight to expand their borders and liberate Slavs.',
        because:
          'Serbian nationalists dreamed of uniting all South Slavs into a "Greater Serbia", including millions living under Austro-Hungarian rule.',
        therefore:
          'Austria-Hungary viewed Serbian nationalism as a mortal threat to the survival of its multi-ethnic empire.',
        connective:
          'Determined to halt Serbian growth, Austria-Hungary took a sudden, aggressive gamble in 1908...',
        exam_link: '🎯 Assessment Focus: Ethnic nationalism destabilizing multi-national empires',
      },
      {
        step: 4,
        date: 'October 1908',
        title: 'The Bosnian Annexation Crisis',
        actor: 'Austria-Hungary, Serbia & Russia',
        tag: '🚩 NATIONALISM',
        trigger:
          'Austria-Hungary formally annexes Bosnia-Herzegovina; Germany threatens war if Russia intervenes to protect Serbia, forcing Russia to back down.',
        because:
          'Austria wanted to crush Serbian dreams of acquiring Bosnia; Germany was determined to show total solidarity with Vienna.',
        therefore:
          'Serbia was enraged, and a humiliated Russia vowed that it would never back down again in any future Balkan confrontation.',
        connective:
          'Encouraged by Russian backing, the Balkan states launched wars to drive the Ottomans out of Europe entirely...',
        exam_link:
          '🎯 Assessment Focus: Diplomatic humiliation ensuring future refusal to compromise',
      },
      {
        step: 5,
        date: '1912–1913',
        title: 'The Balkan Wars (Serbia Doubles)',
        actor: 'The Balkan League & Serbia',
        tag: '🎖️ MILITARISM',
        trigger:
          'Two bloody Balkan wars drive the Ottoman Empire almost completely out of Europe; Serbia doubles in size and equips an army of 400,000 troops.',
        because:
          'Balkan nations sought to seize Ottoman territory and assert full national independence.',
        therefore:
          'Austrian military chiefs concluded that Serbia was an existential danger that had to be destroyed in a "pre-emptive war" before it grew stronger.',
        connective:
          'With Austrian generals seeking an excuse to strike Serbia, Archduke Franz Ferdinand visited Sarajevo in June 1914...',
        exam_link:
          '🎯 Assessment Focus: Regional military expansion pushing great powers toward pre-emptive war',
      },
    ],
  },
  lesson_5: {
    title: 'The July Crisis & Countdown to War: 5-Stage Chronological Spine',
    subtitle: 'Core Knowledge & Causal Turning Points (M-A-I-N Framework)',
    exam_strategy:
      'Track how the assassination of Franz Ferdinand activated the Blank Cheque, ultimatums, and railway mobilisation timetables.',
    stages: [
      {
        step: 1,
        date: '28 June 1914',
        title: 'The Sarajevo Assassination',
        actor: 'Gavrilo Princip & Franz Ferdinand',
        tag: '⚡ THE SPARK',
        trigger:
          'Nineteen-year-old Bosnian Serb Gavrilo Princip shoots Archduke Franz Ferdinand (heir to the Austro-Hungarian throne) and his wife Sophie in Sarajevo.',
        because:
          'The Black Hand terrorist group wanted to sever Bosnia from Austro-Hungarian control to unite with the Kingdom of Serbia.',
        therefore:
          'Austria-Hungary was outraged and decided to use the assassination as the ultimate pretext to crush Serbia as an independent nation.',
        connective:
          'Before attacking Serbia, Austria needed guarantees that Germany would protect it if Russia stepped in...',
        exam_link:
          '🎯 Assessment Focus: The immediate spark igniting long-term structural rivalries',
      },
      {
        step: 2,
        date: '5 July 1914',
        title: 'The German "Blank Cheque"',
        actor: 'Kaiser Wilhelm II & Austria',
        tag: '🤝 ALLIANCES',
        trigger:
          'Kaiser Wilhelm II and Chancellor Bethmann-Hollweg promise Austria unconditional German military backing in whatever action it decides to take against Serbia.',
        because:
          'Germany believed Russia was not yet ready for war, and that a swift, decisive Austrian strike would keep the conflict localized.',
        therefore:
          'The "Blank Cheque" gave Austrian hawks reckless confidence to issue extreme demands that made peaceful resolution impossible.',
        connective:
          'Emboldened by German backing, Austria drafted an ultimatum deliberately designed to be rejected...',
        exam_link:
          '🎯 Assessment Focus: Unconditional alliance pledges escalating regional conflicts',
      },
      {
        step: 3,
        date: '23–28 July 1914',
        title: 'The Ultimatum & War Declared',
        actor: 'Austria-Hungary & Serbia',
        tag: '⚡ THE SPARK',
        trigger:
          'Austria delivers a harsh 10-point ultimatum to Serbia with a 48-hour deadline; Serbia accepts nine points, but Austria declares war on 28 July and bombards Belgrade.',
        because:
          'Austria-Hungary was determined to eliminate Serbia as a political threat, regardless of Serbian diplomatic concessions.',
        therefore:
          'Tsar Nicholas II ordered the Russian army to mobilize, setting in motion the domino chain of European military alliances.',
        connective:
          'Once Russia mobilized, military war plans based on rigid railway timetables took total control of diplomacy...',
        exam_link:
          '🎯 Assessment Focus: Rejection of diplomatic compromise in favor of military force',
      },
      {
        step: 4,
        date: '29–31 July 1914',
        title: 'Mobilisation & The Railway Trap',
        actor: 'Tsar Nicholas II & Germany',
        tag: '🎖️ MILITARISM',
        trigger:
          'Russia orders general army mobilisation; Germany demands Russia halt within 12 hours, then declares war on Russia on 1 August and mobilizes its own forces.',
        because:
          "Russian pride could not permit another Balkan humiliation; German military strategy required immediate action before Russia's huge army assembled.",
        therefore:
          'Diplomats were rendered powerless by military generals whose rigid railway timetables left no time for negotiation.',
        connective:
          'To execute its war plan against Russia, Germany was forced to strike France first by invading neutral Belgium...',
        exam_link:
          '🎯 Assessment Focus: Railway mobilization timetables eliminating diplomatic escape routes',
      },
      {
        step: 5,
        date: '1–4 August 1914',
        title: 'Schlieffen Plan & British Entry',
        actor: 'Germany, Belgium & Britain',
        tag: '🤝 ALLIANCES',
        trigger:
          'Germany declares war on France and invades neutral Belgium under the Schlieffen Plan; Britain honours the 1839 Treaty of London and declares war on Germany at midnight, 4 August.',
        because:
          'Germany needed to defeat France in six weeks before turning east to face Russia; Britain could not allow Germany to conquer Belgium or control Channel ports.',
        therefore:
          'All five major European powers were plunged into the catastrophic First World War, lasting over four years and claiming 20 million lives.',
        connective:
          'The dominoes had fallen: thirty-seven days after the assassination, European peace was destroyed for a generation.',
        exam_link:
          '🎯 Assessment Focus: Causal synthesis: How M-A-I-N culminated in world catastrophe',
      },
    ],
  },
};

function injectSpinesIntoFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  for (const [lessonId, spineData] of Object.entries(spines)) {
    const lessonIdx = content.indexOf(`id: '${lessonId}'`);
    if (lessonIdx === -1) {
      console.warn(`Could not find ${lessonId} in ${filePath}`);
      continue;
    }

    const nextLessonIdx = content.indexOf(`id: 'lesson_`, lessonIdx + 15);
    const searchEnd = nextLessonIdx !== -1 ? nextLessonIdx : content.indexOf('],', lessonIdx);

    const lessonChunk = content.substring(lessonIdx, searchEnd);
    const spineStr = `causal_domino_spine: ${JSON.stringify(spineData, null, 6).replace(/^ {6}/gm, '      ')},\n      `;

    if (lessonChunk.includes('causal_domino_spine:')) {
      const updatedChunk = lessonChunk.replace(
        /causal_domino_spine:\s*\{[\s\S]*?\}\s*,\s*/m,
        spineStr,
      );
      content = content.substring(0, lessonIdx) + updatedChunk + content.substring(searchEnd);
      console.log(`  Updated existing causal_domino_spine in ${lessonId}`);
    } else {
      const insertPos = lessonIdx + `id: '${lessonId}',\n      `.length;
      content = content.substring(0, insertPos) + spineStr + content.substring(insertPos);
      console.log(`  Injected new causal_domino_spine into ${lessonId}`);
    }
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Successfully updated ${filePath}`);
}

const unitPath = path.join(__dirname, '..', 'units', 'great_war', 'data.js');
const publicPath = path.join(__dirname, '..', 'public', 'units', 'great_war', 'data.js');

console.log('Injecting 5-stage chronological domino spines into great_war...');
injectSpinesIntoFile(unitPath);
injectSpinesIntoFile(publicPath);
console.log('Done.');
