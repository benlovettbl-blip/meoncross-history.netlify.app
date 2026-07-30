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

const lesson42 = {
    "id": "lesson_4_2",
    "title": "Key Topic 4.2: Nazi Policies Towards the Young, 1933–1939",
    "enquiry": "How did the Nazis use the education system and youth movements to indoctrinate the next generation, and how successful were they?",
    "teacher_notes": {
        "primer": "This lesson details the two-pronged approach the Nazis took to indoctrinate the youth: seizing control of the education system through the NSLB and curriculum changes, and dominating their free time via the Hitler Youth movements. Grade 9 nuance is highlighted through the Faith and Beauty Society and the fact that indoctrination was not 100% successful, leading to opposition movements.",
        "objectives": [
            {
                "objective": "Demonstrate precise knowledge of how the school curriculum and teaching profession were completely 'Nazified' by Bernhard Rust.",
                "primer": "Emphasise the compulsory nature of the NSLB and specific curriculum changes like Race Studies and the militarisation of maths.",
                "question": "Give one specific example of how a subject like Mathematics was used as a tool for propaganda."
            },
            {
                "objective": "Analyse the differences between the youth movements for boys (military preparation) and girls (domestic preparation).",
                "primer": "Draw a clear distinction between the HJ's focus on military drill and the BDM's focus on health and motherhood, including the Faith and Beauty Society.",
                "question": "What was the purpose of the Faith and Beauty Society created in 1938?"
            },
            {
                "objective": "Evaluate the extent to which Nazi youth policies were a success, acknowledging the Grade 9 nuance that resistance did exist.",
                "primer": "Ensure students understand the shift in popularity: early enthusiasm vs later resentment due to compulsory military drill.",
                "question": "Why did the Hitler Youth begin to lose popularity and face resistance from teenagers by the late 1930s?"
            }
        ]
    },
    "learning_objectives": [
        {
            "objective": "Demonstrate precise knowledge of how the school curriculum and teaching profession were completely 'Nazified' by Bernhard Rust.",
            "primer": "Emphasise the compulsory nature of the NSLB and specific curriculum changes like Race Studies and the militarisation of maths.",
            "question": "Give one specific example of how a subject like Mathematics was used as a tool for propaganda."
        },
        {
            "objective": "Analyse the differences between the youth movements for boys (military preparation) and girls (domestic preparation).",
            "primer": "Draw a clear distinction between the HJ's focus on military drill and the BDM's focus on health and motherhood, including the Faith and Beauty Society.",
            "question": "What was the purpose of the Faith and Beauty Society created in 1938?"
        },
        {
            "objective": "Evaluate the extent to which Nazi youth policies were a success, acknowledging the Grade 9 nuance that resistance did exist.",
            "primer": "Ensure students understand the shift in popularity: early enthusiasm vs later resentment due to compulsory military drill.",
            "question": "Why did the Hitler Youth begin to lose popularity and face resistance from teenagers by the late 1930s?"
        }
    ],
    "do_now": {
        "type": "retrieval",
        "items": [
            {
                "question": "What was the name of the 1933 law that gave couples 1,000 marks to marry, provided the wife left her job?",
                "answer": "The Law for the Encouragement of Marriage."
            },
            {
                "question": "What three words (beginning with K) summarised the traditional Nazi ideal for women?",
                "answer": "Kinder, Küche, Kirche (Children, Kitchen, Church)."
            },
            {
                "question": "Who was the Reich Women's Leader in charge of the Deutsches Frauenwerk (DFW)?",
                "answer": "Gertrud Scholtz-Klink."
            },
            {
                "question": "15 Second Challenge: Try to speak for 15 seconds non-stop about how the Edelweiss Pirates opposed the Nazis.",
                "answer": "They wore checked shirts, grew their hair long, went on hikes, listened to banned music, and frequently ambushed and beat up Hitler Youth patrols."
            }
        ]
    },
    "vocab": [
        { "term": "Indoctrination", "definition": "Brainwashing people to accept a set of beliefs without question." },
        { "term": "National Socialist Teachers' League (NSLB)", "definition": "The compulsory Nazi union for all teachers." },
        { "term": "Bernhard Rust", "definition": "The Nazi Minister of Science, Education and National Culture." },
        { "term": "Eugenics (Race Studies)", "definition": "The pseudo-science of selective breeding to improve the 'Aryan' race, taught as a compulsory subject." },
        { "term": "Hitlerjugend (HJ)", "definition": "The Hitler Youth (for boys aged 14–18)." },
        { "term": "Bund Deutscher Mädel (BDM)", "definition": "The League of German Maidens (for girls aged 14–18)." },
        { "term": "Faith and Beauty Society", "definition": "A Nazi organisation for women aged 17–21, designed to bridge the gap between the BDM and adult life." }
    ],
    "narrative_blocks": [
        {
            "text": "**1. The Goal: A Thousand Year Reich**\nHitler knew that adults who had grown up in the democratic Weimar Republic might never fully accept Nazism. Therefore, his priority was the youth. The goal was to raise a generation of fiercely loyal, racially pure, athletic fanatics who placed their obedience to Hitler above their own parents. To achieve this, the state took control of both their school hours and their free time."
        },
        {
            "text": "**2. Controlling the Teachers**\nEducation Minister [Key Individual: Bernhard Rust] stated that the whole purpose of education was to create Nazis.\n* **Purging the Profession:** In April 1933, the *Law for the Restoration of the Professional Civil Service* was passed. This was immediately used to sack Jewish teachers and any teachers known to have supported the Communist or Social Democratic parties. \n* **The NSLB:** All remaining teachers were heavily pressured to join the **National Socialist Teachers' League (NSLB)**. By 1939, 97% of teachers had joined. They were forced to attend one-month training camps to learn Nazi ideology and physical drill. If a teacher did not teach the Nazi way, students were encouraged to report them to the Gestapo."
        },
        {
            "text": "**3. Nazifying the Curriculum and Classrooms**\nThe school timetable and environment were completely rewritten to serve the state:\n* **Physical Education:** PE time was doubled, eventually taking up a massive **15%** of the school timetable. This was to prepare boys for the army and girls to be healthy mothers.\n* **Race Studies (Eugenics):** A brand new compulsory subject. Students were taught how to measure skulls and classify races, learning that Aryans were superior and Jews were subhuman 'parasites'. \n* **History:** History textbooks were entirely rewritten to focus on the 'stab-in-the-back' myth of WWI and the glorious rise of the Nazi Party. From 1935, all textbooks had to be state-approved, and Hitler's autobiography, *Mein Kampf*, became a compulsory text. \n* **Maths:** Even maths became a tool for propaganda. Word problems asked students to calculate the fuel required to bomb Warsaw, or the financial cost to the state of keeping disabled people in asylums.\n* **Jewish Students:** Jewish children were deliberately humiliated in class (often used as 'examples' during Race Studies). By 1938, Jewish children were banned from attending German schools entirely.\n\n**4. Elite Schools**\nFor the most promising Aryan boys, the Nazis set up elite boarding schools to train the future leaders of the SS and the government: **Napolas** (National Political Educational Institutes, run by the SS) and **Adolf Hitler Schools** (run by the Hitler Youth). These schools functioned like military boot camps, focusing heavily on physical combat, endurance, and ruthless competition."
        },
        {
            "text": "**Extracurricular Control: The Youth Movements**\nTo control children outside of school hours, Hitler appointed [Key Individual: Baldur von Schirach] as the Reich Youth Leader. All other youth groups (like the Boy Scouts or Catholic youth groups) were banned or absorbed. Crucially, the Hitler Youth aimed to undermine family loyalty; teenagers were encouraged to inform on their own parents if they heard them criticising the regime.\n\n**The Path for Boys:**\n* **Ages 10–14:** *Deutsches Jungvolk* (DJ - German Young People).\n* **Ages 14–18:** *Hitlerjugend* (HJ - Hitler Youth).\n* **Activities:** The focus was purely on military preparation. Boys engaged in regular hiking, camping, map-reading, and rifle shooting. They were subjected to harsh physical punishments to toughen them up and swore a blood oath of personal loyalty to Hitler.\n\n**The Path for Girls:**\n* **Ages 10–14:** *Jungmädelbund* (JM - Young Girls).\n* **Ages 14–18:** *Bund Deutscher Mädel* (BDM - League of German Maidens).\n* **Ages 17-21 (Grade 9 point):** The **Faith and Beauty Society** (*Glaube und Schönheit*) was set up in 1938. The Nazis were worried girls would forget their domestic training in the gap between leaving the BDM at 18 and marrying, so this group kept them under Nazi control until they joined the adult women's league.\n* **Activities:** The focus was on health and preparation for motherhood. Girls were taught domestic chores, cooking, and how to spot a racially pure husband. They also took part in gymnastics and cross-country running to ensure they were physically fit for childbirth."
        },
        {
            "text": "**5. Success or Failure? (Grade 9 Analysis)**\n* **The Success:** Initially, the youth movements were highly successful and popular. Young people enjoyed the camping, sports, and the sense of power it gave them over their parents. In 1936, the **Hitler Youth Law** made it state policy, and in 1939, a Second Hitler Youth Law made membership strictly compulsory. By 1939, membership stood at around **8 million**.\n* **The Failure:** However, by the late 1930s, the system was beginning to crack. As the Hitler Youth became strictly compulsory, it became less about fun and more about boring military drill and endless political speeches. This resentment directly fueled the rise of opposition groups like the **Edelweiss Pirates** and the **Swing Youth**, proving that indoctrination was never 100% successful."
        }
    ],
    "quiz": [
        { "q": "Who was the Nazi Minister of Education?", "a": "Bernhard Rust" },
        { "q": "What was the name of the compulsory union that 97% of teachers had joined by 1939?", "a": "The National Socialist Teachers' League / NSLB" },
        { "q": "What happened to teachers who refused to teach Nazi ideas?", "a": "They were sacked or reported to the Gestapo" },
        { "q": "What new compulsory subject taught students to classify races and measure skulls?", "a": "Race Studies / Eugenics" },
        { "q": "What percentage of the school timetable was eventually taken up by Physical Education (PE)?", "a": "15%" },
        { "q": "Give an example of how mathematics was used for propaganda.", "a": "Word problems calculating the cost of keeping disabled people in asylums or calculating bomb trajectories" },
        { "q": "From 1935 onwards, what book became a compulsory textbook in all schools?", "a": "Hitler's autobiography, Mein Kampf" },
        { "q": "In what year were Jewish children banned from attending German state schools entirely?", "a": "1938" },
        { "q": "Name one of the two types of elite boarding schools set up for the most promising Aryan boys.", "a": "Napolas or Adolf Hitler Schools" },
        { "q": "Who was appointed by Hitler in 1933 as the Reich Youth Leader?", "a": "Baldur von Schirach" },
        { "q": "What was the name of the youth group for boys aged 14-18?", "a": "Hitlerjugend / HJ / Hitler Youth" },
        { "q": "Give two examples of typical Hitler Youth activities for boys.", "a": "Rifle shooting, map reading, hiking, military drill" },
        { "q": "What was the ultimate goal for boys in the Hitler Youth?", "a": "To become soldiers for the army" },
        { "q": "What was the name of the youth group for girls aged 14-18?", "a": "Bund Deutscher Mädel / BDM / League of German Maidens" },
        { "q": "What was the ultimate goal for girls in the BDM?", "a": "To become healthy, racially pure mothers" },
        { "q": "What was the name of the society created in 1938 for young women aged 17-21 to stop them forgetting their domestic training?", "a": "The Faith and Beauty Society" },
        { "q": "How did the Nazis use the youth movements to undermine families?", "a": "They encouraged teenagers to denounce their own parents to the Gestapo if they criticised the regime" },
        { "q": "In what year did the Hitler Youth Law make the youth movements effectively mandatory?", "a": "1936" },
        { "q": "Roughly how many members were in the Nazi youth movements by 1939?", "a": "8 million" },
        { "q": "Why did some young people start to hate the Hitler Youth by the late 1930s?", "a": "It became compulsory, too strict, and focused on boring military drill instead of fun" }
    ],
    "gcse_task": {
        "topic": "Explain one consequence of Nazi policies towards the young. (4 marks)",
        "tasks": []
    }
};

// Insert lesson_4_2 if it doesn't exist, or replace if it does
const lessonIndex = dataObj.lessons.findIndex(l => l.id === 'lesson_4_2');
if (lessonIndex !== -1) {
    dataObj.lessons[lessonIndex] = lesson42;
} else {
    // Insert right after lesson_4_1 if possible
    const l41Idx = dataObj.lessons.findIndex(l => l.id === 'lesson_4_1');
    if (l41Idx !== -1) {
        dataObj.lessons.splice(l41Idx + 1, 0, lesson42);
    } else {
        dataObj.lessons.push(lesson42);
    }
}

// Ensure workbooks array has KT4 prefix
const kt4Wb = dataObj.workbooks.find(w => w.id === 'KT4');
if (kt4Wb && kt4Wb.lessons) delete kt4Wb.lessons;

// Add key individuals
if (!dataObj.key_individuals) dataObj.key_individuals = [];
const addKI = (name, role, significance) => {
    if (!dataObj.key_individuals.some(k => k.name === name)) {
        dataObj.key_individuals.push({ name, role, significance, image: "" });
    }
};

addKI("Bernhard Rust", "Minister of Science, Education and National Culture", "Oversaw the total Nazification of the German education system, purging Jewish teachers and creating the compulsory National Socialist Teachers' League.");
addKI("Baldur von Schirach", "Reich Youth Leader", "Appointed by Hitler in 1933 to control all extracurricular activities for German youth, leading the massive expansion of the Hitler Youth and BDM.");

const newContent = "export const unitData = " + JSON.stringify(dataObj, null, 4) + ";\n";
fs.writeFileSync(dataPath, newContent, 'utf8');
console.log("Successfully updated KT 4.2 and added key individuals!");
