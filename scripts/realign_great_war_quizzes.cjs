const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function seededShuffle(arr, seed) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  const res = [...arr];
  for (let i = res.length - 1; i > 0; i--) {
    hash = Math.sin(hash++) * 10000;
    const j = Math.floor((hash - Math.floor(hash)) * (i + 1));
    [res[i], res[j]] = [res[j], res[i]];
  }
  return res;
}

function q(question, answer, explanation, distractors, seed) {
  // Validate distinct options
  const uniqueOpts = new Set([answer, ...distractors].map((s) => s.trim().toLowerCase()));
  if (uniqueOpts.size !== 4) {
    throw new Error(`Duplicate option detected in question: "${question}"`);
  }
  const options = seededShuffle([answer, ...distractors], seed || question);
  return {
    question: question,
    q: question,
    options: options,
    answer: answer,
    a: answer,
    explanation: explanation,
  };
}

const GREAT_WAR_EXPANDED_QUIZZES = {
  lesson_2: [
    // Core Retrieval (1-10)
    q(
      'What term describes the rapid colonization and partition of Africa by European powers between 1881 and 1914?',
      'The Scramble for Africa',
      'The "Scramble for Africa" saw European empires divide nearly the entire African continent between 1881 and 1914, driven by industrial resource demands, strategic rivalries, and national prestige.',
      ['The Great Game', 'Manifest Destiny', 'The Continental System'],
      'gw_l2_1',
    ),
    q(
      'Which European monarch claimed the Congo Free State as his personal private property, brutally exploiting it for rubber and ivory?',
      'King Leopold II of Belgium',
      'King Leopold II established the Congo Free State as his personal fiefdom in 1885, instituting a reign of terror, forced labour, and mutilation to maximize rubber profits.',
      [
        'Kaiser Wilhelm I of Germany',
        'King Victor Emmanuel II of Italy',
        'King Alfonso XIII of Spain',
      ],
      'gw_l2_2',
    ),
    q(
      'In which year did Otto von Bismarck convene the Berlin Conference to establish ground rules for European colonization in Africa?',
      '1884',
      'The 1884–1885 Berlin Conference established the principle of "effective occupation", requiring European powers to physically occupy territory to claim sovereignty.',
      ['1871', '1898', '1905'],
      'gw_l2_3',
    ),
    q(
      "Which German leader launched Weltpolitik and famously demanded Germany's 'place in the sun' in Africa and beyond?",
      'Kaiser Wilhelm II',
      'Wilhelm II, who ascended the throne in 1888 and dismissed Bismarck in 1890, pursued an aggressive expansionist foreign policy known as Weltpolitik to challenge British and French dominance.',
      [
        'Chancellor Otto von Bismarck',
        'Field Marshal Helmuth von Moltke',
        'Emperor Franz Joseph I',
      ],
      'gw_l2_4',
    ),
    q(
      'Which European power controlled the largest and most commercially valuable empire in Africa by 1914?',
      'Great Britain',
      'Great Britain held the most lucrative colonial territories, including South Africa, Egypt, Nigeria, and Kenya, securing vital sea routes to India.',
      ['Germany', 'Belgium', 'Portugal'],
      'gw_l2_5',
    ),
    q(
      'In which year did Kaiser Wilhelm II land in Tangier, sparking the First Moroccan Crisis?',
      '1905',
      'In March 1905, the Kaiser arrived in Tangier to challenge French influence in Morocco and test the strength of the newly signed Anglo-French Entente Cordiale.',
      ['1898', '1902', '1911'],
      'gw_l2_6',
    ),
    q(
      'What did Kaiser Wilhelm II publicly declare during his dramatic 1905 visit to Tangier?',
      'He declared support for Moroccan independence and the Sultan as a free sovereign ruler',
      'By declaring Sultan Abdelaziz an independent ruler, Wilhelm sought to disrupt French colonial plans and force an international conference.',
      [
        'He announced the annexation of Morocco into the German Empire',
        'He offered to sell German dreadnoughts to the Moroccan navy',
        'He demanded the immediate withdrawal of British naval forces from Gibraltar',
      ],
      'gw_l2_7',
    ),
    q(
      'What was the primary outcome of the 1906 Algeciras Conference for Germany?',
      'Germany was diplomatically isolated, with only Austria-Hungary supporting its position',
      'At Algeciras, Britain, Russia, Italy, and Spain backed France. Germany was deeply humiliated, demonstrating that the Entente Cordiale was surprisingly resilient.',
      [
        'Germany was awarded full control over the port of Tangier',
        'France surrendered all colonial claims across North Africa',
        'The Entente Cordiale between Britain and France completely collapsed',
      ],
      'gw_l2_8',
    ),
    q(
      'What aggressive German military action triggered the Second Moroccan Crisis (Agadir Crisis) in July 1911?',
      'Dispatching the gunboat SMS Panther to the Moroccan port of Agadir',
      'Germany sent the gunboat SMS Panther under the pretext of protecting German firms, in a blatant display of "gunboat diplomacy" to coerce colonial concessions from France.',
      [
        'Bombarding the French naval base at Toulon',
        'Invading the British colony of Sierra Leone',
        'Mining the entrance to the Suez Canal',
      ],
      'gw_l2_9',
    ),
    q(
      'How was the 1911 Agadir Crisis officially resolved between France and Germany?',
      'Germany recognized France’s Moroccan protectorate in exchange for ceding a strip of French Congo to German Kamerun',
      'Under the November 1911 Treaty of Fez, Germany accepted French dominance in Morocco in return for 100,000 square miles of territory in Central Africa (Neukamerun).',
      [
        'Germany took full sovereign control of Morocco as a German colony',
        'Britain declared war on Germany and blockaded Hamburg',
        'France surrendered the Suez Canal to the German High Seas Fleet',
      ],
      'gw_l2_10',
    ),

    // Mastery Challenge (11-20)
    q(
      'By 1914, approximately what percentage of the African continent had been brought under European colonial control?',
      'Approximately 90% (up from 10% in 1870)',
      'In 1870, European powers controlled barely 10% of Africa, mostly coastal trade ports; by 1914, through violent conquest and partition, European empires controlled nearly 90%.',
      [
        'Approximately 25%',
        'Approximately 50%',
        '100% (every single square mile without exception)',
      ],
      'gw_l2_11',
    ),
    q(
      'Which German Foreign Secretary delivered the famous 1897 Reichstag speech declaring that Germany demanded its "place in the sun"?',
      'Bernhard von Bülow',
      'Bernhard von Bülow declared on 6 December 1897 that Germany would not permit any foreign power to exclude it from global trade or colonial empire, demanding a "Platz an der Sonne".',
      ['Theobald von Bethmann-Hollweg', 'Alfred von Tirpitz', 'Leo von Caprivi'],
      'gw_l2_12',
    ),
    q(
      'How did the First Moroccan Crisis paradoxically affect the diplomatic relationship between Great Britain and France?',
      'It converted the informal 1904 Entente Cordiale into a robust, coordinated military and naval partnership',
      'Rather than breaking the Entente as Berlin hoped, the crisis prompted secret joint Anglo-French military staff talks, solidifying their alignment against German aggression.',
      [
        'It caused Britain and France to sign a treaty partitioning Spain',
        'It forced Britain to leave Europe and return to Splendid Isolation',
        'It drove France into a secret military alliance with Germany',
      ],
      'gw_l2_13',
    ),
    q(
      'How did Kaiser Wilhelm II physically arrive in Tangier in 1905 to maximize spectacle and challenge French authority?',
      'Riding through the streets on a white horse surrounded by an armed escort to meet the Sultan’s representatives',
      'Wilhelm staged a theatrical royal procession on a white charger through Tangier’s narrow streets, deliberately projecting imperial majesty to defy the French diplomat Eugène Regnault.',
      [
        'Parachuting from a Zeppelin airship into the central market',
        'Arriving secretly disguised as a local merchant on a camel',
        'Leading an amphibious assault with 5,000 Prussian marine infantry',
      ],
      'gw_l2_14',
    ),
    q(
      'Which senior British minister delivered the defiant Mansion House speech in July 1911, warning Germany that Britain would not be treated as of no account?',
      'David Lloyd George (Chancellor of the Exchequer)',
      'Lloyd George warned Germany that if Britain were treated as of no account where its vital interests were affected, "peace at that price would be a humiliation intolerable for a great country like ours."',
      [
        'Winston Churchill (Home Secretary)',
        'Herbert Asquith (Prime Minister)',
        'Sir Edward Grey (Foreign Secretary)',
      ],
      'gw_l2_15',
    ),
    q(
      'What name was given to the territory in Central Africa ceded by France to German Kamerun to settle the 1911 Agadir Crisis?',
      'Neukamerun (New Cameroon)',
      'Under the Treaty of Fez, Germany received Neukamerun—two strips of marshy land granting access to the Congo and Ubangi rivers—which German nationalists condemned as worthless swampland.',
      ['German East Africa', 'Togoland', 'South West Africa'],
      'gw_l2_16',
    ),
    q(
      'What economic interpretation of the Scramble for Africa was famously advanced by Marxist theorist V.I. Lenin in 1916?',
      'Imperialism was the highest stage of capitalism, driven by monopolies desperately seeking raw materials, captive markets, and outlets for surplus capital',
      'Lenin argued that industrial capitalism inevitably created imperial rivalries that made general European war unavoidable as colonial territories were exhausted.',
      [
        'Colonial expansion was purely driven by religious missionary zeal with no economic motives',
        'Colonial empires were unprofitable burdens that weakened industrial economies',
        'The Scramble was an accidental humanitarian effort to end domestic African conflicts',
      ],
      'gw_l2_17',
    ),
    q(
      'What counter-argument do revisionist historians such as A.J.P. Taylor make regarding colonial rivalries in Africa as a cause of the First World War?',
      'Colonial disputes in Africa were all resolved through peaceful diplomatic bargaining and did not directly trigger the war of 1914',
      'Taylor and other revisionists note that Britain, France, and Germany settled all their African border disputes peacefully; the war actually began in the Balkans over European power balances.',
      [
        'Germany conquered the entire African continent before Britain could react',
        'African armies launched an invasion of Europe that caused the Great War',
        'No European powers possessed colonies in Africa prior to August 1914',
      ],
      'gw_l2_18',
    ),
    q(
      'What strategic waterway in Egypt, opened in 1869, made British control of North and East Africa an essential imperial priority?',
      'The Suez Canal',
      'The Suez Canal slashed travel time between Britain and India by thousands of miles, making British control of Egypt and the Red Sea maritime lifeline vital to imperial survival.',
      ['The Panama Canal', 'The Kiel Canal', 'The Bosphorus Strait'],
      'gw_l2_19',
    ),
    q(
      'According to modern historian Margaret MacMillan, what was the primary lasting danger of the Moroccan Crises?',
      'They convinced German leaders that future diplomatic negotiations were useless and only military strength could achieve prestige',
      'MacMillan argues that the humiliation of Algeciras and Agadir created a fatal sense in Berlin that Germany was being encircled, making military leaders more willing to risk general war in 1914.',
      [
        'They convinced France to disband its army and rely entirely on diplomacy',
        'They caused the United States to colonize North Africa',
        'They caused the dissolution of the British Empire in 1911',
      ],
      'gw_l2_20',
    ),
  ],

  lesson_3: [
    // Core Retrieval (1-10)
    q(
      'What revolutionary all-big-gun British battleship was launched in December 1906, transforming global naval warfare?',
      'HMS Dreadnought',
      'HMS Dreadnought featured a uniform battery of ten 12-inch heavy guns and steam turbine engines, rendering every existing battleship in the world instantly obsolete.',
      ['HMS Victory', 'HMS Invincible', 'HMS Iron Duke'],
      'gw_l3_1',
    ),
    q(
      'Which German Admiral was appointed State Secretary of the Imperial Navy Office in 1897 to build Germany’s High Seas Fleet?',
      'Admiral Alfred von Tirpitz',
      'Admiral von Tirpitz orchestrated the German Naval Laws of 1898 and 1900, establishing a massive battle fleet to challenge British maritime hegemony.',
      ['Admiral Reinhard Scheer', 'Admiral Franz von Hipper', 'Admiral Maximilian von Spee'],
      'gw_l3_2',
    ),
    q(
      'What traditional British naval doctrine mandated that the Royal Navy must equal the combined strength of the next two largest navies?',
      'The Two-Power Standard',
      'Established in the Naval Defence Act of 1889, the Two-Power Standard ensured Britain could defeat any hostile coalition of two rival navies (originally France and Russia).',
      ['The Dreadnought Doctrine', 'Pax Britannica Standard', 'The Blue Water Policy'],
      'gw_l3_3',
    ),
    q(
      'What term describes the century of British global maritime dominance between the Battle of Trafalgar (1805) and the early 1900s?',
      'Pax Britannica',
      'During Pax Britannica ("British Peace"), the Royal Navy patrolled global trade routes, suppressed piracy, and enforced maritime security without facing a serious naval rival.',
      ['Pax Romana', 'The Gilded Age', 'The Concert of Europe'],
      'gw_l3_4',
    ),
    q(
      'Why did the launch of HMS Dreadnought inadvertently create a severe strategic dilemma for Great Britain?',
      'It rendered Britain’s huge fleet of older pre-dreadnought battleships obsolete, resetting the naval race to zero',
      'By making older battleships obsolete, Britain effectively wiped out its own overwhelming numerical superiority, allowing Germany to compete on equal terms ship-for-ship.',
      [
        'It bankrupt the British economy and forced the government to sell its merchant fleet',
        'Its guns were defective and could not fire without exploding',
        'It was immediately captured by the German navy during sea trials',
      ],
      'gw_l3_5',
    ),
    q(
      'What was the central principle of Admiral Tirpitz’s "Risk Theory" (Risikogedanke)?',
      'Building a German fleet large enough that Britain would not risk attacking it for fear of losing naval supremacy to other powers',
      'Tirpitz calculated that if Germany possessed a fleet two-thirds the size of Britain’s, the Royal Navy would suffer such catastrophic losses in a clash that Britain would become vulnerable to third powers.',
      [
        'Relying exclusively on submarines to sink all British civilian shipping',
        'Selling German warships to the United States to provoke a war with Britain',
        'Refusing to build capital ships and relying entirely on coastal artillery',
      ],
      'gw_l3_6',
    ),
    q(
      'What popular protest slogan was chanted by British politicians and the public in 1909 demanding eight new dreadnoughts?',
      '"We want eight and we won’t wait!"',
      'The 1909 naval scare sparked a nationwide press campaign spearheaded by the Navy League, demanding the Liberal government lay down eight dreadnoughts rather than the proposed four.',
      [
        '"Rule Britannia, Rule the Waves!"',
        '"A Ship for a Ship, a Gun for a Gun!"',
        '"Keep the Seas or Lose the Empire!"',
      ],
      'gw_l3_7',
    ),
    q(
      'Why did British strategists view the expansion of the German High Seas Fleet as an existential threat?',
      'Britain was an island dependent on maritime imports for two-thirds of its food, whereas Germany had no vital overseas supply lines',
      'Winston Churchill noted that for Britain, a supreme navy was a matter of life and death, whereas for Germany, a battle fleet was essentially a "luxury".',
      [
        'Germany intended to use its navy to conquer Australia and Canada in 1906',
        'The German fleet was commanded entirely by French naval officers',
        'Britain had no land army whatsoever to defend London',
      ],
      'gw_l3_8',
    ),
    q(
      'Which legislative measures passed in 1898 and 1900 provided the legal and financial framework to build Germany’s battle fleet?',
      'The German Naval Laws (Flottengesetze)',
      'Tirpitz secured long-term multi-year funding through the Reichstag, shielding German naval construction from annual parliamentary budget cuts.',
      ['The Dreadnought Acts', 'The High Seas Ordinances', 'The Imperial Armament Decrees'],
      'gw_l3_9',
    ),
    q(
      'By August 1914, what was the final comparative score of dreadnought-class capital ships completed by Britain and Germany?',
      'Britain had completed 29 dreadnoughts compared to Germany’s 17',
      'Through massive industrial mobilization and higher spending, Britain comfortably out-built Germany, securing decisive numerical and technological dominance by the outbreak of war.',
      [
        'Germany had completed 45 dreadnoughts compared to Britain’s 20',
        'Both nations possessed exactly 12 dreadnoughts each',
        'Britain possessed 50 dreadnoughts while Germany had built only 3',
      ],
      'gw_l3_10',
    ),

    // Mastery Challenge (11-20)
    q(
      'Which visionary and ruthless British Admiral was appointed First Sea Lord in October 1904 and drove the creation of HMS Dreadnought?',
      'Admiral Sir John "Jackie" Fisher',
      'Fisher was a ferocious reformer whose mottos included "Speed is armor" and "Hit first, hit hard, and keep on hitting", ruthlessly scrapping obsolete warships to modernize the fleet.',
      ['Admiral David Beatty', 'Admiral John Jellicoe', 'Admiral Prince Louis of Battenberg'],
      'gw_l3_11',
    ),
    q(
      'In what record-breaking construction time was HMS Dreadnought built at Portsmouth Royal Dockyard?',
      '366 days (one year and one day)',
      'Laid down in October 1905 and launched in February 1906, Dreadnought’s completion in just over a year stunned the world and proved British shipyard supremacy.',
      ['90 days', 'Three full years', 'Five years and six months'],
      'gw_l3_12',
    ),
    q(
      'What revolutionary propulsion technology was installed in HMS Dreadnought, enabling sustained top speeds of 21 knots?',
      'Parsons steam turbine engines',
      'Replacing traditional reciprocating piston engines with steam turbines provided unprecedented reliability, reduced vibration for gunnery, and superior speed.',
      [
        'Internal combustion diesel engines',
        'Triple-expansion coal engines',
        'Early nuclear propulsion units',
      ],
      'gw_l3_13',
    ),
    q(
      'What massive civil engineering project was Imperial Germany forced to undertake between 1907 and 1914 so its dreadnoughts could traverse between the Baltic and North Seas?',
      'Widening and deepening the Kiel Canal',
      'The original Kiel Canal was too narrow for beamier dreadnoughts. Germany spent tens of millions of marks widening it; work was completed in June 1914 just weeks before the July Crisis.',
      [
        'Building the Elbe-Trave Canal',
        'Excavating the Hamburg Ship Channel',
        'Dredging the Rhine-Danube Canal',
      ],
      'gw_l3_14',
    ),
    q(
      'What diplomatic controversy erupted in October 1908 when Kaiser Wilhelm II publicly declared that the English were "mad as March hares"?',
      'The Daily Telegraph Affair',
      'In an unvetted newspaper interview, Wilhelm claimed he was Britain’s friend but that the British public were insane, causing immense outrage in Britain and humiliation in Berlin.',
      ['The Panther Incident', 'The Tangier Dispatch', 'The Zimmermann Telegram'],
      'gw_l3_15',
    ),
    q(
      'Which two radical Liberal ministers initially opposed building eight dreadnoughts in 1909 to protect funding for old age pensions before yielding to cabinet pressure?',
      'David Lloyd George and Winston Churchill',
      'Lloyd George and Churchill initially argued that money was needed for the "People’s Budget" social reforms, but ultimately compromised on laying down eight battleships.',
      [
        'Herbert Asquith and Edward Grey',
        'Arthur Balfour and Joseph Chamberlain',
        'Ramsay MacDonald and Arthur Henderson',
      ],
      'gw_l3_16',
    ),
    q(
      'What influential thesis was advanced by historian Paul Kennedy in "The Rise of the Anglo-German Antagonism" (1980)?',
      'Naval Determinism: the naval arms race was the single decisive structural cause that permanently destroyed Anglo-German relations and made war inevitable',
      'Kennedy argued that Germany’s challenge to British sea power directly threatened the core of the British Empire, leaving London no choice but to align with France and Russia.',
      [
        'Economic cooperation between Britain and Germany made war impossible',
        'The naval race was a minor sideshow orchestrated entirely by American arms manufacturers',
        'Britain was solely to blame for deliberately attacking German merchant ships in peacetime',
      ],
      'gw_l3_17',
    ),
    q(
      'What counter-argument do modern military historians such as Hew Strachan advance regarding the naval race by 1912?',
      'The naval arms race had effectively ended in British victory by 1912, and land army expansions on the Continent became the true driver of 1914 tensions',
      'By 1912, Germany had abandoned trying to match the Royal Navy to divert its financial resources to expanding the Kaiser’s land army in response to Russian rearmament.',
      [
        'Germany successfully invaded the British coast in 1913',
        'Britain dismantled its entire fleet and surrendered naval superiority',
        'The dreadnought was proven useless in tests and replaced with wooden sailing ships',
      ],
      'gw_l3_18',
    ),
    q(
      'What new naval weapon increasingly threatened dreadnought capital ships before 1914, leading Jackie Fisher to accurately predict that submarines would dominate future warfare?',
      'The automotive torpedo and the submarine (U-boat)',
      'Torpodoes fired from submerged submarines or fast destroyers could sink a multi-million-pound battleship in seconds, showing that capital ships were vulnerable.',
      ['Aircraft carriers', 'Guided anti-ship missiles', 'Sonar-guided depth charges'],
      'gw_l3_19',
    ),
    q(
      'What was the primary geopolitical consequence of the Anglo-German naval rivalry for British foreign policy?',
      'It forced Great Britain to abandon Splendid Isolation and conclude defensive ententes with its historic rivals, France and Russia',
      'Facing a hostile German navy across the North Sea, Britain redeployed the bulk of its fleet home and settled overseas colonial disputes with France (1904) and Russia (1907).',
      [
        'Britain signed a permanent military alliance with the United States',
        'Britain surrendered its colonies in Africa and Asia to Germany',
        'Britain declared war on Russia and invaded the Baltic',
      ],
      'gw_l3_20',
    ),
  ],

  lesson_4: [
    // Core Retrieval (1-10)
    q(
      'Which three great powers formed the Triple Alliance in 1882?',
      'Germany, Austria-Hungary, and Italy',
      'The Triple Alliance committed Germany, Austria-Hungary, and Italy to mutual military defense if attacked by France or two other great powers.',
      [
        'Britain, France, and Russia',
        'Germany, Russia, and Austria-Hungary',
        'France, Russia, and Italy',
      ],
      'gw_l4_1',
    ),
    q(
      'Which three nations formed the counterbalancing Triple Entente by 1907?',
      'Great Britain, France, and Russia',
      'The Triple Entente linked Britain, France, and Russia through a series of bilateral agreements to counterbalance the growing power of the Triple Alliance.',
      [
        'Germany, Austria-Hungary, and Italy',
        'Britain, Germany, and Russia',
        'France, Spain, and Russia',
      ],
      'gw_l4_2',
    ),
    q(
      'What traditional British foreign policy of avoiding long-term continental alliances was abandoned after 1900?',
      'Splendid Isolation',
      'Under Prime Minister Lord Salisbury, Britain maintained "Splendid Isolation", relying on the Royal Navy and avoiding binding military pacts in Europe.',
      ['Appeasement', 'The Two-Power Standard', 'Gunboat Diplomacy'],
      'gw_l4_3',
    ),
    q(
      'What was the primary strategic objective of Otto von Bismarck’s foreign policy following German unification in 1871?',
      'To keep France diplomatically isolated and prevent Germany from facing a two-front war',
      'Bismarck knew France would seek revenge for the loss of Alsace-Lorraine, so he constructed a web of alliances to ensure France could never find a continental ally.',
      [
        'To conquer the Russian Empire and annex Ukraine',
        'To build the world’s largest navy and destroy Great Britain',
        'To overthrow the Austro-Hungarian monarchy',
      ],
      'gw_l4_4',
    ),
    q(
      'What defensive military alliance was signed between Germany and Austria-Hungary in October 1879?',
      'The Dual Alliance',
      'The Dual Alliance formed the cornerstone of Central Power diplomacy, promising mutual military assistance if either empire was attacked by Tsarist Russia.',
      ['The Reinsurance Treaty', 'The Holy Alliance', 'The Dreikaiserbund'],
      'gw_l4_5',
    ),
    q(
      'In what year did France and Tsarist Russia conclude their breakthrough military convention, ending French diplomatic isolation?',
      '1894',
      'The Franco-Russian Alliance of 1894 ended French isolation and guaranteed that Germany would face a catastrophic two-front war if it attacked either nation.',
      ['1882', '1890', '1904'],
      'gw_l4_6',
    ),
    q(
      'What colonial agreement was signed between Great Britain and France in April 1904, settling disputes in Egypt and Morocco?',
      'The Entente Cordiale',
      'The Entente Cordiale ("Cordial Understanding") resolved longstanding colonial frictions, recognizing British paramountcy in Egypt and French influence in Morocco.',
      ['The Treaty of London', 'The Treaty of Paris', 'The Triple Entente Pact'],
      'gw_l4_7',
    ),
    q(
      'Which 1907 diplomatic convention resolved imperial rivalries in Persia, Afghanistan, and Tibet, completing the Triple Entente?',
      'The Anglo-Russian Convention',
      'The 1907 agreement settled the historic "Great Game" rivalry between Britain and Russia in Central Asia, allowing the two empires to align against Germany.',
      ['The Treaty of Berlin', 'The Algeciras Act', 'The St. Petersburg Protocol'],
      'gw_l4_8',
    ),
    q(
      'What German foreign policy term, meaning "world policy", reflected Kaiser Wilhelm II’s ambition for global imperial status?',
      'Weltpolitik',
      'Weltpolitik replaced Bismarck’s cautious continental diplomacy (Realpolitik) with an aggressive drive for colonial empire, naval power, and global prestige.',
      ['Realpolitik', 'Kulturkampf', 'Mitteleuropa'],
      'gw_l4_9',
    ),
    q(
      'Which nation was widely regarded as the "weak link" in the Triple Alliance due to its territorial rivalries with Austria-Hungary?',
      'Italy',
      'Italy coveted Austro-Hungarian territories in the Trentino and Trieste, and secretly signed neutrality agreements with France, eventually defecting to the Allies in 1915.',
      ['Germany', 'Austria-Hungary', 'The Ottoman Empire'],
      'gw_l4_10',
    ),

    // Mastery Challenge (11-20)
    q(
      'What secret 1887 treaty pledged neutrality between Germany and Russia, which Kaiser Wilhelm II foolishly allowed to lapse in 1890?',
      'The Reinsurance Treaty',
      'Bismarck considered the Reinsurance Treaty essential to prevent a Franco-Russian alliance; Wilhelm II let it expire in 1890, paving the way for the 1894 Franco-Russian pact.',
      ['The Dual Alliance', 'The League of Three Emperors', 'The Treaty of San Stefano'],
      'gw_l4_11',
    ),
    q(
      'What primary economic motivation compelled autocratic Tsarist Russia to ally with the democratic French Third Republic in 1894?',
      'Massive French financial loans and capital investment to build Russian railways and modernize heavy industry',
      'Despite radical ideological differences, Russian industrialization depended on French bank loans, while France gained a powerful military partner to encircle Germany.',
      [
        'Russia wanted to adopt the French republican constitution',
        'France offered to surrender its colonies in Indochina to Russia',
        'Tsar Alexander III was married to the French President’s daughter',
      ],
      'gw_l4_12',
    ),
    q(
      'What top-secret correspondence between Helmuth von Moltke and Franz Conrad von Hötzendorf in January 1909 converted a defensive alliance into an offensive commitment?',
      'The Moltke-Conrad Dispatches',
      'Moltke assured Conrad that if Austria invaded Serbia and Russia intervened, Germany would mobilize its army against Russia, effectively turning a defensive pact into an offensive blank cheque.',
      ['The Willy-Nicky Letters', 'The Hoyos Mission Papers', 'The Berlin Memorandum'],
      'gw_l4_13',
    ),
    q(
      'What regional crisis in October 1908 brought Europe to the brink of war when Austria-Hungary formally annexed an Ottoman province?',
      'The Bosnian Annexation Crisis',
      'Austria’s unilateral annexation of Bosnia and Herzegovina enraged Serbia and Russia. Germany backed Austria with an ultimatum to Russia, leaving deep resentment in St. Petersburg.',
      ['The First Balkan War', 'The Agadir Crisis', 'The Fashoda Incident'],
      'gw_l4_14',
    ),
    q(
      'What is the central argument of the "Doomsday Machine" thesis of the alliance system, championed by historians like Sidney Fay and Luigi Albertini?',
      'The interlocking military treaties created an automated chain reaction where a localized Balkan dispute inevitably dragged all European great powers into total war',
      'According to Fay and Albertini, alliances converted small regional disputes into systemic global conflicts by eliminating diplomatic flexibility and creating rigid obligations.',
      [
        'Alliances were secret conspiracies orchestrated by arms manufacturers to maximize profits',
        'The Triple Entente was legally bound to surrender if Germany attacked Belgium',
        'Alliances were completely irrelevant because no countries honoured their treaties in 1914',
      ],
      'gw_l4_15',
    ),
    q(
      'What counter-interpretation do modern historians such as Margaret MacMillan advance regarding the role of alliances in July 1914?',
      'Alliances did not make war inevitable; European leaders made conscious, aggressive political choices to mobilize and declare war rather than acting as helpless victims of treaties',
      'MacMillan argues that alliances had preserved peace for decades; in 1914, statesmen chose war because they feared diplomatic humiliation more than military conflict.',
      [
        'Alliances prevented any fighting from taking place outside of the Balkans',
        'European leaders had no knowledge of their alliance obligations in 1914',
        'The alliances were entirely created after the First World War ended',
      ],
      'gw_l4_16',
    ),
    q(
      'What secret agreement did Italy sign with France in 1902, directly undermining its commitments to the Triple Alliance?',
      'The Prinetti-Barrère Agreement',
      'Italy promised France strict neutrality if France were attacked or provoked into war by Germany, demonstrating that Italy was only nominally aligned with Berlin and Vienna.',
      ['The Treaty of London', 'The Pact of Steel', 'The Rome Protocols'],
      'gw_l4_17',
    ),
    q(
      'Why did Field Marshal von Schlieffen calculate that Germany had to knock out France in six weeks before turning to face Russia?',
      'Russia’s vast geography and underdeveloped railway network meant its military mobilization would take six weeks, creating a temporary window of opportunity',
      'Schlieffen calculated that Germany could use its superior rail mobilization to crush France quickly, then transport its troops east to defeat the slow-moving Russian steamroller.',
      [
        'France had no army and was completely undefended',
        'Russia had signed a treaty promising never to fight Germany',
        'Britain had promised to remain strictly neutral if France fell within six weeks',
      ],
      'gw_l4_18',
    ),
    q(
      'Which British Foreign Secretary presided over the formation of the Triple Entente and attempted to mediate the July Crisis of 1914?',
      'Sir Edward Grey',
      'Grey managed British diplomacy from 1905 to 1916, famously observing on the eve of war: "The lamps are going out all over Europe; we shall not see them lit again in our lifetime."',
      ['Lord Lansdowne', 'Lord Curzon', 'Arthur Balfour'],
      'gw_l4_19',
    ),
    q(
      'For how many consecutive years did the European alliance system maintain general peace among the great powers before 1914?',
      '43 years (from the Treaty of Frankfurt in 1871 until August 1914)',
      'Between 1871 and 1914, no major war occurred between the great powers of Europe—the longest period of uninterrupted peace in modern European history up to that point.',
      ['Only 5 years', '100 years', '12 years'],
      'gw_l4_20',
    ),
  ],

  lesson_5: [
    // Core Retrieval (1-10)
    q(
      'In which Austro-Hungarian provincial capital was Archduke Franz Ferdinand assassinated on 28 June 1914?',
      'Sarajevo',
      'Franz Ferdinand was assassinated in Sarajevo, the capital of Bosnia and Herzegovina, which had been annexed by Austria-Hungary in 1908.',
      ['Belgrade', 'Vienna', 'Budapest'],
      'gw_l5_1',
    ),
    q(
      'What was the name of the 19-year-old Bosnian Serb nationalist who fired the fatal shots killing Franz Ferdinand and Duchess Sophie?',
      'Gavrilo Princip',
      'Princip was a member of the revolutionary nationalist movement Young Bosnia, acting with the support of the Black Hand secret society.',
      ['Nedeljko Čabrinović', 'Trifko Grabež', 'Danilo Ilić'],
      'gw_l5_2',
    ),
    q(
      'What secret Serbian nationalist society supplied the weapons, cyanide, and training for the Sarajevo assassins?',
      'The Black Hand (Union or Death)',
      'The Black Hand was a clandestine terrorist network of Serbian military officers committed to liberating South Slavs from Austro-Hungarian rule to create a Greater Serbia.',
      ['The Young Turks', 'The Red Hand', 'The Chetniks'],
      'gw_l5_3',
    ),
    q(
      'What historic Serbian national holiday fell on 28 June, commemorating the 1389 Battle of Kosovo against the Ottoman Empire?',
      'Vidovdan (St. Vitus Day)',
      'Visiting Sarajevo on Vidovdan was seen by Serbian nationalists as an intolerable imperial insult, as it commemorated Serbia’s historic sacrifice for independence.',
      ['Slava Day', 'Orthodox Easter', 'St. George’s Day'],
      'gw_l5_4',
    ),
    q(
      'What unconditional diplomatic and military pledge was issued by Kaiser Wilhelm II to Austria-Hungary on 5 July 1914?',
      'The "Blank Cheque"',
      'Germany assured Austria-Hungary that Berlin would back Vienna unconditionally, even if punitive military action against Serbia dragged Tsarist Russia into war.',
      ['The Reinsurance Treaty', 'The Potsdam Guarantee', 'The Dual Mandate'],
      'gw_l5_5',
    ),
    q(
      'What diplomatic document was delivered by Austria-Hungary to Serbia at 6:00 PM on 23 July 1914?',
      'A 10-point ultimatum with a strict 48-hour deadline',
      'The ultimatum was drafted intentionally to be rejected, containing humiliating demands designed to violate Serbian national sovereignty and justify military invasion.',
      [
        'A formal declaration of immediate war',
        'A peace treaty proposing border adjustments',
        'An offer of imperial federation',
      ],
      'gw_l5_6',
    ),
    q(
      'On what date did Austria-Hungary officially declare war on Serbia, beginning the artillery bombardment of Belgrade?',
      '28 July 1914',
      'Exactly one month after the assassination, Austria declared war on Serbia, setting off the irreversible diplomatic and military chain reaction.',
      ['28 June 1914', '1 August 1914', '4 August 1914'],
      'gw_l5_7',
    ),
    q(
      'What German war plan mandated an immediate, massive strike through neutral Belgium into northern France once mobilization began?',
      'The Schlieffen Plan',
      'Designed by Count Alfred von Schlieffen, the plan required violating Belgian neutrality to wheel around French frontier fortifications and capture Paris in 42 days.',
      ['Plan XVII', 'Operation Michael', 'The Moltke Directive'],
      'gw_l5_8',
    ),
    q(
      'What 1839 international treaty guaranteed Belgian neutrality, which Britain honoured by declaring war on Germany on 4 August 1914?',
      'The Treaty of London',
      'In the 1839 Treaty of London, the European great powers guaranteed Belgium’s neutrality. Britain intervened when German troops crossed the Belgian border on 4 August.',
      ['The Treaty of Utrecht', 'The Treaty of Ghent', 'The Treaty of Vienna'],
      'gw_l5_9',
    ),
    q(
      'What dismissive phrase was used by German Chancellor Bethmann-Hollweg to describe the 1839 Treaty of London to the British ambassador?',
      'A mere "scrap of paper"',
      'Bethmann-Hollweg expressed astonishment that Britain would go to war against a kindred nation just for a "scrap of paper", outraging British and international public opinion.',
      ['A "childish superstition"', 'A "worthless scrap of ribbon"', 'A "dead man’s contract"'],
      'gw_l5_10',
    ),

    // Mastery Challenge (11-20)
    q(
      'What initial assassination attempt on Franz Ferdinand failed on the morning of 28 June 1914?',
      'Nedeljko Čabrinović threw a bomb that bounced off the Archduke’s car and exploded beneath the following vehicle',
      'Čabrinović’s grenade bounced off the folded canvas roof of the Archduke’s cabriolet, wounding twenty spectators and officers in the following car; Čabrinović swallowed expired cyanide and jumped into the shallow river.',
      [
        'A sniper fired from a clocktower but missed by several yards',
        'An assassin attempted to stab the Archduke with a poisoned dagger during a reception',
        'A landmine planted under the Latin Bridge failed to detonate due to damp gunpowder',
      ],
      'gw_l5_11',
    ),
    q(
      'Why was Gavrilo Princip standing outside Schiller’s Delicatessen when Franz Ferdinand’s car unexpectedly stopped right in front of him?',
      'The driver, Leopold Lojka, took a wrong turn onto Franz Josef Street and stalled the engine while attempting to reverse',
      'Following a route change to visit wounded officers in hospital, Lojka mistakenly turned onto the original procession route. When Governor Potiorek shouted at him to stop, Lojka stalled the car right beside Princip.',
      [
        'Princip had bribed the chauffeur to stop the car at that exact intersection',
        'The Archduke ordered the driver to halt so he could purchase refreshments',
        'The Sarajevo police had established a mandatory checkpoint outside the shop',
      ],
      'gw_l5_12',
    ),
    q(
      'Which head of Serbian Military Intelligence, known by the codename "Apis", secretly orchestrated the Black Hand assassination plot?',
      'Colonel Dragutin Dimitrijević',
      'Colonel Dimitrijević ("Apis") led the Black Hand and provided weapons from the Serbian state armory in Kragujevac, operating independently of Prime Minister Nikola Pašić’s civilian government.',
      ['General Radomir Putnik', 'Major Vojislav Tankosić', 'General Stepa Stepanović'],
      'gw_l5_13',
    ),
    q(
      'Which specific demand in the Austro-Hungarian ultimatum (Point 6) did Serbia reject as an intolerable violation of sovereign independence?',
      'Allowing Austro-Hungarian police and judicial officials to participate in proceedings on Serbian sovereign territory',
      'Serbia agreed to nine of the ten demands, but rejected Austro-Hungarian officials conducting investigations on Serbian soil, viewing it as the destruction of Serbian constitutional sovereignty.',
      [
        'Banning all anti-Austrian propaganda in Serbian school textbooks',
        'Arresting military officers implicated in the assassination plot',
        'Paying a cash indemnity of 100 million gold francs to Vienna',
      ],
      'gw_l5_14',
    ),
    q(
      'Which Austro-Hungarian Chief of General Staff had urged a preventative war against Serbia over twenty-five times since 1906?',
      'Field Marshal Franz Conrad von Hötzendorf',
      'Conrad was an uncompromising hawk who believed that only the military destruction of Serbia could halt the disintegrating tide of Pan-Slavism and preserve the Habsburg Empire.',
      ['Count Leopold Berchtold', 'General Oskar Potiorek', 'Archduke Friedrich'],
      'gw_l5_15',
    ),
    q(
      'What urgent series of personal telegrams were exchanged between the German Kaiser and Russian Tsar between 29 and 31 July 1914 in a desperate bid to avert general war?',
      'The "Willy-Nicky" Telegrams',
      'Cousins Wilhelm and Nicholas communicated in English as "Willy" and "Nicky", appealing to their personal friendship to halt military mobilizations before the army timetables overwhelmed diplomacy.',
      [
        'The Berlin-Petersburg Dispatches',
        'The Romanov-Hohenzollern Cables',
        'The Imperial Peace Transcripts',
      ],
      'gw_l5_16',
    ),
    q(
      'What calculated diplomatic delay was engineered by Austro-Hungarian Foreign Minister Count Berchtold before delivering the ultimatum on 23 July?',
      'Waiting until French President Raymond Poincaré had finished his state visit to St. Petersburg and boarded his warship home',
      'Berchtold waited until Poincaré and Prime Minister Viviani were at sea, unable to coordinate closely with Russian leaders during the critical 48-hour response window.',
      [
        'Waiting for the German harvest to be gathered to prevent famine',
        'Waiting until Archduke Franz Ferdinand’s funeral was completed in Vienna',
        'Waiting for the British fleet to leave its Mediterranean bases',
      ],
      'gw_l5_17',
    ),
    q(
      'What landmark thesis was published by German historian Fritz Fischer in 1961 ("Griff nach der Weltmacht") regarding the July Crisis?',
      'Imperial Germany deliberately provoked the July Crisis and encouraged Austria to attack Serbia to wage a premeditated war for European hegemony and world power',
      'Fischer broke German historical consensus by producing archival proof that German leaders actively sought war in 1914 to break encirclement and establish German continental dominance.',
      [
        'Tsarist Russia orchestrated the entire assassination to conquer Constantinople',
        'Great Britain deliberately engineered the crisis to destroy the German High Seas Fleet',
        'No country bore responsibility because the war was an unavoidable economic accident',
      ],
      'gw_l5_18',
    ),
    q(
      'How does Australian historian Christopher Clark interpret European leadership in "The Sleepwalkers" (2012)?',
      'European leaders acted like sleepwalkers, blinded by mutual paranoia and domestic pressures, rather than executing a unilateral German conspiracy',
      'Clark argues for distributed responsibility: European leaders were caught in a volatile multilateral crisis, miscalculating that the other side would back down as they had in previous crises.',
      [
        'World War I was an entirely fictitious conflict created by postwar novelists',
        'The war was entirely caused by the secret orders of Emperor Franz Joseph',
        'Britain was solely responsible for attacking Germany without warning',
      ],
      'gw_l5_19',
    ),
    q(
      'What critical mobilization order did Tsar Nicholas II sign on the evening of 30 July 1914, making general European war practically unavoidable?',
      'General mobilization of the entire Russian army and navy',
      'After vacillating between partial and general mobilization, the Tsar signed the general mobilization order on 30 July, prompting Germany to issue a 12-hour ultimatum to halt, which Russia refused.',
      [
        'A formal declaration of unconditional surrender to Austria',
        'An executive order disbanding the Russian imperial navy',
        'A military alliance with the Ottoman Empire against Germany',
      ],
      'gw_l5_20',
    ),
  ],

  lesson_6: [
    // Core Retrieval (1-10)
    q(
      'What was the name of the Austro-Hungarian heir whose assassination on 28 June 1914 catalyzed the July Crisis?',
      'Archduke Franz Ferdinand',
      'Archduke Franz Ferdinand’s assassination served as the immediate trigger that transformed simmering imperial tensions into an active, escalating diplomatic crisis.',
      ['Emperor Franz Joseph I', 'Crown Prince Rudolf', 'Archduke Charles'],
      'gw_l6_1',
    ),
    q(
      'Which Serbian nationalist secret society orchestrated the weapons transfer, training, and border smuggling for the Sarajevo assassins?',
      'The Black Hand (Union or Death)',
      'The Black Hand was a radical pan-Slavic paramilitary network led by Serbian army officers who aimed to liberate South Slavs from Austro-Hungarian rule.',
      ['The Young Turks', 'The People’s Will', 'The White Eagle'],
      'gw_l6_2',
    ),
    q(
      'Which two opposing alliance coalitions divided the European balance of power in August 1914?',
      'The Triple Entente and the Triple Alliance',
      'By 1914, Europe was polarized into the Triple Entente (Britain, France, Russia) and the Triple Alliance (Germany, Austria-Hungary, Italy), creating a rigid bipolar system.',
      [
        'The Axis and the Allies',
        'NATO and the Warsaw Pact',
        'The Holy Alliance and the Grand Coalition',
      ],
      'gw_l6_3',
    ),
    q(
      'What unconditional promise of military support did Imperial Germany extend to Austria-Hungary on 5 July 1914?',
      'The "Blank Cheque"',
      'The "Blank Cheque" assured Vienna of unshakeable German military backing, removing any diplomatic incentive for Austria to show restraint against Serbia.',
      ['The Reinsurance Treaty', 'The Schlieffen Guarantee', 'The Berlin Concordat'],
      'gw_l6_4',
    ),
    q(
      'What German war plan, designed by the Chief of the General Staff in 1905, dictated an immediate offensive through Belgium against France?',
      'The Schlieffen Plan',
      'The Schlieffen Plan required German armies to violate Belgian neutrality to encircle Paris within six weeks, before turning east to face Russia.',
      ['Plan XVII', 'The Moltke Plan', 'Operation Barbarossa'],
      'gw_l6_5',
    ),
    q(
      'What 1839 international treaty guaranteed Belgian neutrality and served as Britain’s legal casus belli for entering the war?',
      'The Treaty of London',
      'The 1839 Treaty of London was a multilateral pact guaranteeing the neutrality of Belgium, which Britain upheld when German divisions invaded on 4 August 1914.',
      ['The Treaty of Versailles', 'The Treaty of Brest-Litovsk', 'The Treaty of Paris'],
      'gw_l6_6',
    ),
    q(
      'Which German historian published "Griff nach der Weltmacht" in 1961, arguing Germany bore primary responsibility for deliberately planning and provoking the war?',
      'Fritz Fischer',
      'Fritz Fischer revolutionized WWI historiography by proving that Imperial Germany’s leadership deliberately pursued war in 1914 to break encirclement and establish global power.',
      ['Christopher Clark', 'A.J.P. Taylor', 'Niall Ferguson'],
      'gw_l6_7',
    ),
    q(
      'What controversial clause in the 1919 Treaty of Versailles (Article 231) forced Germany to accept sole responsibility for causing the war?',
      'The War Guilt Clause',
      'Article 231 forced Germany to accept sole moral and financial responsibility for all loss and damage of the war, generating intense political outrage across Weimar Germany.',
      ['The Disarmament Clause', 'The Reparations Mandate', 'The Diktat Article'],
      'gw_l6_8',
    ),
    q(
      'Which naval arms race from 1898 to 1912 poisoned relations between Great Britain and Imperial Germany?',
      'The Dreadnought arms race',
      'The building of all-big-gun battleships and Admiral Tirpitz’s High Seas Fleet created profound strategic paranoia in Britain, convincing London that Germany sought world domination.',
      ['The U-boat blockade', 'The Convoy race', 'The Ironclad rivalry'],
      'gw_l6_9',
    ),
    q(
      'How do revisionist historians such as Christopher Clark ("The Sleepwalkers") characterize the outbreak of the First World War?',
      'As a tragic collective breakdown of diplomacy where European statesmen blindly sleepwalked into a catastrophe that none truly wanted',
      'Clark argues that the outbreak was not the calculated conspiracy of a single state, but a multilateral crisis where leaders misjudged risks and stumbled into catastrophe.',
      [
        'As a sole British conspiracy to conquer German colonies',
        'As a premeditated Bolshevik revolution orchestrated from Switzerland',
        'As an accidental conflict caused by a Serbian naval mutiny',
      ],
      'gw_l6_10',
    ),

    // Mastery Challenge (11-20)
    q(
      'What archival document from September 1914 did Fritz Fischer highlight to prove German premeditated expansionist ambitions?',
      'The "Septemberprogramm" drafted by Chancellor Bethmann-Hollweg, outlining sweeping annexations in Europe and Africa',
      'The Septemberprogramm outlined German war aims: subjugating Belgium, annexing French ore fields, creating a German-dominated economic zone (Mitteleuropa), and expanding in Central Africa.',
      ['The Kruger Telegram', 'The Zimmerman Memorandum', 'The Berlin Conference Minutes'],
      'gw_l6_11',
    ),
    q(
      'What primary cause for the outbreak of war is emphasized by revisionist historian Sean McMeekin in "The Russian Origins of the First World War" (2011)?',
      'Tsarist Russia’s aggressive geopolitical ambition to dismantle the Ottoman Empire and seize Constantinople and the Turkish Straits',
      'McMeekin argues that Russian leaders actively welcomed a European war to fulfill their centuries-old imperial ambition of controlling the Bosphorus and Dardanelles.',
      [
        'Russia’s desire to surrender Poland and Ukraine to Austria-Hungary',
        'Tsar Nicholas II’s personal jealousy of King George V’s naval fleet',
        'A secret conspiracy between Russian Marxists and the British Admiralty',
      ],
      'gw_l6_12',
    ),
    q(
      'What controversial argument does British historian Niall Ferguson advance in "The Pity of War" (1998) regarding Britain’s entry into the war?',
      'Great Britain made a catastrophic strategic blunder by intervening, transforming a manageable continental clash into a ruinous global bloodbath',
      'Ferguson contends that had Britain stayed neutral, Germany would have established a continental customs union similar to the modern European Union without the horrific loss of life.',
      [
        'Britain entered the war too late to save the Russian Empire',
        'The Royal Navy should have bombarded New York to enforce neutrality',
        'Britain should have formed an offensive alliance with Austria-Hungary against France',
      ],
      'gw_l6_13',
    ),
    q(
      'According to military historian John Keegan, how did rigid railway mobilization timetables undermine diplomatic crisis management in July 1914?',
      'Once general mobilization was declared, millions of reservists and train schedules could not be stopped without throwing armies into defenseless chaos',
      'Keegan noted that mobilization timetables dictated diplomacy: once Russia mobilized, German generals insisted they had to attack France immediately or lose the war.',
      [
        'Railroads were sabotaged across Europe by trade unionists',
        'European armies had no maps of railway routes',
        'Trains could only run during daytime hours due to coal strikes',
      ],
      'gw_l6_14',
    ),
    q(
      'What interwar revisionist thesis was advanced by American historian Sidney Fay in "The Origins of the World War" (1928)?',
      'No single nation was solely responsible; all European powers were collectively ensnared by secret diplomacy, militarism, nationalism, and economic rivalry',
      'Fay challenged Article 231 of Versailles, arguing that the system of alliances and imperial rivalries shared collective responsibility for the tragedy.',
      [
        'The war was entirely manufactured by Serbian journalists',
        'The United States was the primary instigator of the conflict',
        'France had planned the invasion of Germany since 1815',
      ],
      'gw_l6_15',
    ),
    q(
      'What was the central ideological principle of Pan-Slavism that made Russia feel honour-bound to defend Serbia in July 1914?',
      'The belief that the Russian Empire had a sacred historic duty to protect Slavic peoples and Orthodox Christians in the Balkans from Austro-German domination',
      'Pan-Slavism was a powerful cultural and political movement in Russia; abandoning Serbia twice (after 1908 and 1913) meant Russia could not back down again in 1914 without losing great power status.',
      [
        'The belief that all Slavic nations should convert to Roman Catholicism',
        'A plan to unite all Slavic territories under the Ottoman Sultan',
        'A commercial agreement to sell Serbian wheat exclusively to French merchants',
      ],
      'gw_l6_16',
    ),
    q(
      'Why did the German High Command (Moltke and Falkenhayn) believe that a European war had to be fought in 1914 rather than delayed until 1917?',
      'Russia’s "Great Military Programme" was rapidly modernizing its armed forces and strategic railways, which would make Germany militarily indefensible by 1917',
      'German generals argued for a preventative war: in 1914 Germany still held a qualitative edge, but by 1917 Russian railway construction would negate the Schlieffen Plan.',
      [
        'Germany’s stockpile of coal was predicted to completely run out by 1915',
        'France had agreed to dismantle all its border fortresses by 1916',
        'Kaiser Wilhelm II was scheduled to abdicate his throne in August 1914',
      ],
      'gw_l6_17',
    ),
    q(
      'What was the "Short War Illusion" universally shared by European populations and military planners in August 1914?',
      'The mistaken belief that modern industrial firepower would produce a rapid, decisive victory and soldiers would be home by Christmas',
      'Virtually all leaders and publics believed that modern economic interdependence made a long war impossible, expecting a brief, heroic campaign like the 1870 Franco-Prussian War.',
      [
        'The belief that the war would be fought entirely by diplomatic telegrams without any troops',
        'The assumption that only naval battles would take place in the Atlantic Ocean',
        'The belief that the war would last exactly twenty years without a single battle',
      ],
      'gw_l6_18',
    ),
    q(
      'What term was widely applied to the volatile Balkan region prior to 1914 because of its extreme ethnic nationalism and competing imperial rivalries?',
      'The "Powder Keg of Europe"',
      'As Ottoman control crumbled, conflicting nationalist ambitions and the rivalries of Austria-Hungary and Russia turned the Balkans into a powder keg needing only a spark to explode.',
      ['The Iron Curtain', 'The Buffer Zone', 'The Deadlock of Empires'],
      'gw_l6_19',
    ),
    q(
      'In evaluating the four long-term causes of the Great War (M-A-I-N), what do most contemporary historians agree was the decisive mechanism that made war unavoidable?',
      'The lethal intersection of rigid alliance tripwires, uncompromising military mobilization timetables, and reckless brinkmanship during the July Crisis',
      'While Militarism, Alliances, Imperialism, and Nationalism created structural combustible material, it was the fatal choices and mobilization timetables of July 1914 that lit the fuse.',
      [
        'A global banking conspiracy that forced monarchs to abdicate',
        'A sudden cooling of the European climate that destroyed food crops',
        'An unprovoked invasion of Great Britain by the Italian navy',
      ],
      'gw_l6_20',
    ),
  ],
};

async function run() {
  const dataJsPath = path.join(__dirname, '..', 'units', 'great_war', 'data.js');

  // 1. Create timestamped backup
  const backupDir = path.join(__dirname, '..', 'temp_backups');
  if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = path.join(backupDir, `great_war_data_backup_${timestamp}.js`);
  fs.copyFileSync(dataJsPath, backupPath);
  console.log(`📦 Created backup at: ${backupPath}`);

  // 2. Import unitData
  const mod = await import(require('url').pathToFileURL(dataJsPath).href);
  const unitData = mod.default || mod.unitData;

  console.log('Injecting 20-question 4-act calibrated quizzes into great_war...');

  unitData.lessons.forEach((l, idx) => {
    if (GREAT_WAR_EXPANDED_QUIZZES[l.id]) {
      const quiz = GREAT_WAR_EXPANDED_QUIZZES[l.id];
      if (quiz.length !== 20) {
        throw new Error(`Quiz for ${l.id} has ${quiz.length} questions instead of 20!`);
      }
      l.quiz = quiz;
      console.log(`✅ Lesson ${idx} (${l.id}) expanded: 20 questions (10 Core, 10 Mastery).`);
    } else {
      console.log(
        `ℹ️ Lesson ${idx} (${l.id}) already has ${l.quiz ? l.quiz.length : 0} questions (kept intact).`,
      );
    }
  });

  // Verify all lessons in great_war have 20 questions
  unitData.lessons.forEach((l, idx) => {
    if (!l.quiz || l.quiz.length !== 20) {
      throw new Error(
        `Lesson ${idx} (${l.id}) does not have exactly 20 questions! Count: ${l.quiz ? l.quiz.length : 0}`,
      );
    }
  });

  // 3. Write updated data.js
  const fileContent = `export const unitData = ${JSON.stringify(unitData, null, 2)};\nexport default unitData;\n`;
  fs.writeFileSync(dataJsPath, fileContent, 'utf8');
  console.log('Saved updated great_war/data.js.');

  execSync(`node --check "${dataJsPath}"`, { stdio: 'inherit' });
  console.log('✅ Syntax check passed.');
}

run().catch((err) => {
  console.error('❌ Error updating great_war quizzes:', err);
  process.exit(1);
});
