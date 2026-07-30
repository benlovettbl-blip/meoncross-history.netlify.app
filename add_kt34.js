const fs = require('fs');

const dataPath = 'weimar_nazi_germany/data.js';
let content = fs.readFileSync(dataPath, 'utf8');

// Parse the existing data to safely manipulate it
let dataObj;
try {
  dataObj = eval('(function(){ ' + content.replace(/export const (unitData) =/, 'return') + '; })()');
} catch (e) {
  console.error("Failed to parse data.js", e);
  process.exit(1);
}

const lesson34 = {
    "id": "lesson_3_4",
    "title": "Key Topic 3.4: Opposition, Resistance and Conformity, 1933–1939",
    "enquiry": "Why was there so little active opposition to the Nazi regime, and how did underground networks, workers, and young people attempt to resist?",
    "teacher_notes": {
        "primer": "This lesson addresses the complex reality of conformity and resistance in the Third Reich. It introduces high-level historical elements like the Sopade reports, industrial sabotage, and elite opposition from figures like Georg Elser and General Ludwig Beck, as well as youth resistance.",
        "objectives": [
            {
                "objective": "Demonstrate precise knowledge of the different youth opposition groups, distinguishing between the working-class Edelweiss Pirates and the middle-class Swing Youth.",
                "primer": "Emphasise the class divide between the two groups, which influenced how they rebelled (violent vs. cultural).",
                "question": "How did the social background of the Swing Youth dictate their method of resistance compared to the Edelweiss Pirates?"
            },
            {
                "objective": "Analyse the methods used by underground political networks, industrial workers, and lone-wolf attackers to resist the Nazi state.",
                "primer": "Highlight the Sopade reports and the specific tactics of 'slow-working' and sabotage by industrial workers.",
                "question": "Why did industrial workers have to resort to subtle sabotage rather than going on massive organized strikes?"
            },
            {
                "objective": "Evaluate the reasons why the vast majority of the German population conformed to Nazi rule rather than actively opposing it.",
                "primer": "Balance the genuine support for Hitler's 'economic miracle' with the sheer terror of the police state.",
                "question": "To what extent did Germans conform out of genuine support versus sheer terror?"
            }
        ]
    },
    "learning_objectives": [
        {
            "objective": "Demonstrate precise knowledge of the different youth opposition groups, distinguishing between the working-class Edelweiss Pirates and the middle-class Swing Youth.",
            "primer": "Emphasise the class divide between the two groups, which influenced how they rebelled (violent vs. cultural).",
            "question": "How did the social background of the Swing Youth dictate their method of resistance compared to the Edelweiss Pirates?"
        },
        {
            "objective": "Analyse the methods used by underground political networks, industrial workers, and lone-wolf attackers to resist the Nazi state.",
            "primer": "Highlight the Sopade reports and the specific tactics of 'slow-working' and sabotage by industrial workers.",
            "question": "Why did industrial workers have to resort to subtle sabotage rather than going on massive organized strikes?"
        },
        {
            "objective": "Evaluate the reasons why the vast majority of the German population conformed to Nazi rule rather than actively opposing it.",
            "primer": "Balance the genuine support for Hitler's 'economic miracle' with the sheer terror of the police state.",
            "question": "To what extent did Germans conform out of genuine support versus sheer terror?"
        }
    ],
    "do_now": {
        "type": "retrieval",
        "items": [
            {
                "question": "What was the name of the Nazi publishing house that bought up 82% of all German newspapers by 1939?",
                "answer": "The Eher Verlag."
            },
            {
                "question": "What is meant by the Nazi term Entartete Kunst?",
                "answer": "Degenerate Art—modern, abstract art that the Nazis banned for being 'un-German'."
            },
            {
                "question": "How many gold medals did Germany win at the 1936 Berlin Olympics?",
                "answer": "33 gold medals."
            },
            {
                "question": "15 Second Challenge: Try to speak for 15 seconds non-stop about how Joseph Goebbels used radio to brainwash the German public.",
                "answer": "He subsidised the mass production of the Volksempfänger so 70% of homes owned one; they had short ranges to block foreign broadcasts; loudspeakers were put in streets and factory sirens stopped work for Hitler's speeches."
            }
        ]
    },
    "vocab": [
        { "term": "Conformity", "definition": "Doing what you are told and blending in with the crowd to avoid drawing attention to yourself." },
        { "term": "Passive Resistance", "definition": "Low-level, non-violent opposition, such as refusing to do the 'Heil Hitler' salute or telling anti-Nazi jokes." },
        { "term": "Active Resistance", "definition": "Direct attempts to overthrow or damage the government, such as assassination plots or publishing illegal leaflets." },
        { "term": "Sopade Reports", "definition": "Secret reports smuggled out of Germany by the banned Social Democratic Party (SPD) to track the true mood of the German public." },
        { "term": "Sabotage", "definition": "Deliberately destroying, damaging, or obstructing something, often used by workers in Nazi factories." },
        { "term": "Edelweiss Pirates", "definition": "A working-class youth opposition group that rebelled against the strict, militaristic rules of the Hitler Youth." },
        { "term": "Swing Youth", "definition": "A middle-class youth opposition group that rebelled by embracing banned American culture, jazz music, and fashion." }
    ],
    "narrative_blocks": [
        {
            "text": "**1. The Illusion of Total Support: Why did most people conform?**\nLooking back, it is easy to ask why millions of Germans didn't rise up against Hitler. The reality is that active opposition was incredibly dangerous. Most Germans conformed for two main reasons:\n\n* **Genuine Support:** By 1939, Hitler was genuinely popular with many Germans. He had smashed the hated Treaty of Versailles, rebuilt the army, and seemingly created an 'economic miracle' by drastically reducing unemployment. Many were willing to turn a blind eye to the brutality of the police state because they felt the Nazis were restoring national pride.\n* **Fear and the Scale of Repression:** The Gestapo and the block wardens terrified people into submission. Between 1933 and 1939, approximately **1.3 million Germans** were sent to concentration camps for political offenses, and another 300,000 fled the country entirely."
        },
        {
            "text": "**2. Underground Political and Worker Resistance**\nWhen Hitler banned all rival political parties in 1933, opposition was forced underground.\n\n* **The SPD and the 'Sopade':** The Social Democratic Party leadership fled into exile. From abroad, they relied on a secret network of informants inside Germany to write the **Sopade reports**. These intelligence reports detailed the true mood of the working classes, proving that not everyone was completely brainwashed by Goebbels' propaganda.\n* **The Communists (KPD) and Workers:** The KPD continued to secretly print anti-Nazi leaflets. Furthermore, because Trade Unions were banned, industrial workers resisted in more subtle ways. They engaged in **passive resistance** and **sabotage**: deliberately working slowly ('slow-working'), calling in sick (absenteeism), or secretly damaging factory machinery to disrupt the Nazi economy. In 1936, there were even lightning strikes over high food prices."
        },
        {
            "text": "**Advanced Analysis: Lone-Wolf, Army, and Religious Resistance**\nNot all resistance came from underground groups; some of the most dangerous opposition came from individuals and elites:\n\n* **The Lone Wolf:** In November 1939, a communist-sympathising carpenter named [Key Individual: Georg Elser] planted a sophisticated time bomb inside a Munich Beer Hall where Hitler was speaking. It detonated flawlessly, killing eight people, but Hitler had unexpectedly left the building just 13 minutes earlier. Elser was caught and executed in Dachau.\n* **Elite Army Discontent:** Not all generals supported Hitler. In 1938, [Key Individual: General Ludwig Beck], the Chief of Staff of the German Army, actively plotted to overthrow Hitler and resigned his post in protest against Hitler's aggressive foreign policy, which he feared would cause another world war.\n* **Religious Martyrs:** Linking back to the church opposition, [Key Individual: Pastor Paul Schneider] actively smuggled anti-Nazi letters out of his prison cell and refused to salute the swastika. Known as the \"Preacher of Buchenwald,\" he was tortured and murdered by the SS in 1939."
        },
        {
            "text": "**3. Youth Opposition: The Edelweiss Pirates**\nThe Hitler Youth became compulsory in 1936. While many enjoyed it initially, as it became increasingly strict, militaristic, and focused on endless drilling, a counter-culture emerged.\nThe **Edelweiss Pirates** emerged in the late 1930s (made up of local groups like the *Navajos* in Cologne, or the *Roving Dudes* in Essen). They were primarily **working-class** teenagers. They rebelled by:\n\n* Wearing their hair long and dressing in American-style checked shirts and white socks.\n* Going on weekend hikes in the countryside to escape the suffocating control of the Nazi block wardens.\n* Singing banned songs (often changing the lyrics of Hitler Youth songs to mock the regime).\n* Taunting, ambushing, and physically beating up Hitler Youth patrols."
        },
        {
            "text": "**4. Youth Opposition: The Swing Youth**\nWhile the Pirates were working-class, the **Swing Youth** were largely **middle and upper-class** teenagers in big cities like Berlin and Hamburg. They had the wealth to own record players and rebelled culturally rather than violently.\n\n* They illegally listened to banned American Jazz and Swing music (such as Glenn Miller), which the Nazis despised as \"black\" and \"Jewish\" music.\n* They dressed in sharp 'English' styles—boys carried umbrellas and wore tailored suits, while girls wore makeup (which the Nazis banned, as they wanted women to have a natural, 'peasant' look).\n* They organised illegal underground dances, attended by thousands, where they jitterbugged and smoked."
        },
        {
            "text": "**5. The Nazi Reaction to Youth Opposition**\nBefore the outbreak of war in 1939, the Nazi response to these youth groups was relatively lenient. The Gestapo would occasionally break up Swing Youth dances, confiscate record players, or arrest Edelweiss Pirates, shave their heads, and give them a severe beating before releasing them. The Nazis did not want to send thousands of young, healthy Aryans to concentration camps. *(Note: This would change drastically during WWII, when youth opposition became more political and the Nazi punishments became lethal).*"
        }
    ],
    "quiz": [
        { "q": "What is the term for low-level, non-violent opposition, such as telling an anti-Nazi joke or working slowly?", "a": "Passive Resistance" },
        { "q": "Roughly how many Germans were sent to concentration camps for political offenses between 1933 and 1939?", "a": "1.3 million" },
        { "q": "What was the name of the secret intelligence reports smuggled out of Germany by the exiled SPD?", "a": "The Sopade reports" },
        { "q": "Since trade unions were banned, give two subtle ways industrial workers resisted the Nazis in factories.", "a": "Sabotaging machinery / absenteeism / working deliberately slowly" },
        { "q": "Who was the German carpenter who planted a time bomb in a Munich beer hall in November 1939?", "a": "Georg Elser" },
        { "q": "Why did Georg Elser's assassination attempt fail?", "a": "Hitler finished his speech early and left the building 13 minutes before the bomb went off" },
        { "q": "Which top German Army General resigned in 1938 in protest of Hitler's aggressive foreign policy?", "a": "General Ludwig Beck" },
        { "q": "Who was the religious martyr murdered in 1939, known as the 'Preacher of Buchenwald'?", "a": "Pastor Paul Schneider" },
        { "q": "In what year did membership of the Hitler Youth become legally compulsory?", "a": "1936" },
        { "q": "Why did some teenagers begin to hate the Hitler Youth by the late 1930s?", "a": "It became too strict, militaristic, and focused on boring military drills" },
        { "q": "What was the name of the working-class youth opposition group that emerged in cities like Cologne and Essen?", "a": "The Edelweiss Pirates" },
        { "q": "Name one of the specific local gangs that made up the Edelweiss Pirates.", "a": "The Navajos / The Roving Dudes / The Kittelbach Pirates" },
        { "q": "What symbol did the Edelweiss Pirates wear on their lapels to identify each other?", "a": "The white edelweiss flower" },
        { "q": "Give two ways the Edelweiss Pirates rebelled against the Nazis.", "a": "They went on hikes / wore checked shirts / beat up Hitler Youth members" },
        { "q": "What was the name of the middle-class youth opposition group found in cities like Berlin and Hamburg?", "a": "The Swing Youth" },
        { "q": "How did the social class of the Swing Youth differ from the Edelweiss Pirates?", "a": "The Swing Youth were middle/upper class; the Pirates were working class" },
        { "q": "What banned genre of music did the Swing Youth illegally listen to?", "a": "American Jazz and Swing" },
        { "q": "Why did the Nazis hate Jazz music?", "a": "Because of its African-American origins, they viewed it as racially inferior / 'black music'" },
        { "q": "How did the girls in the Swing Youth rebel against the Nazi ideal of German womanhood?", "a": "They wore makeup and fashionable clothes, rather than the natural 'peasant' look" },
        { "q": "Before 1939, how did the Gestapo usually punish Edelweiss Pirates who were caught?", "a": "They arrested them, shaved their heads, and beat them, but rarely killed them" }
    ],
    "gcse_task": {
        "topic": "Explain one consequence of opposition to the Nazi regime before 1939. (4 marks)",
        "tasks": []
    }
};

// Insert lesson_3_4 if it doesn't exist, or replace if it does
const lessonIndex = dataObj.lessons.findIndex(l => l.id === 'lesson_3_4');
if (lessonIndex !== -1) {
    dataObj.lessons[lessonIndex] = lesson34;
} else {
    dataObj.lessons.push(lesson34);
}

// Add key individuals
if (!dataObj.key_individuals) dataObj.key_individuals = [];
const addKI = (name, role, significance) => {
    if (!dataObj.key_individuals.some(k => k.name === name)) {
        dataObj.key_individuals.push({ name, role, significance, image: "" });
    }
};

addKI("Georg Elser", "Communist-Sympathising Carpenter", "A lone-wolf assassin who planted a sophisticated time bomb in a Munich beer hall in 1939, missing Hitler by just 13 minutes.");
addKI("General Ludwig Beck", "Chief of Staff of the German Army", "Resigned in 1938 in protest of Hitler's aggressive foreign policy and actively plotted to overthrow him.");
addKI("Pastor Paul Schneider", "The Preacher of Buchenwald", "A Protestant pastor who refused to compromise with the Nazis. He smuggled out anti-Nazi letters from prison and was tortured and murdered in 1939.");

const newContent = "export const unitData = " + JSON.stringify(dataObj, null, 4) + ";\n";
fs.writeFileSync(dataPath, newContent, 'utf8');
console.log("Successfully updated KT 3.4 and added key individuals!");
