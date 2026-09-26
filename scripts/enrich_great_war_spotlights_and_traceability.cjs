/**
 * Migration Script: Integrate Textbook Spotlight Drawers & Ensure Evidence Traceability
 * Target: units/great_war/data.js
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const dataJsPath = path.join(ROOT_DIR, 'units', 'great_war', 'data.js');

if (!fs.existsSync(dataJsPath)) {
  console.error('File not found:', dataJsPath);
  process.exit(1);
}

const rawData = require(dataJsPath);
const greatWarData = rawData.default || rawData;
const lessons = greatWarData.lessons;

// 1. Data definitions for the 6 Great War lessons
const SPOTLIGHT_DATA = [
  // Lesson 1 (Creation of the German Empire 1871)
  {
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
  // Lesson 2 (Franco-Prussian War & Legacy of Hatred)
  {
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
  // Lesson 3 (Scramble for Africa & Imperial Tension)
  {
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
  // Lesson 4 (Dreadnought & Anglo-German Naval Race)
  {
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
  // Lesson 5 (Alliance System: Protection or Trap?)
  {
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
  // Lesson 6 (July Crisis & Assassination in Sarajevo)
  {
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
      footer: 'Haus-, Hof- und Staatsarchiv, Vienna • Imperial Chancery, Berlin (Telegram No. 128)',
    },
  },
];

// 2. Attach spotlights and enrich narrative blocks for evidence traceability
lessons.forEach((lesson, idx) => {
  const spot = SPOTLIGHT_DATA[idx];
  if (spot) {
    lesson.key_figure = spot.key_figure;
    lesson.concept_spotlight = spot.concept_spotlight;
    lesson.archival_dispatch = spot.archival_dispatch;
  }

  // Traceability enrichment for Lesson 1
  if (idx === 0) {
    // Act 2 [2.1] & [2.2]
    lesson.narrative_blocks[1].text =
      '<span class="para-ref">[2.1]</span> In 1862, King Wilhelm I of Prussia appointed a ruthless, arch-conservative Junker nobleman named <strong>Otto von Bismarck</strong> as Minister President. When the liberal Prussian parliament (the <em>Landtag</em>) refused to approve military tax reforms, King Wilhelm contemplated abdication. Bismarck rallied the wavering monarch with theatrical defiance, reportedly threatening emotional tantrums or leaping from palace windows if the King surrendered his crown to elected liberals. Assuming dictatorial control, Bismarck collected taxes unconstitutionally without parliamentary approval for four years (1862–1866) to modernize the Prussian army with Krupp cast-steel cannons, breech-loading Dreyse needle-guns, and dedicated military railway networks. In his maiden address to the budget committee, he issued a stark manifesto that would define the era: <em>"The great questions of the day will not be decided by speeches and resolutions of majorities... but by **blood and iron**."</em><br><br><span class="para-ref">[2.2]</span> Bismarck orchestrated three short, ruthlessly calculated diplomatic and military campaigns. In 1864, Prussia allied with Austria to defeat Denmark, securing Schleswig-Holstein. In 1866, Bismarck turned upon Austria in the Seven Weeks’ War; the modernized Prussian army under General Helmuth von Moltke annihilated Austrian forces at Königgrätz. Following this triumph, Bismarck prudently restrained his generals and monarch, adamantly refusing to march on Vienna or impose a humiliating peace upon Austria, deliberately preserving Vienna as a prospective future ally while expelling it permanently from German affairs to form the North German Confederation. Finally, to unite the hesitant, Catholic southern German kingdoms (Bavaria, Württemberg, and Baden), Bismarck provoked France into declaring war in 1870. The Franco-Prussian War saw Prussian forces crush the French army at Sedan, capture Emperor Napoleon III, and advance to besiege Paris.';
  }

  // Traceability enrichment for Lesson 3
  if (idx === 2) {
    // Act 2 [2.1] & Act 4 [4.2]
    lesson.narrative_blocks[1].text =
      '<span class="para-ref">[2.1]</span> By the turn of the twentieth century, the vast majority of fertile African territory had been seized by Britain and France (<span class="archival-meta-tag">Source A</span>). Germany was left with arid, unprofitable colonies in Southwest Africa, Cameroon, and German East Africa. Yet colonial friction did not inevitably lead to war. In 1898, British and French expeditionary forces confronted each other at <strong>Fashoda</strong> on the Upper Nile, bringing the two empires to the brink of armed conflict; yet imperial statesmen resolved the crisis peacefully through diplomatic compromise. Building on this rapprochement, Britain and France signed the 1904 <strong>Entente Cordiale</strong>, settling long-standing colonial disputes: France recognized British control over Egypt, while Britain accepted French dominance over the independent Sultanate of Morocco.<br><br><span class="para-ref">[2.2]</span> Determined to test and shatter this newfound Anglo-French friendship, Kaiser Wilhelm landed at the Moroccan port of Tangier in March 1905 riding a white charger. He publicly proclaimed his support for the Sultan’s complete sovereignty and demanded an international conference to review Morocco’s status. The gamble backfired catastrophically. At the 1906 <strong>Algeciras Conference</strong>, Britain, Russia, Italy, and the United States backed France; only Austria-Hungary supported Germany. Instead of driving a wedge between London and Paris, German posturing solidified the Entente Cordiale into a robust diplomatic partnership and initiated secret Anglo-French military staff talks.';

    lesson.narrative_blocks[3].text =
      '<span class="para-ref">[4.1]</span> Historians debate whether the Scramble for Africa was the fundamental cause of the Great War or merely a diplomatic sideshow. Marxist-Leninist historians argued that imperialism was the inevitable final stage of monopoly capitalism, driving rival European cartels to fight over African raw materials and captive consumer markets. Conversely, revisionist historians point out that colonial quarrels were repeatedly resolved without war through international conferences—such as the 1884 Berlin Conference and the 1906 Algeciras Conference—or bilateral agreements like the 1898 settlement following Fashoda.<br><br><span class="para-ref">[4.2]</span> Nevertheless, Wilhelm II’s aggressive "gunboat diplomacy" during the Moroccan Crises fundamentally polarized European diplomacy. By attempting to bully France and test British resolve with the gunboat <em>Panther</em>, Germany transformed a loose colonial understanding into an unyielding anti-German military partnership. Furthermore, while colonial disputes in Africa were settled without bloodshed, they poisoned the European atmosphere with profound paranoia: when war finally erupted in 1914, the fatal catalyst emerged not from distant African colonial soil, but from the volatile nationalist powder keg of the <strong>Balkans</strong> in southeastern Europe.';
  }

  // Traceability enrichment for Lesson 4
  if (idx === 3) {
    // Act 2 [2.1]
    lesson.narrative_blocks[1].text =
      '<span class="para-ref">[2.1]</span> In London, Germany\'s naval ambition triggered existential panic. Britain was an island nation that imported over 60% of its food and raw materials by sea; an enemy fleet capable of defeating the Royal Navy in the North Sea could starve the British population into surrender or strike London within hours. For generations, Britain had enforced the <strong>Two-Power Standard</strong>: maintaining a navy larger than the combined fleets of the world\'s next two largest naval powers. In Berlin, Grand Admiral Alfred von Tirpitz devised the "Risk Theory" (<em>Risikogedanke</em>): building a fleet so formidable that even if the Royal Navy defeated it, Britain\'s global naval supremacy would be destroyed. Germany defended its naval program on legitimate grounds: having overtaken Britain as continental Europe\'s leading industrial exporter, Berlin claimed an undisputed sovereign right to protect its booming merchant fleet and overseas maritime trade.';
  }

  // Traceability enrichment for Lesson 6
  if (idx === 5) {
    // Act 3 [3.2] & Act 4 [4.1]
    lesson.narrative_blocks[2].text =
      '<span class="para-ref">[3.1]</span> While the world mourned a royal tragedy, hawks in Vienna saw a golden opportunity to crush Serbia once and for all. However, terrified that attacking Serbia would provoke Tsarist Russia into war, Austria sought guarantees from Berlin. On 5 July 1914, Kaiser Wilhelm II issued the fateful <strong>Blank Cheque</strong>: Germany promised unconditional military backing to Austria-Hungary, urging Vienna to act swiftly while world sympathy remained on its side. Emboldened by this ironclad German pledge, Austria delivered a deliberately unacceptable ten-point <strong>Ultimatum</strong> to Serbia on 23 July, giving Belgrade just forty-eight hours to accept. Despite Serbia accepting eight of the ten demands, Austria severed diplomatic relations and declared war on Serbia on 28 July 1914, bombarding Belgrade across the Danube.<br><br><span class="para-ref">[3.2]</span> The declaration triggered the fatal domino effect of European mobilization timetables. Tsarist Russia, humiliated in 1908 when forced to back down during the Bosnian Crisis, resolved that its national prestige could not survive another defeat in the Balkans, ordering general mobilization on 30 July. In Berlin, the German General Staff under Helmuth von Moltke the Younger pressed urgently for war: Moltke calculated that if war with Russia was inevitable, it was far better to fight in 1914 than to wait until 1917, when French-financed Russian strategic railway construction would be completed and make the Schlieffen Plan unworkable. Germany demanded Russian demobilization within twelve hours; when St. Petersburg refused, Germany declared war on Russia on 1 August and France on 3 August, invading neutral Belgium on 4 August and drawing Great Britain into the conflict.';
  }
});

// Serialize data back to units/great_war/data.js
const outputCode = `const great_war = ${JSON.stringify(greatWarData, null, 2)};

export default great_war;
export const unitData = great_war;
if (typeof module !== 'undefined' && module.exports) module.exports = great_war;
`;

fs.writeFileSync(dataJsPath, outputCode, 'utf8');
console.log(
  '✅ Successfully enriched units/great_war/data.js with spotlight decks & traceability evidence.',
);
