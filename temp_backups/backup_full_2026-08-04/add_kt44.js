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

const lesson44 = {
    "id": "lesson_4_4",
    "title": "Key Topic 4.4: The Persecution of Minorities, 1933–1939",
    "enquiry": "How and why did the Nazis persecute minorities, and how did the persecution of Jewish people escalate between 1933 and 1939?",
    "teacher_notes": {
        "primer": "This lesson addresses the grim reality of Nazi racial policies, moving from the philosophical basis of Social Darwinism to the concrete brutality against the disabled, Roma, and Jewish people. It carefully tracks the escalation of anti-Semitism from early boycotts to the Nuremberg Laws, bureaucratic dehumanisation, and the violence of Kristallnacht.",
        "objectives": [
            {
                "objective": "Demonstrate precise knowledge of Nazi racial ideology, distinguishing between 'Untermenschen' and 'Asocials'.",
                "primer": "Ensure students grasp the difference between biological targets (Jews/Roma) and social targets (homosexuals/vagrants).",
                "question": "What twisted biological theory underpinned Hitler's belief in a 'Master Race'?"
            },
            {
                "objective": "Analyse the escalating stages of anti-Semitic persecution: from early boycotts (1933) to legislation (1935), bureaucratic dehumanisation (1938), and state-sponsored violence.",
                "primer": "Track the timeline carefully: Boycott (33) -> Nuremberg Laws (35) -> Passports/Names (38) -> Kristallnacht (38).",
                "question": "What specifically did the 'Reich Citizenship Law' of 1935 do to the Jewish population?"
            },
            {
                "objective": "Evaluate the brutal methods used against the disabled, Roma/Sinti, and homosexuals, including the Marzahn camp, sterilisation, and the T4 programme.",
                "primer": "Be sensitive but clear about the horrors of the T4 programme and the 400,000 sterilisations.",
                "question": "What was the purpose of the secret T4 programme introduced in 1939?"
            }
        ]
    },
    "learning_objectives": [
        {
            "objective": "Demonstrate precise knowledge of Nazi racial ideology, distinguishing between 'Untermenschen' and 'Asocials'.",
            "primer": "Ensure students grasp the difference between biological targets (Jews/Roma) and social targets (homosexuals/vagrants).",
            "question": "What twisted biological theory underpinned Hitler's belief in a 'Master Race'?"
        },
        {
            "objective": "Analyse the escalating stages of anti-Semitic persecution: from early boycotts (1933) to legislation (1935), bureaucratic dehumanisation (1938), and state-sponsored violence.",
            "primer": "Track the timeline carefully: Boycott (33) -> Nuremberg Laws (35) -> Passports/Names (38) -> Kristallnacht (38).",
            "question": "What specifically did the 'Reich Citizenship Law' of 1935 do to the Jewish population?"
        },
        {
            "objective": "Evaluate the brutal methods used against the disabled, Roma/Sinti, and homosexuals, including the Marzahn camp, sterilisation, and the T4 programme.",
            "primer": "Be sensitive but clear about the horrors of the T4 programme and the 400,000 sterilisations.",
            "question": "What was the purpose of the secret T4 programme introduced in 1939?"
        }
    ],
    "do_now": {
        "type": "retrieval",
        "items": [
            {
                "question": "What was the name of the 'substitute' goods the Nazis developed to avoid relying on imports?",
                "answer": "Ersatz goods."
            },
            {
                "question": "Who took over the Nazi economy in 1936 with the 'Four Year Plan'?",
                "answer": "Hermann Goering."
            },
            {
                "question": "What percentage of the school timetable was given to PE to prepare students for war and motherhood?",
                "answer": "15%."
            },
            {
                "question": "15 Second Challenge: Try to speak for 15 seconds non-stop explaining exactly how the Nazis created 'Invisible Unemployment'.",
                "answer": "They sacked Jewish people and women, locked up political opponents in concentration camps, and conscripted over a million men into the army—and simply removed all of them from the official unemployment statistics."
            }
        ]
    },
    "vocab": [
        { "term": "Volksgemeinschaft", "definition": "The 'People's Community'—the Nazi ideal of a pure, strong, and united Aryan society." },
        { "term": "Social Darwinism", "definition": "The twisted Nazi belief that human races evolve like animals, and the 'strong' (Aryans) must destroy the 'weak' to survive." },
        { "term": "Untermenschen", "definition": "'Sub-humans'—groups the Nazis believed were biologically inferior (Jews, Roma/Sinti, Slavs)." },
        { "term": "Asocials", "definition": "People who did not fit the Nazi social ideal of the Volksgemeinschaft (e.g., homosexuals, vagrants, alcoholics)." },
        { "term": "Anti-Semitism", "definition": "Hatred or discrimination against Jewish people." },
        { "term": "Eugenics", "definition": "The pseudo-science of selective breeding to 'purify' the human race." },
        { "term": "Aryanisation", "definition": "The forced transfer of Jewish-owned businesses and property to Aryans at a fraction of their value." }
    ],
    "narrative_blocks": [
        {
            "text": "**1. The Foundation: Nazi Racial Ideology**\nHitler's worldview, laid out in *Mein Kampf*, was built on **Social Darwinism**. He believed history was a biological struggle between the 'Master Race' (Aryans) and 'Sub-humans' (*Untermenschen*). He argued the German bloodline had to be kept pure. This ideology created two distinct targets: those who were biologically 'inferior', and those who were socially 'useless' (Asocials)."
        },
        {
            "text": "**2. The Persecution of the Disabled**\nThe Nazis viewed people with physical or mental disabilities as a 'burden on the state' who cost too much money to keep alive (a concept explicitly taught in school maths lessons).\n* **Sterilisation:** In 1933, the *Law for the Prevention of Hereditarily Diseased Offspring* was passed. Over 400,000 people with conditions like deafness, blindness, or epilepsy were forcibly sterilised.\n* **The T4 Programme (1939):** A secret state euthanasia programme. Babies and children with severe disabilities were murdered by lethal injection or starvation. Over 5,000 children were killed. This soon expanded to adults using gas chambers in psychiatric hospitals."
        },
        {
            "text": "**3. The Persecution of 'Asocials' and the Roma/Sinti**\n* **Roma and Sinti ('Gypsies'):** Viewed as both *Untermenschen* and *Asocials* because they travelled and rarely held traditional jobs. *Grade 9 Detail:* Ahead of the 1936 Berlin Olympics, the Nazis wanted to 'clean up' the city. Hundreds of Roma and Sinti were arrested and forced into a miserable internment camp in **Marzahn**. In 1938, a decree ordered all Roma to be registered, preparing them for deportation to concentration camps.\n* **Homosexuals:** Homosexuality threatened Nazi ideals because it did not result in children for the Reich. In 1936, Himmler set up the *Reich Office for Combating Homosexuality and Abortion*. Around 15,000 homosexual men were sent to concentration camps, forced to wear pink triangle badges, and subjected to brutal medical experiments.\n* **Vagrants/Beggars:** In 1933, 100,000 beggars and tramps were rounded up. Those fit enough were forced to work; others were sent to concentration camps."
        },
        {
            "text": "**4. The Escalation of Anti-Semitism (1933–1939)**\nThe persecution of Jewish people did not start with mass murder; it was a process of 'cumulative radicalisation'—slowly segregating them to normalise discrimination before ramping up the brutality.\n\n**Phase 1: Early Discrimination (1933–1934)**\n* **April 1933 Boycott:** The SA stood outside Jewish shops, painting Stars of David on windows and intimidating customers. \n* **Employment:** The Civil Service Act (1933) sacked Jewish teachers, judges, and civil servants. \n* **Segregation:** Local councils began banning Jewish people from public parks, swimming pools, and cinemas.\n\n**Phase 2: The Nuremberg Laws (September 1935)**\nThese laws legally stripped Jewish people of their basic human rights:\n1. **The Reich Citizenship Law:** Declared that only those of German blood could be citizens. Jewish people became 'subjects' with no right to vote or hold a German passport.\n2. **The Law for the Protection of German Blood and Honour:** Forbade marriage or sexual relations between Jews and Aryans. \n\n**Phase 3: Bureaucratic Dehumanisation (1938)**\n*Grade 9 Detail:* Before Kristallnacht, the state systematically erased Jewish identity. \n* **Passports:** In October 1938, all Jewish passports had to be stamped with a large red letter **'J'**.\n* **Names:** A decree forced all Jewish men to add **'Israel'** to their first name, and all women to add **'Sarah'**, so they could be immediately identified on official documents."
        },
        {
            "text": "**Phase 4: State-Sponsored Violence & Forced Emigration (1938–1939)**\n* **Kristallnacht (9/10 November 1938):** A Jewish teenager assassinated a minor German diplomat in Paris. [Key Individual: Joseph Goebbels] (trying to win Hitler's favour) used this to orchestrate a nationwide pogrom. \n    * *The Damage:* Over 800 shops were destroyed, 191 synagogues burned, and 91 Jewish people murdered. 30,000 Jewish men were sent to concentration camps. \n    * *Grade 9 Analysis (Public Reaction):* Secret *Sopade* and Gestapo reports revealed that many ordinary Germans were disgusted by Kristallnacht. This was not always out of sympathy for the Jews, but because the German public hated public disorder and the wasteful destruction of property. \n* **The Aftermath:** The Nazis fined the Jewish community **1 billion marks** for the damage. \n* **The Shift in Policy (1939):** Realising public violence was unpopular, persecution became highly bureaucratic. In January 1939, [Key Individual: Reinhard Heydrich] was put in charge of the **Reich Office for Jewish Emigration** to systematically force Jewish people out of Germany by confiscating all their wealth in exchange for exit visas."
        }
    ],
    "quiz": [
        { "q": "What twisted biological theory underpinned Hitler's racial ideology?", "a": "Social Darwinism" },
        { "q": "What did the term 'Untermenschen' mean?", "a": "Sub-humans" },
        { "q": "Give two examples of groups the Nazis considered 'Asocials'.", "a": "Homosexuals, vagrants, alcoholics" },
        { "q": "What was the name of the 1933 law that allowed the government to surgically prevent disabled people from having children?", "a": "The Law for the Prevention of Hereditarily Diseased Offspring" },
        { "q": "Roughly how many people were forcibly sterilised under this law?", "a": "400,000" },
        { "q": "What was the T4 programme introduced in 1939?", "a": "A secret state euthanasia programme killing disabled babies and children" },
        { "q": "Where were hundreds of Roma and Sinti forced to live ahead of the 1936 Berlin Olympics?", "a": "The Marzahn internment camp" },
        { "q": "Why were homosexual men targeted by the Nazis?", "a": "They did not fit the traditional family ideal and did not produce children for the Reich" },
        { "q": "What colour triangle were homosexual prisoners forced to wear in concentration camps?", "a": "Pink" },
        { "q": "In what month and year did the SA lead a one-day boycott of Jewish shops and businesses?", "a": "April 1933" },
        { "q": "What 1933 law resulted in Jewish teachers, judges, and government workers losing their jobs?", "a": "The Civil Service Act" },
        { "q": "In what year were the Nuremberg Laws passed?", "a": "1935" },
        { "q": "What did the 'Reich Citizenship Law' do?", "a": "Stripped Jewish people of their German citizenship and the right to vote" },
        { "q": "What did the 'Law for the Protection of German Blood and Honour' forbid?", "a": "Marriage and sexual relations between Jews and Aryans" },
        { "q": "In October 1938, what was stamped on the passports of all Jewish people?", "a": "A large red letter 'J'" },
        { "q": "What middle names were Jewish men and women forced to adopt in 1938?", "a": "Israel for men, Sarah for women" },
        { "q": "What is the exact date of Kristallnacht?", "a": "9-10 November 1938" },
        { "q": "Who orchestrated Kristallnacht to win Hitler's favour?", "a": "Joseph Goebbels" },
        { "q": "How many Jewish men were arrested and sent to concentration camps following Kristallnacht?", "a": "30,000" },
        { "q": "According to Gestapo and Sopade reports, why were many ordinary Germans disgusted by Kristallnacht?", "a": "They hated the public disorder and the wasteful destruction of property" },
        { "q": "Who did the Nazi government blame for the destruction of Kristallnacht?", "a": "The Jewish community" },
        { "q": "What was the exact fine placed on the Jewish community to pay for the damage?", "a": "1 billion marks" },
        { "q": "What does the term 'Aryanisation' mean in the context of 1938-1939?", "a": "The forced transfer of Jewish businesses and property to Aryans" },
        { "q": "In January 1939, what organisation did Reinhard Heydrich set up?", "a": "The Reich Office for Jewish Emigration" },
        { "q": "What was the purpose of this new office?", "a": "To systematically force Jewish people to leave Germany by taking their wealth in exchange for exit visas" }
    ],
    "gcse_task": {
        "topic": "Explain one consequence of the Nuremberg Laws (1935). (4 marks)",
        "tasks": []
    }
};

// Insert lesson_4_4 if it doesn't exist, or replace if it does
const lessonIndex = dataObj.lessons.findIndex(l => l.id === 'lesson_4_4');
if (lessonIndex !== -1) {
    dataObj.lessons[lessonIndex] = lesson44;
} else {
    const l43Idx = dataObj.lessons.findIndex(l => l.id === 'lesson_4_3');
    if (l43Idx !== -1) {
        dataObj.lessons.splice(l43Idx + 1, 0, lesson44);
    } else {
        dataObj.lessons.push(lesson44);
    }
}

// Add key individuals (Reinhard Heydrich and Joseph Goebbels should already exist from earlier topics, but we'll ensure they do)
if (!dataObj.key_individuals) dataObj.key_individuals = [];
const addKI = (name, role, significance) => {
    if (!dataObj.key_individuals.some(k => k.name === name)) {
        dataObj.key_individuals.push({ name, role, significance, image: "" });
    }
};

addKI("Joseph Goebbels", "Minister of Public Enlightenment and Propaganda", "The mastermind behind the Nazi propaganda machine, responsible for controlling all media, arts, and orchestrating events like Kristallnacht.");
addKI("Reinhard Heydrich", "Head of the SD and the Gestapo", "A ruthless and highly intelligent architect of the Nazi terror state, directly responsible for gathering intelligence and organising the escalating persecution of Jewish people.");

const newContent = "export const unitData = " + JSON.stringify(dataObj, null, 4) + ";\n";
fs.writeFileSync(dataPath, newContent, 'utf8');
console.log("Successfully updated KT 4.4 and added key individuals!");
