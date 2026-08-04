const fs = require('fs');
const path = require('path');

const gwPath = path.join(__dirname, 'great_war', 'data.js');
let gwCode = fs.readFileSync(gwPath, 'utf8');

const gwQuestions = {
    "How did the Franco-Prussian War create a lasting legacy of hatred?": [
        { q: "Who was the Chancellor of Prussia that orchestrated the Franco-Prussian War?", a: "Otto von Bismarck", options: ["Otto von Bismarck", "Kaiser Wilhelm II", "Count von Schlieffen", "Napoleon III"] },
        { q: "Which telegram did Bismarck edit to provoke France into war?", a: "Ems Telegram", options: ["Ems Telegram", "Zimmermann Telegram", "Blank Cheque", "Versailles Dispatch"] },
        { q: "In what year did the Franco-Prussian War break out?", a: "1870", options: ["1870", "1871", "1890", "1914"] },
        { q: "Which two provinces were taken from France in the peace settlement?", a: "Alsace and Lorraine", options: ["Alsace and Lorraine", "Ruhr and Saar", "Normandy and Brittany", "Rhineland and Bavaria"] },
        { q: "Where was the German Empire proclaimed in 1871, humiliating the French?", a: "Palace of Versailles", options: ["Palace of Versailles", "Reichstag Building", "Notre Dame", "Berlin Palace"] },
        { q: "What was the size of the war indemnity France was forced to pay?", a: "5 billion francs", options: ["5 billion francs", "1 billion marks", "6.6 billion pounds", "132 billion gold marks"] },
        { q: "Who became the new German Emperor in 1888 and dismissed Bismarck?", a: "Kaiser Wilhelm II", options: ["Kaiser Wilhelm II", "Kaiser Wilhelm I", "Franz Joseph", "Tsar Nicholas II"] },
        { q: "What secret treaty did Bismarck sign with Russia that Wilhelm II allowed to expire?", a: "Reinsurance Treaty", options: ["Reinsurance Treaty", "Treaty of London", "Dual Alliance", "Treaty of Frankfurt"] },
        { q: "Which country allied with Russia in 1894 after Bismarck's dismissal?", a: "France", options: ["France", "Britain", "Austria-Hungary", "Italy"] },
        { q: "What was Germany's greatest fear that drove its military planning?", a: "A two-front war", options: ["A two-front war", "A naval blockade", "An Italian invasion", "A socialist revolution"] },
        { q: "What was the name of the German military plan created to defeat France quickly?", a: "Schlieffen Plan", options: ["Schlieffen Plan", "Plan XVII", "Bismarck Plan", "Moltke Offensive"] },
        { q: "Which French leader was captured at the Battle of Sedan?", a: "Napoleon III", options: ["Napoleon III", "Georges Clemenceau", "Louis XVI", "Charles de Gaulle"] }
    ],
    "To what extent did the 'Scramble for Africa' increase tension in Europe?": [
        { q: "What term describes the rapid colonization of Africa by European powers in the late 19th century?", a: "The Scramble for Africa", options: ["The Scramble for Africa", "The Great Game", "Manifest Destiny", "The African Partition"] },
        { q: "Which German leader famously stated that Germany wanted its 'place in the sun'?", a: "Kaiser Wilhelm II", options: ["Kaiser Wilhelm II", "Otto von Bismarck", "Adolf Hitler", "Paul von Hindenburg"] },
        { q: "In which year did the First Moroccan Crisis occur?", a: "1905", options: ["1905", "1911", "1898", "1914"] }
    ],
    "Why did a battleship building contest destroy Anglo-German relations?": [
        { q: "What revolutionary British battleship was launched in 1906?", a: "HMS Dreadnought", options: ["HMS Dreadnought", "HMS Victory", "HMS Belfast", "HMS Invincible"] },
        { q: "Which German Admiral was in charge of expanding the German Navy?", a: "Admiral von Tirpitz", options: ["Admiral von Tirpitz", "Admiral Scheer", "Admiral Hipper", "Kaiser Wilhelm II"] },
        { q: "What policy dictated that the British Royal Navy must be as large as the next two largest navies combined?", a: "Two-Power Standard", options: ["Two-Power Standard", "Splendid Isolation", "Naval Supremacy Act", "Dreadnought Rule"] }
    ],
    "Did the Alliance System protect Europe or guarantee a global war?": [
        { q: "Which three countries formed the Triple Entente in 1907?", a: "Britain, France, Russia", options: ["Britain, France, Russia", "Germany, Austria-Hungary, Italy", "Britain, France, Italy", "Germany, Russia, Austria-Hungary"] },
        { q: "Which country left the Triple Alliance and joined the Entente in 1915?", a: "Italy", options: ["Italy", "Ottoman Empire", "Bulgaria", "Romania"] },
        { q: "What was Britain's traditional foreign policy before forming alliances?", a: "Splendid Isolation", options: ["Splendid Isolation", "Weltpolitik", "Appeasement", "Continental Commitment"] }
    ],
    "Why did a single assassination in Sarajevo ignite a World War?": [
        { q: "Who assassinated Archduke Franz Ferdinand?", a: "Gavrilo Princip", options: ["Gavrilo Princip", "Nedeljko Cabrinovic", "Dragutin Dimitrijevic", "Leon Trotsky"] },
        { q: "What was the name of the Serbian nationalist group responsible for the assassination?", a: "The Black Hand", options: ["The Black Hand", "The White Rose", "The Red Guards", "Young Bosnia"] },
        { q: "On what exact date was the Archduke assassinated?", a: "28 June 1914", options: ["28 June 1914", "28 July 1914", "11 November 1918", "4 August 1914"] }
    ]
};

// --- 2. GREAT WAR PART 2 ---
const gw2Path = path.join(__dirname, 'great_war_part2', 'data.js');
let gw2Code = fs.readFileSync(gw2Path, 'utf8');

const gw2Questions = {
    "Lesson 1: Why were young men so desperat...": [
        { q: "What was the nickname given to the British army of volunteers in 1914?", a: "Pals Battalions", options: ["Pals Battalions", "Conscript Army", "Kitchener's Army", "The Old Contemptibles"] },
        { q: "Who was the British Secretary of State for War who appeared on the famous recruitment poster?", a: "Lord Kitchener", options: ["Lord Kitchener", "Winston Churchill", "Douglas Haig", "David Lloyd George"] },
        { q: "What motivated many young men to sign up early in the war?", a: "Fear of missing out and patriotism", options: ["Fear of missing out and patriotism", "High pay and pensions", "They were forced by conscription", "A desire to see the trenches"] },
        { q: "When did Britain finally introduce conscription because volunteer numbers fell?", a: "1916", options: ["1916", "1914", "1915", "1918"] },
        { q: "What term describes the social pressure applied to men not in uniform, often involving handing them a white feather?", a: "White Feather Campaign", options: ["White Feather Campaign", "Coward's Mark", "Conscientious Objection", "Shaming Movement"] },
        { q: "How many men volunteered in the first weekend of the war?", a: "Thousands", options: ["Thousands", "Millions", "Hundreds", "Dozens"] }
    ],
    "Lesson 2: Did British generals make the ...": [
        { q: "Who was the British Commander-in-Chief during the Battle of the Somme?", a: "General Douglas Haig", options: ["General Douglas Haig", "Lord Kitchener", "General John French", "Winston Churchill"] },
        { q: "On what date did the Battle of the Somme begin?", a: "1 July 1916", options: ["1 July 1916", "11 November 1918", "4 August 1914", "21 March 1918"] },
        { q: "How many British casualties occurred on the first day of the Somme?", a: "57,000", options: ["57,000", "20,000", "1 million", "100,000"] },
        { q: "What preliminary tactic completely failed to destroy the German barbed wire and trenches at the Somme?", a: "A seven-day artillery bombardment", options: ["A seven-day artillery bombardment", "A gas attack", "A tank assault", "A cavalry charge"] },
        { q: "What new weapon was used for the first time during the Battle of the Somme in September 1916?", a: "The Tank", options: ["The Tank", "Poison Gas", "Flamethrowers", "Airplanes"] },
        { q: "Why did Haig launch the Somme offensive?", a: "To relieve pressure on the French at Verdun", options: ["To relieve pressure on the French at Verdun", "To capture Berlin", "To test new weapons", "Because the Kaiser challenged him"] },
        { q: "What controversial nickname was later given to Haig by some historians?", a: "The Butcher of the Somme", options: ["The Butcher of the Somme", "The Architect of Victory", "The Iron General", "The Mad Commander"] },
        { q: "What formation were the British soldiers ordered to walk in across No Man's Land?", a: "A slow, straight line", options: ["A slow, straight line", "A rapid sprint", "A zig-zag pattern", "Leapfrogging sections"] },
        { q: "What happened to the German soldiers during the artillery bombardment?", a: "They sheltered in deep concrete dugouts", options: ["They sheltered in deep concrete dugouts", "They were completely wiped out", "They retreated to the second line", "They surrendered"] },
        { q: "By the end of the battle in November 1916, roughly how far had the British advanced?", a: "7 miles", options: ["7 miles", "50 miles", "0 miles", "They reached the German border"] },
        { q: "What percentage of the artillery shells fired were 'duds' (failed to explode)?", a: "About 30%", options: ["About 30%", "Almost 100%", "None", "5%"] },
        { q: "Who were the 'Pals Battalions' that suffered heavily at the Somme?", a: "Friends from the same towns who joined together", options: ["Friends from the same towns who joined together", "Professional soldiers from India", "Veterans of the Boer War", "Conscripted criminals"] }
    ],
    "Lesson 3: Was the Great War truly a glob...": [
        { q: "Which empire contributed over 1 million soldiers to the British war effort?", a: "The Indian Empire", options: ["The Indian Empire", "The Canadian Empire", "The Australian Empire", "The African Empire"] },
        { q: "What does ANZAC stand for?", a: "Australian and New Zealand Army Corps", options: ["Australian and New Zealand Army Corps", "Allied Naval Zone And Command", "American and New Zealand Army Corps", "African National Zulu Army Corps"] },
        { q: "In which disastrous 1915 campaign did the ANZACs suffer heavy casualties?", a: "Gallipoli", options: ["Gallipoli", "The Somme", "Passchendaele", "Verdun"] },
        { q: "Who was the First Lord of the Admiralty that championed the Gallipoli campaign?", a: "Winston Churchill", options: ["Winston Churchill", "Douglas Haig", "Lord Kitchener", "David Lloyd George"] },
        { q: "Which country joined the Allied powers in 1917, shifting the balance of the war?", a: "The United States", options: ["The United States", "Italy", "Japan", "Russia"] },
        { q: "Which side did the Ottoman Empire fight on?", a: "Central Powers", options: ["Central Powers", "Allied Powers", "They were neutral", "With Russia"] },
        { q: "Why did the British want to capture Gallipoli?", a: "To open a sea route to supply Russia", options: ["To open a sea route to supply Russia", "To capture oil reserves", "To force Germany to surrender", "To protect the Suez Canal"] },
        { q: "What role did the Chinese Labour Corps play?", a: "They dug trenches and unloaded supplies", options: ["They dug trenches and unloaded supplies", "They fought as frontline infantry", "They commanded artillery", "They were medical staff"] },
        { q: "Which African campaign lasted for the entire duration of the war?", a: "The East African Campaign", options: ["The East African Campaign", "The North African Campaign", "The Boer War", "The Zulu War"] },
        { q: "What event caused Russia to withdraw from the war in 1917?", a: "The Russian Revolution", options: ["The Russian Revolution", "A German invasion of Moscow", "A peace treaty with Britain", "A lack of soldiers"] },
        { q: "Why did the USA enter the war?", a: "Unrestricted submarine warfare and the Zimmermann Telegram", options: ["Unrestricted submarine warfare and the Zimmermann Telegram", "The bombing of Pearl Harbor", "A desire to claim European colonies", "The assassination of Franz Ferdinand"] },
        { q: "What is 'Unrestricted Submarine Warfare'?", a: "Sinking any ship without warning", options: ["Sinking any ship without warning", "Attacking submarines with depth charges", "Mining neutral harbors", "Only attacking military vessels"] }
    ],
    "Lesson 4: How did a war fought miles awa...": [
        { q: "What law gave the British government sweeping powers over civilian life in 1914?", a: "Defence of the Realm Act (DORA)", options: ["Defence of the Realm Act (DORA)", "Conscription Act", "Emergency Powers Act", "Civilian War Act"] },
        { q: "What was a major role women took on during the war?", a: "Working in munitions factories", options: ["Working in munitions factories", "Fighting on the front line", "Commanding naval ships", "Serving as politicians"] },
        { q: "What nickname was given to women who worked with TNT because it turned their skin yellow?", a: "Canaries", options: ["Canaries", "Tommies", "Munitionettes", "Yellow Girls"] },
        { q: "When did the British government introduce rationing to prevent starvation?", a: "1918", options: ["1918", "1914", "1916", "1920"] },
        { q: "What German weapon was used to bomb British cities like London for the first time?", a: "Zeppelins", options: ["Zeppelins", "V2 Rockets", "U-Boats", "Tanks"] },
        { q: "How did DORA attempt to stop workers from taking time off with hangovers?", a: "Pub opening hours were restricted and beer watered down", options: ["Pub opening hours were restricted and beer watered down", "Alcohol was completely banned", "Workers were given free rum", "Pubs were closed entirely"] },
        { q: "What was the 'Women's Land Army'?", a: "Women working on farms to produce food", options: ["Women working on farms to produce food", "Women defending the coastline", "Women joining the infantry", "Women working in factories"] },
        { q: "What did the government use to control public opinion and encourage recruitment?", a: "Propaganda and censorship", options: ["Propaganda and censorship", "Free elections", "Financial bribes", "Threats of execution"] },
        { q: "What happened to conscientious objectors who refused to fight?", a: "They were often imprisoned and treated harshly", options: ["They were often imprisoned and treated harshly", "They were allowed to stay home freely", "They were deported to Germany", "They were given medals for bravery"] },
        { q: "What did the Representation of the People Act 1918 achieve?", a: "It gave the vote to some women over 30 and all men over 21", options: ["It gave the vote to some women over 30 and all men over 21", "It gave all women the vote", "It banned women from voting", "It lowered the voting age to 18"] },
        { q: "How did the war affect trade unions?", a: "Their membership and power grew significantly", options: ["Their membership and power grew significantly", "They were completely banned", "They lost all their members", "They went on strike for the whole war"] },
        { q: "What was one of the most hated aspects of DORA?", a: "Censorship of letters from soldiers", options: ["Censorship of letters from soldiers", "Forced conscription", "The banning of football", "The creation of the NHS"] }
    ],
    "Lesson 5: Did the Treaty of Versailles s...": [
        { q: "Who were the 'Big Three' leaders at the Paris Peace Conference?", a: "Clemenceau, Lloyd George, Wilson", options: ["Clemenceau, Lloyd George, Wilson", "Churchill, Roosevelt, Stalin", "Bismarck, Wilhelm, Nicholas", "Haig, Foch, Pershing"] },
        { q: "Which leader wanted the harshest punishment for Germany?", a: "Georges Clemenceau (France)", options: ["Georges Clemenceau (France)", "Woodrow Wilson (USA)", "David Lloyd George (Britain)", "Vittorio Orlando (Italy)"] },
        { q: "What was Woodrow Wilson's idealistic plan for peace called?", a: "The Fourteen Points", options: ["The Fourteen Points", "The Treaty of Versailles", "The League of Nations Charter", "The New Deal"] },
        { q: "What was Article 231 of the Treaty of Versailles?", a: "The War Guilt Clause, blaming Germany for starting the war", options: ["The War Guilt Clause, blaming Germany for starting the war", "The clause setting reparations at £6.6 billion", "The clause demilitarising the Rhineland", "The clause creating the League of Nations"] },
        { q: "How much was Germany forced to pay in reparations (agreed in 1921)?", a: "£6.6 billion", options: ["£6.6 billion", "100 million francs", "1 billion dollars", "They paid nothing"] },
        { q: "What was the limit placed on the size of the German army?", a: "100,000 men", options: ["100,000 men", "1 million men", "0 men (disbanded entirely)", "500,000 men"] },
        { q: "What international peacekeeping organisation was created by the Treaty?", a: "The League of Nations", options: ["The League of Nations", "The United Nations", "NATO", "The European Union"] },
        { q: "Which country refused to join the League of Nations, weakening it from the start?", a: "The United States", options: ["The United States", "Britain", "France", "Germany"] },
        { q: "What happened to Germany's overseas colonies?", a: "They were given to Britain and France as 'mandates'", options: ["They were given to Britain and France as 'mandates'", "They were made independent", "They were given to the USA", "Germany kept them"] },
        { q: "What area of Germany was demilitarised (no German soldiers allowed)?", a: "The Rhineland", options: ["The Rhineland", "Bavaria", "Prussia", "Alsace-Lorraine"] },
        { q: "How did the German public react to the Treaty of Versailles?", a: "They called it a 'Diktat' (dictated peace) and felt betrayed", options: ["They called it a 'Diktat' (dictated peace) and felt betrayed", "They accepted it was fair", "They rejoiced that the war was over", "They ignored it"] },
        { q: "What does 'Diktat' mean?", a: "A dictated peace forced upon the defeated", options: ["A dictated peace forced upon the defeated", "A fair negotiation", "A military surrender", "A massive financial fine"] }
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
            console.log(`Updated ${l.title}: now has ${l.quiz.length} questions`);
        }
    });

    let newCode = `export const unitData = ${JSON.stringify(unitData, null, 4)};`;
    fs.writeFileSync(dataPath, newCode);
    console.log(`Successfully updated ${dataPath}`);
}

injectQuestions(gwCode, gwQuestions, gwPath);
injectQuestions(gw2Code, gw2Questions, gw2Path);
