const fs = require('fs');
const path = require('path');

// --- 1. GREAT WAR ---
const gwPath = path.join(__dirname, 'great_war', 'data.js');
let gwCode = fs.readFileSync(gwPath, 'utf8');

const gwQuestions = {
    "Franco-Prussian": [
        { q: "What was the primary goal of Bismarck in defeating France?", a: "To unify the southern German states with the north", options: ["To unify the southern German states with the north", "To steal French gold", "To crown himself Emperor", "To conquer Paris permanently"] },
        { q: "Which French territory was annexed by Germany, creating lasting resentment?", a: "Alsace-Lorraine", options: ["Alsace-Lorraine", "Normandy", "Burgundy", "The Rhineland"] },
        { q: "Who was the Prussian King that was crowned German Emperor?", a: "Wilhelm I", options: ["Wilhelm I", "Wilhelm II", "Frederick the Great", "Bismarck"] },
        { q: "What event did Bismarck use to trick France into declaring war?", a: "Editing the Ems Telegram", options: ["Editing the Ems Telegram", "Assassinating a French minister", "Invading a border town", "Sinking a French ship"] },
        { q: "What happened to Napoleon III at the Battle of Sedan?", a: "He was captured along with his army", options: ["He was captured along with his army", "He was killed in combat", "He successfully escaped to Britain", "He defeated the Prussians"] },
        { q: "What treaty formally ended the Franco-Prussian War?", a: "Treaty of Frankfurt", options: ["Treaty of Frankfurt", "Treaty of Versailles", "Treaty of Paris", "Treaty of Berlin"] },
        { q: "Why did Bismarck fear a French alliance with Russia?", a: "It would force Germany into a two-front war", options: ["It would force Germany into a two-front war", "Russia had a stronger navy", "France would buy Russian weapons", "It would stop German trade"] },
        { q: "Where exactly was the new German Empire proclaimed?", a: "The Hall of Mirrors at Versailles", options: ["The Hall of Mirrors at Versailles", "The Louvre", "The Reichstag in Berlin", "Notre Dame Cathedral"] }
    ],
    "Scramble for Africa": [
        { q: "What was the purpose of the 1884 Berlin Conference?", a: "To regulate European colonization and trade in Africa", options: ["To regulate European colonization and trade in Africa", "To form a military alliance against Britain", "To ban slavery worldwide", "To divide Asia among European powers"] },
        { q: "Which European power controlled the largest empire in Africa by 1914?", a: "Britain", options: ["Britain", "France", "Germany", "Belgium"] },
        { q: "Why did Kaiser Wilhelm II demand a 'place in the sun'?", a: "He wanted Germany to have a global empire like Britain and France", options: ["He wanted Germany to have a global empire like Britain and France", "He wanted a holiday home in Africa", "He wanted to conquer South America", "He wanted to control the Mediterranean Sea"] },
        { q: "What happened during the First Moroccan Crisis (1905)?", a: "The Kaiser visited Tangier and declared support for Moroccan independence", options: ["The Kaiser visited Tangier and declared support for Moroccan independence", "Germany invaded Morocco", "France surrendered Morocco to Britain", "The local sultan defeated the French army"] },
        { q: "What was the main result of the Algeciras Conference (1906)?", a: "Germany was humiliated and France was given control of Moroccan police", options: ["Germany was humiliated and France was given control of Moroccan police", "Germany gained full control of Morocco", "Morocco became fully independent", "Britain took over Morocco"] },
        { q: "What sparked the Second Moroccan Crisis (Agadir Crisis) in 1911?", a: "Germany sent the gunboat Panther to the port of Agadir", options: ["Germany sent the gunboat Panther to the port of Agadir", "France declared war on Germany", "Britain blockaded the Moroccan coast", "Moroccans attacked German tourists"] },
        { q: "How did the Agadir Crisis end?", a: "Germany backed down after being given a small strip of the Congo", options: ["Germany backed down after being given a small strip of the Congo", "Germany successfully conquered Morocco", "Britain declared war on Germany", "France was forced to leave Africa"] },
        { q: "What effect did the Moroccan Crises have on Anglo-French relations?", a: "It pushed Britain and France closer together in a strong alliance", options: ["It pushed Britain and France closer together in a strong alliance", "It caused a war between them", "It made Britain ally with Germany instead", "It led to Britain abandoning its empire"] }
    ],
    "battleship building": [
        { q: "Why was the HMS Dreadnought completely revolutionary?", a: "It was faster, heavier armored, and had all 'big-guns'", options: ["It was faster, heavier armored, and had all 'big-guns'", "It was the first submarine", "It could launch airplanes", "It was completely invisible to radar"] },
        { q: "What was the consequence of the Dreadnought's launch?", a: "It made all older battleships instantly obsolete, resetting the naval race", options: ["It made all older battleships instantly obsolete, resetting the naval race", "Germany immediately surrendered", "Britain stopped building ships", "France allied with Germany"] },
        { q: "What was the German 'Risk Theory' proposed by Admiral Tirpitz?", a: "Building a navy large enough that Britain wouldn't risk fighting it", options: ["Building a navy large enough that Britain wouldn't risk fighting it", "Attacking Britain immediately", "Building only submarines", "Refusing to build any ships to avoid angering Britain"] },
        { q: "What slogan did the British public chant in 1909 to demand more ships?", a: "'We want eight and we won't wait!'", options: ["'We want eight and we won't wait!'", "'Rule Britannia!'", "'Sink the Kaiser!'", "'More dreadnoughts now!'"] },
        { q: "Why did Britain feel so threatened by the German naval expansion?", a: "Britain is an island and relied entirely on its navy for survival and trade", options: ["Britain is an island and relied entirely on its navy for survival and trade", "They were worried Germany would steal their ships", "They wanted to attack Germany", "They had no army at all"] },
        { q: "What laws were passed in Germany to fund their massive naval buildup?", a: "The Naval Laws of 1898 and 1900", options: ["The Naval Laws of 1898 and 1900", "The Shipyard Acts", "The Tirpitz Decrees", "The Imperial Fleet Bills"] },
        { q: "By 1914, who had won the naval race?", a: "Britain, with 29 dreadnoughts to Germany's 17", options: ["Britain, with 29 dreadnoughts to Germany's 17", "Germany, with 30 dreadnoughts to Britain's 10", "They had exactly the same number", "France overtook both of them"] },
        { q: "How did the naval race affect British foreign policy?", a: "It forced Britain out of 'Splendid Isolation' and into an alliance with France and Russia", options: ["It forced Britain out of 'Splendid Isolation' and into an alliance with France and Russia", "It made them ally with Germany", "It caused them to declare war on America", "It made them give up their empire"] }
    ],
    "Alliance System": [
        { q: "Which three countries made up the Triple Alliance of 1882?", a: "Germany, Austria-Hungary, Italy", options: ["Germany, Austria-Hungary, Italy", "Germany, Russia, Austria-Hungary", "Britain, France, Russia", "Germany, Ottoman Empire, Italy"] },
        { q: "Which three countries formed the Triple Entente by 1907?", a: "Britain, France, Russia", options: ["Britain, France, Russia", "Germany, Austria-Hungary, Italy", "Britain, USA, France", "France, Russia, Italy"] },
        { q: "What was a major flaw of the alliance system?", a: "A small dispute between two nations could drag all major powers into war", options: ["A small dispute between two nations could drag all major powers into war", "It prevented any trade between the blocs", "It made the armies too small", "It forced countries to disarm"] },
        { q: "Why did Russia ally with France in 1894?", a: "Because Kaiser Wilhelm II allowed the Reinsurance Treaty with Russia to lapse", options: ["Because Kaiser Wilhelm II allowed the Reinsurance Treaty with Russia to lapse", "Because they shared the same religion", "Because France promised them African colonies", "Because Britain attacked them"] },
        { q: "What was the 'Entente Cordiale' signed in 1904?", a: "A friendly agreement between Britain and France, settling colonial disputes", options: ["A friendly agreement between Britain and France, settling colonial disputes", "A military alliance between Germany and Russia", "A peace treaty ending a war", "An agreement to build dreadnoughts together"] },
        { q: "Why did Britain finally decide to form alliances?", a: "They felt threatened by Germany's growing navy and aggressive Weltpolitik", options: ["They felt threatened by Germany's growing navy and aggressive Weltpolitik", "They wanted to conquer Europe", "They were invaded by France", "They needed money from Russia"] },
        { q: "What does 'Weltpolitik' mean?", a: "World policy (Germany's desire for a global empire)", options: ["World policy (Germany's desire for a global empire)", "Naval supremacy", "Splendid isolation", "Peaceful co-existence"] },
        { q: "Which nation in the Triple Alliance was seen as the 'weak link'?", a: "Italy", options: ["Italy", "Germany", "Austria-Hungary", "Britain"] }
    ],
    "Sarajevo": [
        { q: "Which empire had annexed Bosnia in 1908, angering Serbian nationalists?", a: "Austria-Hungary", options: ["Austria-Hungary", "The Ottoman Empire", "Russia", "Germany"] },
        { q: "Who was the heir to the Austro-Hungarian throne that visited Sarajevo?", a: "Archduke Franz Ferdinand", options: ["Archduke Franz Ferdinand", "Emperor Franz Joseph", "Kaiser Wilhelm II", "Tsar Nicholas II"] },
        { q: "What terrorist group supplied the assassins with weapons?", a: "The Black Hand", options: ["The Black Hand", "Young Bosnia", "The Red Army", "The Serbian Guard"] },
        { q: "What was the first, failed assassination attempt on the Archduke that morning?", a: "A bomb was thrown at his car but bounced off", options: ["A bomb was thrown at his car but bounced off", "He was shot at but missed", "His driver was poisoned", "A bridge was blown up"] },
        { q: "Why was Gavrilo Princip standing outside Schiller's Delicatessen when the Archduke's car stopped?", a: "By total coincidence, the driver took a wrong turn and stalled the car right in front of him", options: ["By total coincidence, the driver took a wrong turn and stalled the car right in front of him", "Princip had planned the exact route", "The Archduke went in to buy a sandwich", "The police ordered the car to stop there"] },
        { q: "What was the 'Blank Cheque'?", a: "Germany's promise of unconditional support to Austria-Hungary against Serbia", options: ["Germany's promise of unconditional support to Austria-Hungary against Serbia", "A bribe paid to the assassins", "A peace offer from Russia", "The money used to buy the guns"] },
        { q: "What happened on July 23, 1914?", a: "Austria-Hungary sent an impossibly harsh ultimatum to Serbia", options: ["Austria-Hungary sent an impossibly harsh ultimatum to Serbia", "Germany invaded Belgium", "Russia declared war", "Britain joined the war"] },
        { q: "Why did Britain declare war on Germany on August 4, 1914?", a: "Germany invaded neutral Belgium, violating the 1839 Treaty of London", options: ["Germany invaded neutral Belgium, violating the 1839 Treaty of London", "Because of the assassination in Sarajevo", "Because France surrendered", "Because Germany sank a British ship"] }
    ]
};

// --- 2. GREAT WAR PART 2 ---
const gw2Path = path.join(__dirname, 'great_war_part2', 'data.js');
let gw2Code = fs.readFileSync(gw2Path, 'utf8');

const gw2Questions = {
    "Lesson 1": [
        { q: "What was the BEF in 1914?", a: "The British Expeditionary Force, a small professional army", options: ["The British Expeditionary Force, a small professional army", "The British Elite Fleet", "The Big European Front", "The Belgian Eastern Force"] },
        { q: "What did most people in Britain believe about the war in August 1914?", a: "It would be 'over by Christmas'", options: ["It would be 'over by Christmas'", "It would last for a decade", "It would destroy the empire", "They would lose immediately"] },
        { q: "What powerful emotion was used on recruitment posters to shame men into joining?", a: "Guilt and cowardice", options: ["Guilt and cowardice", "Greed", "Anger", "Happiness"] },
        { q: "Who were the 'Bantams'?", a: "Special battalions for men who were shorter than the standard height requirement", options: ["Special battalions for men who were shorter than the standard height requirement", "Elite snipers", "Young boys who lied about their age", "Cavalry troops"] },
        { q: "How did the government use peer pressure to encourage enlistment?", a: "By forming 'Pals Battalions' so men could fight alongside their friends and colleagues", options: ["By forming 'Pals Battalions' so men could fight alongside their friends and colleagues", "By paying them more", "By threatening to shoot them", "By forcing their wives to work"] },
        { q: "What happened to recruitment numbers by late 1915?", a: "They dropped significantly as the reality of trench warfare became known", options: ["They dropped significantly as the reality of trench warfare became known", "They increased massively", "They stayed exactly the same", "Everyone in Britain had joined"] },
        { q: "What was the Military Service Act of 1916?", a: "The law that introduced conscription, forcing men to fight", options: ["The law that introduced conscription, forcing men to fight", "A law banning women from fighting", "A law reducing the size of the army", "A law ending the war"] },
        { q: "What was a common reason men gave for joining the army in 1914, apart from patriotism?", a: "To escape boring jobs and seek adventure", options: ["To escape boring jobs and seek adventure", "To learn how to speak French", "To become politicians", "Because they hated Germany"] }
    ],
    "Lesson 2": [
        { q: "What tactic was used by the British to 'soften up' the German trenches before the Somme attack?", a: "A massive 7-day artillery bombardment", options: ["A massive 7-day artillery bombardment", "Poison gas", "A stealthy night raid", "A tank assault"] },
        { q: "Why did the artillery bombardment fail?", a: "It failed to cut the barbed wire and the German dugouts were too deep", options: ["It failed to cut the barbed wire and the German dugouts were too deep", "They ran out of shells on day two", "The guns exploded", "The Germans retreated before it started"] },
        { q: "What order were the British infantry given when going over the top on July 1st?", a: "To walk slowly in straight lines", options: ["To walk slowly in straight lines", "To sprint across No Man's Land", "To crawl on their stomachs", "To ride on horseback"] },
        { q: "What happened when the British artillery barrage stopped to allow the infantry to advance?", a: "The Germans rushed up from their dugouts and manned their machine guns", options: ["The Germans rushed up from their dugouts and manned their machine guns", "The Germans surrendered", "The Germans counter-attacked", "The British stopped advancing"] },
        { q: "What devastating effect did the Battle of the Somme have back home in Britain?", a: "Pals Battalions were wiped out, devastating entire local communities simultaneously", options: ["Pals Battalions were wiped out, devastating entire local communities simultaneously", "The government collapsed instantly", "Food rationing was immediately introduced", "Everyone stopped volunteering"] },
        { q: "Why do some historians defend General Haig?", a: "He was fighting a new type of industrial war and eventually led the army to victory in 1918", options: ["He was fighting a new type of industrial war and eventually led the army to victory in 1918", "He fought on the front lines with a sword", "He never lost a single battle", "He invented the tank"] },
        { q: "What was the 'creeping barrage' tactic that was developed later?", a: "Artillery firing just ahead of the advancing infantry to provide cover", options: ["Artillery firing just ahead of the advancing infantry to provide cover", "A slow gas attack", "Tanks moving slowly", "Cavalry advancing in waves"] },
        { q: "By the end of the Battle of the Somme, what was the total number of British casualties?", a: "Over 400,000", options: ["Over 400,000", "57,000", "1 million", "50,000"] }
    ],
    "Lesson 3": [
        { q: "Which campaign in 1915 was designed to knock the Ottoman Empire out of the war?", a: "The Gallipoli Campaign", options: ["The Gallipoli Campaign", "The Somme", "The Battle of Jutland", "The Arab Revolt"] },
        { q: "What was the geographic significance of the Dardanelles Strait?", a: "It connected the Mediterranean to the Black Sea, which could supply Russia", options: ["It connected the Mediterranean to the Black Sea, which could supply Russia", "It was the only way into Germany", "It held massive oil reserves", "It was the home of the Ottoman Emperor"] },
        { q: "Who suffered heavy casualties at Gallipoli, forging a sense of national identity?", a: "The ANZACs (Australians and New Zealanders)", options: ["The ANZACs (Australians and New Zealanders)", "The Americans", "The Canadians", "The South Africans"] },
        { q: "Why did the Gallipoli campaign ultimately fail?", a: "Poor planning, underestimating the Turkish defenders, and difficult terrain", options: ["Poor planning, underestimating the Turkish defenders, and difficult terrain", "A sudden snowstorm froze the troops", "The Navy refused to help", "They ran out of ammunition on day one"] },
        { q: "What global event in 1917 finally brought the United States into the war?", a: "The Zimmermann Telegram and unrestricted submarine warfare", options: ["The Zimmermann Telegram and unrestricted submarine warfare", "The sinking of the Lusitania alone", "The invasion of France", "The Russian Revolution"] },
        { q: "What did the Zimmermann Telegram propose?", a: "A German alliance with Mexico against the USA", options: ["A German alliance with Mexico against the USA", "A German alliance with Canada", "A peace treaty with Britain", "The surrender of the Ottoman Empire"] },
        { q: "What vital role did the British Indian Army play?", a: "Over a million served, fighting in Europe, the Middle East, and Africa", options: ["Over a million served, fighting in Europe, the Middle East, and Africa", "They only fought against Japan", "They refused to fight in Europe", "They guarded the British coastline"] },
        { q: "How did the entry of the USA change the course of the war?", a: "It provided fresh troops, vast resources, and shattered German morale", options: ["It provided fresh troops, vast resources, and shattered German morale", "It introduced nuclear weapons", "It immediately caused the Kaiser to resign", "It had no real impact"] }
    ],
    "Lesson 4": [
        { q: "What does 'Total War' mean?", a: "A war where the entire society and economy is mobilized for the war effort", options: ["A war where the entire society and economy is mobilized for the war effort", "A war where no prisoners are taken", "A war fought only by civilians", "A war that covers the entire globe"] },
        { q: "What happened to the employment of women during the war?", a: "Over a million women took up jobs previously done by men", options: ["Over a million women took up jobs previously done by men", "Women were banned from working", "Women only worked as nurses", "Nothing changed"] },
        { q: "Why did the government introduce DORA (Defence of the Realm Act)?", a: "To give themselves emergency powers to control everyday life and secure the war effort", options: ["To give themselves emergency powers to control everyday life and secure the war effort", "To ban the monarchy", "To stop women from voting", "To force the Irish to fight"] },
        { q: "What was the 'Shell Crisis' of 1915?", a: "A severe shortage of artillery shells on the front line", options: ["A severe shortage of artillery shells on the front line", "A disease spread by snails in the trenches", "A shortage of eggs for soldiers", "A mutiny by factory workers"] },
        { q: "How did the government solve the Shell Crisis?", a: "David Lloyd George was made Minister of Munitions and reorganised industry", options: ["David Lloyd George was made Minister of Munitions and reorganised industry", "They bought all their shells from America", "They surrendered", "They forced captured Germans to make them"] },
        { q: "What impact did the war have on the British class system?", a: "It blurred class boundaries as rich and poor fought and died together", options: ["It blurred class boundaries as rich and poor fought and died together", "It made the rich richer and poor poorer", "It completely abolished the upper class", "It had no effect at all"] },
        { q: "What were 'U-boats' and why were they a massive threat to Britain?", a: "German submarines that sank merchant ships, attempting to starve Britain", options: ["German submarines that sank merchant ships, attempting to starve Britain", "German airships that bombed cities", "Underwater mines", "Special forces units"] },
        { q: "How did the British public react to the first Zeppelin bombings?", a: "With terror, anger, and anti-German riots", options: ["With terror, anger, and anti-German riots", "They ignored them", "They thought they were friendly planes", "They immediately demanded a surrender"] }
    ],
    "Lesson 5": [
        { q: "Where was the Paris Peace Conference held?", a: "The Palace of Versailles", options: ["The Palace of Versailles", "The Eiffel Tower", "The Louvre", "The Reichstag"] },
        { q: "What was Georges Clemenceau's primary aim at the conference?", a: "To crush Germany so it could never invade France again", options: ["To crush Germany so it could never invade France again", "To form an alliance with Germany", "To forgive and forget", "To take over the British Empire"] },
        { q: "What was David Lloyd George's primary aim?", a: "To punish Germany but leave it strong enough to trade with Britain", options: ["To punish Germany but leave it strong enough to trade with Britain", "To completely destroy Germany", "To give Germany its empire back", "To execute the Kaiser"] },
        { q: "What was Woodrow Wilson's primary aim?", a: "To create a lasting peace based on his 'Fourteen Points'", options: ["To create a lasting peace based on his 'Fourteen Points'", "To take revenge on Germany", "To gain European territory for the USA", "To destroy the British navy"] },
        { q: "What territory was returned to France by the treaty?", a: "Alsace-Lorraine", options: ["Alsace-Lorraine", "The Rhineland", "The Saar", "Normandy"] },
        { q: "What military restrictions were placed on Germany?", a: "An army of 100,000, no air force, and only 6 battleships", options: ["An army of 100,000, no air force, and only 6 battleships", "A total ban on all military", "They could only have submarines", "They were limited to 1 million men"] },
        { q: "What was the 'War Guilt Clause' (Article 231)?", a: "It forced Germany to accept 100% of the blame for starting the war", options: ["It forced Germany to accept 100% of the blame for starting the war", "It blamed Austria-Hungary for the war", "It forgave everyone", "It blamed the assassination on Russia"] },
        { q: "Why did the German representatives sign the treaty?", a: "They had no choice; if they refused, the Allies would invade Germany", options: ["They had no choice; if they refused, the Allies would invade Germany", "They thought it was a fair deal", "They were bribed", "They were tricked into signing it"] }
    ]
};

function injectQuestions(code, questionsMap, dataPath) {
    let jsonStr = code.replace(/import .*?;\\n/g, '');
    jsonStr = jsonStr.replace(/export const unitData = |export default /g, '').trim();
    if (jsonStr.endsWith(';')) jsonStr = jsonStr.slice(0, -1);
    
    let unitData = eval('(' + jsonStr + ')');

    unitData.lessons.forEach(l => {
        let key = l.title;
        if (!key) return;
        
        let targetKey = Object.keys(questionsMap).find(k => key.includes(k) || k.includes(key));
        
        if (targetKey && questionsMap[targetKey]) {
            if (!l.quiz) l.quiz = [];
            questionsMap[targetKey].forEach(q => l.quiz.push(q));
            console.log(`Updated ${l.title}: now has ${l.quiz.length} questions (total ${l.quiz.length + (l.do_now && l.do_now.items ? l.do_now.items.length : 0)})`);
        }
    });

    let newCode = `export const unitData = ${JSON.stringify(unitData, null, 4)};`;
    fs.writeFileSync(dataPath, newCode);
    console.log(`Successfully updated ${dataPath}`);
}

injectQuestions(gwCode, gwQuestions, gwPath);
injectQuestions(gw2Code, gw2Questions, gw2Path);
