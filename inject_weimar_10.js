const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'weimar_nazi_germany', 'data.js');
const { unitData } = require('./weimar_nazi_germany/data.js');

const doNows = {
    "lesson_1_1": [
        { "question": "What was the Triple Entente in the First World War?", "answer": "An alliance between Britain, France, and Russia." },
        { "question": "What was the Triple Alliance?", "answer": "An alliance between Germany, Austria-Hungary, and Italy." },
        { "question": "What is a 'dictatorship'?", "answer": "A country ruled by a single leader with total power." },
        { "question": "What is a 'democracy'?", "answer": "A system where the government is elected by the people." },
        { "question": "What does 'abdicate' mean?", "answer": "When a monarch steps down from the throne." },
        { "question": "What is a 'republic'?", "answer": "A country without a monarch, usually led by an elected president." },
        { "question": "What does 'inflation' mean?", "answer": "The general increase in prices and fall in the purchasing value of money." },
        { "question": "What is an 'armistice'?", "answer": "A formal agreement to stop fighting; a truce." },
        { "question": "What does 'mutiny' mean?", "answer": "An open rebellion against the proper authorities, especially by soldiers or sailors." },
        { "question": "In what year did the First World War begin?", "answer": "1914." }
    ],
    "lesson_1_2": [
        { "question": "When did the First World War end?", "answer": "11 November 1918." },
        { "question": "Who was the Kaiser of Germany during WW1?", "answer": "Kaiser Wilhelm II." },
        { "question": "Why did the Kaiser abdicate?", "answer": "Germany was losing the war, there were food shortages, and sailors mutinied at Kiel." },
        { "question": "What was the 'stab in the back' myth (Dolchstoßlegende)?", "answer": "The false belief that the German army was betrayed by socialist and Jewish politicians." },
        { "question": "Who were the 'November Criminals'?", "answer": "The nickname given by right-wing Germans to the politicians who signed the Armistice." },
        { "question": "What is a 'democracy'?", "answer": "A system where the government is elected by the people." },
        { "question": "What is a 'republic'?", "answer": "A country without a monarch." },
        { "question": "What does 'mutiny' mean?", "answer": "A rebellion by soldiers or sailors." },
        { "question": "What was the Triple Entente?", "answer": "The alliance of Britain, France, and Russia." },
        { "question": "What does 'abdicate' mean?", "answer": "To step down from the throne." }
    ],
    "lesson_1_3": [
        { "question": "What was the Weimar Constitution?", "answer": "The set of rules for how Germany would be governed as a democratic republic." },
        { "question": "What was Proportional Representation (PR)?", "answer": "An electoral system where the percentage of votes equals the percentage of seats in the Reichstag." },
        { "question": "Why was Proportional Representation a weakness?", "answer": "It led to dozens of tiny parties and weak coalition governments." },
        { "question": "What was Article 48?", "answer": "It allowed the President to make laws without the Reichstag in an emergency." },
        { "question": "Who was the first President of the Weimar Republic?", "answer": "Friedrich Ebert." },
        { "question": "What was the 'stab in the back' myth?", "answer": "The belief that Germany was betrayed by politicians, not defeated in battle." },
        { "question": "Who were the 'November Criminals'?", "answer": "The politicians who signed the Armistice." },
        { "question": "When did WW1 end?", "answer": "1918." },
        { "question": "What is an 'armistice'?", "answer": "An agreement to stop fighting." },
        { "question": "What does 'inflation' mean?", "answer": "Prices rising rapidly." }
    ],
    "lesson_1_4": [
        { "question": "Which treaty punished Germany after WW1?", "answer": "The Treaty of Versailles (1919)." },
        { "question": "How much was Germany forced to pay in reparations?", "answer": "£6.6 billion." },
        { "question": "What was Article 231?", "answer": "The 'War Guilt Clause', forcing Germany to accept full blame for starting the war." },
        { "question": "How was the German army restricted by the Treaty?", "answer": "Limited to 100,000 men, no air force, no submarines, and 6 battleships." },
        { "question": "What happened to the Rhineland?", "answer": "It was demilitarised (no German troops allowed)." },
        { "question": "What was Proportional Representation?", "answer": "An electoral system leading to weak coalition governments." },
        { "question": "What was Article 48?", "answer": "The President's emergency decree power." },
        { "question": "Who were the November Criminals?", "answer": "The politicians who signed the 1918 Armistice." },
        { "question": "Who was Friedrich Ebert?", "answer": "The first President of the Weimar Republic." },
        { "question": "What is a 'dictatorship'?", "answer": "Rule by a single leader with total power." }
    ],
    "lesson_2_1": [
        { "question": "What was the Spartacist Uprising (1919)?", "answer": "A communist attempt to overthrow the Weimar government in Berlin." },
        { "question": "Who led the Spartacist Uprising?", "answer": "Rosa Luxemburg and Karl Liebknecht." },
        { "question": "Who were the Freikorps?", "answer": "Right-wing ex-soldiers who hated communists and helped crush the Spartacist Uprising." },
        { "question": "What was the Kapp Putsch (1920)?", "answer": "A right-wing attempt by Wolfgang Kapp and the Freikorps to overthrow the government." },
        { "question": "How did the government defeat the Kapp Putsch?", "answer": "They asked the workers of Berlin to go on a general strike." },
        { "question": "How much were the reparations set at?", "answer": "£6.6 billion." },
        { "question": "What was the War Guilt Clause?", "answer": "Article 231 of the Treaty of Versailles." },
        { "question": "What was Article 48?", "answer": "The President's emergency power." },
        { "question": "What was the 'stab in the back' myth?", "answer": "The belief that Germany was betrayed by politicians." },
        { "question": "What is a 'republic'?", "answer": "A country without a monarch." }
    ],
    "lesson_2_2": [
        { "question": "Why did France and Belgium invade the Ruhr in 1923?", "answer": "Because Germany had failed to pay its reparation instalment." },
        { "question": "How did German workers react to the Ruhr invasion?", "answer": "They used 'passive resistance' (going on strike)." },
        { "question": "What caused Hyperinflation in 1923?", "answer": "The government printed massive amounts of money to pay the striking Ruhr workers." },
        { "question": "Who suffered most from Hyperinflation?", "answer": "People with fixed savings and pensions, as their money became worthless." },
        { "question": "Who benefitted from Hyperinflation?", "answer": "People with debts or loans, as they could pay them off easily." },
        { "question": "Who were the Freikorps?", "answer": "Right-wing ex-soldiers." },
        { "question": "Who led the Spartacist Uprising?", "answer": "Rosa Luxemburg and Karl Liebknecht." },
        { "question": "How was the Kapp Putsch defeated?", "answer": "By a workers' general strike." },
        { "question": "What was Proportional Representation?", "answer": "An electoral system causing weak coalitions." },
        { "question": "What were the military restrictions of the Treaty of Versailles?", "answer": "100k men, no air force, 6 battleships." }
    ],
    "lesson_2_3": [
        { "question": "Who became Chancellor in 1923 and helped end hyperinflation?", "answer": "Gustav Stresemann." },
        { "question": "What new currency did Stresemann introduce in 1923?", "answer": "The Rentenmark." },
        { "question": "What was the Dawes Plan (1924)?", "answer": "A plan to reduce annual reparation payments and secure 800 million marks in US loans." },
        { "question": "What was the Young Plan (1929)?", "answer": "It reduced the total reparations bill from £6.6 billion to £2 billion and gave Germany longer to pay." },
        { "question": "What was the Locarno Pact (1925)?", "answer": "An agreement where Germany accepted its western borders with France." },
        { "question": "Why did France invade the Ruhr in 1923?", "answer": "Germany defaulted on reparations." },
        { "question": "What was passive resistance?", "answer": "Workers striking against the French in the Ruhr." },
        { "question": "Who suffered most from hyperinflation?", "answer": "People with fixed savings." },
        { "question": "What was the Kapp Putsch?", "answer": "A right-wing rebellion by the Freikorps." },
        { "question": "What was Article 231?", "answer": "The War Guilt clause." }
    ],
    "lesson_2_4": [
        { "question": "When did Germany join the League of Nations?", "answer": "1926." },
        { "question": "What was the Kellogg-Briand Pact (1928)?", "answer": "An international agreement where 62 countries promised not to use war to resolve disputes." },
        { "question": "Why did the 'Golden Age' (1924-29) rely on 'dancing on a volcano'?", "answer": "The economic recovery was heavily dependent on short-term American loans." },
        { "question": "How did culture change during the Golden Age?", "answer": "There was a boom in avant-garde art, cinema (e.g. Metropolis), and cabaret." },
        { "question": "What did Stresemann introduce to fix hyperinflation?", "answer": "The Rentenmark." },
        { "question": "What was the Dawes Plan?", "answer": "US loans to Germany to help pay reparations." },
        { "question": "What was the Young Plan?", "answer": "A reduction of the total reparation amount." },
        { "question": "What was the Locarno Pact?", "answer": "An agreement accepting western borders." },
        { "question": "Why did the French invade the Ruhr?", "answer": "Missed reparation payments." },
        { "question": "Who were the November Criminals?", "answer": "Politicians who signed the Armistice." }
    ],
    "lesson_3_1": [
        { "question": "What was the original name of the Nazi Party?", "answer": "The German Workers' Party (DAP)." },
        { "question": "What was the 25-Point Programme (1920)?", "answer": "The Nazi manifesto containing nationalist, socialist, and anti-Semitic ideas." },
        { "question": "Who were the SA (Sturmabteilung)?", "answer": "Hitler's private army, also known as the Brownshirts, who protected meetings and beat up communists." },
        { "question": "What was the Munich Putsch (1923)?", "answer": "Hitler's failed armed attempt to overthrow the Weimar government in Bavaria." },
        { "question": "What was the result of the Munich Putsch for Hitler?", "answer": "He was arrested, gained national publicity at his trial, and wrote 'Mein Kampf' in prison." },
        { "question": "What was the Kellogg-Briand Pact?", "answer": "An agreement not to use war to solve disputes." },
        { "question": "When did Germany join the League of Nations?", "answer": "1926." },
        { "question": "What new currency ended hyperinflation?", "answer": "The Rentenmark." },
        { "question": "What was the Dawes Plan?", "answer": "US loans to help the German economy." },
        { "question": "Who led the Spartacist Uprising?", "answer": "Rosa Luxemburg." }
    ],
    "lesson_3_2": [
        { "question": "What was the Wall Street Crash (1929)?", "answer": "The collapse of the US stock market which triggered the Great Depression." },
        { "question": "How did the Wall Street Crash affect Germany?", "answer": "The USA recalled its loans, causing German businesses to collapse and unemployment to soar." },
        { "question": "How many Germans were unemployed by 1932?", "answer": "Over 6 million." },
        { "question": "How did the Weimar government react to the Depression?", "answer": "Chancellor Brüning cut unemployment benefits and raised taxes, which was highly unpopular." },
        { "question": "Why did Nazi support surge during the Depression?", "answer": "Hitler promised 'Work and Bread' and people were desperate for extreme solutions." },
        { "question": "What was the 25-Point Programme?", "answer": "The Nazi manifesto." },
        { "question": "Who were the SA?", "answer": "The Brownshirts; Hitler's private army." },
        { "question": "What book did Hitler write in prison?", "answer": "Mein Kampf." },
        { "question": "What was the Munich Putsch?", "answer": "Hitler's failed attempt to seize power in 1923." },
        { "question": "Why did the 'Golden Age' end?", "answer": "Because it relied on US loans." }
    ],
    "lesson_3_3": [
        { "question": "Who was Paul von Hindenburg?", "answer": "The aging President of the Weimar Republic from 1925 to 1934." },
        { "question": "Who were the three chancellors before Hitler (1930-1932)?", "answer": "Brüning, von Papen, and von Schleicher." },
        { "question": "Why did Hindenburg appoint Hitler as Chancellor in January 1933?", "answer": "Von Papen convinced Hindenburg that they could control Hitler ('make him squeak')." },
        { "question": "What percentage of the vote did the Nazis get in July 1932?", "answer": "37% (making them the largest party)." },
        { "question": "What was the Wall Street Crash?", "answer": "The 1929 US economic collapse." },
        { "question": "How many Germans were unemployed by 1932?", "answer": "6 million." },
        { "question": "How did Brüning try to fix the Depression?", "answer": "By cutting benefits and raising taxes." },
        { "question": "Who was the first President of the Weimar Republic?", "answer": "Friedrich Ebert." },
        { "question": "What was Article 48?", "answer": "Emergency presidential powers." },
        { "question": "What was the Dawes Plan?", "answer": "American loans to Germany." }
    ],
    "lesson_3_4": [
        { "question": "What happened to the Reichstag building in February 1933?", "answer": "It was burned down, and a Dutch communist (van der Lubbe) was blamed." },
        { "question": "What was the Decree for the Protection of the People and State?", "answer": "An emergency law passed after the fire that suspended civil rights and allowed communists to be arrested." },
        { "question": "What was the Enabling Act (March 1933)?", "answer": "It gave Hitler the power to make laws without the Reichstag for four years, effectively making him a dictator." },
        { "question": "What did Hitler do to trade unions in May 1933?", "answer": "He banned them and replaced them with the German Labour Front (DAF)." },
        { "question": "What was the Night of the Long Knives (June 1934)?", "answer": "Hitler used the SS to murder the leaders of the SA, including Ernst Röhm, to win the army's support." },
        { "question": "What title did Hitler take upon Hindenburg's death in 1934?", "answer": "Führer (combining President and Chancellor)." },
        { "question": "Who appointed Hitler as Chancellor?", "answer": "President Hindenburg." },
        { "question": "Who convinced Hindenburg to appoint Hitler?", "answer": "Franz von Papen." },
        { "question": "What was the SA?", "answer": "The Brownshirts." },
        { "question": "What was the 25-Point Programme?", "answer": "The Nazi manifesto." }
    ],
    "lesson_4_1": [
        { "question": "Who was Joseph Goebbels?", "answer": "The Minister of People's Enlightenment and Propaganda." },
        { "question": "Name two methods of Nazi propaganda.", "answer": "Censorship, mass rallies, cheap radios, and controlling the press." },
        { "question": "Who were the SS (Schutzstaffel)?", "answer": "Hitler's elite black-shirted personal bodyguard, led by Heinrich Himmler." },
        { "question": "What was the Gestapo?", "answer": "The secret state police who spied on citizens using a network of informers." },
        { "question": "What was the role of concentration camps in the 1930s?", "answer": "To imprison political opponents, such as communists and vocal critics." },
        { "question": "What was the Enabling Act?", "answer": "A law giving Hitler dictatorial powers." },
        { "question": "What was the Night of the Long Knives?", "answer": "Hitler's purge of the SA leadership." },
        { "question": "Who was Ernst Röhm?", "answer": "The leader of the SA who was murdered." },
        { "question": "What happened to the Reichstag in 1933?", "answer": "It burned down." },
        { "question": "What title did Hitler take in 1934?", "answer": "Führer." }
    ],
    "lesson_4_2": [
        { "question": "What were the 'Three Ks' for women in Nazi Germany?", "answer": "Kinder, Küche, Kirche (Children, Kitchen, Church)." },
        { "question": "What was the Law for the Encouragement of Marriage?", "answer": "Loans given to young couples, which they could keep a portion of for every child they had." },
        { "question": "What was the Mother's Cross?", "answer": "A medal awarded to women who had large numbers of children (e.g. Gold for 8+)." },
        { "question": "What was the Hitler Youth?", "answer": "The mandatory youth organization that indoctrinated boys and prepared them for the military." },
        { "question": "How did schools change under the Nazis?", "answer": "Textbooks were rewritten, Jewish teachers fired, and subjects like 'Race Studies' were introduced." },
        { "question": "Who was Joseph Goebbels?", "answer": "The Minister of Propaganda." },
        { "question": "What was the Gestapo?", "answer": "The secret state police." },
        { "question": "Who led the SS?", "answer": "Heinrich Himmler." },
        { "question": "What was the Enabling Act?", "answer": "The law that allowed Hitler to bypass the Reichstag." },
        { "question": "Who were the 'November Criminals'?", "answer": "The politicians who signed the Armistice." }
    ],
    "lesson_4_3": [
        { "question": "What was the National Labour Service (RAD)?", "answer": "A compulsory scheme where young men did six months of manual public works (like building autobahns)." },
        { "question": "How did Hitler reduce the official unemployment figures?", "answer": "By creating public works, rearming, and removing women and Jews from the register." },
        { "question": "What was 'Strength Through Joy' (KdF)?", "answer": "An organization providing cheap holidays and leisure activities for loyal workers." },
        { "question": "What was the 'Beauty of Labour' (SdA)?", "answer": "A scheme designed to improve working conditions in factories." },
        { "question": "What did the German Labour Front (DAF) replace?", "answer": "Trade unions (which Hitler had banned)." },
        { "question": "What were the 'Three Ks'?", "answer": "Children, Kitchen, Church." },
        { "question": "What was the Hitler Youth?", "answer": "The Nazi organization for indoctrinating boys." },
        { "question": "What was the Mother's Cross?", "answer": "A medal for having many children." },
        { "question": "Who was the Minister of Propaganda?", "answer": "Joseph Goebbels." },
        { "question": "What was the Night of the Long Knives?", "answer": "The purge of the SA." }
    ],
    "lesson_4_4": [
        { "question": "What did the Nazis mean by 'Untermenschen'?", "answer": "Sub-humans (the racist term applied to Jews, Slavs, and Roma)." },
        { "question": "What were the Nuremberg Laws (1935)?", "answer": "Laws that stripped Jews of German citizenship and banned marriage between Jews and non-Jews." },
        { "question": "What happened during Kristallnacht (1938)?", "answer": "The 'Night of Broken Glass': a violent nationwide pogrom against Jewish shops, homes, and synagogues." },
        { "question": "What happened to the disabled under Nazi rule?", "answer": "Hundreds of thousands were forcibly sterilized, and later murdered in the T4 euthanasia programme." },
        { "question": "How did the Nazis treat minority groups like homosexuals and Jehovah's Witnesses?", "answer": "They were persecuted and sent to concentration camps." },
        { "question": "What was the National Labour Service (RAD)?", "answer": "A compulsory manual labor scheme for young men." },
        { "question": "What was 'Strength Through Joy' (KdF)?", "answer": "Cheap holidays for workers." },
        { "question": "How did Hitler reduce unemployment?", "answer": "Rearmament and public works (like autobahns)." },
        { "question": "What were the 'Three Ks'?", "answer": "Children, Kitchen, Church." },
        { "question": "What was the Gestapo?", "answer": "The secret state police." }
    ]
};

unitData.lessons.forEach(lesson => {
    if (doNows[lesson.id]) {
        lesson.do_now = {
            type: "retrieval",
            questions: doNows[lesson.id]
        };
    }
});

const updatedCode = `const unitData = ${JSON.stringify(unitData, null, 2)};

if (typeof module !== 'undefined') {
  module.exports = { unitData };
}
`;

fs.writeFileSync(dataPath, updatedCode, 'utf8');

console.log("Successfully OVERWROTE weimar_nazi_germany/data.js with 10-question 'Do Now' tasks.");
