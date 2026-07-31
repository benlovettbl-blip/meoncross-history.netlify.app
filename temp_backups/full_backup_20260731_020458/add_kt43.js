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

const lesson43 = {
    "id": "lesson_4_3",
    "title": "Key Topic 4.3: Employment and Living Standards, 1933–1939",
    "enquiry": "How did the Nazis achieve the 'economic miracle' of full employment, and did the standard of living actually improve for German workers?",
    "teacher_notes": {
        "primer": "This lesson deconstructs the myth of the Nazi 'economic miracle', showing how unemployment statistics were manipulated and how workers' living standards actually declined despite job security. It contrasts Schacht's New Plan with Goering's Four Year Plan and Autarky.",
        "objectives": [
            {
                "objective": "Demonstrate precise knowledge of the government schemes used to reduce unemployment (RAD, public works, and rearmament).",
                "primer": "Focus on the scale of the Autobahn project and the compulsory nature of the RAD.",
                "question": "What was the main purpose of the National Labour Service (RAD) and who was forced to join it?"
            },
            {
                "objective": "Analyse the shift in economic leadership from Schacht’s 'New Plan' to Goering’s 'Four Year Plan' and the goal of Autarky.",
                "primer": "Ensure students grasp the difference between Schacht's cautious trade agreements and Goering's aggressive push for war readiness.",
                "question": "Why did Hitler replace Hjalmar Schacht with Hermann Goering in 1936?"
            },
            {
                "objective": "Evaluate the extent to which the Nazi economic recovery was a statistical illusion (invisible unemployment) and assess the true impact on living standards.",
                "primer": "Highlight the 'Guns over Butter' policy and the Volkswagen scam to show how workers were squeezed.",
                "question": "Give two examples of how the Nazis created 'Invisible Unemployment' to make their economic statistics look better."
            }
        ]
    },
    "learning_objectives": [
        {
            "objective": "Demonstrate precise knowledge of the government schemes used to reduce unemployment (RAD, public works, and rearmament).",
            "primer": "Focus on the scale of the Autobahn project and the compulsory nature of the RAD.",
            "question": "What was the main purpose of the National Labour Service (RAD) and who was forced to join it?"
        },
        {
            "objective": "Analyse the shift in economic leadership from Schacht’s 'New Plan' to Goering’s 'Four Year Plan' and the goal of Autarky.",
            "primer": "Ensure students grasp the difference between Schacht's cautious trade agreements and Goering's aggressive push for war readiness.",
            "question": "Why did Hitler replace Hjalmar Schacht with Hermann Goering in 1936?"
        },
        {
            "objective": "Evaluate the extent to which the Nazi economic recovery was a statistical illusion (invisible unemployment) and assess the true impact on living standards.",
            "primer": "Highlight the 'Guns over Butter' policy and the Volkswagen scam to show how workers were squeezed.",
            "question": "Give two examples of how the Nazis created 'Invisible Unemployment' to make their economic statistics look better."
        }
    ],
    "do_now": {
        "type": "retrieval",
        "items": [
            {
                "question": "What was the name of the society created in 1938 for young women aged 17–21?",
                "answer": "The Faith and Beauty Society."
            },
            {
                "question": "What was the legal quota cap placed on female university enrolment?",
                "answer": "Maximum 10%."
            },
            {
                "question": "Name the compulsory union that 97% of teachers had joined by 1939.",
                "answer": "The National Socialist Teachers' League (NSLB)."
            },
            {
                "question": "15 Second Challenge: Try to speak for 15 seconds non-stop about why Nazi policies towards female employment contradicted their own ideological goals.",
                "answer": "Hitler wanted women at home breeding (Kinder, Küche, Kirche), but rearmament created a massive labor shortage, forcing the Nazis to introduce a Compulsory Duty Year to bring women back into factories."
            }
        ]
    },
    "vocab": [
        { "term": "Invisible Unemployment", "definition": "The Nazi practice of manipulating statistics to hide the true number of people out of work." },
        { "term": "Autarky", "definition": "The economic policy of self-sufficiency; trying to produce everything Germany needed so it would not rely on imports during a war." },
        { "term": "Ersatz", "definition": "Artificial substitute goods developed to help achieve Autarky (e.g., making rubber from coal)." },
        { "term": "Hermann Goering", "definition": "The Nazi minister put in charge of the 'Four Year Plan' in 1936 to prepare the economy for war." },
        { "term": "National Labour Service (RAD)", "definition": "A scheme providing manual work for the unemployed, made compulsory for young men in 1935." },
        { "term": "German Labour Front (DAF)", "definition": "The Nazi organisation that replaced trade unions, led by Robert Ley." },
        { "term": "Strength Through Joy (KdF)", "definition": "A subdivision of the DAF that provided cheap leisure activities to bribe workers into compliance." },
        { "term": "Beauty of Labour (SdA)", "definition": "A subdivision of the DAF aimed at improving workplace conditions (like canteens and lighting)." }
    ],
    "narrative_blocks": [
        {
            "text": "**1. The Unemployment Crisis & Job Creation**\nWhen Hitler became Chancellor in January 1933, nearly 6 million Germans were officially unemployed. By 1939, this figure was reported as just 300,000. The Nazis achieved this through massive state-funded projects:\n* **The National Labour Service (RAD):** From 1935, it became compulsory for all men aged 18–25 to serve six months. They lived in military-style camps, wore uniforms, and did low-paid manual labour like draining swamps. \n* **Public Works (The Autobahns):** Hitler planned a 7,000-mile network of dual-carriageway motorways. By 1938, over 100,000 men were employed in construction."
        },
        {
            "text": "**2. The Grade 9 Reality: 'Invisible Unemployment'**\nThe Nazi 'economic miracle' was heavily manipulated. The official figures **ignored**:\n* **Jews:** Hundreds of thousands were sacked from their jobs but not counted on the register.\n* **Women:** Women dismissed from professions or who gave up work for a marriage loan were not counted.\n* **Political Prisoners:** Hundreds of thousands held in concentration camps were excluded.\n* **Part-time workers:** Anyone working even a few hours a week was counted as fully employed.\n* **Conscription:** Reintroduced in 1935. The army grew from 100,000 to 1.4 million by 1939. These men were removed from unemployment statistics."
        },
        {
            "text": "**3. Economic Leadership: Schacht vs. Goering (Grade 9 Focus)**\nTo understand the Nazi economy, you must understand the shift in leadership:\n* **The New Plan (1934–1937):** Run by [Key Individual: Hjalmar Schacht]. He focused on reducing imports and making clever trade agreements to solve Germany's economic crisis. He was successful but was sacked because he told Hitler that rapid rearmament was bankrupting the country.\n* **The Four Year Plan (1936–1939):** Run by [Key Individual: Hermann Goering]. His primary goal was to prepare the economy for war within four years. His main focus was **Autarky** (self-sufficiency). Billions were poured into arms manufacturing (aviation employment rose from 4,000 to 72,000 in two years) and developing **Ersatz** (substitute) goods, like extracting oil from coal or making synthetic rubber (Buna), so Germany could survive a naval blockade."
        },
        {
            "text": "**4. Controlling the Workers: The DAF**\nIn May 1933, Hitler banned all trade unions and strikes. To replace them, he set up the **German Labour Front (DAF)**, run by [Key Individual: Robert Ley]. Every worker had to join. Employers could set wages as they pleased, and workers could not negotiate or quit without permission. To bribe the workers into accepting this loss of freedom, the DAF set up two sub-organisations:\n* **Strength Through Joy (KdF):** Provided state-subsidised leisure activities like theatre tickets and luxury cruises to loyal workers. \n* **The Volkswagen Scheme:** A KdF savings scheme where workers paid 5 marks a week towards a 'People's Car'. It was a scam—in 1939, factories switched to military vehicles, and no civilian ever received a car or a refund.\n* **Beauty of Labour (SdA):** Campaigned for better factory facilities. *Nuance:* While facilities improved, employers forced the workers to build these canteens themselves during unpaid free time."
        },
        {
            "text": "**5. Winners and Losers: Did Living Standards Improve?**\nThe idea that everyone was better off under the Nazis is a myth. \n* **The Winners (Big Business & Farmers):** Giant monopolies like IG Farben and Krupp made fortunes from government rearmament contracts. Farmers benefited initially from the *Reich Entailed Farm Law* (1933), which protected their land from being seized for debt (though it also meant they couldn't sell it). \n* **The Losers (Small Businesses & Workers):** Small businesses (*Mittelstand*) were squeezed out by big department stores and high taxes; roughly 20% went bankrupt. For the average worker, the working week increased from 43 hours in 1933 to 49 hours in 1939. Because the government prioritized military spending ('Guns over Butter') and Ersatz goods were expensive to produce, the price of basic groceries rose faster than wages. **Conclusion:** Workers had job security, but their purchasing power (real wages) fell compared to the Weimar era."
        }
    ],
    "quiz": [
        { "q": "How many Germans were officially unemployed when Hitler became Chancellor in 1933?", "a": "Nearly 6 million" },
        { "q": "What was the official unemployment figure reported by the Nazis in 1939?", "a": "Approximately 300,000" },
        { "q": "What do the initials RAD stand for in English?", "a": "National Labour Service" },
        { "q": "In what year did the RAD become compulsory for all young men aged 18–25?", "a": "1935" },
        { "q": "How long did young men have to serve in the RAD?", "a": "6 months" },
        { "q": "By 1938, how many men were employed building the Autobahns?", "a": "Over 100,000" },
        { "q": "What term is used to describe the Nazi manipulation of unemployment statistics?", "a": "Invisible Unemployment" },
        { "q": "Name two groups of people who were removed from the workforce but not counted in the unemployment figures.", "a": "Jews and Women" },
        { "q": "How large did the German army grow between 1933 and 1939 after conscription was reintroduced?", "a": "From 100,000 to 1.4 million men" },
        { "q": "Who was the Minister of Economics responsible for the 'New Plan' (1934-1937)?", "a": "Hjalmar Schacht" },
        { "q": "Who was put in charge of the 'Four Year Plan' in 1936?", "a": "Hermann Goering" },
        { "q": "What was the ultimate goal of the Four Year Plan?", "a": "To prepare the German economy for war within four years" },
        { "q": "What is the term for the economic policy of self-sufficiency?", "a": "Autarky" },
        { "q": "What is the German word for the artificial substitute goods developed to achieve self-sufficiency?", "a": "Ersatz" },
        { "q": "Give an example of an Ersatz good.", "a": "Making rubber or oil from coal" },
        { "q": "In May 1933, what did Hitler ban to gain control over the workers?", "a": "Trade Unions" },
        { "q": "What Nazi organisation replaced trade unions?", "a": "The German Labour Front / DAF" },
        { "q": "Who was the leader of the DAF?", "a": "Robert Ley" },
        { "q": "What did Strength Through Joy (KdF) provide for workers?", "a": "Cheap, subsidised leisure activities like theatre tickets and cruises" },
        { "q": "How much did workers pay per week into the Volkswagen savings scheme?", "a": "5 marks" },
        { "q": "Why was the Volkswagen scheme a massive scam?", "a": "Production shifted to military vehicles in 1939; no one got a car and no money was refunded" },
        { "q": "What was the catch with the 'Beauty of Labour' (SdA) improvements?", "a": "Workers had to build the new facilities themselves during their unpaid free time" },
        { "q": "How much did the average working week increase between 1933 and 1939?", "a": "From 43 hours to 49 hours" },
        { "q": "Which phrase describes the tension between military spending and consumer goods?", "a": "'Guns versus Butter'" },
        { "q": "Did 'real wages' (purchasing power) for the average worker improve by 1939?", "a": "No, because food prices rose faster than their wages" }
    ],
    "gcse_task": {
        "topic": "Explain why the Nazis were able to reduce unemployment between 1933 and 1939. (12 marks)",
        "tasks": []
    }
};

// Insert lesson_4_3 if it doesn't exist, or replace if it does
const lessonIndex = dataObj.lessons.findIndex(l => l.id === 'lesson_4_3');
if (lessonIndex !== -1) {
    dataObj.lessons[lessonIndex] = lesson43;
} else {
    const l42Idx = dataObj.lessons.findIndex(l => l.id === 'lesson_4_2');
    if (l42Idx !== -1) {
        dataObj.lessons.splice(l42Idx + 1, 0, lesson43);
    } else {
        dataObj.lessons.push(lesson43);
    }
}

// Add key individuals
if (!dataObj.key_individuals) dataObj.key_individuals = [];
const addKI = (name, role, significance) => {
    if (!dataObj.key_individuals.some(k => k.name === name)) {
        dataObj.key_individuals.push({ name, role, significance, image: "" });
    }
};

addKI("Hjalmar Schacht", "Minister of Economics", "Architect of the 'New Plan', successfully reducing unemployment through public works, but was sacked for opposing Hitler's rapid rearmament.");
addKI("Hermann Goering", "Minister in charge of the Four Year Plan", "Oversaw the aggressive push for Autarky (self-sufficiency) and rearmament to prepare the German economy for war by 1940.");
addKI("Robert Ley", "Head of the German Labour Front (DAF)", "Controlled the German workforce after trade unions were banned, using the 'Strength Through Joy' (KdF) scheme to bribe workers into compliance.");

const newContent = "export const unitData = " + JSON.stringify(dataObj, null, 4) + ";\n";
fs.writeFileSync(dataPath, newContent, 'utf8');
console.log("Successfully updated KT 4.3 and added key individuals!");
