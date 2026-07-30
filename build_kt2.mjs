import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { unitData } from './weimar_nazi_germany/data.js';

async function fetchImage(title, filename) {
    try {
        const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=500`;
        const res = await fetch(url);
        const data = await res.json();
        const pages = data.query.pages;
        const page = Object.values(pages)[0];
        if (page.thumbnail && page.thumbnail.source) {
            const imgUrl = page.thumbnail.source;
            const dest = path.join('public', 'images', filename);
            execSync(`curl -sL "${imgUrl}" -o "${dest}"`);
            return `/images/${filename}`;
        }
    } catch (e) {
        console.log(`Failed to fetch image for ${title}`);
    }
    return '';
}

async function run() {
    console.log('Building KT2.1...');
    
    // 1. Add KT2 to workbooks if not present
    if (!unitData.workbooks.find(w => w.id === 'KT2')) {
        unitData.workbooks.push({
            id: "KT2",
            title: "Key Topic 2: Hitler's Rise to Power, 1919-33",
            image: ""
        });
    }
    
    if (!unitData.printable_workbooks.find(w => w.title === 'Workbook KT2')) {
        unitData.printable_workbooks.push({
            title: "Workbook KT2",
            url: "workbook_KT2.html"
        });
    }

    // 2. Fetch key individuals images
    if (!unitData.key_individuals) {
        unitData.key_individuals = [];
    }
    
    const individualsToProcess = [
        { name: "Anton Drexler", title: "Anton_Drexler", role: "Founder of the German Workers' Party (DAP)", bio: "A Munich railway mechanic who founded the DAP in 1919. He was later sidelined by Hitler as the party grew." },
        { name: "Ernst Röhm", title: "Ernst_Röhm", role: "Commander of the SA", bio: "A ruthless ex-army captain who commanded the Sturmabteilung (SA). His 'Brownshirts' protected Nazi meetings and attacked opponents, but their loyalty to Röhm concerned Hitler." },
        { name: "Hermann Göring", title: "Hermann_Göring", role: "Early Nazi Supporter and WWI Hero", bio: "A famous First World War fighter pilot whose recruitment gave the early Nazi Party much-needed credibility and access to wealthy donors." },
        { name: "Julius Streicher", title: "Julius_Streicher", role: "Nazi Publisher", bio: "A wealthy publisher who joined the early Nazi Party and used his resources to spread virulent anti-Semitic propaganda." },
        { name: "Rudolf Hess", title: "Rudolf_Hess", role: "Early Nazi Leader", bio: "A charismatic member of the early Nazi Party who became entirely devoted to Hitler, serving as his deputy." },
        { name: "Rudolf Schüssler", title: "Nazi_Party", role: "First Full-Time Administrator", bio: "Appointed in 1920 to organise the party's new Munich headquarters, transforming it from a disorganized group into a professional political machine." },
        { name: "Adolf Hitler", title: "Adolf_Hitler", role: "Leader of the NSDAP", bio: "Joined the DAP in 1919 as a spy for the army but soon took total control, transforming it into the NSDAP using his powerful oratory and ruthless organization." }
    ];

    for (const ind of individualsToProcess) {
        if (!unitData.key_individuals.find(k => k.name === ind.name)) {
            const filename = ind.name.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.jpg';
            const imgPath = await fetchImage(ind.title, filename);
            unitData.key_individuals.push({
                name: ind.name,
                role: ind.role,
                bio: ind.bio,
                image: imgPath
            });
            console.log(`Added key individual: ${ind.name}`);
        }
    }

    // 3. Create the lesson object
    const lesson = {
        id: "lesson_2_1",
        title: "KT2.1: The Early Development of the Nazi Party, 1919–1922",
        enquiry_question: "From the shadows: How did a tiny, obscure political group in a Munich beer hall transform into a highly organised and violent political machine under Adolf Hitler's early leadership?",
        teacher_notes: {
            primer: "This lesson explores the origins of the Nazi Party and Hitler's early rise to power, focusing on his oratory, the 25-Point Programme, and the establishment of the SA. The goal is for students to understand how a fringe regional group built the machinery for a national movement.",
            objectives: [
                {
                    objective: "Demonstrate precise knowledge of the 25-Point Programme and explain how it was designed to appeal to multiple different groups in German society.",
                    primer: "Have students analyze the 25-Point Programme in section 3, classifying points into Nationalist, Socialist, and Anti-Semitic categories.",
                    question: "Which point from the 25-Point Programme would have most appealed to a poor, working-class labourer?"
                },
                {
                    objective: "Analyse the methods Adolf Hitler used to take total control of the party, including his public speaking, party restructuring, and early propaganda.",
                    primer: "Focus on section 2 and 4 to explore Hitler's tactics for centralising power and rebranding the party.",
                    question: "Why did Hitler rename the DAP to the NSDAP, and what does this reveal about his political strategy?"
                },
                {
                    objective: "Evaluate the role and impact of the SA (Sturmabteilung), explaining how political violence became a core tactic of the early Nazi Party.",
                    primer: "Discuss section 5, examining the SA's dual purpose and why Hitler later formed the Stosstrupp.",
                    question: "How did the SA help the Nazi Party grow, and why did they also present a threat to Hitler's personal authority?"
                }
            ]
        },
        do_now: {
            type: "recall",
            title: "Retrieval Practice",
            instructions: "Answer the following questions based on your prior knowledge.",
            items: [
                { question: "What was the 'stab-in-the-back' myth (Dolchstoßlegende), and who was blamed for it?", answer: "The myth that the German army was not defeated in battle but betrayed by politicians on the home front; the 'November Criminals' (socialists, democrats, and Jews) were blamed." },
                { question: "What is a 'Putsch'?", answer: "A violent attempt to overthrow a government." },
                { question: "Who were the Freikorps, and what political ideology did they fiercely oppose?", answer: "Right-wing, nationalist ex-soldiers who violently opposed Communism." },
                { question: "15 Second Challenge: Try to speak for 15 seconds non-stop about the terms of the Treaty of Versailles and why German nationalists hated it.", answer: "It imposed massive reparations, limited the army to 100,000 men, stripped Germany of its empire, and included the humiliating War Guilt Clause (Article 231)." }
            ]
        },
        vocab: [
            { term: "DAP (German Workers' Party)", definition: "The original, tiny political party founded by Anton Drexler in 1919." },
            { term: "NSDAP (National Socialist German Workers' Party)", definition: "The new name given to the DAP by Hitler in 1920 (abbreviated to 'Nazi')." },
            { term: "25-Point Programme", definition: "The foundational manifesto of the Nazi Party, written in 1920, containing their core political demands." },
            { term: "Nationalism", definition: "A fierce, devoted love of one's country, often coupled with the belief that it is superior to others and must be kept militarily strong." },
            { term: "Socialism", definition: "A political idea where wealth and property are shared more equally among the working people, and large corporations are controlled by the state." },
            { term: "SA (Sturmabteilung)", definition: "The private army of the Nazi Party, also known as the 'Brownshirts', set up in 1921 and commanded by Ernst Röhm." },
            { term: "Stosstrupp (Shock Troop)", definition: "An elite, highly trusted unit selected from the SA to act as Hitler's personal bodyguard." },
            { term: "Völkischer Beobachter", definition: "The official newspaper of the Nazi Party, purchased in 1920 to spread their propaganda." }
        ],
        vocab_cloze_text: "In 1919, Anton Drexler founded the tiny [DAP (German Workers' Party)]. A year later, Hitler rebranded it as the [NSDAP (National Socialist German Workers' Party)] and helped write the [25-Point Programme]. This manifesto blended extreme [Nationalism] with ideas of [Socialism] to appeal to the working class. To spread their message, the party purchased the [Völkischer Beobachter] newspaper. By 1921, Hitler set up the [SA (Sturmabteilung)] to protect meetings, but later created an elite [Stosstrupp (Shock Troop)] as his personal bodyguard.",
        narrative_blocks: [
            {
                theme_heading: "The Origins: Anton Drexler and the DAP",
                text: "In 1919, Germany was in chaos following the end of the First World War. In Munich (the capital city of the Bavaria region), a railway mechanic named Anton Drexler founded a small, extreme right-wing group called the German Workers' Party (DAP). They hated the Weimar Republic, despised the Treaty of Versailles, and blamed Jewish people for Germany's problems.\n\nIn September 1919, the regular German army sent an intelligence officer named Adolf Hitler to attend a DAP meeting in a Munich beer hall to spy on them. However, Hitler found that he strongly agreed with their extreme views. Impressed by Hitler's passionate public speaking during a debate, Drexler invited him to join. Hitler left the army and became the party's 55th member."
            },
            {
                theme_heading: "Hitler’s Personal Appeal and Oratory",
                text: "Hitler’s rapid rise within the DAP was largely driven by his unique talent as a public speaker. At a time when traditional politicians were often dry and academic, Hitler's speeches were rehearsed, theatrical performances. He typically began quietly before gradually building to a screaming, passionate frenzy, using aggressive hand gestures to captivate his audience. He brilliantly tapped into the collective anger of the Munich crowds, offering them simple, clear scapegoats for their misery: the 'November Criminals', the Communists, and the Jews. It was his star power as an orator that drew in crowds and donations, making him so valuable that he could demand total obedience from the party."
            },
            {
                theme_heading: "The 25-Point Programme (1920)",
                text: "Hitler quickly became the DAP's head of propaganda. In February 1920, Hitler and Drexler wrote the 25-Point Programme, a manifesto detailing the party's exact policies.\n\nThe programme was deliberately designed as a 'catch-all' document to appeal to a wide variety of angry Germans across completely different social classes:\n\n* **Nationalist ideas (Appealing to the military, businesses, and traditionalists):** The complete scrapping of the Treaty of Versailles; the demand for Lebensraum (living space) to expand Germany's borders and feed its people.\n* **Socialist ideas (Appealing to poor, working-class labourers):** The nationalisation of large industries; sharing corporate profits with the workers; expanding old-age pensions.\n* **Anti-Semitic ideas:** The revoking of German citizenship for all Jews; the demand that only those of 'German blood' could be members of the nation."
            },
            {
                theme_heading: "Hitler Takes Total Control (1921)",
                text: "Recognising his own importance, Hitler forced Drexler out and became the undisputed leader of the party in July 1921. He immediately began reshaping the party into a highly organised machine:\n\n* **Rebranding:** He changed the party's name to the NSDAP (National Socialist German Workers' Party). The inclusion of both 'National' and 'Socialist' was a calculated move to draw voters from both the extreme right and the extreme left.\n* **The Swastika:** Hitler designed a striking new logo—the Swastika—and adopted the straight-armed Roman salute, giving the party a unique, recognizable visual identity.\n* **Administrative Reorganisation:** In January 1920, the party set up its first permanent headquarters in Munich and appointed a full-time, salaried administrator, Rudolf Schüssler. The party was no longer a loose group of angry men in a beer hall; it now had proper files, organised membership lists, and a professional structure.\n* **Propaganda:** In December 1920, the party bought its own newspaper, the Völkischer Beobachter. By 1921, they were printing 17,000 copies, spreading their message far beyond the beer halls.\n* **Powerful Allies:** Hitler actively recruited wealthy and influential figures to give the party credibility and funding. This included the First World War fighter pilot hero Hermann Göring, the wealthy publisher Julius Streicher, and the charismatic Rudolf Hess."
            },
            {
                theme_heading: "Blood and Iron: The Role of the SA and Stosstrupp",
                text: "As the party grew, its meetings were frequently targeted by rival political groups, especially communists. In 1921, Hitler established the Sturmabteilung (SA), or 'Storm Detachment'. Dressed in distinctive brown uniforms, they were known as the 'Brownshirts'.\n\nCommanded by a ruthless ex-army captain named Ernst Röhm, the SA recruited heavily from the demobilised Freikorps, right-wing students, and unemployed ex-soldiers. They had two main jobs: to protect Nazi speakers at party meetings, and to violently disrupt the meetings of their political opponents.\n\nHowever, while the SA successfully dominated the streets of Munich, they presented a hidden problem for Hitler. The 'Brownshirts' were fiercely loyal to their own commander, Ernst Röhm, rather than to Hitler himself. Recognising this threat to his absolute authority, Hitler formed a smaller, elite unit from highly trusted members of the SA in 1923, known as the Stosstrupp (Shock Troop). This unit acted as his dedicated personal bodyguard, demonstrating his relentless desire to maintain total dominance over his own movement."
            },
            {
                theme_heading: "Deeper Evaluation: A Regional Fringe Group",
                text: "While the creation of the 25-Point Programme, the newspaper, and the SA showed incredible organisation, it is vital to keep the early Nazi Party in perspective. By the end of 1922, they were still fundamentally a regional phenomenon contained within Bavaria. They had roughly 20,000 members, but outside of Munich, they were largely unknown. They did not hold a single seat in the national Reichstag. They had built the machinery for a national movement, but they were not yet a serious threat to the Weimar Republic's existence."
            }
        ],
        quiz: [
            { question: "Who was the original founder of the German Workers' Party (DAP) in 1919?", options: ["Anton Drexler", "Adolf Hitler", "Ernst Röhm", "Hermann Göring"], answer: "Anton Drexler" },
            { question: "Why did Adolf Hitler originally attend a DAP meeting in September 1919?", options: ["He was sent by the army as an intelligence officer to spy on them", "He wanted to become the leader of the party", "He was invited by Anton Drexler", "He was looking for a job as an administrator"], answer: "He was sent by the army as an intelligence officer to spy on them" },
            { question: "What unique talent did Hitler use to captivate audiences and rise to leadership?", options: ["His powerful, rehearsed, and theatrical public speaking / oratory skills", "His ability to write detailed economic policies", "His skill in military strategy and tactics", "His talent for drawing and designing logos"], answer: "His powerful, rehearsed, and theatrical public speaking / oratory skills" },
            { question: "In what year did Hitler and Drexler write the 25-Point Programme?", options: ["1919", "1920", "1921", "1922"], answer: "1920" },
            { question: "Name one 'Nationalist' policy from the 25-Point Programme.", options: ["Scrap the Treaty of Versailles / Expand Germany's borders / Demand Lebensraum", "Nationalise large industries", "Expand old-age pensions", "Share corporate profits with workers"], answer: "Scrap the Treaty of Versailles / Expand Germany's borders / Demand Lebensraum" },
            { question: "Name one 'Socialist' policy from the 25-Point Programme.", options: ["Nationalise large industries / Share corporate profits with workers / Expand pensions", "Demand Lebensraum to expand Germany's borders", "Scrap the Treaty of Versailles", "Revoke German citizenship for all Jews"], answer: "Nationalise large industries / Share corporate profits with workers / Expand pensions" },
            { question: "According to the anti-Semitic points in the Programme, who were the only people allowed to be German citizens?", options: ["Those of 'German blood' / Jews were to be stripped of citizenship", "Anyone who fought in the First World War", "All people born within the borders of Germany", "Only members of the Nazi Party"], answer: "Those of 'German blood' / Jews were to be stripped of citizenship" },
            { question: "What did Hitler officially rename the DAP to?", options: ["The NSDAP / National Socialist German Workers' Party", "The SA / Sturmabteilung", "The SDP / Social Democratic Party", "The KPD / Communist Party of Germany"], answer: "The NSDAP / National Socialist German Workers' Party" },
            { question: "In what year did Hitler force Drexler out and become the absolute leader of the Nazi Party?", options: ["1919", "1920", "1921", "1923"], answer: "1921" },
            { question: "Who was appointed as the Nazi Party's first full-time administrator to organise their new Munich headquarters?", options: ["Rudolf Schüssler", "Ernst Röhm", "Hermann Göring", "Rudolf Hess"], answer: "Rudolf Schüssler" },
            { question: "What was the name of the official Nazi newspaper purchased in December 1920?", options: ["Völkischer Beobachter / People's Observer", "Der Stürmer", "Das Reich", "Munich Post"], answer: "Völkischer Beobachter / People's Observer" },
            { question: "Name the famous First World War fighter pilot who joined the early Nazi Party, giving it credibility.", options: ["Hermann Göring", "Ernst Röhm", "Rudolf Hess", "Julius Streicher"], answer: "Hermann Göring" },
            { question: "What ancient symbol did Hitler adopt and redesign to act as the party's logo?", options: ["The Swastika", "The Iron Cross", "The Eagle", "The Fascio"], answer: "The Swastika" },
            { question: "What does the abbreviation 'SA' stand for?", options: ["Sturmabteilung / Storm Detachment", "Schutzstaffel / Protection Squadron", "Stosstrupp / Shock Troop", "Sicherheitsdienst / Security Service"], answer: "Sturmabteilung / Storm Detachment" },
            { question: "What was the common nickname for the SA, based on their uniforms?", options: ["The Brownshirts", "The Blackshirts", "The Stormtroopers", "The Freikorps"], answer: "The Brownshirts" },
            { question: "Who was the ex-army captain placed in command of the SA?", options: ["Ernst Röhm", "Heinrich Himmler", "Hermann Göring", "Anton Drexler"], answer: "Ernst Röhm" },
            { question: "What were the two main roles of the SA?", options: ["To protect Nazi speakers and to violently disrupt the meetings of political opponents", "To write propaganda and publish the party newspaper", "To collect taxes and manage party finances", "To spy on the army and report back to Hitler"], answer: "To protect Nazi speakers and to violently disrupt the meetings of political opponents" },
            { question: "Why did Hitler form his own personal bodyguard, the Stosstrupp (Shock Troop), out of the SA?", options: ["Because the regular SA were rowdy and more loyal to Ernst Röhm than they were to Hitler", "Because the SA was too small to protect him effectively", "Because the SA uniforms were too expensive to produce", "Because he wanted a unit that only consisted of former fighter pilots"], answer: "Because the regular SA were rowdy and more loyal to Ernst Röhm than they were to Hitler" },
            { question: "By the end of 1922, roughly how many members did the Nazi Party have?", options: ["20,000", "5,000", "50,000", "100,000"], answer: "20,000" },
            { question: "Which specific German region and city was the early Nazi Party entirely based in?", options: ["Bavaria / Munich", "Prussia / Berlin", "Saxony / Dresden", "Rhineland / Cologne"], answer: "Bavaria / Munich" }
        ]
    };

    if (!unitData.lessons.find(l => l.id === "lesson_2_1")) {
        unitData.lessons.push(lesson);
        console.log('Added lesson 2_1');
    }

    fs.writeFileSync('./weimar_nazi_germany/data.js', 'export const unitData = ' + JSON.stringify(unitData, null, 4) + ';\n');
    console.log('Successfully saved to data.js');
}

run();
