const fs = require('fs');
const path = require('path');

const enrichmentData = {
  "Kaiser Wilhelm II": {
    "limitations": ["Refused to share power with the Reichstag", "Fled to the Netherlands rather than face defeat"],
    "achievements": ["Built Germany into a massive industrial and military power before WWI"],
    "quotes": ["I look upon the People and the Nation as handed on to me as a responsibility conferred upon me by God."]
  },
  "Philipp Scheidemann": {
    "limitations": ["Forced to resign after refusing to sign the Treaty of Versailles"],
    "achievements": ["Proclaimed the Weimar Republic on 9 November 1918", "Served as the first Chancellor of the Republic"],
    "quotes": ["Long live the new German Republic!"]
  },
  "Friedrich Ebert": {
    "limitations": ["Relied on the right-wing Freikorps to crush left-wing revolts", "Blamed by nationalists for signing the armistice"],
    "achievements": ["First President of the Weimar Republic", "Successfully navigated the early crises of 1919-1923"],
    "quotes": ["The victorious proletariat has not yet gained the power to enforce its will."]
  },
  "Prince Max von Baden": {
    "limitations": ["His chancellorship lasted only a month before the revolution forced him out"],
    "achievements": ["Transferred power to Ebert, legally ending the monarchy"],
    "quotes": ["I have decided to renounce the throne."]
  },
  "Woodrow Wilson": {
    "limitations": ["Failed to convince the US Senate to join the League of Nations", "Compromised heavily on his Fourteen Points at Versailles"],
    "achievements": ["Drafted the Fourteen Points", "Key architect of the League of Nations"],
    "quotes": ["The world must be made safe for democracy."]
  },
  "Matthias Erzberger": {
    "limitations": ["Assassinated by right-wing extremists in 1921 for his role in the armistice"],
    "achievements": ["Signed the 1918 Armistice on behalf of Germany", "Pushed through crucial financial reforms as Finance Minister"],
    "quotes": ["We have not lost our honour, but we have lost the war."]
  },
  "Walther Rathenau": {
    "limitations": ["Assassinated by the radical right Organisation Consul in 1922", "Hated by nationalists for being Jewish and fulfilling the Versailles terms"],
    "achievements": ["Foreign Minister who negotiated the Treaty of Rapallo with Soviet Russia"],
    "quotes": ["We are not working for the next election, but for the next generation."]
  },
  "Rosa Luxemburg": {
    "limitations": ["Murdered during the failed Spartacist Uprising in 1919", "Her revolution failed to gain mass working-class support"],
    "achievements": ["Co-founder of the Spartacus League and the German Communist Party (KPD)"],
    "quotes": ["Freedom is always, and exclusively, freedom for the one who thinks differently."]
  },
  "Karl Liebknecht": {
    "limitations": ["Murdered alongside Rosa Luxemburg in 1919"],
    "achievements": ["Co-founder of the Spartacist League", "Only Reichstag deputy to oppose WWI funding in 1914"],
    "quotes": ["The main enemy is at home!"]
  },
  "Wolfgang Kapp": {
    "limitations": ["The Kapp Putsch collapsed after just four days due to a general strike"],
    "achievements": ["Led the 1920 right-wing Freikorps rebellion against the Weimar government"],
    "quotes": ["We will not be governed by the November Criminals."]
  },
  "Gustav Stresemann": {
    "limitations": ["Died of a stroke in 1929 just before the Wall Street Crash", "Hated by the extreme right for compromising with the Allies"],
    "achievements": ["Ended hyperinflation by introducing the Rentenmark", "Negotiated the Dawes Plan, Locarno Pact, and Germany's entry to the League of Nations"],
    "quotes": ["Germany is dancing on a volcano."]
  },
  "Walter Gropius": {
    "limitations": ["Forced to flee Germany when the Nazis shut down the Bauhaus movement"],
    "achievements": ["Founded the highly influential Bauhaus school of architecture and design"],
    "quotes": ["Architecture begins where engineering ends."]
  },
  "Marlene Dietrich": {
    "limitations": ["Condemned by the Nazis for her progressive lifestyle and roles"],
    "achievements": ["International film star representing Weimar's cultural 'Golden Age'", "Starred in The Blue Angel (1930)"],
    "quotes": ["I am, at heart, a gentleman."]
  },
  "George Grosz & Otto Dix": {
    "limitations": ["Their work was labeled 'Degenerate Art' by the Nazis and destroyed"],
    "achievements": ["Leading artists of the 'New Objectivity' movement", "Exposed the brutal reality of war and Weimar society"],
    "quotes": ["We want to show the world as it really is."]
  },
  "Dr. Magnus Hirschfeld": {
    "limitations": ["His institute was destroyed by the Nazis in 1933 and his books burned", "Exiled and died in France"],
    "achievements": ["Pioneer for LGBTQ+ rights", "Founded the Institute for Sexual Science in Berlin"],
    "quotes": ["Through science to justice."]
  },
  "Adolf Hitler": {
    "limitations": ["His extreme ideology ultimately led to the total destruction of Germany in 1945"],
    "achievements": ["Transformed the obscure DAP into the mass-movement NSDAP", "Became Chancellor in 1933 and absolute dictator by 1934"],
    "quotes": ["The broad masses of a population are more amenable to the appeal of rhetoric than to any other force."]
  },
  "Ernst Röhm": {
    "limitations": ["Murdered on Hitler's orders during the Night of the Long Knives in 1934"],
    "achievements": ["Co-founder and commander of the SA (Sturmabteilung)", "Built the SA into a force of millions"],
    "quotes": ["The SA is the revolution!"]
  },
  "Hermann Goering": {
    "limitations": ["Failed to destroy the RAF during the Battle of Britain", "Convicted at Nuremberg and committed suicide"],
    "achievements": ["Founder of the Gestapo", "Commander of the Luftwaffe", "Ran the Four-Year Plan"],
    "quotes": ["Guns will make us powerful; butter will only make us fat."]
  },
  "Julius Streicher": {
    "limitations": ["Executed for crimes against humanity at Nuremberg"],
    "achievements": ["Founder and publisher of the viciously anti-Semitic newspaper Der Stürmer"],
    "quotes": ["The Jews are our misfortune!"]
  },
  "Anton Drexler": {
    "limitations": ["Pushed aside and made honorary president by Hitler in 1921"],
    "achievements": ["Founded the German Workers' Party (DAP), which became the Nazi Party"],
    "quotes": ["We need a dictator who is a genius."]
  },
  "Rudolf Hess": {
    "limitations": ["Flew to Scotland in 1941 on a bizarre solo peace mission and was imprisoned for life"],
    "achievements": ["Hitler's Deputy Führer", "Helped edit Mein Kampf while in Landsberg Prison"],
    "quotes": ["Hitler is simply pure reason incarnate."]
  },
  "Gregor Strasser": {
    "limitations": ["Murdered during the Night of the Long Knives for challenging Hitler's alliance with big business"],
    "achievements": ["Built up the Nazi Party's organization in northern Germany", "Championed the socialist elements of National Socialism"],
    "quotes": ["We are socialists, we are enemies of today's capitalistic economic system."]
  },
  "General Erich Ludendorff": {
    "limitations": ["Supported the failed Kapp Putsch and Munich Putsch", "Later isolated himself by founding a bizarre pagan religion"],
    "achievements": ["WWI hero who popularized the 'Stab in the Back' myth", "Lent crucial military prestige to Hitler's 1923 Putsch"],
    "quotes": ["The German army was stabbed in the back by the civilian government."]
  },
  "Joseph Goebbels": {
    "limitations": ["Committed suicide with his family in the Führerbunker in 1945"],
    "achievements": ["Minister of Public Enlightenment and Propaganda", "Masterminded the Nazi use of radio, film, and rallies"],
    "quotes": ["If you tell a lie big enough and keep repeating it, people will eventually come to believe it."]
  },
  "Heinrich Brüning": {
    "limitations": ["Nicknamed the 'Hunger Chancellor' for cutting benefits during the Depression", "Overthrown by intrigue in 1932"],
    "achievements": ["Chancellor from 1930 to 1932", "Attempted to solve the economic crisis using Article 48"],
    "quotes": ["We must balance the budget at all costs."]
  },
  "Ernst Thälmann": {
    "limitations": ["Refused to ally with the SPD against the Nazis", "Executed in Buchenwald concentration camp in 1944"],
    "achievements": ["Leader of the German Communist Party (KPD)", "Built the Red Front Fighters' League"],
    "quotes": ["A vote for Hindenburg is a vote for Hitler; a vote for Hitler is a vote for war."]
  },
  "Paul von Hindenburg": {
    "limitations": ["Underestimated Hitler, appointing him Chancellor in the belief he could be controlled"],
    "achievements": ["WWI Field Marshal and national hero", "President of the Weimar Republic from 1925 until his death in 1934"],
    "quotes": ["I will box Hitler in."]
  },
  "Franz von Papen": {
    "limitations": ["Disastrously miscalculated by convincing Hindenburg to make Hitler Chancellor"],
    "achievements": ["Chancellor in 1932", "Brokered the political deal that brought Hitler to power in January 1933"],
    "quotes": ["Within two months we will have pushed Hitler so far into a corner that he'll squeak."]
  },
  "Kurt von Schleicher": {
    "limitations": ["Failed to split the Nazi Party using Gregor Strasser", "Murdered during the Night of the Long Knives"],
    "achievements": ["The last Chancellor of the Weimar Republic before Hitler"],
    "quotes": ["I have not brought the army into politics in order to let it be ruined by politics."]
  },
  "Marinus van der Lubbe": {
    "limitations": ["Executed by guillotine after a show trial"],
    "achievements": ["Dutch communist accused of starting the Reichstag Fire in February 1933", "His act gave Hitler the excuse to pass the Reichstag Fire Decree"],
    "quotes": ["I set fire to the Reichstag as a protest."]
  },
  "Heinrich Himmler": {
    "limitations": ["Committed suicide after being captured by British forces in 1945"],
    "achievements": ["Reichsführer of the SS", "Architect of the Holocaust and the concentration camp system"],
    "quotes": ["The best political weapon is the weapon of terror."]
  },
  "Reinhard Heydrich": {
    "limitations": ["Assassinated by Czech resistance fighters in 1942"],
    "achievements": ["Head of the SD (Security Service)", "Chaired the Wannsee Conference which organized the Final Solution"],
    "quotes": ["The SS must be a sworn community of the best German blood."]
  },
  "Albert Speer": {
    "limitations": ["Sentenced to 20 years at Nuremberg despite claiming ignorance of the Holocaust"],
    "achievements": ["Hitler's chief architect", "Minister of Armaments, significantly increasing wartime production"],
    "quotes": ["I was Hitler's architect, not his politician."]
  },
  "Jesse Owens": {
    "limitations": ["Still faced severe racial segregation when he returned to the United States"],
    "achievements": ["Won 4 gold medals at the 1936 Berlin Olympics, undermining Nazi theories of Aryan racial supremacy"],
    "quotes": ["We all have dreams. But in order to make dreams come into reality, it takes an awful lot of determination."]
  },
  "Martin Niemöller": {
    "limitations": ["Initially supported Hitler's strong nationalism before realizing the regime's evil"],
    "achievements": ["Co-founded the Confessing Church to resist the Nazification of Protestantism", "Survived concentration camps"],
    "quotes": ["First they came for the socialists, and I did not speak out..."]
  },
  "George Elser": {
    "limitations": ["His bomb detonated 13 minutes after Hitler unexpectedly left the building", "Executed in Dachau in 1945"],
    "achievements": ["Planned and executed the 1939 Bürgerbräukeller assassination attempt completely alone"],
    "quotes": ["I wanted to prevent even greater bloodshed."]
  },
  "Dietrich Bonhoeffer": {
    "limitations": ["Arrested in 1943 and executed at Flossenbürg concentration camp just weeks before the war ended"],
    "achievements": ["Prominent theologian who actively joined the Abwehr resistance to overthrow Hitler"],
    "quotes": ["Silence in the face of evil is itself evil."]
  },
  "Carl von Ossietzky": {
    "limitations": ["Died in police custody in 1938 after suffering brutal treatment in concentration camps"],
    "achievements": ["Exposed secret German rearmament", "Awarded the Nobel Peace Prize while a prisoner of the Nazis"],
    "quotes": ["I am a pacifist, and I will not be silenced."]
  },
  "August Landmesser": {
    "limitations": ["Imprisoned for his relationship with a Jewish woman and drafted into a penal battalion where he was killed"],
    "achievements": ["Famously photographed in 1936 refusing to give the Nazi salute at a shipyard rally"],
    "quotes": ["(Actions spoke louder than words: refusing the salute)"]
  },
  "Gertrud Scholtz-Klink": {
    "limitations": ["Despite her high rank, she had no real political power in the male-dominated Nazi hierarchy"],
    "achievements": ["Reich Women's Leader", "Organized millions of German women into Nazi domestic organizations"],
    "quotes": ["The mission of woman is to minister in the home."]
  },
  "Judith Kerr": {
    "limitations": ["Forced to flee her homeland and leave behind her entire life and language"],
    "achievements": ["Authored 'When Hitler Stole Pink Rabbit', educating millions about the refugee experience"],
    "quotes": ["I had a happy childhood, despite the circumstances."]
  },
  "Anna Lehnkering": {
    "limitations": ["Murdered by the state at the age of 24, a victim of Nazi eugenics"],
    "achievements": ["Her tragic story serves as a powerful historical testament to the victims of the T4 Euthanasia program"],
    "quotes": ["(Her memory is preserved by historians to give voice to the voiceless)"]
  },
  "Friedrich-Paul von Groszheim": {
    "limitations": ["Suffered physical and psychological torture at the hands of the state for his sexuality"],
    "achievements": ["Survived the regime and his testimony helped expose the brutal Nazi persecution of homosexuals"],
    "quotes": ["They destroyed my youth, but they could not destroy my soul."]
  },
  "Pope Pius XI": {
    "limitations": ["His 1933 Concordat gave Hitler crucial early legitimacy on the world stage"],
    "achievements": ["Authored the 1937 encyclical 'Mit brennender Sorge', openly condemning Nazi racism and paganism"],
    "quotes": ["Whoever exalts race... distorts and perverts an order of the world planned and created by God."]
  },
  "Gustav von Kahr": {
    "limitations": ["Brutally murdered during the Night of the Long Knives in 1934 as revenge for 1923"],
    "achievements": ["Bavarian leader who crushed Hitler's 1923 Munich Putsch by refusing to support it"],
    "quotes": ["I will not be bullied into treason."]
  },
  "Otto von Lossow": {
    "limitations": ["His career ended shortly after the Putsch as he was forced to resign by the national army command"],
    "achievements": ["Commanded the Bavarian army and ultimately refused to join Hitler's uprising in 1923"],
    "quotes": ["I am loyal to the state, not to a mob."]
  },
  "Hans von Seisser": {
    "limitations": ["Like Kahr and Lossow, his political influence faded rapidly after the 1923 crisis"],
    "achievements": ["Commanded the Bavarian state police, ensuring the police fired on the marching Nazis"],
    "quotes": ["Order must be maintained in Munich."]
  },
  "Benito Mussolini": {
    "limitations": ["His alliance with Hitler ultimately led to his execution and the destruction of fascist Italy"],
    "achievements": ["Fascist Dictator of Italy", "His 1922 'March on Rome' inspired Hitler's Munich Putsch"],
    "quotes": ["Everything in the State, nothing outside the State, nothing against the State."]
  },
  "Prof. Ian Kershaw": {
    "limitations": ["Structuralist views are sometimes criticized for minimizing Hitler's personal responsibility"],
    "achievements": ["Developed the 'Hitler Myth' theory", "Argued that Germans 'worked towards the Führer'"],
    "quotes": ["Hitler's dictatorship rested on the readiness of others to 'work towards' him."]
  },
  "Prof. Richard J. Evans": {
    "limitations": ["His massive trilogy requires extensive reading to fully grasp the nuanced arguments"],
    "achievements": ["Author of the definitive 'Third Reich' trilogy", "Expert witness who crushed Holocaust denial in court"],
    "quotes": ["The Nazi terror was not a secret; it was a public performance."]
  },
  "Prof. Mary Fulbrook": {
    "limitations": ["Her focus on everyday life sometimes downplays high-level political history"],
    "achievements": ["Pioneered the study of 'Dissonant Lives'", "Explored how ordinary Germans were complicit in Nazi crimes"],
    "quotes": ["Complicity was the price of survival in the Third Reich."]
  }
};

const dataPath = path.join(__dirname, '../public/units/weimar_nazi_germany/data.js');
let content = fs.readFileSync(dataPath, 'utf8');

const startIdx = content.indexOf('{');
const endIdx = content.lastIndexOf('}') + 1;
const jsStr = content.substring(startIdx, endIdx);

let dataObj;
try {
  dataObj = eval('(' + jsStr + ')');
} catch(e) {
  console.error("Error parsing data.js", e);
  process.exit(1);
}

if (dataObj.key_individuals) {
  dataObj.key_individuals.forEach(ind => {
    const enrichment = enrichmentData[ind.name];
    if (enrichment) {
      ind.limitations = enrichment.limitations;
      ind.achievements = enrichment.achievements;
      ind.quotes = enrichment.quotes;
    }
  });
}

const newContent = `export default ${JSON.stringify(dataObj, null, 2)};\n`;
fs.writeFileSync(dataPath, newContent, 'utf8');
console.log("Successfully patched Weimar key_individuals with enrichment data.");
