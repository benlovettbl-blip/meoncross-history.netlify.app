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

// Find lesson_3_2 and replace it
const lessonIndex = dataObj.lessons.findIndex(l => l.id === 'lesson_3_2');
if (lessonIndex !== -1) {
    dataObj.lessons[lessonIndex] = {
        "id": "lesson_3_2",
        "title": "Key Topic 3.2: The Police State and Religion, 1933–1939",
        "enquiry": "The architecture of fear: How did Hitler construct a terrifying police state and attempt to crush the moral authority of the German churches?",
        "teacher_notes": {
            "primer": "This lesson explores the dual pillars of Nazi control: physical terror through the police state and moral control through the subjugation of religion. It introduces advanced historical analysis regarding the RSHA and the 'myth of the Gestapo', as well as the specific bureaucratic and cultural attacks on the churches.",
            "objectives": [
                {
                    "objective": "Demonstrate precise knowledge of the different, overlapping branches of the Nazi police state, distinguishing between the roles of the SS, SD, and Gestapo.",
                    "primer": "Ensure students can clearly differentiate the SS, SD, and Gestapo before diving into how they overlapped.",
                    "question": "Which Nazi police branch was primarily responsible for gathering intelligence and keeping index cards on opponents?"
                },
                {
                    "objective": "Analyse how the Nazis completely removed the independence of the German legal system to ensure the courts always ruled in Hitler's favour.",
                    "primer": "Highlight the role of Roland Freisler and the People's Court.",
                    "question": "Why did Hitler feel it was necessary to abolish juries in the People's Court?"
                },
                {
                    "objective": "Evaluate the varying successes and failures of Nazi policies towards the Catholic and Protestant churches.",
                    "primer": "Contrast the early success of the Concordat with the later resistance by figures like Niemöller and Bonhoeffer.",
                    "question": "To what extent did Hitler succeed in controlling the Protestant churches by 1939?"
                }
            ]
        },
        "learning_objectives": [
            {
                "objective": "Demonstrate precise knowledge of the different, overlapping branches of the Nazi police state, distinguishing between the roles of the SS, SD, and Gestapo.",
                "primer": "Ensure students can clearly differentiate the SS, SD, and Gestapo before diving into how they overlapped.",
                "question": "Which Nazi police branch was primarily responsible for gathering intelligence and keeping index cards on opponents?"
            },
            {
                "objective": "Analyse how the Nazis completely removed the independence of the German legal system to ensure the courts always ruled in Hitler's favour.",
                "primer": "Highlight the role of Roland Freisler and the People's Court.",
                "question": "Why did Hitler feel it was necessary to abolish juries in the People's Court?"
            },
            {
                "objective": "Evaluate the varying successes and failures of Nazi policies towards the Catholic and Protestant churches.",
                "primer": "Contrast the early success of the Concordat with the later resistance by figures like Niemöller and Bonhoeffer.",
                "question": "To what extent did Hitler succeed in controlling the Protestant churches by 1939?"
            }
        ],
        "do_now": {
            "type": "retrieval",
            "items": [
                {
                    "question": "What was the name of the law passed in March 1933 that effectively allowed Hitler to rule Germany as a dictator for four years?",
                    "answer": "The Enabling Act."
                },
                {
                    "question": "What is meant by the historical term Gleichschaltung?",
                    "answer": "The process of Nazification by which Hitler brought all aspects of German society and government under Nazi control."
                },
                {
                    "question": "On what exact date did Hitler launch the Night of the Long Knives?",
                    "answer": "30 June 1934."
                },
                {
                    "question": "15 Second Challenge: Try to speak for 15 seconds non-stop about why Hitler felt he had to murder Ernst Röhm.",
                    "answer": "Röhm led the SA which had 3 million members; he wanted a 'second revolution' to redistribute wealth; he wanted the SA to replace the regular army, which alienated the powerful army generals Hitler needed."
                }
            ]
        },
        "vocab": [
            { "term": "SS (Schutzstaffel)", "definition": "Originally Hitler’s private bodyguards, they became the most powerful armed force in Germany, running the police state and concentration camps under Heinrich Himmler." },
            { "term": "SD (Sicherheitsdienst)", "definition": "The intelligence and security agency of the Nazi Party, commanded by Reinhard Heydrich. They spied on opponents." },
            { "term": "Gestapo", "definition": "The official non-uniformed Secret State Police. Their primary job was to identify, arrest, and interrogate political opponents." },
            { "term": "Schutzhaft (Protective Custody)", "definition": "A Nazi legal loophole that allowed the Gestapo to arrest and imprison anyone indefinitely without a trial or judge's permission." },
            { "term": "The Concordat (1933)", "definition": "A formal treaty signed between the Nazi government and the Catholic Pope." },
            { "term": "Reich Church", "definition": "A Nazified version of the Protestant Church, which merged traditional Christianity with Nazi racial ideas." },
            { "term": "Confessional Church", "definition": "An illegal, breakaway Protestant church set up in direct opposition to the Nazis' interference in religion." }
        ],
        "narrative_blocks": [
            {
                "text": "**1. The Machinery of Terror: SS, SD, and Gestapo**\nTo maintain absolute control, Hitler could not rely on the regular German police forces, which were run by local governments. Instead, he built a terrifying, highly organised 'Police State' directly loyal to the Nazi Party, operating completely outside normal laws.\n\n* **The SS:** Led by [Key Individual: Heinrich Himmler], the SS grew from a small bodyguard unit into a massive organisation of deeply loyal, racially \"pure\" Aryans. By 1936, Himmler was placed in charge of all police forces in Germany. The ruthless 'Death's Head Units' of the SS were responsible for running the concentration camps.\n* **The SD:** Formed in 1931 by Himmler and run by his ruthless deputy, [Key Individual: Reinhard Heydrich], the SD was the intelligence-gathering wing of the party. They kept a massive card index of anyone suspected of opposing the Nazis, spying on everyone from high-ranking politicians to ordinary citizens.\n* **The Gestapo:** Also commanded by Heydrich, the Gestapo was the non-uniformed Secret State Police. They had the power to tap telephones, open mail, and use **Schutzhaft (Protective Custody)** to arrest people and send them straight to concentration camps without a trial."
            },
            {
                "text": "**Advanced Analysis: The RSHA and the 'Myth' of the Gestapo**\nBy 1939, Himmler consolidated all these overlapping branches (Gestapo, SD, and criminal police) into a single monstrous umbrella organisation: the **RSHA (Reich Main Security Office)**, overseen by Heydrich. Yet, Nazi propaganda deliberately created the terrifying myth that the Gestapo itself was an enormous, all-seeing organisation with agents on every street corner. In reality, the Gestapo was surprisingly small; in 1939, a major city like Frankfurt only had 28 Gestapo agents for a population of nearly half a million. The true horror of the police state was that it relied on **ordinary citizens**. Roughly 80% of all Gestapo arrests were triggered by voluntary denunciations—neighbours, local block wardens (*Blockleiters*), and even children reporting on each other out of spite, jealousy, or brainwashed loyalty."
            },
            {
                "text": "**2. Controlling the Legal System**\nHitler knew that his police state would only work if the courts supported it. He systematically destroyed the independence of the German legal system:\n\n* **The Judges:** All judges were forced to join the **National Socialist League for the Maintenance of the Law**. If a judge did not rule the way the Nazi Party wanted, they were instantly sacked.\n* **The People's Court:** In 1934, Hitler set up the People’s Court (*Volksgerichtshof*) to try cases of treason. Juries were abolished. Instead, cases were heard by fanatical Nazi judges, most notoriously the screaming, aggressive [Key Individual: Roland Freisler]. Trials were held in secret, there was no right to appeal, and the number of death penalties skyrocketed."
            },
            {
                "text": "**3. The Early Concentration Camps**\nThe ultimate weapon of the police state was the concentration camp. The first camp, **Dachau**, was opened in 1933. In this early period (1933–39), these were primarily *political* prisons, not the extermination camps they would later become. Inmates were mostly communists, trade unionists, outspoken journalists, and political rivals. They were used as forced labour, subjected to brutal beatings by SS guards, and deliberately kept in terrible conditions to serve as a terrifying warning to the rest of the population."
            },
            {
                "text": "**4. Controlling the Churches: The Catholic Concordat**\nReligion was a massive threat to Hitler. Christianity preached peace, forgiveness, and loyalty to God over any earthly leader. In 1933, one-third of Germans were Catholic, and two-thirds were Protestant.\n\nInitially, Hitler tried to compromise with the Catholic Church. In **July 1933**, he signed the **Concordat** with the Pope. The Pope agreed that Catholic priests would stay out of German politics, and in return, Hitler promised not to interfere with Catholic schools or youth groups.\n\nHowever, Hitler quickly broke this treaty. By 1935, he had set up a dedicated **Ministry of Church Affairs** under [Key Individual: Hanns Kerrl] to systematically weaken religious power. In 1936, the state aggressively campaigned to remove crucifixes from Catholic classrooms, Catholic schools were forcibly closed, and the Catholic Youth League was banned. In 1937, a furious [Key Individual: Pope Pius XI] issued a scorching public letter called ***Mit brennender Sorge*** *(With Burning Concern)*. It was secretly smuggled into Germany and read out in every Catholic church, openly condemning Hitler's broken promises and his dangerous \"myth of race and blood.\""
            },
            {
                "text": "**5. Controlling the Churches: The Protestants**\nThe Protestant churches were heavily divided. Hitler united the pro-Nazi Protestants into a single **Reich Church**, led by [Key Individual: Ludwig Müller] (the 'Reich Bishop'). Its members called themselves 'German Christians'. They wore Nazi uniforms, hung swastikas inside their churches, and demanded that the Old Testament of the Bible be banned because of its Jewish origins.\n\nIn disgust, a brave First World War U-boat commander turned pastor named [Key Individual: Martin Niemöller] set up the **Pastors' Emergency League (PEL)**, which evolved into the rival **Confessional Church** in 1934. Over 6,000 Protestant pastors joined Niemöller, alongside theologians like [Key Individual: Dietrich Bonhoeffer] (who secretly trained illegal pastors), in preaching against Nazi interference in religion. The Nazis responded with brutal force: Niemöller was arrested in 1937 and eventually sent to Sachsenhausen concentration camp, and hundreds of his pastors were imprisoned."
            }
        ],
        "quiz": [
            { "q": "Who was the leader of the SS, who eventually took control of all police forces in Germany?", "a": "Heinrich Himmler" },
            { "q": "What does the abbreviation 'SD' stand for?", "a": "Sicherheitsdienst / Security Service" },
            { "q": "What was the RSHA, created in 1939 under Reinhard Heydrich?", "a": "The Reich Main Security Office, grouping the Gestapo, SD, and Kripo together" },
            { "q": "What was the specific job of the SD?", "a": "Intelligence gathering / spying on opponents and keeping index cards on them" },
            { "q": "Because the Gestapo was actually quite small, who did they rely on for 80% of their information?", "a": "Ordinary citizens / informers denouncing their neighbours" },
            { "q": "What is the German term for 'Protective Custody', which allowed the Gestapo to arrest people without trial?", "a": "Schutzhaft" },
            { "q": "What was the name of the compulsory organisation that all German judges were forced to join?", "a": "The National Socialist League for the Maintenance of the Law" },
            { "q": "What was the name of the new court set up in 1934 to hear cases of treason without a jury?", "a": "The People's Court" },
            { "q": "Name the first concentration camp, opened in Germany in 1933.", "a": "Dachau" },
            { "q": "In the years 1933–39, which specific groups of people made up the vast majority of concentration camp inmates?", "a": "Political prisoners / Communists / Trade Unionists" },
            { "q": "In what month and year did Hitler sign the Concordat with the Catholic Church?", "a": "July 1933" },
            { "q": "Under the Concordat, what did the Pope agree to do?", "a": "Keep the Catholic Church out of German politics" },
            { "q": "Who was placed in charge of the newly created Ministry of Church Affairs in 1935?", "a": "Hanns Kerrl" },
            { "q": "Give one example of how Hitler broke the Concordat.", "a": "He launched a campaign to remove crucifixes from schools / banned Catholic youth groups / arrested priests" },
            { "q": "What was the title of the angry letter the Pope had smuggled into Germany and read out in 1937?", "a": "'Mit brennender Sorge' / With Burning Concern" },
            { "q": "What was the name of the official, Nazified Protestant church set up by the government?", "a": "The Reich Church" },
            { "q": "Who was appointed as the 'Reich Bishop' to lead the Nazified Protestant church?", "a": "Ludwig Müller" },
            { "q": "What did members of the Reich Church proudly call themselves?", "a": "'German Christians'" },
            { "q": "What was the name of the illegal, breakaway Protestant church set up in opposition to the Nazis?", "a": "The Confessional Church" },
            { "q": "Name one of the key leaders of the Confessional Church who opposed the Nazis.", "a": "Martin Niemöller or Dietrich Bonhoeffer" }
        ],
        "gcse_task": {
            "topic": "Explain one consequence of the Nazis' religious policies in the years 1933–39. (4 marks)",
            "tasks": []
        }
    };
} else {
    console.error("Could not find lesson_3_2 in data.js");
}

// Add key individuals
if (!dataObj.key_individuals) dataObj.key_individuals = [];
const addKI = (name, role, significance) => {
    if (!dataObj.key_individuals.some(k => k.name === name)) {
        dataObj.key_individuals.push({ name, role, significance, image: "" });
    }
};

addKI("Hanns Kerrl", "Reich Minister of Church Affairs", "Appointed by Hitler in 1935 to oversee the systematic weakening and Nazification of the German churches.");
addKI("Dietrich Bonhoeffer", "Theologian and Anti-Nazi Dissident", "A key founding member of the Confessional Church who secretly trained illegal pastors and staunchly opposed Nazi interference in religion.");

const newContent = "export const unitData = " + JSON.stringify(dataObj, null, 4) + ";\n";
fs.writeFileSync(dataPath, newContent, 'utf8');
console.log("Successfully updated KT 3.2 and added key individuals!");
