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

const lesson41 = {
    "id": "lesson_4_1",
    "title": "Key Topic 4.1: Nazi Policies Towards Women, 1933–1939",
    "enquiry": "How did the Nazis attempt to reverse the freedoms of Weimar women, and why did their policies ultimately contradict their own economic goals?",
    "teacher_notes": {
        "primer": "This lesson explores the Nazi ideological reversal of Weimar women's freedoms, focusing on the drive for an Aryan population. It highlights elite-level details such as the forced sterilisation policies, the strict 10% university quota, the distinction between the NSF and DFW, and the ultimate economic failure of forcing women out of work.",
        "objectives": [
            {
                "objective": "Demonstrate precise knowledge of the laws and incentives used to increase the birth rate and promote traditional marriage.",
                "primer": "Highlight the financial mechanics of the Marriage Loan and the symbolic power of the Mother's Cross.",
                "question": "What specific financial condition was attached to the 1933 Law for the Encouragement of Marriage?"
            },
            {
                "objective": "Analyse the methods used by the NS-Frauenschaft and the Deutsches Frauenwerk to control women's daily lives and education.",
                "primer": "Distinguish between the elite NSF leadership and the massive DFW membership.",
                "question": "How did the Deutsches Frauenwerk (DFW) practically attempt to brainwash women into their Nazi roles?"
            },
            {
                "objective": "Evaluate the 'great contradiction' of Nazi policy: why female employment actually increased between 1933 and 1939 despite ideological attempts to force women out of the workplace.",
                "primer": "Ensure students understand the impact of Göring's Four Year Plan and the resulting labor shortage.",
                "question": "Why did the Four Year Plan of 1936 force the Nazis to abandon their ideological goal of keeping women at home?"
            }
        ]
    },
    "learning_objectives": [
        {
            "objective": "Demonstrate precise knowledge of the laws and incentives used to increase the birth rate and promote traditional marriage.",
            "primer": "Highlight the financial mechanics of the Marriage Loan and the symbolic power of the Mother's Cross.",
            "question": "What specific financial condition was attached to the 1933 Law for the Encouragement of Marriage?"
        },
        {
            "objective": "Analyse the methods used by the NS-Frauenschaft and the Deutsches Frauenwerk to control women's daily lives and education.",
            "primer": "Distinguish between the elite NSF leadership and the massive DFW membership.",
            "question": "How did the Deutsches Frauenwerk (DFW) practically attempt to brainwash women into their Nazi roles?"
        },
        {
            "objective": "Evaluate the 'great contradiction' of Nazi policy: why female employment actually increased between 1933 and 1939 despite ideological attempts to force women out of the workplace.",
            "primer": "Ensure students understand the impact of Göring's Four Year Plan and the resulting labor shortage.",
            "question": "Why did the Four Year Plan of 1936 force the Nazis to abandon their ideological goal of keeping women at home?"
        }
    ],
    "do_now": {
        "type": "retrieval",
        "items": [
            {
                "question": "What was the name of the working-class youth opposition group that rebelled by going on hikes and wearing checked shirts?",
                "answer": "The Edelweiss Pirates."
            },
            {
                "question": "What were the Sopade reports?",
                "answer": "Secret intelligence reports smuggled out of Germany by the exiled SPD to track the true mood of the German public."
            },
            {
                "question": "Who was the carpenter who attempted to assassinate Hitler with a bomb in 1939?",
                "answer": "Georg Elser."
            },
            {
                "question": "15 Second Challenge: Try to speak for 15 seconds non-stop about how industrial workers carried out passive resistance in Nazi factories.",
                "answer": "Since trade unions were banned, they couldn't openly strike, so they deliberately worked slowly ('slow-working'), called in sick (absenteeism), and secretly sabotaged factory machinery."
            }
        ]
    },
    "vocab": [
        { "term": "Kinder, Küche, Kirche", "definition": "\"Children, Kitchen, Church\" – the traditional slogan that summarised the Nazi ideal for women." },
        { "term": "Law for the Encouragement of Marriage (1933)", "definition": "A law providing government loans to young couples, provided the wife left her job." },
        { "term": "The Mother’s Cross (Mutterkreuz)", "definition": "An award given to women who had large numbers of children, treated like a military medal." },
        { "term": "Lebensborn (Spring of Life)", "definition": "A program started by Heinrich Himmler in 1935 to breed 'racially pure' Aryan children." },
        { "term": "NS-Frauenschaft (NSF)", "definition": "The elite National Socialist Women's League." },
        { "term": "Deutsches Frauenwerk (DFW)", "definition": "The massive German Women's Enterprise, overseen by the NSF, designed to educate women on domestic duties." },
        { "term": "Gertrud Scholtz-Klink", "definition": "The Reich Women's Leader, appointed by Hitler to oversee all women's organisations." }
    ],
    "narrative_blocks": [
        {
            "text": "**1. The Ideological Shift: Reversing Weimar Freedoms**\nDuring the Weimar Republic (1924–1929), German women had achieved some of the most progressive rights in Europe (Article 109 gave them equal voting rights, and millions entered professions). Hitler viewed this as a disaster. In Nazi ideology, men and women had entirely different, biological roles: men were warriors and breadwinners; women were mothers, responsible for breeding the pure Aryan race (the *Volksgemeinschaft*). The Weimar 'New Woman' was to be replaced by the traditional, rural mother."
        },
        {
            "text": "**2. Increasing the Birth Rate: Rewards and Bribes**\nThe birth rate had fallen to just one million births per year by 1933. To prepare for future wars, Hitler needed soldiers. The Nazis used a mix of financial bribes and radical policies to force the birth rate up:\n\n* **The Law for the Encouragement of Marriage (1933):** The government offered loans of 1,000 marks (equivalent to 8 months' wages) to young, racially pure couples to marry. However, the loan was only granted if the woman quit her job. For every child born, 25% of the loan was wiped out. Having four children meant the loan was completely forgiven.\n* **The Mother's Cross (*Mutterkreuz*):** Motherhood was glorified as a service to the state. Medals were awarded every year on August 12th (Hitler's mother's birthday): Bronze for 4/5 children, Silver for 6/7, and Gold for 8 or more. Hitler Youth members were legally ordered to salute women wearing the Gold cross.\n* **Changes to Divorce Laws (1938):** If a wife could not—or would not—have children, or if she had an abortion, this could now be used by the husband as legal grounds for divorce.\n* **The *Lebensborn* Programme (1935):** Run by Heinrich Himmler and the SS. Initially a nursery for SS wives, it evolved into a state-sponsored breeding programme. Single women who met strict Aryan racial criteria volunteered to be impregnated by carefully selected SS officers to create 'genetically pure' children for the state."
        },
        {
            "text": "**3. The Dark Side of the Policy: Eugenics and Sterilisation**\n*Grade 9 nuance:* The Nazis only wanted *Aryan* and *healthy* women to breed. For those who did not fit this ideal, the policies were brutal.\n\n* **The Law for the Prevention of Hereditarily Diseased Offspring (1933):** Also known as the Sterilisation Law, this allowed the government to forcefully sterilise women deemed \"unfit\" to be mothers (e.g., those with mental illnesses, physical disabilities, or deafness). Over 320,000 people were sterilised under this law.\n* **The Marriage Health Law (1935):** Stressed the absolute necessity of \"racial purity,\" banning marriages between Aryans and those deemed genetically or racially \"inferior\"."
        },
        {
            "text": "**4. Controlling Appearance, Daily Life, and Education**\nThe Nazis dictated exactly how the ideal German woman should look and behave, enforced through propaganda and social pressure:\n\n* **Appearance:** They were expected to wear traditional German peasant dresses. Trousers, high heels, and makeup were heavily discouraged. Hair had to be tied back in plaits or a bun; dyeing or perming hair was viewed as 'un-German'.\n* **Lifestyle Restrictions:** Women were banned from smoking in public (it was considered harmful to fertility) and discouraged from slimming/dieting, as the Nazis believed heavier women had easier childbirths.\n* **Organisations:** Hitler appointed [Key Individual: Gertrud Scholtz-Klink] as the Reich Women’s Leader. She oversaw the elite **NS-Frauenschaft** (National Socialist Women's League). All independent women's groups were banned and merged into the massive **Deutsches Frauenwerk (DFW)**, which by 1939 had 6 million members. It ran motherhood schools, teaching millions of women how to cook, clean, and raise children according to Nazi ideology.\n* **Education:** To keep women focused on the 'Three Ks' (*Kinder, Küche, Kirche*), female enrolment in universities was strictly limited to a maximum quota of **10%**."
        },
        {
            "text": "**5. Employment: The Great Contradiction**\nThis is a crucial analytical point. The Nazis *wanted* women out of the workplace, but their own economic and military goals made this impossible.\n\n* **Initial Removals (1933–1936):** Women were forced out of professional careers. In 1933, female doctors, civil servants, and teachers were sacked. In 1936, women were banned from being judges or serving on juries.\n* **The Reversal (1937–1939):** In 1936, Hermann Göring introduced the **Four Year Plan** to secretly rearm Germany for war. This created a massive labor shortage in factories as men joined the army. By 1937, the Nazis were forced to abandon their ideology. They needed women back in the factories. They abolished the marriage loan requirement that women had to quit work, and introduced a \"compulsory duty year\" requiring women to work in agriculture or industry.\n* **The Result:** Nazi employment policy towards women was an ideological failure. Despite spending years telling women to stay at home, the number of women in employment actually **rose** from 11.6 million in 1933 to 14.6 million in 1939."
        }
    ],
    "quiz": [
        { "q": "What three German words (starting with K) summarised the traditional Nazi ideal for women?", "a": "Kinder, Küche, Kirche" },
        { "q": "Translate those three words into English.", "a": "Children, Kitchen, Church" },
        { "q": "What was the name of the 1933 law that gave couples 1,000 marks to marry?", "a": "The Law for the Encouragement of Marriage" },
        { "q": "What was the condition placed on the wife for the couple to receive this loan?", "a": "She had to quit her job" },
        { "q": "How much of the marriage loan was forgiven for each child born?", "a": "25% / one quarter" },
        { "q": "How many children did a woman have to give birth to in order to win the Gold Mother's Cross?", "a": "8 or more" },
        { "q": "What did Hitler Youth members have to do if they saw a woman wearing a Gold Mother's Cross?", "a": "Salute her" },
        { "q": "What was the name of the SS 'Spring of Life' breeding programme started by Heinrich Himmler in 1935?", "a": "Lebensborn" },
        { "q": "What did the 1933 Sterilisation Law allow the government to do?", "a": "Forcefully sterilise women deemed disabled, 'feeble-minded', or unfit to be mothers" },
        { "q": "Give two ways the Nazis wanted the ideal Aryan woman to style her hair.", "a": "Tied back in a bun or in traditional plaits/braids" },
        { "q": "Why were women heavily discouraged from slimming/dieting?", "a": "The Nazis believed heavier women had easier childbirths/produced healthier babies" },
        { "q": "Who was the 'Reich Women's Leader' in charge of all female organisations?", "a": "Gertrud Scholtz-Klink" },
        { "q": "What was the difference between the NSF and the DFW?", "a": "The NSF was the elite Nazi Women's League; the DFW was the mass organisation for ordinary women to learn domestic skills" },
        { "q": "What was the legal quota cap placed on female university enrolment?", "a": "Maximum 10%" },
        { "q": "Which female professionals were immediately forced to give up their jobs in 1933?", "a": "Female teachers, doctors, and civil servants" },
        { "q": "What profession were women completely banned from entering in 1936?", "a": "The legal profession / becoming judges or lawyers" },
        { "q": "What economic plan, introduced by Göring in 1936, forced the Nazis to change their minds about women working?", "a": "The Four Year Plan for rearmament" },
        { "q": "Why did the Four Year Plan mean women had to go back to work?", "a": "Men were joining the army, creating a massive labor shortage in factories" },
        { "q": "What was the 'Compulsory Duty Year' introduced in 1937?", "a": "A policy forcing young women to work on farms or in factories" },
        { "q": "Did female employment go up or down between 1933 and 1939? (Give the statistics if you can).", "a": "It went up, rising from 11.6 million to 14.6 million" }
    ],
    "gcse_task": {
        "topic": "Explain one consequence of Nazi policies towards women. (4 marks)",
        "tasks": []
    }
};

// Insert lesson_4_1 if it doesn't exist, or replace if it does
const lessonIndex = dataObj.lessons.findIndex(l => l.id === 'lesson_4_1');
if (lessonIndex !== -1) {
    dataObj.lessons[lessonIndex] = lesson41;
} else {
    dataObj.lessons.push(lesson41);
}

// Ensure workbooks array has KT4
if (!dataObj.workbooks) dataObj.workbooks = [];
if (!dataObj.workbooks.find(w => w.id === 'KT4')) {
    dataObj.workbooks.push({
        id: "KT4",
        title: "Key Topic 4: Life in Nazi Germany, 1933–39",
        lessons: []
    });
}
if (!dataObj.printable_workbooks) dataObj.printable_workbooks = [];
if (!dataObj.printable_workbooks.find(w => w.id === 'KT4')) {
    dataObj.printable_workbooks.push({
        id: "KT4",
        title: "Key Topic 4: Life in Nazi Germany, 1933–39",
        lessons: []
    });
}

// Add key individuals
if (!dataObj.key_individuals) dataObj.key_individuals = [];
const addKI = (name, role, significance) => {
    if (!dataObj.key_individuals.some(k => k.name === name)) {
        dataObj.key_individuals.push({ name, role, significance, image: "" });
    }
};

addKI("Gertrud Scholtz-Klink", "Reich Women's Leader", "Appointed by Hitler to oversee the National Socialist Women's League (NSF) and enforce Nazi ideals of motherhood and domesticity.");

const newContent = "export const unitData = " + JSON.stringify(dataObj, null, 4) + ";\n";
fs.writeFileSync(dataPath, newContent, 'utf8');
console.log("Successfully updated KT 4.1 and added key individuals!");
