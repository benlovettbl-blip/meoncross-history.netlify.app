const fs = require('fs');
const path = require('path');

const spines = {
  lesson_1: {
    title: 'German Unification & Alsace-Lorraine: Chronology Spine',
    subtitle: 'Key Turning Points & Causal Dominoes (M-A-I-N Framework)',
    stages: [
      {
        step: 1,
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
  lesson_2: {
    title: 'Imperialism & Moroccan Crises: Chronology Spine',
    subtitle: 'Key Turning Points & Causal Dominoes (M-A-I-N Framework)',
    stages: [
      {
        step: 1,
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
  lesson_3: {
    title: 'Naval Arms Race & HMS Dreadnought: Chronology Spine',
    subtitle: 'Key Turning Points & Causal Dominoes (M-A-I-N Framework)',
    stages: [
      {
        step: 1,
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
  lesson_4: {
    title: 'Alliance Systems & Balkan Powder Keg: Chronology Spine',
    subtitle: 'Key Turning Points & Causal Dominoes (M-A-I-N Framework)',
    stages: [
      {
        step: 1,
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
  lesson_5: {
    title: 'The July Crisis & Countdown to War: Chronology Spine',
    subtitle: 'Key Turning Points & Causal Dominoes (M-A-I-N Framework)',
    stages: [
      {
        step: 1,
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
    const searchEnd = nextLessonIdx !== -1 ? nextLessonIdx : content.length;

    const lessonChunk = content.substring(lessonIdx, searchEnd);
    const spineStartInChunk = lessonChunk.indexOf('causal_domino_spine:');
    const videoStartInChunk = lessonChunk.indexOf('video: [');

    if (
      spineStartInChunk !== -1 &&
      videoStartInChunk !== -1 &&
      spineStartInChunk < videoStartInChunk
    ) {
      const spineStr = `causal_domino_spine: ${JSON.stringify(spineData, null, 6).replace(/^ {6}/gm, '      ')},\n      `;
      const updatedChunk =
        lessonChunk.substring(0, spineStartInChunk) +
        spineStr +
        lessonChunk.substring(videoStartInChunk);
      content = content.substring(0, lessonIdx) + updatedChunk + content.substring(searchEnd);
      console.log(`  Updated causal_domino_spine in ${lessonId}`);
    } else {
      console.error(`Could not match spine boundaries in ${lessonId}`);
    }
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Successfully updated ${filePath}`);
}

const unitPath = path.join(__dirname, '..', 'units', 'great_war', 'data.js');
const publicPath = path.join(__dirname, '..', 'public', 'units', 'great_war', 'data.js');

console.log('Injecting Solution A + Physical Workbook Key Questions into great_war...');
injectSpinesIntoFile(unitPath);
injectSpinesIntoFile(publicPath);
console.log('Done.');
