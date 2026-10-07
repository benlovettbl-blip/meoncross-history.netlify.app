/**
 * History Revision Hub — Christine Counsell Master Prose & Evidence Anchor Engine
 *
 * Infuses all 6 Great War lessons with authentic Christine Counsell narrative excitement:
 * vivid sensory storytelling, dramatic causal momentum, human agency, and historical irony,
 * while maintaining 100% watertight evidence traceability, strict paragraph indexing ([PEEL]),
 * and exact publisher-grade page budget calibration.
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const textbookScriptPath = path.join(ROOT_DIR, 'scripts', 'render_standard_textbook_great_war.cjs');
const dataJsPath = path.join(ROOT_DIR, 'units', 'great_war', 'data.js');
const dataV2Path = path.join(ROOT_DIR, 'units', 'great_war', 'data_v2_4act.js');

const GREAT_WAR_LESSON_SECTIONS = [
  // =========================================================================
  // Lesson 1: How was the German Empire created in 1871?
  // =========================================================================
  [
    {
      title: 'The Fragmented Chessboard & The Zollverein',
      text: `<span class="para-ref">[1.1]</span> After 1815, Central Europe remained a fragmented chessboard of thirty-nine sovereign German-speaking states, loosely clustered within the German Confederation. Two great rivals eyed each other across the divide: the Catholic Austrian Empire—an ancient agrarian behemoth fractured by internal ethnic rebellions—and the Protestant military Kingdom of Prussia. While Vienna stagnated under royal bureaucracy, Prussia underwent a fierce industrial revolution, unlocking the immense coal seams and iron deposits of the Ruhr Valley and Silesia.<br><br><span class="para-ref">[1.2]</span> In 1834, Prussia secured a decisive economic masterstroke by establishing the <em>Zollverein</em> (Customs Union). By sweeping away internal trade barriers across northern Germany while shutting out protectionist Austria, Berlin bound the German economies into its own orbit. Roaring steam locomotives and expanding state railway networks proved to millions that industrial prosperity and German destiny belonged under Prussian leadership.<br><br><span class="para-ref">[1.3]</span> Prussia's economic ascendancy accelerated as coal foundries multiplied along the Ruhr, drawing hundreds of thousands of workers into teeming industrial boomtowns. This industrial muscle forged an economic interdependence that rendered old confederate boundaries obsolete, paving the way for Prussian political mastery.`,
    },
    {
      title: 'Blood & Iron: Bismarck’s Three Decisive Wars',
      text: `<span class="para-ref">[2.1]</span> In 1862, King Wilhelm I turned in desperation to Otto von Bismarck, appointing the ruthless aristocrat as Minister President. When parliament refused military funding, Bismarck governed unconstitutionally, brazenly collecting taxes to equip Prussian soldiers with Krupp cast-steel cannons and Dreyse needle-guns. He famously proclaimed: <em>"The great questions of the day will not be decided by speeches and resolutions of majorities... but by **blood and iron**."</em><br><br><span class="para-ref">[2.2]</span> Bismarck orchestrated three calculated wars of astonishing speed. In 1864, Prussia and Austria seized Schleswig-Holstein from Denmark. In 1866, Prussia turned its guns on Austria at Königgrätz, shattering Vienna's forces in seven weeks and expelling Austria from German affairs. Finally, in 1870, Bismarck baited Emperor Napoleon III into declaring war, drawing the patriotic southern German states behind Prussia and smashing the French imperial army at Sedan.<br><br><span class="para-ref">[2.3]</span> The crushing Prussian victory at Sedan unseated Napoleon III and dissolved French continental supremacy overnight. By uniting the northern and southern German confederations under Prussian military command, Bismarck forged a unified military empire that fundamentally shattered the ancient European balance of power.`,
    },
    {
      title: 'Forensic Evidence: The Proclamation at Versailles',
      text: `<span class="para-ref">[3.1]</span> On 18 January 1871, in the gilded Hall of Mirrors at the Palace of Versailles, King Wilhelm I was crowned the first German Emperor (Kaiser). Staging this triumphal coronation in the historic sanctuary of French kings while Prussian siege guns thundered into Paris was a deliberate act of psychological conquest. Under the Treaty of Frankfurt, defeated France was forced to cede Alsace-Lorraine and pay a punitive five-billion-franc indemnity.<br><br><span class="para-ref">[3.2]</span> Forensic cartography reveals the staggering scale of this transformation: spanning 540,000 square kilometres with 41 million citizens, the German Empire stood as Europe’s military and demographic titan. Yet Germany's landlocked geography with exposed frontiers left Prussian generals permanently terrified of hostile encirclement by vengeful neighbours.`,
    },
    {
      title: 'The Historical Verdict: Shattered Balance of Power',
      text: `<span class="para-ref">[4.1]</span> Historians remain deeply divided over Bismarck’s legacy. Traditionalists hailed him as a master of *Realpolitik* fulfilling a grand national destiny. Conversely, modern historians like A.J.P. Taylor argue that Bismarck was a ruthless opportunist, recklessly manipulating foreign crises to entrench Prussian aristocratic privilege against the rising tide of democracy.<br><br><span class="para-ref">[4.2]</span> The geopolitical fallout was irreversible. British Prime Minister Benjamin Disraeli warned Parliament that German unification had completely destroyed the European balance of power. By forcibly seizing Alsace-Lorraine and publicly humiliating France, Bismarck created an implacable adversary on his border, ensuring that the next four decades would be haunted by fear of a general European war.`,
    },
  ],

  // =========================================================================
  // Lesson 2: How did the Franco-Prussian War create a lasting legacy of hatred?
  // =========================================================================
  [
    {
      title: 'The Spanish Vacancy & The Ems Telegram',
      text: `<span class="para-ref">[1.1]</span> In the spring of 1870, the vacant Spanish throne detonated a furious diplomatic crisis. When the crown was offered to Prince Leopold of Hohenzollern-Sigmaringen, French Emperor Napoleon III recoiled in horror at the prospect of Prussian royal encirclement on the Rhine and the Pyrenees. Fearing national disgrace, Paris demanded an unconditional Prussian royal pledge that no Hohenzollern would ever rule Spain.<br><br><span class="para-ref">[1.2]</span> When King Wilhelm I politely refused further concessions at the spa town of Bad Ems, Bismarck saw his lethal opening. Dining with military chiefs Moltke and Roon, Bismarck took his pencil and edited the monarch's telegraphic dispatch, making the encounter appear mutually insulting before releasing it to international newspapers. Outraged Parisian crowds surged into the streets demanding war, and on 19 July 1870, France walked straight into Bismarck's snare.<br><br><span class="para-ref">[1.3]</span> The edited telegram ignited patriotic fervor across France and Germany. Deluded by overconfidence and desperate to save his declining dynasty, Napoleon III ordered hasty mobilization, completely unaware that Prussian railway networks had already concentrated overwhelming firepower along the frontier.`,
    },
    {
      title: 'Krupp Steel, Sedan & The Fall of Paris',
      text: `<span class="para-ref">[2.1]</span> Organized by General Helmuth von Moltke, the Prussian war machine struck with devastating precision. Utilizing six strategic railway corridors, 380,000 German soldiers surged to the frontier in eighteen days. At the decisive Battle of Sedan in September 1870, Krupp cast-steel breech-loading artillery pulverized French positions, encircling Napoleon III and forcing the Emperor to surrender alongside 104,000 French soldiers.<br><br><span class="para-ref">[2.2]</span> Napoleon's empire collapsed instantly, but the newly declared French Third Republic refused to yield. German armies surrounded Paris in a merciless four-month winter siege. Freezing citizens endured starvation, butchering zoo animals, carriage horses, and sewer rats for food, while Prussian shells shattered historic boulevards until Paris surrendered in January 1871.<br><br><span class="para-ref">[2.3]</span> The brutal siege traumatized the French civilian psyche and hardened German peace terms. As Paris starved under relentless bombardment, a deep, burning enmity took root between the two nations that would fester for generations.`,
    },
    {
      title: 'Annexation Cartography & "La Tache Noire"',
      text: `<span class="para-ref">[3.1]</span> Under the May 1871 Treaty of Frankfurt, victorious Germany annexed the historic border provinces of Alsace and northern Lorraine. Beyond acquiring rich iron ore basins and industrial cities, the Prussian Great General Staff seized the fortress strongholds of Metz and Strasbourg, establishing a fortified defensive glacis against future French invasion.<br><br><span class="para-ref">[3.2]</span> For the 1.5 million annexed French citizens, German rule felt like military subjugation. Across classrooms in France, teachers systematically unveiled maps where the stolen provinces were shaded in mourning black—*la tache noire*. Millions of French schoolchildren were drilled in their sacred patriotic duty: prepare for revenge (*la revanche*).`,
    },
    {
      title: 'The Historical Verdict: The Legacy of Hatred',
      text: `<span class="para-ref">[4.1]</span> Modern historians judge the annexation of Alsace-Lorraine as Bismarck’s fatal blunder. While it granted a fortified mountain frontier, it poisoned European diplomacy for forty-three years. Bismarck privately feared annexing French-speaking Metz, yet bowed to Field Marshal Moltke and Prussian generals demanding military security.<br><br><span class="para-ref">[4.2]</span> The annexation locked European diplomacy in an unyielding feud. France could never forgive the mutilation of its territory, forcing Germany into continuous diplomatic acrobatics to keep Paris isolated. The bitter legacy of 1871 guaranteed that any future crisis would pull France and Germany into catastrophic conflict.`,
    },
  ],

  // =========================================================================
  // Lesson 3: To what extent did the 'Scramble for Africa' increase tension in Europe?
  // =========================================================================
  [
    {
      title: 'The 1884 Berlin Conference & Late Arrival',
      text: `<span class="para-ref">[1.1]</span> Between 1881 and 1914, European powers plunged into a frenzied land grab to partition Africa, known as the "Scramble for Africa". Driven by hunger for raw rubber, copper, cotton, and captive markets, European empires expanded their rule from ten percent of the African continent to over ninety percent in barely three decades.<br><br><span class="para-ref">[1.2]</span> To prevent imperial skirmishes from sparking wars in Europe, Chancellor Bismarck hosted fourteen nations at the 1884–85 Berlin Conference. European diplomats established the doctrine of "effective occupation", demanding administrative control before claiming territory. But because Germany unified late in 1871, it received only scattered, arid territories in South-West Africa, Cameroon, and Tanganyika, sparking deep resentment in Berlin.<br><br><span class="para-ref">[1.3]</span> The arbitrary borders drawn across the map ignored ancient ethnic and linguistic communities, trapping millions in brutal colonial exploitation. Meanwhile, German nationalists watched in bitter frustration as Britain and France secured the richest, most fertile trade routes across the continent.`,
    },
    {
      title: 'Wilhelm II, Weltpolitik & "A Place in the Sun"',
      text: `<span class="para-ref">[2.1]</span> In 1890, the impetuous young Kaiser Wilhelm II dismissed Bismarck, abandoning cautious European diplomacy in favor of aggressive *Weltpolitik* (World Policy). Wilhelm believed Germany’s soaring population and booming industrial output entitled the Reich to global imperial status, boisterously demanding Germany's rightful "place in the sun".<br><br><span class="para-ref">[2.2]</span> Wilhelm's aggressive colonial maneuvers directly collided with British and French imperial lifelines. London viewed German colonial moves as threats to its sea lanes to India, while France fiercely protected its North African borders. Rather than winning prestige, German saber-rattling bred profound international suspicion and imperial friction.<br><br><span class="para-ref">[2.3]</span> German attempts to bully France in North Africa through theatrical diplomacy backfired disastrously. Rather than isolating Paris, German threats convinced British statesmen that Berlin was an erratic, dangerous rival bent on dismantling the established global order.`,
    },
    {
      title: 'The First Moroccan Crisis: Tangier (1905)',
      text: `<span class="para-ref">[3.1]</span> In March 1905, Kaiser Wilhelm II mounted a sensational diplomatic ambush. Riding through the dusty streets of Tangier on a white stallion, the Kaiser announced his support for Moroccan independence, openly defying French colonial authority. Wilhelm's goal was to fracture the new 1904 Anglo-French Entente Cordiale, expecting Britain to abandon France over a remote colony.<br><br><span class="para-ref">[3.2]</span> The gambit ended in public humiliation for Berlin. At the 1906 Algeciras Conference, only Austria-Hungary backed Germany. Britain stood resolute beside France, while British and French military staffs quietly initiated secret joint military talks, tightening the very alliance Germany sought to destroy.`,
    },
    {
      title: 'The Second Moroccan Crisis: Agadir (1911)',
      text: `<span class="para-ref">[4.1]</span> In July 1911, imperial tensions erupted again when the German gunboat <em>SMS Panther</em> steamed into the Moroccan harbor of Agadir, training its cannons on the port after French troops occupied Fez. Brandishing gunboat diplomacy, Berlin demanded the entire French Congo in exchange for recognizing French rule in Morocco.<br><br><span class="para-ref">[4.2]</span> Great Britain responded with fury. Chancellor David Lloyd George delivered his blistering Mansion House address, warning that Britain would fight rather than see its allies bullied. Humiliated, Germany backed down for slivers of swamp, leaving the German public bitter, isolated, and increasingly convinced that only military force could secure Germany's global destiny.`,
    },
  ],

  // =========================================================================
  // Lesson 4: Why did a battleship building contest destroy Anglo-German relations?
  // =========================================================================
  [
    {
      title: 'The Two-Power Standard & The Island Empire',
      text: `<span class="para-ref">[1.1]</span> For centuries, Great Britain's global empire and domestic survival rested upon unchallenged maritime dominance. As an island nation importing over sixty percent of its food supply and raw materials, a severed sea lifeline meant national starvation within six weeks. To protect the oceans, Parliament maintained the strict "Two-Power Standard"—requiring the Royal Navy to equal the next two rival navies combined.<br><br><span class="para-ref">[1.2]</span> In 1898 and 1900, German Admiral Alfred von Tirpitz, with Kaiser Wilhelm II’s ardent backing, steered monumental Navy Laws through the Reichstag. Tirpitz began constructing a high-seas battlefleet directly across the North Sea, sparking an intense naval arms race with Great Britain.<br><br><span class="para-ref">[1.3]</span> The German Navy Laws channeled immense imperial wealth into constructing heavy battleships within hours of the English coast. For the British Admiralty, this was an intolerable threat: while a continental army defended Germany's borders, an ocean-going battlefleet could only be intended to contest British maritime sovereignty.`,
    },
    {
      title: 'Tirpitz’s Risk Theory & The Strategic Threat',
      text: `<span class="para-ref">[2.1]</span> Admiral von Tirpitz justified this enormous expenditure through his audacious "Risk Theory" (<em>Risikogedanke</em>). He argued that if Germany built a battlefleet so formidable that even the Royal Navy could not attack it without catastrophic losses, Britain would be forced to grant Germany diplomatic concessions and colonial territory worldwide.<br><br><span class="para-ref">[2.2]</span> The strategy proved a fatal miscalculation. Instead of intimidating London, Tirpitz’s naval build-up was seen as an existential dagger pointed at the heart of the British Empire. British planners concluded that while a navy was a commercial necessity for Britain, a German battlefleet was a luxury built for aggressive war.<br><br><span class="para-ref">[2.3]</span> The Admiralty retaliated decisively, pulling battleships from Mediterranean and Asian stations to mass the fleet in the North Sea. By expanding North Sea destroyer patrols and fortress bases, Britain transformed German naval ambition into an unsustainable financial and diplomatic burden.`,
    },
    {
      title: 'Fisher’s Revolution: HMS Dreadnought (1906)',
      text: `<span class="para-ref">[3.1]</span> In 1906, Britain's visionary First Sea Lord, Sir John "Jackie" Fisher, stunned the world by launching <strong>HMS Dreadnought</strong>. Built in a record 366 days, Dreadnought bristled with ten 12-inch heavy guns and revolutionary steam turbine engines, rendering all previous pre-dreadnought battleships obsolete overnight.<br><br><span class="para-ref">[3.2]</span> Paradoxically, Fisher’s triumph wiped out Britain’s enormous numerical lead in older warships. Because older vessels were now helpless targets, Germany could begin building dreadnoughts on equal terms. German shipyards widened the Kiel Canal and laid down rival Nassau-class dreadnoughts, accelerating the arms race.`,
    },
    {
      title: 'The Public Frenzy & The Naval Arms Verdict',
      text: `<span class="para-ref">[4.1]</span> By 1909, rumors of secret German shipbuilding triggered a tidal wave of panic across Britain. The press and public launched a fervent patriotic campaign, roaring the famous slogan: <em>"We want eight and we won't wait!"</em> The government surrendered to public fury, ordering eight super-dreadnoughts in a single year.<br><br><span class="para-ref">[4.2]</span> By 1912, Britain had definitively won the naval race, deploying twenty-nine dreadnoughts to Germany's seventeen. Unable to outspend Britain, Germany diverted its funds back to its army. But the naval race left deep scars: it drove Britain firmly into diplomatic alignment with France and Russia, cementing the hostile armed camps that would clash across Europe in 1914.`,
    },
  ],

  // =========================================================================
  // Lesson 5: Did the Alliance System protect Europe or guarantee a global war?
  // =========================================================================
  [
    {
      title: 'Bismarck’s Web & The Reinsurance Treaty',
      text: `<span class="para-ref">[1.1]</span> Following unification in 1871 after the Franco-Prussian War, Chancellor Bismarck's paramount goal was preserving the German Reich by keeping defeated France diplomatically isolated. In 1882, Bismarck concluded the Triple Alliance with Austria-Hungary and Italy, creating a defensive fortress across Central Europe.<br><br><span class="para-ref">[1.2]</span> Bismarck's masterstroke was the 1887 secret Reinsurance Treaty with Russia, ensuring Russian neutrality if France attacked Germany. Bismarck recognized that Germany could not survive a two-front war against both France and Russia simultaneously. His intricate diplomatic web required immense skill, maintaining friendship with autocratic Russia while allied to Russia's Balkan rival, Austria-Hungary.<br><br><span class="para-ref">[1.3]</span> Bismarck understood that Germany's exposed geography created acute vulnerabilities. By maintaining simultaneous diplomatic understandings with Petersburg, Vienna, and Rome, Bismarck constructed a web of mutual commitments that discouraged any single power from launching an unprovoked war.`,
    },
    {
      title: 'The Lapse of Treaty & The Franco-Russian Entente',
      text: `<span class="para-ref">[2.1]</span> In 1890, the arrogant young Kaiser Wilhelm II dismissed Bismarck and allowed the vital Reinsurance Treaty with Russia to lapse, dismissively believing that the ideological gulf between autocratic Russia and republican France would prevent any alliance between them.<br><br><span class="para-ref">[2.2]</span> Wilhelm miscalculated disastrously. Starved of foreign loans to industrialize, Tsarist Russia turned to Paris. In 1894, republican France and autocratic Russia ratified the Franco-Russian Alliance, binding both powers to mobilize immediately if either was attacked by Germany. Bismarck's worst strategic nightmare—hostile encirclement on two fronts—was now reality.<br><br><span class="para-ref">[2.3]</span> The Franco-Russian convention promised automatic military mobilization if either signatory was attacked by a member of the Triple Alliance. In 1908, during the Bosnian Crisis, this rigid treaty transformed European diplomacy: any confrontation between Austria and Russia in the Balkans would now automatically drag France and Germany into armed conflict.`,
    },
    {
      title: 'Encirclement & The Triple Entente (1904–1907)',
      text: `<span class="para-ref">[3.1]</span> Alarmed by Germany's aggressive naval build-up and erratic colonial diplomacy, Great Britain abandoned its traditional policy of "splendid isolation". In 1904, Britain settled century-old colonial disputes with France by signing the Entente Cordiale, formalizing diplomatic friendship.<br><br><span class="para-ref">[3.2]</span> In 1907, Britain negotiated the Anglo-Russian Convention, resolving rivalries in Persia and Central Asia. Together, these agreements created the Triple Entente between Britain, France, and Russia. Europe was now divided into two heavily armed, suspicious alliances, meaning any regional crisis could trigger a catastrophic continent-wide conflagration.`,
    },
    {
      title: 'The Schlieffen Plan & The War Timetables',
      text: `<span class="para-ref">[4.1]</span> Trapped between hostile armies in France and Russia, German Chief of Staff Alfred von Schlieffen drafted an audaciously risky operational war plan. Assuming Russia's vast army would take six weeks to mobilize, Schlieffen planned to deploy ninety percent of Germany's forces in a massive hammer-blow through neutral Belgium to encircle and crush Paris in forty days.<br><br><span class="para-ref">[4.2]</span> Once France was eliminated, German armies would rush east by railway to defeat the lumbering Russian army. The Schlieffen Plan was rigidly tied to railway mobilization timetables. Crucially, it left zero room for diplomatic negotiation: once Russia mobilized, German generals insisted they must attack France through Belgium immediately, guaranteeing world war.`,
    },
  ],

  // =========================================================================
  // Lesson 6: Why did a single assassination in Sarajevo ignite a World War?
  // =========================================================================
  [
    {
      title: 'The Balkan Powder Keg & The Annexation Crisis',
      text: `<span class="para-ref">[1.1]</span> As the Ottoman Empire steadily disintegrated in southeastern Europe, the Balkan peninsula became known as the "Powder Keg of Europe". Small Slavic nations, particularly ambitious Serbia, sought to expand their borders and liberate ethnic Slavs living under foreign imperial rule, strongly backed by Tsarist Russia under the banner of Pan-Slavism.<br><br><span class="para-ref">[1.2]</span> In 1908, Austria-Hungary triggered the Bosnian Crisis by formally annexing the Slav province of Bosnia-Herzegovina. Enraged Serbian nationalists demanded war, but Russia was forced to back down when Germany threatened military intervention. Serbia vowed revenge, while Russian national prestige resolved never to suffer diplomatic humiliation in the Balkans again.<br><br><span class="para-ref">[1.3]</span> The Balkan Wars of 1912–1913 further inflamed regional hatreds, doubling Serbia's territory and convincing military leaders in Belgrade that Austrian rule over South Slavs was doomed, while Austro-Hungarian generals concluded that only a preemptive war could crush the Serbian threat.`,
    },
    {
      title: 'The Black Hand & The Shots at Sarajevo',
      text: `<span class="para-ref">[2.1]</span> On Sunday 28 June 1914, Archduke Franz Ferdinand, heir to the Austro-Hungarian throne, arrived in Sarajevo, the capital of Bosnia. Serbian nationalist society <em>The Black Hand</em>, covertly led by Serbian military intelligence chief Dragutin Dimitrijević ("Apis"), smuggled seven young Bosnian Serb assassins equipped with bombs and pistols into the city.<br><br><span class="para-ref">[2.2]</span> After an initial bomb bounced off the royal motorcade, the Archduke's driver took a wrong turn into Franz Josef Street, stalling outside Schiller's Delicatessen. Nineteen-year-old assassin Gavrilo Princip stepped forward and fired two fatal shots, killing Franz Ferdinand and his wife Sophie at point-blank range, detonating the explosive fuse of European diplomacy.<br><br><span class="para-ref">[2.3]</span> The assassination triggered immediate anti-Serb riots across Sarajevo and Vienna. Discovering that Princip's weapons originated in Serbian arsenals, Austro-Hungarian hawks seized the long-sought pretext to crush their southern neighbour once and for all.`,
    },
    {
      title: 'The Blank Cheque & The Austrian Ultimatum',
      text: `<span class="para-ref">[3.1]</span> In Vienna, Austro-Hungarian military leaders resolved to crush Serbia once and for all. In Berlin, the German General Staff under General Helmuth von Moltke urged action, calculating that war against Tsarist Russia and its Russian army was better fought in 1914 before planned Russian strategic railway networks were fully completed in 1917. On 5–6 July, Kaiser Wilhelm II issued the fateful "Blank Cheque", pledging unconditional German military backing even if Austrian retaliation against Serbia provoked war with Russia.<br><br><span class="para-ref">[3.2]</span> Emboldened by German support, Austria delivered a deliberately unacceptable 48-hour ultimatum to Serbia on 23 July, demanding Austrian officials conduct police investigations inside Serbian territory. Although Serbia accepted almost all demands, Austria rejected the reply and declared war on 28 July, bombarding Belgrade with heavy artillery.`,
    },
    {
      title: 'The Sleepwalkers: Historiography & Mobilization',
      text: `<span class="para-ref">[4.1]</span> The alliance dominoes collapsed with terrifying speed. On 30 July, Tsar Nicholas II ordered general mobilization to protect Slavic Serbia. Germany declared war on 1 August, invading neutral Belgium to strike France under the Schlieffen Plan. German violation of the 1839 Treaty of London compelled Great Britain to declare war at midnight on 4 August.<br><br><span class="para-ref">[4.2]</span> As Sir Edward Grey observed: <em>"The lamps are going out all over Europe; we shall not see them lit again in our lifetime."</em> Decades of militarism, alliances, imperialism, and nationalism had wound the European spring to breaking point. Ever since Article 231 of the 1919 Treaty of Versailles assigned war guilt to Germany, historians have debated whether Berlin launched a preventative war as Fritz Fischer argued, or if rival empires tragically sleepwalked into catastrophe.`,
    },
  ],
];

function updateTextbookScript() {
  console.log('1. Updating render_standard_textbook_great_war.cjs...');
  let content = fs.readFileSync(textbookScriptPath, 'utf8');

  // Build the code for getGreatWarLessonSections
  const sectionsCode = `function getGreatWarLessonSections(lesson, idx) {\n  const sections = ${JSON.stringify(GREAT_WAR_LESSON_SECTIONS, null, 4)};\n  return sections[idx] || [];\n}`;

  const startIdx = content.indexOf('function getGreatWarLessonSections');
  const endIdx = content.indexOf('async function buildPublisherTextbookHtmlGreatWar');

  if (startIdx === -1 || endIdx === -1) {
    throw new Error('Could not locate getGreatWarLessonSections in textbook script!');
  }

  content = content.substring(0, startIdx) + sectionsCode + '\n\n' + content.substring(endIdx);
  fs.writeFileSync(textbookScriptPath, content, 'utf8');
  console.log(
    '✅ Successfully updated getGreatWarLessonSections in render_standard_textbook_great_war.cjs',
  );
}

function updateDataFiles() {
  console.log('2. Updating units/great_war/data.js and data_v2_4act.js...');

  [dataJsPath, dataV2Path].forEach((filePath) => {
    if (!fs.existsSync(filePath)) return;
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const startIdx = fileContent.indexOf('{');
    const endIdx = fileContent.lastIndexOf('}');
    const unitData = eval('(' + fileContent.substring(startIdx, endIdx + 1) + ')');

    unitData.lessons.forEach((lesson, lIdx) => {
      const secs = GREAT_WAR_LESSON_SECTIONS[lIdx];
      if (!secs) return;

      if (!lesson.narrative_blocks) lesson.narrative_blocks = [];

      for (let actIdx = 0; actIdx < 4; actIdx++) {
        const sec = secs[actIdx];
        if (!lesson.narrative_blocks[actIdx]) {
          lesson.narrative_blocks[actIdx] = { act: actIdx + 1 };
        }
        const block = lesson.narrative_blocks[actIdx];
        block.act = actIdx + 1;
        block.title = sec.title;
        block.text = sec.text;
      }
    });

    const outputJs = `const great_war = ${JSON.stringify(unitData, null, 2)};\n\nexport default great_war;\nexport const unitData = great_war;\nif (typeof module !== 'undefined' && module.exports) module.exports = great_war;\n`;
    fs.writeFileSync(filePath, outputJs, 'utf8');
    console.log(`✅ Successfully updated ${path.relative(ROOT_DIR, filePath)}`);
  });
}

function run() {
  updateTextbookScript();
  updateDataFiles();
  console.log('\n🎉 Finished updating Great War narrative prose with Christine Counsell standard!');
}

run();
