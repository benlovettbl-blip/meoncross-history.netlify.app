import fs from 'fs';

const dataPath = 'great_war_part2/data.js';
let content = fs.readFileSync(dataPath, 'utf-8');

// Extract JSON
const jsonStart = content.indexOf('{');
const jsonStr = content.slice(jsonStart, content.lastIndexOf('}') + 1);
let unitData = JSON.parse(jsonStr);

// Find lesson 4
const lessonIndex = unitData.lessons.findIndex(l => l.id === 'lesson_4');

unitData.lessons[lessonIndex] = {
    "id": "lesson_4",
    "title": "Lesson 4: How did a war fought miles away completely control daily life in Britain?",
    "teacher_notes": {
        "primer": "Examine how the concept of 'Total War' completely transformed the British home front, focusing on government control, conscription, and the complex, often temporary, shifts in women's social status.",
        "objectives": [
            {
                "objective": "Understand the concept of 'Total War' and government control.",
                "primer": "Explain the Defense of the Realm Act (DORA) and the shift to conscription.",
                "question": "Why did the British government feel it was necessary to water down beer and censor letters?"
            },
            {
                "objective": "Analyze the changing social status and experiences of women.",
                "primer": "Discuss the Canary Girls of Priddy's Hard and contrast the differing historical interpretations of their liberation.",
                "question": "Did the First World War permanently liberate British women, or was it a temporary illusion driven by wartime necessity?"
            }
        ]
    },
    "do_now": {
        "title": "Do Now: Retrieval Grid",
        "type": "grid",
        "items": [
            {
                "question": "How many Indian soldiers volunteered to serve the British Empire during the First World War?",
                "answer": "Over 1.5 million Indian soldiers volunteered.",
                "points": 1,
                "category": "Lesson 3 Recall"
            },
            {
                "question": "What was the cause and outcome of the Taranto Mutiny in December 1918?",
                "answer": "It was caused by the racist treatment, poor conditions, and forced manual labor of the British West Indies Regiment. It fueled early movements for Caribbean independence.",
                "points": 1,
                "category": "Lesson 3 Recall"
            },
            {
                "question": "Why did the rapid population growth of industrial towns like Leeds and Manchester cause a severe sanitation crisis in the 19th century?",
                "answer": "Because towns grew too quickly without building regulations, leading to overcrowded back-to-back houses and overflowing shared cesspits.",
                "points": 2,
                "category": "Thematic Recall"
            },
            {
                "question": "What landmark British law in 1875 finally forced local councils to take legal responsibility for providing clean water and sewer systems?",
                "answer": "The Public Health Act of 1875.",
                "points": 2,
                "category": "Thematic Recall"
            },
            {
                "question": "Why should a historian be cautious when using a politician's post-war memoirs to judge a general's military competence?",
                "answer": "Because politicians often write memoirs to defend their own decisions, protect their historical reputation, and shift blame for costly military failures onto others.",
                "points": 3,
                "category": "Historical Skills"
            },
            {
                "question": "Explain the difference between \"Causation\" and \"Consequence\" in history.",
                "answer": "Causation refers to the factors or reasons that make an event happen, while Consequence refers to the effects, outcomes, or impacts that result from that event.",
                "points": 3,
                "category": "Historical Skills"
            }
        ]
    },
    "enquiry": "How did a war fought miles away completely control daily life in Britain?",
    "vocab": [
        {
            "word": "Total War",
            "def": "A conflict in which a nation mobilizes all of its resources, industries, and civilian population to support the war effort."
        },
        {
            "word": "Defense of the Realm Act (DORA)",
            "def": "An emergency British law passed in August 1914 that gave the government sweeping powers to control daily life."
        },
        {
            "word": "Conscientious Objector",
            "def": "A person who refuses to serve in the armed forces or fight in a conflict due to moral, ethical, or religious objections."
        },
        {
            "word": "Conscription",
            "def": "A compulsory law forcing citizens to enlist in the armed forces."
        },
        {
            "word": "Priddy's Hard",
            "def": "A major Royal Navy armaments depot in Gosport where local women worked filling shells and handling explosives during the war."
        }
    ],
    "narrative_blocks": [
        {
            "title": "The Core Narrative",
            "text": "<p>Until 1914, the British public believed that war was something fought far away by a small professional army. However, the scale of the First World War shattered this separation. To defeat a heavily industrialized enemy like Germany, Britain had to mobilize its entire society. This gave rise to the concept of <strong>\"Total War\"</strong>—a conflict where the boundary between soldiers on the battlefield and civilians at home completely vanished, and the government took total control of daily life.</p><p><strong>DORA and Conscription</strong><br>This massive shift began on August 8, 1914, when Parliament passed the <strong>Defense of the Realm Act (DORA)</strong>. This law gave the government unprecedented emergency powers. To prevent information from reaching the enemy, military censors blacked out letters sent home by soldiers. To maximize industrial efficiency and keep factory workers sober, beer was watered down, and pub opening hours were strictly cut.</p><p>As the war dragged on, voluntary enlistment collapsed under the weight of massive casualties. In January 1916, the government introduced conscription (compulsory military service). Over 16,000 men refused to fight on moral, political, or religious grounds. Known as <strong>Conscientious Objectors</strong>, those who refused any wartime work were stripped of their voting rights, faced public humiliation, and were locked up in harsh labor prisons like Dartmoor.</p><p><strong>The Canary Girls of Priddy's Hard</strong><br>The conscription of millions of men created a desperate labor shortage. To keep the military supplied, the government employed over 800,000 women in munitions factories. Locally, women from Fareham, Stubbington, and Gosport flocked to work at the <strong>Priddy's Hard armaments depot</strong> and the Royal Clarence Yard. Known as \"Munitionettes\" or \"Canary Girls,\" these women worked twelve-hour shifts handling highly explosive TNT. The toxic chemicals stained their skin bright yellow and turned their hair ginger-green. Despite the horrific danger of explosions and toxic lung damage, working in munitions gave women unprecedented financial independence.</p><p><strong>Submarine Warfare & Rationing</strong><br>By 1917, Britain faced starvation. German submarines (U-boats) launched \"unrestricted submarine warfare,\" sinking merchant ships bringing food to British ports. To prevent riots and ensure fair distribution, the government introduced rationing in early 1918. Every citizen received a ration book limiting their meat, butter, and sugar. For the first time in British history, a citizen's social class no longer determined how much food they could eat.</p>",
            "tasks": [
                {
                    "type": "text",
                    "text": "<strong>Part A: Core Factual Recall</strong><br>1. What does the term \"Total War\" mean?<br>2. What was the Defense of the Realm Act (DORA)?<br>3. Why did the British government introduce conscription in January 1916?<br>4. Why were women working at depots like Priddy's Hard nicknamed \"Canary Girls\"?",
                    "model": "1. A conflict where a country mobilizes all of its citizens, industries, and resources, making the home front just as vital as the battlefield.\n2. An emergency law passed in August 1914 giving the government sweeping powers over the public, such as censoring personal letters and cutting pub hours to keep workers sober.\n3. Because voluntary enlistment had collapsed due to massive casualties on the Western Front, leaving the army short of fresh soldiers.\n4. Because handling toxic TNT explosive powder turned their skin bright yellow and their hair ginger-green."
                }
            ]
        },
        {
            "title": "The Historians' Debate: Did the war liberate women?",
            "text": "<p>In 1918, Parliament passed the Representation of the People Act, granting the vote to women over 30 who met property qualifications. But did the war truly change the social status of women, or was it a temporary illusion?</p><blockquote><strong>Interpretation A: The Optimistic View (War as an engine of change)</strong><br><em>\"The First World War was a massive engine of social change. By proving they could do the heavy, highly skilled industrial work previously reserved for men, women shattered the Victorian myth of female weakness. Their vital contribution to the Home Front made it politically impossible for the government to deny them the vote in 1918.\"</em><br>— <em>Adapted from Arthur Marwick, The Deluge (1965)</em></blockquote><br><br><blockquote><strong>Interpretation B: The Feminist Revisionist View (The temporary illusion)</strong><br><em>\"The idea that the war liberated women is a myth. The changes were strictly temporary and driven by desperate national necessity, not a desire for equality. Women were paid less than men for the exact same work. When the war ended, women were immediately fired and forced back into domestic service to give jobs to returning soldiers. Furthermore, the 1918 vote was given to older, middle-class women—not the young, working-class Canary Girls who actually risked their lives in the factories.\"</em><br>— <em>Adapted from Gail Braybon, Women Workers in the First World War (1981)</em></blockquote>",
            "tasks": [
                {
                    "type": "text",
                    "text": "<strong>Part B: Analyzing Historical Interpretations</strong><br>5. Read Interpretation A. According to Marwick, how did munitions work change how society viewed women?<br>6. Read Interpretation B. What evidence does Braybon use to argue that the 1918 voting law was actually unfair to the women who contributed most to the war?",
                    "model": "5. Marwick argues it shattered the Victorian myth of female weakness because women proved they were physically and mentally capable of doing heavy, highly skilled industrial work.\n6. Braybon points out that the 1918 vote was only given to older, property-owning women over 30, meaning the young, working-class Canary Girls who actually risked their lives in the factories were denied the vote."
                },
                {
                    "type": "text",
                    "text": "<strong>Part C: The \"Judgement & Nuance\" Paragraph Scaffold</strong><br>Write a structured paragraph answering the following: <em>\"To what extent did the First World War lead to a permanent change in the social status of British women?\"</em><br><ul><li><strong>Thesis Statement:</strong> Establish your main argument (e.g., <em>While the First World War temporarily gave women unprecedented financial independence, the permanent social changes were highly limited...</em>)</li><li><strong>Factual Evidence:</strong> Provide specific knowledge (e.g., <em>Canary Girls, TNT, 800,000 workers, 1918 Representation of the People Act...</em>)</li><li><strong>Counter-Perspective:</strong> Acknowledge the optimistic view (<em>Looking at Interpretation A, historians like Marwick argue the war was an engine of change that shattered Victorian myths...</em>)</li><li><strong>Evaluation:</strong> Conclude using Braybon's revisionist perspective to explain why the changes were mostly an illusion (women were fired in 1919 and the young factory workers did not get the vote).</li></ul>",
                    "model": "While the First World War temporarily gave women unprecedented financial independence, the permanent social changes were highly limited. The conscription crisis meant that over 800,000 women were mobilized for the war effort, working as 'Canary Girls' handling dangerous TNT in places like Priddy's Hard. In 1918, the Representation of the People Act finally granted some women the vote. Looking at Interpretation A, historians like Marwick argue the war was an engine of change that shattered Victorian myths of female weakness by proving women could do heavy industrial labor. However, this optimistic view is flawed. Using Braybon's revisionist perspective, the changes were mostly an illusion driven by national necessity; women were paid less than men and were fired immediately in 1919 to make way for returning soldiers. Furthermore, the 1918 vote was restricted to older, middle-class women, completely ignoring the young, working-class Munitionettes who actually risked their lives, proving the war did not permanently liberate the women who fought on the home front."
                }
            ]
        }
    ]
};

// Add quiz
unitData.quizzes = unitData.quizzes || {};
unitData.quizzes["lesson_4"] = [
    {
        "q": "What emergency law passed in August 1914 gave the British government sweeping powers over daily life, including the ability to water down beer?",
        "a": "The Defense of the Realm Act (DORA)",
        "options": [
            "The Defense of the Realm Act (DORA)",
            "The Military Service Act",
            "The Public Health Act",
            "The Representation of the People Act"
        ]
    },
    {
        "q": "Where did many local women from the Fareham and Gosport area go to work handling high explosives for the war effort?",
        "a": "The Priddy's Hard armaments depot",
        "options": [
            "The Priddy's Hard armaments depot",
            "The Netley Military Hospital",
            "The Stubbington Textile Mill",
            "The Portsmouth Naval Dockyard"
        ]
    },
    {
        "q": "Why do revisionist historians like Gail Braybon argue that the war did NOT truly liberate women?",
        "a": "Because women were paid less than men, fired immediately after the war ended, and the youngest factory workers were denied the vote.",
        "options": [
            "Because women were paid less than men, fired immediately after the war ended, and the youngest factory workers were denied the vote.",
            "Because women refused to leave their homes and do any industrial work.",
            "Because the government made it illegal for women to earn their own money.",
            "Because women were not allowed to join the military."
        ]
    },
    {
        "q": "What was the primary trigger that forced the British government to introduce compulsory food rationing in 1918?",
        "a": "German U-boats sank merchant ships bringing food, causing severe shortages.",
        "options": [
            "German U-boats sank merchant ships bringing food, causing severe shortages.",
            "A national drought ruined all the grain crops in Hampshire.",
            "Factory workers went on strike and refused to bake bread.",
            "The British government sent all the food to France."
        ]
    },
    {
        "q": "How did the government treat Conscientious Objectors who refused to do any form of military work?",
        "a": "They were sent to harsh labor prisons and stripped of their voting rights.",
        "options": [
            "They were sent to harsh labor prisons and stripped of their voting rights.",
            "They were exempted from all taxes and given free houses.",
            "They were forced to join the royal court as political advisors.",
            "They were exiled to Australia."
        ]
    }
];

// Rebuild file
const newContent = `export const unitData = ${JSON.stringify(unitData, null, 4)};\n`;
fs.writeFileSync(dataPath, newContent);
console.log('Successfully injected Lesson 4!');
