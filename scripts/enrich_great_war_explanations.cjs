const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const dataJsPath = path.join(__dirname, '..', 'units', 'great_war', 'data.js');

// 95 tailored 2-sentence historian explanations for Great War
const explanations = {
  // Lesson 0: The Road to War / German Unification Context (20 Qs)
  '0.0':
    "Prior to 1871, Central Europe was fragmented into 39 sovereign principalities and kingdoms within the German Confederation. Prussia's economic growth and military dominance gradually superseded Austrian leadership to unite them.",
  0.1: 'Prussia possessed the largest military, the rapidly industrialising Ruhr coalfields, and the most efficient administrative state among all German territories. Under Bismarck and von Moltke, Prussian arms spearheaded German unification.',
  0.2: 'Otto von Bismarck was appointed Minister President of Prussia by King Wilhelm I in 1862 during a constitutional crisis over army funding. He pursued an uncompromising policy of Realpolitik to achieve German unity under Prussian leadership.',
  0.3: "In his famous September 1862 speech, Bismarck argued that great questions of the day would be resolved not by parliamentary speeches and resolutions, but by 'blood and iron'. This signaled Prussia's commitment to military force over liberal debate.",
  0.4: 'Bismarck believed that diplomacy without military strength was ineffective, and that national unity required military victories. He deliberately waged three short, decisive wars to forge a unified German nation.',
  0.5: 'Prussia defeated Denmark in 1864, Austria in 1866, and France in 1870–71 in rapid succession. Each victory systematically removed foreign rivals that had historically prevented German unification.',
  0.6: 'The Franco-Prussian War broke out in July 1870 after Bismarck edited the Ems Telegram to provoke Emperor Napoleon III into declaring war. The resulting war rallied the southern German states into a patriotic alliance with Prussia.',
  0.7: 'In a deliberate humiliation of defeated France, the German princes gathered in the Hall of Mirrors at Versailles to proclaim the German Empire. This symbolic insult fueled intense French desire for revenge (revanche) for decades.',
  0.8: 'On 18 January 1871, while Paris was still under Prussian siege, the German Empire was formally proclaimed. This date marked the foundation of the modern German Kaiserreich and shattered the European balance of power.',
  0.9: 'Under the Treaty of Frankfurt, Germany annexed the mineral-rich provinces of Alsace and northern Lorraine. The loss of these territories alienated French public opinion and made lasting Franco-German reconciliation impossible.',
  '0.10':
    'The Zollverein was a Prussian-led customs union established in 1834 that eliminated internal tariffs among member German states. By binding German economies to Berlin while excluding Austria, it paved the way for political unification.',
  0.11: "Prussia deliberately excluded the Austrian Empire from the Zollverein to prevent Vienna from controlling German economic development. This economic isolation accelerated Austria's eclipse as the preeminent German power.",
  0.12: 'The new German Empire was known as the Kaiserreich, signifying imperial rule headed by the Prussian Hohenzollern monarch. It combined authoritarian monarchical leadership with modern industrial and military might.',
  0.13: "The Austro-Prussian War of 1866 lasted only seven weeks and ended with Prussia's crushing victory at the Battle of Sadowa (Königgrätz). Prussia's breach-loading Dreyse needle rifles and rail mobilization proved decisive.",
  0.14: 'King Wilhelm I of Prussia was crowned the first German Emperor (Kaiser) at the Palace of Versailles in January 1871. He ruled until his death in 1888, leaving day-to-day policy largely to Chancellor Bismarck.',
  0.15: "Bismarck recognized that a shared war against an external aggressor would overcome southern German reluctance to accept Prussian dominance. France's declaration of war triggered defensive treaties that united all German states under Prussian command.",
  0.16: 'Emperor Napoleon III was decisively defeated and captured along with over 100,000 French soldiers at the Battle of Sedan on 2 September 1870. His surrender triggered the immediate collapse of the Second French Empire and the birth of the Third Republic.',
  0.17: "Alsace-Lorraine contained rich deposits of high-grade iron ore and extensive coal reserves that fueled Germany's rapid industrial expansion. Losing these resources severely weakened French heavy industrial and steel output.",
  0.18: "The annexation of Alsace-Lorraine created a permanent wound in French national pride, enshrined in schools and politics as 'revanche'. It guaranteed that France would seize any future diplomatic opportunity to crush German hegemony.",
  0.19: 'The sudden emergence of a unified, heavily populated, and industrialized military powerhouse in Central Europe disrupted the centuries-old balance of power. European diplomats spent the next four decades attempting to balance or contain German strength.',

  // Lesson 1: Bismarck's Alliance System & Kaiser Wilhelm II (20 Qs)
  '1.0':
    'Otto von Bismarck dominated European diplomacy as German Chancellor from 1871 until his dismissal by Wilhelm II in 1890. His complex web of alliances aimed to isolate France and preserve the European status quo.',
  1.1: "Kaiser Wilhelm I worked in close partnership with Bismarck, allowing the 'Iron Chancellor' extraordinary autonomy in directing German foreign policy. His death in 1888 began the brief reign of Frederick III and the accession of Wilhelm II.",
  1.2: "The German Empire was formally proclaimed in January 1871 in the Hall of Mirrors at Versailles. This unified 25 states under the Prussian monarchy, creating Europe's most formidable land military power.",
  1.3: 'The annexation of Alsace-Lorraine in 1871 permanently poisoned relations between Berlin and Paris. Bismarck recognized that France would never accept the loss and made diplomatic isolation of France his top priority.',
  1.4: 'The coronation of Wilhelm I in the Palace of Versailles was a calculated show of imperial triumph over defeated France. It left an enduring legacy of French humiliation that was later avenged in the same room at the 1919 peace conference.',
  1.5: 'Germany demanded a punitive war indemnity of 5 billion gold francs, intending to paralyze the French economy for years. Surprisingly, the French public subscribed patriotic loans and paid off the entire debt ahead of schedule.',
  1.6: "Kaiser Wilhelm II ascended the imperial throne in 1888 and forced Bismarck's resignation in 1890 over policy disagreements. The impetuous young Kaiser favored an assertive, aggressive foreign policy known as Weltpolitik.",
  1.7: 'The secret Reinsurance Treaty of 1887 ensured mutual neutrality between Germany and Russia unless one attacked France or Austria. Wilhelm II foolishly allowed it to lapse in 1890, driving Russia straight into the arms of France.',
  1.8: "Following the expiration of the Reinsurance Treaty, France provided massive industrial loans to Russia, leading to the Franco-Russian Alliance of 1894. This broke France's diplomatic isolation and created Germany's dreaded encirclement.",
  1.9: "Germany's central geographic position between France and Russia made a two-front war its supreme strategic nightmare. German military planning was obsessively designed to eliminate one opponent before the other could mobilize.",
  '1.10':
    "Devised in 1905 by Count Alfred von Schlieffen, the Schlieffen Plan aimed to defeat France within six weeks through Belgium before turning east. It assumed Russia's vast size would require six weeks to complete railway mobilization.",
  1.11: "Napoleon III's personal capture at Sedan on 2 September 1870 destroyed the French Second Empire. A republican Government of National Defense took over in Paris and continued fighting until starved into submission in 1871.",
  1.12: 'Bismarck understood that Catholic southern German states like Bavaria and Baden were suspicious of Protestant Prussian domination. A defensive national war against French aggression ignited patriotic solidarity that cemented unification.',
  1.13: "The annexation of Alsace-Lorraine was pushed by Prussian military commanders for strategic buffer territory, despite Bismarck's private reservations. It ensured that France remained an irreconcilable enemy until World War One.",
  1.14: 'King Wilhelm I of Prussia became Kaiser Wilhelm I of the German Empire on 18 January 1871. He was initially reluctant to accept the imperial title, preferring his hereditary Prussian crown.',
  1.15: "Bismarck selectively edited a telegraph recounting King Wilhelm's polite conversation with the French ambassador at Bad Ems to make both sides appear insulted. Published on Bastille Day, it incited French public outrage and prompted war.",
  1.16: 'At the Battle of Sedan, Prussian artillery encircled the French army, forcing Napoleon III to surrender his sword. The Emperor was deposed in Paris two days later and spent his final years in exile in England.',
  1.17: 'The Treaty of Frankfurt, signed in May 1871, formally established peace between the new German Empire and France. It formalized the cession of Alsace-Lorraine and imposed the 5-billion-franc indemnity.',
  1.18: 'Bismarck knew that an alliance between France and Russia would sandwich Germany between two hostile continental armies. His entire diplomatic system was calibrated to maintain friendship with Russia to prevent encirclement.',
  1.19: 'Proclaiming the German Empire in the Hall of Mirrors was a supreme theatrical display of Prussian triumph over French history. King Louis XIV had built the room to celebrate French victories over German lands.',

  // Lesson 2: Imperialism & The Moroccan Crises (11 Qs)
  '2.0':
    "The 'Scramble for Africa' saw European empires divide nearly the entire African continent between 1881 and 1914. Colonial rivalries generated intense diplomatic friction, military standoffs, and nationalistic pride.",
  2.1: "Kaiser Wilhelm II declared that Germany demanded its 'place in the sun', arguing that a great industrial power required a global colonial empire. This aggressive posture alienated Britain and fueled European imperial tensions.",
  2.2: 'The First Moroccan Crisis erupted in 1905 when Kaiser Wilhelm II landed at Tangier to challenge growing French influence. His provocation backfired completely, cementing Anglo-French military coordination instead of splitting them.',
  2.3: "Hosted by Bismarck in 1884–85, the Berlin Conference established the principle of 'effective occupation' for claiming African territory. It aimed to prevent European wars over African resources, but accelerated the colonial land grab.",
  2.4: 'By 1914, Britain ruled the largest empire in history, covering a quarter of the globe and controlling key African territories from Cairo to the Cape. This vast global presence made Britain protective of its maritime trade lanes.',
  2.5: "Wilhelm II felt humiliated that Germany possessed only modest colonies compared to the vast empires of Britain and France. His demand for overseas colonies ('Weltpolitik') was intended to prove Germany's arrival as a global superpower.",
  2.6: "In March 1905, the Kaiser arrived in Tangier on a white stallion and gave a provocative speech supporting the Sultan of Morocco's independence. His goal was to test the newly signed Anglo-French Entente and isolate France.",
  2.7: 'At the 1906 Algeciras Conference, only Austria-Hungary supported Germany, while Britain, Russia, and the US backed France. The conference gave France control over Moroccan police and banking, leaving Germany bitterly isolated.',
  2.8: "In July 1911, Germany dispatched the naval gunboat Panther to the Moroccan port of Agadir to contest French troop deployments. Known as the Panther's Leap, this aggressive gunboat diplomacy ignited the Second Moroccan Crisis.",
  2.9: "Faced with stern British warnings in David Lloyd George's Mansion House speech, Germany backed down in exchange for a slice of French Congo. The crisis heightened German military resentment and domestic nationalist pressure.",
  '2.10':
    'The Moroccan Crises convinced Britain and France that Germany was an aggressive rogue power intent on European dominance. Secret Anglo-French staff talks began, transforming the loose 1904 diplomatic entente into a de facto military alliance.',

  // Lesson 3: The Anglo-German Naval Race (11 Qs)
  '3.0':
    'Launched in 1906, HMS Dreadnought revolutionized naval warfare with its uniform battery of ten 12-inch heavy guns and steam turbine propulsion. Its superior speed and devastating firepower instantly made all previous battleships obsolete.',
  3.1: "Grand Admiral Alfred von Tirpitz headed the Imperial German Naval Office, directing Germany's massive naval buildup through successive Navy Laws. He aimed to build a fleet capable of challenging British command of the North Sea.",
  3.2: "Britain's 'Two-Power Standard', codified in the Naval Defence Act 1889, required the Royal Navy to maintain a fleet of battleships at least equal to the combined strength of the next two largest navies. It safeguarded Britain's island security and maritime empire.",
  3.3: "HMS Dreadnought introduced an 'all-big-gun' armament and steam turbines, allowing it to fire broadsides over twice as heavy as older pre-dreadnoughts at greater range. Its launch rendered previous naval inventories instantly obsolete.",
  3.4: "By making all existing battleships obsolete, HMS Dreadnought wiped out Britain's vast numerical advantage in capital ships. It handed Germany a level playing field, sparking a frantic race to build new dreadnought-class vessels.",
  3.5: "Tirpitz's 'Risk Theory' (Risikogedanke) argued that Germany needed a battle fleet so powerful that even the Royal Navy would suffer catastrophic damage fighting it. Tirpitz believed this would force Britain to make diplomatic concessions.",
  3.6: "During the 1909 naval panic, the British public and press campaigned aggressively for increased shipbuilding with the rhyming slogan 'We want eight and we won't wait!'. The British government doubled its construction program to meet public demand.",
  3.7: 'Because Britain was an island reliant on imported food and raw materials, naval dominance was a matter of national survival. A hostile fleet controlling the English Channel could starve Britain into submission within weeks.',
  3.8: 'Between 1898 and 1912, Germany passed five separate Naval Laws authorizing the construction of dozens of modern battleships and cruisers. These laws directly threatened British naval supremacy in home waters.',
  3.9: "By 1914, Britain had decisively won the naval construction race, deploying 29 modern dreadnoughts compared to Germany's 17. The British economic base and shipyards proved capable of outbuilding German yards at a two-to-one ratio.",
  '3.10':
    "The naval race convinced the British government that Germany represented an existential threat to British security. It pushed Britain to abandon its traditional policy of 'Splendid Isolation' and settle colonial disputes with France and Russia.",

  // Lesson 4: The Alliance System & Entente Cordiale (11 Qs)
  '4.0':
    'The Triple Entente of 1907 brought together Britain, France, and Russia in a diplomatic counterweight to the Triple Alliance. Although not a formal military pact, it consolidated mutual security commitments across Europe.',
  4.1: 'Although Italy had been a founding member of the Triple Alliance since 1882, it declared neutrality in 1914 and joined the Entente in 1915 under the secret Treaty of London. Italy coveted Austrian territories in Trentino, Istria, and Dalmatia.',
  4.2: "Throughout the late 19th century, Britain pursued 'Splendid Isolation', refusing permanent peacetime continental military alliances. Growing German naval power and diplomatic isolation during the Boer War forced Britain to abandon this policy.",
  4.3: 'The Triple Alliance, formed in 1882, bound Germany, Austria-Hungary, and Italy to assist each other if attacked by France or multiple powers. It formed the central core of the Central Powers in early 20th-century diplomacy.',
  4.4: 'By 1907, the Triple Entente linked Britain, France, and Russia through a series of bilateral accords (Franco-Russian 1894, Entente Cordiale 1904, Anglo-Russian 1907). It surrounded the Central Powers with hostile diplomatic partners.',
  4.5: 'The fundamental flaw of the European alliance system was that it created a chain reaction of mutual obligations. A localized regional dispute in the Balkans could automatically pull all major powers into an inescapable continental war.',
  4.6: "When Kaiser Wilhelm II refused to renew Bismarck's Reinsurance Treaty in 1890, Tsar Alexander III turned to democratic France for capital and arms. Their 1894 military convention ensured mutual military mobilization if attacked by Germany.",
  4.7: 'The 1904 Entente Cordiale settled long-standing colonial disputes between Britain and France, recognizing French preeminence in Morocco and British control in Egypt. It was not a military alliance, but established deep diplomatic cooperation.',
  4.8: "Britain abandoned isolationism after realizing that Germany's naval expansion and aggressive diplomacy threatened European stability. British leaders recognized that a German victory over France would leave one hostile superpower dominating the continent.",
  4.9: "Wilhelm II's 'Weltpolitik' (World Policy) abandoned Bismarck's cautious continental diplomacy in favor of aggressive overseas expansion, naval buildup, and imperial prestige. It heightened British and French fears of German intentions.",
  '4.10':
    "Italy was widely regarded as the weak link in the Triple Alliance due to historic rivalries with Austria-Hungary over unredeemed Italian-speaking lands ('Italia Irredenta'). Italy signed secret non-aggression pacts with France as early as 1902.",

  // Lesson 5: The Balkans & The Sarajevo Assassination (11 Qs)
  '5.0':
    'Gavrilo Princip was a 19-year-old Bosnian Serb student and member of the revolutionary nationalist group Young Bosnia. He fired the fatal pistol shots that killed Archduke Franz Ferdinand and his wife Sophie in Sarajevo.',
  5.1: "The Black Hand ('Union or Death') was a clandestine Serbian military society led by Colonel Dragutin Dimitrijević ('Apis'). It provided weapons, cyanide pills, and training to the assassins to promote a Greater South Slavic state.",
  5.2: 'Archduke Franz Ferdinand was assassinated on 28 June 1914, St. Vitus Day (Vidovdan), a sacred Serbian national anniversary commemorating the 1389 Battle of Kosovo. Visiting Sarajevo on this sensitive date provoked intense nationalist outrage.',
  5.3: 'In 1908, Austria-Hungary formally annexed the former Ottoman provinces of Bosnia and Herzegovina, which it had occupied since 1878. The annexation sparked the Bosnian Crisis, enraging Serbia and Russia who viewed the territory as Slavic land.',
  5.4: 'Archduke Franz Ferdinand was the nephew of Emperor Franz Joseph and heir presumptive to the dual Austro-Hungarian monarchy. His moderate plan to grant Slavs equal political status (trialism) was feared by Serbian nationalists who wanted complete separation.',
  5.5: 'The Black Hand smuggled Serbian army revolvers, hand grenades, and cyanide vials across the border to the conspirators in Sarajevo. Chief of Serbian military intelligence Colonel Dimitrijević oversaw the conspiracy.',
  5.6: 'Earlier on the morning of 28 June, conspirator Nedeljko Čabrinović threw a bomb at the imperial motorcade that bounced off the car and wounded bystanders. The Archduke continued his official schedule before deciding to visit wounded officers in hospital.',
  5.7: "While en route to the hospital, the imperial driver took a wrong turn onto Franz Josef Street and attempted to reverse, stalling the open-topped vehicle. Gavrilo Princip was standing outside Schiller's Delicatessen and stepped forward to fire point-blank.",
  5.8: "On 5 July 1914, Kaiser Wilhelm II issued the fateful 'Blank Cheque' to Austria-Hungary, promising unconditional German military backing for harsh measures against Serbia. This guaranteed that Austria felt secure enough to issue an ultimatum.",
  5.9: 'On 23 July 1914, Vienna delivered a 48-hour ultimatum containing ten intentionally humiliating demands designed to violate Serbian sovereignty. Austria-Hungary intended to provoke a war to destroy Serbian regional power once and for all.',
  '5.10':
    "Britain entered the war on 4 August 1914 after Germany violated the 1839 Treaty of London by invading neutral Belgium to execute the Schlieffen Plan. German Chancellor Bethmann Hollweg dismissively referred to the treaty as a mere 'scrap of paper'.",

  // Lesson 6: The July Crisis & Historiography (11 Qs)
  '6.0':
    "Archduke Franz Ferdinand's assassination on 28 June 1914 served as the catalyst that transformed simmering imperial tensions into an active diplomatic crisis. The resulting Austrian desire to punish Serbia triggered the alliance system.",
  6.1: 'The Black Hand was a radical pan-Slavic paramilitary network composed largely of Serbian army officers and civil servants. They aimed to liberate South Slavs from Austro-Hungarian imperial rule to form a unified Greater Serbia.',
  6.2: 'By 1914, Europe was polarized into two opposing armed camps: the Triple Entente (Britain, France, Russia) and the Triple Alliance (Germany, Austria-Hungary, Italy). This rigid bipolar structure meant any regional shock threatened general war.',
  6.3: 'The Triple Entente brought together Britain, France, and Russia to deter German continental hegemony. Although not an ironclad military pact, mutual diplomatic coordination and shared military plans bound the three powers together.',
  6.4: "The 'Blank Cheque' issued by Germany on 5 July assured Vienna of unshakeable military support even if punitive action against Serbia provoked war with Russia. It fatally removed any diplomatic incentive for Austria to show restraint.",
  6.5: 'The Schlieffen Plan required German forces to invade neutral Belgium to wheel around French defenses and capture Paris within 42 days. Its inflexible railway timetables meant German military mobilization was functionally equivalent to declaring war.',
  6.6: 'The 1839 Treaty of London was a multilateral treaty in which major European powers guaranteed the perpetual neutrality and independence of Belgium. Britain honoured this obligation when German divisions crossed the Belgian frontier in August 1914.',
  6.7: "In 1961, German historian Fritz Fischer published 'Griff nach der Weltmacht' ('Germany's Aims in the First World War'), arguing Germany deliberately sought continental war in 1914 to break encirclement. Fischer's thesis sparked a revolution in WWI historiography.",
  6.8: 'Article 231 of the Treaty of Versailles forced Germany to accept sole moral and financial responsibility for causing all loss and damage of the war. Widely resented in Weimar Germany, it became a potent weapon for nationalist propaganda.',
  6.9: 'Between 1898 and 1914, Britain and Germany engaged in an expensive naval arms race centered on dreadnought construction. The rivalry heightened strategic paranoia, poisonously convincing British leaders that Germany intended to challenge Royal Navy supremacy.',
  '6.10':
    "In 'The Sleepwalkers' (2012), historian Christopher Clark argues that the outbreak of war was not the master plan of a single power, but a complex multilateral diplomatic failure. European leaders acted defensively on flawed assumptions, blindly stumbling into war.",
};

(async () => {
  try {
    const fileUrl = pathToFileURL(dataJsPath).href;
    const mod = await import(fileUrl);
    const unitData = mod.default || mod.unitData || mod.great_war;

    if (!unitData || !unitData.lessons) {
      console.error('❌ Failed to load Great War unit data.');
      process.exit(1);
    }

    let enrichedCount = 0;
    unitData.lessons.forEach((lesson, lIdx) => {
      if (!lesson.quiz) return;
      lesson.quiz.forEach((q, qIdx) => {
        const key = `${lIdx}.${qIdx}`;
        const expl = explanations[key];
        if (expl) {
          q.explanation = expl;
          enrichedCount++;
        } else {
          console.warn(
            `⚠️ Missing explanation for Great War question ${key}: ${q.q || q.question}`,
          );
        }
      });
    });

    const updatedCode = `const great_war = ${JSON.stringify(unitData, null, 2)};\n\nexport const unitData = great_war;\nexport default great_war;\n`;

    fs.writeFileSync(dataJsPath, updatedCode, 'utf8');
    console.log(
      `\n🎉 Successfully injected ${enrichedCount} historian explanations into units/great_war/data.js!`,
    );
  } catch (err) {
    console.error('❌ Error updating Great War data:', err);
    process.exit(1);
  }
})();
