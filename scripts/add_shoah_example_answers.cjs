const fs = require('fs');
const path = require('path');

const answersMap = {
  // LESSON 1
  L1_B1: [
    "Demographic Epicentre of European Jewry: Over 5.5 million Jewish people—more than half of Europe's total Jewish population—lived directly in the path of the German Wehrmacht in Poland and the western USSR, meaning any eastward military expansion placed millions immediately under Nazi occupation.",
    "Ideological Overlap of Lebensraum and Racial Annihilation: Hitler's goal of conquering 'living space' (Lebensraum) was explicitly intertwined with destroying 'Judeo-Bolshevism', turning Eastern Europe into a racial battlefield rather than a conventional war zone.",
    'Trapped with No Escape Route: Unlike Western European Jews who had borders with neutral countries like Switzerland or Spain, the trapped populations of the Polish and Soviet interior had no contiguous neutral sanctuaries to flee towards.',
  ],
  L1_B2: [
    'A Dynamic Modern Literary Culture: The existence of dozens of competing daily newspapers, political journals, and literary reviews proves that Eastern European Jewry was deeply engaged in modern politics, philosophy, and global debate.',
    'Urban and Pluralistic Society: Warsaw was home to nearly 375,000 Jewish citizens—the second largest Jewish city in the world after New York—boasting world-class theatres, sports clubs, trade unions, and secular youth movements.',
    "Challenging the 'Shtetl Stereotype': While rural shtetls existed, millions of Jews were urban, literate, and actively contributing to mainstream European literature, cinema, and academic research.",
  ],
  L1_B3: [
    'Sacrifice for the Fatherland: Over 100,000 German Jews served in WWI, 12,000 died on the front lines, and 18,000 were awarded the Iron Cross, establishing an unshakeable belief that they were full, patriotic German citizens.',
    "Betrayal of National Loyalty: German Jews viewed themselves as culturally, intellectually, and nationally German first and Jewish second; being suddenly branded 'alien parasites' by laws in 1933 felt completely irrational and unimaginable.",
    'Initial Belief That Persecution Was a Temporary Aberration: Because of their service records, many veterans believed the Nazi regime was an uncivilised fringe group that would collapse quickly or that President Hindenburg would protect them.',
  ],
  L1_B4: [
    'Distinct Mediterranean Linguistic Heritage: Thessaloniki Jews spoke Ladino (Judeo-Spanish) and traced their ancestry to the 1492 expulsion from Spain, creating a distinct Iberian-Mediterranean heritage entirely separate from Central European Yiddish.',
    "Civic Dominance and Maritime Labour: Unlike Eastern Europe where Jews were often barred from heavy manual labour, Thessaloniki Jews formed the majority of the city's stevedores, dockers, and port labourers, causing the entire commercial port to shut on Saturdays.",
    "Demonstrating the Breadth of Nazi Annihilation: The deportation of over 45,000 Thessaloniki Jews to Auschwitz in 1943 proves that the 'Final Solution' targeted every branch of Jewish heritage across Europe, extinguishing ancient Sephardic culture as ruthlessly as Ashkenazi life.",
  ],
  L1_B5: [
    'Elimination of Conversion as an Escape: Medieval Christian prejudice allowed a Jewish person to convert to Christianity to save their life; biological racism claimed Jewishness was carried in the blood, making escape impossible through conversion or assimilation.',
    "Pseudo-Scientific Justification: By cloaking hatred in the language of Darwinian biology and medical hygiene, racists argued that destroying Jews was not murder, but 'cleansing an infection' from the Aryan bloodstream.",
    'Absolute and Universal Target: If Jewish identity was genetic, then assimilation and patriotism were meaningless; every man, woman, and newborn child of Jewish descent was marked for permanent exclusion and eventual eradication.',
  ],

  // LESSON 2
  L2_B1: [
    'Testing Domestic and International Public Opinion: Hitler used the one-day boycott to test how German citizens and foreign governments would react to open, aggressive state-sponsored persecution.',
    'Normalising Intimidation in Everyday Life: Stationing armed SA thugs outside shops forced ordinary Germans to make a visible, public choice between complying with the Nazi party or risking public humiliation.',
    "Creating Social Isolation: The boycott visually separated Jewish shops from 'German' businesses, starting the psychological process of isolating Jewish citizens before legal decrees were drafted.",
  ],
  L2_B2: [
    "The Scientific Bankruptcy of Racial Theories: Despite claiming 'Aryan' and 'Jewish' blood were biologically different, Nazi doctors had no physical test or blood test that could distinguish them, forcing them to rely on synagogue and church baptismal registers.",
    "Bureaucratic and Legal Precision: Religious archival records provided the state with concrete documentation to classify every citizen neatly into 'Jews', 'Mischlinge' (mixed), or 'German-blooded' for civil service purges and marriage bans.",
    'Ensnaring Secular and Christian Citizens: By tracing ancestry back to grandparents, the law stripped rights from thousands of individuals who had been raised as devout Christians or had never set foot in a synagogue.',
  ],
  L2_B3: [
    'Erosion of Personal Identity and Dignity: Being banned from public benches, libraries, parks, and driving licenses steadily stripped individuals of their autonomy and humanity before any physical violence occurred.',
    'The Pain of Betrayal by Friends and Neighbours: Watching former colleagues, students, and lifelong friends cross the street to avoid saying hello inflicted deep emotional trauma and created terrifying loneliness.',
    "Cumulative Despair and Helplessness: Klemperer described this as 'a thousand mosquito bites'; each minor ban reminded victims daily that they were legally worthless and had no future in their homeland.",
  ],
  L2_B4: [
    "Exposing the Lie of 'Spontaneous Public Outrage': The disciplined coordination of firefighters proves that Kristallnacht was a centrally planned state pogrom organized by Goebbels and Heydrich, not a spontaneous riot.",
    'Total Collapse of Legal Protection: When the official emergency services of a modern state stood by and watched houses of worship burn, it sent an unmistakable message that Jewish property was entirely outside the law.',
    "Prioritising Aryan Property over Public Safety: Firefighters directed water hoses only at adjacent German homes and businesses, demonstrating that state resources were deployed solely to protect the 'Volksgemeinschaft'.",
  ],
  L2_B5: [
    'Diplomatic Paralysis and Excuses: Delegates from 32 democratic nations offered polite sympathy but refused to raise their immigration quotas, citing economic hardship and domestic unemployment during the Great Depression.',
    'Nazi Propaganda Victory: Hitler exploited the conference to mock the democracies, publicly declaring that while foreign nations hypocritically criticised Germany, none of them actually wanted to accept the Jews either.',
    'A Green Light for Radical Escalation: By demonstrating that international borders were virtually sealed, Évian convinced Nazi leaders that the world would not fight to save European Jews, paving the way for forced ghettoisation and murder.',
  ],

  // LESSON 3
  L3_B1: [
    "Intentional Step-by-Step Escalation: Heydrich made clear that immediate measures like railway concentration and ghettoisation were not permanent solutions, but preparatory steps for a more radical 'final aim' (Endziel).",
    'Logistical Concentration near Railways: Forcing rural populations into major cities with railway junctions ensured that hundreds of thousands of victims could be rapidly deported when the next phase commenced.',
    'Establishing the Judenräte as Instruments of Control: Ordering the creation of Jewish councils forced community leaders to register their own people and carry out Nazi orders under threat of death.',
  ],
  L3_B2: [
    'Ending Anonymity in Public Space: Marking individuals with the Star of David made every Jewish citizen instantly identifiable, making public abuse, arbitrary beatings, and forced labour round-ups effortless for soldiers.',
    'Psychological Segregation: The badge created an invisible social wall, preventing friendly contact between Christian Poles and Jewish neighbours by threatening severe punishment for helping a marked person.',
    'Facilitating Physical Segregation: Once all victims were visibly marked, the military authorities could easily herd them into designated quarantine streets to erect the ghetto walls.',
  ],
  L3_B3: [
    "Engineered Attrition and Indirect Murder: Squeezing 30% of Warsaw's population into just 2.4% of its physical area under starvation rations was designed to cause massive death by hunger and epidemic typhus without firing bullets.",
    'Economic Exploitation and Slavery: The German authorities intended to bleed the ghetto of all valuables, currency, and furniture, while extracting slave labour in SS-managed workshops.',
    'Holding Pens for Future Eradication: The high brick walls topped with barbed wire and armed guard posts converted the historic Jewish quarter into an open-air prison from which nobody could flee once deportation orders arrived.',
  ],
  L3_B4: [
    'Vital Lifeline for Collective Survival: Official Nazi food rations in the Warsaw Ghetto provided only ~180 to 220 calories per day; without children squeezing through storm drains and wall holes with flour and potatoes, the entire population would have starved in weeks.',
    'The Extreme Physical Agility of Children: Children were small enough to slip through broken bricks and sewer grates, taking terrifying risks where adults would be instantly captured and shot.',
    'Moral Inversion of Nazi Law: In a world where Nazi law ordered mass starvation, breaking the law to feed starving siblings and parents became the ultimate moral duty and act of defiance.',
  ],
  L3_B5: [
    'Defeating Nazi Historical Eradication: Ringelblum and his team understood that the Nazis wanted to destroy not only Jewish bodies, but Jewish memory; burying the archive ensured the truth would survive to indict their murderers.',
    "Preserving the Human Voice: Instead of allowing victims to be remembered only as faceless numbers in Nazi death tallies, the archive preserved individual diaries, street songs, jokes, and children's essays.",
    "A Testament for Global Justice: As 19-year-old David Graber wrote before burying the cans, 'May the treasure fall into good hands... so that the world may know everything'; it was an act of supreme faith in future justice.",
  ],

  // LESSON 4
  L4_B1: [
    "Stripping Opponents of Legal Protection: The OKW explicitly ordered that political commissars and 'subversive elements' were not prisoners of war and should be liquidated immediately without trial.",
    'Pre-Emptive Legal Immunity for War Crimes: Soldiers were guaranteed in advance that they would not face court-martial for crimes committed against Russian civilians, removing the moral restraint of military discipline.',
    "Framing the War as Racial Annihilation: The orders framed Operation Barbarossa not as a normal European campaign, but as a total crusade against 'Bolshevik-Jewish subhumans', conditioning ordinary soldiers to assist the SS Einsatzgruppen.",
  ],
  L4_B2: [
    'Forensic Bureaucratic Accounting: The map meticulously tallies exact execution numbers across Estonia, Latvia, Lithuania, and Belarus using coffin symbols (e.g. 136,421 in Lithuania), proving centralized accounting of mass slaughter.',
    "Cold Execution of Total Destruction: The label 'Free of Jews' (judenfrei) across Estonia demonstrates that the complete disappearance of Jewish life was an intended, celebrated administrative milestone.",
    'Documentary Refutation of Holocaust Denial: Produced by SS-Brigadeführer Stahlecker for Heinrich Himmler, this internal secret document directly connects the SS command to coordinated mass shootings.',
  ],
  L4_B3: [
    "Dehumanising Language of Sanitation: Mass murder was described using detached bureaucratic terms like 'special actions', 'cleansing measures', and 'liquidations', disguising slaughter as routine office work.",
    'Industrial Efficiency and Quotas: Reporting 33,771 Jewish people murdered at Babi Yar over two days like a factory output report allowed desk perpetrators and killers to detach themselves from the human reality of their victims.',
    'Institutional Pride and Professionalism: The reports were typed on standard government stationery and circulated to high-ranking civil servants, demonstrating that genocide had become normal state business.',
  ],
  L4_B4: [
    'Manpower Multipliers for the SS: German Einsatzgruppen units were tiny (only ~3,000 men total across the entire USSR); they relied completely on local auxiliary police (Ypatingasis būrys in Lithuania, Ukrainian militias) to round up, guard, and shoot tens of thousands.',
    'Local Knowledge of Communities: Local collaborators knew which families were Jewish, where they hid, and which houses to search, eliminating any chance of victims blending into the countryside.',
    'Ideological and Material Opportunism: Anti-Soviet nationalism, virulent pre-war antisemitism, and the prospect of looting Jewish homes, clothes, and businesses motivated thousands of locals to collaborate eagerly.',
  ],
  L4_B5: [
    "Victims Reduced to 'Pieces' and 'Cargo': The report repeatedly refers to murdered human beings as 'merchandise' (Stücke) and 'the cargo', discussing their weight distribution to prevent the truck axles from breaking.",
    'Engineering Precision Applied to Murder: The author dispassionately analyses the optimal length of the exhaust pipe, the chemical reaction of carbon monoxide, and the ease of hosing out the interior after death.',
    "Solving Perpetrator Psychological Stress: The switch from firing squads to gas vans was driven by Himmler's desire to spare German soldiers the psychological strain of shooting women and children face-to-face.",
  ],

  // LESSON 5
  L5_B1: [
    'Cross-Ministerial Coordination: The meeting brought together state secretaries from the Ministries of Justice, Foreign Affairs, Interior, and the Four-Year Plan, ensuring every department actively coordinated deportation trains, legal property seizures, and labour allocation.',
    "Continental Scope (11 Million People): Eichmann's demographic survey tabulated every Jewish community across Europe—including Britain, Ireland, and Turkey—proving the goal was the eradication of an entire continental people.",
    "Euphemistic Codification of Murder: The protocol recorded that surviving labourers would 'doubtless be reduced by natural decline', and any remainder would be 'treated accordingly', cementing bureaucratic consensus behind genocide.",
  ],
  L5_B2: [
    'Forensic Decrypted Nazi Signal: Intercepted and decoded by British intelligence at Bletchley Park, the message provides an unalterable contemporary primary record of death totals sent directly by SS-Sturmbannführer Höfle.',
    'Exact Kill Counts for Death Camps: The telegram gives precise cumulative figures for the extermination camps up to 31 December 1942: Bełżec (434,508), Sobibór (101,370), Treblinka (713,555), and Lublin/Majdanek (24,733), totaling 1,274,166.',
    'Proof of an Industrial Killing Programme: The systematic reporting of death counts to Berlin confirms that Operation Reinhard was a centrally monitored industrial campaign to murder Polish Jewry in purpose-built extermination centers.',
  ],
  L5_B3: [
    'Integration of Modern Continental Logistics: Coordinating hundreds of deportation trains across thousands of miles from Oslo, Paris, and Rhodes required the sophisticated scheduling and billing systems of the Deutsche Reichsbahn.',
    'Corporate Complicity and Engineering Innovation: The crematoria blueprints were designed and built by private German engineering firms (like Topf & Söhne), who patented specialized multi-muffle incineration ovens to maximize destruction capacity.',
    'Factory-Style Assembly-Line Murder: Plate 2 reveals how underground dressing rooms, gas chambers disguised as showers, and electric freight lifts formed a continuous, mechanized assembly line for slaughter.',
  ],
  L5_B4: [
    'Choosing the Manner of Death: As Mordechai Anielewicz wrote, the goal was not military survival, but dying with arms in hand rather than being marched quietly onto the cattle cars to Treblinka.',
    'Defending Human Dignity and Honour: Facing tanks, flamethrowers, and aerial bombardment with small pistols and homemade Molotov cocktails was an assertion of self-respect and defiance against dehumanisation.',
    'Inspiring Future Resistance: The ghetto fighters knew their struggle would send a message to camp prisoners, forest partisans, and the post-war world that Jews actively resisted Nazi terror.',
  ],
  L5_B5: [
    'Armed Resistance under Impossible Conditions: Smuggling gunpowder out of the Union munitions factory grain by grain under constant threat of execution demonstrated extraordinary courage and sophisticated organization inside the heart of Auschwitz.',
    'Destroying the Killing Machinery: The Sonderkommando revolt succeeded in blowing up Crematorium IV and killing several SS guards, directly sabotaging the infrastructure of mass murder.',
    "Courage under Brutal Torture: Despite enduring weeks of severe torture in the Gestapo bunker, Roza Robota refused to betray her fellow conspirators, whispering 'Chazak V'ematz' ('Be strong and of good courage') before her public execution.",
  ],

  // LESSON 6
  L6_B1: [
    'Ordinary Clerks Facilitating Genocide: Deportation trains were scheduled, routed, and invoiced by ordinary railway bureaucrats who focused purely on punctual train logistics without questioning the horrific fate of their passengers.',
    'Commercial Normalisation of Murder: The Reichsbahn charged the SS third-class passenger fares (4 pfennigs per kilometer for adults, half-price for children under 10) to transport families to gas chambers, generating profit for the state railway.',
    "Detachment from Responsibility: By reducing human beings to train numbers and scheduling slots, railway officials could comfort themselves that they were 'merely doing their administrative duty'.",
  ],
  L6_B2: [
    'Severe Shortage of German Personnel: Occupying German military and SS forces in France were too small to locate and arrest thousands of dispersed families; they relied entirely on 9,000 French police officers to conduct the door-to-door raids.',
    'Local Knowledge of Neighbourhoods and Registry Records: French police officers possessed address books, census files, and familiarity with apartment blocks that German soldiers could never replicate.',
    'Legitimising State Collaboration: Utilizing national police forces maintained an illusion of civic authority and order, reducing public panic and preventing widespread civilian resistance.',
  ],
  L6_B3: [
    'Eyewitness Knowledge of War Crimes: Hans Scholl and Alexander Schmorell had served as medical orderlies on the Eastern Front, witnessing firsthand the mass shooting of Jewish civilians in Poland and the USSR.',
    "Moral and Christian Conviction: Grounded in deep Christian philosophy and German literature, Sophie and Hans Scholl believed that remaining silent made citizens morally complicit in the regime's crimes.",
    'Accepting Personal Martyrdom: Following the catastrophic defeat at Stalingrad, they chose to risk execution because they felt somebody within Germany had to openly stand up and redeem the honour of their nation.',
  ],
  L6_B4: [
    'Choosing Moral Conscience over Bureaucratic Obedience: Sugihara explicitly defied direct orders from Tokyo by writing thousands of transit visas by hand for 18–20 hours a day until his wrists cramped.',
    'Empathy for Strangers in Crisis: While bystanders viewed refugees as a distant problem, rescuers saw terrified families gathered outside their windows and felt a personal, human obligation to act.',
    'Accepting Grave Personal and Professional Risk: Sugihara knew that defying his ministry would destroy his diplomatic career and endanger his family, yet he concluded that saving human lives was far more important than government standing.',
  ],
  L6_B5: [
    'Unified Societal Solidarity: Danish politicians, church leaders, police officers, and ordinary fishermen viewed Danish Jews as fellow citizens, immediately organizing collective rescue operations when the German deportation order was leaked.',
    'Crucial Maritime Sanctuary in Sweden: Neutral Sweden was only a few miles across the Øresund strait and formally announced that it would welcome every Danish refugee, providing a reachable and safe haven.',
    'In contrast to the Netherlands: In the flat, densely populated Netherlands surrounded by German territory, Dutch Jews had no nearby neutral haven, and Dutch civil bureaucracy cooperated rigidly with German deportations.',
  ],

  // LESSON 7
  L7_B1: [
    'Preventing Living Witnesses from Falling into Allied Hands: The SS feared that liberated prisoners would testify to Allied armies and journalists about the gas chambers and mass murder of the camps.',
    'Exploiting Dying Slave Labour: Desperate arms ministers still hoped to use surviving prisoners in underground munitions factories to produce weapons for the final defense of the Reich.',
    "Fanatical Ideological Hatred: Even when Germany's transport network was collapsing and fuel was desperately scarce, SS guards continued murdering prisoners along roadsides, maintaining their ideological war against Jews until the final hours.",
  ],
  L7_B2: [
    'Unimpeachable Eyewitness Evidence: Filmed by official British and American military cameramen, the footage provided irrefutable visual proof that obliterated Nazi propaganda and wartime denials.',
    'Confronting the Reality of Industrial Neglect: Images of tens of thousands of unburied corpses and emaciated typhus victims shocked the world and became vital evidence in post-war war crimes trials.',
    "Permanent Historical Bulwark Against Denial: Military commanders like General Eisenhower ordered local German civilians and soldiers to walk through the camps to bear witness, ensuring that future generations could never pretend it didn't happen.",
  ],
  L7_B3: [
    'Homelessness and Lingering Persecution in Post-War Europe: Over 250,000 survivors were trapped in DP camps in Germany and Austria, unable to return to homes in Poland where post-war pogroms (such as Kielce in 1946) killed returning survivors.',
    'International Outrage at British Interception: When British warships violently intercepted the SS Exodus and forcibly returned 4,500 Holocaust survivors back to displaced camps in Germany, global public opinion was appalled.',
    'Compelling the Need for a Sovereign Jewish State: The crisis persuaded the United Nations that survivors needed a sovereign homeland where Jewish refugees would never again be barred entry by foreign quotas.',
  ],
  L7_B4: [
    "Grounded in Perpetrators' Own Documentation: The prosecution built its case primarily on captured Nazi government records, telegrams, and orders, meaning the historical record of the Holocaust was established by the regime's own words.",
    "Creating the Legal Concept of 'Crimes Against Humanity' and 'Genocide': Raphael Lemkin's concept gave the world a new international legal framework to define and punish the coordinated annihilation of a national or ethnic group.",
    "Establishing Individual Accountability: Nuremberg decisively established the legal principle that 'following superior orders' does not absolve an individual of criminal responsibility for mass atrocities.",
  ],
  L7_B5: [
    'A Warning of Human Fragility: Levi understood that the concentration camp was not an isolated aberration, but a permanent reminder of how rapidly civilised societies can descend into barbarism when human empathy is extinguished.',
    'Active Moral Responsibility: Passively reading history in a textbook is not enough; citizens must actively teach and remember the Holocaust to recognise and confront emerging dehumanisation, racism, and state violence.',
    'Honouring the Silenced Voices: Millions of victims never survived to write books or give testimony; Levi wrote to ensure that the living honour their memory by defending universal human dignity.',
  ],
};

// 1. Update public/data/the_shoah.json
const jsonPath = path.join(__dirname, '..', 'public', 'data', 'the_shoah.json');
const rawData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

rawData.data.lessons.forEach((l, lIdx) => {
  l.narrative_blocks.forEach((b, bIdx) => {
    if (b.source) {
      const key = `L${lIdx + 1}_B${bIdx + 1}`;
      if (answersMap[key]) {
        b.source.discussion_ideas = [...answersMap[key]];
        b.source.example_answers = [...answersMap[key]];
        console.log(
          `Updated JSON: ${key} -> ${b.source.title.slice(0, 40)}... with ${b.source.example_answers.length} answers.`,
        );
      }
    }
  });
});

fs.writeFileSync(jsonPath, JSON.stringify(rawData, null, 2), 'utf8');
console.log('✅ Successfully wrote to public/data/the_shoah.json');

// 2. Also update units/the_shoah/data.js
const unitJsPath = path.join(__dirname, '..', 'units', 'the_shoah', 'data.js');
let unitJsContent = fs.readFileSync(unitJsPath, 'utf8');

// For units/the_shoah/data.js, since it exports the unit, we can parse or surgically inject
// Let's check how units/the_shoah/data.js is structured
console.log('Unit JS exists, length:', unitJsContent.length);

// Also update public/database.json directly so state.db has it immediately
const dbPath = path.join(__dirname, '..', 'public', 'database.json');
if (fs.existsSync(dbPath)) {
  const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  if (dbData.the_shoah && dbData.the_shoah.data) {
    dbData.the_shoah.data.lessons = rawData.data.lessons;
    fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2), 'utf8');
    console.log('✅ Successfully synced into public/database.json');
  }
}
