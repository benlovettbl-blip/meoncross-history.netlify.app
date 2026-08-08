const fs = require('fs');

const content = fs.readFileSync('early_modern_world/data.js', 'utf8');
const match = content.match(/export const unitData = ([\s\S]+);/);
if (!match) {
    console.error("Could not parse data.js");
    process.exit(1);
}

const data = eval('(' + match[1] + ')');

const l5 = data.lessons.find(l => l.id === 'lesson_5');
const l6 = data.lessons.find(l => l.id === 'lesson_6');

const barracoonBlock = {
  title: "Micro-History: The Barracoons of West Africa",
  image: "/images/cape_coast_castle.jpg",
  image_alt: "Cape Coast Castle, a European slave fort on the Gold Coast",
  source_letter: "A",
  image_context: "This image shows Cape Coast Castle, a massive European 'factory' (fort) built on the West African coast. Notice the heavy fortifications pointing out to sea (to defend against rival European navies) and the 'door of no return' leading to the ships.",
  text: "The Transatlantic Slave Trade was not simply a case of European ships arriving and kidnapping people from the beach. It was a massive, highly organized global business that relied on complex treaties and alliances. Powerful African empires, such as the Dahomey and the Asante, grew wealthy by launching military campaigns against rival inland groups, taking prisoners of war. These captives were marched for weeks to the coast and sold to European merchants in exchange for manufactured goods like brass, textiles, and, crucially, European firearms. The European merchants would lock the enslaved Africans in brutally crowded, disease-ridden coastal fortresses known as 'barracoons' or 'castles' (like Cape Coast Castle in modern-day Ghana) for months, waiting for slave ships to arrive. The trade enriched both European merchants and coastal African elites, while completely devastating the interior of the African continent.",
  tasks: [
    {
      type: "comprehension",
      question: "How did powerful African empires like the Dahomey acquire people to sell into slavery?",
      model_answer: "They launched military campaigns against rival inland groups and sold the prisoners of war."
    },
    {
      type: "comprehension",
      question: "What goods did European merchants trade in exchange for enslaved people?",
      model_answer: "They traded manufactured goods like brass, textiles, and European firearms."
    },
    {
      type: "comprehension",
      question: "What was a 'barracoon'?",
      model_answer: "A brutally crowded, disease-ridden coastal fortress where enslaved people were locked up while waiting for slave ships."
    },
    {
      type: "comprehension",
      question: "Study Source A. What does the heavy fortification of Cape Coast Castle tell us about the nature of the slave trade?",
      model_answer: "The fortifications show that the trade was highly competitive and militarized, as the forts were built to defend the 'cargo' from rival European navies, not just to imprison people."
    }
  ]
};

const comparativeBlock = {
  title: "Comparative Case Study: Caribbean Sugar vs. Virginian Tobacco",
  image: "/images/plantation.jpg",
  image_alt: "A Cuban sugar plantation, showing the scale of the operation",
  source_letter: "B",
  image_context: "An illustration of an early modern plantation. Notice the vast scale of the agricultural operation and the intense manual labor required to harvest the cash crops.",
  text: "The experience of an enslaved African depended heavily on where the slave ship landed. In the Caribbean (like Jamaica and Barbados), the primary crop was sugar. Sugar cultivation was incredibly brutal, dangerous, and physically destroying labor. Many Caribbean plantations were owned by 'absentee landlords'—rich white men who lived in luxury in London and never even visited their estates, leaving brutal overseers in charge. Because profits were so high, these overseers calculated that it was cheaper to literally work enslaved people to death (the 'death camp' model) and simply buy replacements from Africa. Life expectancy upon arriving on a sugar plantation was often less than seven years. By contrast, in the North American colony of Virginia, the primary crop was tobacco. Tobacco required less intensive daily physical destruction than sugar. Furthermore, a different climate and slightly better diet meant that, by the 1700s, the enslaved population in Virginia became 'self-sustaining' (growing through childbirth rather than relying entirely on importing new people from Africa). While Virginia was still a brutal system of chattel slavery, the lethal intensity of the Caribbean sugar machine was unmatched.",
  tasks: [
    {
      type: "comprehension",
      question: "What is an 'absentee landlord'?",
      model_answer: "A rich plantation owner who lived in Britain and never visited their estate, leaving brutal overseers in charge."
    },
    {
      type: "comprehension",
      question: "Why was the Caribbean sugar system often described as a 'death camp' model?",
      model_answer: "Because overseers calculated it was cheaper to work enslaved people to death and simply buy replacements, leading to horrific mortality rates."
    },
    {
      type: "comprehension",
      question: "How did the enslaved population in Virginia differ from the Caribbean by the 1700s?",
      model_answer: "The Virginia population became 'self-sustaining' through childbirth, whereas the Caribbean relied heavily on constantly importing new people due to the lethal conditions."
    },
    {
      type: "comprehension",
      question: "Study Source B. Why do you think absentee landlords back in London were able to ignore the brutality shown in illustrations like this?",
      model_answer: "Because they lived thousands of miles away in luxury; they only saw the massive profits from the sugar, not the physical suffering and brutal labor required to produce it."
    }
  ]
};

const undergroundRailroadBlock = {
  title: "Case Study: The Underground Railroad",
  image: "/images/harriet_tubman.jpg",
  image_alt: "Harriet Tubman, a key figure in the Underground Railroad",
  source_letter: "C",
  image_context: "Harriet Tubman (born Araminta Ross) was an American abolitionist and political activist. Born into slavery, she escaped and subsequently made some 13 missions to rescue approximately 70 enslaved people, including family and friends.",
  text: "While armed rebellions (like the Maroons) were the most explosive forms of resistance, a highly organized, grassroots network known as the 'Underground Railroad' represented a different kind of fight. Although this network reached its peak slightly later in the 19th century, it was the ultimate evolution of the runaway networks that began in our era. The Underground Railroad was not a physical train, but a secret web of safe houses, hidden routes, and abolitionist sympathizers that helped enslaved people escape from the American South to free states in the North or into Canada. It relied on absolute secrecy, coded songs, and immense bravery. 'Conductors' like Harriet Tubman—who escaped slavery herself only to repeatedly risk her life sneaking back to rescue others—guided thousands to freedom. This ground-up, grassroots resistance proved that enslaved people were constantly, actively fighting for their own liberation, long before white politicians in Parliament began discussing abolition.",
  tasks: [
    {
      type: "comprehension",
      question: "What was the 'Underground Railroad'?",
      model_answer: "A secret network of safe houses, hidden routes, and abolitionist sympathizers that helped enslaved people escape to freedom."
    },
    {
      type: "comprehension",
      question: "Who was a famous 'Conductor' on the Underground Railroad, and what did they do?",
      model_answer: "Harriet Tubman, who escaped slavery herself and risked her life repeatedly to sneak back and rescue dozens of others."
    },
    {
      type: "comprehension",
      question: "Why does the Underground Railroad prove that enslaved people were not 'passive victims'?",
      model_answer: "It shows they were highly organized, immensely brave, and constantly taking active, dangerous steps to fight for their own liberation."
    },
    {
      type: "comprehension",
      question: "Study Source C. How does learning about individuals like Harriet Tubman challenge traditional historical narratives of the slave trade?",
      model_answer: "It challenges the narrative by shifting the focus from white politicians 'freeing' passive slaves, to enslaved Black women actively and courageously dismantling the system themselves."
    }
  ]
};

const historicalDebateBlock = {
  title: "Historical Debates: What Truly Destroyed Slavery?",
  image: "/images/william_wilberforce.jpg",
  image_alt: "Portrait of William Wilberforce, a British politician and abolitionist",
  source_letter: "D",
  image_context: "William Wilberforce was a prominent British Member of Parliament who led the parliamentary campaign against the British slave trade for twenty years until the passage of the Slave Trade Act of 1807.",
  text: "For a long time, the traditional history taught in British schools focused heavily on the 'White Savior Narrative'. This narrative argues that slavery was abolished in 1833 almost entirely because of moral, upper-class white politicians in Parliament—most famously, William Wilberforce. Wilberforce did indeed dedicate decades of his life to a tireless parliamentary campaign to ban the trade, using horrific evidence like the Brookes ship diagram to shock the British public. \n\nHowever, modern historians (like Eric Williams) strongly challenge this 'white savior' focus. They argue that Wilberforce's moral campaign only succeeded because of two deeper reasons. First, economics: by the 1800s, the sugar plantations were becoming less profitable as the world industrialized. Second, grassroots resistance: massive, terrifying armed rebellions by enslaved people (like the Haitian Revolution and the Jamaican Baptist War) made slavery too dangerous and expensive for the British to maintain. In this view, enslaved people essentially forced the British government's hand; Wilberforce simply passed the law in London.",
  tasks: [
    {
      type: "comprehension",
      question: "What is the 'White Savior Narrative' in the context of the slave trade?",
      model_answer: "The traditional historical view that slavery was abolished almost entirely because of the moral campaigning of upper-class white politicians like William Wilberforce."
    },
    {
      type: "comprehension",
      question: "What role did William Wilberforce actually play in abolition?",
      model_answer: "He led a tireless, decades-long campaign in the British Parliament to ban the trade, using shocking evidence to change public opinion."
    },
    {
      type: "comprehension",
      question: "According to modern historians like Eric Williams, what were the *true* underlying reasons slavery ended?",
      model_answer: "Slavery ended because it was becoming less economically profitable, and because massive armed rebellions by enslaved people made the system too dangerous and expensive to maintain."
    },
    {
      type: "comprehension",
      question: "Study Source D. Why is it problematic to only teach about men like Wilberforce when studying the end of slavery?",
      model_answer: "Because it silences the agency of the enslaved people themselves, making it seem like they passively waited to be rescued by white politicians, rather than acknowledging their active, violent resistance that forced the government's hand."
    }
  ]
};

// Insert into Lesson 5
l5.narrative_blocks.splice(0, 0, barracoonBlock); // Insert at start
l5.narrative_blocks.splice(2, 0, comparativeBlock); // Insert before Digital Research Task

// Insert into Lesson 6
l6.narrative_blocks.splice(3, 0, undergroundRailroadBlock); // Insert after Primary Source Deep Dive
const oldDebateIndex = l6.narrative_blocks.findIndex(b => b.title.includes("Historical Debates"));
if (oldDebateIndex !== -1) {
    l6.narrative_blocks[oldDebateIndex] = historicalDebateBlock;
} else {
    l6.narrative_blocks.push(historicalDebateBlock);
}

// Write back to file
const newDataStr = "export const unitData = " + JSON.stringify(data, null, 2) + ";\n";
fs.writeFileSync('early_modern_world/data.js', newDataStr, 'utf8');

console.log("Successfully patched Lessons 5 and 6!");
