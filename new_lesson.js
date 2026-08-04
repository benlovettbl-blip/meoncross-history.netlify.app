module.exports = {
    id: "lesson_0",
    title: "How was the German Empire created in 1871?",
    a4_map: "/images/german_empire_1871.png",
    teacher_notes: {
        primer: "This lesson introduces students to the unification of Germany. Before understanding the alliance systems or the arms race, students must grasp the geographical and political shockwave caused by a unified, militaristic German Empire suddenly dominating Central Europe.",
        objectives: [
            {
                objective: "Understand how Otto von Bismarck used 'blood and iron' to unify the German states.",
                primer: "Focus on the Franco-Prussian War narrative block. Emphasize that Germany wasn't formed through peaceful agreement, but through warfare.",
                question: "Hinge Question: Did Bismarck unify Germany through diplomacy or warfare?"
            },
            {
                objective: "Analyze the geographical impact of the new German Empire on the balance of power in Europe.",
                primer: "Direct students to the full-page A4 map. Have them trace the borders and note how Germany is landlocked between major powers (France and Russia).",
                question: "Hinge Question: Looking at the map, why might the new German Empire feel threatened despite its size?"
            }
        ]
    },
    do_now: {
        title: "Do Now: Geography of Europe",
        type: "mixed",
        items: [
            "1. Name two major powers in Europe in 1870.",
            "2. What is an empire?",
            "3. Why is having a strong army important for a country surrounded by others?",
            "4. Define the term 'Balance of Power'."
        ]
    },
    narrative_blocks: [
        {
            title: "Blood and Iron: The Unification",
            content: "Before 1871, there was no single country called 'Germany'. Instead, Central Europe was a jigsaw puzzle of 39 independent states. The most powerful of these was Prussia, known for its highly disciplined and effective army. In 1862, Otto von Bismarck became the Prime Minister of Prussia. Bismarck was a brilliant and ruthless politician. He believed that the only way to unite the German states was not through speeches and votes, but through 'blood and iron'—meaning warfare and military strength. Through a series of quick, victorious wars against Denmark and Austria, Prussia expanded its power and forced the smaller northern German states to join its alliance.",
            tasks: [
                {
                    type: "text",
                    text: "Task 1: Highlight the name of the most powerful German state before 1871.",
                    model: "Students should highlight 'Prussia'."
                },
                {
                    type: "text",
                    text: "Task 2: Explain what Bismarck meant by 'blood and iron'.",
                    model: "Bismarck meant that Germany would be unified through warfare and military strength, not through peaceful votes."
                }
            ],
            hinge_question: {
                question: "Which state took the lead in unifying Germany?",
                options: ["Austria", "Prussia", "Bavaria", "France"],
                correct: 1
            }
        },
        {
            title: "The Franco-Prussian War (1870-1871)",
            content: "To bring the remaining southern German states into the union, Bismarck needed a common enemy. He cleverly provoked France into declaring war on Prussia in 1870. The highly trained Prussian army, using modern railways and artillery, rapidly defeated the French. In January 1871, the King of Prussia was crowned Kaiser (Emperor) Wilhelm I of a newly unified German Empire. To add insult to injury, this ceremony took place inside the Palace of Versailles in France. A new, massive, and heavily militarized superpower had just been created right in the center of Europe, completely destroying the old 'balance of power'.",
            tasks: [
                {
                    type: "text",
                    text: "Task 3: Why did Bismarck provoke a war with France?",
                    model: "He needed a common enemy to unite the southern German states with Prussia."
                },
                {
                    type: "text",
                    text: "Task 4: Where was the new German Empire proclaimed?",
                    model: "In the Palace of Versailles in France."
                }
            ],
            hinge_question: {
                question: "What was the main consequence of the Franco-Prussian War?",
                options: ["France gained territory", "The German Empire was created", "Britain declared war", "Prussia was destroyed"],
                correct: 1
            }
        }
    ],
    primary_source: {
        title: "Source A: The Map of the German Empire (1871)",
        src: "/images/german_empire_1871.png",
        caption: "A map showing the newly created German Empire in 1871, located directly in the center of Europe.",
        question: "Enquiry: Look at the A4 map provided. Why might the geographical location of the new German Empire cause fear for both Germany and its neighbors?",
        tasks: [
            {
                type: "text",
                text: "Task 5: Look at the map. Name the two large countries that border Germany to the East and West.",
                model: "France is to the West, and the Russian Empire is to the East."
            },
            {
                type: "text",
                text: "Task 6: Using the map and the text, explain why the creation of Germany destroyed the 'balance of power' in Europe.",
                model: "A new, massive, and highly militarized superpower was created in the center of Europe, making its neighbors feel threatened and fearful of its military strength."
            }
        ]
    }
};
